import type { DashboardReportItem } from '../types'

const SYSTEM_PROMPT_RE =
  /你是(一个)?专业|请根据以下|基于以下用户|对指定主题进行|调研分析师|事实核查员/i

const REPORT_BASE_LABEL = '调研报告'

const GENERIC_REPORT_LABELS = new Set([
  '调研报告',
  '报告',
  '未命名报告',
  '研究报告',
  '事实核查报告',
  '新报告',
  '继续研究结果',
])

function firstLine(text: string): string {
  return text.split(/\r?\n/)[0]?.trim() || text.trim()
}

function truncate(text: string, maxLen: number): string {
  const t = text.trim()
  if (!t) return ''
  const chars = [...t]
  if (chars.length <= maxLen) return t
  return `${chars.slice(0, maxLen - 1).join('')}…`
}

function extractTopicHint(text: string): string | null {
  const patterns = [
    /(?:topic|主题|调研主题|核查对象)[：:\s]+(.+?)(?:\s{2,}|$)/i,
    /针对[「『"'](.+?)[」』"']/,
    /关于[「『"'](.+?)[」』"']/,
    /主题[：:]\s*(.+)/,
  ]
  for (const re of patterns) {
    const m = text.match(re)
    const hit = m?.[1]?.trim()
    if (hit) return hit
  }
  return null
}

function stripFilenameSuffix(name: string): string {
  return name
    .replace(/_(?:edit_)?\d{10,}\.(?:html|md)$/i, '')
    .replace(/\.(?:html|md)$/i, '')
    .trim()
}

function stripReportTypeSuffix(title: string): string {
  return title.replace(/\s*\((?:MD|HTML)\)\s*$/i, '').trim()
}

export function isGenericReportLabel(text: string): boolean {
  const t = stripReportTypeSuffix(text.trim())
  if (!t) return true
  if (GENERIC_REPORT_LABELS.has(t)) return true
  if (/^研究报告\s*\((?:MD|HTML)\)$/i.test(t)) return true
  if (SYSTEM_PROMPT_RE.test(firstLine(t))) return true
  return false
}

export function extractMarkdownH1(md: string): string {
  const m = md.match(/^#\s+(.+)$/m)
  return m?.[1]?.trim() ?? ''
}

/** Prefer markdown h1 from this report or a paired MD sibling. */
export function findReportMarkdownSource(
  report: Pick<DashboardReportItem, 'kind' | 'markdown' | 'timestamp'>,
  allReports?: DashboardReportItem[],
): string | undefined {
  if (report.markdown?.trim()) return report.markdown
  if (!allReports?.length) return undefined
  const ts = report.timestamp ?? 0
  let best: DashboardReportItem | undefined
  let bestDelta = Number.POSITIVE_INFINITY
  for (const r of allReports) {
    if (r.kind !== 'markdown' || !r.markdown?.trim()) continue
    const delta = Math.abs((r.timestamp ?? 0) - ts)
    if (delta < bestDelta) {
      bestDelta = delta
      best = r
    }
  }
  if (best && bestDelta <= 15_000) return best.markdown
  return undefined
}

function headlineFromTitle(rawTitle: string, maxLen: number): string {
  const raw = stripReportTypeSuffix(rawTitle.trim())
  if (!raw) return ''

  if (raw.includes('--')) {
    const after = raw.split('--').pop()?.trim()
    if (after && !isGenericReportLabel(after)) return truncate(after, maxLen)
  }

  const topic = extractTopicHint(raw)
  if (topic && !isGenericReportLabel(topic)) return truncate(topic, maxLen)

  const fileBase = stripFilenameSuffix(firstLine(raw)).replace(/_/g, ' ')
  if (fileBase && !isGenericReportLabel(fileBase) && !/^\d+$/.test(fileBase)) {
    return truncate(fileBase, maxLen)
  }

  if (!isGenericReportLabel(raw)) {
    const line = firstLine(raw)
    if (line && !SYSTEM_PROMPT_RE.test(line)) return truncate(line, maxLen)
  }

  return ''
}

/** Document headline for dropdown suffix (after `--`). */
export function extractReportHeadline(
  report: Pick<DashboardReportItem, 'title' | 'kind' | 'markdown' | 'timestamp'>,
  allReports?: DashboardReportItem[],
  maxLen = 48,
): string {
  const md = findReportMarkdownSource(report, allReports)
  if (md) {
    const h1 = extractMarkdownH1(md)
    if (h1 && !isGenericReportLabel(h1)) return truncate(h1, maxLen)
  }

  return headlineFromTitle(report.title, maxLen)
}

/** Produce a short, human-friendly label for report pickers. */
export function shortenReportTitle(raw: string, maxLen = 28): string {
  let title = raw.trim()
  if (!title) return '报告'

  title = stripFilenameSuffix(title)
  title = firstLine(title)

  const topic = extractTopicHint(raw) || extractTopicHint(title)
  if (topic) {
    title = topic
  } else if (SYSTEM_PROMPT_RE.test(title)) {
    const lines = raw.split(/\r?\n/).map((l) => l.trim()).filter(Boolean)
    const substantive = lines.find((l) => !SYSTEM_PROMPT_RE.test(l) && l.length >= 4)
    if (substantive) {
      title = firstLine(substantive)
    } else {
      const stripped = title
        .replace(/^你是一个[^。．]+[。．]\s*/u, '')
        .replace(/^请根据[^。．]+[。．]\s*/u, '')
        .trim()
      title = stripped && !SYSTEM_PROMPT_RE.test(stripped) ? stripped : REPORT_BASE_LABEL
    }
  }

  title = title
    .replace(/^执行[：:]\s*/, '')
    .replace(/^@w6\s*/i, '')
    .trim()

  return truncate(title, maxLen) || '报告'
}

export function resolveReportCategoryLabel(raw: string): string {
  return shortenReportTitle(raw, 12)
}

export function formatReportSelectLabel(
  report: Pick<DashboardReportItem, 'title' | 'kind' | 'markdown' | 'timestamp'>,
  _index: number,
  allReports?: DashboardReportItem[],
): string {
  const kind = report.kind === 'markdown' ? 'MD' : 'HTML'
  const headline = extractReportHeadline(report, allReports, 52)
  if (headline) {
    return `[${kind}] ${REPORT_BASE_LABEL}--${headline}`
  }
  return `[${kind}] ${REPORT_BASE_LABEL}`
}

/** Best display title when creating / updating a report item. */
export function resolveReportItemTitle(
  markdown: string | undefined,
  fallback?: string,
): string {
  const h1 = markdown?.trim() ? extractMarkdownH1(markdown) : ''
  if (h1 && !isGenericReportLabel(h1)) return h1

  const fb = fallback?.trim()
  if (fb) {
    const fromTitle = headlineFromTitle(fb, 80)
    if (fromTitle) return fromTitle
    if (!SYSTEM_PROMPT_RE.test(firstLine(fb))) return firstLine(fb)
  }

  return fb || '报告'
}
