package config

import (
	"log"
	"os"
	"path/filepath"
	"strconv"
	"strings"
	"time"

	"github.com/joho/godotenv"
)

type Config struct {
	AppName              string
	AppEnv               string
	HTTPPort             string
	DatabaseURL          string
	JWTSecret            string
	// AccessTokenExpireMin 「记住我」登录的 access token 有效期（分钟），默认一年。
	AccessTokenExpireMin int
	// AccessTokenSessionExpireMin 未勾选「记住我」时的 access token 有效期（分钟），默认 24 小时。
	AccessTokenSessionExpireMin int
	LogFilePath          string
	LogToStdout          bool
	GORMLogSQL           bool
	// RegistrationEnabled 是否允许用户自助注册（默认 false）
	RegistrationEnabled bool

	SDK AISDKConfig

	// CORSAllowedOrigins 逗号分隔；非 production 且为空时允许任意 Origin（开发便利）。
	CORSAllowedOrigins string
	// RateLimitAPIPerMinute 全站 /api（除 /api/auth 外）每 IP 每分钟请求上限。
	RateLimitAPIPerMinute int
	// RateLimitAuthPerMinute /api/auth 每 IP 每分钟上限（防爆破）。
	RateLimitAuthPerMinute int
	// ChatCreditCost 每轮成功对话结束后扣减的积分；0 表示关闭扣费。
	ChatCreditCost int

	// ProxyTarget HTTP 代理地址，用于 Polymarket 等外部 API 访问。
	ProxyTarget string

	// DashboardSessionID W6 直连会话 ID（聚合推送 + Dashboard 产物列表）
	DashboardSessionID string

	// DashboardAggregateInterval 已合并进 XStream 周期；保留字段兼容旧配置
	DashboardAggregateInterval time.Duration
	// DashboardPushMinItems 定时推送：未推送新条目数须大于此值才推 W6（默认 5 → 至少 6 条）
	DashboardPushMinItems int

	// SkillsDefaultsDir 系统内置情报技能 JSON 目录（见 data/skills/defaults）
	SkillsDefaultsDir string
	// SkillsCustomDir 超级管理员覆盖/新增技能 JSON（见 data/skills/custom，合并时优先于 defaults）
	SkillsCustomDir string
	// OsintReportSkillDir osint-report-skill 目录（MD 轻度排版 + 纵向 HTML 参考）
	OsintReportSkillDir string

	// DeepSeek 技能编写助手（OpenAI 兼容 /v1/chat/completions）
	DeepSeek DeepSeekConfig

	// OhMyPPTServiceURL headless oh-my-ppt Node 服务地址（如 http://127.0.0.1:6130）
	OhMyPPTServiceURL string
}

type DeepSeekConfig struct {
	APIKey  string
	BaseURL string
	Model   string
	// TimeoutSec 技能编写助手等非流式调用 HTTP 超时（秒），默认 120。
	TimeoutSec int
	// PipelineStageTimeoutSec Studio 流水线单阶段 LLM 超时（秒），默认 300。
	PipelineStageTimeoutSec int
	// PipelineTotalTimeoutSec Studio 流水线整次 run/regenerate SSE 超时（秒），默认 900。
	PipelineTotalTimeoutSec int
}

type AISDKConfig struct {
	BaseURL       string
	ServiceAPIKey string
	UploadPath    string
	TimeoutSec    int
	WSWriteTimeoutSec     int
	WSHandshakeTimeoutSec int
	WSPushAckTimeoutSec   int
	SessionSendVerifyTimeoutSec int
	SessionSendVerifyPollSec    int
	SessionSendMaxRetries       int
	WSDialTimeoutSec      int
	RetryMax      int
	LegacyMode    bool
	// Debug 为 true 时打印 SDK / 上游 HTTP 详细日志（环境变量 AI_SDK_DEBUG=true）
	Debug bool
}

// MonorepoRoot returns repository root from cwd, or empty if unknown.
func MonorepoRoot() string {
	wd, err := os.Getwd()
	if err != nil {
		return ""
	}
	return monorepoRoot(wd)
}

// monorepoRoot 从 start 目录向上查找含有 backend/go.mod 的目录（即仓库根）。
func monorepoRoot(start string) string {
	d := start
	for range 16 {
		if _, err := os.Stat(filepath.Join(d, "backend", "go.mod")); err == nil {
			return d
		}
		parent := filepath.Dir(d)
		if parent == d {
			break
		}
		d = parent
	}
	return ""
}

