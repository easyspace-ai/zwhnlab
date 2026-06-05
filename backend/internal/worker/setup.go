package worker

import (
	"context"
	"database/sql"
	"fmt"
	"log/slog"
	"net/http"
	"time"

	"github.com/easyspace-ai/ylmnote/internal/application/dashboard"
	"github.com/easyspace-ai/ylmnote/internal/application/xstream"
	"github.com/riverqueue/river"
	"github.com/riverqueue/river/riverdriver/riversqlite"
	"github.com/riverqueue/river/rivermigrate"
	"riverqueue.com/riverui"
)

// Config controls River client and periodic jobs.
type Config struct {
	MaxWorkers          int
	XStreamInterval     time.Duration
	DashboardInterval   time.Duration
	DashboardEnabled    bool
	UIPrefix            string
}

// Runtime holds the River client and optional UI handler.
type Runtime struct {
	Client    *river.Client[*sql.Tx]
	UIHandler http.Handler
}

// Deps are services workers need at runtime.
type Deps struct {
	SQLPool    *sql.DB
	Fetcher    *xstream.Fetcher
	Aggregator *dashboard.AggregatorService
}

// Setup migrates River schema, registers workers, starts the client, and prepares River UI.
func Setup(ctx context.Context, deps Deps, cfg Config) (*Runtime, error) {
	if deps.SQLPool == nil {
		return nil, fmt.Errorf("river: SQL pool is required")
	}
	if cfg.MaxWorkers <= 0 {
		cfg.MaxWorkers = 5
	}
	if cfg.XStreamInterval <= 0 {
		cfg.XStreamInterval = xstream.DefaultFetchInterval
	}
	if cfg.DashboardInterval <= 0 {
		cfg.DashboardInterval = time.Hour
	}
	if cfg.UIPrefix == "" {
		cfg.UIPrefix = "/jobs"
	}

	driver := riversqlite.New(deps.SQLPool)
	migrator, err := rivermigrate.New(driver, nil)
	if err != nil {
		return nil, fmt.Errorf("river migrate init: %w", err)
	}
	res, err := migrator.Migrate(ctx, rivermigrate.DirectionUp, nil)
	if err != nil {
		return nil, fmt.Errorf("river migrate up: %w", err)
	}
	for _, v := range res.Versions {
		slog.Info("river migration applied", slog.Int("version", v.Version))
	}

	ConfigureUniquePeriods(cfg.XStreamInterval, cfg.XStreamInterval)

	workers := river.NewWorkers()
	river.AddWorker(workers, &XStreamSyncWorker{
		Fetcher:    deps.Fetcher,
		Aggregator: deps.Aggregator,
	})
	river.AddWorker(workers, &XStreamInitWorker{Fetcher: deps.Fetcher})
	if deps.Aggregator != nil {
		river.AddWorker(workers, &DashboardAggregateWorker{Aggregator: deps.Aggregator})
	}

	periodicJobs := []*river.PeriodicJob{
		river.NewPeriodicJob(
			river.PeriodicInterval(cfg.XStreamInterval),
			func() (river.JobArgs, *river.InsertOpts) {
				return XStreamSyncArgs{}, nil
			},
			&river.PeriodicJobOpts{RunOnStart: true},
		),
	}

	client, err := river.NewClient(driver, &river.Config{
		Queues: map[string]river.QueueConfig{
			river.QueueDefault: {MaxWorkers: 2},
			QueueXStream:       {MaxWorkers: 1},
			QueueDashboard:     {MaxWorkers: 1},
		},
		Workers:      workers,
		PeriodicJobs: periodicJobs,
	})
	if err != nil {
		return nil, fmt.Errorf("river new client: %w", err)
	}
	if err := client.Start(ctx); err != nil {
		return nil, fmt.Errorf("river start: %w", err)
	}
	slog.Info("river worker started",
		slog.Int("max_workers_default", cfg.MaxWorkers),
		slog.Duration("sync_interval", cfg.XStreamInterval),
		slog.Bool("w6_push_after_fetch", cfg.DashboardEnabled),
	)

	rt := &Runtime{Client: client}

	endpoints := riverui.NewEndpoints(client, nil)
	uiHandler, err := riverui.NewHandler(&riverui.HandlerOpts{
		Endpoints: endpoints,
		Logger:    slog.Default(),
		Prefix:    cfg.UIPrefix,
	})
	if err != nil {
		return nil, fmt.Errorf("river ui handler: %w", err)
	}
	if err := uiHandler.Start(ctx); err != nil {
		return nil, fmt.Errorf("river ui start: %w", err)
	}
	rt.UIHandler = uiHandler
	slog.Info("river ui mounted", slog.String("prefix", cfg.UIPrefix))

	return rt, nil
}

// Stop cancels in-flight jobs and shuts down River. Wire ctx should be cancelled before calling.
func (r *Runtime) Stop(ctx context.Context) error {
	if r == nil || r.Client == nil {
		return nil
	}
	slog.Info("stopping river workers...")
	return r.Client.StopAndCancel(ctx)
}
