import * as React from "react";

export type WorkbenchChromeState = {
  leftCollapsed: boolean;
  rightCollapsed: boolean;
  toggleLeft: () => void;
  toggleRight: () => void;
  setLeftCollapsed: (collapsed: boolean) => void;
  setRightCollapsed: (collapsed: boolean) => void;
};

const WorkbenchChromeContext = React.createContext<WorkbenchChromeState | null>(null);

export function WorkbenchChromeProvider({
  value,
  children,
}: {
  value: WorkbenchChromeState;
  children: React.ReactNode;
}) {
  return <WorkbenchChromeContext.Provider value={value}>{children}</WorkbenchChromeContext.Provider>;
}

export function useWorkbenchChrome(): WorkbenchChromeState {
  const ctx = React.useContext(WorkbenchChromeContext);
  if (!ctx) {
    throw new Error("useWorkbenchChrome must be used within WorkbenchChromeProvider");
  }
  return ctx;
}

/** 无 Provider 时返回 null（例如 osint 独立入口）；polyai 主壳内与 {@link useWorkbenchChrome} 等价。 */
export function useOptionalWorkbenchChrome(): WorkbenchChromeState | null {
  return React.useContext(WorkbenchChromeContext);
}
