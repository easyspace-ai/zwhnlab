/**
 * `useRulerGeometry` — derive the slide's live position + size in
 * stage-relative pixel coordinates so the [`Ruler`](../ui/Ruler.tsx)
 * component can paint ticks that always align with the slide
 * centre, regardless of zoom, pan, sidebar resize, or stage scroll.
 *
 * Mirrors the historic Lit shell, which tracked `slideRect()` via
 * a ResizeObserver on the viewer-wrap. The hook owns:
 * - the `intrinsicViewBox` derivation from the deck SVG's `viewBox`,
 * - the live `rulerRect` state with a 0.5-pixel diff threshold so
 *   sub-pixel jitter from CSS layout doesn't trigger a re-render,
 * - the ResizeObserver + scroll listener wiring against the stage
 *   and slide DOM nodes.
 */
import type { MutableRefObject } from "react";
export interface RulerRect {
    originX: number;
    originY: number;
    extentX: number;
    extentY: number;
}
export interface UseRulerGeometryArgs {
    /** Whether the ruler is currently mounted. The hook short-circuits
     *  ResizeObserver / scroll listeners when off. */
    rulerOn: boolean;
    /** Deck SVG string — used to extract the intrinsic viewBox. */
    slideSvg: string;
    /** Stage scrollable container. */
    stageRef: MutableRefObject<HTMLElement | null>;
    /** Slide host element (the `<svg>` parent). */
    slideRef: MutableRefObject<HTMLElement | null>;
    /** Tracked layout dependencies — we don't read them, but the
     *  effect must re-measure when they change. */
    slideW: number;
    slideH: number;
    panX: number;
    panY: number;
    stageW: number;
    stageH: number;
}
export interface UseRulerGeometryResult {
    /** Intrinsic deck size in pixels and centimetres (X axis). */
    intrinsic: {
        px: number;
        cm: number;
    };
    /** Intrinsic deck size in pixels and centimetres (Y axis). */
    intrinsicY: {
        px: number;
        cm: number;
    };
    /** Live slide rect, in stage-relative pixel coords. */
    rulerRect: RulerRect;
}
export declare function useRulerGeometry(args: UseRulerGeometryArgs): UseRulerGeometryResult;
//# sourceMappingURL=use-ruler-geometry.d.ts.map