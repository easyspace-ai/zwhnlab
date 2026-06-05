/** Extract the computed layout result from a YogaNodeMap. */
export function extractLayoutResults(yogaMap) {
    const layoutMap = new Map();
    for (const [builderNode, yogaNode] of yogaMap) {
        const computed = yogaNode.getComputedLayout();
        layoutMap.set(builderNode, {
            left: computed.left,
            top: computed.top,
            width: computed.width,
            height: computed.height,
        });
    }
    return layoutMap;
}
