// ===== Template macro expansion =====
//
// Implements <Templates>/<Template>/<Use>/<Slot> as a parse-time macro pass over
// the raw XML tree.
//
// - <Template name="X" params="a,b,c"> declares a reusable XML body. The
//   `params` attribute is optional and informational only — any `{name}`
//   placeholder in attribute values or text content is substituted from the
//   matching attribute on <Use>.
// - <Use template="X" a="..." b="..." /> expands to the template body with
//   placeholders substituted. Any <Use> attribute (except `template`) is
//   exposed as a placeholder value, so the same `{name}` mechanism works for
//   layout attrs (w, gap, alignItems, class, ...) as well as text content.
// - <Slot name="N"/> in the template body is replaced with the matching
//   <Slot name="N">...</Slot> child of <Use>; if no matching slot is supplied,
//   the marker's own children are used as default content.
//
// MyBatis-style control flow runs in the same pass and reads the same scope:
// - <If test="expr">…</If> includes its body when `expr` is truthy.
// - <Choose> picks the first <When test="expr"> whose expression is truthy,
//   else falls back to a single optional <Otherwise>.
// - <Foreach items="json-or-{ref}" as="m" indexAs="i" firstAs="f" lastAs="l">…</Foreach>
//   parses `items` as a JSON array (after placeholder substitution) and
//   repeats its body once per element with the iteration vars in scope.
//
// `{name}` substitution accepts dotted paths (`{m.title}`) so iterated items
// can be unpacked attribute-by-attribute. Object/array values stringify to
// JSON when used as a placeholder; primitives use String().
import { evaluateExpression, resolvePath } from "./expression.js";
import { formatErrorAt } from "./xml.js";
const MAX_EXPANSION_DEPTH = 32;
export const DEFAULT_MAX_TEMPLATE_NODES = 100_000;
// Matches {{name}} (escape — produces literal {name}) or {name.path} (substitution).
// Group 1: escape payload (from {{…}}), group 2: dotted path (from {…}).
const PLACEHOLDER_RE = /\{\{([a-zA-Z_][a-zA-Z0-9_.]*)\}\}|\{([a-zA-Z_][a-zA-Z0-9_.]*)\}/g;
function isTextNode(node) {
    return "#text" in node;
}
function getTagName(node) {
    for (const key of Object.keys(node)) {
        if (key !== ":@")
            return key;
    }
    throw new Error("No tag name found in XML element");
}
function getRawChildren(node) {
    const tagName = getTagName(node);
    return node[tagName] ?? [];
}
function getChildElements(node) {
    return getRawChildren(node).filter((child) => !isTextNode(child));
}
function getAttributes(node) {
    const attrs = {};
    const rawAttrs = node[":@"];
    if (rawAttrs) {
        for (const [key, value] of Object.entries(rawAttrs)) {
            const attrName = key.startsWith("@_") ? key.slice(2) : key;
            attrs[attrName] = value;
        }
    }
    return attrs;
}
function buildElement(tag, attrs, children) {
    const el = { [tag]: children };
    if (Object.keys(attrs).length > 0) {
        const rawAttrs = {};
        for (const [k, v] of Object.entries(attrs)) {
            rawAttrs[`@_${k}`] = v;
        }
        el[":@"] = rawAttrs;
    }
    return el;
}
function deepCloneNode(node) {
    if (isTextNode(node))
        return { "#text": node["#text"] };
    const tag = getTagName(node);
    const attrs = getAttributes(node);
    const children = getRawChildren(node).map(deepCloneNode);
    return buildElement(tag, attrs, children);
}
/**
 * Collect <Templates>/<Template> definitions from the SlideGlance children and
 * return both the registry and the children with <Templates> blocks removed.
 */
