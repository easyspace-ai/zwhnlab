/**
 * MessageBubble - 消息气泡组件（重构版）
 *
 * 支持用户消息和 AI 消息，包含操作按钮和状态显示
 * 优化配色方案和视觉层次
 */

import { useState, useCallback } from 'react'
import { cn } from '@/osint/utils'
import { MarkdownRenderer } from '../MarkdownRenderer'
import type { ChatMessage, MessageStatus } from './types'
import { Check, Copy, FileText, RefreshCw, User, FileCode, Eye } from 'lucide-react'

interface MessageBubbleProps {
  message: ChatMessage
  onCopy?: (content: string) => void
  onRegenerate?: () => void
  onSaveAsDocument?: (content: string) => void
  onEdit?: (messageId: string, newContent: string) => void
  onDelete?: (messageId: string) => void
  onViewResource?: (resource: { id: string; name?: string; type?: string }) => void
  className?: string
}

// 状态指示器组件
function StatusIndicator({ status }: { status?: MessageStatus }) {
  if (!status || status === 'idle' || status === 'complete') return null

  const statusConfig = {
    streaming: {
      text: '',
      className: 'text-indigo-600',
      bgClass: 'bg-indigo-50',
      borderClass: 'border-indigo-200',
    },
    thinking: {
      text: '思考中...',
      className: 'text-amber-600',
      bgClass: 'bg-amber-50',
      borderClass: 'border-amber-200',
    },
    'tool-calling': {
      text: '调用工具...',
      className: 'text-emerald-600',
      bgClass: 'bg-emerald-50',
      borderClass: 'border-emerald-200',
    },
    error: {
      text: '出错了',
      className: 'text-red-600',
      bgClass: 'bg-red-50',
      borderClass: 'border-red-200',
    },
  }

  const config = statusConfig[status]

  return (
    <div className={cn(
      'mb-2.5 flex items-center gap-2 border-b border-zinc-200 pb-2.5 text-xs dark:border-white/10',
      config.borderClass
    )}>
      <div className={cn(
        'w-2 h-2 rounded-full animate-pulse',
        status === 'thinking' && 'bg-amber-400',
        status === 'streaming' && 'bg-indigo-400',
        status === 'tool-calling' && 'bg-emerald-400',
        status === 'error' && 'bg-red-400'
      )} />
      <span className={cn('font-medium', config.className)}>{config.text}</span>
    </div>
  )
}

// 消息操作按钮
function MessageActions({
  content,
  onCopy,
  onRegenerate,
  onSaveAsDocument,
}: {
  content: string
  onCopy?: (content: string) => void
  onRegenerate?: () => void
  onSaveAsDocument?: (content: string) => void
}) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(() => {
    onCopy?.(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [content, onCopy])

  return (
    <div className="pl-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
      <div className="flex items-center gap-1 rounded-lg">
      <button
        onClick={handleCopy}
        className={cn(
          'flex items-center gap-1 rounded-md px-2 py-1 text-[11px] transition-colors',
          copied
            ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-300'
            : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700 dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white'
        )}
      >
        {copied ? <Check size={10} /> : <Copy size={10} />}
        <span>{copied ? '已复制' : '复制'}</span>
      </button>

      <button
        onClick={() => onSaveAsDocument?.(content)}
        className="flex items-center gap-1 rounded-md px-2 py-1 text-[11px] text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white"
      >
        <FileText size={10} />
        <span>保存</span>
      </button>

      <button
        onClick={() => onRegenerate?.()}
        className="flex items-center gap-1 rounded-md px-2 py-1 text-[11px] text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white"
      >
        <RefreshCw size={10} />
        <span>重试</span>
      </button>
      </div>
    </div>
  )
}

// 附件卡片组件
function AttachmentCards({
  resources,
  onView,
}: {
  resources: Array<{ id: string; name?: string; type?: string }>
  onView?: (resource: { id: string; name?: string; type?: string }) => void
}) {
  if (!resources || resources.length === 0) return null

  return (
    <div className="flex flex-col gap-2 mt-2.5">
      {resources.map((res) => (
        <div
          key={res.id}
          className={cn(
            'flex items-center gap-3 rounded-xl border px-3 py-2.5',
            'bg-zinc-50/80 border-zinc-200/70',
            'dark:bg-white/5 dark:border-white/10'
          )}
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white border border-zinc-200 shrink-0 dark:bg-white/10 dark:border-white/10">
            <FileCode size={16} className="text-zinc-500 dark:text-white/60" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-medium text-zinc-800 truncate dark:text-white/90">
              {res.name || '未命名文件'}
            </p>
            <p className="text-[10px] text-zinc-400 uppercase tracking-wide dark:text-white/40">
              {res.type || 'FILE'}
            </p>
          </div>
          <button
            onClick={() => onView?.(res)}
            className={cn(
              'px-3 py-1.5 rounded-lg text-[11px] font-medium transition-colors',
              'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-800',
              'dark:bg-white/10 dark:text-white/70 dark:hover:bg-white/20 dark:hover:text-white'
            )}
          >
            <span className="flex items-center gap-1">
              <Eye size={11} />
              View
            </span>
          </button>
        </div>
      ))}
    </div>
  )
}

export function MessageBubble({
  message,
  onCopy,
  onRegenerate,
  onSaveAsDocument,
  onViewResource,
  className,
}: MessageBubbleProps) {
  const isUser = message.role === 'user'

  return (
    <div className={cn('group flex gap-3', isUser ? 'justify-end' : 'justify-start', className)}>
      {!isUser && (
        <div className={cn(
          'mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-3xl border shadow dark:border-white/15'
        )}>
          <span className="text-[11px] font-semibold text-zinc-700 dark:text-white">C</span>
        </div>
      )}

      <div className={cn(
        'flex flex-col gap-0.5',
        isUser ? 'items-end max-w-[78%]' : 'items-start max-w-[85%]'
      )}>
        {/* 消息气泡 - 重新设计配色 */}
        <div
          className={cn(
            'px-4 py-2.5 text-[14px] leading-relaxed',
            isUser
              ? 'rounded-3xl bg-zinc-100 text-zinc-900 dark:bg-white/10 dark:text-white'
              : 'rounded-none bg-transparent text-zinc-800 shadow-none dark:text-[#eee]'
          )}
        >
          {isUser ? (
            <div className="w-full">
              <MarkdownRenderer content={message.content} />
            </div>
          ) : (
            <>
              <StatusIndicator status={message.status} />
              {message.content ? (
                <div className="w-full">
                  <MarkdownRenderer content={message.content} />
                </div>
              ) : (
                !message.status && (
                  <div className="h-4 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:100ms]" />
                    <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:200ms]" />
                  </div>
                )
              )}
            </>
          )}

          {/* 消息关联的生成资源（附件卡片） */}
          <AttachmentCards resources={message.resourceRefs || []} onView={onViewResource} />
        </div>

        {/* 操作按钮（仅 AI 消息） */}
        {!isUser && (
          <MessageActions
            content={message.content}
            onCopy={onCopy}
            onRegenerate={onRegenerate}
            onSaveAsDocument={onSaveAsDocument}
          />
        )}
      </div>

      {isUser && (
        <div className={cn(
          'mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-3xl bg-zinc-800 text-white shadow-sm dark:bg-white/80 dark:text-black'
        )}>
          <User size={14} />
        </div>
      )}
    </div>
  )
}
