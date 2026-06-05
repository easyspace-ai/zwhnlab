package http

import (
	"context"
	"log/slog"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/easyspace-ai/ylmnote/internal/domain/project"
	"github.com/easyspace-ai/ylmnote/internal/infrastructure/persistence"
	"github.com/easyspace-ai/ylmnote/internal/infrastructure/polymarket"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	wsdk "ws-chat-tester/sdk"
)

// PolymarketHandler handles polymarket related HTTP endpoints.
type PolymarketHandler struct {
	gamma   *polymarket.HTTPClient
	repo    *persistence.PolymarketRepository
	db      *persistence.DB
	msgRepo interface{ ListBySessionID(sessionID string, skip, limit int) ([]*project.Message, error) }
	wsSDK   *wsdk.Client
}

func NewPolymarketHandler(repo *persistence.PolymarketRepository, db *persistence.DB, proxyURL string, wsSDK *wsdk.Client) *PolymarketHandler {
	msgRepo := persistence.NewMessageRepository(db)
	return &PolymarketHandler{
		gamma:   polymarket.NewHTTPClient(proxyURL),
		repo:    repo,
		db:      db,
		msgRepo: msgRepo,
		wsSDK:   wsSDK,
	}
}

type resolveRequest struct {
	Q string `json:"q"`
}

type resolvedMarketDTO struct {
	ConditionID  string   `json:"conditionId"`
	MarketSlug   string   `json:"marketSlug"`
	Question     string   `json:"question"`
	ClobTokenIDs []string `json:"clobTokenIds"`
	YesPct       float64  `json:"yesPct"`
	NoPct        float64  `json:"noPct"`
	Volume       float64  `json:"volume"`
}

type resolveResponse struct {
	Input      string            `json:"input"`
	EventSlug  string            `json:"eventSlug"`
	EventID    string            `json:"eventId"`
	Title      string            `json:"title"`
	ImageURL   string            `json:"imageUrl"`
	EventVol   float64           `json:"eventVolume"`
	Rules      string            `json:"rules"`
	Background string            `json:"background"`
	Market     resolvedMarketDTO `json:"market"`
}

func (h *PolymarketHandler) ResolvePOST(c *gin.Context) {
	var body resolveRequest
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid json"})
		return
	}
	slug := polymarket.ParsePolymarketInput(body.Q)
	if slug == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "could not parse polymarket url or slug"})
		return
	}
	ctx, cancel := context.WithTimeout(c.Request.Context(), 25*time.Second)
	defer cancel()

	ev, err := h.gamma.FetchEventBySlug(ctx, slug)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "event not found: " + err.Error()})
		return
	}
	m := polymarket.PickPrimaryMarket(ev)
	if m == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "no markets on event"})
		return
	}
	tokens, err := polymarket.ParseCLOBTokenIDs(m.ClobTokenIDs)
	if err != nil {
		c.JSON(http.StatusBadGateway, gin.H{"error": "clob tokens: " + err.Error()})
		return
	}
	yes, no, err := polymarket.ParseGammaOutcomePrices(m.OutcomePrices)
	if err != nil {
		c.JSON(http.StatusBadGateway, gin.H{"error": "outcome prices: " + err.Error()})
		return
	}
	vol := m.VolumeNum
	if vol == 0 {
		vol = ev.Volume
	}
	img := ev.Image
	if strings.TrimSpace(img) == "" {
		img = ev.Icon
	}
	rules, background := polymarket.RulesAndBackground(ev, m)
	c.JSON(http.StatusOK, resolveResponse{
		Input:      strings.TrimSpace(body.Q),
		EventSlug:  ev.Slug,
		EventID:    ev.ID,
		Title:      ev.Title,
		ImageURL:   img,
		EventVol:   ev.Volume,
		Rules:      rules,
		Background: background,
		Market: resolvedMarketDTO{
			ConditionID:  strings.TrimSpace(m.ConditionID),
			MarketSlug:   m.Slug,
			Question:     m.Question,
			ClobTokenIDs: tokens,
			YesPct:       yes,
			NoPct:        no,
			Volume:       vol,
		},
	})
}

type saveRequest struct {
	EventSlug    string   `json:"eventSlug"`
	EventID      string   `json:"eventId"`
	ConditionID  string   `json:"conditionId"`
	MarketSlug   string   `json:"marketSlug"`
	Title        string   `json:"title"`
	ImageURL     string   `json:"imageUrl"`
	ClobTokenIDs []string `json:"clobTokenIds"`
	YesPct       float64  `json:"yesPct"`
	NoPct        float64  `json:"noPct"`
	Volume       float64  `json:"volume"`
	Rules        string   `json:"rules"`
	Background   string   `json:"background"`
}

