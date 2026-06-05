package user

import "time"

// User 用户聚合根
type User struct {
	ID               string
	Username         string
	Email            string
	HashedPassword   string
	SubscriptionPlan string
	CreditsBalance   int
	CreditsUsed      int
	Role             string
	Disabled         bool
	CreatedAt        time.Time
	UpdatedAt        time.Time
}

// IsAdmin 判断用户是否为超级管理员
func (u *User) IsAdmin() bool {
	return u.Role == "admin"
}
