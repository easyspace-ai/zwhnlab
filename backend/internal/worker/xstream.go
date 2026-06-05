package worker

import (
	"context"
	"log/slog"

	"github.com/easyspace-ai/ylmnote/internal/application/dashboard"
	"github.com/easyspace-ai/ylmnote/internal/application/xstream"
	"github.com/riverqueue/river"
)

const KindXStreamSync = "xstream_sync"

// XStreamSyncArgs runs init (if needed) then incremental fetch.
type XStreamSyncArgs struct{}

func (XStreamSyncArgs) Kind() string { return KindXStreamSync }

type XStreamSyncWorker struct {
	river.WorkerDefaults[XStreamSyncArgs]
	Fetcher    *xstream.Fetcher
	Aggregator *dashboard.AggregatorService
}

func (w *XStreamSyncWorker) Work(ctx context.Context, job *river.Job[XStreamSyncArgs]) error {
	if w.Fetcher == nil {
		return nil
	}
	slog.Info("[river] xstream_sync start",
		slog.Int64("job_id", job.ID),
		slog.Time("scheduled_at", job.ScheduledAt),
		slog.Duration("dedup_period", xstreamUniquePeriod),
	)
	if !w.Fetcher.IsInitDone() {
		if xstream.InitEnabledFromEnv() {
			slog.Info("[river] xstream_sync: running initialization (XSTREAM_INIT_ENABLED=true)")
			if err := w.Fetcher.Initialize(ctx); err != nil {
				return err
			}
		} else {
			slog.Info("[river] xstream_sync: skipping init (XSTREAM_INIT_ENABLED=false, use POST /xstream/init to trigger)")
		}
	}
	if err := w.Fetcher.FetchOnce(ctx); err != nil {
		return err
	}
	if w.Aggregator == nil {
		return nil
	}
	slog.Info("[river] xstream_sync: evaluating W6 push after fetch")
	return w.Aggregator.Run(ctx, dashboard.RunSourceScheduled, false)
}

const KindXStreamInit = "xstream_init"

type XStreamInitArgs struct{}

func (XStreamInitArgs) Kind() string { return KindXStreamInit }

type XStreamInitWorker struct {
	river.WorkerDefaults[XStreamInitArgs]
	Fetcher *xstream.Fetcher
}

func (w *XStreamInitWorker) Work(ctx context.Context, job *river.Job[XStreamInitArgs]) error {
	if w.Fetcher == nil {
		return nil
	}
	return w.Fetcher.Initialize(ctx)
}
