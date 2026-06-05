/**
 * Lint rule registry. Each rule is pure, runs at a single phase, emits
 * Diagnostics. The set is curated — every code listed here corresponds
 * to a real failure mode observed in slideglance/builder use.
 *
 * Adding a new rule? Append to ALL_RULES at the bottom of this file.
 */
import type { LintRule } from "../types.ts";
export declare const ALL_RULES: readonly LintRule[];
//# sourceMappingURL=index.d.ts.map