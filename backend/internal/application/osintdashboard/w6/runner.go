package w6

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"strings"
	"sync"
	"time"

	"github.com/easyspace-ai/ylmnote/internal/application/osintdashboard/ai"
	wsdk "ws-chat-tester/sdk"
)

// ReportHTMLRenderer optional osint-report-skill pipeline (LLM normalize + HTML).
type ReportHTMLRenderer interface {
	RenderReportHTML(ctx context.Context, md, topic, visualStyle string) (html string, layoutMD string, normalized bool)
}

// ReportSaver persists md/html reports for a session round.
type ReportSaver interface {
	SaveRound(ctx context.Context, sessionID, roundTitle, md, html string) (htmlResourceID string, err error)
}

type Runner struct {
	client       *wsdk.Client
	hub          *Hub
	ai           *ai.Client
	state        SessionStateReader
	reports      ReportSaver
	reportRender ReportHTMLRenderer
	mockMode     bool
	pollWait     time.Duration
	mu           sync.Mutex
	cancels      map[string]context.CancelFunc
}

func NewRunner(
	w6Client *wsdk.Client,
	hub *Hub,
	aiClient *ai.Client,
	state SessionStateReader,
	reports ReportSaver,
	reportRender ReportHTMLRenderer,
	mock bool,
) *Runner {
	return &Runner{
		client:       w6Client,
		hub:          hub,
		ai:           aiClient,
		state:        state,
		reports:      reports,
		reportRender: reportRender,
		mockMode:     mock || w6Client == nil,
		pollWait:     pollTimeout(),
	}
}

type StartParams struct {
	SessionID string
	Prompt    string
	Topic     string
}

func (r *Runner) Start(ctx context.Context, p StartParams) {
	id := strings.TrimSpace(p.SessionID)
	if id == "" {
		return
	}
	topic := strings.TrimSpace(p.Topic)
	if topic == "" {
		topic = r.state.GetTopic(id)
	}
	r.state.EnsureTopic(id, topic)
	r.cancelRound(id)
	// Clear replay buffer before the UI reconnects so stale terminal events are not replayed.
	r.hub.ClearRound(id)
	_ = r.state.SetSubAgentStatus(id, "running")
	runCtx, cancel := context.WithCancel(context.Background())
	r.setCancel(id, cancel)
	go r.run(runCtx, id, p.Prompt, topic)
}

// Stop cancels the local W6 round and asks upstream to halt if configured.
func (r *Runner) Stop(sessionID string) {
	sessionID = strings.TrimSpace(sessionID)
	if sessionID == "" {
		return
	}
	r.cancelRound(sessionID)
	upstreamID := strings.TrimSpace(r.state.GetUpstreamW6ID(sessionID))
	if upstreamID != "" && r.client != nil && !r.mockMode {
		stopCtx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		if err := r.client.StopSession(stopCtx, upstreamID); err != nil {
			log.Printf("[osintdashboard] upstream stop session=%s upstream=%s: %v", sessionID, upstreamID, err)
		}
	}
	_ = r.state.SetSubAgentStatus(sessionID, "idle")
	r.hub.Publish(sessionID, Event{
		Type:           "stopped",
		Message:        "已手动停止 W6 调研",
		SubAgentStatus: "idle",
	})
}

func (r *Runner) setCancel(sessionID string, cancel context.CancelFunc) {
	r.mu.Lock()
	defer r.mu.Unlock()
	if r.cancels == nil {
		r.cancels = make(map[string]context.CancelFunc)
	}
	r.cancels[sessionID] = cancel
}

func (r *Runner) clearCancel(sessionID string) {
	r.mu.Lock()
	defer r.mu.Unlock()
	delete(r.cancels, sessionID)
}

// IsActive reports whether a local W6 poll/run goroutine is still running for the session.
func (r *Runner) IsActive(sessionID string) bool {
	r.mu.Lock()
	defer r.mu.Unlock()
	_, ok := r.cancels[sessionID]
	return ok
}

// ProbeUpstreamStatus dials upstream W6 once and returns its run status (empty on failure).
func (r *Runner) ProbeUpstreamStatus(ctx context.Context, sessionID string) string {
	upstreamID := strings.TrimSpace(r.state.GetUpstreamW6ID(sessionID))
	if upstreamID == "" {
		return ""
	}
	return r.upstreamStatus(ctx, upstreamID)
}

