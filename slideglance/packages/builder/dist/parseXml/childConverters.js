/**
 * Per-node child element converters.
 *
 * Each converter walks the children of a leaf node tag (Chart, Table, ...)
 * and projects them into the structured BuilderNode shape (`data`, `rows`,
 * `items`, ...). Converters mutate `result` in place and append errors to
 * `errors`.
 */
import { XMLBuilder } from "fast-xml-parser";
import { coerceChildAttrs } from "./coerceAttrs.js";
import { INLINE_FORMAT_TAGS, buildRunsAndText } from "./textRuns.js";
import { getAttributes, getChildElements, getTagName, getTextContent, } from "./xml.js";
function convertChartChildren(childElements, result, errors) {
    const data = [];
    for (const child of childElements) {
        const tag = getTagName(child);
        if (tag !== "ChartSeries") {
            errors.push(`Unknown child element <${tag}> inside <Chart>. Expected: <ChartSeries>`);
            continue;
        }
        const attrs = getAttributes(child);
        const series = {
            labels: [],
            values: [],
        };
        if (attrs.name !== undefined) {
            // chartDataSchema.name is z.string().optional() — keep as raw string.
            series.name = attrs.name;
        }
        for (const dp of getChildElements(child)) {
            const dpTag = getTagName(dp);
            if (dpTag !== "ChartDataPoint") {
                errors.push(`Unknown child element <${dpTag}> inside <ChartSeries>. Expected: <ChartDataPoint>`);
                continue;
            }
            const dpAttrs = getAttributes(dp);
            if (dpAttrs.label === undefined) {
                errors.push('<ChartDataPoint> requires a "label" attribute');
            }
            if (dpAttrs.value === undefined) {
                errors.push('<ChartDataPoint> requires a "value" attribute');
            }
            if (dpAttrs.label === undefined || dpAttrs.value === undefined) {
                continue;
            }
            const numValue = Number(dpAttrs.value);
            if (isNaN(numValue)) {
                errors.push(`Cannot convert "${dpAttrs.value}" to number in <ChartDataPoint> "value" attribute`);
                continue;
            }
            series.labels.push(dpAttrs.label);
            series.values.push(numValue);
        }
        data.push(series);
    }
    result.data = data;
}
function convertTableChildren(childElements, result, errors, _node, styles = {}) {
    const columns = [];
    const rows = [];
    for (const child of childElements) {
        const tag = getTagName(child);
        switch (tag) {
            case "Col": {
                const colAttrs = coerceChildAttrs("Table", tag, getAttributes(child), errors, styles);
                columns.push(colAttrs);
                break;
            }
            case "Tr": {
                const rowAttrs = coerceChildAttrs("Table", "Tr", getAttributes(child), errors, styles);
                const cells = [];
                for (const cellEl of getChildElements(child)) {
                    const cellTag = getTagName(cellEl);
                    if (cellTag !== "Td") {
                        errors.push(`Unknown child element <${cellTag}> inside <Tr>. Expected: <Td>`);
                        continue;
                    }
                    const cellAttrs = coerceChildAttrs("Tr", cellTag, getAttributes(cellEl), errors, styles);
                    const runsResult = buildRunsAndText(cellEl);
                    if (runsResult) {
                        cellAttrs.runs = runsResult.runs;
                        cellAttrs.text = runsResult.text;
                    }
                    else {
                        const cellText = getTextContent(cellEl);
                        if (cellText !== undefined && !("text" in cellAttrs)) {
                            cellAttrs.text = cellText;
                        }
                    }
                    cells.push(cellAttrs);
                }
                const row = { cells };
                if (rowAttrs.h !== undefined) {
                    row.h = rowAttrs.h;
                }
                rows.push(row);
                break;
            }
            default:
                errors.push(`Unknown child element <${tag}> inside <Table>. Expected: <Col> or <Tr>`);
        }
    }
    if (columns.length > 0) {
        result.columns = columns;
    }
    else if (rows.length > 0) {
        // When <Col> is omitted, derive default columns from the row with the
        // largest cell count (taking colspan into account).
        const maxCells = Math.max(...rows.map((row) => row.cells.reduce((sum, cell) => sum + (cell.colspan ?? 1), 0)));
        result.columns = Array.from({ length: maxCells }, () => ({}));
    }
    if (rows.length > 0) {
        result.rows = rows;
    }
}
function convertListChildren(parentTag, childElements, result, errors, styles = {}) {
    const items = [];
    for (const child of childElements) {
        const tag = getTagName(child);
        if (tag !== "Li") {
            errors.push(`Unknown child element <${tag}> inside <${parentTag}>. Expected: <Li>`);
            continue;
        }
        const attrs = coerceChildAttrs(parentTag, tag, getAttributes(child), errors, styles);
        const runsResult = buildRunsAndText(child);
        if (runsResult) {
            attrs.runs = runsResult.runs;
            attrs.text = runsResult.text;
        }
        else {
            const textContent = getTextContent(child);
            if (textContent !== undefined && !("text" in attrs)) {
                attrs.text = textContent;
            }
        }
        items.push(attrs);
    }
    result.items = items;
}
const svgBuilder = new XMLBuilder({
    preserveOrder: true,
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
});
function serializeSvgElement(svgElement) {
    return String(svgBuilder.build([svgElement]));
}
function convertSvgChildren(childElements, result, errors) {
    const child = childElements[0];
    if (childElements.length !== 1 || !child) {
        errors.push(`<Svg>: Expected exactly one <svg> child element, but found ${childElements.length} child element(s)`);
        return;
    }
    const tag = getTagName(child);
    if (tag !== "svg") {
        errors.push(`<Svg>: Expected <svg> child element, but found <${tag}>`);
        return;
    }
    result.svgContent = serializeSvgElement(child);
}
function convertTextInlineChildren(childElements, result, errors, node) {
    for (const el of childElements) {
        const tag = getTagName(el);
        if (!INLINE_FORMAT_TAGS.has(tag)) {
            errors.push(`<Text>: Unexpected child element <${tag}>. Only <B>, <I>, <A>, <U>, <S>, <Mark>, and <Span> are allowed inside <Text>`);
            return;
        }
    }
    if (!node || childElements.length === 0)
        return;
    const runsResult = buildRunsAndText(node);
    if (runsResult) {
        result.runs = runsResult.runs;
        result.text = runsResult.text;
    }
}
export const CHILD_ELEMENT_CONVERTERS = {
    text: convertTextInlineChildren,
    ul: (childElements, result, errors, _node, styles) => convertListChildren("Ul", childElements, result, errors, styles),
    ol: (childElements, result, errors, _node, styles) => convertListChildren("Ol", childElements, result, errors, styles),
    chart: convertChartChildren,
    table: convertTableChildren,
    svg: convertSvgChildren,
};
