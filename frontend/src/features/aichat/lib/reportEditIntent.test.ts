import { describe, expect, it } from 'vitest'
import { isReportEditIntent, resolveFollowUpRoute } from './reportEditIntent'

describe('isReportEditIntent', () => {
  it('rejects general follow-up questions', () => {
    expect(isReportEditIntent('在中国有哪些数字游民的聚集地')).toBe(false)
    expect(isReportEditIntent('数字游民聚集地有哪些')).toBe(false)
  })

  it('rejects content questions that mention 风格 without edit verbs', () => {
    expect(isReportEditIntent('这个风格怎么样')).toBe(false)
    expect(isReportEditIntent('介绍一下聚集地的布局特点')).toBe(false)
  })

  it('accepts explicit layout edit instructions', () => {
    expect(isReportEditIntent('把标题改成更大')).toBe(true)
    expect(isReportEditIntent('调整报告布局')).toBe(true)
    expect(isReportEditIntent('改版式，章节间距加大')).toBe(true)
  })
})

describe('resolveFollowUpRoute', () => {
  const htmlId = 'artifact-html'
  const mdId = 'artifact-md'
  const targets = { htmlResourceId: htmlId, mdResourceId: mdId }

  it('routes to deepseek when report context is disabled', () => {
    expect(resolveFollowUpRoute('它说了什么', false, targets)).toEqual({ kind: 'deepseek' })
    expect(resolveFollowUpRoute('在中国有哪些数字游民的聚集地', false, targets)).toEqual({
      kind: 'deepseek',
    })
  })

  it('routes any question to discuss with markdown when context is enabled', () => {
    expect(resolveFollowUpRoute('它说了什么', true, targets)).toEqual({
      kind: 'discuss',
      target_resource_id: mdId,
    })
    expect(resolveFollowUpRoute('在中国有哪些数字游民的聚集地', true, targets)).toEqual({
      kind: 'discuss',
      target_resource_id: mdId,
    })
  })

  it('routes explicit layout edits to edit_html with selected html resource', () => {
    expect(resolveFollowUpRoute('调整报告布局，标题居中', true, targets)).toEqual({
      kind: 'discuss',
      mode: 'edit_html',
      target_resource_id: htmlId,
    })
  })

  it('falls back to discuss without target when markdown id missing', () => {
    expect(
      resolveFollowUpRoute('总结一下', true, { htmlResourceId: htmlId }),
    ).toEqual({ kind: 'discuss' })
  })

  it('routes to deepseek when context disabled even with targets', () => {
    expect(resolveFollowUpRoute('你好', false)).toEqual({ kind: 'deepseek' })
  })
})
