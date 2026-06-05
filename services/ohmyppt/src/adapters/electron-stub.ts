/**
 * Minimal Electron stub for headless oh-my-ppt imports.
 * BrowserWindow uses Playwright for html-pptx export.
 */
import path from 'node:path'
import { PlaywrightBrowserWindow } from './playwright-browser-window.js'

const userData =
  process.env.OHMYPPT_DATA_DIR?.trim() ||
  path.resolve(process.cwd(), 'data')

export const app = {
  getPath(name: string): string {
    if (name === 'userData') return userData
    if (name === 'home') return process.env.HOME || process.cwd()
    if (name === 'temp') return process.env.TMPDIR || '/tmp'
    return userData
  },
  getName(): string {
    return 'ohmyppt-headless'
  },
  isReady(): boolean {
    return true
  },
  requestSingleInstanceLock(): boolean {
    return true
  },
  quit(): void {},
  on(): void {},
  whenReady(): Promise<void> {
    return Promise.resolve()
  }
}

export class BrowserWindow extends PlaywrightBrowserWindow {}

export const safeStorage = {
  isEncryptionAvailable(): boolean {
    return false
  },
  encryptString(value: string): Buffer {
    return Buffer.from(value, 'utf-8')
  },
  decryptString(buffer: Buffer): string {
    return buffer.toString('utf-8')
  }
}

export const ipcMain = {
  handle(): void {},
  on(): void {}
}

export const shell = {
  async openExternal(_url: string): Promise<void> {}
}

export const dialog = {
  async showOpenDialog(): Promise<{ canceled: true; filePaths: [] }> {
    return { canceled: true, filePaths: [] }
  },
  async showSaveDialog(): Promise<{ canceled: true; filePath: undefined }> {
    return { canceled: true, filePath: undefined }
  }
}

export const protocol = {
  registerFileProtocol(): void {},
  registerSchemesAsPrivileged(): void {}
}

export const screen = {
  getPrimaryDisplay(): { workAreaSize: { width: number; height: number } } {
    return { workAreaSize: { width: 1600, height: 900 } }
  }
}

export type IpcMainInvokeEvent = Record<string, never>
export type WebContents = BrowserWindow['webContents']
export type OpenDialogOptions = Record<string, unknown>
export type NativeImage = {
  toPNG: () => Buffer
  toBitmap: () => Buffer
  getSize: () => { width: number; height: number }
}
