import type { Node as YogaNode } from "yoga-layout";
import type { BuilderNode } from "../types.ts";
/** Mapping from each BuilderNode to its supporting YogaNode. Exists only during the layout-compute phase. */
export type YogaNodeMap = Map<BuilderNode, YogaNode>;
/** Lightweight representation of a Yoga computation result. No runtime dependency on Yoga itself. */
export interface LayoutResult {
    left: number;
    top: number;
    width: number;
    height: number;
}
/** Mapping from each BuilderNode to its computed layout result. */
export type LayoutResultMap = Map<BuilderNode, LayoutResult>;
/** Extract the computed layout result from a YogaNodeMap. */
export declare function extractLayoutResults(yogaMap: YogaNodeMap): LayoutResultMap;
//# sourceMappingURL=types.d.ts.map