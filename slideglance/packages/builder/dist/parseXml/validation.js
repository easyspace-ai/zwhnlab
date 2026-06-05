/**
 * Validation helpers used by parseXml: Levenshtein-based suggestion, Zod
 * issue formatting, and per-leaf-node Zod schema validation.
 */
import { textNodeSchema, ulNodeSchema, olNodeSchema, imageNodeSchema, iconNodeSchema, svgNodeSchema, tableNodeSchema, shapeNodeSchema, chartNodeSchema, lineNodeSchema, } from "../types.js";
import { formatErrorAt } from "./xml.js";
function levenshteinDistance(a, b) {
    const m = a.length;
    const n = b.length;
    // The DP table is fully populated below; every read targets a row+column
    // we just wrote, so non-null assertions are safe under
    // `noUncheckedIndexedAccess`.
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
    for (let i = 0; i <= m; i++)
        dp[i][0] = i;
    for (let j = 0; j <= n; j++)
        dp[0][j] = j;
    for (let i = 1; i <= m; i++) {
        const row = dp[i];
        const prevRow = dp[i - 1];
        for (let j = 1; j <= n; j++) {
            row[j] =
                a[i - 1] === b[j - 1]
                    ? prevRow[j - 1]
                    : 1 + Math.min(prevRow[j], row[j - 1], prevRow[j - 1]);
        }
    }
    return dp[m][n];
}
export function findClosestMatch(input, candidates) {
    const threshold = Math.max(2, Math.floor(input.length / 2));
    let bestMatch;
    let bestDistance = Infinity;
    for (const candidate of candidates) {
        const dist = levenshteinDistance(input.toLowerCase(), candidate.toLowerCase());
        if (dist < bestDistance && dist <= threshold) {
            bestDistance = dist;
            bestMatch = candidate;
        }
    }
    return bestMatch;
}
// Properties that may be legitimately absent when using child element notation
// or when the property is optional in practice (even if required in schema).
const CHILD_ELEMENT_PROPS = {
    table: new Set(["columns", "rows"]),
    chart: new Set(["data"]),
    ul: new Set(["items"]),
    ol: new Set(["items"]),
    icon: new Set(["name"]),
    svg: new Set(["svgContent"]),
};
const leafNodeValidationSchemas = {
    text: textNodeSchema,
    image: imageNodeSchema,
    table: tableNodeSchema,
    shape: shapeNodeSchema,
    chart: chartNodeSchema,
    line: lineNodeSchema,
    ul: ulNodeSchema,
    ol: olNodeSchema,
    icon: iconNodeSchema,
    svg: svgNodeSchema,
};
// Universal attributes accepted on any node (e.g., x/y for Layer children).
// Keep in sync with parseXml's UNIVERSAL_ATTRS.
const UNIVERSAL_VALIDATION_ATTRS = new Set(["x", "y"]);
/**
 * Map a Zod issue to a user-facing diagnostic string. Returns `null` for
 * issues that should be suppressed (children sub-tree, internal `type`
 * field).
 */
function formatZodIssue(issue, tagName) {
    const path = issue.path;
    // Skip children-related issues (validated recursively)
    if (path.length > 0 && path[0] === "children")
        return null;
    // Skip "type" field issues (set internally)
    if (path.length === 1 && path[0] === "type")
        return null;
    const attrName = path.length > 0 ? String(path[0]) : undefined;
    const code = issue.code;
    if (code === "invalid_type") {
        if (issue.input === undefined) {
            if (attrName) {
                return `<${tagName}>: Missing required attribute "${attrName}"`;
            }
            return `<${tagName}>: ${issue.message}`;
        }
        if (attrName) {
            return `<${tagName}>: Invalid type for attribute "${attrName}". ${issue.message}`;
        }
        return `<${tagName}>: ${issue.message}`;
    }
    if (code === "invalid_value") {
        if (attrName) {
            const values = issue.values;
            if (values) {
                return `<${tagName}>: Invalid value for attribute "${attrName}". Expected: ${values.map((v) => `"${v}"`).join(", ")}`;
            }
            return `<${tagName}>: Invalid value for attribute "${attrName}". ${issue.message}`;
        }
        return `<${tagName}>: ${issue.message}`;
    }
    if (code === "too_small" || code === "too_big") {
        if (attrName) {
            return `<${tagName}>: Invalid value for attribute "${attrName}". ${issue.message}`;
        }
        return `<${tagName}>: ${issue.message}`;
    }
    if (attrName) {
        return `<${tagName}>: Attribute "${attrName}": ${issue.message}`;
    }
    return `<${tagName}>: ${issue.message}`;
}
/**
 * Append non-suppressed Zod issues from a parse result to `errors`.
 */
export function appendSchemaErrors(parseResult, tagName, errors, node) {
    if (parseResult.success || !parseResult.error)
        return;
    const seen = new Set();
    for (const issue of parseResult.error.issues) {
        const msg = formatZodIssue(issue, tagName);
        if (msg && !seen.has(msg)) {
            seen.add(msg);
            errors.push(node ? formatErrorAt(node, msg) : msg);
        }
    }
}
/**
 * Run leaf-node Zod validation, suppressing issues for properties that may be
 * legitimately absent under child-element notation, and for universal attrs.
 */
export function validateLeafNode(nodeType, result, errors, tagName, node) {
    const schema = leafNodeValidationSchemas[nodeType];
    if (!schema)
        return;
    const childProps = CHILD_ELEMENT_PROPS[nodeType];
    const parseResult = schema.safeParse(result);
    if (!parseResult.success) {
        const seen = new Set();
        for (const issue of parseResult.error.issues) {
            // Skip only top-level missing child-element properties (path.length === 1)
            // Nested issues (e.g., data.children[0].label) must still be reported.
            if (childProps &&
                issue.path.length === 1 &&
                childProps.has(String(issue.path[0])) &&
                issue.code === "invalid_type" &&
                issue.input === undefined) {
                continue;
            }
            // Skip issues for universal attributes (x, y).
            if (issue.path.length > 0 &&
                UNIVERSAL_VALIDATION_ATTRS.has(String(issue.path[0]))) {
                continue;
            }
            const msg = formatZodIssue(issue, tagName);
            if (msg && !seen.has(msg)) {
                seen.add(msg);
                errors.push(node ? formatErrorAt(node, msg) : msg);
            }
        }
    }
}
