import { ArrowRight } from 'lucide-react'

type FollowUpQuestionsProps = {
  questions: string[]
  onClick: (question: string) => void
}

export function FollowUpQuestions({ questions, onClick }: FollowUpQuestionsProps) {
  if (!questions?.length) return null

  return (
    <div className="mt-4 border-t border-slate-200 pt-3 dark:border-slate-700">
      <div className="mb-2 text-xs font-medium text-slate-500 dark:text-slate-400">
        深度调研方向
      </div>
      <div className="space-y-1.5">
        {questions.map((q, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onClick(q)}
            className="group flex w-full items-start gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-left transition-colors hover:border-blue-300 hover:bg-blue-50/80 dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-blue-700 dark:hover:bg-blue-950/30"
          >
            <span className="flex-1 text-xs leading-relaxed text-slate-700 group-hover:text-slate-900 dark:text-slate-300 dark:group-hover:text-slate-100">
              {q}
            </span>
            <ArrowRight
              size={14}
              className="mt-0.5 shrink-0 text-slate-400 transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
