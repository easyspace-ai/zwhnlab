import { useCallback, useEffect, useLayoutEffect, useRef } from 'react'
import { connectSessionStream } from '../store/sessionStream'
import { useAiChatStore } from '../store/useAiChatStore'

const FOCUS_HEAL_DEBOUNCE_MS = 300

export function useAiChatSession(sessionId: string | undefined) {
  const loadTimeline = useAiChatStore((s) => s.loadTimeline)
  const applyEvent = useAiChatStore((s) => s.applyEvent)
  const reset = useAiChatStore((s) => s.reset)
  const projected = useAiChatStore((s) => s.projected)
  const loadedSessionId = useAiChatStore((s) => s.sessionId)
  const loading = useAiChatStore((s) => s.loading)
  const error = useAiChatStore((s) => s.error)
  const disconnectRef = useRef<(() => void) | null>(null)

  const getFromSeq = useCallback(() => {
    const { projected: p } = useAiChatStore.getState()
    return p.nextSeq > 1 ? p.nextSeq - 1 : 0
  }, [])

  // Clear stale projection before paint so header/sidebar sync cannot read the prior session.
  useLayoutEffect(() => {
    if (!sessionId) {
      reset()
      return
    }
    reset()
  }, [sessionId, reset])

  useEffect(() => {
    if (!sessionId) return
    void loadTimeline(sessionId)
    return () => {
      disconnectRef.current?.()
      disconnectRef.current = null
    }
  }, [sessionId, loadTimeline])

  // Connect SSE once after timeline load — not on every event (avoids reconnect storms + 429).
  useEffect(() => {
    if (!sessionId || loading || loadedSessionId !== sessionId) return
    disconnectRef.current?.()
    disconnectRef.current = connectSessionStream(sessionId, getFromSeq, applyEvent)
    return () => {
      disconnectRef.current?.()
      disconnectRef.current = null
    }
    // projected.nextSeq intentionally omitted: reconnect only after timeline load / session switch.
  }, [sessionId, loading, loadedSessionId, applyEvent, getFromSeq])

  // Tab focus / visibility: single timeline pull to heal missed SSE events (OSINT-064).
  useEffect(() => {
    if (!sessionId) return

    let debounceTimer: ReturnType<typeof setTimeout> | null = null

    const heal = () => {
      if (document.visibilityState !== 'visible') return
      if (useAiChatStore.getState().sessionId !== sessionId) return
      void loadTimeline(sessionId, { silent: true })
    }

    const onResume = () => {
      if (debounceTimer !== null) clearTimeout(debounceTimer)
      debounceTimer = setTimeout(heal, FOCUS_HEAL_DEBOUNCE_MS)
    }

    document.addEventListener('visibilitychange', onResume)
    window.addEventListener('focus', onResume)

    return () => {
      if (debounceTimer !== null) clearTimeout(debounceTimer)
      document.removeEventListener('visibilitychange', onResume)
      window.removeEventListener('focus', onResume)
    }
  }, [sessionId, loadTimeline])

  return { projected, loading, error, loadedSessionId }
}
