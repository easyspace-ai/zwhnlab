import type { PositionedNode } from "../../types.ts";
import type { RenderContext } from "../types.ts";
type ShapePositionedNode = Extract<PositionedNode, {
    type: "shape";
}>;
export declare function renderShapeNode(node: ShapePositionedNode, ctx: RenderContext): void;
export {};
//# sourceMappingURL=shape.d.ts.map