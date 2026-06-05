package http

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/easyspace-ai/ylmnote/internal/config"
	"github.com/easyspace-ai/ylmnote/internal/infrastructure/deepseek"
	"github.com/gin-gonic/gin"
)

// SkillAssistantHandler admin skill authoring AI assistant
type SkillAssistantHandler struct {
	client *deepseek.Client
}

func NewSkillAssistantHandler(cfg *config.Config) *SkillAssistantHandler {
	return &SkillAssistantHandler{
		client: deepseek.NewClient(deepseek.Config{
			APIKey:       cfg.DeepSeek.APIKey,
			BaseURL:      cfg.DeepSeek.BaseURL,
			Model:        cfg.DeepSeek.Model,
			SkillTimeout: time.Duration(cfg.DeepSeek.TimeoutSec) * time.Second,
		}),
	}
}

func (h *SkillAssistantHandler) RegisterRoutes(r *gin.RouterGroup) {
	r.POST("/skill-assistant/chat", h.chat)
	r.POST("/skill-assistant/chat/stream", h.chatStream)
}

type skillAssistantChatRequest struct {
	Messages []struct {
		Role    string `json:"role"`
		Content string `json:"content"`
	} `json:"messages"`
	Context *skillAssistantContext `json:"context"`
}

type skillAssistantContext struct {
	Key            string `json:"key"`
	Name           string `json:"name"`
	Description    string `json:"description"`
	FormSchema     string `json:"form_schema"`
	PromptTemplate string `json:"prompt_template"`
	ActiveTab      string `json:"active_tab"`
}

func (h *SkillAssistantHandler) chat(c *gin.Context) {
	var req skillAssistantChatRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"detail": "invalid request body"})
		return
	}
	if len(req.Messages) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"detail": "messages required"})
		return
	}

	msgs := make([]deepseek.Message, 0, len(req.Messages))
	for _, m := range req.Messages {
		msgs = append(msgs, deepseek.Message{
			Role:    m.Role,
			Content: m.Content,
		})
	}

	ctxText := buildSkillAssistantContext(req.Context)
	reply, err := h.client.Chat(c.Request.Context(), msgs, ctxText)
	if err != nil {
		if strings.Contains(err.Error(), "DEEPSEEK_API_KEY") {
			c.JSON(http.StatusServiceUnavailable, gin.H{"detail": err.Error()})
			return
		}
		c.JSON(http.StatusBadGateway, gin.H{"detail": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": reply})
}

func (h *SkillAssistantHandler) chatStream(c *gin.Context) {
	var req skillAssistantChatRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"detail": "invalid request body"})
		return
	}
	if len(req.Messages) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"detail": "messages required"})
		return
	}

	msgs := make([]deepseek.Message, 0, len(req.Messages))
	for _, m := range req.Messages {
		msgs = append(msgs, deepseek.Message{
			Role:    m.Role,
			Content: m.Content,
		})
	}

	ctxText := buildSkillAssistantContext(req.Context)

	c.Header("Content-Type", "text/event-stream")
	c.Header("Cache-Control", "no-cache")
	c.Header("Connection", "keep-alive")
	c.Header("X-Accel-Buffering", "no")

	flusher, ok := c.Writer.(http.Flusher)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"detail": "streaming not supported"})
		return
	}

	writeSSE := func(payload any) {
		raw, _ := json.Marshal(payload)
		_, _ = fmt.Fprintf(c.Writer, "data: %s\n\n", raw)
		flusher.Flush()
	}

	err := h.client.ChatStream(c.Request.Context(), msgs, ctxText, func(content string) error {
		writeSSE(map[string]string{"content": content})
		return nil
	})
	if err != nil {
		if strings.Contains(err.Error(), "DEEPSEEK_API_KEY") {
			writeSSE(map[string]string{"error": err.Error()})
			return
		}
		writeSSE(map[string]string{"error": err.Error()})
		return
	}

	_, _ = fmt.Fprintf(c.Writer, "data: [DONE]\n\n")
	flusher.Flush()
}

func buildSkillAssistantContext(ctx *skillAssistantContext) string {
	if ctx == nil {
		return ""
	}
	var b strings.Builder
	if ctx.Key != "" {
		b.WriteString("- key: " + ctx.Key + "\n")
	}
	if ctx.Name != "" {
		b.WriteString("- name: " + ctx.Name + "\n")
	}
	if ctx.Description != "" {
		b.WriteString("- description: " + ctx.Description + "\n")
	}
	if ctx.ActiveTab != "" {
		b.WriteString("- active_tab: " + ctx.ActiveTab + "\n")
	}
	if ctx.FormSchema != "" {
		b.WriteString("\n### form_schema\n```json\n")
		b.WriteString(ctx.FormSchema)
		b.WriteString("\n```\n")
	}
	if ctx.PromptTemplate != "" {
		b.WriteString("\n### prompt_template\n```\n")
		b.WriteString(ctx.PromptTemplate)
		b.WriteString("\n```\n")
	}
	return b.String()
}
