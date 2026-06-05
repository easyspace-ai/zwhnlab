/**
 * Inline text-run extraction for <Text>, <Li>, and <Td>.
 *
 * Children that are entirely <B>/<I>/<U>/<S>/<A>/<Mark>/<Span> compose a
 * styled run sequence; otherwise they are rejected by the caller.
 */
import { type XmlElement } from "./xml.ts";
export declare const INLINE_FORMAT_TAGS: Set<string>;
type TextRunResult = {
    text: string;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strike?: boolean;
    highlight?: string;
    color?: string;
    href?: string;
    lang?: string;
};
export declare function buildRunsAndText(node: XmlElement): {
    runs: TextRunResult[];
    text: string;
} | null;
export {};
//# sourceMappingURL=textRuns.d.ts.map