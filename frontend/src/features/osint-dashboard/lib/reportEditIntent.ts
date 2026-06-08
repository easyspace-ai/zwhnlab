/** True when a non-@w6 message should patch the active HTML report (vs markdown discuss). */
export function isReportEditIntent(text: string): boolean {
  const t = text.trim()
  if (!t) return false

  // Only explicit layout / style edit instructions — never infer from message length.
  const editCue =
    /(改版式|改成|改为|调整.{0,12}(排版|布局|样式|风格|配色|颜色|字体|章节)|优化.{0,12}(排版|布局|样式|风格|配色|章节)|修改.{0,12}(排版|布局|样式|风格|配色|章节)|换成|背景色?|配色|字体|排版|布局|间距|样式|风格|字号|边距|对齐|居中|加粗|缩小|放大|报告排版|视觉风格|章节结构)/

  return editCue.test(t)
}
