import type { OhMyPptPage } from './ohmypptTypes'

const cache = new Map<string, Blob>()
const MAX_ENTRIES = 8

function resolvePageId(page: OhMyPptPage): string {
  return page.pageId || page.id || `page-${page.pageNumber}`
}

export function buildPptxPreviewCacheKey(
  sessionId: string,
  pages: OhMyPptPage[],
  sessionUpdatedAt: number,
  opts?: { image_only?: boolean; embed_fonts?: 'auto' | 'always' | 'never' },
): string {
  const pageSig = pages
    .map((p) => `${resolvePageId(p)}:${p.pageNumber}:${p.status ?? ''}:${p.title}`)
    .join('|')
  return `${sessionId}:${sessionUpdatedAt}:${opts?.image_only ? '1' : '0'}:${opts?.embed_fonts ?? 'always'}:${pageSig}`
}

export function getCachedPptxPreview(cacheKey: string): Blob | undefined {
  return cache.get(cacheKey)
}

export function setCachedPptxPreview(cacheKey: string, blob: Blob): void {
  if (cache.size >= MAX_ENTRIES && !cache.has(cacheKey)) {
    const firstKey = cache.keys().next().value
    if (firstKey) cache.delete(firstKey)
  }
  cache.set(cacheKey, blob)
}
