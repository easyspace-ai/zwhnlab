/**
 * Post-process step that wraps shapes carrying a `sg-grp:G` sigil into
 * real PPTX `<p:grpSp>` group elements. Authors opt in via the
 * `group="..."` attribute on any container (or any node); the renderer
 * threads the active group stack through every leaf and emits one
 * `sg-grp:G` token per ancestor group on each shape's cNvPr@name.
 *
 * The rewriter consumes those tokens after the connector pass has
 * finalised cxnSp elements. Order of operations matters: cxn elements
 * still need group wrapping when an author placed the connector
 * inside a grouped container.
 *
 * Nested groups: built top-down. At each depth we scan the current
 * level's siblings for contiguous runs sharing the same group id,
 * recurse into deeper depths for those runs, then wrap the recursion
 * result in a grpSp. This produces properly nested `<p:grpSp>`
 * elements without the brittle "find members in the working array
 * after earlier wraps moved them" bookkeeping a bottom-up pass would
 * require.
 *
 * Non-contiguous groups: members sharing a group id but not adjacent
 * in the spTree open a fresh grpSp for each run. PPTX `<p:grpSp>`
 * requires its members to be siblings in z-order so we never reorder
 * to merge non-contiguous spans.
 */
import type { Diagnostic } from "../../diagnostics.ts";
import { SG_GRP_PREFIX, SG_ID_PREFIX } from "./sigils.ts";
type Attrs = Record<string, string>;
type ElementNode = {
    [tag: string]: NodeArray | Attrs | undefined;
    ":@"?: Attrs;
};
type TextNode = {
    "#text": string;
};
type AnyNode = ElementNode | TextNode;
type NodeArray = AnyNode[];
/**
 * Rewrite a single slide's parsed XML tree in place. Replaces the
 * spTree's children with the recursively-grouped variant produced by
 * `buildGroupedChildren`, then runs the final sigil cleanup. Returns
 * whether anything actually changed so the slide-level pass can skip
 * re-serialising untouched slides.
 */
export declare function rewriteSlideGroups(parsed: NodeArray, _diagnostics: Diagnostic[]): boolean;
export { SG_GRP_PREFIX, SG_ID_PREFIX };
//# sourceMappingURL=groupSp.d.ts.map