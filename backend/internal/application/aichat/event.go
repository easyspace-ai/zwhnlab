package aichat

import "encoding/json"

// RoundKind identifies how a conversation round was started.
type RoundKind string

const (
	RoundKindDeepSeek RoundKind = "deepseek"
	RoundKindW6Form   RoundKind = "w6_form"
	RoundKindW6Manual RoundKind = "w6_manual"
	RoundKindDiscuss  RoundKind = "discuss"
)

// W6Status is the sub-agent lifecycle for a round.
type W6Status string

const (
	W6StatusRunning W6Status = "running"
	W6StatusIdle    W6Status = "idle"
	W6StatusDone    W6Status = "done"
	W6StatusError   W6Status = "error"
	W6StatusStopped W6Status = "stopped"
)

// SealReason explains why a round was sealed.
type SealReason string

const (
	SealTerminal    SealReason = "terminal"
	SealIdle15s     SealReason = "idle_15s"
	SealStopped     SealReason = "stopped"
	SealReconciled  SealReason = "reconciled"
)

// SessionEvent is one append-only timeline entry (SSOT for /aichat UI).
type SessionEvent struct {
	Seq      int64           `json:"seq"`
	Type     string          `json:"type"`
	RoundID  string          `json:"round_id,omitempty"`
	At       int64           `json:"at"`
	Payload  json.RawMessage `json:"payload,omitempty"`
	// Flattened common fields for indexing (also in payload)
	Kind     string `json:"kind,omitempty"`
	Topic    string `json:"topic,omitempty"`
	Title    string `json:"title,omitempty"`
	Status   string `json:"status,omitempty"`
	LogType  string `json:"log_type,omitempty"`
	Body     string `json:"body,omitempty"`
	Progress int    `json:"progress,omitempty"`
	Delta    string `json:"delta,omitempty"`
	HTMLID   string `json:"html_id,omitempty"`
	MDID     string `json:"md_id,omitempty"`
	Questions []string `json:"questions,omitempty"`
	Reason   string `json:"reason,omitempty"`
	DraftID  string `json:"draft_id,omitempty"`
}

const (
	EventRoundStarted       = "round_started"
	EventFormPresented      = "form_presented"
	EventFormCancelled      = "form_cancelled"
	EventFormDraftSubmitted = "form_draft_submitted"
	EventFormSubmitted      = "form_submitted"
	EventW6Status        = "w6_status"
	EventW6Log           = "w6_log"
	EventAssistantDelta  = "assistant_delta"
	EventReportReady     = "report_ready"
	EventFollowUps       = "follow_ups"
	EventSessionTitle    = "session_title"
	EventRoundSealed     = "round_sealed"
)

// ConversationState persisted on sessions.conversation_events.
type ConversationState struct {
	Version       int            `json:"version"`
	NextSeq       int64          `json:"next_seq"`
	ActiveRoundID string         `json:"active_round_id,omitempty"`
	Events        []SessionEvent `json:"events"`
}

func NewConversationState() *ConversationState {
	return &ConversationState{Version: 1, NextSeq: 1, Events: []SessionEvent{}}
}

func (e *SessionEvent) MarshalPayload(v any) error {
	b, err := json.Marshal(v)
	if err != nil {
		return err
	}
	e.Payload = b
	return nil
}
