import { useEffect, useRef } from 'react'
import { connectSessionStream } from '../store/sessionStream'
import { useAiChatStore } from '../store/useAiChatStore'

export function useAiChatSession(sessionId: string | undefined) {
  const loadTimeline = useAiChatStore((s) => s.loadTimeline)
  const applyEvent = useAiChatStore((s) => s.applyEvent)
  const reset = useAiChatStore((s) => s.reset)
  const projected = useAiChatStore((s) => s.projected)
  const loading = useAiChatStore((s) => s.loading)
  const error = useAiChatStore((s) => s.error)
  const disconnectRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    if (!sessionId) {
      reset()
      return
    }
    reset()
    void loadTimeline(sessionId)
    return () => {
      disconnectRef.current?.()
      disconnectRef.current = null
    }
  }, [sessionId, loadTimeline, reset])

  useEffect(() => {
    if (!sessionId) return
    disconnectRef.current?.()
    const fromSeq = projected.nextSeq > 1 ? projected.nextSeq - 1 : 0
    disconnectRef.current = connectSessionStream(sessionId, fromSeq, applyEvent)
    return () => {
      disconnectRef.current?.()
      disconnectRef.current = null
    }
  }, [sessionId, projected.nextSeq, applyEvent])

  return { projected, loading, error }
}
