package http

import (
	"errors"
	"net/http"
	"strings"

	"github.com/easyspace-ai/ylmnote/internal/application/intelligence"
	"github.com/easyspace-ai/ylmnote/internal/application/role"
	skillgroupsvc "github.com/easyspace-ai/ylmnote/internal/application/skillgroup"
	domainintel "github.com/easyspace-ai/ylmnote/internal/domain/intelligence"
	"github.com/gin-gonic/gin"
)

// IntelligenceSkillHandler 情报技能 HTTP 处理
type IntelligenceSkillHandler struct {
	svc           *intelligence.Service
	skillGroupSvc *skillgroupsvc.Service
	roleSvc       *role.Service
}

func NewIntelligenceSkillHandler(svc *intelligence.Service, skillGroupSvc *skillgroupsvc.Service, roleSvc *role.Service) *IntelligenceSkillHandler {
	return &IntelligenceSkillHandler{svc: svc, skillGroupSvc: skillGroupSvc, roleSvc: roleSvc}
}

func (h *IntelligenceSkillHandler) RegisterRoutes(r *gin.RouterGroup) {
	r.GET("", h.listSkills)
	r.POST("", h.createSkill)
	r.GET("/:id", h.getSkill)
	r.PATCH("/:id", h.updateSkill)
	r.DELETE("/:id", h.deleteSkill)
	r.POST("/:id/execute", h.executeSkill)
	r.POST("/:id/restore-default", h.restoreSkillToDefault)
	r.GET("/groups", h.listSkillGroups)
}

func (h *IntelligenceSkillHandler) listSkills(c *gin.Context) {
	u, ok := GetCurrentUser(c)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"detail": "Not authenticated"})
		return
	}

	var allowedKeys map[string]struct{}
	if !u.IsAdmin() {
		groupIDs, err := h.roleSvc.SkillGroupIDsForUser(u.ID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"detail": "failed to resolve skill groups"})
			return
		}
		if len(groupIDs) == 0 {
			c.JSON(http.StatusOK, []gin.H{})
			return
		}
		allowedKeys, err = h.skillGroupSvc.SkillKeysForGroupIDs(groupIDs)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"detail": "failed to resolve skill keys"})
			return
		}
		if len(allowedKeys) == 0 {
			c.JSON(http.StatusOK, []gin.H{})
			return
		}
	}

	list, err := h.svc.ListSkills(u.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"detail": "failed to list intelligence skills"})
		return
	}
	list = intelligence.FilterSkillsByKeys(list, allowedKeys)
	w6Keys := map[string]struct{}{}
	if h.skillGroupSvc != nil {
		w6Keys = h.skillGroupSvc.W6RunnerSkillKeys()
	}
	c.JSON(http.StatusOK, toIntelligenceSkillListResponse(list, w6Keys))
}

type createIntelligenceSkillRequest struct {
	GroupID        string  `json:"group_id"`
	Key            string  `json:"key" binding:"required"`
	Name           string  `json:"name" binding:"required"`
	Description    *string `json:"description"`
	Icon           *string `json:"icon"`
	FormSchema     string  `json:"form_schema" binding:"required"`
	PromptTemplate string  `json:"prompt_template" binding:"required"`
	IsEnabled      bool    `json:"is_enabled"`
	SortOrder      int     `json:"sort_order"`
}

func (h *IntelligenceSkillHandler) createSkill(c *gin.Context) {
	u, ok := GetCurrentUser(c)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"detail": "Not authenticated"})
		return
	}
	if !u.IsAdmin() {
		c.JSON(http.StatusForbidden, gin.H{"detail": "admin access required"})
		return
	}
	var req createIntelligenceSkillRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"detail": "invalid request body"})
		return
	}
	if strings.TrimSpace(req.Key) == "" || strings.TrimSpace(req.Name) == "" {
		c.JSON(http.StatusBadRequest, gin.H{"detail": "key and name are required"})
		return
	}

	skill, err := h.svc.CreateSkill(u.ID, strings.TrimSpace(req.GroupID), intelligence.SkillCreateInput{
		Key:            strings.TrimSpace(req.Key),
		Name:           strings.TrimSpace(req.Name),
		Description:    req.Description,
		Icon:           req.Icon,
		FormSchema:     req.FormSchema,
		PromptTemplate: req.PromptTemplate,
		IsEnabled:      req.IsEnabled,
		SortOrder:      req.SortOrder,
	})
	if err != nil {
		if strings.Contains(err.Error(), "already exists") || strings.Contains(err.Error(), "group_id") {
			c.JSON(http.StatusBadRequest, gin.H{"detail": err.Error()})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"detail": "failed to create intelligence skill"})
		return
	}
	c.JSON(http.StatusCreated, h.toSkillResponse(skill))
}

