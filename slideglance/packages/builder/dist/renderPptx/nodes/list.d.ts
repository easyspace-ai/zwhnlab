import type { PositionedNode } from "../../types.ts";
import type { RenderContext } from "../types.ts";
type UlPositionedNode = Extract<PositionedNode, {
    type: "ul";
}>;
type OlPositionedNode = Extract<PositionedNode, {
    type: "ol";
}>;
export declare function renderUlNode(node: UlPositionedNode, ctx: RenderContext): void;
export declare function renderOlNode(node: OlPositionedNode, ctx: RenderContext): void;
export {};
//# sourceMappingURL=list.d.ts.map