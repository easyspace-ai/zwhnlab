package w6

// StreamPersister stores sub-agent SSE events for replay (DB-backed in production).
type StreamPersister interface {
	AppendStreamEvent(sessionID string, ev StreamPersistEvent)
	StreamHistory(sessionID string) []StreamPersistEvent
	ClearStreamHistory(sessionID string)
}

// SessionStateReader provides W6 upstream/topic state for a dashboard session.
type SessionStateReader interface {
	GetTopic(sessionID string) string
	GetUpstreamW6ID(sessionID string) string
	EnsureTopic(sessionID, topic string)
	SetUpstreamW6ID(sessionID, upstream string) error
	UpdateMarkdown(sessionID, md, previewFile string) error
	SetSubAgentStatus(sessionID, status string) error
	SetFollowUps(sessionID string, followUps []string) error
	GetReportStyle(sessionID string) string
}

// StreamPersistEvent is the persisted subset of Event.
type StreamPersistEvent struct {
	Type      string
	Message   string
	Token     string
	Progress  int
	Timestamp int64
}
