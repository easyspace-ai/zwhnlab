import { API_CONFIG } from '@/osint/config/api'
import { getOsintAccessToken, handleUnauthorizedResponse } from '@/osint/auth'

function apiUrl(path: string): string {
  const p = path.startsWith('/') ? path : `/${path}`
  return `${API_CONFIG.baseUrl}${p}`
}

export function osintDashboardW6StreamURL(sessionId: string): string {
  const params = new URLSearchParams({ session_id: sessionId })
  const token = getOsintAccessToken()
  if (token) params.set('token', token)
  return `${apiUrl('/osint-dashboard/w6/stream')}?${params.toString()}`
}

export type ChatStartRequest = {
  sessionId: string
  skillKey: string
  formData: Record<string, unknown>
  renderedPrompt?: string
  /** magazine | swiss | auto */
  reportStyle?: string
}

export type ChatRespondRequest = {
  sessionId: string
  formData: Record<string, unknown>
  renderedPrompt?: string
}

export type ChatMessageRequest = {
  sessionId: string
  message: string
}

export type ChatDiscussRequest = {
  sessionId: string
  message: string
  targetResourceId?: string
  mode?: 'discuss' | 'edit_html'
}

export type ChatDiscussResponse = {
  reply?: string
  edited?: boolean
  html_resource_id?: string
  report_url?: string
}

/** Map frontend camelCase to backend snake_case JSON bodies. */
export function buildChatStartBody(req: ChatStartRequest): Record<string, unknown> {
  const body: Record<string, unknown> = {
    session_id: req.sessionId,
    skill_key: req.skillKey,
    form_data: req.formData,
  }
  if (req.renderedPrompt?.trim()) {
    body.rendered_prompt = req.renderedPrompt.trim()
  }
  if (req.reportStyle?.trim()) {
    body.report_style = req.reportStyle.trim()
  }
  return body
}

export function buildChatRespondBody(req: ChatRespondRequest): Record<string, unknown> {
  const body: Record<string, unknown> = {
    session_id: req.sessionId,
    form_data: req.formData,
  }
  if (req.renderedPrompt?.trim()) {
    body.rendered_prompt = req.renderedPrompt.trim()
  }
  return body
}

export function buildChatMessageBody(req: ChatMessageRequest): Record<string, unknown> {
  return {
    session_id: req.sessionId,
    message: req.message,
  }
}

export function buildChatDiscussBody(req: ChatDiscussRequest): Record<string, unknown> {
  const body: Record<string, unknown> = {
    session_id: req.sessionId,
    message: req.message,
  }
  if (req.targetResourceId?.trim()) {
    body.target_resource_id = req.targetResourceId.trim()
    body.mode = 'edit_html'
  } else if (req.mode) {
    body.mode = req.mode
  }
  return body
}

/** Extract artifact resource id from preview URL or raw id. */
export function extractArtifactResourceId(urlOrId: string): string {
  if (!urlOrId) return ''
  const bare = urlOrId.split('#')[0]
  const match = bare.match(/\/artifacts\/([^/?]+)\/preview/)
  if (match?.[1]) return decodeURIComponent(match[1])
  if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(bare)) {
    return bare
  }
  return bare
}

/** Must exceed backend DEEPSEEK_PIPELINE_STAGE_TIMEOUT_SEC (default 300s). */
export const EDIT_HTML_FETCH_TIMEOUT_MS = 360_000

export async function fetchDashboardJSON<T>(
  endpoint: string,
  body: Record<string, unknown>,
  signal?: AbortSignal,
): Promise<T> {
  const token = getOsintAccessToken()
  const res = await fetch(apiUrl(endpoint), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
    signal,
  })

  if (!res.ok) {
    handleUnauthorizedResponse(res.status)
    const err = await res.json().catch(() => ({ detail: `HTTP ${res.status}` }))
    throw new Error((err as { detail?: string }).detail || `HTTP ${res.status}`)
  }

  return res.json() as Promise<T>
}

