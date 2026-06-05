import { getOsintAccessToken } from '@/osint/auth'

export interface ReflowMarkdownRequest {
  markdown: string
}

export interface ReflowMarkdownResponse {
  markdown: string
}

/**
 * Call backend AI to restructure markdown for better export quality.
 * The AI reorganizes headings, paragraphs, and lists without changing any factual content.
 */
export async function reflowMarkdown(markdown: string): Promise<string> {
  const token = getOsintAccessToken()
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const res = await fetch('/api/export/reflow-markdown', {
    method: 'POST',
    headers,
    body: JSON.stringify({ markdown } satisfies ReflowMarkdownRequest),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.detail || err.message || `Reflow failed: ${res.status}`)
  }

  const data: ReflowMarkdownResponse = await res.json()
  return data.markdown
}
