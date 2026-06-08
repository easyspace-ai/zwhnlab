import { w as m } from "./main-gNlFrJgr.js";
const y = "/api/ppthtml";
async function c(e, t) {
  const s = m(), o = new Headers(t == null ? void 0 : t.headers);
  s && o.set("Authorization", `Bearer ${s}`), (t == null ? void 0 : t.body) && !(t.body instanceof FormData) && !o.has("Content-Type") && o.set("Content-Type", "application/json");
  const r = await fetch(`${y}${e}`, { ...t, headers: o });
  if (!r.ok) {
    const n = await r.json().catch(() => ({}));
    throw new Error(n.detail || r.statusText || "Request failed");
  }
  return r.json();
}
async function u(e, t, s) {
  const o = m(), r = new Headers(t.headers);
  o && r.set("Authorization", `Bearer ${o}`), t.body && !r.has("Content-Type") && r.set("Content-Type", "application/json");
  const n = await fetch(`${y}${e}`, { ...t, headers: r });
  if (!n.ok || !n.body) {
    const d = await n.json().catch(() => ({}));
    throw new Error(d.detail || "Pipeline failed");
  }
  const j = n.body.getReader(), w = new TextDecoder();
  let i = "", p;
  for (; ; ) {
    const { done: d, value: $ } = await j.read();
    if (d) break;
    i += w.decode($, { stream: true });
    const l = i.split(`

`);
    i = l.pop() || "";
    for (const T of l) {
      const h = T.trim();
      if (!h.startsWith("data:")) continue;
      const f = h.slice(5).trim();
      if (f === "[DONE]") return p;
      try {
        const a = JSON.parse(f);
        s(a), a.stage === "done" && a.result && (p = a.result);
      } catch {
      }
    }
  }
  return p;
}
const b = { listProjects: () => c("/projects"), getProject: (e) => c(`/projects/${e}`), listResources: (e) => c(`/projects/${e}/resources`), createProject: (e) => c("/projects", { method: "POST", body: JSON.stringify(e) }), runPipeline: (e, t) => u(`/projects/${e}/pipeline/run`, { method: "POST" }, t), regenerate: (e, t, s) => u(`/projects/${e}/pipeline/regenerate`, { method: "POST", body: JSON.stringify({ instruction: t }) }, s) }, S = "/ppthtml";
function P(e) {
  const t = e.startsWith("/") ? e : `/${e}`;
  return `${S}${t}`;
}
function g(e) {
  return P(`/p/${e}`);
}
function A() {
  return P("/");
}
export {
  g as a,
  A as b,
  b as p
};
