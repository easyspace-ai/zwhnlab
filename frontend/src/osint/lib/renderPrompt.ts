/**
 * Handlebars 模板渲染（纯前端，不依赖后端）
 * @see https://handlebarsjs.com/zh/guide/
 */
import Handlebars from 'handlebars'

let helpersReady = false

export function formatPromptValue(val: unknown): string {
  if (val === null || val === undefined) return ''
  if (typeof val === 'string') return val
  if (typeof val === 'number') {
    return Number.isInteger(val) ? String(val) : String(val)
  }
  if (typeof val === 'boolean') return val ? '是' : '否'
  if (Array.isArray(val)) {
    return val.map((item) => formatPromptValue(item)).join(', ')
  }
  try {
    return JSON.stringify(val)
  } catch {
    return String(val)
  }
}

function prepareContext(data: Record<string, unknown>): Record<string, string> {
  const ctx: Record<string, string> = {}
  for (const [key, val] of Object.entries(data)) {
    ctx[key] = formatPromptValue(val)
  }
  return ctx
}

function ensureHelpers() {
  if (helpersReady) return
  Handlebars.registerHelper('eq', (a: unknown, b: unknown) => a === b)
  helpersReady = true
}

export function renderPrompt(template: string, data: Record<string, unknown>): string {
  ensureHelpers()
  const compile = Handlebars.compile(template, { noEscape: true, strict: false })
  return compile(prepareContext(data))
}
