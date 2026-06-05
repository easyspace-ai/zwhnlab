import { isPlaceholderPageHtml } from './html-utils.js'

export type SessionPageLike = {
  pageNumber: number
  pageId: string
  status?: string | null
}

const scoreSessionPage = (status: string | null | undefined, isPlaceholder: boolean): number => {
  if (isPlaceholder) return 0
  if (status === 'completed') return 3
  if (status === 'failed') return 1
  return 2
}

/** Keep the best row when multiple session_pages share the same pageNumber. */
export function pickBestSessionPagesByNumber<T extends SessionPageLike>(
  pages: T[],
  htmlByPageId: ReadonlyMap<string, string>
): T[] {
  const bestByNumber = new Map<number, T>()

  for (const page of pages) {
    const html = htmlByPageId.get(page.pageId) ?? ''
    const placeholder = html.length > 0 ? isPlaceholderPageHtml(html) : true
    const score = scoreSessionPage(page.status, placeholder)
    const existing = bestByNumber.get(page.pageNumber)
    if (!existing) {
      bestByNumber.set(page.pageNumber, page)
      continue
    }
    const existingHtml = htmlByPageId.get(existing.pageId) ?? ''
    const existingPlaceholder =
      existingHtml.length > 0 ? isPlaceholderPageHtml(existingHtml) : true
    const existingScore = scoreSessionPage(existing.status, existingPlaceholder)
    if (score > existingScore) {
      bestByNumber.set(page.pageNumber, page)
    }
  }

  return Array.from(bestByNumber.values()).sort((a, b) => a.pageNumber - b.pageNumber)
}

/** Pages safe to preview or export: deduped and without scaffold placeholders. */
export function filterExportableSessionPages<T extends SessionPageLike>(
  pages: T[],
  htmlByPageId: ReadonlyMap<string, string>
): T[] {
  return pickBestSessionPagesByNumber(pages, htmlByPageId).filter((page) => {
    const html = htmlByPageId.get(page.pageId) ?? ''
    return html.length > 0 && !isPlaceholderPageHtml(html)
  })
}
