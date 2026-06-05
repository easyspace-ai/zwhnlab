/** Image-based Guizang HTML → PPTX export via Playwright bridge */

import { getOsintAccessToken } from '@/osint/auth'

const OHMYPPT_API_BASE = '/api/studio/ohmyppt'

export async function ppthtmlDownloadPptx(html: string, filename = 'deck.pptx'): Promise<void> {
  const res = await fetch('/api/ppthtml/export/download', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ html, filename }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.detail || err.message || 'PPTX export failed')
  }
  const blob = await res.blob()
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename.endsWith('.pptx') ? filename : `${filename}.pptx`
  a.click()
  URL.revokeObjectURL(url)
}

/** Editable Guizang HTML → PPTX via oh-my-ppt html-pptx extraction */
export async function ppthtmlDownloadEditablePptx(
  html: string,
  filename = 'deck.pptx',
): Promise<void> {
  const token = getOsintAccessToken()
  const headers = new Headers({ 'Content-Type': 'application/json' })
  if (token) headers.set('Authorization', `Bearer ${token}`)

  const safeName = filename.endsWith('.pptx') ? filename : `${filename}.pptx`
  const title = safeName.replace(/\.pptx$/i, '')

  const res = await fetch(`${OHMYPPT_API_BASE}/export/guizang-pptx`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ html, title }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.detail || err.error || err.message || 'Editable PPTX export failed')
  }
  const blob = await res.blob()
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = safeName
  a.click()
  URL.revokeObjectURL(url)
}
