/**
 * Localization for the viewer UI.
 *
 * The viewer ships a small message catalog covering every
 * user-visible string in the shell, dialogs, status bar, and UI
 * components. The active locale is decided in this priority order:
 *
 *   1. Forced override via {@link setLocale} / settings.locale (any
 *      value other than `"auto"`).
 *   2. Environment auto-detect — `navigator.languages` in the
 *      browser, `LC_ALL` / `LC_MESSAGES` / `LANG` on Node (used by
 *      Vitest / SSR scenarios).
 *   3. English as the universal fallback.
 *
 * Missing keys in a non-English catalog fall back to the English
 * entry so a partially-translated catalog never surfaces empty UI.
 *
 * The module exposes a tiny pub/sub so reactive shells (Lit
 * elements) can re-render when the active locale changes without
 * pulling in a runtime dependency on a heavier i18n library — the
 * viewer is offline-first and we don't ship Intl message-format
 * polyfills.
 */
/** Forced override values plus the special `"auto"` sentinel. */
export type Locale = "auto" | "en" | "ko" | "ja" | "zh-CN" | "zh-TW" | "es" | "fr" | "de";
/** A concrete locale — what {@link getActiveLocale} returns. */
export type ResolvedLocale = Exclude<Locale, "auto">;
/** All concrete locales the viewer ships catalogs for. */
export declare const SUPPORTED_LOCALES: readonly ResolvedLocale[];
/**
 * Every translatable string used by the viewer, keyed by a stable
 * dotted identifier. Keep the keys language-neutral so translators
 * see semantics rather than English source text — this also keeps
 * the call sites grep-able.
 *
 * Tokens use `{name}` syntax and are substituted by {@link t}.
 */
export type MessageKey = "common.close" | "common.cancel" | "common.loading" | "common.ready" | "common.bytes" | "nav.firstSlide" | "nav.previousSlide" | "nav.nextSlide" | "nav.lastSlide" | "nav.slideCounter" | "nav.slideCounterEmpty" | "search.button" | "search.placeholder" | "search.title" | "search.empty" | "search.noMatches" | "search.typeToSearch" | "output.print" | "output.printTitle" | "output.pdf" | "output.pdfTitle" | "output.slideshow" | "output.slideshowTitle" | "output.gateLoadFirst" | "output.gatePreparing" | "settings.title" | "settings.openTitle" | "file.open" | "render.label" | "render.text" | "render.path" | "render.auto" | "status.toggleNotes" | "status.resizeSidebar" | "status.normalView" | "status.gridView" | "status.zoomOut" | "status.zoomIn" | "status.zoomReset" | "status.fitWindow" | "status.zoom" | "status.slideOf" | "status.slideEmpty" | "status.selectionFontLabel" | "status.selectionFontMultiple" | "status.selectionFontTitle" | "fontUsage.title" | "fontUsage.close" | "fontUsage.headerRequested" | "fontUsage.headerEffective" | "fontUsage.systemFallback" | "fontUsage.allMatched" | "fontUsage.substituteCount" | "notes.heading" | "notes.headingWithSection" | "notes.empty" | "notes.standaloneHeading" | "notes.standaloneEmpty" | "notes.layoutLabel" | "notes.sectionLabel" | "notes.noSlide" | "section.empty" | "dialog.title" | "dialog.appearance" | "dialog.theme" | "dialog.themeDesc" | "dialog.themeAuto" | "dialog.themeAutoDesc" | "dialog.themeLight" | "dialog.themeLightDesc" | "dialog.themeDark" | "dialog.themeDarkDesc" | "dialog.themeHighContrast" | "dialog.themeHighContrastDesc" | "dialog.ruler" | "dialog.rulerShow" | "dialog.rulerUnitLabel" | "dialog.rulerUnitDesc" | "dialog.rulerUnitCm" | "dialog.rulerUnitCmDesc" | "dialog.rulerUnitPx" | "dialog.rulerUnitPxDesc" | "dialog.language" | "dialog.languageDesc" | "dialog.languageAuto" | "dialog.about" | "dialog.aboutPackage" | "dialog.aboutVersion" | "dialog.aboutRendering" | "dialog.aboutRenderingValue" | "dialog.aboutLicense" | "dialog.aboutAppName" | "dialog.aboutEngine" | "dialog.aboutNpmPackage" | "dialog.aboutRepository" | "dialog.aboutCopyright" | "dialog.aboutDeveloper" | "dialog.viewerSettingsAriaLabel" | "phase.preparingSlide" | "phase.renderingPdf" | "phase.encodingPdf" | "phase.preparingSlides" | "status.loadedSlides" | "status.nothingToPrint" | "status.nothingToExport" | "status.pdfFailed" | "status.exported" | "status.errorPrefix" | "viewer.ariaLabel" | "viewer.loading" | "viewer.error" | "viewer.noFile" | "viewer.slideTitle" | "viewer.empty" | "viewer.openFile" | "phase.preparingSlideOf" | "phase.preparingPdf" | "phase.preparingPrint" | "phase.layingOutPrintOf" | "phase.openingPrintDialog" | "phase.savingPdf" | "progress.titlePrint" | "progress.titlePdf" | "playground.title" | "playground.upload" | "playground.samples" | "playground.pickPrompt" | "playground.loadingFile" | "playground.failedHttp" | "playground.fileInfo" | "playground.convertFailed" | "shortcuts.title" | "shortcuts.openTitle" | "shortcuts.groupNavigation" | "shortcuts.groupView" | "shortcuts.groupSelection" | "shortcuts.groupOutput" | "shortcuts.prevSlide" | "shortcuts.nextSlide" | "shortcuts.firstSlide" | "shortcuts.lastSlide" | "shortcuts.zoomIn" | "shortcuts.zoomOut" | "shortcuts.zoomReset" | "shortcuts.panSlide" | "shortcuts.click" | "shortcuts.drag" | "shortcuts.doubleClick" | "shortcuts.selectShape" | "shortcuts.toggleSelect" | "shortcuts.rubberBand" | "shortcuts.selectAll" | "shortcuts.copyText" | "shortcuts.editText" | "shortcuts.clearSelection" | "shortcuts.toggleSearch" | "shortcuts.print";
/**
 * Read the host's preferred locale list. In the browser this is
 * `navigator.languages`; in Node we walk the standard POSIX
 * environment variables. Returns the first entry we recognise, or
 * `"en"` as the universal fallback.
 */
export declare function detectLocale(): ResolvedLocale;
type Listener = (locale: ResolvedLocale) => void;
/** Reset the detection cache — primarily for tests that mutate
 *  `navigator.language` between cases. */
export declare function resetLocaleCache(): void;
/** Currently effective locale (auto-detected unless forced). */
export declare function getActiveLocale(): ResolvedLocale;
/** Auto-detected locale, regardless of the active override. */
export declare function getDetectedLocale(): ResolvedLocale;
/**
 * Apply a forced locale, or pass `"auto"` / `null` to clear the
 * override and revert to auto-detection. Subscribers fire whenever
 * the resolved locale actually changes.
 */
export declare function setLocale(locale: Locale | null): void;
/** Subscribe to active-locale changes. Returns a teardown. */
export declare function subscribeLocale(cb: Listener): () => void;
/**
 * Look up a translated message and substitute `{token}` placeholders.
 * Falls back to the English catalog when the active locale is missing
 * the key, and finally to the key itself when even English doesn't
 * have it (which only happens for keys added without a catalog
 * update — surface them visibly so they get noticed in review).
 */
export declare function t(key: MessageKey, params?: Record<string, string | number>): string;
export {};
//# sourceMappingURL=i18n.d.ts.map