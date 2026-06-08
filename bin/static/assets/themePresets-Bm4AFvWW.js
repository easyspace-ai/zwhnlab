import { w as y } from "./main-gNlFrJgr.js";
const b = "/api/pptxgenjs";
async function s(e, t) {
  const r = y(), a = new Headers(t == null ? void 0 : t.headers);
  r && a.set("Authorization", `Bearer ${r}`), (t == null ? void 0 : t.body) && !(t.body instanceof FormData) && !a.has("Content-Type") && a.set("Content-Type", "application/json");
  const o = await fetch(`${b}${e}`, { ...t, headers: a });
  if (!o.ok) {
    const n = await o.json().catch(() => ({}));
    throw new Error(n.detail || o.statusText || "Request failed");
  }
  return o.json();
}
async function g(e, t, r) {
  const a = y(), o = new Headers(t.headers);
  a && o.set("Authorization", `Bearer ${a}`), t.body && !o.has("Content-Type") && o.set("Content-Type", "application/json");
  const n = await fetch(`${b}${e}`, { ...t, headers: o });
  if (!n.ok || !n.body) {
    const F = await n.json().catch(() => ({}));
    throw new Error(F.detail || "Pipeline failed");
  }
  const m = n.body.getReader(), _ = new TextDecoder();
  let c = "", d;
  for (; ; ) {
    const { done: F, value: u } = await m.read();
    if (F) break;
    c += _.decode(u, { stream: true });
    const h = c.split(`

`);
    c = h.pop() || "";
    for (const k of h) {
      const p = k.trim();
      if (!p.startsWith("data:")) continue;
      const f = p.slice(5).trim();
      if (f === "[DONE]") return d;
      try {
        const i = JSON.parse(f);
        r(i), i.stage === "done" && i.result && (d = i.result);
      } catch {
      }
    }
  }
  return d;
}
const E = { normalizeProductSchema: (e) => s("/normalize-product-schema", { method: "POST", body: JSON.stringify(e) }), listProjects: () => s("/projects"), getProject: (e) => s(`/projects/${e}`), listResources: (e) => s(`/projects/${e}/resources`), getChat: (e) => s(`/projects/${e}/chat`).then((t) => t.messages || []), saveChat: (e, t) => s(`/projects/${e}/chat`, { method: "PUT", body: JSON.stringify({ messages: t }) }), createProject: (e) => s("/projects", { method: "POST", body: JSON.stringify(e) }), runPipeline: (e, t) => g(`/projects/${e}/pipeline/run`, { method: "POST" }, t), regenerate: (e, t, r) => g(`/projects/${e}/pipeline/regenerate`, { method: "POST", body: JSON.stringify({ instruction: t }) }, r) }, x = { "midnight-exec": { label: "\u5348\u591C\u5546\u52A1", preset: "midnight-exec", primary: "1E2761", secondary: "CADCFC", accent: "F96167", bg_dark: "1E2761", bg_light: "F5F7FA", text_dark: "2C3E50", text_light: "FFFFFF", font_heading: "Microsoft YaHei", font_body: "Microsoft YaHei" }, "tech-dark": { label: "\u79D1\u6280\u6DF1\u8272", preset: "tech-dark", primary: "0D1117", secondary: "58A6FF", accent: "3FB950", bg_dark: "0D1117", bg_light: "F6F8FA", text_dark: "24292F", text_light: "FFFFFF", font_heading: "Microsoft YaHei", font_body: "Microsoft YaHei" }, "coral-energy": { label: "\u73CA\u745A\u6D3B\u529B", preset: "coral-energy", primary: "F96167", secondary: "F9E795", accent: "2F3C7E", bg_dark: "2F3C7E", bg_light: "FFFAF0", text_dark: "2F3C7E", text_light: "FFFFFF", font_heading: "Microsoft YaHei", font_body: "Microsoft YaHei" }, "forest-calm": { label: "\u68EE\u6797\u9759\u7A46", preset: "forest-calm", primary: "2C5F2D", secondary: "97BC62", accent: "40916C", bg_dark: "1B4332", bg_light: "F1FAEE", text_dark: "1B4332", text_light: "FFFFFF", font_heading: "Microsoft YaHei", font_body: "Microsoft YaHei" }, "teal-trust": { label: "\u9752\u7EFF\u4FE1\u8D56", preset: "teal-trust", primary: "028090", secondary: "02C39A", accent: "F4A261", bg_dark: "023047", bg_light: "F8F9FA", text_dark: "023047", text_light: "FFFFFF", font_heading: "Microsoft YaHei", font_body: "Microsoft YaHei" }, "minimal-white": { label: "\u6781\u7B80\u767D", preset: "minimal-white", primary: "333333", secondary: "666666", accent: "007AFF", bg_dark: "1C1C1E", bg_light: "FFFFFF", text_dark: "333333", text_light: "FFFFFF", font_heading: "Microsoft YaHei", font_body: "Microsoft YaHei" } }, j = { themes: x }, l = j.themes, w = Object.entries(l).map(([e, t]) => ({ value: e, label: t.label }));
function A(e, t) {
  const r = e || (t == null ? void 0 : t.preset) || "midnight-exec";
  return { ...l[r] || l["midnight-exec"], ...t, preset: r };
}
export {
  w as T,
  E as p,
  A as r
};
