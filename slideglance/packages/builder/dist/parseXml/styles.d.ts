/**
 * <Styles>/<Style> handling.
 *
 * Styles are collected once at the top of `<SlideGlance>` (or root) and
 * applied to any element that opts in via `class="..."` / `className="..."`.
 */
import { type XmlElement } from "./xml.ts";
export type StyleRegistry = Record<string, Record<string, string>>;
/**
 * Merge classed-in styles with the element's own attributes. Element-level
 * attributes take precedence. Class/className attributes are stripped from the
 * output. Unknown class names append a non-fatal error.
 */
export declare function applyStylesToAttrs(tagName: string, attrs: Record<string, string>, styles: StyleRegistry, errors: string[], errorTagName?: string, node?: XmlElement): Record<string, string>;
/**
 * Walk root-level children (SlideGlance children, or root children of a
 * Fragment) and collect <Styles>/<Style> declarations. Errors append to the
 * provided array; the registry is returned regardless.
 */
export declare function collectStyles(childElements: XmlElement[], errors: string[]): StyleRegistry;
//# sourceMappingURL=styles.d.ts.map