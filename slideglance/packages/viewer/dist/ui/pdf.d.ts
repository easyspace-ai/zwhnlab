/**
 * PDF export — pure-browser, zero-dependency.
 *
 * Pipeline: each already-rendered slide SVG → `<canvas>` → JPEG bytes
 * → embedded into a minimal hand-rolled PDF 1.4 byte stream.
 *
 * Why hand-rolled instead of pulling in `pdf-lib` or `jsPDF`?
 *   The viewer has to keep working as a drop-in browser plugin with
 *   no install-time tooling. A user dropping the bundle into a static
 *   site shouldn't have to add a peer dependency just to export PDFs.
 *
 * Why JPEG instead of PNG?
 *   PDF supports both, but PNG embedding requires deflate-compressed
 *   `FlateDecode` streams. Producing a deflate stream from scratch
 *   means shipping a zlib polyfill or running a wasm gzip; JPEG just
 *   uses `DCTDecode` (the JPEG bit-stream is dropped in literally),
 *   which is what the browser's `canvas.toBlob('image/jpeg')` already
 *   produces.
 */
import type { SlideSvg } from "../types.js";
export interface ExportPdfOptions {
    /** Already-rendered slides (with media URLs already rewritten to data URLs). */
    slides: SlideSvg[];
    /** Output width per slide in pixels (height scales). Defaults to 1920. */
    width?: number;
    /** JPEG quality 0..1. Defaults to 0.9. */
    quality?: number;
    /**
     * Progress hook invoked once per phase tick. Hosts can mirror this
     * into a status bar to keep the UI feeling alive during a large
     * export — without a yield point the rasterize-loop blocks the
     * main thread for seconds on 100+ slide decks.
     */
    onProgress?: (info: {
        phase: "rasterize" | "encode";
        current: number;
        total: number;
    }) => void;
}
/**
 * Returns a `Uint8Array` containing a multi-page PDF — one slide per
 * page, each rendered as a JPEG. Throws when a slide SVG cannot be
 * rasterized.
 */
export declare function exportToPdf(options: ExportPdfOptions): Promise<Uint8Array>;
//# sourceMappingURL=pdf.d.ts.map