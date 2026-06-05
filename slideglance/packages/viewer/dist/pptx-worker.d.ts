/**
 * Web Worker that hosts a `PptxDocument` for incremental slide
 * rendering. Keeps the WASM heap and the parsed deck off the main
 * thread so the UI stays responsive while large decks (hundreds of
 * slides, hundreds of MB of media) parse and render.
 *
 * Protocol (every message carries an `id` so callers can correlate
 * concurrent requests):
 *
 *   main → worker:
 *     { type: "open", id, bytes }
 *     { type: "render", id, slide }
 *     { type: "close", id }
 *
 *   worker → main:
 *     { type: "opened", id, slideCount, fontDefs }
 *     { type: "rendered", id, slide, svg, media, notes?, layoutName?, sectionName? }
 *     { type: "error", id, message }
 *
 * Media bytes are transferred as `Uint8Array` instances; the renderer
 * supplies `pptx-media://{hash}` placeholders in the SVG so the main
 * thread can wrap each blob in a `URL.createObjectURL` and rewrite the
 * references before mount.
 */
type CoreMod = {
    default?: () => Promise<unknown>;
    PptxDocument: PptxDocumentCtor;
};
interface PptxDocumentCtor {
    new (bytes: Uint8Array, measurementFonts: Uint8Array[], useCanvasMeasurer?: boolean): PptxDocumentInstance;
}
declare const MEASURE_FALLBACK_CJK: string[];
declare const PT_TO_PX: number;
declare const CJK_RE: RegExp;
declare let measureCanvasCtx: OffscreenCanvasRenderingContext2D | null;
declare function getMeasureCtx(): OffscreenCanvasRenderingContext2D;
declare const measureCache: Map<string, number>;
declare function measureTextWidth(text: string, fontFamily: string | null, fontFamilyEa: string | null, fontFamilyChain: string | null, fontSizePt: number, bold: boolean): number;
declare function measureLineMetrics(fontDecl: string): {
    ascent: number;
    descent: number;
    lineGap: number;
};
interface PptxDocumentInstance {
    free?(): void;
    slideCount(): number;
    fontDefs(): string;
    fontUsage(): Array<{
        requested: string;
        fallback_chain: string[];
        resolved_family: string | null;
    }>;
    mtxCompressedFonts?(): Array<{
        family: string;
        weight: string;
        style: string;
        payload: Uint8Array;
    }>;
    renderSlide(slide: number, externalMedia: boolean, includeFontDefs: boolean): {
        slide_number: number;
        svg: string;
        notes?: string;
        layout_name?: string;
        section_name?: string;
        media: Map<string, {
            mime: string;
            bytes: Uint8Array;
        }>;
    } | null;
}
type RenderResult = {
    slide_number: number;
    svg: string;
    notes?: string;
    layout_name?: string;
    section_name?: string;
    media: Map<string, {
        mime: string;
        bytes: Uint8Array;
    }>;
};
declare let coreModulePromise: Promise<CoreMod> | null;
declare function loadCore(): Promise<CoreMod>;
declare let doc: PptxDocumentInstance | null;
interface ParsedFontFace {
    family: string;
    src: string;
}
declare function parseFontFacesFromCss(css: string): ParsedFontFace[];
/**
 * Pre-validate a TTF byte buffer's cmap table against the same
 * constraints Chromium's OTS sanitizer enforces. Returns
 * `{ok: false, reason}` when the font would be rejected by the
 * browser's font loader so the caller can skip handing it to
 * `FontFace.load()`.
 *
 * Why this is necessary even with the FontFace API: Chromium emits
 * `OTS parsing error: …` console warnings at the C++ level
 * (`WebFontLoader::ots_message_func`) regardless of whether the
 * loading path is CSS `@font-face` or `new FontFace().load()`. JS
 * has no hook to suppress these warnings — the only way to keep the
 * console clean is to reject the font before it ever reaches OTS.
 *
 * Validates format-4 subtables — the dominant subtable kind for
 * CJK fonts and the format `mtx-decompressor` produces with stale
 * `idRangeOffset` pointers / 0xFFFF glyph-id sentinels for some
 * Hangul faces:
 *  1. Each subtable's declared length stays inside the cmap table.
 *  2. Each non-zero `idRangeOffset` walks to an address still
 *     inside the subtable.
 *  3. Computed glyph IDs (via `idDelta + char` or `glyphIdArray`)
 *     never exceed `maxp.numGlyphs` — mirrors OTS `cmap.cc`
 *     ParseFormat4 "Range glyph reference too high".
 *
 * Other cmap formats (0/2/6/12/14) are not exhaustively validated —
 * we trust those when the table directory is structurally sound.
 *
 * This is bounded reactive maintenance: cmap is the dominant MTX
 * failure mode. If new fonts surface OTHER OTS table-level
 * rejections (head/maxp/glyf/loca/post/...) we'd add validators
 * for those alongside this one. The fallback chain (Google Fonts
 * bundle + metric-match catalog) handles every rejected face so
 * deck rendering is never blocked.
 */
declare function validateCmap(ttf: Uint8Array): {
    ok: true;
} | {
    ok: false;
    reason: string;
};
/**
 * Decompress MicroType Express (MTX) compressed `<p:embeddedFont>`
 * payloads, register the result on the worker's own `FontFaceSet`
 * (so canvas measurement uses the right metrics), and return the
 * raw TTF bytes for each face the worker thread can transfer back
 * to the main thread.
 *
 * The Rust pipeline drops MTX-compressed faces because the
 * algorithm is a proprietary Agfa Monotype variant of LZ77 +
 * adaptive Huffman that we don't decode in Rust. The
 * `mtx-decompressor` npm package handles the algorithm in JS; the
 * decoded TTF bytes here come straight from that pipeline.
 *
 * We pre-filter via `validateCmap` because Chromium's OTS sanitizer
 * emits `OTS parsing error: …` console warnings at the C++ level
 * for any malformed table — there is no JS-side suppression
 * regardless of whether the load goes through CSS or the FontFace
 * API. Keeping malformed faces out of the loader entirely is the
 * only way to keep the console clean.
 */
declare function decompressMtxFonts(entries: Array<{
    family: string;
    weight: string;
    style: string;
    payload: Uint8Array;
}>): Promise<{
    /**
     * Decoded TTF bytes per face, ready to ship to the main thread for
     * registration via the FontFace API. The `bytes` field is a fresh
     * `Uint8Array` so its underlying buffer can be transferred without
     * detaching anything still in use by the worker (the worker also
     * keeps a separate FontFace instance referencing the original
     * decoded buffer via `FontFaceSet.add`).
     */
    decoded: Array<{
        family: string;
        weight: string;
        style: string;
        bytes: Uint8Array;
    }>;
    failures: Array<{
        family: string;
        reason: string;
    }>;
}>;
declare function handleOpen(id: number, bytes: Uint8Array, extraFontDefsCss?: string): Promise<void>;
declare function handleRender(id: number, slide: number): void;
declare function handleClose(id: number): void;
declare function postMessage(message: unknown, transfer?: Transferable[]): void;
//# sourceMappingURL=pptx-worker.d.ts.map