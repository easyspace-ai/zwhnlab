package osintdashboard

import (
	"encoding/json"
	"strings"

	"github.com/easyspace-ai/ylmnote/internal/application/osintdashboard/ai"
)

// UIMessageSnap is one dashboard chat bubble persisted for cross-device restore.
type UIMessageSnap struct {
	Role              string   `json:"role"`
	Content           string   `json:"content"`
	Timestamp         int64    `json:"timestamp"`
	FollowUpQuestions []string `json:"follow_up_questions,omitempty"`
}

// WorkflowState persisted on sessions.workflow_state.
type WorkflowState struct {
	UpstreamW6ID       string            `json:"upstream_w6_id,omitempty"`
	SubAgentStatus     string            `json:"sub_agent_status,omitempty"`
	Topic              string            `json:"topic,omitempty"`
	Markdown           string            `json:"markdown,omitempty"`
	PreviewFile        string            `json:"preview_file,omitempty"`
	FollowUps          []string          `json:"follow_ups,omitempty"`
	ChatHistory        []ai.ChatTurn     `json:"chat_history,omitempty"`
	UIMessages         []UIMessageSnap   `json:"ui_messages,omitempty"`
	StreamEvents       []StreamEventSnap `json:"stream_events,omitempty"`
	LastHTMLResourceID string            `json:"last_html_resource_id,omitempty"`
	LastMDResourceID   string            `json:"last_md_resource_id,omitempty"`
	FunctionKey        string            `json:"function_key,omitempty"`
	ReportStyle        string            `json:"report_style,omitempty"` // magazine | swiss | auto
	DiscussStatus      string            `json:"discuss_status,omitempty"` // running | ""
	DiscussMode        string            `json:"discuss_mode,omitempty"`   // discuss | edit_html
}

// StreamEventSnap is a persisted W6 SSE event (subset for replay).
type StreamEventSnap struct {
	Type      string `json:"type"`
	Message   string `json:"message,omitempty"`
	Token     string `json:"token,omitempty"`
	Progress  int    `json:"progress,omitempty"`
	Timestamp int64  `json:"timestamp"`
}

func ParseWorkflowState(raw string) *WorkflowState {
	raw = strings.TrimSpace(raw)
	if raw == "" || raw == "{}" {
		return &WorkflowState{}
	}
	var ws WorkflowState
	if err := json.Unmarshal([]byte(raw), &ws); err != nil {
		return &WorkflowState{}
	}
	return &ws
}

func MarshalWorkflowState(ws *WorkflowState) string {
	if ws == nil {
		return "{}"
	}
	b, err := json.Marshal(ws)
	if err != nil {
		return "{}"
	}
	return string(b)
}

// W6FunctionKeys are intelligence skills using the W6 canvas pipeline.
var W6FunctionKeys = map[string]struct{}{
	"fact_check":       {},
	"info_research":    {},
	"data_collection":  {},
}

func IsW6FunctionKey(key string) bool {
	_, ok := W6FunctionKeys[key]
	return ok
}
