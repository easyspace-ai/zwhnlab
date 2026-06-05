import type { SlideSvg } from "../types.js";
export interface SectionNavProps {
    slides: SlideSvg[];
    currentSlide: number;
    onJump: (slide: number) => void;
}
/**
 * Section breadcrumb + jump links derived from each slide's
 * `section_name`. React port of `<pptx-section-nav>`.
 */
export declare function SectionNav(props: SectionNavProps): JSX.Element;
//# sourceMappingURL=SectionNav.d.ts.map