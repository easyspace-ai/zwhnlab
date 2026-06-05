import { normalizeDefaultTextStyle, } from "./defaultTextStyle.js";
import { DiagnosticCollector } from "./diagnostics.js";
import { createMeasurer, } from "./calcYogaLayout/fontLoader.js";
const DEFAULT_HREF_SCHEMES = ["https:", "http:", "mailto:", "tel:"];
export function createBuildContext(options = {}) {
    const mergedSchemes = options.allowedHrefSchemes
        ? [...DEFAULT_HREF_SCHEMES, ...options.allowedHrefSchemes]
        : DEFAULT_HREF_SCHEMES;
    return {
        textMeasurementMode: options.textMeasurementMode ?? "auto",
        defaultTextStyle: normalizeDefaultTextStyle(options.defaultTextStyle),
        imageSizeCache: new Map(),
        imageDataCache: new Map(),
        iconRasterCache: new Map(),
        diagnostics: new DiagnosticCollector(),
        security: {
            allowedHrefSchemes: new Set(mergedSchemes),
            imageSrcGuard: options.imageSrcGuard,
        },
        defaultLang: options.defaultLang,
        measurer: createMeasurer(options.fonts),
    };
}
