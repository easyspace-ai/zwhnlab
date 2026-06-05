const registry = new Map();
export function registerNode(def) {
    if (registry.has(def.type)) {
        throw new Error(`Duplicate node registration: ${def.type}`);
    }
    registry.set(def.type, def);
}
export function getNodeDef(type) {
    const def = registry.get(type);
    if (!def)
        throw new Error(`Unknown node type: ${type}`);
    return def;
}
