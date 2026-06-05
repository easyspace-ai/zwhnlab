/**
 * Top ribbon — filename · slide nav · search · print / pdf /
 * slideshow · shortcuts · settings. Sub-extracted from
 * `PptxPresentation.tsx`.
 *
 * Each handler is supplied by the host so this component can stay
 * stateless: it never owns a `useState`, just renders the props it
 * was handed. The host's `toolbarStart` / `toolbarEnd` slots flank
 * the built-in controls so embedders can splice their own buttons
 * in (the chrome-extension uses `toolbarStart` for an Open File
 * picker, for example).
 */
import type { ReactNode } from "react";
export interface ToolbarProps {
    toolbarStart?: ReactNode;
    toolbarEnd?: ReactNode;
    name?: string | null;
    slideCount: number;
    currentSlide: number;
    setCurrentSlide: (next: number | ((prev: number) => number)) => void;
    searchOpen: boolean;
    setSearchOpen: (next: boolean | ((prev: boolean) => boolean)) => void;
    /** Whether the deck-wide actions can fire. When false, host has
     *  prefetching enabled and the deck isn't fully rendered yet — the
     *  buttons disable + show a "preparing…" hover hint. */
    allSlidesReady: boolean;
    /** Inverse of the prefetching gate: when true, deck-wide actions
     *  fire on demand and skip the readiness check. */
    noPrefetch: boolean;
    /** Helper that turns a localized base label into the
     *  "Foo (waiting on N slides…)" form when the gate is closed. */
    deckGateTitle: (base: string, ready: boolean, slideCount: number) => string;
    handlePrint: () => Promise<void>;
    handleExportPdf: () => Promise<void>;
    handleSlideshow: () => Promise<void>;
    shortcutsOpen: boolean;
    setShortcutsOpen: (next: boolean | ((prev: boolean) => boolean)) => void;
    settingsOpen: boolean;
    setSettingsOpen: (next: boolean) => void;
    /** When true, the settings (gear) button is hidden. */
    hideSettings?: boolean;
}
export declare function Toolbar(props: ToolbarProps): JSX.Element;
//# sourceMappingURL=Toolbar.d.ts.map