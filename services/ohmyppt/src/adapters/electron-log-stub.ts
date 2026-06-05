type LogFn = (message: string, meta?: Record<string, unknown>) => void

const wrap =
  (level: 'info' | 'warn' | 'error' | 'debug'): LogFn =>
  (message, meta) => {
    const line = meta ? `${message} ${JSON.stringify(meta)}` : message
    console[level](`[ohmyppt] ${line}`)
  }

const logger = {
  info: wrap('info'),
  warn: wrap('warn'),
  error: wrap('error'),
  debug: wrap('debug')
}

export default logger
