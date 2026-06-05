import { API_CONFIG, API_ENDPOINTS } from '@/osint/config/api'
import { getOsintAccessToken, handleUnauthorizedResponse } from '@/osint/auth'

function getAuthToken(): string | null {
  return getOsintAccessToken()
}

// 通用请求方法
async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const hasQuery = endpoint.includes('?') ? '&' : '?'
  const url = `${API_CONFIG.baseUrl}${endpoint}${hasQuery}t=${Date.now()}`

  const token = getAuthToken()
  const authHeaders = token ? { Authorization: `Bearer ${token}` } : {}
  const isFormData = typeof FormData !== 'undefined' && options.body instanceof FormData

  const response = await fetch(url, {
    ...options,
    headers: {
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
      ...authHeaders,
      ...(options.headers as any),
    } as any,
  })

  if (!response.ok) {
    handleUnauthorizedResponse(response.status)
    const error = await response.json().catch(() => ({ detail: 'Unknown error' }))
    throw new Error(error.detail || `HTTP ${response.status}`)
  }

  return response.json()
}

// ============ 项目 API ============
export const projectApi = {
  list: (params?: { skip?: number; limit?: number }) => {
    const cleanParams: Record<string, string> = {}
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        if (v === undefined || v === null) return
        const str = String(v)
        if (str.trim() === '') return
        cleanParams[k] = str
      })
    }
    const query = new URLSearchParams(cleanParams).toString()
    return request<any[]>(`${API_ENDPOINTS.projects}${query ? `?${query}` : ''}`)
  },

  create: (data: { name: string; description?: string; cover_image?: string }) =>
    request<any>(API_ENDPOINTS.projects, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  get: (id: string) => request<any>(API_ENDPOINTS.project(id)),
}

