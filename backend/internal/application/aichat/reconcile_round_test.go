package aichat

import (
	"testing"
	"time"

	"github.com/easyspace-ai/ylmnote/internal/application/osintdashboard"
)

func TestFindUnsealedW6Round(t *testing.T) {
	st := NewConversationState()
	st.ActiveRoundID = "r1"
	st.Events = []SessionEvent{
		{Type: EventRoundStarted, RoundID: "r1", Kind: string(RoundKindW6Form)},
		{Type: EventW6Status, RoundID: "r1", Status: string(W6StatusRunning)},
	}
	if got := findUnsealedW6Round(st); got != "r1" {
		t.Fatalf("want r1, got %q", got)
	}
	st.Events = append(st.Events, SessionEvent{Type: EventRoundSealed, RoundID: "r1"})
	if got := findUnsealedW6Round(st); got != "" {
		t.Fatalf("want empty after seal, got %q", got)
	}
}

func TestWorkflowCompletionSignals(t *testing.T) {
	ws := &osintdashboard.WorkflowState{SubAgentStatus: "running", LastHTMLResourceID: "html-1"}
	if workflowRoundFinalized(ws) && workflowIsTerminal(ws) {
		t.Fatal("running workflow should not be terminal-complete")
	}
	ws.SubAgentStatus = "idle"
	if !workflowRoundFinalized(ws) || !workflowIsTerminal(ws) {
		t.Fatal("idle + html should be terminal-complete")
	}
	if workflowIdleForSeal(ws) {
		t.Fatal("idle_since unset should not pass 15s gate")
	}
	ws.SubAgentIdleSince = time.Now().Add(-16 * time.Second).UnixMilli()
	if !workflowIdleForSeal(ws) {
		t.Fatal("idle for 16s should pass seal gate")
	}
	ws.LastHTMLResourceID = ""
	ws.Markdown = "# report"
	if workflowRoundFinalized(ws) {
		t.Fatal("markdown draft alone should not count as finalized")
	}
	if !workflowHasDraftMarkdown(ws) {
		t.Fatal("markdown draft should be detected")
	}
	ws.LastMDResourceID = "md-1"
	if !workflowRoundFinalized(ws) {
		t.Fatal("saved md resource should count as finalized")
	}
}

func TestWorkflowCanForceFinalizeOnReload(t *testing.T) {
	events := []SessionEvent{
		{Type: EventRoundStarted, RoundID: "r1", Kind: string(RoundKindW6Form)},
		{Type: EventW6Status, RoundID: "r1", Status: string(W6StatusRunning)},
		{Type: EventW6Log, RoundID: "r1", Body: "W6 已 idle，Markdown 报告就绪", Progress: 85},
		{Type: EventW6Log, RoundID: "r1", Body: "报告草稿就绪，等待收尾…", Progress: 95},
	}
	ws := &osintdashboard.WorkflowState{
		SubAgentStatus: "idle",
		Markdown:       "# draft",
	}
	if !workflowCanForceFinalizeOnReload(events, "r1", ws) {
		t.Fatal("draft log + markdown should force finalize on reload")
	}
	if workflowCanForceFinalizeOnReload(events, "r1", &osintdashboard.WorkflowState{
		SubAgentStatus:     "idle",
		Markdown:           "# draft",
		LastHTMLResourceID: "html-1",
	}) {
		t.Fatal("html already saved should not force")
	}
	ws.SubAgentStatus = "running"
	if !workflowCanForceFinalizeOnReload(events, "r1", ws) {
		t.Fatal("stale running + draft log should still force on reload")
	}
	ws.SubAgentIdleSince = 0
	if workflowIdleForSeal(ws) {
		t.Fatal("idle_since unset should not pass live gate")
	}
	if !workflowCanForceFinalizeOnReload(events, "r1", ws) {
		t.Fatal("reload should bypass idle_since gate when draft ready")
	}
}

func TestRoundHasFinalizeDraft(t *testing.T) {
	events := []SessionEvent{
		{Type: EventW6Log, RoundID: "r1", Body: "W6 已 idle，Markdown 报告就绪"},
		{Type: EventW6Log, RoundID: "r1", Body: "报告草稿就绪，等待收尾…", Progress: 95},
	}
	ws := &osintdashboard.WorkflowState{SubAgentStatus: "idle"}
	if !roundHasFinalizeDraft(events, "r1", ws) {
		t.Fatal("draft-ready logs without workflow markdown should count as finalize draft")
	}
	ws.Markdown = "# saved"
	if !roundHasFinalizeDraft(nil, "r1", ws) {
		t.Fatal("workflow markdown alone should count as finalize draft")
	}
	if roundHasFinalizeDraft(events, "r2", &osintdashboard.WorkflowState{SubAgentStatus: "idle"}) {
		t.Fatal("draft logs for another round should not count")
	}
}

func TestRoundDraftIdleConfirmed(t *testing.T) {
	events := []SessionEvent{
		{Type: EventW6Status, RoundID: "r1", Status: string(W6StatusIdle)},
	}
	if !roundDraftIdleConfirmed(events, "r1") {
		t.Fatal("w6_status idle should confirm draft idle")
	}
	events = []SessionEvent{
		{Type: EventW6Log, RoundID: "r1", Body: "报告草稿就绪，等待收尾…"},
	}
	if !roundDraftIdleConfirmed(events, "r1") {
		t.Fatal("draft ready log should confirm draft idle")
	}
}
