/**
 * Bundled-font registry + thin facade over `@slideglance/measure`'s
 * `TextMeasurer` for layout-time text measurement.
 *
 * The four bundled font buffers (Noto Sans JP / Pretendard, Regular +
 * Bold) are passed to slideglance once, lazily, on first use. Bold
 * variants are auto-detected via `OS/2.usWeightClass >= 600` on the
 * slideglance side and routed to its bold-variant slot, so the same
 * family name (e.g. `"Pretendard"`) resolves to the Regular or Bold
 * face based purely on the `bold` flag at measurement time.
 */
import { TextMeasurer } from "@slideglance/measure/node";
type FontWeight = "normal" | "bold";
/**
 * Per-build measurer factory. Returns a fresh {@link TextMeasurer} that
 * mounts the bundled fonts (Noto Sans JP, Pretendard) plus every
 * caller-supplied TTF/OTF buffer in `extraFonts`. The slideglance
 * constructor reads each face's `name` table for the family lookup and
 * the `OS/2.usWeightClass` for the regular/bold split — supply both
 * weight variants of each family for accurate bold measurement.
 *
 * When `extraFonts` is empty / undefined this is identical to
 * {@link getMeasurer} but allocates a new instance instead of reusing
 * the cached singleton; prefer {@link getMeasurer} on the no-extras
 * path to avoid the allocation.
 */
export declare function createMeasurer(extraFonts?: Uint8Array[]): TextMeasurer;
/** Whether the family name has a bundled TTF buffer this module can register. */
export declare function isBundledFont(fontFamily: string): boolean;
/**
 * Script-aware bundled-font picker for an unbundled family.
 *
 * Both bundled fonts cover Latin glyphs, but only Pretendard ships
 * Hangul (Noto Sans JP covers Han/Hiragana/Katakana plus Latin). When
 * the caller supplies an unbundled `fontFamily`, sample the input
 * text and prefer Pretendard for Hangul-dominant strings; otherwise
 * use the global default. CJK and Latin text both round-trip fine
 * through Noto Sans JP.
 */
export declare function pickBundledFontForText(fontFamily: string, text: string): string;
/**
 * Pixel advance of `text` rendered at `fontSizePx` in the given bundled
 * font / weight. Non-bundled families must be canonicalised by the
 * caller (e.g. via {@link pickBundledFontForText}); passing an
 * unknown name causes the underlying `OpentypeTextMeasurer` to fall
 * back to its heuristic.
 */
export declare function measureTextWidth(text: string, fontFamily: string, fontSizePx: number, weight: FontWeight, measurer?: TextMeasurer): number;
/**
 * Natural line-height ratio (`× fontSize`) for the given bundled font /
 * weight. Mirrors the legacy opentype-side computation
 * `(ascender + |descender| + lineGap) / unitsPerEm`, but reads metrics
 * from slideglance's resolved face. Non-bundled families fall through
 * to {@link DEFAULT_FONT_FAMILY}.
 */
export declare function measureFontLineHeightRatio(fontFamily: string, weight: FontWeight, measurer?: TextMeasurer): number;
/** Re-export the {@link TextMeasurer} type so callers don't need to depend on `@slideglance/measure` directly. */
export type { TextMeasurer };
//# sourceMappingURL=fontLoader.d.ts.map