package http

import (
	"net/http"
	"strconv"

	"github.com/easyspace-ai/ylmnote/internal/application/auth"
	usersvc "github.com/easyspace-ai/ylmnote/internal/application/user"
	"github.com/easyspace-ai/ylmnote/internal/application/role"
	skillgroupsvc "github.com/easyspace-ai/ylmnote/internal/application/skillgroup"
	"github.com/easyspace-ai/ylmnote/internal/domain/user"
	"github.com/easyspace-ai/ylmnote/internal/infrastructure/persistence"
	"github.com/gin-gonic/gin"
)

// AdminHandler 管理后台 HTTP 处理
type AdminHandler struct {
	userSvc       *usersvc.AdminService
	roleSvc       *role.Service
	skillGroupSvc *skillgroupsvc.Service
	userRoleRepo  *persistence.UserRoleRepository
	settings      auth.SettingsReader
}

func NewAdminHandler(
	userSvc *usersvc.AdminService,
	roleSvc *role.Service,
	skillGroupSvc *skillgroupsvc.Service,
	userRoleRepo *persistence.UserRoleRepository,
	settings auth.SettingsReader,
) *AdminHandler {
	return &AdminHandler{
		userSvc:       userSvc,
		roleSvc:       roleSvc,
		skillGroupSvc: skillGroupSvc,
		userRoleRepo:  userRoleRepo,
		settings:      settings,
	}
}

func (h *AdminHandler) RegisterRoutes(r *gin.RouterGroup) {
	// 用户管理
	r.GET("/users", h.listUsers)
	r.POST("/users", h.createUser)
	r.PATCH("/users/:id", h.updateUser)
	r.PATCH("/users/:id/disable", h.toggleDisable)
	r.POST("/users/:id/reset-password", h.resetPassword)
	r.DELETE("/users/:id", h.deleteUser)

	// 角色/权限管理
	r.GET("/roles", h.listRoles)
	r.POST("/roles", h.createRole)
	r.GET("/roles/:id", h.getRole)
	r.PUT("/roles/:id", h.updateRole)
	r.DELETE("/roles/:id", h.deleteRole)

	// 技能组管理
	r.GET("/skill-groups", h.listSkillGroups)
	r.POST("/skill-groups", h.createSkillGroup)
	r.GET("/skill-groups/:id", h.getSkillGroup)
	r.PUT("/skill-groups/:id", h.updateSkillGroup)
	r.DELETE("/skill-groups/:id", h.deleteSkillGroup)

	// 系统设置
	r.GET("/settings", h.getSettings)
	r.PATCH("/settings", h.patchSettings)
}

// ========== 用户管理 ==========

type adminUserResponse struct {
	ID                string   `json:"id"`
	Username          string   `json:"username"`
	Email             string   `json:"email"`
	Role              string   `json:"role"`
	Disabled          bool     `json:"disabled"`
	SubscriptionPlan  string   `json:"subscription_plan"`
	CreditsBalance    int      `json:"credits_balance"`
	CreditsUsed       int      `json:"credits_used"`
	PermissionRoleIDs []string `json:"permission_role_ids"`
	CreatedAt         string   `json:"created_at"`
}

func toAdminUserResponse(u *user.User) adminUserResponse {
	return adminUserResponse{
		ID:               u.ID,
		Username:         u.Username,
		Email:            u.Email,
		Role:             u.Role,
		Disabled:         u.Disabled,
		SubscriptionPlan: u.SubscriptionPlan,
		CreditsBalance:   u.CreditsBalance,
		CreditsUsed:      u.CreditsUsed,
		CreatedAt:        u.CreatedAt.Format("2006-01-02T15:04:05.000Z"),
	}
}

func (h *AdminHandler) toAdminUserResponseWithRoles(u *user.User) adminUserResponse {
	res := toAdminUserResponse(u)
	if h.userRoleRepo != nil {
		if ids, err := h.userRoleRepo.ListRoleIDsByUser(u.ID); err == nil {
			res.PermissionRoleIDs = ids
		}
	}
	if res.PermissionRoleIDs == nil {
		res.PermissionRoleIDs = []string{}
	}
	return res
}

type createUserRequest struct {
	Username      string   `json:"username" binding:"required"`
	Email         string   `json:"email" binding:"required"`
	Password      string   `json:"password"`
	Role          string   `json:"role"`
	PermissionRoleIDs []string `json:"permission_role_ids"`
}

func (h *AdminHandler) listUsers(c *gin.Context) {
	users, err := h.userSvc.ListUsers()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"detail": "failed to list users"})
		return
	}
	res := make([]adminUserResponse, len(users))
	for i, u := range users {
		res[i] = h.toAdminUserResponseWithRoles(u)
	}
	c.JSON(http.StatusOK, res)
}

