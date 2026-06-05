/**
 * Status bar — bottom-of-shell strip showing the live phase
 * message, slide counter, selected fonts, font-usage indicator,
 * notes toggle, view-mode picker, and zoom controls.
 *
 * Stateless — every interactive element either dispatches via a
 * callback the host supplies or toggles state the host owns.
 */
import type { MutableRefObject } from "react";
import type { SlideMeta, TypefaceUsage } from "../types.js";
export interface StatusBarProps {
    slideshow: boolean;
    phase: string;
    errorMsg: string | null;
    slideMeta: SlideMeta | null;
    slideCount: number;
    currentSlide: number;
    selectionFonts: string[];
    selectionFontsOpen: boolean;
    setSelectionFontsOpen: (next: boolean | ((prev: boolean) => boolean)) => void;
    selectionFontsRef: MutableRefObject<HTMLDivElement | null>;
    fontUsage: TypefaceUsage[];
    notesOpen: boolean;
    setNotesOpen: (next: boolean | ((prev: boolean) => boolean)) => void;
    viewMode: "normal" | "grid";
    setViewMode: (next: "normal" | "grid") => void;
    zoom: number;
    zoomPct: number;
    setZoom: (next: number | ((prev: number) => number)) => void;
    setZoomFromPct: (pct: number) => void;
    /** Reset zoom + pan to fit-window. */
    reset: () => void;
}
export declare function StatusBar(props: StatusBarProps): JSX.Element | null;
//# sourceMappingURL=StatusBar.d.ts.map