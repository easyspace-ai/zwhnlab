package aichat

import "testing"

func TestPaginateTimelineEvents_emptyReturnsSliceNotNil(t *testing.T) {
	page := PaginateTimelineEvents(nil, 10, 0)
	if page.Events == nil {
		t.Fatal("empty timeline must return non-nil events slice for JSON []")
	}
	if len(page.Events) != 0 {
		t.Fatalf("expected 0 events, got %d", len(page.Events))
	}
}

func TestPaginateTimelineEvents_recentPage(t *testing.T) {
	events := []SessionEvent{
		{Seq: 1, Type: EventSessionTitle, Title: "会话"},
		{Seq: 2, Type: EventRoundStarted, RoundID: "r1"},
		{Seq: 3, Type: EventRoundSealed, RoundID: "r1"},
		{Seq: 4, Type: EventRoundStarted, RoundID: "r2"},
		{Seq: 5, Type: EventRoundSealed, RoundID: "r2"},
		{Seq: 6, Type: EventRoundStarted, RoundID: "r3"},
		{Seq: 7, Type: EventRoundSealed, RoundID: "r3"},
	}

	page := PaginateTimelineEvents(events, 2, 0)
	if !page.HasMore {
		t.Fatal("expected has_more")
	}
	if page.OldestSeq != 4 {
		t.Fatalf("oldest_seq=%d want 4", page.OldestSeq)
	}
	rounds := map[string]bool{}
	for _, ev := range page.Events {
		if ev.RoundID != "" {
			rounds[ev.RoundID] = true
		}
	}
	if len(rounds) != 2 || !rounds["r2"] || !rounds["r3"] {
		t.Fatalf("unexpected rounds on page: %v", rounds)
	}
}

func TestPaginateTimelineEvents_loadEarlier(t *testing.T) {
	events := []SessionEvent{
		{Seq: 1, Type: EventRoundStarted, RoundID: "r1"},
		{Seq: 2, Type: EventRoundSealed, RoundID: "r1"},
		{Seq: 3, Type: EventRoundStarted, RoundID: "r2"},
		{Seq: 4, Type: EventRoundSealed, RoundID: "r2"},
		{Seq: 5, Type: EventRoundStarted, RoundID: "r3"},
		{Seq: 6, Type: EventRoundSealed, RoundID: "r3"},
	}

	page := PaginateTimelineEvents(events, 1, 4)
	if page.HasMore {
		t.Fatal("expected no more before r2")
	}
	rounds := map[string]bool{}
	for _, ev := range page.Events {
		if ev.RoundID != "" {
			rounds[ev.RoundID] = true
		}
	}
	if len(rounds) != 1 || !rounds["r1"] {
		t.Fatalf("unexpected earlier page rounds: %v", rounds)
	}
}

func TestDeriveSessionTitleFromFormData_fallback(t *testing.T) {
	got := deriveSessionTitleFromFormData(map[string]interface{}{"company_name": "Acme"})
	if got != "Acme" {
		t.Fatalf("unexpected fallback title: %q", got)
	}
	got = deriveSessionTitleFromFormData(map[string]interface{}{})
	if got != defaultFormTopic {
		t.Fatalf("empty form should use default: %q", got)
	}
}

func TestExtractTopicFromForm_fallback(t *testing.T) {
	got := extractTopicFromForm(map[string]interface{}{"foo": "bar"})
	if got != "bar" {
		t.Fatalf("unexpected topic: %q", got)
	}
	got = extractTopicFromForm(map[string]interface{}{})
	if got != defaultFormTopic {
		t.Fatalf("empty form should use default topic: %q", got)
	}
}
