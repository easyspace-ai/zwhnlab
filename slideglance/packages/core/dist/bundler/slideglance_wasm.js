/* @ts-self-types="./slideglance_wasm.d.ts" */
import * as wasm from "./slideglance_wasm_bg.wasm";
import { __wbg_set_wasm } from "./slideglance_wasm_bg.js";

__wbg_set_wasm(wasm);
wasm.__wbindgen_start();
export {
    PptxDocument, convertPptxToPng, convertPptxToSvg, emuToPixels, init, parsePptxData, svgToPng, version
} from "./slideglance_wasm_bg.js";
