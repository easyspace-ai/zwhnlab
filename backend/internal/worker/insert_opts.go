package worker

import (
	"time"

	"github.com/easyspace-ai/ylmnote/internal/application/xstream"
	"github.com/riverqueue/river"
)

const (
	QueueXStream   = "xstream"
	QueueDashboard = "dashboard"
)

var (
	xstreamUniquePeriod   = xstream.DefaultFetchInterval
	dashboardUniquePeriod = time.Hour
)

// ConfigureUniquePeriods sets dedup windows for periodic and manual inserts (call from Setup).
func ConfigureUniquePeriods(xstreamInterval, dashboardInterval time.Duration) {
	if xstreamInterval > 0 {
		xstreamUniquePeriod = xstreamInterval
	}
	if dashboardInterval > 0 {
		dashboardUniquePeriod = dashboardInterval
	}
}

func (XStreamSyncArgs) InsertOpts() river.InsertOpts {
	return river.InsertOpts{
		Queue: QueueXStream,
		UniqueOpts: river.UniqueOpts{
			ByArgs:   true,
			ByPeriod: xstreamUniquePeriod,
			ByQueue:  true,
		},
	}
}

func (XStreamInitArgs) InsertOpts() river.InsertOpts {
	return river.InsertOpts{
		Queue: QueueXStream,
		UniqueOpts: river.UniqueOpts{
			ByArgs:   true,
			ByPeriod: time.Hour,
			ByQueue:  true,
		},
	}
}

func (DashboardAggregateArgs) InsertOpts() river.InsertOpts {
	return river.InsertOpts{
		Queue: QueueDashboard,
		UniqueOpts: river.UniqueOpts{
			ByArgs:   true,
			ByPeriod: dashboardUniquePeriod,
			ByQueue:  true,
		},
	}
}

// ManualDashboardInsertOpts allows more frequent manual test pushes than scheduled runs.
func ManualDashboardInsertOpts() *river.InsertOpts {
	return &river.InsertOpts{
		Queue: QueueDashboard,
		UniqueOpts: river.UniqueOpts{
			ByArgs:   true,
			ByPeriod: time.Minute,
			ByQueue:  true,
		},
	}
}
