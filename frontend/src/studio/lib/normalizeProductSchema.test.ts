import { describe, expect, it } from 'vitest'
import { isCanonicalProductSchema, needsProductSchemaNormalization } from './normalizeProductSchema'
import type { ProductSchema } from './productSchema'

describe('needsProductSchemaNormalization', () => {
  it('skips canonical .json when already feidu-shaped', () => {
    const raw = JSON.stringify({
      document_title: 'T',
      slides: [
        { page_id: 1, page_type: 'section_divider', headline: 'Cover' },
        { page_id: 2, page_type: 'insight', headline: 'A', body: ['b'] },
      ],
    })
    expect(needsProductSchemaNormalization('data.json', raw)).toBe(false)
  })

  it('normalizes non-canonical .json', () => {
    const raw = JSON.stringify({ slides: [{ headline: 'Only title' }] })
    expect(needsProductSchemaNormalization('data.json', raw)).toBe(true)
  })

  it('skips canonical schema in markdown', () => {
    const doc: ProductSchema = {
      document_title: 'Report',
      slides: [
        { page_id: 1, page_type: 'section_divider', headline: 'Cover' },
        { page_id: 2, page_type: 'insight', headline: 'Point', body: ['x'] },
      ],
    }
    expect(needsProductSchemaNormalization('deck.md', JSON.stringify(doc))).toBe(false)
  })
})

describe('isCanonicalProductSchema', () => {
  it('requires title and typed slides', () => {
    expect(
      isCanonicalProductSchema({
        document_title: 'R',
        slides: [
          { page_type: 'insight', headline: 'a' },
          { page_type: 'insight', headline: 'b' },
        ],
      }),
    ).toBe(true)
    expect(
      isCanonicalProductSchema({
        slides: [{ headline: 'a' }],
      }),
    ).toBe(false)
  })
})
