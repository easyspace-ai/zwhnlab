import type { PositionedNode } from "../types.ts";
/** Depth-first walk yielding every positioned node, with parent + path. */
export declare function walk(root: PositionedNode, parent?: PositionedNode | null, path?: PositionedNode[]): Generator<{
    node: PositionedNode;
    parent: PositionedNode | null;
    path: readonly PositionedNode[];
}>;
export declare function getChildren(node: PositionedNode): readonly PositionedNode[] | null;
/** A simple stable id for a node — file:line if known, else node-type path. */
export declare function nodeIdOf(node: PositionedNode, path: readonly PositionedNode[]): string;
export declare function nodeSourcePos(node: PositionedNode): {
    file?: string;
    line?: number;
} | undefined;
/** True if a node carries text content (Text/Ul/Ol/Shape with text). */
export declare function isTextBearing(node: PositionedNode): boolean;
//# sourceMappingURL=walker.d.ts.map