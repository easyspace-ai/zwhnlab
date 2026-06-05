/**
 * Padding atom: a single number or per-side `{top,right,bottom,left}` object.
 * Used for both `padding` and `margin` attributes.
 */
import { z } from "zod";
export declare const paddingSchema: z.ZodUnion<readonly [z.ZodNumber, z.ZodObject<{
    top: z.ZodOptional<z.ZodNumber>;
    right: z.ZodOptional<z.ZodNumber>;
    bottom: z.ZodOptional<z.ZodNumber>;
    left: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>]>;
export type Padding = z.infer<typeof paddingSchema>;
//# sourceMappingURL=padding.d.ts.map