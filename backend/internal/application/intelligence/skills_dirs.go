package intelligence

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"sort"
	"strings"
)

// SystemSkillsUserID 全局技能在 intelligence_skills 表中的固定 user_id（所有用户共享）
const SystemSkillsUserID = "00000000-0000-0000-0000-000000000000"

// SkillFileRecord 磁盘上的技能定义及其所属技能组目录名
type SkillFileRecord struct {
	GroupID string
	SkillCreateInput
}

// LoadMergedSkillsFromDirs 合并 defaults 与 custom（同 key 时 custom 覆盖）
func LoadMergedSkillsFromDirs(defaultsDir, customDir string) ([]SkillFileRecord, error) {
	byKey := make(map[string]SkillFileRecord)

	if err := walkSkillFiles(defaultsDir, byKey); err != nil {
		return nil, err
	}
	if customDir != "" {
		if err := walkSkillFiles(customDir, byKey); err != nil {
			return nil, err
		}
	}

	if len(byKey) == 0 {
		return nil, fmt.Errorf("no skill definitions found under %q", defaultsDir)
	}

	out := make([]SkillFileRecord, 0, len(byKey))
	for _, rec := range byKey {
		out = append(out, rec)
	}
	sort.Slice(out, func(i, j int) bool {
		return out[i].Key < out[j].Key
	})
	return out, nil
}

func walkSkillFiles(root string, byKey map[string]SkillFileRecord) error {
	root = strings.TrimSpace(root)
	if root == "" {
		return nil
	}
	info, err := os.Stat(root)
	if err != nil {
		if os.IsNotExist(err) {
			return nil
		}
		return fmt.Errorf("stat skills dir %q: %w", root, err)
	}
	if !info.IsDir() {
		return fmt.Errorf("skills path %q is not a directory", root)
	}

	return filepath.WalkDir(root, func(path string, d os.DirEntry, err error) error {
		if err != nil {
			return err
		}
		if d.IsDir() || !strings.HasSuffix(strings.ToLower(path), ".json") {
			return nil
		}
		rel, err := filepath.Rel(root, path)
		if err != nil {
			return err
		}
		parts := strings.Split(filepath.ToSlash(rel), "/")
		if len(parts) < 2 {
			return nil
		}
		groupID := strings.TrimSpace(parts[0])

		b, err := os.ReadFile(path)
		if err != nil {
			return fmt.Errorf("read skill file %q: %w", path, err)
		}
		var raw defaultSkillFile
		if err := json.Unmarshal(b, &raw); err != nil {
			return fmt.Errorf("parse skill file %q: %w", path, err)
		}
		in, err := raw.toCreateInput()
		if err != nil {
			return fmt.Errorf("skill file %q: %w", path, err)
		}
		byKey[in.Key] = SkillFileRecord{GroupID: groupID, SkillCreateInput: in}
		return nil
	})
}

// FindSkillGroupID 在 defaults/custom 目录中定位技能 key 所属 group 文件夹
func FindSkillGroupID(defaultsDir, customDir, key string) (string, error) {
	key = strings.TrimSpace(key)
	if key == "" {
		return "", fmt.Errorf("empty skill key")
	}
	for _, dir := range []string{customDir, defaultsDir} {
		dir = strings.TrimSpace(dir)
		if dir == "" {
			continue
		}
		if group, ok := findKeyInSkillsRoot(dir, key); ok {
			return group, nil
		}
	}
	return "", fmt.Errorf("skill group not found for key %q", key)
}

func findKeyInSkillsRoot(root, key string) (string, bool) {
	entries, err := os.ReadDir(root)
	if err != nil {
		return "", false
	}
	for _, ent := range entries {
		if !ent.IsDir() {
			continue
		}
		groupID := ent.Name()
		sub := filepath.Join(root, groupID)
		files, err := os.ReadDir(sub)
		if err != nil {
			continue
		}
		for _, f := range files {
			if f.IsDir() || !strings.HasSuffix(strings.ToLower(f.Name()), ".json") {
				continue
			}
			path := filepath.Join(sub, f.Name())
			b, err := os.ReadFile(path)
			if err != nil {
				continue
			}
			var raw defaultSkillFile
			if err := json.Unmarshal(b, &raw); err != nil {
				continue
			}
			if strings.TrimSpace(raw.Key) == key {
				return groupID, true
			}
		}
	}
	return "", false
}

// WriteSkillToCustomDir 将技能写入 custom/{group_id}/{key}.json
func WriteSkillToCustomDir(customDir, groupID string, in SkillCreateInput) error {
	groupID = strings.TrimSpace(groupID)
	if groupID == "" {
		return fmt.Errorf("group_id is required")
	}
	if err := os.MkdirAll(filepath.Join(customDir, groupID), 0o755); err != nil {
		return fmt.Errorf("mkdir custom skill group: %w", err)
	}

	var formSchema json.RawMessage
	if err := json.Unmarshal([]byte(in.FormSchema), &formSchema); err != nil {
		return fmt.Errorf("invalid form_schema: %w", err)
	}

	raw := defaultSkillFile{
		Key:            in.Key,
		Name:           in.Name,
		Description:    in.Description,
		Icon:           in.Icon,
		FormSchema:     formSchema,
		PromptTemplate: in.PromptTemplate,
		IsEnabled:      in.IsEnabled,
		SortOrder:      in.SortOrder,
	}
	b, err := json.MarshalIndent(raw, "", "  ")
	if err != nil {
		return err
	}
	path := filepath.Join(customDir, groupID, in.Key+".json")
	return os.WriteFile(path, append(b, '\n'), 0o644)
}

// DeleteCustomSkillFile 删除 custom 中的覆盖文件（若存在）
func DeleteCustomSkillFile(customDir, groupID, key string) error {
	path := filepath.Join(customDir, groupID, key+".json")
	if err := os.Remove(path); err != nil {
		if os.IsNotExist(err) {
			return nil
		}
		return err
	}
	return nil
}

// LoadDefaultsOnlySkillsFromDir 仅加载 defaults（用于恢复默认，不含 custom 覆盖）
func LoadDefaultsOnlySkillsFromDir(defaultsDir string) ([]SkillCreateInput, error) {
	return LoadDefaultSkillsFromDir(defaultsDir)
}
