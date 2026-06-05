import { useCallback, useState } from 'react'
import { HardDrive, Send, StopCircle } from 'lucide-react'
import { cn } from '@/osint/utils'
import { useToast } from '@/osint/components/ui/Feedback'
import { AttachmentList } from '@/osint/components/ai-elements/AttachmentList'
import type { Attachment } from '@/osint/components/ai-elements'
import { validateChatUploadFile } from '@/osint/lib/chatUpload'
import { chatUploadLog } from '@/osint/lib/chatUploadLog'

type DashboardChatComposerProps = {
  value: string
  onChange: (value: string) => void
  onSend: (attachments: Attachment[]) => void
  placeholder?: string
  disabled?: boolean
  isStreaming?: boolean
  onStop?: () => void
}

export function DashboardChatComposer({
  value,
  onChange,
  onSend,
  placeholder,
  disabled = false,
  isStreaming = false,
  onStop,
}: DashboardChatComposerProps) {
  const { addToast } = useToast()
  const [attachments, setAttachments] = useState<Attachment[]>([])

  const composeLocked = disabled

  const handleAddLocalFile = useCallback(() => {
    if (composeLocked || isStreaming) return
    const input = document.createElement('input')
    input.type = 'file'
    input.multiple = true
    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement
      const files = Array.from(target.files || [])
      if (files.length === 0) return

      const accepted: Attachment[] = []
      for (const file of files) {
        const validationError = validateChatUploadFile(file)
        if (validationError) {
          addToast('error', `${file.name}: ${validationError}`)
          continue
        }
        accepted.push({
          id: `local-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
          name: file.name,
          type: 'local',
          file,
          size: file.size,
          mimeType: file.type,
        })
      }
      if (accepted.length === 0) return
      setAttachments((prev) => [...prev, ...accepted])
      chatUploadLog('attachment_state', 'dashboard local files queued', {
        added: accepted.map((a) => a.name),
      })
    }
    input.click()
  }, [composeLocked, isStreaming, addToast])

  const handleSend = () => {
    if (composeLocked) return
    if (!value.trim() && attachments.length === 0) return
    onSend(attachments)
    setAttachments([])
  }

  return (
    <div className="space-y-2">
      {attachments.length > 0 ? (
        <AttachmentList
          attachments={attachments}
          onRemove={(id) => setAttachments((prev) => prev.filter((a) => a.id !== id))}
        />
      ) : null}

      <div className="relative overflow-visible rounded border border-zinc-200 bg-white shadow-sm transition-all duration-200 focus-within:border-zinc-300 dark:border-none dark:bg-white/5">
        <div className="flex items-end gap-2 overflow-hidden rounded-3xl px-2 py-2">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSend()
              }
            }}
            placeholder={placeholder}
            rows={2}
            disabled={composeLocked}
            className="min-h-[44px] flex-1 resize-none border-0 bg-transparent px-1 py-1 text-sm text-slate-800 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500"
          />
          {isStreaming ? (
            <button
              type="button"
              onClick={onStop}
              className="mb-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-red-200 text-red-600 transition-colors hover:bg-red-50 dark:border-red-400/30 dark:hover:bg-red-900/30"
              title="停止"
            >
              <StopCircle size={16} />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSend}
              disabled={composeLocked || (!value.trim() && attachments.length === 0)}
              className="mb-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white transition-colors hover:bg-slate-800 disabled:opacity-40 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
              title="发送"
            >
              <Send size={16} />
            </button>
          )}
        </div>

        <div className="flex items-center gap-1 border-t border-zinc-200/70 bg-zinc-50/70 px-3 py-2 dark:border-white/10 dark:bg-white/5">
          <button
            type="button"
            onClick={handleAddLocalFile}
            disabled={isStreaming || composeLocked}
            className={cn(
              'flex items-center gap-1 rounded-md px-2 py-1 text-xs transition-colors',
              isStreaming || composeLocked
                ? 'cursor-not-allowed text-zinc-300 dark:text-white/30'
                : 'text-zinc-500 hover:bg-zinc-200/50 hover:text-zinc-700 dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white',
            )}
          >
            <HardDrive size={12} />
            <span className="hidden sm:inline">本地文件</span>
          </button>
        </div>
      </div>
    </div>
  )
}
