import type { GenerateChunkEvent } from '@shared/generation'

export type GenerationChunkListener = (
  sessionId: string,
  chunk: GenerateChunkEvent
) => void

let globalListener: GenerationChunkListener | null = null
const sessionListeners = new Map<string, Set<GenerationChunkListener>>()

/** @deprecated Prefer subscribeGenerationChunks for per-session fan-out. */
export function setGenerationChunkListener(next: GenerationChunkListener | null): void {
  globalListener = next
}

export function subscribeGenerationChunks(
  sessionId: string,
  listener: GenerationChunkListener
): () => void {
  const normalizedSessionId = sessionId.trim()
  if (!normalizedSessionId) {
    return () => undefined
  }
  let listeners = sessionListeners.get(normalizedSessionId)
  if (!listeners) {
    listeners = new Set()
    sessionListeners.set(normalizedSessionId, listeners)
  }
  listeners.add(listener)
  return () => {
    const current = sessionListeners.get(normalizedSessionId)
    if (!current) return
    current.delete(listener)
    if (current.size === 0) {
      sessionListeners.delete(normalizedSessionId)
    }
  }
}

export function publishGenerationChunk(sessionId: string, chunk: GenerateChunkEvent): void {
  globalListener?.(sessionId, chunk)
  const listeners = sessionListeners.get(sessionId)
  if (!listeners) return
  for (const listener of listeners) {
    listener(sessionId, chunk)
  }
}
