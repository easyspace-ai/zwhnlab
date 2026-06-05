import { calcTableIntrinsicSize } from "../../shared/tableUtils.js";
import { renderTableNode } from "../../renderPptx/nodes/table.js";
export const tableNodeDef = {
    type: "table",
    category: "leaf",
    applyYogaStyle(node, yn) {
        const n = node;
        yn.setMeasureFunc(() => {
            const { width, height } = calcTableIntrinsicSize(n);
            return { width, height };
        });
    },
    render(node, ctx) {
        renderTableNode(node, ctx);
    },
};
