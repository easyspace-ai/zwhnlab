/**
 * Recursively walk the BuilderNode tree, applying `visitor` to each node.
 */
export function walkPOMTree(node, visitor) {
    visitor(node);
    switch (node.type) {
        case "vstack":
        case "hstack":
        case "layer":
            for (const child of node.children) {
                walkPOMTree(child, visitor);
            }
            break;
    }
}
