import { getOsintAccessToken, useOsintAuthStore } from './store'

export { OSINT_AUTH_STORAGE_KEY, LEGACY_STORAGE_KEYS, AUTH_API_PREFIX } from './constants'
export type {
  CurrentUser,
  AuthConfig,
  AuthLoginResponse,
  PersistedAuthSlice,
  AuthFailureReason,
} from './types'
export { parseJwtPayload, getTokenExpiryMs, isTokenExpired } from './token'
export {
  readRawPersisted,
  writeRawPersisted,
  removeRawPersisted,
  pickPersistStorage,
  createRememberAwareStorage,
  readPersistedSlice,
} from './storage'
export { migrateLegacyAuthStorage } from './migrate'
export { maybeRenewAccessToken, tokenNeedsRenewal } from './session'
export {
  authHeaders,
  fetchAuthConfig,
  loginRequest,
  registerRequest,
  getMe,
  renewTokenRequest,
  syncAuthCookie,
  logoutRequest,
  changePassword,
  sendVerificationCode,
  isAdmin,
  classifyAuthFailure,
  isAuthHttpError,
  AuthRequiredError,
} from './client'
export {
  useOsintAuthStore,
  getOsintAccessToken,
  getOsintAuthHeaders,
  ensureValidAccessToken,
  getAuthenticatedHeaders,
  type OsintAuthStore,
  fetchCurrentUser,
} from './store'
export {
  handleUnauthorizedResponse,
  resetUnauthorizedRedirectGuard,
  getAccessToken,
} from './unauthorized'
export { OsintAuthProvider, useOsintAuth, useOsintAuthOptional, useOsintUser } from './provider'

/** @deprecated Use OSINT_AUTH_STORAGE_KEY — kept for gradual migration of imports. */
export const AUTH_TOKEN_KEY = 'osint-auth'

export function getStoredToken(): string | null {
  return getOsintAccessToken()
}

export function setStoredToken(token: string | null): void {
  useOsintAuthStore.getState().setToken(token)
}

/** @deprecated Use getOsintAuthHeaders() */
export function legacyAuthHeaders(): HeadersInit {
  return useOsintAuthStore.getState().token
    ? { Authorization: `Bearer ${useOsintAuthStore.getState().token}` }
    : {}
}
