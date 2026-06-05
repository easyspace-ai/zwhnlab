import type { TableNode } from "../types.ts";
export declare function calcTableIntrinsicSize(node: TableNode): {
    width: number;
    height: number;
};
export declare function resolveRowHeights(node: TableNode): number[];
/**
 * Resolves the width of each table column.
 *
 * - Columns with a numeric width (`<Col w="120"/>`) use that value.
 * - Columns with a percentage width (`<Col w="30%"/>`) resolve against
 *   the `tableWidth` argument.
 * - Columns without a width (or `w="max"`) share the remaining space
 *   equally — matching the flex-grow:1 idiom used elsewhere in the API.
 */
export declare function resolveColumnWidths(node: TableNode, tableWidth: number): number[];
//# sourceMappingURL=tableUtils.d.ts.map