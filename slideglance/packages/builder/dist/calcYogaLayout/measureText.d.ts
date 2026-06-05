import { type TextMeasurer } from "./fontLoader.ts";
type MeasureOptions = {
    fontFamily: string;
    fontSizePx: number;
    fontWeight?: "normal" | "bold" | number;
    lineHeight?: number;
    /**
     * Optional caller-supplied measurer. When set, opentype measurement
     * routes through this measurer instead of the bundled-fonts singleton,
     * letting consumers attach their own TTF/OTF buffers so the wrap
     * decision uses the same font the renderer will actually paint.
     * See `createMeasurer` in `fontLoader.ts`.
     */
    measurer?: TextMeasurer;
};
export type TextMeasurementMode = "opentype" | "fallback" | "auto";
/**
 * Lay out `text` with wrapping and return the resulting box size.
 */
export declare function measureText(text: string, maxWidthPx: number, opts: MeasureOptions, mode?: TextMeasurementMode): {
    widthPx: number;
    heightPx: number;
};
export {};
//# sourceMappingURL=measureText.d.ts.map