/**
 * Background-image atom: optional source + sizing keyword.
 */
import { z } from "zod";
declare const backgroundImageSizingSchema: z.ZodEnum<{
    cover: "cover";
    contain: "contain";
}>;
export declare const backgroundImageSchema: z.ZodObject<{
    src: z.ZodString;
    sizing: z.ZodOptional<z.ZodEnum<{
        cover: "cover";
        contain: "contain";
    }>>;
}, z.core.$strip>;
export type BackgroundImageSizing = z.infer<typeof backgroundImageSizingSchema>;
export type BackgroundImage = z.infer<typeof backgroundImageSchema>;
export {};
//# sourceMappingURL=background.d.ts.map