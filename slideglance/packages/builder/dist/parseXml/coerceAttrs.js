/**
 * Attribute-shape helpers shared by the dispatcher and the child element
 * converters.
 *
 * - `expandDotNotation` splits `fill.color="red"` into a nested group.
 * - `coerceChildAttrs` runs the standard regular + dot-notation coercion
 *   for child elements (Cell/Col/Li/etc.) backed by
 *   `CHILD_ATTRIBUTE_SPECS`.
 */
import { CHILD_ATTRIBUTE_SPECS } from "./childAttributeSpecs.js";
import { coerceBySpec, coerceFallback, getObjectShape, resolveMixedNotationForSpec, } from "./coerceByType.js";
import { applyStylesToAttrs } from "./styles.js";
import { findClosestMatch } from "./validation.js";
export function expandDotNotation(attrs) {
    const regular = {};
    const dotGroups = {};
    for (const [key, value] of Object.entries(attrs)) {
        const dotIndex = key.indexOf(".");
        if (dotIndex > 0) {
            const prefix = key.substring(0, dotIndex);
            const suffix = key.substring(dotIndex + 1);
            if (!dotGroups[prefix])
                dotGroups[prefix] = {};
            dotGroups[prefix][suffix] = value;
        }
        else {
            regular[key] = value;
        }
    }
    return { regular, dotGroups };
}
/**
 * Coerce a dot-notation group against an `AttributeSpec`. The spec's
 * effective object shape (`objectShape ?? STRUCTURED_SHAPES[coerce]`)
 * drives sub-field validation.
 */
function coerceDotGroup(prefix, subAttrs, spec, tagName, errors) {
    const objectShape = getObjectShape(spec);
    const obj = {};
    if (!objectShape) {
        errors.push(`<${tagName}>: Attribute "${prefix}" does not support dot notation`);
        return obj;
    }
    for (const [subKey, subValue] of Object.entries(subAttrs)) {
        const subType = objectShape[subKey];
        if (!subType) {
            const knownSubKeys = Object.keys(objectShape);
            const suggestion = findClosestMatch(subKey, knownSubKeys);
            errors.push(`<${tagName}>: Unknown sub-attribute "${prefix}.${subKey}"${suggestion ? `. Did you mean "${prefix}.${suggestion}"?` : ""}`);
            continue;
        }
        const coerced = coerceBySpec(subValue, { coerce: subType });
        if (coerced.error !== null) {
            errors.push(`<${tagName}>: ${prefix}.${subKey}: ${coerced.error}`);
        }
        else {
            obj[subKey] = coerced.value;
        }
    }
    return obj;
}
/**
 * Coerce attributes of a child element (Cell, Col, Li, etc.)
 * against `CHILD_ATTRIBUTE_SPECS`. Applies styles first, expands
 * dot-notation, and resolves shorthand/dot mixed notation.
 */
export function coerceChildAttrs(parentTagName, tagName, attrs, errors, styles = {}) {
    const resolvedAttrs = applyStylesToAttrs(tagName, attrs, styles, errors, `${parentTagName}.${tagName}`);
    const specs = CHILD_ATTRIBUTE_SPECS[tagName];
    const result = {};
    const { regular: regularAttrs, dotGroups } = expandDotNotation(resolvedAttrs);
    const errorTagName = `${parentTagName}.${tagName}`;
    // Process dot-notation attributes
    for (const [prefix, subAttrs] of Object.entries(dotGroups)) {
        const spec = specs?.[prefix];
        if (spec) {
            result[prefix] = coerceDotGroup(prefix, subAttrs, spec, errorTagName, errors);
        }
        else if (specs) {
            const knownAttrs = Object.keys(specs);
            const suggestion = findClosestMatch(prefix, knownAttrs);
            errors.push(`<${parentTagName}>.<${tagName}>: Unknown attribute "${prefix}"${suggestion ? `. Did you mean "${suggestion}"?` : ""}`);
        }
        else {
            // Fallback for child tags not registered (developer safety net).
            result[prefix] = {};
            for (const [subKey, subValue] of Object.entries(subAttrs)) {
                result[prefix][subKey] =
                    coerceFallback(subValue);
            }
        }
    }
    // Process regular attributes
    for (const [key, value] of Object.entries(regularAttrs)) {
        if (key in dotGroups) {
            const spec = specs?.[key];
            if (spec) {
                const resolved = resolveMixedNotationForSpec(value, spec);
                if (resolved.mode === "ignore")
                    continue;
                if (resolved.mode === "merge") {
                    result[key] = {
                        ...resolved.value,
                        ...result[key],
                    };
                    continue;
                }
            }
            errors.push(`<${parentTagName}>.<${tagName}>: Attribute "${key}" conflicts with dot-notation attributes. Use one or the other, not both`);
            continue;
        }
        const spec = specs?.[key];
        if (spec) {
            const coerced = coerceBySpec(value, spec);
            if (coerced.error !== null) {
                errors.push(`<${parentTagName}>.<${tagName}>: ${coerced.error}`);
            }
            else {
                result[key] = coerced.value;
            }
        }
        else if (specs) {
            const knownAttrs = Object.keys(specs);
            const suggestion = findClosestMatch(key, knownAttrs);
            errors.push(`<${parentTagName}>.<${tagName}>: Unknown attribute "${key}"${suggestion ? `. Did you mean "${suggestion}"?` : ""}`);
        }
        else {
            result[key] = coerceFallback(value);
        }
    }
    return result;
}
