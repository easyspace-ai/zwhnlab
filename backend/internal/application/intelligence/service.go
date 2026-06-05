package intelligence

import (
	"errors"
	"fmt"
	"strings"
	"time"

	"github.com/easyspace-ai/ylmnote/internal/domain/intelligence"
	"github.com/google/uuid"
)

// Service 情报技能应用服务（全局技能存于 SystemSkillsUserID）
type Service struct {
	repo          intelligence.Repository
	defaultsDir   string
	customDir     string
	defaults      []SkillCreateInput
	defaultsByKey map[string]SkillCreateInput
}

func NewService(repo intelligence.Repository, defaultsDir, customDir string) (*Service, error) {
	merged, err := LoadMergedSkillsFromDirs(defaultsDir, customDir)
	if err != nil {
		return nil, err
	}
	defaultsOnly, err := LoadDefaultsOnlySkillsFromDir(defaultsDir)
	if err != nil {
		return nil, err
	}
	inputs := make([]SkillCreateInput, len(merged))
	for i, rec := range merged {
		inputs[i] = rec.SkillCreateInput
	}
	return &Service{
		repo:          repo,
		defaultsDir:   defaultsDir,
		customDir:     customDir,
		defaults:      defaultsOnly,
		defaultsByKey: defaultSkillsByKey(defaultsOnly),
	}, nil
}

// SkillCreateInput 创建技能的输入
type SkillCreateInput struct {
	Key            string
	Name           string
	Description    *string
	Icon           *string
	FormSchema     string
	PromptTemplate string
	IsEnabled      bool
	SortOrder      int
}

// SkillUpdateInput 更新技能的输入
type SkillUpdateInput struct {
	Name           *string
	Description    *string
	Icon           *string
	FormSchema     *string
	PromptTemplate *string
	IsEnabled      *bool
	SortOrder      *int
}

// ExecuteInput 执行技能的输入（提示词须在客户端 Handlebars 渲染后传入 message）
type ExecuteInput struct {
	Message  string
	FormData map[string]interface{}
}

// ExecuteResult 执行技能的结果
type ExecuteResult struct {
	Message string
}

func applyDefaultToSkill(skill *intelligence.Skill, item SkillCreateInput, now time.Time) {
	skill.Name = item.Name
	skill.Description = item.Description
	skill.Icon = item.Icon
	skill.FormSchema = item.FormSchema
	skill.PromptTemplate = item.PromptTemplate
	skill.IsEnabled = item.IsEnabled
	skill.SortOrder = item.SortOrder
	skill.UpdatedAt = now
}

func (s *Service) reloadMerged() ([]SkillFileRecord, error) {
	return LoadMergedSkillsFromDirs(s.defaultsDir, s.customDir)
}

// SyncSystemSkills 启动时从合并后的 JSON 同步全局技能到 DB（以磁盘为准更新内容）
func (s *Service) SyncSystemSkills() error {
	merged, err := s.reloadMerged()
	if err != nil {
		return err
	}
	now := time.Now().UTC()
	for _, rec := range merged {
		item := rec.SkillCreateInput
		existing, err := s.repo.GetByKey(item.Key, SystemSkillsUserID)
		if err != nil {
			skill := &intelligence.Skill{
				ID:             uuid.NewString(),
				UserID:         SystemSkillsUserID,
				Key:            item.Key,
				Name:           item.Name,
				Description:    item.Description,
				Icon:           item.Icon,
				FormSchema:     item.FormSchema,
				PromptTemplate: item.PromptTemplate,
				IsEnabled:      item.IsEnabled,
				SortOrder:      item.SortOrder,
				CreatedAt:      now,
				UpdatedAt:      now,
			}
			if err := s.repo.Create(skill); err != nil {
				return err
			}
			continue
		}
		applyDefaultToSkill(existing, item, now)
		if err := s.repo.Update(existing); err != nil {
			return err
		}
	}
	return nil
}

// EnsureDefaultSkills 兼容旧调用：改为同步全局技能（忽略 userID / onlyKeys）
func (s *Service) EnsureDefaultSkills(_ string, _ map[string]struct{}) error {
	return s.SyncSystemSkills()
}

// RestoreSkillToDefault 恢复为 defaults/ 基线（删除 custom 覆盖文件）
func (s *Service) RestoreSkillToDefault(_ string, id string) (*intelligence.Skill, error) {
	skill, err := s.repo.GetByID(id, SystemSkillsUserID)
	if err != nil {
		return nil, err
	}
	key := strings.TrimSpace(skill.Key)
	if _, ok := BuiltinSkillKeys[key]; !ok {
		return nil, fmt.Errorf("skill %q is not a builtin skill", skill.Key)
	}
	item, ok := s.defaultsByKey[key]
	if !ok {
		return nil, fmt.Errorf("builtin default not found for key %q", skill.Key)
	}
	groupID, err := FindSkillGroupID(s.defaultsDir, s.customDir, key)
	if err != nil {
		groupID, _ = FindSkillGroupID(s.defaultsDir, "", key)
	}
	if groupID != "" {
		_ = DeleteCustomSkillFile(s.customDir, groupID, key)
	}

	now := time.Now().UTC()
	applyDefaultToSkill(skill, item, now)
	if err := s.repo.Update(skill); err != nil {
		return nil, err
	}
	return skill, nil
}

