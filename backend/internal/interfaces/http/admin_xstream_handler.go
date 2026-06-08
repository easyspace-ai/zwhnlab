package http

import (
	"net/http"

	"github.com/easyspace-ai/ylmnote/internal/application/xstream"
	"github.com/gin-gonic/gin"
)

// AdminXStreamHandler manages manual xstream cache initialization.
type AdminXStreamHandler struct {
	fetcher *xstream.Fetcher
}

func NewAdminXStreamHandler(fetcher *xstream.Fetcher) *AdminXStreamHandler {
	return &AdminXStreamHandler{fetcher: fetcher}
}

func (h *AdminXStreamHandler) RegisterRoutes(r *gin.RouterGroup) {
	r.GET("/xstream/status", h.statusGET)
	r.POST("/xstream/clear", h.clearPOST)
	r.POST("/xstream/init", h.initPOST)
	r.POST("/xstream/cancel", h.cancelPOST)
}

func (h *AdminXStreamHandler) statusGET(c *gin.Context) {
	if h.fetcher == nil {
		c.JSON(http.StatusServiceUnavailable, gin.H{"error": "xstream fetcher not configured"})
		return
	}
	c.JSON(http.StatusOK, h.fetcher.GetInitProgress())
}

func (h *AdminXStreamHandler) clearPOST(c *gin.Context) {
	if h.fetcher == nil {
		c.JSON(http.StatusServiceUnavailable, gin.H{"error": "xstream fetcher not configured"})
		return
	}
	if err := h.fetcher.ClearLocalData(); err != nil {
		c.JSON(http.StatusConflict, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"status": "cleared"})
}

type xstreamInitRequest struct {
	ClearFirst *bool `json:"clear_first"`
}

func (h *AdminXStreamHandler) initPOST(c *gin.Context) {
	if h.fetcher == nil {
		c.JSON(http.StatusServiceUnavailable, gin.H{"error": "xstream fetcher not configured"})
		return
	}
	clearFirst := true
	var req xstreamInitRequest
	if err := c.ShouldBindJSON(&req); err == nil && req.ClearFirst != nil {
		clearFirst = *req.ClearFirst
	}
	if err := h.fetcher.StartInitialize(clearFirst); err != nil {
		c.JSON(http.StatusConflict, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusAccepted, gin.H{
		"status":      "started",
		"clear_first": clearFirst,
		"batch_limit": xstream.InitBatchLimit,
		"batch_delay": xstream.InitBatchDelay.String(),
	})
}

func (h *AdminXStreamHandler) cancelPOST(c *gin.Context) {
	if h.fetcher == nil {
		c.JSON(http.StatusServiceUnavailable, gin.H{"error": "xstream fetcher not configured"})
		return
	}
	if !h.fetcher.CancelInitialize() {
		c.JSON(http.StatusConflict, gin.H{"error": "no initialization in progress"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"status": "cancelling"})
}
