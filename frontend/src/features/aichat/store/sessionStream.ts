import type { SessionEvent } from '../engine/types'
import { aichatStreamURL } from '../api/aichatApi'

export type StreamHandler = (ev: SessionEvent) => void

export function connectSessionStream(
  sessionId: string,
  fromSeq: number,
  onEvent: StreamHandler,
  onError?: (err: unknown) => void,
): () => void {
  const url = aichatStreamURL(sessionId, fromSeq)
  const es = new EventSource(url)

  es.addEventListener('event_appended', (msg) => {
    try {
      const ev = JSON.parse(msg.data) as SessionEvent
      onEvent(ev)
    } catch (e) {
      onError?.(e)
    }
  })

  es.onerror = () => {
    onError?.(new Error('stream error'))
  }

  return () => es.close()
}
