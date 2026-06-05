import type { BuilderNode } from "../types.ts";
/**
 * Recursively walk the BuilderNode tree, applying `visitor` to each node.
 */
export declare function walkPOMTree(node: BuilderNode, visitor: (node: BuilderNode) => void): void;
//# sourceMappingURL=walkTree.d.ts.map