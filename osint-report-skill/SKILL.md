---
name: osint-report-skill
description: 将 W6 产出的 Markdown 轻度整理后，排版为单页纵向滚动的 HTML 报告（杂志编辑风 / 瑞士国际主义）。供 osinttools 情报研究 Dashboard 内部使用，fork 自 guizang-ppt-skill 的美学体系，但不做横向翻页 PPT。
---

# OSINT Report Skill（内部）

## 做什么

1. **01-normalize-markdown**：DeepSeek 轻度整理 MD 结构（不改事实、不删段落）
2. **references/**：纵向单页版式与主题色约定（对应 Go `render` 包 `data-theme`）
3. **assets/**：预留扩展 CSS 片段（当前主样式在 `backend/.../render/report_page.go`）

## 与 guizang-ppt-skill 的区别

| guizang-ppt-skill | osint-report-skill |
|-------------------|-------------------|
| 横向翻页 slides | **单页纵向滚动** |
| LLM 生成每页 HTML | LLM **只整理 MD**；HTML 由 Go 模板确定性生成 |
| 对外分享 PPT | **W6 调研报告展示**（事实核查 / 调研 / 资料收集） |

## 环境变量

```bash
OSINT_REPORT_SKILL_DIR=/path/to/osint-report-skill
```

默认：仓库根目录 `osint-report-skill/`。

## 风格

用户在前端选择 `report_style`：

- `magazine` — 杂志编辑风（guizang 风格 A）
- `swiss` — 瑞士国际主义（guizang 风格 B）
- `auto` — 根据内容启发式选择
