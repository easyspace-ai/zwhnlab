import type { DashboardChatMessage } from '../types'
import {
  buildW6StartUserContent,
  isSameW6UserContent,
  isW6PrefixedMessage,
} from './w6Message'

function isW6StartUserBubble(msg: DashboardChatMessage): boolean {
  return msg.role === 'user' && /执行：/.test(msg.content)
}

/** Drop @w6 start bubbles when a submitted skill form already records the same params. */
export function stripRedundantW6StartUsers(
  messages: DashboardChatMessage[],
): DashboardChatMessage[] {
  return messages.filter((userMsg) => {
    if (!isW6StartUserBubble(userMsg)) return true
    const redundant = messages.some(
      (m) =>
        m.id !== userMsg.id &&
        m.role === 'form' &&
        m.formStatus === 'submitted' &&
        m.skillName &&
        userMsg.content.includes(`执行：${m.skillName}`) &&
        (!m.formData ||
          isSameW6UserContent(
            userMsg.content,
            buildW6StartUserContent(m.skillName, m.formData),
          )),
    )
    return !redundant
  })
}

/** Drop stripped user bubbles when an `@w6` bubble with the same payload already exists. */
export function stripRedundantW6ManualUsers(
  messages: DashboardChatMessage[],
): DashboardChatMessage[] {
  return messages.filter((userMsg) => {
    if (userMsg.role !== 'user' || isW6PrefixedMessage(userMsg.content)) return true
    const redundant = messages.some(
      (m) =>
        m.id !== userMsg.id &&
        m.role === 'user' &&
        isW6PrefixedMessage(m.content) &&
        isSameW6UserContent(m.content, userMsg.content),
    )
    return !redundant
  })
}

function stripRedundantW6Users(messages: DashboardChatMessage[]): DashboardChatMessage[] {
  return stripRedundantW6ManualUsers(stripRedundantW6StartUsers(messages))
}

function isW6RoundAnchor(msg: DashboardChatMessage | undefined): boolean {
  if (!msg) return false
  if (msg.role === 'user') return true
  return msg.role === 'form' && msg.formStatus === 'submitted'
}

/** Each W6 chip follows the user bubble or submitted form that triggered it. */
export function repairConversationOrder(
  messages: DashboardChatMessage[],
): DashboardChatMessage[] {
  const out = stripRedundantW6Users([...messages])
  let i = 0
  while (i < out.length) {
    if (out[i].role !== 'w6') {
      i++
      continue
    }
    const w6Idx = i

    // Only in-flight W6 may be repositioned below a later user bubble (merge lag).
    // Completed rounds must stay above subsequent user questions in the timeline.
    if (out[w6Idx].w6Status === 'running') {
      let userAfter = -1
      for (let j = w6Idx + 1; j < out.length; j++) {
        if (out[j].role === 'user') {
          userAfter = j
          break
        }
        if (out[j].role === 'w6') break
      }
      if (userAfter >= 0) {
        const [w6Msg] = out.splice(w6Idx, 1)
        out.splice(userAfter, 0, w6Msg)
        i = userAfter + 1
        continue
      }
    }

    if (isW6RoundAnchor(out[w6Idx - 1])) {
      i++
      continue
    }

    let anchorIdx = -1
    for (let j = w6Idx - 1; j >= 0; j--) {
      if (out[j].role === 'user') {
        anchorIdx = j
        break
      }
      if (out[j].role === 'form' && out[j].formStatus === 'submitted') {
        anchorIdx = j
        break
      }
      if (out[j].role === 'w6') break
    }
    if (anchorIdx < 0) {
      i++
      continue
    }
    if (anchorIdx === w6Idx - 1) {
      i++
      continue
    }

    const [w6Msg] = out.splice(w6Idx, 1)
    out.splice(anchorIdx + 1, 0, w6Msg)
    i = anchorIdx + 2
  }
  return out
}
