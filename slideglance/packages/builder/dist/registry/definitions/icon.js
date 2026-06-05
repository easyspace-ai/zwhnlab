import { rasterizeIcon } from "../../icons/index.js";
import { renderIconNode } from "../../renderPptx/nodes/icon.js";
import { getContentArea } from "../../renderPptx/utils/contentArea.js";
export const iconNodeDef = {
    type: "icon",
    category: "leaf",
    applyYogaStyle(node, yn) {
        const n = node;
        const iconSize = n.size ?? 24;
        // With a variant, the overall size becomes iconSize + padding.
        const totalSize = n.variant ? Math.ceil(iconSize * 1.75) : iconSize;
        yn.setMeasureFunc(() => ({ width: totalSize, height: totalSize }));
    },
    async toPositioned(pom, absoluteX, absoluteY, layout, ctx) {
        const n = pom;
        const iconSize = n.size ?? 24;
        // Compute bg/icon coordinates for the padding-adjusted content area.
        const content = getContentArea({
            x: absoluteX,
            y: absoluteY,
            w: layout.width,
            h: layout.height,
            padding: n.padding,
        });
        // Rasterize at the actual draw size (avoid an oversized PNG).
        const rasterSize = Math.max(Math.ceil(n.variant ? iconSize : Math.min(content.w, content.h)), iconSize);
        const iconImageData = await rasterizeIcon(n.name, rasterSize, n.color ?? "#000000", ctx.iconRasterCache);
        const positioned = {
            ...n,
            x: absoluteX,
            y: absoluteY,
            w: layout.width,
            h: layout.height,
            iconImageData,
        };
        if (n.variant) {
            const totalSize = Math.ceil(iconSize * 1.75);
            // Treat the background shape as a square; place the content area at its center.
            positioned.bgX = content.x + (content.w - totalSize) / 2;
            positioned.bgY = content.y + (content.h - totalSize) / 2;
            positioned.bgW = totalSize;
            positioned.bgH = totalSize;
            // Place the icon at the center of the content area.
            positioned.iconX = content.x + (content.w - iconSize) / 2;
            positioned.iconY = content.y + (content.h - iconSize) / 2;
            positioned.iconW = iconSize;
            positioned.iconH = iconSize;
        }
        else {
            // Without a variant, preserve the aspect ratio and place at the content-area center.
            const iconSide = Math.min(content.w, content.h);
            positioned.iconX = content.x + (content.w - iconSide) / 2;
            positioned.iconY = content.y + (content.h - iconSide) / 2;
            positioned.iconW = iconSide;
            positioned.iconH = iconSide;
        }
        return positioned;
    },
    render(node, ctx) {
        renderIconNode(node, ctx);
    },
};
