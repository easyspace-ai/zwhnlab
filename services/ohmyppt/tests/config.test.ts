import { describe, expect, it } from 'vitest'
import {
  buildPptxContentDisposition,
  buildZipContentDisposition
} from '../src/server/export-headers.js'
import { normalizeOpenAiBaseUrl } from '../src/server/load-env.js'

describe('export-headers', () => {
  it('builds ascii-safe zip Content-Disposition with utf8 filename*', () => {
    const header = buildZipContentDisposition('AI 中转站分析', 'sess-1')
    expect(header).toContain('filename="')
    expect(header).toContain('filename*=UTF-8')
    expect(header).toContain('.zip')
    expect(header).not.toMatch(/[\u4e00-\u9fff]/)
  })

  it('builds ascii-safe pptx Content-Disposition with utf8 filename*', () => {
    const header = buildPptxContentDisposition('AI 中转站分析', 'sess-1')
    expect(header).toContain('filename="')
    expect(header).toContain('filename*=UTF-8')
    expect(header).toContain('.pptx')
    expect(header).not.toMatch(/[\u4e00-\u9fff]/)
  })
})

describe('normalizeOpenAiBaseUrl', () => {
  it('appends /v1 when missing', () => {
    expect(normalizeOpenAiBaseUrl('https://api.deepseek.com')).toBe(
      'https://api.deepseek.com/v1'
    )
  })

  it('preserves existing /v1 suffix', () => {
    expect(normalizeOpenAiBaseUrl('https://api.deepseek.com/v1/')).toBe(
      'https://api.deepseek.com/v1'
    )
  })
})
