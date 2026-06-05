/**
 * HTML rendering helpers for reference-html codegen. Pure functions —
 * no I/O, no DOM, no globals. See design §6.3 for the escape contract.
 */
import type { AttributeSpec, ChildrenSpec } from "../registry/defineNode.ts";
export declare function escapeHtml(s: string): string;
/**
 * Tokenize a small XML snippet for syntax-highlighted display. Output is
 * HTML and goes into element-content position only (never attribute-value
 * position — see design §6.3). All input goes through escapeHtml first.
 */
export declare function highlightXml(src: string): string;
/** Render the Attributes table for one element page. */
export declare function attrTable(attrs: Record<string, AttributeSpec>): string;
/**
 * Render the Allowed children block. `pageTags` is the set of element tags
 * that have their own reference page; entries whose tag is not in the set
 * (e.g. child-only specs like <Li>, <Tr>, <Col>, <ChartSeries> that are
 * declared via childAttributeSpecs.ts rather than defineNode) render as
 * <code> without a link.
 */
export declare function childrenTable(children: Record<string, ChildrenSpec>, pageTags?: ReadonlySet<string>): string;
/** Render the Used by list. */
export declare function usedByList(entries: ReadonlyArray<{
    parent: string;
    cardinality: string;
}>): string;
//# sourceMappingURL=htmlTemplates.d.ts.map