export async function fetchDashboardSSE(
  endpoint: string,
  body: Record<string, unknown>,
  signal?: AbortSignal,
): Promise<ReadableStreamDefaultReader<Uint8Array>> {
  const token = getOsintAccessToken()
  const res = await fetch(apiUrl(endpoint), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
    signal,
  })

  if (!res.ok) {
    handleUnauthorizedResponse(res.status)
    const err = await res.json().catch(() => ({ detail: `HTTP ${res.status}` }))
    throw new Error((err as { detail?: string }).detail || `HTTP ${res.status}`)
  }

  const reader = res.body?.getReader()
  if (!reader) throw new Error('No response body')
  return reader
}

export type SessionRestoreMessage = {
  role: string
  content: string
  timestamp?: number
  follow_up_questions?: string[]
}

export type SessionRestoreStreamEvent = {
  type: string
  message?: string
  token?: string
  progress?: number
  timestamp?: number
}

export type SessionRestoreState = {
  session_id: string
  skill_key?: string
  report_style?: string
  sub_agent_status?: string
  follow_ups?: string[]
  last_html_resource_id?: string
  last_md_resource_id?: string
  w6_stream_active?: boolean
  discuss_active?: boolean
  discuss_mode?: 'discuss' | 'edit_html' | string
  messages?: SessionRestoreMessage[]
  stream_events?: SessionRestoreStreamEvent[]
}

export async function stopW6Session(sessionId: string): Promise<void> {
  await fetchDashboardJSON('/osint-dashboard/w6/stop', {
    session_id: sessionId,
  })
}

export async function fetchSessionRestoreState(
  sessionId: string,
): Promise<SessionRestoreState | null> {
  const token = getOsintAccessToken()
  const res = await fetch(
    `${apiUrl(`/osint-dashboard/sessions/${encodeURIComponent(sessionId)}/state`)}?t=${Date.now()}`,
    {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    },
  )
  if (!res.ok) {
    if (res.status === 404) return null
    handleUnauthorizedResponse(res.status)
    return null
  }
  return (await res.json()) as SessionRestoreState
}

export async function fetchSessionReports(sessionId: string): Promise<
  Array<{ id: string; url: string; title: string; type?: string }>
> {
  const token = getOsintAccessToken()
  const res = await fetch(
    `${apiUrl(`/osint-dashboard/sessions/${encodeURIComponent(sessionId)}/reports`)}?t=${Date.now()}`,
    {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    },
  )
  if (!res.ok) {
    if (res.status === 404) return []
    handleUnauthorizedResponse(res.status)
    return []
  }
  const data = (await res.json()) as
    | { reports?: Array<{ id: string; url?: string; title?: string; name?: string }> }
    | Array<{ id: string; url?: string; title?: string; name?: string }>
  const list = Array.isArray(data) ? data : (data.reports ?? [])
  return list.map((r) => ({
    id: r.id,
    url: r.url || r.id,
    title: r.title || r.name || '报告',
    type: (r as { type?: string }).type,
  }))
}

/** Build artifact download URL with auth token when available. */
export function resolveArtifactDownloadUrl(resourceId: string): string {
  if (!resourceId) return ''
  const base = apiUrl(`/artifacts/${encodeURIComponent(resourceId)}/download`)
  const token = getOsintAccessToken()
  if (!token) return base
  const sep = base.includes('?') ? '&' : '?'
  return `${base}${sep}token=${encodeURIComponent(token)}`
}

/** Normalize preview URL from SSE (resource id or full path). */
export function resolveReportPreviewUrl(urlOrId: string): string {
  if (!urlOrId) return ''
  if (urlOrId.startsWith('http') || urlOrId.startsWith('/')) return urlOrId
  const base = apiUrl(`/artifacts/${encodeURIComponent(urlOrId)}/preview`)
  const token = getOsintAccessToken()
  if (!token) return base
  const sep = base.includes('?') ? '&' : '?'
  return `${base}${sep}token=${encodeURIComponent(token)}`
}
