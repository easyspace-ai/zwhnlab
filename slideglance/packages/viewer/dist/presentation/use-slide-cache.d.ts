/**
 * `useSlideCache` — slide rendering + caching pipeline.
 *
 * Owns:
 * - The `slideCache: Map<slide#, CachedSlide>` plus its setter (the
 *   keyboard / print / pdf / sectionNav callers all need read
 *   access; the setter is exposed so the host's deck-loader can
 *   flush it on a deck swap).
 * - `pendingRef` — in-flight `requestSlide` tasks deduplicated by
 *   slide number so a rapid keyboard repeat or sidebar hover doesn't
 *   fire N IPC roundtrips for the same slide.
 * - `requestSlide(slide)` — cache-or-fetch path. Inlines media as
 *   `data:` URLs (not `blob:`) so the SVG is portable and never
 *   revokes underneath print / PDF.
 * - `ensureAllSlidesRendered(silent, onProgress)` — force-render
 *   every slide. Used by Print / PDF / Search and by the background
 *   prefetch.
 *
 * Plus two effects:
 * - **Background prefetch** — once a deck is open, walk every slide
 *   in the background so deck-wide actions stop showing partial
 *   output. Skipped when the host sets `noPrefetch`.
 * - **Active slide fetch** — request the visible slide when
 *   `currentSlide` changes.
 *
 * Stale-resolution handling: every task captures `deckEpochRef`'s
 * current value when it starts; if the epoch advances mid-flight
 * (deck swap), the resolution is dropped before it stamps the new
 * deck's cache. Without this, a deck swap during a slow render
 * leaves the *previous* deck's SVG in the new cache slot.
 */
import type { MutableRefObject } from "react";
import type { SlideController, SlideMeta, SlideSvg } from "../types.js";
import type { CachedSlide } from "./types.js";
export interface UseSlideCacheArgs {
    controller: SlideController | null;
    slideCount: number;
    currentSlide: number;
    /** Host opt-out for the background prefetch. */
    noPrefetch?: boolean;
    /** Optional async (or sync) hook the host installs to merge in
     *  extra per-slide metadata (Tauri shell uses this to override
     *  layout / section names from a sidecar JSON). */
    resolveMeta?: (slide: number) => Promise<Partial<SlideMeta> | null | undefined> | Partial<SlideMeta> | null;
    /** All-slides-rendered gate — flipped on once `ensureAllSlidesRendered`
     *  delivers `slideCount` entries. */
    allSlidesReady: boolean;
    setAllSlidesReady: (next: boolean) => void;
    setErrorMsg: (msg: string | null) => void;
    setPhase: (phase: string) => void;
    /** Monotonic deck-epoch counter. The host owns this and bumps it
     *  on every deck swap so in-flight render tasks know to drop
     *  their result instead of stamping it into the new deck's
     *  cache. */
    deckEpochRef: MutableRefObject<number>;
    /** In-flight task map. The host owns the ref so the deck-loader
     *  effect can clear it during teardown. */
    pendingRef: MutableRefObject<Map<number, Promise<CachedSlide | null>>>;
}
export interface UseSlideCacheResult {
    slideCache: Map<number, CachedSlide>;
    setSlideCache: (next: Map<number, CachedSlide> | ((prev: Map<number, CachedSlide>) => Map<number, CachedSlide>)) => void;
    requestSlide: (slide: number) => Promise<CachedSlide | null>;
    ensureAllSlidesRendered: (silent?: boolean, onProgress?: (current: number, total: number) => void) => Promise<SlideSvg[]>;
}
export declare function useSlideCache(args: UseSlideCacheArgs): UseSlideCacheResult;
//# sourceMappingURL=use-slide-cache.d.ts.map