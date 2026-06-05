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
	GroupBusinessConsultant  = "business_consultant"
	GroupIntelligenceAnalyst = "intelligence_analyst"
	GroupStockAnalyst        = "stock_analyst"
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

// discoverSkillGroupIDs lists group folder names present under defaults/ and custom/.
func discoverSkillGroupIDs(defaultsDir, customDir string) ([]string, error) {
	seen := make(map[string]struct{})
	var ids []string

	for _, root := range []string{defaultsDir, customDir} {
		root = strings.TrimSpace(root)
		if root == "" {
			continue
		}
		entries, err := os.ReadDir(root)
		if err != nil {
			if os.IsNotExist(err) {
				continue
			}
			return nil, fmt.Errorf("read skills root %q: %w", root, err)
		}
		for _, ent := range entries {
			if !ent.IsDir() {
				continue
			}
			id := strings.TrimSpace(ent.Name())
			if id == "" || strings.HasPrefix(id, ".") {
				continue
			}
			if _, ok := seen[id]; ok {
				continue
			}
			seen[id] = struct{}{}
			ids = append(ids, id)
		}
	}

	sort.Strings(ids)
	return ids, nil
}

func displayNameForGroup(groupID string) string {
	if name, ok := defaultGroupDisplayNames[groupID]; ok && name != "" {
		return name
	}
	return groupID
}

// LoadMergedGroupsFromDirs discovers group folders on disk and merges defaults/custom skill keys.
func LoadMergedGroupsFromDirs(defaultsDir, customDir string) ([]*SkillGroup, error) {
	groupIDs, err := discoverSkillGroupIDs(defaultsDir, customDir)
	if err != nil {
		return nil, err
	}
	if len(groupIDs) == 0 {
		return nil, fmt.Errorf("no skill group directories found under %q", defaultsDir)
	}

	now := time.Now().UTC()
	var groups []*SkillGroup

	for _, groupID := range groupIDs {
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
			customKeys, err := skillKeysFromDir(customSub)
			if err != nil {
				return nil, err
			}
			for _, k := range customKeys {
				keySet[k] = struct{}{}
			}
		}

		if len(keySet) == 0 {
			continue
		}

		keys := make([]string, 0, len(keySet))
		for k := range keySet {
			keys = append(keys, k)
		}
		sort.Strings(keys)

		displayName := displayNameForGroup(groupID)
		groups = append(groups, &SkillGroup{
			ID:          groupID,
			Name:        displayName,
			Description: strPtr(displayName + "技能组"),
			SkillIDs:    keys,
			CreatedAt:   now,
			UpdatedAt:   now,
		})
	}

	if len(groups) == 0 {
		return nil, fmt.Errorf("no skill groups with skills found under %q", defaultsDir)
	}

	sort.Slice(groups, func(i, j int) bool {
		return groups[i].ID < groups[j].ID
	})
	return groups, nil
}

func skillKeysFromDir(dir string) ([]string, error) {
	files, err := os.ReadDir(dir)
	if err != nil {
		if os.IsNotExist(err) {
			return nil, nil
		}
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
