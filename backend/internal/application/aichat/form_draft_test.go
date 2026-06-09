package aichat

import "testing"

func TestPendingFormDraftIDs(t *testing.T) {
	events := []SessionEvent{
		{Type: EventFormPresented, DraftID: "fd-1"},
		{Type: EventFormPresented, DraftID: "fd-2"},
		{Type: EventFormCancelled, DraftID: "fd-1"},
		{Type: EventFormDraftSubmitted, DraftID: "fd-3"},
	}
	got := pendingFormDraftIDs(events)
	if len(got) != 1 || got[0] != "fd-2" {
		t.Fatalf("pending=%v want [fd-2]", got)
	}
}
