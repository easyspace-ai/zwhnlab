import type { PositionedNode } from "../../types.ts";
import type { RenderContext } from "../types.ts";
type TextPositionedNode = Extract<PositionedNode, {
    type: "text";
}>;
export declare function renderTextNode(node: TextPositionedNode, ctx: RenderContext): void;
export {};
//# sourceMappingURL=text.d.ts.map