/**
 * XML-side compiled registry — Single source of truth for nodes & meta elements.
 *
 * Each declaration here drives codegen artifacts (XSD, JSON Schema, nodes.md)
 * and — in a future session — the runtime parser dispatcher. For Session 1
 * the runtime parser still uses parseXml.ts / coercionRules.ts; the compiled
 * declarations are read only by codegen.
 *
 * Authoring rule: one defineNode/defineMeta per element, schema imported from
 * types.ts (do not redeclare shapes here).
 */
import { type CompiledNodeDefinition } from "../defineNode.ts";
import { type CompiledMetaDefinition } from "../defineMeta.ts";
export declare const ALL_COMPILED_NODES: readonly CompiledNodeDefinition[];
export declare const ALL_COMPILED_META: readonly CompiledMetaDefinition[];
/**
 * Cross-element consistency check.
 *
 * Throws on any inconsistency that codegen cannot proceed past:
 *   - Duplicate node tags
 *   - Duplicate meta tags
 *   - bodyAlias on a non-string attribute (already caught in defineNode but rechecked)
 *
 * This is invoked once at codegen entry so a misedit in compiled/index.ts
 * fails loudly instead of producing a malformed XSD.
 */
export declare function validateCompiledRegistry(): void;
//# sourceMappingURL=index.d.ts.map