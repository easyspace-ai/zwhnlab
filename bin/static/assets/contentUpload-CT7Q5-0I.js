const f = /^\s*\/\/.*$/gm, g = 4, E = 50, A = 1, M = 50, T = [4, 6, 8, 10, 12, 16, 20, 24, 30, 35, 40, 50];
function l(e, t = 4, n = 50) {
  const r = Math.floor(Number(e) || 0);
  return r < t ? t : r > n ? n : r;
}
function d(e) {
  return e.replace(f, "");
}
function h(e) {
  const t = [...e];
  let n = "", r = false, i = false;
  for (let o = 0; o < t.length; o++) {
    const u = t[o];
    if (i) {
      n += u, i = false;
      continue;
    }
    if (u === "\\" && r) {
      n += u, i = true;
      continue;
    }
    if (u !== '"') {
      n += u;
      continue;
    }
    if (!r) {
      r = true, n += u;
      continue;
    }
    let s = o + 1;
    for (; s < t.length && (t[s] === " " || t[s] === "	"); ) s++;
    if (s >= t.length || t[s] === "," || t[s] === "]" || t[s] === "}" || t[s] === ":" || t[s] === `
` || t[s] === "\r") {
      r = false, n += u;
      continue;
    }
    let c = o + 1;
    for (; c < t.length && t[c] !== '"'; ) c++;
    if (c < t.length) {
      n += `\u300C${t.slice(o + 1, c).join("")}\u300D`, o = c;
      continue;
    }
    n += u;
  }
  return n;
}
function p(e) {
  let t = e;
  for (let n = 0; n < 8; n++) {
    const r = t.replace(/,(\s*[\]}])/g, "$1");
    if (r === t) return t;
    t = r;
  }
  return t;
}
function m(e) {
  return p(h(d(e)));
}
function a(e) {
  var _a;
  const t = e.trim();
  if (!t.startsWith("{")) return null;
  try {
    const n = JSON.parse(m(t));
    return !Array.isArray(n.slides) || n.slides.length === 0 ? null : !!((_a = n.document_title) == null ? void 0 : _a.trim()) || (n.total_pages ?? 0) > 0 || n.slides.some((i) => {
      var _a2;
      return !!((_a2 = i.page_type) == null ? void 0 : _a2.trim()) || (i.page_id ?? 0) > 0;
    }) ? n : null;
  } catch {
    return null;
  }
}
function S(e, t) {
  if (t && t > 0) return l(t, 4, 50);
  const n = e.trim().length;
  return n < 2e3 ? 8 : n < 8e3 ? 12 : n < 2e4 ? 16 : n < 4e4 ? 24 : l(Math.ceil(n / 1500) + 6);
}
function P(e) {
  var _a, _b, _c;
  const t = (_a = e.document_title) == null ? void 0 : _a.trim();
  return t || ((_c = (_b = e.slides[0]) == null ? void 0 : _b.headline) == null ? void 0 : _c.trim()) || "\u6F14\u793A\u6587\u7A3F";
}
function $(e, t) {
  var _a;
  const n = P(e), r = t && t < e.slides.length ? t : e.slides.length, i = [`\u6F14\u793A\u76EE\u6807\uFF1A\u6839\u636E\u7ED3\u6784\u5316\u4EA7\u54C1/\u7814\u7A76\u62A5\u544A schema \u751F\u6210 ${r} \u9875\u6F14\u793A\u7A3F\u3002`, `\u6587\u6863\u6807\u9898\uFF1A${n}`];
  return ((_a = e.source) == null ? void 0 : _a.trim()) && i.push(`\u6765\u6E90\uFF1A${e.source.trim()}`), i.push("\u5EFA\u8BAE\u5927\u7EB2\uFF1A"), e.slides.slice(0, r).forEach((o, u) => {
    var _a2;
    const s = ((_a2 = o.headline) == null ? void 0 : _a2.trim()) || `\u7B2C ${u + 1} \u9875`;
    i.push(`${u + 1}. ${s}${o.page_type ? ` (${o.page_type})` : ""}`);
  }), i.push("\u6BCF\u9875\u8981\u70B9\uFF1A"), e.slides.slice(0, r).forEach((o, u) => {
    var _a2, _b, _c;
    const s = [];
    ((_a2 = o.subtitle) == null ? void 0 : _a2.trim()) && s.push(o.subtitle.trim()), ((_b = o.body) == null ? void 0 : _b.length) && s.push(o.body.join("\uFF1B")), ((_c = o.note) == null ? void 0 : _c.trim()) && s.push(o.note.trim()), i.push(`\u7B2C ${u + 1} \u9875\uFF1A${s.join(" | ") || o.headline || ""}`);
  }), i.push("\u5FC5\u987B\u4FDD\u7559\u7684\u4E8B\u5B9E/\u6307\u6807/\u672F\u8BED\uFF1A\u8BF7\u5FE0\u5B9E\u5448\u73B0 schema \u4E2D\u7684\u6570\u636E\u4E0E\u4E13\u6709\u540D\u8BCD\uFF0C\u52FF\u7F16\u9020\u3002"), i.push("\u98CE\u683C/\u8868\u8FBE\u8981\u6C42\uFF1A\u4E13\u4E1A\u54A8\u8BE2\u62A5\u544A\u98CE\u683C\uFF0C\u7AE0\u8282\u7528 section \u9875\u5206\u9694\u3002"), i.join(`
`);
}
function k(e) {
  return `<!-- product-schema -->
${JSON.stringify(e)}`;
}
const _ = 5 * 1024 * 1024;
function w(e) {
  const t = e.name.toLowerCase();
  return t.endsWith(".md") || t.endsWith(".json") ? e.size <= 0 ? "\u6587\u4EF6\u4E3A\u7A7A" : e.size > _ ? "\u6587\u4EF6\u8D85\u8FC7 5MB" : null : "\u4EC5\u652F\u6301 .md \u6216 .json\uFF08\u4EA7\u54C1 schema\uFF09\u6587\u4EF6";
}
async function y(e) {
  return new Promise((t, n) => {
    const r = new FileReader();
    r.onload = () => t(String(r.result || "")), r.onerror = () => n(new Error("\u8BFB\u53D6\u6587\u4EF6\u5931\u8D25")), r.readAsText(e);
  });
}
function N(e, t) {
  if (t.toLowerCase().endsWith(".json")) {
    const i = a(e);
    return i ? { kind: "product_schema", productSchema: i } : { kind: "markdown", productSchema: null };
  }
  const r = a(e);
  return r ? { kind: "product_schema", productSchema: r } : { kind: "markdown", productSchema: null };
}
export {
  M as O,
  T as P,
  A as a,
  g as b,
  l as c,
  N as d,
  E as e,
  k as f,
  $ as g,
  P as p,
  y as r,
  S as s,
  a as t,
  w as v
};
