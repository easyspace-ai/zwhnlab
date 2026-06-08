import { j as e } from "./three-BECTMk9d.js";
import { L as m, C as x, z as d, c as u } from "./main-gNlFrJgr.js";
const p = { ingest: "\u89E3\u6790\u6587\u6863", comprehend: "\u7406\u89E3\u5185\u5BB9", outline: "\u7EC4\u7EC7\u5927\u7EB2", design: "\u6392\u7248\u8BBE\u8BA1", generate: "\u751F\u6210\u6F14\u793A", done: "\u5B8C\u6210", error: "\u51FA\u9519" };
function h(s, r = 2400) {
  return s.length <= r ? s : `\u2026${s.slice(-r)}`;
}
function f({ stage: s, stageMsg: r, partialByStage: i, expanded: t, onToggleExpanded: o, compact: a = false }) {
  const l = i[s] || "", n = l.length, c = p[s] || s;
  return e.jsxs("div", { className: u("rounded-lg border border-blue-100 bg-blue-50/80 text-blue-900", a ? "px-3 py-2 text-xs" : "px-3 py-2.5 text-sm"), children: [e.jsxs("div", { className: "flex items-start gap-2", children: [e.jsx(m, { className: "mt-0.5 shrink-0 animate-spin", size: a ? 12 : 14 }), e.jsxs("div", { className: "min-w-0 flex-1", children: [e.jsx("p", { className: "font-medium", children: c }), (r || n > 0) && e.jsxs("p", { className: "mt-0.5 text-blue-700/80", children: [r, n > 0 && e.jsxs("span", { className: "ml-1 tabular-nums text-blue-600/70", children: ["\xB7 ", n.toLocaleString(), " \u5B57"] })] })] })] }), l && e.jsxs("div", { className: "mt-2", children: [e.jsxs("button", { type: "button", onClick: o, className: "flex items-center gap-1 text-[11px] text-blue-700/90 hover:text-blue-900", children: [t ? e.jsx(x, { size: 12 }) : e.jsx(d, { size: 12 }), t ? "\u6536\u8D77\u5B9E\u65F6\u8F93\u51FA" : "\u5C55\u5F00\u5B9E\u65F6\u8F93\u51FA"] }), t && e.jsx("pre", { className: "mt-1.5 max-h-48 overflow-auto rounded-md border border-blue-100 bg-white/70 p-2 font-mono text-[10px] leading-relaxed text-gray-700 whitespace-pre-wrap break-all", children: h(l) })] })] });
}
export {
  f as P,
  p as S
};
