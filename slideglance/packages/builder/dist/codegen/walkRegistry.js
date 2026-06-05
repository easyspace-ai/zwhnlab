/**
 * Codegen helpers — flatten the compiled registry into a structure each
 * emitter can iterate independently.
 *
 * The compiled registry already exposes ALL_COMPILED_NODES / ALL_COMPILED_META;
 * this module wraps them with computed projections (root elements, container
 * categories, per-coerce simpleType mapping) so each emitter does not have to
 * recompute them.
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { ALL_COMPILED_NODES, ALL_COMPILED_META, validateCompiledRegistry, } from "../registry/compiled/index.js";
import { SEE_ALSO } from "./seeAlso.js";
export function walkRegistry() {
    validateCompiledRegistry();
    const nodes = ALL_COMPILED_NODES;
    const meta = ALL_COMPILED_META;
    const roots = nodes.filter((n) => n.root).map((n) => n.tag);
    // builder node tags = nodes that have a `type` discriminant; excludes
    // document containers (SlideGlance/Slide/Fragment).
    const nodeTags = nodes.filter((n) => n.type !== undefined).map((n) => n.tag);
    return { nodes, meta, roots, nodeTags };
}
/** Map a coerce type to a named XSD simpleType (or null for inline xs:string). */
export function coerceToXsdSimpleType(coerce) {
    switch (coerce) {
        case "number":
            return { named: null, primitive: "xs:double" };
        case "boolean":
            return { named: "b:Boolean", primitive: "xs:boolean" };
        case "string":
        case "json":
            return { named: null, primitive: "xs:string" };
        case "length":
            return { named: "b:Length", primitive: "xs:string" };
        case "color":
        case "iconColor":
            return { named: "b:Color", primitive: "xs:string" };
        case "padding":
            return { named: "b:Padding", primitive: "xs:string" };
        case "border":
            return { named: "b:BorderStyle", primitive: "xs:string" };
        case "fill":
            return { named: "b:FillStyle", primitive: "xs:string" };
        case "shadow":
            return { named: "b:ShadowStyle", primitive: "xs:string" };
        case "underline":
            return { named: "b:Underline", primitive: "xs:string" };
        case "imageSizing":
            return { named: "b:ImageSizing", primitive: "xs:string" };
        case "lineArrow":
            return { named: "b:LineArrow", primitive: "xs:string" };
        case "borderDash":
            return { named: "b:BorderDash", primitive: "xs:string" };
        case "shapeType":
            return { named: "b:ShapeType", primitive: "xs:string" };
        case "bulletNumberType":
            return { named: "b:BulletNumberType", primitive: "xs:string" };
        case "iconName":
            return { named: "b:IconName", primitive: "xs:string" };
        case "iconVariant":
            return { named: "b:IconVariant", primitive: "xs:string" };
        case "alignSelf":
        case "alignItems":
        case "justifyContent":
        case "flexWrap":
        case "positionType":
        case "textAlign":
        case "vAlign":
            // These are simple enums, emitted inline via the attribute's `enum` field.
            return { named: null, primitive: "xs:string" };
    }
}
const BUILDER_NS = "urn:slideglance:builder:v1";
function readPackageVersion() {
    const HERE = fileURLToPath(import.meta.url);
    const pkgPath = resolve(HERE, "../../../package.json");
    const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
    return pkg.version;
}
export function buildReferenceModel() {
    const r = walkRegistry();
    return {
        generatedAt: "",
        packageVersion: readPackageVersion(),
        namespace: BUILDER_NS,
        nodes: r.nodes,
        meta: r.meta,
        usedBy: deriveUsedBy(r.nodes, r.meta),
        seeAlso: new Map(Object.entries(SEE_ALSO)),
        sourceLocations: deriveSourceLocations(),
    };
}
/**
 * Scan `registry/compiled/index.ts` to associate each registered tag with the
 * source line of its `defineNode(...)` / `defineMeta(...)` call. The HTML
 * reference uses this to render "Defined at: <file>:<line>" footers.
 *
 * The registry uses the object form exclusively, with `tag:` on the line
 * immediately following `defineNode({` / `defineMeta({`. The regex matches
 * across the line break (`\s*` straddles whitespace including newlines);
 * `matchAll` returns the match plus its index so the line number is derived
 * by counting newlines in the prefix.
 */
