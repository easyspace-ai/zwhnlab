package aichat

import (
	"context"
	"log"
	"os"
	"strconv"
	"strings"
	"sync"
	"time"

	"github.com/easyspace-ai/ylmnote/internal/application/osintdashboard"
	domainproject "github.com/easyspace-ai/ylmnote/internal/domain/project"
)

type monitorAction int

const (
	monitorActionNone monitorAction = iota
	monitorActionResumePoll
	monitorActionForceStop
)

// W6Monitor periodically heals unsealed W6 rounds without requiring client refresh.
type W6Monitor struct {
	svc            *Service
	scanner        domainproject.SessionRepository
	interval       time.Duration
	stallResume    time.Duration
	maxRound       time.Duration
	mu             sync.Mutex
	scanning       bool
}

func NewW6Monitor(svc *Service, scanner domainproject.SessionRepository) *W6Monitor {
	return &W6Monitor{
		svc:         svc,
		scanner:     scanner,
		interval:    monitorIntervalFromEnv(),
		stallResume: monitorStallResumeFromEnv(),
		maxRound:    monitorMaxRoundFromEnv(),
	}
}

func (m *W6Monitor) Start(ctx context.Context) {
	go func() {
		m.scanOnce(ctx)
		ticker := time.NewTicker(m.interval)
		defer ticker.Stop()
		for {
			select {
			case <-ctx.Done():
				return
			case <-ticker.C:
				m.scanOnce(ctx)
			}
		}
	}()
	log.Printf("[aichat] w6_monitor started interval=%s stall_resume=%s max_round=%s",
		m.interval, m.stallResume, m.maxRound)
}

func (m *W6Monitor) scanOnce(ctx context.Context) {
	if !m.tryAcquireScan() {
		return
	}
	defer m.releaseScan()

	w6IDs, err := m.scanner.ListW6MonitorCandidateIDs(200)
	if err != nil {
		log.Printf("[aichat] w6_monitor list w6: %v", err)
		return
	}
	llmIDs, err := m.scanner.ListLLMMonitorCandidateIDs(200)
	if err != nil {
		log.Printf("[aichat] w6_monitor list llm: %v", err)
	}
	seen := map[string]bool{}
	for _, sessionID := range append(w6IDs, llmIDs...) {
		if seen[sessionID] {
			continue
		}
		seen[sessionID] = true
		if ctx.Err() != nil {
			return
		}
		m.MonitorSession(ctx, sessionID)
		m.svc.healUnsealedLLMRound(sessionID)
	}
}

func (m *W6Monitor) tryAcquireScan() bool {
	m.mu.Lock()
	defer m.mu.Unlock()
	if m.scanning {
		return false
	}
	m.scanning = true
	return true
}

func (m *W6Monitor) releaseScan() {
	m.mu.Lock()
	defer m.mu.Unlock()
	m.scanning = false
}

// MonitorSession runs one heal pass for a single session (also used in tests).
func (m *W6Monitor) MonitorSession(ctx context.Context, sessionID string) {
	m.svc.healUnsealedW6Round(sessionID)

	st, err := m.svc.EnsureMigrated(sessionID)
	if err != nil || st == nil {
		return
	}
	roundID := findUnsealedW6Round(st)
	if roundID == "" || isRoundSealed(st.Events, roundID) {
		return
	}

	ws, err := m.svc.osint.Workflow().Get(sessionID)
	if err != nil || ws == nil {
		return
	}

	stall := roundStallDuration(st.Events, roundID)
	hasRunner := m.svc.osint.HasActiveW6Runner(sessionID)
	upstream := strings.TrimSpace(m.svc.osint.ProbeUpstreamW6Status(ctx, sessionID))

	action := decideMonitorAction(monitorInput{
		stall:         stall,
		hasRunner:     hasRunner,
		upstream:      upstream,
		workflow:      ws,
		events:        st.Events,
		roundID:       roundID,
		stallResume:   m.stallResume,
		maxRound:      m.maxRound,
	})

	switch action {
	case monitorActionResumePoll:
		if m.svc.osint.ResumeW6Poll(ctx, sessionID) {
			m.svc.ResumeActiveW6(sessionID)
			log.Printf("[aichat] w6_monitor resumed poll session=%s round=%s stall=%s",
				sessionID, roundID, stall)
		}
	case monitorActionForceStop:
		m.svc.forceStopStuckRound(sessionID, roundID,
			"W6 调研超时或无进展，已自动停止。可重新发起调研。")
		log.Printf("[aichat] w6_monitor force stop session=%s round=%s stall=%s upstream=%q",
			sessionID, roundID, stall, upstream)
	}

	if action == monitorActionNone && upstreamIdle(upstream) && workflowIsTerminal(ws) {
		m.svc.tryCompleteW6Round(sessionID, roundID, true)
	}
}

