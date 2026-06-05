package osintdashboard

import (
	"strings"

	"github.com/easyspace-ai/ylmnote/internal/application/osintdashboard/w6"
)

// ChatSSEEvent is one dashboard chat SSE payload (mirrors demo Express).
type ChatSSEEvent map[string]interface{}

var skillIntros = map[string]string{
	"fact_check":      "已连接 **W6 子 Agent**，正在按事实核查 Skill 执行多源检索与交叉验证。右侧将展示排版后的 HTML 报告（内容以 W6 产出的 Markdown 为准）。\n\n",
	"info_research":   "已连接 **W6 子 Agent**，正在按调研报告 Skill 执行 OSINT 系统性调研。右侧将展示排版后的 HTML 报告。\n\n",
	"data_collection": "已连接 **W6 子 Agent**，正在按资料收集 Skill 汇总多源素材。右侧将展示排版后的 HTML 报告。\n\n",
}

func SkillIntro(skillKey string) string {
	if s, ok := skillIntros[skillKey]; ok {
		return s
	}
	return skillIntros["fact_check"]
}

// MapW6EventToChatSSE maps w6-server events to dashboard chat SSE.
func MapW6EventToChatSSE(ev w6.Event, reportTitle, sessionID string, emit func(ChatSSEEvent)) {
	switch ev.Type {
	case "log", "tool", "status", "phase":
		emit(ChatSSEEvent{"type": "phase", "phase": "w6", "message": firstNonEmptyStr(ev.Message, "W6 调研中…")})
		if ev.Token != "" {
			emit(ChatSSEEvent{"type": "text_delta", "delta": ev.Token + "\n"})
		}
	case "token":
		if ev.Token != "" {
			emit(ChatSSEEvent{"type": "text_delta", "delta": ev.Token + "\n"})
		}
	case "done":
		if ev.Markdown != "" {
			emit(ChatSSEEvent{"type": "report_md", "markdown": ev.Markdown, "id": sessionID})
		}
		title := ev.RoundTitle
		if title == "" {
			title = reportTitle
		}
		preview := ev.PreviewFile
		if preview == "" {
			preview = ev.ReportURL
		}
		emit(ChatSSEEvent{
			"type":  "report_html",
			"title": title,
			"url":   preview,
			"artifact_id": preview,
		})
		if len(ev.FollowUps) > 0 {
			emit(ChatSSEEvent{"type": "follow_up", "questions": ev.FollowUps})
		}
		emit(ChatSSEEvent{"type": "session", "sessionId": sessionID})
		emit(ChatSSEEvent{
			"type":  "text_delta",
			"delta": "\n\n核查报告已更新。请在右侧 Canvas 阅读；也可点选引导问题或输入追问，将触发新一轮 W6 调研。\n",
		})
	case "error":
		emit(ChatSSEEvent{"type": "error", "message": firstNonEmptyStr(ev.Message, "W6 错误")})
	}
}

func firstNonEmptyStr(v ...string) string {
	for _, s := range v {
		if strings.TrimSpace(s) != "" {
			return s
		}
	}
	return ""
}
