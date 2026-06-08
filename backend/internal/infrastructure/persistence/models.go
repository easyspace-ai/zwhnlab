package persistence

import (
	"database/sql/driver"
	"encoding/json"
	"errors"
	"time"
)

// UserModel GORM 用户表模型
type UserModel struct {
	ID               string    `gorm:"primaryKey"`
	Username         string    `gorm:"uniqueIndex;not null"`
	Email            string    `gorm:"uniqueIndex;not null"`
	HashedPassword   string    `gorm:"not null"`
	SubscriptionPlan string    `gorm:"not null;default:free"`
	CreditsBalance   int       `gorm:"not null;default:1000"`
	CreditsUsed      int       `gorm:"not null;default:0"`
	Role             string    `gorm:"not null;default:user"`
	Disabled         bool      `gorm:"not null;default:false"`
	CreatedAt        time.Time `gorm:"not null"`
	UpdatedAt        time.Time `gorm:"not null"`
}

func (UserModel) TableName() string { return "users" }

// RoleModel 角色/权限组表
type RoleModel struct {
	ID           string    `gorm:"primaryKey"`
	Name         string    `gorm:"uniqueIndex;not null"`
	Description  *string   `gorm:"type:text"`
	Permissions  JSONSlice `gorm:"type:text"`
	SkillGroupID *string   `gorm:""`
	CreatedAt    time.Time `gorm:"not null"`
	UpdatedAt    time.Time `gorm:"not null"`
}

func (RoleModel) TableName() string { return "roles" }

// UserRoleModel 用户-角色关联表
type UserRoleModel struct {
	UserID string `gorm:"primaryKey"`
	RoleID string `gorm:"primaryKey"`
}

func (UserRoleModel) TableName() string { return "user_roles" }

// SkillGroupModel 技能组表
type SkillGroupModel struct {
	ID          string    `gorm:"primaryKey"`
	Name        string    `gorm:"not null"`
	Description *string   `gorm:"type:text"`
	SkillIDs    JSONSlice `gorm:"type:text"`
	RoleID      *string   `gorm:""`
	CreatedAt   time.Time `gorm:"not null"`
	UpdatedAt   time.Time `gorm:"not null"`
}

func (SkillGroupModel) TableName() string { return "skill_groups" }

// ProjectModel GORM 笔记表模型
type ProjectModel struct {
	ID                      string    `gorm:"primaryKey"`
	UserID                  string    `gorm:"index;not null"`
	Name                    string    `gorm:"not null"`
	Description             *string   `gorm:"type:text"`
	CoverImage              *string   `gorm:""`
	Status                  string    `gorm:"not null;default:active"`
	PolymarketSavedEventID  *string   `gorm:"index"`
	CreatedAt               time.Time `gorm:"not null"`
	UpdatedAt               time.Time `gorm:"not null"`
}

func (ProjectModel) TableName() string { return "projects" }

// SessionModel GORM 会话表模型
type SessionModel struct {
	ID            string    `gorm:"primaryKey"`
	ProjectID     string    `gorm:"index;not null"`
	Title         string    `gorm:"not null"`
	SkillKey      *string   `gorm:"size:64"`
	WorkflowState       string    `gorm:"type:text"`
	ConversationEvents  string    `gorm:"type:text"`
	CreatedAt           time.Time `gorm:"not null"`
	UpdatedAt     time.Time `gorm:"not null"`
}

func (SessionModel) TableName() string { return "sessions" }

// MessageModel GORM 消息表模型
type MessageModel struct {
	ID          string    `gorm:"primaryKey"`
	UpstreamID  *string   `gorm:"column:upstream_message_id;index"`
	ProjectID   string    `gorm:"index;not null"`
	SessionID   string    `gorm:"index;not null"`
	Role        string    `gorm:"not null"`
	Content     string    `gorm:"type:text;not null"`
	SkillID     *string   `gorm:""`
	Attachments string    `gorm:"type:text"`
	CreatedAt   time.Time `gorm:"not null"`
}

