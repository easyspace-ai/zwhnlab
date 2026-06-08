package persistence

import (
	"fmt"
	"strings"
	"time"

	"gorm.io/gorm"
)

// XStreamRepository handles persistence for X stream items.
type XStreamRepository struct {
	db *DB
}

func NewXStreamRepository(db *DB) *XStreamRepository {
	return &XStreamRepository{db: db}
}

func (r *XStreamRepository) Upsert(m *XStreamItemModel) error {
	return r.db.DB.Exec(
		"INSERT OR IGNORE INTO xstream_items (uuid, remote_id, user_name, user_id, pub_date, link, content, type, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
		m.UUID, m.RemoteID, m.UserName, m.UserID, m.PubDate, m.Link, m.Content, m.Type, m.CreatedAt,
	).Error
}

func (r *XStreamRepository) BatchUpsert(items []XStreamItemModel) error {
	if len(items) == 0 {
		return nil
	}

	return r.db.DB.Transaction(func(tx *gorm.DB) error {
		for i := range items {
			if err := tx.Exec(
				"INSERT OR IGNORE INTO xstream_items (uuid, remote_id, user_name, user_id, pub_date, link, content, type, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
				items[i].UUID, items[i].RemoteID, items[i].UserName, items[i].UserID,
				items[i].PubDate, items[i].Link, items[i].Content, items[i].Type, items[i].CreatedAt,
			).Error; err != nil {
				return err
			}
		}
		return nil
	})
}

func (r *XStreamRepository) List(limit, offset int, itemType string) ([]XStreamItemModel, error) {
	var out []XStreamItemModel
	q := r.db.DB.Order("pub_date DESC")
	if itemType != "" && itemType != "all" {
		q = q.Where("type = ?", itemType)
	}
	err := q.Limit(limit).Offset(offset).Find(&out).Error
	return out, err
}

// CountSince returns items with remote_id > sinceId (optional type filter).
func (r *XStreamRepository) CountSince(sinceId int64, itemType string) (int64, error) {
	var count int64
	q := r.db.DB.Model(&XStreamItemModel{}).Where("remote_id > ?", sinceId)
	if itemType != "" && itemType != "all" {
		q = q.Where("type = ?", itemType)
	}
	return count, q.Count(&count).Error
}

// GetPushLastSentMaxID returns persisted W6 push cursor for a dashboard session.
func (r *XStreamRepository) GetPushLastSentMaxID(sessionID string) (int64, error) {
	if sessionID == "" {
		return 0, nil
	}
	var row DashboardPushStateModel
	err := r.db.DB.Where("session_id = ?", sessionID).First(&row).Error
	if err == gorm.ErrRecordNotFound {
		return 0, nil
	}
	if err != nil {
		return 0, err
	}
	return row.LastSentMaxID, nil
}

// SetPushLastSentMaxID persists W6 push cursor after a successful scheduled push.
func (r *XStreamRepository) SetPushLastSentMaxID(sessionID string, maxID int64) error {
	if sessionID == "" {
		return nil
	}
	now := time.Now().UTC()
	return r.db.DB.Save(&DashboardPushStateModel{
		SessionID:     sessionID,
		LastSentMaxID: maxID,
		UpdatedAt:     now,
	}).Error
}

// ListSince returns items with remote_id > sinceId, ordered newest first.
func (r *XStreamRepository) ListSince(sinceId int64, limit int, itemType string) ([]XStreamItemModel, error) {
	var out []XStreamItemModel
	q := r.db.DB.Where("remote_id > ?", sinceId)
	if itemType != "" && itemType != "all" {
		q = q.Where("type = ?", itemType)
	}
	err := q.Order("pub_date DESC").Limit(limit).Find(&out).Error
	return out, err
}

// ListSincePubDate returns items with pub_date >= pubDateGTE and optional remote_id > minRemoteID.
func (r *XStreamRepository) ListSincePubDate(pubDateGTE string, minRemoteID int64, limit int) ([]XStreamItemModel, error) {
	if limit <= 0 {
		limit = 500
	}
	var out []XStreamItemModel
	q := r.db.DB.Where("pub_date >= ?", pubDateGTE)
	if minRemoteID > 0 {
		q = q.Where("remote_id > ?", minRemoteID)
	}
	err := q.Order("pub_date DESC").Limit(limit).Find(&out).Error
	return out, err
}

