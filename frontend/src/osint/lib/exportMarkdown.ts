import { marked } from 'marked'
import { reflowMarkdown } from './exportApi'

marked.setOptions({ gfm: true, breaks: false })

/** Simple string hash for cache key generation. */
function simpleHash(str: string): string {
  let h = 0
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h + str.charCodeAt(i)) | 0
  }
  return h.toString(16)
}

type ExportFormat = 'word' | 'pdf'

interface ExportCacheEntry {
  blob: Blob
  filename: string
}

const exportCache = new Map<string, ExportCacheEntry>()
const reflowCache = new Map<string, string>()

function exportCacheKey(content: string, format: ExportFormat): string {
  return `${simpleHash(content)}_${format}`
}

function reflowCacheKey(content: string): string {
  return simpleHash(content)
}

function getExportCached(content: string, format: ExportFormat): ExportCacheEntry | undefined {
  return exportCache.get(exportCacheKey(content, format))
}

function setExportCached(content: string, format: ExportFormat, entry: ExportCacheEntry): void {
  if (exportCache.size >= 8) {
    const firstKey = exportCache.keys().next().value
    if (firstKey !== undefined) {
      exportCache.delete(firstKey)
    }
  }
  exportCache.set(exportCacheKey(content, format), entry)
}

function getReflowCached(content: string): string | undefined {
  return reflowCache.get(reflowCacheKey(content))
}

function setReflowCached(content: string, reflowed: string): void {
  if (reflowCache.size >= 8) {
    const firstKey = reflowCache.keys().next().value
    if (firstKey !== undefined) {
      reflowCache.delete(firstKey)
    }
  }
  reflowCache.set(reflowCacheKey(content), reflowed)
}

export function clearExportCache(): void {
  exportCache.clear()
  reflowCache.clear()
}

const EXPORT_BODY_STYLE =
  'font-family:"Microsoft YaHei","PingFang SC","Helvetica Neue",Arial,sans-serif;font-size:11pt;line-height:1.6;color:#333;'

const PDF_CSS = `
  .md-export h1 { font-size: 18pt; font-weight: bold; margin: 18pt 0 12pt; border-bottom: 1px solid #ddd; }
  .md-export h2 { font-size: 14pt; font-weight: bold; margin: 14pt 0 10pt; }
  .md-export h3 { font-size: 12pt; font-weight: bold; margin: 12pt 0 8pt; }
  .md-export h4 { font-size: 11pt; font-weight: bold; margin: 10pt 0 6pt; }
  .md-export p { margin: 0 0 8pt; }
  .md-export ul, .md-export ol { margin: 0 0 8pt; padding-left: 24pt; }
  .md-export li { margin: 0 0 4pt; }
  .md-export code { font-family: Consolas, monospace; font-size: 10pt; background: #f5f5f5; padding: 1pt 3pt; }
  .md-export pre { background: #f5f5f5; padding: 8pt; overflow-x: auto; margin: 0 0 8pt; font-size: 10pt; white-space: pre-wrap; word-break: break-word; }
  .md-export pre code { background: transparent; padding: 0; }
  .md-export blockquote { border-left: 3pt solid #ccc; margin: 0 0 8pt; padding-left: 12pt; color: #666; }
  .md-export table { border-collapse: collapse; width: 100%; margin: 0 0 8pt; }
  .md-export th, .md-export td { border: 1pt solid #ddd; padding: 4pt 8pt; text-align: left; vertical-align: top; }
  .md-export th { background: #f9f9f9; font-weight: bold; }
  .md-export a { color: #2563eb; text-decoration: underline; }
  .md-export img { max-width: 100%; height: auto; }
  .md-export hr { border: none; border-top: 1pt solid #ddd; margin: 12pt 0; }
  .md-export sup { font-size: 0.75em; vertical-align: super; line-height: 0; }
`

const FOOTNOTE_REF_RE = /\[\^([^\]\s]+)\]/g
const FOOTNOTE_DEF_RE = /^\[\^([^\]\s]+)\]:\s?(.*)$/
const REFERENCES_HEADING_RE = /^##\s+(参考来源|参考文献|References|引用|信源)\s*$/i
const REFERENCES_HEADING_TEXT_RE = /^(参考来源|参考文献|References|引用|信源)$/i
const WORD_CITATION_LINK_RE = /^#ref-(\d+)$/
const FENCED_CODE_BLOCK_RE = /(```[\s\S]*?```)/g
const DEFAULT_REFERENCES_HEADING = '## 参考来源'

