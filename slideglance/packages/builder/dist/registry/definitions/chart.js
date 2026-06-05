import { renderChartNode } from "../../renderPptx/nodes/chart.js";
export const chartNodeDef = {
    type: "chart",
    category: "leaf",
    render(node, ctx) {
        renderChartNode(node, ctx);
    },
};
