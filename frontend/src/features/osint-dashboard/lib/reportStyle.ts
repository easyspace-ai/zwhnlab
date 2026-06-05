export type ReportStyle = 'auto' | 'magazine' | 'swiss'

export const REPORT_STYLE_OPTIONS: Array<{
  id: ReportStyle
  label: string
  hint: string
}> = [
  { id: 'auto', label: '智能推荐', hint: '根据报告内容自动选择版式' },
  { id: 'magazine', label: '杂志编辑风', hint: '衬线标题 · 暖色 editorial（guizang 风格 A）' },
  { id: 'swiss', label: '瑞士国际主义', hint: '网格点阵 · 高对比功能色（guizang 风格 B）' },
]

const STORAGE_PREFIX = 'osint-dashboard-report-style:'

export function loadReportStyle(userId: string | undefined): ReportStyle {
  if (!userId) return 'auto'
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${userId}`)
    if (raw === 'magazine' || raw === 'swiss' || raw === 'auto') return raw
  } catch {
    /* ignore */
  }
  return 'auto'
}

export function saveReportStyle(userId: string | undefined, style: ReportStyle): void {
  if (!userId) return
  try {
    localStorage.setItem(`${STORAGE_PREFIX}${userId}`, style)
  } catch {
    /* ignore */
  }
}
