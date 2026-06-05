declare module 'electron' {
  export const app: {
    getPath(name: string): string
    getName(): string
    isReady(): boolean
    requestSingleInstanceLock(): boolean
    quit(): void
    on(event: string, listener: (...args: unknown[]) => void): void
    whenReady(): Promise<void>
  }
  export class BrowserWindow {
    constructor(_options?: Record<string, unknown>)
    id: number
    webContents: {
      executeJavaScript(script: string, userGesture?: boolean): Promise<unknown>
      capturePage(rect?: { x: number; y: number; width: number; height: number }): Promise<NativeImage>
      setZoomFactor(factor: number): void
      on(event: string, listener: (...args: unknown[]) => void): void
      removeListener(event: string, listener: (...args: unknown[]) => void): void
      isDestroyed(): boolean
      send(channel: string, ...args: unknown[]): void
      stop(): void
      setAudioMuted(muted: boolean): void
    }
    static getAllWindows(): BrowserWindow[]
    loadURL(url: string): Promise<void>
    close(): void
    destroy(): void
    isDestroyed(): boolean
    isVisible(): boolean
    on(event: string, listener: (...args: unknown[]) => void): void
    removeListener(event: string, listener: (...args: unknown[]) => void): void
    show(): void
    hide(): void
    focus(): void
    restore(): void
    isMinimized(): boolean
    setContentSize(width: number, height: number): void
  }
  export const safeStorage: {
    isEncryptionAvailable(): boolean
    encryptString(value: string): Buffer
    decryptString(buffer: Buffer): string
  }
  export const ipcMain: { handle: (...args: unknown[]) => void; on: (...args: unknown[]) => void }
  export const shell: { openExternal(url: string): Promise<void> }
  export const dialog: {
    showOpenDialog(options?: unknown): Promise<{ canceled: boolean; filePaths: string[] }>
    showSaveDialog(options?: unknown): Promise<{ canceled: boolean; filePath?: string }>
  }
  export const protocol: {
    registerFileProtocol: (...args: unknown[]) => void
    registerSchemesAsPrivileged: (...args: unknown[]) => void
  }
  export const screen: {
    getPrimaryDisplay(): { workAreaSize: { width: number; height: number } }
  }
  export type IpcMainInvokeEvent = Record<string, never>
  export type WebContents = BrowserWindow['webContents']
  export type OpenDialogOptions = Record<string, unknown>
  export type NativeImage = {
    toPNG: () => Buffer
    toBitmap: () => Buffer
    getSize: () => { width: number; height: number }
  }
}

declare module 'electron-log/main.js' {
  interface LogFn {
    (message: string, meta?: Record<string, unknown>): void
  }
  interface Logger {
    info: LogFn
    warn: LogFn
    error: LogFn
    debug: LogFn
    transports: { file: { level: string; maxSize: number; format: string; resolvePathFn?: () => string } }
  }
  const log: Logger
  export default log
}

declare module '@electron-toolkit/utils' {
  export const is: { dev: boolean; prod: boolean }
  export const optimizer: { watchWindowShortcuts: (win: unknown) => void }
  export const electronApp: { setAppUserModelId: (id: string) => void }
}

declare namespace Electron {
  type IpcMainInvokeEvent = Record<string, never>
}

declare namespace NodeJS {
  interface Process {
    resourcesPath?: string
  }
}
