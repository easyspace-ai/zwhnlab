import { describe, expect, it } from 'vitest'
import { renderPrompt } from './renderPrompt'

describe('renderPrompt (Handlebars)', () => {
  it('native Handlebars eq subexpression', () => {
    const out = renderPrompt(
      '{{#if (eq output_format "brief")}}BRIEF{{/if}}{{#if (eq output_format "report")}}REPORT{{/if}}',
      { output_format: 'brief' }
    )
    expect(out).toContain('BRIEF')
    expect(out).not.toContain('REPORT')
  })

  it('if omits empty fields', () => {
    const out = renderPrompt('{{#if purpose}}P:{{purpose}}{{/if}}', { purpose: '' })
    expect(out).not.toContain('P:')
  })

  it('replaces variables and joins arrays', () => {
    const out = renderPrompt('T:{{topic}} S:{{tags}}', {
      topic: 'hello',
      tags: ['a', 'b'],
    })
    expect(out).toBe('T:hello S:a, b')
  })
})
