import { XMLParser } from "fast-xml-parser";
const DEFAULT_MAX_BYTES = 50 * 1024 * 1024; // 50 MB
const DEFAULT_MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5 MB
// JSZip is a CJS package; load it via dynamic import to handle default export differences.
async function loadJSZip() {
    const mod = await import("jszip");
    /* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-return */
    return mod.default ?? mod;
    /* eslint-enable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-return */
}
const xmlParser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
    processEntities: true, // D2 T35 alignment — explicit for future-proofing
});
/** Returns a MIME type string inferred from the file extension. */
function mimeTypeFromExt(filePath) {
    const ext = filePath.split(".").pop()?.toLowerCase();
    switch (ext) {
        case "png":
            return "image/png";
        case "jpg":
        case "jpeg":
            return "image/jpeg";
        case "gif":
            return "image/gif";
        case "bmp":
            return "image/bmp";
        case "svg":
            return "image/svg+xml";
        case "tiff":
        case "tif":
            return "image/tiff";
        case "webp":
            return "image/webp";
        default:
            return "image/png";
    }
}
/** Resolves a relationship ID to its target file path from a rels XML string. */
function resolveRelId(relsXml, rId) {
    /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
    const parsed = xmlParser.parse(relsXml);
    const relationships = parsed?.Relationships?.Relationship;
    if (!relationships)
        return undefined;
    const rels = Array.isArray(relationships) ? relationships : [relationships];
    for (const rel of rels) {
        if (rel["@_Id"] === rId) {
            return rel["@_Target"];
        }
    }
    /* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
    return undefined;
}
/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
/**
 * Extracts background information from a bgPr element.
 * Enforces maxImageBytes cap on embedded image data.
 */
async function extractBackgroundFromBgPr(
// eslint-disable-next-line @typescript-eslint/no-explicit-any
bgPr, zip, relsPath, basePath, maxImageBytes, diagnostics) {
    if (!bgPr)
        return undefined;
    // Solid color fill
    const solidFill = bgPr["a:solidFill"];
    if (solidFill) {
        const srgbClr = solidFill["a:srgbClr"];
        if (srgbClr) {
            const color = srgbClr["@_val"] ?? undefined;
            if (color)
                return { color };
        }
    }
    // Image background
    const blipFill = bgPr["a:blipFill"];
    if (blipFill) {
        const blip = blipFill["a:blip"];
        const rId = blip?.["@_r:embed"];
        if (!rId)
            return undefined;
        const relsFile = zip.file(relsPath);
        if (!relsFile)
            return undefined;
        const relsXml = await relsFile.async("text");
        const target = resolveRelId(relsXml, rId);
        if (!target)
            return undefined;
        // Resolve relative path from basePath
        const imagePath = new URL(target, `file:///${basePath}dummy`).pathname.slice(1);
        const imageFile = zip.file(imagePath);
        if (!imageFile)
            return undefined;
        // Read as uint8array to check size before base64 encoding
        const imageBytes = await imageFile.async("uint8array");
        if (imageBytes.byteLength > maxImageBytes) {
            diagnostics?.add("MASTER_PPTX_SIZE_LIMIT", `parseMasterPptx: embedded image "${imagePath}" exceeds per-image limit of ${maxImageBytes} bytes (size: ${imageBytes.byteLength})`);
            return undefined;
        }
        // Convert Uint8Array to base64
        const imageData = btoa(String.fromCharCode(...imageBytes));
        const mimeType = mimeTypeFromExt(imagePath);
        return { data: `data:${mimeType};base64,${imageData}` };
    }
    return undefined;
}
export async function parseMasterPptx(pptxBuffer, options) {
    const maxBytes = options?.limits?.maxBytes ?? DEFAULT_MAX_BYTES;
    const maxImageBytes = options?.limits?.maxImageBytes ?? DEFAULT_MAX_IMAGE_BYTES;
    const diagnostics = options?.diagnostics;
    // T39: enforce total buffer size cap
    const bufferSize = pptxBuffer instanceof ArrayBuffer
        ? pptxBuffer.byteLength
        : pptxBuffer.byteLength;
    if (bufferSize > maxBytes) {
        diagnostics?.add("MASTER_PPTX_SIZE_LIMIT", `parseMasterPptx: buffer size ${bufferSize} exceeds limit of ${maxBytes} bytes`);
        return undefined;
    }
    const JSZip = await loadJSZip();
    const zip = await JSZip.loadAsync(pptxBuffer);
    /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
    // 1. Search slide master
    const masterFile = zip.file("ppt/slideMasters/slideMaster1.xml");
    if (masterFile) {
        const masterXml = await masterFile.async("text");
        const parsed = xmlParser.parse(masterXml);
        const bgPr = parsed?.["p:sldMaster"]?.["p:cSld"]?.["p:bg"]?.["p:bgPr"];
        const result = await extractBackgroundFromBgPr(bgPr, zip, "ppt/slideMasters/_rels/slideMaster1.xml.rels", "ppt/slideMasters/", maxImageBytes, diagnostics);
        if (result)
            return result;
    }
    // 2. Search slide layouts (numeric sort: slideLayout2 < slideLayout10)
    const layoutFiles = Object.keys(zip.files).filter((f) => f.startsWith("ppt/slideLayouts/slideLayout") && f.endsWith(".xml"));
    layoutFiles.sort((a, b) => {
        const numA = parseInt(a.match(/slideLayout(\d+)\.xml$/)?.[1] ?? "0", 10);
        const numB = parseInt(b.match(/slideLayout(\d+)\.xml$/)?.[1] ?? "0", 10);
        return numA - numB;
    });
    for (const layoutPath of layoutFiles) {
        const layoutFile = zip.file(layoutPath);
        if (!layoutFile)
            continue;
        const layoutXml = await layoutFile.async("text");
        const parsed = xmlParser.parse(layoutXml);
        const bgPr = parsed?.["p:sldLayout"]?.["p:cSld"]?.["p:bg"]?.["p:bgPr"];
        const fileName = layoutPath.split("/").pop();
        const relsPath = `ppt/slideLayouts/_rels/${fileName}.rels`;
        const result = await extractBackgroundFromBgPr(bgPr, zip, relsPath, "ppt/slideLayouts/", maxImageBytes, diagnostics);
        if (result)
            return result;
    }
    /* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
    return undefined;
}
