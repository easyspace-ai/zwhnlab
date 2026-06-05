import { useOsintAuthStore } from './store'
import { isTokenExpired } from './token'

let redirectingToLogin = false

export type UnauthorizedHandlerOptions = {
  /** Skip redirect (e.g. already on login page). */
  skipRedirect?: boolean
  loginPath?: string
}

/**
 * Centralized 401 handling: only clear session when the JWT is actually expired.
 * Transient 401 (VPN/proxy/gateway) must not log the user out.
 */
export function handleUnauthorizedResponse(
  status: number,
  options: UnauthorizedHandlerOptions = {},
): void {
  if (status !== 401) return

  const token = useOsintAuthStore.getState().token
  if (token && !isTokenExpired(token)) {
    useOsintAuthStore.setState({ lastFailure: 'network' })
    return
  }

  useOsintAuthStore.getState().clearSession('expired')

  if (options.skipRedirect) return
  if (typeof window === 'undefined' || redirectingToLogin) return

  const loginPath = options.loginPath ?? '/login'
  const isAuthPage =
    window.location.pathname.startsWith(loginPath) ||
    window.location.pathname.startsWith('/register')
  if (isAuthPage) return

  redirectingToLogin = true
  const next = `${window.location.pathname}${window.location.search}${window.location.hash}`
  const redirect = encodeURIComponent(next || '/')
  window.location.replace(`${loginPath}?redirect=${redirect}&reason=expired`)
}

export function resetUnauthorizedRedirectGuard(): void {
  redirectingToLogin = false
}

export function getAccessToken(): string | null {
  return useOsintAuthStore.getState().token
}
