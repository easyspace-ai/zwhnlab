import type { DefaultTextStyle } from "../types.ts";
import type { PositionedNode, Underline, UnderlineStyle } from "../types.ts";
type TextNode = Extract<PositionedNode, {
    type: "text";
}>;
/**
 * Converts the underline property to pptxgenjs format.
 */
export declare function convertUnderline(underline: Underline | undefined): {
    style?: UnderlineStyle;
    color?: string;
} | undefined;
/**
 * Converts the strike property to pptxgenjs format.
 */
export declare function convertStrike(strike: boolean | undefined): "sngStrike" | undefined;
export declare function createTextOptions(node: TextNode, defaultTextStyle?: DefaultTextStyle): {
    x: number;
    y: number;
    w: number;
    h: number;
    fontSize: number;
    fontFace: string;
    align: "right" | "left" | "center";
    valign: "top" | "bottom" | "middle";
    margin: number;
    lineSpacingMultiple: number;
    color: string | undefined;
    bold: boolean | undefined;
    italic: boolean | undefined;
    underline: {
        style?: UnderlineStyle;
        color?: string;
    } | undefined;
    strike: "sngStrike" | undefined;
    highlight: string | undefined;
    charSpacing: number | undefined;
};
export {};
//# sourceMappingURL=textOptions.d.ts.map