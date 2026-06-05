package artifact

import (
	"fmt"
	"path/filepath"
	"strings"
	"time"

	"github.com/easyspace-ai/ylmnote/internal/domain/project"
	"github.com/google/uuid"
)

// SaveSessionReport writes md/html under artifacts/{projectID}/ and upserts resources rows.
func (s *Syncer) SaveSessionReport(projectID, sessionID, baseName, md, html string) (mdResourceID, htmlResourceID string, err error) {
	projectID = strings.TrimSpace(projectID)
	sessionID = strings.TrimSpace(sessionID)
	if projectID == "" || sessionID == "" {
		return "", "", fmt.Errorf("project_id and session_id required")
	}
	ts := time.Now().UnixMilli()
	safeBase := strings.TrimSpace(baseName)
	if safeBase == "" {
		safeBase = sessionID
	}
	safeBase = filepath.Base(strings.ReplaceAll(safeBase, "/", "_"))

	mdName := fmt.Sprintf("%s_%d.md", safeBase, ts)
	htmlName := fmt.Sprintf("%s_%d.html", safeBase, ts)

	mdPath, err := saveArtifactContent(projectID, mdName, md)
	if err != nil {
		return "", "", err
	}
	htmlPath, err := saveArtifactContent(projectID, htmlName, html)
	if err != nil {
		return "", "", err
	}

	mdID := uuid.NewString()
	htmlID := uuid.NewString()
	sid := sessionID
	now := time.Now().UTC()

	mdURL := "file:" + mdPath
	htmlURL := "file:" + htmlPath
	mdContent := md
	htmlContent := html

	mdRes := &project.Resource{
		ID:        mdID,
		ProjectID: projectID,
		SessionID: &sid,
		Type:      "document",
		Name:      mdName,
		Content:   &mdContent,
		URL:       &mdURL,
		CreatedAt: now,
	}
	htmlRes := &project.Resource{
		ID:        htmlID,
		ProjectID: projectID,
		SessionID: &sid,
		Type:      "html_page",
		Name:      htmlName,
		Content:   &htmlContent,
		URL:       &htmlURL,
		CreatedAt: now,
	}
	if err := s.resourceRepo.Create(mdRes); err != nil {
		return "", "", err
	}
	if err := s.resourceRepo.Create(htmlRes); err != nil {
		return "", "", err
	}
	return mdID, htmlID, nil
}

// SaveEditedHTML writes a new html_page artifact for an in-place report edit.
func (s *Syncer) SaveEditedHTML(projectID, sessionID, baseName, html string) (htmlResourceID string, err error) {
	projectID = strings.TrimSpace(projectID)
	sessionID = strings.TrimSpace(sessionID)
	if projectID == "" || sessionID == "" {
		return "", fmt.Errorf("project_id and session_id required")
	}
	ts := time.Now().UnixMilli()
	safeBase := strings.TrimSpace(baseName)
	if safeBase == "" {
		safeBase = sessionID
	}
	safeBase = filepath.Base(strings.ReplaceAll(safeBase, "/", "_"))
	htmlName := fmt.Sprintf("%s_edit_%d.html", safeBase, ts)

	htmlPath, err := saveArtifactContent(projectID, htmlName, html)
	if err != nil {
		return "", err
	}

	htmlID := uuid.NewString()
	sid := sessionID
	now := time.Now().UTC()
	htmlURL := "file:" + htmlPath
	htmlContent := html

	htmlRes := &project.Resource{
		ID:        htmlID,
		ProjectID: projectID,
		SessionID: &sid,
		Type:      "html_page",
		Name:      htmlName,
		Content:   &htmlContent,
		URL:       &htmlURL,
		CreatedAt: now,
	}
	if err := s.resourceRepo.Create(htmlRes); err != nil {
		return "", err
	}
	return htmlID, nil
}
