/** 活动栏菜单权限 key，与后台「权限管理」勾选一致 */
export const NAV_PERMISSION_KEYS = {
  polymarket: 'menu_polymarket',
  xstream: 'menu_xstream',
  dashboard: 'menu_dashboard',
  aiSession: 'menu_ai_session',
  osintDashboard: 'menu_osint_dashboard',
  aichat: 'menu_aichat',
  ppt: 'menu_ppt',
  admin: 'menu_admin',
} as const

export function canAccessNavItem(
  permission: string | undefined,
  user: { role?: string; permissions?: string[] } | null | undefined,
): boolean {
  if (!user) return false
  if (user.role === 'admin') return true
  if (!permission) return true
  return (user.permissions ?? []).includes(permission)
}
