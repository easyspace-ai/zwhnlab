package aichat

import (
	"fmt"
	"strings"
)

// RoundPhase is derived lifecycle for invariant checks.
type RoundPhase string

const (
	PhasePending      RoundPhase = "pending"
	PhaseW6Running    RoundPhase = "w6_running"
	PhaseDiscuss      RoundPhase = "discuss_running"
	PhaseSealed       RoundPhase = "sealed"
)

// RoundSnapshot is a reduced view of one round for invariant checks.
type RoundSnapshot struct {
	ID     string
	Kind   RoundKind
	Phase  RoundPhase
	Sealed bool
}

// DeriveRounds projects events into round snapshots (for RoundMgr).
func DeriveRounds(events []SessionEvent) []RoundSnapshot {
	byID := map[string]*RoundSnapshot{}
	order := []string{}
	for _, ev := range events {
		rid := strings.TrimSpace(ev.RoundID)
		if rid == "" {
			continue
		}
		rs, ok := byID[rid]
		if !ok {
			rs = &RoundSnapshot{ID: rid, Phase: PhasePending}
			byID[rid] = rs
			order = append(order, rid)
		}
		switch ev.Type {
		case EventRoundStarted:
			rs.Kind = RoundKind(ev.Kind)
		case EventW6Status:
			switch W6Status(ev.Status) {
			case W6StatusRunning:
				rs.Phase = PhaseW6Running
				rs.Sealed = false
			case W6StatusIdle:
				if rs.Phase == PhasePending {
					rs.Phase = PhaseW6Running
				}
			case W6StatusDone, W6StatusError, W6StatusStopped:
				if rs.Phase == PhaseW6Running {
					rs.Phase = PhaseSealed
				}
			}
		case EventRoundSealed:
			rs.Sealed = true
			rs.Phase = PhaseSealed
		case EventAssistantDelta:
			if rs.Kind == RoundKindDeepSeek || rs.Kind == RoundKindDiscuss {
				rs.Phase = PhaseDiscuss
			}
		}
	}
	out := make([]RoundSnapshot, 0, len(order))
	for _, id := range order {
		out = append(out, *byID[id])
	}
	return out
}

func activeW6Running(rounds []RoundSnapshot) bool {
	for _, r := range rounds {
		if r.Sealed {
			continue
		}
		if r.Phase == PhaseW6Running {
			return true
		}
	}
	return false
}

func hasUnsealedRunning(rounds []RoundSnapshot) *RoundSnapshot {
	for i := range rounds {
		r := &rounds[i]
		if !r.Sealed && (r.Phase == PhaseW6Running || r.Phase == PhaseDiscuss) {
			return r
		}
	}
	return nil
}

// ValidateStartRound enforces INV-1 and INV-3 before starting a new round.
func ValidateStartRound(state *ConversationState, kind RoundKind) error {
	if state == nil {
		return nil
	}
	if rid := strings.TrimSpace(state.ActiveRoundID); rid != "" && !roundSealedInEvents(state.Events, rid) {
		return fmt.Errorf("round %s still active (INV-3)", rid)
	}
	rounds := DeriveRounds(state.Events)
	if running := hasUnsealedRunning(rounds); running != nil {
		return fmt.Errorf("round %s still active (INV-3)", running.ID)
	}
	if kind == RoundKindW6Form || kind == RoundKindW6Manual {
		if activeW6Running(rounds) {
			return fmt.Errorf("w6 already running (INV-1)")
		}
	}
	return nil
}

func roundSealedInEvents(events []SessionEvent, roundID string) bool {
	for _, ev := range events {
		if ev.RoundID == roundID && ev.Type == EventRoundSealed {
			return true
		}
	}
	return false
}

// ValidateFollowUps enforces INV-2: follow_ups only after round_sealed for same round.
func ValidateFollowUps(state *ConversationState, roundID string) error {
	if state == nil {
		return fmt.Errorf("no state")
	}
	sealed := false
	for _, ev := range state.Events {
		if ev.RoundID == roundID && ev.Type == EventRoundSealed {
			sealed = true
			break
		}
	}
	if !sealed {
		return fmt.Errorf("round %s not sealed (INV-2)", roundID)
	}
	return nil
}
