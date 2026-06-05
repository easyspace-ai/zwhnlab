import type { PositionedNode } from "../../types.ts";
import type { RenderContext } from "../types.ts";
/**
 * Emit per-side border overlays as positioned 1-px-aligned line shapes.
 * Called after the base shape (and any uniform border) has been drawn,
 * so the per-side line sits on top of the rectangle outline at the
 * author-specified width/color/dashType.
 *
 * pptxgenjs `line` shape geometry: `(x, y)` is the start endpoint,
 * `(w, h)` are signed offsets to the end endpoint (NOT a bounding box).
 * We use h=0 for horizontal sides and w=0 for vertical sides.
 */
export declare function renderPerSideBorders(node: PositionedNode, ctx: RenderContext): void;
/**
 * Returns true when a text node's background/border/borderRadius/shadow should be
 * rendered as a single shape-with-text object (one PPTX object) instead of the
 * default two-object pattern (outer shape + separate text). backgroundImage still
 * requires the split path because the image must be layered between bg and border.
 */
export declare function shouldEmbedBackgroundInText(node: PositionedNode): boolean;
/**
 * Draw the node's background color / background image / border / shadow.
 * Shared logic invoked first for every node type.
 *
 * Draw order: backgroundColor -> backgroundImage -> border.
 */
export declare function renderBackgroundAndBorder(node: PositionedNode, ctx: RenderContext): void;
//# sourceMappingURL=backgroundBorder.d.ts.map