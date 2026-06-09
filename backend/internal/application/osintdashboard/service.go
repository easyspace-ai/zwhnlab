package osintdashboard

import (
	"context"
	"fmt"
	"strings"
	"sync"
	"time"

	"github.com/easyspace-ai/ylmnote/internal/application/artifact"
	intelligencesvc "github.com/easyspace-ai/ylmnote/internal/application/intelligence"
	"github.com/easyspace-ai/ylmnote/internal/application/osintdashboard/ai"
	"github.com/easyspace-ai/ylmnote/internal/application/osintdashboard/reportskill"
	"github.com/easyspace-ai/ylmnote/internal/application/osintdashboard/w6"
	projectsvc "github.com/easyspace-ai/ylmnote/internal/application/project"
	"github.com/easyspace-ai/ylmnote/internal/application/role"
	skillgroupsvc "github.com/easyspace-ai/ylmnote/internal/application/skillgroup"
	"github.com/easyspace-ai/ylmnote/internal/config"
	domainintel "github.com/easyspace-ai/ylmnote/internal/domain/intelligence"
	domainproject "github.com/easyspace-ai/ylmnote/internal/domain/project"
	wsdk "ws-chat-tester/sdk"
)

// Service runs OSINT dashboard W6 research orchestration.
type Service struct {
	projectSvc          *projectsvc.Service
	sessions            domainproject.SessionRepository
	messages            domainproject.MessageRepository
	resources           domainproject.ResourceRepository
	intelligenceSkills  *intelligencesvc.Service
	roleSvc             *role.Service
	skillGroupSvc       *skillgroupsvc.Service
	workflow            *WorkflowStore
	artifactSyncer      *artifact.Syncer
	runner              *w6.Runner
	hub                 *w6.Hub
	ai                  *ai.Client
	roundSaveMu         sync.Map // sessionID -> *sync.Mutex
}

func NewService(
	cfg *config.Config,
	projectSvc *projectsvc.Service,
	sessions domainproject.SessionRepository,
	messages domainproject.MessageRepository,
	resources domainproject.ResourceRepository,
	intelligenceSkills *intelligencesvc.Service,
	roleSvc *role.Service,
	skillGroupSvc *skillgroupsvc.Service,
	w6Client *wsdk.Client,
	artifactSyncer *artifact.Syncer,
) *Service {
	workflow := NewWorkflowStore(sessions)
	hub := w6.NewHub(workflow)
	aiClient := ai.New(cfg.DeepSeek, w6Client)
	s := &Service{
		projectSvc:         projectSvc,
		sessions:           sessions,
		messages:           messages,
		resources:          resources,
		intelligenceSkills: intelligenceSkills,
		roleSvc:            roleSvc,
		skillGroupSvc:      skillGroupSvc,
		workflow:           workflow,
		artifactSyncer:     artifactSyncer,
		hub:                hub,
		ai:                 aiClient,
	}
	reportLoader := reportskill.NewLoader(reportskill.ResolveDir(cfg.OsintReportSkillDir))
	reportPipeline := reportskill.NewPipeline(reportLoader, aiClient)
	s.runner = w6.NewRunner(w6Client, hub, aiClient, workflow, s, reportPipeline, aiClient.MockW6())
	return s
}

func (s *Service) Hub() *w6.Hub { return s.hub }
func (s *Service) Runner() *w6.Runner { return s.runner }
func (s *Service) Workflow() *WorkflowStore { return s.workflow }
func (s *Service) MockW6() bool { return s.ai.MockW6() }

// HasActiveW6Runner is true when a local W6 poll goroutine is still running.
func (s *Service) HasActiveW6Runner(sessionID string) bool {
	return s.runner != nil && s.runner.IsActive(sessionID)
}

// ProbeUpstreamW6Status returns upstream run status for monitor/reconcile probes.
func (s *Service) ProbeUpstreamW6Status(ctx context.Context, sessionID string) string {
	if s.runner == nil {
		return ""
	}
	return s.runner.ProbeUpstreamStatus(ctx, sessionID)
}

// ResumeW6Poll restarts polling when the local runner was lost.
func (s *Service) ResumeW6Poll(ctx context.Context, sessionID string) bool {
	if s.runner == nil {
		return false
	}
	return s.runner.ResumePoll(ctx, sessionID)
}

func (s *Service) lockRoundSave(sessionID string) func() {
	v, _ := s.roundSaveMu.LoadOrStore(sessionID, &sync.Mutex{})
	mu := v.(*sync.Mutex)
	mu.Lock()
	return mu.Unlock
}

