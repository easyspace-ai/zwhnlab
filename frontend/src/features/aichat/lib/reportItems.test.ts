import { describe, expect, it } from 'vitest'
import {
  resolveActivePreviewTargets,
  resolveSessionReports,
  type SessionReportItem,
} from './reportItems'
import type { DashboardReportItem } from '@/features/osint-dashboard/types'

function item(id: string, kind: DashboardReportItem['kind'] = 'html'): DashboardReportItem {
  return {
    id,
    resourceId: id,
    url: `/api/artifacts/${id}/preview`,
    title: '报告',
    timestamp: 1,
    kind,
  }
}

function sessionItem(
  id: string,
  kind: DashboardReportItem['kind'],
  roundId?: string,
  timestamp = 0,
): SessionReportItem {
  return { ...item(id, kind), roundId, timestamp }
}

describe('resolveSessionReports', () => {
  it('prefers timeline events over API duplicates', () => {
    const eventItems = [item('canonical-html')]
    const apiItems = [item('dup-1'), item('dup-2'), item('dup-3')]
    expect(resolveSessionReports(eventItems, apiItems)).toEqual(eventItems)
  })

  it('falls back to API when timeline has no reports', () => {
    const apiItems = [item('api-html')]
    expect(resolveSessionReports([], apiItems)).toEqual(apiItems)
  })
})

describe('resolveActivePreviewTargets', () => {
  it('pairs html and markdown by roundId', () => {
    const reports = [
      sessionItem('html-old', 'html', 'round-1', 0),
      sessionItem('md-old', 'markdown', 'round-1', 1000),
      sessionItem('html-new', 'html', 'round-2', 2000),
      sessionItem('md-new', 'markdown', 'round-2', 3000),
    ]
    expect(resolveActivePreviewTargets(reports[0], reports)).toEqual({
      htmlResourceId: 'html-old',
      mdResourceId: 'md-old',
    })
    expect(resolveActivePreviewTargets(reports[3], reports)).toEqual({
      htmlResourceId: 'html-new',
      mdResourceId: 'md-new',
    })
  })

  it('uses selected html for edit_html and paired md for discuss', () => {
    const reports = [
      sessionItem('html-a', 'html', 'round-a', 0),
      sessionItem('md-a', 'markdown', 'round-a', 1000),
    ]
    const active = reports[0]
    expect(resolveActivePreviewTargets(active, reports)).toEqual({
      htmlResourceId: 'html-a',
      mdResourceId: 'md-a',
    })
  })
})
