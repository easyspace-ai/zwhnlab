package http

import (
	"log"
	"net/http"
	"strings"

	"github.com/easyspace-ai/ylmnote/internal/application/auth"
	"github.com/easyspace-ai/ylmnote/internal/domain/user"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

const currentUserKey = "currentUser"

// AuthMiddleware 从 Bearer token 解析用户并注入 context
// 支持从 Authorization header 或 URL query param "token" 获取 token
func AuthMiddleware(authSvc *auth.Service) gin.HandlerFunc {
	return func(c *gin.Context) {
		// 优先从 Authorization header 获取 token
		authHeader := c.GetHeader("Authorization")
		token := ""
		if authHeader != "" {
			parts := strings.SplitN(authHeader, " ", 2)
			if len(parts) == 2 && strings.EqualFold(parts[0], "Bearer") {
				token = parts[1]
			}
		}
		// 如果 header 中没有 token，尝试从 query param 获取
		if token == "" {
			token = c.Query("token")
		}
		// Cookie（River UI 浏览器直接访问 /jobs）
		if token == "" {
			if cookie, err := c.Cookie(authCookieName); err == nil && cookie != "" {
				token = cookie
			}
		}
		if token == "" {
			if cookie, err := c.Cookie(legacyAuthCookieName); err == nil && cookie != "" {
				token = cookie
			}
		}
		if token == "" {
			log.Printf("[auth] missing Authorization header or token query param: %s %s", c.Request.Method, c.Request.URL.Path)
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"detail": "Missing Authorization header"})
			return
		}
		parsed, err := jwt.Parse(token, func(token *jwt.Token) (interface{}, error) {
			if token.Method.Alg() != jwt.SigningMethodHS256.Alg() {
				return nil, jwt.ErrTokenSignatureInvalid
			}
			return []byte(authSvc.Secret()), nil
		})
		if err != nil || !parsed.Valid {
			log.Printf("[auth] token parse/validate failed: %s %s err=%v", c.Request.Method, c.Request.URL.Path, err)
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"detail": "Could not validate credentials"})
			return
		}
		claims, ok := parsed.Claims.(jwt.MapClaims)
		if !ok {
			log.Printf("[auth] claims cast failed: %s %s", c.Request.Method, c.Request.URL.Path)
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"detail": "Could not validate credentials"})
			return
		}
		sub, _ := claims["sub"].(string)
		if sub == "" {
			log.Printf("[auth] token missing sub claim: %s %s", c.Request.Method, c.Request.URL.Path)
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"detail": "Could not validate credentials"})
			return
		}
		u, err := authSvc.GetUserByID(sub)
		if err != nil {
			log.Printf("[auth] user lookup failed for sub=%s: %s %s err=%v", sub, c.Request.Method, c.Request.URL.Path, err)
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"detail": "Could not validate credentials"})
			return
		}
		c.Set(currentUserKey, u)
		c.Next()
	}
}

// JobsAuthBridge 将 URL 中的 ?token= 转为 Cookie 后重定向，便于 River UI 后续 API 请求带 Cookie。
func JobsAuthBridge(authSvc *auth.Service) gin.HandlerFunc {
	return func(c *gin.Context) {
		token := strings.TrimSpace(c.Query("token"))
		if token == "" {
			c.Next()
			return
		}
		if cookie, err := c.Cookie(authCookieName); err == nil && cookie != "" {
			c.Redirect(http.StatusFound, "/jobs")
			c.Abort()
			return
		}
		if cookie, err := c.Cookie(legacyAuthCookieName); err == nil && cookie != "" {
			c.Redirect(http.StatusFound, "/jobs")
			c.Abort()
			return
		}
		parsed, err := jwt.Parse(token, func(token *jwt.Token) (interface{}, error) {
			if token.Method.Alg() != jwt.SigningMethodHS256.Alg() {
				return nil, jwt.ErrTokenSignatureInvalid
			}
			return []byte(authSvc.Secret()), nil
		})
		if err != nil || !parsed.Valid {
			c.Next()
			return
		}
		claims, ok := parsed.Claims.(jwt.MapClaims)
		if !ok {
			c.Next()
			return
		}
		sub, _ := claims["sub"].(string)
		if sub == "" {
			c.Next()
			return
		}
		if _, err := authSvc.GetUserByID(sub); err != nil {
			c.Next()
			return
		}
		setAuthCookie(c, token, 86400*365)
		c.Redirect(http.StatusFound, "/jobs")
		c.Abort()
	}
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