function deriveSourceLocations() {
    const HERE = fileURLToPath(import.meta.url);
    const file = "src/registry/compiled/index.ts";
    const abs = resolve(HERE, "../../registry/compiled/index.ts");
    const content = readFileSync(abs, "utf8");
    const result = new Map();
    const re = /define(?:Node|Meta)\(\s*\{\s*tag:\s*["'](\w+)["']/g;
    for (const match of content.matchAll(re)) {
        const tag = match[1];
        if (tag === undefined)
            continue; // unreachable: \w+ always captures.
        const idx = match.index ?? 0;
        const line = content.slice(0, idx).split("\n").length;
        result.set(tag, { file, line });
    }
    return result;
}
/**
 * Whether a `NodeCategory` represents a container that accepts arbitrary
 * builder-node children. Switch is exhaustive against `NodeCategory` so adding
 * a new category in `src/registry/types.ts` triggers a TypeScript error here.
 */
function isContainerCategory(c) {
    switch (c) {
        case "leaf":
            return false;
        case "multi-child":
        case "absolute-child":
            return true;
    }
}
/**
 * Build the reverse parent-of index used by the HTML reference's "Used by"
 * section. Three passes merge declarative + inferred relationships:
 *
 *   Pass A — visual nodes declare children forward (e.g. Ul → Li, Table → Tr).
 *   Pass B — meta elements declare their parents via `allowedParents`.
 *   Pass C — category-based container inference: `multi-child` /
 *            `absolute-child` containers, plus `Slide`, accept any non-root
 *            builder node as a child (these relationships are not declared
 *            in `children` because the containers use polymorphic child
 *            handling at runtime).
 */
function deriveUsedBy(nodes, meta) {
    const result = new Map();
    const ensure = (tag) => {
        let arr = result.get(tag);
        if (!arr) {
            arr = [];
            result.set(tag, arr);
        }
        return arr;
    };
    // Pass A — visual nodes declare children forward (e.g. Ul → Li, Table → Tr).
    for (const parent of nodes) {
        for (const [key, spec] of Object.entries(parent.children ?? {})) {
            const childTag = spec.element ?? key;
            const min = spec.min ?? 0;
            const max = spec.max;
            ensure(childTag).push({
                parent: parent.tag,
                cardinality: formatCardinality(min, max),
            });
        }
    }
    // Pass B — meta elements declare their parents (allowedParents). Reverse
    // direction: a meta tag M with allowedParents=[P1, P2] means P1 and P2
    // are parents of M.
    for (const m of meta) {
        for (const parent of m.allowedParents) {
            ensure(m.tag).push({ parent, cardinality: "0..∞" });
        }
    }
    // Pass C — inferred container relationships. Nodes with container categories
    // (`multi-child`, `absolute-child`) accept any non-root builder node as a
    // child. `Slide` accepts a single body root and is treated the same way for
    // usedBy purposes (cardinality reflects "0..∞" since the page lists possible
    // parents, not occurrence counts). Self-nesting is omitted for readability —
    // a VStack page does not list itself in "Used by".
    const containers = nodes.filter((n) => (n.category !== undefined && isContainerCategory(n.category)) ||
        n.tag === "Slide");
    for (const container of containers) {
        for (const child of nodes) {
            if (child.tag === container.tag)
                continue; // skip self-nesting
            if (child.root)
                continue; // SlideGlance/Fragment never appear as children
            if (child.tag === "Slide")
                continue; // Slide is parent-only, never a child here
            ensure(child.tag).push({ parent: container.tag, cardinality: "0..∞" });
        }
    }
    // Pass D — Slide → SlideGlance is the document-root relationship that
    // SlideGlance does not declare via `children` (SlideGlance is a root node
    // without a `children` spec). Capture it explicitly so the Slide page does
    // not render as "Top-level".
    ensure("Slide").push({ parent: "SlideGlance", cardinality: "1..∞" });
    // Dedupe (parent, cardinality) tuples that could appear across passes.
    for (const [tag, entries] of result) {
        const seen = new Set();
        const unique = entries.filter((e) => {
            const key = `${e.parent}|${e.cardinality}`;
            if (seen.has(key))
                return false;
            seen.add(key);
            return true;
        });
        result.set(tag, unique);
    }
    return result;
}
function formatCardinality(min, max) {
    if (max === undefined)
        return min === 0 ? "0..∞" : `${min}..∞`;
    if (min === max)
        return String(min);
    return `${min}..${max}`;
}
