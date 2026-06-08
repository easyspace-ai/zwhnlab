import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { osintDashboardW6StreamURL, stopW6Session } from '../lib/osintDashboardApi'
import type { W6StreamEvent } from '../types'

export type SubAgentConnection = 'idle' | 'connecting' | 'open' | 'closed' | 'error'
export type SubAgentStatus = 'idle' | 'running' | 'done' | 'error'

function isDuplicateEvent(prev: W6StreamEvent | undefined, next: W6StreamEvent): boolean {
  if (!prev) return false
  return (
    prev.type === next.type &&
    prev.message === next.message &&
    prev.token === next.token &&
    prev.progress === next.progress
  )
}

function applyStreamEvent(
  data: W6StreamEvent,
  setEvents: (updater: (prev: W6StreamEvent[]) => W6StreamEvent[]) => void,
  setProgress: (value: number) => void,
  setLastLine: (value: string) => void,
  setStatus: (value: SubAgentStatus | ((s: SubAgentStatus) => SubAgentStatus)) => void,
  setConnection: (value: SubAgentConnection | ((c: SubAgentConnection) => SubAgentConnection)) => void,
  es: EventSource,
): void {
  setEvents((prev) => {
    if (isDuplicateEvent(prev[prev.length - 1], data)) return prev
    return [...prev, data]
  })
  if (data.progress != null) setProgress(data.progress)
  const line = data.message || data.token || ''
  if (line) setLastLine(line.slice(0, 120))
  if (data.type === 'done') {
    setStatus('idle')
    setConnection('closed')
    es.close()
  }
  if (data.type === 'stopped') {
    setStatus('idle')
    setConnection('closed')
    es.close()
  }
  if (data.type === 'error') {
    setStatus('error')
    setConnection('error')
    es.close()
  }
}

export function useSubAgentStream(
  sessionId: string | null,
  enabled: boolean,
  roundKey = 0,
) {
  const [events, setEvents] = useState<W6StreamEvent[]>([])
  const [status, setStatus] = useState<SubAgentStatus>('idle')
  const [connection, setConnection] = useState<SubAgentConnection>('idle')
  const [progress, setProgress] = useState(0)
  const [lastLine, setLastLine] = useState('')
  const esRef = useRef<EventSource | null>(null)
  const intentionalCloseRef = useRef(false)
  const retryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const roundLiveRef = useRef(false)

  const clearRetryTimer = useCallback(() => {
    if (retryTimerRef.current) {
      clearTimeout(retryTimerRef.current)
      retryTimerRef.current = null
    }
  }, [])

  const connect = useCallback(() => {
    if (!sessionId || !enabled) return
    clearRetryTimer()
    intentionalCloseRef.current = false
    roundLiveRef.current = false
    esRef.current?.close()
    setEvents([])
    setStatus('running')
    setConnection('connecting')
    setProgress(0)
    setLastLine('')

    const es = new EventSource(osintDashboardW6StreamURL(sessionId))
    esRef.current = es

    es.onopen = () => setConnection('open')

    es.onmessage = (ev) => {
      try {
        const data = JSON.parse(ev.data) as W6StreamEvent
        const isTerminal =
          data.type === 'done' || data.type === 'stopped' || data.type === 'error'
        if (!isTerminal) {
          roundLiveRef.current = true
        } else {
          intentionalCloseRef.current = true
        }
        applyStreamEvent(data, setEvents, setProgress, setLastLine, setStatus, setConnection, es)
      } catch {
        /* ignore malformed */
      }
    }

    es.onerror = () => {
      es.close()
      esRef.current = null
      if (intentionalCloseRef.current) {
        return
      }
      if (enabled && sessionId) {
        setConnection('connecting')
        setStatus('running')
        retryTimerRef.current = setTimeout(() => {
          connect()
        }, 1500)
        return
      }
      setConnection('error')
      setStatus('error')
    }
  }, [sessionId, enabled, clearRetryTimer])

  useLayoutEffect(() => {
    if (enabled && sessionId) {
      connect()
    } else {
      clearRetryTimer()
      intentionalCloseRef.current = true
      esRef.current?.close()
      esRef.current = null
      if (!enabled) {
        setEvents([])
        setStatus('idle')
        setConnection('idle')
        setProgress(0)
        setLastLine('')
      }
    }
    return () => {
      clearRetryTimer()
      intentionalCloseRef.current = true
      esRef.current?.close()
      esRef.current = null
    }
  }, [sessionId, enabled, roundKey, connect, clearRetryTimer])

  const reset = useCallback(() => {
    clearRetryTimer()
    intentionalCloseRef.current = true
    esRef.current?.close()
    esRef.current = null
    setEvents([])
    setStatus('idle')
    setConnection('idle')
    setProgress(0)
    setLastLine('')
  }, [clearRetryTimer])

  const stop = useCallback(async () => {
    if (!sessionId) return
    clearRetryTimer()
    intentionalCloseRef.current = true
    esRef.current?.close()
    esRef.current = null
    setStatus('idle')
    setConnection('closed')
    setLastLine('已手动停止 W6 调研')
    try {
      await stopW6Session(sessionId)
    } catch {
      setStatus('error')
      setConnection('error')
      setLastLine('停止 W6 失败，请稍后重试')
    }
  }, [sessionId])

  return {
    events,
    status,
    connection,
    progress,
    lastLine,
    reset,
    stop,
    reconnect: connect,
  }
}
