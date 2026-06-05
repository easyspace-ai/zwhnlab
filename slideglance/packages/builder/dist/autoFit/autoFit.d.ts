import type { BuilderNode } from "../types.ts";
import type { BuildContext } from "../buildContext.ts";
import type { YogaNodeMap } from "../calcYogaLayout/types.ts";
/**
 * Detect slide overflow and shrink content step-by-step until it fits.
 *
 * Adjustment priority:
 *   1. Shrink table row heights
 *   2. Shrink font sizes
 *   3. Shrink gap / padding
 *   4. Uniform downscale (fallback)
 */
export declare function autoFitSlide(node: BuilderNode, slideSize: {
    w: number;
    h: number;
}, ctx: BuildContext): Promise<YogaNodeMap>;
//# sourceMappingURL=autoFit.d.ts.map