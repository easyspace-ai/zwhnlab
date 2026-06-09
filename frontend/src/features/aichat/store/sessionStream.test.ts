import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { connectSessionStream } from './sessionStream'

type MockES = {
  url: string
  onerror: (() => void) | null
  listeners: Map<string, (msg: { data: string }) => void>
  close: ReturnType<typeof vi.fn>
  addEventListener: (type: string, fn: (msg: { data: string }) => void) => void
}

let instances: MockES[] = []

class MockEventSource {
  url: string
  onerror: (() => void) | null = null
  listeners = new Map<string, (msg: { data: string }) => void>()
  close = vi.fn()

  constructor(url: string) {
    this.url = url
    instances.push(this)
  }

  addEventListener(type: string, fn: (msg: { data: string }) => void) {
    this.listeners.set(type, fn)
  }
}

beforeEach(() => {
  vi.useFakeTimers()
  instances = []
  vi.stubGlobal('EventSource', MockEventSource)
})

afterEach(() => {
  vi.useRealTimers()
  vi.unstubAllGlobals()
})

describe('connectSessionStream', () => {
  it('reconnects after error with initial 1s backoff', () => {
    const disconnect = connectSessionStream('s1', () => 0, vi.fn())

    expect(instances).toHaveLength(1)
    instances[0].onerror?.()

    vi.advanceTimersByTime(999)
    expect(instances).toHaveLength(1)

    vi.advanceTimersByTime(1)
    expect(instances).toHaveLength(2)

    disconnect()
  })

  it('uses updated fromSeq on reconnect', () => {
    let fromSeq = 5
    const disconnect = connectSessionStream('s1', () => fromSeq, vi.fn())

    instances[0].onerror?.()
    fromSeq = 10
    vi.advanceTimersByTime(1000)

    expect(instances[1].url).toContain('fromSeq=10')
    disconnect()
  })

  it('does not reconnect after disconnect', () => {
    const disconnect = connectSessionStream('s1', () => 0, vi.fn())
    disconnect()
    instances[0].onerror?.()
    vi.advanceTimersByTime(30_000)
    expect(instances).toHaveLength(1)
  })

  it('resets backoff after successful event_appended', () => {
    const onEvent = vi.fn()
    const disconnect = connectSessionStream('s1', () => 0, onEvent)

    instances[0].onerror?.()
    vi.advanceTimersByTime(1000)
    expect(instances).toHaveLength(2)

    instances[1].listeners.get('event_appended')?.({
      data: JSON.stringify({ seq: 1, type: 'round_started', at: 1 }),
    })
    expect(onEvent).toHaveBeenCalledOnce()

    instances[1].onerror?.()
    vi.advanceTimersByTime(999)
    expect(instances).toHaveLength(2)
    vi.advanceTimersByTime(1)
    expect(instances).toHaveLength(3)

    disconnect()
  })

  it('ignores onerror from superseded EventSource after reconnect', () => {
    const disconnect = connectSessionStream('s1', () => 0, vi.fn())

    expect(instances).toHaveLength(1)
    const first = instances[0]
    first.onerror?.()
    vi.advanceTimersByTime(1000)
    expect(instances).toHaveLength(2)

    // Stale handler from the first connection must not close the live one.
    first.onerror?.()
    vi.advanceTimersByTime(30_000)
    expect(instances).toHaveLength(2)

    disconnect()
  })

  it('doubles backoff on consecutive errors', () => {
    const disconnect = connectSessionStream('s1', () => 0, vi.fn())

    instances[0].onerror?.()
    vi.advanceTimersByTime(1000)
    expect(instances).toHaveLength(2)

    instances[1].onerror?.()
    vi.advanceTimersByTime(1999)
    expect(instances).toHaveLength(2)
    vi.advanceTimersByTime(1)
    expect(instances).toHaveLength(3)

    disconnect()
  })
})
