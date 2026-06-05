/**
 * Attribute-shape helpers shared by the dispatcher and the child element
 * converters.
 *
 * - `expandDotNotation` splits `fill.color="red"` into a nested group.
 * - `coerceChildAttrs` runs the standard regular + dot-notation coercion
 *   for child elements (Cell/Col/Li/etc.) backed by
 *   `CHILD_ATTRIBUTE_SPECS`.
 */
import { type StyleRegistry } from "./styles.ts";
export declare function expandDotNotation(attrs: Record<string, string>): {
    regular: Record<string, string>;
    dotGroups: Record<string, Record<string, string>>;
};
/**
 * Coerce attributes of a child element (Cell, Col, Li, etc.)
 * against `CHILD_ATTRIBUTE_SPECS`. Applies styles first, expands
 * dot-notation, and resolves shorthand/dot mixed notation.
 */
export declare function coerceChildAttrs(parentTagName: string, tagName: string, attrs: Record<string, string>, errors: string[], styles?: StyleRegistry): Record<string, unknown>;
//# sourceMappingURL=coerceAttrs.d.ts.map