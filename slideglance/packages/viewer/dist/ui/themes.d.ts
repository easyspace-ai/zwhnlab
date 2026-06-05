/**
 * Theme presets for `<pptx-viewer>` and the `<pptx-presentation>`
 * shell.
 *
 * A theme is a record of CSS custom-property overrides covering both
 * the inner viewer (`--pptx-viewer-*`) and the surrounding chrome
 * (`--pptx-shell-*` — ribbon, sidebar, status bar, drawers, dialogs).
 * Consumers apply a theme by setting the variables on the host
 * element (or any ancestor — they're inheritable):
 *
 * ```ts
 * import { applyTheme, THEMES } from "@slideglance/viewer";
 * applyTheme(viewerEl, THEMES.light);
 * ```
 *
 * The light/dark choice can also follow the OS / browser preference
 * automatically — see {@link detectSystemTheme} and
 * {@link subscribeSystemTheme}.
 */
export type ThemeVars = Record<string, string>;
/**
 * Default dark theme — matches the built-in viewer defaults.
 * Includes both viewer-internal HUD variables and the shell chrome
 * (ribbon, sidebar, status bar, search drawer, settings dialog).
 */
export declare const dark: ThemeVars;
/** Light theme — for embedding in white-page docs. */
export declare const light: ThemeVars;
/** Accessible high-contrast theme. */
export declare const highContrast: ThemeVars;
/** Built-in theme registry. */
export declare const THEMES: {
    readonly dark: ThemeVars;
    readonly light: ThemeVars;
    readonly highContrast: ThemeVars;
};
/** Apply a theme to an element by setting CSS custom properties. */
export declare function applyTheme(el: HTMLElement, vars: ThemeVars): void;
/**
 * Inspect the OS / browser color-scheme preference. Returns `"dark"`
 * when `prefers-color-scheme: dark` matches, else `"light"`. SSR /
 * non-window environments (worker, jsdom without matchMedia) get
 * `"light"` as a stable default.
 */
export declare function detectSystemTheme(): "light" | "dark";
/**
 * Subscribe to OS / browser color-scheme changes. The callback fires
 * with `"light"` or `"dark"` whenever `prefers-color-scheme` flips.
 * Returns a teardown function that removes the listener.
 */
export declare function subscribeSystemTheme(cb: (mode: "light" | "dark") => void): () => void;
//# sourceMappingURL=themes.d.ts.map