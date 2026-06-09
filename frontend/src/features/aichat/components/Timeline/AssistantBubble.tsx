import { MarkdownRenderer } from '@/osint/components/MarkdownRenderer'

/** Plain DeepSeek / discuss assistant reply — renders accumulated markdown (streaming-safe). */
export function AssistantBubble({ content }: { content: string }) {
  if (!content) return null

  return (
    <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm dark:border-slate-600">
      <MarkdownRenderer content={content} />
    </div>
  )
}
