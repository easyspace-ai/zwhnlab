import type { PositionedNode, SlideMasterOptions } from "../types.ts";
import type { BuildContext } from "../buildContext.ts";
type SlidePx = {
    w: number;
    h: number;
};
/**
 * Converts PositionedNode trees into PptxGenJS slides.
 * @param pages Array of PositionedNode trees, one per slide
 * @param slidePx Full slide dimensions in px
 * @param masters Optional slide master options
 * @returns PptxGenJS instance
 */
export declare function renderPptx(pages: PositionedNode[], slidePx: SlidePx, buildContext: BuildContext, masters?: SlideMasterOptions[], defaultMasterName?: string, masterContents?: Record<string, PositionedNode[]>, docProps?: {
    title?: string;
    author?: string;
    company?: string;
    subject?: string;
}): Promise<import("pptxgenjs").default>;
export {};
//# sourceMappingURL=renderPptx.d.ts.map