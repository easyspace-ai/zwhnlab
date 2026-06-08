import { API_CONFIG } from '@/osint/config/api'
import { getOsintAccessToken, handleUnauthorizedResponse } from '@/osint/auth'
import { resolveReportPreviewUrl as resolveArtifactPreviewUrl } from '@/features/osint-dashboard/lib/osintDashboardApi'
import type { RoundKind, SessionEvent } from '../engine/types'

function apiUrl(path: string): string {
  const p = path.startsWith('/') ? path : `/${path}`
  return `${API_CONFIG.baseUrl}${p}`
}

async function fetchJSON<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getOsintAccessToken()
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(init?.headers as Record<string, string>),
  }
  if (token) headers.Authorization = `Bearer ${token}`
  const res = await fetch(apiUrl(path), { ...init, headers })
  if (res.status === 401) {
    handleUnauthorizedResponse(401)
    throw new Error('Unauthorized')
  }
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error((err as { detail?: string }).detail || res.statusText)
  }
  return res.json() as Promise<T>
}

export type TimelineResponse = {
  events: SessionEvent[]
  next_seq: number
  active_round_id: string | null
}

export function fetchTimeline(sessionId: string, sinceSeq = 0): Promise<TimelineResponse> {
  const q = sinceSeq > 0 ? `?sinceSeq=${sinceSeq}` : ''
  return fetchJSON(`/aichat/sessions/${encodeURIComponent(sessionId)}/timeline${q}`)
}

export function fetchSummary(sessionId: string): Promise<{
  session_id: string
  active_round_id: string | null
  next_seq: number
  session_title: string
}> {
  return fetchJSON(`/aichat/sessions/${encodeURIComponent(sessionId)}/summary`)
}

export type StartRoundBody = {
  kind: RoundKind
  skill_key?: string
  form_data?: Record<string, unknown>
  message?: string
  rendered_prompt?: string
  report_style?: string
}

export function startRound(
  sessionId: string,
  body: StartRoundBody,
  signal?: AbortSignal,
): Promise<{ round_id: string }> {
  return fetchJSON(`/aichat/sessions/${encodeURIComponent(sessionId)}/rounds`, {
    method: 'POST',
    body: JSON.stringify(body),
    signal,
  })
}

export function stopRound(sessionId: string, roundId: string): Promise<{ ok: boolean }> {
  return fetchJSON(
    `/aichat/sessions/${encodeURIComponent(sessionId)}/rounds/${encodeURIComponent(roundId)}/stop`,
    { method: 'POST', body: '{}' },
  )
}

export function discussRound(sessionId: string, roundId: string, message: string): Promise<{ round_id: string }> {
  return fetchJSON(
    `/aichat/sessions/${encodeURIComponent(sessionId)}/rounds/${encodeURIComponent(roundId)}/discuss`,
    { method: 'POST', body: JSON.stringify({ message }) },
  )
}

export function aichatStreamURL(sessionId: string, fromSeq: number): string {
  const params = new URLSearchParams({ fromSeq: String(fromSeq) })
  const token = getOsintAccessToken()
  if (token) params.set('token', token)
  return `${apiUrl(`/aichat/sessions/${encodeURIComponent(sessionId)}/stream`)}?${params.toString()}`
}

export type ReportRow = {
  id: string
  name?: string
  title?: string
  url?: string
  type?: string
}

export function fetchReports(sessionId: string): Promise<ReportRow[]> {
  return fetchJSON(`/aichat/sessions/${encodeURIComponent(sessionId)}/reports`)
}

export function resolveReportPreviewUrl(resourceId: string): string {
  return resolveArtifactPreviewUrl(resourceId)
}
