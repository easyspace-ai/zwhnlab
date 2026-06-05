# 纵向单页报告布局（非 PPT）

- 左侧 sticky 目录（H2 锚点）
- 右侧主栏：Hero（标签 + 标题 + 日期）→ 正文 article
- 单页 `overflow-y: auto`，**无**横向 slide、无键盘翻页
- 章节块 `.report-section` 按 H2 切分，杂志风用衬线标题，瑞士风用无衬线 + 网格背景
- 特殊块：`.verdict` `.evidence` `.caveat` `.action` 由 H2 关键词映射（见 `report_sections.go`）

实现：`backend/internal/application/osintdashboard/render/`
