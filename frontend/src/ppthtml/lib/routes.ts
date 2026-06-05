/** 嵌入主工作台时的路由前缀 */
export const PPTHTML_ROUTE_BASE = '/ppthtml'

export function ppthtmlPath(subpath: string): string {
  const p = subpath.startsWith('/') ? subpath : `/${subpath}`
  return `${PPTHTML_ROUTE_BASE}${p}`
}

export function ppthtmlProjectPath(projectId: string): string {
  return ppthtmlPath(`/p/${projectId}`)
}

export function ppthtmlHomePath(): string {
  return ppthtmlPath('/')
}
