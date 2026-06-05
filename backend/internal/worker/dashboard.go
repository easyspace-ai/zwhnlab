package worker

import (
	"context"
	"log/slog"
	"time"

	"github.com/easyspace-ai/ylmnote/internal/application/dashboard"
	"github.com/riverqueue/river"
)

const KindDashboardAggregate = "dashboard_aggregate"

// DashboardAggregateArgs runs the dashboard push aggregator.
type DashboardAggregateArgs struct {
	Source string `json:"source"` // "scheduled" | "manual"
}

func (DashboardAggregateArgs) Kind() string { return KindDashboardAggregate }

func (a DashboardAggregateArgs) runSource() dashboard.RunSource {
	if a.Source == string(dashboard.RunSourceManual) {
		return dashboard.RunSourceManual
	}
	return dashboard.RunSourceScheduled
}

type DashboardAggregateWorker struct {
	river.WorkerDefaults[DashboardAggregateArgs]
	Aggregator *dashboard.AggregatorService
}

func (w *DashboardAggregateWorker) Work(ctx context.Context, job *river.Job[DashboardAggregateArgs]) error {
	if w.Aggregator == nil {
		return nil
	}
	source := job.Args.runSource()
	force := source == dashboard.RunSourceManual

	ctx, cancel := context.WithTimeout(ctx, 5*time.Minute)
	defer cancel()

	slog.Info("[river] dashboard_aggregate job start",
		slog.Int64("job_id", job.ID),
		slog.String("source", string(source)),
		slog.Bool("force", force),
	)
	return w.Aggregator.Run(ctx, source, force)
}
