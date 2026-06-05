/**
 * Slide Schema → PPTX (browser, PptxGenJS).
 * Preset slides expanded via layoutPresets.ts (data/ppt/pptxgenjs-skill).
 */
import PptxGenJS from 'pptxgenjs'
import { normalizeSchema } from './layoutPresets'

export interface SlideTheme {
  preset?: string
  primary?: string
  secondary?: string
  accent?: string
  bg_dark?: string
  bg_light?: string
  text_dark?: string
  text_light?: string
  font_heading?: string
  font_body?: string
}

export interface SlideSchema {
  meta: {
    title?: string
    author?: string
    language?: string
    layout?: string
    theme?: SlideTheme
  }
  slides: SlideData[]
}

export interface SlideData {
  type?: string
  bg_color?: string
  footer?: string
  notes?: string
  elements: SchemaElement[]
}

type SchemaElement = Record<string, unknown>

function renderStatRow(pres: PptxGenJS, slide: PptxGenJS.Slide, el: SchemaElement) {
  const stats = el.stats as { value: string; label: string }[]
  const x = el.x as number
  const y = el.y as number
  const w = el.w as number
  const h = el.h as number
  const gap = (el.gap as number) || 0.25
  const primary = (el.theme_primary as string) || '1E2761'
  const accent = (el.theme_accent as string) || 'F96167'
  const n = stats.length
  const boxW = (w - (n - 1) * gap) / n

  stats.forEach((stat, i) => {
    const bx = x + i * (boxW + gap)
    slide.addShape(pres.ShapeType.rect, {
      x: bx,
      y,
      w: boxW,
      h,
      fill: { color: i === 0 ? 'F0F4FF' : 'FFFFFF' },
      line: { color: i === 0 ? accent : 'E2E8F0', width: i === 0 ? 1.2 : 0.5 },
    })
    slide.addText(stat.value, {
      x: bx,
      y: y + 0.15,
      w: boxW,
      h: h * 0.55,
      fontSize: 34,
      bold: true,
      color: i === 0 ? accent : primary,
      align: 'center',
      valign: 'bottom',
    })
    slide.addText(stat.label, {
      x: bx + 0.1,
      y: y + h * 0.62,
      w: boxW - 0.2,
      h: h * 0.32,
      fontSize: 12,
      color: '666666',
      align: 'center',
      wrap: true,
    })
  })
}

function renderStatGroup(
  slide: PptxGenJS.Slide,
  el: SchemaElement,
  theme: SlideTheme,
) {
  const stats = el.stats as { value: string; label: string; color?: string }[]
  const x = el.x as number
  const y = el.y as number
  const w = el.w as number
  const h = el.h as number
  const itemH = h / stats.length
  stats.forEach((stat, i) => {
    const sy = y + i * itemH
    slide.addText(stat.value, {
      x,
      y: sy,
      w,
      h: itemH * 0.6,
      fontSize: 36,
      bold: true,
      color: stat.color || theme.primary,
      align: 'center',
      valign: 'bottom',
    })
    slide.addText(stat.label, {
      x,
      y: sy + itemH * 0.6,
      w,
      h: itemH * 0.35,
      fontSize: 13,
      color: '888888',
      align: 'center',
    })
  })
}

