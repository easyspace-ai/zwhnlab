import type { PositionedNode } from "../../types.ts";
import type { RenderContext } from "../types.ts";
type ChartPositionedNode = Extract<PositionedNode, {
    type: "chart";
}>;
export declare function renderChartNode(node: ChartPositionedNode, ctx: RenderContext): void;
export {};
//# sourceMappingURL=chart.d.ts.map