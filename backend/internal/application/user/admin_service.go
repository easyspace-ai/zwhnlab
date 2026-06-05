package user

import (
	"crypto/rand"
	"encoding/hex"
	"errors"
	"time"

	"github.com/easyspace-ai/ylmnote/internal/domain/user"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

var (
	ErrUserNotFound       = errors.New("user not found")
	ErrUsernameExists     = errors.New("username already exists")
	ErrCannotDeleteAdmin  = errors.New("cannot delete the last admin")
	ErrCannotDemoteAdmin  = errors.New("cannot demote the last admin")
	ErrInvalidCredits     = errors.New("credits balance cannot be negative")
	ErrPasswordTooShort   = errors.New("password must be at least 6 characters")
)

// AdminService 用户管理应用服务（仅管理员使用）
type AdminService struct {
	repo user.Repository
}

func NewAdminService(repo user.Repository) *AdminService {
	return &AdminService{repo: repo}
}

// CreateUserInput 创建用户入参
type CreateUserInput struct {
	Username string
	Email    string
	Password string
	Role     string
}

// CreateUser 管理员创建用户（密码为空时自动生成）
func (s *AdminService) CreateUser(in CreateUserInput) (*user.User, string, error) {
	exists, err := s.repo.ExistsByUsernameOrEmail(in.Username, in.Email)
	if err != nil {
		return nil, "", err
	}
	if exists {
		return nil, "", ErrUsernameExists
	}

	plainPassword := in.Password
	if plainPassword == "" {
		plainPassword = generateRandomPassword(12)
	}

	hashed, err := bcrypt.GenerateFromPassword([]byte(plainPassword), bcrypt.DefaultCost)
	if err != nil {
		return nil, "", err
	}

	role := in.Role
	if role == "" {
		role = "user"
	}

	now := time.Now().UTC()
	u := &user.User{
		ID:               uuid.NewString(),
		Username:         in.Username,
		Email:            in.Email,
		HashedPassword:   string(hashed),
		SubscriptionPlan: "free",
		CreditsBalance:   1000,
		CreditsUsed:      0,
		Role:             role,
		Disabled:         false,
		CreatedAt:        now,
		UpdatedAt:        now,
	}
	if err := s.repo.Create(u); err != nil {
		return nil, "", err
	}
	return u, plainPassword, nil
}

// ResetPassword 重置用户密码（newPassword 为空时自动生成；否则使用指定密码）
func (s *AdminService) ResetPassword(userID string, newPassword string) (string, error) {
	u, err := s.repo.GetByID(userID)
	if err != nil {
		return "", ErrUserNotFound
	}
	if newPassword == "" {
		newPassword = generateRandomPassword(12)
	} else if len(newPassword) < 6 {
		return "", ErrPasswordTooShort
	}
	hashed, err := bcrypt.GenerateFromPassword([]byte(newPassword), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	u.HashedPassword = string(hashed)
	u.UpdatedAt = time.Now().UTC()
	if err := s.repo.Update(u); err != nil {
		return "", err
	}
	return newPassword, nil
}

// ToggleDisable 启用/禁用用户
func (s *AdminService) ToggleDisable(userID string) (*user.User, error) {
	u, err := s.repo.GetByID(userID)
	if err != nil {
		return nil, ErrUserNotFound
	}
	u.Disabled = !u.Disabled
	u.UpdatedAt = time.Now().UTC()
	if err := s.repo.Update(u); err != nil {
		return nil, err
	}
	return u, nil
}

// DeleteUser 删除用户
func (s *AdminService) DeleteUser(userID string) error {
	u, err := s.repo.GetByID(userID)
	if err != nil {
		return ErrUserNotFound
	}
	if u.IsAdmin() {
		if err := s.ensureMoreThanOneAdmin(); err != nil {
			return ErrCannotDeleteAdmin
		}
	}
	return s.repo.Delete(userID)
}

// ListUsers 列出所有用户
func (s *AdminService) ListUsers() ([]*user.User, error) {
	return s.repo.ListAll()
}

// UpdateUserInput 更新用户入参
type UpdateUserInput struct {
	UserID         string
	Username       string
	Email          string
	Role           string
	CreditsBalance int
	Disabled       bool
}

// UpdateUser 管理员更新用户信息
func (s *AdminService) UpdateUser(in UpdateUserInput) (*user.User, error) {
	u, err := s.repo.GetByID(in.UserID)
	if err != nil {
		return nil, ErrUserNotFound
	}

	exists, err := s.repo.ExistsByUsernameOrEmailExcept(in.UserID, in.Username, in.Email)
	if err != nil {
		return nil, err
	}
	if exists {
		return nil, ErrUsernameExists
	}

	role := in.Role
	if role == "" {
		role = u.Role
	}
	if role != "admin" && role != "user" {
		role = "user"
	}

	if u.IsAdmin() && role != "admin" {
		if err := s.ensureMoreThanOneAdmin(); err != nil {
			return nil, err
		}
	}

	if in.CreditsBalance < 0 {
		return nil, ErrInvalidCredits
	}

	u.Username = in.Username
	u.Email = in.Email
	u.Role = role
	u.CreditsBalance = in.CreditsBalance
	u.Disabled = in.Disabled
	u.UpdatedAt = time.Now().UTC()

	if err := s.repo.Update(u); err != nil {
		return nil, err
	}
	return u, nil
}

func (s *AdminService) ensureMoreThanOneAdmin() error {
	all, err := s.repo.ListAll()
	if err != nil {
		return err
	}
	adminCount := 0
	for _, au := range all {
		if au.IsAdmin() {
			adminCount++
		}
	}
	if adminCount <= 1 {
		return ErrCannotDemoteAdmin
	}
	return nil
}

// ChangePasswordInput 修改密码入参
type ChangePasswordInput struct {
	UserID      string
	OldPassword string
	NewPassword string
}

// ChangeOwnPassword 用户修改自己的密码
func (s *AdminService) ChangeOwnPassword(in ChangePasswordInput) error {
	u, err := s.repo.GetByID(in.UserID)
	if err != nil {
		return ErrUserNotFound
	}
	if err := bcrypt.CompareHashAndPassword([]byte(u.HashedPassword), []byte(in.OldPassword)); err != nil {
		return errors.New("旧密码不正确")
	}
	hashed, err := bcrypt.GenerateFromPassword([]byte(in.NewPassword), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	u.HashedPassword = string(hashed)
	u.UpdatedAt = time.Now().UTC()
	return s.repo.Update(u)
}

// EnsureAtLeastOneAdmin 若库中没有任何 admin，则创建默认管理员并打印密码
func (s *AdminService) EnsureAtLeastOneAdmin() (*user.User, string, error) {
	all, err := s.repo.ListAll()
	if err != nil {
		return nil, "", err
	}
	for _, u := range all {
		if u.IsAdmin() {
			return nil, "", nil
		}
	}
	if len(all) == 0 {
		return s.InitDefaultAdmin()
	}
	password := generateRandomPassword(12)
	u, _, err := s.CreateUser(CreateUserInput{
		Username: "admin",
		Email:    "admin@system.local",
		Password: password,
		Role:     "admin",
	})
	if err != nil {
		if err == ErrUsernameExists {
			existing, gerr := s.repo.GetByUsername("admin")
			if gerr != nil {
				return nil, "", gerr
			}
			existing.Role = "admin"
			existing.UpdatedAt = time.Now().UTC()
			if uerr := s.repo.Update(existing); uerr != nil {
				return nil, "", uerr
			}
			return existing, "", nil
		}
		return nil, "", err
	}
	return u, password, nil
}

// InitDefaultAdmin 系统初始化时创建默认管理员
func (s *AdminService) InitDefaultAdmin() (*user.User, string, error) {
	// 检查是否已有用户
	all, err := s.repo.ListAll()
	if err != nil {
		return nil, "", err
	}
	if len(all) > 0 {
		return nil, "", nil // 已有用户，跳过
	}

	password := generateRandomPassword(12)
	u, _, err := s.CreateUser(CreateUserInput{
		Username: "admin",
		Email:    "admin@system.local",
		Password: password,
		Role:     "admin",
	})
	if err != nil {
		return nil, "", err
	}
	return u, password, nil
}

func generateRandomPassword(length int) string {
	b := make([]byte, length)
	rand.Read(b)
	return hex.EncodeToString(b)[:length]
}
