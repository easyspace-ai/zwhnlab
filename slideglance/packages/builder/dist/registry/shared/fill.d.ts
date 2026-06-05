/**
 * Fill + shadow atoms used by Shape, Master objects, and base node styling.
 */
import { z } from "zod";
export declare const fillStyleSchema: z.ZodObject<{
    color: z.ZodOptional<z.ZodString>;
    transparency: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export declare const shadowStyleSchema: z.ZodObject<{
    type: z.ZodOptional<z.ZodEnum<{
        outer: "outer";
        inner: "inner";
    }>>;
    opacity: z.ZodOptional<z.ZodNumber>;
    blur: z.ZodOptional<z.ZodNumber>;
    angle: z.ZodOptional<z.ZodNumber>;
    offset: z.ZodOptional<z.ZodNumber>;
    color: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type FillStyle = z.infer<typeof fillStyleSchema>;
export type ShadowStyle = z.infer<typeof shadowStyleSchema>;
//# sourceMappingURL=fill.d.ts.map