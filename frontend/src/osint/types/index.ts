export interface User {
  id: string
  username: string
  email: string
  subscription_plan: string
  credits_balance: number
  credits_used: number
  created_at: string
}

/** 会话：归属用户，可与 Polymarket 已保存事件关联 */
export interface Session {
  id: string
  user_id?: string
  polymarket_saved_event_id?: string | null
  title: string
  created_at: string
  updated_at: string
}

export interface Message {
  id: string
  upstream_message_id?: string | null
  user_id?: string
  /** @deprecated 仅兼容旧缓存；新后端以 session_id 为准 */
  project_id?: string
  session_id?: string
  role: 'user' | 'assistant' | 'system'
  content: string
  status?: string
  skill_id?: string | null
  attachments?: any
  resource_refs?: Array<{ id: string; name?: string; type?: string }>
  created_at: string
}

export interface Resource {
  id: string
  user_id?: string
  /** @deprecated 仅兼容旧 UI；新后端以 session_id 为准 */
  project_id?: string
  session_id?: string | null
  type: 'document' | 'link' | 'note' | 'output' | 'pdf' | 'text' | 'html_page' | 'artifact' | 'todo_state'
  name: string
  content?: string
  url?: string | null
  size?: string | null
  created_at: string
}

export interface Skill {
  id: string
  name: string
  description?: string
  icon?: string | null
  category: string
  author?: string | null
  users_count: number
  rating: number
  tags?: string[] | null
  is_installed: boolean
  is_personal: boolean
  is_recommended: boolean
  created_at: string
  updated_at: string
}

export interface PromptTemplate {
  id: string
  action_type: string
  name: string
  prompt: string
  created_at: string
  updated_at: string
}

export interface IntelligenceSkill {
  id: string
  key: string
  name: string
  description?: string | null
  icon?: string | null
  form_schema: string
  prompt_template: string
  is_enabled: boolean
  sort_order: number
  /** Listed in a skill group → form submit runs through @w6 sub-agent. */
  uses_w6?: boolean
  created_at: string
  updated_at: string
}

export interface FormField {
  name: string
  label: string
  type: 'text' | 'textarea' | 'select' | 'multi_select' | 'number' | 'date' | 'checkbox'
  placeholder?: string
  description?: string
  required?: boolean
  default?: string | number | boolean | string[]
  options?: Array<{ label: string; value: string }>
}
