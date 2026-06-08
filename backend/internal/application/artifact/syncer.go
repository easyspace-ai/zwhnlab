package artifact

import (
	"context"
	"encoding/json"
	"fmt"
	"log/slog"
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/easyspace-ai/ylmnote/internal/domain/project"
	wsdk "ws-chat-tester/sdk"
)

// Syncer persists upstream artifact resources into the local resources table.
type Syncer struct {
	resourceRepo project.ResourceRepository
	sdkClient    *wsdk.Client
}

func NewSyncer(resourceRepo project.ResourceRepository, sdkClient *wsdk.Client) *Syncer {
	return &Syncer{resourceRepo: resourceRepo, sdkClient: sdkClient}
}

const (
	agentMessagesPageSize = 200
	agentMessagesMaxPages = 30
)

// SyncFromAgentMessages 拉取 W6 远程聊天历史并提取 artifact 落库（本地缓存）。
func (s *Syncer) SyncFromAgentMessages(ctx context.Context, sessionID string) (int, error) {
	if s.sdkClient == nil {
		return 0, fmt.Errorf("sdk client not configured")
	}
	if strings.TrimSpace(sessionID) == "" {
		return 0, fmt.Errorf("session_id required")
	}

	total := 0
	for page := 0; page < agentMessagesMaxPages; page++ {
		offset := page * agentMessagesPageSize
		resp, err := s.sdkClient.AgentMessages(ctx, sessionID, agentMessagesPageSize, offset)
		if err != nil {
			return total, fmt.Errorf("agent messages offset=%d: %w", offset, err)
		}
		if len(resp.Messages) == 0 {
			break
		}
		for _, msg := range resp.Messages {
			if strings.EqualFold(msg.Kind, "from_user") {
				continue
			}
			total += s.processMessageParts(sessionID, msg.MessagePart)
		}
		if len(resp.Messages) < agentMessagesPageSize {
			break
		}
	}

	slog.Info("[ArtifactSyncer] sync complete",
		slog.String("session_id", sessionID),
		slog.Int("resources_processed", total),
	)
	return total, nil
}

func (s *Syncer) processMessageParts(sessionID string, raw interface{}) int {
	count := 0
	for _, part := range parseMessageParts(raw) {
		if partType, _ := part["type"].(string); !strings.EqualFold(partType, "resource") {
			continue
		}
		resource, ok := part["resource"].(map[string]any)
		if !ok {
			continue
		}
		s.ProcessResourceForW6Session(sessionID, resource)
		count++
	}
	return count
}

// ExtractResourcesFromUpdateFrame parses a WS update frame and processes resources.
func (s *Syncer) ExtractResourcesFromUpdateFrame(projectID, sessionID string, rawMsg []byte) int {
	var frame map[string]any
	if err := json.Unmarshal(rawMsg, &frame); err != nil {
		return 0
	}
	msgType, _ := frame["type"].(string)
	if msgType != "update" {
		return 0
	}
	messages, ok := frame["messages"].([]any)
	if !ok {
		return 0
	}
	count := 0
	for _, rawMsg := range messages {
		msg, ok := rawMsg.(map[string]any)
		if !ok {
			continue
		}
		if kind, _ := msg["kind"].(string); kind == "from_user" {
			continue
		}
		parts, ok := msg["message_parts"].([]any)
		if !ok {
			continue
		}
		for _, rawPart := range parts {
			part, ok := rawPart.(map[string]any)
			if !ok {
				continue
			}
			if partType, _ := part["type"].(string); partType != "resource" {
				continue
			}
			resource, ok := part["resource"].(map[string]any)
			if !ok {
				continue
			}
			s.ProcessResourceMap(projectID, sessionID, resource)
			count++
		}
	}
	return count
}

// w6ArtifactProjectID 内部占位，满足 resources.project_id 非空；与业务 project 无关。
const w6ArtifactProjectID = "w6-direct"

// ProcessResourceForW6Session upserts artifact for a direct W6 session (no app project_id).
func (s *Syncer) ProcessResourceForW6Session(sessionID string, resource map[string]any) {
	s.processResource(w6ArtifactProjectID, sessionID, sessionID, resource, true)
}

// ProcessResourceMap upserts one artifact resource (OSINT 会话 WS，带真实 project_id).
func (s *Syncer) ProcessResourceMap(projectID, sessionID string, resource map[string]any) {
	s.processResource(projectID, sessionID, projectID, resource, false)
}

