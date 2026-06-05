CREATE TABLE IF NOT EXISTS intelligence_skills (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    key TEXT NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    icon TEXT,
    form_schema TEXT NOT NULL DEFAULT '{}',
    prompt_template TEXT NOT NULL DEFAULT '',
    is_enabled BOOLEAN NOT NULL DEFAULT 1,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_intelligence_skills_user_id ON intelligence_skills(user_id);
CREATE INDEX IF NOT EXISTS idx_intelligence_skills_key ON intelligence_skills(key);
CREATE UNIQUE INDEX IF NOT EXISTS idx_intelligence_skills_user_key ON intelligence_skills(user_id, key);