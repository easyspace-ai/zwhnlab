import type { BuilderNode } from "../types.ts";
import type { BuildContext } from "../buildContext.ts";
import type { YogaNodeMap } from "./types.ts";
/**
 * Compute the Yoga layout for a BuilderNode tree.
 * Returns the BuilderNode-to-YogaNode mapping as a YogaNodeMap.
 *
 * @param root Root of the input BuilderNode tree.
 * @param slideSize Overall slide size (px).
 * @param ctx BuildContext
 * @returns YogaNodeMap — BuilderNode -> YogaNode.
 */
export declare function calcYogaLayout(root: BuilderNode, slideSize: {
    w: number;
    h: number;
}, ctx: BuildContext): Promise<YogaNodeMap>;
//# sourceMappingURL=calcYogaLayout.d.ts.map