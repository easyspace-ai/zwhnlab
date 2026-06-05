type StyleEntry = {
    fontSize?: number;
    lineHeight?: number;
};
declare function collectStylesMap(xml: string): Map<string, StyleEntry>;
export declare function equalizeAll(xml: string, label?: string, styles?: Map<string, StyleEntry>): string;
export { collectStylesMap };
export type { StyleEntry };
//# sourceMappingURL=equalize.d.ts.map