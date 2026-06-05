import type { DashboardChatMessage, DashboardReportItem } from '../types'

const ACTIVE_SUFFIX = 'active-v1'
const SNAPSHOT_PREFIX = 'session-'

export interface PersistedDashboardSession {
  messages: DashboardChatMessage[]
  reports: DashboardReportItem[]
  activeReportId: string | null
  sessionId: string | null
  followUpQuestions: string[]
  skillKey: string | null
  title?: string
  savedAt: number
}

function userPrefix(userId: string): string {
  return `osint-dashboard:${userId}:`
}

function snapshotKey(userId: string, sessionId: string): string {
  return `${userPrefix(userId)}${SNAPSHOT_PREFIX}${sessionId}`
}

function activeKey(userId: string): string {
  return `${userPrefix(userId)}${ACTIVE_SUFFIX}`
}

export function loadSessionSnapshot(
  userId: string,
  sessionId: string,
): PersistedDashboardSession | null {
  try {
    const raw = localStorage.getItem(snapshotKey(userId, sessionId))
    if (!raw) return null
    const data = JSON.parse(raw) as PersistedDashboardSession
    if (!data || !Array.isArray(data.messages)) return null
    return data
  } catch {
    return null
  }
}

export function saveSessionSnapshot(
  userId: string,
  sessionId: string,
  state: Omit<Partial<PersistedDashboardSession>, 'savedAt' | 'sessionId'>,
): void {
  try {
    const payload: PersistedDashboardSession = {
      messages: state.messages || [],
      reports: state.reports || [],
      activeReportId: state.activeReportId ?? null,
      followUpQuestions: state.followUpQuestions || [],
      skillKey: state.skillKey ?? null,
      sessionId,
      savedAt: Date.now(),
    }
    localStorage.setItem(snapshotKey(userId, sessionId), JSON.stringify(payload))
    localStorage.setItem(activeKey(userId), sessionId)
  } catch {
    /* quota / private mode */
  }
}

export function getActiveSessionId(userId: string): string | null {
  try {
    return localStorage.getItem(activeKey(userId))
  } catch {
    return null
  }
}

export function clearUserSnapshots(userId: string): void {
  try {
    const prefix = userPrefix(userId)
    const keys: string[] = []
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i)
      if (k?.startsWith(prefix)) keys.push(k)
    }
    for (const k of keys) localStorage.removeItem(k)
  } catch {
    /* ignore */
  }
}
