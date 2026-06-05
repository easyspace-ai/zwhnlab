package http

import (
	"bufio"
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strings"
	"time"

	"github.com/easyspace-ai/ylmnote/internal/config"
	"github.com/gin-gonic/gin"
)

type OhMyPPTHandler struct {
	serviceURL string
	client     *http.Client
}

const ohmypptUserIDHeader = "X-User-Id"

func (h *OhMyPPTHandler) attachUserHeader(req *http.Request, c *gin.Context) bool {
	u, ok := GetCurrentUser(c)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"detail": "Not authenticated"})
		return false
	}
	req.Header.Set(ohmypptUserIDHeader, u.ID)
	return true
}

func NewOhMyPPTHandler(cfg *config.Config) *OhMyPPTHandler {
	return &OhMyPPTHandler{
		serviceURL: strings.TrimRight(cfg.OhMyPPTServiceURL, "/"),
		client:     &http.Client{Timeout: 0},
	}
}

func (h *OhMyPPTHandler) RegisterRoutes(r *gin.RouterGroup) {
	r.GET("/ohmyppt/styles", h.listStyles)
	r.GET("/ohmyppt/sessions", h.listSessions)
	r.POST("/ohmyppt/sessions", h.createSession)
	r.GET("/ohmyppt/sessions/:id", h.getSession)
	r.GET("/ohmyppt/sessions/:id/messages", h.getSessionMessages)
	r.PATCH("/ohmyppt/sessions/:id", h.updateSession)
	r.DELETE("/ohmyppt/sessions/:id", h.deleteSession)
	r.POST("/ohmyppt/sessions/:id/generate", h.generateSession)
	r.GET("/ohmyppt/sessions/:id/generate/stream", h.streamGenerateSession)
	r.GET("/ohmyppt/sessions/:id/pages/:pageId", h.getPage)
	r.POST("/ohmyppt/sessions/:id/export", h.exportSession)
	r.POST("/ohmyppt/export/guizang-pptx", h.exportGuizangPptx)
	// Legacy one-shot: create + generate SSE
	r.POST("/ohmyppt/generate", h.generate)
}

func (h *OhMyPPTHandler) requireService(c *gin.Context) bool {
	if h.serviceURL == "" {
		c.JSON(http.StatusServiceUnavailable, gin.H{"detail": "OHMYPPT_SERVICE_URL is not configured"})
		return false
	}
	return true
}

func (h *OhMyPPTHandler) listStyles(c *gin.Context) {
	if !h.requireService(c) {
		return
	}
	h.proxyJSON(c, http.MethodGet, h.serviceURL+"/v1/styles", nil, 15*time.Second)
}

func (h *OhMyPPTHandler) listSessions(c *gin.Context) {
	if !h.requireService(c) {
		return
	}
	url := h.serviceURL + "/v1/sessions"
	if q := c.Request.URL.RawQuery; q != "" {
		url += "?" + q
	}
	h.proxyJSON(c, http.MethodGet, url, nil, 15*time.Second)
}

func (h *OhMyPPTHandler) createSession(c *gin.Context) {
	if !h.requireService(c) {
		return
	}
	body, err := io.ReadAll(c.Request.Body)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"detail": "invalid request body"})
		return
	}
	h.proxyJSON(c, http.MethodPost, h.serviceURL+"/v1/sessions", body, 30*time.Second)
}

func (h *OhMyPPTHandler) getSession(c *gin.Context) {
	if !h.requireService(c) {
		return
	}
	id := c.Param("id")
	h.proxyJSON(c, http.MethodGet, h.serviceURL+"/v1/sessions/"+id, nil, 15*time.Second)
}

func (h *OhMyPPTHandler) getSessionMessages(c *gin.Context) {
	if !h.requireService(c) {
		return
	}
	id := c.Param("id")
	url := h.serviceURL + "/v1/sessions/" + id + "/messages"
	if q := c.Request.URL.RawQuery; q != "" {
		url += "?" + q
	}
	h.proxyJSON(c, http.MethodGet, url, nil, 15*time.Second)
}

func (h *OhMyPPTHandler) streamGenerateSession(c *gin.Context) {
	if !h.requireService(c) {
		return
	}
	id := c.Param("id")
	h.proxySSE(c, http.MethodGet, h.serviceURL+"/v1/sessions/"+id+"/generate/stream", nil)
}

func (h *OhMyPPTHandler) updateSession(c *gin.Context) {
	if !h.requireService(c) {
		return
	}
	id := c.Param("id")
	body, err := io.ReadAll(c.Request.Body)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"detail": "invalid request body"})
		return
	}
	h.proxyJSON(c, http.MethodPatch, h.serviceURL+"/v1/sessions/"+id, body, 15*time.Second)
}

func (h *OhMyPPTHandler) deleteSession(c *gin.Context) {
	if !h.requireService(c) {
		return
	}
	id := c.Param("id")
	h.proxyJSON(c, http.MethodDelete, h.serviceURL+"/v1/sessions/"+id, nil, 30*time.Second)
}

