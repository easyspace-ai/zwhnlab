/**
 * `useSlideDomMount` — imperatively mount the active slide's SVG
 * into the slide-host `<div>` and rebuild the bbox cache used by
 * the selection state machine.
 *
 * Why imperative: React's reconciler can't safely round-trip an SVG
 * through string → DOM tree → React vnodes without breaking the
 * `getBoundingClientRect()` invariants the selection layer relies
 * on. We use `DOMParser` + `importNode` so the mounted SVG carries
 * the real layout state the browser computed, and we re-namespace
 * every `id="…"` so the main stage's SVG can't collide with the
 * sibling thumbnails the sidebar mounts at the same time.
 *
 * The bbox cache is built from `getBoundingClientRect()` →
 * `inverse(getScreenCTM())` rather than `getBBox()`. Group bboxes
 * are unreliable for `<text>` runs whose width depends on font
 * substitution; the rendered-geometry path always matches what the
 * user sees on screen.
 */
import type { MutableRefObject } from "react";
export interface UseSlideDomMountArgs {
    slideSvg: string;
    currentSlide: number;
    slideshow: boolean;
    /** Stage host for the normal (non-slideshow) view. */
    slideRef: MutableRefObject<HTMLElement | null>;
    /** Stage host for the slideshow overlay. */
    slideshowSlideRef: MutableRefObject<HTMLElement | null>;
    /** Cache of per-shape user-space bboxes; rebuilt every mount. */
    bboxMapRef: MutableRefObject<Map<string, {
        x: number;
        y: number;
        w: number;
        h: number;
    }>>;
    /** Latched `onReady` flag — flipped on the first successful mount
     *  of a deck so the host can dismiss its loading overlay. */
    onReadyFiredRef: MutableRefObject<boolean>;
    onReady?: () => void;
    setErrorMsg: (msg: string | null) => void;
    /** Layout signals that don't read inside the effect but require a
     *  re-mount when the host's frame around the slide changes
     *  (sidebar resize, notes toggle, view-mode swap, stage resize). */
    sidebarWidth: number;
    notesOpen: boolean;
    viewMode: "normal" | "grid";
    stageW: number;
    stageH: number;
}
export declare function useSlideDomMount(args: UseSlideDomMountArgs): void;
//# sourceMappingURL=use-slide-dom-mount.d.ts.map