export function collectTemplates(rootChildren, errors) {
    const registry = new Map();
    const remaining = [];
    for (const child of rootChildren) {
        if (getTagName(child) !== "Templates") {
            remaining.push(child);
            continue;
        }
        for (const tmplEl of getChildElements(child)) {
            const tag = getTagName(tmplEl);
            if (tag !== "Template") {
                errors.push(formatErrorAt(tmplEl, `<Templates>: unexpected child <${tag}>; only <Template> is allowed`));
                continue;
            }
            const attrs = getAttributes(tmplEl);
            const name = attrs.name?.trim();
            if (!name) {
                errors.push(formatErrorAt(tmplEl, '<Template>: missing required attribute "name"'));
                continue;
            }
            if (registry.has(name)) {
                errors.push(formatErrorAt(tmplEl, `<Template name="${name}">: duplicate template name`));
                continue;
            }
            registry.set(name, {
                name,
                body: getRawChildren(tmplEl).map(deepCloneNode),
            });
        }
    }
    return { registry, remaining };
}
function stringifyForSubstitution(value) {
    if (value === null || value === undefined)
        return "";
    if (typeof value === "string")
        return value;
    if (typeof value === "number" || typeof value === "boolean") {
        return String(value);
    }
    return JSON.stringify(value);
}
function substituteString(s, scope, errors, templateName) {
    return s.replace(PLACEHOLDER_RE, (_, escapeGroup, subGroup) => {
        // {{name}} — escape sequence; produces literal {name}
        if (escapeGroup !== undefined)
            return `{${escapeGroup}}`;
        // {name} or {name.path} — substitution placeholder
        const path = subGroup.split(".");
        const head = path[0];
        if (!(head in scope)) {
            errors.push(`<Use template="${templateName}">: placeholder "{${subGroup}}" has no matching attribute`);
            return `{${subGroup}}`;
        }
        const value = resolvePath(scope, path);
        if (value === undefined) {
            errors.push(`<Use template="${templateName}">: placeholder "{${subGroup}}" resolves to undefined`);
            return `{${subGroup}}`;
        }
        return stringifyForSubstitution(value);
    });
}
function evaluateBoolean(expr, scope, errors, whereForError) {
    try {
        return Boolean(evaluateExpression(expr, scope));
    }
    catch (e) {
        errors.push(`${whereForError}: ${e.message}`);
        return false;
    }
}
function expandForeach(node, scope, slots, errors, templateName, slotRoots) {
    const attrs = getAttributes(node);
    const itemsRaw = attrs.items;
    if (itemsRaw === undefined || itemsRaw === "") {
        errors.push(`<Foreach>: missing required attribute "items"`);
        return [];
    }
    const asName = attrs.as?.trim();
    if (!asName) {
        errors.push(`<Foreach>: missing required attribute "as"`);
        return [];
    }
    const itemsStr = substituteString(itemsRaw, scope, errors, templateName);
    let parsed;
    try {
        parsed = JSON.parse(itemsStr);
    }
    catch (e) {
        errors.push(`<Foreach items="${itemsRaw}">: invalid JSON — ${e.message}`);
        return [];
    }
    if (!Array.isArray(parsed)) {
        errors.push(`<Foreach items="${itemsRaw}">: items must be a JSON array`);
        return [];
    }
    const items = parsed;
    const indexAs = attrs.indexAs?.trim();
    const firstAs = attrs.firstAs?.trim();
    const lastAs = attrs.lastAs?.trim();
    const body = getRawChildren(node);
    const result = [];
    for (let i = 0; i < items.length; i++) {
        const childScope = { ...scope, [asName]: items[i] };
        if (indexAs)
            childScope[indexAs] = i;
        if (firstAs)
            childScope[firstAs] = i === 0;
        if (lastAs)
            childScope[lastAs] = i === items.length - 1;
        for (const c of body) {
            // Clone before re-substituting so each iteration produces independent
            // subtrees. Without this, attribute mutations on shared nodes would
            // leak across iterations.
            const cloned = deepCloneNode(c);
            result.push(...substituteAndResolveSlots(cloned, childScope, slots, errors, templateName, slotRoots));
        }
    }
    return result;
}
function expandChoose(node, scope, slots, errors, templateName, slotRoots) {
    let otherwise = null;
    for (const child of getChildElements(node)) {
        const childTag = getTagName(child);
        if (childTag === "When") {
            const test = getAttributes(child).test;
            if (test === undefined || test === "") {
                errors.push(`<When>: missing required attribute "test"`);
                continue;
            }
            if (evaluateBoolean(test, scope, errors, `<When test="${test}">`)) {
                return getRawChildren(child).flatMap((c) => substituteAndResolveSlots(c, scope, slots, errors, templateName, slotRoots));
            }
        }
        else if (childTag === "Otherwise") {
            if (otherwise !== null) {
                errors.push(`<Choose>: more than one <Otherwise> branch`);
                continue;
            }
            otherwise = child;
        }
        else {
            errors.push(`<Choose>: unexpected child <${childTag}>; only <When> and <Otherwise> are allowed`);
        }
    }
    if (otherwise !== null) {
        return getRawChildren(otherwise).flatMap((c) => substituteAndResolveSlots(c, scope, slots, errors, templateName, slotRoots));
    }
    return [];
}
function substituteAndResolveSlots(node, scope, slots, errors, templateName, slotRoots) {
    if (isTextNode(node)) {
        return [
            {
                "#text": substituteString(node["#text"], scope, errors, templateName),
            },
        ];
    }
    const tag = getTagName(node);
    if (tag === "Slot") {
        const slotName = getAttributes(node).name?.trim();
        if (!slotName) {
            errors.push(`<Template name="${templateName}">.<Slot>: missing "name" attribute`);
            return [];
        }
        const provided = slots[slotName];
        if (provided !== undefined) {
            // Caller-supplied slot content lives at the <Use> site and already
            // carries its own __sourceLine/__sourceFile. Mark each cloned root so
            // overrideSourceAttrsInPlace skips the whole subtree — clicks on these
            // expanded nodes resolve to the user's actual chapter source rather
            // than the outer <Use> start tag.
            const cloned = provided.map(deepCloneNode);
            for (const n of cloned)
                slotRoots.add(n);
            return cloned;
        }
        // Fallback: <Slot>'s own children are the default content (template body,
        // not caller-supplied) — let them be stomped to the <Use> site.
        return getRawChildren(node).flatMap((c) => substituteAndResolveSlots(c, scope, slots, errors, templateName, slotRoots));
    }
    if (tag === "If") {
        const test = getAttributes(node).test;
        if (test === undefined || test === "") {
            errors.push(`<If>: missing required attribute "test"`);
            return [];
        }
        if (!evaluateBoolean(test, scope, errors, `<If test="${test}">`)) {
            return [];
        }
        return getRawChildren(node).flatMap((c) => substituteAndResolveSlots(c, scope, slots, errors, templateName, slotRoots));
    }
    if (tag === "Choose") {
        return expandChoose(node, scope, slots, errors, templateName, slotRoots);
    }
    if (tag === "Foreach") {
        return expandForeach(node, scope, slots, errors, templateName, slotRoots);
    }
    if (tag === "When" || tag === "Otherwise") {
        errors.push(`<${tag}> used outside of a <Choose>; ignoring`);
        return [];
    }
    const attrs = getAttributes(node);
    const newAttrs = {};
    for (const [k, v] of Object.entries(attrs)) {
        newAttrs[k] = substituteString(v, scope, errors, templateName);
    }
    // <Slot> children of a <Use> are slot-fills bound to the *inner* template
    // (consumed later by expandUseElement). Resolving them against the outer
    // `slots` dict here would unwrap the Slot and surface its raw children to
    // the inner Use as direct children, which then violates "Use only accepts
    // Slot children". Preserve the Slot wrapper, but still recurse into its
    // contents so {placeholders} inside the slot body get substituted.
    const children = tag === "Use"
        ? getRawChildren(node).flatMap((c) => {
            if (!isTextNode(c) && getTagName(c) === "Slot") {
                const slotAttrs = getAttributes(c);
                const slotKids = getRawChildren(c).flatMap((sc) => substituteAndResolveSlots(sc, scope, slots, errors, templateName, slotRoots));
                return [buildElement("Slot", slotAttrs, slotKids)];
            }
            return substituteAndResolveSlots(c, scope, slots, errors, templateName, slotRoots);
        })
        : getRawChildren(node).flatMap((c) => substituteAndResolveSlots(c, scope, slots, errors, templateName, slotRoots));
    return [buildElement(tag, newAttrs, children)];
}
/**
 * Override `__sourceLine` / `__sourceFile` on every element (and descendants) so
 * that template-expanded nodes point at the <Use> call site rather than at
 * the template definition. Operates on fast-xml-parser preserveOrder raw
 * attribute objects (keys prefixed with `@_`).
 *
 * Subtrees rooted at any node in `skip` are left untouched — used to preserve
 * the original source positions of caller-supplied <Slot> content (which the
 * user wrote at the <Use> site and expects clicks to navigate back to).
 */
