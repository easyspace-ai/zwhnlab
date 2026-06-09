package osintdashboard

import (
	"strings"
	"time"

	"github.com/easyspace-ai/ylmnote/internal/application/osintdashboard/ai"
	"github.com/easyspace-ai/ylmnote/internal/application/osintdashboard/render"
	"github.com/easyspace-ai/ylmnote/internal/application/osintdashboard/w6"
	"github.com/easyspace-ai/ylmnote/internal/domain/project"
)

// WorkflowStore persists W6 workflow fields on sessions.workflow_state.
type WorkflowStore struct {
	sessions project.SessionRepository
}

func NewWorkflowStore(sessions project.SessionRepository) *WorkflowStore {
	return &WorkflowStore{sessions: sessions}
}

func (w *WorkflowStore) load(sessionID string) (*project.Session, *WorkflowState, error) {
	sess, err := w.sessions.GetByID(sessionID)
	if err != nil {
		return nil, nil, err
	}
	ws := ParseWorkflowState(sess.WorkflowState)
	return sess, ws, nil
}

func (w *WorkflowStore) save(sess *project.Session, ws *WorkflowState) error {
	sess.WorkflowState = MarshalWorkflowState(ws)
	sess.UpdatedAt = time.Now().UTC()
	return w.sessions.Update(sess)
}

// Get returns topic/upstream for runner (nil session if not found).
func (w *WorkflowStore) Get(sessionID string) (*WorkflowState, error) {
	_, ws, err := w.load(sessionID)
	return ws, err
}

func (w *WorkflowStore) Ensure(sessionID, topic string) error {
	sess, ws, err := w.load(sessionID)
	if err != nil {
		return err
	}
	if topic != "" {
		ws.Topic = topic
	}
	return w.save(sess, ws)
}

func (w *WorkflowStore) SetUpstreamW6ID(sessionID, upstream string) error {
	sess, ws, err := w.load(sessionID)
	if err != nil {
		return err
	}
	ws.UpstreamW6ID = upstream
	return w.save(sess, ws)
}

func (w *WorkflowStore) UpdateMarkdown(sessionID, md, previewFile string) error {
	sess, ws, err := w.load(sessionID)
	if err != nil {
		return err
	}
	ws.Markdown = md
	ws.PreviewFile = previewFile
	return w.save(sess, ws)
}

func (w *WorkflowStore) SetSubAgentStatus(sessionID, status string) error {
	sess, ws, err := w.load(sessionID)
	if err != nil {
		return err
	}
	prev := strings.TrimSpace(ws.SubAgentStatus)
	ws.SubAgentStatus = status
	now := time.Now().UnixMilli()
	if strings.TrimSpace(status) == "running" {
		ws.SubAgentIdleSince = 0
		ws.LastHTMLResourceID = ""
		ws.LastMDResourceID = ""
		ws.Markdown = ""
		ws.PreviewFile = ""
	} else if prev == "running" || ws.SubAgentIdleSince == 0 {
		ws.SubAgentIdleSince = now
	}
	return w.save(sess, ws)
}

func (w *WorkflowStore) AppendChat(sessionID string, turns ...ai.ChatTurn) error {
	sess, ws, err := w.load(sessionID)
	if err != nil {
		return err
	}
	ws.ChatHistory = append(ws.ChatHistory, turns...)
	return w.save(sess, ws)
}

func (w *WorkflowStore) SetDiscussStatus(sessionID, status, mode string) error {
	sess, ws, err := w.load(sessionID)
	if err != nil {
		return err
	}
	ws.DiscussStatus = strings.TrimSpace(status)
	ws.DiscussMode = strings.TrimSpace(mode)
	return w.save(sess, ws)
}

func (w *WorkflowStore) ClearDiscussStatus(sessionID string) error {
	return w.SetDiscussStatus(sessionID, "", "")
}

func (w *WorkflowStore) AppendUIMessage(sessionID string, msg UIMessageSnap) error {
	sess, ws, err := w.load(sessionID)
	if err != nil {
		return err
	}
	if msg.Timestamp == 0 {
		msg.Timestamp = time.Now().UnixMilli()
	}
	ws.UIMessages = append(ws.UIMessages, msg)
	if len(ws.UIMessages) > 200 {
		ws.UIMessages = ws.UIMessages[len(ws.UIMessages)-200:]
	}
	return w.save(sess, ws)
}