// ResumePoll restarts the markdown poll loop when the local goroutine was lost but upstream
// may still be running (e.g. server restart).
func (r *Runner) ResumePoll(ctx context.Context, sessionID string) bool {
	sessionID = strings.TrimSpace(sessionID)
	if sessionID == "" || r.mockMode {
		return false
	}
	if r.IsActive(sessionID) {
		return false
	}
	upstreamID := strings.TrimSpace(r.state.GetUpstreamW6ID(sessionID))
	if upstreamID == "" {
		return false
	}
	_ = r.state.SetSubAgentStatus(sessionID, "running")
	runCtx, cancel := context.WithCancel(context.Background())
	r.setCancel(sessionID, cancel)
	go func() {
		defer r.clearCancel(sessionID)
		emit := func(ev Event) {
			ev.SubAgentStatus = "running"
			r.hub.Publish(sessionID, ev)
		}
		emit(Event{Type: "log", Message: "监控：恢复 W6 轮询…", Progress: 50})
		md, err := r.pollMarkdown(runCtx, upstreamID, emit)
		if err != nil {
			if errors.Is(err, context.Canceled) {
				return
			}
			_ = r.state.SetSubAgentStatus(sessionID, "error")
			r.hub.Publish(sessionID, Event{Type: "error", Message: err.Error(), SubAgentStatus: "error"})
			return
		}
		_ = r.state.UpdateMarkdown(sessionID, md, sessionID)
		_ = r.state.SetSubAgentStatus(sessionID, "idle")
		r.hub.Publish(sessionID, Event{
			Type:           "phase",
			Message:        "报告草稿就绪，等待收尾…",
			Progress:       95,
			SubAgentStatus: "idle",
		})
	}()
	return true
}

func (r *Runner) cancelRound(sessionID string) {
	r.mu.Lock()
	cancel, ok := r.cancels[sessionID]
	if ok {
		delete(r.cancels, sessionID)
	}
	r.mu.Unlock()
	if ok && cancel != nil {
		cancel()
	}
}

func (r *Runner) run(ctx context.Context, sessionID, prompt, topic string) {
	defer r.clearCancel(sessionID)
	r.hub.ClearRound(sessionID)
	emit := func(ev Event) {
		ev.SubAgentStatus = "running"
		r.hub.Publish(sessionID, ev)
	}

	_ = r.state.SetSubAgentStatus(sessionID, "running")
	emit(Event{Type: "status", Message: "子 Agent W6 已启动", Progress: 5})
	emit(Event{Type: "log", Message: "正在初始化 W6 调研会话…"})

	var md string
	var err error
	if r.mockMode {
		md, err = r.runMock(ctx, sessionID, prompt, emit)
	} else {
		md, err = r.runReal(ctx, sessionID, prompt, emit)
	}
	if err != nil {
		if errors.Is(err, context.Canceled) {
			return
		}
		_ = r.state.SetSubAgentStatus(sessionID, "error")
		emit(Event{Type: "error", Message: err.Error(), SubAgentStatus: "error"})
		return
	}

	_ = r.state.UpdateMarkdown(sessionID, md, sessionID)
	_ = r.state.SetSubAgentStatus(sessionID, "idle")
	r.hub.Publish(sessionID, Event{
		Type:           "phase",
		Message:        "报告草稿就绪，等待收尾…",
		Progress:       95,
		SubAgentStatus: "idle",
	})
}

func (r *Runner) runMock(ctx context.Context, sessionID, prompt string, emit func(Event)) (string, error) {
	steps := []string{
		"解析核查目标与约束条件",
		"检索权威媒体与官方数据源",
		"交叉比对多源报道",
		"评估质疑因素与矛盾点",
		"生成结构化核查报告",
	}
	for i, s := range steps {
		emit(Event{Type: "tool", Message: s, Progress: 10 + i*15})
		emit(Event{Type: "log", Message: fmt.Sprintf("[W6 mock] %s …", s)})
		select {
		case <-ctx.Done():
			return "", ctx.Err()
		case <-time.After(700 * time.Millisecond):
		}
	}
	emit(Event{Type: "status", Message: "W6 未配置，使用 LLM 模拟报告", Progress: 75})
	return r.ai.GenerateReport(ctx, prompt)
}

func (r *Runner) runReal(ctx context.Context, sessionID, prompt string, emit func(Event)) (string, error) {
	upstreamID := strings.TrimSpace(r.state.GetUpstreamW6ID(sessionID))
	if upstreamID == "" {
		upstreamID = wsdk.RandomSessionID(8)
		emit(Event{Type: "log", Message: fmt.Sprintf("创建 W6 会话 %s", upstreamID)})
	} else {
		emit(Event{Type: "log", Message: fmt.Sprintf("恢复 W6 会话 %s", upstreamID)})
	}

	push, err := r.client.PushUserInput(ctx, upstreamID, prompt, nil)
	if err != nil {
		return "", err
	}
	if push.SessionID != "" {
		upstreamID = push.SessionID
	}
	_ = r.state.SetUpstreamW6ID(sessionID, upstreamID)
	log.Printf("[osintdashboard] push ok session=%s upstream=%s ack=%s", sessionID, upstreamID, push.AckReason)
	emit(Event{Type: "tool", Message: fmt.Sprintf("已发送调研指令 (ack=%s)", push.AckReason), Progress: 40})

	return r.pollMarkdown(ctx, upstreamID, emit)
}

