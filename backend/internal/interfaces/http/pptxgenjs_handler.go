package http

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/easyspace-ai/ylmnote/internal/application/pptxgenjs"
	"github.com/easyspace-ai/ylmnote/internal/application/project"
	projectdomain "github.com/easyspace-ai/ylmnote/internal/domain/project"
	"github.com/easyspace-ai/ylmnote/internal/config"
	"github.com/easyspace-ai/ylmnote/internal/infrastructure/deepseek"
	"github.com/gin-gonic/gin"
)

type PptxgenjsHandler struct {
	projectSvc    *project.Service
	pipeline      *pptxgenjs.Pipeline
	normalizer    *pptxgenjs.SchemaNormalizer
	pipelineTotal time.Duration
}

func NewPptxgenjsHandler(cfg *config.Config, projectSvc *project.Service) *PptxgenjsHandler {
	root := config.MonorepoRoot()
	pipelineDir := pptxgenjs.DefaultPipelineDir(root)
	skillDir := pptxgenjs.DefaultSkillDir(root)
	llm := deepseek.NewClient(deepseek.Config{
		APIKey:       cfg.DeepSeek.APIKey,
		BaseURL:      cfg.DeepSeek.BaseURL,
		Model:        cfg.DeepSeek.Model,
		SkillTimeout: time.Duration(cfg.DeepSeek.TimeoutSec) * time.Second,
	})
	stageTimeout := time.Duration(cfg.DeepSeek.PipelineStageTimeoutSec) * time.Second
	totalTimeout := time.Duration(cfg.DeepSeek.PipelineTotalTimeoutSec) * time.Second
	loader := pptxgenjs.NewPromptLoader(pipelineDir, skillDir)
	pipe := pptxgenjs.NewPipeline(projectSvc, llm, loader, stageTimeout)
	normPrompt, _ := loader.LoadNormalize()
	normalizer := pptxgenjs.NewSchemaNormalizer(llm, normPrompt, stageTimeout)
	return &PptxgenjsHandler{
		projectSvc:    projectSvc,
		pipeline:      pipe,
		normalizer:    normalizer,
		pipelineTotal: totalTimeout,
	}
}

func (h *PptxgenjsHandler) RegisterRoutes(r *gin.RouterGroup) {
	r.GET("/projects", h.listProjects)
	r.POST("/projects", h.createProject)
	r.GET("/projects/:project_id", h.getProject)
	r.GET("/projects/:project_id/resources", h.listResources)
	r.GET("/projects/:project_id/chat", h.getChat)
	r.PUT("/projects/:project_id/chat", h.saveChat)
	r.POST("/projects/:project_id/pipeline/run", h.runPipeline)
	r.POST("/projects/:project_id/pipeline/regenerate", h.regenerate)
	r.POST("/normalize-product-schema", h.normalizeProductSchema)
}

