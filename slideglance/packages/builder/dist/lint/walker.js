/** Depth-first walk yielding every positioned node, with parent + path. */
export function* walk(root, parent = null, path = []) {
    yield { node: root, parent, path };
    const kids = getChildren(root);
    if (kids) {
        const nextPath = [...path, root];
        for (const c of kids)
            yield* walk(c, root, nextPath);
    }
}
export function getChildren(node) {
    if ("children" in node &&
        Array.isArray(node.children)) {
        return node.children;
    }
    return null;
}
/** A simple stable id for a node — file:line if known, else node-type path. */
export function nodeIdOf(node, path) {
    const sp = node;
    if (sp.__sourceFile && sp.__sourceLine !== undefined) {
        return `${sp.__sourceFile}:${sp.__sourceLine}`;
    }
    return [...path.map((p) => p.type), node.type].join(" > ");
}
export function nodeSourcePos(node) {
    const sp = node;
    if (sp.__sourceLine === undefined && !sp.__sourceFile)
        return undefined;
    return { line: sp.__sourceLine, file: sp.__sourceFile };
}
/** True if a node carries text content (Text/Ul/Ol/Shape with text). */
export function isTextBearing(node) {
    return (node.type === "text" ||
        node.type === "ul" ||
        node.type === "ol" ||
        (node.type === "shape" &&
            typeof node.text === "string"));
}
