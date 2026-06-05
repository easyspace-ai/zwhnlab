import * as React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { useToast } from "@/components/ui/toast";
import { Plus, Trash2, Edit2, Link2 } from "lucide-react";
import { listSkillGroups, createSkillGroup, updateSkillGroup, deleteSkillGroup, type SkillGroupItem } from "@/lib/adminApi";
import { listRoles, type RoleItem } from "@/lib/adminApi";

export function SkillGroupManager() {
  const { toast } = useToast();
  const [groups, setGroups] = React.useState<SkillGroupItem[]>([]);
  const [roles, setRoles] = React.useState<RoleItem[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<SkillGroupItem | null>(null);
  const [form, setForm] = React.useState({ name: "", description: "", skill_ids: "" as string, role_id: "" });

  const load = React.useCallback(async () => {
    setLoading(true);
    try {
      const [g, r] = await Promise.all([listSkillGroups(), listRoles()]);
      setGroups(g);
      setRoles(r);
    } catch (e: any) {
      toast({ type: "error", title: "加载失败", description: e.message });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  React.useEffect(() => { load(); }, [load]);

  const openCreate = () => {
    setEditing(null);
    setForm({ name: "", description: "", skill_ids: "", role_id: "" });
    setModalOpen(true);
  };

  const openEdit = (g: SkillGroupItem) => {
    setEditing(g);
    setForm({ name: g.name, description: g.description || "", skill_ids: (g.skill_ids || []).join(","), role_id: g.role_id || "" });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.name) {
      toast({ type: "warning", title: "请填写名称" });
      return;
    }
    const payload = {
      name: form.name,
      description: form.description || undefined,
      skill_ids: form.skill_ids.split(",").map((s) => s.trim()).filter(Boolean),
      role_id: form.role_id || undefined,
    };
    try {
      if (editing) {
        await updateSkillGroup(editing.id, payload);
        toast({ type: "success", title: "技能组已更新" });
      } else {
        await createSkillGroup(payload);
        toast({ type: "success", title: "技能组已创建" });
      }
      setModalOpen(false);
      load();
    } catch (e: any) {
      toast({ type: "error", title: "保存失败", description: e.message });
    }
  };

  const handleDelete = async (g: SkillGroupItem) => {
    if (!window.confirm(`确定删除技能组 "${g.name}" 吗？`)) return;
    try {
      await deleteSkillGroup(g.id);
      toast({ type: "success", title: "已删除" });
      load();
    } catch (e: any) {
      toast({ type: "error", title: "删除失败", description: e.message });
    }
  };

  const roleName = (id?: string) => roles.find((r) => r.id === id)?.name || "—";

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">技能组</h1>
          <p className="text-sm text-gray-500 mt-1">将技能分类到不同小组，并关联权限组</p>
        </div>
        <Button onClick={openCreate} className="gap-1.5">
          <Plus size={16} /> 新增技能组
        </Button>
      </div>

      <div className="bg-white dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>名称</TableHead>
              <TableHead>描述</TableHead>
              <TableHead>技能ID</TableHead>
              <TableHead>关联权限组</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={5} className="text-center py-8 text-gray-400">加载中…</TableCell></TableRow>
            ) : groups.length === 0 ? (
              <TableRow><TableCell colSpan={5} className="text-center py-8 text-gray-400">暂无技能组</TableCell></TableRow>
            ) : (
              groups.map((g) => (
                <TableRow key={g.id}>
                  <TableCell className="font-medium">{g.name}</TableCell>
                  <TableCell>{g.description || "—"}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1 max-w-[200px]">
                      {(g.skill_ids || []).slice(0, 3).map((sid) => (
                        <span key={sid} className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-600 text-xs">{sid}</span>
                      ))}
                      {(g.skill_ids || []).length > 3 && (
                        <span className="text-xs text-gray-400">+{(g.skill_ids || []).length - 3}</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {g.role_id ? (
                      <span className="inline-flex items-center gap-1 text-xs text-blue-600">
                        <Link2 size={12} /> {roleName(g.role_id)}
                      </span>
                    ) : "—"}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => openEdit(g)} className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500" title="编辑">
                        <Edit2 size={14} />
                      </button>
                      <button onClick={() => handleDelete(g)} className="p-1.5 rounded-md hover:bg-red-50 dark:hover:bg-red-500/10 text-gray-500 hover:text-red-600" title="删除">
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
            <DialogTitle>{editing ? "编辑技能组" : "新增技能组"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <label className="block text-sm font-medium mb-1">名称</label>
              <input className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 text-sm" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="如：情报研究小组" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">描述</label>
              <input className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 text-sm" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} placeholder="描述" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">技能ID（逗号分隔）</label>
              <input className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 text-sm" value={form.skill_ids} onChange={(e) => setForm((f) => ({ ...f, skill_ids: e.target.value }))} placeholder="skill1, skill2, skill3" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">关联权限组</label>
              <select className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 text-sm" value={form.role_id} onChange={(e) => setForm((f) => ({ ...f, role_id: e.target.value }))}>
                <option value="">不关联</option>
                {roles.map((r) => (
                  <option key={r.id} value={r.id}>{r.name}</option>
                ))}
              </select>
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
