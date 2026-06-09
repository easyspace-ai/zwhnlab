package aichat

import "testing"

func TestIsW6RoundRunning(t *testing.T) {
	events := []SessionEvent{
		{Type: EventRoundStarted, RoundID: "r1"},
		{Type: EventW6Status, RoundID: "r1", Status: string(W6StatusRunning)},
	}
	if !isW6RoundRunning(events, "r1") {
		t.Fatal("expected running")
	}
	events = append(events, SessionEvent{Type: EventRoundSealed, RoundID: "r1"})
	if isW6RoundRunning(events, "r1") {
		t.Fatal("expected not running after seal")
	}
}

func TestDeriveW6SessionTitle(t *testing.T) {
	got := deriveW6SessionTitle("@w6  调查某公司舆情\n第二行")
	if got != "调查某公司舆情" {
		t.Fatalf("unexpected title: %q", got)
	}
}

func TestDeriveSessionTitleFromFormData(t *testing.T) {
	got := deriveSessionTitleFromFormData(map[string]interface{}{"topic": "  测试主题  "})
	if got != "测试主题" {
		t.Fatalf("unexpected title: %q", got)
	}
	got = deriveSessionTitleFromFormData(map[string]interface{}{"other": "测试主题"})
	if got != "测试主题" {
		t.Fatalf("unexpected fallback: %q", got)
	}
	got = deriveSessionTitleFromFormData(map[string]interface{}{})
	if got != defaultFormTopic {
		t.Fatalf("empty form should use default: %q", got)
	}
}
