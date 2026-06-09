import type { DashboardReportItem } from '@/features/osint-dashboard/types'
import { extractArtifactResourceId } from '@/features/osint-dashboard/lib/osintDashboardApi'
import { resolveReportPreviewUrl } from '../api/aichatApi'
import type { ReportRow } from '../api/aichatApi'
import type { ReportView } from '../engine/types'

/** Aichat report item; may carry roundId from timeline projection for HTML/MD pairing. */
export type SessionReportItem = DashboardReportItem & { roundId?: string }

export type PreviewReportTargets = {
  mdResourceId?: string
  htmlResourceId?: string
}

const PAIR_TIMESTAMP_MS = 15_000

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

export function eventReportsToItems(reports: ReportView[]): SessionReportItem[] {
  const out: SessionReportItem[] = []
  const seen = new Set<string>()
  for (const [idx, r] of reports.entries()) {
    const resourceId = extractArtifactResourceId(r.resourceId)
    if (!resourceId || seen.has(resourceId)) continue
    seen.add(resourceId)
    out.push({
      id: resourceId,
      url: resolveReportPreviewUrl(resourceId),
      resourceId,
      title: r.title || '报告',
      timestamp: idx * 1000,
      kind: r.kind,
      roundId: r.roundId,
    })
  }
  return out
}

function findPairedReport(
  active: SessionReportItem,
  reports: SessionReportItem[],
  kind: DashboardReportItem['kind'],
): SessionReportItem | undefined {
  if (active.roundId) {
    const match = reports.find((r) => r.roundId === active.roundId && r.kind === kind)
    if (match) return match
  }
  const ts = active.timestamp ?? 0
  let best: SessionReportItem | undefined
  let bestDelta = Number.POSITIVE_INFINITY
  for (const r of reports) {
    if (r.kind !== kind) continue
    const delta = Math.abs((r.timestamp ?? 0) - ts)
    if (delta < bestDelta) {
      bestDelta = delta
      best = r
    }
  }
  if (best && bestDelta <= PAIR_TIMESTAMP_MS) return best
  const idx = reports.findIndex((r) => r.id === active.id)
  if (idx >= 0) {
    for (let d = 1; d <= 2; d++) {
      const left = reports[idx - d]
      const right = reports[idx + d]
      if (left?.kind === kind) return left
      if (right?.kind === kind) return right
    }
  }
  return undefined
}

/** Resolve markdown/HTML resource ids for the preview-selected report. */
export function resolveActivePreviewTargets(
  active: DashboardReportItem | undefined,
  reports: SessionReportItem[],
): PreviewReportTargets {
  if (!active) return {}
  const rid = active.resourceId?.trim() || active.id?.trim()
  if (!rid) return {}

  const sessionActive = reports.find((r) => r.id === active.id) ?? ({ ...active } as SessionReportItem)
  if (sessionActive.kind === 'markdown') {
    const html = findPairedReport(sessionActive, reports, 'html')
    return {
      mdResourceId: rid,
      htmlResourceId: html?.resourceId?.trim(),
    }
  }
  const md = findPairedReport(sessionActive, reports, 'markdown')
  return {
    htmlResourceId: rid,
    mdResourceId: md?.resourceId?.trim(),
  }
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

/** Prefer timeline report_ready artifacts; fall back to API list for legacy sessions. */
export function resolveSessionReports(
  eventItems: DashboardReportItem[],
  apiItems: DashboardReportItem[],
): DashboardReportItem[] {
  if (eventItems.length > 0) return eventItems
  return apiItems
}
