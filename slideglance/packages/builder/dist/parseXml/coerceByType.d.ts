/**
 * Self-contained coercion engine driven by registry `CoerceType`.
 *
 * Replaces the runtime use of `coercionRules.ts` for node-level attributes:
 * the dispatcher reads `AttributeSpec` (from compiled/index.ts) and calls
 * `coerceByType` to convert string XML attribute values to typed BuilderNode
 * fields. Sub-shape information for object-typed coerces lives in
 * `STRUCTURED_SHAPES` (implied by the type) or on the spec itself
 * (`AttributeSpec.objectShape` for `coerce: "json"` attrs that nonetheless
 * support dot-notation).
 */
import type { AttributeSpec, CoerceType } from "../registry/defineNode.ts";
export interface CoerceResult {
    value: unknown;
    error: string | null;
}
/**
 * Effective sub-field shape for an attribute. Falls back to the
 * type-implied shape when the spec does not override.
 */
export declare function getObjectShape(spec: AttributeSpec): Record<string, CoerceType> | undefined;
/**
 * Coerce a string XML attribute value into its declared registry type.
 * `objectShape` overrides the implied shape for `coerce: "json"` attrs
 * that nonetheless need structured dot-notation handling.
 */
export declare function coerceByType(value: string, coerceType: CoerceType, objectShape?: Record<string, CoerceType>): CoerceResult;
/**
 * Coerce by attribute spec. Convenience wrapper that pulls
 * `objectShape` off the spec if present.
 */
export declare function coerceBySpec(value: string, spec: AttributeSpec): CoerceResult;
/**
 * Loose fallback used for unmapped attrs (e.g., x/y safety net for
 * future nodes not yet in the registry). Tries boolean → number → JSON →
 * raw string.
 */
export declare function coerceFallback(value: string): unknown;
type MixedNotationResolution = {
    mode: "merge";
    value: Record<string, unknown>;
} | {
    mode: "ignore";
} | {
    mode: "conflict";
};
/**
 * Resolve the same-key shorthand-vs-dot-notation conflict against an
 * attribute spec. Mirrors `resolveMixedNotationShorthand` from the legacy
 * coercion engine.
 */
export declare function resolveMixedNotationForSpec(value: string, spec: AttributeSpec): MixedNotationResolution;
export {};
//# sourceMappingURL=coerceByType.d.ts.map