func (h *AdminHandler) createUser(c *gin.Context) {
	var req createUserRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"detail": "invalid request"})
		return
	}
	u, plainPassword, err := h.userSvc.CreateUser(usersvc.CreateUserInput{
		Username: req.Username,
		Email:    req.Email,
		Password: req.Password,
		Role:     req.Role,
	})
	if err != nil {
		if err == usersvc.ErrUsernameExists {
			c.JSON(http.StatusBadRequest, gin.H{"detail": "用户名或邮箱已存在"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"detail": err.Error()})
		return
	}
	if h.userRoleRepo != nil && len(req.PermissionRoleIDs) > 0 {
		_ = h.userRoleRepo.SetUserRoles(u.ID, req.PermissionRoleIDs)
	}
	c.JSON(http.StatusOK, gin.H{
		"user":     h.toAdminUserResponseWithRoles(u),
		"password": plainPassword,
	})
}

type updateUserRequest struct {
	Username          string   `json:"username" binding:"required"`
	Email             string   `json:"email" binding:"required"`
	Role              string   `json:"role"`
	CreditsBalance    int      `json:"credits_balance"`
	Disabled          bool     `json:"disabled"`
	PermissionRoleIDs []string `json:"permission_role_ids"`
}

func (h *AdminHandler) updateUser(c *gin.Context) {
	id := c.Param("id")
	var req updateUserRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"detail": "invalid request"})
		return
	}
	u, err := h.userSvc.UpdateUser(usersvc.UpdateUserInput{
		UserID:         id,
		Username:       req.Username,
		Email:          req.Email,
		Role:           req.Role,
		CreditsBalance: req.CreditsBalance,
		Disabled:       req.Disabled,
	})
	if err != nil {
		switch err {
		case usersvc.ErrUserNotFound:
			c.JSON(http.StatusNotFound, gin.H{"detail": "user not found"})
		case usersvc.ErrUsernameExists:
			c.JSON(http.StatusBadRequest, gin.H{"detail": "用户名或邮箱已存在"})
		case usersvc.ErrCannotDemoteAdmin:
			c.JSON(http.StatusBadRequest, gin.H{"detail": "不能降级最后一个管理员"})
		case usersvc.ErrInvalidCredits:
			c.JSON(http.StatusBadRequest, gin.H{"detail": "积分不能为负数"})
		default:
			c.JSON(http.StatusInternalServerError, gin.H{"detail": err.Error()})
		}
		return
	}
	if h.userRoleRepo != nil {
		roleIDs := req.PermissionRoleIDs
		if req.Role == "admin" {
			roleIDs = nil
		}
		if err := h.userRoleRepo.SetUserRoles(u.ID, roleIDs); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"detail": "failed to update permission roles"})
			return
		}
	}
	c.JSON(http.StatusOK, h.toAdminUserResponseWithRoles(u))
}

func (h *AdminHandler) toggleDisable(c *gin.Context) {
	id := c.Param("id")
	u, err := h.userSvc.ToggleDisable(id)
	if err != nil {
		if err == usersvc.ErrUserNotFound {
			c.JSON(http.StatusNotFound, gin.H{"detail": "user not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"detail": err.Error()})
		return
	}
	c.JSON(http.StatusOK, h.toAdminUserResponseWithRoles(u))
}

type resetPasswordRequest struct {
	NewPassword string `json:"new_password" binding:"omitempty,min=6"`
}

func (h *AdminHandler) resetPassword(c *gin.Context) {
	id := c.Param("id")
	var req resetPasswordRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"detail": "invalid request"})
		return
	}
	newPassword, err := h.userSvc.ResetPassword(id, req.NewPassword)
	if err != nil {
		switch err {
		case usersvc.ErrUserNotFound:
			c.JSON(http.StatusNotFound, gin.H{"detail": "user not found"})
		case usersvc.ErrPasswordTooShort:
			c.JSON(http.StatusBadRequest, gin.H{"detail": "密码至少6位"})
		default:
			c.JSON(http.StatusInternalServerError, gin.H{"detail": err.Error()})
		}
		return
	}
	c.JSON(http.StatusOK, gin.H{"password": newPassword})
}

func (h *AdminHandler) deleteUser(c *gin.Context) {
	id := c.Param("id")
	if err := h.userSvc.DeleteUser(id); err != nil {
		if err == usersvc.ErrUserNotFound {
			c.JSON(http.StatusNotFound, gin.H{"detail": "user not found"})
			return
		}
		if err == usersvc.ErrCannotDeleteAdmin {
			c.JSON(http.StatusBadRequest, gin.H{"detail": "不能删除最后一个管理员"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"detail": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"status": "deleted"})
}

// ========== 角色/权限管理 ==========

type roleResponse struct {
	ID           string   `json:"id"`
	Name         string   `json:"name"`
	Description  *string  `json:"description"`
	Permissions  []string `json:"permissions"`
	SkillGroupID *string  `json:"skill_group_id"`
	CreatedAt    string   `json:"created_at"`
}

func toRoleResponse(r *role.Role) roleResponse {
	return roleResponse{
		ID:           r.ID,
		Name:         r.Name,
		Description:  r.Description,
		Permissions:  r.Permissions,
		SkillGroupID: r.SkillGroupID,
		CreatedAt:    r.CreatedAt.Format("2006-01-02T15:04:05.000Z"),
	}
}

func (h *AdminHandler) listRoles(c *gin.Context) {
	roles, err := h.roleSvc.List()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"detail": err.Error()})
		return
	}
	res := make([]roleResponse, len(roles))
	for i, r := range roles {
		res[i] = toRoleResponse(r)
	}
	c.JSON(http.StatusOK, res)
}

