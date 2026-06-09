package aichat

import "testing"

func TestRoundCompletionFlagsAnyReportReady(t *testing.T) {
	events := []SessionEvent{
		{Type: EventReportReady, RoundID: "r1", HTMLID: "html-old", MDID: "md-old"},
	}
	hasReport, hasFollowUps := roundCompletionFlags(events, "r1", "html-new", "md-new")
	if !hasReport {
		t.Fatal("existing report_ready for round should count as hasReport")
	}
	if hasFollowUps {
		t.Fatal("no follow_ups event")
	}
}

func TestFindReportReadyEventIdempotent(t *testing.T) {
	events := []SessionEvent{
		{Type: EventReportReady, RoundID: "r1", HTMLID: "html-1", MDID: "md-1"},
	}
	if got := findReportReadyEvent(events, "r1", "md-1", "html-1"); got == nil {
		t.Fatal("expected match by html id")
	}
	if got := findReportReadyEvent(events, "r1", "", "html-1"); got == nil {
		t.Fatal("expected match by html id only")
	}
	if got := findReportReadyEvent(events, "r1", "md-1", ""); got == nil {
		t.Fatal("expected match by md id only")
	}
	if got := findReportReadyEvent(events, "r1", "other", "html-1"); got == nil {
		t.Fatal("expected match when html id matches")
	}
}
