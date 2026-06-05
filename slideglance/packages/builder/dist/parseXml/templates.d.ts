import type { Diagnostic } from "../diagnostics.ts";
type XmlTextNode = {
    "#text": string;
};
type XmlElement = {
    [tagName: string]: XmlNode[] | Record<string, string> | undefined;
    ":@"?: Record<string, string>;
};
type XmlNode = XmlElement | XmlTextNode;
export declare const DEFAULT_MAX_TEMPLATE_NODES = 100000;
interface TemplateDefinition {
    name: string;
    body: XmlNode[];
}
type TemplateRegistry = Map<string, TemplateDefinition>;
/**
 * Collect <Templates>/<Template> definitions from the SlideGlance children and
 * return both the registry and the children with <Templates> blocks removed.
 */
export declare function collectTemplates(rootChildren: XmlElement[], errors: string[]): {
    registry: TemplateRegistry;
    remaining: XmlElement[];
};
export declare function expandTemplatesInNodes(nodes: XmlNode[], registry: TemplateRegistry, errors: string[], depth?: number, counter?: {
    count: number;
}, maxNodes?: number, diagnostics?: Diagnostic[]): XmlNode[];
export {};
//# sourceMappingURL=templates.d.ts.map