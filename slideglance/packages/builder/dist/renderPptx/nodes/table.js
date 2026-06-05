import { resolveFontFamily, resolveTextStyleValue, } from "../../defaultTextStyle.js";
import { resolveColumnWidths, resolveRowHeights, } from "../../shared/tableUtils.js";
import { pxToIn, pxToPt } from "../units.js";
import { convertUnderline, convertStrike } from "../textOptions.js";
import { getContentArea } from "../utils/contentArea.js";
import { renderObjectName } from "../utils/objectName.js";
import { validateHref } from "../utils/href.js";
// Default cell margin in px. Converted to pt per pptxgenjs expectation.
// ~0.05in vertical / ~0.1in horizontal matches PowerPoint's default table margin.
const DEFAULT_CELL_MARGIN_PX = [5, 10, 5, 10];
function resolveCellMarginPt(cellMargin, tableMargin) {
    const [dt, dr, db, dl] = DEFAULT_CELL_MARGIN_PX;
    const pick = (m, fallback) => {
        if (m === undefined)
            return fallback;
        if (typeof m === "number")
            return [m, m, m, m];
        return [
            m.top ?? fallback[0],
            m.right ?? fallback[1],
            m.bottom ?? fallback[2],
            m.left ?? fallback[3],
        ];
    };
    const tableResolved = pick(tableMargin, [dt, dr, db, dl]);
    const cellResolved = pick(cellMargin, tableResolved);
    return [
        pxToPt(cellResolved[0]),
        pxToPt(cellResolved[1]),
        pxToPt(cellResolved[2]),
        pxToPt(cellResolved[3]),
    ];
}
export function renderTableNode(node, ctx) {
    const defaultTextStyle = ctx.buildContext?.defaultTextStyle;
    const tableRows = node.rows.map((row) => row.cells.map((cell) => {
        const cellMarginPt = resolveCellMarginPt(cell.padding ?? cell.margin, node.cellMargin);
        const cellOptions = {
            fontSize: pxToPt(resolveTextStyleValue(cell.fontSize, defaultTextStyle?.fontSize, 18)),
            fontFace: resolveFontFamily(cell.fontFamily, defaultTextStyle),
            color: cell.color ?? defaultTextStyle?.color,
            bold: cell.bold ?? defaultTextStyle?.bold,
            italic: cell.italic ?? defaultTextStyle?.italic,
            underline: convertUnderline(cell.underline),
            strike: convertStrike(cell.strike),
            highlight: cell.highlight,
            align: cell.textAlign ?? "left",
            valign: cell.verticalAlign ?? "middle",
            fill: cell.backgroundColor
                ? { color: cell.backgroundColor }
                : undefined,
            colspan: cell.colspan,
            rowspan: cell.rowspan,
            margin: cellMarginPt,
            charSpacing: cell.letterSpacing !== undefined
                ? cell.letterSpacing * 100
                : undefined,
        };
        if (cell.runs && cell.runs.length > 0) {
            const textItems = cell.runs.map((run) => {
                const validatedHref = run.href
                    ? validateHref(run.href, ctx.buildContext.security.allowedHrefSchemes, ctx)
                    : undefined;
                return {
                    text: run.text,
                    options: {
                        fontSize: pxToPt(resolveTextStyleValue(cell.fontSize, defaultTextStyle?.fontSize, 18)),
                        fontFace: resolveFontFamily(cell.fontFamily, defaultTextStyle),
                        color: run.color ?? cell.color ?? defaultTextStyle?.color,
                        bold: run.bold ?? cell.bold ?? defaultTextStyle?.bold,
                        italic: run.italic ?? cell.italic ?? defaultTextStyle?.italic,
                        underline: convertUnderline(run.underline ?? cell.underline),
                        strike: convertStrike(run.strike ?? cell.strike),
                        highlight: run.highlight ?? cell.highlight,
                        charSpacing: cell.letterSpacing !== undefined
                            ? cell.letterSpacing * 100
                            : undefined,
                        ...(validatedHref ? { hyperlink: { url: validatedHref } } : {}),
                    },
                };
            });
            return {
                text: textItems,
                options: {
                    align: cell.textAlign ?? "left",
                    valign: cell.verticalAlign ?? "middle",
                    fill: cell.backgroundColor
                        ? { color: cell.backgroundColor }
                        : undefined,
                    colspan: cell.colspan,
                    rowspan: cell.rowspan,
                    margin: cellMarginPt,
                    charSpacing: cell.letterSpacing !== undefined
                        ? cell.letterSpacing * 100
                        : undefined,
                },
            };
        }
        return {
            text: cell.text,
            options: cellOptions,
        };
    }));
    const content = getContentArea(node);
    const objectName = renderObjectName(node, ctx);
    const tableOptions = {
        x: pxToIn(content.x),
        y: pxToIn(content.y),
        w: pxToIn(content.w),
        h: pxToIn(content.h),
        colW: resolveColumnWidths(node, content.w).map((width) => pxToIn(width)),
        rowH: resolveRowHeights(node).map((height) => pxToIn(height)),
        valign: "middle",
        ...(objectName ? { objectName } : {}),
    };
    if (node.cellBorder) {
        tableOptions.border = {
            color: node.cellBorder.color ?? "000000",
            pt: node.cellBorder.width !== undefined ? pxToPt(node.cellBorder.width) : 1,
            type: node.cellBorder.dashType ?? "solid",
        };
    }
    ctx.slide.addTable(tableRows, tableOptions);
}
