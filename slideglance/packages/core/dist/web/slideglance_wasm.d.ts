/* tslint:disable */
/* eslint-disable */

/**
 * JS-facing wrapper around [`slideglance::PptxDocument`] for stateful,
 * per-slide rendering. Construct once with `new PptxDocument(bytes,
 * measurementFonts)` from JavaScript and reuse the instance across
 * `renderSlide` calls — parsing the archive happens exactly once.
 */
export class PptxDocument {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Deck-wide `<defs>…@font-face…</defs>` block. Empty when the
     * deck has no embedded fonts.
     */
    fontDefs(): string;
    /**
     * Per-typeface report describing how every deck-referenced
     * typeface name resolves through the SVG `font-family` fallback
     * chain.
     *
     * Returns an array of `{ requested, fallback_chain, resolved_family }`
     * objects. Hosts (e.g. the viewer's status bar) walk
     * `fallback_chain` against `document.fonts.check()` to identify
     * the actually-rendered font for each authored typeface and
     * surface the mapping to the user.
     *
     * `resolved_family` is always `null` here — the WASM document
     * holds no path-mode resolver. Native CLI hosts that want
     * resolved-family info should call the Rust-side
     * `PptxDocument::font_usage` directly with their resolver.
     */
    fontUsage(): any;
    /**
     * `MicroType` Express compressed `<p:embeddedFont>` payloads the
     * Rust pipeline can't decompress (Agfa Monotype LZ77 + adaptive
     * Huffman). Returned as a JS array of
     * `{ family, weight, style, payload }` objects where `payload` is
     * a `Uint8Array` of the post-EOT-header bytes (XOR de-obfuscation
     * already applied).
     *
     * Browser hosts that bundle `mtx-decompressor` walk this list,
     * decode each `payload`, and register the resulting TTF as a
     * `FontFace`. Hosts without that capability ignore the list and
     * the renderer falls back through the family-name chain. Always
     * returns an empty array when the deck has no embedded fonts.
     */
    mtxCompressedFonts(): any;
    /**
     * Parse a PPTX byte stream and prepare it for incremental
     * rendering. `measurement_fonts` is an array of `Uint8Array`
     * font byte buffers used only for text measurement (system-font
     * substitutes); pass an empty array to skip.
     *
     * `use_canvas_measurer` switches every wrap measurement onto a
     * JS-side bridge that calls `__slideglanceMeasureText` (typically
     * implemented with `OffscreenCanvas.measureText` in a worker).
     * When this is `true` the host MUST install that function on the
     * global scope before any `renderSlide` call. Use this in the
     * browser viewer so wrap positions match what the same browser
     * will actually render — even when the deck's authored fonts
     * aren't embedded and the renderer falls back through the system
     * font chain. Leave `false` (default) for Node.js / non-browser
     * hosts that have no canvas.
     */
    constructor(bytes: Uint8Array, measurement_fonts: Uint8Array[], use_canvas_measurer?: boolean | null);
    /**
     * Render one 1-based slide. Returns `null` when `slide` is out
     * of range.
     */
    renderSlide(slide: number, external_media: boolean, include_font_defs: boolean): any;
    /**
     * Number of slides in the deck.
     */
    slideCount(): number;
}

/**
 * Convert a PPTX byte stream to one PNG byte buffer per slide.
 *
 * `width` overrides the intrinsic slide width (preserving aspect
 * ratio); `height` is honored only when `width` is unset. `fonts` is
 * **required** — PNG rasterization always runs in path-mode and
 * resvg cannot resolve system fonts.
 *
 * # Errors
 *
 * JS-side `Error` whose `message` is the underlying
 * [`slideglance::ConvertError`] formatted via `Display`. Returns
 * `FontResolverRequiredForPng` when `fonts` is empty.
 */
export function convertPptxToPng(bytes: Uint8Array, slides: Uint32Array, width: number | null | undefined, height: number | null | undefined, fonts: Uint8Array[]): any;

