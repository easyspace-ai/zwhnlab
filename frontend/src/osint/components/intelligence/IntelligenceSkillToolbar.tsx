import { useMemo, type ReactNode } from 'react'
import { ShieldCheck, Search, Database, Newspaper } from 'lucide-react'
import { cn } from '@/osint/utils'
import type { IntelligenceSkill } from '@/osint/types'
import { orderSkillsForGroup, type SkillGroupLite } from '@/osint/lib/intelligenceSkillToolbar'

const skillIconMap: Record<string, ReactNode> = {
  ShieldCheck: <ShieldCheck size={12} />,
  Search: <Search size={12} />,
  Database: <Database size={12} />,
  Newspaper: <Newspaper size={12} />,
}

export type IntelligenceSkillToolbarProps = {
  skillGroups: SkillGroupLite[]
  activeGroupId: string | null
  onActiveGroupChange: (groupId: string) => void
  intelligenceSkills: IntelligenceSkill[]
  onSkillClick: (skill: IntelligenceSkill) => void
  disabled?: boolean
}

export function IntelligenceSkillToolbar({
  skillGroups,
  activeGroupId,
  onActiveGroupChange,
  intelligenceSkills,
  onSkillClick,
  disabled = false,
}: IntelligenceSkillToolbarProps) {
  const activeGroup = useMemo(
    () => skillGroups.find((g) => g.id === activeGroupId) ?? skillGroups[0] ?? null,
    [skillGroups, activeGroupId],
  )

  const toolbarSkills = useMemo(
    () => orderSkillsForGroup(intelligenceSkills, activeGroup),
    [intelligenceSkills, activeGroup],
  )

  if (skillGroups.length === 0 && toolbarSkills.length === 0) {
    return null
  }

  const showGroupTabs = skillGroups.length > 1

  return (
    <div className="flex flex-col gap-2">
      {showGroupTabs && (
        <div
          className="flex flex-wrap items-center gap-1 border-b border-slate-200/80 pb-1.5 dark:border-slate-700"
          role="tablist"
          aria-label="技能分组"
        >
          {skillGroups.map((group) => (
            <button
              key={group.id}
              type="button"
              role="tab"
              aria-selected={activeGroupId === group.id}
              onClick={() => onActiveGroupChange(group.id)}
              className={cn(
                'shrink-0 rounded-lg px-2.5 py-1 text-[11px] font-medium transition-colors',
                activeGroupId === group.id
                  ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                  : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200',
              )}
            >
              {group.name}
            </button>
          ))}
        </div>
      )}
      <div
        className="flex flex-wrap gap-1.5"
        role="tabpanel"
        aria-label={activeGroup?.name ?? '技能'}
      >
        {toolbarSkills.length === 0 ? (
          <span className="text-[11px] text-slate-400 dark:text-slate-500">暂无可用技能</span>
        ) : (
          toolbarSkills.map((skill) => (
            <button
              key={skill.id}
              type="button"
              onClick={() => onSkillClick(skill)}
              disabled={disabled}
              className={cn(
                'flex shrink-0 items-center gap-1 rounded-xl border px-2.5 py-1 text-[11px] font-medium transition-all',
                disabled
                  ? 'cursor-not-allowed border-slate-100 text-slate-300 opacity-40 dark:border-slate-800'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:bg-slate-800',
              )}
            >
              <span className="text-slate-400 dark:text-slate-500">
                {skillIconMap[skill.icon || ''] || <ShieldCheck size={12} />}
              </span>
              {skill.name}
            </button>
          ))
        )}
      </div>
    </div>
  )
}
