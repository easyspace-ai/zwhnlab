/**
 * Module-scoped parse context.
 *
 * The whole parse pipeline is synchronous, so a simple mutable variable
 * suffices — it avoids threading a context object through every converter.
 * Set at the start of parseBuilderDocument and cleared in its finally block.
 */
let CURRENT_SOURCE_MAP = null;
let NEXT_NODE_ID = 0;
let CURRENT_DIAGNOSTICS = null;
export function beginParseContext(sourceMap, diagnostics) {
    CURRENT_SOURCE_MAP = sourceMap;
    CURRENT_DIAGNOSTICS = diagnostics;
    NEXT_NODE_ID = 0;
}
export function endParseContext() {
    CURRENT_SOURCE_MAP = null;
    CURRENT_DIAGNOSTICS = null;
}
export function getCurrentSourceMap() {
    return CURRENT_SOURCE_MAP;
}
export function getCurrentDiagnostics() {
    return CURRENT_DIAGNOSTICS;
}
export function allocateNextPomId() {
    return ++NEXT_NODE_ID;
}
