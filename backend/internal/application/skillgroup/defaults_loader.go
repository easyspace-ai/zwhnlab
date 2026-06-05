package skillgroup

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"sort"
	"strings"
	"time"
)

// Default group folder names under data/skills/defaults/
const (
	GroupBusinessConsultant   = "business_consultant"
	GroupIntelligenceAnalyst  = "intelligence_analyst"
	GroupStockAnalyst         = "stock_analyst"
)

var defaultGroupDisplayNames = map[string]string{
	GroupBusinessConsultant:  "商业咨询",
	GroupIntelligenceAnalyst: "情报分析",
	GroupStockAnalyst:        "股票分析",
}

type defaultSkillKeyFile struct {
	Key       string `json:"key"`
	SortOrder int    `json:"sort_order"`
}

// LoadDefaultGroupsFromDir reads data/skills/defaults/<group>/*.json and builds skill groups.
func LoadDefaultGroupsFromDir(dir string) ([]*SkillGroup, error) {
	return LoadMergedGroupsFromDirs(dir, "")
}

// LoadMergedGroupsFromDirs 合并 defaults 与 custom 各组下的技能 key 列表（custom 中新增技能会并入）
func LoadMergedGroupsFromDirs(defaultsDir, customDir string) ([]*SkillGroup, error) {
	now := time.Now().UTC()
	var groups []*SkillGroup

	for groupID, displayName := range defaultGroupDisplayNames {
		defSub := filepath.Join(defaultsDir, groupID)
		defKeys, err := skillKeysFromDir(defSub)
		if err != nil {
			return nil, err
		}
		keySet := make(map[string]struct{}, len(defKeys))
		for _, k := range defKeys {
			keySet[k] = struct{}{}
		}

		if strings.TrimSpace(customDir) != "" {
			customSub := filepath.Join(customDir, groupID)
			if info, err := os.Stat(customSub); err == nil && info.IsDir() {
				customKeys, err := skillKeysFromDir(customSub)
				if err != nil {
					return nil, err
				}
				for _, k := range customKeys {
					keySet[k] = struct{}{}
				}
			}
		}

		if len(keySet) == 0 {
			return nil, fmt.Errorf("no skills in group %q", groupID)
		}
		keys := make([]string, 0, len(keySet))
		for k := range keySet {
			keys = append(keys, k)
		}
		sort.Strings(keys)

		groups = append(groups, &SkillGroup{
			ID:          groupID,
			Name:        displayName,
			Description: strPtr(displayName + "技能组"),
			SkillIDs:    keys,
			CreatedAt:   now,
			UpdatedAt:   now,
		})
	}

	if len(groups) != len(defaultGroupDisplayNames) {
		return nil, fmt.Errorf("expected %d default skill groups, got %d", len(defaultGroupDisplayNames), len(groups))
	}

	sort.Slice(groups, func(i, j int) bool {
		return groups[i].ID < groups[j].ID
	})
	return groups, nil
}

func skillKeysFromDir(dir string) ([]string, error) {
	files, err := os.ReadDir(dir)
	if err != nil {
		return nil, fmt.Errorf("read group dir %q: %w", dir, err)
	}

	type keyed struct {
		key       string
		sortOrder int
	}
	var items []keyed

	for _, f := range files {
		if f.IsDir() || !strings.HasSuffix(strings.ToLower(f.Name()), ".json") {
			continue
		}
		path := filepath.Join(dir, f.Name())
		b, err := os.ReadFile(path)
		if err != nil {
			return nil, err
		}
		var raw defaultSkillKeyFile
		if err := json.Unmarshal(b, &raw); err != nil {
			return nil, fmt.Errorf("parse %q: %w", path, err)
		}
		key := strings.TrimSpace(raw.Key)
		if key == "" {
			return nil, fmt.Errorf("missing key in %q", path)
		}
		items = append(items, keyed{key: key, sortOrder: raw.SortOrder})
	}

	sort.Slice(items, func(i, j int) bool {
		if items[i].sortOrder != items[j].sortOrder {
			return items[i].sortOrder < items[j].sortOrder
		}
		return items[i].key < items[j].key
	})

	keys := make([]string, len(items))
	for i, it := range items {
		keys[i] = it.key
	}
	return keys, nil
}
