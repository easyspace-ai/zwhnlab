/** Prefix shown in chat when the next action runs W6 deep research. */
export const W6_CHAT_PREFIX = '@w6 '

export function isW6PrefixedMessage(text: string): boolean {
  const t = text.trimStart()
  return t.startsWith('@w6 ') || t.toLowerCase().startsWith('@w6 ')
}

/** Strip leading `@w6` tag before sending to W6 runner APIs. */
export function stripW6Prefix(text: string): string {
  const t = text.trimStart()
  if (!t.toLowerCase().startsWith('@w6')) return text.trim()
  const rest = t.slice(3).trimStart()
  return rest.trim()
}

export function formatW6UserBubble(body: string): string {
  const trimmed = body.trimStart()
  if (trimmed.toLowerCase().startsWith('@w6')) return trimmed
  return `${W6_CHAT_PREFIX}${body}`
}

export function buildW6FormSummary(formData: Record<string, unknown>): string {
  return Object.entries(formData)
    .filter(([, v]) => v !== undefined && v !== null && String(v).trim() !== '')
    .map(([k, v]) => {
      if (Array.isArray(v)) return `${k}: ${v.join(', ')}`
      return `${k}: ${String(v)}`
    })
    .join('\n')
}

export function buildW6StartUserContent(
  skillName: string,
  formData: Record<string, unknown>,
): string {
  const summary = buildW6FormSummary(formData)
  return formatW6UserBubble(`执行：${skillName}${summary ? `\n${summary}` : ''}`)
}

/** Normalize W6 user bubbles: strip `@w6` tag and sort param lines for dedup. */
export function normalizeW6UserContent(content: string): string {
  const body = stripW6Prefix(content.trim())
  const lines = body.split('\n').map((line) => line.trim()).filter(Boolean)
  if (lines.length <= 1) return body
  const header = lines[0]
  const params = lines.slice(1).sort()
  return [header, ...params].join('\n')
}

export function isSameW6UserContent(a: string, b: string): boolean {
  return normalizeW6UserContent(a) === normalizeW6UserContent(b)
}
