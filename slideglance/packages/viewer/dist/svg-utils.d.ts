/**
 * Framework-agnostic SVG utilities used by both the React shell and
 * any external host that needs to massage slide markup before mount
 * (e.g. printing, PDF export, in-page embedding).
 */
import type { MediaBlob, SlideSvg } from "./types.js";
/**
 * Pull the slide aspect ratio (width / height) from the SVG's
 * `viewBox`. Returns `null` when the SVG is empty or malformed; the
 * caller should fall back to 16:9 in that case.
 */
export declare function parseAspect(svg: string): number | null;
/**
 * Strip the renderer's intrinsic `width="…"` / `height="…"` attributes
 * off the outer `<svg>` and inject `style="width:100%;height:100%;
 * display:block"` so the SVG fills its container regardless of CSS
 * resolution order. The renderer emits these attributes to keep the
 * deck's native pixel dimensions, but they fight the viewer's
 * fit-to-stage layout when rendered inline.
 */
export declare function prepareSvg(svg: string): string;
/**
 * Rewrite every `id="…"` and matching `url(#…)` / `href="#…"` /
 * `xlink:href="#…"` reference inside an SVG so the IDs become unique
 * within the host document.
 *
 * Why this is needed: HTML id namespace is document-wide. The viewer
 * mounts the same slide SVG simultaneously in the main stage and the
 * thumbnail panel, and renders sibling slides for grid view — every
 * one of those SVGs ships the same internal IDs (`crop-0`, `crop-1`,
 * `tile-0`, …) emitted by `slideglance-renderer`. Browsers resolve
 * `url(#crop-1)` against the *first* matching element in the
 * document, which is not necessarily the one inside the SVG that
 * declares the reference. The visible symptom is clip / mask /
 * gradient bleed across slides — most dramatically, picture frames
 * being clipped to the bounding box of an unrelated slide's tiny
 * thumbnail icon.
 *
 * Pass a different `prefix` per mount site (e.g. `main-{slide}`,
 * `thumb-{slide}`) so siblings don't collide either.
 */
export declare function uniquifyIds(svg: string, prefix: string): string;
/**
 * Pull the first family out of an SVG `font-family` attribute value,
 * stripping the surrounding quotes and trimming whitespace. The
 * renderer emits a chain such as `'Source Sans 3', "Open Sans", arial`
 * — the first entry is what the source PPTX authored, and the rest are
 * fallbacks. Returns `null` when the input is empty or only contains
 * fallback aliases the user didn't write themselves (`sans-serif`,
 * `serif`, `monospace`, etc.) — those are renderer noise, not authored
 * typefaces, and surfacing them in the status bar would mislead.
 */
export declare function parseFirstFontFamily(value: string): string | null;
/**
 * Replace `pptx-media://{hash}` URLs in the SVG with browser-friendly
 * `blob:` URLs created from the supplied media map. Returns the
 * rewritten SVG plus the array of blob URLs the caller is responsible
 * for revoking when the slide unmounts.
 */
export declare function rewriteMediaRefs(svg: string, media: Map<string, MediaBlob>): {
    svg: string;
    blobUrls: string[];
};
/**
 * Hoist the deck-wide `<style>...@font-face...</style>` block out of
 * the first slide's SVG so the viewer can mount it once at the shadow-
 * root level instead of duplicating tens of MB of base64 across every
 * slide. Returns the extracted CSS body, and rewrites `slides[0].svg`
 * in place to remove the hoisted block. Returns `""` when there is
 * nothing to hoist.
 */
export declare function extractAndStripFontStyle(slides: SlideSvg[]): string;
/**
 * Extract the bare CSS rules (the `@font-face` declarations) from the
 * `<defs><style>…</style></defs>` block that
 * `slideglance-wasm`'s `fontDefs()` returns.
 *
 * Background: when the host renders slides with `includeFontDefs:false`
 * (the worker controller's path — fonts are inlined once, not per
 * slide), the returned `fontDefs` string still wraps the CSS in an
 * SVG `<defs>` shell so the same payload can be used by
 * `includeFontDefs:true` callers without conditional formatting. Hosts
 * that mount these declarations into `document.head` need just the
 * inner CSS without the SVG wrapper.
 *
 * Returns `""` when the input is empty or contains no `<style>` block.
 */
export declare function extractFontStyleCss(fontDefs: string): string;
//# sourceMappingURL=svg-utils.d.ts.map