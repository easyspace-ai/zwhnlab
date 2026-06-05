import * as React from 'react'
import * as LucideIcons from 'lucide-react'
import { Puzzle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SKILL_ICON_NAMES } from './skillIconOptions'

type LucideIconComponent = React.ComponentType<{ size?: number; className?: string }>

const iconRegistry = LucideIcons as unknown as Record<string, LucideIconComponent>

export function SkillIcon({
  name,
  size = 14,
  className,
  fallback,
}: {
  name?: string
  size?: number
  className?: string
  /** Shown when no icon name or unknown icon */
  fallback?: React.ReactNode
}) {
  if (!name || !SKILL_ICON_NAMES.has(name)) {
    if (fallback !== undefined) return <>{fallback}</>
    return <Puzzle size={size} className={cn('opacity-60', className)} />
  }
  const Icon = iconRegistry[name]
  if (!Icon) {
    if (fallback !== undefined) return <>{fallback}</>
    return <Puzzle size={size} className={cn('opacity-60', className)} />
  }
  return <Icon size={size} className={className} />
}
