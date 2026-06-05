import { authHeaders } from "./authApi";

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
