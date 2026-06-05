/**
 * Expands layout_preset + slots → elements[] using layout-presets.json regions.
 */
import layoutData from '../assets/layout-presets.json'
import type { SlideData, SlideTheme } from './renderPptx'
import { resolveTheme } from './themePresets'

type RegionDef = Record<string, unknown>
type PresetDef = {
  description?: string
  bg_color?: string
  regions: Record<string, RegionDef>
}

const presets = layoutData.presets as Record<string, PresetDef>

export type RawSlide = {
  layout_preset?: string
  slots?: Record<string, unknown>
  bg_color?: string
  footer?: string
  notes?: string
  elements?: Record<string, unknown>[]
  type?: string
}

function colorToken(value: unknown, theme: SlideTheme): string {
  const s = String(value ?? '')
  if (!s) return theme.text_dark || '333333'
  const token = s.toLowerCase()
  const map: Record<string, string | undefined> = {
    primary: theme.primary,
    secondary: theme.secondary,
    accent: theme.accent,
    bg_dark: theme.bg_dark,
    bg_light: theme.bg_light,
    text_dark: theme.text_dark,
    text_light: theme.text_light,
  }
  if (map[token]) return map[token]!
  return s.replace(/^#/, '')
}

function slotText(slots: Record<string, unknown>, key: string): string {
  const v = slots[key]
  return typeof v === 'string' ? v : ''
}

export function expandSlide(raw: RawSlide, themeIn: SlideTheme): SlideData {
  if (raw.elements?.length && !raw.layout_preset) {
    return {
      type: raw.type,
      bg_color: raw.bg_color,
      footer: raw.footer,
      notes: raw.notes,
      elements: raw.elements,
    }
  }

  const presetId = raw.layout_preset
  if (!presetId || !presets[presetId]) {
    throw new Error(`Unknown layout_preset: ${presetId || '(missing)'}`)
  }

  const theme = resolveTheme(themeIn.preset, themeIn)
  const preset = presets[presetId]
  const slots = raw.slots || {}
  const elements: Record<string, unknown>[] = []

  let bg = raw.bg_color
  if (!bg && preset.bg_color) {
    bg = colorToken(preset.bg_color, theme)
  }
  if (!bg) {
    bg = theme.bg_light || 'FFFFFF'
  }

  for (const [regionKey, region] of Object.entries(preset.regions)) {
    const kind = (region.kind as string) || inferKind(regionKey, region)
    const x = region.x as number
    const y = region.y as number
    const w = region.w as number
    const h = region.h as number

    if (kind === 'shape') {
      const fillKey = (region.fill as string) || 'primary'
      elements.push({
        kind: 'shape',
        shape: 'RECTANGLE',
        x,
        y,
        w,
        h,
        fill: colorToken(fillKey, theme),
        rectRadius: region.rectRadius,
      })
      continue
    }

    if (kind === 'bullets') {
      const items = slots.bullets as string[] | undefined
      if (!items?.length) continue
      elements.push({
        kind: 'bullets',
        items,
        x,
        y,
        w,
        h,
        fontSize: region.fontSize || 16,
        color: colorToken(region.color || 'text_dark', theme),
      })
      continue
    }

    if (kind === 'card_grid') {
      const cards = slots.cards as { title: string; body: string }[] | undefined
      if (!cards?.length) continue
      elements.push({
        kind: 'card_grid',
        cards,
        columns: (region.columns as number) || 3,
        x,
        y,
        w,
        h,
        card_fill: 'FFFFFF',
        title_color: theme.primary,
        body_color: '555555',
      })
      continue
    }

    if (kind === 'stat_group') {
      const stats = slots.stats as { value: string; label: string; color?: string }[] | undefined
      if (!stats?.length) continue
      elements.push({
        kind: 'stat_group',
        stats: stats.map((s, i) => ({
          ...s,
          color: s.color || (i === 0 ? theme.accent : theme.primary),
        })),
        x,
        y,
        w,
        h,
      })
      continue
    }

    if (kind === 'stat_row') {
      const stats = slots.stats as { value: string; label: string }[] | undefined
      if (!stats?.length) continue
      elements.push({
        kind: 'stat_row',
        stats,
        x,
        y,
        w,
        h,
        gap: (region.gap as number) || 0.25,
        theme_primary: theme.primary,
        theme_accent: theme.accent,
      })
      continue
    }

    if (kind === 'chart') {
      const chart = slots.chart as Record<string, unknown> | undefined
      if (!chart) continue
      elements.push({
        kind: 'chart',
        chartType: chart.chartType || 'BAR',
        data: chart.data,
        x,
        y,
        w,
        h,
        chartColors: [theme.primary, theme.secondary, theme.accent].filter(Boolean),
      })
      continue
    }

    if (kind === 'comparison') {
      const columns = slots.columns as {
        header: string
        items: string[]
        header_color?: string
      }[] | undefined
      if (!columns?.length) continue
      elements.push({
        kind: 'comparison',
        columns: columns.map((c) => ({
          ...c,
          header_color: c.header_color || theme.primary,
        })),
        highlight_column: slots.highlight_column,
        x,
        y,
        w,
        h,
      })
      continue
    }

    if (kind === 'timeline') {
      const items = slots.items as {
        date: string
        title: string
        description?: string
        color?: string
      }[] | undefined
      if (!items?.length) continue
      elements.push({
        kind: 'timeline',
        items,
        direction: region.direction || 'horizontal',
        x,
        y,
        w,
        h,
      })
      continue
    }

    // text regions — map region key to slot keys
    const text = textForRegion(regionKey, slots)
    if (!text) continue
    elements.push({
      kind: 'text',
      text,
      x,
      y,
      w,
      h,
      fontSize: region.fontSize || 18,
      bold: region.bold,
      italic: region.italic,
      align: region.align || 'left',
      valign: region.valign || 'top',
      color: colorToken(region.color || 'text_dark', theme),
      fontFace: theme.font_body,
    })
  }

  const footer = raw.footer || slotText(slots, 'footer')
  return {
    type: raw.type,
    bg_color: bg,
    footer: footer || undefined,
    notes: raw.notes,
    elements,
  }
}

function inferKind(regionKey: string, region: RegionDef): string {
  if (regionKey.includes('bullet')) return 'bullets'
  if (regionKey.includes('chart')) return 'chart'
  if (regionKey.includes('comparison')) return 'comparison'
  if (regionKey.includes('timeline')) return 'timeline'
  if (regionKey.includes('stat_row')) return 'stat_row'
  if (regionKey.includes('card_grid')) return 'card_grid'
  if (region.kind === 'shape' || regionKey.includes('bar') || regionKey.includes('panel') || regionKey.includes('rule')) {
    return 'shape'
  }
  return 'text'
}

function textForRegion(regionKey: string, slots: Record<string, unknown>): string {
  const map: Record<string, string[]> = {
    title: ['title'],
    subtitle: ['subtitle'],
    footer: ['footer'],
    headline: ['headline', 'title'],
    kicker: ['kicker'],
    contact: ['contact'],
    cta: ['cta'],
    quote: ['quote'],
    attribution: ['attribution'],
  }
  for (const key of map[regionKey] || [regionKey]) {
    const v = slots[key]
    if (typeof v === 'string' && v.trim()) return v
  }
  return ''
}

export function normalizeSchema(raw: { meta?: { theme?: SlideTheme }; slides?: RawSlide[] }): {
  meta: { theme?: SlideTheme; title?: string; author?: string; layout?: string; language?: string }
  slides: SlideData[]
} {
  const theme = resolveTheme(raw.meta?.theme?.preset, raw.meta?.theme)
  const slides = (raw.slides || []).map((s) => expandSlide(s, theme))
  return {
    meta: { ...raw.meta, theme },
    slides,
  }
}
