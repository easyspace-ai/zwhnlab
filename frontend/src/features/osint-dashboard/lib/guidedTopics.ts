import type { DashboardChatMessage } from '../types'

const W6_GUIDED_TOPIC_LIMIT = 4
const MAX_GUIDED_TOPIC_CHARS = 200

export type GuidedTopicMode = 'w6' | 'discuss'

/** Drop skill prompts and other non-question blobs from follow-up chips. */
export function isUsableGuidedTopicText(raw: string): boolean {
  const q = raw.trim()
  if (!q || q.length > MAX_GUIDED_TOPIC_CHARS) return false
  if (/你是一个.{0,24}(助手|专家|模型|AI|智能体)/.test(q)) return false
  return true
}

export type GuidedTopic = {
  text: string
  mode: GuidedTopicMode
}

function latestW6FollowUps(messages: DashboardChatMessage[]): string[] {
  for (let i = messages.length - 1; i >= 0; i--) {
    const m = messages[i]
    if (m.role !== 'w6') continue
    const qs = m.followUpQuestions
    if (qs?.length) return qs
  }
  return []
}

export function defaultGuidedTopics(
  skillKey: string | null | undefined,
  reportTitle?: string,
): string[] {
  const topic = reportTitle?.trim() || '本次研究主题'

  if (skillKey === 'info_research') {
    return [
      `针对「${topic}」还有哪些信息缺口需要补充调研？`,
      '请梳理报告中的关键实体及其关联关系',
      '对比不同信源对该主题的说法差异',
      '请给出 3 条可执行的后续开源调查方向',
    ]
  }

  if (skillKey === 'data_collection') {
    return [
      `「${topic}」相关公开数据还有哪些未收录？`,
      '请验证报告中关键数据的原始出处',
      '哪些指标值得建立持续监测？',
      '请列出可复用的数据采集渠道与方法',
    ]
  }

  return [
    `报告中对「${topic}」的核心结论是什么？`,
    '有哪些关键证据仍需要进一步核实？',
    '如果该主张在社交媒体传播，应如何辟谣或标注？',
    '请列出 3 条可执行的下一步调查建议。',
  ]
}

export function resolveW6GuidedTopics(options: {
  followUpQuestions: string[]
  messages: DashboardChatMessage[]
  w6FollowUps?: string[]
  skillKey: string | null | undefined
  reportTitle?: string
  limit?: number
}): GuidedTopic[] {
  const limit = options.limit ?? W6_GUIDED_TOPIC_LIMIT
  const seen = new Set<string>()
  const out: GuidedTopic[] = []

  const add = (raw: string) => {
    const q = raw.trim()
    if (!q || !isUsableGuidedTopicText(q) || seen.has(q) || out.length >= limit) return
    seen.add(q)
    out.push({ text: q, mode: 'w6' })
  }

  for (const q of options.followUpQuestions) add(q)
  for (const q of options.w6FollowUps ?? []) add(q)
  for (const q of latestW6FollowUps(options.messages)) add(q)

  if (out.length < limit) {
    for (const q of defaultGuidedTopics(options.skillKey, options.reportTitle)) {
      add(q)
      if (out.length >= limit) break
    }
  }

  return out
}

export function resolveGuidedTopics(options: {
  followUpQuestions: string[]
  messages: DashboardChatMessage[]
  w6FollowUps?: string[]
  skillKey: string | null | undefined
  reportTitle?: string
}): GuidedTopic[] {
  return resolveW6GuidedTopics(options)
}
