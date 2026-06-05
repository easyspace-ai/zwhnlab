import { type LintOptions, type LintReport } from "./lint/index.ts";
import type { TextMeasurementMode } from "./calcYogaLayout/measureText.ts";
import type { Diagnostic } from "./diagnostics.ts";
import { type ImportResolver, type BuilderSourceMap } from "./parseXml/parseXml.ts";
import { SlideMasterOptions, type DefaultTextStyle } from "./types.ts";
export type { TextMeasurementMode };
export interface BuildPptxResult {
    pptx: import("pptxgenjs").default;
    diagnostics: Diagnostic[];
    /**
     * When `options.trackSourcePos` is true, maps BuilderNode.__nodeId → origin
     * { file, line } so that consumers (e.g. the builder-vscode webview) can reveal
     * the source file/line for rendered pptxgenjs objects.
     */
    sourceMap?: BuilderSourceMap;
    /**
     * Structured lint report when `options.lint?.enabled` is true.
     * Same diagnostics that get merged into `diagnostics`, plus per-deck
     * summary counts and a generatedAt stamp suitable for tooling /
     * LLM consumption.
     */
    lintReport?: LintReport;
}
export type { ImageSrcGuardOptions, MasterPptxLimits } from "./options.ts";
import type { ImageSrcGuardOptions, MasterPptxLimits } from "./options.ts";
export interface BuildPptxOptions {
    master?: SlideMasterOptions;
    masters?: SlideMasterOptions[];
    defaultMaster?: string;
    masterPptx?: ArrayBuffer | Uint8Array;
    textMeasurement?: TextMeasurementMode;
    defaultTextStyle?: DefaultTextStyle;
    autoFit?: boolean;
    strict?: boolean;
    /** Resolver for `<Import src="..."/>`. The resolver is called synchronously
     *  and must return both the file content and its absolute path. */
    resolveImport?: ImportResolver;
    /** Absolute path of the root document. Passed as `fromPath` to the first
     *  `resolveImport` call so relative paths resolve correctly. */
    sourcePath?: string;
    /**
     * If true, the returned result includes `sourceMap` and every rendered
     * shape carries a pptxgenjs `objectName` encoding its `__nodeId`. Used by
     * tools (e.g. the builder-vscode preview) to offer jump-to-source on clicks.
     */
    trackSourcePos?: boolean;
    /**
     * Additional URL schemes to allow on top of the defaults (https/http/mailto/tel).
     * The defaults are always enforced. Supply only the extra schemes to permit
     * (e.g. `["ftp:"]`). Schemes not in the combined list emit `INVALID_HREF_SCHEME`.
     */
    allowedHrefSchemes?: string[];
    /**
     * Opt-in guard for <Image src> and <Master backgroundPath> validation.
     * When undefined (default), no validation is applied (OD3 locked).
     */
    imageSrcGuard?: ImageSrcGuardOptions;
    /**
     * Size caps for the masterPptx buffer. Defaults: 50 MB total, 5 MB per image.
     */
    masterPptxLimits?: MasterPptxLimits;
    /**
     * Maximum number of nodes produced by template expansion. Default: 100,000.
     * Exceeding this limit emits a TEMPLATE_EXPANSION_LIMIT diagnostic.
     */
    maxTemplateNodes?: number;
    /**
     * When true, run the equalize-dimensions preprocessor before parsing —
     * resolves `auto`, `auto:KEY`, and `capbar:CLASS` sentinels by measuring
     * sibling content and substituting concrete pixel values. See
     * `ParseBuilderDocumentOptions.equalize` for details.
     */
    equalize?: boolean;
    /** Document properties written to the PPTX file's core properties (docProps/core.xml). */
    docProps?: {
        title?: string;
        author?: string;
        company?: string;
        subject?: string;
    };
    /**
     * Default BCP 47 language tag applied to text runs that do not carry an
     * explicit `lang` attribute (e.g. `"en-US"`, `"ja-JP"`). Default: undefined.
     */
    defaultLang?: string;
    /**
     * Lint options. When `lint.enabled` is true, post-layout lint rules
     * run after every slide is positioned and the resulting Diagnostics
     * are merged into the BuildPptxResult.diagnostics list. The full
     * structured `LintReport` is also returned for tooling / LLM input.
     * See `packages/builder/docs/lint.md` for the rule catalog.
     */
    lint?: LintOptions;
    /**
     * TTF / OTF font buffers to register with the per-build text
     * measurer alongside the bundled fonts (Noto Sans JP + Pretendard,
     * Regular + Bold). When present, opentype measurement looks up the
     * caller's families directly (no Noto/Pretendard substitution), so
     * the wrap decision the builder commits to the PPTX matches the
     * glyph metrics of the actual font the renderer will paint.
     *
     * Supply both weight variants (Regular and Bold) of any family that
     * appears in `bold="true"` text — slideglance routes faces with
     * `OS/2.usWeightClass >= 600` to the resolver's bold slot, so a
     * single family lookup with `bold=true` reaches the Bold face.
     *
     * Pair with the viewer's `fontStylesheet` prop using the same TTFs
     * (as `@font-face` data URIs) so layout-time wrap = render-time wrap.
     */
    fonts?: Uint8Array[];
}
export declare function buildPptx(xml: string, slideSize: {
    w: number;
    h: number;
}, options?: BuildPptxOptions): Promise<BuildPptxResult>;
//# sourceMappingURL=buildPptx.d.ts.map