type monitorInput struct {
	stall       time.Duration
	hasRunner   bool
	upstream    string
	workflow    *osintdashboard.WorkflowState
	events      []SessionEvent
	roundID     string
	stallResume time.Duration
	maxRound    time.Duration
}

func decideMonitorAction(in monitorInput) monitorAction {
	if in.stall <= 0 {
		return monitorActionNone
	}
	if in.stall >= in.maxRound {
		return monitorActionForceStop
	}
	if in.hasRunner {
		return monitorActionNone
	}
	if in.stall >= in.stallResume {
		if upstreamIdle(in.upstream) || roundHasFinalizeDraft(in.events, in.roundID, in.workflow) {
			return monitorActionNone
		}
		if strings.TrimSpace(in.workflow.UpstreamW6ID) != "" {
			return monitorActionResumePoll
		}
	}
	return monitorActionNone
}

func roundStallDuration(events []SessionEvent, roundID string) time.Duration {
	lastAt := int64(0)
	for _, ev := range events {
		if ev.RoundID != roundID {
			continue
		}
		if ev.At > lastAt {
			lastAt = ev.At
		}
	}
	if lastAt <= 0 {
		return 0
	}
	elapsed := time.Now().UnixMilli() - lastAt
	if elapsed < 0 {
		return 0
	}
	return time.Duration(elapsed) * time.Millisecond
}

func upstreamIdle(st string) bool {
	return w6UpstreamIdle(st)
}

func w6UpstreamIdle(st string) bool {
	switch strings.ToLower(strings.TrimSpace(st)) {
	case "idle", "ready", "completed", "done", "stopped", "normal", "paused":
		return true
	default:
		return false
	}
}

func (s *Service) forceStopStuckRound(sessionID, roundID, message string) {
	s.osint.StopW6Round(sessionID)
	s.idle.Stop(sessionID)
	_, _ = s.events.AppendW6Log(sessionID, roundID, "error", message, 0)
	_, _ = s.events.AppendW6Status(sessionID, roundID, W6StatusError)
	_, _ = s.events.AppendRoundSealed(sessionID, roundID, SealReconciled)
	s.bridge.Unbind(sessionID)
}

func monitorIntervalFromEnv() time.Duration {
	return durationFromEnv("AICHAT_W6_MONITOR_INTERVAL_SEC", 45*time.Second)
}

func monitorStallResumeFromEnv() time.Duration {
	return durationFromEnv("AICHAT_W6_MONITOR_STALL_SEC", 3*time.Minute)
}

func monitorMaxRoundFromEnv() time.Duration {
	return durationFromEnv("AICHAT_W6_MONITOR_MAX_ROUND_SEC", 30*time.Minute)
}

func durationFromEnv(key string, fallback time.Duration) time.Duration {
	v := strings.TrimSpace(os.Getenv(key))
	if v == "" {
		return fallback
	}
	if sec, err := strconv.Atoi(v); err == nil && sec > 0 {
		return time.Duration(sec) * time.Second
	}
	if d, err := time.ParseDuration(v); err == nil && d > 0 {
		return d
	}
	return fallback
}
