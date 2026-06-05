# 设计系统（PptxGenJS Studio）

## 画布

16:9 → **10" × 5.625"**。边距 `MARGIN_X = 0.6"`，内容宽 `8.8"`。

## 字体层级

| 角色 | 字号 | 字重 |
|------|------|------|
| 封面标题 | 40–44 | bold |
| 章节幕 | 36–40 | bold |
| 页标题 | 26–28 | bold |
| 正文 / bullets | 16–18 | regular |
| 卡片标题 | 15 | bold |
| 卡片正文 | 12–13 | regular |
| footer | 9 | regular |
| 大数字 stat | 32–36 | bold |

字体：`meta.theme.font_body` / `font_heading`（中文默认 Microsoft YaHei）。

## 装饰语法（由 preset 自动应用）

- **顶栏页**：0.85" 高 `primary` 矩形 + 白字标题（bullets_dense / chart 类）
- **章节幕**：全屏 `bg_dark` + 左侧 `accent` 竖条（section_break）
- **封面**：全屏 `bg_dark` + 底部 `accent` 横条（cover_hero 由 preset 绘制）
- **标题下短线**：宽 1.2" × 高 0.06" `accent`（bullets_dense）
- **split 页**：左 4.2" 深色面板 + 右 bullets

## 对比与层次

- 一页只有一个视觉焦点（大数字 / 图表 / 金句）
- 次要文字用 `secondary` 或 `666666`
- 强调数字 / CTA 用 `accent`

## 背景轮换示例（midnight-exec）

`1E2761` → `F5F7FA` → `F5F7FA` → `1E2761`(section) → `F5F7FA` → … → `1E2761`(closing)

勿全程 `F5F7FA`。