func (h *OhMyPPTHandler) getPage(c *gin.Context) {
	if !h.requireService(c) {
		return
	}
	id := c.Param("id")
	pageID := c.Param("pageId")
	h.proxyBinary(c, http.MethodGet, h.serviceURL+"/v1/sessions/"+id+"/pages/"+pageID, nil, 30*time.Second)
}

func (h *OhMyPPTHandler) exportSession(c *gin.Context) {
	if !h.requireService(c) {
		return
	}
	id := c.Param("id")
	body, _ := io.ReadAll(c.Request.Body)
	if len(body) == 0 {
		body = []byte(`{"format":"zip"}`)
	}

	timeout := 120 * time.Second
	var req struct {
		Format string `json:"format"`
	}
	if json.Unmarshal(body, &req) == nil && req.Format == "pptx" {
		timeout = 600 * time.Second
	}

	h.proxyBinary(c, http.MethodPost, h.serviceURL+"/v1/sessions/"+id+"/export", body, timeout)
}

func (h *OhMyPPTHandler) exportGuizangPptx(c *gin.Context) {
	if !h.requireService(c) {
		return
	}
	body, err := io.ReadAll(c.Request.Body)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"detail": "invalid request body"})
		return
	}
	h.proxyBinary(c, http.MethodPost, h.serviceURL+"/v1/export/guizang-pptx", body, 600*time.Second)
}

func (h *OhMyPPTHandler) generateSession(c *gin.Context) {
	if !h.requireService(c) {
		return
	}
	id := c.Param("id")
	body, _ := io.ReadAll(c.Request.Body)
	h.proxySSE(c, http.MethodPost, h.serviceURL+"/v1/sessions/"+id+"/generate", body)
}

