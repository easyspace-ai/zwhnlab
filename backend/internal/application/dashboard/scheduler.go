package dashboard

import (
	"context"
	"fmt"
	"log/slog"
	"sync"
	"time"
)

// Scheduler 定时调度器，负责按固定间隔执行聚合任务
type Scheduler struct {
	aggregator *AggregatorService
	interval   time.Duration
	mu         sync.Mutex
	running    bool
	jobMu      sync.Mutex
	ctx        context.Context
	cancel     context.CancelFunc
}

func NewScheduler(aggregator *AggregatorService, interval time.Duration) *Scheduler {
	ctx, cancel := context.WithCancel(context.Background())
	slog.Info("[dashboard-push] scheduler created",
		slog.String("interval", interval.String()),
		slog.String("session_id", aggregator.sessionID),
	)
	return &Scheduler{
		aggregator: aggregator,
		interval:   interval,
		ctx:        ctx,
		cancel:     cancel,
	}
}

// Start 启动定时调度
func (s *Scheduler) Start() {
	s.mu.Lock()
	if s.running {
		s.mu.Unlock()
		slog.Warn("[dashboard-push] scheduler already running, skipping start")
		return
	}
	s.running = true
	s.mu.Unlock()

	slog.Info("[dashboard-push] scheduler started",
		slog.String("interval", s.interval.String()),
		slog.String("session_id", s.aggregator.sessionID),
	)

	go func() {
		ticker := time.NewTicker(s.interval)
		defer ticker.Stop()

		slog.Info("[dashboard-push] scheduler tick: running initial job on startup")
		s.runOnce(RunSourceScheduled, false)

		for {
			select {
			case <-ticker.C:
				slog.Info("[dashboard-push] scheduler tick: running scheduled job")
				s.runOnce(RunSourceScheduled, false)
			case <-s.ctx.Done():
				slog.Info("[dashboard-push] scheduler stopped")
				return
			}
		}
	}()
}

// Stop 停止定时调度
func (s *Scheduler) Stop() {
	s.mu.Lock()
	defer s.mu.Unlock()
	if s.running {
		s.running = false
		s.cancel()
		s.ctx, s.cancel = context.WithCancel(context.Background())
		slog.Info("[dashboard-push] scheduler stopped by Stop()")
	}
}

// TriggerNow 手动触发（测试模式：推送 DB 最新 10 条，不影响定时去重游标）
func (s *Scheduler) TriggerNow() {
	slog.Info("[dashboard-push] manual trigger received, starting job in background")
	go s.runOnce(RunSourceManual, true)
}

func (s *Scheduler) runOnce(source RunSource, force bool) {
	if !s.jobMu.TryLock() {
		slog.Warn("[dashboard-push] job skipped, another push job is already running",
			slog.String("source", string(source)),
			slog.Bool("force", force),
		)
		return
	}
	defer s.jobMu.Unlock()

	ctx, cancel := context.WithTimeout(s.ctx, 5*time.Minute)
	defer cancel()

	slog.Info("[dashboard-push] job dispatch",
		slog.String("source", string(source)),
		slog.Bool("force", force),
	)
	st := s.aggregator.GetStatus()
	if err := s.aggregator.Run(ctx, source, force); err != nil {
		st = s.aggregator.GetStatus()
		slog.Error("[dashboard-push] job finished with error",
			slog.String("source", string(source)),
			slog.Bool("force", force),
			slog.String("error", err.Error()),
			slog.String("outcome", fmt.Sprint(st["lastRunOutcome"])),
			slog.String("last_error", fmt.Sprint(st["lastError"])),
			slog.String("skip_reason", fmt.Sprint(st["lastSkipReason"])),
		)
		return
	}
	st = s.aggregator.GetStatus()
	slog.Info("[dashboard-push] job finished",
		slog.String("source", string(source)),
		slog.Bool("force", force),
		slog.String("outcome", fmt.Sprint(st["lastRunOutcome"])),
		slog.Int("items", intFromAny(st["lastItemCount"])),
		slog.String("skip_reason", fmt.Sprint(st["lastSkipReason"])),
		slog.String("session_id", fmt.Sprint(st["sessionID"])),
	)
}

func intFromAny(v any) int {
	switch n := v.(type) {
	case int:
		return n
	case int64:
		return int(n)
	case float64:
		return int(n)
	default:
		return 0
	}
}

// GetStatus returns the current status of the aggregator
func (s *Scheduler) GetStatus() map[string]interface{} {
	return s.aggregator.GetStatus()
}
