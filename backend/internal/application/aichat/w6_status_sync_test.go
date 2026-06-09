package aichat

import (
	"testing"

	"github.com/easyspace-ai/ylmnote/internal/application/osintdashboard"
	"github.com/easyspace-ai/ylmnote/internal/application/osintdashboard/w6"
)

func TestHubEventMarksW6Idle(t *testing.T) {
	if !hubEventMarksW6Idle(w6.Event{Type: "phase", Message: "报告草稿就绪，等待收尾…"}) {
		t.Fatal("phase draft ready should mark idle")
	}
	if !hubEventMarksW6Idle(w6.Event{Type: "log", Message: "W6 已 idle，Markdown 报告就绪"}) {
		t.Fatal("idle log should mark idle")
	}
	if !hubEventMarksW6Idle(w6.Event{Type: "status", SubAgentStatus: "idle"}) {
		t.Fatal("subAgentStatus idle should mark idle")
	}
	if hubEventMarksW6Idle(w6.Event{Type: "token", Token: "hello"}) {
		t.Fatal("token should not mark idle")
	}
}

func TestLastW6Status(t *testing.T) {
	events := []SessionEvent{
		{Type: EventW6Status, RoundID: "r1", Status: string(W6StatusRunning)},
		{Type: EventW6Status, RoundID: "r1", Status: string(W6StatusIdle)},
	}
	if got := lastW6Status(events, "r1"); got != string(W6StatusIdle) {
		t.Fatalf("want idle, got %q", got)
	}
}

func TestIsW6RoundRunningIdleTransition(t *testing.T) {
	events := []SessionEvent{
		{Type: EventRoundStarted, RoundID: "r1"},
		{Type: EventW6Status, RoundID: "r1", Status: string(W6StatusRunning)},
		{Type: EventW6Status, RoundID: "r1", Status: string(W6StatusIdle)},
	}
	if isW6RoundRunning(events, "r1") {
		t.Fatal("idle status should not count as running")
	}
}

func TestHasDraftReadyLog(t *testing.T) {
	events := []SessionEvent{
		{Type: EventW6Log, RoundID: "r1", Body: "W6 已 idle，Markdown 报告就绪"},
	}
	if !hasDraftReadyLog(events, "r1") {
		t.Fatal("expected draft ready log")
	}
}

func TestRoundNeedsIdleWatcher(t *testing.T) {
	st := NewConversationState()
	st.ActiveRoundID = "r1"
	st.Events = []SessionEvent{
		{Type: EventRoundStarted, RoundID: "r1", Kind: string(RoundKindW6Form)},
		{Type: EventW6Status, RoundID: "r1", Status: string(W6StatusIdle)},
	}
	ws := &osintdashboard.WorkflowState{
		SubAgentStatus: "idle",
		Markdown:       "# draft",
	}
	if !roundNeedsIdleWatcher(st, ws, "r1") {
		t.Fatal("unsealed draft idle round should keep idle watcher")
	}
}
