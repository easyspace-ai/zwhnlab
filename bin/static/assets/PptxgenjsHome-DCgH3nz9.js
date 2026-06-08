import { j as e } from "./three-BECTMk9d.js";
import { a as s } from "./monaco-BSfMmt4N.js";
import { u as z, P as F, L as b, A as R, c as A, F as M } from "./main-gNlFrJgr.js";
import { p as y, T as D } from "./themePresets-Bm4AFvWW.js";
import { p as v } from "./routes-UgFNxPGD.js";
import { v as G, r as J } from "./contentUpload-CT7Q5-0I.js";
import "./charts-Cx7lSOSv.js";
function L(n) {
  try {
    return new Date(n).toLocaleDateString("zh-CN", { day: "numeric", month: "short", year: "numeric" });
  } catch {
    return n;
  }
}
function q() {
  const n = z(), o = s.useRef(null), [m, w] = s.useState([]), [N, u] = s.useState(true), [c, h] = s.useState(false), [p, i] = s.useState(""), [l, P] = s.useState(""), [g, k] = s.useState(""), [r, S] = s.useState(""), [f, C] = s.useState("midnight-exec"), j = s.useCallback(async () => {
    try {
      u(true);
      const t = await y.listProjects();
      w(t);
    } catch (t) {
      i(t instanceof Error ? t.message : "\u52A0\u8F7D\u5931\u8D25");
    } finally {
      u(false);
    }
  }, []);
  s.useEffect(() => {
    j();
  }, [j]);
  const E = async (t) => {
    const a = G(t);
    if (a) {
      i(a);
      return;
    }
    i(""), S(t.name);
    const x = await J(t);
    k(x);
  }, d = g.trim() || l.trim(), T = async () => {
    if (!(!d || c)) {
      h(true), i("");
      try {
        const t = g.trim() || `# ${l.trim()}

\u8BF7\u56F4\u7ED5\u300C${l.trim()}\u300D\u751F\u6210\u4E00\u4EFD 10\u201315 \u9875\u7684\u53EF\u7F16\u8F91\u6F14\u793A\u5927\u7EB2\u4E0E\u5185\u5BB9\u3002`, a = r.replace(/\.md$/i, "") || l.trim() || void 0, x = await y.createProject({ name: a, markdown: t, preferences: { theme: f }, run_pipeline: false });
        n(v(x.project.id), { state: { autoRun: true } });
      } catch (t) {
        i(t instanceof Error ? t.message : "\u521B\u5EFA\u5931\u8D25"), h(false);
      }
    }
  };
  return e.jsxs("div", { className: "min-h-0 h-full overflow-auto bg-[#faf8f6]", children: [e.jsxs("div", { className: "relative overflow-hidden bg-gradient-to-br from-indigo-700 via-blue-600 to-cyan-600 px-4 pb-32 pt-16", children: [e.jsxs("div", { className: "mx-auto max-w-3xl text-center", children: [e.jsx("h1", { className: "text-3xl font-semibold tracking-tight text-white", children: "PptxGenJS PPT" }), e.jsx("p", { className: "mt-2 text-sm text-white/85", children: "AI \u751F\u6210 Slide Schema \xB7 \u6D4F\u89C8\u5668\u7AEF PptxGenJS \u5BFC\u51FA\u53EF\u7F16\u8F91 PowerPoint" })] }), e.jsxs("div", { className: "mx-auto mt-10 max-w-2xl", children: [e.jsxs("div", { className: "flex items-center gap-2 rounded-full border border-white/20 bg-white/95 px-3 py-2 shadow-lg shadow-black/10 backdrop-blur", children: [e.jsx("button", { type: "button", onClick: () => {
    var _a;
    return (_a = o.current) == null ? void 0 : _a.click();
  }, className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100", title: "\u4E0A\u4F20 .md", children: e.jsx(F, { size: 18 }) }), e.jsx("input", { ref: o, type: "file", accept: ".md,text/markdown", className: "hidden", onChange: (t) => {
    var _a;
    const a = (_a = t.target.files) == null ? void 0 : _a[0];
    a && E(a);
  } }), e.jsx("input", { value: r ? "" : l, onChange: (t) => P(t.target.value), placeholder: r || "\u8F93\u5165\u4E3B\u9898\uFF0C\u6216\u4E0A\u4F20 Markdown\u2026", disabled: !!r, className: "min-w-0 flex-1 bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400 disabled:text-gray-500" }), r && e.jsx("span", { className: "min-w-0 flex-1 truncate text-left text-sm text-gray-800", children: r }), e.jsx("button", { type: "button", disabled: !d || c, onClick: () => void T(), className: A("flex h-9 w-9 items-center justify-center rounded-full transition-colors", d && !c ? "bg-gray-900 text-white hover:bg-gray-700" : "bg-gray-100 text-gray-300"), children: c ? e.jsx(b, { size: 16, className: "animate-spin" }) : e.jsx(R, { size: 16 }) })] }), e.jsx("div", { className: "mt-4 flex flex-wrap justify-center gap-3 text-xs", children: e.jsxs("label", { className: "flex items-center gap-1.5 text-white/90", children: ["\u4E3B\u9898", e.jsx("select", { value: f, onChange: (t) => C(t.target.value), className: "rounded-md border border-white/30 bg-white/90 px-2 py-1 text-gray-800", children: D.map((t) => e.jsx("option", { value: t.value, children: t.label }, t.value)) })] }) }), p && e.jsx("p", { className: "mt-3 text-center text-sm text-red-200", children: p })] })] }), e.jsxs("div", { className: "relative -mt-20 mx-auto max-w-5xl rounded-t-3xl bg-[#faf8f6] px-4 pb-16 pt-8", children: [e.jsxs("div", { className: "mb-6 flex items-center justify-between", children: [e.jsx("h2", { className: "text-sm font-medium text-gray-800", children: "\u6211\u7684 PptxGenJS \u9879\u76EE" }), e.jsxs("button", { type: "button", onClick: () => {
    var _a;
    return (_a = o.current) == null ? void 0 : _a.click();
  }, className: "flex items-center gap-1 text-xs text-gray-500 hover:text-gray-800", children: [e.jsx(M, { size: 14 }), " \u4E0A\u4F20 MD"] })] }), N ? e.jsxs("div", { className: "flex justify-center py-16 text-sm text-gray-400", children: [e.jsx(b, { className: "mr-2 animate-spin", size: 16 }), " \u52A0\u8F7D\u4E2D\u2026"] }) : m.length === 0 ? e.jsx("div", { className: "rounded-2xl border border-dashed border-gray-200 py-16 text-center text-sm text-gray-400", children: "\u6682\u65E0\u9879\u76EE\uFF0C\u8F93\u5165\u4E3B\u9898\u6216\u4E0A\u4F20 Markdown \u5F00\u59CB\u521B\u5EFA" }) : e.jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: m.map((t) => e.jsxs("button", { type: "button", onClick: () => n(v(t.id)), className: "group overflow-hidden rounded-xl border border-gray-200/80 bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md", children: [e.jsxs("div", { className: "aspect-[16/10] bg-gradient-to-br from-indigo-800 to-blue-700 p-4", children: [e.jsx("span", { className: "text-lg font-medium text-white line-clamp-2", children: t.name }), e.jsx("span", { className: "mt-2 inline-block rounded-full bg-white/15 px-2 py-0.5 text-[10px] text-white/90", children: "PptxGenJS" })] }), e.jsxs("div", { className: "px-3 py-2.5", children: [e.jsx("p", { className: "truncate text-sm font-medium text-gray-900", children: t.name }), e.jsxs("p", { className: "text-xs text-gray-400", children: ["Edited ", L(t.updated_at)] })] })] }, t.id)) })] })] });
}
export {
  q as default
};
