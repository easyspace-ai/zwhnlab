package config

import (
	"os"
	"path/filepath"
	"strings"
)

// ResolveSkillsDefaultsDir 系统默认技能 JSON 目录：SKILLS_DEFAULTS_DIR 或仓库 data/skills/defaults
func ResolveSkillsDefaultsDir(override string) string {
	if dir := filepath.Clean(strings.TrimSpace(override)); dir != "" && dir != "." {
		return dir
	}
	if wd, err := os.Getwd(); err == nil {
		if root := monorepoRoot(wd); root != "" {
			return filepath.Join(root, "data", "skills", "defaults")
		}
	}
	return filepath.Join("data", "skills", "defaults")
}
