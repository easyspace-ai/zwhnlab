package scheduler

import (
	"context"
	"log/slog"
	"sync"
	"time"

	"github.com/easyspace-ai/ylmnote/internal/application/dashboard"
	"github.com/easyspace-ai/ylmnote/internal/application/xstream"
)

// Scheduler runs periodic xstream sync and optional dashboard push.
type Scheduler struct {
	fetcher    *xstream.Fetcher
	aggregator *dashboard.AggregatorService
	interval   time.Duration

	mu      sync.Mutex
	running bool
	wg      sync.WaitGroup
	jobWg   sync.WaitGroup
}

// New creates a scheduler. interval controls the xstream sync ticker.
func New(fetcher *xstream.Fetcher, aggregator *dashboard.AggregatorService, interval time.Duration) *Scheduler {
	if interval <= 0 {
		interval = xstream.DefaultFetchInterval
	}
	return &Scheduler{
		fetcher:    fetcher,
		aggregator: aggregator,
		interval:   interval,
	}
}

// Start launches the background ticker and runs one sync immediately.
func (s *Scheduler) Start(ctx context.Context) {
	s.wg.Add(1)
	go func() {
		defer s.wg.Done()
		s.runXStreamSync(ctx)

		ticker := time.NewTicker(s.interval)
		defer ticker.Stop()

		for {
			select {
			case <-ctx.Done():
				return
			case <-ticker.C:
				s.runXStreamSync(ctx)
			}
		}
	}()
	slog.Info("scheduler started", slog.Duration("xstream_interval", s.interval))
}

// Stop waits for the ticker goroutine and in-flight jobs, or until ctx is cancelled.
func (s *Scheduler) Stop(ctx context.Context) error {
	done := make(chan struct{})
	go func() {
		s.wg.Wait()
		s.jobWg.Wait()
		close(done)
	}()
	select {
	case <-done:
		slog.Info("scheduler stopped")
		return nil
	case <-ctx.Done():
		return ctx.Err()
	}
}

// RunXStreamSync performs init (if enabled) + incremental fetch + optional dashboard push.
// Concurrent calls are skipped (single-flight).
func (s *Scheduler) RunXStreamSync(ctx context.Context) error {
	if !s.tryAcquire() {
		slog.Info("[scheduler] xstream_sync skipped (already running)")
		return nil
	}
	defer s.release()
	return s.runXStreamSync(ctx)
}

func (s *Scheduler) runXStreamSync(ctx context.Context) error {
	s.jobWg.Add(1)
	defer s.jobWg.Done()

	if s.fetcher == nil {
		return nil
	}
	slog.Info("[scheduler] xstream_sync start")
	if !s.fetcher.IsInitDone() {
		if xstream.InitEnabledFromEnv() {
			slog.Info("[scheduler] xstream_sync: running initialization (XSTREAM_INIT_ENABLED=true)")
			if err := s.fetcher.Initialize(ctx); err != nil {
				return err
			}
		} else {
			slog.Info("[scheduler] xstream_sync: skipping init (XSTREAM_INIT_ENABLED=false, use POST /xstream/init to trigger)")
		}
	}
	if err := s.fetcher.FetchOnce(ctx); err != nil {
		return err
	}
	if s.aggregator == nil {
		return nil
	}
	slog.Info("[scheduler] xstream_sync: evaluating W6 push after fetch")
	return s.aggregator.Run(ctx, dashboard.RunSourceScheduled, false)
}

// RunDashboardAggregate pushes dashboard content to W6.
func (s *Scheduler) RunDashboardAggregate(ctx context.Context, source dashboard.RunSource, force bool) error {
	if s.aggregator == nil {
		return nil
	}
	ctx, cancel := context.WithTimeout(ctx, 5*time.Minute)
	defer cancel()
	slog.Info("[scheduler] dashboard_aggregate start",
		slog.String("source", string(source)),
		slog.Bool("force", force),
	)
	return s.aggregator.Run(ctx, source, force)
}

func (s *Scheduler) tryAcquire() bool {
	s.mu.Lock()
	defer s.mu.Unlock()
	if s.running {
		return false
	}
	s.running = true
	return true
}

func (s *Scheduler) release() {
	s.mu.Lock()
	defer s.mu.Unlock()
	s.running = false
}