// AppendStreamEvent implements w6.StreamPersister.
func (w *WorkflowStore) AppendStreamEvent(sessionID string, ev w6.StreamPersistEvent) {
	w.appendStreamSnap(sessionID, StreamEventSnap{
		Type:      ev.Type,
		Message:   ev.Message,
		Token:     ev.Token,
		Progress:  ev.Progress,
		Timestamp: ev.Timestamp,
	})
}

func (w *WorkflowStore) appendStreamSnap(sessionID string, ev StreamEventSnap) {
	sess, ws, err := w.load(sessionID)
	if err != nil {
		return
	}
	ws.StreamEvents = append(ws.StreamEvents, ev)
	if len(ws.StreamEvents) > 500 {
		ws.StreamEvents = ws.StreamEvents[len(ws.StreamEvents)-500:]
	}
	_ = w.save(sess, ws)
}

// ClearStreamHistory implements w6.StreamPersister.
func (w *WorkflowStore) ClearStreamHistory(sessionID string) {
	sess, ws, err := w.load(sessionID)
	if err != nil || len(ws.StreamEvents) == 0 {
		return
	}
	ws.StreamEvents = nil
	_ = w.save(sess, ws)
}

// StreamHistory implements w6.StreamPersister.
func (w *WorkflowStore) StreamHistory(sessionID string) []w6.StreamPersistEvent {
	ws, err := w.Get(sessionID)
	if err != nil || ws == nil {
		return nil
	}
	out := make([]w6.StreamPersistEvent, len(ws.StreamEvents))
	for i, e := range ws.StreamEvents {
		out[i] = w6.StreamPersistEvent{
			Type: e.Type, Message: e.Message, Token: e.Token,
			Progress: e.Progress, Timestamp: e.Timestamp,
		}
	}
	return out
}

func (w *WorkflowStore) GetTopic(sessionID string) string {
	_, ws, err := w.load(sessionID)
	if err != nil || ws == nil {
		return ""
	}
	return ws.Topic
}

func (w *WorkflowStore) GetUpstreamW6ID(sessionID string) string {
	ws, err := w.Get(sessionID)
	if err != nil || ws == nil {
		return ""
	}
	return ws.UpstreamW6ID
}

// GetReportStyle implements w6.SessionStateReader.
func (w *WorkflowStore) GetReportStyle(sessionID string) string {
	ws, err := w.Get(sessionID)
	if err != nil || ws == nil || strings.TrimSpace(ws.ReportStyle) == "" {
		return "auto"
	}
	return ws.ReportStyle
}

// SetReportStyle persists the user's HTML layout preference for this session.
func (w *WorkflowStore) SetReportStyle(sessionID, style string) error {
	sess, ws, err := w.load(sessionID)
	if err != nil {
		return err
	}
	ws.ReportStyle = render.NormalizeReportStyle(style)
	return w.save(sess, ws)
}

func (w *WorkflowStore) EnsureTopic(sessionID, topic string) {
	_ = w.Ensure(sessionID, topic)
}

func (w *WorkflowStore) SetFollowUps(sessionID string, followUps []string) error {
	sess, ws, err := w.load(sessionID)
	if err != nil {
		return err
	}
	ws.FollowUps = followUps
	return w.save(sess, ws)
}

func (w *WorkflowStore) SetReportResourceIDs(sessionID, mdID, htmlID string) error {
	sess, ws, err := w.load(sessionID)
	if err != nil {
		return err
	}
	if mdID != "" {
		ws.LastMDResourceID = mdID
	}
	if htmlID != "" {
		ws.LastHTMLResourceID = htmlID
	}
	return w.save(sess, ws)
}

func (w *WorkflowStore) SetSkillKey(sessionID, skillKey string) error {
	sess, _, err := w.load(sessionID)
	if err != nil {
		return err
	}
	k := skillKey
	sess.SkillKey = &k
	ws := ParseWorkflowState(sess.WorkflowState)
	ws.FunctionKey = skillKey
	sess.WorkflowState = MarshalWorkflowState(ws)
	sess.UpdatedAt = time.Now().UTC()
	return w.sessions.Update(sess)
}

func (w *WorkflowStore) GetMarkdown(sessionID string) (md, topic string, err error) {
	sess, ws, err := w.load(sessionID)
	if err != nil {
		return "", "", err
	}
	return ws.Markdown, firstNonEmpty(ws.Topic, sess.Title), nil
}

func firstNonEmpty(v ...string) string {
	for _, s := range v {
		if s != "" {
			return s
		}
	}
	return ""
}
