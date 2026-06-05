/**
 * Validation helpers used by parseXml: Levenshtein-based suggestion, Zod
 * issue formatting, and per-leaf-node Zod schema validation.
 */
import { z } from "zod";
import { type XmlElement } from "./xml.ts";
export declare function findClosestMatch(input: string, candidates: string[]): string | undefined;
/**
 * Append non-suppressed Zod issues from a parse result to `errors`.
 */
export declare function appendSchemaErrors(parseResult: {
    success: boolean;
    error?: {
        issues: z.core.$ZodIssue[];
    };
}, tagName: string, errors: string[], node?: XmlElement): void;
/**
 * Run leaf-node Zod validation, suppressing issues for properties that may be
 * legitimately absent under child-element notation, and for universal attrs.
 */
export declare function validateLeafNode(nodeType: string, result: Record<string, unknown>, errors: string[], tagName: string, node?: XmlElement): void;
//# sourceMappingURL=validation.d.ts.map