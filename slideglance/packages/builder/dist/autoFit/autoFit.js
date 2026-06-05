import { calcYogaLayout } from "../calcYogaLayout/calcYogaLayout.js";
import { freeYogaTree } from "../shared/freeYogaTree.js";
import { reduceTableRowHeight } from "./strategies/reduceTableRowHeight.js";
import { reduceFontSize } from "./strategies/reduceFontSize.js";
import { reduceGapAndPadding } from "./strategies/reduceGapAndPadding.js";
import { uniformScale } from "./strategies/uniformScale.js";
/** Overflow tolerance margin (0.5%). */
const OVERFLOW_TOLERANCE = 1.005;
const strategies = [
    reduceTableRowHeight,
    reduceFontSize,
    reduceGapAndPadding,
    uniformScale,
];
/**
 * Run a layout pass and report whether the content overflows the slide.
 */
async function measureOverflow(node, slideSize, ctx) {
    const map = await calcYogaLayout(node, slideSize, ctx);
    const contentHeight = calcContentHeight(map, node);
    const isOverflowing = contentHeight > slideSize.h * OVERFLOW_TOLERANCE;
    const targetRatio = isOverflowing ? slideSize.h / contentHeight : 1;
    return { contentHeight, isOverflowing, targetRatio, map };
}
/**
 * Compute the content occupancy height from the yoga layout result.
 *
 * Reduces the root's children to `max(top + height)` and adds the
 * root's `paddingBottom`. This sidesteps `h="max"` / `flexGrow` and
 * returns the precise content height.
 */
function calcContentHeight(map, node) {
    const rootYoga = map.get(node);
    if (!rootYoga) {
        throw new Error("YogaNode not found in map for root node");
    }
    const childCount = rootYoga.getChildCount();
    if (childCount === 0) {
        return rootYoga.getComputedHeight();
    }
    let maxBottom = 0;
    for (let i = 0; i < childCount; i++) {
        const child = rootYoga.getChild(i);
        const childLayout = child.getComputedLayout();
        const bottom = childLayout.top + childLayout.height;
        if (bottom > maxBottom) {
            maxBottom = bottom;
        }
    }
    // Add the root's paddingBottom.
    const paddingBottom = rootYoga.getComputedPadding(2); // EDGE_BOTTOM = 2
    return maxBottom + paddingBottom;
}
/**
 * Detect slide overflow and shrink content step-by-step until it fits.
 *
 * Adjustment priority:
 *   1. Shrink table row heights
 *   2. Shrink font sizes
 *   3. Shrink gap / padding
 *   4. Uniform downscale (fallback)
 */
export async function autoFitSlide(node, slideSize, ctx) {
    // Phase 1: apply strategies in order until the slide fits. We keep
    // the most recent measurement's layout map alive across iterations
    // so the no-overflow path can return it directly — older revisions
    // freed it eagerly and then re-ran `calcYogaLayout` from scratch in
    // a separate `finalizeLayout` pass, paying for two extra full
    // layout passes on every slide (≈ 20 ms × N slides). The map is
    // freed eagerly only when a strategy mutated the node, which
    // invalidates the layout — the next iteration (or the final phase
    // below) re-measures from scratch.
    let lastMap;
    for (const strategy of strategies) {
        const result = await measureOverflow(node, slideSize, ctx);
        if (lastMap)
            freeYogaTree(lastMap);
        lastMap = result.map;
        if (!result.isOverflowing) {
            // Slide fits — reuse this layout as the return value. Saves the
            // legacy second `calcYogaLayout` pass.
            return lastMap;
        }
        const changed = strategy(node, result.targetRatio);
        if (changed) {
            // The mutation invalidated the just-computed layout — drop it
            // before the next iteration measures from scratch.
            freeYogaTree(lastMap);
            lastMap = undefined;
        }
    }
    // Phase 2: ran out of strategies. Re-measure (the last strategy
    // may have mutated the node after we freed `lastMap`) to determine
    // whether the slide finally fits and to emit AUTOFIT_OVERFLOW with
    // the post-adjustment content height when it doesn't.
    if (lastMap)
        freeYogaTree(lastMap);
    const finalResult = await measureOverflow(node, slideSize, ctx);
    if (finalResult.isOverflowing) {
        ctx.diagnostics.add("AUTOFIT_OVERFLOW", `autoFit: content height (${Math.round(finalResult.contentHeight)}px) exceeds slide height (${slideSize.h}px) after all adjustments.`);
    }
    return finalResult.map;
}