type CitationFormat = 'html' | 'word-link'

type DocxXmlNode = {
  rootKey?: string
  root?: unknown[]
  options?: { link?: string }
}

type DocxDocumentBody = {
  documentWrapper?: {
    document?: {
      body?: {
        root?: DocxXmlNode[]
      }
    }
  }
}

/** A4 content width at 96dpi (~210mm). */
const PDF_PAGE_WIDTH_PX = 794

function stripExtension(filename: string): string {
  return filename.replace(/\.[^./\\]+$/, '')
}

export function exportFilename(baseName: string, ext: string): string {
  const name = baseName?.trim() || 'document'
  if (/\.[^./\\]+$/.test(name)) {
    return name.replace(/\.[^./\\]+$/, `.${ext}`)
  }
  return `${name}.${ext}`
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.rel = 'noopener'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

function splitFootnoteDefinitions(markdown: string): {
  bodyLines: string[]
  definitions: Map<string, string>
  definitionOrder: string[]
} {
  const lines = markdown.split('\n')
  const bodyLines: string[] = []
  const definitions = new Map<string, string>()
  const definitionOrder: string[] = []

  for (let i = 0; i < lines.length; i += 1) {
    const match = lines[i].match(FOOTNOTE_DEF_RE)
    if (!match) {
      bodyLines.push(lines[i])
      continue
    }

    const id = match[1]
    let content = match[2] ?? ''
    i += 1
    while (i < lines.length && /^ {4}/.test(lines[i])) {
      content += `\n${lines[i].slice(4)}`
      i += 1
    }
    i -= 1

    if (!definitions.has(id)) {
      definitionOrder.push(id)
    }
    definitions.set(id, content.trim())
  }

  return { bodyLines, definitions, definitionOrder }
}

function replaceFootnoteRefsOutsideCodeBlocks(
  markdown: string,
  replacer: (id: string) => string | null,
): string {
  return markdown
    .split(FENCED_CODE_BLOCK_RE)
    .map((segment, index) => {
      if (index % 2 === 1) {
        return segment
      }
      return segment.replace(FOOTNOTE_REF_RE, (full, id: string) => {
        const replacement = replacer(id)
        return replacement ?? full
      })
    })
    .join('')
}

function buildReferenceLines(ids: string[], definitions: Map<string, string>): string[] {
  return ids.map((id, index) => {
    const definition = definitions.get(id)?.trim()
    if (!definition) {
      return `${index + 1}. ${id}`
    }
    return `${index + 1}. ${definition}`
  })
}

function formatCitation(number: number, format: CitationFormat): string {
  if (format === 'word-link') {
    return `[[${number}]](#ref-${number})`
  }
  return `<sup>[${number}]</sup>`
}

function appendReferencesSection(body: string, heading: string, referenceLines: string[]): string {
  const lines = body.split('\n')
  let headingIndex = -1

  for (let i = lines.length - 1; i >= 0; i -= 1) {
    if (REFERENCES_HEADING_RE.test(lines[i].trim())) {
      headingIndex = i
      break
    }
  }

  if (headingIndex >= 0) {
    const before = lines.slice(0, headingIndex + 1).join('\n').trimEnd()
    return `${before}\n\n${referenceLines.join('\n')}\n`
  }

  return `${body.trimEnd()}\n\n${heading}\n\n${referenceLines.join('\n')}\n`
}

export type NormalizeFootnotesOptions = {
  /** html: `<sup>[n]</sup>` for PDF; word-link: `[[n]](#ref-n)` for Word. */
  citationFormat?: CitationFormat
}

/**
 * GFM footnotes (`[^id]`) are rendered as Word page footnotes by markdown-docx.
 * Convert them to numbered inline refs plus an end-of-document references section.
 */
export function normalizeFootnotesForExport(
  markdown: string,
  options: NormalizeFootnotesOptions = {},
): string {
  const citationFormat = options.citationFormat ?? 'html'
  const { bodyLines, definitions, definitionOrder } = splitFootnoteDefinitions(markdown)
  if (definitions.size === 0) {
    return markdown
  }

  const body = bodyLines.join('\n')
  const appearanceOrder: string[] = []
  const seen = new Set<string>()

  replaceFootnoteRefsOutsideCodeBlocks(body, (id) => {
    if (!definitions.has(id) || seen.has(id)) {
      return null
    }
    seen.add(id)
    appearanceOrder.push(id)
    return null
  })

  for (const id of definitionOrder) {
    if (!seen.has(id)) {
      seen.add(id)
      appearanceOrder.push(id)
    }
  }

  const idToNumber = new Map<string, number>()
  appearanceOrder.forEach((id, index) => {
    idToNumber.set(id, index + 1)
  })

  const processedBody = replaceFootnoteRefsOutsideCodeBlocks(body, (id) => {
    const number = idToNumber.get(id)
    return number ? formatCitation(number, citationFormat) : null
  })

  const referenceLines = buildReferenceLines(appearanceOrder, definitions)
  const headingMatch = body.match(REFERENCES_HEADING_RE)
  const referencesHeading = headingMatch?.[0].trim() ?? DEFAULT_REFERENCES_HEADING

  return appendReferencesSection(processedBody, referencesHeading, referenceLines)
}

function collectParagraphText(paragraph: DocxXmlNode): string {
  const parts: string[] = []

  function walk(node: DocxXmlNode | string | undefined) {
    if (!node || typeof node !== 'object') {
      return
    }
    if (node.rootKey === 'w:t' && Array.isArray(node.root)) {
      for (const part of node.root) {
        if (typeof part === 'string') {
          parts.push(part)
        }
      }
    }
    if (Array.isArray(node.root)) {
      for (const child of node.root) {
        walk(child)
      }
    }
  }

  walk(paragraph)
  return parts.join('')
}

function paragraphIsNumbered(paragraph: DocxXmlNode): boolean {
  return JSON.stringify(paragraph).includes('"rootKey":"w:numPr"')
}

function walkDocxParagraphs(nodes: unknown[] | undefined, visit: (paragraph: DocxXmlNode) => void) {
  if (!nodes) {
    return
  }

  for (const node of nodes) {
    const element = node as DocxXmlNode
    if (element.rootKey === 'w:p') {
      visit(element)
      continue
    }
    if (Array.isArray(element.root)) {
      walkDocxParagraphs(element.root, visit)
    }
  }
}

function insertParagraphBookmark(
  paragraph: DocxXmlNode,
  bookmarkId: string,
  Bookmark: typeof import('docx').Bookmark,
  TextRun: typeof import('docx').TextRun,
) {
  const bookmark = new Bookmark({
    id: bookmarkId,
    children: [new TextRun({ text: '' })],
  })
  const children = paragraph.root
  if (!children) {
    paragraph.root = [bookmark]
    return
  }

  let insertAt = 0
  while (insertAt < children.length && (children[insertAt] as DocxXmlNode)?.rootKey === 'w:pPr') {
    insertAt += 1
  }
  children.splice(insertAt, 0, bookmark as unknown as DocxXmlNode)
}

function replaceWordCitationHyperlinks(
  paragraph: DocxXmlNode,
  InternalHyperlink: typeof import('docx').InternalHyperlink,
  TextRun: typeof import('docx').TextRun,
) {
  const children = paragraph.root
  if (!children) {
    return
  }

  for (let index = 0; index < children.length; index += 1) {
    const child = children[index] as DocxXmlNode
    if (child.rootKey !== 'w:externalHyperlink') {
      continue
    }

    const link = child.options?.link
    const match = link?.match(WORD_CITATION_LINK_RE)
    if (!match) {
      continue
    }

    children[index] = new InternalHyperlink({
      anchor: `ref-${match[1]}`,
      children: [new TextRun({ text: `[${match[1]}]`, superScript: true })],
    }) as unknown as DocxXmlNode
  }
}

/** Turn markdown-docx citation links into superscript internal hyperlinks with reference bookmarks. */
async function applyWordCitationLinks(doc: DocxDocumentBody): Promise<void> {
  const { Bookmark, InternalHyperlink, TextRun } = await import('docx')
  const bodyRoot = doc.documentWrapper?.document?.body?.root
  if (!bodyRoot) {
    return
  }

  let inReferences = false
  let referenceIndex = 0

  walkDocxParagraphs(bodyRoot, (paragraph) => {
    const text = collectParagraphText(paragraph).trim()
    if (REFERENCES_HEADING_TEXT_RE.test(text)) {
      inReferences = true
      referenceIndex = 0
      return
    }

    if (inReferences && paragraphIsNumbered(paragraph)) {
      referenceIndex += 1
      insertParagraphBookmark(paragraph, `ref-${referenceIndex}`, Bookmark, TextRun)
      return
    }

    if (!inReferences) {
      replaceWordCitationHyperlinks(paragraph, InternalHyperlink, TextRun)
    }
  })
}

function markdownToHtmlBody(markdown: string): string {
  return marked.parse(markdown) as string
}

async function waitForLayout(el: HTMLElement): Promise<void> {
  if ('fonts' in document && document.fonts?.ready) {
    await document.fonts.ready.catch(() => undefined)
  }
  await new Promise<void>((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => resolve())
    })
  })
  // Force layout so html2canvas sees non-zero dimensions.
  void el.offsetHeight
  await new Promise((resolve) => setTimeout(resolve, 50))
}

