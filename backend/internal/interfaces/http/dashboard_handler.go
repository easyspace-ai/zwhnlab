package http

import (
	"context"
	"log/slog"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/easyspace-ai/ylmnote/internal/application/artifact"
	"github.com/easyspace-ai/ylmnote/internal/application/auth"
	"github.com/easyspace-ai/ylmnote/internal/application/dashboard"
	"github.com/easyspace-ai/ylmnote/internal/application/xstream"
	projectdomain "github.com/easyspace-ai/ylmnote/internal/domain/project"
	"github.com/easyspace-ai/ylmnote/internal/infrastructure/persistence"
	"github.com/easyspace-ai/ylmnote/internal/scheduler"
	"github.com/gin-gonic/gin"
)

// dashboardArtifactProjectID matches artifact.Syncer W6 direct session storage scope.
const dashboardArtifactProjectID = "w6-direct"

// DashboardHandler handles dashboard HTTP endpoints.
type DashboardHandler struct {
	repo               *persistence.DashboardRepository
	authSvc            *auth.Service
	aggregator         *dashboard.AggregatorService
	xstreamFetcher     *xstream.Fetcher
	sched              *scheduler.Scheduler
	wordCloud          *dashboard.WordCloudService
	resourceRepo       projectdomain.ResourceRepository
	artifactSyncer     *artifact.Syncer
	dashboardSessionID string
}

func NewDashboardHandler(
	repo *persistence.DashboardRepository,
	authSvc *auth.Service,
	aggregator *dashboard.AggregatorService,
	xstreamFetcher *xstream.Fetcher,
	sched *scheduler.Scheduler,
	wordCloud *dashboard.WordCloudService,
	resourceRepo projectdomain.ResourceRepository,
	artifactSyncer *artifact.Syncer,
	dashboardSessionID string,
) *DashboardHandler {
	return &DashboardHandler{
		repo:               repo,
		authSvc:            authSvc,
		aggregator:         aggregator,
		xstreamFetcher:     xstreamFetcher,
		sched:              sched,
		wordCloud:          wordCloud,
		resourceRepo:       resourceRepo,
		artifactSyncer:     artifactSyncer,
		dashboardSessionID: strings.TrimSpace(dashboardSessionID),
	}
}

// getUserID extracts user ID from the request context (set by AuthMiddleware).
func (h *DashboardHandler) getUserID(c *gin.Context) (string, error) {
	u, ok := GetCurrentUser(c)
	if !ok || u == nil {
		return "", nil
	}
	return u.ID, nil
}

type dashboardItemJSON struct {
	ID        int64  `json:"id"`
	UserName  string `json:"userName"`
	UserID    string `json:"userId"`
	PubDate   string `json:"pubDate"`
	Link      string `json:"link"`
	Content   string `json:"content"`
	Type      string `json:"type"`
	CreatedAt string `json:"createdAt"`
}

func toDashboardItems(models []persistence.XStreamItemModel) []dashboardItemJSON {
	out := make([]dashboardItemJSON, len(models))
	for i, m := range models {
		out[i] = dashboardItemJSON{
			ID:        m.RemoteID,
			UserName:  m.UserName,
			UserID:    m.UserID,
			PubDate:   m.PubDate,
			Link:      m.Link,
			Content:   m.Content,
			Type:      m.Type,
			CreatedAt: m.CreatedAt.UTC().Format(time.RFC3339),
		}
	}
	return out
}

// ItemsGET returns xstream items filtered by type (offset pagination, id = upstream remote_id).
func (h *DashboardHandler) ItemsGET(c *gin.Context) {
	itemType := c.Query("type")
	if itemType == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "type is required"})
		return
	}

	offsetStr := c.Query("offset")
	limitStr := c.Query("limit")

	offset := 0
	if offsetStr != "" {
		if o, err := strconv.Atoi(offsetStr); err == nil && o >= 0 {
			offset = o
		}
	}

	limit := 50
	if limitStr != "" {
		if l, err := strconv.Atoi(limitStr); err == nil && l > 0 && l <= 100 {
			limit = l
		}
	}

	items, err := h.repo.ListItemsByType(itemType, offset, limit)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	totalCount, err := h.repo.CountByType(itemType)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	hasMore := int64(offset)+int64(len(items)) < totalCount

	c.JSON(http.StatusOK, gin.H{
		"items":      toDashboardItems(items),
		"totalCount": totalCount,
		"hasMore":    hasMore,
	})
}

