/**
 * Print mode — open a new window containing one SVG-per-page so the
 * browser's print dialog can produce a PDF or paper printout.
 *
 * This deliberately avoids the heavier `pdf-lib` round-trip provided
 * by {@link exportToPdf}; it leaves typography rendering up to
 * the browser engine.
 */
import type { SlideSvg } from "../types.js";
export interface PrintOptions {
    /** Document title shown by the browser's print dialog. */
    title?: string;
    /**
     * Progress hook invoked while slides are inserted into the print
     * window. Without a yield point a 100+ slide deck stalls the main
     * thread for seconds; the host can mirror this into a status bar
     * so the UI keeps feeling alive.
     */
    onProgress?: (info: {
        phase: "layout" | "open-dialog";
        current: number;
        total: number;
    }) => void;
}
/**
 * Open a new window containing each slide as a full-page SVG and
 * trigger the browser's print dialog. Returns the opened window
 * reference (or `null` when popups are blocked).
 *
 * Page orientation is auto-detected from the slide aspect ratio so
 * portrait decks (e.g. A4-portrait reports rendered as PPTX) print
 * upright instead of being squeezed into landscape paper.
 */
export declare function printDeck(slides: SlideSvg[], options?: PrintOptions): Promise<Window | null>;
//# sourceMappingURL=print.d.ts.map