type createRoleRequest struct {
	Name         string   `json:"name" binding:"required"`
	Description  *string  `json:"description"`
	Permissions  []string `json:"permissions"`
	SkillGroupID *string  `json:"skill_group_id"`
}

func (h *AdminHandler) createRole(c *gin.Context) {
	var req createRoleRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"detail": "invalid request"})
		return
	}
	r, err := h.roleSvc.Create(req.Name, req.Description, req.Permissions, req.SkillGroupID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"detail": err.Error()})
		return
	}
	c.JSON(http.StatusOK, toRoleResponse(r))
}

func (h *AdminHandler) getRole(c *gin.Context) {
	r, err := h.roleSvc.Get(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"detail": "role not found"})
		return
	}
	c.JSON(http.StatusOK, toRoleResponse(r))
}

func (h *AdminHandler) updateRole(c *gin.Context) {
	var req createRoleRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"detail": "invalid request"})
		return
	}
	r, err := h.roleSvc.Update(c.Param("id"), &req.Name, req.Description, req.Permissions, req.SkillGroupID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"detail": err.Error()})
		return
	}
	c.JSON(http.StatusOK, toRoleResponse(r))
}

func (h *AdminHandler) deleteRole(c *gin.Context) {
	if err := h.roleSvc.Delete(c.Param("id")); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"detail": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"status": "deleted"})
}

// ========== 技能组管理 ==========

type skillGroupResponse struct {
	ID          string   `json:"id"`
	Name        string   `json:"name"`
	Description *string  `json:"description"`
	SkillIDs    []string `json:"skill_ids"`
	RoleID      *string  `json:"role_id"`
	UsesW6      bool     `json:"uses_w6"`
	CreatedAt   string   `json:"created_at"`
}

func (h *AdminHandler) toSkillGroupResponse(g *skillgroupsvc.SkillGroup) skillGroupResponse {
	usesW6 := h.skillGroupSvc != nil && h.skillGroupSvc.GroupUsesW6Runner(g.ID)
	return skillGroupResponse{
		ID:          g.ID,
		Name:        g.Name,
		Description: g.Description,
		SkillIDs:    g.SkillIDs,
		RoleID:      g.RoleID,
		UsesW6:      usesW6,
		CreatedAt:   g.CreatedAt.Format("2006-01-02T15:04:05.000Z"),
	}
}

func (h *AdminHandler) listSkillGroups(c *gin.Context) {
	groups, err := h.skillGroupSvc.List()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"detail": err.Error()})
		return
	}
	res := make([]skillGroupResponse, len(groups))
	for i, g := range groups {
		res[i] = h.toSkillGroupResponse(g)
	}
	c.JSON(http.StatusOK, res)
}

type createSkillGroupRequest struct {
	Name        string   `json:"name" binding:"required"`
	Description *string  `json:"description"`
	SkillIDs    []string `json:"skill_ids"`
	RoleID      *string  `json:"role_id"`
}

func (h *AdminHandler) createSkillGroup(c *gin.Context) {
	var req createSkillGroupRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"detail": "invalid request"})
		return
	}
	g, err := h.skillGroupSvc.Create(req.Name, req.Description, req.SkillIDs, req.RoleID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"detail": err.Error()})
		return
	}
	c.JSON(http.StatusOK, h.toSkillGroupResponse(g))
}

func (h *AdminHandler) getSkillGroup(c *gin.Context) {
	g, err := h.skillGroupSvc.Get(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"detail": "skill group not found"})
		return
	}
	c.JSON(http.StatusOK, h.toSkillGroupResponse(g))
}

func (h *AdminHandler) updateSkillGroup(c *gin.Context) {
	var req createSkillGroupRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"detail": "invalid request"})
		return
	}
	g, err := h.skillGroupSvc.Update(c.Param("id"), &req.Name, req.Description, req.SkillIDs, req.RoleID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"detail": err.Error()})
		return
	}
	c.JSON(http.StatusOK, h.toSkillGroupResponse(g))
}

func (h *AdminHandler) deleteSkillGroup(c *gin.Context) {
	if err := h.skillGroupSvc.Delete(c.Param("id")); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"detail": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"status": "deleted"})
}

func (h *AdminHandler) getSettings(c *gin.Context) {
	registration := false
	if h.settings != nil {
		registration = h.settings.GetBool("registration_enabled", false)
	}
	c.JSON(http.StatusOK, gin.H{
		"registration_enabled": registration,
	})
}

type patchSettingsRequest struct {
	RegistrationEnabled *bool `json:"registration_enabled"`
}

func (h *AdminHandler) patchSettings(c *gin.Context) {
	var req patchSettingsRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"detail": "invalid request"})
		return
	}
	if req.RegistrationEnabled != nil && h.settings != nil {
		if err := h.settings.Set("registration_enabled", strconv.FormatBool(*req.RegistrationEnabled)); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"detail": "failed to save settings"})
			return
		}
	}
	h.getSettings(c)
}
