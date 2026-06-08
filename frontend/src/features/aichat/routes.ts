export const AICHAT_ROUTE_BASE = '/aichat'

export function aichatPath(subpath: string): string {
  const p = subpath.startsWith('/') ? subpath : `/${subpath}`
  return `${AICHAT_ROUTE_BASE}${p}`
}
