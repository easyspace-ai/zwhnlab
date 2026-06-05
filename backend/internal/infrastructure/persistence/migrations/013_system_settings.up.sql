-- 运行时系统开关（可由超级管理员在后台修改）
CREATE TABLE IF NOT EXISTS system_settings (
    key TEXT PRIMARY KEY NOT NULL,
    value TEXT NOT NULL
);

INSERT OR IGNORE INTO system_settings (key, value) VALUES ('registration_enabled', 'false');