function overrideSourceAttrsInPlace(nodes, rawLine, rawFile, skip) {
    for (const node of nodes) {
        if (isTextNode(node))
            continue;
        if (skip.has(node))
            continue;
        const existing = node[":@"] ?? {};
        const next = { ...existing };
        if (rawLine !== undefined)
            next["@___sourceLine"] = rawLine;
        else
            delete next["@___sourceLine"];
        if (rawFile !== undefined)
            next["@___sourceFile"] = rawFile;
        else
            delete next["@___sourceFile"];
        node[":@"] = next;
        overrideSourceAttrsInPlace(getRawChildren(node), rawLine, rawFile, skip);
    }
}
function expandUseElement(useEl, registry, errors, depth, counter, maxNodes, diagnostics) {
    const attrs = getAttributes(useEl);
    const templateName = attrs.template?.trim();
    if (!templateName) {
        errors.push(formatErrorAt(useEl, '<Use>: missing required attribute "template"'));
        return [];
    }
    const tmpl = registry.get(templateName);
    if (!tmpl) {
        errors.push(formatErrorAt(useEl, `<Use template="${templateName}">: template not defined`));
        return [];
    }
    // Every <Use> attribute (except the reserved "template" and internal
    // __pom* source-tracking attrs) becomes a placeholder value usable
    // anywhere in the template body via {name}.
    const params = {};
    for (const [k, v] of Object.entries(attrs)) {
        if (k === "template" || k.startsWith("__"))
            continue;
        params[k] = v;
    }
    // Slot bodies for <Slot name="N"/> markers in the template body.
    const slots = {};
    for (const child of getRawChildren(useEl)) {
        if (isTextNode(child))
            continue;
        const tag = getTagName(child);
        if (tag !== "Slot") {
            errors.push(formatErrorAt(child, `<Use template="${templateName}">: unexpected child <${tag}>; only <Slot> is allowed`));
            continue;
        }
        const slotName = getAttributes(child).name?.trim();
        if (!slotName) {
            errors.push(formatErrorAt(child, `<Use template="${templateName}">.<Slot>: missing "name" attribute`));
            continue;
        }
        if (slots[slotName]) {
            errors.push(formatErrorAt(child, `<Use template="${templateName}">.<Slot name="${slotName}">: duplicate slot`));
            continue;
        }
        slots[slotName] = getRawChildren(child).map(deepCloneNode);
    }
    const slotRoots = new Set();
    const expanded = tmpl.body.flatMap((n) => substituteAndResolveSlots(n, params, slots, errors, templateName, slotRoots));
    // Rewrite expanded nodes' source-position attributes to point at the <Use>
    // call site so renderer-driven clicks jump to the user's usage, not the
    // template definition. Slot subtrees (caller-supplied at the <Use> site)
    // keep their own positions so clicks land on the chapter's actual line.
    overrideSourceAttrsInPlace(expanded, attrs.__sourceLine, attrs.__sourceFile, slotRoots);
    if (depth >= MAX_EXPANSION_DEPTH) {
        errors.push(`<Use template="${templateName}">: expansion depth exceeded ${MAX_EXPANSION_DEPTH}; circular template reference?`);
        return expanded;
    }
    return expandTemplatesInNodes(expanded, registry, errors, depth + 1, counter, maxNodes, diagnostics);
}
export function expandTemplatesInNodes(nodes, registry, errors, depth = 0, counter = { count: 0 }, maxNodes = DEFAULT_MAX_TEMPLATE_NODES, diagnostics = []) {
    const result = [];
    for (const node of nodes) {
        // Halt immediately if the node budget is exhausted.
        if (counter.count > maxNodes) {
            return result;
        }
        if (isTextNode(node)) {
            result.push(node);
            continue;
        }
        const tag = getTagName(node);
        if (tag === "Use") {
            const expanded = expandUseElement(node, registry, errors, depth, counter, maxNodes, diagnostics);
            counter.count += expanded.length;
            if (counter.count > maxNodes) {
                diagnostics.push({
                    code: "TEMPLATE_EXPANSION_LIMIT",
                    message: `template expansion exceeded ${maxNodes} node limit; output truncated`,
                });
                return result;
            }
            for (const expandedNode of expanded) {
                result.push(expandedNode);
            }
            continue;
        }
        if (tag === "Slot") {
            errors.push("<Slot> used outside of a <Template> body or <Use> children; ignoring");
            continue;
        }
        // Non-root <Templates> blocks are detected upstream (TEMPLATES_NOT_AT_ROOT
        // diagnostic) and must be silently dropped here so they do not propagate
        // as unknown tags to the converter.
        if (tag === "Templates") {
            continue;
        }
        // Control-flow directives at the top level (i.e. outside a <Use>
        // expansion) run through the same substituteAndResolveSlots walker with
        // an empty starting scope. <Foreach items="[...]"> with inline JSON works
        // here; <If>/<Choose> mainly carry value when nested inside a <Foreach>
        // at the same level. Any <Use> the directive produces is expanded by the
        // recursive call below.
        if (tag === "If" || tag === "Choose" || tag === "Foreach") {
            const expanded = substituteAndResolveSlots(node, {}, {}, errors, "<top-level>", new Set());
            const reExpanded = expandTemplatesInNodes(expanded, registry, errors, depth, counter, maxNodes, diagnostics);
            counter.count += reExpanded.length;
            if (counter.count > maxNodes) {
                diagnostics.push({
                    code: "TEMPLATE_EXPANSION_LIMIT",
                    message: `template expansion exceeded ${maxNodes} node limit; output truncated`,
                });
                return result;
            }
            for (const n of reExpanded)
                result.push(n);
            continue;
        }
        if (tag === "When" || tag === "Otherwise") {
            errors.push(`<${tag}> used outside of a <Choose>; ignoring`);
            continue;
        }
        const attrs = getAttributes(node);
        const children = expandTemplatesInNodes(getRawChildren(node), registry, errors, depth, counter, maxNodes, diagnostics);
        result.push(buildElement(tag, attrs, children));
    }
    return result;
}
