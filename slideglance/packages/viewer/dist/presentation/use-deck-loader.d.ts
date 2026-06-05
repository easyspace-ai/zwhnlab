/**
 * `useDeckLoader` — auto-open a `.pptx` source on mount and feed
 * everything the controller hands back into the host's slide-state
 * slots.
 *
 * Steps:
 * 1. Resolve `src` to bytes — `string` is fetched, `ArrayBuffer` is
 *    wrapped, raw `Uint8Array` is used as-is.
 * 2. Hand the bytes to `controller.open()` with the host-supplied
 *    `bundledFontDefsCss` (chrome-extension uses this for its
 *    bundled Google Fonts so the worker's canvas measurer sees the
 *    same metrics the eventual browser paint will).
 * 3. Mirror the controller's metadata into host state (slide count,
 *    typeface usage, font-defs CSS).
 * 4. Register every MTX-decoded TTF buffer on `document.fonts` via
 *    the FontFace API. The worker pre-filtered these through
 *    `validateCmap` so OTS rejection is the rare exception, but
 *    silent-catch the promise rejection regardless — fallback fonts
 *    cover the visible paint.
 * 5. Reset slide / zoom / pan state to the new deck's defaults and
 *    revoke any blob URLs lingering in the previous deck's cache.
 *
 * Skipped entirely when the host opted into manual control by
 * passing `slideCount` (`externalSlideCount != null`) — that mode
 * means the embedder owns deck loading and the viewer just renders.
 */
import type { SlideController, TypefaceUsage } from "../types.js";
import type { CachedSlide } from "./types.js";
export interface UseDeckLoaderArgs {
    controller: SlideController | null;
    src?: Uint8Array | ArrayBuffer | string | null;
    externalSlideCount?: number;
    bundledFontDefsCss?: string;
    /**
     * When `true`, treat every `src` change as an in-place edit-cycle
     * update of the same logical deck rather than a brand-new deck
     * open: the current slide index, zoom level, and pan offsets are
     * preserved across the reload. Hosts that drive a live editing
     * surface (e.g. the pom VS Code preview, where every keystroke
     * produces a fresh PPTX byte buffer) set this so the viewer
     * doesn't snap back to slide 1 / zoom 1 after each edit.
     *
     * The slide cache treatment depends on whether
     * `invalidatedSlides` is also supplied — see that prop.
     */
    incrementalUpdate?: boolean;
    /**
     * 1-based indices of slides whose cache entries should be flushed
     * on the next `src` change. Only consulted when
     * `incrementalUpdate` is `true`; the default-off path
     * (full-deck-open) always flushes the entire cache.
     *
     *  - `undefined`: no per-slide hint, fall back to flushing the
     *    entire cache. Safest default — guarantees the visible slide
     *    matches the new bytes even if the host has not computed a
     *    diff.
     *  - `[]`: empty list — host is asserting nothing changed
     *    visually, keep the cache intact. The worker still re-parses
     *    so subsequent navigation reflects the new bytes; existing
     *    cached SVGs (which the host knows are bit-identical to what
     *    the new parse would produce) survive.
     *  - `[3, 5, …]`: only invalidate cache entries for the listed
     *    1-based slide indices. Hosts compute this list by hashing
     *    each slide's source between edits.
     */
    invalidatedSlides?: number[];
    setPhase: (phase: string) => void;
    setSlideCount: (next: number) => void;
    setFontUsage: (next: TypefaceUsage[]) => void;
    setFontDefsCss: (next: string) => void;
    setCurrentSlide: (next: number) => void;
    setZoom: (next: number) => void;
    setPanX: (next: number) => void;
    setPanY: (next: number) => void;
    setErrorMsg: (next: string | null) => void;
    setSlideCache: (next: Map<number, CachedSlide> | ((prev: Map<number, CachedSlide>) => Map<number, CachedSlide>)) => void;
}
export declare function useDeckLoader(args: UseDeckLoaderArgs): void;
//# sourceMappingURL=use-deck-loader.d.ts.map