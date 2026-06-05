---
name: pptxgenjs-studio
description: >
  OSINT Tools 内置 PptxGenJS 可编辑 PPT 管线。AI 输出 Slide Schema（优先 layout_preset + slots），
  浏览器端按 layout-presets.json 程序化排版。触发：PptxGenJS PPT、可编辑 pptx、Slide Schema、
  路演 deck、调研汇报幻灯片。与 HTML Guizang（ppthtml）、OhMyPPT（/ppt）并列，勿混用。
---

# PptxGenJS Studio Skill

## 架构

```
Markdown/主题 → outline.json（叙事 + 每页 layout_preset）
            → schema.json（仅 slots，禁止手写坐标）
            → layout-presets 展开为 elements
            → PptxGenJS → .pptx
```

| 层 | 文件 | 职责 |
|----|------|------|
| 规划 | `references/outline-schema.md` | 页序、intent、preset 选型 |
| 节奏 | `references/narrative-rhythm.md` | 禁止单调重复、数据页规则 |
| 视觉 | `references/design-system.md` | 主题、字体层级、装饰语法 |
| 填槽 | `references/slide-schema-presets.md` | preset + slots 契约 |
| 品牌 | `references/brand-themes.md` | meta.theme 色板 |
| 机器 | `scripts/layout-presets.json` | 坐标与 region 定义 |
| 机器 | `scripts/theme-presets.json` | 内置 theme 对象 |

## 铁律

1. **≥80% 页面** 使用 `layout_preset` + `slots`，禁止手写 `elements[]` 坐标
2. **禁止** 连续 3 页相同 `layout_preset`（`bullets_dense` 最多连续 2 页）
3. **禁止** 每页相同 `bg_color`；章节用 `section_break`（深色）打断浅色内容页
4. **footer** 写章节短标签（如 `合规风险 · 03`），不要整份报告标题复读
5. 数据页必须用 `stat_row` / `chart_sidebar` / `comparison_table` 之一，不要全用 bullets

## 默认路由

- 用户提供 **长文调研 / Markdown 报告** → 10–14 页，preset 多样化
- 用户说 **极简 / 学术** → `minimal-white` + `bullets_dense` / `section_break`
- 用户说 **科技 / 产品** → `tech-dark`
- 用户说 **路演 / 创业** → `coral-energy` + `stat_row` + `split_insight`

## 与 data/ppt 其他 skill 关系

| Skill | 何时用 |
|-------|--------|
| `pptxgenjs-skill`（本目录） | `/pptxgenjs` 产品路径 |
| `pptgen-skill` | Go pptgen / pom XML |
| `ai-pptx-gen`（levenppt） | Cursor 本地 Mode P 全量 |
| `ppthtml-pipeline` | HTML Guizang |

## 质检

生成后对照 `references/qa-guide.md`：无占位符、无连续同 preset、封面/结语存在、数字来自原文。
