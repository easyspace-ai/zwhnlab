/**
 * Element-to-BuilderNode dispatcher.
 *
 * Drives every per-element conversion off the compiled registry
 * (`registry/compiled/index.ts`): attribute existence, deprecation hints,
 * dot-notation expansion, child element routing, and Zod-schema-backed
 * post-processing all flow through `CompiledNodeDefinition.attributes`.
 * `coerceByType` performs the actual string-to-typed-value conversion.
 */
import { type StyleRegistry } from "./styles.ts";
import { type XmlElement } from "./xml.ts";
/**
 * Convert one XML element to its BuilderNode object representation. Emits
 * recoverable errors into `errors`; returns `null` for unknown tags.
 */
export declare function convertElement(node: XmlElement, errors: string[], styles?: StyleRegistry): Record<string, unknown> | null;
//# sourceMappingURL=dispatcher.d.ts.map