// ============ 会话 API（需传入 projectId）============
export const sessionApi = {
  list: (projectId: string, params?: { skip?: number; limit?: number }) => {
    const cleanParams: Record<string, string> = {}
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        if (v === undefined || v === null) return
        const str = String(v)
        if (str.trim() === '') return
        cleanParams[k] = str
      })
    }
    const query = new URLSearchParams(cleanParams).toString()
    return request<any[]>(`${API_ENDPOINTS.projectSessions(projectId)}${query ? `?${query}` : ''}`)
  },

  // 独立会话列表（不依赖 projectId）
  listDirect: (params?: { skip?: number; limit?: number }) => {
    const cleanParams: Record<string, string> = {}
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        if (v === undefined || v === null) return
        const str = String(v)
        if (str.trim() === '') return
        cleanParams[k] = str
      })
    }
    const query = new URLSearchParams(cleanParams).toString()
    return request<any[]>(`/sessions${query ? `?${query}` : ''}`)
  },

  get: (projectId: string, sessionId: string) =>
    request<any>(API_ENDPOINTS.projectSession(projectId, sessionId)),

  create: (projectId: string, data?: { title?: string; polymarket_saved_event_id?: string }) =>
    request<any>(API_ENDPOINTS.projectSessions(projectId), {
      method: 'POST',
      body: JSON.stringify(data || { title: '新对话' }),
    }),

  // 独立创建会话（不依赖 projectId）—— 后端自动关联默认项目
  createDirect: (data?: { title?: string; polymarket_saved_event_id?: string }) =>
    request<any>('/sessions', {
      method: 'POST',
      body: JSON.stringify(data || { title: '新对话' }),
    }),

  update: (projectId: string, sessionId: string, data: { title: string }) =>
    request<any>(API_ENDPOINTS.projectSession(projectId, sessionId), {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

updateDirect: (sessionId: string, data: { title: string }) =>
    request<any>(`/sessions/${encodeURIComponent(sessionId)}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  delete: (projectId: string, sessionId: string) =>
    request<{ message: string }>(API_ENDPOINTS.projectSession(projectId, sessionId), {
      method: 'DELETE',
    }),

  deleteDirect: (sessionId: string) =>
    request<{ message: string }>(`/sessions/${encodeURIComponent(sessionId)}`, {
      method: 'DELETE',
    }),

  // 上传资源（基于 sessionId）
  uploadResourceDirect: (sessionId: string, file: File) => {
    const endpoint = `/sessions/${encodeURIComponent(sessionId)}/upload`
    const url = `${API_CONFIG.baseUrl}${endpoint}?t=${Date.now()}`
    const formData = new FormData()
    formData.append('file', file)
    const token = getAuthToken()
    if (!token) {
      console.warn('[ChatUpload] upload_start: missing auth token, upload likely returns 401', {
        sessionId,
        fileName: file.name,
      })
    }
    console.log('[ChatUpload] upload_start: POST backend → AI SDK (third-party storage)', {
      method: 'POST',
      url,
      sessionId,
      fileName: file.name,
      fileSize: file.size,
      mimeType: file.type || '(unknown)',
    })
    return request<any>(endpoint, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
    }).then(
      (resource) => {
        console.log('[ChatUpload] upload_success: resource persisted in DB, file in cloud SDK', {
          resourceId: resource?.id,
          url: resource?.url,
          name: resource?.name,
        })
        return resource
      },
      (err: unknown) => {
        const message = err instanceof Error ? err.message : String(err)
        console.error('[ChatUpload] upload_failure: backend or AI SDK rejected upload', {
          sessionId,
          fileName: file.name,
          message,
        })
        throw err
      },
    )
  },

  deleteMessageDirect: (sessionId: string, messageId: string) =>
    request<any>(`/sessions/${encodeURIComponent(sessionId)}/messages/${encodeURIComponent(messageId)}`, {
      method: 'DELETE',
    }),

  updateMessageDirect: (sessionId: string, messageId: string, content: string) =>
    request<any>(`/sessions/${encodeURIComponent(sessionId)}/messages/${encodeURIComponent(messageId)}`, {
      method: 'PATCH',
      body: JSON.stringify({ content }),
    }),

  getSessionMessages: (projectId: string, sessionId: string, params?: { skip?: number; limit?: number }) => {
    const query = new URLSearchParams()
    if (typeof params?.skip === 'number') query.set('skip', String(params.skip))
    if (typeof params?.limit === 'number') query.set('limit', String(params.limit))
    const queryString = query.toString()
    return request<any[]>(
      `${API_ENDPOINTS.projectSessionMessages(projectId, sessionId)}${queryString ? `?${queryString}` : ''}`
    )
  },

  getSessionMessagesDirect: (sessionId: string, params?: { skip?: number; limit?: number }) => {
    const query = new URLSearchParams()
    if (typeof params?.skip === 'number') query.set('skip', String(params.skip))
    if (typeof params?.limit === 'number') query.set('limit', String(params.limit))
    const queryString = query.toString()
    return request<any[]>(`/sessions/${encodeURIComponent(sessionId)}/messages${queryString ? `?${queryString}` : ''}`)
  },

  getSessionHistory: (projectId: string, sessionId: string, params?: { offset?: number; limit?: number }) => {
    const query = new URLSearchParams()
    if (typeof params?.offset === 'number') query.set('offset', String(params.offset))
    if (typeof params?.limit === 'number') query.set('limit', String(params.limit))
    const queryString = query.toString()
    return request<any>(`${API_ENDPOINTS.projectSessionHistory(projectId, sessionId)}${queryString ? `?${queryString}` : ''}`)
  },

  getSessionHistoryDirect: (sessionId: string, params?: { offset?: number; limit?: number }) => {
    const query = new URLSearchParams()
    if (typeof params?.offset === 'number') query.set('offset', String(params.offset))
    if (typeof params?.limit === 'number') query.set('limit', String(params.limit))
    const queryString = query.toString()
    return request<any>(`/sessions/${encodeURIComponent(sessionId)}/history${queryString ? `?${queryString}` : ''}`)
  },

  createMessage: (projectId: string, sessionId: string, data: { content: string; skill_id?: string }) =>
    request<any>(API_ENDPOINTS.projectSessionMessages(projectId, sessionId), {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // 获取资源列表（基于 sessionId，独立会话用）
  getSessionResources: (sessionId: string, params?: { type?: string; skip?: number; limit?: number }) => {
    const query = new URLSearchParams()
    if (params?.type) query.set('type', params.type)
    if (typeof params?.skip === 'number') query.set('skip', String(params.skip))
    if (typeof params?.limit === 'number') query.set('limit', String(params.limit))
    const queryString = query.toString()
    return request<any[]>(`/sessions/${encodeURIComponent(sessionId)}/resources${queryString ? `?${queryString}` : ''}`)
  },

  // 基于 sessionId 创建资源（独立会话）
  createResourceDirect: (sessionId: string, data: { type: string; name: string; content?: string; url?: string }) =>
    request<any>(`/sessions/${encodeURIComponent(sessionId)}/resources`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateMessage: (projectId: string, sessionId: string, messageId: string, content: string) =>
    request<any>(`${API_ENDPOINTS.projectSessionMessages(projectId, sessionId)}/${encodeURIComponent(messageId)}`, {
      method: 'PATCH',
      body: JSON.stringify({ content }),
    }),

  deleteMessage: (projectId: string, sessionId: string, messageId: string) =>
    request<any>(`${API_ENDPOINTS.projectSessionMessages(projectId, sessionId)}/${encodeURIComponent(messageId)}`, {
      method: 'DELETE',
    }),

  // 基于 sessionId 更新资源（独立会话）
  updateResourceDirect: (sessionId: string, resourceId: string, data: { name?: string; content?: string }) =>
    request<any>(`/sessions/${encodeURIComponent(sessionId)}/resources/${encodeURIComponent(resourceId)}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  // 基于 sessionId 删除资源（独立会话）
  deleteResourceDirect: (sessionId: string, resourceId: string) =>
    request<{ message: string }>(
      `/sessions/${encodeURIComponent(sessionId)}/resources/${encodeURIComponent(resourceId)}`,
      { method: 'DELETE' }
    ),
}

// ============ 技能 API ============
export const skillApi = {
  list: (params?: { category?: string; installed?: boolean; personal?: boolean; search?: string }) => {
    const cleanParams: Record<string, string> = {}
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        if (v === undefined || v === null) return
        const str = String(v)
        if (str.trim() === '') return
        cleanParams[k] = str
      })
    }
    const query = new URLSearchParams(cleanParams).toString()
    return request<any[]>(`${API_ENDPOINTS.skills}${query ? `?${query}` : ''}`)
  },

  getInstalled: () => request<any[]>(API_ENDPOINTS.skillsInstalled),

  getRecommended: (limit = 4) =>
    request<any[]>(`${API_ENDPOINTS.skillsRecommended}?limit=${limit}`),

  get: (id: string) => request<any>(API_ENDPOINTS.skill(id)),

  create: (data: { name: string; description?: string; icon?: string; category?: string }) =>
    request<any>(API_ENDPOINTS.skills, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  install: (id: string) =>
    request<{ message: string }>(API_ENDPOINTS.skillInstall(id), {
      method: 'POST',
    }),

  uninstall: (id: string) =>
    request<{ message: string }>(API_ENDPOINTS.skillUninstall(id), {
      method: 'POST',
    }),
}

