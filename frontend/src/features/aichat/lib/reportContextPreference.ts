const STORAGE_KEY = 'aichat:report-context-dismiss'

type DismissMap = Record<string, string>

function readMap(): DismissMap {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw) as unknown
    if (!parsed || typeof parsed !== 'object') return {}
    return parsed as DismissMap
  } catch {
    return {}
  }
}

function writeMap(map: DismissMap) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(map))
  } catch {
    /* ignore quota */
  }
}

/** Report id for which the user dismissed context binding in this session. */
export function loadDismissedReportId(sessionId: string | undefined): string | null {
  if (!sessionId) return null
  return readMap()[sessionId]?.trim() || null
}

export function saveDismissedReportId(sessionId: string, reportId: string) {
  const map = readMap()
  map[sessionId] = reportId
  writeMap(map)
}

export function clearDismissedReportId(sessionId: string) {
  const map = readMap()
  delete map[sessionId]
  writeMap(map)
}

/** Context is on when a report is selected and user has not dismissed it for that report. */
export function isReportContextEnabled(
  sessionId: string | undefined,
  activeReportId: string | null | undefined,
  dismissedReportId: string | null,
): boolean {
  if (!sessionId || !activeReportId) return false
  return dismissedReportId !== activeReportId
}
