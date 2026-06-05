/**
 * Inline `pptx-media://{hash}` references in an SVG document as
 * base64 data URLs.
 *
 * The viewer rewrites media URLs to short-lived `blob:` URLs that the
 * browser scopes to the creating document. The moment the SVG leaves
 * that document — copied into a print window, fed to a canvas for PDF
 * rasterization — those URLs stop resolving and the slide loses every
 * embedded image. Data URLs are larger but document-portable, which
 * matches the offline / no-server constraint the viewer ships under.
 */
import type { MediaBlob } from "../types.js";
/**
 * Replace every `pptx-media://{hash}` URL in `svg` with a fully-
 * inlined `data:` URL pulled from `media`. Hashes that aren't in the
 * map fall back to a 1×1 transparent GIF — same defensive behaviour
 * the live viewer uses.
 */
export declare function inlineMediaAsDataUrls(svg: string, media: Map<string, MediaBlob>): string;
//# sourceMappingURL=media-inline.d.ts.map