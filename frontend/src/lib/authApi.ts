/**
 * @deprecated Import from `@/osint/auth` instead. This shim preserves existing import paths.
 */
import {
  AUTH_TOKEN_KEY,
  type CurrentUser,
  type AuthConfig,
  type AuthLoginResponse,
  fetchAuthConfig,
  getStoredToken,
  setStoredToken,
  getOsintAuthHeaders,
  fetchCurrentUser,
  loginRequest,
  registerRequest,
  logoutRequest,
  syncAuthCookie as syncAuthCookieWithToken,
  changePassword as changePasswordWithToken,
  sendVerificationCode as sendVerificationCodeApi,
  isAdmin,
} from '@/osint/auth'

export {
  AUTH_TOKEN_KEY,
  type CurrentUser,
  type AuthConfig,
  type AuthLoginResponse,
  fetchAuthConfig,
  getStoredToken,
  setStoredToken,
  fetchCurrentUser as getMe,
  loginRequest,
  registerRequest,
  logoutRequest,
  isAdmin,
}

export const authHeaders = getOsintAuthHeaders

export async function syncAuthCookie(): Promise<void> {
  const token = getStoredToken()
  if (!token) return
  return syncAuthCookieWithToken(token)
}

export async function changePassword(oldPassword: string, newPassword: string): Promise<void> {
  const token = getStoredToken()
  if (!token) throw new Error('未登录')
  return changePasswordWithToken(token, oldPassword, newPassword)
}

export async function sendVerificationCode(_contact?: string): Promise<{ ok: boolean; message?: string }> {
  return sendVerificationCodeApi()
}
