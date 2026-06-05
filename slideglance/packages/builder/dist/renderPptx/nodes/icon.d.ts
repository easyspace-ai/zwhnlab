import type { PositionedNode } from "../../types.ts";
import type { RenderContext } from "../types.ts";
type IconPositionedNode = Extract<PositionedNode, {
    type: "icon";
}>;
export declare function renderIconNode(node: IconPositionedNode, ctx: RenderContext): void;
export {};
//# sourceMappingURL=icon.d.ts.map