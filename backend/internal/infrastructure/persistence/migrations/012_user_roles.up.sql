-- 012_user_roles.up.sql
-- 添加用户角色、权限组、技能组支持

ALTER TABLE users ADD COLUMN role TEXT NOT NULL DEFAULT 'user';
ALTER TABLE users ADD COLUMN disabled INTEGER NOT NULL DEFAULT 0;
-- SQLite 不允许 ALTER ADD COLUMN 使用非常量默认值（如 datetime('now')），先加列再回填
ALTER TABLE users ADD COLUMN updated_at DATETIME;
UPDATE users SET updated_at = COALESCE(created_at, datetime('now')) WHERE updated_at IS NULL;

CREATE TABLE roles (
    id TEXT PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    description TEXT,
    permissions TEXT NOT NULL DEFAULT '[]',
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL
);

CREATE TABLE user_roles (
    user_id TEXT NOT NULL,
    role_id TEXT NOT NULL,
    PRIMARY KEY (user_id, role_id)
);

CREATE TABLE skill_groups (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    skill_ids TEXT NOT NULL DEFAULT '[]',
    role_id TEXT,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL
);

-- 创建默认超级管理员角色
INSERT INTO roles (id, name, description, permissions, created_at, updated_at)
VALUES (
    'role_admin',
    '超级管理员',
    '系统超级管理员，拥有所有权限',
    '["menu_admin","user_manage","role_manage","skill_group_manage"]',
    datetime('now'),
    datetime('now')
);