func (h *IntelligenceSkillHandler) getSkill(c *gin.Context) {
	u, ok := GetCurrentUser(c)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"detail": "Not authenticated"})
		return
	}
	skill, err := h.svc.GetSkill(u.ID, c.Param("id"))
	if err != nil || skill == nil {
		c.JSON(http.StatusNotFound, gin.H{"detail": "Intelligence skill not found"})
		return
	}
	c.JSON(http.StatusOK, h.toSkillResponse(skill))
}

type updateIntelligenceSkillRequest struct {
	GroupID        *string `json:"group_id"`
	Name           *string `json:"name"`
	Description    *string `json:"description"`
	Icon           *string `json:"icon"`
	FormSchema     *string `json:"form_schema"`
	PromptTemplate *string `json:"prompt_template"`
	IsEnabled      *bool   `json:"is_enabled"`
	SortOrder      *int    `json:"sort_order"`
}

func (h *IntelligenceSkillHandler) updateSkill(c *gin.Context) {
	u, ok := GetCurrentUser(c)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"detail": "Not authenticated"})
		return
	}
	if !u.IsAdmin() {
		c.JSON(http.StatusForbidden, gin.H{"detail": "admin access required"})
		return
	}
	var req updateIntelligenceSkillRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"detail": "invalid request body"})
		return
	}

	normalize := func(v *string) *string {
		if v == nil {
			return nil
		}
		s := strings.TrimSpace(*v)
		return &s
	}

	in := intelligence.SkillUpdateInput{
		Name:           normalize(req.Name),
		Description:    req.Description,
		Icon:           req.Icon,
		FormSchema:     req.FormSchema,
		PromptTemplate: req.PromptTemplate,
		IsEnabled:      req.IsEnabled,
		SortOrder:      req.SortOrder,
	}
	groupID := ""
	if req.GroupID != nil {
		groupID = strings.TrimSpace(*req.GroupID)
	}
	skill, err := h.svc.UpdateSkill(u.ID, c.Param("id"), groupID, in)
	if err != nil || skill == nil {
		c.JSON(http.StatusNotFound, gin.H{"detail": "Intelligence skill not found"})
		return
	}
	c.JSON(http.StatusOK, h.toSkillResponse(skill))
}

func (h *IntelligenceSkillHandler) deleteSkill(c *gin.Context) {
	u, ok := GetCurrentUser(c)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"detail": "Not authenticated"})
		return
	}
	if !u.IsAdmin() {
		c.JSON(http.StatusForbidden, gin.H{"detail": "admin access required"})
		return
	}
	if err := h.svc.DeleteSkill(u.ID, c.Param("id")); err != nil {
		c.JSON(http.StatusNotFound, gin.H{"detail": "Intelligence skill not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Intelligence skill deleted"})
}

type executeIntelligenceSkillRequest struct {
	Message  string                 `json:"message" binding:"required"`
	FormData map[string]interface{} `json:"form_data"`
}

func (h *IntelligenceSkillHandler) restoreSkillToDefault(c *gin.Context) {
	u, ok := GetCurrentUser(c)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"detail": "Not authenticated"})
		return
	}
	if !u.IsAdmin() {
		c.JSON(http.StatusForbidden, gin.H{"detail": "admin access required"})
		return
	}
	skill, err := h.svc.RestoreSkillToDefault(u.ID, c.Param("id"))
	if err != nil {
		if strings.Contains(err.Error(), "not a builtin") {
			c.JSON(http.StatusBadRequest, gin.H{"detail": err.Error()})
			return
		}
		c.JSON(http.StatusNotFound, gin.H{"detail": "Intelligence skill not found"})
		return
	}
	c.JSON(http.StatusOK, h.toSkillResponse(skill))
}

