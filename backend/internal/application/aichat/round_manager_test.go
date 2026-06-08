package aichat

import "testing"

func TestValidateStartRound_INV3_blocksWhenActive(t *testing.T) {
	st := NewConversationState()
	st.Events = []SessionEvent{
		{Seq: 1, Type: EventRoundStarted, RoundID: "r1", Kind: string(RoundKindW6Form)},
		{Seq: 2, Type: EventW6Status, RoundID: "r1", Status: string(W6StatusRunning)},
	}
	st.ActiveRoundID = "r1"
	if err := ValidateStartRound(st, RoundKindW6Manual); err == nil {
		t.Fatal("expected INV-3 error")
	}
}

func TestValidateFollowUps_INV2_requiresSealed(t *testing.T) {
	st := NewConversationState()
	st.Events = []SessionEvent{
		{Seq: 1, Type: EventRoundStarted, RoundID: "r1"},
		{Seq: 2, Type: EventW6Status, RoundID: "r1", Status: string(W6StatusDone)},
	}
	if err := ValidateFollowUps(st, "r1"); err == nil {
		t.Fatal("expected INV-2 error before seal")
	}
	st.Events = append(st.Events, SessionEvent{Seq: 3, Type: EventRoundSealed, RoundID: "r1"})
	if err := ValidateFollowUps(st, "r1"); err != nil {
		t.Fatalf("expected follow_ups allowed after seal: %v", err)
	}
}

func TestDeriveRounds_multiRound(t *testing.T) {
	events := []SessionEvent{
		{Type: EventRoundStarted, RoundID: "r1", Kind: string(RoundKindW6Form)},
		{Type: EventRoundSealed, RoundID: "r1"},
		{Type: EventRoundStarted, RoundID: "r2", Kind: string(RoundKindW6Form)},
		{Type: EventW6Status, RoundID: "r2", Status: string(W6StatusRunning)},
	}
	rounds := DeriveRounds(events)
	if len(rounds) != 2 {
		t.Fatalf("want 2 rounds, got %d", len(rounds))
	}
	if rounds[0].Sealed != true || rounds[1].Phase != PhaseW6Running {
		t.Fatalf("unexpected phases: %+v", rounds)
	}
}
