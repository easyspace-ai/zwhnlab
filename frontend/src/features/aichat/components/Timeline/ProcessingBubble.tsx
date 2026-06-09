/** Pre-first-token assistant placeholder — mirrors osint-dashboard phase line in bubble chrome. */
export function ProcessingBubble({ label }: { label: string }) {
  return (
    <div
      className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm dark:border-slate-600 dark:bg-slate-900"
      role="status"
      aria-live="polite"
    >
      <span className="italic text-slate-500 dark:text-slate-400">{label}</span>
    </div>
  )
}
