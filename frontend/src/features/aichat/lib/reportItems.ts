import type { DashboardReportItem } from '@/features/osint-dashboard/types'
import { extractArtifactResourceId } from '@/features/osint-dashboard/lib/osintDashboardApi'
import { resolveReportPreviewUrl } from '../api/aichatApi'
import type { ReportRow } from '../api/aichatApi'
import type { ReportView } from '../engine/types'

function reportKindFromType(type?: string): DashboardReportItem['kind'] {
  const t = (type || '').toLowerCase()
  if (t === 'document' || t.includes('markdown') || t === 'md') return 'markdown'
  return 'html'
}

export function reportRowsToItems(rows: ReportRow[]): DashboardReportItem[] {
  const out: DashboardReportItem[] = []
  const seen = new Set<string>()
  for (const r of rows) {
    const resourceId = extractArtifactResourceId(r.url || r.id)
    if (!resourceId || seen.has(resourceId)) continue
    seen.add(resourceId)
    out.push({
      id: resourceId,
      url: r.url || resolveReportPreviewUrl(resourceId),
      resourceId,
      title: r.name || r.title || '报告',
      timestamp: Date.now(),
      kind: reportKindFromType(r.type),
    })
  }
  return out
}

export function eventReportsToItems(reports: ReportView[]): DashboardReportItem[] {
  const out: DashboardReportItem[] = []
  const seen = new Set<string>()
  for (const r of reports) {
    const resourceId = extractArtifactResourceId(r.resourceId)
    if (!resourceId || seen.has(resourceId)) continue
    seen.add(resourceId)
    out.push({
      id: resourceId,
      url: resolveReportPreviewUrl(resourceId),
      resourceId,
      title: r.title || '报告',
      timestamp: Date.now(),
      kind: r.kind,
    })
  }
  return out
}

export function mergeReportItems(
  ...lists: DashboardReportItem[][]
): DashboardReportItem[] {
  const out: DashboardReportItem[] = []
  const seen = new Set<string>()
  for (const list of lists) {
    for (const item of list) {
      const key = item.resourceId || item.id
      if (!key || seen.has(key)) continue
      seen.add(key)
      out.push(item)
    }
  }
  return out
}
