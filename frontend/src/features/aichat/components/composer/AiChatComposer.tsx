import { useState } from 'react'
import { cn } from '@/osint/utils'

export function AiChatComposer({
  disabled,
  busy = false,
  isStreaming = false,
  onSend,
  onStop,
  placeholder = '输入消息；@w6 开头为深度调研',
}: {
  disabled?: boolean
  busy?: boolean
  isStreaming?: boolean
  onSend: (text: string) => void
  onStop?: () => void
  placeholder?: string
}) {
  const [text, setText] = useState('')

  const submit = () => {
    const v = text.trim()
    if (!v || disabled || busy || isStreaming) return
    onSend(v)
    setText('')
  }

  return (
    <div className="border-t border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-950">
      <div className="flex gap-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              if (isStreaming) {
                onStop?.()
                return
              }
              submit()
            }
          }}
          rows={2}
          disabled={disabled && !isStreaming}
          placeholder={placeholder}
          className={cn(
            'min-h-[44px] flex-1 resize-none rounded-lg border border-slate-200 px-3 py-2 text-sm',
            'dark:border-slate-700 dark:bg-slate-900',
          )}
        />
        {isStreaming ? (
          <button
            type="button"
            onClick={onStop}
            className="rounded-lg border border-red-200 bg-red-50 px-4 text-sm text-red-600 hover:bg-red-100 dark:border-red-400/30 dark:bg-red-950/40 dark:text-red-400"
          >
            停止
          </button>
        ) : (
          <button
            type="button"
            disabled={disabled || busy || !text.trim()}
            onClick={submit}
            className="rounded-lg bg-slate-900 px-4 text-sm text-white disabled:opacity-40 dark:bg-slate-100 dark:text-slate-900"
          >
            发送
          </button>
        )}
      </div>
    </div>
  )
}