function renderCardGrid(
  pres: PptxGenJS,
  slide: PptxGenJS.Slide,
  el: SchemaElement,
  theme: SlideTheme,
) {
  const cards = el.cards as { title: string; body: string; icon?: string }[]
  const columns = (el.columns as number) || 2
  const x = el.x as number
  const y = el.y as number
  const w = el.w as number
  const h = el.h as number
  const cardFill = (el.card_fill as string) || 'FFFFFF'
  const titleColor = (el.title_color as string) || theme.primary
  const bodyColor = (el.body_color as string) || '555555'
  const rows = Math.ceil(cards.length / columns)
  const cardW = (w - (columns - 1) * 0.2) / columns
  const cardH = (h - (rows - 1) * 0.15) / rows

  for (let i = 0; i < cards.length; i++) {
    const card = cards[i]
    const col = i % columns
    const row = Math.floor(i / columns)
    const cx = x + col * (cardW + 0.2)
    const cy = y + row * (cardH + 0.15)

    slide.addShape(pres.ShapeType.rect, {
      x: cx,
      y: cy,
      w: cardW,
      h: cardH,
      fill: { color: cardFill },
      line: { color: 'E2E8F0', width: 0.5 },
    })

    slide.addText(card.title, {
      x: cx + 0.15,
      y: cy + 0.2,
      w: cardW - 0.3,
      h: 0.45,
      fontSize: 15,
      bold: true,
      color: titleColor,
      fontFace: theme.font_body || 'Calibri',
    })

    slide.addText(card.body, {
      x: cx + 0.15,
      y: cy + 0.7,
      w: cardW - 0.3,
      h: cardH - 0.85,
      fontSize: 12,
      color: bodyColor,
      fontFace: theme.font_body || 'Calibri',
      wrap: true,
      lineSpacingMultiple: 1.3,
    })
  }
}

function renderTimeline(pres: PptxGenJS, slide: PptxGenJS.Slide, el: SchemaElement, theme: SlideTheme) {
  const items = el.items as { date: string; title: string; description?: string; color?: string }[]
  const x = el.x as number
  const y = el.y as number
  const w = el.w as number
  const h = el.h as number
  const direction = (el.direction as string) || 'horizontal'
  const n = items.length

  if (direction === 'horizontal') {
    const stepW = w / n
    slide.addShape(pres.ShapeType.rect, {
      x: x + 0.2,
      y: y + h * 0.35,
      w: w - 0.4,
      h: 0.04,
      fill: { color: theme.secondary || 'CCCCCC' },
      line: { width: 0 },
    })
    items.forEach((item, i) => {
      const cx = x + i * stepW + stepW / 2
      slide.addShape(pres.ShapeType.ellipse, {
        x: cx - 0.15,
        y: y + h * 0.35 - 0.12,
        w: 0.3,
        h: 0.3,
        fill: { color: item.color || theme.primary },
        line: { width: 0 },
      })
      slide.addText(item.date, {
        x: x + i * stepW,
        y: y + h * 0.05,
        w: stepW,
        h: 0.35,
        fontSize: 11,
        bold: true,
        color: item.color || theme.primary,
        align: 'center',
      })
      slide.addText(item.title, {
        x: x + i * stepW + 0.05,
        y: y + h * 0.55,
        w: stepW - 0.1,
        h: 0.45,
        fontSize: 14,
        bold: true,
        color: theme.text_dark || '333333',
        align: 'center',
      })
      if (item.description) {
        slide.addText(item.description, {
          x: x + i * stepW + 0.05,
          y: y + h * 0.72,
          w: stepW - 0.1,
          h: 0.55,
          fontSize: 10,
          color: '666666',
          align: 'center',
          wrap: true,
        })
      }
    })
  } else {
    const stepH = h / n
    items.forEach((item, i) => {
      const cy = y + i * stepH
      slide.addShape(pres.ShapeType.rect, {
        x: x + 0.1,
        y: cy + 0.15,
        w: 0.08,
        h: stepH - 0.2,
        fill: { color: item.color || theme.primary },
        line: { width: 0 },
      })
      slide.addText(`${item.date} · ${item.title}`, {
        x: x + 0.35,
        y: cy + 0.1,
        w: w - 0.45,
        h: 0.35,
        fontSize: 14,
        bold: true,
        color: theme.text_dark || '333333',
      })
      if (item.description) {
        slide.addText(item.description, {
          x: x + 0.35,
          y: cy + 0.45,
          w: w - 0.45,
          h: stepH - 0.55,
          fontSize: 11,
          color: '666666',
          wrap: true,
        })
      }
    })
  }
}

