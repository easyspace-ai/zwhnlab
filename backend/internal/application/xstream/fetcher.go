package xstream

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"
	"sync"
	"time"

	"github.com/easyspace-ai/ylmnote/internal/infrastructure/persistence"
)

const DefaultFetchInterval = 10 * time.Minute
const DefaultLimit = 50
const InitBatchLimit = 1000
const InitBatchDelay = 5 * time.Second

type InitState string

const (
	InitStateIdle      InitState = "idle"
	InitStateRunning   InitState = "running"
	InitStateCompleted InitState = "completed"
	InitStateFailed    InitState = "failed"
	InitStateCancelled InitState = "cancelled"
)

// InitProgress tracks a full-history backfill for admin UI polling.
type InitProgress struct {
	Status          InitState `json:"status"`
	InitDone        bool      `json:"initDone"`
	ItemCount       int64     `json:"itemCount"`
	BatchesDone     int       `json:"batchesDone"`
	LastBatchStored int       `json:"lastBatchStored"`
	TotalStoredRun  int       `json:"totalStoredThisRun"`
	CurrentCursor   int64     `json:"currentCursor"`
	HasMore         bool      `json:"hasMore"`
	Error           string    `json:"error,omitempty"`
	StartedAt       string    `json:"startedAt,omitempty"`
	UpdatedAt       string    `json:"updatedAt,omitempty"`
}

// Fetcher pulls X stream monitor data into the local database.
type Fetcher struct {
	repo         *persistence.XStreamRepository
	client       *http.Client
	mu           sync.Mutex
	initDone     bool
	initRunning  bool
	initCancel   context.CancelFunc
	initProgress InitProgress
}

func NewFetcher(repo *persistence.XStreamRepository) *Fetcher {
	f := &Fetcher{
		repo:   repo,
		client: &http.Client{Timeout: 30 * time.Second},
		initProgress: InitProgress{
			Status: InitStateIdle,
		},
	}
	// initDone 仅存内存；若 DB 已有数据则视为初始化完成，避免重启后重复全量回溯。
	if repo != nil {
		if maxID, err := repo.GetLatestID(); err == nil && maxID > 0 {
			f.initDone = true
			f.initProgress.InitDone = true
		}
	}
	return f
}

func (f *Fetcher) HTTPClient() *http.Client {
	return f.client
}

func (f *Fetcher) IsInitDone() bool {
	f.mu.Lock()
	defer f.mu.Unlock()
	return f.initDone
}

func (f *Fetcher) IsInitRunning() bool {
	f.mu.Lock()
	defer f.mu.Unlock()
	return f.initRunning
}

func (f *Fetcher) GetInitProgress() InitProgress {
	f.mu.Lock()
	defer f.mu.Unlock()
	p := f.initProgress
	p.InitDone = f.initDone
	if f.repo != nil {
		if count, err := f.repo.CountAll(); err == nil {
			p.ItemCount = count
		}
	}
	return p
}

func (f *Fetcher) storePage(result *persistence.XStreamAPIResponse) (int, error) {
	if result == nil || len(result.Data.List) == 0 {
		return 0, nil
	}
	items := make([]persistence.XStreamItemModel, len(result.Data.List))
	for i, apiItem := range result.Data.List {
		items[i] = apiItem.ToModel()
	}
	if err := f.repo.BatchUpsert(items); err != nil {
		return 0, err
	}
	return len(items), nil
}

func (f *Fetcher) touchProgress(fn func(*InitProgress)) {
	f.mu.Lock()
	defer f.mu.Unlock()
	fn(&f.initProgress)
	f.initProgress.UpdatedAt = time.Now().Format(time.RFC3339)
	f.initProgress.InitDone = f.initDone
}

func (f *Fetcher) finishInit(status InitState, err error) {
	f.mu.Lock()
	defer f.mu.Unlock()
	f.initRunning = false
	f.initCancel = nil
	f.initProgress.Status = status
	f.initProgress.UpdatedAt = time.Now().Format(time.RFC3339)
	f.initProgress.InitDone = f.initDone
	if err != nil && status == InitStateFailed {
		f.initProgress.Error = err.Error()
	} else {
		f.initProgress.Error = ""
	}
}

