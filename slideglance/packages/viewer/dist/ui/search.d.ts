import type { SlideSvg } from "../types.js";
/** One search hit. */
export interface SearchHit {
    slide_number: number;
    /** Surrounding excerpt with the match underlined by `[match]…[/match]`. */
    excerpt: string;
}
/**
 * Plain-text search across text-mode SVG output. Each slide's `<text>`
 * descendant text is concatenated and searched case-insensitively.
 *
 * Path-mode SVG has no searchable text (glyphs are paths) and
 * therefore yields no hits. The function is pure so consumers can run
 * it inside Web Workers if needed.
 */
export declare function searchSlides(slides: SlideSvg[], query: string): SearchHit[];
/** Strip the `[match]` markers — useful for plain-text rendering. */
export declare function stripMatchMarkers(excerpt: string): string;
/**
 * Split an excerpt into ordered `(text, isMatch)` runs so renderers
 * can wrap the highlighted span without parsing markers themselves.
 */
export declare function splitMatches(excerpt: string): Array<{
    text: string;
    isMatch: boolean;
}>;
//# sourceMappingURL=search.d.ts.map