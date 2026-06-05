/** Base URL for API calls. In dev Vite proxies `/api` to the Go backend. */
const API_URL_ROOT = String((import.meta as any).env?.VITE_API_URL || '').replace(/\/+$/, '')

export const API_CONFIG = {
  baseUrl: API_URL_ROOT || '/api',
  timeout: 30000,
}

/** Paths are relative to {@link API_CONFIG.baseUrl}. */
export const API_ENDPOINTS = {
  projects: '/projects',
  project: (id: string) => `/projects/${id}`,
  projectSessions: (projectId: string) => `/projects/${projectId}/sessions`,
  projectSession: (projectId: string, sessionId: string) => `/projects/${projectId}/sessions/${sessionId}`,
  projectSessionMessages: (projectId: string, sessionId: string) => `/projects/${projectId}/sessions/${sessionId}/messages`,
  projectSessionHistory: (projectId: string, sessionId: string) => `/projects/${projectId}/sessions/${sessionId}/history`,
  projectResources: (projectId: string) => `/projects/${projectId}/resources`,
  projectUpload: (projectId: string) => `/projects/${projectId}/upload`,
  // artifact 下载和预览（不再依赖 project_id）
  projectArtifactDownload: (resourceId: string) =>
    `/artifacts/${resourceId}/download`,
  projectArtifactPreview: (resourceId: string) =>
    `/artifacts/${resourceId}/preview`,

  skills: '/skills',
  skillsInstalled: '/skills/installed',
  skillsRecommended: '/skills/recommended',
  skill: (id: string) => `/skills/${id}`,
  skillInstall: (id: string) => `/skills/${id}/install`,
  skillUninstall: (id: string) => `/skills/${id}/uninstall`,

  chat: '/chat',
  promptTemplates: '/prompt-templates',
  promptTemplate: (id: string) => `/prompt-templates/${id}`,

  search: '/search',
}
