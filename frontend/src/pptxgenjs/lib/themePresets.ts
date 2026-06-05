import themeData from '../assets/theme-presets.json'
import type { SlideTheme } from './renderPptx'

export interface ThemePresetMeta {
  label: string
  preset: string
  primary: string
  secondary: string
  accent: string
  bg_dark: string
  bg_light: string
  text_dark: string
  text_light: string
  font_heading: string
  font_body: string
  decor?: string
}

const themes = themeData.themes as Record<string, ThemePresetMeta>

export const THEME_OPTIONS = Object.entries(themes).map(([value, t]) => ({
  value,
  label: t.label,
}))

export function resolveTheme(presetKey?: string, overrides?: SlideTheme): SlideTheme {
  const key = presetKey || overrides?.preset || 'midnight-exec'
  const base = themes[key] || themes['midnight-exec']
  return { ...base, ...overrides, preset: key }
}

export function themeForOutline(outlineTheme?: string): SlideTheme {
  return resolveTheme(outlineTheme)
}
