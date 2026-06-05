/**
 * Style constants for the React viewer shell.
 *
 * Pulled out of `PptxPresentation.tsx` to keep that file focused on
 * the component logic. Every constant here is a plain `CSSProperties`
 * object that can be passed to a `style={...}` prop, plus one global
 * `<style>` template (`SHELL_GLOBAL_CSS`) the shell mounts once at
 * the top of its tree.
 *
 * Theme tokens (e.g. `var(--pptx-shell-bg, #2b2b2f)`) are resolved by
 * the host through CSS custom properties — see `ui/themes.ts` for the
 * default palette. Inline fallbacks are present on every var so an
 * embedder that forgets to mount the theme still gets a usable dark
 * shell.
 */
import type { CSSProperties } from "react";
/** Width of the ruler gutter that frames the slide stage. Shared with
 *  the ruler corner / horizontal / vertical strip styles. */
export declare const RULER_SIZE = 24;
/**
 * One-shot global stylesheet mounted via `<style>{SHELL_GLOBAL_CSS}</style>`
 * at the top of the shell tree. Covers things inline `style=` cannot:
 *
 * - scrollbar theming for the deck container
 * - hover-fade behaviour for the slideshow corner-nav buttons
 * - the keyframes the loading-overlay spinner consumes
 * - reset of native focus / touch chrome on shell buttons
 * - sidebar splitter affordance highlighting
 */
