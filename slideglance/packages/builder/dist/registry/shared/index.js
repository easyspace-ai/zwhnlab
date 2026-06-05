/**
 * Shared atom schemas + inferred types for builder nodes.
 *
 * These are the small, composable building blocks (length, padding,
 * border, fill, shadow, color enums, etc.) that compose the per-node
 * schemas in `src/types.ts`. The compiled registry references the same
 * atoms via `CoerceType`; runtime coercion lives in
 * `src/parseXml/coerceByType.ts`.
 */
export * from "./length.js";
export * from "./padding.js";
export * from "./border.js";
export * from "./fill.js";
export * from "./enums.js";
export * from "./text-style.js";
export * from "./background.js";
export * from "./shape.js";
