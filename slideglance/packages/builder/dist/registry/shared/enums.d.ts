/**
 * Layout / list / shape enum atoms used across nodes.
 */
import { z } from "zod";
export declare const alignItemsSchema: z.ZodEnum<{
    baseline: "baseline";
    start: "start";
    center: "center";
    end: "end";
    stretch: "stretch";
}>;
export declare const alignSelfSchema: z.ZodEnum<{
    start: "start";
    center: "center";
    end: "end";
    stretch: "stretch";
    auto: "auto";
}>;
export declare const positionTypeSchema: z.ZodEnum<{
    relative: "relative";
    absolute: "absolute";
}>;
export declare const flexWrapSchema: z.ZodEnum<{
    nowrap: "nowrap";
    wrap: "wrap";
    wrapReverse: "wrapReverse";
}>;
export declare const justifyContentSchema: z.ZodEnum<{
    start: "start";
    center: "center";
    end: "end";
    spaceBetween: "spaceBetween";
    spaceAround: "spaceAround";
    spaceEvenly: "spaceEvenly";
}>;
export declare const bulletNumberTypeSchema: z.ZodEnum<{
    alphaLcParenBoth: "alphaLcParenBoth";
    alphaLcParenR: "alphaLcParenR";
    alphaLcPeriod: "alphaLcPeriod";
    alphaUcParenBoth: "alphaUcParenBoth";
    alphaUcParenR: "alphaUcParenR";
    alphaUcPeriod: "alphaUcPeriod";
    arabicParenBoth: "arabicParenBoth";
    arabicParenR: "arabicParenR";
    arabicPeriod: "arabicPeriod";
    arabicPlain: "arabicPlain";
    romanLcParenBoth: "romanLcParenBoth";
    romanLcParenR: "romanLcParenR";
    romanLcPeriod: "romanLcPeriod";
    romanUcParenBoth: "romanUcParenBoth";
    romanUcParenR: "romanUcParenR";
    romanUcPeriod: "romanUcPeriod";
}>;
export type AlignItems = z.infer<typeof alignItemsSchema>;
export type AlignSelf = z.infer<typeof alignSelfSchema>;
export type PositionType = z.infer<typeof positionTypeSchema>;
export type FlexWrap = z.infer<typeof flexWrapSchema>;
export type JustifyContent = z.infer<typeof justifyContentSchema>;
export type BulletNumberType = z.infer<typeof bulletNumberTypeSchema>;
//# sourceMappingURL=enums.d.ts.map