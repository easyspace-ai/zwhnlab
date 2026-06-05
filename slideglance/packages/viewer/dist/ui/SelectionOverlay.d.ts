/**
 * One selected shape's stage-relative bounding box (CSS pixels).
 *
 * Computed by projecting the SVG shape's user-space bbox through the
 * SVG element's `getScreenCTM()`, then translating into the stage
 * element's local frame so the overlay (which is `position: absolute;
 * inset: 0` inside the stage) can render at viewport coords without
 * any further transform.
 */
export interface SelectionBox {
    id: string;
    x: number;
    y: number;
    w: number;
    h: number;
}
export interface RubberBandRect {
    x: number;
    y: number;
    w: number;
    h: number;
}
export interface SelectionOverlayProps {
    boxes: SelectionBox[];
    rubberBand: RubberBandRect | null;
}
/**
 * Purely-visual sibling of the slide host inside the stage. Draws a
 * dashed bbox + 8 corner / midpoint handles for every `boxes[]`
 * entry, plus an optional translucent dashed `rubberBand` rect during
 * empty-canvas drag selection.
 *
 * The overlay is `pointer-events: none`, so the underlying selection
 * state machine on `<PptxPresentation>` keeps owning all pointer
 * events. No event handlers — display only.
 */
export declare function SelectionOverlay(props: SelectionOverlayProps): JSX.Element;
//# sourceMappingURL=SelectionOverlay.d.ts.map