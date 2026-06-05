/**
 * Border atoms: dash type enum + composite border style.
 */
import { z } from "zod";
export declare const borderDashSchema: z.ZodEnum<{
    solid: "solid";
    dash: "dash";
    dashDot: "dashDot";
    lgDash: "lgDash";
    lgDashDot: "lgDashDot";
    lgDashDotDot: "lgDashDotDot";
    sysDash: "sysDash";
    sysDot: "sysDot";
}>;
export declare const borderStyleSchema: z.ZodObject<{
    color: z.ZodOptional<z.ZodString>;
    width: z.ZodOptional<z.ZodNumber>;
    dashType: z.ZodOptional<z.ZodEnum<{
        solid: "solid";
        dash: "dash";
        dashDot: "dashDot";
        lgDash: "lgDash";
        lgDashDot: "lgDashDot";
        lgDashDotDot: "lgDashDotDot";
        sysDash: "sysDash";
        sysDot: "sysDot";
    }>>;
}, z.core.$strip>;
export type BorderDash = z.infer<typeof borderDashSchema>;
export type BorderStyle = z.infer<typeof borderStyleSchema>;
//# sourceMappingURL=border.d.ts.map