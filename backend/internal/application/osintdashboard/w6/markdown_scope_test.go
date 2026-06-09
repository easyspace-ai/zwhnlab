package w6

import (
	"testing"

	wsdk "ws-chat-tester/sdk"
)

func TestLastUserMessageIndex(t *testing.T) {
	msgs := []wsdk.AgentMessage{
		{Kind: "from_user"},
		{Kind: "assistant", Content: "a"},
		{Kind: "from_user"},
		{Kind: "user_facing", Content: "b"},
	}
	if got := lastUserMessageIndex(msgs); got != 2 {
		t.Fatalf("want 2, got %d", got)
	}
}

func TestLatestUserFacingTextScopesToCurrentRound(t *testing.T) {
	msgs := []wsdk.AgentMessage{
		{Kind: "from_user", Content: "round1"},
		{Kind: "user_facing", Content: "old answer"},
		{Kind: "from_user", Content: "round2"},
		{Kind: "tool", Content: "hidden"},
		{Kind: "user_facing", Content: "new answer"},
	}
	got := latestUserFacingText(msgs)
	if got != "new answer" {
		t.Fatalf("want scoped text, got %q", got)
	}
}

func TestLatestUserFacingTextIncludesAssistantKind(t *testing.T) {
	msgs := []wsdk.AgentMessage{
		{Kind: "from_user", Content: "q"},
		{Kind: "assistant", Content: "reply"},
	}
	got := latestUserFacingText(msgs)
	if got != "reply" {
		t.Fatalf("want reply, got %q", got)
	}
}
