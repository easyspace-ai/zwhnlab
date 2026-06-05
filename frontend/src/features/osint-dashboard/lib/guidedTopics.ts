import type { DashboardChatMessage } from '../types'

const W6_GUIDED_TOPIC_LIMIT = 4

export type GuidedTopicMode = 'w6' | 'discuss'

export type GuidedTopic = {
  text: string
  mode: GuidedTopicMode
}

/** Non-W6 chips: layout / style tweaks routed to chat/discuss. */
export const LAYOUT_GUIDED_TOPICS: GuidedTopic[] = [
  { text: '优化报告排版与章节结构', mode: 'discuss' },
  { text: '调整报告视觉风格与配色', mode: 'discuss' },
]

function latestMessageFollowUps(messages: DashboardChatMessage[]): string[] {
  for (let i = messages.length - 1; i >= 0; i--) {
    const qs = messages[i].followUpQuestions
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
    if (!q || seen.has(q) || out.length >= limit) return
    seen.add(q)
    out.push({ text: q, mode: 'w6' })
  }

  for (const q of options.followUpQuestions) add(q)
  for (const q of options.w6FollowUps ?? []) add(q)
  for (const q of latestMessageFollowUps(options.messages)) add(q)

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
  includeLayoutTopics?: boolean
}): { w6Topics: GuidedTopic[]; discussTopics: GuidedTopic[] } {
  const w6Topics = resolveW6GuidedTopics(options)
  const discussTopics = options.includeLayoutTopics === false ? [] : [...LAYOUT_GUIDED_TOPICS]
  return { w6Topics, discussTopics }
}