func (h *PptxgenjsHandler) normalizeProductSchema(c *gin.Context) {
	if _, ok := GetCurrentUser(c); !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"detail": "Not authenticated"})
		return
	}
	var req struct {
		Raw      string `json:"raw" binding:"required"`
		FileName string `json:"file_name"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"detail": "invalid request body"})
		return
	}
	raw := strings.TrimSpace(req.Raw)
	if raw == "" {
		c.JSON(http.StatusBadRequest, gin.H{"detail": "raw required"})
		return
	}

	if h.normalizer == nil {
		c.JSON(http.StatusServiceUnavailable, gin.H{"detail": "schema normalizer not configured"})
		return
	}

	pipelineCtx, cancel := context.WithTimeout(c.Request.Context(), h.pipelineTotal)
	defer cancel()

	result, err := h.normalizer.NormalizeProductSchema(pipelineCtx, raw)
	if err != nil {
		if strings.Contains(err.Error(), "DEEPSEEK_API_KEY") {
			c.JSON(http.StatusServiceUnavailable, gin.H{"detail": err.Error()})
			return
		}
		c.JSON(http.StatusBadGateway, gin.H{"detail": err.Error()})
		return
	}
	c.JSON(http.StatusOK, result)
}

func (h *PptxgenjsHandler) listProjects(c *gin.Context) {
	u, ok := GetCurrentUser(c)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"detail": "Not authenticated"})
		return
	}
	skip, limit := parseSkipLimit(c)
	all, err := h.projectSvc.ListProjects(u.ID, nil, skip, limit)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"detail": "failed to list projects"})
		return
	}
	filtered := make([]*projectdomain.Project, 0)
	for _, p := range all {
		if pptxgenjs.IsPptxgenjsProject(p.Description) {
			filtered = append(filtered, p)
		}
	}
	c.JSON(http.StatusOK, toProjectListResponse(filtered))
}

func (h *PptxgenjsHandler) getProject(c *gin.Context) {
	u, ok := GetCurrentUser(c)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"detail": "Not authenticated"})
		return
	}
	p, err := h.projectSvc.GetProject(c.Param("project_id"), u.ID)
	if err != nil || !pptxgenjs.IsPptxgenjsProject(p.Description) {
		c.JSON(http.StatusNotFound, gin.H{"detail": "Project not found"})
		return
	}
	c.JSON(http.StatusOK, toProjectResponse(p))
}

func (h *PptxgenjsHandler) createProject(c *gin.Context) {
	u, ok := GetCurrentUser(c)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"detail": "Not authenticated"})
		return
	}

	var req struct {
		Name        string            `json:"name"`
		Markdown    string            `json:"markdown" binding:"required"`
		Preferences map[string]string `json:"preferences"`
		RunPipeline bool              `json:"run_pipeline"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"detail": "invalid request body"})
		return
	}
	md := strings.TrimSpace(req.Markdown)
	if md == "" {
		c.JSON(http.StatusBadRequest, gin.H{"detail": "markdown required"})
		return
	}

	name := strings.TrimSpace(req.Name)
	if name == "" {
		name = pptxgenjs.DeriveTitleFromMD(md)
	}

	prefs := req.Preferences
	if prefs == nil {
		prefs = map[string]string{"theme": "midnight-exec"}
	}

	placeholderDesc := pptxgenjs.ProjectDescription("", prefs)
	p, err := h.projectSvc.CreateProject(c.Request.Context(), u.ID, name, &placeholderDesc, nil)
	if err != nil {
		c.JSON(http.StatusBadGateway, gin.H{"detail": err.Error()})
		return
	}

	sess, err := h.projectSvc.CreateSession(c.Request.Context(), p.ID, name)
	if err != nil {
		c.JSON(http.StatusBadGateway, gin.H{"detail": err.Error()})
		return
	}

	desc := pptxgenjs.ProjectDescription(sess.ID, prefs)
	if _, err := h.projectSvc.UpdateProject(p.ID, u.ID, nil, &desc, nil, nil); err != nil {
		c.JSON(http.StatusBadGateway, gin.H{"detail": err.Error()})
		return
	}
	p.Description = &desc

	content := md
	if _, err := h.projectSvc.CreateResource(p.ID, &sess.ID, "markdown", "source.md", &content, nil, nil); err != nil {
		c.JSON(http.StatusBadGateway, gin.H{"detail": err.Error()})
		return
	}

	resp := gin.H{
		"project":    toProjectResponse(p),
		"session_id": sess.ID,
	}

	if req.RunPipeline {
		pipelineCtx, cancel := context.WithTimeout(c.Request.Context(), h.pipelineTotal)
		defer cancel()
		result, err := h.pipeline.Run(pipelineCtx, u.ID, p.ID, md, prefs, nil)
		if err != nil {
			c.JSON(http.StatusBadGateway, gin.H{"detail": err.Error(), "project": resp})
			return
		}
		resp["pipeline"] = result
	}

	c.JSON(http.StatusOK, resp)
}

func (h *PptxgenjsHandler) listResources(c *gin.Context) {
	u, ok := GetCurrentUser(c)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"detail": "Not authenticated"})
		return
	}
	projectID := c.Param("project_id")
	p, err := h.projectSvc.GetProject(projectID, u.ID)
	if err != nil || !pptxgenjs.IsPptxgenjsProject(p.Description) {
		c.JSON(http.StatusNotFound, gin.H{"detail": "Project not found"})
		return
	}
	list, err := h.projectSvc.ListResources(projectID, nil)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"detail": err.Error()})
		return
	}
	c.JSON(http.StatusOK, toResourceListResponse(list))
}

func (h *PptxgenjsHandler) getChat(c *gin.Context) {
	u, ok := GetCurrentUser(c)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"detail": "Not authenticated"})
		return
	}
	projectID := c.Param("project_id")
	p, err := h.projectSvc.GetProject(projectID, u.ID)
	if err != nil || !pptxgenjs.IsPptxgenjsProject(p.Description) {
		c.JSON(http.StatusNotFound, gin.H{"detail": "Project not found"})
		return
	}
	chatType := "chat_log"
	resources, err := h.projectSvc.ListResources(projectID, &chatType)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"detail": err.Error()})
		return
	}
	if len(resources) == 0 || resources[0].Content == nil {
		c.JSON(http.StatusOK, gin.H{"messages": []any{}})
		return
	}
	var payload struct {
		Messages []map[string]string `json:"messages"`
	}
	if err := json.Unmarshal([]byte(*resources[0].Content), &payload); err != nil {
		c.JSON(http.StatusOK, gin.H{"messages": []any{}})
		return
	}
	c.JSON(http.StatusOK, gin.H{"messages": payload.Messages})
}