// SaveRound implements w6.ReportSaver.
func (s *Service) SaveRound(ctx context.Context, sessionID, roundTitle, md, html string) (htmlResourceID string, err error) {
	unlock := s.lockRoundSave(sessionID)
	defer unlock()

	ws, wsErr := s.workflow.Get(sessionID)
	if wsErr == nil && ws != nil {
		if existing := strings.TrimSpace(ws.LastHTMLResourceID); existing != "" {
			return existing, nil
		}
	}

	sess, err := s.sessions.GetByID(sessionID)
	if err != nil {
		return "", err
	}
	mdID, htmlID, err := s.artifactSyncer.SaveSessionReport(sess.ProjectID, sessionID, roundTitle, md, html)
	if err != nil {
		return "", err
	}
	_ = s.workflow.SetReportResourceIDs(sessionID, mdID, htmlID)
	upstream := s.workflow.GetUpstreamW6ID(sessionID)
	if upstream != "" && s.artifactSyncer != nil {
		_, _ = s.artifactSyncer.SyncFromAgentMessages(ctx, upstream)
	}
	return htmlID, nil
}

// AllowedSkillKeys returns skill keys the user may run.
func (s *Service) AllowedSkillKeys(userID string, isAdmin bool) (map[string]struct{}, error) {
	if isAdmin {
		return nil, nil
	}
	groupIDs, err := s.roleSvc.SkillGroupIDsForUser(userID)
	if err != nil {
		return nil, err
	}
	if len(groupIDs) == 0 {
		return map[string]struct{}{}, nil
	}
	return s.skillGroupSvc.SkillKeysForGroupIDs(groupIDs)
}

// SkillUsesW6Pipeline reports whether a skill should run through the W6 sub-agent canvas.
func (s *Service) SkillUsesW6Pipeline(skillKey string) bool {
	if s.skillGroupSvc != nil && s.skillGroupSvc.SkillUsesW6Runner(skillKey) {
		return true
	}
	return IsW6FunctionKey(skillKey)
}

func (s *Service) ValidateSkillKey(userID string, isAdmin bool, skillKey string) (*domainintel.Skill, error) {
	skillKey = strings.TrimSpace(skillKey)
	if skillKey == "" {
		return nil, fmt.Errorf("skill_key required")
	}
	allowed, err := s.AllowedSkillKeys(userID, isAdmin)
	if err != nil {
		return nil, err
	}
	if allowed != nil {
		if _, ok := allowed[skillKey]; !ok {
			return nil, fmt.Errorf("skill not permitted")
		}
	}
	skills, err := s.intelligenceSkills.ListSkills(userID)
	if err != nil {
		return nil, err
	}
	skills = intelligencesvc.FilterSkillsByKeys(skills, allowed)
	for _, sk := range skills {
		if sk.Key == skillKey && sk.IsEnabled {
			return sk, nil
		}
	}
	if isAdmin {
		for _, sk := range skills {
			if sk.Key == skillKey {
				return sk, nil
			}
		}
	}
	return nil, fmt.Errorf("skill not found or disabled")
}

func (s *Service) EnsureSessionAccess(sessionID, userID string) (*domainproject.Session, error) {
	sess, err := s.sessions.GetByID(sessionID)
	if err != nil {
		return nil, err
	}
	if err := s.projectSvc.EnsureProjectBelongsToUser(sess.ProjectID, userID); err != nil {
		return nil, err
	}
	return sess, nil
}

// SetReportStyle stores HTML layout preference (magazine | swiss | auto) on the session workflow.
func (s *Service) SetReportStyle(sessionID, style string) error {
	return s.workflow.SetReportStyle(sessionID, style)
}

// StartW6Round starts background W6 research for a session.
func (s *Service) StartW6Round(ctx context.Context, sessionID, prompt, topic string) {
	s.runner.Start(ctx, w6.StartParams{SessionID: sessionID, Prompt: prompt, Topic: topic})
}

// TryFinishW6Round resumes the post-poll pipeline when upstream W6 is already idle but the
// local runner goroutine was lost (e.g. server restart). Returns true when HTML artifacts exist.
// When force is true (timeline reload heal), skips SubAgentIdleSealDelay if Markdown draft exists.
func (s *Service) TryFinishW6Round(ctx context.Context, sessionID string, force bool) bool {
	ws, err := s.workflow.Get(sessionID)
	if err != nil || ws == nil {
		return false
	}
	if strings.TrimSpace(ws.LastHTMLResourceID) != "" {
		_ = s.workflow.SetSubAgentStatus(sessionID, "idle")
		return true
	}
	if !force && !WorkflowIdleForSeal(ws) {
		return false
	}
	if force && strings.TrimSpace(ws.SubAgentStatus) == "running" && strings.TrimSpace(ws.Markdown) != "" {
		_ = s.workflow.SetSubAgentStatus(sessionID, "idle")
		ws, err = s.workflow.Get(sessionID)
		if err != nil || ws == nil {
			return false
		}
	}
	// Prefer round-scoped MD from upstream; ws.Markdown may be stale from a prior round.
	if s.runner.ResumeIfUpstreamIdle(ctx, sessionID) {
		return true
	}
	if strings.TrimSpace(ws.Markdown) != "" {
		return s.runner.CompleteFromMarkdown(ctx, sessionID, ws.Markdown, ws.Topic)
	}
	return false
}

