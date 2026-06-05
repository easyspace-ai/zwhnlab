import { autoFitSlide } from "./autoFit/autoFit.js";
import { createBuildContext } from "./buildContext.js";
import { calcYogaLayout } from "./calcYogaLayout/calcYogaLayout.js";
import { lintDeck } from "./lint/index.js";
import { extractLayoutResults } from "./calcYogaLayout/types.js";
import { DiagnosticsError } from "./diagnostics.js";
import { parseMasterPptx } from "./parseMasterPptx.js";
import { parseBuilderDocument, } from "./parseXml/parseXml.js";
import { validateImageSrc } from "./renderPptx/nodes/image.js";
import { renderPptx } from "./renderPptx/renderPptx.js";
import { wrapPptxWriteWithConnectors } from "./renderPptx/postProcess/wrapWrite.js";
import { freeYogaTree } from "./shared/freeYogaTree.js";
import { toPositioned } from "./toPositioned/toPositioned.js";
import { mergeDefaultTextStyles } from "./defaultTextStyle.js";
const DEFAULT_MASTER_NAME = "SLIDEGLANCE_MASTER";
function normalizeMasters(masters) {
    if (!masters || masters.length === 0)
        return undefined;
    return masters.map((master, index) => ({
        ...master,
        title: master.title ??
            (masters.length === 1
                ? DEFAULT_MASTER_NAME
                : `${DEFAULT_MASTER_NAME}_${index + 1}`),
    }));
}
async function positionNode(node, slideSize, autoFitEnabled, ctx) {
    let map;
    try {
        if (autoFitEnabled) {
            map = await autoFitSlide(node, slideSize, ctx);
        }
        else {
            map = await calcYogaLayout(node, slideSize, ctx);
        }
        const layoutMap = extractLayoutResults(map);
        return await toPositioned(node, ctx, layoutMap);
    }
    finally {
        if (map)
            freeYogaTree(map);
    }
}
function mergeMasterBackground(masters, availableMasterNames, defaultMaster, background) {
    if (!masters || masters.length === 0) {
        return [
            {
                title: defaultMaster ?? availableMasterNames[0] ?? DEFAULT_MASTER_NAME,
                background,
            },
        ];
    }
    const targetTitle = defaultMaster ?? masters[0]?.title;
    if (!targetTitle)
        return masters;
    return masters.map((master) => master.title === targetTitle && !master.background
        ? { ...master, background }
        : master);
}
/**
 * Validates <Master backgroundPath> entries against the imageSrcGuard policy.
 * Clears disallowed background paths (emits INVALID_IMAGE_SRC diagnostics).
 */
