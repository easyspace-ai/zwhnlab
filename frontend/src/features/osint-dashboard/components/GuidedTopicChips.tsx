import type { GuidedTopic } from '../lib/guidedTopics'

type GuidedTopicChipsProps = {
  w6Topics: GuidedTopic[]
  discussTopics?: GuidedTopic[]
  onSelect: (topic: GuidedTopic) => void
  disabled?: boolean
}

function TopicChip({
  topic,
  onSelect,
  disabled,
}: {
  topic: GuidedTopic
  onSelect: (topic: GuidedTopic) => void
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onSelect(topic)}
      title={topic.text}
      className="inline-flex max-w-full items-center gap-1.5 truncate rounded-full border border-slate-200 bg-white px-3 py-1.5 text-left text-xs text-slate-700 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-300 dark:hover:border-blue-700 dark:hover:bg-blue-950/40 dark:hover:text-blue-300"
    >
      <span className="truncate">{topic.text}</span>
    </button>
  )
}

export function GuidedTopicChips({
  w6Topics,
  discussTopics = [],
  onSelect,
  disabled,
}: GuidedTopicChipsProps) {
  if (!w6Topics.length && !discussTopics.length) return null

  return (
    <div className="mb-2 space-y-2">
      {w6Topics.length > 0 ? (
        <div>
          <div className="mb-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
            深度调研
          </div>
          <div className="flex flex-wrap gap-1.5">
            {w6Topics.map((topic) => (
              <TopicChip
                key={`w6-${topic.text}`}
                topic={topic}
                onSelect={onSelect}
                disabled={disabled}
              />
            ))}
          </div>
        </div>
      ) : null}
      {discussTopics.length > 0 ? (
        <div>
          <div className="mb-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
            报告调整
            <span className="ml-1 font-normal text-slate-400 dark:text-slate-500">（改版式 / 讨论）</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {discussTopics.map((topic) => (
              <TopicChip
                key={`discuss-${topic.text}`}
                topic={topic}
                onSelect={onSelect}
                disabled={disabled}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}
