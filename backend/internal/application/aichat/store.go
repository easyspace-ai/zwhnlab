package aichat

import (
	"encoding/json"
	"fmt"
	"strings"
	"sync"
	"time"

	domainproject "github.com/easyspace-ai/ylmnote/internal/domain/project"
)

// SessionStore loads and saves conversation_events on sessions.
type SessionStore interface {
	GetConversationState(sessionID string) (*ConversationState, *domainproject.Session, error)
	SaveConversationState(sessionID string, state *ConversationState) error
}

type RepoSessionStore struct {
	sessions domainproject.SessionRepository
	mu       sync.Mutex
}

func NewRepoSessionStore(sessions domainproject.SessionRepository) *RepoSessionStore {
	return &RepoSessionStore{sessions: sessions}
}

func ParseConversationState(raw string) *ConversationState {
	raw = strings.TrimSpace(raw)
	if raw == "" || raw == "{}" {
		return NewConversationState()
	}
	var st ConversationState
	if err := json.Unmarshal([]byte(raw), &st); err != nil {
		return NewConversationState()
	}
	if st.Events == nil {
		st.Events = []SessionEvent{}
	}
	if st.NextSeq < 1 {
		st.NextSeq = 1
	}
	return &st
}

func MarshalConversationState(st *ConversationState) string {
	if st == nil {
		return "{}"
	}
	b, err := json.Marshal(st)
	if err != nil {
		return "{}"
	}
	return string(b)
}

func (s *RepoSessionStore) GetConversationState(sessionID string) (*ConversationState, *domainproject.Session, error) {
	sess, err := s.sessions.GetByID(sessionID)
	if err != nil {
		return nil, nil, err
	}
	return ParseConversationState(sess.ConversationEvents), sess, nil
}

func (s *RepoSessionStore) SaveConversationState(sessionID string, state *ConversationState) error {
	s.mu.Lock()
	defer s.mu.Unlock()
	sess, err := s.sessions.GetByID(sessionID)
	if err != nil {
		return err
	}
	sess.ConversationEvents = MarshalConversationState(state)
	return s.sessions.Update(sess)
}

// EventStore appends timeline events with monotonic seq.
type EventStore struct {
	repo         SessionStore
	sessionLocks sync.Map // sessionID -> *sync.Mutex
}

func (e *EventStore) lockSession(sessionID string) func() {
	v, _ := e.sessionLocks.LoadOrStore(sessionID, &sync.Mutex{})
	mu := v.(*sync.Mutex)
	mu.Lock()
	return mu.Unlock
}

func NewEventStore(repo SessionStore) *EventStore {
	return &EventStore{repo: repo}
}

func (e *EventStore) Load(sessionID string) (*ConversationState, *domainproject.Session, error) {
	return e.repo.GetConversationState(sessionID)
}

func (e *EventStore) Append(sessionID string, build func(st *ConversationState, seq int64, at int64) SessionEvent) (*SessionEvent, error) {
	unlock := e.lockSession(sessionID)
	defer unlock()

	st, _, err := e.repo.GetConversationState(sessionID)
	if err != nil {
		return nil, err
	}
	seq := st.NextSeq
	at := time.Now().UnixMilli()
	ev := build(st, seq, at)
	ev.Seq = seq
	ev.At = at
	st.Events = append(st.Events, ev)
	st.NextSeq++
	st.Version++
	if err := e.repo.SaveConversationState(sessionID, st); err != nil {
		return nil, err
	}
	return &ev, nil
}

func (e *EventStore) LoadSince(sessionID string, sinceSeq int64) ([]SessionEvent, error) {
	st, _, err := e.repo.GetConversationState(sessionID)
	if err != nil {
		return nil, err
	}
	if sinceSeq <= 0 {
		return st.Events, nil
	}
	out := make([]SessionEvent, 0)
	for _, ev := range st.Events {
		if ev.Seq > sinceSeq {
			out = append(out, ev)
		}
	}
	return out, nil
}

func (e *EventStore) SetActiveRound(sessionID, roundID string) error {
	st, _, err := e.repo.GetConversationState(sessionID)
	if err != nil {
		return err
	}
	st.ActiveRoundID = roundID
	return e.repo.SaveConversationState(sessionID, st)
}

// AppendRoundStarted creates a new round and sets it active.
// ValidateStartRound runs in the same locked read-modify-write as the append (P0-1).
func (e *EventStore) AppendRoundStarted(sessionID, roundID string, kind RoundKind, topic, anchor string, skillKey string) (*SessionEvent, error) {
	unlock := e.lockSession(sessionID)
	defer unlock()

	st, _, err := e.repo.GetConversationState(sessionID)
	if err != nil {
		return nil, err
	}
	if err := ValidateStartRound(st, kind); err != nil {
		return nil, err
	}
	seq := st.NextSeq
	at := time.Now().UnixMilli()
	ev := SessionEvent{
		Type:    EventRoundStarted,
		RoundID: roundID,
		Kind:    string(kind),
		Topic:   topic,
		Body:    anchor,
		Payload: mustJSON(map[string]string{
			"skill_key": skillKey,
			"anchor":    anchor,
		}),
	}
	ev.Seq = seq
	ev.At = at
	st.ActiveRoundID = roundID
	st.Events = append(st.Events, ev)
	st.NextSeq++
	st.Version++
	if err := e.repo.SaveConversationState(sessionID, st); err != nil {
		return nil, err
	}
	return &ev, nil
}

