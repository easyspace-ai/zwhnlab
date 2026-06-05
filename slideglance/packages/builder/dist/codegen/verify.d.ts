/**
 * Codegen output hash + verification.
 *
 * `pnpm run codegen` writes hashes to `.codegen-hash.json`. CI runs codegen
 * with `--check` which re-emits and diffs against the committed files.
 */
export interface CodegenHashes {
    /** ISO timestamp of when the hash file was written. */
    generatedAt: string;
    /** Source code revision (best-effort) — can be empty when unavailable. */
    sourceRev?: string;
    /** Hash per generated file (relative path -> sha256). */
    files: Record<string, string>;
}
export declare function sha256(content: string): string;
export declare function buildHashRecord(files: Record<string, string>): CodegenHashes;
interface VerifyResult {
    ok: boolean;
    diffs: Array<{
        file: string;
        reason: string;
    }>;
}
export declare function verifyAgainstHashes(current: Record<string, string>, recorded: CodegenHashes): VerifyResult;
export {};
//# sourceMappingURL=verify.d.ts.map