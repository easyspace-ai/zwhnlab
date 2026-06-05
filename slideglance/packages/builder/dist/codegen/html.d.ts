/**
 * HTML reference page generator. Returns a Map of relative path →
 * HTML string consumed by scripts/codegen.ts. See design §5 for page
 * structure and §6 for styling decisions.
 */
import type { CompiledNodeDefinition } from "../registry/defineNode.ts";
import type { CompiledMetaDefinition } from "../registry/defineMeta.ts";
import { type ReferenceModel } from "./walkRegistry.ts";
export declare function renderElementPage(node: CompiledNodeDefinition | CompiledMetaDefinition, model: ReferenceModel): string;
export declare function renderIndexPage(model: ReferenceModel): string;
export declare function generateReferenceHtml(): Map<string, string>;
//# sourceMappingURL=html.d.ts.map