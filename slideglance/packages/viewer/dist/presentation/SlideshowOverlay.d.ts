/**
 * Fullscreen slideshow overlay — fades in over the editing shell when
 * the user clicks Slideshow. Handles two interaction surfaces:
 *
 * 1. The stage itself: plain left-click advances one slide; clicking
 *    on the last slide auto-exits the slideshow and drops out of
 *    fullscreen. Right-click / modified clicks are ignored so context
 *    menus + accessibility tooling still work.
 * 2. A bottom-right hover-fade nav pad with prev / next / exit
 *    buttons — anchored to a transparent 220×100 hit-zone so the
 *    pointer-near-corner reveal feels deliberate, not flickery.
 *
 * Slide rendering is the host's responsibility: the host passes a
 * `slideshowSlideRef` callback the overlay attaches to its inner
 * `<div>`, and the host pipes the rendered SVG into that ref via
 * the same imperative-DOM path the editing stage uses.
 */
import type { MutableRefObject, ReactNode } from "react";
export interface SlideshowOverlayProps {
    open: boolean;
    currentSlide: number;
    slideCount: number;
    /** Set to false → host also exits fullscreen if the document is in it. */
    setSlideshow: (next: boolean) => void;
    setCurrentSlide: (next: number | ((prev: number) => number)) => void;
    /** Stage-relative scale of the slide ("fit" factor). Zero suppresses
     *  the inner slide host so the pre-mount frame stays black. */
    fit: number;
    slideSvg: string;
    canvasW: number;
    canvasH: number;
    slideW: number;
    slideH: number;
    slideshowStageRef: MutableRefObject<HTMLElement | null>;
    slideshowSlideRef: MutableRefObject<HTMLDivElement | null>;
    /** Optional extra child rendered after the corner-nav pad. */
    children?: ReactNode;
}
export declare function SlideshowOverlay(props: SlideshowOverlayProps): JSX.Element | null;
//# sourceMappingURL=SlideshowOverlay.d.ts.map