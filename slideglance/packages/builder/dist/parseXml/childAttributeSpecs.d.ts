/**
 * Per-child-element attribute specs.
 *
 * These describe child elements that are *not* full builder nodes (Master/Slide
 * objects, table Col/Tr/Td, list Li, inline format A/B/I/U/S/Mark/Span). The
 * schema for each child element is a flat `Record<attrName, AttributeSpec>`;
 * the dispatcher and child converters consume them via `coerceChildAttrs`.
 *
 * A future cleanup may roll these into the compiled registry alongside
 * `defineMeta` / `defineNode`. For now they live in this dedicated map so
 * that runtime coercion can be driven entirely by `AttributeSpec` and
 * `coerceByType` — without depending on the legacy `coerceWithRule`.
 */
import type { AttributeSpec } from "../registry/defineNode.ts";
export declare const CHILD_ATTRIBUTE_SPECS: Record<string, Record<string, AttributeSpec>>;
//# sourceMappingURL=childAttributeSpecs.d.ts.map