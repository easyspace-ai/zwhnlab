type XmlTextNode = {
    "#text": string;
};
type XmlElement = {
    [tagName: string]: XmlNode[] | Record<string, string> | undefined;
    ":@"?: Record<string, string>;
};
type XmlNode = XmlElement | XmlTextNode;
/**
 * Caller-supplied function that loads an imported file synchronously.
 *
 * @param src       The `src` attribute value as written on `<Import>`.
 * @param fromPath  The absolute path of the file containing this `<Import>`,
 *                  or `undefined` for the root document. The resolver should
 *                  use this to resolve relative paths.
 * @returns         An object with the file's text `content` and the absolute
 *                  `path` it resolved to (used for cycle detection).
 */
export type ImportResolver = (src: string, fromPath: string | undefined) => {
    content: string;
    path: string;
};
/**
 * Top-level entry. Inlines all `<Import>` elements anywhere in `nodes` using
 * the supplied resolver. Errors during expansion are pushed to `errors`.
 */
export declare function inlineImports(nodes: XmlNode[], resolver: ImportResolver | undefined, sourcePath: string | undefined, errors: string[]): XmlNode[];
export {};
//# sourceMappingURL=imports.d.ts.map