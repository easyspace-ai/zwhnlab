package osintdashboard

import (
	"fmt"
	"strings"
	"time"

	"github.com/easyspace-ai/ylmnote/internal/application/osintdashboard/ai"
)

// SessionRestoreState is returned to the dashboard UI when opening a session on a new client.
type SessionRestoreState struct {
	SessionID      string            `json:"session_id"`
	SkillKey       string            `json:"skill_key,omitempty"`
	ReportStyle    string            `json:"report_style,omitempty"`
	SubAgentStatus     string            `json:"sub_agent_status,omitempty"`
	FollowUps          []string          `json:"follow_ups,omitempty"`
	LastHTMLResourceID string            `json:"last_html_resource_id,omitempty"`
	LastMDResourceID   string            `json:"last_md_resource_id,omitempty"`
	W6StreamActive     bool              `json:"w6_stream_active"`
	DiscussActive  bool              `json:"discuss_active"`
	DiscussMode    string            `json:"discuss_mode,omitempty"`
	Messages       []UIMessageSnap   `json:"messages,omitempty"`
	StreamEvents   []StreamEventSnap `json:"stream_events,omitempty"`
}

// SetDiscussStatus marks a DeepSeek discuss/edit_html round as in-flight.
func (s *Service) SetDiscussStatus(sessionID, status, mode string) error {
	return s.workflow.SetDiscussStatus(sessionID, status, mode)
}

// ClearDiscussStatus clears the in-flight discuss marker.
func (s *Service) ClearDiscussStatus(sessionID string) error {
	return s.workflow.ClearDiscussStatus(sessionID)
}

// AppendDashboardUIMessage persists one chat bubble for cross-browser restore.
func (s *Service) AppendDashboardUIMessage(sessionID, role, content string, followUps []string) error {
	content = strings.TrimSpace(content)
	if content == "" {
		return nil
	}
	return s.workflow.AppendUIMessage(sessionID, UIMessageSnap{
		Role:              role,
		Content:           content,
		Timestamp:         time.Now().UnixMilli(),
		FollowUpQuestions: followUps,
	})
}

// GetSessionRestoreState loads persisted workflow fields for session hydration.
func (s *Service) GetSessionRestoreState(sessionID string) (*SessionRestoreState, error) {
	sess, err := s.sessions.GetByID(sessionID)
	if err != nil {
		return nil, err
	}
	ws := ParseWorkflowState(sess.WorkflowState)
	skillKey := ""
	if sess.SkillKey != nil {
		skillKey = strings.TrimSpace(*sess.SkillKey)
	}
	if skillKey == "" {
		skillKey = strings.TrimSpace(ws.FunctionKey)
	}
	messages := ws.UIMessages
	if len(messages) == 0 && len(ws.ChatHistory) > 0 {
		messages = uiMessagesFromChatHistory(ws.ChatHistory)
	}
	return &SessionRestoreState{
		SessionID:          sessionID,
		SkillKey:           skillKey,
		ReportStyle:        ws.ReportStyle,
		SubAgentStatus:     ws.SubAgentStatus,
		FollowUps:          ws.FollowUps,
		LastHTMLResourceID: ws.LastHTMLResourceID,
		LastMDResourceID:   ws.LastMDResourceID,
		W6StreamActive:     ws.SubAgentStatus == "running",
		DiscussActive:      ws.DiscussStatus == "running",
		DiscussMode:        ws.DiscussMode,
		Messages:           messages,
		StreamEvents:       ws.StreamEvents,
	}, nil
}

func uiMessagesFromChatHistory(history []ai.ChatTurn) []UIMessageSnap {
	out := make([]UIMessageSnap, 0, len(history))
	for i, turn := range history {
		content := strings.TrimSpace(turn.Content)
		if content == "" {
			continue
		}
		out = append(out, UIMessageSnap{
			Role:      turn.Role,
			Content:   content,
			Timestamp: time.Now().UnixMilli() + int64(i),
		})
	}
	return out
}

// BuildStartUserContent mirrors the dashboard frontend W6 start bubble.
func BuildStartUserContent(skillName string, formData map[string]interface{}) string {
	summary := formatFormDataSummary(formData)
	body := fmt.Sprintf("执行：%s", strings.TrimSpace(skillName))
	if summary != "" {
		body += "\n" + summary
	}
	return "@w6 " + body
}

func formatFormDataSummary(formData map[string]interface{}) string {
	if len(formData) == 0 {
		return ""
	}
	var lines []string
	for k, v := range formData {
		if v == nil {
			continue
		}
		switch val := v.(type) {
		case []interface{}:
			parts := make([]string, 0, len(val))
			for _, item := range val {
				s := strings.TrimSpace(fmt.Sprint(item))
				if s != "" && s != "<nil>" {
					parts = append(parts, s)
				}
			}
			if len(parts) > 0 {
				lines = append(lines, fmt.Sprintf("%s: %s", k, strings.Join(parts, ", ")))
			}
		default:
			s := strings.TrimSpace(fmt.Sprint(val))
			if s != "" && s != "<nil>" {
				lines = append(lines, fmt.Sprintf("%s: %s", k, s))
			}
		}
	}
	return strings.Join(lines, "\n")
}
