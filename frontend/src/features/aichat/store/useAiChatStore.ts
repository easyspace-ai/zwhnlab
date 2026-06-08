import { create } from 'zustand'
import { projectTimeline } from '../engine/sessionProjector'
import type { ProjectedTimeline, SessionEvent } from '../engine/types'
import { fetchTimeline } from '../api/aichatApi'

type AiChatState = {
  sessionId: string | null
  events: SessionEvent[]
  projected: ProjectedTimeline
  loading: boolean
  error: string | null
  setSessionId: (id: string | null) => void
  reset: () => void
  loadTimeline: (sessionId: string) => Promise<void>
  applyEvent: (ev: SessionEvent) => void
  setEvents: (events: SessionEvent[], activeRoundId?: string | null, nextSeq?: number) => void
}

const emptyProjected = (): ProjectedTimeline => ({
  rounds: [],
  activeRoundId: null,
  sessionTitle: '',
  reports: [],
  nextSeq: 1,
})

export const useAiChatStore = create<AiChatState>((set, get) => ({
  sessionId: null,
  events: [],
  projected: emptyProjected(),
  loading: false,
  error: null,

  setSessionId: (id) => set({ sessionId: id }),

  reset: () =>
    set({
      events: [],
      projected: emptyProjected(),
      loading: false,
      error: null,
    }),

  setEvents: (events, activeRoundId = null, nextSeq = 1) => {
    set({
      events,
      projected: projectTimeline(events, activeRoundId, nextSeq),
    })
  },

  applyEvent: (ev) => {
    const { events, projected } = get()
    if (events.some((e) => e.seq === ev.seq)) return
    const next = [...events, ev].sort((a, b) => a.seq - b.seq)
    const activeRoundId =
      ev.type === 'round_started'
        ? ev.round_id ?? projected.activeRoundId
        : ev.type === 'round_sealed' && ev.round_id === projected.activeRoundId
          ? null
          : projected.activeRoundId
    set({
      events: next,
      projected: projectTimeline(next, activeRoundId, Math.max(projected.nextSeq, ev.seq + 1)),
    })
  },

  loadTimeline: async (sessionId) => {
    set({ loading: true, error: null, sessionId })
    try {
      const res = await fetchTimeline(sessionId, 0)
      set({
        events: res.events,
        projected: projectTimeline(res.events, res.active_round_id, res.next_seq),
        loading: false,
      })
    } catch (e) {
      set({
        loading: false,
        error: e instanceof Error ? e.message : '加载失败',
      })
    }
  },
}))