func (h *PolymarketHandler) SavePOST(c *gin.Context) {
	if h.repo == nil {
		c.JSON(http.StatusServiceUnavailable, gin.H{"error": "saved store unavailable"})
		return
	}
	var body saveRequest
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid json"})
		return
	}
	body.ConditionID = strings.TrimSpace(body.ConditionID)
	if body.ConditionID == "" || len(body.ClobTokenIDs) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "conditionId and clobTokenIds required"})
		return
	}
	ctx, cancel := context.WithTimeout(c.Request.Context(), 30*time.Second)
	defer cancel()

	rules := strings.TrimSpace(body.Rules)
	bg := strings.TrimSpace(body.Background)
	if slug := strings.TrimSpace(body.EventSlug); slug != "" {
		if ev, err := h.gamma.FetchEventBySlug(ctx, slug); err == nil {
			if m := polymarket.PickPrimaryMarket(ev); m != nil {
				r2, b2 := polymarket.RulesAndBackground(ev, m)
				if strings.TrimSpace(r2) != "" {
					rules = strings.TrimSpace(r2)
				}
				if strings.TrimSpace(b2) != "" {
					bg = strings.TrimSpace(b2)
				}
			}
		}
	}

	row := &persistence.PolymarketSavedEventModel{
		EventSlug:      strings.TrimSpace(body.EventSlug),
		EventID:        strings.TrimSpace(body.EventID),
		ConditionID:    body.ConditionID,
		MarketSlug:     strings.TrimSpace(body.MarketSlug),
		Title:          strings.TrimSpace(body.Title),
		ImageURL:       strings.TrimSpace(body.ImageURL),
		ClobTokenIDs:   body.ClobTokenIDs,
		YesPct:         body.YesPct,
		NoPct:          body.NoPct,
		Volume:         body.Volume,
		RulesText:      rules,
		BackgroundText: bg,
	}
	saved, err := h.repo.Upsert(row)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// If user is logged in and this event has no session yet, create an AI project and session
	if user, ok := GetCurrentUser(c); ok && user != nil && strings.TrimSpace(saved.AISessionID) == "" {
		projectID := uuid.New().String()
		now := time.Now().UTC()
		project := &persistence.ProjectModel{
			ID:                     projectID,
			UserID:                 user.ID,
			Name:                  "Polymarket: " + saved.Title,
			PolymarketSavedEventID: &saved.ID,
			Status:                "active",
			CreatedAt:             now,
			UpdatedAt:             now,
		}
		if err := h.db.Create(project).Error; err != nil {
			slog.Warn("failed to create project for polymarket", "err", err)
		} else {
			sessionID := uuid.New().String()
			session := &persistence.SessionModel{
				ID:        sessionID,
				ProjectID: projectID,
				Title:     "Analysis",
				CreatedAt: now,
				UpdatedAt: now,
			}
			if err := h.db.Create(session).Error; err != nil {
				slog.Warn("failed to create session for polymarket", "err", err)
			} else {
				saved.AIProjectID = projectID
				saved.AISessionID = sessionID
				if _, err := h.repo.Upsert(saved); err != nil {
					slog.Warn("failed to update saved event with session", "err", err)
				}
			}
		}
	}

	c.JSON(http.StatusOK, toSavedEventResponse(saved))
}

func toSavedEventResponse(m *persistence.PolymarketSavedEventModel) gin.H {
	return gin.H{
		"id":             m.ID,
		"eventSlug":      m.EventSlug,
		"eventId":        m.EventID,
		"conditionId":    m.ConditionID,
		"marketSlug":     m.MarketSlug,
		"title":          m.Title,
		"imageUrl":       m.ImageURL,
		"clobTokenIds":   m.ClobTokenIDs,
		"yesPct":         m.YesPct,
		"noPct":          m.NoPct,
		"volume":         m.Volume,
		"rules":          m.RulesText,
		"background":     m.BackgroundText,
		"aiProjectId":    m.AIProjectID,
		"aiSessionId":    m.AISessionID,
		"createdAt":      m.CreatedAt,
		"updatedAt":      m.UpdatedAt,
	}
}

func (h *PolymarketHandler) ListSavedGET(c *gin.Context) {
	if h.repo == nil {
		c.JSON(http.StatusServiceUnavailable, gin.H{"error": "saved store unavailable"})
		return
	}
	list, err := h.repo.List()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"events": list})
}

type historyResponse struct {
	ConditionID string                       `json:"conditionId"`
	TokenID     string                       `json:"tokenId"`
	Outcome     string                       `json:"outcome"`
	Timeframe   string                       `json:"timeframe"`
	Points      []polymarket.PriceHistoryPoint `json:"points"`
}

