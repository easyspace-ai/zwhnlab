package dashboard

import (
	"context"
	"fmt"
	"log/slog"
	"net/http"
	"strings"
	"sync"
	"time"

	"github.com/easyspace-ai/ylmnote/internal/application/sessionsend"
	"github.com/easyspace-ai/ylmnote/internal/application/xstream"
	"github.com/easyspace-ai/ylmnote/internal/infrastructure/persistence"
)

const (
	streamAPIBaseURL      = xstream.APIBaseURL
	streamAPITimeout      = 30 * time.Second
	pushLogPrefix         = "[dashboard-push]"
	pushRecentMaxItems    = 500
	manualPushLatestCount = 10 // 网页手动「聚合推送」：每次取 DB 最新 N 条，用于测试
	defaultPushMinItems   = 5  // 定时：未推送新条目数须 **大于** 此值才推送 W6（即至少 6 条）
)

// RunSource identifies whether a push run was manual or scheduled.
type RunSource string

const (
	RunSourceManual    RunSource = "manual"
	RunSourceScheduled RunSource = "scheduled"
)

// RunOutcome describes what happened during a push run.
type RunOutcome string

const (
	RunOutcomeSent    RunOutcome = "sent"
	RunOutcomeSkipped RunOutcome = "skipped"
	RunOutcomeFailed  RunOutcome = "failed"
)

// AggregatorService 负责从监测流拉取数据、聚合后推送到 W6 AI 固定会话
type AggregatorService struct {
	repo            *persistence.XStreamRepository
	sessionSender   *sessionsend.Sender
	sessionID       string
	client          *http.Client
	mu              sync.Mutex
	lastRunAt       time.Time
	lastItemCount    int
	lastPendingCount int // 定时：自上次成功推送以来 DB 中待推送总数
	lastError        string
	lastSentMaxID    int64
	lastRunSource   RunSource
	lastRunOutcome  RunOutcome
	lastSkipReason  string
	pushMinItems    int // 定时推送阈值：新条目数须大于此值
}

func NewAggregatorService(
	repo *persistence.XStreamRepository,
	sessionSender *sessionsend.Sender,
	sessionID string,
	pushMinItems int,
) *AggregatorService {
	if pushMinItems <= 0 {
		pushMinItems = defaultPushMinItems
	}
	slog.Info(pushLogPrefix+" service initialized",
		slog.String("session_id", sessionID),
		slog.String("api_url", streamAPIBaseURL),
		slog.String("send_module", sessionsend.LogPrefix),
		slog.Int("push_min_items", pushMinItems),
	)
	return &AggregatorService{
		repo:          repo,
		sessionSender: sessionSender,
		sessionID:     sessionID,
		client:        &http.Client{Timeout: streamAPITimeout},
		pushMinItems:  pushMinItems,
	}
}

