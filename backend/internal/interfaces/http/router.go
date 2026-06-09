package http

import (
	"context"
	"fmt"
	"log/slog"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"sync"
	"time"

	"github.com/easyspace-ai/ylmnote/internal/application/auth"
	"github.com/easyspace-ai/ylmnote/internal/application/chat"
	"github.com/easyspace-ai/ylmnote/internal/application/artifact"
	"github.com/easyspace-ai/ylmnote/internal/application/dashboard"
	"github.com/easyspace-ai/ylmnote/internal/application/export"
	"github.com/easyspace-ai/ylmnote/internal/application/role"
	"github.com/easyspace-ai/ylmnote/internal/application/sessionsend"
	skillgroupsvc "github.com/easyspace-ai/ylmnote/internal/application/skillgroup"
	"github.com/easyspace-ai/ylmnote/internal/application/xstream"
	intelligencesvc "github.com/easyspace-ai/ylmnote/internal/application/intelligence"
	"github.com/easyspace-ai/ylmnote/internal/application/aichat"
	"github.com/easyspace-ai/ylmnote/internal/application/osintdashboard"
	"github.com/easyspace-ai/ylmnote/internal/application/project"
	"github.com/easyspace-ai/ylmnote/internal/application/skill"
	usersvc "github.com/easyspace-ai/ylmnote/internal/application/user"
	"github.com/easyspace-ai/ylmnote/internal/config"
	"github.com/easyspace-ai/ylmnote/internal/infrastructure/deepseek"
	"github.com/easyspace-ai/ylmnote/internal/scheduler"
	sdkclient "github.com/easyspace-ai/ylmnote/internal/infrastructure/ai/gateway/client"
	sdkprovider "github.com/easyspace-ai/ylmnote/internal/infrastructure/ai/gateway/provider"
	"github.com/easyspace-ai/ylmnote/internal/infrastructure/persistence"
	"github.com/gin-gonic/gin"
	wsdk "ws-chat-tester/sdk"
)

// WireResult bundles HTTP router and background scheduler for graceful shutdown.
type WireResult struct {
	Router    *gin.Engine
	Scheduler *scheduler.Scheduler
}