// StopW6Round cancels the in-flight W6 round for a dashboard session.
func (s *Service) StopW6Round(sessionID string) {
	s.runner.Stop(sessionID)
}

// DiscussResult is returned by Discuss / EditReportHTML chat modes.
type DiscussResult struct {
	Reply            string
	HTMLResourceID   string
	Edited           bool
}

// PlainChat answers general questions without report context (DeepSeek).
func (s *Service) PlainChat(ctx context.Context, sessionID, message string) (*DiscussResult, error) {
	return s.plainChat(ctx, sessionID, message, nil)
}

// PlainChatStream streams PlainChat tokens via onDelta; returns the full reply.
func (s *Service) PlainChatStream(ctx context.Context, sessionID, message string, onDelta func(string) error) (*DiscussResult, error) {
	return s.plainChat(ctx, sessionID, message, onDelta)
}

func (s *Service) plainChat(ctx context.Context, sessionID, message string, onDelta func(string) error) (*DiscussResult, error) {
	message = strings.TrimSpace(message)
	if message == "" {
		return nil, fmt.Errorf("message required")
	}
	ws, _ := s.workflow.Get(sessionID)
	var history []ai.ChatTurn
	if ws != nil {
		history = ws.ChatHistory
	}
	var (
		reply string
		err   error
	)
	if onDelta != nil {
		reply, err = s.ai.PlainChatStream(ctx, message, history, onDelta)
	} else {
		reply, err = s.ai.PlainChat(ctx, message, history)
	}
	if err != nil {
		return nil, err
	}
	_ = s.workflow.AppendChat(sessionID,
		ai.ChatTurn{Role: "user", Content: message},
		ai.ChatTurn{Role: "assistant", Content: reply},
	)
	return &DiscussResult{Reply: reply}, nil
}

// Discuss answers about an existing report without re-running W6.
func (s *Service) Discuss(ctx context.Context, sessionID, message string) (*DiscussResult, error) {
	return s.discuss(ctx, sessionID, message, "", nil)
}

// DiscussStream streams Discuss tokens via onDelta; returns the full reply.
func (s *Service) DiscussStream(ctx context.Context, sessionID, message, mdResourceID string, onDelta func(string) error) (*DiscussResult, error) {
	return s.discuss(ctx, sessionID, message, mdResourceID, onDelta)
}

func (s *Service) discuss(ctx context.Context, sessionID, message, mdResourceID string, onDelta func(string) error) (*DiscussResult, error) {
	var (
		md    string
		topic string
		err   error
	)
	if strings.TrimSpace(mdResourceID) != "" {
		md, topic, err = s.loadReportMarkdown(sessionID, mdResourceID)
	} else {
		md, topic, err = s.workflow.GetMarkdown(sessionID)
	}
	if err != nil {
		return nil, err
	}
	if strings.TrimSpace(md) == "" {
		return nil, fmt.Errorf("session report not ready")
	}
	ws, _ := s.workflow.Get(sessionID)
	var history []ai.ChatTurn
	if ws != nil {
		history = ws.ChatHistory
	}
	var reply string
	if onDelta != nil {
		reply, err = s.ai.DiscussStream(ctx, md, topic, message, history, onDelta)
	} else {
		reply, err = s.ai.Discuss(ctx, md, topic, message, history)
	}
	if err != nil {
		return nil, err
	}
	_ = s.workflow.AppendChat(sessionID,
		ai.ChatTurn{Role: "user", Content: message},
		ai.ChatTurn{Role: "assistant", Content: reply},
	)
	return &DiscussResult{Reply: reply}, nil
}

