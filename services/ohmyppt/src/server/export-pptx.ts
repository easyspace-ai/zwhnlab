import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import log from 'electron-log/main.js'
import {
  collectEmbeddedFonts,
  writeHtmlToPptx,
  type HtmlToPptxEmbeddedFont,
  type HtmlToPptxSlide
} from '../ohmyppt/utils/html-pptx/index.js'
import { extractHtmlPageToPptxSlide } from '../ohmyppt/utils/html-pptx/renderer.js'
import type { OhMyPptRuntime } from './runtime.js'
import {
  buildPptxExportCacheKey,
  getCachedPptxExport,
  setCachedPptxExport
} from './pptx-export-cache.js'

let exportChain: Promise<unknown> = Promise.resolve()

const withExportLock = <T>(task: () => Promise<T>): Promise<T> => {
  const run = exportChain.then(task, task)
  exportChain = run.then(
    () => undefined,
    () => undefined
  )
  return run
}

export type PptxExportOptions = {
  imageOnly?: boolean
  embedFonts?: 'auto' | 'always' | 'never'
}

export type PptxExportResult = {
  buffer: Buffer
  warnings: string[]
  pageCount: number
  fileName: string
}

const sanitizeExportBaseName = (value: string, fallback: string): string =>
  value.replace(/[\\/:*?"<>|]/g, '_').slice(0, 120) || fallback

export async function exportSessionToPptx(
  runtime: OhMyPptRuntime,
  sessionId: string,
  options: PptxExportOptions = {}
): Promise<PptxExportResult> {
  return withExportLock(() => exportSessionToPptxUnlocked(runtime, sessionId, options))
}

async function exportSessionToPptxUnlocked(
  runtime: OhMyPptRuntime,
  sessionId: string,
  options: PptxExportOptions = {}
): Promise<PptxExportResult> {
  const imageOnly = options.imageOnly === true
  const fontEmbedMode = imageOnly ? 'never' : options.embedFonts ?? 'always'

  const { session, pages, projectDir } = await runtime.ipc.resolveSessionPageFiles(sessionId)
  if (!pages.length) {
    throw new Error('会话没有可导出的页面')
  }

  const sessionTitle =
    typeof session.title === 'string' && session.title.trim().length > 0
      ? session.title.trim()
      : `ohmyppt-${sessionId}`

  const prefix = imageOnly ? '【Image】' : '【Edit】'
  const fileName = `${sanitizeExportBaseName(`${prefix}${sessionTitle}`, sessionId)}.pptx`

  const cacheKey = await buildPptxExportCacheKey(sessionId, sessionTitle, pages, options)
  const cached = getCachedPptxExport(cacheKey)
  if (cached) {
    log.info('[export:pptx] cache hit', {
      sessionId,
      pageCount: cached.pageCount,
      imageOnly
    })
    return cached
  }

  const warnings: string[] = []
  const slides: HtmlToPptxSlide[] = []

  const {
    waitForPrintReadySignal,
    EXPORT_PAGE_READY_TIMEOUT_MS,
    EXPORT_CAPTURE_SETTLE_MS
  } = runtime.ipc

  for (const page of pages) {
    log.info('[export:pptx] extract page', {
      sessionId,
      pageId: page.pageId,
      htmlPath: page.htmlPath,
      mode: imageOnly ? 'image' : 'editable'
    })

    if (imageOnly) {
      const { captureHtmlPageToPptxImageSlide } = await import(
        '../ohmyppt/utils/html-pptx/renderer.js'
      )
      const extracted = await captureHtmlPageToPptxImageSlide({
        page,
        timeoutMs: EXPORT_PAGE_READY_TIMEOUT_MS,
        settleMs: EXPORT_CAPTURE_SETTLE_MS,
        waitForPrintReadySignal
      })
      slides.push(extracted.slide)
      if (extracted.warning) warnings.push(extracted.warning)
    } else {
      const extracted = await extractHtmlPageToPptxSlide({
        page,
        timeoutMs: EXPORT_PAGE_READY_TIMEOUT_MS,
        settleMs: EXPORT_CAPTURE_SETTLE_MS,
        waitForPrintReadySignal
      })
      slides.push(extracted.slide)
      if (extracted.warning) warnings.push(extracted.warning)
    }
  }

  if (!imageOnly) {
    const pagesWithoutText = slides.filter((s) => s.texts.length === 0).length
    if (pagesWithoutText > 0) {
      warnings.push(`${pages.length} 页中有 ${pagesWithoutText} 页未提取到可编辑文本。`)
    }
  }

  let embeddedFonts: HtmlToPptxEmbeddedFont[] = []
  if (!imageOnly) {
    try {
      embeddedFonts = await collectEmbeddedFonts(projectDir, slides, {
        mode: fontEmbedMode,
        maxTotalBytes: 20 * 1024 * 1024
      })
    } catch (error) {
      log.warn('[export:pptx] font embedding collection failed', {
        sessionId,
        message: error instanceof Error ? error.message : String(error)
      })
      warnings.push('字体嵌入失败，已自动改用 PowerPoint 本机字体导出。')
    }
  }

  const tmpPath = path.join(
    os.tmpdir(),
    `ohmyppt-export-${sessionId}-${Date.now()}.pptx`
  )

  try {
    try {
      await writeHtmlToPptx(tmpPath, {
        title: sessionTitle,
        author: 'OhMyPPT',
        slides,
        embeddedFonts: embeddedFonts.length > 0 ? embeddedFonts : undefined
      })
    } catch (error) {
      if (embeddedFonts.length === 0) throw error
      log.warn('[export:pptx] write with embedded fonts failed, retry without fonts', {
        sessionId,
        message: error instanceof Error ? error.message : String(error)
      })
      warnings.push('字体嵌入写入失败，已自动降级为 PowerPoint 本机字体导出。')
      await writeHtmlToPptx(tmpPath, {
        title: sessionTitle,
        author: 'OhMyPPT',
        slides
      })
    }

    const buffer = await fs.readFile(tmpPath)
    const project = await runtime.db.getProject(sessionId)
    if (project?.id) {
      await runtime.db.updateProjectStatus(project.id, 'exported')
    }

    log.info('[export:pptx] completed', {
      sessionId,
      pageCount: slides.length,
      warningCount: warnings.length,
      imageOnly,
      embeddedFontCount: embeddedFonts.length
    })

    const result: PptxExportResult = {
      buffer,
      warnings,
      pageCount: slides.length,
      fileName
    }
    setCachedPptxExport(cacheKey, result)
    return result
  } finally {
    await fs.unlink(tmpPath).catch(() => undefined)
  }
}