// Wire 组装路由与依赖（可后续改为 wire/codegen）
func Wire(ctx context.Context, cfg *config.Config, db *persistence.DB) (*WireResult, error) {
	r := gin.New()
	r.Use(gin.Recovery())
	r.Use(RequestLogMiddleware())
	r.Use(CORSMiddleware(cfg))

	r.GET("/health", Health)

	apiLimiter := newMinuteLimiter(cfg.RateLimitAPIPerMinute)
	authLimiter := newMinuteLimiter(cfg.RateLimitAuthPerMinute)

	api := r.Group("/api")
	api.Use(apiLimiter.Middleware())
	userRepo := persistence.NewUserRepository(db)
	settingsRepo := persistence.NewSystemSettingsRepository(db)
	userRoleRepo := persistence.NewUserRoleRepository(db)
	authSvc := auth.NewService(cfg, userRepo, settingsRepo)
	roleRepo := persistence.NewRoleRepository(db)
	roleSvc := role.NewService(roleRepo, userRoleRepo)
	adminSvc := usersvc.NewAdminService(userRepo)
	authHandler := NewAuthHandler(authSvc, cfg, roleSvc, settingsRepo, adminSvc)
	authRoutes := api.Group("/auth")
	authRoutes.Use(authLimiter.Middleware())
	authHandler.RegisterRoutes(authRoutes)

	projectRepo := persistence.NewProjectRepository(db)
	sessionRepo := persistence.NewSessionRepository(db)
	messageRepo := persistence.NewMessageRepository(db)
	resourceRepo := persistence.NewResourceRepository(db)
	promptTemplateRepo := persistence.NewPromptTemplateRepository(db)
	intelligenceSkillRepo := persistence.NewIntelligenceSkillRepository(db)

	provider := sdkprovider.New(sdkprovider.Config{
		BaseURL:            cfg.SDK.BaseURL,
		ServiceAPIKey:      cfg.SDK.ServiceAPIKey,
		UploadPath:         cfg.SDK.UploadPath,
		Timeout:            time.Duration(cfg.SDK.TimeoutSec) * time.Second,
		WSWriteTimeout:     time.Duration(cfg.SDK.WSWriteTimeoutSec) * time.Second,
		WSHandshakeTimeout: time.Duration(cfg.SDK.WSHandshakeTimeoutSec) * time.Second,
		WSPushAckTimeout:   time.Duration(cfg.SDK.WSPushAckTimeoutSec) * time.Second,
		Debug:              cfg.SDK.Debug,
	})
	aiSDK := sdkclient.New(provider, sdkclient.RetryConfig{
		MaxAttempts: cfg.SDK.RetryMax,
		BaseDelay:   400 * time.Millisecond,
		Debug:       cfg.SDK.Debug,
	})
	if cfg.SDK.Debug {
		slog.Info("ai_sdk_debug_enabled")
	}

	// 创建原始 SDK client 供 WebSocket 代理使用
	rawSDKClient, err := wsdk.NewClient(wsdk.Config{
		BaseURL: cfg.SDK.BaseURL,
		APIKey:  cfg.SDK.ServiceAPIKey,
		Timeout: time.Duration(cfg.SDK.TimeoutSec) * time.Second,
	})
	if err != nil {
		slog.Error("failed to init ws sdk client", slog.Any("err", err))
	}

	projectSvc := project.NewService(projectRepo, sessionRepo, messageRepo, resourceRepo, promptTemplateRepo, aiSDK)

	polyRepo := persistence.NewPolymarketRepository(db)
	projectHandler := NewProjectHandler(projectSvc, aiSDK, rawSDKClient, resourceRepo, polyRepo, cfg.DashboardSessionID)
	projectsGroup := api.Group("/projects")
	projectsGroup.Use(AuthMiddleware(authSvc))
	projectHandler.RegisterRoutes(projectsGroup)

	// artifact 下载和预览端点（独立路由，不依赖 project_id）
	artifactGroup := api.Group("")
	artifactGroup.Use(AuthMiddleware(authSvc))
	artifactGroup.GET("/artifacts/:artifactId/download", projectHandler.downloadArtifact)
	artifactGroup.GET("/artifacts/:artifactId/preview", projectHandler.previewArtifact)

	promptTemplateHandler := NewPromptTemplateHandler(projectSvc)
	promptTemplateGroup := api.Group("/prompt-templates")
	promptTemplateGroup.Use(AuthMiddleware(authSvc))
	promptTemplateHandler.RegisterRoutes(promptTemplateGroup)

	chatSvc := chat.NewService(projectRepo, sessionRepo, messageRepo, resourceRepo, userRepo, cfg.ChatCreditCost, aiSDK, cfg.SDK.Debug)

	chatHandler := NewChatHandler(chatSvc)
	chatGroup := api.Group("/chat")
	chatGroup.Use(AuthMiddleware(authSvc))
	chatHandler.RegisterRoutes(chatGroup)

	// 独立会话路由（不依赖 project_id）
	sessionsGroup := api.Group("/sessions")
	sessionsGroup.Use(AuthMiddleware(authSvc))
	sessionsGroup.GET("", projectHandler.listSessionsDirect)
	sessionsGroup.POST("", projectHandler.createSessionDirect)
	sessionsGroup.PATCH("/:session_id", projectHandler.updateSessionDirect)
	sessionsGroup.DELETE("/:session_id", projectHandler.deleteSessionDirect)
	sessionsGroup.GET("/:session_id/history", projectHandler.getSessionHistoryDirect)
	sessionsGroup.GET("/:session_id/messages", projectHandler.listMessagesBySessionDirect)
	// session-based 资源路由
	sessionsGroup.GET("/:session_id/resources", projectHandler.listResourcesBySession)
	sessionsGroup.POST("/:session_id/resources", projectHandler.createResourceBySession)
	sessionsGroup.PATCH("/:session_id/resources/:resource_id", projectHandler.updateResourceBySession)
	sessionsGroup.DELETE("/:session_id/resources/:resource_id", projectHandler.deleteResourceBySession)
	sessionsGroup.POST("/:session_id/upload", projectHandler.uploadFileBySession)

	skillRepo := persistence.NewSkillRepository(db)
	skillSvc := skill.NewService(skillRepo)
	skillHandler := NewSkillHandler(skillSvc)
	skillsGroup := api.Group("/skills")
	skillsGroup.Use(AuthMiddleware(authSvc))
	skillHandler.RegisterRoutes(skillsGroup)

	intelligenceSkillSvc, err := intelligencesvc.NewService(intelligenceSkillRepo, cfg.SkillsDefaultsDir, cfg.SkillsCustomDir)
	if err != nil {
		return nil, fmt.Errorf("intelligence skills defaults: %w", err)
	}
	if err := os.MkdirAll(cfg.SkillsCustomDir, 0o755); err != nil {
		return nil, fmt.Errorf("skills custom dir: %w", err)
	}
	if err := intelligenceSkillSvc.SyncSystemSkills(); err != nil {
		return nil, fmt.Errorf("sync system intelligence skills: %w", err)
	}

	// Skill group service (shared between admin and intelligence skills)
	skillGroupRepo := persistence.NewSkillGroupRepository(db)
	skillGroupSvc := skillgroupsvc.NewService(skillGroupRepo, cfg.SkillsDefaultsDir)

	intelligenceSkillHandler := NewIntelligenceSkillHandler(intelligenceSkillSvc, skillGroupSvc, roleSvc)
	intelligenceSkillsGroup := api.Group("/intelligence-skills")
	intelligenceSkillsGroup.Use(AuthMiddleware(authSvc))
	intelligenceSkillHandler.RegisterRoutes(intelligenceSkillsGroup)

	modelsGroup := api.Group("/models")
	modelsHandler := NewModelsHandler()
	modelsHandler.RegisterRoutes(modelsGroup)

	userSvc := usersvc.NewService(userRepo)
	userHandler := NewUserHandler(userSvc)
	userGroup := api.Group("/user")
	userGroup.Use(AuthMiddleware(authSvc))
	userHandler.RegisterRoutes(userGroup)

	// 管理后台服务
	adminHandler := NewAdminHandler(adminSvc, roleSvc, skillGroupSvc, userRoleRepo, settingsRepo)
	skillAssistantHandler := NewSkillAssistantHandler(cfg)
	adminGroup := api.Group("/admin")
	adminGroup.Use(AuthMiddleware(authSvc))
	adminGroup.Use(AdminMiddleware())
	adminHandler.RegisterRoutes(adminGroup)
	skillAssistantHandler.RegisterRoutes(adminGroup)

	// 系统首次启动时：从 data/skills/defaults + custom 确保默认技能组
	if err := skillGroupSvc.EnsureDefaultGroups(cfg.SkillsDefaultsDir, cfg.SkillsCustomDir); err != nil {
		slog.Error("failed to ensure default skill groups", slog.Any("err", err))
	}

	// 系统首次启动 / 无管理员时：确保存在 admin 账号
	if initUser, initPassword, err := adminSvc.EnsureAtLeastOneAdmin(); err == nil && initUser != nil && initPassword != "" {
		slog.Info("default_admin_created",
			slog.String("username", initUser.Username),
			slog.String("password", initPassword),
		)
		fmt.Printf("\n========================================\n")
		fmt.Printf("  默认管理员已就绪（请尽快修改密码）\n")
		fmt.Printf("  用户名: %s\n", initUser.Username)
		fmt.Printf("  密码:   %s\n", initPassword)
		fmt.Printf("========================================\n\n")
	}

	// Polymarket routes
	polyHandler := NewPolymarketHandler(polyRepo, db, cfg.ProxyTarget, rawSDKClient)
	polyGroup := api.Group("/polymarket")
	polyGroup.POST("/resolve", polyHandler.ResolvePOST)
	polyGroup.GET("/saved", polyHandler.ListSavedGET)
	polyGroup.GET("/markets/:conditionId/price-history", polyHandler.PriceHistoryGET)
	polyAuthGroup := polyGroup.Group("")
	polyAuthGroup.Use(AuthMiddleware(authSvc))
	polyAuthGroup.GET("/saved/:id/chat/history", polyHandler.ChatHistoryGET)
	polyAuthGroup.POST("/save", polyHandler.SavePOST)
	polyAuthGroup.DELETE("/saved/:id", polyHandler.DeleteSavedHandler)

	sessionSender := sessionsend.New(aiSDK, rawSDKClient, sessionsend.Config{
		Timeout:            time.Duration(cfg.SDK.TimeoutSec) * time.Second,
		VerifyTimeout:      time.Duration(cfg.SDK.SessionSendVerifyTimeoutSec) * time.Second,
		VerifyPollInterval: time.Duration(cfg.SDK.SessionSendVerifyPollSec) * time.Second,
		MaxRetries:         cfg.SDK.SessionSendMaxRetries,
	})
	slog.Info(sessionsend.LogPrefix+" module wired",
		slog.Duration("timeout", time.Duration(cfg.SDK.TimeoutSec)*time.Second),
		slog.Duration("verify_timeout", time.Duration(cfg.SDK.SessionSendVerifyTimeoutSec)*time.Second),
		slog.Int("max_retries", cfg.SDK.SessionSendMaxRetries),
	)

	// XStream routes
	xstreamRepo := persistence.NewXStreamRepository(db)
	xstreamFetcher := xstream.NewFetcher(xstreamRepo)

	var dashboardAggregator *dashboard.AggregatorService
	dashboardEnabled := cfg.DashboardSessionID != ""
	if dashboardEnabled {
		slog.Info("[dashboard-push] wiring aggregator",
			slog.String("session_id", cfg.DashboardSessionID),
			slog.Duration("sync_interval", xstream.IntervalFromEnv()),
			slog.Int("push_min_items", cfg.DashboardPushMinItems),
		)
		dashboardAggregator = dashboard.NewAggregatorService(
			xstreamRepo,
			sessionSender,
			cfg.DashboardSessionID,
			cfg.DashboardPushMinItems,
		)
		slog.Info("[dashboard-push] aggregator wired (push after each xstream_sync when new items > threshold)")
	} else {
		slog.Warn("[dashboard-push] aggregator disabled",
			slog.String("reason", "DASHBOARD_SESSION_ID not configured"),
		)
	}

	sched := scheduler.New(xstreamFetcher, dashboardAggregator, xstream.IntervalFromEnv())
	sched.Start(ctx)

	xstreamHandler := NewXStreamHandler(xstreamRepo, xstreamFetcher, sched)
	xstreamGroup := api.Group("/xstream")
	xstreamGroup.Use(AuthMiddleware(authSvc))
	xstreamHandler.RegisterRoutes(xstreamGroup)

	adminXStreamHandler := NewAdminXStreamHandler(xstreamFetcher)
	adminXStreamHandler.RegisterRoutes(adminGroup)

	// Dashboard routes
	dashboardRepo := persistence.NewDashboardRepository(db)
	wordCloudSvc := dashboard.NewWordCloudService(xstreamRepo)
	artifactSyncer := artifact.NewSyncer(resourceRepo, rawSDKClient)

	dashboardHandler := NewDashboardHandler(
		dashboardRepo,
		authSvc,
		dashboardAggregator,
		xstreamFetcher,
		sched,
		wordCloudSvc,
		resourceRepo,
		artifactSyncer,
		cfg.DashboardSessionID,
	)
	dashboardGroup := api.Group("/dashboard")
	dashboardGroup.Use(AuthMiddleware(authSvc))
	dashboardHandler.RegisterRoutes(dashboardGroup)
	slog.Info("[Router] dashboard routes registered")

	studioGroup := api.Group("/studio")
	studioGroup.Use(AuthMiddleware(authSvc))
	ohmypptHandler := NewOhMyPPTHandler(cfg)
	ohmypptHandler.RegisterRoutes(studioGroup)
	slog.Info("[Router] ohmyppt routes registered at /api/studio/ohmyppt")

	ppthtmlHandler := NewPpthtmlHandler(cfg, projectSvc)
	ppthtmlGroup := api.Group("/ppthtml")
	ppthtmlGroup.Use(AuthMiddleware(authSvc))
	ppthtmlHandler.RegisterRoutes(ppthtmlGroup)
	slog.Info("[Router] ppthtml routes registered at /api/ppthtml")

	pptxgenjsHandler := NewPptxgenjsHandler(cfg, projectSvc)
	pptxgenjsGroup := api.Group("/pptxgenjs")
	pptxgenjsGroup.Use(AuthMiddleware(authSvc))
	pptxgenjsHandler.RegisterRoutes(pptxgenjsGroup)
	slog.Info("[Router] pptxgenjs routes registered at /api/pptxgenjs")

	osintDashboardSvc := osintdashboard.NewService(
		cfg,
		projectSvc,
		sessionRepo,
		messageRepo,
		resourceRepo,
		intelligenceSkillSvc,
		roleSvc,
		skillGroupSvc,
		rawSDKClient,
		artifactSyncer,
	)
	editHTMLTimeout := time.Duration(cfg.DeepSeek.PipelineStageTimeoutSec) * time.Second
	osintDashboardHandler := NewOsintDashboardHandler(osintDashboardSvc, editHTMLTimeout)
	osintDashboardGroup := api.Group("/osint-dashboard")
	osintDashboardGroup.Use(AuthMiddleware(authSvc))
	osintDashboardHandler.RegisterRoutes(osintDashboardGroup)
	slog.Info("[Router] osint-dashboard routes registered at /api/osint-dashboard")

	aichatSvc := aichat.NewService(sessionRepo, osintDashboardSvc)
	aichat.NewW6Monitor(aichatSvc, sessionRepo).Start(ctx)
	aichatHandler := NewAichatHandler(aichatSvc)
	aichatGroup := api.Group("/aichat")
	aichatGroup.Use(AuthMiddleware(authSvc))
	aichatHandler.RegisterRoutes(aichatGroup)
	slog.Info("[Router] aichat routes registered at /api/aichat")

	// Export / reflow routes
	llmClient := deepseek.NewClient(deepseek.Config{
		APIKey:       cfg.DeepSeek.APIKey,
		BaseURL:      cfg.DeepSeek.BaseURL,
		Model:        cfg.DeepSeek.Model,
		SkillTimeout: time.Duration(cfg.DeepSeek.TimeoutSec) * time.Second,
	})
	exportSvc := export.NewService(llmClient)
	exportHandler := NewExportHandler(exportSvc)
	exportGroup := api.Group("/export")
	exportGroup.Use(AuthMiddleware(authSvc))
	exportHandler.RegisterRoutes(exportGroup)
	slog.Info("[Router] export routes registered at /api/export")

	// WebSocket 代理端点 - 透传前端到上游 SDK 的连接
	// 注意：不使用 AuthMiddleware，token 从 query 参数获取
	wsHandler := NewWSHandler(rawSDKClient, authSvc, resourceRepo, sessionRepo, artifactSyncer)
	api.GET("/ws/chat", wsHandler.HandleChat)

	// 静态文件服务 - 前端集成
	slog.Info("spa_static_root", slog.String("dir", staticRoot()))
	r.NoRoute(serveSPA)

	return &WireResult{Router: r, Scheduler: sched}, nil
}