function renderComparison(pres: PptxGenJS, slide: PptxGenJS.Slide, el: SchemaElement, theme: SlideTheme) {
  const columns = el.columns as { header: string; items: string[]; header_color?: string }[]
  const x = el.x as number
  const y = el.y as number
  const w = el.w as number
  const h = el.h as number
  const highlightColumn = el.highlight_column as number | undefined
  const colW = (w - (columns.length - 1) * 0.15) / columns.length

  columns.forEach((col, i) => {
    const cx = x + i * (colW + 0.15)
    const highlighted = i === highlightColumn
    slide.addShape(pres.ShapeType.rect, {
      x: cx,
      y,
      w: colW,
      h,
      fill: { color: highlighted ? 'F0F7FF' : 'FFFFFF' },
      line: {
        color: highlighted ? col.header_color || theme.primary : 'E2E8F0',
        width: highlighted ? 1.5 : 0.5,
      },
    })
    slide.addShape(pres.ShapeType.rect, {
      x: cx,
      y,
      w: colW,
      h: 0.55,
      fill: { color: col.header_color || theme.primary },
      line: { width: 0 },
    })
    slide.addText(col.header, {
      x: cx + 0.1,
      y: y + 0.08,
      w: colW - 0.2,
      h: 0.4,
      fontSize: 16,
      bold: true,
      color: 'FFFFFF',
      align: 'center',
    })
    const bulletItems = col.items.map((item, j) => ({
      text: item,
      options: {
        bullet: true,
        fontSize: 13,
        color: theme.text_dark || '333333',
        breakLine: j < col.items.length - 1,
        paraSpaceAfter: 6,
      },
    }))
    slide.addText(bulletItems, {
      x: cx + 0.15,
      y: y + 0.7,
      w: colW - 0.3,
      h: h - 0.85,
      fontFace: theme.font_body || 'Calibri',
    })
  })
}

function slideHasFooterElement(slideData: SlideData): boolean {
  return slideData.elements.some((el) => {
    const k = el.kind as string
    return k === 'text' && typeof el.y === 'number' && (el.y as number) > 5
  })
}

function renderFooter(slide: PptxGenJS.Slide, text: string, theme: SlideTheme) {
  slide.addText(text, {
    x: 0.4,
    y: 5.35,
    w: 9.2,
    h: 0.25,
    fontSize: 9,
    color: '999999',
    fontFace: theme.font_body || 'Calibri',
  })
}

