/**
 * Codegen helpers — flatten the compiled registry into a structure each
 * emitter can iterate independently.
 *
 * The compiled registry already exposes ALL_COMPILED_NODES / ALL_COMPILED_META;
 * this module wraps them with computed projections (root elements, container
 * categories, per-coerce simpleType mapping) so each emitter does not have to
 * recompute them.
 */
import type { CompiledNodeDefinition, CoerceType } from "../registry/defineNode.ts";
import type { CompiledMetaDefinition } from "../registry/defineMeta.ts";
import { type SeeAlsoEntry } from "./seeAlso.ts";
interface WalkedRegistry {
    readonly nodes: readonly CompiledNodeDefinition[];
    readonly meta: readonly CompiledMetaDefinition[];
    /** Root-eligible element tags (SlideGlance, Fragment). */
    readonly roots: readonly string[];
    /** Tags accepted as a generic POM node child (used in xs:choice for containers). */
    readonly nodeTags: readonly string[];
}
export declare function walkRegistry(): WalkedRegistry;
/** Map a coerce type to a named XSD simpleType (or null for inline xs:string). */
export declare function coerceToXsdSimpleType(coerce: CoerceType): {
    /** Named simpleType reference (with `b:` prefix) or null when inline-only. */
    named: string | null;
    /** Built-in xs primitive used inline when `named` is null. */
    primitive: string;
};
/**
 * Aggregate reference model consumed by the HTML emitter. Built on top of
 * `walkRegistry()`, this adds metadata (namespace, package version), a
 * pre-parsed see-also table, and placeholders for the reverse index +
 * source locations populated by later tasks.
 */
export interface ReferenceModel {
    readonly generatedAt: string;
    readonly packageVersion: string;
    readonly namespace: string;
    readonly nodes: readonly CompiledNodeDefinition[];
    readonly meta: readonly CompiledMetaDefinition[];
    readonly usedBy: ReadonlyMap<string, ReadonlyArray<{
        parent: string;
        cardinality: string;
    }>>;
    readonly seeAlso: ReadonlyMap<string, ReadonlyArray<SeeAlsoEntry>>;
    readonly sourceLocations: ReadonlyMap<string, {
        file: string;
        line: number;
    }>;
}
export declare function buildReferenceModel(): ReferenceModel;
export {};
//# sourceMappingURL=walkRegistry.d.ts.map