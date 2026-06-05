package reportskill

import (
	"fmt"
	"os"
	"path/filepath"
	"strings"

	"github.com/easyspace-ai/ylmnote/internal/config"
)

const (
	PromptNormalizeMarkdown = "prompts/01-normalize-markdown.md"
)

// Loader reads osint-report-skill files from disk.
type Loader struct {
	dir string
}

func NewLoader(dir string) *Loader {
	return &Loader{dir: strings.TrimSpace(dir)}
}

// ResolveDir returns OSINT_REPORT_SKILL_DIR or <monorepo>/osint-report-skill.
func ResolveDir(override string) string {
	if v := strings.TrimSpace(override); v != "" {
		return v
	}
	if root := config.MonorepoRoot(); root != "" {
		p := filepath.Join(root, "osint-report-skill")
		if fileExists(filepath.Join(p, "SKILL.md")) {
			return p
		}
	}
	return ""
}

func fileExists(path string) bool {
	_, err := os.Stat(path)
	return err == nil
}

func (l *Loader) Dir() string { return l.dir }

func (l *Loader) Available() bool {
	return l.dir != "" && fileExists(filepath.Join(l.dir, "SKILL.md"))
}

func (l *Loader) LoadPrompt(rel string) (string, error) {
	if l.dir == "" {
		return "", fmt.Errorf("osint-report-skill dir not configured")
	}
	path := filepath.Join(l.dir, rel)
	raw, err := os.ReadFile(path)
	if err != nil {
		return "", fmt.Errorf("read %s: %w", path, err)
	}
	return string(raw), nil
}
