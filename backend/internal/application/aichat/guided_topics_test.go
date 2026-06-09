package aichat

import "testing"

func TestIsUsableGuidedTopicText_filtersSystemPrompt(t *testing.T) {
	if IsUsableGuidedTopicText("你是一个开源情报分析助手，请…") {
		t.Fatal("expected system prompt filtered")
	}
	if !IsUsableGuidedTopicText("报告中还有哪些信息缺口？") {
		t.Fatal("expected usable question")
	}
}

func TestResolveGuidedTopics_capsAtFour(t *testing.T) {
	raw := []string{"q1", "q2", "q3", "q4", "q5"}
	got := ResolveGuidedTopics(raw, "", "主题")
	if len(got) != 4 {
		t.Fatalf("want 4 topics, got %d: %v", len(got), got)
	}
}

func TestResolveGuidedTopics_fillsDefaults(t *testing.T) {
	got := ResolveGuidedTopics(nil, "info_research", "测试主题")
	if len(got) != 4 {
		t.Fatalf("want 4 default topics, got %d", len(got))
	}
}