func (MessageModel) TableName() string { return "messages" }

// ResourceModel GORM 资源表模型
type ResourceModel struct {
	ID        string    `gorm:"primaryKey"`
	ProjectID string    `gorm:"index;not null"`
	SessionID *string   `gorm:"index"`
	Type      string    `gorm:"not null"`
	Name      string    `gorm:"not null"`
	Content   *string   `gorm:"type:text"`
	URL       *string   `gorm:""`
	Size      *string   `gorm:""`
	CreatedAt time.Time `gorm:"not null"`
}

func (ResourceModel) TableName() string { return "resources" }

// TransactionModel 积分流水
type TransactionModel struct {
	ID                string    `gorm:"primaryKey"`
	UserID            string    `gorm:"index;not null"`
	Amount            int       `gorm:"not null"`
	Reason            string    `gorm:"not null"`
	PromptTokens      *int      `gorm:"column:prompt_tokens"`
	CompletionTokens  *int      `gorm:"column:completion_tokens"`
	ModelID           *string   `gorm:"column:model_id"`
	ProjectID         *string   `gorm:"column:project_id"`
	MessageID         *string   `gorm:"column:message_id"`
	CreatedAt         time.Time `gorm:"not null"`
}

func (TransactionModel) TableName() string { return "transactions" }

// PromptTemplateModel GORM Studio 提示词模板表模型
type PromptTemplateModel struct {
	ID         string    `gorm:"primaryKey"`
	UserID     string    `gorm:"index;not null"`
	ActionType string    `gorm:"index;not null"`
	Name       string    `gorm:"not null"`
	Prompt     string    `gorm:"type:text;not null"`
	CreatedAt  time.Time `gorm:"not null"`
	UpdatedAt  time.Time `gorm:"not null"`
}

func (PromptTemplateModel) TableName() string { return "prompt_templates" }

// SkillModel GORM 技能表模型
type SkillModel struct {
	ID            string    `gorm:"primaryKey"`
	Name          string    `gorm:"not null"`
	Description   *string   `gorm:"type:text"`
	Icon          *string   `gorm:""`
	Category      string    `gorm:"not null;default:other"`
	Author        *string   `gorm:""`
	UsersCount    int       `gorm:"not null;default:0"`
	Rating        float64   `gorm:"not null;default:0"`
	Tags          JSONSlice `gorm:"type:text"`
	SystemPrompt  *string   `gorm:"type:text"`
	IsInstalled   bool      `gorm:"not null;default:false"`
	IsPersonal    bool      `gorm:"not null;default:false"`
	IsRecommended bool      `gorm:"not null;default:false"`
	CreatedAt     time.Time `gorm:"not null"`
	UpdatedAt     time.Time `gorm:"not null"`
}

func (SkillModel) TableName() string { return "skills" }

// IntelligenceSkillModel GORM 情报技能表模型
type IntelligenceSkillModel struct {
	ID             string    `gorm:"primaryKey"`
	UserID         string    `gorm:"index;not null"`
	Key            string    `gorm:"not null"`
	Name           string    `gorm:"not null"`
	Description    *string   `gorm:"type:text"`
	Icon           *string   `gorm:""`
	FormSchema     string    `gorm:"type:text;not null;default:'{}'"`
	PromptTemplate string    `gorm:"type:text;not null;default:''"`
	IsEnabled      bool      `gorm:"not null;default:true"`
	SortOrder      int       `gorm:"not null;default:0"`
	CreatedAt      time.Time `gorm:"not null"`
	UpdatedAt      time.Time `gorm:"not null"`
}

func (IntelligenceSkillModel) TableName() string { return "intelligence_skills" }

