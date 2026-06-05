/**
 * `useKeyboardShortcuts` — global keydown / keyup / blur listener
 * that owns every shell-level keyboard binding.
 *
 * Bindings:
 * - Cmd/Ctrl + F → toggle search drawer
 * - Cmd/Ctrl + P → print (gated on slideCount > 0 && allSlidesReady)
 * - Cmd/Ctrl + A → select every shape with a known bbox
 * - Cmd/Ctrl + C → copy selected shapes' text content
 * - Cmd/Ctrl + (= / +) / - / 0 → zoom in / out / reset
 * - ←/→ + Home/End + PageUp/PageDown → slide navigation
 * - Esc → exit slideshow / close search / clear selection
 * - Space (held) → engage pan mode
 * - ? → toggle shortcuts help dialog
 *
 * Extracted from `PptxPresentation` so the keyboard surface lives in
 * one place — the host component just wires its state slots to the
 * hook arguments and the hook installs a single window-level
 * keydown / keyup / blur handler that orchestrates them.
 */
import type { MutableRefObject } from "react";
export interface UseKeyboardShortcutsArgs {
    slideCount: number;
    allSlidesReady: boolean;
    searchOpen: boolean;
    slideshow: boolean;
    selectedIds: Set<string>;
    textEditId: string | null;
    /** Ref-handle for Cmd/Ctrl+P. The keyboard handler runs in an
     *  effect that sees the ref's *current* value, so the parent can
     *  install / replace `handlePrint` without forcing the keyboard
     *  effect to re-subscribe on every print-handler identity flip. */
    handlePrintRef: MutableRefObject<(() => Promise<void>) | null>;
    /** Live cache of every shape's bbox. Cmd/Ctrl+A selects every key. */
    bboxMapRef: MutableRefObject<Map<string, {
        x: number;
        y: number;
        w: number;
        h: number;
    }>>;
    /** Slide DOM host for Cmd/Ctrl+C text extraction. */
    slideRef: MutableRefObject<HTMLElement | null>;
    setSearchOpen: (next: boolean | ((prev: boolean) => boolean)) => void;
    setSlideshow: (next: boolean) => void;
    setSelectedIds: (next: Set<string>) => void;
    setTextEditId: (next: string | null) => void;
    setRubberBand: (next: null) => void;
    setSpaceHeld: (next: boolean) => void;
    setShortcutsOpen: (next: boolean | ((prev: boolean) => boolean)) => void;
    setCurrentSlide: (next: number | ((prev: number) => number)) => void;
    setZoom: (next: number | ((prev: number) => number)) => void;
    setPanX: (next: number) => void;
    setPanY: (next: number) => void;
}
export declare function useKeyboardShortcuts(args: UseKeyboardShortcutsArgs): void;
//# sourceMappingURL=use-keyboard-shortcuts.d.ts.map