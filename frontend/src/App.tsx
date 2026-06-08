import * as React from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { SaasSidebar } from "./components/layout/SaasSidebar";
import { AdminRouteLayout } from "./features/admin/AdminRouteLayout";
import { SaasTopBar } from "./components/layout/SaasTopBar";
import { WorkbenchChromeProvider } from "./components/layout/WorkbenchChromeContext";
import { ConfirmDialogProvider } from "./components/ui/confirm-dialog";
import { ToastProvider } from "./components/ui/toast";
import { LoginPage } from "./components/auth/LoginPage";
import { RegisterPage } from "./components/auth/RegisterPage";
import { PlaceholderWorkbench } from "./components/workbench/PlaceholderWorkbench";
import { MarketRouteLayout } from "./features/market/MarketRouteLayout";
import { AnalysisRouteLayout } from "./features/analysis/AnalysisRouteLayout";
import { BacktestRouteLayout } from "./features/backtest/BacktestRouteLayout";
import { PickerRouteLayout } from "./features/picker/PickerRouteLayout";
import { DailySelectionPage } from "./features/daily/DailySelectionPage";
import { ExpertAnalysisPage } from "./features/daily/ExpertAnalysisPage";
import { EndOfDayPicker } from "./components/picker/pages/EndOfDayPicker/EndOfDayPicker";
import { MomentumScanner } from "./components/picker/pages/MomentumScanner/MomentumScanner";
import { KunpengScanner } from "./components/picker/pages/KunpengScanner/KunpengScanner";
import { PolymarketRouteLayout } from "./features/polymarket/PolymarketRouteLayout";
import { XStreamRouteLayout } from "./features/polymarket/XStreamRouteLayout";
import { DashboardRouteLayout } from "./features/dashboard/DashboardRouteLayout";
import { StudioRouteShell } from "./features/studio/StudioRouteShell";
import { PpthtmlRouteShell } from "./features/ppthtml/PpthtmlRouteShell";
import { PptxgenjsRouteShell } from "./features/pptxgenjs/PptxgenjsRouteShell";
import { SlideglanceRouteShell } from "./features/slideglance/SlideglanceRouteShell";
import { OsintSessionRouteShell } from "./features/osint/OsintSessionRouteShell";
import { OsintDashboardRouteShell } from "./features/osint-dashboard/OsintDashboardRouteShell";
import { AiChatRouteShell } from "./features/aichat/AiChatRouteShell";
import { useAuth } from "./contexts/AuthContext";
import { getOsintAccessToken, isTokenExpired } from "@/osint/auth";
import { fetchAuthConfig } from "./lib/authApi";
import {
  resolveDefaultHomeForUser,
  resolvePostLoginTarget,
} from "./lib/defaultRoutes";
import { RequireNavPermission } from "./components/auth/RequireNavPermission";
import { NAV_PERMISSION_KEYS } from "./lib/navPermissions";
import { useOsintAuthStore } from "@/osint/auth";

function DefaultHomeRedirect() {
  const { user } = useAuth();
  return <Navigate to={resolveDefaultHomeForUser(user)} replace />;
}

function LoginRoute() {
  const navigate = useNavigate();
  const location = useLocation();
  const fromState = (location.state as { from?: string } | null)?.from;

  return (
    <LoginPage
      onLoginSuccess={() => {
        const user = useOsintAuthStore.getState().user;
        navigate(resolvePostLoginTarget(user, fromState), { replace: true });
      }}
    />
  );
}

function RegisterRoute() {
  const navigate = useNavigate();
  const location = useLocation();
  const [allowed, setAllowed] = React.useState<boolean | null>(null);
  const fromState = (location.state as { from?: string } | null)?.from;

  React.useEffect(() => {
    void fetchAuthConfig().then((cfg) => setAllowed(cfg.registration_enabled));
  }, []);

  if (allowed === null) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#f7f9fb] text-slate-500 text-sm">
        加载中…
      </div>
    );
  }
  if (!allowed) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return (
    <RegisterPage
      onLoginClick={() => navigate("/login", { state: location.state })}
      onRegisterSuccess={() => {
        const user = useOsintAuthStore.getState().user;
        navigate(resolvePostLoginTarget(user, fromState), { replace: true });
      }}
    />
  );
}

/** 已登录用户不得访问登录/注册页 */
function GuestOnly({ children }: { children: React.ReactNode }) {
  const { user, ready } = useAuth();

  if (!ready) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#f7f9fb] text-slate-500 text-sm">
        加载中…
      </div>
    );
  }
  if (user) {
    return <Navigate to={resolveDefaultHomeForUser(user)} replace />;
  }
  return <>{children}</>;
}

/** 未登录不得进入工作台 */
function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, ready } = useAuth();
  const location = useLocation();
  const token = getOsintAccessToken();
  const hasValidToken = Boolean(token && !isTokenExpired(token));

  if (!ready) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50 dark:bg-slate-950 text-slate-500 text-sm">
        加载中…
      </div>
    );
  }
  if (!hasValidToken) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50 dark:bg-slate-950 text-slate-500 text-sm">
        网络异常，正在恢复会话…
      </div>
    );
  }
  return <>{children}</>;
}