// ItemsBackfillPOST pulls one page of older history from the upstream API into the local DB.
func (h *DashboardHandler) ItemsBackfillPOST(c *gin.Context) {
	itemType := c.Query("type")
	if itemType == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "type is required"})
		return
	}
	if h.xstreamFetcher == nil {
		c.JSON(http.StatusServiceUnavailable, gin.H{"error": "xstream fetcher not configured"})
		return
	}

	beforeRemoteID := int64(0)
	if s := c.Query("beforeRemoteId"); s != "" {
		if v, err := strconv.ParseInt(s, 10, 64); err == nil && v > 0 {
			beforeRemoteID = v
		}
	}
	if beforeRemoteID == 0 {
		minID, err := h.repo.MinRemoteIDByType(itemType)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		beforeRemoteID = minID
	}

	limit := 50
	if l := c.Query("limit"); l != "" {
		if v, err := strconv.Atoi(l); err == nil && v > 0 && v <= 1000 {
			limit = v
		}
	}

	stored, nextCursor, hasMore, err := h.xstreamFetcher.FetchHistoryBefore(c.Request.Context(), itemType, beforeRemoteID, limit)
	if err != nil {
		slog.Warn("dashboard backfill failed",
			slog.String("type", itemType),
			slog.Int64("before_remote_id", beforeRemoteID),
			slog.String("error", err.Error()),
		)
		c.JSON(http.StatusBadGateway, gin.H{"error": err.Error()})
		return
	}

	totalCount, _ := h.repo.CountByType(itemType)
	c.JSON(http.StatusOK, gin.H{
		"stored":       stored,
		"nextSinceId":  nextCursor,
		"upstreamHasMore": hasMore,
		"totalCount":   totalCount,
	})
}

// StreamGroupsGET returns monitor stream categories from the upstream API.
func (h *DashboardHandler) StreamGroupsGET(c *gin.Context) {
	var client *http.Client
	if h.xstreamFetcher != nil {
		client = h.xstreamFetcher.HTTPClient()
	}
	groups, err := xstream.FetchStreamGroups(c.Request.Context(), client)
	if err != nil {
		slog.Warn("dashboard stream groups fetch failed", slog.String("error", err.Error()))
		c.JSON(http.StatusBadGateway, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, groups)
}

// ConfigGET returns dashboard integration config safe for the frontend.
func (h *DashboardHandler) ConfigGET(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"sessionId": h.dashboardSessionID,
	})
}

// WordCloudGET returns word frequency data for the last 24 hours of information flow.
func (h *DashboardHandler) WordCloudGET(c *gin.Context) {
	if h.wordCloud == nil {
		c.JSON(http.StatusServiceUnavailable, gin.H{"error": "word cloud not configured"})
		return
	}
	refresh := c.Query("refresh") == "1" || c.Query("refresh") == "true"
	result, err := h.wordCloud.Generate(c.Request.Context(), refresh)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, result)
}

func (h *DashboardHandler) listCachedArtifacts() ([]*projectdomain.Resource, error) {
	list, err := h.resourceRepo.ListBySessionID(h.dashboardSessionID)
	if err != nil {
		return nil, err
	}
	var filtered []*projectdomain.Resource
	for _, r := range list {
		if r.Type == "todo_state" {
			continue
		}
		filtered = append(filtered, r)
	}
	return filtered, nil
}

// ArtifactsGET 返回本地缓存的聚合产物；refresh=1 时先拉远程历史再返回。
func (h *DashboardHandler) ArtifactsGET(c *gin.Context) {
	if h.dashboardSessionID == "" {
		c.JSON(http.StatusOK, []gin.H{})
		return
	}
	if h.resourceRepo == nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "resource repository not configured"})
		return
	}

	refresh := c.Query("refresh") == "1" || c.Query("refresh") == "true"
	if refresh {
		if err := h.syncArtifactsFromRemote(c); err != nil {
			c.JSON(http.StatusBadGateway, gin.H{"error": err.Error()})
			return
		}
	}

	filtered, err := h.listCachedArtifacts()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, toResourceListResponse(filtered))
}

