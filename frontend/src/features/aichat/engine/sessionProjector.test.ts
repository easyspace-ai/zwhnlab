import { describe, expect, it } from 'vitest'
import { countRunningW6, projectTimeline } from './sessionProjector'
import type { SessionEvent } from './types'

/** Test matrix T1–T8 from AIChat greenfield plan (projection layer). */

describe('sessionProjector', () => {
  // T1: pure DeepSeek — 0 w6 panels
  it('T1: deepseek round has no w6 panel', () => {
    const events: SessionEvent[] = [
      { seq: 1, type: 'round_started', round_id: 'r1', at: 1, kind: 'deepseek', topic: 'hello' },
      { seq: 2, type: 'assistant_delta', round_id: 'r1', at: 2, delta: 'Hi there' },
    ]
    const tl = projectTimeline(events, 'r1', 3)
    expect(tl.rounds).toHaveLength(1)
    expect(tl.rounds[0].w6).toBeUndefined()
    expect(tl.rounds[0].assistantText).toBe('Hi there')
    expect(countRunningW6(tl)).toBe(0)
  })

  // T2: single form W6 — 1 form + 1 w6 + followUps same roundId
  it('T2: single W6 form round with follow-ups after seal', () => {
    const events: SessionEvent[] = [
      { seq: 1, type: 'form_submitted', round_id: 'r1', at: 1, body: '汝阳产业' },
      { seq: 2, type: 'round_started', round_id: 'r1', at: 2, kind: 'w6_form', topic: '汝阳产业' },
      { seq: 3, type: 'w6_status', round_id: 'r1', at: 3, status: 'running' },
      { seq: 4, type: 'w6_log', round_id: 'r1', at: 4, log_type: 'token', body: 'collecting...', progress: 50 },
      { seq: 5, type: 'w6_status', round_id: 'r1', at: 5, status: 'done' },
      { seq: 6, type: 'round_sealed', round_id: 'r1', at: 6, reason: 'terminal' },
      { seq: 7, type: 'follow_ups', round_id: 'r1', at: 7, questions: ['Q1'] },
    ]
    const tl = projectTimeline(events, null, 8)
    expect(tl.rounds).toHaveLength(1)
    expect(tl.rounds[0].anchorKind).toBe('form')
    expect(tl.rounds[0].w6).toBeDefined()
    expect(tl.rounds[0].guidedTopics).toEqual(['Q1'])
    expect(tl.rounds[0].sealed).toBe(true)
    expect(countRunningW6(tl)).toBe(0)
  })

  // T3: two W6 rounds — second running has no followUps on first
  it('T3: two W6 rounds independently', () => {
    const events: SessionEvent[] = [
      { seq: 1, type: 'round_started', round_id: 'r1', at: 1, kind: 'w6_form', topic: 'A' },
      { seq: 2, type: 'round_sealed', round_id: 'r1', at: 2 },
      { seq: 3, type: 'follow_ups', round_id: 'r1', at: 3, questions: ['old'] },
      { seq: 4, type: 'round_started', round_id: 'r2', at: 4, kind: 'w6_form', topic: 'B' },
      { seq: 5, type: 'w6_status', round_id: 'r2', at: 5, status: 'running' },
    ]
    const tl = projectTimeline(events, 'r2', 6)
    expect(tl.rounds).toHaveLength(2)
    expect(tl.rounds[0].sealed).toBe(true)
    expect(tl.rounds[0].guidedTopics).toEqual(['old'])
    expect(tl.rounds[1].w6?.status).toBe('running')
    expect(tl.rounds[1].guidedTopics).toBeUndefined()
    expect(countRunningW6(tl)).toBe(1)
  })

  // T4: timeline replay is deterministic
  it('T4: replay produces identical projection', () => {
    const events: SessionEvent[] = [
      { seq: 1, type: 'round_started', round_id: 'r1', at: 1, kind: 'w6_manual', body: '@w6 test' },
      { seq: 2, type: 'round_sealed', round_id: 'r1', at: 2 },
    ]
    const a = projectTimeline(events, null, 3)
    const b = projectTimeline(events, null, 3)
    expect(a).toEqual(b)
  })

  // T5: @w6 manual — single anchor, no duplicate user bubble from form
  it('T5: w6_manual has single user anchor', () => {
    const events: SessionEvent[] = [
      { seq: 1, type: 'round_started', round_id: 'r1', at: 1, kind: 'w6_manual', body: '@w6 调研主题' },
      { seq: 2, type: 'w6_status', round_id: 'r1', at: 2, status: 'running' },
    ]
    const tl = projectTimeline(events, 'r1', 3)
    expect(tl.rounds).toHaveLength(1)
    expect(tl.rounds[0].anchorKind).toBe('user')
    expect(tl.rounds[0].anchorText).toBe('@w6 调研主题')
    expect(tl.rounds.filter((r) => r.anchorKind === 'user')).toHaveLength(1)
  })

  // T6: session isolation is store responsibility; projector only sees one event set
  it('T6: unrelated roundIds do not merge', () => {
    const sessionA: SessionEvent[] = [
      { seq: 1, type: 'round_started', round_id: 'sa-r1', at: 1, kind: 'deepseek', body: 'A' },
    ]
    const sessionB: SessionEvent[] = [
      { seq: 1, type: 'round_started', round_id: 'sb-r1', at: 1, kind: 'deepseek', body: 'B' },
    ]
    expect(projectTimeline(sessionA, null, 2).rounds[0].anchorText).toBe('A')
    expect(projectTimeline(sessionB, null, 2).rounds[0].anchorText).toBe('B')
  })

  // T7: idle seal marks round sealed
  it('T7: round_sealed after idle stops w6 running state', () => {
    const events: SessionEvent[] = [
      { seq: 1, type: 'round_started', round_id: 'r1', at: 1, kind: 'w6_form' },
      { seq: 2, type: 'w6_status', round_id: 'r1', at: 2, status: 'running' },
      { seq: 3, type: 'round_sealed', round_id: 'r1', at: 3, reason: 'idle_15s' },
    ]
    const tl = projectTimeline(events, null, 4)
    expect(tl.rounds[0].sealed).toBe(true)
    expect(tl.rounds[0].w6?.status).toBe('done')
    expect(countRunningW6(tl)).toBe(0)
  })

  // T8: migrated legacy events still project rounds
  it('T8: legacy-style event sequence projects browsable rounds', () => {
    const events: SessionEvent[] = [
      { seq: 1, type: 'session_title', at: 1, title: '旧会话标题' },
      { seq: 2, type: 'round_started', round_id: 'legacy-1', at: 2, kind: 'w6_form', topic: '历史任务' },
      { seq: 3, type: 'report_ready', round_id: 'legacy-1', at: 3, html_id: 'res-1', title: '报告' },
      { seq: 4, type: 'round_sealed', round_id: 'legacy-1', at: 4 },
    ]
    const tl = projectTimeline(events, null, 5)
    expect(tl.sessionTitle).toBe('旧会话标题')
    expect(tl.rounds).toHaveLength(1)
    expect(tl.reports).toHaveLength(1)
    expect(tl.reports[0].resourceId).toBe('res-1')
  })
})
