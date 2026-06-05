import type { PositionedNode } from "../../types.ts";
import type { RenderContext } from "../types.ts";
import type { ImageSrcGuardOptions } from "../../options.ts";
import type { DiagnosticCollector } from "../../diagnostics.ts";
type ImagePositionedNode = Extract<PositionedNode, {
    type: "image";
}>;
export declare function validateImageSrc(src: string, guard: ImageSrcGuardOptions, diagnostics: DiagnosticCollector, options?: {
    silent?: boolean;
}): string | undefined;
export declare function renderImageNode(node: ImagePositionedNode, ctx: RenderContext): void;
export {};
//# sourceMappingURL=image.d.ts.map