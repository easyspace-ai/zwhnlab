package http

import (
	"log"
	"net/http"
	"strings"
	"time"

	"github.com/easyspace-ai/ylmnote/internal/application/auth"
	"github.com/easyspace-ai/ylmnote/internal/domain/user"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

const currentUserKey = "currentUser"

func collectAuthTokenCandidates(c *gin.Context) []string {
	seen := make(map[string]struct{})
	var out []string
	add := func(raw string) {
		t := strings.TrimSpace(raw)
		if t == "" {
			return
		}
		if _, ok := seen[t]; ok {
			return
		}
		seen[t] = struct{}{}
		out = append(out, t)
	}

	if authHeader := c.GetHeader("Authorization"); authHeader != "" {
		parts := strings.SplitN(authHeader, " ", 2)
		if len(parts) == 2 && strings.EqualFold(parts[0], "Bearer") {
			add(parts[1])
		}
	}
	add(c.Query("token"))
	if cookie, err := c.Cookie(authCookieName); err == nil {
		add(cookie)
	}
	if cookie, err := c.Cookie(legacyAuthCookieName); err == nil {
		add(cookie)
	}
	return out
}

func authenticateBearerToken(authSvc *auth.Service, token string) (*user.User, error) {
	return authenticateBearerTokenWithLeeway(authSvc, token, 0)
}

func authenticateBearerTokenWithLeeway(authSvc *auth.Service, token string, leeway time.Duration) (*user.User, error) {
	var opts []jwt.ParserOption
	if leeway > 0 {
		opts = append(opts, jwt.WithLeeway(leeway))
	}
	parsed, err := jwt.Parse(token, func(token *jwt.Token) (interface{}, error) {
		if token.Method.Alg() != jwt.SigningMethodHS256.Alg() {
			return nil, jwt.ErrTokenSignatureInvalid
		}
		return []byte(authSvc.Secret()), nil
	}, opts...)
	if err != nil || !parsed.Valid {
		return nil, err
	}
	claims, ok := parsed.Claims.(jwt.MapClaims)
	if !ok {
		return nil, jwt.ErrTokenInvalidClaims
	}
	sub, _ := claims["sub"].(string)
	if sub == "" {
		return nil, jwt.ErrTokenInvalidClaims
	}
	return authSvc.GetUserByID(sub)
}

func authMiddlewareWithLeeway(authSvc *auth.Service, leeway time.Duration) gin.HandlerFunc {
	return func(c *gin.Context) {
		candidates := collectAuthTokenCandidates(c)
		if len(candidates) == 0 {
			log.Printf("[auth] missing credentials: %s %s", c.Request.Method, c.Request.URL.Path)
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"detail": "Missing Authorization header"})
			return
		}
		var lastErr error
		for _, token := range candidates {
			u, err := authenticateBearerTokenWithLeeway(authSvc, token, leeway)
			if err == nil {
				c.Set(currentUserKey, u)
				c.Next()
				return
			}
			lastErr = err
		}
		log.Printf("[auth] all token candidates failed: %s %s err=%v", c.Request.Method, c.Request.URL.Path, lastErr)
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"detail": "Could not validate credentials"})
	}
}

// AuthMiddleware 从 Bearer / query / Cookie 解析用户并注入 context。
// 若 Authorization 中 token 已过期，会继续尝试 Cookie 中的有效 token。
func AuthMiddleware(authSvc *auth.Service) gin.HandlerFunc {
	return authMiddlewareWithLeeway(authSvc, 0)
}

// RenewAuthMiddleware 用于 /auth/renew：允许在宽限期内使用刚过期的 token 静默续期。
func RenewAuthMiddleware(authSvc *auth.Service) gin.HandlerFunc {
	return authMiddlewareWithLeeway(authSvc, 30*24*time.Hour)
}

// GetCurrentUser 从 context 取出当前用户（仅中间件之后使用）
func GetCurrentUser(c *gin.Context) (*user.User, bool) {
	v, ok := c.Get(currentUserKey)
	if !ok {
		return nil, false
	}
	u, ok := v.(*user.User)
	return u, ok
}

// AdminMiddleware 仅允许超级管理员访问
func AdminMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		u, ok := GetCurrentUser(c)
		if !ok {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"detail": "not authenticated"})
			return
		}
		if !u.IsAdmin() {
			c.AbortWithStatusJSON(http.StatusForbidden, gin.H{"detail": "admin access required"})
			return
		}
		c.Next()
	}
}