function renderElement(pres: PptxGenJS, slide: PptxGenJS.Slide, el: SchemaElement, theme: SlideTheme) {
  const kind = el.kind as string
  switch (kind) {
    case 'text':
      slide.addText(el.text as string, {
        x: el.x as number,
        y: el.y as number,
        w: el.w as number,
        h: el.h as number,
        fontSize: (el.fontSize as number) || 18,
        fontFace: (el.fontFace as string) || theme.font_body || 'Calibri',
        color: (el.color as string) || theme.text_dark || '333333',
        bold: Boolean(el.bold),
        italic: Boolean(el.italic),
        align: (el.align as PptxGenJS.HAlign) || 'left',
        valign: (el.valign as PptxGenJS.VAlign) || 'top',
        margin: (el.margin as number) ?? 4,
        lineSpacingMultiple: el.lineSpacingMultiple as number | undefined,
        wrap: true,
      })
      break
    case 'bullets': {
      const items = el.items as string[]
      const bulletItems = items.map((item, i) => ({
        text: item,
        options: {
          bullet: true,
          fontSize: (el.fontSize as number) || 16,
          color: (el.color as string) || theme.text_dark || '333333',
          breakLine: i < items.length - 1,
          paraSpaceAfter: 8,
        },
      }))
      slide.addText(bulletItems, {
        x: el.x as number,
        y: el.y as number,
        w: el.w as number,
        h: el.h as number,
        fontFace: (el.fontFace as string) || theme.font_body || 'Calibri',
      })
      break
    }
    case 'shape': {
      const shapeName = String(el.shape || 'RECTANGLE').toLowerCase()
      const shapeType =
        shapeName === 'oval' || shapeName === 'ellipse'
          ? pres.ShapeType.ellipse
          : pres.ShapeType.rect
      slide.addShape(shapeType, {
        x: el.x as number,
        y: el.y as number,
        w: el.w as number,
        h: el.h as number,
        fill: { color: (el.fill as string) || 'CCCCCC' },
        line: el.stroke
          ? { color: el.stroke as string, width: (el.strokeWidth as number) || 1 }
          : { color: (el.fill as string) || 'CCCCCC', width: 0 },
        rectRadius: el.rectRadius as number | undefined,
      })
      break
    }
    case 'chart': {
      const data = el.data as { name: string; labels?: string[]; values: number[] }[]
      const labels = data[0]?.labels || data.map((s) => s.name)
      const chartData = data.map((series) => ({
        name: series.name,
        labels: series.labels || labels,
        values: series.values,
      }))
      const chartTypeKey = String(el.chartType || 'BAR').toUpperCase()
      const chartType =
        chartTypeKey === 'LINE'
          ? pres.ChartType.line
          : chartTypeKey === 'PIE'
            ? pres.ChartType.pie
            : pres.ChartType.bar
      slide.addChart(chartType, chartData, {
        x: el.x as number,
        y: el.y as number,
        w: el.w as number,
        h: el.h as number,
        barDir: (el.barDir as 'col' | 'bar') || 'col',
        chartColors: (el.chartColors as string[]) || [theme.primary, theme.secondary, theme.accent].filter(Boolean) as string[],
        chartArea: { fill: { color: 'FFFFFF' }, roundedCorners: true },
        catAxisLabelColor: '64748B',
        valAxisLabelColor: '64748B',
        valGridLine: { color: 'E2E8F0', size: 0.5 },
        catGridLine: { style: 'none' },
        showValue: el.showValue !== false,
        showLegend: Boolean(el.showLegend),
        legendPos: (el.legendPos as 'b' | 't' | 'l' | 'r') || 'b',
      })
      break
    }
    case 'card_grid':
      renderCardGrid(pres, slide, el, theme)
      break
    case 'stat_group':
      renderStatGroup(slide, el, theme)
      break
    case 'stat_row':
      renderStatRow(pres, slide, el)
      break
    case 'timeline':
      renderTimeline(pres, slide, el, theme)
      break
    case 'comparison':
      renderComparison(pres, slide, el, theme)
      break
    case 'image':
      slide.addImage({
        path: el.path as string | undefined,
        data: typeof el.url === 'string' && el.url.startsWith('data:') ? el.url : undefined,
        x: el.x as number,
        y: el.y as number,
        w: el.w as number,
        h: el.h as number,
      })
      break
    case 'icon':
    case 'icon_group':
      break
    default:
      console.warn('[renderPptx] unknown kind:', kind)
  }
}

function renderSlideElements(
  pres: PptxGenJS,
  slide: PptxGenJS.Slide,
  slideData: SlideData,
  theme: SlideTheme,
) {
  for (const el of slideData.elements) {
    renderElement(pres, slide, el, theme)
  }
}

/** Build PPTX blob from slide schema JSON string */
export async function buildPptxBlob(schemaJson: string): Promise<Blob> {
  const parsed = JSON.parse(schemaJson) as SlideSchema
  const schema = normalizeSchema(parsed)
  if (!schema.slides?.length) {
    throw new Error('Slide schema has no slides')
  }

  const pres = new PptxGenJS()
  const theme: SlideTheme = schema.meta?.theme || {}
  pres.layout = schema.meta?.layout || 'LAYOUT_16x9'
  pres.title = schema.meta?.title || 'Presentation'
  pres.author = schema.meta?.author || 'OSINT Tools'

  for (const slideData of schema.slides) {
    const slide = pres.addSlide()
    slide.background = { color: slideData.bg_color || 'FFFFFF' }
    if (slideData.notes) slide.addNotes(slideData.notes)
    renderSlideElements(pres, slide, slideData, theme)
    const footerText = slideData.footer
    if (footerText && !slideHasFooterElement(slideData)) {
      renderFooter(slide, footerText, theme)
    }
  }

  const out = await pres.write({ outputType: 'blob' })
  if (!(out instanceof Blob)) {
    throw new Error('Unexpected pptx output type')
  }
  return out
}

export async function downloadPptxFromSchema(schemaJson: string, filename: string): Promise<void> {
  const blob = await buildPptxBlob(schemaJson)
  const safeName = filename.endsWith('.pptx') ? filename : `${filename}.pptx`
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = safeName
  a.click()
  URL.revokeObjectURL(url)
}
