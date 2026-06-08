import type { DashboardChatMessage } from '../types'
import {
  repairConversationOrder,
  stripRedundantW6ManualUsers,
  stripRedundantW6StartUsers,
} from './conversationOrder'
import { isSameW6UserContent, isW6PrefixedMessage } from './w6Message'
import { dedupeRunningW6Chips, sealW6MessageStatuses } from './w6SessionState'

const LOCAL_ONLY_ROLES = new Set<DashboardChatMessage['role']>(['form', 'guided_topics', 'w6'])

function isDuplicateMessage(a: DashboardChatMessage, b: DashboardChatMessage): boolean {
  if (LOCAL_ONLY_ROLES.has(a.role) || LOCAL_ONLY_ROLES.has(b.role)) {
    return a.id === b.id
  }
  if (a.role !== b.role) return false
  if (a.role === 'user' && isSameW6UserContent(a.content, b.content)) {
    return true
  }
  if (a.content.trim() !== b.content.trim()) return false
  return Math.abs((a.timestamp || 0) - (b.timestamp || 0)) < 10_000
}

function stripRedundantW6Users(messages: DashboardChatMessage[]): DashboardChatMessage[] {
  return stripRedundantW6ManualUsers(stripRedundantW6StartUsers(messages))
}

/** Merge server rows with local snapshot without sealing W6 statuses. */
export function mergeSessionMessagesRaw(
  server: DashboardChatMessage[],
  local: DashboardChatMessage[],
): DashboardChatMessage[] {
  if (local.length === 0) return server
  if (server.length === 0) return local

  const localRunningW6 = local.some((m) => m.role === 'w6' && m.w6Status === 'running')
  const serverBase = localRunningW6 ? server.filter((m) => m.role !== 'w6') : server

  const merged = [...serverBase]
  const mergedIds = new Set(merged.map((m) => m.id))
  for (const localMsg of local) {
    if (mergedIds.has(localMsg.id)) continue
    const dupIdx = merged.findIndex((srvMsg) => isDuplicateMessage(srvMsg, localMsg))
    if (dupIdx >= 0) {
      const serverMsg = merged[dupIdx]
      if (
        localMsg.role === 'user' &&
        isW6PrefixedMessage(localMsg.content) &&
        !isW6PrefixedMessage(serverMsg.content)
      ) {
        merged[dupIdx] = { ...localMsg, timestamp: serverMsg.timestamp || localMsg.timestamp }
        mergedIds.add(localMsg.id)
      }
      continue
    }
    merged.push(localMsg)
    mergedIds.add(localMsg.id)
  }
  return merged.sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0))
}

/** Merge server-persisted bubbles with local snapshot (forms, in-flight discuss, W6 metadata). */
export function mergeSessionMessages(
  server: DashboardChatMessage[],
  local: DashboardChatMessage[],
): DashboardChatMessage[] {
  return finalizeSessionMessages(mergeSessionMessagesRaw(server, local))
}

/** Keep at most one active guided-topics chip (latest wins). */
function dedupeActiveGuidedTopics(messages: DashboardChatMessage[]): DashboardChatMessage[] {
  let latestActiveIdx = -1
  for (let i = messages.length - 1; i >= 0; i--) {
    if (
      messages[i].role === 'guided_topics' &&
      messages[i].guidedTopicsStatus !== 'used'
    ) {
      latestActiveIdx = i
      break
    }
  }
  if (latestActiveIdx < 0) return messages
  return messages.filter(
    (m, i) =>
      m.role !== 'guided_topics' ||
      m.guidedTopicsStatus === 'used' ||
      i === latestActiveIdx,
  )
}

/** Drop redundant W6 start user bubbles, seal historical W6 rounds, fix chip ordering. */
export function finalizeSessionMessages(
  messages: DashboardChatMessage[],
  liveW6Id: string | null = null,
): DashboardChatMessage[] {
  const deduped = stripRedundantW6Users(messages)
  const oneRunning = dedupeRunningW6Chips(deduped, liveW6Id)
  const sealed = sealW6MessageStatuses(oneRunning, liveW6Id)
  const guided = dedupeActiveGuidedTopics(sealed)
  return repairConversationOrder(guided)
}
