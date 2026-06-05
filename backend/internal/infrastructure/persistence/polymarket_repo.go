package persistence

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

// PolymarketRepository handles persistence for saved polymarket events.
type PolymarketRepository struct {
	db *DB
}

func NewPolymarketRepository(db *DB) *PolymarketRepository {
	return &PolymarketRepository{db: db}
}

func (r *PolymarketRepository) List() ([]PolymarketSavedEventModel, error) {
	var out []PolymarketSavedEventModel
	err := r.db.DB.Order("updated_at DESC").Find(&out).Error
	return out, err
}

func (r *PolymarketRepository) Upsert(m *PolymarketSavedEventModel) (*PolymarketSavedEventModel, error) {
	if m.ID == "" {
		m.ID = uuid.NewString()
	}
	now := time.Now().UTC()
	if m.CreatedAt.IsZero() {
		m.CreatedAt = now
	}
	m.UpdatedAt = now

	var existing PolymarketSavedEventModel
	err := r.db.DB.Where("condition_id = ?", m.ConditionID).First(&existing).Error
	if err != nil && err != gorm.ErrRecordNotFound {
		return nil, err
	}
if err == gorm.ErrRecordNotFound {
		if err := r.db.Create(m).Error; err != nil {
			return nil, err
		}
	} else {
		m.ID = existing.ID
		m.CreatedAt = existing.CreatedAt
		// 仅在调用方未设置时保留已有值
		if m.AIProjectID == "" {
			m.AIProjectID = existing.AIProjectID
		}
		if m.AISessionID == "" {
			m.AISessionID = existing.AISessionID
		}
		if err := r.db.Save(m).Error; err != nil {
			return nil, err
		}
	}

	err = r.db.DB.Save(m).Error
	if err != nil {
		return nil, err
	}
	return m, nil
}

func (r *PolymarketRepository) GetByID(id string) (*PolymarketSavedEventModel, error) {
	var out PolymarketSavedEventModel
	err := r.db.DB.Where("id = ?", id).First(&out).Error
	if err == gorm.ErrRecordNotFound {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}
	return &out, nil
}

func (r *PolymarketRepository) GetByConditionID(conditionID string) (*PolymarketSavedEventModel, error) {
	var out PolymarketSavedEventModel
	err := r.db.DB.Where("condition_id = ?", conditionID).First(&out).Error
	if err == gorm.ErrRecordNotFound {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}
	return &out, nil
}

func (r *PolymarketRepository) UpdateAIChatIDs(id, projectID, sessionID string) error {
	return r.db.DB.Model(&PolymarketSavedEventModel{}).
		Where("id = ?", id).
		Updates(map[string]interface{}{
			"ai_project_id": projectID,
			"ai_session_id": sessionID,
		}).Error
}

func (r *PolymarketRepository) Delete(id string) error {
	return r.db.DB.Where("id = ?", id).Delete(&PolymarketSavedEventModel{}).Error
}
