import { describe, expect, it } from 'vitest'
import { filterExportableSessionPages, pickBestSessionPagesByNumber } from '../src/ohmyppt/tools/session-page-filter.js'
import { PAGE_PLACEHOLDER_TEXT } from '../src/ohmyppt/tools/html-utils.js'

const placeholderHtml = `<html><body data-placeholder-page="1">${PAGE_PLACEHOLDER_TEXT}</body></html>`
const realHtml = '<html><body><h1>Done</h1></body></html>'

describe('session-page-filter', () => {
  it('dedupes by pageNumber and prefers completed non-placeholder pages', () => {
    const pages = [
      { pageNumber: 1, pageId: 'page-a', status: 'completed' },
      { pageNumber: 1, pageId: 'page-b', status: 'completed' },
      { pageNumber: 2, pageId: 'page-c', status: 'failed' },
      { pageNumber: 2, pageId: 'page-d', status: 'completed' }
    ]
    const htmlByPageId = new Map([
      ['page-a', placeholderHtml],
      ['page-b', realHtml],
      ['page-c', placeholderHtml],
      ['page-d', realHtml]
    ])

    const picked = pickBestSessionPagesByNumber(pages, htmlByPageId)
    expect(picked.map((p) => p.pageId)).toEqual(['page-b', 'page-d'])
  })

  it('drops placeholder-only pages from export list', () => {
    const pages = [
      { pageNumber: 1, pageId: 'page-a', status: 'completed' },
      { pageNumber: 2, pageId: 'page-b', status: 'failed' }
    ]
    const htmlByPageId = new Map([
      ['page-a', realHtml],
      ['page-b', placeholderHtml]
    ])

    const exportable = filterExportableSessionPages(pages, htmlByPageId)
    expect(exportable.map((p) => p.pageId)).toEqual(['page-a'])
  })
})
