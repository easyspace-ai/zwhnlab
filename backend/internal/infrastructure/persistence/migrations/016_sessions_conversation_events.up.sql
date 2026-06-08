-- AIChat session timeline (append-only events JSON)
ALTER TABLE sessions ADD COLUMN conversation_events TEXT NULL;