function buildPdfExportElements(markdown: string): { root: HTMLDivElement; content: HTMLDivElement } {
  const root = document.createElement('div')
  root.setAttribute('aria-hidden', 'true')
  root.style.cssText = [
    'position:fixed',
    'left:0',
    'top:0',
    `width:${PDF_PAGE_WIDTH_PX}px`,
    'padding:24px',
    'background:#fff',
    'box-sizing:border-box',
    'opacity:0',
    'pointer-events:none',
    'z-index:-1',
    'overflow:visible',
  ].join(';')

  const style = document.createElement('style')
  style.textContent = PDF_CSS
  root.appendChild(style)

  const content = document.createElement('div')
  content.className = 'md-export'
  content.style.cssText = EXPORT_BODY_STYLE
  content.innerHTML = markdownToHtmlBody(markdown)
  root.appendChild(content)

  return { root, content }
}

/** Download raw markdown as a .md file. */
export function downloadMarkdown(markdown: string, filename: string): void {
  const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' })
  downloadBlob(blob, exportFilename(filename, 'md'))
}

/** Real .docx export (Word, Pages, WPS). */
export async function exportMarkdownAsWord(markdown: string, filename: string): Promise<void> {
  // Step 1: AI reflow (cached)
  let reflowed = getReflowCached(markdown)
  if (!reflowed) {
    reflowed = await reflowMarkdown(markdown)
    setReflowCached(markdown, reflowed)
  }

  // Step 2: Word blob (cached)
  const cached = getExportCached(reflowed, 'word')
  if (cached) {
    downloadBlob(cached.blob, cached.filename)
    return
  }

  const { default: markdownDocx, Packer } = await import('markdown-docx')
  const exportMarkdown = normalizeFootnotesForExport(reflowed, { citationFormat: 'word-link' })
  const doc = await markdownDocx(exportMarkdown, {
    gfm: true,
    ignoreImage: false,
    ignoreFootnote: true,
  })
  await applyWordCitationLinks(doc as unknown as DocxDocumentBody)
  const blob = await Packer.toBlob(doc)
  const outName = exportFilename(filename, 'docx')
  setExportCached(reflowed, 'word', { blob, filename: outName })
  downloadBlob(blob, outName)
}

