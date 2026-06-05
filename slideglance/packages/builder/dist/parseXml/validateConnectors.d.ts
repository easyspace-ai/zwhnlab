/**
 * Slide-scope validation for the author-facing `id` attribute and the
 * `<Connector>` node. Runs after every slide tree is fully parsed but
 * before render so that downstream layers can assume every Connector
 * references a real, unique endpoint.
 *
 * Three things happen here:
 *   1. Walk each slide tree and collect `id -> node` pairs.
 *   2. Emit DUPLICATE_NODE_ID diagnostics for repeated ids on the same
 *      slide (both occurrences are kept; only the first wins for lookup).
 *   3. For each <Connector>, check `from === to` (self-ref) and missing
 *      endpoints. Invalid Connectors are filtered out of the slide tree
 *      so the renderer never sees them.
 *
 * Diagnostics are non-fatal — `strict: true` callers see them via the
 * collector's `addAll`.
 */
import type { BuilderNode } from "../types.ts";
import type { Diagnostic } from "../diagnostics.ts";
/**
 * Apply slide-scope id / connector validation to a full slide list.
 * Mutates the input array in place (filters invalid Connectors out of
 * every node's children) and appends diagnostics to the provided list.
 */
export declare function validateConnectorsInSlides(slides: BuilderNode[], diagnostics: Diagnostic[]): void;
//# sourceMappingURL=validateConnectors.d.ts.map