// ArtifactsSyncPOST 主动从 W6 拉取会话历史并更新本地缓存。
func (h *DashboardHandler) ArtifactsSyncPOST(c *gin.Context) {
	if h.dashboardSessionID == "" {
		c.JSON(http.StatusServiceUnavailable, gin.H{"error": "DASHBOARD_SESSION_ID not configured"})
		return
	}
	if err := h.syncArtifactsFromRemote(c); err != nil {
		c.JSON(http.StatusBadGateway, gin.H{"error": err.Error()})
		return
	}
	filtered, err := h.listCachedArtifacts()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"status":    "synced",
		"count":     len(filtered),
		"artifacts": toResourceListResponse(filtered),
	})
}

func (h *DashboardHandler) purgeStaleDashboardArtifacts() {
	if h.resourceRepo == nil || h.dashboardSessionID == "" {
		return
	}
	n, err := h.resourceRepo.DeleteByProjectIDExceptSession(dashboardArtifactProjectID, h.dashboardSessionID)
	if err != nil {
		slog.Warn("[dashboard-artifacts] purge stale failed",
			slog.String("session_id", h.dashboardSessionID),
			slog.Any("err", err),
		)
		return
	}
	if n > 0 {
		slog.Info("[dashboard-artifacts] purged stale session cache",
			slog.String("session_id", h.dashboardSessionID),
			slog.Int64("deleted", n),
		)
	}
}

func (h *DashboardHandler) syncArtifactsFromRemote(c *gin.Context) error {
	if h.artifactSyncer == nil {
		return nil
	}
	h.purgeStaleDashboardArtifacts()
	ctx, cancel := context.WithTimeout(c.Request.Context(), 3*time.Minute)
	defer cancel()
	_, err := h.artifactSyncer.SyncFromAgentMessages(ctx, h.dashboardSessionID)
	return err
}

// TopicsGET returns all topics for the current user.
func (h *DashboardHandler) TopicsGET(c *gin.Context) {
	userID, err := h.getUserID(c)
	if err != nil || userID == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return
	}

	topics, err := h.repo.ListTopics(userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, topics)
}

