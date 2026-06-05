import type { Context } from 'hono'

export const USER_ID_HEADER = 'X-User-Id'

type SessionOwnerRow = {
  userId?: string | null
  user_id?: string | null
}

export function readUserId(c: Context): string | null {
  return c.req.header(USER_ID_HEADER)?.trim() || null
}

/** Returns user id or a 401 JSON response. */
export function requireUserId(c: Context): string | Response {
  const userId = readUserId(c)
  if (!userId) {
    return c.json({ error: 'user id required' }, 401)
  }
  return userId
}

export function resolveSessionOwner(session: SessionOwnerRow | undefined): string | null {
  if (!session) return null
  const owner = session.userId ?? session.user_id ?? null
  if (typeof owner !== 'string') return null
  const trimmed = owner.trim()
  return trimmed || null
}

export function sessionAccess(
  session: SessionOwnerRow | undefined,
  userId: string
): 'missing' | 'forbidden' | 'ok' {
  if (!session) return 'missing'
  const owner = resolveSessionOwner(session)
  // Legacy sessions without owner are hidden from all authenticated users.
  if (!owner) return 'forbidden'
  if (owner !== userId) return 'forbidden'
  return 'ok'
}

export function accessDeniedResponse(c: Context, kind: 'missing' | 'forbidden'): Response {
  if (kind === 'missing') {
    return c.json({ error: 'session not found' }, 404)
  }
  return c.json({ error: 'forbidden' }, 403)
}
