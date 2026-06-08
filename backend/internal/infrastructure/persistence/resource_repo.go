package persistence

import (
	"strings"

	"github.com/easyspace-ai/ylmnote/internal/domain/project"
)

// ResourceRepository 资源仓储 GORM 实现
type ResourceRepository struct {
	db *DB
}

func NewResourceRepository(db *DB) project.ResourceRepository {
	return &ResourceRepository{db: db}
}

func (r *ResourceRepository) Create(res *project.Resource) error {
	m := toResourceModel(res)
	return r.db.Create(m).Error
}

func (r *ResourceRepository) GetByID(projectID, resourceID string) (*project.Resource, error) {
	var m ResourceModel
	if err := r.db.Where("id = ? AND project_id = ?", resourceID, projectID).First(&m).Error; err != nil {
		return nil, err
	}
	return toResourceEntity(&m), nil
}

// GetByResourceID 通过 resourceID 直接查询资源（不依赖 project_id）
func (r *ResourceRepository) GetByResourceID(resourceID string) (*project.Resource, error) {
	var m ResourceModel
	if err := r.db.Where("id = ?", resourceID).First(&m).Error; err != nil {
		return nil, err
	}
	return toResourceEntity(&m), nil
}

func (r *ResourceRepository) GetByResourceIDAndSessionID(resourceID, sessionID string) (*project.Resource, error) {
	var m ResourceModel
	if err := r.db.Where("id = ? AND session_id = ?", resourceID, sessionID).First(&m).Error; err != nil {
		return nil, err
	}
	return toResourceEntity(&m), nil
}

func (r *ResourceRepository) DeleteByProjectIDExceptSession(projectID, sessionID string) (int64, error) {
	res := r.db.Where(
		"project_id = ? AND (session_id IS NULL OR session_id != ?)",
		projectID, sessionID,
	).Delete(&ResourceModel{})
	return res.RowsAffected, res.Error
}

var resourceMetaColumns = []string{"id", "project_id", "session_id", "type", "name", "url", "size", "created_at"}

// GetByResourceIDMeta 通过 resourceID 查询资源元数据（不含 content，避免预览时拉取大 HTML 正文）。
func (r *ResourceRepository) GetByResourceIDMeta(resourceID string) (*project.Resource, error) {
	var m ResourceModel
	if err := r.db.Select(resourceMetaColumns).Where("id = ?", resourceID).First(&m).Error; err != nil {
		return nil, err
	}
	return toResourceEntity(&m), nil
}

// UpdateResourceURL updates only the url column for a resource.
func (r *ResourceRepository) UpdateResourceURL(projectID, resourceID, url string) error {
	res := r.db.Model(&ResourceModel{}).Where("id = ? AND project_id = ?", resourceID, projectID).Update("url", url)
	if res.Error != nil {
		return res.Error
	}
	if res.RowsAffected == 0 {
		return gormErrNotFound
	}
	return nil
}

// GetResourceContent loads only the content column for a resource.
func (r *ResourceRepository) GetResourceContent(resourceID string) (string, error) {
	var row struct {
		Content *string
	}
	if err := r.db.Model(&ResourceModel{}).Select("content").Where("id = ?", resourceID).First(&row).Error; err != nil {
		return "", err
	}
	if row.Content == nil || *row.Content == "" {
		return "", gormErrNotFound
	}
	return *row.Content, nil
}

// GetBySDKFileID 通过 w6/sdk file_id（sdk-file: / source: URL）反查资源
func (r *ResourceRepository) GetBySDKFileID(fileID string) (*project.Resource, error) {
	fileID = strings.TrimSpace(fileID)
	if fileID == "" {
		return nil, gormErrNotFound
	}
	var m ResourceModel
	for _, url := range []string{"sdk-file:" + fileID, "source:" + fileID} {
		if err := r.db.Where("url = ?", url).Order("created_at DESC").First(&m).Error; err == nil {
			return toResourceEntity(&m), nil
		}
	}
	return nil, gormErrNotFound
}

// GetBySDKFileIDMeta 通过 sdk file_id 反查资源元数据（不含 content）。
func (r *ResourceRepository) GetBySDKFileIDMeta(fileID string) (*project.Resource, error) {
	fileID = strings.TrimSpace(fileID)
	if fileID == "" {
		return nil, gormErrNotFound
	}
	var m ResourceModel
	for _, url := range []string{"sdk-file:" + fileID, "source:" + fileID} {
		if err := r.db.Select(resourceMetaColumns).Where("url = ?", url).Order("created_at DESC").First(&m).Error; err == nil {
			return toResourceEntity(&m), nil
		}
	}
	return nil, gormErrNotFound
}

func (r *ResourceRepository) ListBySessionID(sessionID string) ([]*project.Resource, error) {
	var list []ResourceModel
	if err := r.db.Where("session_id = ?", sessionID).Order("created_at DESC").Find(&list).Error; err != nil {
		return nil, err
	}
	out := make([]*project.Resource, len(list))
	for i := range list {
		out[i] = toResourceEntity(&list[i])
	}
	return out, nil
}

func (r *ResourceRepository) ListByProjectID(projectID string, resourceType *string) ([]*project.Resource, error) {
	var list []ResourceModel
	q := r.db.Where("project_id = ?", projectID)
	if resourceType != nil && *resourceType != "" {
		q = q.Where("type = ?", *resourceType)
	}
	if err := q.Order("created_at DESC").Find(&list).Error; err != nil {
		return nil, err
	}
	out := make([]*project.Resource, len(list))
	for i := range list {
		out[i] = toResourceEntity(&list[i])
	}
	return out, nil
}

func (r *ResourceRepository) Update(res *project.Resource) error {
	m := toResourceModel(res)
	return r.db.Model(&ResourceModel{}).Where("id = ? AND project_id = ?", res.ID, res.ProjectID).Updates(m).Error
}

func (r *ResourceRepository) Delete(projectID, resourceID string) error {
	res := r.db.Where("id = ? AND project_id = ?", resourceID, projectID).Delete(&ResourceModel{})
	if res.Error != nil {
		return res.Error
	}
	if res.RowsAffected == 0 {
		return gormErrNotFound
	}
	return nil
}

func toResourceModel(r *project.Resource) *ResourceModel {
	return &ResourceModel{
		ID:        r.ID,
		ProjectID: r.ProjectID,
		SessionID: r.SessionID,
		Type:      r.Type,
		Name:      r.Name,
		Content:   r.Content,
		URL:       r.URL,
		Size:      r.Size,
		CreatedAt: r.CreatedAt,
	}
}

func toResourceEntity(m *ResourceModel) *project.Resource {
	return &project.Resource{
		ID:        m.ID,
		ProjectID: m.ProjectID,
		SessionID: m.SessionID,
		Type:      m.Type,
		Name:      m.Name,
		Content:   m.Content,
		URL:       m.URL,
		Size:      m.Size,
		CreatedAt: m.CreatedAt,
	}
}
