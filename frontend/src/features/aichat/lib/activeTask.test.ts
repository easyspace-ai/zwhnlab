import { describe, expect, it } from 'vitest'
import { resolveActiveTask } from './activeTask'
import type { ProjectedTimeline } from '../engine/types'

describe('resolveActiveTask', () => {
  it('detects running W6', () => {
    const projected: ProjectedTimeline = {
      rounds: [
        {
          id: 'r1',
          kind: 'w6_manual',
          topic: 't',
          anchorText: '@w6 t',
          anchorKind: 'user',
          sealed: false,
          w6: { status: 'running', logs: [], progress: 10, lastLine: 'go' },
        },
      ],
      activeRoundId: 'r1',
      sessionTitle: '',
      reports: [],
      nextSeq: 2,
    }
    expect(resolveActiveTask(projected)).toEqual({ kind: 'w6', roundId: 'r1' })
  })

  it('detects streaming deepseek', () => {
    const projected: ProjectedTimeline = {
      rounds: [
        {
          id: 'r1',
          kind: 'deepseek',
          topic: 't',
          anchorText: 'hi',
          anchorKind: 'user',
          sealed: false,
          assistantText: 'partial…',
        },
      ],
      activeRoundId: 'r1',
      sessionTitle: '',
      reports: [],
      nextSeq: 5,
    }
    expect(resolveActiveTask(projected)).toEqual({ kind: 'deepseek', roundId: 'r1' })
  })

  it('detects streaming discuss', () => {
    const projected: ProjectedTimeline = {
      rounds: [
        {
          id: 'r2',
          kind: 'discuss',
          topic: 't',
          anchorText: 'follow up',
          anchorKind: 'discuss',
          sealed: false,
          assistantText: 'analyzing…',
        },
      ],
      activeRoundId: 'r2',
      sessionTitle: '',
      reports: [],
      nextSeq: 8,
    }
    expect(resolveActiveTask(projected)).toEqual({ kind: 'discuss', roundId: 'r2' })
  })

  it('returns null when round sealed', () => {
    const projected: ProjectedTimeline = {
      rounds: [
        {
          id: 'r1',
          kind: 'deepseek',
          topic: 't',
          anchorText: 'hi',
          anchorKind: 'user',
          sealed: true,
          assistantText: 'ok',
        },
      ],
      activeRoundId: null,
      sessionTitle: '',
      reports: [],
      nextSeq: 3,
    }
    expect(resolveActiveTask(projected)).toEqual({ kind: null, roundId: null })
  })
})
