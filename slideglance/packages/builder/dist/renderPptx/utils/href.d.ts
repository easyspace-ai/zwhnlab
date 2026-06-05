import type { RenderContext } from "../types.ts";
/**
 * Validates an href URL scheme against the allowlist.
 * Returns the href if allowed, or undefined if disallowed (emits INVALID_HREF_SCHEME diagnostic).
 */
export declare function validateHref(href: string, allowedSchemes: ReadonlySet<string>, ctx: RenderContext): string | undefined;
//# sourceMappingURL=href.d.ts.map