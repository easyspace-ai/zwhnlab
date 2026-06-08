import * as React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { useToast } from "@/components/ui/toast";
import { Plus, Trash2, Edit2 } from "lucide-react";
import {
  listRoles,
  createRole,
  updateRole,
  deleteRole,
  listSkillGroups,
  type RoleItem,
  type SkillGroupItem,
} from "@/lib/adminApi";

const ALL_PERMISSIONS = [
  { key: "menu_polymarket", label: "活动栏 · 预测市场", path: "/polymarket" },
  { key: "menu_xstream", label: "活动栏 · X 信息流", path: "/x-stream" },
  { key: "menu_dashboard", label: "活动栏 · Dashboard", path: "/dashboard" },
  { key: "menu_ai_session", label: "活动栏 · AI 会话", path: "/ai-session" },
  { key: "menu_aichat", label: "活动栏 · AI 研究", path: "/aichat" },
  { key: "menu_osint_dashboard", label: "活动栏 · 情报研究（旧版）", path: "/osint-dashboard" },
  { key: "menu_ppt", label: "活动栏 · PPT", path: "/ppt" },
  { key: "menu_admin", label: "活动栏 · 系统管理", path: "/admin" },
  { key: "user_manage", label: "管理 · 用户管理", path: "/admin?tab=users" },
  { key: "role_manage", label: "管理 · 权限管理", path: "/admin?tab=roles" },
  { key: "skill_group_manage", label: "管理 · 技能组", path: "/admin?tab=skills" },
];

function formatPermissionLabel(perm: (typeof ALL_PERMISSIONS)[number]): string {
  return perm.path ? `${perm.label} (${perm.path})` : perm.label;
}

export function RoleManager() {
  const { toast } = useToast();
  const [roles, setRoles] = React.useState<RoleItem[]>([]);
  const [skillGroups, setSkillGroups] = React.useState<SkillGroupItem[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<RoleItem | null>(null);
  const [form, setForm] = React.useState({ name: "", description: "", permissions: [] as string[], skill_group_id: "" });

  const load = React.useCallback(async () => {
    setLoading(true);
    try {
      const [data, groups] = await Promise.all([listRoles(), listSkillGroups()]);
      setRoles(data);
      setSkillGroups(groups);
    } catch (e: any) {
      toast({ type: "error", title: "加载失败", description: e.message });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  React.useEffect(() => { load(); }, [load]);

  const openCreate = () => {
    setEditing(null);
    setForm({ name: "", description: "", permissions: [], skill_group_id: "" });
    setModalOpen(true);
  };

  const openEdit = (r: RoleItem) => {
    setEditing(r);
    setForm({ name: r.name, description: r.description || "", permissions: r.permissions || [], skill_group_id: r.skill_group_id || "" });
    setModalOpen(true);
  };

  const togglePermission = (key: string) => {
    setForm((f) => ({
      ...f,
      permissions: f.permissions.includes(key)
        ? f.permissions.filter((p) => p !== key)
        : [...f.permissions, key],
    }));
  };

  const handleSave = async () => {
    if (!form.name) {
      toast({ type: "warning", title: "请填写角色名称" });
      return;
    }
    try {
      const payload = {
        name: form.name,
        description: form.description,
        permissions: form.permissions,
        skill_group_id: form.skill_group_id || undefined,
      };
      if (editing) {
        await updateRole(editing.id, payload);
        toast({ type: "success", title: "权限组已更新" });
      } else {
        await createRole(payload);
        toast({ type: "success", title: "权限组已创建" });
      }
      setModalOpen(false);
      load();
    } catch (e: any) {
      toast({ type: "error", title: "保存失败", description: e.message });
    }
  };

  const handleDelete = async (r: RoleItem) => {
    if (!window.confirm(`确定删除权限组 "${r.name}" 吗？`)) return;
    try {
      await deleteRole(r.id);
      toast({ type: "success", title: "已删除" });
      load();
    } catch (e: any) {
      toast({ type: "error", title: "删除失败", description: e.message });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">权限管理</h1>
          <p className="text-sm text-gray-500 mt-1">创建权限组并分配菜单和功能权限</p>
        </div>
        <Button onClick={openCreate} className="gap-1.5">
          <Plus size={16} /> 新增权限组
        </Button>
      </div>

      <div className="bg-white dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>名称</TableHead>
              <TableHead>描述</TableHead>
              <TableHead>权限</TableHead>
              <TableHead>关联技能组</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={5} className="text-center py-8 text-gray-400">加载中…</TableCell></TableRow>
            ) : roles.length === 0 ? (
              <TableRow><TableCell colSpan={5} className="text-center py-8 text-gray-400">暂无权限组</TableCell></TableRow>
            ) : (
              roles.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-medium">{r.name}</TableCell>
                  <TableCell>{r.description || "—"}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {(r.permissions || []).map((p) => {
                        const perm = ALL_PERMISSIONS.find((ap) => ap.key === p);
                        return (
                          <span key={p} className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 text-xs">
                            {perm ? formatPermissionLabel(perm) : p}
                          </span>
                        );
                      })}
                    </div>
                  </TableCell>
                  <TableCell>
                    {r.skill_group_id ? (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-xs">
                        {skillGroups.find((g) => g.id === r.skill_group_id)?.name || r.skill_group_id}
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400">—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => openEdit(r)} className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500" title="编辑">
                        <Edit2 size={14} />
                      </button>
                      <button onClick={() => handleDelete(r)} className="p-1.5 rounded-md hover:bg-red-50 dark:hover:bg-red-500/10 text-gray-500 hover:text-red-600" title="删除">
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

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent onOpenChange={setModalOpen} className="max-w-xl">
          <DialogHeader>
            <DialogTitle>{editing ? "编辑权限组" : "新增权限组"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <label className="block text-sm font-medium mb-1">名称</label>
              <input className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 text-sm" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="权限组名称" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">描述</label>
              <input className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 text-sm" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} placeholder="描述" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">关联技能组</label>
              <select
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 text-sm"
                value={form.skill_group_id}
                onChange={(e) => setForm((f) => ({ ...f, skill_group_id: e.target.value }))}
              >
                <option value="">不关联</option>
                {skillGroups.map((g) => (
                  <option key={g.id} value={g.id}>{g.name}</option>
                ))}
              </select>
              <p className="text-xs text-gray-400 mt-1">关联后，拥有该角色的用户将自动获得该技能组的技能</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">权限分配</label>
              <div className="space-y-2">
                {ALL_PERMISSIONS.map((perm) => (
                  <label key={perm.key} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.permissions.includes(perm.key)} onChange={() => togglePermission(perm.key)} className="w-4 h-4 rounded border-gray-300 text-blue-600" />
                    <span className="text-sm">{formatPermissionLabel(perm)}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setModalOpen(false)}>取消</Button>
            <Button onClick={handleSave}>保存</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
