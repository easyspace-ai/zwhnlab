/**
 * `usePrintPdfExport` — extracts the print + PDF export handlers from
 * the `PptxPresentation` component body.
 *
 * Both flows share the same shape:
 * 1. show the centred progress overlay,
 * 2. force every slide to render via `ensureAllSlidesRendered`,
 * 3. inline media as data URIs (so the print window / PDF doesn't
 *    fetch from the deck-scoped `pptx-media://` blob namespace),
 * 4. invoke the underlying export utility,
 * 5. dismiss the overlay (with a small grace period so the
 *    "Opening print dialog…" / "Saving…" steps stay visible).
 *
 * Pulled out so the main component can stop carrying the ~110-line
 * pair of `useCallback`s along with the rest of its state graph.
 */
import type { SlideSvg } from "../types.js";
/**
 * Live progress payload — exactly the shape the centred export-overlay
 * consumes. `current` / `total` are optional so the caller can paint
 * an indeterminate bar before the per-slide loop starts.
 */
export interface ExportProgress {
    title: string;
    step: string;
    current?: number;
    total?: number;
}
export interface UsePrintPdfExportArgs {
    /** Display name (filename) used as the print job title and PDF stem. */
    name?: string | null;
    /**
     * Force-render every slide and return their SVGs. Reports progress
     * via the optional callback (1-based current index, 1-based total).
     * Mirrors the `ensureAllSlidesRendered` private helper inside
     * `PptxPresentation` — pass it in from the host because it owns the
     * underlying slide cache.
     */
    ensureAllSlidesRendered: (silent: boolean, onProgress?: (current: number, total: number) => void) => Promise<SlideSvg[]>;
    setProgress: (progress: ExportProgress | null) => void;
    setErrorMsg: (msg: string | null) => void;
    setPhase: (phase: string) => void;
}
export interface UsePrintPdfExportResult {
    /** Open the browser's native print dialog with every slide laid out. */
    handlePrint: () => Promise<void>;
    /** Save every slide as a single PDF via `exportToPdf`. */
    handleExportPdf: () => Promise<void>;
}
export declare function usePrintPdfExport(args: UsePrintPdfExportArgs): UsePrintPdfExportResult;
//# sourceMappingURL=use-print-pdf-export.d.ts.map