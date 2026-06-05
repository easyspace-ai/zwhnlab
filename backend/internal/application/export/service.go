package export

import (
	"context"
	"fmt"
	"strings"

	"github.com/easyspace-ai/ylmnote/internal/infrastructure/deepseek"
)

const reflowSystemPrompt = "你是一名专业的文档排版专家。你的任务是将用户提供的 Markdown 文档重新排版，使其结构更清晰、层级更合理、阅读体验更佳。\n\n" +
	"## 核心规则\n" +
	"1. **不改变任何事实内容**：不得增删改任何信息、数据、观点、引用来源\n" +
	"2. **保持完整性**：所有章节、段落、列表项、表格、引用、脚注都必须保留\n" +
	"3. **只优化排版结构**：\n" +
	"   - 修正不合理的标题层级（如避免连续多个一级标题、层级跳跃）\n" +
	"   - 将过长的段落按逻辑拆分为更易读的小段\n" +
	"   - 优化列表结构，确保层级清晰\n" +
	"   - 表格保持原样，不要改动\n" +
	"   - 代码块保持原样\n" +
	"   - 引用块（>）保持原样\n" +
	"   - 脚注引用 [^id] 保持原样\n" +
	"   - 文末的参考文献/参考来源列表保持原样\n" +
	"4. **输出要求**：\n" +
	"   - 直接输出排版后的 Markdown，不要添加任何解释、说明或代码块标记\n" +
	"   - 保留原文的 YAML front matter（如果有）\n" +
	"   - 保留所有的链接、图片引用\n" +
	"   - 保留所有的脚注定义 [^id]: content\n\n" +
	"## 排版优化要点\n" +
	"- 标题层级：一级标题(#)用于文档主标题，二级(##)用于主要章节，三级(###)用于子章节，四级(####)用于细分点\n" +
	"- 段落长度：每个段落控制在3-5句话以内，避免大段文字\n" +
	"- 列表使用：3个及以上并列短句优先考虑改为列表\n" +
	"- 空行：标题前后、段落之间保持适当的空行，增强呼吸感\n" +
	"- 加粗/斜体：保留原文的强调标记，不要新增也不要删除\n" +
	"- 分隔线：适当使用 --- 分隔大章节，但不过分使用"

// Service handles AI-powered markdown reflow for document export.
type Service struct {
	llm *deepseek.Client
}

// NewService creates a new export service.
func NewService(llm *deepseek.Client) *Service {
	return &Service{llm: llm}
}

// ReflowMarkdown uses AI to restructure markdown for better document export quality.
// It reorganizes headings, paragraphs, and lists without changing any factual content.
func (s *Service) ReflowMarkdown(ctx context.Context, markdown string) (string, error) {
	if strings.TrimSpace(markdown) == "" {
		return "", fmt.Errorf("markdown content is empty")
	}
	if s.llm == nil {
		return "", fmt.Errorf("LLM client not configured")
	}

	messages := []deepseek.Message{
		{Role: "user", Content: markdown},
	}

	result, err := s.llm.ChatWithSystem(ctx, reflowSystemPrompt, messages)
	if err != nil {
		return "", fmt.Errorf("AI reflow failed: %w", err)
	}

	result = strings.TrimSpace(result)
	if result == "" {
		return "", fmt.Errorf("AI reflow returned empty result")
	}

	// Clean up common LLM artifacts
	result = cleanupLLMArtifacts(result)

	return result, nil
}

// cleanupLLMArtifacts removes common LLM output wrappers.
func cleanupLLMArtifacts(s string) string {
	// Remove markdown code fence wrappers if the LLM wrapped output in ```markdown
	fences := []string{"markdown", "md", "text"}
	for _, lang := range fences {
		s = strings.TrimPrefix(s, "```"+lang)
		s = strings.TrimPrefix(s, "```"+lang+"\n")
		s = strings.TrimPrefix(s, "``` "+lang)
		s = strings.TrimPrefix(s, "``` "+lang+"\n")
	}
	s = strings.TrimPrefix(s, "```")
	s = strings.TrimPrefix(s, "```\n")
	s = strings.TrimSuffix(s, "```")
	s = strings.TrimSuffix(s, "\n```")
	return strings.TrimSpace(s)
}
