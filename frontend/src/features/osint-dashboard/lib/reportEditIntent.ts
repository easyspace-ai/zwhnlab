/** True when a non-@w6 message should patch the active HTML report (vs markdown discuss). */
export function isReportEditIntent(text: string): boolean {
  const t = text.trim()
  if (!t) return false

  const editCue =
    /(改成|改为|调整|优化|修改|换成|背景|颜色|配色|字体|排版|布局|间距|样式|风格|字号|边距|对齐|居中|加粗|缩小|放大|去掉|删除|增加|添加|报告排版|视觉风格|章节结构)/

  if (editCue.test(t)) return true

  // Trailing question mark without edit cues → content Q&A (discuss on markdown).
  if (/[？?]$/.test(t)) return false

  // Default: short imperative tweaks on the open report tab.
  return t.length <= 120
}
