import { j as t } from "./three-BECTMk9d.js";
import { a as o } from "./monaco-BSfMmt4N.js";
import { G as Fe, H as kt, I as Ze, J as wt, R as yt, K as et, S as De, N as jt, O as te, Q as vt, U as St, V as Le, W as Nt, X as Ct, Y as Rt, w as re, Z as Ne, _ as $t, $ as Et, a0 as Wt, a1 as Qe, x as It, a2 as tt, a3 as Mt, a4 as Tt, s as Pt, a5 as _t, a6 as Ge, a7 as Je, r as At, a8 as Dt, a9 as st, C as zt, u as Ft, p as Lt, aa as Ut, ab as Te, ac as Kt, ad as Ot, ae as Bt, P as Ht, M as rt, af as Qt, ag as Gt, ah as Jt, ai as Vt, E as Xt, o as Yt, T as qt } from "./main-BsigD1-c.js";
import "./charts-Cx7lSOSv.js";
function Zt({ value: e, onChange: s, onSend: r, placeholder: a, disabled: l = false, isStreaming: i = false, onStop: f, libraryFiles: k = [] }) {
  const { addToast: b } = Fe(), [S, p] = o.useState([]), [T, v] = o.useState(false), N = l, $ = o.useCallback(() => {
    if (N || i) return;
    const g = document.createElement("input");
    g.type = "file", g.multiple = true, g.onchange = (A) => {
      const V = A.target, y = Array.from(V.files || []);
      if (y.length === 0) return;
      const P = [];
      for (const R of y) {
        const K = kt(R);
        if (K) {
          b("error", `${R.name}: ${K}`);
          continue;
        }
        P.push({ id: `local-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`, name: R.name, type: "local", file: R, size: R.size, mimeType: R.type });
      }
      P.length !== 0 && (p((R) => [...R, ...P]), Ze("attachment_state", "dashboard local files queued", { added: P.map((R) => R.name) }));
    }, g.click();
  }, [N, i, b]), G = o.useCallback((g) => {
    N || i || (p((A) => [...A, { id: g.id, name: g.name, type: "library" }]), v(false));
  }, [N, i]), E = (g) => {
    if (g.endsWith("@") && (g.length === 1 || /\s/.test(g[g.length - 2] ?? ""))) {
      v(true), s(g.slice(0, -1));
      return;
    }
    s(g);
  }, _ = () => {
    N || !e.trim() && S.length === 0 || (r(S), p([]), v(false));
  };
  return t.jsxs("div", { className: "space-y-2", children: [S.length > 0 ? t.jsx(wt, { attachments: S, onRemove: (g) => p((A) => A.filter((V) => V.id !== g)) }) : null, t.jsxs("div", { className: "relative overflow-visible rounded border border-zinc-200 bg-white shadow-sm transition-all duration-200 focus-within:border-zinc-300 dark:border-none dark:bg-white/5", children: [T ? t.jsx(yt, { files: k, onClose: () => v(false), onPick: G }) : null, t.jsxs("div", { className: "flex items-end gap-2 overflow-hidden rounded-3xl px-2 py-2", children: [t.jsx("textarea", { value: e, onChange: (g) => E(g.target.value), onKeyDown: (g) => {
    g.key === "Enter" && !g.shiftKey && (g.preventDefault(), _());
  }, placeholder: a, rows: 2, disabled: N, className: "min-h-[44px] flex-1 resize-none border-0 bg-transparent px-1 py-1 text-sm text-slate-800 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500" }), i ? t.jsx("button", { type: "button", onClick: f, className: "mb-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-red-200 text-red-600 transition-colors hover:bg-red-50 dark:border-red-400/30 dark:hover:bg-red-900/30", title: "\u505C\u6B62", children: t.jsx(et, { size: 16 }) }) : t.jsx("button", { type: "button", onClick: _, disabled: N || !e.trim() && S.length === 0, className: "mb-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white transition-colors hover:bg-slate-800 disabled:opacity-40 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white", title: "\u53D1\u9001", children: t.jsx(De, { size: 16 }) })] }), t.jsxs("div", { className: "flex items-center gap-1 border-t border-zinc-200/70 bg-zinc-50/70 px-3 py-2 dark:border-white/10 dark:bg-white/5", children: [t.jsxs("button", { type: "button", onClick: $, disabled: i || N, className: te("flex items-center gap-1 rounded-md px-2 py-1 text-xs transition-colors", i || N ? "cursor-not-allowed text-zinc-300 dark:text-white/30" : "text-zinc-500 hover:bg-zinc-200/50 hover:text-zinc-700 dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white"), children: [t.jsx(jt, { size: 12 }), t.jsx("span", { className: "hidden sm:inline", children: "\u672C\u5730\u6587\u4EF6" })] }), k.length > 0 ? t.jsxs("button", { type: "button", onClick: () => v((g) => !g), disabled: i || N, className: te("flex items-center gap-1 rounded-md px-2 py-1 text-xs transition-colors", i || N ? "cursor-not-allowed text-zinc-300 dark:text-white/30" : "text-zinc-500 hover:bg-zinc-200/50 hover:text-zinc-700 dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white"), children: [t.jsx(vt, { size: 12 }), t.jsx("span", { className: "hidden sm:inline", children: "\u8D44\u6599\u5E93" })] }) : null] })] })] });
}
const es = { ShieldCheck: t.jsx(Le, { size: 12 }), Search: t.jsx(Rt, { size: 12 }), Database: t.jsx(Ct, { size: 12 }), Newspaper: t.jsx(Nt, { size: 12 }) };
function ts({ skillGroups: e, activeGroupId: s, onActiveGroupChange: r, intelligenceSkills: a, onSkillClick: l, disabled: i = false }) {
  const f = o.useMemo(() => e.find((S) => S.id === s) ?? e[0] ?? null, [e, s]), k = o.useMemo(() => St(a, f), [a, f]);
  if (e.length === 0 && k.length === 0) return null;
  const b = e.length > 1;
  return t.jsxs("div", { className: "flex flex-col gap-2", children: [b && t.jsx("div", { className: "flex flex-wrap items-center gap-1 border-b border-slate-200/80 pb-1.5 dark:border-slate-700", role: "tablist", "aria-label": "\u6280\u80FD\u5206\u7EC4", children: e.map((S) => t.jsx("button", { type: "button", role: "tab", "aria-selected": s === S.id, onClick: () => r(S.id), className: te("shrink-0 rounded-lg px-2.5 py-1 text-[11px] font-medium transition-colors", s === S.id ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900" : "text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"), children: S.name }, S.id)) }), t.jsx("div", { className: "flex flex-wrap gap-1.5", role: "tabpanel", "aria-label": (f == null ? void 0 : f.name) ?? "\u6280\u80FD", children: k.length === 0 ? t.jsx("span", { className: "text-[11px] text-slate-400 dark:text-slate-500", children: "\u6682\u65E0\u53EF\u7528\u6280\u80FD" }) : k.map((S) => t.jsxs("button", { type: "button", onClick: () => l(S), disabled: i, className: te("flex shrink-0 items-center gap-1 rounded-xl border px-2.5 py-1 text-[11px] font-medium transition-all", i ? "cursor-not-allowed border-slate-100 text-slate-300 opacity-40 dark:border-slate-800" : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:bg-slate-800"), children: [t.jsx("span", { className: "text-slate-400 dark:text-slate-500", children: es[S.icon || ""] || t.jsx(Le, { size: 12 }) }), S.name] }, S.id)) })] });
}
const ss = /* @__PURE__ */ new Set(["fact_check", "info_research", "data_collection"]);
function ue(e) {
  return e != null && ss.has(e);
}
function le(e) {
  const s = e.startsWith("/") ? e : `/${e}`;
  return `${$t.baseUrl}${s}`;
}
function rs(e) {
  const s = new URLSearchParams({ session_id: e }), r = re();
  return r && s.set("token", r), `${le("/osint-dashboard/w6/stream")}?${s.toString()}`;
}
function ns(e) {
  var _a, _b;
  const s = { session_id: e.sessionId, skill_key: e.skillKey, form_data: e.formData };
  return ((_a = e.renderedPrompt) == null ? void 0 : _a.trim()) && (s.rendered_prompt = e.renderedPrompt.trim()), ((_b = e.reportStyle) == null ? void 0 : _b.trim()) && (s.report_style = e.reportStyle.trim()), s;
}
function as(e) {
  var _a;
  const s = { session_id: e.sessionId, form_data: e.formData };
  return ((_a = e.renderedPrompt) == null ? void 0 : _a.trim()) && (s.rendered_prompt = e.renderedPrompt.trim()), s;
}
function os(e) {
  return { session_id: e.sessionId, message: e.message };
}
function ls(e) {
  var _a;
  const s = { session_id: e.sessionId, message: e.message };
  return ((_a = e.targetResourceId) == null ? void 0 : _a.trim()) ? (s.target_resource_id = e.targetResourceId.trim(), s.mode = "edit_html") : e.mode && (s.mode = e.mode), s;
}
function oe(e) {
  if (!e) return "";
  const s = e.split("#")[0], r = s.match(/\/artifacts\/([^/?]+)\/preview/);
  return (r == null ? void 0 : r[1]) ? decodeURIComponent(r[1]) : (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(s), s);
}
const is = 36e4;
async function nt(e, s, r) {
  const a = re(), l = await fetch(le(e), { method: "POST", headers: { "Content-Type": "application/json", ...a ? { Authorization: `Bearer ${a}` } : {} }, body: JSON.stringify(s), signal: r });
  if (!l.ok) {
    Ne(l.status);
    const i = await l.json().catch(() => ({ detail: `HTTP ${l.status}` }));
    throw new Error(i.detail || `HTTP ${l.status}`);
  }
  return l.json();
}
async function Pe(e, s, r) {
  var _a;
  const a = re(), l = await fetch(le(e), { method: "POST", headers: { "Content-Type": "application/json", ...a ? { Authorization: `Bearer ${a}` } : {} }, body: JSON.stringify(s), signal: r });
  if (!l.ok) {
    Ne(l.status);
    const f = await l.json().catch(() => ({ detail: `HTTP ${l.status}` }));
    throw new Error(f.detail || `HTTP ${l.status}`);
  }
  const i = (_a = l.body) == null ? void 0 : _a.getReader();
  if (!i) throw new Error("No response body");
  return i;
}
async function cs(e) {
  await nt("/osint-dashboard/w6/stop", { session_id: e });
}
async function ds(e) {
  const s = re(), r = await fetch(`${le(`/osint-dashboard/sessions/${encodeURIComponent(e)}/state`)}?t=${Date.now()}`, { headers: s ? { Authorization: `Bearer ${s}` } : {} });
  return r.ok ? await r.json() : (r.status === 404 || Ne(r.status), null);
}
async function at(e) {
  const s = re(), r = await fetch(`${le(`/osint-dashboard/sessions/${encodeURIComponent(e)}/reports`)}?t=${Date.now()}`, { headers: s ? { Authorization: `Bearer ${s}` } : {} });
  if (!r.ok) return r.status === 404 ? [] : (Ne(r.status), []);
  const a = await r.json();
  return (Array.isArray(a) ? a : a.reports ?? []).map((i) => ({ id: i.id, url: i.url || i.id, title: i.title || i.name || "\u62A5\u544A", type: i.type }));
}
function us(e) {
  if (!e) return "";
  const s = le(`/artifacts/${encodeURIComponent(e)}/download`), r = re();
  if (!r) return s;
  const a = s.includes("?") ? "&" : "?";
  return `${s}${a}token=${encodeURIComponent(r)}`;
}
function Ce(e) {
  if (!e) return "";
  if (e.startsWith("http") || e.startsWith("/")) return e;
  const s = le(`/artifacts/${encodeURIComponent(e)}/preview`), r = re();
  if (!r) return s;
  const a = s.includes("?") ? "&" : "?";
  return `${s}${a}token=${encodeURIComponent(r)}`;
}
const ve = "@w6 ";
function fs(e) {
  const s = e.trimStart();
  return s.startsWith("@w6 ") || s.toLowerCase().startsWith("@w6 ");
}
function ms(e) {
  const s = e.trimStart();
  return s.toLowerCase().startsWith("@w6") ? s.slice(3).trimStart().trim() : e.trim();
}
function ze(e) {
  const s = e.trimStart();
  return s.toLowerCase().startsWith("@w6") ? s : `${ve}${e}`;
}
function ot(e) {
  return Object.entries(e).filter(([, s]) => s != null && String(s).trim() !== "").map(([s, r]) => Array.isArray(r) ? `${s}: ${r.join(", ")}` : `${s}: ${String(r)}`).join(`
`);
}
function hs(e, s) {
  const r = ot(s);
  return ze(`\u6267\u884C\uFF1A${e}${r ? `
${r}` : ""}`);
}
const xs = "active-v1", ps = "session-";
function lt(e) {
  return `osint-dashboard:${e}:`;
}
function it(e, s) {
  return `${lt(e)}${ps}${s}`;
}
function bs(e) {
  return `${lt(e)}${xs}`;
}
function gs(e, s) {
  try {
    const r = localStorage.getItem(it(e, s));
    if (!r) return null;
    const a = JSON.parse(r);
    return !a || !Array.isArray(a.messages) ? null : a;
  } catch {
    return null;
  }
}
function ks(e, s, r) {
  try {
    const a = { messages: r.messages || [], reports: r.reports || [], activeReportId: r.activeReportId ?? null, followUpQuestions: r.followUpQuestions || [], skillKey: r.skillKey ?? null, sessionId: s, savedAt: Date.now() };
    localStorage.setItem(it(e, s), JSON.stringify(a)), localStorage.setItem(bs(e), s);
  } catch {
  }
}
function ws(e) {
  const s = e.trim();
  return s ? /(改成|改为|调整|优化|修改|换成|背景|颜色|配色|字体|排版|布局|间距|样式|风格|字号|边距|对齐|居中|加粗|缩小|放大|去掉|删除|增加|添加|报告排版|视觉风格|章节结构)/.test(s) ? true : /[？?]$/.test(s) ? false : s.length <= 120 : false;
}
let ys = 0;
function _e() {
  return `msg-${++ys}-${Date.now()}`;
}
function js(e) {
  const s = e.messages ?? [];
  return s.length === 0 ? [] : s.filter((r) => {
    var _a;
    return r.role === "w6" || ((_a = r.content) == null ? void 0 : _a.trim());
  }).map((r, a) => {
    const l = r.role === "user" || r.role === "assistant" || r.role === "system" || r.role === "w6" ? r.role : "assistant";
    return { id: `srv-${a}-${r.timestamp ?? Date.now()}`, role: l, content: r.content, timestamp: r.timestamp ?? Date.now(), followUpQuestions: r.follow_up_questions ?? null, ...l === "w6" ? { w6Status: "done", w6LastLine: r.content || "W6 \u8C03\u7814\u5DF2\u5B8C\u6210", w6Events: [] } : {} };
  });
}
function ct(e) {
  return e === "document";
}
function Se(e, s, r) {
  const a = Ce(e);
  return { id: `${a}#${r}`, url: a, resourceId: e, title: s, timestamp: Date.now(), kind: "html" };
}
function he(e, s, r, a) {
  const l = e ? Ce(e) : "";
  return { id: a ? `md-inline#${r}` : `${l || e}#md-${r}`, url: l, resourceId: e, title: s, timestamp: Date.now(), kind: "markdown", markdown: a };
}
async function vs(e) {
  const s = await at(e);
  if (s.length === 0) return { reports: [], activeReportId: null };
  const r = s.map((i, f) => {
    const k = oe(i.url || i.id), b = i.title || "\u62A5\u544A";
    return ct(i.type) ? he(k, b, `r${f}`) : Se(k || i.url || i.id, b, `r${f}`);
  }), a = r.filter((i) => i.kind === "html"), l = a.length > 0 ? a[a.length - 1].id : r[r.length - 1].id;
  return { reports: r, activeReportId: l };
}
function Ss(e, s, r) {
  s.setMessages(e.messages), s.setReports((e.reports ?? []).map((a) => ({ ...a, resourceId: a.resourceId || oe(a.url), kind: a.kind || "html" }))), s.setActiveReportId(e.activeReportId), s.setFollowUpQuestions(e.followUpQuestions ?? []), e.sessionId && (r.sessionIdRef.current = e.sessionId, s.setSessionId(e.sessionId)), e.skillKey && (r.skillKeyRef.current = e.skillKey, s.setSkillKey(e.skillKey), ue(e.skillKey) && e.sessionId && s.setW6StreamEnabled(true));
}
function Ns(e) {
  const [s, r] = o.useState([]), [a, l] = o.useState([]), [i, f] = o.useState(null), [k, b] = o.useState(false), [S, p] = o.useState(""), [T, v] = o.useState(null), [N, $] = o.useState([]), [G, E] = o.useState(null), [_, g] = o.useState(false), [A, V] = o.useState(0), [y, P] = o.useState(null), R = o.useRef(null), K = o.useRef(""), O = o.useRef(""), d = o.useRef(""), j = o.useRef(null), B = o.useRef(null), fe = o.useRef(null), [Re, X] = o.useState(null), L = o.useCallback(() => {
    const n = e, h = j.current;
    !n || !h || s.length === 0 && a.length === 0 || ks(n, h, { messages: s, reports: a, activeReportId: i, followUpQuestions: N, skillKey: B.current });
  }, [e, s, a, i, N]);
  o.useEffect(() => {
    L();
  }, [L]);
  const D = o.useCallback((n) => {
    const h = { ...n, id: _e(), timestamp: Date.now() };
    return r((u) => [...u, h]), h.id;
  }, []), Z = o.useCallback(() => {
    const n = D({ role: "w6", content: "", w6Status: "running", w6Progress: 0, w6LastLine: "\u6B63\u5728\u542F\u52A8 W6 \u5B50 Agent\u2026", w6Events: [] });
    return d.current = n, X(n), ue(B.current) && (g(true), V((h) => h + 1)), n;
  }, [D]), ie = o.useCallback((n) => {
    const h = d.current;
    if (!h) return;
    let u = "running";
    n.status === "error" ? u = "error" : n.events.some((x) => x.type === "stopped") ? u = "stopped" : (n.events.some((x) => x.type === "done") || n.status === "idle" && n.events.length > 0) && (u = "done"), r((x) => x.map((m) => m.id === h ? { ...m, w6Status: u, w6Progress: n.progress, w6LastLine: n.lastLine, w6Events: n.events } : m)), (u === "done" || u === "error" || u === "stopped") && (d.current = "", X(null));
  }, []), H = o.useCallback((n) => {
    K.current += n;
    const h = O.current;
    r((u) => {
      const x = u.findIndex((W) => W.id === h);
      if (x === -1) return u;
      const m = [...u];
      return m[x] = { ...m[x], content: K.current }, m;
    });
  }, []), me = o.useCallback(() => (n) => {
    var _a, _b, _c;
    const h = !!d.current;
    switch (n.type) {
      case "text_delta":
        h || H(n.delta || "");
        break;
      case "phase":
        h || p(n.message || n.phase || "");
        break;
      case "form_request":
        n.schema && v({ schema: n.schema, message: n.message || "\u8BF7\u8865\u5145\u4FE1\u606F" });
        break;
      case "report_md":
        ((_a = n.markdown) == null ? void 0 : _a.trim()) && (fe.current = { markdown: n.markdown, title: n.title }, l((u) => u.some((x) => x.kind === "markdown" && x.markdown === n.markdown) ? u : [...u, he("", n.title || "\u7814\u7A76\u62A5\u544A (MD)", `sse-${Date.now()}`, n.markdown)]));
        break;
      case "report_html":
        if (n.url || n.id) {
          const u = n.url || n.id || "", x = oe(u), m = Se(x || u, n.title || "\u672A\u547D\u540D\u62A5\u544A", String(Date.now()));
          l((M) => [...M, m]), f(m.id);
          const W = fe.current;
          if ((_b = W == null ? void 0 : W.markdown) == null ? void 0 : _b.trim()) {
            const M = he("", n.title ? `${n.title} (MD)` : "\u7814\u7A76\u62A5\u544A (MD)", `paired-${Date.now()}`, W.markdown);
            l((z) => z.some((F) => F.kind === "markdown" && (F.markdown === W.markdown || F.title === M.title)) ? z : [...z, M]), fe.current = null;
          }
        }
        break;
      case "follow_up":
        if (((_c = n.questions) == null ? void 0 : _c.length) && ($(n.questions), !h)) {
          const u = O.current;
          r((x) => {
            const m = x.findIndex((M) => M.id === u);
            if (m === -1) return x;
            const W = [...x];
            return W[m] = { ...W[m], followUpQuestions: n.questions }, W;
          });
        }
        break;
      case "session":
        if (n.sessionId) {
          const u = String(n.sessionId);
          j.current = u, E(u), ue(B.current) && g(true);
        }
        break;
      case "error":
        if (h) {
          const u = d.current;
          r((x) => x.map((m) => m.id === u ? { ...m, w6Status: "error", w6LastLine: n.message || "W6 \u6267\u884C\u51FA\u9519" } : m)), d.current = "", X(null);
        } else H(`

\u26A0\uFE0F ${n.message}`);
        break;
    }
  }, [H]), Y = o.useCallback(async (n) => {
    const h = me(), u = new TextDecoder();
    let x = "";
    for (; ; ) {
      const { done: m, value: W } = await n.read();
      if (m) break;
      x += u.decode(W, { stream: true });
      const M = x.split(`
`);
      x = M.pop() || "";
      for (const z of M) {
        if (!z.startsWith("data: ")) continue;
        const I = z.slice(6).trim();
        if (I) try {
          h(JSON.parse(I));
        } catch {
        }
      }
    }
  }, [me]), xe = o.useCallback(async (n, h, u, x, m, W) => {
    const M = x.trim();
    if (!M) throw new Error("session_id required before starting W6 chat");
    if (!n.trim()) throw new Error("skill_key required before starting W6 chat");
    l([]), f(null), v(null), $([]), K.current = "", B.current = n, P(n), j.current = M, E(M), ue(n) || g(false), b(true), D({ role: "user", content: hs(h, u) }), Z(), O.current = "";
    const z = new AbortController();
    R.current = z;
    try {
      const I = await Pe("/osint-dashboard/chat/start", ns({ sessionId: M, skillKey: n, formData: u, renderedPrompt: m, reportStyle: W }), z.signal);
      await Y(I);
    } catch (I) {
      if (I.name === "AbortError") return;
      H(`

\u274C \u9519\u8BEF: ${I.message}`);
    } finally {
      b(false), p(""), R.current = null;
    }
  }, [D, H, Z, Y]), pe = o.useCallback(async (n, h) => {
    v(null), b(true);
    const u = ot(n);
    D({ role: "user", content: ze(`\u8865\u5145\u4FE1\u606F${u ? `
${u}` : ""}`) }), Z(), O.current = "";
    const x = new AbortController();
    R.current = x;
    try {
      const m = j.current;
      if (!m) throw new Error("session_id required");
      const W = await Pe("/osint-dashboard/chat/respond", as({ sessionId: m, formData: n, renderedPrompt: h }), x.signal);
      await Y(W);
    } catch (m) {
      if (m.name === "AbortError") return;
      H(`

\u274C ${m.message}`);
    } finally {
      b(false), p(""), R.current = null;
    }
  }, [D, H, Z, Y]), ne = o.useCallback(async (n, h) => {
    const u = j.current;
    if (!u) {
      D({ role: "system", content: "\u26A0\uFE0F \u8BF7\u5148\u5B8C\u6210\u4E00\u4E2A\u7814\u7A76\u4EFB\u52A1\uFF0C\u518D\u5F00\u59CB\u8FFD\u95EE" });
      return;
    }
    b(true), D({ role: "user", content: n }), Z(), O.current = "", K.current = "";
    const x = new AbortController();
    R.current = x;
    try {
      const m = await Pe("/osint-dashboard/chat/message", os({ sessionId: u, message: h }), x.signal);
      await Y(m);
    } catch (m) {
      if (m.name === "AbortError") return;
      H(`

\u274C ${m.message}`);
    } finally {
      b(false), p(""), R.current = null;
    }
  }, [D, H, Z, Y]), ce = o.useCallback(async (n, h) => {
    const u = j.current;
    if (!u) {
      D({ role: "system", content: "\u26A0\uFE0F \u8BF7\u5148\u5B8C\u6210\u4E00\u4E2A\u7814\u7A76\u4EFB\u52A1\uFF0C\u518D\u5F00\u59CB\u8FFD\u95EE" });
      return;
    }
    const x = !!(h == null ? void 0 : h.trim());
    b(true), p(x ? "\u6539\u7248\u5F0F\u4E2D\u2026" : "\u5206\u6790\u62A5\u544A\u4E2D\u2026"), D({ role: "user", content: n });
    const m = D({ role: "assistant", content: "" });
    O.current = m, K.current = "";
    const W = new AbortController();
    R.current = W;
    let M;
    x && (M = setTimeout(() => W.abort(), is));
    try {
      const z = await nt("/osint-dashboard/chat/discuss", ls({ sessionId: u, message: n, targetResourceId: x ? h : void 0 }), W.signal), I = (z.reply ?? "").trim() || "\uFF08\u65E0\u56DE\u590D\uFF09";
      if (K.current = I, r((F) => {
        const Q = F.findIndex((ee) => ee.id === m);
        if (Q === -1) return F;
        const J = [...F];
        return J[Q] = { ...J[Q], content: I }, J;
      }), z.edited && z.html_resource_id) {
        const F = Ce(z.html_resource_id), Q = i;
        l((J) => J.map((ee) => Q && ee.id !== Q || !Q && J.length > 0 && ee.id !== J[J.length - 1].id ? ee : { ...ee, url: `${F}${F.includes("?") ? "&" : "?"}t=${Date.now()}`, resourceId: z.html_resource_id, timestamp: Date.now() }));
      }
    } catch (z) {
      if (z.name === "AbortError") {
        x && H(`

\u274C \u62A5\u544A\u6539\u7248\u5F0F\u8BF7\u6C42\u8D85\u65F6\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u6216\u5C1D\u8BD5\u66F4\u7B80\u77ED\u7684\u4FEE\u6539\u6307\u4EE4\u3002`);
        return;
      }
      H(`

\u274C ${z.message}`);
    } finally {
      M !== void 0 && clearTimeout(M), b(false), p(""), R.current = null;
    }
  }, [D, H, i]), be = o.useCallback(async (n) => {
    if (!n.trim() || k) return;
    const h = ze(n.trim());
    await ne(h, n.trim());
  }, [k, ne]), ge = o.useCallback(async (n) => {
    var _a;
    if (!n.trim() || k) return;
    const h = n.trim();
    if (fs(h)) {
      await ne(h, ms(h));
      return;
    }
    const u = i ? a.find((W) => W.id === i) : a[a.length - 1], x = ((_a = u == null ? void 0 : u.resourceId) == null ? void 0 : _a.trim()) || oe((u == null ? void 0 : u.url) || ""), m = x && ws(h) ? x : void 0;
    await ce(h, m);
  }, [k, ne, ce, i, a]), ke = o.useCallback(async (n) => {
    var _a, _b, _c, _d;
    (_a = R.current) == null ? void 0 : _a.abort(), b(false), p(""), v(null);
    const h = e ? gs(e, n) : null;
    let u = null;
    try {
      u = await ds(n);
    } catch {
    }
    const x = u ? js(u) : [], m = x.length > 0, W = !m && !!h;
    j.current = n, E(n);
    const M = ((_b = u == null ? void 0 : u.skill_key) == null ? void 0 : _b.trim()) || ((_c = h == null ? void 0 : h.skillKey) == null ? void 0 : _c.trim()) || null;
    if (B.current = M, P(M), ue(M) ? (g(true), ((u == null ? void 0 : u.w6_stream_active) || h || x.length > 0) && V((I) => I + 1)) : g(false), W && h) {
      Ss(h, { setMessages: r, setReports: l, setActiveReportId: f, setFollowUpQuestions: $, setSessionId: E, setW6StreamEnabled: g, setSkillKey: P }, { sessionIdRef: j, skillKeyRef: B });
      const I = [...h.messages].reverse().find((F) => F.role === "w6" && F.w6Status === "running");
      I && (d.current = I.id, X(I.id));
    } else if (m) r(x), $((u == null ? void 0 : u.follow_ups) ?? []);
    else {
      const I = (u == null ? void 0 : u.w6_stream_active) ? "\u5DF2\u91CD\u8FDE\u8FDB\u884C\u4E2D\u7684\u4F1A\u8BDD\uFF0CW6 \u5B50 Agent \u72B6\u6001\u89C1\u4E0B\u65B9\u8FDB\u5EA6\u6761\u3002" : "\u5DF2\u52A0\u8F7D\u4F1A\u8BDD\u3002\u53EF\u7EE7\u7EED\u8FFD\u95EE\u6216\u9009\u62E9\u6280\u80FD\u5F00\u59CB\u65B0\u4EFB\u52A1\u3002";
      r([{ id: _e(), role: "system", content: I, timestamp: Date.now() }]), $((u == null ? void 0 : u.follow_ups) ?? []);
    }
    if ((u == null ? void 0 : u.w6_stream_active) && r((I) => {
      const F = [...I].reverse().find((J) => J.role === "w6");
      if ((F == null ? void 0 : F.w6Status) === "running") return d.current = F.id, X(F.id), I;
      const Q = _e();
      return d.current = Q, X(Q), [...I, { id: Q, role: "w6", content: "", timestamp: Date.now(), w6Status: "running", w6Progress: 0, w6LastLine: "W6 \u5B50 Agent \u8FD0\u884C\u4E2D\u2026", w6Events: [] }];
    }), !W || (((_d = h == null ? void 0 : h.reports) == null ? void 0 : _d.length) ?? 0) === 0) try {
      const { reports: I, activeReportId: F } = await vs(n);
      I.length > 0 && (l(I), f(F));
    } catch {
    }
  }, [e]), we = o.useCallback(() => {
    var _a;
    (_a = R.current) == null ? void 0 : _a.abort(), r([]), l([]), f(null), v(null), $([]), p(""), K.current = "", O.current = "", d.current = "", X(null), j.current = null, B.current = null, P(null), E(null), g(false), V(0), b(false);
  }, []), $e = o.useCallback((n) => {
    j.current = n, E(n);
  }, []), Ee = o.useCallback((n) => {
    l((h) => h.filter((u) => u.id !== n)), f((h) => h === n ? null : h);
  }, []), se = o.useCallback((n) => {
    const h = n.resourceId || oe(n.url), u = { ...n, resourceId: h, kind: n.kind || "html" };
    l((x) => {
      var _a;
      return u.resourceId && x.some((m) => m.resourceId === u.resourceId && m.kind === u.kind) || u.kind === "markdown" && ((_a = u.markdown) == null ? void 0 : _a.trim()) && x.some((m) => m.kind === "markdown" && m.markdown === u.markdown) ? x : [...x, u];
    }), u.kind === "html" && f(u.id);
  }, []), We = o.useCallback(async (n) => {
    var _a, _b;
    ((_a = n.followUps) == null ? void 0 : _a.length) && $(n.followUps), ((_b = n.markdown) == null ? void 0 : _b.trim()) && se(he("", n.roundTitle ? `${n.roundTitle} (MD)` : "\u7814\u7A76\u62A5\u544A (MD)", `w6-md-${Date.now()}`, n.markdown));
    const h = n.reportUrl || n.previewFile;
    if (h) {
      se(Se(oe(h), n.roundTitle || "\u62A5\u544A", `w6-${Date.now()}`));
      return;
    }
    const u = j.current;
    if (u) try {
      const x = await at(u);
      if (x.length === 0) return;
      for (const m of x) {
        const W = oe(m.url || m.id);
        ct(m.type) ? se(he(W, m.title || "\u7814\u7A76\u62A5\u544A (MD)", `w6-fb-${m.id}`)) : se(Se(W, m.title || "\u62A5\u544A", `w6-fb-${m.id}`));
      }
    } catch {
    }
  }, [se]), Ie = o.useCallback(() => {
    var _a;
    (_a = R.current) == null ? void 0 : _a.abort(), b(false), p("");
  }, []), ye = o.useCallback((n, h) => {
    const u = (h == null ? void 0 : h.map((m) => m.name).filter(Boolean)) ?? [], x = u.length > 0 ? `${n.trim()}

\u{1F4CE} ${u.join("\u3001")}`.trim() : n.trim();
    D({ role: "user", content: x });
  }, [D]);
  return { messages: s, reports: a, activeReportId: i, isStreaming: k, currentPhase: S, currentForm: T, followUpQuestions: N, sessionId: G, w6StreamEnabled: _, w6StreamRound: A, skillKey: y, startChat: xe, respondToForm: pe, sendMessage: ge, sendW6Message: be, abort: Ie, resetForNewSkill: we, closeReport: Ee, setActiveReportId: f, restoreSession: ke, bindSession: $e, addReportFromW6Done: We, skillKeyRef: B, activeW6MessageId: Re, syncActiveW6Message: ie, appendUserMessage: ye };
}
function Cs(e, s) {
  return e ? e.type === s.type && e.message === s.message && e.token === s.token && e.progress === s.progress : false;
}
function Rs(e, s, r, a, l, i, f) {
  s((b) => Cs(b[b.length - 1], e) ? b : [...b, e]), e.progress != null && r(e.progress);
  const k = e.message || e.token || "";
  k && a(k.slice(0, 120)), e.type === "done" && (l("idle"), i("closed"), f.close()), e.type === "stopped" && (l("idle"), i("closed"), f.close()), e.type === "error" && (l("error"), i("error"), f.close());
}
function $s(e, s, r = 0) {
  const [a, l] = o.useState([]), [i, f] = o.useState("idle"), [k, b] = o.useState("idle"), [S, p] = o.useState(0), [T, v] = o.useState(""), N = o.useRef(null), $ = o.useCallback(() => {
    var _a;
    if (!e || !s) return;
    (_a = N.current) == null ? void 0 : _a.close(), l([]), f("running"), b("connecting"), p(0), v("");
    const _ = new EventSource(rs(e));
    N.current = _, _.onopen = () => b("open"), _.onmessage = (g) => {
      try {
        const A = JSON.parse(g.data);
        Rs(A, l, p, v, f, b, _);
      } catch {
      }
    }, _.onerror = () => {
      b((g) => g === "closed" ? g : "error"), f((g) => g === "idle" ? g : "error"), _.close();
    };
  }, [e, s]);
  o.useEffect(() => {
    var _a;
    return s && e ? $() : ((_a = N.current) == null ? void 0 : _a.close(), s || (l([]), f("idle"), b("idle"), p(0), v(""))), () => {
      var _a2;
      (_a2 = N.current) == null ? void 0 : _a2.close();
    };
  }, [e, s, r, $]);
  const G = o.useCallback(() => {
    var _a;
    (_a = N.current) == null ? void 0 : _a.close(), l([]), f("idle"), b("idle"), p(0), v("");
  }, []), E = o.useCallback(async () => {
    var _a;
    if (e) {
      (_a = N.current) == null ? void 0 : _a.close(), f("idle"), b("closed"), v("\u5DF2\u624B\u52A8\u505C\u6B62 W6 \u8C03\u7814");
      try {
        await cs(e);
      } catch {
        f("error"), b("error"), v("\u505C\u6B62 W6 \u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5");
      }
    }
  }, [e]);
  return { events: a, status: i, connection: k, progress: S, lastLine: T, reset: G, stop: E, reconnect: $ };
}
function Es(e) {
  const [s, r] = o.useState(""), [a, l] = o.useState(false), [i, f] = o.useState(null);
  return o.useEffect(() => {
    var _a, _b;
    if (!e || e.kind !== "markdown") {
      r(""), f(null), l(false);
      return;
    }
    if ((_a = e.markdown) == null ? void 0 : _a.trim()) {
      r(e.markdown), f(null), l(false);
      return;
    }
    const k = (_b = e.resourceId) == null ? void 0 : _b.trim();
    if (!k) {
      r(""), f("\u6682\u65E0 Markdown \u5185\u5BB9"), l(false);
      return;
    }
    let b = false;
    const S = new AbortController();
    l(true), f(null);
    const p = re(), T = { Accept: "text/markdown,text/plain,*/*" };
    p && (T.Authorization = `Bearer ${p}`);
    const v = e.url || Ce(k), N = p ? `${v}${v.includes("?") ? "&" : "?"}token=${encodeURIComponent(p)}` : v;
    return fetch(N, { headers: T, signal: S.signal }).then(async ($) => {
      if (!$.ok) throw new Error(`HTTP ${$.status}`);
      return $.text();
    }).then(($) => {
      b || r($);
    }).catch(($) => {
      b || $ instanceof DOMException && $.name === "AbortError" || f($ instanceof Error ? $.message : "\u52A0\u8F7D\u5931\u8D25");
    }).finally(() => {
      b || l(false);
    }), () => {
      b = true, S.abort();
    };
  }, [e]), { content: s, loading: a, error: i };
}
function Ws({ reports: e, activeReportId: s, onActiveChange: r, onReportClose: a }) {
  const { addToast: l } = Fe(), [i, f] = o.useState(0), [k, b] = o.useState(null), S = o.useRef(e.length);
  o.useEffect(() => {
    if (e.length === 0 || s && e.some((R) => R.id === s)) return;
    const y = e.filter((R) => R.kind === "html"), P = y.length > 0 ? y[y.length - 1] : e[e.length - 1];
    r(P.id);
  }, [e, s, r]), o.useEffect(() => {
    if (s && e.length > S.current) {
      const y = e[e.length - 1];
      y.kind === "html" && r(y.id);
    }
    S.current = e.length;
  }, [s, e, r]);
  const p = e.find((y) => y.id === s), { content: T, loading: v, error: N } = Es(p), $ = (p == null ? void 0 : p.kind) === "markdown" && !v && !N && !!T.trim(), G = o.useCallback(() => {
    var _a;
    const y = (_a = p == null ? void 0 : p.resourceId) == null ? void 0 : _a.trim();
    if (!y) {
      l("error", "\u65E0\u6CD5\u4E0B\u8F7D\u8BE5\u62A5\u544A");
      return;
    }
    window.open(us(y), "_blank"), l("success", "\u4E0B\u8F7D\u5DF2\u5F00\u59CB");
  }, [p == null ? void 0 : p.resourceId, l]), E = o.useCallback(async () => {
    const y = T.trim();
    if (!y) {
      l("error", "\u6682\u65E0\u5185\u5BB9\u53EF\u5BFC\u51FA");
      return;
    }
    b("word");
    try {
      await Et(y, (p == null ? void 0 : p.title) || "\u62A5\u544A"), l("success", "Word \u5BFC\u51FA\u5DF2\u5F00\u59CB");
    } catch (P) {
      l("error", P instanceof Error ? P.message : "Word \u5BFC\u51FA\u5931\u8D25");
    } finally {
      b(null);
    }
  }, [T, p == null ? void 0 : p.title, l]), _ = o.useCallback(async () => {
    const y = T.trim();
    if (!y) {
      l("error", "\u6682\u65E0\u5185\u5BB9\u53EF\u5BFC\u51FA");
      return;
    }
    b("pdf");
    try {
      await Wt(y, (p == null ? void 0 : p.title) || "\u62A5\u544A"), l("success", "PDF \u5BFC\u51FA\u5DF2\u5F00\u59CB");
    } catch (P) {
      l("error", P instanceof Error ? P.message : "PDF \u5BFC\u51FA\u5931\u8D25");
    } finally {
      b(null);
    }
  }, [T, p == null ? void 0 : p.title, l]), g = (y, P) => {
    P.stopPropagation();
    const R = e.findIndex((O) => O.id === y), K = e.filter((O) => O.id !== y);
    if (s === y && K.length > 0) {
      const O = Math.min(R, K.length - 1);
      r(K[O].id);
    }
    a(y);
  };
  if (e.length === 0) return t.jsxs("div", { className: "flex h-full flex-col items-center justify-center bg-[#f7f8fa] text-slate-500 dark:bg-slate-950", children: [t.jsx(Qe, { size: 40, className: "mb-3 opacity-30" }), t.jsx("div", { className: "text-sm font-medium text-slate-600 dark:text-slate-400", children: "\u62A5\u544A\u9884\u89C8" }), t.jsx("div", { className: "mt-1 max-w-xs text-center text-xs text-slate-400", children: "\u5B8C\u6210 W6 \u7814\u7A76\u4EFB\u52A1\u540E\uFF0CHTML \u4E0E Markdown \u62A5\u544A\u5C06\u5728\u6B64\u5B9E\u65F6\u9884\u89C8" })] });
  const A = (p == null ? void 0 : p.kind) === "markdown", V = (p == null ? void 0 : p.kind) === "html" || !(p == null ? void 0 : p.kind);
  return t.jsxs("div", { className: "flex h-full min-h-0 flex-col bg-white dark:bg-slate-900", children: [t.jsxs("div", { className: "flex shrink-0 items-center overflow-hidden border-b border-slate-200/90 bg-slate-50/80 dark:border-slate-800 dark:bg-slate-900/80", children: [t.jsx("div", { className: "flex flex-1 items-center overflow-x-auto", children: e.map((y, P) => {
    const R = y.id === s, K = P === e.length - 1, O = y.kind === "markdown";
    return t.jsxs("button", { type: "button", onClick: () => r(y.id), className: `group flex max-w-[220px] shrink-0 items-center gap-1.5 whitespace-nowrap border-r border-slate-200/90 px-3 py-2 text-xs transition-colors dark:border-slate-800 ${R ? "-mb-px border-b-0 border-t-2 border-t-blue-600 bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100" : "text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:hover:bg-slate-800 dark:hover:text-slate-200"}`, title: y.title, children: [O ? t.jsx(It, { size: 12, className: "shrink-0 text-emerald-600 dark:text-emerald-400" }) : t.jsx(Qe, { size: 12, className: "shrink-0" }), t.jsx("span", { className: "truncate", children: y.title }), K && !R ? t.jsx("span", { className: "h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-blue-500" }) : null, t.jsx("span", { role: "button", tabIndex: 0, onClick: (d) => g(y.id, d), onKeyDown: (d) => {
      d.key === "Enter" && g(y.id, d);
    }, className: "ml-0.5 shrink-0 rounded p-0.5 opacity-0 transition-opacity hover:bg-red-100 group-hover:opacity-100 dark:hover:bg-red-950/40", children: t.jsx(tt, { size: 10 }) })] }, y.id);
  }) }), p ? t.jsxs("div", { className: "flex shrink-0 items-center gap-1 border-l border-slate-200/90 px-2 dark:border-slate-800", children: [A && $ ? t.jsxs(t.Fragment, { children: [t.jsx("button", { type: "button", onClick: E, disabled: k !== null, className: "rounded px-2 py-1 text-[11px] text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-800 disabled:cursor-not-allowed disabled:opacity-50 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200", title: "\u5BFC\u51FA Word", children: k === "word" ? "\u5BFC\u51FA\u4E2D\u2026" : "\u5BFC\u51FA Word" }), t.jsx("button", { type: "button", onClick: _, disabled: k !== null, className: "rounded px-2 py-1 text-[11px] text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-800 disabled:cursor-not-allowed disabled:opacity-50 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200", title: "\u5BFC\u51FA PDF", children: k === "pdf" ? "\u5BFC\u51FA\u4E2D\u2026" : "\u5BFC\u51FA PDF" })] }) : null, V ? t.jsxs(t.Fragment, { children: [t.jsx("button", { type: "button", onClick: () => f((y) => y + 1), className: "rounded p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800 dark:hover:bg-slate-800", title: "\u5237\u65B0", children: t.jsx(Mt, { size: 13 }) }), t.jsx("a", { href: p.url, target: "_blank", rel: "noopener noreferrer", className: "rounded p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800 dark:hover:bg-slate-800", title: "\u65B0\u7A97\u53E3\u6253\u5F00", children: t.jsx(Tt, { size: 13 }) }), t.jsx("button", { type: "button", onClick: G, className: "rounded p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800 dark:hover:bg-slate-800", title: "\u4E0B\u8F7D HTML", children: t.jsx(Pt, { size: 13 }) })] }) : null] }) : null] }), t.jsx("div", { className: "relative min-h-0 flex-1 overflow-hidden bg-white dark:bg-slate-900", children: p ? A ? t.jsx("div", { className: "h-full overflow-y-auto p-4", children: v ? t.jsxs("div", { className: "flex h-full items-center justify-center text-sm text-slate-500", children: [t.jsx("span", { className: "mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-slate-600" }), "\u6B63\u5728\u52A0\u8F7D Markdown\u2026"] }) : N ? t.jsx("div", { className: "flex h-full flex-col items-center justify-center gap-2 text-sm text-slate-500", children: t.jsxs("p", { children: ["\u52A0\u8F7D\u5931\u8D25: ", N] }) }) : t.jsx(_t, { content: T.trim() || "\u65E0\u5185\u5BB9" }) }) : t.jsx("iframe", { src: p.url, className: "block h-full w-full border-0", title: p.title, sandbox: "allow-scripts allow-same-origin" }, `${p.id}-${i}`) : t.jsx("div", { className: "absolute inset-0 flex items-center justify-center text-slate-400", children: t.jsx("div", { className: "text-center text-sm", children: "\u8BF7\u9009\u62E9\u4E00\u4E2A\u62A5\u544A\u6807\u7B7E" }) }) })] });
}
function Ue(e, s) {
  return s == null || s === "" ? false : Array.isArray(s) ? s.length > 0 : true;
}
function Is(e, s) {
  const r = { ...s };
  for (const a of e) !Ue(a, r[a.name]) && a.default !== void 0 && (r[a.name] = a.default);
  return r;
}
function Ms(e, s) {
  for (const r of e) if (r.required && !Ue(r, s[r.name] ?? r.default)) return false;
  return true;
}
function Ve({ fields: e, onSubmit: s, disabled: r = false, stepMode: a = true }) {
  const [l, i] = o.useState(() => Ge(e)), [f, k] = o.useState(0), b = e.map((E) => E.name).join("\0");
  if (o.useEffect(() => {
    i(Ge(e)), k(0);
  }, [b]), e.length === 0) return t.jsx("p", { className: "text-xs text-slate-500", children: "form_schema \u65E0\u6709\u6548 fields" });
  const S = () => {
    s(Is(e, l));
  };
  if (!a) return t.jsxs("div", { className: "space-y-3 rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900", children: [t.jsx(Je, { fields: e, formData: l, onChange: (E, _) => i((g) => ({ ...g, [E]: _ })), compact: true }), t.jsxs("button", { type: "button", onClick: S, disabled: r || !Ms(e, l), className: "flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white", children: [t.jsx(De, { size: 14 }), "\u63D0\u4EA4"] })] });
  const p = e[f], T = f >= e.length - 1, v = l[p.name], N = !p.required || Ue(p, v ?? p.default), $ = () => {
    T ? S() : k((E) => E + 1);
  }, G = () => {
    T ? S() : k((E) => E + 1);
  };
  return t.jsxs("div", { className: "rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900", children: [t.jsxs("div", { className: "mb-4 flex items-center gap-1.5", children: [e.map((E, _) => t.jsx("div", { className: `h-1 flex-1 rounded-full transition-colors ${_ < f ? "bg-blue-600 dark:bg-blue-500" : _ === f ? "bg-blue-400 dark:bg-blue-400/70" : "bg-slate-200 dark:bg-slate-700"}` }, _)), t.jsxs("span", { className: "ml-1 text-xs text-slate-500 dark:text-slate-400", children: [f + 1, "/", e.length] })] }), t.jsx(Je, { fields: [p], formData: l, onChange: (E, _) => i((g) => ({ ...g, [E]: _ })), compact: true }), t.jsxs("div", { className: "mt-4 flex items-center gap-2", children: [t.jsxs("button", { type: "button", onClick: () => k((E) => Math.max(0, E - 1)), disabled: r || f === 0, className: "flex items-center gap-1 px-3 py-2 text-xs text-slate-500 transition-colors hover:text-slate-800 disabled:cursor-not-allowed disabled:opacity-40 dark:text-slate-400 dark:hover:text-slate-200", children: [t.jsx(At, { size: 14 }), "\u4E0A\u4E00\u6B65"] }), t.jsx("div", { className: "flex-1" }), p.required ? null : t.jsxs("button", { type: "button", onClick: G, disabled: r, className: "flex items-center gap-1 rounded-lg px-3 py-2 text-xs text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 disabled:opacity-40 dark:hover:bg-slate-800 dark:hover:text-slate-300", children: [t.jsx(Dt, { size: 14 }), "\u8DF3\u8FC7"] }), t.jsx("button", { type: "button", onClick: $, disabled: r || !N, className: "flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-blue-600 dark:hover:bg-blue-500", children: T ? t.jsxs(t.Fragment, { children: [t.jsx(De, { size: 14 }), "\u5F00\u59CB\u6267\u884C"] }) : t.jsxs(t.Fragment, { children: ["\u4E0B\u4E00\u6B65", t.jsx(st, { size: 14 })] }) })] })] });
}
function Ts({ questions: e, onClick: s }) {
  return (e == null ? void 0 : e.length) ? t.jsxs("div", { className: "mt-4 border-t border-slate-200 pt-3 dark:border-slate-700", children: [t.jsx("div", { className: "mb-2 text-xs font-medium text-slate-500 dark:text-slate-400", children: "\u6DF1\u5EA6\u8C03\u7814\u65B9\u5411" }), t.jsx("div", { className: "space-y-1.5", children: e.map((r, a) => t.jsxs("button", { type: "button", onClick: () => s(r), className: "group flex w-full items-start gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-left transition-colors hover:border-blue-300 hover:bg-blue-50/80 dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-blue-700 dark:hover:bg-blue-950/30", children: [t.jsx("span", { className: "flex-1 text-xs leading-relaxed text-slate-700 group-hover:text-slate-900 dark:text-slate-300 dark:group-hover:text-slate-100", children: r }), t.jsx(st, { size: 14, className: "mt-0.5 shrink-0 text-slate-400 transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400" })] }, a)) })] }) : null;
}
function Xe({ topic: e, onSelect: s, disabled: r }) {
  return t.jsx("button", { type: "button", disabled: r, onClick: () => s(e), title: e.text, className: "inline-flex max-w-full items-center gap-1.5 truncate rounded-full border border-slate-200 bg-white px-3 py-1.5 text-left text-xs text-slate-700 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-300 dark:hover:border-blue-700 dark:hover:bg-blue-950/40 dark:hover:text-blue-300", children: t.jsx("span", { className: "truncate", children: e.text }) });
}
function Ps({ w6Topics: e, discussTopics: s = [], onSelect: r, disabled: a }) {
  return !e.length && !s.length ? null : t.jsxs("div", { className: "mb-2 space-y-2", children: [e.length > 0 ? t.jsxs("div", { children: [t.jsx("div", { className: "mb-1.5 text-xs font-medium text-slate-500 dark:text-slate-400", children: "\u6DF1\u5EA6\u8C03\u7814" }), t.jsx("div", { className: "flex flex-wrap gap-1.5", children: e.map((l) => t.jsx(Xe, { topic: l, onSelect: r, disabled: a }, `w6-${l.text}`)) })] }) : null, s.length > 0 ? t.jsxs("div", { children: [t.jsxs("div", { className: "mb-1.5 text-xs font-medium text-slate-500 dark:text-slate-400", children: ["\u62A5\u544A\u8C03\u6574", t.jsx("span", { className: "ml-1 font-normal text-slate-400 dark:text-slate-500", children: "\uFF08\u6539\u7248\u5F0F / \u8BA8\u8BBA\uFF09" })] }), t.jsx("div", { className: "flex flex-wrap gap-1.5", children: s.map((l) => t.jsx(Xe, { topic: l, onSelect: r, disabled: a }, `discuss-${l.text}`)) })] }) : null] });
}
const _s = 4, As = [{ text: "\u4F18\u5316\u62A5\u544A\u6392\u7248\u4E0E\u7AE0\u8282\u7ED3\u6784", mode: "discuss" }, { text: "\u8C03\u6574\u62A5\u544A\u89C6\u89C9\u98CE\u683C\u4E0E\u914D\u8272", mode: "discuss" }];
function Ds(e) {
  for (let s = e.length - 1; s >= 0; s--) {
    const r = e[s].followUpQuestions;
    if (r == null ? void 0 : r.length) return r;
  }
  return [];
}
function zs(e, s) {
  const r = (s == null ? void 0 : s.trim()) || "\u672C\u6B21\u7814\u7A76\u4E3B\u9898";
  return e === "info_research" ? [`\u9488\u5BF9\u300C${r}\u300D\u8FD8\u6709\u54EA\u4E9B\u4FE1\u606F\u7F3A\u53E3\u9700\u8981\u8865\u5145\u8C03\u7814\uFF1F`, "\u8BF7\u68B3\u7406\u62A5\u544A\u4E2D\u7684\u5173\u952E\u5B9E\u4F53\u53CA\u5176\u5173\u8054\u5173\u7CFB", "\u5BF9\u6BD4\u4E0D\u540C\u4FE1\u6E90\u5BF9\u8BE5\u4E3B\u9898\u7684\u8BF4\u6CD5\u5DEE\u5F02", "\u8BF7\u7ED9\u51FA 3 \u6761\u53EF\u6267\u884C\u7684\u540E\u7EED\u5F00\u6E90\u8C03\u67E5\u65B9\u5411"] : e === "data_collection" ? [`\u300C${r}\u300D\u76F8\u5173\u516C\u5F00\u6570\u636E\u8FD8\u6709\u54EA\u4E9B\u672A\u6536\u5F55\uFF1F`, "\u8BF7\u9A8C\u8BC1\u62A5\u544A\u4E2D\u5173\u952E\u6570\u636E\u7684\u539F\u59CB\u51FA\u5904", "\u54EA\u4E9B\u6307\u6807\u503C\u5F97\u5EFA\u7ACB\u6301\u7EED\u76D1\u6D4B\uFF1F", "\u8BF7\u5217\u51FA\u53EF\u590D\u7528\u7684\u6570\u636E\u91C7\u96C6\u6E20\u9053\u4E0E\u65B9\u6CD5"] : [`\u62A5\u544A\u4E2D\u5BF9\u300C${r}\u300D\u7684\u6838\u5FC3\u7ED3\u8BBA\u662F\u4EC0\u4E48\uFF1F`, "\u6709\u54EA\u4E9B\u5173\u952E\u8BC1\u636E\u4ECD\u9700\u8981\u8FDB\u4E00\u6B65\u6838\u5B9E\uFF1F", "\u5982\u679C\u8BE5\u4E3B\u5F20\u5728\u793E\u4EA4\u5A92\u4F53\u4F20\u64AD\uFF0C\u5E94\u5982\u4F55\u8F9F\u8C23\u6216\u6807\u6CE8\uFF1F", "\u8BF7\u5217\u51FA 3 \u6761\u53EF\u6267\u884C\u7684\u4E0B\u4E00\u6B65\u8C03\u67E5\u5EFA\u8BAE\u3002"];
}
function Fs(e) {
  const s = e.limit ?? _s, r = /* @__PURE__ */ new Set(), a = [], l = (i) => {
    const f = i.trim();
    !f || r.has(f) || a.length >= s || (r.add(f), a.push({ text: f, mode: "w6" }));
  };
  for (const i of e.followUpQuestions) l(i);
  for (const i of e.w6FollowUps ?? []) l(i);
  for (const i of Ds(e.messages)) l(i);
  if (a.length < s) {
    for (const i of zs(e.skillKey, e.reportTitle)) if (l(i), a.length >= s) break;
  }
  return a;
}
function Ls(e) {
  const s = Fs(e), r = e.includeLayoutTopics === false ? [] : [...As];
  return { w6Topics: s, discussTopics: r };
}
function Us({ content: e }) {
  if (!(e.startsWith(ve) || e.trimStart().toLowerCase().startsWith("@w6 "))) return t.jsx("pre", { className: "whitespace-pre-wrap font-sans", children: e });
  const r = e.startsWith(ve) ? e.slice(ve.length) : e.trimStart().slice(4);
  return t.jsxs("pre", { className: "whitespace-pre-wrap font-sans", children: [t.jsx("span", { className: "rounded bg-blue-500/25 px-1 font-semibold text-blue-200 dark:bg-blue-600/20 dark:text-blue-700", children: "@w6" }), t.jsx("span", { children: " " }), r] });
}
function Ks(e) {
  var _a, _b;
  return ((_a = e.message) == null ? void 0 : _a.trim()) ? e.message.trim() : ((_b = e.token) == null ? void 0 : _b.trim()) ? e.token.trim() : e.type === "done" ? "\u8C03\u7814\u5B8C\u6210" : e.type === "stopped" ? "\u5DF2\u624B\u52A8\u505C\u6B62 W6 \u8C03\u7814" : e.type === "error" ? "\u6267\u884C\u5931\u8D25" : "";
}
function Os(e, s = 8) {
  const r = [];
  for (const a of e) {
    const l = Ks(a);
    l && r.push(l);
  }
  return r.length <= s ? r : r.slice(-s);
}
function Bs(e, s, r) {
  if (r) return s;
  switch (e) {
    case "running":
      return "running";
    case "error":
      return "error";
    case "done":
    case "stopped":
      return "idle";
    default:
      return "idle";
  }
}
function Hs({ status: e, progress: s, lastLine: r, connection: a, events: l = [], onClick: i, onStop: f, stopping: k = false }) {
  const b = e === "running" ? "W6 \u6DF1\u5EA6\u8C03\u7814 \xB7 \u8FD0\u884C\u4E2D" : e === "error" ? "W6 \u5B50 Agent \xB7 \u51FA\u9519" : "W6 \u5B50 Agent \xB7 \u5DF2\u5B8C\u6210", S = e === "running" ? "border-blue-300/60 bg-blue-50/80 dark:border-blue-700 dark:bg-blue-950/30" : e === "error" ? "border-red-300/60 bg-red-50/80 dark:border-red-800 dark:bg-red-950/30" : "border-emerald-300/60 bg-emerald-50/80 dark:border-emerald-800 dark:bg-emerald-950/20", p = e === "running" && !!f, T = Os(l, e === "running" ? 6 : 4);
  return t.jsxs("div", { className: `relative max-w-[85%] rounded-lg border ${S}`, children: [p ? t.jsx("button", { type: "button", onClick: (v) => {
    v.stopPropagation(), f == null ? void 0 : f();
  }, disabled: k, title: "\u505C\u6B62 W6 \u8C03\u7814", "aria-label": "\u505C\u6B62 W6 \u8C03\u7814", className: "absolute right-2 top-2 z-10 rounded-md p-1 text-slate-400 transition-colors hover:bg-white/80 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-slate-900/80 dark:hover:text-red-400", children: t.jsx(et, { size: 14 }) }) : null, t.jsxs("button", { type: "button", onClick: i, className: `flex w-full flex-col gap-1.5 rounded-lg px-3 py-2.5 text-left transition-shadow hover:shadow-md ${p ? "pr-9" : ""}`, children: [t.jsxs("div", { className: "flex w-full flex-wrap items-center gap-x-2 gap-y-1", children: [t.jsx("span", { className: `h-2 w-2 shrink-0 rounded-full ${e === "running" ? "animate-pulse bg-blue-500" : e === "error" ? "bg-red-500" : "bg-emerald-500"}` }), t.jsx("span", { className: "text-xs font-semibold text-slate-800 dark:text-slate-200", children: b }), e === "running" && s > 0 ? t.jsxs("span", { className: "text-[10px] text-blue-600 dark:text-blue-400", children: [s, "%"] }) : null, a && e === "running" ? t.jsx("span", { className: "text-[10px] capitalize text-slate-500", children: a }) : null, t.jsx("span", { className: "ml-auto text-[10px] text-blue-600/80 dark:text-blue-400/80", children: "\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u8F93\u51FA" })] }), T.length > 0 ? t.jsx("div", { className: `w-full rounded-md border border-slate-200/80 bg-white/70 px-2 py-1.5 text-left dark:border-slate-700 dark:bg-slate-900/50 ${e === "running" ? "max-h-28 overflow-y-auto" : ""}`, children: T.map((v, N) => t.jsx("p", { className: "truncate text-[11px] leading-relaxed text-slate-600 dark:text-slate-400", title: v, children: v }, `${N}-${v.slice(0, 24)}`)) }) : r ? t.jsx("p", { className: "w-full truncate text-[11px] text-slate-500", children: r }) : null] })] });
}
const Qs = { idle: "\u5F85\u547D", running: "\u8FD0\u884C\u4E2D", done: "\u5DF2\u5B8C\u6210", error: "\u51FA\u9519" }, Gs = { idle: "\u672A\u8FDE\u63A5", connecting: "\u8FDE\u63A5\u4E2D\u2026", open: "\u5DF2\u8FDE\u63A5", closed: "\u5DF2\u7ED3\u675F", error: "\u8FDE\u63A5\u5F02\u5E38" }, Js = { log: "\u65E5\u5FD7", tool: "\u5DE5\u5177", token: "\u8F93\u51FA", status: "\u72B6\u6001", done: "\u5B8C\u6210", error: "\u9519\u8BEF" };
function Vs(e) {
  return e.message ? e.message : e.token ? e.token : e.type === "done" ? "\u8C03\u7814\u5B8C\u6210" : e.type === "error" ? "\u6267\u884C\u5931\u8D25" : "";
}
function Xs({ open: e, onClose: s, events: r, status: a, connection: l }) {
  const i = o.useRef(null);
  return o.useEffect(() => {
    var _a;
    e && ((_a = i.current) == null ? void 0 : _a.scrollTo({ top: i.current.scrollHeight, behavior: "smooth" }));
  }, [r, e]), e ? t.jsx("div", { className: "fixed inset-0 z-50 flex justify-end bg-black/40", onClick: s, role: "presentation", children: t.jsxs("div", { className: "flex h-full w-full max-w-md flex-col border-l border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900", onClick: (f) => f.stopPropagation(), role: "dialog", "aria-labelledby": "subagent-title", children: [t.jsxs("header", { className: "flex shrink-0 items-center gap-2 border-b border-slate-200 px-4 py-3 dark:border-slate-800", children: [t.jsx("h2", { id: "subagent-title", className: "flex-1 text-sm font-semibold text-slate-900 dark:text-slate-100", children: "\u5B50 Agent \xB7 W6" }), t.jsx("span", { className: `rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wide ${a === "running" ? "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300" : a === "error" ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300" : "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"}`, children: Qs[a] ?? a }), t.jsx("span", { className: "text-[10px] text-slate-500", children: Gs[l] }), t.jsx("button", { type: "button", onClick: s, className: "rounded p-1 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200", "aria-label": "\u5173\u95ED", children: t.jsx(tt, { size: 18 }) })] }), t.jsx("div", { ref: i, className: "flex-1 overflow-y-auto px-4 py-3 font-mono text-xs", children: r.length === 0 ? t.jsx("p", { className: "italic text-slate-500", children: "\u7B49\u5F85 W6 \u8F93\u51FA\u2026" }) : r.map((f, k) => t.jsxs("div", { className: "flex gap-2 border-b border-slate-100 py-2 last:border-0 dark:border-slate-800", children: [t.jsx("span", { className: "w-10 shrink-0 text-[10px] font-bold uppercase text-blue-600/90 dark:text-blue-400/90", children: Js[f.type] ?? f.type }), t.jsx("span", { className: "flex-1 break-words text-slate-700 dark:text-slate-300", children: Vs(f) }), f.progress != null && f.progress > 0 ? t.jsxs("span", { className: "shrink-0 text-slate-500", children: [f.progress, "%"] }) : null] }, `${f.timestamp ?? k}-${k}`)) })] }) }) : null;
}
const Ae = [{ id: "auto", label: "\u667A\u80FD\u63A8\u8350", hint: "\u6839\u636E\u62A5\u544A\u5185\u5BB9\u81EA\u52A8\u9009\u62E9\u7248\u5F0F" }, { id: "magazine", label: "\u6742\u5FD7\u7F16\u8F91\u98CE", hint: "\u886C\u7EBF\u6807\u9898 \xB7 \u6696\u8272 editorial\uFF08guizang \u98CE\u683C A\uFF09" }, { id: "swiss", label: "\u745E\u58EB\u56FD\u9645\u4E3B\u4E49", hint: "\u7F51\u683C\u70B9\u9635 \xB7 \u9AD8\u5BF9\u6BD4\u529F\u80FD\u8272\uFF08guizang \u98CE\u683C B\uFF09" }], dt = "osint-dashboard-report-style:";
function Ye(e) {
  if (!e) return "auto";
  try {
    const s = localStorage.getItem(`${dt}${e}`);
    if (s === "magazine" || s === "swiss" || s === "auto") return s;
  } catch {
  }
  return "auto";
}
function qe(e, s) {
  if (e) try {
    localStorage.setItem(`${dt}${e}`, s);
  } catch {
  }
}
function Ys({ value: e, onChange: s, disabled: r, className: a }) {
  const l = Ae.find((i) => i.id === e) ?? Ae[0];
  return t.jsxs("label", { className: te("inline-flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400", r && "opacity-50", a), children: [t.jsx("span", { className: "shrink-0 font-medium", children: "\u62A5\u544A\u7248\u5F0F" }), t.jsxs("span", { className: "relative inline-flex", children: [t.jsx("select", { value: e, disabled: r, title: l.hint, "aria-label": "\u62A5\u544A\u7248\u5F0F", onChange: (i) => s(i.target.value), className: te("h-7 min-w-[7.5rem] appearance-none rounded-lg border border-slate-200 bg-white py-0 pl-2 pr-6 text-[11px] font-medium text-slate-700 outline-none transition-colors", "hover:border-slate-300 focus:border-slate-400 focus:ring-1 focus:ring-slate-300/60", "disabled:cursor-not-allowed", "dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-600 dark:focus:border-slate-500"), children: Ae.map((i) => t.jsx("option", { value: i.id, title: i.hint, children: i.label }, i.id)) }), t.jsx(zt, { size: 12, className: "pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500", "aria-hidden": true })] })] });
}
const qs = "/osint-dashboard";
function de(e) {
  const s = e.startsWith("/") ? e : `/${e}`;
  return `${qs}${s}`;
}
function Zs({ session: e, isActive: s, onClick: r, onRename: a, onDelete: l }) {
  const [i, f] = o.useState(false);
  return t.jsxs("div", { onClick: r, className: te("group flex cursor-pointer select-none items-center gap-2 rounded-lg border-l-2 border-transparent px-2.5 py-2 transition-all duration-150", s ? "border-blue-600 bg-blue-50/90 text-slate-900 dark:border-blue-500 dark:bg-blue-950/35 dark:text-slate-100" : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-slate-100"), children: [t.jsx(rt, { size: 13, className: te("shrink-0", s ? "text-blue-600 dark:text-blue-400" : "text-slate-400") }), t.jsx("span", { className: "flex-1 truncate text-[13px] leading-tight", children: e.title }), t.jsxs("div", { className: "relative", children: [t.jsx("button", { type: "button", onClick: (k) => {
    k.stopPropagation(), f(!i);
  }, className: te("rounded-md p-1 transition-opacity", s ? "text-gray-400 hover:bg-white" : "text-gray-300 hover:bg-white/60", i ? "opacity-100" : "opacity-0 group-hover:opacity-100"), children: t.jsx(Xt, { size: 11 }) }), i ? t.jsxs(t.Fragment, { children: [t.jsx("div", { className: "fixed inset-0 z-10", onClick: () => f(false) }), t.jsxs("div", { className: "absolute right-0 top-full z-20 mt-1 min-w-[120px] rounded-xl border border-gray-100 bg-white py-1 shadow-xl", children: [t.jsxs("button", { type: "button", onClick: (k) => {
    k.stopPropagation(), a(), f(false);
  }, className: "flex w-full items-center gap-2 px-3 py-2 text-xs text-gray-700 hover:bg-gray-50", children: [t.jsx(Yt, { size: 11 }), " \u91CD\u547D\u540D"] }), t.jsxs("button", { type: "button", onClick: (k) => {
    k.stopPropagation(), l(), f(false);
  }, className: "flex w-full items-center gap-2 px-3 py-2 text-xs text-danger-600 hover:bg-danger-50", children: [t.jsx(qt, { size: 11 }), " \u5220\u9664"] })] })] }) : null] })] });
}
function er(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br/>");
}
function tr(e) {
  if (!e) return [];
  try {
    return JSON.parse(e.form_schema).fields || [];
  } catch {
    return [];
  }
}
function or() {
  const e = Ft(), { sessionId: s } = Lt(), { user: r } = Ut(), a = r == null ? void 0 : r.id, { sessions: l, intelligenceSkills: i, isStreaming: f, fetchSessions: k, createSession: b, updateSession: S, deleteSession: p, fetchIntelligenceSkills: T, executeIntelligenceSkill: v, sendMessageWS: N, connectWebSocket: $, disconnectWebSocket: G, fetchResources: E, uploadResource: _, resources: g } = Te(), { addToast: A } = Fe(), { confirm: V, prompt: y } = Kt(), P = Ot(), R = (P == null ? void 0 : P.leftCollapsed) ?? false, K = (P == null ? void 0 : P.rightCollapsed) ?? false, O = P == null ? void 0 : P.setRightCollapsed, d = Ns(a), j = $s(d.sessionId, d.w6StreamEnabled, d.w6StreamRound), [B, fe] = o.useState([]), [Re, X] = o.useState(null), [L, D] = o.useState(null), [Z, ie] = o.useState(""), [H, me] = o.useState(false), [Y, xe] = o.useState(null), [pe, ne] = o.useState(false), [ce, be] = o.useState(() => Ye(a)), ge = o.useRef(null), ke = o.useRef(0);
  o.useEffect(() => {
    be(Ye(a));
  }, [a]);
  const we = d.isStreaming || f;
  o.useEffect(() => {
    k(), T(), Bt.listGroups().then(fe).catch(() => {
    });
  }, [k, T]), o.useEffect(() => {
    if (B.length === 0) {
      X(null);
      return;
    }
    X((c) => c && B.some((w) => w.id === c) ? c : B[0].id);
  }, [B]), o.useEffect(() => {
    if (s) return;
    let c = false;
    return (async () => {
      if (await k(), c) return;
      const C = Te.getState().sessions;
      C.length > 0 && e(de(`/sessions/${C[0].id}`), { replace: true });
    })(), () => {
      c = true;
    };
  }, [s, e, k]), o.useEffect(() => {
    if (s) return d.bindSession(s), d.restoreSession(s), $(s), E(s), () => {
      G(s);
    };
  }, [s, $, G, E]), o.useEffect(() => {
    d.reports.length > 0 && (O == null ? void 0 : O(false));
  }, [s, d.reports.length, O]);
  const $e = d.reports.length > 0 && !K, Ee = a ? `osint-dashboard-panels:${a}` : void 0;
  o.useEffect(() => {
    const c = j.events.filter((C) => C.type === "done").length;
    if (c <= ke.current) return;
    ke.current = c;
    const w = [...j.events].reverse().find((C) => C.type === "done");
    w && d.addReportFromW6Done(w);
  }, [j.events, d.addReportFromW6Done]);
  const se = o.useMemo(() => d.reports.find((c) => c.id === d.activeReportId) ?? d.reports[d.reports.length - 1], [d.reports, d.activeReportId]), We = o.useMemo(() => s ? l.find((c) => c.id === s) : void 0, [l, s]), Ie = (c) => {
    be(c), qe(a, c);
  }, ye = o.useMemo(() => {
    var _a;
    return ((_a = [...j.events].reverse().find((w) => w.type === "done")) == null ? void 0 : _a.followUps) ?? [];
  }, [j.events]), { w6Topics: n, discussTopics: h } = o.useMemo(() => Ls({ followUpQuestions: d.followUpQuestions, messages: d.messages, w6FollowUps: ye, skillKey: d.skillKey, reportTitle: se == null ? void 0 : se.title }), [d.followUpQuestions, d.messages, d.skillKey, ye, se == null ? void 0 : se.title]), u = d.reports.length > 0 && !d.isStreaming && !L && !d.currentForm;
  o.useEffect(() => {
    d.activeW6MessageId && d.syncActiveW6Message({ progress: j.progress, lastLine: j.lastLine, events: j.events, status: j.status });
  }, [d.activeW6MessageId, d.syncActiveW6Message, j.progress, j.lastLine, j.events, j.status]), o.useEffect(() => {
    var _a;
    (_a = ge.current) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
  }, [d.messages, d.currentPhase, d.activeW6MessageId, u, j.status, j.lastLine, j.events.length]);
  const x = async () => {
    d.resetForNewSkill(), D(null);
    const c = await b("\u65B0\u7814\u7A76");
    e(de(`/sessions/${c.id}`));
  }, m = async (c) => {
    const w = l.find((q) => q.id === c);
    if (!w) return;
    const C = await y({ title: "\u91CD\u547D\u540D\u4F1A\u8BDD", message: "\u8BF7\u8F93\u5165\u65B0\u7684\u4F1A\u8BDD\u540D\u79F0", defaultValue: w.title, placeholder: "\u4F1A\u8BDD\u540D\u79F0" });
    C && C !== w.title && await S(c, C);
  }, W = async (c) => {
    if (await V({ title: "\u5220\u9664\u4F1A\u8BDD", message: "\u786E\u5B9A\u8981\u5220\u9664\u6B64\u4F1A\u8BDD\u5417\uFF1F\u6B64\u64CD\u4F5C\u4E0D\u53EF\u6062\u590D\u3002", variant: "danger", confirmText: "\u5220\u9664", cancelText: "\u53D6\u6D88" }) && (await p(c), s === c)) {
      const C = Te.getState().sessions;
      C.length > 0 ? e(de(`/sessions/${C[0].id}`)) : e(de("/"));
    }
  }, M = async (c) => {
    if (s) return d.bindSession(s), s;
    const w = (c == null ? void 0 : c.trim().slice(0, 30)) || "\u65B0\u7814\u7A76", C = await b(w);
    return d.bindSession(C.id), $(C.id), e(de(`/sessions/${C.id}`), { replace: true }), C.id;
  }, z = (c) => {
    if (we) {
      A("info", "\u5F53\u524D\u6B63\u5728\u751F\u6210\u4E2D\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5");
      return;
    }
    D(c);
  }, I = o.useMemo(() => tr(L), [L]), F = async (c) => {
    if (L) try {
      const w = await v(L.id, c), C = await M(L.name);
      qe(a, ce), await d.startChat(L.key, L.name, c, C, w, ce), D(null);
    } catch (w) {
      A("error", w instanceof Error ? w.message : "\u542F\u52A8\u7814\u7A76\u5931\u8D25");
    }
  }, Q = async (c) => {
    try {
      const w = d.skillKeyRef.current, C = w ? i.find((U) => U.key === w) : void 0, q = C ? await v(C.id, c) : void 0;
      await d.respondToForm(c, q);
    } catch (w) {
      A("error", w instanceof Error ? w.message : "\u63D0\u4EA4\u8865\u5145\u4FE1\u606F\u5931\u8D25");
    }
  }, J = async (c) => {
    if (L) try {
      const w = await v(L.id, c), C = await M(L.name);
      N(C, w, []), A("success", `${L.name} \u5DF2\u63D0\u4EA4`), D(null);
    } catch (w) {
      A("error", w instanceof Error ? w.message : "\u63D0\u4EA4\u5931\u8D25");
    }
  }, ee = (c) => {
    L && (ue(L.key) ? F(c) : J(c));
  }, ut = o.useMemo(() => g.map((c) => ({ id: c.id, name: c.name || "\u672A\u547D\u540D\u6587\u4EF6" })), [g]), ft = async (c = []) => {
    const w = Z.trim();
    if (!w && c.length === 0 || d.isStreaming) return;
    const C = c.filter((U) => U.type === "local" && U.file), q = c.filter((U) => U.type !== "local").map((U) => ({ id: U.id, name: U.name, type: U.type }));
    if (C.length > 0 || q.length > 0) try {
      const U = await M(w || "\u9644\u4EF6\u6D88\u606F");
      let Ke = [];
      C.length > 0 && (Ke = await Gt(`upload ${C.length} local file(s)`, { sessionId: U, files: C.map((je) => je.name) }, async () => {
        const je = [];
        for (const He of C) {
          const Me = He.file;
          Ze("upload_start", "dashboard uploading before send", { fileName: Me.name, sessionId: U });
          const ae = await _(U, Me);
          await Jt(ae.id, Me, Vt(ae.id, ae.url).filter((gt) => gt !== ae.id)), je.push({ id: ae.id, name: ae.name || He.name, type: ae.type || "file" });
        }
        return je;
      }));
      const Oe = [...q, ...Ke], Be = w || "\u8BF7\u5206\u6790\u9644\u4EF6\u5185\u5BB9";
      ie(""), d.appendUserMessage(Be, Oe), N(U, Be, Oe), E(U);
      return;
    } catch (U) {
      A("error", U instanceof Error ? U.message : "\u6587\u4EF6\u4E0A\u4F20\u5931\u8D25");
      return;
    }
    ie(""), d.sendMessage(w);
  }, mt = async () => {
    if (!(pe || j.status !== "running")) {
      ne(true);
      try {
        d.abort(), await j.stop(), A("info", "\u5DF2\u505C\u6B62 W6 \u8C03\u7814");
      } catch (c) {
        A("error", c instanceof Error ? c.message : "\u505C\u6B62 W6 \u5931\u8D25");
      } finally {
        ne(false);
      }
    }
  }, ht = (c) => {
    if (!d.isStreaming) {
      if (ie(""), c.mode === "w6") {
        d.sendW6Message(c.text);
        return;
      }
      d.sendMessage(c.text);
    }
  }, xt = t.jsxs("div", { className: "flex h-full min-h-0 flex-col overflow-hidden bg-white dark:bg-slate-900", children: [t.jsxs("div", { className: "flex items-center gap-2 border-b border-slate-200/90 px-3 py-3 dark:border-slate-800", children: [t.jsx("div", { className: "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-900 dark:bg-slate-100", children: t.jsx(Le, { size: 14, className: "text-white dark:text-slate-900" }) }), t.jsx("span", { className: "text-sm font-semibold text-slate-900 dark:text-slate-100", children: "\u60C5\u62A5\u7814\u7A76" })] }), t.jsx("div", { className: "px-3 pb-2 pt-2", children: t.jsxs("button", { type: "button", onClick: () => void x(), className: "flex w-full items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-900 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800 dark:border-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white", children: [t.jsx(Ht, { size: 14 }), "\u65B0\u4F1A\u8BDD"] }) }), t.jsx("div", { className: "min-h-0 flex-1 space-y-0.5 overflow-y-auto px-2", children: l.length === 0 ? t.jsxs("div", { className: "px-3 py-6 text-center", children: [t.jsx(rt, { size: 20, className: "mx-auto mb-1.5 text-slate-300 dark:text-slate-600" }), t.jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400", children: "\u6682\u65E0\u4F1A\u8BDD" })] }) : l.map((c) => t.jsx(Zs, { session: c, isActive: s === c.id, onClick: () => e(de(`/sessions/${c.id}`)), onRename: () => void m(c.id), onDelete: () => void W(c.id) }, c.id)) })] }), pt = t.jsxs("div", { className: "flex h-full min-h-0 min-w-0 flex-col overflow-hidden bg-[#f7f8fa] dark:bg-slate-950", children: [t.jsxs("div", { className: "flex shrink-0 items-center justify-between gap-3 border-b border-slate-200/70 px-3 py-2 dark:border-slate-800", children: [t.jsx("span", { className: "min-w-0 truncate text-xs font-medium text-slate-600 dark:text-slate-400", children: (We == null ? void 0 : We.title) ?? "\u60C5\u62A5\u7814\u7A76" }), t.jsx(Ys, { value: ce, onChange: Ie, disabled: d.isStreaming })] }), t.jsxs("div", { className: "min-h-0 flex-1 overflow-y-auto px-3 py-3", children: [L && I.length > 0 ? t.jsxs("div", { className: "mb-4", children: [t.jsxs("div", { className: "mb-2 text-xs font-medium text-slate-600 dark:text-slate-400", children: [L.name, " \u2014 \u8BF7\u586B\u5199\u53C2\u6570"] }), t.jsx(Ve, { fields: I, onSubmit: ee, disabled: d.isStreaming, stepMode: true }), t.jsx("button", { type: "button", className: "mt-2 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-300", onClick: () => D(null), children: "\u53D6\u6D88" })] }) : null, d.currentForm ? t.jsxs("div", { className: "mb-4", children: [t.jsx("p", { className: "mb-2 text-xs text-slate-600", children: d.currentForm.message }), t.jsx(Ve, { fields: d.currentForm.schema.fields, onSubmit: (c) => void Q(c), disabled: d.isStreaming, stepMode: false })] }) : null, d.messages.map((c) => {
    var _a;
    if (c.role === "user") return t.jsx("div", { className: "mb-3 flex justify-end", children: t.jsx("div", { className: "max-w-[85%] rounded-2xl rounded-br-md bg-slate-900 px-3 py-2 text-xs text-white dark:bg-slate-100 dark:text-slate-900", children: t.jsx(Us, { content: c.content }) }) }, c.id);
    if (c.role === "assistant") return c.content.trim() ? t.jsx("div", { className: "mb-3", children: t.jsxs("div", { className: "rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200", children: [t.jsx("div", { className: "prose-sm max-w-none", dangerouslySetInnerHTML: { __html: er(c.content) } }), d.reports.length > 0 && c.content ? t.jsx("p", { className: "mt-2 text-xs text-blue-600 dark:text-blue-400", children: "\u62A5\u544A\u5DF2\u751F\u6210\uFF0C\u89C1\u53F3\u4FA7\u9884\u89C8" }) : null, ((_a = c.followUpQuestions) == null ? void 0 : _a.length) && !u ? t.jsx(Ts, { questions: c.followUpQuestions, onClick: (w) => void d.sendW6Message(w) }) : null] }) }, c.id) : null;
    if (c.role === "w6") {
      const w = c.id === d.activeW6MessageId, C = w ? j.events : c.w6Events ?? [], q = Bs(c.w6Status, j.status, w);
      return t.jsx("div", { className: "mb-3", children: t.jsx(Hs, { status: q, progress: w ? j.progress : c.w6Progress ?? 0, lastLine: w ? j.lastLine : c.w6LastLine ?? "", connection: w ? j.connection : void 0, events: C, onClick: () => {
        xe({ events: C, status: q, connection: w ? j.connection : "closed" }), me(true);
      }, onStop: w && q === "running" ? () => void mt() : void 0, stopping: pe }) }, c.id);
    }
    return c.role === "system" ? t.jsx("div", { className: "mb-2 text-center text-xs text-slate-500", children: c.content }, c.id) : null;
  }), d.currentPhase && !d.activeW6MessageId ? t.jsx("div", { className: "mb-2 text-xs italic text-slate-500", children: d.currentPhase }) : null, u ? t.jsx("div", { className: "mb-3 max-w-[85%]", children: t.jsx(Ps, { w6Topics: n, discussTopics: h, onSelect: ht, disabled: d.isStreaming }) }) : null, t.jsx("div", { ref: ge })] }), t.jsx("div", { className: "shrink-0 border-t border-zinc-200/70 bg-white px-4 py-3 dark:border-white/10 dark:bg-[#212121]", children: t.jsxs("div", { className: "mx-auto max-w-3xl space-y-2", children: [t.jsx(ts, { skillGroups: B, activeGroupId: Re, onActiveGroupChange: X, intelligenceSkills: i, onSkillClick: z, disabled: we }), t.jsx(Zt, { value: Z, onChange: ie, onSend: (c) => void ft(c), placeholder: d.reports.length > 0 ? "\u9488\u5BF9\u5F53\u524D\u62A5\u544A\u6539\u7248\u5F0F\u6216\u8FFD\u95EE\u5185\u5BB9\uFF1B@w6 \u5F00\u5934\u4E3A\u6DF1\u5EA6\u8C03\u7814\uFF1B\u8F93\u5165 @ \u9009\u8D44\u6599\u5E93" : "\u8F93\u5165\u8FFD\u95EE\uFF1B@w6 \u5F00\u5934\u4E3A\u6DF1\u5EA6\u8C03\u7814\uFF1B\u8F93\u5165 @ \u9009\u8D44\u6599\u5E93", disabled: d.isStreaming, isStreaming: d.isStreaming, onStop: () => d.abort(), libraryFiles: ut })] }) })] }), bt = t.jsx(Ws, { reports: d.reports, activeReportId: d.activeReportId, onActiveChange: d.setActiveReportId, onReportClose: d.closeReport });
  return t.jsxs(t.Fragment, { children: [t.jsx(Qt, { className: "h-full min-h-0 w-full bg-[#f3f5f7] dark:bg-slate-950", innerClassName: "h-full min-h-0 border border-slate-200/90 bg-[#f7f8fa] dark:border-slate-800 dark:bg-slate-950", leftPanelId: "osint-dashboard-left", mainPanelId: "osint-dashboard-main", rightPanelId: "osint-dashboard-right", left: xt, main: pt, right: bt, leftMinPx: 200, leftMaxPx: 400, leftDefaultPx: 240, rightMinPx: 320, rightMaxPx: 1200, rightDefaultPct: 50, leftSidebarVisible: !R, rightSidebarVisible: $e, storageKey: Ee, resizeHandleWithGrip: true }), t.jsx(Xs, { open: H, onClose: () => {
    me(false), xe(null);
  }, events: (Y == null ? void 0 : Y.events) ?? j.events, status: (Y == null ? void 0 : Y.status) ?? j.status, connection: (Y == null ? void 0 : Y.connection) ?? j.connection })] });
}
export {
  or as default
};
