/**
 * `useEmbeddedFontStyle` — mount the deck's embedded `@font-face`
 * declarations into a document-scoped `<style>` so the browser's
 * font matcher can resolve family names like `"Noto Sans Bold"`
 * referenced by SVG `<text>` runs.
 *
 * The declarations come from PPTX `<p:embeddedFontLst>` faces
 * extracted by the WASM core (`fontDefs()`), already de-obfuscated
 * and base64-encoded. Without this mount the embedded fonts would
 * only live in the worker's FontFaceSet (worker-local, invisible
 * to `document`), and the SVG would silently fall back to a system
 * sans-serif — wider than the authored face on most hosts and
 * overflowing text frames into adjacent layout regions.
 *
 * The `<style>` element is identified by a single id so re-mounting
 * the component (or swapping decks) replaces the rules atomically;
 * empty CSS removes the element entirely. The `data-slideglance-fonts`
 * attribute is for co-located shells that need to detect or clean
 * up orphan blocks.
 *
 * Eager `document.fonts.load(...)` calls force every declared
 * family to start decoding *now* so the FontUsageIndicator's
 * initial state matches its post-render-everything state. CSS
 * `@font-face` URLs are otherwise lazily fetched only when a text
 * node first references the family, which made the indicator
 * report transient substitutions that disappeared the moment the
 * user switched to grid view.
 */
export declare function useEmbeddedFontStyle(fontDefsCss: string): void;
//# sourceMappingURL=use-embedded-font-style.d.ts.map