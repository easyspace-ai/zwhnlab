package http

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/easyspace-ai/ylmnote/internal/application/aichat"
	"github.com/gin-gonic/gin"
)

// AichatHandler serves /api/aichat conversation APIs.
type AichatHandler struct {
	svc *aichat.Service
}

func NewAichatHandler(svc *aichat.Service) *AichatHandler {
	return &AichatHandler{svc: svc}
}

func (h *AichatHandler) RegisterRoutes(r *gin.RouterGroup) {
	r.GET("/sessions/:id/timeline", h.timeline)
	r.GET("/sessions/:id/stream", h.stream)
	r.GET("/sessions/:id/summary", h.summary)
	r.GET("/sessions/:id/reports", h.reports)
	r.POST("/sessions/:id/form-drafts", h.presentFormDraft)
	r.POST("/sessions/:id/form-drafts/:draftId/cancel", h.cancelFormDraft)
	r.POST("/sessions/:id/rounds", h.startRound)
	r.POST("/sessions/:id/rounds/:rid/stop", h.stopRound)
	r.POST("/sessions/:id/rounds/:rid/discuss", h.discussRound)
}

func (h *AichatHandler) timeline(c *gin.Context) {
	u, ok := GetCurrentUser(c)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"detail": "Not authenticated"})
		return
	}
	sessionID := c.Param("id")
	if _, err := h.svc.EnsureSessionAccess(sessionID, u.ID); err != nil {
		c.JSON(http.StatusForbidden, gin.H{"detail": "session not found"})
		return
	}
	since, _ := strconv.ParseInt(c.Query("sinceSeq"), 10, 64)
	limitRounds, _ := strconv.Atoi(c.Query("limit_rounds"))
	beforeSeq, _ := strconv.ParseInt(c.Query("before_seq"), 10, 64)
	if since > 0 {
		limitRounds = 0
		beforeSeq = 0
	}
	result, err := h.svc.Timeline(sessionID, since, limitRounds, beforeSeq)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"detail": err.Error()})
		return
	}
	st := result.State
	events := result.Events
	if events == nil {
		events = []aichat.SessionEvent{}
	}
	resp := gin.H{
		"events":          events,
		"next_seq":        st.NextSeq,
		"active_round_id": st.ActiveRoundID,
	}
	if since <= 0 {
		resp["has_more"] = result.HasMore
		if result.OldestSeq > 0 {
			resp["oldest_seq"] = result.OldestSeq
		}
	}
	c.JSON(http.StatusOK, resp)
}

func (h *AichatHandler) summary(c *gin.Context) {
	u, ok := GetCurrentUser(c)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"detail": "Not authenticated"})
		return
	}
	sessionID := c.Param("id")
	if _, err := h.svc.EnsureSessionAccess(sessionID, u.ID); err != nil {
		c.JSON(http.StatusForbidden, gin.H{"detail": "session not found"})
		return
	}
	out, err := h.svc.Summary(sessionID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"detail": err.Error()})
		return
	}
	c.JSON(http.StatusOK, out)
}

func (h *AichatHandler) reports(c *gin.Context) {
	u, ok := GetCurrentUser(c)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"detail": "Not authenticated"})
		return
	}
	sessionID := c.Param("id")
	if _, err := h.svc.EnsureSessionAccess(sessionID, u.ID); err != nil {
		c.JSON(http.StatusForbidden, gin.H{"detail": "session not found"})
		return
	}
	list, err := h.svc.ListReports(sessionID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"detail": "failed to list reports"})
		return
	}
	c.JSON(http.StatusOK, toResourceListResponse(list))
}

func (h *AichatHandler) presentFormDraft(c *gin.Context) {
	u, ok := GetCurrentUser(c)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"detail": "Not authenticated"})
		return
	}
	sessionID := c.Param("id")
	if _, err := h.svc.EnsureSessionAccess(sessionID, u.ID); err != nil {
		c.JSON(http.StatusForbidden, gin.H{"detail": "session not found"})
		return
	}
	var req aichat.PresentFormDraftRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"detail": "invalid body"})
		return
	}
	draftID, err := h.svc.PresentFormDraft(sessionID, req)
	if err != nil {
		c.JSON(http.StatusConflict, gin.H{"detail": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"draft_id": draftID})
}

