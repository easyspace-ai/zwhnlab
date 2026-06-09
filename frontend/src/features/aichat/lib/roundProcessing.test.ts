import { describe, expect, it } from 'vitest'
import { isAssistantRoundAwaitingText, resolveRoundProcessingLabel } from './roundProcessing'
import type { RoundView } from '../engine/types'

function round(partial: Partial<RoundView> & Pick<RoundView, 'kind'>): RoundView {
  return {
    id: 'r1',
    topic: 't',
    anchorText: '',
    anchorKind: 'user',
    sealed: false,
    ...partial,
  }
}

describe('roundProcessing', () => {
  it('detects unsealed discuss round without assistant text', () => {
    const r = round({ kind: 'discuss', anchorText: '报告里提到了什么', anchorKind: 'discuss' })
    expect(isAssistantRoundAwaitingText(r)).toBe(true)
  })

  it('hides when assistant text arrives', () => {
    const r = round({ kind: 'discuss', assistantText: '根据报告…' })
    expect(isAssistantRoundAwaitingText(r)).toBe(false)
  })

  it('hides for sealed or W6 rounds', () => {
    expect(isAssistantRoundAwaitingText(round({ kind: 'deepseek', sealed: true }))).toBe(false)
    expect(
      isAssistantRoundAwaitingText(
        round({ kind: 'w6_manual', w6: { status: 'running', logs: [], progress: 0, lastLine: '' } }),
      ),
    ).toBe(false)
  })

  it('uses edit_html copy for layout edit intents', () => {
    const r = round({ kind: 'discuss', anchorText: '把 html 的背景色改成黄色', anchorKind: 'discuss' })
    expect(resolveRoundProcessingLabel(r)).toBe('改版式中…')
  })

  it('uses discuss copy for report Q&A', () => {
    const r = round({ kind: 'discuss', anchorText: '报告结论是什么', anchorKind: 'discuss' })
    expect(resolveRoundProcessingLabel(r)).toBe('分析报告中…')
  })

  it('uses thinking copy for deepseek', () => {
    const r = round({ kind: 'deepseek', anchorText: '你好' })
    expect(resolveRoundProcessingLabel(r)).toBe('思考中…')
  })
})
