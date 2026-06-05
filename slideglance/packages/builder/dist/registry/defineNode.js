/**
 * Validate and normalize a node specification.
 *
 * Throws (Error) on internal inconsistencies that should never reach a
 * production build — e.g. a `bodyAlias: true` attribute typed as something
 * other than string. Codegen also runs additional cross-node consistency
 * checks (duplicate tags, dangling child element references).
 */
export function defineNode(spec) {
    if (!spec.tag)
        throw new Error("defineNode: `tag` is required");
    if (!spec.description) {
        throw new Error(`defineNode(${spec.tag}): \`description\` is required`);
    }
    const attributes = spec.attributes ?? {};
    const children = spec.children ?? {};
    // bodyAlias must target a string-ish attribute.
    for (const [name, attr] of Object.entries(attributes)) {
        if (attr.bodyAlias && attr.coerce !== "string") {
            throw new Error(`defineNode(${spec.tag}): attribute "${name}" has bodyAlias:true but coerce is "${attr.coerce}" (must be "string")`);
        }
    }
    return {
        tag: spec.tag,
        type: spec.type,
        description: spec.description,
        category: spec.category,
        schema: spec.schema,
        attributes,
        children,
        root: spec.root ?? false,
        example: spec.example,
        applyYogaStyle: spec.applyYogaStyle,
        toPositioned: spec.toPositioned,
        render: spec.render,
        collectImageSources: spec.collectImageSources,
        kind: "node",
    };
}
