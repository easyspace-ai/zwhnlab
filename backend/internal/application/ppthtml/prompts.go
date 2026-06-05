package ppthtml

import (
	"fmt"
	"os"
	"path/filepath"
	"strings"
)

type Stage string

const (
	StageOutline  Stage = "outline"
	StageGenerate Stage = "generate"
)

type PromptLoader struct {
	dir string
}

func NewPromptLoader(dir string) *PromptLoader {
	return &PromptLoader{dir: strings.TrimSpace(dir)}
}

func (l *PromptLoader) Load(stage Stage) (string, error) {
	name := map[Stage]string{
		StageOutline:  "01-outline.md",
		StageGenerate: "02-generate-slides.md",
	}[stage]
	if name == "" {
		return "", fmt.Errorf("unknown stage %q", stage)
	}
	path := filepath.Join(l.dir, name)
	raw, err := os.ReadFile(path)
	if err != nil {
		return "", fmt.Errorf("read skill %s: %w", path, err)
	}
	return string(raw), nil
}

func DefaultPipelineDir(monorepoRoot string) string {
	if strings.TrimSpace(monorepoRoot) != "" {
		return filepath.Join(monorepoRoot, "data", "ppt", "ppthtml-pipeline")
	}
	return "data/ppt/ppthtml-pipeline"
}

func DefaultGuizangSkillDir() string {
	if v := strings.TrimSpace(os.Getenv("GUIZANG_SKILL_DIR")); v != "" {
		return v
	}
	home, err := os.UserHomeDir()
	if err == nil {
		p := filepath.Join(home, ".claude", "skills", "guizang-ppt-skill")
		if _, err := os.Stat(filepath.Join(p, "assets", "template.html")); err == nil {
			return p
		}
	}
	return ""
}
