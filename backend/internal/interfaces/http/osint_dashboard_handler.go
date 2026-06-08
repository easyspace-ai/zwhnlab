package http

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/easyspace-ai/ylmnote/internal/application/osintdashboard"
	"github.com/easyspace-ai/ylmnote/internal/application/osintdashboard/ai"
	"github.com/easyspace-ai/ylmnote/internal/application/osintdashboard/w6"
	"github.com/gin-gonic/gin"
)

// OsintDashboardHandler OSINT dashboard W6 research API.
type OsintDashboardHandler struct {
	svc             *osintdashboard.Service
	editHTMLTimeout time.Duration
}

func NewOsintDashboardHandler(svc *osintdashboard.Service, editHTMLTimeout time.Duration) *OsintDashboardHandler {
	if editHTMLTimeout <= 0 {
		editHTMLTimeout = 5 * time.Minute
	}
	return &OsintDashboardHandler{svc: svc, editHTMLTimeout: editHTMLTimeout}
}

func (h *OsintDashboardHandler) RegisterRoutes(r *gin.RouterGroup) {
	r.POST("/chat/start", h.chatStart)
	r.POST("/chat/message", h.chatMessage)
	r.POST("/chat/respond", h.chatRespond)
	r.POST("/chat/discuss", h.chatDiscuss)
	r.GET("/w6/stream", h.w6Stream)
	r.POST("/w6/stop", h.w6Stop)
	r.GET("/sessions/:id/reports", h.sessionReports)
	r.GET("/sessions/:id/state", h.sessionState)
}

type chatStartRequest struct {
	SessionID      string                 `json:"session_id"`
	SkillKey       string                 `json:"skill_key"`
	FormData       map[string]interface{} `json:"form_data"`
	RenderedPrompt string                 `json:"rendered_prompt"`
	ReportStyle    string                 `json:"report_style"` // magazine | swiss | auto
}

func (h *OsintDashboardHandler) chatStart(c *gin.Context) {
	u, ok := GetCurrentUser(c)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"detail": "Not authenticated"})
		return
	}
	var req chatStartRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"detail": "invalid request body"})
		return
	}
	sessionID := strings.TrimSpace(req.SessionID)
	skillKey := strings.TrimSpace(req.SkillKey)
	if sessionID == "" || skillKey == "" {
		c.JSON(http.StatusBadRequest, gin.H{"detail": "session_id and skill_key required"})
		return
	}
	if !h.svc.SkillUsesW6Pipeline(skillKey) {
		c.JSON(http.StatusBadRequest, gin.H{"detail": "skill does not use W6 pipeline"})
		return
	}
	skill, err := h.svc.ValidateSkillKey(u.ID, u.IsAdmin(), skillKey)
	if err != nil {
		c.JSON(http.StatusForbidden, gin.H{"detail": err.Error()})
		return
	}
	sess, err := h.svc.EnsureSessionAccess(sessionID, u.ID)
	if err != nil {
		c.JSON(http.StatusForbidden, gin.H{"detail": "session not found or access denied"})
		return
	}
	prompt := strings.TrimSpace(req.RenderedPrompt)
	if prompt == "" {
		var err error
		prompt, err = osintdashboard.RenderPromptTemplate(skill.PromptTemplate, req.FormData)
		if err != nil || strings.TrimSpace(prompt) == "" {
			c.JSON(http.StatusBadRequest, gin.H{"detail": "failed to render skill prompt"})
			return
		}
	}
	topic := extractTopic(req.FormData, skill.Name)
	_ = h.svc.UpdateSessionSkill(sessionID, skillKey, topic)
	_ = h.svc.SetReportStyle(sessionID, osintdashboard.NormalizeReportStyle(req.ReportStyle))

	writeSSE, ok := beginSSE(c)
	if !ok {
		return
	}
	emitSessionTitleSSE(writeSSE, sessionID, topic)
	ctx := c.Request.Context()
	writeSSE(osintdashboard.ChatSSEEvent{"type": "phase", "phase": "init", "message": "正在初始化会话..."})
	writeSSE(osintdashboard.ChatSSEEvent{"type": "phase", "phase": "w6", "message": "正在连接 W6 服务..."})
	writeSSE(osintdashboard.ChatSSEEvent{"type": "session", "sessionId": sessionID})
	intro := osintdashboard.SkillIntro(skillKey)
	writeSSE(osintdashboard.ChatSSEEvent{"type": "text_delta", "delta": intro})
	_ = h.svc.AppendDashboardUIMessage(sessionID, "user", osintdashboard.BuildStartUserContent(skill.Name, req.FormData), nil)

	ch := h.svc.Hub().Subscribe(sessionID)
	defer h.svc.Hub().Unsubscribe(sessionID, ch)
	h.svc.StartW6Round(ctx, sessionID, prompt, topic)

	_, followUps := h.streamW6ToChat(ch, skill.Name, sessionID, intro, writeSSE)
	_ = h.svc.AppendDashboardUIMessage(sessionID, "w6", "W6 深度调研", followUps)
	writeSSE(osintdashboard.ChatSSEEvent{"type": "stream_end"})
	_ = sess
}

