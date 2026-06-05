import { type ReactNode } from "react";
import { type ViewerSettings } from "./settings.js";
export interface SettingsDialogProps {
    open: boolean;
    onClose: () => void;
    /**
     * Display name of the consuming app — usually the brand identifier
     * shown in the host's window title. Defaults to "SlideGlance".
     */
    appName?: string;
    /** Version string surfaced in the About panel. */
    appVersion?: string;
    /**
     * npm package name the host is built on top of. Defaults to
     * `@slideglance/viewer`. Hosts that wrap the viewer in their own
     * brand pass their own package name here.
     */
    npmPackage?: string;
    /**
     * Rust crate compiled to WebAssembly that powers conversion. Defaults
     * to the umbrella `slideglance-wasm` — the Rust → Wasm boundary the
     * viewer actually runs against.
     */
    engineCrate?: string;
    /**
     * URL of the project repository (typically GitHub). Rendered as a
     * clickable link in the About panel.
     */
    repositoryUrl?: string;
    /**
     * Copyright holder displayed in the About panel. Defaults to the
     * SlideGlance project's corporate owner.
     */
    copyrightHolder?: string;
    /**
     * Copyright year shown next to the holder. Defaults to the current
     * UTC year so first-time embedders don't see a stale value.
     */
    copyrightYear?: string;
    /**
     * Lead developer attribution. Defaults to the SlideGlance maintainer.
     */
    developer?: string;
    /**
     * Brand icon shown at the top of the About panel. Hosts that wrap
     * the viewer can pass their own logo here (typically as an inline
     * `<svg>` element to keep the bundle offline-first). Falls back to
     * the bundled SlideGlance mark when omitted.
     */
    appIcon?: ReactNode;
    onSettingsChange?: (settings: ViewerSettings) => void;
}
/**
 * Modal settings panel — React port of `<pptx-settings-dialog>`.
 *
 * Reads/writes to the persistent settings store so changes survive
 * across sessions. Every interaction commits immediately (no
 * separate Save button), matching macOS / Windows preferences
 * conventions.
 */
export declare function SettingsDialog(props: SettingsDialogProps): JSX.Element | null;
//# sourceMappingURL=SettingsDialog.d.ts.map