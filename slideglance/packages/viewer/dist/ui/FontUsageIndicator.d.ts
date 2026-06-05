/**
 * Status-bar indicator that surfaces the deck's font fallback mapping.
 *
 * For every typeface referenced by the deck, the indicator probes the
 * SVG `font-family` chain via `document.fonts.check()` to identify the
 * actually-rendered font in the current browser. When at least one
 * authored typeface falls back to a substitute, a warning triangle
 * appears in the status bar; clicking it expands a popover with the
 * full mapping ("Calibri → Carlito", "맑은 고딕 → Noto Sans KR", …) so
 * the user can decide whether to install the original font.
 *
 * The probe runs once on mount and again whenever `fontUsage` or the
 * `FontFaceSet` changes. The mapping is exact about what we know
 * ("authored name X is being rendered as Y") and silent about what
 * we don't (PowerPoint-side line break parity).
 */
import { type CSSProperties, type ReactNode } from "react";
import type { TypefaceUsage } from "../types.js";
/**
 * One row in the rendered mapping table.
 * `effective` is the first chain entry that `document.fonts.check()`
 * confirmed as installed; `null` means none of the chain entries are
 * installed and the browser will fall back to the generic family.
 */
export interface FontMappingRow {
    requested: string;
    effective: string | null;
    isSubstitute: boolean;
}
export interface FontUsageIndicatorProps {
    /** Per-typeface usage report from the slide controller. */
    fontUsage: TypefaceUsage[];
    /**
     * Optional style override — the host status bar passes its compact
     * icon-button style so the indicator looks the same as siblings
     * (notes, sidebar, view-mode, zoom buttons).
     */
    buttonStyle?: CSSProperties;
    /** Style applied when the popover is open (active state). */
    buttonActiveStyle?: CSSProperties;
}
export declare function FontUsageIndicator({ fontUsage, buttonStyle, buttonActiveStyle, }: FontUsageIndicatorProps): ReactNode;
//# sourceMappingURL=FontUsageIndicator.d.ts.map