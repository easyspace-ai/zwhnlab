/**
 * Underline + default text style atoms.
 */
import { z } from "zod";
export declare const underlineStyleSchema: z.ZodEnum<{
    dash: "dash";
    dashHeavy: "dashHeavy";
    dashLong: "dashLong";
    dashLongHeavy: "dashLongHeavy";
    dbl: "dbl";
    dotDash: "dotDash";
    dotDotDash: "dotDotDash";
    dotted: "dotted";
    dottedHeavy: "dottedHeavy";
    heavy: "heavy";
    none: "none";
    sng: "sng";
    wavy: "wavy";
    wavyDbl: "wavyDbl";
    wavyHeavy: "wavyHeavy";
}>;
export declare const underlineSchema: z.ZodUnion<readonly [z.ZodBoolean, z.ZodObject<{
    style: z.ZodOptional<z.ZodEnum<{
        dash: "dash";
        dashHeavy: "dashHeavy";
        dashLong: "dashLong";
        dashLongHeavy: "dashLongHeavy";
        dbl: "dbl";
        dotDash: "dotDash";
        dotDotDash: "dotDotDash";
        dotted: "dotted";
        dottedHeavy: "dottedHeavy";
        heavy: "heavy";
        none: "none";
        sng: "sng";
        wavy: "wavy";
        wavyDbl: "wavyDbl";
        wavyHeavy: "wavyHeavy";
    }>>;
    color: z.ZodOptional<z.ZodString>;
}, z.core.$strip>]>;
export declare const defaultTextStyleSchema: z.ZodObject<{
    fontFamily: z.ZodOptional<z.ZodString>;
    fontSize: z.ZodOptional<z.ZodNumber>;
    color: z.ZodOptional<z.ZodString>;
    bold: z.ZodOptional<z.ZodBoolean>;
    italic: z.ZodOptional<z.ZodBoolean>;
    underline: z.ZodOptional<z.ZodUnion<readonly [z.ZodBoolean, z.ZodObject<{
        style: z.ZodOptional<z.ZodEnum<{
            dash: "dash";
            dashHeavy: "dashHeavy";
            dashLong: "dashLong";
            dashLongHeavy: "dashLongHeavy";
            dbl: "dbl";
            dotDash: "dotDash";
            dotDotDash: "dotDotDash";
            dotted: "dotted";
            dottedHeavy: "dottedHeavy";
            heavy: "heavy";
            none: "none";
            sng: "sng";
            wavy: "wavy";
            wavyDbl: "wavyDbl";
            wavyHeavy: "wavyHeavy";
        }>>;
        color: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>]>>;
    strike: z.ZodOptional<z.ZodBoolean>;
    highlight: z.ZodOptional<z.ZodString>;
    lineHeight: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export type UnderlineStyle = z.infer<typeof underlineStyleSchema>;
export type Underline = z.infer<typeof underlineSchema>;
export type DefaultTextStyle = z.infer<typeof defaultTextStyleSchema>;
//# sourceMappingURL=text-style.d.ts.map