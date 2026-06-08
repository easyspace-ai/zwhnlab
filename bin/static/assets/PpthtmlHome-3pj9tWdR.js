import { j as t } from "./three-BECTMk9d.js";
import { a } from "./monaco-BSfMmt4N.js";
import { u as F, P as R, L as y, A as H, c as A, F as D } from "./main-gNlFrJgr.js";
import { p as w, a as N } from "./routes-ByufEI1K.js";
import { v as O, r as _ } from "./contentUpload-CT7Q5-0I.js";
import "./charts-Cx7lSOSv.js";
function I(l) {
  try {
    return new Date(l).toLocaleDateString("zh-CN", { day: "numeric", month: "short", year: "numeric" });
  } catch {
    return l;
  }
}
const $ = [{ value: "magazine", label: "\u6742\u5FD7\u98CE \xB7 \u7535\u5B50\u58A8\u6C34" }, { value: "swiss", label: "\u745E\u58EB\u56FD\u9645\u4E3B\u4E49" }], k = { magazine: [{ value: "ink", label: "\u58A8\u6C34\u7ECF\u5178" }, { value: "indigo", label: "\u975B\u84DD\u74F7" }, { value: "forest", label: "\u68EE\u6797\u58A8" }, { value: "kraft", label: "\u725B\u76AE\u7EB8" }, { value: "dune", label: "\u6C99\u4E18" }], swiss: [{ value: "ikb", label: "\u514B\u83B1\u56E0\u84DD IKB" }, { value: "lemon", label: "\u67E0\u6AAC\u9EC4" }, { value: "lime", label: "\u67E0\u6AAC\u7EFF" }, { value: "orange", label: "\u5B89\u5168\u6A59" }] };
function q() {
  const l = F(), m = a.useRef(null), [h, P] = a.useState([]), [S, g] = a.useState(true), [o, p] = a.useState(false), [f, n] = a.useState(""), [i, z] = a.useState(""), [b, T] = a.useState(""), [r, C] = a.useState(""), [c, E] = a.useState("magazine"), [d, v] = a.useState("ink"), j = a.useCallback(async () => {
    try {
      g(true);
      const e = await w.listProjects();
      P(e);
    } catch (e) {
      n(e instanceof Error ? e.message : "\u52A0\u8F7D\u5931\u8D25");
    } finally {
      g(false);
    }
  }, []);
  a.useEffect(() => {
    j();
  }, [j]), a.useEffect(() => {
    var _a;
    const e = k[c];
    e.some((s) => s.value === d) || v(((_a = e[0]) == null ? void 0 : _a.value) ?? "ink");
  }, [c, d]);
  const L = async (e) => {
    const s = O(e);
    if (s) {
      n(s);
      return;
    }
    n(""), C(e.name);
    const u = await _(e);
    T(u);
  }, x = b.trim() || i.trim(), M = async () => {
    if (!(!x || o)) {
      p(true), n("");
      try {
        const e = b.trim() || `# ${i.trim()}

\u8BF7\u56F4\u7ED5\u300C${i.trim()}\u300D\u751F\u6210\u4E00\u4EFD 10\u201315 \u9875\u7684\u5206\u4EAB\u578B\u6F14\u793A\u5927\u7EB2\u4E0E\u5185\u5BB9\u3002`, s = r.replace(/\.md$/i, "") || i.trim() || void 0, u = await w.createProject({ name: s, markdown: e, preferences: { style: c, theme: d }, run_pipeline: false });
        l(N(u.project.id), { state: { autoRun: true } });
      } catch (e) {
        n(e instanceof Error ? e.message : "\u521B\u5EFA\u5931\u8D25"), p(false);
      }
    }
  };
  return t.jsxs("div", { className: "min-h-0 h-full overflow-auto bg-[#faf8f6]", children: [t.jsxs("div", { className: "relative overflow-hidden bg-gradient-to-br from-slate-700 via-slate-600 to-zinc-500 px-4 pb-32 pt-16", children: [t.jsxs("div", { className: "mx-auto max-w-3xl text-center", children: [t.jsx("h1", { className: "text-3xl font-semibold tracking-tight text-white", children: "HTML PPT" }), t.jsx("p", { className: "mt-2 text-sm text-white/80", children: "Guizang \u6A2A\u5411\u7FFB\u9875\u7F51\u9875\u6F14\u793A \xB7 \u6742\u5FD7\u98CE / \u745E\u58EB\u98CE \xB7 \u5BFC\u51FA HTML \u4E0E\u56FE\u7247\u578B PPTX" })] }), t.jsxs("div", { className: "mx-auto mt-10 max-w-2xl", children: [t.jsxs("div", { className: "flex items-center gap-2 rounded-full border border-white/20 bg-white/95 px-3 py-2 shadow-lg shadow-black/10 backdrop-blur", children: [t.jsx("button", { type: "button", onClick: () => {
    var _a;
    return (_a = m.current) == null ? void 0 : _a.click();
  }, className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100", title: "\u4E0A\u4F20 .md", children: t.jsx(R, { size: 18 }) }), t.jsx("input", { ref: m, type: "file", accept: ".md,text/markdown", className: "hidden", onChange: (e) => {
    var _a;
    const s = (_a = e.target.files) == null ? void 0 : _a[0];
    s && L(s);
  } }), t.jsx("input", { value: r ? "" : i, onChange: (e) => z(e.target.value), placeholder: r || "\u8F93\u5165\u4E3B\u9898\uFF0C\u6216\u4E0A\u4F20 Markdown\u2026", disabled: !!r, className: "min-w-0 flex-1 bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400 disabled:text-gray-500" }), r && t.jsx("span", { className: "min-w-0 flex-1 truncate text-left text-sm text-gray-800", children: r }), t.jsx("button", { type: "button", disabled: !x || o, onClick: () => void M(), className: A("flex h-9 w-9 items-center justify-center rounded-full transition-colors", x && !o ? "bg-gray-900 text-white hover:bg-gray-700" : "bg-gray-100 text-gray-300"), children: o ? t.jsx(y, { size: 16, className: "animate-spin" }) : t.jsx(H, { size: 16 }) })] }), t.jsxs("div", { className: "mt-4 flex flex-wrap justify-center gap-3 text-xs", children: [t.jsxs("label", { className: "flex items-center gap-1.5 text-white/90", children: ["\u98CE\u683C", t.jsx("select", { value: c, onChange: (e) => E(e.target.value), className: "rounded-md border border-white/30 bg-white/90 px-2 py-1 text-gray-800", children: $.map((e) => t.jsx("option", { value: e.value, children: e.label }, e.value)) })] }), t.jsxs("label", { className: "flex items-center gap-1.5 text-white/90", children: ["\u4E3B\u9898\u8272", t.jsx("select", { value: d, onChange: (e) => v(e.target.value), className: "rounded-md border border-white/30 bg-white/90 px-2 py-1 text-gray-800", children: (k[c] || []).map((e) => t.jsx("option", { value: e.value, children: e.label }, e.value)) })] })] }), f && t.jsx("p", { className: "mt-3 text-center text-sm text-red-200", children: f })] })] }), t.jsxs("div", { className: "relative -mt-20 mx-auto max-w-5xl rounded-t-3xl bg-[#faf8f6] px-4 pb-16 pt-8", children: [t.jsxs("div", { className: "mb-6 flex items-center justify-between", children: [t.jsx("h2", { className: "text-sm font-medium text-gray-800", children: "\u6211\u7684 HTML PPT" }), t.jsxs("button", { type: "button", onClick: () => {
    var _a;
    return (_a = m.current) == null ? void 0 : _a.click();
  }, className: "flex items-center gap-1 text-xs text-gray-500 hover:text-gray-800", children: [t.jsx(D, { size: 14 }), " \u4E0A\u4F20 MD"] })] }), S ? t.jsxs("div", { className: "flex justify-center py-16 text-sm text-gray-400", children: [t.jsx(y, { className: "mr-2 animate-spin", size: 16 }), " \u52A0\u8F7D\u4E2D\u2026"] }) : h.length === 0 ? t.jsx("div", { className: "rounded-2xl border border-dashed border-gray-200 py-16 text-center text-sm text-gray-400", children: "\u6682\u65E0\u9879\u76EE\uFF0C\u8F93\u5165\u4E3B\u9898\u6216\u4E0A\u4F20 Markdown \u5F00\u59CB\u521B\u5EFA" }) : t.jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: h.map((e) => t.jsxs("button", { type: "button", onClick: () => l(N(e.id)), className: "group overflow-hidden rounded-xl border border-gray-200/80 bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md", children: [t.jsx("div", { className: "aspect-[16/10] bg-gradient-to-br from-zinc-800 to-zinc-600 p-4", children: t.jsx("span", { className: "text-lg font-medium text-white line-clamp-2", children: e.name }) }), t.jsxs("div", { className: "px-3 py-2.5", children: [t.jsx("p", { className: "truncate text-sm font-medium text-gray-900", children: e.name }), t.jsxs("p", { className: "text-xs text-gray-400", children: ["Edited ", I(e.updated_at)] })] })] }, e.id)) })] })] });
}
export {
  q as default
};