export declare const SHELL_GLOBAL_CSS = "\n[data-pptx-shell] {\n  color-scheme: var(--slideglance-color-scheme, dark);\n  scrollbar-color: var(--pptx-shell-scrollbar-thumb, #3a3a44) var(--pptx-shell-scrollbar-track, #1a1a1f);\n  scrollbar-width: thin;\n}\n[data-pptx-shell] *::-webkit-scrollbar {\n  width: 10px;\n  height: 10px;\n}\n[data-pptx-shell] *::-webkit-scrollbar-track {\n  background: var(--pptx-shell-scrollbar-track, #1a1a1f);\n}\n[data-pptx-shell] *::-webkit-scrollbar-thumb {\n  background: var(--pptx-shell-scrollbar-thumb, #3a3a44);\n  border-radius: 5px;\n  border: 2px solid var(--pptx-shell-scrollbar-track, #1a1a1f);\n}\n[data-pptx-shell] *::-webkit-scrollbar-thumb:hover {\n  background: var(--pptx-shell-scrollbar-thumb-hover, #4d4d58);\n}\n[data-pptx-shell] *::-webkit-scrollbar-corner {\n  background: var(--pptx-shell-scrollbar-track, #1a1a1f);\n}\n/* Slideshow corner-nav reveal: hovering the bottom-right zone or\n   focusing one of its buttons fades the button group in. Keyboard\n   users get the same affordance via the focus-within branch. */\n[data-pptx-shell] [data-pptx-slideshow-nav]:hover > div,\n[data-pptx-shell] [data-pptx-slideshow-nav]:focus-within > div {\n  opacity: 1 !important;\n}\n[data-pptx-shell] [data-pptx-slideshow-nav] button:hover {\n  background: rgba(255, 255, 255, 0.12) !important;\n}\n/* Loading-overlay spinner \u2014 used by the centred parse / slide-prepare\n   panel rendered when there's no slide SVG to show yet. Keyframes\n   live here because inline styles cannot carry @keyframes. */\n@keyframes pptx-loading-spin {\n  to { transform: rotate(360deg); }\n}\n[data-pptx-shell] [data-pptx-slideshow-nav] button:disabled {\n  opacity: 0.4;\n  cursor: default;\n}\n/* Suppress every form of native focus / touch chrome on shell\n   buttons so a click never leaves a persistent ring behind. Keyboard\n   users still get a focus indicator because the affected styles\n   (icon-button / status-icon / radio cell) flip their background or\n   border-color when 'aria-pressed' / 'aria-checked' is true; that\n   semantic-state highlight is what marks the active control, not the\n   browser's default focus ring. '-webkit-tap-highlight-color:\n   transparent' removes the iOS / Android touch flash so the same\n   suppression works on touch devices. */\n[data-pptx-shell] button,\n[data-pptx-shell] [role=\"radio\"] {\n  outline: 0 !important;\n  -webkit-tap-highlight-color: transparent;\n}\n/* Some Chromium embeddings (notably the VS Code webview iframe at\n   the time of writing) keep painting the user-agent focus ring even\n   after `outline: 0 !important` because the chrome stems from a\n   private `-internal-focus-ring` style attached to `:focus-visible`,\n   not the regular `outline` cascade. Belt-and-braces: explicitly\n   suppress every commonly-emitted focus channel \u2014 outline, outline-\n   offset, the legacy `-webkit-focus-ring-color`, and any inset\n   box-shadow a downstream theme might add for accessibility. */\n[data-pptx-shell] button:focus,\n[data-pptx-shell] button:focus-visible,\n[data-pptx-shell] [role=\"radio\"]:focus,\n[data-pptx-shell] [role=\"radio\"]:focus-visible {\n  outline: 0 !important;\n  outline-offset: 0 !important;\n  box-shadow: none !important;\n  -webkit-focus-ring-color: transparent;\n}\n[data-pptx-shell] button::-moz-focus-inner,\n[data-pptx-shell] [role=\"radio\"]::-moz-focus-inner {\n  border: 0;\n}\n/* Sidebar splitter \u2014 subtle highlight on hover/active so the\n   drag affordance is discoverable without visually competing with\n   the sidebar's own border at rest. */\n[data-pptx-shell] [role=\"separator\"][aria-orientation=\"vertical\"]:hover {\n  background: var(--pptx-shell-accent-soft, rgba(106, 163, 255, 0.18));\n}\n[data-pptx-shell] [role=\"separator\"][aria-orientation=\"vertical\"]:focus-visible {\n  outline: 2px solid var(--pptx-shell-accent, #6aa3ff);\n  outline-offset: -2px;\n}\n";
export declare const rootStyle: CSSProperties;
export declare const ribbonStyle: CSSProperties;
export declare const filenameStyle: CSSProperties;
export declare const spacerStyle: CSSProperties;
export declare const dividerStyle: CSSProperties;
export declare const counterStyle: CSSProperties;
export declare const bodyStyle: CSSProperties;
export declare const sidebarStyle: CSSProperties;
export declare const sidebarResizerStyle: CSSProperties;
export declare const stageAreaStyle: CSSProperties;
export declare const stageWrapStyle: CSSProperties;
export declare const stageStyle: CSSProperties;
export declare const baseButtonStyle: CSSProperties;
export declare const iconButtonStyle: CSSProperties;
export declare const activeIconStyle: CSSProperties;
export declare const textButtonStyle: CSSProperties;
export declare const disabledTextButtonStyle: CSSProperties;
export declare const thumbStripStyle: CSSProperties;
export declare const sidebarEmptyStyle: CSSProperties;
export declare const thumbnailButtonStyle: CSSProperties;
export declare const thumbnailButtonActiveStyle: CSSProperties;
export declare const thumbnailIndexStyle: CSSProperties;
export declare const thumbnailFrameStyle: CSSProperties;
export declare const thumbnailInnerStyle: CSSProperties;
export declare const thumbnailPlaceholderStyle: CSSProperties;
export declare const thumbnailTileStyle: CSSProperties;
export declare const thumbnailTileActiveStyle: CSSProperties;
export declare const thumbnailTileFrameStyle: CSSProperties;
export declare const thumbnailCaptionStyle: CSSProperties;
export declare const gridViewStyle: CSSProperties;
export declare const overlayStyle: CSSProperties;
export declare const loadingOverlayStyle: CSSProperties;
export declare const loadingSpinnerStyle: CSSProperties;
export declare const loadingTextStyle: CSSProperties;
export declare const progressHostStyle: CSSProperties;
export declare const progressBackdropStyle: CSSProperties;
export declare const progressPanelStyle: CSSProperties;
export declare const progressTitleStyle: CSSProperties;
export declare const progressStepStyle: CSSProperties;
export declare const progressBarTrackStyle: CSSProperties;
export declare const progressBarFillStyle: CSSProperties;
export declare const progressBarIndeterminateStyle: CSSProperties;
export declare const progressCounterStyle: CSSProperties;
export declare const rulerCornerStyle: CSSProperties;
export declare const rulerHStyle: CSSProperties;
export declare const rulerVStyle: CSSProperties;
export declare const notesPanelStyle: CSSProperties;
export declare const notesHeadingStyle: CSSProperties;
export declare const notesBodyStyle: CSSProperties;
export declare const notesEmptyStyle: CSSProperties;
export declare const notesMetaStyle: CSSProperties;
export declare const searchDrawerStyle: CSSProperties;
export declare const searchHeaderStyle: CSSProperties;
export declare const searchInputStyle: CSSProperties;
export declare const searchEmptyStyle: CSSProperties;
export declare const searchListStyle: CSSProperties;
export declare const searchItemStyle: CSSProperties;
export declare const searchHitNumStyle: CSSProperties;
export declare const slideshowStyle: CSSProperties;
export declare const slideshowNavZoneStyle: CSSProperties;
export declare const slideshowNavGroupStyle: CSSProperties;
export declare const slideshowNavButtonStyle: CSSProperties;
export declare const statusBarStyle: CSSProperties;
export declare const phaseStyle: CSSProperties;
export declare const metaStyle: CSSProperties;
export declare const statusSepStyle: CSSProperties;
export declare const selectionFontsContainerStyle: CSSProperties;
export declare const selectionFontsButtonStyle: CSSProperties;
export declare const selectionFontsButtonActiveStyle: CSSProperties;
export declare const selectionFontsPopoverStyle: CSSProperties;
export declare const selectionFontsListStyle: CSSProperties;
export declare const selectionFontsListItemStyle: CSSProperties;
export declare const statusIconStyle: CSSProperties;
export declare const activeIconSmStyle: CSSProperties;
export declare const zoomSliderStyle: CSSProperties;
export declare const zoomPctStyle: CSSProperties;
//# sourceMappingURL=styles.d.ts.map