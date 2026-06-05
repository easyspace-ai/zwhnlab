/**
 * Post-process step that rewrites pptxgenjs' `<p:sp>` placeholders into
 * real PPTX `<p:cxnSp>` elements with stCxn / endCxn bindings.
 *
 * Why post-process? pptxgenjs has no API for connector shapes — every
 * `addShape("line", ...)` writes a regular `<p:sp prstGeom="line">`.
 * The Connector renderer (`renderPptx/nodes/connector.ts`) tags its
 * placeholder via `<p:cNvPr name="sg-cxn:...">` so we can find it here
 * after the slide XML is otherwise complete, and rewrite the element
 * in-place. Author ids that should be reachable from connectors are
 * tagged with `sg-id:USER_ID` on the same channel.
 *
 * The rewrite covers every `ppt/slides/slide*.xml` in the zip; other
 * parts (theme, master, rels) are left untouched.
 *
 * Invariants this pass relies on (set up by the renderer):
 *   - Every sg-cxn placeholder has its from / to user ids present on
 *     the same slide (parseXml drops the connector otherwise).
 *   - Both endpoints have `sg-id:` markers in their cNvPr@name.
 *   - The cxn placeholder is rendered as a line shape, so its spPr
 *     already carries a valid xfrm bounding box.
 */
import type { Diagnostic } from "../../diagnostics.ts";
/**
 * fast-xml-parser preserveOrder output: each element is `{ TAG: NODE[],
 * ":@"?: { "@_attr": "value" } }`. We work with this representation
 * directly so element order survives the round-trip.
 */
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
 * Rewrite a single slide's parsed XML tree in place. Returns whether
 * any changes were made (callers skip the re-serialize step when
 * nothing changed).
 */
declare function rewriteSlide(parsed: NodeArray, diagnostics: Diagnostic[]): boolean;
/**
 * Apply the connector rewrite over every ppt/slides/slide*.xml in a
 * PPTX byte stream. Returns the rewritten bytes plus any diagnostics
 * surfaced during the pass.
 *
 * When the input contains no connector placeholders, the function
 * still does the unzip / re-zip round-trip — JSZip's compression is
 * fast enough that we don't optimise the no-op case. If you need to
 * skip rewriting for performance, gate the call site on the presence
 * of a Connector node at parse time.
 */
export declare function postProcessConnectors(bytes: Uint8Array): Promise<{
    bytes: Uint8Array;
    diagnostics: Diagnostic[];
}>;
export { rewriteSlide as _rewriteSlideForTest };
//# sourceMappingURL=cxnSp.d.ts.map