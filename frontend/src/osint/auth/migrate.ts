import { LEGACY_STORAGE_KEYS, OSINT_AUTH_STORAGE_KEY } from './constants'
import { pickPersistStorage, readRawPersisted, writeRawPersisted } from './storage'
import type { PersistedAuthSlice } from './types'

function readLegacyYoumindToken(): string | null {
  try {
    const raw = localStorage.getItem(LEGACY_STORAGE_KEYS.youmindAuth)
    if (!raw) return null
    const parsed = JSON.parse(raw) as { state?: { token?: string } }
    return parsed?.state?.token ?? null
  } catch {
    return null
  }
}

function readLegacyGushengToken(): string | null {
  try {
    return localStorage.getItem(LEGACY_STORAGE_KEYS.gushengToken)
  } catch {
    return null
  }
}

function clearLegacyKeys(): void {
  try {
    localStorage.removeItem(LEGACY_STORAGE_KEYS.gushengToken)
    localStorage.removeItem(LEGACY_STORAGE_KEYS.youmindAuth)
    sessionStorage.removeItem(LEGACY_STORAGE_KEYS.youmindAuth)
  } catch {
    /* ignore */
  }
}

/**
 * One-time migration from gusheng_auth_token / youmind-auth → osint-auth.
 * Idempotent: skips if osint-auth already has a token.
 */
export function migrateLegacyAuthStorage(): PersistedAuthSlice | null {
  const existing =
    readRawPersisted(localStorage) ??
    readRawPersisted(sessionStorage)
  if (existing) {
    try {
      const parsed = JSON.parse(existing) as { state?: Partial<PersistedAuthSlice> }
      if (parsed?.state?.token) {
        clearLegacyKeys()
        return {
          token: parsed.state.token,
          user: parsed.state.user ?? null,
        }
      }
    } catch {
      /* continue migration */
    }
  }

  const token = readLegacyGushengToken() ?? readLegacyYoumindToken()
  if (!token) return null

  const slice: PersistedAuthSlice = {
    token,
    user: null,
  }
  const payload = JSON.stringify({ state: slice, version: 0 })
  writeRawPersisted(pickPersistStorage(true), payload, OSINT_AUTH_STORAGE_KEY)
  clearLegacyKeys()
  return slice
}