/**
 * Convert a PPTX byte stream to one SVG document per slide.
 *
 * Returns a JS array of `{ slideNumber, svg, notes?, layoutName?,
 * sectionName? }` objects, mirroring the TS `convertPptxToSvg` shape.
 *
 * `slides` filters by 1-based slide number; pass an empty array for
 * "all slides". `fonts` enables path-mode rendering when non-empty;
 * each entry is a TTF/OTF/TTC byte buffer registered by family name.
 *
 * # Errors
 *
 * JS-side `Error` whose `message` is the underlying
 * [`slideglance::ConvertError`] formatted via `Display`.
 */
export function convertPptxToSvg(bytes: Uint8Array, slides: Uint32Array, fonts: Uint8Array[]): any;

/**
 * Converts an EMU value to pixels at 96 DPI.
 *
 * Exposed as an end-to-end smoke test that the `slideglance-utils` crate links into
 * WASM correctly.
 */
export function emuToPixels(emu: number): number;

/**
 * `wasm-bindgen` start hook. Installs a panic hook that forwards Rust
 * panics to the host's `console.error`, making debugging WASM crashes in
 * browsers tractable.
 */
export function init(): void;

/**
 * Parse a PPTX byte stream into a JS-side [`Presentation`] object.
 *
 * `bytes` is consumed: the WASM caller can release the original
 * `Uint8Array` once this function returns. The returned `JsValue` is the
 * serde-serialized [`slideglance_model::Presentation`] structure (uses
 * [`serde-wasm-bindgen`] under the hood — call sites get plain JS objects
 * rather than `JsValue::Object` references).
 *
 * # Errors
 *
 * Returns a JS-side `Error` whose `message` is the underlying
 * [`slideglance::PptxError`] formatted via `Display` (zip parse failure,
 * missing `ppt/presentation.xml`, malformed XML, …).
 */
export function parsePptxData(bytes: Uint8Array): any;

/**
 * Rasterize an SVG document to PNG bytes via the deterministic
 * `slideglance-png` pipeline.
 *
 * `svg` is the SVG source as a UTF-8 string. `width` overrides the
 * intrinsic SVG width (preserving aspect ratio); pass `None` for the
 * SVG's own size. `fonts` is a list of font byte buffers — every glyph
 * the SVG references must be in this list, since the rasterizer never
 * touches the host's system fonts.
 *
 * # Errors
 *
 * Returns a JS-side `Error` whose `message` is the underlying
 * [`slideglance_png::PngError`] formatted via `Display` (SVG parse failure,
 * invalid output dimensions, PNG encoder failure).
 */
export function svgToPng(svg: string, width: number | null | undefined, height: number | null | undefined, fonts: Uint8Array[]): Uint8Array;

/**
 * Returns the crate version.
 *
 * Smoke-test entry point for verifying that the WASM module loads correctly
 * in JS hosts before any real conversion APIs are wired up.
 */
export function version(): string;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly __wbg_pptxdocument_free: (a: number, b: number) => void;
    readonly convertPptxToPng: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => void;
    readonly convertPptxToSvg: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => void;
    readonly init: () => void;
    readonly parsePptxData: (a: number, b: number, c: number) => void;
    readonly pptxdocument_fontDefs: (a: number, b: number) => void;
    readonly pptxdocument_fontUsage: (a: number, b: number) => void;
    readonly pptxdocument_mtxCompressedFonts: (a: number, b: number) => void;
    readonly pptxdocument_new: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
    readonly pptxdocument_renderSlide: (a: number, b: number, c: number, d: number, e: number) => void;
    readonly pptxdocument_slideCount: (a: number) => number;
    readonly svgToPng: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => void;
    readonly version: (a: number) => void;
    readonly emuToPixels: (a: number) => number;
    readonly __wbindgen_export: (a: number, b: number) => number;
    readonly __wbindgen_export2: (a: number, b: number, c: number, d: number) => number;
    readonly __wbindgen_export3: (a: number, b: number, c: number) => void;
    readonly __wbindgen_export4: (a: number) => void;
    readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
    readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;

/**
 * Instantiates the given `module`, which can either be bytes or
 * a precompiled `WebAssembly.Module`.
 *
 * @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
 *
 * @returns {InitOutput}
 */
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
 * If `module_or_path` is {RequestInfo} or {URL}, makes a request and
 * for everything else, calls `WebAssembly.instantiate` directly.
 *
 * @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
 *
 * @returns {Promise<InitOutput>}
 */
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
