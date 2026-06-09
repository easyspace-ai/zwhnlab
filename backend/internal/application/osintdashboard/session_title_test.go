package osintdashboard

import "testing"

func TestIsAutoSessionTitle(t *testing.T) {
	for _, title := range []string{"", "新会话", "新研究", "新对话", "调研主题", " 新研究 "} {
		if !IsAutoSessionTitle(title) {
			t.Fatalf("expected auto title for %q", title)
		}
	}
	if IsAutoSessionTitle("复视是什么原因引起的") {
		t.Fatal("user topic should not be auto title")
	}
}

func TestTruncateSessionTitle(t *testing.T) {
	got := TruncateSessionTitle("复视是什么原因引起的以及如何治疗", 10)
	if got != "复视是什么原因引起的…" {
		t.Fatalf("unexpected truncate: %q", got)
	}
}
