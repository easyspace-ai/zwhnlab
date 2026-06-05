/**
 * Build-time option types shared by `buildPptx` and `buildContext`.
 *
 * Lives in its own module so that `buildContext.ts` can import the
 * option shapes without pulling in the full `buildPptx.ts` runtime —
 * removing a circular file-level dependency.
 */
export {};
