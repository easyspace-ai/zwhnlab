package aichat

import (
	"context"
	"sync"
	"time"
)

// IdleWatcher runs the post-W6 finalize pipeline once workflow sub_agent_status
// has been non-running for SubAgentIdleSealDelay (see WorkflowIdleForSeal).
type IdleWatcher struct {
	events      *EventStore
	idleProbe   func(sessionID string) (idleForSeal bool, ok bool)
	onIdleReady func(sessionID, roundID string)
	mu          sync.Mutex
	watches     map[string]*idleWatch
}

type idleWatch struct {
	roundID string
	cancel  context.CancelFunc
}

func NewIdleWatcher(
	events *EventStore,
	idleProbe func(sessionID string) (idleForSeal bool, ok bool),
	onIdleReady func(sessionID, roundID string),
) *IdleWatcher {
	return &IdleWatcher{
		events:      events,
		idleProbe:   idleProbe,
		onIdleReady: onIdleReady,
		watches:     map[string]*idleWatch{},
	}
}

func (w *IdleWatcher) Track(sessionID, roundID string) {
	w.mu.Lock()
	defer w.mu.Unlock()
	if old, ok := w.watches[sessionID]; ok {
		old.cancel()
	}
	ctx, cancel := context.WithCancel(context.Background())
	w.watches[sessionID] = &idleWatch{
		roundID: roundID,
		cancel:  cancel,
	}
	go w.loop(ctx, sessionID, roundID)
}

func (w *IdleWatcher) Stop(sessionID string) {
	w.mu.Lock()
	defer w.mu.Unlock()
	if old, ok := w.watches[sessionID]; ok {
		old.cancel()
		delete(w.watches, sessionID)
	}
}

func (w *IdleWatcher) loop(ctx context.Context, sessionID, roundID string) {
	ticker := time.NewTicker(2 * time.Second)
	defer ticker.Stop()
	for {
		select {
		case <-ctx.Done():
			return
		case <-ticker.C:
			w.mu.Lock()
			watch := w.watches[sessionID]
			if watch == nil || watch.roundID != roundID {
				w.mu.Unlock()
				return
			}
			w.mu.Unlock()

			idleForSeal, ok := w.idleProbe(sessionID)
			if !ok || !idleForSeal {
				continue
			}
			if w.onIdleReady != nil {
				w.onIdleReady(sessionID, roundID)
			}
			st, _, _ := w.events.Load(sessionID)
			if st != nil && isRoundSealed(st.Events, roundID) {
				w.Stop(sessionID)
				return
			}
		}
	}
}
