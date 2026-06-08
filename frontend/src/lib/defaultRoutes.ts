import { canAccessNavItem } from './navPermissions'

/** Fallback when no menu permission matches (e.g. legacy callers). */
export const DEFAULT_AUTH_HOME = '/osint-dashboard'

/** Menu permissions in sidebar / role-manager order → landing path */
export const PERMISSION_HOME_ROUTES: ReadonlyArray<{ permission: string; path: string }> = [
  { permission: 'menu_polymarket', path: '/polymarket' },
  { permission: 'menu_xstream', path: '/x-stream' },
  { permission: 'menu_dashboard', path: '/dashboard' },
  { permission: 'menu_ai_session', path: '/ai-session' },
  { permission: 'menu_aichat', path: '/aichat' },
  { permission: 'menu_osint_dashboard', path: '/osint-dashboard' },
  { permission: 'menu_ppt', path: '/ppt' },
  { permission: 'menu_admin', path: '/admin' },
]

export function resolveDefaultHomeForUser(
  user: { role?: string; permissions?: string[] } | null | undefined,
): string {
  if (!user) return DEFAULT_AUTH_HOME

  for (const entry of PERMISSION_HOME_ROUTES) {
    if (canAccessNavItem(entry.permission, user)) return entry.path
  }

  return DEFAULT_AUTH_HOME
}

/** Pick redirect target after login/register, respecting menu permissions. */
export function resolvePostLoginTarget(
  user: { role?: string; permissions?: string[] } | null | undefined,
  from?: string | null,
): string {
  const home = resolveDefaultHomeForUser(user)

  if (!from || from === '/login' || from === '/' || from === '/register') {
    return home
  }

  for (const entry of PERMISSION_HOME_ROUTES) {
    if (from === entry.path || from.startsWith(`${entry.path}/`)) {
      return canAccessNavItem(entry.permission, user) ? from : home
    }
  }

  return from
}
