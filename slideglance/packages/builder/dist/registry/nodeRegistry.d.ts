import type { BuilderNode } from "../types.ts";
import type { NodeDefinition } from "./types.ts";
type NodeType = BuilderNode["type"];
export declare function registerNode(def: NodeDefinition): void;
export declare function getNodeDef(type: NodeType): NodeDefinition;
export {};
//# sourceMappingURL=nodeRegistry.d.ts.map