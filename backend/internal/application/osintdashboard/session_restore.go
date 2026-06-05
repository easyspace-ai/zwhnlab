package osintdashboard

import (
	"fmt"
	"strings"
	"time"

	"github.com/easyspace-ai/ylmnote/internal/application/osintdashboard/ai"
)

// SessionRestoreState is returned to the dashboard UI when opening a session on a new client.
type SessionRestoreState struct {
	SessionID      string          `json:"session_id"`
	SkillKey       string          `json:"skill_key,omitempty"`
	ReportStyle    string          `json:"report_style,omitempty"`
	SubAgentStatus string          `json:"sub_agent_status,omitempty"`
	FollowUps      []string        `json:"follow_ups,omitempty"`
	W6StreamActive bool            `json:"w6_stream_active"`
	Messages       []UIMessageSnap `json:"messages,omitempty"`
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
		SessionID:      sessionID,
		SkillKey:       skillKey,
		ReportStyle:    ws.ReportStyle,
		SubAgentStatus: ws.SubAgentStatus,
		FollowUps:      ws.FollowUps,
		W6StreamActive: ws.SubAgentStatus == "running",
		Messages:       messages,
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
