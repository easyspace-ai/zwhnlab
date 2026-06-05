/**
 * Guizang HTML → PPTX via Playwright viewport screenshots.
 * Preserves WebGL, typography, layout — image-based slides (not editable text).
 *
 * Run: npm --prefix frontend/server/ppthtml-export run start
 * Port: PPTHTML_EXPORT_PORT (default 6125)
 */
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import { chromium } from 'playwright'
import PptxGenJS from 'pptxgenjs'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const WIDTH = 1920
const HEIGHT = 1080
const ANIM_WAIT_MS = 1200
const SLIDE_GAP_MS = 300
const PORT = Number(process.env.PPTHTML_EXPORT_PORT || 6125)

const app = new Hono().basePath('/api/ppthtml/export')

app.get('/health', (c) => c.json({ status: 'ok' }))

async function exportHtmlToPptx(html: string, title: string): Promise<Uint8Array> {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'ppthtml-'))
  const htmlPath = path.join(tmpDir, 'deck.html')
  fs.writeFileSync(htmlPath, html, 'utf8')
  const fileUrl = `file://${htmlPath}`

  const browser = await chromium.launch({ headless: true })
  try {
    const context = await browser.newContext({
      viewport: { width: WIDTH, height: HEIGHT },
      deviceScaleFactor: 2,
    })
    const page = await context.newPage()
    await page.goto(fileUrl, { waitUntil: 'networkidle', timeout: 60000 })

    await page.waitForSelector('#deck .slide', { timeout: 15000 })
    const total = await page.evaluate(() => document.querySelectorAll('#deck .slide').length)
    if (total === 0) throw new Error('No .slide sections found in #deck')

    await page.evaluate(() => {
      if (typeof (window as unknown as { __setLowPowerMode?: (v: boolean, o?: { persist?: boolean }) => void }).__setLowPowerMode === 'function') {
        ;(window as unknown as { __setLowPowerMode: (v: boolean, o?: { persist?: boolean }) => void }).__setLowPowerMode(true, { persist: false })
      } else {
        document.body.classList.add('low-power')
      }
    })
    await page.waitForTimeout(400)

    const pptx = new PptxGenJS()
    pptx.layout = 'LAYOUT_16x9'
    pptx.title = title

    for (let i = 0; i < total; i++) {
      await page.evaluate((n) => {
        const deck = document.getElementById('deck')
        if (!deck) return
        const slides = deck.querySelectorAll('.slide')
        slides.forEach((s, idx) => {
          ;(s as HTMLElement).style.transform = idx === n ? 'none' : ''
        })
        deck.style.transform = `translateX(${-n * 100}vw)`
        ;(window as unknown as { __currentSlideIndex?: number }).__currentSlideIndex = n
        const el = slides[n] as HTMLElement | undefined
        const isDark = el?.classList.contains('dark') || el?.classList.contains('accent')
        document.body.classList.toggle('dark-bg', Boolean(isDark))
        const playSlide = (window as unknown as { __playSlide?: (idx: number) => void }).__playSlide
        if (playSlide) playSlide(n)
        document.querySelectorAll('#nav .dot').forEach((d, idx) => {
          d.classList.toggle('active', idx === n)
        })
      }, i)

      await page.waitForTimeout(ANIM_WAIT_MS)

      const buffer = await page.screenshot({
        type: 'png',
        fullPage: false,
        animations: 'disabled',
      })

      const slide = pptx.addSlide()
      slide.background = { color: 'FAFAF8' }
      slide.addImage({
        data: `image/png;base64,${buffer.toString('base64')}`,
        x: 0,
        y: 0,
        w: '100%',
        h: '100%',
      })

      await page.waitForTimeout(SLIDE_GAP_MS)
    }

    const out = await pptx.write({ outputType: 'uint8array' })
    if (!(out instanceof Uint8Array)) {
      throw new Error('Unexpected pptx output type')
    }
    return out
  } finally {
    await browser.close()
    fs.rmSync(tmpDir, { recursive: true, force: true })
  }
}

app.post(
  '/download',
  zValidator(
    'json',
    z.object({
      html: z.string().min(1),
      filename: z.string().optional(),
    }),
  ),
  async (c) => {
    const { html, filename } = c.req.valid('json')
    try {
      const safeName = (filename || 'deck.pptx').replace(/[^\w.\-一-龥]/g, '_')
      const title = safeName.replace(/\.pptx$/i, '')
      const buffer = await exportHtmlToPptx(html, title)
      c.header('Content-Type', 'application/vnd.openxmlformats-officedocument.presentationml.presentation')
      c.header('Content-Disposition', `attachment; filename="${safeName.endsWith('.pptx') ? safeName : `${safeName}.pptx`}"`)
      return c.body(buffer)
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Export failed'
      return c.json({ detail: message }, 500)
    }
  },
)

serve({ fetch: app.fetch, port: PORT }, () => {
  console.log(`[ppthtml-export] listening on http://127.0.0.1:${PORT}`)
})
