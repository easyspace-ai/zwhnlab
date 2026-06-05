/**
 * Inject `__sourceLine`/`__sourceFile` attributes into every start tag of `xml`.
 * Comments (`<!-- ... -->`), CDATA (`<![CDATA[...]]>`), and processing
 * instructions (`<?...?>`) are skipped because the regex only matches when
 * the char after `<` is a letter or underscore.
 */
export declare function injectSourceAttrs(xml: string, file: string | undefined): string;
//# sourceMappingURL=sourceInjection.d.ts.map