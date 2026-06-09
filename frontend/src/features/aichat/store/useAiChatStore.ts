import { create } from 'zustand'
import { projectTimeline } from '../engine/sessionProjector'
import type { ProjectedTimeline, SessionEvent } from '../engine/types'
import { fetchTimeline } from '../api/aichatApi'

type AiChatState = {
  sessionId: string | null
  events: SessionEvent[]
  projected: ProjectedTimeline
  loading: boolean
  loadingEarlier: boolean
  hasMore: boolean
  oldestSeq: number
  error: string | null
  setSessionId: (id: string | null) => void
  reset: () => void
  loadTimeline: (sessionId: string, opts?: { silent?: boolean }) => Promise<void>
  loadEarlierTimeline: (sessionId: string) => Promise<void>
  applyEvent: (ev: SessionEvent) => void
  setEvents: (events: SessionEvent[], activeRoundId?: string | null, nextSeq?: number) => void
}

const emptyProjected = (): ProjectedTimeline => ({
  entries: [],
  rounds: [],
  activeRoundId: null,
  sessionTitle: '',
  reports: [],
  nextSeq: 1,
})

function mergeEvents(existing: SessionEvent[], incoming: SessionEvent[]): SessionEvent[] {
  const bySeq = new Map<number, SessionEvent>()
  for (const ev of existing) bySeq.set(ev.seq, ev)
  for (const ev of incoming) bySeq.set(ev.seq, ev)
  return [...bySeq.values()].sort((a, b) => a.seq - b.seq)
}

export const useAiChatStore = create<AiChatState>((set, get) => ({
  sessionId: null,
  events: [],
  projected: emptyProjected(),
  loading: false,
  loadingEarlier: false,
  hasMore: false,
  oldestSeq: 0,
  error: null,

  setSessionId: (id) => set({ sessionId: id }),

  reset: () =>
    set({
      sessionId: null,
      events: [],
      projected: emptyProjected(),
      loading: false,
      loadingEarlier: false,
      hasMore: false,
      oldestSeq: 0,
      error: null,
    }),

  setEvents: (events, activeRoundId = null, nextSeq = 1) => {
    set({
      events,
      projected: projectTimeline(events, activeRoundId, nextSeq),
    })
  },

  applyEvent: (ev) => {
    const { events, projected, sessionId } = get()
    if (events.some((e) => e.seq === ev.seq)) return
    const expectedSeq = projected.nextSeq
    if (expectedSeq > 1 && ev.seq > expectedSeq) {
      if (sessionId) {
        void get().loadTimeline(sessionId, { silent: true })
      }
      return
    }
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

  loadTimeline: async (sessionId, opts) => {
    const silent = opts?.silent === true
    set((state) => ({
      loading: silent ? state.loading : true,
      error: null,
      sessionId,
    }))
    try {
      const res = await fetchTimeline(sessionId)
      const events = Array.isArray(res.events) ? res.events : []
      set((state) => ({
        events,
        projected: projectTimeline(events, res.active_round_id, res.next_seq),
        hasMore: res.has_more === true,
        oldestSeq: res.oldest_seq ?? 0,
        loading: silent ? state.loading : false,
      }))
    } catch (e) {
      set((state) => ({
        loading: silent ? state.loading : false,
        error: e instanceof Error ? e.message : '加载失败',
      }))
    }
  },

  loadEarlierTimeline: async (sessionId) => {
    const { oldestSeq, loadingEarlier, hasMore } = get()
    if (!hasMore || loadingEarlier || oldestSeq <= 0) return
    set({ loadingEarlier: true, error: null })
    try {
      const res = await fetchTimeline(sessionId, { beforeSeq: oldestSeq })
      const incoming = Array.isArray(res.events) ? res.events : []
      set((state) => ({
        events: mergeEvents(state.events, incoming),
        projected: projectTimeline(
          mergeEvents(state.events, incoming),
          res.active_round_id,
          res.next_seq,
        ),
        hasMore: res.has_more === true,
        oldestSeq: res.oldest_seq ?? state.oldestSeq,
        loadingEarlier: false,
      }))
    } catch (e) {
      set({
        loadingEarlier: false,
        error: e instanceof Error ? e.message : '加载失败',
      })
    }
  },
}))
