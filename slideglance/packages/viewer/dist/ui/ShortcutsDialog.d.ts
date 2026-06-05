export interface ShortcutsDialogProps {
    open: boolean;
    onClose: () => void;
}
/**
 * Discoverable keyboard-shortcut reference. Mirrors PowerPoint's
 * `?` quick-help convention: a small modal that lists every key the
 * viewer reacts to, grouped by topic.
 *
 * Single source of truth — the actual handlers live in
 * `<PptxPresentation>`'s keyboard `useEffect`. If this list and the
 * handler ever drift, the handler wins; this dialog is a hint.
 */
export declare function ShortcutsDialog(props: ShortcutsDialogProps): JSX.Element | null;
//# sourceMappingURL=ShortcutsDialog.d.ts.map