type chatMessageRequest struct {
	SessionID string `json:"session_id"`
	Message   string `json:"message"`
}

func (h *OsintDashboardHandler) chatMessage(c *gin.Context) {
	u, ok := GetCurrentUser(c)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"detail": "Not authenticated"})
		return
	}
	var req chatMessageRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"detail": "invalid request body"})
		return
	}
	sessionID := strings.TrimSpace(req.SessionID)
	message := stripW6CommandPrefix(strings.TrimSpace(req.Message))
	if sessionID == "" || message == "" {
		c.JSON(http.StatusBadRequest, gin.H{"detail": "session_id and message required"})
		return
	}
	if _, err := h.svc.EnsureSessionAccess(sessionID, u.ID); err != nil {
		c.JSON(http.StatusForbidden, gin.H{"detail": "session not found or access denied"})
		return
	}
	writeSSE, ok := beginSSE(c)
	if !ok {
		return
	}
	ctx := c.Request.Context()
	topic := message
	if title, updated, err := h.svc.UpdateSessionTitleIfAuto(sessionID, topic); err == nil && updated {
		emitSessionTitleSSE(writeSSE, sessionID, title)
	}
	writeSSE(osintdashboard.ChatSSEEvent{"type": "phase", "phase": "w6", "message": "已收到追问，正在启动 W6 子 Agent…"})
	prefix := "\n\n已根据您的问题启动新一轮 W6 调研。\n\n"
	writeSSE(osintdashboard.ChatSSEEvent{"type": "text_delta", "delta": prefix})
	_ = h.svc.AppendDashboardUIMessage(sessionID, "user", message, nil)

	if len([]rune(topic)) > 120 {
		topic = string([]rune(topic)[:120])
	}
	ch := h.svc.Hub().Subscribe(sessionID)
	defer h.svc.Hub().Unsubscribe(sessionID, ch)
	h.svc.StartW6Round(ctx, sessionID, message, topic)
	_, followUps := h.streamW6ToChat(ch, "继续研究结果", sessionID, prefix, writeSSE)
	_ = h.svc.AppendDashboardUIMessage(sessionID, "w6", "W6 深度调研", followUps)
	writeSSE(osintdashboard.ChatSSEEvent{"type": "stream_end"})
}

type chatRespondRequest struct {
	SessionID      string                 `json:"session_id"`
	FormData       map[string]interface{} `json:"form_data"`
	RenderedPrompt string                 `json:"rendered_prompt"`
}

