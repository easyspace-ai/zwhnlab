import { stripW6Prefix } from './w6Message'

export const AUTO_SESSION_TITLES = new Set(['', '新研究', '新对话', '调研主题'])

export function isAutoSessionTitle(title: string | undefined | null): boolean {
  return AUTO_SESSION_TITLES.has((title ?? '').trim())
}

export function truncateSessionTitle(text: string, maxLen = 30): string {
  const trimmed = text.trim()
  if (!trimmed) return ''
  const chars = [...trimmed]
  if (chars.length <= maxLen) return trimmed
  return `${chars.slice(0, maxLen - 1).join('')}…`
}

/** Derive sidebar title from a W6 user message, form topic, or skill name. */
export function deriveW6SessionTitle(input: string): string {
  const stripped = stripW6Prefix(input.trim())
  const topic =
    stripped
      .replace(/^执行[：:]\s*/u, '')
      .replace(/^补充信息\s*/u, '')
      .split(/\r?\n/)[0]
      ?.trim() || stripped
  return truncateSessionTitle(topic)
}

export function deriveSessionTitleFromFormData(
  formData: Record<string, unknown>,
  fallback?: string,
): string {
  for (const key of ['topic', 'target', 'subject', 'query', 'title', 'claim']) {
    const raw = formData[key]
    if (raw == null) continue
    const value = String(raw).trim()
    if (value && value !== 'undefined') {
      return truncateSessionTitle(value)
    }
  }
  return fallback ? truncateSessionTitle(fallback) : ''
}
