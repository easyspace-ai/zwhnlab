import { j as e } from "./three-BECTMk9d.js";
import { a as n } from "./monaco-BSfMmt4N.js";
import { w as X, p as q, a as Y, q as Q, r as V, x as Z, L as w, s as _, c as ee, S as te } from "./main-gNlFrJgr.js";
import { p as P, b as se } from "./routes-ByufEI1K.js";
import { P as I, S as ae } from "./PipelineProgressPanel-vwbccnca.js";
import "./charts-Cx7lSOSv.js";
const ne = "/api/studio/ohmyppt";
async function re(t, r = "deck.pptx") {
  const o = await fetch("/api/ppthtml/export/download", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ html: t, filename: r }) });
  if (!o.ok) {
    const c = await o.json().catch(() => ({}));
    throw new Error(c.detail || c.message || "PPTX export failed");
  }
  const i = await o.blob(), a = URL.createObjectURL(i), l = document.createElement("a");
  l.href = a, l.download = r.endsWith(".pptx") ? r : `${r}.pptx`, l.click(), URL.revokeObjectURL(a);
}
async function oe(t, r = "deck.pptx") {
  const o = X(), i = new Headers({ "Content-Type": "application/json" });
  o && i.set("Authorization", `Bearer ${o}`);
  const a = r.endsWith(".pptx") ? r : `${r}.pptx`, l = a.replace(/\.pptx$/i, ""), c = await fetch(`${ne}/export/guizang-pptx`, { method: "POST", headers: i, body: JSON.stringify({ html: t, title: l }) });
  if (!c.ok) {
    const g = await c.json().catch(() => ({}));
    throw new Error(g.detail || g.error || g.message || "Editable PPTX export failed");
  }
  const u = await c.blob(), f = URL.createObjectURL(u), x = document.createElement("a");
  x.href = f, x.download = a, x.click(), URL.revokeObjectURL(f);
}
function ie(t, r = "deck.html") {
  const o = new Blob([t], { type: "text/html;charset=utf-8" }), i = URL.createObjectURL(o), a = document.createElement("a");
  a.href = i, a.download = r, a.click(), URL.revokeObjectURL(i);
}
function le(t, r, o, i, a) {
  t.stage && t.stage !== "done" && r(t.stage), t.message && o(t.message), t.status === "retry" && t.stage && i((l) => ({ ...l, [t.stage]: "" })), t.status === "progress" && t.chunk && t.stage && i((l) => ({ ...l, [t.stage]: (l[t.stage] || "") + t.chunk })), t.stage === "error" && a(t.message || "\u751F\u6210\u5931\u8D25");
}
function ue() {
  const { projectId: t } = q(), r = Y(), [o, i] = n.useState(""), [a, l] = n.useState(""), [c, u] = n.useState(""), [f, x] = n.useState(""), [g, E] = n.useState({}), [C, O] = n.useState(true), [N, b] = n.useState(false), [U, d] = n.useState(""), [H, k] = n.useState([]), [y, M] = n.useState(""), [S, A] = n.useState(false), [L, $] = n.useState(false), [R, D] = n.useState(false), B = n.useRef(false), T = !!a, m = N || S, h = n.useCallback(async () => {
    var _a;
    if (!t) return;
    const [s, p] = await Promise.all([P.getProject(t), P.listResources(t)]);
    i(s.name), l(((_a = p.find((j) => j.type === "html_deck")) == null ? void 0 : _a.content) || "");
  }, [t]), v = n.useCallback((s) => {
    le(s, u, x, E, d);
  }, []), z = n.useCallback(async () => {
    if (!(!t || N)) {
      b(true), d(""), E({}), x(""), u("outline");
      try {
        await P.runPipeline(t, v), await h();
      } catch (s) {
        d(s instanceof Error ? s.message : "\u751F\u6210\u5931\u8D25");
      } finally {
        b(false);
      }
    }
  }, [t, N, h, v]);
  n.useEffect(() => {
    h().catch((s) => d(s instanceof Error ? s.message : "\u52A0\u8F7D\u5931\u8D25"));
  }, [h]), n.useEffect(() => {
    var _a;
    ((_a = r.state) == null ? void 0 : _a.autoRun) && !B.current && t && (B.current = true, z());
  }, [r.state, t, z]);
  const F = () => {
    a && ie(a, `${o || "deck"}.html`);
  }, J = async () => {
    if (a.trim()) {
      $(true), d("");
      try {
        await re(a, `${o || "deck"}.pptx`);
      } catch (s) {
        d(s instanceof Error ? s.message : "PPT \u5BFC\u51FA\u5931\u8D25");
      } finally {
        $(false);
      }
    }
  }, K = async () => {
    if (a.trim()) {
      D(true), d("");
      try {
        await oe(a, `${o || "deck"}.pptx`);
      } catch (s) {
        d(s instanceof Error ? s.message : "\u53EF\u7F16\u8F91 PPT \u5BFC\u51FA\u5931\u8D25");
      } finally {
        D(false);
      }
    }
  }, G = async () => {
    if (!t || !y.trim() || S) return;
    const s = y.trim();
    M(""), k((p) => [...p, { role: "user", content: s }]), A(true), b(true), d(""), E({}), x(""), u("outline");
    try {
      await P.regenerate(t, s, v), k((p) => [...p, { role: "assistant", content: "\u5DF2\u6839\u636E\u4F60\u7684\u8BF4\u660E\u66F4\u65B0 HTML \u6F14\u793A\u7A3F\u3002" }]), await h();
    } catch (p) {
      const j = p instanceof Error ? p.message : "\u66F4\u65B0\u5931\u8D25";
      k((W) => [...W, { role: "assistant", content: j }]), d(j);
    } finally {
      A(false), b(false);
    }
  };
  return e.jsxs("div", { className: "flex h-full min-h-0 flex-col bg-gray-50", children: [e.jsxs("header", { className: "flex h-12 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4", children: [e.jsxs("div", { className: "flex items-center gap-3", children: [e.jsx(Q, { to: se(), className: "text-gray-500 hover:text-gray-800", children: e.jsx(V, { size: 18 }) }), e.jsx("span", { className: "text-sm font-medium text-gray-900", children: o || "\u52A0\u8F7D\u4E2D\u2026" })] }), e.jsxs("div", { className: "flex items-center gap-2", children: [T && e.jsxs(e.Fragment, { children: [e.jsxs("button", { type: "button", onClick: F, className: "flex items-center gap-1 rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs hover:bg-gray-50", children: [e.jsx(Z, { size: 14 }), " HTML"] }), e.jsxs("button", { type: "button", disabled: L || R, onClick: () => void J(), className: "flex items-center gap-1 rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs hover:bg-gray-50 disabled:opacity-40", children: [L ? e.jsx(w, { size: 14, className: "animate-spin" }) : e.jsx(_, { size: 14 }), "PPT\uFF08\u56FE\u7247\uFF09"] }), e.jsxs("button", { type: "button", disabled: L || R, onClick: () => void K(), className: "flex items-center gap-1 rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs hover:bg-gray-50 disabled:opacity-40", children: [R ? e.jsx(w, { size: 14, className: "animate-spin" }) : e.jsx(_, { size: 14 }), "PPT\uFF08\u53EF\u7F16\u8F91\uFF09"] })] }), !T && !m && e.jsx("button", { type: "button", onClick: () => void z(), className: "rounded-lg bg-gray-900 px-3 py-1.5 text-xs text-white hover:bg-gray-700", children: "\u751F\u6210" })] })] }), e.jsxs("div", { className: "flex min-h-0 flex-1", children: [e.jsxs("aside", { className: "flex w-[38%] min-w-[280px] max-w-[480px] flex-col border-r border-gray-200 bg-white", children: [e.jsxs("div", { className: "flex-1 overflow-y-auto p-4 space-y-3", children: [m && e.jsx(I, { stage: c, stageMsg: f, partialByStage: g, expanded: C, onToggleExpanded: () => O((s) => !s), compact: true }), U && e.jsx("div", { className: "rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700", children: U }), H.length === 0 && !m && e.jsx("p", { className: "text-xs text-gray-400", children: "\u751F\u6210\u540E\u53EF\u5728\u6B64\u5FAE\u8C03\u7248\u5F0F\u3001\u8BED\u6C14\u6216\u589E\u5220\u9875\u9762\uFF08\u57FA\u4E8E Guizang HTML \u6A21\u677F\uFF09" }), H.map((s, p) => e.jsx("div", { className: ee("rounded-xl px-3 py-2 text-sm", s.role === "user" ? "ml-8 bg-gray-100 text-gray-900" : "mr-8 bg-gray-50 text-gray-700"), children: s.content }, p))] }), e.jsx("div", { className: "border-t border-gray-100 p-3", children: e.jsxs("div", { className: "flex items-end gap-2 rounded-xl border border-gray-200 bg-gray-50 p-2", children: [e.jsx("textarea", { value: y, onChange: (s) => M(s.target.value), onKeyDown: (s) => {
    s.key === "Enter" && !s.shiftKey && (s.preventDefault(), G());
  }, placeholder: "\u8C03\u6574\u7248\u5F0F\u6216\u5185\u5BB9\u2026", rows: 2, className: "flex-1 resize-none bg-transparent text-sm outline-none", disabled: m }), e.jsx("button", { type: "button", disabled: !y.trim() || m, onClick: () => void G(), className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-900 text-white disabled:bg-gray-200", children: S ? e.jsx(w, { size: 14, className: "animate-spin" }) : e.jsx(te, { size: 14 }) })] }) })] }), e.jsxs("main", { className: "relative min-w-0 flex-1 bg-gray-100", children: [m && !T && e.jsxs("div", { className: "absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-gray-100/90 p-8", children: [e.jsx(w, { className: "animate-spin text-gray-400", size: 32 }), e.jsx("div", { className: "w-full max-w-lg", children: e.jsx(I, { stage: c, stageMsg: f, partialByStage: g, expanded: C, onToggleExpanded: () => O((s) => !s) }) }), !g[c] && e.jsx("p", { className: "text-sm text-gray-500", children: ae[c] || "Guizang \u751F\u6210\u4E2D\u2026" })] }), a ? e.jsx("iframe", { title: "Guizang HTML preview", srcDoc: a, className: "h-full w-full border-0 bg-white", sandbox: "allow-scripts allow-same-origin" }) : m ? null : e.jsx("div", { className: "flex h-full items-center justify-center text-sm text-gray-400", children: "HTML \u9884\u89C8\u5C06\u5728\u6B64\u663E\u793A" })] })] })] });
}
export {
  ue as default
};
