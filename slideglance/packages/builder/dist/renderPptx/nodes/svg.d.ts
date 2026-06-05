import type { PositionedNode } from "../../types.ts";
import type { RenderContext } from "../types.ts";
type SvgPositionedNode = Extract<PositionedNode, {
    type: "svg";
}>;
export declare function renderSvgNode(node: SvgPositionedNode, ctx: RenderContext): void;
export {};
//# sourceMappingURL=svg.d.ts.map