// PolymarketSavedEventModel GORM Polymarket 保存事件模型
type PolymarketSavedEventModel struct {
	ID             string    `gorm:"primaryKey"`
	EventSlug      string    `gorm:"not null"`
	EventID        string    `gorm:""`
	ConditionID    string    `gorm:"uniqueIndex;not null"`
	MarketSlug     string    `gorm:""`
	Title          string    `gorm:"not null"`
	ImageURL       string    `gorm:""`
	ClobTokenIDs   JSONSlice `gorm:"type:text;not null"`
	YesPct         float64   `gorm:"not null"`
	NoPct          float64   `gorm:"not null"`
	Volume         float64   `gorm:"not null"`
	RulesText      string    `gorm:"type:text;not null;default:''"`
	BackgroundText string    `gorm:"type:text;not null;default:''"`
	AIProjectID    string    `gorm:"column:ai_project_id;not null;default:''"`
	AISessionID    string    `gorm:"column:ai_session_id;not null;default:''"`
	CreatedAt      time.Time `gorm:"not null"`
	UpdatedAt      time.Time `gorm:"not null"`
}

func (PolymarketSavedEventModel) TableName() string { return "polymarket_saved_events" }

// XStreamItemModel GORM XStream 信息流模型
type XStreamItemModel struct {
	ID        int64     `gorm:"primaryKey;autoIncrement" json:"id"`
	UUID      string    `gorm:"unique;not null" json:"uuid"`
	RemoteID  int64     `gorm:"not null" json:"remoteId"`
	UserName  string    `gorm:"not null" json:"userName"`
	UserID    string    `gorm:"not null" json:"userId"`
	PubDate   string    `gorm:"not null" json:"pubDate"`
	Link      string    `gorm:"not null" json:"link"`
	Content   string    `gorm:"type:text;not null" json:"content"`
	Type      string    `gorm:"not null" json:"type"`
	CreatedAt time.Time `gorm:"not null" json:"createdAt"`
}

func (XStreamItemModel) TableName() string { return "xstream_items" }

// DashboardTopicModel GORM Dashboard 专题模型
type DashboardTopicModel struct {
	ID          int64     `gorm:"primaryKey;autoIncrement" json:"id"`
	UserID      string    `gorm:"index;not null" json:"userId"`
	Name        string    `gorm:"not null" json:"name"`
	Description string    `gorm:"type:text" json:"description"`
	CreatedAt   time.Time `gorm:"not null" json:"createdAt"`
	UpdatedAt   time.Time `gorm:"not null" json:"updatedAt"`
}

func (DashboardTopicModel) TableName() string { return "dashboard_topics" }

// DashboardPushStateModel 记录 W6 定时聚合推送已发送到的最大 remote_id
type DashboardPushStateModel struct {
	SessionID      string    `gorm:"primaryKey" json:"sessionId"`
	LastSentMaxID  int64     `gorm:"not null;default:0" json:"lastSentMaxId"`
	UpdatedAt      time.Time `gorm:"not null" json:"updatedAt"`
}

func (DashboardPushStateModel) TableName() string { return "dashboard_push_state" }

// ScoredContentModel GORM Dashboard 评分内容模型（由外部程序写入）
type ScoredContentModel struct {
	ID       int64     `gorm:"primaryKey;autoIncrement" json:"id"`
	Title    string    `gorm:"not null" json:"title"`
	Category string    `gorm:"not null" json:"category"`
	Score    int       `gorm:"not null" json:"score"`
	Date     string    `gorm:"not null" json:"date"`
	CreatedAt time.Time `gorm:"not null" json:"createdAt"`
}

func (ScoredContentModel) TableName() string { return "scored_content" }

// JSONSlice 用于 GORM 读写 []string 到 json (SQLite)
type JSONSlice []string

func (s JSONSlice) Value() (driver.Value, error) {
	if s == nil {
		return nil, nil
	}
	return json.Marshal(s)
}

func (s *JSONSlice) Scan(value interface{}) error {
	if value == nil {
		*s = nil
		return nil
	}
	bytes, ok := value.([]byte)
	if !ok {
		// SQLite 有时返回 string
		str, ok := value.(string)
		if !ok {
			return errors.New("invalid type for JSONSlice")
		}
		bytes = []byte(str)
	}
	return json.Unmarshal(bytes, s)
}
