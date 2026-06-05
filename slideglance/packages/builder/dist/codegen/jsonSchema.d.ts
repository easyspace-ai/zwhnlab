/**
 * JSON Schema generator — emits a schema describing the *BuilderNode shape*
 * (post-coercion). Useful for tools that consume BuilderNode trees as JSON
 * (e.g. Monaco editor, AI tools that produce structured node trees).
 *
 * For XML-input schema use the XSD instead — these are different artefacts
 * because the BuilderNode shape (e.g. `padding: { top: 10 }`) does not match the
 * raw XML attribute encoding (`padding="10"` or `padding.top="10"`).
 */
interface JsonSchemaOutput {
    $schema: string;
    $id: string;
    title: string;
    description: string;
    oneOf: Array<{
        $ref: string;
    }>;
    $defs: Record<string, unknown>;
}
export declare function generateJsonSchema(): JsonSchemaOutput;
/** Stringify with stable, indented output. */
export declare function generateJsonSchemaString(): string;
export {};
//# sourceMappingURL=jsonSchema.d.ts.map