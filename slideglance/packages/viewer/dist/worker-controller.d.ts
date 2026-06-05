/**
 * Web Worker-backed `SlideController`.
 *
 * Spawns the bundled `pptx-worker.ts` chunk (or accepts a
 * pre-instantiated `Worker` for callers that need to share a worker
 * pool / inject a custom URL) and routes `open` / `render` / `close`
 * messages over a small monotonic-id correlation protocol.
 */
import type { SlideController } from "./types.js";
/**
 * Build a Worker-backed `SlideController`. The worker imports
 * `@slideglance/core/bundler`, parses the deck into a `PptxDocument`, and
 * renders one slide per `render` message with `externalMedia` enabled.
 */
export declare function createWorkerController(workerOverride?: Worker): Promise<SlideController>;
//# sourceMappingURL=worker-controller.d.ts.map