func (h *OsintDashboardHandler) chatRespond(c *gin.Context) {
	u, ok := GetCurrentUser(c)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"detail": "Not authenticated"})
		return
	}
	var req chatRespondRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"detail": "invalid request body"})
		return
	}
	sessionID := strings.TrimSpace(req.SessionID)
	if sessionID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"detail": "session_id required"})
		return
	}
	sess, err := h.svc.EnsureSessionAccess(sessionID, u.ID)
	if err != nil {
		c.JSON(http.StatusForbidden, gin.H{"detail": "session not found or access denied"})
		return
	}
	skillKey := ""
	if sess.SkillKey != nil {
		skillKey = *sess.SkillKey
	}
	if skillKey == "" || !h.svc.SkillUsesW6Pipeline(skillKey) {
		c.JSON(http.StatusBadRequest, gin.H{"detail": "session has no W6 skill"})
		return
	}
	skill, err := h.svc.ValidateSkillKey(u.ID, u.IsAdmin(), skillKey)
	if err != nil {
		c.JSON(http.StatusForbidden, gin.H{"detail": err.Error()})
		return
	}
	prompt := strings.TrimSpace(req.RenderedPrompt)
	if prompt == "" {
		var err error
		prompt, err = osintdashboard.RenderPromptTemplate(skill.PromptTemplate, req.FormData)
		if err != nil || strings.TrimSpace(prompt) == "" {
			c.JSON(http.StatusBadRequest, gin.H{"detail": "failed to render skill prompt"})
			return
		}
	}
	writeSSE, ok := beginSSE(c)
	if !ok {
		return
	}
	writeSSE(osintdashboard.ChatSSEEvent{"type": "phase", "phase": "working", "message": "已收到补充信息，继续执行..."})
	summary := osintdashboard.BuildStartUserContent("补充信息", req.FormData)
	if strings.HasPrefix(summary, "@w6 执行：补充信息") {
		summary = strings.Replace(summary, "@w6 执行：补充信息", "@w6 补充信息", 1)
	}
	_ = h.svc.AppendDashboardUIMessage(sessionID, "user", summary, nil)
	ch := h.svc.Hub().Subscribe(sessionID)
	defer h.svc.Hub().Unsubscribe(sessionID, ch)
	h.svc.StartW6Round(c.Request.Context(), sessionID, prompt, extractTopic(req.FormData, skill.Name))
	_, followUps := h.streamW6ToChat(ch, skill.Name, sessionID, "", writeSSE)
	_ = h.svc.AppendDashboardUIMessage(sessionID, "w6", "W6 深度调研", followUps)
	writeSSE(osintdashboard.ChatSSEEvent{"type": "stream_end"})
}

type chatDiscussRequest struct {
	SessionID        string `json:"session_id"`
	Message          string `json:"message"`
	TargetResourceID string `json:"target_resource_id"`
	Mode             string `json:"mode"` // discuss | edit_html (auto when target_resource_id set)
}

func (h *OsintDashboardHandler) chatDiscuss(c *gin.Context) {
	u, ok := GetCurrentUser(c)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"detail": "Not authenticated"})
		return
	}
	var req chatDiscussRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"detail": "invalid request body"})
		return
	}
	sessionID := strings.TrimSpace(req.SessionID)
	message := strings.TrimSpace(req.Message)
	targetID := strings.TrimSpace(req.TargetResourceID)
	mode := strings.TrimSpace(req.Mode)
	if sessionID == "" || message == "" {
		c.JSON(http.StatusBadRequest, gin.H{"detail": "session_id and message required"})
		return
	}
	if _, err := h.svc.EnsureSessionAccess(sessionID, u.ID); err != nil {
		c.JSON(http.StatusForbidden, gin.H{"detail": "session not found or access denied"})
		return
	}

	discussMode := "discuss"
	if targetID != "" || mode == "edit_html" {
		discussMode = "edit_html"
		if targetID == "" {
			c.JSON(http.StatusBadRequest, gin.H{"detail": "target_resource_id required for edit_html mode"})
			return
		}
	}

	// Persist user bubble immediately so refresh can restore it.
	_ = h.svc.AppendDashboardUIMessage(sessionID, "user", message, nil)
	_ = h.svc.SetDiscussStatus(sessionID, "running", discussMode)

	// Detached from the HTTP request — survives page refresh / client disconnect.
	workCtx, workCancel := context.WithTimeout(context.Background(), h.editHTMLTimeout)
	defer workCancel()

	var (
		result *osintdashboard.DiscussResult
		err    error
	)
	if discussMode == "edit_html" {
		result, err = h.svc.EditReportHTML(workCtx, sessionID, targetID, message)
	} else {
		result, err = h.svc.Discuss(workCtx, sessionID, message)
	}

	_ = h.svc.ClearDiscussStatus(sessionID)

	if err != nil {
		detail := err.Error()
		if discussMode == "edit_html" {
			detail = ai.UserFacingError(err)
		}
		_ = h.svc.AppendDashboardUIMessage(sessionID, "assistant", "❌ "+detail, nil)
		c.JSON(http.StatusBadRequest, gin.H{"detail": detail})
		return
	}
	_ = h.svc.AppendDashboardUIMessage(sessionID, "assistant", result.Reply, nil)
	out := gin.H{"reply": result.Reply}
	if result.Edited && result.HTMLResourceID != "" {
		out["edited"] = true
		out["html_resource_id"] = result.HTMLResourceID
		out["report_url"] = result.HTMLResourceID
	}
	c.JSON(http.StatusOK, out)
}