function applyImageSrcGuardToMasters(masters, guard, diagnostics) {
    if (!masters)
        return masters;
    return masters.map((master) => {
        const bg = master.background;
        if (bg && "path" in bg && typeof bg.path === "string") {
            const validated = validateImageSrc(bg.path, guard, diagnostics);
            if (validated === undefined) {
                return { ...master, background: undefined };
            }
        }
        return master;
    });
}
function validateMasterReferences(pages, masters, masterContents, defaultMaster) {
    const duplicateTitles = new Set();
    const titleSet = new Set();
    const masterTitles = (masters ?? [])
        .map((master) => master.title)
        .filter((title) => typeof title === "string");
    for (const title of masterTitles) {
        if (titleSet.has(title))
            duplicateTitles.add(title);
        titleSet.add(title);
    }
    for (const title of Object.keys(masterContents ?? {})) {
        titleSet.add(title);
    }
    if (titleSet.size === 0) {
        const refs = [
            ...(defaultMaster ? [defaultMaster] : []),
            ...pages
                .map((page) => page.master)
                .filter((name) => typeof name === "string"),
        ];
        if (refs.length > 0) {
            throw new Error(`Unknown slide master reference: "${refs[0]}". No masters are defined.`);
        }
        return;
    }
    for (const title of duplicateTitles) {
        throw new Error(`Duplicate slide master title: "${title}"`);
    }
    if (defaultMaster && !titleSet.has(defaultMaster)) {
        throw new Error(`Unknown default slide master: "${defaultMaster}"`);
    }
    for (const page of pages) {
        if (page.master && !titleSet.has(page.master)) {
            throw new Error(`Unknown slide master reference: "${page.master}"`);
        }
    }
}
export async function buildPptx(xml, slideSize, options) {
    // Capture the root document plus every successfully resolved import
    // so the parse-phase lint pass (RAW_LT_GT_IN_ATTR etc.) sees the
    // original characters before fast-xml-parser quietly normalises
    // them. Only collect when lint is actually enabled — the resolver
    // wrap is otherwise an unnecessary allocation per import call.
    const lintEnabled = options?.lint?.enabled === true;
    const rawXmlSources = lintEnabled
        ? [
            {
                content: xml,
                ...(options?.sourcePath ? { path: options.sourcePath } : {}),
            },
        ]
        : [];
    const originalResolveImport = options?.resolveImport;
    const wrappedResolveImport = lintEnabled && originalResolveImport
        ? (src, fromPath) => {
            const resolved = originalResolveImport(src, fromPath);
            rawXmlSources.push({
                content: resolved.content,
                path: resolved.path,
            });
            return resolved;
        }
        : originalResolveImport;
    const parseResult = parseBuilderDocument(xml, {
        resolveImport: wrappedResolveImport,
        sourcePath: options?.sourcePath,
        trackSourcePos: options?.trackSourcePos,
        maxTemplateNodes: options?.maxTemplateNodes,
        equalize: options?.equalize,
    });
    const document = parseResult.document;
    const ctx = createBuildContext({
        textMeasurementMode: options?.textMeasurement ?? "auto",
        defaultTextStyle: mergeDefaultTextStyles(document.defaultTextStyle, options?.defaultTextStyle),
        allowedHrefSchemes: options?.allowedHrefSchemes,
        imageSrcGuard: options?.imageSrcGuard,
        defaultLang: options?.defaultLang,
        fonts: options?.fonts,
    });
    // T11.5: surface non-fatal parse-time diagnostics through the same
    // collector that gathers render-time diagnostics, so the final
    // BuildPptxResult exposes them via .diagnostics in arrival order.
    ctx.diagnostics.addAll(parseResult.diagnostics);
    const resolvedSlideSize = document.slideSize ?? slideSize;
    const nodes = document.nodes;
    const baseMasters = options?.masters ??
        document.masters ??
        (options?.master ? [options.master] : undefined);
    let masters = normalizeMasters(baseMasters);
    // T37: apply imageSrcGuard to <Master backgroundPath> entries if guard is active
    if (options?.imageSrcGuard && masters) {
        masters = applyImageSrcGuardToMasters(masters, options.imageSrcGuard, ctx.diagnostics);
    }
    const masterContentNodes = document.masterContents;
    let defaultMaster = options?.defaultMaster ??
        document.defaultMaster ??
        (masters && masters.length > 0 ? masters[0]?.title : undefined);
    const normalizedMasterTitles = (masters ?? [])
        .map((master) => master.title)
        .filter((title) => typeof title === "string");
    const positionedPages = [];
    const positionedMasterContents = {};
    const availableMasterNames = [
        ...normalizedMasterTitles,
        ...Object.keys(masterContentNodes ?? {}),
    ];
    for (const node of nodes) {
        const positioned = await positionNode(node, resolvedSlideSize, options?.autoFit !== false, ctx);
        positionedPages.push(positioned);
    }
    if (masterContentNodes) {
        for (const [masterName, contentNodes] of Object.entries(masterContentNodes)) {
            positionedMasterContents[masterName] = [];
            for (const node of contentNodes) {
                const positioned = await positionNode(node, resolvedSlideSize, options?.autoFit !== false, ctx);
                positionedMasterContents[masterName].push(positioned);
            }
        }
    }
    // Extract background from masterPptx and merge into master settings
    if (options?.masterPptx) {
        try {
            const bg = await parseMasterPptx(options.masterPptx, {
                limits: options.masterPptxLimits,
                diagnostics: ctx.diagnostics,
            });
            if (bg) {
                masters = mergeMasterBackground(masters, availableMasterNames, defaultMaster, bg);
                defaultMaster ??= masters[0]?.title;
            }
        }
        catch (e) {
            const message = e instanceof Error ? e.message : "Unknown error parsing masterPptx";
            ctx.diagnostics.add("MASTER_PPTX_PARSE_FAILED", message);
        }
    }
    validateMasterReferences(positionedPages, masters, Object.keys(positionedMasterContents).length > 0
        ? positionedMasterContents
        : undefined, defaultMaster);
    // Post-layout lint pass. Runs over every positioned slide tree and
    // merges its findings into the same diagnostic stream the renderer
    // and parser write into — so callers get one unified list.
    let lintReport;
    if (options?.lint?.enabled) {
        const { diagnostics: lintDiags, report } = lintDeck(positionedPages.map((root) => ({ root, slideSize: resolvedSlideSize })), options.lint, {
            declaredStyles: document.declaredStyles,
            referencedStyles: document.referencedStyles,
            declaredTemplates: document.declaredTemplates,
            referencedTemplates: document.referencedTemplates,
            measurer: ctx.measurer,
            rawXmlSources,
        });
        for (const d of lintDiags)
            ctx.diagnostics.addLint(d);
        lintReport = report;
    }
    const pptx = await renderPptx(positionedPages, resolvedSlideSize, ctx, masters, defaultMaster, Object.keys(positionedMasterContents).length > 0
        ? positionedMasterContents
        : undefined, options?.docProps);
    // Install the connector post-process pass over pptx.write / pptx.writeFile.
    // The wrapped write rewrites placeholder lines into real <p:cxnSp>
    // elements with stCxn / endCxn bindings before user-visible bytes leave
    // the builder. Strict mode still snapshots diagnostics at this point —
    // any CONNECTOR_UNKNOWN_SHAPE_IDX records that surface during write
    // join the BuildPptxResult.diagnostics list but do not retro-trigger
    // strict-throw.
    wrapPptxWriteWithConnectors(pptx, ctx.diagnostics);
    const diagnostics = ctx.diagnostics.items;
    if (options?.strict && diagnostics.length > 0) {
        throw new DiagnosticsError(diagnostics);
    }
    return {
        pptx,
        diagnostics,
        ...(document.sourceMap ? { sourceMap: document.sourceMap } : {}),
        ...(lintReport ? { lintReport } : {}),
    };
}
