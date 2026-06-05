import { cn } from "@/lib/utils";

export function LogoIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("size-5 text-primary", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      aria-hidden="true"
    >
      <path d="M2 14 Q6 8 12 14 T22 14" strokeLinecap="round" />
      <path d="M2 18 Q6 12 12 18 T22 18" strokeLinecap="round" opacity={0.5} />
    </svg>
  );
}

const markSizes = {
  xs: { box: "w-5 h-5", icon: "size-3" },
  sm: { box: "w-7 h-7", icon: "size-3.5" },
  md: { box: "w-10 h-10", icon: "size-5" },
  nav: { box: "w-9 h-9", icon: "size-5" },
  lg: { box: "w-12 h-12", icon: "size-6" },
  xl: { box: "w-16 h-16", icon: "size-8" },
} as const;

export function LogoMark({
  className,
  iconClassName,
  size = "md",
}: {
  className?: string;
  iconClassName?: string;
  size?: keyof typeof markSizes;
}) {
  const s = markSizes[size];
  return (
    <div
      className={cn(
        "rounded-lg bg-blue-600 flex items-center justify-center text-white shrink-0",
        s.box,
        className,
      )}
    >
      <LogoIcon className={cn(s.icon, "text-white", iconClassName)} />
    </div>
  );
}

export function Logo({
  collapsed = false,
  title,
  subtitle,
  className,
}: {
  collapsed?: boolean;
  title?: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-2 px-3 py-2.5", className)}>
      <div className="relative">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-700 to-blue-800 flex items-center justify-center shadow-sm shadow-blue-700/20">
          <LogoIcon className="size-3.5 text-white" />
        </div>
        {!collapsed && (
          <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-gray-900 bg-emerald-500" />
        )}
      </div>
      {!collapsed && title ? (
        <div className="flex flex-col">
          <span className="text-sm font-bold tracking-tight text-gray-900 dark:text-white leading-tight">
            {title}
          </span>
          {subtitle ? (
            <span className="text-[10px] text-gray-500 dark:text-gray-400 leading-tight -mt-0.5">
              {subtitle}
            </span>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