// ClearLocalData removes all cached xstream rows and resets init state.
func (f *Fetcher) ClearLocalData() error {
	f.mu.Lock()
	defer f.mu.Unlock()
	if f.initRunning {
		return fmt.Errorf("initialization is running")
	}
	if f.repo == nil {
		return fmt.Errorf("repository not configured")
	}
	if err := f.repo.DeleteAll(); err != nil {
		return err
	}
	f.initDone = false
	f.initProgress = InitProgress{
		Status:    InitStateIdle,
		InitDone:  false,
		UpdatedAt: time.Now().Format(time.RFC3339),
	}
	return nil
}

// StartInitialize clears (optional) and runs full backfill asynchronously.
// Uses a detached context so the job survives after the HTTP handler returns.
func (f *Fetcher) StartInitialize(clearFirst bool) error {
	f.mu.Lock()
	if f.initRunning {
		f.mu.Unlock()
		return fmt.Errorf("initialization already running")
	}
	if f.repo == nil {
		f.mu.Unlock()
		return fmt.Errorf("repository not configured")
	}
	if clearFirst {
		if err := f.repo.DeleteAll(); err != nil {
			f.mu.Unlock()
			return err
		}
		f.initDone = false
	}
	ctx, cancel := context.WithCancel(context.Background())
	f.initRunning = true
	f.initCancel = cancel
	now := time.Now().Format(time.RFC3339)
	f.initProgress = InitProgress{
		Status:    InitStateRunning,
		InitDone:  f.initDone,
		StartedAt: now,
		UpdatedAt: now,
	}
	f.mu.Unlock()

	go func() {
		err := f.runInitialize(ctx)
		switch {
		case err == nil:
			f.finishInit(InitStateCompleted, nil)
		case err == context.Canceled:
			f.mu.Lock()
			f.initDone = false
			f.mu.Unlock()
			f.finishInit(InitStateCancelled, err)
		default:
			f.mu.Lock()
			f.initDone = false
			f.mu.Unlock()
			f.finishInit(InitStateFailed, err)
		}
	}()
	return nil
}

// CancelInitialize stops an in-flight backfill.
func (f *Fetcher) CancelInitialize() bool {
	f.mu.Lock()
	cancel := f.initCancel
	f.mu.Unlock()
	if cancel == nil {
		return false
	}
	cancel()
	return true
}

// Initialize runs a blocking full backfill.
func (f *Fetcher) Initialize(ctx context.Context) error {
	return f.runInitialize(ctx)
}

// runInitialize 从 sinceId=0（最新）开始，按 nextSinceId 向历史回溯直到 hasMore=false。
func (f *Fetcher) runInitialize(ctx context.Context) error {
	cursor := int64(0)
	batchesDone := 0
	totalStored := 0

	f.touchProgress(func(p *InitProgress) {
		p.Status = InitStateRunning
		p.BatchesDone = 0
		p.LastBatchStored = 0
		p.TotalStoredRun = 0
		p.CurrentCursor = 0
		p.HasMore = true
		p.Error = ""
		if p.StartedAt == "" {
			p.StartedAt = time.Now().Format(time.RFC3339)
		}
	})

	log.Println("XStream: starting initialization (sinceId=0 = latest, then nextSinceId for older history)")

	for {
		select {
		case <-ctx.Done():
			log.Println("XStream: initialization cancelled")
			return ctx.Err()
		default:
		}

		if cursor == 0 {
			log.Printf("XStream: fetching latest page (sinceId omitted), limit=%d", InitBatchLimit)
		} else {
			log.Printf("XStream: fetching history before id=%d, limit=%d", cursor, InitBatchLimit)
		}

		result, err := FetchPage(ctx, f.client, cursor, InitBatchLimit, "")
		if err != nil {
			return fmt.Errorf("fetch at cursor %d: %w", cursor, err)
		}

		n, err := f.storePage(result)
		if err != nil {
			return fmt.Errorf("store at cursor %d: %w", cursor, err)
		}

		nextID, hasMore := NextCursor(result.Data)
		batchesDone++
		totalStored += n

		f.touchProgress(func(p *InitProgress) {
			p.BatchesDone = batchesDone
			p.LastBatchStored = n
			p.TotalStoredRun = totalStored
			p.CurrentCursor = cursor
			p.HasMore = hasMore && nextID > 0
		})

		if n == 0 {
			log.Println("XStream: initialization complete (empty page)")
			f.mu.Lock()
			f.initDone = true
			f.mu.Unlock()
			return nil
		}

		log.Printf("XStream: stored %d items, nextSinceId=%d, hasMore=%v", n, nextID, hasMore)

		if !hasMore || nextID <= 0 || (cursor > 0 && nextID >= cursor) {
			log.Println("XStream: initialization complete")
			f.mu.Lock()
			f.initDone = true
			f.mu.Unlock()
			return nil
		}

		cursor = nextID

		select {
		case <-ctx.Done():
			log.Println("XStream: initialization cancelled")
			return ctx.Err()
		case <-time.After(InitBatchDelay):
		}
	}
}