func loadDotEnv() {
	if p := strings.TrimSpace(os.Getenv("DOTENV_PATH")); p != "" {
		if err := godotenv.Load(p); err != nil {
			log.Printf("warning: DOTENV_PATH load failed: %v", err)
		}
		return
	}

	if wd, err := os.Getwd(); err == nil {
		if root := monorepoRoot(wd); root != "" {
			envFile := filepath.Join(root, ".env")
			if err := godotenv.Load(envFile); err == nil {
				return
			}
		}
	}
	if exe, err := os.Executable(); err == nil {
		if sym, err := filepath.EvalSymlinks(exe); err == nil {
			exe = sym
		}
		if root := monorepoRoot(filepath.Dir(exe)); root != "" {
			envFile := filepath.Join(root, ".env")
			if err := godotenv.Load(envFile); err == nil {
				return
			}
		}
	}
	if err := godotenv.Load(".env"); err != nil {
		log.Printf("warning: .env not found (repo root .env or DOTENV_PATH): %v", err)
	}
}

// Load 从 .env 加载配置，所有配置以 .env 为准，无代码内默认值（除端口为空时用 8080 以便启动）
func Load() *Config {
	loadDotEnv()
	cfg := &Config{
		AppName:              getEnv("APP_NAME"),
		AppEnv:               getEnv("APP_ENV"),
		HTTPPort:             getEnv("HTTP_PORT"),
		DatabaseURL:          getEnv("DATABASE_URL"),
		JWTSecret:            getEnv("JWT_SECRET"),
		AccessTokenExpireMin:        getEnvInt("ACCESS_TOKEN_EXPIRE_MINUTES"),
		AccessTokenSessionExpireMin: getEnvInt("ACCESS_TOKEN_SESSION_EXPIRE_MINUTES"),
		LogFilePath:          strings.TrimSpace(getEnv("LOG_FILE_PATH")),
		LogToStdout:          getEnvBoolDefault("LOG_TO_STDOUT", true),
		GORMLogSQL:           getEnvBool("GORM_LOG_SQL"),
		SDK: AISDKConfig{
			BaseURL:       getEnv("AI_SDK_BASE_URL"),
			ServiceAPIKey: firstNonEmpty(getEnv("AI_SDK_SERVICE_API_KEY"), getEnv("AI_SDK_AUTH_HEADER_VAL")),
			UploadPath:    getEnv("AI_SDK_UPLOAD_PATH"),
			TimeoutSec:    getEnvInt("AI_SDK_TIMEOUT_SEC"),
			WSWriteTimeoutSec:     getEnvInt("AI_SDK_WS_WRITE_TIMEOUT_SEC"),
			WSHandshakeTimeoutSec: getEnvInt("AI_SDK_WS_HANDSHAKE_TIMEOUT_SEC"),
			WSPushAckTimeoutSec:         getEnvInt("AI_SDK_PUSH_ACK_TIMEOUT_SEC"),
			SessionSendVerifyTimeoutSec: getEnvInt("SESSION_SEND_VERIFY_TIMEOUT_SEC"),
			SessionSendVerifyPollSec:    getEnvInt("SESSION_SEND_VERIFY_POLL_SEC"),
			SessionSendMaxRetries:       getEnvInt("SESSION_SEND_MAX_RETRIES"),
			WSDialTimeoutSec:            getEnvInt("AI_SDK_WS_DIAL_TIMEOUT_SEC"),
			RetryMax:      getEnvInt("AI_SDK_RETRY_MAX"),
			LegacyMode:    getEnvBool("AI_SDK_LEGACY_MODE"),
			Debug:         getEnvBool("AI_SDK_DEBUG"),
		},
		CORSAllowedOrigins:     strings.TrimSpace(getEnv("CORS_ALLOWED_ORIGINS")),
		RateLimitAPIPerMinute:  getEnvIntDefault("RATE_LIMIT_API_PER_MINUTE", 180),
		RateLimitAuthPerMinute: getEnvIntDefault("RATE_LIMIT_AUTH_PER_MINUTE", 30),
		RegistrationEnabled:    getEnvBoolDefault("REGISTRATION_ENABLED", false),
		ChatCreditCost:         getEnvIntDefault("CHAT_CREDIT_COST", 1),
		ProxyTarget:            strings.TrimSpace(getEnv("PROXY_TARGET")),
		DashboardSessionID: strings.TrimSpace(getEnv("DASHBOARD_SESSION_ID")),
		DashboardAggregateInterval: parseDurationEnv("DASHBOARD_AGGREGATE_INTERVAL", 10*time.Minute),
		DashboardPushMinItems:      getEnvIntDefault("DASHBOARD_PUSH_MIN_ITEMS", 5),
		SkillsDefaultsDir:          ResolveSkillsDefaultsDir(getEnv("SKILLS_DEFAULTS_DIR")),
		SkillsCustomDir:            ResolveSkillsCustomDir(getEnv("SKILLS_CUSTOM_DIR")),
		OsintReportSkillDir:        strings.TrimSpace(getEnv("OSINT_REPORT_SKILL_DIR")),
		DeepSeek: DeepSeekConfig{
			APIKey:                  getEnv("DEEPSEEK_API_KEY"),
			BaseURL:                 firstNonEmpty(getEnv("DEEPSEEK_BASE_URL"), "https://api.deepseek.com"),
			Model:                   firstNonEmpty(getEnv("DEEPSEEK_MODEL"), "deepseek-chat"),
			TimeoutSec:              getEnvIntDefault("DEEPSEEK_TIMEOUT_SEC", 120),
			PipelineStageTimeoutSec: getEnvIntDefault("DEEPSEEK_PIPELINE_STAGE_TIMEOUT_SEC", 300),
			PipelineTotalTimeoutSec: getEnvIntDefault("DEEPSEEK_PIPELINE_TOTAL_TIMEOUT_SEC", 900),
		},
		OhMyPPTServiceURL: strings.TrimSpace(getEnv("OHMYPPT_SERVICE_URL")),
	}
	if cfg.DatabaseURL == "" {
		log.Fatal("DATABASE_URL is required (set in .env)")
	}
	if cfg.JWTSecret == "" {
		log.Fatal("JWT_SECRET is required (set in .env)")
	}
	if cfg.HTTPPort == "" {
		cfg.HTTPPort = "8080"
	}
	if cfg.AppName == "" {
		cfg.AppName = "YouMind Backend v2"
	}
	if cfg.AppEnv == "" {
		cfg.AppEnv = "development"
	}
	if cfg.LogFilePath == "" && strings.EqualFold(cfg.AppEnv, "development") {
		cfg.LogFilePath = "./logs/backend.log"
	}
	if cfg.AccessTokenExpireMin == 0 {
		cfg.AccessTokenExpireMin = 525600 // 365 days
	}
	if cfg.AccessTokenSessionExpireMin == 0 {
		// 与「记住我」一致，避免未勾选记住我时 24h 后被动登出
		cfg.AccessTokenSessionExpireMin = cfg.AccessTokenExpireMin
	}

	if cfg.SDK.UploadPath == "" {
		cfg.SDK.UploadPath = "/api/upload"
	}
	if cfg.SDK.TimeoutSec <= 0 {
		cfg.SDK.TimeoutSec = 120
	}
	if cfg.SDK.WSWriteTimeoutSec <= 0 {
		cfg.SDK.WSWriteTimeoutSec = 8
	}
	if cfg.SDK.WSHandshakeTimeoutSec <= 0 {
		cfg.SDK.WSHandshakeTimeoutSec = 15
	}
	if cfg.SDK.WSPushAckTimeoutSec <= 0 {
		cfg.SDK.WSPushAckTimeoutSec = 30
	}
	if cfg.SDK.SessionSendVerifyTimeoutSec <= 0 {
		cfg.SDK.SessionSendVerifyTimeoutSec = 30
	}
	if cfg.SDK.SessionSendVerifyPollSec <= 0 {
		cfg.SDK.SessionSendVerifyPollSec = 2
	}
	if cfg.SDK.SessionSendMaxRetries <= 0 {
		cfg.SDK.SessionSendMaxRetries = 3
	}
	if cfg.SDK.WSDialTimeoutSec <= 0 {
		cfg.SDK.WSDialTimeoutSec = 15
	}
	if cfg.SDK.RetryMax <= 0 {
		cfg.SDK.RetryMax = 2
	}

	return cfg
}