func mustJSON(v any) json.RawMessage {
	b, _ := json.Marshal(v)
	return b
}

func (e *EventStore) AppendW6Status(sessionID, roundID string, status W6Status) (*SessionEvent, error) {
	st, _, err := e.repo.GetConversationState(sessionID)
	if err != nil {
		return nil, err
	}
	if strings.TrimSpace(st.ActiveRoundID) != roundID {
		return nil, fmt.Errorf("w6_status for non-active round (INV-4)")
	}
	return e.Append(sessionID, func(st *ConversationState, seq, at int64) SessionEvent {
		return SessionEvent{
			Type:    EventW6Status,
			RoundID: roundID,
			Status:  string(status),
		}
	})
}

// AppendW6StatusForRound appends terminal w6_status during reconcile when ActiveRoundID may already be cleared.
func (e *EventStore) AppendW6StatusForRound(sessionID, roundID string, status W6Status) (*SessionEvent, error) {
	if lastW6Status(loadEventsFromStore(e, sessionID), roundID) == string(status) {
		return nil, nil
	}
	return e.Append(sessionID, func(st *ConversationState, seq, at int64) SessionEvent {
		return SessionEvent{
			Type:    EventW6Status,
			RoundID: roundID,
			Status:  string(status),
		}
	})
}

func loadEventsFromStore(e *EventStore, sessionID string) []SessionEvent {
	st, _, err := e.Load(sessionID)
	if err != nil || st == nil {
		return nil
	}
	return st.Events
}

func (e *EventStore) AppendW6Log(sessionID, roundID, logType, body string, progress int) (*SessionEvent, error) {
	st, _, err := e.repo.GetConversationState(sessionID)
	if err != nil {
		return nil, err
	}
	if strings.TrimSpace(st.ActiveRoundID) != roundID {
		return nil, fmt.Errorf("w6_log for non-active round (INV-4)")
	}
	return e.Append(sessionID, func(st *ConversationState, seq, at int64) SessionEvent {
		return SessionEvent{
			Type:     EventW6Log,
			RoundID:  roundID,
			LogType:  logType,
			Body:     body,
			Progress: progress,
		}
	})
}

func (e *EventStore) AppendRoundSealed(sessionID, roundID string, reason SealReason) (*SessionEvent, error) {
	ev, err := e.Append(sessionID, func(st *ConversationState, seq, at int64) SessionEvent {
		if st.ActiveRoundID == roundID {
			st.ActiveRoundID = ""
		}
		return SessionEvent{
			Type:    EventRoundSealed,
			RoundID: roundID,
			Reason:  string(reason),
		}
	})
	return ev, err
}

func (e *EventStore) AppendFollowUps(sessionID, roundID string, questions []string) (*SessionEvent, error) {
	st, _, err := e.repo.GetConversationState(sessionID)
	if err != nil {
		return nil, err
	}
	if err := ValidateFollowUps(st, roundID); err != nil {
		return nil, err
	}
	return e.Append(sessionID, func(st *ConversationState, seq, at int64) SessionEvent {
		return SessionEvent{
			Type:      EventFollowUps,
			RoundID:   roundID,
			Questions: questions,
		}
	})
}

func (e *EventStore) AppendSessionTitle(sessionID, title string) (*SessionEvent, error) {
	return e.Append(sessionID, func(st *ConversationState, seq, at int64) SessionEvent {
		return SessionEvent{
			Type:  EventSessionTitle,
			Title: title,
		}
	})
}

func (e *EventStore) AppendReportReady(sessionID, roundID, title, mdID, htmlID string) (*SessionEvent, error) {
	st, _, err := e.Load(sessionID)
	if err != nil {
		return nil, err
	}
	if existing := findReportReadyEvent(st.Events, roundID, mdID, htmlID); existing != nil {
		return existing, nil
	}
	return e.Append(sessionID, func(st *ConversationState, seq, at int64) SessionEvent {
		return SessionEvent{
			Type:    EventReportReady,
			RoundID: roundID,
			Title:   title,
			MDID:    mdID,
			HTMLID:  htmlID,
		}
	})
}

func findReportReadyEvent(events []SessionEvent, roundID, mdID, htmlID string) *SessionEvent {
	roundID = strings.TrimSpace(roundID)
	htmlID = strings.TrimSpace(htmlID)
	mdID = strings.TrimSpace(mdID)
	for i := range events {
		ev := &events[i]
		if ev.Type != EventReportReady || strings.TrimSpace(ev.RoundID) != roundID {
			continue
		}
		evHTML := strings.TrimSpace(ev.HTMLID)
		evMD := strings.TrimSpace(ev.MDID)
		if htmlID != "" && evHTML == htmlID {
			return ev
		}
		if mdID != "" && evMD == mdID {
			return ev
		}
		if htmlID == "" && mdID == "" && (evHTML != "" || evMD != "") {
			return ev
		}
	}
	return nil
}

func (e *EventStore) AppendAssistantDelta(sessionID, roundID, delta string) (*SessionEvent, error) {
	return e.Append(sessionID, func(st *ConversationState, seq, at int64) SessionEvent {
		return SessionEvent{
			Type:    EventAssistantDelta,
			RoundID: roundID,
			Delta:   delta,
		}
	})
}
