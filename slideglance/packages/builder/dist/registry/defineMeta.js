export function defineMeta(spec) {
    if (!spec.tag)
        throw new Error("defineMeta: `tag` is required");
    if (!spec.description) {
        throw new Error(`defineMeta(${spec.tag}): \`description\` is required`);
    }
    return {
        tag: spec.tag,
        description: spec.description,
        contentModel: spec.contentModel,
        attributes: spec.attributes ?? {},
        openAttributes: spec.openAttributes ?? false,
        allowedParents: spec.allowedParents ?? [],
        root: spec.root ?? false,
        example: spec.example,
        schema: spec.schema,
        kind: "meta",
    };
}