func (h *OhMyPPTHandler) generate(c *gin.Context) {
	if !h.requireService(c) {
		return
	}

	var req struct {
		Topic       string         `json:"topic" binding:"required"`
		StyleID     string         `json:"style_id"`
		PageCount   int            `json:"page_count"`
		Locale      string         `json:"locale"`
		UserMessage string         `json:"user_message"`
		Model       map[string]any `json:"model"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"detail": "invalid request body"})
		return
	}

	createBody := map[string]any{"topic": req.Topic}
	if req.StyleID != "" {
		createBody["style_id"] = req.StyleID
	}
	if req.PageCount > 0 {
		createBody["page_count"] = req.PageCount
	}
	if req.Locale != "" {
		createBody["locale"] = req.Locale
	}
	if req.UserMessage != "" {
		createBody["user_message"] = req.UserMessage
	}
	if req.Model != nil {
		createBody["model"] = req.Model
	}

	sessionID, err := h.createSessionUpstream(c, createBody)
	if err != nil {
		c.JSON(http.StatusBadGateway, gin.H{"detail": err.Error()})
		return
	}

	genBody := map[string]any{}
	if req.UserMessage != "" {
		genBody["user_message"] = req.UserMessage
	}
	rawGen, _ := json.Marshal(genBody)

	c.Header("Content-Type", "text/event-stream")
	c.Header("Cache-Control", "no-cache")
	c.Header("Connection", "keep-alive")
	c.Header("X-Accel-Buffering", "no")

	flusher, ok := c.Writer.(http.Flusher)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"detail": "streaming not supported"})
		return
	}

	bootstrap, _ := json.Marshal(map[string]any{
		"type":       "session_created",
		"session_id": sessionID,
	})
	_, _ = fmt.Fprintf(c.Writer, "data: %s\n\n", bootstrap)
	flusher.Flush()

	h.forwardSSE(c, http.MethodPost, h.serviceURL+"/v1/sessions/"+sessionID+"/generate", rawGen)
}

func (h *OhMyPPTHandler) proxyJSON(c *gin.Context, method, url string, body []byte, timeout time.Duration) {
	ctx, cancel := contextWithTimeout(c, timeout)
	defer cancel()

	var reader io.Reader
	if body != nil {
		reader = bytes.NewReader(body)
	}
	req, err := http.NewRequestWithContext(ctx, method, url, reader)
	if err != nil {
		c.JSON(http.StatusBadGateway, gin.H{"detail": err.Error()})
		return
	}
	if body != nil {
		req.Header.Set("Content-Type", "application/json")
	}
	if !h.attachUserHeader(req, c) {
		return
	}

	resp, err := h.client.Do(req)
	if err != nil {
		c.JSON(http.StatusBadGateway, gin.H{"detail": err.Error()})
		return
	}
	defer resp.Body.Close()

	respBody, err := io.ReadAll(resp.Body)
	if err != nil {
		c.JSON(http.StatusBadGateway, gin.H{"detail": err.Error()})
		return
	}
	c.Data(resp.StatusCode, resp.Header.Get("Content-Type"), respBody)
}

func (h *OhMyPPTHandler) proxyBinary(c *gin.Context, method, url string, body []byte, timeout time.Duration) {
	ctx, cancel := contextWithTimeout(c, timeout)
	defer cancel()

	var reader io.Reader
	if body != nil {
		reader = bytes.NewReader(body)
	}
	req, err := http.NewRequestWithContext(ctx, method, url, reader)
	if err != nil {
		c.JSON(http.StatusBadGateway, gin.H{"detail": err.Error()})
		return
	}
	if body != nil {
		req.Header.Set("Content-Type", "application/json")
	}
	if !h.attachUserHeader(req, c) {
		return
	}

	resp, err := h.client.Do(req)
	if err != nil {
		c.JSON(http.StatusBadGateway, gin.H{"detail": err.Error()})
		return
	}
	defer resp.Body.Close()

	for _, key := range []string{"Content-Type", "Content-Disposition", "Content-Length"} {
		if v := resp.Header.Get(key); v != "" {
			c.Header(key, v)
		}
	}
	c.Status(resp.StatusCode)
	_, _ = io.Copy(c.Writer, resp.Body)
}

func (h *OhMyPPTHandler) proxySSE(c *gin.Context, method, url string, body []byte) {
	c.Header("Content-Type", "text/event-stream")
	c.Header("Cache-Control", "no-cache")
	c.Header("Connection", "keep-alive")
	c.Header("X-Accel-Buffering", "no")

	if _, ok := c.Writer.(http.Flusher); !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"detail": "streaming not supported"})
		return
	}
	h.forwardSSE(c, method, url, body)
}

func (h *OhMyPPTHandler) forwardSSE(c *gin.Context, method, url string, body []byte) {
	var reader io.Reader
	if body != nil {
		reader = bytes.NewReader(body)
	}
	req, err := http.NewRequestWithContext(c.Request.Context(), method, url, reader)
	if err != nil {
		c.JSON(http.StatusBadGateway, gin.H{"detail": err.Error()})
		return
	}
	if body != nil {
		req.Header.Set("Content-Type", "application/json")
	}
	req.Header.Set("Accept", "text/event-stream")
	if !h.attachUserHeader(req, c) {
		return
	}

	resp, err := h.client.Do(req)
	if err != nil {
		c.JSON(http.StatusBadGateway, gin.H{"detail": err.Error()})
		return
	}
	defer resp.Body.Close()

	if resp.StatusCode >= 400 {
		respBody, _ := io.ReadAll(io.LimitReader(resp.Body, 4096))
		c.JSON(http.StatusBadGateway, gin.H{"detail": string(respBody)})
		return
	}

	flusher, ok := c.Writer.(http.Flusher)
	if !ok {
		return
	}

	scanner := bufio.NewScanner(resp.Body)
	scanner.Buffer(make([]byte, 0, 64*1024), 1024*1024)
	for scanner.Scan() {
		line := scanner.Text()
		_, _ = fmt.Fprintf(c.Writer, "%s\n", line)
		if line == "" {
			flusher.Flush()
		}
	}
	if err := scanner.Err(); err != nil && c.Request.Context().Err() == nil {
		errPayload, _ := json.Marshal(map[string]any{
			"type": "run_error",
			"payload": map[string]string{
				"message": err.Error(),
			},
		})
		_, _ = fmt.Fprintf(c.Writer, "data: %s\n\n", errPayload)
		flusher.Flush()
	}
}

func (h *OhMyPPTHandler) createSessionUpstream(c *gin.Context, body map[string]any) (string, error) {
	raw, err := json.Marshal(body)
	if err != nil {
		return "", err
	}

	u, ok := GetCurrentUser(c)
	if !ok {
		return "", fmt.Errorf("not authenticated")
	}

	ctx, cancel := contextWithTimeout(c, 30*time.Second)
	defer cancel()

	req, err := http.NewRequestWithContext(ctx, http.MethodPost, h.serviceURL+"/v1/sessions", bytes.NewReader(raw))
	if err != nil {
		return "", err
	}
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set(ohmypptUserIDHeader, u.ID)

	resp, err := h.client.Do(req)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	respBody, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}
	if resp.StatusCode >= 400 {
		return "", fmt.Errorf("ohmyppt create session failed (%d): %s", resp.StatusCode, string(respBody))
	}

	var parsed struct {
		Session struct {
			ID string `json:"id"`
		} `json:"session"`
	}
	if err := json.Unmarshal(respBody, &parsed); err != nil {
		return "", err
	}
	if parsed.Session.ID == "" {
		return "", fmt.Errorf("ohmyppt create session returned empty id")
	}
	return parsed.Session.ID, nil
}

func contextWithTimeout(c *gin.Context, d time.Duration) (ctx context.Context, cancel context.CancelFunc) {
	return context.WithTimeout(c.Request.Context(), d)
}
