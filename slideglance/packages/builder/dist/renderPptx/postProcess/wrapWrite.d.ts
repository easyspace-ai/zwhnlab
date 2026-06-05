/**
 * Wraps a pptxgenjs instance's `write` (and `writeFile`) so callers
 * transparently receive PPTX bytes that have been put through the
 * connector post-process pass. The pptxgenjs side has no notion of
 * `<p:cxnSp>`, so this wrapper is the only place where the rewrite
 * actually happens before user-visible bytes leave the builder.
 *
 * Design choice: monkey-patch the methods on the live instance rather
 * than expose a new buildPptxBuffer helper. This keeps the public
 * surface unchanged — existing callers `(await pptx.write({ ... }))`
 * automatically inherit connector support without code edits.
 */
import type { DiagnosticCollector } from "../../diagnostics.ts";
import type { PptxInstance } from "../types.ts";
/**
 * Patch the given pptxgenjs instance's `write` method so its result is
 * the connector-rewritten PPTX. Idempotent — calling twice on the
 * same instance leaves only the first wrapping installed (the second
 * call detects the marker and returns).
 *
 * The diagnostics collector is shared with the rest of the builder so
 * any CONNECTOR_UNKNOWN_SHAPE_IDX records produced during rewrite end
 * up on the same `BuildPptxResult.diagnostics` list as parse / layout
 * findings. The post-process is invoked lazily inside the patched
 * `write`, so collector ordering naturally follows call time.
 */
export declare function wrapPptxWriteWithConnectors(pptx: PptxInstance, collector: DiagnosticCollector): void;
//# sourceMappingURL=wrapWrite.d.ts.map