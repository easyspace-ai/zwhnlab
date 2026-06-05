/**
 * Length atom: number, "max", or `\d+%` percentage string.
 *
 * Used as the canonical type for `w`, `h`, and other dimensional
 * attributes that accept either a number, the keyword `"max"`, or a
 * percent string like `"50%"`.
 */
import { z } from "zod";
export declare const lengthSchema: z.ZodUnion<readonly [z.ZodNumber, z.ZodLiteral<"max">, z.ZodString]>;
export type Length = z.infer<typeof lengthSchema>;
//# sourceMappingURL=length.d.ts.map