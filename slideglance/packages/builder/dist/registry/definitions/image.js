import { measureImage, getImageData } from "../../shared/measureImage.js";
import { renderImageNode, validateImageSrc, } from "../../renderPptx/nodes/image.js";
export const imageNodeDef = {
    type: "image",
    category: "leaf",
    applyYogaStyle(node, yn, _yoga, ctx) {
        const n = node;
        const src = n.src;
        const guard = ctx.security.imageSrcGuard;
        if (guard &&
            validateImageSrc(src, guard, ctx.diagnostics, { silent: true }) ===
                undefined) {
            // Guard blocks this src — register no-op measure to prevent unguarded fs.readFileSync
            yn.setMeasureFunc(() => ({ width: 100, height: 100 }));
            return;
        }
        yn.setMeasureFunc(() => {
            const { widthPx, heightPx } = measureImage(src, ctx.imageSizeCache, ctx.diagnostics);
            return { width: widthPx, height: heightPx };
        });
    },
    toPositioned(pom, absoluteX, absoluteY, layout, ctx) {
        const n = pom;
        const imageData = getImageData(n.src, ctx.imageDataCache);
        return {
            ...n,
            x: absoluteX,
            y: absoluteY,
            w: layout.width,
            h: layout.height,
            imageData,
        };
    },
    render(node, ctx) {
        renderImageNode(node, ctx);
    },
    collectImageSources(node) {
        const n = node;
        return [n.src];
    },
};
