import { j as t } from "./three-BECTMk9d.js";
import { a as r } from "./monaco-BSfMmt4N.js";
import { p as de, a as Se, q as ve, r as ke, L as b, s as le, M as Ee, S as $e, t as Ce, c as Le, v as _e } from "./main-gNlFrJgr.js";
import { p as ze } from "./themePresets-Bm4AFvWW.js";
import { o as f, a as ue, i as W } from "./routes-fYh3HC7W.js";
import { S as Me, P as Ie } from "./PptxgenjsEditor-C6f3-b3o.js";
import "./charts-Cx7lSOSv.js";
import "./routes-UgFNxPGD.js";
import "./pptx-worker-BWo1NuJo.js";
import "./PipelineProgressPanel-vwbccnca.js";
const S = /* @__PURE__ */ new Map(), Te = 8;
function Re(s) {
  return s.pageId || s.id || `page-${s.pageNumber}`;
}
function Ae(s, c, l, i) {
  const m = c.map((p) => `${Re(p)}:${p.pageNumber}:${p.status ?? ""}:${p.title}`).join("|");
  return `${s}:${l}:0:${(i == null ? void 0 : i.embed_fonts) ?? "always"}:${m}`;
}
function Be(s) {
  return S.get(s);
}
function De(s, c) {
  if (S.size >= Te && !S.has(s)) {
    const l = S.keys().next().value;
    l && S.delete(l);
  }
  S.set(s, c);
}
class He extends r.Component {
  constructor(c) {
    super(c), this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(c) {
    return { hasError: true, error: c };
  }
  render() {
    var _a;
    return this.state.hasError ? this.props.fallback ?? t.jsxs("div", { className: "flex flex-1 flex-col items-center justify-center gap-2 p-8 text-sm text-gray-500", children: [t.jsx("p", { className: "text-red-500", children: "PPTX \u9884\u89C8\u52A0\u8F7D\u5931\u8D25" }), t.jsx("p", { className: "text-xs text-gray-400", children: (_a = this.state.error) == null ? void 0 : _a.message }), t.jsx("button", { type: "button", onClick: () => this.setState({ hasError: false, error: null }), className: "mt-2 rounded-lg border border-gray-200 px-3 py-1.5 text-xs hover:bg-gray-50", children: "\u91CD\u8BD5" })] }) : this.props.children;
  }
}
function ie(s) {
  return s.pageId || s.id || `page-${s.pageNumber}`;
}
function oe(s) {
  return { planning: "\u89C4\u5212\u5927\u7EB2", outline: "\u7EC4\u7EC7\u5927\u7EB2", design: "\u8BBE\u8BA1\u6837\u5F0F", generate: "\u751F\u6210\u9875\u9762", rendering: "\u6E32\u67D3\u9875\u9762", preflight: "\u51C6\u5907\u751F\u6210", run_completed: "\u5B8C\u6210", run_error: "\u51FA\u9519" }[s] || s;
}
function Fe(s, c) {
  const l = [];
  for (const i of s) i.role === "user" && i.content.trim() ? l.push({ role: "user", content: i.content }) : i.role === "assistant" && i.content.trim() ? l.push({ role: "assistant", content: i.content }) : i.role === "system" && i.type === "stream_chunk" && i.content.trim() && l.push({ role: "stage", stage: `history-${i.id || l.length}`, label: "\u751F\u6210\u8FDB\u5EA6", content: i.content, expanded: false, done: true });
  return l.length === 0 && (c == null ? void 0 : c.trim()) ? [{ role: "user", content: c.trim() }] : l;
}
async function ce(s, c, l) {
  try {
    await f.streamGenerate(s, c, l);
  } catch (i) {
    if ((i instanceof Error ? i.message : "").includes("\u6B63\u5728\u751F\u6210\u4E2D")) {
      await f.streamSubscribe(s, c);
      return;
    }
    throw i;
  }
}
function Xe() {
  const { projectId: s } = de(), c = Se(), l = r.useRef(false), [i, m] = r.useState(""), [p, v] = r.useState(0), [k, pe] = r.useState(""), [u, q] = r.useState([]), [Ze, j] = r.useState(""), [ge, E] = r.useState(""), [Ge, J] = r.useState([]), [L, N] = r.useState(false), [O, g] = r.useState(""), [T, Q] = r.useState(false), [R, V] = r.useState(false), [xe, Ke] = r.useState(0), [A, B] = r.useState(""), [D, Y] = r.useState(false), [H, h] = r.useState([]), [_, ee] = r.useState(""), [w, fe] = r.useState("pptx"), [me, F] = r.useState(null), [he, te] = r.useState(false), ye = r.useRef(null), X = r.useRef(false), se = r.useMemo(() => u.filter((e) => e.status === "completed" || e.status === "generated").length, [u]), be = u.length, z = r.useMemo(() => !s || u.length === 0 ? "" : Ae(s, u, p, {}), [s, u, p]), P = r.useCallback(async () => {
    if (!s) return null;
    const e = await f.getSession(s), a = e.session;
    m(String(a.title || s)), v(Number(a.updatedAt ?? a.updated_at ?? 0)), q(e.pages || []);
    const n = a.topic && typeof a.topic == "string" ? a.topic : "";
    n && pe(n);
    let o = e.messages;
    return (o == null ? void 0 : o.length) || (o = await f.getMessages(s)), h(Fe(o || [], n)), e;
  }, [s]), x = r.useCallback((e) => {
    J((a) => [...a.slice(-40), e]);
  }, []), ae = r.useCallback((e, a, n) => {
    const o = { role: "stage", stage: e, label: oe(a || e), content: n, expanded: true, done: false };
    ye.current = o, h((d) => [...d.filter((C) => !(C.role === "stage" && C.stage === e)), o]);
  }, []), Z = r.useCallback((e, a, n) => {
    h((o) => o.map((d) => d.role === "stage" && d.stage === e ? { ...d, content: d.content + a, done: n ?? d.done } : d));
  }, []), G = r.useCallback(() => {
    h((e) => e.map((a) => a.role === "stage" ? { ...a, expanded: false, done: true } : a));
  }, []), $ = r.useCallback((e) => {
    if ((e.type === "stage_started" || e.type === "stage_progress") && (j(e.payload.stage), e.payload.label && E(e.payload.label), x(e.payload.label || e.payload.stage)), e.type === "llm_status" && e.payload.detail && x(e.payload.detail), e.type === "assistant_message" && (x(e.payload.content.slice(0, 200)), h((a) => [...a, { role: "assistant", content: e.payload.content }])), e.type === "page_generated" || e.type === "page_updated") {
      const a = e.payload;
      q((n) => {
        const o = a.pageId || a.id || `page-${a.pageNumber}`, d = [...n], M = d.findIndex((I) => ie(I) === o || I.pageNumber === a.pageNumber), C = { pageNumber: a.pageNumber, title: a.title, pageId: o, id: o, status: "completed", htmlPath: a.htmlPath };
        return M >= 0 ? d[M] = { ...d[M], ...C } : d.push(C), d.sort((I, Pe) => I.pageNumber - Pe.pageNumber), d;
      }), x(`\u7B2C ${a.pageNumber} \u9875\uFF1A${a.title}`), Z(e.payload.stage, `
\u7B2C ${a.pageNumber} \u9875\uFF1A${a.title}`);
    }
    e.type === "page_started" && (x(`\u751F\u6210\u7B2C ${e.payload.pageNumber} \u9875\u2026`), ae(e.payload.stage, oe(e.payload.stage), `\u751F\u6210\u7B2C ${e.payload.pageNumber} \u9875\u2026`)), e.type === "page_failed" && (x(`\u7B2C ${e.payload.pageNumber} \u9875\u5931\u8D25\uFF1A${e.payload.error || ""}`), Z(e.payload.stage, `
\u7B2C ${e.payload.pageNumber} \u9875\u5931\u8D25`)), e.type === "run_completed" && (j("run_completed"), E("\u751F\u6210\u5B8C\u6210"), x("\u5168\u90E8\u5B8C\u6210"), G()), e.type === "run_error" && (j("run_error"), g(e.payload.message), x(e.payload.message), G());
  }, [x, ae, Z, G]), K = r.useCallback(async () => {
    if (!(!s || L)) {
      N(true), g(""), J([]), j("planning"), E("\u51C6\u5907\u751F\u6210\u2026");
      try {
        await ce(s, $), await P();
      } catch (e) {
        g(e instanceof Error ? e.message : "\u751F\u6210\u5931\u8D25");
      } finally {
        N(false);
      }
    }
  }, [s, L, $, P]);
  r.useEffect(() => {
    X.current = false;
    let e = false;
    return (async () => {
      try {
        const a = await P();
        if (e || !(a == null ? void 0 : a.activeRun) || a.activeRun.status !== "running" || X.current || l.current) return;
        X.current = true, N(true), j("planning"), E("\u6B63\u5728\u751F\u6210\u2026");
        try {
          await f.streamSubscribe(s, $), e || await P();
        } catch (n) {
          e || g(n instanceof Error ? n.message : "\u8BA2\u9605\u751F\u6210\u8FDB\u5EA6\u5931\u8D25");
        } finally {
          e || N(false);
        }
      } catch (a) {
        e || g(a instanceof Error ? a.message : "\u52A0\u8F7D\u5931\u8D25");
      }
    })(), () => {
      e = true;
    };
  }, [s, P, $]), r.useEffect(() => {
    var _a;
    ((_a = c.state) == null ? void 0 : _a.autoRun) && !l.current && s && (l.current = true, K());
  }, [c.state, s, K]);
  const re = u[xe], U = re ? ie(re) : "";
  r.useEffect(() => {
    if (!s || !U) {
      B("");
      return;
    }
    let e = false;
    return Y(true), f.getPageHtml(s, U).then((a) => {
      e || B(a);
    }).catch(() => {
      e || B("");
    }).finally(() => {
      e || Y(false);
    }), () => {
      e = true;
    };
  }, [s, U]), r.useEffect(() => {
    if (w !== "pptx" || !s || u.length === 0 || !z) return;
    const e = Be(z);
    if (e) {
      let n = false;
      return e.arrayBuffer().then((o) => {
        n || F(new Uint8Array(o));
      }), () => {
        n = true;
      };
    }
    let a = false;
    return te(true), f.fetchPptxBlob(s, { image_only: false }).then((n) => (De(z, n), n.arrayBuffer())).then((n) => {
      a || F(new Uint8Array(n));
    }).catch(() => {
      a || F(null);
    }).finally(() => {
      a || te(false);
    }), () => {
      a = true;
    };
  }, [w, s, u.length, z]);
  const je = async () => {
    if (s) {
      Q(true);
      try {
        await f.exportZip(s, `${i || "deck"}.zip`);
      } catch (e) {
        g(e instanceof Error ? e.message : "\u5BFC\u51FA\u5931\u8D25");
      } finally {
        Q(false);
      }
    }
  }, Ne = async () => {
    if (s) {
      V(true);
      try {
        await f.exportPptx(s, `${i || "deck"}.pptx`, { image_only: false });
      } catch (e) {
        g(e instanceof Error ? e.message : "\u5BFC\u51FA\u5931\u8D25");
      } finally {
        V(false);
      }
    }
  }, ne = async () => {
    if (!s || !_.trim() || L) return;
    const e = _.trim();
    ee(""), h((a) => [...a, { role: "user", content: e }]), N(true), g(""), j("planning"), E("\u6839\u636E\u4F60\u7684\u8BF4\u660E\u8C03\u6574\u4E2D\u2026");
    try {
      await ce(s, $, { user_message: e }), await P();
    } catch (a) {
      const n = a instanceof Error ? a.message : "\u66F4\u65B0\u5931\u8D25";
      h((o) => [...o, { role: "assistant", content: n }]), g(n);
    } finally {
      N(false);
    }
  }, we = u.length > 0 && A, y = L;
  return t.jsxs("div", { className: "flex h-full min-h-0 flex-col bg-gray-50", children: [t.jsxs("header", { className: "flex h-12 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4", children: [t.jsxs("div", { className: "flex items-center gap-3", children: [t.jsx(ve, { to: ue(), className: "text-gray-500 hover:text-gray-800", children: t.jsx(ke, { size: 18 }) }), t.jsx("span", { className: "text-sm font-medium text-gray-900", children: i || "\u52A0\u8F7D\u4E2D\u2026" }), u.length > 0 && t.jsxs("span", { className: "hidden text-xs text-gray-400 sm:inline", children: [u.length, " \u9875"] })] }), t.jsxs("div", { className: "flex items-center gap-2", children: [u.length > 0 && t.jsxs(t.Fragment, { children: [t.jsxs("button", { type: "button", disabled: T || R, onClick: () => void je(), className: "flex items-center gap-1 rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs hover:bg-gray-50 disabled:opacity-40", children: [T ? t.jsx(b, { size: 14, className: "animate-spin" }) : t.jsx(le, { size: 14 }), "\u5BFC\u51FA ZIP"] }), t.jsxs("button", { type: "button", disabled: T || R, onClick: () => void Ne(), className: "flex items-center gap-1 rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs hover:bg-gray-50 disabled:opacity-40", children: [R ? t.jsx(b, { size: 14, className: "animate-spin" }) : t.jsx(le, { size: 14 }), "\u5BFC\u51FA PPT"] })] }), t.jsx("button", { type: "button", disabled: y, onClick: () => void K(), className: "rounded-lg border border-gray-200 px-3 py-1.5 text-xs hover:bg-gray-50 disabled:opacity-40", children: u.length > 0 ? "\u91CD\u65B0\u751F\u6210" : "\u751F\u6210" })] })] }), t.jsxs("div", { className: "flex min-h-0 flex-1", children: [t.jsxs("aside", { className: "flex w-[38%] min-w-[280px] max-w-[480px] flex-col border-r border-gray-200 bg-white", children: [t.jsxs("div", { className: "flex-1 overflow-y-auto p-4 space-y-3", children: [H.length === 0 && !y && t.jsxs("div", { className: "flex flex-col items-center justify-center gap-2 py-12 text-center", children: [t.jsx(Ee, { size: 32, className: "text-gray-200" }), t.jsxs("p", { className: "text-xs text-gray-400", children: ["\u8F93\u5165\u4E3B\u9898\u540E\uFF0CAI \u5C06\u4E3A\u4F60\u751F\u6210\u5E7B\u706F\u7247\u3002", t.jsx("br", {}), "\u751F\u6210\u540E\u4E5F\u53EF\u5728\u6B64\u8C03\u6574\u7ED3\u6784\u3001\u8BED\u6C14\u6216\u589E\u5220\u9875\u9762\u3002"] })] }), H.map((e, a) => e.role === "user" ? t.jsx("div", { className: "ml-8 rounded-xl bg-gray-100 px-3 py-2 text-sm text-gray-900", children: e.content }, a) : e.role === "assistant" ? t.jsx("div", { className: "mr-8 rounded-xl bg-violet-50 px-3 py-2 text-sm text-gray-700", children: e.content }, a) : t.jsxs("div", { className: "rounded-lg border border-blue-100 bg-blue-50/80 px-3 py-2 text-xs text-blue-900", children: [t.jsxs("button", { type: "button", onClick: () => h((n) => n.map((o, d) => d === a && o.role === "stage" ? { ...o, expanded: !o.expanded } : o)), className: "flex w-full items-center gap-1 text-left", children: [e.expanded ? t.jsx("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", children: t.jsx("path", { d: "M3 4.5L6 7.5L9 4.5", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) }) : t.jsx("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", children: t.jsx("path", { d: "M4.5 3L7.5 6L4.5 9", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) }), t.jsx("span", { className: "font-medium", children: e.label }), e.done && t.jsx("span", { className: "ml-1 text-blue-600/60", children: "\xB7 \u5B8C\u6210" }), y && !e.done && a === H.length - 1 && t.jsx(b, { size: 10, className: "ml-1 animate-spin text-blue-600" })] }), e.expanded && e.content && t.jsx("pre", { className: "mt-1.5 max-h-40 overflow-auto rounded-md border border-blue-100 bg-white/70 p-2 font-mono text-[10px] leading-relaxed text-gray-700 whitespace-pre-wrap break-all", children: e.content })] }, a)), O && t.jsx("div", { className: "rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700", children: O })] }), t.jsx("div", { className: "border-t border-gray-100 p-3", children: t.jsxs("div", { className: "flex items-end gap-2 rounded-xl border border-gray-200 bg-gray-50 p-2", children: [t.jsx("textarea", { value: _, onChange: (e) => ee(e.target.value), onKeyDown: (e) => {
    e.key === "Enter" && !e.shiftKey && (e.preventDefault(), ne());
  }, placeholder: "\u8C03\u6574\u7ED3\u6784\u6216\u5185\u5BB9\u2026", rows: 2, className: "flex-1 resize-none bg-transparent text-sm outline-none", disabled: y }), t.jsx("button", { type: "button", disabled: !_.trim() || y, onClick: () => void ne(), className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-900 text-white disabled:bg-gray-200", children: y ? t.jsx(b, { size: 14, className: "animate-spin" }) : t.jsx($e, { size: 14 }) })] }) })] }), t.jsxs("main", { className: "relative flex min-w-0 flex-1 flex-col bg-gray-100", children: [t.jsx("div", { className: "flex shrink-0 border-b border-gray-200 bg-white", children: t.jsxs("button", { type: "button", onClick: () => fe("pptx"), className: Le("flex items-center gap-1.5 px-4 py-2 text-xs font-medium transition", w === "pptx" ? "border-b-2 border-violet-500 text-violet-700" : "text-gray-500 hover:text-gray-700"), children: [t.jsx(Ce, { size: 14 }), "PPTX \u9884\u89C8"] }) }), t.jsxs("div", { className: "relative flex min-h-0 flex-1", children: [y && !we && w === "html" && t.jsxs("div", { className: "absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-gray-100/90 p-8", children: [t.jsx(b, { className: "animate-spin text-gray-400", size: 32 }), t.jsxs("p", { className: "text-sm text-gray-500", children: [ge || "\u6B63\u5728\u751F\u6210\u2026", " ", se > 0 && `(${se}/${be || "?"})`] })] }), w === "html" && t.jsxs(t.Fragment, { children: [D && t.jsxs("div", { className: "flex h-full items-center justify-center text-sm text-gray-400", children: [t.jsx(b, { className: "mr-2 animate-spin", size: 16 }), " \u52A0\u8F7D\u9884\u89C8\u2026"] }), !D && A ? t.jsx("iframe", { title: "slide-preview", srcDoc: A, className: "h-full w-full border-0 bg-white", sandbox: "allow-scripts allow-same-origin" }) : !y && !D ? t.jsx("div", { className: "flex h-full items-center justify-center text-sm text-gray-400", children: "HTML \u9884\u89C8\u5C06\u5728\u6B64\u663E\u793A" }) : null] }), w === "pptx" && t.jsxs(t.Fragment, { children: [he && t.jsxs("div", { className: "absolute inset-0 z-10 flex items-center justify-center bg-gray-100/80 text-sm text-gray-500", children: [t.jsx(b, { className: "mr-2 animate-spin", size: 16 }), "\u6B63\u5728\u751F\u6210 PPTX \u9884\u89C8\u2026"] }), t.jsx(He, { fallback: t.jsx("div", { className: "flex flex-1 flex-col items-center justify-center gap-2 p-8 text-sm text-gray-500", children: t.jsx("p", { children: "PPTX \u9884\u89C8\u6682\u4E0D\u53EF\u7528\uFF0C\u8BF7\u5207\u6362\u56DE HTML \u9884\u89C8" }) }), children: t.jsx(Me, { pptxBytes: me, deckLabel: i || null, className: "flex-1", hideToolbarSettings: true }) })] })] })] })] })] });
}
function st() {
  const { projectId: s } = de(), [c] = _e(), l = c.get("engine"), [i, m] = r.useState(W(l) ? l : null), [p, v] = r.useState(!W(l));
  return r.useEffect(() => {
    if (W(l)) {
      m(l), v(false);
      return;
    }
    if (!s) {
      v(false);
      return;
    }
    let k = false;
    return (async () => {
      try {
        await ze.getProject(s), k || m("pptxgenjs");
      } catch {
        k || m("ohmyppt");
      } finally {
        k || v(false);
      }
    })(), () => {
      k = true;
    };
  }, [s, l]), p ? t.jsxs("div", { className: "flex h-full min-h-0 items-center justify-center bg-gray-50 text-sm text-gray-500", children: [t.jsx(b, { className: "mr-2 animate-spin", size: 18 }), "\u52A0\u8F7D\u9879\u76EE\u2026"] }) : i === "pptxgenjs" && s ? t.jsx(Ie, { homePath: ue(), useSlideGlancePreview: true }) : t.jsx(Xe, {});
}
export {
  st as default
};
