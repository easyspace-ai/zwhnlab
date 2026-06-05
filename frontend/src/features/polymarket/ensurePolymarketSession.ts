import type { SavedPolymarketEvent } from '@/lib/polymarketApi'
import { isSessionNotFoundError } from '@/osint/lib/sessionErrors'
import { sessionApi } from '@/osint/services/api'
import { useAppStore } from '@/osint/stores/apiStore'

/** Returns a session id the current user can access; recreates and rebinds when stale. */
export async function ensurePolymarketEventSession(ev: SavedPolymarketEvent): Promise<string> {
  const existing = (ev.aiSessionId ?? '').trim()
  if (existing) {
    try {
      await sessionApi.getSessionMessagesDirect(existing, { skip: 0, limit: 1 })
      return existing
    } catch (err) {
      if (!isSessionNotFoundError(err)) {
        return existing
      }
    }
  }

  const session = await useAppStore.getState().createSession(
    (ev.title ?? '').substring(0, 30) || '新对话',
    ev.id,
  )
  return session.id
}
