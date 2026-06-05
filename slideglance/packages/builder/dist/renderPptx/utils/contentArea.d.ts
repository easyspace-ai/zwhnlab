type Padding = number | {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
};
interface ContentArea {
    x: number;
    y: number;
    w: number;
    h: number;
}
/**
 * Compute the content rendering area, accounting for the node's padding.
 * Draw background/border across the node's full region (node.x/y/w/h),
 * Draw content into the region returned by this function.
 */
export declare function getContentArea(node: {
    x: number;
    y: number;
    w: number;
    h: number;
    padding?: Padding;
}): ContentArea;
export {};
//# sourceMappingURL=contentArea.d.ts.map