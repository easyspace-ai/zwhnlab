# 叙事节奏与版式轮换

借鉴 `pptgen-skill` 与 `studio-pipeline/03-design.md`，避免「每页顶栏 + bullets」单调墙。

## 页型节奏（10–14 页 deck）

| 顺序 | 建议 preset | 作用 |
|------|-------------|------|
| 1 | `cover_hero` | 封面 |
| 2 | `bullets_dense` 或 `stat_row` | 议程 / 摘要 |
| 3 | `section_break` | 第一章幕 |
| 4–5 | `three_col_cards` / `split_insight` | 论点展开 |
| 6 | `chart_sidebar` 或 `stat_row` | 数据证据 |
| 7 | `comparison_table` | 对比 / 选项 |
| 8 | `quote_hero` | 金句收束本章 |
| 9 | `section_break` | 第二章幕（可选） |
| 10 | `timeline_horizontal` | 历程 / 路线图（可选） |
| 11 | `bullets_dense` | 行动建议 |
| 末页 | `closing_cta` | Q&A / 致谢 |

## 禁止

- 连续 **3** 页相同 `layout_preset`
- 连续 **2** 页以上仅用 `bullets_dense`（中间必须插入 `stat_row` / `split_insight` / `three_col_cards`）
- 全 deck 同一 `bg_color`（必须用 `section_break` / `closing_cta` 深色页打断）
- 把报告标题放在每页 footer

## intent → preset 映射

| intent | 首选 preset | 备选 |
|--------|-------------|------|
| title | cover_hero | — |
| agenda | bullets_dense | stat_row（3 条 KPI 议程） |
| section | section_break | — |
| executive_summary | split_insight | stat_row |
| content | bullets_dense | three_col_cards |
| pillars | three_col_cards | comparison_table |
| metrics | stat_row | chart_sidebar |
| data | chart_sidebar | stat_row |
| comparison | comparison_table | three_col_cards |
| timeline | timeline_horizontal | — |
| quote | quote_hero | split_insight |
| closing | closing_cta | — |

## 文案

- 单条 bullet ≤ 90 字（中文）；超长拆成两页
- 每页 2–6 bullets；卡片 body ≤ 180 字
- 数字页必须含 **真实数据**（来自原文），stat 的 value 用短格式（`37天`、`92+`、`1/10`）
