package aichat

import (
	"context"
	"strings"
	"sync"

	"github.com/easyspace-ai/ylmnote/internal/application/osintdashboard/w6"
)

// W6Bridge copies W6 hub events into the aichat event store for the active round.
type W6Bridge struct {
	events     *EventStore
	hub        *w6.Hub
	onComplete func(sessionID, roundID string)
	mu         sync.Mutex
	active     map[string]string // sessionID -> roundID
}

func NewW6Bridge(events *EventStore, hub *w6.Hub, onComplete func(sessionID, roundID string)) *W6Bridge {
	return &W6Bridge{
		events:     events,
		hub:        hub,
		onComplete: onComplete,
		active:     map[string]string{},
	}
}

func (b *W6Bridge) Bind(sessionID, roundID string) {
	b.mu.Lock()
	b.active[sessionID] = roundID
	b.mu.Unlock()
}

func (b *W6Bridge) Unbind(sessionID string) {
	b.mu.Lock()
	delete(b.active, sessionID)
	b.mu.Unlock()
}

func (b *W6Bridge) RoundID(sessionID string) string {
	b.mu.Lock()
	defer b.mu.Unlock()
	return b.active[sessionID]
}

// Watch subscribes to hub events until terminal or ctx done.
func (b *W6Bridge) Watch(ctx context.Context, sessionID string) {
	roundID := b.RoundID(sessionID)
	if roundID == "" {
		return
	}
	ch := b.hub.Subscribe(sessionID)
	defer b.hub.Unsubscribe(sessionID, ch)

	for _, ev := range b.hub.History(sessionID) {
		b.ingest(sessionID, roundID, ev)
		if ev.Type == "done" || ev.Type == "error" || ev.Type == "stopped" {
			b.finish(sessionID, roundID, ev)
			return
		}
	}

	for {
		select {
		case <-ctx.Done():
			return
		case ev, ok := <-ch:
			if !ok {
				return
			}
			b.ingest(sessionID, roundID, ev)
			if ev.Type == "done" || ev.Type == "error" || ev.Type == "stopped" {
				b.finish(sessionID, roundID, ev)
				return
			}
		}
	}
}

func (b *W6Bridge) ingest(sessionID, roundID string, ev w6.Event) {
	logType := ev.Type
	body := strings.TrimSpace(ev.Message)
	if body == "" {
		body = strings.TrimSpace(ev.Token)
	}
	if body == "" && logType != "done" {
		return
	}
	_, _ = b.events.AppendW6Log(sessionID, roundID, logType, body, ev.Progress)
}

func (b *W6Bridge) finish(sessionID, roundID string, ev w6.Event) {
	status := W6StatusDone
	reason := SealTerminal
	switch ev.Type {
	case "error":
		status = W6StatusError
	case "stopped":
		status = W6StatusStopped
		reason = SealStopped
	}
	_, _ = b.events.AppendW6Status(sessionID, roundID, status)
	// INV-2: follow_ups only after round_sealed.
	_, _ = b.events.AppendRoundSealed(sessionID, roundID, reason)

	title := ev.RoundTitle
	if title == "" {
		title = "调研报告"
	}
	htmlID := strings.TrimSpace(ev.ReportURL)
	if htmlID == sessionID {
		htmlID = ""
	}
	if htmlID != "" {
		_, _ = b.events.AppendReportReady(sessionID, roundID, title, "", htmlID)
	}
	if len(ev.FollowUps) > 0 {
		_, _ = b.events.AppendFollowUps(sessionID, roundID, ev.FollowUps)
	}
	if b.onComplete != nil {
		b.onComplete(sessionID, roundID)
	}
	b.Unbind(sessionID)
}
