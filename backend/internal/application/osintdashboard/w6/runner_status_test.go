package w6

import "testing"

func TestFrameRunStatus(t *testing.T) {
	if got := frameRunStatus(map[string]any{"type": "Status", "status": "idle"}); got != "idle" {
		t.Fatalf("status frame: got %q", got)
	}
	if got := frameRunStatus(map[string]any{
		"type":  "update",
		"state": map[string]any{"status": "running"},
	}); got != "running" {
		t.Fatalf("update state: got %q", got)
	}
	if got := frameRunStatus(map[string]any{"type": "token"}); got != "" {
		t.Fatalf("unexpected: %q", got)
	}
}

func TestPollOutputStable(t *testing.T) {
	s := pollOutputStable(3, 0, true, 0)
	if s.readyWithoutProbe {
		t.Fatal("first poll should not be ready")
	}
	s = pollOutputStable(3, 3, true, s.stablePolls)
	if s.readyWithoutProbe {
		t.Fatal("one stable poll should not be ready")
	}
	s = pollOutputStable(3, 3, true, s.stablePolls)
	if !s.readyWithoutProbe {
		t.Fatal("two stable polls should be ready without WS probe")
	}
	if pollOutputStable(4, 3, true, 2).stablePolls != 0 {
		t.Fatal("message count change should reset stable polls")
	}
}

func TestUpstreamIsIdle(t *testing.T) {
	for _, st := range []string{"idle", "ready", "completed", "done", "stopped"} {
		if !upstreamIsIdle(st) {
			t.Fatalf("%q should be idle", st)
		}
	}
	if upstreamIsIdle("running") || upstreamIsIdle("") {
		t.Fatal("running/empty should not be idle")
	}
}
