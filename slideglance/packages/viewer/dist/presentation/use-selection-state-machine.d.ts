/**
 * `useSelectionStateMachine` — pointer-based selection on the slide
 * stage, plus everything that derives from the selection set.
 *
 * Responsibilities:
 * - Pointer-down / move / up state machine that distinguishes click
 *   vs. drag (≥3px movement = drag) and exposes the four
 *   `onStage*` event handlers the host wires to its stage `<main>`.
 * - Pan support when the host's `spaceHeld` flag is on (Space-held
 *   drag is the standard PowerPoint convention).
 * - Rubber-band hit-test that projects every cached bbox into
 *   screen coords via the live `getScreenCTM()` and AABB-intersects
 *   with the rubber-band rect.
 * - Double-click → enter text-edit mode for shapes that contain
 *   text.
 * - Selection-bbox projection (`selectionBoxes`) into stage-relative
 *   pixel coords, recomputed on every CTM change.
 * - Authored-font derivation (`selectionFonts`) read straight off
 *   the rendered SVG's `<tspan font-family="...">` chain.
 * - Outside-click + selection-empty auto-close for the status-bar
 *   font popover.
 * - Rubber-band rect projection for the visual overlay.
 *
 * The host owns `selectedIds` / `rubberBand` state because the
 * keyboard handler (Esc, Cmd+A, Cmd+C) also needs to mutate them;
 * the hook accepts state setters and never closes over its own
 * reducer state.
 */
import type { MutableRefObject } from "react";
import type { RubberBandRect, SelectionBox } from "../ui/SelectionOverlay.js";
export interface RubberBandState {
    x0: number;
    y0: number;
    x1: number;
    y1: number;
}
export interface PanStart {
    x: number;
    y: number;
    panX: number;
    panY: number;
}
export interface PointerDownAt {
    x: number;
    y: number;
    target: HTMLElement | null;
}
export interface UseSelectionStateMachineArgs {
    selectedIds: Set<string>;
    setSelectedIds: (next: Set<string> | ((prev: Set<string>) => Set<string>)) => void;
    rubberBand: RubberBandState | null;
    setRubberBand: (next: RubberBandState | null) => void;
    textEditId: string | null;
    setTextEditId: (next: string | null) => void;
    spaceHeld: boolean;
    panX: number;
    panY: number;
    setPanX: (next: number) => void;
    setPanY: (next: number) => void;
    zoom: number;
    stageW: number;
    stageH: number;
    slideSvg: string;
    panStartRef: MutableRefObject<PanStart | null>;
    pointerDownAtRef: MutableRefObject<PointerDownAt | null>;
    bboxMapRef: MutableRefObject<Map<string, {
        x: number;
        y: number;
        w: number;
        h: number;
    }>>;
    stageRef: MutableRefObject<HTMLElement | null>;
    slideRef: MutableRefObject<HTMLElement | null>;
    selectionFontsOpen: boolean;
    setSelectionFontsOpen: (next: boolean) => void;
    selectionFontsRef: MutableRefObject<HTMLDivElement | null>;
}
export interface UseSelectionStateMachineResult {
    onStagePointerDown: (ev: React.PointerEvent<HTMLElement>) => void;
    onStagePointerMove: (ev: React.PointerEvent<HTMLElement>) => void;
    onStagePointerUp: (ev: React.PointerEvent<HTMLElement>) => void;
    onStageDoubleClick: (ev: React.MouseEvent<HTMLElement>) => void;
    selectionBoxes: SelectionBox[];
    selectionFonts: string[];
    rubberBandRect: RubberBandRect | null;
}
export declare function useSelectionStateMachine(args: UseSelectionStateMachineArgs): UseSelectionStateMachineResult;
//# sourceMappingURL=use-selection-state-machine.d.ts.map