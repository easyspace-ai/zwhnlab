package persistence

import (
	"strings"

	"gorm.io/gorm"
)

// UserRoleRepository 用户与权限组关联
type UserRoleRepository struct {
	db *DB
}

func NewUserRoleRepository(db *DB) *UserRoleRepository {
	return &UserRoleRepository{db: db}
}

func (r *UserRoleRepository) SetUserRoles(userID string, roleIDs []string) error {
	return r.db.Transaction(func(tx *gorm.DB) error {
		if err := tx.Where("user_id = ?", userID).Delete(&UserRoleModel{}).Error; err != nil {
			return err
		}
		for _, roleID := range roleIDs {
			roleID = strings.TrimSpace(roleID)
			if roleID == "" {
				continue
			}
			if err := tx.Create(&UserRoleModel{UserID: userID, RoleID: roleID}).Error; err != nil {
				return err
			}
		}
		return nil
	})
}

func (r *UserRoleRepository) ListRoleIDsByUser(userID string) ([]string, error) {
	var rows []UserRoleModel
	if err := r.db.Where("user_id = ?", userID).Find(&rows).Error; err != nil {
		return nil, err
	}
	out := make([]string, 0, len(rows))
	for _, row := range rows {
		out = append(out, row.RoleID)
	}
	return out, nil
}
