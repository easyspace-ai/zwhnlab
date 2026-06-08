import type { SessionRestoreState } from './osintDashboardApi'
import type { DashboardChatMessage, W6MessageStatus, W6StreamEvent } from '../types'

/** Continuous non-running sub_agent_status before sealing a W6 round as ended. */
export const W6_IDLE_SEAL_MS = 15_000

export type W6IdleTracker = {
  lastRunningAt: number | null
  lastSubAgentStatus: string | undefined
}

export function createW6IdleTracker(): W6IdleTracker {
  return { lastRunningAt: null, lastSubAgentStatus: undefined }
}

export function observeSubAgentStatus(
  tracker: W6IdleTracker,
  subAgentStatus: string | undefined,
  now = Date.now(),
): W6IdleTracker {
  const status = subAgentStatus?.trim() ?? ''
  const next: W6IdleTracker = {
    ...tracker,
    lastSubAgentStatus: status,
  }
  if (status === 'running') {
    next.lastRunningAt = now
  }
  return next
}

/** Mark stream activity as proof the sub-agent is still running (resets idle grace). */
export function touchW6StreamActivity(tracker: W6IdleTracker, now = Date.now()): W6IdleTracker {
  return { ...tracker, lastRunningAt: now }
}

export function hasLiveW6Activity(events: W6StreamEvent[]): boolean {
  return events.some(
    (e) => e.type !== 'done' && e.type !== 'stopped' && e.type !== 'error',
  )
}

export function isFreshW6Chip(msg: DashboardChatMessage): boolean {
  if (msg.role !== 'w6' || msg.w6Status !== 'running') return false
  const events = msg.w6Events ?? []
  return !hasTerminalW6Event(events) && !hasLiveW6Activity(events)
}

export function shouldTreatW6RoundEnded(
  subAgentStatus: string | undefined,
  lastRunningAtMs: number | null,
  events: W6StreamEvent[] = [],
  now = Date.now(),
  chipLocalEvents?: W6StreamEvent[],
): boolean {
  const localEvents = chipLocalEvents ?? []
  if (hasTerminalW6Event(localEvents)) return true

  const inIdleGrace =
    lastRunningAtMs != null && now - lastRunningAtMs < W6_IDLE_SEAL_MS
  // Fresh round: ignore stale server terminal replay until grace expires.
  if (inIdleGrace) {
    if (subAgentStatus === 'running') return false
    if (!hasTerminalW6Event(events)) return false
    return false
  }

  if (hasTerminalW6Event(events)) return true
  if (subAgentStatus === 'running') return false
  if (lastRunningAtMs == null) return false
  return now - lastRunningAtMs >= W6_IDLE_SEAL_MS
}

export function hasActiveRunningW6Chip(messages: DashboardChatMessage[]): boolean {
  return messages.some((m) => m.role === 'w6' && m.w6Status === 'running')
}

const W6_EVENT_TYPES = new Set<W6StreamEvent['type']>([
  'log',
  'tool',
  'token',
  'status',
  'phase',
  'done',
  'error',
  'stopped',
])

function hasTerminalW6Event(events: W6StreamEvent[]): boolean {
  return events.some(
    (e) => e.type === 'done' || e.type === 'stopped' || e.type === 'error',
  )
}

function terminalStatusFromEvents(events: W6StreamEvent[]): W6MessageStatus {
  if (events.some((e) => e.type === 'error')) return 'error'
  if (events.some((e) => e.type === 'stopped')) return 'stopped'
  return 'done'
}

/** Freeze every non-live W6 chip so earlier rounds stay completed in the timeline. */
export function sealW6MessageStatuses(
  messages: DashboardChatMessage[],
  liveW6Id: string | null = null,
): DashboardChatMessage[] {
  return messages.map((m) => {
    if (m.role !== 'w6' || m.w6Status !== 'running') return m
    if (liveW6Id && m.id === liveW6Id) return m
    const events = m.w6Events ?? []
    const status = hasTerminalW6Event(events)
      ? terminalStatusFromEvents(events)
      : 'running'
    return {
      ...m,
      w6Status: status,
      w6LastLine: m.w6LastLine || '本轮调研已结束',
    }
  })
}

