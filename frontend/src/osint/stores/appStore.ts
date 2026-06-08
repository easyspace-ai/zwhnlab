import { create } from 'zustand'
import type { User, Skill, Message, Resource } from '@/osint/types'

interface AppState {
  // 用户状态
  user: User | null
  setUser: (user: User | null) => void
  
  // 笔记状态
  sessions: import('@/osint/types').Session[]
  currentSession: import('@/osint/types').Session | null
  setSessions: (sessions: import('@/osint/types').Session[]) => void
  setCurrentSession: (session: import('@/osint/types').Session | null) => void
  addSession: (session: import('@/osint/types').Session) => void
  patchSessionInList: (id: string, updates: Partial<import('@/osint/types').Session>) => void
  removeSessionFromList: (id: string) => void
  
  // 技能状态
  skills: Skill[]
  installedSkills: Skill[]
  setSkills: (skills: Skill[]) => void
  installSkill: (skillId: string) => void
  uninstallSkill: (skillId: string) => void
  
  // 消息状态
  messages: Message[]
  setMessages: (messages: Message[]) => void
  addMessage: (message: Message) => void
  
  // 资料状态
  resources: Resource[]
  setResources: (resources: Resource[]) => void
  addResource: (resource: Resource) => void
  updateResource: (id: string, updates: Partial<Resource>) => void
  deleteResource: (id: string) => void
  
  // UI 状态
  sidebarCollapsed: boolean
  setSidebarCollapsed: (collapsed: boolean) => void
  toggleSidebar: () => void
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

export const useAppStore = create<AppState>((set) => ({
  // 用户
  user: null,
  setUser: (user) => set({ user }),
  
  sessions: [],
  currentSession: null,
  setSessions: (sessions) => set({ sessions }),
  setCurrentSession: (session) => set({ currentSession: session }),
  addSession: (session) => set((state) => ({
    sessions: [session, ...state.sessions.filter((s) => s.id !== session.id)],
  })),
  patchSessionInList: (id, updates) => set((state) => ({
    sessions: state.sessions.map((s) => (s.id === id ? { ...s, ...updates } : s)),
  })),
  removeSessionFromList: (id) => set((state) => ({
    sessions: state.sessions.filter((s) => s.id !== id),
  })),
  
  // 技能
  skills: [],
  installedSkills: [],
  setSkills: (skills) => set({ skills }),
  installSkill: (skillId) => set((state) => {
    const skill = state.skills.find((s) => s.id === skillId)
    if (skill && !state.installedSkills.find((s) => s.id === skillId)) {
      return { installedSkills: [...state.installedSkills, { ...skill, isInstalled: true }] }
    }
    return state
  }),
  uninstallSkill: (skillId) => set((state) => ({
    installedSkills: state.installedSkills.filter((s) => s.id !== skillId)
  })),
  
  // 消息
  messages: [],
  setMessages: (messages) => set({ messages }),
  addMessage: (message) => set((state) => ({ 
    messages: [...state.messages, message] 
  })),
  
  // 资料
  resources: [],
  setResources: (resources) => set({ resources }),
  addResource: (resource) => set((state) => ({ 
    resources: [...state.resources, resource] 
  })),
  updateResource: (id, updates) => set((state) => ({
    resources: state.resources.map((r) => 
      r.id === id ? { ...r, ...updates } : r
    )
  })),
  deleteResource: (id) => set((state) => ({
    resources: state.resources.filter((r) => r.id !== id)
  })),
  
  // UI
  sidebarCollapsed: false,
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
  toggleSidebar: () => set((state) => ({ 
    sidebarCollapsed: !state.sidebarCollapsed 
  })),
  theme: 'light',
  toggleTheme: () => set((state) => ({ 
    theme: state.theme === 'light' ? 'dark' : 'light' 
  })),
}))
