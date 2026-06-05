# Guizang HTML PPT — Generate Slides

根据 outline JSON，生成**仅 slide 区块**的 HTML（`<section class="slide ...">` 列表），将注入 guizang 模板。

## 输入

- outline JSON（含 style、theme、slides）
- 可选：原始 Markdown 参考

## 输出格式（严格遵守）

只输出一个 ```html-slides 代码块，内容为多个 `<section>...</section>`，**不要**输出完整 HTML 文档。

## 风格 A · magazine

- 使用 template 已有 class：`h-hero`, `h-xl`, `lead`, `kicker`, `stat-card`, `grid-2-7-5`, `frame`, `callout` 等
- 每页 section 必须带主题 class：`hero light`, `hero dark`, `light`, `dark` 之一
- 衬线大标题 + 非衬线正文；Lucide 图标用 `<i data-lucide="name"></i>`
- 禁止 emoji

## 风格 B · swiss

- 全程无衬线；每页 `<section class="slide ..." data-layout="Sxx" data-animate="...">`
- 正文页只用 S01–S22 登记版式；封面/封底可用 SWISS-COVER-ASCII / SWISS-CLOSING-ASCII
- 大字 `font-weight:200`，字号用 `min(Xvw, Yvh)` 双约束
- 禁止圆角、阴影、渐变；直角纯色块
- 卡片互斥：`card-ink` / `card-accent` / `card-fill` / `card-outlined` 四选一

## 通用

- 横向 deck 每页 `<section class="slide ...">` 是 `#deck` 的直接子元素
- 内容真实、可演讲，不要 `[必填]` 占位符
- 若缺图片，用占位色块 + caption，路径 `images/placeholder.jpg`
- 页脚 meta 用 `.foot` 或 `.chrome-min`

## 示例（magazine 封面，片段）

```html
<section class="slide hero dark" data-animate="hero">
  <div class="canvas">
    <p class="kicker">Field Note · 2026</p>
    <h1 class="h-hero">主标题</h1>
    <p class="lead">副标题说明</p>
  </div>
</section>
```
