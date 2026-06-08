package http

import (
	"log"
	"net/http"
	"strings"

	"github.com/easyspace-ai/ylmnote/internal/application/auth"
	"github.com/easyspace-ai/ylmnote/internal/application/role"
	usersvc "github.com/easyspace-ai/ylmnote/internal/application/user"
	"github.com/easyspace-ai/ylmnote/internal/config"
	"github.com/easyspace-ai/ylmnote/internal/domain/user"
	"github.com/gin-gonic/gin"
)

const authCookieName = "osint_auth_token"
const legacyAuthCookieName = "gusheng_auth_token"

func setAuthCookie(c *gin.Context, token string, maxAgeSec int) {
	c.SetSameSite(http.SameSiteLaxMode)
	if maxAgeSec <= 0 {
		maxAgeSec = 86400 * 365
	}
	c.SetCookie(authCookieName, token, maxAgeSec, "/", "", false, true)
	clearAuthCookieName(c, legacyAuthCookieName)
}

func clearAuthCookieName(c *gin.Context, name string) {
	c.SetCookie(name, "", -1, "/", "", false, true)
}

func clearAuthCookie(c *gin.Context) {
	clearAuthCookieName(c, authCookieName)
	clearAuthCookieName(c, legacyAuthCookieName)
}

// AuthHandler 认证相关 HTTP 处理
type AuthHandler struct {
	svc      *auth.Service
	cfg      *config.Config
	roleSvc  *role.Service
	settings auth.SettingsReader
	userSvc  *usersvc.AdminService
}

func NewAuthHandler(svc *auth.Service, cfg *config.Config, roleSvc *role.Service, settings auth.SettingsReader, userSvc *usersvc.AdminService) *AuthHandler {
	return &AuthHandler{svc: svc, cfg: cfg, roleSvc: roleSvc, settings: settings, userSvc: userSvc}
}

func (h *AuthHandler) RegisterRoutes(r *gin.RouterGroup) {
	r.GET("/config", h.configGET)
	r.POST("/register", h.register)
	r.POST("/login", h.login)
	r.POST("/logout", h.logout)
	authGroup := r.Group("")
	authGroup.Use(AuthMiddleware(h.svc))
	authGroup.GET("/me", h.me)
	authGroup.PATCH("/me", h.updateMe)
	authGroup.POST("/change-password", h.changePassword)
	authGroup.POST("/sync-cookie", h.syncCookie)
	// renew 单独挂宽限中间件，避免临近/刚过期的 token 无法续期
	r.POST("/renew", RenewAuthMiddleware(h.svc), h.renew)
}

type registerRequest struct {
	Username string `json:"username" binding:"required"`
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type loginRequest struct {
	Username   string `json:"username" binding:"required"`
	Password   string `json:"password" binding:"required"`
	RememberMe *bool  `json:"remember_me"`
}

type userResponse struct {
	ID               string   `json:"id"`
	Username         string   `json:"username"`
	Email            string   `json:"email"`
	SubscriptionPlan string   `json:"subscription_plan"`
	CreditsBalance   int      `json:"credits_balance"`
	CreditsUsed      int      `json:"credits_used"`
	Role             string   `json:"role"`
	Disabled         bool     `json:"disabled"`
	Permissions      []string `json:"permissions"`
	CreatedAt        string   `json:"created_at"`
}

type updateMeRequest struct {
	Username *string `json:"username,omitempty"`
	Email    *string `json:"email,omitempty"`
}

func (h *AuthHandler) permissionsFor(u *user.User) []string {
	if u.IsAdmin() {
		return []string{
			"menu_admin", "menu_polymarket", "menu_xstream", "menu_dashboard", "menu_ai_session", "menu_ppt", "menu_aichat", "menu_osint_dashboard",
			"user_manage", "role_manage", "skill_group_manage",
		}
	}
	if h.roleSvc == nil {
		return nil
	}
	perms, err := h.roleSvc.PermissionsForUser(u.ID)
	if err != nil {
		return nil
	}
	return perms
}

func (h *AuthHandler) toUserResponse(u *user.User) userResponse {
	return userResponse{
		ID:               u.ID,
		Username:         u.Username,
		Email:            u.Email,
		SubscriptionPlan: u.SubscriptionPlan,
		CreditsBalance:   u.CreditsBalance,
		CreditsUsed:      u.CreditsUsed,
		Role:             u.Role,
		Disabled:         u.Disabled,
		Permissions:      h.permissionsFor(u),
		CreatedAt:        u.CreatedAt.Format("2006-01-02T15:04:05.000Z"),
	}
}

func (h *AuthHandler) configGET(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"registration_enabled": h.svc.IsRegistrationEnabled(),
	})
}

func (h *AuthHandler) register(c *gin.Context) {
	if !h.svc.IsRegistrationEnabled() {
		c.JSON(http.StatusForbidden, gin.H{"detail": "registration is disabled"})
		return
	}
	var req registerRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"detail": "invalid request body"})
		return
	}
	result, err := h.svc.Register(auth.RegisterInput{
		Username: req.Username,
		Email:    req.Email,
		Password: req.Password,
	})
	if err != nil {
		if err == auth.ErrUsernameOrEmailTaken {
			c.JSON(http.StatusBadRequest, gin.H{"detail": "Username or email already registered"})
			return
		}
		log.Printf("register: %v", err)
		detail := "failed to create user"
		if h.cfg.AppEnv == "development" {
			detail = "failed to create user: " + err.Error()
		}
		c.JSON(http.StatusInternalServerError, gin.H{"detail": detail})
		return
	}
	c.JSON(http.StatusOK, userResponse{
		ID:               result.ID,
		Username:         result.Username,
		Email:            result.Email,
		SubscriptionPlan: result.SubscriptionPlan,
		CreditsBalance:   result.CreditsBalance,
		CreditsUsed:      result.CreditsUsed,
		CreatedAt:        result.CreatedAt.Format("2006-01-02T15:04:05.000Z"),
	})
}

