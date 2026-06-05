/**
 * Sigil channel used by the post-process passes to smuggle metadata
 * through pptxgenjs output and back to the rewriter via
 * `<p:cNvPr name="...">`. pptxgenjs has no notion of connectors or
 * groups, so we encode all post-process intent into the only stable
 * per-shape string slot the library exposes.
 *
 * Format: tokens joined by `|`. Each recognised token starts with one
 * of the sg-* prefixes below; tokens we don't own (notably `node#N`,
 * read by @slideglance/core for source-map jumps) pass through
 * untouched.
 *
 *   sg-id:USER_ID
 *     Author-facing `id` attribute, added by every node that opts in.
 *     The connector rewriter uses it to resolve `<Connector from="...">`
 *     to the OOXML spId.
 *
 *   sg-cxn:FROM#FS>TO#TS:K:P
 *     Marker on the placeholder line a `<Connector>` emits. FS/TS are
 *     `top|right|bottom|left`. K is the author kind (straight/elbow/
 *     curved). P is the picked PPTX preset name.
 *
 *   sg-grp:GROUP_ID
 *     "this shape belongs to GROUP_ID". Appears once per group on
 *     every leaf rendered inside a `group="..."` ancestor; nested
 *     groups stack as additional sg-grp tokens, outermost first.
 *
 * Tokens are stripped after rewriting so the final PPTX shows nothing
 * unusual to PowerPoint or accessibility tools. The `node#N` token, if
 * present, survives the strip — that contract is owned by the SVG
 * renderer side, not the builder.
 */
export declare const SG_ID_PREFIX = "sg-id:";
export declare const SG_CXN_PREFIX = "sg-cxn:";
export declare const SG_GRP_PREFIX = "sg-grp:";
export declare const TOKEN_DELIM = "|";
/**
 * Join an arbitrary list of tokens into a cNvPr@name value. Filters
 * empties so callers can append optional pieces without guarding.
 */
export declare function buildObjectName(tokens: readonly (string | undefined)[]): string;
export interface ParsedIdSigil {
    userId: string;
}
/**
 * Read the author id from a sg-id token. Returns null when no sg-id
 * token is present. The userId payload is the entire remainder of the
 * token after the prefix; the id regex enforced at parse time
 * guarantees no `|` characters.
 */
export declare function parseIdSigil(name: string | undefined): ParsedIdSigil | null;
export interface ParsedCxnSigil {
    from: string;
    fromSide: "top" | "right" | "bottom" | "left";
    to: string;
    toSide: "top" | "right" | "bottom" | "left";
    kind: "straight" | "elbow" | "curved";
    preset: string;
}
/**
 * Parse a `sg-cxn:FROM#FS>TO#TS:K:P` token. Returns null on any
 * structural mismatch so callers can leave the unrecognised cNvPr in
 * place.
 */
export declare function parseCxnSigil(name: string | undefined): ParsedCxnSigil | null;
/**
 * Extract every sg-grp token payload, preserving order. The renderer
 * pushes outermost groups first, so the resulting array is in
 * outer -> inner order — useful for the rewriter which needs to wrap
 * the innermost group first.
 */
export declare function parseGrpSigils(name: string | undefined): string[];
/**
 * Remove every sg-* token, returning the residual joined by the same
 * delimiter. Used after every rewriter has consumed its markers so the
 * final cNvPr@name carries only contract-bearing tokens (currently
 * just `node#N` for the SVG-side source-map jump). Empty result means
 * the caller should delete the attribute entirely.
 */
export declare function stripSigils(name: string | undefined): string;
/**
 * Remove only the tokens with the given prefixes, leaving every other
 * token (including unrelated sg-* tokens) untouched. Used by a single
 * rewriter pass that wants to clear its own markers while preserving
 * markers a later pass still needs to read.
 */
export declare function stripSigilsByPrefix(name: string | undefined, prefixes: readonly string[]): string;
//# sourceMappingURL=sigils.d.ts.map