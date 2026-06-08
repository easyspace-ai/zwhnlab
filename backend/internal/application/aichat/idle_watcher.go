package aichat

import (
	"context"
	"sync"
	"time"
)

const IdleSealDuration = 15 * time.Second

// IdleWatcher seals rounds when w6_status stays non-running for 15s.
type IdleWatcher struct {
	events     *EventStore
	osintSub   func(sessionID string) (status string, ok bool)
	onIdleSeal func(sessionID, roundID string)
	mu         sync.Mutex
	watches    map[string]*idleWatch
}

type idleWatch struct {
	roundID      string
	lastRunning  time.Time
	cancel       context.CancelFunc
}

func NewIdleWatcher(
	events *EventStore,
	osintSub func(sessionID string) (status string, ok bool),
	onIdleSeal func(sessionID, roundID string),
) *IdleWatcher {
	return &IdleWatcher{
		events:     events,
		osintSub:   osintSub,
		onIdleSeal: onIdleSeal,
		watches:    map[string]*idleWatch{},
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
		roundID:     roundID,
		lastRunning: time.Now(),
		cancel:      cancel,
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
			status, ok := w.osintSub(sessionID)
			if !ok {
				continue
			}
			w.mu.Lock()
			watch := w.watches[sessionID]
			if watch == nil || watch.roundID != roundID {
				w.mu.Unlock()
				return
			}
			if status == "running" {
				watch.lastRunning = time.Now()
				w.mu.Unlock()
				continue
			}
			idleFor := time.Since(watch.lastRunning)
			w.mu.Unlock()
			if idleFor >= IdleSealDuration {
				_, _ = w.events.AppendW6Status(sessionID, roundID, W6StatusDone)
				_, _ = w.events.AppendRoundSealed(sessionID, roundID, SealIdle15s)
				if w.onIdleSeal != nil {
					w.onIdleSeal(sessionID, roundID)
				}
				w.Stop(sessionID)
				return
			}
		}
	}
}
