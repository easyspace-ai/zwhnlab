package osintdashboard

import (
	"context"
	"fmt"
	"strings"
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

// SaveRound implements w6.ReportSaver.
func (s *Service) SaveRound(ctx context.Context, sessionID, roundTitle, md, html string) (htmlResourceID string, err error) {
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

// Discuss answers about an existing report without re-running W6.
func (s *Service) Discuss(ctx context.Context, sessionID, message string) (*DiscussResult, error) {
	md, topic, err := s.workflow.GetMarkdown(sessionID)
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
	reply, err := s.ai.Discuss(ctx, md, topic, message, history)
	if err != nil {
		return nil, err
	}
	_ = s.workflow.AppendChat(sessionID,
		ai.ChatTurn{Role: "user", Content: message},
		ai.ChatTurn{Role: "assistant", Content: reply},
	)
	return &DiscussResult{Reply: reply}, nil
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
