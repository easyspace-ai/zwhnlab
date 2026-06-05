/**
 * Persistent viewer settings.
 *
 * The settings object is stored in `localStorage` under
 * {@link STORAGE_KEY}. Every property has a built-in default so a
 * brand-new install or a wiped browser still produces a valid,
 * fully-functional viewer state. Future settings should be added to
 * the {@link ViewerSettings} interface and {@link DEFAULT_SETTINGS}
 * registry — the load() / save() / subscribe() machinery picks them
 * up automatically.
 *
 * Why a hand-rolled subscriber list instead of using a Lit reactive
 * controller? The settings store is shared across multiple
 * components (the presentation shell, the settings dialog, theme
 * helpers) and must work outside any Lit element too — e.g. when
 * the host page wants to read the persisted theme synchronously
 * before mounting the viewer.
 */
import { type Locale } from "./i18n.js";
/** localStorage key under which the settings JSON is persisted. */
export declare const STORAGE_KEY = "slideglance-viewer-settings:v1";
/**
 * Theme-mode preference. `auto` follows the OS / browser
 * `prefers-color-scheme` setting and reacts to runtime changes.
 */
export type ThemeMode = "auto" | "dark" | "light" | "high-contrast";
/**
 * Ruler measurement unit — `cm` mirrors PowerPoint's default with the
 * slide centred on `0` and counts outwards; `px` shows the on-screen
 * pixel coordinate space starting at the slide's left / top edge.
 */
export type RulerUnit = "cm" | "px";
/**
 * The persisted viewer settings shape. Add new fields here when a
 * new dialog control needs to remember its value across sessions.
 */
export interface ViewerSettings {
    /** Active theme. Defaults to `auto` so a fresh install adapts to the OS. */
    themeMode: ThemeMode;
    /** Whether the PowerPoint-style ruler overlay is visible. */
    showRuler: boolean;
    /** Unit used by the ruler ticks / labels. */
    rulerUnit: RulerUnit;
    /**
     * UI language. `"auto"` resolves via the host's locale (browser
     * `navigator.languages` / Node `LC_*` env). Any explicit value
     * forces that language regardless of the host setting.
     */
    locale: Locale;
    /**
     * Width of the thumbnail sidebar in CSS pixels. Persisted across
     * sessions so the user's resize is remembered. Clamped at runtime
     * to {@link SIDEBAR_WIDTH_MIN}..{@link SIDEBAR_WIDTH_MAX}.
     */
    sidebarWidth: number;
}
/** Lower bound on the sidebar width — anything narrower hides the
 * thumbnail labels and makes the slide-number column unreadable. */
export declare const SIDEBAR_WIDTH_MIN = 140;
/** Upper bound on the sidebar width — past this point the stage area
 * starts to feel cramped on a typical 1024px viewport. */
export declare const SIDEBAR_WIDTH_MAX = 480;
/** Default sidebar width — matches the previous hard-coded value. */
export declare const SIDEBAR_WIDTH_DEFAULT = 220;
/** Clamp `width` to the supported sidebar range. */
export declare function clampSidebarWidth(width: number): number;
/** Defaults applied when no value is found in storage. */
export declare const DEFAULT_SETTINGS: Readonly<ViewerSettings>;
type Listener = (settings: ViewerSettings) => void;
/**
 * Read the persisted settings. Reads from `localStorage` once, then
 * memoizes — subsequent calls are O(1) until a `save()` invalidates
 * the cache.
 */
export declare function loadSettings(): ViewerSettings;
/**
 * Persist a partial update. Triggers every subscriber registered via
 * {@link subscribeSettings}. Storage failures (private mode, quota,
 * disabled localStorage) are swallowed — the in-memory copy still
 * updates so the current session reflects the change even if the
 * persistence layer is unavailable.
 */
export declare function saveSettings(patch: Partial<ViewerSettings>): ViewerSettings;
/**
 * Subscribe to settings changes. Returns a teardown function that
 * removes the listener.
 */
export declare function subscribeSettings(cb: Listener): () => void;
/** Reset the in-memory cache — primarily for tests. */
export declare function resetSettingsCache(): void;
export {};
//# sourceMappingURL=settings.d.ts.map