package aichat

// DefaultTimelineLimitRounds is the initial page size (~10 rounds expected per session).
const DefaultTimelineLimitRounds = 10

// TimelinePage is one paginated slice of conversation events.
type TimelinePage struct {
	Events    []SessionEvent
	HasMore   bool
	OldestSeq int64
}

type roundSpan struct {
	id     string
	minSeq int64
	maxSeq int64
}

func buildRoundSpans(events []SessionEvent) []roundSpan {
	order := make([]string, 0)
	byID := map[string]*roundSpan{}
	for _, ev := range events {
		if ev.RoundID == "" {
			continue
		}
		span, ok := byID[ev.RoundID]
		if !ok {
			span = &roundSpan{id: ev.RoundID, minSeq: ev.Seq, maxSeq: ev.Seq}
			byID[ev.RoundID] = span
			order = append(order, ev.RoundID)
			continue
		}
		if ev.Seq < span.minSeq {
			span.minSeq = ev.Seq
		}
		if ev.Seq > span.maxSeq {
			span.maxSeq = ev.Seq
		}
	}
	out := make([]roundSpan, 0, len(order))
	for _, id := range order {
		out = append(out, *byID[id])
	}
	return out
}

// PaginateTimelineEvents returns events for the last limitRounds rounds (or rounds before beforeSeq).
// limitRounds <= 0 returns all events. Session-level events (no round_id) are always included.
func PaginateTimelineEvents(all []SessionEvent, limitRounds int, beforeSeq int64) TimelinePage {
	if len(all) == 0 {
		return TimelinePage{Events: []SessionEvent{}}
	}
	if limitRounds <= 0 {
		return TimelinePage{Events: append([]SessionEvent(nil), all...), OldestSeq: minRoundEventSeq(all)}
	}

	global := make([]SessionEvent, 0)
	for _, ev := range all {
		if ev.RoundID == "" {
			global = append(global, ev)
		}
	}

	spans := buildRoundSpans(all)
	if len(spans) == 0 {
		return TimelinePage{Events: append([]SessionEvent(nil), global...), OldestSeq: minRoundEventSeq(global)}
	}

	var selected []roundSpan
	var hasMore bool
	if beforeSeq > 0 {
		eligible := make([]roundSpan, 0)
		for _, span := range spans {
			if span.maxSeq < beforeSeq {
				eligible = append(eligible, span)
			}
		}
		hasMore = len(eligible) > limitRounds
		if hasMore {
			selected = eligible[len(eligible)-limitRounds:]
		} else {
			selected = eligible
		}
	} else {
		hasMore = len(spans) > limitRounds
		if hasMore {
			selected = spans[len(spans)-limitRounds:]
		} else {
			selected = spans
		}
	}

	selectedSet := map[string]struct{}{}
	for _, span := range selected {
		selectedSet[span.id] = struct{}{}
	}

	out := append([]SessionEvent(nil), global...)
	for _, ev := range all {
		if ev.RoundID == "" {
			continue
		}
		if _, ok := selectedSet[ev.RoundID]; ok {
			out = append(out, ev)
		}
	}
	sortEventsBySeq(out)
	return TimelinePage{Events: out, HasMore: hasMore, OldestSeq: minRoundEventSeq(out)}
}

func minRoundEventSeq(events []SessionEvent) int64 {
	min := int64(0)
	for _, ev := range events {
		if ev.RoundID == "" {
			continue
		}
		if min == 0 || ev.Seq < min {
			min = ev.Seq
		}
	}
	return min
}

func sortEventsBySeq(events []SessionEvent) {
	for i := 1; i < len(events); i++ {
		for j := i; j > 0 && events[j-1].Seq > events[j].Seq; j-- {
			events[j-1], events[j] = events[j], events[j-1]
		}
	}
}