func (h *AuthHandler) login(c *gin.Context) {
	var req loginRequest
	// 先按 Content-Type 解析，避免 ShouldBindJSON 消费 body 导致后续 PostForm 读不到
	if strings.Contains(c.GetHeader("Content-Type"), "application/json") {
		_ = c.ShouldBindJSON(&req)
	}
	if req.Username == "" {
		req.Username = c.PostForm("username")
	}
	if req.Password == "" {
		req.Password = c.PostForm("password")
	}
	if req.Username == "" || req.Password == "" {
		c.JSON(http.StatusBadRequest, gin.H{"detail": "username and password required"})
		return
	}
	rememberMe := true
	if req.RememberMe != nil {
		rememberMe = *req.RememberMe
	}
	result, err := h.svc.Login(auth.LoginInput{
		Username:   req.Username,
		Password:   req.Password,
		RememberMe: rememberMe,
	})
	if err != nil {
		if err == auth.ErrInvalidCredentials {
			c.JSON(http.StatusUnauthorized, gin.H{"detail": "Incorrect username or password"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"detail": "login failed"})
		return
	}
	// Cookie 须在 JSON 响应之前写入，否则浏览器收不到（River UI /jobs 依赖此 Cookie）
	setAuthCookie(c, result.AccessToken, result.ExpiresIn)
	c.JSON(http.StatusOK, gin.H{
		"access_token": result.AccessToken,
		"token_type":   result.TokenType,
		"expires_in":   result.ExpiresIn,
	})
}

// renew 在 token 仍有效时签发新的长期 access token（静默续期，避免临近 exp 被动登出）。
func (h *AuthHandler) renew(c *gin.Context) {
	u, ok := GetCurrentUser(c)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"detail": "Not authenticated"})
		return
	}
	result, err := h.svc.RenewAccessToken(u.ID)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"detail": "Could not renew session"})
		return
	}
	setAuthCookie(c, result.AccessToken, result.ExpiresIn)
	c.JSON(http.StatusOK, gin.H{
		"access_token": result.AccessToken,
		"token_type":   result.TokenType,
		"expires_in":   result.ExpiresIn,
	})
}

// syncCookie 将当前 Bearer token 同步为 HttpOnly Cookie，供 River UI（/jobs）等同源页面使用。
func (h *AuthHandler) syncCookie(c *gin.Context) {
	if _, ok := GetCurrentUser(c); !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"detail": "Not authenticated"})
		return
	}
	authHeader := c.GetHeader("Authorization")
	token := ""
	if parts := strings.SplitN(authHeader, " ", 2); len(parts) == 2 && strings.EqualFold(parts[0], "Bearer") {
		token = parts[1]
	}
	if token == "" {
		token = c.Query("token")
	}
	if token == "" {
		c.JSON(http.StatusBadRequest, gin.H{"detail": "missing token"})
		return
	}
	setAuthCookie(c, token, 86400*365)
	c.JSON(http.StatusOK, gin.H{"status": "ok"})
}

// logout 清除会话 Cookie（River UI /jobs 等），无需有效 token 也可调用。
func (h *AuthHandler) logout(c *gin.Context) {
	clearAuthCookie(c)
	c.JSON(http.StatusOK, gin.H{"status": "logged_out"})
}

func (h *AuthHandler) me(c *gin.Context) {
	u, ok := GetCurrentUser(c)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"detail": "Not authenticated"})
		return
	}
	c.JSON(http.StatusOK, h.toUserResponse(u))
}

func (h *AuthHandler) updateMe(c *gin.Context) {
	u, ok := GetCurrentUser(c)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"detail": "Not authenticated"})
		return
	}
	var req updateMeRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"detail": "invalid request body"})
		return
	}
	updated, err := h.svc.UpdateProfile(u.ID, req.Username, req.Email)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"detail": "failed to update user"})
		return
	}
	c.JSON(http.StatusOK, h.toUserResponse(updated))
}

type changePasswordRequest struct {
	OldPassword string `json:"old_password" binding:"required"`
	NewPassword string `json:"new_password" binding:"required,min=6"`
}

func (h *AuthHandler) changePassword(c *gin.Context) {
	u, ok := GetCurrentUser(c)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"detail": "not authenticated"})
		return
	}
	if h.userSvc == nil {
		c.JSON(http.StatusInternalServerError, gin.H{"detail": "password change unavailable"})
		return
	}
	var req changePasswordRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"detail": "invalid request"})
		return
	}
	if err := h.userSvc.ChangeOwnPassword(usersvc.ChangePasswordInput{
		UserID:      u.ID,
		OldPassword: req.OldPassword,
		NewPassword: req.NewPassword,
	}); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"detail": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"status": "ok"})
}
