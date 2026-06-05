import type { PositionedNode } from "../../types.ts";
import type { RenderContext } from "../types.ts";
type TablePositionedNode = Extract<PositionedNode, {
    type: "table";
}>;
export declare function renderTableNode(node: TablePositionedNode, ctx: RenderContext): void;
export {};
//# sourceMappingURL=table.d.ts.map