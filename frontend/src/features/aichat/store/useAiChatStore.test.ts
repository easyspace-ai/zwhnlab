import { describe, expect, it, vi, beforeEach } from 'vitest'
import { useAiChatStore } from './useAiChatStore'
import type { SessionEvent } from '../engine/types'

vi.mock('../api/aichatApi', () => ({
  fetchTimeline: vi.fn().mockResolvedValue({
    events: [],
    active_round_id: null,
    next_seq: 1,
    has_more: false,
  }),
}))

describe('useAiChatStore loadTimeline', () => {
  beforeEach(() => {
    useAiChatStore.getState().reset()
  })

  it('treats null events as empty array for new sessions', async () => {
    const { fetchTimeline } = await import('../api/aichatApi')
    vi.mocked(fetchTimeline).mockResolvedValueOnce({
      events: null as unknown as SessionEvent[],
      active_round_id: null,
      next_seq: 1,
      has_more: false,
    })
    await useAiChatStore.getState().loadTimeline('new-session')
    expect(useAiChatStore.getState().error).toBeNull()
    expect(useAiChatStore.getState().events).toEqual([])
    expect(useAiChatStore.getState().projected.rounds).toEqual([])
  })
})

describe('useAiChatStore applyEvent seq gap', () => {
  beforeEach(() => {
    useAiChatStore.getState().reset()
  })

  it('triggers silent reload when seq skips ahead', async () => {
    const { fetchTimeline } = await import('../api/aichatApi')
    useAiChatStore.getState().setSessionId('s1')
    useAiChatStore.getState().setEvents(
      [{ seq: 1, type: 'round_started', round_id: 'r1', at: 1 } as SessionEvent],
      'r1',
      2,
    )

    useAiChatStore.getState().applyEvent({
      seq: 5,
      type: 'assistant_delta',
      round_id: 'r1',
      delta: 'hi',
      at: 2,
    } as SessionEvent)

    expect(useAiChatStore.getState().events).toHaveLength(1)
    expect(fetchTimeline).toHaveBeenCalledWith('s1')
  })
})