func (h *PptxgenjsHandler) saveChat(c *gin.Context) {
	u, ok := GetCurrentUser(c)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"detail": "Not authenticated"})
		return
	}
	projectID := c.Param("project_id")
	p, err := h.projectSvc.GetProject(projectID, u.ID)
	if err != nil || !pptxgenjs.IsPptxgenjsProject(p.Description) {
		c.JSON(http.StatusNotFound, gin.H{"detail": "Project not found"})
		return
	}
	var req struct {
		Messages []map[string]string `json:"messages" binding:"required"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"detail": "invalid request body"})
		return
	}
	raw, err := json.Marshal(map[string]any{"messages": req.Messages})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"detail": err.Error()})
		return
	}
	content := string(raw)
	chatType := "chat_log"
	resources, err := h.projectSvc.ListResources(projectID, &chatType)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"detail": err.Error()})
		return
	}
	if len(resources) == 0 {
		if _, err := h.projectSvc.CreateResource(projectID, nil, "chat_log", "main.json", &content, nil, nil); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"detail": err.Error()})
			return
		}
	} else if _, err := h.projectSvc.UpdateResource(projectID, resources[0].ID, nil, &content, nil); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"detail": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"ok": true})
}

func (h *PptxgenjsHandler) runPipeline(c *gin.Context) {
	u, ok := GetCurrentUser(c)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"detail": "Not authenticated"})
		return
	}
	projectID := c.Param("project_id")
	p, err := h.projectSvc.GetProject(projectID, u.ID)
	if err != nil || !pptxgenjs.IsPptxgenjsProject(p.Description) {
		c.JSON(http.StatusNotFound, gin.H{"detail": "Project not found"})
		return
	}

	mdType := "markdown"
	resources, err := h.projectSvc.ListResources(projectID, &mdType)
	if err != nil || len(resources) == 0 || resources[0].Content == nil {
		c.JSON(http.StatusBadRequest, gin.H{"detail": "markdown source not found"})
		return
	}
	md := *resources[0].Content
	prefs := pptxgenjs.ParsePreferences(p.Description)

	writeSSE, ok := h.beginPipelineSSE(c)
	if !ok {
		return
	}

	pipelineCtx, cancel := context.WithTimeout(c.Request.Context(), h.pipelineTotal)
	defer cancel()

	result, err := h.pipeline.Run(pipelineCtx, u.ID, projectID, md, prefs, func(ev pptxgenjs.StageEvent) {
		writeSSE(ev)
	})
	if err != nil {
		writeSSE(map[string]string{"stage": "error", "status": "failed", "message": err.Error()})
		return
	}
	writeSSE(map[string]any{"stage": "done", "status": "done", "result": result})
	_, _ = fmt.Fprintf(c.Writer, "data: [DONE]\n\n")
	if flusher, ok := c.Writer.(http.Flusher); ok {
		flusher.Flush()
	}
}

func (h *PptxgenjsHandler) regenerate(c *gin.Context) {
	u, ok := GetCurrentUser(c)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"detail": "Not authenticated"})
		return
	}
	projectID := c.Param("project_id")
	p, err := h.projectSvc.GetProject(projectID, u.ID)
	if err != nil || !pptxgenjs.IsPptxgenjsProject(p.Description) {
		c.JSON(http.StatusNotFound, gin.H{"detail": "Project not found"})
		return
	}

	var req struct {
		Instruction string `json:"instruction" binding:"required"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"detail": "invalid request body"})
		return
	}

	writeSSE, ok := h.beginPipelineSSE(c)
	if !ok {
		return
	}

	pipelineCtx, cancel := context.WithTimeout(c.Request.Context(), h.pipelineTotal)
	defer cancel()

	result, err := h.pipeline.Regenerate(pipelineCtx, u.ID, projectID, req.Instruction, func(ev pptxgenjs.StageEvent) {
		writeSSE(ev)
	})
	if err != nil {
		writeSSE(map[string]string{"stage": "error", "status": "failed", "message": err.Error()})
		return
	}
	writeSSE(map[string]any{"stage": "done", "status": "done", "result": result})
	_, _ = fmt.Fprintf(c.Writer, "data: [DONE]\n\n")
	if flusher, ok := c.Writer.(http.Flusher); ok {
		flusher.Flush()
	}
}

func (h *PptxgenjsHandler) beginPipelineSSE(c *gin.Context) (func(any), bool) {
	c.Header("Content-Type", "text/event-stream")
	c.Header("Cache-Control", "no-cache")
	c.Header("Connection", "keep-alive")
	c.Header("X-Accel-Buffering", "no")

	flusher, ok := c.Writer.(http.Flusher)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"detail": "streaming not supported"})
		return nil, false
	}

	writeSSE := func(payload any) {
		raw, _ := json.Marshal(payload)
		_, _ = fmt.Fprintf(c.Writer, "data: %s\n\n", raw)
		flusher.Flush()
	}
	return writeSSE, true
}
