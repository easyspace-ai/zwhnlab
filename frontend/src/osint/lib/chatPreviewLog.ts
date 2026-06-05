const PREFIX = '[ChatPreview]'

export type ChatPreviewPhase =
  | 'open'
  | 'detect_type'
  | 'load_local'
  | 'load_server'
  | 'load_done'
  | 'load_error'
  | 'load_timeout'
  | 'fallback_download'
  | 'cache_hit'
  | 'cache_miss'
  | 'cache_store'
  | 'cache_invalid_refetch'

export function chatPreviewLog(
  phase: ChatPreviewPhase,
  message: string,
  data?: Record<string, unknown>,
  level: 'log' | 'warn' | 'error' = 'log',
): void {
  const fn = level === 'error' ? console.error : level === 'warn' ? console.warn : console.log
  if (data && Object.keys(data).length > 0) {
    fn(`${PREFIX} ${phase}: ${message}`, data)
  } else {
    fn(`${PREFIX} ${phase}: ${message}`)
  }
}

export function isLocalPreviewId(id: string): boolean {
  return id.startsWith('local-')
}
