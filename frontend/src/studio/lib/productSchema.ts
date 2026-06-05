/** Feidu-style product / deck schema (see data/feidu schema.md). */

export type ProductSlide = {
  page_id?: number
  page_type?: string
  headline?: string
  subtitle?: string
  body?: string[]
  elements?: string[]
  visual_type?: string
  table_data?: { rows?: string[][] }
  chart_data?: Record<string, unknown>
  left?: string[]
  right?: string[]
  note?: string
}

/** Canonical feidu-style deck document (see data/feidu schema.md). */
export type StandardProductSchema = ProductSchema

export type ProductSchema = {
  document_title?: string
  source?: string
  total_pages?: number
  style?: string
  slides: ProductSlide[]
}

const JSON_LINE_COMMENT_RE = /^\s*\/\/.*$/gm

export const PPT_PAGE_MIN = 4
export const PPT_PAGE_MAX = 50
export const OHMY_PAGE_MIN = 1
export const OHMY_PAGE_MAX = 50

export const PPT_PAGE_PRESETS = [4, 6, 8, 10, 12, 16, 20, 24, 30, 35, 40, 50] as const

export function clampPageCount(n: number, min = PPT_PAGE_MIN, max = PPT_PAGE_MAX): number {
  const v = Math.floor(Number(n) || 0)
  if (v < min) return min
  if (v > max) return max
  return v
}

export function stripJsonComments(raw: string): string {
  return raw.replace(JSON_LINE_COMMENT_RE, '')
}

/** Fix unescaped " inside JSON strings (common in Chinese product exports). */
export function repairJsonInlineQuotes(raw: string): string {
  const runes = [...raw]
  let out = ''
  let inString = false
  let escaped = false
  for (let i = 0; i < runes.length; i++) {
    const r = runes[i]
    if (escaped) {
      out += r
      escaped = false
      continue
    }
    if (r === '\\' && inString) {
      out += r
      escaped = true
      continue
    }
    if (r !== '"') {
      out += r
      continue
    }
    if (!inString) {
      inString = true
      out += r
      continue
    }
    let j = i + 1
    while (j < runes.length && (runes[j] === ' ' || runes[j] === '\t')) j++
    if (
      j >= runes.length ||
      runes[j] === ',' ||
      runes[j] === ']' ||
      runes[j] === '}' ||
      runes[j] === ':' ||
      runes[j] === '\n' ||
      runes[j] === '\r'
    ) {
      inString = false
      out += r
      continue
    }
    let k = i + 1
    while (k < runes.length && runes[k] !== '"') k++
    if (k < runes.length) {
      out += `「${runes.slice(i + 1, k).join('')}」`
      i = k
      continue
    }
    out += r
  }
  return out
}

function stripJsonTrailingCommas(raw: string): string {
  let next = raw
  for (let i = 0; i < 8; i++) {
    const replaced = next.replace(/,(\s*[\]}])/g, '$1')
    if (replaced === next) return next
    next = replaced
  }
  return next
}

function prepareProductJson(trimmed: string): string {
  return stripJsonTrailingCommas(repairJsonInlineQuotes(stripJsonComments(trimmed)))
}

export function tryParseProductSchema(raw: string): ProductSchema | null {
  const trimmed = raw.trim()
  if (!trimmed.startsWith('{')) return null
  try {
    const doc = JSON.parse(prepareProductJson(trimmed)) as ProductSchema
    if (!Array.isArray(doc.slides) || doc.slides.length === 0) return null
    const looksProduct =
      Boolean(doc.document_title?.trim()) ||
      (doc.total_pages ?? 0) > 0 ||
      doc.slides.some((s) => Boolean(s.page_type?.trim()) || (s.page_id ?? 0) > 0)
    return looksProduct ? doc : null
  } catch {
    return null
  }
}

export function suggestSlideCountFromText(text: string, schemaSlideCount?: number): number {
  if (schemaSlideCount && schemaSlideCount > 0) {
    return clampPageCount(schemaSlideCount, PPT_PAGE_MIN, PPT_PAGE_MAX)
  }
  const n = text.trim().length
  if (n < 2000) return 8
  if (n < 8000) return 12
  if (n < 20000) return 16
  if (n < 40000) return 24
  return clampPageCount(Math.ceil(n / 1500) + 6)
}

export function productSchemaTitle(doc: ProductSchema): string {
  const t = doc.document_title?.trim()
  if (t) return t
  return doc.slides[0]?.headline?.trim() || '演示文稿'
}

export function productSchemaToBrief(doc: ProductSchema, requestedPages?: number): string {
  const title = productSchemaTitle(doc)
  const total = requestedPages && requestedPages < doc.slides.length ? requestedPages : doc.slides.length
  const lines: string[] = [
    `演示目标：根据结构化产品/研究报告 schema 生成 ${total} 页演示稿。`,
    `文档标题：${title}`,
  ]
  if (doc.source?.trim()) lines.push(`来源：${doc.source.trim()}`)
  lines.push('建议大纲：')
  doc.slides.slice(0, total).forEach((s, i) => {
    const h = s.headline?.trim() || `第 ${i + 1} 页`
    lines.push(`${i + 1}. ${h}${s.page_type ? ` (${s.page_type})` : ''}`)
  })
  lines.push('每页要点：')
  doc.slides.slice(0, total).forEach((s, i) => {
    const parts: string[] = []
    if (s.subtitle?.trim()) parts.push(s.subtitle.trim())
    if (s.body?.length) parts.push(s.body.join('；'))
    if (s.note?.trim()) parts.push(s.note.trim())
    lines.push(`第 ${i + 1} 页：${parts.join(' | ') || s.headline || ''}`)
  })
  lines.push('必须保留的事实/指标/术语：请忠实呈现 schema 中的数据与专有名词，勿编造。')
  lines.push('风格/表达要求：专业咨询报告风格，章节用 section 页分隔。')
  return lines.join('\n')
}

/** Markdown wrapper so pptxgenjs pipeline receives parseable product JSON. */
export function productSchemaToPipelineMarkdown(doc: ProductSchema): string {
  return `<!-- product-schema -->\n${JSON.stringify(doc)}`
}

export function isProductSchemaMarkdown(md: string): boolean {
  return md.includes('<!-- product-schema -->') || tryParseProductSchema(md.trim()) !== null
}
