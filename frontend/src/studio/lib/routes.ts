import type { PptEngine } from './pptEngine'

/** 嵌入主工作台时的路由前缀 */
export const STUDIO_ROUTE_BASE = '/ppt'

function isStandaloneStudioEntry(): boolean {
  if (typeof window === 'undefined') return false
  return /studio\.html$/i.test(window.location.pathname)
}

export function studioPath(subpath: string): string {
  const p = subpath.startsWith('/') ? subpath : `/${subpath}`
  if (isStandaloneStudioEntry()) {
    return p === '/' ? '/' : p
  }
  return `${STUDIO_ROUTE_BASE}${p}`
}

export function studioProjectPath(projectId: string, engine?: PptEngine): string {
  const base = studioPath(`/p/${projectId}`)
  if (!engine) return base
  const sep = base.includes('?') ? '&' : '?'
  return `${base}${sep}engine=${engine}`
}

export function studioHomePath(): string {
  return studioPath('/')
}
