import { pxToIn } from "../units.js";
import { renderObjectName } from "../utils/objectName.js";
export function renderSvgNode(node, ctx) {
    const objectName = renderObjectName(node, ctx);
    ctx.slide.addImage({
        data: node.iconImageData,
        x: pxToIn(node.x),
        y: pxToIn(node.y),
        w: pxToIn(node.w),
        h: pxToIn(node.h),
        ...(objectName ? { objectName } : {}),
        ...(node.isDecorative
            ? { altText: "" }
            : node.altText !== undefined
                ? { altText: node.altText }
                : {}),
    });
}
