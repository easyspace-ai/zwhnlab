package persistence

import (
	"strconv"
	"strings"
)

// SystemSettingsRepository 键值系统配置
type SystemSettingsRepository struct {
	db *DB
}

func NewSystemSettingsRepository(db *DB) *SystemSettingsRepository {
	return &SystemSettingsRepository{db: db}
}

func (r *SystemSettingsRepository) Get(key string) (string, bool) {
	var value string
	err := r.db.Model(&SystemSettingModel{}).Where("`key` = ?", key).Select("value").Scan(&value).Error
	if err != nil || strings.TrimSpace(value) == "" {
		return "", false
	}
	return value, true
}

func (r *SystemSettingsRepository) Set(key, value string) error {
	m := SystemSettingModel{Key: key, Value: value}
	return r.db.Save(&m).Error
}

func (r *SystemSettingsRepository) GetBool(key string, fallback bool) bool {
	raw, ok := r.Get(key)
	if !ok {
		return fallback
	}
	v, err := strconv.ParseBool(strings.TrimSpace(raw))
	if err != nil {
		return fallback
	}
	return v
}

// SystemSettingModel GORM 系统设置
type SystemSettingModel struct {
	Key   string `gorm:"primaryKey;column:key"`
	Value string `gorm:"not null"`
}

func (SystemSettingModel) TableName() string { return "system_settings" }