// ============ 聊天 API ============
export const chatApi = {
  send: async (data: {
    message: string
    projectId: string
    sessionId?: string
    skillId?: string
    attachments?: Record<string, any>
    resourceRefs?: Array<{ id: string; name?: string; type?: string }>
    model?: string
    mode?: string
  }) => {
    const body = {
      message: data.message,
      project_id: data.projectId,
      session_id: data.sessionId,
      skill_id: data.skillId,
      attachments: data.attachments,
      resource_refs: data.resourceRefs,
      model: data.model,
      mode: data.mode,
    }
    return request<any>(API_ENDPOINTS.chat, {
      method: 'POST',
      body: JSON.stringify(body),
    })
  },

  downloadSource: async (sourceId: string) => {
    const token = getAuthToken()
    const res = await fetch(
      `${API_CONFIG.baseUrl}${API_ENDPOINTS.chat}/source/${encodeURIComponent(sourceId)}?download=1&t=${Date.now()}`,
      {
        method: 'GET',
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      }
    )
    if (!res.ok) {
      handleUnauthorizedResponse(res.status)
      throw new Error(`HTTP ${res.status}`)
    }
    const disposition = res.headers.get('content-disposition') || ''
    const match = /filename=\"?([^\";]+)\"?/.exec(disposition)
    const filename = match?.[1] || sourceId
    const blob = await res.blob()
    const objectUrl = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = objectUrl
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(objectUrl)
  },

  fetchSourceFile: async (sourceId: string) => {
    const token = getAuthToken()
    const res = await fetch(
      `${API_CONFIG.baseUrl}${API_ENDPOINTS.chat}/source/${encodeURIComponent(sourceId)}?t=${Date.now()}`,
      {
        method: 'GET',
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      }
    )
    if (!res.ok) {
      handleUnauthorizedResponse(res.status)
      throw new Error(`HTTP ${res.status}`)
    }
    const disposition = res.headers.get('content-disposition') || ''
    const match = /filename=\"?([^\";]+)\"?/.exec(disposition)
    const filename = match?.[1] || sourceId
    const contentType = res.headers.get('content-type') || ''
    const blob = await res.blob()
    return { blob, filename, contentType }
  },
}

