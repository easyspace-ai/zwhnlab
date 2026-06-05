import { j as n } from "./three-BECTMk9d.js";
import { a as l } from "./monaco-BSfMmt4N.js";
import { c as B, W as U, P as q } from "./pptx-worker-BWo1NuJo.js";
import "./charts-Cx7lSOSv.js";
const I = [{ label: "Pitch \xB7 \u6DF1\u8272\u6E10\u53D8", url: "/slideglance/samples/01-pitch.pptx" }, { label: "Editorial \xB7 A4", url: "/slideglance/samples/02-editorial.pptx" }, { label: "Tech spec", url: "/slideglance/samples/03-tech-spec.pptx" }, { label: "Workshop", url: "/slideglance/samples/04-workshop.pptx" }];
function V() {
  const [i, b] = l.useState(null), [f, L] = l.useState(null), [W, g] = l.useState(0), [x, E] = l.useState(0), [S, p] = l.useState(null), [k, v] = l.useState(null), [c, m] = l.useState("idle"), [R, s] = l.useState("\u4E0A\u4F20 .pptx \u6216\u9009\u62E9\u793A\u4F8B\uFF0C\u5728\u6D4F\u89C8\u5668\u672C\u5730\u89E3\u6790\uFF08\u4E0D\u4E0A\u4F20\u670D\u52A1\u5668\uFF09"), P = l.useRef(null), h = l.useRef(null), d = l.useRef(0);
  l.useEffect(() => {
    let e = false, a = null;
    return m("starting"), (async () => {
      try {
        const t = await B(new U());
        if (e) {
          t.close();
          return;
        }
        a = t, b(t), m("ready");
      } catch (t) {
        if (!e) {
          const r = t instanceof Error ? t.message : String(t);
          p(`\u9884\u89C8 Worker \u542F\u52A8\u5931\u8D25: ${r}`), m("idle");
        }
      }
    })(), () => {
      e = true, a == null ? void 0 : a.close(), b(null);
    };
  }, []);
  const u = l.useCallback((e, a) => {
    h.current = new Uint8Array(a), d.current += 1, E(d.current), L(e), g(0), p(null), s(`${e} \xB7 ${a.byteLength.toLocaleString()} \u5B57\u8282`);
  }, []);
  l.useEffect(() => {
    if (!i || x === 0 || !h.current) return;
    const e = x, a = new Uint8Array(h.current);
    let t = false;
    return (async () => {
      try {
        s((o) => o.replace(/ · 渲染.*$/, "") + " \xB7 \u6E32\u67D3\u4E2D\u2026");
        const r = await i.open(a, {});
        if (t || e !== d.current) return;
        g(r.slideCount), p(null), s(`${f ?? "\u6F14\u793A\u6587\u7A3F"} \xB7 ${a.byteLength.toLocaleString()} \u5B57\u8282 \xB7 ${r.slideCount} \u9875`);
      } catch (r) {
        if (t || e !== d.current) return;
        const o = r instanceof Error ? r.message : String(r);
        p(o), g(0), s(`\u52A0\u8F7D\u5931\u8D25: ${o}`);
      }
    })(), () => {
      t = true;
    };
  }, [i, x, f]);
  const w = l.useCallback(async (e) => {
    v(e.url), s(`\u52A0\u8F7D ${e.label}\u2026`);
    const a = performance.now();
    try {
      const t = await fetch(e.url);
      if (!t.ok) {
        s(`\u793A\u4F8B\u4E0D\u53EF\u7528 (${t.status})\uFF0C\u8BF7\u4E0A\u4F20\u672C\u5730\u6587\u4EF6`);
        return;
      }
      const r = new Uint8Array(await t.arrayBuffer());
      u(e.label, r);
      const o = Math.round(performance.now() - a);
      s(`${e.label} \xB7 ${r.byteLength.toLocaleString()} \u5B57\u8282 \xB7 ${o} ms \xB7 \u6E32\u67D3\u4E2D\u2026`);
    } catch (t) {
      s(`\u52A0\u8F7D\u5931\u8D25: ${t.message ?? String(t)}`);
    }
  }, [u]), z = l.useCallback(async (e) => {
    var _a;
    const a = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!a) return;
    v(null), s(`\u52A0\u8F7D ${a.name}\u2026`);
    const t = performance.now();
    try {
      const r = new Uint8Array(await a.arrayBuffer());
      u(a.name, r);
      const o = Math.round(performance.now() - t);
      s(`${a.name} \xB7 ${r.byteLength.toLocaleString()} \u5B57\u8282 \xB7 ${o} ms \xB7 \u6E32\u67D3\u4E2D\u2026`);
    } catch (r) {
      s(`\u52A0\u8F7D\u5931\u8D25: ${r.message ?? String(r)}`);
    }
    e.target.value = "";
  }, [u]), A = l.useMemo(() => I.map((e) => n.jsx("button", { type: "button", disabled: c !== "ready", style: k === e.url ? { ...j, ...F, ...c !== "ready" ? C : {} } : { ...j, ...c !== "ready" ? C : {} }, onClick: () => void w(e), children: e.label }, e.url)), [k, w, c]);
  return n.jsxs("div", { style: M, children: [n.jsxs("header", { style: D, children: [n.jsx("h1", { style: T, children: "PPTX \u9884\u89C8" }), n.jsx("span", { style: y }), n.jsxs("label", { style: $, children: ["\u4E0A\u4F20", n.jsx("input", { ref: P, type: "file", disabled: c !== "ready", accept: ".pptx,application/vnd.openxmlformats-officedocument.presentationml.presentation", onChange: z, style: H })] }), n.jsx("span", { style: y }), n.jsx("span", { style: $, children: "\u793A\u4F8B" }), A, n.jsx("span", { style: y }), n.jsx("span", { style: X, children: R })] }), c === "starting" ? n.jsxs("div", { style: G, role: "status", children: [n.jsx("span", { style: { marginRight: 8 }, className: "inline-block w-3 h-3 border-2 border-neutral-500 border-t-blue-400 rounded-full animate-spin" }), "\u6B63\u5728\u542F\u52A8 Worker \u5F15\u64CE\u2026"] }) : null, S ? n.jsx("div", { style: N, role: "alert", children: S }) : null, n.jsx(q, { controller: i, name: f, slideCount: W, style: { flex: 1, minHeight: 0 } })] });
}
const M = { display: "grid", gridTemplateRows: "auto auto auto minmax(0, 1fr)", width: "100%", height: "100%", background: "var(--pptx-shell-bg, #0e0e10)", color: "var(--pptx-shell-fg, #ececec)", fontFamily: "system-ui, -apple-system, sans-serif", overflow: "hidden" }, D = { display: "flex", alignItems: "center", gap: 12, padding: "10px 16px", background: "var(--pptx-shell-ribbon-bg, #1f1f23)", borderBottom: "1px solid var(--pptx-shell-border, #2a2a30)", flexWrap: "wrap", flexShrink: 0 }, N = { padding: "8px 16px", fontSize: 12, color: "#f48771", background: "rgba(244, 135, 113, 0.12)", borderBottom: "1px solid rgba(244, 135, 113, 0.35)", flexShrink: 0 }, T = { margin: 0, fontSize: 14, fontWeight: 600, letterSpacing: "0.05em", color: "var(--pptx-shell-fg, #ddd)" }, y = { width: 1, alignSelf: "stretch", background: "var(--pptx-shell-border, #2a2a30)" }, $ = { fontSize: 12, color: "var(--pptx-shell-status, #999)" }, j = { background: "var(--pptx-shell-input-bg, #1a1a1f)", color: "var(--pptx-shell-fg, #ececec)", border: "1px solid var(--pptx-shell-border, #2f2f36)", padding: "6px 10px", borderRadius: 4, font: "inherit", fontSize: 12, cursor: "pointer" }, F = { borderColor: "var(--pptx-shell-accent, #6aa3ff)", background: "var(--pptx-shell-accent-soft, #25304a)" }, H = { color: "var(--pptx-shell-fg, #ccc)", fontSize: 12, maxWidth: 220 }, X = { fontSize: 11, color: "var(--pptx-shell-status, #888)", flex: 1, minWidth: 120 }, G = { padding: "8px 16px", fontSize: 12, color: "#6aa3ff", background: "rgba(106, 163, 255, 0.12)", borderBottom: "1px solid rgba(106, 163, 255, 0.35)", flexShrink: 0 }, C = { opacity: 0.45, cursor: "not-allowed" };
export {
  V as default
};
