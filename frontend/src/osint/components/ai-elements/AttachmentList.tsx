/**
 * AttachmentList - 附件列表组件
 */

import { cn } from '@/osint/utils'
import { FileText, X, HardDrive, Folder, Link2, Eye } from 'lucide-react'
import type { Attachment } from './types'

interface AttachmentListProps {
  attachments: Attachment[]
  onRemove?: (id: string) => void
  onPreview?: (attachment: Attachment) => void
  className?: string
  maxHeight?: number
}

// 获取附件图标
function getAttachmentIcon(type: Attachment['type']) {
  switch (type) {
    case 'local':
      return <HardDrive size={12} className="text-gray-400" />
    case 'library':
      return <Folder size={12} className="text-amber-400" />
    case 'url':
      return <Link2 size={12} className="text-blue-400" />
    default:
      return <FileText size={12} className="text-gray-400" />
  }
}

// 格式化文件大小
function formatSize(bytes?: number): string {
  if (!bytes) return ''
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function AttachmentList({
  attachments,
  onRemove,
  onPreview,
  className,
  maxHeight,
}: AttachmentListProps) {
  if (attachments.length === 0) return null

  return (
    <div
      className={cn('flex flex-wrap gap-1.5', className)}
      style={maxHeight ? { maxHeight, overflowY: 'auto' } : undefined}
    >
      {attachments.map((attachment) => (
        <div
          key={attachment.id}
          className={cn(
            'flex items-center gap-1.5 rounded-xl border px-2.5 py-1.5',
            'border-zinc-200 bg-zinc-100/80 text-xs text-zinc-700',
            'group transition-all duration-200',
            'hover:border-zinc-300 hover:bg-zinc-100 dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:hover:border-white/20 dark:hover:bg-white/10'
          )}
        >
          {getAttachmentIcon(attachment.type)}
          <button
            type="button"
            onClick={() => onPreview?.(attachment)}
            disabled={!onPreview}
            className={cn(
              'flex min-w-0 items-center gap-1.5 text-left',
              onPreview && 'cursor-pointer hover:underline'
            )}
            title={onPreview ? '预览' : attachment.name}
          >
            <span className="truncate max-w-[100px] font-medium">{attachment.name}</span>
            {attachment.size && (
              <span className="text-[10px] text-zinc-400 dark:text-white/50">{formatSize(attachment.size)}</span>
            )}
          </button>
          {onPreview && (
            <button
              type="button"
              onClick={() => onPreview(attachment)}
              className={cn(
                'p-0.5 rounded transition-all duration-200',
                'text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200/80',
                'dark:text-white/40 dark:hover:text-white dark:hover:bg-white/10'
              )}
              title="预览"
            >
              <Eye size={10} />
            </button>
          )}
          {onRemove && (
            <button
              type="button"
              onClick={() => onRemove(attachment.id)}
              className={cn(
                'p-0.5 ml-0.5 rounded transition-all duration-200',
                'opacity-60 hover:opacity-100',
                'hover:bg-zinc-200/80 dark:hover:bg-white/10'
              )}
              title="移除"
            >
              <X size={10} />
            </button>
          )}
        </div>
      ))}
    </div>
  )
}
