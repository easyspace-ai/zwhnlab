/**
 * Slide-sorter / grid view — every slide rendered as a uniform tile
 * so the user can scan large decks at a glance and jump straight to
 * a specific slide. Reuses the lazy `<Thumbnail>` component so an
 * 800-slide deck doesn't fan out to 800 IPC calls on first paint.
 */
import type { CachedSlide } from "./types.js";
export interface GridViewProps {
    slideCount: number;
    currentSlide: number;
    cache: Map<number, CachedSlide>;
    aspect: number;
    onSelect: (slide: number) => void;
    getThumbnail: (slide: number) => Promise<CachedSlide | null>;
    /** See `ThumbnailSidebarProps.deckKey` for the rationale. */
    deckKey: string;
}
export declare function GridView(props: GridViewProps): JSX.Element;
//# sourceMappingURL=GridView.d.ts.map