func (s *Service) loadReportMarkdown(sessionID, resourceID string) (md, topic string, err error) {
	resourceID = strings.TrimSpace(resourceID)
	if resourceID == "" {
		return "", "", fmt.Errorf("resource id required")
	}
	sess, err := s.sessions.GetByID(sessionID)
	if err != nil {
		return "", "", err
	}
	res, err := s.resources.GetByResourceID(resourceID)
	if err != nil {
		return "", "", fmt.Errorf("report not found")
	}
	if res.ProjectID != sess.ProjectID {
		return "", "", fmt.Errorf("report access denied")
	}
	if res.SessionID == nil || *res.SessionID != sessionID {
		return "", "", fmt.Errorf("report does not belong to session")
	}
	if res.Type != "document" {
		return "", "", fmt.Errorf("resource is not a markdown report")
	}
	md, err = s.resources.GetResourceContent(resourceID)
	if err != nil || strings.TrimSpace(md) == "" {
		if res.Content != nil && strings.TrimSpace(*res.Content) != "" {
			md = *res.Content
		} else {
			return "", "", fmt.Errorf("markdown content not available")
		}
	}
	ws, _ := s.workflow.Get(sessionID)
	if ws != nil && strings.TrimSpace(ws.Topic) != "" {
		topic = ws.Topic
	} else {
		topic = sess.Title
	}
	return md, topic, nil
}

// EditReportHTML patches the active HTML report artifact per user instruction.
func (s *Service) EditReportHTML(ctx context.Context, sessionID, targetResourceID, message string) (*DiscussResult, error) {
	targetResourceID = strings.TrimSpace(targetResourceID)
	message = strings.TrimSpace(message)
	if targetResourceID == "" || message == "" {
		return nil, fmt.Errorf("target_resource_id and message required")
	}
	sess, err := s.sessions.GetByID(sessionID)
	if err != nil {
		return nil, err
	}
	res, err := s.resources.GetByResourceID(targetResourceID)
	if err != nil {
		return nil, fmt.Errorf("report not found")
	}
	if res.ProjectID != sess.ProjectID {
		return nil, fmt.Errorf("report access denied")
	}
	if res.SessionID == nil || *res.SessionID != sessionID {
		return nil, fmt.Errorf("report does not belong to session")
	}
	if res.Type != "html_page" {
		return nil, fmt.Errorf("resource is not an HTML report")
	}
	html, err := s.resources.GetResourceContent(targetResourceID)
	if err != nil || strings.TrimSpace(html) == "" {
		if res.Content != nil && strings.TrimSpace(*res.Content) != "" {
			html = *res.Content
		} else {
			return nil, fmt.Errorf("HTML content not available")
		}
	}
	_, topic, err := s.workflow.GetMarkdown(sessionID)
	if err != nil {
		return nil, err
	}
	if topic == "" {
		topic = sess.Title
	}
	ws, _ := s.workflow.Get(sessionID)
	var history []ai.ChatTurn
	if ws != nil {
		history = ws.ChatHistory
	}
	edited, err := s.ai.EditHTML(ctx, html, topic, message, history)
	if err != nil {
		return nil, fmt.Errorf("%s", ai.UserFacingError(err))
	}
	if strings.TrimSpace(edited) == "" {
		return nil, fmt.Errorf("model returned empty HTML")
	}
	baseName := strings.TrimSuffix(res.Name, ".html")
	htmlID, err := s.artifactSyncer.SaveEditedHTML(sess.ProjectID, sessionID, baseName, edited)
	if err != nil {
		return nil, err
	}
	_ = s.workflow.SetReportResourceIDs(sessionID, "", htmlID)
	reply := "已根据您的要求更新报告版式，右侧预览已刷新。"
	_ = s.workflow.AppendChat(sessionID,
		ai.ChatTurn{Role: "user", Content: message},
		ai.ChatTurn{Role: "assistant", Content: reply},
	)
	return &DiscussResult{
		Reply:          reply,
		HTMLResourceID: htmlID,
		Edited:         true,
	}, nil
}

// ListSessionReports returns html/document resources for a session.
func (s *Service) ListSessionReports(sessionID string) ([]*domainproject.Resource, error) {
	list, err := s.resources.ListBySessionID(sessionID)
	if err != nil {
		return nil, err
	}
	var out []*domainproject.Resource
	for _, r := range list {
		if r.Type == "html_page" || r.Type == "document" {
			out = append(out, r)
		}
	}
	return out, nil
}

// UpdateSessionSkill persists skill_key on session and may auto-set the title from W6 topic.
func (s *Service) UpdateSessionSkill(sessionID, skillKey, title string) error {
	sess, err := s.sessions.GetByID(sessionID)
	if err != nil {
		return err
	}
	k := strings.TrimSpace(skillKey)
	if k != "" {
		sess.SkillKey = &k
	}
	sess.UpdatedAt = time.Now().UTC()
	if err := s.sessions.Update(sess); err != nil {
		return err
	}
	if err := s.workflow.SetSkillKey(sessionID, k); err != nil {
		return err
	}
	_, _, err = s.UpdateSessionTitleIfAuto(sessionID, title)
	return err
}
