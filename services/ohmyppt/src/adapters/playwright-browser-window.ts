/**
 * Playwright-backed BrowserWindow for headless html-pptx export (editable PPTX).
 */
import { chromium, type Browser, type Page } from 'playwright'
import log from 'electron-log/main.js'

export const PPTX_CAPTURE_WIDTH = 1600
export const PPTX_CAPTURE_HEIGHT = 900

type CaptureRect = { x: number; y: number; width: number; height: number }

type NativeImageLike = {
  toPNG: () => Buffer
  toBitmap: () => Buffer
  getSize: () => { width: number; height: number }
}

type ConsoleListener = (...args: unknown[]) => void

let sharedBrowser: Browser | null = null
let browserLaunch: Promise<Browser> | null = null

const PLAYWRIGHT_BROWSER_HINT =
  'Playwright Chromium is missing. Run: cd services/ohmyppt && npm run playwright:install'

const PLAYWRIGHT_SYSTEM_DEPS_HINT =
  'Playwright Chromium needs Linux system libraries. As root in services/ohmyppt run:\n' +
  '  npx playwright install-deps chromium\n' +
  'Or on Debian/Ubuntu: apt install libatk-bridge2.0-0 libnss3 libgbm1 libxkbcommon0 …\n' +
  'Diagnose missing .so: ldd $(find ~/.cache/ms-playwright -name chrome-headless-shell -type f | head -1) | grep "not found"'

