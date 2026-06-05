import { authHeaders } from './authApi'

export type SkillAssistantMessage = {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export type SkillAssistantContext = {
  key?: string
  name?: string
  description?: string
  form_schema?: string
  prompt_template?: string
  active_tab?: string
}

export type SkillAssistantStreamEvent = {
  content?: string
  error?: string
}

async function readErrorMessage(res: Response): Promise<string> {
  const data = (await res.json().catch(() => ({}))) as { detail?: string }
  return data.detail || `AI 助手请求失败 (${res.status})`
}

export async function skillAssistantChatStream(
  payload: {
    messages: SkillAssistantMessage[]
    context?: SkillAssistantContext
    signal?: AbortSignal
    onChunk: (content: string) => void
  }
): Promise<void> {
  const res = await fetch('/api/admin/skill-assistant/chat/stream', {
    method: 'POST',
    headers: { ...authHeaders(), 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    signal: payload.signal,
  })

  if (!res.ok) {
    throw new Error(await readErrorMessage(res))
  }
  if (!res.body) {
    throw new Error('AI 助手流不可用')
  }

  const reader = res.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''
  let currentData: string[] = []

  const emit = () => {
    if (!currentData.length) return
    const raw = currentData.join('\n')
    currentData = []

    if (raw === '[DONE]') return

    let parsed: SkillAssistantStreamEvent
    try {
      parsed = JSON.parse(raw) as SkillAssistantStreamEvent
    } catch {
      return
    }

    if (parsed.error) {
      throw new Error(parsed.error)
    }
    if (parsed.content) {
      payload.onChunk(parsed.content)
    }
  }

  try {
    for (;;) {
      const { done, value } = await reader.read()
      if (value) {
        buffer += decoder.decode(value, { stream: !done })
      }

      const lines = buffer.split(/\r?\n/)
      buffer = lines.pop() ?? ''

      for (const line of lines) {
        if (!line) {
          emit()
          continue
        }
        if (line.startsWith('data:')) {
          currentData.push(line.slice(5).trimStart())
        }
      }

      if (done) break
    }
    emit()
  } finally {
    reader.releaseLock()
  }
}

/** @deprecated Use skillAssistantChatStream */
export async function skillAssistantChat(payload: {
  messages: SkillAssistantMessage[]
  context?: SkillAssistantContext
}): Promise<{ message: string }> {
  let message = ''
  await skillAssistantChatStream({
    ...payload,
    onChunk: (chunk) => {
      message += chunk
    },
  })
  if (!message) throw new Error('AI 助手未返回内容')
  return { message }
}
