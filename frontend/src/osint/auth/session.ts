import { renewTokenRequest, syncAuthCookie } from './client'
import { getTokenExpiryMs } from './token'

/** Renew access token when within 30 days of JWT exp (silent extension to full TTL). */
const RENEW_IF_EXPIRES_WITHIN_MS = 30 * 24 * 60 * 60 * 1000

export function tokenNeedsRenewal(token: string | null | undefined): boolean {
  const expMs = getTokenExpiryMs(token)
  if (expMs == null) return false
  return expMs - Date.now() <= RENEW_IF_EXPIRES_WITHIN_MS
}

export async function maybeRenewAccessToken(token: string): Promise<string> {
  if (!tokenNeedsRenewal(token)) return token
  try {
    const renewed = await renewTokenRequest(token)
    await syncAuthCookie(renewed)
    return renewed
  } catch {
    return token
  }
}
