import { w as h } from "./main-gNlFrJgr.js";
const p = "/api/studio/ohmyppt";
async function d(e, s) {
  const o = h(), n = new Headers(s == null ? void 0 : s.headers);
  o && n.set("Authorization", `Bearer ${o}`), (s == null ? void 0 : s.body) && !(s.body instanceof FormData) && !n.has("Content-Type") && n.set("Content-Type", "application/json");
  const t = await fetch(`${p}${e}`, { ...s, headers: n }), r = await t.text(), c = t.headers.get("content-type") || "", i = r.trimStart().toLowerCase().startsWith("<!doctype") || r.trimStart().startsWith("<html");
  if (!t.ok) {
    if (c.includes("json") && !i) try {
      const a = JSON.parse(r);
      throw new Error(a.detail || a.error || t.statusText || "Request failed");
    } catch (a) {
      if (a instanceof Error && a.message !== t.statusText) throw a;
    }
    throw new Error(i ? `\u63A5\u53E3 ${e} \u4E0D\u53EF\u7528\uFF08\u8FD4\u56DE\u4E86 HTML\uFF0C\u8BF7\u786E\u8BA4 backend \u4E0E ohmyppt \u670D\u52A1\u5DF2\u66F4\u65B0\u5E76\u91CD\u542F\uFF09` : r.slice(0, 200) || t.statusText || "Request failed");
  }
  if (i || !c.includes("json")) throw new Error(`\u63A5\u53E3 ${e} \u8FD4\u56DE\u4E86\u975E JSON \u54CD\u5E94\uFF0C\u8BF7\u786E\u8BA4 backend \u4E0E ohmyppt \u670D\u52A1\u5DF2\u90E8\u7F72`);
  return JSON.parse(r);
}
function b(e) {
  const s = e.split(`
`);
  let o = "", n = "";
  for (const t of s) t.startsWith("event:") && (o = t.slice(6).trim()), t.startsWith("data:") && (n = t.slice(5).trim());
  if (!n || n === "[DONE]") return null;
  try {
    const t = JSON.parse(n);
    if (t.type) return t;
    if (o) return { type: o, payload: t };
  } catch {
    return null;
  }
  return null;
}
async function m(e, s, o) {
  const n = h(), t = new Headers(s.headers);
  n && t.set("Authorization", `Bearer ${n}`), t.has("Accept") || t.set("Accept", "text/event-stream");
  const r = await fetch(e, { ...s, headers: t });
  if (!r.ok || !r.body) {
    const l = await r.text().catch(() => ""), u = l.trimStart().toLowerCase().startsWith("<!doctype");
    throw new Error(u ? "\u751F\u6210\u63A5\u53E3\u4E0D\u53EF\u7528\uFF08\u8FD4\u56DE\u4E86 HTML\uFF0C\u8BF7\u786E\u8BA4 backend \u4E0E ohmyppt \u670D\u52A1\u5DF2\u66F4\u65B0\uFF09" : (() => {
      try {
        const f = JSON.parse(l);
        return f.detail || f.error || "Generation stream failed";
      } catch {
        return l.slice(0, 200) || "Generation stream failed";
      }
    })());
  }
  const c = r.body.getReader(), i = new TextDecoder();
  let a = "";
  for (; ; ) {
    const { done: l, value: u } = await c.read();
    if (l) break;
    a += i.decode(u, { stream: true });
    const f = a.split(`

`);
    a = f.pop() || "";
    for (const S of f) {
      const y = b(S.trim());
      y && o(y);
    }
  }
}
const $ = { listStyles: () => d("/styles").then((e) => e.styles), listSessions: () => d("/sessions").then((e) => e.sessions), createSession: (e) => d("/sessions", { method: "POST", body: JSON.stringify(e) }), getSession: (e) => d(`/sessions/${e}`), getMessages: async (e) => {
  try {
    return await d(`/sessions/${e}/messages`).then((s) => s.messages);
  } catch {
    return [];
  }
}, updateSessionTitle: (e, s) => d(`/sessions/${e}`, { method: "PATCH", body: JSON.stringify({ title: s }) }), deleteSession: (e) => d(`/sessions/${e}`, { method: "DELETE" }), streamGenerate: (e, s, o) => m(`${p}/sessions/${e}/generate`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(o ?? {}) }, s), streamSubscribe: (e, s) => m(`${p}/sessions/${e}/generate/stream`, { method: "GET" }, s), getPageHtml: async (e, s) => {
  const o = h(), n = new Headers();
  o && n.set("Authorization", `Bearer ${o}`);
  const t = await fetch(`${p}/sessions/${e}/pages/${s}`, { headers: n });
  if (!t.ok) throw new Error("Page not found");
  return t.text();
}, exportZip: async (e, s = "deck.zip") => {
  const o = h(), n = new Headers({ "Content-Type": "application/json" });
  o && n.set("Authorization", `Bearer ${o}`);
  const t = await fetch(`${p}/sessions/${e}/export`, { method: "POST", headers: n, body: JSON.stringify({ format: "zip" }) });
  if (!t.ok) {
    const a = await t.json().catch(() => ({}));
    throw new Error(a.detail || a.error || "Export failed");
  }
  const r = await t.blob(), c = URL.createObjectURL(r), i = document.createElement("a");
  i.href = c, i.download = s, i.click(), URL.revokeObjectURL(c);
}, exportPptx: async (e, s = "deck.pptx", o) => {
  const n = await $.fetchPptxBlob(e, o), t = URL.createObjectURL(n), r = document.createElement("a");
  r.href = t, r.download = s, r.click(), URL.revokeObjectURL(t);
}, fetchPptxBlob: async (e, s) => {
  const o = h(), n = new Headers({ "Content-Type": "application/json" });
  o && n.set("Authorization", `Bearer ${o}`);
  const t = await fetch(`${p}/sessions/${e}/export`, { method: "POST", headers: n, body: JSON.stringify({ format: "pptx", image_only: (s == null ? void 0 : s.image_only) ?? false, embed_fonts: s == null ? void 0 : s.embed_fonts }) });
  if (!t.ok) {
    const r = await t.json().catch(() => ({}));
    throw new Error(r.detail || r.error || "Export failed");
  }
  return t.blob();
} }, g = [{ value: "pptxgenjs", label: "\u539F\u751Fppt", hint: "\u53EF\u7F16\u8F91 PPTX" }, { value: "ohmyppt", label: "HTML\u8F6Cppt", hint: "\u7CBE\u7F8E HTML \u6F14\u793A\u7A3F" }];
function x(e) {
  return e === "ohmyppt" || e === "pptxgenjs";
}
const T = "/ppt";
function k() {
  return typeof window > "u" ? false : /studio\.html$/i.test(window.location.pathname);
}
function w(e) {
  const s = e.startsWith("/") ? e : `/${e}`;
  return k() ? s === "/" ? "/" : s : `${T}${s}`;
}
function O(e, s) {
  const o = w(`/p/${e}`);
  if (!s) return o;
  const n = o.includes("?") ? "&" : "?";
  return `${o}${n}engine=${s}`;
}
function P() {
  return w("/");
}
export {
  g as P,
  P as a,
  x as i,
  $ as o,
  O as s
};
