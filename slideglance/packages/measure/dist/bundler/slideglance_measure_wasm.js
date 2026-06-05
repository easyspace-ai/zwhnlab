/* @ts-self-types="./slideglance_measure_wasm.d.ts" */
import * as wasm from "./slideglance_measure_wasm_bg.wasm";
import { __wbg_set_wasm } from "./slideglance_measure_wasm_bg.js";

__wbg_set_wasm(wasm);

export {
    TextMeasurer, version
} from "./slideglance_measure_wasm_bg.js";
