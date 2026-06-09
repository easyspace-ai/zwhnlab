package aichat

import (
	"sync"
	"testing"

	domainproject "github.com/easyspace-ai/ylmnote/internal/domain/project"
)

type memSessionStore struct {
	mu     sync.Mutex
	states map[string]*ConversationState
}

func (m *memSessionStore) GetConversationState(sessionID string) (*ConversationState, *domainproject.Session, error) {
	m.mu.Lock()
	defer m.mu.Unlock()
	st, ok := m.states[sessionID]
	if !ok {
		st = NewConversationState()
		m.states[sessionID] = st
	}
	copy := *st
	copy.Events = append([]SessionEvent(nil), st.Events...)
	return &copy, &domainproject.Session{ID: sessionID}, nil
}

func (m *memSessionStore) SaveConversationState(sessionID string, state *ConversationState) error {
	m.mu.Lock()
	defer m.mu.Unlock()
	copy := *state
	copy.Events = append([]SessionEvent(nil), state.Events...)
	m.states[sessionID] = &copy
	return nil
}

func TestAppendRoundStarted_blocksSecondConcurrentStart(t *testing.T) {
	store := &memSessionStore{states: map[string]*ConversationState{}}
	events := NewEventStore(store)

	if _, err := events.AppendRoundStarted("s1", "r1", RoundKindDeepSeek, "hi", "hi", ""); err != nil {
		t.Fatalf("first start: %v", err)
	}
	_, err := events.AppendRoundStarted("s1", "r2", RoundKindDeepSeek, "again", "again", "")
	if err == nil {
		t.Fatal("expected INV-3 error for second round while first unsealed")
	}
}
