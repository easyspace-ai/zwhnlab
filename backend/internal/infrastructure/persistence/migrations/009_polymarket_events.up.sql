CREATE TABLE IF NOT EXISTS polymarket_saved_events (
    id TEXT PRIMARY KEY,
    event_slug TEXT NOT NULL,
    event_id TEXT,
    condition_id TEXT NOT NULL UNIQUE,
    market_slug TEXT,
    title TEXT NOT NULL,
    image_url TEXT,
    clob_token_ids TEXT NOT NULL,
    yes_pct REAL NOT NULL,
    no_pct REAL NOT NULL,
    volume REAL NOT NULL,
    rules_text TEXT NOT NULL DEFAULT '',
    background_text TEXT NOT NULL DEFAULT '',
    ai_project_id TEXT NOT NULL DEFAULT '',
    ai_session_id TEXT NOT NULL DEFAULT '',
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_poly_saved_event_slug ON polymarket_saved_events(event_slug);