func (f *Fetcher) fetchAndStore(ctx context.Context, sinceID int64, limit int) (int, error) {
	result, err := FetchPage(ctx, f.client, sinceID, limit, "")
	if err != nil {
		return 0, err
	}
	return f.storePage(result)
}

// FetchHistoryBefore 从上游拉取 beforeRemoteID 之前的一页历史并写入 DB（用于 Dashboard 加载更多补库）。
// beforeRemoteID=0 时拉取最新一页。
func (f *Fetcher) FetchHistoryBefore(ctx context.Context, itemType string, beforeRemoteID int64, limit int) (stored int, nextCursor int64, hasMore bool, err error) {
	if limit <= 0 {
		limit = DefaultLimit
	}
	if limit > 1000 {
		limit = 1000
	}
	cursor := beforeRemoteID
	result, err := FetchPage(ctx, f.client, cursor, limit, itemType)
	if err != nil {
		return 0, 0, false, err
	}
	n, err := f.storePage(result)
	if err != nil {
		return 0, 0, false, err
	}
	nextCursor, hasMore = NextCursor(result.Data)
	return n, nextCursor, hasMore, nil
}

// FetchOnce 定时增量：sinceId=0 拉取最新一批（勿用 DB max id 作为 sinceId）。
func (f *Fetcher) FetchOnce(ctx context.Context) error {
	limit := LimitFromEnv()
	log.Printf("XStream: fetching latest page (sinceId=0), limit=%d", limit)

	n, err := f.fetchAndStore(ctx, 0, limit)
	if err != nil {
		log.Printf("XStream: fetch error: %v", err)
		return err
	}
	if n == 0 {
		log.Println("XStream: no items on latest page")
		return nil
	}
	log.Printf("XStream: stored %d items from latest page", n)
	return nil
}

// InitEnabledFromEnv reads XSTREAM_INIT_ENABLED (default false).
// When false, the sync worker skips automatic full history backfill.
// Use POST /api/admin/xstream/init to trigger manual backfill when needed.
func InitEnabledFromEnv() bool {
	return os.Getenv("XSTREAM_INIT_ENABLED") == "true" || os.Getenv("XSTREAM_INIT_ENABLED") == "1"
}

// IntervalFromEnv reads XSTREAM_FETCH_INTERVAL (duration or minutes).
func IntervalFromEnv() time.Duration {
	intervalStr := os.Getenv("XSTREAM_FETCH_INTERVAL")
	if intervalStr == "" {
		return DefaultFetchInterval
	}
	if interval, err := time.ParseDuration(intervalStr); err == nil {
		return interval
	}
	if minutes, err := strconv.Atoi(intervalStr); err == nil {
		return time.Duration(minutes) * time.Minute
	}
	return DefaultFetchInterval
}
