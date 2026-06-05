/** Client-side JWT helpers (UX only — server always validates). */

export function parseJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/')
    const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4)
    const json = atob(padded)
    return JSON.parse(json) as Record<string, unknown>
  } catch {
    return null
  }
}

export function getTokenExpiryMs(token: string | null | undefined): number | null {
  if (!token) return null
  const payload = parseJwtPayload(token)
  const exp = payload?.exp
  if (typeof exp !== 'number') return null
  return exp * 1000
}

export function isTokenExpired(token: string | null | undefined, skewMs = 30_000): boolean {
  const expMs = getTokenExpiryMs(token)
  if (expMs == null) return false
  return Date.now() >= expMs - skewMs
}