// ListSkills 列出全局情报技能
func (s *Service) ListSkills(_ string) ([]*intelligence.Skill, error) {
	return s.repo.ListByUserID(SystemSkillsUserID)
}

// FilterSkillsByKeys 仅保留 key 在 allowed 中的技能
func FilterSkillsByKeys(list []*intelligence.Skill, allowed map[string]struct{}) []*intelligence.Skill {
	if allowed == nil {
		return list
	}
	out := make([]*intelligence.Skill, 0, len(list))
	for _, sk := range list {
		if _, ok := allowed[strings.TrimSpace(sk.Key)]; ok {
			out = append(out, sk)
		}
	}
	return out
}

// GetSkill 获取单个全局技能
func (s *Service) GetSkill(_ string, id string) (*intelligence.Skill, error) {
	return s.repo.GetByID(id, SystemSkillsUserID)
}

// CreateSkill 创建技能（写入 custom/ 并入库）
func (s *Service) CreateSkill(_ string, groupID string, in SkillCreateInput) (*intelligence.Skill, error) {
	groupID = strings.TrimSpace(groupID)
	if groupID == "" {
		var err error
		groupID, err = FindSkillGroupID(s.defaultsDir, s.customDir, in.Key)
		if err != nil {
			return nil, fmt.Errorf("group_id is required for new skills")
		}
	}
	if existing, err := s.repo.GetByKey(in.Key, SystemSkillsUserID); err == nil && existing != nil {
		return nil, fmt.Errorf("skill key %q already exists", in.Key)
	}

	if err := WriteSkillToCustomDir(s.customDir, groupID, in); err != nil {
		return nil, err
	}

	now := time.Now().UTC()
	skill := &intelligence.Skill{
		ID:             uuid.NewString(),
		UserID:         SystemSkillsUserID,
		Key:            strings.TrimSpace(in.Key),
		Name:           strings.TrimSpace(in.Name),
		Description:    in.Description,
		Icon:           in.Icon,
		FormSchema:     in.FormSchema,
		PromptTemplate: in.PromptTemplate,
		IsEnabled:      in.IsEnabled,
		SortOrder:      in.SortOrder,
		CreatedAt:      now,
		UpdatedAt:      now,
	}
	if err := s.repo.Create(skill); err != nil {
		return nil, err
	}
	return skill, nil
}

// UpdateSkill 更新技能（写入 custom/ 并更新 DB）
func (s *Service) UpdateSkill(_ string, id string, groupID string, in SkillUpdateInput) (*intelligence.Skill, error) {
	skill, err := s.repo.GetByID(id, SystemSkillsUserID)
	if err != nil {
		return nil, err
	}
	if strings.TrimSpace(groupID) == "" {
		groupID, _ = FindSkillGroupID(s.defaultsDir, s.customDir, skill.Key)
	}
	if groupID == "" {
		return nil, fmt.Errorf("cannot resolve skill group for key %q", skill.Key)
	}

	if in.Name != nil {
		skill.Name = strings.TrimSpace(*in.Name)
	}
	if in.Description != nil {
		skill.Description = in.Description
	}
	if in.Icon != nil {
		skill.Icon = in.Icon
	}
	if in.FormSchema != nil {
		skill.FormSchema = *in.FormSchema
	}
	if in.PromptTemplate != nil {
		skill.PromptTemplate = *in.PromptTemplate
	}
	if in.IsEnabled != nil {
		skill.IsEnabled = *in.IsEnabled
	}
	if in.SortOrder != nil {
		skill.SortOrder = *in.SortOrder
	}
	skill.UpdatedAt = time.Now().UTC()

	fileIn := SkillCreateInput{
		Key:            skill.Key,
		Name:           skill.Name,
		Description:    skill.Description,
		Icon:           skill.Icon,
		FormSchema:     skill.FormSchema,
		PromptTemplate: skill.PromptTemplate,
		IsEnabled:      skill.IsEnabled,
		SortOrder:      skill.SortOrder,
	}
	if err := WriteSkillToCustomDir(s.customDir, groupID, fileIn); err != nil {
		return nil, err
	}
	if err := s.repo.Update(skill); err != nil {
		return nil, err
	}
	return skill, nil
}

// DeleteSkill 删除技能（删除 custom 文件与 DB 记录；defaults 中的内置项重启后会重新同步）
func (s *Service) DeleteSkill(_ string, id string) error {
	skill, err := s.repo.GetByID(id, SystemSkillsUserID)
	if err != nil {
		return err
	}
	if groupID, _ := FindSkillGroupID(s.defaultsDir, s.customDir, skill.Key); groupID != "" {
		_ = DeleteCustomSkillFile(s.customDir, groupID, skill.Key)
	}
	return s.repo.Delete(id, SystemSkillsUserID)
}

var ErrPromptRenderingClientSide = errors.New("prompt rendering is client-side; send pre-rendered message")

// ExecuteSkill 校验技能存在并回传客户端已渲染的提示词（不在服务端渲染模板）。
func (s *Service) ExecuteSkill(_ string, id string, in ExecuteInput) (*ExecuteResult, error) {
	if strings.TrimSpace(in.Message) == "" {
		return nil, ErrPromptRenderingClientSide
	}
	if _, err := s.repo.GetByID(id, SystemSkillsUserID); err != nil {
		return nil, err
	}
	return &ExecuteResult{Message: strings.TrimSpace(in.Message)}, nil
}
