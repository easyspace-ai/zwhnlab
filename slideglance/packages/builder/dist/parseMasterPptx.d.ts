import type { SlideMasterBackground } from "./types.ts";
import type { DiagnosticCollector } from "./diagnostics.ts";
import type { MasterPptxLimits } from "./options.ts";
interface ParseMasterPptxOptions {
    limits?: MasterPptxLimits;
    diagnostics?: DiagnosticCollector;
}
export declare function parseMasterPptx(pptxBuffer: ArrayBuffer | Uint8Array, options?: ParseMasterPptxOptions): Promise<SlideMasterBackground | undefined>;
export {};
//# sourceMappingURL=parseMasterPptx.d.ts.map