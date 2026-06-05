import fs from 'node:fs/promises'
import { LRUCache } from 'lru-cache'

export type PptxExportPageRef = {
  pageId: string
  htmlPath: string
}

export type CachedPptxExportResult = {
  buffer: Buffer
  warnings: string[]
  pageCount: number
  fileName: string
}

export type PptxExportCacheOptions = {
  imageOnly?: boolean
  embedFonts?: 'auto' | 'always' | 'never'
}

const cache = new LRUCache<string, CachedPptxExportResult>({
  max: 24,
  maxSize: 120 * 1024 * 1024,
  sizeCalculation: (entry) => entry.buffer.length
})

export async function buildPptxExportCacheKey(
  sessionId: string,
  sessionTitle: string,
  pages: PptxExportPageRef[],
  options: PptxExportCacheOptions
): Promise<string> {
  const parts = [
    sessionId,
    sessionTitle,
    options.imageOnly ? 'image' : 'editable',
    options.embedFonts ?? 'always'
  ]
  for (const page of pages) {
    const stat = await fs.stat(page.htmlPath)
    parts.push(`${page.pageId}:${stat.mtimeMs}:${stat.size}`)
  }
  return parts.join('\0')
}

export function getCachedPptxExport(cacheKey: string): CachedPptxExportResult | undefined {
  return cache.get(cacheKey)
}

export function setCachedPptxExport(cacheKey: string, result: CachedPptxExportResult): void {
  cache.set(cacheKey, result)
}

export function invalidatePptxExportCacheForSession(sessionId: string): void {
  const prefix = `${sessionId}\0`
  for (const key of [...cache.keys()]) {
    if (key.startsWith(prefix)) {
      cache.delete(key)
    }
  }
}
