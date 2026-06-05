import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { BrowserWindow } from 'electron'
import log from 'electron-log/main.js'
import { writeHtmlToPptx, type HtmlToPptxSlide } from '../ohmyppt/utils/html-pptx/index.js'
import { FREEZE_PAGE_FOR_EXPORT_SCRIPT } from '../ohmyppt/utils/html-pptx/browser-scripts.js'
import {
  captureSlideFromBrowserWindow,
  extractSlideFromBrowserWindow
} from '../ohmyppt/utils/html-pptx/renderer.js'
import {
  PPTX_CAPTURE_HEIGHT,
  PPTX_CAPTURE_WIDTH
} from '../adapters/playwright-browser-window.js'

const GUIZANG_ANIM_WAIT_MS = 1200
const GUIZANG_LOW_POWER_SETTLE_MS = 400
const GUIZANG_SLIDE_GAP_MS = 300

export type GuizangPptxExportOptions = {
  title?: string
  imageOnly?: boolean
}

export type GuizangPptxExportResult = {
  buffer: Buffer
  warnings: string[]
  slideCount: number
  fileName: string
}

const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms))

const sanitizeExportBaseName = (value: string, fallback: string): string =>
  value.replace(/[\\/:*?"<>|]/g, '_').slice(0, 120) || fallback

const buildGuizangSlideNavigationScript = (slideIndex: number): string => `
(function() {
  const n = ${slideIndex};
  document.querySelectorAll('.slide.ppt-page-root[data-ppt-guard-root="1"]').forEach((el) => {
    el.classList.remove('ppt-page-root');
    el.removeAttribute('data-ppt-guard-root');
  });
  const deck = document.getElementById('deck');
  if (!deck) return;
  const slides = deck.querySelectorAll('.slide');
  slides.forEach((s, idx) => {
    s.style.transform = idx === n ? 'none' : '';
  });
  deck.style.transform = 'translateX(' + (-n * 100) + 'vw)';
  window.__currentSlideIndex = n;
  const el = slides[n];
  if (el) {
    el.classList.add('ppt-page-root');
    el.setAttribute('data-ppt-guard-root', '1');
    const isDark = el.classList.contains('dark') || el.classList.contains('accent');
    document.body.classList.toggle('dark-bg', Boolean(isDark));
  }
  const playSlide = window.__playSlide;
  if (typeof playSlide === 'function') playSlide(n);
  document.querySelectorAll('#nav .dot').forEach((d, idx) => {
    d.classList.toggle('active', idx === n);
  });
})();
`

const enableGuizangLowPowerModeScript = `
(function() {
  if (typeof window.__setLowPowerMode === 'function') {
    window.__setLowPowerMode(true, { persist: false });
  } else {
    document.body.classList.add('low-power');
  }
})();
`

export async function exportGuizangHtmlToPptx(
  html: string,
  options: GuizangPptxExportOptions = {}
): Promise<GuizangPptxExportResult> {
  const imageOnly = options.imageOnly === true
  const deckTitle =
    typeof options.title === 'string' && options.title.trim().length > 0
      ? options.title.trim()
      : 'deck'
  const prefix = imageOnly ? '【Image】' : '【Edit】'
  const fileName = `${sanitizeExportBaseName(`${prefix}${deckTitle}`, 'guizang-deck')}.pptx`

  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'ohmyppt-guizang-'))
  const htmlPath = path.join(tmpDir, 'deck.html')
  await fs.writeFile(htmlPath, html, 'utf8')

  const fileUrl = pathToFileURL(htmlPath).toString()
  const win = new BrowserWindow({
    show: false,
    width: PPTX_CAPTURE_WIDTH,
    height: PPTX_CAPTURE_HEIGHT,
    backgroundColor: '#ffffff',
    webPreferences: {
      contextIsolation: true,
      sandbox: false,
      nodeIntegration: false,
      backgroundThrottling: false,
      offscreen: false
    }
  })

  const warnings: string[] = []
  const slides: HtmlToPptxSlide[] = []

  try {
    win.webContents.setZoomFactor(1)
    win.setContentSize(PPTX_CAPTURE_WIDTH, PPTX_CAPTURE_HEIGHT)
    await win.loadURL(fileUrl)

    await win.webContents.executeJavaScript(
      `document.querySelector('#deck .slide') ? true : (() => { throw new Error('No .slide sections found in #deck'); })()`,
      true
    )

    const slideCount = (await win.webContents.executeJavaScript(
      'document.querySelectorAll("#deck .slide").length',
      true
    )) as number

    if (!slideCount || slideCount <= 0) {
      throw new Error('No .slide sections found in #deck')
    }

    await win.webContents.executeJavaScript(enableGuizangLowPowerModeScript, true)
    await sleep(GUIZANG_LOW_POWER_SETTLE_MS)

    log.info('[export:guizang-pptx] start', { slideCount, imageOnly, deckTitle })

    for (let i = 0; i < slideCount; i += 1) {
      const pageId = `slide-${i + 1}`
      log.info('[export:guizang-pptx] extract slide', { pageId, index: i, mode: imageOnly ? 'image' : 'editable' })

      await win.webContents.executeJavaScript(buildGuizangSlideNavigationScript(i), true)
      await sleep(GUIZANG_ANIM_WAIT_MS)
      await win.webContents.executeJavaScript(FREEZE_PAGE_FOR_EXPORT_SCRIPT, true)
      await sleep(80)
      await win.webContents.executeJavaScript(FREEZE_PAGE_FOR_EXPORT_SCRIPT, true)

      const extracted = imageOnly
        ? await captureSlideFromBrowserWindow(win, {
            pageId,
            title: `${deckTitle} - ${i + 1}`
          })
        : await extractSlideFromBrowserWindow(win, {
            pageId,
            title: `${deckTitle} - ${i + 1}`
          })

      slides.push(extracted.slide)
      if (extracted.warning) warnings.push(extracted.warning)

      if (i < slideCount - 1) {
        await sleep(GUIZANG_SLIDE_GAP_MS)
      }
    }

    if (!imageOnly) {
      const slidesWithoutText = slides.filter((slide) => slide.texts.length === 0).length
      if (slidesWithoutText > 0) {
        warnings.push(`${slideCount} 页中有 ${slidesWithoutText} 页未提取到可编辑文本。`)
      }
    }

    const tmpPath = path.join(tmpDir, `export-${Date.now()}.pptx`)
    await writeHtmlToPptx(tmpPath, {
      title: deckTitle,
      author: 'OhMyPPT',
      slides
    })

    const buffer = await fs.readFile(tmpPath)
    await fs.unlink(tmpPath).catch(() => undefined)

    log.info('[export:guizang-pptx] completed', {
      slideCount,
      warningCount: warnings.length,
      imageOnly
    })

    return {
      buffer,
      warnings,
      slideCount,
      fileName
    }
  } finally {
    if (!win.isDestroyed()) {
      await win.destroy()
    }
    await fs.rm(tmpDir, { recursive: true, force: true }).catch(() => undefined)
  }
}