func (h *IntelligenceSkillHandler) executeSkill(c *gin.Context) {
	u, ok := GetCurrentUser(c)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"detail": "Not authenticated"})
		return
	}
	var req executeIntelligenceSkillRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"detail": "invalid request body"})
		return
	}

	result, err := h.svc.ExecuteSkill(u.ID, c.Param("id"), intelligence.ExecuteInput{
		Message:  req.Message,
		FormData: req.FormData,
	})
	if err != nil {
		if errors.Is(err, intelligence.ErrPromptRenderingClientSide) {
			c.JSON(http.StatusBadRequest, gin.H{"detail": err.Error()})
			return
		}
		c.JSON(http.StatusNotFound, gin.H{"detail": "Intelligence skill not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": result.Message})
}

func (h *IntelligenceSkillHandler) listSkillGroups(c *gin.Context) {
	u, ok := GetCurrentUser(c)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"detail": "Not authenticated"})
		return
	}

	groups, err := h.skillGroupSvc.List()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"detail": "failed to list skill groups"})
		return
	}

	// Admin sees all groups; regular users see groups bound on their roles (roles.skill_group_id)
	var filtered []*skillgroupsvc.SkillGroup
	if u.IsAdmin() {
		filtered = groups
	} else {
		allowedGroupIDs := map[string]struct{}{}
		if h.roleSvc != nil {
			ids, _ := h.roleSvc.SkillGroupIDsForUser(u.ID)
			for _, id := range ids {
				allowedGroupIDs[id] = struct{}{}
			}
		}
		for _, g := range groups {
			if _, ok := allowedGroupIDs[g.ID]; ok {
				filtered = append(filtered, g)
			}
		}
	}

	out := make([]gin.H, len(filtered))
	for i, g := range filtered {
		out[i] = h.toSkillGroupResponse(g)
	}
	c.JSON(http.StatusOK, out)
}

func (h *IntelligenceSkillHandler) toSkillResponse(s *domainintel.Skill) gin.H {
	usesW6 := false
	if h.skillGroupSvc != nil {
		usesW6 = h.skillGroupSvc.SkillUsesW6Runner(s.Key)
	}
	return toIntelligenceSkillResponse(s, usesW6)
}

func (h *IntelligenceSkillHandler) toSkillGroupResponse(g *skillgroupsvc.SkillGroup) gin.H {
	usesW6 := h.skillGroupSvc != nil && h.skillGroupSvc.GroupUsesW6Runner(g.ID)
	return gin.H{
		"id":          g.ID,
		"name":        g.Name,
		"description": g.Description,
		"skill_ids":   g.SkillIDs,
		"role_id":     g.RoleID,
		"uses_w6":     usesW6,
		"created_at":  g.CreatedAt,
		"updated_at":  g.UpdatedAt,
	}
}

func toIntelligenceSkillResponse(s *domainintel.Skill, usesW6 bool) gin.H {
	return gin.H{
		"id":              s.ID,
		"key":             s.Key,
		"name":            s.Name,
		"description":     s.Description,
		"icon":            s.Icon,
		"form_schema":     s.FormSchema,
		"prompt_template": s.PromptTemplate,
		"is_enabled":      s.IsEnabled,
		"sort_order":      s.SortOrder,
		"uses_w6":         usesW6,
		"created_at":      s.CreatedAt,
		"updated_at":      s.UpdatedAt,
	}
}

func toIntelligenceSkillListResponse(list []*domainintel.Skill, w6Keys map[string]struct{}) []gin.H {
	out := make([]gin.H, len(list))
	for i, item := range list {
		_, usesW6 := w6Keys[item.Key]
		out[i] = toIntelligenceSkillResponse(item, usesW6)
	}
	return out
}
