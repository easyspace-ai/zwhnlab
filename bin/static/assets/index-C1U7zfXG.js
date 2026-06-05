var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var _a2, _b;
import { Packer as Qu, Document as ps, LevelFormat as Ra, UnderlineType as gs, Paragraph as rt, Math as Yt, ExternalHyperlink as vs, Table as bs, TableRow as Cn, WidthType as ys, TableCell as En, VerticalAlign as Nn, ImageRun as ws, TextRun as x0, HeadingLevel as Qe, AlignmentType as Y0, CheckBox as xs, MathSum as In, MathIntegral as Bn, MathRun as _e, MathRadical as Rn, MathFraction as ks, MathSubSuperScript as qa, MathSubScript as Ss, MathSuperScript as Ts, XmlComponent as _r, FootnoteReferenceRun as As } from "./index-DPmBxNW0.js";
class A extends Error {
  constructor(e, t) {
    var n = "KaTeX parse error: " + e, a, i, s = t && t.loc;
    if (s && s.start <= s.end) {
      var l = s.lexer.input;
      a = s.start, i = s.end, a === l.length ? n += " at end of input: " : n += " at position " + (a + 1) + ": ";
      var h = l.slice(a, i).replace(/[^]/g, "$&\u0332"), c;
      a > 15 ? c = "\u2026" + l.slice(a - 15, a) : c = l.slice(0, a);
      var m;
      i + 15 < l.length ? m = l.slice(i, i + 15) + "\u2026" : m = l.slice(i), n += c + h + m;
    }
    super(n), this.name = "ParseError", this.position = void 0, this.length = void 0, this.rawMessage = void 0, Object.setPrototypeOf(this, A.prototype), this.position = a, a != null && i != null && (this.length = i - a), this.rawMessage = e;
  }
}
var Ms = /([A-Z])/g, zs = (r) => r.replace(Ms, "-$1").toLowerCase(), Cs = { "&": "&amp;", ">": "&gt;", "<": "&lt;", '"': "&quot;", "'": "&#x27;" }, Es = /[&><"']/g, he = (r) => String(r).replace(Es, (e) => Cs[e]), v0 = (r) => r.type === "ordgroup" || r.type === "color" ? r.body.length === 1 ? v0(r.body[0]) : r : r.type === "font" ? v0(r.body) : r, Ns = /* @__PURE__ */ new Set(["mathord", "textord", "atom"]), je = (r) => Ns.has(v0(r).type), Is = (r) => {
  var e = /^[\x00-\x20]*([^\\/#?]*?)(:|&#0*58|&#x0*3a|&colon)/i.exec(r);
  return e ? e[2] !== ":" || !/^[a-zA-Z][a-zA-Z0-9+\-.]*$/.test(e[1]) ? null : e[1].toLowerCase() : "_relative";
}, gr = { displayMode: { type: "boolean", description: "Render math in display mode, which puts the math in display style (so \\int and \\sum are large, for example), and centers the math on the page on its own line.", cli: "-d, --display-mode" }, output: { type: { enum: ["htmlAndMathml", "html", "mathml"] }, description: "Determines the markup language of the output.", cli: "-F, --format <type>" }, leqno: { type: "boolean", description: "Render display math in leqno style (left-justified tags)." }, fleqn: { type: "boolean", description: "Render display math flush left." }, throwOnError: { type: "boolean", default: true, cli: "-t, --no-throw-on-error", cliDescription: "Render errors (in the color given by --error-color) instead of throwing a ParseError exception when encountering an error." }, errorColor: { type: "string", default: "#cc0000", cli: "-c, --error-color <color>", cliDescription: "A color string given in the format 'rgb' or 'rrggbb' (no #). This option determines the color of errors rendered by the -t option.", cliProcessor: (r) => "#" + r }, macros: { type: "object", cli: "-m, --macro <def>", cliDescription: "Define custom macro of the form '\\foo:expansion' (use multiple -m arguments for multiple macros).", cliDefault: [], cliProcessor: (r, e) => (e.push(r), e) }, minRuleThickness: { type: "number", description: "Specifies a minimum thickness, in ems, for fraction lines, `\\sqrt` top lines, `{array}` vertical lines, `\\hline`, `\\hdashline`, `\\underline`, `\\overline`, and the borders of `\\fbox`, `\\boxed`, and `\\fcolorbox`.", processor: (r) => Math.max(0, r), cli: "--min-rule-thickness <size>", cliProcessor: parseFloat }, colorIsTextColor: { type: "boolean", description: "Makes \\color behave like LaTeX's 2-argument \\textcolor, instead of LaTeX's one-argument \\color mode change.", cli: "-b, --color-is-text-color" }, strict: { type: [{ enum: ["warn", "ignore", "error"] }, "boolean", "function"], description: "Turn on strict / LaTeX faithfulness mode, which throws an error if the input uses features that are not supported by LaTeX.", cli: "-S, --strict", cliDefault: false }, trust: { type: ["boolean", "function"], description: "Trust the input, enabling all HTML features such as \\url.", cli: "-T, --trust" }, maxSize: { type: "number", default: 1 / 0, description: "If non-zero, all user-specified sizes, e.g. in \\rule{500em}{500em}, will be capped to maxSize ems. Otherwise, elements and spaces can be arbitrarily large", processor: (r) => Math.max(0, r), cli: "-s, --max-size <n>", cliProcessor: parseInt }, maxExpand: { type: "number", default: 1e3, description: "Limit the number of macro expansions to the specified number, to prevent e.g. infinite macro loops. If set to Infinity, the macro expander will try to fully expand as in LaTeX.", processor: (r) => Math.max(0, r), cli: "-e, --max-expand <n>", cliProcessor: (r) => r === "Infinity" ? 1 / 0 : parseInt(r) }, globalGroup: { type: "boolean", cli: false } };
function Bs(r) {
  if (typeof r != "string") return r.enum[0];
  switch (r) {
    case "boolean":
      return false;
    case "string":
      return "";
    case "number":
      return 0;
    case "object":
      return {};
    default:
      throw new Error("Unexpected schema type; settings must declare an explicit default.");
  }
}
function Rs(r) {
  if (r.default !== void 0) return r.default;
  var e = Array.isArray(r.type) ? r.type[0] : r.type;
  return Bs(e);
}
function qs(r, e, t, n) {
  var a = t[e];
  r[e] = a !== void 0 ? n.processor ? n.processor(a) : a : Rs(n);
}
class Gr {
  constructor(e) {
    e === void 0 && (e = {}), this.displayMode = void 0, this.output = void 0, this.leqno = void 0, this.fleqn = void 0, this.throwOnError = void 0, this.errorColor = void 0, this.macros = void 0, this.minRuleThickness = void 0, this.colorIsTextColor = void 0, this.strict = void 0, this.trust = void 0, this.maxSize = void 0, this.maxExpand = void 0, this.globalGroup = void 0, e = e || {};
    for (var t of Object.keys(gr)) {
      var n = gr[t];
      n && qs(this, t, e, n);
    }
  }
  reportNonstrict(e, t, n) {
    var a = this.strict;
    if (typeof a == "function" && (a = a(e, t, n)), !(!a || a === "ignore")) {
      if (a === true || a === "error") throw new A("LaTeX-incompatible input and strict mode is set to 'error': " + (t + " [" + e + "]"), n);
      a === "warn" ? typeof console < "u" && console.warn("LaTeX-incompatible input and strict mode is set to 'warn': " + (t + " [" + e + "]")) : typeof console < "u" && console.warn("LaTeX-incompatible input and strict mode is set to " + ("unrecognized '" + a + "': " + t + " [" + e + "]"));
    }
  }
  useStrictBehavior(e, t, n) {
    var a = this.strict;
    if (typeof a == "function") try {
      a = a(e, t, n);
    } catch {
      a = "error";
    }
    return !a || a === "ignore" ? false : a === true || a === "error" ? true : a === "warn" ? (typeof console < "u" && console.warn("LaTeX-incompatible input and strict mode is set to 'warn': " + (t + " [" + e + "]")), false) : (typeof console < "u" && console.warn("LaTeX-incompatible input and strict mode is set to " + ("unrecognized '" + a + "': " + t + " [" + e + "]")), false);
  }
  isTrusted(e) {
    if ("url" in e && e.url && !e.protocol) {
      var t = Is(e.url);
      if (t == null) return false;
      e.protocol = t;
    }
    var n = typeof this.trust == "function" ? this.trust(e) : this.trust;
    return !!n;
  }
}
class Je {
  constructor(e, t, n) {
    this.id = void 0, this.size = void 0, this.cramped = void 0, this.id = e, this.size = t, this.cramped = n;
  }
  sup() {
    return Be[Fs[this.id]];
  }
  sub() {
    return Be[Ls[this.id]];
  }
  fracNum() {
    return Be[Os[this.id]];
  }
  fracDen() {
    return Be[Ps[this.id]];
  }
  cramp() {
    return Be[$s[this.id]];
  }
  text() {
    return Be[Ds[this.id]];
  }
  isTight() {
    return this.size >= 2;
  }
}
var Vr = 0, k0 = 1, It = 2, Ve = 3, Zt = 4, Me = 5, Rt = 6, fe = 7, Be = [new Je(Vr, 0, false), new Je(k0, 0, true), new Je(It, 1, false), new Je(Ve, 1, true), new Je(Zt, 2, false), new Je(Me, 2, true), new Je(Rt, 3, false), new Je(fe, 3, true)], Fs = [Zt, Me, Zt, Me, Rt, fe, Rt, fe], Ls = [Me, Me, Me, Me, fe, fe, fe, fe], Os = [It, Ve, Zt, Me, Rt, fe, Rt, fe], Ps = [Ve, Ve, Me, Me, fe, fe, fe, fe], $s = [k0, k0, Ve, Ve, Me, Me, fe, fe], Ds = [Vr, k0, It, Ve, It, Ve, It, Ve], $ = { DISPLAY: Be[Vr], TEXT: Be[It], SCRIPT: Be[Zt], SCRIPTSCRIPT: Be[Rt] }, vr = [{ name: "latin", blocks: [[256, 591], [768, 879]] }, { name: "cyrillic", blocks: [[1024, 1279]] }, { name: "armenian", blocks: [[1328, 1423]] }, { name: "brahmic", blocks: [[2304, 4255]] }, { name: "georgian", blocks: [[4256, 4351]] }, { name: "cjk", blocks: [[12288, 12543], [19968, 40879], [65280, 65376]] }, { name: "hangul", blocks: [[44032, 55215]] }];
function Hs(r) {
  for (var e = 0; e < vr.length; e++) for (var t = vr[e], n = 0; n < t.blocks.length; n++) {
    var a = t.blocks[n];
    if (r >= a[0] && r <= a[1]) return t.name;
  }
  return null;
}
var b0 = [];
vr.forEach((r) => r.blocks.forEach((e) => b0.push(...e)));
function Fa(r) {
  for (var e = 0; e < b0.length; e += 2) if (r >= b0[e] && r <= b0[e + 1]) return true;
  return false;
}
var le = (r) => r + " " + r, Ct = 80, _s = function(e, t) {
  return "M95," + (622 + e + t) + `
c-2.7,0,-7.17,-2.7,-13.5,-8c-5.8,-5.3,-9.5,-10,-9.5,-14
c0,-2,0.3,-3.3,1,-4c1.3,-2.7,23.83,-20.7,67.5,-54
c44.2,-33.3,65.8,-50.3,66.5,-51c1.3,-1.3,3,-2,5,-2c4.7,0,8.7,3.3,12,10
s173,378,173,378c0.7,0,35.3,-71,104,-213c68.7,-142,137.5,-285,206.5,-429
c69,-144,104.5,-217.7,106.5,-221
l` + e / 2.075 + " -" + e + `
c5.3,-9.3,12,-14,20,-14
H400000v` + (40 + e) + `H845.2724
s-225.272,467,-225.272,467s-235,486,-235,486c-2.7,4.7,-9,7,-19,7
c-6,0,-10,-1,-12,-3s-194,-422,-194,-422s-65,47,-65,47z
M` + (834 + e) + " " + t + "h400000v" + (40 + e) + "h-400000z";
}, Gs = function(e, t) {
  return "M263," + (601 + e + t) + `c0.7,0,18,39.7,52,119
c34,79.3,68.167,158.7,102.5,238c34.3,79.3,51.8,119.3,52.5,120
c340,-704.7,510.7,-1060.3,512,-1067
l` + e / 2.084 + " -" + e + `
c4.7,-7.3,11,-11,19,-11
H40000v` + (40 + e) + `H1012.3
s-271.3,567,-271.3,567c-38.7,80.7,-84,175,-136,283c-52,108,-89.167,185.3,-111.5,232
c-22.3,46.7,-33.8,70.3,-34.5,71c-4.7,4.7,-12.3,7,-23,7s-12,-1,-12,-1
s-109,-253,-109,-253c-72.7,-168,-109.3,-252,-110,-252c-10.7,8,-22,16.7,-34,26
c-22,17.3,-33.3,26,-34,26s-26,-26,-26,-26s76,-59,76,-59s76,-60,76,-60z
M` + (1001 + e) + " " + t + "h400000v" + (40 + e) + "h-400000z";
}, Vs = function(e, t) {
  return "M983 " + (10 + e + t) + `
l` + e / 3.13 + " -" + e + `
c4,-6.7,10,-10,18,-10 H400000v` + (40 + e) + `
H1013.1s-83.4,268,-264.1,840c-180.7,572,-277,876.3,-289,913c-4.7,4.7,-12.7,7,-24,7
s-12,0,-12,0c-1.3,-3.3,-3.7,-11.7,-7,-25c-35.3,-125.3,-106.7,-373.3,-214,-744
c-10,12,-21,25,-33,39s-32,39,-32,39c-6,-5.3,-15,-14,-27,-26s25,-30,25,-30
c26.7,-32.7,52,-63,76,-91s52,-60,52,-60s208,722,208,722
c56,-175.3,126.3,-397.3,211,-666c84.7,-268.7,153.8,-488.2,207.5,-658.5
c53.7,-170.3,84.5,-266.8,92.5,-289.5z
M` + (1001 + e) + " " + t + "h400000v" + (40 + e) + "h-400000z";
}, Us = function(e, t) {
  return "M424," + (2398 + e + t) + `
c-1.3,-0.7,-38.5,-172,-111.5,-514c-73,-342,-109.8,-513.3,-110.5,-514
c0,-2,-10.7,14.3,-32,49c-4.7,7.3,-9.8,15.7,-15.5,25c-5.7,9.3,-9.8,16,-12.5,20
s-5,7,-5,7c-4,-3.3,-8.3,-7.7,-13,-13s-13,-13,-13,-13s76,-122,76,-122s77,-121,77,-121
s209,968,209,968c0,-2,84.7,-361.7,254,-1079c169.3,-717.3,254.7,-1077.7,256,-1081
l` + e / 4.223 + " -" + e + `c4,-6.7,10,-10,18,-10 H400000
v` + (40 + e) + `H1014.6
s-87.3,378.7,-272.6,1166c-185.3,787.3,-279.3,1182.3,-282,1185
c-2,6,-10,9,-24,9
c-8,0,-12,-0.7,-12,-2z M` + (1001 + e) + " " + t + `
h400000v` + (40 + e) + "h-400000z";
}, js = function(e, t) {
  return "M473," + (2713 + e + t) + `
c339.3,-1799.3,509.3,-2700,510,-2702 l` + e / 5.298 + " -" + e + `
c3.3,-7.3,9.3,-11,18,-11 H400000v` + (40 + e) + `H1017.7
s-90.5,478,-276.2,1466c-185.7,988,-279.5,1483,-281.5,1485c-2,6,-10,9,-24,9
c-8,0,-12,-0.7,-12,-2c0,-1.3,-5.3,-32,-16,-92c-50.7,-293.3,-119.7,-693.3,-207,-1200
c0,-1.3,-5.3,8.7,-16,30c-10.7,21.3,-21.3,42.7,-32,64s-16,33,-16,33s-26,-26,-26,-26
s76,-153,76,-153s77,-151,77,-151c0.7,0.7,35.7,202,105,604c67.3,400.7,102,602.7,104,
606zM` + (1001 + e) + " " + t + "h400000v" + (40 + e) + "H1017.7z";
}, Ws = function(e) {
  var t = e / 2;
  return "M400000 " + e + " H0 L" + t + " 0 l65 45 L145 " + (e - 80) + " H400000z";
}, Xs = function(e, t, n) {
  var a = n - 54 - t - e;
  return "M702 " + (e + t) + "H400000" + (40 + e) + `
H742v` + a + `l-4 4-4 4c-.667.7 -2 1.5-4 2.5s-4.167 1.833-6.5 2.5-5.5 1-9.5 1
h-12l-28-84c-16.667-52-96.667 -294.333-240-727l-212 -643 -85 170
c-4-3.333-8.333-7.667-13 -13l-13-13l77-155 77-156c66 199.333 139 419.667
219 661 l218 661zM702 ` + t + "H400000v" + (40 + e) + "H742z";
}, Ys = function(e, t, n) {
  t = 1e3 * t;
  var a = "";
  switch (e) {
    case "sqrtMain":
      a = _s(t, Ct);
      break;
    case "sqrtSize1":
      a = Gs(t, Ct);
      break;
    case "sqrtSize2":
      a = Vs(t, Ct);
      break;
    case "sqrtSize3":
      a = Us(t, Ct);
      break;
    case "sqrtSize4":
      a = js(t, Ct);
      break;
    case "sqrtTall":
      a = Xs(t, Ct, n);
  }
  return a;
}, Zs = function(e, t) {
  switch (e) {
    case "\u239C":
      return le("M291 0 H417 V" + t + " H291z");
    case "\u2223":
      return le("M145 0 H188 V" + t + " H145z");
    case "\u2225":
      return le("M145 0 H188 V" + t + " H145z") + le("M367 0 H410 V" + t + " H367z");
    case "\u239F":
      return le("M457 0 H583 V" + t + " H457z");
    case "\u23A2":
      return le("M319 0 H403 V" + t + " H319z");
    case "\u23A5":
      return le("M263 0 H347 V" + t + " H263z");
    case "\u23AA":
      return le("M384 0 H504 V" + t + " H384z");
    case "\u23D0":
      return le("M312 0 H355 V" + t + " H312z");
    case "\u2016":
      return le("M257 0 H300 V" + t + " H257z") + le("M478 0 H521 V" + t + " H478z");
    default:
      return "";
  }
}, qn = { doubleleftarrow: `M262 157
l10-10c34-36 62.7-77 86-123 3.3-8 5-13.3 5-16 0-5.3-6.7-8-20-8-7.3
 0-12.2.5-14.5 1.5-2.3 1-4.8 4.5-7.5 10.5-49.3 97.3-121.7 169.3-217 216-28
 14-57.3 25-88 33-6.7 2-11 3.8-13 5.5-2 1.7-3 4.2-3 7.5s1 5.8 3 7.5
c2 1.7 6.3 3.5 13 5.5 68 17.3 128.2 47.8 180.5 91.5 52.3 43.7 93.8 96.2 124.5
 157.5 9.3 8 15.3 12.3 18 13h6c12-.7 18-4 18-10 0-2-1.7-7-5-15-23.3-46-52-87
-86-123l-10-10h399738v-40H218c328 0 0 0 0 0l-10-8c-26.7-20-65.7-43-117-69 2.7
-2 6-3.7 10-5 36.7-16 72.3-37.3 107-64l10-8h399782v-40z
m8 0v40h399730v-40zm0 194v40h399730v-40z`, doublerightarrow: `M399738 392l
-10 10c-34 36-62.7 77-86 123-3.3 8-5 13.3-5 16 0 5.3 6.7 8 20 8 7.3 0 12.2-.5
 14.5-1.5 2.3-1 4.8-4.5 7.5-10.5 49.3-97.3 121.7-169.3 217-216 28-14 57.3-25 88
-33 6.7-2 11-3.8 13-5.5 2-1.7 3-4.2 3-7.5s-1-5.8-3-7.5c-2-1.7-6.3-3.5-13-5.5-68
-17.3-128.2-47.8-180.5-91.5-52.3-43.7-93.8-96.2-124.5-157.5-9.3-8-15.3-12.3-18
-13h-6c-12 .7-18 4-18 10 0 2 1.7 7 5 15 23.3 46 52 87 86 123l10 10H0v40h399782
c-328 0 0 0 0 0l10 8c26.7 20 65.7 43 117 69-2.7 2-6 3.7-10 5-36.7 16-72.3 37.3
-107 64l-10 8H0v40zM0 157v40h399730v-40zm0 194v40h399730v-40z`, leftarrow: `M400000 241H110l3-3c68.7-52.7 113.7-120
 135-202 4-14.7 6-23 6-25 0-7.3-7-11-21-11-8 0-13.2.8-15.5 2.5-2.3 1.7-4.2 5.8
-5.5 12.5-1.3 4.7-2.7 10.3-4 17-12 48.7-34.8 92-68.5 130S65.3 228.3 18 247
c-10 4-16 7.7-18 11 0 8.7 6 14.3 18 17 47.3 18.7 87.8 47 121.5 85S196 441.3 208
 490c.7 2 1.3 5 2 9s1.2 6.7 1.5 8c.3 1.3 1 3.3 2 6s2.2 4.5 3.5 5.5c1.3 1 3.3
 1.8 6 2.5s6 1 10 1c14 0 21-3.7 21-11 0-2-2-10.3-6-25-20-79.3-65-146.7-135-202
 l-3-3h399890zM100 241v40h399900v-40z`, leftbrace: `M6 548l-6-6v-35l6-11c56-104 135.3-181.3 238-232 57.3-28.7 117
-45 179-50h399577v120H403c-43.3 7-81 15-113 26-100.7 33-179.7 91-237 174-2.7
 5-6 9-10 13-.7 1-7.3 1-20 1H6z`, leftbraceunder: `M0 6l6-6h17c12.688 0 19.313.3 20 1 4 4 7.313 8.3 10 13
 35.313 51.3 80.813 93.8 136.5 127.5 55.688 33.7 117.188 55.8 184.5 66.5.688
 0 2 .3 4 1 18.688 2.7 76 4.3 172 5h399450v120H429l-6-1c-124.688-8-235-61.7
-331-161C60.687 138.7 32.312 99.3 7 54L0 41V6z`, leftgroup: `M400000 80
H435C64 80 168.3 229.4 21 260c-5.9 1.2-18 0-18 0-2 0-3-1-3-3v-38C76 61 257 0
 435 0h399565z`, leftgroupunder: `M400000 262
H435C64 262 168.3 112.6 21 82c-5.9-1.2-18 0-18 0-2 0-3 1-3 3v38c76 158 257 219
 435 219h399565z`, leftharpoon: `M0 267c.7 5.3 3 10 7 14h399993v-40H93c3.3
-3.3 10.2-9.5 20.5-18.5s17.8-15.8 22.5-20.5c50.7-52 88-110.3 112-175 4-11.3 5
-18.3 3-21-1.3-4-7.3-6-18-6-8 0-13 .7-15 2s-4.7 6.7-8 16c-42 98.7-107.3 174.7
-196 228-6.7 4.7-10.7 8-12 10-1.3 2-2 5.7-2 11zm100-26v40h399900v-40z`, leftharpoonplus: `M0 267c.7 5.3 3 10 7 14h399993v-40H93c3.3-3.3 10.2-9.5
 20.5-18.5s17.8-15.8 22.5-20.5c50.7-52 88-110.3 112-175 4-11.3 5-18.3 3-21-1.3
-4-7.3-6-18-6-8 0-13 .7-15 2s-4.7 6.7-8 16c-42 98.7-107.3 174.7-196 228-6.7 4.7
-10.7 8-12 10-1.3 2-2 5.7-2 11zm100-26v40h399900v-40zM0 435v40h400000v-40z
m0 0v40h400000v-40z`, leftharpoondown: `M7 241c-4 4-6.333 8.667-7 14 0 5.333.667 9 2 11s5.333
 5.333 12 10c90.667 54 156 130 196 228 3.333 10.667 6.333 16.333 9 17 2 .667 5
 1 9 1h5c10.667 0 16.667-2 18-6 2-2.667 1-9.667-3-21-32-87.333-82.667-157.667
-152-211l-3-3h399907v-40zM93 281 H400000 v-40L7 241z`, leftharpoondownplus: `M7 435c-4 4-6.3 8.7-7 14 0 5.3.7 9 2 11s5.3 5.3 12
 10c90.7 54 156 130 196 228 3.3 10.7 6.3 16.3 9 17 2 .7 5 1 9 1h5c10.7 0 16.7
-2 18-6 2-2.7 1-9.7-3-21-32-87.3-82.7-157.7-152-211l-3-3h399907v-40H7zm93 0
v40h399900v-40zM0 241v40h399900v-40zm0 0v40h399900v-40z`, lefthook: `M400000 281 H103s-33-11.2-61-33.5S0 197.3 0 164s14.2-61.2 42.5
-83.5C70.8 58.2 104 47 142 47 c16.7 0 25 6.7 25 20 0 12-8.7 18.7-26 20-40 3.3
-68.7 15.7-86 37-10 12-15 25.3-15 40 0 22.7 9.8 40.7 29.5 54 19.7 13.3 43.5 21
 71.5 23h399859zM103 281v-40h399897v40z`, leftlinesegment: le("M40 281 V428 H0 V94 H40 V241 H400000 v40z"), leftbracketunder: le("M0 0 h120 V290 H399995 v120 H0z"), leftbracketover: le("M0 440 h120 V150 H399995 v-120 H0z"), leftmapsto: le("M40 281 V448H0V74H40V241H400000v40z"), leftToFrom: `M0 147h400000v40H0zm0 214c68 40 115.7 95.7 143 167h22c15.3 0 23
-.3 23-1 0-1.3-5.3-13.7-16-37-18-35.3-41.3-69-70-101l-7-8h399905v-40H95l7-8
c28.7-32 52-65.7 70-101 10.7-23.3 16-35.7 16-37 0-.7-7.7-1-23-1h-22C115.7 265.3
 68 321 0 361zm0-174v-40h399900v40zm100 154v40h399900v-40z`, longequal: le("M0 50 h400000 v40H0z m0 194h40000v40H0z"), midbrace: `M200428 334
c-100.7-8.3-195.3-44-280-108-55.3-42-101.7-93-139-153l-9-14c-2.7 4-5.7 8.7-9 14
-53.3 86.7-123.7 153-211 199-66.7 36-137.3 56.3-212 62H0V214h199568c178.3-11.7
 311.7-78.3 403-201 6-8 9.7-12 11-12 .7-.7 6.7-1 18-1s17.3.3 18 1c1.3 0 5 4 11
 12 44.7 59.3 101.3 106.3 170 141s145.3 54.3 229 60h199572v120z`, midbraceunder: `M199572 214
c100.7 8.3 195.3 44 280 108 55.3 42 101.7 93 139 153l9 14c2.7-4 5.7-8.7 9-14
 53.3-86.7 123.7-153 211-199 66.7-36 137.3-56.3 212-62h199568v120H200432c-178.3
 11.7-311.7 78.3-403 201-6 8-9.7 12-11 12-.7.7-6.7 1-18 1s-17.3-.3-18-1c-1.3 0
-5-4-11-12-44.7-59.3-101.3-106.3-170-141s-145.3-54.3-229-60H0V214z`, oiintSize1: `M512.6 71.6c272.6 0 320.3 106.8 320.3 178.2 0 70.8-47.7 177.6
-320.3 177.6S193.1 320.6 193.1 249.8c0-71.4 46.9-178.2 319.5-178.2z
m368.1 178.2c0-86.4-60.9-215.4-368.1-215.4-306.4 0-367.3 129-367.3 215.4 0 85.8
60.9 214.8 367.3 214.8 307.2 0 368.1-129 368.1-214.8z`, oiintSize2: `M757.8 100.1c384.7 0 451.1 137.6 451.1 230 0 91.3-66.4 228.8
-451.1 228.8-386.3 0-452.7-137.5-452.7-228.8 0-92.4 66.4-230 452.7-230z
m502.4 230c0-111.2-82.4-277.2-502.4-277.2s-504 166-504 277.2
c0 110 84 276 504 276s502.4-166 502.4-276z`, oiiintSize1: `M681.4 71.6c408.9 0 480.5 106.8 480.5 178.2 0 70.8-71.6 177.6
-480.5 177.6S202.1 320.6 202.1 249.8c0-71.4 70.5-178.2 479.3-178.2z
m525.8 178.2c0-86.4-86.8-215.4-525.7-215.4-437.9 0-524.7 129-524.7 215.4 0
85.8 86.8 214.8 524.7 214.8 438.9 0 525.7-129 525.7-214.8z`, oiiintSize2: `M1021.2 53c603.6 0 707.8 165.8 707.8 277.2 0 110-104.2 275.8
-707.8 275.8-606 0-710.2-165.8-710.2-275.8C311 218.8 415.2 53 1021.2 53z
m770.4 277.1c0-131.2-126.4-327.6-770.5-327.6S248.4 198.9 248.4 330.1
c0 130 128.8 326.4 772.7 326.4s770.5-196.4 770.5-326.4z`, rightarrow: `M0 241v40h399891c-47.3 35.3-84 78-110 128
-16.7 32-27.7 63.7-33 95 0 1.3-.2 2.7-.5 4-.3 1.3-.5 2.3-.5 3 0 7.3 6.7 11 20
 11 8 0 13.2-.8 15.5-2.5 2.3-1.7 4.2-5.5 5.5-11.5 2-13.3 5.7-27 11-41 14.7-44.7
 39-84.5 73-119.5s73.7-60.2 119-75.5c6-2 9-5.7 9-11s-3-9-9-11c-45.3-15.3-85
-40.5-119-75.5s-58.3-74.8-73-119.5c-4.7-14-8.3-27.3-11-40-1.3-6.7-3.2-10.8-5.5
-12.5-2.3-1.7-7.5-2.5-15.5-2.5-14 0-21 3.7-21 11 0 2 2 10.3 6 25 20.7 83.3 67
 151.7 139 205zm0 0v40h399900v-40z`, rightbrace: `M400000 542l
-6 6h-17c-12.7 0-19.3-.3-20-1-4-4-7.3-8.3-10-13-35.3-51.3-80.8-93.8-136.5-127.5
s-117.2-55.8-184.5-66.5c-.7 0-2-.3-4-1-18.7-2.7-76-4.3-172-5H0V214h399571l6 1
c124.7 8 235 61.7 331 161 31.3 33.3 59.7 72.7 85 118l7 13v35z`, rightbraceunder: `M399994 0l6 6v35l-6 11c-56 104-135.3 181.3-238 232-57.3
 28.7-117 45-179 50H-300V214h399897c43.3-7 81-15 113-26 100.7-33 179.7-91 237
-174 2.7-5 6-9 10-13 .7-1 7.3-1 20-1h17z`, rightgroup: `M0 80h399565c371 0 266.7 149.4 414 180 5.9 1.2 18 0 18 0 2 0
 3-1 3-3v-38c-76-158-257-219-435-219H0z`, rightgroupunder: `M0 262h399565c371 0 266.7-149.4 414-180 5.9-1.2 18 0 18
 0 2 0 3 1 3 3v38c-76 158-257 219-435 219H0z`, rightharpoon: `M0 241v40h399993c4.7-4.7 7-9.3 7-14 0-9.3
-3.7-15.3-11-18-92.7-56.7-159-133.7-199-231-3.3-9.3-6-14.7-8-16-2-1.3-7-2-15-2
-10.7 0-16.7 2-18 6-2 2.7-1 9.7 3 21 15.3 42 36.7 81.8 64 119.5 27.3 37.7 58
 69.2 92 94.5zm0 0v40h399900v-40z`, rightharpoonplus: `M0 241v40h399993c4.7-4.7 7-9.3 7-14 0-9.3-3.7-15.3-11
-18-92.7-56.7-159-133.7-199-231-3.3-9.3-6-14.7-8-16-2-1.3-7-2-15-2-10.7 0-16.7
 2-18 6-2 2.7-1 9.7 3 21 15.3 42 36.7 81.8 64 119.5 27.3 37.7 58 69.2 92 94.5z
m0 0v40h399900v-40z m100 194v40h399900v-40zm0 0v40h399900v-40z`, rightharpoondown: `M399747 511c0 7.3 6.7 11 20 11 8 0 13-.8 15-2.5s4.7-6.8
 8-15.5c40-94 99.3-166.3 178-217 13.3-8 20.3-12.3 21-13 5.3-3.3 8.5-5.8 9.5
-7.5 1-1.7 1.5-5.2 1.5-10.5s-2.3-10.3-7-15H0v40h399908c-34 25.3-64.7 57-92 95
-27.3 38-48.7 77.7-64 119-3.3 8.7-5 14-5 16zM0 241v40h399900v-40z`, rightharpoondownplus: `M399747 705c0 7.3 6.7 11 20 11 8 0 13-.8
 15-2.5s4.7-6.8 8-15.5c40-94 99.3-166.3 178-217 13.3-8 20.3-12.3 21-13 5.3-3.3
 8.5-5.8 9.5-7.5 1-1.7 1.5-5.2 1.5-10.5s-2.3-10.3-7-15H0v40h399908c-34 25.3
-64.7 57-92 95-27.3 38-48.7 77.7-64 119-3.3 8.7-5 14-5 16zM0 435v40h399900v-40z
m0-194v40h400000v-40zm0 0v40h400000v-40z`, righthook: `M399859 241c-764 0 0 0 0 0 40-3.3 68.7-15.7 86-37 10-12 15-25.3
 15-40 0-22.7-9.8-40.7-29.5-54-19.7-13.3-43.5-21-71.5-23-17.3-1.3-26-8-26-20 0
-13.3 8.7-20 26-20 38 0 71 11.2 99 33.5 0 0 7 5.6 21 16.7 14 11.2 21 33.5 21
 66.8s-14 61.2-42 83.5c-28 22.3-61 33.5-99 33.5L0 241z M0 281v-40h399859v40z`, rightlinesegment: le("M399960 241 V94 h40 V428 h-40 V281 H0 v-40z"), rightbracketunder: le("M399995 0 h-120 V290 H0 v120 H400000z"), rightbracketover: le("M399995 440 h-120 V150 H0 v-120 H399995z"), rightToFrom: `M400000 167c-70.7-42-118-97.7-142-167h-23c-15.3 0-23 .3-23
 1 0 1.3 5.3 13.7 16 37 18 35.3 41.3 69 70 101l7 8H0v40h399905l-7 8c-28.7 32
-52 65.7-70 101-10.7 23.3-16 35.7-16 37 0 .7 7.7 1 23 1h23c24-69.3 71.3-125 142
-167z M100 147v40h399900v-40zM0 341v40h399900v-40z`, twoheadleftarrow: `M0 167c68 40
 115.7 95.7 143 167h22c15.3 0 23-.3 23-1 0-1.3-5.3-13.7-16-37-18-35.3-41.3-69
-70-101l-7-8h125l9 7c50.7 39.3 85 86 103 140h46c0-4.7-6.3-18.7-19-42-18-35.3
-40-67.3-66-96l-9-9h399716v-40H284l9-9c26-28.7 48-60.7 66-96 12.7-23.333 19
-37.333 19-42h-46c-18 54-52.3 100.7-103 140l-9 7H95l7-8c28.7-32 52-65.7 70-101
 10.7-23.333 16-35.7 16-37 0-.7-7.7-1-23-1h-22C115.7 71.3 68 127 0 167z`, twoheadrightarrow: `M400000 167
c-68-40-115.7-95.7-143-167h-22c-15.3 0-23 .3-23 1 0 1.3 5.3 13.7 16 37 18 35.3
 41.3 69 70 101l7 8h-125l-9-7c-50.7-39.3-85-86-103-140h-46c0 4.7 6.3 18.7 19 42
 18 35.3 40 67.3 66 96l9 9H0v40h399716l-9 9c-26 28.7-48 60.7-66 96-12.7 23.333
-19 37.333-19 42h46c18-54 52.3-100.7 103-140l9-7h125l-7 8c-28.7 32-52 65.7-70
 101-10.7 23.333-16 35.7-16 37 0 .7 7.7 1 23 1h22c27.3-71.3 75-127 143-167z`, tilde1: `M200 55.538c-77 0-168 73.953-177 73.953-3 0-7
-2.175-9-5.437L2 97c-1-2-2-4-2-6 0-4 2-7 5-9l20-12C116 12 171 0 207 0c86 0
 114 68 191 68 78 0 168-68 177-68 4 0 7 2 9 5l12 19c1 2.175 2 4.35 2 6.525 0
 4.35-2 7.613-5 9.788l-19 13.05c-92 63.077-116.937 75.308-183 76.128
-68.267.847-113-73.952-191-73.952z`, tilde2: `M344 55.266c-142 0-300.638 81.316-311.5 86.418
-8.01 3.762-22.5 10.91-23.5 5.562L1 120c-1-2-1-3-1-4 0-5 3-9 8-10l18.4-9C160.9
 31.9 283 0 358 0c148 0 188 122 331 122s314-97 326-97c4 0 8 2 10 7l7 21.114
c1 2.14 1 3.21 1 4.28 0 5.347-3 9.626-7 10.696l-22.3 12.622C852.6 158.372 751
 181.476 676 181.476c-149 0-189-126.21-332-126.21z`, tilde3: `M786 59C457 59 32 175.242 13 175.242c-6 0-10-3.457
-11-10.37L.15 138c-1-7 3-12 10-13l19.2-6.4C378.4 40.7 634.3 0 804.3 0c337 0
 411.8 157 746.8 157 328 0 754-112 773-112 5 0 10 3 11 9l1 14.075c1 8.066-.697
 16.595-6.697 17.492l-21.052 7.31c-367.9 98.146-609.15 122.696-778.15 122.696
 -338 0-409-156.573-744-156.573z`, tilde4: `M786 58C457 58 32 177.487 13 177.487c-6 0-10-3.345
-11-10.035L.15 143c-1-7 3-12 10-13l22-6.7C381.2 35 637.15 0 807.15 0c337 0 409
 177 744 177 328 0 754-127 773-127 5 0 10 3 11 9l1 14.794c1 7.805-3 13.38-9
 14.495l-20.7 5.574c-366.85 99.79-607.3 139.372-776.3 139.372-338 0-409
 -175.236-744-175.236z`, vec: `M377 20c0-5.333 1.833-10 5.5-14S391 0 397 0c4.667 0 8.667 1.667 12 5
3.333 2.667 6.667 9 10 19 6.667 24.667 20.333 43.667 41 57 7.333 4.667 11
10.667 11 18 0 6-1 10-3 12s-6.667 5-14 9c-28.667 14.667-53.667 35.667-75 63
-1.333 1.333-3.167 3.5-5.5 6.5s-4 4.833-5 5.5c-1 .667-2.5 1.333-4.5 2s-4.333 1
-7 1c-4.667 0-9.167-1.833-13.5-5.5S337 184 337 178c0-12.667 15.667-32.333 47-59
H213l-171-1c-8.667-6-13-12.333-13-19 0-4.667 4.333-11.333 13-20h359
c-16-25.333-24-45-24-59z`, widehat1: `M529 0h5l519 115c5 1 9 5 9 10 0 1-1 2-1 3l-4 22
c-1 5-5 9-11 9h-2L532 67 19 159h-2c-5 0-9-4-11-9l-5-22c-1-6 2-12 8-13z`, widehat2: `M1181 0h2l1171 176c6 0 10 5 10 11l-2 23c-1 6-5 10
-11 10h-1L1182 67 15 220h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z`, widehat3: `M1181 0h2l1171 236c6 0 10 5 10 11l-2 23c-1 6-5 10
-11 10h-1L1182 67 15 280h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z`, widehat4: `M1181 0h2l1171 296c6 0 10 5 10 11l-2 23c-1 6-5 10
-11 10h-1L1182 67 15 340h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z`, widecheck1: `M529,159h5l519,-115c5,-1,9,-5,9,-10c0,-1,-1,-2,-1,-3l-4,-22c-1,
-5,-5,-9,-11,-9h-2l-512,92l-513,-92h-2c-5,0,-9,4,-11,9l-5,22c-1,6,2,12,8,13z`, widecheck2: `M1181,220h2l1171,-176c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,
-11,-10h-1l-1168,153l-1167,-153h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z`, widecheck3: `M1181,280h2l1171,-236c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,
-11,-10h-1l-1168,213l-1167,-213h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z`, widecheck4: `M1181,340h2l1171,-296c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,
-11,-10h-1l-1168,273l-1167,-273h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z`, baraboveleftarrow: `M400000 620h-399890l3 -3c68.7 -52.7 113.7 -120 135 -202
c4 -14.7 6 -23 6 -25c0 -7.3 -7 -11 -21 -11c-8 0 -13.2 0.8 -15.5 2.5
c-2.3 1.7 -4.2 5.8 -5.5 12.5c-1.3 4.7 -2.7 10.3 -4 17c-12 48.7 -34.8 92 -68.5 130
s-74.2 66.3 -121.5 85c-10 4 -16 7.7 -18 11c0 8.7 6 14.3 18 17c47.3 18.7 87.8 47
121.5 85s56.5 81.3 68.5 130c0.7 2 1.3 5 2 9s1.2 6.7 1.5 8c0.3 1.3 1 3.3 2 6
s2.2 4.5 3.5 5.5c1.3 1 3.3 1.8 6 2.5s6 1 10 1c14 0 21 -3.7 21 -11
c0 -2 -2 -10.3 -6 -25c-20 -79.3 -65 -146.7 -135 -202l-3 -3h399890z
M100 620v40h399900v-40z M0 241v40h399900v-40zM0 241v40h399900v-40z`, rightarrowabovebar: `M0 241v40h399891c-47.3 35.3-84 78-110 128-16.7 32
-27.7 63.7-33 95 0 1.3-.2 2.7-.5 4-.3 1.3-.5 2.3-.5 3 0 7.3 6.7 11 20 11 8 0
13.2-.8 15.5-2.5 2.3-1.7 4.2-5.5 5.5-11.5 2-13.3 5.7-27 11-41 14.7-44.7 39
-84.5 73-119.5s73.7-60.2 119-75.5c6-2 9-5.7 9-11s-3-9-9-11c-45.3-15.3-85-40.5
-119-75.5s-58.3-74.8-73-119.5c-4.7-14-8.3-27.3-11-40-1.3-6.7-3.2-10.8-5.5
-12.5-2.3-1.7-7.5-2.5-15.5-2.5-14 0-21 3.7-21 11 0 2 2 10.3 6 25 20.7 83.3 67
151.7 139 205zm96 379h399894v40H0zm0 0h399904v40H0z`, baraboveshortleftharpoon: `M507,435c-4,4,-6.3,8.7,-7,14c0,5.3,0.7,9,2,11
c1.3,2,5.3,5.3,12,10c90.7,54,156,130,196,228c3.3,10.7,6.3,16.3,9,17
c2,0.7,5,1,9,1c0,0,5,0,5,0c10.7,0,16.7,-2,18,-6c2,-2.7,1,-9.7,-3,-21
c-32,-87.3,-82.7,-157.7,-152,-211c0,0,-3,-3,-3,-3l399351,0l0,-40
c-398570,0,-399437,0,-399437,0z M593 435 v40 H399500 v-40z
M0 281 v-40 H399908 v40z M0 281 v-40 H399908 v40z`, rightharpoonaboveshortbar: `M0,241 l0,40c399126,0,399993,0,399993,0
c4.7,-4.7,7,-9.3,7,-14c0,-9.3,-3.7,-15.3,-11,-18c-92.7,-56.7,-159,-133.7,-199,
-231c-3.3,-9.3,-6,-14.7,-8,-16c-2,-1.3,-7,-2,-15,-2c-10.7,0,-16.7,2,-18,6
c-2,2.7,-1,9.7,3,21c15.3,42,36.7,81.8,64,119.5c27.3,37.7,58,69.2,92,94.5z
M0 241 v40 H399908 v-40z M0 475 v-40 H399500 v40z M0 475 v-40 H399500 v40z`, shortbaraboveleftharpoon: `M7,435c-4,4,-6.3,8.7,-7,14c0,5.3,0.7,9,2,11
c1.3,2,5.3,5.3,12,10c90.7,54,156,130,196,228c3.3,10.7,6.3,16.3,9,17c2,0.7,5,1,9,
1c0,0,5,0,5,0c10.7,0,16.7,-2,18,-6c2,-2.7,1,-9.7,-3,-21c-32,-87.3,-82.7,-157.7,
-152,-211c0,0,-3,-3,-3,-3l399907,0l0,-40c-399126,0,-399993,0,-399993,0z
M93 435 v40 H400000 v-40z M500 241 v40 H400000 v-40z M500 241 v40 H400000 v-40z`, shortrightharpoonabovebar: `M53,241l0,40c398570,0,399437,0,399437,0
c4.7,-4.7,7,-9.3,7,-14c0,-9.3,-3.7,-15.3,-11,-18c-92.7,-56.7,-159,-133.7,-199,
-231c-3.3,-9.3,-6,-14.7,-8,-16c-2,-1.3,-7,-2,-15,-2c-10.7,0,-16.7,2,-18,6
c-2,2.7,-1,9.7,3,21c15.3,42,36.7,81.8,64,119.5c27.3,37.7,58,69.2,92,94.5z
M500 241 v40 H399408 v-40z M500 435 v40 H400000 v-40z` }, Ks = function(e, t) {
  switch (e) {
    case "lbrack":
      return "M403 1759 V84 H666 V0 H319 V1759 v" + t + ` v1759 v84 h347 v-84
H403z M403 1759 V0 H319 V1759 v` + t + " v1759 v84 h84z";
    case "rbrack":
      return "M347 1759 V0 H0 V84 H263 V1759 v" + t + ` v1759 H0 v84 H347z
M347 1759 V0 H263 V1759 v` + t + " v1759 h84z";
    case "vert":
      return "M145 15 v585 v" + t + ` v585 c2.667,10,9.667,15,21,15
c10,0,16.667,-5,20,-15 v-585 v` + -t + ` v-585 c-2.667,-10,-9.667,-15,-21,-15
c-10,0,-16.667,5,-20,15z M188 15 H145 v585 v` + t + " v585 h43z";
    case "doublevert":
      return "M145 15 v585 v" + t + ` v585 c2.667,10,9.667,15,21,15
c10,0,16.667,-5,20,-15 v-585 v` + -t + ` v-585 c-2.667,-10,-9.667,-15,-21,-15
c-10,0,-16.667,5,-20,15z M188 15 H145 v585 v` + t + ` v585 h43z
M367 15 v585 v` + t + ` v585 c2.667,10,9.667,15,21,15
c10,0,16.667,-5,20,-15 v-585 v` + -t + ` v-585 c-2.667,-10,-9.667,-15,-21,-15
c-10,0,-16.667,5,-20,15z M410 15 H367 v585 v` + t + " v585 h43z";
    case "lfloor":
      return "M319 602 V0 H403 V602 v" + t + ` v1715 h263 v84 H319z
MM319 602 V0 H403 V602 v` + t + " v1715 H319z";
    case "rfloor":
      return "M319 602 V0 H403 V602 v" + t + ` v1799 H0 v-84 H319z
MM319 602 V0 H403 V602 v` + t + " v1715 H319z";
    case "lceil":
      return "M403 1759 V84 H666 V0 H319 V1759 v" + t + ` v602 h84z
M403 1759 V0 H319 V1759 v` + t + " v602 h84z";
    case "rceil":
      return "M347 1759 V0 H0 V84 H263 V1759 v" + t + ` v602 h84z
M347 1759 V0 h-84 V1759 v` + t + " v602 h84z";
    case "lparen":
      return `M863,9c0,-2,-2,-5,-6,-9c0,0,-17,0,-17,0c-12.7,0,-19.3,0.3,-20,1
c-5.3,5.3,-10.3,11,-15,17c-242.7,294.7,-395.3,682,-458,1162c-21.3,163.3,-33.3,349,
-36,557 l0,` + (t + 84) + `c0.2,6,0,26,0,60c2,159.3,10,310.7,24,454c53.3,528,210,
949.7,470,1265c4.7,6,9.7,11.7,15,17c0.7,0.7,7,1,19,1c0,0,18,0,18,0c4,-4,6,-7,6,-9
c0,-2.7,-3.3,-8.7,-10,-18c-135.3,-192.7,-235.5,-414.3,-300.5,-665c-65,-250.7,-102.5,
-544.7,-112.5,-882c-2,-104,-3,-167,-3,-189
l0,-` + (t + 92) + `c0,-162.7,5.7,-314,17,-454c20.7,-272,63.7,-513,129,-723c65.3,
-210,155.3,-396.3,270,-559c6.7,-9.3,10,-15.3,10,-18z`;
    case "rparen":
      return `M76,0c-16.7,0,-25,3,-25,9c0,2,2,6.3,6,13c21.3,28.7,42.3,60.3,
63,95c96.7,156.7,172.8,332.5,228.5,527.5c55.7,195,92.8,416.5,111.5,664.5
c11.3,139.3,17,290.7,17,454c0,28,1.7,43,3.3,45l0,` + (t + 9) + `
c-3,4,-3.3,16.7,-3.3,38c0,162,-5.7,313.7,-17,455c-18.7,248,-55.8,469.3,-111.5,664
c-55.7,194.7,-131.8,370.3,-228.5,527c-20.7,34.7,-41.7,66.3,-63,95c-2,3.3,-4,7,-6,11
c0,7.3,5.7,11,17,11c0,0,11,0,11,0c9.3,0,14.3,-0.3,15,-1c5.3,-5.3,10.3,-11,15,-17
c242.7,-294.7,395.3,-681.7,458,-1161c21.3,-164.7,33.3,-350.7,36,-558
l0,-` + (t + 144) + `c-2,-159.3,-10,-310.7,-24,-454c-53.3,-528,-210,-949.7,
-470,-1265c-4.7,-6,-9.7,-11.7,-15,-17c-0.7,-0.7,-6.7,-1,-18,-1z`;
    default:
      throw new Error("Unknown stretchy delimiter.");
  }
};
function Qs(r) {
  return "toText" in r;
}
class Lt {
  constructor(e) {
    this.children = void 0, this.classes = void 0, this.height = void 0, this.depth = void 0, this.maxFontSize = void 0, this.style = void 0, this.children = e, this.classes = [], this.height = 0, this.depth = 0, this.maxFontSize = 0, this.style = {};
  }
  hasClass(e) {
    return this.classes.includes(e);
  }
  toNode() {
    for (var e = document.createDocumentFragment(), t = 0; t < this.children.length; t++) e.appendChild(this.children[t].toNode());
    return e;
  }
  toMarkup() {
    for (var e = "", t = 0; t < this.children.length; t++) e += this.children[t].toMarkup();
    return e;
  }
  toText() {
    return this.children.map((e) => {
      if (Qs(e)) return e.toText();
      throw new Error("Expected MathDomNode with toText, got " + e.constructor.name);
    }).join("");
  }
}
var br = { pt: 1, mm: 7227 / 2540, cm: 7227 / 254, in: 72.27, bp: 803 / 800, pc: 12, dd: 1238 / 1157, cc: 14856 / 1157, nd: 685 / 642, nc: 1370 / 107, sp: 1 / 65536, px: 803 / 800 }, Js = { ex: true, em: true, mu: true }, La = function(e) {
  return typeof e != "string" && (e = e.unit), e in br || e in Js || e === "ex";
}, J = function(e, t) {
  var n;
  if (e.unit in br) n = br[e.unit] / t.fontMetrics().ptPerEm / t.sizeMultiplier;
  else if (e.unit === "mu") n = t.fontMetrics().cssEmPerMu;
  else {
    var a;
    if (t.style.isTight() ? a = t.havingStyle(t.style.text()) : a = t, e.unit === "ex") n = a.fontMetrics().xHeight;
    else if (e.unit === "em") n = a.fontMetrics().quad;
    else throw new A("Invalid unit: '" + e.unit + "'");
    a !== t && (n *= a.sizeMultiplier / t.sizeMultiplier);
  }
  return Math.min(e.number * n, t.maxSize);
}, z = function(e) {
  return +e.toFixed(4) + "em";
}, it = function(e) {
  return e.filter((t) => t).join(" ");
}, Ur = function(e) {
  var t = "";
  for (var n of Object.keys(e)) {
    var a = e[n];
    a !== void 0 && (t += zs(n) + ":" + a + ";");
  }
  return t;
}, Oa = function(e, t, n) {
  if (this.classes = e || [], this.attributes = {}, this.height = 0, this.depth = 0, this.maxFontSize = 0, this.style = n || {}, t) {
    t.style.isTight() && this.classes.push("mtight");
    var a = t.getColor();
    a && (this.style.color = a);
  }
}, Pa = function(e) {
  var t = document.createElement(e);
  t.className = it(this.classes), Object.assign(t.style, this.style);
  for (var n of Object.keys(this.attributes)) t.setAttribute(n, this.attributes[n]);
  for (var a = 0; a < this.children.length; a++) t.appendChild(this.children[a].toNode());
  return t;
}, el = /[\s"'>/=\x00-\x1f]/, $a = function(e) {
  var t = "<" + e;
  this.classes.length && (t += ' class="' + he(it(this.classes)) + '"');
  var n = Ur(this.style);
  n && (t += ' style="' + he(n) + '"');
  for (var a of Object.keys(this.attributes)) {
    if (el.test(a)) throw new A("Invalid attribute name '" + a + "'");
    t += " " + a + '="' + he(this.attributes[a]) + '"';
  }
  t += ">";
  for (var i = 0; i < this.children.length; i++) t += this.children[i].toMarkup();
  return t += "</" + e + ">", t;
};
class Ot {
  constructor(e, t, n, a) {
    this.children = void 0, this.attributes = void 0, this.classes = void 0, this.height = void 0, this.depth = void 0, this.width = void 0, this.maxFontSize = void 0, this.style = void 0, this.italic = void 0, Oa.call(this, e, n, a), this.children = t || [];
  }
  setAttribute(e, t) {
    this.attributes[e] = t;
  }
  hasClass(e) {
    return this.classes.includes(e);
  }
  toNode() {
    return Pa.call(this, "span");
  }
  toMarkup() {
    return $a.call(this, "span");
  }
}
class B0 {
  constructor(e, t, n, a) {
    this.children = void 0, this.attributes = void 0, this.classes = void 0, this.height = void 0, this.depth = void 0, this.maxFontSize = void 0, this.style = void 0, Oa.call(this, t, a), this.children = n || [], this.setAttribute("href", e);
  }
  setAttribute(e, t) {
    this.attributes[e] = t;
  }
  hasClass(e) {
    return this.classes.includes(e);
  }
  toNode() {
    return Pa.call(this, "a");
  }
  toMarkup() {
    return $a.call(this, "a");
  }
}
class tl {
  constructor(e, t, n) {
    this.src = void 0, this.alt = void 0, this.classes = void 0, this.height = void 0, this.depth = void 0, this.maxFontSize = void 0, this.style = void 0, this.alt = t, this.src = e, this.classes = ["mord"], this.height = 0, this.depth = 0, this.maxFontSize = 0, this.style = n;
  }
  hasClass(e) {
    return this.classes.includes(e);
  }
  toNode() {
    var e = document.createElement("img");
    return e.src = this.src, e.alt = this.alt, e.className = "mord", Object.assign(e.style, this.style), e;
  }
  toMarkup() {
    var e = '<img src="' + he(this.src) + '"' + (' alt="' + he(this.alt) + '"'), t = Ur(this.style);
    return t && (e += ' style="' + he(t) + '"'), e += "'/>", e;
  }
}
var rl = { \u00EE: "\u0131\u0302", \u00EF: "\u0131\u0308", \u00ED: "\u0131\u0301", \u00EC: "\u0131\u0300" };
class Se {
  constructor(e, t, n, a, i, s, l, h) {
    this.text = void 0, this.height = void 0, this.depth = void 0, this.italic = void 0, this.skew = void 0, this.width = void 0, this.maxFontSize = void 0, this.classes = void 0, this.style = void 0, this.text = e, this.height = t || 0, this.depth = n || 0, this.italic = a || 0, this.skew = i || 0, this.width = s || 0, this.classes = l || [], this.style = h || {}, this.maxFontSize = 0;
    var c = Hs(this.text.charCodeAt(0));
    c && this.classes.push(c + "_fallback"), /[îïíì]/.test(this.text) && (this.text = rl[this.text]);
  }
  hasClass(e) {
    return this.classes.includes(e);
  }
  toNode() {
    var e = document.createTextNode(this.text), t = null;
    return this.italic > 0 && (t = document.createElement("span"), t.style.marginRight = z(this.italic)), this.classes.length > 0 && (t = t || document.createElement("span"), t.className = it(this.classes)), Object.keys(this.style).length > 0 && (t = t || document.createElement("span"), Object.assign(t.style, this.style)), t ? (t.appendChild(e), t) : e;
  }
  toMarkup() {
    var e = false, t = "<span";
    this.classes.length && (e = true, t += ' class="', t += he(it(this.classes)), t += '"');
    var n = "";
    this.italic > 0 && (n += "margin-right:" + z(this.italic) + ";"), n += Ur(this.style), n && (e = true, t += ' style="' + he(n) + '"');
    var a = he(this.text);
    return e ? (t += ">", t += a, t += "</span>", t) : a;
  }
}
class Ue {
  constructor(e, t) {
    this.children = void 0, this.attributes = void 0, this.children = e || [], this.attributes = t || {};
  }
  toNode() {
    var e = "http://www.w3.org/2000/svg", t = document.createElementNS(e, "svg");
    for (var n of Object.keys(this.attributes)) t.setAttribute(n, this.attributes[n]);
    for (var a = 0; a < this.children.length; a++) t.appendChild(this.children[a].toNode());
    return t;
  }
  toMarkup() {
    var e = '<svg xmlns="http://www.w3.org/2000/svg"';
    for (var t of Object.keys(this.attributes)) e += " " + t + '="' + he(this.attributes[t]) + '"';
    e += ">";
    for (var n = 0; n < this.children.length; n++) e += this.children[n].toMarkup();
    return e += "</svg>", e;
  }
}
class st {
  constructor(e, t) {
    this.pathName = void 0, this.alternate = void 0, this.pathName = e, this.alternate = t;
  }
  toNode() {
    var e = "http://www.w3.org/2000/svg", t = document.createElementNS(e, "path");
    return this.alternate ? t.setAttribute("d", this.alternate) : t.setAttribute("d", qn[this.pathName]), t;
  }
  toMarkup() {
    return this.alternate ? '<path d="' + he(this.alternate) + '"/>' : '<path d="' + he(qn[this.pathName]) + '"/>';
  }
}
class yr {
  constructor(e) {
    this.attributes = void 0, this.attributes = e || {};
  }
  toNode() {
    var e = "http://www.w3.org/2000/svg", t = document.createElementNS(e, "line");
    for (var n of Object.keys(this.attributes)) t.setAttribute(n, this.attributes[n]);
    return t;
  }
  toMarkup() {
    var e = "<line";
    for (var t of Object.keys(this.attributes)) e += " " + t + '="' + he(this.attributes[t]) + '"';
    return e += "/>", e;
  }
}
function nl(r) {
  if (r instanceof Se) return r;
  throw new Error("Expected symbolNode but got " + String(r) + ".");
}
function al(r) {
  if (r instanceof Ot) return r;
  throw new Error("Expected span<HtmlDomNode> but got " + String(r) + ".");
}
var il = (r) => r instanceof Ot || r instanceof B0 || r instanceof Lt, Re = { "AMS-Regular": { 32: [0, 0, 0, 0, 0.25], 65: [0, 0.68889, 0, 0, 0.72222], 66: [0, 0.68889, 0, 0, 0.66667], 67: [0, 0.68889, 0, 0, 0.72222], 68: [0, 0.68889, 0, 0, 0.72222], 69: [0, 0.68889, 0, 0, 0.66667], 70: [0, 0.68889, 0, 0, 0.61111], 71: [0, 0.68889, 0, 0, 0.77778], 72: [0, 0.68889, 0, 0, 0.77778], 73: [0, 0.68889, 0, 0, 0.38889], 74: [0.16667, 0.68889, 0, 0, 0.5], 75: [0, 0.68889, 0, 0, 0.77778], 76: [0, 0.68889, 0, 0, 0.66667], 77: [0, 0.68889, 0, 0, 0.94445], 78: [0, 0.68889, 0, 0, 0.72222], 79: [0.16667, 0.68889, 0, 0, 0.77778], 80: [0, 0.68889, 0, 0, 0.61111], 81: [0.16667, 0.68889, 0, 0, 0.77778], 82: [0, 0.68889, 0, 0, 0.72222], 83: [0, 0.68889, 0, 0, 0.55556], 84: [0, 0.68889, 0, 0, 0.66667], 85: [0, 0.68889, 0, 0, 0.72222], 86: [0, 0.68889, 0, 0, 0.72222], 87: [0, 0.68889, 0, 0, 1], 88: [0, 0.68889, 0, 0, 0.72222], 89: [0, 0.68889, 0, 0, 0.72222], 90: [0, 0.68889, 0, 0, 0.66667], 107: [0, 0.68889, 0, 0, 0.55556], 160: [0, 0, 0, 0, 0.25], 165: [0, 0.675, 0.025, 0, 0.75], 174: [0.15559, 0.69224, 0, 0, 0.94666], 240: [0, 0.68889, 0, 0, 0.55556], 295: [0, 0.68889, 0, 0, 0.54028], 710: [0, 0.825, 0, 0, 2.33334], 732: [0, 0.9, 0, 0, 2.33334], 770: [0, 0.825, 0, 0, 2.33334], 771: [0, 0.9, 0, 0, 2.33334], 989: [0.08167, 0.58167, 0, 0, 0.77778], 1008: [0, 0.43056, 0.04028, 0, 0.66667], 8245: [0, 0.54986, 0, 0, 0.275], 8463: [0, 0.68889, 0, 0, 0.54028], 8487: [0, 0.68889, 0, 0, 0.72222], 8498: [0, 0.68889, 0, 0, 0.55556], 8502: [0, 0.68889, 0, 0, 0.66667], 8503: [0, 0.68889, 0, 0, 0.44445], 8504: [0, 0.68889, 0, 0, 0.66667], 8513: [0, 0.68889, 0, 0, 0.63889], 8592: [-0.03598, 0.46402, 0, 0, 0.5], 8594: [-0.03598, 0.46402, 0, 0, 0.5], 8602: [-0.13313, 0.36687, 0, 0, 1], 8603: [-0.13313, 0.36687, 0, 0, 1], 8606: [0.01354, 0.52239, 0, 0, 1], 8608: [0.01354, 0.52239, 0, 0, 1], 8610: [0.01354, 0.52239, 0, 0, 1.11111], 8611: [0.01354, 0.52239, 0, 0, 1.11111], 8619: [0, 0.54986, 0, 0, 1], 8620: [0, 0.54986, 0, 0, 1], 8621: [-0.13313, 0.37788, 0, 0, 1.38889], 8622: [-0.13313, 0.36687, 0, 0, 1], 8624: [0, 0.69224, 0, 0, 0.5], 8625: [0, 0.69224, 0, 0, 0.5], 8630: [0, 0.43056, 0, 0, 1], 8631: [0, 0.43056, 0, 0, 1], 8634: [0.08198, 0.58198, 0, 0, 0.77778], 8635: [0.08198, 0.58198, 0, 0, 0.77778], 8638: [0.19444, 0.69224, 0, 0, 0.41667], 8639: [0.19444, 0.69224, 0, 0, 0.41667], 8642: [0.19444, 0.69224, 0, 0, 0.41667], 8643: [0.19444, 0.69224, 0, 0, 0.41667], 8644: [0.1808, 0.675, 0, 0, 1], 8646: [0.1808, 0.675, 0, 0, 1], 8647: [0.1808, 0.675, 0, 0, 1], 8648: [0.19444, 0.69224, 0, 0, 0.83334], 8649: [0.1808, 0.675, 0, 0, 1], 8650: [0.19444, 0.69224, 0, 0, 0.83334], 8651: [0.01354, 0.52239, 0, 0, 1], 8652: [0.01354, 0.52239, 0, 0, 1], 8653: [-0.13313, 0.36687, 0, 0, 1], 8654: [-0.13313, 0.36687, 0, 0, 1], 8655: [-0.13313, 0.36687, 0, 0, 1], 8666: [0.13667, 0.63667, 0, 0, 1], 8667: [0.13667, 0.63667, 0, 0, 1], 8669: [-0.13313, 0.37788, 0, 0, 1], 8672: [-0.064, 0.437, 0, 0, 1.334], 8674: [-0.064, 0.437, 0, 0, 1.334], 8705: [0, 0.825, 0, 0, 0.5], 8708: [0, 0.68889, 0, 0, 0.55556], 8709: [0.08167, 0.58167, 0, 0, 0.77778], 8717: [0, 0.43056, 0, 0, 0.42917], 8722: [-0.03598, 0.46402, 0, 0, 0.5], 8724: [0.08198, 0.69224, 0, 0, 0.77778], 8726: [0.08167, 0.58167, 0, 0, 0.77778], 8733: [0, 0.69224, 0, 0, 0.77778], 8736: [0, 0.69224, 0, 0, 0.72222], 8737: [0, 0.69224, 0, 0, 0.72222], 8738: [0.03517, 0.52239, 0, 0, 0.72222], 8739: [0.08167, 0.58167, 0, 0, 0.22222], 8740: [0.25142, 0.74111, 0, 0, 0.27778], 8741: [0.08167, 0.58167, 0, 0, 0.38889], 8742: [0.25142, 0.74111, 0, 0, 0.5], 8756: [0, 0.69224, 0, 0, 0.66667], 8757: [0, 0.69224, 0, 0, 0.66667], 8764: [-0.13313, 0.36687, 0, 0, 0.77778], 8765: [-0.13313, 0.37788, 0, 0, 0.77778], 8769: [-0.13313, 0.36687, 0, 0, 0.77778], 8770: [-0.03625, 0.46375, 0, 0, 0.77778], 8774: [0.30274, 0.79383, 0, 0, 0.77778], 8776: [-0.01688, 0.48312, 0, 0, 0.77778], 8778: [0.08167, 0.58167, 0, 0, 0.77778], 8782: [0.06062, 0.54986, 0, 0, 0.77778], 8783: [0.06062, 0.54986, 0, 0, 0.77778], 8785: [0.08198, 0.58198, 0, 0, 0.77778], 8786: [0.08198, 0.58198, 0, 0, 0.77778], 8787: [0.08198, 0.58198, 0, 0, 0.77778], 8790: [0, 0.69224, 0, 0, 0.77778], 8791: [0.22958, 0.72958, 0, 0, 0.77778], 8796: [0.08198, 0.91667, 0, 0, 0.77778], 8806: [0.25583, 0.75583, 0, 0, 0.77778], 8807: [0.25583, 0.75583, 0, 0, 0.77778], 8808: [0.25142, 0.75726, 0, 0, 0.77778], 8809: [0.25142, 0.75726, 0, 0, 0.77778], 8812: [0.25583, 0.75583, 0, 0, 0.5], 8814: [0.20576, 0.70576, 0, 0, 0.77778], 8815: [0.20576, 0.70576, 0, 0, 0.77778], 8816: [0.30274, 0.79383, 0, 0, 0.77778], 8817: [0.30274, 0.79383, 0, 0, 0.77778], 8818: [0.22958, 0.72958, 0, 0, 0.77778], 8819: [0.22958, 0.72958, 0, 0, 0.77778], 8822: [0.1808, 0.675, 0, 0, 0.77778], 8823: [0.1808, 0.675, 0, 0, 0.77778], 8828: [0.13667, 0.63667, 0, 0, 0.77778], 8829: [0.13667, 0.63667, 0, 0, 0.77778], 8830: [0.22958, 0.72958, 0, 0, 0.77778], 8831: [0.22958, 0.72958, 0, 0, 0.77778], 8832: [0.20576, 0.70576, 0, 0, 0.77778], 8833: [0.20576, 0.70576, 0, 0, 0.77778], 8840: [0.30274, 0.79383, 0, 0, 0.77778], 8841: [0.30274, 0.79383, 0, 0, 0.77778], 8842: [0.13597, 0.63597, 0, 0, 0.77778], 8843: [0.13597, 0.63597, 0, 0, 0.77778], 8847: [0.03517, 0.54986, 0, 0, 0.77778], 8848: [0.03517, 0.54986, 0, 0, 0.77778], 8858: [0.08198, 0.58198, 0, 0, 0.77778], 8859: [0.08198, 0.58198, 0, 0, 0.77778], 8861: [0.08198, 0.58198, 0, 0, 0.77778], 8862: [0, 0.675, 0, 0, 0.77778], 8863: [0, 0.675, 0, 0, 0.77778], 8864: [0, 0.675, 0, 0, 0.77778], 8865: [0, 0.675, 0, 0, 0.77778], 8872: [0, 0.69224, 0, 0, 0.61111], 8873: [0, 0.69224, 0, 0, 0.72222], 8874: [0, 0.69224, 0, 0, 0.88889], 8876: [0, 0.68889, 0, 0, 0.61111], 8877: [0, 0.68889, 0, 0, 0.61111], 8878: [0, 0.68889, 0, 0, 0.72222], 8879: [0, 0.68889, 0, 0, 0.72222], 8882: [0.03517, 0.54986, 0, 0, 0.77778], 8883: [0.03517, 0.54986, 0, 0, 0.77778], 8884: [0.13667, 0.63667, 0, 0, 0.77778], 8885: [0.13667, 0.63667, 0, 0, 0.77778], 8888: [0, 0.54986, 0, 0, 1.11111], 8890: [0.19444, 0.43056, 0, 0, 0.55556], 8891: [0.19444, 0.69224, 0, 0, 0.61111], 8892: [0.19444, 0.69224, 0, 0, 0.61111], 8901: [0, 0.54986, 0, 0, 0.27778], 8903: [0.08167, 0.58167, 0, 0, 0.77778], 8905: [0.08167, 0.58167, 0, 0, 0.77778], 8906: [0.08167, 0.58167, 0, 0, 0.77778], 8907: [0, 0.69224, 0, 0, 0.77778], 8908: [0, 0.69224, 0, 0, 0.77778], 8909: [-0.03598, 0.46402, 0, 0, 0.77778], 8910: [0, 0.54986, 0, 0, 0.76042], 8911: [0, 0.54986, 0, 0, 0.76042], 8912: [0.03517, 0.54986, 0, 0, 0.77778], 8913: [0.03517, 0.54986, 0, 0, 0.77778], 8914: [0, 0.54986, 0, 0, 0.66667], 8915: [0, 0.54986, 0, 0, 0.66667], 8916: [0, 0.69224, 0, 0, 0.66667], 8918: [0.0391, 0.5391, 0, 0, 0.77778], 8919: [0.0391, 0.5391, 0, 0, 0.77778], 8920: [0.03517, 0.54986, 0, 0, 1.33334], 8921: [0.03517, 0.54986, 0, 0, 1.33334], 8922: [0.38569, 0.88569, 0, 0, 0.77778], 8923: [0.38569, 0.88569, 0, 0, 0.77778], 8926: [0.13667, 0.63667, 0, 0, 0.77778], 8927: [0.13667, 0.63667, 0, 0, 0.77778], 8928: [0.30274, 0.79383, 0, 0, 0.77778], 8929: [0.30274, 0.79383, 0, 0, 0.77778], 8934: [0.23222, 0.74111, 0, 0, 0.77778], 8935: [0.23222, 0.74111, 0, 0, 0.77778], 8936: [0.23222, 0.74111, 0, 0, 0.77778], 8937: [0.23222, 0.74111, 0, 0, 0.77778], 8938: [0.20576, 0.70576, 0, 0, 0.77778], 8939: [0.20576, 0.70576, 0, 0, 0.77778], 8940: [0.30274, 0.79383, 0, 0, 0.77778], 8941: [0.30274, 0.79383, 0, 0, 0.77778], 8994: [0.19444, 0.69224, 0, 0, 0.77778], 8995: [0.19444, 0.69224, 0, 0, 0.77778], 9416: [0.15559, 0.69224, 0, 0, 0.90222], 9484: [0, 0.69224, 0, 0, 0.5], 9488: [0, 0.69224, 0, 0, 0.5], 9492: [0, 0.37788, 0, 0, 0.5], 9496: [0, 0.37788, 0, 0, 0.5], 9585: [0.19444, 0.68889, 0, 0, 0.88889], 9586: [0.19444, 0.74111, 0, 0, 0.88889], 9632: [0, 0.675, 0, 0, 0.77778], 9633: [0, 0.675, 0, 0, 0.77778], 9650: [0, 0.54986, 0, 0, 0.72222], 9651: [0, 0.54986, 0, 0, 0.72222], 9654: [0.03517, 0.54986, 0, 0, 0.77778], 9660: [0, 0.54986, 0, 0, 0.72222], 9661: [0, 0.54986, 0, 0, 0.72222], 9664: [0.03517, 0.54986, 0, 0, 0.77778], 9674: [0.11111, 0.69224, 0, 0, 0.66667], 9733: [0.19444, 0.69224, 0, 0, 0.94445], 10003: [0, 0.69224, 0, 0, 0.83334], 10016: [0, 0.69224, 0, 0, 0.83334], 10731: [0.11111, 0.69224, 0, 0, 0.66667], 10846: [0.19444, 0.75583, 0, 0, 0.61111], 10877: [0.13667, 0.63667, 0, 0, 0.77778], 10878: [0.13667, 0.63667, 0, 0, 0.77778], 10885: [0.25583, 0.75583, 0, 0, 0.77778], 10886: [0.25583, 0.75583, 0, 0, 0.77778], 10887: [0.13597, 0.63597, 0, 0, 0.77778], 10888: [0.13597, 0.63597, 0, 0, 0.77778], 10889: [0.26167, 0.75726, 0, 0, 0.77778], 10890: [0.26167, 0.75726, 0, 0, 0.77778], 10891: [0.48256, 0.98256, 0, 0, 0.77778], 10892: [0.48256, 0.98256, 0, 0, 0.77778], 10901: [0.13667, 0.63667, 0, 0, 0.77778], 10902: [0.13667, 0.63667, 0, 0, 0.77778], 10933: [0.25142, 0.75726, 0, 0, 0.77778], 10934: [0.25142, 0.75726, 0, 0, 0.77778], 10935: [0.26167, 0.75726, 0, 0, 0.77778], 10936: [0.26167, 0.75726, 0, 0, 0.77778], 10937: [0.26167, 0.75726, 0, 0, 0.77778], 10938: [0.26167, 0.75726, 0, 0, 0.77778], 10949: [0.25583, 0.75583, 0, 0, 0.77778], 10950: [0.25583, 0.75583, 0, 0, 0.77778], 10955: [0.28481, 0.79383, 0, 0, 0.77778], 10956: [0.28481, 0.79383, 0, 0, 0.77778], 57350: [0.08167, 0.58167, 0, 0, 0.22222], 57351: [0.08167, 0.58167, 0, 0, 0.38889], 57352: [0.08167, 0.58167, 0, 0, 0.77778], 57353: [0, 0.43056, 0.04028, 0, 0.66667], 57356: [0.25142, 0.75726, 0, 0, 0.77778], 57357: [0.25142, 0.75726, 0, 0, 0.77778], 57358: [0.41951, 0.91951, 0, 0, 0.77778], 57359: [0.30274, 0.79383, 0, 0, 0.77778], 57360: [0.30274, 0.79383, 0, 0, 0.77778], 57361: [0.41951, 0.91951, 0, 0, 0.77778], 57366: [0.25142, 0.75726, 0, 0, 0.77778], 57367: [0.25142, 0.75726, 0, 0, 0.77778], 57368: [0.25142, 0.75726, 0, 0, 0.77778], 57369: [0.25142, 0.75726, 0, 0, 0.77778], 57370: [0.13597, 0.63597, 0, 0, 0.77778], 57371: [0.13597, 0.63597, 0, 0, 0.77778] }, "Caligraphic-Regular": { 32: [0, 0, 0, 0, 0.25], 65: [0, 0.68333, 0, 0.19445, 0.79847], 66: [0, 0.68333, 0.03041, 0.13889, 0.65681], 67: [0, 0.68333, 0.05834, 0.13889, 0.52653], 68: [0, 0.68333, 0.02778, 0.08334, 0.77139], 69: [0, 0.68333, 0.08944, 0.11111, 0.52778], 70: [0, 0.68333, 0.09931, 0.11111, 0.71875], 71: [0.09722, 0.68333, 0.0593, 0.11111, 0.59487], 72: [0, 0.68333, 965e-5, 0.11111, 0.84452], 73: [0, 0.68333, 0.07382, 0, 0.54452], 74: [0.09722, 0.68333, 0.18472, 0.16667, 0.67778], 75: [0, 0.68333, 0.01445, 0.05556, 0.76195], 76: [0, 0.68333, 0, 0.13889, 0.68972], 77: [0, 0.68333, 0, 0.13889, 1.2009], 78: [0, 0.68333, 0.14736, 0.08334, 0.82049], 79: [0, 0.68333, 0.02778, 0.11111, 0.79611], 80: [0, 0.68333, 0.08222, 0.08334, 0.69556], 81: [0.09722, 0.68333, 0, 0.11111, 0.81667], 82: [0, 0.68333, 0, 0.08334, 0.8475], 83: [0, 0.68333, 0.075, 0.13889, 0.60556], 84: [0, 0.68333, 0.25417, 0, 0.54464], 85: [0, 0.68333, 0.09931, 0.08334, 0.62583], 86: [0, 0.68333, 0.08222, 0, 0.61278], 87: [0, 0.68333, 0.08222, 0.08334, 0.98778], 88: [0, 0.68333, 0.14643, 0.13889, 0.7133], 89: [0.09722, 0.68333, 0.08222, 0.08334, 0.66834], 90: [0, 0.68333, 0.07944, 0.13889, 0.72473], 160: [0, 0, 0, 0, 0.25] }, "Fraktur-Regular": { 32: [0, 0, 0, 0, 0.25], 33: [0, 0.69141, 0, 0, 0.29574], 34: [0, 0.69141, 0, 0, 0.21471], 38: [0, 0.69141, 0, 0, 0.73786], 39: [0, 0.69141, 0, 0, 0.21201], 40: [0.24982, 0.74947, 0, 0, 0.38865], 41: [0.24982, 0.74947, 0, 0, 0.38865], 42: [0, 0.62119, 0, 0, 0.27764], 43: [0.08319, 0.58283, 0, 0, 0.75623], 44: [0, 0.10803, 0, 0, 0.27764], 45: [0.08319, 0.58283, 0, 0, 0.75623], 46: [0, 0.10803, 0, 0, 0.27764], 47: [0.24982, 0.74947, 0, 0, 0.50181], 48: [0, 0.47534, 0, 0, 0.50181], 49: [0, 0.47534, 0, 0, 0.50181], 50: [0, 0.47534, 0, 0, 0.50181], 51: [0.18906, 0.47534, 0, 0, 0.50181], 52: [0.18906, 0.47534, 0, 0, 0.50181], 53: [0.18906, 0.47534, 0, 0, 0.50181], 54: [0, 0.69141, 0, 0, 0.50181], 55: [0.18906, 0.47534, 0, 0, 0.50181], 56: [0, 0.69141, 0, 0, 0.50181], 57: [0.18906, 0.47534, 0, 0, 0.50181], 58: [0, 0.47534, 0, 0, 0.21606], 59: [0.12604, 0.47534, 0, 0, 0.21606], 61: [-0.13099, 0.36866, 0, 0, 0.75623], 63: [0, 0.69141, 0, 0, 0.36245], 65: [0, 0.69141, 0, 0, 0.7176], 66: [0, 0.69141, 0, 0, 0.88397], 67: [0, 0.69141, 0, 0, 0.61254], 68: [0, 0.69141, 0, 0, 0.83158], 69: [0, 0.69141, 0, 0, 0.66278], 70: [0.12604, 0.69141, 0, 0, 0.61119], 71: [0, 0.69141, 0, 0, 0.78539], 72: [0.06302, 0.69141, 0, 0, 0.7203], 73: [0, 0.69141, 0, 0, 0.55448], 74: [0.12604, 0.69141, 0, 0, 0.55231], 75: [0, 0.69141, 0, 0, 0.66845], 76: [0, 0.69141, 0, 0, 0.66602], 77: [0, 0.69141, 0, 0, 1.04953], 78: [0, 0.69141, 0, 0, 0.83212], 79: [0, 0.69141, 0, 0, 0.82699], 80: [0.18906, 0.69141, 0, 0, 0.82753], 81: [0.03781, 0.69141, 0, 0, 0.82699], 82: [0, 0.69141, 0, 0, 0.82807], 83: [0, 0.69141, 0, 0, 0.82861], 84: [0, 0.69141, 0, 0, 0.66899], 85: [0, 0.69141, 0, 0, 0.64576], 86: [0, 0.69141, 0, 0, 0.83131], 87: [0, 0.69141, 0, 0, 1.04602], 88: [0, 0.69141, 0, 0, 0.71922], 89: [0.18906, 0.69141, 0, 0, 0.83293], 90: [0.12604, 0.69141, 0, 0, 0.60201], 91: [0.24982, 0.74947, 0, 0, 0.27764], 93: [0.24982, 0.74947, 0, 0, 0.27764], 94: [0, 0.69141, 0, 0, 0.49965], 97: [0, 0.47534, 0, 0, 0.50046], 98: [0, 0.69141, 0, 0, 0.51315], 99: [0, 0.47534, 0, 0, 0.38946], 100: [0, 0.62119, 0, 0, 0.49857], 101: [0, 0.47534, 0, 0, 0.40053], 102: [0.18906, 0.69141, 0, 0, 0.32626], 103: [0.18906, 0.47534, 0, 0, 0.5037], 104: [0.18906, 0.69141, 0, 0, 0.52126], 105: [0, 0.69141, 0, 0, 0.27899], 106: [0, 0.69141, 0, 0, 0.28088], 107: [0, 0.69141, 0, 0, 0.38946], 108: [0, 0.69141, 0, 0, 0.27953], 109: [0, 0.47534, 0, 0, 0.76676], 110: [0, 0.47534, 0, 0, 0.52666], 111: [0, 0.47534, 0, 0, 0.48885], 112: [0.18906, 0.52396, 0, 0, 0.50046], 113: [0.18906, 0.47534, 0, 0, 0.48912], 114: [0, 0.47534, 0, 0, 0.38919], 115: [0, 0.47534, 0, 0, 0.44266], 116: [0, 0.62119, 0, 0, 0.33301], 117: [0, 0.47534, 0, 0, 0.5172], 118: [0, 0.52396, 0, 0, 0.5118], 119: [0, 0.52396, 0, 0, 0.77351], 120: [0.18906, 0.47534, 0, 0, 0.38865], 121: [0.18906, 0.47534, 0, 0, 0.49884], 122: [0.18906, 0.47534, 0, 0, 0.39054], 160: [0, 0, 0, 0, 0.25], 8216: [0, 0.69141, 0, 0, 0.21471], 8217: [0, 0.69141, 0, 0, 0.21471], 58112: [0, 0.62119, 0, 0, 0.49749], 58113: [0, 0.62119, 0, 0, 0.4983], 58114: [0.18906, 0.69141, 0, 0, 0.33328], 58115: [0.18906, 0.69141, 0, 0, 0.32923], 58116: [0.18906, 0.47534, 0, 0, 0.50343], 58117: [0, 0.69141, 0, 0, 0.33301], 58118: [0, 0.62119, 0, 0, 0.33409], 58119: [0, 0.47534, 0, 0, 0.50073] }, "Main-Bold": { 32: [0, 0, 0, 0, 0.25], 33: [0, 0.69444, 0, 0, 0.35], 34: [0, 0.69444, 0, 0, 0.60278], 35: [0.19444, 0.69444, 0, 0, 0.95833], 36: [0.05556, 0.75, 0, 0, 0.575], 37: [0.05556, 0.75, 0, 0, 0.95833], 38: [0, 0.69444, 0, 0, 0.89444], 39: [0, 0.69444, 0, 0, 0.31944], 40: [0.25, 0.75, 0, 0, 0.44722], 41: [0.25, 0.75, 0, 0, 0.44722], 42: [0, 0.75, 0, 0, 0.575], 43: [0.13333, 0.63333, 0, 0, 0.89444], 44: [0.19444, 0.15556, 0, 0, 0.31944], 45: [0, 0.44444, 0, 0, 0.38333], 46: [0, 0.15556, 0, 0, 0.31944], 47: [0.25, 0.75, 0, 0, 0.575], 48: [0, 0.64444, 0, 0, 0.575], 49: [0, 0.64444, 0, 0, 0.575], 50: [0, 0.64444, 0, 0, 0.575], 51: [0, 0.64444, 0, 0, 0.575], 52: [0, 0.64444, 0, 0, 0.575], 53: [0, 0.64444, 0, 0, 0.575], 54: [0, 0.64444, 0, 0, 0.575], 55: [0, 0.64444, 0, 0, 0.575], 56: [0, 0.64444, 0, 0, 0.575], 57: [0, 0.64444, 0, 0, 0.575], 58: [0, 0.44444, 0, 0, 0.31944], 59: [0.19444, 0.44444, 0, 0, 0.31944], 60: [0.08556, 0.58556, 0, 0, 0.89444], 61: [-0.10889, 0.39111, 0, 0, 0.89444], 62: [0.08556, 0.58556, 0, 0, 0.89444], 63: [0, 0.69444, 0, 0, 0.54305], 64: [0, 0.69444, 0, 0, 0.89444], 65: [0, 0.68611, 0, 0, 0.86944], 66: [0, 0.68611, 0, 0, 0.81805], 67: [0, 0.68611, 0, 0, 0.83055], 68: [0, 0.68611, 0, 0, 0.88194], 69: [0, 0.68611, 0, 0, 0.75555], 70: [0, 0.68611, 0, 0, 0.72361], 71: [0, 0.68611, 0, 0, 0.90416], 72: [0, 0.68611, 0, 0, 0.9], 73: [0, 0.68611, 0, 0, 0.43611], 74: [0, 0.68611, 0, 0, 0.59444], 75: [0, 0.68611, 0, 0, 0.90138], 76: [0, 0.68611, 0, 0, 0.69166], 77: [0, 0.68611, 0, 0, 1.09166], 78: [0, 0.68611, 0, 0, 0.9], 79: [0, 0.68611, 0, 0, 0.86388], 80: [0, 0.68611, 0, 0, 0.78611], 81: [0.19444, 0.68611, 0, 0, 0.86388], 82: [0, 0.68611, 0, 0, 0.8625], 83: [0, 0.68611, 0, 0, 0.63889], 84: [0, 0.68611, 0, 0, 0.8], 85: [0, 0.68611, 0, 0, 0.88472], 86: [0, 0.68611, 0.01597, 0, 0.86944], 87: [0, 0.68611, 0.01597, 0, 1.18888], 88: [0, 0.68611, 0, 0, 0.86944], 89: [0, 0.68611, 0.02875, 0, 0.86944], 90: [0, 0.68611, 0, 0, 0.70277], 91: [0.25, 0.75, 0, 0, 0.31944], 92: [0.25, 0.75, 0, 0, 0.575], 93: [0.25, 0.75, 0, 0, 0.31944], 94: [0, 0.69444, 0, 0, 0.575], 95: [0.31, 0.13444, 0.03194, 0, 0.575], 97: [0, 0.44444, 0, 0, 0.55902], 98: [0, 0.69444, 0, 0, 0.63889], 99: [0, 0.44444, 0, 0, 0.51111], 100: [0, 0.69444, 0, 0, 0.63889], 101: [0, 0.44444, 0, 0, 0.52708], 102: [0, 0.69444, 0.10903, 0, 0.35139], 103: [0.19444, 0.44444, 0.01597, 0, 0.575], 104: [0, 0.69444, 0, 0, 0.63889], 105: [0, 0.69444, 0, 0, 0.31944], 106: [0.19444, 0.69444, 0, 0, 0.35139], 107: [0, 0.69444, 0, 0, 0.60694], 108: [0, 0.69444, 0, 0, 0.31944], 109: [0, 0.44444, 0, 0, 0.95833], 110: [0, 0.44444, 0, 0, 0.63889], 111: [0, 0.44444, 0, 0, 0.575], 112: [0.19444, 0.44444, 0, 0, 0.63889], 113: [0.19444, 0.44444, 0, 0, 0.60694], 114: [0, 0.44444, 0, 0, 0.47361], 115: [0, 0.44444, 0, 0, 0.45361], 116: [0, 0.63492, 0, 0, 0.44722], 117: [0, 0.44444, 0, 0, 0.63889], 118: [0, 0.44444, 0.01597, 0, 0.60694], 119: [0, 0.44444, 0.01597, 0, 0.83055], 120: [0, 0.44444, 0, 0, 0.60694], 121: [0.19444, 0.44444, 0.01597, 0, 0.60694], 122: [0, 0.44444, 0, 0, 0.51111], 123: [0.25, 0.75, 0, 0, 0.575], 124: [0.25, 0.75, 0, 0, 0.31944], 125: [0.25, 0.75, 0, 0, 0.575], 126: [0.35, 0.34444, 0, 0, 0.575], 160: [0, 0, 0, 0, 0.25], 163: [0, 0.69444, 0, 0, 0.86853], 168: [0, 0.69444, 0, 0, 0.575], 172: [0, 0.44444, 0, 0, 0.76666], 176: [0, 0.69444, 0, 0, 0.86944], 177: [0.13333, 0.63333, 0, 0, 0.89444], 184: [0.17014, 0, 0, 0, 0.51111], 198: [0, 0.68611, 0, 0, 1.04166], 215: [0.13333, 0.63333, 0, 0, 0.89444], 216: [0.04861, 0.73472, 0, 0, 0.89444], 223: [0, 0.69444, 0, 0, 0.59722], 230: [0, 0.44444, 0, 0, 0.83055], 247: [0.13333, 0.63333, 0, 0, 0.89444], 248: [0.09722, 0.54167, 0, 0, 0.575], 305: [0, 0.44444, 0, 0, 0.31944], 338: [0, 0.68611, 0, 0, 1.16944], 339: [0, 0.44444, 0, 0, 0.89444], 567: [0.19444, 0.44444, 0, 0, 0.35139], 710: [0, 0.69444, 0, 0, 0.575], 711: [0, 0.63194, 0, 0, 0.575], 713: [0, 0.59611, 0, 0, 0.575], 714: [0, 0.69444, 0, 0, 0.575], 715: [0, 0.69444, 0, 0, 0.575], 728: [0, 0.69444, 0, 0, 0.575], 729: [0, 0.69444, 0, 0, 0.31944], 730: [0, 0.69444, 0, 0, 0.86944], 732: [0, 0.69444, 0, 0, 0.575], 733: [0, 0.69444, 0, 0, 0.575], 915: [0, 0.68611, 0, 0, 0.69166], 916: [0, 0.68611, 0, 0, 0.95833], 920: [0, 0.68611, 0, 0, 0.89444], 923: [0, 0.68611, 0, 0, 0.80555], 926: [0, 0.68611, 0, 0, 0.76666], 928: [0, 0.68611, 0, 0, 0.9], 931: [0, 0.68611, 0, 0, 0.83055], 933: [0, 0.68611, 0, 0, 0.89444], 934: [0, 0.68611, 0, 0, 0.83055], 936: [0, 0.68611, 0, 0, 0.89444], 937: [0, 0.68611, 0, 0, 0.83055], 8211: [0, 0.44444, 0.03194, 0, 0.575], 8212: [0, 0.44444, 0.03194, 0, 1.14999], 8216: [0, 0.69444, 0, 0, 0.31944], 8217: [0, 0.69444, 0, 0, 0.31944], 8220: [0, 0.69444, 0, 0, 0.60278], 8221: [0, 0.69444, 0, 0, 0.60278], 8224: [0.19444, 0.69444, 0, 0, 0.51111], 8225: [0.19444, 0.69444, 0, 0, 0.51111], 8242: [0, 0.55556, 0, 0, 0.34444], 8407: [0, 0.72444, 0.15486, 0, 0.575], 8463: [0, 0.69444, 0, 0, 0.66759], 8465: [0, 0.69444, 0, 0, 0.83055], 8467: [0, 0.69444, 0, 0, 0.47361], 8472: [0.19444, 0.44444, 0, 0, 0.74027], 8476: [0, 0.69444, 0, 0, 0.83055], 8501: [0, 0.69444, 0, 0, 0.70277], 8592: [-0.10889, 0.39111, 0, 0, 1.14999], 8593: [0.19444, 0.69444, 0, 0, 0.575], 8594: [-0.10889, 0.39111, 0, 0, 1.14999], 8595: [0.19444, 0.69444, 0, 0, 0.575], 8596: [-0.10889, 0.39111, 0, 0, 1.14999], 8597: [0.25, 0.75, 0, 0, 0.575], 8598: [0.19444, 0.69444, 0, 0, 1.14999], 8599: [0.19444, 0.69444, 0, 0, 1.14999], 8600: [0.19444, 0.69444, 0, 0, 1.14999], 8601: [0.19444, 0.69444, 0, 0, 1.14999], 8636: [-0.10889, 0.39111, 0, 0, 1.14999], 8637: [-0.10889, 0.39111, 0, 0, 1.14999], 8640: [-0.10889, 0.39111, 0, 0, 1.14999], 8641: [-0.10889, 0.39111, 0, 0, 1.14999], 8656: [-0.10889, 0.39111, 0, 0, 1.14999], 8657: [0.19444, 0.69444, 0, 0, 0.70277], 8658: [-0.10889, 0.39111, 0, 0, 1.14999], 8659: [0.19444, 0.69444, 0, 0, 0.70277], 8660: [-0.10889, 0.39111, 0, 0, 1.14999], 8661: [0.25, 0.75, 0, 0, 0.70277], 8704: [0, 0.69444, 0, 0, 0.63889], 8706: [0, 0.69444, 0.06389, 0, 0.62847], 8707: [0, 0.69444, 0, 0, 0.63889], 8709: [0.05556, 0.75, 0, 0, 0.575], 8711: [0, 0.68611, 0, 0, 0.95833], 8712: [0.08556, 0.58556, 0, 0, 0.76666], 8715: [0.08556, 0.58556, 0, 0, 0.76666], 8722: [0.13333, 0.63333, 0, 0, 0.89444], 8723: [0.13333, 0.63333, 0, 0, 0.89444], 8725: [0.25, 0.75, 0, 0, 0.575], 8726: [0.25, 0.75, 0, 0, 0.575], 8727: [-0.02778, 0.47222, 0, 0, 0.575], 8728: [-0.02639, 0.47361, 0, 0, 0.575], 8729: [-0.02639, 0.47361, 0, 0, 0.575], 8730: [0.18, 0.82, 0, 0, 0.95833], 8733: [0, 0.44444, 0, 0, 0.89444], 8734: [0, 0.44444, 0, 0, 1.14999], 8736: [0, 0.69224, 0, 0, 0.72222], 8739: [0.25, 0.75, 0, 0, 0.31944], 8741: [0.25, 0.75, 0, 0, 0.575], 8743: [0, 0.55556, 0, 0, 0.76666], 8744: [0, 0.55556, 0, 0, 0.76666], 8745: [0, 0.55556, 0, 0, 0.76666], 8746: [0, 0.55556, 0, 0, 0.76666], 8747: [0.19444, 0.69444, 0.12778, 0, 0.56875], 8764: [-0.10889, 0.39111, 0, 0, 0.89444], 8768: [0.19444, 0.69444, 0, 0, 0.31944], 8771: [222e-5, 0.50222, 0, 0, 0.89444], 8773: [0.027, 0.638, 0, 0, 0.894], 8776: [0.02444, 0.52444, 0, 0, 0.89444], 8781: [222e-5, 0.50222, 0, 0, 0.89444], 8801: [222e-5, 0.50222, 0, 0, 0.89444], 8804: [0.19667, 0.69667, 0, 0, 0.89444], 8805: [0.19667, 0.69667, 0, 0, 0.89444], 8810: [0.08556, 0.58556, 0, 0, 1.14999], 8811: [0.08556, 0.58556, 0, 0, 1.14999], 8826: [0.08556, 0.58556, 0, 0, 0.89444], 8827: [0.08556, 0.58556, 0, 0, 0.89444], 8834: [0.08556, 0.58556, 0, 0, 0.89444], 8835: [0.08556, 0.58556, 0, 0, 0.89444], 8838: [0.19667, 0.69667, 0, 0, 0.89444], 8839: [0.19667, 0.69667, 0, 0, 0.89444], 8846: [0, 0.55556, 0, 0, 0.76666], 8849: [0.19667, 0.69667, 0, 0, 0.89444], 8850: [0.19667, 0.69667, 0, 0, 0.89444], 8851: [0, 0.55556, 0, 0, 0.76666], 8852: [0, 0.55556, 0, 0, 0.76666], 8853: [0.13333, 0.63333, 0, 0, 0.89444], 8854: [0.13333, 0.63333, 0, 0, 0.89444], 8855: [0.13333, 0.63333, 0, 0, 0.89444], 8856: [0.13333, 0.63333, 0, 0, 0.89444], 8857: [0.13333, 0.63333, 0, 0, 0.89444], 8866: [0, 0.69444, 0, 0, 0.70277], 8867: [0, 0.69444, 0, 0, 0.70277], 8868: [0, 0.69444, 0, 0, 0.89444], 8869: [0, 0.69444, 0, 0, 0.89444], 8900: [-0.02639, 0.47361, 0, 0, 0.575], 8901: [-0.02639, 0.47361, 0, 0, 0.31944], 8902: [-0.02778, 0.47222, 0, 0, 0.575], 8968: [0.25, 0.75, 0, 0, 0.51111], 8969: [0.25, 0.75, 0, 0, 0.51111], 8970: [0.25, 0.75, 0, 0, 0.51111], 8971: [0.25, 0.75, 0, 0, 0.51111], 8994: [-0.13889, 0.36111, 0, 0, 1.14999], 8995: [-0.13889, 0.36111, 0, 0, 1.14999], 9651: [0.19444, 0.69444, 0, 0, 1.02222], 9657: [-0.02778, 0.47222, 0, 0, 0.575], 9661: [0.19444, 0.69444, 0, 0, 1.02222], 9667: [-0.02778, 0.47222, 0, 0, 0.575], 9711: [0.19444, 0.69444, 0, 0, 1.14999], 9824: [0.12963, 0.69444, 0, 0, 0.89444], 9825: [0.12963, 0.69444, 0, 0, 0.89444], 9826: [0.12963, 0.69444, 0, 0, 0.89444], 9827: [0.12963, 0.69444, 0, 0, 0.89444], 9837: [0, 0.75, 0, 0, 0.44722], 9838: [0.19444, 0.69444, 0, 0, 0.44722], 9839: [0.19444, 0.69444, 0, 0, 0.44722], 10216: [0.25, 0.75, 0, 0, 0.44722], 10217: [0.25, 0.75, 0, 0, 0.44722], 10815: [0, 0.68611, 0, 0, 0.9], 10927: [0.19667, 0.69667, 0, 0, 0.89444], 10928: [0.19667, 0.69667, 0, 0, 0.89444], 57376: [0.19444, 0.69444, 0, 0, 0] }, "Main-BoldItalic": { 32: [0, 0, 0, 0, 0.25], 33: [0, 0.69444, 0.11417, 0, 0.38611], 34: [0, 0.69444, 0.07939, 0, 0.62055], 35: [0.19444, 0.69444, 0.06833, 0, 0.94444], 37: [0.05556, 0.75, 0.12861, 0, 0.94444], 38: [0, 0.69444, 0.08528, 0, 0.88555], 39: [0, 0.69444, 0.12945, 0, 0.35555], 40: [0.25, 0.75, 0.15806, 0, 0.47333], 41: [0.25, 0.75, 0.03306, 0, 0.47333], 42: [0, 0.75, 0.14333, 0, 0.59111], 43: [0.10333, 0.60333, 0.03306, 0, 0.88555], 44: [0.19444, 0.14722, 0, 0, 0.35555], 45: [0, 0.44444, 0.02611, 0, 0.41444], 46: [0, 0.14722, 0, 0, 0.35555], 47: [0.25, 0.75, 0.15806, 0, 0.59111], 48: [0, 0.64444, 0.13167, 0, 0.59111], 49: [0, 0.64444, 0.13167, 0, 0.59111], 50: [0, 0.64444, 0.13167, 0, 0.59111], 51: [0, 0.64444, 0.13167, 0, 0.59111], 52: [0.19444, 0.64444, 0.13167, 0, 0.59111], 53: [0, 0.64444, 0.13167, 0, 0.59111], 54: [0, 0.64444, 0.13167, 0, 0.59111], 55: [0.19444, 0.64444, 0.13167, 0, 0.59111], 56: [0, 0.64444, 0.13167, 0, 0.59111], 57: [0, 0.64444, 0.13167, 0, 0.59111], 58: [0, 0.44444, 0.06695, 0, 0.35555], 59: [0.19444, 0.44444, 0.06695, 0, 0.35555], 61: [-0.10889, 0.39111, 0.06833, 0, 0.88555], 63: [0, 0.69444, 0.11472, 0, 0.59111], 64: [0, 0.69444, 0.09208, 0, 0.88555], 65: [0, 0.68611, 0, 0, 0.86555], 66: [0, 0.68611, 0.0992, 0, 0.81666], 67: [0, 0.68611, 0.14208, 0, 0.82666], 68: [0, 0.68611, 0.09062, 0, 0.87555], 69: [0, 0.68611, 0.11431, 0, 0.75666], 70: [0, 0.68611, 0.12903, 0, 0.72722], 71: [0, 0.68611, 0.07347, 0, 0.89527], 72: [0, 0.68611, 0.17208, 0, 0.8961], 73: [0, 0.68611, 0.15681, 0, 0.47166], 74: [0, 0.68611, 0.145, 0, 0.61055], 75: [0, 0.68611, 0.14208, 0, 0.89499], 76: [0, 0.68611, 0, 0, 0.69777], 77: [0, 0.68611, 0.17208, 0, 1.07277], 78: [0, 0.68611, 0.17208, 0, 0.8961], 79: [0, 0.68611, 0.09062, 0, 0.85499], 80: [0, 0.68611, 0.0992, 0, 0.78721], 81: [0.19444, 0.68611, 0.09062, 0, 0.85499], 82: [0, 0.68611, 0.02559, 0, 0.85944], 83: [0, 0.68611, 0.11264, 0, 0.64999], 84: [0, 0.68611, 0.12903, 0, 0.7961], 85: [0, 0.68611, 0.17208, 0, 0.88083], 86: [0, 0.68611, 0.18625, 0, 0.86555], 87: [0, 0.68611, 0.18625, 0, 1.15999], 88: [0, 0.68611, 0.15681, 0, 0.86555], 89: [0, 0.68611, 0.19803, 0, 0.86555], 90: [0, 0.68611, 0.14208, 0, 0.70888], 91: [0.25, 0.75, 0.1875, 0, 0.35611], 93: [0.25, 0.75, 0.09972, 0, 0.35611], 94: [0, 0.69444, 0.06709, 0, 0.59111], 95: [0.31, 0.13444, 0.09811, 0, 0.59111], 97: [0, 0.44444, 0.09426, 0, 0.59111], 98: [0, 0.69444, 0.07861, 0, 0.53222], 99: [0, 0.44444, 0.05222, 0, 0.53222], 100: [0, 0.69444, 0.10861, 0, 0.59111], 101: [0, 0.44444, 0.085, 0, 0.53222], 102: [0.19444, 0.69444, 0.21778, 0, 0.4], 103: [0.19444, 0.44444, 0.105, 0, 0.53222], 104: [0, 0.69444, 0.09426, 0, 0.59111], 105: [0, 0.69326, 0.11387, 0, 0.35555], 106: [0.19444, 0.69326, 0.1672, 0, 0.35555], 107: [0, 0.69444, 0.11111, 0, 0.53222], 108: [0, 0.69444, 0.10861, 0, 0.29666], 109: [0, 0.44444, 0.09426, 0, 0.94444], 110: [0, 0.44444, 0.09426, 0, 0.64999], 111: [0, 0.44444, 0.07861, 0, 0.59111], 112: [0.19444, 0.44444, 0.07861, 0, 0.59111], 113: [0.19444, 0.44444, 0.105, 0, 0.53222], 114: [0, 0.44444, 0.11111, 0, 0.50167], 115: [0, 0.44444, 0.08167, 0, 0.48694], 116: [0, 0.63492, 0.09639, 0, 0.385], 117: [0, 0.44444, 0.09426, 0, 0.62055], 118: [0, 0.44444, 0.11111, 0, 0.53222], 119: [0, 0.44444, 0.11111, 0, 0.76777], 120: [0, 0.44444, 0.12583, 0, 0.56055], 121: [0.19444, 0.44444, 0.105, 0, 0.56166], 122: [0, 0.44444, 0.13889, 0, 0.49055], 126: [0.35, 0.34444, 0.11472, 0, 0.59111], 160: [0, 0, 0, 0, 0.25], 168: [0, 0.69444, 0.11473, 0, 0.59111], 176: [0, 0.69444, 0, 0, 0.94888], 184: [0.17014, 0, 0, 0, 0.53222], 198: [0, 0.68611, 0.11431, 0, 1.02277], 216: [0.04861, 0.73472, 0.09062, 0, 0.88555], 223: [0.19444, 0.69444, 0.09736, 0, 0.665], 230: [0, 0.44444, 0.085, 0, 0.82666], 248: [0.09722, 0.54167, 0.09458, 0, 0.59111], 305: [0, 0.44444, 0.09426, 0, 0.35555], 338: [0, 0.68611, 0.11431, 0, 1.14054], 339: [0, 0.44444, 0.085, 0, 0.82666], 567: [0.19444, 0.44444, 0.04611, 0, 0.385], 710: [0, 0.69444, 0.06709, 0, 0.59111], 711: [0, 0.63194, 0.08271, 0, 0.59111], 713: [0, 0.59444, 0.10444, 0, 0.59111], 714: [0, 0.69444, 0.08528, 0, 0.59111], 715: [0, 0.69444, 0, 0, 0.59111], 728: [0, 0.69444, 0.10333, 0, 0.59111], 729: [0, 0.69444, 0.12945, 0, 0.35555], 730: [0, 0.69444, 0, 0, 0.94888], 732: [0, 0.69444, 0.11472, 0, 0.59111], 733: [0, 0.69444, 0.11472, 0, 0.59111], 915: [0, 0.68611, 0.12903, 0, 0.69777], 916: [0, 0.68611, 0, 0, 0.94444], 920: [0, 0.68611, 0.09062, 0, 0.88555], 923: [0, 0.68611, 0, 0, 0.80666], 926: [0, 0.68611, 0.15092, 0, 0.76777], 928: [0, 0.68611, 0.17208, 0, 0.8961], 931: [0, 0.68611, 0.11431, 0, 0.82666], 933: [0, 0.68611, 0.10778, 0, 0.88555], 934: [0, 0.68611, 0.05632, 0, 0.82666], 936: [0, 0.68611, 0.10778, 0, 0.88555], 937: [0, 0.68611, 0.0992, 0, 0.82666], 8211: [0, 0.44444, 0.09811, 0, 0.59111], 8212: [0, 0.44444, 0.09811, 0, 1.18221], 8216: [0, 0.69444, 0.12945, 0, 0.35555], 8217: [0, 0.69444, 0.12945, 0, 0.35555], 8220: [0, 0.69444, 0.16772, 0, 0.62055], 8221: [0, 0.69444, 0.07939, 0, 0.62055] }, "Main-Italic": { 32: [0, 0, 0, 0, 0.25], 33: [0, 0.69444, 0.12417, 0, 0.30667], 34: [0, 0.69444, 0.06961, 0, 0.51444], 35: [0.19444, 0.69444, 0.06616, 0, 0.81777], 37: [0.05556, 0.75, 0.13639, 0, 0.81777], 38: [0, 0.69444, 0.09694, 0, 0.76666], 39: [0, 0.69444, 0.12417, 0, 0.30667], 40: [0.25, 0.75, 0.16194, 0, 0.40889], 41: [0.25, 0.75, 0.03694, 0, 0.40889], 42: [0, 0.75, 0.14917, 0, 0.51111], 43: [0.05667, 0.56167, 0.03694, 0, 0.76666], 44: [0.19444, 0.10556, 0, 0, 0.30667], 45: [0, 0.43056, 0.02826, 0, 0.35778], 46: [0, 0.10556, 0, 0, 0.30667], 47: [0.25, 0.75, 0.16194, 0, 0.51111], 48: [0, 0.64444, 0.13556, 0, 0.51111], 49: [0, 0.64444, 0.13556, 0, 0.51111], 50: [0, 0.64444, 0.13556, 0, 0.51111], 51: [0, 0.64444, 0.13556, 0, 0.51111], 52: [0.19444, 0.64444, 0.13556, 0, 0.51111], 53: [0, 0.64444, 0.13556, 0, 0.51111], 54: [0, 0.64444, 0.13556, 0, 0.51111], 55: [0.19444, 0.64444, 0.13556, 0, 0.51111], 56: [0, 0.64444, 0.13556, 0, 0.51111], 57: [0, 0.64444, 0.13556, 0, 0.51111], 58: [0, 0.43056, 0.0582, 0, 0.30667], 59: [0.19444, 0.43056, 0.0582, 0, 0.30667], 61: [-0.13313, 0.36687, 0.06616, 0, 0.76666], 63: [0, 0.69444, 0.1225, 0, 0.51111], 64: [0, 0.69444, 0.09597, 0, 0.76666], 65: [0, 0.68333, 0, 0, 0.74333], 66: [0, 0.68333, 0.10257, 0, 0.70389], 67: [0, 0.68333, 0.14528, 0, 0.71555], 68: [0, 0.68333, 0.09403, 0, 0.755], 69: [0, 0.68333, 0.12028, 0, 0.67833], 70: [0, 0.68333, 0.13305, 0, 0.65277], 71: [0, 0.68333, 0.08722, 0, 0.77361], 72: [0, 0.68333, 0.16389, 0, 0.74333], 73: [0, 0.68333, 0.15806, 0, 0.38555], 74: [0, 0.68333, 0.14028, 0, 0.525], 75: [0, 0.68333, 0.14528, 0, 0.76888], 76: [0, 0.68333, 0, 0, 0.62722], 77: [0, 0.68333, 0.16389, 0, 0.89666], 78: [0, 0.68333, 0.16389, 0, 0.74333], 79: [0, 0.68333, 0.09403, 0, 0.76666], 80: [0, 0.68333, 0.10257, 0, 0.67833], 81: [0.19444, 0.68333, 0.09403, 0, 0.76666], 82: [0, 0.68333, 0.03868, 0, 0.72944], 83: [0, 0.68333, 0.11972, 0, 0.56222], 84: [0, 0.68333, 0.13305, 0, 0.71555], 85: [0, 0.68333, 0.16389, 0, 0.74333], 86: [0, 0.68333, 0.18361, 0, 0.74333], 87: [0, 0.68333, 0.18361, 0, 0.99888], 88: [0, 0.68333, 0.15806, 0, 0.74333], 89: [0, 0.68333, 0.19383, 0, 0.74333], 90: [0, 0.68333, 0.14528, 0, 0.61333], 91: [0.25, 0.75, 0.1875, 0, 0.30667], 93: [0.25, 0.75, 0.10528, 0, 0.30667], 94: [0, 0.69444, 0.06646, 0, 0.51111], 95: [0.31, 0.12056, 0.09208, 0, 0.51111], 97: [0, 0.43056, 0.07671, 0, 0.51111], 98: [0, 0.69444, 0.06312, 0, 0.46], 99: [0, 0.43056, 0.05653, 0, 0.46], 100: [0, 0.69444, 0.10333, 0, 0.51111], 101: [0, 0.43056, 0.07514, 0, 0.46], 102: [0.19444, 0.69444, 0.21194, 0, 0.30667], 103: [0.19444, 0.43056, 0.08847, 0, 0.46], 104: [0, 0.69444, 0.07671, 0, 0.51111], 105: [0, 0.65536, 0.1019, 0, 0.30667], 106: [0.19444, 0.65536, 0.14467, 0, 0.30667], 107: [0, 0.69444, 0.10764, 0, 0.46], 108: [0, 0.69444, 0.10333, 0, 0.25555], 109: [0, 0.43056, 0.07671, 0, 0.81777], 110: [0, 0.43056, 0.07671, 0, 0.56222], 111: [0, 0.43056, 0.06312, 0, 0.51111], 112: [0.19444, 0.43056, 0.06312, 0, 0.51111], 113: [0.19444, 0.43056, 0.08847, 0, 0.46], 114: [0, 0.43056, 0.10764, 0, 0.42166], 115: [0, 0.43056, 0.08208, 0, 0.40889], 116: [0, 0.61508, 0.09486, 0, 0.33222], 117: [0, 0.43056, 0.07671, 0, 0.53666], 118: [0, 0.43056, 0.10764, 0, 0.46], 119: [0, 0.43056, 0.10764, 0, 0.66444], 120: [0, 0.43056, 0.12042, 0, 0.46389], 121: [0.19444, 0.43056, 0.08847, 0, 0.48555], 122: [0, 0.43056, 0.12292, 0, 0.40889], 126: [0.35, 0.31786, 0.11585, 0, 0.51111], 160: [0, 0, 0, 0, 0.25], 168: [0, 0.66786, 0.10474, 0, 0.51111], 176: [0, 0.69444, 0, 0, 0.83129], 184: [0.17014, 0, 0, 0, 0.46], 198: [0, 0.68333, 0.12028, 0, 0.88277], 216: [0.04861, 0.73194, 0.09403, 0, 0.76666], 223: [0.19444, 0.69444, 0.10514, 0, 0.53666], 230: [0, 0.43056, 0.07514, 0, 0.71555], 248: [0.09722, 0.52778, 0.09194, 0, 0.51111], 338: [0, 0.68333, 0.12028, 0, 0.98499], 339: [0, 0.43056, 0.07514, 0, 0.71555], 710: [0, 0.69444, 0.06646, 0, 0.51111], 711: [0, 0.62847, 0.08295, 0, 0.51111], 713: [0, 0.56167, 0.10333, 0, 0.51111], 714: [0, 0.69444, 0.09694, 0, 0.51111], 715: [0, 0.69444, 0, 0, 0.51111], 728: [0, 0.69444, 0.10806, 0, 0.51111], 729: [0, 0.66786, 0.11752, 0, 0.30667], 730: [0, 0.69444, 0, 0, 0.83129], 732: [0, 0.66786, 0.11585, 0, 0.51111], 733: [0, 0.69444, 0.1225, 0, 0.51111], 915: [0, 0.68333, 0.13305, 0, 0.62722], 916: [0, 0.68333, 0, 0, 0.81777], 920: [0, 0.68333, 0.09403, 0, 0.76666], 923: [0, 0.68333, 0, 0, 0.69222], 926: [0, 0.68333, 0.15294, 0, 0.66444], 928: [0, 0.68333, 0.16389, 0, 0.74333], 931: [0, 0.68333, 0.12028, 0, 0.71555], 933: [0, 0.68333, 0.11111, 0, 0.76666], 934: [0, 0.68333, 0.05986, 0, 0.71555], 936: [0, 0.68333, 0.11111, 0, 0.76666], 937: [0, 0.68333, 0.10257, 0, 0.71555], 8211: [0, 0.43056, 0.09208, 0, 0.51111], 8212: [0, 0.43056, 0.09208, 0, 1.02222], 8216: [0, 0.69444, 0.12417, 0, 0.30667], 8217: [0, 0.69444, 0.12417, 0, 0.30667], 8220: [0, 0.69444, 0.1685, 0, 0.51444], 8221: [0, 0.69444, 0.06961, 0, 0.51444], 8463: [0, 0.68889, 0, 0, 0.54028] }, "Main-Regular": { 32: [0, 0, 0, 0, 0.25], 33: [0, 0.69444, 0, 0, 0.27778], 34: [0, 0.69444, 0, 0, 0.5], 35: [0.19444, 0.69444, 0, 0, 0.83334], 36: [0.05556, 0.75, 0, 0, 0.5], 37: [0.05556, 0.75, 0, 0, 0.83334], 38: [0, 0.69444, 0, 0, 0.77778], 39: [0, 0.69444, 0, 0, 0.27778], 40: [0.25, 0.75, 0, 0, 0.38889], 41: [0.25, 0.75, 0, 0, 0.38889], 42: [0, 0.75, 0, 0, 0.5], 43: [0.08333, 0.58333, 0, 0, 0.77778], 44: [0.19444, 0.10556, 0, 0, 0.27778], 45: [0, 0.43056, 0, 0, 0.33333], 46: [0, 0.10556, 0, 0, 0.27778], 47: [0.25, 0.75, 0, 0, 0.5], 48: [0, 0.64444, 0, 0, 0.5], 49: [0, 0.64444, 0, 0, 0.5], 50: [0, 0.64444, 0, 0, 0.5], 51: [0, 0.64444, 0, 0, 0.5], 52: [0, 0.64444, 0, 0, 0.5], 53: [0, 0.64444, 0, 0, 0.5], 54: [0, 0.64444, 0, 0, 0.5], 55: [0, 0.64444, 0, 0, 0.5], 56: [0, 0.64444, 0, 0, 0.5], 57: [0, 0.64444, 0, 0, 0.5], 58: [0, 0.43056, 0, 0, 0.27778], 59: [0.19444, 0.43056, 0, 0, 0.27778], 60: [0.0391, 0.5391, 0, 0, 0.77778], 61: [-0.13313, 0.36687, 0, 0, 0.77778], 62: [0.0391, 0.5391, 0, 0, 0.77778], 63: [0, 0.69444, 0, 0, 0.47222], 64: [0, 0.69444, 0, 0, 0.77778], 65: [0, 0.68333, 0, 0, 0.75], 66: [0, 0.68333, 0, 0, 0.70834], 67: [0, 0.68333, 0, 0, 0.72222], 68: [0, 0.68333, 0, 0, 0.76389], 69: [0, 0.68333, 0, 0, 0.68056], 70: [0, 0.68333, 0, 0, 0.65278], 71: [0, 0.68333, 0, 0, 0.78472], 72: [0, 0.68333, 0, 0, 0.75], 73: [0, 0.68333, 0, 0, 0.36111], 74: [0, 0.68333, 0, 0, 0.51389], 75: [0, 0.68333, 0, 0, 0.77778], 76: [0, 0.68333, 0, 0, 0.625], 77: [0, 0.68333, 0, 0, 0.91667], 78: [0, 0.68333, 0, 0, 0.75], 79: [0, 0.68333, 0, 0, 0.77778], 80: [0, 0.68333, 0, 0, 0.68056], 81: [0.19444, 0.68333, 0, 0, 0.77778], 82: [0, 0.68333, 0, 0, 0.73611], 83: [0, 0.68333, 0, 0, 0.55556], 84: [0, 0.68333, 0, 0, 0.72222], 85: [0, 0.68333, 0, 0, 0.75], 86: [0, 0.68333, 0.01389, 0, 0.75], 87: [0, 0.68333, 0.01389, 0, 1.02778], 88: [0, 0.68333, 0, 0, 0.75], 89: [0, 0.68333, 0.025, 0, 0.75], 90: [0, 0.68333, 0, 0, 0.61111], 91: [0.25, 0.75, 0, 0, 0.27778], 92: [0.25, 0.75, 0, 0, 0.5], 93: [0.25, 0.75, 0, 0, 0.27778], 94: [0, 0.69444, 0, 0, 0.5], 95: [0.31, 0.12056, 0.02778, 0, 0.5], 97: [0, 0.43056, 0, 0, 0.5], 98: [0, 0.69444, 0, 0, 0.55556], 99: [0, 0.43056, 0, 0, 0.44445], 100: [0, 0.69444, 0, 0, 0.55556], 101: [0, 0.43056, 0, 0, 0.44445], 102: [0, 0.69444, 0.07778, 0, 0.30556], 103: [0.19444, 0.43056, 0.01389, 0, 0.5], 104: [0, 0.69444, 0, 0, 0.55556], 105: [0, 0.66786, 0, 0, 0.27778], 106: [0.19444, 0.66786, 0, 0, 0.30556], 107: [0, 0.69444, 0, 0, 0.52778], 108: [0, 0.69444, 0, 0, 0.27778], 109: [0, 0.43056, 0, 0, 0.83334], 110: [0, 0.43056, 0, 0, 0.55556], 111: [0, 0.43056, 0, 0, 0.5], 112: [0.19444, 0.43056, 0, 0, 0.55556], 113: [0.19444, 0.43056, 0, 0, 0.52778], 114: [0, 0.43056, 0, 0, 0.39167], 115: [0, 0.43056, 0, 0, 0.39445], 116: [0, 0.61508, 0, 0, 0.38889], 117: [0, 0.43056, 0, 0, 0.55556], 118: [0, 0.43056, 0.01389, 0, 0.52778], 119: [0, 0.43056, 0.01389, 0, 0.72222], 120: [0, 0.43056, 0, 0, 0.52778], 121: [0.19444, 0.43056, 0.01389, 0, 0.52778], 122: [0, 0.43056, 0, 0, 0.44445], 123: [0.25, 0.75, 0, 0, 0.5], 124: [0.25, 0.75, 0, 0, 0.27778], 125: [0.25, 0.75, 0, 0, 0.5], 126: [0.35, 0.31786, 0, 0, 0.5], 160: [0, 0, 0, 0, 0.25], 163: [0, 0.69444, 0, 0, 0.76909], 167: [0.19444, 0.69444, 0, 0, 0.44445], 168: [0, 0.66786, 0, 0, 0.5], 172: [0, 0.43056, 0, 0, 0.66667], 176: [0, 0.69444, 0, 0, 0.75], 177: [0.08333, 0.58333, 0, 0, 0.77778], 182: [0.19444, 0.69444, 0, 0, 0.61111], 184: [0.17014, 0, 0, 0, 0.44445], 198: [0, 0.68333, 0, 0, 0.90278], 215: [0.08333, 0.58333, 0, 0, 0.77778], 216: [0.04861, 0.73194, 0, 0, 0.77778], 223: [0, 0.69444, 0, 0, 0.5], 230: [0, 0.43056, 0, 0, 0.72222], 247: [0.08333, 0.58333, 0, 0, 0.77778], 248: [0.09722, 0.52778, 0, 0, 0.5], 305: [0, 0.43056, 0, 0, 0.27778], 338: [0, 0.68333, 0, 0, 1.01389], 339: [0, 0.43056, 0, 0, 0.77778], 567: [0.19444, 0.43056, 0, 0, 0.30556], 710: [0, 0.69444, 0, 0, 0.5], 711: [0, 0.62847, 0, 0, 0.5], 713: [0, 0.56778, 0, 0, 0.5], 714: [0, 0.69444, 0, 0, 0.5], 715: [0, 0.69444, 0, 0, 0.5], 728: [0, 0.69444, 0, 0, 0.5], 729: [0, 0.66786, 0, 0, 0.27778], 730: [0, 0.69444, 0, 0, 0.75], 732: [0, 0.66786, 0, 0, 0.5], 733: [0, 0.69444, 0, 0, 0.5], 915: [0, 0.68333, 0, 0, 0.625], 916: [0, 0.68333, 0, 0, 0.83334], 920: [0, 0.68333, 0, 0, 0.77778], 923: [0, 0.68333, 0, 0, 0.69445], 926: [0, 0.68333, 0, 0, 0.66667], 928: [0, 0.68333, 0, 0, 0.75], 931: [0, 0.68333, 0, 0, 0.72222], 933: [0, 0.68333, 0, 0, 0.77778], 934: [0, 0.68333, 0, 0, 0.72222], 936: [0, 0.68333, 0, 0, 0.77778], 937: [0, 0.68333, 0, 0, 0.72222], 8211: [0, 0.43056, 0.02778, 0, 0.5], 8212: [0, 0.43056, 0.02778, 0, 1], 8216: [0, 0.69444, 0, 0, 0.27778], 8217: [0, 0.69444, 0, 0, 0.27778], 8220: [0, 0.69444, 0, 0, 0.5], 8221: [0, 0.69444, 0, 0, 0.5], 8224: [0.19444, 0.69444, 0, 0, 0.44445], 8225: [0.19444, 0.69444, 0, 0, 0.44445], 8230: [0, 0.123, 0, 0, 1.172], 8242: [0, 0.55556, 0, 0, 0.275], 8407: [0, 0.71444, 0.15382, 0, 0.5], 8463: [0, 0.68889, 0, 0, 0.54028], 8465: [0, 0.69444, 0, 0, 0.72222], 8467: [0, 0.69444, 0, 0.11111, 0.41667], 8472: [0.19444, 0.43056, 0, 0.11111, 0.63646], 8476: [0, 0.69444, 0, 0, 0.72222], 8501: [0, 0.69444, 0, 0, 0.61111], 8592: [-0.13313, 0.36687, 0, 0, 1], 8593: [0.19444, 0.69444, 0, 0, 0.5], 8594: [-0.13313, 0.36687, 0, 0, 1], 8595: [0.19444, 0.69444, 0, 0, 0.5], 8596: [-0.13313, 0.36687, 0, 0, 1], 8597: [0.25, 0.75, 0, 0, 0.5], 8598: [0.19444, 0.69444, 0, 0, 1], 8599: [0.19444, 0.69444, 0, 0, 1], 8600: [0.19444, 0.69444, 0, 0, 1], 8601: [0.19444, 0.69444, 0, 0, 1], 8614: [0.011, 0.511, 0, 0, 1], 8617: [0.011, 0.511, 0, 0, 1.126], 8618: [0.011, 0.511, 0, 0, 1.126], 8636: [-0.13313, 0.36687, 0, 0, 1], 8637: [-0.13313, 0.36687, 0, 0, 1], 8640: [-0.13313, 0.36687, 0, 0, 1], 8641: [-0.13313, 0.36687, 0, 0, 1], 8652: [0.011, 0.671, 0, 0, 1], 8656: [-0.13313, 0.36687, 0, 0, 1], 8657: [0.19444, 0.69444, 0, 0, 0.61111], 8658: [-0.13313, 0.36687, 0, 0, 1], 8659: [0.19444, 0.69444, 0, 0, 0.61111], 8660: [-0.13313, 0.36687, 0, 0, 1], 8661: [0.25, 0.75, 0, 0, 0.61111], 8704: [0, 0.69444, 0, 0, 0.55556], 8706: [0, 0.69444, 0.05556, 0.08334, 0.5309], 8707: [0, 0.69444, 0, 0, 0.55556], 8709: [0.05556, 0.75, 0, 0, 0.5], 8711: [0, 0.68333, 0, 0, 0.83334], 8712: [0.0391, 0.5391, 0, 0, 0.66667], 8715: [0.0391, 0.5391, 0, 0, 0.66667], 8722: [0.08333, 0.58333, 0, 0, 0.77778], 8723: [0.08333, 0.58333, 0, 0, 0.77778], 8725: [0.25, 0.75, 0, 0, 0.5], 8726: [0.25, 0.75, 0, 0, 0.5], 8727: [-0.03472, 0.46528, 0, 0, 0.5], 8728: [-0.05555, 0.44445, 0, 0, 0.5], 8729: [-0.05555, 0.44445, 0, 0, 0.5], 8730: [0.2, 0.8, 0, 0, 0.83334], 8733: [0, 0.43056, 0, 0, 0.77778], 8734: [0, 0.43056, 0, 0, 1], 8736: [0, 0.69224, 0, 0, 0.72222], 8739: [0.25, 0.75, 0, 0, 0.27778], 8741: [0.25, 0.75, 0, 0, 0.5], 8743: [0, 0.55556, 0, 0, 0.66667], 8744: [0, 0.55556, 0, 0, 0.66667], 8745: [0, 0.55556, 0, 0, 0.66667], 8746: [0, 0.55556, 0, 0, 0.66667], 8747: [0.19444, 0.69444, 0.11111, 0, 0.41667], 8764: [-0.13313, 0.36687, 0, 0, 0.77778], 8768: [0.19444, 0.69444, 0, 0, 0.27778], 8771: [-0.03625, 0.46375, 0, 0, 0.77778], 8773: [-0.022, 0.589, 0, 0, 0.778], 8776: [-0.01688, 0.48312, 0, 0, 0.77778], 8781: [-0.03625, 0.46375, 0, 0, 0.77778], 8784: [-0.133, 0.673, 0, 0, 0.778], 8801: [-0.03625, 0.46375, 0, 0, 0.77778], 8804: [0.13597, 0.63597, 0, 0, 0.77778], 8805: [0.13597, 0.63597, 0, 0, 0.77778], 8810: [0.0391, 0.5391, 0, 0, 1], 8811: [0.0391, 0.5391, 0, 0, 1], 8826: [0.0391, 0.5391, 0, 0, 0.77778], 8827: [0.0391, 0.5391, 0, 0, 0.77778], 8834: [0.0391, 0.5391, 0, 0, 0.77778], 8835: [0.0391, 0.5391, 0, 0, 0.77778], 8838: [0.13597, 0.63597, 0, 0, 0.77778], 8839: [0.13597, 0.63597, 0, 0, 0.77778], 8846: [0, 0.55556, 0, 0, 0.66667], 8849: [0.13597, 0.63597, 0, 0, 0.77778], 8850: [0.13597, 0.63597, 0, 0, 0.77778], 8851: [0, 0.55556, 0, 0, 0.66667], 8852: [0, 0.55556, 0, 0, 0.66667], 8853: [0.08333, 0.58333, 0, 0, 0.77778], 8854: [0.08333, 0.58333, 0, 0, 0.77778], 8855: [0.08333, 0.58333, 0, 0, 0.77778], 8856: [0.08333, 0.58333, 0, 0, 0.77778], 8857: [0.08333, 0.58333, 0, 0, 0.77778], 8866: [0, 0.69444, 0, 0, 0.61111], 8867: [0, 0.69444, 0, 0, 0.61111], 8868: [0, 0.69444, 0, 0, 0.77778], 8869: [0, 0.69444, 0, 0, 0.77778], 8872: [0.249, 0.75, 0, 0, 0.867], 8900: [-0.05555, 0.44445, 0, 0, 0.5], 8901: [-0.05555, 0.44445, 0, 0, 0.27778], 8902: [-0.03472, 0.46528, 0, 0, 0.5], 8904: [5e-3, 0.505, 0, 0, 0.9], 8942: [0.03, 0.903, 0, 0, 0.278], 8943: [-0.19, 0.313, 0, 0, 1.172], 8945: [-0.1, 0.823, 0, 0, 1.282], 8968: [0.25, 0.75, 0, 0, 0.44445], 8969: [0.25, 0.75, 0, 0, 0.44445], 8970: [0.25, 0.75, 0, 0, 0.44445], 8971: [0.25, 0.75, 0, 0, 0.44445], 8994: [-0.14236, 0.35764, 0, 0, 1], 8995: [-0.14236, 0.35764, 0, 0, 1], 9136: [0.244, 0.744, 0, 0, 0.412], 9137: [0.244, 0.745, 0, 0, 0.412], 9651: [0.19444, 0.69444, 0, 0, 0.88889], 9657: [-0.03472, 0.46528, 0, 0, 0.5], 9661: [0.19444, 0.69444, 0, 0, 0.88889], 9667: [-0.03472, 0.46528, 0, 0, 0.5], 9711: [0.19444, 0.69444, 0, 0, 1], 9824: [0.12963, 0.69444, 0, 0, 0.77778], 9825: [0.12963, 0.69444, 0, 0, 0.77778], 9826: [0.12963, 0.69444, 0, 0, 0.77778], 9827: [0.12963, 0.69444, 0, 0, 0.77778], 9837: [0, 0.75, 0, 0, 0.38889], 9838: [0.19444, 0.69444, 0, 0, 0.38889], 9839: [0.19444, 0.69444, 0, 0, 0.38889], 10216: [0.25, 0.75, 0, 0, 0.38889], 10217: [0.25, 0.75, 0, 0, 0.38889], 10222: [0.244, 0.744, 0, 0, 0.412], 10223: [0.244, 0.745, 0, 0, 0.412], 10229: [0.011, 0.511, 0, 0, 1.609], 10230: [0.011, 0.511, 0, 0, 1.638], 10231: [0.011, 0.511, 0, 0, 1.859], 10232: [0.024, 0.525, 0, 0, 1.609], 10233: [0.024, 0.525, 0, 0, 1.638], 10234: [0.024, 0.525, 0, 0, 1.858], 10236: [0.011, 0.511, 0, 0, 1.638], 10815: [0, 0.68333, 0, 0, 0.75], 10927: [0.13597, 0.63597, 0, 0, 0.77778], 10928: [0.13597, 0.63597, 0, 0, 0.77778], 57376: [0.19444, 0.69444, 0, 0, 0] }, "Math-BoldItalic": { 32: [0, 0, 0, 0, 0.25], 48: [0, 0.44444, 0, 0, 0.575], 49: [0, 0.44444, 0, 0, 0.575], 50: [0, 0.44444, 0, 0, 0.575], 51: [0.19444, 0.44444, 0, 0, 0.575], 52: [0.19444, 0.44444, 0, 0, 0.575], 53: [0.19444, 0.44444, 0, 0, 0.575], 54: [0, 0.64444, 0, 0, 0.575], 55: [0.19444, 0.44444, 0, 0, 0.575], 56: [0, 0.64444, 0, 0, 0.575], 57: [0.19444, 0.44444, 0, 0, 0.575], 65: [0, 0.68611, 0, 0, 0.86944], 66: [0, 0.68611, 0.04835, 0, 0.8664], 67: [0, 0.68611, 0.06979, 0, 0.81694], 68: [0, 0.68611, 0.03194, 0, 0.93812], 69: [0, 0.68611, 0.05451, 0, 0.81007], 70: [0, 0.68611, 0.15972, 0, 0.68889], 71: [0, 0.68611, 0, 0, 0.88673], 72: [0, 0.68611, 0.08229, 0, 0.98229], 73: [0, 0.68611, 0.07778, 0, 0.51111], 74: [0, 0.68611, 0.10069, 0, 0.63125], 75: [0, 0.68611, 0.06979, 0, 0.97118], 76: [0, 0.68611, 0, 0, 0.75555], 77: [0, 0.68611, 0.11424, 0, 1.14201], 78: [0, 0.68611, 0.11424, 0, 0.95034], 79: [0, 0.68611, 0.03194, 0, 0.83666], 80: [0, 0.68611, 0.15972, 0, 0.72309], 81: [0.19444, 0.68611, 0, 0, 0.86861], 82: [0, 0.68611, 421e-5, 0, 0.87235], 83: [0, 0.68611, 0.05382, 0, 0.69271], 84: [0, 0.68611, 0.15972, 0, 0.63663], 85: [0, 0.68611, 0.11424, 0, 0.80027], 86: [0, 0.68611, 0.25555, 0, 0.67778], 87: [0, 0.68611, 0.15972, 0, 1.09305], 88: [0, 0.68611, 0.07778, 0, 0.94722], 89: [0, 0.68611, 0.25555, 0, 0.67458], 90: [0, 0.68611, 0.06979, 0, 0.77257], 97: [0, 0.44444, 0, 0, 0.63287], 98: [0, 0.69444, 0, 0, 0.52083], 99: [0, 0.44444, 0, 0, 0.51342], 100: [0, 0.69444, 0, 0, 0.60972], 101: [0, 0.44444, 0, 0, 0.55361], 102: [0.19444, 0.69444, 0.11042, 0, 0.56806], 103: [0.19444, 0.44444, 0.03704, 0, 0.5449], 104: [0, 0.69444, 0, 0, 0.66759], 105: [0, 0.69326, 0, 0, 0.4048], 106: [0.19444, 0.69326, 0.0622, 0, 0.47083], 107: [0, 0.69444, 0.01852, 0, 0.6037], 108: [0, 0.69444, 88e-4, 0, 0.34815], 109: [0, 0.44444, 0, 0, 1.0324], 110: [0, 0.44444, 0, 0, 0.71296], 111: [0, 0.44444, 0, 0, 0.58472], 112: [0.19444, 0.44444, 0, 0, 0.60092], 113: [0.19444, 0.44444, 0.03704, 0, 0.54213], 114: [0, 0.44444, 0.03194, 0, 0.5287], 115: [0, 0.44444, 0, 0, 0.53125], 116: [0, 0.63492, 0, 0, 0.41528], 117: [0, 0.44444, 0, 0, 0.68102], 118: [0, 0.44444, 0.03704, 0, 0.56666], 119: [0, 0.44444, 0.02778, 0, 0.83148], 120: [0, 0.44444, 0, 0, 0.65903], 121: [0.19444, 0.44444, 0.03704, 0, 0.59028], 122: [0, 0.44444, 0.04213, 0, 0.55509], 160: [0, 0, 0, 0, 0.25], 915: [0, 0.68611, 0.15972, 0, 0.65694], 916: [0, 0.68611, 0, 0, 0.95833], 920: [0, 0.68611, 0.03194, 0, 0.86722], 923: [0, 0.68611, 0, 0, 0.80555], 926: [0, 0.68611, 0.07458, 0, 0.84125], 928: [0, 0.68611, 0.08229, 0, 0.98229], 931: [0, 0.68611, 0.05451, 0, 0.88507], 933: [0, 0.68611, 0.15972, 0, 0.67083], 934: [0, 0.68611, 0, 0, 0.76666], 936: [0, 0.68611, 0.11653, 0, 0.71402], 937: [0, 0.68611, 0.04835, 0, 0.8789], 945: [0, 0.44444, 0, 0, 0.76064], 946: [0.19444, 0.69444, 0.03403, 0, 0.65972], 947: [0.19444, 0.44444, 0.06389, 0, 0.59003], 948: [0, 0.69444, 0.03819, 0, 0.52222], 949: [0, 0.44444, 0, 0, 0.52882], 950: [0.19444, 0.69444, 0.06215, 0, 0.50833], 951: [0.19444, 0.44444, 0.03704, 0, 0.6], 952: [0, 0.69444, 0.03194, 0, 0.5618], 953: [0, 0.44444, 0, 0, 0.41204], 954: [0, 0.44444, 0, 0, 0.66759], 955: [0, 0.69444, 0, 0, 0.67083], 956: [0.19444, 0.44444, 0, 0, 0.70787], 957: [0, 0.44444, 0.06898, 0, 0.57685], 958: [0.19444, 0.69444, 0.03021, 0, 0.50833], 959: [0, 0.44444, 0, 0, 0.58472], 960: [0, 0.44444, 0.03704, 0, 0.68241], 961: [0.19444, 0.44444, 0, 0, 0.6118], 962: [0.09722, 0.44444, 0.07917, 0, 0.42361], 963: [0, 0.44444, 0.03704, 0, 0.68588], 964: [0, 0.44444, 0.13472, 0, 0.52083], 965: [0, 0.44444, 0.03704, 0, 0.63055], 966: [0.19444, 0.44444, 0, 0, 0.74722], 967: [0.19444, 0.44444, 0, 0, 0.71805], 968: [0.19444, 0.69444, 0.03704, 0, 0.75833], 969: [0, 0.44444, 0.03704, 0, 0.71782], 977: [0, 0.69444, 0, 0, 0.69155], 981: [0.19444, 0.69444, 0, 0, 0.7125], 982: [0, 0.44444, 0.03194, 0, 0.975], 1009: [0.19444, 0.44444, 0, 0, 0.6118], 1013: [0, 0.44444, 0, 0, 0.48333], 57649: [0, 0.44444, 0, 0, 0.39352], 57911: [0.19444, 0.44444, 0, 0, 0.43889] }, "Math-Italic": { 32: [0, 0, 0, 0, 0.25], 48: [0, 0.43056, 0, 0, 0.5], 49: [0, 0.43056, 0, 0, 0.5], 50: [0, 0.43056, 0, 0, 0.5], 51: [0.19444, 0.43056, 0, 0, 0.5], 52: [0.19444, 0.43056, 0, 0, 0.5], 53: [0.19444, 0.43056, 0, 0, 0.5], 54: [0, 0.64444, 0, 0, 0.5], 55: [0.19444, 0.43056, 0, 0, 0.5], 56: [0, 0.64444, 0, 0, 0.5], 57: [0.19444, 0.43056, 0, 0, 0.5], 65: [0, 0.68333, 0, 0.13889, 0.75], 66: [0, 0.68333, 0.05017, 0.08334, 0.75851], 67: [0, 0.68333, 0.07153, 0.08334, 0.71472], 68: [0, 0.68333, 0.02778, 0.05556, 0.82792], 69: [0, 0.68333, 0.05764, 0.08334, 0.7382], 70: [0, 0.68333, 0.13889, 0.08334, 0.64306], 71: [0, 0.68333, 0, 0.08334, 0.78625], 72: [0, 0.68333, 0.08125, 0.05556, 0.83125], 73: [0, 0.68333, 0.07847, 0.11111, 0.43958], 74: [0, 0.68333, 0.09618, 0.16667, 0.55451], 75: [0, 0.68333, 0.07153, 0.05556, 0.84931], 76: [0, 0.68333, 0, 0.02778, 0.68056], 77: [0, 0.68333, 0.10903, 0.08334, 0.97014], 78: [0, 0.68333, 0.10903, 0.08334, 0.80347], 79: [0, 0.68333, 0.02778, 0.08334, 0.76278], 80: [0, 0.68333, 0.13889, 0.08334, 0.64201], 81: [0.19444, 0.68333, 0, 0.08334, 0.79056], 82: [0, 0.68333, 773e-5, 0.08334, 0.75929], 83: [0, 0.68333, 0.05764, 0.08334, 0.6132], 84: [0, 0.68333, 0.13889, 0.08334, 0.58438], 85: [0, 0.68333, 0.10903, 0.02778, 0.68278], 86: [0, 0.68333, 0.22222, 0, 0.58333], 87: [0, 0.68333, 0.13889, 0, 0.94445], 88: [0, 0.68333, 0.07847, 0.08334, 0.82847], 89: [0, 0.68333, 0.22222, 0, 0.58056], 90: [0, 0.68333, 0.07153, 0.08334, 0.68264], 97: [0, 0.43056, 0, 0, 0.52859], 98: [0, 0.69444, 0, 0, 0.42917], 99: [0, 0.43056, 0, 0.05556, 0.43276], 100: [0, 0.69444, 0, 0.16667, 0.52049], 101: [0, 0.43056, 0, 0.05556, 0.46563], 102: [0.19444, 0.69444, 0.10764, 0.16667, 0.48959], 103: [0.19444, 0.43056, 0.03588, 0.02778, 0.47697], 104: [0, 0.69444, 0, 0, 0.57616], 105: [0, 0.65952, 0, 0, 0.34451], 106: [0.19444, 0.65952, 0.05724, 0, 0.41181], 107: [0, 0.69444, 0.03148, 0, 0.5206], 108: [0, 0.69444, 0.01968, 0.08334, 0.29838], 109: [0, 0.43056, 0, 0, 0.87801], 110: [0, 0.43056, 0, 0, 0.60023], 111: [0, 0.43056, 0, 0.05556, 0.48472], 112: [0.19444, 0.43056, 0, 0.08334, 0.50313], 113: [0.19444, 0.43056, 0.03588, 0.08334, 0.44641], 114: [0, 0.43056, 0.02778, 0.05556, 0.45116], 115: [0, 0.43056, 0, 0.05556, 0.46875], 116: [0, 0.61508, 0, 0.08334, 0.36111], 117: [0, 0.43056, 0, 0.02778, 0.57246], 118: [0, 0.43056, 0.03588, 0.02778, 0.48472], 119: [0, 0.43056, 0.02691, 0.08334, 0.71592], 120: [0, 0.43056, 0, 0.02778, 0.57153], 121: [0.19444, 0.43056, 0.03588, 0.05556, 0.49028], 122: [0, 0.43056, 0.04398, 0.05556, 0.46505], 160: [0, 0, 0, 0, 0.25], 915: [0, 0.68333, 0.13889, 0.08334, 0.61528], 916: [0, 0.68333, 0, 0.16667, 0.83334], 920: [0, 0.68333, 0.02778, 0.08334, 0.76278], 923: [0, 0.68333, 0, 0.16667, 0.69445], 926: [0, 0.68333, 0.07569, 0.08334, 0.74236], 928: [0, 0.68333, 0.08125, 0.05556, 0.83125], 931: [0, 0.68333, 0.05764, 0.08334, 0.77986], 933: [0, 0.68333, 0.13889, 0.05556, 0.58333], 934: [0, 0.68333, 0, 0.08334, 0.66667], 936: [0, 0.68333, 0.11, 0.05556, 0.61222], 937: [0, 0.68333, 0.05017, 0.08334, 0.7724], 945: [0, 0.43056, 37e-4, 0.02778, 0.6397], 946: [0.19444, 0.69444, 0.05278, 0.08334, 0.56563], 947: [0.19444, 0.43056, 0.05556, 0, 0.51773], 948: [0, 0.69444, 0.03785, 0.05556, 0.44444], 949: [0, 0.43056, 0, 0.08334, 0.46632], 950: [0.19444, 0.69444, 0.07378, 0.08334, 0.4375], 951: [0.19444, 0.43056, 0.03588, 0.05556, 0.49653], 952: [0, 0.69444, 0.02778, 0.08334, 0.46944], 953: [0, 0.43056, 0, 0.05556, 0.35394], 954: [0, 0.43056, 0, 0, 0.57616], 955: [0, 0.69444, 0, 0, 0.58334], 956: [0.19444, 0.43056, 0, 0.02778, 0.60255], 957: [0, 0.43056, 0.06366, 0.02778, 0.49398], 958: [0.19444, 0.69444, 0.04601, 0.11111, 0.4375], 959: [0, 0.43056, 0, 0.05556, 0.48472], 960: [0, 0.43056, 0.03588, 0, 0.57003], 961: [0.19444, 0.43056, 0, 0.08334, 0.51702], 962: [0.09722, 0.43056, 0.07986, 0.08334, 0.36285], 963: [0, 0.43056, 0.03588, 0, 0.57141], 964: [0, 0.43056, 0.1132, 0.02778, 0.43715], 965: [0, 0.43056, 0.03588, 0.02778, 0.54028], 966: [0.19444, 0.43056, 0, 0.08334, 0.65417], 967: [0.19444, 0.43056, 0, 0.05556, 0.62569], 968: [0.19444, 0.69444, 0.03588, 0.11111, 0.65139], 969: [0, 0.43056, 0.03588, 0, 0.62245], 977: [0, 0.69444, 0, 0.08334, 0.59144], 981: [0.19444, 0.69444, 0, 0.08334, 0.59583], 982: [0, 0.43056, 0.02778, 0, 0.82813], 1009: [0.19444, 0.43056, 0, 0.08334, 0.51702], 1013: [0, 0.43056, 0, 0.05556, 0.4059], 57649: [0, 0.43056, 0, 0.02778, 0.32246], 57911: [0.19444, 0.43056, 0, 0.08334, 0.38403] }, "SansSerif-Bold": { 32: [0, 0, 0, 0, 0.25], 33: [0, 0.69444, 0, 0, 0.36667], 34: [0, 0.69444, 0, 0, 0.55834], 35: [0.19444, 0.69444, 0, 0, 0.91667], 36: [0.05556, 0.75, 0, 0, 0.55], 37: [0.05556, 0.75, 0, 0, 1.02912], 38: [0, 0.69444, 0, 0, 0.83056], 39: [0, 0.69444, 0, 0, 0.30556], 40: [0.25, 0.75, 0, 0, 0.42778], 41: [0.25, 0.75, 0, 0, 0.42778], 42: [0, 0.75, 0, 0, 0.55], 43: [0.11667, 0.61667, 0, 0, 0.85556], 44: [0.10556, 0.13056, 0, 0, 0.30556], 45: [0, 0.45833, 0, 0, 0.36667], 46: [0, 0.13056, 0, 0, 0.30556], 47: [0.25, 0.75, 0, 0, 0.55], 48: [0, 0.69444, 0, 0, 0.55], 49: [0, 0.69444, 0, 0, 0.55], 50: [0, 0.69444, 0, 0, 0.55], 51: [0, 0.69444, 0, 0, 0.55], 52: [0, 0.69444, 0, 0, 0.55], 53: [0, 0.69444, 0, 0, 0.55], 54: [0, 0.69444, 0, 0, 0.55], 55: [0, 0.69444, 0, 0, 0.55], 56: [0, 0.69444, 0, 0, 0.55], 57: [0, 0.69444, 0, 0, 0.55], 58: [0, 0.45833, 0, 0, 0.30556], 59: [0.10556, 0.45833, 0, 0, 0.30556], 61: [-0.09375, 0.40625, 0, 0, 0.85556], 63: [0, 0.69444, 0, 0, 0.51945], 64: [0, 0.69444, 0, 0, 0.73334], 65: [0, 0.69444, 0, 0, 0.73334], 66: [0, 0.69444, 0, 0, 0.73334], 67: [0, 0.69444, 0, 0, 0.70278], 68: [0, 0.69444, 0, 0, 0.79445], 69: [0, 0.69444, 0, 0, 0.64167], 70: [0, 0.69444, 0, 0, 0.61111], 71: [0, 0.69444, 0, 0, 0.73334], 72: [0, 0.69444, 0, 0, 0.79445], 73: [0, 0.69444, 0, 0, 0.33056], 74: [0, 0.69444, 0, 0, 0.51945], 75: [0, 0.69444, 0, 0, 0.76389], 76: [0, 0.69444, 0, 0, 0.58056], 77: [0, 0.69444, 0, 0, 0.97778], 78: [0, 0.69444, 0, 0, 0.79445], 79: [0, 0.69444, 0, 0, 0.79445], 80: [0, 0.69444, 0, 0, 0.70278], 81: [0.10556, 0.69444, 0, 0, 0.79445], 82: [0, 0.69444, 0, 0, 0.70278], 83: [0, 0.69444, 0, 0, 0.61111], 84: [0, 0.69444, 0, 0, 0.73334], 85: [0, 0.69444, 0, 0, 0.76389], 86: [0, 0.69444, 0.01528, 0, 0.73334], 87: [0, 0.69444, 0.01528, 0, 1.03889], 88: [0, 0.69444, 0, 0, 0.73334], 89: [0, 0.69444, 0.0275, 0, 0.73334], 90: [0, 0.69444, 0, 0, 0.67223], 91: [0.25, 0.75, 0, 0, 0.34306], 93: [0.25, 0.75, 0, 0, 0.34306], 94: [0, 0.69444, 0, 0, 0.55], 95: [0.35, 0.10833, 0.03056, 0, 0.55], 97: [0, 0.45833, 0, 0, 0.525], 98: [0, 0.69444, 0, 0, 0.56111], 99: [0, 0.45833, 0, 0, 0.48889], 100: [0, 0.69444, 0, 0, 0.56111], 101: [0, 0.45833, 0, 0, 0.51111], 102: [0, 0.69444, 0.07639, 0, 0.33611], 103: [0.19444, 0.45833, 0.01528, 0, 0.55], 104: [0, 0.69444, 0, 0, 0.56111], 105: [0, 0.69444, 0, 0, 0.25556], 106: [0.19444, 0.69444, 0, 0, 0.28611], 107: [0, 0.69444, 0, 0, 0.53056], 108: [0, 0.69444, 0, 0, 0.25556], 109: [0, 0.45833, 0, 0, 0.86667], 110: [0, 0.45833, 0, 0, 0.56111], 111: [0, 0.45833, 0, 0, 0.55], 112: [0.19444, 0.45833, 0, 0, 0.56111], 113: [0.19444, 0.45833, 0, 0, 0.56111], 114: [0, 0.45833, 0.01528, 0, 0.37222], 115: [0, 0.45833, 0, 0, 0.42167], 116: [0, 0.58929, 0, 0, 0.40417], 117: [0, 0.45833, 0, 0, 0.56111], 118: [0, 0.45833, 0.01528, 0, 0.5], 119: [0, 0.45833, 0.01528, 0, 0.74445], 120: [0, 0.45833, 0, 0, 0.5], 121: [0.19444, 0.45833, 0.01528, 0, 0.5], 122: [0, 0.45833, 0, 0, 0.47639], 126: [0.35, 0.34444, 0, 0, 0.55], 160: [0, 0, 0, 0, 0.25], 168: [0, 0.69444, 0, 0, 0.55], 176: [0, 0.69444, 0, 0, 0.73334], 180: [0, 0.69444, 0, 0, 0.55], 184: [0.17014, 0, 0, 0, 0.48889], 305: [0, 0.45833, 0, 0, 0.25556], 567: [0.19444, 0.45833, 0, 0, 0.28611], 710: [0, 0.69444, 0, 0, 0.55], 711: [0, 0.63542, 0, 0, 0.55], 713: [0, 0.63778, 0, 0, 0.55], 728: [0, 0.69444, 0, 0, 0.55], 729: [0, 0.69444, 0, 0, 0.30556], 730: [0, 0.69444, 0, 0, 0.73334], 732: [0, 0.69444, 0, 0, 0.55], 733: [0, 0.69444, 0, 0, 0.55], 915: [0, 0.69444, 0, 0, 0.58056], 916: [0, 0.69444, 0, 0, 0.91667], 920: [0, 0.69444, 0, 0, 0.85556], 923: [0, 0.69444, 0, 0, 0.67223], 926: [0, 0.69444, 0, 0, 0.73334], 928: [0, 0.69444, 0, 0, 0.79445], 931: [0, 0.69444, 0, 0, 0.79445], 933: [0, 0.69444, 0, 0, 0.85556], 934: [0, 0.69444, 0, 0, 0.79445], 936: [0, 0.69444, 0, 0, 0.85556], 937: [0, 0.69444, 0, 0, 0.79445], 8211: [0, 0.45833, 0.03056, 0, 0.55], 8212: [0, 0.45833, 0.03056, 0, 1.10001], 8216: [0, 0.69444, 0, 0, 0.30556], 8217: [0, 0.69444, 0, 0, 0.30556], 8220: [0, 0.69444, 0, 0, 0.55834], 8221: [0, 0.69444, 0, 0, 0.55834] }, "SansSerif-Italic": { 32: [0, 0, 0, 0, 0.25], 33: [0, 0.69444, 0.05733, 0, 0.31945], 34: [0, 0.69444, 316e-5, 0, 0.5], 35: [0.19444, 0.69444, 0.05087, 0, 0.83334], 36: [0.05556, 0.75, 0.11156, 0, 0.5], 37: [0.05556, 0.75, 0.03126, 0, 0.83334], 38: [0, 0.69444, 0.03058, 0, 0.75834], 39: [0, 0.69444, 0.07816, 0, 0.27778], 40: [0.25, 0.75, 0.13164, 0, 0.38889], 41: [0.25, 0.75, 0.02536, 0, 0.38889], 42: [0, 0.75, 0.11775, 0, 0.5], 43: [0.08333, 0.58333, 0.02536, 0, 0.77778], 44: [0.125, 0.08333, 0, 0, 0.27778], 45: [0, 0.44444, 0.01946, 0, 0.33333], 46: [0, 0.08333, 0, 0, 0.27778], 47: [0.25, 0.75, 0.13164, 0, 0.5], 48: [0, 0.65556, 0.11156, 0, 0.5], 49: [0, 0.65556, 0.11156, 0, 0.5], 50: [0, 0.65556, 0.11156, 0, 0.5], 51: [0, 0.65556, 0.11156, 0, 0.5], 52: [0, 0.65556, 0.11156, 0, 0.5], 53: [0, 0.65556, 0.11156, 0, 0.5], 54: [0, 0.65556, 0.11156, 0, 0.5], 55: [0, 0.65556, 0.11156, 0, 0.5], 56: [0, 0.65556, 0.11156, 0, 0.5], 57: [0, 0.65556, 0.11156, 0, 0.5], 58: [0, 0.44444, 0.02502, 0, 0.27778], 59: [0.125, 0.44444, 0.02502, 0, 0.27778], 61: [-0.13, 0.37, 0.05087, 0, 0.77778], 63: [0, 0.69444, 0.11809, 0, 0.47222], 64: [0, 0.69444, 0.07555, 0, 0.66667], 65: [0, 0.69444, 0, 0, 0.66667], 66: [0, 0.69444, 0.08293, 0, 0.66667], 67: [0, 0.69444, 0.11983, 0, 0.63889], 68: [0, 0.69444, 0.07555, 0, 0.72223], 69: [0, 0.69444, 0.11983, 0, 0.59722], 70: [0, 0.69444, 0.13372, 0, 0.56945], 71: [0, 0.69444, 0.11983, 0, 0.66667], 72: [0, 0.69444, 0.08094, 0, 0.70834], 73: [0, 0.69444, 0.13372, 0, 0.27778], 74: [0, 0.69444, 0.08094, 0, 0.47222], 75: [0, 0.69444, 0.11983, 0, 0.69445], 76: [0, 0.69444, 0, 0, 0.54167], 77: [0, 0.69444, 0.08094, 0, 0.875], 78: [0, 0.69444, 0.08094, 0, 0.70834], 79: [0, 0.69444, 0.07555, 0, 0.73611], 80: [0, 0.69444, 0.08293, 0, 0.63889], 81: [0.125, 0.69444, 0.07555, 0, 0.73611], 82: [0, 0.69444, 0.08293, 0, 0.64584], 83: [0, 0.69444, 0.09205, 0, 0.55556], 84: [0, 0.69444, 0.13372, 0, 0.68056], 85: [0, 0.69444, 0.08094, 0, 0.6875], 86: [0, 0.69444, 0.1615, 0, 0.66667], 87: [0, 0.69444, 0.1615, 0, 0.94445], 88: [0, 0.69444, 0.13372, 0, 0.66667], 89: [0, 0.69444, 0.17261, 0, 0.66667], 90: [0, 0.69444, 0.11983, 0, 0.61111], 91: [0.25, 0.75, 0.15942, 0, 0.28889], 93: [0.25, 0.75, 0.08719, 0, 0.28889], 94: [0, 0.69444, 0.0799, 0, 0.5], 95: [0.35, 0.09444, 0.08616, 0, 0.5], 97: [0, 0.44444, 981e-5, 0, 0.48056], 98: [0, 0.69444, 0.03057, 0, 0.51667], 99: [0, 0.44444, 0.08336, 0, 0.44445], 100: [0, 0.69444, 0.09483, 0, 0.51667], 101: [0, 0.44444, 0.06778, 0, 0.44445], 102: [0, 0.69444, 0.21705, 0, 0.30556], 103: [0.19444, 0.44444, 0.10836, 0, 0.5], 104: [0, 0.69444, 0.01778, 0, 0.51667], 105: [0, 0.67937, 0.09718, 0, 0.23889], 106: [0.19444, 0.67937, 0.09162, 0, 0.26667], 107: [0, 0.69444, 0.08336, 0, 0.48889], 108: [0, 0.69444, 0.09483, 0, 0.23889], 109: [0, 0.44444, 0.01778, 0, 0.79445], 110: [0, 0.44444, 0.01778, 0, 0.51667], 111: [0, 0.44444, 0.06613, 0, 0.5], 112: [0.19444, 0.44444, 0.0389, 0, 0.51667], 113: [0.19444, 0.44444, 0.04169, 0, 0.51667], 114: [0, 0.44444, 0.10836, 0, 0.34167], 115: [0, 0.44444, 0.0778, 0, 0.38333], 116: [0, 0.57143, 0.07225, 0, 0.36111], 117: [0, 0.44444, 0.04169, 0, 0.51667], 118: [0, 0.44444, 0.10836, 0, 0.46111], 119: [0, 0.44444, 0.10836, 0, 0.68334], 120: [0, 0.44444, 0.09169, 0, 0.46111], 121: [0.19444, 0.44444, 0.10836, 0, 0.46111], 122: [0, 0.44444, 0.08752, 0, 0.43472], 126: [0.35, 0.32659, 0.08826, 0, 0.5], 160: [0, 0, 0, 0, 0.25], 168: [0, 0.67937, 0.06385, 0, 0.5], 176: [0, 0.69444, 0, 0, 0.73752], 184: [0.17014, 0, 0, 0, 0.44445], 305: [0, 0.44444, 0.04169, 0, 0.23889], 567: [0.19444, 0.44444, 0.04169, 0, 0.26667], 710: [0, 0.69444, 0.0799, 0, 0.5], 711: [0, 0.63194, 0.08432, 0, 0.5], 713: [0, 0.60889, 0.08776, 0, 0.5], 714: [0, 0.69444, 0.09205, 0, 0.5], 715: [0, 0.69444, 0, 0, 0.5], 728: [0, 0.69444, 0.09483, 0, 0.5], 729: [0, 0.67937, 0.07774, 0, 0.27778], 730: [0, 0.69444, 0, 0, 0.73752], 732: [0, 0.67659, 0.08826, 0, 0.5], 733: [0, 0.69444, 0.09205, 0, 0.5], 915: [0, 0.69444, 0.13372, 0, 0.54167], 916: [0, 0.69444, 0, 0, 0.83334], 920: [0, 0.69444, 0.07555, 0, 0.77778], 923: [0, 0.69444, 0, 0, 0.61111], 926: [0, 0.69444, 0.12816, 0, 0.66667], 928: [0, 0.69444, 0.08094, 0, 0.70834], 931: [0, 0.69444, 0.11983, 0, 0.72222], 933: [0, 0.69444, 0.09031, 0, 0.77778], 934: [0, 0.69444, 0.04603, 0, 0.72222], 936: [0, 0.69444, 0.09031, 0, 0.77778], 937: [0, 0.69444, 0.08293, 0, 0.72222], 8211: [0, 0.44444, 0.08616, 0, 0.5], 8212: [0, 0.44444, 0.08616, 0, 1], 8216: [0, 0.69444, 0.07816, 0, 0.27778], 8217: [0, 0.69444, 0.07816, 0, 0.27778], 8220: [0, 0.69444, 0.14205, 0, 0.5], 8221: [0, 0.69444, 316e-5, 0, 0.5] }, "SansSerif-Regular": { 32: [0, 0, 0, 0, 0.25], 33: [0, 0.69444, 0, 0, 0.31945], 34: [0, 0.69444, 0, 0, 0.5], 35: [0.19444, 0.69444, 0, 0, 0.83334], 36: [0.05556, 0.75, 0, 0, 0.5], 37: [0.05556, 0.75, 0, 0, 0.83334], 38: [0, 0.69444, 0, 0, 0.75834], 39: [0, 0.69444, 0, 0, 0.27778], 40: [0.25, 0.75, 0, 0, 0.38889], 41: [0.25, 0.75, 0, 0, 0.38889], 42: [0, 0.75, 0, 0, 0.5], 43: [0.08333, 0.58333, 0, 0, 0.77778], 44: [0.125, 0.08333, 0, 0, 0.27778], 45: [0, 0.44444, 0, 0, 0.33333], 46: [0, 0.08333, 0, 0, 0.27778], 47: [0.25, 0.75, 0, 0, 0.5], 48: [0, 0.65556, 0, 0, 0.5], 49: [0, 0.65556, 0, 0, 0.5], 50: [0, 0.65556, 0, 0, 0.5], 51: [0, 0.65556, 0, 0, 0.5], 52: [0, 0.65556, 0, 0, 0.5], 53: [0, 0.65556, 0, 0, 0.5], 54: [0, 0.65556, 0, 0, 0.5], 55: [0, 0.65556, 0, 0, 0.5], 56: [0, 0.65556, 0, 0, 0.5], 57: [0, 0.65556, 0, 0, 0.5], 58: [0, 0.44444, 0, 0, 0.27778], 59: [0.125, 0.44444, 0, 0, 0.27778], 61: [-0.13, 0.37, 0, 0, 0.77778], 63: [0, 0.69444, 0, 0, 0.47222], 64: [0, 0.69444, 0, 0, 0.66667], 65: [0, 0.69444, 0, 0, 0.66667], 66: [0, 0.69444, 0, 0, 0.66667], 67: [0, 0.69444, 0, 0, 0.63889], 68: [0, 0.69444, 0, 0, 0.72223], 69: [0, 0.69444, 0, 0, 0.59722], 70: [0, 0.69444, 0, 0, 0.56945], 71: [0, 0.69444, 0, 0, 0.66667], 72: [0, 0.69444, 0, 0, 0.70834], 73: [0, 0.69444, 0, 0, 0.27778], 74: [0, 0.69444, 0, 0, 0.47222], 75: [0, 0.69444, 0, 0, 0.69445], 76: [0, 0.69444, 0, 0, 0.54167], 77: [0, 0.69444, 0, 0, 0.875], 78: [0, 0.69444, 0, 0, 0.70834], 79: [0, 0.69444, 0, 0, 0.73611], 80: [0, 0.69444, 0, 0, 0.63889], 81: [0.125, 0.69444, 0, 0, 0.73611], 82: [0, 0.69444, 0, 0, 0.64584], 83: [0, 0.69444, 0, 0, 0.55556], 84: [0, 0.69444, 0, 0, 0.68056], 85: [0, 0.69444, 0, 0, 0.6875], 86: [0, 0.69444, 0.01389, 0, 0.66667], 87: [0, 0.69444, 0.01389, 0, 0.94445], 88: [0, 0.69444, 0, 0, 0.66667], 89: [0, 0.69444, 0.025, 0, 0.66667], 90: [0, 0.69444, 0, 0, 0.61111], 91: [0.25, 0.75, 0, 0, 0.28889], 93: [0.25, 0.75, 0, 0, 0.28889], 94: [0, 0.69444, 0, 0, 0.5], 95: [0.35, 0.09444, 0.02778, 0, 0.5], 97: [0, 0.44444, 0, 0, 0.48056], 98: [0, 0.69444, 0, 0, 0.51667], 99: [0, 0.44444, 0, 0, 0.44445], 100: [0, 0.69444, 0, 0, 0.51667], 101: [0, 0.44444, 0, 0, 0.44445], 102: [0, 0.69444, 0.06944, 0, 0.30556], 103: [0.19444, 0.44444, 0.01389, 0, 0.5], 104: [0, 0.69444, 0, 0, 0.51667], 105: [0, 0.67937, 0, 0, 0.23889], 106: [0.19444, 0.67937, 0, 0, 0.26667], 107: [0, 0.69444, 0, 0, 0.48889], 108: [0, 0.69444, 0, 0, 0.23889], 109: [0, 0.44444, 0, 0, 0.79445], 110: [0, 0.44444, 0, 0, 0.51667], 111: [0, 0.44444, 0, 0, 0.5], 112: [0.19444, 0.44444, 0, 0, 0.51667], 113: [0.19444, 0.44444, 0, 0, 0.51667], 114: [0, 0.44444, 0.01389, 0, 0.34167], 115: [0, 0.44444, 0, 0, 0.38333], 116: [0, 0.57143, 0, 0, 0.36111], 117: [0, 0.44444, 0, 0, 0.51667], 118: [0, 0.44444, 0.01389, 0, 0.46111], 119: [0, 0.44444, 0.01389, 0, 0.68334], 120: [0, 0.44444, 0, 0, 0.46111], 121: [0.19444, 0.44444, 0.01389, 0, 0.46111], 122: [0, 0.44444, 0, 0, 0.43472], 126: [0.35, 0.32659, 0, 0, 0.5], 160: [0, 0, 0, 0, 0.25], 168: [0, 0.67937, 0, 0, 0.5], 176: [0, 0.69444, 0, 0, 0.66667], 184: [0.17014, 0, 0, 0, 0.44445], 305: [0, 0.44444, 0, 0, 0.23889], 567: [0.19444, 0.44444, 0, 0, 0.26667], 710: [0, 0.69444, 0, 0, 0.5], 711: [0, 0.63194, 0, 0, 0.5], 713: [0, 0.60889, 0, 0, 0.5], 714: [0, 0.69444, 0, 0, 0.5], 715: [0, 0.69444, 0, 0, 0.5], 728: [0, 0.69444, 0, 0, 0.5], 729: [0, 0.67937, 0, 0, 0.27778], 730: [0, 0.69444, 0, 0, 0.66667], 732: [0, 0.67659, 0, 0, 0.5], 733: [0, 0.69444, 0, 0, 0.5], 915: [0, 0.69444, 0, 0, 0.54167], 916: [0, 0.69444, 0, 0, 0.83334], 920: [0, 0.69444, 0, 0, 0.77778], 923: [0, 0.69444, 0, 0, 0.61111], 926: [0, 0.69444, 0, 0, 0.66667], 928: [0, 0.69444, 0, 0, 0.70834], 931: [0, 0.69444, 0, 0, 0.72222], 933: [0, 0.69444, 0, 0, 0.77778], 934: [0, 0.69444, 0, 0, 0.72222], 936: [0, 0.69444, 0, 0, 0.77778], 937: [0, 0.69444, 0, 0, 0.72222], 8211: [0, 0.44444, 0.02778, 0, 0.5], 8212: [0, 0.44444, 0.02778, 0, 1], 8216: [0, 0.69444, 0, 0, 0.27778], 8217: [0, 0.69444, 0, 0, 0.27778], 8220: [0, 0.69444, 0, 0, 0.5], 8221: [0, 0.69444, 0, 0, 0.5] }, "Script-Regular": { 32: [0, 0, 0, 0, 0.25], 65: [0, 0.7, 0.22925, 0, 0.80253], 66: [0, 0.7, 0.04087, 0, 0.90757], 67: [0, 0.7, 0.1689, 0, 0.66619], 68: [0, 0.7, 0.09371, 0, 0.77443], 69: [0, 0.7, 0.18583, 0, 0.56162], 70: [0, 0.7, 0.13634, 0, 0.89544], 71: [0, 0.7, 0.17322, 0, 0.60961], 72: [0, 0.7, 0.29694, 0, 0.96919], 73: [0, 0.7, 0.19189, 0, 0.80907], 74: [0.27778, 0.7, 0.19189, 0, 1.05159], 75: [0, 0.7, 0.31259, 0, 0.91364], 76: [0, 0.7, 0.19189, 0, 0.87373], 77: [0, 0.7, 0.15981, 0, 1.08031], 78: [0, 0.7, 0.3525, 0, 0.9015], 79: [0, 0.7, 0.08078, 0, 0.73787], 80: [0, 0.7, 0.08078, 0, 1.01262], 81: [0, 0.7, 0.03305, 0, 0.88282], 82: [0, 0.7, 0.06259, 0, 0.85], 83: [0, 0.7, 0.19189, 0, 0.86767], 84: [0, 0.7, 0.29087, 0, 0.74697], 85: [0, 0.7, 0.25815, 0, 0.79996], 86: [0, 0.7, 0.27523, 0, 0.62204], 87: [0, 0.7, 0.27523, 0, 0.80532], 88: [0, 0.7, 0.26006, 0, 0.94445], 89: [0, 0.7, 0.2939, 0, 0.70961], 90: [0, 0.7, 0.24037, 0, 0.8212], 160: [0, 0, 0, 0, 0.25] }, "Size1-Regular": { 32: [0, 0, 0, 0, 0.25], 40: [0.35001, 0.85, 0, 0, 0.45834], 41: [0.35001, 0.85, 0, 0, 0.45834], 47: [0.35001, 0.85, 0, 0, 0.57778], 91: [0.35001, 0.85, 0, 0, 0.41667], 92: [0.35001, 0.85, 0, 0, 0.57778], 93: [0.35001, 0.85, 0, 0, 0.41667], 123: [0.35001, 0.85, 0, 0, 0.58334], 125: [0.35001, 0.85, 0, 0, 0.58334], 160: [0, 0, 0, 0, 0.25], 710: [0, 0.72222, 0, 0, 0.55556], 732: [0, 0.72222, 0, 0, 0.55556], 770: [0, 0.72222, 0, 0, 0.55556], 771: [0, 0.72222, 0, 0, 0.55556], 8214: [-99e-5, 0.601, 0, 0, 0.77778], 8593: [1e-5, 0.6, 0, 0, 0.66667], 8595: [1e-5, 0.6, 0, 0, 0.66667], 8657: [1e-5, 0.6, 0, 0, 0.77778], 8659: [1e-5, 0.6, 0, 0, 0.77778], 8719: [0.25001, 0.75, 0, 0, 0.94445], 8720: [0.25001, 0.75, 0, 0, 0.94445], 8721: [0.25001, 0.75, 0, 0, 1.05556], 8730: [0.35001, 0.85, 0, 0, 1], 8739: [-599e-5, 0.606, 0, 0, 0.33333], 8741: [-599e-5, 0.606, 0, 0, 0.55556], 8747: [0.30612, 0.805, 0.19445, 0, 0.47222], 8748: [0.306, 0.805, 0.19445, 0, 0.47222], 8749: [0.306, 0.805, 0.19445, 0, 0.47222], 8750: [0.30612, 0.805, 0.19445, 0, 0.47222], 8896: [0.25001, 0.75, 0, 0, 0.83334], 8897: [0.25001, 0.75, 0, 0, 0.83334], 8898: [0.25001, 0.75, 0, 0, 0.83334], 8899: [0.25001, 0.75, 0, 0, 0.83334], 8968: [0.35001, 0.85, 0, 0, 0.47222], 8969: [0.35001, 0.85, 0, 0, 0.47222], 8970: [0.35001, 0.85, 0, 0, 0.47222], 8971: [0.35001, 0.85, 0, 0, 0.47222], 9168: [-99e-5, 0.601, 0, 0, 0.66667], 10216: [0.35001, 0.85, 0, 0, 0.47222], 10217: [0.35001, 0.85, 0, 0, 0.47222], 10752: [0.25001, 0.75, 0, 0, 1.11111], 10753: [0.25001, 0.75, 0, 0, 1.11111], 10754: [0.25001, 0.75, 0, 0, 1.11111], 10756: [0.25001, 0.75, 0, 0, 0.83334], 10758: [0.25001, 0.75, 0, 0, 0.83334] }, "Size2-Regular": { 32: [0, 0, 0, 0, 0.25], 40: [0.65002, 1.15, 0, 0, 0.59722], 41: [0.65002, 1.15, 0, 0, 0.59722], 47: [0.65002, 1.15, 0, 0, 0.81111], 91: [0.65002, 1.15, 0, 0, 0.47222], 92: [0.65002, 1.15, 0, 0, 0.81111], 93: [0.65002, 1.15, 0, 0, 0.47222], 123: [0.65002, 1.15, 0, 0, 0.66667], 125: [0.65002, 1.15, 0, 0, 0.66667], 160: [0, 0, 0, 0, 0.25], 710: [0, 0.75, 0, 0, 1], 732: [0, 0.75, 0, 0, 1], 770: [0, 0.75, 0, 0, 1], 771: [0, 0.75, 0, 0, 1], 8719: [0.55001, 1.05, 0, 0, 1.27778], 8720: [0.55001, 1.05, 0, 0, 1.27778], 8721: [0.55001, 1.05, 0, 0, 1.44445], 8730: [0.65002, 1.15, 0, 0, 1], 8747: [0.86225, 1.36, 0.44445, 0, 0.55556], 8748: [0.862, 1.36, 0.44445, 0, 0.55556], 8749: [0.862, 1.36, 0.44445, 0, 0.55556], 8750: [0.86225, 1.36, 0.44445, 0, 0.55556], 8896: [0.55001, 1.05, 0, 0, 1.11111], 8897: [0.55001, 1.05, 0, 0, 1.11111], 8898: [0.55001, 1.05, 0, 0, 1.11111], 8899: [0.55001, 1.05, 0, 0, 1.11111], 8968: [0.65002, 1.15, 0, 0, 0.52778], 8969: [0.65002, 1.15, 0, 0, 0.52778], 8970: [0.65002, 1.15, 0, 0, 0.52778], 8971: [0.65002, 1.15, 0, 0, 0.52778], 10216: [0.65002, 1.15, 0, 0, 0.61111], 10217: [0.65002, 1.15, 0, 0, 0.61111], 10752: [0.55001, 1.05, 0, 0, 1.51112], 10753: [0.55001, 1.05, 0, 0, 1.51112], 10754: [0.55001, 1.05, 0, 0, 1.51112], 10756: [0.55001, 1.05, 0, 0, 1.11111], 10758: [0.55001, 1.05, 0, 0, 1.11111] }, "Size3-Regular": { 32: [0, 0, 0, 0, 0.25], 40: [0.95003, 1.45, 0, 0, 0.73611], 41: [0.95003, 1.45, 0, 0, 0.73611], 47: [0.95003, 1.45, 0, 0, 1.04445], 91: [0.95003, 1.45, 0, 0, 0.52778], 92: [0.95003, 1.45, 0, 0, 1.04445], 93: [0.95003, 1.45, 0, 0, 0.52778], 123: [0.95003, 1.45, 0, 0, 0.75], 125: [0.95003, 1.45, 0, 0, 0.75], 160: [0, 0, 0, 0, 0.25], 710: [0, 0.75, 0, 0, 1.44445], 732: [0, 0.75, 0, 0, 1.44445], 770: [0, 0.75, 0, 0, 1.44445], 771: [0, 0.75, 0, 0, 1.44445], 8730: [0.95003, 1.45, 0, 0, 1], 8968: [0.95003, 1.45, 0, 0, 0.58334], 8969: [0.95003, 1.45, 0, 0, 0.58334], 8970: [0.95003, 1.45, 0, 0, 0.58334], 8971: [0.95003, 1.45, 0, 0, 0.58334], 10216: [0.95003, 1.45, 0, 0, 0.75], 10217: [0.95003, 1.45, 0, 0, 0.75] }, "Size4-Regular": { 32: [0, 0, 0, 0, 0.25], 40: [1.25003, 1.75, 0, 0, 0.79167], 41: [1.25003, 1.75, 0, 0, 0.79167], 47: [1.25003, 1.75, 0, 0, 1.27778], 91: [1.25003, 1.75, 0, 0, 0.58334], 92: [1.25003, 1.75, 0, 0, 1.27778], 93: [1.25003, 1.75, 0, 0, 0.58334], 123: [1.25003, 1.75, 0, 0, 0.80556], 125: [1.25003, 1.75, 0, 0, 0.80556], 160: [0, 0, 0, 0, 0.25], 710: [0, 0.825, 0, 0, 1.8889], 732: [0, 0.825, 0, 0, 1.8889], 770: [0, 0.825, 0, 0, 1.8889], 771: [0, 0.825, 0, 0, 1.8889], 8730: [1.25003, 1.75, 0, 0, 1], 8968: [1.25003, 1.75, 0, 0, 0.63889], 8969: [1.25003, 1.75, 0, 0, 0.63889], 8970: [1.25003, 1.75, 0, 0, 0.63889], 8971: [1.25003, 1.75, 0, 0, 0.63889], 9115: [0.64502, 1.155, 0, 0, 0.875], 9116: [1e-5, 0.6, 0, 0, 0.875], 9117: [0.64502, 1.155, 0, 0, 0.875], 9118: [0.64502, 1.155, 0, 0, 0.875], 9119: [1e-5, 0.6, 0, 0, 0.875], 9120: [0.64502, 1.155, 0, 0, 0.875], 9121: [0.64502, 1.155, 0, 0, 0.66667], 9122: [-99e-5, 0.601, 0, 0, 0.66667], 9123: [0.64502, 1.155, 0, 0, 0.66667], 9124: [0.64502, 1.155, 0, 0, 0.66667], 9125: [-99e-5, 0.601, 0, 0, 0.66667], 9126: [0.64502, 1.155, 0, 0, 0.66667], 9127: [1e-5, 0.9, 0, 0, 0.88889], 9128: [0.65002, 1.15, 0, 0, 0.88889], 9129: [0.90001, 0, 0, 0, 0.88889], 9130: [0, 0.3, 0, 0, 0.88889], 9131: [1e-5, 0.9, 0, 0, 0.88889], 9132: [0.65002, 1.15, 0, 0, 0.88889], 9133: [0.90001, 0, 0, 0, 0.88889], 9143: [0.88502, 0.915, 0, 0, 1.05556], 10216: [1.25003, 1.75, 0, 0, 0.80556], 10217: [1.25003, 1.75, 0, 0, 0.80556], 57344: [-499e-5, 0.605, 0, 0, 1.05556], 57345: [-499e-5, 0.605, 0, 0, 1.05556], 57680: [0, 0.12, 0, 0, 0.45], 57681: [0, 0.12, 0, 0, 0.45], 57682: [0, 0.12, 0, 0, 0.45], 57683: [0, 0.12, 0, 0, 0.45] }, "Typewriter-Regular": { 32: [0, 0, 0, 0, 0.525], 33: [0, 0.61111, 0, 0, 0.525], 34: [0, 0.61111, 0, 0, 0.525], 35: [0, 0.61111, 0, 0, 0.525], 36: [0.08333, 0.69444, 0, 0, 0.525], 37: [0.08333, 0.69444, 0, 0, 0.525], 38: [0, 0.61111, 0, 0, 0.525], 39: [0, 0.61111, 0, 0, 0.525], 40: [0.08333, 0.69444, 0, 0, 0.525], 41: [0.08333, 0.69444, 0, 0, 0.525], 42: [0, 0.52083, 0, 0, 0.525], 43: [-0.08056, 0.53055, 0, 0, 0.525], 44: [0.13889, 0.125, 0, 0, 0.525], 45: [-0.08056, 0.53055, 0, 0, 0.525], 46: [0, 0.125, 0, 0, 0.525], 47: [0.08333, 0.69444, 0, 0, 0.525], 48: [0, 0.61111, 0, 0, 0.525], 49: [0, 0.61111, 0, 0, 0.525], 50: [0, 0.61111, 0, 0, 0.525], 51: [0, 0.61111, 0, 0, 0.525], 52: [0, 0.61111, 0, 0, 0.525], 53: [0, 0.61111, 0, 0, 0.525], 54: [0, 0.61111, 0, 0, 0.525], 55: [0, 0.61111, 0, 0, 0.525], 56: [0, 0.61111, 0, 0, 0.525], 57: [0, 0.61111, 0, 0, 0.525], 58: [0, 0.43056, 0, 0, 0.525], 59: [0.13889, 0.43056, 0, 0, 0.525], 60: [-0.05556, 0.55556, 0, 0, 0.525], 61: [-0.19549, 0.41562, 0, 0, 0.525], 62: [-0.05556, 0.55556, 0, 0, 0.525], 63: [0, 0.61111, 0, 0, 0.525], 64: [0, 0.61111, 0, 0, 0.525], 65: [0, 0.61111, 0, 0, 0.525], 66: [0, 0.61111, 0, 0, 0.525], 67: [0, 0.61111, 0, 0, 0.525], 68: [0, 0.61111, 0, 0, 0.525], 69: [0, 0.61111, 0, 0, 0.525], 70: [0, 0.61111, 0, 0, 0.525], 71: [0, 0.61111, 0, 0, 0.525], 72: [0, 0.61111, 0, 0, 0.525], 73: [0, 0.61111, 0, 0, 0.525], 74: [0, 0.61111, 0, 0, 0.525], 75: [0, 0.61111, 0, 0, 0.525], 76: [0, 0.61111, 0, 0, 0.525], 77: [0, 0.61111, 0, 0, 0.525], 78: [0, 0.61111, 0, 0, 0.525], 79: [0, 0.61111, 0, 0, 0.525], 80: [0, 0.61111, 0, 0, 0.525], 81: [0.13889, 0.61111, 0, 0, 0.525], 82: [0, 0.61111, 0, 0, 0.525], 83: [0, 0.61111, 0, 0, 0.525], 84: [0, 0.61111, 0, 0, 0.525], 85: [0, 0.61111, 0, 0, 0.525], 86: [0, 0.61111, 0, 0, 0.525], 87: [0, 0.61111, 0, 0, 0.525], 88: [0, 0.61111, 0, 0, 0.525], 89: [0, 0.61111, 0, 0, 0.525], 90: [0, 0.61111, 0, 0, 0.525], 91: [0.08333, 0.69444, 0, 0, 0.525], 92: [0.08333, 0.69444, 0, 0, 0.525], 93: [0.08333, 0.69444, 0, 0, 0.525], 94: [0, 0.61111, 0, 0, 0.525], 95: [0.09514, 0, 0, 0, 0.525], 96: [0, 0.61111, 0, 0, 0.525], 97: [0, 0.43056, 0, 0, 0.525], 98: [0, 0.61111, 0, 0, 0.525], 99: [0, 0.43056, 0, 0, 0.525], 100: [0, 0.61111, 0, 0, 0.525], 101: [0, 0.43056, 0, 0, 0.525], 102: [0, 0.61111, 0, 0, 0.525], 103: [0.22222, 0.43056, 0, 0, 0.525], 104: [0, 0.61111, 0, 0, 0.525], 105: [0, 0.61111, 0, 0, 0.525], 106: [0.22222, 0.61111, 0, 0, 0.525], 107: [0, 0.61111, 0, 0, 0.525], 108: [0, 0.61111, 0, 0, 0.525], 109: [0, 0.43056, 0, 0, 0.525], 110: [0, 0.43056, 0, 0, 0.525], 111: [0, 0.43056, 0, 0, 0.525], 112: [0.22222, 0.43056, 0, 0, 0.525], 113: [0.22222, 0.43056, 0, 0, 0.525], 114: [0, 0.43056, 0, 0, 0.525], 115: [0, 0.43056, 0, 0, 0.525], 116: [0, 0.55358, 0, 0, 0.525], 117: [0, 0.43056, 0, 0, 0.525], 118: [0, 0.43056, 0, 0, 0.525], 119: [0, 0.43056, 0, 0, 0.525], 120: [0, 0.43056, 0, 0, 0.525], 121: [0.22222, 0.43056, 0, 0, 0.525], 122: [0, 0.43056, 0, 0, 0.525], 123: [0.08333, 0.69444, 0, 0, 0.525], 124: [0.08333, 0.69444, 0, 0, 0.525], 125: [0.08333, 0.69444, 0, 0, 0.525], 126: [0, 0.61111, 0, 0, 0.525], 127: [0, 0.61111, 0, 0, 0.525], 160: [0, 0, 0, 0, 0.525], 176: [0, 0.61111, 0, 0, 0.525], 184: [0.19445, 0, 0, 0, 0.525], 305: [0, 0.43056, 0, 0, 0.525], 567: [0.22222, 0.43056, 0, 0, 0.525], 711: [0, 0.56597, 0, 0, 0.525], 713: [0, 0.56555, 0, 0, 0.525], 714: [0, 0.61111, 0, 0, 0.525], 715: [0, 0.61111, 0, 0, 0.525], 728: [0, 0.61111, 0, 0, 0.525], 730: [0, 0.61111, 0, 0, 0.525], 770: [0, 0.61111, 0, 0, 0.525], 771: [0, 0.61111, 0, 0, 0.525], 776: [0, 0.61111, 0, 0, 0.525], 915: [0, 0.61111, 0, 0, 0.525], 916: [0, 0.61111, 0, 0, 0.525], 920: [0, 0.61111, 0, 0, 0.525], 923: [0, 0.61111, 0, 0, 0.525], 926: [0, 0.61111, 0, 0, 0.525], 928: [0, 0.61111, 0, 0, 0.525], 931: [0, 0.61111, 0, 0, 0.525], 933: [0, 0.61111, 0, 0, 0.525], 934: [0, 0.61111, 0, 0, 0.525], 936: [0, 0.61111, 0, 0, 0.525], 937: [0, 0.61111, 0, 0, 0.525], 8216: [0, 0.61111, 0, 0, 0.525], 8217: [0, 0.61111, 0, 0, 0.525], 8242: [0, 0.61111, 0, 0, 0.525], 9251: [0.11111, 0.21944, 0, 0, 0.525] } }, l0 = { slant: [0.25, 0.25, 0.25], space: [0, 0, 0], stretch: [0, 0, 0], shrink: [0, 0, 0], xHeight: [0.431, 0.431, 0.431], quad: [1, 1.171, 1.472], extraSpace: [0, 0, 0], num1: [0.677, 0.732, 0.925], num2: [0.394, 0.384, 0.387], num3: [0.444, 0.471, 0.504], denom1: [0.686, 0.752, 1.025], denom2: [0.345, 0.344, 0.532], sup1: [0.413, 0.503, 0.504], sup2: [0.363, 0.431, 0.404], sup3: [0.289, 0.286, 0.294], sub1: [0.15, 0.143, 0.2], sub2: [0.247, 0.286, 0.4], supDrop: [0.386, 0.353, 0.494], subDrop: [0.05, 0.071, 0.1], delim1: [2.39, 1.7, 1.98], delim2: [1.01, 1.157, 1.42], axisHeight: [0.25, 0.25, 0.25], defaultRuleThickness: [0.04, 0.049, 0.049], bigOpSpacing1: [0.111, 0.111, 0.111], bigOpSpacing2: [0.166, 0.166, 0.166], bigOpSpacing3: [0.2, 0.2, 0.2], bigOpSpacing4: [0.6, 0.611, 0.611], bigOpSpacing5: [0.1, 0.143, 0.143], sqrtRuleThickness: [0.04, 0.04, 0.04], ptPerEm: [10, 10, 10], doubleRuleSep: [0.2, 0.2, 0.2], arrayRuleWidth: [0.04, 0.04, 0.04], fboxsep: [0.3, 0.3, 0.3], fboxrule: [0.04, 0.04, 0.04] }, Fn = { \u00C5: "A", \u00D0: "D", \u00DE: "o", \u00E5: "a", \u00F0: "d", \u00FE: "o", \u0410: "A", \u0411: "B", \u0412: "B", \u0413: "F", \u0414: "A", \u0415: "E", \u0416: "K", \u0417: "3", \u0418: "N", \u0419: "N", \u041A: "K", \u041B: "N", \u041C: "M", \u041D: "H", \u041E: "O", \u041F: "N", \u0420: "P", \u0421: "C", \u0422: "T", \u0423: "y", \u0424: "O", \u0425: "X", \u0426: "U", \u0427: "h", \u0428: "W", \u0429: "W", \u042A: "B", \u042B: "X", \u042C: "B", \u042D: "3", \u042E: "X", \u042F: "R", \u0430: "a", \u0431: "b", \u0432: "a", \u0433: "r", \u0434: "y", \u0435: "e", \u0436: "m", \u0437: "e", \u0438: "n", \u0439: "n", \u043A: "n", \u043B: "n", \u043C: "m", \u043D: "n", \u043E: "o", \u043F: "n", \u0440: "p", \u0441: "c", \u0442: "o", \u0443: "y", \u0444: "b", \u0445: "x", \u0446: "n", \u0447: "n", \u0448: "w", \u0449: "w", \u044A: "a", \u044B: "m", \u044C: "a", \u044D: "e", \u044E: "m", \u044F: "r" };
function sl(r, e) {
  Re[r] = e;
}
function jr(r, e, t) {
  if (!Re[e]) throw new Error("Font metrics not found for font: " + e + ".");
  var n = r.charCodeAt(0), a = Re[e][n];
  if (!a && r[0] in Fn && (n = Fn[r[0]].charCodeAt(0), a = Re[e][n]), !a && t === "text" && Fa(n) && (a = Re[e][77]), a) return { depth: a[0], height: a[1], italic: a[2], skew: a[3], width: a[4] };
}
var Z0 = {};
function ll(r) {
  var e;
  if (r >= 5 ? e = 0 : r >= 3 ? e = 1 : e = 2, !Z0[e]) {
    var t = Z0[e] = { cssEmPerMu: l0.quad[e] / 18 };
    for (var n in l0) l0.hasOwnProperty(n) && (t[n] = l0[n][e]);
  }
  return Z0[e];
}
var Z = { math: {}, text: {} };
function o(r, e, t, n, a, i) {
  Z[r][a] = { font: e, group: t, replace: n }, i && n && (Z[r][n] = Z[r][a]);
}
var u = "math", S = "text", d = "main", g = "ams", K = "accent-token", I = "bin", ge = "close", Pt = "inner", q = "mathord", ie = "op-token", Te = "open", Qt = "punct", v = "rel", We = "spacing", y = "textord";
o(u, d, v, "\u2261", "\\equiv", true);
o(u, d, v, "\u227A", "\\prec", true);
o(u, d, v, "\u227B", "\\succ", true);
o(u, d, v, "\u223C", "\\sim", true);
o(u, d, v, "\u22A5", "\\perp");
o(u, d, v, "\u2AAF", "\\preceq", true);
o(u, d, v, "\u2AB0", "\\succeq", true);
o(u, d, v, "\u2243", "\\simeq", true);
o(u, d, v, "\u2223", "\\mid", true);
o(u, d, v, "\u226A", "\\ll", true);
o(u, d, v, "\u226B", "\\gg", true);
o(u, d, v, "\u224D", "\\asymp", true);
o(u, d, v, "\u2225", "\\parallel");
o(u, d, v, "\u22C8", "\\bowtie", true);
o(u, d, v, "\u2323", "\\smile", true);
o(u, d, v, "\u2291", "\\sqsubseteq", true);
o(u, d, v, "\u2292", "\\sqsupseteq", true);
o(u, d, v, "\u2250", "\\doteq", true);
o(u, d, v, "\u2322", "\\frown", true);
o(u, d, v, "\u220B", "\\ni", true);
o(u, d, v, "\u221D", "\\propto", true);
o(u, d, v, "\u22A2", "\\vdash", true);
o(u, d, v, "\u22A3", "\\dashv", true);
o(u, d, v, "\u220B", "\\owns");
o(u, d, Qt, ".", "\\ldotp");
o(u, d, Qt, "\u22C5", "\\cdotp");
o(u, d, Qt, "\u22C5", "\xB7");
o(S, d, y, "\u22C5", "\xB7");
o(u, d, y, "#", "\\#");
o(S, d, y, "#", "\\#");
o(u, d, y, "&", "\\&");
o(S, d, y, "&", "\\&");
o(u, d, y, "\u2135", "\\aleph", true);
o(u, d, y, "\u2200", "\\forall", true);
o(u, d, y, "\u210F", "\\hbar", true);
o(u, d, y, "\u2203", "\\exists", true);
o(u, d, y, "\u2207", "\\nabla", true);
o(u, d, y, "\u266D", "\\flat", true);
o(u, d, y, "\u2113", "\\ell", true);
o(u, d, y, "\u266E", "\\natural", true);
o(u, d, y, "\u2663", "\\clubsuit", true);
o(u, d, y, "\u2118", "\\wp", true);
o(u, d, y, "\u266F", "\\sharp", true);
o(u, d, y, "\u2662", "\\diamondsuit", true);
o(u, d, y, "\u211C", "\\Re", true);
o(u, d, y, "\u2661", "\\heartsuit", true);
o(u, d, y, "\u2111", "\\Im", true);
o(u, d, y, "\u2660", "\\spadesuit", true);
o(u, d, y, "\xA7", "\\S", true);
o(S, d, y, "\xA7", "\\S");
o(u, d, y, "\xB6", "\\P", true);
o(S, d, y, "\xB6", "\\P");
o(u, d, y, "\u2020", "\\dag");
o(S, d, y, "\u2020", "\\dag");
o(S, d, y, "\u2020", "\\textdagger");
o(u, d, y, "\u2021", "\\ddag");
o(S, d, y, "\u2021", "\\ddag");
o(S, d, y, "\u2021", "\\textdaggerdbl");
o(u, d, ge, "\u23B1", "\\rmoustache", true);
o(u, d, Te, "\u23B0", "\\lmoustache", true);
o(u, d, ge, "\u27EF", "\\rgroup", true);
o(u, d, Te, "\u27EE", "\\lgroup", true);
o(u, d, I, "\u2213", "\\mp", true);
o(u, d, I, "\u2296", "\\ominus", true);
o(u, d, I, "\u228E", "\\uplus", true);
o(u, d, I, "\u2293", "\\sqcap", true);
o(u, d, I, "\u2217", "\\ast");
o(u, d, I, "\u2294", "\\sqcup", true);
o(u, d, I, "\u25EF", "\\bigcirc", true);
o(u, d, I, "\u2219", "\\bullet", true);
o(u, d, I, "\u2021", "\\ddagger");
o(u, d, I, "\u2240", "\\wr", true);
o(u, d, I, "\u2A3F", "\\amalg");
o(u, d, I, "&", "\\And");
o(u, d, v, "\u27F5", "\\longleftarrow", true);
o(u, d, v, "\u21D0", "\\Leftarrow", true);
o(u, d, v, "\u27F8", "\\Longleftarrow", true);
o(u, d, v, "\u27F6", "\\longrightarrow", true);
o(u, d, v, "\u21D2", "\\Rightarrow", true);
o(u, d, v, "\u27F9", "\\Longrightarrow", true);
o(u, d, v, "\u2194", "\\leftrightarrow", true);
o(u, d, v, "\u27F7", "\\longleftrightarrow", true);
o(u, d, v, "\u21D4", "\\Leftrightarrow", true);
o(u, d, v, "\u27FA", "\\Longleftrightarrow", true);
o(u, d, v, "\u21A6", "\\mapsto", true);
o(u, d, v, "\u27FC", "\\longmapsto", true);
o(u, d, v, "\u2197", "\\nearrow", true);
o(u, d, v, "\u21A9", "\\hookleftarrow", true);
o(u, d, v, "\u21AA", "\\hookrightarrow", true);
o(u, d, v, "\u2198", "\\searrow", true);
o(u, d, v, "\u21BC", "\\leftharpoonup", true);
o(u, d, v, "\u21C0", "\\rightharpoonup", true);
o(u, d, v, "\u2199", "\\swarrow", true);
o(u, d, v, "\u21BD", "\\leftharpoondown", true);
o(u, d, v, "\u21C1", "\\rightharpoondown", true);
o(u, d, v, "\u2196", "\\nwarrow", true);
o(u, d, v, "\u21CC", "\\rightleftharpoons", true);
o(u, g, v, "\u226E", "\\nless", true);
o(u, g, v, "\uE010", "\\@nleqslant");
o(u, g, v, "\uE011", "\\@nleqq");
o(u, g, v, "\u2A87", "\\lneq", true);
o(u, g, v, "\u2268", "\\lneqq", true);
o(u, g, v, "\uE00C", "\\@lvertneqq");
o(u, g, v, "\u22E6", "\\lnsim", true);
o(u, g, v, "\u2A89", "\\lnapprox", true);
o(u, g, v, "\u2280", "\\nprec", true);
o(u, g, v, "\u22E0", "\\npreceq", true);
o(u, g, v, "\u22E8", "\\precnsim", true);
o(u, g, v, "\u2AB9", "\\precnapprox", true);
o(u, g, v, "\u2241", "\\nsim", true);
o(u, g, v, "\uE006", "\\@nshortmid");
o(u, g, v, "\u2224", "\\nmid", true);
o(u, g, v, "\u22AC", "\\nvdash", true);
o(u, g, v, "\u22AD", "\\nvDash", true);
o(u, g, v, "\u22EA", "\\ntriangleleft");
o(u, g, v, "\u22EC", "\\ntrianglelefteq", true);
o(u, g, v, "\u228A", "\\subsetneq", true);
o(u, g, v, "\uE01A", "\\@varsubsetneq");
o(u, g, v, "\u2ACB", "\\subsetneqq", true);
o(u, g, v, "\uE017", "\\@varsubsetneqq");
o(u, g, v, "\u226F", "\\ngtr", true);
o(u, g, v, "\uE00F", "\\@ngeqslant");
o(u, g, v, "\uE00E", "\\@ngeqq");
o(u, g, v, "\u2A88", "\\gneq", true);
o(u, g, v, "\u2269", "\\gneqq", true);
o(u, g, v, "\uE00D", "\\@gvertneqq");
o(u, g, v, "\u22E7", "\\gnsim", true);
o(u, g, v, "\u2A8A", "\\gnapprox", true);
o(u, g, v, "\u2281", "\\nsucc", true);
o(u, g, v, "\u22E1", "\\nsucceq", true);
o(u, g, v, "\u22E9", "\\succnsim", true);
o(u, g, v, "\u2ABA", "\\succnapprox", true);
o(u, g, v, "\u2246", "\\ncong", true);
o(u, g, v, "\uE007", "\\@nshortparallel");
o(u, g, v, "\u2226", "\\nparallel", true);
o(u, g, v, "\u22AF", "\\nVDash", true);
o(u, g, v, "\u22EB", "\\ntriangleright");
o(u, g, v, "\u22ED", "\\ntrianglerighteq", true);
o(u, g, v, "\uE018", "\\@nsupseteqq");
o(u, g, v, "\u228B", "\\supsetneq", true);
o(u, g, v, "\uE01B", "\\@varsupsetneq");
o(u, g, v, "\u2ACC", "\\supsetneqq", true);
o(u, g, v, "\uE019", "\\@varsupsetneqq");
o(u, g, v, "\u22AE", "\\nVdash", true);
o(u, g, v, "\u2AB5", "\\precneqq", true);
o(u, g, v, "\u2AB6", "\\succneqq", true);
o(u, g, v, "\uE016", "\\@nsubseteqq");
o(u, g, I, "\u22B4", "\\unlhd");
o(u, g, I, "\u22B5", "\\unrhd");
o(u, g, v, "\u219A", "\\nleftarrow", true);
o(u, g, v, "\u219B", "\\nrightarrow", true);
o(u, g, v, "\u21CD", "\\nLeftarrow", true);
o(u, g, v, "\u21CF", "\\nRightarrow", true);
o(u, g, v, "\u21AE", "\\nleftrightarrow", true);
o(u, g, v, "\u21CE", "\\nLeftrightarrow", true);
o(u, g, v, "\u25B3", "\\vartriangle");
o(u, g, y, "\u210F", "\\hslash");
o(u, g, y, "\u25BD", "\\triangledown");
o(u, g, y, "\u25CA", "\\lozenge");
o(u, g, y, "\u24C8", "\\circledS");
o(u, g, y, "\xAE", "\\circledR");
o(S, g, y, "\xAE", "\\circledR");
o(u, g, y, "\u2221", "\\measuredangle", true);
o(u, g, y, "\u2204", "\\nexists");
o(u, g, y, "\u2127", "\\mho");
o(u, g, y, "\u2132", "\\Finv", true);
o(u, g, y, "\u2141", "\\Game", true);
o(u, g, y, "\u2035", "\\backprime");
o(u, g, y, "\u25B2", "\\blacktriangle");
o(u, g, y, "\u25BC", "\\blacktriangledown");
o(u, g, y, "\u25A0", "\\blacksquare");
o(u, g, y, "\u29EB", "\\blacklozenge");
o(u, g, y, "\u2605", "\\bigstar");
o(u, g, y, "\u2222", "\\sphericalangle", true);
o(u, g, y, "\u2201", "\\complement", true);
o(u, g, y, "\xF0", "\\eth", true);
o(S, d, y, "\xF0", "\xF0");
o(u, g, y, "\u2571", "\\diagup");
o(u, g, y, "\u2572", "\\diagdown");
o(u, g, y, "\u25A1", "\\square");
o(u, g, y, "\u25A1", "\\Box");
o(u, g, y, "\u25CA", "\\Diamond");
o(u, g, y, "\xA5", "\\yen", true);
o(S, g, y, "\xA5", "\\yen", true);
o(u, g, y, "\u2713", "\\checkmark", true);
o(S, g, y, "\u2713", "\\checkmark");
o(u, g, y, "\u2136", "\\beth", true);
o(u, g, y, "\u2138", "\\daleth", true);
o(u, g, y, "\u2137", "\\gimel", true);
o(u, g, y, "\u03DD", "\\digamma", true);
o(u, g, y, "\u03F0", "\\varkappa");
o(u, g, Te, "\u250C", "\\@ulcorner", true);
o(u, g, ge, "\u2510", "\\@urcorner", true);
o(u, g, Te, "\u2514", "\\@llcorner", true);
o(u, g, ge, "\u2518", "\\@lrcorner", true);
o(u, g, v, "\u2266", "\\leqq", true);
o(u, g, v, "\u2A7D", "\\leqslant", true);
o(u, g, v, "\u2A95", "\\eqslantless", true);
o(u, g, v, "\u2272", "\\lesssim", true);
o(u, g, v, "\u2A85", "\\lessapprox", true);
o(u, g, v, "\u224A", "\\approxeq", true);
o(u, g, I, "\u22D6", "\\lessdot");
o(u, g, v, "\u22D8", "\\lll", true);
o(u, g, v, "\u2276", "\\lessgtr", true);
o(u, g, v, "\u22DA", "\\lesseqgtr", true);
o(u, g, v, "\u2A8B", "\\lesseqqgtr", true);
o(u, g, v, "\u2251", "\\doteqdot");
o(u, g, v, "\u2253", "\\risingdotseq", true);
o(u, g, v, "\u2252", "\\fallingdotseq", true);
o(u, g, v, "\u223D", "\\backsim", true);
o(u, g, v, "\u22CD", "\\backsimeq", true);
o(u, g, v, "\u2AC5", "\\subseteqq", true);
o(u, g, v, "\u22D0", "\\Subset", true);
o(u, g, v, "\u228F", "\\sqsubset", true);
o(u, g, v, "\u227C", "\\preccurlyeq", true);
o(u, g, v, "\u22DE", "\\curlyeqprec", true);
o(u, g, v, "\u227E", "\\precsim", true);
o(u, g, v, "\u2AB7", "\\precapprox", true);
o(u, g, v, "\u22B2", "\\vartriangleleft");
o(u, g, v, "\u22B4", "\\trianglelefteq");
o(u, g, v, "\u22A8", "\\vDash", true);
o(u, g, v, "\u22AA", "\\Vvdash", true);
o(u, g, v, "\u2323", "\\smallsmile");
o(u, g, v, "\u2322", "\\smallfrown");
o(u, g, v, "\u224F", "\\bumpeq", true);
o(u, g, v, "\u224E", "\\Bumpeq", true);
o(u, g, v, "\u2267", "\\geqq", true);
o(u, g, v, "\u2A7E", "\\geqslant", true);
o(u, g, v, "\u2A96", "\\eqslantgtr", true);
o(u, g, v, "\u2273", "\\gtrsim", true);
o(u, g, v, "\u2A86", "\\gtrapprox", true);
o(u, g, I, "\u22D7", "\\gtrdot");
o(u, g, v, "\u22D9", "\\ggg", true);
o(u, g, v, "\u2277", "\\gtrless", true);
o(u, g, v, "\u22DB", "\\gtreqless", true);
o(u, g, v, "\u2A8C", "\\gtreqqless", true);
o(u, g, v, "\u2256", "\\eqcirc", true);
o(u, g, v, "\u2257", "\\circeq", true);
o(u, g, v, "\u225C", "\\triangleq", true);
o(u, g, v, "\u223C", "\\thicksim");
o(u, g, v, "\u2248", "\\thickapprox");
o(u, g, v, "\u2AC6", "\\supseteqq", true);
o(u, g, v, "\u22D1", "\\Supset", true);
o(u, g, v, "\u2290", "\\sqsupset", true);
o(u, g, v, "\u227D", "\\succcurlyeq", true);
o(u, g, v, "\u22DF", "\\curlyeqsucc", true);
o(u, g, v, "\u227F", "\\succsim", true);
o(u, g, v, "\u2AB8", "\\succapprox", true);
o(u, g, v, "\u22B3", "\\vartriangleright");
o(u, g, v, "\u22B5", "\\trianglerighteq");
o(u, g, v, "\u22A9", "\\Vdash", true);
o(u, g, v, "\u2223", "\\shortmid");
o(u, g, v, "\u2225", "\\shortparallel");
o(u, g, v, "\u226C", "\\between", true);
o(u, g, v, "\u22D4", "\\pitchfork", true);
o(u, g, v, "\u221D", "\\varpropto");
o(u, g, v, "\u25C0", "\\blacktriangleleft");
o(u, g, v, "\u2234", "\\therefore", true);
o(u, g, v, "\u220D", "\\backepsilon");
o(u, g, v, "\u25B6", "\\blacktriangleright");
o(u, g, v, "\u2235", "\\because", true);
o(u, g, v, "\u22D8", "\\llless");
o(u, g, v, "\u22D9", "\\gggtr");
o(u, g, I, "\u22B2", "\\lhd");
o(u, g, I, "\u22B3", "\\rhd");
o(u, g, v, "\u2242", "\\eqsim", true);
o(u, d, v, "\u22C8", "\\Join");
o(u, g, v, "\u2251", "\\Doteq", true);
o(u, g, I, "\u2214", "\\dotplus", true);
o(u, g, I, "\u2216", "\\smallsetminus");
o(u, g, I, "\u22D2", "\\Cap", true);
o(u, g, I, "\u22D3", "\\Cup", true);
o(u, g, I, "\u2A5E", "\\doublebarwedge", true);
o(u, g, I, "\u229F", "\\boxminus", true);
o(u, g, I, "\u229E", "\\boxplus", true);
o(u, g, I, "\u22C7", "\\divideontimes", true);
o(u, g, I, "\u22C9", "\\ltimes", true);
o(u, g, I, "\u22CA", "\\rtimes", true);
o(u, g, I, "\u22CB", "\\leftthreetimes", true);
o(u, g, I, "\u22CC", "\\rightthreetimes", true);
o(u, g, I, "\u22CF", "\\curlywedge", true);
o(u, g, I, "\u22CE", "\\curlyvee", true);
o(u, g, I, "\u229D", "\\circleddash", true);
o(u, g, I, "\u229B", "\\circledast", true);
o(u, g, I, "\u22C5", "\\centerdot");
o(u, g, I, "\u22BA", "\\intercal", true);
o(u, g, I, "\u22D2", "\\doublecap");
o(u, g, I, "\u22D3", "\\doublecup");
o(u, g, I, "\u22A0", "\\boxtimes", true);
o(u, g, v, "\u21E2", "\\dashrightarrow", true);
o(u, g, v, "\u21E0", "\\dashleftarrow", true);
o(u, g, v, "\u21C7", "\\leftleftarrows", true);
o(u, g, v, "\u21C6", "\\leftrightarrows", true);
o(u, g, v, "\u21DA", "\\Lleftarrow", true);
o(u, g, v, "\u219E", "\\twoheadleftarrow", true);
o(u, g, v, "\u21A2", "\\leftarrowtail", true);
o(u, g, v, "\u21AB", "\\looparrowleft", true);
o(u, g, v, "\u21CB", "\\leftrightharpoons", true);
o(u, g, v, "\u21B6", "\\curvearrowleft", true);
o(u, g, v, "\u21BA", "\\circlearrowleft", true);
o(u, g, v, "\u21B0", "\\Lsh", true);
o(u, g, v, "\u21C8", "\\upuparrows", true);
o(u, g, v, "\u21BF", "\\upharpoonleft", true);
o(u, g, v, "\u21C3", "\\downharpoonleft", true);
o(u, d, v, "\u22B6", "\\origof", true);
o(u, d, v, "\u22B7", "\\imageof", true);
o(u, g, v, "\u22B8", "\\multimap", true);
o(u, g, v, "\u21AD", "\\leftrightsquigarrow", true);
o(u, g, v, "\u21C9", "\\rightrightarrows", true);
o(u, g, v, "\u21C4", "\\rightleftarrows", true);
o(u, g, v, "\u21A0", "\\twoheadrightarrow", true);
o(u, g, v, "\u21A3", "\\rightarrowtail", true);
o(u, g, v, "\u21AC", "\\looparrowright", true);
o(u, g, v, "\u21B7", "\\curvearrowright", true);
o(u, g, v, "\u21BB", "\\circlearrowright", true);
o(u, g, v, "\u21B1", "\\Rsh", true);
o(u, g, v, "\u21CA", "\\downdownarrows", true);
o(u, g, v, "\u21BE", "\\upharpoonright", true);
o(u, g, v, "\u21C2", "\\downharpoonright", true);
o(u, g, v, "\u21DD", "\\rightsquigarrow", true);
o(u, g, v, "\u21DD", "\\leadsto");
o(u, g, v, "\u21DB", "\\Rrightarrow", true);
o(u, g, v, "\u21BE", "\\restriction");
o(u, d, y, "\u2018", "`");
o(u, d, y, "$", "\\$");
o(S, d, y, "$", "\\$");
o(S, d, y, "$", "\\textdollar");
o(u, d, y, "%", "\\%");
o(S, d, y, "%", "\\%");
o(u, d, y, "_", "\\_");
o(S, d, y, "_", "\\_");
o(S, d, y, "_", "\\textunderscore");
o(u, d, y, "\u2220", "\\angle", true);
o(u, d, y, "\u221E", "\\infty", true);
o(u, d, y, "\u2032", "\\prime");
o(u, d, y, "\u25B3", "\\triangle");
o(u, d, y, "\u0393", "\\Gamma", true);
o(u, d, y, "\u0394", "\\Delta", true);
o(u, d, y, "\u0398", "\\Theta", true);
o(u, d, y, "\u039B", "\\Lambda", true);
o(u, d, y, "\u039E", "\\Xi", true);
o(u, d, y, "\u03A0", "\\Pi", true);
o(u, d, y, "\u03A3", "\\Sigma", true);
o(u, d, y, "\u03A5", "\\Upsilon", true);
o(u, d, y, "\u03A6", "\\Phi", true);
o(u, d, y, "\u03A8", "\\Psi", true);
o(u, d, y, "\u03A9", "\\Omega", true);
o(u, d, y, "A", "\u0391");
o(u, d, y, "B", "\u0392");
o(u, d, y, "E", "\u0395");
o(u, d, y, "Z", "\u0396");
o(u, d, y, "H", "\u0397");
o(u, d, y, "I", "\u0399");
o(u, d, y, "K", "\u039A");
o(u, d, y, "M", "\u039C");
o(u, d, y, "N", "\u039D");
o(u, d, y, "O", "\u039F");
o(u, d, y, "P", "\u03A1");
o(u, d, y, "T", "\u03A4");
o(u, d, y, "X", "\u03A7");
o(u, d, y, "\xAC", "\\neg", true);
o(u, d, y, "\xAC", "\\lnot");
o(u, d, y, "\u22A4", "\\top");
o(u, d, y, "\u22A5", "\\bot");
o(u, d, y, "\u2205", "\\emptyset");
o(u, g, y, "\u2205", "\\varnothing");
o(u, d, q, "\u03B1", "\\alpha", true);
o(u, d, q, "\u03B2", "\\beta", true);
o(u, d, q, "\u03B3", "\\gamma", true);
o(u, d, q, "\u03B4", "\\delta", true);
o(u, d, q, "\u03F5", "\\epsilon", true);
o(u, d, q, "\u03B6", "\\zeta", true);
o(u, d, q, "\u03B7", "\\eta", true);
o(u, d, q, "\u03B8", "\\theta", true);
o(u, d, q, "\u03B9", "\\iota", true);
o(u, d, q, "\u03BA", "\\kappa", true);
o(u, d, q, "\u03BB", "\\lambda", true);
o(u, d, q, "\u03BC", "\\mu", true);
o(u, d, q, "\u03BD", "\\nu", true);
o(u, d, q, "\u03BE", "\\xi", true);
o(u, d, q, "\u03BF", "\\omicron", true);
o(u, d, q, "\u03C0", "\\pi", true);
o(u, d, q, "\u03C1", "\\rho", true);
o(u, d, q, "\u03C3", "\\sigma", true);
o(u, d, q, "\u03C4", "\\tau", true);
o(u, d, q, "\u03C5", "\\upsilon", true);
o(u, d, q, "\u03D5", "\\phi", true);
o(u, d, q, "\u03C7", "\\chi", true);
o(u, d, q, "\u03C8", "\\psi", true);
o(u, d, q, "\u03C9", "\\omega", true);
o(u, d, q, "\u03B5", "\\varepsilon", true);
o(u, d, q, "\u03D1", "\\vartheta", true);
o(u, d, q, "\u03D6", "\\varpi", true);
o(u, d, q, "\u03F1", "\\varrho", true);
o(u, d, q, "\u03C2", "\\varsigma", true);
o(u, d, q, "\u03C6", "\\varphi", true);
o(u, d, I, "\u2217", "*", true);
o(u, d, I, "+", "+");
o(u, d, I, "\u2212", "-", true);
o(u, d, I, "\u22C5", "\\cdot", true);
o(u, d, I, "\u2218", "\\circ", true);
o(u, d, I, "\xF7", "\\div", true);
o(u, d, I, "\xB1", "\\pm", true);
o(u, d, I, "\xD7", "\\times", true);
o(u, d, I, "\u2229", "\\cap", true);
o(u, d, I, "\u222A", "\\cup", true);
o(u, d, I, "\u2216", "\\setminus", true);
o(u, d, I, "\u2227", "\\land");
o(u, d, I, "\u2228", "\\lor");
o(u, d, I, "\u2227", "\\wedge", true);
o(u, d, I, "\u2228", "\\vee", true);
o(u, d, y, "\u221A", "\\surd");
o(u, d, Te, "\u27E8", "\\langle", true);
o(u, d, Te, "\u2223", "\\lvert");
o(u, d, Te, "\u2225", "\\lVert");
o(u, d, ge, "?", "?");
o(u, d, ge, "!", "!");
o(u, d, ge, "\u27E9", "\\rangle", true);
o(u, d, ge, "\u2223", "\\rvert");
o(u, d, ge, "\u2225", "\\rVert");
o(u, d, v, "=", "=");
o(u, d, v, ":", ":");
o(u, d, v, "\u2248", "\\approx", true);
o(u, d, v, "\u2245", "\\cong", true);
o(u, d, v, "\u2265", "\\ge");
o(u, d, v, "\u2265", "\\geq", true);
o(u, d, v, "\u2190", "\\gets");
o(u, d, v, ">", "\\gt", true);
o(u, d, v, "\u2208", "\\in", true);
o(u, d, v, "\uE020", "\\@not");
o(u, d, v, "\u2282", "\\subset", true);
o(u, d, v, "\u2283", "\\supset", true);
o(u, d, v, "\u2286", "\\subseteq", true);
o(u, d, v, "\u2287", "\\supseteq", true);
o(u, g, v, "\u2288", "\\nsubseteq", true);
o(u, g, v, "\u2289", "\\nsupseteq", true);
o(u, d, v, "\u22A8", "\\models");
o(u, d, v, "\u2190", "\\leftarrow", true);
o(u, d, v, "\u2264", "\\le");
o(u, d, v, "\u2264", "\\leq", true);
o(u, d, v, "<", "\\lt", true);
o(u, d, v, "\u2192", "\\rightarrow", true);
o(u, d, v, "\u2192", "\\to");
o(u, g, v, "\u2271", "\\ngeq", true);
o(u, g, v, "\u2270", "\\nleq", true);
o(u, d, We, "\xA0", "\\ ");
o(u, d, We, "\xA0", "\\space");
o(u, d, We, "\xA0", "\\nobreakspace");
o(S, d, We, "\xA0", "\\ ");
o(S, d, We, "\xA0", " ");
o(S, d, We, "\xA0", "\\space");
o(S, d, We, "\xA0", "\\nobreakspace");
o(u, d, We, "", "\\nobreak");
o(u, d, We, "", "\\allowbreak");
o(u, d, Qt, ",", ",");
o(u, d, Qt, ";", ";");
o(u, g, I, "\u22BC", "\\barwedge", true);
o(u, g, I, "\u22BB", "\\veebar", true);
o(u, d, I, "\u2299", "\\odot", true);
o(u, d, I, "\u2295", "\\oplus", true);
o(u, d, I, "\u2297", "\\otimes", true);
o(u, d, y, "\u2202", "\\partial", true);
o(u, d, I, "\u2298", "\\oslash", true);
o(u, g, I, "\u229A", "\\circledcirc", true);
o(u, g, I, "\u22A1", "\\boxdot", true);
o(u, d, I, "\u25B3", "\\bigtriangleup");
o(u, d, I, "\u25BD", "\\bigtriangledown");
o(u, d, I, "\u2020", "\\dagger");
o(u, d, I, "\u22C4", "\\diamond");
o(u, d, I, "\u22C6", "\\star");
o(u, d, I, "\u25C3", "\\triangleleft");
o(u, d, I, "\u25B9", "\\triangleright");
o(u, d, Te, "{", "\\{");
o(S, d, y, "{", "\\{");
o(S, d, y, "{", "\\textbraceleft");
o(u, d, ge, "}", "\\}");
o(S, d, y, "}", "\\}");
o(S, d, y, "}", "\\textbraceright");
o(u, d, Te, "{", "\\lbrace");
o(u, d, ge, "}", "\\rbrace");
o(u, d, Te, "[", "\\lbrack", true);
o(S, d, y, "[", "\\lbrack", true);
o(u, d, ge, "]", "\\rbrack", true);
o(S, d, y, "]", "\\rbrack", true);
o(u, d, Te, "(", "\\lparen", true);
o(u, d, ge, ")", "\\rparen", true);
o(S, d, y, "<", "\\textless", true);
o(S, d, y, ">", "\\textgreater", true);
o(u, d, Te, "\u230A", "\\lfloor", true);
o(u, d, ge, "\u230B", "\\rfloor", true);
o(u, d, Te, "\u2308", "\\lceil", true);
o(u, d, ge, "\u2309", "\\rceil", true);
o(u, d, y, "\\", "\\backslash");
o(u, d, y, "\u2223", "|");
o(u, d, y, "\u2223", "\\vert");
o(S, d, y, "|", "\\textbar", true);
o(u, d, y, "\u2225", "\\|");
o(u, d, y, "\u2225", "\\Vert");
o(S, d, y, "\u2225", "\\textbardbl");
o(S, d, y, "~", "\\textasciitilde");
o(S, d, y, "\\", "\\textbackslash");
o(S, d, y, "^", "\\textasciicircum");
o(u, d, v, "\u2191", "\\uparrow", true);
o(u, d, v, "\u21D1", "\\Uparrow", true);
o(u, d, v, "\u2193", "\\downarrow", true);
o(u, d, v, "\u21D3", "\\Downarrow", true);
o(u, d, v, "\u2195", "\\updownarrow", true);
o(u, d, v, "\u21D5", "\\Updownarrow", true);
o(u, d, ie, "\u2210", "\\coprod");
o(u, d, ie, "\u22C1", "\\bigvee");
o(u, d, ie, "\u22C0", "\\bigwedge");
o(u, d, ie, "\u2A04", "\\biguplus");
o(u, d, ie, "\u22C2", "\\bigcap");
o(u, d, ie, "\u22C3", "\\bigcup");
o(u, d, ie, "\u222B", "\\int");
o(u, d, ie, "\u222B", "\\intop");
o(u, d, ie, "\u222C", "\\iint");
o(u, d, ie, "\u222D", "\\iiint");
o(u, d, ie, "\u220F", "\\prod");
o(u, d, ie, "\u2211", "\\sum");
o(u, d, ie, "\u2A02", "\\bigotimes");
o(u, d, ie, "\u2A01", "\\bigoplus");
o(u, d, ie, "\u2A00", "\\bigodot");
o(u, d, ie, "\u222E", "\\oint");
o(u, d, ie, "\u222F", "\\oiint");
o(u, d, ie, "\u2230", "\\oiiint");
o(u, d, ie, "\u2A06", "\\bigsqcup");
o(u, d, ie, "\u222B", "\\smallint");
o(S, d, Pt, "\u2026", "\\textellipsis");
o(u, d, Pt, "\u2026", "\\mathellipsis");
o(S, d, Pt, "\u2026", "\\ldots", true);
o(u, d, Pt, "\u2026", "\\ldots", true);
o(u, d, Pt, "\u22EF", "\\@cdots", true);
o(u, d, Pt, "\u22F1", "\\ddots", true);
o(u, d, y, "\u22EE", "\\varvdots");
o(S, d, y, "\u22EE", "\\varvdots");
o(u, d, K, "\u02CA", "\\acute");
o(u, d, K, "\u02CB", "\\grave");
o(u, d, K, "\xA8", "\\ddot");
o(u, d, K, "~", "\\tilde");
o(u, d, K, "\u02C9", "\\bar");
o(u, d, K, "\u02D8", "\\breve");
o(u, d, K, "\u02C7", "\\check");
o(u, d, K, "^", "\\hat");
o(u, d, K, "\u20D7", "\\vec");
o(u, d, K, "\u02D9", "\\dot");
o(u, d, K, "\u02DA", "\\mathring");
o(u, d, q, "\uE131", "\\@imath");
o(u, d, q, "\uE237", "\\@jmath");
o(u, d, y, "\u0131", "\u0131");
o(u, d, y, "\u0237", "\u0237");
o(S, d, y, "\u0131", "\\i", true);
o(S, d, y, "\u0237", "\\j", true);
o(S, d, y, "\xDF", "\\ss", true);
o(S, d, y, "\xE6", "\\ae", true);
o(S, d, y, "\u0153", "\\oe", true);
o(S, d, y, "\xF8", "\\o", true);
o(S, d, y, "\xC6", "\\AE", true);
o(S, d, y, "\u0152", "\\OE", true);
o(S, d, y, "\xD8", "\\O", true);
o(S, d, K, "\u02CA", "\\'");
o(S, d, K, "\u02CB", "\\`");
o(S, d, K, "\u02C6", "\\^");
o(S, d, K, "\u02DC", "\\~");
o(S, d, K, "\u02C9", "\\=");
o(S, d, K, "\u02D8", "\\u");
o(S, d, K, "\u02D9", "\\.");
o(S, d, K, "\xB8", "\\c");
o(S, d, K, "\u02DA", "\\r");
o(S, d, K, "\u02C7", "\\v");
o(S, d, K, "\xA8", '\\"');
o(S, d, K, "\u02DD", "\\H");
o(S, d, K, "\u25EF", "\\textcircled");
var Da = { "--": true, "---": true, "``": true, "''": true };
o(S, d, y, "\u2013", "--", true);
o(S, d, y, "\u2013", "\\textendash");
o(S, d, y, "\u2014", "---", true);
o(S, d, y, "\u2014", "\\textemdash");
o(S, d, y, "\u2018", "`", true);
o(S, d, y, "\u2018", "\\textquoteleft");
o(S, d, y, "\u2019", "'", true);
o(S, d, y, "\u2019", "\\textquoteright");
o(S, d, y, "\u201C", "``", true);
o(S, d, y, "\u201C", "\\textquotedblleft");
o(S, d, y, "\u201D", "''", true);
o(S, d, y, "\u201D", "\\textquotedblright");
o(u, d, y, "\xB0", "\\degree", true);
o(S, d, y, "\xB0", "\\degree");
o(S, d, y, "\xB0", "\\textdegree", true);
o(u, d, y, "\xA3", "\\pounds");
o(u, d, y, "\xA3", "\\mathsterling", true);
o(S, d, y, "\xA3", "\\pounds");
o(S, d, y, "\xA3", "\\textsterling", true);
o(u, g, y, "\u2720", "\\maltese");
o(S, g, y, "\u2720", "\\maltese");
var Ln = '0123456789/@."';
for (var K0 = 0; K0 < Ln.length; K0++) {
  var On = Ln.charAt(K0);
  o(u, d, y, On, On);
}
var Pn = '0123456789!@*()-=+";:?/.,';
for (var Q0 = 0; Q0 < Pn.length; Q0++) {
  var $n = Pn.charAt(Q0);
  o(S, d, y, $n, $n);
}
var S0 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
for (var J0 = 0; J0 < S0.length; J0++) {
  var o0 = S0.charAt(J0);
  o(u, d, q, o0, o0), o(S, d, y, o0, o0);
}
o(u, g, y, "C", "\u2102");
o(S, g, y, "C", "\u2102");
o(u, g, y, "H", "\u210D");
o(S, g, y, "H", "\u210D");
o(u, g, y, "N", "\u2115");
o(S, g, y, "N", "\u2115");
o(u, g, y, "P", "\u2119");
o(S, g, y, "P", "\u2119");
o(u, g, y, "Q", "\u211A");
o(S, g, y, "Q", "\u211A");
o(u, g, y, "R", "\u211D");
o(S, g, y, "R", "\u211D");
o(u, g, y, "Z", "\u2124");
o(S, g, y, "Z", "\u2124");
o(u, d, q, "h", "\u210E");
o(S, d, q, "h", "\u210E");
var L;
for (var ce = 0; ce < S0.length; ce++) {
  var ee = S0.charAt(ce);
  L = String.fromCharCode(55349, 56320 + ce), o(u, d, q, ee, L), o(S, d, y, ee, L), L = String.fromCharCode(55349, 56372 + ce), o(u, d, q, ee, L), o(S, d, y, ee, L), L = String.fromCharCode(55349, 56424 + ce), o(u, d, q, ee, L), o(S, d, y, ee, L), L = String.fromCharCode(55349, 56580 + ce), o(u, d, q, ee, L), o(S, d, y, ee, L), L = String.fromCharCode(55349, 56684 + ce), o(u, d, q, ee, L), o(S, d, y, ee, L), L = String.fromCharCode(55349, 56736 + ce), o(u, d, q, ee, L), o(S, d, y, ee, L), L = String.fromCharCode(55349, 56788 + ce), o(u, d, q, ee, L), o(S, d, y, ee, L), L = String.fromCharCode(55349, 56840 + ce), o(u, d, q, ee, L), o(S, d, y, ee, L), L = String.fromCharCode(55349, 56944 + ce), o(u, d, q, ee, L), o(S, d, y, ee, L), ce < 26 && (L = String.fromCharCode(55349, 56632 + ce), o(u, d, q, ee, L), o(S, d, y, ee, L), L = String.fromCharCode(55349, 56476 + ce), o(u, d, q, ee, L), o(S, d, y, ee, L));
}
L = "\u{1D55C}";
o(u, d, q, "k", L);
o(S, d, y, "k", L);
for (var ct = 0; ct < 10; ct++) {
  var et = ct.toString();
  L = String.fromCharCode(55349, 57294 + ct), o(u, d, q, et, L), o(S, d, y, et, L), L = String.fromCharCode(55349, 57314 + ct), o(u, d, q, et, L), o(S, d, y, et, L), L = String.fromCharCode(55349, 57324 + ct), o(u, d, q, et, L), o(S, d, y, et, L), L = String.fromCharCode(55349, 57334 + ct), o(u, d, q, et, L), o(S, d, y, et, L);
}
var wr = "\xD0\xDE\xFE";
for (var er = 0; er < wr.length; er++) {
  var u0 = wr.charAt(er);
  o(u, d, q, u0, u0), o(S, d, y, u0, u0);
}
var xr = { mathClass: "mathbf", textClass: "textbf", font: "Main-Bold" }, Dn = { mathClass: "mathnormal", textClass: "textit", font: "Math-Italic" }, Hn = { mathClass: "boldsymbol", textClass: "boldsymbol", font: "Main-BoldItalic" }, ol = { mathClass: "mathscr", textClass: "textscr", font: "Script-Regular" }, pt = { mathClass: "", textClass: "", font: "" }, _n = { mathClass: "mathfrak", textClass: "textfrak", font: "Fraktur-Regular" }, Gn = { mathClass: "mathbb", textClass: "textbb", font: "AMS-Regular" }, Vn = { mathClass: "mathboldfrak", textClass: "textboldfrak", font: "Fraktur-Regular" }, kr = { mathClass: "mathsf", textClass: "textsf", font: "SansSerif-Regular" }, Sr = { mathClass: "mathboldsf", textClass: "textboldsf", font: "SansSerif-Bold" }, Un = { mathClass: "mathitsf", textClass: "textitsf", font: "SansSerif-Italic" }, Tr = { mathClass: "mathtt", textClass: "texttt", font: "Typewriter-Regular" }, jn = [xr, xr, Dn, Dn, Hn, Hn, ol, pt, pt, pt, _n, _n, Gn, Gn, Vn, Vn, kr, kr, Sr, Sr, Un, Un, pt, pt, Tr, Tr], ul = [xr, pt, kr, Sr, Tr], hl = (r) => {
  var e = r.charCodeAt(0), t = r.charCodeAt(1), n = (e - 55296) * 1024 + (t - 56320) + 65536;
  if (119808 <= n && n < 120484) {
    var a = Math.floor((n - 119808) / 26);
    return jn[a];
  } else if (120782 <= n && n <= 120831) {
    var i = Math.floor((n - 120782) / 10);
    return ul[i];
  } else {
    if (n === 120485 || n === 120486) return jn[0];
    if (120486 < n && n < 120782) return pt;
    throw new A("Unsupported character: " + r);
  }
}, R0 = function(e, t, n) {
  if (Z[n][e]) {
    var a = Z[n][e].replace;
    a && (e = a);
  }
  return { value: e, metrics: jr(e, t, n) };
}, me = function(e, t, n, a, i) {
  var s = R0(e, t, n), l = s.metrics;
  e = s.value;
  var h;
  if (l) {
    var c = l.italic;
    (n === "text" || a && a.font === "mathit") && (c = 0), h = new Se(e, l.height, l.depth, c, l.skew, l.width, i);
  } else typeof console < "u" && console.warn("No character metrics " + ("for '" + e + "' in style '" + t + "' and mode '" + n + "'")), h = new Se(e, 0, 0, 0, 0, 0, i);
  if (a) {
    h.maxFontSize = a.sizeMultiplier, a.style.isTight() && h.classes.push("mtight");
    var m = a.getColor();
    m && (h.style.color = m);
  }
  return h;
}, Wr = function(e, t, n, a) {
  return a === void 0 && (a = []), n.font === "boldsymbol" && R0(e, "Main-Bold", t).metrics ? me(e, "Main-Bold", t, n, a.concat(["mathbf"])) : e === "\\" || Z[t][e].font === "main" ? me(e, "Main-Regular", t, n, a) : me(e, "AMS-Regular", t, n, a.concat(["amsrm"]));
}, cl = function(e, t, n) {
  return n !== "textord" && R0(e, "Math-BoldItalic", t).metrics ? { fontName: "Math-BoldItalic", fontClass: "boldsymbol" } : { fontName: "Main-Bold", fontClass: "mathbf" };
}, q0 = function(e, t, n) {
  var a = e.mode, i = e.text, s = ["mord"], { font: l, fontFamily: h, fontWeight: c, fontShape: m } = t, p = a === "math" || a === "text" && !!l, b = p ? l : h, w = "", x = "";
  if (i.charCodeAt(0) === 55349) {
    var k = hl(i);
    w = k.font, x = k[a + "Class"];
  }
  if (w) return me(i, w, a, t, s.concat(x));
  if (b) {
    var C, E;
    if (b === "boldsymbol") {
      var B = cl(i, a, n);
      C = B.fontName, E = [B.fontClass];
    } else p ? (C = Ar[l].fontName, E = [l]) : (C = h0(h, c, m), E = [h, c, m]);
    if (R0(i, C, a).metrics) return me(i, C, a, t, s.concat(E));
    if (Da.hasOwnProperty(i) && C.slice(0, 10) === "Typewriter") {
      for (var F = [], P = 0; P < i.length; P++) F.push(me(i[P], C, a, t, s.concat(E)));
      return Xe(F);
    }
  }
  if (n === "mathord") return me(i, "Math-Italic", a, t, s.concat(["mathnormal"]));
  if (n === "textord") {
    var R = Z[a][i] && Z[a][i].font;
    if (R === "ams") {
      var D = h0("amsrm", c, m);
      return me(i, D, a, t, s.concat("amsrm", c, m));
    } else if (R === "main" || !R) {
      var H = h0("textrm", c, m);
      return me(i, H, a, t, s.concat(c, m));
    } else {
      var W = h0(R, c, m);
      return me(i, W, a, t, s.concat(W, c, m));
    }
  } else throw new Error("unexpected type: " + n + " in makeOrd");
}, dl = (r, e) => {
  if (it(r.classes) !== it(e.classes) || r.skew !== e.skew || r.maxFontSize !== e.maxFontSize || r.italic !== 0 && r.hasClass("mathnormal")) return false;
  if (r.classes.length === 1) {
    var t = r.classes[0];
    if (t === "mbin" || t === "mord") return false;
  }
  for (var n of Object.keys(r.style)) if (r.style[n] !== e.style[n]) return false;
  for (var a of Object.keys(e.style)) if (r.style[a] !== e.style[a]) return false;
  return true;
}, Ha = (r) => {
  for (var e = 0; e < r.length - 1; e++) {
    var t = r[e], n = r[e + 1];
    t instanceof Se && n instanceof Se && dl(t, n) && (t.text += n.text, t.height = Math.max(t.height, n.height), t.depth = Math.max(t.depth, n.depth), t.italic = n.italic, r.splice(e + 1, 1), e--);
  }
  return r;
}, Xr = function(e) {
  for (var t = 0, n = 0, a = 0, i = 0; i < e.children.length; i++) {
    var s = e.children[i];
    s.height > t && (t = s.height), s.depth > n && (n = s.depth), s.maxFontSize > a && (a = s.maxFontSize);
  }
  e.height = t, e.depth = n, e.maxFontSize = a;
}, T = function(e, t, n, a) {
  var i = new Ot(e, t, n, a);
  return Xr(i), i;
}, lt = (r, e, t, n) => new Ot(r, e, t, n), qt = function(e, t, n) {
  var a = T([e], [], t);
  return a.height = Math.max(n || t.fontMetrics().defaultRuleThickness, t.minRuleThickness), a.style.borderBottomWidth = z(a.height), a.maxFontSize = 1, a;
}, ml = function(e, t, n, a) {
  var i = new B0(e, t, n, a);
  return Xr(i), i;
}, Xe = function(e) {
  var t = new Lt(e);
  return Xr(t), t;
}, Ft = function(e, t) {
  return e instanceof Lt ? T([], [e], t) : e;
}, fl = function(e) {
  if (e.positionType === "individualShift") {
    for (var t = e.children, n = [t[0]], a = -t[0].shift - t[0].elem.depth, i = a, s = 1; s < t.length; s++) {
      var l = -t[s].shift - i - t[s].elem.depth, h = l - (t[s - 1].elem.height + t[s - 1].elem.depth);
      i = i + l, n.push({ type: "kern", size: h }), n.push(t[s]);
    }
    return { children: n, depth: a };
  }
  var c;
  if (e.positionType === "top") {
    for (var m = e.positionData, p = 0; p < e.children.length; p++) {
      var b = e.children[p];
      m -= b.type === "kern" ? b.size : b.elem.height + b.elem.depth;
    }
    c = m;
  } else if (e.positionType === "bottom") c = -e.positionData;
  else {
    var w = e.children[0];
    if (w.type !== "elem") throw new Error('First child must have type "elem".');
    if (e.positionType === "shift") c = -w.elem.depth - e.positionData;
    else if (e.positionType === "firstBaseline") c = -w.elem.depth;
    else throw new Error("Invalid positionType " + e.positionType + ".");
  }
  return { children: e.children, depth: c };
}, V = function(e, t) {
  for (var { children: n, depth: a } = fl(e), i = 0, s = 0; s < n.length; s++) {
    var l = n[s];
    if (l.type === "elem") {
      var h = l.elem;
      i = Math.max(i, h.maxFontSize, h.height);
    }
  }
  i += 2;
  var c = T(["pstrut"], []);
  c.style.height = z(i);
  for (var m = [], p = a, b = a, w = a, x = 0; x < n.length; x++) {
    var k = n[x];
    if (k.type === "kern") w += k.size;
    else {
      var C = k.elem, E = k.wrapperClasses || [], B = k.wrapperStyle || {}, F = T(E, [c, C], void 0, B);
      F.style.top = z(-i - w - C.depth), k.marginLeft && (F.style.marginLeft = k.marginLeft), k.marginRight && (F.style.marginRight = k.marginRight), m.push(F), w += C.height + C.depth;
    }
    p = Math.min(p, w), b = Math.max(b, w);
  }
  var P = T(["vlist"], m);
  P.style.height = z(b);
  var R;
  if (p < 0) {
    var D = T([], []), H = T(["vlist"], [D]);
    H.style.height = z(-p);
    var W = T(["vlist-s"], [new Se("\u200B")]);
    R = [T(["vlist-r"], [P, W]), T(["vlist-r"], [H])];
  } else R = [T(["vlist-r"], [P])];
  var G = T(["vlist-t"], R);
  return R.length === 2 && G.classes.push("vlist-t2"), G.height = b, G.depth = -p, G;
}, _a = (r, e) => {
  var t = T(["mspace"], [], e), n = J(r, e);
  return t.style.marginRight = z(n), t;
}, h0 = (r, e, t) => {
  var n, a;
  switch (r) {
    case "amsrm":
      n = "AMS";
      break;
    case "textrm":
      n = "Main";
      break;
    case "textsf":
      n = "SansSerif";
      break;
    case "texttt":
      n = "Typewriter";
      break;
    default:
      n = r;
  }
  return e === "textbf" && t === "textit" ? a = "BoldItalic" : e === "textbf" ? a = "Bold" : t === "textit" ? a = "Italic" : a = "Regular", n + "-" + a;
}, Ar = { mathbf: { variant: "bold", fontName: "Main-Bold" }, mathrm: { variant: "normal", fontName: "Main-Regular" }, textit: { variant: "italic", fontName: "Main-Italic" }, mathit: { variant: "italic", fontName: "Main-Italic" }, mathnormal: { variant: "italic", fontName: "Math-Italic" }, mathsfit: { variant: "sans-serif-italic", fontName: "SansSerif-Italic" }, mathbb: { variant: "double-struck", fontName: "AMS-Regular" }, mathcal: { variant: "script", fontName: "Caligraphic-Regular" }, mathfrak: { variant: "fraktur", fontName: "Fraktur-Regular" }, mathscr: { variant: "script", fontName: "Script-Regular" }, mathsf: { variant: "sans-serif", fontName: "SansSerif-Regular" }, mathtt: { variant: "monospace", fontName: "Typewriter-Regular" } }, Ga = { vec: ["vec", 0.471, 0.714], oiintSize1: ["oiintSize1", 0.957, 0.499], oiintSize2: ["oiintSize2", 1.472, 0.659], oiiintSize1: ["oiiintSize1", 1.304, 0.499], oiiintSize2: ["oiiintSize2", 1.98, 0.659] }, Va = function(e, t) {
  var [n, a, i] = Ga[e], s = new st(n), l = new Ue([s], { width: z(a), height: z(i), style: "width:" + z(a), viewBox: "0 0 " + 1e3 * a + " " + 1e3 * i, preserveAspectRatio: "xMinYMin" }), h = lt(["overlay"], [l], t);
  return h.height = i, h.style.height = z(i), h.style.width = z(a), h;
}, Q = { number: 3, unit: "mu" }, dt = { number: 4, unit: "mu" }, Pe = { number: 5, unit: "mu" }, pl = { mord: { mop: Q, mbin: dt, mrel: Pe, minner: Q }, mop: { mord: Q, mop: Q, mrel: Pe, minner: Q }, mbin: { mord: dt, mop: dt, mopen: dt, minner: dt }, mrel: { mord: Pe, mop: Pe, mopen: Pe, minner: Pe }, mopen: {}, mclose: { mop: Q, mbin: dt, mrel: Pe, minner: Q }, mpunct: { mord: Q, mop: Q, mrel: Pe, mopen: Q, mclose: Q, mpunct: Q, minner: Q }, minner: { mord: Q, mop: Q, mbin: dt, mrel: Pe, mopen: Q, mpunct: Q, minner: Q } }, gl = { mord: { mop: Q }, mop: { mord: Q, mop: Q }, mbin: {}, mrel: {}, mopen: {}, mclose: { mop: Q }, mpunct: {}, minner: { mop: Q } }, Ua = {}, T0 = {}, A0 = {};
function N(r) {
  for (var { type: e, names: t, props: n, handler: a, htmlBuilder: i, mathmlBuilder: s } = r, l = { type: e, numArgs: n.numArgs, argTypes: n.argTypes, allowedInArgument: !!n.allowedInArgument, allowedInText: !!n.allowedInText, allowedInMath: n.allowedInMath === void 0 ? true : n.allowedInMath, numOptionalArgs: n.numOptionalArgs || 0, infix: !!n.infix, primitive: !!n.primitive, handler: a }, h = 0; h < t.length; ++h) Ua[t[h]] = l;
  e && (i && (T0[e] = i), s && (A0[e] = s));
}
function kt(r) {
  var { type: e, htmlBuilder: t, mathmlBuilder: n } = r;
  N({ type: e, names: [], props: { numArgs: 0 }, handler() {
    throw new Error("Should never be called.");
  }, htmlBuilder: t, mathmlBuilder: n });
}
var M0 = function(e) {
  return e.type === "ordgroup" && e.body.length === 1 ? e.body[0] : e;
}, ne = function(e) {
  return e.type === "ordgroup" ? e.body : [e];
}, vl = /* @__PURE__ */ new Set(["leftmost", "mbin", "mopen", "mrel", "mop", "mpunct"]), bl = /* @__PURE__ */ new Set(["rightmost", "mrel", "mclose", "mpunct"]), yl = { display: $.DISPLAY, text: $.TEXT, script: $.SCRIPT, scriptscript: $.SCRIPTSCRIPT }, wl = { mord: "mord", mop: "mop", mbin: "mbin", mrel: "mrel", mopen: "mopen", mclose: "mclose", mpunct: "mpunct", minner: "minner" }, oe = function(e, t, n, a) {
  a === void 0 && (a = [null, null]);
  for (var i = [], s = 0; s < e.length; s++) {
    var l = U(e[s], t);
    if (l instanceof Lt) {
      var h = l.children;
      i.push(...h);
    } else i.push(l);
  }
  if (Ha(i), !n) return i;
  var c = t;
  if (e.length === 1) {
    var m = e[0];
    m.type === "sizing" ? c = t.havingSize(m.size) : m.type === "styling" && (c = t.havingStyle(yl[m.style]));
  }
  var p = T([a[0] || "leftmost"], [], t), b = T([a[1] || "rightmost"], [], t), w = n === "root";
  return Mr(i, (x, k) => {
    var C = k.classes[0], E = x.classes[0];
    C === "mbin" && bl.has(E) ? k.classes[0] = "mord" : E === "mbin" && vl.has(C) && (x.classes[0] = "mord");
  }, { node: p }, b, w), Mr(i, (x, k) => {
    var C, E, B = Cr(k), F = Cr(x), P = B && F ? x.hasClass("mtight") ? (C = gl[B]) == null ? void 0 : C[F] : (E = pl[B]) == null ? void 0 : E[F] : null;
    if (P) return _a(P, c);
  }, { node: p }, b, w), i;
}, Mr = function(e, t, n, a, i) {
  a && e.push(a);
  for (var s = 0; s < e.length; s++) {
    var l = e[s], h = ja(l);
    if (h) {
      Mr(h.children, t, n, null, i);
      continue;
    }
    var c = !l.hasClass("mspace");
    if (c) {
      var m = t(l, n.node);
      m && (n.insertAfter ? n.insertAfter(m) : (e.unshift(m), s++));
    }
    c ? n.node = l : i && l.hasClass("newline") && (n.node = T(["leftmost"])), n.insertAfter = /* @__PURE__ */ ((p) => (b) => {
      e.splice(p + 1, 0, b), s++;
    })(s);
  }
  a && e.pop();
}, ja = function(e) {
  return e instanceof Lt || e instanceof B0 || e instanceof Ot && e.hasClass("enclosing") ? e : null;
}, zr = function(e, t) {
  var n = ja(e);
  if (n) {
    var a = n.children;
    if (a.length) {
      if (t === "right") return zr(a[a.length - 1], "right");
      if (t === "left") return zr(a[0], "left");
    }
  }
  return e;
}, Cr = function(e, t) {
  if (!e) return null;
  t && (e = zr(e, t));
  var n = e.classes[0];
  return wl[n] || null;
}, Kt = function(e, t) {
  var n = ["nulldelimiter"].concat(e.baseSizingClasses());
  return T(t.concat(n));
}, U = function(e, t, n) {
  if (!e) return T();
  if (T0[e.type]) {
    var a = T0[e.type](e, t);
    if (n && t.size !== n.size) {
      a = T(t.sizingClasses(n), [a], t);
      var i = t.sizeMultiplier / n.sizeMultiplier;
      a.height *= i, a.depth *= i;
    }
    return a;
  } else throw new A("Got group of unknown type: '" + e.type + "'");
};
function c0(r, e) {
  var t = T(["base"], r, e), n = T(["strut"]);
  return n.style.height = z(t.height + t.depth), t.depth && (n.style.verticalAlign = z(-t.depth)), t.children.unshift(n), t;
}
function Er(r, e) {
  var t = null;
  r.length === 1 && r[0].type === "tag" && (t = r[0].tag, r = r[0].body);
  var n = oe(r, e, "root"), a;
  n.length === 2 && n[1].hasClass("tag") && (a = n.pop());
  for (var i = [], s = [], l = 0; l < n.length; l++) if (s.push(n[l]), n[l].hasClass("mbin") || n[l].hasClass("mrel") || n[l].hasClass("allowbreak")) {
    for (var h = false; l < n.length - 1 && n[l + 1].hasClass("mspace") && !n[l + 1].hasClass("newline"); ) l++, s.push(n[l]), n[l].hasClass("nobreak") && (h = true);
    h || (i.push(c0(s, e)), s = []);
  } else n[l].hasClass("newline") && (s.pop(), s.length > 0 && (i.push(c0(s, e)), s = []), i.push(n[l]));
  s.length > 0 && i.push(c0(s, e));
  var c;
  t ? (c = c0(oe(t, e, true), e), c.classes = ["tag"], i.push(c)) : a && i.push(a);
  var m = T(["katex-html"], i);
  if (m.setAttribute("aria-hidden", "true"), c) {
    var p = c.children[0];
    p.style.height = z(m.height + m.depth), m.depth && (p.style.verticalAlign = z(-m.depth));
  }
  return m;
}
function Wa(r) {
  return new Lt(r);
}
class M {
  constructor(e, t, n) {
    this.type = void 0, this.attributes = void 0, this.children = void 0, this.classes = void 0, this.type = e, this.attributes = {}, this.children = t || [], this.classes = n || [];
  }
  setAttribute(e, t) {
    this.attributes[e] = t;
  }
  getAttribute(e) {
    return this.attributes[e];
  }
  toNode() {
    var e = document.createElementNS("http://www.w3.org/1998/Math/MathML", this.type);
    for (var t in this.attributes) Object.prototype.hasOwnProperty.call(this.attributes, t) && e.setAttribute(t, this.attributes[t]);
    this.classes.length > 0 && (e.className = it(this.classes));
    for (var n = 0; n < this.children.length; n++) if (this.children[n] instanceof ae && this.children[n + 1] instanceof ae) {
      for (var a = this.children[n].toText() + this.children[++n].toText(); this.children[n + 1] instanceof ae; ) a += this.children[++n].toText();
      e.appendChild(new ae(a).toNode());
    } else e.appendChild(this.children[n].toNode());
    return e;
  }
  toMarkup() {
    var e = "<" + this.type;
    for (var t in this.attributes) Object.prototype.hasOwnProperty.call(this.attributes, t) && (e += " " + t + '="', e += he(this.attributes[t]), e += '"');
    this.classes.length > 0 && (e += ' class ="' + he(it(this.classes)) + '"'), e += ">";
    for (var n = 0; n < this.children.length; n++) e += this.children[n].toMarkup();
    return e += "</" + this.type + ">", e;
  }
  toText() {
    return this.children.map((e) => e.toText()).join("");
  }
}
class ae {
  constructor(e) {
    this.text = void 0, this.text = e;
  }
  toNode() {
    return document.createTextNode(this.text);
  }
  toMarkup() {
    return he(this.toText());
  }
  toText() {
    return this.text;
  }
}
class Xa {
  constructor(e) {
    this.width = void 0, this.character = void 0, this.width = e, e >= 0.05555 && e <= 0.05556 ? this.character = "\u200A" : e >= 0.1666 && e <= 0.1667 ? this.character = "\u2009" : e >= 0.2222 && e <= 0.2223 ? this.character = "\u2005" : e >= 0.2777 && e <= 0.2778 ? this.character = "\u2005\u200A" : e >= -0.05556 && e <= -0.05555 ? this.character = "\u200A\u2063" : e >= -0.1667 && e <= -0.1666 ? this.character = "\u2009\u2063" : e >= -0.2223 && e <= -0.2222 ? this.character = "\u205F\u2063" : e >= -0.2778 && e <= -0.2777 ? this.character = "\u2005\u2063" : this.character = null;
  }
  toNode() {
    if (this.character) return document.createTextNode(this.character);
    var e = document.createElementNS("http://www.w3.org/1998/Math/MathML", "mspace");
    return e.setAttribute("width", z(this.width)), e;
  }
  toMarkup() {
    return this.character ? "<mtext>" + this.character + "</mtext>" : '<mspace width="' + z(this.width) + '"/>';
  }
  toText() {
    return this.character ? this.character : " ";
  }
}
var xl = /* @__PURE__ */ new Set(["\\imath", "\\jmath"]), kl = /* @__PURE__ */ new Set(["mrow", "mtable"]), ze = function(e, t, n) {
  return Z[t][e] && Z[t][e].replace && e.charCodeAt(0) !== 55349 && !(Da.hasOwnProperty(e) && n && (n.fontFamily && n.fontFamily.slice(4, 6) === "tt" || n.font && n.font.slice(4, 6) === "tt")) && (e = Z[t][e].replace), new ae(e);
}, Yr = function(e) {
  return e.length === 1 ? e[0] : new M("mrow", e);
}, Sl = { mathit: "italic", boldsymbol: (r) => r.type === "textord" ? "bold" : "bold-italic", mathbf: "bold", mathbb: "double-struck", mathsfit: "sans-serif-italic", mathfrak: "fraktur", mathscr: "script", mathcal: "script", mathsf: "sans-serif", mathtt: "monospace" }, Zr = (r, e) => {
  if (r.mode === "text") {
    if (e.fontFamily === "texttt") return "monospace";
    if (e.fontFamily === "textsf") return e.fontShape === "textit" && e.fontWeight === "textbf" ? "sans-serif-bold-italic" : e.fontShape === "textit" ? "sans-serif-italic" : e.fontWeight === "textbf" ? "bold-sans-serif" : "sans-serif";
    if (e.fontShape === "textit" && e.fontWeight === "textbf") return "bold-italic";
    if (e.fontShape === "textit") return "italic";
    if (e.fontWeight === "textbf") return "bold";
  }
  var t = e.font;
  if (!t || t === "mathnormal") return null;
  var n = r.mode, a = Sl[t];
  if (a) return typeof a == "function" ? a(r) : a;
  var i = r.text;
  if (xl.has(i)) return null;
  if (Z[n][i]) {
    var s = Z[n][i].replace;
    s && (i = s);
  }
  var l = Ar[t].fontName;
  return jr(i, l, n) ? Ar[t].variant : null;
};
function tr(r) {
  if (!r) return false;
  if (r.type === "mi" && r.children.length === 1) {
    var e = r.children[0];
    return e instanceof ae && e.text === ".";
  } else if (r.type === "mo" && r.children.length === 1 && r.getAttribute("separator") === "true" && r.getAttribute("lspace") === "0em" && r.getAttribute("rspace") === "0em") {
    var t = r.children[0];
    return t instanceof ae && t.text === ",";
  } else return false;
}
var Ae = function(e, t, n) {
  if (e.length === 1) {
    var a = Y(e[0], t);
    return n && a instanceof M && a.type === "mo" && (a.setAttribute("lspace", "0em"), a.setAttribute("rspace", "0em")), [a];
  }
  for (var i = [], s, l = 0; l < e.length; l++) {
    var h = Y(e[l], t);
    if (h instanceof M && s instanceof M) {
      if (h.type === "mtext" && s.type === "mtext" && h.getAttribute("mathvariant") === s.getAttribute("mathvariant")) {
        s.children.push(...h.children);
        continue;
      } else if (h.type === "mn" && s.type === "mn") {
        s.children.push(...h.children);
        continue;
      } else if (tr(h) && s.type === "mn") {
        s.children.push(...h.children);
        continue;
      } else if (h.type === "mn" && tr(s)) h.children = [...s.children, ...h.children], i.pop();
      else if ((h.type === "msup" || h.type === "msub") && h.children.length >= 1 && (s.type === "mn" || tr(s))) {
        var c = h.children[0];
        c instanceof M && c.type === "mn" && (c.children = [...s.children, ...c.children], i.pop());
      } else if (s.type === "mi" && s.children.length === 1) {
        var m = s.children[0];
        if (m instanceof ae && m.text === "\u0338" && (h.type === "mo" || h.type === "mi" || h.type === "mn")) {
          var p = h.children[0];
          p instanceof ae && p.text.length > 0 && (p.text = p.text.slice(0, 1) + "\u0338" + p.text.slice(1), i.pop());
        }
      }
    }
    i.push(h), s = h;
  }
  return i;
}, ot = function(e, t, n) {
  return Yr(Ae(e, t, n));
}, Y = function(e, t) {
  if (!e) return new M("mrow");
  if (A0[e.type]) return A0[e.type](e, t);
  throw new A("Got group of unknown type: '" + e.type + "'");
};
function Wn(r, e, t, n, a) {
  var i = Ae(r, t), s;
  i.length === 1 && i[0] instanceof M && kl.has(i[0].type) ? s = i[0] : s = new M("mrow", i);
  var l = new M("annotation", [new ae(e)]);
  l.setAttribute("encoding", "application/x-tex");
  var h = new M("semantics", [s, l]), c = new M("math", [h]);
  c.setAttribute("xmlns", "http://www.w3.org/1998/Math/MathML"), n && c.setAttribute("display", "block");
  var m = a ? "katex" : "katex-mathml";
  return T([m], [c]);
}
var Tl = [[1, 1, 1], [2, 1, 1], [3, 1, 1], [4, 2, 1], [5, 2, 1], [6, 3, 1], [7, 4, 2], [8, 6, 3], [9, 7, 6], [10, 8, 7], [11, 10, 9]], Xn = [0.5, 0.6, 0.7, 0.8, 0.9, 1, 1.2, 1.44, 1.728, 2.074, 2.488], Yn = function(e, t) {
  return t.size < 2 ? e : Tl[e - 1][t.size - 1];
};
class He {
  constructor(e) {
    this.style = void 0, this.color = void 0, this.size = void 0, this.textSize = void 0, this.phantom = void 0, this.font = void 0, this.fontFamily = void 0, this.fontWeight = void 0, this.fontShape = void 0, this.sizeMultiplier = void 0, this.maxSize = void 0, this.minRuleThickness = void 0, this._fontMetrics = void 0, this.style = e.style, this.color = e.color, this.size = e.size || He.BASESIZE, this.textSize = e.textSize || this.size, this.phantom = !!e.phantom, this.font = e.font || "", this.fontFamily = e.fontFamily || "", this.fontWeight = e.fontWeight || "", this.fontShape = e.fontShape || "", this.sizeMultiplier = Xn[this.size - 1], this.maxSize = e.maxSize, this.minRuleThickness = e.minRuleThickness, this._fontMetrics = void 0;
  }
  extend(e) {
    var t = { style: this.style, size: this.size, textSize: this.textSize, color: this.color, phantom: this.phantom, font: this.font, fontFamily: this.fontFamily, fontWeight: this.fontWeight, fontShape: this.fontShape, maxSize: this.maxSize, minRuleThickness: this.minRuleThickness };
    return Object.assign(t, e), new He(t);
  }
  havingStyle(e) {
    return this.style === e ? this : this.extend({ style: e, size: Yn(this.textSize, e) });
  }
  havingCrampedStyle() {
    return this.havingStyle(this.style.cramp());
  }
  havingSize(e) {
    return this.size === e && this.textSize === e ? this : this.extend({ style: this.style.text(), size: e, textSize: e, sizeMultiplier: Xn[e - 1] });
  }
  havingBaseStyle(e) {
    e = e || this.style.text();
    var t = Yn(He.BASESIZE, e);
    return this.size === t && this.textSize === He.BASESIZE && this.style === e ? this : this.extend({ style: e, size: t });
  }
  havingBaseSizing() {
    var e;
    switch (this.style.id) {
      case 4:
      case 5:
        e = 3;
        break;
      case 6:
      case 7:
        e = 1;
        break;
      default:
        e = 6;
    }
    return this.extend({ style: this.style.text(), size: e });
  }
  withColor(e) {
    return this.extend({ color: e });
  }
  withPhantom() {
    return this.extend({ phantom: true });
  }
  withFont(e) {
    return this.extend({ font: e });
  }
  withTextFontFamily(e) {
    return this.extend({ fontFamily: e, font: "" });
  }
  withTextFontWeight(e) {
    return this.extend({ fontWeight: e, font: "" });
  }
  withTextFontShape(e) {
    return this.extend({ fontShape: e, font: "" });
  }
  sizingClasses(e) {
    return e.size !== this.size ? ["sizing", "reset-size" + e.size, "size" + this.size] : [];
  }
  baseSizingClasses() {
    return this.size !== He.BASESIZE ? ["sizing", "reset-size" + this.size, "size" + He.BASESIZE] : [];
  }
  fontMetrics() {
    return this._fontMetrics || (this._fontMetrics = ll(this.size)), this._fontMetrics;
  }
  getColor() {
    return this.phantom ? "transparent" : this.color;
  }
}
He.BASESIZE = 6;
var Ya = function(e) {
  return new He({ style: e.displayMode ? $.DISPLAY : $.TEXT, maxSize: e.maxSize, minRuleThickness: e.minRuleThickness });
}, Za = function(e, t) {
  if (t.displayMode) {
    var n = ["katex-display"];
    t.leqno && n.push("leqno"), t.fleqn && n.push("fleqn"), e = T(n, [e]);
  }
  return e;
}, Al = function(e, t, n) {
  var a = Ya(n), i;
  if (n.output === "mathml") return Wn(e, t, a, n.displayMode, true);
  if (n.output === "html") {
    var s = Er(e, a);
    i = T(["katex"], [s]);
  } else {
    var l = Wn(e, t, a, n.displayMode, false), h = Er(e, a);
    i = T(["katex"], [l, h]);
  }
  return Za(i, n);
}, Ml = function(e, t, n) {
  var a = Ya(n), i = Er(e, a), s = T(["katex"], [i]);
  return Za(s, n);
}, zl = { widehat: "^", widecheck: "\u02C7", widetilde: "~", utilde: "~", overleftarrow: "\u2190", underleftarrow: "\u2190", xleftarrow: "\u2190", overrightarrow: "\u2192", underrightarrow: "\u2192", xrightarrow: "\u2192", underbrace: "\u23DF", overbrace: "\u23DE", underbracket: "\u23B5", overbracket: "\u23B4", overgroup: "\u23E0", undergroup: "\u23E1", overleftrightarrow: "\u2194", underleftrightarrow: "\u2194", xleftrightarrow: "\u2194", Overrightarrow: "\u21D2", xRightarrow: "\u21D2", overleftharpoon: "\u21BC", xleftharpoonup: "\u21BC", overrightharpoon: "\u21C0", xrightharpoonup: "\u21C0", xLeftarrow: "\u21D0", xLeftrightarrow: "\u21D4", xhookleftarrow: "\u21A9", xhookrightarrow: "\u21AA", xmapsto: "\u21A6", xrightharpoondown: "\u21C1", xleftharpoondown: "\u21BD", xrightleftharpoons: "\u21CC", xleftrightharpoons: "\u21CB", xtwoheadleftarrow: "\u219E", xtwoheadrightarrow: "\u21A0", xlongequal: "=", xtofrom: "\u21C4", xrightleftarrows: "\u21C4", xrightequilibrium: "\u21CC", xleftequilibrium: "\u21CB", "\\cdrightarrow": "\u2192", "\\cdleftarrow": "\u2190", "\\cdlongequal": "=" }, F0 = function(e) {
  var t = new M("mo", [new ae(zl[e.replace(/^\\/, "")])]);
  return t.setAttribute("stretchy", "true"), t;
}, Cl = { overrightarrow: [["rightarrow"], 0.888, 522, "xMaxYMin"], overleftarrow: [["leftarrow"], 0.888, 522, "xMinYMin"], underrightarrow: [["rightarrow"], 0.888, 522, "xMaxYMin"], underleftarrow: [["leftarrow"], 0.888, 522, "xMinYMin"], xrightarrow: [["rightarrow"], 1.469, 522, "xMaxYMin"], "\\cdrightarrow": [["rightarrow"], 3, 522, "xMaxYMin"], xleftarrow: [["leftarrow"], 1.469, 522, "xMinYMin"], "\\cdleftarrow": [["leftarrow"], 3, 522, "xMinYMin"], Overrightarrow: [["doublerightarrow"], 0.888, 560, "xMaxYMin"], xRightarrow: [["doublerightarrow"], 1.526, 560, "xMaxYMin"], xLeftarrow: [["doubleleftarrow"], 1.526, 560, "xMinYMin"], overleftharpoon: [["leftharpoon"], 0.888, 522, "xMinYMin"], xleftharpoonup: [["leftharpoon"], 0.888, 522, "xMinYMin"], xleftharpoondown: [["leftharpoondown"], 0.888, 522, "xMinYMin"], overrightharpoon: [["rightharpoon"], 0.888, 522, "xMaxYMin"], xrightharpoonup: [["rightharpoon"], 0.888, 522, "xMaxYMin"], xrightharpoondown: [["rightharpoondown"], 0.888, 522, "xMaxYMin"], xlongequal: [["longequal"], 0.888, 334, "xMinYMin"], "\\cdlongequal": [["longequal"], 3, 334, "xMinYMin"], xtwoheadleftarrow: [["twoheadleftarrow"], 0.888, 334, "xMinYMin"], xtwoheadrightarrow: [["twoheadrightarrow"], 0.888, 334, "xMaxYMin"], overleftrightarrow: [["leftarrow", "rightarrow"], 0.888, 522], overbrace: [["leftbrace", "midbrace", "rightbrace"], 1.6, 548], underbrace: [["leftbraceunder", "midbraceunder", "rightbraceunder"], 1.6, 548], underleftrightarrow: [["leftarrow", "rightarrow"], 0.888, 522], xleftrightarrow: [["leftarrow", "rightarrow"], 1.75, 522], xLeftrightarrow: [["doubleleftarrow", "doublerightarrow"], 1.75, 560], xrightleftharpoons: [["leftharpoondownplus", "rightharpoonplus"], 1.75, 716], xleftrightharpoons: [["leftharpoonplus", "rightharpoondownplus"], 1.75, 716], xhookleftarrow: [["leftarrow", "righthook"], 1.08, 522], xhookrightarrow: [["lefthook", "rightarrow"], 1.08, 522], overlinesegment: [["leftlinesegment", "rightlinesegment"], 0.888, 522], underlinesegment: [["leftlinesegment", "rightlinesegment"], 0.888, 522], overbracket: [["leftbracketover", "rightbracketover"], 1.6, 440], underbracket: [["leftbracketunder", "rightbracketunder"], 1.6, 410], overgroup: [["leftgroup", "rightgroup"], 0.888, 342], undergroup: [["leftgroupunder", "rightgroupunder"], 0.888, 342], xmapsto: [["leftmapsto", "rightarrow"], 1.5, 522], xtofrom: [["leftToFrom", "rightToFrom"], 1.75, 528], xrightleftarrows: [["baraboveleftarrow", "rightarrowabovebar"], 1.75, 901], xrightequilibrium: [["baraboveshortleftharpoon", "rightharpoonaboveshortbar"], 1.75, 716], xleftequilibrium: [["shortbaraboveleftharpoon", "shortrightharpoonabovebar"], 1.75, 716] }, El = /* @__PURE__ */ new Set(["widehat", "widecheck", "widetilde", "utilde"]), L0 = function(e, t) {
  function n() {
    var l = 4e5, h = e.label.slice(1);
    if (El.has(h) && "base" in e) {
      var c = e.base.type === "ordgroup" ? e.base.body.length : 1, m, p, b;
      if (c > 5) h === "widehat" || h === "widecheck" ? (m = 420, l = 2364, b = 0.42, p = h + "4") : (m = 312, l = 2340, b = 0.34, p = "tilde4");
      else {
        var w = [1, 1, 2, 2, 3, 3][c];
        h === "widehat" || h === "widecheck" ? (l = [0, 1062, 2364, 2364, 2364][w], m = [0, 239, 300, 360, 420][w], b = [0, 0.24, 0.3, 0.3, 0.36, 0.42][w], p = h + w) : (l = [0, 600, 1033, 2339, 2340][w], m = [0, 260, 286, 306, 312][w], b = [0, 0.26, 0.286, 0.3, 0.306, 0.34][w], p = "tilde" + w);
      }
      var x = new st(p), k = new Ue([x], { width: "100%", height: z(b), viewBox: "0 0 " + l + " " + m, preserveAspectRatio: "none" });
      return { span: lt([], [k], t), minWidth: 0, height: b };
    } else {
      var C = [], E = Cl[h];
      if (!E) throw new Error('No SVG data for "' + h + '".');
      var [B, F, P] = E, R = P / 1e3, D = B.length, H, W;
      if (D === 1) {
        if (E.length !== 4) throw new Error('Expected 4-tuple for single-path SVG data "' + h + '".');
        H = ["hide-tail"], W = [E[3]];
      } else if (D === 2) H = ["halfarrow-left", "halfarrow-right"], W = ["xMinYMin", "xMaxYMin"];
      else if (D === 3) H = ["brace-left", "brace-center", "brace-right"], W = ["xMinYMin", "xMidYMin", "xMaxYMin"];
      else throw new Error(`Correct katexImagesData or update code here to support
                    ` + D + " children.");
      for (var G = 0; G < D; G++) {
        var ve = new st(B[G]), xe = new Ue([ve], { width: "400em", height: z(R), viewBox: "0 0 " + l + " " + P, preserveAspectRatio: W[G] + " slice" }), te = lt([H[G]], [xe], t);
        if (D === 1) return { span: te, minWidth: F, height: R };
        te.style.height = z(R), C.push(te);
      }
      return { span: T(["stretchy"], C, t), minWidth: F, height: R };
    }
  }
  var { span: a, minWidth: i, height: s } = n();
  return a.height = s, a.style.height = z(s), i > 0 && (a.style.minWidth = z(i)), a;
}, Nl = function(e, t, n, a, i) {
  var s, l = e.height + e.depth + n + a;
  if (/fbox|color|angl/.test(t)) {
    if (s = T(["stretchy", t], [], i), t === "fbox") {
      var h = i.color && i.getColor();
      h && (s.style.borderColor = h);
    }
  } else {
    var c = [];
    /^[bx]cancel$/.test(t) && c.push(new yr({ x1: "0", y1: "0", x2: "100%", y2: "100%", "stroke-width": "0.046em" })), /^x?cancel$/.test(t) && c.push(new yr({ x1: "0", y1: "100%", x2: "100%", y2: "0", "stroke-width": "0.046em" }));
    var m = new Ue(c, { width: "100%", height: z(l) });
    s = lt([], [m], i);
  }
  return s.height = l, s.style.height = z(l), s;
}, Il = { bin: 1, close: 1, inner: 1, open: 1, punct: 1, rel: 1 }, Bl = { "accent-token": 1, mathord: 1, "op-token": 1, spacing: 1, textord: 1 };
function Rl(r) {
  return r in Il;
}
function _(r, e) {
  if (!r || r.type !== e) throw new Error("Expected node of type " + e + ", but got " + (r ? "node of type " + r.type : String(r)));
  return r;
}
function O0(r) {
  var e = P0(r);
  if (!e) throw new Error("Expected node of symbol group type, but got " + (r ? "node of type " + r.type : String(r)));
  return e;
}
function P0(r) {
  return r && (r.type === "atom" || Bl.hasOwnProperty(r.type)) ? r : null;
}
var Ka = (r) => {
  if (r instanceof Se) return r;
  if (il(r) && r.children.length === 1) return Ka(r.children[0]);
}, Kr = (r, e) => {
  var t, n, a;
  r && r.type === "supsub" ? (n = _(r.base, "accent"), t = n.base, r.base = t, a = al(U(r, e)), r.base = n) : (n = _(r, "accent"), t = n.base);
  var i = U(t, e.havingCrampedStyle()), s = n.isShifty && je(t), l = 0;
  if (s) {
    var h, c;
    l = (h = (c = Ka(i)) == null ? void 0 : c.skew) != null ? h : 0;
  }
  var m = n.label === "\\c", p = m ? i.height + i.depth : Math.min(i.height, e.fontMetrics().xHeight), b;
  if (n.isStretchy) b = L0(n, e), b = V({ positionType: "firstBaseline", children: [{ type: "elem", elem: i }, { type: "elem", elem: b, wrapperClasses: ["svg-align"], wrapperStyle: l > 0 ? { width: "calc(100% - " + z(2 * l) + ")", marginLeft: z(2 * l) } : void 0 }] });
  else {
    var w, x;
    n.label === "\\vec" ? (w = Va("vec", e), x = Ga.vec[1]) : (w = q0({ mode: n.mode, text: n.label }, e, "textord"), w = nl(w), w.italic = 0, x = w.width, m && (p += w.depth)), b = T(["accent-body"], [w]);
    var k = n.label === "\\textcircled";
    k && (b.classes.push("accent-full"), p = i.height);
    var C = l;
    k || (C -= x / 2), b.style.left = z(C), n.label === "\\textcircled" && (b.style.top = ".2em"), b = V({ positionType: "firstBaseline", children: [{ type: "elem", elem: i }, { type: "kern", size: -p }, { type: "elem", elem: b }] });
  }
  var E = T(["mord", "accent"], [b], e);
  return a ? (a.children[0] = E, a.height = Math.max(E.height, a.height), a.classes[0] = "mord", a) : E;
}, Qa = (r, e) => {
  var t = r.isStretchy ? F0(r.label) : new M("mo", [ze(r.label, r.mode)]), n = new M("mover", [Y(r.base, e), t]);
  return n.setAttribute("accent", "true"), n;
}, ql = new RegExp(["\\acute", "\\grave", "\\ddot", "\\tilde", "\\bar", "\\breve", "\\check", "\\hat", "\\vec", "\\dot", "\\mathring"].map((r) => "\\" + r).join("|"));
N({ type: "accent", names: ["\\acute", "\\grave", "\\ddot", "\\tilde", "\\bar", "\\breve", "\\check", "\\hat", "\\vec", "\\dot", "\\mathring", "\\widecheck", "\\widehat", "\\widetilde", "\\overrightarrow", "\\overleftarrow", "\\Overrightarrow", "\\overleftrightarrow", "\\overgroup", "\\overlinesegment", "\\overleftharpoon", "\\overrightharpoon"], props: { numArgs: 1 }, handler: (r, e) => {
  var t = M0(e[0]), n = !ql.test(r.funcName), a = !n || r.funcName === "\\widehat" || r.funcName === "\\widetilde" || r.funcName === "\\widecheck";
  return { type: "accent", mode: r.parser.mode, label: r.funcName, isStretchy: n, isShifty: a, base: t };
}, htmlBuilder: Kr, mathmlBuilder: Qa });
N({ type: "accent", names: ["\\'", "\\`", "\\^", "\\~", "\\=", "\\u", "\\.", '\\"', "\\c", "\\r", "\\H", "\\v", "\\textcircled"], props: { numArgs: 1, allowedInText: true, allowedInMath: true, argTypes: ["primitive"] }, handler: (r, e) => {
  var t = e[0], n = r.parser.mode;
  return n === "math" && (r.parser.settings.reportNonstrict("mathVsTextAccents", "LaTeX's accent " + r.funcName + " works only in text mode"), n = "text"), { type: "accent", mode: n, label: r.funcName, isStretchy: false, isShifty: true, base: t };
}, htmlBuilder: Kr, mathmlBuilder: Qa });
N({ type: "accentUnder", names: ["\\underleftarrow", "\\underrightarrow", "\\underleftrightarrow", "\\undergroup", "\\underlinesegment", "\\utilde"], props: { numArgs: 1 }, handler: (r, e) => {
  var { parser: t, funcName: n } = r, a = e[0];
  return { type: "accentUnder", mode: t.mode, label: n, base: a };
}, htmlBuilder: (r, e) => {
  var t = U(r.base, e), n = L0(r, e), a = r.label === "\\utilde" ? 0.12 : 0, i = V({ positionType: "top", positionData: t.height, children: [{ type: "elem", elem: n, wrapperClasses: ["svg-align"] }, { type: "kern", size: a }, { type: "elem", elem: t }] });
  return T(["mord", "accentunder"], [i], e);
}, mathmlBuilder: (r, e) => {
  var t = F0(r.label), n = new M("munder", [Y(r.base, e), t]);
  return n.setAttribute("accentunder", "true"), n;
} });
var d0 = (r) => {
  var e = new M("mpadded", r ? [r] : []);
  return e.setAttribute("width", "+0.6em"), e.setAttribute("lspace", "0.3em"), e;
};
N({ type: "xArrow", names: ["\\xleftarrow", "\\xrightarrow", "\\xLeftarrow", "\\xRightarrow", "\\xleftrightarrow", "\\xLeftrightarrow", "\\xhookleftarrow", "\\xhookrightarrow", "\\xmapsto", "\\xrightharpoondown", "\\xrightharpoonup", "\\xleftharpoondown", "\\xleftharpoonup", "\\xrightleftharpoons", "\\xleftrightharpoons", "\\xlongequal", "\\xtwoheadrightarrow", "\\xtwoheadleftarrow", "\\xtofrom", "\\xrightleftarrows", "\\xrightequilibrium", "\\xleftequilibrium", "\\\\cdrightarrow", "\\\\cdleftarrow", "\\\\cdlongequal"], props: { numArgs: 1, numOptionalArgs: 1 }, handler(r, e, t) {
  var { parser: n, funcName: a } = r;
  return { type: "xArrow", mode: n.mode, label: a, body: e[0], below: t[0] };
}, htmlBuilder(r, e) {
  var t = e.style, n = e.havingStyle(t.sup()), a = Ft(U(r.body, n, e), e), i = r.label.slice(0, 2) === "\\x" ? "x" : "cd";
  a.classes.push(i + "-arrow-pad");
  var s;
  r.below && (n = e.havingStyle(t.sub()), s = Ft(U(r.below, n, e), e), s.classes.push(i + "-arrow-pad"));
  var l = L0(r, e), h = -e.fontMetrics().axisHeight + 0.5 * l.height, c = -e.fontMetrics().axisHeight - 0.5 * l.height - 0.111;
  (a.depth > 0.25 || r.label === "\\xleftequilibrium") && (c -= a.depth);
  var m;
  if (s) {
    var p = -e.fontMetrics().axisHeight + s.height + 0.5 * l.height + 0.111;
    m = V({ positionType: "individualShift", children: [{ type: "elem", elem: a, shift: c }, { type: "elem", elem: l, shift: h, wrapperClasses: ["svg-align"] }, { type: "elem", elem: s, shift: p }] });
  } else m = V({ positionType: "individualShift", children: [{ type: "elem", elem: a, shift: c }, { type: "elem", elem: l, shift: h, wrapperClasses: ["svg-align"] }] });
  return T(["mrel", "x-arrow"], [m], e);
}, mathmlBuilder(r, e) {
  var t = F0(r.label);
  t.setAttribute("minsize", r.label.charAt(0) === "x" ? "1.75em" : "3.0em");
  var n;
  if (r.body) {
    var a = d0(Y(r.body, e));
    if (r.below) {
      var i = d0(Y(r.below, e));
      n = new M("munderover", [t, i, a]);
    } else n = new M("mover", [t, a]);
  } else if (r.below) {
    var s = d0(Y(r.below, e));
    n = new M("munder", [t, s]);
  } else n = d0(), n = new M("mover", [t, n]);
  return n;
} });
function Ja(r, e) {
  var t = oe(r.body, e, true);
  return T([r.mclass], t, e);
}
function ei(r, e) {
  var t, n = Ae(r.body, e);
  return r.mclass === "minner" ? t = new M("mpadded", n) : r.mclass === "mord" ? r.isCharacterBox ? (t = n[0], t.type = "mi") : t = new M("mi", n) : (r.isCharacterBox ? (t = n[0], t.type = "mo") : t = new M("mo", n), r.mclass === "mbin" ? (t.attributes.lspace = "0.22em", t.attributes.rspace = "0.22em") : r.mclass === "mpunct" ? (t.attributes.lspace = "0em", t.attributes.rspace = "0.17em") : r.mclass === "mopen" || r.mclass === "mclose" ? (t.attributes.lspace = "0em", t.attributes.rspace = "0em") : r.mclass === "minner" && (t.attributes.lspace = "0.0556em", t.attributes.width = "+0.1111em")), t;
}
N({ type: "mclass", names: ["\\mathord", "\\mathbin", "\\mathrel", "\\mathopen", "\\mathclose", "\\mathpunct", "\\mathinner"], props: { numArgs: 1, primitive: true }, handler(r, e) {
  var { parser: t, funcName: n } = r, a = e[0];
  return { type: "mclass", mode: t.mode, mclass: "m" + n.slice(5), body: ne(a), isCharacterBox: je(a) };
}, htmlBuilder: Ja, mathmlBuilder: ei });
var $0 = (r) => {
  var e = r.type === "ordgroup" && r.body.length ? r.body[0] : r;
  return e.type === "atom" && (e.family === "bin" || e.family === "rel") ? "m" + e.family : "mord";
};
N({ type: "mclass", names: ["\\@binrel"], props: { numArgs: 2 }, handler(r, e) {
  var { parser: t } = r;
  return { type: "mclass", mode: t.mode, mclass: $0(e[0]), body: ne(e[1]), isCharacterBox: je(e[1]) };
} });
N({ type: "mclass", names: ["\\stackrel", "\\overset", "\\underset"], props: { numArgs: 2 }, handler(r, e) {
  var { parser: t, funcName: n } = r, a = e[1], i = e[0], s;
  n !== "\\stackrel" ? s = $0(a) : s = "mrel";
  var l = { type: "op", mode: a.mode, limits: true, alwaysHandleSupSub: true, parentIsSupSub: false, symbol: false, suppressBaseShift: n !== "\\stackrel", body: ne(a) }, h = { type: "supsub", mode: i.mode, base: l, sup: n === "\\underset" ? null : i, sub: n === "\\underset" ? i : null };
  return { type: "mclass", mode: t.mode, mclass: s, body: [h], isCharacterBox: je(h) };
}, htmlBuilder: Ja, mathmlBuilder: ei });
N({ type: "pmb", names: ["\\pmb"], props: { numArgs: 1, allowedInText: true }, handler(r, e) {
  var { parser: t } = r;
  return { type: "pmb", mode: t.mode, mclass: $0(e[0]), body: ne(e[0]) };
}, htmlBuilder(r, e) {
  var t = oe(r.body, e, true), n = T([r.mclass], t, e);
  return n.style.textShadow = "0.02em 0.01em 0.04px", n;
}, mathmlBuilder(r, e) {
  var t = Ae(r.body, e), n = new M("mstyle", t);
  return n.setAttribute("style", "text-shadow: 0.02em 0.01em 0.04px"), n;
} });
var Fl = { ">": "\\\\cdrightarrow", "<": "\\\\cdleftarrow", "=": "\\\\cdlongequal", A: "\\uparrow", V: "\\downarrow", "|": "\\Vert", ".": "no arrow" }, Zn = () => ({ type: "styling", body: [], mode: "math", style: "display", resetFont: true }), Kn = (r) => r.type === "textord" && r.text === "@", Ll = (r, e) => (r.type === "mathord" || r.type === "atom") && r.text === e;
function Ol(r, e, t) {
  var n = Fl[r];
  switch (n) {
    case "\\\\cdrightarrow":
    case "\\\\cdleftarrow":
      return t.callFunction(n, [e[0]], [e[1]]);
    case "\\uparrow":
    case "\\downarrow": {
      var a = t.callFunction("\\\\cdleft", [e[0]], []), i = { type: "atom", text: n, mode: "math", family: "rel" }, s = t.callFunction("\\Big", [i], []), l = t.callFunction("\\\\cdright", [e[1]], []), h = { type: "ordgroup", mode: "math", body: [a, s, l] };
      return t.callFunction("\\\\cdparent", [h], []);
    }
    case "\\\\cdlongequal":
      return t.callFunction("\\\\cdlongequal", [], []);
    case "\\Vert": {
      var c = { type: "textord", text: "\\Vert", mode: "math" };
      return t.callFunction("\\Big", [c], []);
    }
    default:
      return { type: "textord", text: " ", mode: "math" };
  }
}
function Pl(r) {
  var e = [];
  for (r.gullet.beginGroup(), r.gullet.macros.set("\\cr", "\\\\\\relax"), r.gullet.beginGroup(); ; ) {
    e.push(r.parseExpression(false, "\\\\")), r.gullet.endGroup(), r.gullet.beginGroup();
    var t = r.fetch().text;
    if (t === "&" || t === "\\\\") r.consume();
    else if (t === "\\end") {
      e[e.length - 1].length === 0 && e.pop();
      break;
    } else throw new A("Expected \\\\ or \\cr or \\end", r.nextToken);
  }
  for (var n = [], a = [n], i = 0; i < e.length; i++) {
    for (var s = e[i], l = Zn(), h = 0; h < s.length; h++) if (!Kn(s[h])) l.body.push(s[h]);
    else {
      n.push(l), h += 1;
      var c = O0(s[h]).text, m = new Array(2);
      if (m[0] = { type: "ordgroup", mode: "math", body: [] }, m[1] = { type: "ordgroup", mode: "math", body: [] }, !"=|.".includes(c)) if ("<>AV".includes(c)) for (var p = 0; p < 2; p++) {
        for (var b = true, w = h + 1; w < s.length; w++) {
          if (Ll(s[w], c)) {
            b = false, h = w;
            break;
          }
          if (Kn(s[w])) throw new A("Missing a " + c + " character to complete a CD arrow.", s[w]);
          m[p].body.push(s[w]);
        }
        if (b) throw new A("Missing a " + c + " character to complete a CD arrow.", s[h]);
      }
      else throw new A('Expected one of "<>AV=|." after @', s[h]);
      var x = Ol(c, m, r), k = { type: "styling", body: [x], mode: "math", style: "display", resetFont: true };
      n.push(k), l = Zn();
    }
    i % 2 === 0 ? n.push(l) : n.shift(), n = [], a.push(n);
  }
  r.gullet.endGroup(), r.gullet.endGroup();
  var C = new Array(a[0].length).fill({ type: "align", align: "c", pregap: 0.25, postgap: 0.25 });
  return { type: "array", mode: "math", body: a, arraystretch: 1, addJot: true, rowGaps: [null], cols: C, colSeparationType: "CD", hLinesBeforeRow: new Array(a.length + 1).fill([]) };
}
N({ type: "cdlabel", names: ["\\\\cdleft", "\\\\cdright"], props: { numArgs: 1 }, handler(r, e) {
  var { parser: t, funcName: n } = r;
  return { type: "cdlabel", mode: t.mode, side: n.slice(4), label: e[0] };
}, htmlBuilder(r, e) {
  var t = e.havingStyle(e.style.sup()), n = Ft(U(r.label, t, e), e);
  return n.classes.push("cd-label-" + r.side), n.style.bottom = z(0.8 - n.depth), n.height = 0, n.depth = 0, n;
}, mathmlBuilder(r, e) {
  var t = new M("mrow", [Y(r.label, e)]);
  return t = new M("mpadded", [t]), t.setAttribute("width", "0"), r.side === "left" && t.setAttribute("lspace", "-1width"), t.setAttribute("voffset", "0.7em"), t = new M("mstyle", [t]), t.setAttribute("displaystyle", "false"), t.setAttribute("scriptlevel", "1"), t;
} });
N({ type: "cdlabelparent", names: ["\\\\cdparent"], props: { numArgs: 1 }, handler(r, e) {
  var { parser: t } = r;
  return { type: "cdlabelparent", mode: t.mode, fragment: e[0] };
}, htmlBuilder(r, e) {
  var t = Ft(U(r.fragment, e), e);
  return t.classes.push("cd-vert-arrow"), t;
}, mathmlBuilder(r, e) {
  return new M("mrow", [Y(r.fragment, e)]);
} });
N({ type: "textord", names: ["\\@char"], props: { numArgs: 1, allowedInText: true }, handler(r, e) {
  for (var { parser: t } = r, n = _(e[0], "ordgroup"), a = n.body, i = "", s = 0; s < a.length; s++) {
    var l = _(a[s], "textord");
    i += l.text;
  }
  var h = parseInt(i), c;
  if (isNaN(h)) throw new A("\\@char has non-numeric argument " + i);
  if (h < 0 || h >= 1114111) throw new A("\\@char with invalid code point " + i);
  return h <= 65535 ? c = String.fromCharCode(h) : (h -= 65536, c = String.fromCharCode((h >> 10) + 55296, (h & 1023) + 56320)), { type: "textord", mode: t.mode, text: c };
} });
var ti = (r, e) => {
  var t = oe(r.body, e.withColor(r.color), false);
  return Xe(t);
}, ri = (r, e) => {
  var t = Ae(r.body, e.withColor(r.color)), n = new M("mstyle", t);
  return n.setAttribute("mathcolor", r.color), n;
};
N({ type: "color", names: ["\\textcolor"], props: { numArgs: 2, allowedInText: true, argTypes: ["color", "original"] }, handler(r, e) {
  var { parser: t } = r, n = _(e[0], "color-token").color, a = e[1];
  return { type: "color", mode: t.mode, color: n, body: ne(a) };
}, htmlBuilder: ti, mathmlBuilder: ri });
N({ type: "color", names: ["\\color"], props: { numArgs: 1, allowedInText: true, argTypes: ["color"] }, handler(r, e) {
  var { parser: t, breakOnTokenText: n } = r, a = _(e[0], "color-token").color;
  t.gullet.macros.set("\\current@color", a);
  var i = t.parseExpression(true, n);
  return { type: "color", mode: t.mode, color: a, body: i };
}, htmlBuilder: ti, mathmlBuilder: ri });
N({ type: "cr", names: ["\\\\"], props: { numArgs: 0, numOptionalArgs: 0, allowedInText: true }, handler(r, e, t) {
  var { parser: n } = r, a = n.gullet.future().text === "[" ? n.parseSizeGroup(true) : null, i = !n.settings.displayMode || !n.settings.useStrictBehavior("newLineInDisplayMode", "In LaTeX, \\\\ or \\newline does nothing in display mode");
  return { type: "cr", mode: n.mode, newLine: i, size: a && _(a, "size").value };
}, htmlBuilder(r, e) {
  var t = T(["mspace"], [], e);
  return r.newLine && (t.classes.push("newline"), r.size && (t.style.marginTop = z(J(r.size, e)))), t;
}, mathmlBuilder(r, e) {
  var t = new M("mspace");
  return r.newLine && (t.setAttribute("linebreak", "newline"), r.size && t.setAttribute("height", z(J(r.size, e)))), t;
} });
var Nr = { "\\global": "\\global", "\\long": "\\\\globallong", "\\\\globallong": "\\\\globallong", "\\def": "\\gdef", "\\gdef": "\\gdef", "\\edef": "\\xdef", "\\xdef": "\\xdef", "\\let": "\\\\globallet", "\\futurelet": "\\\\globalfuture" }, ni = (r) => {
  var e = r.text;
  if (/^(?:[\\{}$&#^_]|EOF)$/.test(e)) throw new A("Expected a control sequence", r);
  return e;
}, $l = (r) => {
  var e = r.gullet.popToken();
  return e.text === "=" && (e = r.gullet.popToken(), e.text === " " && (e = r.gullet.popToken())), e;
}, ai = (r, e, t, n) => {
  var a = r.gullet.macros.get(t.text);
  a == null && (t.noexpand = true, a = { tokens: [t], numArgs: 0, unexpandable: !r.gullet.isExpandable(t.text) }), r.gullet.macros.set(e, a, n);
};
N({ type: "internal", names: ["\\global", "\\long", "\\\\globallong"], props: { numArgs: 0, allowedInText: true }, handler(r) {
  var { parser: e, funcName: t } = r;
  e.consumeSpaces();
  var n = e.fetch();
  if (Nr[n.text]) return (t === "\\global" || t === "\\\\globallong") && (n.text = Nr[n.text]), _(e.parseFunction(), "internal");
  throw new A("Invalid token after macro prefix", n);
} });
N({ type: "internal", names: ["\\def", "\\gdef", "\\edef", "\\xdef"], props: { numArgs: 0, allowedInText: true, primitive: true }, handler(r) {
  var { parser: e, funcName: t } = r, n = e.gullet.popToken(), a = n.text;
  if (/^(?:[\\{}$&#^_]|EOF)$/.test(a)) throw new A("Expected a control sequence", n);
  for (var i = 0, s, l = [[]]; e.gullet.future().text !== "{"; ) if (n = e.gullet.popToken(), n.text === "#") {
    if (e.gullet.future().text === "{") {
      s = e.gullet.future(), l[i].push("{");
      break;
    }
    if (n = e.gullet.popToken(), !/^[1-9]$/.test(n.text)) throw new A('Invalid argument number "' + n.text + '"');
    if (parseInt(n.text) !== i + 1) throw new A('Argument number "' + n.text + '" out of order');
    i++, l.push([]);
  } else {
    if (n.text === "EOF") throw new A("Expected a macro definition");
    l[i].push(n.text);
  }
  var { tokens: h } = e.gullet.consumeArg();
  return s && h.unshift(s), (t === "\\edef" || t === "\\xdef") && (h = e.gullet.expandTokens(h), h.reverse()), e.gullet.macros.set(a, { tokens: h, numArgs: i, delimiters: l }, t === Nr[t]), { type: "internal", mode: e.mode };
} });
N({ type: "internal", names: ["\\let", "\\\\globallet"], props: { numArgs: 0, allowedInText: true, primitive: true }, handler(r) {
  var { parser: e, funcName: t } = r, n = ni(e.gullet.popToken());
  e.gullet.consumeSpaces();
  var a = $l(e);
  return ai(e, n, a, t === "\\\\globallet"), { type: "internal", mode: e.mode };
} });
N({ type: "internal", names: ["\\futurelet", "\\\\globalfuture"], props: { numArgs: 0, allowedInText: true, primitive: true }, handler(r) {
  var { parser: e, funcName: t } = r, n = ni(e.gullet.popToken()), a = e.gullet.popToken(), i = e.gullet.popToken();
  return ai(e, n, i, t === "\\\\globalfuture"), e.gullet.pushToken(i), e.gullet.pushToken(a), { type: "internal", mode: e.mode };
} });
var jt = function(e, t, n) {
  var a = Z.math[e] && Z.math[e].replace, i = jr(a || e, t, n);
  if (!i) throw new Error("Unsupported symbol " + e + " and font size " + t + ".");
  return i;
}, Qr = function(e, t, n, a) {
  var i = n.havingBaseStyle(t), s = T(a.concat(i.sizingClasses(n)), [e], n), l = i.sizeMultiplier / n.sizeMultiplier;
  return s.height *= l, s.depth *= l, s.maxFontSize = i.sizeMultiplier, s;
}, ii = function(e, t, n) {
  var a = t.havingBaseStyle(n), i = (1 - t.sizeMultiplier / a.sizeMultiplier) * t.fontMetrics().axisHeight;
  e.classes.push("delimcenter"), e.style.top = z(i), e.height -= i, e.depth += i;
}, Dl = function(e, t, n, a, i, s) {
  var l = me(e, "Main-Regular", i, a), h = Qr(l, t, a, s);
  return ii(h, a, t), h;
}, Hl = function(e, t, n, a) {
  return me(e, "Size" + t + "-Regular", n, a);
}, si = function(e, t, n, a, i, s) {
  var l = Hl(e, t, i, a), h = Qr(T(["delimsizing", "size" + t], [l], a), $.TEXT, a, s);
  return n && ii(h, a, $.TEXT), h;
}, rr = function(e, t, n) {
  var a;
  t === "Size1-Regular" ? a = "delim-size1" : a = "delim-size4";
  var i = T(["delimsizinginner", a], [T([], [me(e, t, n)])]);
  return { type: "elem", elem: i };
}, nr = function(e, t, n) {
  var a = Re["Size4-Regular"][e.charCodeAt(0)] ? Re["Size4-Regular"][e.charCodeAt(0)][4] : Re["Size1-Regular"][e.charCodeAt(0)][4], i = new st("inner", Zs(e, Math.round(1e3 * t))), s = new Ue([i], { width: z(a), height: z(t), style: "width:" + z(a), viewBox: "0 0 " + 1e3 * a + " " + Math.round(1e3 * t), preserveAspectRatio: "xMinYMin" }), l = lt([], [s], n);
  return l.height = t, l.style.height = z(t), l.style.width = z(a), { type: "elem", elem: l };
}, Ir = 8e-3, m0 = { type: "kern", size: -1 * Ir }, _l = /* @__PURE__ */ new Set(["|", "\\lvert", "\\rvert", "\\vert"]), Gl = /* @__PURE__ */ new Set(["\\|", "\\lVert", "\\rVert", "\\Vert"]), li = function(e, t, n, a, i, s) {
  var l, h, c, m, p = "", b = 0;
  l = c = m = e, h = null;
  var w = "Size1-Regular";
  e === "\\uparrow" ? c = m = "\u23D0" : e === "\\Uparrow" ? c = m = "\u2016" : e === "\\downarrow" ? l = c = "\u23D0" : e === "\\Downarrow" ? l = c = "\u2016" : e === "\\updownarrow" ? (l = "\\uparrow", c = "\u23D0", m = "\\downarrow") : e === "\\Updownarrow" ? (l = "\\Uparrow", c = "\u2016", m = "\\Downarrow") : _l.has(e) ? (c = "\u2223", p = "vert", b = 333) : Gl.has(e) ? (c = "\u2225", p = "doublevert", b = 556) : e === "[" || e === "\\lbrack" ? (l = "\u23A1", c = "\u23A2", m = "\u23A3", w = "Size4-Regular", p = "lbrack", b = 667) : e === "]" || e === "\\rbrack" ? (l = "\u23A4", c = "\u23A5", m = "\u23A6", w = "Size4-Regular", p = "rbrack", b = 667) : e === "\\lfloor" || e === "\u230A" ? (c = l = "\u23A2", m = "\u23A3", w = "Size4-Regular", p = "lfloor", b = 667) : e === "\\lceil" || e === "\u2308" ? (l = "\u23A1", c = m = "\u23A2", w = "Size4-Regular", p = "lceil", b = 667) : e === "\\rfloor" || e === "\u230B" ? (c = l = "\u23A5", m = "\u23A6", w = "Size4-Regular", p = "rfloor", b = 667) : e === "\\rceil" || e === "\u2309" ? (l = "\u23A4", c = m = "\u23A5", w = "Size4-Regular", p = "rceil", b = 667) : e === "(" || e === "\\lparen" ? (l = "\u239B", c = "\u239C", m = "\u239D", w = "Size4-Regular", p = "lparen", b = 875) : e === ")" || e === "\\rparen" ? (l = "\u239E", c = "\u239F", m = "\u23A0", w = "Size4-Regular", p = "rparen", b = 875) : e === "\\{" || e === "\\lbrace" ? (l = "\u23A7", h = "\u23A8", m = "\u23A9", c = "\u23AA", w = "Size4-Regular") : e === "\\}" || e === "\\rbrace" ? (l = "\u23AB", h = "\u23AC", m = "\u23AD", c = "\u23AA", w = "Size4-Regular") : e === "\\lgroup" || e === "\u27EE" ? (l = "\u23A7", m = "\u23A9", c = "\u23AA", w = "Size4-Regular") : e === "\\rgroup" || e === "\u27EF" ? (l = "\u23AB", m = "\u23AD", c = "\u23AA", w = "Size4-Regular") : e === "\\lmoustache" || e === "\u23B0" ? (l = "\u23A7", m = "\u23AD", c = "\u23AA", w = "Size4-Regular") : (e === "\\rmoustache" || e === "\u23B1") && (l = "\u23AB", m = "\u23A9", c = "\u23AA", w = "Size4-Regular");
  var x = jt(l, w, i), k = x.height + x.depth, C = jt(c, w, i), E = C.height + C.depth, B = jt(m, w, i), F = B.height + B.depth, P = 0, R = 1;
  if (h !== null) {
    var D = jt(h, w, i);
    P = D.height + D.depth, R = 2;
  }
  var H = k + F + P, W = Math.max(0, Math.ceil((t - H) / (R * E))), G = H + W * R * E, ve = a.fontMetrics().axisHeight;
  n && (ve *= a.sizeMultiplier);
  var xe = G / 2 - ve, te = [];
  if (p.length > 0) {
    var Dt = G - k - F, Ne = Math.round(G * 1e3), Ce = Ks(p, Math.round(Dt * 1e3)), Ye = new st(p, Ce), Tt = z(b / 1e3), At = z(Ne / 1e3), W0 = new Ue([Ye], { width: Tt, height: At, viewBox: "0 0 " + b + " " + Ne }), Ze = lt([], [W0], a);
    Ze.height = Ne / 1e3, Ze.style.width = Tt, Ze.style.height = At, te.push({ type: "elem", elem: Ze });
  } else {
    if (te.push(rr(m, w, i)), te.push(m0), h === null) {
      var Ke = G - k - F + 2 * Ir;
      te.push(nr(c, Ke, a));
    } else {
      var Ht = (G - k - F - P) / 2 + 2 * Ir;
      te.push(nr(c, Ht, a)), te.push(m0), te.push(rr(h, w, i)), te.push(m0), te.push(nr(c, Ht, a));
    }
    te.push(m0), te.push(rr(l, w, i));
  }
  var Ee = a.havingBaseStyle($.TEXT), t0 = V({ positionType: "bottom", positionData: xe, children: te });
  return Qr(T(["delimsizing", "mult"], [t0], Ee), $.TEXT, a, s);
}, ar = 80, ir = 0.08, sr = function(e, t, n, a, i) {
  var s = Ys(e, a, n), l = new st(e, s), h = new Ue([l], { width: "400em", height: z(t), viewBox: "0 0 400000 " + n, preserveAspectRatio: "xMinYMin slice" });
  return lt(["hide-tail"], [h], i);
}, Vl = function(e, t) {
  var n = t.havingBaseSizing(), a = di("\\surd", e * n.sizeMultiplier, ci, n), i = n.sizeMultiplier, s = Math.max(0, t.minRuleThickness - t.fontMetrics().sqrtRuleThickness), l, h, c, m, p;
  return a.type === "small" ? (m = 1e3 + 1e3 * s + ar, e < 1 ? i = 1 : e < 1.4 && (i = 0.7), h = (1 + s + ir) / i, c = (1 + s) / i, l = sr("sqrtMain", h, m, s, t), l.style.minWidth = "0.853em", p = 0.833 / i) : a.type === "large" ? (m = (1e3 + ar) * Wt[a.size], c = (Wt[a.size] + s) / i, h = (Wt[a.size] + s + ir) / i, l = sr("sqrtSize" + a.size, h, m, s, t), l.style.minWidth = "1.02em", p = 1 / i) : (h = e + s + ir, c = e + s, m = Math.floor(1e3 * e + s) + ar, l = sr("sqrtTall", h, m, s, t), l.style.minWidth = "0.742em", p = 1.056), l.height = c, l.style.height = z(h), { span: l, advanceWidth: p, ruleWidth: (t.fontMetrics().sqrtRuleThickness + s) * i };
}, oi = /* @__PURE__ */ new Set(["(", "\\lparen", ")", "\\rparen", "[", "\\lbrack", "]", "\\rbrack", "\\{", "\\lbrace", "\\}", "\\rbrace", "\\lfloor", "\\rfloor", "\u230A", "\u230B", "\\lceil", "\\rceil", "\u2308", "\u2309", "\\surd"]), Ul = /* @__PURE__ */ new Set(["\\uparrow", "\\downarrow", "\\updownarrow", "\\Uparrow", "\\Downarrow", "\\Updownarrow", "|", "\\|", "\\vert", "\\Vert", "\\lvert", "\\rvert", "\\lVert", "\\rVert", "\\lgroup", "\\rgroup", "\u27EE", "\u27EF", "\\lmoustache", "\\rmoustache", "\u23B0", "\u23B1"]), ui = /* @__PURE__ */ new Set(["<", ">", "\\langle", "\\rangle", "/", "\\backslash", "\\lt", "\\gt"]), Wt = [0, 1.2, 1.8, 2.4, 3], hi = function(e, t, n, a, i) {
  if (e === "<" || e === "\\lt" || e === "\u27E8" ? e = "\\langle" : (e === ">" || e === "\\gt" || e === "\u27E9") && (e = "\\rangle"), oi.has(e) || ui.has(e)) return si(e, t, false, n, a, i);
  if (Ul.has(e)) return li(e, Wt[t], false, n, a, i);
  throw new A("Illegal delimiter: '" + e + "'");
}, jl = [{ type: "small", style: $.SCRIPTSCRIPT }, { type: "small", style: $.SCRIPT }, { type: "small", style: $.TEXT }, { type: "large", size: 1 }, { type: "large", size: 2 }, { type: "large", size: 3 }, { type: "large", size: 4 }], Wl = [{ type: "small", style: $.SCRIPTSCRIPT }, { type: "small", style: $.SCRIPT }, { type: "small", style: $.TEXT }, { type: "stack" }], ci = [{ type: "small", style: $.SCRIPTSCRIPT }, { type: "small", style: $.SCRIPT }, { type: "small", style: $.TEXT }, { type: "large", size: 1 }, { type: "large", size: 2 }, { type: "large", size: 3 }, { type: "large", size: 4 }, { type: "stack" }], Xl = function(e) {
  if (e.type === "small") return "Main-Regular";
  if (e.type === "large") return "Size" + e.size + "-Regular";
  if (e.type === "stack") return "Size4-Regular";
  var t = e.type;
  throw new Error("Add support for delim type '" + t + "' here.");
}, di = function(e, t, n, a) {
  for (var i = Math.min(2, 3 - a.style.size), s = i; s < n.length; s++) {
    var l = n[s];
    if (l.type === "stack") break;
    var h = jt(e, Xl(l), "math"), c = h.height + h.depth;
    if (l.type === "small") {
      var m = a.havingBaseStyle(l.style);
      c *= m.sizeMultiplier;
    }
    if (c > t) return l;
  }
  return n[n.length - 1];
}, Br = function(e, t, n, a, i, s) {
  e === "<" || e === "\\lt" || e === "\u27E8" ? e = "\\langle" : (e === ">" || e === "\\gt" || e === "\u27E9") && (e = "\\rangle");
  var l;
  ui.has(e) ? l = jl : oi.has(e) ? l = ci : l = Wl;
  var h = di(e, t, l, a);
  return h.type === "small" ? Dl(e, h.style, n, a, i, s) : h.type === "large" ? si(e, h.size, n, a, i, s) : li(e, t, n, a, i, s);
}, lr = function(e, t, n, a, i, s) {
  var l = a.fontMetrics().axisHeight * a.sizeMultiplier, h = 901, c = 5 / a.fontMetrics().ptPerEm, m = Math.max(t - l, n + l), p = Math.max(m / 500 * h, 2 * m - c);
  return Br(e, p, true, a, i, s);
}, Qn = { "\\bigl": { mclass: "mopen", size: 1 }, "\\Bigl": { mclass: "mopen", size: 2 }, "\\biggl": { mclass: "mopen", size: 3 }, "\\Biggl": { mclass: "mopen", size: 4 }, "\\bigr": { mclass: "mclose", size: 1 }, "\\Bigr": { mclass: "mclose", size: 2 }, "\\biggr": { mclass: "mclose", size: 3 }, "\\Biggr": { mclass: "mclose", size: 4 }, "\\bigm": { mclass: "mrel", size: 1 }, "\\Bigm": { mclass: "mrel", size: 2 }, "\\biggm": { mclass: "mrel", size: 3 }, "\\Biggm": { mclass: "mrel", size: 4 }, "\\big": { mclass: "mord", size: 1 }, "\\Big": { mclass: "mord", size: 2 }, "\\bigg": { mclass: "mord", size: 3 }, "\\Bigg": { mclass: "mord", size: 4 } }, Yl = /* @__PURE__ */ new Set(["(", "\\lparen", ")", "\\rparen", "[", "\\lbrack", "]", "\\rbrack", "\\{", "\\lbrace", "\\}", "\\rbrace", "\\lfloor", "\\rfloor", "\u230A", "\u230B", "\\lceil", "\\rceil", "\u2308", "\u2309", "<", ">", "\\langle", "\u27E8", "\\rangle", "\u27E9", "\\lt", "\\gt", "\\lvert", "\\rvert", "\\lVert", "\\rVert", "\\lgroup", "\\rgroup", "\u27EE", "\u27EF", "\\lmoustache", "\\rmoustache", "\u23B0", "\u23B1", "/", "\\backslash", "|", "\\vert", "\\|", "\\Vert", "\\uparrow", "\\Uparrow", "\\downarrow", "\\Downarrow", "\\updownarrow", "\\Updownarrow", "."]);
function Jn(r) {
  return "isMiddle" in r;
}
function D0(r, e) {
  var t = P0(r);
  if (t && Yl.has(t.text)) return t;
  throw t ? new A("Invalid delimiter '" + t.text + "' after '" + e.funcName + "'", r) : new A("Invalid delimiter type '" + r.type + "'", r);
}
N({ type: "delimsizing", names: ["\\bigl", "\\Bigl", "\\biggl", "\\Biggl", "\\bigr", "\\Bigr", "\\biggr", "\\Biggr", "\\bigm", "\\Bigm", "\\biggm", "\\Biggm", "\\big", "\\Big", "\\bigg", "\\Bigg"], props: { numArgs: 1, argTypes: ["primitive"] }, handler: (r, e) => {
  var t = D0(e[0], r);
  return { type: "delimsizing", mode: r.parser.mode, size: Qn[r.funcName].size, mclass: Qn[r.funcName].mclass, delim: t.text };
}, htmlBuilder: (r, e) => r.delim === "." ? T([r.mclass]) : hi(r.delim, r.size, e, r.mode, [r.mclass]), mathmlBuilder: (r) => {
  var e = [];
  r.delim !== "." && e.push(ze(r.delim, r.mode));
  var t = new M("mo", e);
  r.mclass === "mopen" || r.mclass === "mclose" ? t.setAttribute("fence", "true") : t.setAttribute("fence", "false"), t.setAttribute("stretchy", "true");
  var n = z(Wt[r.size]);
  return t.setAttribute("minsize", n), t.setAttribute("maxsize", n), t;
} });
function ea(r) {
  if (!r.body) throw new Error("Bug: The leftright ParseNode wasn't fully parsed.");
}
N({ type: "leftright-right", names: ["\\right"], props: { numArgs: 1, primitive: true }, handler: (r, e) => {
  var t = r.parser.gullet.macros.get("\\current@color");
  if (t && typeof t != "string") throw new A("\\current@color set to non-string in \\right");
  return { type: "leftright-right", mode: r.parser.mode, delim: D0(e[0], r).text, color: t };
} });
N({ type: "leftright", names: ["\\left"], props: { numArgs: 1, primitive: true }, handler: (r, e) => {
  var t = D0(e[0], r), n = r.parser;
  ++n.leftrightDepth;
  var a = n.parseExpression(false);
  --n.leftrightDepth, n.expect("\\right", false);
  var i = _(n.parseFunction(), "leftright-right");
  return { type: "leftright", mode: n.mode, body: a, left: t.text, right: i.delim, rightColor: i.color };
}, htmlBuilder: (r, e) => {
  ea(r);
  for (var t = oe(r.body, e, true, ["mopen", "mclose"]), n = 0, a = 0, i = false, s = 0; s < t.length; s++) {
    var l = t[s];
    Jn(l) ? i = true : (n = Math.max(t[s].height, n), a = Math.max(t[s].depth, a));
  }
  n *= e.sizeMultiplier, a *= e.sizeMultiplier;
  var h;
  if (r.left === "." ? h = Kt(e, ["mopen"]) : h = lr(r.left, n, a, e, r.mode, ["mopen"]), t.unshift(h), i) for (var c = 1; c < t.length; c++) {
    var m = t[c];
    if (Jn(m)) {
      var p = m.isMiddle;
      t[c] = lr(p.delim, n, a, p.options, r.mode, []);
    }
  }
  var b;
  if (r.right === ".") b = Kt(e, ["mclose"]);
  else {
    var w = r.rightColor ? e.withColor(r.rightColor) : e;
    b = lr(r.right, n, a, w, r.mode, ["mclose"]);
  }
  return t.push(b), T(["minner"], t, e);
}, mathmlBuilder: (r, e) => {
  ea(r);
  var t = Ae(r.body, e);
  if (r.left !== ".") {
    var n = new M("mo", [ze(r.left, r.mode)]);
    n.setAttribute("fence", "true"), t.unshift(n);
  }
  if (r.right !== ".") {
    var a = new M("mo", [ze(r.right, r.mode)]);
    a.setAttribute("fence", "true"), r.rightColor && a.setAttribute("mathcolor", r.rightColor), t.push(a);
  }
  return Yr(t);
} });
N({ type: "middle", names: ["\\middle"], props: { numArgs: 1, primitive: true }, handler: (r, e) => {
  var t = D0(e[0], r);
  if (!r.parser.leftrightDepth) throw new A("\\middle without preceding \\left", t);
  return { type: "middle", mode: r.parser.mode, delim: t.text };
}, htmlBuilder: (r, e) => {
  var t;
  return r.delim === "." ? t = Kt(e, []) : (t = hi(r.delim, 1, e, r.mode, []), t.isMiddle = { delim: r.delim, options: e }), t;
}, mathmlBuilder: (r, e) => {
  var t = r.delim === "\\vert" || r.delim === "|" ? ze("|", "text") : ze(r.delim, r.mode), n = new M("mo", [t]);
  return n.setAttribute("fence", "true"), n.setAttribute("lspace", "0.05em"), n.setAttribute("rspace", "0.05em"), n;
} });
var H0 = (r, e) => {
  var t = Ft(U(r.body, e), e), n = r.label.slice(1), a = e.sizeMultiplier, i, s, l = je(r.body);
  if (n === "sout") i = T(["stretchy", "sout"]), i.height = e.fontMetrics().defaultRuleThickness / a, s = -0.5 * e.fontMetrics().xHeight;
  else if (n === "phase") {
    var h = J({ number: 0.6, unit: "pt" }, e), c = J({ number: 0.35, unit: "ex" }, e), m = e.havingBaseSizing();
    a = a / m.sizeMultiplier;
    var p = t.height + t.depth + h + c;
    t.style.paddingLeft = z(p / 2 + h);
    var b = Math.floor(1e3 * p * a), w = Ws(b), x = new Ue([new st("phase", w)], { width: "400em", height: z(b / 1e3), viewBox: "0 0 400000 " + b, preserveAspectRatio: "xMinYMin slice" });
    i = lt(["hide-tail"], [x], e), i.style.height = z(p), s = t.depth + h + c;
  } else {
    /cancel/.test(n) ? l || t.classes.push("cancel-pad") : n === "angl" ? t.classes.push("anglpad") : t.classes.push("boxpad");
    var k, C, E = 0;
    /box/.test(n) ? (E = Math.max(e.fontMetrics().fboxrule, e.minRuleThickness), k = e.fontMetrics().fboxsep + (n === "colorbox" ? 0 : E), C = k) : n === "angl" ? (E = Math.max(e.fontMetrics().defaultRuleThickness, e.minRuleThickness), k = 4 * E, C = Math.max(0, 0.25 - t.depth)) : (k = l ? 0.2 : 0, C = k), i = Nl(t, n, k, C, e), /fbox|boxed|fcolorbox/.test(n) ? (i.style.borderStyle = "solid", i.style.borderWidth = z(E)) : n === "angl" && E !== 0.049 && (i.style.borderTopWidth = z(E), i.style.borderRightWidth = z(E)), s = t.depth + C, r.backgroundColor && (i.style.backgroundColor = r.backgroundColor, r.borderColor && (i.style.borderColor = r.borderColor));
  }
  var B;
  if (r.backgroundColor) B = V({ positionType: "individualShift", children: [{ type: "elem", elem: i, shift: s }, { type: "elem", elem: t, shift: 0 }] });
  else {
    var F = /cancel|phase/.test(n) ? ["svg-align"] : [];
    B = V({ positionType: "individualShift", children: [{ type: "elem", elem: t, shift: 0 }, { type: "elem", elem: i, shift: s, wrapperClasses: F }] });
  }
  return /cancel/.test(n) && (B.height = t.height, B.depth = t.depth), /cancel/.test(n) && !l ? T(["mord", "cancel-lap"], [B], e) : T(["mord"], [B], e);
}, _0 = (r, e) => {
  var t, n = new M(r.label.includes("colorbox") ? "mpadded" : "menclose", [Y(r.body, e)]);
  switch (r.label) {
    case "\\cancel":
      n.setAttribute("notation", "updiagonalstrike");
      break;
    case "\\bcancel":
      n.setAttribute("notation", "downdiagonalstrike");
      break;
    case "\\phase":
      n.setAttribute("notation", "phasorangle");
      break;
    case "\\sout":
      n.setAttribute("notation", "horizontalstrike");
      break;
    case "\\fbox":
      n.setAttribute("notation", "box");
      break;
    case "\\angl":
      n.setAttribute("notation", "actuarial");
      break;
    case "\\fcolorbox":
    case "\\colorbox":
      if (t = e.fontMetrics().fboxsep * e.fontMetrics().ptPerEm, n.setAttribute("width", "+" + 2 * t + "pt"), n.setAttribute("height", "+" + 2 * t + "pt"), n.setAttribute("lspace", t + "pt"), n.setAttribute("voffset", t + "pt"), r.label === "\\fcolorbox") {
        var a = Math.max(e.fontMetrics().fboxrule, e.minRuleThickness);
        n.setAttribute("style", "border: " + z(a) + " solid " + r.borderColor);
      }
      break;
    case "\\xcancel":
      n.setAttribute("notation", "updiagonalstrike downdiagonalstrike");
      break;
  }
  return r.backgroundColor && n.setAttribute("mathbackground", r.backgroundColor), n;
};
N({ type: "enclose", names: ["\\colorbox"], props: { numArgs: 2, allowedInText: true, argTypes: ["color", "hbox"] }, handler(r, e, t) {
  var { parser: n, funcName: a } = r, i = _(e[0], "color-token").color, s = e[1];
  return { type: "enclose", mode: n.mode, label: a, backgroundColor: i, body: s };
}, htmlBuilder: H0, mathmlBuilder: _0 });
N({ type: "enclose", names: ["\\fcolorbox"], props: { numArgs: 3, allowedInText: true, argTypes: ["color", "color", "hbox"] }, handler(r, e, t) {
  var { parser: n, funcName: a } = r, i = _(e[0], "color-token").color, s = _(e[1], "color-token").color, l = e[2];
  return { type: "enclose", mode: n.mode, label: a, backgroundColor: s, borderColor: i, body: l };
}, htmlBuilder: H0, mathmlBuilder: _0 });
N({ type: "enclose", names: ["\\fbox"], props: { numArgs: 1, argTypes: ["hbox"], allowedInText: true }, handler(r, e) {
  var { parser: t } = r;
  return { type: "enclose", mode: t.mode, label: "\\fbox", body: e[0] };
} });
N({ type: "enclose", names: ["\\cancel", "\\bcancel", "\\xcancel", "\\phase"], props: { numArgs: 1 }, handler(r, e) {
  var { parser: t, funcName: n } = r, a = e[0];
  return { type: "enclose", mode: t.mode, label: n, body: a };
}, htmlBuilder: H0, mathmlBuilder: _0 });
N({ type: "enclose", names: ["\\sout"], props: { numArgs: 1, allowedInText: true }, handler(r, e) {
  var { parser: t, funcName: n } = r;
  t.mode === "math" && t.settings.reportNonstrict("mathVsSout", "LaTeX's \\sout works only in text mode");
  var a = e[0];
  return { type: "enclose", mode: t.mode, label: n, body: a };
}, htmlBuilder: H0, mathmlBuilder: _0 });
N({ type: "enclose", names: ["\\angl"], props: { numArgs: 1, argTypes: ["hbox"], allowedInText: false }, handler(r, e) {
  var { parser: t } = r;
  return { type: "enclose", mode: t.mode, label: "\\angl", body: e[0] };
} });
var mi = {};
function Fe(r) {
  for (var { type: e, names: t, props: n, handler: a, htmlBuilder: i, mathmlBuilder: s } = r, l = { type: e, numArgs: n.numArgs || 0, allowedInText: false, numOptionalArgs: 0, handler: a }, h = 0; h < t.length; ++h) mi[t[h]] = l;
  i && (T0[e] = i), s && (A0[e] = s);
}
var fi = {};
function f(r, e) {
  fi[r] = e;
}
class ye {
  constructor(e, t, n) {
    this.lexer = void 0, this.start = void 0, this.end = void 0, this.lexer = e, this.start = t, this.end = n;
  }
  static range(e, t) {
    return t ? !e || !e.loc || !t.loc || e.loc.lexer !== t.loc.lexer ? null : new ye(e.loc.lexer, e.loc.start, t.loc.end) : e && e.loc;
  }
}
class ke {
  constructor(e, t) {
    this.text = void 0, this.loc = void 0, this.noexpand = void 0, this.treatAsRelax = void 0, this.text = e, this.loc = t;
  }
  range(e, t) {
    return new ke(t, ye.range(this, e));
  }
}
function ta(r) {
  var e = [];
  r.consumeSpaces();
  var t = r.fetch().text;
  for (t === "\\relax" && (r.consume(), r.consumeSpaces(), t = r.fetch().text); t === "\\hline" || t === "\\hdashline"; ) r.consume(), e.push(t === "\\hdashline"), r.consumeSpaces(), t = r.fetch().text;
  return e;
}
var G0 = (r) => {
  var e = r.parser.settings;
  if (!e.displayMode) throw new A("{" + r.envName + "} can be used only in display mode.");
}, Zl = /* @__PURE__ */ new Set(["gather", "gather*"]);
function Jr(r) {
  if (!r.includes("ed")) return !r.includes("*");
}
function ht(r, e, t) {
  var { hskipBeforeAndAfter: n, addJot: a, cols: i, arraystretch: s, colSeparationType: l, autoTag: h, singleRow: c, emptySingleRow: m, maxNumCols: p, leqno: b } = e;
  if (r.gullet.beginGroup(), c || r.gullet.macros.set("\\cr", "\\\\\\relax"), !s) {
    var w = r.gullet.expandMacroAsText("\\arraystretch");
    if (w == null) s = 1;
    else if (s = parseFloat(w), !s || s < 0) throw new A("Invalid \\arraystretch: " + w);
  }
  r.gullet.beginGroup();
  var x = [], k = [x], C = [], E = [], B = h != null ? [] : void 0;
  function F() {
    h && r.gullet.macros.set("\\@eqnsw", "1", true);
  }
  function P() {
    B && (r.gullet.macros.get("\\df@tag") ? (B.push(r.subparse([new ke("\\df@tag")])), r.gullet.macros.set("\\df@tag", void 0, true)) : B.push(!!h && r.gullet.macros.get("\\@eqnsw") === "1"));
  }
  for (F(), E.push(ta(r)); ; ) {
    var R = r.parseExpression(false, c ? "\\end" : "\\\\");
    r.gullet.endGroup(), r.gullet.beginGroup();
    var D = { type: "ordgroup", mode: r.mode, body: R };
    t && (D = { type: "styling", mode: r.mode, style: t, resetFont: true, body: [D] }), x.push(D);
    var H = r.fetch().text;
    if (H === "&") {
      if (p && x.length === p) {
        if (c || l) throw new A("Too many tab characters: &", r.nextToken);
        r.settings.reportNonstrict("textEnv", "Too few columns specified in the {array} column argument.");
      }
      r.consume();
    } else if (H === "\\end") {
      P(), x.length === 1 && D.type === "styling" && D.body.length === 1 && D.body[0].type === "ordgroup" && D.body[0].body.length === 0 && (k.length > 1 || !m) && k.pop(), E.length < k.length + 1 && E.push([]);
      break;
    } else if (H === "\\\\") {
      r.consume();
      var W = void 0;
      r.gullet.future().text !== " " && (W = r.parseSizeGroup(true)), C.push(W ? W.value : null), P(), E.push(ta(r)), x = [], k.push(x), F();
    } else throw new A("Expected & or \\\\ or \\cr or \\end", r.nextToken);
  }
  return r.gullet.endGroup(), r.gullet.endGroup(), { type: "array", mode: r.mode, addJot: a, arraystretch: s, body: k, cols: i, rowGaps: C, hskipBeforeAndAfter: n, hLinesBeforeRow: E, colSeparationType: l, tags: B, leqno: b };
}
function en(r) {
  return r.slice(0, 1) === "d" ? "display" : "text";
}
var Le = function(e, t) {
  var n, a, i = e.body.length, s = e.hLinesBeforeRow, l = 0, h = new Array(i), c = [], m = Math.max(t.fontMetrics().arrayRuleWidth, t.minRuleThickness), p = 1 / t.fontMetrics().ptPerEm, b = 5 * p;
  if (e.colSeparationType && e.colSeparationType === "small") {
    var w = t.havingStyle($.SCRIPT).sizeMultiplier;
    b = 0.2778 * (w / t.sizeMultiplier);
  }
  var x = e.colSeparationType === "CD" ? J({ number: 3, unit: "ex" }, t) : 12 * p, k = 3 * p, C = e.arraystretch * x, E = 0.7 * C, B = 0.3 * C, F = 0;
  function P(i0) {
    for (var s0 = 0; s0 < i0.length; ++s0) s0 > 0 && (F += 0.25), c.push({ pos: F, isDashed: i0[s0] });
  }
  for (P(s[0]), n = 0; n < e.body.length; ++n) {
    var R = e.body[n], D = E, H = B;
    l < R.length && (l = R.length);
    var W = { cells: new Array(R.length), height: 0, depth: 0, pos: 0 };
    for (a = 0; a < R.length; ++a) {
      var G = U(R[a], t);
      H < G.depth && (H = G.depth), D < G.height && (D = G.height), W.cells[a] = G;
    }
    var ve = e.rowGaps[n], xe = 0;
    ve && (xe = J(ve, t), xe > 0 && (xe += B, H < xe && (H = xe), xe = 0)), e.addJot && n < e.body.length - 1 && (H += k), W.height = D, W.depth = H, F += D, W.pos = F, F += H + xe, h[n] = W, P(s[n + 1]);
  }
  var te = F / 2 + t.fontMetrics().axisHeight, Dt = e.cols || [], Ne = [], Ce, Ye, Tt = [];
  if (e.tags && e.tags.some((i0) => i0)) for (n = 0; n < i; ++n) {
    var At = h[n], W0 = At.pos - te, Ze = e.tags[n], Ke = void 0;
    Ze === true ? Ke = T(["eqn-num"], [], t) : Ze === false ? Ke = T([], [], t) : Ke = T([], oe(Ze, t, true), t), Ke.depth = At.depth, Ke.height = At.height, Tt.push({ type: "elem", elem: Ke, shift: W0 });
  }
  for (a = 0, Ye = 0; a < l || Ye < Dt.length; ++a, ++Ye) {
    for (var Ht, Ee = Dt[Ye], t0 = true; ((yn = Ee) == null ? void 0 : yn.type) === "separator"; ) {
      var yn;
      if (t0 || (Ce = T(["arraycolsep"], []), Ce.style.width = z(t.fontMetrics().doubleRuleSep), Ne.push(Ce)), Ee.separator === "|" || Ee.separator === ":") {
        var ls = Ee.separator === "|" ? "solid" : "dashed", Mt = T(["vertical-separator"], [], t);
        Mt.style.height = z(F), Mt.style.borderRightWidth = z(m), Mt.style.borderRightStyle = ls, Mt.style.margin = "0 " + z(-m / 2);
        var wn = F - te;
        wn && (Mt.style.verticalAlign = z(-wn)), Ne.push(Mt);
      } else throw new A("Invalid separator type: " + Ee.separator);
      Ye++, Ee = Dt[Ye], t0 = false;
    }
    if (!(a >= l)) {
      var zt = void 0;
      if (a > 0 || e.hskipBeforeAndAfter) {
        var xn, kn;
        zt = (xn = (kn = Ee) == null ? void 0 : kn.pregap) != null ? xn : b, zt !== 0 && (Ce = T(["arraycolsep"], []), Ce.style.width = z(zt), Ne.push(Ce));
      }
      var Sn = [];
      for (n = 0; n < i; ++n) {
        var r0 = h[n], n0 = r0.cells[a];
        if (n0) {
          var os = r0.pos - te;
          n0.depth = r0.depth, n0.height = r0.height, Sn.push({ type: "elem", elem: n0, shift: os });
        }
      }
      var us = V({ positionType: "individualShift", children: Sn }), hs = T(["col-align-" + (((Ht = Ee) == null ? void 0 : Ht.align) || "c")], [us]);
      if (Ne.push(hs), a < l - 1 || e.hskipBeforeAndAfter) {
        var Tn, An;
        zt = (Tn = (An = Ee) == null ? void 0 : An.postgap) != null ? Tn : b, zt !== 0 && (Ce = T(["arraycolsep"], []), Ce.style.width = z(zt), Ne.push(Ce));
      }
    }
  }
  var a0 = T(["mtable"], Ne);
  if (c.length > 0) {
    for (var cs = qt("hline", t, m), ds = qt("hdashline", t, m), X0 = [{ type: "elem", elem: a0, shift: 0 }]; c.length > 0; ) {
      var Mn = c.pop(), zn = Mn.pos - te;
      Mn.isDashed ? X0.push({ type: "elem", elem: ds, shift: zn }) : X0.push({ type: "elem", elem: cs, shift: zn });
    }
    a0 = V({ positionType: "individualShift", children: X0 });
  }
  if (Tt.length === 0) return T(["mord"], [a0], t);
  var ms = V({ positionType: "individualShift", children: Tt }), fs = T(["tag"], [ms], t);
  return Xe([a0, fs]);
}, Kl = { c: "center ", l: "left ", r: "right " }, Oe = function(e, t) {
  for (var n = [], a = new M("mtd", [], ["mtr-glue"]), i = new M("mtd", [], ["mml-eqn-num"]), s = 0; s < e.body.length; s++) {
    for (var l = e.body[s], h = [], c = 0; c < l.length; c++) h.push(new M("mtd", [Y(l[c], t)]));
    e.tags && e.tags[s] && (h.unshift(a), h.push(a), e.leqno ? h.unshift(i) : h.push(i)), n.push(new M("mtr", h));
  }
  var m = new M("mtable", n), p = e.arraystretch === 0.5 ? 0.1 : 0.16 + e.arraystretch - 1 + (e.addJot ? 0.09 : 0);
  m.setAttribute("rowspacing", z(p));
  var b = "", w = "";
  if (e.cols && e.cols.length > 0) {
    var x = e.cols, k = "", C = false, E = 0, B = x.length;
    x[0].type === "separator" && (b += "top ", E = 1), x[x.length - 1].type === "separator" && (b += "bottom ", B -= 1);
    for (var F = E; F < B; F++) {
      var P = x[F];
      P.type === "align" ? (w += Kl[P.align], C && (k += "none "), C = true) : P.type === "separator" && C && (k += P.separator === "|" ? "solid " : "dashed ", C = false);
    }
    m.setAttribute("columnalign", w.trim()), /[sd]/.test(k) && m.setAttribute("columnlines", k.trim());
  }
  if (e.colSeparationType === "align") {
    for (var R = e.cols || [], D = "", H = 1; H < R.length; H++) D += H % 2 ? "0em " : "1em ";
    m.setAttribute("columnspacing", D.trim());
  } else e.colSeparationType === "alignat" || e.colSeparationType === "gather" ? m.setAttribute("columnspacing", "0em") : e.colSeparationType === "small" ? m.setAttribute("columnspacing", "0.2778em") : e.colSeparationType === "CD" ? m.setAttribute("columnspacing", "0.5em") : m.setAttribute("columnspacing", "1em");
  var W = "", G = e.hLinesBeforeRow;
  b += G[0].length > 0 ? "left " : "", b += G[G.length - 1].length > 0 ? "right " : "";
  for (var ve = 1; ve < G.length - 1; ve++) W += G[ve].length === 0 ? "none " : G[ve][0] ? "dashed " : "solid ";
  return /[sd]/.test(W) && m.setAttribute("rowlines", W.trim()), b !== "" && (m = new M("menclose", [m]), m.setAttribute("notation", b.trim())), e.arraystretch && e.arraystretch < 1 && (m = new M("mstyle", [m]), m.setAttribute("scriptlevel", "1")), m;
}, pi = function(e, t) {
  e.envName.includes("ed") || G0(e);
  var n = [], a = e.envName.includes("at") ? "alignat" : "align", i = e.envName === "split", s = ht(e.parser, { cols: n, addJot: true, autoTag: i ? void 0 : Jr(e.envName), emptySingleRow: true, colSeparationType: a, maxNumCols: i ? 2 : void 0, leqno: e.parser.settings.leqno }, "display"), l = 0, h = 0, c = { type: "ordgroup", mode: e.mode, body: [] };
  if (t[0] && t[0].type === "ordgroup") {
    for (var m = "", p = 0; p < t[0].body.length; p++) {
      var b = _(t[0].body[p], "textord");
      m += b.text;
    }
    l = Number(m), h = l * 2;
  }
  var w = !h;
  s.body.forEach(function(E) {
    for (var B = 1; B < E.length; B += 2) {
      var F = _(E[B], "styling"), P = _(F.body[0], "ordgroup");
      P.body.unshift(c);
    }
    if (w) h < E.length && (h = E.length);
    else {
      var R = E.length / 2;
      if (l < R) throw new A("Too many math in a row: " + ("expected " + l + ", but got " + R), E[0]);
    }
  });
  for (var x = 0; x < h; ++x) {
    var k = "r", C = 0;
    x % 2 === 1 ? k = "l" : x > 0 && w && (C = 1), n[x] = { type: "align", align: k, pregap: C, postgap: 0 };
  }
  return s.colSeparationType = w ? "align" : "alignat", s;
};
Fe({ type: "array", names: ["array", "darray"], props: { numArgs: 1 }, handler(r, e) {
  var t = P0(e[0]), n = t ? [e[0]] : _(e[0], "ordgroup").body, a = n.map(function(s) {
    var l = O0(s), h = l.text;
    if ("lcr".includes(h)) return { type: "align", align: h };
    if (h === "|") return { type: "separator", separator: "|" };
    if (h === ":") return { type: "separator", separator: ":" };
    throw new A("Unknown column alignment: " + h, s);
  }), i = { cols: a, hskipBeforeAndAfter: true, maxNumCols: a.length };
  return ht(r.parser, i, en(r.envName));
}, htmlBuilder: Le, mathmlBuilder: Oe });
Fe({ type: "array", names: ["matrix", "pmatrix", "bmatrix", "Bmatrix", "vmatrix", "Vmatrix", "matrix*", "pmatrix*", "bmatrix*", "Bmatrix*", "vmatrix*", "Vmatrix*"], props: { numArgs: 0 }, handler(r) {
  var e = { matrix: null, pmatrix: ["(", ")"], bmatrix: ["[", "]"], Bmatrix: ["\\{", "\\}"], vmatrix: ["|", "|"], Vmatrix: ["\\Vert", "\\Vert"] }[r.envName.replace("*", "")], t = "c", n = { hskipBeforeAndAfter: false, cols: [{ type: "align", align: t }] };
  if (r.envName.charAt(r.envName.length - 1) === "*") {
    var a = r.parser;
    if (a.consumeSpaces(), a.fetch().text === "[") {
      if (a.consume(), a.consumeSpaces(), t = a.fetch().text, !"lcr".includes(t)) throw new A("Expected l or c or r", a.nextToken);
      a.consume(), a.consumeSpaces(), a.expect("]"), a.consume(), n.cols = [{ type: "align", align: t }];
    }
  }
  var i = ht(r.parser, n, en(r.envName)), s = Math.max(0, ...i.body.map((l) => l.length));
  return i.cols = new Array(s).fill({ type: "align", align: t }), e ? { type: "leftright", mode: r.mode, body: [i], left: e[0], right: e[1], rightColor: void 0 } : i;
}, htmlBuilder: Le, mathmlBuilder: Oe });
Fe({ type: "array", names: ["smallmatrix"], props: { numArgs: 0 }, handler(r) {
  var e = { arraystretch: 0.5 }, t = ht(r.parser, e, "script");
  return t.colSeparationType = "small", t;
}, htmlBuilder: Le, mathmlBuilder: Oe });
Fe({ type: "array", names: ["subarray"], props: { numArgs: 1 }, handler(r, e) {
  var t = P0(e[0]), n = t ? [e[0]] : _(e[0], "ordgroup").body, a = n.map(function(l) {
    var h = O0(l), c = h.text;
    if ("lc".includes(c)) return { type: "align", align: c };
    throw new A("Unknown column alignment: " + c, l);
  });
  if (a.length > 1) throw new A("{subarray} can contain only one column");
  var i = { cols: a, hskipBeforeAndAfter: false, arraystretch: 0.5 }, s = ht(r.parser, i, "script");
  if (s.body.length > 0 && s.body[0].length > 1) throw new A("{subarray} can contain only one column");
  return s;
}, htmlBuilder: Le, mathmlBuilder: Oe });
Fe({ type: "array", names: ["cases", "dcases", "rcases", "drcases"], props: { numArgs: 0 }, handler(r) {
  var e = { arraystretch: 1.2, cols: [{ type: "align", align: "l", pregap: 0, postgap: 1 }, { type: "align", align: "l", pregap: 0, postgap: 0 }] }, t = ht(r.parser, e, en(r.envName));
  return { type: "leftright", mode: r.mode, body: [t], left: r.envName.includes("r") ? "." : "\\{", right: r.envName.includes("r") ? "\\}" : ".", rightColor: void 0 };
}, htmlBuilder: Le, mathmlBuilder: Oe });
Fe({ type: "array", names: ["align", "align*", "aligned", "split"], props: { numArgs: 0 }, handler: pi, htmlBuilder: Le, mathmlBuilder: Oe });
Fe({ type: "array", names: ["gathered", "gather", "gather*"], props: { numArgs: 0 }, handler(r) {
  Zl.has(r.envName) && G0(r);
  var e = { cols: [{ type: "align", align: "c" }], addJot: true, colSeparationType: "gather", autoTag: Jr(r.envName), emptySingleRow: true, leqno: r.parser.settings.leqno };
  return ht(r.parser, e, "display");
}, htmlBuilder: Le, mathmlBuilder: Oe });
Fe({ type: "array", names: ["alignat", "alignat*", "alignedat"], props: { numArgs: 1 }, handler: pi, htmlBuilder: Le, mathmlBuilder: Oe });
Fe({ type: "array", names: ["equation", "equation*"], props: { numArgs: 0 }, handler(r) {
  G0(r);
  var e = { autoTag: Jr(r.envName), emptySingleRow: true, singleRow: true, maxNumCols: 1, leqno: r.parser.settings.leqno };
  return ht(r.parser, e, "display");
}, htmlBuilder: Le, mathmlBuilder: Oe });
Fe({ type: "array", names: ["CD"], props: { numArgs: 0 }, handler(r) {
  return G0(r), Pl(r.parser);
}, htmlBuilder: Le, mathmlBuilder: Oe });
f("\\nonumber", "\\gdef\\@eqnsw{0}");
f("\\notag", "\\nonumber");
N({ type: "text", names: ["\\hline", "\\hdashline"], props: { numArgs: 0, allowedInText: true, allowedInMath: true }, handler(r, e) {
  throw new A(r.funcName + " valid only within array environment");
} });
var ra = mi;
N({ type: "environment", names: ["\\begin", "\\end"], props: { numArgs: 1, argTypes: ["text"] }, handler(r, e) {
  var { parser: t, funcName: n } = r, a = e[0];
  if (a.type !== "ordgroup") throw new A("Invalid environment name", a);
  for (var i = "", s = 0; s < a.body.length; ++s) i += _(a.body[s], "textord").text;
  if (n === "\\begin") {
    if (!ra.hasOwnProperty(i)) throw new A("No such environment: " + i, a);
    var l = ra[i], { args: h, optArgs: c } = t.parseArguments("\\begin{" + i + "}", l), m = { mode: t.mode, envName: i, parser: t }, p = l.handler(m, h, c);
    t.expect("\\end", false);
    var b = t.nextToken, w = _(t.parseFunction(), "environment");
    if (w.name !== i) throw new A("Mismatch: \\begin{" + i + "} matched by \\end{" + w.name + "}", b);
    return p;
  }
  return { type: "environment", mode: t.mode, name: i, nameGroup: a };
} });
var gi = (r, e) => {
  var t = r.font, n = e.withFont(t);
  return U(r.body, n);
}, vi = (r, e) => {
  var t = r.font, n = e.withFont(t);
  return Y(r.body, n);
}, na = { "\\Bbb": "\\mathbb", "\\bold": "\\mathbf", "\\frak": "\\mathfrak" };
N({ type: "font", names: ["\\mathrm", "\\mathit", "\\mathbf", "\\mathnormal", "\\mathsfit", "\\mathbb", "\\mathcal", "\\mathfrak", "\\mathscr", "\\mathsf", "\\mathtt", "\\Bbb", "\\bold", "\\frak"], props: { numArgs: 1, allowedInArgument: true }, handler: (r, e) => {
  var { parser: t, funcName: n } = r, a = M0(e[0]), i = n;
  return i in na && (i = na[i]), { type: "font", mode: t.mode, font: i.slice(1), body: a };
}, htmlBuilder: gi, mathmlBuilder: vi });
N({ type: "mclass", names: ["\\boldsymbol", "\\bm"], props: { numArgs: 1 }, handler: (r, e) => {
  var { parser: t } = r, n = e[0];
  return { type: "mclass", mode: t.mode, mclass: $0(n), body: [{ type: "font", mode: t.mode, font: "boldsymbol", body: n }], isCharacterBox: je(n) };
} });
N({ type: "font", names: ["\\rm", "\\sf", "\\tt", "\\bf", "\\it", "\\cal"], props: { numArgs: 0, allowedInText: true }, handler: (r, e) => {
  var { parser: t, funcName: n, breakOnTokenText: a } = r, { mode: i } = t, s = t.parseExpression(true, a);
  return { type: "font", mode: i, font: "math" + n.slice(1), body: { type: "ordgroup", mode: t.mode, body: s } };
}, htmlBuilder: gi, mathmlBuilder: vi });
var Ql = (r, e) => {
  var t = e.style, n = t.fracNum(), a = t.fracDen(), i;
  i = e.havingStyle(n);
  var s = U(r.numer, i, e);
  if (r.continued) {
    var l = 8.5 / e.fontMetrics().ptPerEm, h = 3.5 / e.fontMetrics().ptPerEm;
    s.height = s.height < l ? l : s.height, s.depth = s.depth < h ? h : s.depth;
  }
  i = e.havingStyle(a);
  var c = U(r.denom, i, e), m, p, b;
  r.hasBarLine ? (r.barSize ? (p = J(r.barSize, e), m = qt("frac-line", e, p)) : m = qt("frac-line", e), p = m.height, b = m.height) : (m = null, p = 0, b = e.fontMetrics().defaultRuleThickness);
  var w, x, k;
  t.size === $.DISPLAY.size ? (w = e.fontMetrics().num1, p > 0 ? x = 3 * b : x = 7 * b, k = e.fontMetrics().denom1) : (p > 0 ? (w = e.fontMetrics().num2, x = b) : (w = e.fontMetrics().num3, x = 3 * b), k = e.fontMetrics().denom2);
  var C;
  if (m) {
    var B = e.fontMetrics().axisHeight;
    w - s.depth - (B + 0.5 * p) < x && (w += x - (w - s.depth - (B + 0.5 * p))), B - 0.5 * p - (c.height - k) < x && (k += x - (B - 0.5 * p - (c.height - k)));
    var F = -(B - 0.5 * p);
    C = V({ positionType: "individualShift", children: [{ type: "elem", elem: c, shift: k }, { type: "elem", elem: m, shift: F }, { type: "elem", elem: s, shift: -w }] });
  } else {
    var E = w - s.depth - (c.height - k);
    E < x && (w += 0.5 * (x - E), k += 0.5 * (x - E)), C = V({ positionType: "individualShift", children: [{ type: "elem", elem: c, shift: k }, { type: "elem", elem: s, shift: -w }] });
  }
  i = e.havingStyle(t), C.height *= i.sizeMultiplier / e.sizeMultiplier, C.depth *= i.sizeMultiplier / e.sizeMultiplier;
  var P;
  t.size === $.DISPLAY.size ? P = e.fontMetrics().delim1 : t.size === $.SCRIPTSCRIPT.size ? P = e.havingStyle($.SCRIPT).fontMetrics().delim2 : P = e.fontMetrics().delim2;
  var R, D;
  return r.leftDelim == null ? R = Kt(e, ["mopen"]) : R = Br(r.leftDelim, P, true, e.havingStyle(t), r.mode, ["mopen"]), r.continued ? D = T([]) : r.rightDelim == null ? D = Kt(e, ["mclose"]) : D = Br(r.rightDelim, P, true, e.havingStyle(t), r.mode, ["mclose"]), T(["mord"].concat(i.sizingClasses(e)), [R, T(["mfrac"], [C]), D], e);
}, Jl = (r, e) => {
  var t = new M("mfrac", [Y(r.numer, e), Y(r.denom, e)]);
  if (!r.hasBarLine) t.setAttribute("linethickness", "0px");
  else if (r.barSize) {
    var n = J(r.barSize, e);
    t.setAttribute("linethickness", z(n));
  }
  if (r.leftDelim != null || r.rightDelim != null) {
    var a = [];
    if (r.leftDelim != null) {
      var i = new M("mo", [new ae(r.leftDelim.replace("\\", ""))]);
      i.setAttribute("fence", "true"), a.push(i);
    }
    if (a.push(t), r.rightDelim != null) {
      var s = new M("mo", [new ae(r.rightDelim.replace("\\", ""))]);
      s.setAttribute("fence", "true"), a.push(s);
    }
    return Yr(a);
  }
  return t;
}, bi = (r, e) => {
  if (!e) return r;
  var t = { type: "styling", mode: r.mode, style: e, body: [r] };
  return t;
};
N({ type: "genfrac", names: ["\\cfrac", "\\dfrac", "\\frac", "\\tfrac", "\\dbinom", "\\binom", "\\tbinom", "\\\\atopfrac", "\\\\bracefrac", "\\\\brackfrac"], props: { numArgs: 2, allowedInArgument: true }, handler: (r, e) => {
  var { parser: t, funcName: n } = r, a = e[0], i = e[1], s, l = null, h = null;
  switch (n) {
    case "\\cfrac":
    case "\\dfrac":
    case "\\frac":
    case "\\tfrac":
      s = true;
      break;
    case "\\\\atopfrac":
      s = false;
      break;
    case "\\dbinom":
    case "\\binom":
    case "\\tbinom":
      s = false, l = "(", h = ")";
      break;
    case "\\\\bracefrac":
      s = false, l = "\\{", h = "\\}";
      break;
    case "\\\\brackfrac":
      s = false, l = "[", h = "]";
      break;
    default:
      throw new Error("Unrecognized genfrac command");
  }
  var c = n === "\\cfrac", m = null;
  return c || n.startsWith("\\d") ? m = "display" : n.startsWith("\\t") && (m = "text"), bi({ type: "genfrac", mode: t.mode, numer: a, denom: i, continued: c, hasBarLine: s, leftDelim: l, rightDelim: h, barSize: null }, m);
}, htmlBuilder: Ql, mathmlBuilder: Jl });
N({ type: "infix", names: ["\\over", "\\choose", "\\atop", "\\brace", "\\brack"], props: { numArgs: 0, infix: true }, handler(r) {
  var { parser: e, funcName: t, token: n } = r, a;
  switch (t) {
    case "\\over":
      a = "\\frac";
      break;
    case "\\choose":
      a = "\\binom";
      break;
    case "\\atop":
      a = "\\\\atopfrac";
      break;
    case "\\brace":
      a = "\\\\bracefrac";
      break;
    case "\\brack":
      a = "\\\\brackfrac";
      break;
    default:
      throw new Error("Unrecognized infix genfrac command");
  }
  return { type: "infix", mode: e.mode, replaceWith: a, token: n };
} });
var aa = ["display", "text", "script", "scriptscript"], ia = function(e) {
  var t = null;
  return e.length > 0 && (t = e, t = t === "." ? null : t), t;
};
N({ type: "genfrac", names: ["\\genfrac"], props: { numArgs: 6, allowedInArgument: true, argTypes: ["math", "math", "size", "text", "math", "math"] }, handler(r, e) {
  var { parser: t } = r, n = e[4], a = e[5], i = M0(e[0]), s = i.type === "atom" && i.family === "open" ? ia(i.text) : null, l = M0(e[1]), h = l.type === "atom" && l.family === "close" ? ia(l.text) : null, c = _(e[2], "size"), m, p = null;
  c.isBlank ? m = true : (p = c.value, m = p.number > 0);
  var b = null, w = e[3];
  if (w.type === "ordgroup") {
    if (w.body.length > 0) {
      var x = _(w.body[0], "textord");
      b = aa[Number(x.text)];
    }
  } else w = _(w, "textord"), b = aa[Number(w.text)];
  return bi({ type: "genfrac", mode: t.mode, numer: n, denom: a, continued: false, hasBarLine: m, barSize: p, leftDelim: s, rightDelim: h }, b);
} });
N({ type: "infix", names: ["\\above"], props: { numArgs: 1, argTypes: ["size"], infix: true }, handler(r, e) {
  var { parser: t, funcName: n, token: a } = r;
  return { type: "infix", mode: t.mode, replaceWith: "\\\\abovefrac", size: _(e[0], "size").value, token: a };
} });
N({ type: "genfrac", names: ["\\\\abovefrac"], props: { numArgs: 3, argTypes: ["math", "size", "math"] }, handler: (r, e) => {
  var { parser: t, funcName: n } = r, a = e[0], i = _(e[1], "infix").size;
  if (!i) throw new Error("\\\\abovefrac expected size, but got " + String(i));
  var s = e[2], l = i.number > 0;
  return { type: "genfrac", mode: t.mode, numer: a, denom: s, continued: false, hasBarLine: l, barSize: i, leftDelim: null, rightDelim: null };
} });
var yi = (r, e) => {
  var t = e.style, n, a;
  r.type === "supsub" ? (n = r.sup ? U(r.sup, e.havingStyle(t.sup()), e) : U(r.sub, e.havingStyle(t.sub()), e), a = _(r.base, "horizBrace")) : a = _(r, "horizBrace");
  var i = U(a.base, e.havingBaseStyle($.DISPLAY)), s = L0(a, e), l;
  if (a.isOver ? l = V({ positionType: "firstBaseline", children: [{ type: "elem", elem: i }, { type: "kern", size: 0.1 }, { type: "elem", elem: s, wrapperClasses: ["svg-align"] }] }) : l = V({ positionType: "bottom", positionData: i.depth + 0.1 + s.height, children: [{ type: "elem", elem: s, wrapperClasses: ["svg-align"] }, { type: "kern", size: 0.1 }, { type: "elem", elem: i }] }), n) {
    var h = T(["minner", a.isOver ? "mover" : "munder"], [l], e);
    a.isOver ? l = V({ positionType: "firstBaseline", children: [{ type: "elem", elem: h }, { type: "kern", size: 0.2 }, { type: "elem", elem: n }] }) : l = V({ positionType: "bottom", positionData: h.depth + 0.2 + n.height + n.depth, children: [{ type: "elem", elem: n }, { type: "kern", size: 0.2 }, { type: "elem", elem: h }] });
  }
  return T(["minner", a.isOver ? "mover" : "munder"], [l], e);
}, eo = (r, e) => {
  var t = F0(r.label);
  return new M(r.isOver ? "mover" : "munder", [Y(r.base, e), t]);
};
N({ type: "horizBrace", names: ["\\overbrace", "\\underbrace", "\\overbracket", "\\underbracket"], props: { numArgs: 1 }, handler(r, e) {
  var { parser: t, funcName: n } = r;
  return { type: "horizBrace", mode: t.mode, label: n, isOver: n.includes("\\over"), base: e[0] };
}, htmlBuilder: yi, mathmlBuilder: eo });
N({ type: "href", names: ["\\href"], props: { numArgs: 2, argTypes: ["url", "original"], allowedInText: true }, handler: (r, e) => {
  var { parser: t } = r, n = e[1], a = _(e[0], "url").url;
  return t.settings.isTrusted({ command: "\\href", url: a }) ? { type: "href", mode: t.mode, href: a, body: ne(n) } : t.formatUnsupportedCmd("\\href");
}, htmlBuilder: (r, e) => {
  var t = oe(r.body, e, false);
  return ml(r.href, [], t, e);
}, mathmlBuilder: (r, e) => {
  var t = ot(r.body, e);
  return t instanceof M || (t = new M("mrow", [t])), t.setAttribute("href", r.href), t;
} });
N({ type: "href", names: ["\\url"], props: { numArgs: 1, argTypes: ["url"], allowedInText: true }, handler: (r, e) => {
  var { parser: t } = r, n = _(e[0], "url").url;
  if (!t.settings.isTrusted({ command: "\\url", url: n })) return t.formatUnsupportedCmd("\\url");
  for (var a = [], i = 0; i < n.length; i++) {
    var s = n[i];
    s === "~" && (s = "\\textasciitilde"), a.push({ type: "textord", mode: "text", text: s });
  }
  var l = { type: "text", mode: t.mode, font: "\\texttt", body: a };
  return { type: "href", mode: t.mode, href: n, body: ne(l) };
} });
N({ type: "hbox", names: ["\\hbox"], props: { numArgs: 1, argTypes: ["text"], allowedInText: true, primitive: true }, handler(r, e) {
  var { parser: t } = r;
  return { type: "hbox", mode: t.mode, body: ne(e[0]) };
}, htmlBuilder(r, e) {
  var t = oe(r.body, e.withFont(""), false);
  return Xe(t);
}, mathmlBuilder(r, e) {
  return new M("mrow", Ae(r.body, e.withFont("")));
} });
N({ type: "html", names: ["\\htmlClass", "\\htmlId", "\\htmlStyle", "\\htmlData"], props: { numArgs: 2, argTypes: ["raw", "original"], allowedInText: true }, handler: (r, e) => {
  var { parser: t, funcName: n, token: a } = r, i = _(e[0], "raw").string, s = e[1];
  t.settings.strict && t.settings.reportNonstrict("htmlExtension", "HTML extension is disabled on strict mode");
  var l, h = {};
  switch (n) {
    case "\\htmlClass":
      h.class = i, l = { command: "\\htmlClass", class: i };
      break;
    case "\\htmlId":
      h.id = i, l = { command: "\\htmlId", id: i };
      break;
    case "\\htmlStyle":
      h.style = i, l = { command: "\\htmlStyle", style: i };
      break;
    case "\\htmlData": {
      for (var c = i.split(","), m = 0; m < c.length; m++) {
        var p = c[m], b = p.indexOf("=");
        if (b < 0) throw new A("\\htmlData key/value '" + p + "' missing equals sign");
        var w = p.slice(0, b), x = p.slice(b + 1);
        h["data-" + w.trim()] = x;
      }
      l = { command: "\\htmlData", attributes: h };
      break;
    }
    default:
      throw new Error("Unrecognized html command");
  }
  return t.settings.isTrusted(l) ? { type: "html", mode: t.mode, attributes: h, body: ne(s) } : t.formatUnsupportedCmd(n);
}, htmlBuilder: (r, e) => {
  var t = oe(r.body, e, false), n = ["enclosing"];
  r.attributes.class && n.push(...r.attributes.class.trim().split(/\s+/));
  var a = T(n, t, e);
  for (var i in r.attributes) i !== "class" && r.attributes.hasOwnProperty(i) && a.setAttribute(i, r.attributes[i]);
  return a;
}, mathmlBuilder: (r, e) => ot(r.body, e) });
N({ type: "htmlmathml", names: ["\\html@mathml"], props: { numArgs: 2, allowedInArgument: true, allowedInText: true }, handler: (r, e) => {
  var { parser: t } = r;
  return { type: "htmlmathml", mode: t.mode, html: ne(e[0]), mathml: ne(e[1]) };
}, htmlBuilder: (r, e) => {
  var t = oe(r.html, e, false);
  return Xe(t);
}, mathmlBuilder: (r, e) => ot(r.mathml, e) });
var or = function(e) {
  if (/^[-+]? *(\d+(\.\d*)?|\.\d+)$/.test(e)) return { number: +e, unit: "bp" };
  var t = /([-+]?) *(\d+(?:\.\d*)?|\.\d+) *([a-z]{2})/.exec(e);
  if (!t) throw new A("Invalid size: '" + e + "' in \\includegraphics");
  var n = { number: +(t[1] + t[2]), unit: t[3] };
  if (!La(n)) throw new A("Invalid unit: '" + n.unit + "' in \\includegraphics.");
  return n;
};
N({ type: "includegraphics", names: ["\\includegraphics"], props: { numArgs: 1, numOptionalArgs: 1, argTypes: ["raw", "url"], allowedInText: false }, handler: (r, e, t) => {
  var { parser: n } = r, a = { number: 0, unit: "em" }, i = { number: 0.9, unit: "em" }, s = { number: 0, unit: "em" }, l = "";
  if (t[0]) for (var h = _(t[0], "raw").string, c = h.split(","), m = 0; m < c.length; m++) {
    var p = c[m].split("=");
    if (p.length === 2) {
      var b = p[1].trim();
      switch (p[0].trim()) {
        case "alt":
          l = b;
          break;
        case "width":
          a = or(b);
          break;
        case "height":
          i = or(b);
          break;
        case "totalheight":
          s = or(b);
          break;
        default:
          throw new A("Invalid key: '" + p[0] + "' in \\includegraphics.");
      }
    }
  }
  var w = _(e[0], "url").url;
  return l === "" && (l = w, l = l.replace(/^.*[\\/]/, ""), l = l.substring(0, l.lastIndexOf("."))), n.settings.isTrusted({ command: "\\includegraphics", url: w }) ? { type: "includegraphics", mode: n.mode, alt: l, width: a, height: i, totalheight: s, src: w } : n.formatUnsupportedCmd("\\includegraphics");
}, htmlBuilder: (r, e) => {
  var t = J(r.height, e), n = 0;
  r.totalheight.number > 0 && (n = J(r.totalheight, e) - t);
  var a = 0;
  r.width.number > 0 && (a = J(r.width, e));
  var i = { height: z(t + n) };
  a > 0 && (i.width = z(a)), n > 0 && (i.verticalAlign = z(-n));
  var s = new tl(r.src, r.alt, i);
  return s.height = t, s.depth = n, s;
}, mathmlBuilder: (r, e) => {
  var t = new M("mglyph", []);
  t.setAttribute("alt", r.alt);
  var n = J(r.height, e), a = 0;
  if (r.totalheight.number > 0 && (a = J(r.totalheight, e) - n, t.setAttribute("valign", z(-a))), t.setAttribute("height", z(n + a)), r.width.number > 0) {
    var i = J(r.width, e);
    t.setAttribute("width", z(i));
  }
  return t.setAttribute("src", r.src), t;
} });
N({ type: "kern", names: ["\\kern", "\\mkern", "\\hskip", "\\mskip"], props: { numArgs: 1, argTypes: ["size"], primitive: true, allowedInText: true }, handler(r, e) {
  var { parser: t, funcName: n } = r, a = _(e[0], "size");
  if (t.settings.strict) {
    var i = n[1] === "m", s = a.value.unit === "mu";
    i ? (s || t.settings.reportNonstrict("mathVsTextUnits", "LaTeX's " + n + " supports only mu units, " + ("not " + a.value.unit + " units")), t.mode !== "math" && t.settings.reportNonstrict("mathVsTextUnits", "LaTeX's " + n + " works only in math mode")) : s && t.settings.reportNonstrict("mathVsTextUnits", "LaTeX's " + n + " doesn't support mu units");
  }
  return { type: "kern", mode: t.mode, dimension: a.value };
}, htmlBuilder(r, e) {
  return _a(r.dimension, e);
}, mathmlBuilder(r, e) {
  var t = J(r.dimension, e);
  return new Xa(t);
} });
N({ type: "lap", names: ["\\mathllap", "\\mathrlap", "\\mathclap"], props: { numArgs: 1, allowedInText: true }, handler: (r, e) => {
  var { parser: t, funcName: n } = r, a = e[0];
  return { type: "lap", mode: t.mode, alignment: n.slice(5), body: a };
}, htmlBuilder: (r, e) => {
  var t;
  r.alignment === "clap" ? (t = T([], [U(r.body, e)]), t = T(["inner"], [t], e)) : t = T(["inner"], [U(r.body, e)]);
  var n = T(["fix"], []), a = T([r.alignment], [t, n], e), i = T(["strut"]);
  return i.style.height = z(a.height + a.depth), a.depth && (i.style.verticalAlign = z(-a.depth)), a.children.unshift(i), a = T(["thinbox"], [a], e), T(["mord", "vbox"], [a], e);
}, mathmlBuilder: (r, e) => {
  var t = new M("mpadded", [Y(r.body, e)]);
  if (r.alignment !== "rlap") {
    var n = r.alignment === "llap" ? "-1" : "-0.5";
    t.setAttribute("lspace", n + "width");
  }
  return t.setAttribute("width", "0px"), t;
} });
N({ type: "styling", names: ["\\(", "$"], props: { numArgs: 0, allowedInText: true, allowedInMath: false }, handler(r, e) {
  var { funcName: t, parser: n } = r, a = n.mode;
  n.switchMode("math");
  var i = t === "\\(" ? "\\)" : "$", s = n.parseExpression(false, i);
  return n.expect(i), n.switchMode(a), { type: "styling", mode: n.mode, style: "text", resetFont: true, body: s };
} });
N({ type: "text", names: ["\\)", "\\]"], props: { numArgs: 0, allowedInText: true, allowedInMath: false }, handler(r, e) {
  throw new A("Mismatched " + r.funcName);
} });
var sa = (r, e) => {
  switch (e.style.size) {
    case $.DISPLAY.size:
      return r.display;
    case $.TEXT.size:
      return r.text;
    case $.SCRIPT.size:
      return r.script;
    case $.SCRIPTSCRIPT.size:
      return r.scriptscript;
    default:
      return r.text;
  }
};
N({ type: "mathchoice", names: ["\\mathchoice"], props: { numArgs: 4, primitive: true }, handler: (r, e) => {
  var { parser: t } = r;
  return { type: "mathchoice", mode: t.mode, display: ne(e[0]), text: ne(e[1]), script: ne(e[2]), scriptscript: ne(e[3]) };
}, htmlBuilder: (r, e) => {
  var t = sa(r, e), n = oe(t, e, false);
  return Xe(n);
}, mathmlBuilder: (r, e) => {
  var t = sa(r, e);
  return ot(t, e);
} });
var wi = (r, e, t, n, a, i, s) => {
  r = T([], [r]);
  var l = t && je(t), h, c;
  if (e) {
    var m = U(e, n.havingStyle(a.sup()), n);
    c = { elem: m, kern: Math.max(n.fontMetrics().bigOpSpacing1, n.fontMetrics().bigOpSpacing3 - m.depth) };
  }
  if (t) {
    var p = U(t, n.havingStyle(a.sub()), n);
    h = { elem: p, kern: Math.max(n.fontMetrics().bigOpSpacing2, n.fontMetrics().bigOpSpacing4 - p.height) };
  }
  var b;
  if (c && h) {
    var w = n.fontMetrics().bigOpSpacing5 + h.elem.height + h.elem.depth + h.kern + r.depth + s;
    b = V({ positionType: "bottom", positionData: w, children: [{ type: "kern", size: n.fontMetrics().bigOpSpacing5 }, { type: "elem", elem: h.elem, marginLeft: z(-i) }, { type: "kern", size: h.kern }, { type: "elem", elem: r }, { type: "kern", size: c.kern }, { type: "elem", elem: c.elem, marginLeft: z(i) }, { type: "kern", size: n.fontMetrics().bigOpSpacing5 }] });
  } else if (h) {
    var x = r.height - s;
    b = V({ positionType: "top", positionData: x, children: [{ type: "kern", size: n.fontMetrics().bigOpSpacing5 }, { type: "elem", elem: h.elem, marginLeft: z(-i) }, { type: "kern", size: h.kern }, { type: "elem", elem: r }] });
  } else if (c) {
    var k = r.depth + s;
    b = V({ positionType: "bottom", positionData: k, children: [{ type: "elem", elem: r }, { type: "kern", size: c.kern }, { type: "elem", elem: c.elem, marginLeft: z(i) }, { type: "kern", size: n.fontMetrics().bigOpSpacing5 }] });
  } else return r;
  var C = [b];
  if (h && i !== 0 && !l) {
    var E = T(["mspace"], [], n);
    E.style.marginRight = z(i), C.unshift(E);
  }
  return T(["mop", "op-limits"], C, n);
}, xi = /* @__PURE__ */ new Set(["\\smallint"]), $t = (r, e) => {
  var t, n, a = false, i;
  r.type === "supsub" ? (t = r.sup, n = r.sub, i = _(r.base, "op"), a = true) : i = _(r, "op");
  var s = e.style, l = false;
  s.size === $.DISPLAY.size && i.symbol && !xi.has(i.name) && (l = true);
  var h, c;
  if (i.symbol) {
    var m = l ? "Size2-Regular" : "Size1-Regular", p = "";
    if ((i.name === "\\oiint" || i.name === "\\oiiint") && (p = i.name.slice(1), i.name = p === "oiint" ? "\\iint" : "\\iiint"), h = me(i.name, m, "math", e, ["mop", "op-symbol", l ? "large-op" : "small-op"]), c = h.italic, p.length > 0) {
      var b = Va(p + "Size" + (l ? "2" : "1"), e);
      h = V({ positionType: "individualShift", children: [{ type: "elem", elem: h, shift: 0 }, { type: "elem", elem: b, shift: l ? 0.08 : 0 }] }), i.name = "\\" + p, h.classes.unshift("mop"), h.italic = c;
    }
  } else if (i.body) {
    var w = oe(i.body, e, true);
    w.length === 1 && w[0] instanceof Se ? (h = w[0], h.classes[0] = "mop") : h = T(["mop"], w, e);
  } else {
    for (var x = [], k = 1; k < i.name.length; k++) x.push(Wr(i.name[k], i.mode, e));
    h = T(["mop"], x, e);
  }
  var C = 0, E = 0;
  if ((h instanceof Se || i.name === "\\oiint" || i.name === "\\oiiint") && !i.suppressBaseShift) {
    var B;
    C = (h.height - h.depth) / 2 - e.fontMetrics().axisHeight, E = (B = h.italic) != null ? B : 0;
  }
  return a ? wi(h, t, n, e, s, E, C) : (C && (h.style.position = "relative", h.style.top = z(C)), h);
}, Jt = (r, e) => {
  var t;
  if (r.symbol) t = new M("mo", [ze(r.name, r.mode)]), xi.has(r.name) && t.setAttribute("largeop", "false");
  else if (r.body) t = new M("mo", Ae(r.body, e));
  else {
    t = new M("mi", [new ae(r.name.slice(1))]);
    var n = new M("mo", [ze("\u2061", "text")]);
    r.parentIsSupSub ? t = new M("mrow", [t, n]) : t = Wa([t, n]);
  }
  return t;
}, to = { "\u220F": "\\prod", "\u2210": "\\coprod", "\u2211": "\\sum", "\u22C0": "\\bigwedge", "\u22C1": "\\bigvee", "\u22C2": "\\bigcap", "\u22C3": "\\bigcup", "\u2A00": "\\bigodot", "\u2A01": "\\bigoplus", "\u2A02": "\\bigotimes", "\u2A04": "\\biguplus", "\u2A06": "\\bigsqcup" };
N({ type: "op", names: ["\\coprod", "\\bigvee", "\\bigwedge", "\\biguplus", "\\bigcap", "\\bigcup", "\\intop", "\\prod", "\\sum", "\\bigotimes", "\\bigoplus", "\\bigodot", "\\bigsqcup", "\\smallint", "\u220F", "\u2210", "\u2211", "\u22C0", "\u22C1", "\u22C2", "\u22C3", "\u2A00", "\u2A01", "\u2A02", "\u2A04", "\u2A06"], props: { numArgs: 0 }, handler: (r, e) => {
  var { parser: t, funcName: n } = r, a = n;
  return a.length === 1 && (a = to[a]), { type: "op", mode: t.mode, limits: true, parentIsSupSub: false, symbol: true, name: a };
}, htmlBuilder: $t, mathmlBuilder: Jt });
N({ type: "op", names: ["\\mathop"], props: { numArgs: 1, primitive: true }, handler: (r, e) => {
  var { parser: t } = r, n = e[0];
  return { type: "op", mode: t.mode, limits: false, parentIsSupSub: false, symbol: false, body: ne(n) };
}, htmlBuilder: $t, mathmlBuilder: Jt });
var ro = { "\u222B": "\\int", "\u222C": "\\iint", "\u222D": "\\iiint", "\u222E": "\\oint", "\u222F": "\\oiint", "\u2230": "\\oiiint" };
N({ type: "op", names: ["\\arcsin", "\\arccos", "\\arctan", "\\arctg", "\\arcctg", "\\arg", "\\ch", "\\cos", "\\cosec", "\\cosh", "\\cot", "\\cotg", "\\coth", "\\csc", "\\ctg", "\\cth", "\\deg", "\\dim", "\\exp", "\\hom", "\\ker", "\\lg", "\\ln", "\\log", "\\sec", "\\sin", "\\sinh", "\\sh", "\\tan", "\\tanh", "\\tg", "\\th"], props: { numArgs: 0 }, handler(r) {
  var { parser: e, funcName: t } = r;
  return { type: "op", mode: e.mode, limits: false, parentIsSupSub: false, symbol: false, name: t };
}, htmlBuilder: $t, mathmlBuilder: Jt });
N({ type: "op", names: ["\\det", "\\gcd", "\\inf", "\\lim", "\\max", "\\min", "\\Pr", "\\sup"], props: { numArgs: 0 }, handler(r) {
  var { parser: e, funcName: t } = r;
  return { type: "op", mode: e.mode, limits: true, parentIsSupSub: false, symbol: false, name: t };
}, htmlBuilder: $t, mathmlBuilder: Jt });
N({ type: "op", names: ["\\int", "\\iint", "\\iiint", "\\oint", "\\oiint", "\\oiiint", "\u222B", "\u222C", "\u222D", "\u222E", "\u222F", "\u2230"], props: { numArgs: 0, allowedInArgument: true }, handler(r) {
  var { parser: e, funcName: t } = r, n = t;
  return n.length === 1 && (n = ro[n]), { type: "op", mode: e.mode, limits: false, parentIsSupSub: false, symbol: true, name: n };
}, htmlBuilder: $t, mathmlBuilder: Jt });
var ki = (r, e) => {
  var t, n, a = false, i;
  r.type === "supsub" ? (t = r.sup, n = r.sub, i = _(r.base, "operatorname"), a = true) : i = _(r, "operatorname");
  var s;
  if (i.body.length > 0) {
    for (var l = i.body.map((p) => {
      var b = "text" in p ? p.text : void 0;
      return typeof b == "string" ? { type: "textord", mode: p.mode, text: b } : p;
    }), h = oe(l, e.withFont("mathrm"), true), c = 0; c < h.length; c++) {
      var m = h[c];
      m instanceof Se && (m.text = m.text.replace(/\u2212/, "-").replace(/\u2217/, "*"));
    }
    s = T(["mop"], h, e);
  } else s = T(["mop"], [], e);
  return a ? wi(s, t, n, e, e.style, 0, 0) : s;
}, no = (r, e) => {
  for (var t = Ae(r.body, e.withFont("mathrm")), n = true, a = 0; a < t.length; a++) {
    var i = t[a];
    if (!(i instanceof Xa)) if (i instanceof M) switch (i.type) {
      case "mi":
      case "mn":
      case "mspace":
      case "mtext":
        break;
      case "mo": {
        var s = i.children[0];
        i.children.length === 1 && s instanceof ae ? s.text = s.text.replace(/\u2212/, "-").replace(/\u2217/, "*") : n = false;
        break;
      }
      default:
        n = false;
    }
    else n = false;
  }
  if (n) {
    var l = t.map((m) => m.toText()).join("");
    t = [new ae(l)];
  }
  var h = new M("mi", t);
  h.setAttribute("mathvariant", "normal");
  var c = new M("mo", [ze("\u2061", "text")]);
  return r.parentIsSupSub ? new M("mrow", [h, c]) : Wa([h, c]);
};
N({ type: "operatorname", names: ["\\operatorname@", "\\operatornamewithlimits"], props: { numArgs: 1 }, handler: (r, e) => {
  var { parser: t, funcName: n } = r, a = e[0];
  return { type: "operatorname", mode: t.mode, body: ne(a), alwaysHandleSupSub: n === "\\operatornamewithlimits", limits: false, parentIsSupSub: false };
}, htmlBuilder: ki, mathmlBuilder: no });
f("\\operatorname", "\\@ifstar\\operatornamewithlimits\\operatorname@");
kt({ type: "ordgroup", htmlBuilder(r, e) {
  return r.semisimple ? Xe(oe(r.body, e, false)) : T(["mord"], oe(r.body, e, true), e);
}, mathmlBuilder(r, e) {
  return ot(r.body, e, true);
} });
N({ type: "overline", names: ["\\overline"], props: { numArgs: 1 }, handler(r, e) {
  var { parser: t } = r, n = e[0];
  return { type: "overline", mode: t.mode, body: n };
}, htmlBuilder(r, e) {
  var t = U(r.body, e.havingCrampedStyle()), n = qt("overline-line", e), a = e.fontMetrics().defaultRuleThickness, i = V({ positionType: "firstBaseline", children: [{ type: "elem", elem: t }, { type: "kern", size: 3 * a }, { type: "elem", elem: n }, { type: "kern", size: a }] });
  return T(["mord", "overline"], [i], e);
}, mathmlBuilder(r, e) {
  var t = new M("mo", [new ae("\u203E")]);
  t.setAttribute("stretchy", "true");
  var n = new M("mover", [Y(r.body, e), t]);
  return n.setAttribute("accent", "true"), n;
} });
N({ type: "phantom", names: ["\\phantom"], props: { numArgs: 1, allowedInText: true }, handler: (r, e) => {
  var { parser: t } = r, n = e[0];
  return { type: "phantom", mode: t.mode, body: ne(n) };
}, htmlBuilder: (r, e) => {
  var t = oe(r.body, e.withPhantom(), false);
  return Xe(t);
}, mathmlBuilder: (r, e) => {
  var t = Ae(r.body, e);
  return new M("mphantom", t);
} });
f("\\hphantom", "\\smash{\\phantom{#1}}");
N({ type: "vphantom", names: ["\\vphantom"], props: { numArgs: 1, allowedInText: true }, handler: (r, e) => {
  var { parser: t } = r, n = e[0];
  return { type: "vphantom", mode: t.mode, body: n };
}, htmlBuilder: (r, e) => {
  var t = T(["inner"], [U(r.body, e.withPhantom())]), n = T(["fix"], []);
  return T(["mord", "rlap"], [t, n], e);
}, mathmlBuilder: (r, e) => {
  var t = Ae(ne(r.body), e), n = new M("mphantom", t), a = new M("mpadded", [n]);
  return a.setAttribute("width", "0px"), a;
} });
N({ type: "raisebox", names: ["\\raisebox"], props: { numArgs: 2, argTypes: ["size", "hbox"], allowedInText: true }, handler(r, e) {
  var { parser: t } = r, n = _(e[0], "size").value, a = e[1];
  return { type: "raisebox", mode: t.mode, dy: n, body: a };
}, htmlBuilder(r, e) {
  var t = U(r.body, e), n = J(r.dy, e);
  return V({ positionType: "shift", positionData: -n, children: [{ type: "elem", elem: t }] });
}, mathmlBuilder(r, e) {
  var t = new M("mpadded", [Y(r.body, e)]), n = r.dy.number + r.dy.unit;
  return t.setAttribute("voffset", n), t;
} });
N({ type: "internal", names: ["\\relax"], props: { numArgs: 0, allowedInText: true, allowedInArgument: true }, handler(r) {
  var { parser: e } = r;
  return { type: "internal", mode: e.mode };
} });
N({ type: "rule", names: ["\\rule"], props: { numArgs: 2, numOptionalArgs: 1, allowedInText: true, allowedInMath: true, argTypes: ["size", "size", "size"] }, handler(r, e, t) {
  var { parser: n } = r, a = t[0], i = _(e[0], "size"), s = _(e[1], "size");
  return { type: "rule", mode: n.mode, shift: a && _(a, "size").value, width: i.value, height: s.value };
}, htmlBuilder(r, e) {
  var t = T(["mord", "rule"], [], e), n = J(r.width, e), a = J(r.height, e), i = r.shift ? J(r.shift, e) : 0;
  return t.style.borderRightWidth = z(n), t.style.borderTopWidth = z(a), t.style.bottom = z(i), t.width = n, t.height = a + i, t.depth = -i, t.maxFontSize = a * 1.125 * e.sizeMultiplier, t;
}, mathmlBuilder(r, e) {
  var t = J(r.width, e), n = J(r.height, e), a = r.shift ? J(r.shift, e) : 0, i = e.color && e.getColor() || "black", s = new M("mspace");
  s.setAttribute("mathbackground", i), s.setAttribute("width", z(t)), s.setAttribute("height", z(n));
  var l = new M("mpadded", [s]);
  return a >= 0 ? l.setAttribute("height", z(a)) : (l.setAttribute("height", z(a)), l.setAttribute("depth", z(-a))), l.setAttribute("voffset", z(a)), l;
} });
function Si(r, e, t) {
  for (var n = oe(r, e, false), a = e.sizeMultiplier / t.sizeMultiplier, i = 0; i < n.length; i++) {
    var s = n[i].classes.indexOf("sizing");
    s < 0 ? Array.prototype.push.apply(n[i].classes, e.sizingClasses(t)) : n[i].classes[s + 1] === "reset-size" + e.size && (n[i].classes[s + 1] = "reset-size" + t.size), n[i].height *= a, n[i].depth *= a;
  }
  return Xe(n);
}
var la = ["\\tiny", "\\sixptsize", "\\scriptsize", "\\footnotesize", "\\small", "\\normalsize", "\\large", "\\Large", "\\LARGE", "\\huge", "\\Huge"], ao = (r, e) => {
  var t = e.havingSize(r.size);
  return Si(r.body, t, e);
};
N({ type: "sizing", names: la, props: { numArgs: 0, allowedInText: true }, handler: (r, e) => {
  var { breakOnTokenText: t, funcName: n, parser: a } = r, i = a.parseExpression(false, t);
  return { type: "sizing", mode: a.mode, size: la.indexOf(n) + 1, body: i };
}, htmlBuilder: ao, mathmlBuilder: (r, e) => {
  var t = e.havingSize(r.size), n = Ae(r.body, t), a = new M("mstyle", n);
  return a.setAttribute("mathsize", z(t.sizeMultiplier)), a;
} });
N({ type: "smash", names: ["\\smash"], props: { numArgs: 1, numOptionalArgs: 1, allowedInText: true }, handler: (r, e, t) => {
  var { parser: n } = r, a = false, i = false, s = t[0] && _(t[0], "ordgroup");
  if (s) for (var l, h = 0; h < s.body.length; ++h) {
    var c = s.body[h];
    if (l = O0(c).text, l === "t") a = true;
    else if (l === "b") i = true;
    else {
      a = false, i = false;
      break;
    }
  }
  else a = true, i = true;
  var m = e[0];
  return { type: "smash", mode: n.mode, body: m, smashHeight: a, smashDepth: i };
}, htmlBuilder: (r, e) => {
  var t = T([], [U(r.body, e)]);
  if (!r.smashHeight && !r.smashDepth) return t;
  if (r.smashHeight && (t.height = 0), r.smashDepth && (t.depth = 0), r.smashHeight && r.smashDepth) return T(["mord", "smash"], [t], e);
  if (t.children) for (var n = 0; n < t.children.length; n++) r.smashHeight && (t.children[n].height = 0), r.smashDepth && (t.children[n].depth = 0);
  var a = V({ positionType: "firstBaseline", children: [{ type: "elem", elem: t }] });
  return T(["mord"], [a], e);
}, mathmlBuilder: (r, e) => {
  var t = new M("mpadded", [Y(r.body, e)]);
  return r.smashHeight && t.setAttribute("height", "0px"), r.smashDepth && t.setAttribute("depth", "0px"), t;
} });
N({ type: "sqrt", names: ["\\sqrt"], props: { numArgs: 1, numOptionalArgs: 1 }, handler(r, e, t) {
  var { parser: n } = r, a = t[0], i = e[0];
  return { type: "sqrt", mode: n.mode, body: i, index: a };
}, htmlBuilder(r, e) {
  var t = U(r.body, e.havingCrampedStyle());
  t.height === 0 && (t.height = e.fontMetrics().xHeight), t = Ft(t, e);
  var n = e.fontMetrics(), a = n.defaultRuleThickness, i = a;
  e.style.id < $.TEXT.id && (i = e.fontMetrics().xHeight);
  var s = a + i / 4, l = t.height + t.depth + s + a, { span: h, ruleWidth: c, advanceWidth: m } = Vl(l, e), p = h.height - c;
  p > t.height + t.depth + s && (s = (s + p - t.height - t.depth) / 2);
  var b = h.height - t.height - s - c;
  t.style.paddingLeft = z(m);
  var w = V({ positionType: "firstBaseline", children: [{ type: "elem", elem: t, wrapperClasses: ["svg-align"] }, { type: "kern", size: -(t.height + b) }, { type: "elem", elem: h }, { type: "kern", size: c }] });
  if (r.index) {
    var x = e.havingStyle($.SCRIPTSCRIPT), k = U(r.index, x, e), C = 0.6 * (w.height - w.depth), E = V({ positionType: "shift", positionData: -C, children: [{ type: "elem", elem: k }] }), B = T(["root"], [E]);
    return T(["mord", "sqrt"], [B, w], e);
  } else return T(["mord", "sqrt"], [w], e);
}, mathmlBuilder(r, e) {
  var { body: t, index: n } = r;
  return n ? new M("mroot", [Y(t, e), Y(n, e)]) : new M("msqrt", [Y(t, e)]);
} });
var Rr = { display: $.DISPLAY, text: $.TEXT, script: $.SCRIPT, scriptscript: $.SCRIPTSCRIPT };
function io(r) {
  return r in Rr;
}
N({ type: "styling", names: ["\\displaystyle", "\\textstyle", "\\scriptstyle", "\\scriptscriptstyle"], props: { numArgs: 0, allowedInText: true, primitive: true }, handler(r, e) {
  var { breakOnTokenText: t, funcName: n, parser: a } = r, i = a.parseExpression(true, t), s = n.slice(1, n.length - 5);
  if (!io(s)) throw new Error("Unknown style: " + s);
  return { type: "styling", mode: a.mode, style: s, body: i };
}, htmlBuilder(r, e) {
  var t = Rr[r.style], n = e.havingStyle(t);
  return r.resetFont && (n = n.withFont("")), Si(r.body, n, e);
}, mathmlBuilder(r, e) {
  var t = Rr[r.style], n = e.havingStyle(t);
  r.resetFont && (n = n.withFont(""));
  var a = Ae(r.body, n), i = new M("mstyle", a), s = { display: ["0", "true"], text: ["0", "false"], script: ["1", "false"], scriptscript: ["2", "false"] }, l = s[r.style];
  return i.setAttribute("scriptlevel", l[0]), i.setAttribute("displaystyle", l[1]), i;
} });
var so = function(e, t) {
  var n = e.base;
  if (n) if (n.type === "op") {
    var a = n.limits && (t.style.size === $.DISPLAY.size || n.alwaysHandleSupSub);
    return a ? $t : null;
  } else if (n.type === "operatorname") {
    var i = n.alwaysHandleSupSub && (t.style.size === $.DISPLAY.size || n.limits);
    return i ? ki : null;
  } else {
    if (n.type === "accent") return je(n.base) ? Kr : null;
    if (n.type === "horizBrace") {
      var s = !e.sub;
      return s === n.isOver ? yi : null;
    } else return null;
  }
  else return null;
};
kt({ type: "supsub", htmlBuilder(r, e) {
  var t = so(r, e);
  if (t) return t(r, e);
  var { base: n, sup: a, sub: i } = r, s = U(n, e), l, h, c = e.fontMetrics(), m = 0, p = 0, b = n && je(n);
  if (a) {
    var w = e.havingStyle(e.style.sup());
    l = U(a, w, e), b || (m = s.height - w.fontMetrics().supDrop * w.sizeMultiplier / e.sizeMultiplier);
  }
  if (i) {
    var x = e.havingStyle(e.style.sub());
    h = U(i, x, e), b || (p = s.depth + x.fontMetrics().subDrop * x.sizeMultiplier / e.sizeMultiplier);
  }
  var k;
  e.style === $.DISPLAY ? k = c.sup1 : e.style.cramped ? k = c.sup3 : k = c.sup2;
  var C = e.sizeMultiplier, E = z(0.5 / c.ptPerEm / C), B = null;
  if (h) {
    var F = r.base && r.base.type === "op" && r.base.name && (r.base.name === "\\oiint" || r.base.name === "\\oiiint");
    if (s instanceof Se || F) {
      var P;
      B = z(-((P = s.italic) != null ? P : 0));
    }
  }
  var R;
  if (l && h) {
    m = Math.max(m, k, l.depth + 0.25 * c.xHeight), p = Math.max(p, c.sub2);
    var D = c.defaultRuleThickness, H = 4 * D;
    if (m - l.depth - (h.height - p) < H) {
      p = H - (m - l.depth) + h.height;
      var W = 0.8 * c.xHeight - (m - l.depth);
      W > 0 && (m += W, p -= W);
    }
    var G = [{ type: "elem", elem: h, shift: p, marginRight: E, marginLeft: B }, { type: "elem", elem: l, shift: -m, marginRight: E }];
    R = V({ positionType: "individualShift", children: G });
  } else if (h) {
    p = Math.max(p, c.sub1, h.height - 0.8 * c.xHeight);
    var ve = [{ type: "elem", elem: h, marginLeft: B, marginRight: E }];
    R = V({ positionType: "shift", positionData: p, children: ve });
  } else if (l) m = Math.max(m, k, l.depth + 0.25 * c.xHeight), R = V({ positionType: "shift", positionData: -m, children: [{ type: "elem", elem: l, marginRight: E }] });
  else throw new Error("supsub must have either sup or sub.");
  var xe = Cr(s, "right") || "mord";
  return T([xe], [s, T(["msupsub"], [R])], e);
}, mathmlBuilder(r, e) {
  var t = false, n, a;
  r.base && r.base.type === "horizBrace" && (a = !!r.sup, a === r.base.isOver && (t = true, n = r.base.isOver)), r.base && (r.base.type === "op" || r.base.type === "operatorname") && (r.base.parentIsSupSub = true);
  var i = [Y(r.base, e)];
  r.sub && i.push(Y(r.sub, e)), r.sup && i.push(Y(r.sup, e));
  var s;
  if (t) s = n ? "mover" : "munder";
  else if (r.sub) if (r.sup) {
    var c = r.base;
    c && c.type === "op" && c.limits && e.style === $.DISPLAY || c && c.type === "operatorname" && c.alwaysHandleSupSub && (e.style === $.DISPLAY || c.limits) ? s = "munderover" : s = "msubsup";
  } else {
    var h = r.base;
    h && h.type === "op" && h.limits && (e.style === $.DISPLAY || h.alwaysHandleSupSub) || h && h.type === "operatorname" && h.alwaysHandleSupSub && (h.limits || e.style === $.DISPLAY) ? s = "munder" : s = "msub";
  }
  else {
    var l = r.base;
    l && l.type === "op" && l.limits && (e.style === $.DISPLAY || l.alwaysHandleSupSub) || l && l.type === "operatorname" && l.alwaysHandleSupSub && (l.limits || e.style === $.DISPLAY) ? s = "mover" : s = "msup";
  }
  return new M(s, i);
} });
kt({ type: "atom", htmlBuilder(r, e) {
  return Wr(r.text, r.mode, e, ["m" + r.family]);
}, mathmlBuilder(r, e) {
  var t = new M("mo", [ze(r.text, r.mode)]);
  if (r.family === "bin") {
    var n = Zr(r, e);
    n === "bold-italic" && t.setAttribute("mathvariant", n);
  } else r.family === "punct" ? t.setAttribute("separator", "true") : (r.family === "open" || r.family === "close") && t.setAttribute("stretchy", "false");
  return t;
} });
var Ti = { mi: "italic", mn: "normal", mtext: "normal" };
kt({ type: "mathord", htmlBuilder(r, e) {
  return q0(r, e, "mathord");
}, mathmlBuilder(r, e) {
  var t = new M("mi", [ze(r.text, r.mode, e)]), n = Zr(r, e) || "italic";
  return n !== Ti[t.type] && t.setAttribute("mathvariant", n), t;
} });
kt({ type: "textord", htmlBuilder(r, e) {
  return q0(r, e, "textord");
}, mathmlBuilder(r, e) {
  var t = ze(r.text, r.mode, e), n = Zr(r, e) || "normal", a;
  return r.mode === "text" ? a = new M("mtext", [t]) : /[0-9]/.test(r.text) ? a = new M("mn", [t]) : r.text === "\\prime" ? a = new M("mo", [t]) : a = new M("mi", [t]), n !== Ti[a.type] && a.setAttribute("mathvariant", n), a;
} });
var ur = { "\\nobreak": "nobreak", "\\allowbreak": "allowbreak" }, hr = { " ": {}, "\\ ": {}, "~": { className: "nobreak" }, "\\space": {}, "\\nobreakspace": { className: "nobreak" } };
kt({ type: "spacing", htmlBuilder(r, e) {
  if (hr.hasOwnProperty(r.text)) {
    var t = hr[r.text].className || "";
    if (r.mode === "text") {
      var n = q0(r, e, "textord");
      return n.classes.push(t), n;
    } else return T(["mspace", t], [Wr(r.text, r.mode, e)], e);
  } else {
    if (ur.hasOwnProperty(r.text)) return T(["mspace", ur[r.text]], [], e);
    throw new A('Unknown type of space "' + r.text + '"');
  }
}, mathmlBuilder(r, e) {
  var t;
  if (hr.hasOwnProperty(r.text)) t = new M("mtext", [new ae("\xA0")]);
  else {
    if (ur.hasOwnProperty(r.text)) return new M("mspace");
    throw new A('Unknown type of space "' + r.text + '"');
  }
  return t;
} });
var oa = () => {
  var r = new M("mtd", []);
  return r.setAttribute("width", "50%"), r;
};
kt({ type: "tag", mathmlBuilder(r, e) {
  var t = new M("mtable", [new M("mtr", [oa(), new M("mtd", [ot(r.body, e)]), oa(), new M("mtd", [ot(r.tag, e)])])]);
  return t.setAttribute("width", "100%"), t;
} });
var ua = { "\\text": void 0, "\\textrm": "textrm", "\\textsf": "textsf", "\\texttt": "texttt", "\\textnormal": "textrm" }, ha = { "\\textbf": "textbf", "\\textmd": "textmd" }, lo = { "\\textit": "textit", "\\textup": "textup" }, ca = (r, e) => {
  var t = r.font;
  if (t) {
    if (ua[t]) return e.withTextFontFamily(ua[t]);
    if (ha[t]) return e.withTextFontWeight(ha[t]);
    if (t === "\\emph") return e.fontShape === "textit" ? e.withTextFontShape("textup") : e.withTextFontShape("textit");
  } else return e;
  return e.withTextFontShape(lo[t]);
};
N({ type: "text", names: ["\\text", "\\textrm", "\\textsf", "\\texttt", "\\textnormal", "\\textbf", "\\textmd", "\\textit", "\\textup", "\\emph"], props: { numArgs: 1, argTypes: ["text"], allowedInArgument: true, allowedInText: true }, handler(r, e) {
  var { parser: t, funcName: n } = r, a = e[0];
  return { type: "text", mode: t.mode, body: ne(a), font: n };
}, htmlBuilder(r, e) {
  var t = ca(r, e), n = oe(r.body, t, true);
  return T(["mord", "text"], n, t);
}, mathmlBuilder(r, e) {
  var t = ca(r, e);
  return ot(r.body, t);
} });
N({ type: "underline", names: ["\\underline"], props: { numArgs: 1, allowedInText: true }, handler(r, e) {
  var { parser: t } = r;
  return { type: "underline", mode: t.mode, body: e[0] };
}, htmlBuilder(r, e) {
  var t = U(r.body, e), n = qt("underline-line", e), a = e.fontMetrics().defaultRuleThickness, i = V({ positionType: "top", positionData: t.height, children: [{ type: "kern", size: a }, { type: "elem", elem: n }, { type: "kern", size: 3 * a }, { type: "elem", elem: t }] });
  return T(["mord", "underline"], [i], e);
}, mathmlBuilder(r, e) {
  var t = new M("mo", [new ae("\u203E")]);
  t.setAttribute("stretchy", "true");
  var n = new M("munder", [Y(r.body, e), t]);
  return n.setAttribute("accentunder", "true"), n;
} });
N({ type: "vcenter", names: ["\\vcenter"], props: { numArgs: 1, argTypes: ["original"], allowedInText: false }, handler(r, e) {
  var { parser: t } = r;
  return { type: "vcenter", mode: t.mode, body: e[0] };
}, htmlBuilder(r, e) {
  var t = U(r.body, e), n = e.fontMetrics().axisHeight, a = 0.5 * (t.height - n - (t.depth + n));
  return V({ positionType: "shift", positionData: a, children: [{ type: "elem", elem: t }] });
}, mathmlBuilder(r, e) {
  var t = new M("mpadded", [Y(r.body, e)], ["vcenter"]);
  return new M("mrow", [t]);
} });
N({ type: "verb", names: ["\\verb"], props: { numArgs: 0, allowedInText: true }, handler(r, e, t) {
  throw new A("\\verb ended by end of line instead of matching delimiter");
}, htmlBuilder(r, e) {
  for (var t = da(r), n = [], a = e.havingStyle(e.style.text()), i = 0; i < t.length; i++) {
    var s = t[i];
    s === "~" && (s = "\\textasciitilde"), n.push(me(s, "Typewriter-Regular", r.mode, a, ["mord", "texttt"]));
  }
  return T(["mord", "text"].concat(a.sizingClasses(e)), Ha(n), a);
}, mathmlBuilder(r, e) {
  var t = new ae(da(r)), n = new M("mtext", [t]);
  return n.setAttribute("mathvariant", "monospace"), n;
} });
var da = (r) => r.body.replace(/ /g, r.star ? "\u2423" : "\xA0"), nt = Ua, Ai = `[ \r
	]`, oo = "\\\\[a-zA-Z@]+", uo = "\\\\[^\uD800-\uDFFF]", ho = "(" + oo + ")" + Ai + "*", co = `\\\\(
|[ \r	]+
?)[ \r	]*`, qr = "[\u0300-\u036F]", mo = new RegExp(qr + "+$"), fo = "(" + Ai + "+)|" + (co + "|") + "([!-\\[\\]-\u2027\u202A-\uD7FF\uF900-\uFFFF]" + (qr + "*") + "|[\uD800-\uDBFF][\uDC00-\uDFFF]" + (qr + "*") + "|\\\\verb\\*([^]).*?\\4|\\\\verb([^*a-zA-Z]).*?\\5" + ("|" + ho) + ("|" + uo + ")");
class ma {
  constructor(e, t) {
    this.input = void 0, this.settings = void 0, this.tokenRegex = void 0, this.catcodes = void 0, this.input = e, this.settings = t, this.tokenRegex = new RegExp(fo, "g"), this.catcodes = { "%": 14, "~": 13 };
  }
  setCatcode(e, t) {
    this.catcodes[e] = t;
  }
  lex() {
    var e = this.input, t = this.tokenRegex.lastIndex;
    if (t === e.length) return new ke("EOF", new ye(this, t, t));
    var n = this.tokenRegex.exec(e);
    if (n === null || n.index !== t) throw new A("Unexpected character: '" + e[t] + "'", new ke(e[t], new ye(this, t, t + 1)));
    var a = n[6] || n[3] || (n[2] ? "\\ " : " ");
    if (this.catcodes[a] === 14) {
      var i = e.indexOf(`
`, this.tokenRegex.lastIndex);
      return i === -1 ? (this.tokenRegex.lastIndex = e.length, this.settings.reportNonstrict("commentAtEnd", "% comment has no terminating newline; LaTeX would fail because of commenting the end of math mode (e.g. $)")) : this.tokenRegex.lastIndex = i + 1, this.lex();
    }
    return new ke(a, new ye(this, t, this.tokenRegex.lastIndex));
  }
}
class po {
  constructor(e, t) {
    e === void 0 && (e = {}), t === void 0 && (t = {}), this.current = void 0, this.builtins = void 0, this.undefStack = void 0, this.current = t, this.builtins = e, this.undefStack = [];
  }
  beginGroup() {
    this.undefStack.push({});
  }
  endGroup() {
    if (this.undefStack.length === 0) throw new A("Unbalanced namespace destruction: attempt to pop global namespace; please report this as a bug");
    var e = this.undefStack.pop();
    for (var t in e) e.hasOwnProperty(t) && (e[t] == null ? delete this.current[t] : this.current[t] = e[t]);
  }
  endGroups() {
    for (; this.undefStack.length > 0; ) this.endGroup();
  }
  has(e) {
    return this.current.hasOwnProperty(e) || this.builtins.hasOwnProperty(e);
  }
  get(e) {
    return this.current.hasOwnProperty(e) ? this.current[e] : this.builtins[e];
  }
  set(e, t, n) {
    if (n === void 0 && (n = false), n) {
      for (var a = 0; a < this.undefStack.length; a++) delete this.undefStack[a][e];
      this.undefStack.length > 0 && (this.undefStack[this.undefStack.length - 1][e] = t);
    } else {
      var i = this.undefStack[this.undefStack.length - 1];
      i && !i.hasOwnProperty(e) && (i[e] = this.current[e]);
    }
    t == null ? delete this.current[e] : this.current[e] = t;
  }
}
var go = fi;
f("\\noexpand", function(r) {
  var e = r.popToken();
  return r.isExpandable(e.text) && (e.noexpand = true, e.treatAsRelax = true), { tokens: [e], numArgs: 0 };
});
f("\\expandafter", function(r) {
  var e = r.popToken();
  return r.expandOnce(true), { tokens: [e], numArgs: 0 };
});
f("\\@firstoftwo", function(r) {
  var e = r.consumeArgs(2);
  return { tokens: e[0], numArgs: 0 };
});
f("\\@secondoftwo", function(r) {
  var e = r.consumeArgs(2);
  return { tokens: e[1], numArgs: 0 };
});
f("\\@ifnextchar", function(r) {
  var e = r.consumeArgs(3);
  r.consumeSpaces();
  var t = r.future();
  return e[0].length === 1 && e[0][0].text === t.text ? { tokens: e[1], numArgs: 0 } : { tokens: e[2], numArgs: 0 };
});
f("\\@ifstar", "\\@ifnextchar *{\\@firstoftwo{#1}}");
f("\\TextOrMath", function(r) {
  var e = r.consumeArgs(2);
  return r.mode === "text" ? { tokens: e[0], numArgs: 0 } : { tokens: e[1], numArgs: 0 };
});
var fa = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, a: 10, A: 10, b: 11, B: 11, c: 12, C: 12, d: 13, D: 13, e: 14, E: 14, f: 15, F: 15 };
f("\\char", function(r) {
  var e = r.popToken(), t, n = 0;
  if (e.text === "'") t = 8, e = r.popToken();
  else if (e.text === '"') t = 16, e = r.popToken();
  else if (e.text === "`") if (e = r.popToken(), e.text[0] === "\\") n = e.text.charCodeAt(1);
  else {
    if (e.text === "EOF") throw new A("\\char` missing argument");
    n = e.text.charCodeAt(0);
  }
  else t = 10;
  if (t) {
    if (n = fa[e.text], n == null || n >= t) throw new A("Invalid base-" + t + " digit " + e.text);
    for (var a; (a = fa[r.future().text]) != null && a < t; ) n *= t, n += a, r.popToken();
  }
  return "\\@char{" + n + "}";
});
var tn = (r, e, t, n) => {
  var a = r.consumeArg().tokens;
  if (a.length !== 1) throw new A("\\newcommand's first argument must be a macro name");
  var i = a[0].text, s = r.isDefined(i);
  if (s && !e) throw new A("\\newcommand{" + i + "} attempting to redefine " + (i + "; use \\renewcommand"));
  if (!s && !t) throw new A("\\renewcommand{" + i + "} when command " + i + " does not yet exist; use \\newcommand");
  var l = 0;
  if (a = r.consumeArg().tokens, a.length === 1 && a[0].text === "[") {
    for (var h = "", c = r.expandNextToken(); c.text !== "]" && c.text !== "EOF"; ) h += c.text, c = r.expandNextToken();
    if (!h.match(/^\s*[0-9]+\s*$/)) throw new A("Invalid number of arguments: " + h);
    l = parseInt(h), a = r.consumeArg().tokens;
  }
  return s && n || r.macros.set(i, { tokens: a, numArgs: l }), "";
};
f("\\newcommand", (r) => tn(r, false, true, false));
f("\\renewcommand", (r) => tn(r, true, false, false));
f("\\providecommand", (r) => tn(r, true, true, true));
f("\\message", (r) => {
  var e = r.consumeArgs(1)[0];
  return console.log(e.reverse().map((t) => t.text).join("")), "";
});
f("\\errmessage", (r) => {
  var e = r.consumeArgs(1)[0];
  return console.error(e.reverse().map((t) => t.text).join("")), "";
});
f("\\show", (r) => {
  var e = r.popToken(), t = e.text;
  return console.log(e, r.macros.get(t), nt[t], Z.math[t], Z.text[t]), "";
});
f("\\bgroup", "{");
f("\\egroup", "}");
f("~", "\\nobreakspace");
f("\\lq", "`");
f("\\rq", "'");
f("\\aa", "\\r a");
f("\\AA", "\\r A");
f("\\textcopyright", "\\html@mathml{\\textcircled{c}}{\\char`\xA9}");
f("\\copyright", "\\TextOrMath{\\textcopyright}{\\text{\\textcopyright}}");
f("\\textregistered", "\\html@mathml{\\textcircled{\\scriptsize R}}{\\char`\xAE}");
f("\u212C", "\\mathscr{B}");
f("\u2130", "\\mathscr{E}");
f("\u2131", "\\mathscr{F}");
f("\u210B", "\\mathscr{H}");
f("\u2110", "\\mathscr{I}");
f("\u2112", "\\mathscr{L}");
f("\u2133", "\\mathscr{M}");
f("\u211B", "\\mathscr{R}");
f("\u212D", "\\mathfrak{C}");
f("\u210C", "\\mathfrak{H}");
f("\u2128", "\\mathfrak{Z}");
f("\\Bbbk", "\\Bbb{k}");
f("\\llap", "\\mathllap{\\textrm{#1}}");
f("\\rlap", "\\mathrlap{\\textrm{#1}}");
f("\\clap", "\\mathclap{\\textrm{#1}}");
f("\\mathstrut", "\\vphantom{(}");
f("\\underbar", "\\underline{\\text{#1}}");
f("\\not", '\\html@mathml{\\mathrel{\\mathrlap\\@not}\\nobreak}{\\char"338}');
f("\\neq", "\\html@mathml{\\mathrel{\\not=}}{\\mathrel{\\char`\u2260}}");
f("\\ne", "\\neq");
f("\u2260", "\\neq");
f("\\notin", "\\html@mathml{\\mathrel{{\\in}\\mathllap{/\\mskip1mu}}}{\\mathrel{\\char`\u2209}}");
f("\u2209", "\\notin");
f("\u2258", "\\html@mathml{\\mathrel{=\\kern{-1em}\\raisebox{0.4em}{$\\scriptsize\\frown$}}}{\\mathrel{\\char`\u2258}}");
f("\u2259", "\\html@mathml{\\stackrel{\\tiny\\wedge}{=}}{\\mathrel{\\char`\u2258}}");
f("\u225A", "\\html@mathml{\\stackrel{\\tiny\\vee}{=}}{\\mathrel{\\char`\u225A}}");
f("\u225B", "\\html@mathml{\\stackrel{\\scriptsize\\star}{=}}{\\mathrel{\\char`\u225B}}");
f("\u225D", "\\html@mathml{\\stackrel{\\tiny\\mathrm{def}}{=}}{\\mathrel{\\char`\u225D}}");
f("\u225E", "\\html@mathml{\\stackrel{\\tiny\\mathrm{m}}{=}}{\\mathrel{\\char`\u225E}}");
f("\u225F", "\\html@mathml{\\stackrel{\\tiny?}{=}}{\\mathrel{\\char`\u225F}}");
f("\u27C2", "\\perp");
f("\u203C", "\\mathclose{!\\mkern-0.8mu!}");
f("\u220C", "\\notni");
f("\u231C", "\\ulcorner");
f("\u231D", "\\urcorner");
f("\u231E", "\\llcorner");
f("\u231F", "\\lrcorner");
f("\xA9", "\\copyright");
f("\xAE", "\\textregistered");
f("\\ulcorner", '\\html@mathml{\\@ulcorner}{\\mathop{\\char"231c}}');
f("\\urcorner", '\\html@mathml{\\@urcorner}{\\mathop{\\char"231d}}');
f("\\llcorner", '\\html@mathml{\\@llcorner}{\\mathop{\\char"231e}}');
f("\\lrcorner", '\\html@mathml{\\@lrcorner}{\\mathop{\\char"231f}}');
f("\\vdots", "{\\varvdots\\rule{0pt}{15pt}}");
f("\u22EE", "\\vdots");
f("\\varGamma", "\\mathit{\\Gamma}");
f("\\varDelta", "\\mathit{\\Delta}");
f("\\varTheta", "\\mathit{\\Theta}");
f("\\varLambda", "\\mathit{\\Lambda}");
f("\\varXi", "\\mathit{\\Xi}");
f("\\varPi", "\\mathit{\\Pi}");
f("\\varSigma", "\\mathit{\\Sigma}");
f("\\varUpsilon", "\\mathit{\\Upsilon}");
f("\\varPhi", "\\mathit{\\Phi}");
f("\\varPsi", "\\mathit{\\Psi}");
f("\\varOmega", "\\mathit{\\Omega}");
f("\\substack", "\\begin{subarray}{c}#1\\end{subarray}");
f("\\colon", "\\nobreak\\mskip2mu\\mathpunct{}\\mathchoice{\\mkern-3mu}{\\mkern-3mu}{}{}{:}\\mskip6mu\\relax");
f("\\boxed", "\\fbox{$\\displaystyle{#1}$}");
f("\\iff", "\\DOTSB\\;\\Longleftrightarrow\\;");
f("\\implies", "\\DOTSB\\;\\Longrightarrow\\;");
f("\\impliedby", "\\DOTSB\\;\\Longleftarrow\\;");
f("\\dddot", "{\\overset{\\raisebox{-0.1ex}{\\normalsize ...}}{#1}}");
f("\\ddddot", "{\\overset{\\raisebox{-0.1ex}{\\normalsize ....}}{#1}}");
var pa = { ",": "\\dotsc", "\\not": "\\dotsb", "+": "\\dotsb", "=": "\\dotsb", "<": "\\dotsb", ">": "\\dotsb", "-": "\\dotsb", "*": "\\dotsb", ":": "\\dotsb", "\\DOTSB": "\\dotsb", "\\coprod": "\\dotsb", "\\bigvee": "\\dotsb", "\\bigwedge": "\\dotsb", "\\biguplus": "\\dotsb", "\\bigcap": "\\dotsb", "\\bigcup": "\\dotsb", "\\prod": "\\dotsb", "\\sum": "\\dotsb", "\\bigotimes": "\\dotsb", "\\bigoplus": "\\dotsb", "\\bigodot": "\\dotsb", "\\bigsqcup": "\\dotsb", "\\And": "\\dotsb", "\\longrightarrow": "\\dotsb", "\\Longrightarrow": "\\dotsb", "\\longleftarrow": "\\dotsb", "\\Longleftarrow": "\\dotsb", "\\longleftrightarrow": "\\dotsb", "\\Longleftrightarrow": "\\dotsb", "\\mapsto": "\\dotsb", "\\longmapsto": "\\dotsb", "\\hookrightarrow": "\\dotsb", "\\doteq": "\\dotsb", "\\mathbin": "\\dotsb", "\\mathrel": "\\dotsb", "\\relbar": "\\dotsb", "\\Relbar": "\\dotsb", "\\xrightarrow": "\\dotsb", "\\xleftarrow": "\\dotsb", "\\DOTSI": "\\dotsi", "\\int": "\\dotsi", "\\oint": "\\dotsi", "\\iint": "\\dotsi", "\\iiint": "\\dotsi", "\\iiiint": "\\dotsi", "\\idotsint": "\\dotsi", "\\DOTSX": "\\dotsx" }, vo = /* @__PURE__ */ new Set(["bin", "rel"]);
f("\\dots", function(r) {
  var e = "\\dotso", t = r.expandAfterFuture().text;
  return t in pa ? e = pa[t] : (t.slice(0, 4) === "\\not" || t in Z.math && vo.has(Z.math[t].group)) && (e = "\\dotsb"), e;
});
var rn = { ")": true, "]": true, "\\rbrack": true, "\\}": true, "\\rbrace": true, "\\rangle": true, "\\rceil": true, "\\rfloor": true, "\\rgroup": true, "\\rmoustache": true, "\\right": true, "\\bigr": true, "\\biggr": true, "\\Bigr": true, "\\Biggr": true, $: true, ";": true, ".": true, ",": true };
f("\\dotso", function(r) {
  var e = r.future().text;
  return e in rn ? "\\ldots\\," : "\\ldots";
});
f("\\dotsc", function(r) {
  var e = r.future().text;
  return e in rn && e !== "," ? "\\ldots\\," : "\\ldots";
});
f("\\cdots", function(r) {
  var e = r.future().text;
  return e in rn ? "\\@cdots\\," : "\\@cdots";
});
f("\\dotsb", "\\cdots");
f("\\dotsm", "\\cdots");
f("\\dotsi", "\\!\\cdots");
f("\\dotsx", "\\ldots\\,");
f("\\DOTSI", "\\relax");
f("\\DOTSB", "\\relax");
f("\\DOTSX", "\\relax");
f("\\tmspace", "\\TextOrMath{\\kern#1#3}{\\mskip#1#2}\\relax");
f("\\,", "\\tmspace+{3mu}{.1667em}");
f("\\thinspace", "\\,");
f("\\>", "\\mskip{4mu}");
f("\\:", "\\tmspace+{4mu}{.2222em}");
f("\\medspace", "\\:");
f("\\;", "\\tmspace+{5mu}{.2777em}");
f("\\thickspace", "\\;");
f("\\!", "\\tmspace-{3mu}{.1667em}");
f("\\negthinspace", "\\!");
f("\\negmedspace", "\\tmspace-{4mu}{.2222em}");
f("\\negthickspace", "\\tmspace-{5mu}{.277em}");
f("\\enspace", "\\kern.5em ");
f("\\enskip", "\\hskip.5em\\relax");
f("\\quad", "\\hskip1em\\relax");
f("\\qquad", "\\hskip2em\\relax");
f("\\tag", "\\@ifstar\\tag@literal\\tag@paren");
f("\\tag@paren", "\\tag@literal{({#1})}");
f("\\tag@literal", (r) => {
  if (r.macros.get("\\df@tag")) throw new A("Multiple \\tag");
  return "\\gdef\\df@tag{\\text{#1}}";
});
f("\\bmod", "\\mathchoice{\\mskip1mu}{\\mskip1mu}{\\mskip5mu}{\\mskip5mu}\\mathbin{\\rm mod}\\mathchoice{\\mskip1mu}{\\mskip1mu}{\\mskip5mu}{\\mskip5mu}");
f("\\pod", "\\allowbreak\\mathchoice{\\mkern18mu}{\\mkern8mu}{\\mkern8mu}{\\mkern8mu}(#1)");
f("\\pmod", "\\pod{{\\rm mod}\\mkern6mu#1}");
f("\\mod", "\\allowbreak\\mathchoice{\\mkern18mu}{\\mkern12mu}{\\mkern12mu}{\\mkern12mu}{\\rm mod}\\,\\,#1");
f("\\newline", "\\\\\\relax");
f("\\TeX", "\\textrm{\\html@mathml{T\\kern-.1667em\\raisebox{-.5ex}{E}\\kern-.125emX}{TeX}}");
var Mi = z(Re["Main-Regular"][84][1] - 0.7 * Re["Main-Regular"][65][1]);
f("\\LaTeX", "\\textrm{\\html@mathml{" + ("L\\kern-.36em\\raisebox{" + Mi + "}{\\scriptstyle A}") + "\\kern-.15em\\TeX}{LaTeX}}");
f("\\KaTeX", "\\textrm{\\html@mathml{" + ("K\\kern-.17em\\raisebox{" + Mi + "}{\\scriptstyle A}") + "\\kern-.15em\\TeX}{KaTeX}}");
f("\\hspace", "\\@ifstar\\@hspacer\\@hspace");
f("\\@hspace", "\\hskip #1\\relax");
f("\\@hspacer", "\\rule{0pt}{0pt}\\hskip #1\\relax");
f("\\ordinarycolon", ":");
f("\\vcentcolon", "\\mathrel{\\mathop\\ordinarycolon}");
f("\\dblcolon", '\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-.9mu}\\vcentcolon}}{\\mathop{\\char"2237}}');
f("\\coloneqq", '\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}=}}{\\mathop{\\char"2254}}');
f("\\Coloneqq", '\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}=}}{\\mathop{\\char"2237\\char"3d}}');
f("\\coloneq", '\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}\\mathrel{-}}}{\\mathop{\\char"3a\\char"2212}}');
f("\\Coloneq", '\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}\\mathrel{-}}}{\\mathop{\\char"2237\\char"2212}}');
f("\\eqqcolon", '\\html@mathml{\\mathrel{=\\mathrel{\\mkern-1.2mu}\\vcentcolon}}{\\mathop{\\char"2255}}');
f("\\Eqqcolon", '\\html@mathml{\\mathrel{=\\mathrel{\\mkern-1.2mu}\\dblcolon}}{\\mathop{\\char"3d\\char"2237}}');
f("\\eqcolon", '\\html@mathml{\\mathrel{\\mathrel{-}\\mathrel{\\mkern-1.2mu}\\vcentcolon}}{\\mathop{\\char"2239}}');
f("\\Eqcolon", '\\html@mathml{\\mathrel{\\mathrel{-}\\mathrel{\\mkern-1.2mu}\\dblcolon}}{\\mathop{\\char"2212\\char"2237}}');
f("\\colonapprox", '\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}\\approx}}{\\mathop{\\char"3a\\char"2248}}');
f("\\Colonapprox", '\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}\\approx}}{\\mathop{\\char"2237\\char"2248}}');
f("\\colonsim", '\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}\\sim}}{\\mathop{\\char"3a\\char"223c}}');
f("\\Colonsim", '\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}\\sim}}{\\mathop{\\char"2237\\char"223c}}');
f("\u2237", "\\dblcolon");
f("\u2239", "\\eqcolon");
f("\u2254", "\\coloneqq");
f("\u2255", "\\eqqcolon");
f("\u2A74", "\\Coloneqq");
f("\\ratio", "\\vcentcolon");
f("\\coloncolon", "\\dblcolon");
f("\\colonequals", "\\coloneqq");
f("\\coloncolonequals", "\\Coloneqq");
f("\\equalscolon", "\\eqqcolon");
f("\\equalscoloncolon", "\\Eqqcolon");
f("\\colonminus", "\\coloneq");
f("\\coloncolonminus", "\\Coloneq");
f("\\minuscolon", "\\eqcolon");
f("\\minuscoloncolon", "\\Eqcolon");
f("\\coloncolonapprox", "\\Colonapprox");
f("\\coloncolonsim", "\\Colonsim");
f("\\simcolon", "\\mathrel{\\sim\\mathrel{\\mkern-1.2mu}\\vcentcolon}");
f("\\simcoloncolon", "\\mathrel{\\sim\\mathrel{\\mkern-1.2mu}\\dblcolon}");
f("\\approxcolon", "\\mathrel{\\approx\\mathrel{\\mkern-1.2mu}\\vcentcolon}");
f("\\approxcoloncolon", "\\mathrel{\\approx\\mathrel{\\mkern-1.2mu}\\dblcolon}");
f("\\notni", "\\html@mathml{\\not\\ni}{\\mathrel{\\char`\u220C}}");
f("\\limsup", "\\DOTSB\\operatorname*{lim\\,sup}");
f("\\liminf", "\\DOTSB\\operatorname*{lim\\,inf}");
f("\\injlim", "\\DOTSB\\operatorname*{inj\\,lim}");
f("\\projlim", "\\DOTSB\\operatorname*{proj\\,lim}");
f("\\varlimsup", "\\DOTSB\\operatorname*{\\overline{lim}}");
f("\\varliminf", "\\DOTSB\\operatorname*{\\underline{lim}}");
f("\\varinjlim", "\\DOTSB\\operatorname*{\\underrightarrow{lim}}");
f("\\varprojlim", "\\DOTSB\\operatorname*{\\underleftarrow{lim}}");
f("\\gvertneqq", "\\html@mathml{\\@gvertneqq}{\u2269}");
f("\\lvertneqq", "\\html@mathml{\\@lvertneqq}{\u2268}");
f("\\ngeqq", "\\html@mathml{\\@ngeqq}{\u2271}");
f("\\ngeqslant", "\\html@mathml{\\@ngeqslant}{\u2271}");
f("\\nleqq", "\\html@mathml{\\@nleqq}{\u2270}");
f("\\nleqslant", "\\html@mathml{\\@nleqslant}{\u2270}");
f("\\nshortmid", "\\html@mathml{\\@nshortmid}{\u2224}");
f("\\nshortparallel", "\\html@mathml{\\@nshortparallel}{\u2226}");
f("\\nsubseteqq", "\\html@mathml{\\@nsubseteqq}{\u2288}");
f("\\nsupseteqq", "\\html@mathml{\\@nsupseteqq}{\u2289}");
f("\\varsubsetneq", "\\html@mathml{\\@varsubsetneq}{\u228A}");
f("\\varsubsetneqq", "\\html@mathml{\\@varsubsetneqq}{\u2ACB}");
f("\\varsupsetneq", "\\html@mathml{\\@varsupsetneq}{\u228B}");
f("\\varsupsetneqq", "\\html@mathml{\\@varsupsetneqq}{\u2ACC}");
f("\\imath", "\\html@mathml{\\@imath}{\u0131}");
f("\\jmath", "\\html@mathml{\\@jmath}{\u0237}");
f("\\llbracket", "\\html@mathml{\\mathopen{[\\mkern-3.2mu[}}{\\mathopen{\\char`\u27E6}}");
f("\\rrbracket", "\\html@mathml{\\mathclose{]\\mkern-3.2mu]}}{\\mathclose{\\char`\u27E7}}");
f("\u27E6", "\\llbracket");
f("\u27E7", "\\rrbracket");
f("\\lBrace", "\\html@mathml{\\mathopen{\\{\\mkern-3.2mu[}}{\\mathopen{\\char`\u2983}}");
f("\\rBrace", "\\html@mathml{\\mathclose{]\\mkern-3.2mu\\}}}{\\mathclose{\\char`\u2984}}");
f("\u2983", "\\lBrace");
f("\u2984", "\\rBrace");
f("\\minuso", "\\mathbin{\\html@mathml{{\\mathrlap{\\mathchoice{\\kern{0.145em}}{\\kern{0.145em}}{\\kern{0.1015em}}{\\kern{0.0725em}}\\circ}{-}}}{\\char`\u29B5}}");
f("\u29B5", "\\minuso");
f("\\darr", "\\downarrow");
f("\\dArr", "\\Downarrow");
f("\\Darr", "\\Downarrow");
f("\\lang", "\\langle");
f("\\rang", "\\rangle");
f("\\uarr", "\\uparrow");
f("\\uArr", "\\Uparrow");
f("\\Uarr", "\\Uparrow");
f("\\N", "\\mathbb{N}");
f("\\R", "\\mathbb{R}");
f("\\Z", "\\mathbb{Z}");
f("\\alef", "\\aleph");
f("\\alefsym", "\\aleph");
f("\\Alpha", "\\mathrm{A}");
f("\\Beta", "\\mathrm{B}");
f("\\bull", "\\bullet");
f("\\Chi", "\\mathrm{X}");
f("\\clubs", "\\clubsuit");
f("\\cnums", "\\mathbb{C}");
f("\\Complex", "\\mathbb{C}");
f("\\Dagger", "\\ddagger");
f("\\diamonds", "\\diamondsuit");
f("\\empty", "\\emptyset");
f("\\Epsilon", "\\mathrm{E}");
f("\\Eta", "\\mathrm{H}");
f("\\exist", "\\exists");
f("\\harr", "\\leftrightarrow");
f("\\hArr", "\\Leftrightarrow");
f("\\Harr", "\\Leftrightarrow");
f("\\hearts", "\\heartsuit");
f("\\image", "\\Im");
f("\\infin", "\\infty");
f("\\Iota", "\\mathrm{I}");
f("\\isin", "\\in");
f("\\Kappa", "\\mathrm{K}");
f("\\larr", "\\leftarrow");
f("\\lArr", "\\Leftarrow");
f("\\Larr", "\\Leftarrow");
f("\\lrarr", "\\leftrightarrow");
f("\\lrArr", "\\Leftrightarrow");
f("\\Lrarr", "\\Leftrightarrow");
f("\\Mu", "\\mathrm{M}");
f("\\natnums", "\\mathbb{N}");
f("\\Nu", "\\mathrm{N}");
f("\\Omicron", "\\mathrm{O}");
f("\\plusmn", "\\pm");
f("\\rarr", "\\rightarrow");
f("\\rArr", "\\Rightarrow");
f("\\Rarr", "\\Rightarrow");
f("\\real", "\\Re");
f("\\reals", "\\mathbb{R}");
f("\\Reals", "\\mathbb{R}");
f("\\Rho", "\\mathrm{P}");
f("\\sdot", "\\cdot");
f("\\sect", "\\S");
f("\\spades", "\\spadesuit");
f("\\sub", "\\subset");
f("\\sube", "\\subseteq");
f("\\supe", "\\supseteq");
f("\\Tau", "\\mathrm{T}");
f("\\thetasym", "\\vartheta");
f("\\weierp", "\\wp");
f("\\Zeta", "\\mathrm{Z}");
f("\\argmin", "\\DOTSB\\operatorname*{arg\\,min}");
f("\\argmax", "\\DOTSB\\operatorname*{arg\\,max}");
f("\\plim", "\\DOTSB\\mathop{\\operatorname{plim}}\\limits");
f("\\bra", "\\mathinner{\\langle{#1}|}");
f("\\ket", "\\mathinner{|{#1}\\rangle}");
f("\\braket", "\\mathinner{\\langle{#1}\\rangle}");
f("\\Bra", "\\left\\langle#1\\right|");
f("\\Ket", "\\left|#1\\right\\rangle");
var zi = (r) => (e) => {
  var t = e.consumeArg().tokens, n = e.consumeArg().tokens, a = e.consumeArg().tokens, i = e.consumeArg().tokens, s = e.macros.get("|"), l = e.macros.get("\\|");
  e.macros.beginGroup();
  var h = (p) => (b) => {
    r && (b.macros.set("|", s), a.length && b.macros.set("\\|", l));
    var w = p;
    if (!p && a.length) {
      var x = b.future();
      x.text === "|" && (b.popToken(), w = true);
    }
    return { tokens: w ? a : n, numArgs: 0 };
  };
  e.macros.set("|", h(false)), a.length && e.macros.set("\\|", h(true));
  var c = e.consumeArg().tokens, m = e.expandTokens([...i, ...c, ...t]);
  return e.macros.endGroup(), { tokens: m.reverse(), numArgs: 0 };
};
f("\\bra@ket", zi(false));
f("\\bra@set", zi(true));
f("\\Braket", "\\bra@ket{\\left\\langle}{\\,\\middle\\vert\\,}{\\,\\middle\\vert\\,}{\\right\\rangle}");
f("\\Set", "\\bra@set{\\left\\{\\:}{\\;\\middle\\vert\\;}{\\;\\middle\\Vert\\;}{\\:\\right\\}}");
f("\\set", "\\bra@set{\\{\\,}{\\mid}{}{\\,\\}}");
f("\\angln", "{\\angl n}");
f("\\blue", "\\textcolor{##6495ed}{#1}");
f("\\orange", "\\textcolor{##ffa500}{#1}");
f("\\pink", "\\textcolor{##ff00af}{#1}");
f("\\red", "\\textcolor{##df0030}{#1}");
f("\\green", "\\textcolor{##28ae7b}{#1}");
f("\\gray", "\\textcolor{gray}{#1}");
f("\\purple", "\\textcolor{##9d38bd}{#1}");
f("\\blueA", "\\textcolor{##ccfaff}{#1}");
f("\\blueB", "\\textcolor{##80f6ff}{#1}");
f("\\blueC", "\\textcolor{##63d9ea}{#1}");
f("\\blueD", "\\textcolor{##11accd}{#1}");
f("\\blueE", "\\textcolor{##0c7f99}{#1}");
f("\\tealA", "\\textcolor{##94fff5}{#1}");
f("\\tealB", "\\textcolor{##26edd5}{#1}");
f("\\tealC", "\\textcolor{##01d1c1}{#1}");
f("\\tealD", "\\textcolor{##01a995}{#1}");
f("\\tealE", "\\textcolor{##208170}{#1}");
f("\\greenA", "\\textcolor{##b6ffb0}{#1}");
f("\\greenB", "\\textcolor{##8af281}{#1}");
f("\\greenC", "\\textcolor{##74cf70}{#1}");
f("\\greenD", "\\textcolor{##1fab54}{#1}");
f("\\greenE", "\\textcolor{##0d923f}{#1}");
f("\\goldA", "\\textcolor{##ffd0a9}{#1}");
f("\\goldB", "\\textcolor{##ffbb71}{#1}");
f("\\goldC", "\\textcolor{##ff9c39}{#1}");
f("\\goldD", "\\textcolor{##e07d10}{#1}");
f("\\goldE", "\\textcolor{##a75a05}{#1}");
f("\\redA", "\\textcolor{##fca9a9}{#1}");
f("\\redB", "\\textcolor{##ff8482}{#1}");
f("\\redC", "\\textcolor{##f9685d}{#1}");
f("\\redD", "\\textcolor{##e84d39}{#1}");
f("\\redE", "\\textcolor{##bc2612}{#1}");
f("\\maroonA", "\\textcolor{##ffbde0}{#1}");
f("\\maroonB", "\\textcolor{##ff92c6}{#1}");
f("\\maroonC", "\\textcolor{##ed5fa6}{#1}");
f("\\maroonD", "\\textcolor{##ca337c}{#1}");
f("\\maroonE", "\\textcolor{##9e034e}{#1}");
f("\\purpleA", "\\textcolor{##ddd7ff}{#1}");
f("\\purpleB", "\\textcolor{##c6b9fc}{#1}");
f("\\purpleC", "\\textcolor{##aa87ff}{#1}");
f("\\purpleD", "\\textcolor{##7854ab}{#1}");
f("\\purpleE", "\\textcolor{##543b78}{#1}");
f("\\mintA", "\\textcolor{##f5f9e8}{#1}");
f("\\mintB", "\\textcolor{##edf2df}{#1}");
f("\\mintC", "\\textcolor{##e0e5cc}{#1}");
f("\\grayA", "\\textcolor{##f6f7f7}{#1}");
f("\\grayB", "\\textcolor{##f0f1f2}{#1}");
f("\\grayC", "\\textcolor{##e3e5e6}{#1}");
f("\\grayD", "\\textcolor{##d6d8da}{#1}");
f("\\grayE", "\\textcolor{##babec2}{#1}");
f("\\grayF", "\\textcolor{##888d93}{#1}");
f("\\grayG", "\\textcolor{##626569}{#1}");
f("\\grayH", "\\textcolor{##3b3e40}{#1}");
f("\\grayI", "\\textcolor{##21242c}{#1}");
f("\\kaBlue", "\\textcolor{##314453}{#1}");
f("\\kaGreen", "\\textcolor{##71B307}{#1}");
var Ci = { "^": true, _: true, "\\limits": true, "\\nolimits": true };
class bo {
  constructor(e, t, n) {
    this.settings = void 0, this.expansionCount = void 0, this.lexer = void 0, this.macros = void 0, this.stack = void 0, this.mode = void 0, this.settings = t, this.expansionCount = 0, this.feed(e), this.macros = new po(go, t.macros), this.mode = n, this.stack = [];
  }
  feed(e) {
    this.lexer = new ma(e, this.settings);
  }
  switchMode(e) {
    this.mode = e;
  }
  beginGroup() {
    this.macros.beginGroup();
  }
  endGroup() {
    this.macros.endGroup();
  }
  endGroups() {
    this.macros.endGroups();
  }
  future() {
    return this.stack.length === 0 && this.pushToken(this.lexer.lex()), this.stack[this.stack.length - 1];
  }
  popToken() {
    return this.future(), this.stack.pop();
  }
  pushToken(e) {
    this.stack.push(e);
  }
  pushTokens(e) {
    this.stack.push(...e);
  }
  scanArgument(e) {
    var t, n, a;
    if (e) {
      if (this.consumeSpaces(), this.future().text !== "[") return null;
      t = this.popToken(), { tokens: a, end: n } = this.consumeArg(["]"]);
    } else ({ tokens: a, start: t, end: n } = this.consumeArg());
    return this.pushToken(new ke("EOF", n.loc)), this.pushTokens(a), new ke("", ye.range(t, n));
  }
  consumeSpaces() {
    for (; ; ) {
      var e = this.future();
      if (e.text === " ") this.stack.pop();
      else break;
    }
  }
  consumeArg(e) {
    var t = [], n = e && e.length > 0;
    n || this.consumeSpaces();
    var a = this.future(), i, s = 0, l = 0;
    do {
      if (i = this.popToken(), t.push(i), i.text === "{") ++s;
      else if (i.text === "}") {
        if (--s, s === -1) throw new A("Extra }", i);
      } else if (i.text === "EOF") throw new A("Unexpected end of input in a macro argument, expected '" + (e && n ? e[l] : "}") + "'", i);
      if (e && n) if ((s === 0 || s === 1 && e[l] === "{") && i.text === e[l]) {
        if (++l, l === e.length) {
          t.splice(-l, l);
          break;
        }
      } else l = 0;
    } while (s !== 0 || n);
    return a.text === "{" && t[t.length - 1].text === "}" && (t.pop(), t.shift()), t.reverse(), { tokens: t, start: a, end: i };
  }
  consumeArgs(e, t) {
    if (t) {
      if (t.length !== e + 1) throw new A("The length of delimiters doesn't match the number of args!");
      for (var n = t[0], a = 0; a < n.length; a++) {
        var i = this.popToken();
        if (n[a] !== i.text) throw new A("Use of the macro doesn't match its definition", i);
      }
    }
    for (var s = [], l = 0; l < e; l++) s.push(this.consumeArg(t && t[l + 1]).tokens);
    return s;
  }
  countExpansion(e) {
    if (this.expansionCount += e, this.expansionCount > this.settings.maxExpand) throw new A("Too many expansions: infinite loop or need to increase maxExpand setting");
  }
  expandOnce(e) {
    var t = this.popToken(), n = t.text, a = t.noexpand ? null : this._getExpansion(n);
    if (a == null || e && a.unexpandable) {
      if (e && a == null && n[0] === "\\" && !this.isDefined(n)) throw new A("Undefined control sequence: " + n);
      return this.pushToken(t), false;
    }
    this.countExpansion(1);
    var i = a.tokens, s = this.consumeArgs(a.numArgs, a.delimiters);
    if (a.numArgs) {
      i = i.slice();
      for (var l = i.length - 1; l >= 0; --l) {
        var h = i[l];
        if (h.text === "#") {
          if (l === 0) throw new A("Incomplete placeholder at end of macro body", h);
          if (h = i[--l], h.text === "#") i.splice(l + 1, 1);
          else if (/^[1-9]$/.test(h.text)) i.splice(l, 2, ...s[+h.text - 1]);
          else throw new A("Not a valid argument number", h);
        }
      }
    }
    return this.pushTokens(i), i.length;
  }
  expandAfterFuture() {
    return this.expandOnce(), this.future();
  }
  expandNextToken() {
    for (; ; ) if (this.expandOnce() === false) {
      var e = this.stack.pop();
      return e.treatAsRelax && (e.text = "\\relax"), e;
    }
  }
  expandMacro(e) {
    return this.macros.has(e) ? this.expandTokens([new ke(e)]) : void 0;
  }
  expandTokens(e) {
    var t = [], n = this.stack.length;
    for (this.pushTokens(e); this.stack.length > n; ) if (this.expandOnce(true) === false) {
      var a = this.stack.pop();
      a.treatAsRelax && (a.noexpand = false, a.treatAsRelax = false), t.push(a);
    }
    return this.countExpansion(t.length), t;
  }
  expandMacroAsText(e) {
    var t = this.expandMacro(e);
    return t && t.map((n) => n.text).join("");
  }
  _getExpansion(e) {
    var t = this.macros.get(e);
    if (t == null) return t;
    if (e.length === 1) {
      var n = this.lexer.catcodes[e];
      if (n != null && n !== 13) return;
    }
    var a = typeof t == "function" ? t(this) : t;
    if (typeof a == "string") {
      var i = 0;
      if (a.includes("#")) for (var s = a.replace(/##/g, ""); s.includes("#" + (i + 1)); ) ++i;
      for (var l = new ma(a, this.settings), h = [], c = l.lex(); c.text !== "EOF"; ) h.push(c), c = l.lex();
      h.reverse();
      var m = { tokens: h, numArgs: i };
      return m;
    }
    return a;
  }
  isDefined(e) {
    return this.macros.has(e) || nt.hasOwnProperty(e) || Z.math.hasOwnProperty(e) || Z.text.hasOwnProperty(e) || Ci.hasOwnProperty(e);
  }
  isExpandable(e) {
    var t = this.macros.get(e);
    return t != null ? typeof t == "string" || typeof t == "function" || !t.unexpandable : nt.hasOwnProperty(e) && !nt[e].primitive;
  }
}
var ga = /^[₊₋₌₍₎₀₁₂₃₄₅₆₇₈₉ₐₑₕᵢⱼₖₗₘₙₒₚᵣₛₜᵤᵥₓᵦᵧᵨᵩᵪ]/, f0 = Object.freeze({ "\u208A": "+", "\u208B": "-", "\u208C": "=", "\u208D": "(", "\u208E": ")", "\u2080": "0", "\u2081": "1", "\u2082": "2", "\u2083": "3", "\u2084": "4", "\u2085": "5", "\u2086": "6", "\u2087": "7", "\u2088": "8", "\u2089": "9", "\u2090": "a", "\u2091": "e", "\u2095": "h", "\u1D62": "i", "\u2C7C": "j", "\u2096": "k", "\u2097": "l", "\u2098": "m", "\u2099": "n", "\u2092": "o", "\u209A": "p", "\u1D63": "r", "\u209B": "s", "\u209C": "t", "\u1D64": "u", "\u1D65": "v", "\u2093": "x", "\u1D66": "\u03B2", "\u1D67": "\u03B3", "\u1D68": "\u03C1", "\u1D69": "\u03D5", "\u1D6A": "\u03C7", "\u207A": "+", "\u207B": "-", "\u207C": "=", "\u207D": "(", "\u207E": ")", "\u2070": "0", "\xB9": "1", "\xB2": "2", "\xB3": "3", "\u2074": "4", "\u2075": "5", "\u2076": "6", "\u2077": "7", "\u2078": "8", "\u2079": "9", "\u1D2C": "A", "\u1D2E": "B", "\u1D30": "D", "\u1D31": "E", "\u1D33": "G", "\u1D34": "H", "\u1D35": "I", "\u1D36": "J", "\u1D37": "K", "\u1D38": "L", "\u1D39": "M", "\u1D3A": "N", "\u1D3C": "O", "\u1D3E": "P", "\u1D3F": "R", "\u1D40": "T", "\u1D41": "U", "\u2C7D": "V", "\u1D42": "W", "\u1D43": "a", "\u1D47": "b", "\u1D9C": "c", "\u1D48": "d", "\u1D49": "e", "\u1DA0": "f", "\u1D4D": "g", \u02B0: "h", "\u2071": "i", \u02B2: "j", "\u1D4F": "k", \u02E1: "l", "\u1D50": "m", \u207F: "n", "\u1D52": "o", "\u1D56": "p", \u02B3: "r", \u02E2: "s", "\u1D57": "t", "\u1D58": "u", "\u1D5B": "v", \u02B7: "w", \u02E3: "x", \u02B8: "y", "\u1DBB": "z", "\u1D5D": "\u03B2", "\u1D5E": "\u03B3", "\u1D5F": "\u03B4", "\u1D60": "\u03D5", "\u1D61": "\u03C7", "\u1DBF": "\u03B8" }), cr = { "\u0301": { text: "\\'", math: "\\acute" }, "\u0300": { text: "\\`", math: "\\grave" }, "\u0308": { text: '\\"', math: "\\ddot" }, "\u0303": { text: "\\~", math: "\\tilde" }, "\u0304": { text: "\\=", math: "\\bar" }, "\u0306": { text: "\\u", math: "\\breve" }, "\u030C": { text: "\\v", math: "\\check" }, "\u0302": { text: "\\^", math: "\\hat" }, "\u0307": { text: "\\.", math: "\\dot" }, "\u030A": { text: "\\r", math: "\\mathring" }, "\u030B": { text: "\\H" }, "\u0327": { text: "\\c" } }, va = { \u00E1: "a\u0301", \u00E0: "a\u0300", \u00E4: "a\u0308", \u01DF: "a\u0308\u0304", \u00E3: "a\u0303", \u0101: "a\u0304", \u0103: "a\u0306", \u1EAF: "a\u0306\u0301", \u1EB1: "a\u0306\u0300", \u1EB5: "a\u0306\u0303", \u01CE: "a\u030C", \u00E2: "a\u0302", \u1EA5: "a\u0302\u0301", \u1EA7: "a\u0302\u0300", \u1EAB: "a\u0302\u0303", \u0227: "a\u0307", \u01E1: "a\u0307\u0304", \u00E5: "a\u030A", \u01FB: "a\u030A\u0301", \u1E03: "b\u0307", \u0107: "c\u0301", \u1E09: "c\u0327\u0301", \u010D: "c\u030C", \u0109: "c\u0302", \u010B: "c\u0307", \u00E7: "c\u0327", \u010F: "d\u030C", \u1E0B: "d\u0307", \u1E11: "d\u0327", \u00E9: "e\u0301", \u00E8: "e\u0300", \u00EB: "e\u0308", \u1EBD: "e\u0303", \u0113: "e\u0304", \u1E17: "e\u0304\u0301", \u1E15: "e\u0304\u0300", \u0115: "e\u0306", \u1E1D: "e\u0327\u0306", \u011B: "e\u030C", \u00EA: "e\u0302", \u1EBF: "e\u0302\u0301", \u1EC1: "e\u0302\u0300", \u1EC5: "e\u0302\u0303", \u0117: "e\u0307", \u0229: "e\u0327", \u1E1F: "f\u0307", \u01F5: "g\u0301", \u1E21: "g\u0304", \u011F: "g\u0306", \u01E7: "g\u030C", \u011D: "g\u0302", \u0121: "g\u0307", \u0123: "g\u0327", \u1E27: "h\u0308", \u021F: "h\u030C", \u0125: "h\u0302", \u1E23: "h\u0307", \u1E29: "h\u0327", \u00ED: "i\u0301", \u00EC: "i\u0300", \u00EF: "i\u0308", \u1E2F: "i\u0308\u0301", \u0129: "i\u0303", \u012B: "i\u0304", \u012D: "i\u0306", \u01D0: "i\u030C", \u00EE: "i\u0302", \u01F0: "j\u030C", \u0135: "j\u0302", \u1E31: "k\u0301", \u01E9: "k\u030C", \u0137: "k\u0327", \u013A: "l\u0301", \u013E: "l\u030C", \u013C: "l\u0327", \u1E3F: "m\u0301", \u1E41: "m\u0307", \u0144: "n\u0301", \u01F9: "n\u0300", \u00F1: "n\u0303", \u0148: "n\u030C", \u1E45: "n\u0307", \u0146: "n\u0327", \u00F3: "o\u0301", \u00F2: "o\u0300", \u00F6: "o\u0308", \u022B: "o\u0308\u0304", \u00F5: "o\u0303", \u1E4D: "o\u0303\u0301", \u1E4F: "o\u0303\u0308", \u022D: "o\u0303\u0304", \u014D: "o\u0304", \u1E53: "o\u0304\u0301", \u1E51: "o\u0304\u0300", \u014F: "o\u0306", \u01D2: "o\u030C", \u00F4: "o\u0302", \u1ED1: "o\u0302\u0301", \u1ED3: "o\u0302\u0300", \u1ED7: "o\u0302\u0303", \u022F: "o\u0307", \u0231: "o\u0307\u0304", \u0151: "o\u030B", \u1E55: "p\u0301", \u1E57: "p\u0307", \u0155: "r\u0301", \u0159: "r\u030C", \u1E59: "r\u0307", \u0157: "r\u0327", \u015B: "s\u0301", \u1E65: "s\u0301\u0307", \u0161: "s\u030C", \u1E67: "s\u030C\u0307", \u015D: "s\u0302", \u1E61: "s\u0307", \u015F: "s\u0327", \u1E97: "t\u0308", \u0165: "t\u030C", \u1E6B: "t\u0307", \u0163: "t\u0327", \u00FA: "u\u0301", \u00F9: "u\u0300", \u00FC: "u\u0308", \u01D8: "u\u0308\u0301", \u01DC: "u\u0308\u0300", \u01D6: "u\u0308\u0304", \u01DA: "u\u0308\u030C", \u0169: "u\u0303", \u1E79: "u\u0303\u0301", \u016B: "u\u0304", \u1E7B: "u\u0304\u0308", \u016D: "u\u0306", \u01D4: "u\u030C", \u00FB: "u\u0302", \u016F: "u\u030A", \u0171: "u\u030B", \u1E7D: "v\u0303", \u1E83: "w\u0301", \u1E81: "w\u0300", \u1E85: "w\u0308", \u0175: "w\u0302", \u1E87: "w\u0307", \u1E98: "w\u030A", \u1E8D: "x\u0308", \u1E8B: "x\u0307", \u00FD: "y\u0301", \u1EF3: "y\u0300", \u00FF: "y\u0308", \u1EF9: "y\u0303", \u0233: "y\u0304", \u0177: "y\u0302", \u1E8F: "y\u0307", \u1E99: "y\u030A", \u017A: "z\u0301", \u017E: "z\u030C", \u1E91: "z\u0302", \u017C: "z\u0307", \u00C1: "A\u0301", \u00C0: "A\u0300", \u00C4: "A\u0308", \u01DE: "A\u0308\u0304", \u00C3: "A\u0303", \u0100: "A\u0304", \u0102: "A\u0306", \u1EAE: "A\u0306\u0301", \u1EB0: "A\u0306\u0300", \u1EB4: "A\u0306\u0303", \u01CD: "A\u030C", \u00C2: "A\u0302", \u1EA4: "A\u0302\u0301", \u1EA6: "A\u0302\u0300", \u1EAA: "A\u0302\u0303", \u0226: "A\u0307", \u01E0: "A\u0307\u0304", \u00C5: "A\u030A", \u01FA: "A\u030A\u0301", \u1E02: "B\u0307", \u0106: "C\u0301", \u1E08: "C\u0327\u0301", \u010C: "C\u030C", \u0108: "C\u0302", \u010A: "C\u0307", \u00C7: "C\u0327", \u010E: "D\u030C", \u1E0A: "D\u0307", \u1E10: "D\u0327", \u00C9: "E\u0301", \u00C8: "E\u0300", \u00CB: "E\u0308", \u1EBC: "E\u0303", \u0112: "E\u0304", \u1E16: "E\u0304\u0301", \u1E14: "E\u0304\u0300", \u0114: "E\u0306", \u1E1C: "E\u0327\u0306", \u011A: "E\u030C", \u00CA: "E\u0302", \u1EBE: "E\u0302\u0301", \u1EC0: "E\u0302\u0300", \u1EC4: "E\u0302\u0303", \u0116: "E\u0307", \u0228: "E\u0327", \u1E1E: "F\u0307", \u01F4: "G\u0301", \u1E20: "G\u0304", \u011E: "G\u0306", \u01E6: "G\u030C", \u011C: "G\u0302", \u0120: "G\u0307", \u0122: "G\u0327", \u1E26: "H\u0308", \u021E: "H\u030C", \u0124: "H\u0302", \u1E22: "H\u0307", \u1E28: "H\u0327", \u00CD: "I\u0301", \u00CC: "I\u0300", \u00CF: "I\u0308", \u1E2E: "I\u0308\u0301", \u0128: "I\u0303", \u012A: "I\u0304", \u012C: "I\u0306", \u01CF: "I\u030C", \u00CE: "I\u0302", \u0130: "I\u0307", \u0134: "J\u0302", \u1E30: "K\u0301", \u01E8: "K\u030C", \u0136: "K\u0327", \u0139: "L\u0301", \u013D: "L\u030C", \u013B: "L\u0327", \u1E3E: "M\u0301", \u1E40: "M\u0307", \u0143: "N\u0301", \u01F8: "N\u0300", \u00D1: "N\u0303", \u0147: "N\u030C", \u1E44: "N\u0307", \u0145: "N\u0327", \u00D3: "O\u0301", \u00D2: "O\u0300", \u00D6: "O\u0308", \u022A: "O\u0308\u0304", \u00D5: "O\u0303", \u1E4C: "O\u0303\u0301", \u1E4E: "O\u0303\u0308", \u022C: "O\u0303\u0304", \u014C: "O\u0304", \u1E52: "O\u0304\u0301", \u1E50: "O\u0304\u0300", \u014E: "O\u0306", \u01D1: "O\u030C", \u00D4: "O\u0302", \u1ED0: "O\u0302\u0301", \u1ED2: "O\u0302\u0300", \u1ED6: "O\u0302\u0303", \u022E: "O\u0307", \u0230: "O\u0307\u0304", \u0150: "O\u030B", \u1E54: "P\u0301", \u1E56: "P\u0307", \u0154: "R\u0301", \u0158: "R\u030C", \u1E58: "R\u0307", \u0156: "R\u0327", \u015A: "S\u0301", \u1E64: "S\u0301\u0307", \u0160: "S\u030C", \u1E66: "S\u030C\u0307", \u015C: "S\u0302", \u1E60: "S\u0307", \u015E: "S\u0327", \u0164: "T\u030C", \u1E6A: "T\u0307", \u0162: "T\u0327", \u00DA: "U\u0301", \u00D9: "U\u0300", \u00DC: "U\u0308", \u01D7: "U\u0308\u0301", \u01DB: "U\u0308\u0300", \u01D5: "U\u0308\u0304", \u01D9: "U\u0308\u030C", \u0168: "U\u0303", \u1E78: "U\u0303\u0301", \u016A: "U\u0304", \u1E7A: "U\u0304\u0308", \u016C: "U\u0306", \u01D3: "U\u030C", \u00DB: "U\u0302", \u016E: "U\u030A", \u0170: "U\u030B", \u1E7C: "V\u0303", \u1E82: "W\u0301", \u1E80: "W\u0300", \u1E84: "W\u0308", \u0174: "W\u0302", \u1E86: "W\u0307", \u1E8C: "X\u0308", \u1E8A: "X\u0307", \u00DD: "Y\u0301", \u1EF2: "Y\u0300", \u0178: "Y\u0308", \u1EF8: "Y\u0303", \u0232: "Y\u0304", \u0176: "Y\u0302", \u1E8E: "Y\u0307", \u0179: "Z\u0301", \u017D: "Z\u030C", \u1E90: "Z\u0302", \u017B: "Z\u0307", \u03AC: "\u03B1\u0301", \u1F70: "\u03B1\u0300", \u1FB1: "\u03B1\u0304", \u1FB0: "\u03B1\u0306", \u03AD: "\u03B5\u0301", \u1F72: "\u03B5\u0300", \u03AE: "\u03B7\u0301", \u1F74: "\u03B7\u0300", \u03AF: "\u03B9\u0301", \u1F76: "\u03B9\u0300", \u03CA: "\u03B9\u0308", \u0390: "\u03B9\u0308\u0301", \u1FD2: "\u03B9\u0308\u0300", \u1FD1: "\u03B9\u0304", \u1FD0: "\u03B9\u0306", \u03CC: "\u03BF\u0301", \u1F78: "\u03BF\u0300", \u03CD: "\u03C5\u0301", \u1F7A: "\u03C5\u0300", \u03CB: "\u03C5\u0308", \u03B0: "\u03C5\u0308\u0301", \u1FE2: "\u03C5\u0308\u0300", \u1FE1: "\u03C5\u0304", \u1FE0: "\u03C5\u0306", \u03CE: "\u03C9\u0301", \u1F7C: "\u03C9\u0300", \u038E: "\u03A5\u0301", \u1FEA: "\u03A5\u0300", \u03AB: "\u03A5\u0308", \u1FE9: "\u03A5\u0304", \u1FE8: "\u03A5\u0306", \u038F: "\u03A9\u0301", \u1FFA: "\u03A9\u0300" };
class V0 {
  constructor(e, t) {
    this.mode = void 0, this.gullet = void 0, this.settings = void 0, this.leftrightDepth = void 0, this.nextToken = void 0, this.mode = "math", this.gullet = new bo(e, t, this.mode), this.settings = t, this.leftrightDepth = 0, this.nextToken = null;
  }
  expect(e, t) {
    if (t === void 0 && (t = true), this.fetch().text !== e) throw new A("Expected '" + e + "', got '" + this.fetch().text + "'", this.fetch());
    t && this.consume();
  }
  consume() {
    this.nextToken = null;
  }
  fetch() {
    return this.nextToken == null && (this.nextToken = this.gullet.expandNextToken()), this.nextToken;
  }
  switchMode(e) {
    this.mode = e, this.gullet.switchMode(e);
  }
  parse() {
    this.settings.globalGroup || this.gullet.beginGroup(), this.settings.colorIsTextColor && this.gullet.macros.set("\\color", "\\textcolor");
    try {
      var e = this.parseExpression(false);
      return this.expect("EOF"), this.settings.globalGroup || this.gullet.endGroup(), e;
    } finally {
      this.gullet.endGroups();
    }
  }
  subparse(e) {
    var t = this.nextToken;
    this.consume(), this.gullet.pushToken(new ke("}")), this.gullet.pushTokens(e);
    var n = this.parseExpression(false);
    return this.expect("}"), this.nextToken = t, n;
  }
  parseExpression(e, t) {
    for (var n = []; ; ) {
      this.mode === "math" && this.consumeSpaces();
      var a = this.fetch();
      if (V0.endOfExpression.has(a.text) || t && a.text === t || e && nt[a.text] && nt[a.text].infix) break;
      var i = this.parseAtom(t);
      if (i) {
        if (i.type === "internal") continue;
      } else break;
      n.push(i);
    }
    return this.mode === "text" && this.formLigatures(n), this.handleInfixNodes(n);
  }
  handleInfixNodes(e) {
    for (var t = -1, n, a = 0; a < e.length; a++) {
      var i = e[a];
      if (i.type === "infix") {
        if (t !== -1) throw new A("only one infix operator per group", i.token);
        t = a, n = i.replaceWith;
      }
    }
    if (t !== -1 && n) {
      var s, l, h = e.slice(0, t), c = e.slice(t + 1);
      h.length === 1 && h[0].type === "ordgroup" ? s = h[0] : s = { type: "ordgroup", mode: this.mode, body: h }, c.length === 1 && c[0].type === "ordgroup" ? l = c[0] : l = { type: "ordgroup", mode: this.mode, body: c };
      var m;
      return n === "\\\\abovefrac" ? m = this.callFunction(n, [s, e[t], l], []) : m = this.callFunction(n, [s, l], []), [m];
    } else return e;
  }
  handleSupSubscript(e) {
    var t = this.fetch(), n = t.text;
    this.consume(), this.consumeSpaces();
    var a;
    do {
      var i;
      a = this.parseGroup(e);
    } while (((i = a) == null ? void 0 : i.type) === "internal");
    if (!a) throw new A("Expected group after '" + n + "'", t);
    return a;
  }
  formatUnsupportedCmd(e) {
    for (var t = [], n = 0; n < e.length; n++) t.push({ type: "textord", mode: "text", text: e[n] });
    var a = { type: "text", mode: this.mode, body: t }, i = { type: "color", mode: this.mode, color: this.settings.errorColor, body: [a] };
    return i;
  }
  parseAtom(e) {
    var t = this.parseGroup("atom", e);
    if ((t == null ? void 0 : t.type) === "internal" || this.mode === "text") return t;
    for (var n, a; ; ) {
      this.consumeSpaces();
      var i = this.fetch();
      if (i.text === "\\limits" || i.text === "\\nolimits") {
        if (t && t.type === "op") {
          var s = i.text === "\\limits";
          t.limits = s, t.alwaysHandleSupSub = true;
        } else if (t && t.type === "operatorname") t.alwaysHandleSupSub && (t.limits = i.text === "\\limits");
        else throw new A("Limit controls must follow a math operator", i);
        this.consume();
      } else if (i.text === "^") {
        if (n) throw new A("Double superscript", i);
        n = this.handleSupSubscript("superscript");
      } else if (i.text === "_") {
        if (a) throw new A("Double subscript", i);
        a = this.handleSupSubscript("subscript");
      } else if (i.text === "'") {
        if (n) throw new A("Double superscript", i);
        var l = { type: "textord", mode: this.mode, text: "\\prime" }, h = [l];
        for (this.consume(); this.fetch().text === "'"; ) h.push(l), this.consume();
        this.fetch().text === "^" && h.push(this.handleSupSubscript("superscript")), n = { type: "ordgroup", mode: this.mode, body: h };
      } else if (f0[i.text]) {
        var c = ga.test(i.text), m = [];
        for (m.push(new ke(f0[i.text])), this.consume(); ; ) {
          var p = this.fetch().text;
          if (!f0[p] || ga.test(p) !== c) break;
          m.unshift(new ke(f0[p])), this.consume();
        }
        var b = this.subparse(m);
        c ? a = { type: "ordgroup", mode: "math", body: b } : n = { type: "ordgroup", mode: "math", body: b };
      } else break;
    }
    return n || a ? { type: "supsub", mode: this.mode, base: t, sup: n, sub: a } : t;
  }
  parseFunction(e, t) {
    var n = this.fetch(), a = n.text, i = nt[a];
    if (!i) return null;
    if (this.consume(), t && t !== "atom" && !i.allowedInArgument) throw new A("Got function '" + a + "' with no arguments" + (t ? " as " + t : ""), n);
    if (this.mode === "text" && !i.allowedInText) throw new A("Can't use function '" + a + "' in text mode", n);
    if (this.mode === "math" && i.allowedInMath === false) throw new A("Can't use function '" + a + "' in math mode", n);
    var { args: s, optArgs: l } = this.parseArguments(a, i);
    return this.callFunction(a, s, l, n, e);
  }
  callFunction(e, t, n, a, i) {
    var s = { funcName: e, parser: this, token: a, breakOnTokenText: i }, l = nt[e];
    if (l && l.handler) return l.handler(s, t, n);
    throw new A("No function handler for " + e);
  }
  parseArguments(e, t) {
    var n = t.numArgs + t.numOptionalArgs;
    if (n === 0) return { args: [], optArgs: [] };
    for (var a = [], i = [], s = 0; s < n; s++) {
      var l = t.argTypes && t.argTypes[s], h = s < t.numOptionalArgs;
      ("primitive" in t && t.primitive && l == null || t.type === "sqrt" && s === 1 && i[0] == null) && (l = "primitive");
      var c = this.parseGroupOfType("argument to '" + e + "'", l, h);
      if (h) i.push(c);
      else if (c != null) a.push(c);
      else throw new A("Null argument, please report this as a bug");
    }
    return { args: a, optArgs: i };
  }
  parseGroupOfType(e, t, n) {
    switch (t) {
      case "color":
        return this.parseColorGroup(n);
      case "size":
        return this.parseSizeGroup(n);
      case "url":
        return this.parseUrlGroup(n);
      case "math":
      case "text":
        return this.parseArgumentGroup(n, t);
      case "hbox": {
        var a = this.parseArgumentGroup(n, "text");
        return a != null ? { type: "styling", mode: a.mode, body: [a], style: "text", resetFont: true } : null;
      }
      case "raw": {
        var i = this.parseStringGroup("raw", n);
        return i != null ? { type: "raw", mode: "text", string: i.text } : null;
      }
      case "primitive": {
        if (n) throw new A("A primitive argument cannot be optional");
        var s = this.parseGroup(e);
        if (s == null) throw new A("Expected group as " + e, this.fetch());
        return s;
      }
      case "original":
      case null:
      case void 0:
        return this.parseArgumentGroup(n);
      default:
        throw new A("Unknown group type as " + e, this.fetch());
    }
  }
  consumeSpaces() {
    for (; this.fetch().text === " "; ) this.consume();
  }
  parseStringGroup(e, t) {
    var n = this.gullet.scanArgument(t);
    if (n == null) return null;
    for (var a = "", i; (i = this.fetch()).text !== "EOF"; ) a += i.text, this.consume();
    return this.consume(), n.text = a, n;
  }
  parseRegexGroup(e, t) {
    for (var n = this.fetch(), a = n, i = "", s; (s = this.fetch()).text !== "EOF" && e.test(i + s.text); ) a = s, i += a.text, this.consume();
    if (i === "") throw new A("Invalid " + t + ": '" + n.text + "'", n);
    return n.range(a, i);
  }
  parseColorGroup(e) {
    var t = this.parseStringGroup("color", e);
    if (t == null) return null;
    var n = /^(#[a-f0-9]{3,4}|#[a-f0-9]{6}|#[a-f0-9]{8}|[a-f0-9]{6}|[a-z]+)$/i.exec(t.text);
    if (!n) throw new A("Invalid color: '" + t.text + "'", t);
    var a = n[0];
    return /^[0-9a-f]{6}$/i.test(a) && (a = "#" + a), { type: "color-token", mode: this.mode, color: a };
  }
  parseSizeGroup(e) {
    var t, n = false;
    if (this.gullet.consumeSpaces(), !e && this.gullet.future().text !== "{" ? t = this.parseRegexGroup(/^[-+]? *(?:$|\d+|\d+\.\d*|\.\d*) *[a-z]{0,2} *$/, "size") : t = this.parseStringGroup("size", e), !t) return null;
    !e && t.text.length === 0 && (t.text = "0pt", n = true);
    var a = /([-+]?) *(\d+(?:\.\d*)?|\.\d+) *([a-z]{2})/.exec(t.text);
    if (!a) throw new A("Invalid size: '" + t.text + "'", t);
    var i = { number: +(a[1] + a[2]), unit: a[3] };
    if (!La(i)) throw new A("Invalid unit: '" + i.unit + "'", t);
    return { type: "size", mode: this.mode, value: i, isBlank: n };
  }
  parseUrlGroup(e) {
    this.gullet.lexer.setCatcode("%", 13), this.gullet.lexer.setCatcode("~", 12);
    var t = this.parseStringGroup("url", e);
    if (this.gullet.lexer.setCatcode("%", 14), this.gullet.lexer.setCatcode("~", 13), t == null) return null;
    var n = t.text.replace(/\\([#$%&~_^{}])/g, "$1");
    return { type: "url", mode: this.mode, url: n };
  }
  parseArgumentGroup(e, t) {
    var n = this.gullet.scanArgument(e);
    if (n == null) return null;
    var a = this.mode;
    t && this.switchMode(t), this.gullet.beginGroup();
    var i = this.parseExpression(false, "EOF");
    this.expect("EOF"), this.gullet.endGroup();
    var s = { type: "ordgroup", mode: this.mode, loc: n.loc, body: i };
    return t && this.switchMode(a), s;
  }
  parseGroup(e, t) {
    var n = this.fetch(), a = n.text, i;
    if (a === "{" || a === "\\begingroup") {
      this.consume();
      var s = a === "{" ? "}" : "\\endgroup";
      this.gullet.beginGroup();
      var l = this.parseExpression(false, s), h = this.fetch();
      this.expect(s), this.gullet.endGroup(), i = { type: "ordgroup", mode: this.mode, loc: ye.range(n, h), body: l, semisimple: a === "\\begingroup" || void 0 };
    } else if (i = this.parseFunction(t, e) || this.parseSymbol(), i == null && a[0] === "\\" && !Ci.hasOwnProperty(a)) {
      if (this.settings.throwOnError) throw new A("Undefined control sequence: " + a, n);
      i = this.formatUnsupportedCmd(a), this.consume();
    }
    return i;
  }
  formLigatures(e) {
    for (var t = e.length - 1, n = 0; n < t; ++n) {
      var a = e[n];
      if (a.type === "textord") {
        var i = a.text, s = e[n + 1];
        if (!(!s || s.type !== "textord")) {
          if (i === "-" && s.text === "-") {
            var l = e[n + 2];
            n + 1 < t && l && l.type === "textord" && l.text === "-" ? (e.splice(n, 3, { type: "textord", mode: "text", loc: ye.range(a, l), text: "---" }), t -= 2) : (e.splice(n, 2, { type: "textord", mode: "text", loc: ye.range(a, s), text: "--" }), t -= 1);
          }
          (i === "'" || i === "`") && s.text === i && (e.splice(n, 2, { type: "textord", mode: "text", loc: ye.range(a, s), text: i + i }), t -= 1);
        }
      }
    }
  }
  parseSymbol() {
    var e = this.fetch(), t = e.text;
    if (/^\\verb[^a-zA-Z]/.test(t)) {
      this.consume();
      var n = t.slice(5), a = n.charAt(0) === "*";
      if (a && (n = n.slice(1)), n.length < 2 || n.charAt(0) !== n.slice(-1)) throw new A(`\\verb assertion failed --
                    please report what input caused this bug`);
      return n = n.slice(1, -1), { type: "verb", mode: "text", body: n, star: a };
    }
    va.hasOwnProperty(t[0]) && !Z[this.mode][t[0]] && (this.settings.strict && this.mode === "math" && this.settings.reportNonstrict("unicodeTextInMathMode", 'Accented Unicode text character "' + t[0] + '" used in math mode', e), t = va[t[0]] + t.slice(1));
    var i = mo.exec(t);
    i && (t = t.substring(0, i.index), t === "i" ? t = "\u0131" : t === "j" && (t = "\u0237"));
    var s;
    if (Z[this.mode][t]) {
      this.settings.strict && this.mode === "math" && wr.includes(t) && this.settings.reportNonstrict("unicodeTextInMathMode", 'Latin-1/Unicode text character "' + t[0] + '" used in math mode', e);
      var l = Z[this.mode][t].group, h = ye.range(e), c;
      Rl(l) ? c = { type: "atom", mode: this.mode, family: l, loc: h, text: t } : c = { type: l, mode: this.mode, loc: h, text: t }, s = c;
    } else if (t.charCodeAt(0) >= 128) this.settings.strict && (Fa(t.charCodeAt(0)) ? this.mode === "math" && this.settings.reportNonstrict("unicodeTextInMathMode", 'Unicode text character "' + t[0] + '" used in math mode', e) : this.settings.reportNonstrict("unknownSymbol", 'Unrecognized Unicode character "' + t[0] + '"' + (" (" + t.charCodeAt(0) + ")"), e)), s = { type: "textord", mode: "text", loc: ye.range(e), text: t };
    else return null;
    if (this.consume(), i) for (var m = 0; m < i[0].length; m++) {
      var p = i[0][m];
      if (!cr[p]) throw new A("Unknown accent ' " + p + "'", e);
      var b = cr[p][this.mode] || cr[p].text;
      if (!b) throw new A("Accent " + p + " unsupported in " + this.mode + " mode", e);
      s = { type: "accent", mode: this.mode, loc: ye.range(e), label: b, isStretchy: false, isShifty: true, base: s };
    }
    return s;
  }
}
V0.endOfExpression = /* @__PURE__ */ new Set(["}", "\\endgroup", "\\end", "\\right", "&"]);
var nn = function(e, t) {
  if (!(typeof e == "string" || e instanceof String)) throw new TypeError("KaTeX can only parse string typed expression");
  var n = new V0(e, t);
  delete n.gullet.macros.current["\\df@tag"];
  var a = n.parse();
  if (delete n.gullet.macros.current["\\current@color"], delete n.gullet.macros.current["\\color"], n.gullet.macros.get("\\df@tag")) {
    if (!t.displayMode) throw new A("\\tag works only in display equations");
    a = [{ type: "tag", mode: "text", body: a, tag: n.subparse([new ke("\\df@tag")]) }];
  }
  return a;
}, Ei = function(e, t, n) {
  t.textContent = "";
  var a = an(e, n).toNode();
  t.appendChild(a);
};
typeof document < "u" && document.compatMode !== "CSS1Compat" && (typeof console < "u" && console.warn("Warning: KaTeX doesn't work in quirks mode. Make sure your website has a suitable doctype."), Ei = function() {
  throw new A("KaTeX doesn't work in quirks mode.");
});
var yo = function(e, t) {
  var n = an(e, t).toMarkup();
  return n;
}, wo = function(e, t) {
  var n = new Gr(t);
  return nn(e, n);
}, Ni = function(e, t, n) {
  if (n.throwOnError || !(e instanceof A)) throw e;
  var a = T(["katex-error"], [new Se(t)]);
  return a.setAttribute("title", e.toString()), a.setAttribute("style", "color:" + n.errorColor), a;
}, an = function(e, t) {
  var n = new Gr(t);
  try {
    var a = nn(e, n);
    return Al(a, e, n);
  } catch (i) {
    return Ni(i, e, n);
  }
}, xo = function(e, t) {
  var n = new Gr(t);
  try {
    var a = nn(e, n);
    return Ml(a, e, n);
  } catch (i) {
    return Ni(i, e, n);
  }
}, ko = "0.16.47", So = { Span: Ot, Anchor: B0, SymbolNode: Se, SvgNode: Ue, PathNode: st, LineNode: yr }, sn = { version: ko, render: Ei, renderToString: yo, ParseError: A, SETTINGS_SCHEMA: gr, __parse: wo, __renderToDomTree: an, __renderToHTMLTree: xo, __setFontMetrics: sl, __defineSymbol: o, __defineFunction: N, __defineMacro: f, __domTree: So };
const Ii = ":A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", To = Ii + "\\-.\\d\\u00B7\\u0300-\\u036F\\u203F-\\u2040", Ao = "[" + Ii + "][" + To + "]*", Mo = new RegExp("^" + Ao + "$");
function Bi(r, e) {
  const t = [];
  let n = e.exec(r);
  for (; n; ) {
    const a = [];
    a.startIndex = e.lastIndex - n[0].length;
    const i = n.length;
    for (let s = 0; s < i; s++) a.push(n[s]);
    t.push(a), n = e.exec(r);
  }
  return t;
}
const Ri = function(r) {
  const e = Mo.exec(r);
  return !(e === null || typeof e > "u");
};
function zo(r) {
  return typeof r < "u";
}
const ln = ["hasOwnProperty", "toString", "valueOf", "__defineGetter__", "__defineSetter__", "__lookupGetter__", "__lookupSetter__"], qi = ["__proto__", "constructor", "prototype"], Co = { allowBooleanAttributes: false, unpairedTags: [] };
function Eo(r, e) {
  e = Object.assign({}, Co, e);
  const t = [];
  let n = false, a = false;
  r[0] === "\uFEFF" && (r = r.substr(1));
  for (let i = 0; i < r.length; i++) if (r[i] === "<" && r[i + 1] === "?") {
    if (i += 2, i = ya(r, i), i.err) return i;
  } else if (r[i] === "<") {
    let s = i;
    if (i++, r[i] === "!") {
      i = wa(r, i);
      continue;
    } else {
      let l = false;
      r[i] === "/" && (l = true, i++);
      let h = "";
      for (; i < r.length && r[i] !== ">" && r[i] !== " " && r[i] !== "	" && r[i] !== `
` && r[i] !== "\r"; i++) h += r[i];
      if (h = h.trim(), h[h.length - 1] === "/" && (h = h.substring(0, h.length - 1), i--), !Oo(h)) {
        let p;
        return h.trim().length === 0 ? p = "Invalid space after '<'." : p = "Tag '" + h + "' is an invalid name.", re("InvalidTag", p, de(r, i));
      }
      const c = Bo(r, i);
      if (c === false) return re("InvalidAttr", "Attributes for '" + h + "' have open quote.", de(r, i));
      let m = c.value;
      if (i = c.index, m[m.length - 1] === "/") {
        const p = i - m.length;
        m = m.substring(0, m.length - 1);
        const b = xa(m, e);
        if (b === true) n = true;
        else return re(b.err.code, b.err.msg, de(r, p + b.err.line));
      } else if (l) if (c.tagClosed) {
        if (m.trim().length > 0) return re("InvalidTag", "Closing tag '" + h + "' can't have attributes or invalid starting.", de(r, s));
        if (t.length === 0) return re("InvalidTag", "Closing tag '" + h + "' has not been opened.", de(r, s));
        {
          const p = t.pop();
          if (h !== p.tagName) {
            let b = de(r, p.tagStartPos);
            return re("InvalidTag", "Expected closing tag '" + p.tagName + "' (opened in line " + b.line + ", col " + b.col + ") instead of closing tag '" + h + "'.", de(r, s));
          }
          t.length == 0 && (a = true);
        }
      } else return re("InvalidTag", "Closing tag '" + h + "' doesn't have proper closing.", de(r, i));
      else {
        const p = xa(m, e);
        if (p !== true) return re(p.err.code, p.err.msg, de(r, i - m.length + p.err.line));
        if (a === true) return re("InvalidXml", "Multiple possible root nodes found.", de(r, i));
        e.unpairedTags.indexOf(h) !== -1 || t.push({ tagName: h, tagStartPos: s }), n = true;
      }
      for (i++; i < r.length; i++) if (r[i] === "<") if (r[i + 1] === "!") {
        i++, i = wa(r, i);
        continue;
      } else if (r[i + 1] === "?") {
        if (i = ya(r, ++i), i.err) return i;
      } else break;
      else if (r[i] === "&") {
        const p = Fo(r, i);
        if (p == -1) return re("InvalidChar", "char '&' is not expected.", de(r, i));
        i = p;
      } else if (a === true && !ba(r[i])) return re("InvalidXml", "Extra text at the end", de(r, i));
      r[i] === "<" && i--;
    }
  } else {
    if (ba(r[i])) continue;
    return re("InvalidChar", "char '" + r[i] + "' is not expected.", de(r, i));
  }
  if (n) {
    if (t.length == 1) return re("InvalidTag", "Unclosed tag '" + t[0].tagName + "'.", de(r, t[0].tagStartPos));
    if (t.length > 0) return re("InvalidXml", "Invalid '" + JSON.stringify(t.map((i) => i.tagName), null, 4).replace(/\r?\n/g, "") + "' found.", { line: 1, col: 1 });
  } else return re("InvalidXml", "Start tag expected.", 1);
  return true;
}
function ba(r) {
  return r === " " || r === "	" || r === `
` || r === "\r";
}
function ya(r, e) {
  const t = e;
  for (; e < r.length; e++) if (r[e] == "?" || r[e] == " ") {
    const n = r.substr(t, e - t);
    if (e > 5 && n === "xml") return re("InvalidXml", "XML declaration allowed only at the start of the document.", de(r, e));
    if (r[e] == "?" && r[e + 1] == ">") {
      e++;
      break;
    } else continue;
  }
  return e;
}
function wa(r, e) {
  if (r.length > e + 5 && r[e + 1] === "-" && r[e + 2] === "-") {
    for (e += 3; e < r.length; e++) if (r[e] === "-" && r[e + 1] === "-" && r[e + 2] === ">") {
      e += 2;
      break;
    }
  } else if (r.length > e + 8 && r[e + 1] === "D" && r[e + 2] === "O" && r[e + 3] === "C" && r[e + 4] === "T" && r[e + 5] === "Y" && r[e + 6] === "P" && r[e + 7] === "E") {
    let t = 1;
    for (e += 8; e < r.length; e++) if (r[e] === "<") t++;
    else if (r[e] === ">" && (t--, t === 0)) break;
  } else if (r.length > e + 9 && r[e + 1] === "[" && r[e + 2] === "C" && r[e + 3] === "D" && r[e + 4] === "A" && r[e + 5] === "T" && r[e + 6] === "A" && r[e + 7] === "[") {
    for (e += 8; e < r.length; e++) if (r[e] === "]" && r[e + 1] === "]" && r[e + 2] === ">") {
      e += 2;
      break;
    }
  }
  return e;
}
const No = '"', Io = "'";
function Bo(r, e) {
  let t = "", n = "", a = false;
  for (; e < r.length; e++) {
    if (r[e] === No || r[e] === Io) n === "" ? n = r[e] : n !== r[e] || (n = "");
    else if (r[e] === ">" && n === "") {
      a = true;
      break;
    }
    t += r[e];
  }
  return n !== "" ? false : { value: t, index: e, tagClosed: a };
}
const Ro = new RegExp(`(\\s*)([^\\s=]+)(\\s*=)?(\\s*(['"])(([\\s\\S])*?)\\5)?`, "g");
function xa(r, e) {
  const t = Bi(r, Ro), n = {};
  for (let a = 0; a < t.length; a++) {
    if (t[a][1].length === 0) return re("InvalidAttr", "Attribute '" + t[a][2] + "' has no space in starting.", _t(t[a]));
    if (t[a][3] !== void 0 && t[a][4] === void 0) return re("InvalidAttr", "Attribute '" + t[a][2] + "' is without value.", _t(t[a]));
    if (t[a][3] === void 0 && !e.allowBooleanAttributes) return re("InvalidAttr", "boolean attribute '" + t[a][2] + "' is not allowed.", _t(t[a]));
    const i = t[a][2];
    if (!Lo(i)) return re("InvalidAttr", "Attribute '" + i + "' is an invalid name.", _t(t[a]));
    if (!Object.prototype.hasOwnProperty.call(n, i)) n[i] = 1;
    else return re("InvalidAttr", "Attribute '" + i + "' is repeated.", _t(t[a]));
  }
  return true;
}
function qo(r, e) {
  let t = /\d/;
  for (r[e] === "x" && (e++, t = /[\da-fA-F]/); e < r.length; e++) {
    if (r[e] === ";") return e;
    if (!r[e].match(t)) break;
  }
  return -1;
}
function Fo(r, e) {
  if (e++, r[e] === ";") return -1;
  if (r[e] === "#") return e++, qo(r, e);
  let t = 0;
  for (; e < r.length; e++, t++) if (!(r[e].match(/\w/) && t < 20)) {
    if (r[e] === ";") break;
    return -1;
  }
  return e;
}
function re(r, e, t) {
  return { err: { code: r, msg: e, line: t.line || t, col: t.col } };
}
function Lo(r) {
  return Ri(r);
}
function Oo(r) {
  return Ri(r);
}
function de(r, e) {
  const t = r.substring(0, e).split(/\r?\n/);
  return { line: t.length, col: t[t.length - 1].length + 1 };
}
function _t(r) {
  return r.startIndex + r[1].length;
}
const Po = { cent: "\xA2", pound: "\xA3", curren: "\xA4", yen: "\xA5", euro: "\u20AC", dollar: "$", fnof: "\u0192", inr: "\u20B9", af: "\u060B", birr: "\u1265\u122D", peso: "\u20B1", rub: "\u20BD", won: "\u20A9", yuan: "\xA5", cedil: "\xB8" }, Fi = { amp: "&", apos: "'", gt: ">", lt: "<", quot: '"' }, $o = { nbsp: "\xA0", copy: "\xA9", reg: "\xAE", trade: "\u2122", mdash: "\u2014", ndash: "\u2013", hellip: "\u2026", laquo: "\xAB", raquo: "\xBB", lsquo: "\u2018", rsquo: "\u2019", ldquo: "\u201C", rdquo: "\u201D", bull: "\u2022", para: "\xB6", sect: "\xA7", deg: "\xB0", frac12: "\xBD", frac14: "\xBC", frac34: "\xBE" }, Do = new Set("!?\\\\/[]$%{}^&*()<>|+");
function ka(r) {
  if (r[0] === "#") throw new Error(`[EntityReplacer] Invalid character '#' in entity name: "${r}"`);
  for (const e of r) if (Do.has(e)) throw new Error(`[EntityReplacer] Invalid character '${e}' in entity name: "${r}"`);
  return r;
}
function dr(...r) {
  const e = /* @__PURE__ */ Object.create(null);
  for (const t of r) if (t) for (const n of Object.keys(t)) {
    const a = t[n];
    if (typeof a == "string") e[n] = a;
    else if (a && typeof a == "object" && a.val !== void 0) {
      const i = a.val;
      typeof i == "string" && (e[n] = i);
    }
  }
  return e;
}
const bt = "external", z0 = "base", Fr = "all";
function Ho(r) {
  return !r || r === bt ? /* @__PURE__ */ new Set([bt]) : r === Fr ? /* @__PURE__ */ new Set([Fr]) : r === z0 ? /* @__PURE__ */ new Set([z0]) : Array.isArray(r) ? new Set(r) : /* @__PURE__ */ new Set([bt]);
}
const we = Object.freeze({ allow: 0, leave: 1, remove: 2, throw: 3 }), _o = /* @__PURE__ */ new Set([9, 10, 13]);
function Go(r) {
  if (!r) return { xmlVersion: 1, onLevel: we.allow, nullLevel: we.remove };
  const e = r.xmlVersion === 1.1 ? 1.1 : 1, t = we[r.onNCR] ?? we.allow, n = we[r.nullNCR] ?? we.remove, a = Math.max(n, we.remove);
  return { xmlVersion: e, onLevel: t, nullLevel: a };
}
class Vo {
  constructor(e = {}) {
    this._limit = e.limit || {}, this._maxTotalExpansions = this._limit.maxTotalExpansions || 0, this._maxExpandedLength = this._limit.maxExpandedLength || 0, this._postCheck = typeof e.postCheck == "function" ? e.postCheck : (n) => n, this._limitTiers = Ho(this._limit.applyLimitsTo ?? bt), this._numericAllowed = e.numericAllowed ?? true, this._baseMap = dr(Fi, e.namedEntities || null), this._externalMap = /* @__PURE__ */ Object.create(null), this._inputMap = /* @__PURE__ */ Object.create(null), this._totalExpansions = 0, this._expandedLength = 0, this._removeSet = new Set(e.remove && Array.isArray(e.remove) ? e.remove : []), this._leaveSet = new Set(e.leave && Array.isArray(e.leave) ? e.leave : []);
    const t = Go(e.ncr);
    this._ncrXmlVersion = t.xmlVersion, this._ncrOnLevel = t.onLevel, this._ncrNullLevel = t.nullLevel;
  }
  setExternalEntities(e) {
    if (e) for (const t of Object.keys(e)) ka(t);
    this._externalMap = dr(e);
  }
  addExternalEntity(e, t) {
    ka(e), typeof t == "string" && t.indexOf("&") === -1 && (this._externalMap[e] = t);
  }
  addInputEntities(e) {
    this._totalExpansions = 0, this._expandedLength = 0, this._inputMap = dr(e);
  }
  reset() {
    return this._inputMap = /* @__PURE__ */ Object.create(null), this._totalExpansions = 0, this._expandedLength = 0, this;
  }
  setXmlVersion(e) {
    this._ncrXmlVersion = e === 1.1 ? 1.1 : 1;
  }
  decode(e) {
    if (typeof e != "string" || e.length === 0 || e.indexOf("&") === -1) return e;
    const t = e, n = [], a = e.length;
    let i = 0, s = 0;
    const l = this._maxTotalExpansions > 0, h = this._maxExpandedLength > 0, c = l || h;
    for (; s < a; ) {
      if (e.charCodeAt(s) !== 38) {
        s++;
        continue;
      }
      let p = s + 1;
      for (; p < a && e.charCodeAt(p) !== 59 && p - s <= 32; ) p++;
      if (p >= a || e.charCodeAt(p) !== 59) {
        s++;
        continue;
      }
      const b = e.slice(s + 1, p);
      if (b.length === 0) {
        s++;
        continue;
      }
      let w, x;
      if (this._removeSet.has(b)) w = "", x === void 0 && (x = bt);
      else if (this._leaveSet.has(b)) {
        s++;
        continue;
      } else if (b.charCodeAt(0) === 35) {
        const k = this._resolveNCR(b);
        if (k === void 0) {
          s++;
          continue;
        }
        w = k, x = z0;
      } else {
        const k = this._resolveName(b);
        w = k == null ? void 0 : k.value, x = k == null ? void 0 : k.tier;
      }
      if (w === void 0) {
        s++;
        continue;
      }
      if (s > i && n.push(e.slice(i, s)), n.push(w), i = p + 1, s = i, c && this._tierCounts(x)) {
        if (l && (this._totalExpansions++, this._totalExpansions > this._maxTotalExpansions)) throw new Error(`[EntityReplacer] Entity expansion count limit exceeded: ${this._totalExpansions} > ${this._maxTotalExpansions}`);
        if (h) {
          const k = w.length - (b.length + 2);
          if (k > 0 && (this._expandedLength += k, this._expandedLength > this._maxExpandedLength)) throw new Error(`[EntityReplacer] Expanded content length limit exceeded: ${this._expandedLength} > ${this._maxExpandedLength}`);
        }
      }
    }
    i < a && n.push(e.slice(i));
    const m = n.length === 0 ? e : n.join("");
    return this._postCheck(m, t);
  }
  _tierCounts(e) {
    return this._limitTiers.has(Fr) ? true : this._limitTiers.has(e);
  }
  _resolveName(e) {
    if (e in this._inputMap) return { value: this._inputMap[e], tier: bt };
    if (e in this._externalMap) return { value: this._externalMap[e], tier: bt };
    if (e in this._baseMap) return { value: this._baseMap[e], tier: z0 };
  }
  _classifyNCR(e) {
    return e === 0 ? this._ncrNullLevel : e >= 55296 && e <= 57343 || this._ncrXmlVersion === 1 && e >= 1 && e <= 31 && !_o.has(e) ? we.remove : -1;
  }
  _applyNCRAction(e, t, n) {
    switch (e) {
      case we.allow:
        return String.fromCodePoint(n);
      case we.remove:
        return "";
      case we.leave:
        return;
      case we.throw:
        throw new Error(`[EntityDecoder] Prohibited numeric character reference &${t}; (U+${n.toString(16).toUpperCase().padStart(4, "0")})`);
      default:
        return String.fromCodePoint(n);
    }
  }
  _resolveNCR(e) {
    const t = e.charCodeAt(1);
    let n;
    if (t === 120 || t === 88 ? n = parseInt(e.slice(2), 16) : n = parseInt(e.slice(1), 10), Number.isNaN(n) || n < 0 || n > 1114111) return;
    const a = this._classifyNCR(n);
    if (!this._numericAllowed && a < we.remove) return;
    const i = a === -1 ? this._ncrOnLevel : Math.max(this._ncrOnLevel, a);
    return this._applyNCRAction(i, e, n);
  }
}
const Li = (r) => ln.includes(r) ? "__" + r : r, Uo = { preserveOrder: false, attributeNamePrefix: "@_", attributesGroupName: false, textNodeName: "#text", ignoreAttributes: true, removeNSPrefix: false, allowBooleanAttributes: false, parseTagValue: true, parseAttributeValue: false, trimValues: true, cdataPropName: false, numberParseOptions: { hex: true, leadingZeros: true, eNotation: true }, tagValueProcessor: function(r, e) {
  return e;
}, attributeValueProcessor: function(r, e) {
  return e;
}, stopNodes: [], alwaysCreateTextNode: false, isArray: () => false, commentPropName: false, unpairedTags: [], processEntities: true, htmlEntities: false, entityDecoder: null, ignoreDeclaration: false, ignorePiTags: false, transformTagName: false, transformAttributeName: false, updateTag: function(r, e, t) {
  return r;
}, captureMetaData: false, maxNestedTags: 100, strictReservedNames: true, jPath: true, onDangerousProperty: Li };
function jo(r, e) {
  if (typeof r != "string") return;
  const t = r.toLowerCase();
  if (ln.some((n) => t === n.toLowerCase())) throw new Error(`[SECURITY] Invalid ${e}: "${r}" is a reserved JavaScript keyword that could cause prototype pollution`);
  if (qi.some((n) => t === n.toLowerCase())) throw new Error(`[SECURITY] Invalid ${e}: "${r}" is a reserved JavaScript keyword that could cause prototype pollution`);
}
function Oi(r, e) {
  return typeof r == "boolean" ? { enabled: r, maxEntitySize: 1e4, maxExpansionDepth: 1e4, maxTotalExpansions: 1 / 0, maxExpandedLength: 1e5, maxEntityCount: 1e3, allowedTags: null, tagFilter: null, appliesTo: "all" } : typeof r == "object" && r !== null ? { enabled: r.enabled !== false, maxEntitySize: Math.max(1, r.maxEntitySize ?? 1e4), maxExpansionDepth: Math.max(1, r.maxExpansionDepth ?? 1e4), maxTotalExpansions: Math.max(1, r.maxTotalExpansions ?? 1 / 0), maxExpandedLength: Math.max(1, r.maxExpandedLength ?? 1e5), maxEntityCount: Math.max(1, r.maxEntityCount ?? 1e3), allowedTags: r.allowedTags ?? null, tagFilter: r.tagFilter ?? null, appliesTo: r.appliesTo ?? "all" } : Oi(true);
}
const Wo = function(r) {
  const e = Object.assign({}, Uo, r), t = [{ value: e.attributeNamePrefix, name: "attributeNamePrefix" }, { value: e.attributesGroupName, name: "attributesGroupName" }, { value: e.textNodeName, name: "textNodeName" }, { value: e.cdataPropName, name: "cdataPropName" }, { value: e.commentPropName, name: "commentPropName" }];
  for (const { value: n, name: a } of t) n && jo(n, a);
  return e.onDangerousProperty === null && (e.onDangerousProperty = Li), e.processEntities = Oi(e.processEntities, e.htmlEntities), e.unpairedTagsSet = new Set(e.unpairedTags), e.stopNodes && Array.isArray(e.stopNodes) && (e.stopNodes = e.stopNodes.map((n) => typeof n == "string" && n.startsWith("*.") ? ".." + n.substring(2) : n)), e;
};
let C0;
typeof Symbol != "function" ? C0 = "@@xmlMetadata" : C0 = Symbol("XML Node Metadata");
class tt {
  constructor(e) {
    this.tagname = e, this.child = [], this[":@"] = /* @__PURE__ */ Object.create(null);
  }
  add(e, t) {
    e === "__proto__" && (e = "#__proto__"), this.child.push({ [e]: t });
  }
  addChild(e, t) {
    e.tagname === "__proto__" && (e.tagname = "#__proto__"), e[":@"] && Object.keys(e[":@"]).length > 0 ? this.child.push({ [e.tagname]: e.child, ":@": e[":@"] }) : this.child.push({ [e.tagname]: e.child }), t !== void 0 && (this.child[this.child.length - 1][C0] = { startIndex: t });
  }
  static getMetaDataSymbol() {
    return C0;
  }
}
const Pi = ":A-Za-z_\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u037D\u037F-\u0486\u0488-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD", Xo = Pi + "\\-\\.\\d\xB7\u0300-\u036F\u203F-\u2040", $i = ":A-Za-z_\xC0-\u02FF\u0370-\u037D\u037F-\u0486\u0488-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u{10000}-\u{EFFFF}", Yo = $i + "\\-\\.\\d\xB7\u0300-\u036F\u0487\u203F-\u2040", Di = (r, e, t = "") => {
  const n = r.replace(":", ""), a = e.replace(":", ""), i = `[${n}][${a}]*`;
  return { name: new RegExp(`^[${r}][${e}]*$`, t), ncName: new RegExp(`^${i}$`, t), qName: new RegExp(`^${i}(?::${i})?$`, t), nmToken: new RegExp(`^[${e}]+$`, t), nmTokens: new RegExp(`^[${e}]+(?:\\s+[${e}]+)*$`, t) };
}, Zo = Di(Pi, Xo), Ko = Di($i, Yo, "u"), Qo = (r = "1.0") => r === "1.1" ? Ko : Zo, Hi = (r, { xmlVersion: e = "1.0" } = {}) => Qo(e).qName.test(r);
class Jo {
  constructor(e, t) {
    this.suppressValidationErr = !e, this.options = e, this.xmlVersion = t || 1;
  }
  setXmlVersion(e = 1) {
    this.xmlVersion = e;
  }
  readDocType(e, t) {
    const n = /* @__PURE__ */ Object.create(null);
    let a = 0;
    if (e[t + 3] === "O" && e[t + 4] === "C" && e[t + 5] === "T" && e[t + 6] === "Y" && e[t + 7] === "P" && e[t + 8] === "E") {
      t = t + 9;
      let i = 1, s = false, l = false, h = "";
      for (; t < e.length; t++) if (e[t] === "<" && !l) {
        if (s && mt(e, "!ENTITY", t)) {
          t += 7;
          let c, m;
          if ([c, m, t] = this.readEntityExp(e, t + 1, this.suppressValidationErr), m.indexOf("&") === -1) {
            if (this.options.enabled !== false && this.options.maxEntityCount != null && a >= this.options.maxEntityCount) throw new Error(`Entity count (${a + 1}) exceeds maximum allowed (${this.options.maxEntityCount})`);
            n[c] = m, a++;
          }
        } else if (s && mt(e, "!ELEMENT", t)) {
          t += 8;
          const { index: c } = this.readElementExp(e, t + 1);
          t = c;
        } else if (s && mt(e, "!ATTLIST", t)) t += 8;
        else if (s && mt(e, "!NOTATION", t)) {
          t += 9;
          const { index: c } = this.readNotationExp(e, t + 1, this.suppressValidationErr);
          t = c;
        } else if (mt(e, "!--", t)) l = true;
        else throw new Error("Invalid DOCTYPE");
        i++, h = "";
      } else if (e[t] === ">") {
        if (l ? e[t - 1] === "-" && e[t - 2] === "-" && (l = false, i--) : i--, i === 0) break;
      } else e[t] === "[" ? s = true : h += e[t];
      if (i !== 0) throw new Error("Unclosed DOCTYPE");
    } else throw new Error("Invalid Tag instead of DOCTYPE");
    return { entities: n, i: t };
  }
  readEntityExp(e, t) {
    t = be(e, t);
    const n = t;
    for (; t < e.length && !/\s/.test(e[t]) && e[t] !== '"' && e[t] !== "'"; ) t++;
    let a = e.substring(n, t);
    if (Gt(a, { xmlVersion: this.xmlVersion }), t = be(e, t), !this.suppressValidationErr) {
      if (e.substring(t, t + 6).toUpperCase() === "SYSTEM") throw new Error("External entities are not supported");
      if (e[t] === "%") throw new Error("Parameter entities are not supported");
    }
    let i = "";
    if ([t, i] = this.readIdentifierVal(e, t, "entity"), this.options.enabled !== false && this.options.maxEntitySize != null && i.length > this.options.maxEntitySize) throw new Error(`Entity "${a}" size (${i.length}) exceeds maximum allowed size (${this.options.maxEntitySize})`);
    return t--, [a, i, t];
  }
  readNotationExp(e, t) {
    t = be(e, t);
    const n = t;
    for (; t < e.length && !/\s/.test(e[t]); ) t++;
    let a = e.substring(n, t);
    !this.suppressValidationErr && Gt(a, { xmlVersion: this.xmlVersion }), t = be(e, t);
    const i = e.substring(t, t + 6).toUpperCase();
    if (!this.suppressValidationErr && i !== "SYSTEM" && i !== "PUBLIC") throw new Error(`Expected SYSTEM or PUBLIC, found "${i}"`);
    t += i.length, t = be(e, t);
    let s = null, l = null;
    if (i === "PUBLIC") [t, s] = this.readIdentifierVal(e, t, "publicIdentifier"), t = be(e, t), (e[t] === '"' || e[t] === "'") && ([t, l] = this.readIdentifierVal(e, t, "systemIdentifier"));
    else if (i === "SYSTEM" && ([t, l] = this.readIdentifierVal(e, t, "systemIdentifier"), !this.suppressValidationErr && !l)) throw new Error("Missing mandatory system identifier for SYSTEM notation");
    return { notationName: a, publicIdentifier: s, systemIdentifier: l, index: --t };
  }
  readIdentifierVal(e, t, n) {
    let a = "";
    const i = e[t];
    if (i !== '"' && i !== "'") throw new Error(`Expected quoted string, found "${i}"`);
    t++;
    const s = t;
    for (; t < e.length && e[t] !== i; ) t++;
    if (a = e.substring(s, t), e[t] !== i) throw new Error(`Unterminated ${n} value`);
    return t++, [t, a];
  }
  readElementExp(e, t) {
    t = be(e, t);
    const n = t;
    for (; t < e.length && !/\s/.test(e[t]); ) t++;
    let a = e.substring(n, t);
    if (!this.suppressValidationErr && !Hi(a, { xmlVersion: this.xmlVersion })) throw new Error(`Invalid element name: "${a}"`);
    t = be(e, t);
    let i = "";
    if (e[t] === "E" && mt(e, "MPTY", t)) t += 4;
    else if (e[t] === "A" && mt(e, "NY", t)) t += 2;
    else if (e[t] === "(") {
      t++;
      const s = t;
      for (; t < e.length && e[t] !== ")"; ) t++;
      if (i = e.substring(s, t), e[t] !== ")") throw new Error("Unterminated content model");
    } else if (!this.suppressValidationErr) throw new Error(`Invalid Element Expression, found "${e[t]}"`);
    return { elementName: a, contentModel: i.trim(), index: t };
  }
  readAttlistExp(e, t) {
    t = be(e, t);
    let n = t;
    for (; t < e.length && !/\s/.test(e[t]); ) t++;
    let a = e.substring(n, t);
    for (Gt(a, { xmlVersion: this.xmlVersion }), t = be(e, t), n = t; t < e.length && !/\s/.test(e[t]); ) t++;
    let i = e.substring(n, t);
    if (!Gt(i, { xmlVersion: this.xmlVersion })) throw new Error(`Invalid attribute name: "${i}"`);
    t = be(e, t);
    let s = "";
    if (e.substring(t, t + 8).toUpperCase() === "NOTATION") {
      if (s = "NOTATION", t += 8, t = be(e, t), e[t] !== "(") throw new Error(`Expected '(', found "${e[t]}"`);
      t++;
      let h = [];
      for (; t < e.length && e[t] !== ")"; ) {
        const c = t;
        for (; t < e.length && e[t] !== "|" && e[t] !== ")"; ) t++;
        let m = e.substring(c, t);
        if (m = m.trim(), !Gt(m, { xmlVersion: this.xmlVersion })) throw new Error(`Invalid notation name: "${m}"`);
        h.push(m), e[t] === "|" && (t++, t = be(e, t));
      }
      if (e[t] !== ")") throw new Error("Unterminated list of notations");
      t++, s += " (" + h.join("|") + ")";
    } else {
      const h = t;
      for (; t < e.length && !/\s/.test(e[t]); ) t++;
      s += e.substring(h, t);
      const c = ["CDATA", "ID", "IDREF", "IDREFS", "ENTITY", "ENTITIES", "NMTOKEN", "NMTOKENS"];
      if (!this.suppressValidationErr && !c.includes(s.toUpperCase())) throw new Error(`Invalid attribute type: "${s}"`);
    }
    t = be(e, t);
    let l = "";
    return e.substring(t, t + 8).toUpperCase() === "#REQUIRED" ? (l = "#REQUIRED", t += 8) : e.substring(t, t + 7).toUpperCase() === "#IMPLIED" ? (l = "#IMPLIED", t += 7) : [t, l] = this.readIdentifierVal(e, t, "ATTLIST"), { elementName: a, attributeName: i, attributeType: s, defaultValue: l, index: t };
  }
}
const be = (r, e) => {
  for (; e < r.length && /\s/.test(r[e]); ) e++;
  return e;
};
function mt(r, e, t) {
  for (let n = 0; n < e.length; n++) if (e[n] !== r[t + n + 1]) return false;
  return true;
}
function Gt(r, e) {
  if (Hi(r, { xmlVersion: e })) return r;
  throw new Error(`Invalid entity name ${r}`);
}
const e1 = /^[-+]?0x[a-fA-F0-9]+$/, t1 = /^0b[01]+$/, r1 = /^0o[0-7]+$/, n1 = /^([\-\+])?(0*)([0-9]*(\.[0-9]*)?)$/, a1 = { hex: true, binary: false, octal: false, leadingZeros: true, decimalPoint: ".", eNotation: true, infinity: "original" };
function i1(r, e = {}) {
  if (e = Object.assign({}, a1, e), !r || typeof r != "string") return r;
  let t = r.trim();
  if (t.length === 0) return r;
  if (e.skipLike !== void 0 && e.skipLike.test(t)) return r;
  if (t === "0") return 0;
  if (e.hex && e1.test(t)) return mr(t, 16);
  if (e.binary && t1.test(t)) return mr(t, 2);
  if (e.octal && r1.test(t)) return mr(t, 8);
  if (isFinite(t)) {
    if (t.includes("e") || t.includes("E")) return l1(r, t, e);
    {
      const n = n1.exec(t);
      if (n) {
        const a = n[1] || "", i = n[2];
        let s = o1(n[3]);
        const l = a ? r[i.length + 1] === "." : r[i.length] === ".";
        if (!e.leadingZeros && (i.length > 1 || i.length === 1 && !l)) return r;
        {
          const h = Number(t), c = String(h);
          if (h === 0) return h;
          if (c.search(/[eE]/) !== -1) return e.eNotation ? h : r;
          if (t.indexOf(".") !== -1) return c === "0" || c === s || c === `${a}${s}` ? h : r;
          let m = i ? s : t;
          return i ? m === c || a + m === c ? h : r : m === c || m === a + c ? h : r;
        }
      } else return r;
    }
  } else return u1(r, Number(t), e);
}
const s1 = /^([-+])?(0*)(\d*(\.\d*)?[eE][-\+]?\d+)$/;
function l1(r, e, t) {
  if (!t.eNotation) return r;
  const n = e.match(s1);
  if (n) {
    let a = n[1] || "";
    const i = n[3].indexOf("e") === -1 ? "E" : "e", s = n[2], l = a ? r[s.length + 1] === i : r[s.length] === i;
    return s.length > 1 && l ? r : s.length === 1 && (n[3].startsWith(`.${i}`) || n[3][0] === i) ? Number(e) : s.length > 0 ? t.leadingZeros && !l ? (e = (n[1] || "") + n[3], Number(e)) : r : Number(e);
  } else return r;
}
function o1(r) {
  return r && r.indexOf(".") !== -1 && (r = r.replace(/0+$/, ""), r === "." ? r = "0" : r[0] === "." ? r = "0" + r : r[r.length - 1] === "." && (r = r.substring(0, r.length - 1))), r;
}
function mr(r, e) {
  const t = r.trim();
  if ((e === 2 || e === 8) && (r = t.substring(2)), parseInt) return parseInt(r, e);
  if (Number.parseInt) return Number.parseInt(r, e);
  if (window && window.parseInt) return window.parseInt(r, e);
  throw new Error("parseInt, Number.parseInt, window.parseInt are not supported");
}
function u1(r, e, t) {
  const n = e === 1 / 0;
  switch (t.infinity.toLowerCase()) {
    case "null":
      return null;
    case "infinity":
      return e;
    case "string":
      return n ? "Infinity" : "-Infinity";
    case "original":
    default:
      return r;
  }
}
function h1(r) {
  return typeof r == "function" ? r : Array.isArray(r) ? (e) => {
    for (const t of r) if (typeof t == "string" && e === t || t instanceof RegExp && t.test(e)) return true;
  } : () => false;
}
class Sa {
  constructor(e, t = {}, n) {
    this.pattern = e, this.separator = t.separator || ".", this.segments = this._parse(e), this.data = n, this._hasDeepWildcard = this.segments.some((a) => a.type === "deep-wildcard"), this._hasAttributeCondition = this.segments.some((a) => a.attrName !== void 0), this._hasPositionSelector = this.segments.some((a) => a.position !== void 0);
  }
  _parse(e) {
    const t = [];
    let n = 0, a = "";
    for (; n < e.length; ) e[n] === this.separator ? n + 1 < e.length && e[n + 1] === this.separator ? (a.trim() && (t.push(this._parseSegment(a.trim())), a = ""), t.push({ type: "deep-wildcard" }), n += 2) : (a.trim() && t.push(this._parseSegment(a.trim())), a = "", n++) : (a += e[n], n++);
    return a.trim() && t.push(this._parseSegment(a.trim())), t;
  }
  _parseSegment(e) {
    const t = { type: "tag" };
    let n = null, a = e;
    const i = e.match(/^([^\[]+)(\[[^\]]*\])(.*)$/);
    if (i && (a = i[1] + i[3], i[2])) {
      const m = i[2].slice(1, -1);
      m && (n = m);
    }
    let s, l = a;
    if (a.includes("::")) {
      const m = a.indexOf("::");
      if (s = a.substring(0, m).trim(), l = a.substring(m + 2).trim(), !s) throw new Error(`Invalid namespace in pattern: ${e}`);
    }
    let h, c = null;
    if (l.includes(":")) {
      const m = l.lastIndexOf(":"), p = l.substring(0, m).trim(), b = l.substring(m + 1).trim();
      ["first", "last", "odd", "even"].includes(b) || /^nth\(\d+\)$/.test(b) ? (h = p, c = b) : h = l;
    } else h = l;
    if (!h) throw new Error(`Invalid segment pattern: ${e}`);
    if (t.tag = h, s && (t.namespace = s), n) if (n.includes("=")) {
      const m = n.indexOf("=");
      t.attrName = n.substring(0, m).trim(), t.attrValue = n.substring(m + 1).trim();
    } else t.attrName = n.trim();
    if (c) {
      const m = c.match(/^nth\((\d+)\)$/);
      m ? (t.position = "nth", t.positionValue = parseInt(m[1], 10)) : t.position = c;
    }
    return t;
  }
  get length() {
    return this.segments.length;
  }
  hasDeepWildcard() {
    return this._hasDeepWildcard;
  }
  hasAttributeCondition() {
    return this._hasAttributeCondition;
  }
  hasPositionSelector() {
    return this._hasPositionSelector;
  }
  toString() {
    return this.pattern;
  }
}
class c1 {
  constructor() {
    this._byDepthAndTag = /* @__PURE__ */ new Map(), this._wildcardByDepth = /* @__PURE__ */ new Map(), this._deepWildcards = [], this._patterns = /* @__PURE__ */ new Set(), this._sealed = false;
  }
  add(e) {
    var _a3;
    if (this._sealed) throw new TypeError("ExpressionSet is sealed. Create a new ExpressionSet to add more expressions.");
    if (this._patterns.has(e.pattern)) return this;
    if (this._patterns.add(e.pattern), e.hasDeepWildcard()) return this._deepWildcards.push(e), this;
    const t = e.length, a = (_a3 = e.segments[e.segments.length - 1]) == null ? void 0 : _a3.tag;
    if (!a || a === "*") this._wildcardByDepth.has(t) || this._wildcardByDepth.set(t, []), this._wildcardByDepth.get(t).push(e);
    else {
      const i = `${t}:${a}`;
      this._byDepthAndTag.has(i) || this._byDepthAndTag.set(i, []), this._byDepthAndTag.get(i).push(e);
    }
    return this;
  }
  addAll(e) {
    for (const t of e) this.add(t);
    return this;
  }
  has(e) {
    return this._patterns.has(e.pattern);
  }
  get size() {
    return this._patterns.size;
  }
  seal() {
    return this._sealed = true, this;
  }
  get isSealed() {
    return this._sealed;
  }
  matchesAny(e) {
    return this.findMatch(e) !== null;
  }
  findMatch(e) {
    const t = e.getDepth(), n = e.getCurrentTag(), a = `${t}:${n}`, i = this._byDepthAndTag.get(a);
    if (i) {
      for (let l = 0; l < i.length; l++) if (e.matches(i[l])) return i[l];
    }
    const s = this._wildcardByDepth.get(t);
    if (s) {
      for (let l = 0; l < s.length; l++) if (e.matches(s[l])) return s[l];
    }
    for (let l = 0; l < this._deepWildcards.length; l++) if (e.matches(this._deepWildcards[l])) return this._deepWildcards[l];
    return null;
  }
}
class d1 {
  constructor(e) {
    this._matcher = e;
  }
  get separator() {
    return this._matcher.separator;
  }
  getCurrentTag() {
    const e = this._matcher.path;
    return e.length > 0 ? e[e.length - 1].tag : void 0;
  }
  getCurrentNamespace() {
    const e = this._matcher.path;
    return e.length > 0 ? e[e.length - 1].namespace : void 0;
  }
  getAttrValue(e) {
    var _a3;
    const t = this._matcher.path;
    if (t.length !== 0) return (_a3 = t[t.length - 1].values) == null ? void 0 : _a3[e];
  }
  hasAttr(e) {
    const t = this._matcher.path;
    if (t.length === 0) return false;
    const n = t[t.length - 1];
    return n.values !== void 0 && e in n.values;
  }
  getPosition() {
    const e = this._matcher.path;
    return e.length === 0 ? -1 : e[e.length - 1].position ?? 0;
  }
  getCounter() {
    const e = this._matcher.path;
    return e.length === 0 ? -1 : e[e.length - 1].counter ?? 0;
  }
  getIndex() {
    return this.getPosition();
  }
  getDepth() {
    return this._matcher.path.length;
  }
  toString(e, t = true) {
    return this._matcher.toString(e, t);
  }
  toArray() {
    return this._matcher.path.map((e) => e.tag);
  }
  matches(e) {
    return this._matcher.matches(e);
  }
  matchesAny(e) {
    return e.matchesAny(this._matcher);
  }
}
class m1 {
  constructor(e = {}) {
    this.separator = e.separator || ".", this.path = [], this.siblingStacks = [], this._pathStringCache = null, this._view = new d1(this);
  }
  push(e, t = null, n = null) {
    this._pathStringCache = null, this.path.length > 0 && (this.path[this.path.length - 1].values = void 0);
    const a = this.path.length;
    this.siblingStacks[a] || (this.siblingStacks[a] = /* @__PURE__ */ new Map());
    const i = this.siblingStacks[a], s = n ? `${n}:${e}` : e, l = i.get(s) || 0;
    let h = 0;
    for (const m of i.values()) h += m;
    i.set(s, l + 1);
    const c = { tag: e, position: h, counter: l };
    n != null && (c.namespace = n), t != null && (c.values = t), this.path.push(c);
  }
  pop() {
    if (this.path.length === 0) return;
    this._pathStringCache = null;
    const e = this.path.pop();
    return this.siblingStacks.length > this.path.length + 1 && (this.siblingStacks.length = this.path.length + 1), e;
  }
  updateCurrent(e) {
    if (this.path.length > 0) {
      const t = this.path[this.path.length - 1];
      e != null && (t.values = e);
    }
  }
  getCurrentTag() {
    return this.path.length > 0 ? this.path[this.path.length - 1].tag : void 0;
  }
  getCurrentNamespace() {
    return this.path.length > 0 ? this.path[this.path.length - 1].namespace : void 0;
  }
  getAttrValue(e) {
    var _a3;
    if (this.path.length !== 0) return (_a3 = this.path[this.path.length - 1].values) == null ? void 0 : _a3[e];
  }
  hasAttr(e) {
    if (this.path.length === 0) return false;
    const t = this.path[this.path.length - 1];
    return t.values !== void 0 && e in t.values;
  }
  getPosition() {
    return this.path.length === 0 ? -1 : this.path[this.path.length - 1].position ?? 0;
  }
  getCounter() {
    return this.path.length === 0 ? -1 : this.path[this.path.length - 1].counter ?? 0;
  }
  getIndex() {
    return this.getPosition();
  }
  getDepth() {
    return this.path.length;
  }
  toString(e, t = true) {
    const n = e || this.separator;
    if (n === this.separator && t === true) {
      if (this._pathStringCache !== null) return this._pathStringCache;
      const i = this.path.map((s) => s.namespace ? `${s.namespace}:${s.tag}` : s.tag).join(n);
      return this._pathStringCache = i, i;
    }
    return this.path.map((i) => t && i.namespace ? `${i.namespace}:${i.tag}` : i.tag).join(n);
  }
  toArray() {
    return this.path.map((e) => e.tag);
  }
  reset() {
    this._pathStringCache = null, this.path = [], this.siblingStacks = [];
  }
  matches(e) {
    const t = e.segments;
    return t.length === 0 ? false : e.hasDeepWildcard() ? this._matchWithDeepWildcard(t) : this._matchSimple(t);
  }
  _matchSimple(e) {
    if (this.path.length !== e.length) return false;
    for (let t = 0; t < e.length; t++) if (!this._matchSegment(e[t], this.path[t], t === this.path.length - 1)) return false;
    return true;
  }
  _matchWithDeepWildcard(e) {
    let t = this.path.length - 1, n = e.length - 1;
    for (; n >= 0 && t >= 0; ) {
      const a = e[n];
      if (a.type === "deep-wildcard") {
        if (n--, n < 0) return true;
        const i = e[n];
        let s = false;
        for (let l = t; l >= 0; l--) if (this._matchSegment(i, this.path[l], l === this.path.length - 1)) {
          t = l - 1, n--, s = true;
          break;
        }
        if (!s) return false;
      } else {
        if (!this._matchSegment(a, this.path[t], t === this.path.length - 1)) return false;
        t--, n--;
      }
    }
    return n < 0;
  }
  _matchSegment(e, t, n) {
    if (e.tag !== "*" && e.tag !== t.tag || e.namespace !== void 0 && e.namespace !== "*" && e.namespace !== t.namespace || e.attrName !== void 0 && (!n || !t.values || !(e.attrName in t.values) || e.attrValue !== void 0 && String(t.values[e.attrName]) !== String(e.attrValue))) return false;
    if (e.position !== void 0) {
      if (!n) return false;
      const a = t.counter ?? 0;
      if (e.position === "first" && a !== 0) return false;
      if (e.position === "odd" && a % 2 !== 1) return false;
      if (e.position === "even" && a % 2 !== 0) return false;
      if (e.position === "nth" && a !== e.positionValue) return false;
    }
    return true;
  }
  matchesAny(e) {
    return e.matchesAny(this);
  }
  snapshot() {
    return { path: this.path.map((e) => ({ ...e })), siblingStacks: this.siblingStacks.map((e) => new Map(e)) };
  }
  restore(e) {
    this._pathStringCache = null, this.path = e.path.map((t) => ({ ...t })), this.siblingStacks = e.siblingStacks.map((t) => new Map(t));
  }
  readOnly() {
    return this._view;
  }
}
function f1(r, e) {
  if (!r) return {};
  const t = e.attributesGroupName ? r[e.attributesGroupName] : r;
  if (!t) return {};
  const n = {};
  for (const a in t) if (a.startsWith(e.attributeNamePrefix)) {
    const i = a.substring(e.attributeNamePrefix.length);
    n[i] = t[a];
  } else n[a] = t[a];
  return n;
}
function p1(r) {
  if (!r || typeof r != "string") return;
  const e = r.indexOf(":");
  if (e !== -1 && e > 0) {
    const t = r.substring(0, e);
    if (t !== "xmlns") return t;
  }
}
class g1 {
  constructor(e, t) {
    this.options = e, this.currentNode = null, this.tagsNodeStack = [], this.parseXml = x1, this.parseTextData = v1, this.resolveNameSpace = b1, this.buildAttributesMap = w1, this.isItStopNode = A1, this.replaceEntitiesValue = S1, this.readStopNodeData = C1, this.saveTextToParentTag = T1, this.addChild = k1, this.ignoreAttributesFn = h1(this.options.ignoreAttributes), this.entityExpansionCount = 0, this.currentExpandedLength = 0;
    let n = { ...Fi };
    this.options.entityDecoder ? this.entityDecoder = this.options.entityDecoder : (typeof this.options.htmlEntities == "object" ? n = this.options.htmlEntities : this.options.htmlEntities === true && (n = { ...$o, ...Po }), this.entityDecoder = new Vo({ namedEntities: { ...n, ...t }, numericAllowed: this.options.htmlEntities, limit: { maxTotalExpansions: this.options.processEntities.maxTotalExpansions, maxExpandedLength: this.options.processEntities.maxExpandedLength, applyLimitsTo: this.options.processEntities.appliesTo } })), this.matcher = new m1(), this.readonlyMatcher = this.matcher.readOnly(), this.isCurrentNodeStopNode = false, this.stopNodeExpressionsSet = new c1();
    const a = this.options.stopNodes;
    if (a && a.length > 0) {
      for (let i = 0; i < a.length; i++) {
        const s = a[i];
        typeof s == "string" ? this.stopNodeExpressionsSet.add(new Sa(s)) : s instanceof Sa && this.stopNodeExpressionsSet.add(s);
      }
      this.stopNodeExpressionsSet.seal();
    }
  }
}
function v1(r, e, t, n, a, i, s) {
  const l = this.options;
  if (r !== void 0 && (l.trimValues && !n && (r = r.trim()), r.length > 0)) {
    s || (r = this.replaceEntitiesValue(r, e, t));
    const h = l.jPath ? t.toString() : t, c = l.tagValueProcessor(e, r, h, a, i);
    return c == null ? r : typeof c != typeof r || c !== r ? c : l.trimValues || r.trim() === r ? Or(r, l.parseTagValue, l.numberParseOptions) : r;
  }
}
function b1(r) {
  if (this.options.removeNSPrefix) {
    const e = r.split(":"), t = r.charAt(0) === "/" ? "/" : "";
    if (e[0] === "xmlns") return "";
    e.length === 2 && (r = t + e[1]);
  }
  return r;
}
const y1 = new RegExp(`([^\\s=]+)\\s*(=\\s*(['"])([\\s\\S]*?)\\3)?`, "gm");
function w1(r, e, t, n = false) {
  const a = this.options;
  if (n === true || a.ignoreAttributes !== true && typeof r == "string") {
    const i = Bi(r, y1), s = i.length, l = {}, h = new Array(s);
    let c = false;
    const m = {};
    for (let w = 0; w < s; w++) {
      const x = this.resolveNameSpace(i[w][1]), k = i[w][4];
      if (x.length && k !== void 0) {
        let C = k;
        a.trimValues && (C = C.trim()), C = this.replaceEntitiesValue(C, t, this.readonlyMatcher), h[w] = C, m[x] = C, c = true;
      }
    }
    c && typeof e == "object" && e.updateCurrent && e.updateCurrent(m);
    const p = a.jPath ? e.toString() : this.readonlyMatcher;
    let b = false;
    for (let w = 0; w < s; w++) {
      const x = this.resolveNameSpace(i[w][1]);
      if (this.ignoreAttributesFn(x, p)) continue;
      let k = a.attributeNamePrefix + x;
      if (x.length) if (a.transformAttributeName && (k = a.transformAttributeName(k)), k = _i(k, a), i[w][4] !== void 0) {
        const C = h[w], E = a.attributeValueProcessor(x, C, p);
        E == null ? l[k] = C : typeof E != typeof C || E !== C ? l[k] = E : l[k] = Or(C, a.parseAttributeValue, a.numberParseOptions), b = true;
      } else a.allowBooleanAttributes && (l[k] = true, b = true);
    }
    if (!b) return;
    if (a.attributesGroupName && !a.preserveOrder) {
      const w = {};
      return w[a.attributesGroupName] = l, w;
    }
    return l;
  }
}
const x1 = function(r) {
  r = r.replace(/\r\n?/g, `
`);
  const e = new tt("!xml");
  let t = e, n = "";
  this.matcher.reset(), this.entityDecoder.reset(), this.entityExpansionCount = 0, this.currentExpandedLength = 0;
  const a = this.options, i = new Jo(a.processEntities), s = r.length;
  for (let l = 0; l < s; l++) if (r[l] === "<") {
    const c = r.charCodeAt(l + 1);
    if (c === 47) {
      const m = Bt(r, ">", l, "Closing Tag is not closed.");
      let p = r.substring(l + 2, m).trim();
      if (a.removeNSPrefix) {
        const w = p.indexOf(":");
        w !== -1 && (p = p.substr(w + 1));
      }
      p = fr(a.transformTagName, p, "", a).tagName, t && (n = this.saveTextToParentTag(n, t, this.readonlyMatcher));
      const b = this.matcher.getCurrentTag();
      if (p && a.unpairedTagsSet.has(p)) throw new Error(`Unpaired tag can not be used as closing tag: </${p}>`);
      b && a.unpairedTagsSet.has(b) && (this.matcher.pop(), this.tagsNodeStack.pop()), this.matcher.pop(), this.isCurrentNodeStopNode = false, t = this.tagsNodeStack.pop(), n = "", l = m;
    } else if (c === 63) {
      let m = Lr(r, l, false, "?>");
      if (!m) throw new Error("Pi Tag is not closed.");
      n = this.saveTextToParentTag(n, t, this.readonlyMatcher);
      const p = this.buildAttributesMap(m.tagExp, this.matcher, m.tagName, true);
      if (p) {
        const b = p[this.options.attributeNamePrefix + "version"];
        this.entityDecoder.setXmlVersion(Number(b) || 1), i.setXmlVersion(Number(b) || 1);
      }
      if (!(a.ignoreDeclaration && m.tagName === "?xml" || a.ignorePiTags)) {
        const b = new tt(m.tagName);
        b.add(a.textNodeName, ""), m.tagName !== m.tagExp && m.attrExpPresent && a.ignoreAttributes !== true && (b[":@"] = p), this.addChild(t, b, this.readonlyMatcher, l);
      }
      l = m.closeIndex + 1;
    } else if (c === 33 && r.charCodeAt(l + 2) === 45 && r.charCodeAt(l + 3) === 45) {
      const m = Bt(r, "-->", l + 4, "Comment is not closed.");
      if (a.commentPropName) {
        const p = r.substring(l + 4, m - 2);
        n = this.saveTextToParentTag(n, t, this.readonlyMatcher), t.add(a.commentPropName, [{ [a.textNodeName]: p }]);
      }
      l = m;
    } else if (c === 33 && r.charCodeAt(l + 2) === 68) {
      const m = i.readDocType(r, l);
      this.entityDecoder.addInputEntities(m.entities), l = m.i;
    } else if (c === 33 && r.charCodeAt(l + 2) === 91) {
      const m = Bt(r, "]]>", l, "CDATA is not closed.") - 2, p = r.substring(l + 9, m);
      n = this.saveTextToParentTag(n, t, this.readonlyMatcher);
      let b = this.parseTextData(p, t.tagname, this.readonlyMatcher, true, false, true, true);
      b == null && (b = ""), a.cdataPropName ? t.add(a.cdataPropName, [{ [a.textNodeName]: p }]) : t.add(a.textNodeName, b), l = m + 2;
    } else {
      let m = Lr(r, l, a.removeNSPrefix);
      if (!m) {
        const R = r.substring(Math.max(0, l - 50), Math.min(s, l + 50));
        throw new Error(`readTagExp returned undefined at position ${l}. Context: "${R}"`);
      }
      let p = m.tagName;
      const b = m.rawTagName;
      let w = m.tagExp, x = m.attrExpPresent, k = m.closeIndex;
      if ({ tagName: p, tagExp: w } = fr(a.transformTagName, p, w, a), a.strictReservedNames && (p === a.commentPropName || p === a.cdataPropName || p === a.textNodeName || p === a.attributesGroupName)) throw new Error(`Invalid tag name: ${p}`);
      t && n && t.tagname !== "!xml" && (n = this.saveTextToParentTag(n, t, this.readonlyMatcher, false));
      const C = t;
      C && a.unpairedTagsSet.has(C.tagname) && (t = this.tagsNodeStack.pop(), this.matcher.pop());
      let E = false;
      w.length > 0 && w.lastIndexOf("/") === w.length - 1 && (E = true, p[p.length - 1] === "/" ? (p = p.substr(0, p.length - 1), w = p) : w = w.substr(0, w.length - 1), x = p !== w);
      let B = null, F;
      F = p1(b), p !== e.tagname && this.matcher.push(p, {}, F), p !== w && x && (B = this.buildAttributesMap(w, this.matcher, p), B && f1(B, a)), p !== e.tagname && (this.isCurrentNodeStopNode = this.isItStopNode());
      const P = l;
      if (this.isCurrentNodeStopNode) {
        let R = "";
        if (E) l = m.closeIndex;
        else if (a.unpairedTagsSet.has(p)) l = m.closeIndex;
        else {
          const H = this.readStopNodeData(r, b, k + 1);
          if (!H) throw new Error(`Unexpected end of ${b}`);
          l = H.i, R = H.tagContent;
        }
        const D = new tt(p);
        B && (D[":@"] = B), D.add(a.textNodeName, R), this.matcher.pop(), this.isCurrentNodeStopNode = false, this.addChild(t, D, this.readonlyMatcher, P);
      } else {
        if (E) {
          ({ tagName: p, tagExp: w } = fr(a.transformTagName, p, w, a));
          const R = new tt(p);
          B && (R[":@"] = B), this.addChild(t, R, this.readonlyMatcher, P), this.matcher.pop(), this.isCurrentNodeStopNode = false;
        } else if (a.unpairedTagsSet.has(p)) {
          const R = new tt(p);
          B && (R[":@"] = B), this.addChild(t, R, this.readonlyMatcher, P), this.matcher.pop(), this.isCurrentNodeStopNode = false, l = m.closeIndex;
          continue;
        } else {
          const R = new tt(p);
          if (this.tagsNodeStack.length > a.maxNestedTags) throw new Error("Maximum nested tags exceeded");
          this.tagsNodeStack.push(t), B && (R[":@"] = B), this.addChild(t, R, this.readonlyMatcher, P), t = R;
        }
        n = "", l = k;
      }
    }
  } else n += r[l];
  return e.child;
};
function k1(r, e, t, n) {
  this.options.captureMetaData || (n = void 0);
  const a = this.options.jPath ? t.toString() : t, i = this.options.updateTag(e.tagname, a, e[":@"]);
  i === false || (typeof i == "string" && (e.tagname = i), r.addChild(e, n));
}
function S1(r, e, t) {
  const n = this.options.processEntities;
  if (!n || !n.enabled) return r;
  if (n.allowedTags) {
    const a = this.options.jPath ? t.toString() : t;
    if (!(Array.isArray(n.allowedTags) ? n.allowedTags.includes(e) : n.allowedTags(e, a))) return r;
  }
  if (n.tagFilter) {
    const a = this.options.jPath ? t.toString() : t;
    if (!n.tagFilter(e, a)) return r;
  }
  return this.entityDecoder.decode(r);
}
function T1(r, e, t, n) {
  return r && (n === void 0 && (n = e.child.length === 0), r = this.parseTextData(r, e.tagname, t, false, e[":@"] ? Object.keys(e[":@"]).length !== 0 : false, n), r !== void 0 && r !== "" && e.add(this.options.textNodeName, r), r = ""), r;
}
function A1() {
  return this.stopNodeExpressionsSet.size === 0 ? false : this.matcher.matchesAny(this.stopNodeExpressionsSet);
}
function M1(r, e, t = ">") {
  let n = 0;
  const a = r.length, i = t.charCodeAt(0), s = t.length > 1 ? t.charCodeAt(1) : -1;
  let l = "", h = e;
  for (let c = e; c < a; c++) {
    const m = r.charCodeAt(c);
    if (n) m === n && (n = 0);
    else if (m === 34 || m === 39) n = m;
    else if (m === i) if (s !== -1) {
      if (r.charCodeAt(c + 1) === s) return l += r.substring(h, c), { data: l, index: c };
    } else return l += r.substring(h, c), { data: l, index: c };
    else m === 9 && !n && (l += r.substring(h, c) + " ", h = c + 1);
  }
}
function Bt(r, e, t, n) {
  const a = r.indexOf(e, t);
  if (a === -1) throw new Error(n);
  return a + e.length - 1;
}
function z1(r, e, t, n) {
  const a = r.indexOf(e, t);
  if (a === -1) throw new Error(n);
  return a;
}
function Lr(r, e, t, n = ">") {
  const a = M1(r, e + 1, n);
  if (!a) return;
  let i = a.data;
  const s = a.index, l = i.search(/\s/);
  let h = i, c = true;
  l !== -1 && (h = i.substring(0, l), i = i.substring(l + 1).trimStart());
  const m = h;
  if (t) {
    const p = h.indexOf(":");
    p !== -1 && (h = h.substr(p + 1), c = h !== a.data.substr(p + 1));
  }
  return { tagName: h, tagExp: i, closeIndex: s, attrExpPresent: c, rawTagName: m };
}
function C1(r, e, t) {
  const n = t;
  let a = 1;
  const i = r.length;
  for (; t < i; t++) if (r[t] === "<") {
    const s = r.charCodeAt(t + 1);
    if (s === 47) {
      const l = z1(r, ">", t, `${e} is not closed`);
      if (r.substring(t + 2, l).trim() === e && (a--, a === 0)) return { tagContent: r.substring(n, t), i: l };
      t = l;
    } else if (s === 63) t = Bt(r, "?>", t + 1, "StopNode is not closed.");
    else if (s === 33 && r.charCodeAt(t + 2) === 45 && r.charCodeAt(t + 3) === 45) t = Bt(r, "-->", t + 3, "StopNode is not closed.");
    else if (s === 33 && r.charCodeAt(t + 2) === 91) t = Bt(r, "]]>", t, "StopNode is not closed.") - 2;
    else {
      const l = Lr(r, t, false);
      l && ((l && l.tagName) === e && l.tagExp[l.tagExp.length - 1] !== "/" && a++, t = l.closeIndex);
    }
  }
}
function Or(r, e, t) {
  if (e && typeof r == "string") {
    const n = r.trim();
    return n === "true" ? true : n === "false" ? false : i1(r, t);
  } else return zo(r) ? r : "";
}
function fr(r, e, t, n) {
  if (r) {
    const a = r(e);
    t === e && (t = a), e = a;
  }
  return e = _i(e, n), { tagName: e, tagExp: t };
}
function _i(r, e) {
  if (qi.includes(r)) throw new Error(`[SECURITY] Invalid name: "${r}" is a reserved JavaScript keyword that could cause prototype pollution`);
  return ln.includes(r) ? e.onDangerousProperty(r) : r;
}
const pr = tt.getMetaDataSymbol();
function E1(r, e) {
  if (!r || typeof r != "object") return {};
  if (!e) return r;
  const t = {};
  for (const n in r) if (n.startsWith(e)) {
    const a = n.substring(e.length);
    t[a] = r[n];
  } else t[n] = r[n];
  return t;
}
function N1(r, e, t, n) {
  return Gi(r, e, t, n);
}
function Gi(r, e, t, n) {
  let a;
  const i = {};
  for (let s = 0; s < r.length; s++) {
    const l = r[s], h = I1(l);
    if (h !== void 0 && h !== e.textNodeName) {
      const c = E1(l[":@"] || {}, e.attributeNamePrefix);
      t.push(h, c);
    }
    if (h === e.textNodeName) a === void 0 ? a = l[h] : a += "" + l[h];
    else {
      if (h === void 0) continue;
      if (l[h]) {
        let c = Gi(l[h], e, t, n);
        const m = R1(c, e);
        if (Object.keys(c).length === 0 && e.alwaysCreateTextNode && (c[e.textNodeName] = ""), l[":@"] ? B1(c, l[":@"], n, e) : Object.keys(c).length === 1 && c[e.textNodeName] !== void 0 && !e.alwaysCreateTextNode ? c = c[e.textNodeName] : Object.keys(c).length === 0 && (e.alwaysCreateTextNode ? c[e.textNodeName] = "" : c = ""), l[pr] !== void 0 && typeof c == "object" && c !== null && (c[pr] = l[pr]), i[h] !== void 0 && Object.prototype.hasOwnProperty.call(i, h)) Array.isArray(i[h]) || (i[h] = [i[h]]), i[h].push(c);
        else {
          const p = e.jPath ? n.toString() : n;
          e.isArray(h, p, m) ? i[h] = [c] : i[h] = c;
        }
        h !== void 0 && h !== e.textNodeName && t.pop();
      }
    }
  }
  return typeof a == "string" ? a.length > 0 && (i[e.textNodeName] = a) : a !== void 0 && (i[e.textNodeName] = a), i;
}
function I1(r) {
  const e = Object.keys(r);
  for (let t = 0; t < e.length; t++) {
    const n = e[t];
    if (n !== ":@") return n;
  }
}
function B1(r, e, t, n) {
  if (e) {
    const a = Object.keys(e), i = a.length;
    for (let s = 0; s < i; s++) {
      const l = a[s], h = l.startsWith(n.attributeNamePrefix) ? l.substring(n.attributeNamePrefix.length) : l, c = n.jPath ? t.toString() + "." + h : t;
      n.isArray(l, c, true, true) ? r[l] = [e[l]] : r[l] = e[l];
    }
  }
}
function R1(r, e) {
  const { textNodeName: t } = e, n = Object.keys(r).length;
  return !!(n === 0 || n === 1 && (r[t] || typeof r[t] == "boolean" || r[t] === 0));
}
class q1 {
  constructor(e) {
    this.externalEntities = {}, this.options = Wo(e);
  }
  parse(e, t) {
    if (typeof e != "string" && e.toString) e = e.toString();
    else if (typeof e != "string") throw new Error("XML data is accepted in String or Bytes[] form.");
    if (t) {
      t === true && (t = {});
      const i = Eo(e, t);
      if (i !== true) throw Error(`${i.err.msg}:${i.err.line}:${i.err.col}`);
    }
    const n = new g1(this.options, this.externalEntities), a = n.parseXml(e);
    return this.options.preserveOrder || a === void 0 ? a : N1(a, this.options, n.matcher, n.readonlyMatcher);
  }
  addEntity(e, t) {
    if (t.indexOf("&") !== -1) throw new Error("Entity value can't have '&'");
    if (e.indexOf("&") !== -1 || e.indexOf(";") !== -1) throw new Error("An entity must be set without '&' and ';'. Eg. use '#xD' for '&#xD;'");
    if (t === "&") throw new Error("An entity with value '&' is not permitted");
    this.externalEntities[e] = t;
  }
  static getMetaDataSymbol() {
    return tt.getMetaDataSymbol();
  }
}
function on() {
  return { async: false, breaks: false, extensions: null, gfm: true, hooks: null, pedantic: false, renderer: null, silent: false, tokenizer: null, walkTokens: null };
}
var St = on();
function Vi(r) {
  St = r;
}
var Xt = { exec: () => null };
function j(r, e = "") {
  let t = typeof r == "string" ? r : r.source;
  const n = { replace: (a, i) => {
    let s = typeof i == "string" ? i : i.source;
    return s = s.replace(pe.caret, "$1"), t = t.replace(a, s), n;
  }, getRegex: () => new RegExp(t, e) };
  return n;
}
var pe = { codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm, outputLinkReplace: /\\([\[\]])/g, indentCodeCompensation: /^(\s+)(?:```)/, beginningSpace: /^\s+/, endingHash: /#$/, startingSpaceChar: /^ /, endingSpaceChar: / $/, nonSpaceChar: /[^ ]/, newLineCharGlobal: /\n/g, tabCharGlobal: /\t/g, multipleSpaceGlobal: /\s+/g, blankLine: /^[ \t]*$/, doubleBlankLine: /\n[ \t]*\n[ \t]*$/, blockquoteStart: /^ {0,3}>/, blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g, blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm, listReplaceTabs: /^\t+/, listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g, listIsTask: /^\[[ xX]\] /, listReplaceTask: /^\[[ xX]\] +/, anyLine: /\n.*\n/, hrefBrackets: /^<(.*)>$/, tableDelimiter: /[:|]/, tableAlignChars: /^\||\| *$/g, tableRowBlankLine: /\n[ \t]*$/, tableAlignRight: /^ *-+: *$/, tableAlignCenter: /^ *:-+: *$/, tableAlignLeft: /^ *:-+ *$/, startATag: /^<a /i, endATag: /^<\/a>/i, startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i, endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i, startAngleBracket: /^</, endAngleBracket: />$/, pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/, unicodeAlphaNumeric: /[\p{L}\p{N}]/u, escapeTest: /[&<>"']/, escapeReplace: /[&<>"']/g, escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/, escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g, unescapeTest: /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig, caret: /(^|[^\[])\^/g, percentDecode: /%25/g, findPipe: /\|/g, splitPipe: / \|/, slashPipe: /\\\|/g, carriageReturn: /\r\n|\r/g, spaceLine: /^ +$/gm, notSpaceStart: /^\S*/, endingNewline: /\n$/, listItemRegex: (r) => new RegExp(`^( {0,3}${r})((?:[	 ][^\\n]*)?(?:\\n|$))`), nextBulletRegex: (r) => new RegExp(`^ {0,${Math.min(3, r - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`), hrRegex: (r) => new RegExp(`^ {0,${Math.min(3, r - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`), fencesBeginRegex: (r) => new RegExp(`^ {0,${Math.min(3, r - 1)}}(?:\`\`\`|~~~)`), headingBeginRegex: (r) => new RegExp(`^ {0,${Math.min(3, r - 1)}}#`), htmlBeginRegex: (r) => new RegExp(`^ {0,${Math.min(3, r - 1)}}<(?:[a-z].*>|!--)`, "i") }, F1 = /^(?:[ \t]*(?:\n|$))+/, L1 = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, O1 = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, e0 = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, P1 = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, un = /(?:[*+-]|\d{1,9}[.)])/, Ui = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/, ji = j(Ui).replace(/bull/g, un).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex(), $1 = j(Ui).replace(/bull/g, un).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(), hn = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/, D1 = /^[^\n]+/, cn = /(?!\s*\])(?:\\.|[^\[\]\\])+/, H1 = j(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", cn).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), _1 = j(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, un).getRegex(), U0 = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", dn = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, G1 = j("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", dn).replace("tag", U0).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), Wi = j(hn).replace("hr", e0).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", U0).getRegex(), V1 = j(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", Wi).getRegex(), mn = { blockquote: V1, code: L1, def: H1, fences: O1, heading: P1, hr: e0, html: G1, lheading: ji, list: _1, newline: F1, paragraph: Wi, table: Xt, text: D1 }, Ta = j("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", e0).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", U0).getRegex(), U1 = { ...mn, lheading: $1, table: Ta, paragraph: j(hn).replace("hr", e0).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", Ta).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", U0).getRegex() }, j1 = { ...mn, html: j(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", dn).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(), def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/, heading: /^(#{1,6})(.*)(?:\n+|$)/, fences: Xt, lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/, paragraph: j(hn).replace("hr", e0).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", ji).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex() }, W1 = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, X1 = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, Xi = /^( {2,}|\\)\n(?!\s*$)/, Y1 = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, j0 = /[\p{P}\p{S}]/u, fn = /[\s\p{P}\p{S}]/u, Yi = /[^\s\p{P}\p{S}]/u, Z1 = j(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, fn).getRegex(), Zi = /(?!~)[\p{P}\p{S}]/u, K1 = /(?!~)[\s\p{P}\p{S}]/u, Q1 = /(?:[^\s\p{P}\p{S}]|~)/u, J1 = /\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g, Ki = /^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/, eu = j(Ki, "u").replace(/punct/g, j0).getRegex(), tu = j(Ki, "u").replace(/punct/g, Zi).getRegex(), Qi = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)", ru = j(Qi, "gu").replace(/notPunctSpace/g, Yi).replace(/punctSpace/g, fn).replace(/punct/g, j0).getRegex(), nu = j(Qi, "gu").replace(/notPunctSpace/g, Q1).replace(/punctSpace/g, K1).replace(/punct/g, Zi).getRegex(), au = j("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, Yi).replace(/punctSpace/g, fn).replace(/punct/g, j0).getRegex(), iu = j(/\\(punct)/, "gu").replace(/punct/g, j0).getRegex(), su = j(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), lu = j(dn).replace("(?:-->|$)", "-->").getRegex(), ou = j("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", lu).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), E0 = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/, uu = j(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label", E0).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), Ji = j(/^!?\[(label)\]\[(ref)\]/).replace("label", E0).replace("ref", cn).getRegex(), es = j(/^!?\[(ref)\](?:\[\])?/).replace("ref", cn).getRegex(), hu = j("reflink|nolink(?!\\()", "g").replace("reflink", Ji).replace("nolink", es).getRegex(), pn = { _backpedal: Xt, anyPunctuation: iu, autolink: su, blockSkip: J1, br: Xi, code: X1, del: Xt, emStrongLDelim: eu, emStrongRDelimAst: ru, emStrongRDelimUnd: au, escape: W1, link: uu, nolink: es, punctuation: Z1, reflink: Ji, reflinkSearch: hu, tag: ou, text: Y1, url: Xt }, cu = { ...pn, link: j(/^!?\[(label)\]\((.*?)\)/).replace("label", E0).getRegex(), reflink: j(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", E0).getRegex() }, Pr = { ...pn, emStrongRDelimAst: nu, emStrongLDelim: tu, url: j(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/, "i").replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(), _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/, del: /^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/, text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/ }, du = { ...Pr, br: j(Xi).replace("{2,}", "*").getRegex(), text: j(Pr.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex() }, p0 = { normal: mn, gfm: U1, pedantic: j1 }, Vt = { normal: pn, gfm: Pr, breaks: du, pedantic: cu }, mu = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }, Aa = (r) => mu[r];
function Ie(r, e) {
  if (e) {
    if (pe.escapeTest.test(r)) return r.replace(pe.escapeReplace, Aa);
  } else if (pe.escapeTestNoEncode.test(r)) return r.replace(pe.escapeReplaceNoEncode, Aa);
  return r;
}
function Ma(r) {
  try {
    r = encodeURI(r).replace(pe.percentDecode, "%");
  } catch {
    return null;
  }
  return r;
}
function za(r, e) {
  var _a3;
  const t = r.replace(pe.findPipe, (i, s, l) => {
    let h = false, c = s;
    for (; --c >= 0 && l[c] === "\\"; ) h = !h;
    return h ? "|" : " |";
  }), n = t.split(pe.splitPipe);
  let a = 0;
  if (n[0].trim() || n.shift(), n.length > 0 && !((_a3 = n.at(-1)) == null ? void 0 : _a3.trim()) && n.pop(), e) if (n.length > e) n.splice(e);
  else for (; n.length < e; ) n.push("");
  for (; a < n.length; a++) n[a] = n[a].trim().replace(pe.slashPipe, "|");
  return n;
}
function Ut(r, e, t) {
  const n = r.length;
  if (n === 0) return "";
  let a = 0;
  for (; a < n && r.charAt(n - a - 1) === e; ) a++;
  return r.slice(0, n - a);
}
function fu(r, e) {
  if (r.indexOf(e[1]) === -1) return -1;
  let t = 0;
  for (let n = 0; n < r.length; n++) if (r[n] === "\\") n++;
  else if (r[n] === e[0]) t++;
  else if (r[n] === e[1] && (t--, t < 0)) return n;
  return t > 0 ? -2 : -1;
}
function Ca(r, e, t, n, a) {
  const i = e.href, s = e.title || null, l = r[1].replace(a.other.outputLinkReplace, "$1");
  n.state.inLink = true;
  const h = { type: r[0].charAt(0) === "!" ? "image" : "link", raw: t, href: i, title: s, text: l, tokens: n.inlineTokens(l) };
  return n.state.inLink = false, h;
}
function pu(r, e, t) {
  const n = r.match(t.other.indentCodeCompensation);
  if (n === null) return e;
  const a = n[1];
  return e.split(`
`).map((i) => {
    const s = i.match(t.other.beginningSpace);
    if (s === null) return i;
    const [l] = s;
    return l.length >= a.length ? i.slice(a.length) : i;
  }).join(`
`);
}
var N0 = class {
  constructor(r) {
    __publicField(this, "options");
    __publicField(this, "rules");
    __publicField(this, "lexer");
    this.options = r || St;
  }
  space(r) {
    const e = this.rules.block.newline.exec(r);
    if (e && e[0].length > 0) return { type: "space", raw: e[0] };
  }
  code(r) {
    const e = this.rules.block.code.exec(r);
    if (e) {
      const t = e[0].replace(this.rules.other.codeRemoveIndent, "");
      return { type: "code", raw: e[0], codeBlockStyle: "indented", text: this.options.pedantic ? t : Ut(t, `
`) };
    }
  }
  fences(r) {
    const e = this.rules.block.fences.exec(r);
    if (e) {
      const t = e[0], n = pu(t, e[3] || "", this.rules);
      return { type: "code", raw: t, lang: e[2] ? e[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : e[2], text: n };
    }
  }
  heading(r) {
    const e = this.rules.block.heading.exec(r);
    if (e) {
      let t = e[2].trim();
      if (this.rules.other.endingHash.test(t)) {
        const n = Ut(t, "#");
        (this.options.pedantic || !n || this.rules.other.endingSpaceChar.test(n)) && (t = n.trim());
      }
      return { type: "heading", raw: e[0], depth: e[1].length, text: t, tokens: this.lexer.inline(t) };
    }
  }
  hr(r) {
    const e = this.rules.block.hr.exec(r);
    if (e) return { type: "hr", raw: Ut(e[0], `
`) };
  }
  blockquote(r) {
    const e = this.rules.block.blockquote.exec(r);
    if (e) {
      let t = Ut(e[0], `
`).split(`
`), n = "", a = "";
      const i = [];
      for (; t.length > 0; ) {
        let s = false;
        const l = [];
        let h;
        for (h = 0; h < t.length; h++) if (this.rules.other.blockquoteStart.test(t[h])) l.push(t[h]), s = true;
        else if (!s) l.push(t[h]);
        else break;
        t = t.slice(h);
        const c = l.join(`
`), m = c.replace(this.rules.other.blockquoteSetextReplace, `
    $1`).replace(this.rules.other.blockquoteSetextReplace2, "");
        n = n ? `${n}
${c}` : c, a = a ? `${a}
${m}` : m;
        const p = this.lexer.state.top;
        if (this.lexer.state.top = true, this.lexer.blockTokens(m, i, true), this.lexer.state.top = p, t.length === 0) break;
        const b = i.at(-1);
        if ((b == null ? void 0 : b.type) === "code") break;
        if ((b == null ? void 0 : b.type) === "blockquote") {
          const w = b, x = w.raw + `
` + t.join(`
`), k = this.blockquote(x);
          i[i.length - 1] = k, n = n.substring(0, n.length - w.raw.length) + k.raw, a = a.substring(0, a.length - w.text.length) + k.text;
          break;
        } else if ((b == null ? void 0 : b.type) === "list") {
          const w = b, x = w.raw + `
` + t.join(`
`), k = this.list(x);
          i[i.length - 1] = k, n = n.substring(0, n.length - b.raw.length) + k.raw, a = a.substring(0, a.length - w.raw.length) + k.raw, t = x.substring(i.at(-1).raw.length).split(`
`);
          continue;
        }
      }
      return { type: "blockquote", raw: n, tokens: i, text: a };
    }
  }
  list(r) {
    let e = this.rules.block.list.exec(r);
    if (e) {
      let t = e[1].trim();
      const n = t.length > 1, a = { type: "list", raw: "", ordered: n, start: n ? +t.slice(0, -1) : "", loose: false, items: [] };
      t = n ? `\\d{1,9}\\${t.slice(-1)}` : `\\${t}`, this.options.pedantic && (t = n ? t : "[*+-]");
      const i = this.rules.other.listItemRegex(t);
      let s = false;
      for (; r; ) {
        let h = false, c = "", m = "";
        if (!(e = i.exec(r)) || this.rules.block.hr.test(r)) break;
        c = e[0], r = r.substring(c.length);
        let p = e[2].split(`
`, 1)[0].replace(this.rules.other.listReplaceTabs, (E) => " ".repeat(3 * E.length)), b = r.split(`
`, 1)[0], w = !p.trim(), x = 0;
        if (this.options.pedantic ? (x = 2, m = p.trimStart()) : w ? x = e[1].length + 1 : (x = e[2].search(this.rules.other.nonSpaceChar), x = x > 4 ? 1 : x, m = p.slice(x), x += e[1].length), w && this.rules.other.blankLine.test(b) && (c += b + `
`, r = r.substring(b.length + 1), h = true), !h) {
          const E = this.rules.other.nextBulletRegex(x), B = this.rules.other.hrRegex(x), F = this.rules.other.fencesBeginRegex(x), P = this.rules.other.headingBeginRegex(x), R = this.rules.other.htmlBeginRegex(x);
          for (; r; ) {
            const D = r.split(`
`, 1)[0];
            let H;
            if (b = D, this.options.pedantic ? (b = b.replace(this.rules.other.listReplaceNesting, "  "), H = b) : H = b.replace(this.rules.other.tabCharGlobal, "    "), F.test(b) || P.test(b) || R.test(b) || E.test(b) || B.test(b)) break;
            if (H.search(this.rules.other.nonSpaceChar) >= x || !b.trim()) m += `
` + H.slice(x);
            else {
              if (w || p.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || F.test(p) || P.test(p) || B.test(p)) break;
              m += `
` + b;
            }
            !w && !b.trim() && (w = true), c += D + `
`, r = r.substring(D.length + 1), p = H.slice(x);
          }
        }
        a.loose || (s ? a.loose = true : this.rules.other.doubleBlankLine.test(c) && (s = true));
        let k = null, C;
        this.options.gfm && (k = this.rules.other.listIsTask.exec(m), k && (C = k[0] !== "[ ] ", m = m.replace(this.rules.other.listReplaceTask, ""))), a.items.push({ type: "list_item", raw: c, task: !!k, checked: C, loose: false, text: m, tokens: [] }), a.raw += c;
      }
      const l = a.items.at(-1);
      if (l) l.raw = l.raw.trimEnd(), l.text = l.text.trimEnd();
      else return;
      a.raw = a.raw.trimEnd();
      for (let h = 0; h < a.items.length; h++) if (this.lexer.state.top = false, a.items[h].tokens = this.lexer.blockTokens(a.items[h].text, []), !a.loose) {
        const c = a.items[h].tokens.filter((p) => p.type === "space"), m = c.length > 0 && c.some((p) => this.rules.other.anyLine.test(p.raw));
        a.loose = m;
      }
      if (a.loose) for (let h = 0; h < a.items.length; h++) a.items[h].loose = true;
      return a;
    }
  }
  html(r) {
    const e = this.rules.block.html.exec(r);
    if (e) return { type: "html", block: true, raw: e[0], pre: e[1] === "pre" || e[1] === "script" || e[1] === "style", text: e[0] };
  }
  def(r) {
    const e = this.rules.block.def.exec(r);
    if (e) {
      const t = e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal, " "), n = e[2] ? e[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", a = e[3] ? e[3].substring(1, e[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : e[3];
      return { type: "def", tag: t, raw: e[0], href: n, title: a };
    }
  }
  table(r) {
    var _a3;
    const e = this.rules.block.table.exec(r);
    if (!e || !this.rules.other.tableDelimiter.test(e[2])) return;
    const t = za(e[1]), n = e[2].replace(this.rules.other.tableAlignChars, "").split("|"), a = ((_a3 = e[3]) == null ? void 0 : _a3.trim()) ? e[3].replace(this.rules.other.tableRowBlankLine, "").split(`
`) : [], i = { type: "table", raw: e[0], header: [], align: [], rows: [] };
    if (t.length === n.length) {
      for (const s of n) this.rules.other.tableAlignRight.test(s) ? i.align.push("right") : this.rules.other.tableAlignCenter.test(s) ? i.align.push("center") : this.rules.other.tableAlignLeft.test(s) ? i.align.push("left") : i.align.push(null);
      for (let s = 0; s < t.length; s++) i.header.push({ text: t[s], tokens: this.lexer.inline(t[s]), header: true, align: i.align[s] });
      for (const s of a) i.rows.push(za(s, i.header.length).map((l, h) => ({ text: l, tokens: this.lexer.inline(l), header: false, align: i.align[h] })));
      return i;
    }
  }
  lheading(r) {
    const e = this.rules.block.lheading.exec(r);
    if (e) return { type: "heading", raw: e[0], depth: e[2].charAt(0) === "=" ? 1 : 2, text: e[1], tokens: this.lexer.inline(e[1]) };
  }
  paragraph(r) {
    const e = this.rules.block.paragraph.exec(r);
    if (e) {
      const t = e[1].charAt(e[1].length - 1) === `
` ? e[1].slice(0, -1) : e[1];
      return { type: "paragraph", raw: e[0], text: t, tokens: this.lexer.inline(t) };
    }
  }
  text(r) {
    const e = this.rules.block.text.exec(r);
    if (e) return { type: "text", raw: e[0], text: e[0], tokens: this.lexer.inline(e[0]) };
  }
  escape(r) {
    const e = this.rules.inline.escape.exec(r);
    if (e) return { type: "escape", raw: e[0], text: e[1] };
  }
  tag(r) {
    const e = this.rules.inline.tag.exec(r);
    if (e) return !this.lexer.state.inLink && this.rules.other.startATag.test(e[0]) ? this.lexer.state.inLink = true : this.lexer.state.inLink && this.rules.other.endATag.test(e[0]) && (this.lexer.state.inLink = false), !this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(e[0]) ? this.lexer.state.inRawBlock = true : this.lexer.state.inRawBlock && this.rules.other.endPreScriptTag.test(e[0]) && (this.lexer.state.inRawBlock = false), { type: "html", raw: e[0], inLink: this.lexer.state.inLink, inRawBlock: this.lexer.state.inRawBlock, block: false, text: e[0] };
  }
  link(r) {
    const e = this.rules.inline.link.exec(r);
    if (e) {
      const t = e[2].trim();
      if (!this.options.pedantic && this.rules.other.startAngleBracket.test(t)) {
        if (!this.rules.other.endAngleBracket.test(t)) return;
        const i = Ut(t.slice(0, -1), "\\");
        if ((t.length - i.length) % 2 === 0) return;
      } else {
        const i = fu(e[2], "()");
        if (i === -2) return;
        if (i > -1) {
          const l = (e[0].indexOf("!") === 0 ? 5 : 4) + e[1].length + i;
          e[2] = e[2].substring(0, i), e[0] = e[0].substring(0, l).trim(), e[3] = "";
        }
      }
      let n = e[2], a = "";
      if (this.options.pedantic) {
        const i = this.rules.other.pedanticHrefTitle.exec(n);
        i && (n = i[1], a = i[3]);
      } else a = e[3] ? e[3].slice(1, -1) : "";
      return n = n.trim(), this.rules.other.startAngleBracket.test(n) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(t) ? n = n.slice(1) : n = n.slice(1, -1)), Ca(e, { href: n && n.replace(this.rules.inline.anyPunctuation, "$1"), title: a && a.replace(this.rules.inline.anyPunctuation, "$1") }, e[0], this.lexer, this.rules);
    }
  }
  reflink(r, e) {
    let t;
    if ((t = this.rules.inline.reflink.exec(r)) || (t = this.rules.inline.nolink.exec(r))) {
      const n = (t[2] || t[1]).replace(this.rules.other.multipleSpaceGlobal, " "), a = e[n.toLowerCase()];
      if (!a) {
        const i = t[0].charAt(0);
        return { type: "text", raw: i, text: i };
      }
      return Ca(t, a, t[0], this.lexer, this.rules);
    }
  }
  emStrong(r, e, t = "") {
    let n = this.rules.inline.emStrongLDelim.exec(r);
    if (!n || n[3] && t.match(this.rules.other.unicodeAlphaNumeric)) return;
    if (!(n[1] || n[2] || "") || !t || this.rules.inline.punctuation.exec(t)) {
      const i = [...n[0]].length - 1;
      let s, l, h = i, c = 0;
      const m = n[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
      for (m.lastIndex = 0, e = e.slice(-1 * r.length + i); (n = m.exec(e)) != null; ) {
        if (s = n[1] || n[2] || n[3] || n[4] || n[5] || n[6], !s) continue;
        if (l = [...s].length, n[3] || n[4]) {
          h += l;
          continue;
        } else if ((n[5] || n[6]) && i % 3 && !((i + l) % 3)) {
          c += l;
          continue;
        }
        if (h -= l, h > 0) continue;
        l = Math.min(l, l + h + c);
        const p = [...n[0]][0].length, b = r.slice(0, i + n.index + p + l);
        if (Math.min(i, l) % 2) {
          const x = b.slice(1, -1);
          return { type: "em", raw: b, text: x, tokens: this.lexer.inlineTokens(x) };
        }
        const w = b.slice(2, -2);
        return { type: "strong", raw: b, text: w, tokens: this.lexer.inlineTokens(w) };
      }
    }
  }
  codespan(r) {
    const e = this.rules.inline.code.exec(r);
    if (e) {
      let t = e[2].replace(this.rules.other.newLineCharGlobal, " ");
      const n = this.rules.other.nonSpaceChar.test(t), a = this.rules.other.startingSpaceChar.test(t) && this.rules.other.endingSpaceChar.test(t);
      return n && a && (t = t.substring(1, t.length - 1)), { type: "codespan", raw: e[0], text: t };
    }
  }
  br(r) {
    const e = this.rules.inline.br.exec(r);
    if (e) return { type: "br", raw: e[0] };
  }
  del(r) {
    const e = this.rules.inline.del.exec(r);
    if (e) return { type: "del", raw: e[0], text: e[2], tokens: this.lexer.inlineTokens(e[2]) };
  }
  autolink(r) {
    const e = this.rules.inline.autolink.exec(r);
    if (e) {
      let t, n;
      return e[2] === "@" ? (t = e[1], n = "mailto:" + t) : (t = e[1], n = t), { type: "link", raw: e[0], text: t, href: n, tokens: [{ type: "text", raw: t, text: t }] };
    }
  }
  url(r) {
    var _a3;
    let e;
    if (e = this.rules.inline.url.exec(r)) {
      let t, n;
      if (e[2] === "@") t = e[0], n = "mailto:" + t;
      else {
        let a;
        do
          a = e[0], e[0] = ((_a3 = this.rules.inline._backpedal.exec(e[0])) == null ? void 0 : _a3[0]) ?? "";
        while (a !== e[0]);
        t = e[0], e[1] === "www." ? n = "http://" + e[0] : n = e[0];
      }
      return { type: "link", raw: e[0], text: t, href: n, tokens: [{ type: "text", raw: t, text: t }] };
    }
  }
  inlineText(r) {
    const e = this.rules.inline.text.exec(r);
    if (e) {
      const t = this.lexer.state.inRawBlock;
      return { type: "text", raw: e[0], text: e[0], escaped: t };
    }
  }
}, qe = class $r {
  constructor(e) {
    __publicField(this, "tokens");
    __publicField(this, "options");
    __publicField(this, "state");
    __publicField(this, "tokenizer");
    __publicField(this, "inlineQueue");
    this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = e || St, this.options.tokenizer = this.options.tokenizer || new N0(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = { inLink: false, inRawBlock: false, top: true };
    const t = { other: pe, block: p0.normal, inline: Vt.normal };
    this.options.pedantic ? (t.block = p0.pedantic, t.inline = Vt.pedantic) : this.options.gfm && (t.block = p0.gfm, this.options.breaks ? t.inline = Vt.breaks : t.inline = Vt.gfm), this.tokenizer.rules = t;
  }
  static get rules() {
    return { block: p0, inline: Vt };
  }
  static lex(e, t) {
    return new $r(t).lex(e);
  }
  static lexInline(e, t) {
    return new $r(t).inlineTokens(e);
  }
  lex(e) {
    e = e.replace(pe.carriageReturn, `
`), this.blockTokens(e, this.tokens);
    for (let t = 0; t < this.inlineQueue.length; t++) {
      const n = this.inlineQueue[t];
      this.inlineTokens(n.src, n.tokens);
    }
    return this.inlineQueue = [], this.tokens;
  }
  blockTokens(e, t = [], n = false) {
    var _a3, _b2, _c;
    for (this.options.pedantic && (e = e.replace(pe.tabCharGlobal, "    ").replace(pe.spaceLine, "")); e; ) {
      let a;
      if ((_b2 = (_a3 = this.options.extensions) == null ? void 0 : _a3.block) == null ? void 0 : _b2.some((s) => (a = s.call({ lexer: this }, e, t)) ? (e = e.substring(a.raw.length), t.push(a), true) : false)) continue;
      if (a = this.tokenizer.space(e)) {
        e = e.substring(a.raw.length);
        const s = t.at(-1);
        a.raw.length === 1 && s !== void 0 ? s.raw += `
` : t.push(a);
        continue;
      }
      if (a = this.tokenizer.code(e)) {
        e = e.substring(a.raw.length);
        const s = t.at(-1);
        (s == null ? void 0 : s.type) === "paragraph" || (s == null ? void 0 : s.type) === "text" ? (s.raw += `
` + a.raw, s.text += `
` + a.text, this.inlineQueue.at(-1).src = s.text) : t.push(a);
        continue;
      }
      if (a = this.tokenizer.fences(e)) {
        e = e.substring(a.raw.length), t.push(a);
        continue;
      }
      if (a = this.tokenizer.heading(e)) {
        e = e.substring(a.raw.length), t.push(a);
        continue;
      }
      if (a = this.tokenizer.hr(e)) {
        e = e.substring(a.raw.length), t.push(a);
        continue;
      }
      if (a = this.tokenizer.blockquote(e)) {
        e = e.substring(a.raw.length), t.push(a);
        continue;
      }
      if (a = this.tokenizer.list(e)) {
        e = e.substring(a.raw.length), t.push(a);
        continue;
      }
      if (a = this.tokenizer.html(e)) {
        e = e.substring(a.raw.length), t.push(a);
        continue;
      }
      if (a = this.tokenizer.def(e)) {
        e = e.substring(a.raw.length);
        const s = t.at(-1);
        (s == null ? void 0 : s.type) === "paragraph" || (s == null ? void 0 : s.type) === "text" ? (s.raw += `
` + a.raw, s.text += `
` + a.raw, this.inlineQueue.at(-1).src = s.text) : this.tokens.links[a.tag] || (this.tokens.links[a.tag] = { href: a.href, title: a.title });
        continue;
      }
      if (a = this.tokenizer.table(e)) {
        e = e.substring(a.raw.length), t.push(a);
        continue;
      }
      if (a = this.tokenizer.lheading(e)) {
        e = e.substring(a.raw.length), t.push(a);
        continue;
      }
      let i = e;
      if ((_c = this.options.extensions) == null ? void 0 : _c.startBlock) {
        let s = 1 / 0;
        const l = e.slice(1);
        let h;
        this.options.extensions.startBlock.forEach((c) => {
          h = c.call({ lexer: this }, l), typeof h == "number" && h >= 0 && (s = Math.min(s, h));
        }), s < 1 / 0 && s >= 0 && (i = e.substring(0, s + 1));
      }
      if (this.state.top && (a = this.tokenizer.paragraph(i))) {
        const s = t.at(-1);
        n && (s == null ? void 0 : s.type) === "paragraph" ? (s.raw += `
` + a.raw, s.text += `
` + a.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = s.text) : t.push(a), n = i.length !== e.length, e = e.substring(a.raw.length);
        continue;
      }
      if (a = this.tokenizer.text(e)) {
        e = e.substring(a.raw.length);
        const s = t.at(-1);
        (s == null ? void 0 : s.type) === "text" ? (s.raw += `
` + a.raw, s.text += `
` + a.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = s.text) : t.push(a);
        continue;
      }
      if (e) {
        const s = "Infinite loop on byte: " + e.charCodeAt(0);
        if (this.options.silent) {
          console.error(s);
          break;
        } else throw new Error(s);
      }
    }
    return this.state.top = true, t;
  }
  inline(e, t = []) {
    return this.inlineQueue.push({ src: e, tokens: t }), t;
  }
  inlineTokens(e, t = []) {
    var _a3, _b2, _c;
    let n = e, a = null;
    if (this.tokens.links) {
      const l = Object.keys(this.tokens.links);
      if (l.length > 0) for (; (a = this.tokenizer.rules.inline.reflinkSearch.exec(n)) != null; ) l.includes(a[0].slice(a[0].lastIndexOf("[") + 1, -1)) && (n = n.slice(0, a.index) + "[" + "a".repeat(a[0].length - 2) + "]" + n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
    }
    for (; (a = this.tokenizer.rules.inline.anyPunctuation.exec(n)) != null; ) n = n.slice(0, a.index) + "++" + n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
    for (; (a = this.tokenizer.rules.inline.blockSkip.exec(n)) != null; ) n = n.slice(0, a.index) + "[" + "a".repeat(a[0].length - 2) + "]" + n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    let i = false, s = "";
    for (; e; ) {
      i || (s = ""), i = false;
      let l;
      if ((_b2 = (_a3 = this.options.extensions) == null ? void 0 : _a3.inline) == null ? void 0 : _b2.some((c) => (l = c.call({ lexer: this }, e, t)) ? (e = e.substring(l.raw.length), t.push(l), true) : false)) continue;
      if (l = this.tokenizer.escape(e)) {
        e = e.substring(l.raw.length), t.push(l);
        continue;
      }
      if (l = this.tokenizer.tag(e)) {
        e = e.substring(l.raw.length), t.push(l);
        continue;
      }
      if (l = this.tokenizer.link(e)) {
        e = e.substring(l.raw.length), t.push(l);
        continue;
      }
      if (l = this.tokenizer.reflink(e, this.tokens.links)) {
        e = e.substring(l.raw.length);
        const c = t.at(-1);
        l.type === "text" && (c == null ? void 0 : c.type) === "text" ? (c.raw += l.raw, c.text += l.text) : t.push(l);
        continue;
      }
      if (l = this.tokenizer.emStrong(e, n, s)) {
        e = e.substring(l.raw.length), t.push(l);
        continue;
      }
      if (l = this.tokenizer.codespan(e)) {
        e = e.substring(l.raw.length), t.push(l);
        continue;
      }
      if (l = this.tokenizer.br(e)) {
        e = e.substring(l.raw.length), t.push(l);
        continue;
      }
      if (l = this.tokenizer.del(e)) {
        e = e.substring(l.raw.length), t.push(l);
        continue;
      }
      if (l = this.tokenizer.autolink(e)) {
        e = e.substring(l.raw.length), t.push(l);
        continue;
      }
      if (!this.state.inLink && (l = this.tokenizer.url(e))) {
        e = e.substring(l.raw.length), t.push(l);
        continue;
      }
      let h = e;
      if ((_c = this.options.extensions) == null ? void 0 : _c.startInline) {
        let c = 1 / 0;
        const m = e.slice(1);
        let p;
        this.options.extensions.startInline.forEach((b) => {
          p = b.call({ lexer: this }, m), typeof p == "number" && p >= 0 && (c = Math.min(c, p));
        }), c < 1 / 0 && c >= 0 && (h = e.substring(0, c + 1));
      }
      if (l = this.tokenizer.inlineText(h)) {
        e = e.substring(l.raw.length), l.raw.slice(-1) !== "_" && (s = l.raw.slice(-1)), i = true;
        const c = t.at(-1);
        (c == null ? void 0 : c.type) === "text" ? (c.raw += l.raw, c.text += l.text) : t.push(l);
        continue;
      }
      if (e) {
        const c = "Infinite loop on byte: " + e.charCodeAt(0);
        if (this.options.silent) {
          console.error(c);
          break;
        } else throw new Error(c);
      }
    }
    return t;
  }
}, I0 = class {
  constructor(r) {
    __publicField(this, "options");
    __publicField(this, "parser");
    this.options = r || St;
  }
  space(r) {
    return "";
  }
  code({ text: r, lang: e, escaped: t }) {
    var _a3;
    const n = (_a3 = (e || "").match(pe.notSpaceStart)) == null ? void 0 : _a3[0], a = r.replace(pe.endingNewline, "") + `
`;
    return n ? '<pre><code class="language-' + Ie(n) + '">' + (t ? a : Ie(a, true)) + `</code></pre>
` : "<pre><code>" + (t ? a : Ie(a, true)) + `</code></pre>
`;
  }
  blockquote({ tokens: r }) {
    return `<blockquote>
${this.parser.parse(r)}</blockquote>
`;
  }
  html({ text: r }) {
    return r;
  }
  heading({ tokens: r, depth: e }) {
    return `<h${e}>${this.parser.parseInline(r)}</h${e}>
`;
  }
  hr(r) {
    return `<hr>
`;
  }
  list(r) {
    const e = r.ordered, t = r.start;
    let n = "";
    for (let s = 0; s < r.items.length; s++) {
      const l = r.items[s];
      n += this.listitem(l);
    }
    const a = e ? "ol" : "ul", i = e && t !== 1 ? ' start="' + t + '"' : "";
    return "<" + a + i + `>
` + n + "</" + a + `>
`;
  }
  listitem(r) {
    var _a3;
    let e = "";
    if (r.task) {
      const t = this.checkbox({ checked: !!r.checked });
      r.loose ? ((_a3 = r.tokens[0]) == null ? void 0 : _a3.type) === "paragraph" ? (r.tokens[0].text = t + " " + r.tokens[0].text, r.tokens[0].tokens && r.tokens[0].tokens.length > 0 && r.tokens[0].tokens[0].type === "text" && (r.tokens[0].tokens[0].text = t + " " + Ie(r.tokens[0].tokens[0].text), r.tokens[0].tokens[0].escaped = true)) : r.tokens.unshift({ type: "text", raw: t + " ", text: t + " ", escaped: true }) : e += t + " ";
    }
    return e += this.parser.parse(r.tokens, !!r.loose), `<li>${e}</li>
`;
  }
  checkbox({ checked: r }) {
    return "<input " + (r ? 'checked="" ' : "") + 'disabled="" type="checkbox">';
  }
  paragraph({ tokens: r }) {
    return `<p>${this.parser.parseInline(r)}</p>
`;
  }
  table(r) {
    let e = "", t = "";
    for (let a = 0; a < r.header.length; a++) t += this.tablecell(r.header[a]);
    e += this.tablerow({ text: t });
    let n = "";
    for (let a = 0; a < r.rows.length; a++) {
      const i = r.rows[a];
      t = "";
      for (let s = 0; s < i.length; s++) t += this.tablecell(i[s]);
      n += this.tablerow({ text: t });
    }
    return n && (n = `<tbody>${n}</tbody>`), `<table>
<thead>
` + e + `</thead>
` + n + `</table>
`;
  }
  tablerow({ text: r }) {
    return `<tr>
${r}</tr>
`;
  }
  tablecell(r) {
    const e = this.parser.parseInline(r.tokens), t = r.header ? "th" : "td";
    return (r.align ? `<${t} align="${r.align}">` : `<${t}>`) + e + `</${t}>
`;
  }
  strong({ tokens: r }) {
    return `<strong>${this.parser.parseInline(r)}</strong>`;
  }
  em({ tokens: r }) {
    return `<em>${this.parser.parseInline(r)}</em>`;
  }
  codespan({ text: r }) {
    return `<code>${Ie(r, true)}</code>`;
  }
  br(r) {
    return "<br>";
  }
  del({ tokens: r }) {
    return `<del>${this.parser.parseInline(r)}</del>`;
  }
  link({ href: r, title: e, tokens: t }) {
    const n = this.parser.parseInline(t), a = Ma(r);
    if (a === null) return n;
    r = a;
    let i = '<a href="' + r + '"';
    return e && (i += ' title="' + Ie(e) + '"'), i += ">" + n + "</a>", i;
  }
  image({ href: r, title: e, text: t, tokens: n }) {
    n && (t = this.parser.parseInline(n, this.parser.textRenderer));
    const a = Ma(r);
    if (a === null) return Ie(t);
    r = a;
    let i = `<img src="${r}" alt="${t}"`;
    return e && (i += ` title="${Ie(e)}"`), i += ">", i;
  }
  text(r) {
    return "tokens" in r && r.tokens ? this.parser.parseInline(r.tokens) : "escaped" in r && r.escaped ? r.text : Ie(r.text);
  }
}, gn = class {
  strong({ text: r }) {
    return r;
  }
  em({ text: r }) {
    return r;
  }
  codespan({ text: r }) {
    return r;
  }
  del({ text: r }) {
    return r;
  }
  html({ text: r }) {
    return r;
  }
  text({ text: r }) {
    return r;
  }
  link({ text: r }) {
    return "" + r;
  }
  image({ text: r }) {
    return "" + r;
  }
  br() {
    return "";
  }
}, Ge = class Dr {
  constructor(e) {
    __publicField(this, "options");
    __publicField(this, "renderer");
    __publicField(this, "textRenderer");
    this.options = e || St, this.options.renderer = this.options.renderer || new I0(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new gn();
  }
  static parse(e, t) {
    return new Dr(t).parse(e);
  }
  static parseInline(e, t) {
    return new Dr(t).parseInline(e);
  }
  parse(e, t = true) {
    var _a3, _b2;
    let n = "";
    for (let a = 0; a < e.length; a++) {
      const i = e[a];
      if ((_b2 = (_a3 = this.options.extensions) == null ? void 0 : _a3.renderers) == null ? void 0 : _b2[i.type]) {
        const l = i, h = this.options.extensions.renderers[l.type].call({ parser: this }, l);
        if (h !== false || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(l.type)) {
          n += h || "";
          continue;
        }
      }
      const s = i;
      switch (s.type) {
        case "space": {
          n += this.renderer.space(s);
          continue;
        }
        case "hr": {
          n += this.renderer.hr(s);
          continue;
        }
        case "heading": {
          n += this.renderer.heading(s);
          continue;
        }
        case "code": {
          n += this.renderer.code(s);
          continue;
        }
        case "table": {
          n += this.renderer.table(s);
          continue;
        }
        case "blockquote": {
          n += this.renderer.blockquote(s);
          continue;
        }
        case "list": {
          n += this.renderer.list(s);
          continue;
        }
        case "html": {
          n += this.renderer.html(s);
          continue;
        }
        case "paragraph": {
          n += this.renderer.paragraph(s);
          continue;
        }
        case "text": {
          let l = s, h = this.renderer.text(l);
          for (; a + 1 < e.length && e[a + 1].type === "text"; ) l = e[++a], h += `
` + this.renderer.text(l);
          t ? n += this.renderer.paragraph({ type: "paragraph", raw: h, text: h, tokens: [{ type: "text", raw: h, text: h, escaped: true }] }) : n += h;
          continue;
        }
        default: {
          const l = 'Token with "' + s.type + '" type was not found.';
          if (this.options.silent) return console.error(l), "";
          throw new Error(l);
        }
      }
    }
    return n;
  }
  parseInline(e, t = this.renderer) {
    var _a3, _b2;
    let n = "";
    for (let a = 0; a < e.length; a++) {
      const i = e[a];
      if ((_b2 = (_a3 = this.options.extensions) == null ? void 0 : _a3.renderers) == null ? void 0 : _b2[i.type]) {
        const l = this.options.extensions.renderers[i.type].call({ parser: this }, i);
        if (l !== false || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(i.type)) {
          n += l || "";
          continue;
        }
      }
      const s = i;
      switch (s.type) {
        case "escape": {
          n += t.text(s);
          break;
        }
        case "html": {
          n += t.html(s);
          break;
        }
        case "link": {
          n += t.link(s);
          break;
        }
        case "image": {
          n += t.image(s);
          break;
        }
        case "strong": {
          n += t.strong(s);
          break;
        }
        case "em": {
          n += t.em(s);
          break;
        }
        case "codespan": {
          n += t.codespan(s);
          break;
        }
        case "br": {
          n += t.br(s);
          break;
        }
        case "del": {
          n += t.del(s);
          break;
        }
        case "text": {
          n += t.text(s);
          break;
        }
        default: {
          const l = 'Token with "' + s.type + '" type was not found.';
          if (this.options.silent) return console.error(l), "";
          throw new Error(l);
        }
      }
    }
    return n;
  }
}, y0 = (_a2 = class {
  constructor(r) {
    __publicField(this, "options");
    __publicField(this, "block");
    this.options = r || St;
  }
  preprocess(r) {
    return r;
  }
  postprocess(r) {
    return r;
  }
  processAllTokens(r) {
    return r;
  }
  provideLexer() {
    return this.block ? qe.lex : qe.lexInline;
  }
  provideParser() {
    return this.block ? Ge.parse : Ge.parseInline;
  }
}, __publicField(_a2, "passThroughHooks", /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens"])), _a2), gu = class {
  constructor(...r) {
    __publicField(this, "defaults", on());
    __publicField(this, "options", this.setOptions);
    __publicField(this, "parse", this.parseMarkdown(true));
    __publicField(this, "parseInline", this.parseMarkdown(false));
    __publicField(this, "Parser", Ge);
    __publicField(this, "Renderer", I0);
    __publicField(this, "TextRenderer", gn);
    __publicField(this, "Lexer", qe);
    __publicField(this, "Tokenizer", N0);
    __publicField(this, "Hooks", y0);
    this.use(...r);
  }
  walkTokens(r, e) {
    var _a3, _b2;
    let t = [];
    for (const n of r) switch (t = t.concat(e.call(this, n)), n.type) {
      case "table": {
        const a = n;
        for (const i of a.header) t = t.concat(this.walkTokens(i.tokens, e));
        for (const i of a.rows) for (const s of i) t = t.concat(this.walkTokens(s.tokens, e));
        break;
      }
      case "list": {
        const a = n;
        t = t.concat(this.walkTokens(a.items, e));
        break;
      }
      default: {
        const a = n;
        ((_b2 = (_a3 = this.defaults.extensions) == null ? void 0 : _a3.childTokens) == null ? void 0 : _b2[a.type]) ? this.defaults.extensions.childTokens[a.type].forEach((i) => {
          const s = a[i].flat(1 / 0);
          t = t.concat(this.walkTokens(s, e));
        }) : a.tokens && (t = t.concat(this.walkTokens(a.tokens, e)));
      }
    }
    return t;
  }
  use(...r) {
    const e = this.defaults.extensions || { renderers: {}, childTokens: {} };
    return r.forEach((t) => {
      const n = { ...t };
      if (n.async = this.defaults.async || n.async || false, t.extensions && (t.extensions.forEach((a) => {
        if (!a.name) throw new Error("extension name required");
        if ("renderer" in a) {
          const i = e.renderers[a.name];
          i ? e.renderers[a.name] = function(...s) {
            let l = a.renderer.apply(this, s);
            return l === false && (l = i.apply(this, s)), l;
          } : e.renderers[a.name] = a.renderer;
        }
        if ("tokenizer" in a) {
          if (!a.level || a.level !== "block" && a.level !== "inline") throw new Error("extension level must be 'block' or 'inline'");
          const i = e[a.level];
          i ? i.unshift(a.tokenizer) : e[a.level] = [a.tokenizer], a.start && (a.level === "block" ? e.startBlock ? e.startBlock.push(a.start) : e.startBlock = [a.start] : a.level === "inline" && (e.startInline ? e.startInline.push(a.start) : e.startInline = [a.start]));
        }
        "childTokens" in a && a.childTokens && (e.childTokens[a.name] = a.childTokens);
      }), n.extensions = e), t.renderer) {
        const a = this.defaults.renderer || new I0(this.defaults);
        for (const i in t.renderer) {
          if (!(i in a)) throw new Error(`renderer '${i}' does not exist`);
          if (["options", "parser"].includes(i)) continue;
          const s = i, l = t.renderer[s], h = a[s];
          a[s] = (...c) => {
            let m = l.apply(a, c);
            return m === false && (m = h.apply(a, c)), m || "";
          };
        }
        n.renderer = a;
      }
      if (t.tokenizer) {
        const a = this.defaults.tokenizer || new N0(this.defaults);
        for (const i in t.tokenizer) {
          if (!(i in a)) throw new Error(`tokenizer '${i}' does not exist`);
          if (["options", "rules", "lexer"].includes(i)) continue;
          const s = i, l = t.tokenizer[s], h = a[s];
          a[s] = (...c) => {
            let m = l.apply(a, c);
            return m === false && (m = h.apply(a, c)), m;
          };
        }
        n.tokenizer = a;
      }
      if (t.hooks) {
        const a = this.defaults.hooks || new y0();
        for (const i in t.hooks) {
          if (!(i in a)) throw new Error(`hook '${i}' does not exist`);
          if (["options", "block"].includes(i)) continue;
          const s = i, l = t.hooks[s], h = a[s];
          y0.passThroughHooks.has(i) ? a[s] = (c) => {
            if (this.defaults.async) return Promise.resolve(l.call(a, c)).then((p) => h.call(a, p));
            const m = l.call(a, c);
            return h.call(a, m);
          } : a[s] = (...c) => {
            let m = l.apply(a, c);
            return m === false && (m = h.apply(a, c)), m;
          };
        }
        n.hooks = a;
      }
      if (t.walkTokens) {
        const a = this.defaults.walkTokens, i = t.walkTokens;
        n.walkTokens = function(s) {
          let l = [];
          return l.push(i.call(this, s)), a && (l = l.concat(a.call(this, s))), l;
        };
      }
      this.defaults = { ...this.defaults, ...n };
    }), this;
  }
  setOptions(r) {
    return this.defaults = { ...this.defaults, ...r }, this;
  }
  lexer(r, e) {
    return qe.lex(r, e ?? this.defaults);
  }
  parser(r, e) {
    return Ge.parse(r, e ?? this.defaults);
  }
  parseMarkdown(r) {
    return (t, n) => {
      const a = { ...n }, i = { ...this.defaults, ...a }, s = this.onError(!!i.silent, !!i.async);
      if (this.defaults.async === true && a.async === false) return s(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
      if (typeof t > "u" || t === null) return s(new Error("marked(): input parameter is undefined or null"));
      if (typeof t != "string") return s(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(t) + ", string expected"));
      i.hooks && (i.hooks.options = i, i.hooks.block = r);
      const l = i.hooks ? i.hooks.provideLexer() : r ? qe.lex : qe.lexInline, h = i.hooks ? i.hooks.provideParser() : r ? Ge.parse : Ge.parseInline;
      if (i.async) return Promise.resolve(i.hooks ? i.hooks.preprocess(t) : t).then((c) => l(c, i)).then((c) => i.hooks ? i.hooks.processAllTokens(c) : c).then((c) => i.walkTokens ? Promise.all(this.walkTokens(c, i.walkTokens)).then(() => c) : c).then((c) => h(c, i)).then((c) => i.hooks ? i.hooks.postprocess(c) : c).catch(s);
      try {
        i.hooks && (t = i.hooks.preprocess(t));
        let c = l(t, i);
        i.hooks && (c = i.hooks.processAllTokens(c)), i.walkTokens && this.walkTokens(c, i.walkTokens);
        let m = h(c, i);
        return i.hooks && (m = i.hooks.postprocess(m)), m;
      } catch (c) {
        return s(c);
      }
    };
  }
  onError(r, e) {
    return (t) => {
      if (t.message += `
Please report this to https://github.com/markedjs/marked.`, r) {
        const n = "<p>An error occurred:</p><pre>" + Ie(t.message + "", true) + "</pre>";
        return e ? Promise.resolve(n) : n;
      }
      if (e) return Promise.reject(t);
      throw t;
    };
  }
}, xt = new gu();
function X(r, e) {
  return xt.parse(r, e);
}
X.options = X.setOptions = function(r) {
  return xt.setOptions(r), X.defaults = xt.defaults, Vi(X.defaults), X;
};
X.getDefaults = on;
X.defaults = St;
X.use = function(...r) {
  return xt.use(...r), X.defaults = xt.defaults, Vi(X.defaults), X;
};
X.walkTokens = function(r, e) {
  return xt.walkTokens(r, e);
};
X.parseInline = xt.parseInline;
X.Parser = Ge;
X.parser = Ge.parse;
X.Renderer = I0;
X.TextRenderer = gn;
X.Lexer = qe;
X.lexer = qe.lex;
X.Tokenizer = N0;
X.Hooks = y0;
X.parse = X;
X.options;
X.setOptions;
X.use;
X.walkTokens;
X.parseInline;
Ge.parse;
qe.lex;
const O = { Space: "MdSpace", Code: "MdCode", Hr: "MdHr", Blockquote: "MdBlockquote", Html: "MdHtml", Def: "MdDef", Paragraph: "MdParagraph", Text: "MdText", Footnote: "MdFootnote", ListItem: "MdListItem", Table: "MdTable", TableHeader: "MdTableHeader", TableCell: "MdTableCell", Heading1: "MdHeading1", Heading2: "MdHeading2", Heading3: "MdHeading3", Heading4: "MdHeading4", Heading5: "MdHeading5", Heading6: "MdHeading6", Tag: "MdTag", Link: "MdLink", Strong: "MdStrong", Em: "MdEm", Codespan: "MdCodespan", Del: "MdDel", Br: "MdBr" }, ut = { tag: "ED7D31", border: "A5A5A5", heading1: "2F5597", heading2: "5B9BD5", heading3: "44546A", heading4: "44546A", heading5: "44546A", heading6: "44546A", link: "0563C1", code: "032F62", codespan: "70AD47", codeBackground: "f6f6f7", blockquote: "666666", blockquoteBackground: "F9F9F9", del: "FF0000", hr: "D9D9D9", html: "4472C4", tableHeaderBackground: "F2F2F2", heading1Size: 18, heading2Size: 16, heading3Size: 14, heading4Size: 13, heading5Size: 12, heading6Size: 12, bodySize: 12, lineSpacing: 1, spaceSize: 6, codeSize: 11, linkUnderline: true }, ts = (r) => {
  const e = { ...ut, ...r };
  return { space: { className: O.Space, run: { size: e.spaceSize * 2 }, paragraph: { spacing: { before: 0, after: 0 } } }, code: { className: O.Code, run: { font: "Courier New", size: e.codeSize * 2, color: e.code }, paragraph: { shading: { fill: e.codeBackground }, border: { top: { style: "single", size: 1, color: e.border, space: 8 }, bottom: { style: "single", size: 1, color: e.border, space: 8 }, left: { style: "single", size: 1, color: e.border, space: 8 }, right: { style: "single", size: 1, color: e.border, space: 8 } }, spacing: { before: 200, after: 200 } } }, hr: { className: O.Hr, paragraph: { border: { bottom: { style: "single", size: 1, color: e.hr, space: 1 } }, spacing: { before: 240, after: 240 } } }, blockquote: { className: O.Blockquote, run: { color: e.blockquote, italics: true }, paragraph: { shading: { fill: e.blockquoteBackground }, border: { left: { style: "single", size: 20, color: e.blockquote, space: 12 } }, indent: { left: 360 }, spacing: { before: 200, after: 200 } } }, html: { className: O.Html, run: { font: "Courier New", color: e.html } }, def: { className: O.Def, paragraph: { indent: { left: 720, hanging: 360 } } }, paragraph: { className: O.Paragraph, paragraph: { spacing: { before: 120, after: 120 } } }, text: { className: O.Text }, footnote: { className: O.Footnote, run: { superScript: true } }, listItem: { className: O.ListItem, paragraph: { indent: { left: 720, hanging: 360 }, spacing: { before: 60, after: 60 } } }, table: { className: O.Table, paragraph: { spacing: { before: 60, after: 60 } } }, tableHeader: { className: O.TableHeader, properties: { shading: { fill: e.tableHeaderBackground } }, run: { bold: true } }, tableCell: { className: O.TableCell }, heading1: { className: O.Heading1, run: { size: e.heading1Size * 2, bold: true, color: e.heading1 }, paragraph: { spacing: { before: 480, after: 240 }, keepNext: true, outlineLevel: 0 } }, heading2: { className: O.Heading2, run: { size: e.heading2Size * 2, bold: true, color: e.heading2 }, paragraph: { spacing: { before: 400, after: 200 }, keepNext: true, outlineLevel: 1 } }, heading3: { className: O.Heading3, run: { size: e.heading3Size * 2, bold: true, color: e.heading3 }, paragraph: { spacing: { before: 320, after: 160 }, keepNext: true, outlineLevel: 2 } }, heading4: { className: O.Heading4, run: { size: e.heading4Size * 2, bold: true, color: e.heading4 }, paragraph: { spacing: { before: 280, after: 140 }, keepNext: true, outlineLevel: 3 } }, heading5: { className: O.Heading5, run: { size: e.heading5Size * 2, bold: true, italics: true, color: e.heading5 }, paragraph: { spacing: { before: 240, after: 120 }, keepNext: true, outlineLevel: 4 } }, heading6: { className: O.Heading6, run: { size: e.heading6Size * 2, bold: false, italics: true, color: e.heading6 }, paragraph: { spacing: { before: 240, after: 120 }, keepNext: true, outlineLevel: 5 } }, tag: { inline: true, className: O.Tag, run: { font: "Courier New", color: e.tag } }, link: { inline: true, className: O.Link, run: { color: e.link, underline: e.linkUnderline ? { type: gs.SINGLE } : void 0 } }, strong: { inline: true, className: O.Strong, run: { bold: true } }, em: { inline: true, className: O.Em, run: { italics: true } }, codespan: { inline: true, className: O.Codespan, run: { font: "Courier New", color: e.codespan } }, del: { inline: true, className: O.Del, run: { strike: true, color: e.del } }, br: { inline: true, className: O.Br } };
}, rs = ts({}), ns = { config: [{ reference: "numbering-points", levels: [$e(0), $e(1), $e(2), $e(3), $e(4), $e(5), $e(6), $e(7), $e(8)] }, { reference: "bullet-points", levels: [ft(0, "\u2022"), ft(1, "\u25A0"), ft(2, "\u25B6"), ft(3, "\u25B2"), ft(4, "\u25C6"), ft(5, "\u25CF"), ft(6, "\u25A1")] }] };
function $e(r) {
  return { level: r, format: Ra.DECIMAL, text: r < 1 ? "%1" : r < 2 ? "%1.%2" : r < 3 ? "%1.%2.%3" : `%${r + 1})` };
}
function ft(r, e) {
  return { level: r, format: Ra.BULLET, text: e };
}
function as(r) {
  return { document: { run: { size: (r.bodySize ?? ut.bodySize ?? 12) * 2 }, paragraph: { spacing: { line: Math.round((r.lineSpacing ?? ut.lineSpacing ?? 1) * 240), lineRule: "auto" } } }, hyperlink: {}, heading1: {}, heading2: {}, heading3: {}, heading4: {}, heading5: {}, heading6: {}, strong: {}, listParagraph: {}, footnoteReference: {}, footnoteText: {}, footnoteTextChar: {}, title: {} };
}
const vu = as(ut);
function bu({ theme: r }) {
  const e = [], t = [], n = r ? { ...ut, ...r } : ut, a = r ? ts(n) : rs, i = Object.keys(a), s = { ...as(n) };
  for (const l of i) {
    const h = a[l];
    if (!h) continue;
    const { className: c, run: m, inline: p, paragraph: b, basedOn: w = "Normal", next: x = "Normal", quickFormat: k = true } = h;
    p ? t.push({ id: c, name: c, basedOn: w, next: x, quickFormat: k, run: m }) : e.push({ id: c, name: c, basedOn: w, next: x, quickFormat: k, run: m, paragraph: b }), l in s && (s[l] = { ...s[l], ...h });
  }
  return { default: s, paragraphStyles: e, characterStyles: t };
}
const yu = { colors: ut, themes: ut, classes: O, default: vu, markdown: rs, numbering: ns }, Ea = Symbol();
function wu(r, e, t) {
  var _a3;
  let n;
  e.ordered && (n = (r.store.get(Ea) || 0) + 1, r.store.set(Ea, n));
  const a = { level: typeof ((_a3 = t.list) == null ? void 0 : _a3.level) == "number" ? t.list.level + 1 : 0, type: e.ordered ? "number" : "bullet", instance: n };
  return e.items.map((i) => {
    const s = i.tokens;
    return bn(r, s, { ...t, style: O.ListItem, list: { ...a, task: i.task, checked: i.checked } });
  }).flat();
}
function xu(r) {
  if (r != null) switch (r) {
    case 0:
      return Qe.TITLE;
    case 1:
      return Qe.HEADING_1;
    case 2:
      return Qe.HEADING_2;
    case 3:
      return Qe.HEADING_3;
    case 4:
      return Qe.HEADING_4;
    case 5:
      return Qe.HEADING_5;
    case 6:
      return Qe.HEADING_6;
    default:
      return Qe.HEADING_6;
  }
}
function ku(r) {
  switch (r) {
    case "left":
      return Y0.LEFT;
    case "center":
      return Y0.CENTER;
    case "right":
      return Y0.RIGHT;
    default:
      return;
  }
}
function w0(r, e = []) {
  var _a3, _b2, _c;
  for (const t of r) if (t) switch (t.type) {
    case "image":
      e.push(t);
      break;
    case "table":
      if (((_a3 = t.header) == null ? void 0 : _a3.length) && w0(t.header, e), (_b2 = t.rows) == null ? void 0 : _b2.length) for (const n of t.rows) w0(n, e);
      break;
    default:
      ((_c = t.tokens) == null ? void 0 : _c.length) && w0(t.tokens, e);
      break;
  }
  return e;
}
const Su = /* @__PURE__ */ new Set(["jpg", "png", "gif", "bmp", "webp"]);
function Tu(r = "", e) {
  let t = "";
  switch (e) {
    case "image/jpeg":
      t = "jpg";
      break;
    case "image/png":
      t = "png";
      break;
    case "image/gif":
      t = "gif";
      break;
    case "image/bmp":
      t = "bmp";
      break;
    case "image/webp":
      t = "webp";
      break;
    case "image/svg+xml":
      t = "svg";
      break;
    default:
      const n = r.split("?").pop() || "", a = n.lastIndexOf(".");
      a > -1 && (t = n.substring(a + 1));
      break;
  }
  if (t) {
    if (!Su.has(t)) throw new Error(`Image extension ${t} is not supported`);
  } else throw new Error(`Cannot get Image extension from mime type: ${e}`);
  return t;
}
function Au(r, e) {
  return new xs({ checked: !!e, checkedState: { value: "2611", font: "MS Gothic" }, uncheckedState: { value: "2610", font: "MS Gothic" } });
}
function gt(r, e, t) {
  const n = e.trim().split(/\n/), a = n.length, i = { style: t.style, italics: t.italics, bold: t.bold, underline: t.underline ? {} : void 0, strike: t.strike, break: t.break ? typeof t.break == "number" ? t.break : 1 : void 0 };
  if (t.strong && (i.bold = true), t.em && (i.italics = true), t.codespan && (i.underline = {}), t.del && (i.strike = true), a > 1) {
    const s = [];
    return s.push(...n.map((l, h) => new x0({ ...i, text: l, break: h > 0 ? 1 : void 0 }))), s;
  }
  return [new x0({ text: e, ...i })];
}
function Mu(r, e, t) {
  if (r.ignoreImage) return false;
  const n = r.findImage(e);
  if (!n || !n.type) return gt(r, `[!${e.text}](${e.href})`, t);
  const { width: a, height: i, title: s } = zu(e, n);
  return new ws({ type: n.type, data: n.data, transformation: { width: a, height: i }, altText: { title: s || e.text, description: e.text, name: e.text } });
}
function zu(r, e) {
  var _a3;
  const t = (_a3 = r.title) == null ? void 0 : _a3.trim(), n = t ? t.match(/^(\d+%?)x(\d+%?)$/) : null;
  return n ? { width: n[1].endsWith("%") ? parseInt(n[1], 10) / 100 * e.width : parseInt(n[1], 10), height: n[2].endsWith("%") ? parseInt(n[2], 10) / 100 * e.height : parseInt(n[2], 10), title: "" } : { width: e.width, height: e.height, title: r.title };
}
function vt(r, e, t = {}) {
  const n = [];
  for (const a of e) {
    const i = Cu(r, a, t);
    Array.isArray(i) ? n.push(...i) : i ? n.push(i) : i == null && console.warn(`Inline token is empty: ${a.type}`);
  }
  return n;
}
function Cu(r, e, t) {
  var _a3;
  switch (e.type) {
    case "escape":
      return gt(r, e.text, t);
    case "html":
      return r.ignoreHtml ? false : gt(r, e.text, { ...t, style: O.Tag });
    case "link":
      return new vs({ children: vt(r, e.tokens, { ...t, link: true, style: O.Link }), link: e.href });
    case "em":
      return vt(r, e.tokens, { ...t, em: true, style: O.Em });
    case "strong":
      return vt(r, e.tokens, { ...t, strong: true, style: O.Strong });
    case "codespan":
      return gt(r, e.text, { ...t, codespan: true, style: O.Codespan });
    case "br":
      return gt(r, "", { break: 1, style: O.Br });
    case "del":
      return vt(r, e.tokens, { ...t, del: true, style: O.Del });
    case "text":
      return ((_a3 = e.tokens) == null ? void 0 : _a3.length) ? vt(r, e.tokens, t) : gt(r, e.text, t);
    case "image":
      return Mu(r, e, t);
    default:
      return r.useInlineRender(e, t);
  }
}
function De(r, e, t) {
  var _a3, _b2, _c;
  const n = xu(t.heading), a = ku(t.align), i = !t.listNone && t.list, s = { heading: n, alignment: a, bullet: i && ((_a3 = t.list) == null ? void 0 : _a3.type) === "bullet" ? { level: Math.min(t.list.level, 9) } : void 0, numbering: i && ((_b2 = t.list) == null ? void 0 : _b2.type) === "number" ? { level: Math.min(t.list.level, 9), reference: "numbering-points", instance: t.list.instance } : void 0, style: t.style }, l = typeof e == "string" ? gt(r, e, {}) : vt(r, e, {});
  return ((_c = t.list) == null ? void 0 : _c.task) && l.unshift(Au(r, t.list.checked)), new rt({ children: l, ...s });
}
function Eu(r, e, t) {
  const n = (s, l) => ({ ...t, align: s == null ? void 0 : s.align, style: l ? O.TableHeader : O.TableCell }), a = r.styles.markdown, i = 100 / e.header.length * 100;
  return new bs({ ...a.table.properties, style: O.Table, width: { size: "100%", type: ys.PERCENTAGE }, columnWidths: e.header.map(() => i), rows: [new Cn({ tableHeader: true, cantSplit: true, children: e.header.map((s) => new En({ verticalAlign: Nn.CENTER, ...a.tableHeader.properties, children: [De(r, s.tokens, n(s, true))] })) }), ...e.rows.map((s) => new Cn({ cantSplit: true, children: s.map((l) => new En({ verticalAlign: Nn.CENTER, ...a.tableCell.properties, children: [De(r, l.tokens, n(l))] })) }))] });
}
let Nt = false;
var Nu = class extends _r {
  constructor(r) {
    super("m:e");
    for (const e of r) this.root.push(e);
  }
}, Iu = class extends _r {
  constructor(r) {
    super("m:mr");
    for (const e of r) this.root.push(new Nu(e));
  }
}, Bu = class extends _r {
  constructor(r) {
    super("m:m");
    for (const e of r) this.root.push(new Iu(e));
  }
};
function vn(r, e) {
  const t = wt(new q1({ ignoreAttributes: false, attributeNamePrefix: "", textNodeName: "text", preserveOrder: true, trimValues: false }).parse(r), "math");
  if (Nt = !!(e == null ? void 0 : e.libreOfficeCompat), !t) return [];
  const n = wt(ue(t), "semantics");
  return yt(ue(n ? wt(ue(n), "mrow") || n : wt(ue(t), "mrow") || t));
}
function yt(r) {
  let e = [];
  for (let t = 0; t < r.length; t++) {
    const n = r[t], a = at(n);
    if (a === "munderover" || a === "munder" || a === "mover") {
      const i = ue(n), s = wt(i, "mo"), l = s ? Ia(ue(s)) : "", h = a !== "mover" ? i[1] ? se(i[1]) : [] : [], c = a !== "munder" ? i[2] ? se(i[2]) : [] : [], m = yt(r.slice(t + 1));
      if (l.includes("\u2211")) {
        Nt ? e.push(...g0("\u2211", h, c, m)) : e.push(new In({ children: m, subScript: h, superScript: c }));
        break;
      }
      if (l.includes("\u222B")) {
        Nt ? e.push(...g0("\u222B", h, c, m)) : e.push(new Bn({ children: m, subScript: h, superScript: c }));
        break;
      }
    }
    if (a === "msubsup") {
      const i = ue(n), s = i[0];
      if (at(s) === "mo") {
        const l = Ia(ue(s)), h = i[1] ? se(i[1]) : [], c = i[2] ? se(i[2]) : [], m = yt(r.slice(t + 1));
        if (l.includes("\u2211")) {
          e.push(...Nt ? g0("\u2211", h, c, m) : [new In({ children: m, subScript: h, superScript: c })]);
          break;
        }
        if (l.includes("\u222B")) {
          e.push(...Nt ? g0("\u222B", h, c, m) : [new Bn({ children: m, subScript: h, superScript: c })]);
          break;
        }
      }
    }
    e = e.concat(se(n));
  }
  return e;
}
function se(r) {
  var _a3;
  const e = at(r);
  if (!e) {
    const n = ((_a3 = r.text) == null ? void 0 : _a3.toString()) || "";
    return n ? [new _e(n)] : [];
  }
  const t = ue(r);
  switch (e) {
    case "mrow":
      return yt(t);
    case "mi":
    case "mn":
    case "mo":
      return Na(t);
    case "msup": {
      const [n, a] = Et(t, 2);
      return [new Ts({ children: se(n), superScript: se(a) })];
    }
    case "msub": {
      const [n, a] = Et(t, 2);
      return [new Ss({ children: se(n), subScript: se(a) })];
    }
    case "msubsup": {
      const [n, a, i] = Et(t, 3);
      return [new qa({ children: se(n), subScript: se(a), superScript: se(i) })];
    }
    case "mfrac": {
      const [n, a] = Et(t, 2);
      return [new ks({ numerator: se(n), denominator: se(a) })];
    }
    case "msqrt": {
      const [n] = Et(t, 1);
      return [new Rn({ children: se(n) })];
    }
    case "mroot": {
      const [n, a] = Et(t, 2);
      return [new Rn({ children: se(n), degree: se(a) })];
    }
    case "mtable": {
      const n = t.filter((a) => at(a) === "mtr");
      if (Nt) {
        const a = [];
        return a.push(new _e("[")), n.forEach((i, s) => {
          s > 0 && a.push(new _e("; ")), ue(i).filter((l) => at(l) === "mtd").forEach((l, h) => {
            h > 0 && a.push(new _e(", ")), a.push(...yt(ue(l)));
          });
        }), a.push(new _e("]")), a;
      }
      return [new Bu(n.map((a) => ue(a).filter((i) => at(i) === "mtd").map((i) => yt(ue(i)))))];
    }
    case "munderover":
    case "munder":
    case "mover": {
      const n = ue(r), a = Na(ue(wt(n, "mo") || {})), i = e !== "mover" ? n[1] ? se(n[1]) : [] : [], s = e !== "munder" ? n[2] ? se(n[2]) : [] : [];
      return a.concat(i).concat(s);
    }
    default:
      return yt(t);
  }
}
function at(r) {
  return Object.keys(r).filter((e) => e !== "text" && e !== ":@")[0] || null;
}
function ue(r) {
  const e = at(r);
  if (!e) return [];
  const t = r[e];
  return Array.isArray(t) ? t : t ? [t] : [];
}
function Na(r) {
  const e = r.map((t) => (t.text ?? "").toString()).join("");
  return e ? [new _e(e)] : [];
}
function Ia(r) {
  return r.map((e) => (e.text ?? "").toString()).join("");
}
function g0(r, e, t, n) {
  return [new qa({ children: [new _e(r)], subScript: e, superScript: t }), ...n];
}
function wt(r, e) {
  for (const t of r) {
    if (at(t) === e) return t;
    const n = wt(ue(t), e);
    if (n) return n;
  }
  return null;
}
function Et(r, e) {
  return r.slice(0, e);
}
function bn(r, e, t = {}) {
  const n = [];
  for (const a of e) {
    const i = Ru(r, a, t);
    Array.isArray(i) ? n.push(...i) : i ? n.push(i) : i == null && console.warn(`Block is empty: ${a.type}`);
  }
  return n;
}
function Ru(r, e, t) {
  var _a3, _b2, _c, _d, _e2, _f;
  switch (e.type) {
    case "space":
      return new rt({ text: "", style: O.Space });
    case "code": {
      const n = (_a3 = e.lang) == null ? void 0 : _a3.trim().toLowerCase();
      if (n && /^(math|latex|katex)$/.test(n)) {
        const a = e.text.trim();
        if (((_c = (_b2 = r.options) == null ? void 0 : _b2.math) == null ? void 0 : _c.engine) === "katex") try {
          const i = vn(sn.renderToString(a, { output: "mathml", throwOnError: false, displayMode: true, ...((_d = r.options.math) == null ? void 0 : _d.katexOptions) || {} }), { libreOfficeCompat: !!((_e2 = r.options.math) == null ? void 0 : _e2.libreOfficeCompat) });
          if (i && i.length) return new rt({ children: [new Yt({ children: i })], style: O.Paragraph });
        } catch {
        }
        return De(r, a, { ...t, style: "MdCode", listNone: true });
      }
      return De(r, e.text, { ...t, style: "MdCode", listNone: true });
    }
    case "heading":
      return De(r, e.tokens, { ...t, heading: e.depth, style: O[`Heading${e.depth}`] });
    case "hr":
      return new rt({ text: "", thematicBreak: true, style: O.Hr });
    case "blockquote":
      return bn(r, e.tokens, { ...t, listNone: true, blockquote: true, style: O.Blockquote });
    case "list":
      return wu(r, e, t);
    case "html":
      return r.ignoreHtml ? false : De(r, e.text, { ...t, style: O.Html });
    case "def":
      return new rt({ text: e.title, style: O.Def });
    case "table":
      return Eu(r, e, { ...t, listNone: true });
    case "paragraph":
      return De(r, e.tokens, { style: O.Paragraph, ...t });
    case "text":
      return ((_f = e.tokens) == null ? void 0 : _f.length) ? De(r, e.tokens, { style: O.Text, ...t }) : De(r, e.text, t);
    default:
      return r.useBlockRender(e, t);
  }
}
function qu(r) {
  let e = false, t = 0;
  const n = /* @__PURE__ */ new Map();
  return { name: "footnote", init: Fu, block: a, inline: i };
  function a(s) {
    const l = /^\[\^([^\]\n]+)\]:(?:[ \t]+|[\n]*?|$)([^\n]*?(?:\n|$)(?:\n*?[ ]{4,}[^\n]*)*)/.exec(s);
    if (!l) return;
    e || (e = true, t = 0, n.clear());
    const [h, c, m = ""] = l;
    let p = m.split(`
`).reduce((x, k) => x + `
` + k.replace(/^(?:[ ]{4}|[\t])/, ""), "");
    const b = p.trimEnd().split(`
`).pop();
    p += b && /^[ \t]*?[>\-*][ ]|[`]{3,}$|^[ \t]*?[|].+[|]$/.test(b) ? `

` : "";
    const w = { id: ++t, type: "footnote", raw: h, label: c, tokens: r.blockTokens(p.trim()) };
    return n.set(c, w), w;
  }
  function i(s) {
    const l = /^\[\^([^\]\n]+)\]/.exec(s);
    if (l) {
      const [h, c] = l, m = n.get(c);
      return m ? { id: m.id, type: "footnoteRef", raw: h, label: c } : void 0;
    }
  }
}
function Fu(r) {
  r.addInlineRender("footnoteRef", Lu), r.addBlockRender("footnote", Ou);
}
function Lu(r, e, t) {
  return new As(e.id);
}
function Ou(r, e, t) {
  const n = r.toBlocks(e.tokens, { ...t, style: O.Footnote, footnote: true });
  return r.addFootnote(e.id, n), false;
}
const Pu = /^(\${1,2})(?!\$)((?:\\.|[^\\\n])*?(?:\\.|[^\\\n\$]))\1(?=[\s?!\.,:;%)\]–—？！。，：-]|$)/, $u = /^(\${1,2})\n((?:\\[^]|[^\\])+?)\n\1(?:\n|$)/;
function Du(r) {
  const e = Pu;
  return { name: "latex", startInline: (t) => {
    let n, a = t;
    for (; a; ) {
      if (n = a.indexOf("$"), n === -1) return;
      if ((n === 0 || a.charAt(n - 1) !== "$") && a.substring(n).match(e)) return n;
      a = a.substring(n + 1).replace(/^\$+/, "");
    }
  }, inline: (t, n) => {
    const a = t.match(e);
    if (a) return { type: "inlineKatex", raw: a[0], text: a[2].trim(), displayMode: a[1].length === 2 };
  }, block: (t, n) => {
    const a = t.match($u);
    if (a) return { type: "blockKatex", raw: a[0], text: a[2].trim(), displayMode: a[1].length === 2 };
  }, init: (t) => {
    t.addInlineRender("inlineKatex", _u), t.addBlockRender("blockKatex", Gu);
  } };
}
const Hu = /* @__PURE__ */ new Map([["alpha", "\u03B1"], ["beta", "\u03B2"], ["gamma", "\u03B3"], ["delta", "\u03B4"], ["epsilon", "\u03B5"], ["zeta", "\u03B6"], ["eta", "\u03B7"], ["theta", "\u03B8"], ["iota", "\u03B9"], ["kappa", "\u03BA"], ["lambda", "\u03BB"], ["mu", "\u03BC"], ["nu", "\u03BD"], ["xi", "\u03BE"], ["omicron", "\u03BF"], ["pi", "\u03C0"], ["rho", "\u03C1"], ["sigma", "\u03C3"], ["tau", "\u03C4"], ["upsilon", "\u03C5"], ["phi", "\u03C6"], ["chi", "\u03C7"], ["psi", "\u03C8"], ["omega", "\u03C9"], ["textasciitilde", "~"], ["textbackslash", "\\"], ["textasciicircum", "^"], ["textbar", "|"], ["textless", "<"], ["textgreater", ">"], ["textunderscore", "_"], ["neq", "\u2260"], ["leq", "\u2264"], ["leqq", "\u2266"], ["geq", "\u2265"], ["geqq", "\u2267"], ["sim", "\u223C"], ["simeq", "\u2243"], ["approx", "\u2248"], ["infty", "\u221E"], ["fallingdotseq", "\u2252"], ["risingdotseq", "\u2253"], ["equiv", "\u2261"], ["ll", "\u226A"], ["gg", "\u226B"], ["times", "\xD7"], ["div", "\xF7"], ["pm", "\xB1"], ["mp", "\u2213"], ["oplus", "\u2295"], ["otimes", "\u2297"], ["ominus", "\u2296"], ["oslash", "\u2298"], ["odot", "\u2299"], ["circ", "\u2218"], ["bullet", "\u2022"], ["cdot", "\u22C5"], ["ltimes", "\u22C9"], ["rtimes", "\u22CA"], ["in", "\u2208"], ["notin", "\u2209"], ["ni", "\u220B"], ["notni", "\u220C"]]);
function is(r) {
  let e = r;
  for (const [t, n] of Hu.entries()) {
    const a = new RegExp(`\\\\${t}(?![a-zA-Z])`, "g");
    e = e.replace(a, n);
  }
  return e = e.replace(/\^(\d)/g, (t, n) => "\u2070\xB9\xB2\xB3\u2074\u2075\u2076\u2077\u2078\u2079"[parseInt(n)]), e = e.replace(/_(\d)/g, (t, n) => "\u2080\u2081\u2082\u2083\u2084\u2085\u2086\u2087\u2088\u2089"[parseInt(n)]), e = e.replace(/\^{([^}]+)}/g, "^$1"), e = e.replace(/_{([^}]+)}/g, "_$1"), e = e.replace(/\\([a-zA-Z]+)/g, "$1"), e = e.replace(/[{}]/g, ""), e;
}
function _u(r, e) {
  var _a3, _b2, _c, _d;
  const t = e.text;
  if (((_b2 = (_a3 = r.options) == null ? void 0 : _a3.math) == null ? void 0 : _b2.engine) === "katex") try {
    const a = vn(sn.renderToString(t, { output: "mathml", throwOnError: false, displayMode: !!e.displayMode, ...((_c = r.options.math) == null ? void 0 : _c.katexOptions) || {} }), { libreOfficeCompat: !!((_d = r.options.math) == null ? void 0 : _d.libreOfficeCompat) });
    if (a && a.length) return new Yt({ children: a });
  } catch {
  }
  let n = is(t);
  return n || (n = t), n ? new Yt({ children: [new _e(n)] }) : new x0(t || "");
}
function Gu(r, e) {
  var _a3, _b2, _c, _d;
  const t = e.text;
  if (((_b2 = (_a3 = r.options) == null ? void 0 : _a3.math) == null ? void 0 : _b2.engine) === "katex") try {
    const a = vn(sn.renderToString(t, { output: "mathml", throwOnError: false, displayMode: !!e.displayMode, ...((_c = r.options.math) == null ? void 0 : _c.katexOptions) || {} }), { libreOfficeCompat: !!((_d = r.options.math) == null ? void 0 : _d.libreOfficeCompat) });
    if (a && a.length) return new rt({ children: [new Yt({ children: a })] });
  } catch {
  }
  let n = is(t);
  return n || (n = t), n ? new rt({ children: [new Yt({ children: [new _e(n)] })] }) : new rt({ children: [new x0(t || "")] });
}
function Vu(r) {
  const e = new qe(r.options);
  return Ba(r, e, qu), Ba(r, e, Du), e;
}
function Ba(r, e, t) {
  const n = t(e), a = e.options.extensions || (e.options.extensions = {});
  n.startBlock && (a.startBlock || (a.startBlock = [])).push(n.startBlock), n.startInline && (a.startInline || (a.startInline = [])).push(n.startInline), n.block && (a.block || (a.block = [])).push(n.block), n.inline && (a.inline || (a.inline = [])).push(n.inline), n.init && n.init(r);
}
function Uu(r) {
  return Vu(r).lex(r.markdown);
}
var ss = (_b = class {
  static covert(e, t = {}) {
    return new _b(e, t).toDocument();
  }
  constructor(e, t = {}) {
    this.markdown = e, this.options = t, this.styles = yu, this.store = /* @__PURE__ */ new Map(), this._imageStore = /* @__PURE__ */ new Map(), this.footnotes = {}, this._blockRender = /* @__PURE__ */ new Map(), this._inlineRender = /* @__PURE__ */ new Map(), this.options = { ..._b.defaultOptions, ...t };
  }
  get ignoreImage() {
    return !!this.options.ignoreImage;
  }
  get ignoreFootnote() {
    return !!this.options.ignoreFootnote;
  }
  get ignoreHtml() {
    return !!this.options.ignoreHtml;
  }
  async toDocument(e) {
    this.footnotes = {};
    const t = await this.toSection();
    return new ps({ numbering: ns, styles: bu({ theme: this.options.theme }), ...this.options.document, ...e, footnotes: this.footnotes, sections: [{ children: t }] });
  }
  async toSection() {
    const e = Uu(this);
    if (!this.ignoreImage) {
      const t = w0(e);
      t.length && await this.downloadImageList(t);
    }
    return this.toBlocks(e);
  }
  async downloadImageList(e) {
    const t = this.options.imageAdapter;
    if (typeof t != "function") throw new Error("MarkdownDocx.imageAdapter is not a function");
    const n = this._imageStore, a = e.map((i) => {
      if (n.has(i.href)) return Promise.resolve(n.get(i.href));
      const s = {};
      return n.set(i.href, s), t(i).then((l) => (Object.assign(s, l), s));
    });
    return Promise.all(a);
  }
  toBlocks(e, t = {}) {
    return bn(this, e, t);
  }
  toTexts(e, t = {}) {
    return vt(this, e, t);
  }
  addFootnote(e, t) {
    this.footnotes[e] = { children: t };
  }
  findImage(e) {
    const t = this._imageStore.get(e.href);
    return t || null;
  }
  addBlockRender(e, t) {
    this._blockRender.set(e, t);
  }
  addInlineRender(e, t) {
    this._inlineRender.set(e, t);
  }
  useBlockRender(e, t) {
    const n = this._blockRender.get(e.type);
    return n ? n(this, e, t) : null;
  }
  useInlineRender(e, t) {
    const n = this._inlineRender.get(e.type);
    return n ? n(this, e, t) : null;
  }
}, _b.defaultOptions = { gfm: true, math: { engine: "katex" } }, _b);
function Ju(r, e = {}) {
  return ss.covert(r, e);
}
const ju = async function(r) {
  const e = r.href;
  if (!e) return null;
  try {
    const t = await fetch(e);
    if (!t.ok) return null;
    const n = await t.blob(), a = Tu(e, t.headers.get("content-type") || n.type);
    if (!a) return null;
    let { width: i, height: s, image: l } = await Wu(n), h = await n.arrayBuffer(), c = a;
    return a === "webp" && (h = await Xu(i, s, l), c = "png"), { type: c, data: h, width: i, height: s };
  } catch (t) {
    return console.error("[MarkdownDocx] downloadImageError", t), null;
  }
};
async function Wu(r) {
  return new Promise((e, t) => {
    const n = new Image();
    n.onload = () => {
      e({ width: n.naturalWidth || n.width, height: n.naturalHeight || n.height, image: n }), URL.revokeObjectURL(n.src);
    }, n.onerror = (a) => {
      URL.revokeObjectURL(n.src), t(new Error(`Failed to load image: ${a.message || a}`));
    }, n.src = URL.createObjectURL(r);
  });
}
async function Xu(r, e, t) {
  return typeof OffscreenCanvas < "u" ? await Yu(r, e, t) : await Zu(r, e, t);
}
async function Yu(r, e, t) {
  const n = new OffscreenCanvas(r, e), a = n.getContext("2d");
  if (!a) throw new Error("Failed to get canvas context for WebP conversion");
  return a.drawImage(t, 0, 0, r, e), (await n.convertToBlob({ type: "image/png", quality: 1 })).arrayBuffer();
}
async function Zu(r, e, t) {
  const n = document.createElement("canvas"), a = n.getContext("2d");
  if (!a) throw new Error("Failed to get canvas context for WebP conversion");
  return n.width = r, n.height = e, a.drawImage(t, 0, 0, r, e), new Promise((i, s) => n.toBlob((l) => l ? i(l.arrayBuffer()) : s(new Error("Failed to convert canvas to Blob")), "image/png", 1));
}
ss.defaultOptions.imageAdapter = ju;
export {
  ss as MarkdownDocx,
  Qu as Packer,
  Ju as default,
  Ju as markdownDocx,
  yu as styles
};
