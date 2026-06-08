import { authHeaders } from "./authApi";
import { AuthRequiredError, getAuthenticatedHeaders, getOsintAuthHeaders } from "@/osint/auth";

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: string;
  disabled: boolean;
  subscription_plan: string;
  credits_balance: number;
  credits_used: number;
  permission_role_ids?: string[];
  created_at: string;
}

export interface RoleItem {
  id: string;
  name: string;
  description?: string;
  permissions: string[];
  skill_group_id?: string;
  created_at: string;
}

export interface SkillGroupItem {
  id: string;
  name: string;
  description?: string;
  skill_ids: string[];
  role_id?: string;
  created_at: string;
}

export async function listUsers(): Promise<AdminUser[]> {
  const res = await fetch("/api/admin/users", { headers: authHeaders() });
  if (!res.ok) throw new Error(`failed to list users (${res.status})`);
  return res.json();
}

export async function createUser(payload: {
  username: string;
  email: string;
  password?: string;
  role?: string;
  permission_role_ids?: string[];
}) {
  const res = await fetch("/api/admin/users", {
    method: "POST",
    headers: { ...authHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = (await res.json().catch(() => ({}))) as { detail?: string } & Record<string, any>;
  if (!res.ok) throw new Error(data.detail || `创建失败 (${res.status})`);
  return data;
}

export async function updateUser(
  id: string,
  payload: {
    username: string;
    email: string;
    role?: string;
    credits_balance?: number;
    disabled?: boolean;
    permission_role_ids?: string[];
  },
): Promise<AdminUser> {
  const res = await fetch(`/api/admin/users/${id}`, {
    method: "PATCH",
    headers: { ...authHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = (await res.json().catch(() => ({}))) as { detail?: string } & Partial<AdminUser>;
  if (!res.ok) throw new Error(data.detail || `更新失败 (${res.status})`);
  return data as AdminUser;
}

export async function toggleDisableUser(id: string): Promise<AdminUser> {
  const res = await fetch(`/api/admin/users/${id}/disable`, {
    method: "PATCH",
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error(`failed to toggle user (${res.status})`);
  return res.json();
}

export async function resetPassword(id: string, newPassword: string): Promise<{ password: string }> {
  const res = await fetch(`/api/admin/users/${id}/reset-password`, {
    method: "POST",
    headers: { ...authHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify({ new_password: newPassword }),
  });
  const data = (await res.json().catch(() => ({}))) as { detail?: string; password?: string };
  if (!res.ok) throw new Error(data.detail || `重置密码失败 (${res.status})`);
  return { password: data.password ?? newPassword };
}

export async function deleteUser(id: string): Promise<void> {
  const res = await fetch(`/api/admin/users/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error(`failed to delete user (${res.status})`);
}

export async function listRoles(): Promise<RoleItem[]> {
  const res = await fetch("/api/admin/roles", { headers: authHeaders() });
  if (!res.ok) throw new Error(`failed to list roles (${res.status})`);
  return res.json();
}

export async function createRole(payload: { name: string; description?: string; permissions: string[]; skill_group_id?: string }) {
  const res = await fetch("/api/admin/roles", {
    method: "POST",
    headers: { ...authHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = (await res.json().catch(() => ({}))) as { detail?: string } & Record<string, any>;
  if (!res.ok) throw new Error(data.detail || `创建失败 (${res.status})`);
  return data;
}

export async function updateRole(id: string, payload: { name: string; description?: string; permissions: string[]; skill_group_id?: string }) {
  const res = await fetch(`/api/admin/roles/${id}`, {
    method: "PUT",
    headers: { ...authHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = (await res.json().catch(() => ({}))) as { detail?: string } & Record<string, any>;
  if (!res.ok) throw new Error(data.detail || `更新失败 (${res.status})`);
  return data;
}

export async function deleteRole(id: string): Promise<void> {
  const res = await fetch(`/api/admin/roles/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error(`failed to delete role (${res.status})`);
}

export async function listSkillGroups(): Promise<SkillGroupItem[]> {
  const res = await fetch("/api/admin/skill-groups", { headers: authHeaders() });
  if (!res.ok) throw new Error(`failed to list skill groups (${res.status})`);
  return res.json();
}

export async function createSkillGroup(payload: { name: string; description?: string; skill_ids: string[]; role_id?: string }) {
  const res = await fetch("/api/admin/skill-groups", {
    method: "POST",
    headers: { ...authHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = (await res.json().catch(() => ({}))) as { detail?: string } & Record<string, any>;
  if (!res.ok) throw new Error(data.detail || `创建失败 (${res.status})`);
  return data;
}

export async function updateSkillGroup(id: string, payload: { name: string; description?: string; skill_ids: string[]; role_id?: string }) {
  const res = await fetch(`/api/admin/skill-groups/${id}`, {
    method: "PUT",
    headers: { ...authHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = (await res.json().catch(() => ({}))) as { detail?: string } & Record<string, any>;
  if (!res.ok) throw new Error(data.detail || `更新失败 (${res.status})`);
  return data;
}

export async function deleteSkillGroup(id: string): Promise<void> {
  const res = await fetch(`/api/admin/skill-groups/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error(`failed to delete skill group (${res.status})`);
}

export interface AdminSettings {
  registration_enabled: boolean;
}

export async function fetchAdminSettings(): Promise<AdminSettings> {
  const res = await fetch("/api/admin/settings", { headers: authHeaders() });
  if (!res.ok) throw new Error(`加载设置失败 (${res.status})`);
  return res.json() as Promise<AdminSettings>;
}

export async function updateAdminSettings(payload: Partial<AdminSettings>): Promise<AdminSettings> {
  const res = await fetch("/api/admin/settings", {
    method: "PATCH",
    headers: { ...authHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = (await res.json().catch(() => ({}))) as { detail?: string } & Partial<AdminSettings>;
  if (!res.ok) throw new Error(data.detail || `保存失败 (${res.status})`);
  return data as AdminSettings;
}

export interface XStreamInitStatus {
  status: "idle" | "running" | "completed" | "failed" | "cancelled";
  initDone: boolean;
  itemCount: number;
  batchesDone: number;
  lastBatchStored: number;
  totalStoredThisRun: number;
  currentCursor: number;
  hasMore: boolean;
  error?: string;
  startedAt?: string;
  updatedAt?: string;
}

function xstreamAdminError(data: { error?: string; detail?: string }, fallback: string, status: number): string {
  return data.detail || data.error || `${fallback} (${status})`;
}

/** 轮询类请求：复用本地 token / Cookie，避免每次打 /auth/me 触发限流。 */
async function xstreamAdminFetch(
  url: string,
  init: RequestInit = {},
): Promise<Response> {
  const res = await fetch(url, {
    ...init,
    headers: {
      ...getOsintAuthHeaders(),
      ...(init.headers as Record<string, string> | undefined),
    },
    credentials: "include",
  });
  if (res.status === 401) {
    throw new AuthRequiredError("登录已失效，请重新登录");
  }
  return res;
}

export async function fetchXStreamInitStatus(): Promise<XStreamInitStatus> {
  const res = await xstreamAdminFetch("/api/admin/xstream/status");
  const data = (await res.json().catch(() => ({}))) as { error?: string; detail?: string } & Partial<XStreamInitStatus>;
  if (!res.ok) throw new Error(xstreamAdminError(data, "加载状态失败", res.status));
  return data as XStreamInitStatus;
}

export async function clearXStreamData(): Promise<void> {
  const res = await xstreamAdminFetch("/api/admin/xstream/clear", { method: "POST" });
  const data = (await res.json().catch(() => ({}))) as { error?: string; detail?: string };
  if (!res.ok) throw new Error(xstreamAdminError(data, "清空失败", res.status));
}

export async function startXStreamInit(clearFirst = true): Promise<void> {
  // 启动前校验一次会话；轮询阶段不再重复 /auth/me
  await getAuthenticatedHeaders();
  const res = await xstreamAdminFetch("/api/admin/xstream/init", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ clear_first: clearFirst }),
  });
  const data = (await res.json().catch(() => ({}))) as { error?: string; detail?: string };
  if (!res.ok) throw new Error(xstreamAdminError(data, "启动失败", res.status));
}

export async function cancelXStreamInit(): Promise<void> {
  const res = await xstreamAdminFetch("/api/admin/xstream/cancel", { method: "POST" });
  const data = (await res.json().catch(() => ({}))) as { error?: string; detail?: string };
  if (!res.ok) throw new Error(xstreamAdminError(data, "取消失败", res.status));
}
