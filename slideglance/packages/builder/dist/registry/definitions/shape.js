import { measureText } from "../../calcYogaLayout/measureText.js";
import { resolveFontFamily, resolveTextStyleValue, } from "../../defaultTextStyle.js";
import { renderShapeNode } from "../../renderPptx/nodes/shape.js";
export const shapeNodeDef = {
    type: "shape",
    category: "leaf",
    applyYogaStyle(node, yn, yoga, ctx) {
        const n = node;
        if (n.text) {
            const text = n.text;
            const fontSizePx = resolveTextStyleValue(n.fontSize, ctx.defaultTextStyle.fontSize, 24);
            const fontFamily = resolveFontFamily(n.fontFamily, ctx.defaultTextStyle);
            const fontWeight = resolveTextStyleValue(n.bold, ctx.defaultTextStyle.bold, false)
                ? "bold"
                : "normal";
            const lineHeight = resolveTextStyleValue(n.lineHeight, ctx.defaultTextStyle.lineHeight, 1.0);
            yn.setMeasureFunc((width, widthMode) => {
                const maxWidthPx = (() => {
                    // `noWrap` forces a single-line measurement regardless of mode —
                    // the flex layout may overflow horizontally rather than wrap.
                    if (n.noWrap)
                        return Number.POSITIVE_INFINITY;
                    switch (widthMode) {
                        case yoga.MEASURE_MODE_UNDEFINED:
                            return Number.POSITIVE_INFINITY;
                        case yoga.MEASURE_MODE_EXACTLY:
                        case yoga.MEASURE_MODE_AT_MOST:
                            return width;
                        default:
                            return Number.POSITIVE_INFINITY;
                    }
                })();
                const { widthPx, heightPx } = measureText(text, maxWidthPx, {
                    fontFamily,
                    fontSizePx,
                    lineHeight,
                    fontWeight,
                    measurer: ctx.measurer,
                }, ctx.textMeasurementMode);
                return { width: widthPx, height: heightPx };
            });
        }
    },
    render(node, ctx) {
        renderShapeNode(node, ctx);
    },
};
