/**
 * Border atoms: dash type enum + composite border style.
 */
import { z } from "zod";
export const borderDashSchema = z.enum([
    "solid",
    "dash",
    "dashDot",
    "lgDash",
    "lgDashDot",
    "lgDashDotDot",
    "sysDash",
    "sysDot",
]);
export const borderStyleSchema = z.object({
    color: z.string().optional(),
    width: z.number().optional(),
    dashType: borderDashSchema.optional(),
});
