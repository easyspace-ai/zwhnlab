/**
 * Codegen output hash + verification.
 *
 * `pnpm run codegen` writes hashes to `.codegen-hash.json`. CI runs codegen
 * with `--check` which re-emits and diffs against the committed files.
 */
import { createHash } from "node:crypto";
export function sha256(content) {
    return createHash("sha256").update(content).digest("hex");
}
export function buildHashRecord(files) {
    const hashes = {};
    for (const k of Object.keys(files).sort()) {
        hashes[k] = sha256(files[k]);
    }
    return {
        generatedAt: new Date().toISOString(),
        files: hashes,
    };
}
export function verifyAgainstHashes(current, recorded) {
    const diffs = [];
    for (const [file, content] of Object.entries(current)) {
        const got = sha256(content);
        const want = recorded.files[file];
        if (!want)
            diffs.push({ file, reason: "missing in recorded hash" });
        else if (got !== want)
            diffs.push({ file, reason: `hash mismatch (${got} vs ${want})` });
    }
    for (const file of Object.keys(recorded.files)) {
        if (!(file in current))
            diffs.push({ file, reason: "no longer generated" });
    }
    return { ok: diffs.length === 0, diffs };
}
