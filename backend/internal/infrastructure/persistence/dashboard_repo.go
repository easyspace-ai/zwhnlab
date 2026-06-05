package persistence

import (
	"time"
)

// DashboardRepository handles persistence for dashboard data.
type DashboardRepository struct {
	db *DB
}

func NewDashboardRepository(db *DB) *DashboardRepository {
	return &DashboardRepository{db: db}
}

// ListItemsByType returns xstream items filtered by type, newest first (offset pagination).
func (r *DashboardRepository) ListItemsByType(itemType string, offset, limit int) ([]XStreamItemModel, error) {
	if limit <= 0 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	var out []XStreamItemModel
	err := r.db.DB.Where("type = ?", itemType).
		Order("pub_date DESC").
		Offset(offset).
		Limit(limit).
		Find(&out).Error
	return out, err
}

// MinRemoteIDByType returns the smallest remote_id for a type (0 if none).
func (r *DashboardRepository) MinRemoteIDByType(itemType string) (int64, error) {
	var minID int64
	err := r.db.DB.Model(&XStreamItemModel{}).
		Where("type = ?", itemType).
		Select("COALESCE(MIN(remote_id), 0)").
		Scan(&minID).Error
	return minID, err
}

// CountByType returns the total count of items for a given type.
func (r *DashboardRepository) CountByType(itemType string) (int64, error) {
	var count int64
	err := r.db.DB.Model(&XStreamItemModel{}).Where("type = ?", itemType).Count(&count).Error
	return count, err
}

// TopicModel represents a dashboard topic.
type TopicModel struct {
	ID          int64  `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	CreatedAt   string `json:"createdAt"`
	UpdatedAt   string `json:"updatedAt"`
}

// ListTopics returns all topics for a user.
func (r *DashboardRepository) ListTopics(userID string) ([]TopicModel, error) {
	var models []DashboardTopicModel
	if err := r.db.DB.Where("user_id = ?", userID).Order("created_at DESC").Find(&models).Error; err != nil {
		return nil, err
	}
	topics := make([]TopicModel, len(models))
	for i, m := range models {
		topics[i] = TopicModel{
			ID:          m.ID,
			Name:        m.Name,
			Description: m.Description,
			CreatedAt:   m.CreatedAt.Format(time.RFC3339),
			UpdatedAt:   m.UpdatedAt.Format(time.RFC3339),
		}
	}
	return topics, nil
}

// CreateTopic creates a new topic.
func (r *DashboardRepository) CreateTopic(userID, name, description string) (TopicModel, error) {
	now := time.Now().UTC()
	model := DashboardTopicModel{
		UserID:      userID,
		Name:        name,
		Description: description,
		CreatedAt:   now,
		UpdatedAt:   now,
	}
	if err := r.db.DB.Create(&model).Error; err != nil {
		return TopicModel{}, err
	}
	return TopicModel{
		ID:          model.ID,
		Name:        model.Name,
		Description: model.Description,
		CreatedAt:   model.CreatedAt.Format(time.RFC3339),
		UpdatedAt:   model.UpdatedAt.Format(time.RFC3339),
	}, nil
}

// DeleteTopic deletes a topic by ID.
func (r *DashboardRepository) DeleteTopic(userID string, id int64) error {
	return r.db.DB.Where("id = ? AND user_id = ?", id, userID).Delete(&DashboardTopicModel{}).Error
}

// SearchItems searches xstream items by keyword across content, user_name, and link.
func (r *DashboardRepository) SearchItems(keyword string, itemType string, offset, limit int) ([]XStreamItemModel, error) {
	if limit <= 0 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	var out []XStreamItemModel
	like := "%" + keyword + "%"
	q := r.db.DB.Where("content LIKE ? OR user_name LIKE ? OR link LIKE ?", like, like, like)
	if itemType != "" && itemType != "all" {
		q = q.Where("type = ?", itemType)
	}
	err := q.Order("pub_date DESC").Offset(offset).Limit(limit).Find(&out).Error
	return out, err
}

// CountSearchItems returns total count of items matching the search keyword.
func (r *DashboardRepository) CountSearchItems(keyword string, itemType string) (int64, error) {
	var count int64
	like := "%" + keyword + "%"
	q := r.db.DB.Model(&XStreamItemModel{}).Where("content LIKE ? OR user_name LIKE ? OR link LIKE ?", like, like, like)
	if itemType != "" && itemType != "all" {
		q = q.Where("type = ?", itemType)
	}
	err := q.Count(&count).Error
	return count, err
}

// ScoredContentModel represents scored content.
type ScoredContentResult struct {
	ID       int64  `json:"id"`
	Title    string `json:"title"`
	Category string `json:"category"`
	Score    int    `json:"score"`
	Date     string `json:"date"`
}

// ListScoredContent returns all scored content.
func (r *DashboardRepository) ListScoredContent() ([]ScoredContentResult, error) {
	var models []ScoredContentModel
	if err := r.db.DB.Order("date DESC").Find(&models).Error; err != nil {
		return nil, err
	}
	results := make([]ScoredContentResult, len(models))
	for i, m := range models {
		results[i] = ScoredContentResult{
			ID:       m.ID,
			Title:    m.Title,
			Category: m.Category,
			Score:    m.Score,
			Date:     m.Date,
		}
	}
	return results, nil
}
