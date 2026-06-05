import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Resizable, ResizableHandle, ResizablePanel } from "@/components/ui/resizable";
import { cn } from "@/lib/utils";

type StoredPanelPrefs = {
  leftWidthPx?: number;
  rightWidthPx?: number;
  rightWidthPct?: number;
};

function loadPanelPrefs(storageKey: string): StoredPanelPrefs | null {
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return null;
    return JSON.parse(raw) as StoredPanelPrefs;
  } catch {
    return null;
  }
}

function savePanelPrefs(storageKey: string, prefs: StoredPanelPrefs) {
  try {
    localStorage.setItem(storageKey, JSON.stringify(prefs));
  } catch {
    /* quota / private mode */
  }
}

type WorkbenchLayoutProps = {
  left?: ReactNode;
  main: ReactNode;
  right: ReactNode;
  className?: string;
  innerClassName?: string;
  mainClassName?: string;
  leftPanelId?: string;
  mainPanelId?: string;
  rightPanelId?: string;
  leftMinPx?: number;
  leftMaxPx?: number;
  rightMinPx?: number;
  rightMaxPx?: number;
  leftDefaultPx?: number;
  rightDefaultPx?: number;
  /** When set, overrides rightDefaultPx as a percentage of the container (e.g. 50). */
  rightDefaultPct?: number;
  leftSidebarVisible?: boolean;
  rightSidebarVisible?: boolean;
  /** Persist panel widths to localStorage under this key. */
  storageKey?: string;
  resizeHandleWithGrip?: boolean;
};

export function WorkbenchLayout({
  left,
  main,
  right,
  className,
  innerClassName,
  mainClassName,
  leftPanelId = "workbench-left",
  mainPanelId = "workbench-main",
  rightPanelId = "workbench-right",
  leftMinPx = 280,
  leftMaxPx = 480,
  rightMinPx = 280,
  rightMaxPx = 480,
  leftDefaultPx = 280,
  rightDefaultPx = 280,
  rightDefaultPct,
  leftSidebarVisible = true,
  rightSidebarVisible = true,
  storageKey,
  resizeHandleWithGrip = false,
}: WorkbenchLayoutProps) {
  const storedPrefs = useMemo(
    () => (storageKey ? loadPanelPrefs(storageKey) : null),
    [storageKey],
  );

  const [leftSidebarWidth, setLeftSidebarWidthState] = useState(
    () => storedPrefs?.leftWidthPx ?? leftDefaultPx,
  );
  const [rightSidebarWidth, setRightSidebarWidthState] = useState(
    () => storedPrefs?.rightWidthPx ?? rightDefaultPx,
  );
  const [rightSidebarPct, setRightSidebarPct] = useState<number | null>(
    () => storedPrefs?.rightWidthPct ?? rightDefaultPct ?? null,
  );

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const toPct = useMemo(
    () => (px: number) => {
      if (!containerWidth || containerWidth <= 0) return 20;
      return Math.max(0, Math.min(100, (px / containerWidth) * 100));
    },
    [containerWidth],
  );

  const leftDefaultSize = toPct(leftSidebarWidth);
  const rightDefaultSize =
    rightSidebarPct != null ? rightSidebarPct : toPct(rightSidebarWidth);

  const persistWidths = (next: StoredPanelPrefs) => {
    if (!storageKey) return;
    const merged = { ...storedPrefs, ...next };
    savePanelPrefs(storageKey, merged);
  };

  const onLeftResize = (size: number) => {
    if (!containerWidth) return;
    const px = Math.round((size / 100) * containerWidth);
    setLeftSidebarWidthState(px);
    persistWidths({ leftWidthPx: px });
  };

  const onRightResize = (size: number) => {
    setRightSidebarPct(size);
    if (containerWidth) {
      const px = Math.round((size / 100) * containerWidth);
      setRightSidebarWidthState(px);
      persistWidths({ rightWidthPx: px, rightWidthPct: size });
    } else {
      persistWidths({ rightWidthPct: size });
    }
  };

  const layoutKey = `${leftSidebarVisible ? "L" : ""}${rightSidebarVisible ? "R" : ""}`;

  const handleClass = cn(
    "w-1.5 bg-slate-200/80 hover:bg-blue-300/60 dark:bg-slate-800 dark:hover:bg-blue-600/40",
    resizeHandleWithGrip && "cursor-col-resize",
  );

  return (
    <div className={cn("flex h-full min-h-0 flex-1 min-w-0 overflow-hidden", className)}>
      <div
        className={cn("flex h-full min-h-0 flex-1 min-w-0 overflow-hidden", innerClassName)}
        ref={containerRef}
      >
        <Resizable direction="horizontal" className="flex h-full min-h-0 flex-1 min-w-0" key={layoutKey}>
          {leftSidebarVisible && left != null && (
            <>
              <ResizablePanel
                id={leftPanelId}
                order={1}
                className="h-full min-h-0 overflow-hidden"
                defaultSize={leftDefaultSize}
                minSize={toPct(leftMinPx)}
                maxSize={toPct(leftMaxPx)}
                onResize={onLeftResize}
              >
                {left}
              </ResizablePanel>
              <ResizableHandle className={handleClass} withHandle={resizeHandleWithGrip} />
            </>
          )}

          <ResizablePanel
            id={mainPanelId}
            order={2}
            className={cn("h-full min-h-0 overflow-hidden flex-1 min-w-0", mainClassName)}
          >
            {main}
          </ResizablePanel>

          {rightSidebarVisible && (
            <>
              <ResizableHandle className={handleClass} withHandle={resizeHandleWithGrip} />
              <ResizablePanel
                id={rightPanelId}
                order={3}
                className="h-full min-h-0 overflow-hidden"
                defaultSize={rightDefaultSize}
                minSize={toPct(rightMinPx)}
                maxSize={toPct(rightMaxPx)}
                onResize={onRightResize}
              >
                {right}
              </ResizablePanel>
            </>
          )}
        </Resizable>
      </div>
    </div>
  );
}