/** Seal abandoned in-flight W6 chips before starting a new round. */
export function sealAbandonedRunningW6(
  messages: DashboardChatMessage[],
  liveW6Id: string | null = null,
): DashboardChatMessage[] {
  return messages.map((m) => {
    if (m.role !== 'w6' || m.w6Status !== 'running') return m
    if (liveW6Id && m.id === liveW6Id) return m
    const events = m.w6Events ?? []
    const status = hasTerminalW6Event(events)
      ? terminalStatusFromEvents(events)
      : 'done'
    return {
      ...m,
      w6Status: status,
      w6LastLine: m.w6LastLine || '本轮调研已结束',
    }
  })
}

/** Keep at most one running W6 chip (latest wins when live id is unknown). */
export function dedupeRunningW6Chips(
  messages: DashboardChatMessage[],
  liveW6Id: string | null = null,
): DashboardChatMessage[] {
  const running = messages.filter((m) => m.role === 'w6' && m.w6Status === 'running')
  if (running.length <= 1) return messages
  const keepId =
    liveW6Id && running.some((m) => m.id === liveW6Id)
      ? liveW6Id
      : running[running.length - 1].id
  return sealAbandonedRunningW6(messages, keepId)
}

/** True when the timeline contains at least one finished W6 deep-research round. */
export function hasCompletedW6Round(messages: DashboardChatMessage[]): boolean {
  return messages.some(
    (m) =>
      m.role === 'w6' &&
      (m.w6Status === 'done' || m.w6Status === 'stopped' || m.w6Status === 'error'),
  )
}

export function findLastRunningW6Id(messages: DashboardChatMessage[]): string | null {
  const hit = [...messages]
    .reverse()
    .find((m) => m.role === 'w6' && m.w6Status === 'running')
  return hit?.id ?? null
}

export function findLastW6Index(messages: DashboardChatMessage[]): number {
  for (let i = messages.length - 1; i >= 0; i--) {
    if (messages[i].role === 'w6') return i
  }
  return -1
}

export function mapServerStreamEvents(
  events?: SessionRestoreState['stream_events'],
): W6StreamEvent[] {
  if (!events?.length) return []
  return events
    .map((e) => ({
      type: e.type as W6StreamEvent['type'],
      message: e.message,
      token: e.token,
      progress: e.progress,
      timestamp: e.timestamp,
    }))
    .filter((e) => W6_EVENT_TYPES.has(e.type))
}

function progressFromEvents(events: W6StreamEvent[]): number {
  for (let i = events.length - 1; i >= 0; i--) {
    if (events[i].progress != null) return events[i].progress!
  }
  if (events.some((e) => e.type === 'done')) return 100
  return 0
}

function lastLineFromEvents(events: W6StreamEvent[]): string {
  for (let i = events.length - 1; i >= 0; i--) {
    const line = events[i].message || events[i].token
    if (line?.trim()) return line.trim().slice(0, 120)
  }
  if (events.some((e) => e.type === 'done')) return '调研完成'
  if (events.some((e) => e.type === 'stopped')) return '已手动停止 W6 调研'
  if (events.some((e) => e.type === 'error')) return 'W6 执行出错'
  return ''
}

export function isW6RoundCompleteOnServer(
  server: SessionRestoreState | null,
  events: W6StreamEvent[] = [],
): boolean {
  if (!server) return hasTerminalW6Event(events)
  if (server.sub_agent_status === 'running' || server.w6_stream_active) return false
  if (hasTerminalW6Event(events)) return true
  if (!server.last_html_resource_id?.trim()) return false
  const status = server.sub_agent_status?.trim() ?? ''
  return status === '' || status === 'idle' || status === 'done'
}

export function resolveW6StatusFromServer(
  subAgentStatus?: string,
  events: W6StreamEvent[] = [],
  htmlResourceId?: string,
  lastRunningAtMs: number | null = null,
  now = Date.now(),
): W6MessageStatus {
  if (events.some((e) => e.type === 'error')) return 'error'
  if (events.some((e) => e.type === 'stopped')) return 'stopped'
  if (events.some((e) => e.type === 'done')) return 'done'
  if (htmlResourceId?.trim()) return 'done'
  if (subAgentStatus === 'running') return 'running'
  if (subAgentStatus === 'error') return 'error'
  if (shouldTreatW6RoundEnded(subAgentStatus, lastRunningAtMs, events, now)) return 'done'
  return 'running'
}

