import { rasterizeSvgContent } from "../../icons/index.js";
import { renderSvgNode } from "../../renderPptx/nodes/svg.js";
export const svgNodeDef = {
    type: "svg",
    category: "leaf",
    applyYogaStyle(node, yn) {
        const n = node;
        const width = n.w ?? 24;
        const height = n.h ?? 24;
        yn.setMeasureFunc(() => ({ width, height }));
    },
    async toPositioned(pom, absoluteX, absoluteY, layout, ctx) {
        const n = pom;
        const rasterWidth = Math.ceil(layout.width);
        const rasterHeight = Math.ceil(layout.height);
        const iconImageData = await rasterizeSvgContent(n.svgContent, rasterWidth, n.color, ctx.iconRasterCache, rasterHeight);
        return {
            ...n,
            x: absoluteX,
            y: absoluteY,
            w: layout.width,
            h: layout.height,
            iconImageData,
        };
    },
    render(node, ctx) {
        renderSvgNode(node, ctx);
    },
};
