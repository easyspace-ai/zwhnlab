package config

import (
	"os"
	"path/filepath"
	"strings"
)

// ResolveSkillsCustomDir 超级管理员自定义技能 JSON：SKILLS_CUSTOM_DIR 或仓库 data/skills/custom
func ResolveSkillsCustomDir(override string) string {
	if dir := filepath.Clean(strings.TrimSpace(override)); dir != "" && dir != "." {
		return dir
	}
	if wd, err := os.Getwd(); err == nil {
		if root := monorepoRoot(wd); root != "" {
			return filepath.Join(root, "data", "skills", "custom")
		}
	}
	return filepath.Join("data", "skills", "custom")
}