/** 仅管理员可访问 */
function AdminOnly({ children }: { children: React.ReactNode }) {
  const { user, ready } = useAuth();
  if (!ready) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50 dark:bg-slate-950 text-slate-500 text-sm">
        加载中…
      </div>
    );
  }
  if (user?.role !== "admin") {
    return <Navigate to={resolveDefaultHomeForUser(user)} replace />;
  }
  return <>{children}</>;
}

function AppShell() {
  const [leftCollapsed, setLeftCollapsed] = React.useState(false);
  const [rightCollapsed, setRightCollapsed] = React.useState(false);
  const { user } = useAuth();

  const chrome = React.useMemo(
    () => ({
      leftCollapsed,
      rightCollapsed,
      toggleLeft: () => setLeftCollapsed((c) => !c),
      toggleRight: () => setRightCollapsed((c) => !c),
      setLeftCollapsed,
      setRightCollapsed,
    }),
    [leftCollapsed, rightCollapsed],
  );

  const sidebarWidth = "56px";

  return (
    <ToastProvider>
      <ConfirmDialogProvider>
        <WorkbenchChromeProvider value={chrome}>
          <div className="flex h-screen w-full bg-gray-50 dark:bg-gray-950 overflow-hidden font-sans selection:bg-blue-100 dark:selection:bg-blue-900/50">
            {/* 专业侧边栏 */}
            <SaasSidebar collapsed={true} user={user} />

            {/* 主内容区域 */}
            <div
              className="flex-1 flex flex-col overflow-hidden min-w-0 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
              style={{ marginLeft: sidebarWidth }}
            >
              {/* 专业顶部栏 */}
              <SaasTopBar />

              {/* 内容区域 */}
              <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
                <Routes>
                  <Route path="/" element={<DefaultHomeRedirect />} />
                  <Route path="/analysis/*" element={<AnalysisRouteLayout />} />
                  <Route path="/daily-selection" element={<DailySelectionPage />} />
                  <Route path="/expert-analysis" element={<ExpertAnalysisPage />} />
                  <Route path="/market/*" element={<MarketRouteLayout />} />
                  <Route
                    path="/polymarket/*"
                    element={
                      <RequireNavPermission permission={NAV_PERMISSION_KEYS.polymarket}>
                        <PolymarketRouteLayout />
                      </RequireNavPermission>
                    }
                  />
                  <Route
                    path="/x-stream"
                    element={
                      <RequireNavPermission permission={NAV_PERMISSION_KEYS.xstream}>
                        <XStreamRouteLayout />
                      </RequireNavPermission>
                    }
                  />
                  <Route
                    path="/dashboard"
                    element={
                      <RequireNavPermission permission={NAV_PERMISSION_KEYS.dashboard}>
                        <DashboardRouteLayout />
                      </RequireNavPermission>
                    }
                  />
                  {/* <Route path="/ai-session/*" element={<OsintSessionRouteShell />} /> */}
                  <Route
                    path="/osint-dashboard/*"
                    element={
                      <RequireNavPermission permission={NAV_PERMISSION_KEYS.osintDashboard}>
                        <OsintDashboardRouteShell />
                      </RequireNavPermission>
                    }
                  />
                  <Route
                    path="/aichat/*"
                    element={
                      <RequireNavPermission permission={NAV_PERMISSION_KEYS.aichat}>
                        <AiChatRouteShell />
                      </RequireNavPermission>
                    }
                  />
                  <Route
                    path="/ppt/*"
                    element={
                      <RequireNavPermission permission={NAV_PERMISSION_KEYS.ppt}>
                        <StudioRouteShell />
                      </RequireNavPermission>
                    }
                  />
                  <Route path="/ppthtml/*" element={<PpthtmlRouteShell />} />
                  <Route path="/pptxgenjs/*" element={<PptxgenjsRouteShell />} />
                  <Route path="/slideglance/*" element={<SlideglanceRouteShell />} />
                  <Route path="/picker" element={<PickerRouteLayout />}>
                    <Route index element={<Navigate to="eod" replace />} />
                    <Route path="eod" element={<EndOfDayPicker />} />
                    <Route path="momentum" element={<MomentumScanner />} />
                    <Route path="kunpeng" element={<KunpengScanner />} />
                  </Route>
                  <Route path="/backtest/*" element={<BacktestRouteLayout />} />
                  <Route path="/strategies/*" element={<PlaceholderWorkbench tab="strategy" />} />
                  <Route
                    path="/admin/*"
                    element={
                      <AdminOnly>
                        <AdminRouteLayout />
                      </AdminOnly>
                    }
                  />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </div>
            </div>
          </div>
        </WorkbenchChromeProvider>
      </ConfirmDialogProvider>
    </ToastProvider>
  );
}

export default function App() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <GuestOnly>
            <LoginRoute />
          </GuestOnly>
        }
      />
      <Route
        path="/register"
        element={
          <GuestOnly>
            <RegisterRoute />
          </GuestOnly>
        }
      />
      <Route
        path="*"
        element={
          <RequireAuth>
            <AppShell />
          </RequireAuth>
        }
      />
    </Routes>
  );
}
