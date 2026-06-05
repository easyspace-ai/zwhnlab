/**
 * @deprecated 已弃用 - 会话消息请走 HTTP（getSessionMessages 分页）
 * 该模块仅保留用于向后兼容，新代码应使用 IndexedDB 缓存层
 */
import type { Message as TMessage } from '@/osint/types'

const SESSION_MESSAGE_CACHE_LIMIT = 20
const SESSION_MESSAGE_CACHE_VERSION = 4

console.warn('[sessionMessageCache] This module is deprecated. Use API pagination instead.')

function getSessionMessageCacheKey(sessionId: string) {
  return `youmind:session-messages:v${SESSION_MESSAGE_CACHE_VERSION}:${sessionId}`
}

export function readSessionMessageCache(sessionId: string): TMessage[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(getSessionMessageCacheKey(sessionId))
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed?.messages)) return []
    return parsed.messages
      .filter((m: any) => m && m.session_id === sessionId)
      .slice(-SESSION_MESSAGE_CACHE_LIMIT)
  } catch {
    return []
  }
}

export function writeSessionMessageCache(sessionId: string, messages: TMessage[]) {
  if (typeof window === 'undefined') return
  try {
    const scoped = messages
      .filter((m) => m.session_id === sessionId)
      .slice(-SESSION_MESSAGE_CACHE_LIMIT)
    localStorage.setItem(
      getSessionMessageCacheKey(sessionId),
      JSON.stringify({
        updated_at: Date.now(),
        messages: scoped,
      })
    )
  } catch {
    // ignore cache write failures
  }
}
