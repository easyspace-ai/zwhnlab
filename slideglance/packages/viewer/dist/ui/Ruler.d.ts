import { type CSSProperties } from "react";
import type { RulerUnit } from "./settings.js";
/**
 * PowerPoint-style ruler. React port of the original `<pptx-ruler>`
 * Lit element. Drawn onto a `<canvas>` so ticks stay sharp at any
 * zoom level. The host (typically `<PptxPresentation>`) drives the
 * geometry inputs:
 *
 * - `orientation` — `"horizontal"` or `"vertical"`.
 * - `slideOriginPx` — distance from the ruler's start edge to the
 *   slide's leading edge, in CSS pixels.
 * - `slideExtentPx` — slide's on-screen extent along the ruler axis.
 * - `slideExtentCm` — slide's intrinsic physical size in cm.
 * - `slideIntrinsicPx` — slide's intrinsic logical pixel size.
 * - `unit` — `"cm"` (centred ±N cm) or `"px"` (origin at slide edge).
 */
export interface RulerProps {
    orientation: "horizontal" | "vertical";
    unit: RulerUnit;
    slideOriginPx: number;
    slideExtentPx: number;
    slideExtentCm: number;
    slideIntrinsicPx: number;
    className?: string;
    style?: CSSProperties;
}
export declare function Ruler(props: RulerProps): JSX.Element;
//# sourceMappingURL=Ruler.d.ts.map