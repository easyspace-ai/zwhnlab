package main

import (
	"context"
	"fmt"
	"log/slog"
	"net/http"
	"os"
	"os/signal"
	"sync"
	"syscall"
	"time"

	"github.com/easyspace-ai/ylmnote/internal/applog"
	"github.com/easyspace-ai/ylmnote/internal/config"
	"github.com/easyspace-ai/ylmnote/internal/infrastructure/persistence"
	httpx "github.com/easyspace-ai/ylmnote/internal/interfaces/http"
)

func main() {
	cfg := config.Load()

	if err := applog.Init(cfg.AppEnv, cfg.LogFilePath, cfg.LogToStdout); err != nil {
		fmt.Println("init logger failed:", err)
		os.Exit(1)
	}
	defer applog.Close()
	db, err := persistence.New(cfg.DatabaseURL, cfg.GORMLogSQL)
	if err != nil {
		slog.Error("database_init_failed", slog.Any("err", err))
		os.Exit(1)
	}
	defer db.Close()

	if err := db.DB.AutoMigrate(
		&persistence.PolymarketSavedEventModel{},
		&persistence.ProjectModel{},
		&persistence.SessionModel{},
		&persistence.DashboardTopicModel{},
		&persistence.ScoredContentModel{},
	); err != nil {
		slog.Error("migration_failed", slog.Any("err", err))
	}

	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	wired, err := httpx.Wire(ctx, cfg, db)
	if err != nil {
		slog.Error("wire_failed", slog.Any("err", err))
		os.Exit(1)
	}

	srvAddr := fmt.Sprintf(":%s", cfg.HTTPPort)
	slog.Info("server_listen", slog.String("addr", srvAddr), slog.String("env", cfg.AppEnv))

	httpServer := &http.Server{
		Addr:              srvAddr,
		Handler:           wired.Router,
		ReadHeaderTimeout: 10 * time.Second,
	}

	go func() {
		if err := httpServer.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			slog.Error("http_server_failed", slog.Any("err", err))
			os.Exit(1)
		}
	}()

	quit := make(chan os.Signal, 2)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)

	sig := <-quit
	slog.Info("shutdown_signal_received", slog.String("signal", sig.String()))

	// 第二次 Ctrl+C 立即退出（避免 River 长任务导致多次按键无响应）
	go func() {
		force := <-quit
		slog.Warn("shutdown_forced", slog.String("signal", force.String()))
		os.Exit(1)
	}()

	// 先取消 Wire 上下文：停止 River 周期任务、River UI、在途 worker 的 ctx
	cancel()

	const shutdownBudget = 8 * time.Second
	shutdownCtx, shutdownCancel := context.WithTimeout(context.Background(), shutdownBudget)
	defer shutdownCancel()

	var wg sync.WaitGroup

	wg.Add(1)
	go func() {
		defer wg.Done()
		httpCtx, httpCancel := context.WithTimeout(shutdownCtx, 3*time.Second)
		defer httpCancel()
		if err := httpServer.Shutdown(httpCtx); err != nil {
			slog.Warn("http_shutdown", slog.Any("err", err))
		}
	}()

	wg.Add(1)
	go func() {
		defer wg.Done()
		if wired.River != nil {
			if err := wired.River.Stop(shutdownCtx); err != nil {
				slog.Warn("river_stop", slog.Any("err", err))
			}
		}
	}()

	wg.Wait()
	slog.Info("server_stopped")
}
