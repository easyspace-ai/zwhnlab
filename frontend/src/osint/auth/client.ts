import { AUTH_API_PREFIX } from './constants'
import type { AuthConfig, AuthLoginResponse, CurrentUser } from './types'

export function authHeaders(token: string | null): HeadersInit {
  const headers: Record<string, string> = {}
  if (token) headers.Authorization = `Bearer ${token}`
  return headers
}

export async function fetchAuthConfig(): Promise<AuthConfig> {
  const res = await fetch(`${AUTH_API_PREFIX}/config`)
  if (!res.ok) return { registration_enabled: false }
  return res.json() as Promise<AuthConfig>
}

export async function loginRequest(login: string, password: string): Promise<AuthLoginResponse> {
  const res = await fetch(`${AUTH_API_PREFIX}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      username: login.trim(),
      password,
      remember_me: true,
    }),
  })
  const data = (await res.json().catch(() => ({}))) as { detail?: string } & Partial<AuthLoginResponse>
  if (!res.ok) {
    throw new Error(data.detail || `登录失败 (${res.status})`)
  }
  if (!data.access_token) {
    throw new Error('登录响应无效')
  }
  return data as AuthLoginResponse
}

export async function registerRequest(
  username: string,
  email: string,
  password: string,
): Promise<CurrentUser> {
  const res = await fetch(`${AUTH_API_PREFIX}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: username.trim(),
      email: email.trim(),
      password,
    }),
  })
  let raw = ''
  try {
    raw = await res.clone().text()
  } catch {
    /* ignore */
  }
  const data = (await res.json().catch(() => ({}))) as { detail?: string } & Partial<CurrentUser>
  if (!res.ok) {
    throw new Error(data.detail || raw || `注册失败 (${res.status})`)
  }
  if (!data.id) {
    throw new Error('注册响应无效')
  }
  return data as CurrentUser
}

export async function getMe(token: string): Promise<CurrentUser> {
  const res = await fetch(`${AUTH_API_PREFIX}/me`, { headers: authHeaders(token) })
  if (!res.ok) {
    const err = new Error(`auth me failed: ${res.status}`) as Error & { status?: number }
    err.status = res.status
    throw err
  }
  return res.json() as Promise<CurrentUser>
}

export async function renewTokenRequest(token: string): Promise<string> {
  const res = await fetch(`${AUTH_API_PREFIX}/renew`, {
    method: 'POST',
    headers: authHeaders(token),
    credentials: 'include',
  })
  const data = (await res.json().catch(() => ({}))) as { detail?: string; access_token?: string }
  if (!res.ok || !data.access_token) {
    const err = new Error(data.detail || `renew failed: ${res.status}`) as Error & { status?: number }
    err.status = res.status
    throw err
  }
  return data.access_token
}

export async function syncAuthCookie(token: string): Promise<void> {
  const res = await fetch(`${AUTH_API_PREFIX}/sync-cookie`, {
    method: 'POST',
    headers: authHeaders(token),
    credentials: 'include',
  })
  if (!res.ok) {
    const err = new Error(`sync cookie failed: ${res.status}`) as Error & { status?: number }
    err.status = res.status
    throw err
  }
}

export async function logoutRequest(): Promise<void> {
  try {
    await fetch(`${AUTH_API_PREFIX}/logout`, {
      method: 'POST',
      credentials: 'include',
    })
  } catch {
    /* ignore */
  }
}

export async function changePassword(
  token: string,
  oldPassword: string,
  newPassword: string,
): Promise<void> {
  const res = await fetch(`${AUTH_API_PREFIX}/change-password`, {
    method: 'POST',
    headers: { ...authHeaders(token), 'Content-Type': 'application/json' },
    body: JSON.stringify({ old_password: oldPassword, new_password: newPassword }),
  })
  if (!res.ok) {
    const data = (await res.json().catch(() => ({}))) as { detail?: string }
    throw new Error(data.detail || `修改密码失败 (${res.status})`)
  }
}

export async function sendVerificationCode(_contact?: string): Promise<{ ok: boolean; message?: string }> {
  const res = await fetch(`${AUTH_API_PREFIX}/send-code`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({}),
  })
  if (!res.ok) {
    throw new Error(`发送验证码失败 (${res.status})`)
  }
  return res.json() as Promise<{ ok: boolean; message?: string }>
}

export function isAdmin(user: CurrentUser | null): boolean {
  return user?.role === 'admin'
}

export class AuthRequiredError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'AuthRequiredError'
  }
}

export function isAuthHttpError(err: unknown): err is Error & { status: number } {
  return (
    err instanceof Error &&
    typeof (err as Error & { status?: number }).status === 'number'
  )
}

export function classifyAuthFailure(
  err: unknown,
  token?: string | null,
  isExpired?: (t: string | null | undefined) => boolean,
): 'expired' | 'invalid' | 'network' | 'unknown' {
  if (isAuthHttpError(err)) {
    if (err.status === 401) {
      if (token && isExpired && !isExpired(token)) return 'network'
      return 'expired'
    }
    return 'invalid'
  }
  if (err instanceof TypeError) return 'network'
  return 'unknown'
}