const launchSharedBrowser = async (): Promise<Browser> => {
  try {
    return await chromium.launch({
      headless: true,
      args: [
        '--font-render-hinting=none',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--no-sandbox'
      ]
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    if (/Executable doesn't exist|playwright install/i.test(message)) {
      throw new Error(`${PLAYWRIGHT_BROWSER_HINT}\n\nOriginal: ${message}`)
    }
    if (/error while loading shared libraries|libatk-bridge|cannot open shared object/i.test(message)) {
      throw new Error(`${PLAYWRIGHT_SYSTEM_DEPS_HINT}\n\nOriginal: ${message}`)
    }
    throw error
  }
}

async function getSharedBrowser(): Promise<Browser> {
  if (sharedBrowser?.isConnected()) return sharedBrowser
  sharedBrowser = null
  if (!browserLaunch) {
    browserLaunch = launchSharedBrowser()
  }
  try {
    sharedBrowser = await browserLaunch
    sharedBrowser.on('disconnected', () => {
      log.warn('[playwright] shared browser disconnected')
      sharedBrowser = null
      browserLaunch = null
    })
    return sharedBrowser
  } finally {
    browserLaunch = null
  }
}

export async function resetSharedPlaywrightBrowser(): Promise<void> {
  if (browserLaunch) {
    try {
      const pending = await browserLaunch
      await pending.close().catch(() => undefined)
    } catch {
      // ignore launch failure while resetting
    }
    browserLaunch = null
  }
  if (sharedBrowser) {
    await sharedBrowser.close().catch(() => undefined)
    sharedBrowser = null
  }
}

function buildNativeImage(pngBuffer: Buffer, width: number, height: number): NativeImageLike {
  return {
    toPNG: () => pngBuffer,
    toBitmap: () => {
      // Residue detection falls back safely when bitmap is undersized.
      return Buffer.alloc(Math.max(0, width * height * 4))
    },
    getSize: () => ({ width, height })
  }
}

class PlaywrightWebContents {
  private page: Page | null = null
  private consoleListeners = new Set<ConsoleListener>()
  private consoleBridgeAttached = false

  constructor(private owner: PlaywrightBrowserWindow) {}

  setPage(page: Page | null): void {
    this.page = page
    this.consoleBridgeAttached = false
    if (page) {
      page.on('crash', () => {
        log.warn('[playwright] page crashed')
      })
      page.on('close', () => {
        if (this.page === page) this.page = null
      })
      this.ensureConsoleBridge()
    }
  }

  private ensureConsoleBridge(): void {
    if (!this.page || this.consoleBridgeAttached) return
    this.page.on('console', (msg) => {
      const text = msg.text()
      for (const listener of this.consoleListeners) {
        listener({}, '', text)
      }
    })
    this.consoleBridgeAttached = true
  }

  setZoomFactor(_factor: number): void {}

  on(event: string, listener: ConsoleListener): void {
    if (event === 'console-message') {
      this.consoleListeners.add(listener)
    }
  }

  removeListener(event: string, listener: ConsoleListener): void {
    if (event === 'console-message') {
      this.consoleListeners.delete(listener)
    }
  }

  isDestroyed(): boolean {
    return !this.page || this.page.isClosed()
  }

  send(): void {}
  stop(): void {}
  setAudioMuted(_muted: boolean): void {}

  async executeJavaScript(script: string, _userGesture?: boolean): Promise<unknown> {
    const page = this.page
    if (!page || page.isClosed()) {
      throw new Error('Playwright page is not ready')
    }
    this.ensureConsoleBridge()
    try {
      return await page.evaluate((source) => {
        // eslint-disable-next-line no-eval
        return eval(source)
      }, script)
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      if (/closed|crashed|Target page/i.test(message)) {
        this.page = null
        this.owner.invalidatePage()
      }
      throw error
    }
  }

  async capturePage(rect?: CaptureRect): Promise<NativeImageLike> {
    const page = this.page
    if (!page) throw new Error('Playwright page is not ready')

    const clip = rect
      ? {
          x: Math.max(0, rect.x),
          y: Math.max(0, rect.y),
          width: Math.max(1, rect.width),
          height: Math.max(1, rect.height)
        }
      : { x: 0, y: 0, width: PPTX_CAPTURE_WIDTH, height: PPTX_CAPTURE_HEIGHT }

    const pngBuffer = await page.screenshot({
      type: 'png',
      clip,
      animations: 'disabled',
      caret: 'hide'
    })

    return buildNativeImage(Buffer.from(pngBuffer), clip.width, clip.height)
  }
}

export class PlaywrightBrowserWindow {
  id = Math.floor(Math.random() * 1_000_000)
  webContents = new PlaywrightWebContents(this)
  private destroyed = false
  private page: Page | null = null

  static getAllWindows(): PlaywrightBrowserWindow[] {
    return []
  }

  static fromWebContents(): PlaywrightBrowserWindow | null {
    return null
  }

  static getFocusedWindow(): PlaywrightBrowserWindow | null {
    return null
  }

  invalidatePage(): void {
    this.page = null
    this.webContents.setPage(null)
  }

  private async ensurePage(): Promise<Page> {
    if (this.destroyed) throw new Error('BrowserWindow destroyed')
    const browser = await getSharedBrowser()
    if (!this.page || this.page.isClosed()) {
      const context = await browser.newContext({
        viewport: { width: PPTX_CAPTURE_WIDTH, height: PPTX_CAPTURE_HEIGHT },
        deviceScaleFactor: 1
      })
      this.page = await context.newPage()
      this.webContents.setPage(this.page)
    }
    return this.page
  }

  async loadURL(url: string): Promise<void> {
    const page = await this.ensurePage()
    log.info('[playwright] loadURL', { url: url.slice(0, 120) })
    await page.goto(url, { waitUntil: 'load', timeout: 120_000 })
    // Heavy deck pages may still be laying out after load; give runtime a beat.
    await page.waitForTimeout(250)
  }

  setContentSize(width: number, height: number): void {
    void this.page?.setViewportSize({ width, height })
  }

  close(): void {
    void this.destroy()
  }

  async destroy(): Promise<void> {
    if (this.destroyed) return
    this.destroyed = true
    try {
      const context = this.page?.context()
      await this.page?.close().catch(() => undefined)
      await context?.close().catch(() => undefined)
    } finally {
      this.page = null
      this.webContents.setPage(null)
    }
  }

  isDestroyed(): boolean {
    return this.destroyed
  }

  on(): void {}
  removeListener(): void {}
  show(): void {}
  hide(): void {}
  focus(): void {}
  restore(): void {}
  isMinimized(): boolean {
    return false
  }
  isVisible(): boolean {
    return false
  }
}

export async function closeSharedPlaywrightBrowser(): Promise<void> {
  await resetSharedPlaywrightBrowser()
}