type w6StopRequest struct {
	SessionID string `json:"session_id"`
}

func (h *OsintDashboardHandler) w6Stop(c *gin.Context) {
	u, ok := GetCurrentUser(c)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"detail": "Not authenticated"})
		return
	}
	var req w6StopRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"detail": "invalid request body"})
		return
	}
	sessionID := strings.TrimSpace(req.SessionID)
	if sessionID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"detail": "session_id required"})
		return
	}
	if _, err := h.svc.EnsureSessionAccess(sessionID, u.ID); err != nil {
		c.JSON(http.StatusForbidden, gin.H{"detail": "session not found or access denied"})
		return
	}
	h.svc.StopW6Round(sessionID)
	c.JSON(http.StatusOK, gin.H{"ok": true})
}

func (h *OsintDashboardHandler) w6Stream(c *gin.Context) {
	u, ok := GetCurrentUser(c)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"detail": "Not authenticated"})
		return
	}
	sessionID := strings.TrimSpace(c.Query("session_id"))
	if sessionID == "" {
		sessionID = strings.TrimSpace(c.Query("sessionId"))
	}
	if sessionID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"detail": "session_id required"})
		return
	}
	if _, err := h.svc.EnsureSessionAccess(sessionID, u.ID); err != nil {
		c.JSON(http.StatusForbidden, gin.H{"detail": "session not found or access denied"})
		return
	}
	c.Header("Content-Type", "text/event-stream")
	c.Header("Cache-Control", "no-cache")
	c.Header("Connection", "keep-alive")
	c.Header("X-Accel-Buffering", "no")

	flusher, ok := c.Writer.(http.Flusher)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"detail": "streaming unsupported"})
		return
	}
	done := c.Request.Context().Done()
	h.svc.Hub().WriteSSE(c.Writer, flusher, sessionID, done)
}

func (h *OsintDashboardHandler) sessionState(c *gin.Context) {
	u, ok := GetCurrentUser(c)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"detail": "Not authenticated"})
		return
	}
	sessionID := strings.TrimSpace(c.Param("id"))
	if _, err := h.svc.EnsureSessionAccess(sessionID, u.ID); err != nil {
		c.JSON(http.StatusForbidden, gin.H{"detail": "session not found or access denied"})
		return
	}
	state, err := h.svc.GetSessionRestoreState(sessionID)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"detail": "session not found"})
		return
	}
	c.JSON(http.StatusOK, state)
}

