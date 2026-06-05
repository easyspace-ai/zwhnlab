import { OSINT_AUTH_STORAGE_KEY } from './constants'
import type { PersistedAuthSlice } from './types'

export type WebStorageLike = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>

export function readRawPersisted(storage: WebStorageLike, key = OSINT_AUTH_STORAGE_KEY): string | null {
  try {
    return storage.getItem(key)
  } catch {
    return null
  }
}

export function writeRawPersisted(storage: WebStorageLike, value: string, key = OSINT_AUTH_STORAGE_KEY): void {
  try {
    storage.setItem(key, value)
  } catch {
    /* ignore quota / private mode */
  }
}

export function removeRawPersisted(key = OSINT_AUTH_STORAGE_KEY): void {
  try {
    localStorage.removeItem(key)
    sessionStorage.removeItem(key)
  } catch {
    /* ignore */
  }
}

/** @deprecated Always localStorage; kept for callers that migrated from remember-me routing. */
export function pickPersistStorage(_rememberMe = true): WebStorageLike {
  return localStorage
}

/** Zustand persist adapter — always uses localStorage (login is remembered by default). */
export function createRememberAwareStorage() {
  return {
    getItem: (name: string): string | null => {
      const fromLocal = readRawPersisted(localStorage, name)
      if (fromLocal) return fromLocal
      const fromSession = readRawPersisted(sessionStorage, name)
      if (fromSession) {
        writeRawPersisted(localStorage, fromSession, name)
        sessionStorage.removeItem(name)
      }
      return fromSession
    },
    setItem: (name: string, value: string): void => {
      sessionStorage.removeItem(name)
      writeRawPersisted(localStorage, value, name)
    },
    removeItem: (name: string): void => {
      try {
        localStorage.removeItem(name)
        sessionStorage.removeItem(name)
      } catch {
        /* ignore */
      }
    },
  }
}

export function readPersistedSlice(): PersistedAuthSlice | null {
  const raw =
    readRawPersisted(localStorage) ??
    readRawPersisted(sessionStorage)
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw) as { state?: Partial<PersistedAuthSlice> }
    const state = parsed?.state
    if (!state?.token) return null
    return {
      token: state.token ?? null,
      user: state.user ?? null,
    }
  } catch {
    return null
  }
}