func getEnv(key string) string {
	return os.Getenv(key)
}

func getEnvInt(key string) int {
	v := os.Getenv(key)
	if v == "" {
		return 0
	}
	n, err := strconv.Atoi(v)
	if err != nil {
		return 0
	}
	return n
}

func getEnvIntDefault(key string, def int) int {
	v := strings.TrimSpace(os.Getenv(key))
	if v == "" {
		return def
	}
	n, err := strconv.Atoi(v)
	if err != nil {
		return def
	}
	return n
}

func getEnvBool(key string) bool {
	v := strings.TrimSpace(strings.ToLower(os.Getenv(key)))
	return v == "1" || v == "true" || v == "yes" || v == "on"
}

func getEnvBoolDefault(key string, def bool) bool {
	v := strings.TrimSpace(strings.ToLower(os.Getenv(key)))
	if v == "" {
		return def
	}
	return v == "1" || v == "true" || v == "yes" || v == "on"
}

func firstNonEmpty(values ...string) string {
	for _, v := range values {
		if strings.TrimSpace(v) != "" {
			return v
		}
	}
	return ""
}

func parseDurationEnv(key string, def time.Duration) time.Duration {
	v := strings.TrimSpace(os.Getenv(key))
	if v == "" {
		return def
	}
	if d, err := time.ParseDuration(v); err == nil {
		return d
	}
	if minutes, err := strconv.Atoi(v); err == nil && minutes > 0 {
		return time.Duration(minutes) * time.Minute
	}
	return def
}
