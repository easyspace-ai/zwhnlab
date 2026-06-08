import type { GuidedTopicSnap } from '../types'

type GuidedTopicChipsProps = {
  topics: GuidedTopicSnap[]
  onSelect: (topic: GuidedTopicSnap) => void
  disabled?: boolean
}

function TopicChip({
  topic,
  onSelect,
  disabled,
}: {
  topic: GuidedTopicSnap
  onSelect: (topic: GuidedTopicSnap) => void
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

export function GuidedTopicChips({ topics, onSelect, disabled }: GuidedTopicChipsProps) {
  if (!topics.length) return null

  return (
    <div className="flex flex-wrap gap-1.5">
      {topics.map((topic) => (
        <TopicChip
          key={topic.text}
          topic={topic}
          onSelect={onSelect}
          disabled={disabled}
        />
      ))}
    </div>
  )
}
