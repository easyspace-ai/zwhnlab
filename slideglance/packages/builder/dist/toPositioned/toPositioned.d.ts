import type { BuilderNode, PositionedNode } from "../types.ts";
import type { BuildContext } from "../buildContext.ts";
import type { LayoutResultMap } from "../calcYogaLayout/types.ts";
/**
 * Convert a BuilderNode tree into a PositionedNode tree with absolute coordinates.
 * @param pom input BuilderNode
 * @param ctx BuildContext
 * @param map LayoutResultMap — BuilderNode -> computed layout result.
 * @param parentX Parent node's absolute X coordinate.
 * @param parentY Parent node's absolute Y coordinate.
 * @returns The positioned-node tree.
 */
export declare function toPositioned(pom: BuilderNode, ctx: BuildContext, map: LayoutResultMap, parentX?: number, parentY?: number): Promise<PositionedNode>;
//# sourceMappingURL=toPositioned.d.ts.map