// TopicsPOST creates a new topic.
func (h *DashboardHandler) TopicsPOST(c *gin.Context) {
	userID, err := h.getUserID(c)
	if err != nil || userID == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return
	}

	var req struct {
		Name        string `json:"name" binding:"required"`
		Description string `json:"description"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request"})
		return
	}

	topic, err := h.repo.CreateTopic(userID, req.Name, req.Description)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, topic)
}

// TopicDELETE deletes a topic.
func (h *DashboardHandler) TopicDELETE(c *gin.Context) {
	userID, err := h.getUserID(c)
	if err != nil || userID == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return
	}

	idStr := c.Param("id")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})
		return
	}

	if err := h.repo.DeleteTopic(userID, id); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": "deleted"})
}

// ScoredContentGET returns all scored content.
func (h *DashboardHandler) ScoredContentGET(c *gin.Context) {
	content, err := h.repo.ListScoredContent()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, content)
}

// SyncPOST pulls the latest upstream page into the local DB.
func (h *DashboardHandler) SyncPOST(c *gin.Context) {
	if h.xstreamFetcher == nil && h.sched == nil {
		c.JSON(http.StatusServiceUnavailable, gin.H{"error": "xstream fetcher not configured"})
		return
	}
	ctx, cancel := context.WithTimeout(c.Request.Context(), 2*time.Minute)
	defer cancel()

	if h.sched != nil {
		if err := h.sched.RunXStreamSync(ctx); err != nil {
			c.JSON(http.StatusBadGateway, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{"status": "fetched", "mode": "scheduler"})
		return
	}

	if err := h.xstreamFetcher.FetchOnce(ctx); err != nil {
		c.JSON(http.StatusBadGateway, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"status": "fetched", "mode": "direct"})
}

// AggregatorTriggerPOST manually triggers the aggregator to run.
func (h *DashboardHandler) AggregatorTriggerPOST(c *gin.Context) {
	requestID := RequestIDFromContext(c.Request.Context())
	slog.Info("[dashboard-push] manual trigger HTTP request received",
		slog.String("request_id", requestID),
		slog.String("dashboard_session_id", h.dashboardSessionID),
	)

	if h.dashboardSessionID == "" {
		slog.Warn("[dashboard-push] manual trigger rejected: DASHBOARD_SESSION_ID not configured",
			slog.String("request_id", requestID),
		)
		c.JSON(http.StatusServiceUnavailable, gin.H{"error": "DASHBOARD_SESSION_ID not configured"})
		return
	}

	if h.aggregator == nil || h.sched == nil {
		slog.Warn("[dashboard-push] manual trigger rejected: aggregator not configured",
			slog.String("request_id", requestID),
		)
		c.JSON(http.StatusServiceUnavailable, gin.H{"error": "aggregator not configured"})
		return
	}

	go func() {
		ctx, cancel := context.WithTimeout(context.Background(), 5*time.Minute)
		defer cancel()
		if err := h.sched.RunDashboardAggregate(ctx, dashboard.RunSourceManual, true); err != nil {
			slog.Error("[dashboard-push] manual trigger failed",
				slog.String("request_id", requestID),
				slog.Any("err", err),
			)
		}
	}()

	slog.Info("[dashboard-push] manual trigger accepted (see logs: [dashboard-push] + [session-send])",
		slog.String("request_id", requestID),
		slog.String("session_id", h.dashboardSessionID),
		slog.Bool("force", true),
	)
	c.JSON(http.StatusOK, gin.H{
		"status":  "triggered",
		"message": "手动测试已触发：将推送最新 10 条；请在后端日志搜索 [dashboard-push]",
	})
}

// AggregatorStatusGET returns the current status of the aggregator.
func (h *DashboardHandler) AggregatorStatusGET(c *gin.Context) {
	if h.aggregator == nil {
		c.JSON(http.StatusServiceUnavailable, gin.H{"error": "aggregator not configured"})
		return
	}
	c.JSON(http.StatusOK, h.aggregator.GetStatus())
}

// RegisterRoutes registers dashboard routes.
// ItemsSearchGET searches xstream items by keyword across all types or a specific type.
func (h *DashboardHandler) ItemsSearchGET(c *gin.Context) {
	keyword := c.Query("q")
	if keyword == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "q is required"})
		return
	}

	itemType := c.Query("type")
	offsetStr := c.Query("offset")
	limitStr := c.Query("limit")

	offset := 0
	if offsetStr != "" {
		if o, err := strconv.Atoi(offsetStr); err == nil && o >= 0 {
			offset = o
		}
	}

	limit := 50
	if limitStr != "" {
		if l, err := strconv.Atoi(limitStr); err == nil && l > 0 && l <= 100 {
			limit = l
		}
	}

	items, err := h.repo.SearchItems(keyword, itemType, offset, limit)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	totalCount, err := h.repo.CountSearchItems(keyword, itemType)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	hasMore := int64(offset)+int64(len(items)) < totalCount

	c.JSON(http.StatusOK, gin.H{
		"items":      toDashboardItems(items),
		"totalCount": totalCount,
		"hasMore":    hasMore,
	})
}

func (h *DashboardHandler) RegisterRoutes(g *gin.RouterGroup) {
	g.GET("/stream-groups", h.StreamGroupsGET)
	g.POST("/sync", h.SyncPOST)
	g.GET("/items", h.ItemsGET)
	g.GET("/items/search", h.ItemsSearchGET)
	g.POST("/items/backfill", h.ItemsBackfillPOST)
	g.GET("/config", h.ConfigGET)
	g.GET("/wordcloud", h.WordCloudGET)
	g.GET("/artifacts", h.ArtifactsGET)
	g.POST("/artifacts/sync", h.ArtifactsSyncPOST)
	g.GET("/topics", h.TopicsGET)
	g.POST("/topics", h.TopicsPOST)
	g.DELETE("/topics/:id", h.TopicDELETE)
	g.GET("/scored-content", h.ScoredContentGET)
	g.POST("/aggregator/trigger", h.AggregatorTriggerPOST)
	g.GET("/aggregator/status", h.AggregatorStatusGET)
}
