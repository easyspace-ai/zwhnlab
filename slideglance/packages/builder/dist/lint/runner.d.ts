import type { Diagnostic } from "../diagnostics.ts";
import type { LintContext, LintOptions, LintRule } from "./types.ts";
/**
 * Filter & severity-override the rule set per LintOptions, then run.
 */
export declare function runLintRules(ctx: LintContext, options: LintOptions): Diagnostic[];
/** Used by tests to enumerate rules. */
export declare function getAllRules(): readonly LintRule[];
//# sourceMappingURL=runner.d.ts.map