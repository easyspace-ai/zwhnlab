import * as React from "react";
import {
  Bell,
  Search,
  Settings,
  HelpCircle,
  Menu,
  Command,
  PanelLeft,
  PanelRight,
  KeyRound,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import { isAdmin } from "@/lib/authApi";
import { Button } from "@/components/ui/button";
import { useWorkbenchChrome } from "@/components/layout/WorkbenchChromeContext";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { changePassword } from "@/lib/authApi";
import { useToast } from "@/components/ui/toast";
import { LogoIcon } from "@/components/Logo";

// Breadcrumb 配置
const BREADCRUMB_LABELS: Record<string, string> = {
  analysis: "AI 分析",
  "daily-selection": "每日选股",
  "expert-analysis": "专家分析",
  market: "市场数据",
  picker: "智能选股",
  backtest: "策略回测",
  strategies: "策略管理",
  eod: "尾盘选股",
  momentum: "动量扫描",
  kunpeng: "鲲鹏策略",
  "ai-session": "AI 会话",
  aichat: "AI 研究",
  "osint-dashboard": "情报研究",
  ppt: "PPT Studio",
};

// Workspace Switcher - COMPACT
function WorkspaceSwitcher() {
  return (
    <button className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
      <div className="w-5 h-5 rounded-md bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
        <LogoIcon className="size-3 text-white" />
      </div>
      {/* <span className="text-xs font-semibold text-gray-700 dark:text-gray-200">
        量化平台
      </span> */}
    </button>
  );
}

// Search Bar - COMPACT
function SearchBar({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="hidden md:flex items-center gap-2 flex-1 max-w-md px-2.5 py-1.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all shadow-sm"
    >
      <Search size={14} className="text-gray-400" />
      <span className="text-xs text-gray-400 flex-1 text-left">
        搜索功能、数据、策略...
      </span>
      <kbd className="hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-[9px] font-medium text-gray-500">
        <Command size={9} />
        K
      </kbd>
    </button>
  );
}

// Quick Actions - COMPACT
function QuickActions() {
  return (
    <div className="flex items-center gap-0.5">
      <Button variant="ghost" size="icon" className="w-7 h-7 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
        <HelpCircle size={15} />
      </Button>
      <Button variant="ghost" size="icon" className="w-7 h-7 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 relative">
        <Bell size={15} />
        <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-red-500 border border-white dark:border-gray-950" />
      </Button>
      <Button variant="ghost" size="icon" className="w-7 h-7 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
        <Settings size={15} />
      </Button>
    </div>
  );
}

// Breadcrumb - COMPACT
function Breadcrumb({ pathname }: { pathname: string }) {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) return null;

  return (
    <div className="hidden sm:flex items-center gap-1.5 text-xs">
      {segments.map((segment, index) => {
        const label = BREADCRUMB_LABELS[segment] || segment;
        const isLast = index === segments.length - 1;

        return (
          <React.Fragment key={segment}>
            <span
              className={cn(
                "text-xs font-medium",
                isLast
                  ? "text-gray-900 dark:text-white"
                  : "text-gray-500 dark:text-gray-400"
              )}
            >
              {label}
            </span>
            {!isLast && (
              <span className="text-gray-300 dark:text-gray-600 text-[10px]">/</span>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// Mobile Menu Button - COMPACT
function MobileMenuButton({ onClick }: { onClick?: () => void }) {
  return (
    <Button variant="ghost" size="icon" className="md:hidden w-7 h-7" onClick={onClick}>
      <Menu size={16} />
    </Button>
  );
}

function ChangePasswordMenuItem({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 w-full text-left"
    >
      <KeyRound size={14} />
      修改密码
    </button>
  );
}

/** 专业顶部栏 - COMPACT */
export function SaasTopBar({ onMenuClick }: { onMenuClick?: () => void }) {
  const { toggleLeft, toggleRight } = useWorkbenchChrome();
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const analysisWorkbenchNoLeft =
    location.pathname === "/analysis" || location.pathname.startsWith("/analysis/");
  /** 市场 / DailyAPI 工作台无右侧栏，不展示 Panel Right */
  const marketWorkbenchNoRight =
    location.pathname === "/market" || location.pathname.startsWith("/market/");
  const dailyWorkbenchNoRight =
    location.pathname === "/daily-selection" || location.pathname === "/expert-analysis";
  const intelWorkbenchNoRight =
    location.pathname === "/ai-session" ||
    location.pathname.startsWith("/ai-session/");
  const pptWorkbenchNoRight =
    location.pathname === "/ppt" ||
    location.pathname.startsWith("/ppt/") ||
    location.pathname === "/ppthtml" ||
    location.pathname.startsWith("/ppthtml/") ||
    location.pathname === "/pptxgenjs" ||
    location.pathname.startsWith("/pptxgenjs/");
  /** 全局隐藏搜索、帮助、通知、设置；用户菜单始终保留 */
  const hideTopBarUtilities = true;

  // Change password modal state
  const [pwdOpen, setPwdOpen] = React.useState(false);
  const [oldPassword, setOldPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [pwdSaving, setPwdSaving] = React.useState(false);
  const { toast } = useToast();

  React.useEffect(() => {
    if (!menuOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (menuRef.current?.contains(event.target as Node)) return;
      setMenuOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      toast({ type: "warning", title: "新密码至少6位" });
      return;
    }
    if (newPassword !== confirmPassword) {
      toast({ type: "warning", title: "两次输入的新密码不一致" });
      return;
    }
    setPwdSaving(true);
    try {
      await changePassword(oldPassword, newPassword);
      toast({ type: "success", title: "密码修改成功" });
      setPwdOpen(false);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      toast({ type: "error", title: "修改失败", description: err.message });
    } finally {
      setPwdSaving(false);
    }
  };

  return (
    <>
    <header className="sticky top-0 z-30 w-full h-[44px] bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center justify-between h-full px-3 gap-2">
        {/* 左侧区域 - 左侧边栏控制按钮在最前面 */}
        <div className="flex items-center gap-2">
          <MobileMenuButton onClick={onMenuClick} />
          {!analysisWorkbenchNoLeft ? (
            <Button variant="ghost" size="icon" className="w-7 h-7 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" onClick={toggleLeft}>
              <PanelLeft size={15} />
            </Button>
          ) : null}
          {/* <div className="hidden md:block h-4 w-px bg-gray-200 dark:bg-gray-800" /> */}
          {/* <WorkspaceSwitcher /> */}
          {/* <div className="hidden md:block h-4 w-px bg-gray-200 dark:bg-gray-800" /> */}
          <Breadcrumb pathname={location.pathname} />
        </div>

        {/* 中间搜索区域（已全局隐藏） */}
        {!hideTopBarUtilities ? <SearchBar onClick={() => {}} /> : <div className="flex-1" />}

        {/* 右侧区域 - 右侧边栏控制按钮在最后面 */}
        <div className="flex items-center gap-0.5">
          {!hideTopBarUtilities ? (
            <>
              <QuickActions />
              <div className="h-4 w-px bg-gray-200 dark:bg-gray-800 mx-1" />
            </>
          ) : null}

          {/* 右侧边栏控制按钮（市场页无右栏，不展示） */}
          {!(marketWorkbenchNoRight || dailyWorkbenchNoRight || intelWorkbenchNoRight || pptWorkbenchNoRight) ? (
            <Button variant="ghost" size="icon" className="w-7 h-7 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" onClick={toggleRight}>
              <PanelRight size={15} />
            </Button>
          ) : null}

          {/* 当前用户下拉菜单（所有用户、所有路由） */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="flex items-center gap-1.5 pl-1.5 pr-2.5 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="relative">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white text-[11px] font-semibold">
                  {(user?.name || user?.username || "Q").charAt(0)}
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border-2 border-white dark:border-gray-950 bg-emerald-500" />
              </div>
              <div className="hidden sm:flex flex-col items-start">
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-200 leading-tight">
                  {user?.name || user?.username || "用户"}
                </span>
              </div>
            </button>
            {menuOpen && (
              <div className="absolute right-0 top-full mt-1 w-44 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg z-50 py-1">
                <div className="px-3 py-2 border-b border-gray-100 dark:border-gray-800">
                  <p className="text-xs font-semibold text-gray-900 dark:text-white truncate">{user?.username || "用户"}</p>
                  <p className="text-[10px] text-gray-500 truncate">{user?.email || ""}</p>
                  {isAdmin(user) ? (
                    <span className="inline-block mt-1 text-[10px] font-medium text-blue-600 dark:text-blue-400">
                      超级管理员
                    </span>
                  ) : null}
                </div>
                {isAdmin(user) ? (
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      navigate("/admin");
                    }}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 w-full text-left"
                  >
                    <ShieldCheck size={14} />
                    系统管理
                  </button>
                ) : null}
                <ChangePasswordMenuItem onClick={() => { setMenuOpen(false); setPwdOpen(true); }} />
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    logout().then(() => navigate("/login", { replace: true }));
                  }}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 w-full text-left"
                >
                  <LogOut size={14} />
                  退出登录
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>

    {/* Change password modal — rendered outside dropdown to survive menu close */}
    <Dialog open={pwdOpen} onOpenChange={setPwdOpen}>
      <DialogContent onOpenChange={setPwdOpen}>
        <DialogHeader>
          <DialogTitle>修改密码</DialogTitle>
        </DialogHeader>
        <form onSubmit={handlePasswordSubmit} className="space-y-4 mt-4">
          <div>
            <label className="block text-sm font-medium mb-1">旧密码</label>
            <input
              type="password"
              required
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 text-sm"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="输入当前密码"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">新密码</label>
            <input
              type="password"
              required
              minLength={6}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 text-sm"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="至少6位"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">确认新密码</label>
            <input
              type="password"
              required
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 text-sm"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="再次输入新密码"
            />
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <Button variant="ghost" type="button" onClick={() => setPwdOpen(false)}>取消</Button>
            <Button type="submit" disabled={pwdSaving}>{pwdSaving ? "保存中…" : "保存"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
    </>
  );
}
