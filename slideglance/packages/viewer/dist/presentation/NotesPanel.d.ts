/**
 * Footer panel that renders the current slide's speaker notes plus
 * its layout / section labels. Mounted inside the shell when the
 * notes drawer toggle is on.
 */
import type { SlideMeta } from "../types.js";
export interface NotesPanelProps {
    currentSlide: number;
    meta: SlideMeta | null;
}
export declare function NotesPanel(props: NotesPanelProps): JSX.Element;
//# sourceMappingURL=NotesPanel.d.ts.map