// ListContentSince24h returns content from items with pub_date within the last 24 hours (Asia/Shanghai).
func (r *XStreamRepository) ListContentSince24h(maxRows int) ([]string, error) {
	if maxRows <= 0 {
		maxRows = 5000
	}
	loc, err := time.LoadLocation("Asia/Shanghai")
	if err != nil {
		loc = time.FixedZone("CST", 8*3600)
	}
	sinceStr := time.Now().In(loc).Add(-24 * time.Hour).Format("2006-01-02 15:04:05")

	var items []XStreamItemModel
	q := r.db.DB.Where("pub_date >= ?", sinceStr).Order("pub_date DESC").Limit(maxRows)
	if err := q.Find(&items).Error; err != nil {
		return nil, err
	}

	// 若严格 24h 无数据（时区/入库延迟），回退为最近一批推文
	if len(items) == 0 {
		if err := r.db.DB.Order("pub_date DESC").Limit(maxRows).Find(&items).Error; err != nil {
			return nil, err
		}
	}

	out := make([]string, 0, len(items))
	for _, item := range items {
		if c := strings.TrimSpace(item.Content); c != "" {
			out = append(out, c)
		}
	}
	return out, nil
}

func (r *XStreamRepository) CountAll() (int64, error) {
	var count int64
	err := r.db.DB.Model(&XStreamItemModel{}).Count(&count).Error
	return count, err
}

func (r *XStreamRepository) DeleteAll() error {
	return r.db.DB.Where("1 = 1").Delete(&XStreamItemModel{}).Error
}

func (r *XStreamRepository) GetLatestID() (int64, error) {
	var maxID int64
	err := r.db.DB.Model(&XStreamItemModel{}).Select("COALESCE(MAX(remote_id), 0)").Scan(&maxID).Error
	return maxID, err
}

// GetMinID returns the smallest remote_id in DB (0 if empty).
func (r *XStreamRepository) GetMinID() (int64, error) {
	var minID int64
	err := r.db.DB.Model(&XStreamItemModel{}).Select("COALESCE(MIN(remote_id), 0)").Scan(&minID).Error
	return minID, err
}

func (r *XStreamRepository) GetTypeCounts() (map[string]int, error) {
	var rows []struct {
		Type  string
		Count int
	}
	if err := r.db.DB.Model(&XStreamItemModel{}).Select("type, COUNT(*) as count").Group("type").Scan(&rows).Error; err != nil {
		return nil, err
	}
	counts := make(map[string]int, len(rows))
	for _, r := range rows {
		counts[r.Type] = r.Count
	}
	return counts, nil
}

func (r *XStreamRepository) GetResponse(limit, offset int, itemType string) (*XStreamResponse, error) {
	items, err := r.List(limit, offset, itemType)
	if err != nil {
		return nil, err
	}
	types, err := r.GetTypeCounts()
	if err != nil {
		return nil, err
	}
	hasMore := len(items) == limit
	return &XStreamResponse{
		Items:   items,
		Types:   types,
		HasMore: hasMore,
	}, nil
}

// GetResponseSince returns items newer than sinceId, for incremental fetching.
func (r *XStreamRepository) GetResponseSince(sinceId int64, limit int, itemType string) (*XStreamResponse, error) {
	items, err := r.ListSince(sinceId, limit, itemType)
	if err != nil {
		return nil, err
	}
	types, err := r.GetTypeCounts()
	if err != nil {
		return nil, err
	}
	hasMore := len(items) == limit
	return &XStreamResponse{
		Items:   items,
		Types:   types,
		HasMore: hasMore,
	}, nil
}

// XStreamResponse is the frontend API response.
type XStreamResponse struct {
	Items   []XStreamItemModel `json:"items"`
	Types   map[string]int     `json:"types"`
	HasMore bool               `json:"hasMore"`
}

// XStreamAPIResponse represents the API response from the monitor stream.
type XStreamAPIResponse struct {
	Errcode int            `json:"errcode"`
	Errmsg  string         `json:"errmsg"`
	Data    XStreamAPIData `json:"data"`
}

type XStreamAPIData struct {
	List        []XStreamAPIItem `json:"list"`
	NextSinceID *int64           `json:"nextSinceId"`
	HasMore     bool             `json:"hasMore"`
}

type XStreamAPIItem struct {
	ID       int64  `json:"id"`
	UserName string `json:"userName"`
	UserID   string `json:"userId"`
	PubDate  string `json:"pubDate"`
	Link     string `json:"link"`
	Content  string `json:"content"`
	Type     string `json:"type"`
}

// ToModel converts API item to store model.
func (item *XStreamAPIItem) ToModel() XStreamItemModel {
	parsed, _ := time.Parse("2006-01-02 15:04:05", item.PubDate)
	if parsed.IsZero() {
		parsed = time.Now().UTC()
	}
	return XStreamItemModel{
		UUID:     generateUUID(item.ID),
		RemoteID: item.ID,
		UserName: item.UserName,
		UserID:   item.UserID,
		PubDate:  item.PubDate,
		Link:     item.Link,
		Content:  item.Content,
		Type:     item.Type,
		CreatedAt: parsed,
	}
}

func generateUUID(remoteID int64) string {
	return fmt.Sprintf("xstream-%d", remoteID)
}
