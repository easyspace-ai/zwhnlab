package w6

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"sync"
	"time"
)

// Event is one SSE payload for sub-agent UI.
type Event struct {
	Type           string   `json:"type"`
	Message        string   `json:"message,omitempty"`
	Token          string   `json:"token,omitempty"`
	Progress       int      `json:"progress,omitempty"`
	Markdown       string   `json:"markdown,omitempty"`
	ReportHTML     string   `json:"reportHtml,omitempty"`
	PreviewFile    string   `json:"previewFile,omitempty"`
	ReportURL      string   `json:"reportUrl,omitempty"`
	FollowUps      []string `json:"followUps,omitempty"`
	RoundTitle     string   `json:"roundTitle,omitempty"`
	SubAgentStatus string   `json:"subAgentStatus,omitempty"`
	Timestamp      int64    `json:"timestamp"`
}

// Hub broadcasts W6 stream events per dashboard session.
type Hub struct {
	mu        sync.RWMutex
	subs      map[string]map[chan Event]struct{}
	history   map[string][]Event
	persister StreamPersister
}

func NewHub(p StreamPersister) *Hub {
	return &Hub{
		subs:      make(map[string]map[chan Event]struct{}),
		history:   make(map[string][]Event),
		persister: p,
	}
}

func (h *Hub) Publish(sessionID string, ev Event) {
	ev.Timestamp = time.Now().UnixMilli()
	h.mu.Lock()
	if ev.Type == "status" {
		hist := h.history[sessionID]
		if len(hist) > 0 {
			prev := hist[len(hist)-1]
			if prev.Type == ev.Type && prev.Message == ev.Message && prev.Progress == ev.Progress {
				h.mu.Unlock()
				return
			}
		}
	}
	h.history[sessionID] = append(h.history[sessionID], ev)
	if len(h.history[sessionID]) > 500 {
		h.history[sessionID] = h.history[sessionID][len(h.history[sessionID])-500:]
	}
	for ch := range h.subs[sessionID] {
		// Never drop terminal events — chat SSE may be slow while tokens fill the buffer.
		if ev.Type == "done" || ev.Type == "error" || ev.Type == "stopped" {
			ch <- ev
			continue
		}
		select {
		case ch <- ev:
		default:
		}
	}
	h.mu.Unlock()

	if h.persister != nil {
		h.persister.AppendStreamEvent(sessionID, StreamPersistEvent{
			Type:      ev.Type,
			Message:   ev.Message,
			Token:     ev.Token,
			Progress:  ev.Progress,
			Timestamp: ev.Timestamp,
		})
	}
}

func (h *Hub) Subscribe(sessionID string) chan Event {
	ch := make(chan Event, 64)
	h.mu.Lock()
	defer h.mu.Unlock()
	if h.subs[sessionID] == nil {
		h.subs[sessionID] = make(map[chan Event]struct{})
	}
	h.subs[sessionID][ch] = struct{}{}
	return ch
}

func (h *Hub) Unsubscribe(sessionID string, ch chan Event) {
	h.mu.Lock()
	defer h.mu.Unlock()
	delete(h.subs[sessionID], ch)
	close(ch)
}

func (h *Hub) ClearRound(sessionID string) {
	h.mu.Lock()
	delete(h.history, sessionID)
	h.mu.Unlock()
	if h.persister != nil {
		h.persister.ClearStreamHistory(sessionID)
	}
}

func (h *Hub) History(sessionID string) []Event {
	h.mu.RLock()
	mem := h.history[sessionID]
	h.mu.RUnlock()
	if len(mem) > 0 {
		out := make([]Event, len(mem))
		copy(out, mem)
		return out
	}
	if h.persister == nil {
		return nil
	}
	persisted := h.persister.StreamHistory(sessionID)
	out := make([]Event, len(persisted))
	for i, pe := range persisted {
		out[i] = Event{
			Type:      pe.Type,
			Message:   pe.Message,
			Token:     pe.Token,
			Progress:  pe.Progress,
			Timestamp: pe.Timestamp,
		}
	}
	return out
}

// WriteSSE streams events to w (replay + live). Closes after done/error.
func (h *Hub) WriteSSE(w io.Writer, flusher http.Flusher, sessionID string, done <-chan struct{}) {
	for _, ev := range h.History(sessionID) {
		writeSSE(w, ev)
		if flusher != nil {
			flusher.Flush()
		}
	}
	ch := h.Subscribe(sessionID)
	defer h.Unsubscribe(sessionID, ch)
	for {
		select {
		case <-done:
			return
		case ev, open := <-ch:
			if !open {
				return
			}
			writeSSE(w, ev)
			if flusher != nil {
				flusher.Flush()
			}
			if ev.Type == "done" || ev.Type == "error" || ev.Type == "stopped" {
				return
			}
		}
	}
}

func writeSSE(w io.Writer, ev Event) {
	b, _ := json.Marshal(ev)
	fmt.Fprintf(w, "data: %s\n\n", b)
}
