/**
 * Document-level parser: turns an XML string into a `ParsedBuilderDocument`.
 *
 * Handles `<SlideGlance>` (with `<Document>`/`<Templates>`/`<Styles>`/
 * `<Master>`/`<Slide>`), implicit slide siblings, and bare-fragment roots.
 * Document-level settings (slide size, defaultMaster, defaultTextStyle) live
 * on the `<Document>` child rather than on the root. Per-element conversion
 * is delegated to `dispatcher.ts`.
 */
import type { Diagnostic } from "../diagnostics.ts";
import { type DefaultTextStyle, type BuilderNode, type SlideMasterOptions } from "../types.ts";
import { type ImportResolver } from "./imports.ts";
import type { BuilderSourceMap } from "./parseContext.ts";
export declare class ParseXmlError extends Error {
    readonly errors: string[];
    constructor(errors: string[]);
}
export interface ParseBuilderDocumentOptions {
    /** Sync function that loads imported files. Required if the document uses
     *  `<Import>`; otherwise omit. See {@link ImportResolver}. */
    resolveImport?: ImportResolver;
    /** Absolute path of the root document. Passed to `resolveImport` so that
     *  relative `<Import src="...">` paths can be resolved. */
    sourcePath?: string;
    /**
     * If true, pre-process the XML to attach source-position metadata to each
     * node via BuilderNode.__nodeId and return a `sourceMap` in the result.
     */
    trackSourcePos?: boolean;
    /** Maximum number of nodes that template expansion may produce. Default: 100,000. */
    maxTemplateNodes?: number;
    /**
     * When true, run the equalize-dimensions preprocessor before parsing. The
     * preprocessor recursively inlines all imports at text level and
     * substitutes the sentinel attribute values used by the reference deck:
     *
     *   - `auto` on `<Use>` template params (`titleH="auto"`, `bodyH="auto"` …)
     *     resolves to the worst-case sibling height inside the same `<HStack>`.
     *   - `auto:KEY` on `<Text>` widths and table `<Col>` widths resolves to
     *     the natural width of the widest sibling sharing that KEY.
     *   - `capbar:CLASS` on a `<VStack>` height resolves to the cap-baseline
     *     height of the referenced typography class.
     *
     * When this option is set, the parser skips its tree-level import inline
     * pass since all imports are already resolved at text level. Callers using
     * `equalize: true` should still pass `resolveImport` for the import loader.
     */
    equalize?: boolean;
}
export interface ParsedBuilderDocument {
    nodes: BuilderNode[];
    slideSize?: {
        w: number;
        h: number;
    };
    masters?: SlideMasterOptions[];
    masterContents?: Record<string, BuilderNode[]>;
    defaultMaster?: string;
    defaultTextStyle?: DefaultTextStyle;
    /**
     * Maps BuilderNode.__nodeId -> origin {file, line}. Present even when empty so
     * callers can rely on the field existing.
     */
    sourceMap?: BuilderSourceMap;
    /**
     * Names of `<Style name="…"/>` declared in the deck (drives UNUSED_STYLE lint).
     */
    declaredStyles?: Set<string>;
    /** Style names referenced via class="…" anywhere in the deck. */
    referencedStyles?: Set<string>;
    /** Names of `<Template name="…"/>` declared in the deck. */
    declaredTemplates?: Set<string>;
    /** Names of templates actually invoked via `<Use template="…"/>`. */
    referencedTemplates?: Set<string>;
}
/**
 * Inner document parser. Caller is responsible for managing parse-context
 * lifetime (see `parseBuilderDocument` in parseXml.ts).
 */
export declare function parseBuilderDocumentInner(xmlString: string, options: ParseBuilderDocumentOptions | undefined, sourceMap: BuilderSourceMap | null, diagnostics: Diagnostic[]): ParsedBuilderDocument;
//# sourceMappingURL=document.d.ts.map