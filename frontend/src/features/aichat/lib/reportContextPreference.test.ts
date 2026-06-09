import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  clearDismissedReportId,
  isReportContextEnabled,
  loadDismissedReportId,
  saveDismissedReportId,
} from './reportContextPreference'

const store = new Map<string, string>()

beforeEach(() => {
  store.clear()
  vi.stubGlobal('sessionStorage', {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => {
      store.set(key, value)
    },
    removeItem: (key: string) => {
      store.delete(key)
    },
  })
})

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('reportContextPreference', () => {
  it('defaults context on until dismissed for active report', () => {
    expect(isReportContextEnabled('s1', 'r1', null)).toBe(true)
    saveDismissedReportId('s1', 'r1')
    expect(loadDismissedReportId('s1')).toBe('r1')
    expect(isReportContextEnabled('s1', 'r1', 'r1')).toBe(false)
    expect(isReportContextEnabled('s1', 'r2', 'r1')).toBe(true)
  })

  it('clears dismiss on re-enable', () => {
    saveDismissedReportId('s1', 'r1')
    clearDismissedReportId('s1')
    expect(loadDismissedReportId('s1')).toBeNull()
    expect(isReportContextEnabled('s1', 'r1', null)).toBe(true)
  })
})
