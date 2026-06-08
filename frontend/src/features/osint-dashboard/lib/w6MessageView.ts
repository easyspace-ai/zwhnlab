import type { W6MessageStatus, W6StreamEvent } from '../types'
import type { SubAgentStatus } from '../hooks/useSubAgentStream'

const W6_EVENT_PREFIX: Partial<Record<W6StreamEvent['type'], string>> = {
  tool: '工具',
  status: '状态',
  phase: '阶段',
  log: '日志',
  token: '输出',
}

export function w6EventLine(ev: W6StreamEvent): string {
  const body =
    ev.message?.trim() ||
    ev.token?.trim() ||
    (ev.type === 'done'
      ? '调研完成'
      : ev.type === 'stopped'
        ? '已手动停止 W6 调研'
        : ev.type === 'error'
          ? '执行失败'
          : '')
  if (!body) return ''
  const prefix = W6_EVENT_PREFIX[ev.type]
  return prefix ? `[${prefix}] ${body}` : body
}

export function w6LogLines(events: W6StreamEvent[], max = 8): string[] {
  const lines: string[] = []
  for (const ev of events) {
    const line = w6EventLine(ev)
    if (line) lines.push(line)
  }
  if (lines.length <= max) return lines
  return lines.slice(-max)
}

/** Chip preview: coalesce token stream into one rolling line for readability. */
export function w6PreviewLines(events: W6StreamEvent[], max = 8): string[] {
  const lines: string[] = []
  let tokenBuf = ''

  const flushTokens = () => {
    if (!tokenBuf) return
    const tail = tokenBuf.length > 160 ? `…${tokenBuf.slice(-160)}` : tokenBuf
    lines.push(`[输出] ${tail}`)
    tokenBuf = ''
  }

  for (const ev of events) {
    if (ev.type === 'token' && ev.token?.trim()) {
      tokenBuf += ev.token
      continue
    }
    flushTokens()
    const line = w6EventLine(ev)
    if (line) lines.push(line)
  }
  flushTokens()

  if (lines.length <= max) return lines
  return lines.slice(-max)
}

export function mapW6ChipStatus(
  stored: W6MessageStatus | undefined,
  live: SubAgentStatus,
  isLive: boolean,
  events: W6StreamEvent[] = [],
): SubAgentStatus {
  const hasTerminal = events.some((e) => e.type === 'done' || e.type === 'stopped')
  const hasError = events.some((e) => e.type === 'error')

  if (isLive) {
    if (stored === 'running') {
      if (live === 'error' || hasError) return 'error'
      if (live === 'running') return 'running'
      if (hasTerminal && live === 'idle') return 'done'
      return 'running'
    }
    if (live === 'running') return 'running'
    if (live === 'error' || hasError) return 'error'
    if (hasTerminal || stored === 'stopped') return 'done'
    if (stored === 'done' && hasTerminal) return 'done'
    if (stored === 'done') return 'running'
    return 'idle'
  }

  switch (stored) {
    case 'running':
      if (hasError) return 'error'
      if (hasTerminal) return 'done'
      return 'running'
    case 'error':
      return 'error'
    case 'done':
      if (!hasTerminal) return 'running'
      return 'done'
    case 'stopped':
      return 'done'
    default:
      return 'idle'
  }
}
