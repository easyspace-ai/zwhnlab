import type { PreviewReportTargets } from './reportItems'

/**
 * Aichat-specific report layout edit detection.
 * More conservative than osint-dashboard: requires explicit edit verbs, never bare 风格/布局.
 */
export function isReportEditIntent(text: string): boolean {
  const t = text.trim()
  if (!t) return false

  const editCue =
    /(?:改版式|报告排版|视觉风格|章节结构)|(?:改成|改为|换成)|(?:调整|优化|修改).{0,12}(?:排版|布局|样式|风格|配色|颜色|字体|章节|字号|边距|间距|对齐)|(?:背景色?|配色方案)|(?:字体|字号|边距|间距|对齐|居中|加粗).{0,6}(?:调整|修改|改|换|大|小)|(?:缩小|放大).{0,6}(?:字体|标题|字号)/

  return editCue.test(t)
}

export type FollowUpRoute =
  | { kind: 'deepseek' }
  | { kind: 'discuss'; target_resource_id?: string }
  | { kind: 'discuss'; mode: 'edit_html'; target_resource_id: string }

/**
 * Routes follow-up messages. When report context strip is enabled, all non-@w6
 * messages use discuss with the selected preview targets; otherwise deepseek.
 */
export function resolveFollowUpRoute(
  text: string,
  contextEnabled: boolean,
  targets?: PreviewReportTargets,
): FollowUpRoute {
  if (!contextEnabled) return { kind: 'deepseek' }

  const htmlId = targets?.htmlResourceId?.trim()
  const mdId = targets?.mdResourceId?.trim()

  if (htmlId && isReportEditIntent(text)) {
    return { kind: 'discuss', mode: 'edit_html', target_resource_id: htmlId }
  }
  if (mdId) {
    return { kind: 'discuss', target_resource_id: mdId }
  }
  return { kind: 'discuss' }
}
