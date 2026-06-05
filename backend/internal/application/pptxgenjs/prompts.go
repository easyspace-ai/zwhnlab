package pptxgenjs

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
	pipelineDir string
	skillDir    string
}

func NewPromptLoader(pipelineDir, skillDir string) *PromptLoader {
	return &PromptLoader{
		pipelineDir: strings.TrimSpace(pipelineDir),
		skillDir:    strings.TrimSpace(skillDir),
	}
}

func (l *PromptLoader) Load(stage Stage) (string, error) {
	name := map[Stage]string{
		StageOutline:  "01-outline.md",
		StageGenerate: "02-generate-schema.md",
	}[stage]
	if name == "" {
		return "", fmt.Errorf("unknown stage %q", stage)
	}
	path := filepath.Join(l.pipelineDir, name)
	raw, err := os.ReadFile(path)
	if err != nil {
		return "", fmt.Errorf("read prompt %s: %w", path, err)
	}
	base := string(raw)
	ref := stageReferenceFile(stage)
	if ref == "" || l.skillDir == "" {
		return base, nil
	}
	refPath := filepath.Join(l.skillDir, "references", ref)
	refRaw, err := os.ReadFile(refPath)
	if err != nil {
		return base, nil
	}
	return base + "\n\n---\n\n# Skill Reference (pptxgenjs-skill)\n\n" + string(refRaw), nil
}

func stageReferenceFile(stage Stage) string {
	switch stage {
	case StageOutline:
		return "outline-schema.md"
	case StageGenerate:
		// Order matters: rhythm + presets + themes + design
		return "" // bundled below
	default:
		return ""
	}
}

// LoadGenerate bundles multiple references for the generate stage.
func (l *PromptLoader) LoadGenerate() (string, error) {
	base, err := l.Load(StageGenerate)
	if err != nil {
		return "", err
	}
	if l.skillDir == "" {
		return base, nil
	}
	refs := []string{
		"narrative-rhythm.md",
		"slide-schema-presets.md",
		"brand-themes.md",
		"design-system.md",
		"qa-guide.md",
	}
	var b strings.Builder
	b.WriteString(base)
	for _, name := range refs {
		raw, err := os.ReadFile(filepath.Join(l.skillDir, "references", name))
		if err != nil {
			continue
		}
		b.WriteString("\n\n---\n\n## ")
		b.WriteString(strings.TrimSuffix(name, ".md"))
		b.WriteString("\n\n")
		b.Write(raw)
	}
	return b.String(), nil
}

func (l *PromptLoader) LoadNormalize() (string, error) {
	path := filepath.Join(l.pipelineDir, "00-normalize-product-schema.md")
	raw, err := os.ReadFile(path)
	if err != nil {
		return "", fmt.Errorf("read prompt %s: %w", path, err)
	}
	return string(raw), nil
}

func (l *PromptLoader) LoadOutline() (string, error) {
	base, err := l.Load(StageOutline)
	if err != nil {
		return "", err
	}
	if l.skillDir == "" {
		return base, nil
	}
	raw, err := os.ReadFile(filepath.Join(l.skillDir, "references", "narrative-rhythm.md"))
	if err != nil {
		return base, nil
	}
	return base + "\n\n---\n\n## narrative-rhythm\n\n" + string(raw), nil
}

func DefaultPipelineDir(monorepoRoot string) string {
	if strings.TrimSpace(monorepoRoot) != "" {
		return filepath.Join(monorepoRoot, "data", "ppt", "pptxgenjs-pipeline")
	}
	return "data/ppt/pptxgenjs-pipeline"
}

func DefaultSkillDir(monorepoRoot string) string {
	if strings.TrimSpace(monorepoRoot) != "" {
		return filepath.Join(monorepoRoot, "data", "ppt", "pptxgenjs-skill")
	}
	return "data/ppt/pptxgenjs-skill"
}
