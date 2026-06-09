import type { SessionEvent } from '../engine/types'
import { aichatStreamURL } from '../api/aichatApi'

export type StreamHandler = (ev: SessionEvent) => void

const INITIAL_BACKOFF_MS = 1000
const MAX_BACKOFF_MS = 30_000

export function connectSessionStream(
  sessionId: string,
  getFromSeq: () => number,
  onEvent: StreamHandler,
  onError?: (err: unknown) => void,
): () => void {
  let aborted = false
  let es: EventSource | null = null
  let retryTimer: ReturnType<typeof setTimeout> | null = null
  let backoffMs = INITIAL_BACKOFF_MS

  const clearRetry = () => {
    if (retryTimer !== null) {
      clearTimeout(retryTimer)
      retryTimer = null
    }
  }

  const connect = () => {
    if (aborted) return
    clearRetry()
    es?.close()
    es = null

    const url = aichatStreamURL(sessionId, getFromSeq())
    const current = new EventSource(url)
    es = current

    current.addEventListener('event_appended', (msg) => {
      if (aborted || es !== current) return
      try {
        const ev = JSON.parse(msg.data) as SessionEvent
        backoffMs = INITIAL_BACKOFF_MS
        onEvent(ev)
      } catch (e) {
        onError?.(e)
      }
    })

    current.onerror = () => {
      // Ignore errors from superseded connections (close() on the prior ES is async).
      if (aborted || es !== current) return
      current.close()
      es = null
      onError?.(new Error('stream error'))
      const delay = backoffMs
      backoffMs = Math.min(backoffMs * 2, MAX_BACKOFF_MS)
      retryTimer = setTimeout(() => {
        retryTimer = null
        connect()
      }, delay)
    }
  }

  connect()

  return () => {
    aborted = true
    clearRetry()
    es?.close()
    es = null
  }
}
