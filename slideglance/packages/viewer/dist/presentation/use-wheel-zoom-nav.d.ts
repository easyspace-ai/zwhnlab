/**
 * `useWheelZoomNav` — wheel + pinch handler installed on the slide
 * stage. Two flavours of intent are dispatched off the same event:
 *
 * - **Zoom** (Ctrl/Cmd-wheel, pinch). The browser delivers pinch as
 *   a synthetic `wheel` with `ctrlKey=true` so the same path covers
 *   trackpad pinch and key-modified scroll wheels. Deltas accumulate
 *   inside a single rAF tick so a fast pinch-zoom doesn't fire a
 *   `setZoom` per event.
 * - **Slide nav** (plain wheel). Native scroll handles in-slide
 *   panning until the user hits the top / bottom edge, after which
 *   wheel travel above `BOUNDARY_THRESHOLD` commits to the next /
 *   previous slide. A `COOLDOWN_MS` window swallows subsequent wheel
 *   events to absorb macOS trackpad inertia tails.
 *
 * Constants tuned conservatively: the historic Lit shell used
 * 1.1/0.9 step factors that felt jumpy on trackpads. The
 * exponential `factor = exp(-delta * SENSITIVITY)` form gives the
 * same perceived speed as a Cmd-wheel "click" while making pinch
 * proportional and decoupling line / page / pixel deltaModes from
 * the threshold constant.
 */
import type { MutableRefObject } from "react";
export interface UseWheelZoomNavArgs {
    stageRef: MutableRefObject<HTMLElement | null>;
    slideshow: boolean;
    viewMode: "normal" | "grid";
    slideCount: number;
    setZoom: (next: number | ((prev: number) => number)) => void;
    setCurrentSlide: (next: number | ((prev: number) => number)) => void;
}
export declare function useWheelZoomNav(args: UseWheelZoomNavArgs): void;
//# sourceMappingURL=use-wheel-zoom-nav.d.ts.map