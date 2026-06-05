import * as React from 'react'
import { useCallback, useState } from 'react'
import { Bot, Check, FileText, Loader2, Send, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import {
  skillAssistantChatStream,
  type SkillAssistantContext,
  type SkillAssistantMessage,
} from '@/lib/skillAssistantApi'
import { parseSkillPatch, type SkillDraftPatch } from '@/lib/skillPatch'

type BuiltinPrompt = {
  label: string
  buildPrompt: (userInput: string) => string
}

const BUILTIN_PROMPTS: BuiltinPrompt[] = [
  {
    label: '设计新技能',
    buildPrompt: (userInput) =>
      `请根据以下需求设计一个新技能：${userInput.trim()}。返回 skill-patch 包含 key, name, description, form_schema, prompt_template`,
  },
  {
    label: '检查语法',
    buildPrompt: (userInput) => {
      const trimmed = userInput.trim()
      const notes = trimmed ? `用户备注：${trimmed}。` : ''
      return `检查当前 prompt_template 的 Handlebars 语法与字段引用（对照 form_schema）。${notes}如有问题，用 skill-patch 返回修正后的 prompt_template。`
    },
  },
  {
    label: '优化分支',
    buildPrompt: (userInput) => {
      const trimmed = userInput.trim()
      const theme = trimmed || '根据当前技能推断'
      return `用户对当前技能设计不完全满意。当前主题/需求：${theme}。请根据当前 form_schema 和 prompt_template 重新设计或部分优化，返回 skill-patch`
    },
  },
]

const BUILTIN_PLACEHOLDERS: Record<string, string> = {
  设计新技能: '描述新技能的主题或需求…',
  检查语法: '可选：补充说明或关注点…',
  优化分支: '描述希望优化的方向…',
}

const BUILTIN_REQUIRES_INPUT = new Set(['设计新技能'])

type ChatMessage = SkillAssistantMessage & {
  id: string
  patch?: SkillDraftPatch | null
  patchApplied?: boolean
}

export type SkillAssistantSkillContext = {
  id?: string
  key: string
  name: string
  isNew: boolean
}

type SkillAssistantPanelProps = {
  context: SkillAssistantContext
  skillContext: SkillAssistantSkillContext
  onApplyPatch?: (patch: SkillDraftPatch) => void
  className?: string
}

function SkillContextBar({ skillContext }: { skillContext: SkillAssistantSkillContext }) {
  const { id, key, name, isNew } = skillContext
  const draftLabel = name.trim() || key.trim() || '未命名'

  if (!isNew && id) {
    return (
      <div className="flex items-center gap-2 text-xs bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md px-3 py-1.5">
        <FileText size={12} className="shrink-0 text-gray-400" />
        <span className="text-gray-700 dark:text-gray-300 truncate">
          当前技能：<span className="font-medium">{name.trim() || key.trim() || '未命名'}</span>
        </span>
        {key.trim() && (
          <span className="shrink-0 text-[10px] font-mono text-gray-400 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">
            {key.trim()}
          </span>
        )}
      </div>
    )
  }

  if (name.trim() || key.trim()) {
    return (
      <div className="flex items-center gap-2 text-xs bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 rounded-md px-3 py-1.5">
        <Sparkles size={12} className="shrink-0 text-blue-500" />
        <span className="text-blue-800 dark:text-blue-200 truncate">
          当前：新建 · <span className="font-medium">{draftLabel}</span>
        </span>
      </div>
    )
  }

  return (
    <div className="text-xs bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 rounded-md px-3 py-1.5">
      <div className="flex items-center gap-2">
        <Sparkles size={12} className="shrink-0 text-blue-500" />
        <span className="text-blue-800 dark:text-blue-200 font-medium">当前：新建技能（未保存）</span>
      </div>
      <p className="mt-0.5 pl-5 text-[10px] text-blue-600/80 dark:text-blue-300/70">保存前可继续用 AI 完善</p>
    </div>
  )
}

export function SkillAssistantPanel({ context, skillContext, onApplyPatch, className }: SkillAssistantPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'system',
      content:
        '我是技能编写助手，熟悉 OSINT 技能、form_schema JSON 与 Handlebars 模板。生成或修改技能时，我会自动将 skill-patch 应用到左侧编辑器。',
    },
  ])
  const [input, setInput] = useState('')
  const [selectedBuiltin, setSelectedBuiltin] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const scrollRef = React.useRef<HTMLDivElement>(null)

  const activeBuiltin = BUILTIN_PROMPTS.find((item) => item.label === selectedBuiltin)
  const inputPlaceholder = activeBuiltin
    ? BUILTIN_PLACEHOLDERS[activeBuiltin.label] ?? '描述你想修改的内容…'
    : '描述你想修改的内容…'
  const requiresInput = selectedBuiltin != null && BUILTIN_REQUIRES_INPUT.has(selectedBuiltin)
  const canSend =
    !loading &&
    (activeBuiltin && !BUILTIN_REQUIRES_INPUT.has(activeBuiltin.label)
      ? true
      : input.trim().length > 0)

  React.useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const applyPatchFromMessage = useCallback(
    (messageId: string, content: string) => {
      const patch = parseSkillPatch(content)
      if (!patch || !onApplyPatch) return false
      onApplyPatch(patch)
      setMessages((prev) =>
        prev.map((m) =>
          m.id === messageId ? { ...m, patch, patchApplied: true } : m
        )
      )
      return true
    },
    [onApplyPatch]
  )

  const sendMessage = useCallback(
    async (apiText: string, displayContent?: string) => {
      const trimmed = apiText.trim()
      if (!trimmed || loading) return

      const userMsg: ChatMessage = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: displayContent?.trim() || trimmed,
      }
      const history = messages.filter((m) => m.role !== 'system')
      const nextMessages = [...history, userMsg]
      const assistantId = `assistant-${Date.now()}`

      setMessages((prev) => [
        ...prev.filter((m) => m.role === 'system'),
        ...nextMessages,
        { id: assistantId, role: 'assistant', content: '' },
      ])
      setInput('')
      setLoading(true)

      let fullContent = ''
      try {
        await skillAssistantChatStream({
          messages: [
            ...history.map(({ role, content }) => ({ role, content })),
            { role: 'user', content: trimmed },
          ],
          context,
          onChunk: (chunk) => {
            fullContent += chunk
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantId ? { ...m, content: fullContent } : m
              )
            )
          },
        })

        const patch = parseSkillPatch(fullContent)
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, patch } : m
          )
        )

        if (patch) {
          applyPatchFromMessage(assistantId, fullContent)
        }
      } catch (e: unknown) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? {
                  ...m,
                  content: e instanceof Error ? e.message : String(e),
                }
              : m
          )
        )
      } finally {
        setLoading(false)
      }
    },
    [applyPatchFromMessage, context, loading, messages]
  )

  const handleSend = useCallback(() => {
    const userInput = input.trim()
    if (!userInput && requiresInput) return

    if (activeBuiltin) {
      void sendMessage(activeBuiltin.buildPrompt(userInput), userInput || activeBuiltin.label)
      return
    }

    void sendMessage(userInput)
  }, [activeBuiltin, input, requiresInput, sendMessage])

  return (
    <div className={cn('flex flex-col h-full min-h-0', className)}>
      <ScrollArea className="flex-1 min-h-0">
        <div className="p-3 space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                'text-xs leading-relaxed rounded-lg px-3 py-2',
                msg.role === 'user' &&
                  'ml-4 bg-blue-50 text-blue-900 dark:bg-blue-500/10 dark:text-blue-100',
                msg.role === 'assistant' &&
                  'mr-4 bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
                msg.role === 'system' &&
                  'bg-amber-50/80 text-amber-900 dark:bg-amber-500/10 dark:text-amber-100 border border-amber-100 dark:border-amber-500/20'
              )}
            >
              {msg.role === 'assistant' && (
                <div className="flex items-center justify-between gap-2 text-[10px] text-gray-400 mb-1">
                  <div className="flex items-center gap-1">
                    <Bot size={11} />
                    助手
                  </div>
                  {msg.patch && onApplyPatch && (
                    <button
                      type="button"
                      disabled={msg.patchApplied}
                      onClick={() => applyPatchFromMessage(msg.id, msg.content)}
                      className="inline-flex items-center gap-0.5 text-[10px] text-blue-600 hover:text-blue-700 disabled:text-green-600 disabled:cursor-default"
                    >
                      {msg.patchApplied ? (
                        <>
                          <Check size={10} />
                          已应用
                        </>
                      ) : (
                        '应用到编辑器'
                      )}
                    </button>
                  )}
                </div>
              )}
              <pre className="whitespace-pre-wrap font-sans">{msg.content}</pre>
            </div>
          ))}
          {loading && messages[messages.length - 1]?.content === '' && (
            <div className="flex items-center gap-1.5 text-[10px] text-gray-400 px-2">
              <Loader2 size={12} className="animate-spin" />
              思考中…
            </div>
          )}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      <div className="shrink-0 border-t border-gray-200 dark:border-gray-800 p-2 space-y-2">
        <SkillContextBar skillContext={skillContext} />
        <div className="flex flex-wrap gap-1">
          {BUILTIN_PROMPTS.map((item) => {
            const isSelected = selectedBuiltin === item.label
            return (
              <button
                key={item.label}
                type="button"
                disabled={loading}
                onClick={() => setSelectedBuiltin(isSelected ? null : item.label)}
                className={cn(
                  'text-[10px] px-2 py-0.5 rounded-full border transition-colors disabled:opacity-50',
                  isSelected
                    ? 'border-blue-300 bg-blue-50 text-blue-700 dark:border-blue-500/40 dark:bg-blue-500/10 dark:text-blue-200'
                    : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900'
                )}
              >
                <Sparkles size={9} className="inline mr-0.5 -mt-px" />
                {item.label}
              </button>
            )
          })}
        </div>
        <div className="flex gap-1.5">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSend()
              }
            }}
            placeholder={inputPlaceholder}
            rows={2}
            className="text-xs min-h-0 resize-none"
            disabled={loading}
          />
          <Button
            size="sm"
            className="h-auto shrink-0 px-2"
            disabled={!canSend}
            onClick={handleSend}
          >
            {loading ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
          </Button>
        </div>
      </div>
    </div>
  )
}
