import * as React from "react";
import { Route, Routes } from "react-router-dom";
import { useOsintAuth } from "@/osint/auth";
import { DialogProvider } from "@/osint/components/ui/Dialog";
import { ToastProvider } from "@/osint/components/ui/Feedback";

const IntelligenceHome = React.lazy(() => import("@/osint/pages/IntelligenceHome"));

export function OsintSessionRouteShell() {
  const { user, ready } = useOsintAuth();

  if (!ready) {
    return (
      <div className="flex h-full min-h-0 items-center justify-center bg-gray-50 text-sm text-slate-500 dark:bg-gray-950">
        加载中…
      </div>
    );
  }
  if (!user) {
    return (
      <div className="flex h-full min-h-0 items-center justify-center bg-gray-50 p-6 text-sm text-red-600 dark:bg-gray-950">
        未登录或会话已失效，请返回重新登录。
      </div>
    );
  }

  return (
    <DialogProvider>
      <ToastProvider>
        <React.Suspense
          fallback={
            <div className="flex h-full min-h-0 items-center justify-center bg-gray-50 text-sm text-slate-500 dark:bg-gray-950">
              加载情报工作台…
            </div>
          }
        >
          <div className="flex h-full min-h-0 flex-1 flex-col">
            <Routes>
              <Route path="sessions/:sessionId" element={<IntelligenceHome />} />
              <Route path="*" element={<IntelligenceHome />} />
            </Routes>
          </div>
        </React.Suspense>
      </ToastProvider>
    </DialogProvider>
  );
}
