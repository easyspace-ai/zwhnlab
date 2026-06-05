import type { PositionedNode } from "../../types.ts";
import type { RenderContext, SlideBBox } from "../types.ts";
type ConnectorPositionedNode = Extract<PositionedNode, {
    type: "connector";
}>;
type Side = "top" | "right" | "bottom" | "left";
type ConnectorKind = "straight" | "elbow" | "curved";
/**
 * Pick the side pair when the author omitted fromSide / toSide. Picks
 * the dominant axis (horizontal vs vertical) by comparing the absolute
 * distances between the bbox centers, then chooses the side that points
 * away from the source toward the target. PowerPoint will reroute the
 * preset path; this only seeds the initial side selection.
 */
export declare function autoSidePair(a: SlideBBox, b: SlideBBox): {
    fromSide: Side;
    toSide: Side;
};
/**
 * Pick the PPTX preset name for a (kind, fromSide, toSide) triple.
 *
 *   straight -> straightConnector1
 *   elbow   -> bentConnectorN  (N = segments)
 *   curved  -> curvedConnectorN
 *
 * The OOXML preset name convention uses "N" for the number of line
 * segments (one more than the number of bends):
 *
 *   facing sides (right<->left, top<->bottom)         -> N=3 (Z shape, 2 bends)
 *   perpendicular sides (right<->top, top<->left, ...) -> N=2 (L shape, 1 bend)
 *   same side (left<->left, top<->top, ...)            -> N=4 (U shape, 3 bends)
 *
 * straightConnector1 has no bends, so it ignores side choice.
 */
export declare function pickConnectorPreset(kind: ConnectorKind, fromSide: Side, toSide: Side): string;
/**
 * Locate the attachment point on a bbox for a given side. Returns the
 * midpoint of the chosen edge in slide-px coordinates.
 */
export declare function sideAnchor(bbox: SlideBBox, side: Side): {
    x: number;
    y: number;
};
/**
 * Build the cNvPr@name token chain the post-process pass reads. The
 * sg-cxn body is always present; sg-grp tokens stack outermost-first
 * when the connector itself sits inside one or more `group="..."`
 * ancestors, so the group rewriter wraps the cxnSp the same way it
 * wraps regular shapes.
 */
export declare function buildConnectorSigil(node: ConnectorPositionedNode, fromSide: Side, toSide: Side, preset: string, groupIds?: readonly string[]): string;
export declare function renderConnectorNode(node: ConnectorPositionedNode, ctx: RenderContext): void;
export {};
//# sourceMappingURL=connector.d.ts.map