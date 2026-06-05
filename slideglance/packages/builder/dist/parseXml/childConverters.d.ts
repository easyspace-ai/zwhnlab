/**
 * Per-node child element converters.
 *
 * Each converter walks the children of a leaf node tag (Chart, Table, ...)
 * and projects them into the structured BuilderNode shape (`data`, `rows`,
 * `items`, ...). Converters mutate `result` in place and append errors to
 * `errors`.
 */
import { type StyleRegistry } from "./styles.ts";
import { type XmlElement } from "./xml.ts";
type ChildElementConverter = (childElements: XmlElement[], result: Record<string, unknown>, errors: string[], node?: XmlElement, styles?: StyleRegistry) => void;
export declare const CHILD_ELEMENT_CONVERTERS: Record<string, ChildElementConverter>;
export {};
//# sourceMappingURL=childConverters.d.ts.map