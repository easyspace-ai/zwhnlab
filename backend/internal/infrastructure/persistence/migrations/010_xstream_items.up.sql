CREATE TABLE IF NOT EXISTS xstream_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    uuid TEXT UNIQUE NOT NULL,
    remote_id INTEGER NOT NULL,
    user_name TEXT NOT NULL,
    user_id TEXT NOT NULL,
    pub_date TEXT NOT NULL,
    link TEXT NOT NULL,
    content TEXT NOT NULL,
    type TEXT NOT NULL,
    created_at DATETIME NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_xstream_pub_date ON xstream_items(pub_date DESC);
CREATE INDEX IF NOT EXISTS idx_xstream_type ON xstream_items(type);
CREATE INDEX IF NOT EXISTS idx_xstream_uuid ON xstream_items(uuid);