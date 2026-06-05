package http

import (
	"net/http"

	"github.com/easyspace-ai/ylmnote/internal/application/chat"
	"github.com/gin-gonic/gin"
)

// ChatHandler 对话 HTTP 处理
type ChatHandler struct {
	svc *chat.Service
}

func NewChatHandler(svc *chat.Service) *ChatHandler {
	return &ChatHandler{svc: svc}
}

func (h *ChatHandler) RegisterRoutes(r *gin.RouterGroup) {
	r.POST("/", h.send)
}

func (h *ChatHandler) send(c *gin.Context) {
	var req struct {
		Message      string                 `json:"message"`
		ProjectID    string                 `json:"project_id"`
		SessionID    string                 `json:"session_id"`
		SkillID      *string                `json:"skill_id,omitempty"`
		Attachments  map[string]interface{} `json:"attachments,omitempty"`
		ResourceRefs []chat.ResourceRefInput `json:"resource_refs,omitempty"`
		Model        *string                `json:"model,omitempty"`
		Mode         *string                `json:"mode,omitempty"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"detail": "invalid request"})
		return
	}

	userID, _ := c.Get("user_id")
	uid, _ := userID.(string)

	in := chat.ChatInput{
		Message:      req.Message,
		ProjectID:    &req.ProjectID,
		SessionID:    &req.SessionID,
		SkillID:      req.SkillID,
		Attachments:  req.Attachments,
		ResourceRefs: req.ResourceRefs,
		Model:        req.Model,
	}

	result, err := h.svc.SendMessage(c.Request.Context(), uid, in)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"detail": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"id":         result.ID,
		"project_id": result.ProjectID,
		"session_id": result.SessionID,
		"role":       result.Role,
		"content":    result.Content,
		"skill_id":   result.SkillID,
		"created_at": result.CreatedAt,
	})
}