export async function exportMarkdownAsPdf(markdown: string, filename: string): Promise<void> {
  // Step 1: AI reflow (cached)
  let reflowed = getReflowCached(markdown)
  if (!reflowed) {
    reflowed = await reflowMarkdown(markdown)
    setReflowCached(markdown, reflowed)
  }

  // Step 2: PDF blob (cached)
  const cached = getExportCached(reflowed, 'pdf')
  if (cached) {
    downloadBlob(cached.blob, cached.filename)
    return
  }

  const html2pdf = (await import('html2pdf.js')).default
  const exportMarkdown = normalizeFootnotesForExport(reflowed)
  const { root, content } = buildPdfExportElements(exportMarkdown)
  document.body.appendChild(root)

  try {
    await waitForLayout(content)
    const outName = exportFilename(filename, 'pdf')
    const blob: Blob = await html2pdf()
      .set({
        margin: [10, 10, 10, 10],
        filename: outName,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: false,
          width: PDF_PAGE_WIDTH_PX,
          windowWidth: PDF_PAGE_WIDTH_PX,
          scrollX: 0,
          scrollY: 0,
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      })
      .from(content)
      .output('blob')
    setExportCached(reflowed, 'pdf', { blob, filename: outName })
    downloadBlob(blob, outName)
  } finally {
    document.body.removeChild(root)
  }
}