func (s *Syncer) processResource(projectID, sessionID, storageScope string, resource map[string]any, useResourceIDLookup bool) {
	id, _ := resource["id"].(string)

	var filename, path string
	if data, ok := resource["data"].(map[string]any); ok {
		filename, _ = data["filename"].(string)
		path, _ = data["path"].(string)
	}
	if filename == "" {
		filename, _ = resource["name"].(string)
	}

	if id == "" && filename == "" {
		return
	}

	resourceType := inferArtifactResourceType(filename)
	resourceID := id
	if resourceID == "" {
		resourceID = "artifact::" + filename
	}

	var content *string
	if c, ok := resource["content"].(string); ok && strings.TrimSpace(c) != "" {
		content = &c
	} else if byteArr, ok := resource["content"].([]interface{}); ok && len(byteArr) > 0 {
		byteSlice := make([]byte, 0, len(byteArr))
		for _, b := range byteArr {
			if num, ok := b.(float64); ok {
				byteSlice = append(byteSlice, byte(int(num)))
			}
		}
		if len(byteSlice) > 0 {
			decoded := string(byteSlice)
			content = &decoded
		}
	}

	fetchedFromUpstream := false
	if content == nil && id != "" && !strings.HasPrefix(id, "artifact::") && s.sdkClient != nil {
		ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
		defer cancel()
		data, _, err := s.sdkClient.DownloadSource(ctx, id)
		if err == nil && len(data) > 0 {
			c := string(data)
			content = &c
			fetchedFromUpstream = true
		}
	}

	url := ""
	if content != nil {
		if savedPath, err := saveArtifactContent(storageScope, filename, *content); err == nil && savedPath != "" {
			url = "file:" + savedPath
			_ = fetchedFromUpstream
		}
	}
	if url == "" {
		if id != "" && !strings.HasPrefix(id, "artifact::") {
			url = "source:" + id
		} else if path != "" {
			url = "sdk-file:" + path
		}
	}

	var existing *project.Resource
	var err error
	if useResourceIDLookup {
		existing, err = s.resourceRepo.GetByResourceIDAndSessionID(resourceID, sessionID)
	} else {
		existing, err = s.resourceRepo.GetByID(projectID, resourceID)
	}
	if err == nil && existing != nil {
		existing.Name = filename
		if url != "" {
			existing.URL = &url
		}
		if content != nil {
			existing.Content = content
		}
		existing.SessionID = &sessionID
		existing.Type = resourceType
		_ = s.resourceRepo.Update(existing)
		return
	}

	sid := sessionID
	entity := &project.Resource{
		ID:        resourceID,
		ProjectID: projectID,
		SessionID: &sid,
		Type:      resourceType,
		Name:      filename,
		Content:   content,
		CreatedAt: time.Now().UTC(),
	}
	if url != "" {
		entity.URL = &url
	}
	_ = s.resourceRepo.Create(entity)
}

func parseMessageParts(raw interface{}) []map[string]any {
	if raw == nil {
		return nil
	}
	switch v := raw.(type) {
	case []interface{}:
		out := make([]map[string]any, 0, len(v))
		for _, item := range v {
			if m, ok := item.(map[string]any); ok {
				out = append(out, m)
			}
		}
		return out
	default:
		b, err := json.Marshal(raw)
		if err != nil {
			return nil
		}
		var arr []map[string]any
		if err := json.Unmarshal(b, &arr); err != nil {
			return nil
		}
		return arr
	}
}

func inferArtifactResourceType(filename string) string {
	lower := strings.ToLower(filename)
	if strings.HasSuffix(lower, ".html") || strings.HasSuffix(lower, ".htm") {
		return "html_page"
	}
	if strings.HasSuffix(lower, ".pdf") {
		return "pdf"
	}
	if strings.HasSuffix(lower, ".md") {
		return "document"
	}
	return "artifact"
}

func saveArtifactContent(projectID, filename, content string) (string, error) {
	filename = filepath.Base(filename)
	if filename == "" || filename == "." || filename == ".." {
		return "", fmt.Errorf("invalid filename")
	}
	timestamp := time.Now().Unix()
	ext := filepath.Ext(filename)
	nameWithoutExt := strings.TrimSuffix(filename, ext)
	filename = fmt.Sprintf("%s_%d%s", nameWithoutExt, timestamp, ext)

	workDir, err := os.Getwd()
	if err != nil {
		workDir = "."
	}
	dirPath := filepath.Join(workDir, "artifacts", projectID)
	if err := os.MkdirAll(dirPath, 0755); err != nil {
		return "", fmt.Errorf("mkdir: %w", err)
	}
	filePath := filepath.Join(dirPath, filename)
	if err := os.WriteFile(filePath, []byte(content), 0644); err != nil {
		return "", fmt.Errorf("write: %w", err)
	}
	return filepath.Join("artifacts", projectID, filename), nil
}
