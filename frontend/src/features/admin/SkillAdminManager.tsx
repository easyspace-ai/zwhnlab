import * as React from "react";
import {
  Plus,
  Trash2,
  Pencil,
  GripVertical,
  RotateCcw,
  ChevronUp,
  ChevronDown,
  X,
  Puzzle,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/toast";
import {
  listSkillGroups,
  createSkillGroup,
  updateSkillGroup,
  deleteSkillGroup,
  type SkillGroupItem,
} from "@/lib/adminApi";
import { intelligenceSkillApi } from "@/osint/services/api";
import type { IntelligenceSkill } from "@/osint/types";
import { isBuiltinIntelligenceSkill } from "@/osint/constants/builtinIntelligenceSkills";
import {
  SkillEditorWorkspace,
  type SkillEditorPayload,
} from "./skillPlayground/SkillEditorWorkspace";
import { SkillIcon } from "./skillPlayground/SkillIcon";

export function SkillAdminManager() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { toast } = useToast();
  const [groups, setGroups] = React.useState<SkillGroupItem[]>([]);
  const [skills, setSkills] = React.useState<IntelligenceSkill[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [activeView, setActiveView] = React.useState<string>("");

  const [groupModalOpen, setGroupModalOpen] = React.useState(false);
  const [editingGroup, setEditingGroup] = React.useState<SkillGroupItem | null>(null);
  const [groupForm, setGroupForm] = React.useState({ name: "", description: "" });

  const [editorOpen, setEditorOpen] = React.useState(false);
  const [editorMode, setEditorMode] = React.useState<"create" | "edit">("edit");
  const [editorSkillId, setEditorSkillId] = React.useState<string | null>(null);

  const loadData = React.useCallback(async () => {
    setLoading(true);
    try {
      const [g, s] = await Promise.all([listSkillGroups(), intelligenceSkillApi.list()]);
      setGroups(g);
      setSkills(s);
      setActiveView((prev) => {
        if (prev && g.some((gr) => gr.id === prev)) return prev;
        return g[0]?.id ?? "";
      });
    } catch (e: unknown) {
      toast({
        type: "error",
        title: "加载失败",
        description: e instanceof Error ? e.message : String(e),
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  React.useEffect(() => {
    loadData();
  }, [loadData]);

  React.useEffect(() => {
    const tab = searchParams.get("tab");
    const skillId = searchParams.get("skillId");
    if (tab === "playground" || skillId) {
      if (skillId) {
        setEditorMode("edit");
        setEditorSkillId(skillId);
        setEditorOpen(true);
      }
      setSearchParams({ tab: "skills" }, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const openCreateGroup = () => {
    setEditingGroup(null);
    setGroupForm({ name: "", description: "" });
    setGroupModalOpen(true);
  };

  const openEditGroup = (g: SkillGroupItem) => {
    setEditingGroup(g);
    setGroupForm({ name: g.name, description: g.description || "" });
    setGroupModalOpen(true);
  };

  const handleSaveGroup = async () => {
    if (!groupForm.name.trim()) {
      toast({ type: "warning", title: "请填写分组名称" });
      return;
    }
    try {
      if (editingGroup) {
        await updateSkillGroup(editingGroup.id, {
          name: groupForm.name.trim(),
          description: groupForm.description.trim() || undefined,
          skill_ids: editingGroup.skill_ids,
        });
        toast({ type: "success", title: "分组已更新" });
      } else {
        await createSkillGroup({
          name: groupForm.name.trim(),
          description: groupForm.description.trim() || undefined,
          skill_ids: [],
        });
        toast({ type: "success", title: "分组已创建" });
      }
      setGroupModalOpen(false);
      loadData();
    } catch (e: unknown) {
      toast({
        type: "error",
        title: "保存失败",
        description: e instanceof Error ? e.message : String(e),
      });
    }
  };

  const handleDeleteGroup = async (g: SkillGroupItem) => {
    if (!window.confirm(`确定删除分组 "${g.name}" 吗？`)) return;
    try {
      await deleteSkillGroup(g.id);
      toast({ type: "success", title: "分组已删除" });
      if (activeView === g.id) {
        setActiveView((prev) => {
          const remaining = groups.filter((gr) => gr.id !== g.id);
          return remaining[0]?.id ?? "";
        });
      }
      loadData();
    } catch (e: unknown) {
      toast({
        type: "error",
        title: "删除失败",
        description: e instanceof Error ? e.message : String(e),
      });
    }
  };

  const handleCreateSkill = async (payload: SkillEditorPayload, groupId: string) => {
    const created = await intelligenceSkillApi.create({
      ...payload,
      group_id: groupId || undefined,
    });
    const group = groups.find((g) => g.id === groupId);
    if (group && created?.key && !group.skill_ids.includes(created.key)) {
      await updateSkillGroup(group.id, {
        name: group.name,
        description: group.description,
        skill_ids: [...group.skill_ids, created.key],
      });
    }
    return created;
  };

  const handleUpdateSkill = async (id: string, payload: SkillEditorPayload, groupId: string) => {
    await intelligenceSkillApi.update(id, {
      ...payload,
      group_id: groupId || undefined,
    });
  };

  const handleDeleteSkill = async (skill: IntelligenceSkill) => {
    if (!window.confirm(`确定删除技能 "${skill.name}" 吗？此操作不可恢复。`)) return;
    try {
      await intelligenceSkillApi.delete(skill.id);
      toast({ type: "success", title: "技能已删除" });
      await loadData();
    } catch (e: unknown) {
      toast({
        type: "error",
        title: "删除失败",
        description: e instanceof Error ? e.message : String(e),
      });
    }
  };

  const handleRestoreDefault = async (skill: IntelligenceSkill) => {
    if (!window.confirm(`将「${skill.name}」恢复为系统内置版本，当前自定义修改会丢失。确定继续？`)) return;
    try {
      await intelligenceSkillApi.restoreDefault(skill.id);
      toast({ type: "success", title: "已恢复默认" });
      await loadData();
    } catch (e: unknown) {
      toast({
        type: "error",
        title: "恢复失败",
        description: e instanceof Error ? e.message : String(e),
      });
    }
  };

  const activeGroup = groups.find((g) => g.id === activeView);

  const getSkillsInGroup = (g: SkillGroupItem) => {
    const map = new Map(skills.map((s) => [s.key, s]));
    return g.skill_ids.map((key) => map.get(key)).filter(Boolean) as IntelligenceSkill[];
  };

  const openEditor = (mode: "create" | "edit", skillId?: string) => {
    setEditorMode(mode);
    setEditorSkillId(skillId ?? null);
    setEditorOpen(true);
  };

  const handleMoveSkill = async (g: SkillGroupItem, index: number, direction: -1 | 1) => {
    const newIds = [...g.skill_ids];
    const target = index + direction;
    if (target < 0 || target >= newIds.length) return;
    [newIds[index], newIds[target]] = [newIds[target], newIds[index]];
    try {
      await updateSkillGroup(g.id, {
        name: g.name,
        description: g.description,
        skill_ids: newIds,
      });
      setGroups((prev) => prev.map((gr) => (gr.id === g.id ? { ...gr, skill_ids: newIds } : gr)));
    } catch (e: unknown) {
      toast({
        type: "error",
        title: "调整失败",
        description: e instanceof Error ? e.message : String(e),
      });
    }
  };

  const handleRemoveSkillFromGroup = async (g: SkillGroupItem, key: string) => {
    const newIds = g.skill_ids.filter((k) => k !== key);
    try {
      await updateSkillGroup(g.id, {
        name: g.name,
        description: g.description,
        skill_ids: newIds,
      });
      setGroups((prev) => prev.map((gr) => (gr.id === g.id ? { ...gr, skill_ids: newIds } : gr)));
    } catch (e: unknown) {
      toast({
        type: "error",
        title: "移除失败",
        description: e instanceof Error ? e.message : String(e),
      });
    }
  };

  const groupSkills = activeGroup ? getSkillsInGroup(activeGroup) : [];

  return (
    <div className="flex h-full">
      <aside className="w-56 flex-shrink-0 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 flex flex-col">
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Puzzle size={16} className="text-blue-600" />
              技能分组
            </h2>
            <button
              onClick={openCreateGroup}
              className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"
              title="新建分组"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>
        <nav className="flex-1 py-2 overflow-y-auto">
          {groups.length === 0 && !loading && (
            <p className="px-4 py-3 text-xs text-gray-400">暂无技能分组，请新建</p>
          )}
          {groups.map((g) => (
            <div
              key={g.id}
              onClick={() => setActiveView(g.id)}
              className={cn(
                "w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium transition-colors group cursor-pointer",
                activeView === g.id
                  ? "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300 border-r-2 border-blue-600"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50"
              )}
            >
              <Puzzle size={16} />
              <span className="truncate flex-1 text-left">{g.name}</span>
              <span className="text-xs text-gray-400">{g.skill_ids.length}</span>
              <div className="hidden group-hover:flex items-center gap-0.5">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openEditGroup(g);
                  }}
                  className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-400"
                >
                  <Pencil size={11} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteGroup(g);
                  }}
                  className="p-1 rounded hover:bg-red-100 dark:hover:bg-red-500/20 text-gray-400 hover:text-red-600"
                >
                  <Trash2 size={11} />
                </button>
              </div>
            </div>
          ))}
        </nav>
      </aside>

      <main className="flex-1 min-w-0 overflow-auto bg-gray-50 dark:bg-gray-950 p-6">
        {activeGroup ? (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">{activeGroup.name}</h1>
                <p className="text-sm text-gray-500 mt-1">{activeGroup.description || "管理分组内的技能顺序"}</p>
              </div>
              <Button onClick={() => openEditor("create")} className="gap-1.5">
                <Plus size={16} />
                新建技能
              </Button>
            </div>

            {groupSkills.length === 0 ? (
              <div className="text-center py-16">
                <Puzzle size={24} className="mx-auto mb-3 text-gray-300" />
                <p className="text-sm text-gray-400">分组内暂无技能，请点击「新建技能」</p>
              </div>
            ) : (
              <div className="space-y-2">
                {groupSkills.map((item, idx) => (
                  <div
                    key={item.id}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-all",
                      item.is_enabled
                        ? "border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950"
                        : "border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 opacity-60"
                    )}
                  >
                    <div className="text-gray-400">
                      <GripVertical size={14} />
                    </div>
                    <div
                      className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                        item.is_enabled ? "bg-blue-50 text-blue-600" : "bg-gray-100 text-gray-400"
                      )}
                    >
                      <SkillIcon
                        name={item.icon}
                        size={14}
                        fallback={<span className="text-xs font-bold">{item.name.charAt(0)}</span>}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200">{item.name}</h3>
                        <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-500 text-[11px] rounded-full">
                          {item.key}
                        </span>
                        {!item.is_enabled && (
                          <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-400 text-[11px] rounded-full">
                            已禁用
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 line-clamp-1">{item.description || "无描述"}</p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      {isBuiltinIntelligenceSkill(item.key) && (
                        <button
                          onClick={() => handleRestoreDefault(item)}
                          className="p-1.5 rounded-md hover:bg-blue-50 text-gray-400 hover:text-blue-600"
                          title="恢复默认"
                        >
                          <RotateCcw size={14} />
                        </button>
                      )}
                      <button
                        onClick={() => openEditor("edit", item.id)}
                        className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400"
                        title="编辑"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => handleDeleteSkill(item)}
                        className="p-1.5 rounded-md hover:bg-red-50 text-gray-400 hover:text-red-600"
                        title="删除"
                      >
                        <Trash2 size={14} />
                      </button>
                      <button
                        onClick={() => handleMoveSkill(activeGroup, idx, -1)}
                        disabled={idx === 0}
                        className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 disabled:opacity-30"
                      >
                        <ChevronUp size={14} />
                      </button>
                      <button
                        onClick={() => handleMoveSkill(activeGroup, idx, 1)}
                        disabled={idx === activeGroup.skill_ids.length - 1}
                        className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 disabled:opacity-30"
                      >
                        <ChevronDown size={14} />
                      </button>
                      <button
                        onClick={() => handleRemoveSkillFromGroup(activeGroup, item.key)}
                        className="p-1.5 rounded-md hover:bg-red-50 dark:hover:bg-red-500/10 text-gray-400 hover:text-red-600"
                        title="从分组移除"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-16">
            <Puzzle size={24} className="mx-auto mb-3 text-gray-300" />
            <p className="text-sm text-gray-400">{loading ? "加载中…" : "请选择或创建技能分组"}</p>
          </div>
        )}
      </main>

      <Dialog open={groupModalOpen} onOpenChange={setGroupModalOpen}>
        <DialogContent onOpenChange={() => setGroupModalOpen(false)} className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editingGroup ? "编辑分组" : "新建分组"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <label className="block text-sm font-medium mb-1">名称</label>
              <input
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 text-sm"
                value={groupForm.name}
                onChange={(e) => setGroupForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="分组名称"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">描述</label>
              <input
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 text-sm"
                value={groupForm.description}
                onChange={(e) => setGroupForm((f) => ({ ...f, description: e.target.value }))}
                placeholder="描述"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setGroupModalOpen(false)}>
              取消
            </Button>
            <Button onClick={handleSaveGroup}>{editingGroup ? "保存" : "创建"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <SkillEditorWorkspace
        open={editorOpen}
        onClose={() => {
          setEditorOpen(false);
          setEditorSkillId(null);
        }}
        groups={groups}
        allSkills={skills}
        initialGroupId={activeView}
        initialSkillId={editorSkillId}
        mode={editorMode}
        onSaved={loadData}
        onCreate={handleCreateSkill}
        onUpdate={handleUpdateSkill}
      />
    </div>
  );
}