func (r *Runner) pollMarkdown(ctx context.Context, upstreamID string, emit func(Event)) (string, error) {
	var deadline time.Time
	if r.pollWait > 0 {
		deadline = time.Now().Add(r.pollWait)
	}
	var textAccumulator strings.Builder
	var lastMessages []wsdk.AgentMessage
	var lastStatusLine string
	var lastMsgCount int
	var stablePolls int
	emitStatus := func(message string, progress int) {
		if message == lastStatusLine {
			return
		}
		lastStatusLine = message
		emit(Event{Type: "status", Message: message, Progress: progress})
	}

	for r.pollWait == 0 || time.Now().Before(deadline) {
		if err := ctx.Err(); err != nil {
			return "", err
		}
		resp, err := r.client.AgentMessages(ctx, upstreamID, 50, 0)
		if err != nil {
			emit(Event{Type: "log", Message: "拉取消息: " + err.Error()})
			time.Sleep(2 * time.Second)
			continue
		}
		msgCount := len(resp.Messages)
		lastMessages = resp.Messages
		for _, msg := range resp.Messages {
			if strings.EqualFold(msg.Kind, "from_user") {
				continue
			}
			if c := extractTextFromMessage(msg); c != "" {
				textAccumulator.WriteString(c)
				textAccumulator.WriteString("\n")
				emit(Event{Type: "token", Token: c[:min(200, len(c))]})
			}
		}

		roundMD := r.latestMarkdownFromMessages(ctx, resp.Messages)
		roundText := latestUserFacingText(resp.Messages)
		stableOutput := pollOutputStable(msgCount, lastMsgCount, roundMD != "" || roundText != "", stablePolls)
		lastMsgCount = msgCount
		stablePolls = stableOutput.stablePolls

		needStatusProbe := !stableOutput.readyWithoutProbe
		st := ""
		if needStatusProbe {
			st = r.upstreamStatus(ctx, upstreamID)
		}
		if upstreamIsIdle(st) || stableOutput.readyWithoutProbe {
			if roundMD := r.latestMarkdownFromMessages(ctx, resp.Messages); roundMD != "" {
				emit(Event{Type: "log", Message: "W6 已 idle，Markdown 报告就绪"})
				return roundMD, nil
			}
			if accText := latestUserFacingText(resp.Messages); accText != "" {
				emit(Event{Type: "log", Message: fmt.Sprintf("W6 已 idle，整理聊天文本 (%d 字符)…", len(accText))})
				return r.formatTextAsReport(accText), nil
			}
		}

		if roundMD != "" || roundText != "" {
			emitStatus("等待 W6 idle…", 70)
		} else {
			emitStatus("等待 W6 产出…", 60)
		}
		time.Sleep(3 * time.Second)
	}
	if roundMD := r.latestMarkdownFromMessages(ctx, lastMessages); roundMD != "" {
		return roundMD, nil
	}
	if accText := latestUserFacingText(lastMessages); accText != "" {
		return r.formatTextAsReport(accText), nil
	}
	return "", fmt.Errorf("timeout waiting for W6 response")
}

func (r *Runner) formatTextAsReport(text string) string {
	var b strings.Builder
	b.WriteString("# 调查结果\n\n")
	b.WriteString(text)
	b.WriteString("\n\n---\n*本报告由 W6 子 Agent 自动生成。*")
	return b.String()
}

func (r *Runner) extractMarkdownFromMessage(ctx context.Context, msg wsdk.AgentMessage) string {
	if md := extractMDFromParts(msg.MessagePart); md != "" {
		return md
	}
	id, filename := mdResourceRef(msg.MessagePart)
	if id == "" || r.client == nil {
		return ""
	}
	if filename != "" && !strings.HasSuffix(strings.ToLower(filename), ".md") {
		return ""
	}
	data, _, err := r.client.DownloadSource(ctx, id)
	if err != nil || len(data) == 0 {
		return ""
	}
	return string(data)
}

func (r *Runner) upstreamStatus(ctx context.Context, upstreamID string) string {
	if r.client == nil {
		return "idle"
	}
	probeCtx, cancel := context.WithTimeout(ctx, 4*time.Second)
	defer cancel()
	conn, err := r.client.DialSession(probeCtx, upstreamID)
	if err != nil {
		return ""
	}
	defer conn.Close()

	deadline := time.Now().Add(3 * time.Second)
	for time.Now().Before(deadline) {
		_ = conn.SetReadDeadline(time.Now().Add(1500 * time.Millisecond))
		_, msg, err := conn.ReadMessage()
		if err != nil {
			return ""
		}
		var frame map[string]any
		if json.Unmarshal(msg, &frame) != nil {
			continue
		}
		if st := frameRunStatus(frame); st != "" {
			return st
		}
	}
	return ""
}

