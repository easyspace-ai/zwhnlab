package aichat

import (
	"testing"
	"time"

	"github.com/easyspace-ai/ylmnote/internal/application/osintdashboard"
)

func TestRoundStallDuration(t *testing.T) {
	now := time.Now().UnixMilli()
	events := []SessionEvent{
		{RoundID: "r1", Type: EventW6Log, At: now - 120_000},
		{RoundID: "r1", Type: EventW6Status, Status: string(W6StatusRunning), At: now - 60_000},
		{RoundID: "r2", Type: EventW6Log, At: now - 10_000},
	}
	stall := roundStallDuration(events, "r1")
	if stall < 55*time.Second || stall > 65*time.Second {
		t.Fatalf("unexpected stall: %s", stall)
	}
	if roundStallDuration(events, "missing") != 0 {
		t.Fatal("missing round should have zero stall")
	}
}

func TestDecideMonitorAction(t *testing.T) {
	base := monitorInput{
		stallResume: 3 * time.Minute,
		maxRound:    30 * time.Minute,
		roundID:     "r1",
		workflow:    &osintdashboard.WorkflowState{UpstreamW6ID: "up-1"},
	}

	if got := decideMonitorAction(base); got != monitorActionNone {
		t.Fatalf("no stall should be none, got %v", got)
	}

	base.stall = 31 * time.Minute
	if got := decideMonitorAction(base); got != monitorActionForceStop {
		t.Fatalf("max round exceeded should force stop, got %v", got)
	}

	base.stall = 4 * time.Minute
	base.hasRunner = true
	if got := decideMonitorAction(base); got != monitorActionNone {
		t.Fatalf("active runner should wait, got %v", got)
	}

	base.hasRunner = false
	if got := decideMonitorAction(base); got != monitorActionResumePoll {
		t.Fatalf("orphan poll should resume, got %v", got)
	}

	base.upstream = "idle"
	if got := decideMonitorAction(base); got != monitorActionNone {
		t.Fatalf("idle upstream should heal via reconcile, not resume poll, got %v", got)
	}

	base.upstream = ""
	base.events = []SessionEvent{
		{RoundID: "r1", Type: EventW6Log, Body: "报告草稿就绪，等待收尾…"},
	}
	if got := decideMonitorAction(base); got != monitorActionNone {
		t.Fatalf("draft ready should not resume poll, got %v", got)
	}
}

func TestW6UpstreamIdle(t *testing.T) {
	for _, st := range []string{"idle", "ready", "completed", "DONE"} {
		if !w6UpstreamIdle(st) {
			t.Fatalf("%q should be idle", st)
		}
	}
	if w6UpstreamIdle("running") {
		t.Fatal("running should not be idle")
	}
}
