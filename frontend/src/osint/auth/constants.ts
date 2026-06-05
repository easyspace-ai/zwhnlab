/** Zustand persist key — single source of truth for OSINT auth session. */
export const OSINT_AUTH_STORAGE_KEY = 'osint-auth'

/** Legacy keys migrated on first boot (then removed). */
export const LEGACY_STORAGE_KEYS = {
  gushengToken: 'gusheng_auth_token',
  youmindAuth: 'youmind-auth',
} as const

export const AUTH_API_PREFIX = '/api/auth'