func (h *OsintDashboardHandler) sessionReports(c *gin.Context) {
	u, ok := GetCurrentUser(c)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"detail": "Not authenticated"})
		return
	}
	sessionID := strings.TrimSpace(c.Param("id"))
	if _, err := h.svc.EnsureSessionAccess(sessionID, u.ID); err != nil {
		c.JSON(http.StatusForbidden, gin.H{"detail": "session not found or access denied"})
		return
	}
	list, err := h.svc.ListSessionReports(sessionID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"detail": "failed to list reports"})
		return
	}
	reports := make([]gin.H, 0, len(list))
	for _, r := range list {
		item := gin.H{
			"id":    r.ID,
			"title": r.Name,
			"type":  r.Type,
			"name":  r.Name,
			// Preview endpoint expects artifact resource id, not file: URL.
			"url": r.ID,
		}
		reports = append(reports, item)
	}
	c.JSON(http.StatusOK, gin.H{"reports": reports})
}

func (h *OsintDashboardHandler) streamW6ToChat(
	ch <-chan w6.Event,
	reportTitle, sessionID, prefixAssistant string,
	writeSSE func(osintdashboard.ChatSSEEvent),
) (assistant string, followUps []string) {
	var buf strings.Builder
	if strings.TrimSpace(prefixAssistant) != "" {
		buf.WriteString(prefixAssistant)
	}
	emit := func(ev osintdashboard.ChatSSEEvent) {
		writeSSE(ev)
		if typ, _ := ev["type"].(string); typ == "text_delta" {
			if delta, ok := ev["delta"].(string); ok {
				buf.WriteString(delta)
			}
		}
	}
	emitW6 := func(ev w6.Event) bool {
		if ev.Type == "done" {
			followUps = ev.FollowUps
		}
		osintdashboard.MapW6EventToChatSSE(ev, reportTitle, sessionID, emit)
		return ev.Type == "done" || ev.Type == "error"
	}
	for ev := range ch {
		if emitW6(ev) {
			return buf.String(), followUps
		}
	}
	return buf.String(), followUps
}

func beginSSE(c *gin.Context) (func(osintdashboard.ChatSSEEvent), bool) {
	c.Header("Content-Type", "text/event-stream")
	c.Header("Cache-Control", "no-cache")
	c.Header("Connection", "keep-alive")
	c.Header("X-Accel-Buffering", "no")
	c.Status(http.StatusOK)
	if _, ok := c.Writer.(http.Flusher); !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"detail": "streaming unsupported"})
		return nil, false
	}
	return func(ev osintdashboard.ChatSSEEvent) {
		b, _ := json.Marshal(ev)
		fmt.Fprintf(c.Writer, "data: %s\n\n", b)
		if f, ok := c.Writer.(http.Flusher); ok {
			f.Flush()
		}
	}, true
}

// stripW6CommandPrefix removes a leading "@w6" tag from chat commands (UI may include it).
func stripW6CommandPrefix(s string) string {
	t := strings.TrimSpace(s)
	if len(t) < 3 {
		return t
	}
	lower := strings.ToLower(t)
	if !strings.HasPrefix(lower, "@w6") {
		return t
	}
	return strings.TrimSpace(t[3:])
}

func emitSessionTitleSSE(
	writeSSE func(osintdashboard.ChatSSEEvent),
	sessionID string,
	title string,
) {
	title = osintdashboard.TruncateSessionTitle(title, 0)
	if title == "" {
		return
	}
	writeSSE(osintdashboard.ChatSSEEvent{
		"type":      "session_title",
		"title":     title,
		"sessionId": sessionID,
	})
}

func extractTopic(formData map[string]interface{}, fallback string) string {
	topic := strings.TrimSpace(fmt.Sprint(formData["topic"]))
	target := strings.TrimSpace(fmt.Sprint(formData["target"]))
	if target != "" && target != "<nil>" {
		if topic == "" || topic == "<nil>" {
			return target
		}
	}
	if topic != "" && topic != "<nil>" {
		return topic
	}
	if target != "" && target != "<nil>" {
		return target
	}
	for _, key := range []string{"subject", "query", "title", "claim"} {
		if v, ok := formData[key]; ok {
			s := strings.TrimSpace(fmt.Sprint(v))
			if s != "" && s != "<nil>" {
				return s
			}
		}
	}
	if fallback != "" {
		return fallback
	}
	return "调研主题"
}
