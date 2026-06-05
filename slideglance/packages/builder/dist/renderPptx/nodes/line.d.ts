import type { PositionedNode } from "../../types.ts";
import type { RenderContext } from "../types.ts";
type LinePositionedNode = Extract<PositionedNode, {
    type: "line";
}>;
export declare function renderLineNode(node: LinePositionedNode, ctx: RenderContext): void;
export {};
//# sourceMappingURL=line.d.ts.map