func (h *AichatHandler) cancelFormDraft(c *gin.Context) {
	u, ok := GetCurrentUser(c)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"detail": "Not authenticated"})
		return
	}
	sessionID := c.Param("id")
	draftID := c.Param("draftId")
	if _, err := h.svc.EnsureSessionAccess(sessionID, u.ID); err != nil {
		c.JSON(http.StatusForbidden, gin.H{"detail": "session not found"})
		return
	}
	if err := h.svc.CancelFormDraft(sessionID, draftID); err != nil {
		c.JSON(http.StatusConflict, gin.H{"detail": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"ok": true})
}

func (h *AichatHandler) startRound(c *gin.Context) {
	u, ok := GetCurrentUser(c)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"detail": "Not authenticated"})
		return
	}
	sessionID := c.Param("id")
	if _, err := h.svc.EnsureSessionAccess(sessionID, u.ID); err != nil {
		c.JSON(http.StatusForbidden, gin.H{"detail": "session not found"})
		return
	}
	var req aichat.StartRoundRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"detail": "invalid body"})
		return
	}
	roundID, err := h.svc.StartRound(c.Request.Context(), sessionID, req)
	if err != nil {
		c.JSON(http.StatusConflict, gin.H{"detail": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"round_id": roundID})
}

func (h *AichatHandler) stopRound(c *gin.Context) {
	u, ok := GetCurrentUser(c)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"detail": "Not authenticated"})
		return
	}
	sessionID := c.Param("id")
	roundID := c.Param("rid")
	if _, err := h.svc.EnsureSessionAccess(sessionID, u.ID); err != nil {
		c.JSON(http.StatusForbidden, gin.H{"detail": "session not found"})
		return
	}
	if err := h.svc.StopRound(sessionID, roundID); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"detail": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"ok": true})
}

type discussBody struct {
	Message string `json:"message"`
}

func (h *AichatHandler) discussRound(c *gin.Context) {
	u, ok := GetCurrentUser(c)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"detail": "Not authenticated"})
		return
	}
	sessionID := c.Param("id")
	if _, err := h.svc.EnsureSessionAccess(sessionID, u.ID); err != nil {
		c.JSON(http.StatusForbidden, gin.H{"detail": "session not found"})
		return
	}
	var body discussBody
	if err := c.ShouldBindJSON(&body); err != nil || strings.TrimSpace(body.Message) == "" {
		c.JSON(http.StatusBadRequest, gin.H{"detail": "message required"})
		return
	}
	roundID, err := h.svc.StartRound(c.Request.Context(), sessionID, aichat.StartRoundRequest{
		Kind:    aichat.RoundKindDiscuss,
		Message: body.Message,
	})
	if err != nil {
		c.JSON(http.StatusConflict, gin.H{"detail": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"round_id": roundID})
}

func (h *AichatHandler) stream(c *gin.Context) {
	u, ok := GetCurrentUser(c)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"detail": "Not authenticated"})
		return
	}
	sessionID := c.Param("id")
	if _, err := h.svc.EnsureSessionAccess(sessionID, u.ID); err != nil {
		c.JSON(http.StatusForbidden, gin.H{"detail": "session not found"})
		return
	}
	fromSeq, _ := strconv.ParseInt(c.Query("fromSeq"), 10, 64)

	c.Header("Content-Type", "text/event-stream")
	c.Header("Cache-Control", "no-cache")
	c.Header("Connection", "keep-alive")
	c.Status(http.StatusOK)

	flusher, ok := c.Writer.(http.Flusher)
	if !ok {
		return
	}

	lastSeq := fromSeq
	ticker := time.NewTicker(800 * time.Millisecond)
	defer ticker.Stop()
	done := c.Request.Context().Done()

	for {
		result, err := h.svc.Timeline(sessionID, lastSeq, 0, 0)
		if err == nil {
			for _, ev := range result.Events {
				writeAichatSSE(c.Writer, "event_appended", ev)
				lastSeq = ev.Seq
			}
			if len(result.Events) > 0 {
				flusher.Flush()
			}
		}
		select {
		case <-done:
			return
		case <-ticker.C:
		}
	}
}

func writeAichatSSE(w io.Writer, eventType string, payload any) {
	b, _ := json.Marshal(payload)
	fmt.Fprintf(w, "event: %s\ndata: %s\n\n", eventType, b)
}
