import * as React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { useToast } from "@/components/ui/toast";
import { Plus, Key, Trash2, UserX, UserCheck, Copy, Pencil } from "lucide-react";
import {
  listUsers,
  createUser,
  updateUser,
  toggleDisableUser,
  resetPassword,
  deleteUser,
  listRoles,
  type AdminUser,
  type RoleItem,
} from "@/lib/adminApi";

function generateDefaultPassword(length = 6): string {
  const digits = "0123456789";
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => digits[b % 10]).join("");
}

type ResetModalState = {
  open: boolean;
  user?: AdminUser;
  password: string;
  step: "confirm" | "success";
  submitting: boolean;
};

const initialResetModal: ResetModalState = {
  open: false,
  password: "",
  step: "confirm",
  submitting: false,
};

export function UserManager() {
  const { toast } = useToast();
  const [users, setUsers] = React.useState<AdminUser[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const [editingUser, setEditingUser] = React.useState<AdminUser | null>(null);
  const [resetModal, setResetModal] = React.useState<ResetModalState>(initialResetModal);
  const [roles, setRoles] = React.useState<RoleItem[]>([]);
  const [form, setForm] = React.useState({
    username: "",
    email: "",
    password: "",
    role: "user",
    permission_role_ids: [] as string[],
  });
  const [editForm, setEditForm] = React.useState({
    username: "",
    email: "",
    role: "user",
    credits_balance: 0,
    disabled: false,
    permission_role_ids: [] as string[],
  });

  const load = React.useCallback(async () => {
    setLoading(true);
    try {
      const data = await listUsers();
      setUsers(data);
    } catch (e: any) {
      toast({ type: "error", title: "加载用户失败", description: e.message });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  React.useEffect(() => {
    load();
  }, [load]);

  React.useEffect(() => {
    void listRoles()
      .then(setRoles)
      .catch(() => setRoles([]));
  }, []);

  const openEdit = (u: AdminUser) => {
    setEditingUser(u);
    setEditForm({
      username: u.username,
      email: u.email,
      role: u.role || "user",
      credits_balance: u.credits_balance,
      disabled: u.disabled,
      permission_role_ids: u.permission_role_ids ? [...u.permission_role_ids] : [],
    });
    setEditModalOpen(true);
  };

  const handleUpdate = async () => {
    if (!editingUser) return;
    if (!editForm.username || !editForm.email) {
      toast({ type: "warning", title: "请填写完整信息" });
      return;
    }
    try {
      await updateUser(editingUser.id, {
        username: editForm.username,
        email: editForm.email,
        role: editForm.role,
        credits_balance: editForm.credits_balance,
        disabled: editForm.disabled,
        permission_role_ids: editForm.role === "admin" ? [] : editForm.permission_role_ids,
      });
      toast({ type: "success", title: "用户已更新" });
      setEditModalOpen(false);
      setEditingUser(null);
      load();
    } catch (e: any) {
      toast({ type: "error", title: "更新失败", description: e.message });
    }
  };

  const handleCreate = async () => {
    if (!form.username || !form.email) {
      toast({ type: "warning", title: "请填写完整信息" });
      return;
    }
    try {
      const result = await createUser(form);
      toast({ type: "success", title: "用户创建成功", description: `初始密码: ${result.password}` });
      setModalOpen(false);
      setForm({ username: "", email: "", password: "", role: "user", permission_role_ids: [] });
      load();
    } catch (e: any) {
      toast({ type: "error", title: "创建失败", description: e.message });
    }
  };

  const handleToggle = async (u: AdminUser) => {
    try {
      await toggleDisableUser(u.id);
      toast({ type: "success", title: u.disabled ? "用户已启用" : "用户已禁用" });
      load();
    } catch (e: any) {
      toast({ type: "error", title: "操作失败", description: e.message });
    }
  };

  const openResetPassword = (u: AdminUser) => {
    setResetModal({
      open: true,
      user: u,
      password: generateDefaultPassword(),
      step: "confirm",
      submitting: false,
    });
  };

  const closeResetModal = () => {
    setResetModal(initialResetModal);
  };

  const handleConfirmReset = async () => {
    if (!resetModal.user) return;
    if (resetModal.password.length < 6) {
      toast({ type: "warning", title: "密码至少6位" });
      return;
    }
    setResetModal((m) => ({ ...m, submitting: true }));
    try {
      const result = await resetPassword(resetModal.user.id, resetModal.password);
      setResetModal((m) => ({
        ...m,
        password: result.password,
        step: "success",
        submitting: false,
      }));
      toast({ type: "success", title: "密码已重置" });
      load();
    } catch (e: any) {
      toast({ type: "error", title: "重置失败", description: e.message });
      setResetModal((m) => ({ ...m, submitting: false }));
    }
  };

  const handleDelete = async (u: AdminUser) => {
    if (!window.confirm(`确定删除用户 "${u.username}" 吗？此操作不可撤销。`)) return;
    try {
      await deleteUser(u.id);
      toast({ type: "success", title: "用户已删除" });
      load();
    } catch (e: any) {
      toast({ type: "error", title: "删除失败", description: e.message });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">用户管理</h1>
          <p className="text-sm text-gray-500 mt-1">管理系统用户，支持创建、编辑、禁用、删除和重置密码</p>
        </div>
        <Button onClick={() => setModalOpen(true)} className="gap-1.5">
          <Plus size={16} />
          新增用户
        </Button>
      </div>

      <div className="bg-white dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>用户名</TableHead>
              <TableHead>邮箱</TableHead>
              <TableHead>角色</TableHead>
              <TableHead>状态</TableHead>
             
              <TableHead>创建时间</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-400">加载中…</TableCell>
              </TableRow>
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-400">暂无用户</TableCell>
              </TableRow>
            ) : (
              users.map((u) => (
                <TableRow key={u.id}>
                  <TableCell className="font-medium">{u.username}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>
                    <span className={u.role === "admin" ? "text-blue-600 font-semibold" : "text-gray-600"}>
                      {u.role === "admin" ? "超级管理员" : "普通用户"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={u.disabled ? "text-red-500" : "text-emerald-500"}>
                      {u.disabled ? "已禁用" : "正常"}
                    </span>
                  </TableCell>
                 
                  <TableCell className="text-gray-500">{new Date(u.created_at).toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => openEdit(u)}
                        className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"
                        title="编辑"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => handleToggle(u)}
                        className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"
                        title={u.disabled ? "启用" : "禁用"}
                      >
                        {u.disabled ? <UserCheck size={14} /> : <UserX size={14} />}
                      </button>
                      <button
                        onClick={() => openResetPassword(u)}
                        className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"
                        title="重置密码"
                      >
                        <Key size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(u)}
                        className="p-1.5 rounded-md hover:bg-red-50 dark:hover:bg-red-500/10 text-gray-500 hover:text-red-600"
                        title="删除"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* 新增用户弹窗 */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent onOpenChange={setModalOpen} className="max-w-xl">
          <DialogHeader>
            <DialogTitle>新增用户</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <label className="block text-sm font-medium mb-1">用户名</label>
              <input
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 text-sm"
                value={form.username}
                onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))}
                placeholder="输入用户名"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">邮箱</label>
              <input
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 text-sm"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                placeholder="输入邮箱"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">密码（留空则自动生成）</label>
              <input
                type="password"
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 text-sm"
                value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                placeholder="输入密码或留空"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">系统角色</label>
              <select
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 text-sm"
                value={form.role}
                onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
              >
                <option value="user">普通用户</option>
                <option value="admin">超级管理员</option>
              </select>
            </div>
            {form.role !== "admin" && roles.length > 0 ? (
              <div>
                <label className="block text-sm font-medium mb-1">权限组（可多选）</label>
                <div className="max-h-36 overflow-y-auto rounded-lg border border-gray-200 dark:border-gray-700 p-2 space-y-1">
                  {roles.map((r) => (
                    <label key={r.id} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.permission_role_ids.includes(r.id)}
                        onChange={(e) => {
                          setForm((f) => ({
                            ...f,
                            permission_role_ids: e.target.checked
                              ? [...f.permission_role_ids, r.id]
                              : f.permission_role_ids.filter((id) => id !== r.id),
                          }));
                        }}
                      />
                      <span>{r.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setModalOpen(false)}>取消</Button>
            <Button onClick={handleCreate}>创建</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 编辑用户弹窗 */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent onOpenChange={setEditModalOpen} className="max-w-xl">
          <DialogHeader>
            <DialogTitle>编辑用户</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <label className="block text-sm font-medium mb-1">用户名</label>
              <input
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 text-sm"
                value={editForm.username}
                onChange={(e) => setEditForm((f) => ({ ...f, username: e.target.value }))}
                placeholder="输入用户名"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">邮箱</label>
              <input
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 text-sm"
                value={editForm.email}
                onChange={(e) => setEditForm((f) => ({ ...f, email: e.target.value }))}
                placeholder="输入邮箱"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">系统角色</label>
              <select
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 text-sm"
                value={editForm.role}
                onChange={(e) => setEditForm((f) => ({ ...f, role: e.target.value }))}
              >
                <option value="user">普通用户</option>
                <option value="admin">超级管理员</option>
              </select>
            </div>
           
            <div>
              <label className="block text-sm font-medium mb-1">账号状态</label>
              <select
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 text-sm"
                value={editForm.disabled ? "disabled" : "active"}
                onChange={(e) => setEditForm((f) => ({ ...f, disabled: e.target.value === "disabled" }))}
              >
                <option value="active">正常</option>
                <option value="disabled">已禁用</option>
              </select>
            </div>
            {editForm.role !== "admin" && roles.length > 0 ? (
              <div>
                <label className="block text-sm font-medium mb-1">权限组（可多选）</label>
                <div className="max-h-36 overflow-y-auto rounded-lg border border-gray-200 dark:border-gray-700 p-2 space-y-1">
                  {roles.map((r) => (
                    <label key={r.id} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editForm.permission_role_ids.includes(r.id)}
                        onChange={(e) => {
                          setEditForm((f) => ({
                            ...f,
                            permission_role_ids: e.target.checked
                              ? [...f.permission_role_ids, r.id]
                              : f.permission_role_ids.filter((id) => id !== r.id),
                          }));
                        }}
                      />
                      <span>{r.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setEditModalOpen(false)}>取消</Button>
            <Button onClick={handleUpdate}>保存</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 重置密码确认 / 成功弹窗 */}
      <Dialog
        open={resetModal.open}
        onOpenChange={(v) => {
          if (!v) closeResetModal();
        }}
      >
        <DialogContent
          onOpenChange={(v) => {
            if (!v) closeResetModal();
          }}
        >
          <DialogHeader>
            <DialogTitle>
              {resetModal.step === "confirm" ? "重置密码" : "密码已重置"}
            </DialogTitle>
          </DialogHeader>
          {resetModal.step === "confirm" ? (
            <div className="mt-4 space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                确定要重置用户 <strong>{resetModal.user?.username}</strong> 的密码吗？可在下方修改新密码后再确认。
              </p>
              <div>
                <label className="block text-sm font-medium mb-1">新密码</label>
                <input
                  type="text"
                  autoComplete="off"
                  minLength={6}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 text-sm font-mono"
                  value={resetModal.password}
                  onChange={(e) => setResetModal((m) => ({ ...m, password: e.target.value }))}
                  placeholder="至少6位"
                />
                <p className="text-xs text-gray-500 mt-1">默认已生成6位数字密码，可修改后确认</p>
              </div>
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                用户 <strong>{resetModal.user?.username}</strong> 的新密码如下，请及时告知用户：
              </p>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-gray-100 dark:bg-gray-900 font-mono text-sm">
                <span className="flex-1">{resetModal.password}</span>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(resetModal.password);
                    toast({ type: "success", title: "已复制到剪贴板" });
                  }}
                  className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-800"
                  title="复制密码"
                >
                  <Copy size={14} />
                </button>
              </div>
            </div>
          )}
          <DialogFooter>
            {resetModal.step === "confirm" ? (
              <>
                <Button variant="ghost" onClick={closeResetModal} disabled={resetModal.submitting}>
                  取消
                </Button>
                <Button onClick={handleConfirmReset} disabled={resetModal.submitting}>
                  {resetModal.submitting ? "重置中…" : "确定"}
                </Button>
              </>
            ) : (
              <Button onClick={closeResetModal}>关闭</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
