/**
 * Module-scoped parse context.
 *
 * The whole parse pipeline is synchronous, so a simple mutable variable
 * suffices — it avoids threading a context object through every converter.
 * Set at the start of parseBuilderDocument and cleared in its finally block.
 */
import type { Diagnostic } from "../diagnostics.ts";
/**
 * Source location of a BuilderNode in its originating XML file.
 * `file` is the absolute file path when known (e.g. for imports) or undefined
 * when the root document was passed as a plain string without `sourcePath`.
 * `line` is 1-based.
 */
export interface BuilderSourcePos {
    file: string | undefined;
    line: number;
}
export type BuilderSourceMap = Map<number, BuilderSourcePos>;
export declare function beginParseContext(sourceMap: BuilderSourceMap | null, diagnostics: Diagnostic[] | null): void;
export declare function endParseContext(): void;
export declare function getCurrentSourceMap(): BuilderSourceMap | null;
export declare function getCurrentDiagnostics(): Diagnostic[] | null;
export declare function allocateNextPomId(): number;
//# sourceMappingURL=parseContext.d.ts.map