// Run 执行一次完整的聚合推送流程。
// - 定时任务（scheduled）：查询 remote_id > lastSentMaxID 的全部待推送条目；仅当待推送总数 > pushMinItems 时一次性推送
//   （含上一周期因不足阈值而累积的条目）。跳过时不推进游标，下一周期会合并再判断。
// - 手动触发（manual）：每次取 DB 最新 10 条，用于前台测试，不影响定时去重游标。
func (s *AggregatorService) Run(ctx context.Context, source RunSource, force bool) error {
	isManual := source == RunSourceManual
	s.mu.Lock()
	s.lastRunAt = time.Now().UTC()
	s.lastRunSource = source
	s.lastRunOutcome = ""
	s.lastSkipReason = ""
	pushMin := s.pushMinItems
	s.mu.Unlock()

	mode := "scheduled_incremental"
	if isManual {
		mode = "manual_latest_10"
	}
	slog.Info(pushLogPrefix+" job started",
		slog.String("source", string(source)),
		slog.String("mode", mode),
		slog.Bool("force", force),
		slog.String("session_id", s.sessionID),
		slog.Time("run_time", s.lastRunAt),
		slog.Int64("last_sent_max_id", s.lastSentMaxID),
	)

	if s.sessionID == "" {
		err := fmt.Errorf("DASHBOARD_SESSION_ID is not configured")
		s.setRunFailed(err.Error())
		slog.Error(pushLogPrefix+" push failed",
			slog.String("source", string(source)),
			slog.String("reason", "missing_session_id"),
			slog.String("error", err.Error()),
		)
		return err
	}

	// 1. 尝试从源 API 拉取增量（补漏；主数据源为 DB）
	slog.Info(pushLogPrefix+" fetching incremental items from source API")
	apiItems, apiErr := s.fetchLatestItems(ctx)
	if apiErr != nil {
		slog.Warn(pushLogPrefix+" source API fetch failed, continuing with DB items",
			slog.String("error", apiErr.Error()),
		)
	} else {
		slog.Info(pushLogPrefix+" source API fetch completed",
			slog.Int("api_items", len(apiItems)),
		)
	}

	var recentItems []persistence.XStreamItemModel
	var err error

	if isManual {
		// 手动测试：始终推送 DB 中最新 10 条（不按小时、不按去重游标）
		slog.Info(pushLogPrefix+" loading latest items for manual test",
			slog.Int("limit", manualPushLatestCount),
		)
		recentItems, err = s.repo.List(manualPushLatestCount, 0, "")
	} else {
		if err := s.syncPushCursorFromDB(); err != nil {
			s.setRunFailed(err.Error())
			return fmt.Errorf("load push cursor: %w", err)
		}
		s.mu.Lock()
		lastSentID := s.lastSentMaxID
		s.mu.Unlock()

		var pendingTotal int64
		pendingTotal, err = s.repo.CountSince(lastSentID, "")
		if err != nil {
			s.setRunFailed(err.Error())
			return fmt.Errorf("count pending items: %w", err)
		}
		s.mu.Lock()
		s.lastPendingCount = int(pendingTotal)
		s.mu.Unlock()

		slog.Info(pushLogPrefix+" loading pending items since last push",
			slog.Int64("min_remote_id", lastSentID),
			slog.Int("pending_total", int(pendingTotal)),
			slog.Int("push_min_items", pushMin),
		)
		recentItems, err = s.repo.ListSince(lastSentID, pushRecentMaxItems, "")
		if err == nil && pendingTotal > int64(len(recentItems)) {
			slog.Warn(pushLogPrefix+" pending backlog exceeds batch cap",
				slog.Int64("pending_total", pendingTotal),
				slog.Int("batch_cap", pushRecentMaxItems),
				slog.Int("batch_size", len(recentItems)),
			)
		}
	}

	if err != nil {
		s.setRunFailed(err.Error())
		slog.Error(pushLogPrefix+" push failed",
			slog.String("source", string(source)),
			slog.String("reason", "db_query_failed"),
			slog.String("error", err.Error()),
		)
		return fmt.Errorf("load recent items from DB failed: %w", err)
	}

	logAttrs := []any{
		slog.Int("api_items", len(apiItems)),
		slog.Int("db_items", len(recentItems)),
		slog.String("mode", mode),
	}
	if !isManual {
		logAttrs = append(logAttrs, slog.Int("push_min_items", pushMin))
	}
	slog.Info(pushLogPrefix+" data fetched", logAttrs...)

	if len(recentItems) == 0 {
		reason := "no items in database"
		if !isManual {
			reason = "no new items since last push"
			s.mu.Lock()
			if s.lastSentMaxID > 0 {
				reason = fmt.Sprintf("no new items since last push (remote_id > %d)", s.lastSentMaxID)
			}
			s.mu.Unlock()
		}
		s.setRunSkipped(reason, 0)
		slog.Warn(pushLogPrefix+" push skipped",
			slog.String("source", string(source)),
			slog.String("reason", reason),
			slog.Int64("last_sent_max_id", s.lastSentMaxID),
		)
		return nil
	}

	if !isManual && !force {
		pending := s.lastPendingCount
		if pending == 0 {
			pending = len(recentItems)
		}
		if pending <= pushMin {
			reason := fmt.Sprintf("%d pending items (accumulating, need more than %d to push)", pending, pushMin)
			s.setRunSkipped(reason, pending)
			slog.Info(pushLogPrefix+" push skipped, will accumulate for next cycle",
				slog.String("source", string(source)),
				slog.String("reason", reason),
				slog.Int("pending_total", pending),
				slog.Int("push_min_items", pushMin),
				slog.Int64("last_sent_max_id", s.lastSentMaxID),
			)
			return nil
		}
	}

	var currentMaxID int64
	for _, item := range recentItems {
		if item.RemoteID > currentMaxID {
			currentMaxID = item.RemoteID
		}
	}

	// 3. 聚合内容
	pendingForTitle := len(recentItems)
	if !isManual {
		s.mu.Lock()
		pendingForTitle = s.lastPendingCount
		s.mu.Unlock()
	}
	aggregatedContent := s.aggregateItems(recentItems, isManual, pendingForTitle)
	slog.Info(pushLogPrefix+" content aggregated",
		slog.Int("item_count", len(recentItems)),
		slog.Int("payload_bytes", len(aggregatedContent)),
		slog.Int64("max_remote_id", currentMaxID),
	)

	// 4. 推送到 W6 AI 固定会话
	slog.Info(pushLogPrefix+" push attempt",
		slog.String("destination", "w6"),
		slog.String("session_id", s.sessionID),
		slog.Int("payload_bytes", len(aggregatedContent)),
		slog.Int("item_count", len(recentItems)),
	)
	if err := s.sendToW6(ctx, aggregatedContent); err != nil {
		s.setRunFailed(err.Error())
		slog.Error(pushLogPrefix+" push failed",
			slog.String("source", string(source)),
			slog.String("session_id", s.sessionID),
			slog.Int("payload_bytes", len(aggregatedContent)),
			slog.String("error", err.Error()),
		)
		return fmt.Errorf("send to W6 failed: %w", err)
	}

	s.mu.Lock()
	s.lastItemCount = len(recentItems)
	s.lastError = ""
	s.lastRunOutcome = RunOutcomeSent
	s.lastSkipReason = ""
	if !isManual {
		s.lastSentMaxID = currentMaxID
	}
	s.mu.Unlock()

	if !isManual && currentMaxID > 0 {
		if err := s.persistPushCursor(currentMaxID); err != nil {
			slog.Warn(pushLogPrefix+" push succeeded but cursor persist failed",
				slog.String("error", err.Error()),
				slog.Int64("max_remote_id", currentMaxID),
			)
		}
	}

	successAttrs := []any{
		slog.String("source", string(source)),
		slog.String("mode", mode),
		slog.String("session_id", s.sessionID),
		slog.Int("items_sent", len(recentItems)),
		slog.Int("payload_bytes", len(aggregatedContent)),
	}
	if !isManual {
		successAttrs = append(successAttrs, slog.Int64("new_max_id", currentMaxID))
	}
	slog.Info(pushLogPrefix+" push succeeded", successAttrs...)
	return nil
}

