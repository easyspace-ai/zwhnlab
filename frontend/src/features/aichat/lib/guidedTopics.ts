import {
  isUsableGuidedTopicText,
  resolveW6GuidedTopics,
  type GuidedTopic,
} from '@/features/osint-dashboard/lib/guidedTopics'

export { isUsableGuidedTopicText }

/** Filter and fill guided topics for aichat round projection (max 4). */
export function resolveRoundGuidedTopics(options: {
  questions: string[]
  skillKey?: string | null
  reportTitle?: string
}): string[] {
  const topics: GuidedTopic[] = resolveW6GuidedTopics({
    followUpQuestions: options.questions,
    messages: [],
    skillKey: options.skillKey ?? null,
    reportTitle: options.reportTitle,
  })
  return topics.map((t) => t.text)
}