var (
	staticRootOnce sync.Once
	staticRootVal  string
)

// staticRoot 解析 SPA 静态目录：优先 STATIC_DIR；否则若可执行文件同目录下存在 static/ 则用之（适配 make 产物 bin/server + bin/static）；否则为当前工作目录下的 static/（适配 go run / pnpm build 到 backend/static）。
func staticRoot() string {
	staticRootOnce.Do(func() {
		if d := strings.TrimSpace(os.Getenv("STATIC_DIR")); d != "" {
			staticRootVal = d
			return
		}
		exe, err := os.Executable()
		if err == nil {
			if sym, err := filepath.EvalSymlinks(exe); err == nil {
				exe = sym
			}
			candidate := filepath.Join(filepath.Dir(exe), "static")
			if st, err := os.Stat(candidate); err == nil && st.IsDir() {
				staticRootVal = candidate
				return
			}
		}
		staticRootVal = "static"
	})
	return staticRootVal
}

// serveSPA 为 SPA 应用提供前端文件服务
func serveSPA(c *gin.Context) {
	root := staticRoot()
	rel := strings.TrimPrefix(c.Request.URL.Path, "/")
	candidate := filepath.Join(root, rel)
	if relPath, err := filepath.Rel(root, candidate); err != nil || strings.HasPrefix(relPath, "..") {
		c.AbortWithStatus(http.StatusForbidden)
		return
	}
	if fi, err := os.Stat(candidate); err == nil && !fi.IsDir() {
		c.File(candidate)
		return
	}
	c.File(filepath.Join(root, "index.html"))
}
