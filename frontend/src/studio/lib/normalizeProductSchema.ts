import { pptxgenjsApi } from '@/pptxgenjs/lib/pptxgenjsApi'
import {
  type ProductSchema,
  type StandardProductSchema,
  tryParseProductSchema,
} from './productSchema'

export type { StandardProductSchema }

export type NormalizeProductSchemaResult = {
  schema: StandardProductSchema
  warnings?: string[]
  skipped?: boolean
}

/** Returns true when upload should be LLM-normalized before PPT generation. */
export function needsProductSchemaNormalization(fileName: string, raw: string): boolean {
  const text = raw.trim()
  if (!text.startsWith('{') && !text.startsWith('[')) return false
  const doc = tryParseProductSchema(text)
  if (doc && isCanonicalProductSchema(doc)) return false
  const lower = fileName.toLowerCase().trim()
  if (lower.endsWith('.json')) return true
  if (!doc) return true
  return !isCanonicalProductSchema(doc)
}

export function isCanonicalProductSchema(doc: ProductSchema): boolean {
  if (!doc.slides?.length || !doc.document_title?.trim()) return false
  const typed = doc.slides.filter((s) => s.page_type?.trim()).length
  return typed >= Math.ceil(doc.slides.length / 2)
}

/**
 * Maps arbitrary external JSON to the internal feidu-style StandardProductSchema via backend LLM.
 */
export async function normalizeProductSchema(raw: unknown): Promise<NormalizeProductSchemaResult> {
  const rawText =
    typeof raw === 'string' ? raw : JSON.stringify(raw ?? {}, null, 0)
  const res = await pptxgenjsApi.normalizeProductSchema({
    raw: rawText,
  })
  return {
    schema: res.schema,
    warnings: res.warnings,
    skipped: res.skipped,
  }
}
