import { stripW6Prefix } from './w6Message'

export const AUTO_SESSION_TITLES = new Set(['', '新会话', '新研究', '新对话', '调研主题'])

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

const FORM_TITLE_KEYS = [
  'topic',
  'target',
  'subject',
  'query',
  'title',
  'claim',
  '主题',
  '调研主题',
  '关注领域',
  '核查对象',
  '研究主题',
  'domain',
  'focus',
  'field',
  'theme',
]

const SKIP_FORM_VALUE_KEYS = new Set(['report_style', 'skill_key', 'skill_id', 'draft_id'])

export function deriveSessionTitleFromFormData(
  formData: Record<string, unknown>,
  fallback?: string,
): string {
  for (const key of FORM_TITLE_KEYS) {
    const raw = formData[key]
    if (raw == null) continue
    const value = String(raw).trim()
    if (value && value !== 'undefined') {
      return truncateSessionTitle(value)
    }
  }
  for (const [key, raw] of Object.entries(formData).sort(([a], [b]) => a.localeCompare(b))) {
    if (SKIP_FORM_VALUE_KEYS.has(key) || raw == null) continue
    const value = String(raw).trim()
    if (value.length >= 2 && value !== 'undefined') {
      return truncateSessionTitle(value)
    }
  }
  return fallback ? truncateSessionTitle(fallback) : ''
}

const ANCHOR_TITLE_PREFIXES = ['主题:', '主题：', 'topic:', 'topic：', '调研主题:', '调研主题：']

export function titleFromFormAnchor(anchor: string): string {
  for (const line of anchor.split(/\r?\n/)) {
    const trimmed = line.trim()
    for (const prefix of ANCHOR_TITLE_PREFIXES) {
      if (trimmed.startsWith(prefix)) {
        const value = trimmed.slice(prefix.length).trim()
        if (value) return truncateSessionTitle(value)
      }
    }
  }
  return ''
}

export function resolveSessionTitleFromProjected(options: {
  sessionTitle?: string
  rounds: Array<{ topic?: string; anchorText?: string; anchorKind?: string }>
}): string {
  const fromEvent = options.sessionTitle?.trim()
  if (fromEvent && !isAutoSessionTitle(fromEvent)) return fromEvent
  for (let i = options.rounds.length - 1; i >= 0; i--) {
    const round = options.rounds[i]
    if (round.anchorKind === 'form' && round.anchorText) {
      const fromAnchor = titleFromFormAnchor(round.anchorText)
      if (fromAnchor) return fromAnchor
    }
    const topic = round.topic?.trim()
    if (topic && !isAutoSessionTitle(topic)) return truncateSessionTitle(topic)
  }
  return fromEvent || '新会话'
}