type pollStableState struct {
	stablePolls         int
	readyWithoutProbe   bool
}

// pollOutputStable tracks unchanged AgentMessages while output exists; after two stable
// polls (~6s) we accept the draft without another WS status dial (avoids endless reconnect).
func pollOutputStable(msgCount, lastMsgCount int, hasOutput bool, stablePolls int) pollStableState {
	if !hasOutput || msgCount == 0 {
		return pollStableState{}
	}
	if msgCount == lastMsgCount {
		stablePolls++
	} else {
		stablePolls = 0
	}
	return pollStableState{
		stablePolls:       stablePolls,
		readyWithoutProbe: stablePolls >= 2,
	}
}

func frameRunStatus(frame map[string]any) string {
	t := strings.ToLower(strings.TrimSpace(fmt.Sprint(frame["type"])))
	switch t {
	case "status":
		return strings.ToLower(strings.TrimSpace(fmt.Sprint(frame["status"])))
	case "update":
		state, ok := frame["state"].(map[string]any)
		if !ok {
			return ""
		}
		return strings.ToLower(strings.TrimSpace(fmt.Sprint(state["status"])))
	default:
		return ""
	}
}

func upstreamIsIdle(st string) bool {
	switch st {
	case "idle", "ready", "completed", "done", "stopped", "normal", "paused":
		return true
	default:
		return false
	}
}

func extractMDFromParts(raw interface{}) string {
	parts, ok := raw.([]interface{})
	if !ok {
		return ""
	}
	for _, p := range parts {
		part, ok := p.(map[string]interface{})
		if !ok {
			continue
		}
		if typ, _ := part["type"].(string); typ != "resource" {
			continue
		}
		res, ok := part["resource"].(map[string]interface{})
		if !ok {
			continue
		}
		var filename string
		if data, ok := res["data"].(map[string]interface{}); ok {
			filename, _ = data["filename"].(string)
		}
		if filename == "" {
			filename, _ = res["name"].(string)
		}
		if filename != "" && !strings.HasSuffix(strings.ToLower(filename), ".md") {
			continue
		}
		if c, ok := res["content"].(string); ok && strings.TrimSpace(c) != "" {
			return c
		}
	}
	return ""
}

func mdResourceRef(raw interface{}) (id, filename string) {
	parts, ok := raw.([]interface{})
	if !ok {
		return "", ""
	}
	for _, p := range parts {
		part, ok := p.(map[string]interface{})
		if !ok || part["type"] != "resource" {
			continue
		}
		res, ok := part["resource"].(map[string]interface{})
		if !ok {
			continue
		}
		if data, ok := res["data"].(map[string]interface{}); ok {
			filename, _ = data["filename"].(string)
		}
		if filename == "" {
			filename, _ = res["name"].(string)
		}
		if !strings.HasSuffix(strings.ToLower(filename), ".md") {
			continue
		}
		id, _ = res["id"].(string)
		if id != "" {
			return id, filename
		}
	}
	return "", ""
}

func extractTextFromMessage(msg wsdk.AgentMessage) string {
	if c := strings.TrimSpace(msg.Content); c != "" {
		return c
	}
	parts, ok := msg.MessagePart.([]interface{})
	if !ok {
		return ""
	}
	var b strings.Builder
	for _, p := range parts {
		part, ok := p.(map[string]interface{})
		if !ok || part["type"] != "text" {
			continue
		}
		b.WriteString(fmt.Sprint(part["content"]))
	}
	return strings.TrimSpace(b.String())
}

func defaultFollowUps(topic string) []string {
	if topic == "" {
		topic = "本次事实核查"
	}
	return []string{
		fmt.Sprintf("报告中对「%s」的核心结论是什么？", topic),
		"有哪些关键证据仍需要进一步核实？",
		"如果该主张在社交媒体传播，应如何辟谣或标注？",
		"请列出 3 条可执行的下一步调查建议。",
	}
}

func roundTitle(topic, prompt string) string {
	prompt = strings.TrimSpace(prompt)
	if prompt == "" {
		return topic
	}
	firstLine := prompt
	if idx := strings.IndexAny(prompt, "\n\r"); idx > 0 {
		firstLine = strings.TrimSpace(prompt[:idx])
	}
	firstLine = strings.TrimPrefix(firstLine, "好的，")
	firstLine = strings.TrimPrefix(firstLine, "好的,")
	runes := []rune(firstLine)
	if len(runes) > 50 {
		firstLine = string(runes[:50]) + "…"
	}
	if firstLine == "" || firstLine == topic {
		return topic
	}
	return firstLine
}

func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}
