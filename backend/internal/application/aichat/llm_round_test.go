package aichat

import "testing"

func TestFindUnsealedLLMRound_activeDiscuss(t *testing.T) {
	st := NewConversationState()
	st.ActiveRoundID = "r1"
	st.Events = []SessionEvent{
		{Seq: 1, Type: EventRoundStarted, RoundID: "r1", Kind: string(RoundKindDiscuss)},
		{Seq: 2, Type: EventAssistantDelta, RoundID: "r1", Delta: "partial"},
	}
	if got := findUnsealedLLMRound(st); got != "r1" {
		t.Fatalf("want r1, got %q", got)
	}
}

func TestFindUnsealedLLMRound_sealedIgnored(t *testing.T) {
	st := NewConversationState()
	st.Events = []SessionEvent{
		{Seq: 1, Type: EventRoundStarted, RoundID: "r1", Kind: string(RoundKindDeepSeek)},
		{Seq: 2, Type: EventRoundSealed, RoundID: "r1"},
	}
	if got := findUnsealedLLMRound(st); got != "" {
		t.Fatalf("want empty, got %q", got)
	}
}
