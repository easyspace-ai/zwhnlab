package http

import (
	"net/http"
	"strings"

	"github.com/easyspace-ai/ylmnote/internal/application/export"
	"github.com/gin-gonic/gin"
)

type ExportHandler struct {
	svc *export.Service
}

func NewExportHandler(svc *export.Service) *ExportHandler {
	return &ExportHandler{svc: svc}
}

func (h *ExportHandler) RegisterRoutes(r *gin.RouterGroup) {
	r.POST("/reflow-markdown", h.reflowMarkdown)
}

type reflowMarkdownReq struct {
	Markdown string `json:"markdown" binding:"required"`
}

type reflowMarkdownResp struct {
	Markdown string `json:"markdown"`
}

func (h *ExportHandler) reflowMarkdown(c *gin.Context) {
	var req reflowMarkdownReq
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"detail": "markdown content required"})
		return
	}

	md := strings.TrimSpace(req.Markdown)
	if md == "" {
		c.JSON(http.StatusBadRequest, gin.H{"detail": "markdown content is empty"})
		return
	}

	result, err := h.svc.ReflowMarkdown(c.Request.Context(), md)
	if err != nil {
		c.JSON(http.StatusBadGateway, gin.H{"detail": err.Error()})
		return
	}

	c.JSON(http.StatusOK, reflowMarkdownResp{Markdown: result})
}
