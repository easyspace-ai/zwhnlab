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

// Fetcher pulls X stream monitor data into the local database.
type Fetcher struct {
	repo     *persistence.XStreamRepository
	client   *http.Client
	mu       sync.Mutex
	initDone bool
}

func NewFetcher(repo *persistence.XStreamRepository) *Fetcher {
	return &Fetcher{
		repo:   repo,
		client: &http.Client{Timeout: 30 * time.Second},
	}
}

func (f *Fetcher) HTTPClient() *http.Client {
	return f.client
}

func (f *Fetcher) IsInitDone() bool {
	f.mu.Lock()
	defer f.mu.Unlock()
	return f.initDone
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

// Initialize 从 sinceId=0（最新）开始，按 nextSinceId 向历史回溯直到 hasMore=false。
func (f *Fetcher) Initialize(ctx context.Context) error {
	f.mu.Lock()
	defer f.mu.Unlock()

	const batchLimit = 1000
	cursor := int64(0)
	log.Println("XStream: starting initialization (sinceId=0 = latest, then nextSinceId for older history)")

	for {
		select {
		case <-ctx.Done():
			log.Println("XStream: initialization cancelled")
			f.initDone = false
			return ctx.Err()
		default:
		}

		if cursor == 0 {
			log.Printf("XStream: fetching latest page (sinceId omitted)")
		} else {
			log.Printf("XStream: fetching history before id=%d", cursor)
		}

		result, err := FetchPage(ctx, f.client, cursor, batchLimit, "")
		if err != nil {
			return fmt.Errorf("fetch at cursor %d: %w", cursor, err)
		}

		n, err := f.storePage(result)
		if err != nil {
			return fmt.Errorf("store at cursor %d: %w", cursor, err)
		}
		if n == 0 {
			log.Println("XStream: initialization complete (empty page)")
			f.initDone = true
			return nil
		}

		nextID, hasMore := NextCursor(result.Data)
		log.Printf("XStream: stored %d items, nextSinceId=%d, hasMore=%v", n, nextID, hasMore)

		if !hasMore || nextID <= 0 || (cursor > 0 && nextID >= cursor) {
			log.Println("XStream: initialization complete")
			f.initDone = true
			return nil
		}
		cursor = nextID
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
// Use POST /xstream/init to trigger manual backfill when needed.
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