func (s *AggregatorService) setRunFailed(errMsg string) {
	s.mu.Lock()
	defer s.mu.Unlock()
	s.lastError = errMsg
	s.lastRunOutcome = RunOutcomeFailed
	s.lastSkipReason = ""
}

func (s *AggregatorService) syncPushCursorFromDB() error {
	id, err := s.repo.GetPushLastSentMaxID(s.sessionID)
	if err != nil {
		return err
	}
	s.mu.Lock()
	s.lastSentMaxID = id
	s.mu.Unlock()
	return nil
}

func (s *AggregatorService) persistPushCursor(maxRemoteID int64) error {
	s.mu.Lock()
	s.lastSentMaxID = maxRemoteID
	s.mu.Unlock()
	return s.repo.SetPushLastSentMaxID(s.sessionID, maxRemoteID)
}

func (s *AggregatorService) setRunSkipped(reason string, itemCount int) {
	s.mu.Lock()
	defer s.mu.Unlock()
	s.lastItemCount = itemCount
	s.lastError = ""
	s.lastRunOutcome = RunOutcomeSkipped
	s.lastSkipReason = reason
}

func recentCutoffPubDate(window time.Duration) string {
	loc, err := time.LoadLocation("Asia/Shanghai")
	if err != nil {
		loc = time.FixedZone("CST", 8*3600)
	}
	return time.Now().In(loc).Add(-window).Format("2006-01-02 15:04:05")
}

// fetchLatestItems 从源 API 拉取最新一页并写入 DB（sinceId=0，补漏用）。
func (s *AggregatorService) fetchLatestItems(ctx context.Context) ([]persistence.XStreamItemModel, error) {
	limit := 100
	result, err := xstream.FetchPage(ctx, s.client, 0, limit, "")
	if err != nil {
		return nil, err
	}

	slog.Info(pushLogPrefix+" source API parsed",
		slog.Int("items_in_response", len(result.Data.List)),
		slog.Int64("next_since_id", derefInt64(result.Data.NextSinceID)),
		slog.Bool("has_more", result.Data.HasMore),
	)

	items := make([]persistence.XStreamItemModel, len(result.Data.List))
	for i, apiItem := range result.Data.List {
		items[i] = apiItem.ToModel()
	}

	if len(items) > 0 {
		if err := s.repo.BatchUpsert(items); err != nil {
			slog.Warn(pushLogPrefix+" batch upsert warning",
				slog.String("error", err.Error()),
			)
		} else {
			slog.Info(pushLogPrefix+" source API items saved to DB",
				slog.Int("item_count", len(items)),
			)
		}
	}

	return items, nil
}

func derefInt64(p *int64) int64 {
	if p == nil {
		return 0
	}
	return *p
}