function pickRicherEvents(
  local: W6StreamEvent[] | undefined,
  server: W6StreamEvent[],
): W6StreamEvent[] {
  if (server.length >= (local?.length ?? 0)) return server
  return local?.length ? local : server
}

/** Align local W6 chips with server workflow state after reconnect / laptop resume. */
export function syncW6MessagesWithServerState(
  messages: DashboardChatMessage[],
  server: SessionRestoreState | null,
  idleTracker: W6IdleTracker | null = null,
  now = Date.now(),
): DashboardChatMessage[] {
  if (!server) return messages

  const streamEvents = mapServerStreamEvents(server.stream_events)
  const lastRunningAt = idleTracker?.lastRunningAt ?? null
  const serverRunning = isW6RunningOnServer(server, lastRunningAt, now)
  const liveW6Id = serverRunning ? findLastRunningW6Id(messages) : null
  let out = sealW6MessageStatuses(messages, liveW6Id)

  const lastW6Idx = findLastW6Index(out)
  if (lastW6Idx < 0) return out

  const current = out[lastW6Idx]
  const inIdleGrace =
    lastRunningAt != null && now - lastRunningAt < W6_IDLE_SEAL_MS
  const freshChip = isFreshW6Chip(current)
  const staleServerTerminal =
    hasTerminalW6Event(streamEvents) && !hasLiveW6Activity(streamEvents)
  const events =
    freshChip && inIdleGrace && staleServerTerminal
      ? (current.w6Events ?? [])
      : pickRicherEvents(current.w6Events, streamEvents)
  const roundComplete = isW6RoundCompleteOnServer(server, events)
  let status = resolveW6StatusFromServer(
    server.sub_agent_status,
    events,
    server.last_html_resource_id,
    lastRunningAt,
    now,
  )
  if (freshChip && inIdleGrace && status === 'done' && !hasTerminalW6Event(current.w6Events ?? [])) {
    status = 'running'
  }
  const effectiveStatus =
    serverRunning || !roundComplete
      ? status === 'done' && !roundComplete && serverRunning
        ? 'running'
        : status
      : status
  const lastLine =
    (effectiveStatus === 'done' ? lastLineFromEvents(events) : '') ||
    current.w6LastLine ||
    (effectiveStatus === 'done' ? '调研完成' : 'W6 调研进行中…')

  out = out.map((m, i) =>
    i === lastW6Idx
      ? {
          ...m,
          w6Status: effectiveStatus,
          w6Events: events,
          w6Progress: progressFromEvents(events),
          w6LastLine: lastLine,
          previewResourceId:
            roundComplete && server.last_html_resource_id && effectiveStatus === 'done'
              ? server.last_html_resource_id
              : m.previewResourceId,
        }
      : m,
  )

  if (roundComplete) {
    out = sealW6MessageStatuses(out, null)
  }

  return out
}

export function isW6RunningOnServer(
  server: SessionRestoreState | null,
  lastRunningAtMs: number | null = null,
  now = Date.now(),
): boolean {
  if (!server) return false
  if (server.sub_agent_status === 'running' || server.w6_stream_active) return true
  if (lastRunningAtMs != null && now - lastRunningAtMs < W6_IDLE_SEAL_MS) return true
  const events = mapServerStreamEvents(server.stream_events)
  if (hasTerminalW6Event(events)) return false
  return false
}

/** True when guided topics may appear: latest W6 round finished, none in-flight. */
export function isW6RoundReadyForGuidedTopics(messages: DashboardChatMessage[]): boolean {
  if (hasActiveRunningW6Chip(messages)) return false
  const lastW6Idx = findLastW6Index(messages)
  if (lastW6Idx < 0) return false
  const status = messages[lastW6Idx].w6Status
  return status === 'done' || status === 'stopped' || status === 'error'
}
