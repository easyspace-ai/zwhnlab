/**
 * Slide thumbnail tile — used both by the sidebar (vertical strip,
 * `layout="row"`) and the grid view (slide-sorter, `layout="tile"`).
 *
 * Rendering strategy:
 * 1. The button mounts in a "placeholder" state with no SVG.
 * 2. An `IntersectionObserver` watches the button; when it enters the
 *    viewport (or sidebar scroll container), the slide is fetched
 *    from the host's `getThumbnail` callback. This keeps a 132-slide
 *    deck from fanning out to 132 IPC calls on first paint.
 * 3. The fetched SVG is id-namespaced (so multiple thumbnails on the
 *    same page don't collide on `clipPath` / gradient ids) and
 *    inserted via DOMParser → `importNode` so the SVG namespace is
 *    handled correctly by the browser's foreign-element machinery.
 *
 * Once visible, the flag stays sticky: there's no benefit to
 * unloading a slide we already paid to render, and re-fetching on
 * scroll-out / scroll-in produces a perceptible flash.
 */
import type { CachedSlide } from "./types.js";
export interface ThumbnailProps {
    slide: number;
    active: boolean;
    onClick: () => void;
    getThumbnail: (slide: number) => Promise<CachedSlide | null>;
    aspectFallback: number;
    /**
     * `"row"` — sidebar style: slide number on the left, frame on the
     * right (vertical strip). `"tile"` — slide-sorter style: frame on
     * top, caption underneath, all tiles share a uniform footprint via
     * the `aspectFallback` (deck aspect), so the grid stays aligned
     * even when individual slides parse at slightly different aspects.
     */
    layout?: "row" | "tile";
}
export declare function Thumbnail(props: ThumbnailProps): JSX.Element;
export interface ThumbnailSidebarProps {
    slideCount: number;
    currentSlide: number;
    onSelect: (slide: number) => void;
    getThumbnail: (slide: number) => Promise<CachedSlide | null>;
    aspectFallback: number;
    /**
     * Per-deck identifier — included in each `<Thumbnail>`'s React key
     * so a deck swap forces every thumbnail to unmount + remount with
     * fresh internal state. Without this, Thumbnail's `useEffect` deps
     * (`[visible, slide, getThumbnail, aspectFallback]`) don't change
     * across decks (`slide` is still 1, `getThumbnail` is the same
     * stable callback), the cached `svg` state from the previous deck
     * sticks, and the panel keeps showing stale tiles even after
     * `slideCache` itself is flushed.
     */
    deckKey: string;
}
export declare const ThumbnailSidebar: import("react").MemoExoticComponent<(props: ThumbnailSidebarProps) => JSX.Element>;
//# sourceMappingURL=Thumbnail.d.ts.map