// aggregateItems 将新闻条目聚合为结构化文本
func (s *AggregatorService) aggregateItems(items []persistence.XStreamItemModel, manual bool, pendingTotal int) string {
	var sb strings.Builder

	if manual {
		sb.WriteString("# 手动测试推送 · 最新情报\n\n")
		sb.WriteString(fmt.Sprintf("**模式**: 最新 %d 条（网页手动触发）\n\n", manualPushLatestCount))
	} else {
		sb.WriteString("# 情报增量简报（累积推送）\n\n")
		sb.WriteString(fmt.Sprintf("**模式**: 每 10 分钟检测；待推送累计超过 %d 条时一次性发送（含上轮未达阈值的条目）\n\n", s.pushMinItems))
	}
	sb.WriteString(fmt.Sprintf("**生成时间**: %s\n\n", time.Now().UTC().Format("2006-01-02 15:04:05 UTC")))
	if !manual && pendingTotal > len(items) {
		sb.WriteString(fmt.Sprintf("**待推送累计 %d 条，本次发送 %d 条**（其余留待下轮）\n\n", pendingTotal, len(items)))
	} else if !manual {
		sb.WriteString(fmt.Sprintf("**待推送累计 %d 条，本次全部发送**\n\n", len(items)))
	} else {
		sb.WriteString(fmt.Sprintf("**共收录 %d 条信息**\n\n", len(items)))
	}

	typeGroups := make(map[string][]persistence.XStreamItemModel)
	for _, item := range items {
		typeGroups[item.Type] = append(typeGroups[item.Type], item)
	}

	for typeName, groupItems := range typeGroups {
		sb.WriteString(fmt.Sprintf("## %s (%d 条)\n\n", typeName, len(groupItems)))
		for i, item := range groupItems {
			sb.WriteString(fmt.Sprintf("### %d. %s\n\n", i+1, item.UserName))
			sb.WriteString(fmt.Sprintf("**发布时间**: %s\n\n", item.PubDate))
			sb.WriteString(fmt.Sprintf("**内容**: %s\n\n", item.Content))
			if item.Link != "" {
				sb.WriteString(fmt.Sprintf("**源文链接**: %s\n\n", item.Link))
			}
			sb.WriteString("---\n\n")
		}
	}

	return sb.String()
}

// sendToW6 通过 sessionsend 模块静默推送到固定会话（发送 → 30s 确认 → 失败重试）。
func (s *AggregatorService) sendToW6(ctx context.Context, content string) error {
	if s.sessionSender == nil {
		return fmt.Errorf("session send module not configured")
	}
	slog.Info(pushLogPrefix+" entering session-send pipeline",
		slog.String("session_id", s.sessionID),
		slog.Int("payload_bytes", len(content)),
	)
	res, err := s.sessionSender.Send(ctx, sessionsend.Request{
		SessionID: s.sessionID,
		Content:   content,
		Label:     pushLogPrefix,
	})
	if err != nil {
		return fmt.Errorf("session send failed: %w", err)
	}
	if res != nil {
		slog.Info(pushLogPrefix+" session-send pipeline completed",
			slog.String("session_id", res.SessionID),
			slog.String("verify_method", string(res.VerifyMethod)),
			slog.String("ack_reason", res.AckReason),
			slog.Bool("handshake_matched", res.HandshakeMatched),
			slog.Int("attempts", res.Attempts),
			slog.Duration("elapsed", res.Elapsed),
		)
	}
	return nil
}

// GetStatus 获取聚合器状态
func (s *AggregatorService) GetStatus() map[string]interface{} {
	s.mu.Lock()
	defer s.mu.Unlock()

	status := map[string]interface{}{
		"sessionID":      s.sessionID,
		"pushMinItems":   s.pushMinItems,
		"pushRule":       fmt.Sprintf("push when new items > %d", s.pushMinItems),
		"fetchInterval":  "10m (xstream_sync River job)",
		"lastRunAt":      s.lastRunAt.Format(time.RFC3339),
		"lastItemCount":    s.lastItemCount,
		"lastPendingCount": s.lastPendingCount,
		"lastError":        s.lastError,
		"lastSentMaxID":    s.lastSentMaxID,
		"accumulateRule":   "skipped cycles keep cursor; next push includes all pending since lastSentMaxID",
		"lastRunSource":  string(s.lastRunSource),
		"lastRunOutcome": string(s.lastRunOutcome),
		"lastSkipReason": s.lastSkipReason,
	}

	if s.lastRunOutcome == RunOutcomeFailed {
		status["status"] = "error"
	} else if s.lastRunOutcome == RunOutcomeSent {
		status["status"] = "success"
	} else if s.lastRunOutcome == RunOutcomeSkipped {
		status["status"] = "skipped"
	} else if !s.lastRunAt.IsZero() {
		status["status"] = "success"
	} else {
		status["status"] = "never_run"
	}

	return status
}
