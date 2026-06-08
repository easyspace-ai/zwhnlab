import * as React from "react";
import { useSearchParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Users,
  Shield,
  Puzzle,
  Lock,
  KeyRound,
  Database,
} from "lucide-react";
import { UserManager } from "./UserManager";
import { RoleManager } from "./RoleManager";
import { SkillAdminManager } from "./SkillAdminManager";
import { ChangePasswordModal } from "./ChangePasswordModal";
import { SystemSettingsPanel } from "./SystemSettingsPanel";
import { XStreamDataPanel } from "./XStreamDataPanel";

const TABS = [
  { id: "users", label: "用户管理", icon: Users },
  { id: "roles", label: "权限管理", icon: Shield },
  { id: "skills", label: "技能管理", icon: Puzzle },
  { id: "data", label: "情报数据", icon: Database },
  { id: "profile", label: "修改密码", icon: KeyRound },
];

export function AdminRouteLayout() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "users";

  return (
    <div className="flex h-full w-full overflow-hidden">
      {/* 左侧管理菜单 */}
      <aside className="w-[200px] flex-shrink-0 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 flex flex-col">
        <div className="px-4 py-4 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Lock size={16} className="text-blue-600" />
            系统管理
          </h2>
        </div>
        <nav className="flex-1 py-2">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSearchParams({ tab: tab.id })}
                className={cn(
                  "w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300 border-r-2 border-blue-600"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                )}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* 右侧内容 */}
      <main className="flex-1 min-w-0 overflow-auto bg-gray-50 dark:bg-gray-950 p-6">
        {activeTab === "users" && <UserManager />}
        {activeTab === "roles" && <RoleManager />}
        {activeTab === "skills" && <SkillAdminManager />}
        {activeTab === "data" && <XStreamDataPanel />}
        {activeTab === "settings" && <SystemSettingsPanel />}
        {activeTab === "profile" && (
          <div className="max-w-xl mx-auto">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-6">修改密码</h1>
            <ChangePasswordModal />
          </div>
        )}
      </main>
    </div>
  );
}
