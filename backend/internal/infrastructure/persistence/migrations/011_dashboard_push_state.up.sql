-- 持久化 W6 聚合推送游标（重启后仍能累积未推送条目）
CREATE TABLE IF NOT EXISTS dashboard_push_state (
    session_id TEXT PRIMARY KEY NOT NULL,
    last_sent_max_id INTEGER NOT NULL DEFAULT 0,
    updated_at TEXT NOT NULL
);
