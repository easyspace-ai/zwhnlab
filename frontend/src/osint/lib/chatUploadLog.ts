const PREFIX = '[ChatUpload]'

export type ChatUploadPhase =
  | 'file_selected'
  | 'validation'
  | 'attachment_state'
  | 'upload_start'
  | 'upload_progress'
  | 'upload_success'
  | 'upload_failure'
  | 'send_message'

export function chatUploadLog(
  phase: ChatUploadPhase,
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

export function chatUploadGroup<T>(
  label: string,
  meta: Record<string, unknown>,
  fn: () => Promise<T>,
): Promise<T> {
  console.groupCollapsed(`${PREFIX} ${label}`, meta)
  return fn().finally(() => console.groupEnd())
}