func (h *PolymarketHandler) PriceHistoryGET(c *gin.Context) {
	conditionID := strings.TrimSpace(c.Param("conditionId"))
	if conditionID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "missing condition id"})
		return
	}
	outcome := strings.ToLower(strings.TrimSpace(c.Query("outcome")))
	if outcome == "" {
		outcome = "yes"
	}
	tf := strings.TrimSpace(c.Query("timeframe"))
	ctx, cancel := context.WithTimeout(c.Request.Context(), 30*time.Second)
	defer cancel()

	var tokenID string
	if h.repo != nil {
		saved, _ := h.repo.GetByConditionID(conditionID)
		if saved != nil && len(saved.ClobTokenIDs) >= 2 {
			switch outcome {
			case "no":
				tokenID = saved.ClobTokenIDs[1]
			default:
				tokenID = saved.ClobTokenIDs[0]
			}
		}
	}
	if tokenID == "" {
		tokParam := strings.TrimSpace(c.Query("tokenId"))
		if tokParam != "" {
			tokenID = tokParam
		} else {
			gm, err := h.gamma.FetchMarketByConditionID(ctx, conditionID)
			if err != nil {
				c.JSON(http.StatusNotFound, gin.H{"error": "market not found: " + err.Error()})
				return
			}
			tokens, err := polymarket.ParseCLOBTokenIDs(gm.ClobTokenIDs)
			if err != nil || len(tokens) < 2 {
				c.JSON(http.StatusBadGateway, gin.H{"error": "clob tokens unavailable"})
				return
			}
			if outcome == "no" {
				tokenID = tokens[1]
			} else {
				tokenID = tokens[0]
			}
		}
	}
	pts, err := h.gamma.FetchPriceHistory(ctx, tokenID, tf)
	if err != nil {
		c.JSON(http.StatusBadGateway, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, historyResponse{
		ConditionID: conditionID,
		TokenID:     tokenID,
		Outcome:     outcome,
		Timeframe:   tf,
		Points:      pts,
	})
}

func (h *PolymarketHandler) DeleteSavedHandler(c *gin.Context) {
	id := c.Param("id")
	if id == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "missing id"})
		return
	}
	if h.repo == nil {
		c.JSON(http.StatusServiceUnavailable, gin.H{"error": "saved store unavailable"})
		return
	}
	if err := h.repo.Delete(id); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.Status(http.StatusNoContent)
}

func (h *PolymarketHandler) ChatHistoryGET(c *gin.Context) {
	id := c.Param("id")
	if id == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "missing id"})
		return
	}
	if h.repo == nil || h.msgRepo == nil {
		c.JSON(http.StatusServiceUnavailable, gin.H{"error": "store unavailable"})
		return
	}
	saved, err := h.repo.GetByID(id)
	if err != nil || saved == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "event not found"})
		return
	}
	if saved.AISessionID == "" {
		c.JSON(http.StatusOK, gin.H{"messages": []interface{}{}})
		return
	}
	offset := 0
	limit := 20
	if o := c.Query("offset"); o != "" {
		if parsed, err := strconv.Atoi(o); err == nil {
			offset = parsed
		}
	}
	if l := c.Query("limit"); l != "" {
		if parsed, err := strconv.Atoi(l); err == nil {
			limit = parsed
		}
	}
	messages, err := h.msgRepo.ListBySessionID(saved.AISessionID, offset, limit)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	if len(messages) == 0 && h.wsSDK != nil && strings.TrimSpace(saved.AISessionID) != "" {
		ctx, cancel := context.WithTimeout(c.Request.Context(), 30*time.Second)
		defer cancel()
		resp, upErr := h.wsSDK.AgentMessages(ctx, saved.AISessionID, limit, offset)
		if upErr != nil {
			slog.Warn("polymarket_chat_history_upstream_failed",
				slog.String("saved_id", id),
				slog.String("session_id", saved.AISessionID),
				slog.String("error", upErr.Error()),
			)
			c.JSON(http.StatusBadGateway, gin.H{
				"error":   "failed to fetch history from upstream",
				"detail":  upErr.Error(),
				"messages": []interface{}{},
			})
			return
		}
		if len(resp.Messages) > 0 {
			c.JSON(http.StatusOK, gin.H{"messages": resp.Messages, "source": "upstream"})
			return
		}
	}
	c.JSON(http.StatusOK, gin.H{"messages": messages})
}

func (h *PolymarketHandler) RegisterRoutes(g *gin.RouterGroup) {
	g.POST("/resolve", h.ResolvePOST)
	g.POST("/save", h.SavePOST)
	g.GET("/saved", h.ListSavedGET)
	g.GET("/markets/:conditionId/price-history", h.PriceHistoryGET)
	g.DELETE("/saved/:id", h.DeleteSavedHandler)
	g.GET("/saved/:id/chat/history", h.ChatHistoryGET)
}
