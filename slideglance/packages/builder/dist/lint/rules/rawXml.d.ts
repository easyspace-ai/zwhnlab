/**
 * Parse-phase scanner: detects bare `<` / `>` characters inside XML
 * attribute values. fast-xml-parser silently accepts these (verified —
 * see `RAW_LT_GT_IN_ATTR` rule docs), so a downstream lint pass is the
 * only place the violation surfaces. Bare angle brackets inside
 * attribute values are forbidden by the XML 1.0 spec (§3.1) and trip
 * stricter consumers (PowerPoint's own parser, Schematron tools, IDE
 * linting); authors should use `&lt;` / `&gt;` instead.
 *
 * Strategy:
 *   1. Mask out non-content regions (`<!-- … -->`, `<![CDATA[ … ]]>`,
 *      `<?xml … ?>`) with spaces so they cannot produce false positives
 *      while preserving offsets for line-number reporting.
 *   2. Walk every tag-open via a regex that respects quoted attribute
 *      values; the regex never consumes a tag-closing `>` from outside
 *      a quoted string.
 *   3. Within each tag body, extract `attr="value"` / `attr='value'`
 *      pairs and report any value containing a bare `<` or `>`.
 *
 * The scanner is deliberately conservative: when a region is ambiguous
 * (e.g. malformed XML the parser would also reject), it emits nothing
 * rather than guess at intent.
 */
import type { Diagnostic } from "../../diagnostics.ts";
/**
 * Scan one raw XML source for attribute values containing bare `<` / `>`.
 * `path` (when present) is attached to each diagnostic's `sourcePos.file`
 * so multi-file builds (with `<Import>`) can pinpoint the offender.
 */
export declare function scanRawXmlForBareLtGt(content: string, path?: string): Diagnostic[];
//# sourceMappingURL=rawXml.d.ts.map