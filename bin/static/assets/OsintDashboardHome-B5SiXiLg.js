import { j as s } from "./three-BECTMk9d.js";
import { a as o } from "./monaco-BSfMmt4N.js";
import { G as Ke, H as jt, I as Ze, J as St, K as et, S as ze, N as Nt, O as re, Q as Ct, R as Be, U as Rt, V as $t, W as Et, w as ne, X as Ie, Y as Wt, Z as It, _ as Mt, $ as Tt, a0 as He, x as _t, a1 as tt, a2 as At, a3 as Pt, s as Dt, a4 as Lt, a5 as Qe, a6 as Ge, r as Ft, a7 as zt, a8 as st, C as Ut, u as Kt, p as Bt, a9 as Ot, aa as $e, ab as Ht, ac as Qt, ad as Gt, P as Vt, M as rt, ae as Jt, af as Xt, ag as Yt, ah as qt, E as Zt, o as es, T as ts } from "./main-gNlFrJgr.js";
import "./charts-Cx7lSOSv.js";
function ss({ value: e, onChange: t, onSend: r, placeholder: n, disabled: a = false, isStreaming: i = false, onStop: u }) {
  const { addToast: p } = Ke(), [b, v] = o.useState([]), g = a, N = o.useCallback(() => {
    if (g || i) return;
    const w = document.createElement("input");
    w.type = "file", w.multiple = true, w.onchange = (S) => {
      const T = S.target, W = Array.from(T.files || []);
      if (W.length === 0) return;
      const R = [];
      for (const $ of W) {
        const B = jt($);
        if (B) {
          p("error", `${$.name}: ${B}`);
          continue;
        }
        R.push({ id: `local-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`, name: $.name, type: "local", file: $, size: $.size, mimeType: $.type });
      }
      R.length !== 0 && (v(($) => [...$, ...R]), Ze("attachment_state", "dashboard local files queued", { added: R.map(($) => $.name) }));
    }, w.click();
  }, [g, i, p]), M = () => {
    g || !e.trim() && b.length === 0 || (r(b), v([]));
  };
  return s.jsxs("div", { className: "space-y-2", children: [b.length > 0 ? s.jsx(St, { attachments: b, onRemove: (w) => v((S) => S.filter((T) => T.id !== w)) }) : null, s.jsxs("div", { className: "relative overflow-visible rounded border border-zinc-200 bg-white shadow-sm transition-all duration-200 focus-within:border-zinc-300 dark:border-none dark:bg-white/5", children: [s.jsxs("div", { className: "flex items-end gap-2 overflow-hidden rounded-3xl px-2 py-2", children: [s.jsx("textarea", { value: e, onChange: (w) => t(w.target.value), onKeyDown: (w) => {
    w.key === "Enter" && !w.shiftKey && (w.preventDefault(), M());
  }, placeholder: n, rows: 2, disabled: g, className: "min-h-[44px] flex-1 resize-none border-0 bg-transparent px-1 py-1 text-sm text-slate-800 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500" }), i ? s.jsx("button", { type: "button", onClick: u, className: "mb-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-red-200 text-red-600 transition-colors hover:bg-red-50 dark:border-red-400/30 dark:hover:bg-red-900/30", title: "\u505C\u6B62", children: s.jsx(et, { size: 16 }) }) : s.jsx("button", { type: "button", onClick: M, disabled: g || !e.trim() && b.length === 0, className: "mb-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white transition-colors hover:bg-slate-800 disabled:opacity-40 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white", title: "\u53D1\u9001", children: s.jsx(ze, { size: 16 }) })] }), s.jsx("div", { className: "flex items-center gap-1 border-t border-zinc-200/70 bg-zinc-50/70 px-3 py-2 dark:border-white/10 dark:bg-white/5", children: s.jsxs("button", { type: "button", onClick: N, disabled: i || g, className: re("flex items-center gap-1 rounded-md px-2 py-1 text-xs transition-colors", i || g ? "cursor-not-allowed text-zinc-300 dark:text-white/30" : "text-zinc-500 hover:bg-zinc-200/50 hover:text-zinc-700 dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white"), children: [s.jsx(Nt, { size: 12 }), s.jsx("span", { className: "hidden sm:inline", children: "\u672C\u5730\u6587\u4EF6" })] }) })] })] });
}
const rs = { ShieldCheck: s.jsx(Be, { size: 12 }), Search: s.jsx(Et, { size: 12 }), Database: s.jsx($t, { size: 12 }), Newspaper: s.jsx(Rt, { size: 12 }) };
function ns({ skillGroups: e, activeGroupId: t, onActiveGroupChange: r, intelligenceSkills: n, onSkillClick: a, disabled: i = false }) {
  const u = o.useMemo(() => e.find((v) => v.id === t) ?? e[0] ?? null, [e, t]), p = o.useMemo(() => Ct(n, u), [n, u]);
  if (e.length === 0 && p.length === 0) return null;
  const b = e.length > 1;
  return s.jsxs("div", { className: "flex flex-col gap-2", children: [b && s.jsx("div", { className: "flex flex-wrap items-center gap-1 border-b border-slate-200/80 pb-1.5 dark:border-slate-700", role: "tablist", "aria-label": "\u6280\u80FD\u5206\u7EC4", children: e.map((v) => s.jsx("button", { type: "button", role: "tab", "aria-selected": t === v.id, onClick: () => r(v.id), className: re("shrink-0 rounded-lg px-2.5 py-1 text-[11px] font-medium transition-colors", t === v.id ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900" : "text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"), children: v.name }, v.id)) }), s.jsx("div", { className: "flex flex-wrap gap-1.5", role: "tabpanel", "aria-label": (u == null ? void 0 : u.name) ?? "\u6280\u80FD", children: p.length === 0 ? s.jsx("span", { className: "text-[11px] text-slate-400 dark:text-slate-500", children: "\u6682\u65E0\u53EF\u7528\u6280\u80FD" }) : p.map((v) => s.jsxs("button", { type: "button", onClick: () => a(v), disabled: i, className: re("flex shrink-0 items-center gap-1 rounded-xl border px-2.5 py-1 text-[11px] font-medium transition-all", i ? "cursor-not-allowed border-slate-100 text-slate-300 opacity-40 dark:border-slate-800" : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:bg-slate-800"), children: [s.jsx("span", { className: "text-slate-400 dark:text-slate-500", children: rs[v.icon || ""] || s.jsx(Be, { size: 12 }) }), v.name] }, v.id)) })] });
}
const as = /* @__PURE__ */ new Set(["fact_check", "info_research", "data_collection"]);
function ye(e, t) {
  if (!e) return false;
  const r = t == null ? void 0 : t.find((n) => n.key === e);
  return (r == null ? void 0 : r.uses_w6) != null ? r.uses_w6 : as.has(e);
}
function ue(e) {
  const t = e.startsWith("/") ? e : `/${e}`;
  return `${Wt.baseUrl}${t}`;
}
function os(e) {
  const t = new URLSearchParams({ session_id: e }), r = ne();
  return r && t.set("token", r), `${ue("/osint-dashboard/w6/stream")}?${t.toString()}`;
}
function ls(e) {
  var _a, _b;
  const t = { session_id: e.sessionId, skill_key: e.skillKey, form_data: e.formData };
  return ((_a = e.renderedPrompt) == null ? void 0 : _a.trim()) && (t.rendered_prompt = e.renderedPrompt.trim()), ((_b = e.reportStyle) == null ? void 0 : _b.trim()) && (t.report_style = e.reportStyle.trim()), t;
}
function is(e) {
  var _a;
  const t = { session_id: e.sessionId, form_data: e.formData };
  return ((_a = e.renderedPrompt) == null ? void 0 : _a.trim()) && (t.rendered_prompt = e.renderedPrompt.trim()), t;
}
function cs(e) {
  return { session_id: e.sessionId, message: e.message };
}
function ds(e) {
  var _a;
  const t = { session_id: e.sessionId, message: e.message };
  return ((_a = e.targetResourceId) == null ? void 0 : _a.trim()) ? (t.target_resource_id = e.targetResourceId.trim(), t.mode = "edit_html") : e.mode && (t.mode = e.mode), t;
}
function de(e) {
  if (!e) return "";
  const t = e.split("#")[0], r = t.match(/\/artifacts\/([^/?]+)\/preview/);
  return (r == null ? void 0 : r[1]) ? decodeURIComponent(r[1]) : (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(t), t);
}
const us = 36e4;
async function nt(e, t, r) {
  const n = ne(), a = await fetch(ue(e), { method: "POST", headers: { "Content-Type": "application/json", ...n ? { Authorization: `Bearer ${n}` } : {} }, body: JSON.stringify(t), signal: r });
  if (!a.ok) {
    Ie(a.status);
    const i = await a.json().catch(() => ({ detail: `HTTP ${a.status}` }));
    throw new Error(i.detail || `HTTP ${a.status}`);
  }
  return a.json();
}
async function De(e, t, r) {
  var _a;
  const n = ne(), a = await fetch(ue(e), { method: "POST", headers: { "Content-Type": "application/json", ...n ? { Authorization: `Bearer ${n}` } : {} }, body: JSON.stringify(t), signal: r });
  if (!a.ok) {
    Ie(a.status);
    const u = await a.json().catch(() => ({ detail: `HTTP ${a.status}` }));
    throw new Error(u.detail || `HTTP ${a.status}`);
  }
  const i = (_a = a.body) == null ? void 0 : _a.getReader();
  if (!i) throw new Error("No response body");
  return i;
}
async function fs(e) {
  await nt("/osint-dashboard/w6/stop", { session_id: e });
}
async function at(e) {
  const t = ne(), r = await fetch(`${ue(`/osint-dashboard/sessions/${encodeURIComponent(e)}/state`)}?t=${Date.now()}`, { headers: t ? { Authorization: `Bearer ${t}` } : {} });
  return r.ok ? await r.json() : (r.status === 404 || Ie(r.status), null);
}
async function ot(e) {
  const t = ne(), r = await fetch(`${ue(`/osint-dashboard/sessions/${encodeURIComponent(e)}/reports`)}?t=${Date.now()}`, { headers: t ? { Authorization: `Bearer ${t}` } : {} });
  if (!r.ok) return r.status === 404 ? [] : (Ie(r.status), []);
  const n = await r.json();
  return (Array.isArray(n) ? n : n.reports ?? []).map((i) => ({ id: i.id, url: i.url || i.id, title: i.title || i.name || "\u62A5\u544A", type: i.type }));
}
function ms(e) {
  if (!e) return "";
  const t = ue(`/artifacts/${encodeURIComponent(e)}/download`), r = ne();
  if (!r) return t;
  const n = t.includes("?") ? "&" : "?";
  return `${t}${n}token=${encodeURIComponent(r)}`;
}
function Me(e) {
  if (!e) return "";
  if (e.startsWith("http") || e.startsWith("/")) return e;
  const t = ue(`/artifacts/${encodeURIComponent(e)}/preview`), r = ne();
  if (!r) return t;
  const n = t.includes("?") ? "&" : "?";
  return `${t}${n}token=${encodeURIComponent(r)}`;
}
const Ee = "@w6 ";
function hs(e) {
  const t = e.trimStart();
  return t.startsWith("@w6 ") || t.toLowerCase().startsWith("@w6 ");
}
function xs(e) {
  const t = e.trimStart();
  return t.toLowerCase().startsWith("@w6") ? t.slice(3).trimStart().trim() : e.trim();
}
function Ue(e) {
  const t = e.trimStart();
  return t.toLowerCase().startsWith("@w6") ? t : `${Ee}${e}`;
}
function lt(e) {
  return Object.entries(e).filter(([, t]) => t != null && String(t).trim() !== "").map(([t, r]) => Array.isArray(r) ? `${t}: ${r.join(", ")}` : `${t}: ${String(r)}`).join(`
`);
}
function ps(e, t) {
  const r = lt(t);
  return Ue(`\u6267\u884C\uFF1A${e}${r ? `
${r}` : ""}`);
}
const bs = "active-v1", gs = "session-";
function it(e) {
  return `osint-dashboard:${e}:`;
}
function ct(e, t) {
  return `${it(e)}${gs}${t}`;
}
function ws(e) {
  return `${it(e)}${bs}`;
}
function dt(e, t) {
  try {
    const r = localStorage.getItem(ct(e, t));
    if (!r) return null;
    const n = JSON.parse(r);
    return !n || !Array.isArray(n.messages) ? null : n;
  } catch {
    return null;
  }
}
function ks(e, t, r) {
  try {
    const n = { messages: r.messages || [], reports: r.reports || [], activeReportId: r.activeReportId ?? null, followUpQuestions: r.followUpQuestions || [], skillKey: r.skillKey ?? null, sessionId: t, savedAt: Date.now() };
    localStorage.setItem(ct(e, t), JSON.stringify(n)), localStorage.setItem(ws(e), t);
  } catch {
  }
}
function ys(e) {
  const t = e.trim();
  return t ? /(改成|改为|调整|优化|修改|换成|背景|颜色|配色|字体|排版|布局|间距|样式|风格|字号|边距|对齐|居中|加粗|缩小|放大|去掉|删除|增加|添加|报告排版|视觉风格|章节结构)/.test(t) ? true : /[？?]$/.test(t) ? false : t.length <= 120 : false;
}
let vs = 0;
function Le() {
  return `msg-${++vs}-${Date.now()}`;
}
function js(e) {
  const t = e.messages ?? [];
  return t.length === 0 ? [] : t.filter((r) => {
    var _a;
    return r.role === "w6" || ((_a = r.content) == null ? void 0 : _a.trim());
  }).map((r, n) => {
    const a = r.role === "user" || r.role === "assistant" || r.role === "system" || r.role === "w6" ? r.role : "assistant";
    return { id: `srv-${n}-${r.timestamp ?? Date.now()}`, role: a, content: r.content, timestamp: r.timestamp ?? Date.now(), followUpQuestions: r.follow_up_questions ?? null, ...a === "w6" ? { w6Status: "done", w6LastLine: r.content || "W6 \u8C03\u7814\u5DF2\u5B8C\u6210", w6Events: [] } : {} };
  });
}
function ut(e) {
  return e === "document";
}
function We(e, t, r) {
  const n = Me(e);
  return { id: `${n}#${r}`, url: n, resourceId: e, title: t, timestamp: Date.now(), kind: "html" };
}
function ke(e, t, r, n) {
  const a = e ? Me(e) : "";
  return { id: n ? `md-inline#${r}` : `${a || e}#md-${r}`, url: a, resourceId: e, title: t, timestamp: Date.now(), kind: "markdown", markdown: n };
}
async function Ss(e) {
  const t = await ot(e);
  if (t.length === 0) return { reports: [], activeReportId: null };
  const r = t.map((i, u) => {
    const p = de(i.url || i.id), b = i.title || "\u62A5\u544A";
    return ut(i.type) ? ke(p, b, `r${u}`) : We(p || i.url || i.id, b, `r${u}`);
  }), n = r.filter((i) => i.kind === "html"), a = n.length > 0 ? n[n.length - 1].id : r[r.length - 1].id;
  return { reports: r, activeReportId: a };
}
function Ns(e, t, r, n) {
  t.setMessages(e.messages), t.setReports((e.reports ?? []).map((a) => ({ ...a, resourceId: a.resourceId || de(a.url), kind: a.kind || "html" }))), t.setActiveReportId(e.activeReportId), t.setFollowUpQuestions(e.followUpQuestions ?? []), e.sessionId && (r.sessionIdRef.current = e.sessionId, t.setSessionId(e.sessionId)), e.skillKey && (r.skillKeyRef.current = e.skillKey, t.setSkillKey(e.skillKey), ye(e.skillKey, n) && e.sessionId && t.setW6StreamEnabled(true));
}
function Cs(e, t = []) {
  const [r, n] = o.useState([]), [a, i] = o.useState([]), [u, p] = o.useState(null), [b, v] = o.useState(false), [g, N] = o.useState(""), [M, w] = o.useState(null), [S, T] = o.useState([]), [W, R] = o.useState(null), [$, B] = o.useState(false), [ee, H] = o.useState(0), [j, D] = o.useState(null), A = o.useRef(null), d = o.useRef(""), y = o.useRef(""), L = o.useRef(""), G = o.useRef(null), X = o.useRef(null), ae = o.useRef(null), [K, V] = o.useState(null), he = o.useCallback(() => {
    const l = e, x = G.current;
    !l || !x || r.length === 0 && a.length === 0 || ks(l, x, { messages: r, reports: a, activeReportId: u, followUpQuestions: S, skillKey: X.current });
  }, [e, r, a, u, S]);
  o.useEffect(() => {
    he();
  }, [he]);
  const U = o.useCallback((l) => {
    const x = { ...l, id: Le(), timestamp: Date.now() };
    return n((f) => [...f, x]), x.id;
  }, []), te = o.useCallback(() => {
    const l = L.current;
    l && n((f) => f.map((m) => m.id !== l || m.w6Status !== "running" ? m : { ...m, w6Status: "done", w6LastLine: m.w6LastLine || "\u672C\u8F6E\u8C03\u7814\u5DF2\u7ED3\u675F" }));
    const x = U({ role: "w6", content: "", w6Status: "running", w6Progress: 0, w6LastLine: "\u6B63\u5728\u542F\u52A8 W6 \u5B50 Agent\u2026", w6Events: [] });
    return L.current = x, V(x), B(true), H((f) => f + 1), x;
  }, [U]), ve = o.useCallback((l) => {
    const x = L.current;
    if (!x) return;
    let f = "running";
    l.status === "error" ? f = "error" : l.events.some((m) => m.type === "stopped") ? f = "stopped" : l.events.some((m) => m.type === "done") && (f = "done"), n((m) => m.map((h) => h.id === x ? { ...h, w6Status: f, w6Progress: l.progress, w6LastLine: l.lastLine, w6Events: l.events } : h)), (f === "done" || f === "error" || f === "stopped") && (L.current = "", V(null));
  }, []), O = o.useCallback((l) => {
    d.current += l;
    const x = y.current;
    n((f) => {
      const m = f.findIndex((_) => _.id === x);
      if (m === -1) return f;
      const h = [...f];
      return h[m] = { ...h[m], content: d.current }, h;
    });
  }, []), xe = o.useCallback(() => (l) => {
    var _a, _b, _c;
    const x = !!L.current;
    switch (l.type) {
      case "text_delta":
        x || O(l.delta || "");
        break;
      case "phase":
        x || N(l.message || l.phase || "");
        break;
      case "form_request":
        l.schema && w({ schema: l.schema, message: l.message || "\u8BF7\u8865\u5145\u4FE1\u606F" });
        break;
      case "report_md":
        ((_a = l.markdown) == null ? void 0 : _a.trim()) && (ae.current = { markdown: l.markdown, title: l.title }, i((f) => f.some((m) => m.kind === "markdown" && m.markdown === l.markdown) ? f : [...f, ke("", l.title || "\u7814\u7A76\u62A5\u544A (MD)", `sse-${Date.now()}`, l.markdown)]));
        break;
      case "report_html":
        if (l.url || l.id) {
          const f = l.url || l.id || "", m = de(f), h = We(m || f, l.title || "\u672A\u547D\u540D\u62A5\u544A", String(Date.now()));
          i((P) => [...P, h]), p(h.id);
          const _ = ae.current;
          if ((_b = _ == null ? void 0 : _.markdown) == null ? void 0 : _b.trim()) {
            const P = ke("", l.title ? `${l.title} (MD)` : "\u7814\u7A76\u62A5\u544A (MD)", `paired-${Date.now()}`, _.markdown);
            i((F) => F.some((z) => z.kind === "markdown" && (z.markdown === _.markdown || z.title === P.title)) ? F : [...F, P]), ae.current = null;
          }
        }
        break;
      case "follow_up":
        if (((_c = l.questions) == null ? void 0 : _c.length) && (T(l.questions), !x)) {
          const f = y.current;
          n((m) => {
            const h = m.findIndex((P) => P.id === f);
            if (h === -1) return m;
            const _ = [...m];
            return _[h] = { ..._[h], followUpQuestions: l.questions }, _;
          });
        }
        break;
      case "session":
        if (l.sessionId) {
          const f = String(l.sessionId);
          G.current = f, R(f), ye(X.current, t) && B(true);
        }
        break;
      case "error":
        if (x) {
          const f = L.current;
          n((m) => m.map((h) => h.id === f ? { ...h, w6Status: "error", w6LastLine: l.message || "W6 \u6267\u884C\u51FA\u9519" } : h)), L.current = "", V(null);
        } else O(`

\u26A0\uFE0F ${l.message}`);
        break;
    }
  }, [O]), Y = o.useCallback(async (l) => {
    const x = xe(), f = new TextDecoder();
    let m = "";
    for (; ; ) {
      const { done: h, value: _ } = await l.read();
      if (h) break;
      m += f.decode(_, { stream: true });
      const P = m.split(`
`);
      m = P.pop() || "";
      for (const F of P) {
        if (!F.startsWith("data: ")) continue;
        const I = F.slice(6).trim();
        if (I) try {
          x(JSON.parse(I));
        } catch {
        }
      }
    }
  }, [xe]), je = o.useCallback(async (l, x, f, m, h, _) => {
    const P = m.trim();
    if (!P) throw new Error("session_id required before starting W6 chat");
    if (!l.trim()) throw new Error("skill_key required before starting W6 chat");
    i([]), p(null), w(null), T([]), d.current = "", X.current = l, D(l), G.current = P, R(P), ye(l, t) || B(false), v(true), U({ role: "user", content: ps(x, f) }), te(), y.current = "";
    const F = new AbortController();
    A.current = F;
    try {
      const I = await De("/osint-dashboard/chat/start", ls({ sessionId: P, skillKey: l, formData: f, renderedPrompt: h, reportStyle: _ }), F.signal);
      await Y(I);
    } catch (I) {
      if (I.name === "AbortError") return;
      O(`

\u274C \u9519\u8BEF: ${I.message}`);
    } finally {
      v(false), N(""), A.current = null;
    }
  }, [U, O, te, Y]), pe = o.useCallback(async (l, x) => {
    w(null), v(true);
    const f = lt(l);
    U({ role: "user", content: Ue(`\u8865\u5145\u4FE1\u606F${f ? `
${f}` : ""}`) }), te(), y.current = "";
    const m = new AbortController();
    A.current = m;
    try {
      const h = G.current;
      if (!h) throw new Error("session_id required");
      const _ = await De("/osint-dashboard/chat/respond", is({ sessionId: h, formData: l, renderedPrompt: x }), m.signal);
      await Y(_);
    } catch (h) {
      if (h.name === "AbortError") return;
      O(`

\u274C ${h.message}`);
    } finally {
      v(false), N(""), A.current = null;
    }
  }, [U, O, te, Y]), oe = o.useCallback(async (l, x) => {
    const f = G.current;
    if (!f) {
      U({ role: "system", content: "\u26A0\uFE0F \u8BF7\u5148\u5B8C\u6210\u4E00\u4E2A\u7814\u7A76\u4EFB\u52A1\uFF0C\u518D\u5F00\u59CB\u8FFD\u95EE" });
      return;
    }
    v(true), U({ role: "user", content: l }), te(), y.current = "", d.current = "";
    const m = new AbortController();
    A.current = m;
    try {
      const h = await De("/osint-dashboard/chat/message", cs({ sessionId: f, message: x }), m.signal);
      await Y(h);
    } catch (h) {
      if (h.name === "AbortError") return;
      O(`

\u274C ${h.message}`);
    } finally {
      v(false), N(""), A.current = null;
    }
  }, [U, O, te, Y]), be = o.useCallback(async (l, x) => {
    const f = G.current;
    if (!f) {
      U({ role: "system", content: "\u26A0\uFE0F \u8BF7\u5148\u5B8C\u6210\u4E00\u4E2A\u7814\u7A76\u4EFB\u52A1\uFF0C\u518D\u5F00\u59CB\u8FFD\u95EE" });
      return;
    }
    const m = !!(x == null ? void 0 : x.trim());
    v(true), N(m ? "\u6539\u7248\u5F0F\u4E2D\u2026" : "\u5206\u6790\u62A5\u544A\u4E2D\u2026"), U({ role: "user", content: l });
    const h = U({ role: "assistant", content: "" });
    y.current = h, d.current = "";
    const _ = new AbortController();
    A.current = _;
    let P;
    m && (P = setTimeout(() => _.abort(), us));
    try {
      const F = await nt("/osint-dashboard/chat/discuss", ds({ sessionId: f, message: l, targetResourceId: m ? x : void 0 }), _.signal), I = (F.reply ?? "").trim() || "\uFF08\u65E0\u56DE\u590D\uFF09";
      if (d.current = I, n((z) => {
        const Q = z.findIndex((q) => q.id === h);
        if (Q === -1) return z;
        const J = [...z];
        return J[Q] = { ...J[Q], content: I }, J;
      }), F.edited && F.html_resource_id) {
        const z = Me(F.html_resource_id), Q = u;
        i((J) => J.map((q) => Q && q.id !== Q || !Q && J.length > 0 && q.id !== J[J.length - 1].id ? q : { ...q, url: `${z}${z.includes("?") ? "&" : "?"}t=${Date.now()}`, resourceId: F.html_resource_id, timestamp: Date.now() }));
      }
    } catch (F) {
      if (F.name === "AbortError") {
        m && O(`

\u274C \u62A5\u544A\u6539\u7248\u5F0F\u8BF7\u6C42\u8D85\u65F6\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u6216\u5C1D\u8BD5\u66F4\u7B80\u77ED\u7684\u4FEE\u6539\u6307\u4EE4\u3002`);
        return;
      }
      O(`

\u274C ${F.message}`);
    } finally {
      P !== void 0 && clearTimeout(P), v(false), N(""), A.current = null;
    }
  }, [U, O, u]), ge = o.useCallback(async (l) => {
    if (!l.trim() || b) return;
    const x = Ue(l.trim());
    await oe(x, l.trim());
  }, [b, oe]), fe = o.useCallback(async (l) => {
    var _a;
    if (!l.trim() || b) return;
    const x = l.trim();
    if (hs(x)) {
      await oe(x, xs(x));
      return;
    }
    const f = u ? a.find((_) => _.id === u) : a[a.length - 1], m = ((_a = f == null ? void 0 : f.resourceId) == null ? void 0 : _a.trim()) || de((f == null ? void 0 : f.url) || ""), h = m && ys(x) ? m : void 0;
    await be(x, h);
  }, [b, oe, be, u, a]), Te = o.useCallback(async (l) => {
    var _a, _b, _c, _d;
    (_a = A.current) == null ? void 0 : _a.abort(), v(false), N(""), w(null);
    const x = e ? dt(e, l) : null;
    let f = null;
    try {
      f = await at(l);
    } catch {
    }
    const m = f ? js(f) : [], h = m.length > 0, _ = !h && !!x;
    G.current = l, R(l);
    const P = ((_b = f == null ? void 0 : f.skill_key) == null ? void 0 : _b.trim()) || ((_c = x == null ? void 0 : x.skillKey) == null ? void 0 : _c.trim()) || null;
    if (X.current = P, D(P), ye(P, t) ? (B(true), ((f == null ? void 0 : f.w6_stream_active) || x || m.length > 0) && H((I) => I + 1)) : B(false), _ && x) {
      Ns(x, { setMessages: n, setReports: i, setActiveReportId: p, setFollowUpQuestions: T, setSessionId: R, setW6StreamEnabled: B, setSkillKey: D }, { sessionIdRef: G, skillKeyRef: X }, t);
      const I = [...x.messages].reverse().find((z) => z.role === "w6" && z.w6Status === "running");
      I && (L.current = I.id, V(I.id));
    } else if (h) n(m), T((f == null ? void 0 : f.follow_ups) ?? []);
    else {
      const I = (f == null ? void 0 : f.w6_stream_active) ? "\u5DF2\u91CD\u8FDE\u8FDB\u884C\u4E2D\u7684\u4F1A\u8BDD\uFF0CW6 \u5B50 Agent \u72B6\u6001\u89C1\u4E0B\u65B9\u8FDB\u5EA6\u6761\u3002" : "\u5DF2\u52A0\u8F7D\u4F1A\u8BDD\u3002\u53EF\u7EE7\u7EED\u8FFD\u95EE\u6216\u9009\u62E9\u6280\u80FD\u5F00\u59CB\u65B0\u4EFB\u52A1\u3002";
      n([{ id: Le(), role: "system", content: I, timestamp: Date.now() }]), T((f == null ? void 0 : f.follow_ups) ?? []);
    }
    if ((f == null ? void 0 : f.w6_stream_active) && n((I) => {
      const z = [...I].reverse().find((J) => J.role === "w6");
      if ((z == null ? void 0 : z.w6Status) === "running") return L.current = z.id, V(z.id), I;
      const Q = Le();
      return L.current = Q, V(Q), [...I, { id: Q, role: "w6", content: "", timestamp: Date.now(), w6Status: "running", w6Progress: 0, w6LastLine: "W6 \u5B50 Agent \u8FD0\u884C\u4E2D\u2026", w6Events: [] }];
    }), !_ || (((_d = x == null ? void 0 : x.reports) == null ? void 0 : _d.length) ?? 0) === 0) try {
      const { reports: I, activeReportId: z } = await Ss(l);
      I.length > 0 && (i(I), p(z));
    } catch {
    }
  }, [e]), Se = o.useCallback(() => {
    var _a;
    (_a = A.current) == null ? void 0 : _a.abort(), n([]), i([]), p(null), w(null), T([]), N(""), d.current = "", y.current = "", L.current = "", V(null), G.current = null, X.current = null, D(null), R(null), B(false), H(0), v(false);
  }, []), Ne = o.useCallback((l) => {
    G.current = l, R(l);
  }, []), _e = o.useCallback((l) => {
    i((x) => x.filter((f) => f.id !== l)), p((x) => x === l ? null : x);
  }, []), le = o.useCallback((l) => {
    const x = l.resourceId || de(l.url), f = { ...l, resourceId: x, kind: l.kind || "html" };
    i((m) => {
      var _a;
      return f.resourceId && m.some((h) => h.resourceId === f.resourceId && h.kind === f.kind) || f.kind === "markdown" && ((_a = f.markdown) == null ? void 0 : _a.trim()) && m.some((h) => h.kind === "markdown" && h.markdown === f.markdown) ? m : [...m, f];
    }), f.kind === "html" && p(f.id);
  }, []), Ce = o.useCallback(async (l) => {
    var _a, _b;
    ((_a = l.followUps) == null ? void 0 : _a.length) && T(l.followUps), ((_b = l.markdown) == null ? void 0 : _b.trim()) && le(ke("", l.roundTitle ? `${l.roundTitle} (MD)` : "\u7814\u7A76\u62A5\u544A (MD)", `w6-md-${Date.now()}`, l.markdown));
    const x = l.reportUrl || l.previewFile;
    if (x) {
      le(We(de(x), l.roundTitle || "\u62A5\u544A", `w6-${Date.now()}`));
      return;
    }
    const f = G.current;
    if (f) try {
      const m = await ot(f);
      if (m.length === 0) return;
      for (const h of m) {
        const _ = de(h.url || h.id);
        ut(h.type) ? le(ke(_, h.title || "\u7814\u7A76\u62A5\u544A (MD)", `w6-fb-${h.id}`)) : le(We(_, h.title || "\u62A5\u544A", `w6-fb-${h.id}`));
      }
    } catch {
    }
  }, [le]), Ae = o.useCallback(() => {
    var _a;
    (_a = A.current) == null ? void 0 : _a.abort(), v(false), N("");
  }, []), Pe = o.useCallback((l, x) => {
    const f = (x == null ? void 0 : x.map((h) => h.name).filter(Boolean)) ?? [], m = f.length > 0 ? `${l.trim()}

\u{1F4CE} ${f.join("\u3001")}`.trim() : l.trim();
    U({ role: "user", content: m });
  }, [U]);
  return { messages: r, reports: a, activeReportId: u, isStreaming: b, currentPhase: g, currentForm: M, followUpQuestions: S, sessionId: W, w6StreamEnabled: $, w6StreamRound: ee, skillKey: j, startChat: je, respondToForm: pe, sendMessage: fe, sendW6Message: ge, abort: Ae, resetForNewSkill: Se, closeReport: _e, setActiveReportId: p, restoreSession: Te, bindSession: Ne, addReportFromW6Done: Ce, skillKeyRef: X, activeW6MessageId: K, syncActiveW6Message: ve, appendUserMessage: Pe };
}
function Rs(e, t) {
  return e ? e.type === t.type && e.message === t.message && e.token === t.token && e.progress === t.progress : false;
}
function $s(e, t, r, n, a, i, u) {
  t((b) => Rs(b[b.length - 1], e) ? b : [...b, e]), e.progress != null && r(e.progress);
  const p = e.message || e.token || "";
  p && n(p.slice(0, 120)), e.type === "done" && (a("idle"), i("closed"), u.close()), e.type === "stopped" && (a("idle"), i("closed"), u.close()), e.type === "error" && (a("error"), i("error"), u.close());
}
function Es(e, t, r = 0) {
  const [n, a] = o.useState([]), [i, u] = o.useState("idle"), [p, b] = o.useState("idle"), [v, g] = o.useState(0), [N, M] = o.useState(""), w = o.useRef(null), S = o.useRef(false), T = o.useRef(null), W = o.useRef(false), R = o.useCallback(() => {
    T.current && (clearTimeout(T.current), T.current = null);
  }, []), $ = o.useCallback(() => {
    var _a;
    if (!e || !t) return;
    R(), S.current = false, W.current = false, (_a = w.current) == null ? void 0 : _a.close(), a([]), u("running"), b("connecting"), g(0), M("");
    const H = new EventSource(os(e));
    w.current = H, H.onopen = () => b("open"), H.onmessage = (j) => {
      try {
        const D = JSON.parse(j.data), A = D.type === "done" || D.type === "stopped" || D.type === "error";
        if (A && !W.current) return;
        A || (W.current = true), A && (S.current = true), $s(D, a, g, M, u, b, H);
      } catch {
      }
    }, H.onerror = () => {
      if (H.close(), w.current = null, !S.current) {
        if (t && e) {
          b("connecting"), u("running"), T.current = setTimeout(() => {
            $();
          }, 1500);
          return;
        }
        b("error"), u("error");
      }
    };
  }, [e, t, R]);
  o.useLayoutEffect(() => {
    var _a;
    return t && e ? $() : (R(), S.current = true, (_a = w.current) == null ? void 0 : _a.close(), w.current = null, t || (a([]), u("idle"), b("idle"), g(0), M(""))), () => {
      var _a2;
      R(), S.current = true, (_a2 = w.current) == null ? void 0 : _a2.close(), w.current = null;
    };
  }, [e, t, r, $, R]);
  const B = o.useCallback(() => {
    var _a;
    R(), S.current = true, (_a = w.current) == null ? void 0 : _a.close(), w.current = null, a([]), u("idle"), b("idle"), g(0), M("");
  }, [R]), ee = o.useCallback(async () => {
    var _a;
    if (e) {
      R(), S.current = true, (_a = w.current) == null ? void 0 : _a.close(), w.current = null, u("idle"), b("closed"), M("\u5DF2\u624B\u52A8\u505C\u6B62 W6 \u8C03\u7814");
      try {
        await fs(e);
      } catch {
        u("error"), b("error"), M("\u505C\u6B62 W6 \u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5");
      }
    }
  }, [e]);
  return { events: n, status: i, connection: p, progress: v, lastLine: N, reset: B, stop: ee, reconnect: $ };
}
function Ws(e) {
  const [t, r] = o.useState(""), [n, a] = o.useState(false), [i, u] = o.useState(null);
  return o.useEffect(() => {
    var _a, _b;
    if (!e || e.kind !== "markdown") {
      r(""), u(null), a(false);
      return;
    }
    if ((_a = e.markdown) == null ? void 0 : _a.trim()) {
      r(e.markdown), u(null), a(false);
      return;
    }
    const p = (_b = e.resourceId) == null ? void 0 : _b.trim();
    if (!p) {
      r(""), u("\u6682\u65E0 Markdown \u5185\u5BB9"), a(false);
      return;
    }
    let b = false;
    const v = new AbortController();
    a(true), u(null);
    const g = ne(), N = { Accept: "text/markdown,text/plain,*/*" };
    g && (N.Authorization = `Bearer ${g}`);
    const M = e.url || Me(p), w = g ? `${M}${M.includes("?") ? "&" : "?"}token=${encodeURIComponent(g)}` : M;
    return fetch(w, { headers: N, signal: v.signal }).then(async (S) => {
      if (!S.ok) throw new Error(`HTTP ${S.status}`);
      return S.text();
    }).then((S) => {
      b || r(S);
    }).catch((S) => {
      b || S instanceof DOMException && S.name === "AbortError" || u(S instanceof Error ? S.message : "\u52A0\u8F7D\u5931\u8D25");
    }).finally(() => {
      b || a(false);
    }), () => {
      b = true, v.abort();
    };
  }, [e]), { content: t, loading: n, error: i };
}
function Is({ reports: e, activeReportId: t, onActiveChange: r, onReportClose: n }) {
  const { addToast: a } = Ke(), [i, u] = o.useState(0), [p, b] = o.useState(null), v = o.useRef(e.length);
  o.useEffect(() => {
    if (e.length === 0 || t && e.some((A) => A.id === t)) return;
    const j = e.filter((A) => A.kind === "html"), D = j.length > 0 ? j[j.length - 1] : e[e.length - 1];
    r(D.id);
  }, [e, t, r]), o.useEffect(() => {
    if (t && e.length > v.current) {
      const j = e[e.length - 1];
      j.kind === "html" && r(j.id);
    }
    v.current = e.length;
  }, [t, e, r]);
  const g = e.find((j) => j.id === t), { content: N, loading: M, error: w } = Ws(g), S = (g == null ? void 0 : g.kind) === "markdown" && !M && !w && !!N.trim(), T = o.useCallback(() => {
    var _a;
    const j = (_a = g == null ? void 0 : g.resourceId) == null ? void 0 : _a.trim();
    if (!j) {
      a("error", "\u65E0\u6CD5\u4E0B\u8F7D\u8BE5\u62A5\u544A");
      return;
    }
    window.open(ms(j), "_blank"), a("success", "\u4E0B\u8F7D\u5DF2\u5F00\u59CB");
  }, [g == null ? void 0 : g.resourceId, a]), W = o.useCallback(() => {
    const j = N.trim();
    if (!j) {
      a("error", "\u6682\u65E0\u5185\u5BB9\u53EF\u4E0B\u8F7D");
      return;
    }
    It(j, (g == null ? void 0 : g.title) || "\u62A5\u544A"), a("success", "Markdown \u4E0B\u8F7D\u5DF2\u5F00\u59CB");
  }, [N, g == null ? void 0 : g.title, a]), R = o.useCallback(async () => {
    const j = N.trim();
    if (!j) {
      a("error", "\u6682\u65E0\u5185\u5BB9\u53EF\u5BFC\u51FA");
      return;
    }
    b("word");
    try {
      await Mt(j, (g == null ? void 0 : g.title) || "\u62A5\u544A"), a("success", "Word \u5BFC\u51FA\u5DF2\u5F00\u59CB");
    } catch (D) {
      a("error", D instanceof Error ? D.message : "Word \u5BFC\u51FA\u5931\u8D25");
    } finally {
      b(null);
    }
  }, [N, g == null ? void 0 : g.title, a]), $ = o.useCallback(async () => {
    const j = N.trim();
    if (!j) {
      a("error", "\u6682\u65E0\u5185\u5BB9\u53EF\u5BFC\u51FA");
      return;
    }
    b("pdf");
    try {
      await Tt(j, (g == null ? void 0 : g.title) || "\u62A5\u544A"), a("success", "PDF \u5BFC\u51FA\u5DF2\u5F00\u59CB");
    } catch (D) {
      a("error", D instanceof Error ? D.message : "PDF \u5BFC\u51FA\u5931\u8D25");
    } finally {
      b(null);
    }
  }, [N, g == null ? void 0 : g.title, a]), B = (j, D) => {
    D.stopPropagation();
    const A = e.findIndex((y) => y.id === j), d = e.filter((y) => y.id !== j);
    if (t === j && d.length > 0) {
      const y = Math.min(A, d.length - 1);
      r(d[y].id);
    }
    n(j);
  };
  if (e.length === 0) return s.jsxs("div", { className: "flex h-full flex-col items-center justify-center bg-[#f7f8fa] text-slate-500 dark:bg-slate-950", children: [s.jsx(He, { size: 40, className: "mb-3 opacity-30" }), s.jsx("div", { className: "text-sm font-medium text-slate-600 dark:text-slate-400", children: "\u62A5\u544A\u9884\u89C8" }), s.jsx("div", { className: "mt-1 max-w-xs text-center text-xs text-slate-400", children: "\u5B8C\u6210 W6 \u7814\u7A76\u4EFB\u52A1\u540E\uFF0CHTML \u4E0E Markdown \u62A5\u544A\u5C06\u5728\u6B64\u5B9E\u65F6\u9884\u89C8" })] });
  const ee = (g == null ? void 0 : g.kind) === "markdown", H = (g == null ? void 0 : g.kind) === "html" || !(g == null ? void 0 : g.kind);
  return s.jsxs("div", { className: "flex h-full min-h-0 flex-col bg-white dark:bg-slate-900", children: [s.jsxs("div", { className: "flex shrink-0 items-center overflow-hidden border-b border-slate-200/90 bg-slate-50/80 dark:border-slate-800 dark:bg-slate-900/80", children: [s.jsx("div", { className: "flex flex-1 items-center overflow-x-auto", children: e.map((j, D) => {
    const A = j.id === t, d = D === e.length - 1, y = j.kind === "markdown";
    return s.jsxs("button", { type: "button", onClick: () => r(j.id), className: `group flex max-w-[220px] shrink-0 items-center gap-1.5 whitespace-nowrap border-r border-slate-200/90 px-3 py-2 text-xs transition-colors dark:border-slate-800 ${A ? "-mb-px border-b-0 border-t-2 border-t-blue-600 bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100" : "text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:hover:bg-slate-800 dark:hover:text-slate-200"}`, title: j.title, children: [y ? s.jsx(_t, { size: 12, className: "shrink-0 text-emerald-600 dark:text-emerald-400" }) : s.jsx(He, { size: 12, className: "shrink-0" }), s.jsx("span", { className: "truncate", children: j.title }), d && !A ? s.jsx("span", { className: "h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-blue-500" }) : null, s.jsx("span", { role: "button", tabIndex: 0, onClick: (L) => B(j.id, L), onKeyDown: (L) => {
      L.key === "Enter" && B(j.id, L);
    }, className: "ml-0.5 shrink-0 rounded p-0.5 opacity-0 transition-opacity hover:bg-red-100 group-hover:opacity-100 dark:hover:bg-red-950/40", children: s.jsx(tt, { size: 10 }) })] }, j.id);
  }) }), g ? s.jsxs("div", { className: "flex shrink-0 items-center gap-1 border-l border-slate-200/90 px-2 dark:border-slate-800", children: [ee && S ? s.jsxs(s.Fragment, { children: [s.jsx("button", { type: "button", onClick: W, disabled: p !== null, className: "rounded px-2 py-1 text-[11px] text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-800 disabled:cursor-not-allowed disabled:opacity-50 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200", title: "\u4E0B\u8F7D Markdown", children: "\u4E0B\u8F7D MD" }), s.jsx("button", { type: "button", onClick: R, disabled: p !== null, className: "rounded px-2 py-1 text-[11px] text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-800 disabled:cursor-not-allowed disabled:opacity-50 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200", title: "\u5BFC\u51FA Word", children: p === "word" ? "\u5BFC\u51FA\u4E2D\u2026" : "\u5BFC\u51FA Word" }), s.jsx("button", { type: "button", onClick: $, disabled: p !== null, className: "rounded px-2 py-1 text-[11px] text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-800 disabled:cursor-not-allowed disabled:opacity-50 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200", title: "\u5BFC\u51FA PDF", children: p === "pdf" ? "\u5BFC\u51FA\u4E2D\u2026" : "\u5BFC\u51FA PDF" })] }) : null, H ? s.jsxs(s.Fragment, { children: [s.jsx("button", { type: "button", onClick: () => u((j) => j + 1), className: "rounded p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800 dark:hover:bg-slate-800", title: "\u5237\u65B0", children: s.jsx(At, { size: 13 }) }), s.jsx("a", { href: g.url, target: "_blank", rel: "noopener noreferrer", className: "rounded p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800 dark:hover:bg-slate-800", title: "\u65B0\u7A97\u53E3\u6253\u5F00", children: s.jsx(Pt, { size: 13 }) }), s.jsx("button", { type: "button", onClick: T, className: "rounded p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800 dark:hover:bg-slate-800", title: "\u4E0B\u8F7D HTML", children: s.jsx(Dt, { size: 13 }) })] }) : null] }) : null] }), s.jsx("div", { className: "relative min-h-0 flex-1 overflow-hidden bg-white dark:bg-slate-900", children: g ? ee ? s.jsx("div", { className: "h-full overflow-y-auto p-4", children: M ? s.jsxs("div", { className: "flex h-full items-center justify-center text-sm text-slate-500", children: [s.jsx("span", { className: "mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-slate-600" }), "\u6B63\u5728\u52A0\u8F7D Markdown\u2026"] }) : w ? s.jsx("div", { className: "flex h-full flex-col items-center justify-center gap-2 text-sm text-slate-500", children: s.jsxs("p", { children: ["\u52A0\u8F7D\u5931\u8D25: ", w] }) }) : s.jsx(Lt, { content: N.trim() || "\u65E0\u5185\u5BB9" }) }) : s.jsx("iframe", { src: g.url, className: "block h-full w-full border-0", title: g.title, sandbox: "allow-scripts allow-same-origin" }, `${g.id}-${i}`) : s.jsx("div", { className: "absolute inset-0 flex items-center justify-center text-slate-400", children: s.jsx("div", { className: "text-center text-sm", children: "\u8BF7\u9009\u62E9\u4E00\u4E2A\u62A5\u544A\u6807\u7B7E" }) }) })] });
}
function Oe(e, t) {
  return t == null || t === "" ? false : Array.isArray(t) ? t.length > 0 : true;
}
function Ms(e, t) {
  const r = { ...t };
  for (const n of e) !Oe(n, r[n.name]) && n.default !== void 0 && (r[n.name] = n.default);
  return r;
}
function Ts(e, t) {
  for (const r of e) if (r.required && !Oe(r, t[r.name] ?? r.default)) return false;
  return true;
}
function Ve({ fields: e, onSubmit: t, disabled: r = false, stepMode: n = true }) {
  const [a, i] = o.useState(() => Qe(e)), [u, p] = o.useState(0), b = e.map((W) => W.name).join("\0");
  if (o.useEffect(() => {
    i(Qe(e)), p(0);
  }, [b]), e.length === 0) return s.jsx("p", { className: "text-xs text-slate-500", children: "form_schema \u65E0\u6709\u6548 fields" });
  const v = () => {
    t(Ms(e, a));
  };
  if (!n) return s.jsxs("div", { className: "space-y-3 rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900", children: [s.jsx(Ge, { fields: e, formData: a, onChange: (W, R) => i(($) => ({ ...$, [W]: R })), compact: true }), s.jsxs("button", { type: "button", onClick: v, disabled: r || !Ts(e, a), className: "flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white", children: [s.jsx(ze, { size: 14 }), "\u63D0\u4EA4"] })] });
  const g = e[u], N = u >= e.length - 1, M = a[g.name], w = !g.required || Oe(g, M ?? g.default), S = () => {
    N ? v() : p((W) => W + 1);
  }, T = () => {
    N ? v() : p((W) => W + 1);
  };
  return s.jsxs("div", { className: "rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900", children: [s.jsxs("div", { className: "mb-4 flex items-center gap-1.5", children: [e.map((W, R) => s.jsx("div", { className: `h-1 flex-1 rounded-full transition-colors ${R < u ? "bg-blue-600 dark:bg-blue-500" : R === u ? "bg-blue-400 dark:bg-blue-400/70" : "bg-slate-200 dark:bg-slate-700"}` }, R)), s.jsxs("span", { className: "ml-1 text-xs text-slate-500 dark:text-slate-400", children: [u + 1, "/", e.length] })] }), s.jsx(Ge, { fields: [g], formData: a, onChange: (W, R) => i(($) => ({ ...$, [W]: R })), compact: true }), s.jsxs("div", { className: "mt-4 flex items-center gap-2", children: [s.jsxs("button", { type: "button", onClick: () => p((W) => Math.max(0, W - 1)), disabled: r || u === 0, className: "flex items-center gap-1 px-3 py-2 text-xs text-slate-500 transition-colors hover:text-slate-800 disabled:cursor-not-allowed disabled:opacity-40 dark:text-slate-400 dark:hover:text-slate-200", children: [s.jsx(Ft, { size: 14 }), "\u4E0A\u4E00\u6B65"] }), s.jsx("div", { className: "flex-1" }), g.required ? null : s.jsxs("button", { type: "button", onClick: T, disabled: r, className: "flex items-center gap-1 rounded-lg px-3 py-2 text-xs text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 disabled:opacity-40 dark:hover:bg-slate-800 dark:hover:text-slate-300", children: [s.jsx(zt, { size: 14 }), "\u8DF3\u8FC7"] }), s.jsx("button", { type: "button", onClick: S, disabled: r || !w, className: "flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-blue-600 dark:hover:bg-blue-500", children: N ? s.jsxs(s.Fragment, { children: [s.jsx(ze, { size: 14 }), "\u5F00\u59CB\u6267\u884C"] }) : s.jsxs(s.Fragment, { children: ["\u4E0B\u4E00\u6B65", s.jsx(st, { size: 14 })] }) })] })] });
}
function _s({ questions: e, onClick: t }) {
  return (e == null ? void 0 : e.length) ? s.jsxs("div", { className: "mt-4 border-t border-slate-200 pt-3 dark:border-slate-700", children: [s.jsx("div", { className: "mb-2 text-xs font-medium text-slate-500 dark:text-slate-400", children: "\u6DF1\u5EA6\u8C03\u7814\u65B9\u5411" }), s.jsx("div", { className: "space-y-1.5", children: e.map((r, n) => s.jsxs("button", { type: "button", onClick: () => t(r), className: "group flex w-full items-start gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-left transition-colors hover:border-blue-300 hover:bg-blue-50/80 dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-blue-700 dark:hover:bg-blue-950/30", children: [s.jsx("span", { className: "flex-1 text-xs leading-relaxed text-slate-700 group-hover:text-slate-900 dark:text-slate-300 dark:group-hover:text-slate-100", children: r }), s.jsx(st, { size: 14, className: "mt-0.5 shrink-0 text-slate-400 transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400" })] }, n)) })] }) : null;
}
function Je({ topic: e, onSelect: t, disabled: r }) {
  return s.jsx("button", { type: "button", disabled: r, onClick: () => t(e), title: e.text, className: "inline-flex max-w-full items-center gap-1.5 truncate rounded-full border border-slate-200 bg-white px-3 py-1.5 text-left text-xs text-slate-700 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-300 dark:hover:border-blue-700 dark:hover:bg-blue-950/40 dark:hover:text-blue-300", children: s.jsx("span", { className: "truncate", children: e.text }) });
}
function As({ w6Topics: e, discussTopics: t = [], onSelect: r, disabled: n }) {
  return !e.length && !t.length ? null : s.jsxs("div", { className: "mb-2 space-y-2", children: [e.length > 0 ? s.jsxs("div", { children: [s.jsx("div", { className: "mb-1.5 text-xs font-medium text-slate-500 dark:text-slate-400", children: "\u6DF1\u5EA6\u8C03\u7814" }), s.jsx("div", { className: "flex flex-wrap gap-1.5", children: e.map((a) => s.jsx(Je, { topic: a, onSelect: r, disabled: n }, `w6-${a.text}`)) })] }) : null, t.length > 0 ? s.jsxs("div", { children: [s.jsxs("div", { className: "mb-1.5 text-xs font-medium text-slate-500 dark:text-slate-400", children: ["\u62A5\u544A\u8C03\u6574", s.jsx("span", { className: "ml-1 font-normal text-slate-400 dark:text-slate-500", children: "\uFF08\u6539\u7248\u5F0F / \u8BA8\u8BBA\uFF09" })] }), s.jsx("div", { className: "flex flex-wrap gap-1.5", children: t.map((a) => s.jsx(Je, { topic: a, onSelect: r, disabled: n }, `discuss-${a.text}`)) })] }) : null] });
}
const Ps = 4, Ds = [{ text: "\u4F18\u5316\u62A5\u544A\u6392\u7248\u4E0E\u7AE0\u8282\u7ED3\u6784", mode: "discuss" }, { text: "\u8C03\u6574\u62A5\u544A\u89C6\u89C9\u98CE\u683C\u4E0E\u914D\u8272", mode: "discuss" }];
function Ls(e) {
  for (let t = e.length - 1; t >= 0; t--) {
    const r = e[t].followUpQuestions;
    if (r == null ? void 0 : r.length) return r;
  }
  return [];
}
function Fs(e, t) {
  const r = (t == null ? void 0 : t.trim()) || "\u672C\u6B21\u7814\u7A76\u4E3B\u9898";
  return e === "info_research" ? [`\u9488\u5BF9\u300C${r}\u300D\u8FD8\u6709\u54EA\u4E9B\u4FE1\u606F\u7F3A\u53E3\u9700\u8981\u8865\u5145\u8C03\u7814\uFF1F`, "\u8BF7\u68B3\u7406\u62A5\u544A\u4E2D\u7684\u5173\u952E\u5B9E\u4F53\u53CA\u5176\u5173\u8054\u5173\u7CFB", "\u5BF9\u6BD4\u4E0D\u540C\u4FE1\u6E90\u5BF9\u8BE5\u4E3B\u9898\u7684\u8BF4\u6CD5\u5DEE\u5F02", "\u8BF7\u7ED9\u51FA 3 \u6761\u53EF\u6267\u884C\u7684\u540E\u7EED\u5F00\u6E90\u8C03\u67E5\u65B9\u5411"] : e === "data_collection" ? [`\u300C${r}\u300D\u76F8\u5173\u516C\u5F00\u6570\u636E\u8FD8\u6709\u54EA\u4E9B\u672A\u6536\u5F55\uFF1F`, "\u8BF7\u9A8C\u8BC1\u62A5\u544A\u4E2D\u5173\u952E\u6570\u636E\u7684\u539F\u59CB\u51FA\u5904", "\u54EA\u4E9B\u6307\u6807\u503C\u5F97\u5EFA\u7ACB\u6301\u7EED\u76D1\u6D4B\uFF1F", "\u8BF7\u5217\u51FA\u53EF\u590D\u7528\u7684\u6570\u636E\u91C7\u96C6\u6E20\u9053\u4E0E\u65B9\u6CD5"] : [`\u62A5\u544A\u4E2D\u5BF9\u300C${r}\u300D\u7684\u6838\u5FC3\u7ED3\u8BBA\u662F\u4EC0\u4E48\uFF1F`, "\u6709\u54EA\u4E9B\u5173\u952E\u8BC1\u636E\u4ECD\u9700\u8981\u8FDB\u4E00\u6B65\u6838\u5B9E\uFF1F", "\u5982\u679C\u8BE5\u4E3B\u5F20\u5728\u793E\u4EA4\u5A92\u4F53\u4F20\u64AD\uFF0C\u5E94\u5982\u4F55\u8F9F\u8C23\u6216\u6807\u6CE8\uFF1F", "\u8BF7\u5217\u51FA 3 \u6761\u53EF\u6267\u884C\u7684\u4E0B\u4E00\u6B65\u8C03\u67E5\u5EFA\u8BAE\u3002"];
}
function zs(e) {
  const t = e.limit ?? Ps, r = /* @__PURE__ */ new Set(), n = [], a = (i) => {
    const u = i.trim();
    !u || r.has(u) || n.length >= t || (r.add(u), n.push({ text: u, mode: "w6" }));
  };
  for (const i of e.followUpQuestions) a(i);
  for (const i of e.w6FollowUps ?? []) a(i);
  for (const i of Ls(e.messages)) a(i);
  if (n.length < t) {
    for (const i of Fs(e.skillKey, e.reportTitle)) if (a(i), n.length >= t) break;
  }
  return n;
}
function Us(e) {
  const t = zs(e), r = e.includeLayoutTopics === false ? [] : [...Ds];
  return { w6Topics: t, discussTopics: r };
}
function Ks({ content: e }) {
  if (!(e.startsWith(Ee) || e.trimStart().toLowerCase().startsWith("@w6 "))) return s.jsx("pre", { className: "whitespace-pre-wrap font-sans", children: e });
  const r = e.startsWith(Ee) ? e.slice(Ee.length) : e.trimStart().slice(4);
  return s.jsxs("pre", { className: "whitespace-pre-wrap font-sans", children: [s.jsx("span", { className: "rounded bg-blue-500/25 px-1 font-semibold text-blue-200 dark:bg-blue-600/20 dark:text-blue-700", children: "@w6" }), s.jsx("span", { children: " " }), r] });
}
const Bs = { tool: "\u5DE5\u5177", status: "\u72B6\u6001", phase: "\u9636\u6BB5", log: "\u65E5\u5FD7", token: "\u8F93\u51FA" };
function ft(e) {
  var _a, _b;
  const t = ((_a = e.message) == null ? void 0 : _a.trim()) || ((_b = e.token) == null ? void 0 : _b.trim()) || (e.type === "done" ? "\u8C03\u7814\u5B8C\u6210" : e.type === "stopped" ? "\u5DF2\u624B\u52A8\u505C\u6B62 W6 \u8C03\u7814" : e.type === "error" ? "\u6267\u884C\u5931\u8D25" : "");
  if (!t) return "";
  const r = Bs[e.type];
  return r ? `[${r}] ${t}` : t;
}
function Os(e, t = 8) {
  const r = [];
  for (const n of e) {
    const a = ft(n);
    a && r.push(a);
  }
  return r.length <= t ? r : r.slice(-t);
}
function Hs(e, t = 8) {
  var _a;
  const r = [];
  let n = "";
  const a = () => {
    if (!n) return;
    const i = n.length > 160 ? `\u2026${n.slice(-160)}` : n;
    r.push(`[\u8F93\u51FA] ${i}`), n = "";
  };
  for (const i of e) {
    if (i.type === "token" && ((_a = i.token) == null ? void 0 : _a.trim())) {
      n += i.token;
      continue;
    }
    a();
    const u = ft(i);
    u && r.push(u);
  }
  return a(), r.length <= t ? r : r.slice(-t);
}
function Xe(e, t, r, n = []) {
  const a = n.some((u) => u.type === "done" || u.type === "stopped"), i = n.some((u) => u.type === "error");
  if (r) return e === "running" ? t === "error" || i ? "error" : t === "running" ? "running" : a && t === "idle" ? "done" : "running" : t === "running" ? "running" : t === "error" || i ? "error" : a || e === "done" || e === "stopped" ? "done" : "idle";
  switch (e) {
    case "running":
      return "running";
    case "error":
      return "error";
    case "done":
    case "stopped":
      return "done";
    default:
      return "idle";
  }
}
const Qs = { idle: "\u672A\u8FDE\u63A5", connecting: "\u8FDE\u63A5\u4E2D", open: "\u5DF2\u8FDE\u63A5", closed: "\u5DF2\u7ED3\u675F", error: "\u8FDE\u63A5\u5F02\u5E38" };
function Gs(e, t) {
  return (t == null ? void 0 : t.trim()) ? t.trim() : e === "connecting" ? "\u6B63\u5728\u8FDE\u63A5 W6 \u8F93\u51FA\u6D41\u2026" : e === "open" ? "\u5DF2\u8FDE\u63A5\uFF0C\u7B49\u5F85 W6 \u8F93\u51FA\u2026" : e === "error" ? "\u8FDE\u63A5\u5F02\u5E38\uFF0C\u6B63\u5728\u91CD\u8BD5\u2026" : "\u6B63\u5728\u542F\u52A8 W6 \u5B50 Agent\u2026";
}
function Vs({ status: e, progress: t, lastLine: r, connection: n, events: a = [], onClick: i, onStop: u, stopping: p = false }) {
  const b = e === "running" ? "W6 \u6DF1\u5EA6\u8C03\u7814 \xB7 \u8FD0\u884C\u4E2D" : e === "error" ? "W6 \u5B50 Agent \xB7 \u51FA\u9519" : e === "done" ? "W6 \u5B50 Agent \xB7 \u5DF2\u5B8C\u6210" : "W6 \u5B50 Agent \xB7 \u5F85\u547D", v = e === "running" ? "border-blue-300/60 bg-blue-50/80 dark:border-blue-700 dark:bg-blue-950/30" : e === "error" ? "border-red-300/60 bg-red-50/80 dark:border-red-800 dark:bg-red-950/30" : e === "done" ? "border-emerald-300/60 bg-emerald-50/80 dark:border-emerald-800 dark:bg-emerald-950/20" : "border-slate-300/60 bg-slate-50/80 dark:border-slate-700 dark:bg-slate-900/30", g = e === "running" && !!u, N = e === "running" ? Hs(a, 8) : Os(a, 4), M = o.useRef(null), w = e === "running", S = N.length > 0 ? N : w ? [Gs(n, r)] : [];
  return o.useEffect(() => {
    !w || !M.current || (M.current.scrollTop = M.current.scrollHeight);
  }, [S, w]), s.jsxs("div", { className: `relative max-w-[85%] rounded-lg border ${v}`, children: [g ? s.jsx("button", { type: "button", onClick: (T) => {
    T.stopPropagation(), u == null ? void 0 : u();
  }, disabled: p, title: "\u505C\u6B62 W6 \u8C03\u7814", "aria-label": "\u505C\u6B62 W6 \u8C03\u7814", className: "absolute right-2 top-2 z-10 rounded-md p-1 text-slate-400 transition-colors hover:bg-white/80 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-slate-900/80 dark:hover:text-red-400", children: s.jsx(et, { size: 14 }) }) : null, s.jsxs("button", { type: "button", onClick: i, className: `flex w-full flex-col gap-1.5 rounded-lg px-3 py-2.5 text-left transition-shadow hover:shadow-md ${g ? "pr-9" : ""}`, children: [s.jsxs("div", { className: "flex w-full flex-wrap items-center gap-x-2 gap-y-1", children: [s.jsx("span", { className: `h-2 w-2 shrink-0 rounded-full ${e === "running" ? "animate-pulse bg-blue-500" : e === "error" ? "bg-red-500" : e === "done" ? "bg-emerald-500" : "bg-slate-400"}` }), s.jsx("span", { className: "text-xs font-semibold text-slate-800 dark:text-slate-200", children: b }), e === "running" && t > 0 ? s.jsxs("span", { className: "text-[10px] text-blue-600 dark:text-blue-400", children: [t, "%"] }) : null, n && e === "running" ? s.jsx("span", { className: "text-[10px] text-slate-500", children: Qs[n] ?? n }) : null, s.jsx("span", { className: "ml-auto text-[10px] text-blue-600/80 dark:text-blue-400/80", children: "\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u8F93\u51FA" })] }), S.length > 0 ? s.jsx("div", { ref: M, className: `w-full rounded-md border border-slate-200/80 bg-white/70 px-2 py-1.5 text-left dark:border-slate-700 dark:bg-slate-900/50 ${w ? "min-h-[4.5rem] max-h-32 overflow-y-auto" : ""}`, children: S.map((T, W) => {
    const R = w && W === S.length - 1, $ = w && N.length === 0;
    return s.jsxs("p", { className: `text-[11px] leading-relaxed ${R ? "text-slate-700 dark:text-slate-200" : "truncate text-slate-500 dark:text-slate-500"} ${$ && R ? "animate-pulse" : ""}`, title: T, children: [T, R && w && N.length > 0 ? s.jsx("span", { className: "ml-0.5 inline-block h-3 w-0.5 animate-pulse bg-blue-500 align-middle" }) : null] }, `${W}-${T.slice(0, 24)}`);
  }) }) : r ? s.jsx("p", { className: "w-full truncate text-[11px] text-slate-500", children: r }) : null] })] });
}
const Js = { idle: "\u5F85\u547D", running: "\u8FD0\u884C\u4E2D", done: "\u5DF2\u5B8C\u6210", error: "\u51FA\u9519" }, Xs = { idle: "\u672A\u8FDE\u63A5", connecting: "\u8FDE\u63A5\u4E2D\u2026", open: "\u5DF2\u8FDE\u63A5", closed: "\u5DF2\u7ED3\u675F", error: "\u8FDE\u63A5\u5F02\u5E38" }, Ys = { log: "\u65E5\u5FD7", tool: "\u5DE5\u5177", token: "\u8F93\u51FA", status: "\u72B6\u6001", done: "\u5B8C\u6210", error: "\u9519\u8BEF" };
function qs(e) {
  return e.message ? e.message : e.token ? e.token : e.type === "done" ? "\u8C03\u7814\u5B8C\u6210" : e.type === "error" ? "\u6267\u884C\u5931\u8D25" : "";
}
function Zs({ open: e, onClose: t, events: r, status: n, connection: a }) {
  const i = o.useRef(null);
  return o.useEffect(() => {
    var _a;
    e && ((_a = i.current) == null ? void 0 : _a.scrollTo({ top: i.current.scrollHeight, behavior: "smooth" }));
  }, [r, e]), e ? s.jsx("div", { className: "fixed inset-0 z-50 flex justify-end bg-black/40", onClick: t, role: "presentation", children: s.jsxs("div", { className: "flex h-full w-full max-w-md flex-col border-l border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900", onClick: (u) => u.stopPropagation(), role: "dialog", "aria-labelledby": "subagent-title", children: [s.jsxs("header", { className: "flex shrink-0 items-center gap-2 border-b border-slate-200 px-4 py-3 dark:border-slate-800", children: [s.jsx("h2", { id: "subagent-title", className: "flex-1 text-sm font-semibold text-slate-900 dark:text-slate-100", children: "\u5B50 Agent \xB7 W6" }), s.jsx("span", { className: `rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wide ${n === "running" ? "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300" : n === "error" ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300" : n === "done" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300" : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"}`, children: Js[n] ?? n }), s.jsx("span", { className: "text-[10px] text-slate-500", children: Xs[a] }), s.jsx("button", { type: "button", onClick: t, className: "rounded p-1 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200", "aria-label": "\u5173\u95ED", children: s.jsx(tt, { size: 18 }) })] }), s.jsx("div", { ref: i, className: "flex-1 overflow-y-auto px-4 py-3 font-mono text-xs", children: r.length === 0 ? s.jsx("p", { className: "italic text-slate-500", children: "\u7B49\u5F85 W6 \u8F93\u51FA\u2026" }) : r.map((u, p) => s.jsxs("div", { className: "flex gap-2 border-b border-slate-100 py-2 last:border-0 dark:border-slate-800", children: [s.jsx("span", { className: "w-10 shrink-0 text-[10px] font-bold uppercase text-blue-600/90 dark:text-blue-400/90", children: Ys[u.type] ?? u.type }), s.jsx("span", { className: "flex-1 break-words text-slate-700 dark:text-slate-300", children: qs(u) }), u.progress != null && u.progress > 0 ? s.jsxs("span", { className: "shrink-0 text-slate-500", children: [u.progress, "%"] }) : null] }, `${u.timestamp ?? p}-${p}`)) })] }) }) : null;
}
const Fe = [{ id: "auto", label: "\u667A\u80FD\u63A8\u8350", hint: "\u6839\u636E\u62A5\u544A\u5185\u5BB9\u81EA\u52A8\u9009\u62E9\u7248\u5F0F" }, { id: "magazine", label: "\u6742\u5FD7\u7F16\u8F91\u98CE", hint: "\u886C\u7EBF\u6807\u9898 \xB7 \u6696\u8272 editorial\uFF08guizang \u98CE\u683C A\uFF09" }, { id: "swiss", label: "\u745E\u58EB\u56FD\u9645\u4E3B\u4E49", hint: "\u7F51\u683C\u70B9\u9635 \xB7 \u9AD8\u5BF9\u6BD4\u529F\u80FD\u8272\uFF08guizang \u98CE\u683C B\uFF09" }], mt = "osint-dashboard-report-style:";
function Ye(e) {
  if (!e) return "auto";
  try {
    const t = localStorage.getItem(`${mt}${e}`);
    if (t === "magazine" || t === "swiss" || t === "auto") return t;
  } catch {
  }
  return "auto";
}
function qe(e, t) {
  if (e) try {
    localStorage.setItem(`${mt}${e}`, t);
  } catch {
  }
}
function er({ value: e, onChange: t, disabled: r, className: n }) {
  const a = Fe.find((i) => i.id === e) ?? Fe[0];
  return s.jsxs("label", { className: re("inline-flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400", r && "opacity-50", n), children: [s.jsx("span", { className: "shrink-0 font-medium", children: "\u62A5\u544A\u7248\u5F0F" }), s.jsxs("span", { className: "relative inline-flex", children: [s.jsx("select", { value: e, disabled: r, title: a.hint, "aria-label": "\u62A5\u544A\u7248\u5F0F", onChange: (i) => t(i.target.value), className: re("h-7 min-w-[7.5rem] appearance-none rounded-lg border border-slate-200 bg-white py-0 pl-2 pr-6 text-[11px] font-medium text-slate-700 outline-none transition-colors", "hover:border-slate-300 focus:border-slate-400 focus:ring-1 focus:ring-slate-300/60", "disabled:cursor-not-allowed", "dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-600 dark:focus:border-slate-500"), children: Fe.map((i) => s.jsx("option", { value: i.id, title: i.hint, children: i.label }, i.id)) }), s.jsx(Ut, { size: 12, className: "pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500", "aria-hidden": true })] })] });
}
const tr = "/osint-dashboard";
function ce(e) {
  const t = e.startsWith("/") ? e : `/${e}`;
  return `${tr}${t}`;
}
function sr({ session: e, isActive: t, onClick: r, onRename: n, onDelete: a }) {
  const [i, u] = o.useState(false);
  return s.jsxs("div", { onClick: r, className: re("group flex cursor-pointer select-none items-center gap-2 rounded-lg border-l-2 border-transparent px-2.5 py-2 transition-all duration-150", t ? "border-blue-600 bg-blue-50/90 text-slate-900 dark:border-blue-500 dark:bg-blue-950/35 dark:text-slate-100" : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-slate-100"), children: [s.jsx(rt, { size: 13, className: re("shrink-0", t ? "text-blue-600 dark:text-blue-400" : "text-slate-400") }), s.jsx("span", { className: "flex-1 truncate text-[13px] leading-tight", children: e.title }), s.jsxs("div", { className: "relative", children: [s.jsx("button", { type: "button", onClick: (p) => {
    p.stopPropagation(), u(!i);
  }, className: re("rounded-md p-1 transition-opacity", t ? "text-gray-400 hover:bg-white" : "text-gray-300 hover:bg-white/60", i ? "opacity-100" : "opacity-0 group-hover:opacity-100"), children: s.jsx(Zt, { size: 11 }) }), i ? s.jsxs(s.Fragment, { children: [s.jsx("div", { className: "fixed inset-0 z-10", onClick: () => u(false) }), s.jsxs("div", { className: "absolute right-0 top-full z-20 mt-1 min-w-[120px] rounded-xl border border-gray-100 bg-white py-1 shadow-xl", children: [s.jsxs("button", { type: "button", onClick: (p) => {
    p.stopPropagation(), n(), u(false);
  }, className: "flex w-full items-center gap-2 px-3 py-2 text-xs text-gray-700 hover:bg-gray-50", children: [s.jsx(es, { size: 11 }), " \u91CD\u547D\u540D"] }), s.jsxs("button", { type: "button", onClick: (p) => {
    p.stopPropagation(), a(), u(false);
  }, className: "flex w-full items-center gap-2 px-3 py-2 text-xs text-danger-600 hover:bg-danger-50", children: [s.jsx(ts, { size: 11 }), " \u5220\u9664"] })] })] }) : null] })] });
}
function rr(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br/>");
}
function nr(e) {
  if (!e) return [];
  try {
    return JSON.parse(e.form_schema).fields || [];
  } catch {
    return [];
  }
}
function cr() {
  const e = Kt(), { sessionId: t } = Bt(), { user: r } = Ot(), n = r == null ? void 0 : r.id, { sessions: a, intelligenceSkills: i, isStreaming: u, fetchSessions: p, createSession: b, updateSession: v, deleteSession: g, fetchIntelligenceSkills: N, executeIntelligenceSkill: M, sendMessageWS: w, connectWebSocket: S, disconnectWebSocket: T, fetchResources: W, uploadResource: R } = $e(), { addToast: $ } = Ke(), { confirm: B, prompt: ee } = Ht(), H = Qt(), j = (H == null ? void 0 : H.leftCollapsed) ?? false, D = (H == null ? void 0 : H.rightCollapsed) ?? false, A = H == null ? void 0 : H.setRightCollapsed, d = Cs(n, i), y = Es(d.sessionId, d.w6StreamEnabled, d.w6StreamRound), [L, G] = o.useState([]), [X, ae] = o.useState(null), [K, V] = o.useState(null), [he, U] = o.useState(""), [te, ve] = o.useState(false), [O, xe] = o.useState(null), [Y, je] = o.useState(false), [pe, oe] = o.useState(() => Ye(n)), be = o.useRef(null), ge = o.useRef(0), fe = o.useRef(false);
  o.useEffect(() => {
    ge.current = 0;
  }, [d.w6StreamRound]);
  const [Te, Se] = o.useState(false);
  o.useEffect(() => {
    oe(Ye(n));
  }, [n]);
  const Ne = d.isStreaming || u;
  o.useEffect(() => {
    N(), Gt.listGroups().then(G).catch(() => {
    });
  }, [N]), o.useEffect(() => {
    fe.current = false, Se(false);
  }, [n]), o.useEffect(() => {
    if (L.length === 0) {
      ae(null);
      return;
    }
    ae((c) => c && L.some((k) => k.id === c) ? c : L[0].id);
  }, [L]), o.useEffect(() => {
    if (!n || fe.current) return;
    let c = false;
    return fe.current = true, (async () => {
      var _a, _b, _c;
      try {
        if (await p(), c) return;
        const C = $e.getState().sessions, E = (t == null ? void 0 : t.trim()) || "";
        if (E && C.some((se) => se.id === E)) return;
        if (E && ((_a = await at(E).catch(() => null)) == null ? void 0 : _a.session_id)) {
          const Re = ((_c = (_b = dt(n, E)) == null ? void 0 : _b.title) == null ? void 0 : _c.trim()) || "\u65B0\u7814\u7A76";
          $e.setState((ie) => ie.sessions.some((Z) => Z.id === E) ? ie : { sessions: [{ id: E, title: Re, created_at: (/* @__PURE__ */ new Date()).toISOString() }, ...ie.sessions] });
          return;
        }
        if (C.length > 0) {
          const se = C[0];
          (!E || E !== se.id) && e(ce(`/sessions/${se.id}`), { replace: true });
          return;
        }
        const me = await b("\u65B0\u7814\u7A76");
        if (c) return;
        e(ce(`/sessions/${me.id}`), { replace: true });
      } catch {
        fe.current = false;
      } finally {
        c || Se(true);
      }
    })(), () => {
      c = true;
    };
  }, [n, t, p, b, e]), o.useEffect(() => {
    if (t) return d.bindSession(t), d.restoreSession(t), S(t), W(t), () => {
      T(t);
    };
  }, [t, S, T, W]), o.useEffect(() => {
    d.reports.length > 0 && (A == null ? void 0 : A(false));
  }, [t, d.reports.length, A]);
  const _e = d.reports.length > 0 && !D, le = n ? `osint-dashboard-panels:${n}` : void 0;
  o.useEffect(() => {
    const c = y.events.filter((C) => C.type === "done").length;
    if (c <= ge.current) return;
    ge.current = c;
    const k = [...y.events].reverse().find((C) => C.type === "done");
    k && d.addReportFromW6Done(k);
  }, [y.events, d.addReportFromW6Done]);
  const Ce = o.useMemo(() => d.reports.find((c) => c.id === d.activeReportId) ?? d.reports[d.reports.length - 1], [d.reports, d.activeReportId]), Ae = o.useMemo(() => t ? a.find((c) => c.id === t) : void 0, [a, t]), Pe = (c) => {
    oe(c), qe(n, c);
  }, l = o.useMemo(() => {
    var _a;
    return ((_a = [...y.events].reverse().find((k) => k.type === "done")) == null ? void 0 : _a.followUps) ?? [];
  }, [y.events]), { w6Topics: x, discussTopics: f } = o.useMemo(() => Us({ followUpQuestions: d.followUpQuestions, messages: d.messages, w6FollowUps: l, skillKey: d.skillKey, reportTitle: Ce == null ? void 0 : Ce.title }), [d.followUpQuestions, d.messages, d.skillKey, l, Ce == null ? void 0 : Ce.title]), m = d.reports.length > 0 && !d.isStreaming && !K && !d.currentForm, h = o.useMemo(() => {
    if (!O) return null;
    const c = d.messages.find((E) => E.id === O);
    if (!c || c.role !== "w6") return null;
    const k = O === d.activeW6MessageId, C = k ? y.events : c.w6Events ?? [];
    return { events: C, status: Xe(c.w6Status, y.status, k, C), connection: k ? y.connection : "closed" };
  }, [O, d.messages, d.activeW6MessageId, y.events, y.status, y.connection]);
  o.useEffect(() => {
    d.activeW6MessageId && d.syncActiveW6Message({ progress: y.progress, lastLine: y.lastLine, events: y.events, status: y.status });
  }, [d.activeW6MessageId, d.syncActiveW6Message, y.progress, y.lastLine, y.events, y.status]), o.useEffect(() => {
    var _a;
    (_a = be.current) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
  }, [d.messages, d.currentPhase, d.activeW6MessageId, m, y.status, y.lastLine, y.events.length]);
  const _ = async () => {
    d.resetForNewSkill(), V(null);
    const c = await b("\u65B0\u7814\u7A76");
    e(ce(`/sessions/${c.id}`));
  }, P = async (c) => {
    const k = a.find((E) => E.id === c);
    if (!k) return;
    const C = await ee({ title: "\u91CD\u547D\u540D\u4F1A\u8BDD", message: "\u8BF7\u8F93\u5165\u65B0\u7684\u4F1A\u8BDD\u540D\u79F0", defaultValue: k.title, placeholder: "\u4F1A\u8BDD\u540D\u79F0" });
    C && C !== k.title && await v(c, C);
  }, F = async (c) => {
    if (await B({ title: "\u5220\u9664\u4F1A\u8BDD", message: "\u786E\u5B9A\u8981\u5220\u9664\u6B64\u4F1A\u8BDD\u5417\uFF1F\u6B64\u64CD\u4F5C\u4E0D\u53EF\u6062\u590D\u3002", variant: "danger", confirmText: "\u5220\u9664", cancelText: "\u53D6\u6D88" }) && (await g(c), t === c)) {
      const C = $e.getState().sessions;
      if (C.length > 0) e(ce(`/sessions/${C[0].id}`));
      else {
        const E = await b("\u65B0\u7814\u7A76");
        e(ce(`/sessions/${E.id}`), { replace: true });
      }
    }
  }, I = async (c) => {
    if (t) return d.bindSession(t), t;
    const k = (c == null ? void 0 : c.trim().slice(0, 30)) || "\u65B0\u7814\u7A76", C = await b(k);
    return d.bindSession(C.id), S(C.id), e(ce(`/sessions/${C.id}`), { replace: true }), C.id;
  }, z = (c) => {
    if (Ne) {
      $("info", "\u5F53\u524D\u6B63\u5728\u751F\u6210\u4E2D\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5");
      return;
    }
    V(c);
  }, Q = o.useMemo(() => nr(K), [K]), J = async (c) => {
    if (K) try {
      const k = await M(K.id, c), C = await I(K.name);
      qe(n, pe), await d.startChat(K.key, K.name, c, C, k, pe), V(null);
    } catch (k) {
      $("error", k instanceof Error ? k.message : "\u542F\u52A8\u7814\u7A76\u5931\u8D25");
    }
  }, q = async (c) => {
    try {
      const k = d.skillKeyRef.current, C = k ? i.find((me) => me.key === k) : void 0, E = C ? await M(C.id, c) : void 0;
      await d.respondToForm(c, E);
    } catch (k) {
      $("error", k instanceof Error ? k.message : "\u63D0\u4EA4\u8865\u5145\u4FE1\u606F\u5931\u8D25");
    }
  }, ht = async (c) => {
    if (K) try {
      const k = await M(K.id, c), C = await I(K.name);
      w(C, k, []), $("success", `${K.name} \u5DF2\u63D0\u4EA4`), V(null);
    } catch (k) {
      $("error", k instanceof Error ? k.message : "\u63D0\u4EA4\u5931\u8D25");
    }
  }, xt = (c) => {
    K && (ye(K.key, i) ? J(c) : ht(c));
  }, pt = async (c = []) => {
    const k = he.trim();
    if (!k && c.length === 0 || d.isStreaming) return;
    const C = c.filter((E) => E.type === "local" && E.file);
    if (C.length > 0) try {
      const E = await I(k || "\u9644\u4EF6\u6D88\u606F"), me = await Xt(`upload ${C.length} local file(s)`, { sessionId: E, files: C.map((we) => we.name) }, async () => {
        const we = [];
        for (const Re of C) {
          const ie = Re.file;
          Ze("upload_start", "dashboard uploading before send", { fileName: ie.name, sessionId: E });
          const Z = await R(E, ie);
          await Yt(Z.id, ie, qt(Z.id, Z.url).filter((vt) => vt !== Z.id)), we.push({ id: Z.id, name: Z.name || Re.name, type: Z.type || "file" });
        }
        return we;
      }), se = k || "\u8BF7\u5206\u6790\u9644\u4EF6\u5185\u5BB9";
      U(""), d.appendUserMessage(se, me), w(E, se, me), W(E);
      return;
    } catch (E) {
      $("error", E instanceof Error ? E.message : "\u6587\u4EF6\u4E0A\u4F20\u5931\u8D25");
      return;
    }
    U(""), d.sendMessage(k);
  }, bt = async () => {
    if (!(Y || y.status !== "running")) {
      je(true);
      try {
        d.abort(), await y.stop(), $("info", "\u5DF2\u505C\u6B62 W6 \u8C03\u7814");
      } catch (c) {
        $("error", c instanceof Error ? c.message : "\u505C\u6B62 W6 \u5931\u8D25");
      } finally {
        je(false);
      }
    }
  }, gt = (c) => {
    if (!d.isStreaming) {
      if (U(""), c.mode === "w6") {
        d.sendW6Message(c.text);
        return;
      }
      d.sendMessage(c.text);
    }
  }, wt = s.jsxs("div", { className: "flex h-full min-h-0 flex-col overflow-hidden bg-white dark:bg-slate-900", children: [s.jsxs("div", { className: "flex items-center gap-2 border-b border-slate-200/90 px-3 py-3 dark:border-slate-800", children: [s.jsx("div", { className: "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-900 dark:bg-slate-100", children: s.jsx(Be, { size: 14, className: "text-white dark:text-slate-900" }) }), s.jsx("span", { className: "text-sm font-semibold text-slate-900 dark:text-slate-100", children: "\u60C5\u62A5\u7814\u7A76" })] }), s.jsx("div", { className: "px-3 pb-2 pt-2", children: s.jsxs("button", { type: "button", onClick: () => void _(), className: "flex w-full items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-900 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800 dark:border-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white", children: [s.jsx(Vt, { size: 14 }), "\u65B0\u4F1A\u8BDD"] }) }), s.jsx("div", { className: "min-h-0 flex-1 space-y-0.5 overflow-y-auto px-2", children: Te ? a.length === 0 ? s.jsxs("div", { className: "px-3 py-6 text-center", children: [s.jsx(rt, { size: 20, className: "mx-auto mb-1.5 text-slate-300 dark:text-slate-600" }), s.jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400", children: "\u6682\u65E0\u4F1A\u8BDD" })] }) : a.map((c) => s.jsx(sr, { session: c, isActive: t === c.id, onClick: () => e(ce(`/sessions/${c.id}`)), onRename: () => void P(c.id), onDelete: () => void F(c.id) }, c.id)) : s.jsx("div", { className: "px-3 py-6 text-center", children: s.jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400", children: "\u52A0\u8F7D\u4F1A\u8BDD\u2026" }) }) })] }), kt = s.jsxs("div", { className: "flex h-full min-h-0 min-w-0 flex-col overflow-hidden bg-[#f7f8fa] dark:bg-slate-950", children: [s.jsxs("div", { className: "flex shrink-0 items-center justify-between gap-3 border-b border-slate-200/70 px-3 py-2 dark:border-slate-800", children: [s.jsx("span", { className: "min-w-0 truncate text-xs font-medium text-slate-600 dark:text-slate-400", children: (Ae == null ? void 0 : Ae.title) ?? "\u60C5\u62A5\u7814\u7A76" }), s.jsx(er, { value: pe, onChange: Pe, disabled: d.isStreaming })] }), s.jsxs("div", { className: "min-h-0 flex-1 overflow-y-auto px-3 py-3", children: [K && Q.length > 0 ? s.jsxs("div", { className: "mb-4", children: [s.jsxs("div", { className: "mb-2 text-xs font-medium text-slate-600 dark:text-slate-400", children: [K.name, " \u2014 \u8BF7\u586B\u5199\u53C2\u6570"] }), s.jsx(Ve, { fields: Q, onSubmit: xt, disabled: d.isStreaming, stepMode: true }), s.jsx("button", { type: "button", className: "mt-2 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-300", onClick: () => V(null), children: "\u53D6\u6D88" })] }) : null, d.currentForm ? s.jsxs("div", { className: "mb-4", children: [s.jsx("p", { className: "mb-2 text-xs text-slate-600", children: d.currentForm.message }), s.jsx(Ve, { fields: d.currentForm.schema.fields, onSubmit: (c) => void q(c), disabled: d.isStreaming, stepMode: false })] }) : null, d.messages.map((c) => {
    var _a;
    if (c.role === "user") return s.jsx("div", { className: "mb-3 flex justify-end", children: s.jsx("div", { className: "max-w-[85%] rounded-2xl rounded-br-md bg-slate-900 px-3 py-2 text-xs text-white dark:bg-slate-100 dark:text-slate-900", children: s.jsx(Ks, { content: c.content }) }) }, c.id);
    if (c.role === "assistant") return c.content.trim() ? s.jsx("div", { className: "mb-3", children: s.jsxs("div", { className: "rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200", children: [s.jsx("div", { className: "prose-sm max-w-none", dangerouslySetInnerHTML: { __html: rr(c.content) } }), d.reports.length > 0 && c.content ? s.jsx("p", { className: "mt-2 text-xs text-blue-600 dark:text-blue-400", children: "\u62A5\u544A\u5DF2\u751F\u6210\uFF0C\u89C1\u53F3\u4FA7\u9884\u89C8" }) : null, ((_a = c.followUpQuestions) == null ? void 0 : _a.length) && !m ? s.jsx(_s, { questions: c.followUpQuestions, onClick: (k) => void d.sendW6Message(k) }) : null] }) }, c.id) : null;
    if (c.role === "w6") {
      const k = c.id === d.activeW6MessageId, C = k ? y.events : c.w6Events ?? [], E = Xe(c.w6Status, y.status, k, C);
      return s.jsx("div", { className: "mb-3", children: s.jsx(Vs, { status: E, progress: k ? y.progress : c.w6Progress ?? 0, lastLine: k ? y.lastLine || c.w6LastLine || "" : c.w6LastLine ?? "", connection: k ? y.connection : void 0, events: C, onClick: () => {
        xe(c.id), ve(true);
      }, onStop: k && E === "running" ? () => void bt() : void 0, stopping: Y }) }, c.id);
    }
    return c.role === "system" ? s.jsx("div", { className: "mb-2 text-center text-xs text-slate-500", children: c.content }, c.id) : null;
  }), d.currentPhase && !d.activeW6MessageId ? s.jsx("div", { className: "mb-2 text-xs italic text-slate-500", children: d.currentPhase }) : null, m ? s.jsx("div", { className: "mb-3 max-w-[85%]", children: s.jsx(As, { w6Topics: x, discussTopics: f, onSelect: gt, disabled: d.isStreaming }) }) : null, s.jsx("div", { ref: be })] }), s.jsx("div", { className: "shrink-0 border-t border-zinc-200/70 bg-white px-4 py-3 dark:border-white/10 dark:bg-[#212121]", children: s.jsxs("div", { className: "mx-auto max-w-3xl space-y-2", children: [s.jsx(ns, { skillGroups: L, activeGroupId: X, onActiveGroupChange: ae, intelligenceSkills: i, onSkillClick: z, disabled: Ne }), s.jsx(ss, { value: he, onChange: U, onSend: (c) => void pt(c), placeholder: d.reports.length > 0 ? "\u9488\u5BF9\u5F53\u524D\u62A5\u544A\u6539\u7248\u5F0F\u6216\u8FFD\u95EE\u5185\u5BB9\uFF1B@w6 \u5F00\u5934\u4E3A\u6DF1\u5EA6\u8C03\u7814" : "\u8F93\u5165\u8FFD\u95EE\uFF1B@w6 \u5F00\u5934\u4E3A\u6DF1\u5EA6\u8C03\u7814", disabled: d.isStreaming, isStreaming: d.isStreaming, onStop: () => d.abort() })] }) })] }), yt = s.jsx(Is, { reports: d.reports, activeReportId: d.activeReportId, onActiveChange: d.setActiveReportId, onReportClose: d.closeReport });
  return s.jsxs(s.Fragment, { children: [s.jsx(Jt, { className: "h-full min-h-0 w-full bg-[#f3f5f7] dark:bg-slate-950", innerClassName: "h-full min-h-0 border border-slate-200/90 bg-[#f7f8fa] dark:border-slate-800 dark:bg-slate-950", leftPanelId: "osint-dashboard-left", mainPanelId: "osint-dashboard-main", rightPanelId: "osint-dashboard-right", left: wt, main: kt, right: yt, leftMinPx: 200, leftMaxPx: 400, leftDefaultPx: 240, rightMinPx: 320, rightMaxPx: 1200, rightDefaultPct: 50, leftSidebarVisible: !j, rightSidebarVisible: _e, storageKey: le, resizeHandleWithGrip: true }), s.jsx(Zs, { open: te, onClose: () => {
    ve(false), xe(null);
  }, events: (h == null ? void 0 : h.events) ?? [], status: (h == null ? void 0 : h.status) ?? "idle", connection: (h == null ? void 0 : h.connection) ?? "idle" })] });
}
export {
  cr as default
};