// ============ Intelligence Skill API ============
export const intelligenceSkillApi = {
  list: () => request<any[]>('/intelligence-skills'),
  listGroups: () => request<any[]>('/intelligence-skills/groups'),
  get: (id: string) => request<any>(`/intelligence-skills/${id}`),
  create: (data: {
    group_id?: string
    key: string
    name: string
    description?: string
    icon?: string
    form_schema: string
    prompt_template: string
    is_enabled?: boolean
    sort_order?: number
  }) =>
    request<any>('/intelligence-skills', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (id: string, data: Partial<{
    group_id?: string
    name: string
    description?: string | null
    icon?: string | null
    form_schema: string
    prompt_template: string
    is_enabled: boolean
    sort_order: number
  }>) =>
    request<any>(`/intelligence-skills/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    request<{ message: string }>(`/intelligence-skills/${id}`, {
      method: 'DELETE',
    }),
  restoreDefault: (id: string) =>
    request<any>(`/intelligence-skills/${id}/restore-default`, {
      method: 'POST',
    }),
}

// ============ Prompt Template API ============
export const promptTemplateApi = {
  list: () => request<any[]>(API_ENDPOINTS.promptTemplates),
  get: (id: string) => request<any>(API_ENDPOINTS.promptTemplate(id)),
  create: (data: { action_type: string; name: string; prompt: string }) =>
    request<any>(API_ENDPOINTS.promptTemplates, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (id: string, data: Partial<{ action_type: string; name: string; prompt: string }>) =>
    request<any>(API_ENDPOINTS.promptTemplate(id), {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    request<{ message: string }>(API_ENDPOINTS.promptTemplate(id), {
      method: 'DELETE',
    }),
}

// ============ 认证 API ============
export const authApi = {
  login: async (data: { username: string; password: string }) => {
    const { loginRequest } = await import('@/osint/auth')
    return loginRequest(data.username, data.password)
  },
  register: (data: any) =>
    request<any>('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  getMe: () => request<any>('/auth/me', { method: 'GET' }),
}

// ============ 搜索 API ============
export interface SearchResult {
  sessions?: Array<{
    id: string
    title: string
    created_at?: string
  }>
  skills: Array<{
    id: string
    name: string
    description?: string
    icon?: string
    category: string
  }>
  documents: Array<{
    id: string
    name: string
    content_preview?: string
    session_id?: string
    project_id?: string
  }>
}

export const searchApi = {
  search: (query: string, limit = 10) => {
    const params = new URLSearchParams({ q: query, limit: String(limit) })
    return request<SearchResult>(`${API_ENDPOINTS.search}?${params}`)
  },
}
