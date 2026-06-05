import { type CSSProperties, type ReactNode } from "react";
import type { SlideController, SlideMeta } from "./types.js";
interface SlideMetaResolver {
    (slide: number): Promise<SlideMeta | null> | SlideMeta | null;
}
export interface PptxPresentationProps {
    controller: SlideController | null;
    name?: string | null;
    slideCount?: number;
    src?: Uint8Array | ArrayBuffer | string | null;
    className?: string;
    style?: CSSProperties;
    toolbarStart?: ReactNode;
    toolbarEnd?: ReactNode;
    resolveMeta?: SlideMetaResolver;
    /**
     * Disable the deck-wide background prefetch.
     *
     * The viewer normally walks every slide in the background after the
     * deck loads so deck-wide actions (Print / PDF / Slideshow / Search)
     * are instant. On native hosts (Tauri viewer-desktop) every render
     * is a synchronous IPC roundtrip plus a JSON-string serialization of
     * the SVG, so prefetching all 100+ slides eagerly stalls the shell
     * for a long time before the first slide even paints.
     *
     * When `noPrefetch` is true:
     * - Slides are rendered lazily — only when navigated to.
     * - Print / PDF / Slideshow / Search trigger their own
     *   `ensureAllSlidesRendered()` on demand (the gate that hides the
     *   buttons until the prefetch finishes is removed).
     *
     * Browser hosts (worker-backed) keep prefetching by default because
     * the worker is concurrent with the main thread.
     */
    noPrefetch?: boolean;
    /**
     * Fired exactly once after the first slide's SVG has been appended
     * to the DOM (the moment a user can see content). Hosts use this to
     * dismiss their own loading overlays without having to guess at a
     * delay — a fast deck open shouldn't dwell behind a spinner that
     * outlasts the actual wait, and a slow first slide shouldn't drop
     * the spinner while the stage is still blank.
     *
     * Re-fires when the deck is replaced (i.e. the host re-keys this
     * component to remount it for a new file) — internal first-render
     * tracking is reset on mount.
     */
    onReady?: () => void;
    /**
     * Optional host-supplied stylesheet whose `@font-face` rules are
     * loaded into the worker's `FontFaceSet` alongside the deck's
     * embedded fonts. The chrome-extension passes its bundled Google
     * Fonts CSS here so decks that name `Anton`, `Alata`, etc. resolve
     * to the bundled face during canvas measurement (and not just at
     * paint time via the document-level stylesheet).
     *
     * Without this, decks that ship MTX-compressed embedded fonts —
     * which our renderer drops — would measure with the worker's OS
     * fallback metrics and produce wider lines than the browser will
     * paint.
     */
    bundledFontDefsCss?: string;
    /** Hide the settings (gear) button in the toolbar. */
    hideToolbarSettings?: boolean;
    /**
     * When `true`, treat every `src` change as an in-place edit-cycle
     * update of the same logical deck rather than a brand-new deck
     * open: the current slide index, zoom level, and pan offsets are
     * preserved across the reload. Hosts that drive a live editing
     * surface (e.g. the pom VS Code preview, where every keystroke
     * produces a fresh PPTX byte buffer) set this so the viewer
     * doesn't snap back to slide 1 / zoom 1 after each edit.
     *
     * Cache treatment is gated by `invalidatedSlides`: see that prop.
     */
    incrementalUpdate?: boolean;
    /**
     * 1-based indices of slides whose cache entries should be flushed
     * on the next `src` change. Only consulted when
     * `incrementalUpdate` is true. Pair this with a host-side
     * per-slide hash diff to achieve true surgical updates: the host
     * computes which slides' source actually changed between edits
     * and forwards that list here, so the viewer keeps cached SVGs
     * for everything else.
     *
     *  - `undefined`: viewer flushes the entire cache (safe default
     *    when the host has no diff).
     *  - `[]`: keep the entire cache (host asserts nothing changed
     *    visually).
     *  - `[3, 5, …]`: drop only those entries; navigation refetches
     *    them, the rest stay cached.
     */
    invalidatedSlides?: number[];
}
/**
 * Top-level presentation shell. React port of the original Lit
 * `<pptx-presentation>` Web Component, mirroring the same chrome:
 *
 *     ┌───────────────────────────────────────────────┐
 *     │ ribbon (filename / nav / search / print / …)  │
 *     ├──────────┬────────────────────────────────────┤
 *     │ thumb    │ stage (slide rendering with ruler) │
 *     │ + sects  │                                    │
 *     │          ├────────────────────────────────────┤
 *     │          │ notes (collapsible)                │
 *     ├──────────┴────────────────────────────────────┤
 *     │ status bar (slide / view modes / zoom slider) │
 *     └───────────────────────────────────────────────┘
 */
export declare function PptxPresentation(props: PptxPresentationProps): JSX.Element;
export {};
//# sourceMappingURL=PptxPresentation.d.ts.map