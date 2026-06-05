/**
 * Low-level helpers for fast-xml-parser's preserveOrder output.
 *
 * The XML parser produces `XmlElement` objects keyed by tag name with a
 * special `:@` field carrying attributes. These helpers wrap that shape so
 * the rest of the parser does not depend on fast-xml-parser internals.
 */
export type XmlNode = XmlElement | XmlTextNode;
export type XmlTextNode = {
    "#text": string;
};
export interface XmlElement {
    [tagName: string]: XmlNode[] | Record<string, string> | undefined;
    ":@"?: Record<string, string>;
}
export declare function isTextNode(node: XmlNode): node is XmlTextNode;
/**
 * Decode user-friendly text escapes inside element body text.
 *
 * - `\n` → LF
 * - `\t` → TAB
 * - `\\` → literal backslash
 * - `\X` (any other char) → kept verbatim ("\X") so paths like `C:\Users\foo`
 *   stay readable.
 *
 * Applied to body text (Text / Shape / Td / Li / MasterText / Notes) and to
 * inline run text. Attribute values are left untouched because callers may
 * pre-encode JSON (`items='[…]'`, `chartColors='[…]'`, …) where `\n` already
 * has its own meaning inside the JSON string grammar.
 */
export declare function decodeTextEscapes(s: string): string;
export declare function getTagName(node: XmlElement): string;
export declare function getAttributes(node: XmlElement): Record<string, string>;
/**
 * Prefix `message` with `file:line: ` (or `line N: ` when no file) when the
 * element carries source-position attributes. Returns `message` unchanged when
 * no position is available.
 */
export declare function formatErrorAt(node: XmlElement, message: string): string;
/**
 * Register the element's source position into the current parse's sourceMap
 * and return the allocated POM id (or undefined if no position is present).
 * Used wherever an XmlElement maps to a BuilderNode (or a slide root).
 */
export declare function registerSourcePosForElement(node: XmlElement): number | undefined;
export declare function getChildElements(node: XmlElement): XmlElement[];
export declare function getTextContent(node: XmlElement): string | undefined;
export declare function getRawChildren(node: XmlElement): XmlNode[];
export declare function parseClassNames(attrs: Record<string, string>): string[];
//# sourceMappingURL=xml.d.ts.map