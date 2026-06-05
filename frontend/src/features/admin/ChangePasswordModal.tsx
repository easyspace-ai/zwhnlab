import * as React from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { changePassword } from "@/lib/authApi";
import { Eye, EyeOff } from "lucide-react";

export function ChangePasswordModal() {
  const { toast } = useToast();
  const [oldPassword, setOldPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [showOld, setShowOld] = React.useState(false);
  const [showNew, setShowNew] = React.useState(false);
  const [saving, setSaving] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      toast({ type: "warning", title: "新密码至少6位" });
      return;
    }
    if (newPassword !== confirmPassword) {
      toast({ type: "warning", title: "两次输入的新密码不一致" });
      return;
    }
    setSaving(true);
    try {
      await changePassword(oldPassword, newPassword);
      toast({ type: "success", title: "密码修改成功" });
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      toast({ type: "error", title: "修改失败", description: err.message });
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 space-y-5">
      <div>
        <label className="block text-sm font-medium mb-1.5">旧密码</label>
        <div className="relative">
          <input
            type={showOld ? "text" : "password"}
            required
            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 text-sm pr-10"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            placeholder="输入当前密码"
          />
          <button type="button" onClick={() => setShowOld(!showOld)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
            {showOld ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1.5">新密码</label>
        <div className="relative">
          <input
            type={showNew ? "text" : "password"}
            required
            minLength={6}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 text-sm pr-10"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="至少6位"
          />
          <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
            {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1.5">确认新密码</label>
        <input
          type="password"
          required
          className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 text-sm"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="再次输入新密码"
        />
      </div>
      <div className="pt-2">
        <Button type="submit" disabled={saving} className="w-full">
          {saving ? "保存中…" : "修改密码"}
        </Button>
      </div>
    </form>
  );
}
