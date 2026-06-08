import { j as e } from "./three-BECTMk9d.js";
import { a } from "./monaco-BSfMmt4N.js";
import { c as K, u as Se, a as Ce, P as Pe, L as B, A as ke, F as Ae, D as Te, b as _e, d as De, e as Ee, f as ze, B as de, g as Oe, h as Me, i as Re, j as Le, k as $e, l as Ie, m as Fe, n as Ge, E as He, o as Je, T as We } from "./main-gNlFrJgr.js";
import { p as q, T as Ve } from "./themePresets-Bm4AFvWW.js";
import { o as A, P as Be, s as R } from "./routes-fYh3HC7W.js";
import { P as Ue, c as T, t as Xe, O as U, a as X, s as Ye, v as qe, r as Ke, d as Qe, p as Y, b as Ze, e as et, f as tt, g as st } from "./contentUpload-CT7Q5-0I.js";
import "./charts-Cx7lSOSv.js";
function at({ value: s, onChange: u, min: l = 4, max: c = 50, presets: d = Ue, className: y, disabled: h }) {
  const g = T(s, l, c), x = d.filter((o) => o >= l && o <= c), f = x.some((o) => o === g) ? String(g) : "custom";
  return e.jsxs("label", { className: K("flex flex-wrap items-center gap-1.5 text-gray-700", y), children: [e.jsx("span", { children: "\u9875\u6570" }), e.jsxs("select", { value: f, disabled: h, onChange: (o) => {
    const C = o.target.value;
    C !== "custom" && u(Number(C));
  }, className: "rounded-md border border-white/50 bg-white/80 px-2 py-1", "aria-label": "\u9875\u6570\u9884\u8BBE", children: [x.map((o) => e.jsxs("option", { value: o, children: [o, " \u9875"] }, o)), e.jsx("option", { value: "custom", children: "\u81EA\u5B9A\u4E49" })] }), e.jsx("input", { type: "number", min: l, max: c, value: g, disabled: h, onChange: (o) => u(T(Number(o.target.value), l, c)), className: "w-16 rounded-md border border-white/50 bg-white/80 px-2 py-1 text-center tabular-nums", "aria-label": "\u81EA\u5B9A\u4E49\u9875\u6570" })] });
}
function nt(s, u) {
  const l = u.trim();
  if (!l.startsWith("{") && !l.startsWith("[")) return false;
  const c = Xe(l);
  return c && ue(c) ? false : s.toLowerCase().trim().endsWith(".json") || !c ? true : !ue(c);
}
function ue(s) {
  var _a, _b;
  return !((_a = s.slides) == null ? void 0 : _a.length) || !((_b = s.document_title) == null ? void 0 : _b.trim()) ? false : s.slides.filter((l) => {
    var _a2;
    return (_a2 = l.page_type) == null ? void 0 : _a2.trim();
  }).length >= Math.ceil(s.slides.length / 2);
}
async function rt(s) {
  const u = typeof s == "string" ? s : JSON.stringify(s ?? {}, null, 0), l = await q.normalizeProductSchema({ raw: u });
  return { schema: l.schema, warnings: l.warnings, skipped: l.skipped };
}
function L(s) {
  if (!s) return "";
  try {
    return new Date(s * 1e3).toLocaleDateString("zh-CN", { day: "numeric", month: "short", year: "numeric" });
  } catch {
    return "";
  }
}
function lt(s) {
  return s.styleLabel ? s.styleCategory ? `${s.styleLabel} \xB7 ${s.styleCategory}` : s.styleLabel : s.styleId || null;
}
function me({ item: s, onOpen: u, onRename: l, onDelete: c }) {
  if (s.kind === "pptxgenjs") return e.jsxs("button", { type: "button", onClick: u, className: "group overflow-hidden rounded-xl border border-gray-200/80 bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md", children: [e.jsxs("div", { className: "aspect-[16/10] bg-gradient-to-br from-indigo-800 to-blue-700 p-4", children: [e.jsx("span", { className: "text-lg font-medium text-white line-clamp-2", children: s.title }), e.jsx("span", { className: "mt-2 inline-block rounded-full bg-white/15 px-2 py-0.5 text-[10px] text-white/90", children: "PptxGenJS" })] }), e.jsxs("div", { className: "px-3 py-2.5", children: [e.jsx("p", { className: "truncate text-sm font-medium text-gray-900", children: s.title }), e.jsx("p", { className: "mt-0.5 text-xs text-gray-400", children: L(s.updatedAt) ? `\u7F16\u8F91\u4E8E ${L(s.updatedAt)}` : "" })] })] });
  const d = s.session, [y, h] = a.useState(false), g = lt(d);
  return e.jsxs("div", { className: "group relative overflow-hidden rounded-xl border border-gray-200/80 bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md", children: [e.jsxs("button", { type: "button", onClick: u, className: "block w-full text-left", children: [e.jsxs("div", { className: "aspect-[16/10] bg-gradient-to-br from-violet-800 to-fuchsia-700 p-4", children: [e.jsx("span", { className: "text-lg font-medium text-white line-clamp-2", children: d.title || "\u672A\u547D\u540D" }), g && e.jsx("span", { className: "mt-2 inline-block max-w-full truncate rounded-full bg-white/15 px-2 py-0.5 text-[11px] text-white/90", children: g })] }), e.jsxs("div", { className: "px-3 py-2.5", children: [e.jsx("p", { className: "truncate text-sm font-medium text-gray-900", children: d.title || d.id }), e.jsxs("p", { className: "mt-0.5 text-xs text-gray-400", children: [d.pageCount ? `${d.pageCount} \u9875` : "0 \u9875", L(d.updatedAt) ? ` \xB7 ${L(d.updatedAt)}` : ""] }), g && e.jsxs("p", { className: "mt-1 truncate text-[11px] text-violet-600/80", children: ["\u6A21\u677F\uFF1A", g] })] })] }), e.jsxs("div", { className: "absolute right-2 top-2", children: [e.jsx("button", { type: "button", onClick: (x) => {
    x.stopPropagation(), h((f) => !f);
  }, className: K("rounded-lg bg-black/20 p-1.5 text-white/90 backdrop-blur transition hover:bg-black/30", y ? "opacity-100" : "opacity-0 group-hover:opacity-100"), "aria-label": "\u66F4\u591A\u64CD\u4F5C", children: e.jsx(He, { size: 14 }) }), y && e.jsxs(e.Fragment, { children: [e.jsx("button", { type: "button", className: "fixed inset-0 z-10 cursor-default", "aria-label": "\u5173\u95ED\u83DC\u5355", onClick: () => h(false) }), e.jsxs("div", { className: "absolute right-0 top-full z-20 mt-1 min-w-[120px] rounded-xl border border-gray-100 bg-white py-1 shadow-xl", children: [e.jsxs("button", { type: "button", onClick: (x) => {
    x.stopPropagation(), h(false), l();
  }, className: "flex w-full items-center gap-2 px-3 py-2 text-xs text-gray-700 hover:bg-gray-50", children: [e.jsx(Je, { size: 12 }), " \u91CD\u547D\u540D"] }), e.jsxs("button", { type: "button", onClick: (x) => {
    x.stopPropagation(), h(false), c();
  }, className: "flex w-full items-center gap-2 px-3 py-2 text-xs text-red-600 hover:bg-red-50", children: [e.jsx(We, { size: 12 }), " \u5220\u9664"] })] })] })] })] });
}
function pt() {
  const s = Se(), u = Ce(), l = a.useRef(null), [c, d] = a.useState([]), [y, h] = a.useState(""), [g, x] = a.useState(true), [f, o] = a.useState(false), [C, p] = a.useState(""), [_, D] = a.useState(""), [w, $] = a.useState(""), [E, xe] = a.useState(""), [I, Q] = a.useState(8), [F, Z] = a.useState(true), [j, z] = a.useState(null), [N, ee] = a.useState(false), [te, se] = a.useState([]), [ae, G] = a.useState(false), [v, pe] = a.useState("pptxgenjs"), [ne, he] = a.useState("midnight-exec"), [re, ge] = a.useState([]), [H, P] = a.useState(null), [J, W] = a.useState(""), [le, ie] = a.useState(false), [k, V] = a.useState(null), [fe, oe] = a.useState(false), O = a.useCallback(async () => {
    try {
      x(true);
      const [t, i, n] = await Promise.all([A.listSessions(), A.listStyles(), q.listProjects().catch(() => [])]);
      d(i), !y && i.length > 0 && h(i[0].id);
      const m = [...t.map((r) => ({ kind: "ohmyppt", session: r })), ...n.map((r) => ({ kind: "pptxgenjs", id: r.id, title: r.name || r.id, updatedAt: Math.floor(new Date(r.updated_at).getTime() / 1e3) || 0 }))];
      m.sort((r, b) => {
        const S = r.kind === "ohmyppt" ? r.session.updatedAt || 0 : r.updatedAt;
        return (b.kind === "ohmyppt" ? b.session.updatedAt || 0 : b.updatedAt) - S;
      }), ge(m);
    } catch (t) {
      p(t instanceof Error ? t.message : "\u52A0\u8F7D\u5931\u8D25");
    } finally {
      x(false);
    }
  }, [y]);
  a.useEffect(() => {
    O();
  }, [O, u.pathname]);
  const M = (t, i) => {
    if (!F) return;
    const n = Ye(t, (i == null ? void 0 : i.slides.length) ?? (i == null ? void 0 : i.total_pages));
    Q(v === "ohmyppt" ? T(n, X, U) : n);
  }, ye = async (t) => {
    var _a;
    const i = qe(t);
    if (i) {
      p(i);
      return;
    }
    p(""), se([]), G(false), xe(t.name);
    const n = await Ke(t), m = Qe(n, t.name);
    if (nt(t.name, n)) {
      ee(true), z(null), $("");
      try {
        const { schema: r, warnings: b, skipped: S } = await rt(n);
        z(r), se(b ?? []), D(Y(r).slice(0, 120)), M(n, r), S || G(true);
      } catch (r) {
        z(null), p(r instanceof Error ? r.message : "Schema \u6807\u51C6\u5316\u5931\u8D25");
      } finally {
        ee(false);
      }
      return;
    }
    if (z(m.productSchema), m.productSchema) $(""), D(Y(m.productSchema).slice(0, 120)), M(n, m.productSchema);
    else {
      $(n);
      const r = ((_a = n.split(`
`).find((b) => b.trim())) == null ? void 0 : _a.replace(/^#+\s*/, "")) || "";
      r && D(r.slice(0, 120)), M(n, null);
    }
  }, je = async () => {
    if (N) return;
    const t = _.trim() || E.replace(/\.(md|json)$/i, "");
    if (!(!(j || w.trim() || t) || f)) {
      o(true), p("");
      try {
        const n = j, m = v === "ohmyppt" ? T(I, X, U) : T(I, Ze, et);
        if (v === "pptxgenjs") {
          const ce = `# ${t}

\u8BF7\u56F4\u7ED5\u300C${t}\u300D\u751F\u6210\u4E00\u4EFD ${m} \u9875\u7684\u53EF\u7F16\u8F91\u6F14\u793A\u5927\u7EB2\u4E0E\u5185\u5BB9\u3002`, we = n ? tt(n) : w.trim() || ce, Ne = await q.createProject({ name: E.replace(/\.(md|json)$/i, "") || t || void 0, markdown: we, preferences: { theme: ne, target_slide_count: String(m), page_count_mode: F ? "auto" : "manual" }, run_pipeline: false });
          s(R(Ne.project.id, "pptxgenjs"), { state: { autoRun: true } });
          return;
        }
        const r = n ? st(n, m) : w.trim() || void 0, S = (await A.createSession({ topic: n ? Y(n) : t, style_id: y || void 0, page_count: m, locale: "zh", user_message: r })).session.id;
        if (!S) throw new Error("\u521B\u5EFA\u4F1A\u8BDD\u5931\u8D25");
        s(R(S, "ohmyppt"), { state: { autoRun: true } });
      } catch (n) {
        p(n instanceof Error ? n.message : "\u521B\u5EFA\u5931\u8D25"), o(false);
      }
    }
  }, be = async () => {
    if (!H) return;
    const t = J.trim();
    if (!t) {
      p("\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A");
      return;
    }
    ie(true), p("");
    try {
      await A.updateSessionTitle(H.id, t), P(null), W(""), await O();
    } catch (i) {
      p(i instanceof Error ? i.message : "\u91CD\u547D\u540D\u5931\u8D25");
    } finally {
      ie(false);
    }
  }, ve = async () => {
    if (k) {
      oe(true), p("");
      try {
        await A.deleteSession(k.id), V(null), await O();
      } catch (t) {
        p(t instanceof Error ? t.message : "\u5220\u9664\u5931\u8D25");
      } finally {
        oe(false);
      }
    }
  };
  return e.jsxs("div", { className: "min-h-0 h-full overflow-auto bg-[#faf8f6]", children: [e.jsxs("div", { className: "relative overflow-hidden bg-gradient-to-br from-violet-300 via-fuchsia-200 to-orange-200 px-4 pb-32 pt-16", children: [e.jsxs("div", { className: "mx-auto max-w-3xl text-center", children: [e.jsx("h1", { className: "text-3xl font-semibold tracking-tight text-gray-900", children: "AI \u5E7B\u706F\u7247" }), e.jsx("p", { className: "mt-2 text-sm text-gray-700/80", children: "\u8F93\u5165\u4E3B\u9898\u6216\u4E0A\u4F20 Markdown / \u4EA7\u54C1 schema\uFF08JSON\uFF09\uFF0C\u9009\u62E9\u751F\u6210\u65B9\u5F0F\u521B\u5EFA\u6F14\u793A\u7A3F" })] }), e.jsxs("div", { className: "mx-auto mt-10 max-w-2xl", children: [e.jsxs("div", { className: "flex items-center gap-2 rounded-full border border-white/60 bg-white/95 px-3 py-2 shadow-lg shadow-violet-900/5 backdrop-blur", children: [e.jsx("button", { type: "button", onClick: () => {
    var _a;
    return (_a = l.current) == null ? void 0 : _a.click();
  }, className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100", title: "\u4E0A\u4F20 .md \u6216 .json", children: e.jsx(Pe, { size: 18 }) }), e.jsx("input", { ref: l, type: "file", accept: ".md,.json,text/markdown,application/json", className: "hidden", onChange: (t) => {
    var _a;
    const i = (_a = t.target.files) == null ? void 0 : _a[0];
    i && ye(i);
  } }), e.jsx("input", { value: _, onChange: (t) => D(t.target.value), placeholder: "\u8F93\u5165\u6F14\u793A\u4E3B\u9898\u2026", className: "min-w-0 flex-1 bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400" }), e.jsx("button", { type: "button", disabled: !_.trim() && !w.trim() && !j || f || N, onClick: () => void je(), className: K("flex h-9 w-9 items-center justify-center rounded-full transition-colors", (_.trim() || w.trim() || j) && !f && !N ? "bg-gray-900 text-white hover:bg-gray-700" : "bg-gray-100 text-gray-300"), children: f ? e.jsx(B, { size: 16, className: "animate-spin" }) : e.jsx(ke, { size: 16 }) })] }), e.jsxs("div", { className: "mt-4 flex flex-wrap justify-center gap-3 text-xs", children: [e.jsxs("label", { className: "flex items-center gap-1.5 text-gray-700", children: ["\u751F\u6210\u65B9\u5F0F", e.jsx("select", { value: v, onChange: (t) => pe(t.target.value), className: "max-w-[220px] rounded-md border border-white/50 bg-white/80 px-2 py-1", children: Be.map((t) => e.jsx("option", { value: t.value, children: t.label }, t.value)) })] }), e.jsx(at, { value: I, min: v === "ohmyppt" ? X : void 0, max: v === "ohmyppt" ? U : void 0, onChange: (t) => {
    Z(false), Q(t);
  }, disabled: f || N }), e.jsxs("label", { className: "flex items-center gap-1 text-gray-600", children: [e.jsx("input", { type: "checkbox", checked: F, disabled: f || N, onChange: (t) => {
    Z(t.target.checked), t.target.checked && M(w, j);
  }, className: "rounded border-gray-300" }), "\u6309\u5185\u5BB9\u81EA\u52A8"] }), v === "ohmyppt" ? e.jsxs("label", { className: "flex items-center gap-1.5 text-gray-700", children: ["\u98CE\u683C", e.jsx("select", { value: y, onChange: (t) => h(t.target.value), className: "max-w-[200px] rounded-md border border-white/50 bg-white/80 px-2 py-1", children: c.map((t) => e.jsxs("option", { value: t.id, children: [t.label, t.category ? ` \xB7 ${t.category}` : ""] }, t.id)) })] }) : e.jsxs("label", { className: "flex items-center gap-1.5 text-gray-700", children: ["\u4E3B\u9898", e.jsx("select", { value: ne, onChange: (t) => he(t.target.value), className: "max-w-[200px] rounded-md border border-white/50 bg-white/80 px-2 py-1", children: Ve.map((t) => e.jsx("option", { value: t.value, children: t.label }, t.value)) })] })] }), N && e.jsxs("p", { className: "mt-2 flex items-center justify-center gap-2 text-center text-xs text-violet-800", children: [e.jsx(B, { size: 14, className: "animate-spin" }), "AI \u6B63\u5728\u8BC6\u522B\u5E76\u8F6C\u6362\u4E3A\u6807\u51C6 schema\u2026"] }), E && e.jsxs("p", { className: "mt-2 text-center text-xs text-gray-600", children: ["\u5DF2\u9009\u6587\u4EF6\uFF1A", E, j ? ` \xB7 \u6807\u51C6 schema ${j.slides.length} \u9875` : ""] }), te.length > 0 && e.jsx("p", { className: "mt-1 text-center text-xs text-amber-700", children: te.slice(0, 3).join(" \xB7 ") }), j && e.jsxs("div", { className: "mx-auto mt-2 max-w-xl text-center text-xs", children: [e.jsxs("button", { type: "button", className: "text-violet-700 underline-offset-2 hover:underline", onClick: () => G((t) => !t), children: [ae ? "\u9690\u85CF" : "\u9884\u89C8", "\u6807\u51C6\u5316 JSON"] }), ae && e.jsx("pre", { className: "mt-2 max-h-48 overflow-auto rounded-lg border border-white/60 bg-white/90 p-2 text-left text-[10px] text-gray-700", children: JSON.stringify(j, null, 2) })] }), C && e.jsx("p", { className: "mt-3 text-center text-sm text-red-600", children: C })] })] }), e.jsxs("div", { className: "relative -mt-20 mx-auto max-w-5xl rounded-t-3xl bg-[#faf8f6] px-4 pb-16 pt-8", children: [e.jsxs("div", { className: "mb-6 flex items-center justify-between", children: [e.jsx("h2", { className: "text-sm font-medium text-gray-800", children: "\u6700\u8FD1\u4F1A\u8BDD" }), e.jsxs("button", { type: "button", onClick: () => {
    var _a;
    return (_a = l.current) == null ? void 0 : _a.click();
  }, className: "flex items-center gap-1 text-xs text-gray-500 hover:text-gray-800", children: [e.jsx(Ae, { size: 14 }), " \u4E0A\u4F20 MD / JSON"] })] }), g ? e.jsxs("div", { className: "flex justify-center py-16 text-sm text-gray-400", children: [e.jsx(B, { className: "mr-2 animate-spin", size: 16 }), " \u52A0\u8F7D\u4E2D\u2026"] }) : re.length === 0 ? e.jsx("div", { className: "rounded-2xl border border-dashed border-gray-200 py-16 text-center text-sm text-gray-400", children: "\u6682\u65E0\u4F1A\u8BDD\uFF0C\u8F93\u5165\u4E3B\u9898\u5F00\u59CB\u521B\u5EFA" }) : e.jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: re.map((t) => t.kind === "pptxgenjs" ? e.jsx(me, { item: t, onOpen: () => s(R(t.id, "pptxgenjs")) }, `pptx-${t.id}`) : e.jsx(me, { item: t, onOpen: () => s(R(t.session.id, "ohmyppt")), onRename: () => {
    P(t.session), W(t.session.title || "");
  }, onDelete: () => V(t.session) }, `ohm-${t.session.id}`)) })] }), e.jsx(Te, { open: !!H, onOpenChange: (t) => !t && P(null), children: e.jsxs(_e, { onOpenChange: () => P(null), className: "max-w-md", children: [e.jsx(De, { children: e.jsx(Ee, { children: "\u91CD\u547D\u540D\u9879\u76EE" }) }), e.jsx("input", { value: J, onChange: (t) => W(t.target.value), maxLength: 120, className: "mt-2 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-violet-400", placeholder: "\u8F93\u5165\u9879\u76EE\u540D\u79F0", autoFocus: true }), e.jsxs(ze, { children: [e.jsx(de, { variant: "outline", onClick: () => P(null), children: "\u53D6\u6D88" }), e.jsx(de, { disabled: le || !J.trim(), onClick: () => void be(), children: le ? "\u4FDD\u5B58\u4E2D\u2026" : "\u4FDD\u5B58" })] })] }) }), e.jsx(Oe, { open: !!k, onOpenChange: (t) => !t && V(null), children: e.jsxs(Me, { children: [e.jsxs(Re, { children: [e.jsx(Le, { children: "\u5220\u9664\u9879\u76EE\uFF1F" }), e.jsxs($e, { children: ["\u5C06\u6C38\u4E45\u5220\u9664\u300C", (k == null ? void 0 : k.title) || (k == null ? void 0 : k.id), "\u300D\u53CA\u5176\u6240\u6709\u9875\u9762\u6587\u4EF6\uFF0C\u6B64\u64CD\u4F5C\u4E0D\u53EF\u6062\u590D\u3002"] })] }), e.jsxs(Ie, { children: [e.jsx(Fe, { children: "\u53D6\u6D88" }), e.jsx(Ge, { variant: "destructive", onClick: () => void ve(), children: fe ? "\u5220\u9664\u4E2D\u2026" : "\u5220\u9664" })] })] }) })] });
}
export {
  pt as default
};
