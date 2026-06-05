/* tslint:disable */
/* eslint-disable */

/**
 * JS-facing standalone text measurer.
 *
 * Construct once with a set of font byte buffers and reuse across many
 * `measureWidth` calls — the fonts are parsed exactly once at
 * construction time, which matters for callers that drive measurement
 * from a hot path (e.g. a layout engine's wrap callback firing per
 * word).
 *
 * Bold variants are detected automatically: any face whose
 * `OS/2.usWeightClass >= 600` is registered into the resolver's
 * bold-variant slot under the same family name as the Regular face.
 * `measureWidth(..., bold=true, ...)` then resolves to the Bold face
 * directly, with no caller-side family rename hack.
 */
export class TextMeasurer {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Ascender height as a multiple of the font size
     * (`ascender / units_per_em`). Defaults to
     * `HeuristicTextMeasurer`'s value when neither family resolves.
     */
    ascenderRatio(font_family?: string | null, font_family_ea?: string | null): number;
    /**
     * Natural line height as a multiple of the font size, derived from
     * the resolved face's vertical metrics
     * (`(ascender + |descender| + line_gap) / units_per_em`). Defaults
     * to `HeuristicTextMeasurer`'s value when neither family resolves.
     */
    lineHeightRatio(font_family?: string | null, font_family_ea?: string | null): number;
    /**
     * Pixel advance of `text` rendered at `font_size_pt`. `font_family`
     * is the run's Latin family, `font_family_ea` the East-Asian
     * family; either may be `null`/`undefined`. `bold` and `italic`
     * flags drive variant lookup (Bold faces auto-registered by the
     * constructor) and variable-axis selection on faces that expose
     * `wght` / `ital` axes.
     */
    measureWidth(text: string, font_size_pt: number, bold: boolean, italic: boolean, font_family?: string | null, font_family_ea?: string | null): number;
    /**
     * Build the measurer from font byte buffers. Each buffer is a
     * TTF/OTF; the first face's family name (per the OpenType `name`
     * table) becomes its key in the resolver. Buffers without a
     * `name` table are silently skipped.
     *
     * `family_names` is an optional parallel array overriding the
     * resolver key per buffer. When supplied it must have the same
     * length as `fonts`; an empty / undefined entry means "fall back
     * to the face's `family_name()`". Callers normally pass `None` —
     * Bold faces are auto-routed to the bold-variant slot via their
     * `OS/2.usWeightClass`. Override only when the face's `name`
     * table family does not match the deck-side family the run will
     * reference.
     *
     * # Errors
     *
     * Returns a JS-side `Error` whose `message` is either the
     * `ttf-parser` failure for any buffer that fails to parse, or a
     * length-mismatch description when `family_names` is supplied
     * with a different length than `fonts`.
     */
    constructor(fonts: Uint8Array[], family_names?: string[] | null);
}

/**
 * Returns the crate version. Smoke-test entry point.
 */
export function version(): string;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly __wbg_textmeasurer_free: (a: number, b: number) => void;
    readonly textmeasurer_ascenderRatio: (a: number, b: number, c: number, d: number, e: number) => number;
    readonly textmeasurer_lineHeightRatio: (a: number, b: number, c: number, d: number, e: number) => number;
    readonly textmeasurer_measureWidth: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number) => number;
    readonly textmeasurer_new: (a: number, b: number, c: number, d: number, e: number) => void;
    readonly version: (a: number) => void;
    readonly __wbindgen_export: (a: number, b: number) => number;
    readonly __wbindgen_export2: (a: number, b: number, c: number, d: number) => number;
    readonly __wbindgen_export3: (a: number, b: number, c: number) => void;
    readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
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
