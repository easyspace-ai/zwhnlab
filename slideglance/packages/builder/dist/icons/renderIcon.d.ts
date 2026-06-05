export declare function rasterizeIcon(name: string, size: number, color: string, cache: Map<string, string>): Promise<string>;
/**
 * Rasterize an inline SVG string at the requested size and return a Base64 PNG.
 * When `color` is specified, set the `stroke` / `fill` attributes on the SVG root.
 */
export declare function rasterizeSvgContent(svgContent: string, width: number, color: string | undefined, cache: Map<string, string>, height?: number): Promise<string>;
//# sourceMappingURL=renderIcon.d.ts.map