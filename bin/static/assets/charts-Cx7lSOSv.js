var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var _a2;
import { r as xa, a as g, g as fr, R as M1 } from "./monaco-BSfMmt4N.js";
var xo = { exports: {} }, Ct = {};
/**
* @license React
* react-dom.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var ef;
function E1() {
  if (ef) return Ct;
  ef = 1;
  var e3 = xa();
  function t(l) {
    var u = "https://react.dev/errors/" + l;
    if (1 < arguments.length) {
      u += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var c = 2; c < arguments.length; c++) u += "&args[]=" + encodeURIComponent(arguments[c]);
    }
    return "Minified React error #" + l + "; visit " + u + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function r() {
  }
  var n = { d: { f: r, r: function() {
    throw Error(t(522));
  }, D: r, C: r, L: r, m: r, X: r, S: r, M: r }, p: 0, findDOMNode: null }, i = Symbol.for("react.portal");
  function s(l, u, c) {
    var h = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: i, key: h == null ? null : "" + h, children: l, containerInfo: u, implementation: c };
  }
  var a = e3.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function o(l, u) {
    if (l === "font") return "";
    if (typeof u == "string") return u === "use-credentials" ? u : "";
  }
  return Ct.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = n, Ct.createPortal = function(l, u) {
    var c = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!u || u.nodeType !== 1 && u.nodeType !== 9 && u.nodeType !== 11) throw Error(t(299));
    return s(l, u, null, c);
  }, Ct.flushSync = function(l) {
    var u = a.T, c = n.p;
    try {
      if (a.T = null, n.p = 2, l) return l();
    } finally {
      a.T = u, n.p = c, n.d.f();
    }
  }, Ct.preconnect = function(l, u) {
    typeof l == "string" && (u ? (u = u.crossOrigin, u = typeof u == "string" ? u === "use-credentials" ? u : "" : void 0) : u = null, n.d.C(l, u));
  }, Ct.prefetchDNS = function(l) {
    typeof l == "string" && n.d.D(l);
  }, Ct.preinit = function(l, u) {
    if (typeof l == "string" && u && typeof u.as == "string") {
      var c = u.as, h = o(c, u.crossOrigin), f = typeof u.integrity == "string" ? u.integrity : void 0, d = typeof u.fetchPriority == "string" ? u.fetchPriority : void 0;
      c === "style" ? n.d.S(l, typeof u.precedence == "string" ? u.precedence : void 0, { crossOrigin: h, integrity: f, fetchPriority: d }) : c === "script" && n.d.X(l, { crossOrigin: h, integrity: f, fetchPriority: d, nonce: typeof u.nonce == "string" ? u.nonce : void 0 });
    }
  }, Ct.preinitModule = function(l, u) {
    if (typeof l == "string") if (typeof u == "object" && u !== null) {
      if (u.as == null || u.as === "script") {
        var c = o(u.as, u.crossOrigin);
        n.d.M(l, { crossOrigin: c, integrity: typeof u.integrity == "string" ? u.integrity : void 0, nonce: typeof u.nonce == "string" ? u.nonce : void 0 });
      }
    } else u == null && n.d.M(l);
  }, Ct.preload = function(l, u) {
    if (typeof l == "string" && typeof u == "object" && u !== null && typeof u.as == "string") {
      var c = u.as, h = o(c, u.crossOrigin);
      n.d.L(l, c, { crossOrigin: h, integrity: typeof u.integrity == "string" ? u.integrity : void 0, nonce: typeof u.nonce == "string" ? u.nonce : void 0, type: typeof u.type == "string" ? u.type : void 0, fetchPriority: typeof u.fetchPriority == "string" ? u.fetchPriority : void 0, referrerPolicy: typeof u.referrerPolicy == "string" ? u.referrerPolicy : void 0, imageSrcSet: typeof u.imageSrcSet == "string" ? u.imageSrcSet : void 0, imageSizes: typeof u.imageSizes == "string" ? u.imageSizes : void 0, media: typeof u.media == "string" ? u.media : void 0 });
    }
  }, Ct.preloadModule = function(l, u) {
    if (typeof l == "string") if (u) {
      var c = o(u.as, u.crossOrigin);
      n.d.m(l, { as: typeof u.as == "string" && u.as !== "script" ? u.as : void 0, crossOrigin: c, integrity: typeof u.integrity == "string" ? u.integrity : void 0 });
    } else n.d.m(l);
  }, Ct.requestFormReset = function(l) {
    n.d.r(l);
  }, Ct.unstable_batchedUpdates = function(l, u) {
    return l(u);
  }, Ct.useFormState = function(l, u, c) {
    return a.H.useFormState(l, u, c);
  }, Ct.useFormStatus = function() {
    return a.H.useHostTransitionStatus();
  }, Ct.version = "19.2.4", Ct;
}
var rf;
function A1() {
  if (rf) return xo.exports;
  rf = 1;
  function e3() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e3);
    } catch (t) {
      console.error(t);
    }
  }
  return e3(), xo.exports = E1(), xo.exports;
}
var Kg = A1();
function Ug(e3) {
  var t, r, n = "";
  if (typeof e3 == "string" || typeof e3 == "number") n += e3;
  else if (typeof e3 == "object") if (Array.isArray(e3)) {
    var i = e3.length;
    for (t = 0; t < i; t++) e3[t] && (r = Ug(e3[t])) && (n && (n += " "), n += r);
  } else for (r in e3) e3[r] && (n && (n += " "), n += r);
  return n;
}
function X() {
  for (var e3, t, r = 0, n = "", i = arguments.length; r < i; r++) (e3 = arguments[r]) && (t = Ug(e3)) && (n && (n += " "), n += t);
  return n;
}
var C1 = ["dangerouslySetInnerHTML", "onCopy", "onCopyCapture", "onCut", "onCutCapture", "onPaste", "onPasteCapture", "onCompositionEnd", "onCompositionEndCapture", "onCompositionStart", "onCompositionStartCapture", "onCompositionUpdate", "onCompositionUpdateCapture", "onFocus", "onFocusCapture", "onBlur", "onBlurCapture", "onChange", "onChangeCapture", "onBeforeInput", "onBeforeInputCapture", "onInput", "onInputCapture", "onReset", "onResetCapture", "onSubmit", "onSubmitCapture", "onInvalid", "onInvalidCapture", "onLoad", "onLoadCapture", "onError", "onErrorCapture", "onKeyDown", "onKeyDownCapture", "onKeyPress", "onKeyPressCapture", "onKeyUp", "onKeyUpCapture", "onAbort", "onAbortCapture", "onCanPlay", "onCanPlayCapture", "onCanPlayThrough", "onCanPlayThroughCapture", "onDurationChange", "onDurationChangeCapture", "onEmptied", "onEmptiedCapture", "onEncrypted", "onEncryptedCapture", "onEnded", "onEndedCapture", "onLoadedData", "onLoadedDataCapture", "onLoadedMetadata", "onLoadedMetadataCapture", "onLoadStart", "onLoadStartCapture", "onPause", "onPauseCapture", "onPlay", "onPlayCapture", "onPlaying", "onPlayingCapture", "onProgress", "onProgressCapture", "onRateChange", "onRateChangeCapture", "onSeeked", "onSeekedCapture", "onSeeking", "onSeekingCapture", "onStalled", "onStalledCapture", "onSuspend", "onSuspendCapture", "onTimeUpdate", "onTimeUpdateCapture", "onVolumeChange", "onVolumeChangeCapture", "onWaiting", "onWaitingCapture", "onAuxClick", "onAuxClickCapture", "onClick", "onClickCapture", "onContextMenu", "onContextMenuCapture", "onDoubleClick", "onDoubleClickCapture", "onDrag", "onDragCapture", "onDragEnd", "onDragEndCapture", "onDragEnter", "onDragEnterCapture", "onDragExit", "onDragExitCapture", "onDragLeave", "onDragLeaveCapture", "onDragOver", "onDragOverCapture", "onDragStart", "onDragStartCapture", "onDrop", "onDropCapture", "onMouseDown", "onMouseDownCapture", "onMouseEnter", "onMouseLeave", "onMouseMove", "onMouseMoveCapture", "onMouseOut", "onMouseOutCapture", "onMouseOver", "onMouseOverCapture", "onMouseUp", "onMouseUpCapture", "onSelect", "onSelectCapture", "onTouchCancel", "onTouchCancelCapture", "onTouchEnd", "onTouchEndCapture", "onTouchMove", "onTouchMoveCapture", "onTouchStart", "onTouchStartCapture", "onPointerDown", "onPointerDownCapture", "onPointerMove", "onPointerMoveCapture", "onPointerUp", "onPointerUpCapture", "onPointerCancel", "onPointerCancelCapture", "onPointerEnter", "onPointerEnterCapture", "onPointerLeave", "onPointerLeaveCapture", "onPointerOver", "onPointerOverCapture", "onPointerOut", "onPointerOutCapture", "onGotPointerCapture", "onGotPointerCaptureCapture", "onLostPointerCapture", "onLostPointerCaptureCapture", "onScroll", "onScrollCapture", "onWheel", "onWheelCapture", "onAnimationStart", "onAnimationStartCapture", "onAnimationEnd", "onAnimationEndCapture", "onAnimationIteration", "onAnimationIterationCapture", "onTransitionEnd", "onTransitionEndCapture"];
function dc(e3) {
  if (typeof e3 != "string") return false;
  var t = C1;
  return t.includes(e3);
}
var j1 = ["aria-activedescendant", "aria-atomic", "aria-autocomplete", "aria-busy", "aria-checked", "aria-colcount", "aria-colindex", "aria-colspan", "aria-controls", "aria-current", "aria-describedby", "aria-details", "aria-disabled", "aria-errormessage", "aria-expanded", "aria-flowto", "aria-haspopup", "aria-hidden", "aria-invalid", "aria-keyshortcuts", "aria-label", "aria-labelledby", "aria-level", "aria-live", "aria-modal", "aria-multiline", "aria-multiselectable", "aria-orientation", "aria-owns", "aria-placeholder", "aria-posinset", "aria-pressed", "aria-readonly", "aria-relevant", "aria-required", "aria-roledescription", "aria-rowcount", "aria-rowindex", "aria-rowspan", "aria-selected", "aria-setsize", "aria-sort", "aria-valuemax", "aria-valuemin", "aria-valuenow", "aria-valuetext", "className", "color", "height", "id", "lang", "max", "media", "method", "min", "name", "style", "target", "width", "role", "tabIndex", "accentHeight", "accumulate", "additive", "alignmentBaseline", "allowReorder", "alphabetic", "amplitude", "arabicForm", "ascent", "attributeName", "attributeType", "autoReverse", "azimuth", "baseFrequency", "baselineShift", "baseProfile", "bbox", "begin", "bias", "by", "calcMode", "capHeight", "clip", "clipPath", "clipPathUnits", "clipRule", "colorInterpolation", "colorInterpolationFilters", "colorProfile", "colorRendering", "contentScriptType", "contentStyleType", "cursor", "cx", "cy", "d", "decelerate", "descent", "diffuseConstant", "direction", "display", "divisor", "dominantBaseline", "dur", "dx", "dy", "edgeMode", "elevation", "enableBackground", "end", "exponent", "externalResourcesRequired", "fill", "fillOpacity", "fillRule", "filter", "filterRes", "filterUnits", "floodColor", "floodOpacity", "focusable", "fontFamily", "fontSize", "fontSizeAdjust", "fontStretch", "fontStyle", "fontVariant", "fontWeight", "format", "from", "fx", "fy", "g1", "g2", "glyphName", "glyphOrientationHorizontal", "glyphOrientationVertical", "glyphRef", "gradientTransform", "gradientUnits", "hanging", "horizAdvX", "horizOriginX", "href", "ideographic", "imageRendering", "in2", "in", "intercept", "k1", "k2", "k3", "k4", "k", "kernelMatrix", "kernelUnitLength", "kerning", "keyPoints", "keySplines", "keyTimes", "lengthAdjust", "letterSpacing", "lightingColor", "limitingConeAngle", "local", "markerEnd", "markerHeight", "markerMid", "markerStart", "markerUnits", "markerWidth", "mask", "maskContentUnits", "maskUnits", "mathematical", "mode", "numOctaves", "offset", "opacity", "operator", "order", "orient", "orientation", "origin", "overflow", "overlinePosition", "overlineThickness", "paintOrder", "panose1", "pathLength", "patternContentUnits", "patternTransform", "patternUnits", "pointerEvents", "pointsAtX", "pointsAtY", "pointsAtZ", "preserveAlpha", "preserveAspectRatio", "primitiveUnits", "r", "radius", "refX", "refY", "renderingIntent", "repeatCount", "repeatDur", "requiredExtensions", "requiredFeatures", "restart", "result", "rotate", "rx", "ry", "seed", "shapeRendering", "slope", "spacing", "specularConstant", "specularExponent", "speed", "spreadMethod", "startOffset", "stdDeviation", "stemh", "stemv", "stitchTiles", "stopColor", "stopOpacity", "strikethroughPosition", "strikethroughThickness", "string", "stroke", "strokeDasharray", "strokeDashoffset", "strokeLinecap", "strokeLinejoin", "strokeMiterlimit", "strokeOpacity", "strokeWidth", "surfaceScale", "systemLanguage", "tableValues", "targetX", "targetY", "textAnchor", "textDecoration", "textLength", "textRendering", "to", "transform", "u1", "u2", "underlinePosition", "underlineThickness", "unicode", "unicodeBidi", "unicodeRange", "unitsPerEm", "vAlphabetic", "values", "vectorEffect", "version", "vertAdvY", "vertOriginX", "vertOriginY", "vHanging", "vIdeographic", "viewTarget", "visibility", "vMathematical", "widths", "wordSpacing", "writingMode", "x1", "x2", "x", "xChannelSelector", "xHeight", "xlinkActuate", "xlinkArcrole", "xlinkHref", "xlinkRole", "xlinkShow", "xlinkTitle", "xlinkType", "xmlBase", "xmlLang", "xmlns", "xmlnsXlink", "xmlSpace", "y1", "y2", "y", "yChannelSelector", "z", "zoomAndPan", "ref", "key", "angle"], k1 = new Set(j1);
function qg(e3) {
  return typeof e3 != "string" ? false : k1.has(e3);
}
function Vg(e3) {
  return typeof e3 == "string" && e3.startsWith("data-");
}
function ue(e3) {
  if (typeof e3 != "object" || e3 === null) return {};
  var t = {};
  for (var r in e3) Object.prototype.hasOwnProperty.call(e3, r) && (qg(r) || Vg(r)) && (t[r] = e3[r]);
  return t;
}
function Pa(e3) {
  if (e3 == null) return null;
  if (g.isValidElement(e3) && typeof e3.props == "object" && e3.props !== null) {
    var t = e3.props;
    return ue(t);
  }
  return typeof e3 == "object" && !Array.isArray(e3) ? ue(e3) : null;
}
function Tt(e3) {
  var t = {};
  for (var r in e3) Object.prototype.hasOwnProperty.call(e3, r) && (qg(r) || Vg(r) || dc(r)) && (t[r] = e3[r]);
  return t;
}
function I1(e3) {
  return e3 == null ? null : g.isValidElement(e3) ? Tt(e3.props) : typeof e3 == "object" && !Array.isArray(e3) ? Tt(e3) : null;
}
var T1 = ["children", "width", "height", "viewBox", "className", "style", "title", "desc"];
function pu() {
  return pu = Object.assign ? Object.assign.bind() : function(e3) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e3[n] = r[n]);
    }
    return e3;
  }, pu.apply(null, arguments);
}
function N1(e3, t) {
  if (e3 == null) return {};
  var r, n, i = D1(e3, t);
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(e3);
    for (n = 0; n < s.length; n++) r = s[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e3, r) && (i[r] = e3[r]);
  }
  return i;
}
function D1(e3, t) {
  if (e3 == null) return {};
  var r = {};
  for (var n in e3) if ({}.hasOwnProperty.call(e3, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e3[n];
  }
  return r;
}
var Yg = g.forwardRef((e3, t) => {
  var { children: r, width: n, height: i, viewBox: s, className: a, style: o, title: l, desc: u } = e3, c = N1(e3, T1), h = s || { width: n, height: i, x: 0, y: 0 }, f = X("recharts-surface", a);
  return g.createElement("svg", pu({}, Tt(c), { className: f, width: n, height: i, style: o, viewBox: "".concat(h.x, " ").concat(h.y, " ").concat(h.width, " ").concat(h.height), ref: t }), g.createElement("title", null, l), g.createElement("desc", null, u), r);
}), L1 = ["children", "className"];
function mu() {
  return mu = Object.assign ? Object.assign.bind() : function(e3) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e3[n] = r[n]);
    }
    return e3;
  }, mu.apply(null, arguments);
}
function R1(e3, t) {
  if (e3 == null) return {};
  var r, n, i = $1(e3, t);
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(e3);
    for (n = 0; n < s.length; n++) r = s[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e3, r) && (i[r] = e3[r]);
  }
  return i;
}
function $1(e3, t) {
  if (e3 == null) return {};
  var r = {};
  for (var n in e3) if ({}.hasOwnProperty.call(e3, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e3[n];
  }
  return r;
}
var te = g.forwardRef((e3, t) => {
  var { children: r, className: n } = e3, i = R1(e3, L1), s = X("recharts-layer", n);
  return g.createElement("g", mu({ className: s }, Tt(i), { ref: t }), r);
}), z1 = g.createContext(null);
function tt(e3) {
  return function() {
    return e3;
  };
}
const Hg = Math.cos, Ss = Math.sin, ge = Math.sqrt, _s = Math.PI, Sa = 2 * _s, gu = Math.PI, yu = 2 * gu, xr = 1e-6, B1 = yu - xr;
function Gg(e3) {
  this._ += e3[0];
  for (let t = 1, r = e3.length; t < r; ++t) this._ += arguments[t] + e3[t];
}
function F1(e3) {
  let t = Math.floor(e3);
  if (!(t >= 0)) throw new Error(`invalid digits: ${e3}`);
  if (t > 15) return Gg;
  const r = 10 ** t;
  return function(n) {
    this._ += n[0];
    for (let i = 1, s = n.length; i < s; ++i) this._ += Math.round(arguments[i] * r) / r + n[i];
  };
}
class W1 {
  constructor(t) {
    this._x0 = this._y0 = this._x1 = this._y1 = null, this._ = "", this._append = t == null ? Gg : F1(t);
  }
  moveTo(t, r) {
    this._append`M${this._x0 = this._x1 = +t},${this._y0 = this._y1 = +r}`;
  }
  closePath() {
    this._x1 !== null && (this._x1 = this._x0, this._y1 = this._y0, this._append`Z`);
  }
  lineTo(t, r) {
    this._append`L${this._x1 = +t},${this._y1 = +r}`;
  }
  quadraticCurveTo(t, r, n, i) {
    this._append`Q${+t},${+r},${this._x1 = +n},${this._y1 = +i}`;
  }
  bezierCurveTo(t, r, n, i, s, a) {
    this._append`C${+t},${+r},${+n},${+i},${this._x1 = +s},${this._y1 = +a}`;
  }
  arcTo(t, r, n, i, s) {
    if (t = +t, r = +r, n = +n, i = +i, s = +s, s < 0) throw new Error(`negative radius: ${s}`);
    let a = this._x1, o = this._y1, l = n - t, u = i - r, c = a - t, h = o - r, f = c * c + h * h;
    if (this._x1 === null) this._append`M${this._x1 = t},${this._y1 = r}`;
    else if (f > xr) if (!(Math.abs(h * l - u * c) > xr) || !s) this._append`L${this._x1 = t},${this._y1 = r}`;
    else {
      let d = n - a, v = i - o, p = l * l + u * u, m = d * d + v * v, y = Math.sqrt(p), b = Math.sqrt(f), w = s * Math.tan((gu - Math.acos((p + f - m) / (2 * y * b))) / 2), x = w / b, P = w / y;
      Math.abs(x - 1) > xr && this._append`L${t + x * c},${r + x * h}`, this._append`A${s},${s},0,0,${+(h * d > c * v)},${this._x1 = t + P * l},${this._y1 = r + P * u}`;
    }
  }
  arc(t, r, n, i, s, a) {
    if (t = +t, r = +r, n = +n, a = !!a, n < 0) throw new Error(`negative radius: ${n}`);
    let o = n * Math.cos(i), l = n * Math.sin(i), u = t + o, c = r + l, h = 1 ^ a, f = a ? i - s : s - i;
    this._x1 === null ? this._append`M${u},${c}` : (Math.abs(this._x1 - u) > xr || Math.abs(this._y1 - c) > xr) && this._append`L${u},${c}`, n && (f < 0 && (f = f % yu + yu), f > B1 ? this._append`A${n},${n},0,1,${h},${t - o},${r - l}A${n},${n},0,1,${h},${this._x1 = u},${this._y1 = c}` : f > xr && this._append`A${n},${n},0,${+(f >= gu)},${h},${this._x1 = t + n * Math.cos(s)},${this._y1 = r + n * Math.sin(s)}`);
  }
  rect(t, r, n, i) {
    this._append`M${this._x0 = this._x1 = +t},${this._y0 = this._y1 = +r}h${n = +n}v${+i}h${-n}Z`;
  }
  toString() {
    return this._;
  }
}
function vc(e3) {
  let t = 3;
  return e3.digits = function(r) {
    if (!arguments.length) return t;
    if (r == null) t = null;
    else {
      const n = Math.floor(r);
      if (!(n >= 0)) throw new RangeError(`invalid digits: ${r}`);
      t = n;
    }
    return e3;
  }, () => new W1(t);
}
function pc(e3) {
  return typeof e3 == "object" && "length" in e3 ? e3 : Array.from(e3);
}
function Xg(e3) {
  this._context = e3;
}
Xg.prototype = { areaStart: function() {
  this._line = 0;
}, areaEnd: function() {
  this._line = NaN;
}, lineStart: function() {
  this._point = 0;
}, lineEnd: function() {
  (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
}, point: function(e3, t) {
  switch (e3 = +e3, t = +t, this._point) {
    case 0:
      this._point = 1, this._line ? this._context.lineTo(e3, t) : this._context.moveTo(e3, t);
      break;
    case 1:
      this._point = 2;
    default:
      this._context.lineTo(e3, t);
      break;
  }
} };
function _a(e3) {
  return new Xg(e3);
}
function Jg(e3) {
  return e3[0];
}
function Zg(e3) {
  return e3[1];
}
function Qg(e3, t) {
  var r = tt(true), n = null, i = _a, s = null, a = vc(o);
  e3 = typeof e3 == "function" ? e3 : e3 === void 0 ? Jg : tt(e3), t = typeof t == "function" ? t : t === void 0 ? Zg : tt(t);
  function o(l) {
    var u, c = (l = pc(l)).length, h, f = false, d;
    for (n == null && (s = i(d = a())), u = 0; u <= c; ++u) !(u < c && r(h = l[u], u, l)) === f && ((f = !f) ? s.lineStart() : s.lineEnd()), f && s.point(+e3(h, u, l), +t(h, u, l));
    if (d) return s = null, d + "" || null;
  }
  return o.x = function(l) {
    return arguments.length ? (e3 = typeof l == "function" ? l : tt(+l), o) : e3;
  }, o.y = function(l) {
    return arguments.length ? (t = typeof l == "function" ? l : tt(+l), o) : t;
  }, o.defined = function(l) {
    return arguments.length ? (r = typeof l == "function" ? l : tt(!!l), o) : r;
  }, o.curve = function(l) {
    return arguments.length ? (i = l, n != null && (s = i(n)), o) : i;
  }, o.context = function(l) {
    return arguments.length ? (l == null ? n = s = null : s = i(n = l), o) : n;
  }, o;
}
function Vi(e3, t, r) {
  var n = null, i = tt(true), s = null, a = _a, o = null, l = vc(u);
  e3 = typeof e3 == "function" ? e3 : e3 === void 0 ? Jg : tt(+e3), t = typeof t == "function" ? t : tt(t === void 0 ? 0 : +t), r = typeof r == "function" ? r : r === void 0 ? Zg : tt(+r);
  function u(h) {
    var f, d, v, p = (h = pc(h)).length, m, y = false, b, w = new Array(p), x = new Array(p);
    for (s == null && (o = a(b = l())), f = 0; f <= p; ++f) {
      if (!(f < p && i(m = h[f], f, h)) === y) if (y = !y) d = f, o.areaStart(), o.lineStart();
      else {
        for (o.lineEnd(), o.lineStart(), v = f - 1; v >= d; --v) o.point(w[v], x[v]);
        o.lineEnd(), o.areaEnd();
      }
      y && (w[f] = +e3(m, f, h), x[f] = +t(m, f, h), o.point(n ? +n(m, f, h) : w[f], r ? +r(m, f, h) : x[f]));
    }
    if (b) return o = null, b + "" || null;
  }
  function c() {
    return Qg().defined(i).curve(a).context(s);
  }
  return u.x = function(h) {
    return arguments.length ? (e3 = typeof h == "function" ? h : tt(+h), n = null, u) : e3;
  }, u.x0 = function(h) {
    return arguments.length ? (e3 = typeof h == "function" ? h : tt(+h), u) : e3;
  }, u.x1 = function(h) {
    return arguments.length ? (n = h == null ? null : typeof h == "function" ? h : tt(+h), u) : n;
  }, u.y = function(h) {
    return arguments.length ? (t = typeof h == "function" ? h : tt(+h), r = null, u) : t;
  }, u.y0 = function(h) {
    return arguments.length ? (t = typeof h == "function" ? h : tt(+h), u) : t;
  }, u.y1 = function(h) {
    return arguments.length ? (r = h == null ? null : typeof h == "function" ? h : tt(+h), u) : r;
  }, u.lineX0 = u.lineY0 = function() {
    return c().x(e3).y(t);
  }, u.lineY1 = function() {
    return c().x(e3).y(r);
  }, u.lineX1 = function() {
    return c().x(n).y(t);
  }, u.defined = function(h) {
    return arguments.length ? (i = typeof h == "function" ? h : tt(!!h), u) : i;
  }, u.curve = function(h) {
    return arguments.length ? (a = h, s != null && (o = a(s)), u) : a;
  }, u.context = function(h) {
    return arguments.length ? (h == null ? s = o = null : o = a(s = h), u) : s;
  }, u;
}
class ty {
  constructor(t, r) {
    this._context = t, this._x = r;
  }
  areaStart() {
    this._line = 0;
  }
  areaEnd() {
    this._line = NaN;
  }
  lineStart() {
    this._point = 0;
  }
  lineEnd() {
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  }
  point(t, r) {
    switch (t = +t, r = +r, this._point) {
      case 0: {
        this._point = 1, this._line ? this._context.lineTo(t, r) : this._context.moveTo(t, r);
        break;
      }
      case 1:
        this._point = 2;
      default: {
        this._x ? this._context.bezierCurveTo(this._x0 = (this._x0 + t) / 2, this._y0, this._x0, r, t, r) : this._context.bezierCurveTo(this._x0, this._y0 = (this._y0 + r) / 2, t, this._y0, t, r);
        break;
      }
    }
    this._x0 = t, this._y0 = r;
  }
}
function K1(e3) {
  return new ty(e3, true);
}
function U1(e3) {
  return new ty(e3, false);
}
const mc = { draw(e3, t) {
  const r = ge(t / _s);
  e3.moveTo(r, 0), e3.arc(0, 0, r, 0, Sa);
} }, q1 = { draw(e3, t) {
  const r = ge(t / 5) / 2;
  e3.moveTo(-3 * r, -r), e3.lineTo(-r, -r), e3.lineTo(-r, -3 * r), e3.lineTo(r, -3 * r), e3.lineTo(r, -r), e3.lineTo(3 * r, -r), e3.lineTo(3 * r, r), e3.lineTo(r, r), e3.lineTo(r, 3 * r), e3.lineTo(-r, 3 * r), e3.lineTo(-r, r), e3.lineTo(-3 * r, r), e3.closePath();
} }, ey = ge(1 / 3), V1 = ey * 2, Y1 = { draw(e3, t) {
  const r = ge(t / V1), n = r * ey;
  e3.moveTo(0, -r), e3.lineTo(n, 0), e3.lineTo(0, r), e3.lineTo(-n, 0), e3.closePath();
} }, H1 = { draw(e3, t) {
  const r = ge(t), n = -r / 2;
  e3.rect(n, n, r, r);
} }, G1 = 0.8908130915292852, ry = Ss(_s / 10) / Ss(7 * _s / 10), X1 = Ss(Sa / 10) * ry, J1 = -Hg(Sa / 10) * ry, Z1 = { draw(e3, t) {
  const r = ge(t * G1), n = X1 * r, i = J1 * r;
  e3.moveTo(0, -r), e3.lineTo(n, i);
  for (let s = 1; s < 5; ++s) {
    const a = Sa * s / 5, o = Hg(a), l = Ss(a);
    e3.lineTo(l * r, -o * r), e3.lineTo(o * n - l * i, l * n + o * i);
  }
  e3.closePath();
} }, Po = ge(3), Q1 = { draw(e3, t) {
  const r = -ge(t / (Po * 3));
  e3.moveTo(0, r * 2), e3.lineTo(-Po * r, -r), e3.lineTo(Po * r, -r), e3.closePath();
} }, ne = -0.5, ie = ge(3) / 2, bu = 1 / ge(12), tP = (bu / 2 + 1) * 3, eP = { draw(e3, t) {
  const r = ge(t / tP), n = r / 2, i = r * bu, s = n, a = r * bu + r, o = -s, l = a;
  e3.moveTo(n, i), e3.lineTo(s, a), e3.lineTo(o, l), e3.lineTo(ne * n - ie * i, ie * n + ne * i), e3.lineTo(ne * s - ie * a, ie * s + ne * a), e3.lineTo(ne * o - ie * l, ie * o + ne * l), e3.lineTo(ne * n + ie * i, ne * i - ie * n), e3.lineTo(ne * s + ie * a, ne * a - ie * s), e3.lineTo(ne * o + ie * l, ne * l - ie * o), e3.closePath();
} };
function rP(e3, t) {
  let r = null, n = vc(i);
  e3 = typeof e3 == "function" ? e3 : tt(e3 || mc), t = typeof t == "function" ? t : tt(t === void 0 ? 64 : +t);
  function i() {
    let s;
    if (r || (r = s = n()), e3.apply(this, arguments).draw(r, +t.apply(this, arguments)), s) return r = null, s + "" || null;
  }
  return i.type = function(s) {
    return arguments.length ? (e3 = typeof s == "function" ? s : tt(s), i) : e3;
  }, i.size = function(s) {
    return arguments.length ? (t = typeof s == "function" ? s : tt(+s), i) : t;
  }, i.context = function(s) {
    return arguments.length ? (r = s ?? null, i) : r;
  }, i;
}
function Os() {
}
function Ms(e3, t, r) {
  e3._context.bezierCurveTo((2 * e3._x0 + e3._x1) / 3, (2 * e3._y0 + e3._y1) / 3, (e3._x0 + 2 * e3._x1) / 3, (e3._y0 + 2 * e3._y1) / 3, (e3._x0 + 4 * e3._x1 + t) / 6, (e3._y0 + 4 * e3._y1 + r) / 6);
}
function ny(e3) {
  this._context = e3;
}
ny.prototype = { areaStart: function() {
  this._line = 0;
}, areaEnd: function() {
  this._line = NaN;
}, lineStart: function() {
  this._x0 = this._x1 = this._y0 = this._y1 = NaN, this._point = 0;
}, lineEnd: function() {
  switch (this._point) {
    case 3:
      Ms(this, this._x1, this._y1);
    case 2:
      this._context.lineTo(this._x1, this._y1);
      break;
  }
  (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
}, point: function(e3, t) {
  switch (e3 = +e3, t = +t, this._point) {
    case 0:
      this._point = 1, this._line ? this._context.lineTo(e3, t) : this._context.moveTo(e3, t);
      break;
    case 1:
      this._point = 2;
      break;
    case 2:
      this._point = 3, this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6);
    default:
      Ms(this, e3, t);
      break;
  }
  this._x0 = this._x1, this._x1 = e3, this._y0 = this._y1, this._y1 = t;
} };
function nP(e3) {
  return new ny(e3);
}
function iy(e3) {
  this._context = e3;
}
iy.prototype = { areaStart: Os, areaEnd: Os, lineStart: function() {
  this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN, this._point = 0;
}, lineEnd: function() {
  switch (this._point) {
    case 1: {
      this._context.moveTo(this._x2, this._y2), this._context.closePath();
      break;
    }
    case 2: {
      this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3), this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3), this._context.closePath();
      break;
    }
    case 3: {
      this.point(this._x2, this._y2), this.point(this._x3, this._y3), this.point(this._x4, this._y4);
      break;
    }
  }
}, point: function(e3, t) {
  switch (e3 = +e3, t = +t, this._point) {
    case 0:
      this._point = 1, this._x2 = e3, this._y2 = t;
      break;
    case 1:
      this._point = 2, this._x3 = e3, this._y3 = t;
      break;
    case 2:
      this._point = 3, this._x4 = e3, this._y4 = t, this._context.moveTo((this._x0 + 4 * this._x1 + e3) / 6, (this._y0 + 4 * this._y1 + t) / 6);
      break;
    default:
      Ms(this, e3, t);
      break;
  }
  this._x0 = this._x1, this._x1 = e3, this._y0 = this._y1, this._y1 = t;
} };
function iP(e3) {
  return new iy(e3);
}
function sy(e3) {
  this._context = e3;
}
sy.prototype = { areaStart: function() {
  this._line = 0;
}, areaEnd: function() {
  this._line = NaN;
}, lineStart: function() {
  this._x0 = this._x1 = this._y0 = this._y1 = NaN, this._point = 0;
}, lineEnd: function() {
  (this._line || this._line !== 0 && this._point === 3) && this._context.closePath(), this._line = 1 - this._line;
}, point: function(e3, t) {
  switch (e3 = +e3, t = +t, this._point) {
    case 0:
      this._point = 1;
      break;
    case 1:
      this._point = 2;
      break;
    case 2:
      this._point = 3;
      var r = (this._x0 + 4 * this._x1 + e3) / 6, n = (this._y0 + 4 * this._y1 + t) / 6;
      this._line ? this._context.lineTo(r, n) : this._context.moveTo(r, n);
      break;
    case 3:
      this._point = 4;
    default:
      Ms(this, e3, t);
      break;
  }
  this._x0 = this._x1, this._x1 = e3, this._y0 = this._y1, this._y1 = t;
} };
function sP(e3) {
  return new sy(e3);
}
function ay(e3) {
  this._context = e3;
}
ay.prototype = { areaStart: Os, areaEnd: Os, lineStart: function() {
  this._point = 0;
}, lineEnd: function() {
  this._point && this._context.closePath();
}, point: function(e3, t) {
  e3 = +e3, t = +t, this._point ? this._context.lineTo(e3, t) : (this._point = 1, this._context.moveTo(e3, t));
} };
function aP(e3) {
  return new ay(e3);
}
function nf(e3) {
  return e3 < 0 ? -1 : 1;
}
function sf(e3, t, r) {
  var n = e3._x1 - e3._x0, i = t - e3._x1, s = (e3._y1 - e3._y0) / (n || i < 0 && -0), a = (r - e3._y1) / (i || n < 0 && -0), o = (s * i + a * n) / (n + i);
  return (nf(s) + nf(a)) * Math.min(Math.abs(s), Math.abs(a), 0.5 * Math.abs(o)) || 0;
}
function af(e3, t) {
  var r = e3._x1 - e3._x0;
  return r ? (3 * (e3._y1 - e3._y0) / r - t) / 2 : t;
}
function So(e3, t, r) {
  var n = e3._x0, i = e3._y0, s = e3._x1, a = e3._y1, o = (s - n) / 3;
  e3._context.bezierCurveTo(n + o, i + o * t, s - o, a - o * r, s, a);
}
function Es(e3) {
  this._context = e3;
}
Es.prototype = { areaStart: function() {
  this._line = 0;
}, areaEnd: function() {
  this._line = NaN;
}, lineStart: function() {
  this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN, this._point = 0;
}, lineEnd: function() {
  switch (this._point) {
    case 2:
      this._context.lineTo(this._x1, this._y1);
      break;
    case 3:
      So(this, this._t0, af(this, this._t0));
      break;
  }
  (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
}, point: function(e3, t) {
  var r = NaN;
  if (e3 = +e3, t = +t, !(e3 === this._x1 && t === this._y1)) {
    switch (this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(e3, t) : this._context.moveTo(e3, t);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3, So(this, af(this, r = sf(this, e3, t)), r);
        break;
      default:
        So(this, this._t0, r = sf(this, e3, t));
        break;
    }
    this._x0 = this._x1, this._x1 = e3, this._y0 = this._y1, this._y1 = t, this._t0 = r;
  }
} };
function oy(e3) {
  this._context = new ly(e3);
}
(oy.prototype = Object.create(Es.prototype)).point = function(e3, t) {
  Es.prototype.point.call(this, t, e3);
};
function ly(e3) {
  this._context = e3;
}
ly.prototype = { moveTo: function(e3, t) {
  this._context.moveTo(t, e3);
}, closePath: function() {
  this._context.closePath();
}, lineTo: function(e3, t) {
  this._context.lineTo(t, e3);
}, bezierCurveTo: function(e3, t, r, n, i, s) {
  this._context.bezierCurveTo(t, e3, n, r, s, i);
} };
function oP(e3) {
  return new Es(e3);
}
function lP(e3) {
  return new oy(e3);
}
function uy(e3) {
  this._context = e3;
}
uy.prototype = { areaStart: function() {
  this._line = 0;
}, areaEnd: function() {
  this._line = NaN;
}, lineStart: function() {
  this._x = [], this._y = [];
}, lineEnd: function() {
  var e3 = this._x, t = this._y, r = e3.length;
  if (r) if (this._line ? this._context.lineTo(e3[0], t[0]) : this._context.moveTo(e3[0], t[0]), r === 2) this._context.lineTo(e3[1], t[1]);
  else for (var n = of(e3), i = of(t), s = 0, a = 1; a < r; ++s, ++a) this._context.bezierCurveTo(n[0][s], i[0][s], n[1][s], i[1][s], e3[a], t[a]);
  (this._line || this._line !== 0 && r === 1) && this._context.closePath(), this._line = 1 - this._line, this._x = this._y = null;
}, point: function(e3, t) {
  this._x.push(+e3), this._y.push(+t);
} };
function of(e3) {
  var t, r = e3.length - 1, n, i = new Array(r), s = new Array(r), a = new Array(r);
  for (i[0] = 0, s[0] = 2, a[0] = e3[0] + 2 * e3[1], t = 1; t < r - 1; ++t) i[t] = 1, s[t] = 4, a[t] = 4 * e3[t] + 2 * e3[t + 1];
  for (i[r - 1] = 2, s[r - 1] = 7, a[r - 1] = 8 * e3[r - 1] + e3[r], t = 1; t < r; ++t) n = i[t] / s[t - 1], s[t] -= n, a[t] -= n * a[t - 1];
  for (i[r - 1] = a[r - 1] / s[r - 1], t = r - 2; t >= 0; --t) i[t] = (a[t] - i[t + 1]) / s[t];
  for (s[r - 1] = (e3[r] + i[r - 1]) / 2, t = 0; t < r - 1; ++t) s[t] = 2 * e3[t + 1] - i[t + 1];
  return [i, s];
}
function uP(e3) {
  return new uy(e3);
}
function Oa(e3, t) {
  this._context = e3, this._t = t;
}
Oa.prototype = { areaStart: function() {
  this._line = 0;
}, areaEnd: function() {
  this._line = NaN;
}, lineStart: function() {
  this._x = this._y = NaN, this._point = 0;
}, lineEnd: function() {
  0 < this._t && this._t < 1 && this._point === 2 && this._context.lineTo(this._x, this._y), (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line >= 0 && (this._t = 1 - this._t, this._line = 1 - this._line);
}, point: function(e3, t) {
  switch (e3 = +e3, t = +t, this._point) {
    case 0:
      this._point = 1, this._line ? this._context.lineTo(e3, t) : this._context.moveTo(e3, t);
      break;
    case 1:
      this._point = 2;
    default: {
      if (this._t <= 0) this._context.lineTo(this._x, t), this._context.lineTo(e3, t);
      else {
        var r = this._x * (1 - this._t) + e3 * this._t;
        this._context.lineTo(r, this._y), this._context.lineTo(r, t);
      }
      break;
    }
  }
  this._x = e3, this._y = t;
} };
function cP(e3) {
  return new Oa(e3, 0.5);
}
function hP(e3) {
  return new Oa(e3, 0);
}
function fP(e3) {
  return new Oa(e3, 1);
}
function Tr(e3, t) {
  if ((a = e3.length) > 1) for (var r = 1, n, i, s = e3[t[0]], a, o = s.length; r < a; ++r) for (i = s, s = e3[t[r]], n = 0; n < o; ++n) s[n][1] += s[n][0] = isNaN(i[n][1]) ? i[n][0] : i[n][1];
}
function wu(e3) {
  for (var t = e3.length, r = new Array(t); --t >= 0; ) r[t] = t;
  return r;
}
function dP(e3, t) {
  return e3[t];
}
function vP(e3) {
  const t = [];
  return t.key = e3, t;
}
function pP() {
  var e3 = tt([]), t = wu, r = Tr, n = dP;
  function i(s) {
    var a = Array.from(e3.apply(this, arguments), vP), o, l = a.length, u = -1, c;
    for (const h of s) for (o = 0, ++u; o < l; ++o) (a[o][u] = [0, +n(h, a[o].key, u, s)]).data = h;
    for (o = 0, c = pc(t(a)); o < l; ++o) a[c[o]].index = o;
    return r(a, c), a;
  }
  return i.keys = function(s) {
    return arguments.length ? (e3 = typeof s == "function" ? s : tt(Array.from(s)), i) : e3;
  }, i.value = function(s) {
    return arguments.length ? (n = typeof s == "function" ? s : tt(+s), i) : n;
  }, i.order = function(s) {
    return arguments.length ? (t = s == null ? wu : typeof s == "function" ? s : tt(Array.from(s)), i) : t;
  }, i.offset = function(s) {
    return arguments.length ? (r = s ?? Tr, i) : r;
  }, i;
}
function mP(e3, t) {
  if ((n = e3.length) > 0) {
    for (var r, n, i = 0, s = e3[0].length, a; i < s; ++i) {
      for (a = r = 0; r < n; ++r) a += e3[r][i][1] || 0;
      if (a) for (r = 0; r < n; ++r) e3[r][i][1] /= a;
    }
    Tr(e3, t);
  }
}
function gP(e3, t) {
  if ((i = e3.length) > 0) {
    for (var r = 0, n = e3[t[0]], i, s = n.length; r < s; ++r) {
      for (var a = 0, o = 0; a < i; ++a) o += e3[a][r][1] || 0;
      n[r][1] += n[r][0] = -o / 2;
    }
    Tr(e3, t);
  }
}
function yP(e3, t) {
  if (!(!((a = e3.length) > 0) || !((s = (i = e3[t[0]]).length) > 0))) {
    for (var r = 0, n = 1, i, s, a; n < s; ++n) {
      for (var o = 0, l = 0, u = 0; o < a; ++o) {
        for (var c = e3[t[o]], h = c[n][1] || 0, f = c[n - 1][1] || 0, d = (h - f) / 2, v = 0; v < o; ++v) {
          var p = e3[t[v]], m = p[n][1] || 0, y = p[n - 1][1] || 0;
          d += m - y;
        }
        l += h, u += d * h;
      }
      i[n - 1][1] += i[n - 1][0] = r, l && (r -= u / l);
    }
    i[n - 1][1] += i[n - 1][0] = r, Tr(e3, t);
  }
}
var _o = {}, Oo = {}, lf;
function bP() {
  return lf || (lf = 1, (function(e3) {
    Object.defineProperty(e3, Symbol.toStringTag, { value: "Module" });
    function t(r) {
      return r === "__proto__";
    }
    e3.isUnsafeProperty = t;
  })(Oo)), Oo;
}
var Mo = {}, uf;
function cy() {
  return uf || (uf = 1, (function(e3) {
    Object.defineProperty(e3, Symbol.toStringTag, { value: "Module" });
    function t(r) {
      switch (typeof r) {
        case "number":
        case "symbol":
          return false;
        case "string":
          return r.includes(".") || r.includes("[") || r.includes("]");
      }
    }
    e3.isDeepKey = t;
  })(Mo)), Mo;
}
var Eo = {}, cf;
function gc() {
  return cf || (cf = 1, (function(e3) {
    Object.defineProperty(e3, Symbol.toStringTag, { value: "Module" });
    function t(r) {
      var _a3;
      return typeof r == "string" || typeof r == "symbol" ? r : Object.is((_a3 = r == null ? void 0 : r.valueOf) == null ? void 0 : _a3.call(r), -0) ? "-0" : String(r);
    }
    e3.toKey = t;
  })(Eo)), Eo;
}
var Ao = {}, Co = {}, hf;
function wP() {
  return hf || (hf = 1, (function(e3) {
    Object.defineProperty(e3, Symbol.toStringTag, { value: "Module" });
    function t(r) {
      if (r == null) return "";
      if (typeof r == "string") return r;
      if (Array.isArray(r)) return r.map(t).join(",");
      const n = String(r);
      return n === "0" && Object.is(Number(r), -0) ? "-0" : n;
    }
    e3.toString = t;
  })(Co)), Co;
}
var ff;
function yc() {
  return ff || (ff = 1, (function(e3) {
    Object.defineProperty(e3, Symbol.toStringTag, { value: "Module" });
    const t = wP(), r = gc();
    function n(i) {
      if (Array.isArray(i)) return i.map(r.toKey);
      if (typeof i == "symbol") return [i];
      i = t.toString(i);
      const s = [], a = i.length;
      if (a === 0) return s;
      let o = 0, l = "", u = "", c = false;
      for (i.charCodeAt(0) === 46 && (s.push(""), o++); o < a; ) {
        const h = i[o];
        u ? h === "\\" && o + 1 < a ? (o++, l += i[o]) : h === u ? u = "" : l += h : c ? h === '"' || h === "'" ? u = h : h === "]" ? (c = false, s.push(l), l = "") : l += h : h === "[" ? (c = true, l && (s.push(l), l = "")) : h === "." ? l && (s.push(l), l = "") : l += h, o++;
      }
      return l && s.push(l), s;
    }
    e3.toPath = n;
  })(Ao)), Ao;
}
var df;
function bc() {
  return df || (df = 1, (function(e3) {
    Object.defineProperty(e3, Symbol.toStringTag, { value: "Module" });
    const t = bP(), r = cy(), n = gc(), i = yc();
    function s(o, l, u) {
      if (o == null) return u;
      switch (typeof l) {
        case "string": {
          if (t.isUnsafeProperty(l)) return u;
          const c = o[l];
          return c === void 0 ? r.isDeepKey(l) ? s(o, i.toPath(l), u) : u : c;
        }
        case "number":
        case "symbol": {
          typeof l == "number" && (l = n.toKey(l));
          const c = o[l];
          return c === void 0 ? u : c;
        }
        default: {
          if (Array.isArray(l)) return a(o, l, u);
          if (Object.is(l == null ? void 0 : l.valueOf(), -0) ? l = "-0" : l = String(l), t.isUnsafeProperty(l)) return u;
          const c = o[l];
          return c === void 0 ? u : c;
        }
      }
    }
    function a(o, l, u) {
      if (l.length === 0) return u;
      let c = o;
      for (let h = 0; h < l.length; h++) {
        if (c == null || t.isUnsafeProperty(l[h])) return u;
        c = c[l[h]];
      }
      return c === void 0 ? u : c;
    }
    e3.get = s;
  })(_o)), _o;
}
var jo, vf;
function xP() {
  return vf || (vf = 1, jo = bc().get), jo;
}
var PP = xP();
const Ma = fr(PP);
var SP = 4;
function ar(e3) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : SP, r = 10 ** t, n = Math.round(e3 * r) / r;
  return Object.is(n, -0) ? 0 : n;
}
function ot(e3) {
  for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++) r[n - 1] = arguments[n];
  return e3.reduce((i, s, a) => {
    var o = r[a - 1];
    return typeof o == "string" ? i + o + s : o !== void 0 ? i + ar(o) + s : i + s;
  }, "");
}
var ae = (e3) => e3 === 0 ? 0 : e3 > 0 ? 1 : -1, Ce = (e3) => typeof e3 == "number" && e3 != +e3, Nr = (e3) => typeof e3 == "string" && e3.indexOf("%") === e3.length - 1, L = (e3) => (typeof e3 == "number" || e3 instanceof Number) && !Ce(e3), je = (e3) => L(e3) || typeof e3 == "string", _P = 0, ai = (e3) => {
  var t = ++_P;
  return "".concat(e3 || "").concat(t);
}, cr = function(t, r) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0, i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
  if (!L(t) && typeof t != "string") return n;
  var s;
  if (Nr(t)) {
    if (r == null) return n;
    var a = t.indexOf("%");
    s = r * parseFloat(t.slice(0, a)) / 100;
  } else s = +t;
  return Ce(s) && (s = n), i && r != null && s > r && (s = r), s;
}, hy = (e3) => {
  if (!Array.isArray(e3)) return false;
  for (var t = e3.length, r = {}, n = 0; n < t; n++) if (!r[String(e3[n])]) r[String(e3[n])] = true;
  else return true;
  return false;
};
function ut(e3, t, r) {
  return L(e3) && L(t) ? ar(e3 + r * (t - e3)) : t;
}
function fy(e3, t, r) {
  if (!(!e3 || !e3.length)) return e3.find((n) => n && (typeof t == "function" ? t(n) : Ma(n, t)) === r);
}
var mt = (e3) => e3 === null || typeof e3 > "u", Ei = (e3) => mt(e3) ? e3 : "".concat(e3.charAt(0).toUpperCase()).concat(e3.slice(1));
function qt(e3) {
  return e3 != null;
}
function qr() {
}
var OP = ["type", "size", "sizeType"];
function xu() {
  return xu = Object.assign ? Object.assign.bind() : function(e3) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e3[n] = r[n]);
    }
    return e3;
  }, xu.apply(null, arguments);
}
function pf(e3, t) {
  var r = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e3);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e3, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function mf(e3) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? pf(Object(r), true).forEach(function(n) {
      MP(e3, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(r)) : pf(Object(r)).forEach(function(n) {
      Object.defineProperty(e3, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e3;
}
function MP(e3, t, r) {
  return (t = EP(t)) in e3 ? Object.defineProperty(e3, t, { value: r, enumerable: true, configurable: true, writable: true }) : e3[t] = r, e3;
}
function EP(e3) {
  var t = AP(e3, "string");
  return typeof t == "symbol" ? t : t + "";
}
function AP(e3, t) {
  if (typeof e3 != "object" || !e3) return e3;
  var r = e3[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e3, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e3);
}
function CP(e3, t) {
  if (e3 == null) return {};
  var r, n, i = jP(e3, t);
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(e3);
    for (n = 0; n < s.length; n++) r = s[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e3, r) && (i[r] = e3[r]);
  }
  return i;
}
function jP(e3, t) {
  if (e3 == null) return {};
  var r = {};
  for (var n in e3) if ({}.hasOwnProperty.call(e3, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e3[n];
  }
  return r;
}
var dy = { symbolCircle: mc, symbolCross: q1, symbolDiamond: Y1, symbolSquare: H1, symbolStar: Z1, symbolTriangle: Q1, symbolWye: eP }, kP = Math.PI / 180, IP = (e3) => {
  var t = "symbol".concat(Ei(e3));
  return dy[t] || mc;
}, TP = (e3, t, r) => {
  if (t === "area") return e3;
  switch (r) {
    case "cross":
      return 5 * e3 * e3 / 9;
    case "diamond":
      return 0.5 * e3 * e3 / Math.sqrt(3);
    case "square":
      return e3 * e3;
    case "star": {
      var n = 18 * kP;
      return 1.25 * e3 * e3 * (Math.tan(n) - Math.tan(n * 2) * Math.tan(n) ** 2);
    }
    case "triangle":
      return Math.sqrt(3) * e3 * e3 / 4;
    case "wye":
      return (21 - 10 * Math.sqrt(3)) * e3 * e3 / 8;
    default:
      return Math.PI * e3 * e3 / 4;
  }
}, NP = (e3, t) => {
  dy["symbol".concat(Ei(e3))] = t;
}, vy = (e3) => {
  var { type: t = "circle", size: r = 64, sizeType: n = "area" } = e3, i = CP(e3, OP), s = mf(mf({}, i), {}, { type: t, size: r, sizeType: n }), a = "circle";
  typeof t == "string" && (a = t);
  var o = () => {
    var f = IP(a), d = rP().type(f).size(TP(r, n, a)), v = d();
    if (v !== null) return v;
  }, { className: l, cx: u, cy: c } = s, h = Tt(s);
  return L(u) && L(c) && L(r) ? g.createElement("path", xu({}, h, { className: X("recharts-symbols", l), transform: "translate(".concat(u, ", ").concat(c, ")"), d: o() })) : null;
};
vy.registerSymbol = NP;
var py = (e3) => "radius" in e3 && "startAngle" in e3 && "endAngle" in e3, wc = (e3, t) => {
  if (!e3 || typeof e3 == "function" || typeof e3 == "boolean") return null;
  var r = e3;
  if (g.isValidElement(e3) && (r = e3.props), typeof r != "object" && typeof r != "function") return null;
  var n = {};
  return Object.keys(r).forEach((i) => {
    dc(i) && typeof r[i] == "function" && (n[i] = ((s) => r[i](r, s)));
  }), n;
}, DP = (e3, t, r) => (n) => (e3(t, r, n), null), LP = (e3, t, r) => {
  if (e3 === null || typeof e3 != "object" && typeof e3 != "function") return null;
  var n = null;
  return Object.keys(e3).forEach((i) => {
    var s = e3[i];
    dc(i) && typeof s == "function" && (n || (n = {}), n[i] = DP(s, t, r));
  }), n;
};
function gf(e3, t) {
  var r = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e3);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e3, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function RP(e3) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? gf(Object(r), true).forEach(function(n) {
      $P(e3, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(r)) : gf(Object(r)).forEach(function(n) {
      Object.defineProperty(e3, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e3;
}
function $P(e3, t, r) {
  return (t = zP(t)) in e3 ? Object.defineProperty(e3, t, { value: r, enumerable: true, configurable: true, writable: true }) : e3[t] = r, e3;
}
function zP(e3) {
  var t = BP(e3, "string");
  return typeof t == "symbol" ? t : t + "";
}
function BP(e3, t) {
  if (typeof e3 != "object" || !e3) return e3;
  var r = e3[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e3, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e3);
}
function Bt(e3, t) {
  var r = RP({}, e3), n = t, i = Object.keys(t), s = i.reduce((a, o) => (a[o] === void 0 && n[o] !== void 0 && (a[o] = n[o]), a), r);
  return s;
}
var ko = {}, Io = {}, yf;
function FP() {
  return yf || (yf = 1, (function(e3) {
    Object.defineProperty(e3, Symbol.toStringTag, { value: "Module" });
    function t(r, n) {
      const i = /* @__PURE__ */ new Map();
      for (let s = 0; s < r.length; s++) {
        const a = r[s], o = n(a, s, r);
        i.has(o) || i.set(o, a);
      }
      return Array.from(i.values());
    }
    e3.uniqBy = t;
  })(Io)), Io;
}
var To = {}, bf;
function WP() {
  return bf || (bf = 1, (function(e3) {
    Object.defineProperty(e3, Symbol.toStringTag, { value: "Module" });
    function t(r, n) {
      return function(...i) {
        return r.apply(this, i.slice(0, n));
      };
    }
    e3.ary = t;
  })(To)), To;
}
var No = {}, wf;
function my() {
  return wf || (wf = 1, (function(e3) {
    Object.defineProperty(e3, Symbol.toStringTag, { value: "Module" });
    function t(r) {
      return r;
    }
    e3.identity = t;
  })(No)), No;
}
var Do = {}, Lo = {}, Ro = {}, xf;
function KP() {
  return xf || (xf = 1, (function(e3) {
    Object.defineProperty(e3, Symbol.toStringTag, { value: "Module" });
    function t(r) {
      return Number.isSafeInteger(r) && r >= 0;
    }
    e3.isLength = t;
  })(Ro)), Ro;
}
var Pf;
function gy() {
  return Pf || (Pf = 1, (function(e3) {
    Object.defineProperty(e3, Symbol.toStringTag, { value: "Module" });
    const t = KP();
    function r(n) {
      return n != null && typeof n != "function" && t.isLength(n.length);
    }
    e3.isArrayLike = r;
  })(Lo)), Lo;
}
var $o = {}, Sf;
function UP() {
  return Sf || (Sf = 1, (function(e3) {
    Object.defineProperty(e3, Symbol.toStringTag, { value: "Module" });
    function t(r) {
      return typeof r == "object" && r !== null;
    }
    e3.isObjectLike = t;
  })($o)), $o;
}
var _f;
function qP() {
  return _f || (_f = 1, (function(e3) {
    Object.defineProperty(e3, Symbol.toStringTag, { value: "Module" });
    const t = gy(), r = UP();
    function n(i) {
      return r.isObjectLike(i) && t.isArrayLike(i);
    }
    e3.isArrayLikeObject = n;
  })(Do)), Do;
}
var zo = {}, Bo = {}, Of;
function VP() {
  return Of || (Of = 1, (function(e3) {
    Object.defineProperty(e3, Symbol.toStringTag, { value: "Module" });
    const t = bc();
    function r(n) {
      return function(i) {
        return t.get(i, n);
      };
    }
    e3.property = r;
  })(Bo)), Bo;
}
var Fo = {}, Wo = {}, Ko = {}, Uo = {}, Mf;
function yy() {
  return Mf || (Mf = 1, (function(e3) {
    Object.defineProperty(e3, Symbol.toStringTag, { value: "Module" });
    function t(r) {
      return r !== null && (typeof r == "object" || typeof r == "function");
    }
    e3.isObject = t;
  })(Uo)), Uo;
}
var qo = {}, Ef;
function by() {
  return Ef || (Ef = 1, (function(e3) {
    Object.defineProperty(e3, Symbol.toStringTag, { value: "Module" });
    function t(r) {
      return r == null || typeof r != "object" && typeof r != "function";
    }
    e3.isPrimitive = t;
  })(qo)), qo;
}
var Vo = {}, Af;
function wy() {
  return Af || (Af = 1, (function(e3) {
    Object.defineProperty(e3, Symbol.toStringTag, { value: "Module" });
    function t(r, n) {
      return r === n || Number.isNaN(r) && Number.isNaN(n);
    }
    e3.isEqualsSameValueZero = t;
  })(Vo)), Vo;
}
var Cf;
function YP() {
  return Cf || (Cf = 1, (function(e3) {
    Object.defineProperty(e3, Symbol.toStringTag, { value: "Module" });
    const t = yy(), r = by(), n = wy();
    function i(c, h, f) {
      return typeof f != "function" ? i(c, h, () => {
      }) : s(c, h, function d(v, p, m, y, b, w) {
        const x = f(v, p, m, y, b, w);
        return x !== void 0 ? !!x : s(v, p, d, w);
      }, /* @__PURE__ */ new Map());
    }
    function s(c, h, f, d) {
      if (h === c) return true;
      switch (typeof h) {
        case "object":
          return a(c, h, f, d);
        case "function":
          return Object.keys(h).length > 0 ? s(c, { ...h }, f, d) : n.isEqualsSameValueZero(c, h);
        default:
          return t.isObject(c) ? typeof h == "string" ? h === "" : true : n.isEqualsSameValueZero(c, h);
      }
    }
    function a(c, h, f, d) {
      if (h == null) return true;
      if (Array.isArray(h)) return l(c, h, f, d);
      if (h instanceof Map) return o(c, h, f, d);
      if (h instanceof Set) return u(c, h, f, d);
      const v = Object.keys(h);
      if (c == null || r.isPrimitive(c)) return v.length === 0;
      if (v.length === 0) return true;
      if (d == null ? void 0 : d.has(h)) return d.get(h) === c;
      d == null ? void 0 : d.set(h, c);
      try {
        for (let p = 0; p < v.length; p++) {
          const m = v[p];
          if (!r.isPrimitive(c) && !(m in c) || h[m] === void 0 && c[m] !== void 0 || h[m] === null && c[m] !== null || !f(c[m], h[m], m, c, h, d)) return false;
        }
        return true;
      } finally {
        d == null ? void 0 : d.delete(h);
      }
    }
    function o(c, h, f, d) {
      if (h.size === 0) return true;
      if (!(c instanceof Map)) return false;
      for (const [v, p] of h.entries()) {
        const m = c.get(v);
        if (f(m, p, v, c, h, d) === false) return false;
      }
      return true;
    }
    function l(c, h, f, d) {
      if (h.length === 0) return true;
      if (!Array.isArray(c)) return false;
      const v = /* @__PURE__ */ new Set();
      for (let p = 0; p < h.length; p++) {
        const m = h[p];
        let y = false;
        for (let b = 0; b < c.length; b++) {
          if (v.has(b)) continue;
          const w = c[b];
          let x = false;
          if (f(w, m, p, c, h, d) && (x = true), x) {
            v.add(b), y = true;
            break;
          }
        }
        if (!y) return false;
      }
      return true;
    }
    function u(c, h, f, d) {
      return h.size === 0 ? true : c instanceof Set ? l([...c], [...h], f, d) : false;
    }
    e3.isMatchWith = i, e3.isSetMatch = u;
  })(Ko)), Ko;
}
var jf;
function xy() {
  return jf || (jf = 1, (function(e3) {
    Object.defineProperty(e3, Symbol.toStringTag, { value: "Module" });
    const t = YP();
    function r(n, i) {
      return t.isMatchWith(n, i, () => {
      });
    }
    e3.isMatch = r;
  })(Wo)), Wo;
}
var Yo = {}, Ho = {}, Go = {}, kf;
function HP() {
  return kf || (kf = 1, (function(e3) {
    Object.defineProperty(e3, Symbol.toStringTag, { value: "Module" });
    function t(r) {
      return Object.getOwnPropertySymbols(r).filter((n) => Object.prototype.propertyIsEnumerable.call(r, n));
    }
    e3.getSymbols = t;
  })(Go)), Go;
}
var Xo = {}, If;
function xc() {
  return If || (If = 1, (function(e3) {
    Object.defineProperty(e3, Symbol.toStringTag, { value: "Module" });
    function t(r) {
      return r == null ? r === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(r);
    }
    e3.getTag = t;
  })(Xo)), Xo;
}
var Jo = {}, Tf;
function Py() {
  return Tf || (Tf = 1, (function(e3) {
    Object.defineProperty(e3, Symbol.toStringTag, { value: "Module" });
    const t = "[object RegExp]", r = "[object String]", n = "[object Number]", i = "[object Boolean]", s = "[object Arguments]", a = "[object Symbol]", o = "[object Date]", l = "[object Map]", u = "[object Set]", c = "[object Array]", h = "[object Function]", f = "[object ArrayBuffer]", d = "[object Object]", v = "[object Error]", p = "[object DataView]", m = "[object Uint8Array]", y = "[object Uint8ClampedArray]", b = "[object Uint16Array]", w = "[object Uint32Array]", x = "[object BigUint64Array]", P = "[object Int8Array]", S = "[object Int16Array]", _ = "[object Int32Array]", M = "[object BigInt64Array]", A = "[object Float32Array]", j = "[object Float64Array]";
    e3.argumentsTag = s, e3.arrayBufferTag = f, e3.arrayTag = c, e3.bigInt64ArrayTag = M, e3.bigUint64ArrayTag = x, e3.booleanTag = i, e3.dataViewTag = p, e3.dateTag = o, e3.errorTag = v, e3.float32ArrayTag = A, e3.float64ArrayTag = j, e3.functionTag = h, e3.int16ArrayTag = S, e3.int32ArrayTag = _, e3.int8ArrayTag = P, e3.mapTag = l, e3.numberTag = n, e3.objectTag = d, e3.regexpTag = t, e3.setTag = u, e3.stringTag = r, e3.symbolTag = a, e3.uint16ArrayTag = b, e3.uint32ArrayTag = w, e3.uint8ArrayTag = m, e3.uint8ClampedArrayTag = y;
  })(Jo)), Jo;
}
var Zo = {}, Nf;
function GP() {
  return Nf || (Nf = 1, (function(e3) {
    Object.defineProperty(e3, Symbol.toStringTag, { value: "Module" });
    function t(r) {
      return ArrayBuffer.isView(r) && !(r instanceof DataView);
    }
    e3.isTypedArray = t;
  })(Zo)), Zo;
}
var Df;
function Sy() {
  return Df || (Df = 1, (function(e3) {
    Object.defineProperty(e3, Symbol.toStringTag, { value: "Module" });
    const t = HP(), r = xc(), n = Py(), i = by(), s = GP();
    function a(c, h) {
      return o(c, void 0, c, /* @__PURE__ */ new Map(), h);
    }
    function o(c, h, f, d = /* @__PURE__ */ new Map(), v = void 0) {
      const p = v == null ? void 0 : v(c, h, f, d);
      if (p !== void 0) return p;
      if (i.isPrimitive(c)) return c;
      if (d.has(c)) return d.get(c);
      if (Array.isArray(c)) {
        const m = new Array(c.length);
        d.set(c, m);
        for (let y = 0; y < c.length; y++) m[y] = o(c[y], y, f, d, v);
        return Object.hasOwn(c, "index") && (m.index = c.index), Object.hasOwn(c, "input") && (m.input = c.input), m;
      }
      if (c instanceof Date) return new Date(c.getTime());
      if (c instanceof RegExp) {
        const m = new RegExp(c.source, c.flags);
        return m.lastIndex = c.lastIndex, m;
      }
      if (c instanceof Map) {
        const m = /* @__PURE__ */ new Map();
        d.set(c, m);
        for (const [y, b] of c) m.set(y, o(b, y, f, d, v));
        return m;
      }
      if (c instanceof Set) {
        const m = /* @__PURE__ */ new Set();
        d.set(c, m);
        for (const y of c) m.add(o(y, void 0, f, d, v));
        return m;
      }
      if (typeof Buffer < "u" && Buffer.isBuffer(c)) return c.subarray();
      if (s.isTypedArray(c)) {
        const m = new (Object.getPrototypeOf(c)).constructor(c.length);
        d.set(c, m);
        for (let y = 0; y < c.length; y++) m[y] = o(c[y], y, f, d, v);
        return m;
      }
      if (c instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && c instanceof SharedArrayBuffer) return c.slice(0);
      if (c instanceof DataView) {
        const m = new DataView(c.buffer.slice(0), c.byteOffset, c.byteLength);
        return d.set(c, m), l(m, c, f, d, v), m;
      }
      if (typeof File < "u" && c instanceof File) {
        const m = new File([c], c.name, { type: c.type });
        return d.set(c, m), l(m, c, f, d, v), m;
      }
      if (typeof Blob < "u" && c instanceof Blob) {
        const m = new Blob([c], { type: c.type });
        return d.set(c, m), l(m, c, f, d, v), m;
      }
      if (c instanceof Error) {
        const m = structuredClone(c);
        return d.set(c, m), m.message = c.message, m.name = c.name, m.stack = c.stack, m.cause = c.cause, m.constructor = c.constructor, l(m, c, f, d, v), m;
      }
      if (c instanceof Boolean) {
        const m = new Boolean(c.valueOf());
        return d.set(c, m), l(m, c, f, d, v), m;
      }
      if (c instanceof Number) {
        const m = new Number(c.valueOf());
        return d.set(c, m), l(m, c, f, d, v), m;
      }
      if (c instanceof String) {
        const m = new String(c.valueOf());
        return d.set(c, m), l(m, c, f, d, v), m;
      }
      if (typeof c == "object" && u(c)) {
        const m = Object.create(Object.getPrototypeOf(c));
        return d.set(c, m), l(m, c, f, d, v), m;
      }
      return c;
    }
    function l(c, h, f = c, d, v) {
      const p = [...Object.keys(h), ...t.getSymbols(h)];
      for (let m = 0; m < p.length; m++) {
        const y = p[m], b = Object.getOwnPropertyDescriptor(c, y);
        (b == null || b.writable) && (c[y] = o(h[y], y, f, d, v));
      }
    }
    function u(c) {
      switch (r.getTag(c)) {
        case n.argumentsTag:
        case n.arrayTag:
        case n.arrayBufferTag:
        case n.dataViewTag:
        case n.booleanTag:
        case n.dateTag:
        case n.float32ArrayTag:
        case n.float64ArrayTag:
        case n.int8ArrayTag:
        case n.int16ArrayTag:
        case n.int32ArrayTag:
        case n.mapTag:
        case n.numberTag:
        case n.objectTag:
        case n.regexpTag:
        case n.setTag:
        case n.stringTag:
        case n.symbolTag:
        case n.uint8ArrayTag:
        case n.uint8ClampedArrayTag:
        case n.uint16ArrayTag:
        case n.uint32ArrayTag:
          return true;
        default:
          return false;
      }
    }
    e3.cloneDeepWith = a, e3.cloneDeepWithImpl = o, e3.copyProperties = l;
  })(Ho)), Ho;
}
var Lf;
function XP() {
  return Lf || (Lf = 1, (function(e3) {
    Object.defineProperty(e3, Symbol.toStringTag, { value: "Module" });
    const t = Sy();
    function r(n) {
      return t.cloneDeepWithImpl(n, void 0, n, /* @__PURE__ */ new Map(), void 0);
    }
    e3.cloneDeep = r;
  })(Yo)), Yo;
}
var Rf;
function JP() {
  return Rf || (Rf = 1, (function(e3) {
    Object.defineProperty(e3, Symbol.toStringTag, { value: "Module" });
    const t = xy(), r = XP();
    function n(i) {
      return i = r.cloneDeep(i), (s) => t.isMatch(s, i);
    }
    e3.matches = n;
  })(Fo)), Fo;
}
var Qo = {}, tl = {}, el = {}, $f;
function ZP() {
  return $f || ($f = 1, (function(e3) {
    Object.defineProperty(e3, Symbol.toStringTag, { value: "Module" });
    const t = Sy(), r = xc(), n = Py();
    function i(s, a) {
      return t.cloneDeepWith(s, (o, l, u, c) => {
        const h = a == null ? void 0 : a(o, l, u, c);
        if (h !== void 0) return h;
        if (typeof s == "object") {
          if (r.getTag(s) === n.objectTag && typeof s.constructor != "function") {
            const f = {};
            return c.set(s, f), t.copyProperties(f, s, u, c), f;
          }
          switch (Object.prototype.toString.call(s)) {
            case n.numberTag:
            case n.stringTag:
            case n.booleanTag: {
              const f = new s.constructor(s == null ? void 0 : s.valueOf());
              return t.copyProperties(f, s), f;
            }
            case n.argumentsTag: {
              const f = {};
              return t.copyProperties(f, s), f.length = s.length, f[Symbol.iterator] = s[Symbol.iterator], f;
            }
            default:
              return;
          }
        }
      });
    }
    e3.cloneDeepWith = i;
  })(el)), el;
}
var zf;
function QP() {
  return zf || (zf = 1, (function(e3) {
    Object.defineProperty(e3, Symbol.toStringTag, { value: "Module" });
    const t = ZP();
    function r(n) {
      return t.cloneDeepWith(n);
    }
    e3.cloneDeep = r;
  })(tl)), tl;
}
var rl = {}, nl = {}, Bf;
function _y() {
  return Bf || (Bf = 1, (function(e3) {
    Object.defineProperty(e3, Symbol.toStringTag, { value: "Module" });
    const t = /^(?:0|[1-9]\d*)$/;
    function r(n, i = Number.MAX_SAFE_INTEGER) {
      switch (typeof n) {
        case "number":
          return Number.isInteger(n) && n >= 0 && n < i;
        case "symbol":
          return false;
        case "string":
          return t.test(n);
      }
    }
    e3.isIndex = r;
  })(nl)), nl;
}
var il = {}, Ff;
function tS() {
  return Ff || (Ff = 1, (function(e3) {
    Object.defineProperty(e3, Symbol.toStringTag, { value: "Module" });
    const t = xc();
    function r(n) {
      return n !== null && typeof n == "object" && t.getTag(n) === "[object Arguments]";
    }
    e3.isArguments = r;
  })(il)), il;
}
var Wf;
function eS() {
  return Wf || (Wf = 1, (function(e3) {
    Object.defineProperty(e3, Symbol.toStringTag, { value: "Module" });
    const t = cy(), r = _y(), n = tS(), i = yc();
    function s(a, o) {
      let l;
      if (Array.isArray(o) ? l = o : typeof o == "string" && t.isDeepKey(o) && (a == null ? void 0 : a[o]) == null ? l = i.toPath(o) : l = [o], l.length === 0) return false;
      let u = a;
      for (let c = 0; c < l.length; c++) {
        const h = l[c];
        if ((u == null || !Object.hasOwn(u, h)) && !((Array.isArray(u) || n.isArguments(u)) && r.isIndex(h) && h < u.length)) return false;
        u = u[h];
      }
      return true;
    }
    e3.has = s;
  })(rl)), rl;
}
var Kf;
function rS() {
  return Kf || (Kf = 1, (function(e3) {
    Object.defineProperty(e3, Symbol.toStringTag, { value: "Module" });
    const t = xy(), r = gc(), n = QP(), i = bc(), s = eS();
    function a(o, l) {
      switch (typeof o) {
        case "object": {
          Object.is(o == null ? void 0 : o.valueOf(), -0) && (o = "-0");
          break;
        }
        case "number": {
          o = r.toKey(o);
          break;
        }
      }
      return l = n.cloneDeep(l), function(u) {
        const c = i.get(u, o);
        return c === void 0 ? s.has(u, o) : l === void 0 ? c === void 0 : t.isMatch(c, l);
      };
    }
    e3.matchesProperty = a;
  })(Qo)), Qo;
}
var Uf;
function nS() {
  return Uf || (Uf = 1, (function(e3) {
    Object.defineProperty(e3, Symbol.toStringTag, { value: "Module" });
    const t = my(), r = VP(), n = JP(), i = rS();
    function s(a) {
      if (a == null) return t.identity;
      switch (typeof a) {
        case "function":
          return a;
        case "object":
          return Array.isArray(a) && a.length === 2 ? i.matchesProperty(a[0], a[1]) : n.matches(a);
        case "string":
        case "symbol":
        case "number":
          return r.property(a);
      }
    }
    e3.iteratee = s;
  })(zo)), zo;
}
var qf;
function iS() {
  return qf || (qf = 1, (function(e3) {
    Object.defineProperty(e3, Symbol.toStringTag, { value: "Module" });
    const t = FP(), r = WP(), n = my(), i = qP(), s = nS();
    function a(o, l = n.identity) {
      return i.isArrayLikeObject(o) ? t.uniqBy(Array.from(o), r.ary(s.iteratee(l), 1)) : [];
    }
    e3.uniqBy = a;
  })(ko)), ko;
}
var sl, Vf;
function sS() {
  return Vf || (Vf = 1, sl = iS().uniqBy), sl;
}
var aS = sS();
const Yf = fr(aS);
function oS(e3, t, r) {
  return t === true ? Yf(e3, r) : typeof t == "function" ? Yf(e3, t) : e3;
}
var al = { exports: {} }, ol = {}, ll = { exports: {} }, ul = {};
/**
* @license React
* use-sync-external-store-shim.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var Hf;
function lS() {
  if (Hf) return ul;
  Hf = 1;
  var e3 = xa();
  function t(h, f) {
    return h === f && (h !== 0 || 1 / h === 1 / f) || h !== h && f !== f;
  }
  var r = typeof Object.is == "function" ? Object.is : t, n = e3.useState, i = e3.useEffect, s = e3.useLayoutEffect, a = e3.useDebugValue;
  function o(h, f) {
    var d = f(), v = n({ inst: { value: d, getSnapshot: f } }), p = v[0].inst, m = v[1];
    return s(function() {
      p.value = d, p.getSnapshot = f, l(p) && m({ inst: p });
    }, [h, d, f]), i(function() {
      return l(p) && m({ inst: p }), h(function() {
        l(p) && m({ inst: p });
      });
    }, [h]), a(d), d;
  }
  function l(h) {
    var f = h.getSnapshot;
    h = h.value;
    try {
      var d = f();
      return !r(h, d);
    } catch {
      return true;
    }
  }
  function u(h, f) {
    return f();
  }
  var c = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? u : o;
  return ul.useSyncExternalStore = e3.useSyncExternalStore !== void 0 ? e3.useSyncExternalStore : c, ul;
}
var Gf;
function uS() {
  return Gf || (Gf = 1, ll.exports = lS()), ll.exports;
}
/**
* @license React
* use-sync-external-store-shim/with-selector.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var Xf;
function cS() {
  if (Xf) return ol;
  Xf = 1;
  var e3 = xa(), t = uS();
  function r(u, c) {
    return u === c && (u !== 0 || 1 / u === 1 / c) || u !== u && c !== c;
  }
  var n = typeof Object.is == "function" ? Object.is : r, i = t.useSyncExternalStore, s = e3.useRef, a = e3.useEffect, o = e3.useMemo, l = e3.useDebugValue;
  return ol.useSyncExternalStoreWithSelector = function(u, c, h, f, d) {
    var v = s(null);
    if (v.current === null) {
      var p = { hasValue: false, value: null };
      v.current = p;
    } else p = v.current;
    v = o(function() {
      function y(S) {
        if (!b) {
          if (b = true, w = S, S = f(S), d !== void 0 && p.hasValue) {
            var _ = p.value;
            if (d(_, S)) return x = _;
          }
          return x = S;
        }
        if (_ = x, n(w, S)) return _;
        var M = f(S);
        return d !== void 0 && d(_, M) ? (w = S, _) : (w = S, x = M);
      }
      var b = false, w, x, P = h === void 0 ? null : h;
      return [function() {
        return y(c());
      }, P === null ? void 0 : function() {
        return y(P());
      }];
    }, [c, h, f, d]);
    var m = i(u, v[0], v[1]);
    return a(function() {
      p.hasValue = true, p.value = m;
    }, [m]), l(m), m;
  }, ol;
}
var Jf;
function hS() {
  return Jf || (Jf = 1, al.exports = cS()), al.exports;
}
var Oy = hS();
const vF = fr(Oy);
var Pc = g.createContext(null), fS = (e3) => e3, ft = () => {
  var e3 = g.useContext(Pc);
  return e3 ? e3.store.dispatch : fS;
}, ms = () => {
}, dS = () => ms, vS = (e3, t) => e3 === t;
function z(e3) {
  var t = g.useContext(Pc), r = g.useMemo(() => t ? (n) => {
    if (n != null) return e3(n);
  } : ms, [t, e3]);
  return Oy.useSyncExternalStoreWithSelector(t ? t.subscription.addNestedSub : dS, t ? t.store.getState : ms, t ? t.store.getState : ms, r, vS);
}
function pS(e3, t = `expected a function, instead received ${typeof e3}`) {
  if (typeof e3 != "function") throw new TypeError(t);
}
function mS(e3, t = `expected an object, instead received ${typeof e3}`) {
  if (typeof e3 != "object") throw new TypeError(t);
}
function gS(e3, t = "expected all items to be functions, instead received the following types: ") {
  if (!e3.every((r) => typeof r == "function")) {
    const r = e3.map((n) => typeof n == "function" ? `function ${n.name || "unnamed"}()` : typeof n).join(", ");
    throw new TypeError(`${t}[${r}]`);
  }
}
var Zf = (e3) => Array.isArray(e3) ? e3 : [e3];
function yS(e3) {
  const t = Array.isArray(e3[0]) ? e3[0] : e3;
  return gS(t, "createSelector expects all input-selectors to be functions, but received the following types: "), t;
}
function bS(e3, t) {
  const r = [], { length: n } = e3;
  for (let i = 0; i < n; i++) r.push(e3[i].apply(null, t));
  return r;
}
var wS = class {
  constructor(e3) {
    this.value = e3;
  }
  deref() {
    return this.value;
  }
}, xS = typeof WeakRef < "u" ? WeakRef : wS, PS = 0, Qf = 1;
function Yi() {
  return { s: PS, v: void 0, o: null, p: null };
}
function My(e3, t = {}) {
  let r = Yi();
  const { resultEqualityCheck: n } = t;
  let i, s = 0;
  function a() {
    var _a3;
    let o = r;
    const { length: l } = arguments;
    for (let h = 0, f = l; h < f; h++) {
      const d = arguments[h];
      if (typeof d == "function" || typeof d == "object" && d !== null) {
        let v = o.o;
        v === null && (o.o = v = /* @__PURE__ */ new WeakMap());
        const p = v.get(d);
        p === void 0 ? (o = Yi(), v.set(d, o)) : o = p;
      } else {
        let v = o.p;
        v === null && (o.p = v = /* @__PURE__ */ new Map());
        const p = v.get(d);
        p === void 0 ? (o = Yi(), v.set(d, o)) : o = p;
      }
    }
    const u = o;
    let c;
    if (o.s === Qf) c = o.v;
    else if (c = e3.apply(null, arguments), s++, n) {
      const h = ((_a3 = i == null ? void 0 : i.deref) == null ? void 0 : _a3.call(i)) ?? i;
      h != null && n(h, c) && (c = h, s !== 0 && s--), i = typeof c == "object" && c !== null || typeof c == "function" ? new xS(c) : c;
    }
    return u.s = Qf, u.v = c, c;
  }
  return a.clearCache = () => {
    r = Yi(), a.resetResultsCount();
  }, a.resultsCount = () => s, a.resetResultsCount = () => {
    s = 0;
  }, a;
}
function SS(e3, ...t) {
  const r = typeof e3 == "function" ? { memoize: e3, memoizeOptions: t } : e3, n = (...i) => {
    let s = 0, a = 0, o, l = {}, u = i.pop();
    typeof u == "object" && (l = u, u = i.pop()), pS(u, `createSelector expects an output function after the inputs, but received: [${typeof u}]`);
    const c = { ...r, ...l }, { memoize: h, memoizeOptions: f = [], argsMemoize: d = My, argsMemoizeOptions: v = [] } = c, p = Zf(f), m = Zf(v), y = yS(i), b = h(function() {
      return s++, u.apply(null, arguments);
    }, ...p), w = d(function() {
      a++;
      const P = bS(y, arguments);
      return o = b.apply(null, P), o;
    }, ...m);
    return Object.assign(w, { resultFunc: u, memoizedResultFunc: b, dependencies: y, dependencyRecomputations: () => a, resetDependencyRecomputations: () => {
      a = 0;
    }, lastResult: () => o, recomputations: () => s, resetRecomputations: () => {
      s = 0;
    }, memoize: h, argsMemoize: d });
  };
  return Object.assign(n, { withTypes: () => n }), n;
}
var O = SS(My), _S = Object.assign((e3, t = O) => {
  mS(e3, `createStructuredSelector expects first argument to be an object where each property is a selector, instead received a ${typeof e3}`);
  const r = Object.keys(e3), n = r.map((s) => e3[s]);
  return t(n, (...s) => s.reduce((a, o, l) => (a[r[l]] = o, a), {}));
}, { withTypes: () => _S }), cl = {}, hl = {}, fl = {}, td;
function OS() {
  return td || (td = 1, (function(e3) {
    Object.defineProperty(e3, Symbol.toStringTag, { value: "Module" });
    function t(n) {
      return typeof n == "symbol" ? 1 : n === null ? 2 : n === void 0 ? 3 : n !== n ? 4 : 0;
    }
    const r = (n, i, s) => {
      if (n !== i) {
        const a = t(n), o = t(i);
        if (a === o && a === 0) {
          if (n < i) return s === "desc" ? 1 : -1;
          if (n > i) return s === "desc" ? -1 : 1;
        }
        return s === "desc" ? o - a : a - o;
      }
      return 0;
    };
    e3.compareValues = r;
  })(fl)), fl;
}
var dl = {}, vl = {}, ed;
function Ey() {
  return ed || (ed = 1, (function(e3) {
    Object.defineProperty(e3, Symbol.toStringTag, { value: "Module" });
    function t(r) {
      return typeof r == "symbol" || r instanceof Symbol;
    }
    e3.isSymbol = t;
  })(vl)), vl;
}
var rd;
function MS() {
  return rd || (rd = 1, (function(e3) {
    Object.defineProperty(e3, Symbol.toStringTag, { value: "Module" });
    const t = Ey(), r = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, n = /^\w*$/;
    function i(s, a) {
      return Array.isArray(s) ? false : typeof s == "number" || typeof s == "boolean" || s == null || t.isSymbol(s) ? true : typeof s == "string" && (n.test(s) || !r.test(s)) || a != null && Object.hasOwn(a, s);
    }
    e3.isKey = i;
  })(dl)), dl;
}
var nd;
function ES() {
  return nd || (nd = 1, (function(e3) {
    Object.defineProperty(e3, Symbol.toStringTag, { value: "Module" });
    const t = OS(), r = MS(), n = yc();
    function i(s, a, o, l) {
      if (s == null) return [];
      o = l ? void 0 : o, Array.isArray(s) || (s = Object.values(s)), Array.isArray(a) || (a = a == null ? [null] : [a]), a.length === 0 && (a = [null]), Array.isArray(o) || (o = o == null ? [] : [o]), o = o.map((d) => String(d));
      const u = (d, v) => {
        let p = d;
        for (let m = 0; m < v.length && p != null; ++m) p = p[v[m]];
        return p;
      }, c = (d, v) => v == null || d == null ? v : typeof d == "object" && "key" in d ? Object.hasOwn(v, d.key) ? v[d.key] : u(v, d.path) : typeof d == "function" ? d(v) : Array.isArray(d) ? u(v, d) : typeof v == "object" ? v[d] : v, h = a.map((d) => (Array.isArray(d) && d.length === 1 && (d = d[0]), d == null || typeof d == "function" || Array.isArray(d) || r.isKey(d) ? d : { key: d, path: n.toPath(d) }));
      return s.map((d) => ({ original: d, criteria: h.map((v) => c(v, d)) })).slice().sort((d, v) => {
        for (let p = 0; p < h.length; p++) {
          const m = t.compareValues(d.criteria[p], v.criteria[p], o[p]);
          if (m !== 0) return m;
        }
        return 0;
      }).map((d) => d.original);
    }
    e3.orderBy = i;
  })(hl)), hl;
}
var pl = {}, id;
function AS() {
  return id || (id = 1, (function(e3) {
    Object.defineProperty(e3, Symbol.toStringTag, { value: "Module" });
    function t(r, n = 1) {
      const i = [], s = Math.floor(n), a = (o, l) => {
        for (let u = 0; u < o.length; u++) {
          const c = o[u];
          Array.isArray(c) && l < s ? a(c, l + 1) : i.push(c);
        }
      };
      return a(r, 0), i;
    }
    e3.flatten = t;
  })(pl)), pl;
}
var ml = {}, sd;
function Ay() {
  return sd || (sd = 1, (function(e3) {
    Object.defineProperty(e3, Symbol.toStringTag, { value: "Module" });
    const t = _y(), r = gy(), n = yy(), i = wy();
    function s(a, o, l) {
      return n.isObject(l) && (typeof o == "number" && r.isArrayLike(l) && t.isIndex(o) && o < l.length || typeof o == "string" && o in l) ? i.isEqualsSameValueZero(l[o], a) : false;
    }
    e3.isIterateeCall = s;
  })(ml)), ml;
}
var ad;
function CS() {
  return ad || (ad = 1, (function(e3) {
    Object.defineProperty(e3, Symbol.toStringTag, { value: "Module" });
    const t = ES(), r = AS(), n = Ay();
    function i(s, ...a) {
      const o = a.length;
      return o > 1 && n.isIterateeCall(s, a[0], a[1]) ? a = [] : o > 2 && n.isIterateeCall(a[0], a[1], a[2]) && (a = [a[0]]), t.orderBy(s, r.flatten(a), ["asc"]);
    }
    e3.sortBy = i;
  })(cl)), cl;
}
var gl, od;
function jS() {
  return od || (od = 1, gl = CS().sortBy), gl;
}
var kS = jS();
const Ea = fr(kS);
var Cy = (e3) => e3.legend.settings, IS = (e3) => e3.legend.size, TS = (e3) => e3.legend.payload;
O([TS, Cy], (e3, t) => {
  var { itemSorter: r } = t, n = e3.flat(1);
  return r ? Ea(n, r) : n;
});
var Hi = 1;
function NS() {
  var e3 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], [t, r] = g.useState({ height: 0, left: 0, top: 0, width: 0 }), n = g.useCallback((i) => {
    if (i != null) {
      var s = i.getBoundingClientRect(), a = { height: s.height, left: s.left, top: s.top, width: s.width };
      (Math.abs(a.height - t.height) > Hi || Math.abs(a.left - t.left) > Hi || Math.abs(a.top - t.top) > Hi || Math.abs(a.width - t.width) > Hi) && r({ height: a.height, left: a.left, top: a.top, width: a.width });
    }
  }, [t.width, t.height, t.top, t.left, ...e3]);
  return [t, n];
}
function St(e3) {
  return `Minified Redux error #${e3}; visit https://redux.js.org/Errors?code=${e3} for the full message or use the non-minified dev environment for full errors. `;
}
var DS = typeof Symbol == "function" && Symbol.observable || "@@observable", ld = DS, yl = () => Math.random().toString(36).substring(7).split("").join("."), LS = { INIT: `@@redux/INIT${yl()}`, REPLACE: `@@redux/REPLACE${yl()}`, PROBE_UNKNOWN_ACTION: () => `@@redux/PROBE_UNKNOWN_ACTION${yl()}` }, As = LS;
function Sc(e3) {
  if (typeof e3 != "object" || e3 === null) return false;
  let t = e3;
  for (; Object.getPrototypeOf(t) !== null; ) t = Object.getPrototypeOf(t);
  return Object.getPrototypeOf(e3) === t || Object.getPrototypeOf(e3) === null;
}
function jy(e3, t, r) {
  if (typeof e3 != "function") throw new Error(St(2));
  if (typeof t == "function" && typeof r == "function" || typeof r == "function" && typeof arguments[3] == "function") throw new Error(St(0));
  if (typeof t == "function" && typeof r > "u" && (r = t, t = void 0), typeof r < "u") {
    if (typeof r != "function") throw new Error(St(1));
    return r(jy)(e3, t);
  }
  let n = e3, i = t, s = /* @__PURE__ */ new Map(), a = s, o = 0, l = false;
  function u() {
    a === s && (a = /* @__PURE__ */ new Map(), s.forEach((m, y) => {
      a.set(y, m);
    }));
  }
  function c() {
    if (l) throw new Error(St(3));
    return i;
  }
  function h(m) {
    if (typeof m != "function") throw new Error(St(4));
    if (l) throw new Error(St(5));
    let y = true;
    u();
    const b = o++;
    return a.set(b, m), function() {
      if (y) {
        if (l) throw new Error(St(6));
        y = false, u(), a.delete(b), s = null;
      }
    };
  }
  function f(m) {
    if (!Sc(m)) throw new Error(St(7));
    if (typeof m.type > "u") throw new Error(St(8));
    if (typeof m.type != "string") throw new Error(St(17));
    if (l) throw new Error(St(9));
    try {
      l = true, i = n(i, m);
    } finally {
      l = false;
    }
    return (s = a).forEach((b) => {
      b();
    }), m;
  }
  function d(m) {
    if (typeof m != "function") throw new Error(St(10));
    n = m, f({ type: As.REPLACE });
  }
  function v() {
    const m = h;
    return { subscribe(y) {
      if (typeof y != "object" || y === null) throw new Error(St(11));
      function b() {
        const x = y;
        x.next && x.next(c());
      }
      return b(), { unsubscribe: m(b) };
    }, [ld]() {
      return this;
    } };
  }
  return f({ type: As.INIT }), { dispatch: f, subscribe: h, getState: c, replaceReducer: d, [ld]: v };
}
function RS(e3) {
  Object.keys(e3).forEach((t) => {
    const r = e3[t];
    if (typeof r(void 0, { type: As.INIT }) > "u") throw new Error(St(12));
    if (typeof r(void 0, { type: As.PROBE_UNKNOWN_ACTION() }) > "u") throw new Error(St(13));
  });
}
function ky(e3) {
  const t = Object.keys(e3), r = {};
  for (let s = 0; s < t.length; s++) {
    const a = t[s];
    typeof e3[a] == "function" && (r[a] = e3[a]);
  }
  const n = Object.keys(r);
  let i;
  try {
    RS(r);
  } catch (s) {
    i = s;
  }
  return function(a = {}, o) {
    if (i) throw i;
    let l = false;
    const u = {};
    for (let c = 0; c < n.length; c++) {
      const h = n[c], f = r[h], d = a[h], v = f(d, o);
      if (typeof v > "u") throw o && o.type, new Error(St(14));
      u[h] = v, l = l || v !== d;
    }
    return l = l || n.length !== Object.keys(a).length, l ? u : a;
  };
}
function Cs(...e3) {
  return e3.length === 0 ? (t) => t : e3.length === 1 ? e3[0] : e3.reduce((t, r) => (...n) => t(r(...n)));
}
function $S(...e3) {
  return (t) => (r, n) => {
    const i = t(r, n);
    let s = () => {
      throw new Error(St(15));
    };
    const a = { getState: i.getState, dispatch: (l, ...u) => s(l, ...u) }, o = e3.map((l) => l(a));
    return s = Cs(...o)(i.dispatch), { ...i, dispatch: s };
  };
}
function Iy(e3) {
  return Sc(e3) && "type" in e3 && typeof e3.type == "string";
}
var Ty = Symbol.for("immer-nothing"), ud = Symbol.for("immer-draftable"), zt = Symbol.for("immer-state");
function de(e3, ...t) {
  throw new Error(`[Immer] minified error nr: ${e3}. Full error at: https://bit.ly/3cXEKWf`);
}
var Jt = Object, yn = Jt.getPrototypeOf, js = "constructor", Aa = "prototype", Pu = "configurable", ks = "enumerable", gs = "writable", oi = "value", Ue = (e3) => !!e3 && !!e3[zt];
function me(e3) {
  var _a3;
  return e3 ? Ny(e3) || ja(e3) || !!e3[ud] || !!((_a3 = e3[js]) == null ? void 0 : _a3[ud]) || ka(e3) || Ia(e3) : false;
}
var zS = Jt[Aa][js].toString(), cd = /* @__PURE__ */ new WeakMap();
function Ny(e3) {
  if (!e3 || !_c(e3)) return false;
  const t = yn(e3);
  if (t === null || t === Jt[Aa]) return true;
  const r = Jt.hasOwnProperty.call(t, js) && t[js];
  if (r === Object) return true;
  if (!an(r)) return false;
  let n = cd.get(r);
  return n === void 0 && (n = Function.toString.call(r), cd.set(r, n)), n === zS;
}
function Ca(e3, t, r = true) {
  Ai(e3) === 0 ? (r ? Reflect.ownKeys(e3) : Jt.keys(e3)).forEach((i) => {
    t(i, e3[i], e3);
  }) : e3.forEach((n, i) => t(i, n, e3));
}
function Ai(e3) {
  const t = e3[zt];
  return t ? t.type_ : ja(e3) ? 1 : ka(e3) ? 2 : Ia(e3) ? 3 : 0;
}
var hd = (e3, t, r = Ai(e3)) => r === 2 ? e3.has(t) : Jt[Aa].hasOwnProperty.call(e3, t), Su = (e3, t, r = Ai(e3)) => r === 2 ? e3.get(t) : e3[t], Is = (e3, t, r, n = Ai(e3)) => {
  n === 2 ? e3.set(t, r) : n === 3 ? e3.add(r) : e3[t] = r;
};
function BS(e3, t) {
  return e3 === t ? e3 !== 0 || 1 / e3 === 1 / t : e3 !== e3 && t !== t;
}
var ja = Array.isArray, ka = (e3) => e3 instanceof Map, Ia = (e3) => e3 instanceof Set, _c = (e3) => typeof e3 == "object", an = (e3) => typeof e3 == "function", bl = (e3) => typeof e3 == "boolean";
function FS(e3) {
  const t = +e3;
  return Number.isInteger(t) && String(t) === e3;
}
var Le = (e3) => e3.copy_ || e3.base_, Oc = (e3) => e3.modified_ ? e3.copy_ : e3.base_;
function _u(e3, t) {
  if (ka(e3)) return new Map(e3);
  if (Ia(e3)) return new Set(e3);
  if (ja(e3)) return Array[Aa].slice.call(e3);
  const r = Ny(e3);
  if (t === true || t === "class_only" && !r) {
    const n = Jt.getOwnPropertyDescriptors(e3);
    delete n[zt];
    let i = Reflect.ownKeys(n);
    for (let s = 0; s < i.length; s++) {
      const a = i[s], o = n[a];
      o[gs] === false && (o[gs] = true, o[Pu] = true), (o.get || o.set) && (n[a] = { [Pu]: true, [gs]: true, [ks]: o[ks], [oi]: e3[a] });
    }
    return Jt.create(yn(e3), n);
  } else {
    const n = yn(e3);
    if (n !== null && r) return { ...e3 };
    const i = Jt.create(n);
    return Jt.assign(i, e3);
  }
}
function Mc(e3, t = false) {
  return Ta(e3) || Ue(e3) || !me(e3) || (Ai(e3) > 1 && Jt.defineProperties(e3, { set: Gi, add: Gi, clear: Gi, delete: Gi }), Jt.freeze(e3), t && Ca(e3, (r, n) => {
    Mc(n, true);
  }, false)), e3;
}
function WS() {
  de(2);
}
var Gi = { [oi]: WS };
function Ta(e3) {
  return e3 === null || !_c(e3) ? true : Jt.isFrozen(e3);
}
var Ts = "MapSet", Ou = "Patches", fd = "ArrayMethods", Dy = {};
function Dr(e3) {
  const t = Dy[e3];
  return t || de(0, e3), t;
}
var dd = (e3) => !!Dy[e3], li, Ly = () => li, KS = (e3, t) => ({ drafts_: [], parent_: e3, immer_: t, canAutoFreeze_: true, unfinalizedDrafts_: 0, handledSet_: /* @__PURE__ */ new Set(), processedForPatches_: /* @__PURE__ */ new Set(), mapSetPlugin_: dd(Ts) ? Dr(Ts) : void 0, arrayMethodsPlugin_: dd(fd) ? Dr(fd) : void 0 });
function vd(e3, t) {
  t && (e3.patchPlugin_ = Dr(Ou), e3.patches_ = [], e3.inversePatches_ = [], e3.patchListener_ = t);
}
function Mu(e3) {
  Eu(e3), e3.drafts_.forEach(US), e3.drafts_ = null;
}
function Eu(e3) {
  e3 === li && (li = e3.parent_);
}
var pd = (e3) => li = KS(li, e3);
function US(e3) {
  const t = e3[zt];
  t.type_ === 0 || t.type_ === 1 ? t.revoke_() : t.revoked_ = true;
}
function md(e3, t) {
  t.unfinalizedDrafts_ = t.drafts_.length;
  const r = t.drafts_[0];
  if (e3 !== void 0 && e3 !== r) {
    r[zt].modified_ && (Mu(t), de(4)), me(e3) && (e3 = gd(t, e3));
    const { patchPlugin_: i } = t;
    i && i.generateReplacementPatches_(r[zt].base_, e3, t);
  } else e3 = gd(t, r);
  return qS(t, e3, true), Mu(t), t.patches_ && t.patchListener_(t.patches_, t.inversePatches_), e3 !== Ty ? e3 : void 0;
}
function gd(e3, t) {
  if (Ta(t)) return t;
  const r = t[zt];
  if (!r) return Ns(t, e3.handledSet_, e3);
  if (!Na(r, e3)) return t;
  if (!r.modified_) return r.base_;
  if (!r.finalized_) {
    const { callbacks_: n } = r;
    if (n) for (; n.length > 0; ) n.pop()(e3);
    zy(r, e3);
  }
  return r.copy_;
}
function qS(e3, t, r = false) {
  !e3.parent_ && e3.immer_.autoFreeze_ && e3.canAutoFreeze_ && Mc(t, r);
}
function Ry(e3) {
  e3.finalized_ = true, e3.scope_.unfinalizedDrafts_--;
}
var Na = (e3, t) => e3.scope_ === t, VS = [];
function $y(e3, t, r, n) {
  const i = Le(e3), s = e3.type_;
  if (n !== void 0 && Su(i, n, s) === t) {
    Is(i, n, r, s);
    return;
  }
  if (!e3.draftLocations_) {
    const o = e3.draftLocations_ = /* @__PURE__ */ new Map();
    Ca(i, (l, u) => {
      if (Ue(u)) {
        const c = o.get(u) || [];
        c.push(l), o.set(u, c);
      }
    });
  }
  const a = e3.draftLocations_.get(t) ?? VS;
  for (const o of a) Is(i, o, r, s);
}
function YS(e3, t, r) {
  e3.callbacks_.push(function(i) {
    var _a3;
    const s = t;
    if (!s || !Na(s, i)) return;
    (_a3 = i.mapSetPlugin_) == null ? void 0 : _a3.fixSetContents(s);
    const a = Oc(s);
    $y(e3, s.draft_ ?? s, a, r), zy(s, i);
  });
}
function zy(e3, t) {
  var _a3;
  if (e3.modified_ && !e3.finalized_ && (e3.type_ === 3 || e3.type_ === 1 && e3.allIndicesReassigned_ || (((_a3 = e3.assigned_) == null ? void 0 : _a3.size) ?? 0) > 0)) {
    const { patchPlugin_: n } = t;
    if (n) {
      const i = n.getPath(e3);
      i && n.generatePatches_(e3, i, t);
    }
    Ry(e3);
  }
}
function HS(e3, t, r) {
  const { scope_: n } = e3;
  if (Ue(r)) {
    const i = r[zt];
    Na(i, n) && i.callbacks_.push(function() {
      ys(e3);
      const a = Oc(i);
      $y(e3, r, a, t);
    });
  } else me(r) && e3.callbacks_.push(function() {
    const s = Le(e3);
    e3.type_ === 3 ? s.has(r) && Ns(r, n.handledSet_, n) : Su(s, t, e3.type_) === r && n.drafts_.length > 1 && (e3.assigned_.get(t) ?? false) === true && e3.copy_ && Ns(Su(e3.copy_, t, e3.type_), n.handledSet_, n);
  });
}
function Ns(e3, t, r) {
  return !r.immer_.autoFreeze_ && r.unfinalizedDrafts_ < 1 || Ue(e3) || t.has(e3) || !me(e3) || Ta(e3) || (t.add(e3), Ca(e3, (n, i) => {
    if (Ue(i)) {
      const s = i[zt];
      if (Na(s, r)) {
        const a = Oc(s);
        Is(e3, n, a, e3.type_), Ry(s);
      }
    } else me(i) && Ns(i, t, r);
  })), e3;
}
function GS(e3, t) {
  const r = ja(e3), n = { type_: r ? 1 : 0, scope_: t ? t.scope_ : Ly(), modified_: false, finalized_: false, assigned_: void 0, parent_: t, base_: e3, draft_: null, copy_: null, revoke_: null, isManual_: false, callbacks_: void 0 };
  let i = n, s = Ds;
  r && (i = [n], s = ui);
  const { revoke: a, proxy: o } = Proxy.revocable(i, s);
  return n.draft_ = o, n.revoke_ = a, [o, n];
}
var Ds = { get(e3, t) {
  if (t === zt) return e3;
  let r = e3.scope_.arrayMethodsPlugin_;
  const n = e3.type_ === 1 && typeof t == "string";
  if (n && (r == null ? void 0 : r.isArrayOperationMethod(t))) return r.createMethodInterceptor(e3, t);
  const i = Le(e3);
  if (!hd(i, t, e3.type_)) return XS(e3, i, t);
  const s = i[t];
  if (e3.finalized_ || !me(s) || n && e3.operationMethod && (r == null ? void 0 : r.isMutatingArrayMethod(e3.operationMethod)) && FS(t)) return s;
  if (s === wl(e3.base_, t)) {
    ys(e3);
    const a = e3.type_ === 1 ? +t : t, o = Cu(e3.scope_, s, e3, a);
    return e3.copy_[a] = o;
  }
  return s;
}, has(e3, t) {
  return t in Le(e3);
}, ownKeys(e3) {
  return Reflect.ownKeys(Le(e3));
}, set(e3, t, r) {
  const n = By(Le(e3), t);
  if (n == null ? void 0 : n.set) return n.set.call(e3.draft_, r), true;
  if (!e3.modified_) {
    const i = wl(Le(e3), t), s = i == null ? void 0 : i[zt];
    if (s && s.base_ === r) return e3.copy_[t] = r, e3.assigned_.set(t, false), true;
    if (BS(r, i) && (r !== void 0 || hd(e3.base_, t, e3.type_))) return true;
    ys(e3), Au(e3);
  }
  return e3.copy_[t] === r && (r !== void 0 || t in e3.copy_) || Number.isNaN(r) && Number.isNaN(e3.copy_[t]) || (e3.copy_[t] = r, e3.assigned_.set(t, true), HS(e3, t, r)), true;
}, deleteProperty(e3, t) {
  return ys(e3), wl(e3.base_, t) !== void 0 || t in e3.base_ ? (e3.assigned_.set(t, false), Au(e3)) : e3.assigned_.delete(t), e3.copy_ && delete e3.copy_[t], true;
}, getOwnPropertyDescriptor(e3, t) {
  const r = Le(e3), n = Reflect.getOwnPropertyDescriptor(r, t);
  return n && { [gs]: true, [Pu]: e3.type_ !== 1 || t !== "length", [ks]: n[ks], [oi]: r[t] };
}, defineProperty() {
  de(11);
}, getPrototypeOf(e3) {
  return yn(e3.base_);
}, setPrototypeOf() {
  de(12);
} }, ui = {};
for (let e3 in Ds) {
  let t = Ds[e3];
  ui[e3] = function() {
    const r = arguments;
    return r[0] = r[0][0], t.apply(this, r);
  };
}
ui.deleteProperty = function(e3, t) {
  return ui.set.call(this, e3, t, void 0);
};
ui.set = function(e3, t, r) {
  return Ds.set.call(this, e3[0], t, r, e3[0]);
};
function wl(e3, t) {
  const r = e3[zt];
  return (r ? Le(r) : e3)[t];
}
function XS(e3, t, r) {
  var _a3;
  const n = By(t, r);
  return n ? oi in n ? n[oi] : (_a3 = n.get) == null ? void 0 : _a3.call(e3.draft_) : void 0;
}
function By(e3, t) {
  if (!(t in e3)) return;
  let r = yn(e3);
  for (; r; ) {
    const n = Object.getOwnPropertyDescriptor(r, t);
    if (n) return n;
    r = yn(r);
  }
}
function Au(e3) {
  e3.modified_ || (e3.modified_ = true, e3.parent_ && Au(e3.parent_));
}
function ys(e3) {
  e3.copy_ || (e3.assigned_ = /* @__PURE__ */ new Map(), e3.copy_ = _u(e3.base_, e3.scope_.immer_.useStrictShallowCopy_));
}
var JS = class {
  constructor(t) {
    this.autoFreeze_ = true, this.useStrictShallowCopy_ = false, this.useStrictIteration_ = false, this.produce = (r, n, i) => {
      if (an(r) && !an(n)) {
        const a = n;
        n = r;
        const o = this;
        return function(u = a, ...c) {
          return o.produce(u, (h) => n.call(this, h, ...c));
        };
      }
      an(n) || de(6), i !== void 0 && !an(i) && de(7);
      let s;
      if (me(r)) {
        const a = pd(this), o = Cu(a, r, void 0);
        let l = true;
        try {
          s = n(o), l = false;
        } finally {
          l ? Mu(a) : Eu(a);
        }
        return vd(a, i), md(s, a);
      } else if (!r || !_c(r)) {
        if (s = n(r), s === void 0 && (s = r), s === Ty && (s = void 0), this.autoFreeze_ && Mc(s, true), i) {
          const a = [], o = [];
          Dr(Ou).generateReplacementPatches_(r, s, { patches_: a, inversePatches_: o }), i(a, o);
        }
        return s;
      } else de(1, r);
    }, this.produceWithPatches = (r, n) => {
      if (an(r)) return (o, ...l) => this.produceWithPatches(o, (u) => r(u, ...l));
      let i, s;
      return [this.produce(r, n, (o, l) => {
        i = o, s = l;
      }), i, s];
    }, bl(t == null ? void 0 : t.autoFreeze) && this.setAutoFreeze(t.autoFreeze), bl(t == null ? void 0 : t.useStrictShallowCopy) && this.setUseStrictShallowCopy(t.useStrictShallowCopy), bl(t == null ? void 0 : t.useStrictIteration) && this.setUseStrictIteration(t.useStrictIteration);
  }
  createDraft(t) {
    me(t) || de(8), Ue(t) && (t = oe(t));
    const r = pd(this), n = Cu(r, t, void 0);
    return n[zt].isManual_ = true, Eu(r), n;
  }
  finishDraft(t, r) {
    const n = t && t[zt];
    (!n || !n.isManual_) && de(9);
    const { scope_: i } = n;
    return vd(i, r), md(void 0, i);
  }
  setAutoFreeze(t) {
    this.autoFreeze_ = t;
  }
  setUseStrictShallowCopy(t) {
    this.useStrictShallowCopy_ = t;
  }
  setUseStrictIteration(t) {
    this.useStrictIteration_ = t;
  }
  shouldUseStrictIteration() {
    return this.useStrictIteration_;
  }
  applyPatches(t, r) {
    let n;
    for (n = r.length - 1; n >= 0; n--) {
      const s = r[n];
      if (s.path.length === 0 && s.op === "replace") {
        t = s.value;
        break;
      }
    }
    n > -1 && (r = r.slice(n + 1));
    const i = Dr(Ou).applyPatches_;
    return Ue(t) ? i(t, r) : this.produce(t, (s) => i(s, r));
  }
};
function Cu(e3, t, r, n) {
  const [i, s] = ka(t) ? Dr(Ts).proxyMap_(t, r) : Ia(t) ? Dr(Ts).proxySet_(t, r) : GS(t, r);
  return ((r == null ? void 0 : r.scope_) ?? Ly()).drafts_.push(i), s.callbacks_ = (r == null ? void 0 : r.callbacks_) ?? [], s.key_ = n, r && n !== void 0 ? YS(r, s, n) : s.callbacks_.push(function(l) {
    var _a3;
    (_a3 = l.mapSetPlugin_) == null ? void 0 : _a3.fixSetContents(s);
    const { patchPlugin_: u } = l;
    s.modified_ && u && u.generatePatches_(s, [], l);
  }), i;
}
function oe(e3) {
  return Ue(e3) || de(10, e3), Fy(e3);
}
function Fy(e3) {
  if (!me(e3) || Ta(e3)) return e3;
  const t = e3[zt];
  let r, n = true;
  if (t) {
    if (!t.modified_) return t.base_;
    t.finalized_ = true, r = _u(e3, t.scope_.immer_.useStrictShallowCopy_), n = t.scope_.immer_.shouldUseStrictIteration();
  } else r = _u(e3, true);
  return Ca(r, (i, s) => {
    Is(r, i, Fy(s));
  }, n), t && (t.finalized_ = false), r;
}
var ZS = new JS(), Wy = ZS.produce;
function Ky(e3) {
  return ({ dispatch: r, getState: n }) => (i) => (s) => typeof s == "function" ? s(r, n, e3) : i(s);
}
var QS = Ky(), t_ = Ky, e_ = typeof window < "u" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : function() {
  if (arguments.length !== 0) return typeof arguments[0] == "object" ? Cs : Cs.apply(null, arguments);
};
function ee(e3, t) {
  function r(...n) {
    if (t) {
      let i = t(...n);
      if (!i) throw new Error(Zt(0));
      return { type: e3, payload: i.payload, ..."meta" in i && { meta: i.meta }, ..."error" in i && { error: i.error } };
    }
    return { type: e3, payload: n[0] };
  }
  return r.toString = () => `${e3}`, r.type = e3, r.match = (n) => Iy(n) && n.type === e3, r;
}
var Uy = class Jn extends Array {
  constructor(...t) {
    super(...t), Object.setPrototypeOf(this, Jn.prototype);
  }
  static get [Symbol.species]() {
    return Jn;
  }
  concat(...t) {
    return super.concat.apply(this, t);
  }
  prepend(...t) {
    return t.length === 1 && Array.isArray(t[0]) ? new Jn(...t[0].concat(this)) : new Jn(...t.concat(this));
  }
};
function yd(e3) {
  return me(e3) ? Wy(e3, () => {
  }) : e3;
}
function Xi(e3, t, r) {
  return e3.has(t) ? e3.get(t) : e3.set(t, r(t)).get(t);
}
function r_(e3) {
  return typeof e3 == "boolean";
}
var n_ = () => function(t) {
  const { thunk: r = true, immutableCheck: n = true, serializableCheck: i = true, actionCreatorCheck: s = true } = t ?? {};
  let a = new Uy();
  return r && (r_(r) ? a.push(QS) : a.push(t_(r.extraArgument))), a;
}, qy = "RTK_autoBatch", rt = () => (e3) => ({ payload: e3, meta: { [qy]: true } }), bd = (e3) => (t) => {
  setTimeout(t, e3);
}, Vy = (e3 = { type: "raf" }) => (t) => (...r) => {
  const n = t(...r);
  let i = true, s = false, a = false;
  const o = /* @__PURE__ */ new Set(), l = e3.type === "tick" ? queueMicrotask : e3.type === "raf" ? typeof window < "u" && window.requestAnimationFrame ? window.requestAnimationFrame : bd(10) : e3.type === "callback" ? e3.queueNotification : bd(e3.timeout), u = () => {
    a = false, s && (s = false, o.forEach((c) => c()));
  };
  return Object.assign({}, n, { subscribe(c) {
    const h = () => i && c(), f = n.subscribe(h);
    return o.add(c), () => {
      f(), o.delete(c);
    };
  }, dispatch(c) {
    var _a3;
    try {
      return i = !((_a3 = c == null ? void 0 : c.meta) == null ? void 0 : _a3[qy]), s = !i, s && (a || (a = true, l(u))), n.dispatch(c);
    } finally {
      i = true;
    }
  } });
}, i_ = (e3) => function(r) {
  const { autoBatch: n = true } = r ?? {};
  let i = new Uy(e3);
  return n && i.push(Vy(typeof n == "object" ? n : void 0)), i;
};
function s_(e3) {
  const t = n_(), { reducer: r = void 0, middleware: n, devTools: i = true, preloadedState: s = void 0, enhancers: a = void 0 } = e3 || {};
  let o;
  if (typeof r == "function") o = r;
  else if (Sc(r)) o = ky(r);
  else throw new Error(Zt(1));
  let l;
  typeof n == "function" ? l = n(t) : l = t();
  let u = Cs;
  i && (u = e_({ trace: false, ...typeof i == "object" && i }));
  const c = $S(...l), h = i_(c);
  let f = typeof a == "function" ? a(h) : h();
  const d = u(...f);
  return jy(o, s, d);
}
function Yy(e3) {
  const t = {}, r = [];
  let n;
  const i = { addCase(s, a) {
    const o = typeof s == "string" ? s : s.type;
    if (!o) throw new Error(Zt(28));
    if (o in t) throw new Error(Zt(29));
    return t[o] = a, i;
  }, addAsyncThunk(s, a) {
    return a.pending && (t[s.pending.type] = a.pending), a.rejected && (t[s.rejected.type] = a.rejected), a.fulfilled && (t[s.fulfilled.type] = a.fulfilled), a.settled && r.push({ matcher: s.settled, reducer: a.settled }), i;
  }, addMatcher(s, a) {
    return r.push({ matcher: s, reducer: a }), i;
  }, addDefaultCase(s) {
    return n = s, i;
  } };
  return e3(i), [t, r, n];
}
function a_(e3) {
  return typeof e3 == "function";
}
function o_(e3, t) {
  let [r, n, i] = Yy(t), s;
  if (a_(e3)) s = () => yd(e3());
  else {
    const o = yd(e3);
    s = () => o;
  }
  function a(o = s(), l) {
    let u = [r[l.type], ...n.filter(({ matcher: c }) => c(l)).map(({ reducer: c }) => c)];
    return u.filter((c) => !!c).length === 0 && (u = [i]), u.reduce((c, h) => {
      if (h) if (Ue(c)) {
        const d = h(c, l);
        return d === void 0 ? c : d;
      } else {
        if (me(c)) return Wy(c, (f) => h(f, l));
        {
          const f = h(c, l);
          if (f === void 0) {
            if (c === null) return c;
            throw Error("A case reducer on a non-draftable value must not return undefined");
          }
          return f;
        }
      }
      return c;
    }, o);
  }
  return a.getInitialState = s, a;
}
var l_ = "ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW", u_ = (e3 = 21) => {
  let t = "", r = e3;
  for (; r--; ) t += l_[Math.random() * 64 | 0];
  return t;
}, c_ = Symbol.for("rtk-slice-createasyncthunk");
function h_(e3, t) {
  return `${e3}/${t}`;
}
function f_({ creators: e3 } = {}) {
  var _a3;
  const t = (_a3 = e3 == null ? void 0 : e3.asyncThunk) == null ? void 0 : _a3[c_];
  return function(n) {
    const { name: i, reducerPath: s = i } = n;
    if (!i) throw new Error(Zt(11));
    const a = (typeof n.reducers == "function" ? n.reducers(v_()) : n.reducers) || {}, o = Object.keys(a), l = { sliceCaseReducersByName: {}, sliceCaseReducersByType: {}, actionCreators: {}, sliceMatchers: [] }, u = { addCase(w, x) {
      const P = typeof w == "string" ? w : w.type;
      if (!P) throw new Error(Zt(12));
      if (P in l.sliceCaseReducersByType) throw new Error(Zt(13));
      return l.sliceCaseReducersByType[P] = x, u;
    }, addMatcher(w, x) {
      return l.sliceMatchers.push({ matcher: w, reducer: x }), u;
    }, exposeAction(w, x) {
      return l.actionCreators[w] = x, u;
    }, exposeCaseReducer(w, x) {
      return l.sliceCaseReducersByName[w] = x, u;
    } };
    o.forEach((w) => {
      const x = a[w], P = { reducerName: w, type: h_(i, w), createNotation: typeof n.reducers == "function" };
      m_(x) ? y_(P, x, u, t) : p_(P, x, u);
    });
    function c() {
      const [w = {}, x = [], P = void 0] = typeof n.extraReducers == "function" ? Yy(n.extraReducers) : [n.extraReducers], S = { ...w, ...l.sliceCaseReducersByType };
      return o_(n.initialState, (_) => {
        for (let M in S) _.addCase(M, S[M]);
        for (let M of l.sliceMatchers) _.addMatcher(M.matcher, M.reducer);
        for (let M of x) _.addMatcher(M.matcher, M.reducer);
        P && _.addDefaultCase(P);
      });
    }
    const h = (w) => w, f = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new WeakMap();
    let v;
    function p(w, x) {
      return v || (v = c()), v(w, x);
    }
    function m() {
      return v || (v = c()), v.getInitialState();
    }
    function y(w, x = false) {
      function P(_) {
        let M = _[w];
        return typeof M > "u" && x && (M = Xi(d, P, m)), M;
      }
      function S(_ = h) {
        const M = Xi(f, x, () => /* @__PURE__ */ new WeakMap());
        return Xi(M, _, () => {
          const A = {};
          for (const [j, k] of Object.entries(n.selectors ?? {})) A[j] = d_(k, _, () => Xi(d, _, m), x);
          return A;
        });
      }
      return { reducerPath: w, getSelectors: S, get selectors() {
        return S(P);
      }, selectSlice: P };
    }
    const b = { name: i, reducer: p, actions: l.actionCreators, caseReducers: l.sliceCaseReducersByName, getInitialState: m, ...y(s), injectInto(w, { reducerPath: x, ...P } = {}) {
      const S = x ?? s;
      return w.inject({ reducerPath: S, reducer: p }, P), { ...b, ...y(S, true) };
    } };
    return b;
  };
}
function d_(e3, t, r, n) {
  function i(s, ...a) {
    let o = t(s);
    return typeof o > "u" && n && (o = r()), e3(o, ...a);
  }
  return i.unwrapped = e3, i;
}
var Nt = f_();
function v_() {
  function e3(t, r) {
    return { _reducerDefinitionType: "asyncThunk", payloadCreator: t, ...r };
  }
  return e3.withTypes = () => e3, { reducer(t) {
    return Object.assign({ [t.name](...r) {
      return t(...r);
    } }[t.name], { _reducerDefinitionType: "reducer" });
  }, preparedReducer(t, r) {
    return { _reducerDefinitionType: "reducerWithPrepare", prepare: t, reducer: r };
  }, asyncThunk: e3 };
}
function p_({ type: e3, reducerName: t, createNotation: r }, n, i) {
  let s, a;
  if ("reducer" in n) {
    if (r && !g_(n)) throw new Error(Zt(17));
    s = n.reducer, a = n.prepare;
  } else s = n;
  i.addCase(e3, s).exposeCaseReducer(t, s).exposeAction(t, a ? ee(e3, a) : ee(e3));
}
function m_(e3) {
  return e3._reducerDefinitionType === "asyncThunk";
}
function g_(e3) {
  return e3._reducerDefinitionType === "reducerWithPrepare";
}
function y_({ type: e3, reducerName: t }, r, n, i) {
  if (!i) throw new Error(Zt(18));
  const { payloadCreator: s, fulfilled: a, pending: o, rejected: l, settled: u, options: c } = r, h = i(e3, s, c);
  n.exposeAction(t, h), a && n.addCase(h.fulfilled, a), o && n.addCase(h.pending, o), l && n.addCase(h.rejected, l), u && n.addMatcher(h.settled, u), n.exposeCaseReducer(t, { fulfilled: a || Ji, pending: o || Ji, rejected: l || Ji, settled: u || Ji });
}
function Ji() {
}
var b_ = "task", Hy = "listener", Gy = "completed", Ec = "cancelled", w_ = `task-${Ec}`, x_ = `task-${Gy}`, ju = `${Hy}-${Ec}`, P_ = `${Hy}-${Gy}`, Da = class {
  constructor(e3) {
    __publicField(this, "name", "TaskAbortError");
    __publicField(this, "message");
    this.code = e3, this.message = `${b_} ${Ec} (reason: ${e3})`;
  }
}, Ac = (e3, t) => {
  if (typeof e3 != "function") throw new TypeError(Zt(32));
}, Ls = () => {
}, Xy = (e3, t = Ls) => (e3.catch(t), e3), Jy = (e3, t) => (e3.addEventListener("abort", t, { once: true }), () => e3.removeEventListener("abort", t)), Ar = (e3) => {
  if (e3.aborted) throw new Da(e3.reason);
};
function Zy(e3, t) {
  let r = Ls;
  return new Promise((n, i) => {
    const s = () => i(new Da(e3.reason));
    if (e3.aborted) {
      s();
      return;
    }
    r = Jy(e3, s), t.finally(() => r()).then(n, i);
  }).finally(() => {
    r = Ls;
  });
}
var S_ = async (e3, t) => {
  try {
    return await Promise.resolve(), { status: "ok", value: await e3() };
  } catch (r) {
    return { status: r instanceof Da ? "cancelled" : "rejected", error: r };
  } finally {
    t == null ? void 0 : t();
  }
}, Rs = (e3) => (t) => Xy(Zy(e3, t).then((r) => (Ar(e3), r))), Qy = (e3) => {
  const t = Rs(e3);
  return (r) => t(new Promise((n) => setTimeout(n, r)));
}, { assign: fn } = Object, wd = {}, La = "listenerMiddleware", __ = (e3, t) => {
  const r = (n) => Jy(e3, () => n.abort(e3.reason));
  return (n, i) => {
    Ac(n);
    const s = new AbortController();
    r(s);
    const a = S_(async () => {
      Ar(e3), Ar(s.signal);
      const o = await n({ pause: Rs(s.signal), delay: Qy(s.signal), signal: s.signal });
      return Ar(s.signal), o;
    }, () => s.abort(x_));
    return (i == null ? void 0 : i.autoJoin) && t.push(a.catch(Ls)), { result: Rs(e3)(a), cancel() {
      s.abort(w_);
    } };
  };
}, O_ = (e3, t) => {
  const r = async (n, i) => {
    Ar(t);
    let s = () => {
    };
    const o = [new Promise((l, u) => {
      let c = e3({ predicate: n, effect: (h, f) => {
        f.unsubscribe(), l([h, f.getState(), f.getOriginalState()]);
      } });
      s = () => {
        c(), u();
      };
    })];
    i != null && o.push(new Promise((l) => setTimeout(l, i, null)));
    try {
      const l = await Zy(t, Promise.race(o));
      return Ar(t), l;
    } finally {
      s();
    }
  };
  return (n, i) => Xy(r(n, i));
}, t0 = (e3) => {
  let { type: t, actionCreator: r, matcher: n, predicate: i, effect: s } = e3;
  if (t) i = ee(t).match;
  else if (r) t = r.type, i = r.match;
  else if (n) i = n;
  else if (!i) throw new Error(Zt(21));
  return Ac(s), { predicate: i, type: t, effect: s };
}, e0 = fn((e3) => {
  const { type: t, predicate: r, effect: n } = t0(e3);
  return { id: u_(), effect: n, type: t, predicate: r, pending: /* @__PURE__ */ new Set(), unsubscribe: () => {
    throw new Error(Zt(22));
  } };
}, { withTypes: () => e0 }), xd = (e3, t) => {
  const { type: r, effect: n, predicate: i } = t0(t);
  return Array.from(e3.values()).find((s) => (typeof r == "string" ? s.type === r : s.predicate === i) && s.effect === n);
}, ku = (e3) => {
  e3.pending.forEach((t) => {
    t.abort(ju);
  });
}, M_ = (e3, t) => () => {
  for (const r of t.keys()) ku(r);
  e3.clear();
}, Pd = (e3, t, r) => {
  try {
    e3(t, r);
  } catch (n) {
    setTimeout(() => {
      throw n;
    }, 0);
  }
}, r0 = fn(ee(`${La}/add`), { withTypes: () => r0 }), E_ = ee(`${La}/removeAll`), n0 = fn(ee(`${La}/remove`), { withTypes: () => n0 }), A_ = (...e3) => {
  console.error(`${La}/error`, ...e3);
}, Ci = (e3 = {}) => {
  const t = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map(), n = (d) => {
    const v = r.get(d) ?? 0;
    r.set(d, v + 1);
  }, i = (d) => {
    const v = r.get(d) ?? 1;
    v === 1 ? r.delete(d) : r.set(d, v - 1);
  }, { extra: s, onError: a = A_ } = e3;
  Ac(a);
  const o = (d) => (d.unsubscribe = () => t.delete(d.id), t.set(d.id, d), (v) => {
    d.unsubscribe(), (v == null ? void 0 : v.cancelActive) && ku(d);
  }), l = (d) => {
    const v = xd(t, d) ?? e0(d);
    return o(v);
  };
  fn(l, { withTypes: () => l });
  const u = (d) => {
    const v = xd(t, d);
    return v && (v.unsubscribe(), d.cancelActive && ku(v)), !!v;
  };
  fn(u, { withTypes: () => u });
  const c = async (d, v, p, m) => {
    const y = new AbortController(), b = O_(l, y.signal), w = [];
    try {
      d.pending.add(y), n(d), await Promise.resolve(d.effect(v, fn({}, p, { getOriginalState: m, condition: (x, P) => b(x, P).then(Boolean), take: b, delay: Qy(y.signal), pause: Rs(y.signal), extra: s, signal: y.signal, fork: __(y.signal, w), unsubscribe: d.unsubscribe, subscribe: () => {
        t.set(d.id, d);
      }, cancelActiveListeners: () => {
        d.pending.forEach((x, P, S) => {
          x !== y && (x.abort(ju), S.delete(x));
        });
      }, cancel: () => {
        y.abort(ju), d.pending.delete(y);
      }, throwIfCancelled: () => {
        Ar(y.signal);
      } })));
    } catch (x) {
      x instanceof Da || Pd(a, x, { raisedBy: "effect" });
    } finally {
      await Promise.all(w), y.abort(P_), i(d), d.pending.delete(y);
    }
  }, h = M_(t, r);
  return { middleware: (d) => (v) => (p) => {
    if (!Iy(p)) return v(p);
    if (r0.match(p)) return l(p.payload);
    if (E_.match(p)) {
      h();
      return;
    }
    if (n0.match(p)) return u(p.payload);
    let m = d.getState();
    const y = () => {
      if (m === wd) throw new Error(Zt(23));
      return m;
    };
    let b;
    try {
      if (b = v(p), t.size > 0) {
        const w = d.getState(), x = Array.from(t.values());
        for (const P of x) {
          let S = false;
          try {
            S = P.predicate(p, w, m);
          } catch (_) {
            S = false, Pd(a, _, { raisedBy: "predicate" });
          }
          S && c(P, p, d, y);
        }
      }
    } finally {
      m = wd;
    }
    return b;
  }, startListening: l, stopListening: u, clearListeners: h };
};
function Zt(e3) {
  return `Minified Redux Toolkit error #${e3}; visit https://redux-toolkit.js.org/Errors?code=${e3} for the full message or use the non-minified dev environment for full errors. `;
}
var C_ = { layoutType: "horizontal", width: 0, height: 0, margin: { top: 5, right: 5, bottom: 5, left: 5 }, scale: 1 }, i0 = Nt({ name: "chartLayout", initialState: C_, reducers: { setLayout(e3, t) {
  e3.layoutType = t.payload;
}, setChartSize(e3, t) {
  e3.width = t.payload.width, e3.height = t.payload.height;
}, setMargin(e3, t) {
  var r, n, i, s;
  e3.margin.top = (r = t.payload.top) !== null && r !== void 0 ? r : 0, e3.margin.right = (n = t.payload.right) !== null && n !== void 0 ? n : 0, e3.margin.bottom = (i = t.payload.bottom) !== null && i !== void 0 ? i : 0, e3.margin.left = (s = t.payload.left) !== null && s !== void 0 ? s : 0;
}, setScale(e3, t) {
  e3.scale = t.payload;
} } }), { setMargin: j_, setLayout: k_, setChartSize: I_, setScale: T_ } = i0.actions, N_ = i0.reducer;
function s0(e3, t, r) {
  return Array.isArray(e3) && e3 && t + r !== 0 ? e3.slice(t, r + 1) : e3;
}
function K(e3) {
  return Number.isFinite(e3);
}
function ke(e3) {
  return typeof e3 == "number" && e3 > 0 && Number.isFinite(e3);
}
function Sd(e3, t) {
  var r = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e3);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e3, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function on(e3) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Sd(Object(r), true).forEach(function(n) {
      D_(e3, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(r)) : Sd(Object(r)).forEach(function(n) {
      Object.defineProperty(e3, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e3;
}
function D_(e3, t, r) {
  return (t = L_(t)) in e3 ? Object.defineProperty(e3, t, { value: r, enumerable: true, configurable: true, writable: true }) : e3[t] = r, e3;
}
function L_(e3) {
  var t = R_(e3, "string");
  return typeof t == "symbol" ? t : t + "";
}
function R_(e3, t) {
  if (typeof e3 != "object" || !e3) return e3;
  var r = e3[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e3, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e3);
}
function ct(e3, t, r) {
  return mt(e3) || mt(t) ? r : je(t) ? Ma(e3, t, r) : typeof t == "function" ? t(e3) : r;
}
var $_ = (e3, t, r) => {
  if (t && r) {
    var { width: n, height: i } = r, { align: s, verticalAlign: a, layout: o } = t;
    if ((o === "vertical" || o === "horizontal" && a === "middle") && s !== "center" && L(e3[s])) return on(on({}, e3), {}, { [s]: e3[s] + (n || 0) });
    if ((o === "horizontal" || o === "vertical" && s === "center") && a !== "middle" && L(e3[a])) return on(on({}, e3), {}, { [a]: e3[a] + (i || 0) });
  }
  return e3;
}, ye = (e3, t) => e3 === "horizontal" && t === "xAxis" || e3 === "vertical" && t === "yAxis" || e3 === "centric" && t === "angleAxis" || e3 === "radial" && t === "radiusAxis", a0 = (e3, t, r, n) => {
  if (n) return e3.map((o) => o.coordinate);
  var i, s, a = e3.map((o) => (o.coordinate === t && (i = true), o.coordinate === r && (s = true), o.coordinate));
  return i || a.push(t), s || a.push(r), a;
}, o0 = (e3, t, r) => {
  if (!e3) return null;
  var { duplicateDomain: n, type: i, range: s, scale: a, realScaleType: o, isCategorical: l, categoricalDomain: u, tickCount: c, ticks: h, niceTicks: f, axisType: d } = e3;
  if (!a) return null;
  var v = o === "scaleBand" && a.bandwidth ? a.bandwidth() / 2 : 2, p = i === "category" && a.bandwidth ? a.bandwidth() / v : 0;
  if (p = d === "angleAxis" && s && s.length >= 2 ? ae(s[0] - s[1]) * 2 * p : p, h || f) {
    var m = (h || f || []).map((y, b) => {
      var w = n ? n.indexOf(y) : y, x = a.map(w);
      return K(x) ? { coordinate: x + p, value: y, offset: p, index: b } : null;
    }).filter(qt);
    return m;
  }
  return l && u ? u.map((y, b) => {
    var w = a.map(y);
    return K(w) ? { coordinate: w + p, value: y, index: b, offset: p } : null;
  }).filter(qt) : a.ticks && c != null ? a.ticks(c).map((y, b) => {
    var w = a.map(y);
    return K(w) ? { coordinate: w + p, value: y, index: b, offset: p } : null;
  }).filter(qt) : a.domain().map((y, b) => {
    var w = a.map(y);
    return K(w) ? { coordinate: w + p, value: n ? n[y] : y, index: b, offset: p } : null;
  }).filter(qt);
}, z_ = (e3) => {
  var t, r = e3.length;
  if (!(r <= 0)) {
    var n = (t = e3[0]) === null || t === void 0 ? void 0 : t.length;
    if (!(n == null || n <= 0)) for (var i = 0; i < n; ++i) for (var s = 0, a = 0, o = 0; o < r; ++o) {
      var l = e3[o], u = l == null ? void 0 : l[i];
      if (u != null) {
        var c = u[1], h = u[0], f = Ce(c) ? h : c;
        f >= 0 ? (u[0] = s, s += f, u[1] = s) : (u[0] = a, a += f, u[1] = a);
      }
    }
  }
}, B_ = (e3) => {
  var t, r = e3.length;
  if (!(r <= 0)) {
    var n = (t = e3[0]) === null || t === void 0 ? void 0 : t.length;
    if (!(n == null || n <= 0)) for (var i = 0; i < n; ++i) for (var s = 0, a = 0; a < r; ++a) {
      var o = e3[a], l = o == null ? void 0 : o[i];
      if (l != null) {
        var u = Ce(l[1]) ? l[0] : l[1];
        u >= 0 ? (l[0] = s, s += u, l[1] = s) : (l[0] = 0, l[1] = 0);
      }
    }
  }
}, F_ = { sign: z_, expand: mP, none: Tr, silhouette: gP, wiggle: yP, positive: B_ }, W_ = (e3, t, r) => {
  var n, i = (n = F_[r]) !== null && n !== void 0 ? n : Tr, s = pP().keys(t).value((o, l) => Number(ct(o, l, 0))).order(wu).offset(i), a = s(e3);
  return a.forEach((o, l) => {
    o.forEach((u, c) => {
      var h = ct(e3[c], t[l], 0);
      Array.isArray(h) && h.length === 2 && L(h[0]) && L(h[1]) && (u[0] = h[0], u[1] = h[1]);
    });
  }), a;
};
function K_(e3) {
  return e3 == null ? void 0 : String(e3);
}
function $s(e3) {
  var { axis: t, ticks: r, bandSize: n, entry: i, index: s, dataKey: a } = e3;
  if (t.type === "category") {
    if (!t.allowDuplicatedCategory && t.dataKey && !mt(i[t.dataKey])) {
      var o = fy(r, "value", i[t.dataKey]);
      if (o) return o.coordinate + n / 2;
    }
    return r != null && r[s] ? r[s].coordinate + n / 2 : null;
  }
  var l = ct(i, mt(a) ? t.dataKey : a), u = t.scale.map(l);
  return L(u) ? u : null;
}
var U_ = (e3) => {
  var t = e3.flat(2).filter(L);
  return [Math.min(...t), Math.max(...t)];
}, q_ = (e3) => [e3[0] === 1 / 0 ? 0 : e3[0], e3[1] === -1 / 0 ? 0 : e3[1]], V_ = (e3, t, r) => {
  if (e3 != null) return q_(Object.keys(e3).reduce((n, i) => {
    var s = e3[i];
    if (!s) return n;
    var { stackedData: a } = s, o = a.reduce((l, u) => {
      var c = s0(u, t, r), h = U_(c);
      return !K(h[0]) || !K(h[1]) ? l : [Math.min(l[0], h[0]), Math.max(l[1], h[1])];
    }, [1 / 0, -1 / 0]);
    return [Math.min(o[0], n[0]), Math.max(o[1], n[1])];
  }, [1 / 0, -1 / 0]));
}, _d = /^dataMin[\s]*-[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/, Od = /^dataMax[\s]*\+[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/, bn = (e3, t, r) => {
  if (e3 && e3.scale && e3.scale.bandwidth) {
    var n = e3.scale.bandwidth();
    if (!r || n > 0) return n;
  }
  if (e3 && t && t.length >= 2) {
    for (var i = Ea(t, (c) => c.coordinate), s = 1 / 0, a = 1, o = i.length; a < o; a++) {
      var l = i[a], u = i[a - 1];
      s = Math.min(((l == null ? void 0 : l.coordinate) || 0) - ((u == null ? void 0 : u.coordinate) || 0), s);
    }
    return s === 1 / 0 ? 0 : s;
  }
  return r ? void 0 : 0;
};
function Md(e3) {
  var { tooltipEntrySettings: t, dataKey: r, payload: n, value: i, name: s } = e3;
  return on(on({}, t), {}, { dataKey: r, payload: n, value: i, name: s });
}
function Ra(e3, t) {
  if (e3) return String(e3);
  if (typeof t == "string") return t;
}
var Y_ = (e3, t) => {
  if (t === "horizontal") return e3.relativeX;
  if (t === "vertical") return e3.relativeY;
}, H_ = (e3, t) => t === "centric" ? e3.angle : e3.radius, He = (e3) => e3.layout.width, Ge = (e3) => e3.layout.height, G_ = (e3) => e3.layout.scale, l0 = (e3) => e3.layout.margin, $a = O((e3) => e3.cartesianAxis.xAxis, (e3) => Object.values(e3)), za = O((e3) => e3.cartesianAxis.yAxis, (e3) => Object.values(e3)), X_ = "data-recharts-item-index", J_ = "data-recharts-item-id", ji = 60;
function Ed(e3, t) {
  var r = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e3);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e3, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Zi(e3) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Ed(Object(r), true).forEach(function(n) {
      Z_(e3, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(r)) : Ed(Object(r)).forEach(function(n) {
      Object.defineProperty(e3, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e3;
}
function Z_(e3, t, r) {
  return (t = Q_(t)) in e3 ? Object.defineProperty(e3, t, { value: r, enumerable: true, configurable: true, writable: true }) : e3[t] = r, e3;
}
function Q_(e3) {
  var t = tO(e3, "string");
  return typeof t == "symbol" ? t : t + "";
}
function tO(e3, t) {
  if (typeof e3 != "object" || !e3) return e3;
  var r = e3[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e3, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e3);
}
var eO = (e3) => e3.brush.height;
function rO(e3) {
  var t = za(e3);
  return t.reduce((r, n) => {
    if (n.orientation === "left" && !n.mirror && !n.hide) {
      var i = typeof n.width == "number" ? n.width : ji;
      return r + i;
    }
    return r;
  }, 0);
}
function nO(e3) {
  var t = za(e3);
  return t.reduce((r, n) => {
    if (n.orientation === "right" && !n.mirror && !n.hide) {
      var i = typeof n.width == "number" ? n.width : ji;
      return r + i;
    }
    return r;
  }, 0);
}
function iO(e3) {
  var t = $a(e3);
  return t.reduce((r, n) => n.orientation === "top" && !n.mirror && !n.hide ? r + n.height : r, 0);
}
function sO(e3) {
  var t = $a(e3);
  return t.reduce((r, n) => n.orientation === "bottom" && !n.mirror && !n.hide ? r + n.height : r, 0);
}
var At = O([He, Ge, l0, eO, rO, nO, iO, sO, Cy, IS], (e3, t, r, n, i, s, a, o, l, u) => {
  var c = { left: (r.left || 0) + i, right: (r.right || 0) + s }, h = { top: (r.top || 0) + a, bottom: (r.bottom || 0) + o }, f = Zi(Zi({}, h), c), d = f.bottom;
  f.bottom += n, f = $_(f, l, u);
  var v = e3 - f.left - f.right, p = t - f.top - f.bottom;
  return Zi(Zi({ brushBottom: d }, f), {}, { width: Math.max(v, 0), height: Math.max(p, 0) });
}), aO = O(At, (e3) => ({ x: e3.left, y: e3.top, width: e3.width, height: e3.height })), u0 = O(He, Ge, (e3, t) => ({ x: 0, y: 0, width: e3, height: t })), oO = g.createContext(null), Dt = () => g.useContext(oO) != null, Ba = (e3) => e3.brush, Fa = O([Ba, At, l0], (e3, t, r) => ({ height: e3.height, x: L(e3.x) ? e3.x : t.left, y: L(e3.y) ? e3.y : t.top + t.height + t.brushBottom - ((r == null ? void 0 : r.bottom) || 0), width: L(e3.width) ? e3.width : t.width })), xl = {}, Pl = {}, Sl = {}, Ad;
function lO() {
  return Ad || (Ad = 1, (function(e3) {
    Object.defineProperty(e3, Symbol.toStringTag, { value: "Module" });
    function t(r, n, { signal: i, edges: s } = {}) {
      let a, o = null;
      const l = s != null && s.includes("leading"), u = s == null || s.includes("trailing"), c = () => {
        o !== null && (r.apply(a, o), a = void 0, o = null);
      }, h = () => {
        u && c(), p();
      };
      let f = null;
      const d = () => {
        f != null && clearTimeout(f), f = setTimeout(() => {
          f = null, h();
        }, n);
      }, v = () => {
        f !== null && (clearTimeout(f), f = null);
      }, p = () => {
        v(), a = void 0, o = null;
      }, m = () => {
        c();
      }, y = function(...b) {
        if (i == null ? void 0 : i.aborted) return;
        a = this, o = b;
        const w = f == null;
        d(), l && w && c();
      };
      return y.schedule = d, y.cancel = p, y.flush = m, i == null ? void 0 : i.addEventListener("abort", p, { once: true }), y;
    }
    e3.debounce = t;
  })(Sl)), Sl;
}
var Cd;
function uO() {
  return Cd || (Cd = 1, (function(e3) {
    Object.defineProperty(e3, Symbol.toStringTag, { value: "Module" });
    const t = lO();
    function r(n, i = 0, s = {}) {
      typeof s != "object" && (s = {});
      const { leading: a = false, trailing: o = true, maxWait: l } = s, u = Array(2);
      a && (u[0] = "leading"), o && (u[1] = "trailing");
      let c, h = null;
      const f = t.debounce(function(...p) {
        c = n.apply(this, p), h = null;
      }, i, { edges: u }), d = function(...p) {
        return l != null && (h === null && (h = Date.now()), Date.now() - h >= l) ? (c = n.apply(this, p), h = Date.now(), f.cancel(), f.schedule(), c) : (f.apply(this, p), c);
      }, v = () => (f.flush(), c);
      return d.cancel = f.cancel, d.flush = v, d;
    }
    e3.debounce = r;
  })(Pl)), Pl;
}
var jd;
function cO() {
  return jd || (jd = 1, (function(e3) {
    Object.defineProperty(e3, Symbol.toStringTag, { value: "Module" });
    const t = uO();
    function r(n, i = 0, s = {}) {
      const { leading: a = true, trailing: o = true } = s;
      return t.debounce(n, i, { leading: a, maxWait: i, trailing: o });
    }
    e3.throttle = r;
  })(xl)), xl;
}
var _l, kd;
function hO() {
  return kd || (kd = 1, _l = cO().throttle), _l;
}
var fO = hO();
const dO = fr(fO);
var zs = function(t, r) {
  for (var n = arguments.length, i = new Array(n > 2 ? n - 2 : 0), s = 2; s < n; s++) i[s - 2] = arguments[s];
  if (typeof console < "u" && console.warn && (r === void 0 && console.warn("LogUtils requires an error message argument"), !t)) if (r === void 0) console.warn("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
  else {
    var a = 0;
    console.warn(r.replace(/%s/g, () => i[a++]));
  }
}, Oe = { width: "100%", height: "100%", debounce: 0, minWidth: 0, initialDimension: { width: -1, height: -1 } }, c0 = (e3, t, r) => {
  var { width: n = Oe.width, height: i = Oe.height, aspect: s, maxHeight: a } = r, o = Nr(n) ? e3 : Number(n), l = Nr(i) ? t : Number(i);
  return s && s > 0 && (o ? l = o / s : l && (o = l * s), a && l != null && l > a && (l = a)), { calculatedWidth: o, calculatedHeight: l };
}, vO = { width: 0, height: 0, overflow: "visible" }, pO = { width: 0, overflowX: "visible" }, mO = { height: 0, overflowY: "visible" }, gO = {}, yO = (e3) => {
  var { width: t, height: r } = e3, n = Nr(t), i = Nr(r);
  return n && i ? vO : n ? pO : i ? mO : gO;
};
function bO(e3) {
  var { width: t, height: r, aspect: n } = e3, i = t, s = r;
  return i === void 0 && s === void 0 ? (i = Oe.width, s = Oe.height) : i === void 0 ? i = n && n > 0 ? void 0 : Oe.width : s === void 0 && (s = n && n > 0 ? void 0 : Oe.height), { width: i, height: s };
}
function Iu() {
  return Iu = Object.assign ? Object.assign.bind() : function(e3) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e3[n] = r[n]);
    }
    return e3;
  }, Iu.apply(null, arguments);
}
function Id(e3, t) {
  var r = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e3);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e3, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Td(e3) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Id(Object(r), true).forEach(function(n) {
      wO(e3, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(r)) : Id(Object(r)).forEach(function(n) {
      Object.defineProperty(e3, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e3;
}
function wO(e3, t, r) {
  return (t = xO(t)) in e3 ? Object.defineProperty(e3, t, { value: r, enumerable: true, configurable: true, writable: true }) : e3[t] = r, e3;
}
function xO(e3) {
  var t = PO(e3, "string");
  return typeof t == "symbol" ? t : t + "";
}
function PO(e3, t) {
  if (typeof e3 != "object" || !e3) return e3;
  var r = e3[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e3, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e3);
}
var h0 = g.createContext(Oe.initialDimension);
function SO(e3) {
  return ke(e3.width) && ke(e3.height);
}
function f0(e3) {
  var { children: t, width: r, height: n } = e3, i = g.useMemo(() => ({ width: r, height: n }), [r, n]);
  return SO(i) ? g.createElement(h0.Provider, { value: i }, t) : null;
}
var Cc = () => g.useContext(h0), _O = g.forwardRef((e3, t) => {
  var { aspect: r, initialDimension: n = Oe.initialDimension, width: i, height: s, minWidth: a = Oe.minWidth, minHeight: o, maxHeight: l, children: u, debounce: c = Oe.debounce, id: h, className: f, onResize: d, style: v = {} } = e3, p = g.useRef(null), m = g.useRef();
  m.current = d, g.useImperativeHandle(t, () => p.current);
  var [y, b] = g.useState({ containerWidth: n.width, containerHeight: n.height }), w = g.useCallback((M, A) => {
    b((j) => {
      var k = Math.round(M), E = Math.round(A);
      return j.containerWidth === k && j.containerHeight === E ? j : { containerWidth: k, containerHeight: E };
    });
  }, []);
  g.useEffect(() => {
    if (p.current == null || typeof ResizeObserver > "u") return qr;
    var M = (E) => {
      var $, R = E[0];
      if (R != null) {
        var { width: B, height: H } = R.contentRect;
        w(B, H), ($ = m.current) === null || $ === void 0 || $.call(m, B, H);
      }
    };
    c > 0 && (M = dO(M, c, { trailing: true, leading: false }));
    var A = new ResizeObserver(M), { width: j, height: k } = p.current.getBoundingClientRect();
    return w(j, k), A.observe(p.current), () => {
      A.disconnect();
    };
  }, [w, c]);
  var { containerWidth: x, containerHeight: P } = y;
  zs(!r || r > 0, "The aspect(%s) must be greater than zero.", r);
  var { calculatedWidth: S, calculatedHeight: _ } = c0(x, P, { width: i, height: s, aspect: r, maxHeight: l });
  return zs(S != null && S > 0 || _ != null && _ > 0, `The width(%s) and height(%s) of chart should be greater than 0,
       please check the style of container, or the props width(%s) and height(%s),
       or add a minWidth(%s) or minHeight(%s) or use aspect(%s) to control the
       height and width.`, S, _, i, s, a, o, r), g.createElement("div", { id: h ? "".concat(h) : void 0, className: X("recharts-responsive-container", f), style: Td(Td({}, v), {}, { width: i, height: s, minWidth: a, minHeight: o, maxHeight: l }), ref: p }, g.createElement("div", { style: yO({ width: i, height: s }) }, g.createElement(f0, { width: S, height: _ }, u)));
}), mF = g.forwardRef((e3, t) => {
  var r = Cc();
  if (ke(r.width) && ke(r.height)) return e3.children;
  var { width: n, height: i } = bO({ width: e3.width, height: e3.height, aspect: e3.aspect }), { calculatedWidth: s, calculatedHeight: a } = c0(void 0, void 0, { width: n, height: i, aspect: e3.aspect, maxHeight: e3.maxHeight });
  return L(s) && L(a) ? g.createElement(f0, { width: s, height: a }, e3.children) : g.createElement(_O, Iu({}, e3, { width: n, height: i, ref: t }));
});
function jc(e3) {
  if (e3) return { x: e3.x, y: e3.y, upperWidth: "upperWidth" in e3 ? e3.upperWidth : e3.width, lowerWidth: "lowerWidth" in e3 ? e3.lowerWidth : e3.width, width: e3.width, height: e3.height };
}
var Wa = () => {
  var e3, t = Dt(), r = z(aO), n = z(Fa), i = (e3 = z(Ba)) === null || e3 === void 0 ? void 0 : e3.padding;
  return !t || !n || !i ? r : { width: n.width - i.left - i.right, height: n.height - i.top - i.bottom, x: i.left, y: i.top };
}, OO = { top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0, brushBottom: 0 }, d0 = () => {
  var e3;
  return (e3 = z(At)) !== null && e3 !== void 0 ? e3 : OO;
}, v0 = () => z(He), p0 = () => z(Ge), et = (e3) => e3.layout.layoutType, Vr = () => z(et), kc = () => {
  var e3 = Vr();
  if (e3 === "horizontal" || e3 === "vertical") return e3;
}, m0 = (e3) => {
  var t = e3.layout.layoutType;
  if (t === "centric" || t === "radial") return t;
}, MO = () => {
  var e3 = Vr();
  return e3 !== void 0;
}, ki = (e3) => {
  var t = ft(), r = Dt(), { width: n, height: i } = e3, s = Cc(), a = n, o = i;
  return s && (a = s.width > 0 ? s.width : n, o = s.height > 0 ? s.height : i), g.useEffect(() => {
    !r && ke(a) && ke(o) && t(I_({ width: a, height: o }));
  }, [t, r, a, o]), null;
}, g0 = Symbol.for("immer-nothing"), Nd = Symbol.for("immer-draftable"), re = Symbol.for("immer-state");
function ve(e3, ...t) {
  throw new Error(`[Immer] minified error nr: ${e3}. Full error at: https://bit.ly/3cXEKWf`);
}
var ci = Object.getPrototypeOf;
function wn(e3) {
  return !!e3 && !!e3[re];
}
function Lr(e3) {
  var _a3;
  return e3 ? y0(e3) || Array.isArray(e3) || !!e3[Nd] || !!((_a3 = e3.constructor) == null ? void 0 : _a3[Nd]) || Ii(e3) || Ua(e3) : false;
}
var EO = Object.prototype.constructor.toString(), Dd = /* @__PURE__ */ new WeakMap();
function y0(e3) {
  if (!e3 || typeof e3 != "object") return false;
  const t = Object.getPrototypeOf(e3);
  if (t === null || t === Object.prototype) return true;
  const r = Object.hasOwnProperty.call(t, "constructor") && t.constructor;
  if (r === Object) return true;
  if (typeof r != "function") return false;
  let n = Dd.get(r);
  return n === void 0 && (n = Function.toString.call(r), Dd.set(r, n)), n === EO;
}
function Bs(e3, t, r = true) {
  Ka(e3) === 0 ? (r ? Reflect.ownKeys(e3) : Object.keys(e3)).forEach((i) => {
    t(i, e3[i], e3);
  }) : e3.forEach((n, i) => t(i, n, e3));
}
function Ka(e3) {
  const t = e3[re];
  return t ? t.type_ : Array.isArray(e3) ? 1 : Ii(e3) ? 2 : Ua(e3) ? 3 : 0;
}
function Tu(e3, t) {
  return Ka(e3) === 2 ? e3.has(t) : Object.prototype.hasOwnProperty.call(e3, t);
}
function b0(e3, t, r) {
  const n = Ka(e3);
  n === 2 ? e3.set(t, r) : n === 3 ? e3.add(r) : e3[t] = r;
}
function AO(e3, t) {
  return e3 === t ? e3 !== 0 || 1 / e3 === 1 / t : e3 !== e3 && t !== t;
}
function Ii(e3) {
  return e3 instanceof Map;
}
function Ua(e3) {
  return e3 instanceof Set;
}
function Pr(e3) {
  return e3.copy_ || e3.base_;
}
function Nu(e3, t) {
  if (Ii(e3)) return new Map(e3);
  if (Ua(e3)) return new Set(e3);
  if (Array.isArray(e3)) return Array.prototype.slice.call(e3);
  const r = y0(e3);
  if (t === true || t === "class_only" && !r) {
    const n = Object.getOwnPropertyDescriptors(e3);
    delete n[re];
    let i = Reflect.ownKeys(n);
    for (let s = 0; s < i.length; s++) {
      const a = i[s], o = n[a];
      o.writable === false && (o.writable = true, o.configurable = true), (o.get || o.set) && (n[a] = { configurable: true, writable: true, enumerable: o.enumerable, value: e3[a] });
    }
    return Object.create(ci(e3), n);
  } else {
    const n = ci(e3);
    if (n !== null && r) return { ...e3 };
    const i = Object.create(n);
    return Object.assign(i, e3);
  }
}
function Ic(e3, t = false) {
  return qa(e3) || wn(e3) || !Lr(e3) || (Ka(e3) > 1 && Object.defineProperties(e3, { set: Qi, add: Qi, clear: Qi, delete: Qi }), Object.freeze(e3), t && Object.values(e3).forEach((r) => Ic(r, true))), e3;
}
function CO() {
  ve(2);
}
var Qi = { value: CO };
function qa(e3) {
  return e3 === null || typeof e3 != "object" ? true : Object.isFrozen(e3);
}
var jO = {};
function Rr(e3) {
  const t = jO[e3];
  return t || ve(0, e3), t;
}
var hi;
function w0() {
  return hi;
}
function kO(e3, t) {
  return { drafts_: [], parent_: e3, immer_: t, canAutoFreeze_: true, unfinalizedDrafts_: 0 };
}
function Ld(e3, t) {
  t && (Rr("Patches"), e3.patches_ = [], e3.inversePatches_ = [], e3.patchListener_ = t);
}
function Du(e3) {
  Lu(e3), e3.drafts_.forEach(IO), e3.drafts_ = null;
}
function Lu(e3) {
  e3 === hi && (hi = e3.parent_);
}
function Rd(e3) {
  return hi = kO(hi, e3);
}
function IO(e3) {
  const t = e3[re];
  t.type_ === 0 || t.type_ === 1 ? t.revoke_() : t.revoked_ = true;
}
function $d(e3, t) {
  t.unfinalizedDrafts_ = t.drafts_.length;
  const r = t.drafts_[0];
  return e3 !== void 0 && e3 !== r ? (r[re].modified_ && (Du(t), ve(4)), Lr(e3) && (e3 = Fs(t, e3), t.parent_ || Ws(t, e3)), t.patches_ && Rr("Patches").generateReplacementPatches_(r[re].base_, e3, t.patches_, t.inversePatches_)) : e3 = Fs(t, r, []), Du(t), t.patches_ && t.patchListener_(t.patches_, t.inversePatches_), e3 !== g0 ? e3 : void 0;
}
function Fs(e3, t, r) {
  if (qa(t)) return t;
  const n = e3.immer_.shouldUseStrictIteration(), i = t[re];
  if (!i) return Bs(t, (s, a) => zd(e3, i, t, s, a, r), n), t;
  if (i.scope_ !== e3) return t;
  if (!i.modified_) return Ws(e3, i.base_, true), i.base_;
  if (!i.finalized_) {
    i.finalized_ = true, i.scope_.unfinalizedDrafts_--;
    const s = i.copy_;
    let a = s, o = false;
    i.type_ === 3 && (a = new Set(s), s.clear(), o = true), Bs(a, (l, u) => zd(e3, i, s, l, u, r, o), n), Ws(e3, s, false), r && e3.patches_ && Rr("Patches").generatePatches_(i, r, e3.patches_, e3.inversePatches_);
  }
  return i.copy_;
}
function zd(e3, t, r, n, i, s, a) {
  if (i == null || typeof i != "object" && !a) return;
  const o = qa(i);
  if (!(o && !a)) {
    if (wn(i)) {
      const l = s && t && t.type_ !== 3 && !Tu(t.assigned_, n) ? s.concat(n) : void 0, u = Fs(e3, i, l);
      if (b0(r, n, u), wn(u)) e3.canAutoFreeze_ = false;
      else return;
    } else a && r.add(i);
    if (Lr(i) && !o) {
      if (!e3.immer_.autoFreeze_ && e3.unfinalizedDrafts_ < 1 || t && t.base_ && t.base_[n] === i && o) return;
      Fs(e3, i), (!t || !t.scope_.parent_) && typeof n != "symbol" && (Ii(r) ? r.has(n) : Object.prototype.propertyIsEnumerable.call(r, n)) && Ws(e3, i);
    }
  }
}
function Ws(e3, t, r = false) {
  !e3.parent_ && e3.immer_.autoFreeze_ && e3.canAutoFreeze_ && Ic(t, r);
}
function TO(e3, t) {
  const r = Array.isArray(e3), n = { type_: r ? 1 : 0, scope_: t ? t.scope_ : w0(), modified_: false, finalized_: false, assigned_: {}, parent_: t, base_: e3, draft_: null, copy_: null, revoke_: null, isManual_: false };
  let i = n, s = Tc;
  r && (i = [n], s = fi);
  const { revoke: a, proxy: o } = Proxy.revocable(i, s);
  return n.draft_ = o, n.revoke_ = a, o;
}
var Tc = { get(e3, t) {
  if (t === re) return e3;
  const r = Pr(e3);
  if (!Tu(r, t)) return NO(e3, r, t);
  const n = r[t];
  return e3.finalized_ || !Lr(n) ? n : n === Ol(e3.base_, t) ? (Ml(e3), e3.copy_[t] = $u(n, e3)) : n;
}, has(e3, t) {
  return t in Pr(e3);
}, ownKeys(e3) {
  return Reflect.ownKeys(Pr(e3));
}, set(e3, t, r) {
  const n = x0(Pr(e3), t);
  if (n == null ? void 0 : n.set) return n.set.call(e3.draft_, r), true;
  if (!e3.modified_) {
    const i = Ol(Pr(e3), t), s = i == null ? void 0 : i[re];
    if (s && s.base_ === r) return e3.copy_[t] = r, e3.assigned_[t] = false, true;
    if (AO(r, i) && (r !== void 0 || Tu(e3.base_, t))) return true;
    Ml(e3), Ru(e3);
  }
  return e3.copy_[t] === r && (r !== void 0 || t in e3.copy_) || Number.isNaN(r) && Number.isNaN(e3.copy_[t]) || (e3.copy_[t] = r, e3.assigned_[t] = true), true;
}, deleteProperty(e3, t) {
  return Ol(e3.base_, t) !== void 0 || t in e3.base_ ? (e3.assigned_[t] = false, Ml(e3), Ru(e3)) : delete e3.assigned_[t], e3.copy_ && delete e3.copy_[t], true;
}, getOwnPropertyDescriptor(e3, t) {
  const r = Pr(e3), n = Reflect.getOwnPropertyDescriptor(r, t);
  return n && { writable: true, configurable: e3.type_ !== 1 || t !== "length", enumerable: n.enumerable, value: r[t] };
}, defineProperty() {
  ve(11);
}, getPrototypeOf(e3) {
  return ci(e3.base_);
}, setPrototypeOf() {
  ve(12);
} }, fi = {};
Bs(Tc, (e3, t) => {
  fi[e3] = function() {
    return arguments[0] = arguments[0][0], t.apply(this, arguments);
  };
});
fi.deleteProperty = function(e3, t) {
  return fi.set.call(this, e3, t, void 0);
};
fi.set = function(e3, t, r) {
  return Tc.set.call(this, e3[0], t, r, e3[0]);
};
function Ol(e3, t) {
  const r = e3[re];
  return (r ? Pr(r) : e3)[t];
}
function NO(e3, t, r) {
  var _a3;
  const n = x0(t, r);
  return n ? "value" in n ? n.value : (_a3 = n.get) == null ? void 0 : _a3.call(e3.draft_) : void 0;
}
function x0(e3, t) {
  if (!(t in e3)) return;
  let r = ci(e3);
  for (; r; ) {
    const n = Object.getOwnPropertyDescriptor(r, t);
    if (n) return n;
    r = ci(r);
  }
}
function Ru(e3) {
  e3.modified_ || (e3.modified_ = true, e3.parent_ && Ru(e3.parent_));
}
function Ml(e3) {
  e3.copy_ || (e3.copy_ = Nu(e3.base_, e3.scope_.immer_.useStrictShallowCopy_));
}
var DO = class {
  constructor(e3) {
    this.autoFreeze_ = true, this.useStrictShallowCopy_ = false, this.useStrictIteration_ = true, this.produce = (t, r, n) => {
      if (typeof t == "function" && typeof r != "function") {
        const s = r;
        r = t;
        const a = this;
        return function(l = s, ...u) {
          return a.produce(l, (c) => r.call(this, c, ...u));
        };
      }
      typeof r != "function" && ve(6), n !== void 0 && typeof n != "function" && ve(7);
      let i;
      if (Lr(t)) {
        const s = Rd(this), a = $u(t, void 0);
        let o = true;
        try {
          i = r(a), o = false;
        } finally {
          o ? Du(s) : Lu(s);
        }
        return Ld(s, n), $d(i, s);
      } else if (!t || typeof t != "object") {
        if (i = r(t), i === void 0 && (i = t), i === g0 && (i = void 0), this.autoFreeze_ && Ic(i, true), n) {
          const s = [], a = [];
          Rr("Patches").generateReplacementPatches_(t, i, s, a), n(s, a);
        }
        return i;
      } else ve(1, t);
    }, this.produceWithPatches = (t, r) => {
      if (typeof t == "function") return (a, ...o) => this.produceWithPatches(a, (l) => t(l, ...o));
      let n, i;
      return [this.produce(t, r, (a, o) => {
        n = a, i = o;
      }), n, i];
    }, typeof (e3 == null ? void 0 : e3.autoFreeze) == "boolean" && this.setAutoFreeze(e3.autoFreeze), typeof (e3 == null ? void 0 : e3.useStrictShallowCopy) == "boolean" && this.setUseStrictShallowCopy(e3.useStrictShallowCopy), typeof (e3 == null ? void 0 : e3.useStrictIteration) == "boolean" && this.setUseStrictIteration(e3.useStrictIteration);
  }
  createDraft(e3) {
    Lr(e3) || ve(8), wn(e3) && (e3 = LO(e3));
    const t = Rd(this), r = $u(e3, void 0);
    return r[re].isManual_ = true, Lu(t), r;
  }
  finishDraft(e3, t) {
    const r = e3 && e3[re];
    (!r || !r.isManual_) && ve(9);
    const { scope_: n } = r;
    return Ld(n, t), $d(void 0, n);
  }
  setAutoFreeze(e3) {
    this.autoFreeze_ = e3;
  }
  setUseStrictShallowCopy(e3) {
    this.useStrictShallowCopy_ = e3;
  }
  setUseStrictIteration(e3) {
    this.useStrictIteration_ = e3;
  }
  shouldUseStrictIteration() {
    return this.useStrictIteration_;
  }
  applyPatches(e3, t) {
    let r;
    for (r = t.length - 1; r >= 0; r--) {
      const i = t[r];
      if (i.path.length === 0 && i.op === "replace") {
        e3 = i.value;
        break;
      }
    }
    r > -1 && (t = t.slice(r + 1));
    const n = Rr("Patches").applyPatches_;
    return wn(e3) ? n(e3, t) : this.produce(e3, (i) => n(i, t));
  }
};
function $u(e3, t) {
  const r = Ii(e3) ? Rr("MapSet").proxyMap_(e3, t) : Ua(e3) ? Rr("MapSet").proxySet_(e3, t) : TO(e3, t);
  return (t ? t.scope_ : w0()).drafts_.push(r), r;
}
function LO(e3) {
  return wn(e3) || ve(10, e3), P0(e3);
}
function P0(e3) {
  if (!Lr(e3) || qa(e3)) return e3;
  const t = e3[re];
  let r, n = true;
  if (t) {
    if (!t.modified_) return t.base_;
    t.finalized_ = true, r = Nu(e3, t.scope_.immer_.useStrictShallowCopy_), n = t.scope_.immer_.shouldUseStrictIteration();
  } else r = Nu(e3, true);
  return Bs(r, (i, s) => {
    b0(r, i, P0(s));
  }, n), t && (t.finalized_ = false), r;
}
var RO = new DO();
RO.produce;
var $O = { settings: { layout: "horizontal", align: "center", verticalAlign: "middle", itemSorter: "value" }, size: { width: 0, height: 0 }, payload: [] }, S0 = Nt({ name: "legend", initialState: $O, reducers: { setLegendSize(e3, t) {
  e3.size.width = t.payload.width, e3.size.height = t.payload.height;
}, setLegendSettings(e3, t) {
  e3.settings.align = t.payload.align, e3.settings.layout = t.payload.layout, e3.settings.verticalAlign = t.payload.verticalAlign, e3.settings.itemSorter = t.payload.itemSorter;
}, addLegendPayload: { reducer(e3, t) {
  e3.payload.push(t.payload);
}, prepare: rt() }, replaceLegendPayload: { reducer(e3, t) {
  var { prev: r, next: n } = t.payload, i = oe(e3).payload.indexOf(r);
  i > -1 && (e3.payload[i] = n);
}, prepare: rt() }, removeLegendPayload: { reducer(e3, t) {
  var r = oe(e3).payload.indexOf(t.payload);
  r > -1 && e3.payload.splice(r, 1);
}, prepare: rt() } } }), { setLegendSize: gF, setLegendSettings: yF, addLegendPayload: zO, replaceLegendPayload: BO, removeLegendPayload: FO } = S0.actions, WO = S0.reducer, El = { exports: {} }, Al = {};
/**
* @license React
* use-sync-external-store-with-selector.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var Bd;
function KO() {
  if (Bd) return Al;
  Bd = 1;
  var e3 = xa();
  function t(l, u) {
    return l === u && (l !== 0 || 1 / l === 1 / u) || l !== l && u !== u;
  }
  var r = typeof Object.is == "function" ? Object.is : t, n = e3.useSyncExternalStore, i = e3.useRef, s = e3.useEffect, a = e3.useMemo, o = e3.useDebugValue;
  return Al.useSyncExternalStoreWithSelector = function(l, u, c, h, f) {
    var d = i(null);
    if (d.current === null) {
      var v = { hasValue: false, value: null };
      d.current = v;
    } else v = d.current;
    d = a(function() {
      function m(P) {
        if (!y) {
          if (y = true, b = P, P = h(P), f !== void 0 && v.hasValue) {
            var S = v.value;
            if (f(S, P)) return w = S;
          }
          return w = P;
        }
        if (S = w, r(b, P)) return S;
        var _ = h(P);
        return f !== void 0 && f(S, _) ? (b = P, S) : (b = P, w = _);
      }
      var y = false, b, w, x = c === void 0 ? null : c;
      return [function() {
        return m(u());
      }, x === null ? void 0 : function() {
        return m(x());
      }];
    }, [u, c, h, f]);
    var p = n(l, d[0], d[1]);
    return s(function() {
      v.hasValue = true, v.value = p;
    }, [p]), o(p), p;
  }, Al;
}
var Fd;
function UO() {
  return Fd || (Fd = 1, El.exports = KO()), El.exports;
}
UO();
function qO(e3) {
  e3();
}
function VO() {
  let e3 = null, t = null;
  return { clear() {
    e3 = null, t = null;
  }, notify() {
    qO(() => {
      let r = e3;
      for (; r; ) r.callback(), r = r.next;
    });
  }, get() {
    const r = [];
    let n = e3;
    for (; n; ) r.push(n), n = n.next;
    return r;
  }, subscribe(r) {
    let n = true;
    const i = t = { callback: r, next: null, prev: t };
    return i.prev ? i.prev.next = i : e3 = i, function() {
      !n || e3 === null || (n = false, i.next ? i.next.prev = i.prev : t = i.prev, i.prev ? i.prev.next = i.next : e3 = i.next);
    };
  } };
}
var Wd = { notify() {
}, get: () => [] };
function YO(e3, t) {
  let r, n = Wd, i = 0, s = false;
  function a(p) {
    c();
    const m = n.subscribe(p);
    let y = false;
    return () => {
      y || (y = true, m(), h());
    };
  }
  function o() {
    n.notify();
  }
  function l() {
    v.onStateChange && v.onStateChange();
  }
  function u() {
    return s;
  }
  function c() {
    i++, r || (r = e3.subscribe(l), n = VO());
  }
  function h() {
    i--, r && i === 0 && (r(), r = void 0, n.clear(), n = Wd);
  }
  function f() {
    s || (s = true, c());
  }
  function d() {
    s && (s = false, h());
  }
  const v = { addNestedSub: a, notifyNestedSubs: o, handleChangeWrapper: l, isSubscribed: u, trySubscribe: f, tryUnsubscribe: d, getListeners: () => n };
  return v;
}
var HO = () => typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", GO = HO(), XO = () => typeof navigator < "u" && navigator.product === "ReactNative", JO = XO(), ZO = () => GO || JO ? g.useLayoutEffect : g.useEffect, QO = ZO();
function Kd(e3, t) {
  return e3 === t ? e3 !== 0 || t !== 0 || 1 / e3 === 1 / t : e3 !== e3 && t !== t;
}
function tM(e3, t) {
  if (Kd(e3, t)) return true;
  if (typeof e3 != "object" || e3 === null || typeof t != "object" || t === null) return false;
  const r = Object.keys(e3), n = Object.keys(t);
  if (r.length !== n.length) return false;
  for (let i = 0; i < r.length; i++) if (!Object.prototype.hasOwnProperty.call(t, r[i]) || !Kd(e3[r[i]], t[r[i]])) return false;
  return true;
}
var eM = Symbol.for("react-redux-context"), rM = typeof globalThis < "u" ? globalThis : {};
function nM() {
  if (!g.createContext) return {};
  const e3 = rM[eM] ?? (rM[eM] = /* @__PURE__ */ new Map());
  let t = e3.get(g.createContext);
  return t || (t = g.createContext(null), e3.set(g.createContext, t)), t;
}
var iM = nM();
function sM(e3) {
  const { children: t, context: r, serverState: n, store: i } = e3, s = g.useMemo(() => {
    const l = YO(i);
    return { store: i, subscription: l, getServerState: n ? () => n : void 0 };
  }, [i, n]), a = g.useMemo(() => i.getState(), [i]);
  QO(() => {
    const { subscription: l } = s;
    return l.onStateChange = l.notifyNestedSubs, l.trySubscribe(), a !== i.getState() && l.notifyNestedSubs(), () => {
      l.tryUnsubscribe(), l.onStateChange = void 0;
    };
  }, [s, a]);
  const o = r || iM;
  return g.createElement(o.Provider, { value: s }, t);
}
var aM = sM, oM = /* @__PURE__ */ new Set(["axisLine", "tickLine", "activeBar", "activeDot", "activeLabel", "activeShape", "allowEscapeViewBox", "background", "cursor", "dot", "label", "line", "margin", "padding", "position", "shape", "style", "tick", "wrapperStyle", "radius", "throttledEvents"]);
function lM(e3, t) {
  return e3 == null && t == null ? true : typeof e3 == "number" && typeof t == "number" ? e3 === t || e3 !== e3 && t !== t : e3 === t;
}
function Ti(e3, t) {
  var r = /* @__PURE__ */ new Set([...Object.keys(e3), ...Object.keys(t)]);
  for (var n of r) if (oM.has(n)) {
    if (e3[n] == null && t[n] == null) continue;
    if (!tM(e3[n], t[n])) return false;
  } else if (!lM(e3[n], t[n])) return false;
  return true;
}
function zu() {
  return zu = Object.assign ? Object.assign.bind() : function(e3) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e3[n] = r[n]);
    }
    return e3;
  }, zu.apply(null, arguments);
}
function Ud(e3, t) {
  var r = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e3);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e3, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function zn(e3) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Ud(Object(r), true).forEach(function(n) {
      uM(e3, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(r)) : Ud(Object(r)).forEach(function(n) {
      Object.defineProperty(e3, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e3;
}
function uM(e3, t, r) {
  return (t = cM(t)) in e3 ? Object.defineProperty(e3, t, { value: r, enumerable: true, configurable: true, writable: true }) : e3[t] = r, e3;
}
function cM(e3) {
  var t = hM(e3, "string");
  return typeof t == "symbol" ? t : t + "";
}
function hM(e3, t) {
  if (typeof e3 != "object" || !e3) return e3;
  var r = e3[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e3, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e3);
}
function fM(e3) {
  return Array.isArray(e3) && je(e3[0]) && je(e3[1]) ? e3.join(" ~ ") : e3;
}
var Xr = { separator: " : ", contentStyle: { margin: 0, padding: 10, backgroundColor: "#fff", border: "1px solid #ccc", whiteSpace: "nowrap" }, itemStyle: { display: "block", paddingTop: 4, paddingBottom: 4, color: "#000" }, labelStyle: {}, accessibilityLayer: false };
function dM(e3, t) {
  return t == null ? e3 : Ea(e3, t);
}
var vM = (e3) => {
  var { separator: t = Xr.separator, contentStyle: r, itemStyle: n, labelStyle: i = Xr.labelStyle, payload: s, formatter: a, itemSorter: o, wrapperClassName: l, labelClassName: u, label: c, labelFormatter: h, accessibilityLayer: f = Xr.accessibilityLayer } = e3, d = () => {
    if (s && s.length) {
      var P = { padding: 0, margin: 0 }, S = dM(s, o), _ = S.map((M, A) => {
        if (!M || M.type === "none") return null;
        var j = M.formatter || a || fM, { value: k, name: E } = M, $ = k, R = E;
        if (j) {
          var B = j(k, E, M, A, s);
          if (Array.isArray(B)) [$, R] = B;
          else if (B != null) $ = B;
          else return null;
        }
        var H = zn(zn({}, Xr.itemStyle), {}, { color: M.color || Xr.itemStyle.color }, n);
        return g.createElement("li", { className: "recharts-tooltip-item", key: "tooltip-item-".concat(A), style: H }, je(R) ? g.createElement("span", { className: "recharts-tooltip-item-name" }, R) : null, je(R) ? g.createElement("span", { className: "recharts-tooltip-item-separator" }, t) : null, g.createElement("span", { className: "recharts-tooltip-item-value" }, $), g.createElement("span", { className: "recharts-tooltip-item-unit" }, M.unit || ""));
      });
      return g.createElement("ul", { className: "recharts-tooltip-item-list", style: P }, _);
    }
    return null;
  }, v = zn(zn({}, Xr.contentStyle), r), p = zn({ margin: 0 }, i), m = !mt(c), y = m ? c : "", b = X("recharts-default-tooltip", l), w = X("recharts-tooltip-label", u);
  m && h && s !== void 0 && s !== null && (y = h(c, s));
  var x = f ? { role: "status", "aria-live": "assertive" } : {};
  return g.createElement("div", zu({ className: b, style: v }, x), g.createElement("p", { className: w, style: p }, g.isValidElement(y) ? y : "".concat(y)), d());
}, Bn = "recharts-tooltip-wrapper", pM = { visibility: "hidden" };
function mM(e3) {
  var { coordinate: t, translateX: r, translateY: n } = e3;
  return X(Bn, { ["".concat(Bn, "-right")]: L(r) && t && L(t.x) && r >= t.x, ["".concat(Bn, "-left")]: L(r) && t && L(t.x) && r < t.x, ["".concat(Bn, "-bottom")]: L(n) && t && L(t.y) && n >= t.y, ["".concat(Bn, "-top")]: L(n) && t && L(t.y) && n < t.y });
}
function qd(e3) {
  var { allowEscapeViewBox: t, coordinate: r, key: n, offset: i, position: s, reverseDirection: a, tooltipDimension: o, viewBox: l, viewBoxDimension: u } = e3;
  if (s && L(s[n])) return s[n];
  var c = r[n] - o - (i > 0 ? i : 0), h = r[n] + i;
  if (t[n]) return a[n] ? c : h;
  var f = l[n];
  if (f == null) return 0;
  if (a[n]) {
    var d = c, v = f;
    return d < v ? Math.max(h, f) : Math.max(c, f);
  }
  if (u == null) return 0;
  var p = h + o, m = f + u;
  return p > m ? Math.max(c, f) : Math.max(h, f);
}
function gM(e3) {
  var { translateX: t, translateY: r, useTranslate3d: n } = e3;
  return { transform: n ? "translate3d(".concat(t, "px, ").concat(r, "px, 0)") : "translate(".concat(t, "px, ").concat(r, "px)") };
}
function yM(e3) {
  var { allowEscapeViewBox: t, coordinate: r, offsetTop: n, offsetLeft: i, position: s, reverseDirection: a, tooltipBox: o, useTranslate3d: l, viewBox: u } = e3, c, h, f;
  return o.height > 0 && o.width > 0 && r ? (h = qd({ allowEscapeViewBox: t, coordinate: r, key: "x", offset: i, position: s, reverseDirection: a, tooltipDimension: o.width, viewBox: u, viewBoxDimension: u.width }), f = qd({ allowEscapeViewBox: t, coordinate: r, key: "y", offset: n, position: s, reverseDirection: a, tooltipDimension: o.height, viewBox: u, viewBoxDimension: u.height }), c = gM({ translateX: h, translateY: f, useTranslate3d: l })) : c = pM, { cssProperties: c, cssClasses: mM({ translateX: h, translateY: f, coordinate: r }) };
}
var bM = () => !(typeof window < "u" && window.document && window.document.createElement && window.setTimeout), Ni = { isSsr: bM() };
function _0() {
  var [e3, t] = g.useState(() => Ni.isSsr || !window.matchMedia ? false : window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  return g.useEffect(() => {
    if (window.matchMedia) {
      var r = window.matchMedia("(prefers-reduced-motion: reduce)"), n = () => {
        t(r.matches);
      };
      return r.addEventListener("change", n), () => {
        r.removeEventListener("change", n);
      };
    }
  }, []), e3;
}
function Vd(e3, t) {
  var r = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e3);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e3, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Jr(e3) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Vd(Object(r), true).forEach(function(n) {
      wM(e3, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(r)) : Vd(Object(r)).forEach(function(n) {
      Object.defineProperty(e3, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e3;
}
function wM(e3, t, r) {
  return (t = xM(t)) in e3 ? Object.defineProperty(e3, t, { value: r, enumerable: true, configurable: true, writable: true }) : e3[t] = r, e3;
}
function xM(e3) {
  var t = PM(e3, "string");
  return typeof t == "symbol" ? t : t + "";
}
function PM(e3, t) {
  if (typeof e3 != "object" || !e3) return e3;
  var r = e3[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e3, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e3);
}
function SM(e3) {
  if (!(e3.prefersReducedMotion && e3.isAnimationActive === "auto") && e3.isAnimationActive && e3.active) return "transform ".concat(e3.animationDuration, "ms ").concat(e3.animationEasing);
}
function _M(e3) {
  var t, r, n, i, s, a, o = _0(), [l, u] = g.useState(() => ({ dismissed: false, dismissedAtCoordinate: { x: 0, y: 0 } }));
  g.useEffect(() => {
    var v = (p) => {
      if (p.key === "Escape") {
        var m, y, b, w;
        u({ dismissed: true, dismissedAtCoordinate: { x: (m = (y = e3.coordinate) === null || y === void 0 ? void 0 : y.x) !== null && m !== void 0 ? m : 0, y: (b = (w = e3.coordinate) === null || w === void 0 ? void 0 : w.y) !== null && b !== void 0 ? b : 0 } });
      }
    };
    return document.addEventListener("keydown", v), () => {
      document.removeEventListener("keydown", v);
    };
  }, [(t = e3.coordinate) === null || t === void 0 ? void 0 : t.x, (r = e3.coordinate) === null || r === void 0 ? void 0 : r.y]), l.dismissed && (((n = (i = e3.coordinate) === null || i === void 0 ? void 0 : i.x) !== null && n !== void 0 ? n : 0) !== l.dismissedAtCoordinate.x || ((s = (a = e3.coordinate) === null || a === void 0 ? void 0 : a.y) !== null && s !== void 0 ? s : 0) !== l.dismissedAtCoordinate.y) && u(Jr(Jr({}, l), {}, { dismissed: false }));
  var { cssClasses: c, cssProperties: h } = yM({ allowEscapeViewBox: e3.allowEscapeViewBox, coordinate: e3.coordinate, offsetLeft: typeof e3.offset == "number" ? e3.offset : e3.offset.x, offsetTop: typeof e3.offset == "number" ? e3.offset : e3.offset.y, position: e3.position, reverseDirection: e3.reverseDirection, tooltipBox: { height: e3.lastBoundingBox.height, width: e3.lastBoundingBox.width }, useTranslate3d: e3.useTranslate3d, viewBox: e3.viewBox }), f = e3.hasPortalFromProps ? {} : Jr(Jr({ transition: SM({ prefersReducedMotion: o, isAnimationActive: e3.isAnimationActive, active: e3.active, animationDuration: e3.animationDuration, animationEasing: e3.animationEasing }) }, h), {}, { pointerEvents: "none", position: "absolute", top: 0, left: 0 }), d = Jr(Jr({}, f), {}, { visibility: !l.dismissed && e3.active && e3.hasPayload ? "visible" : "hidden" }, e3.wrapperStyle);
  return g.createElement("div", { xmlns: "http://www.w3.org/1999/xhtml", tabIndex: -1, className: c, style: d, ref: e3.innerRef }, e3.children);
}
var OM = g.memo(_M), O0 = () => {
  var e3;
  return (e3 = z((t) => t.rootProps.accessibilityLayer)) !== null && e3 !== void 0 ? e3 : true;
};
function Bu() {
  return Bu = Object.assign ? Object.assign.bind() : function(e3) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e3[n] = r[n]);
    }
    return e3;
  }, Bu.apply(null, arguments);
}
function Yd(e3, t) {
  var r = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e3);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e3, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Hd(e3) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Yd(Object(r), true).forEach(function(n) {
      MM(e3, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(r)) : Yd(Object(r)).forEach(function(n) {
      Object.defineProperty(e3, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e3;
}
function MM(e3, t, r) {
  return (t = EM(t)) in e3 ? Object.defineProperty(e3, t, { value: r, enumerable: true, configurable: true, writable: true }) : e3[t] = r, e3;
}
function EM(e3) {
  var t = AM(e3, "string");
  return typeof t == "symbol" ? t : t + "";
}
function AM(e3, t) {
  if (typeof e3 != "object" || !e3) return e3;
  var r = e3[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e3, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e3);
}
var Gd = { curveBasisClosed: iP, curveBasisOpen: sP, curveBasis: nP, curveBumpX: K1, curveBumpY: U1, curveLinearClosed: aP, curveLinear: _a, curveMonotoneX: oP, curveMonotoneY: lP, curveNatural: uP, curveStep: cP, curveStepAfter: fP, curveStepBefore: hP }, Ks = (e3) => K(e3.x) && K(e3.y), Xd = (e3) => e3.base != null && Ks(e3.base) && Ks(e3), Fn = (e3) => e3.x, Wn = (e3) => e3.y, CM = (e3, t) => {
  if (typeof e3 == "function") return e3;
  var r = "curve".concat(Ei(e3));
  if ((r === "curveMonotone" || r === "curveBump") && t) {
    var n = Gd["".concat(r).concat(t === "vertical" ? "Y" : "X")];
    if (n) return n;
  }
  return Gd[r] || _a;
}, Jd = { connectNulls: false, type: "linear" }, jM = (e3) => {
  var { type: t = Jd.type, points: r = [], baseLine: n, layout: i, connectNulls: s = Jd.connectNulls } = e3, a = CM(t, i), o = s ? r.filter(Ks) : r;
  if (Array.isArray(n)) {
    var l, u = r.map((v, p) => Hd(Hd({}, v), {}, { base: n[p] }));
    i === "vertical" ? l = Vi().y(Wn).x1(Fn).x0((v) => v.base.x) : l = Vi().x(Fn).y1(Wn).y0((v) => v.base.y);
    var c = l.defined(Xd).curve(a), h = s ? u.filter(Xd) : u;
    return c(h);
  }
  var f;
  i === "vertical" && L(n) ? f = Vi().y(Wn).x1(Fn).x0(n) : L(n) ? f = Vi().x(Fn).y1(Wn).y0(n) : f = Qg().x(Fn).y(Wn);
  var d = f.defined(Ks).curve(a);
  return d(o);
}, ti = (e3) => {
  var { className: t, points: r, path: n, pathRef: i } = e3, s = Vr();
  if ((!r || !r.length) && !n) return null;
  var a = { type: e3.type, points: e3.points, baseLine: e3.baseLine, layout: e3.layout || s, connectNulls: e3.connectNulls }, o = r && r.length ? jM(a) : n;
  return g.createElement("path", Bu({}, ue(e3), wc(e3), { className: X("recharts-curve", t), d: o === null ? void 0 : o, ref: i }));
}, kM = ["x", "y", "top", "left", "width", "height", "className"];
function Fu() {
  return Fu = Object.assign ? Object.assign.bind() : function(e3) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e3[n] = r[n]);
    }
    return e3;
  }, Fu.apply(null, arguments);
}
function Zd(e3, t) {
  var r = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e3);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e3, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function IM(e3) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Zd(Object(r), true).forEach(function(n) {
      TM(e3, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(r)) : Zd(Object(r)).forEach(function(n) {
      Object.defineProperty(e3, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e3;
}
function TM(e3, t, r) {
  return (t = NM(t)) in e3 ? Object.defineProperty(e3, t, { value: r, enumerable: true, configurable: true, writable: true }) : e3[t] = r, e3;
}
function NM(e3) {
  var t = DM(e3, "string");
  return typeof t == "symbol" ? t : t + "";
}
function DM(e3, t) {
  if (typeof e3 != "object" || !e3) return e3;
  var r = e3[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e3, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e3);
}
function LM(e3, t) {
  if (e3 == null) return {};
  var r, n, i = RM(e3, t);
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(e3);
    for (n = 0; n < s.length; n++) r = s[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e3, r) && (i[r] = e3[r]);
  }
  return i;
}
function RM(e3, t) {
  if (e3 == null) return {};
  var r = {};
  for (var n in e3) if ({}.hasOwnProperty.call(e3, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e3[n];
  }
  return r;
}
var $M = (e3, t, r, n, i, s) => "M".concat(e3, ",").concat(i, "v").concat(n, "M").concat(s, ",").concat(t, "h").concat(r), zM = (e3) => {
  var { x: t = 0, y: r = 0, top: n = 0, left: i = 0, width: s = 0, height: a = 0, className: o } = e3, l = LM(e3, kM), u = IM({ x: t, y: r, top: n, left: i, width: s, height: a }, l);
  return !L(t) || !L(r) || !L(s) || !L(a) || !L(n) || !L(i) ? null : g.createElement("path", Fu({}, Tt(u), { className: X("recharts-cross", o), d: $M(t, r, s, a, n, i) }));
};
function BM(e3, t, r, n) {
  var i = n / 2;
  return { stroke: "none", fill: "#ccc", x: e3 === "horizontal" ? t.x - i : r.left + 0.5, y: e3 === "horizontal" ? r.top + 0.5 : t.y - i, width: e3 === "horizontal" ? n : r.width - 1, height: e3 === "horizontal" ? r.height - 1 : n };
}
function Qd(e3, t) {
  var r = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e3);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e3, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function tv(e3) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Qd(Object(r), true).forEach(function(n) {
      FM(e3, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(r)) : Qd(Object(r)).forEach(function(n) {
      Object.defineProperty(e3, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e3;
}
function FM(e3, t, r) {
  return (t = WM(t)) in e3 ? Object.defineProperty(e3, t, { value: r, enumerable: true, configurable: true, writable: true }) : e3[t] = r, e3;
}
function WM(e3) {
  var t = KM(e3, "string");
  return typeof t == "symbol" ? t : t + "";
}
function KM(e3, t) {
  if (typeof e3 != "object" || !e3) return e3;
  var r = e3[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e3, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e3);
}
var UM = (e3) => e3.replace(/([A-Z])/g, (t) => "-".concat(t.toLowerCase())), M0 = (e3, t, r) => e3.map((n) => "".concat(UM(n), " ").concat(t, "ms ").concat(r)).join(","), qM = (e3, t) => [Object.keys(e3), Object.keys(t)].reduce((r, n) => r.filter((i) => n.includes(i))), di = (e3, t) => Object.keys(t).reduce((r, n) => tv(tv({}, r), {}, { [n]: e3(n, t[n]) }), {});
function ev(e3, t) {
  var r = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e3);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e3, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function pt(e3) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? ev(Object(r), true).forEach(function(n) {
      VM(e3, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(r)) : ev(Object(r)).forEach(function(n) {
      Object.defineProperty(e3, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e3;
}
function VM(e3, t, r) {
  return (t = YM(t)) in e3 ? Object.defineProperty(e3, t, { value: r, enumerable: true, configurable: true, writable: true }) : e3[t] = r, e3;
}
function YM(e3) {
  var t = HM(e3, "string");
  return typeof t == "symbol" ? t : t + "";
}
function HM(e3, t) {
  if (typeof e3 != "object" || !e3) return e3;
  var r = e3[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e3, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e3);
}
var Us = (e3, t, r) => e3 + (t - e3) * r, Wu = (e3) => {
  var { from: t, to: r } = e3;
  return t !== r;
}, E0 = (e3, t, r) => {
  var n = di((i, s) => {
    if (Wu(s)) {
      var [a, o] = e3(s.from, s.to, s.velocity);
      return pt(pt({}, s), {}, { from: a, velocity: o });
    }
    return s;
  }, t);
  return r < 1 ? di((i, s) => Wu(s) && n[i] != null ? pt(pt({}, s), {}, { velocity: Us(s.velocity, n[i].velocity, r), from: Us(s.from, n[i].from, r) }) : s, t) : E0(e3, n, r - 1);
};
function GM(e3, t, r, n, i, s) {
  var a, o = n.reduce((f, d) => pt(pt({}, f), {}, { [d]: { from: e3[d], velocity: 0, to: t[d] } }), {}), l = () => di((f, d) => d.from, o), u = () => !Object.values(o).filter(Wu).length, c = null, h = (f) => {
    a || (a = f);
    var d = f - a, v = d / r.dt;
    o = E0(r, o, v), i(pt(pt(pt({}, e3), t), l())), a = f, u() || (c = s.setTimeout(h));
  };
  return () => (c = s.setTimeout(h), () => {
    var f;
    (f = c) === null || f === void 0 || f();
  });
}
function XM(e3, t, r, n, i, s, a) {
  var o = null, l = i.reduce((h, f) => {
    var d = e3[f], v = t[f];
    return d == null || v == null ? h : pt(pt({}, h), {}, { [f]: [d, v] });
  }, {}), u, c = (h) => {
    u || (u = h);
    var f = (h - u) / n, d = di((p, m) => Us(...m, r(f)), l);
    if (s(pt(pt(pt({}, e3), t), d)), f < 1) o = a.setTimeout(c);
    else {
      var v = di((p, m) => Us(...m, r(1)), l);
      s(pt(pt(pt({}, e3), t), v));
    }
  };
  return () => (o = a.setTimeout(c), () => {
    var h;
    (h = o) === null || h === void 0 || h();
  });
}
const JM = (e3, t, r, n, i, s) => {
  var a = qM(e3, t);
  return r == null ? () => (i(pt(pt({}, e3), t)), () => {
  }) : r.isStepper === true ? GM(e3, t, r, a, i, s) : XM(e3, t, r, n, a, i, s);
};
var qs = 1e-4, A0 = (e3, t) => [0, 3 * e3, 3 * t - 6 * e3, 3 * e3 - 3 * t + 1], C0 = (e3, t) => e3.map((r, n) => r * t ** n).reduce((r, n) => r + n), rv = (e3, t) => (r) => {
  var n = A0(e3, t);
  return C0(n, r);
}, ZM = (e3, t) => (r) => {
  var n = A0(e3, t), i = [...n.map((s, a) => s * a).slice(1), 0];
  return C0(i, r);
}, QM = (e3) => {
  var t, r = e3.split("(");
  if (r.length !== 2 || r[0] !== "cubic-bezier") return null;
  var n = (t = r[1]) === null || t === void 0 || (t = t.split(")")[0]) === null || t === void 0 ? void 0 : t.split(",");
  if (n == null || n.length !== 4) return null;
  var i = n.map((s) => parseFloat(s));
  return [i[0], i[1], i[2], i[3]];
}, tE = function() {
  for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++) r[n] = arguments[n];
  if (r.length === 1) switch (r[0]) {
    case "linear":
      return [0, 0, 1, 1];
    case "ease":
      return [0.25, 0.1, 0.25, 1];
    case "ease-in":
      return [0.42, 0, 1, 1];
    case "ease-out":
      return [0.42, 0, 0.58, 1];
    case "ease-in-out":
      return [0, 0, 0.58, 1];
    default: {
      var i = QM(r[0]);
      if (i) return i;
    }
  }
  return r.length === 4 ? r : [0, 0, 1, 1];
}, eE = (e3, t, r, n) => {
  var i = rv(e3, r), s = rv(t, n), a = ZM(e3, r), o = (u) => u > 1 ? 1 : u < 0 ? 0 : u, l = (u) => {
    for (var c = u > 1 ? 1 : u, h = c, f = 0; f < 8; ++f) {
      var d = i(h) - c, v = a(h);
      if (Math.abs(d - c) < qs || v < qs) return s(h);
      h = o(h - d / v);
    }
    return s(h);
  };
  return l.isStepper = false, l;
}, nv = function() {
  return eE(...tE(...arguments));
}, rE = function() {
  var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, { stiff: r = 100, damping: n = 8, dt: i = 17 } = t, s = (a, o, l) => {
    var u = -(a - o) * r, c = l * n, h = l + (u - c) * i / 1e3, f = l * i / 1e3 + a;
    return Math.abs(f - o) < qs && Math.abs(h) < qs ? [o, 0] : [f, h];
  };
  return s.isStepper = true, s.dt = i, s;
}, nE = (e3) => {
  if (typeof e3 == "string") switch (e3) {
    case "ease":
    case "ease-in-out":
    case "ease-out":
    case "ease-in":
    case "linear":
      return nv(e3);
    case "spring":
      return rE();
    default:
      if (e3.split("(")[0] === "cubic-bezier") return nv(e3);
  }
  return typeof e3 == "function" ? e3 : null;
};
function iE(e3) {
  var t, r = () => null, n = false, i = null, s = (a) => {
    if (!n) {
      if (Array.isArray(a)) {
        if (!a.length) return;
        var o = a, [l, ...u] = o;
        if (typeof l == "number") {
          i = e3.setTimeout(s.bind(null, u), l);
          return;
        }
        s(l), i = e3.setTimeout(s.bind(null, u));
        return;
      }
      typeof a == "string" && (t = a, r(t)), typeof a == "object" && (t = a, r(t)), typeof a == "function" && a();
    }
  };
  return { stop: () => {
    n = true;
  }, start: (a) => {
    n = false, i && (i(), i = null), s(a);
  }, subscribe: (a) => (r = a, () => {
    r = () => null;
  }), getTimeoutController: () => e3 };
}
class sE {
  setTimeout(t) {
    var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, n = performance.now(), i = null, s = (a) => {
      a - n >= r ? t(a) : typeof requestAnimationFrame == "function" && (i = requestAnimationFrame(s));
    };
    return i = requestAnimationFrame(s), () => {
      i != null && cancelAnimationFrame(i);
    };
  }
}
function aE() {
  return iE(new sE());
}
var oE = g.createContext(aE);
function lE(e3, t) {
  var r = g.useContext(oE);
  return g.useMemo(() => t ?? r(e3), [e3, t, r]);
}
var uE = { begin: 0, duration: 1e3, easing: "ease", isActive: true, canBegin: true, onAnimationEnd: () => {
}, onAnimationStart: () => {
} }, iv = { t: 0 }, Cl = { t: 1 };
function Va(e3) {
  var t = Bt(e3, uE), { isActive: r, canBegin: n, duration: i, easing: s, begin: a, onAnimationEnd: o, onAnimationStart: l, children: u } = t, c = _0(), h = r === "auto" ? !Ni.isSsr && !c : r, f = lE(t.animationId, t.animationManager), [d, v] = g.useState(h ? iv : Cl), p = g.useRef(null);
  return g.useEffect(() => {
    h || v(Cl);
  }, [h]), g.useEffect(() => {
    if (!h || !n) return qr;
    var m = JM(iv, Cl, nE(s), i, v, f.getTimeoutController()), y = () => {
      p.current = m();
    };
    return f.start([l, a, y, i, o]), () => {
      f.stop(), p.current && p.current(), o();
    };
  }, [h, n, i, s, a, l, o, f]), u(d.t);
}
function Ya(e3) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "animation-", r = g.useRef(ai(t)), n = g.useRef(e3);
  return n.current !== e3 && (r.current = ai(t), n.current = e3), r.current;
}
var cE = ["radius"], hE = ["radius"], sv, av, ov, lv, uv, cv, hv, fv, dv, vv;
function pv(e3, t) {
  var r = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e3);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e3, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function mv(e3) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? pv(Object(r), true).forEach(function(n) {
      fE(e3, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(r)) : pv(Object(r)).forEach(function(n) {
      Object.defineProperty(e3, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e3;
}
function fE(e3, t, r) {
  return (t = dE(t)) in e3 ? Object.defineProperty(e3, t, { value: r, enumerable: true, configurable: true, writable: true }) : e3[t] = r, e3;
}
function dE(e3) {
  var t = vE(e3, "string");
  return typeof t == "symbol" ? t : t + "";
}
function vE(e3, t) {
  if (typeof e3 != "object" || !e3) return e3;
  var r = e3[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e3, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e3);
}
function Vs() {
  return Vs = Object.assign ? Object.assign.bind() : function(e3) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e3[n] = r[n]);
    }
    return e3;
  }, Vs.apply(null, arguments);
}
function gv(e3, t) {
  if (e3 == null) return {};
  var r, n, i = pE(e3, t);
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(e3);
    for (n = 0; n < s.length; n++) r = s[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e3, r) && (i[r] = e3[r]);
  }
  return i;
}
function pE(e3, t) {
  if (e3 == null) return {};
  var r = {};
  for (var n in e3) if ({}.hasOwnProperty.call(e3, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e3[n];
  }
  return r;
}
function we(e3, t) {
  return t || (t = e3.slice(0)), Object.freeze(Object.defineProperties(e3, { raw: { value: Object.freeze(t) } }));
}
var yv = (e3, t, r, n, i) => {
  var s = ar(r), a = ar(n), o = Math.min(Math.abs(s) / 2, Math.abs(a) / 2), l = a >= 0 ? 1 : -1, u = s >= 0 ? 1 : -1, c = a >= 0 && s >= 0 || a < 0 && s < 0 ? 1 : 0, h;
  if (o > 0 && Array.isArray(i)) {
    for (var f = [0, 0, 0, 0], d = 0, v = 4; d < v; d++) {
      var p, m = (p = i[d]) !== null && p !== void 0 ? p : 0;
      f[d] = m > o ? o : m;
    }
    h = ot(sv || (sv = we(["M", ",", ""])), e3, t + l * f[0]), f[0] > 0 && (h += ot(av || (av = we(["A ", ",", ",0,0,", ",", ",", ""])), f[0], f[0], c, e3 + u * f[0], t)), h += ot(ov || (ov = we(["L ", ",", ""])), e3 + r - u * f[1], t), f[1] > 0 && (h += ot(lv || (lv = we(["A ", ",", ",0,0,", `,
        `, ",", ""])), f[1], f[1], c, e3 + r, t + l * f[1])), h += ot(uv || (uv = we(["L ", ",", ""])), e3 + r, t + n - l * f[2]), f[2] > 0 && (h += ot(cv || (cv = we(["A ", ",", ",0,0,", `,
        `, ",", ""])), f[2], f[2], c, e3 + r - u * f[2], t + n)), h += ot(hv || (hv = we(["L ", ",", ""])), e3 + u * f[3], t + n), f[3] > 0 && (h += ot(fv || (fv = we(["A ", ",", ",0,0,", `,
        `, ",", ""])), f[3], f[3], c, e3, t + n - l * f[3])), h += "Z";
  } else if (o > 0 && i === +i && i > 0) {
    var y = Math.min(o, i);
    h = ot(dv || (dv = we(["M ", ",", `
            A `, ",", ",0,0,", ",", ",", `
            L `, ",", `
            A `, ",", ",0,0,", ",", ",", `
            L `, ",", `
            A `, ",", ",0,0,", ",", ",", `
            L `, ",", `
            A `, ",", ",0,0,", ",", ",", " Z"])), e3, t + l * y, y, y, c, e3 + u * y, t, e3 + r - u * y, t, y, y, c, e3 + r, t + l * y, e3 + r, t + n - l * y, y, y, c, e3 + r - u * y, t + n, e3 + u * y, t + n, y, y, c, e3, t + n - l * y);
  } else h = ot(vv || (vv = we(["M ", ",", " h ", " v ", " h ", " Z"])), e3, t, r, n, -r);
  return h;
}, bv = { x: 0, y: 0, width: 0, height: 0, radius: 0, isAnimationActive: false, isUpdateAnimationActive: false, animationBegin: 0, animationDuration: 1500, animationEasing: "ease" }, j0 = (e3) => {
  var t = Bt(e3, bv), r = g.useRef(null), [n, i] = g.useState(-1);
  g.useEffect(() => {
    if (r.current && r.current.getTotalLength) try {
      var W = r.current.getTotalLength();
      W && i(W);
    } catch {
    }
  }, []);
  var { x: s, y: a, width: o, height: l, radius: u, className: c } = t, { animationEasing: h, animationDuration: f, animationBegin: d, isAnimationActive: v, isUpdateAnimationActive: p } = t, m = g.useRef(o), y = g.useRef(l), b = g.useRef(s), w = g.useRef(a), x = g.useMemo(() => ({ x: s, y: a, width: o, height: l, radius: u }), [s, a, o, l, u]), P = Ya(x, "rectangle-");
  if (s !== +s || a !== +a || o !== +o || l !== +l || o === 0 || l === 0) return null;
  var S = X("recharts-rectangle", c);
  if (!p) {
    var _ = Tt(t), { radius: M } = _, A = gv(_, cE);
    return g.createElement("path", Vs({}, A, { x: ar(s), y: ar(a), width: ar(o), height: ar(l), radius: typeof u == "number" ? u : void 0, className: S, d: yv(s, a, o, l, u) }));
  }
  var j = m.current, k = y.current, E = b.current, $ = w.current, R = "0px ".concat(n === -1 ? 1 : n, "px"), B = "".concat(n, "px ").concat(n, "px"), H = M0(["strokeDasharray"], f, typeof h == "string" ? h : bv.animationEasing);
  return g.createElement(Va, { animationId: P, key: P, canBegin: n > 0, duration: f, easing: h, isActive: p, begin: d }, (W) => {
    var G = ut(j, o, W), F = ut(k, l, W), q = ut(E, s, W), Lt = ut($, a, W);
    r.current && (m.current = G, y.current = F, b.current = q, w.current = Lt);
    var st;
    v ? W > 0 ? st = { transition: H, strokeDasharray: B } : st = { strokeDasharray: R } : st = { strokeDasharray: B };
    var fe = Tt(t), { radius: Wt } = fe, De = gv(fe, hE);
    return g.createElement("path", Vs({}, De, { radius: typeof u == "number" ? u : void 0, className: S, d: yv(q, Lt, G, F, u), ref: r, style: mv(mv({}, st), t.style) }));
  });
};
function wv(e3, t) {
  var r = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e3);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e3, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function xv(e3) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? wv(Object(r), true).forEach(function(n) {
      mE(e3, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(r)) : wv(Object(r)).forEach(function(n) {
      Object.defineProperty(e3, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e3;
}
function mE(e3, t, r) {
  return (t = gE(t)) in e3 ? Object.defineProperty(e3, t, { value: r, enumerable: true, configurable: true, writable: true }) : e3[t] = r, e3;
}
function gE(e3) {
  var t = yE(e3, "string");
  return typeof t == "symbol" ? t : t + "";
}
function yE(e3, t) {
  if (typeof e3 != "object" || !e3) return e3;
  var r = e3[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e3, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e3);
}
var Ys = Math.PI / 180, bE = (e3) => e3 * 180 / Math.PI, Et = (e3, t, r, n) => ({ x: e3 + Math.cos(-Ys * n) * r, y: t + Math.sin(-Ys * n) * r }), wE = function(t, r) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : { top: 0, right: 0, bottom: 0, left: 0 };
  return Math.min(Math.abs(t - (n.left || 0) - (n.right || 0)), Math.abs(r - (n.top || 0) - (n.bottom || 0))) / 2;
}, xE = (e3, t) => {
  var { x: r, y: n } = e3, { x: i, y: s } = t;
  return Math.sqrt((r - i) ** 2 + (n - s) ** 2);
}, PE = (e3, t) => {
  var { x: r, y: n } = e3, { cx: i, cy: s } = t, a = xE({ x: r, y: n }, { x: i, y: s });
  if (a <= 0) return { radius: a, angle: 0 };
  var o = (r - i) / a, l = Math.acos(o);
  return n > s && (l = 2 * Math.PI - l), { radius: a, angle: bE(l), angleInRadian: l };
}, SE = (e3) => {
  var { startAngle: t, endAngle: r } = e3, n = Math.floor(t / 360), i = Math.floor(r / 360), s = Math.min(n, i);
  return { startAngle: t - s * 360, endAngle: r - s * 360 };
}, _E = (e3, t) => {
  var { startAngle: r, endAngle: n } = t, i = Math.floor(r / 360), s = Math.floor(n / 360), a = Math.min(i, s);
  return e3 + a * 360;
}, OE = (e3, t) => {
  var { relativeX: r, relativeY: n } = e3, { radius: i, angle: s } = PE({ x: r, y: n }, t), { innerRadius: a, outerRadius: o } = t;
  if (i < a || i > o || i === 0) return null;
  var { startAngle: l, endAngle: u } = SE(t), c = s, h;
  if (l <= u) {
    for (; c > u; ) c -= 360;
    for (; c < l; ) c += 360;
    h = c >= l && c <= u;
  } else {
    for (; c > l; ) c -= 360;
    for (; c < u; ) c += 360;
    h = c >= u && c <= l;
  }
  return h ? xv(xv({}, t), {}, { radius: i, angle: _E(c, t) }) : null;
};
function k0(e3) {
  var { cx: t, cy: r, radius: n, startAngle: i, endAngle: s } = e3, a = Et(t, r, n, i), o = Et(t, r, n, s);
  return { points: [a, o], cx: t, cy: r, radius: n, startAngle: i, endAngle: s };
}
var Pv, Sv, _v, Ov, Mv, Ev, Av;
function Ku() {
  return Ku = Object.assign ? Object.assign.bind() : function(e3) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e3[n] = r[n]);
    }
    return e3;
  }, Ku.apply(null, arguments);
}
function _r(e3, t) {
  return t || (t = e3.slice(0)), Object.freeze(Object.defineProperties(e3, { raw: { value: Object.freeze(t) } }));
}
var ME = (e3, t) => {
  var r = ae(t - e3), n = Math.min(Math.abs(t - e3), 359.999);
  return r * n;
}, ts = (e3) => {
  var { cx: t, cy: r, radius: n, angle: i, sign: s, isExternal: a, cornerRadius: o, cornerIsExternal: l } = e3, u = o * (a ? 1 : -1) + n, c = Math.asin(o / u) / Ys, h = l ? i : i + s * c, f = Et(t, r, u, h), d = Et(t, r, n, h), v = l ? i - s * c : i, p = Et(t, r, u * Math.cos(c * Ys), v);
  return { center: f, circleTangency: d, lineTangency: p, theta: c };
}, I0 = (e3) => {
  var { cx: t, cy: r, innerRadius: n, outerRadius: i, startAngle: s, endAngle: a } = e3, o = ME(s, a), l = s + o, u = Et(t, r, i, s), c = Et(t, r, i, l), h = ot(Pv || (Pv = _r(["M ", ",", `
    A `, ",", `,0,
    `, ",", `,
    `, ",", `
  `])), u.x, u.y, i, i, +(Math.abs(o) > 180), +(s > l), c.x, c.y);
  if (n > 0) {
    var f = Et(t, r, n, s), d = Et(t, r, n, l);
    h += ot(Sv || (Sv = _r(["L ", ",", `
            A `, ",", `,0,
            `, ",", `,
            `, ",", " Z"])), d.x, d.y, n, n, +(Math.abs(o) > 180), +(s <= l), f.x, f.y);
  } else h += ot(_v || (_v = _r(["L ", ",", " Z"])), t, r);
  return h;
}, EE = (e3) => {
  var { cx: t, cy: r, innerRadius: n, outerRadius: i, cornerRadius: s, forceCornerRadius: a, cornerIsExternal: o, startAngle: l, endAngle: u } = e3, c = ae(u - l), { circleTangency: h, lineTangency: f, theta: d } = ts({ cx: t, cy: r, radius: i, angle: l, sign: c, cornerRadius: s, cornerIsExternal: o }), { circleTangency: v, lineTangency: p, theta: m } = ts({ cx: t, cy: r, radius: i, angle: u, sign: -c, cornerRadius: s, cornerIsExternal: o }), y = o ? Math.abs(l - u) : Math.abs(l - u) - d - m;
  if (y < 0) return a ? ot(Ov || (Ov = _r(["M ", ",", `
        a`, ",", ",0,0,1,", `,0
        a`, ",", ",0,0,1,", `,0
      `])), f.x, f.y, s, s, s * 2, s, s, -s * 2) : I0({ cx: t, cy: r, innerRadius: n, outerRadius: i, startAngle: l, endAngle: u });
  var b = ot(Mv || (Mv = _r(["M ", ",", `
    A`, ",", ",0,0,", ",", ",", `
    A`, ",", ",0,", ",", ",", ",", `
    A`, ",", ",0,0,", ",", ",", `
  `])), f.x, f.y, s, s, +(c < 0), h.x, h.y, i, i, +(y > 180), +(c < 0), v.x, v.y, s, s, +(c < 0), p.x, p.y);
  if (n > 0) {
    var { circleTangency: w, lineTangency: x, theta: P } = ts({ cx: t, cy: r, radius: n, angle: l, sign: c, isExternal: true, cornerRadius: s, cornerIsExternal: o }), { circleTangency: S, lineTangency: _, theta: M } = ts({ cx: t, cy: r, radius: n, angle: u, sign: -c, isExternal: true, cornerRadius: s, cornerIsExternal: o }), A = o ? Math.abs(l - u) : Math.abs(l - u) - P - M;
    if (A < 0 && s === 0) return "".concat(b, "L").concat(t, ",").concat(r, "Z");
    b += ot(Ev || (Ev = _r(["L", ",", `
      A`, ",", ",0,0,", ",", ",", `
      A`, ",", ",0,", ",", ",", ",", `
      A`, ",", ",0,0,", ",", ",", "Z"])), _.x, _.y, s, s, +(c < 0), S.x, S.y, n, n, +(A > 180), +(c > 0), w.x, w.y, s, s, +(c < 0), x.x, x.y);
  } else b += ot(Av || (Av = _r(["L", ",", "Z"])), t, r);
  return b;
}, AE = { cx: 0, cy: 0, innerRadius: 0, outerRadius: 0, startAngle: 0, endAngle: 0, cornerRadius: 0, forceCornerRadius: false, cornerIsExternal: false }, T0 = (e3) => {
  var t = Bt(e3, AE), { cx: r, cy: n, innerRadius: i, outerRadius: s, cornerRadius: a, forceCornerRadius: o, cornerIsExternal: l, startAngle: u, endAngle: c, className: h } = t;
  if (s < i || u === c) return null;
  var f = X("recharts-sector", h), d = s - i, v = cr(a, d, 0, true), p;
  return v > 0 && Math.abs(u - c) < 360 ? p = EE({ cx: r, cy: n, innerRadius: i, outerRadius: s, cornerRadius: Math.min(v, d / 2), forceCornerRadius: o, cornerIsExternal: l, startAngle: u, endAngle: c }) : p = I0({ cx: r, cy: n, innerRadius: i, outerRadius: s, startAngle: u, endAngle: c }), g.createElement("path", Ku({}, Tt(t), { className: f, d: p }));
};
function CE(e3, t, r) {
  if (e3 === "horizontal") return [{ x: t.x, y: r.top }, { x: t.x, y: r.top + r.height }];
  if (e3 === "vertical") return [{ x: r.left, y: t.y }, { x: r.left + r.width, y: t.y }];
  if (py(t)) {
    if (e3 === "centric") {
      var { cx: n, cy: i, innerRadius: s, outerRadius: a, angle: o } = t, l = Et(n, i, s, o), u = Et(n, i, a, o);
      return [{ x: l.x, y: l.y }, { x: u.x, y: u.y }];
    }
    return k0(t);
  }
}
var jl = {}, kl = {}, Il = {}, Cv;
function jE() {
  return Cv || (Cv = 1, (function(e3) {
    Object.defineProperty(e3, Symbol.toStringTag, { value: "Module" });
    const t = Ey();
    function r(n) {
      return t.isSymbol(n) ? NaN : Number(n);
    }
    e3.toNumber = r;
  })(Il)), Il;
}
var jv;
function kE() {
  return jv || (jv = 1, (function(e3) {
    Object.defineProperty(e3, Symbol.toStringTag, { value: "Module" });
    const t = jE();
    function r(n) {
      return n ? (n = t.toNumber(n), n === 1 / 0 || n === -1 / 0 ? (n < 0 ? -1 : 1) * Number.MAX_VALUE : n === n ? n : 0) : n === 0 ? n : 0;
    }
    e3.toFinite = r;
  })(kl)), kl;
}
var kv;
function IE() {
  return kv || (kv = 1, (function(e3) {
    Object.defineProperty(e3, Symbol.toStringTag, { value: "Module" });
    const t = Ay(), r = kE();
    function n(i, s, a) {
      a && typeof a != "number" && t.isIterateeCall(i, s, a) && (s = a = void 0), i = r.toFinite(i), s === void 0 ? (s = i, i = 0) : s = r.toFinite(s), a = a === void 0 ? i < s ? 1 : -1 : r.toFinite(a);
      const o = Math.max(Math.ceil((s - i) / (a || 1)), 0), l = new Array(o);
      for (let u = 0; u < o; u++) l[u] = i, i += a;
      return l;
    }
    e3.range = n;
  })(jl)), jl;
}
var Tl, Iv;
function TE() {
  return Iv || (Iv = 1, Tl = IE().range), Tl;
}
var NE = TE();
const N0 = fr(NE);
var be = (e3) => e3.chartData, Nc = O([be], (e3) => {
  var t = e3.chartData != null ? e3.chartData.length - 1 : 0;
  return { chartData: e3.chartData, computedData: e3.computedData, dataEndIndex: t, dataStartIndex: 0 };
}), Di = (e3, t, r, n) => n ? Nc(e3) : be(e3), DE = (e3, t, r) => r ? Nc(e3) : be(e3), LE = O([Di], (e3) => {
  var { chartData: t, dataStartIndex: r, dataEndIndex: n } = e3;
  return t != null ? t.slice(r, n + 1) : [];
});
O([Nc], (e3) => {
  var { chartData: t, dataStartIndex: r, dataEndIndex: n } = e3;
  return t != null ? t.slice(r, n + 1) : [];
});
var RE = O([be], (e3) => {
  var { chartData: t, dataStartIndex: r, dataEndIndex: n } = e3;
  return t != null ? t.slice(r, n + 1) : [];
});
function Ee(e3) {
  if (Array.isArray(e3) && e3.length === 2) {
    var [t, r] = e3;
    if (K(t) && K(r)) return true;
  }
  return false;
}
function Tv(e3, t, r) {
  return r ? e3 : [Math.min(e3[0], t[0]), Math.max(e3[1], t[1])];
}
function D0(e3, t) {
  if (t && typeof e3 != "function" && Array.isArray(e3) && e3.length === 2) {
    var [r, n] = e3, i, s;
    if (K(r)) i = r;
    else if (typeof r == "function") return;
    if (K(n)) s = n;
    else if (typeof n == "function") return;
    var a = [i, s];
    if (Ee(a)) return a;
  }
}
function $E(e3, t, r) {
  if (!(!r && t == null)) {
    if (typeof e3 == "function" && t != null) try {
      var n = e3(t, r);
      if (Ee(n)) return Tv(n, t, r);
    } catch {
    }
    if (Array.isArray(e3) && e3.length === 2) {
      var [i, s] = e3, a, o;
      if (i === "auto") t != null && (a = Math.min(...t));
      else if (L(i)) a = i;
      else if (typeof i == "function") try {
        t != null && (a = i(t == null ? void 0 : t[0]));
      } catch {
      }
      else if (typeof i == "string" && _d.test(i)) {
        var l = _d.exec(i);
        if (l == null || l[1] == null || t == null) a = void 0;
        else {
          var u = +l[1];
          a = t[0] - u;
        }
      } else a = t == null ? void 0 : t[0];
      if (s === "auto") t != null && (o = Math.max(...t));
      else if (L(s)) o = s;
      else if (typeof s == "function") try {
        t != null && (o = s(t == null ? void 0 : t[1]));
      } catch {
      }
      else if (typeof s == "string" && Od.test(s)) {
        var c = Od.exec(s);
        if (c == null || c[1] == null || t == null) o = void 0;
        else {
          var h = +c[1];
          o = t[1] + h;
        }
      } else o = t == null ? void 0 : t[1];
      var f = [a, o];
      if (Ee(f)) return t == null ? f : Tv(f, t, r);
    }
  }
}
var Cn = 1e9, zE = { precision: 20, rounding: 4, toExpNeg: -7, toExpPos: 21, LN10: "2.302585092994045684017991454684364207601101488628772976033327900967572609677352480235997205089598298341967784042286" }, Lc, it = true, ce = "[DecimalError] ", Cr = ce + "Invalid argument: ", Dc = ce + "Exponent out of range: ", jn = Math.floor, Sr = Math.pow, BE = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, Xt, bt = 1e7, nt = 7, L0 = 9007199254740991, Hs = jn(L0 / nt), N = {};
N.absoluteValue = N.abs = function() {
  var e3 = new this.constructor(this);
  return e3.s && (e3.s = 1), e3;
};
N.comparedTo = N.cmp = function(e3) {
  var t, r, n, i, s = this;
  if (e3 = new s.constructor(e3), s.s !== e3.s) return s.s || -e3.s;
  if (s.e !== e3.e) return s.e > e3.e ^ s.s < 0 ? 1 : -1;
  for (n = s.d.length, i = e3.d.length, t = 0, r = n < i ? n : i; t < r; ++t) if (s.d[t] !== e3.d[t]) return s.d[t] > e3.d[t] ^ s.s < 0 ? 1 : -1;
  return n === i ? 0 : n > i ^ s.s < 0 ? 1 : -1;
};
N.decimalPlaces = N.dp = function() {
  var e3 = this, t = e3.d.length - 1, r = (t - e3.e) * nt;
  if (t = e3.d[t], t) for (; t % 10 == 0; t /= 10) r--;
  return r < 0 ? 0 : r;
};
N.dividedBy = N.div = function(e3) {
  return We(this, new this.constructor(e3));
};
N.dividedToIntegerBy = N.idiv = function(e3) {
  var t = this, r = t.constructor;
  return Z(We(t, new r(e3), 0, 1), r.precision);
};
N.equals = N.eq = function(e3) {
  return !this.cmp(e3);
};
N.exponent = function() {
  return ht(this);
};
N.greaterThan = N.gt = function(e3) {
  return this.cmp(e3) > 0;
};
N.greaterThanOrEqualTo = N.gte = function(e3) {
  return this.cmp(e3) >= 0;
};
N.isInteger = N.isint = function() {
  return this.e > this.d.length - 2;
};
N.isNegative = N.isneg = function() {
  return this.s < 0;
};
N.isPositive = N.ispos = function() {
  return this.s > 0;
};
N.isZero = function() {
  return this.s === 0;
};
N.lessThan = N.lt = function(e3) {
  return this.cmp(e3) < 0;
};
N.lessThanOrEqualTo = N.lte = function(e3) {
  return this.cmp(e3) < 1;
};
N.logarithm = N.log = function(e3) {
  var t, r = this, n = r.constructor, i = n.precision, s = i + 5;
  if (e3 === void 0) e3 = new n(10);
  else if (e3 = new n(e3), e3.s < 1 || e3.eq(Xt)) throw Error(ce + "NaN");
  if (r.s < 1) throw Error(ce + (r.s ? "NaN" : "-Infinity"));
  return r.eq(Xt) ? new n(0) : (it = false, t = We(vi(r, s), vi(e3, s), s), it = true, Z(t, i));
};
N.minus = N.sub = function(e3) {
  var t = this;
  return e3 = new t.constructor(e3), t.s == e3.s ? z0(t, e3) : R0(t, (e3.s = -e3.s, e3));
};
N.modulo = N.mod = function(e3) {
  var t, r = this, n = r.constructor, i = n.precision;
  if (e3 = new n(e3), !e3.s) throw Error(ce + "NaN");
  return r.s ? (it = false, t = We(r, e3, 0, 1).times(e3), it = true, r.minus(t)) : Z(new n(r), i);
};
N.naturalExponential = N.exp = function() {
  return $0(this);
};
N.naturalLogarithm = N.ln = function() {
  return vi(this);
};
N.negated = N.neg = function() {
  var e3 = new this.constructor(this);
  return e3.s = -e3.s || 0, e3;
};
N.plus = N.add = function(e3) {
  var t = this;
  return e3 = new t.constructor(e3), t.s == e3.s ? R0(t, e3) : z0(t, (e3.s = -e3.s, e3));
};
N.precision = N.sd = function(e3) {
  var t, r, n, i = this;
  if (e3 !== void 0 && e3 !== !!e3 && e3 !== 1 && e3 !== 0) throw Error(Cr + e3);
  if (t = ht(i) + 1, n = i.d.length - 1, r = n * nt + 1, n = i.d[n], n) {
    for (; n % 10 == 0; n /= 10) r--;
    for (n = i.d[0]; n >= 10; n /= 10) r++;
  }
  return e3 && t > r ? t : r;
};
N.squareRoot = N.sqrt = function() {
  var e3, t, r, n, i, s, a, o = this, l = o.constructor;
  if (o.s < 1) {
    if (!o.s) return new l(0);
    throw Error(ce + "NaN");
  }
  for (e3 = ht(o), it = false, i = Math.sqrt(+o), i == 0 || i == 1 / 0 ? (t = Me(o.d), (t.length + e3) % 2 == 0 && (t += "0"), i = Math.sqrt(t), e3 = jn((e3 + 1) / 2) - (e3 < 0 || e3 % 2), i == 1 / 0 ? t = "5e" + e3 : (t = i.toExponential(), t = t.slice(0, t.indexOf("e") + 1) + e3), n = new l(t)) : n = new l(i.toString()), r = l.precision, i = a = r + 3; ; ) if (s = n, n = s.plus(We(o, s, a + 2)).times(0.5), Me(s.d).slice(0, a) === (t = Me(n.d)).slice(0, a)) {
    if (t = t.slice(a - 3, a + 1), i == a && t == "4999") {
      if (Z(s, r + 1, 0), s.times(s).eq(o)) {
        n = s;
        break;
      }
    } else if (t != "9999") break;
    a += 4;
  }
  return it = true, Z(n, r);
};
N.times = N.mul = function(e3) {
  var t, r, n, i, s, a, o, l, u, c = this, h = c.constructor, f = c.d, d = (e3 = new h(e3)).d;
  if (!c.s || !e3.s) return new h(0);
  for (e3.s *= c.s, r = c.e + e3.e, l = f.length, u = d.length, l < u && (s = f, f = d, d = s, a = l, l = u, u = a), s = [], a = l + u, n = a; n--; ) s.push(0);
  for (n = u; --n >= 0; ) {
    for (t = 0, i = l + n; i > n; ) o = s[i] + d[n] * f[i - n - 1] + t, s[i--] = o % bt | 0, t = o / bt | 0;
    s[i] = (s[i] + t) % bt | 0;
  }
  for (; !s[--a]; ) s.pop();
  return t ? ++r : s.shift(), e3.d = s, e3.e = r, it ? Z(e3, h.precision) : e3;
};
N.toDecimalPlaces = N.todp = function(e3, t) {
  var r = this, n = r.constructor;
  return r = new n(r), e3 === void 0 ? r : (Ie(e3, 0, Cn), t === void 0 ? t = n.rounding : Ie(t, 0, 8), Z(r, e3 + ht(r) + 1, t));
};
N.toExponential = function(e3, t) {
  var r, n = this, i = n.constructor;
  return e3 === void 0 ? r = $r(n, true) : (Ie(e3, 0, Cn), t === void 0 ? t = i.rounding : Ie(t, 0, 8), n = Z(new i(n), e3 + 1, t), r = $r(n, true, e3 + 1)), r;
};
N.toFixed = function(e3, t) {
  var r, n, i = this, s = i.constructor;
  return e3 === void 0 ? $r(i) : (Ie(e3, 0, Cn), t === void 0 ? t = s.rounding : Ie(t, 0, 8), n = Z(new s(i), e3 + ht(i) + 1, t), r = $r(n.abs(), false, e3 + ht(n) + 1), i.isneg() && !i.isZero() ? "-" + r : r);
};
N.toInteger = N.toint = function() {
  var e3 = this, t = e3.constructor;
  return Z(new t(e3), ht(e3) + 1, t.rounding);
};
N.toNumber = function() {
  return +this;
};
N.toPower = N.pow = function(e3) {
  var t, r, n, i, s, a, o = this, l = o.constructor, u = 12, c = +(e3 = new l(e3));
  if (!e3.s) return new l(Xt);
  if (o = new l(o), !o.s) {
    if (e3.s < 1) throw Error(ce + "Infinity");
    return o;
  }
  if (o.eq(Xt)) return o;
  if (n = l.precision, e3.eq(Xt)) return Z(o, n);
  if (t = e3.e, r = e3.d.length - 1, a = t >= r, s = o.s, a) {
    if ((r = c < 0 ? -c : c) <= L0) {
      for (i = new l(Xt), t = Math.ceil(n / nt + 4), it = false; r % 2 && (i = i.times(o), Dv(i.d, t)), r = jn(r / 2), r !== 0; ) o = o.times(o), Dv(o.d, t);
      return it = true, e3.s < 0 ? new l(Xt).div(i) : Z(i, n);
    }
  } else if (s < 0) throw Error(ce + "NaN");
  return s = s < 0 && e3.d[Math.max(t, r)] & 1 ? -1 : 1, o.s = 1, it = false, i = e3.times(vi(o, n + u)), it = true, i = $0(i), i.s = s, i;
};
N.toPrecision = function(e3, t) {
  var r, n, i = this, s = i.constructor;
  return e3 === void 0 ? (r = ht(i), n = $r(i, r <= s.toExpNeg || r >= s.toExpPos)) : (Ie(e3, 1, Cn), t === void 0 ? t = s.rounding : Ie(t, 0, 8), i = Z(new s(i), e3, t), r = ht(i), n = $r(i, e3 <= r || r <= s.toExpNeg, e3)), n;
};
N.toSignificantDigits = N.tosd = function(e3, t) {
  var r = this, n = r.constructor;
  return e3 === void 0 ? (e3 = n.precision, t = n.rounding) : (Ie(e3, 1, Cn), t === void 0 ? t = n.rounding : Ie(t, 0, 8)), Z(new n(r), e3, t);
};
N.toString = N.valueOf = N.val = N.toJSON = N[Symbol.for("nodejs.util.inspect.custom")] = function() {
  var e3 = this, t = ht(e3), r = e3.constructor;
  return $r(e3, t <= r.toExpNeg || t >= r.toExpPos);
};
function R0(e3, t) {
  var r, n, i, s, a, o, l, u, c = e3.constructor, h = c.precision;
  if (!e3.s || !t.s) return t.s || (t = new c(e3)), it ? Z(t, h) : t;
  if (l = e3.d, u = t.d, a = e3.e, i = t.e, l = l.slice(), s = a - i, s) {
    for (s < 0 ? (n = l, s = -s, o = u.length) : (n = u, i = a, o = l.length), a = Math.ceil(h / nt), o = a > o ? a + 1 : o + 1, s > o && (s = o, n.length = 1), n.reverse(); s--; ) n.push(0);
    n.reverse();
  }
  for (o = l.length, s = u.length, o - s < 0 && (s = o, n = u, u = l, l = n), r = 0; s; ) r = (l[--s] = l[s] + u[s] + r) / bt | 0, l[s] %= bt;
  for (r && (l.unshift(r), ++i), o = l.length; l[--o] == 0; ) l.pop();
  return t.d = l, t.e = i, it ? Z(t, h) : t;
}
function Ie(e3, t, r) {
  if (e3 !== ~~e3 || e3 < t || e3 > r) throw Error(Cr + e3);
}
function Me(e3) {
  var t, r, n, i = e3.length - 1, s = "", a = e3[0];
  if (i > 0) {
    for (s += a, t = 1; t < i; t++) n = e3[t] + "", r = nt - n.length, r && (s += nr(r)), s += n;
    a = e3[t], n = a + "", r = nt - n.length, r && (s += nr(r));
  } else if (a === 0) return "0";
  for (; a % 10 === 0; ) a /= 10;
  return s + a;
}
var We = /* @__PURE__ */ (function() {
  function e3(n, i) {
    var s, a = 0, o = n.length;
    for (n = n.slice(); o--; ) s = n[o] * i + a, n[o] = s % bt | 0, a = s / bt | 0;
    return a && n.unshift(a), n;
  }
  function t(n, i, s, a) {
    var o, l;
    if (s != a) l = s > a ? 1 : -1;
    else for (o = l = 0; o < s; o++) if (n[o] != i[o]) {
      l = n[o] > i[o] ? 1 : -1;
      break;
    }
    return l;
  }
  function r(n, i, s) {
    for (var a = 0; s--; ) n[s] -= a, a = n[s] < i[s] ? 1 : 0, n[s] = a * bt + n[s] - i[s];
    for (; !n[0] && n.length > 1; ) n.shift();
  }
  return function(n, i, s, a) {
    var o, l, u, c, h, f, d, v, p, m, y, b, w, x, P, S, _, M, A = n.constructor, j = n.s == i.s ? 1 : -1, k = n.d, E = i.d;
    if (!n.s) return new A(n);
    if (!i.s) throw Error(ce + "Division by zero");
    for (l = n.e - i.e, _ = E.length, P = k.length, d = new A(j), v = d.d = [], u = 0; E[u] == (k[u] || 0); ) ++u;
    if (E[u] > (k[u] || 0) && --l, s == null ? b = s = A.precision : a ? b = s + (ht(n) - ht(i)) + 1 : b = s, b < 0) return new A(0);
    if (b = b / nt + 2 | 0, u = 0, _ == 1) for (c = 0, E = E[0], b++; (u < P || c) && b--; u++) w = c * bt + (k[u] || 0), v[u] = w / E | 0, c = w % E | 0;
    else {
      for (c = bt / (E[0] + 1) | 0, c > 1 && (E = e3(E, c), k = e3(k, c), _ = E.length, P = k.length), x = _, p = k.slice(0, _), m = p.length; m < _; ) p[m++] = 0;
      M = E.slice(), M.unshift(0), S = E[0], E[1] >= bt / 2 && ++S;
      do
        c = 0, o = t(E, p, _, m), o < 0 ? (y = p[0], _ != m && (y = y * bt + (p[1] || 0)), c = y / S | 0, c > 1 ? (c >= bt && (c = bt - 1), h = e3(E, c), f = h.length, m = p.length, o = t(h, p, f, m), o == 1 && (c--, r(h, _ < f ? M : E, f))) : (c == 0 && (o = c = 1), h = E.slice()), f = h.length, f < m && h.unshift(0), r(p, h, m), o == -1 && (m = p.length, o = t(E, p, _, m), o < 1 && (c++, r(p, _ < m ? M : E, m))), m = p.length) : o === 0 && (c++, p = [0]), v[u++] = c, o && p[0] ? p[m++] = k[x] || 0 : (p = [k[x]], m = 1);
      while ((x++ < P || p[0] !== void 0) && b--);
    }
    return v[0] || v.shift(), d.e = l, Z(d, a ? s + ht(d) + 1 : s);
  };
})();
function $0(e3, t) {
  var r, n, i, s, a, o, l = 0, u = 0, c = e3.constructor, h = c.precision;
  if (ht(e3) > 16) throw Error(Dc + ht(e3));
  if (!e3.s) return new c(Xt);
  for (it = false, o = h, a = new c(0.03125); e3.abs().gte(0.1); ) e3 = e3.times(a), u += 5;
  for (n = Math.log(Sr(2, u)) / Math.LN10 * 2 + 5 | 0, o += n, r = i = s = new c(Xt), c.precision = o; ; ) {
    if (i = Z(i.times(e3), o), r = r.times(++l), a = s.plus(We(i, r, o)), Me(a.d).slice(0, o) === Me(s.d).slice(0, o)) {
      for (; u--; ) s = Z(s.times(s), o);
      return c.precision = h, t == null ? (it = true, Z(s, h)) : s;
    }
    s = a;
  }
}
function ht(e3) {
  for (var t = e3.e * nt, r = e3.d[0]; r >= 10; r /= 10) t++;
  return t;
}
function Nl(e3, t, r) {
  if (t > e3.LN10.sd()) throw it = true, r && (e3.precision = r), Error(ce + "LN10 precision limit exceeded");
  return Z(new e3(e3.LN10), t);
}
function nr(e3) {
  for (var t = ""; e3--; ) t += "0";
  return t;
}
function vi(e3, t) {
  var r, n, i, s, a, o, l, u, c, h = 1, f = 10, d = e3, v = d.d, p = d.constructor, m = p.precision;
  if (d.s < 1) throw Error(ce + (d.s ? "NaN" : "-Infinity"));
  if (d.eq(Xt)) return new p(0);
  if (t == null ? (it = false, u = m) : u = t, d.eq(10)) return t == null && (it = true), Nl(p, u);
  if (u += f, p.precision = u, r = Me(v), n = r.charAt(0), s = ht(d), Math.abs(s) < 15e14) {
    for (; n < 7 && n != 1 || n == 1 && r.charAt(1) > 3; ) d = d.times(e3), r = Me(d.d), n = r.charAt(0), h++;
    s = ht(d), n > 1 ? (d = new p("0." + r), s++) : d = new p(n + "." + r.slice(1));
  } else return l = Nl(p, u + 2, m).times(s + ""), d = vi(new p(n + "." + r.slice(1)), u - f).plus(l), p.precision = m, t == null ? (it = true, Z(d, m)) : d;
  for (o = a = d = We(d.minus(Xt), d.plus(Xt), u), c = Z(d.times(d), u), i = 3; ; ) {
    if (a = Z(a.times(c), u), l = o.plus(We(a, new p(i), u)), Me(l.d).slice(0, u) === Me(o.d).slice(0, u)) return o = o.times(2), s !== 0 && (o = o.plus(Nl(p, u + 2, m).times(s + ""))), o = We(o, new p(h), u), p.precision = m, t == null ? (it = true, Z(o, m)) : o;
    o = l, i += 2;
  }
}
function Nv(e3, t) {
  var r, n, i;
  for ((r = t.indexOf(".")) > -1 && (t = t.replace(".", "")), (n = t.search(/e/i)) > 0 ? (r < 0 && (r = n), r += +t.slice(n + 1), t = t.substring(0, n)) : r < 0 && (r = t.length), n = 0; t.charCodeAt(n) === 48; ) ++n;
  for (i = t.length; t.charCodeAt(i - 1) === 48; ) --i;
  if (t = t.slice(n, i), t) {
    if (i -= n, r = r - n - 1, e3.e = jn(r / nt), e3.d = [], n = (r + 1) % nt, r < 0 && (n += nt), n < i) {
      for (n && e3.d.push(+t.slice(0, n)), i -= nt; n < i; ) e3.d.push(+t.slice(n, n += nt));
      t = t.slice(n), n = nt - t.length;
    } else n -= i;
    for (; n--; ) t += "0";
    if (e3.d.push(+t), it && (e3.e > Hs || e3.e < -Hs)) throw Error(Dc + r);
  } else e3.s = 0, e3.e = 0, e3.d = [0];
  return e3;
}
function Z(e3, t, r) {
  var n, i, s, a, o, l, u, c, h = e3.d;
  for (a = 1, s = h[0]; s >= 10; s /= 10) a++;
  if (n = t - a, n < 0) n += nt, i = t, u = h[c = 0];
  else {
    if (c = Math.ceil((n + 1) / nt), s = h.length, c >= s) return e3;
    for (u = s = h[c], a = 1; s >= 10; s /= 10) a++;
    n %= nt, i = n - nt + a;
  }
  if (r !== void 0 && (s = Sr(10, a - i - 1), o = u / s % 10 | 0, l = t < 0 || h[c + 1] !== void 0 || u % s, l = r < 4 ? (o || l) && (r == 0 || r == (e3.s < 0 ? 3 : 2)) : o > 5 || o == 5 && (r == 4 || l || r == 6 && (n > 0 ? i > 0 ? u / Sr(10, a - i) : 0 : h[c - 1]) % 10 & 1 || r == (e3.s < 0 ? 8 : 7))), t < 1 || !h[0]) return l ? (s = ht(e3), h.length = 1, t = t - s - 1, h[0] = Sr(10, (nt - t % nt) % nt), e3.e = jn(-t / nt) || 0) : (h.length = 1, h[0] = e3.e = e3.s = 0), e3;
  if (n == 0 ? (h.length = c, s = 1, c--) : (h.length = c + 1, s = Sr(10, nt - n), h[c] = i > 0 ? (u / Sr(10, a - i) % Sr(10, i) | 0) * s : 0), l) for (; ; ) if (c == 0) {
    (h[0] += s) == bt && (h[0] = 1, ++e3.e);
    break;
  } else {
    if (h[c] += s, h[c] != bt) break;
    h[c--] = 0, s = 1;
  }
  for (n = h.length; h[--n] === 0; ) h.pop();
  if (it && (e3.e > Hs || e3.e < -Hs)) throw Error(Dc + ht(e3));
  return e3;
}
function z0(e3, t) {
  var r, n, i, s, a, o, l, u, c, h, f = e3.constructor, d = f.precision;
  if (!e3.s || !t.s) return t.s ? t.s = -t.s : t = new f(e3), it ? Z(t, d) : t;
  if (l = e3.d, h = t.d, n = t.e, u = e3.e, l = l.slice(), a = u - n, a) {
    for (c = a < 0, c ? (r = l, a = -a, o = h.length) : (r = h, n = u, o = l.length), i = Math.max(Math.ceil(d / nt), o) + 2, a > i && (a = i, r.length = 1), r.reverse(), i = a; i--; ) r.push(0);
    r.reverse();
  } else {
    for (i = l.length, o = h.length, c = i < o, c && (o = i), i = 0; i < o; i++) if (l[i] != h[i]) {
      c = l[i] < h[i];
      break;
    }
    a = 0;
  }
  for (c && (r = l, l = h, h = r, t.s = -t.s), o = l.length, i = h.length - o; i > 0; --i) l[o++] = 0;
  for (i = h.length; i > a; ) {
    if (l[--i] < h[i]) {
      for (s = i; s && l[--s] === 0; ) l[s] = bt - 1;
      --l[s], l[i] += bt;
    }
    l[i] -= h[i];
  }
  for (; l[--o] === 0; ) l.pop();
  for (; l[0] === 0; l.shift()) --n;
  return l[0] ? (t.d = l, t.e = n, it ? Z(t, d) : t) : new f(0);
}
function $r(e3, t, r) {
  var n, i = ht(e3), s = Me(e3.d), a = s.length;
  return t ? (r && (n = r - a) > 0 ? s = s.charAt(0) + "." + s.slice(1) + nr(n) : a > 1 && (s = s.charAt(0) + "." + s.slice(1)), s = s + (i < 0 ? "e" : "e+") + i) : i < 0 ? (s = "0." + nr(-i - 1) + s, r && (n = r - a) > 0 && (s += nr(n))) : i >= a ? (s += nr(i + 1 - a), r && (n = r - i - 1) > 0 && (s = s + "." + nr(n))) : ((n = i + 1) < a && (s = s.slice(0, n) + "." + s.slice(n)), r && (n = r - a) > 0 && (i + 1 === a && (s += "."), s += nr(n))), e3.s < 0 ? "-" + s : s;
}
function Dv(e3, t) {
  if (e3.length > t) return e3.length = t, true;
}
function B0(e3) {
  var t, r, n;
  function i(s) {
    var a = this;
    if (!(a instanceof i)) return new i(s);
    if (a.constructor = i, s instanceof i) {
      a.s = s.s, a.e = s.e, a.d = (s = s.d) ? s.slice() : s;
      return;
    }
    if (typeof s == "number") {
      if (s * 0 !== 0) throw Error(Cr + s);
      if (s > 0) a.s = 1;
      else if (s < 0) s = -s, a.s = -1;
      else {
        a.s = 0, a.e = 0, a.d = [0];
        return;
      }
      if (s === ~~s && s < 1e7) {
        a.e = 0, a.d = [s];
        return;
      }
      return Nv(a, s.toString());
    } else if (typeof s != "string") throw Error(Cr + s);
    if (s.charCodeAt(0) === 45 ? (s = s.slice(1), a.s = -1) : a.s = 1, BE.test(s)) Nv(a, s);
    else throw Error(Cr + s);
  }
  if (i.prototype = N, i.ROUND_UP = 0, i.ROUND_DOWN = 1, i.ROUND_CEIL = 2, i.ROUND_FLOOR = 3, i.ROUND_HALF_UP = 4, i.ROUND_HALF_DOWN = 5, i.ROUND_HALF_EVEN = 6, i.ROUND_HALF_CEIL = 7, i.ROUND_HALF_FLOOR = 8, i.clone = B0, i.config = i.set = FE, e3 === void 0 && (e3 = {}), e3) for (n = ["precision", "rounding", "toExpNeg", "toExpPos", "LN10"], t = 0; t < n.length; ) e3.hasOwnProperty(r = n[t++]) || (e3[r] = this[r]);
  return i.config(e3), i;
}
function FE(e3) {
  if (!e3 || typeof e3 != "object") throw Error(ce + "Object expected");
  var t, r, n, i = ["precision", 1, Cn, "rounding", 0, 8, "toExpNeg", -1 / 0, 0, "toExpPos", 0, 1 / 0];
  for (t = 0; t < i.length; t += 3) if ((n = e3[r = i[t]]) !== void 0) if (jn(n) === n && n >= i[t + 1] && n <= i[t + 2]) this[r] = n;
  else throw Error(Cr + r + ": " + n);
  if ((n = e3[r = "LN10"]) !== void 0) if (n == Math.LN10) this[r] = new this(n);
  else throw Error(Cr + r + ": " + n);
  return this;
}
var Lc = B0(zE);
Xt = new Lc(1);
const U = Lc;
function F0(e3) {
  var t;
  return e3 === 0 ? t = 1 : t = Math.floor(new U(e3).abs().log(10).toNumber()) + 1, t;
}
function W0(e3, t, r) {
  for (var n = new U(e3), i = 0, s = []; n.lt(t) && i < 1e5; ) s.push(n.toNumber()), n = n.add(r), i++;
  return s;
}
var K0 = (e3) => {
  var [t, r] = e3, [n, i] = [t, r];
  return t > r && ([n, i] = [r, t]), [n, i];
}, Rc = (e3, t, r) => {
  if (e3.lte(0)) return new U(0);
  var n = F0(e3.toNumber()), i = new U(10).pow(n), s = e3.div(i), a = n !== 1 ? 0.05 : 0.1, o = new U(Math.ceil(s.div(a).toNumber())).add(r).mul(a), l = o.mul(i);
  return t ? new U(l.toNumber()) : new U(Math.ceil(l.toNumber()));
}, U0 = (e3, t, r) => {
  var n;
  if (e3.lte(0)) return new U(0);
  var i = [1, 2, 2.5, 5], s = e3.toNumber(), a = Math.floor(new U(s).abs().log(10).toNumber()), o = new U(10).pow(a), l = e3.div(o).toNumber(), u = i.findIndex((d) => d >= l - 1e-10);
  if (u === -1 && (o = o.mul(10), u = 0), u += r, u >= i.length) {
    var c = Math.floor(u / i.length);
    u %= i.length, o = o.mul(new U(10).pow(c));
  }
  var h = (n = i[u]) !== null && n !== void 0 ? n : 1, f = new U(h).mul(o);
  return t ? f : new U(Math.ceil(f.toNumber()));
}, WE = (e3, t, r) => {
  var n = new U(1), i = new U(e3);
  if (!i.isint() && r) {
    var s = Math.abs(e3);
    s < 1 ? (n = new U(10).pow(F0(e3) - 1), i = new U(Math.floor(i.div(n).toNumber())).mul(n)) : s > 1 && (i = new U(Math.floor(e3)));
  } else e3 === 0 ? i = new U(Math.floor((t - 1) / 2)) : r || (i = new U(Math.floor(e3)));
  for (var a = Math.floor((t - 1) / 2), o = [], l = 0; l < t; l++) o.push(i.add(new U(l - a).mul(n)).toNumber());
  return o;
}, q0 = function(t, r, n, i) {
  var s = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 0, a = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : Rc;
  if (!Number.isFinite((r - t) / (n - 1))) return { step: new U(0), tickMin: new U(0), tickMax: new U(0) };
  var o = a(new U(r).sub(t).div(n - 1), i, s), l;
  t <= 0 && r >= 0 ? l = new U(0) : (l = new U(t).add(r).div(2), l = l.sub(new U(l).mod(o)));
  var u = Math.ceil(l.sub(t).div(o).toNumber()), c = Math.ceil(new U(r).sub(l).div(o).toNumber()), h = u + c + 1;
  return h > n ? q0(t, r, n, i, s + 1, a) : (h < n && (c = r > 0 ? c + (n - h) : c, u = r > 0 ? u : u + (n - h)), { step: o, tickMin: l.sub(new U(u).mul(o)), tickMax: l.add(new U(c).mul(o)) });
}, Lv = function(t) {
  var [r, n] = t, i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 6, s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true, a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "auto", o = Math.max(i, 2), [l, u] = K0([r, n]);
  if (l === -1 / 0 || u === 1 / 0) {
    var c = u === 1 / 0 ? [l, ...Array(i - 1).fill(1 / 0)] : [...Array(i - 1).fill(-1 / 0), u];
    return r > n ? c.reverse() : c;
  }
  if (l === u) return WE(l, i, s);
  var h = a === "snap125" ? U0 : Rc, { step: f, tickMin: d, tickMax: v } = q0(l, u, o, s, 0, h), p = W0(d, v.add(new U(0.1).mul(f)), f);
  return r > n ? p.reverse() : p;
}, Rv = function(t, r) {
  var [n, i] = t, s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true, a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "auto", [o, l] = K0([n, i]);
  if (o === -1 / 0 || l === 1 / 0) return [n, i];
  if (o === l) return [o];
  var u = a === "snap125" ? U0 : Rc, c = Math.max(r, 2), h = u(new U(l).sub(o).div(c - 1), s, 0), f = [...W0(new U(o), new U(l), h), l];
  return s === false && (f = f.map((d) => Math.round(d))), n > i ? f.reverse() : f;
}, KE = (e3) => e3.rootProps.barCategoryGap, Ha = (e3) => e3.rootProps.stackOffset, V0 = (e3) => e3.rootProps.reverseStackOrder, $c = (e3) => e3.options.chartName, zc = (e3) => e3.rootProps.syncId, Y0 = (e3) => e3.rootProps.syncMethod, Bc = (e3) => e3.options.eventEmitter, UE = (e3) => e3.rootProps.baseValue, It = { grid: -100, barBackground: -50, area: 100, cursorRectangle: 200, bar: 300, line: 400, axis: 500, scatter: 600, activeBar: 1e3, cursorLine: 1100, activeDot: 1200, label: 2e3 }, mr = { allowDecimals: false, allowDataOverflow: false, angleAxisId: 0, reversed: false, scale: "auto", tick: true, type: "auto" }, xe = { allowDataOverflow: false, allowDecimals: false, allowDuplicatedCategory: true, includeHidden: false, radiusAxisId: 0, reversed: false, scale: "auto", tick: true, tickCount: 5, type: "auto" }, Ga = (e3, t) => {
  if (!(!e3 || !t)) return e3 != null && e3.reversed ? [t[1], t[0]] : t;
};
function Xa(e3, t, r) {
  if (r !== "auto") return r;
  if (e3 != null) return ye(e3, t) ? "category" : "number";
}
function $v(e3, t) {
  var r = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e3);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e3, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Gs(e3) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? $v(Object(r), true).forEach(function(n) {
      qE(e3, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(r)) : $v(Object(r)).forEach(function(n) {
      Object.defineProperty(e3, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e3;
}
function qE(e3, t, r) {
  return (t = VE(t)) in e3 ? Object.defineProperty(e3, t, { value: r, enumerable: true, configurable: true, writable: true }) : e3[t] = r, e3;
}
function VE(e3) {
  var t = YE(e3, "string");
  return typeof t == "symbol" ? t : t + "";
}
function YE(e3, t) {
  if (typeof e3 != "object" || !e3) return e3;
  var r = e3[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e3, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e3);
}
var zv = { allowDataOverflow: mr.allowDataOverflow, allowDecimals: mr.allowDecimals, allowDuplicatedCategory: false, dataKey: void 0, domain: void 0, id: mr.angleAxisId, includeHidden: false, name: void 0, reversed: mr.reversed, scale: mr.scale, tick: mr.tick, tickCount: void 0, ticks: void 0, type: mr.type, unit: void 0, niceTicks: "auto" }, Bv = { allowDataOverflow: xe.allowDataOverflow, allowDecimals: xe.allowDecimals, allowDuplicatedCategory: xe.allowDuplicatedCategory, dataKey: void 0, domain: void 0, id: xe.radiusAxisId, includeHidden: xe.includeHidden, name: void 0, reversed: xe.reversed, scale: xe.scale, tick: xe.tick, tickCount: xe.tickCount, ticks: void 0, type: xe.type, unit: void 0, niceTicks: "auto" }, HE = (e3, t) => {
  if (t != null) return e3.polarAxis.angleAxis[t];
}, Fc = O([HE, m0], (e3, t) => {
  var r;
  if (e3 != null) return e3;
  var n = (r = Xa(t, "angleAxis", zv.type)) !== null && r !== void 0 ? r : "category";
  return Gs(Gs({}, zv), {}, { type: n });
}), GE = (e3, t) => e3.polarAxis.radiusAxis[t], Wc = O([GE, m0], (e3, t) => {
  var r;
  if (e3 != null) return e3;
  var n = (r = Xa(t, "radiusAxis", Bv.type)) !== null && r !== void 0 ? r : "category";
  return Gs(Gs({}, Bv), {}, { type: n });
}), Ja = (e3) => e3.polarOptions, Kc = O([He, Ge, At], wE), H0 = O([Ja, Kc], (e3, t) => {
  if (e3 != null) return cr(e3.innerRadius, t, 0);
}), G0 = O([Ja, Kc], (e3, t) => {
  if (e3 != null) return cr(e3.outerRadius, t, t * 0.8);
}), XE = (e3) => {
  if (e3 == null) return [0, 0];
  var { startAngle: t, endAngle: r } = e3;
  return [t, r];
}, X0 = O([Ja], XE);
O([Fc, X0], Ga);
var J0 = O([Kc, H0, G0], (e3, t, r) => {
  if (!(e3 == null || t == null || r == null)) return [t, r];
});
O([Wc, J0], Ga);
var Z0 = O([et, Ja, H0, G0, He, Ge], (e3, t, r, n, i, s) => {
  if (!(e3 !== "centric" && e3 !== "radial" || t == null || r == null || n == null)) {
    var { cx: a, cy: o, startAngle: l, endAngle: u } = t;
    return { cx: cr(a, i, i / 2), cy: cr(o, s, s / 2), innerRadius: r, outerRadius: n, startAngle: l, endAngle: u, clockWise: false };
  }
}), wt = (e3, t) => t, Za = (e3, t, r) => r;
function Uc(e3) {
  return e3 == null ? void 0 : e3.id;
}
function Q0(e3, t, r) {
  var { chartData: n = [] } = t, { allowDuplicatedCategory: i, dataKey: s } = r, a = /* @__PURE__ */ new Map();
  return e3.forEach((o) => {
    var l, u = (l = o.data) !== null && l !== void 0 ? l : n;
    if (!(u == null || u.length === 0)) {
      var c = Uc(o);
      u.forEach((h, f) => {
        var d = s == null || i ? f : String(ct(h, s, null)), v = ct(h, o.dataKey, 0), p;
        a.has(d) ? p = a.get(d) : p = {}, Object.assign(p, { [c]: v }), a.set(d, p);
      });
    }
  }), Array.from(a.values());
}
function qc(e3) {
  return "stackId" in e3 && e3.stackId != null && e3.dataKey != null;
}
var Qa = (e3, t) => e3 === t ? true : e3 == null || t == null ? false : e3[0] === t[0] && e3[1] === t[1];
function to(e3, t) {
  return Array.isArray(e3) && Array.isArray(t) && e3.length === 0 && t.length === 0 ? true : e3 === t;
}
function JE(e3, t) {
  if (e3.length === t.length) {
    for (var r = 0; r < e3.length; r++) if (e3[r] !== t[r]) return false;
    return true;
  }
  return false;
}
var xt = (e3) => {
  var t = et(e3);
  return t === "horizontal" ? "xAxis" : t === "vertical" ? "yAxis" : t === "centric" ? "angleAxis" : "radiusAxis";
}, kn = (e3) => e3.tooltip.settings.axisId;
function Vc(e3) {
  if (e3 != null) {
    var t = e3.ticks, r = e3.bandwidth, n = e3.range(), i = [Math.min(...n), Math.max(...n)];
    return { domain: () => e3.domain(), range: (function(s) {
      function a() {
        return s.apply(this, arguments);
      }
      return a.toString = function() {
        return s.toString();
      }, a;
    })(() => i), rangeMin: () => i[0], rangeMax: () => i[1], isInRange(s) {
      var a = i[0], o = i[1];
      return a <= o ? s >= a && s <= o : s >= o && s <= a;
    }, bandwidth: r ? () => r.call(e3) : void 0, ticks: t ? (s) => t.call(e3, s) : void 0, map: (s, a) => {
      var o = e3(s);
      if (o != null) {
        if (e3.bandwidth && a !== null && a !== void 0 && a.position) {
          var l = e3.bandwidth();
          switch (a.position) {
            case "middle":
              o += l / 2;
              break;
            case "end":
              o += l;
              break;
          }
        }
        return o;
      }
    } };
  }
}
var ZE = (e3, t) => {
  if (t != null) switch (e3) {
    case "linear": {
      if (!Ee(t)) {
        for (var r, n, i = 0; i < t.length; i++) {
          var s = t[i];
          K(s) && ((r === void 0 || s < r) && (r = s), (n === void 0 || s > n) && (n = s));
        }
        return r !== void 0 && n !== void 0 ? [r, n] : void 0;
      }
      return t;
    }
    default:
      return t;
  }
};
function lr(e3, t) {
  return e3 == null || t == null ? NaN : e3 < t ? -1 : e3 > t ? 1 : e3 >= t ? 0 : NaN;
}
function QE(e3, t) {
  return e3 == null || t == null ? NaN : t < e3 ? -1 : t > e3 ? 1 : t >= e3 ? 0 : NaN;
}
function Yc(e3) {
  let t, r, n;
  e3.length !== 2 ? (t = lr, r = (o, l) => lr(e3(o), l), n = (o, l) => e3(o) - l) : (t = e3 === lr || e3 === QE ? e3 : tA, r = e3, n = e3);
  function i(o, l, u = 0, c = o.length) {
    if (u < c) {
      if (t(l, l) !== 0) return c;
      do {
        const h = u + c >>> 1;
        r(o[h], l) < 0 ? u = h + 1 : c = h;
      } while (u < c);
    }
    return u;
  }
  function s(o, l, u = 0, c = o.length) {
    if (u < c) {
      if (t(l, l) !== 0) return c;
      do {
        const h = u + c >>> 1;
        r(o[h], l) <= 0 ? u = h + 1 : c = h;
      } while (u < c);
    }
    return u;
  }
  function a(o, l, u = 0, c = o.length) {
    const h = i(o, l, u, c - 1);
    return h > u && n(o[h - 1], l) > -n(o[h], l) ? h - 1 : h;
  }
  return { left: i, center: a, right: s };
}
function tA() {
  return 0;
}
function tb(e3) {
  return e3 === null ? NaN : +e3;
}
function* eA(e3, t) {
  for (let r of e3) r != null && (r = +r) >= r && (yield r);
}
const rA = Yc(lr), Li = rA.right;
Yc(tb).center;
class Fv extends Map {
  constructor(t, r = sA) {
    if (super(), Object.defineProperties(this, { _intern: { value: /* @__PURE__ */ new Map() }, _key: { value: r } }), t != null) for (const [n, i] of t) this.set(n, i);
  }
  get(t) {
    return super.get(Wv(this, t));
  }
  has(t) {
    return super.has(Wv(this, t));
  }
  set(t, r) {
    return super.set(nA(this, t), r);
  }
  delete(t) {
    return super.delete(iA(this, t));
  }
}
function Wv({ _intern: e3, _key: t }, r) {
  const n = t(r);
  return e3.has(n) ? e3.get(n) : r;
}
function nA({ _intern: e3, _key: t }, r) {
  const n = t(r);
  return e3.has(n) ? e3.get(n) : (e3.set(n, r), r);
}
function iA({ _intern: e3, _key: t }, r) {
  const n = t(r);
  return e3.has(n) && (r = e3.get(n), e3.delete(n)), r;
}
function sA(e3) {
  return e3 !== null && typeof e3 == "object" ? e3.valueOf() : e3;
}
function aA(e3 = lr) {
  if (e3 === lr) return eb;
  if (typeof e3 != "function") throw new TypeError("compare is not a function");
  return (t, r) => {
    const n = e3(t, r);
    return n || n === 0 ? n : (e3(r, r) === 0) - (e3(t, t) === 0);
  };
}
function eb(e3, t) {
  return (e3 == null || !(e3 >= e3)) - (t == null || !(t >= t)) || (e3 < t ? -1 : e3 > t ? 1 : 0);
}
const oA = Math.sqrt(50), lA = Math.sqrt(10), uA = Math.sqrt(2);
function Xs(e3, t, r) {
  const n = (t - e3) / Math.max(0, r), i = Math.floor(Math.log10(n)), s = n / Math.pow(10, i), a = s >= oA ? 10 : s >= lA ? 5 : s >= uA ? 2 : 1;
  let o, l, u;
  return i < 0 ? (u = Math.pow(10, -i) / a, o = Math.round(e3 * u), l = Math.round(t * u), o / u < e3 && ++o, l / u > t && --l, u = -u) : (u = Math.pow(10, i) * a, o = Math.round(e3 / u), l = Math.round(t / u), o * u < e3 && ++o, l * u > t && --l), l < o && 0.5 <= r && r < 2 ? Xs(e3, t, r * 2) : [o, l, u];
}
function Uu(e3, t, r) {
  if (t = +t, e3 = +e3, r = +r, !(r > 0)) return [];
  if (e3 === t) return [e3];
  const n = t < e3, [i, s, a] = n ? Xs(t, e3, r) : Xs(e3, t, r);
  if (!(s >= i)) return [];
  const o = s - i + 1, l = new Array(o);
  if (n) if (a < 0) for (let u = 0; u < o; ++u) l[u] = (s - u) / -a;
  else for (let u = 0; u < o; ++u) l[u] = (s - u) * a;
  else if (a < 0) for (let u = 0; u < o; ++u) l[u] = (i + u) / -a;
  else for (let u = 0; u < o; ++u) l[u] = (i + u) * a;
  return l;
}
function qu(e3, t, r) {
  return t = +t, e3 = +e3, r = +r, Xs(e3, t, r)[2];
}
function Vu(e3, t, r) {
  t = +t, e3 = +e3, r = +r;
  const n = t < e3, i = n ? qu(t, e3, r) : qu(e3, t, r);
  return (n ? -1 : 1) * (i < 0 ? 1 / -i : i);
}
function Kv(e3, t) {
  let r;
  for (const n of e3) n != null && (r < n || r === void 0 && n >= n) && (r = n);
  return r;
}
function Uv(e3, t) {
  let r;
  for (const n of e3) n != null && (r > n || r === void 0 && n >= n) && (r = n);
  return r;
}
function rb(e3, t, r = 0, n = 1 / 0, i) {
  if (t = Math.floor(t), r = Math.floor(Math.max(0, r)), n = Math.floor(Math.min(e3.length - 1, n)), !(r <= t && t <= n)) return e3;
  for (i = i === void 0 ? eb : aA(i); n > r; ) {
    if (n - r > 600) {
      const l = n - r + 1, u = t - r + 1, c = Math.log(l), h = 0.5 * Math.exp(2 * c / 3), f = 0.5 * Math.sqrt(c * h * (l - h) / l) * (u - l / 2 < 0 ? -1 : 1), d = Math.max(r, Math.floor(t - u * h / l + f)), v = Math.min(n, Math.floor(t + (l - u) * h / l + f));
      rb(e3, t, d, v, i);
    }
    const s = e3[t];
    let a = r, o = n;
    for (Kn(e3, r, t), i(e3[n], s) > 0 && Kn(e3, r, n); a < o; ) {
      for (Kn(e3, a, o), ++a, --o; i(e3[a], s) < 0; ) ++a;
      for (; i(e3[o], s) > 0; ) --o;
    }
    i(e3[r], s) === 0 ? Kn(e3, r, o) : (++o, Kn(e3, o, n)), o <= t && (r = o + 1), t <= o && (n = o - 1);
  }
  return e3;
}
function Kn(e3, t, r) {
  const n = e3[t];
  e3[t] = e3[r], e3[r] = n;
}
function cA(e3, t, r) {
  if (e3 = Float64Array.from(eA(e3)), !(!(n = e3.length) || isNaN(t = +t))) {
    if (t <= 0 || n < 2) return Uv(e3);
    if (t >= 1) return Kv(e3);
    var n, i = (n - 1) * t, s = Math.floor(i), a = Kv(rb(e3, s).subarray(0, s + 1)), o = Uv(e3.subarray(s + 1));
    return a + (o - a) * (i - s);
  }
}
function hA(e3, t, r = tb) {
  if (!(!(n = e3.length) || isNaN(t = +t))) {
    if (t <= 0 || n < 2) return +r(e3[0], 0, e3);
    if (t >= 1) return +r(e3[n - 1], n - 1, e3);
    var n, i = (n - 1) * t, s = Math.floor(i), a = +r(e3[s], s, e3), o = +r(e3[s + 1], s + 1, e3);
    return a + (o - a) * (i - s);
  }
}
function fA(e3, t, r) {
  e3 = +e3, t = +t, r = (i = arguments.length) < 2 ? (t = e3, e3 = 0, 1) : i < 3 ? 1 : +r;
  for (var n = -1, i = Math.max(0, Math.ceil((t - e3) / r)) | 0, s = new Array(i); ++n < i; ) s[n] = e3 + n * r;
  return s;
}
function he(e3, t) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      this.range(e3);
      break;
    default:
      this.range(t).domain(e3);
      break;
  }
  return this;
}
function Xe(e3, t) {
  switch (arguments.length) {
    case 0:
      break;
    case 1: {
      typeof e3 == "function" ? this.interpolator(e3) : this.range(e3);
      break;
    }
    default: {
      this.domain(e3), typeof t == "function" ? this.interpolator(t) : this.range(t);
      break;
    }
  }
  return this;
}
const Yu = Symbol("implicit");
function Hc() {
  var e3 = new Fv(), t = [], r = [], n = Yu;
  function i(s) {
    let a = e3.get(s);
    if (a === void 0) {
      if (n !== Yu) return n;
      e3.set(s, a = t.push(s) - 1);
    }
    return r[a % r.length];
  }
  return i.domain = function(s) {
    if (!arguments.length) return t.slice();
    t = [], e3 = new Fv();
    for (const a of s) e3.has(a) || e3.set(a, t.push(a) - 1);
    return i;
  }, i.range = function(s) {
    return arguments.length ? (r = Array.from(s), i) : r.slice();
  }, i.unknown = function(s) {
    return arguments.length ? (n = s, i) : n;
  }, i.copy = function() {
    return Hc(t, r).unknown(n);
  }, he.apply(i, arguments), i;
}
function Gc() {
  var e3 = Hc().unknown(void 0), t = e3.domain, r = e3.range, n = 0, i = 1, s, a, o = false, l = 0, u = 0, c = 0.5;
  delete e3.unknown;
  function h() {
    var f = t().length, d = i < n, v = d ? i : n, p = d ? n : i;
    s = (p - v) / Math.max(1, f - l + u * 2), o && (s = Math.floor(s)), v += (p - v - s * (f - l)) * c, a = s * (1 - l), o && (v = Math.round(v), a = Math.round(a));
    var m = fA(f).map(function(y) {
      return v + s * y;
    });
    return r(d ? m.reverse() : m);
  }
  return e3.domain = function(f) {
    return arguments.length ? (t(f), h()) : t();
  }, e3.range = function(f) {
    return arguments.length ? ([n, i] = f, n = +n, i = +i, h()) : [n, i];
  }, e3.rangeRound = function(f) {
    return [n, i] = f, n = +n, i = +i, o = true, h();
  }, e3.bandwidth = function() {
    return a;
  }, e3.step = function() {
    return s;
  }, e3.round = function(f) {
    return arguments.length ? (o = !!f, h()) : o;
  }, e3.padding = function(f) {
    return arguments.length ? (l = Math.min(1, u = +f), h()) : l;
  }, e3.paddingInner = function(f) {
    return arguments.length ? (l = Math.min(1, f), h()) : l;
  }, e3.paddingOuter = function(f) {
    return arguments.length ? (u = +f, h()) : u;
  }, e3.align = function(f) {
    return arguments.length ? (c = Math.max(0, Math.min(1, f)), h()) : c;
  }, e3.copy = function() {
    return Gc(t(), [n, i]).round(o).paddingInner(l).paddingOuter(u).align(c);
  }, he.apply(h(), arguments);
}
function nb(e3) {
  var t = e3.copy;
  return e3.padding = e3.paddingOuter, delete e3.paddingInner, delete e3.paddingOuter, e3.copy = function() {
    return nb(t());
  }, e3;
}
function dA() {
  return nb(Gc.apply(null, arguments).paddingInner(1));
}
function Xc(e3, t, r) {
  e3.prototype = t.prototype = r, r.constructor = e3;
}
function ib(e3, t) {
  var r = Object.create(e3.prototype);
  for (var n in t) r[n] = t[n];
  return r;
}
function Ri() {
}
var pi = 0.7, Js = 1 / pi, dn = "\\s*([+-]?\\d+)\\s*", mi = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Ae = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", vA = /^#([0-9a-f]{3,8})$/, pA = new RegExp(`^rgb\\(${dn},${dn},${dn}\\)$`), mA = new RegExp(`^rgb\\(${Ae},${Ae},${Ae}\\)$`), gA = new RegExp(`^rgba\\(${dn},${dn},${dn},${mi}\\)$`), yA = new RegExp(`^rgba\\(${Ae},${Ae},${Ae},${mi}\\)$`), bA = new RegExp(`^hsl\\(${mi},${Ae},${Ae}\\)$`), wA = new RegExp(`^hsla\\(${mi},${Ae},${Ae},${mi}\\)$`), qv = { aliceblue: 15792383, antiquewhite: 16444375, aqua: 65535, aquamarine: 8388564, azure: 15794175, beige: 16119260, bisque: 16770244, black: 0, blanchedalmond: 16772045, blue: 255, blueviolet: 9055202, brown: 10824234, burlywood: 14596231, cadetblue: 6266528, chartreuse: 8388352, chocolate: 13789470, coral: 16744272, cornflowerblue: 6591981, cornsilk: 16775388, crimson: 14423100, cyan: 65535, darkblue: 139, darkcyan: 35723, darkgoldenrod: 12092939, darkgray: 11119017, darkgreen: 25600, darkgrey: 11119017, darkkhaki: 12433259, darkmagenta: 9109643, darkolivegreen: 5597999, darkorange: 16747520, darkorchid: 10040012, darkred: 9109504, darksalmon: 15308410, darkseagreen: 9419919, darkslateblue: 4734347, darkslategray: 3100495, darkslategrey: 3100495, darkturquoise: 52945, darkviolet: 9699539, deeppink: 16716947, deepskyblue: 49151, dimgray: 6908265, dimgrey: 6908265, dodgerblue: 2003199, firebrick: 11674146, floralwhite: 16775920, forestgreen: 2263842, fuchsia: 16711935, gainsboro: 14474460, ghostwhite: 16316671, gold: 16766720, goldenrod: 14329120, gray: 8421504, green: 32768, greenyellow: 11403055, grey: 8421504, honeydew: 15794160, hotpink: 16738740, indianred: 13458524, indigo: 4915330, ivory: 16777200, khaki: 15787660, lavender: 15132410, lavenderblush: 16773365, lawngreen: 8190976, lemonchiffon: 16775885, lightblue: 11393254, lightcoral: 15761536, lightcyan: 14745599, lightgoldenrodyellow: 16448210, lightgray: 13882323, lightgreen: 9498256, lightgrey: 13882323, lightpink: 16758465, lightsalmon: 16752762, lightseagreen: 2142890, lightskyblue: 8900346, lightslategray: 7833753, lightslategrey: 7833753, lightsteelblue: 11584734, lightyellow: 16777184, lime: 65280, limegreen: 3329330, linen: 16445670, magenta: 16711935, maroon: 8388608, mediumaquamarine: 6737322, mediumblue: 205, mediumorchid: 12211667, mediumpurple: 9662683, mediumseagreen: 3978097, mediumslateblue: 8087790, mediumspringgreen: 64154, mediumturquoise: 4772300, mediumvioletred: 13047173, midnightblue: 1644912, mintcream: 16121850, mistyrose: 16770273, moccasin: 16770229, navajowhite: 16768685, navy: 128, oldlace: 16643558, olive: 8421376, olivedrab: 7048739, orange: 16753920, orangered: 16729344, orchid: 14315734, palegoldenrod: 15657130, palegreen: 10025880, paleturquoise: 11529966, palevioletred: 14381203, papayawhip: 16773077, peachpuff: 16767673, peru: 13468991, pink: 16761035, plum: 14524637, powderblue: 11591910, purple: 8388736, rebeccapurple: 6697881, red: 16711680, rosybrown: 12357519, royalblue: 4286945, saddlebrown: 9127187, salmon: 16416882, sandybrown: 16032864, seagreen: 3050327, seashell: 16774638, sienna: 10506797, silver: 12632256, skyblue: 8900331, slateblue: 6970061, slategray: 7372944, slategrey: 7372944, snow: 16775930, springgreen: 65407, steelblue: 4620980, tan: 13808780, teal: 32896, thistle: 14204888, tomato: 16737095, turquoise: 4251856, violet: 15631086, wheat: 16113331, white: 16777215, whitesmoke: 16119285, yellow: 16776960, yellowgreen: 10145074 };
Xc(Ri, gi, { copy(e3) {
  return Object.assign(new this.constructor(), this, e3);
}, displayable() {
  return this.rgb().displayable();
}, hex: Vv, formatHex: Vv, formatHex8: xA, formatHsl: PA, formatRgb: Yv, toString: Yv });
function Vv() {
  return this.rgb().formatHex();
}
function xA() {
  return this.rgb().formatHex8();
}
function PA() {
  return sb(this).formatHsl();
}
function Yv() {
  return this.rgb().formatRgb();
}
function gi(e3) {
  var t, r;
  return e3 = (e3 + "").trim().toLowerCase(), (t = vA.exec(e3)) ? (r = t[1].length, t = parseInt(t[1], 16), r === 6 ? Hv(t) : r === 3 ? new Vt(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : r === 8 ? es(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : r === 4 ? es(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = pA.exec(e3)) ? new Vt(t[1], t[2], t[3], 1) : (t = mA.exec(e3)) ? new Vt(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = gA.exec(e3)) ? es(t[1], t[2], t[3], t[4]) : (t = yA.exec(e3)) ? es(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = bA.exec(e3)) ? Jv(t[1], t[2] / 100, t[3] / 100, 1) : (t = wA.exec(e3)) ? Jv(t[1], t[2] / 100, t[3] / 100, t[4]) : qv.hasOwnProperty(e3) ? Hv(qv[e3]) : e3 === "transparent" ? new Vt(NaN, NaN, NaN, 0) : null;
}
function Hv(e3) {
  return new Vt(e3 >> 16 & 255, e3 >> 8 & 255, e3 & 255, 1);
}
function es(e3, t, r, n) {
  return n <= 0 && (e3 = t = r = NaN), new Vt(e3, t, r, n);
}
function SA(e3) {
  return e3 instanceof Ri || (e3 = gi(e3)), e3 ? (e3 = e3.rgb(), new Vt(e3.r, e3.g, e3.b, e3.opacity)) : new Vt();
}
function Hu(e3, t, r, n) {
  return arguments.length === 1 ? SA(e3) : new Vt(e3, t, r, n ?? 1);
}
function Vt(e3, t, r, n) {
  this.r = +e3, this.g = +t, this.b = +r, this.opacity = +n;
}
Xc(Vt, Hu, ib(Ri, { brighter(e3) {
  return e3 = e3 == null ? Js : Math.pow(Js, e3), new Vt(this.r * e3, this.g * e3, this.b * e3, this.opacity);
}, darker(e3) {
  return e3 = e3 == null ? pi : Math.pow(pi, e3), new Vt(this.r * e3, this.g * e3, this.b * e3, this.opacity);
}, rgb() {
  return this;
}, clamp() {
  return new Vt(jr(this.r), jr(this.g), jr(this.b), Zs(this.opacity));
}, displayable() {
  return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
}, hex: Gv, formatHex: Gv, formatHex8: _A, formatRgb: Xv, toString: Xv }));
function Gv() {
  return `#${Or(this.r)}${Or(this.g)}${Or(this.b)}`;
}
function _A() {
  return `#${Or(this.r)}${Or(this.g)}${Or(this.b)}${Or((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Xv() {
  const e3 = Zs(this.opacity);
  return `${e3 === 1 ? "rgb(" : "rgba("}${jr(this.r)}, ${jr(this.g)}, ${jr(this.b)}${e3 === 1 ? ")" : `, ${e3})`}`;
}
function Zs(e3) {
  return isNaN(e3) ? 1 : Math.max(0, Math.min(1, e3));
}
function jr(e3) {
  return Math.max(0, Math.min(255, Math.round(e3) || 0));
}
function Or(e3) {
  return e3 = jr(e3), (e3 < 16 ? "0" : "") + e3.toString(16);
}
function Jv(e3, t, r, n) {
  return n <= 0 ? e3 = t = r = NaN : r <= 0 || r >= 1 ? e3 = t = NaN : t <= 0 && (e3 = NaN), new pe(e3, t, r, n);
}
function sb(e3) {
  if (e3 instanceof pe) return new pe(e3.h, e3.s, e3.l, e3.opacity);
  if (e3 instanceof Ri || (e3 = gi(e3)), !e3) return new pe();
  if (e3 instanceof pe) return e3;
  e3 = e3.rgb();
  var t = e3.r / 255, r = e3.g / 255, n = e3.b / 255, i = Math.min(t, r, n), s = Math.max(t, r, n), a = NaN, o = s - i, l = (s + i) / 2;
  return o ? (t === s ? a = (r - n) / o + (r < n) * 6 : r === s ? a = (n - t) / o + 2 : a = (t - r) / o + 4, o /= l < 0.5 ? s + i : 2 - s - i, a *= 60) : o = l > 0 && l < 1 ? 0 : a, new pe(a, o, l, e3.opacity);
}
function OA(e3, t, r, n) {
  return arguments.length === 1 ? sb(e3) : new pe(e3, t, r, n ?? 1);
}
function pe(e3, t, r, n) {
  this.h = +e3, this.s = +t, this.l = +r, this.opacity = +n;
}
Xc(pe, OA, ib(Ri, { brighter(e3) {
  return e3 = e3 == null ? Js : Math.pow(Js, e3), new pe(this.h, this.s, this.l * e3, this.opacity);
}, darker(e3) {
  return e3 = e3 == null ? pi : Math.pow(pi, e3), new pe(this.h, this.s, this.l * e3, this.opacity);
}, rgb() {
  var e3 = this.h % 360 + (this.h < 0) * 360, t = isNaN(e3) || isNaN(this.s) ? 0 : this.s, r = this.l, n = r + (r < 0.5 ? r : 1 - r) * t, i = 2 * r - n;
  return new Vt(Dl(e3 >= 240 ? e3 - 240 : e3 + 120, i, n), Dl(e3, i, n), Dl(e3 < 120 ? e3 + 240 : e3 - 120, i, n), this.opacity);
}, clamp() {
  return new pe(Zv(this.h), rs(this.s), rs(this.l), Zs(this.opacity));
}, displayable() {
  return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
}, formatHsl() {
  const e3 = Zs(this.opacity);
  return `${e3 === 1 ? "hsl(" : "hsla("}${Zv(this.h)}, ${rs(this.s) * 100}%, ${rs(this.l) * 100}%${e3 === 1 ? ")" : `, ${e3})`}`;
} }));
function Zv(e3) {
  return e3 = (e3 || 0) % 360, e3 < 0 ? e3 + 360 : e3;
}
function rs(e3) {
  return Math.max(0, Math.min(1, e3 || 0));
}
function Dl(e3, t, r) {
  return (e3 < 60 ? t + (r - t) * e3 / 60 : e3 < 180 ? r : e3 < 240 ? t + (r - t) * (240 - e3) / 60 : t) * 255;
}
const Jc = (e3) => () => e3;
function MA(e3, t) {
  return function(r) {
    return e3 + r * t;
  };
}
function EA(e3, t, r) {
  return e3 = Math.pow(e3, r), t = Math.pow(t, r) - e3, r = 1 / r, function(n) {
    return Math.pow(e3 + n * t, r);
  };
}
function AA(e3) {
  return (e3 = +e3) == 1 ? ab : function(t, r) {
    return r - t ? EA(t, r, e3) : Jc(isNaN(t) ? r : t);
  };
}
function ab(e3, t) {
  var r = t - e3;
  return r ? MA(e3, r) : Jc(isNaN(e3) ? t : e3);
}
const Qv = (function e(t) {
  var r = AA(t);
  function n(i, s) {
    var a = r((i = Hu(i)).r, (s = Hu(s)).r), o = r(i.g, s.g), l = r(i.b, s.b), u = ab(i.opacity, s.opacity);
    return function(c) {
      return i.r = a(c), i.g = o(c), i.b = l(c), i.opacity = u(c), i + "";
    };
  }
  return n.gamma = e, n;
})(1);
function CA(e3, t) {
  t || (t = []);
  var r = e3 ? Math.min(t.length, e3.length) : 0, n = t.slice(), i;
  return function(s) {
    for (i = 0; i < r; ++i) n[i] = e3[i] * (1 - s) + t[i] * s;
    return n;
  };
}
function jA(e3) {
  return ArrayBuffer.isView(e3) && !(e3 instanceof DataView);
}
function kA(e3, t) {
  var r = t ? t.length : 0, n = e3 ? Math.min(r, e3.length) : 0, i = new Array(n), s = new Array(r), a;
  for (a = 0; a < n; ++a) i[a] = In(e3[a], t[a]);
  for (; a < r; ++a) s[a] = t[a];
  return function(o) {
    for (a = 0; a < n; ++a) s[a] = i[a](o);
    return s;
  };
}
function IA(e3, t) {
  var r = /* @__PURE__ */ new Date();
  return e3 = +e3, t = +t, function(n) {
    return r.setTime(e3 * (1 - n) + t * n), r;
  };
}
function Qs(e3, t) {
  return e3 = +e3, t = +t, function(r) {
    return e3 * (1 - r) + t * r;
  };
}
function TA(e3, t) {
  var r = {}, n = {}, i;
  (e3 === null || typeof e3 != "object") && (e3 = {}), (t === null || typeof t != "object") && (t = {});
  for (i in t) i in e3 ? r[i] = In(e3[i], t[i]) : n[i] = t[i];
  return function(s) {
    for (i in r) n[i] = r[i](s);
    return n;
  };
}
var Gu = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Ll = new RegExp(Gu.source, "g");
function NA(e3) {
  return function() {
    return e3;
  };
}
function DA(e3) {
  return function(t) {
    return e3(t) + "";
  };
}
function LA(e3, t) {
  var r = Gu.lastIndex = Ll.lastIndex = 0, n, i, s, a = -1, o = [], l = [];
  for (e3 = e3 + "", t = t + ""; (n = Gu.exec(e3)) && (i = Ll.exec(t)); ) (s = i.index) > r && (s = t.slice(r, s), o[a] ? o[a] += s : o[++a] = s), (n = n[0]) === (i = i[0]) ? o[a] ? o[a] += i : o[++a] = i : (o[++a] = null, l.push({ i: a, x: Qs(n, i) })), r = Ll.lastIndex;
  return r < t.length && (s = t.slice(r), o[a] ? o[a] += s : o[++a] = s), o.length < 2 ? l[0] ? DA(l[0].x) : NA(t) : (t = l.length, function(u) {
    for (var c = 0, h; c < t; ++c) o[(h = l[c]).i] = h.x(u);
    return o.join("");
  });
}
function In(e3, t) {
  var r = typeof t, n;
  return t == null || r === "boolean" ? Jc(t) : (r === "number" ? Qs : r === "string" ? (n = gi(t)) ? (t = n, Qv) : LA : t instanceof gi ? Qv : t instanceof Date ? IA : jA(t) ? CA : Array.isArray(t) ? kA : typeof t.valueOf != "function" && typeof t.toString != "function" || isNaN(t) ? TA : Qs)(e3, t);
}
function Zc(e3, t) {
  return e3 = +e3, t = +t, function(r) {
    return Math.round(e3 * (1 - r) + t * r);
  };
}
function RA(e3, t) {
  t === void 0 && (t = e3, e3 = In);
  for (var r = 0, n = t.length - 1, i = t[0], s = new Array(n < 0 ? 0 : n); r < n; ) s[r] = e3(i, i = t[++r]);
  return function(a) {
    var o = Math.max(0, Math.min(n - 1, Math.floor(a *= n)));
    return s[o](a - o);
  };
}
function $A(e3) {
  return function() {
    return e3;
  };
}
function ta(e3) {
  return +e3;
}
var tp = [0, 1];
function Rt(e3) {
  return e3;
}
function Xu(e3, t) {
  return (t -= e3 = +e3) ? function(r) {
    return (r - e3) / t;
  } : $A(isNaN(t) ? NaN : 0.5);
}
function zA(e3, t) {
  var r;
  return e3 > t && (r = e3, e3 = t, t = r), function(n) {
    return Math.max(e3, Math.min(t, n));
  };
}
function BA(e3, t, r) {
  var n = e3[0], i = e3[1], s = t[0], a = t[1];
  return i < n ? (n = Xu(i, n), s = r(a, s)) : (n = Xu(n, i), s = r(s, a)), function(o) {
    return s(n(o));
  };
}
function FA(e3, t, r) {
  var n = Math.min(e3.length, t.length) - 1, i = new Array(n), s = new Array(n), a = -1;
  for (e3[n] < e3[0] && (e3 = e3.slice().reverse(), t = t.slice().reverse()); ++a < n; ) i[a] = Xu(e3[a], e3[a + 1]), s[a] = r(t[a], t[a + 1]);
  return function(o) {
    var l = Li(e3, o, 1, n) - 1;
    return s[l](i[l](o));
  };
}
function $i(e3, t) {
  return t.domain(e3.domain()).range(e3.range()).interpolate(e3.interpolate()).clamp(e3.clamp()).unknown(e3.unknown());
}
function eo() {
  var e3 = tp, t = tp, r = In, n, i, s, a = Rt, o, l, u;
  function c() {
    var f = Math.min(e3.length, t.length);
    return a !== Rt && (a = zA(e3[0], e3[f - 1])), o = f > 2 ? FA : BA, l = u = null, h;
  }
  function h(f) {
    return f == null || isNaN(f = +f) ? s : (l || (l = o(e3.map(n), t, r)))(n(a(f)));
  }
  return h.invert = function(f) {
    return a(i((u || (u = o(t, e3.map(n), Qs)))(f)));
  }, h.domain = function(f) {
    return arguments.length ? (e3 = Array.from(f, ta), c()) : e3.slice();
  }, h.range = function(f) {
    return arguments.length ? (t = Array.from(f), c()) : t.slice();
  }, h.rangeRound = function(f) {
    return t = Array.from(f), r = Zc, c();
  }, h.clamp = function(f) {
    return arguments.length ? (a = f ? true : Rt, c()) : a !== Rt;
  }, h.interpolate = function(f) {
    return arguments.length ? (r = f, c()) : r;
  }, h.unknown = function(f) {
    return arguments.length ? (s = f, h) : s;
  }, function(f, d) {
    return n = f, i = d, c();
  };
}
function Qc() {
  return eo()(Rt, Rt);
}
function WA(e3) {
  return Math.abs(e3 = Math.round(e3)) >= 1e21 ? e3.toLocaleString("en").replace(/,/g, "") : e3.toString(10);
}
function ea(e3, t) {
  if (!isFinite(e3) || e3 === 0) return null;
  var r = (e3 = t ? e3.toExponential(t - 1) : e3.toExponential()).indexOf("e"), n = e3.slice(0, r);
  return [n.length > 1 ? n[0] + n.slice(2) : n, +e3.slice(r + 1)];
}
function xn(e3) {
  return e3 = ea(Math.abs(e3)), e3 ? e3[1] : NaN;
}
function KA(e3, t) {
  return function(r, n) {
    for (var i = r.length, s = [], a = 0, o = e3[0], l = 0; i > 0 && o > 0 && (l + o + 1 > n && (o = Math.max(1, n - l)), s.push(r.substring(i -= o, i + o)), !((l += o + 1) > n)); ) o = e3[a = (a + 1) % e3.length];
    return s.reverse().join(t);
  };
}
function UA(e3) {
  return function(t) {
    return t.replace(/[0-9]/g, function(r) {
      return e3[+r];
    });
  };
}
var qA = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function yi(e3) {
  if (!(t = qA.exec(e3))) throw new Error("invalid format: " + e3);
  var t;
  return new th({ fill: t[1], align: t[2], sign: t[3], symbol: t[4], zero: t[5], width: t[6], comma: t[7], precision: t[8] && t[8].slice(1), trim: t[9], type: t[10] });
}
yi.prototype = th.prototype;
function th(e3) {
  this.fill = e3.fill === void 0 ? " " : e3.fill + "", this.align = e3.align === void 0 ? ">" : e3.align + "", this.sign = e3.sign === void 0 ? "-" : e3.sign + "", this.symbol = e3.symbol === void 0 ? "" : e3.symbol + "", this.zero = !!e3.zero, this.width = e3.width === void 0 ? void 0 : +e3.width, this.comma = !!e3.comma, this.precision = e3.precision === void 0 ? void 0 : +e3.precision, this.trim = !!e3.trim, this.type = e3.type === void 0 ? "" : e3.type + "";
}
th.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
function VA(e3) {
  t: for (var t = e3.length, r = 1, n = -1, i; r < t; ++r) switch (e3[r]) {
    case ".":
      n = i = r;
      break;
    case "0":
      n === 0 && (n = r), i = r;
      break;
    default:
      if (!+e3[r]) break t;
      n > 0 && (n = 0);
      break;
  }
  return n > 0 ? e3.slice(0, n) + e3.slice(i + 1) : e3;
}
var ra;
function YA(e3, t) {
  var r = ea(e3, t);
  if (!r) return ra = void 0, e3.toPrecision(t);
  var n = r[0], i = r[1], s = i - (ra = Math.max(-8, Math.min(8, Math.floor(i / 3))) * 3) + 1, a = n.length;
  return s === a ? n : s > a ? n + new Array(s - a + 1).join("0") : s > 0 ? n.slice(0, s) + "." + n.slice(s) : "0." + new Array(1 - s).join("0") + ea(e3, Math.max(0, t + s - 1))[0];
}
function ep(e3, t) {
  var r = ea(e3, t);
  if (!r) return e3 + "";
  var n = r[0], i = r[1];
  return i < 0 ? "0." + new Array(-i).join("0") + n : n.length > i + 1 ? n.slice(0, i + 1) + "." + n.slice(i + 1) : n + new Array(i - n.length + 2).join("0");
}
const rp = { "%": (e3, t) => (e3 * 100).toFixed(t), b: (e3) => Math.round(e3).toString(2), c: (e3) => e3 + "", d: WA, e: (e3, t) => e3.toExponential(t), f: (e3, t) => e3.toFixed(t), g: (e3, t) => e3.toPrecision(t), o: (e3) => Math.round(e3).toString(8), p: (e3, t) => ep(e3 * 100, t), r: ep, s: YA, X: (e3) => Math.round(e3).toString(16).toUpperCase(), x: (e3) => Math.round(e3).toString(16) };
function np(e3) {
  return e3;
}
var ip = Array.prototype.map, sp = ["y", "z", "a", "f", "p", "n", "\xB5", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function HA(e3) {
  var t = e3.grouping === void 0 || e3.thousands === void 0 ? np : KA(ip.call(e3.grouping, Number), e3.thousands + ""), r = e3.currency === void 0 ? "" : e3.currency[0] + "", n = e3.currency === void 0 ? "" : e3.currency[1] + "", i = e3.decimal === void 0 ? "." : e3.decimal + "", s = e3.numerals === void 0 ? np : UA(ip.call(e3.numerals, String)), a = e3.percent === void 0 ? "%" : e3.percent + "", o = e3.minus === void 0 ? "\u2212" : e3.minus + "", l = e3.nan === void 0 ? "NaN" : e3.nan + "";
  function u(h, f) {
    h = yi(h);
    var d = h.fill, v = h.align, p = h.sign, m = h.symbol, y = h.zero, b = h.width, w = h.comma, x = h.precision, P = h.trim, S = h.type;
    S === "n" ? (w = true, S = "g") : rp[S] || (x === void 0 && (x = 12), P = true, S = "g"), (y || d === "0" && v === "=") && (y = true, d = "0", v = "=");
    var _ = (f && f.prefix !== void 0 ? f.prefix : "") + (m === "$" ? r : m === "#" && /[boxX]/.test(S) ? "0" + S.toLowerCase() : ""), M = (m === "$" ? n : /[%p]/.test(S) ? a : "") + (f && f.suffix !== void 0 ? f.suffix : ""), A = rp[S], j = /[defgprs%]/.test(S);
    x = x === void 0 ? 6 : /[gprs]/.test(S) ? Math.max(1, Math.min(21, x)) : Math.max(0, Math.min(20, x));
    function k(E) {
      var $ = _, R = M, B, H, W;
      if (S === "c") R = A(E) + R, E = "";
      else {
        E = +E;
        var G = E < 0 || 1 / E < 0;
        if (E = isNaN(E) ? l : A(Math.abs(E), x), P && (E = VA(E)), G && +E == 0 && p !== "+" && (G = false), $ = (G ? p === "(" ? p : o : p === "-" || p === "(" ? "" : p) + $, R = (S === "s" && !isNaN(E) && ra !== void 0 ? sp[8 + ra / 3] : "") + R + (G && p === "(" ? ")" : ""), j) {
          for (B = -1, H = E.length; ++B < H; ) if (W = E.charCodeAt(B), 48 > W || W > 57) {
            R = (W === 46 ? i + E.slice(B + 1) : E.slice(B)) + R, E = E.slice(0, B);
            break;
          }
        }
      }
      w && !y && (E = t(E, 1 / 0));
      var F = $.length + E.length + R.length, q = F < b ? new Array(b - F + 1).join(d) : "";
      switch (w && y && (E = t(q + E, q.length ? b - R.length : 1 / 0), q = ""), v) {
        case "<":
          E = $ + E + R + q;
          break;
        case "=":
          E = $ + q + E + R;
          break;
        case "^":
          E = q.slice(0, F = q.length >> 1) + $ + E + R + q.slice(F);
          break;
        default:
          E = q + $ + E + R;
          break;
      }
      return s(E);
    }
    return k.toString = function() {
      return h + "";
    }, k;
  }
  function c(h, f) {
    var d = Math.max(-8, Math.min(8, Math.floor(xn(f) / 3))) * 3, v = Math.pow(10, -d), p = u((h = yi(h), h.type = "f", h), { suffix: sp[8 + d / 3] });
    return function(m) {
      return p(v * m);
    };
  }
  return { format: u, formatPrefix: c };
}
var ns, eh, ob;
GA({ thousands: ",", grouping: [3], currency: ["$", ""] });
function GA(e3) {
  return ns = HA(e3), eh = ns.format, ob = ns.formatPrefix, ns;
}
function XA(e3) {
  return Math.max(0, -xn(Math.abs(e3)));
}
function JA(e3, t) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(xn(t) / 3))) * 3 - xn(Math.abs(e3)));
}
function ZA(e3, t) {
  return e3 = Math.abs(e3), t = Math.abs(t) - e3, Math.max(0, xn(t) - xn(e3)) + 1;
}
function lb(e3, t, r, n) {
  var i = Vu(e3, t, r), s;
  switch (n = yi(n ?? ",f"), n.type) {
    case "s": {
      var a = Math.max(Math.abs(e3), Math.abs(t));
      return n.precision == null && !isNaN(s = JA(i, a)) && (n.precision = s), ob(n, a);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      n.precision == null && !isNaN(s = ZA(i, Math.max(Math.abs(e3), Math.abs(t)))) && (n.precision = s - (n.type === "e"));
      break;
    }
    case "f":
    case "%": {
      n.precision == null && !isNaN(s = XA(i)) && (n.precision = s - (n.type === "%") * 2);
      break;
    }
  }
  return eh(n);
}
function dr(e3) {
  var t = e3.domain;
  return e3.ticks = function(r) {
    var n = t();
    return Uu(n[0], n[n.length - 1], r ?? 10);
  }, e3.tickFormat = function(r, n) {
    var i = t();
    return lb(i[0], i[i.length - 1], r ?? 10, n);
  }, e3.nice = function(r) {
    r == null && (r = 10);
    var n = t(), i = 0, s = n.length - 1, a = n[i], o = n[s], l, u, c = 10;
    for (o < a && (u = a, a = o, o = u, u = i, i = s, s = u); c-- > 0; ) {
      if (u = qu(a, o, r), u === l) return n[i] = a, n[s] = o, t(n);
      if (u > 0) a = Math.floor(a / u) * u, o = Math.ceil(o / u) * u;
      else if (u < 0) a = Math.ceil(a * u) / u, o = Math.floor(o * u) / u;
      else break;
      l = u;
    }
    return e3;
  }, e3;
}
function ub() {
  var e3 = Qc();
  return e3.copy = function() {
    return $i(e3, ub());
  }, he.apply(e3, arguments), dr(e3);
}
function cb(e3) {
  var t;
  function r(n) {
    return n == null || isNaN(n = +n) ? t : n;
  }
  return r.invert = r, r.domain = r.range = function(n) {
    return arguments.length ? (e3 = Array.from(n, ta), r) : e3.slice();
  }, r.unknown = function(n) {
    return arguments.length ? (t = n, r) : t;
  }, r.copy = function() {
    return cb(e3).unknown(t);
  }, e3 = arguments.length ? Array.from(e3, ta) : [0, 1], dr(r);
}
function hb(e3, t) {
  e3 = e3.slice();
  var r = 0, n = e3.length - 1, i = e3[r], s = e3[n], a;
  return s < i && (a = r, r = n, n = a, a = i, i = s, s = a), e3[r] = t.floor(i), e3[n] = t.ceil(s), e3;
}
function ap(e3) {
  return Math.log(e3);
}
function op(e3) {
  return Math.exp(e3);
}
function QA(e3) {
  return -Math.log(-e3);
}
function tC(e3) {
  return -Math.exp(-e3);
}
function eC(e3) {
  return isFinite(e3) ? +("1e" + e3) : e3 < 0 ? 0 : e3;
}
function rC(e3) {
  return e3 === 10 ? eC : e3 === Math.E ? Math.exp : (t) => Math.pow(e3, t);
}
function nC(e3) {
  return e3 === Math.E ? Math.log : e3 === 10 && Math.log10 || e3 === 2 && Math.log2 || (e3 = Math.log(e3), (t) => Math.log(t) / e3);
}
function lp(e3) {
  return (t, r) => -e3(-t, r);
}
function rh(e3) {
  const t = e3(ap, op), r = t.domain;
  let n = 10, i, s;
  function a() {
    return i = nC(n), s = rC(n), r()[0] < 0 ? (i = lp(i), s = lp(s), e3(QA, tC)) : e3(ap, op), t;
  }
  return t.base = function(o) {
    return arguments.length ? (n = +o, a()) : n;
  }, t.domain = function(o) {
    return arguments.length ? (r(o), a()) : r();
  }, t.ticks = (o) => {
    const l = r();
    let u = l[0], c = l[l.length - 1];
    const h = c < u;
    h && ([u, c] = [c, u]);
    let f = i(u), d = i(c), v, p;
    const m = o == null ? 10 : +o;
    let y = [];
    if (!(n % 1) && d - f < m) {
      if (f = Math.floor(f), d = Math.ceil(d), u > 0) {
        for (; f <= d; ++f) for (v = 1; v < n; ++v) if (p = f < 0 ? v / s(-f) : v * s(f), !(p < u)) {
          if (p > c) break;
          y.push(p);
        }
      } else for (; f <= d; ++f) for (v = n - 1; v >= 1; --v) if (p = f > 0 ? v / s(-f) : v * s(f), !(p < u)) {
        if (p > c) break;
        y.push(p);
      }
      y.length * 2 < m && (y = Uu(u, c, m));
    } else y = Uu(f, d, Math.min(d - f, m)).map(s);
    return h ? y.reverse() : y;
  }, t.tickFormat = (o, l) => {
    if (o == null && (o = 10), l == null && (l = n === 10 ? "s" : ","), typeof l != "function" && (!(n % 1) && (l = yi(l)).precision == null && (l.trim = true), l = eh(l)), o === 1 / 0) return l;
    const u = Math.max(1, n * o / t.ticks().length);
    return (c) => {
      let h = c / s(Math.round(i(c)));
      return h * n < n - 0.5 && (h *= n), h <= u ? l(c) : "";
    };
  }, t.nice = () => r(hb(r(), { floor: (o) => s(Math.floor(i(o))), ceil: (o) => s(Math.ceil(i(o))) })), t;
}
function fb() {
  const e3 = rh(eo()).domain([1, 10]);
  return e3.copy = () => $i(e3, fb()).base(e3.base()), he.apply(e3, arguments), e3;
}
function up(e3) {
  return function(t) {
    return Math.sign(t) * Math.log1p(Math.abs(t / e3));
  };
}
function cp(e3) {
  return function(t) {
    return Math.sign(t) * Math.expm1(Math.abs(t)) * e3;
  };
}
function nh(e3) {
  var t = 1, r = e3(up(t), cp(t));
  return r.constant = function(n) {
    return arguments.length ? e3(up(t = +n), cp(t)) : t;
  }, dr(r);
}
function db() {
  var e3 = nh(eo());
  return e3.copy = function() {
    return $i(e3, db()).constant(e3.constant());
  }, he.apply(e3, arguments);
}
function hp(e3) {
  return function(t) {
    return t < 0 ? -Math.pow(-t, e3) : Math.pow(t, e3);
  };
}
function iC(e3) {
  return e3 < 0 ? -Math.sqrt(-e3) : Math.sqrt(e3);
}
function sC(e3) {
  return e3 < 0 ? -e3 * e3 : e3 * e3;
}
function ih(e3) {
  var t = e3(Rt, Rt), r = 1;
  function n() {
    return r === 1 ? e3(Rt, Rt) : r === 0.5 ? e3(iC, sC) : e3(hp(r), hp(1 / r));
  }
  return t.exponent = function(i) {
    return arguments.length ? (r = +i, n()) : r;
  }, dr(t);
}
function sh() {
  var e3 = ih(eo());
  return e3.copy = function() {
    return $i(e3, sh()).exponent(e3.exponent());
  }, he.apply(e3, arguments), e3;
}
function aC() {
  return sh.apply(null, arguments).exponent(0.5);
}
function fp(e3) {
  return Math.sign(e3) * e3 * e3;
}
function oC(e3) {
  return Math.sign(e3) * Math.sqrt(Math.abs(e3));
}
function vb() {
  var e3 = Qc(), t = [0, 1], r = false, n;
  function i(s) {
    var a = oC(e3(s));
    return isNaN(a) ? n : r ? Math.round(a) : a;
  }
  return i.invert = function(s) {
    return e3.invert(fp(s));
  }, i.domain = function(s) {
    return arguments.length ? (e3.domain(s), i) : e3.domain();
  }, i.range = function(s) {
    return arguments.length ? (e3.range((t = Array.from(s, ta)).map(fp)), i) : t.slice();
  }, i.rangeRound = function(s) {
    return i.range(s).round(true);
  }, i.round = function(s) {
    return arguments.length ? (r = !!s, i) : r;
  }, i.clamp = function(s) {
    return arguments.length ? (e3.clamp(s), i) : e3.clamp();
  }, i.unknown = function(s) {
    return arguments.length ? (n = s, i) : n;
  }, i.copy = function() {
    return vb(e3.domain(), t).round(r).clamp(e3.clamp()).unknown(n);
  }, he.apply(i, arguments), dr(i);
}
function pb() {
  var e3 = [], t = [], r = [], n;
  function i() {
    var a = 0, o = Math.max(1, t.length);
    for (r = new Array(o - 1); ++a < o; ) r[a - 1] = hA(e3, a / o);
    return s;
  }
  function s(a) {
    return a == null || isNaN(a = +a) ? n : t[Li(r, a)];
  }
  return s.invertExtent = function(a) {
    var o = t.indexOf(a);
    return o < 0 ? [NaN, NaN] : [o > 0 ? r[o - 1] : e3[0], o < r.length ? r[o] : e3[e3.length - 1]];
  }, s.domain = function(a) {
    if (!arguments.length) return e3.slice();
    e3 = [];
    for (let o of a) o != null && !isNaN(o = +o) && e3.push(o);
    return e3.sort(lr), i();
  }, s.range = function(a) {
    return arguments.length ? (t = Array.from(a), i()) : t.slice();
  }, s.unknown = function(a) {
    return arguments.length ? (n = a, s) : n;
  }, s.quantiles = function() {
    return r.slice();
  }, s.copy = function() {
    return pb().domain(e3).range(t).unknown(n);
  }, he.apply(s, arguments);
}
function mb() {
  var e3 = 0, t = 1, r = 1, n = [0.5], i = [0, 1], s;
  function a(l) {
    return l != null && l <= l ? i[Li(n, l, 0, r)] : s;
  }
  function o() {
    var l = -1;
    for (n = new Array(r); ++l < r; ) n[l] = ((l + 1) * t - (l - r) * e3) / (r + 1);
    return a;
  }
  return a.domain = function(l) {
    return arguments.length ? ([e3, t] = l, e3 = +e3, t = +t, o()) : [e3, t];
  }, a.range = function(l) {
    return arguments.length ? (r = (i = Array.from(l)).length - 1, o()) : i.slice();
  }, a.invertExtent = function(l) {
    var u = i.indexOf(l);
    return u < 0 ? [NaN, NaN] : u < 1 ? [e3, n[0]] : u >= r ? [n[r - 1], t] : [n[u - 1], n[u]];
  }, a.unknown = function(l) {
    return arguments.length && (s = l), a;
  }, a.thresholds = function() {
    return n.slice();
  }, a.copy = function() {
    return mb().domain([e3, t]).range(i).unknown(s);
  }, he.apply(dr(a), arguments);
}
function gb() {
  var e3 = [0.5], t = [0, 1], r, n = 1;
  function i(s) {
    return s != null && s <= s ? t[Li(e3, s, 0, n)] : r;
  }
  return i.domain = function(s) {
    return arguments.length ? (e3 = Array.from(s), n = Math.min(e3.length, t.length - 1), i) : e3.slice();
  }, i.range = function(s) {
    return arguments.length ? (t = Array.from(s), n = Math.min(e3.length, t.length - 1), i) : t.slice();
  }, i.invertExtent = function(s) {
    var a = t.indexOf(s);
    return [e3[a - 1], e3[a]];
  }, i.unknown = function(s) {
    return arguments.length ? (r = s, i) : r;
  }, i.copy = function() {
    return gb().domain(e3).range(t).unknown(r);
  }, he.apply(i, arguments);
}
const Rl = /* @__PURE__ */ new Date(), $l = /* @__PURE__ */ new Date();
function gt(e3, t, r, n) {
  function i(s) {
    return e3(s = arguments.length === 0 ? /* @__PURE__ */ new Date() : /* @__PURE__ */ new Date(+s)), s;
  }
  return i.floor = (s) => (e3(s = /* @__PURE__ */ new Date(+s)), s), i.ceil = (s) => (e3(s = new Date(s - 1)), t(s, 1), e3(s), s), i.round = (s) => {
    const a = i(s), o = i.ceil(s);
    return s - a < o - s ? a : o;
  }, i.offset = (s, a) => (t(s = /* @__PURE__ */ new Date(+s), a == null ? 1 : Math.floor(a)), s), i.range = (s, a, o) => {
    const l = [];
    if (s = i.ceil(s), o = o == null ? 1 : Math.floor(o), !(s < a) || !(o > 0)) return l;
    let u;
    do
      l.push(u = /* @__PURE__ */ new Date(+s)), t(s, o), e3(s);
    while (u < s && s < a);
    return l;
  }, i.filter = (s) => gt((a) => {
    if (a >= a) for (; e3(a), !s(a); ) a.setTime(a - 1);
  }, (a, o) => {
    if (a >= a) if (o < 0) for (; ++o <= 0; ) for (; t(a, -1), !s(a); ) ;
    else for (; --o >= 0; ) for (; t(a, 1), !s(a); ) ;
  }), r && (i.count = (s, a) => (Rl.setTime(+s), $l.setTime(+a), e3(Rl), e3($l), Math.floor(r(Rl, $l))), i.every = (s) => (s = Math.floor(s), !isFinite(s) || !(s > 0) ? null : s > 1 ? i.filter(n ? (a) => n(a) % s === 0 : (a) => i.count(0, a) % s === 0) : i)), i;
}
const na = gt(() => {
}, (e3, t) => {
  e3.setTime(+e3 + t);
}, (e3, t) => t - e3);
na.every = (e3) => (e3 = Math.floor(e3), !isFinite(e3) || !(e3 > 0) ? null : e3 > 1 ? gt((t) => {
  t.setTime(Math.floor(t / e3) * e3);
}, (t, r) => {
  t.setTime(+t + r * e3);
}, (t, r) => (r - t) / e3) : na);
na.range;
const $e = 1e3, le = $e * 60, ze = le * 60, qe = ze * 24, ah = qe * 7, dp = qe * 30, zl = qe * 365, Mr = gt((e3) => {
  e3.setTime(e3 - e3.getMilliseconds());
}, (e3, t) => {
  e3.setTime(+e3 + t * $e);
}, (e3, t) => (t - e3) / $e, (e3) => e3.getUTCSeconds());
Mr.range;
const oh = gt((e3) => {
  e3.setTime(e3 - e3.getMilliseconds() - e3.getSeconds() * $e);
}, (e3, t) => {
  e3.setTime(+e3 + t * le);
}, (e3, t) => (t - e3) / le, (e3) => e3.getMinutes());
oh.range;
const lh = gt((e3) => {
  e3.setUTCSeconds(0, 0);
}, (e3, t) => {
  e3.setTime(+e3 + t * le);
}, (e3, t) => (t - e3) / le, (e3) => e3.getUTCMinutes());
lh.range;
const uh = gt((e3) => {
  e3.setTime(e3 - e3.getMilliseconds() - e3.getSeconds() * $e - e3.getMinutes() * le);
}, (e3, t) => {
  e3.setTime(+e3 + t * ze);
}, (e3, t) => (t - e3) / ze, (e3) => e3.getHours());
uh.range;
const ch = gt((e3) => {
  e3.setUTCMinutes(0, 0, 0);
}, (e3, t) => {
  e3.setTime(+e3 + t * ze);
}, (e3, t) => (t - e3) / ze, (e3) => e3.getUTCHours());
ch.range;
const zi = gt((e3) => e3.setHours(0, 0, 0, 0), (e3, t) => e3.setDate(e3.getDate() + t), (e3, t) => (t - e3 - (t.getTimezoneOffset() - e3.getTimezoneOffset()) * le) / qe, (e3) => e3.getDate() - 1);
zi.range;
const ro = gt((e3) => {
  e3.setUTCHours(0, 0, 0, 0);
}, (e3, t) => {
  e3.setUTCDate(e3.getUTCDate() + t);
}, (e3, t) => (t - e3) / qe, (e3) => e3.getUTCDate() - 1);
ro.range;
const yb = gt((e3) => {
  e3.setUTCHours(0, 0, 0, 0);
}, (e3, t) => {
  e3.setUTCDate(e3.getUTCDate() + t);
}, (e3, t) => (t - e3) / qe, (e3) => Math.floor(e3 / qe));
yb.range;
function Yr(e3) {
  return gt((t) => {
    t.setDate(t.getDate() - (t.getDay() + 7 - e3) % 7), t.setHours(0, 0, 0, 0);
  }, (t, r) => {
    t.setDate(t.getDate() + r * 7);
  }, (t, r) => (r - t - (r.getTimezoneOffset() - t.getTimezoneOffset()) * le) / ah);
}
const no = Yr(0), ia = Yr(1), lC = Yr(2), uC = Yr(3), Pn = Yr(4), cC = Yr(5), hC = Yr(6);
no.range;
ia.range;
lC.range;
uC.range;
Pn.range;
cC.range;
hC.range;
function Hr(e3) {
  return gt((t) => {
    t.setUTCDate(t.getUTCDate() - (t.getUTCDay() + 7 - e3) % 7), t.setUTCHours(0, 0, 0, 0);
  }, (t, r) => {
    t.setUTCDate(t.getUTCDate() + r * 7);
  }, (t, r) => (r - t) / ah);
}
const io = Hr(0), sa = Hr(1), fC = Hr(2), dC = Hr(3), Sn = Hr(4), vC = Hr(5), pC = Hr(6);
io.range;
sa.range;
fC.range;
dC.range;
Sn.range;
vC.range;
pC.range;
const hh = gt((e3) => {
  e3.setDate(1), e3.setHours(0, 0, 0, 0);
}, (e3, t) => {
  e3.setMonth(e3.getMonth() + t);
}, (e3, t) => t.getMonth() - e3.getMonth() + (t.getFullYear() - e3.getFullYear()) * 12, (e3) => e3.getMonth());
hh.range;
const fh = gt((e3) => {
  e3.setUTCDate(1), e3.setUTCHours(0, 0, 0, 0);
}, (e3, t) => {
  e3.setUTCMonth(e3.getUTCMonth() + t);
}, (e3, t) => t.getUTCMonth() - e3.getUTCMonth() + (t.getUTCFullYear() - e3.getUTCFullYear()) * 12, (e3) => e3.getUTCMonth());
fh.range;
const Ve = gt((e3) => {
  e3.setMonth(0, 1), e3.setHours(0, 0, 0, 0);
}, (e3, t) => {
  e3.setFullYear(e3.getFullYear() + t);
}, (e3, t) => t.getFullYear() - e3.getFullYear(), (e3) => e3.getFullYear());
Ve.every = (e3) => !isFinite(e3 = Math.floor(e3)) || !(e3 > 0) ? null : gt((t) => {
  t.setFullYear(Math.floor(t.getFullYear() / e3) * e3), t.setMonth(0, 1), t.setHours(0, 0, 0, 0);
}, (t, r) => {
  t.setFullYear(t.getFullYear() + r * e3);
});
Ve.range;
const Ye = gt((e3) => {
  e3.setUTCMonth(0, 1), e3.setUTCHours(0, 0, 0, 0);
}, (e3, t) => {
  e3.setUTCFullYear(e3.getUTCFullYear() + t);
}, (e3, t) => t.getUTCFullYear() - e3.getUTCFullYear(), (e3) => e3.getUTCFullYear());
Ye.every = (e3) => !isFinite(e3 = Math.floor(e3)) || !(e3 > 0) ? null : gt((t) => {
  t.setUTCFullYear(Math.floor(t.getUTCFullYear() / e3) * e3), t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0);
}, (t, r) => {
  t.setUTCFullYear(t.getUTCFullYear() + r * e3);
});
Ye.range;
function bb(e3, t, r, n, i, s) {
  const a = [[Mr, 1, $e], [Mr, 5, 5 * $e], [Mr, 15, 15 * $e], [Mr, 30, 30 * $e], [s, 1, le], [s, 5, 5 * le], [s, 15, 15 * le], [s, 30, 30 * le], [i, 1, ze], [i, 3, 3 * ze], [i, 6, 6 * ze], [i, 12, 12 * ze], [n, 1, qe], [n, 2, 2 * qe], [r, 1, ah], [t, 1, dp], [t, 3, 3 * dp], [e3, 1, zl]];
  function o(u, c, h) {
    const f = c < u;
    f && ([u, c] = [c, u]);
    const d = h && typeof h.range == "function" ? h : l(u, c, h), v = d ? d.range(u, +c + 1) : [];
    return f ? v.reverse() : v;
  }
  function l(u, c, h) {
    const f = Math.abs(c - u) / h, d = Yc(([, , m]) => m).right(a, f);
    if (d === a.length) return e3.every(Vu(u / zl, c / zl, h));
    if (d === 0) return na.every(Math.max(Vu(u, c, h), 1));
    const [v, p] = a[f / a[d - 1][2] < a[d][2] / f ? d - 1 : d];
    return v.every(p);
  }
  return [o, l];
}
const [mC, gC] = bb(Ye, fh, io, yb, ch, lh), [yC, bC] = bb(Ve, hh, no, zi, uh, oh);
function Bl(e3) {
  if (0 <= e3.y && e3.y < 100) {
    var t = new Date(-1, e3.m, e3.d, e3.H, e3.M, e3.S, e3.L);
    return t.setFullYear(e3.y), t;
  }
  return new Date(e3.y, e3.m, e3.d, e3.H, e3.M, e3.S, e3.L);
}
function Fl(e3) {
  if (0 <= e3.y && e3.y < 100) {
    var t = new Date(Date.UTC(-1, e3.m, e3.d, e3.H, e3.M, e3.S, e3.L));
    return t.setUTCFullYear(e3.y), t;
  }
  return new Date(Date.UTC(e3.y, e3.m, e3.d, e3.H, e3.M, e3.S, e3.L));
}
function Un(e3, t, r) {
  return { y: e3, m: t, d: r, H: 0, M: 0, S: 0, L: 0 };
}
function wC(e3) {
  var t = e3.dateTime, r = e3.date, n = e3.time, i = e3.periods, s = e3.days, a = e3.shortDays, o = e3.months, l = e3.shortMonths, u = qn(i), c = Vn(i), h = qn(s), f = Vn(s), d = qn(a), v = Vn(a), p = qn(o), m = Vn(o), y = qn(l), b = Vn(l), w = { a: W, A: G, b: F, B: q, c: null, d: bp, e: bp, f: KC, g: QC, G: ej, H: BC, I: FC, j: WC, L: wb, m: UC, M: qC, p: Lt, q: st, Q: Pp, s: Sp, S: VC, u: YC, U: HC, V: GC, w: XC, W: JC, x: null, X: null, y: ZC, Y: tj, Z: rj, "%": xp }, x = { a: fe, A: Wt, b: De, B: Rn, c: null, d: wp, e: wp, f: aj, g: mj, G: yj, H: nj, I: ij, j: sj, L: Pb, m: oj, M: lj, p: $n, q: Kt, Q: Pp, s: Sp, S: uj, u: cj, U: hj, V: fj, w: dj, W: vj, x: null, X: null, y: pj, Y: gj, Z: bj, "%": xp }, P = { a: j, A: k, b: E, B: $, c: R, d: gp, e: gp, f: LC, g: mp, G: pp, H: yp, I: yp, j: IC, L: DC, m: kC, M: TC, p: A, q: jC, Q: $C, s: zC, S: NC, u: OC, U: MC, V: EC, w: _C, W: AC, x: B, X: H, y: mp, Y: pp, Z: CC, "%": RC };
  w.x = S(r, w), w.X = S(n, w), w.c = S(t, w), x.x = S(r, x), x.X = S(n, x), x.c = S(t, x);
  function S(D, T) {
    return function(V) {
      var I = [], Ut = -1, Q = 0, Ht = D.length, Gt, pr, tf;
      for (V instanceof Date || (V = /* @__PURE__ */ new Date(+V)); ++Ut < Ht; ) D.charCodeAt(Ut) === 37 && (I.push(D.slice(Q, Ut)), (pr = vp[Gt = D.charAt(++Ut)]) != null ? Gt = D.charAt(++Ut) : pr = Gt === "e" ? " " : "0", (tf = T[Gt]) && (Gt = tf(V, pr)), I.push(Gt), Q = Ut + 1);
      return I.push(D.slice(Q, Ut)), I.join("");
    };
  }
  function _(D, T) {
    return function(V) {
      var I = Un(1900, void 0, 1), Ut = M(I, D, V += "", 0), Q, Ht;
      if (Ut != V.length) return null;
      if ("Q" in I) return new Date(I.Q);
      if ("s" in I) return new Date(I.s * 1e3 + ("L" in I ? I.L : 0));
      if (T && !("Z" in I) && (I.Z = 0), "p" in I && (I.H = I.H % 12 + I.p * 12), I.m === void 0 && (I.m = "q" in I ? I.q : 0), "V" in I) {
        if (I.V < 1 || I.V > 53) return null;
        "w" in I || (I.w = 1), "Z" in I ? (Q = Fl(Un(I.y, 0, 1)), Ht = Q.getUTCDay(), Q = Ht > 4 || Ht === 0 ? sa.ceil(Q) : sa(Q), Q = ro.offset(Q, (I.V - 1) * 7), I.y = Q.getUTCFullYear(), I.m = Q.getUTCMonth(), I.d = Q.getUTCDate() + (I.w + 6) % 7) : (Q = Bl(Un(I.y, 0, 1)), Ht = Q.getDay(), Q = Ht > 4 || Ht === 0 ? ia.ceil(Q) : ia(Q), Q = zi.offset(Q, (I.V - 1) * 7), I.y = Q.getFullYear(), I.m = Q.getMonth(), I.d = Q.getDate() + (I.w + 6) % 7);
      } else ("W" in I || "U" in I) && ("w" in I || (I.w = "u" in I ? I.u % 7 : "W" in I ? 1 : 0), Ht = "Z" in I ? Fl(Un(I.y, 0, 1)).getUTCDay() : Bl(Un(I.y, 0, 1)).getDay(), I.m = 0, I.d = "W" in I ? (I.w + 6) % 7 + I.W * 7 - (Ht + 5) % 7 : I.w + I.U * 7 - (Ht + 6) % 7);
      return "Z" in I ? (I.H += I.Z / 100 | 0, I.M += I.Z % 100, Fl(I)) : Bl(I);
    };
  }
  function M(D, T, V, I) {
    for (var Ut = 0, Q = T.length, Ht = V.length, Gt, pr; Ut < Q; ) {
      if (I >= Ht) return -1;
      if (Gt = T.charCodeAt(Ut++), Gt === 37) {
        if (Gt = T.charAt(Ut++), pr = P[Gt in vp ? T.charAt(Ut++) : Gt], !pr || (I = pr(D, V, I)) < 0) return -1;
      } else if (Gt != V.charCodeAt(I++)) return -1;
    }
    return I;
  }
  function A(D, T, V) {
    var I = u.exec(T.slice(V));
    return I ? (D.p = c.get(I[0].toLowerCase()), V + I[0].length) : -1;
  }
  function j(D, T, V) {
    var I = d.exec(T.slice(V));
    return I ? (D.w = v.get(I[0].toLowerCase()), V + I[0].length) : -1;
  }
  function k(D, T, V) {
    var I = h.exec(T.slice(V));
    return I ? (D.w = f.get(I[0].toLowerCase()), V + I[0].length) : -1;
  }
  function E(D, T, V) {
    var I = y.exec(T.slice(V));
    return I ? (D.m = b.get(I[0].toLowerCase()), V + I[0].length) : -1;
  }
  function $(D, T, V) {
    var I = p.exec(T.slice(V));
    return I ? (D.m = m.get(I[0].toLowerCase()), V + I[0].length) : -1;
  }
  function R(D, T, V) {
    return M(D, t, T, V);
  }
  function B(D, T, V) {
    return M(D, r, T, V);
  }
  function H(D, T, V) {
    return M(D, n, T, V);
  }
  function W(D) {
    return a[D.getDay()];
  }
  function G(D) {
    return s[D.getDay()];
  }
  function F(D) {
    return l[D.getMonth()];
  }
  function q(D) {
    return o[D.getMonth()];
  }
  function Lt(D) {
    return i[+(D.getHours() >= 12)];
  }
  function st(D) {
    return 1 + ~~(D.getMonth() / 3);
  }
  function fe(D) {
    return a[D.getUTCDay()];
  }
  function Wt(D) {
    return s[D.getUTCDay()];
  }
  function De(D) {
    return l[D.getUTCMonth()];
  }
  function Rn(D) {
    return o[D.getUTCMonth()];
  }
  function $n(D) {
    return i[+(D.getUTCHours() >= 12)];
  }
  function Kt(D) {
    return 1 + ~~(D.getUTCMonth() / 3);
  }
  return { format: function(D) {
    var T = S(D += "", w);
    return T.toString = function() {
      return D;
    }, T;
  }, parse: function(D) {
    var T = _(D += "", false);
    return T.toString = function() {
      return D;
    }, T;
  }, utcFormat: function(D) {
    var T = S(D += "", x);
    return T.toString = function() {
      return D;
    }, T;
  }, utcParse: function(D) {
    var T = _(D += "", true);
    return T.toString = function() {
      return D;
    }, T;
  } };
}
var vp = { "-": "", _: " ", 0: "0" }, Pt = /^\s*\d+/, xC = /^%/, PC = /[\\^$*+?|[\]().{}]/g;
function Y(e3, t, r) {
  var n = e3 < 0 ? "-" : "", i = (n ? -e3 : e3) + "", s = i.length;
  return n + (s < r ? new Array(r - s + 1).join(t) + i : i);
}
function SC(e3) {
  return e3.replace(PC, "\\$&");
}
function qn(e3) {
  return new RegExp("^(?:" + e3.map(SC).join("|") + ")", "i");
}
function Vn(e3) {
  return new Map(e3.map((t, r) => [t.toLowerCase(), r]));
}
function _C(e3, t, r) {
  var n = Pt.exec(t.slice(r, r + 1));
  return n ? (e3.w = +n[0], r + n[0].length) : -1;
}
function OC(e3, t, r) {
  var n = Pt.exec(t.slice(r, r + 1));
  return n ? (e3.u = +n[0], r + n[0].length) : -1;
}
function MC(e3, t, r) {
  var n = Pt.exec(t.slice(r, r + 2));
  return n ? (e3.U = +n[0], r + n[0].length) : -1;
}
function EC(e3, t, r) {
  var n = Pt.exec(t.slice(r, r + 2));
  return n ? (e3.V = +n[0], r + n[0].length) : -1;
}
function AC(e3, t, r) {
  var n = Pt.exec(t.slice(r, r + 2));
  return n ? (e3.W = +n[0], r + n[0].length) : -1;
}
function pp(e3, t, r) {
  var n = Pt.exec(t.slice(r, r + 4));
  return n ? (e3.y = +n[0], r + n[0].length) : -1;
}
function mp(e3, t, r) {
  var n = Pt.exec(t.slice(r, r + 2));
  return n ? (e3.y = +n[0] + (+n[0] > 68 ? 1900 : 2e3), r + n[0].length) : -1;
}
function CC(e3, t, r) {
  var n = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(t.slice(r, r + 6));
  return n ? (e3.Z = n[1] ? 0 : -(n[2] + (n[3] || "00")), r + n[0].length) : -1;
}
function jC(e3, t, r) {
  var n = Pt.exec(t.slice(r, r + 1));
  return n ? (e3.q = n[0] * 3 - 3, r + n[0].length) : -1;
}
function kC(e3, t, r) {
  var n = Pt.exec(t.slice(r, r + 2));
  return n ? (e3.m = n[0] - 1, r + n[0].length) : -1;
}
function gp(e3, t, r) {
  var n = Pt.exec(t.slice(r, r + 2));
  return n ? (e3.d = +n[0], r + n[0].length) : -1;
}
function IC(e3, t, r) {
  var n = Pt.exec(t.slice(r, r + 3));
  return n ? (e3.m = 0, e3.d = +n[0], r + n[0].length) : -1;
}
function yp(e3, t, r) {
  var n = Pt.exec(t.slice(r, r + 2));
  return n ? (e3.H = +n[0], r + n[0].length) : -1;
}
function TC(e3, t, r) {
  var n = Pt.exec(t.slice(r, r + 2));
  return n ? (e3.M = +n[0], r + n[0].length) : -1;
}
function NC(e3, t, r) {
  var n = Pt.exec(t.slice(r, r + 2));
  return n ? (e3.S = +n[0], r + n[0].length) : -1;
}
function DC(e3, t, r) {
  var n = Pt.exec(t.slice(r, r + 3));
  return n ? (e3.L = +n[0], r + n[0].length) : -1;
}
function LC(e3, t, r) {
  var n = Pt.exec(t.slice(r, r + 6));
  return n ? (e3.L = Math.floor(n[0] / 1e3), r + n[0].length) : -1;
}
function RC(e3, t, r) {
  var n = xC.exec(t.slice(r, r + 1));
  return n ? r + n[0].length : -1;
}
function $C(e3, t, r) {
  var n = Pt.exec(t.slice(r));
  return n ? (e3.Q = +n[0], r + n[0].length) : -1;
}
function zC(e3, t, r) {
  var n = Pt.exec(t.slice(r));
  return n ? (e3.s = +n[0], r + n[0].length) : -1;
}
function bp(e3, t) {
  return Y(e3.getDate(), t, 2);
}
function BC(e3, t) {
  return Y(e3.getHours(), t, 2);
}
function FC(e3, t) {
  return Y(e3.getHours() % 12 || 12, t, 2);
}
function WC(e3, t) {
  return Y(1 + zi.count(Ve(e3), e3), t, 3);
}
function wb(e3, t) {
  return Y(e3.getMilliseconds(), t, 3);
}
function KC(e3, t) {
  return wb(e3, t) + "000";
}
function UC(e3, t) {
  return Y(e3.getMonth() + 1, t, 2);
}
function qC(e3, t) {
  return Y(e3.getMinutes(), t, 2);
}
function VC(e3, t) {
  return Y(e3.getSeconds(), t, 2);
}
function YC(e3) {
  var t = e3.getDay();
  return t === 0 ? 7 : t;
}
function HC(e3, t) {
  return Y(no.count(Ve(e3) - 1, e3), t, 2);
}
function xb(e3) {
  var t = e3.getDay();
  return t >= 4 || t === 0 ? Pn(e3) : Pn.ceil(e3);
}
function GC(e3, t) {
  return e3 = xb(e3), Y(Pn.count(Ve(e3), e3) + (Ve(e3).getDay() === 4), t, 2);
}
function XC(e3) {
  return e3.getDay();
}
function JC(e3, t) {
  return Y(ia.count(Ve(e3) - 1, e3), t, 2);
}
function ZC(e3, t) {
  return Y(e3.getFullYear() % 100, t, 2);
}
function QC(e3, t) {
  return e3 = xb(e3), Y(e3.getFullYear() % 100, t, 2);
}
function tj(e3, t) {
  return Y(e3.getFullYear() % 1e4, t, 4);
}
function ej(e3, t) {
  var r = e3.getDay();
  return e3 = r >= 4 || r === 0 ? Pn(e3) : Pn.ceil(e3), Y(e3.getFullYear() % 1e4, t, 4);
}
function rj(e3) {
  var t = e3.getTimezoneOffset();
  return (t > 0 ? "-" : (t *= -1, "+")) + Y(t / 60 | 0, "0", 2) + Y(t % 60, "0", 2);
}
function wp(e3, t) {
  return Y(e3.getUTCDate(), t, 2);
}
function nj(e3, t) {
  return Y(e3.getUTCHours(), t, 2);
}
function ij(e3, t) {
  return Y(e3.getUTCHours() % 12 || 12, t, 2);
}
function sj(e3, t) {
  return Y(1 + ro.count(Ye(e3), e3), t, 3);
}
function Pb(e3, t) {
  return Y(e3.getUTCMilliseconds(), t, 3);
}
function aj(e3, t) {
  return Pb(e3, t) + "000";
}
function oj(e3, t) {
  return Y(e3.getUTCMonth() + 1, t, 2);
}
function lj(e3, t) {
  return Y(e3.getUTCMinutes(), t, 2);
}
function uj(e3, t) {
  return Y(e3.getUTCSeconds(), t, 2);
}
function cj(e3) {
  var t = e3.getUTCDay();
  return t === 0 ? 7 : t;
}
function hj(e3, t) {
  return Y(io.count(Ye(e3) - 1, e3), t, 2);
}
function Sb(e3) {
  var t = e3.getUTCDay();
  return t >= 4 || t === 0 ? Sn(e3) : Sn.ceil(e3);
}
function fj(e3, t) {
  return e3 = Sb(e3), Y(Sn.count(Ye(e3), e3) + (Ye(e3).getUTCDay() === 4), t, 2);
}
function dj(e3) {
  return e3.getUTCDay();
}
function vj(e3, t) {
  return Y(sa.count(Ye(e3) - 1, e3), t, 2);
}
function pj(e3, t) {
  return Y(e3.getUTCFullYear() % 100, t, 2);
}
function mj(e3, t) {
  return e3 = Sb(e3), Y(e3.getUTCFullYear() % 100, t, 2);
}
function gj(e3, t) {
  return Y(e3.getUTCFullYear() % 1e4, t, 4);
}
function yj(e3, t) {
  var r = e3.getUTCDay();
  return e3 = r >= 4 || r === 0 ? Sn(e3) : Sn.ceil(e3), Y(e3.getUTCFullYear() % 1e4, t, 4);
}
function bj() {
  return "+0000";
}
function xp() {
  return "%";
}
function Pp(e3) {
  return +e3;
}
function Sp(e3) {
  return Math.floor(+e3 / 1e3);
}
var Zr, _b, Ob;
wj({ dateTime: "%x, %X", date: "%-m/%-d/%Y", time: "%-I:%M:%S %p", periods: ["AM", "PM"], days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] });
function wj(e3) {
  return Zr = wC(e3), _b = Zr.format, Zr.parse, Ob = Zr.utcFormat, Zr.utcParse, Zr;
}
function xj(e3) {
  return new Date(e3);
}
function Pj(e3) {
  return e3 instanceof Date ? +e3 : +/* @__PURE__ */ new Date(+e3);
}
function dh(e3, t, r, n, i, s, a, o, l, u) {
  var c = Qc(), h = c.invert, f = c.domain, d = u(".%L"), v = u(":%S"), p = u("%I:%M"), m = u("%I %p"), y = u("%a %d"), b = u("%b %d"), w = u("%B"), x = u("%Y");
  function P(S) {
    return (l(S) < S ? d : o(S) < S ? v : a(S) < S ? p : s(S) < S ? m : n(S) < S ? i(S) < S ? y : b : r(S) < S ? w : x)(S);
  }
  return c.invert = function(S) {
    return new Date(h(S));
  }, c.domain = function(S) {
    return arguments.length ? f(Array.from(S, Pj)) : f().map(xj);
  }, c.ticks = function(S) {
    var _ = f();
    return e3(_[0], _[_.length - 1], S ?? 10);
  }, c.tickFormat = function(S, _) {
    return _ == null ? P : u(_);
  }, c.nice = function(S) {
    var _ = f();
    return (!S || typeof S.range != "function") && (S = t(_[0], _[_.length - 1], S ?? 10)), S ? f(hb(_, S)) : c;
  }, c.copy = function() {
    return $i(c, dh(e3, t, r, n, i, s, a, o, l, u));
  }, c;
}
function Sj() {
  return he.apply(dh(yC, bC, Ve, hh, no, zi, uh, oh, Mr, _b).domain([new Date(2e3, 0, 1), new Date(2e3, 0, 2)]), arguments);
}
function _j() {
  return he.apply(dh(mC, gC, Ye, fh, io, ro, ch, lh, Mr, Ob).domain([Date.UTC(2e3, 0, 1), Date.UTC(2e3, 0, 2)]), arguments);
}
function so() {
  var e3 = 0, t = 1, r, n, i, s, a = Rt, o = false, l;
  function u(h) {
    return h == null || isNaN(h = +h) ? l : a(i === 0 ? 0.5 : (h = (s(h) - r) * i, o ? Math.max(0, Math.min(1, h)) : h));
  }
  u.domain = function(h) {
    return arguments.length ? ([e3, t] = h, r = s(e3 = +e3), n = s(t = +t), i = r === n ? 0 : 1 / (n - r), u) : [e3, t];
  }, u.clamp = function(h) {
    return arguments.length ? (o = !!h, u) : o;
  }, u.interpolator = function(h) {
    return arguments.length ? (a = h, u) : a;
  };
  function c(h) {
    return function(f) {
      var d, v;
      return arguments.length ? ([d, v] = f, a = h(d, v), u) : [a(0), a(1)];
    };
  }
  return u.range = c(In), u.rangeRound = c(Zc), u.unknown = function(h) {
    return arguments.length ? (l = h, u) : l;
  }, function(h) {
    return s = h, r = h(e3), n = h(t), i = r === n ? 0 : 1 / (n - r), u;
  };
}
function vr(e3, t) {
  return t.domain(e3.domain()).interpolator(e3.interpolator()).clamp(e3.clamp()).unknown(e3.unknown());
}
function Mb() {
  var e3 = dr(so()(Rt));
  return e3.copy = function() {
    return vr(e3, Mb());
  }, Xe.apply(e3, arguments);
}
function Eb() {
  var e3 = rh(so()).domain([1, 10]);
  return e3.copy = function() {
    return vr(e3, Eb()).base(e3.base());
  }, Xe.apply(e3, arguments);
}
function Ab() {
  var e3 = nh(so());
  return e3.copy = function() {
    return vr(e3, Ab()).constant(e3.constant());
  }, Xe.apply(e3, arguments);
}
function vh() {
  var e3 = ih(so());
  return e3.copy = function() {
    return vr(e3, vh()).exponent(e3.exponent());
  }, Xe.apply(e3, arguments);
}
function Oj() {
  return vh.apply(null, arguments).exponent(0.5);
}
function Cb() {
  var e3 = [], t = Rt;
  function r(n) {
    if (n != null && !isNaN(n = +n)) return t((Li(e3, n, 1) - 1) / (e3.length - 1));
  }
  return r.domain = function(n) {
    if (!arguments.length) return e3.slice();
    e3 = [];
    for (let i of n) i != null && !isNaN(i = +i) && e3.push(i);
    return e3.sort(lr), r;
  }, r.interpolator = function(n) {
    return arguments.length ? (t = n, r) : t;
  }, r.range = function() {
    return e3.map((n, i) => t(i / (e3.length - 1)));
  }, r.quantiles = function(n) {
    return Array.from({ length: n + 1 }, (i, s) => cA(e3, s / n));
  }, r.copy = function() {
    return Cb(t).domain(e3);
  }, Xe.apply(r, arguments);
}
function ao() {
  var e3 = 0, t = 0.5, r = 1, n = 1, i, s, a, o, l, u = Rt, c, h = false, f;
  function d(p) {
    return isNaN(p = +p) ? f : (p = 0.5 + ((p = +c(p)) - s) * (n * p < n * s ? o : l), u(h ? Math.max(0, Math.min(1, p)) : p));
  }
  d.domain = function(p) {
    return arguments.length ? ([e3, t, r] = p, i = c(e3 = +e3), s = c(t = +t), a = c(r = +r), o = i === s ? 0 : 0.5 / (s - i), l = s === a ? 0 : 0.5 / (a - s), n = s < i ? -1 : 1, d) : [e3, t, r];
  }, d.clamp = function(p) {
    return arguments.length ? (h = !!p, d) : h;
  }, d.interpolator = function(p) {
    return arguments.length ? (u = p, d) : u;
  };
  function v(p) {
    return function(m) {
      var y, b, w;
      return arguments.length ? ([y, b, w] = m, u = RA(p, [y, b, w]), d) : [u(0), u(0.5), u(1)];
    };
  }
  return d.range = v(In), d.rangeRound = v(Zc), d.unknown = function(p) {
    return arguments.length ? (f = p, d) : f;
  }, function(p) {
    return c = p, i = p(e3), s = p(t), a = p(r), o = i === s ? 0 : 0.5 / (s - i), l = s === a ? 0 : 0.5 / (a - s), n = s < i ? -1 : 1, d;
  };
}
function jb() {
  var e3 = dr(ao()(Rt));
  return e3.copy = function() {
    return vr(e3, jb());
  }, Xe.apply(e3, arguments);
}
function kb() {
  var e3 = rh(ao()).domain([0.1, 1, 10]);
  return e3.copy = function() {
    return vr(e3, kb()).base(e3.base());
  }, Xe.apply(e3, arguments);
}
function Ib() {
  var e3 = nh(ao());
  return e3.copy = function() {
    return vr(e3, Ib()).constant(e3.constant());
  }, Xe.apply(e3, arguments);
}
function ph() {
  var e3 = ih(ao());
  return e3.copy = function() {
    return vr(e3, ph()).exponent(e3.exponent());
  }, Xe.apply(e3, arguments);
}
function Mj() {
  return ph.apply(null, arguments).exponent(0.5);
}
const Tb = Object.freeze(Object.defineProperty({ __proto__: null, scaleBand: Gc, scaleDiverging: jb, scaleDivergingLog: kb, scaleDivergingPow: ph, scaleDivergingSqrt: Mj, scaleDivergingSymlog: Ib, scaleIdentity: cb, scaleImplicit: Yu, scaleLinear: ub, scaleLog: fb, scaleOrdinal: Hc, scalePoint: dA, scalePow: sh, scaleQuantile: pb, scaleQuantize: mb, scaleRadial: vb, scaleSequential: Mb, scaleSequentialLog: Eb, scaleSequentialPow: vh, scaleSequentialQuantile: Cb, scaleSequentialSqrt: Oj, scaleSequentialSymlog: Ab, scaleSqrt: aC, scaleSymlog: db, scaleThreshold: gb, scaleTime: Sj, scaleUtc: _j, tickFormat: lb }, Symbol.toStringTag, { value: "Module" }));
function Ej(e3) {
  var t = Tb;
  if (e3 in t && typeof t[e3] == "function") return t[e3]();
  var r = "scale".concat(Ei(e3));
  if (r in t && typeof t[r] == "function") return t[r]();
}
function _p(e3, t, r) {
  if (typeof e3 == "function") return e3.copy().domain(t).range(r);
  if (e3 != null) {
    var n = Ej(e3);
    if (n != null) return n.domain(t).range(r), n;
  }
}
function mh(e3, t, r, n) {
  if (!(r == null || n == null)) return typeof e3.scale == "function" ? _p(e3.scale, r, n) : _p(t, r, n);
}
function Aj(e3) {
  return "scale".concat(Ei(e3));
}
function Cj(e3) {
  return Aj(e3) in Tb;
}
var Nb = (e3, t, r) => {
  if (e3 != null) {
    var { scale: n, type: i } = e3;
    if (n === "auto") return i === "category" && r && (r.indexOf("LineChart") >= 0 || r.indexOf("AreaChart") >= 0 || r.indexOf("ComposedChart") >= 0 && !t) ? "point" : i === "category" ? "band" : "linear";
    if (typeof n == "string") return Cj(n) ? n : "point";
  }
};
function jj(e3, t) {
  for (var r = 0, n = e3.length, i = e3[0] < e3[e3.length - 1]; r < n; ) {
    var s = Math.floor((r + n) / 2);
    (i ? e3[s] < t : e3[s] > t) ? r = s + 1 : n = s;
  }
  return r;
}
function Db(e3, t) {
  if (e3) {
    var r = t ?? e3.domain(), n = r.map((s) => {
      var a;
      return (a = e3(s)) !== null && a !== void 0 ? a : 0;
    }), i = e3.range();
    if (!(r.length === 0 || i.length < 2)) return (s) => {
      var a, o, l = jj(n, s);
      if (l <= 0) return r[0];
      if (l >= r.length) return r[r.length - 1];
      var u = (a = n[l - 1]) !== null && a !== void 0 ? a : 0, c = (o = n[l]) !== null && o !== void 0 ? o : 0;
      return Math.abs(s - u) <= Math.abs(s - c) ? r[l - 1] : r[l];
    };
  }
}
function kj(e3) {
  if (e3 != null) return "invert" in e3 && typeof e3.invert == "function" ? e3.invert.bind(e3) : Db(e3, void 0);
}
function Op(e3, t) {
  var r = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e3);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e3, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function aa(e3) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Op(Object(r), true).forEach(function(n) {
      Ij(e3, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(r)) : Op(Object(r)).forEach(function(n) {
      Object.defineProperty(e3, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e3;
}
function Ij(e3, t, r) {
  return (t = Tj(t)) in e3 ? Object.defineProperty(e3, t, { value: r, enumerable: true, configurable: true, writable: true }) : e3[t] = r, e3;
}
function Tj(e3) {
  var t = Nj(e3, "string");
  return typeof t == "symbol" ? t : t + "";
}
function Nj(e3, t) {
  if (typeof e3 != "object" || !e3) return e3;
  var r = e3[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e3, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e3);
}
var Ju = [0, "auto"], dt = { allowDataOverflow: false, allowDecimals: true, allowDuplicatedCategory: true, angle: 0, dataKey: void 0, domain: void 0, height: 30, hide: true, id: 0, includeHidden: false, interval: "preserveEnd", minTickGap: 5, mirror: false, name: void 0, orientation: "bottom", padding: { left: 0, right: 0 }, reversed: false, scale: "auto", tick: true, tickCount: 5, tickFormatter: void 0, ticks: void 0, type: "category", unit: void 0, niceTicks: "auto" }, Lb = (e3, t) => e3.cartesianAxis.xAxis[t], Je = (e3, t) => {
  var r = Lb(e3, t);
  return r ?? dt;
}, vt = { allowDataOverflow: false, allowDecimals: true, allowDuplicatedCategory: true, angle: 0, dataKey: void 0, domain: Ju, hide: true, id: 0, includeHidden: false, interval: "preserveEnd", minTickGap: 5, mirror: false, name: void 0, orientation: "left", padding: { top: 0, bottom: 0 }, reversed: false, scale: "auto", tick: true, tickCount: 5, tickFormatter: void 0, ticks: void 0, type: "number", unit: void 0, niceTicks: "auto", width: ji }, Rb = (e3, t) => e3.cartesianAxis.yAxis[t], Ze = (e3, t) => {
  var r = Rb(e3, t);
  return r ?? vt;
}, Dj = { domain: [0, "auto"], includeHidden: false, reversed: false, allowDataOverflow: false, allowDuplicatedCategory: false, dataKey: void 0, id: 0, name: "", range: [64, 64], scale: "auto", type: "number", unit: "" }, gh = (e3, t) => {
  var r = e3.cartesianAxis.zAxis[t];
  return r ?? Dj;
}, Ft = (e3, t, r) => {
  switch (t) {
    case "xAxis":
      return Je(e3, r);
    case "yAxis":
      return Ze(e3, r);
    case "zAxis":
      return gh(e3, r);
    case "angleAxis":
      return Fc(e3, r);
    case "radiusAxis":
      return Wc(e3, r);
    default:
      throw new Error("Unexpected axis type: ".concat(t));
  }
}, Lj = (e3, t, r) => {
  switch (t) {
    case "xAxis":
      return Je(e3, r);
    case "yAxis":
      return Ze(e3, r);
    default:
      throw new Error("Unexpected axis type: ".concat(t));
  }
}, Bi = (e3, t, r) => {
  switch (t) {
    case "xAxis":
      return Je(e3, r);
    case "yAxis":
      return Ze(e3, r);
    case "angleAxis":
      return Fc(e3, r);
    case "radiusAxis":
      return Wc(e3, r);
    default:
      throw new Error("Unexpected axis type: ".concat(t));
  }
}, $b = (e3) => e3.graphicalItems.cartesianItems.some((t) => t.type === "bar") || e3.graphicalItems.polarItems.some((t) => t.type === "radialBar");
function zb(e3, t) {
  return (r) => {
    switch (e3) {
      case "xAxis":
        return "xAxisId" in r && r.xAxisId === t;
      case "yAxis":
        return "yAxisId" in r && r.yAxisId === t;
      case "zAxis":
        return "zAxisId" in r && r.zAxisId === t;
      case "angleAxis":
        return "angleAxisId" in r && r.angleAxisId === t;
      case "radiusAxis":
        return "radiusAxisId" in r && r.radiusAxisId === t;
      default:
        return false;
    }
  };
}
var yh = (e3) => e3.graphicalItems.cartesianItems, Rj = O([wt, Za], zb), Bb = (e3, t, r) => e3.filter(r).filter((n) => (t == null ? void 0 : t.includeHidden) === true ? true : !n.hide), Tn = O([yh, Ft, Rj], Bb, { memoizeOptions: { resultEqualityCheck: to } }), Fb = O([Tn], (e3) => e3.filter((t) => t.type === "area" || t.type === "bar").filter(qc)), Wb = (e3) => e3.filter((t) => !("stackId" in t) || t.stackId === void 0), $j = O([Tn], Wb), Kb = (e3) => e3.map((t) => t.data).filter(Boolean).flat(1), zj = O([Tn], (e3) => e3.some((t) => !t.data)), Ub = O([Tn], Kb, { memoizeOptions: { resultEqualityCheck: to } }), qb = (e3, t) => {
  var { chartData: r = [], dataStartIndex: n, dataEndIndex: i } = t;
  return e3.length > 0 ? e3 : r.slice(n, i + 1);
}, bh = O([Ub, Di], qb), Bj = (e3, t, r) => (t == null ? void 0 : t.dataKey) != null ? e3.map((n) => ({ value: ct(n, t.dataKey) })) : r.length > 0 ? r.map((n) => n.dataKey).flatMap((n) => e3.map((i) => ({ value: ct(i, n) }))) : e3.map((n) => ({ value: n })), Vb = (e3, t, r, n, i, s) => {
  var { chartData: a = [], dataStartIndex: o, dataEndIndex: l } = n, u = Bj(e3, t, r);
  if (i && (t == null ? void 0 : t.dataKey) != null && s.length > 0) {
    var c = a.slice(o, l + 1), h = c.map((f) => ({ value: ct(f, t.dataKey) })).filter((f) => f.value != null);
    return [...h, ...u];
  }
  return u;
}, Fi = O([bh, Ft, Tn, Di, zj, Ub], Vb);
function vn(e3) {
  if (je(e3) || e3 instanceof Date) {
    var t = Number(e3);
    if (K(t)) return t;
  }
}
function Mp(e3) {
  if (Array.isArray(e3)) {
    var t = [vn(e3[0]), vn(e3[1])];
    return Ee(t) ? t : void 0;
  }
  var r = vn(e3);
  if (r != null) return [r, r];
}
function Te(e3) {
  return e3.map(vn).filter(qt);
}
function Fj(e3, t) {
  var r = vn(e3), n = vn(t);
  return r == null && n == null ? 0 : r == null ? -1 : n == null ? 1 : r - n;
}
var Wj = O([Fi], (e3) => e3 == null ? void 0 : e3.map((t) => t.value).sort(Fj));
function Yb(e3, t) {
  switch (e3) {
    case "xAxis":
      return t.direction === "x";
    case "yAxis":
      return t.direction === "y";
    default:
      return false;
  }
}
function Kj(e3, t, r) {
  if (!r) return [];
  if (!r.length) return [];
  var n;
  if (typeof t == "number" && !Ce(t)) n = t;
  else if (Array.isArray(t)) {
    var i = Te(t);
    i.length > 0 && (n = Math.max(...i));
  }
  return n == null ? [] : Te(r.flatMap((s) => {
    var a = ct(e3, s.dataKey), o, l;
    if (Array.isArray(a) ? [o, l] = a : o = l = a, !(!K(o) || !K(l))) return [n - o, n + l];
  }));
}
var yt = (e3) => {
  var t = xt(e3), r = kn(e3);
  return Bi(e3, t, r);
}, _n = O([yt], (e3) => e3 == null ? void 0 : e3.dataKey), Uj = O([Fb, Di, yt], Q0), Hb = (e3, t, r, n) => {
  var i = {}, s = t.reduce((a, o) => {
    if (o.stackId == null) return a;
    var l = a[o.stackId];
    return l == null && (l = []), l.push(o), a[o.stackId] = l, a;
  }, i);
  return Object.fromEntries(Object.entries(s).map((a) => {
    var [o, l] = a, u = n ? [...l].reverse() : l, c = u.map(Uc);
    return [o, { stackedData: W_(e3, c, r), graphicalItems: u }];
  }));
}, Gb = O([Uj, Fb, Ha, V0], Hb), Xb = (e3, t, r, n) => {
  var { dataStartIndex: i, dataEndIndex: s } = t;
  if (n == null && r !== "zAxis") {
    var a = V_(e3, i, s);
    if (!(a != null && a[0] === 0 && a[1] === 0)) return a;
  }
}, qj = O([Ft], (e3) => e3.allowDataOverflow), wh = (e3) => {
  var t;
  if (e3 == null || !("domain" in e3)) return Ju;
  if (e3.domain != null) return e3.domain;
  if ("ticks" in e3 && e3.ticks != null) {
    if (e3.type === "number") {
      var r = Te(e3.ticks);
      return [Math.min(...r), Math.max(...r)];
    }
    if (e3.type === "category") return e3.ticks.map(String);
  }
  return (t = e3 == null ? void 0 : e3.domain) !== null && t !== void 0 ? t : Ju;
}, Jb = O([Ft], wh), Zb = O([Jb, qj], D0), Vj = O([Gb, be, wt, Zb], Xb, { memoizeOptions: { resultEqualityCheck: Qa } }), xh = (e3) => e3.errorBars, Yj = (e3, t, r) => e3.flatMap((n) => t[n.id]).filter(Boolean).filter((n) => Yb(r, n)), oa = function() {
  for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++) r[n] = arguments[n];
  var i = r.filter(Boolean);
  if (i.length !== 0) {
    var s = i.flat(), a = Math.min(...s), o = Math.max(...s);
    return [a, o];
  }
}, Qb = function(t, r, n, i, s) {
  var a = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : [], o, l;
  if (n.length > 0 && n.forEach((u) => {
    var c, h = u.data != null ? [...u.data] : a, f = (c = i[u.id]) === null || c === void 0 ? void 0 : c.filter((d) => Yb(s, d));
    h.forEach((d) => {
      var v, p = ct(d, (v = r.dataKey) !== null && v !== void 0 ? v : u.dataKey), m = Kj(d, p, f);
      if (m.length >= 2) {
        var y = Math.min(...m), b = Math.max(...m);
        (o == null || y < o) && (o = y), (l == null || b > l) && (l = b);
      }
      var w = Mp(p);
      w != null && (o = o == null ? w[0] : Math.min(o, w[0]), l = l == null ? w[1] : Math.max(l, w[1]));
    });
  }), (r == null ? void 0 : r.dataKey) != null && n.length === 0 && t.forEach((u) => {
    var c = Mp(ct(u, r.dataKey));
    c != null && (o = o == null ? c[0] : Math.min(o, c[0]), l = l == null ? c[1] : Math.max(l, c[1]));
  }), K(o) && K(l)) return [o, l];
}, Hj = O([bh, Ft, $j, xh, wt, LE], Qb, { memoizeOptions: { resultEqualityCheck: Qa } });
function Gj(e3) {
  var { value: t } = e3;
  if (je(t) || t instanceof Date) return t;
}
var Xj = (e3, t, r) => {
  var n = e3.map(Gj).filter((i) => i != null);
  return r && (t.dataKey == null || t.allowDuplicatedCategory && hy(n)) ? N0(0, e3.length) : t.allowDuplicatedCategory ? n : Array.from(new Set(n));
}, tw = (e3) => e3.referenceElements.dots, Nn = (e3, t, r) => e3.filter((n) => n.ifOverflow === "extendDomain").filter((n) => t === "xAxis" ? n.xAxisId === r : n.yAxisId === r), Jj = O([tw, wt, Za], Nn), ew = (e3) => e3.referenceElements.areas, Zj = O([ew, wt, Za], Nn), rw = (e3) => e3.referenceElements.lines, Qj = O([rw, wt, Za], Nn), nw = (e3, t) => {
  if (e3 != null) {
    var r = Te(e3.map((n) => t === "xAxis" ? n.x : n.y));
    if (r.length !== 0) return [Math.min(...r), Math.max(...r)];
  }
}, tk = O(Jj, wt, nw), iw = (e3, t) => {
  if (e3 != null) {
    var r = Te(e3.flatMap((n) => [t === "xAxis" ? n.x1 : n.y1, t === "xAxis" ? n.x2 : n.y2]));
    if (r.length !== 0) return [Math.min(...r), Math.max(...r)];
  }
}, ek = O([Zj, wt], iw);
function rk(e3) {
  var t;
  if (e3.x != null) return Te([e3.x]);
  var r = (t = e3.segment) === null || t === void 0 ? void 0 : t.map((n) => n.x);
  return r == null || r.length === 0 ? [] : Te(r);
}
function nk(e3) {
  var t;
  if (e3.y != null) return Te([e3.y]);
  var r = (t = e3.segment) === null || t === void 0 ? void 0 : t.map((n) => n.y);
  return r == null || r.length === 0 ? [] : Te(r);
}
var sw = (e3, t) => {
  if (e3 != null) {
    var r = e3.flatMap((n) => t === "xAxis" ? rk(n) : nk(n));
    if (r.length !== 0) return [Math.min(...r), Math.max(...r)];
  }
}, ik = O([Qj, wt], sw), sk = O(tk, ik, ek, (e3, t, r) => oa(e3, r, t)), aw = (e3, t, r, n, i, s, a, o) => {
  if (r != null) return r;
  var l = a === "vertical" && o === "xAxis" || a === "horizontal" && o === "yAxis", u = l ? oa(n, s, i) : oa(s, i);
  return $E(t, u, e3.allowDataOverflow);
}, ak = O([Ft, Jb, Zb, Vj, Hj, sk, et, wt], aw, { memoizeOptions: { resultEqualityCheck: Qa } }), ok = [0, 1], ow = (e3, t, r, n, i, s, a) => {
  if (!((e3 == null || r == null || r.length === 0) && a === void 0)) {
    var { dataKey: o, type: l } = e3, u = ye(t, s);
    if (u && o == null) {
      var c;
      return N0(0, (c = r == null ? void 0 : r.length) !== null && c !== void 0 ? c : 0);
    }
    return l === "category" ? Xj(n, e3, u) : i === "expand" && !u ? ok : a;
  }
}, Ph = O([Ft, et, bh, Fi, Ha, wt, ak], ow), Dn = O([Ft, $b, $c], Nb), lw = (e3, t, r) => {
  var { niceTicks: n } = t;
  if (n !== "none") {
    var i = wh(t), s = Array.isArray(i) && (i[0] === "auto" || i[1] === "auto");
    if ((n === "snap125" || n === "adaptive") && t != null && t.tickCount && Ee(e3)) {
      if (s) return Lv(e3, t.tickCount, t.allowDecimals, n);
      if (t.type === "number") return Rv(e3, t.tickCount, t.allowDecimals, n);
    }
    if (n === "auto" && r === "linear" && t != null && t.tickCount) {
      if (s && Ee(e3)) return Lv(e3, t.tickCount, t.allowDecimals, "adaptive");
      if (t.type === "number" && Ee(e3)) return Rv(e3, t.tickCount, t.allowDecimals, "adaptive");
    }
  }
}, Sh = O([Ph, Bi, Dn], lw), uw = (e3, t, r, n) => {
  if (n !== "angleAxis" && (e3 == null ? void 0 : e3.type) === "number" && Ee(t) && Array.isArray(r) && r.length > 0) {
    var i, s, a = t[0], o = (i = r[0]) !== null && i !== void 0 ? i : 0, l = t[1], u = (s = r[r.length - 1]) !== null && s !== void 0 ? s : 0;
    return [Math.min(a, o), Math.max(l, u)];
  }
  return t;
}, lk = O([Ft, Ph, Sh, wt], uw), uk = O(Fi, Ft, (e3, t) => {
  if (!(!t || t.type !== "number")) {
    var r = 1 / 0, n = Array.from(Te(e3.map((h) => h.value))).sort((h, f) => h - f), i = n[0], s = n[n.length - 1];
    if (i == null || s == null) return 1 / 0;
    var a = s - i;
    if (a === 0) return 1 / 0;
    for (var o = 0; o < n.length - 1; o++) {
      var l = n[o], u = n[o + 1];
      if (!(l == null || u == null)) {
        var c = u - l;
        r = Math.min(r, c);
      }
    }
    return r / a;
  }
}), cw = O(uk, et, KE, At, (e3, t, r, n, i) => i, (e3, t, r, n, i) => {
  if (!K(e3)) return 0;
  var s = t === "vertical" ? n.height : n.width;
  if (i === "gap") return e3 * s / 2;
  if (i === "no-gap") {
    var a = cr(r, e3 * s), o = e3 * s / 2;
    return o - a - (o - a) / s * a;
  }
  return 0;
}), ck = (e3, t, r) => {
  var n = Je(e3, t);
  return n == null || typeof n.padding != "string" ? 0 : cw(e3, "xAxis", t, r, n.padding);
}, hk = (e3, t, r) => {
  var n = Ze(e3, t);
  return n == null || typeof n.padding != "string" ? 0 : cw(e3, "yAxis", t, r, n.padding);
}, fk = O(Je, ck, (e3, t) => {
  var r, n;
  if (e3 == null) return { left: 0, right: 0 };
  var { padding: i } = e3;
  return typeof i == "string" ? { left: t, right: t } : { left: ((r = i.left) !== null && r !== void 0 ? r : 0) + t, right: ((n = i.right) !== null && n !== void 0 ? n : 0) + t };
}), dk = O(Ze, hk, (e3, t) => {
  var r, n;
  if (e3 == null) return { top: 0, bottom: 0 };
  var { padding: i } = e3;
  return typeof i == "string" ? { top: t, bottom: t } : { top: ((r = i.top) !== null && r !== void 0 ? r : 0) + t, bottom: ((n = i.bottom) !== null && n !== void 0 ? n : 0) + t };
}), vk = O([At, fk, Fa, Ba, (e3, t, r) => r], (e3, t, r, n, i) => {
  var { padding: s } = n;
  return i ? [s.left, r.width - s.right] : [e3.left + t.left, e3.left + e3.width - t.right];
}), pk = O([At, et, dk, Fa, Ba, (e3, t, r) => r], (e3, t, r, n, i, s) => {
  var { padding: a } = i;
  return s ? [n.height - a.bottom, a.top] : t === "horizontal" ? [e3.top + e3.height - r.bottom, e3.top + r.top] : [e3.top + r.top, e3.top + e3.height - r.bottom];
}), Wi = (e3, t, r, n) => {
  var i;
  switch (t) {
    case "xAxis":
      return vk(e3, r, n);
    case "yAxis":
      return pk(e3, r, n);
    case "zAxis":
      return (i = gh(e3, r)) === null || i === void 0 ? void 0 : i.range;
    case "angleAxis":
      return X0(e3);
    case "radiusAxis":
      return J0(e3, r);
    default:
      return;
  }
}, hw = O([Ft, Wi], Ga), mk = O([Dn, lk], ZE), _h = O([Ft, Dn, mk, hw], mh), fw = (e3, t, r, n) => {
  if (!(r == null || r.dataKey == null)) {
    var { type: i, scale: s } = r, a = ye(e3, n);
    if (a && (i === "number" || s !== "auto")) return t.map((o) => o.value);
  }
}, Oh = O([et, Fi, Bi, wt], fw), oo = O([_h], Vc);
O([_h], kj);
O([_h, Wj], Db);
O([Tn, xh, wt], Yj);
function dw(e3, t) {
  return e3.id < t.id ? -1 : e3.id > t.id ? 1 : 0;
}
var lo = (e3, t) => t, uo = (e3, t, r) => r, gk = O($a, lo, uo, (e3, t, r) => e3.filter((n) => n.orientation === t).filter((n) => n.mirror === r).sort(dw)), yk = O(za, lo, uo, (e3, t, r) => e3.filter((n) => n.orientation === t).filter((n) => n.mirror === r).sort(dw)), vw = (e3, t) => ({ width: e3.width, height: t.height }), bk = (e3, t) => {
  var r = typeof t.width == "number" ? t.width : ji;
  return { width: r, height: e3.height };
}, wk = O(At, Je, vw), xk = (e3, t, r) => {
  switch (t) {
    case "top":
      return e3.top;
    case "bottom":
      return r - e3.bottom;
    default:
      return 0;
  }
}, Pk = (e3, t, r) => {
  switch (t) {
    case "left":
      return e3.left;
    case "right":
      return r - e3.right;
    default:
      return 0;
  }
}, Sk = O(Ge, At, gk, lo, uo, (e3, t, r, n, i) => {
  var s = {}, a;
  return r.forEach((o) => {
    var l = vw(t, o);
    a == null && (a = xk(t, n, e3));
    var u = n === "top" && !i || n === "bottom" && i;
    s[o.id] = a - Number(u) * l.height, a += (u ? -1 : 1) * l.height;
  }), s;
}), _k = O(He, At, yk, lo, uo, (e3, t, r, n, i) => {
  var s = {}, a;
  return r.forEach((o) => {
    var l = bk(t, o);
    a == null && (a = Pk(t, n, e3));
    var u = n === "left" && !i || n === "right" && i;
    s[o.id] = a - Number(u) * l.width, a += (u ? -1 : 1) * l.width;
  }), s;
}), Ok = (e3, t) => {
  var r = Je(e3, t);
  if (r != null) return Sk(e3, r.orientation, r.mirror);
}, Mk = O([At, Je, Ok, (e3, t) => t], (e3, t, r, n) => {
  if (t != null) {
    var i = r == null ? void 0 : r[n];
    return i == null ? { x: e3.left, y: 0 } : { x: e3.left, y: i };
  }
}), Ek = (e3, t) => {
  var r = Ze(e3, t);
  if (r != null) return _k(e3, r.orientation, r.mirror);
}, Ak = O([At, Ze, Ek, (e3, t) => t], (e3, t, r, n) => {
  if (t != null) {
    var i = r == null ? void 0 : r[n];
    return i == null ? { x: 0, y: e3.top } : { x: i, y: e3.top };
  }
}), Ck = O(At, Ze, (e3, t) => {
  var r = typeof t.width == "number" ? t.width : ji;
  return { width: r, height: e3.height };
}), pw = (e3, t, r, n) => {
  if (r != null) {
    var { allowDuplicatedCategory: i, type: s, dataKey: a } = r, o = ye(e3, n), l = t.map((c) => c.value), u = l.filter((c) => c != null);
    if (a && o && s === "category" && i && hy(u)) return l;
  }
}, Mh = O([et, Fi, Ft, wt], pw), Ep = O([et, Lj, Dn, oo, Mh, Oh, Wi, Sh, wt], (e3, t, r, n, i, s, a, o, l) => {
  if (t != null) {
    var u = ye(e3, l);
    return { angle: t.angle, interval: t.interval, minTickGap: t.minTickGap, orientation: t.orientation, tick: t.tick, tickCount: t.tickCount, tickFormatter: t.tickFormatter, ticks: t.ticks, type: t.type, unit: t.unit, axisType: l, categoricalDomain: s, duplicateDomain: i, isCategorical: u, niceTicks: o, range: a, realScaleType: r, scale: n };
  }
}), jk = (e3, t, r, n, i, s, a, o, l) => {
  if (!(t == null || n == null)) {
    var u = ye(e3, l), { type: c, ticks: h, tickCount: f } = t, d = r === "scaleBand" && typeof n.bandwidth == "function" ? n.bandwidth() / 2 : 2, v = c === "category" && n.bandwidth ? n.bandwidth() / d : 0;
    v = l === "angleAxis" && s != null && s.length >= 2 ? ae(s[0] - s[1]) * 2 * v : v;
    var p = h || i;
    return p ? p.map((m, y) => {
      var b = a ? a.indexOf(m) : m, w = n.map(b);
      return K(w) ? { index: y, coordinate: w + v, value: m, offset: v } : null;
    }).filter(qt) : u && o ? o.map((m, y) => {
      var b = n.map(m);
      return K(b) ? { coordinate: b + v, value: m, index: y, offset: v } : null;
    }).filter(qt) : n.ticks ? n.ticks(f).map((m, y) => {
      var b = n.map(m);
      return K(b) ? { coordinate: b + v, value: m, index: y, offset: v } : null;
    }).filter(qt) : n.domain().map((m, y) => {
      var b = n.map(m);
      return K(b) ? { coordinate: b + v, value: a ? a[m] : m, index: y, offset: v } : null;
    }).filter(qt);
  }
}, mw = O([et, Bi, Dn, oo, Sh, Wi, Mh, Oh, wt], jk), kk = (e3, t, r, n, i, s, a) => {
  if (!(t == null || r == null || n == null || n[0] === n[1])) {
    var o = ye(e3, a), { tickCount: l } = t, u = 0;
    return u = a === "angleAxis" && (n == null ? void 0 : n.length) >= 2 ? ae(n[0] - n[1]) * 2 * u : u, o && s ? s.map((c, h) => {
      var f = r.map(c);
      return K(f) ? { coordinate: f + u, value: c, index: h, offset: u } : null;
    }).filter(qt) : r.ticks ? r.ticks(l).map((c, h) => {
      var f = r.map(c);
      return K(f) ? { coordinate: f + u, value: c, index: h, offset: u } : null;
    }).filter(qt) : r.domain().map((c, h) => {
      var f = r.map(c);
      return K(f) ? { coordinate: f + u, value: i ? i[c] : c, index: h, offset: u } : null;
    }).filter(qt);
  }
}, co = O([et, Bi, oo, Wi, Mh, Oh, wt], kk), ho = O(Ft, oo, (e3, t) => {
  if (!(e3 == null || t == null)) return aa(aa({}, e3), {}, { scale: t });
}), Ik = O([Ft, Dn, Ph, hw], mh), Tk = O([Ik], Vc);
O((e3, t, r) => gh(e3, r), Tk, (e3, t) => {
  if (!(e3 == null || t == null)) return aa(aa({}, e3), {}, { scale: t });
});
var Nk = O([et, $a, za], (e3, t, r) => {
  switch (e3) {
    case "horizontal":
      return t.some((n) => n.reversed) ? "right-to-left" : "left-to-right";
    case "vertical":
      return r.some((n) => n.reversed) ? "bottom-to-top" : "top-to-bottom";
    case "centric":
    case "radial":
      return "left-to-right";
    default:
      return;
  }
}), Dk = (e3, t, r) => {
  var n;
  return (n = e3.renderedTicks[t]) === null || n === void 0 ? void 0 : n[r];
};
O([Dk], (e3) => {
  if (!(!e3 || e3.length === 0)) return (t) => {
    var r, n = 1 / 0, i = e3[0];
    for (var s of e3) {
      var a = Math.abs(s.coordinate - t);
      a < n && (n = a, i = s);
    }
    return (r = i) === null || r === void 0 ? void 0 : r.value;
  };
});
var gw = (e3) => e3.options.defaultTooltipEventType, yw = (e3) => e3.options.validateTooltipEventTypes;
function bw(e3, t, r) {
  if (e3 == null) return t;
  var n = e3 ? "axis" : "item";
  return r == null ? t : r.includes(n) ? n : t;
}
function Ki(e3, t) {
  var r = gw(e3), n = yw(e3);
  return bw(t, r, n);
}
function Lk(e3) {
  return z((t) => Ki(t, e3));
}
var ww = (e3, t) => {
  var r, n = Number(t);
  if (!(Ce(n) || t == null)) return n >= 0 ? e3 == null || (r = e3[n]) === null || r === void 0 ? void 0 : r.value : void 0;
}, Rk = (e3) => e3.tooltip.settings, sr = { active: false, index: null, dataKey: void 0, graphicalItemId: void 0, coordinate: void 0 }, $k = { itemInteraction: { click: sr, hover: sr }, axisInteraction: { click: sr, hover: sr }, keyboardInteraction: sr, syncInteraction: { active: false, index: null, dataKey: void 0, label: void 0, coordinate: void 0, sourceViewBox: void 0, graphicalItemId: void 0 }, tooltipItemPayloads: [], settings: { shared: void 0, trigger: "hover", axisId: 0, active: false, defaultIndex: void 0 } }, xw = Nt({ name: "tooltip", initialState: $k, reducers: { addTooltipEntrySettings: { reducer(e3, t) {
  e3.tooltipItemPayloads.push(t.payload);
}, prepare: rt() }, replaceTooltipEntrySettings: { reducer(e3, t) {
  var { prev: r, next: n } = t.payload, i = oe(e3).tooltipItemPayloads.indexOf(r);
  i > -1 && (e3.tooltipItemPayloads[i] = n);
}, prepare: rt() }, removeTooltipEntrySettings: { reducer(e3, t) {
  var r = oe(e3).tooltipItemPayloads.indexOf(t.payload);
  r > -1 && e3.tooltipItemPayloads.splice(r, 1);
}, prepare: rt() }, setTooltipSettingsState(e3, t) {
  e3.settings = t.payload;
}, setActiveMouseOverItemIndex(e3, t) {
  e3.syncInteraction.active = false, e3.syncInteraction.sourceViewBox = void 0, e3.keyboardInteraction.active = false, e3.itemInteraction.hover.active = true, e3.itemInteraction.hover.index = t.payload.activeIndex, e3.itemInteraction.hover.dataKey = t.payload.activeDataKey, e3.itemInteraction.hover.graphicalItemId = t.payload.activeGraphicalItemId, e3.itemInteraction.hover.coordinate = t.payload.activeCoordinate;
}, mouseLeaveChart(e3) {
  e3.itemInteraction.hover.active = false, e3.axisInteraction.hover.active = false;
}, mouseLeaveItem(e3) {
  e3.itemInteraction.hover.active = false;
}, setActiveClickItemIndex(e3, t) {
  e3.syncInteraction.active = false, e3.syncInteraction.sourceViewBox = void 0, e3.itemInteraction.click.active = true, e3.keyboardInteraction.active = false, e3.itemInteraction.click.index = t.payload.activeIndex, e3.itemInteraction.click.dataKey = t.payload.activeDataKey, e3.itemInteraction.click.graphicalItemId = t.payload.activeGraphicalItemId, e3.itemInteraction.click.coordinate = t.payload.activeCoordinate;
}, setMouseOverAxisIndex(e3, t) {
  e3.syncInteraction.active = false, e3.syncInteraction.sourceViewBox = void 0, e3.axisInteraction.hover.active = true, e3.keyboardInteraction.active = false, e3.axisInteraction.hover.index = t.payload.activeIndex, e3.axisInteraction.hover.dataKey = t.payload.activeDataKey, e3.axisInteraction.hover.coordinate = t.payload.activeCoordinate;
}, setMouseClickAxisIndex(e3, t) {
  e3.syncInteraction.active = false, e3.syncInteraction.sourceViewBox = void 0, e3.keyboardInteraction.active = false, e3.axisInteraction.click.active = true, e3.axisInteraction.click.index = t.payload.activeIndex, e3.axisInteraction.click.dataKey = t.payload.activeDataKey, e3.axisInteraction.click.coordinate = t.payload.activeCoordinate;
}, setSyncInteraction(e3, t) {
  e3.syncInteraction = t.payload;
}, setKeyboardInteraction(e3, t) {
  e3.keyboardInteraction.active = t.payload.active, e3.keyboardInteraction.index = t.payload.activeIndex, e3.keyboardInteraction.coordinate = t.payload.activeCoordinate;
} } }), { addTooltipEntrySettings: zk, replaceTooltipEntrySettings: Bk, removeTooltipEntrySettings: Fk, setTooltipSettingsState: Wk, setActiveMouseOverItemIndex: Kk, mouseLeaveItem: bF, mouseLeaveChart: Pw, setActiveClickItemIndex: wF, setMouseOverAxisIndex: Sw, setMouseClickAxisIndex: Uk, setSyncInteraction: Zn, setKeyboardInteraction: la } = xw.actions, qk = xw.reducer;
function Ap(e3, t) {
  var r = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e3);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e3, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function is(e3) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Ap(Object(r), true).forEach(function(n) {
      Vk(e3, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(r)) : Ap(Object(r)).forEach(function(n) {
      Object.defineProperty(e3, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e3;
}
function Vk(e3, t, r) {
  return (t = Yk(t)) in e3 ? Object.defineProperty(e3, t, { value: r, enumerable: true, configurable: true, writable: true }) : e3[t] = r, e3;
}
function Yk(e3) {
  var t = Hk(e3, "string");
  return typeof t == "symbol" ? t : t + "";
}
function Hk(e3, t) {
  if (typeof e3 != "object" || !e3) return e3;
  var r = e3[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e3, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e3);
}
function Gk(e3, t, r) {
  return t === "axis" ? r === "click" ? e3.axisInteraction.click : e3.axisInteraction.hover : r === "click" ? e3.itemInteraction.click : e3.itemInteraction.hover;
}
function Xk(e3) {
  return e3.index != null;
}
var _w = (e3, t, r, n) => {
  if (t == null) return sr;
  var i = Gk(e3, t, r);
  if (i == null) return sr;
  if (i.active) return i;
  if (e3.keyboardInteraction.active) return e3.keyboardInteraction;
  if (e3.syncInteraction.active && e3.syncInteraction.index != null) return e3.syncInteraction;
  var s = e3.settings.active === true;
  if (Xk(i)) {
    if (s) return is(is({}, i), {}, { active: true });
  } else if (n != null) return { active: true, coordinate: void 0, dataKey: void 0, index: n, graphicalItemId: void 0 };
  return is(is({}, sr), {}, { coordinate: i.coordinate });
};
function Jk(e3) {
  if (typeof e3 == "number") return Number.isFinite(e3) ? e3 : void 0;
  if (e3 instanceof Date) {
    var t = e3.valueOf();
    return Number.isFinite(t) ? t : void 0;
  }
  var r = Number(e3);
  return Number.isFinite(r) ? r : void 0;
}
function Zk(e3, t) {
  var r = Jk(e3), n = t[0], i = t[1];
  if (r === void 0) return false;
  var s = Math.min(n, i), a = Math.max(n, i);
  return r >= s && r <= a;
}
function Qk(e3, t, r) {
  if (r == null || t == null) return true;
  var n = ct(e3, t);
  return n == null || !Ee(r) ? true : Zk(n, r);
}
var ei = (e3, t, r, n) => {
  var i = e3 == null ? void 0 : e3.index;
  if (i == null) return null;
  var s = Number(i);
  if (!K(s)) return i;
  var a = 0, o = 1 / 0;
  t.length > 0 && (o = t.length - 1);
  var l = Math.max(a, Math.min(s, o)), u = t[l];
  return u == null || Qk(u, r, n) ? String(l) : null;
}, Ow = (e3, t, r, n, i, s, a) => {
  if (s != null) {
    var o = a[0], l = o == null ? void 0 : o.getPosition(s);
    if (l != null) return l;
    var u = i == null ? void 0 : i[Number(s)];
    if (u) switch (r) {
      case "horizontal":
        return { x: u.coordinate, y: (n.top + t) / 2 };
      default:
        return { x: (n.left + e3) / 2, y: u.coordinate };
    }
  }
}, Mw = (e3, t, r, n) => {
  if (t === "axis") return e3.tooltipItemPayloads;
  if (e3.tooltipItemPayloads.length === 0) return [];
  var i;
  if (r === "hover" ? i = e3.itemInteraction.hover.graphicalItemId : i = e3.itemInteraction.click.graphicalItemId, e3.syncInteraction.active && i == null) return e3.tooltipItemPayloads;
  if (i == null && (n != null || e3.keyboardInteraction.active)) {
    var s = e3.tooltipItemPayloads[0];
    return s != null ? [s] : [];
  }
  return e3.tooltipItemPayloads.filter((a) => {
    var o;
    return ((o = a.settings) === null || o === void 0 ? void 0 : o.graphicalItemId) === i;
  });
}, Ew = (e3) => e3.options.tooltipPayloadSearcher, Ln = (e3) => e3.tooltip;
function Cp(e3, t) {
  var r = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e3);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e3, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function jp(e3) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Cp(Object(r), true).forEach(function(n) {
      tI(e3, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(r)) : Cp(Object(r)).forEach(function(n) {
      Object.defineProperty(e3, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e3;
}
function tI(e3, t, r) {
  return (t = eI(t)) in e3 ? Object.defineProperty(e3, t, { value: r, enumerable: true, configurable: true, writable: true }) : e3[t] = r, e3;
}
function eI(e3) {
  var t = rI(e3, "string");
  return typeof t == "symbol" ? t : t + "";
}
function rI(e3, t) {
  if (typeof e3 != "object" || !e3) return e3;
  var r = e3[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e3, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e3);
}
function nI(e3) {
  if (typeof e3 == "string" || typeof e3 == "number") return e3;
}
function iI(e3) {
  if (typeof e3 == "string" || typeof e3 == "number" || typeof e3 == "boolean") return e3;
}
function sI(e3) {
  if (typeof e3 == "string" || typeof e3 == "number") return e3;
  if (typeof e3 == "function") return (t) => e3(t);
}
function kp(e3) {
  if (typeof e3 == "string") return e3;
}
function aI(e3) {
  if (!(e3 == null || typeof e3 != "object")) {
    var t = "name" in e3 ? nI(e3.name) : void 0, r = "unit" in e3 ? iI(e3.unit) : void 0, n = "dataKey" in e3 ? sI(e3.dataKey) : void 0, i = "payload" in e3 ? e3.payload : void 0, s = "color" in e3 ? kp(e3.color) : void 0, a = "fill" in e3 ? kp(e3.fill) : void 0;
    return { name: t, unit: r, dataKey: n, payload: i, color: s, fill: a };
  }
}
function oI(e3, t) {
  return e3 ?? t;
}
var Aw = (e3, t, r, n, i, s, a) => {
  if (!(t == null || s == null)) {
    var { chartData: o, computedData: l, dataStartIndex: u, dataEndIndex: c } = r, h = [];
    return e3.reduce((f, d) => {
      var v, { dataDefinedOnItem: p, settings: m } = d, y = oI(p, o), b = Array.isArray(y) ? s0(y, u, c) : y, w = (v = m == null ? void 0 : m.dataKey) !== null && v !== void 0 ? v : n, x = m == null ? void 0 : m.nameKey, P;
      if (n && Array.isArray(b) && !Array.isArray(b[0]) && a === "axis" ? P = fy(b, n, i) : P = s(b, t, l, x), Array.isArray(P)) P.forEach((_) => {
        var M, A, j = aI(_), k = j == null ? void 0 : j.name, E = j == null ? void 0 : j.dataKey, $ = j == null ? void 0 : j.payload, R = jp(jp({}, m), {}, { name: k, unit: j == null ? void 0 : j.unit, color: (M = j == null ? void 0 : j.color) !== null && M !== void 0 ? M : m == null ? void 0 : m.color, fill: (A = j == null ? void 0 : j.fill) !== null && A !== void 0 ? A : m == null ? void 0 : m.fill });
        f.push(Md({ tooltipEntrySettings: R, dataKey: E, payload: $, value: ct($, E), name: k == null ? void 0 : String(k) }));
      });
      else {
        var S;
        f.push(Md({ tooltipEntrySettings: m, dataKey: w, payload: P, value: ct(P, w), name: (S = ct(P, x)) !== null && S !== void 0 ? S : m == null ? void 0 : m.name }));
      }
      return f;
    }, h);
  }
}, Eh = O([yt, $b, $c], Nb), lI = O([(e3) => e3.graphicalItems.cartesianItems, (e3) => e3.graphicalItems.polarItems], (e3, t) => [...e3, ...t]), uI = O([xt, kn], zb), Gr = O([lI, yt, uI], Bb, { memoizeOptions: { resultEqualityCheck: to } }), cI = O([Gr], (e3) => e3.filter(qc)), Cw = O([Gr], Kb, { memoizeOptions: { resultEqualityCheck: to } }), hI = O([Gr], (e3) => e3.some((t) => !t.data)), zr = O([Cw, be], qb), fI = O([cI, be, yt], Q0), Ah = O([zr, yt, Gr, be, hI, Cw], Vb), jw = O([yt], wh), dI = O([yt], (e3) => e3.allowDataOverflow), kw = O([jw, dI], D0), vI = O([Gr], (e3) => e3.filter(qc)), pI = O([fI, vI, Ha, V0], Hb), mI = O([pI, be, xt, kw], Xb), gI = O([Gr], Wb), yI = O([zr, yt, gI, xh, xt, RE], Qb, { memoizeOptions: { resultEqualityCheck: Qa } }), bI = O([tw, xt, kn], Nn), wI = O([bI, xt], nw), xI = O([ew, xt, kn], Nn), PI = O([xI, xt], iw), SI = O([rw, xt, kn], Nn), _I = O([SI, xt], sw), OI = O([wI, _I, PI], oa), MI = O([yt, jw, kw, mI, yI, OI, et, xt], aw), On = O([yt, et, zr, Ah, Ha, xt, MI], ow), EI = O([On, yt, Eh], lw), AI = O([yt, On, EI, xt], uw), Iw = (e3) => {
  var t = xt(e3), r = kn(e3), n = false;
  return Wi(e3, t, r, n);
}, Tw = O([yt, Iw], Ga), CI = O([yt, Eh, AI, Tw], mh), Nw = O([CI], Vc), jI = O([et, Ah, yt, xt], pw), kI = O([et, Ah, yt, xt], fw), II = (e3, t, r, n, i, s, a, o) => {
  if (t) {
    var { type: l } = t, u = ye(e3, o);
    if (n) {
      var c = r === "scaleBand" && n.bandwidth ? n.bandwidth() / 2 : 2, h = l === "category" && n.bandwidth ? n.bandwidth() / c : 0;
      return h = o === "angleAxis" && i != null && (i == null ? void 0 : i.length) >= 2 ? ae(i[0] - i[1]) * 2 * h : h, u && a ? a.map((f, d) => {
        var v = n.map(f);
        return K(v) ? { coordinate: v + h, value: f, index: d, offset: h } : null;
      }).filter(qt) : n.domain().map((f, d) => {
        var v = n.map(f);
        return K(v) ? { coordinate: v + h, value: s ? s[f] : f, index: d, offset: h } : null;
      }).filter(qt);
    }
  }
}, Qe = O([et, yt, Eh, Nw, Iw, jI, kI, xt], II), Ch = O([gw, yw, Rk], (e3, t, r) => bw(r.shared, e3, t)), Dw = (e3) => e3.tooltip.settings.trigger, jh = (e3) => e3.tooltip.settings.defaultIndex, Ui = O([Ln, Ch, Dw, jh], _w), bi = O([Ui, zr, _n, On], ei), Lw = O([Qe, bi], ww), TI = O([Ui], (e3) => {
  if (e3) return e3.dataKey;
}), NI = O([Ui], (e3) => {
  if (e3) return e3.graphicalItemId;
}), Rw = O([Ln, Ch, Dw, jh], Mw), DI = O([He, Ge, et, At, Qe, jh, Rw], Ow), LI = O([Ui, DI], (e3, t) => e3 != null && e3.coordinate ? e3.coordinate : t), RI = O([Ui], (e3) => {
  var t;
  return (t = e3 == null ? void 0 : e3.active) !== null && t !== void 0 ? t : false;
}), $I = O([Rw, bi, be, _n, Lw, Ew, Ch], Aw), zI = O([$I], (e3) => {
  if (e3 != null) {
    var t = e3.map((r) => r.payload).filter((r) => r != null);
    return Array.from(new Set(t));
  }
});
function Ip(e3, t) {
  var r = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e3);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e3, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Tp(e3) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Ip(Object(r), true).forEach(function(n) {
      BI(e3, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(r)) : Ip(Object(r)).forEach(function(n) {
      Object.defineProperty(e3, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e3;
}
function BI(e3, t, r) {
  return (t = FI(t)) in e3 ? Object.defineProperty(e3, t, { value: r, enumerable: true, configurable: true, writable: true }) : e3[t] = r, e3;
}
function FI(e3) {
  var t = WI(e3, "string");
  return typeof t == "symbol" ? t : t + "";
}
function WI(e3, t) {
  if (typeof e3 != "object" || !e3) return e3;
  var r = e3[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e3, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e3);
}
var KI = () => z(yt), UI = () => {
  var e3 = KI(), t = z(Qe), r = z(Nw);
  return bn(!e3 || !r ? void 0 : Tp(Tp({}, e3), {}, { scale: r }), t);
};
function Np(e3, t) {
  var r = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e3);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e3, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Qr(e3) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Np(Object(r), true).forEach(function(n) {
      qI(e3, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(r)) : Np(Object(r)).forEach(function(n) {
      Object.defineProperty(e3, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e3;
}
function qI(e3, t, r) {
  return (t = VI(t)) in e3 ? Object.defineProperty(e3, t, { value: r, enumerable: true, configurable: true, writable: true }) : e3[t] = r, e3;
}
function VI(e3) {
  var t = YI(e3, "string");
  return typeof t == "symbol" ? t : t + "";
}
function YI(e3, t) {
  if (typeof e3 != "object" || !e3) return e3;
  var r = e3[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e3, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e3);
}
var HI = (e3, t, r, n) => {
  var i = t.find((s) => s && s.index === r);
  if (i) {
    if (e3 === "horizontal") return { x: i.coordinate, y: n.relativeY };
    if (e3 === "vertical") return { x: n.relativeX, y: i.coordinate };
  }
  return { x: 0, y: 0 };
}, GI = (e3, t, r, n) => {
  var i = t.find((u) => u && u.index === r);
  if (i) {
    if (e3 === "centric") {
      var s = i.coordinate, { radius: a } = n;
      return Qr(Qr(Qr({}, n), Et(n.cx, n.cy, a, s)), {}, { angle: s, radius: a });
    }
    var o = i.coordinate, { angle: l } = n;
    return Qr(Qr(Qr({}, n), Et(n.cx, n.cy, o, l)), {}, { angle: l, radius: o });
  }
  return { angle: 0, clockWise: false, cx: 0, cy: 0, endAngle: 0, innerRadius: 0, outerRadius: 0, radius: 0, startAngle: 0, x: 0, y: 0 };
};
function XI(e3, t) {
  var { relativeX: r, relativeY: n } = e3;
  return r >= t.left && r <= t.left + t.width && n >= t.top && n <= t.top + t.height;
}
var $w = (e3, t, r, n, i) => {
  var s, a = (s = t == null ? void 0 : t.length) !== null && s !== void 0 ? s : 0;
  if (a <= 1 || e3 == null) return 0;
  if (n === "angleAxis" && i != null && Math.abs(Math.abs(i[1] - i[0]) - 360) <= 1e-6) for (var o = 0; o < a; o++) {
    var l, u, c, h, f, d = o > 0 ? (l = r[o - 1]) === null || l === void 0 ? void 0 : l.coordinate : (u = r[a - 1]) === null || u === void 0 ? void 0 : u.coordinate, v = (c = r[o]) === null || c === void 0 ? void 0 : c.coordinate, p = o >= a - 1 ? (h = r[0]) === null || h === void 0 ? void 0 : h.coordinate : (f = r[o + 1]) === null || f === void 0 ? void 0 : f.coordinate, m = void 0;
    if (!(d == null || v == null || p == null)) if (ae(v - d) !== ae(p - v)) {
      var y = [];
      if (ae(p - v) === ae(i[1] - i[0])) {
        m = p;
        var b = v + i[1] - i[0];
        y[0] = Math.min(b, (b + d) / 2), y[1] = Math.max(b, (b + d) / 2);
      } else {
        m = d;
        var w = p + i[1] - i[0];
        y[0] = Math.min(v, (w + v) / 2), y[1] = Math.max(v, (w + v) / 2);
      }
      var x = [Math.min(v, (m + v) / 2), Math.max(v, (m + v) / 2)];
      if (e3 > x[0] && e3 <= x[1] || e3 >= y[0] && e3 <= y[1]) {
        var P;
        return (P = r[o]) === null || P === void 0 ? void 0 : P.index;
      }
    } else {
      var S = Math.min(d, p), _ = Math.max(d, p);
      if (e3 > (S + v) / 2 && e3 <= (_ + v) / 2) {
        var M;
        return (M = r[o]) === null || M === void 0 ? void 0 : M.index;
      }
    }
  }
  else if (t) for (var A = 0; A < a; A++) {
    var j = t[A];
    if (j != null) {
      var k = t[A + 1], E = t[A - 1];
      if (A === 0 && k != null && e3 <= (j.coordinate + k.coordinate) / 2 || A === a - 1 && E != null && e3 > (j.coordinate + E.coordinate) / 2 || A > 0 && A < a - 1 && E != null && k != null && e3 > (j.coordinate + E.coordinate) / 2 && e3 <= (j.coordinate + k.coordinate) / 2) return j.index;
    }
  }
  return -1;
}, zw = () => z($c), kh = (e3, t) => t, Bw = (e3, t, r) => r, Ih = (e3, t, r, n) => n, JI = O(Qe, (e3) => Ea(e3, (t) => t.coordinate)), Th = O([Ln, kh, Bw, Ih], _w), Nh = O([Th, zr, _n, On], ei), ZI = (e3, t, r) => {
  if (t != null) {
    var n = Ln(e3);
    return t === "axis" ? r === "hover" ? n.axisInteraction.hover.dataKey : n.axisInteraction.click.dataKey : r === "hover" ? n.itemInteraction.hover.dataKey : n.itemInteraction.click.dataKey;
  }
}, Fw = O([Ln, kh, Bw, Ih], Mw), ua = O([He, Ge, et, At, Qe, Ih, Fw], Ow), QI = O([Th, ua], (e3, t) => {
  var r;
  return (r = e3.coordinate) !== null && r !== void 0 ? r : t;
}), Ww = O([Qe, Nh], ww), tT = O([Fw, Nh, be, _n, Ww, Ew, kh], Aw), eT = O([Th, Nh], (e3, t) => ({ isActive: e3.active && t != null, activeIndex: t })), rT = (e3, t, r, n, i, s, a) => {
  if (!(!e3 || !r || !n || !i) && XI(e3, a)) {
    var o = Y_(e3, t), l = $w(o, s, i, r, n), u = HI(t, i, l, e3);
    return { activeIndex: String(l), activeCoordinate: u };
  }
}, nT = (e3, t, r, n, i, s, a) => {
  if (!(!e3 || !n || !i || !s || !r)) {
    var o = OE(e3, r);
    if (o) {
      var l = H_(o, t), u = $w(l, a, s, n, i), c = GI(t, s, u, o);
      return { activeIndex: String(u), activeCoordinate: c };
    }
  }
}, iT = (e3, t, r, n, i, s, a, o) => {
  if (!(!e3 || !t || !n || !i || !s)) return t === "horizontal" || t === "vertical" ? rT(e3, t, n, i, s, a, o) : nT(e3, t, r, n, i, s, a);
}, sT = O((e3) => e3.zIndex.zIndexMap, (e3, t) => t, (e3, t, r) => r, (e3, t, r) => {
  if (t != null) {
    var n = e3[t];
    if (n != null) return r ? n.panoramaElement : n.element;
  }
}), aT = O((e3) => e3.zIndex.zIndexMap, (e3) => {
  var t = Object.keys(e3).map((n) => parseInt(n, 10)).concat(Object.values(It)), r = Array.from(new Set(t));
  return r.sort((n, i) => n - i);
}, { memoizeOptions: { resultEqualityCheck: JE } });
function Dp(e3, t) {
  var r = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e3);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e3, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Lp(e3) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Dp(Object(r), true).forEach(function(n) {
      oT(e3, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(r)) : Dp(Object(r)).forEach(function(n) {
      Object.defineProperty(e3, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e3;
}
function oT(e3, t, r) {
  return (t = lT(t)) in e3 ? Object.defineProperty(e3, t, { value: r, enumerable: true, configurable: true, writable: true }) : e3[t] = r, e3;
}
function lT(e3) {
  var t = uT(e3, "string");
  return typeof t == "symbol" ? t : t + "";
}
function uT(e3, t) {
  if (typeof e3 != "object" || !e3) return e3;
  var r = e3[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e3, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e3);
}
var cT = {}, hT = { zIndexMap: Object.values(It).reduce((e3, t) => Lp(Lp({}, e3), {}, { [t]: { element: void 0, panoramaElement: void 0, consumers: 0 } }), cT) }, fT = new Set(Object.values(It));
function dT(e3) {
  return fT.has(e3);
}
var Kw = Nt({ name: "zIndex", initialState: hT, reducers: { registerZIndexPortal: { reducer: (e3, t) => {
  var { zIndex: r } = t.payload;
  e3.zIndexMap[r] ? e3.zIndexMap[r].consumers += 1 : e3.zIndexMap[r] = { consumers: 1, element: void 0, panoramaElement: void 0 };
}, prepare: rt() }, unregisterZIndexPortal: { reducer: (e3, t) => {
  var { zIndex: r } = t.payload;
  e3.zIndexMap[r] && (e3.zIndexMap[r].consumers -= 1, e3.zIndexMap[r].consumers <= 0 && !dT(r) && delete e3.zIndexMap[r]);
}, prepare: rt() }, registerZIndexPortalElement: { reducer: (e3, t) => {
  var { zIndex: r, element: n, isPanorama: i } = t.payload;
  e3.zIndexMap[r] ? i ? e3.zIndexMap[r].panoramaElement = n : e3.zIndexMap[r].element = n : e3.zIndexMap[r] = { consumers: 0, element: i ? void 0 : n, panoramaElement: i ? n : void 0 };
}, prepare: rt() }, unregisterZIndexPortalElement: { reducer: (e3, t) => {
  var { zIndex: r } = t.payload;
  e3.zIndexMap[r] && (t.payload.isPanorama ? e3.zIndexMap[r].panoramaElement = void 0 : e3.zIndexMap[r].element = void 0);
}, prepare: rt() } } }), { registerZIndexPortal: vT, unregisterZIndexPortal: Wl, registerZIndexPortalElement: pT, unregisterZIndexPortalElement: mT } = Kw.actions, gT = Kw.reducer;
function Ne(e3) {
  var { zIndex: t, children: r } = e3, n = MO(), i = n && t !== void 0 && t !== 0, s = Dt(), a = g.useRef(void 0), o = g.useRef(/* @__PURE__ */ new Set()), l = ft(), u = z((h) => sT(h, t, s));
  if (g.useLayoutEffect(() => {
    if (!i) {
      var h = o.current;
      h.forEach((d) => {
        l(Wl({ zIndex: d }));
      }), h.clear(), a.current = void 0;
      return;
    }
    if (o.current.has(t) || (l(vT({ zIndex: t })), o.current.add(t)), u) {
      a.current = u;
      var f = o.current;
      f.forEach((d) => {
        d !== t && (l(Wl({ zIndex: d })), f.delete(d));
      });
    }
  }, [l, t, i, u]), g.useLayoutEffect(() => {
    var h = o.current;
    return () => {
      h.forEach((f) => {
        l(Wl({ zIndex: f }));
      }), h.clear();
    };
  }, [l]), !i) return r;
  var c = u ?? a.current;
  return c ? Kg.createPortal(r, c) : null;
}
function Zu() {
  return Zu = Object.assign ? Object.assign.bind() : function(e3) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e3[n] = r[n]);
    }
    return e3;
  }, Zu.apply(null, arguments);
}
function Rp(e3, t) {
  var r = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e3);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e3, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function ss(e3) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Rp(Object(r), true).forEach(function(n) {
      yT(e3, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(r)) : Rp(Object(r)).forEach(function(n) {
      Object.defineProperty(e3, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e3;
}
function yT(e3, t, r) {
  return (t = bT(t)) in e3 ? Object.defineProperty(e3, t, { value: r, enumerable: true, configurable: true, writable: true }) : e3[t] = r, e3;
}
function bT(e3) {
  var t = wT(e3, "string");
  return typeof t == "symbol" ? t : t + "";
}
function wT(e3, t) {
  if (typeof e3 != "object" || !e3) return e3;
  var r = e3[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e3, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e3);
}
function xT(e3) {
  var { cursor: t, cursorComp: r, cursorProps: n } = e3;
  return g.isValidElement(t) ? g.cloneElement(t, n) : g.createElement(r, n);
}
function PT(e3) {
  var t, { coordinate: r, payload: n, index: i, offset: s, tooltipAxisBandSize: a, layout: o, cursor: l, tooltipEventType: u, chartName: c } = e3, h = r, f = n, d = i;
  if (!l || !h || c !== "ScatterChart" && u !== "axis") return null;
  var v, p, m;
  if (c === "ScatterChart") v = h, p = zM, m = It.cursorLine;
  else if (c === "BarChart") v = BM(o, h, s, a), p = j0, m = It.cursorRectangle;
  else if (o === "radial" && py(h)) {
    var { cx: y, cy: b, radius: w, startAngle: x, endAngle: P } = k0(h);
    v = { cx: y, cy: b, startAngle: x, endAngle: P, innerRadius: w, outerRadius: w }, p = T0, m = It.cursorLine;
  } else v = { points: CE(o, h, s) }, p = ti, m = It.cursorLine;
  var S = typeof l == "object" && "className" in l ? l.className : void 0, _ = ss(ss(ss(ss({ stroke: "#ccc", pointerEvents: "none" }, s), v), Pa(l)), {}, { payload: f, payloadIndex: d, className: X("recharts-tooltip-cursor", S) });
  return g.createElement(Ne, { zIndex: (t = e3.zIndex) !== null && t !== void 0 ? t : m }, g.createElement(xT, { cursor: l, cursorComp: p, cursorProps: _ }));
}
function ST(e3) {
  var t = UI(), r = d0(), n = Vr(), i = zw();
  return t == null || r == null || n == null || i == null ? null : g.createElement(PT, Zu({}, e3, { offset: r, layout: n, tooltipAxisBandSize: t, chartName: i }));
}
var Uw = g.createContext(null), _T = () => g.useContext(Uw), Kl = { exports: {} }, $p;
function OT() {
  return $p || ($p = 1, (function(e3) {
    var t = Object.prototype.hasOwnProperty, r = "~";
    function n() {
    }
    Object.create && (n.prototype = /* @__PURE__ */ Object.create(null), new n().__proto__ || (r = false));
    function i(l, u, c) {
      this.fn = l, this.context = u, this.once = c || false;
    }
    function s(l, u, c, h, f) {
      if (typeof c != "function") throw new TypeError("The listener must be a function");
      var d = new i(c, h || l, f), v = r ? r + u : u;
      return l._events[v] ? l._events[v].fn ? l._events[v] = [l._events[v], d] : l._events[v].push(d) : (l._events[v] = d, l._eventsCount++), l;
    }
    function a(l, u) {
      --l._eventsCount === 0 ? l._events = new n() : delete l._events[u];
    }
    function o() {
      this._events = new n(), this._eventsCount = 0;
    }
    o.prototype.eventNames = function() {
      var u = [], c, h;
      if (this._eventsCount === 0) return u;
      for (h in c = this._events) t.call(c, h) && u.push(r ? h.slice(1) : h);
      return Object.getOwnPropertySymbols ? u.concat(Object.getOwnPropertySymbols(c)) : u;
    }, o.prototype.listeners = function(u) {
      var c = r ? r + u : u, h = this._events[c];
      if (!h) return [];
      if (h.fn) return [h.fn];
      for (var f = 0, d = h.length, v = new Array(d); f < d; f++) v[f] = h[f].fn;
      return v;
    }, o.prototype.listenerCount = function(u) {
      var c = r ? r + u : u, h = this._events[c];
      return h ? h.fn ? 1 : h.length : 0;
    }, o.prototype.emit = function(u, c, h, f, d, v) {
      var p = r ? r + u : u;
      if (!this._events[p]) return false;
      var m = this._events[p], y = arguments.length, b, w;
      if (m.fn) {
        switch (m.once && this.removeListener(u, m.fn, void 0, true), y) {
          case 1:
            return m.fn.call(m.context), true;
          case 2:
            return m.fn.call(m.context, c), true;
          case 3:
            return m.fn.call(m.context, c, h), true;
          case 4:
            return m.fn.call(m.context, c, h, f), true;
          case 5:
            return m.fn.call(m.context, c, h, f, d), true;
          case 6:
            return m.fn.call(m.context, c, h, f, d, v), true;
        }
        for (w = 1, b = new Array(y - 1); w < y; w++) b[w - 1] = arguments[w];
        m.fn.apply(m.context, b);
      } else {
        var x = m.length, P;
        for (w = 0; w < x; w++) switch (m[w].once && this.removeListener(u, m[w].fn, void 0, true), y) {
          case 1:
            m[w].fn.call(m[w].context);
            break;
          case 2:
            m[w].fn.call(m[w].context, c);
            break;
          case 3:
            m[w].fn.call(m[w].context, c, h);
            break;
          case 4:
            m[w].fn.call(m[w].context, c, h, f);
            break;
          default:
            if (!b) for (P = 1, b = new Array(y - 1); P < y; P++) b[P - 1] = arguments[P];
            m[w].fn.apply(m[w].context, b);
        }
      }
      return true;
    }, o.prototype.on = function(u, c, h) {
      return s(this, u, c, h, false);
    }, o.prototype.once = function(u, c, h) {
      return s(this, u, c, h, true);
    }, o.prototype.removeListener = function(u, c, h, f) {
      var d = r ? r + u : u;
      if (!this._events[d]) return this;
      if (!c) return a(this, d), this;
      var v = this._events[d];
      if (v.fn) v.fn === c && (!f || v.once) && (!h || v.context === h) && a(this, d);
      else {
        for (var p = 0, m = [], y = v.length; p < y; p++) (v[p].fn !== c || f && !v[p].once || h && v[p].context !== h) && m.push(v[p]);
        m.length ? this._events[d] = m.length === 1 ? m[0] : m : a(this, d);
      }
      return this;
    }, o.prototype.removeAllListeners = function(u) {
      var c;
      return u ? (c = r ? r + u : u, this._events[c] && a(this, c)) : (this._events = new n(), this._eventsCount = 0), this;
    }, o.prototype.off = o.prototype.removeListener, o.prototype.addListener = o.prototype.on, o.prefixed = r, o.EventEmitter = o, e3.exports = o;
  })(Kl)), Kl.exports;
}
var MT = OT();
const ET = fr(MT);
var wi = new ET(), Qu = "recharts.syncEvent.tooltip", zp = "recharts.syncEvent.brush", AT = (e3, t) => {
  if (t && Array.isArray(e3)) {
    var r = Number.parseInt(t, 10);
    if (!Ce(r)) return e3[r];
  }
}, CT = { chartName: "", tooltipPayloadSearcher: () => {
}, eventEmitter: void 0, defaultTooltipEventType: "axis" }, qw = Nt({ name: "options", initialState: CT, reducers: { createEventEmitter: (e3) => {
  e3.eventEmitter == null && (e3.eventEmitter = Symbol("rechartsEventEmitter"));
} } }), jT = qw.reducer, { createEventEmitter: kT } = qw.actions;
function IT(e3) {
  return e3.tooltip.syncInteraction;
}
var TT = { chartData: void 0, computedData: void 0, dataStartIndex: 0, dataEndIndex: 0 }, Vw = Nt({ name: "chartData", initialState: TT, reducers: { setChartData(e3, t) {
  if (e3.chartData = t.payload, t.payload == null) {
    e3.dataStartIndex = 0, e3.dataEndIndex = 0;
    return;
  }
  t.payload.length > 0 && e3.dataEndIndex !== t.payload.length - 1 && (e3.dataEndIndex = t.payload.length - 1);
}, setComputedData(e3, t) {
  e3.computedData = t.payload;
}, setDataStartEndIndexes(e3, t) {
  var { startIndex: r, endIndex: n } = t.payload;
  r != null && (e3.dataStartIndex = r), n != null && (e3.dataEndIndex = n);
} } }), { setChartData: Bp, setDataStartEndIndexes: NT, setComputedData: xF } = Vw.actions, DT = Vw.reducer, LT = ["x", "y"];
function Fp(e3, t) {
  var r = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e3);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e3, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function tn(e3) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Fp(Object(r), true).forEach(function(n) {
      RT(e3, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(r)) : Fp(Object(r)).forEach(function(n) {
      Object.defineProperty(e3, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e3;
}
function RT(e3, t, r) {
  return (t = $T(t)) in e3 ? Object.defineProperty(e3, t, { value: r, enumerable: true, configurable: true, writable: true }) : e3[t] = r, e3;
}
function $T(e3) {
  var t = zT(e3, "string");
  return typeof t == "symbol" ? t : t + "";
}
function zT(e3, t) {
  if (typeof e3 != "object" || !e3) return e3;
  var r = e3[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e3, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e3);
}
function BT(e3, t) {
  if (e3 == null) return {};
  var r, n, i = FT(e3, t);
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(e3);
    for (n = 0; n < s.length; n++) r = s[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e3, r) && (i[r] = e3[r]);
  }
  return i;
}
function FT(e3, t) {
  if (e3 == null) return {};
  var r = {};
  for (var n in e3) if ({}.hasOwnProperty.call(e3, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e3[n];
  }
  return r;
}
function WT() {
  var e3 = z(zc), t = z(Bc), r = ft(), n = z(Y0), i = z(Qe), s = Vr(), a = Wa(), o = z((l) => l.rootProps.className);
  g.useEffect(() => {
    if (e3 == null) return qr;
    var l = (u, c, h) => {
      if (t !== h && e3 === u) {
        if (c.payload.active === false) {
          r(Zn({ active: false, coordinate: void 0, dataKey: void 0, index: null, label: void 0, sourceViewBox: void 0, graphicalItemId: void 0 }));
          return;
        }
        if (n === "index") {
          var f;
          if (a && c !== null && c !== void 0 && (f = c.payload) !== null && f !== void 0 && f.coordinate && c.payload.sourceViewBox) {
            var d = c.payload.coordinate, { x: v, y: p } = d, m = BT(d, LT), { x: y, y: b, width: w, height: x } = c.payload.sourceViewBox, P = tn(tn({}, m), {}, { x: a.x + (w ? (v - y) / w : 0) * a.width, y: a.y + (x ? (p - b) / x : 0) * a.height });
            r(tn(tn({}, c), {}, { payload: tn(tn({}, c.payload), {}, { coordinate: P }) }));
          } else r(c);
          return;
        }
        if (i != null) {
          var S;
          if (typeof n == "function") {
            var _ = { activeTooltipIndex: c.payload.index == null ? void 0 : Number(c.payload.index), isTooltipActive: c.payload.active, activeIndex: c.payload.index == null ? void 0 : Number(c.payload.index), activeLabel: c.payload.label, activeDataKey: c.payload.dataKey, activeCoordinate: c.payload.coordinate }, M = n(i, _);
            S = i[M];
          } else n === "value" && (S = i.find((H) => String(H.value) === c.payload.label));
          var { coordinate: A } = c.payload;
          if (A == null || a == null) {
            r(Zn({ active: false, coordinate: void 0, dataKey: void 0, index: null, label: void 0, sourceViewBox: void 0, graphicalItemId: void 0 }));
            return;
          }
          if (S == null) {
            r(Zn({ active: false, coordinate: void 0, dataKey: void 0, index: null, label: void 0, sourceViewBox: c.payload.sourceViewBox, graphicalItemId: void 0 }));
            return;
          }
          var { x: j, y: k } = A, E = Math.min(j, a.x + a.width), $ = Math.min(k, a.y + a.height), R = { x: s === "horizontal" ? S.coordinate : E, y: s === "horizontal" ? $ : S.coordinate }, B = Zn({ active: c.payload.active, coordinate: R, dataKey: c.payload.dataKey, index: String(S.index), label: c.payload.label, sourceViewBox: c.payload.sourceViewBox, graphicalItemId: c.payload.graphicalItemId });
          r(B);
        }
      }
    };
    return wi.on(Qu, l), () => {
      wi.off(Qu, l);
    };
  }, [o, r, t, e3, n, i, s, a]);
}
function KT() {
  var e3 = z(zc), t = z(Bc), r = ft();
  g.useEffect(() => {
    if (e3 == null) return qr;
    var n = (i, s, a) => {
      t !== a && e3 === i && r(NT(s));
    };
    return wi.on(zp, n), () => {
      wi.off(zp, n);
    };
  }, [r, t, e3]);
}
function UT() {
  var e3 = ft();
  g.useEffect(() => {
    e3(kT());
  }, [e3]), WT(), KT();
}
function qT(e3, t, r, n, i, s) {
  var a = z((v) => ZI(v, e3, t)), o = z(NI), l = z(Bc), u = z(zc), c = z(Y0), h = z(IT), f = (h == null ? void 0 : h.sourceViewBox) != null, d = Wa();
  g.useEffect(() => {
    if (!f && u != null && l != null) {
      var v = Zn({ active: s, coordinate: r, dataKey: a, index: i, label: typeof n == "number" ? String(n) : n, sourceViewBox: d, graphicalItemId: o });
      wi.emit(Qu, u, v, l);
    }
  }, [f, r, a, o, i, n, l, u, c, s, d]);
}
function Wp(e3, t) {
  var r = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e3);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e3, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Kp(e3) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Wp(Object(r), true).forEach(function(n) {
      VT(e3, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(r)) : Wp(Object(r)).forEach(function(n) {
      Object.defineProperty(e3, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e3;
}
function VT(e3, t, r) {
  return (t = YT(t)) in e3 ? Object.defineProperty(e3, t, { value: r, enumerable: true, configurable: true, writable: true }) : e3[t] = r, e3;
}
function YT(e3) {
  var t = HT(e3, "string");
  return typeof t == "symbol" ? t : t + "";
}
function HT(e3, t) {
  if (typeof e3 != "object" || !e3) return e3;
  var r = e3[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e3, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e3);
}
function GT(e3) {
  return e3.dataKey;
}
function XT(e3, t) {
  return g.isValidElement(e3) ? g.cloneElement(e3, t) : typeof e3 == "function" ? g.createElement(e3, t) : g.createElement(vM, t);
}
var Up = [], JT = { allowEscapeViewBox: { x: false, y: false }, animationDuration: 400, animationEasing: "ease", axisId: 0, contentStyle: {}, cursor: true, filterNull: true, includeHidden: false, isAnimationActive: "auto", itemSorter: "name", itemStyle: {}, labelStyle: {}, offset: 10, reverseDirection: { x: false, y: false }, separator: " : ", trigger: "hover", useTranslate3d: false, wrapperStyle: {} };
function PF(e3) {
  var t, r, n = Bt(e3, JT), { active: i, allowEscapeViewBox: s, animationDuration: a, animationEasing: o, content: l, filterNull: u, isAnimationActive: c, offset: h, payloadUniqBy: f, position: d, reverseDirection: v, useTranslate3d: p, wrapperStyle: m, cursor: y, shared: b, trigger: w, defaultIndex: x, portal: P, axisId: S } = n, _ = ft(), M = typeof x == "number" ? String(x) : x;
  g.useEffect(() => {
    _(Wk({ shared: b, trigger: w, axisId: S, active: i, defaultIndex: M }));
  }, [_, b, w, S, i, M]);
  var A = Wa(), j = O0(), k = Lk(b), { activeIndex: E, isActive: $ } = (t = z((Kt) => eT(Kt, k, w, M))) !== null && t !== void 0 ? t : {}, R = z((Kt) => tT(Kt, k, w, M)), B = z((Kt) => Ww(Kt, k, w, M)), H = z((Kt) => QI(Kt, k, w, M)), W = R, G = _T(), F = (r = i ?? $) !== null && r !== void 0 ? r : false, [q, Lt] = NS([W, F]), st = k === "axis" ? B : void 0;
  qT(k, w, H, st, E, F);
  var fe = P ?? G;
  if (fe == null || A == null || k == null) return null;
  var Wt = W ?? Up;
  F || (Wt = Up), u && Wt.length && (Wt = oS(Wt.filter((Kt) => Kt.value != null && (Kt.hide !== true || n.includeHidden)), f, GT));
  var De = Wt.length > 0, Rn = Kp(Kp({}, n), {}, { payload: Wt, label: st, active: F, activeIndex: E, coordinate: H, accessibilityLayer: j }), $n = g.createElement(OM, { allowEscapeViewBox: s, animationDuration: a, animationEasing: o, isAnimationActive: c, active: F, coordinate: H, hasPayload: De, offset: h, position: d, reverseDirection: v, useTranslate3d: p, viewBox: A, wrapperStyle: m, lastBoundingBox: q, innerRef: Lt, hasPortalFromProps: !!P }, XT(l, Rn));
  return g.createElement(g.Fragment, null, Kg.createPortal($n, fe), F && g.createElement(ST, { cursor: y, tooltipEventType: k, coordinate: H, payload: Wt, index: E }));
}
function ZT(e3, t, r) {
  return (t = QT(t)) in e3 ? Object.defineProperty(e3, t, { value: r, enumerable: true, configurable: true, writable: true }) : e3[t] = r, e3;
}
function QT(e3) {
  var t = tN(e3, "string");
  return typeof t == "symbol" ? t : t + "";
}
function tN(e3, t) {
  if (typeof e3 != "object" || !e3) return e3;
  var r = e3[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e3, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e3);
}
class eN {
  constructor(t) {
    ZT(this, "cache", /* @__PURE__ */ new Map()), this.maxSize = t;
  }
  get(t) {
    var r = this.cache.get(t);
    return r !== void 0 && (this.cache.delete(t), this.cache.set(t, r)), r;
  }
  set(t, r) {
    if (this.cache.has(t)) this.cache.delete(t);
    else if (this.cache.size >= this.maxSize) {
      var n = this.cache.keys().next().value;
      n != null && this.cache.delete(n);
    }
    this.cache.set(t, r);
  }
  clear() {
    this.cache.clear();
  }
  size() {
    return this.cache.size;
  }
}
function qp(e3, t) {
  var r = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e3);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e3, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function rN(e3) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? qp(Object(r), true).forEach(function(n) {
      nN(e3, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(r)) : qp(Object(r)).forEach(function(n) {
      Object.defineProperty(e3, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e3;
}
function nN(e3, t, r) {
  return (t = iN(t)) in e3 ? Object.defineProperty(e3, t, { value: r, enumerable: true, configurable: true, writable: true }) : e3[t] = r, e3;
}
function iN(e3) {
  var t = sN(e3, "string");
  return typeof t == "symbol" ? t : t + "";
}
function sN(e3, t) {
  if (typeof e3 != "object" || !e3) return e3;
  var r = e3[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e3, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e3);
}
var aN = { cacheSize: 2e3, enableCache: true }, Yw = rN({}, aN), Vp = new eN(Yw.cacheSize), oN = { position: "absolute", top: "-20000px", left: 0, padding: 0, margin: 0, border: "none", whiteSpace: "pre" }, Yp = "recharts_measurement_span";
function lN(e3, t) {
  var r = t.fontSize || "", n = t.fontFamily || "", i = t.fontWeight || "", s = t.fontStyle || "", a = t.letterSpacing || "", o = t.textTransform || "";
  return "".concat(e3, "|").concat(r, "|").concat(n, "|").concat(i, "|").concat(s, "|").concat(a, "|").concat(o);
}
var Hp = (e3, t) => {
  try {
    var r = document.getElementById(Yp);
    r || (r = document.createElement("span"), r.setAttribute("id", Yp), r.setAttribute("aria-hidden", "true"), document.body.appendChild(r)), Object.assign(r.style, oN, t), r.textContent = "".concat(e3);
    var n = r.getBoundingClientRect();
    return { width: n.width, height: n.height };
  } catch {
    return { width: 0, height: 0 };
  }
}, ri = function(t) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (t == null || Ni.isSsr) return { width: 0, height: 0 };
  if (!Yw.enableCache) return Hp(t, r);
  var n = lN(t, r), i = Vp.get(n);
  if (i) return i;
  var s = Hp(t, r);
  return Vp.set(n, s), s;
}, Hw;
function uN(e3, t, r) {
  return (t = cN(t)) in e3 ? Object.defineProperty(e3, t, { value: r, enumerable: true, configurable: true, writable: true }) : e3[t] = r, e3;
}
function cN(e3) {
  var t = hN(e3, "string");
  return typeof t == "symbol" ? t : t + "";
}
function hN(e3, t) {
  if (typeof e3 != "object" || !e3) return e3;
  var r = e3[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e3, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e3);
}
var Gp = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([*/])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/, Xp = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([+-])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/, fN = /^(px|cm|vh|vw|em|rem|%|mm|in|pt|pc|ex|ch|vmin|vmax|Q)$/, dN = /(-?\d+(?:\.\d+)?)([a-zA-Z%]+)?/, vN = { cm: 96 / 2.54, mm: 96 / 25.4, pt: 96 / 72, pc: 96 / 6, in: 96, Q: 96 / (2.54 * 40), px: 1 }, pN = ["cm", "mm", "pt", "pc", "in", "Q", "px"];
function mN(e3) {
  return pN.includes(e3);
}
var ln = "NaN";
function gN(e3, t) {
  return e3 * vN[t];
}
class Ot {
  static parse(t) {
    var r, [, n, i] = (r = dN.exec(t)) !== null && r !== void 0 ? r : [];
    return n == null ? Ot.NaN : new Ot(parseFloat(n), i ?? "");
  }
  constructor(t, r) {
    this.num = t, this.unit = r, this.num = t, this.unit = r, Ce(t) && (this.unit = ""), r !== "" && !fN.test(r) && (this.num = NaN, this.unit = ""), mN(r) && (this.num = gN(t, r), this.unit = "px");
  }
  add(t) {
    return this.unit !== t.unit ? new Ot(NaN, "") : new Ot(this.num + t.num, this.unit);
  }
  subtract(t) {
    return this.unit !== t.unit ? new Ot(NaN, "") : new Ot(this.num - t.num, this.unit);
  }
  multiply(t) {
    return this.unit !== "" && t.unit !== "" && this.unit !== t.unit ? new Ot(NaN, "") : new Ot(this.num * t.num, this.unit || t.unit);
  }
  divide(t) {
    return this.unit !== "" && t.unit !== "" && this.unit !== t.unit ? new Ot(NaN, "") : new Ot(this.num / t.num, this.unit || t.unit);
  }
  toString() {
    return "".concat(this.num).concat(this.unit);
  }
  isNaN() {
    return Ce(this.num);
  }
}
Hw = Ot;
uN(Ot, "NaN", new Hw(NaN, ""));
function Gw(e3) {
  if (e3 == null || e3.includes(ln)) return ln;
  for (var t = e3; t.includes("*") || t.includes("/"); ) {
    var r, [, n, i, s] = (r = Gp.exec(t)) !== null && r !== void 0 ? r : [], a = Ot.parse(n ?? ""), o = Ot.parse(s ?? ""), l = i === "*" ? a.multiply(o) : a.divide(o);
    if (l.isNaN()) return ln;
    t = t.replace(Gp, l.toString());
  }
  for (; t.includes("+") || /.-\d+(?:\.\d+)?/.test(t); ) {
    var u, [, c, h, f] = (u = Xp.exec(t)) !== null && u !== void 0 ? u : [], d = Ot.parse(c ?? ""), v = Ot.parse(f ?? ""), p = h === "+" ? d.add(v) : d.subtract(v);
    if (p.isNaN()) return ln;
    t = t.replace(Xp, p.toString());
  }
  return t;
}
var Jp = /\(([^()]*)\)/;
function yN(e3) {
  for (var t = e3, r; (r = Jp.exec(t)) != null; ) {
    var [, n] = r;
    t = t.replace(Jp, Gw(n));
  }
  return t;
}
function bN(e3) {
  var t = e3.replace(/\s+/g, "");
  return t = yN(t), t = Gw(t), t;
}
function wN(e3) {
  try {
    return bN(e3);
  } catch {
    return ln;
  }
}
function Ul(e3) {
  var t = wN(e3.slice(5, -1));
  return t === ln ? "" : t;
}
var xN = ["x", "y", "lineHeight", "capHeight", "fill", "scaleToFit", "textAnchor", "verticalAnchor"], PN = ["dx", "dy", "angle", "className", "breakAll"];
function tc() {
  return tc = Object.assign ? Object.assign.bind() : function(e3) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e3[n] = r[n]);
    }
    return e3;
  }, tc.apply(null, arguments);
}
function Zp(e3, t) {
  if (e3 == null) return {};
  var r, n, i = SN(e3, t);
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(e3);
    for (n = 0; n < s.length; n++) r = s[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e3, r) && (i[r] = e3[r]);
  }
  return i;
}
function SN(e3, t) {
  if (e3 == null) return {};
  var r = {};
  for (var n in e3) if ({}.hasOwnProperty.call(e3, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e3[n];
  }
  return r;
}
var Xw = /[ \f\n\r\t\v\u2028\u2029]+/, Jw = (e3) => {
  var { children: t, breakAll: r, style: n } = e3;
  try {
    var i = [];
    mt(t) || (r ? i = t.toString().split("") : i = t.toString().split(Xw));
    var s = i.map((o) => ({ word: o, width: ri(o, n).width })), a = r ? 0 : ri("\xA0", n).width;
    return { wordsWithComputedWidth: s, spaceWidth: a };
  } catch {
    return null;
  }
};
function Zw(e3) {
  return e3 === "start" || e3 === "middle" || e3 === "end" || e3 === "inherit";
}
function _N(e3) {
  return mt(e3) || typeof e3 == "string" || typeof e3 == "number" || typeof e3 == "boolean";
}
var Qw = (e3, t, r, n) => e3.reduce((i, s) => {
  var { word: a, width: o } = s, l = i[i.length - 1];
  if (l && o != null && (t == null || n || l.width + o + r < Number(t))) l.words.push(a), l.width += o + r;
  else {
    var u = { words: [a], width: o };
    i.push(u);
  }
  return i;
}, []), tx = (e3) => e3.reduce((t, r) => t.width > r.width ? t : r), ON = "\u2026", Qp = (e3, t, r, n, i, s, a, o) => {
  var l = e3.slice(0, t), u = Jw({ breakAll: r, style: n, children: l + ON });
  if (!u) return [false, []];
  var c = Qw(u.wordsWithComputedWidth, s, a, o), h = c.length > i || tx(c).width > Number(s);
  return [h, c];
}, MN = (e3, t, r, n, i) => {
  var { maxLines: s, children: a, style: o, breakAll: l } = e3, u = L(s), c = String(a), h = Qw(t, n, r, i);
  if (!u || i) return h;
  var f = h.length > s || tx(h).width > Number(n);
  if (!f) return h;
  for (var d = 0, v = c.length - 1, p = 0, m; d <= v && p <= c.length - 1; ) {
    var y = Math.floor((d + v) / 2), b = y - 1, [w, x] = Qp(c, b, l, o, s, n, r, i), [P] = Qp(c, y, l, o, s, n, r, i);
    if (!w && !P && (d = y + 1), w && P && (v = y - 1), !w && P) {
      m = x;
      break;
    }
    p++;
  }
  return m || h;
}, tm = (e3) => {
  var t = mt(e3) ? [] : e3.toString().split(Xw);
  return [{ words: t, width: void 0 }];
}, EN = (e3) => {
  var { width: t, scaleToFit: r, children: n, style: i, breakAll: s, maxLines: a } = e3;
  if ((t || r) && !Ni.isSsr) {
    var o, l, u = Jw({ breakAll: s, children: n, style: i });
    if (u) {
      var { wordsWithComputedWidth: c, spaceWidth: h } = u;
      o = c, l = h;
    } else return tm(n);
    return MN({ breakAll: s, children: n, maxLines: a, style: i }, o, l, t, !!r);
  }
  return tm(n);
}, ex = "#808080", AN = { angle: 0, breakAll: false, capHeight: "0.71em", fill: ex, lineHeight: "1em", scaleToFit: false, textAnchor: "start", verticalAnchor: "end", x: 0, y: 0 }, Dh = g.forwardRef((e3, t) => {
  var r = Bt(e3, AN), { x: n, y: i, lineHeight: s, capHeight: a, fill: o, scaleToFit: l, textAnchor: u, verticalAnchor: c } = r, h = Zp(r, xN), f = g.useMemo(() => EN({ breakAll: h.breakAll, children: h.children, maxLines: h.maxLines, scaleToFit: l, style: h.style, width: h.width }), [h.breakAll, h.children, h.maxLines, l, h.style, h.width]), { dx: d, dy: v, angle: p, className: m, breakAll: y } = h, b = Zp(h, PN);
  if (!je(n) || !je(i) || f.length === 0) return null;
  var w = Number(n) + (L(d) ? d : 0), x = Number(i) + (L(v) ? v : 0);
  if (!K(w) || !K(x)) return null;
  var P;
  switch (c) {
    case "start":
      P = Ul("calc(".concat(a, ")"));
      break;
    case "middle":
      P = Ul("calc(".concat((f.length - 1) / 2, " * -").concat(s, " + (").concat(a, " / 2))"));
      break;
    default:
      P = Ul("calc(".concat(f.length - 1, " * -").concat(s, ")"));
      break;
  }
  var S = [], _ = f[0];
  if (l && _ != null) {
    var M = _.width, { width: A } = h;
    S.push("scale(".concat(L(A) && L(M) ? A / M : 1, ")"));
  }
  return p && S.push("rotate(".concat(p, ", ").concat(w, ", ").concat(x, ")")), S.length && (b.transform = S.join(" ")), g.createElement("text", tc({}, Tt(b), { ref: t, x: w, y: x, className: X("recharts-text", m), textAnchor: u, fill: o.includes("url") ? ex : o }), f.map((j, k) => {
    var E = j.words.join(y ? "" : " ");
    return g.createElement("tspan", { x: w, dy: k === 0 ? P : s, key: "".concat(E, "-").concat(k) }, E);
  }));
});
Dh.displayName = "Text";
function em(e3, t) {
  var r = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e3);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e3, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Pe(e3) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? em(Object(r), true).forEach(function(n) {
      CN(e3, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(r)) : em(Object(r)).forEach(function(n) {
      Object.defineProperty(e3, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e3;
}
function CN(e3, t, r) {
  return (t = jN(t)) in e3 ? Object.defineProperty(e3, t, { value: r, enumerable: true, configurable: true, writable: true }) : e3[t] = r, e3;
}
function jN(e3) {
  var t = kN(e3, "string");
  return typeof t == "symbol" ? t : t + "";
}
function kN(e3, t) {
  if (typeof e3 != "object" || !e3) return e3;
  var r = e3[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e3, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e3);
}
var IN = (e3) => {
  var { viewBox: t, position: r, offset: n = 0, parentViewBox: i } = e3, { x: s, y: a, height: o, upperWidth: l, lowerWidth: u } = jc(t), c = s, h = s + (l - u) / 2, f = (c + h) / 2, d = (l + u) / 2, v = c + l / 2, p = o >= 0 ? 1 : -1, m = p * n, y = p > 0 ? "end" : "start", b = p > 0 ? "start" : "end", w = l >= 0 ? 1 : -1, x = w * n, P = w > 0 ? "end" : "start", S = w > 0 ? "start" : "end", _ = i;
  if (r === "top") {
    var M = { x: c + l / 2, y: a - m, horizontalAnchor: "middle", verticalAnchor: y };
    return _ && (M.height = Math.max(a - _.y, 0), M.width = l), M;
  }
  if (r === "bottom") {
    var A = { x: h + u / 2, y: a + o + m, horizontalAnchor: "middle", verticalAnchor: b };
    return _ && (A.height = Math.max(_.y + _.height - (a + o), 0), A.width = u), A;
  }
  if (r === "left") {
    var j = { x: f - x, y: a + o / 2, horizontalAnchor: P, verticalAnchor: "middle" };
    return _ && (j.width = Math.max(j.x - _.x, 0), j.height = o), j;
  }
  if (r === "right") {
    var k = { x: f + d + x, y: a + o / 2, horizontalAnchor: S, verticalAnchor: "middle" };
    return _ && (k.width = Math.max(_.x + _.width - k.x, 0), k.height = o), k;
  }
  var E = _ ? { width: d, height: o } : {};
  return r === "insideLeft" ? Pe({ x: f + x, y: a + o / 2, horizontalAnchor: S, verticalAnchor: "middle" }, E) : r === "insideRight" ? Pe({ x: f + d - x, y: a + o / 2, horizontalAnchor: P, verticalAnchor: "middle" }, E) : r === "insideTop" ? Pe({ x: c + l / 2, y: a + m, horizontalAnchor: "middle", verticalAnchor: b }, E) : r === "insideBottom" ? Pe({ x: h + u / 2, y: a + o - m, horizontalAnchor: "middle", verticalAnchor: y }, E) : r === "insideTopLeft" ? Pe({ x: c + x, y: a + m, horizontalAnchor: S, verticalAnchor: b }, E) : r === "insideTopRight" ? Pe({ x: c + l - x, y: a + m, horizontalAnchor: P, verticalAnchor: b }, E) : r === "insideBottomLeft" ? Pe({ x: h + x, y: a + o - m, horizontalAnchor: S, verticalAnchor: y }, E) : r === "insideBottomRight" ? Pe({ x: h + u - x, y: a + o - m, horizontalAnchor: P, verticalAnchor: y }, E) : r && typeof r == "object" && (L(r.x) || Nr(r.x)) && (L(r.y) || Nr(r.y)) ? Pe({ x: s + cr(r.x, d), y: a + cr(r.y, o), horizontalAnchor: "end", verticalAnchor: "end" }, E) : Pe({ x: v, y: a + o / 2, horizontalAnchor: "middle", verticalAnchor: "middle" }, E);
}, TN = ["labelRef"], NN = ["content"];
function rm(e3, t) {
  if (e3 == null) return {};
  var r, n, i = DN(e3, t);
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(e3);
    for (n = 0; n < s.length; n++) r = s[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e3, r) && (i[r] = e3[r]);
  }
  return i;
}
function DN(e3, t) {
  if (e3 == null) return {};
  var r = {};
  for (var n in e3) if ({}.hasOwnProperty.call(e3, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e3[n];
  }
  return r;
}
function nm(e3, t) {
  var r = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e3);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e3, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Qn(e3) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? nm(Object(r), true).forEach(function(n) {
      LN(e3, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(r)) : nm(Object(r)).forEach(function(n) {
      Object.defineProperty(e3, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e3;
}
function LN(e3, t, r) {
  return (t = RN(t)) in e3 ? Object.defineProperty(e3, t, { value: r, enumerable: true, configurable: true, writable: true }) : e3[t] = r, e3;
}
function RN(e3) {
  var t = $N(e3, "string");
  return typeof t == "symbol" ? t : t + "";
}
function $N(e3, t) {
  if (typeof e3 != "object" || !e3) return e3;
  var r = e3[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e3, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e3);
}
function Re() {
  return Re = Object.assign ? Object.assign.bind() : function(e3) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e3[n] = r[n]);
    }
    return e3;
  }, Re.apply(null, arguments);
}
var rx = g.createContext(null), zN = (e3) => {
  var { x: t, y: r, upperWidth: n, lowerWidth: i, width: s, height: a, children: o } = e3, l = g.useMemo(() => ({ x: t, y: r, upperWidth: n, lowerWidth: i, width: s, height: a }), [t, r, n, i, s, a]);
  return g.createElement(rx.Provider, { value: l }, o);
}, nx = () => {
  var e3 = g.useContext(rx), t = Wa();
  return e3 || (t ? jc(t) : void 0);
}, BN = g.createContext(null), FN = () => {
  var e3 = g.useContext(BN), t = z(Z0);
  return e3 || t;
}, WN = (e3) => {
  var { value: t, formatter: r } = e3, n = mt(e3.children) ? t : e3.children;
  return typeof r == "function" ? r(n) : n;
}, Lh = (e3) => e3 != null && typeof e3 == "function", KN = (e3, t) => {
  var r = ae(t - e3), n = Math.min(Math.abs(t - e3), 360);
  return r * n;
}, UN = (e3, t, r, n, i) => {
  var { offset: s, className: a } = e3, { cx: o, cy: l, innerRadius: u, outerRadius: c, startAngle: h, endAngle: f, clockWise: d } = i, v = (u + c) / 2, p = KN(h, f), m = p >= 0 ? 1 : -1, y, b;
  switch (t) {
    case "insideStart":
      y = h + m * s, b = d;
      break;
    case "insideEnd":
      y = f - m * s, b = !d;
      break;
    case "end":
      y = f + m * s, b = d;
      break;
    default:
      throw new Error("Unsupported position ".concat(t));
  }
  b = p <= 0 ? b : !b;
  var w = Et(o, l, v, y), x = Et(o, l, v, y + (b ? 1 : -1) * 359), P = "M".concat(w.x, ",").concat(w.y, `
    A`).concat(v, ",").concat(v, ",0,1,").concat(b ? 0 : 1, `,
    `).concat(x.x, ",").concat(x.y), S = mt(e3.id) ? ai("recharts-radial-line-") : e3.id;
  return g.createElement("text", Re({}, n, { dominantBaseline: "central", className: X("recharts-radial-bar-label", a) }), g.createElement("defs", null, g.createElement("path", { id: S, d: P })), g.createElement("textPath", { xlinkHref: "#".concat(S) }, r));
}, qN = (e3, t, r) => {
  var { cx: n, cy: i, innerRadius: s, outerRadius: a, startAngle: o, endAngle: l } = e3, u = (o + l) / 2;
  if (r === "outside") {
    var { x: c, y: h } = Et(n, i, a + t, u);
    return { x: c, y: h, textAnchor: c >= n ? "start" : "end", verticalAnchor: "middle" };
  }
  if (r === "center") return { x: n, y: i, textAnchor: "middle", verticalAnchor: "middle" };
  if (r === "centerTop") return { x: n, y: i, textAnchor: "middle", verticalAnchor: "start" };
  if (r === "centerBottom") return { x: n, y: i, textAnchor: "middle", verticalAnchor: "end" };
  var f = (s + a) / 2, { x: d, y: v } = Et(n, i, f, u);
  return { x: d, y: v, textAnchor: "middle", verticalAnchor: "middle" };
}, bs = (e3) => e3 != null && "cx" in e3 && L(e3.cx), VN = { angle: 0, offset: 5, zIndex: It.label, position: "middle", textBreakAll: false };
function YN(e3) {
  if (!bs(e3)) return e3;
  var { cx: t, cy: r, outerRadius: n } = e3, i = n * 2;
  return { x: t - n, y: r - n, width: i, upperWidth: i, lowerWidth: i, height: i };
}
function ir(e3) {
  var t = Bt(e3, VN), { viewBox: r, parentViewBox: n, position: i, value: s, children: a, content: o, className: l = "", textBreakAll: u, labelRef: c } = t, h = FN(), f = nx(), d = i === "center" ? f : h ?? f, v, p, m;
  r == null ? v = d : bs(r) ? v = r : v = jc(r);
  var y = YN(v);
  if (!v || mt(s) && mt(a) && !g.isValidElement(o) && typeof o != "function") return null;
  var b = Qn(Qn({}, t), {}, { viewBox: v });
  if (g.isValidElement(o)) {
    var { labelRef: w } = b, x = rm(b, TN);
    return g.cloneElement(o, x);
  }
  if (typeof o == "function") {
    var { content: P } = b, S = rm(b, NN);
    if (p = g.createElement(o, S), g.isValidElement(p)) return p;
  } else p = WN(t);
  var _ = Tt(t);
  if (bs(v)) {
    if (i === "insideStart" || i === "insideEnd" || i === "end") return UN(t, i, p, _, v);
    m = qN(v, t.offset, t.position);
  } else {
    if (!y) return null;
    var M = IN({ viewBox: y, position: i, offset: t.offset, parentViewBox: bs(n) ? void 0 : n });
    m = Qn(Qn({ x: M.x, y: M.y, textAnchor: M.horizontalAnchor, verticalAnchor: M.verticalAnchor }, M.width !== void 0 ? { width: M.width } : {}), M.height !== void 0 ? { height: M.height } : {});
  }
  return g.createElement(Ne, { zIndex: t.zIndex }, g.createElement(Dh, Re({ ref: c, className: X("recharts-label", l) }, _, m, { textAnchor: Zw(_.textAnchor) ? _.textAnchor : m.textAnchor, breakAll: u }), p));
}
ir.displayName = "Label";
var HN = (e3, t, r) => {
  if (!e3) return null;
  var n = { viewBox: t, labelRef: r };
  return e3 === true ? g.createElement(ir, Re({ key: "label-implicit" }, n)) : je(e3) ? g.createElement(ir, Re({ key: "label-implicit", value: e3 }, n)) : g.isValidElement(e3) ? e3.type === ir ? g.cloneElement(e3, Qn({ key: "label-implicit" }, n)) : g.createElement(ir, Re({ key: "label-implicit", content: e3 }, n)) : Lh(e3) ? g.createElement(ir, Re({ key: "label-implicit", content: e3 }, n)) : e3 && typeof e3 == "object" ? g.createElement(ir, Re({}, e3, { key: "label-implicit" }, n)) : null;
};
function GN(e3) {
  var { label: t, labelRef: r } = e3, n = nx();
  return HN(t, n, r) || null;
}
var XN = ["valueAccessor"], JN = ["dataKey", "clockWise", "id", "textBreakAll", "zIndex"];
function ca() {
  return ca = Object.assign ? Object.assign.bind() : function(e3) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e3[n] = r[n]);
    }
    return e3;
  }, ca.apply(null, arguments);
}
function im(e3, t) {
  if (e3 == null) return {};
  var r, n, i = ZN(e3, t);
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(e3);
    for (n = 0; n < s.length; n++) r = s[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e3, r) && (i[r] = e3[r]);
  }
  return i;
}
function ZN(e3, t) {
  if (e3 == null) return {};
  var r = {};
  for (var n in e3) if ({}.hasOwnProperty.call(e3, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e3[n];
  }
  return r;
}
var QN = (e3) => {
  var t = Array.isArray(e3.value) ? e3.value[e3.value.length - 1] : e3.value;
  if (_N(t)) return t;
}, ix = g.createContext(void 0), sx = ix.Provider, ax = g.createContext(void 0);
ax.Provider;
function tD() {
  return g.useContext(ix);
}
function eD() {
  return g.useContext(ax);
}
function ws(e3) {
  var { valueAccessor: t = QN } = e3, r = im(e3, XN), { dataKey: n, clockWise: i, id: s, textBreakAll: a, zIndex: o } = r, l = im(r, JN), u = tD(), c = eD(), h = u || c;
  return !h || !h.length ? null : g.createElement(Ne, { zIndex: o ?? It.label }, g.createElement(te, { className: "recharts-label-list" }, h.map((f, d) => {
    var v, p = mt(n) ? t(f, d) : ct(f.payload, n), m = mt(s) ? {} : { id: "".concat(s, "-").concat(d) };
    return g.createElement(ir, ca({ key: "label-".concat(d) }, Tt(f), l, m, { fill: (v = r.fill) !== null && v !== void 0 ? v : f.fill, parentViewBox: f.parentViewBox, value: p, textBreakAll: a, viewBox: f.viewBox, index: d, zIndex: 0 }));
  })));
}
ws.displayName = "LabelList";
function ox(e3) {
  var { label: t } = e3;
  return t ? t === true ? g.createElement(ws, { key: "labelList-implicit" }) : g.isValidElement(t) || Lh(t) ? g.createElement(ws, { key: "labelList-implicit", content: t }) : typeof t == "object" ? g.createElement(ws, ca({ key: "labelList-implicit" }, t, { type: String(t.type) })) : null : null;
}
function ec() {
  return ec = Object.assign ? Object.assign.bind() : function(e3) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e3[n] = r[n]);
    }
    return e3;
  }, ec.apply(null, arguments);
}
var lx = (e3) => {
  var { cx: t, cy: r, r: n, className: i } = e3, s = X("recharts-dot", i);
  return L(t) && L(r) && L(n) ? g.createElement("circle", ec({}, ue(e3), wc(e3), { className: s, cx: t, cy: r, r: n })) : null;
}, rD = { radiusAxis: {}, angleAxis: {} }, ux = Nt({ name: "polarAxis", initialState: rD, reducers: { addRadiusAxis(e3, t) {
  e3.radiusAxis[t.payload.id] = t.payload;
}, removeRadiusAxis(e3, t) {
  delete e3.radiusAxis[t.payload.id];
}, addAngleAxis(e3, t) {
  e3.angleAxis[t.payload.id] = t.payload;
}, removeAngleAxis(e3, t) {
  delete e3.angleAxis[t.payload.id];
} } }), { addRadiusAxis: SF, removeRadiusAxis: _F, addAngleAxis: OF, removeAngleAxis: MF } = ux.actions, nD = ux.reducer;
function iD(e3) {
  return e3 && typeof e3 == "object" && "className" in e3 && typeof e3.className == "string" ? e3.className : "";
}
var Rh = (e3) => e3 && typeof e3 == "object" && "clipDot" in e3 ? !!e3.clipDot : true, ql = {}, sm;
function sD() {
  return sm || (sm = 1, (function(e3) {
    Object.defineProperty(e3, Symbol.toStringTag, { value: "Module" });
    function t(r) {
      var _a3;
      if (typeof r != "object" || r == null) return false;
      if (Object.getPrototypeOf(r) === null) return true;
      if (Object.prototype.toString.call(r) !== "[object Object]") {
        const i = r[Symbol.toStringTag];
        return i == null || !((_a3 = Object.getOwnPropertyDescriptor(r, Symbol.toStringTag)) == null ? void 0 : _a3.writable) ? false : r.toString() === `[object ${i}]`;
      }
      let n = r;
      for (; Object.getPrototypeOf(n) !== null; ) n = Object.getPrototypeOf(n);
      return Object.getPrototypeOf(r) === n;
    }
    e3.isPlainObject = t;
  })(ql)), ql;
}
var Vl, am;
function aD() {
  return am || (am = 1, Vl = sD().isPlainObject), Vl;
}
var oD = aD();
const lD = fr(oD);
var om, lm, um, cm, hm;
function fm(e3, t) {
  var r = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e3);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e3, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function dm(e3) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? fm(Object(r), true).forEach(function(n) {
      uD(e3, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(r)) : fm(Object(r)).forEach(function(n) {
      Object.defineProperty(e3, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e3;
}
function uD(e3, t, r) {
  return (t = cD(t)) in e3 ? Object.defineProperty(e3, t, { value: r, enumerable: true, configurable: true, writable: true }) : e3[t] = r, e3;
}
function cD(e3) {
  var t = hD(e3, "string");
  return typeof t == "symbol" ? t : t + "";
}
function hD(e3, t) {
  if (typeof e3 != "object" || !e3) return e3;
  var r = e3[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e3, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e3);
}
function ha() {
  return ha = Object.assign ? Object.assign.bind() : function(e3) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e3[n] = r[n]);
    }
    return e3;
  }, ha.apply(null, arguments);
}
function Yn(e3, t) {
  return t || (t = e3.slice(0)), Object.freeze(Object.defineProperties(e3, { raw: { value: Object.freeze(t) } }));
}
var vm = (e3, t, r, n, i) => {
  var s = r - n, a;
  return a = ot(om || (om = Yn(["M ", ",", ""])), e3, t), a += ot(lm || (lm = Yn(["L ", ",", ""])), e3 + r, t), a += ot(um || (um = Yn(["L ", ",", ""])), e3 + r - s / 2, t + i), a += ot(cm || (cm = Yn(["L ", ",", ""])), e3 + r - s / 2 - n, t + i), a += ot(hm || (hm = Yn(["L ", ",", " Z"])), e3, t), a;
}, fD = { x: 0, y: 0, upperWidth: 0, lowerWidth: 0, height: 0, isUpdateAnimationActive: false, animationBegin: 0, animationDuration: 1500, animationEasing: "ease" }, dD = (e3) => {
  var t = Bt(e3, fD), { x: r, y: n, upperWidth: i, lowerWidth: s, height: a, className: o } = t, { animationEasing: l, animationDuration: u, animationBegin: c, isUpdateAnimationActive: h } = t, f = g.useRef(null), [d, v] = g.useState(-1), p = g.useRef(i), m = g.useRef(s), y = g.useRef(a), b = g.useRef(r), w = g.useRef(n), x = Ya(e3, "trapezoid-");
  if (g.useEffect(() => {
    if (f.current && f.current.getTotalLength) try {
      var R = f.current.getTotalLength();
      R && v(R);
    } catch {
    }
  }, []), r !== +r || n !== +n || i !== +i || s !== +s || a !== +a || i === 0 && s === 0 || a === 0) return null;
  var P = X("recharts-trapezoid", o);
  if (!h) return g.createElement("g", null, g.createElement("path", ha({}, Tt(t), { className: P, d: vm(r, n, i, s, a) })));
  var S = p.current, _ = m.current, M = y.current, A = b.current, j = w.current, k = "0px ".concat(d === -1 ? 1 : d, "px"), E = "".concat(d, "px ").concat(d, "px"), $ = M0(["strokeDasharray"], u, l);
  return g.createElement(Va, { animationId: x, key: x, canBegin: d > 0, duration: u, easing: l, isActive: h, begin: c }, (R) => {
    var B = ut(S, i, R), H = ut(_, s, R), W = ut(M, a, R), G = ut(A, r, R), F = ut(j, n, R);
    f.current && (p.current = B, m.current = H, y.current = W, b.current = G, w.current = F);
    var q = R > 0 ? { transition: $, strokeDasharray: E } : { strokeDasharray: k };
    return g.createElement("path", ha({}, Tt(t), { className: P, d: vm(G, F, B, H, W), ref: f, style: dm(dm({}, q), t.style) }));
  });
}, vD = ["option", "shapeType", "activeClassName", "inActiveClassName"];
function pD(e3, t) {
  if (e3 == null) return {};
  var r, n, i = mD(e3, t);
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(e3);
    for (n = 0; n < s.length; n++) r = s[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e3, r) && (i[r] = e3[r]);
  }
  return i;
}
function mD(e3, t) {
  if (e3 == null) return {};
  var r = {};
  for (var n in e3) if ({}.hasOwnProperty.call(e3, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e3[n];
  }
  return r;
}
function pm(e3, t) {
  var r = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e3);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e3, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function fa(e3) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? pm(Object(r), true).forEach(function(n) {
      gD(e3, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(r)) : pm(Object(r)).forEach(function(n) {
      Object.defineProperty(e3, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e3;
}
function gD(e3, t, r) {
  return (t = yD(t)) in e3 ? Object.defineProperty(e3, t, { value: r, enumerable: true, configurable: true, writable: true }) : e3[t] = r, e3;
}
function yD(e3) {
  var t = bD(e3, "string");
  return typeof t == "symbol" ? t : t + "";
}
function bD(e3, t) {
  if (typeof e3 != "object" || !e3) return e3;
  var r = e3[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e3, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e3);
}
function wD(e3, t) {
  return fa(fa({}, t), e3);
}
function xD(e3, t) {
  return e3 === "symbols";
}
function mm(e3) {
  var { shapeType: t, elementProps: r } = e3;
  switch (t) {
    case "rectangle":
      return g.createElement(j0, r);
    case "trapezoid":
      return g.createElement(dD, r);
    case "sector":
      return g.createElement(T0, r);
    case "symbols":
      if (xD(t)) return g.createElement(vy, r);
      break;
    case "curve":
      return g.createElement(ti, r);
    default:
      return null;
  }
}
function PD(e3) {
  return g.isValidElement(e3) ? e3.props : e3;
}
function SD(e3) {
  var { option: t, shapeType: r, activeClassName: n = "recharts-active-shape", inActiveClassName: i = "recharts-shape" } = e3, s = pD(e3, vD), a;
  if (g.isValidElement(t)) a = g.cloneElement(t, fa(fa({}, s), PD(t)));
  else if (typeof t == "function") a = t(s, s.index);
  else if (lD(t) && typeof t != "boolean") {
    var o = wD(t, s);
    a = g.createElement(mm, { shapeType: r, elementProps: o });
  } else {
    var l = s;
    a = g.createElement(mm, { shapeType: r, elementProps: l });
  }
  return s.isActive ? g.createElement(te, { className: n }, a) : g.createElement(te, { className: i }, a);
}
function cx(e3) {
  var { tooltipEntrySettings: t } = e3, r = ft(), n = Dt(), i = g.useRef(null);
  return g.useLayoutEffect(() => {
    n || (i.current === null ? r(zk(t)) : i.current !== t && r(Bk({ prev: i.current, next: t })), i.current = t);
  }, [t, r, n]), g.useLayoutEffect(() => () => {
    i.current && (r(Fk(i.current)), i.current = null);
  }, [r]), null;
}
function hx(e3) {
  var { legendPayload: t } = e3, r = ft(), n = Dt(), i = g.useRef(null);
  return g.useLayoutEffect(() => {
    n || (i.current === null ? r(zO(t)) : i.current !== t && r(BO({ prev: i.current, next: t })), i.current = t);
  }, [r, n, t]), g.useLayoutEffect(() => () => {
    i.current && (r(FO(i.current)), i.current = null);
  }, [r]), null;
}
var Yl, _D = () => {
  var [e3] = g.useState(() => ai("uid-"));
  return e3;
}, OD = (Yl = M1.useId) !== null && Yl !== void 0 ? Yl : _D;
function MD(e3, t) {
  var r = OD();
  return t || (e3 ? "".concat(e3, "-").concat(r) : r);
}
var ED = g.createContext(void 0), fx = (e3) => {
  var { id: t, type: r, children: n } = e3, i = MD("recharts-".concat(r), t);
  return g.createElement(ED.Provider, { value: i }, n(i));
}, AD = { cartesianItems: [], polarItems: [] }, dx = Nt({ name: "graphicalItems", initialState: AD, reducers: { addCartesianGraphicalItem: { reducer(e3, t) {
  e3.cartesianItems.push(t.payload);
}, prepare: rt() }, replaceCartesianGraphicalItem: { reducer(e3, t) {
  var { prev: r, next: n } = t.payload, i = oe(e3).cartesianItems.indexOf(r);
  i > -1 && (e3.cartesianItems[i] = n);
}, prepare: rt() }, removeCartesianGraphicalItem: { reducer(e3, t) {
  var r = oe(e3).cartesianItems.indexOf(t.payload);
  r > -1 && e3.cartesianItems.splice(r, 1);
}, prepare: rt() }, addPolarGraphicalItem: { reducer(e3, t) {
  e3.polarItems.push(t.payload);
}, prepare: rt() }, removePolarGraphicalItem: { reducer(e3, t) {
  var r = oe(e3).polarItems.indexOf(t.payload);
  r > -1 && e3.polarItems.splice(r, 1);
}, prepare: rt() }, replacePolarGraphicalItem: { reducer(e3, t) {
  var { prev: r, next: n } = t.payload, i = oe(e3).polarItems.indexOf(r);
  i > -1 && (e3.polarItems[i] = n);
}, prepare: rt() } } }), { addCartesianGraphicalItem: CD, replaceCartesianGraphicalItem: jD, removeCartesianGraphicalItem: kD, addPolarGraphicalItem: EF, removePolarGraphicalItem: AF, replacePolarGraphicalItem: CF } = dx.actions, ID = dx.reducer, TD = (e3) => {
  var t = ft(), r = g.useRef(null);
  return g.useLayoutEffect(() => {
    r.current === null ? t(CD(e3)) : r.current !== e3 && t(jD({ prev: r.current, next: e3 })), r.current = e3;
  }, [t, e3]), g.useLayoutEffect(() => () => {
    r.current && (t(kD(r.current)), r.current = null);
  }, [t]), null;
}, vx = g.memo(TD), ND = ["points"];
function gm(e3, t) {
  var r = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e3);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e3, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Hl(e3) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? gm(Object(r), true).forEach(function(n) {
      DD(e3, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(r)) : gm(Object(r)).forEach(function(n) {
      Object.defineProperty(e3, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e3;
}
function DD(e3, t, r) {
  return (t = LD(t)) in e3 ? Object.defineProperty(e3, t, { value: r, enumerable: true, configurable: true, writable: true }) : e3[t] = r, e3;
}
function LD(e3) {
  var t = RD(e3, "string");
  return typeof t == "symbol" ? t : t + "";
}
function RD(e3, t) {
  if (typeof e3 != "object" || !e3) return e3;
  var r = e3[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e3, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e3);
}
function da() {
  return da = Object.assign ? Object.assign.bind() : function(e3) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e3[n] = r[n]);
    }
    return e3;
  }, da.apply(null, arguments);
}
function $D(e3, t) {
  if (e3 == null) return {};
  var r, n, i = zD(e3, t);
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(e3);
    for (n = 0; n < s.length; n++) r = s[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e3, r) && (i[r] = e3[r]);
  }
  return i;
}
function zD(e3, t) {
  if (e3 == null) return {};
  var r = {};
  for (var n in e3) if ({}.hasOwnProperty.call(e3, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e3[n];
  }
  return r;
}
function BD(e3) {
  var { option: t, dotProps: r, className: n } = e3;
  if (g.isValidElement(t)) return g.cloneElement(t, r);
  if (typeof t == "function") return t(r);
  var i = X(n, typeof t != "boolean" ? t.className : ""), s = r ?? {}, { points: a } = s, o = $D(s, ND);
  return g.createElement(lx, da({}, o, { className: i }));
}
function FD(e3, t) {
  return e3 == null ? false : t ? true : e3.length === 1;
}
function px(e3) {
  var { points: t, dot: r, className: n, dotClassName: i, dataKey: s, baseProps: a, needClip: o, clipPathId: l, zIndex: u = It.scatter } = e3;
  if (!FD(t, r)) return null;
  var c = Rh(r), h = I1(r), f = t.map((v, p) => {
    var m, y, b = Hl(Hl(Hl({ r: 3 }, a), h), {}, { index: p, cx: (m = v.x) !== null && m !== void 0 ? m : void 0, cy: (y = v.y) !== null && y !== void 0 ? y : void 0, dataKey: s, value: v.value, payload: v.payload, points: t });
    return g.createElement(BD, { key: "dot-".concat(p), option: r, dotProps: b, className: i });
  }), d = {};
  return o && l != null && (d.clipPath = "url(#clipPath-".concat(c ? "" : "dots-").concat(l, ")")), g.createElement(Ne, { zIndex: u }, g.createElement(te, da({ className: n }, d), f));
}
function ym(e3, t) {
  var r = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e3);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e3, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function bm(e3) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? ym(Object(r), true).forEach(function(n) {
      WD(e3, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(r)) : ym(Object(r)).forEach(function(n) {
      Object.defineProperty(e3, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e3;
}
function WD(e3, t, r) {
  return (t = KD(t)) in e3 ? Object.defineProperty(e3, t, { value: r, enumerable: true, configurable: true, writable: true }) : e3[t] = r, e3;
}
function KD(e3) {
  var t = UD(e3, "string");
  return typeof t == "symbol" ? t : t + "";
}
function UD(e3, t) {
  if (typeof e3 != "object" || !e3) return e3;
  var r = e3[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e3, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e3);
}
var mx = 0, qD = { xAxis: {}, yAxis: {}, zAxis: {} }, gx = Nt({ name: "cartesianAxis", initialState: qD, reducers: { addXAxis: { reducer(e3, t) {
  e3.xAxis[t.payload.id] = t.payload;
}, prepare: rt() }, replaceXAxis: { reducer(e3, t) {
  var { prev: r, next: n } = t.payload;
  e3.xAxis[r.id] !== void 0 && (r.id !== n.id && delete e3.xAxis[r.id], e3.xAxis[n.id] = n);
}, prepare: rt() }, removeXAxis: { reducer(e3, t) {
  delete e3.xAxis[t.payload.id];
}, prepare: rt() }, addYAxis: { reducer(e3, t) {
  e3.yAxis[t.payload.id] = t.payload;
}, prepare: rt() }, replaceYAxis: { reducer(e3, t) {
  var { prev: r, next: n } = t.payload;
  e3.yAxis[r.id] !== void 0 && (r.id !== n.id && delete e3.yAxis[r.id], e3.yAxis[n.id] = n);
}, prepare: rt() }, removeYAxis: { reducer(e3, t) {
  delete e3.yAxis[t.payload.id];
}, prepare: rt() }, addZAxis: { reducer(e3, t) {
  e3.zAxis[t.payload.id] = t.payload;
}, prepare: rt() }, replaceZAxis: { reducer(e3, t) {
  var { prev: r, next: n } = t.payload;
  e3.zAxis[r.id] !== void 0 && (r.id !== n.id && delete e3.zAxis[r.id], e3.zAxis[n.id] = n);
}, prepare: rt() }, removeZAxis: { reducer(e3, t) {
  delete e3.zAxis[t.payload.id];
}, prepare: rt() }, updateYAxisWidth(e3, t) {
  var { id: r, width: n } = t.payload, i = e3.yAxis[r];
  if (i) {
    var s, a = i.widthHistory || [];
    if (a.length === 3 && a[0] === a[2] && n === a[1] && n !== i.width && Math.abs(n - ((s = a[0]) !== null && s !== void 0 ? s : 0)) <= 1) return;
    var o = [...a, n].slice(-3);
    e3.yAxis[r] = bm(bm({}, i), {}, { width: n, widthHistory: o });
  }
} } }), { addXAxis: VD, replaceXAxis: YD, removeXAxis: HD, addYAxis: GD, replaceYAxis: XD, removeYAxis: JD, addZAxis: jF, replaceZAxis: kF, removeZAxis: IF, updateYAxisWidth: ZD } = gx.actions, QD = gx.reducer, t2 = O([At], (e3) => ({ top: e3.top, bottom: e3.bottom, left: e3.left, right: e3.right })), e2 = O([t2, He, Ge], (e3, t, r) => {
  if (!(!e3 || t == null || r == null)) return { x: e3.left, y: e3.top, width: Math.max(0, t - e3.left - e3.right), height: Math.max(0, r - e3.top - e3.bottom) };
}), fo = () => z(e2), r2 = () => z(zI);
function wm(e3, t) {
  var r = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e3);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e3, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Gl(e3) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? wm(Object(r), true).forEach(function(n) {
      n2(e3, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(r)) : wm(Object(r)).forEach(function(n) {
      Object.defineProperty(e3, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e3;
}
function n2(e3, t, r) {
  return (t = i2(t)) in e3 ? Object.defineProperty(e3, t, { value: r, enumerable: true, configurable: true, writable: true }) : e3[t] = r, e3;
}
function i2(e3) {
  var t = s2(e3, "string");
  return typeof t == "symbol" ? t : t + "";
}
function s2(e3, t) {
  if (typeof e3 != "object" || !e3) return e3;
  var r = e3[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e3, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e3);
}
var a2 = (e3) => {
  var { point: t, childIndex: r, mainColor: n, activeDot: i, dataKey: s, clipPath: a } = e3;
  if (i === false || t.x == null || t.y == null) return null;
  var o = { index: r, dataKey: s, cx: t.x, cy: t.y, r: 4, fill: n ?? "none", strokeWidth: 2, stroke: "#fff", payload: t.payload, value: t.value }, l = Gl(Gl(Gl({}, o), Pa(i)), wc(i)), u;
  return g.isValidElement(i) ? u = g.cloneElement(i, l) : typeof i == "function" ? u = i(l) : u = g.createElement(lx, l), g.createElement(te, { className: "recharts-active-dot", clipPath: a }, u);
};
function rc(e3) {
  var { points: t, mainColor: r, activeDot: n, itemDataKey: i, clipPath: s, zIndex: a = It.activeDot } = e3, o = z(bi), l = r2();
  if (t == null || l == null) return null;
  var u = t.find((c) => l.includes(c.payload));
  return mt(u) ? null : g.createElement(Ne, { zIndex: a }, g.createElement(a2, { point: u, childIndex: Number(o), mainColor: r, dataKey: i, activeDot: n, clipPath: s }));
}
var o2 = (e3) => {
  var { chartData: t } = e3, r = ft(), n = Dt();
  return g.useEffect(() => n ? () => {
  } : (r(Bp(t)), () => {
    r(Bp(void 0));
  }), [t, r, n]), null;
}, xm = { x: 0, y: 0, width: 0, height: 0, padding: { top: 0, right: 0, bottom: 0, left: 0 } }, yx = Nt({ name: "brush", initialState: xm, reducers: { setBrushSettings(e3, t) {
  return t.payload == null ? xm : t.payload;
} } }), { setBrushSettings: TF } = yx.actions, l2 = yx.reducer;
function u2(e3) {
  return (e3 % 180 + 180) % 180;
}
var c2 = function(t) {
  var { width: r, height: n } = t, i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, s = u2(i), a = s * Math.PI / 180, o = Math.atan(n / r), l = a > o && a < Math.PI - o ? n / Math.sin(a) : r / Math.cos(a);
  return Math.abs(l);
}, h2 = { dots: [], areas: [], lines: [] }, bx = Nt({ name: "referenceElements", initialState: h2, reducers: { addDot: (e3, t) => {
  e3.dots.push(t.payload);
}, removeDot: (e3, t) => {
  var r = oe(e3).dots.findIndex((n) => n === t.payload);
  r !== -1 && e3.dots.splice(r, 1);
}, addArea: (e3, t) => {
  e3.areas.push(t.payload);
}, removeArea: (e3, t) => {
  var r = oe(e3).areas.findIndex((n) => n === t.payload);
  r !== -1 && e3.areas.splice(r, 1);
}, addLine: (e3, t) => {
  e3.lines.push(t.payload);
}, removeLine: (e3, t) => {
  var r = oe(e3).lines.findIndex((n) => n === t.payload);
  r !== -1 && e3.lines.splice(r, 1);
} } }), { addDot: NF, removeDot: DF, addArea: LF, removeArea: RF, addLine: $F, removeLine: zF } = bx.actions, f2 = bx.reducer, d2 = g.createContext(void 0), v2 = (e3) => {
  var { children: t } = e3, [r] = g.useState("".concat(ai("recharts"), "-clip")), n = fo();
  if (n == null) return null;
  var { x: i, y: s, width: a, height: o } = n;
  return g.createElement(d2.Provider, { value: r }, g.createElement("defs", null, g.createElement("clipPath", { id: r }, g.createElement("rect", { x: i, y: s, height: o, width: a }))), t);
};
function wx(e3, t) {
  if (t < 1) return [];
  if (t === 1) return e3;
  for (var r = [], n = 0; n < e3.length; n += t) {
    var i = e3[n];
    i !== void 0 && r.push(i);
  }
  return r;
}
function p2(e3, t, r) {
  var n = { width: e3.width + t.width, height: e3.height + t.height };
  return c2(n, r);
}
function m2(e3, t, r) {
  var n = r === "width", { x: i, y: s, width: a, height: o } = e3;
  return t === 1 ? { start: n ? i : s, end: n ? i + a : s + o } : { start: n ? i + a : s + o, end: n ? i : s };
}
function xi(e3, t, r, n, i) {
  if (e3 * t < e3 * n || e3 * t > e3 * i) return false;
  var s = r();
  return e3 * (t - e3 * s / 2 - n) >= 0 && e3 * (t + e3 * s / 2 - i) <= 0;
}
function g2(e3, t) {
  return wx(e3, t + 1);
}
function y2(e3, t, r, n, i) {
  for (var s = (n || []).slice(), { start: a, end: o } = t, l = 0, u = 1, c = a, h = function() {
    var v = n == null ? void 0 : n[l];
    if (v === void 0) return { v: wx(n, u) };
    var p = l, m, y = () => (m === void 0 && (m = r(v, p)), m), b = v.coordinate, w = l === 0 || xi(e3, b, y, c, o);
    w || (l = 0, c = a, u += 1), w && (c = b + e3 * (y() / 2 + i), l += u);
  }, f; u <= s.length; ) if (f = h(), f) return f.v;
  return [];
}
function b2(e3, t, r, n, i) {
  var s = (n || []).slice(), a = s.length;
  if (a === 0) return [];
  for (var { start: o, end: l } = t, u = 1; u <= a; u++) {
    for (var c = (a - 1) % u, h = o, f = true, d = function() {
      var x = n[p];
      if (x == null) return 0;
      var P = p, S, _ = () => (S === void 0 && (S = r(x, P)), S), M = x.coordinate, A = p === c || xi(e3, M, _, h, l);
      if (!A) return f = false, 1;
      A && (h = M + e3 * (_() / 2 + i));
    }, v, p = c; p < a && (v = d(), !(v !== 0 && v === 1)); p += u) ;
    if (f) {
      for (var m = [], y = c; y < a; y += u) {
        var b = n[y];
        b != null && m.push(b);
      }
      return m;
    }
  }
  return [];
}
function Pm(e3, t) {
  var r = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e3);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e3, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function jt(e3) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Pm(Object(r), true).forEach(function(n) {
      w2(e3, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(r)) : Pm(Object(r)).forEach(function(n) {
      Object.defineProperty(e3, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e3;
}
function w2(e3, t, r) {
  return (t = x2(t)) in e3 ? Object.defineProperty(e3, t, { value: r, enumerable: true, configurable: true, writable: true }) : e3[t] = r, e3;
}
function x2(e3) {
  var t = P2(e3, "string");
  return typeof t == "symbol" ? t : t + "";
}
function P2(e3, t) {
  if (typeof e3 != "object" || !e3) return e3;
  var r = e3[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e3, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e3);
}
function S2(e3, t, r, n, i) {
  for (var s = (n || []).slice(), a = s.length, { start: o } = t, { end: l } = t, u = function(f) {
    var d = s[f];
    if (d == null) return 1;
    var v = d, p, m = () => (p === void 0 && (p = r(d, f)), p);
    if (f === a - 1) {
      var y = e3 * (v.coordinate + e3 * m() / 2 - l);
      s[f] = v = jt(jt({}, v), {}, { tickCoord: y > 0 ? v.coordinate - y * e3 : v.coordinate });
    } else s[f] = v = jt(jt({}, v), {}, { tickCoord: v.coordinate });
    if (v.tickCoord != null) {
      var b = xi(e3, v.tickCoord, m, o, l);
      b && (l = v.tickCoord - e3 * (m() / 2 + i), s[f] = jt(jt({}, v), {}, { isShow: true }));
    }
  }, c = a - 1; c >= 0; c--) u(c);
  return s;
}
function _2(e3, t, r, n, i, s) {
  var a = (n || []).slice(), o = a.length, { start: l, end: u } = t;
  if (s) {
    var c = n[o - 1];
    if (c != null) {
      var h = r(c, o - 1), f = e3 * (c.coordinate + e3 * h / 2 - u);
      if (a[o - 1] = c = jt(jt({}, c), {}, { tickCoord: f > 0 ? c.coordinate - f * e3 : c.coordinate }), c.tickCoord != null) {
        var d = xi(e3, c.tickCoord, () => h, l, u);
        d && (u = c.tickCoord - e3 * (h / 2 + i), a[o - 1] = jt(jt({}, c), {}, { isShow: true }));
      }
    }
  }
  for (var v = s ? o - 1 : o, p = function(b) {
    var w = a[b];
    if (w == null) return 1;
    var x = w, P, S = () => (P === void 0 && (P = r(w, b)), P);
    if (b === 0) {
      var _ = e3 * (x.coordinate - e3 * S() / 2 - l);
      a[b] = x = jt(jt({}, x), {}, { tickCoord: _ < 0 ? x.coordinate - _ * e3 : x.coordinate });
    } else a[b] = x = jt(jt({}, x), {}, { tickCoord: x.coordinate });
    if (x.tickCoord != null) {
      var M = xi(e3, x.tickCoord, S, l, u);
      M && (l = x.tickCoord + e3 * (S() / 2 + i), a[b] = jt(jt({}, x), {}, { isShow: true }));
    }
  }, m = 0; m < v; m++) p(m);
  return a;
}
function $h(e3, t, r) {
  var { tick: n, ticks: i, viewBox: s, minTickGap: a, orientation: o, interval: l, tickFormatter: u, unit: c, angle: h } = e3;
  if (!i || !i.length || !n) return [];
  if (L(l) || Ni.isSsr) {
    var f;
    return (f = g2(i, L(l) ? l : 0)) !== null && f !== void 0 ? f : [];
  }
  var d = [], v = o === "top" || o === "bottom" ? "width" : "height", p = c && v === "width" ? ri(c, { fontSize: t, letterSpacing: r }) : { width: 0, height: 0 }, m = (P, S) => {
    var _ = typeof u == "function" ? u(P.value, S) : P.value;
    return v === "width" ? p2(ri(_, { fontSize: t, letterSpacing: r }), p, h) : ri(_, { fontSize: t, letterSpacing: r })[v];
  }, y = i[0], b = i[1], w = i.length >= 2 && y != null && b != null ? ae(b.coordinate - y.coordinate) : 1, x = m2(s, w, v);
  return l === "equidistantPreserveStart" ? y2(w, x, m, i, a) : l === "equidistantPreserveEnd" ? b2(w, x, m, i, a) : (l === "preserveStart" || l === "preserveStartEnd" ? d = _2(w, x, m, i, a, l === "preserveStartEnd") : d = S2(w, x, m, i, a), d.filter((P) => P.isShow));
}
var O2 = (e3) => {
  var { ticks: t, label: r, labelGapWithTick: n = 5, tickSize: i = 0, tickMargin: s = 0 } = e3, a = 0;
  if (t) {
    Array.from(t).forEach((c) => {
      if (c) {
        var h = c.getBoundingClientRect();
        h.width > a && (a = h.width);
      }
    });
    var o = r ? r.getBoundingClientRect().width : 0, l = i + s, u = a + l + o + (r ? n : 0);
    return Math.round(u);
  }
  return 0;
}, M2 = { xAxis: {}, yAxis: {} }, xx = Nt({ name: "renderedTicks", initialState: M2, reducers: { setRenderedTicks: (e3, t) => {
  var { axisType: r, axisId: n, ticks: i } = t.payload;
  e3[r][n] = i;
}, removeRenderedTicks: (e3, t) => {
  var { axisType: r, axisId: n } = t.payload;
  delete e3[r][n];
} } }), { setRenderedTicks: E2, removeRenderedTicks: A2 } = xx.actions, C2 = xx.reducer, j2 = ["axisLine", "width", "height", "className", "hide", "ticks", "axisType", "axisId"];
function k2(e3, t) {
  if (e3 == null) return {};
  var r, n, i = I2(e3, t);
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(e3);
    for (n = 0; n < s.length; n++) r = s[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e3, r) && (i[r] = e3[r]);
  }
  return i;
}
function I2(e3, t) {
  if (e3 == null) return {};
  var r = {};
  for (var n in e3) if ({}.hasOwnProperty.call(e3, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e3[n];
  }
  return r;
}
function Br() {
  return Br = Object.assign ? Object.assign.bind() : function(e3) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e3[n] = r[n]);
    }
    return e3;
  }, Br.apply(null, arguments);
}
function Sm(e3, t) {
  var r = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e3);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e3, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function at(e3) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Sm(Object(r), true).forEach(function(n) {
      T2(e3, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(r)) : Sm(Object(r)).forEach(function(n) {
      Object.defineProperty(e3, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e3;
}
function T2(e3, t, r) {
  return (t = N2(t)) in e3 ? Object.defineProperty(e3, t, { value: r, enumerable: true, configurable: true, writable: true }) : e3[t] = r, e3;
}
function N2(e3) {
  var t = D2(e3, "string");
  return typeof t == "symbol" ? t : t + "";
}
function D2(e3, t) {
  if (typeof e3 != "object" || !e3) return e3;
  var r = e3[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e3, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e3);
}
var Ke = { x: 0, y: 0, width: 0, height: 0, viewBox: { x: 0, y: 0, width: 0, height: 0 }, orientation: "bottom", ticks: [], stroke: "#666", tickLine: true, axisLine: true, tick: true, mirror: false, minTickGap: 5, tickSize: 6, tickMargin: 2, interval: "preserveEnd", zIndex: It.axis };
function L2(e3) {
  var { x: t, y: r, width: n, height: i, orientation: s, mirror: a, axisLine: o, otherSvgProps: l } = e3;
  if (!o) return null;
  var u = at(at(at({}, l), ue(o)), {}, { fill: "none" });
  if (s === "top" || s === "bottom") {
    var c = +(s === "top" && !a || s === "bottom" && a);
    u = at(at({}, u), {}, { x1: t, y1: r + c * i, x2: t + n, y2: r + c * i });
  } else {
    var h = +(s === "left" && !a || s === "right" && a);
    u = at(at({}, u), {}, { x1: t + h * n, y1: r, x2: t + h * n, y2: r + i });
  }
  return g.createElement("line", Br({}, u, { className: X("recharts-cartesian-axis-line", Ma(o, "className")) }));
}
function R2(e3, t, r, n, i, s, a, o, l) {
  var u, c, h, f, d, v, p = o ? -1 : 1, m = e3.tickSize || a, y = L(e3.tickCoord) ? e3.tickCoord : e3.coordinate;
  switch (s) {
    case "top":
      u = c = e3.coordinate, f = r + +!o * i, h = f - p * m, v = h - p * l, d = y;
      break;
    case "left":
      h = f = e3.coordinate, c = t + +!o * n, u = c - p * m, d = u - p * l, v = y;
      break;
    case "right":
      h = f = e3.coordinate, c = t + +o * n, u = c + p * m, d = u + p * l, v = y;
      break;
    default:
      u = c = e3.coordinate, f = r + +o * i, h = f + p * m, v = h + p * l, d = y;
      break;
  }
  return { line: { x1: u, y1: h, x2: c, y2: f }, tick: { x: d, y: v } };
}
function $2(e3, t) {
  switch (e3) {
    case "left":
      return t ? "start" : "end";
    case "right":
      return t ? "end" : "start";
    default:
      return "middle";
  }
}
function z2(e3, t) {
  switch (e3) {
    case "left":
    case "right":
      return "middle";
    case "top":
      return t ? "start" : "end";
    default:
      return t ? "end" : "start";
  }
}
function B2(e3) {
  var { option: t, tickProps: r, value: n } = e3, i, s = X(r.className, "recharts-cartesian-axis-tick-value");
  if (g.isValidElement(t)) i = g.cloneElement(t, at(at({}, r), {}, { className: s }));
  else if (typeof t == "function") i = t(at(at({}, r), {}, { className: s }));
  else {
    var a = "recharts-cartesian-axis-tick-value";
    typeof t != "boolean" && (a = X(a, iD(t))), i = g.createElement(Dh, Br({}, r, { className: a }), n);
  }
  return i;
}
function F2(e3) {
  var { ticks: t, axisType: r, axisId: n } = e3, i = ft();
  return g.useEffect(() => {
    if (n == null || r == null) return qr;
    var s = t.map((a) => ({ value: a.value, coordinate: a.coordinate, offset: a.offset, index: a.index }));
    return i(E2({ ticks: s, axisId: n, axisType: r })), () => {
      i(A2({ axisId: n, axisType: r }));
    };
  }, [i, t, n, r]), null;
}
var W2 = g.forwardRef((e3, t) => {
  var { ticks: r = [], tick: n, tickLine: i, stroke: s, tickFormatter: a, unit: o, padding: l, tickTextProps: u, orientation: c, mirror: h, x: f, y: d, width: v, height: p, tickSize: m, tickMargin: y, fontSize: b, letterSpacing: w, getTicksConfig: x, events: P, axisType: S, axisId: _ } = e3, M = $h(at(at({}, x), {}, { ticks: r }), b, w), A = ue(x), j = Pa(n), k = Zw(A.textAnchor) ? A.textAnchor : $2(c, h), E = z2(c, h), $ = {};
  typeof i == "object" && ($ = i);
  var R = at(at({}, A), {}, { fill: "none" }, $), B = M.map((G) => at({ entry: G }, R2(G, f, d, v, p, c, m, h, y))), H = B.map((G) => {
    var { entry: F, line: q } = G;
    return g.createElement(te, { className: "recharts-cartesian-axis-tick", key: "tick-".concat(F.value, "-").concat(F.coordinate, "-").concat(F.tickCoord) }, i && g.createElement("line", Br({}, R, q, { className: X("recharts-cartesian-axis-tick-line", Ma(i, "className")) })));
  }), W = B.map((G, F) => {
    var q, Lt, { entry: st, tick: fe } = G, Wt = at(at(at(at({ verticalAnchor: E }, A), {}, { textAnchor: k, stroke: "none", fill: s }, fe), {}, { index: F, payload: st, visibleTicksCount: M.length, tickFormatter: a, padding: l }, u), {}, { angle: (q = (Lt = u == null ? void 0 : u.angle) !== null && Lt !== void 0 ? Lt : A.angle) !== null && q !== void 0 ? q : 0 }), De = at(at({}, Wt), j);
    return g.createElement(te, Br({ className: "recharts-cartesian-axis-tick-label", key: "tick-label-".concat(st.value, "-").concat(st.coordinate, "-").concat(st.tickCoord) }, LP(P, st, F)), n && g.createElement(B2, { option: n, tickProps: De, value: "".concat(typeof a == "function" ? a(st.value, F) : st.value).concat(o || "") }));
  });
  return g.createElement("g", { className: "recharts-cartesian-axis-ticks recharts-".concat(S, "-ticks") }, g.createElement(F2, { ticks: M, axisId: _, axisType: S }), W.length > 0 && g.createElement(Ne, { zIndex: It.label }, g.createElement("g", { className: "recharts-cartesian-axis-tick-labels recharts-".concat(S, "-tick-labels"), ref: t }, W)), H.length > 0 && g.createElement("g", { className: "recharts-cartesian-axis-tick-lines recharts-".concat(S, "-tick-lines") }, H));
}), K2 = g.forwardRef((e3, t) => {
  var { axisLine: r, width: n, height: i, className: s, hide: a, ticks: o, axisType: l, axisId: u } = e3, c = k2(e3, j2), [h, f] = g.useState(""), [d, v] = g.useState(""), p = g.useRef(null);
  g.useImperativeHandle(t, () => ({ getCalculatedWidth: () => {
    var y;
    return O2({ ticks: p.current, label: (y = e3.labelRef) === null || y === void 0 ? void 0 : y.current, labelGapWithTick: 5, tickSize: e3.tickSize, tickMargin: e3.tickMargin });
  } }));
  var m = g.useCallback((y) => {
    if (y) {
      var b = y.getElementsByClassName("recharts-cartesian-axis-tick-value");
      p.current = b;
      var w = b[0];
      if (w) {
        var x = window.getComputedStyle(w), P = x.fontSize, S = x.letterSpacing;
        (P !== h || S !== d) && (f(P), v(S));
      }
    }
  }, [h, d]);
  return a || n != null && n <= 0 || i != null && i <= 0 ? null : g.createElement(Ne, { zIndex: e3.zIndex }, g.createElement(te, { className: X("recharts-cartesian-axis", s) }, g.createElement(L2, { x: e3.x, y: e3.y, width: n, height: i, orientation: e3.orientation, mirror: e3.mirror, axisLine: r, otherSvgProps: ue(e3) }), g.createElement(W2, { ref: m, axisType: l, events: c, fontSize: h, getTicksConfig: e3, height: e3.height, letterSpacing: d, mirror: e3.mirror, orientation: e3.orientation, padding: e3.padding, stroke: e3.stroke, tick: e3.tick, tickFormatter: e3.tickFormatter, tickLine: e3.tickLine, tickMargin: e3.tickMargin, tickSize: e3.tickSize, tickTextProps: e3.tickTextProps, ticks: o, unit: e3.unit, width: e3.width, x: e3.x, y: e3.y, axisId: u }), g.createElement(zN, { x: e3.x, y: e3.y, width: e3.width, height: e3.height, lowerWidth: e3.width, upperWidth: e3.width }, g.createElement(GN, { label: e3.label, labelRef: e3.labelRef }), e3.children)));
}), zh = g.forwardRef((e3, t) => {
  var r = Bt(e3, Ke);
  return g.createElement(K2, Br({}, r, { ref: t }));
});
zh.displayName = "CartesianAxis";
var U2 = ["x1", "y1", "x2", "y2", "key"], q2 = ["offset"], V2 = ["xAxisId", "yAxisId"], Y2 = ["xAxisId", "yAxisId"];
function _m(e3, t) {
  var r = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e3);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e3, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function kt(e3) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? _m(Object(r), true).forEach(function(n) {
      H2(e3, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(r)) : _m(Object(r)).forEach(function(n) {
      Object.defineProperty(e3, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e3;
}
function H2(e3, t, r) {
  return (t = G2(t)) in e3 ? Object.defineProperty(e3, t, { value: r, enumerable: true, configurable: true, writable: true }) : e3[t] = r, e3;
}
function G2(e3) {
  var t = X2(e3, "string");
  return typeof t == "symbol" ? t : t + "";
}
function X2(e3, t) {
  if (typeof e3 != "object" || !e3) return e3;
  var r = e3[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e3, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e3);
}
function Er() {
  return Er = Object.assign ? Object.assign.bind() : function(e3) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e3[n] = r[n]);
    }
    return e3;
  }, Er.apply(null, arguments);
}
function va(e3, t) {
  if (e3 == null) return {};
  var r, n, i = J2(e3, t);
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(e3);
    for (n = 0; n < s.length; n++) r = s[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e3, r) && (i[r] = e3[r]);
  }
  return i;
}
function J2(e3, t) {
  if (e3 == null) return {};
  var r = {};
  for (var n in e3) if ({}.hasOwnProperty.call(e3, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e3[n];
  }
  return r;
}
var Z2 = (e3) => {
  var { fill: t } = e3;
  if (!t || t === "none") return null;
  var { fillOpacity: r, x: n, y: i, width: s, height: a, ry: o } = e3;
  return g.createElement("rect", { x: n, y: i, ry: o, width: s, height: a, stroke: "none", fill: t, fillOpacity: r, className: "recharts-cartesian-grid-bg" });
};
function Px(e3) {
  var { option: t, lineItemProps: r } = e3, n;
  if (g.isValidElement(t)) n = g.cloneElement(t, r);
  else if (typeof t == "function") n = t(r);
  else {
    var i, { x1: s, y1: a, x2: o, y2: l, key: u } = r, c = va(r, U2), h = (i = ue(c)) !== null && i !== void 0 ? i : {}, { offset: f } = h, d = va(h, q2);
    n = g.createElement("line", Er({}, d, { x1: s, y1: a, x2: o, y2: l, fill: "none", key: u }));
  }
  return n;
}
function Q2(e3) {
  var { x: t, width: r, horizontal: n = true, horizontalPoints: i } = e3;
  if (!n || !i || !i.length) return null;
  var { xAxisId: s, yAxisId: a } = e3, o = va(e3, V2), l = i.map((u, c) => {
    var h = kt(kt({}, o), {}, { x1: t, y1: u, x2: t + r, y2: u, key: "line-".concat(c), index: c });
    return g.createElement(Px, { key: "line-".concat(c), option: n, lineItemProps: h });
  });
  return g.createElement("g", { className: "recharts-cartesian-grid-horizontal" }, l);
}
function tL(e3) {
  var { y: t, height: r, vertical: n = true, verticalPoints: i } = e3;
  if (!n || !i || !i.length) return null;
  var { xAxisId: s, yAxisId: a } = e3, o = va(e3, Y2), l = i.map((u, c) => {
    var h = kt(kt({}, o), {}, { x1: u, y1: t, x2: u, y2: t + r, key: "line-".concat(c), index: c });
    return g.createElement(Px, { option: n, lineItemProps: h, key: "line-".concat(c) });
  });
  return g.createElement("g", { className: "recharts-cartesian-grid-vertical" }, l);
}
function eL(e3) {
  var { horizontalFill: t, fillOpacity: r, x: n, y: i, width: s, height: a, horizontalPoints: o, horizontal: l = true } = e3;
  if (!l || !t || !t.length || o == null) return null;
  var u = o.map((h) => Math.round(h + i - i)).sort((h, f) => h - f);
  i !== u[0] && u.unshift(0);
  var c = u.map((h, f) => {
    var d = u[f + 1], v = d == null, p = v ? i + a - h : d - h;
    if (p <= 0) return null;
    var m = f % t.length;
    return g.createElement("rect", { key: "react-".concat(f), y: h, x: n, height: p, width: s, stroke: "none", fill: t[m], fillOpacity: r, className: "recharts-cartesian-grid-bg" });
  });
  return g.createElement("g", { className: "recharts-cartesian-gridstripes-horizontal" }, c);
}
function rL(e3) {
  var { vertical: t = true, verticalFill: r, fillOpacity: n, x: i, y: s, width: a, height: o, verticalPoints: l } = e3;
  if (!t || !r || !r.length) return null;
  var u = l.map((h) => Math.round(h + i - i)).sort((h, f) => h - f);
  i !== u[0] && u.unshift(0);
  var c = u.map((h, f) => {
    var d = u[f + 1], v = d == null, p = v ? i + a - h : d - h;
    if (p <= 0) return null;
    var m = f % r.length;
    return g.createElement("rect", { key: "react-".concat(f), x: h, y: s, width: p, height: o, stroke: "none", fill: r[m], fillOpacity: n, className: "recharts-cartesian-grid-bg" });
  });
  return g.createElement("g", { className: "recharts-cartesian-gridstripes-vertical" }, c);
}
var nL = (e3, t) => {
  var { xAxis: r, width: n, height: i, offset: s } = e3;
  return a0($h(kt(kt(kt({}, Ke), r), {}, { ticks: o0(r), viewBox: { x: 0, y: 0, width: n, height: i } })), s.left, s.left + s.width, t);
}, iL = (e3, t) => {
  var { yAxis: r, width: n, height: i, offset: s } = e3;
  return a0($h(kt(kt(kt({}, Ke), r), {}, { ticks: o0(r), viewBox: { x: 0, y: 0, width: n, height: i } })), s.top, s.top + s.height, t);
}, sL = { horizontal: true, vertical: true, horizontalPoints: [], verticalPoints: [], stroke: "#ccc", fill: "none", verticalFill: [], horizontalFill: [], xAxisId: 0, yAxisId: 0, syncWithTicks: false, zIndex: It.grid };
function aL(e3) {
  var t = v0(), r = p0(), n = d0(), i = kt(kt({}, Bt(e3, sL)), {}, { x: L(e3.x) ? e3.x : n.left, y: L(e3.y) ? e3.y : n.top, width: L(e3.width) ? e3.width : n.width, height: L(e3.height) ? e3.height : n.height }), { xAxisId: s, yAxisId: a, x: o, y: l, width: u, height: c, syncWithTicks: h, horizontalValues: f, verticalValues: d } = i, v = Dt(), p = z((A) => Ep(A, "xAxis", s, v)), m = z((A) => Ep(A, "yAxis", a, v));
  if (!ke(u) || !ke(c) || !L(o) || !L(l)) return null;
  var y = i.verticalCoordinatesGenerator || nL, b = i.horizontalCoordinatesGenerator || iL, { horizontalPoints: w, verticalPoints: x } = i;
  if ((!w || !w.length) && typeof b == "function") {
    var P = f && f.length, S = b({ yAxis: m ? kt(kt({}, m), {}, { ticks: P ? f : m.ticks }) : void 0, width: t ?? u, height: r ?? c, offset: n }, P ? true : h);
    zs(Array.isArray(S), "horizontalCoordinatesGenerator should return Array but instead it returned [".concat(typeof S, "]")), Array.isArray(S) && (w = S);
  }
  if ((!x || !x.length) && typeof y == "function") {
    var _ = d && d.length, M = y({ xAxis: p ? kt(kt({}, p), {}, { ticks: _ ? d : p.ticks }) : void 0, width: t ?? u, height: r ?? c, offset: n }, _ ? true : h);
    zs(Array.isArray(M), "verticalCoordinatesGenerator should return Array but instead it returned [".concat(typeof M, "]")), Array.isArray(M) && (x = M);
  }
  return g.createElement(Ne, { zIndex: i.zIndex }, g.createElement("g", { className: "recharts-cartesian-grid" }, g.createElement(Z2, { fill: i.fill, fillOpacity: i.fillOpacity, x: i.x, y: i.y, width: i.width, height: i.height, ry: i.ry }), g.createElement(eL, Er({}, i, { horizontalPoints: w })), g.createElement(rL, Er({}, i, { verticalPoints: x })), g.createElement(Q2, Er({}, i, { offset: n, horizontalPoints: w, xAxis: p, yAxis: m })), g.createElement(tL, Er({}, i, { offset: n, verticalPoints: x, xAxis: p, yAxis: m }))));
}
aL.displayName = "CartesianGrid";
var oL = {}, Sx = Nt({ name: "errorBars", initialState: oL, reducers: { addErrorBar: (e3, t) => {
  var { itemId: r, errorBar: n } = t.payload;
  e3[r] || (e3[r] = []), e3[r].push(n);
}, replaceErrorBar: (e3, t) => {
  var { itemId: r, prev: n, next: i } = t.payload;
  e3[r] && (e3[r] = e3[r].map((s) => s.dataKey === n.dataKey && s.direction === n.direction ? i : s));
}, removeErrorBar: (e3, t) => {
  var { itemId: r, errorBar: n } = t.payload;
  e3[r] && (e3[r] = e3[r].filter((i) => i.dataKey !== n.dataKey || i.direction !== n.direction));
} } }), { addErrorBar: BF, replaceErrorBar: FF, removeErrorBar: WF } = Sx.actions, lL = Sx.reducer, uL = ["children"];
function cL(e3, t) {
  if (e3 == null) return {};
  var r, n, i = hL(e3, t);
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(e3);
    for (n = 0; n < s.length; n++) r = s[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e3, r) && (i[r] = e3[r]);
  }
  return i;
}
function hL(e3, t) {
  if (e3 == null) return {};
  var r = {};
  for (var n in e3) if ({}.hasOwnProperty.call(e3, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e3[n];
  }
  return r;
}
var fL = { data: [], xAxisId: "xAxis-0", yAxisId: "yAxis-0", dataPointFormatter: () => ({ x: 0, y: 0, value: 0 }), errorBarOffset: 0 }, dL = g.createContext(fL);
function vL(e3) {
  var { children: t } = e3, r = cL(e3, uL);
  return g.createElement(dL.Provider, { value: r }, t);
}
function Bh(e3, t) {
  var r, n, i = z((u) => Je(u, e3)), s = z((u) => Ze(u, t)), a = (r = i == null ? void 0 : i.allowDataOverflow) !== null && r !== void 0 ? r : dt.allowDataOverflow, o = (n = s == null ? void 0 : s.allowDataOverflow) !== null && n !== void 0 ? n : vt.allowDataOverflow, l = a || o;
  return { needClip: l, needClipX: a, needClipY: o };
}
function _x(e3) {
  var { xAxisId: t, yAxisId: r, clipPathId: n } = e3, i = fo(), { needClipX: s, needClipY: a, needClip: o } = Bh(t, r);
  if (!o || !i) return null;
  var { x: l, y: u, width: c, height: h } = i;
  return g.createElement("clipPath", { id: "clipPath-".concat(n) }, g.createElement("rect", { x: s ? l : l - c / 2, y: a ? u : u - h / 2, width: s ? c : c * 2, height: a ? h : h * 2 }));
}
var Ox = (e3, t, r, n) => ho(e3, "xAxis", t, n), Mx = (e3, t, r, n) => co(e3, "xAxis", t, n), Ex = (e3, t, r, n) => ho(e3, "yAxis", r, n), Ax = (e3, t, r, n) => co(e3, "yAxis", r, n), pL = O([et, Ox, Ex, Mx, Ax], (e3, t, r, n, i) => ye(e3, "xAxis") ? bn(t, n, false) : bn(r, i, false)), mL = (e3, t, r, n, i) => i;
function gL(e3) {
  return e3.type === "line";
}
var yL = O([yh, mL], (e3, t) => e3.filter(gL).find((r) => r.id === t)), bL = O([et, Ox, Ex, Mx, Ax, yL, pL, Di], (e3, t, r, n, i, s, a, o) => {
  var { chartData: l, dataStartIndex: u, dataEndIndex: c } = o;
  if (!(s == null || t == null || r == null || n == null || i == null || n.length === 0 || i.length === 0 || a == null || e3 !== "horizontal" && e3 !== "vertical")) {
    var { dataKey: h, data: f } = s, d;
    if (f != null && f.length > 0 ? d = f : d = l == null ? void 0 : l.slice(u, c + 1), d != null) return zL({ layout: e3, xAxis: t, yAxis: r, xAxisTicks: n, yAxisTicks: i, dataKey: h, bandSize: a, displayedData: d });
  }
});
function Cx(e3) {
  var t = Pa(e3), r = 3, n = 2;
  if (t != null) {
    var { r: i, strokeWidth: s } = t, a = Number(i), o = Number(s);
    return (Number.isNaN(a) || a < 0) && (a = r), (Number.isNaN(o) || o < 0) && (o = n), { r: a, strokeWidth: o };
  }
  return { r, strokeWidth: n };
}
var wL = ["id"], xL = ["type", "layout", "connectNulls", "needClip", "shape"], PL = ["activeDot", "animateNewValues", "animationBegin", "animationDuration", "animationEasing", "connectNulls", "dot", "hide", "isAnimationActive", "label", "legendType", "xAxisId", "yAxisId", "id"];
function Pi() {
  return Pi = Object.assign ? Object.assign.bind() : function(e3) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e3[n] = r[n]);
    }
    return e3;
  }, Pi.apply(null, arguments);
}
function Om(e3, t) {
  var r = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e3);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e3, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function _e(e3) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Om(Object(r), true).forEach(function(n) {
      SL(e3, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(r)) : Om(Object(r)).forEach(function(n) {
      Object.defineProperty(e3, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e3;
}
function SL(e3, t, r) {
  return (t = _L(t)) in e3 ? Object.defineProperty(e3, t, { value: r, enumerable: true, configurable: true, writable: true }) : e3[t] = r, e3;
}
function _L(e3) {
  var t = OL(e3, "string");
  return typeof t == "symbol" ? t : t + "";
}
function OL(e3, t) {
  if (typeof e3 != "object" || !e3) return e3;
  var r = e3[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e3, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e3);
}
function Fh(e3, t) {
  if (e3 == null) return {};
  var r, n, i = ML(e3, t);
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(e3);
    for (n = 0; n < s.length; n++) r = s[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e3, r) && (i[r] = e3[r]);
  }
  return i;
}
function ML(e3, t) {
  if (e3 == null) return {};
  var r = {};
  for (var n in e3) if ({}.hasOwnProperty.call(e3, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e3[n];
  }
  return r;
}
var EL = (e3) => {
  var { dataKey: t, name: r, stroke: n, legendType: i, hide: s } = e3;
  return [{ inactive: s, dataKey: t, type: i, color: n, value: Ra(r, t), payload: e3 }];
}, AL = g.memo((e3) => {
  var { dataKey: t, data: r, stroke: n, strokeWidth: i, fill: s, name: a, hide: o, unit: l, tooltipType: u, id: c } = e3, h = { dataDefinedOnItem: r, getPosition: qr, settings: { stroke: n, strokeWidth: i, fill: s, dataKey: t, nameKey: void 0, name: Ra(a, t), hide: o, type: u, color: n, unit: l, graphicalItemId: c } };
  return g.createElement(cx, { tooltipEntrySettings: h });
}), jx = (e3, t) => "".concat(t, "px ").concat(e3, "px");
function CL(e3, t) {
  for (var r = e3.length % 2 !== 0 ? [...e3, 0] : e3, n = [], i = 0; i < t; ++i) n.push(...r);
  return n;
}
var jL = (e3, t, r) => {
  var n = r.reduce((f, d) => f + d, 0);
  if (!n) return jx(t, e3);
  for (var i = Math.floor(e3 / n), s = e3 % n, a = [], o = 0, l = 0; o < r.length; l += (u = r[o]) !== null && u !== void 0 ? u : 0, ++o) {
    var u, c = r[o];
    if (c != null && l + c > s) {
      a = [...r.slice(0, o), s - l];
      break;
    }
  }
  var h = a.length % 2 === 0 ? [0, t] : [t];
  return [...CL(r, i), ...a, ...h].map((f) => "".concat(f, "px")).join(", ");
};
function kL(e3) {
  var { clipPathId: t, points: r, props: n } = e3, { dot: i, dataKey: s, needClip: a } = n, { id: o } = n, l = Fh(n, wL), u = ue(l);
  return g.createElement(px, { points: r, dot: i, className: "recharts-line-dots", dotClassName: "recharts-line-dot", dataKey: s, baseProps: u, needClip: a, clipPathId: t });
}
function IL(e3) {
  var { showLabels: t, children: r, points: n } = e3, i = g.useMemo(() => n == null ? void 0 : n.map((s) => {
    var a, o, l = { x: (a = s.x) !== null && a !== void 0 ? a : 0, y: (o = s.y) !== null && o !== void 0 ? o : 0, width: 0, lowerWidth: 0, upperWidth: 0, height: 0 };
    return _e(_e({}, l), {}, { value: s.value, payload: s.payload, viewBox: l, parentViewBox: void 0, fill: void 0 });
  }), [n]);
  return g.createElement(sx, { value: t ? i : void 0 }, r);
}
function Mm(e3) {
  var { clipPathId: t, pathRef: r, points: n, strokeDasharray: i, props: s } = e3, { type: a, layout: o, connectNulls: l, needClip: u, shape: c } = s, h = Fh(s, xL), f = _e(_e({}, Tt(h)), {}, { fill: "none", className: "recharts-line-curve", clipPath: u ? "url(#clipPath-".concat(t, ")") : void 0, points: n, type: a, layout: o, connectNulls: l, strokeDasharray: i ?? s.strokeDasharray });
  return g.createElement(g.Fragment, null, (n == null ? void 0 : n.length) > 1 && g.createElement(SD, Pi({ shapeType: "curve", option: c }, f, { pathRef: r })), g.createElement(kL, { points: n, clipPathId: t, props: s }));
}
function TL(e3) {
  try {
    return e3 && e3.getTotalLength && e3.getTotalLength() || 0;
  } catch {
    return 0;
  }
}
function NL(e3) {
  var { clipPathId: t, props: r, pathRef: n, previousPointsRef: i, longestAnimatedLengthRef: s } = e3, { points: a, strokeDasharray: o, isAnimationActive: l, animationBegin: u, animationDuration: c, animationEasing: h, animateNewValues: f, width: d, height: v, onAnimationEnd: p, onAnimationStart: m } = r, y = i.current, b = Ya(a, "recharts-line-"), w = g.useRef(b), [x, P] = g.useState(false), S = !x, _ = g.useCallback(() => {
    typeof p == "function" && p(), P(false);
  }, [p]), M = g.useCallback(() => {
    typeof m == "function" && m(), P(true);
  }, [m]), A = TL(n.current), j = g.useRef(0);
  w.current !== b && (j.current = s.current, w.current = b);
  var k = j.current;
  return g.createElement(IL, { points: a, showLabels: S }, r.children, g.createElement(Va, { animationId: b, begin: u, duration: c, isActive: l, easing: h, onAnimationEnd: _, onAnimationStart: M, key: b }, (E) => {
    var $ = ut(k, A + k, E), R = Math.min($, A), B;
    if (l) if (o) {
      var H = "".concat(o).split(/[,\s]+/gim).map((F) => parseFloat(F));
      B = jL(R, A, H);
    } else B = jx(A, R);
    else B = o == null ? void 0 : String(o);
    if (E > 0 && A > 0 && (i.current = a, s.current = Math.max(s.current, R)), y) {
      var W = y.length / a.length, G = E === 1 ? a : a.map((F, q) => {
        var Lt = Math.floor(q * W);
        if (y[Lt]) {
          var st = y[Lt];
          return _e(_e({}, F), {}, { x: ut(st.x, F.x, E), y: ut(st.y, F.y, E) });
        }
        return f ? _e(_e({}, F), {}, { x: ut(d * 2, F.x, E), y: ut(v / 2, F.y, E) }) : _e(_e({}, F), {}, { x: F.x, y: F.y });
      });
      return i.current = G, g.createElement(Mm, { props: r, points: G, clipPathId: t, pathRef: n, strokeDasharray: B });
    }
    return g.createElement(Mm, { props: r, points: a, clipPathId: t, pathRef: n, strokeDasharray: B });
  }), g.createElement(ox, { label: r.label }));
}
function DL(e3) {
  var { clipPathId: t, props: r } = e3, n = g.useRef(null), i = g.useRef(0), s = g.useRef(null);
  return g.createElement(NL, { props: r, clipPathId: t, previousPointsRef: n, longestAnimatedLengthRef: i, pathRef: s });
}
var LL = (e3, t) => {
  var r, n;
  return { x: (r = e3.x) !== null && r !== void 0 ? r : void 0, y: (n = e3.y) !== null && n !== void 0 ? n : void 0, value: e3.value, errorVal: ct(e3.payload, t) };
};
class RL extends g.Component {
  render() {
    var { hide: t, dot: r, points: n, className: i, xAxisId: s, yAxisId: a, top: o, left: l, width: u, height: c, id: h, needClip: f, zIndex: d } = this.props;
    if (t) return null;
    var v = X("recharts-line", i), p = h, { r: m, strokeWidth: y } = Cx(r), b = Rh(r), w = m * 2 + y, x = f ? "url(#clipPath-".concat(b ? "" : "dots-").concat(p, ")") : void 0;
    return g.createElement(Ne, { zIndex: d }, g.createElement(te, { className: v }, f && g.createElement("defs", null, g.createElement(_x, { clipPathId: p, xAxisId: s, yAxisId: a }), !b && g.createElement("clipPath", { id: "clipPath-dots-".concat(p) }, g.createElement("rect", { x: l - w / 2, y: o - w / 2, width: u + w, height: c + w }))), g.createElement(vL, { xAxisId: s, yAxisId: a, data: n, dataPointFormatter: LL, errorBarOffset: 0 }, g.createElement(DL, { props: this.props, clipPathId: p }))), g.createElement(rc, { activeDot: this.props.activeDot, points: n, mainColor: this.props.stroke, itemDataKey: this.props.dataKey, clipPath: x }));
  }
}
var kx = { activeDot: true, animateNewValues: true, animationBegin: 0, animationDuration: 1500, animationEasing: "ease", connectNulls: false, dot: true, fill: "#fff", hide: false, isAnimationActive: "auto", label: false, legendType: "line", stroke: "#3182bd", strokeWidth: 1, xAxisId: 0, yAxisId: 0, zIndex: It.line, type: "linear" };
function $L(e3) {
  var t = Bt(e3, kx), { activeDot: r, animateNewValues: n, animationBegin: i, animationDuration: s, animationEasing: a, connectNulls: o, dot: l, hide: u, isAnimationActive: c, label: h, legendType: f, xAxisId: d, yAxisId: v, id: p } = t, m = Fh(t, PL), { needClip: y } = Bh(d, v), b = fo(), w = Vr(), x = Dt(), P = z((j) => bL(j, d, v, x, p));
  if (w !== "horizontal" && w !== "vertical" || P == null || b == null) return null;
  var { height: S, width: _, x: M, y: A } = b;
  return g.createElement(RL, Pi({}, m, { id: p, connectNulls: o, dot: l, activeDot: r, animateNewValues: n, animationBegin: i, animationDuration: s, animationEasing: a, isAnimationActive: c, hide: u, label: h, legendType: f, xAxisId: d, yAxisId: v, points: P, layout: w, height: S, width: _, left: M, top: A, needClip: y }));
}
function zL(e3) {
  var { layout: t, xAxis: r, yAxis: n, xAxisTicks: i, yAxisTicks: s, dataKey: a, bandSize: o, displayedData: l } = e3;
  return l.map((u, c) => {
    var h = ct(u, a);
    if (t === "horizontal") {
      var f = $s({ axis: r, ticks: i, bandSize: o, entry: u, index: c }), d = mt(h) ? null : n.scale.map(h);
      return { x: f, y: d ?? null, value: h, payload: u };
    }
    var v = mt(h) ? null : r.scale.map(h), p = $s({ axis: n, ticks: s, bandSize: o, entry: u, index: c });
    return v == null || p == null ? null : { x: v, y: p, value: h, payload: u };
  }).filter(Boolean);
}
function BL(e3) {
  var t = Bt(e3, kx), r = Dt();
  return g.createElement(fx, { id: t.id, type: "line" }, (n) => g.createElement(g.Fragment, null, g.createElement(hx, { legendPayload: EL(t) }), g.createElement(AL, { dataKey: t.dataKey, data: t.data, stroke: t.stroke, strokeWidth: t.strokeWidth, fill: t.fill, name: t.name, hide: t.hide, unit: t.unit, tooltipType: t.tooltipType, id: n }), g.createElement(vx, { type: "line", id: n, data: t.data, xAxisId: t.xAxisId, yAxisId: t.yAxisId, zAxisId: 0, dataKey: t.dataKey, hide: t.hide, isPanorama: r }), g.createElement($L, Pi({}, t, { id: n }))));
}
var FL = g.memo(BL, Ti);
FL.displayName = "Line";
function Wh(e3, t) {
  var r, n;
  return (r = (n = e3.graphicalItems.cartesianItems.find((i) => i.id === t)) === null || n === void 0 ? void 0 : n.xAxisId) !== null && r !== void 0 ? r : mx;
}
function Kh(e3, t) {
  var r, n;
  return (r = (n = e3.graphicalItems.cartesianItems.find((i) => i.id === t)) === null || n === void 0 ? void 0 : n.yAxisId) !== null && r !== void 0 ? r : mx;
}
var Ix = (e3, t, r) => ho(e3, "xAxis", Wh(e3, t), r), Tx = (e3, t, r) => co(e3, "xAxis", Wh(e3, t), r), Nx = (e3, t, r) => ho(e3, "yAxis", Kh(e3, t), r), Dx = (e3, t, r) => co(e3, "yAxis", Kh(e3, t), r), WL = O([et, Ix, Nx, Tx, Dx], (e3, t, r, n, i) => ye(e3, "xAxis") ? bn(t, n, false) : bn(r, i, false)), KL = (e3, t) => t, Lx = O([yh, KL], (e3, t) => e3.filter((r) => r.type === "area").find((r) => r.id === t)), Rx = (e3) => {
  var t = et(e3), r = ye(t, "xAxis");
  return r ? "yAxis" : "xAxis";
}, UL = (e3, t) => {
  var r = Rx(e3);
  return r === "yAxis" ? Kh(e3, t) : Wh(e3, t);
}, qL = (e3, t, r) => Gb(e3, Rx(e3), UL(e3, t), r), VL = O([Lx, qL], (e3, t) => {
  var r;
  if (!(e3 == null || t == null)) {
    var { stackId: n } = e3, i = Uc(e3);
    if (!(n == null || i == null)) {
      var s = (r = t[n]) === null || r === void 0 ? void 0 : r.stackedData, a = s == null ? void 0 : s.find((o) => o.key === i);
      if (a != null) return a.map((o) => [o[0], o[1]]);
    }
  }
}), YL = O([et, Ix, Nx, Tx, Dx, VL, DE, WL, Lx, UE], (e3, t, r, n, i, s, a, o, l, u) => {
  var { chartData: c, dataStartIndex: h, dataEndIndex: f } = a;
  if (!(l == null || e3 !== "horizontal" && e3 !== "vertical" || t == null || r == null || n == null || i == null || n.length === 0 || i.length === 0 || o == null)) {
    var { data: d } = l, v;
    if (d && d.length > 0 ? v = d : v = c == null ? void 0 : c.slice(h, f + 1), v != null) return dR({ layout: e3, xAxis: t, yAxis: r, xAxisTicks: n, yAxisTicks: i, dataStartIndex: h, areaSettings: l, stackedData: s, displayedData: v, chartBaseValue: u, bandSize: o });
  }
}), HL = ["id"], GL = ["activeDot", "animationBegin", "animationDuration", "animationEasing", "connectNulls", "dot", "fill", "fillOpacity", "hide", "isAnimationActive", "legendType", "stroke", "xAxisId", "yAxisId"];
function kr() {
  return kr = Object.assign ? Object.assign.bind() : function(e3) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e3[n] = r[n]);
    }
    return e3;
  }, kr.apply(null, arguments);
}
function $x(e3, t) {
  if (e3 == null) return {};
  var r, n, i = XL(e3, t);
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(e3);
    for (n = 0; n < s.length; n++) r = s[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e3, r) && (i[r] = e3[r]);
  }
  return i;
}
function XL(e3, t) {
  if (e3 == null) return {};
  var r = {};
  for (var n in e3) if ({}.hasOwnProperty.call(e3, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e3[n];
  }
  return r;
}
function Em(e3, t) {
  var r = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e3);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e3, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function un(e3) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Em(Object(r), true).forEach(function(n) {
      JL(e3, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(r)) : Em(Object(r)).forEach(function(n) {
      Object.defineProperty(e3, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e3;
}
function JL(e3, t, r) {
  return (t = ZL(t)) in e3 ? Object.defineProperty(e3, t, { value: r, enumerable: true, configurable: true, writable: true }) : e3[t] = r, e3;
}
function ZL(e3) {
  var t = QL(e3, "string");
  return typeof t == "symbol" ? t : t + "";
}
function QL(e3, t) {
  if (typeof e3 != "object" || !e3) return e3;
  var r = e3[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e3, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e3);
}
function pa(e3, t) {
  return e3 && e3 !== "none" ? e3 : t;
}
var tR = (e3) => {
  var { dataKey: t, name: r, stroke: n, fill: i, legendType: s, hide: a } = e3;
  return [{ inactive: a, dataKey: t, type: s, color: pa(n, i), value: Ra(r, t), payload: e3 }];
}, eR = g.memo((e3) => {
  var { dataKey: t, data: r, stroke: n, strokeWidth: i, fill: s, name: a, hide: o, unit: l, tooltipType: u, id: c } = e3, h = { dataDefinedOnItem: r, getPosition: qr, settings: { stroke: n, strokeWidth: i, fill: s, dataKey: t, nameKey: void 0, name: Ra(a, t), hide: o, type: u, color: pa(n, s), unit: l, graphicalItemId: c } };
  return g.createElement(cx, { tooltipEntrySettings: h });
});
function rR(e3) {
  var { clipPathId: t, points: r, props: n } = e3, { needClip: i, dot: s, dataKey: a } = n, o = ue(n);
  return g.createElement(px, { points: r, dot: s, className: "recharts-area-dots", dotClassName: "recharts-area-dot", dataKey: a, baseProps: o, needClip: i, clipPathId: t });
}
function nR(e3) {
  var { showLabels: t, children: r, points: n } = e3, i = n.map((s) => {
    var a, o, l = { x: (a = s.x) !== null && a !== void 0 ? a : 0, y: (o = s.y) !== null && o !== void 0 ? o : 0, width: 0, lowerWidth: 0, upperWidth: 0, height: 0 };
    return un(un({}, l), {}, { value: s.value, payload: s.payload, parentViewBox: void 0, viewBox: l, fill: void 0 });
  });
  return g.createElement(sx, { value: t ? i : void 0 }, r);
}
function Am(e3) {
  var { points: t, baseLine: r, needClip: n, clipPathId: i, props: s } = e3, { layout: a, type: o, stroke: l, connectNulls: u, isRange: c } = s, { id: h } = s, f = $x(s, HL), d = ue(f), v = Tt(f);
  return g.createElement(g.Fragment, null, (t == null ? void 0 : t.length) > 1 && g.createElement(te, { clipPath: n ? "url(#clipPath-".concat(i, ")") : void 0 }, g.createElement(ti, kr({}, v, { id: h, points: t, connectNulls: u, type: o, baseLine: r, layout: a, stroke: "none", className: "recharts-area-area" })), l !== "none" && g.createElement(ti, kr({}, d, { className: "recharts-area-curve", layout: a, type: o, connectNulls: u, fill: "none", points: t })), l !== "none" && c && Array.isArray(r) && g.createElement(ti, kr({}, d, { className: "recharts-area-curve", layout: a, type: o, connectNulls: u, fill: "none", points: r }))), g.createElement(rR, { points: t, props: f, clipPathId: i }));
}
function iR(e3) {
  var t, r, { alpha: n, baseLine: i, points: s, strokeWidth: a } = e3, o = (t = s[0]) === null || t === void 0 ? void 0 : t.y, l = (r = s[s.length - 1]) === null || r === void 0 ? void 0 : r.y;
  if (!K(o) || !K(l)) return null;
  var u = n * Math.abs(o - l), c = Math.max(...s.map((h) => h.x || 0));
  return L(i) ? c = Math.max(i, c) : i && Array.isArray(i) && i.length && (c = Math.max(...i.map((h) => h.x || 0), c)), L(c) ? g.createElement("rect", { x: 0, y: o < l ? o : o - u, width: c + (a ? parseInt("".concat(a), 10) : 1), height: Math.floor(u) }) : null;
}
function sR(e3) {
  var t, r, { alpha: n, baseLine: i, points: s, strokeWidth: a } = e3, o = (t = s[0]) === null || t === void 0 ? void 0 : t.x, l = (r = s[s.length - 1]) === null || r === void 0 ? void 0 : r.x;
  if (!K(o) || !K(l)) return null;
  var u = n * Math.abs(o - l), c = Math.max(...s.map((h) => h.y || 0));
  return L(i) ? c = Math.max(i, c) : i && Array.isArray(i) && i.length && (c = Math.max(...i.map((h) => h.y || 0), c)), L(c) ? g.createElement("rect", { x: o < l ? o : o - u, y: 0, width: u, height: Math.floor(c + (a ? parseInt("".concat(a), 10) : 1)) }) : null;
}
function aR(e3) {
  var { alpha: t, layout: r, points: n, baseLine: i, strokeWidth: s } = e3;
  return r === "vertical" ? g.createElement(iR, { alpha: t, points: n, baseLine: i, strokeWidth: s }) : g.createElement(sR, { alpha: t, points: n, baseLine: i, strokeWidth: s });
}
function oR(e3) {
  var { needClip: t, clipPathId: r, props: n, previousPointsRef: i, previousBaselineRef: s } = e3, { points: a, baseLine: o, isAnimationActive: l, animationBegin: u, animationDuration: c, animationEasing: h, onAnimationStart: f, onAnimationEnd: d } = n, v = g.useMemo(() => ({ points: a, baseLine: o }), [a, o]), p = Ya(v, "recharts-area-"), m = kc(), [y, b] = g.useState(false), w = !y, x = g.useCallback(() => {
    typeof d == "function" && d(), b(false);
  }, [d]), P = g.useCallback(() => {
    typeof f == "function" && f(), b(true);
  }, [f]);
  if (m == null) return null;
  var S = i.current, _ = s.current;
  return g.createElement(nR, { showLabels: w, points: a }, n.children, g.createElement(Va, { animationId: p, begin: u, duration: c, isActive: l, easing: h, onAnimationEnd: x, onAnimationStart: P, key: p }, (M) => {
    if (S) {
      var A = S.length / a.length, j = M === 1 ? a : a.map((E, $) => {
        var R = Math.floor($ * A);
        if (S[R]) {
          var B = S[R];
          return un(un({}, E), {}, { x: ut(B.x, E.x, M), y: ut(B.y, E.y, M) });
        }
        return E;
      }), k;
      return L(o) ? k = ut(_, o, M) : mt(o) || Ce(o) ? k = ut(_, 0, M) : k = o.map((E, $) => {
        var R = Math.floor($ * A);
        if (Array.isArray(_) && _[R]) {
          var B = _[R];
          return un(un({}, E), {}, { x: ut(B.x, E.x, M), y: ut(B.y, E.y, M) });
        }
        return E;
      }), M > 0 && (i.current = j, s.current = k), g.createElement(Am, { points: j, baseLine: k, needClip: t, clipPathId: r, props: n });
    }
    return M > 0 && (i.current = a, s.current = o), g.createElement(te, null, l && g.createElement("defs", null, g.createElement("clipPath", { id: "animationClipPath-".concat(r) }, g.createElement(aR, { alpha: M, points: a, baseLine: o, layout: m, strokeWidth: n.strokeWidth }))), g.createElement(te, { clipPath: "url(#animationClipPath-".concat(r, ")") }, g.createElement(Am, { points: a, baseLine: o, needClip: t, clipPathId: r, props: n })));
  }), g.createElement(ox, { label: n.label }));
}
function lR(e3) {
  var { needClip: t, clipPathId: r, props: n } = e3, i = g.useRef(null), s = g.useRef();
  return g.createElement(oR, { needClip: t, clipPathId: r, props: n, previousPointsRef: i, previousBaselineRef: s });
}
class uR extends g.PureComponent {
  render() {
    var { hide: t, dot: r, points: n, className: i, top: s, left: a, needClip: o, xAxisId: l, yAxisId: u, width: c, height: h, id: f, baseLine: d, zIndex: v } = this.props;
    if (t) return null;
    var p = X("recharts-area", i), m = f, { r: y, strokeWidth: b } = Cx(r), w = Rh(r), x = y * 2 + b, P = o ? "url(#clipPath-".concat(w ? "" : "dots-").concat(m, ")") : void 0;
    return g.createElement(Ne, { zIndex: v }, g.createElement(te, { className: p }, o && g.createElement("defs", null, g.createElement(_x, { clipPathId: m, xAxisId: l, yAxisId: u }), !w && g.createElement("clipPath", { id: "clipPath-dots-".concat(m) }, g.createElement("rect", { x: a - x / 2, y: s - x / 2, width: c + x, height: h + x }))), g.createElement(lR, { needClip: o, clipPathId: m, props: this.props })), g.createElement(rc, { points: n, mainColor: pa(this.props.stroke, this.props.fill), itemDataKey: this.props.dataKey, activeDot: this.props.activeDot, clipPath: P }), this.props.isRange && Array.isArray(d) && g.createElement(rc, { points: d, mainColor: pa(this.props.stroke, this.props.fill), itemDataKey: this.props.dataKey, activeDot: this.props.activeDot, clipPath: P }));
  }
}
var cR = { activeDot: true, animationBegin: 0, animationDuration: 1500, animationEasing: "ease", connectNulls: false, dot: false, fill: "#3182bd", fillOpacity: 0.6, hide: false, isAnimationActive: "auto", legendType: "line", stroke: "#3182bd", strokeWidth: 1, type: "linear", label: false, xAxisId: 0, yAxisId: 0, zIndex: It.area };
function hR(e3) {
  var t, { activeDot: r, animationBegin: n, animationDuration: i, animationEasing: s, connectNulls: a, dot: o, fill: l, fillOpacity: u, hide: c, isAnimationActive: h, legendType: f, stroke: d, xAxisId: v, yAxisId: p } = e3, m = $x(e3, GL), y = Vr(), b = zw(), { needClip: w } = Bh(v, p), x = Dt(), { points: P, isRange: S, baseLine: _ } = (t = z(($) => YL($, e3.id, x))) !== null && t !== void 0 ? t : {}, M = fo();
  if (y !== "horizontal" && y !== "vertical" || M == null || b !== "AreaChart" && b !== "ComposedChart") return null;
  var { height: A, width: j, x: k, y: E } = M;
  return !P || !P.length ? null : g.createElement(uR, kr({}, m, { activeDot: r, animationBegin: n, animationDuration: i, animationEasing: s, baseLine: _, connectNulls: a, dot: o, fill: l, fillOpacity: u, height: A, hide: c, layout: y, isAnimationActive: h, isRange: S, legendType: f, needClip: w, points: P, stroke: d, width: j, left: k, top: E, xAxisId: v, yAxisId: p }));
}
var fR = (e3, t, r, n, i) => {
  var s = r ?? t;
  if (L(s)) return s;
  var a = e3 === "horizontal" ? i : n, o = a.scale.domain();
  if (a.type === "number") {
    var l = Math.max(o[0], o[1]), u = Math.min(o[0], o[1]);
    return s === "dataMin" ? u : s === "dataMax" || l < 0 ? l : Math.max(Math.min(o[0], o[1]), 0);
  }
  return s === "dataMin" ? o[0] : s === "dataMax" ? o[1] : o[0];
};
function dR(e3) {
  var { areaSettings: { connectNulls: t, baseValue: r, dataKey: n }, stackedData: i, layout: s, chartBaseValue: a, xAxis: o, yAxis: l, displayedData: u, dataStartIndex: c, xAxisTicks: h, yAxisTicks: f, bandSize: d } = e3, v = i && i.length, p = fR(s, a, r, o, l), m = s === "horizontal", y = false, b = u.map((x, P) => {
    var S, _, M, A;
    if (v) A = i[c + P];
    else {
      var j = ct(x, n);
      Array.isArray(j) ? (A = j, y = true) : A = [p, j];
    }
    var k = (S = (_ = A) === null || _ === void 0 ? void 0 : _[1]) !== null && S !== void 0 ? S : null, E = k == null || v && !t && ct(x, n) == null;
    if (m) {
      var $;
      return { x: $s({ axis: o, ticks: h, bandSize: d, entry: x, index: P }), y: E ? null : ($ = l.scale.map(k)) !== null && $ !== void 0 ? $ : null, value: A, payload: x };
    }
    return { x: E ? null : (M = o.scale.map(k)) !== null && M !== void 0 ? M : null, y: $s({ axis: l, ticks: f, bandSize: d, entry: x, index: P }), value: A, payload: x };
  }), w;
  return v || y ? w = b.map((x) => {
    var P, S = Array.isArray(x.value) ? x.value[0] : null;
    if (m) {
      var _;
      return { x: x.x, y: S != null && x.y != null && (_ = l.scale.map(S)) !== null && _ !== void 0 ? _ : null, payload: x.payload };
    }
    return { x: S != null && (P = o.scale.map(S)) !== null && P !== void 0 ? P : null, y: x.y, payload: x.payload };
  }) : w = m ? l.scale.map(p) : o.scale.map(p), { points: b, baseLine: w ?? 0, isRange: y };
}
function vR(e3) {
  var t = Bt(e3, cR), r = Dt();
  return g.createElement(fx, { id: t.id, type: "area" }, (n) => g.createElement(g.Fragment, null, g.createElement(hx, { legendPayload: tR(t) }), g.createElement(eR, { dataKey: t.dataKey, data: t.data, stroke: t.stroke, strokeWidth: t.strokeWidth, fill: t.fill, name: t.name, hide: t.hide, unit: t.unit, tooltipType: t.tooltipType, id: n }), g.createElement(vx, { type: "area", id: n, data: t.data, dataKey: t.dataKey, xAxisId: t.xAxisId, yAxisId: t.yAxisId, zAxisId: 0, stackId: K_(t.stackId), hide: t.hide, barSize: void 0, baseValue: t.baseValue, isPanorama: r, connectNulls: t.connectNulls }), g.createElement(hR, kr({}, t, { id: n }))));
}
var pR = g.memo(vR, Ti);
pR.displayName = "Area";
var mR = ["domain", "range"], gR = ["domain", "range"];
function Cm(e3, t) {
  if (e3 == null) return {};
  var r, n, i = yR(e3, t);
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(e3);
    for (n = 0; n < s.length; n++) r = s[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e3, r) && (i[r] = e3[r]);
  }
  return i;
}
function yR(e3, t) {
  if (e3 == null) return {};
  var r = {};
  for (var n in e3) if ({}.hasOwnProperty.call(e3, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e3[n];
  }
  return r;
}
function jm(e3, t) {
  return e3 === t ? true : Array.isArray(e3) && e3.length === 2 && Array.isArray(t) && t.length === 2 ? e3[0] === t[0] && e3[1] === t[1] : false;
}
function zx(e3, t) {
  if (e3 === t) return true;
  var { domain: r, range: n } = e3, i = Cm(e3, mR), { domain: s, range: a } = t, o = Cm(t, gR);
  return !jm(r, s) || !jm(n, a) ? false : Ti(i, o);
}
var bR = ["type"], wR = ["dangerouslySetInnerHTML", "ticks", "scale"], xR = ["id", "scale"];
function nc() {
  return nc = Object.assign ? Object.assign.bind() : function(e3) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e3[n] = r[n]);
    }
    return e3;
  }, nc.apply(null, arguments);
}
function km(e3, t) {
  var r = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e3);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e3, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Im(e3) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? km(Object(r), true).forEach(function(n) {
      PR(e3, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(r)) : km(Object(r)).forEach(function(n) {
      Object.defineProperty(e3, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e3;
}
function PR(e3, t, r) {
  return (t = SR(t)) in e3 ? Object.defineProperty(e3, t, { value: r, enumerable: true, configurable: true, writable: true }) : e3[t] = r, e3;
}
function SR(e3) {
  var t = _R(e3, "string");
  return typeof t == "symbol" ? t : t + "";
}
function _R(e3, t) {
  if (typeof e3 != "object" || !e3) return e3;
  var r = e3[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e3, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e3);
}
function ic(e3, t) {
  if (e3 == null) return {};
  var r, n, i = OR(e3, t);
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(e3);
    for (n = 0; n < s.length; n++) r = s[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e3, r) && (i[r] = e3[r]);
  }
  return i;
}
function OR(e3, t) {
  if (e3 == null) return {};
  var r = {};
  for (var n in e3) if ({}.hasOwnProperty.call(e3, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e3[n];
  }
  return r;
}
function MR(e3) {
  var t = ft(), r = g.useRef(null), n = kc(), { type: i } = e3, s = ic(e3, bR), a = Xa(n, "xAxis", i), o = g.useMemo(() => {
    if (a != null) return Im(Im({}, s), {}, { type: a });
  }, [s, a]);
  return g.useLayoutEffect(() => {
    o != null && (r.current === null ? t(VD(o)) : r.current !== o && t(YD({ prev: r.current, next: o })), r.current = o);
  }, [o, t]), g.useLayoutEffect(() => () => {
    r.current && (t(HD(r.current)), r.current = null);
  }, [t]), null;
}
var ER = (e3) => {
  var { xAxisId: t, className: r } = e3, n = z(u0), i = Dt(), s = "xAxis", a = z((y) => mw(y, s, t, i)), o = z((y) => wk(y, t)), l = z((y) => Mk(y, t)), u = z((y) => Lb(y, t));
  if (o == null || l == null || u == null) return null;
  var { dangerouslySetInnerHTML: c, ticks: h, scale: f } = e3, d = ic(e3, wR), { id: v, scale: p } = u, m = ic(u, xR);
  return g.createElement(zh, nc({}, d, m, { x: l.x, y: l.y, width: o.width, height: o.height, className: X("recharts-".concat(s, " ").concat(s), r), viewBox: n, ticks: a, axisType: s, axisId: t }));
}, AR = { allowDataOverflow: dt.allowDataOverflow, allowDecimals: dt.allowDecimals, allowDuplicatedCategory: dt.allowDuplicatedCategory, angle: dt.angle, axisLine: Ke.axisLine, height: dt.height, hide: false, includeHidden: dt.includeHidden, interval: dt.interval, label: false, minTickGap: dt.minTickGap, mirror: dt.mirror, orientation: dt.orientation, padding: dt.padding, reversed: dt.reversed, scale: dt.scale, tick: dt.tick, tickCount: dt.tickCount, tickLine: Ke.tickLine, tickSize: Ke.tickSize, type: dt.type, niceTicks: dt.niceTicks, xAxisId: 0 }, CR = (e3) => {
  var t = Bt(e3, AR);
  return g.createElement(g.Fragment, null, g.createElement(MR, { allowDataOverflow: t.allowDataOverflow, allowDecimals: t.allowDecimals, allowDuplicatedCategory: t.allowDuplicatedCategory, angle: t.angle, dataKey: t.dataKey, domain: t.domain, height: t.height, hide: t.hide, id: t.xAxisId, includeHidden: t.includeHidden, interval: t.interval, minTickGap: t.minTickGap, mirror: t.mirror, name: t.name, orientation: t.orientation, padding: t.padding, reversed: t.reversed, scale: t.scale, tick: t.tick, tickCount: t.tickCount, tickFormatter: t.tickFormatter, ticks: t.ticks, type: t.type, unit: t.unit, niceTicks: t.niceTicks }), g.createElement(ER, t));
}, jR = g.memo(CR, zx);
jR.displayName = "XAxis";
var kR = ["type"], IR = ["dangerouslySetInnerHTML", "ticks", "scale"], TR = ["id", "scale"];
function sc() {
  return sc = Object.assign ? Object.assign.bind() : function(e3) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e3[n] = r[n]);
    }
    return e3;
  }, sc.apply(null, arguments);
}
function Tm(e3, t) {
  var r = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e3);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e3, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Nm(e3) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Tm(Object(r), true).forEach(function(n) {
      NR(e3, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(r)) : Tm(Object(r)).forEach(function(n) {
      Object.defineProperty(e3, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e3;
}
function NR(e3, t, r) {
  return (t = DR(t)) in e3 ? Object.defineProperty(e3, t, { value: r, enumerable: true, configurable: true, writable: true }) : e3[t] = r, e3;
}
function DR(e3) {
  var t = LR(e3, "string");
  return typeof t == "symbol" ? t : t + "";
}
function LR(e3, t) {
  if (typeof e3 != "object" || !e3) return e3;
  var r = e3[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e3, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e3);
}
function ac(e3, t) {
  if (e3 == null) return {};
  var r, n, i = RR(e3, t);
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(e3);
    for (n = 0; n < s.length; n++) r = s[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e3, r) && (i[r] = e3[r]);
  }
  return i;
}
function RR(e3, t) {
  if (e3 == null) return {};
  var r = {};
  for (var n in e3) if ({}.hasOwnProperty.call(e3, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e3[n];
  }
  return r;
}
function $R(e3) {
  var t = ft(), r = g.useRef(null), n = kc(), { type: i } = e3, s = ac(e3, kR), a = Xa(n, "yAxis", i), o = g.useMemo(() => {
    if (a != null) return Nm(Nm({}, s), {}, { type: a });
  }, [a, s]);
  return g.useLayoutEffect(() => {
    o != null && (r.current === null ? t(GD(o)) : r.current !== o && t(XD({ prev: r.current, next: o })), r.current = o);
  }, [o, t]), g.useLayoutEffect(() => () => {
    r.current && (t(JD(r.current)), r.current = null);
  }, [t]), null;
}
function zR(e3) {
  var { yAxisId: t, className: r, width: n, label: i } = e3, s = g.useRef(null), a = g.useRef(null), o = z(u0), l = Dt(), u = ft(), c = "yAxis", h = z((S) => Ck(S, t)), f = z((S) => Ak(S, t)), d = z((S) => mw(S, c, t, l)), v = z((S) => Rb(S, t));
  if (g.useLayoutEffect(() => {
    if (!(n !== "auto" || !h || Lh(i) || g.isValidElement(i) || v == null)) {
      var S = s.current;
      if (S) {
        var _ = S.getCalculatedWidth();
        Math.round(h.width) !== Math.round(_) && u(ZD({ id: t, width: _ }));
      }
    }
  }, [d, h, u, i, t, n, v]), h == null || f == null || v == null) return null;
  var { dangerouslySetInnerHTML: p, ticks: m, scale: y } = e3, b = ac(e3, IR), { id: w, scale: x } = v, P = ac(v, TR);
  return g.createElement(zh, sc({}, b, P, { ref: s, labelRef: a, x: f.x, y: f.y, tickTextProps: n === "auto" ? { width: void 0 } : { width: n }, width: h.width, height: h.height, className: X("recharts-".concat(c, " ").concat(c), r), viewBox: o, ticks: d, axisType: c, axisId: t }));
}
var BR = { allowDataOverflow: vt.allowDataOverflow, allowDecimals: vt.allowDecimals, allowDuplicatedCategory: vt.allowDuplicatedCategory, angle: vt.angle, axisLine: Ke.axisLine, hide: false, includeHidden: vt.includeHidden, interval: vt.interval, label: false, minTickGap: vt.minTickGap, mirror: vt.mirror, orientation: vt.orientation, padding: vt.padding, reversed: vt.reversed, scale: vt.scale, tick: vt.tick, tickCount: vt.tickCount, tickLine: Ke.tickLine, tickSize: Ke.tickSize, type: vt.type, niceTicks: vt.niceTicks, width: vt.width, yAxisId: 0 }, FR = (e3) => {
  var t = Bt(e3, BR);
  return g.createElement(g.Fragment, null, g.createElement($R, { interval: t.interval, id: t.yAxisId, scale: t.scale, type: t.type, domain: t.domain, allowDataOverflow: t.allowDataOverflow, dataKey: t.dataKey, allowDuplicatedCategory: t.allowDuplicatedCategory, allowDecimals: t.allowDecimals, tickCount: t.tickCount, padding: t.padding, includeHidden: t.includeHidden, reversed: t.reversed, ticks: t.ticks, width: t.width, orientation: t.orientation, mirror: t.mirror, hide: t.hide, unit: t.unit, name: t.name, angle: t.angle, minTickGap: t.minTickGap, tick: t.tick, tickFormatter: t.tickFormatter, niceTicks: t.niceTicks }), g.createElement(zR, t));
}, WR = g.memo(FR, zx);
WR.displayName = "YAxis";
var KR = (e3, t) => t, Uh = O([KR, et, Z0, xt, Tw, Qe, JI, At], iT);
function UR(e3) {
  return "getBBox" in e3.currentTarget && typeof e3.currentTarget.getBBox == "function";
}
function qh(e3) {
  var t = e3.currentTarget.getBoundingClientRect(), r, n;
  if (UR(e3)) {
    var i = e3.currentTarget.getBBox();
    r = i.width > 0 ? t.width / i.width : 1, n = i.height > 0 ? t.height / i.height : 1;
  } else {
    var s = e3.currentTarget;
    r = s.offsetWidth > 0 ? t.width / s.offsetWidth : 1, n = s.offsetHeight > 0 ? t.height / s.offsetHeight : 1;
  }
  var a = (o, l) => ({ relativeX: Math.round((o - t.left) / r), relativeY: Math.round((l - t.top) / n) });
  return "touches" in e3 ? Array.from(e3.touches).map((o) => a(o.clientX, o.clientY)) : a(e3.clientX, e3.clientY);
}
var Bx = ee("mouseClick"), Fx = Ci();
Fx.startListening({ actionCreator: Bx, effect: (e3, t) => {
  var r = e3.payload, n = Uh(t.getState(), qh(r));
  (n == null ? void 0 : n.activeIndex) != null && t.dispatch(Uk({ activeIndex: n.activeIndex, activeDataKey: void 0, activeCoordinate: n.activeCoordinate }));
} });
var oc = ee("mouseMove"), Wx = Ci(), en = null, gr = null, Xl = null;
Wx.startListening({ actionCreator: oc, effect: (e3, t) => {
  var r = e3.payload, n = t.getState(), { throttleDelay: i, throttledEvents: s } = n.eventSettings, a = s === "all" || (s == null ? void 0 : s.includes("mousemove"));
  en !== null && (cancelAnimationFrame(en), en = null), gr !== null && (typeof i != "number" || !a) && (clearTimeout(gr), gr = null), Xl = qh(r);
  var o = () => {
    var l = t.getState(), u = Ki(l, l.tooltip.settings.shared);
    if (!Xl) {
      en = null, gr = null;
      return;
    }
    if (u === "axis") {
      var c = Uh(l, Xl);
      (c == null ? void 0 : c.activeIndex) != null ? t.dispatch(Sw({ activeIndex: c.activeIndex, activeDataKey: void 0, activeCoordinate: c.activeCoordinate })) : t.dispatch(Pw());
    }
    en = null, gr = null;
  };
  if (!a) {
    o();
    return;
  }
  i === "raf" ? en = requestAnimationFrame(o) : typeof i == "number" && gr === null && (gr = setTimeout(o, i));
} });
function qR(e3, t) {
  return t instanceof HTMLElement ? "HTMLElement <".concat(t.tagName, ' class="').concat(t.className, '">') : t === window ? "global.window" : e3 === "children" && typeof t == "object" && t !== null ? "<<CHILDREN>>" : t;
}
var Dm = { accessibilityLayer: true, barCategoryGap: "10%", barGap: 4, barSize: void 0, className: void 0, maxBarSize: void 0, stackOffset: "none", syncId: void 0, syncMethod: "index", baseValue: void 0, reverseStackOrder: false }, Kx = Nt({ name: "rootProps", initialState: Dm, reducers: { updateOptions: (e3, t) => {
  var r;
  e3.accessibilityLayer = t.payload.accessibilityLayer, e3.barCategoryGap = t.payload.barCategoryGap, e3.barGap = (r = t.payload.barGap) !== null && r !== void 0 ? r : Dm.barGap, e3.barSize = t.payload.barSize, e3.maxBarSize = t.payload.maxBarSize, e3.stackOffset = t.payload.stackOffset, e3.syncId = t.payload.syncId, e3.syncMethod = t.payload.syncMethod, e3.className = t.payload.className, e3.baseValue = t.payload.baseValue, e3.reverseStackOrder = t.payload.reverseStackOrder;
} } }), VR = Kx.reducer, { updateOptions: YR } = Kx.actions, HR = null, GR = { updatePolarOptions: (e3, t) => e3 === null ? t.payload : (e3.startAngle = t.payload.startAngle, e3.endAngle = t.payload.endAngle, e3.cx = t.payload.cx, e3.cy = t.payload.cy, e3.innerRadius = t.payload.innerRadius, e3.outerRadius = t.payload.outerRadius, e3) }, Ux = Nt({ name: "polarOptions", initialState: HR, reducers: GR }), { updatePolarOptions: KF } = Ux.actions, XR = Ux.reducer, qx = ee("keyDown"), Vx = ee("focus"), Yx = ee("blur"), vo = Ci(), rn = null, yr = null, as = null;
vo.startListening({ actionCreator: qx, effect: (e3, t) => {
  as = e3.payload, rn !== null && (cancelAnimationFrame(rn), rn = null);
  var r = t.getState(), { throttleDelay: n, throttledEvents: i } = r.eventSettings, s = i === "all" || i.includes("keydown");
  yr !== null && (typeof n != "number" || !s) && (clearTimeout(yr), yr = null);
  var a = () => {
    try {
      var o = t.getState(), l = o.rootProps.accessibilityLayer !== false;
      if (!l) return;
      var { keyboardInteraction: u } = o.tooltip, c = as;
      if (c !== "ArrowRight" && c !== "ArrowLeft" && c !== "Enter") return;
      var h = ei(u, zr(o), _n(o), On(o)), f = h == null ? -1 : Number(h), d = !Number.isFinite(f) || f < 0, v = Qe(o), p = zr(o), m = Ki(o, o.tooltip.settings.shared);
      if (c === "Enter") {
        if (d) return;
        var y = ua(o, m, "hover", String(u.index));
        t.dispatch(la({ active: !u.active, activeIndex: u.index, activeCoordinate: y }));
        return;
      }
      var b = Nk(o), w = b === "left-to-right" ? 1 : -1, x = c === "ArrowRight" ? 1 : -1, P;
      if (d) {
        var S = _n(o), _ = On(o), M = x * w, A = (R) => ({ active: false, index: String(R), dataKey: void 0, graphicalItemId: void 0, coordinate: void 0 });
        if (P = -1, M > 0) {
          for (var j = 0; j < p.length; j++) if (ei(A(j), p, S, _) != null) {
            P = j;
            break;
          }
        } else for (var k = p.length - 1; k >= 0; k--) if (ei(A(k), p, S, _) != null) {
          P = k;
          break;
        }
        if (P < 0) return;
      } else {
        P = f + x * w;
        var E = (v == null ? void 0 : v.length) || p.length;
        if (E === 0 || P >= E || P < 0) return;
      }
      var $ = ua(o, m, "hover", String(P));
      t.dispatch(la({ active: true, activeIndex: P.toString(), activeCoordinate: $ }));
    } finally {
      rn = null, yr = null;
    }
  };
  if (!s) {
    a();
    return;
  }
  n === "raf" ? rn = requestAnimationFrame(a) : typeof n == "number" && yr === null && (a(), as = null, yr = setTimeout(() => {
    as ? a() : (yr = null, rn = null);
  }, n));
} });
vo.startListening({ actionCreator: Vx, effect: (e3, t) => {
  var r = t.getState(), n = r.rootProps.accessibilityLayer !== false;
  if (n) {
    var { keyboardInteraction: i } = r.tooltip;
    if (!i.active && i.index == null) {
      var s = "0", a = Ki(r, r.tooltip.settings.shared), o = ua(r, a, "hover", String(s));
      t.dispatch(la({ active: true, activeIndex: s, activeCoordinate: o }));
    }
  }
} });
vo.startListening({ actionCreator: Yx, effect: (e3, t) => {
  var r = t.getState(), n = r.rootProps.accessibilityLayer !== false;
  if (n) {
    var { keyboardInteraction: i } = r.tooltip;
    i.active && t.dispatch(la({ active: false, activeIndex: i.index, activeCoordinate: i.coordinate }));
  }
} });
function Hx(e3) {
  e3.persist();
  var { currentTarget: t } = e3;
  return new Proxy(e3, { get: (r, n) => {
    if (n === "currentTarget") return t;
    var i = Reflect.get(r, n);
    return typeof i == "function" ? i.bind(r) : i;
  } });
}
var se = ee("externalEvent"), Gx = Ci(), os = /* @__PURE__ */ new Map(), Hn = /* @__PURE__ */ new Map(), Jl = /* @__PURE__ */ new Map();
Gx.startListening({ actionCreator: se, effect: (e3, t) => {
  var { handler: r, reactEvent: n } = e3.payload;
  if (r != null) {
    var i = n.type, s = Hx(n);
    Jl.set(i, { handler: r, reactEvent: s });
    var a = os.get(i);
    a !== void 0 && (cancelAnimationFrame(a), os.delete(i));
    var o = t.getState(), { throttleDelay: l, throttledEvents: u } = o.eventSettings, c = u, h = c === "all" || (c == null ? void 0 : c.includes(i)), f = Hn.get(i);
    f !== void 0 && (typeof l != "number" || !h) && (clearTimeout(f), Hn.delete(i));
    var d = () => {
      var m = Jl.get(i);
      try {
        if (!m) return;
        var { handler: y, reactEvent: b } = m, w = t.getState(), x = { activeCoordinate: LI(w), activeDataKey: TI(w), activeIndex: bi(w), activeLabel: Lw(w), activeTooltipIndex: bi(w), isTooltipActive: RI(w) };
        y && y(x, b);
      } finally {
        os.delete(i), Hn.delete(i), Jl.delete(i);
      }
    };
    if (!h) {
      d();
      return;
    }
    if (l === "raf") {
      var v = requestAnimationFrame(d);
      os.set(i, v);
    } else if (typeof l == "number") {
      if (!Hn.has(i)) {
        d();
        var p = setTimeout(d, l);
        Hn.set(i, p);
      }
    } else d();
  }
} });
var JR = O([Ln], (e3) => e3.tooltipItemPayloads), ZR = O([JR, (e3, t) => t, (e3, t, r) => r], (e3, t, r) => {
  if (t != null) {
    var n = e3.find((s) => s.settings.graphicalItemId === r);
    if (n != null) {
      var { getPosition: i } = n;
      if (i != null) return i(t);
    }
  }
}), Xx = ee("touchMove"), Jx = Ci(), br = null, er = null, Lm = null, Gn = null;
Jx.startListening({ actionCreator: Xx, effect: (e3, t) => {
  var r = e3.payload;
  if (!(r.touches == null || r.touches.length === 0)) {
    Gn = Hx(r);
    var n = t.getState(), { throttleDelay: i, throttledEvents: s } = n.eventSettings, a = s === "all" || s.includes("touchmove");
    br !== null && (cancelAnimationFrame(br), br = null), er !== null && (typeof i != "number" || !a) && (clearTimeout(er), er = null), Lm = Array.from(r.touches).map((l) => qh({ clientX: l.clientX, clientY: l.clientY, currentTarget: r.currentTarget }));
    var o = () => {
      if (Gn != null) {
        var l = t.getState(), u = Ki(l, l.tooltip.settings.shared);
        if (u === "axis") {
          var c, h = (c = Lm) === null || c === void 0 ? void 0 : c[0];
          if (h == null) {
            br = null, er = null;
            return;
          }
          var f = Uh(l, h);
          (f == null ? void 0 : f.activeIndex) != null && t.dispatch(Sw({ activeIndex: f.activeIndex, activeDataKey: void 0, activeCoordinate: f.activeCoordinate }));
        } else if (u === "item") {
          var d, v = Gn.touches[0];
          if (document.elementFromPoint == null || v == null) return;
          var p = document.elementFromPoint(v.clientX, v.clientY);
          if (!p || !p.getAttribute) return;
          var m = p.getAttribute(X_), y = (d = p.getAttribute(J_)) !== null && d !== void 0 ? d : void 0, b = Gr(l).find((P) => P.id === y);
          if (m == null || b == null || y == null) return;
          var { dataKey: w } = b, x = ZR(l, m, y);
          t.dispatch(Kk({ activeDataKey: w, activeIndex: m, activeCoordinate: x, activeGraphicalItemId: y }));
        }
        br = null, er = null;
      }
    };
    if (!a) {
      o();
      return;
    }
    i === "raf" ? br = requestAnimationFrame(o) : typeof i == "number" && er === null && (o(), Gn = null, er = setTimeout(() => {
      Gn ? o() : (er = null, br = null);
    }, i));
  }
} });
var Zx = { throttleDelay: "raf", throttledEvents: ["mousemove", "touchmove", "pointermove", "scroll", "wheel"] }, Qx = Nt({ name: "eventSettings", initialState: Zx, reducers: { setEventSettings: (e3, t) => {
  t.payload.throttleDelay != null && (e3.throttleDelay = t.payload.throttleDelay), t.payload.throttledEvents != null && (e3.throttledEvents = t.payload.throttledEvents);
} } }), { setEventSettings: QR } = Qx.actions, t$ = Qx.reducer, e$ = ky({ brush: l2, cartesianAxis: QD, chartData: DT, errorBars: lL, eventSettings: t$, graphicalItems: ID, layout: N_, legend: WO, options: jT, polarAxis: nD, polarOptions: XR, referenceElements: f2, renderedTicks: C2, rootProps: VR, tooltip: qk, zIndex: gT }), r$ = function(t) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "Chart";
  return s_({ reducer: e$, preloadedState: t, middleware: (n) => {
    var i;
    return n({ serializableCheck: false, immutableCheck: !["commonjs", "es6", "production"].includes((i = "es6") !== null && i !== void 0 ? i : "") }).concat([Fx.middleware, Wx.middleware, vo.middleware, Gx.middleware, Jx.middleware]);
  }, enhancers: (n) => {
    var i = n;
    return typeof n == "function" && (i = n()), i.concat(Vy({ type: "raf" }));
  }, devTools: { serialize: { replacer: qR }, name: "recharts-".concat(r) } });
};
function n$(e3) {
  var { preloadedState: t, children: r, reduxStoreName: n } = e3, i = Dt(), s = g.useRef(null);
  if (i) return r;
  s.current == null && (s.current = r$(t, n));
  var a = Pc;
  return g.createElement(aM, { context: a, store: s.current }, r);
}
function i$(e3) {
  var { layout: t, margin: r } = e3, n = ft(), i = Dt();
  return g.useEffect(() => {
    i || (n(k_(t)), n(j_(r)));
  }, [n, i, t, r]), null;
}
var s$ = g.memo(i$, Ti);
function a$(e3) {
  var t = ft();
  return g.useEffect(() => {
    t(YR(e3));
  }, [t, e3]), null;
}
var o$ = (e3) => {
  var t = ft();
  return g.useEffect(() => {
    t(QR(e3));
  }, [t, e3]), null;
}, l$ = g.memo(o$, Ti);
function Rm(e3) {
  var { zIndex: t, isPanorama: r } = e3, n = g.useRef(null), i = ft();
  return g.useLayoutEffect(() => (n.current && i(pT({ zIndex: t, element: n.current, isPanorama: r })), () => {
    i(mT({ zIndex: t, isPanorama: r }));
  }), [i, t, r]), g.createElement("g", { tabIndex: -1, ref: n, className: "recharts-zIndex-layer_".concat(t) });
}
function $m(e3) {
  var { children: t, isPanorama: r } = e3, n = z(aT);
  if (!n || n.length === 0) return t;
  var i = n.filter((a) => a < 0), s = n.filter((a) => a > 0);
  return g.createElement(g.Fragment, null, i.map((a) => g.createElement(Rm, { key: a, zIndex: a, isPanorama: r })), t, s.map((a) => g.createElement(Rm, { key: a, zIndex: a, isPanorama: r })));
}
var u$ = ["children"];
function c$(e3, t) {
  if (e3 == null) return {};
  var r, n, i = h$(e3, t);
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(e3);
    for (n = 0; n < s.length; n++) r = s[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e3, r) && (i[r] = e3[r]);
  }
  return i;
}
function h$(e3, t) {
  if (e3 == null) return {};
  var r = {};
  for (var n in e3) if ({}.hasOwnProperty.call(e3, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e3[n];
  }
  return r;
}
function ma() {
  return ma = Object.assign ? Object.assign.bind() : function(e3) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e3[n] = r[n]);
    }
    return e3;
  }, ma.apply(null, arguments);
}
var f$ = { width: "100%", height: "100%", display: "block" }, d$ = g.forwardRef((e3, t) => {
  var r = v0(), n = p0(), i = O0();
  if (!ke(r) || !ke(n)) return null;
  var { children: s, otherAttributes: a, title: o, desc: l } = e3, u, c;
  return a != null && (typeof a.tabIndex == "number" ? u = a.tabIndex : u = i ? 0 : void 0, typeof a.role == "string" ? c = a.role : c = i ? "application" : void 0), g.createElement(Yg, ma({}, a, { title: o, desc: l, role: c, tabIndex: u, width: r, height: n, style: f$, ref: t }), s);
}), v$ = (e3) => {
  var { children: t } = e3, r = z(Fa);
  if (!r) return null;
  var { width: n, height: i, y: s, x: a } = r;
  return g.createElement(Yg, { width: n, height: i, x: a, y: s }, t);
}, zm = g.forwardRef((e3, t) => {
  var { children: r } = e3, n = c$(e3, u$), i = Dt();
  return i ? g.createElement(v$, null, g.createElement($m, { isPanorama: true }, r)) : g.createElement(d$, ma({ ref: t }, n), g.createElement($m, { isPanorama: false }, r));
});
function p$() {
  var e3 = ft(), [t, r] = g.useState(null), n = z(G_);
  return g.useEffect(() => {
    if (t != null) {
      var i = t.getBoundingClientRect(), s = i.width / t.offsetWidth;
      K(s) && s !== n && e3(T_(s));
    }
  }, [t, e3, n]), r;
}
function Bm(e3, t) {
  var r = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e3);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e3, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function m$(e3) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Bm(Object(r), true).forEach(function(n) {
      g$(e3, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(r)) : Bm(Object(r)).forEach(function(n) {
      Object.defineProperty(e3, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e3;
}
function g$(e3, t, r) {
  return (t = y$(t)) in e3 ? Object.defineProperty(e3, t, { value: r, enumerable: true, configurable: true, writable: true }) : e3[t] = r, e3;
}
function y$(e3) {
  var t = b$(e3, "string");
  return typeof t == "symbol" ? t : t + "";
}
function b$(e3, t) {
  if (typeof e3 != "object" || !e3) return e3;
  var r = e3[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e3, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e3);
}
function ur() {
  return ur = Object.assign ? Object.assign.bind() : function(e3) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e3[n] = r[n]);
    }
    return e3;
  }, ur.apply(null, arguments);
}
var w$ = () => (UT(), null);
function ga(e3) {
  if (typeof e3 == "number") return e3;
  if (typeof e3 == "string") {
    var t = parseFloat(e3);
    if (!Number.isNaN(t)) return t;
  }
  return 0;
}
var x$ = g.forwardRef((e3, t) => {
  var r, n, i = g.useRef(null), [s, a] = g.useState({ containerWidth: ga((r = e3.style) === null || r === void 0 ? void 0 : r.width), containerHeight: ga((n = e3.style) === null || n === void 0 ? void 0 : n.height) }), o = g.useCallback((u, c) => {
    a((h) => {
      var f = Math.round(u), d = Math.round(c);
      return h.containerWidth === f && h.containerHeight === d ? h : { containerWidth: f, containerHeight: d };
    });
  }, []), l = g.useCallback((u) => {
    if (typeof t == "function" && t(u), i.current != null && (i.current.disconnect(), i.current = null), u != null && typeof ResizeObserver < "u") {
      var { width: c, height: h } = u.getBoundingClientRect();
      o(c, h);
      var f = (v) => {
        var p = v[0];
        if (p != null) {
          var { width: m, height: y } = p.contentRect;
          o(m, y);
        }
      }, d = new ResizeObserver(f);
      d.observe(u), i.current = d;
    }
  }, [t, o]);
  return g.useEffect(() => () => {
    var u = i.current;
    u == null ? void 0 : u.disconnect();
  }, [o]), g.createElement(g.Fragment, null, g.createElement(ki, { width: s.containerWidth, height: s.containerHeight }), g.createElement("div", ur({ ref: l }, e3)));
}), P$ = g.forwardRef((e3, t) => {
  var { width: r, height: n } = e3, [i, s] = g.useState({ containerWidth: ga(r), containerHeight: ga(n) }), a = g.useCallback((l, u) => {
    s((c) => {
      var h = Math.round(l), f = Math.round(u);
      return c.containerWidth === h && c.containerHeight === f ? c : { containerWidth: h, containerHeight: f };
    });
  }, []), o = g.useCallback((l) => {
    if (typeof t == "function" && t(l), l != null) {
      var { width: u, height: c } = l.getBoundingClientRect();
      a(u, c);
    }
  }, [t, a]);
  return g.createElement(g.Fragment, null, g.createElement(ki, { width: i.containerWidth, height: i.containerHeight }), g.createElement("div", ur({ ref: o }, e3)));
}), S$ = g.forwardRef((e3, t) => {
  var { width: r, height: n } = e3;
  return g.createElement(g.Fragment, null, g.createElement(ki, { width: r, height: n }), g.createElement("div", ur({ ref: t }, e3)));
}), _$ = g.forwardRef((e3, t) => {
  var { width: r, height: n } = e3;
  return typeof r == "string" || typeof n == "string" ? g.createElement(P$, ur({}, e3, { ref: t })) : typeof r == "number" && typeof n == "number" ? g.createElement(S$, ur({}, e3, { width: r, height: n, ref: t })) : g.createElement(g.Fragment, null, g.createElement(ki, { width: r, height: n }), g.createElement("div", ur({ ref: t }, e3)));
});
function O$(e3) {
  return e3 ? x$ : _$;
}
var M$ = g.forwardRef((e3, t) => {
  var { children: r, className: n, height: i, onClick: s, onContextMenu: a, onDoubleClick: o, onMouseDown: l, onMouseEnter: u, onMouseLeave: c, onMouseMove: h, onMouseUp: f, onTouchEnd: d, onTouchMove: v, onTouchStart: p, style: m, width: y, responsive: b, dispatchTouchEvents: w = true } = e3, x = g.useRef(null), P = ft(), [S, _] = g.useState(null), [M, A] = g.useState(null), j = p$(), k = Cc(), E = (k == null ? void 0 : k.width) > 0 ? k.width : y, $ = (k == null ? void 0 : k.height) > 0 ? k.height : i, R = g.useCallback((T) => {
    j(T), typeof t == "function" && t(T), _(T), A(T), T != null && (x.current = T);
  }, [j, t, _, A]), B = g.useCallback((T) => {
    P(Bx(T)), P(se({ handler: s, reactEvent: T }));
  }, [P, s]), H = g.useCallback((T) => {
    P(oc(T)), P(se({ handler: u, reactEvent: T }));
  }, [P, u]), W = g.useCallback((T) => {
    P(Pw()), P(se({ handler: c, reactEvent: T }));
  }, [P, c]), G = g.useCallback((T) => {
    P(oc(T)), P(se({ handler: h, reactEvent: T }));
  }, [P, h]), F = g.useCallback(() => {
    P(Vx());
  }, [P]), q = g.useCallback(() => {
    P(Yx());
  }, [P]), Lt = g.useCallback((T) => {
    P(qx(T.key));
  }, [P]), st = g.useCallback((T) => {
    P(se({ handler: a, reactEvent: T }));
  }, [P, a]), fe = g.useCallback((T) => {
    P(se({ handler: o, reactEvent: T }));
  }, [P, o]), Wt = g.useCallback((T) => {
    P(se({ handler: l, reactEvent: T }));
  }, [P, l]), De = g.useCallback((T) => {
    P(se({ handler: f, reactEvent: T }));
  }, [P, f]), Rn = g.useCallback((T) => {
    P(se({ handler: p, reactEvent: T }));
  }, [P, p]), $n = g.useCallback((T) => {
    w && P(Xx(T)), P(se({ handler: v, reactEvent: T }));
  }, [P, w, v]), Kt = g.useCallback((T) => {
    P(se({ handler: d, reactEvent: T }));
  }, [P, d]), D = O$(b);
  return g.createElement(Uw.Provider, { value: S }, g.createElement(z1.Provider, { value: M }, g.createElement(D, { width: E ?? (m == null ? void 0 : m.width), height: $ ?? (m == null ? void 0 : m.height), className: X("recharts-wrapper", n), style: m$({ position: "relative", cursor: "default", width: E, height: $ }, m), onClick: B, onContextMenu: st, onDoubleClick: fe, onFocus: F, onBlur: q, onKeyDown: Lt, onMouseDown: Wt, onMouseEnter: H, onMouseLeave: W, onMouseMove: G, onMouseUp: De, onTouchEnd: Kt, onTouchMove: $n, onTouchStart: Rn, ref: R }, g.createElement(w$, null), r)));
}), E$ = ["width", "height", "responsive", "children", "className", "style", "compact", "title", "desc"];
function A$(e3, t) {
  if (e3 == null) return {};
  var r, n, i = C$(e3, t);
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(e3);
    for (n = 0; n < s.length; n++) r = s[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e3, r) && (i[r] = e3[r]);
  }
  return i;
}
function C$(e3, t) {
  if (e3 == null) return {};
  var r = {};
  for (var n in e3) if ({}.hasOwnProperty.call(e3, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e3[n];
  }
  return r;
}
var j$ = g.forwardRef((e3, t) => {
  var { width: r, height: n, responsive: i, children: s, className: a, style: o, compact: l, title: u, desc: c } = e3, h = A$(e3, E$), f = ue(h);
  return l ? g.createElement(g.Fragment, null, g.createElement(ki, { width: r, height: n }), g.createElement(zm, { otherAttributes: f, title: u, desc: c }, s)) : g.createElement(M$, { className: a, style: o, width: r, height: n, responsive: i ?? false, onClick: e3.onClick, onMouseLeave: e3.onMouseLeave, onMouseEnter: e3.onMouseEnter, onMouseMove: e3.onMouseMove, onMouseDown: e3.onMouseDown, onMouseUp: e3.onMouseUp, onContextMenu: e3.onContextMenu, onDoubleClick: e3.onDoubleClick, onTouchStart: e3.onTouchStart, onTouchMove: e3.onTouchMove, onTouchEnd: e3.onTouchEnd }, g.createElement(zm, { otherAttributes: f, title: u, desc: c, ref: t }, g.createElement(v2, null, s)));
});
function lc() {
  return lc = Object.assign ? Object.assign.bind() : function(e3) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e3[n] = r[n]);
    }
    return e3;
  }, lc.apply(null, arguments);
}
function Fm(e3, t) {
  var r = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e3);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e3, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function k$(e3) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Fm(Object(r), true).forEach(function(n) {
      I$(e3, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(r)) : Fm(Object(r)).forEach(function(n) {
      Object.defineProperty(e3, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e3;
}
function I$(e3, t, r) {
  return (t = T$(t)) in e3 ? Object.defineProperty(e3, t, { value: r, enumerable: true, configurable: true, writable: true }) : e3[t] = r, e3;
}
function T$(e3) {
  var t = N$(e3, "string");
  return typeof t == "symbol" ? t : t + "";
}
function N$(e3, t) {
  if (typeof e3 != "object" || !e3) return e3;
  var r = e3[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e3, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e3);
}
var D$ = { top: 5, right: 5, bottom: 5, left: 5 }, L$ = k$({ accessibilityLayer: true, barCategoryGap: "10%", barGap: 4, layout: "horizontal", margin: D$, responsive: false, reverseStackOrder: false, stackOffset: "none", syncMethod: "index" }, Zx), R$ = g.forwardRef(function(t, r) {
  var n, i = Bt(t.categoricalChartProps, L$), { chartName: s, defaultTooltipEventType: a, validateTooltipEventTypes: o, tooltipPayloadSearcher: l, categoricalChartProps: u } = t, c = { chartName: s, defaultTooltipEventType: a, validateTooltipEventTypes: o, tooltipPayloadSearcher: l, eventEmitter: void 0 };
  return g.createElement(n$, { preloadedState: { options: c }, reduxStoreName: (n = u.id) !== null && n !== void 0 ? n : s }, g.createElement(o2, { chartData: u.data }), g.createElement(s$, { layout: i.layout, margin: i.margin }), g.createElement(l$, { throttleDelay: i.throttleDelay, throttledEvents: i.throttledEvents }), g.createElement(a$, { baseValue: i.baseValue, accessibilityLayer: i.accessibilityLayer, barCategoryGap: i.barCategoryGap, maxBarSize: i.maxBarSize, stackOffset: i.stackOffset, barGap: i.barGap, barSize: i.barSize, syncId: i.syncId, syncMethod: i.syncMethod, className: i.className, reverseStackOrder: i.reverseStackOrder }), g.createElement(j$, lc({}, i, { ref: r })));
}), $$ = ["axis"], UF = g.forwardRef((e3, t) => g.createElement(R$, { chartName: "AreaChart", defaultTooltipEventType: "axis", validateTooltipEventTypes: $$, tooltipPayloadSearcher: AT, categoricalChartProps: e3, ref: t }));
function J(e3) {
  var t = e3.width, r = e3.height;
  if (t < 0) throw new Error("Negative width is not allowed for Size");
  if (r < 0) throw new Error("Negative height is not allowed for Size");
  return { width: t, height: r };
}
function Ir(e3, t) {
  return e3.width === t.width && e3.height === t.height;
}
var z$ = (function() {
  function e3(t) {
    var r = this;
    this._resolutionListener = function() {
      return r._onResolutionChanged();
    }, this._resolutionMediaQueryList = null, this._observers = [], this._window = t, this._installResolutionListener();
  }
  return e3.prototype.dispose = function() {
    this._uninstallResolutionListener(), this._window = null;
  }, Object.defineProperty(e3.prototype, "value", { get: function() {
    return this._window.devicePixelRatio;
  }, enumerable: false, configurable: true }), e3.prototype.subscribe = function(t) {
    var r = this, n = { next: t };
    return this._observers.push(n), { unsubscribe: function() {
      r._observers = r._observers.filter(function(i) {
        return i !== n;
      });
    } };
  }, e3.prototype._installResolutionListener = function() {
    if (this._resolutionMediaQueryList !== null) throw new Error("Resolution listener is already installed");
    var t = this._window.devicePixelRatio;
    this._resolutionMediaQueryList = this._window.matchMedia("all and (resolution: ".concat(t, "dppx)")), this._resolutionMediaQueryList.addListener(this._resolutionListener);
  }, e3.prototype._uninstallResolutionListener = function() {
    this._resolutionMediaQueryList !== null && (this._resolutionMediaQueryList.removeListener(this._resolutionListener), this._resolutionMediaQueryList = null);
  }, e3.prototype._reinstallResolutionListener = function() {
    this._uninstallResolutionListener(), this._installResolutionListener();
  }, e3.prototype._onResolutionChanged = function() {
    var t = this;
    this._observers.forEach(function(r) {
      return r.next(t._window.devicePixelRatio);
    }), this._reinstallResolutionListener();
  }, e3;
})();
function B$(e3) {
  return new z$(e3);
}
var F$ = (function() {
  function e3(t, r, n) {
    var i;
    this._canvasElement = null, this._bitmapSizeChangedListeners = [], this._suggestedBitmapSize = null, this._suggestedBitmapSizeChangedListeners = [], this._devicePixelRatioObservable = null, this._canvasElementResizeObserver = null, this._canvasElement = t, this._canvasElementClientSize = J({ width: this._canvasElement.clientWidth, height: this._canvasElement.clientHeight }), this._transformBitmapSize = r ?? (function(s) {
      return s;
    }), this._allowResizeObserver = (i = n == null ? void 0 : n.allowResizeObserver) !== null && i !== void 0 ? i : true, this._chooseAndInitObserver();
  }
  return e3.prototype.dispose = function() {
    var t, r;
    if (this._canvasElement === null) throw new Error("Object is disposed");
    (t = this._canvasElementResizeObserver) === null || t === void 0 || t.disconnect(), this._canvasElementResizeObserver = null, (r = this._devicePixelRatioObservable) === null || r === void 0 || r.dispose(), this._devicePixelRatioObservable = null, this._suggestedBitmapSizeChangedListeners.length = 0, this._bitmapSizeChangedListeners.length = 0, this._canvasElement = null;
  }, Object.defineProperty(e3.prototype, "canvasElement", { get: function() {
    if (this._canvasElement === null) throw new Error("Object is disposed");
    return this._canvasElement;
  }, enumerable: false, configurable: true }), Object.defineProperty(e3.prototype, "canvasElementClientSize", { get: function() {
    return this._canvasElementClientSize;
  }, enumerable: false, configurable: true }), Object.defineProperty(e3.prototype, "bitmapSize", { get: function() {
    return J({ width: this.canvasElement.width, height: this.canvasElement.height });
  }, enumerable: false, configurable: true }), e3.prototype.resizeCanvasElement = function(t) {
    this._canvasElementClientSize = J(t), this.canvasElement.style.width = "".concat(this._canvasElementClientSize.width, "px"), this.canvasElement.style.height = "".concat(this._canvasElementClientSize.height, "px"), this._invalidateBitmapSize();
  }, e3.prototype.subscribeBitmapSizeChanged = function(t) {
    this._bitmapSizeChangedListeners.push(t);
  }, e3.prototype.unsubscribeBitmapSizeChanged = function(t) {
    this._bitmapSizeChangedListeners = this._bitmapSizeChangedListeners.filter(function(r) {
      return r !== t;
    });
  }, Object.defineProperty(e3.prototype, "suggestedBitmapSize", { get: function() {
    return this._suggestedBitmapSize;
  }, enumerable: false, configurable: true }), e3.prototype.subscribeSuggestedBitmapSizeChanged = function(t) {
    this._suggestedBitmapSizeChangedListeners.push(t);
  }, e3.prototype.unsubscribeSuggestedBitmapSizeChanged = function(t) {
    this._suggestedBitmapSizeChangedListeners = this._suggestedBitmapSizeChangedListeners.filter(function(r) {
      return r !== t;
    });
  }, e3.prototype.applySuggestedBitmapSize = function() {
    if (this._suggestedBitmapSize !== null) {
      var t = this._suggestedBitmapSize;
      this._suggestedBitmapSize = null, this._resizeBitmap(t), this._emitSuggestedBitmapSizeChanged(t, this._suggestedBitmapSize);
    }
  }, e3.prototype._resizeBitmap = function(t) {
    var r = this.bitmapSize;
    Ir(r, t) || (this.canvasElement.width = t.width, this.canvasElement.height = t.height, this._emitBitmapSizeChanged(r, t));
  }, e3.prototype._emitBitmapSizeChanged = function(t, r) {
    var n = this;
    this._bitmapSizeChangedListeners.forEach(function(i) {
      return i.call(n, t, r);
    });
  }, e3.prototype._suggestNewBitmapSize = function(t) {
    var r = this._suggestedBitmapSize, n = J(this._transformBitmapSize(t, this._canvasElementClientSize)), i = Ir(this.bitmapSize, n) ? null : n;
    r === null && i === null || r !== null && i !== null && Ir(r, i) || (this._suggestedBitmapSize = i, this._emitSuggestedBitmapSizeChanged(r, i));
  }, e3.prototype._emitSuggestedBitmapSizeChanged = function(t, r) {
    var n = this;
    this._suggestedBitmapSizeChangedListeners.forEach(function(i) {
      return i.call(n, t, r);
    });
  }, e3.prototype._chooseAndInitObserver = function() {
    var t = this;
    if (!this._allowResizeObserver) {
      this._initDevicePixelRatioObservable();
      return;
    }
    K$().then(function(r) {
      return r ? t._initResizeObserver() : t._initDevicePixelRatioObservable();
    });
  }, e3.prototype._initDevicePixelRatioObservable = function() {
    var t = this;
    if (this._canvasElement !== null) {
      var r = Wm(this._canvasElement);
      if (r === null) throw new Error("No window is associated with the canvas");
      this._devicePixelRatioObservable = B$(r), this._devicePixelRatioObservable.subscribe(function() {
        return t._invalidateBitmapSize();
      }), this._invalidateBitmapSize();
    }
  }, e3.prototype._invalidateBitmapSize = function() {
    var t, r;
    if (this._canvasElement !== null) {
      var n = Wm(this._canvasElement);
      if (n !== null) {
        var i = (r = (t = this._devicePixelRatioObservable) === null || t === void 0 ? void 0 : t.value) !== null && r !== void 0 ? r : n.devicePixelRatio, s = this._canvasElement.getClientRects(), a = s[0] !== void 0 ? U$(s[0], i) : J({ width: this._canvasElementClientSize.width * i, height: this._canvasElementClientSize.height * i });
        this._suggestNewBitmapSize(a);
      }
    }
  }, e3.prototype._initResizeObserver = function() {
    var t = this;
    this._canvasElement !== null && (this._canvasElementResizeObserver = new ResizeObserver(function(r) {
      var n = r.find(function(a) {
        return a.target === t._canvasElement;
      });
      if (!(!n || !n.devicePixelContentBoxSize || !n.devicePixelContentBoxSize[0])) {
        var i = n.devicePixelContentBoxSize[0], s = J({ width: i.inlineSize, height: i.blockSize });
        t._suggestNewBitmapSize(s);
      }
    }), this._canvasElementResizeObserver.observe(this._canvasElement, { box: "device-pixel-content-box" }));
  }, e3;
})();
function W$(e3, t) {
  return new F$(e3, t.transform, t.options);
}
function Wm(e3) {
  return e3.ownerDocument.defaultView;
}
function K$() {
  return new Promise(function(e3) {
    var t = new ResizeObserver(function(r) {
      e3(r.every(function(n) {
        return "devicePixelContentBoxSize" in n;
      })), t.disconnect();
    });
    t.observe(document.body, { box: "device-pixel-content-box" });
  }).catch(function() {
    return false;
  });
}
function U$(e3, t) {
  return J({ width: Math.round(e3.left * t + e3.width * t) - Math.round(e3.left * t), height: Math.round(e3.top * t + e3.height * t) - Math.round(e3.top * t) });
}
var q$ = (function() {
  function e3(t, r, n) {
    if (r.width === 0 || r.height === 0) throw new TypeError("Rendering target could only be created on a media with positive width and height");
    if (this._mediaSize = r, n.width === 0 || n.height === 0) throw new TypeError("Rendering target could only be created using a bitmap with positive integer width and height");
    this._bitmapSize = n, this._context = t;
  }
  return e3.prototype.useMediaCoordinateSpace = function(t) {
    try {
      return this._context.save(), this._context.setTransform(1, 0, 0, 1, 0, 0), this._context.scale(this._horizontalPixelRatio, this._verticalPixelRatio), t({ context: this._context, mediaSize: this._mediaSize });
    } finally {
      this._context.restore();
    }
  }, e3.prototype.useBitmapCoordinateSpace = function(t) {
    try {
      return this._context.save(), this._context.setTransform(1, 0, 0, 1, 0, 0), t({ context: this._context, mediaSize: this._mediaSize, bitmapSize: this._bitmapSize, horizontalPixelRatio: this._horizontalPixelRatio, verticalPixelRatio: this._verticalPixelRatio });
    } finally {
      this._context.restore();
    }
  }, Object.defineProperty(e3.prototype, "_horizontalPixelRatio", { get: function() {
    return this._bitmapSize.width / this._mediaSize.width;
  }, enumerable: false, configurable: true }), Object.defineProperty(e3.prototype, "_verticalPixelRatio", { get: function() {
    return this._bitmapSize.height / this._mediaSize.height;
  }, enumerable: false, configurable: true }), e3;
})();
function Fr(e3, t) {
  var r = e3.canvasElementClientSize;
  if (r.width === 0 || r.height === 0) return null;
  var n = e3.bitmapSize;
  if (n.width === 0 || n.height === 0) return null;
  var i = e3.canvasElement.getContext("2d", t);
  return i === null ? null : new q$(i, r, n);
}
/*!
* @license
* TradingView Lightweight Charts™ v5.1.0
* Copyright (c) 2025 TradingView, Inc.
* Licensed under Apache License 2.0 https://www.apache.org/licenses/LICENSE-2.0
*/
const t1 = { title: "", visible: true, lastValueVisible: true, priceLineVisible: true, priceLineSource: 0, priceLineWidth: 1, priceLineColor: "", priceLineStyle: 2, baseLineVisible: true, baseLineWidth: 1, baseLineColor: "#B2B5BE", baseLineStyle: 0, priceFormat: { type: "price", precision: 2, minMove: 0.01 } };
var Km, Um;
function hr(e3, t) {
  const r = { 0: [], 1: [e3.lineWidth, e3.lineWidth], 2: [2 * e3.lineWidth, 2 * e3.lineWidth], 3: [6 * e3.lineWidth, 6 * e3.lineWidth], 4: [e3.lineWidth, 4 * e3.lineWidth] }[t];
  e3.setLineDash(r);
}
function e1(e3, t, r, n) {
  e3.beginPath();
  const i = e3.lineWidth % 2 ? 0.5 : 0;
  e3.moveTo(r, t + i), e3.lineTo(n, t + i), e3.stroke();
}
function Mt(e3, t) {
  if (!e3) throw new Error("Assertion failed" + (t ? ": " + t : ""));
}
function Yt(e3) {
  if (e3 === void 0) throw new Error("Value is undefined");
  return e3;
}
function C(e3) {
  if (e3 === null) throw new Error("Value is null");
  return e3;
}
function or(e3) {
  return C(Yt(e3));
}
(function(e3) {
  e3[e3.Simple = 0] = "Simple", e3[e3.WithSteps = 1] = "WithSteps", e3[e3.Curved = 2] = "Curved";
})(Km || (Km = {})), (function(e3) {
  e3[e3.Solid = 0] = "Solid", e3[e3.Dotted = 1] = "Dotted", e3[e3.Dashed = 2] = "Dashed", e3[e3.LargeDashed = 3] = "LargeDashed", e3[e3.SparseDotted = 4] = "SparseDotted";
})(Um || (Um = {}));
class lt {
  constructor() {
    this.t = [];
  }
  i(t, r, n) {
    const i = { h: t, l: r, o: n === true };
    this.t.push(i);
  }
  _(t) {
    const r = this.t.findIndex(((n) => t === n.h));
    r > -1 && this.t.splice(r, 1);
  }
  u(t) {
    this.t = this.t.filter(((r) => r.l !== t));
  }
  p(t, r, n) {
    const i = [...this.t];
    this.t = this.t.filter(((s) => !s.o)), i.forEach(((s) => s.h(t, r, n)));
  }
  v() {
    return this.t.length > 0;
  }
  m() {
    this.t = [];
  }
}
function Qt(e3, ...t) {
  for (const r of t) for (const n in r) r[n] !== void 0 && Object.prototype.hasOwnProperty.call(r, n) && !["__proto__", "constructor", "prototype"].includes(n) && (typeof r[n] != "object" || e3[n] === void 0 || Array.isArray(r[n]) ? e3[n] = r[n] : Qt(e3[n], r[n]));
  return e3;
}
function Wr(e3) {
  return typeof e3 == "number" && isFinite(e3);
}
function Si(e3) {
  return typeof e3 == "number" && e3 % 1 == 0;
}
function qi(e3) {
  return typeof e3 == "string";
}
function ls(e3) {
  return typeof e3 == "boolean";
}
function Be(e3) {
  const t = e3;
  if (!t || typeof t != "object") return t;
  let r, n, i;
  for (n in r = Array.isArray(t) ? [] : {}, t) t.hasOwnProperty(n) && (i = t[n], r[n] = i && typeof i == "object" ? Be(i) : i);
  return r;
}
function qm(e3) {
  return e3 !== null;
}
function _i(e3) {
  return e3 === null ? void 0 : e3;
}
const r1 = "-apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif";
function Oi(e3, t, r) {
  return t === void 0 && (t = r1), `${r = r !== void 0 ? `${r} ` : ""}${e3}px ${t}`;
}
class V$ {
  constructor(t) {
    this.M = { S: 1, C: 5, k: NaN, P: "", T: "", R: "", D: "", I: 0, V: 0, B: 0, A: 0, L: 0 }, this.O = t;
  }
  N() {
    const t = this.M, r = this.F(), n = this.W();
    return t.k === r && t.T === n || (t.k = r, t.T = n, t.P = Oi(r, n), t.A = 2.5 / 12 * r, t.I = t.A, t.V = r / 12 * t.C, t.B = r / 12 * t.C, t.L = 0), t.R = this.H(), t.D = this.U(), this.M;
  }
  H() {
    return this.O.N().layout.textColor;
  }
  U() {
    return this.O.$();
  }
  F() {
    return this.O.N().layout.fontSize;
  }
  W() {
    return this.O.N().layout.fontFamily;
  }
}
function Zl(e3) {
  return e3 < 0 ? 0 : e3 > 255 ? 255 : Math.round(e3) || 0;
}
function Vm(e3) {
  return 0.199 * e3[0] + 0.687 * e3[1] + 0.114 * e3[2];
}
class Y$ {
  constructor(t, r) {
    this.q = /* @__PURE__ */ new Map(), this.j = t, r && (this.q = r);
  }
  Y(t, r) {
    if (t === "transparent") return t;
    const n = this.K(t), i = n[3];
    return `rgba(${n[0]}, ${n[1]}, ${n[2]}, ${r * i})`;
  }
  Z(t) {
    const r = this.K(t);
    return { G: `rgb(${r[0]}, ${r[1]}, ${r[2]})`, X: Vm(r) > 160 ? "black" : "white" };
  }
  J(t) {
    return Vm(this.K(t));
  }
  tt(t, r, n) {
    const [i, s, a, o] = this.K(t), [l, u, c, h] = this.K(r), f = [Zl(i + n * (l - i)), Zl(s + n * (u - s)), Zl(a + n * (c - a)), (d = o + n * (h - o), d <= 0 || d > 1 ? Math.min(Math.max(d, 0), 1) : Math.round(1e4 * d) / 1e4)];
    var d;
    return `rgba(${f[0]}, ${f[1]}, ${f[2]}, ${f[3]})`;
  }
  K(t) {
    const r = this.q.get(t);
    if (r) return r;
    const n = (function(a) {
      const o = document.createElement("div");
      o.style.display = "none", document.body.appendChild(o), o.style.color = a;
      const l = window.getComputedStyle(o).color;
      return document.body.removeChild(o), l;
    })(t), i = n.match(/^rgba?\s*\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d*\.?\d+))?\)$/);
    if (!i) {
      if (this.j.length) for (const a of this.j) {
        const o = a(t);
        if (o) return this.q.set(t, o), o;
      }
      throw new Error(`Failed to parse color: ${t}`);
    }
    const s = [parseInt(i[1], 10), parseInt(i[2], 10), parseInt(i[3], 10), i[4] ? parseFloat(i[4]) : 1];
    return this.q.set(t, s), s;
  }
}
class n1 {
  constructor() {
    this.it = [];
  }
  st(t) {
    this.it = t;
  }
  nt(t, r, n) {
    this.it.forEach(((i) => {
      i.nt(t, r, n);
    }));
  }
}
class tr {
  nt(t, r, n) {
    t.useBitmapCoordinateSpace(((i) => this.et(i, r, n)));
  }
}
class H$ extends tr {
  constructor() {
    super(...arguments), this.rt = null;
  }
  ht(t) {
    this.rt = t;
  }
  et({ context: t, horizontalPixelRatio: r, verticalPixelRatio: n }) {
    if (this.rt === null || this.rt.lt === null) return;
    const i = this.rt.lt, s = this.rt, a = Math.max(1, Math.floor(r)) % 2 / 2, o = (l) => {
      t.beginPath();
      for (let u = i.to - 1; u >= i.from; --u) {
        const c = s.ot[u], h = Math.round(c._t * r) + a, f = c.ut * n, d = l * n + a;
        t.moveTo(h, f), t.arc(h, f, d, 0, 2 * Math.PI);
      }
      t.fill();
    };
    s.ct > 0 && (t.fillStyle = s.dt, o(s.ft + s.ct)), t.fillStyle = s.vt, o(s.ft);
  }
}
function G$() {
  return { ot: [{ _t: 0, ut: 0, wt: 0, gt: 0 }], vt: "", dt: "", ft: 0, ct: 0, lt: null };
}
const X$ = { from: 0, to: 1 };
class J$ {
  constructor(t, r, n) {
    this.Mt = new n1(), this.bt = [], this.St = [], this.xt = true, this.O = t, this.Ct = r, this.yt = n, this.Mt.st(this.bt);
  }
  kt(t) {
    this.Pt(), this.xt = true;
  }
  Tt() {
    return this.xt && (this.Rt(), this.xt = false), this.Mt;
  }
  Pt() {
    const t = this.yt.Dt();
    t.length !== this.bt.length && (this.St = t.map(G$), this.bt = this.St.map(((r) => {
      const n = new H$();
      return n.ht(r), n;
    })), this.Mt.st(this.bt));
  }
  Rt() {
    const t = this.Ct.N().mode === 2 || !this.Ct.It(), r = this.yt.Vt(), n = this.Ct.Bt(), i = this.O.Et();
    this.Pt(), r.forEach(((s, a) => {
      const o = this.St[a], l = s.At(n), u = s.Lt();
      !t && l !== null && s.It() && u !== null ? (o.vt = l.zt, o.ft = l.ft, o.ct = l.Ot, o.ot[0].gt = l.gt, o.ot[0].ut = s.Ft().Nt(l.gt, u.Wt), o.dt = l.Ht ?? this.O.Ut(o.ot[0].ut / s.Ft().$t()), o.ot[0].wt = n, o.ot[0]._t = i.qt(n), o.lt = X$) : o.lt = null;
    }));
  }
}
class Z$ extends tr {
  constructor(t) {
    super(), this.jt = t;
  }
  et({ context: t, bitmapSize: r, horizontalPixelRatio: n, verticalPixelRatio: i }) {
    if (this.jt === null) return;
    const s = this.jt.Yt.It, a = this.jt.Kt.It;
    if (!s && !a) return;
    const o = Math.round(this.jt._t * n), l = Math.round(this.jt.ut * i);
    t.lineCap = "butt", s && o >= 0 && (t.lineWidth = Math.floor(this.jt.Yt.ct * n), t.strokeStyle = this.jt.Yt.R, t.fillStyle = this.jt.Yt.R, hr(t, this.jt.Yt.Zt), (function(u, c, h, f) {
      u.beginPath();
      const d = u.lineWidth % 2 ? 0.5 : 0;
      u.moveTo(c + d, h), u.lineTo(c + d, f), u.stroke();
    })(t, o, 0, r.height)), a && l >= 0 && (t.lineWidth = Math.floor(this.jt.Kt.ct * i), t.strokeStyle = this.jt.Kt.R, t.fillStyle = this.jt.Kt.R, hr(t, this.jt.Kt.Zt), e1(t, l, 0, r.width));
  }
}
class Q$ {
  constructor(t, r) {
    this.xt = true, this.Gt = { Yt: { ct: 1, Zt: 0, R: "", It: false }, Kt: { ct: 1, Zt: 0, R: "", It: false }, _t: 0, ut: 0 }, this.Xt = new Z$(this.Gt), this.Jt = t, this.yt = r;
  }
  kt() {
    this.xt = true;
  }
  Tt(t) {
    return this.xt && (this.Rt(), this.xt = false), this.Xt;
  }
  Rt() {
    const t = this.Jt.It(), r = this.yt.Qt().N().crosshair, n = this.Gt;
    if (r.mode === 2) return n.Kt.It = false, void (n.Yt.It = false);
    n.Kt.It = t && this.Jt.ti(this.yt), n.Yt.It = t && this.Jt.ii(), n.Kt.ct = r.horzLine.width, n.Kt.Zt = r.horzLine.style, n.Kt.R = r.horzLine.color, n.Yt.ct = r.vertLine.width, n.Yt.Zt = r.vertLine.style, n.Yt.R = r.vertLine.color, n._t = this.Jt.si(), n.ut = this.Jt.ni();
  }
}
function tz(e3, t, r, n, i, s) {
  e3.fillRect(t + s, r, n - 2 * s, s), e3.fillRect(t + s, r + i - s, n - 2 * s, s), e3.fillRect(t, r, s, i), e3.fillRect(t + n - s, r, s, i);
}
function po(e3, t, r, n, i, s) {
  e3.save(), e3.globalCompositeOperation = "copy", e3.fillStyle = s, e3.fillRect(t, r, n, i), e3.restore();
}
function Ym(e3, t, r, n, i, s) {
  e3.beginPath(), e3.roundRect ? e3.roundRect(t, r, n, i, s) : (e3.lineTo(t + n - s[1], r), s[1] !== 0 && e3.arcTo(t + n, r, t + n, r + s[1], s[1]), e3.lineTo(t + n, r + i - s[2]), s[2] !== 0 && e3.arcTo(t + n, r + i, t + n - s[2], r + i, s[2]), e3.lineTo(t + s[3], r + i), s[3] !== 0 && e3.arcTo(t, r + i, t, r + i - s[3], s[3]), e3.lineTo(t, r + s[0]), s[0] !== 0 && e3.arcTo(t, r, t + s[0], r, s[0]));
}
function Hm(e3, t, r, n, i, s, a = 0, o = [0, 0, 0, 0], l = "") {
  if (e3.save(), !a || !l || l === s) return Ym(e3, t, r, n, i, o), e3.fillStyle = s, e3.fill(), void e3.restore();
  const u = a / 2;
  var c;
  Ym(e3, t + u, r + u, n - a, i - a, (c = -u, o.map(((h) => h === 0 ? h : h + c)))), s !== "transparent" && (e3.fillStyle = s, e3.fill()), l !== "transparent" && (e3.lineWidth = a, e3.strokeStyle = l, e3.closePath(), e3.stroke()), e3.restore();
}
function i1(e3, t, r, n, i, s, a) {
  e3.save(), e3.globalCompositeOperation = "copy";
  const o = e3.createLinearGradient(0, 0, 0, i);
  o.addColorStop(0, s), o.addColorStop(1, a), e3.fillStyle = o, e3.fillRect(t, r, n, i), e3.restore();
}
class Gm {
  constructor(t, r) {
    this.ht(t, r);
  }
  ht(t, r) {
    this.jt = t, this.ei = r;
  }
  $t(t, r) {
    return this.jt.It ? t.k + t.A + t.I : 0;
  }
  nt(t, r, n, i) {
    if (!this.jt.It || this.jt.ri.length === 0) return;
    const s = this.jt.R, a = this.ei.G, o = t.useBitmapCoordinateSpace(((l) => {
      const u = l.context;
      u.font = r.P;
      const c = this.hi(l, r, n, i), h = c.ai;
      return c.li ? Hm(u, h.oi, h._i, h.ui, h.ci, a, h.di, [h.ft, 0, 0, h.ft], a) : Hm(u, h.fi, h._i, h.ui, h.ci, a, h.di, [0, h.ft, h.ft, 0], a), this.jt.pi && (u.fillStyle = s, u.fillRect(h.fi, h.mi, h.wi - h.fi, h.gi)), this.jt.Mi && (u.fillStyle = r.D, u.fillRect(c.li ? h.bi - h.di : 0, h._i, h.di, h.Si - h._i)), c;
    }));
    t.useMediaCoordinateSpace((({ context: l }) => {
      const u = o.xi;
      l.font = r.P, l.textAlign = o.li ? "right" : "left", l.textBaseline = "middle", l.fillStyle = s, l.fillText(this.jt.ri, u.Ci, (u._i + u.Si) / 2 + u.yi);
    }));
  }
  hi(t, r, n, i) {
    const { context: s, bitmapSize: a, mediaSize: o, horizontalPixelRatio: l, verticalPixelRatio: u } = t, c = this.jt.pi || !this.jt.ki ? r.C : 0, h = this.jt.Pi ? r.S : 0, f = r.A + this.ei.Ti, d = r.I + this.ei.Ri, v = r.V, p = r.B, m = this.jt.ri, y = r.k, b = n.Di(s, m), w = Math.ceil(n.Ii(s, m)), x = y + f + d, P = r.S + v + p + w + c, S = Math.max(1, Math.floor(u));
    let _ = Math.round(x * u);
    _ % 2 != S % 2 && (_ += 1);
    const M = h > 0 ? Math.max(1, Math.floor(h * l)) : 0, A = Math.round(P * l), j = Math.round(c * l), k = this.ei.Vi ?? this.ei.Bi ?? this.ei.Ei, E = Math.round(k * u) - Math.floor(0.5 * u), $ = Math.floor(E + S / 2 - _ / 2), R = $ + _, B = i === "right", H = B ? o.width - h : h, W = B ? a.width - M : M;
    let G, F, q;
    return B ? (G = W - A, F = W - j, q = H - c - v - h) : (G = W + A, F = W + j, q = H + c + v), { li: B, ai: { _i: $, mi: E, Si: R, ui: A, ci: _, ft: 2 * l, di: M, oi: G, fi: W, wi: F, gi: S, bi: a.width }, xi: { _i: $ / u, Si: R / u, Ci: q, yi: b } };
  }
}
class mo {
  constructor(t) {
    this.Ai = { Ei: 0, G: "#000", Ri: 0, Ti: 0 }, this.Li = { ri: "", It: false, pi: true, ki: false, Ht: "", R: "#FFF", Mi: false, Pi: false }, this.zi = { ri: "", It: false, pi: false, ki: true, Ht: "", R: "#FFF", Mi: true, Pi: true }, this.xt = true, this.Oi = new (t || Gm)(this.Li, this.Ai), this.Ni = new (t || Gm)(this.zi, this.Ai);
  }
  ri() {
    return this.Fi(), this.Li.ri;
  }
  Ei() {
    return this.Fi(), this.Ai.Ei;
  }
  kt() {
    this.xt = true;
  }
  $t(t, r = false) {
    return Math.max(this.Oi.$t(t, r), this.Ni.$t(t, r));
  }
  Wi() {
    return this.Ai.Vi ?? null;
  }
  Hi() {
    return this.Ai.Vi ?? this.Ai.Bi ?? this.Ei();
  }
  Ui(t) {
    this.Ai.Bi = t ?? void 0;
  }
  $i() {
    return this.Fi(), this.Li.It || this.zi.It;
  }
  qi() {
    return this.Fi(), this.Li.It;
  }
  Tt(t) {
    return this.Fi(), this.Li.pi = this.Li.pi && t.N().ticksVisible, this.zi.pi = this.zi.pi && t.N().ticksVisible, this.Oi.ht(this.Li, this.Ai), this.Ni.ht(this.zi, this.Ai), this.Oi;
  }
  ji() {
    return this.Fi(), this.Oi.ht(this.Li, this.Ai), this.Ni.ht(this.zi, this.Ai), this.Ni;
  }
  Fi() {
    this.xt && (this.Li.pi = true, this.zi.pi = false, this.Yi(this.Li, this.zi, this.Ai));
  }
}
class ez extends mo {
  constructor(t, r, n) {
    super(), this.Jt = t, this.Ki = r, this.Zi = n;
  }
  Yi(t, r, n) {
    if (t.It = false, this.Jt.N().mode === 2) return;
    const i = this.Jt.N().horzLine;
    if (!i.labelVisible) return;
    const s = this.Ki.Lt();
    if (!this.Jt.It() || this.Ki.Gi() || s === null) return;
    const a = this.Ki.Xi().Z(i.labelBackgroundColor);
    n.G = a.G, t.R = a.X;
    const o = 2 / 12 * this.Ki.k();
    n.Ti = o, n.Ri = o;
    const l = this.Zi(this.Ki);
    n.Ei = l.Ei, t.ri = this.Ki.Ji(l.gt, s), t.It = true;
  }
}
const rz = /[1-9]/g;
class s1 {
  constructor() {
    this.jt = null;
  }
  ht(t) {
    this.jt = t;
  }
  nt(t, r) {
    if (this.jt === null || this.jt.It === false || this.jt.ri.length === 0) return;
    const n = t.useMediaCoordinateSpace((({ context: f }) => (f.font = r.P, Math.round(r.Qi.Ii(f, C(this.jt).ri, rz)))));
    if (n <= 0) return;
    const i = r.ts, s = n + 2 * i, a = s / 2, o = this.jt.ss;
    let l = this.jt.Ei, u = Math.floor(l - a) + 0.5;
    u < 0 ? (l += Math.abs(0 - u), u = Math.floor(l - a) + 0.5) : u + s > o && (l -= Math.abs(o - (u + s)), u = Math.floor(l - a) + 0.5);
    const c = u + s, h = Math.ceil(0 + r.S + r.C + r.A + r.k + r.I);
    t.useBitmapCoordinateSpace((({ context: f, horizontalPixelRatio: d, verticalPixelRatio: v }) => {
      const p = C(this.jt);
      f.fillStyle = p.G;
      const m = Math.round(u * d), y = Math.round(0 * v), b = Math.round(c * d), w = Math.round(h * v), x = Math.round(2 * d);
      if (f.beginPath(), f.moveTo(m, y), f.lineTo(m, w - x), f.arcTo(m, w, m + x, w, x), f.lineTo(b - x, w), f.arcTo(b, w, b, w - x, x), f.lineTo(b, y), f.fill(), p.pi) {
        const P = Math.round(p.Ei * d), S = y, _ = Math.round((S + r.C) * v);
        f.fillStyle = p.R;
        const M = Math.max(1, Math.floor(d)), A = Math.floor(0.5 * d);
        f.fillRect(P - A, S, M, _ - S);
      }
    })), t.useMediaCoordinateSpace((({ context: f }) => {
      const d = C(this.jt), v = 0 + r.S + r.C + r.A + r.k / 2;
      f.font = r.P, f.textAlign = "left", f.textBaseline = "middle", f.fillStyle = d.R;
      const p = r.Qi.Di(f, "Apr0");
      f.translate(u + i, v + p), f.fillText(d.ri, 0, 0);
    }));
  }
}
class nz {
  constructor(t, r, n) {
    this.xt = true, this.Xt = new s1(), this.Gt = { It: false, G: "#4c525e", R: "white", ri: "", ss: 0, Ei: NaN, pi: true }, this.Ct = t, this.ns = r, this.Zi = n;
  }
  kt() {
    this.xt = true;
  }
  Tt() {
    return this.xt && (this.Rt(), this.xt = false), this.Xt.ht(this.Gt), this.Xt;
  }
  Rt() {
    const t = this.Gt;
    if (t.It = false, this.Ct.N().mode === 2) return;
    const r = this.Ct.N().vertLine;
    if (!r.labelVisible) return;
    const n = this.ns.Et();
    if (n.Gi()) return;
    t.ss = n.ss();
    const i = this.Zi();
    if (i === null) return;
    t.Ei = i.Ei;
    const s = n.es(this.Ct.Bt());
    t.ri = n.rs(C(s)), t.It = true;
    const a = this.ns.Xi().Z(r.labelBackgroundColor);
    t.G = a.G, t.R = a.X, t.pi = n.N().ticksVisible;
  }
}
class a1 {
  constructor() {
    this.hs = null, this.ls = 0;
  }
  _s() {
    return this.ls;
  }
  us(t) {
    this.ls = t;
  }
  Ft() {
    return this.hs;
  }
  cs(t) {
    this.hs = t;
  }
  ds(t) {
    return [];
  }
  fs() {
    return [];
  }
  It() {
    return true;
  }
}
var Xm;
(function(e3) {
  e3[e3.Normal = 0] = "Normal", e3[e3.Magnet = 1] = "Magnet", e3[e3.Hidden = 2] = "Hidden", e3[e3.MagnetOHLC = 3] = "MagnetOHLC";
})(Xm || (Xm = {}));
class iz extends a1 {
  constructor(t, r) {
    super(), this.yt = null, this.ps = NaN, this.vs = 0, this.ws = false, this.gs = /* @__PURE__ */ new Map(), this.Ms = false, this.bs = /* @__PURE__ */ new WeakMap(), this.Ss = /* @__PURE__ */ new WeakMap(), this.xs = NaN, this.Cs = NaN, this.ys = NaN, this.ks = NaN, this.ns = t, this.Ps = r, this.Ts = /* @__PURE__ */ ((i, s) => (a) => {
      const o = s(), l = i();
      if (a === C(this.yt).Rs()) return { gt: l, Ei: o };
      {
        const u = C(a.Lt());
        return { gt: a.Ds(o, u), Ei: o };
      }
    })((() => this.ps), (() => this.Cs));
    const n = /* @__PURE__ */ ((i, s) => () => {
      const a = this.ns.Et().Is(i()), o = s();
      return a && Number.isFinite(o) ? { wt: a, Ei: o } : null;
    })((() => this.vs), (() => this.si()));
    this.Vs = new nz(this, t, n);
  }
  N() {
    return this.Ps;
  }
  Bs(t, r) {
    this.ys = t, this.ks = r;
  }
  Es() {
    this.ys = NaN, this.ks = NaN;
  }
  As() {
    return this.ys;
  }
  Ls() {
    return this.ks;
  }
  zs(t, r, n) {
    this.Ms || (this.Ms = true), this.ws = true, this.Os(t, r, n);
  }
  Bt() {
    return this.vs;
  }
  si() {
    return this.xs;
  }
  ni() {
    return this.Cs;
  }
  It() {
    return this.ws;
  }
  Ns() {
    this.ws = false, this.Fs(), this.ps = NaN, this.xs = NaN, this.Cs = NaN, this.yt = null, this.Es(), this.Ws();
  }
  Hs(t) {
    if (!this.Ps.doNotSnapToHiddenSeriesIndices) return t;
    const r = this.ns, n = r.Et();
    let i = null, s = null;
    for (const u of r.Us()) {
      const c = u.qs().$s(t, -1);
      if (c) {
        if (c.js === t) return t;
        (i === null || c.js > i) && (i = c.js);
      }
      const h = u.qs().$s(t, 1);
      if (h) {
        if (h.js === t) return t;
        (s === null || h.js < s) && (s = h.js);
      }
    }
    const a = [i, s].filter(qm);
    if (a.length === 0) return t;
    const o = n.qt(t), l = a.map(((u) => Math.abs(o - n.qt(u))));
    return a[l.indexOf(Math.min(...l))];
  }
  Ys(t) {
    let r = this.bs.get(t);
    r || (r = new Q$(this, t), this.bs.set(t, r));
    let n = this.Ss.get(t);
    return n || (n = new J$(this.ns, this, t), this.Ss.set(t, n)), [r, n];
  }
  ti(t) {
    return t === this.yt && this.Ps.horzLine.visible;
  }
  ii() {
    return this.Ps.vertLine.visible;
  }
  Ks(t, r) {
    this.ws && this.yt === t || this.gs.clear();
    const n = [];
    return this.yt === t && n.push(this.Zs(this.gs, r, this.Ts)), n;
  }
  fs() {
    return this.ws ? [this.Vs] : [];
  }
  Gs() {
    return this.yt;
  }
  Ws() {
    this.ns.Xs().forEach(((t) => {
      var _a3, _b2;
      (_a3 = this.bs.get(t)) == null ? void 0 : _a3.kt(), (_b2 = this.Ss.get(t)) == null ? void 0 : _b2.kt();
    })), this.gs.forEach(((t) => t.kt())), this.Vs.kt();
  }
  Js(t) {
    return t && !t.Rs().Gi() ? t.Rs() : null;
  }
  Os(t, r, n) {
    this.Qs(t, r, n) && this.Ws();
  }
  Qs(t, r, n) {
    const i = this.xs, s = this.Cs, a = this.ps, o = this.vs, l = this.yt, u = this.Js(n);
    this.vs = t, this.xs = isNaN(t) ? NaN : this.ns.Et().qt(t), this.yt = n;
    const c = u !== null ? u.Lt() : null;
    return u !== null && c !== null ? (this.ps = r, this.Cs = u.Nt(r, c)) : (this.ps = NaN, this.Cs = NaN), i !== this.xs || s !== this.Cs || o !== this.vs || a !== this.ps || l !== this.yt;
  }
  Fs() {
    const t = this.ns.tn().map(((n) => n.qs().sn())).filter(qm), r = t.length === 0 ? null : Math.max(...t);
    this.vs = r !== null ? r : NaN;
  }
  Zs(t, r, n) {
    let i = t.get(r);
    return i === void 0 && (i = new ez(this, r, n), t.set(r, i)), i;
  }
}
function go(e3) {
  return e3 === "left" || e3 === "right";
}
class _t {
  constructor(t) {
    this.nn = /* @__PURE__ */ new Map(), this.en = [], this.rn = t;
  }
  hn(t, r) {
    const n = (function(i, s) {
      return i === void 0 ? s : { an: Math.max(i.an, s.an), ln: i.ln || s.ln };
    })(this.nn.get(t), r);
    this.nn.set(t, n);
  }
  _n() {
    return this.rn;
  }
  un(t) {
    const r = this.nn.get(t);
    return r === void 0 ? { an: this.rn } : { an: Math.max(this.rn, r.an), ln: r.ln };
  }
  cn() {
    this.dn(), this.en = [{ fn: 0 }];
  }
  pn(t) {
    this.dn(), this.en = [{ fn: 1, Wt: t }];
  }
  vn(t) {
    this.mn(), this.en.push({ fn: 5, Wt: t });
  }
  dn() {
    this.mn(), this.en.push({ fn: 6 });
  }
  wn() {
    this.dn(), this.en = [{ fn: 4 }];
  }
  gn(t) {
    this.dn(), this.en.push({ fn: 2, Wt: t });
  }
  Mn(t) {
    this.dn(), this.en.push({ fn: 3, Wt: t });
  }
  bn() {
    return this.en;
  }
  Sn(t) {
    for (const r of t.en) this.xn(r);
    this.rn = Math.max(this.rn, t.rn), t.nn.forEach(((r, n) => {
      this.hn(n, r);
    }));
  }
  static Cn() {
    return new _t(2);
  }
  static yn() {
    return new _t(3);
  }
  xn(t) {
    switch (t.fn) {
      case 0:
        this.cn();
        break;
      case 1:
        this.pn(t.Wt);
        break;
      case 2:
        this.gn(t.Wt);
        break;
      case 3:
        this.Mn(t.Wt);
        break;
      case 4:
        this.wn();
        break;
      case 5:
        this.vn(t.Wt);
        break;
      case 6:
        this.mn();
    }
  }
  mn() {
    const t = this.en.findIndex(((r) => r.fn === 5));
    t !== -1 && this.en.splice(t, 1);
  }
}
class o1 {
  formatTickmarks(t) {
    return t.map(((r) => this.format(r)));
  }
}
const Jm = ".";
function Fe(e3, t) {
  if (!Wr(e3)) return "n/a";
  if (!Si(t)) throw new TypeError("invalid length");
  if (t < 0 || t > 16) throw new TypeError("invalid length");
  return t === 0 ? e3.toString() : ("0000000000000000" + e3.toString()).slice(-t);
}
class yo extends o1 {
  constructor(t, r) {
    if (super(), r || (r = 1), Wr(t) && Si(t) || (t = 100), t < 0) throw new TypeError("invalid base");
    this.Ki = t, this.kn = r, this.Pn();
  }
  format(t) {
    const r = t < 0 ? "\u2212" : "";
    return t = Math.abs(t), r + this.Tn(t);
  }
  Pn() {
    if (this.Rn = 0, this.Ki > 0 && this.kn > 0) {
      let t = this.Ki;
      for (; t > 1; ) t /= 10, this.Rn++;
    }
  }
  Tn(t) {
    const r = this.Ki / this.kn;
    let n = Math.floor(t), i = "";
    const s = this.Rn !== void 0 ? this.Rn : NaN;
    if (r > 1) {
      let a = +(Math.round(t * r) - n * r).toFixed(this.Rn);
      a >= r && (a -= r, n += 1), i = Jm + Fe(+a.toFixed(this.Rn) * this.kn, s);
    } else n = Math.round(n * r) / r, s > 0 && (i = Jm + Fe(0, s));
    return n.toFixed(0) + i;
  }
}
class l1 extends yo {
  constructor(t = 100) {
    super(t);
  }
  format(t) {
    return `${super.format(t)}%`;
  }
}
class sz extends o1 {
  constructor(t) {
    super(), this.Dn = t;
  }
  format(t) {
    let r = "";
    return t < 0 && (r = "-", t = -t), t < 995 ? r + this.In(t) : t < 999995 ? r + this.In(t / 1e3) + "K" : t < 999999995 ? (t = 1e3 * Math.round(t / 1e3), r + this.In(t / 1e6) + "M") : (t = 1e6 * Math.round(t / 1e6), r + this.In(t / 1e9) + "B");
  }
  In(t) {
    let r;
    const n = Math.pow(10, this.Dn);
    return r = (t = Math.round(t * n) / n) >= 1e-15 && t < 1 ? t.toFixed(this.Dn).replace(/\.?0+$/, "") : String(t), r.replace(/(\.[1-9]*)0+$/, ((i, s) => s));
  }
}
const az = /[2-9]/g;
class Mi {
  constructor(t = 50) {
    this.Vn = 0, this.Bn = 1, this.En = 1, this.An = {}, this.Ln = /* @__PURE__ */ new Map(), this.zn = t;
  }
  On() {
    this.Vn = 0, this.Ln.clear(), this.Bn = 1, this.En = 1, this.An = {};
  }
  Ii(t, r, n) {
    return this.Nn(t, r, n).width;
  }
  Di(t, r, n) {
    const i = this.Nn(t, r, n);
    return ((i.actualBoundingBoxAscent || 0) - (i.actualBoundingBoxDescent || 0)) / 2;
  }
  Nn(t, r, n) {
    const i = n || az, s = String(r).replace(i, "0");
    if (this.Ln.has(s)) return Yt(this.Ln.get(s)).Fn;
    if (this.Vn === this.zn) {
      const o = this.An[this.En];
      delete this.An[this.En], this.Ln.delete(o), this.En++, this.Vn--;
    }
    t.save(), t.textBaseline = "middle";
    const a = t.measureText(s);
    return t.restore(), a.width === 0 && r.length || (this.Ln.set(s, { Fn: a, Wn: this.Bn }), this.An[this.Bn] = s, this.Vn++, this.Bn++), a;
  }
}
class oz {
  constructor(t) {
    this.Hn = null, this.M = null, this.Un = "right", this.$n = t;
  }
  qn(t, r, n) {
    this.Hn = t, this.M = r, this.Un = n;
  }
  nt(t) {
    this.M !== null && this.Hn !== null && this.Hn.nt(t, this.M, this.$n, this.Un);
  }
}
class u1 {
  constructor(t, r, n) {
    this.jn = t, this.$n = new Mi(50), this.Yn = r, this.O = n, this.F = -1, this.Xt = new oz(this.$n);
  }
  Tt() {
    const t = this.O.Kn(this.Yn);
    if (t === null) return null;
    const r = t.Zn(this.Yn) ? t.Gn() : this.Yn.Ft();
    if (r === null) return null;
    const n = t.Xn(r);
    if (n === "overlay") return null;
    const i = this.O.Jn();
    return i.k !== this.F && (this.F = i.k, this.$n.On()), this.Xt.qn(this.jn.ji(), i, n), this.Xt;
  }
}
class lz extends tr {
  constructor() {
    super(...arguments), this.jt = null;
  }
  ht(t) {
    this.jt = t;
  }
  Qn(t, r) {
    var _a3;
    if (!((_a3 = this.jt) == null ? void 0 : _a3.It)) return null;
    const { ut: n, ct: i, te: s } = this.jt;
    return r >= n - i - 7 && r <= n + i + 7 ? { ie: this.jt, te: s } : null;
  }
  et({ context: t, bitmapSize: r, horizontalPixelRatio: n, verticalPixelRatio: i }) {
    if (this.jt === null || this.jt.It === false) return;
    const s = Math.round(this.jt.ut * i);
    s < 0 || s > r.height || (t.lineCap = "butt", t.strokeStyle = this.jt.R, t.lineWidth = Math.floor(this.jt.ct * n), hr(t, this.jt.Zt), e1(t, s, 0, r.width));
  }
}
class Vh {
  constructor(t) {
    this.se = { ut: 0, R: "rgba(0, 0, 0, 0)", ct: 1, Zt: 0, It: false }, this.ne = new lz(), this.xt = true, this.ee = t, this.re = t.Qt(), this.ne.ht(this.se);
  }
  kt() {
    this.xt = true;
  }
  Tt() {
    return this.ee.It() ? (this.xt && (this.he(), this.xt = false), this.ne) : null;
  }
}
class uz extends Vh {
  constructor(t) {
    super(t);
  }
  he() {
    this.se.It = false;
    const t = this.ee.Ft(), r = t.ae().ae;
    if (r !== 2 && r !== 3) return;
    const n = this.ee.N();
    if (!n.baseLineVisible || !this.ee.It()) return;
    const i = this.ee.Lt();
    i !== null && (this.se.It = true, this.se.ut = t.Nt(i.Wt, i.Wt), this.se.R = n.baseLineColor, this.se.ct = n.baseLineWidth, this.se.Zt = n.baseLineStyle);
  }
}
class cz extends tr {
  constructor() {
    super(...arguments), this.jt = null;
  }
  ht(t) {
    this.jt = t;
  }
  le() {
    return this.jt;
  }
  et({ context: t, horizontalPixelRatio: r, verticalPixelRatio: n }) {
    const i = this.jt;
    if (i === null) return;
    const s = Math.max(1, Math.floor(r)), a = s % 2 / 2, o = Math.round(i.oe.x * r) + a, l = i.oe.y * n;
    t.fillStyle = i._e, t.beginPath();
    const u = Math.max(2, 1.5 * i.ue) * r;
    t.arc(o, l, u, 0, 2 * Math.PI, false), t.fill(), t.fillStyle = i.ce, t.beginPath(), t.arc(o, l, i.ft * r, 0, 2 * Math.PI, false), t.fill(), t.lineWidth = s, t.strokeStyle = i.de, t.beginPath(), t.arc(o, l, i.ft * r + s / 2, 0, 2 * Math.PI, false), t.stroke();
  }
}
const hz = [{ fe: 0, pe: 0.25, ve: 4, me: 10, we: 0.25, ge: 0, Me: 0.4, be: 0.8 }, { fe: 0.25, pe: 0.525, ve: 10, me: 14, we: 0, ge: 0, Me: 0.8, be: 0 }, { fe: 0.525, pe: 1, ve: 14, me: 14, we: 0, ge: 0, Me: 0, be: 0 }];
class fz {
  constructor(t) {
    this.Xt = new cz(), this.xt = true, this.Se = true, this.xe = performance.now(), this.Ce = this.xe - 1, this.ye = t;
  }
  ke() {
    this.Ce = this.xe - 1, this.kt();
  }
  Pe() {
    if (this.kt(), this.ye.N().lastPriceAnimation === 2) {
      const t = performance.now(), r = this.Ce - t;
      if (r > 0) return void (r < 650 && (this.Ce += 2600));
      this.xe = t, this.Ce = t + 2600;
    }
  }
  kt() {
    this.xt = true;
  }
  Te() {
    this.Se = true;
  }
  It() {
    return this.ye.N().lastPriceAnimation !== 0;
  }
  Re() {
    switch (this.ye.N().lastPriceAnimation) {
      case 0:
        return false;
      case 1:
        return true;
      case 2:
        return performance.now() <= this.Ce;
    }
  }
  Tt() {
    return this.xt ? (this.Rt(), this.xt = false, this.Se = false) : this.Se && (this.De(), this.Se = false), this.Xt;
  }
  Rt() {
    this.Xt.ht(null);
    const t = this.ye.Qt().Et(), r = t.Ie(), n = this.ye.Lt();
    if (r === null || n === null) return;
    const i = this.ye.Ve(true);
    if (i.Be || !r.Ee(i.js)) return;
    const s = { x: t.qt(i.js), y: this.ye.Ft().Nt(i.gt, n.Wt) }, a = i.R, o = this.ye.N().lineWidth, l = this.Ae(this.Le(), a);
    this.Xt.ht({ _e: a, ue: o, ce: l.ce, de: l.de, ft: l.ft, oe: s });
  }
  De() {
    const t = this.Xt.le();
    if (t !== null) {
      const r = this.Ae(this.Le(), t._e);
      t.ce = r.ce, t.de = r.de, t.ft = r.ft;
    }
  }
  Le() {
    return this.Re() ? performance.now() - this.xe : 2599;
  }
  ze(t, r, n, i) {
    const s = n + (i - n) * r;
    return this.ye.Qt().Xi().Y(t, s);
  }
  Ae(t, r) {
    const n = t % 2600 / 2600;
    let i;
    for (const u of hz) if (n >= u.fe && n <= u.pe) {
      i = u;
      break;
    }
    Mt(i !== void 0, "Last price animation internal logic error");
    const s = (n - i.fe) / (i.pe - i.fe);
    return { ce: this.ze(r, s, i.we, i.ge), de: this.ze(r, s, i.Me, i.be), ft: (a = s, o = i.ve, l = i.me, o + (l - o) * a) };
    var a, o, l;
  }
}
class dz extends Vh {
  constructor(t) {
    super(t);
  }
  he() {
    const t = this.se;
    t.It = false;
    const r = this.ee.N();
    if (!r.priceLineVisible || !this.ee.It()) return;
    const n = this.ee.Ve(r.priceLineSource === 0);
    n.Be || (t.It = true, t.ut = n.Ei, t.R = this.ee.Oe(n.R), t.ct = r.priceLineWidth, t.Zt = r.priceLineStyle);
  }
}
class vz extends mo {
  constructor(t) {
    super(), this.Jt = t;
  }
  Yi(t, r, n) {
    t.It = false, r.It = false;
    const i = this.Jt;
    if (!i.It()) return;
    const s = i.N(), a = s.lastValueVisible, o = i.Ne() !== "", l = s.seriesLastValueMode === 0, u = i.Ve(false);
    if (u.Be) return;
    a && (t.ri = this.Fe(u, a, l), t.It = t.ri.length !== 0), (o || l) && (r.ri = this.We(u, a, o, l), r.It = r.ri.length > 0);
    const c = i.Oe(u.R), h = this.Jt.Qt().Xi().Z(c);
    n.G = h.G, n.Ei = u.Ei, r.Ht = i.Qt().Ut(u.Ei / i.Ft().$t()), t.Ht = c, t.R = h.X, r.R = h.X;
  }
  We(t, r, n, i) {
    let s = "";
    const a = this.Jt.Ne();
    return n && a.length !== 0 && (s += `${a} `), r && i && (s += this.Jt.Ft().He() ? t.Ue : t.$e), s.trim();
  }
  Fe(t, r, n) {
    return r ? n ? this.Jt.Ft().He() ? t.$e : t.Ue : t.ri : "";
  }
}
function Zm(e3, t, r, n) {
  const i = Number.isFinite(t), s = Number.isFinite(r);
  return i && s ? e3(t, r) : i || s ? i ? t : r : n;
}
class $t {
  constructor(t, r) {
    this.qe = t, this.je = r;
  }
  Ye(t) {
    return t !== null && this.qe === t.qe && this.je === t.je;
  }
  Ke() {
    return new $t(this.qe, this.je);
  }
  Ze() {
    return this.qe;
  }
  Ge() {
    return this.je;
  }
  Xe() {
    return this.je - this.qe;
  }
  Gi() {
    return this.je === this.qe || Number.isNaN(this.je) || Number.isNaN(this.qe);
  }
  Sn(t) {
    return t === null ? this : new $t(Zm(Math.min, this.Ze(), t.Ze(), -1 / 0), Zm(Math.max, this.Ge(), t.Ge(), 1 / 0));
  }
  Je(t) {
    if (!Wr(t) || this.je - this.qe === 0) return;
    const r = 0.5 * (this.je + this.qe);
    let n = this.je - r, i = this.qe - r;
    n *= t, i *= t, this.je = r + n, this.qe = r + i;
  }
  Qe(t) {
    Wr(t) && (this.je += t, this.qe += t);
  }
  tr() {
    return { minValue: this.qe, maxValue: this.je };
  }
  static ir(t) {
    return t === null ? null : new $t(t.minValue, t.maxValue);
  }
}
class ya {
  constructor(t, r) {
    this.sr = t, this.nr = r || null;
  }
  er() {
    return this.sr;
  }
  rr() {
    return this.nr;
  }
  tr() {
    return { priceRange: this.sr === null ? null : this.sr.tr(), margins: this.nr || void 0 };
  }
  static ir(t) {
    return t === null ? null : new ya($t.ir(t.priceRange), t.margins);
  }
}
const pz = [2, 4, 8, 16, 32, 64, 128, 256, 512], mz = "Custom series with conflation reducer must have a priceValueBuilder method";
class gz extends Vh {
  constructor(t, r) {
    super(t), this.hr = r;
  }
  he() {
    const t = this.se;
    t.It = false;
    const r = this.hr.N();
    if (!this.ee.It() || !r.lineVisible) return;
    const n = this.hr.ar();
    n !== null && (t.It = true, t.ut = n, t.R = r.color, t.ct = r.lineWidth, t.Zt = r.lineStyle, t.te = this.hr.N().id);
  }
}
class yz extends mo {
  constructor(t, r) {
    super(), this.ye = t, this.hr = r;
  }
  Yi(t, r, n) {
    t.It = false, r.It = false;
    const i = this.hr.N(), s = i.axisLabelVisible, a = i.title !== "", o = this.ye;
    if (!s || !o.It()) return;
    const l = this.hr.ar();
    if (l === null) return;
    a && (r.ri = i.title, r.It = true), r.Ht = o.Qt().Ut(l / o.Ft().$t()), t.ri = this.lr(i.price), t.It = true;
    const u = this.ye.Qt().Xi().Z(i.axisLabelColor || i.color);
    n.G = u.G;
    const c = i.axisLabelTextColor || u.X;
    t.R = c, r.R = c, n.Ei = l;
  }
  lr(t) {
    const r = this.ye.Lt();
    return r === null ? "" : this.ye.Ft().Ji(t, r.Wt);
  }
}
class bz {
  constructor(t, r) {
    this.ye = t, this.Ps = r, this._r = new gz(t, this), this.jn = new yz(t, this), this.ur = new u1(this.jn, t, t.Qt());
  }
  cr(t) {
    Qt(this.Ps, t), this.kt(), this.ye.Qt().dr();
  }
  N() {
    return this.Ps;
  }
  pr() {
    return this._r;
  }
  vr() {
    return this.ur;
  }
  mr() {
    return this.jn;
  }
  kt() {
    this._r.kt(), this.jn.kt();
  }
  ar() {
    const t = this.ye, r = t.Ft();
    if (t.Qt().Et().Gi() || r.Gi()) return null;
    const n = t.Lt();
    return n === null ? null : r.Nt(this.Ps.price, n.Wt);
  }
}
class wz {
  constructor() {
    this.wr = /* @__PURE__ */ new WeakMap();
  }
  gr(t, r, n) {
    const i = 1 / r * n;
    if (t >= i) return 1;
    const s = i / t, a = Math.pow(2, Math.floor(Math.log2(s)));
    return Math.min(a, 512);
  }
  Mr(t, r, n, i = false, s) {
    if (t.length === 0 || r <= 1) return t;
    const a = this.br(r);
    if (a <= 1) return t;
    const o = this.Sr(t);
    let l = o.Cr.get(a);
    return l !== void 0 || (l = this.yr(t, a, n, i, s, o.Cr), o.Cr.set(a, l)), l;
  }
  kr(t, r, n, i, s = false, a) {
    if (n < 1 || t.length === 0) return t;
    const o = this.Sr(t), l = o.Cr.get(n);
    if (!l) return this.Mr(t, n, i, s, a);
    const u = this.Pr(t, r, n, l, s, i, a);
    return o.Cr.set(n, u), u;
  }
  br(t) {
    if (t <= 2) return 2;
    for (const r of pz) if (t <= r) return r;
    return 512;
  }
  Tr(t) {
    if (t.length === 0) return 0;
    const r = t[0], n = t[t.length - 1];
    return 31 * t.length + 17 * r.js + 13 * n.js;
  }
  yr(t, r, n, i = false, s, a = /* @__PURE__ */ new Map()) {
    if (r === 2) return this.Rr(t, 2, n, i, s);
    const o = r / 2;
    let l = a.get(o);
    return l || (l = this.yr(t, o, n, i, s, a), a.set(o, l)), this.Dr(l, n, i, s);
  }
  Rr(t, r, n, i = false, s) {
    const a = this.Ir(t, r, n, i, s);
    return this.Vr(a, i);
  }
  Dr(t, r, n = false, i) {
    const s = this.Ir(t, 2, r, n, i);
    return this.Vr(s, n);
  }
  Ir(t, r, n, i = false, s) {
    const a = [];
    for (let o = 0; o < t.length; o += r) if (t.length - o >= r) {
      const l = this.Br(t[o], t[o + 1], n, i, s);
      l.Er = false, a.push(l);
    } else if (a.length === 0) a.push(this.Ar(t[o], true));
    else {
      const l = a[a.length - 1];
      a[a.length - 1] = this.Lr(l, t[o], n, i, s);
    }
    return a;
  }
  zr(t, r) {
    return (t ?? 1) + (r ?? 1);
  }
  Br(t, r, n, i = false, s) {
    if (!i || !n || !s) {
      const u = t.Wt[1] > r.Wt[1] ? t.Wt[1] : r.Wt[1], c = t.Wt[2] < r.Wt[2] ? t.Wt[2] : r.Wt[2];
      return { Or: t.js, Nr: r.js, Fr: t.wt, Wr: r.wt, Hr: t.Wt[0], Ur: u, $r: c, qr: r.Wt[3], jr: this.zr(t.jr, r.jr), Yr: void 0, Er: false };
    }
    const a = n(this.Kr(t, s), this.Kr(r, s)), o = s(a), l = o.length ? o[o.length - 1] : 0;
    return { Or: t.js, Nr: r.js, Fr: t.wt, Wr: r.wt, Hr: t.Wt[0], Ur: Math.max(t.Wt[1], l), $r: Math.min(t.Wt[2], l), qr: l, jr: this.zr(t.jr, r.jr), Yr: a, Er: false };
  }
  Lr(t, r, n, i = false, s) {
    if (!i || !n || !s) return { Or: t.Or, Nr: r.js, Fr: t.Fr, Wr: r.wt, Hr: t.Hr, Ur: t.Ur > r.Wt[1] ? t.Ur : r.Wt[1], $r: t.$r < r.Wt[2] ? t.$r : r.Wt[2], qr: r.Wt[3], jr: t.jr + (r.jr ?? 1), Yr: t.Yr, Er: false };
    const a = t.Yr, o = this.Kr(r, s), l = a ? { data: a, index: t.Or, originalTime: t.Fr, time: t.Fr, priceValues: s(a) } : null, u = l ? n(l, o) : o.data, c = l ? s(u) : o.priceValues, h = c.length ? c[c.length - 1] : 0;
    return { Or: t.Or, Nr: r.js, Fr: t.Fr, Wr: r.wt, Hr: t.Hr, Ur: Math.max(t.Ur, h), $r: Math.min(t.$r, h), qr: h, jr: t.jr + (r.jr ?? 1), Yr: u, Er: false };
  }
  Zr(t, r, n, i, s, a, o = false, l) {
    const u = r === i ? s : t[r];
    if (n - r == 1) return this.Ar(u, true);
    const c = r + 1 === i ? s : t[r + 1];
    let h = this.Br(u, c, a, o, l);
    for (let f = r + 2; f < n; f++) {
      const d = f === i ? s : t[f];
      h = this.Lr(h, d, a, o, l);
    }
    return h;
  }
  Kr(t, r) {
    const n = t.le ?? {};
    return { data: t.le, index: t.js, originalTime: t.Gr, time: t.wt, priceValues: r(n) };
  }
  Xr(t, r = false) {
    const n = r === true, i = !!t.Yr;
    return { js: t.Or, wt: t.Fr, Gr: t.Fr, Wt: [n ? t.qr : t.Hr, t.Ur, t.$r, t.qr], jr: t.jr, le: n ? i ? t.Yr : { wt: t.Fr } : void 0 };
  }
  Vr(t, r = false) {
    return t.map(((n) => this.Xr(n, r)));
  }
  Pr(t, r, n, i, s = false, a, o) {
    if (i.length === 0) return i;
    const l = t.length - 1, u = Math.floor(l / n) * n;
    if (Math.min(u + n, t.length) - u < n && t.length > n) {
      const c = t.slice();
      return c[c.length - 1] = r, this.Mr(c, n, a, s, o);
    }
    if (Math.floor((l - 1) / n) === Math.floor(l / n) || i.length === 1) {
      const c = Math.min(u + n, t.length), h = c - u;
      if (h <= 0) return i;
      const f = h === 1 ? this.Ar(u === l ? r : t[u], true) : this.Zr(t, u, c, l, r, a, s, o);
      return i[i.length - 1] = this.Xr(f, s), i;
    }
    {
      const c = t.slice();
      return c[c.length - 1] = r, this.Mr(c, n, a, s, o);
    }
  }
  Ar(t, r = false) {
    return { Or: t.js, Nr: t.js, Fr: t.wt, Wr: t.wt, Hr: t.Wt[0], Ur: t.Wt[1], $r: t.Wt[2], qr: t.Wt[3], jr: t.jr ?? 1, Yr: t.le, Er: r };
  }
  Sr(t) {
    const r = this.Jr(t), n = this.Tr(t);
    return r.Qr !== n && (r.Cr.clear(), r.Qr = n), r;
  }
  Jr(t) {
    let r = this.wr.get(t);
    return r === void 0 && (r = { Qr: this.Tr(t), Cr: /* @__PURE__ */ new Map() }, this.wr.set(t, r)), r;
  }
}
class xz extends a1 {
  constructor(t) {
    super(), this.ns = t;
  }
  Qt() {
    return this.ns;
  }
}
const Pz = { Bar: (e3, t, r, n) => {
  const i = t.upColor, s = t.downColor, a = C(e3(r, n)), o = or(a.Wt[0]) <= or(a.Wt[3]);
  return { th: a.R ?? (o ? i : s) };
}, Candlestick: (e3, t, r, n) => {
  const i = t.upColor, s = t.downColor, a = t.borderUpColor, o = t.borderDownColor, l = t.wickUpColor, u = t.wickDownColor, c = C(e3(r, n)), h = or(c.Wt[0]) <= or(c.Wt[3]);
  return { th: c.R ?? (h ? i : s), ih: c.Ht ?? (h ? a : o), sh: c.nh ?? (h ? l : u) };
}, Custom: (e3, t, r, n) => ({ th: C(e3(r, n)).R ?? t.color }), Area: (e3, t, r, n) => {
  const i = C(e3(r, n));
  return { th: i.vt ?? t.lineColor, vt: i.vt ?? t.lineColor, eh: i.eh ?? t.topColor, rh: i.rh ?? t.bottomColor };
}, Baseline: (e3, t, r, n) => {
  const i = C(e3(r, n));
  return { th: i.Wt[3] >= t.baseValue.price ? t.topLineColor : t.bottomLineColor, hh: i.hh ?? t.topLineColor, ah: i.ah ?? t.bottomLineColor, oh: i.oh ?? t.topFillColor1, _h: i._h ?? t.topFillColor2, uh: i.uh ?? t.bottomFillColor1, dh: i.dh ?? t.bottomFillColor2 };
}, Line: (e3, t, r, n) => {
  const i = C(e3(r, n));
  return { th: i.R ?? t.color, vt: i.R ?? t.color };
}, Histogram: (e3, t, r, n) => ({ th: C(e3(r, n)).R ?? t.color }) };
class Sz {
  constructor(t) {
    this.fh = (r, n) => n !== void 0 ? n.Wt : this.ye.qs().ph(r), this.ye = t, this.mh = Pz[t.wh()];
  }
  gh(t, r) {
    return this.mh(this.fh, this.ye.N(), t, r);
  }
}
function c1(e3, t, r, n, i = 0, s = t.length) {
  let a = s - i;
  for (; 0 < a; ) {
    const o = a >> 1, l = i + o;
    n(t[l], r) === e3 ? (i = l + 1, a -= o + 1) : a = o;
  }
  return i;
}
const Mn = c1.bind(null, true), h1 = c1.bind(null, false);
var Qm;
(function(e3) {
  e3[e3.NearestLeft = -1] = "NearestLeft", e3[e3.None = 0] = "None", e3[e3.NearestRight = 1] = "NearestRight";
})(Qm || (Qm = {}));
const rr = 30;
class _z {
  constructor() {
    this.Mh = [], this.bh = /* @__PURE__ */ new Map(), this.Sh = /* @__PURE__ */ new Map(), this.xh = [];
  }
  Ch() {
    return this.yh() > 0 ? this.Mh[this.Mh.length - 1] : null;
  }
  kh() {
    return this.yh() > 0 ? this.Ph(0) : null;
  }
  sn() {
    return this.yh() > 0 ? this.Ph(this.Mh.length - 1) : null;
  }
  yh() {
    return this.Mh.length;
  }
  Gi() {
    return this.yh() === 0;
  }
  Ee(t) {
    return this.Th(t, 0) !== null;
  }
  ph(t) {
    return this.$s(t);
  }
  $s(t, r = 0) {
    const n = this.Th(t, r);
    return n === null ? null : { ...this.Rh(n), js: this.Ph(n) };
  }
  Dh() {
    return this.Mh;
  }
  Ih(t, r, n) {
    if (this.Gi()) return null;
    let i = null;
    for (const s of n) i = us(i, this.Vh(t, r, s));
    return i;
  }
  ht(t) {
    this.Sh.clear(), this.bh.clear(), this.Mh = t, this.xh = t.map(((r) => r.js));
  }
  Bh() {
    return this.xh;
  }
  Ph(t) {
    return this.Mh[t].js;
  }
  Rh(t) {
    return this.Mh[t];
  }
  Th(t, r) {
    const n = this.Eh(t);
    if (n === null && r !== 0) switch (r) {
      case -1:
        return this.Ah(t);
      case 1:
        return this.Lh(t);
      default:
        throw new TypeError("Unknown search mode");
    }
    return n;
  }
  Ah(t) {
    let r = this.zh(t);
    return r > 0 && (r -= 1), r !== this.Mh.length && this.Ph(r) < t ? r : null;
  }
  Lh(t) {
    const r = this.Oh(t);
    return r !== this.Mh.length && t < this.Ph(r) ? r : null;
  }
  Eh(t) {
    const r = this.zh(t);
    return r === this.Mh.length || t < this.Mh[r].js ? null : r;
  }
  zh(t) {
    return Mn(this.Mh, t, ((r, n) => r.js < n));
  }
  Oh(t) {
    return h1(this.Mh, t, ((r, n) => r.js > n));
  }
  Nh(t, r, n) {
    let i = null;
    for (let s = t; s < r; s++) {
      const a = this.Mh[s].Wt[n];
      Number.isNaN(a) || (i === null ? i = { Fh: a, Wh: a } : (a < i.Fh && (i.Fh = a), a > i.Wh && (i.Wh = a)));
    }
    return i;
  }
  Vh(t, r, n) {
    if (this.Gi()) return null;
    let i = null;
    const s = C(this.kh()), a = C(this.sn()), o = Math.max(t, s), l = Math.min(r, a), u = Math.ceil(o / rr) * rr, c = Math.max(u, Math.floor(l / rr) * rr);
    {
      const f = this.zh(o), d = this.Oh(Math.min(l, u, r));
      i = us(i, this.Nh(f, d, n));
    }
    let h = this.bh.get(n);
    h === void 0 && (h = /* @__PURE__ */ new Map(), this.bh.set(n, h));
    for (let f = Math.max(u + 1, o); f < c; f += rr) {
      const d = Math.floor(f / rr);
      let v = h.get(d);
      if (v === void 0) {
        const p = this.zh(d * rr), m = this.Oh((d + 1) * rr - 1);
        v = this.Nh(p, m, n), h.set(d, v);
      }
      i = us(i, v);
    }
    {
      const f = this.zh(c), d = this.Oh(l);
      i = us(i, this.Nh(f, d, n));
    }
    return i;
  }
}
function us(e3, t) {
  return e3 === null ? t : t === null ? e3 : { Fh: Math.min(e3.Fh, t.Fh), Wh: Math.max(e3.Wh, t.Wh) };
}
function Ql() {
  return new _z();
}
const ba = { setLineStyle: hr };
class Oz {
  constructor(t) {
    this.Hh = t;
  }
  nt(t, r, n) {
    this.Hh.draw(t, ba);
  }
  Uh(t, r, n) {
    var _a3, _b2;
    (_b2 = (_a3 = this.Hh).drawBackground) == null ? void 0 : _b2.call(_a3, t, ba);
  }
}
class Mz {
  constructor(t) {
    this.Ln = null, this.$h = t;
  }
  Tt() {
    var _a3;
    const t = this.$h.renderer();
    if (t === null) return null;
    if (((_a3 = this.Ln) == null ? void 0 : _a3.qh) === t) return this.Ln.jh;
    const r = new Oz(t);
    return this.Ln = { qh: t, jh: r }, r;
  }
  Yh() {
    var _a3, _b2;
    return ((_b2 = (_a3 = this.$h).zOrder) == null ? void 0 : _b2.call(_a3)) ?? "normal";
  }
}
class f1 {
  constructor(t) {
    this.Kh = null, this.Zh = t;
  }
  Gh() {
    return this.Zh;
  }
  Ws() {
    var _a3, _b2;
    (_b2 = (_a3 = this.Zh).updateAllViews) == null ? void 0 : _b2.call(_a3);
  }
  Ys() {
    var _a3, _b2, _c2;
    const t = ((_b2 = (_a3 = this.Zh).paneViews) == null ? void 0 : _b2.call(_a3)) ?? [];
    if (((_c2 = this.Kh) == null ? void 0 : _c2.qh) === t) return this.Kh.jh;
    const r = t.map(((n) => new Mz(n)));
    return this.Kh = { qh: t, jh: r }, r;
  }
  Qn(t, r) {
    var _a3, _b2;
    return ((_b2 = (_a3 = this.Zh).hitTest) == null ? void 0 : _b2.call(_a3, t, r)) ?? null;
  }
}
let Ez = class extends f1 {
  ds() {
    return [];
  }
};
class Az {
  constructor(t) {
    this.Hh = t;
  }
  nt(t, r, n) {
    this.Hh.draw(t, ba);
  }
  Uh(t, r, n) {
    var _a3, _b2;
    (_b2 = (_a3 = this.Hh).drawBackground) == null ? void 0 : _b2.call(_a3, t, ba);
  }
}
class tg {
  constructor(t) {
    this.Ln = null, this.$h = t;
  }
  Tt() {
    var _a3;
    const t = this.$h.renderer();
    if (t === null) return null;
    if (((_a3 = this.Ln) == null ? void 0 : _a3.qh) === t) return this.Ln.jh;
    const r = new Az(t);
    return this.Ln = { qh: t, jh: r }, r;
  }
  Yh() {
    var _a3, _b2;
    return ((_b2 = (_a3 = this.$h).zOrder) == null ? void 0 : _b2.call(_a3)) ?? "normal";
  }
}
function d1(e3) {
  var _a3, _b2, _c2;
  return { ri: e3.text(), Ei: e3.coordinate(), Vi: (_a3 = e3.fixedCoordinate) == null ? void 0 : _a3.call(e3), R: e3.textColor(), G: e3.backColor(), It: ((_b2 = e3.visible) == null ? void 0 : _b2.call(e3)) ?? true, pi: ((_c2 = e3.tickVisible) == null ? void 0 : _c2.call(e3)) ?? true };
}
class Cz {
  constructor(t, r) {
    this.Xt = new s1(), this.Xh = t, this.Jh = r;
  }
  Tt() {
    return this.Xt.ht({ ss: this.Jh.ss(), ...d1(this.Xh) }), this.Xt;
  }
}
class jz extends mo {
  constructor(t, r) {
    super(), this.Xh = t, this.Ki = r;
  }
  Yi(t, r, n) {
    const i = d1(this.Xh);
    n.G = i.G, t.R = i.R;
    const s = 2 / 12 * this.Ki.k();
    n.Ti = s, n.Ri = s, n.Ei = i.Ei, n.Vi = i.Vi, t.ri = i.ri, t.It = i.It, t.pi = i.pi;
  }
}
class kz extends f1 {
  constructor(t, r) {
    super(t), this.Qh = null, this.ta = null, this.ia = null, this.sa = null, this.ye = r;
  }
  fs() {
    var _a3, _b2, _c2;
    const t = ((_b2 = (_a3 = this.Zh).timeAxisViews) == null ? void 0 : _b2.call(_a3)) ?? [];
    if (((_c2 = this.Qh) == null ? void 0 : _c2.qh) === t) return this.Qh.jh;
    const r = this.ye.Qt().Et(), n = t.map(((i) => new Cz(i, r)));
    return this.Qh = { qh: t, jh: n }, n;
  }
  Ks() {
    var _a3, _b2, _c2;
    const t = ((_b2 = (_a3 = this.Zh).priceAxisViews) == null ? void 0 : _b2.call(_a3)) ?? [];
    if (((_c2 = this.ta) == null ? void 0 : _c2.qh) === t) return this.ta.jh;
    const r = this.ye.Ft(), n = t.map(((i) => new jz(i, r)));
    return this.ta = { qh: t, jh: n }, n;
  }
  na() {
    var _a3, _b2, _c2;
    const t = ((_b2 = (_a3 = this.Zh).priceAxisPaneViews) == null ? void 0 : _b2.call(_a3)) ?? [];
    if (((_c2 = this.ia) == null ? void 0 : _c2.qh) === t) return this.ia.jh;
    const r = t.map(((n) => new tg(n)));
    return this.ia = { qh: t, jh: r }, r;
  }
  ea() {
    var _a3, _b2, _c2;
    const t = ((_b2 = (_a3 = this.Zh).timeAxisPaneViews) == null ? void 0 : _b2.call(_a3)) ?? [];
    if (((_c2 = this.sa) == null ? void 0 : _c2.qh) === t) return this.sa.jh;
    const r = t.map(((n) => new tg(n)));
    return this.sa = { qh: t, jh: r }, r;
  }
  ra(t, r) {
    var _a3, _b2;
    return ((_b2 = (_a3 = this.Zh).autoscaleInfo) == null ? void 0 : _b2.call(_a3, t, r)) ?? null;
  }
}
function tu(e3, t, r, n) {
  e3.forEach(((i) => {
    t(i).forEach(((s) => {
      s.Yh() === r && n.push(s);
    }));
  }));
}
function eu(e3) {
  return e3.Ys();
}
function Iz(e3) {
  return e3.na();
}
function Tz(e3) {
  return e3.ea();
}
const Nz = ["Area", "Line", "Baseline"];
class bo extends xz {
  constructor(t, r, n, i, s) {
    super(t), this.jt = Ql(), this._r = new dz(this), this.ha = [], this.aa = new uz(this), this.la = null, this.oa = null, this._a = null, this.ua = [], this.ca = new wz(), this.da = /* @__PURE__ */ new Map(), this.fa = null, this.Ps = n, this.pa = r;
    const a = new vz(this);
    if (this.gs = [a], this.ur = new u1(a, this, t), Nz.includes(this.pa) && (this.la = new fz(this)), this.va(), this.$h = i(this, this.Qt(), s), this.pa === "Custom") {
      const o = this.$h;
      o.ma && this.wa(o.ma);
    }
  }
  m() {
    this._a !== null && clearTimeout(this._a);
  }
  Oe(t) {
    return this.Ps.priceLineColor || t;
  }
  Ve(t) {
    const r = { Be: true }, n = this.Ft();
    if (this.Qt().Et().Gi() || n.Gi() || this.jt.Gi()) return r;
    const i = this.Qt().Et().Ie(), s = this.Lt();
    if (i === null || s === null) return r;
    let a, o;
    if (t) {
      const h = this.jt.Ch();
      if (h === null) return r;
      a = h, o = h.js;
    } else {
      const h = this.jt.$s(i.bi(), -1);
      if (h === null || (a = this.jt.ph(h.js), a === null)) return r;
      o = h.js;
    }
    const l = a.Wt[3], u = this.ga().gh(o, { Wt: a }), c = n.Nt(l, s.Wt);
    return { Be: false, gt: l, ri: n.Ji(l, s.Wt), Ue: n.Ma(l), $e: n.ba(l, s.Wt), R: u.th, Ei: c, js: o };
  }
  ga() {
    return this.oa !== null || (this.oa = new Sz(this)), this.oa;
  }
  N() {
    return this.Ps;
  }
  cr(t) {
    const r = this.Qt(), { priceScaleId: n, visible: i, priceFormat: s } = t;
    n !== void 0 && n !== this.Ps.priceScaleId && r.Sa(this, n), i !== void 0 && i !== this.Ps.visible && r.xa();
    const a = t.conflationThresholdFactor !== void 0;
    Qt(this.Ps, t), a && (this.da.clear(), this.Qt().dr()), s !== void 0 && (this.va(), r.Ca()), r.ya(this), r.ka(), this.$h.kt("options");
  }
  ht(t, r) {
    this.jt.ht(t), this.da.clear();
    const n = this.Qt().Et().N();
    n.enableConflation && n.precomputeConflationOnInit && this.Pa(n.precomputeConflationPriority), this.$h.kt("data"), this.la !== null && (r && r.Ta ? this.la.Pe() : t.length === 0 && this.la.ke());
    const i = this.Qt().Kn(this);
    this.Qt().Ra(i), this.Qt().ya(this), this.Qt().ka(), this.Qt().dr();
  }
  Da(t) {
    const r = new bz(this, t);
    return this.ha.push(r), this.Qt().ya(this), r;
  }
  Ia(t) {
    const r = this.ha.indexOf(t);
    r !== -1 && this.ha.splice(r, 1), this.Qt().ya(this);
  }
  Va() {
    return this.ha;
  }
  wh() {
    return this.pa;
  }
  Lt() {
    const t = this.Ba();
    return t === null ? null : { Wt: t.Wt[3], Ea: t.wt };
  }
  Ba() {
    const t = this.Qt().Et().Ie();
    if (t === null) return null;
    const r = t.Aa();
    return this.jt.$s(r, 1);
  }
  qs() {
    return this.jt;
  }
  wa(t) {
    this.fa = t, this.da.clear();
  }
  La() {
    return !!this.Qt().Et().N().enableConflation && this.za() > 1;
  }
  kr(t) {
    if (!this.La()) return;
    const r = this.za();
    if (!this.da.has(r)) return;
    const n = this.pa === "Custom", i = n && this.fa || void 0, s = n && this.$h.Oa ? (l) => {
      const u = l, c = this.$h.Oa(u);
      return Array.isArray(c) ? c : [typeof c == "number" ? c : 0];
    } : void 0, a = this.ca.kr(this.jt.Dh(), t, r, i, n, s), o = Ql();
    o.ht(a), this.da.set(r, o);
  }
  Na() {
    const t = this.Qt().Et().N().enableConflation;
    if (this.pa === "Custom" && this.fa === null) return this.jt;
    if (!t) return this.jt;
    const r = this.za(), n = this.da.get(r);
    return n || (this.Fa(r), this.da.get(r) ?? this.jt);
  }
  Wa(t) {
    const r = this.jt.ph(t);
    return r === null ? null : this.pa === "Bar" || this.pa === "Candlestick" || this.pa === "Custom" ? { Hr: r.Wt[0], Ur: r.Wt[1], $r: r.Wt[2], qr: r.Wt[3] } : r.Wt[3];
  }
  Ha(t) {
    const r = [];
    tu(this.ua, eu, "top", r);
    const n = this.la;
    return n !== null && n.It() && (this._a === null && n.Re() && (this._a = setTimeout((() => {
      this._a = null, this.Qt().Ua();
    }), 0)), n.Te(), r.unshift(n)), r;
  }
  Ys() {
    const t = [];
    this.$a() || t.push(this.aa), t.push(this.$h, this._r);
    const r = this.ha.map(((n) => n.pr()));
    return t.push(...r), tu(this.ua, eu, "normal", t), t;
  }
  qa() {
    return this.ja(eu, "bottom");
  }
  Ya(t) {
    return this.ja(Iz, t);
  }
  Ka(t) {
    return this.ja(Tz, t);
  }
  Za(t, r) {
    return this.ua.map(((n) => n.Qn(t, r))).filter(((n) => n !== null));
  }
  ds() {
    return [this.ur, ...this.ha.map(((t) => t.vr()))];
  }
  Ks(t, r) {
    if (r !== this.hs && !this.$a()) return [];
    const n = [...this.gs];
    for (const i of this.ha) n.push(i.mr());
    return this.ua.forEach(((i) => {
      n.push(...i.Ks());
    })), n;
  }
  fs() {
    const t = [];
    return this.ua.forEach(((r) => {
      t.push(...r.fs());
    })), t;
  }
  ra(t, r) {
    if (this.Ps.autoscaleInfoProvider !== void 0) {
      const n = this.Ps.autoscaleInfoProvider((() => {
        const i = this.Ga(t, r);
        return i === null ? null : i.tr();
      }));
      return ya.ir(n);
    }
    return this.Ga(t, r);
  }
  qh() {
    const t = this.Ps.priceFormat;
    return t.base ?? 1 / t.minMove;
  }
  Xa() {
    return this.Ja;
  }
  Ws() {
    var _a3;
    this.$h.kt();
    for (const t of this.gs) t.kt();
    for (const t of this.ha) t.kt();
    this._r.kt(), this.aa.kt(), (_a3 = this.la) == null ? void 0 : _a3.kt(), this.ua.forEach(((t) => t.Ws()));
  }
  Ft() {
    return C(super.Ft());
  }
  At(t) {
    if (!((this.pa === "Line" || this.pa === "Area" || this.pa === "Baseline") && this.Ps.crosshairMarkerVisible)) return null;
    const r = this.jt.ph(t);
    return r === null ? null : { gt: r.Wt[3], ft: this.Qa(), Ht: this.tl(), Ot: this.il(), zt: this.sl(t) };
  }
  Ne() {
    return this.Ps.title;
  }
  It() {
    return this.Ps.visible;
  }
  nl(t) {
    this.ua.push(new kz(t, this));
  }
  el(t) {
    this.ua = this.ua.filter(((r) => r.Gh() !== t));
  }
  rl() {
    if (this.pa === "Custom") return (t) => this.$h.Oa(t);
  }
  hl() {
    if (this.pa === "Custom") return (t) => this.$h.al(t);
  }
  ll() {
    return this.jt.Bh();
  }
  $a() {
    return !go(this.Ft().ol());
  }
  Ga(t, r) {
    if (!Si(t) || !Si(r) || this.jt.Gi()) return null;
    const n = this.pa === "Line" || this.pa === "Area" || this.pa === "Baseline" || this.pa === "Histogram" ? [3] : [2, 1], i = this.jt.Ih(t, r, n);
    let s = i !== null ? new $t(i.Fh, i.Wh) : null, a = null;
    if (this.wh() === "Histogram") {
      const o = this.Ps.base, l = new $t(o, o);
      s = s !== null ? s.Sn(l) : l;
    }
    return this.ua.forEach(((o) => {
      const l = o.ra(t, r);
      if (l == null ? void 0 : l.priceRange) {
        const u = new $t(l.priceRange.minValue, l.priceRange.maxValue);
        s = s !== null ? s.Sn(u) : u;
      }
      (l == null ? void 0 : l.margins) && (a = l.margins);
    })), new ya(s, a);
  }
  Qa() {
    switch (this.pa) {
      case "Line":
      case "Area":
      case "Baseline":
        return this.Ps.crosshairMarkerRadius;
    }
    return 0;
  }
  tl() {
    switch (this.pa) {
      case "Line":
      case "Area":
      case "Baseline": {
        const t = this.Ps.crosshairMarkerBorderColor;
        if (t.length !== 0) return t;
      }
    }
    return null;
  }
  il() {
    switch (this.pa) {
      case "Line":
      case "Area":
      case "Baseline":
        return this.Ps.crosshairMarkerBorderWidth;
    }
    return 0;
  }
  sl(t) {
    switch (this.pa) {
      case "Line":
      case "Area":
      case "Baseline": {
        const r = this.Ps.crosshairMarkerBackgroundColor;
        if (r.length !== 0) return r;
      }
    }
    return this.ga().gh(t).th;
  }
  va() {
    switch (this.Ps.priceFormat.type) {
      case "custom": {
        const t = this.Ps.priceFormat.formatter;
        this.Ja = { format: t, formatTickmarks: this.Ps.priceFormat.tickmarksFormatter ?? ((r) => r.map(t)) };
        break;
      }
      case "volume":
        this.Ja = new sz(this.Ps.priceFormat.precision);
        break;
      case "percent":
        this.Ja = new l1(this.Ps.priceFormat.precision);
        break;
      default: {
        const t = Math.pow(10, this.Ps.priceFormat.precision);
        this.Ja = new yo(t, this.Ps.priceFormat.minMove * t);
      }
    }
    this.hs !== null && this.hs._l();
  }
  ja(t, r) {
    const n = [];
    return tu(this.ua, t, r, n), n;
  }
  za() {
    const { ul: t, cl: r, dl: n } = this.fl();
    return this.ca.gr(t, r, n);
  }
  fl() {
    const t = this.Qt().Et(), r = t.ul(), n = window.devicePixelRatio || 1, i = t.N().conflationThresholdFactor;
    return { ul: r, cl: n, dl: this.Ps.conflationThresholdFactor ?? i ?? 1 };
  }
  pl(t) {
    const r = this.jt.Dh();
    let n;
    if (this.pa === "Custom" && this.fa !== null) {
      const s = this.rl();
      if (!s) throw new Error(mz);
      n = this.ca.Mr(r, t, this.fa, true, ((a) => s(a)));
    } else n = this.ca.Mr(r, t);
    const i = Ql();
    return i.ht(n), i;
  }
  Fa(t) {
    const r = this.pl(t);
    this.da.set(t, r);
  }
  Pa(t) {
    var _a3;
    if (this.pa === "Custom" && (this.fa === null || !this.rl())) return;
    this.da.clear();
    const r = this.Qt().Et().vl();
    for (const n of r) {
      const i = () => {
        this.ml(n);
      }, s = typeof window == "object" && window || typeof self == "object" && self;
      ((_a3 = s == null ? void 0 : s.gl) == null ? void 0 : _a3.wl) ? s.gl.wl((() => {
        i();
      }), { Ml: t }) : Promise.resolve().then((() => i()));
    }
  }
  ml(t) {
    if (this.da.has(t) || this.jt.Dh().length === 0) return;
    const r = this.pl(t);
    this.da.set(t, r);
  }
}
const Dz = [3], Lz = [0, 1, 2, 3];
class Rz {
  constructor(t) {
    this.Ps = t;
  }
  bl(t, r, n) {
    let i = t;
    if (this.Ps.mode === 0) return i;
    const s = n.Rs(), a = s.Lt();
    if (a === null) return i;
    const o = s.Nt(t, a), l = n.Sl().filter(((c) => c instanceof bo)).reduce(((c, h) => {
      if (n.Zn(h) || !h.It()) return c;
      const f = h.Ft(), d = h.qs();
      if (f.Gi() || !d.Ee(r)) return c;
      const v = d.ph(r);
      if (v === null) return c;
      const p = or(h.Lt()), m = this.Ps.mode === 3 ? Lz : Dz;
      return c.concat(m.map(((y) => f.Nt(v.Wt[y], p.Wt))));
    }), []);
    if (l.length === 0) return i;
    l.sort(((c, h) => Math.abs(c - o) - Math.abs(h - o)));
    const u = l[0];
    return i = s.Ds(u, a), i;
  }
}
function pn(e3, t, r) {
  return Math.min(Math.max(e3, t), r);
}
function cs(e3, t, r) {
  return t - e3 <= r;
}
function Yh(e3) {
  const t = Math.ceil(e3);
  return t % 2 == 0 ? t - 1 : t;
}
class $z extends tr {
  constructor() {
    super(...arguments), this.jt = null;
  }
  ht(t) {
    this.jt = t;
  }
  et({ context: t, bitmapSize: r, horizontalPixelRatio: n, verticalPixelRatio: i }) {
    if (this.jt === null) return;
    const s = Math.max(1, Math.floor(n));
    t.lineWidth = s, (function(a, o) {
      a.save(), a.lineWidth % 2 && a.translate(0.5, 0.5), o(), a.restore();
    })(t, (() => {
      const a = C(this.jt);
      if (a.xl) {
        t.strokeStyle = a.Cl, hr(t, a.yl), t.beginPath();
        for (const o of a.kl) {
          const l = Math.round(o.Pl * n);
          t.moveTo(l, -s), t.lineTo(l, r.height + s);
        }
        t.stroke();
      }
      if (a.Tl) {
        t.strokeStyle = a.Rl, hr(t, a.Dl), t.beginPath();
        for (const o of a.Il) {
          const l = Math.round(o.Pl * i);
          t.moveTo(-s, l), t.lineTo(r.width + s, l);
        }
        t.stroke();
      }
    }));
  }
}
class zz {
  constructor(t) {
    this.Xt = new $z(), this.xt = true, this.yt = t;
  }
  kt() {
    this.xt = true;
  }
  Tt() {
    if (this.xt) {
      const t = this.yt.Qt().N().grid, r = { Tl: t.horzLines.visible, xl: t.vertLines.visible, Rl: t.horzLines.color, Cl: t.vertLines.color, Dl: t.horzLines.style, yl: t.vertLines.style, Il: this.yt.Rs().Vl(), kl: (this.yt.Qt().Et().Vl() || []).map(((n) => ({ Pl: n.coord }))) };
      this.Xt.ht(r), this.xt = false;
    }
    return this.Xt;
  }
}
class Bz {
  constructor(t) {
    this.$h = new zz(t);
  }
  pr() {
    return this.$h;
  }
}
const ru = { Bl: 4, El: 1e-4 };
function cn(e3, t) {
  const r = 100 * (e3 - t) / t;
  return t < 0 ? -r : r;
}
function Fz(e3, t) {
  const r = cn(e3.Ze(), t), n = cn(e3.Ge(), t);
  return new $t(r, n);
}
function ni(e3, t) {
  const r = 100 * (e3 - t) / t + 100;
  return t < 0 ? -r : r;
}
function Wz(e3, t) {
  const r = ni(e3.Ze(), t), n = ni(e3.Ge(), t);
  return new $t(r, n);
}
function wa(e3, t) {
  const r = Math.abs(e3);
  if (r < 1e-15) return 0;
  const n = Math.log10(r + t.El) + t.Bl;
  return e3 < 0 ? -n : n;
}
function ii(e3, t) {
  const r = Math.abs(e3);
  if (r < 1e-15) return 0;
  const n = Math.pow(10, r - t.Bl) - t.El;
  return e3 < 0 ? -n : n;
}
function Xn(e3, t) {
  if (e3 === null) return null;
  const r = wa(e3.Ze(), t), n = wa(e3.Ge(), t);
  return new $t(r, n);
}
function hn(e3, t) {
  if (e3 === null) return null;
  const r = ii(e3.Ze(), t), n = ii(e3.Ge(), t);
  return new $t(r, n);
}
function nu(e3) {
  if (e3 === null) return ru;
  const t = Math.abs(e3.Ge() - e3.Ze());
  if (t >= 1 || t < 1e-15) return ru;
  const r = Math.ceil(Math.abs(Math.log10(t))), n = ru.Bl + r;
  return { Bl: n, El: 1 / Math.pow(10, n) };
}
class iu {
  constructor(t, r) {
    if (this.Al = t, this.Ll = r, (function(n) {
      if (n < 0) return false;
      if (n > 1e18) return true;
      for (let i = n; i > 1; i /= 10) if (i % 10 != 0) return false;
      return true;
    })(this.Al)) this.zl = [2, 2.5, 2];
    else {
      this.zl = [];
      for (let n = this.Al; n !== 1; ) {
        if (n % 2 == 0) this.zl.push(2), n /= 2;
        else {
          if (n % 5 != 0) throw new Error("unexpected base");
          this.zl.push(2, 2.5), n /= 5;
        }
        if (this.zl.length > 100) throw new Error("something wrong with base");
      }
    }
  }
  Ol(t, r, n) {
    const i = this.Al === 0 ? 0 : 1 / this.Al;
    let s = Math.pow(10, Math.max(0, Math.ceil(Math.log10(t - r)))), a = 0, o = this.Ll[0];
    for (; ; ) {
      const h = cs(s, i, 1e-14) && s > i + 1e-14, f = cs(s, n * o, 1e-14), d = cs(s, 1, 1e-14);
      if (!(h && f && d)) break;
      s /= o, o = this.Ll[++a % this.Ll.length];
    }
    if (s <= i + 1e-14 && (s = i), s = Math.max(1, s), this.zl.length > 0 && (l = s, u = 1, c = 1e-14, Math.abs(l - u) < c)) for (a = 0, o = this.zl[0]; cs(s, n * o, 1e-14) && s > i + 1e-14; ) s /= o, o = this.zl[++a % this.zl.length];
    var l, u, c;
    return s;
  }
}
class eg {
  constructor(t, r, n, i) {
    this.Nl = [], this.Ki = t, this.Al = r, this.Fl = n, this.Wl = i;
  }
  Ol(t, r) {
    if (t < r) throw new Error("high < low");
    const n = this.Ki.$t(), i = (t - r) * this.Hl() / n, s = new iu(this.Al, [2, 2.5, 2]), a = new iu(this.Al, [2, 2, 2.5]), o = new iu(this.Al, [2.5, 2, 2]), l = [];
    return l.push(s.Ol(t, r, i), a.Ol(t, r, i), o.Ol(t, r, i)), (function(u) {
      if (u.length < 1) throw Error("array is empty");
      let c = u[0];
      for (let h = 1; h < u.length; ++h) u[h] < c && (c = u[h]);
      return c;
    })(l);
  }
  Ul() {
    const t = this.Ki, r = t.Lt();
    if (r === null) return void (this.Nl = []);
    const n = t.$t(), i = this.Fl(n - 1, r), s = this.Fl(0, r), a = this.Ki.N().entireTextOnly ? this.$l() / 2 : 0, o = a, l = n - 1 - a, u = Math.max(i, s), c = Math.min(i, s);
    if (u === c) return void (this.Nl = []);
    const h = this.Ol(u, c);
    if (this.ql(r, h, u, c, o, l), t.jl() && this.Yl(h, c, u)) {
      const v = this.Ki.Kl();
      this.Zl(r, h, o, l, v, 2 * v);
    }
    const f = this.Nl.map(((v) => v.Gl)), d = this.Ki.Xl(f);
    for (let v = 0; v < this.Nl.length; v++) this.Nl[v].Jl = d[v];
  }
  Vl() {
    return this.Nl;
  }
  $l() {
    return this.Ki.k();
  }
  Hl() {
    return Math.ceil(2.5 * this.$l());
  }
  ql(t, r, n, i, s, a) {
    const o = this.Nl, l = this.Ki;
    let u = n % r;
    u += u < 0 ? r : 0;
    const c = n >= i ? 1 : -1;
    let h = null, f = 0;
    for (let d = n - u; d > i; d -= r) {
      const v = this.Wl(d, t, true);
      h !== null && Math.abs(v - h) < this.Hl() || v < s || v > a || (f < o.length ? (o[f].Pl = v, o[f].Jl = l.Ql(d), o[f].Gl = d) : o.push({ Pl: v, Jl: l.Ql(d), Gl: d }), f++, h = v, l.io() && (r = this.Ol(d * c, i)));
    }
    o.length = f;
  }
  Zl(t, r, n, i, s, a) {
    const o = this.Nl, l = this.so(t, n, s, a), u = this.so(t, i, -a, -s), c = this.Wl(0, t, true) - this.Wl(r, t, true);
    o.length > 0 && o[0].Pl - l.Pl < c / 2 && o.shift(), o.length > 0 && u.Pl - o[o.length - 1].Pl < c / 2 && o.pop(), o.unshift(l), o.push(u);
  }
  so(t, r, n, i) {
    const s = (n + i) / 2, a = this.Fl(r + n, t), o = this.Fl(r + i, t), l = Math.min(a, o), u = Math.max(a, o), c = Math.max(0.1, this.Ol(u, l)), h = this.Fl(r + s, t), f = h - h % c, d = this.Wl(f, t, true);
    return { Jl: this.Ki.Ql(f), Pl: d, Gl: f };
  }
  Yl(t, r, n) {
    let i = or(this.Ki.er());
    return this.Ki.io() && (i = hn(i, this.Ki.no())), i.Ze() - r < t && n - i.Ge() < t;
  }
}
function v1(e3) {
  return e3.slice().sort(((t, r) => C(t._s()) - C(r._s())));
}
var rg;
(function(e3) {
  e3[e3.Normal = 0] = "Normal", e3[e3.Logarithmic = 1] = "Logarithmic", e3[e3.Percentage = 2] = "Percentage", e3[e3.IndexedTo100 = 3] = "IndexedTo100";
})(rg || (rg = {}));
const ng = new l1(), ig = new yo(100, 1);
class Kz {
  constructor(t, r, n, i, s) {
    this.eo = 0, this.ro = null, this.sr = null, this.ho = null, this.ao = { lo: false, oo: null }, this._o = false, this.uo = 0, this.co = 0, this.do = new lt(), this.fo = new lt(), this.po = [], this.vo = null, this.mo = null, this.wo = null, this.Mo = null, this.bo = null, this.Ja = ig, this.So = nu(null), this.xo = t, this.Ps = r, this.Co = n, this.yo = i, this.ko = s, this.Po = new eg(this, 100, this.To.bind(this), this.Ro.bind(this));
  }
  ol() {
    return this.xo;
  }
  N() {
    return this.Ps;
  }
  cr(t) {
    if (Qt(this.Ps, t), this._l(), t.mode !== void 0 && this.Do({ ae: t.mode }), t.scaleMargins !== void 0) {
      const r = Yt(t.scaleMargins.top), n = Yt(t.scaleMargins.bottom);
      if (r < 0 || r > 1) throw new Error(`Invalid top margin - expect value between 0 and 1, given=${r}`);
      if (n < 0 || n > 1) throw new Error(`Invalid bottom margin - expect value between 0 and 1, given=${n}`);
      if (r + n > 1) throw new Error(`Invalid margins - sum of margins must be less than 1, given=${r + n}`);
      this.Io(), this.wo = null;
    }
  }
  Vo() {
    return this.Ps.autoScale;
  }
  Bo() {
    return this._o;
  }
  io() {
    return this.Ps.mode === 1;
  }
  He() {
    return this.Ps.mode === 2;
  }
  Eo() {
    return this.Ps.mode === 3;
  }
  no() {
    return this.So;
  }
  ae() {
    return { ln: this.Ps.autoScale, Ao: this.Ps.invertScale, ae: this.Ps.mode };
  }
  Do(t) {
    const r = this.ae();
    let n = null;
    t.ln !== void 0 && (this.Ps.autoScale = t.ln), t.ae !== void 0 && (this.Ps.mode = t.ae, t.ae !== 2 && t.ae !== 3 || (this.Ps.autoScale = true), this.ao.lo = false), r.ae === 1 && t.ae !== r.ae && ((function(s, a) {
      if (s === null) return false;
      const o = ii(s.Ze(), a), l = ii(s.Ge(), a);
      return isFinite(o) && isFinite(l);
    })(this.sr, this.So) ? (n = hn(this.sr, this.So), n !== null && this.Lo(n)) : this.Ps.autoScale = true), t.ae === 1 && t.ae !== r.ae && (n = Xn(this.sr, this.So), n !== null && this.Lo(n));
    const i = r.ae !== this.Ps.mode;
    i && (r.ae === 2 || this.He()) && this._l(), i && (r.ae === 3 || this.Eo()) && this._l(), t.Ao !== void 0 && r.Ao !== t.Ao && (this.Ps.invertScale = t.Ao, this.zo()), this.fo.p(r, this.ae());
  }
  Oo() {
    return this.fo;
  }
  k() {
    return this.Co.fontSize;
  }
  $t() {
    return this.eo;
  }
  No(t) {
    this.eo !== t && (this.eo = t, this.Io(), this.wo = null);
  }
  Fo() {
    if (this.ro) return this.ro;
    const t = this.$t() - this.Wo() - this.Ho();
    return this.ro = t, t;
  }
  er() {
    return this.Uo(), this.sr;
  }
  Lo(t, r) {
    const n = this.sr;
    (r || n === null && t !== null || n !== null && !n.Ye(t)) && (this.wo = null, this.sr = t);
  }
  $o(t) {
    this.Lo(t), this.qo(t !== null);
  }
  Gi() {
    return this.Uo(), this.eo === 0 || !this.sr || this.sr.Gi();
  }
  jo(t) {
    return this.Ao() ? t : this.$t() - 1 - t;
  }
  Nt(t, r) {
    return this.He() ? t = cn(t, r) : this.Eo() && (t = ni(t, r)), this.Ro(t, r);
  }
  Yo(t, r, n) {
    this.Uo();
    const i = this.Ho(), s = C(this.er()), a = s.Ze(), o = s.Ge(), l = this.Fo() - 1, u = this.Ao(), c = l / (o - a), h = n === void 0 ? 0 : n.from, f = n === void 0 ? t.length : n.to, d = this.Ko();
    for (let v = h; v < f; v++) {
      const p = t[v], m = p.gt;
      if (isNaN(m)) continue;
      let y = m;
      d !== null && (y = d(p.gt, r));
      const b = i + c * (y - a), w = u ? b : this.eo - 1 - b;
      p.ut = w;
    }
  }
  Zo(t, r, n) {
    this.Uo();
    const i = this.Ho(), s = C(this.er()), a = s.Ze(), o = s.Ge(), l = this.Fo() - 1, u = this.Ao(), c = l / (o - a), h = n === void 0 ? 0 : n.from, f = n === void 0 ? t.length : n.to, d = this.Ko();
    for (let v = h; v < f; v++) {
      const p = t[v];
      let m = p.Hr, y = p.Ur, b = p.$r, w = p.qr;
      d !== null && (m = d(p.Hr, r), y = d(p.Ur, r), b = d(p.$r, r), w = d(p.qr, r));
      let x = i + c * (m - a), P = u ? x : this.eo - 1 - x;
      p.Go = P, x = i + c * (y - a), P = u ? x : this.eo - 1 - x, p.Xo = P, x = i + c * (b - a), P = u ? x : this.eo - 1 - x, p.Jo = P, x = i + c * (w - a), P = u ? x : this.eo - 1 - x, p.Qo = P;
    }
  }
  Ds(t, r) {
    const n = this.To(t, r);
    return this.t_(n, r);
  }
  t_(t, r) {
    let n = t;
    return this.He() ? n = (function(i, s) {
      return s < 0 && (i = -i), i / 100 * s + s;
    })(n, r) : this.Eo() && (n = (function(i, s) {
      return i -= 100, s < 0 && (i = -i), i / 100 * s + s;
    })(n, r)), n;
  }
  Sl() {
    return this.po;
  }
  Dt() {
    return this.mo || (this.mo = v1(this.po)), this.mo;
  }
  i_(t) {
    this.po.indexOf(t) === -1 && (this.po.push(t), this._l(), this.s_());
  }
  n_(t) {
    const r = this.po.indexOf(t);
    if (r === -1) throw new Error("source is not attached to scale");
    this.po.splice(r, 1), this.po.length === 0 && (this.Do({ ln: true }), this.Lo(null)), this._l(), this.s_();
  }
  Lt() {
    let t = null;
    for (const r of this.po) {
      const n = r.Lt();
      n !== null && (t === null || n.Ea < t.Ea) && (t = n);
    }
    return t === null ? null : t.Wt;
  }
  Ao() {
    return this.Ps.invertScale;
  }
  Vl() {
    const t = this.Lt() === null;
    if (this.wo !== null && (t || this.wo.e_ === t)) return this.wo.Vl;
    this.Po.Ul();
    const r = this.Po.Vl();
    return this.wo = { Vl: r, e_: t }, this.do.p(), r;
  }
  r_() {
    return this.do;
  }
  h_(t) {
    this.He() || this.Eo() || this.Mo === null && this.ho === null && (this.Gi() || (this.Mo = this.eo - t, this.ho = C(this.er()).Ke()));
  }
  a_(t) {
    if (this.He() || this.Eo() || this.Mo === null) return;
    this.Do({ ln: false }), (t = this.eo - t) < 0 && (t = 0);
    let r = (this.Mo + 0.2 * (this.eo - 1)) / (t + 0.2 * (this.eo - 1));
    const n = C(this.ho).Ke();
    r = Math.max(r, 0.1), n.Je(r), this.Lo(n);
  }
  l_() {
    this.He() || this.Eo() || (this.Mo = null, this.ho = null);
  }
  o_(t) {
    this.Vo() || this.bo === null && this.ho === null && (this.Gi() || (this.bo = t, this.ho = C(this.er()).Ke()));
  }
  __(t) {
    if (this.Vo() || this.bo === null) return;
    const r = C(this.er()).Xe() / (this.Fo() - 1);
    let n = t - this.bo;
    this.Ao() && (n *= -1);
    const i = n * r, s = C(this.ho).Ke();
    s.Qe(i), this.Lo(s, true), this.wo = null;
  }
  u_() {
    this.Vo() || this.bo !== null && (this.bo = null, this.ho = null);
  }
  Xa() {
    return this.Ja || this._l(), this.Ja;
  }
  Ji(t, r) {
    switch (this.Ps.mode) {
      case 2:
        return this.c_(cn(t, r));
      case 3:
        return this.Xa().format(ni(t, r));
      default:
        return this.lr(t);
    }
  }
  Ql(t) {
    switch (this.Ps.mode) {
      case 2:
        return this.c_(t);
      case 3:
        return this.Xa().format(t);
      default:
        return this.lr(t);
    }
  }
  Xl(t) {
    switch (this.Ps.mode) {
      case 2:
        return this.d_(t);
      case 3:
        return this.Xa().formatTickmarks(t);
      default:
        return this.f_(t);
    }
  }
  Ma(t) {
    return this.lr(t, C(this.vo).Xa());
  }
  ba(t, r) {
    return t = cn(t, r), this.c_(t, ng);
  }
  p_() {
    return this.po;
  }
  v_(t) {
    this.ao = { oo: t, lo: false };
  }
  Ws() {
    this.po.forEach(((t) => t.Ws()));
  }
  jl() {
    return this.Ps.ensureEdgeTickMarksVisible && this.Vo();
  }
  Kl() {
    return this.k() / 2;
  }
  _l() {
    this.wo = null;
    let t = 1 / 0;
    this.vo = null;
    for (const n of this.po) n._s() < t && (t = n._s(), this.vo = n);
    let r = 100;
    this.vo !== null && (r = Math.round(this.vo.qh())), this.Ja = ig, this.He() ? (this.Ja = ng, r = 100) : this.Eo() ? (this.Ja = new yo(100, 1), r = 100) : this.vo !== null && (this.Ja = this.vo.Xa()), this.Po = new eg(this, r, this.To.bind(this), this.Ro.bind(this)), this.Po.Ul();
  }
  s_() {
    this.mo = null;
  }
  m_() {
    return this.vo === null || this.He() || this.Eo() ? 1 : 1 / this.vo.qh();
  }
  Xi() {
    return this.ko;
  }
  qo(t) {
    this._o = t;
  }
  Wo() {
    return this.Ao() ? this.Ps.scaleMargins.bottom * this.$t() + this.co : this.Ps.scaleMargins.top * this.$t() + this.uo;
  }
  Ho() {
    return this.Ao() ? this.Ps.scaleMargins.top * this.$t() + this.uo : this.Ps.scaleMargins.bottom * this.$t() + this.co;
  }
  Uo() {
    this.ao.lo || (this.ao.lo = true, this.w_());
  }
  Io() {
    this.ro = null;
  }
  Ro(t, r) {
    if (this.Uo(), this.Gi()) return 0;
    t = this.io() && t ? wa(t, this.So) : t;
    const n = C(this.er()), i = this.Ho() + (this.Fo() - 1) * (t - n.Ze()) / n.Xe();
    return this.jo(i);
  }
  To(t, r) {
    if (this.Uo(), this.Gi()) return 0;
    const n = this.jo(t), i = C(this.er()), s = i.Ze() + i.Xe() * ((n - this.Ho()) / (this.Fo() - 1));
    return this.io() ? ii(s, this.So) : s;
  }
  zo() {
    this.wo = null, this.Po.Ul();
  }
  w_() {
    if (this.Bo() && !this.Vo()) return;
    const t = this.ao.oo;
    if (t === null) return;
    let r = null;
    const n = this.p_();
    let i = 0, s = 0;
    for (const l of n) {
      if (!l.It()) continue;
      const u = l.Lt();
      if (u === null) continue;
      const c = l.ra(t.Aa(), t.bi());
      let h = c && c.er();
      if (h !== null) {
        switch (this.Ps.mode) {
          case 1:
            h = Xn(h, this.So);
            break;
          case 2:
            h = Fz(h, u.Wt);
            break;
          case 3:
            h = Wz(h, u.Wt);
        }
        if (r = r === null ? h : r.Sn(C(h)), c !== null) {
          const f = c.rr();
          f !== null && (i = Math.max(i, f.above), s = Math.max(s, f.below));
        }
      }
    }
    if (this.jl() && (i = Math.max(i, this.Kl()), s = Math.max(s, this.Kl())), i === this.uo && s === this.co || (this.uo = i, this.co = s, this.wo = null, this.Io()), r !== null) {
      if (r.Ze() === r.Ge()) {
        const l = 5 * this.m_();
        this.io() && (r = hn(r, this.So)), r = new $t(r.Ze() - l, r.Ge() + l), this.io() && (r = Xn(r, this.So));
      }
      if (this.io()) {
        const l = hn(r, this.So), u = nu(l);
        if (a = u, o = this.So, a.Bl !== o.Bl || a.El !== o.El) {
          const c = this.ho !== null ? hn(this.ho, this.So) : null;
          this.So = u, r = Xn(l, u), c !== null && (this.ho = Xn(c, u));
        }
      }
      this.Lo(r);
    } else this.sr === null && (this.Lo(new $t(-0.5, 0.5)), this.So = nu(null));
    var a, o;
  }
  Ko() {
    return this.He() ? cn : this.Eo() ? ni : this.io() ? (t) => wa(t, this.So) : null;
  }
  g_(t, r, n) {
    return r === void 0 ? (n === void 0 && (n = this.Xa()), n.format(t)) : r(t);
  }
  M_(t, r, n) {
    return r === void 0 ? (n === void 0 && (n = this.Xa()), n.formatTickmarks(t)) : r(t);
  }
  lr(t, r) {
    return this.g_(t, this.yo.priceFormatter, r);
  }
  f_(t, r) {
    const n = this.yo.priceFormatter;
    return this.M_(t, this.yo.tickmarksPriceFormatter ?? (n ? (i) => i.map(n) : void 0), r);
  }
  c_(t, r) {
    return this.g_(t, this.yo.percentageFormatter, r);
  }
  d_(t, r) {
    const n = this.yo.percentageFormatter;
    return this.M_(t, this.yo.tickmarksPercentageFormatter ?? (n ? (i) => i.map(n) : void 0), r);
  }
}
function sg(e3) {
  return e3 instanceof bo;
}
class ag {
  constructor(t, r) {
    this.po = [], this.b_ = /* @__PURE__ */ new Map(), this.eo = 0, this.S_ = 0, this.x_ = 1, this.mo = null, this.C_ = false, this.y_ = new lt(), this.ua = [], this.Jh = t, this.ns = r, this.k_ = new Bz(this);
    const n = r.N();
    this.P_ = this.T_("left", n.leftPriceScale), this.R_ = this.T_("right", n.rightPriceScale), this.P_.Oo().i(this.D_.bind(this, this.P_), this), this.R_.Oo().i(this.D_.bind(this, this.R_), this), this.I_(n);
  }
  I_(t) {
    if (t.leftPriceScale && this.P_.cr(t.leftPriceScale), t.rightPriceScale && this.R_.cr(t.rightPriceScale), t.localization && (this.P_._l(), this.R_._l()), t.overlayPriceScales) {
      const r = Array.from(this.b_.values());
      for (const n of r) {
        const i = C(n[0].Ft());
        i.cr(t.overlayPriceScales), t.localization && i._l();
      }
    }
  }
  V_(t) {
    switch (t) {
      case "left":
        return this.P_;
      case "right":
        return this.R_;
    }
    return this.b_.has(t) ? Yt(this.b_.get(t))[0].Ft() : null;
  }
  m() {
    this.Qt().B_().u(this), this.P_.Oo().u(this), this.R_.Oo().u(this), this.po.forEach(((t) => {
      t.m && t.m();
    })), this.ua = this.ua.filter(((t) => {
      const r = t.Gh();
      return r.detached && r.detached(), false;
    })), this.y_.p();
  }
  E_() {
    return this.x_;
  }
  A_(t) {
    this.x_ = t;
  }
  Qt() {
    return this.ns;
  }
  ss() {
    return this.S_;
  }
  $t() {
    return this.eo;
  }
  L_(t) {
    this.S_ = t, this.z_();
  }
  No(t) {
    this.eo = t, this.P_.No(t), this.R_.No(t), this.po.forEach(((r) => {
      if (this.Zn(r)) {
        const n = r.Ft();
        n !== null && n.No(t);
      }
    })), this.z_();
  }
  O_(t) {
    this.C_ = t;
  }
  N_() {
    return this.C_;
  }
  F_() {
    return this.po.filter(sg);
  }
  Sl() {
    return this.po;
  }
  Zn(t) {
    const r = t.Ft();
    return r === null || this.P_ !== r && this.R_ !== r;
  }
  i_(t, r, n) {
    this.W_(t, r, n ? t._s() : this.po.length);
  }
  n_(t, r) {
    const n = this.po.indexOf(t);
    Mt(n !== -1, "removeDataSource: invalid data source"), this.po.splice(n, 1), r || this.po.forEach(((a, o) => a.us(o)));
    const i = C(t.Ft()).ol();
    if (this.b_.has(i)) {
      const a = Yt(this.b_.get(i)), o = a.indexOf(t);
      o !== -1 && (a.splice(o, 1), a.length === 0 && this.b_.delete(i));
    }
    const s = t.Ft();
    s && s.Sl().indexOf(t) >= 0 && (s.n_(t), this.H_(s)), this.mo = null;
  }
  Xn(t) {
    return t === this.P_ ? "left" : t === this.R_ ? "right" : "overlay";
  }
  U_() {
    return this.P_;
  }
  q_() {
    return this.R_;
  }
  j_(t, r) {
    t.h_(r);
  }
  Y_(t, r) {
    t.a_(r), this.z_();
  }
  K_(t) {
    t.l_();
  }
  Z_(t, r) {
    t.o_(r);
  }
  G_(t, r) {
    t.__(r), this.z_();
  }
  X_(t) {
    t.u_();
  }
  z_() {
    this.po.forEach(((t) => {
      t.Ws();
    }));
  }
  Rs() {
    let t = null;
    return this.ns.N().rightPriceScale.visible && this.R_.Sl().length !== 0 ? t = this.R_ : this.ns.N().leftPriceScale.visible && this.P_.Sl().length !== 0 ? t = this.P_ : this.po.length !== 0 && (t = this.po[0].Ft()), t === null && (t = this.R_), t;
  }
  Gn() {
    let t = null;
    return this.ns.N().rightPriceScale.visible ? t = this.R_ : this.ns.N().leftPriceScale.visible && (t = this.P_), t;
  }
  H_(t) {
    t !== null && t.Vo() && this.J_(t);
  }
  Q_(t) {
    const r = this.Jh.Ie();
    t.Do({ ln: true }), r !== null && t.v_(r), this.z_();
  }
  tu() {
    this.J_(this.P_), this.J_(this.R_);
  }
  iu() {
    this.H_(this.P_), this.H_(this.R_), this.po.forEach(((t) => {
      this.Zn(t) && this.H_(t.Ft());
    })), this.z_(), this.ns.dr();
  }
  Dt() {
    return this.mo === null && (this.mo = v1(this.po)), this.mo;
  }
  su(t, r) {
    r = pn(r, 0, this.po.length - 1);
    const n = this.po.indexOf(t);
    Mt(n !== -1, "setSeriesOrder: invalid data source"), this.po.splice(n, 1), this.po.splice(r, 0, t), this.po.forEach(((i, s) => i.us(s))), this.mo = null;
    for (const i of [this.P_, this.R_]) i.s_(), i._l();
    this.ns.dr();
  }
  Vt() {
    return this.Dt().filter(sg);
  }
  nu() {
    return this.y_;
  }
  eu() {
    return this.k_;
  }
  nl(t) {
    this.ua.push(new Ez(t));
  }
  el(t) {
    this.ua = this.ua.filter(((r) => r.Gh() !== t)), t.detached && t.detached(), this.ns.dr();
  }
  ru() {
    return this.ua;
  }
  Za(t, r) {
    return this.ua.map(((n) => n.Qn(t, r))).filter(((n) => n !== null));
  }
  J_(t) {
    const r = t.p_();
    if (r && r.length > 0 && !this.Jh.Gi()) {
      const n = this.Jh.Ie();
      n !== null && t.v_(n);
    }
    t.Ws();
  }
  W_(t, r, n) {
    let i = this.V_(r);
    if (i === null && (i = this.T_(r, this.ns.N().overlayPriceScales)), this.po.splice(n, 0, t), !go(r)) {
      const s = this.b_.get(r) || [];
      s.push(t), this.b_.set(r, s);
    }
    t.us(n), i.i_(t), t.cs(i), this.H_(i), this.mo = null;
  }
  D_(t, r, n) {
    r.ae !== n.ae && this.J_(t);
  }
  T_(t, r) {
    const n = { visible: true, autoScale: true, ...Be(r) }, i = new Kz(t, n, this.ns.N().layout, this.ns.N().localization, this.ns.Xi());
    return i.No(this.$t()), i;
  }
}
function hs(e3) {
  return { hu: e3.hu, au: { te: e3.lu.externalId }, ou: e3.lu.cursorStyle };
}
function Uz(e3, t, r, n) {
  for (const i of e3) {
    const s = i.Tt(n);
    if (s !== null && s.Qn) {
      const a = s.Qn(t, r);
      if (a !== null) return { _u: i, au: a };
    }
  }
  return null;
}
function qz(e3) {
  return e3.Ys !== void 0;
}
function p1(e3, t, r) {
  const n = [e3, ...e3.Dt()], i = (function(s, a, o) {
    var _a3;
    let l, u;
    for (const f of s) {
      const d = ((_a3 = f.Za) == null ? void 0 : _a3.call(f, a, o)) ?? [];
      for (const v of d) c = v.zOrder, h = l == null ? void 0 : l.zOrder, (!h || c === "top" && h !== "top" || c === "normal" && h === "bottom") && (l = v, u = f);
    }
    var c, h;
    return l && u ? { lu: l, hu: u } : null;
  })(n, t, r);
  if ((i == null ? void 0 : i.lu.zOrder) === "top") return hs(i);
  for (const s of n) {
    if (i && i.hu === s && i.lu.zOrder !== "bottom" && !i.lu.isBackground) return hs(i);
    if (qz(s)) {
      const a = Uz(s.Ys(e3), t, r, e3);
      if (a !== null) return { hu: s, _u: a._u, au: a.au };
    }
    if (i && i.hu === s && i.lu.zOrder !== "bottom" && i.lu.isBackground) return hs(i);
  }
  return (i == null ? void 0 : i.lu) ? hs(i) : null;
}
class Vz {
  constructor(t, r, n = 50) {
    this.Vn = 0, this.Bn = 1, this.En = 1, this.Ln = /* @__PURE__ */ new Map(), this.An = /* @__PURE__ */ new Map(), this.uu = t, this.cu = r, this.zn = n;
  }
  du(t) {
    const r = t.time, n = this.cu.cacheKey(r), i = this.Ln.get(n);
    if (i !== void 0) return i.fu;
    if (this.Vn === this.zn) {
      const a = this.An.get(this.En);
      this.An.delete(this.En), this.Ln.delete(Yt(a)), this.En++, this.Vn--;
    }
    const s = this.uu(t);
    return this.Ln.set(n, { fu: s, Wn: this.Bn }), this.An.set(this.Bn, n), this.Vn++, this.Bn++, s;
  }
}
class mn {
  constructor(t, r) {
    Mt(t <= r, "right should be >= left"), this.pu = t, this.vu = r;
  }
  Aa() {
    return this.pu;
  }
  bi() {
    return this.vu;
  }
  mu() {
    return this.vu - this.pu + 1;
  }
  Ee(t) {
    return this.pu <= t && t <= this.vu;
  }
  Ye(t) {
    return this.pu === t.Aa() && this.vu === t.bi();
  }
}
function og(e3, t) {
  return e3 === null || t === null ? e3 === t : e3.Ye(t);
}
class Yz {
  constructor() {
    this.wu = /* @__PURE__ */ new Map(), this.Ln = null, this.gu = false;
  }
  Mu(t) {
    this.gu = t, this.Ln = null;
  }
  bu(t, r) {
    this.Su(r), this.Ln = null;
    for (let n = r; n < t.length; ++n) {
      const i = t[n];
      let s = this.wu.get(i.timeWeight);
      s === void 0 && (s = [], this.wu.set(i.timeWeight, s)), s.push({ index: n, time: i.time, weight: i.timeWeight, originalTime: i.originalTime });
    }
  }
  xu(t, r, n, i, s) {
    const a = Math.ceil(r / t);
    return this.Ln !== null && this.Ln.Cu === a && s === this.Ln.yu && n === this.Ln.ku || (this.Ln = { yu: s, ku: n, Vl: this.Pu(a, n, i), Cu: a }), this.Ln.Vl;
  }
  Su(t) {
    if (t === 0) return void this.wu.clear();
    const r = [];
    this.wu.forEach(((n, i) => {
      t <= n[0].index ? r.push(i) : n.splice(Mn(n, t, ((s) => s.index < t)), 1 / 0);
    }));
    for (const n of r) this.wu.delete(n);
  }
  Pu(t, r, n) {
    let i = [];
    const s = (a) => !r || n.has(a.index);
    for (const a of Array.from(this.wu.keys()).sort(((o, l) => l - o))) {
      if (!this.wu.get(a)) continue;
      const o = i;
      i = [];
      const l = o.length;
      let u = 0;
      const c = Yt(this.wu.get(a)), h = c.length;
      let f = 1 / 0, d = -1 / 0;
      for (let v = 0; v < h; v++) {
        const p = c[v], m = p.index;
        for (; u < l; ) {
          const y = o[u], b = y.index;
          if (!(b < m && s(y))) {
            f = b;
            break;
          }
          u++, i.push(y), d = b, f = 1 / 0;
        }
        if (f - m >= t && m - d >= t && s(p)) i.push(p), d = m;
        else if (this.gu) return o;
      }
      for (; u < l; u++) s(o[u]) && i.push(o[u]);
    }
    return i;
  }
}
class gn {
  constructor(t) {
    this.Tu = t;
  }
  Ru() {
    return this.Tu === null ? null : new mn(Math.floor(this.Tu.Aa()), Math.ceil(this.Tu.bi()));
  }
  Du() {
    return this.Tu;
  }
  static Iu() {
    return new gn(null);
  }
}
function Hz(e3, t) {
  return e3.weight > t.weight ? e3 : t;
}
class Gz {
  constructor(t, r, n, i) {
    this.S_ = 0, this.Vu = null, this.Bu = [], this.bo = null, this.Mo = null, this.Eu = new Yz(), this.Au = /* @__PURE__ */ new Map(), this.Lu = gn.Iu(), this.zu = true, this.Ou = new lt(), this.Nu = new lt(), this.Fu = new lt(), this.Wu = null, this.Hu = null, this.Uu = /* @__PURE__ */ new Map(), this.$u = -1, this.qu = [], this.ju = 1, this.Ps = r, this.yo = n, this.Yu = r.rightOffset, this.Ku = r.barSpacing, this.ns = t, this.Zu(r), this.cu = i, this.Gu(), this.Eu.Mu(r.uniformDistribution), this.Xu(), this.Ju();
  }
  N() {
    return this.Ps;
  }
  Qu(t) {
    Qt(this.yo, t), this.tc(), this.Gu();
  }
  cr(t, r) {
    Qt(this.Ps, t), this.Ps.fixLeftEdge && this.sc(), this.Ps.fixRightEdge && this.nc(), t.barSpacing !== void 0 && this.ns.gn(t.barSpacing), t.rightOffset !== void 0 && this.ns.Mn(t.rightOffset), this.Zu(t), t.minBarSpacing === void 0 && t.maxBarSpacing === void 0 || this.ns.gn(t.barSpacing ?? this.Ku), t.ignoreWhitespaceIndices !== void 0 && t.ignoreWhitespaceIndices !== this.Ps.ignoreWhitespaceIndices && this.Ju(), this.tc(), this.Gu(), t.enableConflation === void 0 && t.conflationThresholdFactor === void 0 || this.Xu(), this.Fu.p();
  }
  Is(t) {
    var _a3;
    return ((_a3 = this.Bu[t]) == null ? void 0 : _a3.time) ?? null;
  }
  es(t) {
    return this.Bu[t] ?? null;
  }
  ec(t, r) {
    if (this.Bu.length < 1) return null;
    if (this.cu.key(t) > this.cu.key(this.Bu[this.Bu.length - 1].time)) return r ? this.Bu.length - 1 : null;
    const n = Mn(this.Bu, this.cu.key(t), ((i, s) => this.cu.key(i.time) < s));
    return this.cu.key(t) < this.cu.key(this.Bu[n].time) ? r ? n : null : n;
  }
  Gi() {
    return this.S_ === 0 || this.Bu.length === 0 || this.Vu === null;
  }
  rc() {
    return this.Bu.length > 0;
  }
  Ie() {
    return this.hc(), this.Lu.Ru();
  }
  ac() {
    return this.hc(), this.Lu.Du();
  }
  lc() {
    const t = this.Ie();
    if (t === null) return null;
    const r = { from: t.Aa(), to: t.bi() };
    return this.oc(r);
  }
  oc(t) {
    const r = Math.round(t.from), n = Math.round(t.to), i = C(this._c()), s = C(this.uc());
    return { from: C(this.es(Math.max(i, r))), to: C(this.es(Math.min(s, n))) };
  }
  cc(t) {
    return { from: C(this.ec(t.from, true)), to: C(this.ec(t.to, true)) };
  }
  ss() {
    return this.S_;
  }
  L_(t) {
    if (!isFinite(t) || t <= 0 || this.S_ === t) return;
    const r = this.ac(), n = this.S_;
    if (this.S_ = t, this.zu = true, this.Ps.lockVisibleTimeRangeOnResize && n !== 0) {
      const i = this.Ku * t / n;
      this.Ku = i;
    }
    if (this.Ps.fixLeftEdge && r !== null && r.Aa() <= 0) {
      const i = n - t;
      this.Yu -= Math.round(i / this.Ku) + 1, this.zu = true;
    }
    this.dc(), this.fc();
  }
  qt(t) {
    if (this.Gi() || !Si(t)) return 0;
    const r = this.vc() + this.Yu - t;
    return this.S_ - (r + 0.5) * this.Ku - 1;
  }
  mc(t, r) {
    const n = this.vc(), i = r === void 0 ? 0 : r.from, s = r === void 0 ? t.length : r.to;
    for (let a = i; a < s; a++) {
      const o = t[a].wt, l = n + this.Yu - o, u = this.S_ - (l + 0.5) * this.Ku - 1;
      t[a]._t = u;
    }
  }
  wc(t, r) {
    const n = Math.ceil(this.gc(t));
    return r && this.Ps.ignoreWhitespaceIndices && !this.Mc(n) ? this.bc(n) : n;
  }
  Mn(t) {
    this.zu = true, this.Yu = t, this.fc(), this.ns.Sc(), this.ns.dr();
  }
  ul() {
    return this.Ku;
  }
  gn(t) {
    const r = this.Ku;
    if (this.xc(t), this.Ps.rightOffsetPixels !== void 0 && r !== 0) {
      const n = this.Yu * r / this.Ku;
      this.Yu = n;
    }
    this.fc(), this.ns.Sc(), this.ns.dr();
  }
  Cc() {
    return this.Yu;
  }
  Vl() {
    if (this.Gi()) return null;
    if (this.Hu !== null) return this.Hu;
    const t = this.Ku, r = 5 * (this.ns.N().layout.fontSize + 4) / 8 * (this.Ps.tickMarkMaxCharacterLength || 8), n = Math.round(r / t), i = C(this.Ie()), s = Math.max(i.Aa(), i.Aa() - n), a = Math.max(i.bi(), i.bi() - n), o = this.Eu.xu(t, r, this.Ps.ignoreWhitespaceIndices, this.Uu, this.$u), l = this._c() + n, u = this.uc() - n, c = this.yc(), h = this.Ps.fixLeftEdge || c, f = this.Ps.fixRightEdge || c;
    let d = 0;
    for (const v of o) {
      if (!(s <= v.index && v.index <= a)) continue;
      let p;
      d < this.qu.length ? (p = this.qu[d], p.coord = this.qt(v.index), p.label = this.kc(v), p.weight = v.weight) : (p = { needAlignCoordinate: false, coord: this.qt(v.index), label: this.kc(v), weight: v.weight }, this.qu.push(p)), this.Ku > r / 2 && !c ? p.needAlignCoordinate = false : p.needAlignCoordinate = h && v.index <= l || f && v.index >= u, d++;
    }
    return this.qu.length = d, this.Hu = this.qu, this.qu;
  }
  Pc() {
    let t;
    this.zu = true, this.gn(this.Ps.barSpacing), t = this.Ps.rightOffsetPixels !== void 0 ? this.Ps.rightOffsetPixels / this.ul() : this.Ps.rightOffset, this.Mn(t);
  }
  Tc(t) {
    this.zu = true, this.Vu = t, this.fc(), this.sc();
  }
  Rc(t, r) {
    const n = this.gc(t), i = this.ul(), s = i + r * (i / 10);
    this.gn(s), this.Ps.rightBarStaysOnScroll || this.Mn(this.Cc() + (n - this.gc(t)));
  }
  h_(t) {
    this.bo && this.u_(), this.Mo === null && this.Wu === null && (this.Gi() || (this.Mo = t, this.Dc()));
  }
  a_(t) {
    if (this.Wu === null) return;
    const r = pn(this.S_ - t, 0, this.S_), n = pn(this.S_ - C(this.Mo), 0, this.S_);
    r !== 0 && n !== 0 && this.gn(this.Wu.ul * r / n);
  }
  l_() {
    this.Mo !== null && (this.Mo = null, this.Ic());
  }
  o_(t) {
    this.bo === null && this.Wu === null && (this.Gi() || (this.bo = t, this.Dc()));
  }
  __(t) {
    if (this.bo === null) return;
    const r = (this.bo - t) / this.ul();
    this.Yu = C(this.Wu).Cc + r, this.zu = true, this.fc();
  }
  u_() {
    this.bo !== null && (this.bo = null, this.Ic());
  }
  Vc() {
    this.Bc(this.Ps.rightOffset);
  }
  Bc(t, r = 400) {
    if (!isFinite(t)) throw new RangeError("offset is required and must be finite number");
    if (!isFinite(r) || r <= 0) throw new RangeError("animationDuration (optional) must be finite positive number");
    const n = this.Yu, i = performance.now();
    this.ns.vn({ Ec: (s) => (s - i) / r >= 1, Ac: (s) => {
      const a = (s - i) / r;
      return a >= 1 ? t : n + (t - n) * a;
    } });
  }
  kt(t, r) {
    this.zu = true, this.Bu = t, this.Eu.bu(t, r), this.fc();
  }
  Lc() {
    return this.Ou;
  }
  zc() {
    return this.Nu;
  }
  Oc() {
    return this.Fu;
  }
  vc() {
    return this.Vu || 0;
  }
  Nc(t, r) {
    const n = t.mu(), i = r && this.Ps.rightOffsetPixels || 0;
    this.xc((this.S_ - i) / n), this.Yu = t.bi() - this.vc(), r && (this.Yu = i ? i / this.ul() : this.Ps.rightOffset), this.fc(), this.zu = true, this.ns.Sc(), this.ns.dr();
  }
  Fc() {
    const t = this._c(), r = this.uc();
    if (t === null || r === null) return;
    const n = !this.Ps.rightOffsetPixels && this.Ps.rightOffset || 0;
    this.Nc(new mn(t, r + n), true);
  }
  Wc(t) {
    const r = new mn(t.from, t.to);
    this.Nc(r);
  }
  rs(t) {
    return this.yo.timeFormatter !== void 0 ? this.yo.timeFormatter(t.originalTime) : this.cu.formatHorzItem(t.time);
  }
  Ju() {
    if (!this.Ps.ignoreWhitespaceIndices) return;
    this.Uu.clear();
    const t = this.ns.tn();
    for (const r of t) for (const n of r.ll()) this.Uu.set(n, true);
    this.$u++;
  }
  Hc() {
    return this.ju;
  }
  vl() {
    const t = 1 / (window.devicePixelRatio || 1), r = this.Ps.minBarSpacing;
    if (r >= t) return [1];
    const n = [1];
    let i = 2;
    for (; i <= 512; ) r < t / i && n.push(i), i *= 2;
    return n;
  }
  yc() {
    const t = this.ns.N().handleScroll, r = this.ns.N().handleScale;
    return !(t.horzTouchDrag || t.mouseWheel || t.pressedMouseMove || t.vertTouchDrag || r.axisDoubleClickReset.time || r.axisPressedMouseMove.time || r.mouseWheel || r.pinch);
  }
  _c() {
    return this.Bu.length === 0 ? null : 0;
  }
  uc() {
    return this.Bu.length === 0 ? null : this.Bu.length - 1;
  }
  Uc(t) {
    return (this.S_ - 1 - t) / this.Ku;
  }
  gc(t) {
    const r = this.Uc(t), n = this.vc() + this.Yu - r;
    return Math.round(1e6 * n) / 1e6;
  }
  xc(t) {
    const r = this.Ku;
    this.Ku = t, this.dc(), r !== this.Ku && (this.zu = true, this.$c(), this.Xu());
  }
  hc() {
    if (!this.zu) return;
    if (this.zu = false, this.Gi()) return void this.qc(gn.Iu());
    const t = this.vc(), r = this.S_ / this.Ku, n = this.Yu + t, i = new mn(n - r + 1, n);
    this.qc(new gn(i));
  }
  dc() {
    const t = pn(this.Ku, this.jc(), this.Yc());
    this.Ku !== t && (this.Ku = t, this.zu = true);
  }
  Yc() {
    return this.Ps.maxBarSpacing > 0 ? this.Ps.maxBarSpacing : 0.5 * this.S_;
  }
  jc() {
    return this.Ps.fixLeftEdge && this.Ps.fixRightEdge && this.Bu.length !== 0 ? this.S_ / this.Bu.length : this.Ps.minBarSpacing;
  }
  Xu() {
    if (!this.Ps.enableConflation) return void (this.ju = 1);
    const t = 1 / (window.devicePixelRatio || 1) * (this.Ps.conflationThresholdFactor ?? 1);
    if (this.Ku >= t) return void (this.ju = 1);
    const r = t / this.Ku, n = Math.pow(2, Math.floor(Math.log2(r)));
    this.ju = Math.min(n, 512);
  }
  fc() {
    const t = this.Kc();
    t !== null && this.Yu < t && (this.Yu = t, this.zu = true);
    const r = this.Zc();
    this.Yu > r && (this.Yu = r, this.zu = true);
  }
  Kc() {
    const t = this._c(), r = this.Vu;
    return t === null || r === null ? null : t - r - 1 + (this.Ps.fixLeftEdge ? this.S_ / this.Ku : Math.min(2, this.Bu.length));
  }
  Zc() {
    return this.Ps.fixRightEdge ? 0 : this.S_ / this.Ku - Math.min(2, this.Bu.length);
  }
  Dc() {
    this.Wu = { ul: this.ul(), Cc: this.Cc() };
  }
  Ic() {
    this.Wu = null;
  }
  kc(t) {
    let r = this.Au.get(t.weight);
    return r === void 0 && (r = new Vz(((n) => this.Gc(n)), this.cu), this.Au.set(t.weight, r)), r.du(t);
  }
  Gc(t) {
    return this.cu.formatTickmark(t, this.yo);
  }
  qc(t) {
    const r = this.Lu;
    this.Lu = t, og(r.Ru(), this.Lu.Ru()) || this.Ou.p(), og(r.Du(), this.Lu.Du()) || this.Nu.p(), this.$c();
  }
  $c() {
    this.Hu = null;
  }
  tc() {
    this.$c(), this.Au.clear();
  }
  Gu() {
    this.cu.updateFormatter(this.yo);
  }
  sc() {
    if (!this.Ps.fixLeftEdge) return;
    const t = this._c();
    if (t === null) return;
    const r = this.Ie();
    if (r === null) return;
    const n = r.Aa() - t;
    if (n < 0) {
      const i = this.Yu - n - 1;
      this.Mn(i);
    }
    this.dc();
  }
  nc() {
    this.fc(), this.dc();
  }
  Mc(t) {
    return !this.Ps.ignoreWhitespaceIndices || this.Uu.get(t) || false;
  }
  bc(t) {
    const r = (function* (i) {
      const s = Math.round(i), a = s < i;
      let o = 1;
      for (; ; ) a ? (yield s + o, yield s - o) : (yield s - o, yield s + o), o++;
    })(t), n = this.uc();
    for (; n; ) {
      const i = r.next().value;
      if (this.Uu.get(i)) return i;
      if (i < 0 || i > n) break;
    }
    return t;
  }
  Zu(t) {
    if (t.rightOffsetPixels !== void 0) {
      const r = t.rightOffsetPixels / (t.barSpacing || this.Ku);
      this.ns.Mn(r);
    }
  }
}
var lg, ug, cg, hg, fg;
(function(e3) {
  e3[e3.OnTouchEnd = 0] = "OnTouchEnd", e3[e3.OnNextTap = 1] = "OnNextTap";
})(lg || (lg = {}));
class Xz {
  constructor(t, r, n) {
    this.Xc = [], this.Jc = [], this.Qc = null, this.S_ = 0, this.td = null, this.sd = new lt(), this.nd = new lt(), this.ed = null, this.rd = t, this.Ps = r, this.cu = n, this.ko = new Y$(this.Ps.layout.colorParsers), this.hd = new V$(this), this.Jh = new Gz(this, r.timeScale, this.Ps.localization, n), this.Ct = new iz(this, r.crosshair), this.ad = new Rz(r.crosshair), r.addDefaultPane && (this.ld(0), this.Xc[0].A_(2)), this.od = this._d(0), this.ud = this._d(1);
  }
  Ca() {
    this.dd(_t.yn());
  }
  dr() {
    this.dd(_t.Cn());
  }
  Ua() {
    this.dd(new _t(1));
  }
  ya(t) {
    const r = this.fd(t);
    this.dd(r);
  }
  pd() {
    return this.td;
  }
  vd(t) {
    var _a3, _b2, _c2, _d2;
    if (((_a3 = this.td) == null ? void 0 : _a3.hu) === (t == null ? void 0 : t.hu) && ((_c2 = (_b2 = this.td) == null ? void 0 : _b2.au) == null ? void 0 : _c2.te) === ((_d2 = t == null ? void 0 : t.au) == null ? void 0 : _d2.te)) return;
    const r = this.td;
    this.td = t, r !== null && this.ya(r.hu), t !== null && t.hu !== (r == null ? void 0 : r.hu) && this.ya(t.hu);
  }
  N() {
    return this.Ps;
  }
  cr(t) {
    Qt(this.Ps, t), this.Xc.forEach(((r) => r.I_(t))), t.timeScale !== void 0 && this.Jh.cr(t.timeScale), t.localization !== void 0 && this.Jh.Qu(t.localization), (t.leftPriceScale || t.rightPriceScale) && this.sd.p(), this.od = this._d(0), this.ud = this._d(1), this.Ca();
  }
  md(t, r, n = 0) {
    const i = this.Xc[n];
    if (i === void 0) return;
    if (t === "left") return Qt(this.Ps, { leftPriceScale: r }), i.I_({ leftPriceScale: r }), this.sd.p(), void this.Ca();
    if (t === "right") return Qt(this.Ps, { rightPriceScale: r }), i.I_({ rightPriceScale: r }), this.sd.p(), void this.Ca();
    const s = this.wd(t, n);
    s !== null && (s.Ft.cr(r), this.sd.p());
  }
  wd(t, r) {
    const n = this.Xc[r];
    if (n === void 0) return null;
    const i = n.V_(t);
    return i !== null ? { Gs: n, Ft: i } : null;
  }
  Et() {
    return this.Jh;
  }
  Xs() {
    return this.Xc;
  }
  gd() {
    return this.Ct;
  }
  Md() {
    return this.nd;
  }
  bd(t, r) {
    t.No(r), this.Sc();
  }
  L_(t) {
    this.S_ = t, this.Jh.L_(this.S_), this.Xc.forEach(((r) => r.L_(t))), this.Sc();
  }
  Sd(t) {
    this.Xc.length !== 1 && (Mt(t >= 0 && t < this.Xc.length, "Invalid pane index"), this.Xc.splice(t, 1), this.Ca());
  }
  xd(t, r) {
    if (this.Xc.length < 2) return;
    Mt(t >= 0 && t < this.Xc.length, "Invalid pane index");
    const n = this.Xc[t], i = this.Xc.reduce(((h, f) => h + f.E_()), 0), s = this.Xc.reduce(((h, f) => h + f.$t()), 0), a = s - 30 * (this.Xc.length - 1);
    r = Math.min(a, Math.max(30, r));
    const o = i / s, l = n.$t();
    n.A_(r * o);
    let u = r - l, c = this.Xc.length - 1;
    for (const h of this.Xc) if (h !== n) {
      const f = Math.min(a, Math.max(30, h.$t() - u / c));
      u -= h.$t() - f, c -= 1;
      const d = f * o;
      h.A_(d);
    }
    this.Ca();
  }
  Cd(t, r) {
    Mt(t >= 0 && t < this.Xc.length && r >= 0 && r < this.Xc.length, "Invalid pane index");
    const n = this.Xc[t], i = this.Xc[r];
    this.Xc[t] = i, this.Xc[r] = n, this.Ca();
  }
  yd(t, r) {
    if (Mt(t >= 0 && t < this.Xc.length && r >= 0 && r < this.Xc.length, "Invalid pane index"), t === r) return;
    const [n] = this.Xc.splice(t, 1);
    this.Xc.splice(r, 0, n), this.Ca();
  }
  j_(t, r, n) {
    t.j_(r, n);
  }
  Y_(t, r, n) {
    t.Y_(r, n), this.ka(), this.dd(this.kd(t, 2));
  }
  K_(t, r) {
    t.K_(r), this.dd(this.kd(t, 2));
  }
  Z_(t, r, n) {
    r.Vo() || t.Z_(r, n);
  }
  G_(t, r, n) {
    r.Vo() || (t.G_(r, n), this.ka(), this.dd(this.kd(t, 2)));
  }
  X_(t, r) {
    r.Vo() || (t.X_(r), this.dd(this.kd(t, 2)));
  }
  Q_(t, r) {
    t.Q_(r), this.dd(this.kd(t, 2));
  }
  Pd(t) {
    this.Jh.h_(t);
  }
  Td(t, r) {
    const n = this.Et();
    if (n.Gi() || r === 0) return;
    const i = n.ss();
    t = Math.max(1, Math.min(t, i)), n.Rc(t, r), this.Sc();
  }
  Rd(t) {
    this.Dd(0), this.Id(t), this.Vd();
  }
  Bd(t) {
    this.Jh.a_(t), this.Sc();
  }
  Ed() {
    this.Jh.l_(), this.dr();
  }
  Dd(t) {
    this.Jh.o_(t);
  }
  Id(t) {
    this.Jh.__(t), this.Sc();
  }
  Vd() {
    this.Jh.u_(), this.dr();
  }
  tn() {
    return this.Jc;
  }
  Us() {
    return this.Qc === null && (this.Qc = this.Jc.filter(((t) => t.It()))), this.Qc;
  }
  xa() {
    this.Qc = null;
  }
  Ad(t, r, n, i, s) {
    this.Ct.Bs(t, r);
    let a = NaN, o = this.Jh.wc(t, true);
    const l = this.Jh.Ie();
    l !== null && (o = Math.min(Math.max(l.Aa(), o), l.bi())), o = this.Ct.Hs(o);
    const u = i.Rs(), c = u.Lt();
    if (c !== null && (a = u.Ds(r, c)), a = this.ad.bl(a, o, i), this.Ct.zs(o, a, i), this.Ua(), !s) {
      const h = p1(i, t, r);
      this.vd(h && { hu: h.hu, au: h.au, ou: h.ou || null }), this.nd.p(this.Ct.Bt(), { x: t, y: r }, n);
    }
  }
  Ld(t, r, n) {
    const i = n.Rs(), s = i.Lt(), a = i.Nt(t, C(s)), o = this.Jh.ec(r, true), l = this.Jh.qt(C(o));
    this.Ad(l, a, null, n, true);
  }
  zd(t) {
    this.gd().Ns(), this.Ua(), t || this.nd.p(null, null, null);
  }
  ka() {
    const t = this.Ct.Gs();
    if (t !== null) {
      const r = this.Ct.As(), n = this.Ct.Ls();
      this.Ad(r, n, null, t);
    }
    this.Ct.Ws();
  }
  Od(t, r, n) {
    const i = this.Jh.Is(0);
    r !== void 0 && n !== void 0 && this.Jh.kt(r, n);
    const s = this.Jh.Is(0), a = this.Jh.vc(), o = this.Jh.Ie();
    if (o !== null && i !== null && s !== null) {
      const l = o.Ee(a), u = this.cu.key(i) > this.cu.key(s), c = t !== null && t > a && !u, h = this.Jh.N().allowShiftVisibleRangeOnWhitespaceReplacement, f = l && (n !== void 0 || h) && this.Jh.N().shiftVisibleRangeOnNewBar;
      if (c && !f) {
        const d = t - a;
        this.Jh.Mn(this.Jh.Cc() - d);
      }
    }
    this.Jh.Tc(t);
  }
  Ra(t) {
    t !== null && t.iu();
  }
  Kn(t) {
    if ((function(n) {
      return n instanceof ag;
    })(t)) return t;
    const r = this.Xc.find(((n) => n.Dt().includes(t)));
    return r === void 0 ? null : r;
  }
  Sc() {
    this.Xc.forEach(((t) => t.iu())), this.ka();
  }
  m() {
    this.Xc.forEach(((t) => t.m())), this.Xc.length = 0, this.Ps.localization.priceFormatter = void 0, this.Ps.localization.percentageFormatter = void 0, this.Ps.localization.timeFormatter = void 0;
  }
  Nd() {
    return this.hd;
  }
  Jn() {
    return this.hd.N();
  }
  B_() {
    return this.sd;
  }
  Fd(t, r) {
    const n = this.ld(r);
    this.Wd(t, n), this.Jc.push(t), this.xa(), this.Jc.length === 1 ? this.Ca() : this.dr();
  }
  Hd(t) {
    const r = this.Kn(t), n = this.Jc.indexOf(t);
    Mt(n !== -1, "Series not found");
    const i = C(r);
    this.Jc.splice(n, 1), i.n_(t), t.m && t.m(), this.xa(), this.Jh.Ju(), this.Ud(i);
  }
  Sa(t, r) {
    const n = C(this.Kn(t));
    n.n_(t, true), n.i_(t, r, true);
  }
  Fc() {
    const t = _t.Cn();
    t.cn(), this.dd(t);
  }
  $d(t) {
    const r = _t.Cn();
    r.pn(t), this.dd(r);
  }
  wn() {
    const t = _t.Cn();
    t.wn(), this.dd(t);
  }
  gn(t) {
    const r = _t.Cn();
    r.gn(t), this.dd(r);
  }
  Mn(t) {
    const r = _t.Cn();
    r.Mn(t), this.dd(r);
  }
  vn(t) {
    const r = _t.Cn();
    r.vn(t), this.dd(r);
  }
  dn() {
    const t = _t.Cn();
    t.dn(), this.dd(t);
  }
  qd() {
    return this.Ps.rightPriceScale.visible ? "right" : "left";
  }
  jd(t, r) {
    if (Mt(r >= 0, "Index should be greater or equal to 0"), r === this.Yd(t)) return;
    const n = C(this.Kn(t));
    n.n_(t);
    const i = this.ld(r);
    this.Wd(t, i), n.Sl().length === 0 && this.Ud(n), this.Ca();
  }
  Kd() {
    return this.ud;
  }
  $() {
    return this.od;
  }
  Ut(t) {
    const r = this.ud, n = this.od;
    if (r === n) return r;
    if (t = Math.max(0, Math.min(100, Math.round(100 * t))), this.ed === null || this.ed.eh !== n || this.ed.rh !== r) this.ed = { eh: n, rh: r, Zd: /* @__PURE__ */ new Map() };
    else {
      const s = this.ed.Zd.get(t);
      if (s !== void 0) return s;
    }
    const i = this.ko.tt(n, r, t / 100);
    return this.ed.Zd.set(t, i), i;
  }
  Gd(t) {
    return this.Xc.indexOf(t);
  }
  Xi() {
    return this.ko;
  }
  Xd() {
    return this.Jd();
  }
  Jd(t) {
    const r = new ag(this.Jh, this);
    this.Xc.push(r);
    const n = t ?? this.Xc.length - 1, i = _t.yn();
    return i.hn(n, { an: 0, ln: true }), this.dd(i), r;
  }
  ld(t) {
    return Mt(t >= 0, "Index should be greater or equal to 0"), (t = Math.min(this.Xc.length, t)) < this.Xc.length ? this.Xc[t] : this.Jd(t);
  }
  Yd(t) {
    return this.Xc.findIndex(((r) => r.F_().includes(t)));
  }
  kd(t, r) {
    const n = new _t(r);
    if (t !== null) {
      const i = this.Xc.indexOf(t);
      n.hn(i, { an: r });
    }
    return n;
  }
  fd(t, r) {
    return r === void 0 && (r = 2), this.kd(this.Kn(t), r);
  }
  dd(t) {
    this.rd && this.rd(t), this.Xc.forEach(((r) => r.eu().pr().kt()));
  }
  Wd(t, r) {
    const n = t.N().priceScaleId, i = n !== void 0 ? n : this.qd();
    r.i_(t, i), go(i) || t.cr(t.N());
  }
  _d(t) {
    const r = this.Ps.layout;
    return r.background.type === "gradient" ? t === 0 ? r.background.topColor : r.background.bottomColor : r.background.color;
  }
  Ud(t) {
    !t.N_() && t.Sl().length === 0 && this.Xc.length > 1 && this.Xc.splice(this.Gd(t), 1);
  }
}
function m1(e3) {
  if (e3 >= 1) return 0;
  let t = 0;
  for (; t < 8; t++) {
    const r = Math.round(e3);
    if (Math.abs(r - e3) < 1e-8) return t;
    e3 *= 10;
  }
  return t;
}
function uc(e3) {
  return !Wr(e3) && !qi(e3);
}
function g1(e3) {
  return Wr(e3);
}
(function(e3) {
  e3[e3.Disabled = 0] = "Disabled", e3[e3.Continuous = 1] = "Continuous", e3[e3.OnDataUpdate = 2] = "OnDataUpdate";
})(ug || (ug = {})), (function(e3) {
  e3[e3.LastBar = 0] = "LastBar", e3[e3.LastVisible = 1] = "LastVisible";
})(cg || (cg = {})), (function(e3) {
  e3.Solid = "solid", e3.VerticalGradient = "gradient";
})(hg || (hg = {})), (function(e3) {
  e3[e3.Year = 0] = "Year", e3[e3.Month = 1] = "Month", e3[e3.DayOfMonth = 2] = "DayOfMonth", e3[e3.Time = 3] = "Time", e3[e3.TimeWithSeconds = 4] = "TimeWithSeconds";
})(fg || (fg = {}));
const dg = (e3) => e3.getUTCFullYear();
function Jz(e3, t, r) {
  return t.replace(/yyyy/g, ((n) => Fe(dg(n), 4))(e3)).replace(/yy/g, ((n) => Fe(dg(n) % 100, 2))(e3)).replace(/MMMM/g, ((n, i) => new Date(n.getUTCFullYear(), n.getUTCMonth(), 1).toLocaleString(i, { month: "long" }))(e3, r)).replace(/MMM/g, ((n, i) => new Date(n.getUTCFullYear(), n.getUTCMonth(), 1).toLocaleString(i, { month: "short" }))(e3, r)).replace(/MM/g, ((n) => Fe(((i) => i.getUTCMonth() + 1)(n), 2))(e3)).replace(/dd/g, ((n) => Fe(((i) => i.getUTCDate())(n), 2))(e3));
}
class y1 {
  constructor(t = "yyyy-MM-dd", r = "default") {
    this.Qd = t, this.tf = r;
  }
  du(t) {
    return Jz(t, this.Qd, this.tf);
  }
}
class Zz {
  constructor(t) {
    this.if = t || "%h:%m:%s";
  }
  du(t) {
    return this.if.replace("%h", Fe(t.getUTCHours(), 2)).replace("%m", Fe(t.getUTCMinutes(), 2)).replace("%s", Fe(t.getUTCSeconds(), 2));
  }
}
const Qz = { sf: "yyyy-MM-dd", nf: "%h:%m:%s", ef: " ", rf: "default" };
class tB {
  constructor(t = {}) {
    const r = { ...Qz, ...t };
    this.hf = new y1(r.sf, r.rf), this.af = new Zz(r.nf), this.lf = r.ef;
  }
  du(t) {
    return `${this.hf.du(t)}${this.lf}${this.af.du(t)}`;
  }
}
function fs(e3) {
  return 60 * e3 * 60 * 1e3;
}
function su(e3) {
  return 60 * e3 * 1e3;
}
const ds = [{ _f: (vg = 1, 1e3 * vg), uf: 10 }, { _f: su(1), uf: 20 }, { _f: su(5), uf: 21 }, { _f: su(30), uf: 22 }, { _f: fs(1), uf: 30 }, { _f: fs(3), uf: 31 }, { _f: fs(6), uf: 32 }, { _f: fs(12), uf: 33 }];
var vg;
function pg(e3, t) {
  if (e3.getUTCFullYear() !== t.getUTCFullYear()) return 70;
  if (e3.getUTCMonth() !== t.getUTCMonth()) return 60;
  if (e3.getUTCDate() !== t.getUTCDate()) return 50;
  for (let r = ds.length - 1; r >= 0; --r) if (Math.floor(t.getTime() / ds[r]._f) !== Math.floor(e3.getTime() / ds[r]._f)) return ds[r].uf;
  return 0;
}
function au(e3) {
  let t = e3;
  if (qi(e3) && (t = Hh(e3)), !uc(t)) throw new Error("time must be of type BusinessDay");
  const r = new Date(Date.UTC(t.year, t.month - 1, t.day, 0, 0, 0, 0));
  return { cf: Math.round(r.getTime() / 1e3), df: t };
}
function mg(e3) {
  if (!g1(e3)) throw new Error("time must be of type isUTCTimestamp");
  return { cf: e3 };
}
function Hh(e3) {
  const t = new Date(e3);
  if (isNaN(t.getTime())) throw new Error(`Invalid date string=${e3}, expected format=yyyy-mm-dd`);
  return { day: t.getUTCDate(), month: t.getUTCMonth() + 1, year: t.getUTCFullYear() };
}
function gg(e3) {
  qi(e3.time) && (e3.time = Hh(e3.time));
}
class yg {
  options() {
    return this.Ps;
  }
  setOptions(t) {
    this.Ps = t, this.updateFormatter(t.localization);
  }
  preprocessData(t) {
    Array.isArray(t) ? (function(r) {
      r.forEach(gg);
    })(t) : gg(t);
  }
  createConverterToInternalObj(t) {
    return C((function(r) {
      return r.length === 0 ? null : uc(r[0].time) || qi(r[0].time) ? au : mg;
    })(t));
  }
  key(t) {
    return typeof t == "object" && "cf" in t ? t.cf : this.key(this.convertHorzItemToInternal(t));
  }
  cacheKey(t) {
    const r = t;
    return r.df === void 0 ? new Date(1e3 * r.cf).getTime() : new Date(Date.UTC(r.df.year, r.df.month - 1, r.df.day)).getTime();
  }
  convertHorzItemToInternal(t) {
    return g1(r = t) ? mg(r) : uc(r) ? au(r) : au(Hh(r));
    var r;
  }
  updateFormatter(t) {
    if (!this.Ps) return;
    const r = t.dateFormat;
    this.Ps.timeScale.timeVisible ? this.ff = new tB({ sf: r, nf: this.Ps.timeScale.secondsVisible ? "%h:%m:%s" : "%h:%m", ef: "   ", rf: t.locale }) : this.ff = new y1(r, t.locale);
  }
  formatHorzItem(t) {
    const r = t;
    return this.ff.du(new Date(1e3 * r.cf));
  }
  formatTickmark(t, r) {
    const n = (function(s, a, o) {
      switch (s) {
        case 0:
        case 10:
          return a ? o ? 4 : 3 : 2;
        case 20:
        case 21:
        case 22:
        case 30:
        case 31:
        case 32:
        case 33:
          return a ? 3 : 2;
        case 50:
          return 2;
        case 60:
          return 1;
        case 70:
          return 0;
      }
    })(t.weight, this.Ps.timeScale.timeVisible, this.Ps.timeScale.secondsVisible), i = this.Ps.timeScale;
    if (i.tickMarkFormatter !== void 0) {
      const s = i.tickMarkFormatter(t.originalTime, n, r.locale);
      if (s !== null) return s;
    }
    return (function(s, a, o) {
      const l = {};
      switch (a) {
        case 0:
          l.year = "numeric";
          break;
        case 1:
          l.month = "short";
          break;
        case 2:
          l.day = "numeric";
          break;
        case 3:
          l.hour12 = false, l.hour = "2-digit", l.minute = "2-digit";
          break;
        case 4:
          l.hour12 = false, l.hour = "2-digit", l.minute = "2-digit", l.second = "2-digit";
      }
      const u = s.df === void 0 ? new Date(1e3 * s.cf) : new Date(Date.UTC(s.df.year, s.df.month - 1, s.df.day));
      return new Date(u.getUTCFullYear(), u.getUTCMonth(), u.getUTCDate(), u.getUTCHours(), u.getUTCMinutes(), u.getUTCSeconds(), u.getUTCMilliseconds()).toLocaleString(o, l);
    })(t.time, n, r.locale);
  }
  maxTickMarkWeight(t) {
    let r = t.reduce(Hz, t[0]).weight;
    return r > 30 && r < 50 && (r = 30), r;
  }
  fillWeightsForPoints(t, r) {
    (function(n, i = 0) {
      if (n.length === 0) return;
      let s = i === 0 ? null : n[i - 1].time.cf, a = s !== null ? new Date(1e3 * s) : null, o = 0;
      for (let l = i; l < n.length; ++l) {
        const u = n[l], c = new Date(1e3 * u.time.cf);
        a !== null && (u.timeWeight = pg(c, a)), o += u.time.cf - (s || u.time.cf), s = u.time.cf, a = c;
      }
      if (i === 0 && n.length > 1) {
        const l = Math.ceil(o / (n.length - 1)), u = new Date(1e3 * (n[0].time.cf - l));
        n[0].timeWeight = pg(new Date(1e3 * n[0].time.cf), u);
      }
    })(t, r);
  }
  static pf(t) {
    return Qt({ localization: { dateFormat: "dd MMM 'yy" } }, t ?? {});
  }
}
const En = typeof window < "u";
function bg() {
  return !!En && window.navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
}
function ou() {
  return !!En && /iPhone|iPad|iPod/.test(window.navigator.platform);
}
function cc(e3) {
  return e3 + e3 % 2;
}
function eB(e3) {
  En && window.chrome !== void 0 && e3.addEventListener("mousedown", ((t) => {
    if (t.button === 1) return t.preventDefault(), false;
  }));
}
class wo {
  constructor(t, r, n) {
    this.vf = 0, this.mf = null, this.wf = { _t: Number.NEGATIVE_INFINITY, ut: Number.POSITIVE_INFINITY }, this.gf = 0, this.Mf = null, this.bf = { _t: Number.NEGATIVE_INFINITY, ut: Number.POSITIVE_INFINITY }, this.Sf = null, this.xf = false, this.Cf = null, this.yf = null, this.kf = false, this.Pf = false, this.Tf = false, this.Rf = null, this.Df = null, this.If = null, this.Vf = null, this.Bf = null, this.Ef = null, this.Af = null, this.Lf = 0, this.zf = false, this.Of = false, this.Nf = false, this.Ff = 0, this.Wf = null, this.Hf = !ou(), this.Uf = (i) => {
      this.$f(i);
    }, this.qf = (i) => {
      if (this.jf(i)) {
        const s = this.Yf(i);
        if (++this.gf, this.Mf && this.gf > 1) {
          const { Kf: a } = this.Zf(Se(i), this.bf);
          a < 30 && !this.Tf && this.Gf(s, this.Jf.Xf), this.Qf();
        }
      } else {
        const s = this.Yf(i);
        if (++this.vf, this.mf && this.vf > 1) {
          const { Kf: a } = this.Zf(Se(i), this.wf);
          a < 5 && !this.Pf && this.tp(s, this.Jf.ip), this.sp();
        }
      }
    }, this.np = t, this.Jf = r, this.Ps = n, this.ep();
  }
  m() {
    this.Rf !== null && (this.Rf(), this.Rf = null), this.Df !== null && (this.Df(), this.Df = null), this.Vf !== null && (this.Vf(), this.Vf = null), this.Bf !== null && (this.Bf(), this.Bf = null), this.Ef !== null && (this.Ef(), this.Ef = null), this.If !== null && (this.If(), this.If = null), this.rp(), this.sp();
  }
  hp(t) {
    this.Vf && this.Vf();
    const r = this.ap.bind(this);
    if (this.Vf = () => {
      this.np.removeEventListener("mousemove", r);
    }, this.np.addEventListener("mousemove", r), this.jf(t)) return;
    const n = this.Yf(t);
    this.tp(n, this.Jf.lp), this.Hf = true;
  }
  sp() {
    this.mf !== null && clearTimeout(this.mf), this.vf = 0, this.mf = null, this.wf = { _t: Number.NEGATIVE_INFINITY, ut: Number.POSITIVE_INFINITY };
  }
  Qf() {
    this.Mf !== null && clearTimeout(this.Mf), this.gf = 0, this.Mf = null, this.bf = { _t: Number.NEGATIVE_INFINITY, ut: Number.POSITIVE_INFINITY };
  }
  ap(t) {
    if (this.Nf || this.yf !== null || this.jf(t)) return;
    const r = this.Yf(t);
    this.tp(r, this.Jf.op), this.Hf = true;
  }
  _p(t) {
    const r = lu(t.changedTouches, C(this.Wf));
    if (r === null || (this.Ff = vs(t), this.Af !== null) || this.Of) return;
    this.zf = true;
    const n = this.Zf(Se(r), C(this.yf)), { up: i, cp: s, Kf: a } = n;
    if (this.kf || !(a < 5)) {
      if (!this.kf) {
        const o = 0.5 * i, l = s >= o && !this.Ps.dp(), u = o > s && !this.Ps.fp();
        l || u || (this.Of = true), this.kf = true, this.Tf = true, this.rp(), this.Qf();
      }
      if (!this.Of) {
        const o = this.Yf(t, r);
        this.Gf(o, this.Jf.pp), nn(t);
      }
    }
  }
  vp(t) {
    if (t.button !== 0) return;
    const r = this.Zf(Se(t), C(this.Cf)), { Kf: n } = r;
    if (n >= 5 && (this.Pf = true, this.sp()), this.Pf) {
      const i = this.Yf(t);
      this.tp(i, this.Jf.mp);
    }
  }
  Zf(t, r) {
    const n = Math.abs(r._t - t._t), i = Math.abs(r.ut - t.ut);
    return { up: n, cp: i, Kf: n + i };
  }
  wp(t) {
    let r = lu(t.changedTouches, C(this.Wf));
    if (r === null && t.touches.length === 0 && (r = t.changedTouches[0]), r === null) return;
    this.Wf = null, this.Ff = vs(t), this.rp(), this.yf = null, this.Ef && (this.Ef(), this.Ef = null);
    const n = this.Yf(t, r);
    if (this.Gf(n, this.Jf.gp), ++this.gf, this.Mf && this.gf > 1) {
      const { Kf: i } = this.Zf(Se(r), this.bf);
      i < 30 && !this.Tf && this.Gf(n, this.Jf.Xf), this.Qf();
    } else this.Tf || (this.Gf(n, this.Jf.Mp), this.Jf.Mp && nn(t));
    this.gf === 0 && nn(t), t.touches.length === 0 && this.xf && (this.xf = false, nn(t));
  }
  $f(t) {
    if (t.button !== 0) return;
    const r = this.Yf(t);
    if (this.Cf = null, this.Nf = false, this.Bf && (this.Bf(), this.Bf = null), bg() && this.np.ownerDocument.documentElement.removeEventListener("mouseleave", this.Uf), !this.jf(t)) if (this.tp(r, this.Jf.bp), ++this.vf, this.mf && this.vf > 1) {
      const { Kf: n } = this.Zf(Se(t), this.wf);
      n < 5 && !this.Pf && this.tp(r, this.Jf.ip), this.sp();
    } else this.Pf || this.tp(r, this.Jf.Sp);
  }
  rp() {
    this.Sf !== null && (clearTimeout(this.Sf), this.Sf = null);
  }
  xp(t) {
    if (this.Wf !== null) return;
    const r = t.changedTouches[0];
    this.Wf = r.identifier, this.Ff = vs(t);
    const n = this.np.ownerDocument.documentElement;
    this.Tf = false, this.kf = false, this.Of = false, this.yf = Se(r), this.Ef && (this.Ef(), this.Ef = null);
    {
      const s = this._p.bind(this), a = this.wp.bind(this);
      this.Ef = () => {
        n.removeEventListener("touchmove", s), n.removeEventListener("touchend", a);
      }, n.addEventListener("touchmove", s, { passive: false }), n.addEventListener("touchend", a, { passive: false }), this.rp(), this.Sf = setTimeout(this.Cp.bind(this, t), 240);
    }
    const i = this.Yf(t, r);
    this.Gf(i, this.Jf.yp), this.Mf || (this.gf = 0, this.Mf = setTimeout(this.Qf.bind(this), 500), this.bf = Se(r));
  }
  kp(t) {
    if (t.button !== 0) return;
    const r = this.np.ownerDocument.documentElement;
    bg() && r.addEventListener("mouseleave", this.Uf), this.Pf = false, this.Cf = Se(t), this.Bf && (this.Bf(), this.Bf = null);
    {
      const i = this.vp.bind(this), s = this.$f.bind(this);
      this.Bf = () => {
        r.removeEventListener("mousemove", i), r.removeEventListener("mouseup", s);
      }, r.addEventListener("mousemove", i), r.addEventListener("mouseup", s);
    }
    if (this.Nf = true, this.jf(t)) return;
    const n = this.Yf(t);
    this.tp(n, this.Jf.Pp), this.mf || (this.vf = 0, this.mf = setTimeout(this.sp.bind(this), 500), this.wf = Se(t));
  }
  ep() {
    this.np.addEventListener("mouseenter", this.hp.bind(this)), this.np.addEventListener("touchcancel", this.rp.bind(this));
    {
      const t = this.np.ownerDocument, r = (n) => {
        this.Jf.Tp && (n.composed && this.np.contains(n.composedPath()[0]) || n.target && this.np.contains(n.target) || this.Jf.Tp());
      };
      this.Df = () => {
        t.removeEventListener("touchstart", r);
      }, this.Rf = () => {
        t.removeEventListener("mousedown", r);
      }, t.addEventListener("mousedown", r), t.addEventListener("touchstart", r, { passive: true });
    }
    ou() && (this.If = () => {
      this.np.removeEventListener("dblclick", this.qf);
    }, this.np.addEventListener("dblclick", this.qf)), this.np.addEventListener("mouseleave", this.Rp.bind(this)), this.np.addEventListener("touchstart", this.xp.bind(this), { passive: true }), eB(this.np), this.np.addEventListener("mousedown", this.kp.bind(this)), this.Dp(), this.np.addEventListener("touchmove", (() => {
    }), { passive: false });
  }
  Dp() {
    this.Jf.Ip === void 0 && this.Jf.Vp === void 0 && this.Jf.Bp === void 0 || (this.np.addEventListener("touchstart", ((t) => this.Ep(t.touches)), { passive: true }), this.np.addEventListener("touchmove", ((t) => {
      if (t.touches.length === 2 && this.Af !== null && this.Jf.Vp !== void 0) {
        const r = wg(t.touches[0], t.touches[1]) / this.Lf;
        this.Jf.Vp(this.Af, r), nn(t);
      }
    }), { passive: false }), this.np.addEventListener("touchend", ((t) => {
      this.Ep(t.touches);
    })));
  }
  Ep(t) {
    t.length === 1 && (this.zf = false), t.length !== 2 || this.zf || this.xf ? this.Ap() : this.Lp(t);
  }
  Lp(t) {
    const r = this.np.getBoundingClientRect() || { left: 0, top: 0 };
    this.Af = { _t: (t[0].clientX - r.left + (t[1].clientX - r.left)) / 2, ut: (t[0].clientY - r.top + (t[1].clientY - r.top)) / 2 }, this.Lf = wg(t[0], t[1]), this.Jf.Ip !== void 0 && this.Jf.Ip(), this.rp();
  }
  Ap() {
    this.Af !== null && (this.Af = null, this.Jf.Bp !== void 0 && this.Jf.Bp());
  }
  Rp(t) {
    if (this.Vf && this.Vf(), this.jf(t) || !this.Hf) return;
    const r = this.Yf(t);
    this.tp(r, this.Jf.zp), this.Hf = !ou();
  }
  Cp(t) {
    const r = lu(t.touches, C(this.Wf));
    if (r === null) return;
    const n = this.Yf(t, r);
    this.Gf(n, this.Jf.Op), this.Tf = true, this.xf = true;
  }
  jf(t) {
    return t.sourceCapabilities && t.sourceCapabilities.firesTouchEvents !== void 0 ? t.sourceCapabilities.firesTouchEvents : vs(t) < this.Ff + 500;
  }
  Gf(t, r) {
    r && r.call(this.Jf, t);
  }
  tp(t, r) {
    r && r.call(this.Jf, t);
  }
  Yf(t, r) {
    const n = r || t, i = this.np.getBoundingClientRect() || { left: 0, top: 0 };
    return { clientX: n.clientX, clientY: n.clientY, pageX: n.pageX, pageY: n.pageY, screenX: n.screenX, screenY: n.screenY, localX: n.clientX - i.left, localY: n.clientY - i.top, ctrlKey: t.ctrlKey, altKey: t.altKey, shiftKey: t.shiftKey, metaKey: t.metaKey, Np: !t.type.startsWith("mouse") && t.type !== "contextmenu" && t.type !== "click", Fp: t.type, Wp: n.target, _u: t.view, Hp: () => {
      t.type !== "touchstart" && nn(t);
    } };
  }
}
function wg(e3, t) {
  const r = e3.clientX - t.clientX, n = e3.clientY - t.clientY;
  return Math.sqrt(r * r + n * n);
}
function nn(e3) {
  e3.cancelable && e3.preventDefault();
}
function Se(e3) {
  return { _t: e3.pageX, ut: e3.pageY };
}
function vs(e3) {
  return e3.timeStamp || performance.now();
}
function lu(e3, t) {
  for (let r = 0; r < e3.length; ++r) if (e3[r].identifier === t) return e3[r];
  return null;
}
class rB {
  constructor(t, r, n) {
    this.Up = null, this.$p = null, this.qp = true, this.jp = null, this.Yp = t, this.Kp = t.Zp()[r], this.Gp = t.Zp()[n], this.Xp = document.createElement("tr"), this.Xp.style.height = "1px", this.Jp = document.createElement("td"), this.Jp.style.position = "relative", this.Jp.style.padding = "0", this.Jp.style.margin = "0", this.Jp.setAttribute("colspan", "3"), this.Qp(), this.Xp.appendChild(this.Jp), this.qp = this.Yp.N().layout.panes.enableResize, this.qp ? this.tv() : (this.Up = null, this.$p = null);
  }
  m() {
    this.$p !== null && this.$p.m();
  }
  iv() {
    return this.Xp;
  }
  sv() {
    return J({ width: this.Kp.sv().width, height: 1 });
  }
  nv() {
    return J({ width: this.Kp.nv().width, height: 1 * window.devicePixelRatio });
  }
  ev(t, r, n) {
    const i = this.nv();
    t.fillStyle = this.Yp.N().layout.panes.separatorColor, t.fillRect(r, n, i.width, i.height);
  }
  kt() {
    this.Qp(), this.Yp.N().layout.panes.enableResize !== this.qp && (this.qp = this.Yp.N().layout.panes.enableResize, this.qp ? this.tv() : (this.Up !== null && (this.Jp.removeChild(this.Up.rv), this.Jp.removeChild(this.Up.hv), this.Up = null), this.$p !== null && (this.$p.m(), this.$p = null)));
  }
  tv() {
    const t = document.createElement("div"), r = t.style;
    r.position = "fixed", r.display = "none", r.zIndex = "49", r.top = "0", r.left = "0", r.width = "100%", r.height = "100%", r.cursor = "row-resize", this.Jp.appendChild(t);
    const n = document.createElement("div"), i = n.style;
    i.position = "absolute", i.zIndex = "50", i.top = "-4px", i.height = "9px", i.width = "100%", i.backgroundColor = "", i.cursor = "row-resize", this.Jp.appendChild(n);
    const s = { lp: this.av.bind(this), zp: this.lv.bind(this), Pp: this.ov.bind(this), yp: this.ov.bind(this), mp: this._v.bind(this), pp: this._v.bind(this), bp: this.uv.bind(this), gp: this.uv.bind(this) };
    this.$p = new wo(n, s, { dp: () => false, fp: () => true }), this.Up = { hv: n, rv: t };
  }
  Qp() {
    this.Jp.style.background = this.Yp.N().layout.panes.separatorColor;
  }
  av(t) {
    this.Up !== null && (this.Up.hv.style.backgroundColor = this.Yp.N().layout.panes.separatorHoverColor);
  }
  lv(t) {
    this.Up !== null && this.jp === null && (this.Up.hv.style.backgroundColor = "");
  }
  ov(t) {
    if (this.Up === null) return;
    const r = this.Kp.cv().E_() + this.Gp.cv().E_(), n = r / (this.Kp.sv().height + this.Gp.sv().height), i = 30 * n;
    r <= 2 * i || (this.jp = { dv: t.pageY, fv: this.Kp.cv().E_(), pv: r - i, vv: r, mv: n, wv: i }, this.Up.rv.style.display = "block");
  }
  _v(t) {
    const r = this.jp;
    if (r === null) return;
    const n = (t.pageY - r.dv) * r.mv, i = pn(r.fv + n, r.wv, r.pv);
    this.Kp.cv().A_(i), this.Gp.cv().A_(r.vv - i), this.Yp.Qt().Ca();
  }
  uv(t) {
    this.jp !== null && this.Up !== null && (this.jp = null, this.Up.rv.style.display = "none");
  }
}
function uu(e3, t) {
  return e3.gv - t.gv;
}
function cu(e3, t, r) {
  const n = (e3.gv - t.gv) / (e3.wt - t.wt);
  return Math.sign(n) * Math.min(Math.abs(n), r);
}
class nB {
  constructor(t, r, n, i) {
    this.Mv = null, this.bv = null, this.Sv = null, this.xv = null, this.Cv = null, this.yv = 0, this.kv = 0, this.Pv = t, this.Tv = r, this.Rv = n, this.kn = i;
  }
  Dv(t, r) {
    if (this.Mv !== null) {
      if (this.Mv.wt === r) return void (this.Mv.gv = t);
      if (Math.abs(this.Mv.gv - t) < this.kn) return;
    }
    this.xv = this.Sv, this.Sv = this.bv, this.bv = this.Mv, this.Mv = { wt: r, gv: t };
  }
  fe(t, r) {
    if (this.Mv === null || this.bv === null || r - this.Mv.wt > 50) return;
    let n = 0;
    const i = cu(this.Mv, this.bv, this.Tv), s = uu(this.Mv, this.bv), a = [i], o = [s];
    if (n += s, this.Sv !== null) {
      const u = cu(this.bv, this.Sv, this.Tv);
      if (Math.sign(u) === Math.sign(i)) {
        const c = uu(this.bv, this.Sv);
        if (a.push(u), o.push(c), n += c, this.xv !== null) {
          const h = cu(this.Sv, this.xv, this.Tv);
          if (Math.sign(h) === Math.sign(i)) {
            const f = uu(this.Sv, this.xv);
            a.push(h), o.push(f), n += f;
          }
        }
      }
    }
    let l = 0;
    for (let u = 0; u < a.length; ++u) l += o[u] / n * a[u];
    Math.abs(l) < this.Pv || (this.Cv = { gv: t, wt: r }, this.kv = l, this.yv = (function(u, c) {
      const h = Math.log(c);
      return Math.log(1 * h / -u) / h;
    })(Math.abs(l), this.Rv));
  }
  Ac(t) {
    const r = C(this.Cv), n = t - r.wt;
    return r.gv + this.kv * (Math.pow(this.Rv, n) - 1) / Math.log(this.Rv);
  }
  Ec(t) {
    return this.Cv === null || this.Iv(t) === this.yv;
  }
  Iv(t) {
    const r = t - C(this.Cv).wt;
    return Math.min(r, this.yv);
  }
}
class iB {
  constructor(t, r) {
    this.Vv = void 0, this.Bv = void 0, this.Ev = void 0, this.ws = false, this.Av = t, this.Lv = r, this.zv();
  }
  kt() {
    this.zv();
  }
  Ov() {
    this.Vv && this.Av.removeChild(this.Vv), this.Bv && this.Av.removeChild(this.Bv), this.Vv = void 0, this.Bv = void 0;
  }
  Nv() {
    return this.ws !== this.Fv() || this.Ev !== this.Wv();
  }
  Wv() {
    return this.Lv.Qt().Xi().J(this.Lv.N().layout.textColor) > 160 ? "dark" : "light";
  }
  Fv() {
    return this.Lv.N().layout.attributionLogo;
  }
  Hv() {
    const t = new URL(location.href);
    return t.hostname ? "&utm_source=" + t.hostname + t.pathname : "";
  }
  zv() {
    this.Nv() && (this.Ov(), this.ws = this.Fv(), this.ws && (this.Ev = this.Wv(), this.Bv = document.createElement("style"), this.Bv.innerText = "a#tv-attr-logo{--fill:#131722;--stroke:#fff;position:absolute;left:10px;bottom:10px;height:19px;width:35px;margin:0;padding:0;border:0;z-index:3;}a#tv-attr-logo[data-dark]{--fill:#D1D4DC;--stroke:#131722;}", this.Vv = document.createElement("a"), this.Vv.href = `https://www.tradingview.com/?utm_medium=lwc-link&utm_campaign=lwc-chart${this.Hv()}`, this.Vv.title = "Charting by TradingView", this.Vv.id = "tv-attr-logo", this.Vv.target = "_blank", this.Vv.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="35" height="19" fill="none"><g fill-rule="evenodd" clip-path="url(#a)" clip-rule="evenodd"><path fill="var(--stroke)" d="M2 0H0v10h6v9h21.4l.5-1.3 6-15 1-2.7H23.7l-.5 1.3-.2.6a5 5 0 0 0-7-.9V0H2Zm20 17h4l5.2-13 .8-2h-7l-1 2.5-.2.5-1.5 3.8-.3.7V17Zm-.8-10a3 3 0 0 0 .7-2.7A3 3 0 1 0 16.8 7h4.4ZM14 7V2H2v6h6v9h4V7h2Z"/><path fill="var(--fill)" d="M14 2H2v6h6v9h6V2Zm12 15h-7l6-15h7l-6 15Zm-7-9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/></g><defs><clipPath id="a"><path fill="var(--stroke)" d="M0 0h35v19H0z"/></clipPath></defs></svg>', this.Vv.toggleAttribute("data-dark", this.Ev === "dark"), this.Av.appendChild(this.Bv), this.Av.appendChild(this.Vv)));
  }
}
function Kr(e3, t) {
  const r = C(e3.ownerDocument).createElement("canvas");
  e3.appendChild(r);
  const n = W$(r, { options: { allowResizeObserver: true }, transform: (i, s) => ({ width: Math.max(i.width, s.width), height: Math.max(i.height, s.height) }) });
  return n.resizeCanvasElement(t), n;
}
function Ur(e3) {
  var _a3;
  e3.width = 1, e3.height = 1, (_a3 = e3.getContext("2d")) == null ? void 0 : _a3.clearRect(0, 0, 1, 1);
}
function hc(e3, t, r, n) {
  e3.Uh && e3.Uh(t, r, n);
}
function xs(e3, t, r, n) {
  e3.nt(t, r, n);
}
function fc(e3, t, r, n) {
  const i = e3(r, n);
  for (const s of i) {
    const a = s.Tt(n);
    a !== null && t(a);
  }
}
function hu(e3, t) {
  return (r) => {
    var _a3, _b2;
    return (function(n) {
      return n.Ft !== void 0;
    })(r) ? (((_a3 = r.Ft()) == null ? void 0 : _a3.ol()) ?? "") !== t ? [] : ((_b2 = r.Ya) == null ? void 0 : _b2.call(r, e3)) ?? [] : [];
  };
}
function xg(e3, t, r, n) {
  if (!e3.length) return;
  let i = 0;
  const s = e3[0].$t(n, true);
  let a = t === 1 ? r / 2 - (e3[0].Hi() - s / 2) : e3[0].Hi() - s / 2 - r / 2;
  a = Math.max(0, a);
  for (let o = 1; o < e3.length; o++) {
    const l = e3[o], u = e3[o - 1], c = u.$t(n, false), h = l.Hi(), f = u.Hi();
    if (t === 1 ? h > f - c : h < f + c) {
      const d = f - c * t;
      l.Ui(d);
      const v = d - t * c / 2;
      if ((t === 1 ? v < 0 : v > r) && a > 0) {
        const p = t === 1 ? -1 - v : v - r, m = Math.min(p, a);
        for (let y = i; y < e3.length; y++) e3[y].Ui(e3[y].Hi() + t * m);
        a -= m;
      }
    } else i = o, a = t === 1 ? f - c - h : h - (f + c);
  }
}
class Pg {
  constructor(t, r, n, i) {
    this.Ki = null, this.Uv = null, this.$v = false, this.qv = new Mi(200), this.jv = null, this.Yv = 0, this.Kv = false, this.Zv = () => {
      this.Kv || this.yt.Gv().Qt().dr();
    }, this.Xv = () => {
      this.Kv || this.yt.Gv().Qt().dr();
    }, this.yt = t, this.Ps = r, this.Co = r.layout, this.hd = n, this.Jv = i === "left", this.Qv = hu("normal", i), this.tm = hu("top", i), this.im = hu("bottom", i), this.Jp = document.createElement("div"), this.Jp.style.height = "100%", this.Jp.style.overflow = "hidden", this.Jp.style.width = "25px", this.Jp.style.left = "0", this.Jp.style.position = "relative", this.sm = Kr(this.Jp, J({ width: 16, height: 16 })), this.sm.subscribeSuggestedBitmapSizeChanged(this.Zv);
    const s = this.sm.canvasElement;
    s.style.position = "absolute", s.style.zIndex = "1", s.style.left = "0", s.style.top = "0", this.nm = Kr(this.Jp, J({ width: 16, height: 16 })), this.nm.subscribeSuggestedBitmapSizeChanged(this.Xv);
    const a = this.nm.canvasElement;
    a.style.position = "absolute", a.style.zIndex = "2", a.style.left = "0", a.style.top = "0";
    const o = { Pp: this.ov.bind(this), yp: this.ov.bind(this), mp: this._v.bind(this), pp: this._v.bind(this), Tp: this.rm.bind(this), bp: this.uv.bind(this), gp: this.uv.bind(this), ip: this.hm.bind(this), Xf: this.hm.bind(this), lp: this.am.bind(this), zp: this.lv.bind(this) };
    this.$p = new wo(this.nm.canvasElement, o, { dp: () => !this.Ps.handleScroll.vertTouchDrag, fp: () => true });
  }
  m() {
    this.$p.m(), this.nm.unsubscribeSuggestedBitmapSizeChanged(this.Xv), Ur(this.nm.canvasElement), this.nm.dispose(), this.sm.unsubscribeSuggestedBitmapSizeChanged(this.Zv), Ur(this.sm.canvasElement), this.sm.dispose(), this.Ki !== null && this.Ki.r_().u(this), this.Ki = null;
  }
  iv() {
    return this.Jp;
  }
  k() {
    return this.Co.fontSize;
  }
  lm() {
    const t = this.hd.N();
    return this.jv !== t.P && (this.qv.On(), this.jv = t.P), t;
  }
  om() {
    if (this.Ki === null) return 0;
    let t = 0;
    const r = this.lm(), n = C(this.sm.canvasElement.getContext("2d", { colorSpace: this.yt.Gv().N().layout.colorSpace }));
    n.save();
    const i = this.Ki.Vl();
    n.font = this._m(), i.length > 0 && (t = Math.max(this.qv.Ii(n, i[0].Jl), this.qv.Ii(n, i[i.length - 1].Jl)));
    const s = this.um();
    for (let u = s.length; u--; ) {
      const c = this.qv.Ii(n, s[u].ri());
      c > t && (t = c);
    }
    const a = this.Ki.Lt();
    if (a !== null && this.Uv !== null && (o = this.Ps.crosshair).mode !== 2 && o.horzLine.visible && o.horzLine.labelVisible) {
      const u = this.Ki.Ds(1, a), c = this.Ki.Ds(this.Uv.height - 2, a);
      t = Math.max(t, this.qv.Ii(n, this.Ki.Ji(Math.floor(Math.min(u, c)) + 0.11111111111111, a)), this.qv.Ii(n, this.Ki.Ji(Math.ceil(Math.max(u, c)) - 0.11111111111111, a)));
    }
    var o;
    n.restore();
    const l = t || 34;
    return cc(Math.ceil(r.S + r.C + r.V + r.B + 5 + l));
  }
  dm(t) {
    this.Uv !== null && Ir(this.Uv, t) || (this.Uv = t, this.Kv = true, this.sm.resizeCanvasElement(t), this.nm.resizeCanvasElement(t), this.Kv = false, this.Jp.style.width = `${t.width}px`, this.Jp.style.height = `${t.height}px`);
  }
  fm() {
    return C(this.Uv).width;
  }
  cs(t) {
    this.Ki !== t && (this.Ki !== null && this.Ki.r_().u(this), this.Ki = t, t.r_().i(this.do.bind(this), this));
  }
  Ft() {
    return this.Ki;
  }
  On() {
    const t = this.yt.cv();
    this.yt.Gv().Qt().Q_(t, C(this.Ft()));
  }
  pm(t) {
    if (this.Uv === null) return;
    const r = { colorSpace: this.yt.Gv().N().layout.colorSpace };
    if (t !== 1) {
      this.vm(), this.sm.applySuggestedBitmapSize();
      const i = Fr(this.sm, r);
      i !== null && (i.useBitmapCoordinateSpace(((s) => {
        this.wm(s), this.gm(s);
      })), this.yt.Mm(i, this.im), this.bm(i), this.yt.Mm(i, this.Qv), this.Sm(i));
    }
    this.nm.applySuggestedBitmapSize();
    const n = Fr(this.nm, r);
    n !== null && (n.useBitmapCoordinateSpace((({ context: i, bitmapSize: s }) => {
      i.clearRect(0, 0, s.width, s.height);
    })), this.xm(n), this.yt.Mm(n, this.tm));
  }
  nv() {
    return this.sm.bitmapSize;
  }
  ev(t, r, n, i) {
    const s = this.nv();
    if (s.width > 0 && s.height > 0 && (t.drawImage(this.sm.canvasElement, r, n), i)) {
      const a = this.nm.canvasElement;
      t.drawImage(a, r, n);
    }
  }
  kt() {
    var _a3;
    (_a3 = this.Ki) == null ? void 0 : _a3.Vl();
  }
  ov(t) {
    if (this.Ki === null || this.Ki.Gi() || !this.Ps.handleScale.axisPressedMouseMove.price) return;
    const r = this.yt.Gv().Qt(), n = this.yt.cv();
    this.$v = true, r.j_(n, this.Ki, t.localY);
  }
  _v(t) {
    if (this.Ki === null || !this.Ps.handleScale.axisPressedMouseMove.price) return;
    const r = this.yt.Gv().Qt(), n = this.yt.cv(), i = this.Ki;
    r.Y_(n, i, t.localY);
  }
  rm() {
    if (this.Ki === null || !this.Ps.handleScale.axisPressedMouseMove.price) return;
    const t = this.yt.Gv().Qt(), r = this.yt.cv(), n = this.Ki;
    this.$v && (this.$v = false, t.K_(r, n));
  }
  uv(t) {
    if (this.Ki === null || !this.Ps.handleScale.axisPressedMouseMove.price) return;
    const r = this.yt.Gv().Qt(), n = this.yt.cv();
    this.$v = false, r.K_(n, this.Ki);
  }
  hm(t) {
    this.Ps.handleScale.axisDoubleClickReset.price && this.On();
  }
  am(t) {
    this.Ki !== null && (!this.yt.Gv().Qt().N().handleScale.axisPressedMouseMove.price || this.Ki.He() || this.Ki.Eo() || this.Cm(1));
  }
  lv(t) {
    this.Cm(0);
  }
  um() {
    const t = [], r = this.Ki === null ? void 0 : this.Ki;
    return ((n) => {
      for (let i = 0; i < n.length; ++i) {
        const s = n[i].Ks(this.yt.cv(), r);
        for (let a = 0; a < s.length; a++) t.push(s[a]);
      }
    })(this.yt.cv().Dt()), t;
  }
  wm({ context: t, bitmapSize: r }) {
    const { width: n, height: i } = r, s = this.yt.cv().Qt(), a = s.$(), o = s.Kd();
    a === o ? po(t, 0, 0, n, i, a) : i1(t, 0, 0, n, i, a, o);
  }
  gm({ context: t, bitmapSize: r, horizontalPixelRatio: n }) {
    if (this.Uv === null || this.Ki === null || !this.Ki.N().borderVisible) return;
    t.fillStyle = this.Ki.N().borderColor;
    const i = Math.max(1, Math.floor(this.lm().S * n));
    let s;
    s = this.Jv ? r.width - i : 0, t.fillRect(s, 0, i, r.height);
  }
  bm(t) {
    if (this.Uv === null || this.Ki === null) return;
    const r = this.Ki.Vl(), n = this.Ki.N(), i = this.lm(), s = this.Jv ? this.Uv.width - i.C : 0;
    n.borderVisible && n.ticksVisible && t.useBitmapCoordinateSpace((({ context: a, horizontalPixelRatio: o, verticalPixelRatio: l }) => {
      a.fillStyle = n.borderColor;
      const u = Math.max(1, Math.floor(l)), c = Math.floor(0.5 * l), h = Math.round(i.C * o);
      a.beginPath();
      for (const f of r) a.rect(Math.floor(s * o), Math.round(f.Pl * l) - c, h, u);
      a.fill();
    })), t.useMediaCoordinateSpace((({ context: a }) => {
      a.font = this._m(), a.fillStyle = n.textColor ?? this.Co.textColor, a.textAlign = this.Jv ? "right" : "left", a.textBaseline = "middle";
      const o = this.Jv ? Math.round(s - i.V) : Math.round(s + i.C + i.V), l = r.map(((u) => this.qv.Di(a, u.Jl)));
      for (let u = r.length; u--; ) {
        const c = r[u];
        a.fillText(c.Jl, o, c.Pl + l[u]);
      }
    }));
  }
  vm() {
    if (this.Uv === null || this.Ki === null) return;
    let t = this.Uv.height / 2;
    const r = [], n = this.Ki.Dt().slice(), i = this.yt.cv(), s = this.lm();
    this.Ki === i.Gn() && this.yt.cv().Dt().forEach(((l) => {
      i.Zn(l) && n.push(l);
    }));
    const a = this.Ki.Sl()[0], o = this.Ki;
    n.forEach(((l) => {
      const u = l.Ks(i, o);
      u.forEach(((c) => {
        c.$i() && c.Wi() === null && (c.Ui(null), r.push(c));
      })), a === l && u.length > 0 && (t = u[0].Ei());
    })), this.Ki.N().alignLabels && this.ym(r, s, t);
  }
  ym(t, r, n) {
    if (this.Uv === null) return;
    const i = t.filter(((a) => a.Ei() <= n)), s = t.filter(((a) => a.Ei() > n));
    i.sort(((a, o) => o.Ei() - a.Ei())), i.length && s.length && s.push(i[0]), s.sort(((a, o) => a.Ei() - o.Ei()));
    for (const a of t) {
      const o = Math.floor(a.$t(r) / 2), l = a.Ei();
      l > -o && l < o && a.Ui(o), l > this.Uv.height - o && l < this.Uv.height + o && a.Ui(this.Uv.height - o);
    }
    xg(i, 1, this.Uv.height, r), xg(s, -1, this.Uv.height, r);
  }
  Sm(t) {
    if (this.Uv === null) return;
    const r = this.um(), n = this.lm(), i = this.Jv ? "right" : "left";
    r.forEach(((s) => {
      s.qi() && s.Tt(C(this.Ki)).nt(t, n, this.qv, i);
    }));
  }
  xm(t) {
    if (this.Uv === null || this.Ki === null) return;
    const r = this.yt.Gv().Qt(), n = [], i = this.yt.cv(), s = r.gd().Ks(i, this.Ki);
    s.length && n.push(s);
    const a = this.lm(), o = this.Jv ? "right" : "left";
    n.forEach(((l) => {
      l.forEach(((u) => {
        u.Tt(C(this.Ki)).nt(t, a, this.qv, o);
      }));
    }));
  }
  Cm(t) {
    this.Jp.style.cursor = t === 1 ? "ns-resize" : "default";
  }
  do() {
    const t = this.om();
    this.Yv < t && this.yt.Gv().Qt().Ca(), this.Yv = t;
  }
  _m() {
    return Oi(this.Co.fontSize, this.Co.fontFamily);
  }
}
function sB(e3, t) {
  var _a3;
  return ((_a3 = e3.qa) == null ? void 0 : _a3.call(e3, t)) ?? [];
}
function Sg(e3, t) {
  var _a3;
  return ((_a3 = e3.Ys) == null ? void 0 : _a3.call(e3, t)) ?? [];
}
function _g(e3, t) {
  var _a3;
  return ((_a3 = e3.ds) == null ? void 0 : _a3.call(e3, t)) ?? [];
}
function aB(e3, t) {
  var _a3;
  return ((_a3 = e3.Ha) == null ? void 0 : _a3.call(e3, t)) ?? [];
}
class Gh {
  constructor(t, r) {
    this.Uv = J({ width: 0, height: 0 }), this.km = null, this.Pm = null, this.Tm = null, this.Rm = null, this.Dm = false, this.Im = new lt(), this.Vm = new lt(), this.Bm = 0, this.Em = false, this.Am = null, this.Lm = false, this.zm = null, this.Om = null, this.Kv = false, this.Zv = () => {
      this.Kv || this.Nm === null || this.ns().dr();
    }, this.Xv = () => {
      this.Kv || this.Nm === null || this.ns().dr();
    }, this.Lv = t, this.Nm = r, this.Nm.nu().i(this.Fm.bind(this), this, true), this.Wm = document.createElement("td"), this.Wm.style.padding = "0", this.Wm.style.position = "relative";
    const n = document.createElement("div");
    n.style.width = "100%", n.style.height = "100%", n.style.position = "relative", n.style.overflow = "hidden", this.Hm = document.createElement("td"), this.Hm.style.padding = "0", this.Um = document.createElement("td"), this.Um.style.padding = "0", this.Wm.appendChild(n), this.sm = Kr(n, J({ width: 16, height: 16 })), this.sm.subscribeSuggestedBitmapSizeChanged(this.Zv);
    const i = this.sm.canvasElement;
    i.style.position = "absolute", i.style.zIndex = "1", i.style.left = "0", i.style.top = "0", this.nm = Kr(n, J({ width: 16, height: 16 })), this.nm.subscribeSuggestedBitmapSizeChanged(this.Xv);
    const s = this.nm.canvasElement;
    s.style.position = "absolute", s.style.zIndex = "2", s.style.left = "0", s.style.top = "0", this.Xp = document.createElement("tr"), this.Xp.appendChild(this.Hm), this.Xp.appendChild(this.Wm), this.Xp.appendChild(this.Um), this.$m(), this.$p = new wo(this.nm.canvasElement, this, { dp: () => this.Am === null && !this.Lv.N().handleScroll.vertTouchDrag, fp: () => this.Am === null && !this.Lv.N().handleScroll.horzTouchDrag });
  }
  m() {
    this.km !== null && this.km.m(), this.Pm !== null && this.Pm.m(), this.Tm = null, this.nm.unsubscribeSuggestedBitmapSizeChanged(this.Xv), Ur(this.nm.canvasElement), this.nm.dispose(), this.sm.unsubscribeSuggestedBitmapSizeChanged(this.Zv), Ur(this.sm.canvasElement), this.sm.dispose(), this.Nm !== null && (this.Nm.nu().u(this), this.Nm.m()), this.$p.m();
  }
  cv() {
    return C(this.Nm);
  }
  qm(t) {
    var _a3;
    this.Nm !== null && this.Nm.nu().u(this), this.Nm = t, this.Nm !== null && this.Nm.nu().i(Gh.prototype.Fm.bind(this), this, true), this.$m(), this.Lv.Zp().indexOf(this) === this.Lv.Zp().length - 1 ? (this.Tm = this.Tm ?? new iB(this.Wm, this.Lv), this.Tm.kt()) : ((_a3 = this.Tm) == null ? void 0 : _a3.Ov(), this.Tm = null);
  }
  Gv() {
    return this.Lv;
  }
  iv() {
    return this.Xp;
  }
  $m() {
    if (this.Nm !== null && (this.jm(), this.ns().tn().length !== 0)) {
      if (this.km !== null) {
        const t = this.Nm.U_();
        this.km.cs(C(t));
      }
      if (this.Pm !== null) {
        const t = this.Nm.q_();
        this.Pm.cs(C(t));
      }
    }
  }
  Ym() {
    this.km !== null && this.km.kt(), this.Pm !== null && this.Pm.kt();
  }
  E_() {
    return this.Nm !== null ? this.Nm.E_() : 0;
  }
  A_(t) {
    this.Nm && this.Nm.A_(t);
  }
  lp(t) {
    if (!this.Nm) return;
    this.Km();
    const r = t.localX, n = t.localY;
    this.Zm(r, n, t);
  }
  Pp(t) {
    this.Km(), this.Gm(), this.Zm(t.localX, t.localY, t);
  }
  op(t) {
    if (!this.Nm) return;
    this.Km();
    const r = t.localX, n = t.localY;
    this.Zm(r, n, t);
  }
  Sp(t) {
    this.Nm !== null && (this.Km(), this.Xm(t));
  }
  ip(t) {
    this.Nm !== null && this.Jm(this.Vm, t);
  }
  Xf(t) {
    this.ip(t);
  }
  mp(t) {
    this.Km(), this.Qm(t), this.Zm(t.localX, t.localY, t);
  }
  bp(t) {
    this.Nm !== null && (this.Km(), this.Em = false, this.tw(t));
  }
  Mp(t) {
    this.Nm !== null && this.Xm(t);
  }
  Op(t) {
    if (this.Em = true, this.Am === null) {
      const r = { x: t.localX, y: t.localY };
      this.iw(r, r, t);
    }
  }
  zp(t) {
    this.Nm !== null && (this.Km(), this.Nm.Qt().vd(null), this.sw());
  }
  nw() {
    return this.Im;
  }
  ew() {
    return this.Vm;
  }
  Ip() {
    this.Bm = 1, this.ns().dn();
  }
  Vp(t, r) {
    if (!this.Lv.N().handleScale.pinch) return;
    const n = 5 * (r - this.Bm);
    this.Bm = r, this.ns().Td(t._t, n);
  }
  yp(t) {
    this.Em = false, this.Lm = this.Am !== null, this.Gm();
    const r = this.ns().gd();
    this.Am !== null && r.It() && (this.zm = { x: r.si(), y: r.ni() }, this.Am = { x: t.localX, y: t.localY });
  }
  pp(t) {
    if (this.Nm === null) return;
    const r = t.localX, n = t.localY;
    if (this.Am === null) this.Qm(t);
    else {
      this.Lm = false;
      const i = C(this.zm), s = i.x + (r - this.Am.x), a = i.y + (n - this.Am.y);
      this.Zm(s, a, t);
    }
  }
  gp(t) {
    this.Gv().N().trackingMode.exitMode === 0 && (this.Lm = true), this.rw(), this.tw(t);
  }
  Qn(t, r) {
    const n = this.Nm;
    return n === null ? null : p1(n, t, r);
  }
  hw(t, r) {
    C(r === "left" ? this.km : this.Pm).dm(J({ width: t, height: this.Uv.height }));
  }
  sv() {
    return this.Uv;
  }
  dm(t) {
    Ir(this.Uv, t) || (this.Uv = t, this.Kv = true, this.sm.resizeCanvasElement(t), this.nm.resizeCanvasElement(t), this.Kv = false, this.Wm.style.width = t.width + "px", this.Wm.style.height = t.height + "px");
  }
  aw() {
    const t = C(this.Nm);
    t.H_(t.U_()), t.H_(t.q_());
    for (const r of t.Sl()) if (t.Zn(r)) {
      const n = r.Ft();
      n !== null && t.H_(n), r.Ws();
    }
    for (const r of t.ru()) r.Ws();
  }
  nv() {
    return this.sm.bitmapSize;
  }
  ev(t, r, n, i) {
    const s = this.nv();
    if (s.width > 0 && s.height > 0 && (t.drawImage(this.sm.canvasElement, r, n), i)) {
      const a = this.nm.canvasElement;
      t !== null && t.drawImage(a, r, n);
    }
  }
  pm(t) {
    if (t === 0 || this.Nm === null) return;
    t > 1 && this.aw(), this.km !== null && this.km.pm(t), this.Pm !== null && this.Pm.pm(t);
    const r = { colorSpace: this.Lv.N().layout.colorSpace };
    if (t !== 1) {
      this.sm.applySuggestedBitmapSize();
      const i = Fr(this.sm, r);
      i !== null && (i.useBitmapCoordinateSpace(((s) => {
        this.wm(s);
      })), this.Nm && (this.lw(i, sB), this.ow(i), this.lw(i, Sg), this.lw(i, _g)));
    }
    this.nm.applySuggestedBitmapSize();
    const n = Fr(this.nm, r);
    n !== null && (n.useBitmapCoordinateSpace((({ context: i, bitmapSize: s }) => {
      i.clearRect(0, 0, s.width, s.height);
    })), this._w(n), this.lw(n, aB), this.lw(n, _g));
  }
  uw() {
    return this.km;
  }
  cw() {
    return this.Pm;
  }
  Mm(t, r) {
    this.lw(t, r);
  }
  Fm() {
    this.Nm !== null && this.Nm.nu().u(this), this.Nm = null;
  }
  Xm(t) {
    this.Jm(this.Im, t);
  }
  Jm(t, r) {
    const n = r.localX, i = r.localY;
    t.v() && t.p(this.ns().Et().wc(n), { x: n, y: i }, r);
  }
  wm({ context: t, bitmapSize: r }) {
    const { width: n, height: i } = r, s = this.ns(), a = s.$(), o = s.Kd();
    a === o ? po(t, 0, 0, n, i, o) : i1(t, 0, 0, n, i, a, o);
  }
  ow(t) {
    const r = C(this.Nm), n = r.eu().pr().Tt(r);
    n !== null && n.nt(t, false);
  }
  _w(t) {
    this.dw(t, Sg, xs, this.ns().gd());
  }
  lw(t, r) {
    const n = C(this.Nm), i = n.Dt(), s = n.ru();
    for (const a of s) this.dw(t, r, hc, a);
    for (const a of i) this.dw(t, r, hc, a);
    for (const a of s) this.dw(t, r, xs, a);
    for (const a of i) this.dw(t, r, xs, a);
  }
  dw(t, r, n, i) {
    const s = C(this.Nm), a = s.Qt().pd(), o = a !== null && a.hu === i, l = a !== null && o && a.au !== void 0 ? a.au.ie : void 0;
    fc(r, ((u) => n(u, t, o, l)), i, s);
  }
  jm() {
    if (this.Nm === null) return;
    const t = this.Lv, r = this.Nm.U_().N().visible, n = this.Nm.q_().N().visible;
    r || this.km === null || (this.Hm.removeChild(this.km.iv()), this.km.m(), this.km = null), n || this.Pm === null || (this.Um.removeChild(this.Pm.iv()), this.Pm.m(), this.Pm = null);
    const i = t.Qt().Nd();
    r && this.km === null && (this.km = new Pg(this, t.N(), i, "left"), this.Hm.appendChild(this.km.iv())), n && this.Pm === null && (this.Pm = new Pg(this, t.N(), i, "right"), this.Um.appendChild(this.Pm.iv()));
  }
  fw(t) {
    return t.Np && this.Em || this.Am !== null;
  }
  Zm(t, r, n) {
    t = Math.max(0, Math.min(t, this.Uv.width - 1)), r = Math.max(0, Math.min(r, this.Uv.height - 1)), this.ns().Ad(t, r, n, C(this.Nm));
  }
  sw() {
    this.ns().zd();
  }
  rw() {
    this.Lm && (this.Am = null, this.sw());
  }
  iw(t, r, n) {
    this.Am = t, this.Lm = false, this.Zm(r.x, r.y, n);
    const i = this.ns().gd();
    this.zm = { x: i.si(), y: i.ni() };
  }
  ns() {
    return this.Lv.Qt();
  }
  tw(t) {
    if (!this.Dm) return;
    const r = this.ns(), n = this.cv();
    if (r.X_(n, n.Rs()), this.Rm = null, this.Dm = false, r.Vd(), this.Om !== null) {
      const i = performance.now(), s = r.Et();
      this.Om.fe(s.Cc(), i), this.Om.Ec(i) || r.vn(this.Om);
    }
  }
  Km() {
    this.Am = null;
  }
  Gm() {
    if (this.Nm) {
      if (this.ns().dn(), document.activeElement !== document.body && document.activeElement !== document.documentElement) C(document.activeElement).blur();
      else {
        const t = document.getSelection();
        t !== null && t.removeAllRanges();
      }
      !this.Nm.Rs().Gi() && this.ns().Et().Gi();
    }
  }
  Qm(t) {
    if (this.Nm === null) return;
    const r = this.ns(), n = r.Et();
    if (n.Gi()) return;
    const i = this.Lv.N(), s = i.handleScroll, a = i.kineticScroll;
    if ((!s.pressedMouseMove || t.Np) && (!s.horzTouchDrag && !s.vertTouchDrag || !t.Np)) return;
    const o = this.Nm.Rs(), l = performance.now();
    if (this.Rm !== null || this.fw(t) || (this.Rm = { x: t.clientX, y: t.clientY, cf: l, pw: t.localX, mw: t.localY }), this.Rm !== null && !this.Dm && (this.Rm.x !== t.clientX || this.Rm.y !== t.clientY)) {
      if (t.Np && a.touch || !t.Np && a.mouse) {
        const u = n.ul();
        this.Om = new nB(0.2 / u, 7 / u, 0.997, 15 / u), this.Om.Dv(n.Cc(), this.Rm.cf);
      } else this.Om = null;
      o.Gi() || r.Z_(this.Nm, o, t.localY), r.Dd(t.localX), this.Dm = true;
    }
    this.Dm && (o.Gi() || r.G_(this.Nm, o, t.localY), r.Id(t.localX), this.Om !== null && this.Om.Dv(n.Cc(), l));
  }
}
class Og {
  constructor(t, r, n, i, s) {
    this.xt = true, this.Uv = J({ width: 0, height: 0 }), this.Zv = () => this.pm(3), this.Jv = t === "left", this.hd = n.Nd, this.Ps = r, this.ww = i, this.gw = s, this.Jp = document.createElement("div"), this.Jp.style.width = "25px", this.Jp.style.height = "100%", this.Jp.style.overflow = "hidden", this.sm = Kr(this.Jp, J({ width: 16, height: 16 })), this.sm.subscribeSuggestedBitmapSizeChanged(this.Zv);
  }
  m() {
    this.sm.unsubscribeSuggestedBitmapSizeChanged(this.Zv), Ur(this.sm.canvasElement), this.sm.dispose();
  }
  iv() {
    return this.Jp;
  }
  sv() {
    return this.Uv;
  }
  dm(t) {
    Ir(this.Uv, t) || (this.Uv = t, this.sm.resizeCanvasElement(t), this.Jp.style.width = `${t.width}px`, this.Jp.style.height = `${t.height}px`, this.xt = true);
  }
  pm(t) {
    if (t < 3 && !this.xt || this.Uv.width === 0 || this.Uv.height === 0) return;
    this.xt = false, this.sm.applySuggestedBitmapSize();
    const r = Fr(this.sm, { colorSpace: this.Ps.layout.colorSpace });
    r !== null && r.useBitmapCoordinateSpace(((n) => {
      this.wm(n), this.gm(n);
    }));
  }
  nv() {
    return this.sm.bitmapSize;
  }
  ev(t, r, n) {
    const i = this.nv();
    i.width > 0 && i.height > 0 && t.drawImage(this.sm.canvasElement, r, n);
  }
  gm({ context: t, bitmapSize: r, horizontalPixelRatio: n, verticalPixelRatio: i }) {
    if (!this.ww()) return;
    t.fillStyle = this.Ps.timeScale.borderColor;
    const s = Math.floor(this.hd.N().S * n), a = Math.floor(this.hd.N().S * i), o = this.Jv ? r.width - s : 0;
    t.fillRect(o, 0, s, a);
  }
  wm({ context: t, bitmapSize: r }) {
    po(t, 0, 0, r.width, r.height, this.gw());
  }
}
function Xh(e3) {
  return (t) => {
    var _a3;
    return ((_a3 = t.Ka) == null ? void 0 : _a3.call(t, e3)) ?? [];
  };
}
const oB = Xh("normal"), lB = Xh("top"), uB = Xh("bottom");
class cB {
  constructor(t, r) {
    this.Mw = null, this.bw = null, this.M = null, this.Sw = false, this.Uv = J({ width: 0, height: 0 }), this.xw = new lt(), this.qv = new Mi(5), this.Kv = false, this.Zv = () => {
      this.Kv || this.Lv.Qt().dr();
    }, this.Xv = () => {
      this.Kv || this.Lv.Qt().dr();
    }, this.Lv = t, this.cu = r, this.Ps = t.N().layout, this.Vv = document.createElement("tr"), this.Cw = document.createElement("td"), this.Cw.style.padding = "0", this.yw = document.createElement("td"), this.yw.style.padding = "0", this.Jp = document.createElement("td"), this.Jp.style.height = "25px", this.Jp.style.padding = "0", this.kw = document.createElement("div"), this.kw.style.width = "100%", this.kw.style.height = "100%", this.kw.style.position = "relative", this.kw.style.overflow = "hidden", this.Jp.appendChild(this.kw), this.sm = Kr(this.kw, J({ width: 16, height: 16 })), this.sm.subscribeSuggestedBitmapSizeChanged(this.Zv);
    const n = this.sm.canvasElement;
    n.style.position = "absolute", n.style.zIndex = "1", n.style.left = "0", n.style.top = "0", this.nm = Kr(this.kw, J({ width: 16, height: 16 })), this.nm.subscribeSuggestedBitmapSizeChanged(this.Xv);
    const i = this.nm.canvasElement;
    i.style.position = "absolute", i.style.zIndex = "2", i.style.left = "0", i.style.top = "0", this.Vv.appendChild(this.Cw), this.Vv.appendChild(this.Jp), this.Vv.appendChild(this.yw), this.Pw(), this.Lv.Qt().B_().i(this.Pw.bind(this), this), this.$p = new wo(this.nm.canvasElement, this, { dp: () => true, fp: () => !this.Lv.N().handleScroll.horzTouchDrag });
  }
  m() {
    this.$p.m(), this.Mw !== null && this.Mw.m(), this.bw !== null && this.bw.m(), this.nm.unsubscribeSuggestedBitmapSizeChanged(this.Xv), Ur(this.nm.canvasElement), this.nm.dispose(), this.sm.unsubscribeSuggestedBitmapSizeChanged(this.Zv), Ur(this.sm.canvasElement), this.sm.dispose();
  }
  iv() {
    return this.Vv;
  }
  Tw() {
    return this.Mw;
  }
  Rw() {
    return this.bw;
  }
  Pp(t) {
    if (this.Sw) return;
    this.Sw = true;
    const r = this.Lv.Qt();
    !r.Et().Gi() && this.Lv.N().handleScale.axisPressedMouseMove.time && r.Pd(t.localX);
  }
  yp(t) {
    this.Pp(t);
  }
  Tp() {
    const t = this.Lv.Qt();
    !t.Et().Gi() && this.Sw && (this.Sw = false, this.Lv.N().handleScale.axisPressedMouseMove.time && t.Ed());
  }
  mp(t) {
    const r = this.Lv.Qt();
    !r.Et().Gi() && this.Lv.N().handleScale.axisPressedMouseMove.time && r.Bd(t.localX);
  }
  pp(t) {
    this.mp(t);
  }
  bp() {
    this.Sw = false;
    const t = this.Lv.Qt();
    t.Et().Gi() && !this.Lv.N().handleScale.axisPressedMouseMove.time || t.Ed();
  }
  gp() {
    this.bp();
  }
  ip() {
    this.Lv.N().handleScale.axisDoubleClickReset.time && this.Lv.Qt().wn();
  }
  Xf() {
    this.ip();
  }
  lp() {
    this.Lv.Qt().N().handleScale.axisPressedMouseMove.time && this.Cm(1);
  }
  zp() {
    this.Cm(0);
  }
  sv() {
    return this.Uv;
  }
  Dw() {
    return this.xw;
  }
  Iw(t, r, n) {
    Ir(this.Uv, t) || (this.Uv = t, this.Kv = true, this.sm.resizeCanvasElement(t), this.nm.resizeCanvasElement(t), this.Kv = false, this.Jp.style.width = `${t.width}px`, this.Jp.style.height = `${t.height}px`, this.xw.p(t)), this.Mw !== null && this.Mw.dm(J({ width: r, height: t.height })), this.bw !== null && this.bw.dm(J({ width: n, height: t.height }));
  }
  Vw() {
    const t = this.Bw();
    return Math.ceil(t.S + t.C + t.k + t.A + t.I + t.Ew);
  }
  kt() {
    this.Lv.Qt().Et().Vl();
  }
  nv() {
    return this.sm.bitmapSize;
  }
  ev(t, r, n, i) {
    const s = this.nv();
    if (s.width > 0 && s.height > 0 && (t.drawImage(this.sm.canvasElement, r, n), i)) {
      const a = this.nm.canvasElement;
      t.drawImage(a, r, n);
    }
  }
  pm(t) {
    if (t === 0) return;
    const r = { colorSpace: this.Ps.colorSpace };
    if (t !== 1) {
      this.sm.applySuggestedBitmapSize();
      const i = Fr(this.sm, r);
      i !== null && (i.useBitmapCoordinateSpace(((s) => {
        this.wm(s), this.gm(s), this.Aw(i, uB);
      })), this.bm(i), this.Aw(i, oB)), this.Mw !== null && this.Mw.pm(t), this.bw !== null && this.bw.pm(t);
    }
    this.nm.applySuggestedBitmapSize();
    const n = Fr(this.nm, r);
    n !== null && (n.useBitmapCoordinateSpace((({ context: i, bitmapSize: s }) => {
      i.clearRect(0, 0, s.width, s.height);
    })), this.Lw([...this.Lv.Qt().tn(), this.Lv.Qt().gd()], n), this.Aw(n, lB));
  }
  Aw(t, r) {
    const n = this.Lv.Qt().tn();
    for (const i of n) fc(r, ((s) => hc(s, t, false, void 0)), i, void 0);
    for (const i of n) fc(r, ((s) => xs(s, t, false, void 0)), i, void 0);
  }
  wm({ context: t, bitmapSize: r }) {
    po(t, 0, 0, r.width, r.height, this.Lv.Qt().Kd());
  }
  gm({ context: t, bitmapSize: r, verticalPixelRatio: n }) {
    if (this.Lv.N().timeScale.borderVisible) {
      t.fillStyle = this.zw();
      const i = Math.max(1, Math.floor(this.Bw().S * n));
      t.fillRect(0, 0, r.width, i);
    }
  }
  bm(t) {
    const r = this.Lv.Qt().Et(), n = r.Vl();
    if (!n || n.length === 0) return;
    const i = this.cu.maxTickMarkWeight(n), s = this.Bw(), a = r.N();
    a.borderVisible && a.ticksVisible && t.useBitmapCoordinateSpace((({ context: o, horizontalPixelRatio: l, verticalPixelRatio: u }) => {
      o.strokeStyle = this.zw(), o.fillStyle = this.zw();
      const c = Math.max(1, Math.floor(l)), h = Math.floor(0.5 * l);
      o.beginPath();
      const f = Math.round(s.C * u);
      for (let d = n.length; d--; ) {
        const v = Math.round(n[d].coord * l);
        o.rect(v - h, 0, c, f);
      }
      o.fill();
    })), t.useMediaCoordinateSpace((({ context: o }) => {
      const l = s.S + s.C + s.A + s.k / 2;
      o.textAlign = "center", o.textBaseline = "middle", o.fillStyle = this.H(), o.font = this._m();
      for (const u of n) if (u.weight < i) {
        const c = u.needAlignCoordinate ? this.Ow(o, u.coord, u.label) : u.coord;
        o.fillText(u.label, c, l);
      }
      this.Lv.N().timeScale.allowBoldLabels && (o.font = this.Nw());
      for (const u of n) if (u.weight >= i) {
        const c = u.needAlignCoordinate ? this.Ow(o, u.coord, u.label) : u.coord;
        o.fillText(u.label, c, l);
      }
    }));
  }
  Ow(t, r, n) {
    const i = this.qv.Ii(t, n), s = i / 2, a = Math.floor(r - s) + 0.5;
    return a < 0 ? r += Math.abs(0 - a) : a + i > this.Uv.width && (r -= Math.abs(this.Uv.width - (a + i))), r;
  }
  Lw(t, r) {
    const n = this.Bw();
    for (const i of t) for (const s of i.fs()) s.Tt().nt(r, n);
  }
  zw() {
    return this.Lv.N().timeScale.borderColor;
  }
  H() {
    return this.Ps.textColor;
  }
  F() {
    return this.Ps.fontSize;
  }
  _m() {
    return Oi(this.F(), this.Ps.fontFamily);
  }
  Nw() {
    return Oi(this.F(), this.Ps.fontFamily, "bold");
  }
  Bw() {
    this.M === null && (this.M = { S: 1, L: NaN, A: NaN, I: NaN, ts: NaN, C: 5, k: NaN, P: "", Qi: new Mi(), Ew: 0 });
    const t = this.M, r = this._m();
    if (t.P !== r) {
      const n = this.F();
      t.k = n, t.P = r, t.A = 3 * n / 12, t.I = 3 * n / 12, t.ts = 9 * n / 12, t.L = 0, t.Ew = 4 * n / 12, t.Qi.On();
    }
    return this.M;
  }
  Cm(t) {
    this.Jp.style.cursor = t === 1 ? "ew-resize" : "default";
  }
  Pw() {
    const t = this.Lv.Qt(), r = t.N();
    r.leftPriceScale.visible || this.Mw === null || (this.Cw.removeChild(this.Mw.iv()), this.Mw.m(), this.Mw = null), r.rightPriceScale.visible || this.bw === null || (this.yw.removeChild(this.bw.iv()), this.bw.m(), this.bw = null);
    const n = { Nd: this.Lv.Qt().Nd() }, i = () => r.leftPriceScale.borderVisible && t.Et().N().borderVisible, s = () => t.Kd();
    r.leftPriceScale.visible && this.Mw === null && (this.Mw = new Og("left", r, n, i, s), this.Cw.appendChild(this.Mw.iv())), r.rightPriceScale.visible && this.bw === null && (this.bw = new Og("right", r, n, i, s), this.yw.appendChild(this.bw.iv()));
  }
}
const hB = !!En && !!navigator.userAgentData && navigator.userAgentData.brands.some(((e3) => e3.brand.includes("Chromium"))) && !!En && (((_a2 = navigator == null ? void 0 : navigator.userAgentData) == null ? void 0 : _a2.platform) ? navigator.userAgentData.platform === "Windows" : navigator.userAgent.toLowerCase().indexOf("win") >= 0);
class fB {
  constructor(t, r, n) {
    var i;
    this.Fw = [], this.Ww = [], this.Hw = 0, this.eo = 0, this.S_ = 0, this.Uw = 0, this.$w = 0, this.qw = null, this.jw = false, this.Im = new lt(), this.Vm = new lt(), this.nd = new lt(), this.Yw = null, this.Kw = null, this.Av = t, this.Ps = r, this.cu = n, this.Vv = document.createElement("div"), this.Vv.classList.add("tv-lightweight-charts"), this.Vv.style.overflow = "hidden", this.Vv.style.direction = "ltr", this.Vv.style.width = "100%", this.Vv.style.height = "100%", (i = this.Vv).style.userSelect = "none", i.style.webkitUserSelect = "none", i.style.msUserSelect = "none", i.style.MozUserSelect = "none", i.style.webkitTapHighlightColor = "transparent", this.Zw = document.createElement("table"), this.Zw.setAttribute("cellspacing", "0"), this.Vv.appendChild(this.Zw), this.Gw = this.Xw.bind(this), fu(this.Ps) && this.Jw(true), this.ns = new Xz(this.rd.bind(this), this.Ps, n), this.Qt().Md().i(this.Qw.bind(this), this), this.tg = new cB(this, this.cu), this.Zw.appendChild(this.tg.iv());
    const s = r.autoSize && this.ig();
    let a = this.Ps.width, o = this.Ps.height;
    if (s || a === 0 || o === 0) {
      const l = t.getBoundingClientRect();
      a = a || l.width, o = o || l.height;
    }
    this.sg(a, o), this.ng(), t.appendChild(this.Vv), this.eg(), this.ns.Et().Oc().i(this.ns.Ca.bind(this.ns), this), this.ns.B_().i(this.ns.Ca.bind(this.ns), this);
  }
  Qt() {
    return this.ns;
  }
  N() {
    return this.Ps;
  }
  Zp() {
    return this.Fw;
  }
  rg() {
    return this.tg;
  }
  m() {
    this.Jw(false), this.Hw !== 0 && window.cancelAnimationFrame(this.Hw), this.ns.Md().u(this), this.ns.Et().Oc().u(this), this.ns.B_().u(this), this.ns.m();
    for (const t of this.Fw) this.Zw.removeChild(t.iv()), t.nw().u(this), t.ew().u(this), t.m();
    this.Fw = [];
    for (const t of this.Ww) this.hg(t);
    this.Ww = [], C(this.tg).m(), this.Vv.parentElement !== null && this.Vv.parentElement.removeChild(this.Vv), this.nd.m(), this.Im.m(), this.Vm.m(), this.ag();
  }
  sg(t, r, n = false) {
    if (this.eo === r && this.S_ === t) return;
    const i = (function(o) {
      const l = Math.floor(o.width), u = Math.floor(o.height);
      return J({ width: l - l % 2, height: u - u % 2 });
    })(J({ width: t, height: r }));
    this.eo = i.height, this.S_ = i.width;
    const s = this.eo + "px", a = this.S_ + "px";
    C(this.Vv).style.height = s, C(this.Vv).style.width = a, this.Zw.style.height = s, this.Zw.style.width = a, n ? this.lg(_t.yn(), performance.now()) : this.ns.Ca();
  }
  pm(t) {
    t === void 0 && (t = _t.yn());
    for (let r = 0; r < this.Fw.length; r++) this.Fw[r].pm(t.un(r).an);
    this.Ps.timeScale.visible && this.tg.pm(t._n());
  }
  cr(t) {
    var _a3;
    const r = fu(this.Ps);
    this.ns.cr(t);
    const n = fu(this.Ps);
    n !== r && this.Jw(n), ((_a3 = t.layout) == null ? void 0 : _a3.panes) && this.og(), this.eg(), this._g(t);
  }
  nw() {
    return this.Im;
  }
  ew() {
    return this.Vm;
  }
  Md() {
    return this.nd;
  }
  ug(t = false) {
    this.qw !== null && (this.lg(this.qw, performance.now()), this.qw = null);
    const r = this.cg(null), n = document.createElement("canvas");
    n.width = r.width, n.height = r.height;
    const i = C(n.getContext("2d"));
    return this.cg(i, t), n;
  }
  dg(t) {
    return t === "left" && !this.fg() || t === "right" && !this.pg() || this.Fw.length === 0 ? 0 : C(t === "left" ? this.Fw[0].uw() : this.Fw[0].cw()).fm();
  }
  vg() {
    return this.Ps.autoSize && this.Yw !== null;
  }
  hv() {
    return this.Vv;
  }
  mg(t) {
    this.Kw = t, this.Kw ? this.hv().style.setProperty("cursor", t) : this.hv().style.removeProperty("cursor");
  }
  wg() {
    return this.Kw;
  }
  gg(t) {
    return Yt(this.Fw[t]).sv();
  }
  og() {
    this.Ww.forEach(((t) => {
      t.kt();
    }));
  }
  _g(t) {
    (t.autoSize !== void 0 || !this.Yw || t.width === void 0 && t.height === void 0) && (t.autoSize && !this.Yw && this.ig(), t.autoSize === false && this.Yw !== null && this.ag(), t.autoSize || t.width === void 0 && t.height === void 0 || this.sg(t.width || this.S_, t.height || this.eo));
  }
  cg(t, r) {
    let n = 0, i = 0;
    const s = this.Fw[0], a = (l, u) => {
      let c = 0;
      for (let h = 0; h < this.Fw.length; h++) {
        const f = this.Fw[h], d = C(l === "left" ? f.uw() : f.cw()), v = d.nv();
        if (t !== null && d.ev(t, u, c, r), c += v.height, h < this.Fw.length - 1) {
          const p = this.Ww[h], m = p.nv();
          t !== null && p.ev(t, u, c), c += m.height;
        }
      }
    };
    this.fg() && (a("left", 0), n += C(s.uw()).nv().width);
    for (let l = 0; l < this.Fw.length; l++) {
      const u = this.Fw[l], c = u.nv();
      if (t !== null && u.ev(t, n, i, r), i += c.height, l < this.Fw.length - 1) {
        const h = this.Ww[l], f = h.nv();
        t !== null && h.ev(t, n, i), i += f.height;
      }
    }
    n += s.nv().width, this.pg() && (a("right", n), n += C(s.cw()).nv().width);
    const o = (l, u, c) => {
      C(l === "left" ? this.tg.Tw() : this.tg.Rw()).ev(C(t), u, c);
    };
    if (this.Ps.timeScale.visible) {
      const l = this.tg.nv();
      if (t !== null) {
        let u = 0;
        this.fg() && (o("left", u, i), u = C(s.uw()).nv().width), this.tg.ev(t, u, i, r), u += l.width, this.pg() && o("right", u, i);
      }
      i += l.height;
    }
    return J({ width: n, height: i });
  }
  Mg() {
    let t = 0, r = 0, n = 0;
    for (const m of this.Fw) this.fg() && (r = Math.max(r, C(m.uw()).om(), this.Ps.leftPriceScale.minimumWidth)), this.pg() && (n = Math.max(n, C(m.cw()).om(), this.Ps.rightPriceScale.minimumWidth)), t += m.E_();
    r = cc(r), n = cc(n);
    const i = this.S_, s = this.eo, a = Math.max(i - r - n, 0), o = 1 * this.Ww.length, l = this.Ps.timeScale.visible;
    let u = l ? Math.max(this.tg.Vw(), this.Ps.timeScale.minimumHeight) : 0;
    var c;
    u = (c = u) + c % 2;
    const h = o + u, f = s < h ? 0 : s - h, d = f / t;
    let v = 0;
    const p = window.devicePixelRatio || 1;
    for (let m = 0; m < this.Fw.length; ++m) {
      const y = this.Fw[m];
      y.qm(this.ns.Xs()[m]);
      let b = 0, w = 0;
      w = m === this.Fw.length - 1 ? Math.ceil((f - v) * p) / p : Math.round(y.E_() * d * p) / p, b = Math.max(w, 2), v += b, y.dm(J({ width: a, height: b })), this.fg() && y.hw(r, "left"), this.pg() && y.hw(n, "right"), y.cv() && this.ns.bd(y.cv(), b);
    }
    this.tg.Iw(J({ width: l ? a : 0, height: u }), l ? r : 0, l ? n : 0), this.ns.L_(a), this.Uw !== r && (this.Uw = r), this.$w !== n && (this.$w = n);
  }
  Jw(t) {
    t ? this.Vv.addEventListener("wheel", this.Gw, { passive: false }) : this.Vv.removeEventListener("wheel", this.Gw);
  }
  bg(t) {
    switch (t.deltaMode) {
      case t.DOM_DELTA_PAGE:
        return 120;
      case t.DOM_DELTA_LINE:
        return 32;
    }
    return hB ? 1 / window.devicePixelRatio : 1;
  }
  Xw(t) {
    if (!(t.deltaX !== 0 && this.Ps.handleScroll.mouseWheel || t.deltaY !== 0 && this.Ps.handleScale.mouseWheel)) return;
    const r = this.bg(t), n = r * t.deltaX / 100, i = -r * t.deltaY / 100;
    if (t.cancelable && t.preventDefault(), i !== 0 && this.Ps.handleScale.mouseWheel) {
      const s = Math.sign(i) * Math.min(1, Math.abs(i)), a = t.clientX - this.Vv.getBoundingClientRect().left;
      this.Qt().Td(a, s);
    }
    n !== 0 && this.Ps.handleScroll.mouseWheel && this.Qt().Rd(-80 * n);
  }
  lg(t, r) {
    var _a3;
    const n = t._n();
    n === 3 && this.Sg(), n !== 3 && n !== 2 || (this.xg(t), this.Cg(t, r), this.tg.kt(), this.Fw.forEach(((i) => {
      i.Ym();
    })), ((_a3 = this.qw) == null ? void 0 : _a3._n()) === 3 && (this.qw.Sn(t), this.Sg(), this.xg(this.qw), this.Cg(this.qw, r), t = this.qw, this.qw = null)), this.pm(t);
  }
  Cg(t, r) {
    for (const n of t.bn()) this.xn(n, r);
  }
  xg(t) {
    const r = this.ns.Xs();
    for (let n = 0; n < r.length; n++) t.un(n).ln && r[n].tu();
  }
  xn(t, r) {
    const n = this.ns.Et();
    switch (t.fn) {
      case 0:
        n.Fc();
        break;
      case 1:
        n.Wc(t.Wt);
        break;
      case 2:
        n.gn(t.Wt);
        break;
      case 3:
        n.Mn(t.Wt);
        break;
      case 4:
        n.Pc();
        break;
      case 5:
        t.Wt.Ec(r) || n.Mn(t.Wt.Ac(r));
    }
  }
  rd(t) {
    this.qw !== null ? this.qw.Sn(t) : this.qw = t, this.jw || (this.jw = true, this.Hw = window.requestAnimationFrame(((r) => {
      if (this.jw = false, this.Hw = 0, this.qw !== null) {
        const n = this.qw;
        this.qw = null, this.lg(n, r);
        for (const i of n.bn()) if (i.fn === 5 && !i.Wt.Ec(r)) {
          this.Qt().vn(i.Wt);
          break;
        }
      }
    })));
  }
  Sg() {
    this.ng();
  }
  hg(t) {
    this.Zw.removeChild(t.iv()), t.m();
  }
  ng() {
    const t = this.ns.Xs(), r = t.length, n = this.Fw.length;
    for (let i = r; i < n; i++) {
      const s = Yt(this.Fw.pop());
      this.Zw.removeChild(s.iv()), s.nw().u(this), s.ew().u(this), s.m();
      const a = this.Ww.pop();
      a !== void 0 && this.hg(a);
    }
    for (let i = n; i < r; i++) {
      const s = new Gh(this, t[i]);
      if (s.nw().i(this.yg.bind(this, s), this), s.ew().i(this.kg.bind(this, s), this), this.Fw.push(s), i > 0) {
        const a = new rB(this, i - 1, i);
        this.Ww.push(a), this.Zw.insertBefore(a.iv(), this.tg.iv());
      }
      this.Zw.insertBefore(s.iv(), this.tg.iv());
    }
    for (let i = 0; i < r; i++) {
      const s = t[i], a = this.Fw[i];
      a.cv() !== s ? a.qm(s) : a.$m();
    }
    this.eg(), this.Mg();
  }
  Pg(t, r, n, i) {
    var _a3;
    const s = /* @__PURE__ */ new Map();
    t !== null && this.ns.tn().forEach(((h) => {
      const f = h.qs().$s(t);
      f !== null && s.set(h, f);
    }));
    let a;
    if (t !== null) {
      const h = (_a3 = this.ns.Et().es(t)) == null ? void 0 : _a3.originalTime;
      h !== void 0 && (a = h);
    }
    const o = this.Qt().pd(), l = o !== null && o.hu instanceof bo ? o.hu : void 0, u = o !== null && o.au !== void 0 ? o.au.te : void 0, c = this.Tg(i);
    return { Gr: a, js: t ?? void 0, Rg: r ?? void 0, Dg: c !== -1 ? c : void 0, Ig: l, Vg: s, Bg: u, Eg: n ?? void 0 };
  }
  Tg(t) {
    let r = -1;
    if (t) r = this.Fw.indexOf(t);
    else {
      const n = this.Qt().gd().Gs();
      n !== null && (r = this.Qt().Xs().indexOf(n));
    }
    return r;
  }
  yg(t, r, n, i) {
    this.Im.p((() => this.Pg(r, n, i, t)));
  }
  kg(t, r, n, i) {
    this.Vm.p((() => this.Pg(r, n, i, t)));
  }
  Qw(t, r, n) {
    var _a3;
    this.mg(((_a3 = this.Qt().pd()) == null ? void 0 : _a3.ou) ?? null), this.nd.p((() => this.Pg(t, r, n)));
  }
  eg() {
    const t = this.Ps.timeScale.visible ? "" : "none";
    this.tg.iv().style.display = t;
  }
  fg() {
    return this.Fw[0].cv().U_().N().visible;
  }
  pg() {
    return this.Fw[0].cv().q_().N().visible;
  }
  ig() {
    return "ResizeObserver" in window && (this.Yw = new ResizeObserver(((t) => {
      const r = t[t.length - 1];
      r && this.sg(r.contentRect.width, r.contentRect.height);
    })), this.Yw.observe(this.Av, { box: "border-box" }), true);
  }
  ag() {
    this.Yw !== null && this.Yw.disconnect(), this.Yw = null;
  }
}
function fu(e3) {
  return !!(e3.handleScroll.mouseWheel || e3.handleScale.mouseWheel);
}
function dB(e3) {
  return e3.open === void 0 && e3.value === void 0;
}
function vB(e3) {
  return (function(t) {
    return t.open !== void 0;
  })(e3) || (function(t) {
    return t.value !== void 0;
  })(e3);
}
function Mg(e3, t, r, n) {
  const i = r.value, s = { js: t, wt: e3, Wt: [i, i, i, i], Gr: n };
  return r.color !== void 0 && (s.R = r.color), s;
}
function pB(e3, t, r, n) {
  const i = r.value, s = { js: t, wt: e3, Wt: [i, i, i, i], Gr: n };
  return r.lineColor !== void 0 && (s.vt = r.lineColor), r.topColor !== void 0 && (s.eh = r.topColor), r.bottomColor !== void 0 && (s.rh = r.bottomColor), s;
}
function mB(e3, t, r, n) {
  const i = r.value, s = { js: t, wt: e3, Wt: [i, i, i, i], Gr: n };
  return r.topLineColor !== void 0 && (s.hh = r.topLineColor), r.bottomLineColor !== void 0 && (s.ah = r.bottomLineColor), r.topFillColor1 !== void 0 && (s.oh = r.topFillColor1), r.topFillColor2 !== void 0 && (s._h = r.topFillColor2), r.bottomFillColor1 !== void 0 && (s.uh = r.bottomFillColor1), r.bottomFillColor2 !== void 0 && (s.dh = r.bottomFillColor2), s;
}
function gB(e3, t, r, n) {
  const i = { js: t, wt: e3, Wt: [r.open, r.high, r.low, r.close], Gr: n };
  return r.color !== void 0 && (i.R = r.color), i;
}
function yB(e3, t, r, n) {
  const i = { js: t, wt: e3, Wt: [r.open, r.high, r.low, r.close], Gr: n };
  return r.color !== void 0 && (i.R = r.color), r.borderColor !== void 0 && (i.Ht = r.borderColor), r.wickColor !== void 0 && (i.nh = r.wickColor), i;
}
function bB(e3, t, r, n, i) {
  const s = Yt(i)(r), a = Math.max(...s), o = Math.min(...s), l = s[s.length - 1], u = [l, a, o, l], { time: c, color: h, ...f } = r;
  return { js: t, wt: e3, Wt: u, Gr: n, le: f, R: h };
}
function sn(e3) {
  return e3.Wt !== void 0;
}
function Eg(e3, t) {
  return t.customValues !== void 0 && (e3.Ag = t.customValues), e3;
}
function wr(e3) {
  return (t, r, n, i, s, a) => (function(o, l) {
    return l ? l(o) : dB(o);
  })(n, a) ? Eg({ wt: t, js: r, Gr: i }, n) : Eg(e3(t, r, n, i, s), n);
}
function Ag(e3) {
  return { Candlestick: wr(yB), Bar: wr(gB), Area: wr(pB), Baseline: wr(mB), Histogram: wr(Mg), Line: wr(Mg), Custom: wr(bB) }[e3];
}
function Cg(e3) {
  return { js: 0, Lg: /* @__PURE__ */ new Map(), Ea: e3 };
}
function jg(e3, t) {
  if (e3 !== void 0 && e3.length !== 0) return { zg: t.key(e3[0].wt), Og: t.key(e3[e3.length - 1].wt) };
}
function kg(e3) {
  let t;
  return e3.forEach(((r) => {
    t === void 0 && (t = r.Gr);
  })), Yt(t);
}
class wB {
  constructor(t) {
    this.Ng = /* @__PURE__ */ new Map(), this.Fg = /* @__PURE__ */ new Map(), this.Wg = /* @__PURE__ */ new Map(), this.Hg = [], this.cu = t;
  }
  m() {
    this.Ng.clear(), this.Fg.clear(), this.Wg.clear(), this.Hg = [];
  }
  Ug(t, r) {
    let n = this.Ng.size !== 0, i = false;
    const s = this.Fg.get(t);
    if (s !== void 0) if (this.Fg.size === 1) n = false, i = true, this.Ng.clear();
    else for (const l of this.Hg) l.pointData.Lg.delete(t) && (i = true);
    let a = [];
    if (r.length !== 0) {
      const l = r.map(((d) => d.time)), u = this.cu.createConverterToInternalObj(r), c = Ag(t.wh()), h = t.rl(), f = t.hl();
      a = r.map(((d, v) => {
        const p = u(d.time), m = this.cu.key(p);
        let y = this.Ng.get(m);
        y === void 0 && (y = Cg(p), this.Ng.set(m, y), i = true);
        const b = c(p, y.js, d, l[v], h, f);
        return y.Lg.set(t, b), b;
      }));
    }
    n && this.$g(), this.qg(t, a);
    let o = -1;
    if (i) {
      const l = [];
      this.Ng.forEach(((u) => {
        l.push({ timeWeight: 0, time: u.Ea, pointData: u, originalTime: kg(u.Lg) });
      })), l.sort(((u, c) => this.cu.key(u.time) - this.cu.key(c.time))), o = this.jg(l);
    }
    return this.Yg(t, o, (function(l, u, c) {
      const h = jg(l, c), f = jg(u, c);
      if (h !== void 0 && f !== void 0) return { Kg: false, Ta: h.Og >= f.Og && h.zg >= f.zg };
    })(this.Fg.get(t), s, this.cu));
  }
  Hd(t) {
    return this.Ug(t, []);
  }
  Zg(t, r, n) {
    if (n && t.La()) throw new Error("Historical updates are not supported when conflation is enabled. Conflation requires data to be processed in order.");
    const i = r;
    (function(y) {
      y.Gr === void 0 && (y.Gr = y.time);
    })(i), this.cu.preprocessData(r);
    const s = this.cu.createConverterToInternalObj([r])(r.time), a = this.Wg.get(t);
    if (!n && a !== void 0 && this.cu.key(s) < this.cu.key(a)) throw new Error(`Cannot update oldest data, last time=${a}, new time=${s}`);
    let o = this.Ng.get(this.cu.key(s));
    if (n && o === void 0) throw new Error("Cannot update non-existing data point when historicalUpdate is true");
    const l = o === void 0;
    o === void 0 && (o = Cg(s), this.Ng.set(this.cu.key(s), o));
    const u = Ag(t.wh()), c = t.rl(), h = t.hl(), f = u(s, o.js, r, i.Gr, c, h), d = !n && !l && a !== void 0 && this.cu.key(s) === this.cu.key(a);
    o.Lg.set(t, f), n ? this.Gg(t, f, o.js) : d && t.La() && sn(f) ? (t.kr(f), this.Xg(t, f)) : this.Xg(t, f);
    const v = { Ta: sn(f), Kg: n };
    if (!l) return this.Yg(t, -1, v);
    const p = { timeWeight: 0, time: o.Ea, pointData: o, originalTime: kg(o.Lg) }, m = Mn(this.Hg, this.cu.key(p.time), ((y, b) => this.cu.key(y.time) < b));
    this.Hg.splice(m, 0, p);
    for (let y = m; y < this.Hg.length; ++y) ps(this.Hg[y].pointData, y);
    return this.cu.fillWeightsForPoints(this.Hg, m), this.Yg(t, m, v);
  }
  Jg(t, r) {
    const n = this.Fg.get(t);
    if (n === void 0 || r <= 0) return [[], this.Qg()];
    r = Math.min(r, n.length);
    const i = n.splice(-r).reverse();
    n.length === 0 ? this.Wg.delete(t) : this.Wg.set(t, n[n.length - 1].wt);
    for (const s of i) {
      const a = this.Ng.get(this.cu.key(s.wt));
      if (a && (a.Lg.delete(t), a.Lg.size === 0)) {
        this.Ng.delete(this.cu.key(a.Ea)), this.Hg.splice(a.js, 1);
        for (let o = a.js; o < this.Hg.length; ++o) ps(this.Hg[o].pointData, o);
      }
    }
    return [i, this.Yg(t, this.Hg.length - 1, { Kg: false, Ta: false })];
  }
  Xg(t, r) {
    let n = this.Fg.get(t);
    n === void 0 && (n = [], this.Fg.set(t, n));
    const i = n.length !== 0 ? n[n.length - 1] : null;
    i === null || this.cu.key(r.wt) > this.cu.key(i.wt) ? sn(r) && n.push(r) : sn(r) ? n[n.length - 1] = r : n.splice(-1, 1), this.Wg.set(t, r.wt);
  }
  Gg(t, r, n) {
    const i = this.Fg.get(t);
    if (i === void 0) return;
    const s = Mn(i, n, ((a, o) => a.js < o));
    sn(r) ? i[s] = r : i.splice(s, 1);
  }
  qg(t, r) {
    r.length !== 0 ? (this.Fg.set(t, r.filter(sn)), this.Wg.set(t, r[r.length - 1].wt)) : (this.Fg.delete(t), this.Wg.delete(t));
  }
  $g() {
    for (const t of this.Hg) t.pointData.Lg.size === 0 && this.Ng.delete(this.cu.key(t.time));
  }
  jg(t) {
    let r = -1;
    for (let n = 0; n < this.Hg.length && n < t.length; ++n) {
      const i = this.Hg[n], s = t[n];
      if (this.cu.key(i.time) !== this.cu.key(s.time)) {
        r = n;
        break;
      }
      s.timeWeight = i.timeWeight, ps(s.pointData, n);
    }
    if (r === -1 && this.Hg.length !== t.length && (r = Math.min(this.Hg.length, t.length)), r === -1) return -1;
    for (let n = r; n < t.length; ++n) ps(t[n].pointData, n);
    return this.cu.fillWeightsForPoints(t, r), this.Hg = t, r;
  }
  tM() {
    if (this.Fg.size === 0) return null;
    let t = 0;
    return this.Fg.forEach(((r) => {
      r.length !== 0 && (t = Math.max(t, r[r.length - 1].js));
    })), t;
  }
  Yg(t, r, n) {
    const i = this.Qg();
    if (r !== -1) this.Fg.forEach(((s, a) => {
      i.F_.set(a, { le: s, iM: a === t ? n : void 0 });
    })), this.Fg.has(t) || i.F_.set(t, { le: [], iM: n }), i.Et.sM = this.Hg, i.Et.nM = r;
    else {
      const s = this.Fg.get(t);
      i.F_.set(t, { le: s || [], iM: n });
    }
    return i;
  }
  Qg() {
    return { F_: /* @__PURE__ */ new Map(), Et: { vc: this.tM() } };
  }
}
function ps(e3, t) {
  e3.js = t, e3.Lg.forEach(((r) => {
    r.js = t;
  }));
}
function xB(e3, t) {
  return e3.wt < t;
}
function PB(e3, t) {
  return t < e3.wt;
}
function b1(e3, t, r) {
  const n = t.Aa(), i = t.bi(), s = Mn(e3, n, xB), a = h1(e3, i, PB);
  if (!r) return { from: s, to: a };
  let o = s, l = a;
  return s > 0 && s < e3.length && e3[s].wt >= n && (o = s - 1), a > 0 && a < e3.length && e3[a - 1].wt <= i && (l = a + 1), { from: o, to: l };
}
class Jh {
  constructor(t, r, n) {
    this.eM = true, this.rM = true, this.hM = true, this.aM = [], this.lM = null, this.oM = -1, this.ee = t, this.re = r, this._M = n;
  }
  kt(t) {
    this.eM = true, t === "data" && (this.rM = true), t === "options" && (this.hM = true);
  }
  Tt() {
    return this.ee.It() ? (this.uM(), this.lM === null ? null : this.cM) : null;
  }
  dM() {
    this.aM = this.aM.map(((t) => ({ ...t, ...this.ee.ga().gh(t.wt) })));
  }
  fM() {
    this.lM = null;
  }
  uM() {
    const t = this.re.Et(), r = t.N().enableConflation ? t.Hc() : 0;
    r !== this.oM && (this.rM = true, this.oM = r), this.rM && (this.pM(), this.rM = false), this.hM && (this.dM(), this.hM = false), this.eM && (this.vM(), this.eM = false);
  }
  vM() {
    const t = this.ee.Ft(), r = this.re.Et();
    if (this.fM(), r.Gi() || t.Gi()) return;
    const n = r.Ie();
    if (n === null || this.ee.qs().yh() === 0) return;
    const i = this.ee.Lt();
    i !== null && (this.lM = b1(this.aM, n, this._M), this.mM(t, r, i.Wt), this.wM());
  }
}
class SB {
  constructor(t, r) {
    this.gM = t, this.Ki = r;
  }
  nt(t, r, n) {
    this.gM.draw(t, this.Ki, r, n);
  }
}
class _B extends Jh {
  constructor(t, r, n) {
    super(t, r, false), this.$h = n, this.cM = new SB(this.$h.renderer(), ((i) => {
      const s = t.Lt();
      return s === null ? null : t.Ft().Nt(i, s.Wt);
    }));
  }
  get ma() {
    return this.$h.conflationReducer;
  }
  Oa(t) {
    return this.$h.priceValueBuilder(t);
  }
  al(t) {
    return this.$h.isWhitespace(t);
  }
  pM() {
    const t = this.ee.ga();
    this.aM = this.ee.Na().Dh().map(((r) => ({ wt: r.js, _t: NaN, ...t.gh(r.js), MM: r.le })));
  }
  mM(t, r) {
    r.mc(this.aM, _i(this.lM));
  }
  wM() {
    this.$h.update({ bars: this.aM.map(OB), barSpacing: this.re.Et().ul(), visibleRange: this.lM, conflationFactor: this.re.Et().Hc() }, this.ee.N());
  }
}
function OB(e3) {
  return { x: e3._t, time: e3.wt, originalData: e3.MM, barColor: e3.th };
}
const MB = { color: "#2196f3" }, EB = (e3, t, r) => {
  const n = or(r);
  return new _B(e3, t, n);
};
function Zh(e3) {
  const t = { value: e3.Wt[3], time: e3.Gr };
  return e3.Ag !== void 0 && (t.customValues = e3.Ag), t;
}
function Ig(e3) {
  const t = Zh(e3);
  return e3.R !== void 0 && (t.color = e3.R), t;
}
function AB(e3) {
  const t = Zh(e3);
  return e3.vt !== void 0 && (t.lineColor = e3.vt), e3.eh !== void 0 && (t.topColor = e3.eh), e3.rh !== void 0 && (t.bottomColor = e3.rh), t;
}
function CB(e3) {
  const t = Zh(e3);
  return e3.hh !== void 0 && (t.topLineColor = e3.hh), e3.ah !== void 0 && (t.bottomLineColor = e3.ah), e3.oh !== void 0 && (t.topFillColor1 = e3.oh), e3._h !== void 0 && (t.topFillColor2 = e3._h), e3.uh !== void 0 && (t.bottomFillColor1 = e3.uh), e3.dh !== void 0 && (t.bottomFillColor2 = e3.dh), t;
}
function w1(e3) {
  const t = { open: e3.Wt[0], high: e3.Wt[1], low: e3.Wt[2], close: e3.Wt[3], time: e3.Gr };
  return e3.Ag !== void 0 && (t.customValues = e3.Ag), t;
}
function jB(e3) {
  const t = w1(e3);
  return e3.R !== void 0 && (t.color = e3.R), t;
}
function kB(e3) {
  const t = w1(e3), { R: r, Ht: n, nh: i } = e3;
  return r !== void 0 && (t.color = r), n !== void 0 && (t.borderColor = n), i !== void 0 && (t.wickColor = i), t;
}
function Ps(e3) {
  return { Area: AB, Line: Ig, Baseline: CB, Histogram: Ig, Bar: jB, Candlestick: kB, Custom: IB }[e3];
}
function IB(e3) {
  const t = e3.Gr;
  return { ...e3.le, time: t };
}
const TB = { vertLine: { color: "#9598A1", width: 1, style: 3, visible: true, labelVisible: true, labelBackgroundColor: "#131722" }, horzLine: { color: "#9598A1", width: 1, style: 3, visible: true, labelVisible: true, labelBackgroundColor: "#131722" }, mode: 1, doNotSnapToHiddenSeriesIndices: false }, NB = { vertLines: { color: "#D6DCDE", style: 0, visible: true }, horzLines: { color: "#D6DCDE", style: 0, visible: true } }, DB = { background: { type: "solid", color: "#FFFFFF" }, textColor: "#191919", fontSize: 12, fontFamily: r1, panes: { enableResize: true, separatorColor: "#E0E3EB", separatorHoverColor: "rgba(178, 181, 189, 0.2)" }, attributionLogo: true, colorSpace: "srgb", colorParsers: [] }, du = { autoScale: true, mode: 0, invertScale: false, alignLabels: true, borderVisible: true, borderColor: "#2B2B43", entireTextOnly: false, visible: false, ticksVisible: false, scaleMargins: { bottom: 0.1, top: 0.2 }, minimumWidth: 0, ensureEdgeTickMarksVisible: false }, LB = { rightOffset: 0, barSpacing: 6, minBarSpacing: 0.5, maxBarSpacing: 0, fixLeftEdge: false, fixRightEdge: false, lockVisibleTimeRangeOnResize: false, rightBarStaysOnScroll: false, borderVisible: true, borderColor: "#2B2B43", visible: true, timeVisible: false, secondsVisible: true, shiftVisibleRangeOnNewBar: true, allowShiftVisibleRangeOnWhitespaceReplacement: false, ticksVisible: false, uniformDistribution: false, minimumHeight: 0, allowBoldLabels: true, ignoreWhitespaceIndices: false, enableConflation: false, conflationThresholdFactor: 1, precomputeConflationOnInit: false, precomputeConflationPriority: "background" };
function Tg() {
  return { addDefaultPane: true, width: 0, height: 0, autoSize: false, layout: DB, crosshair: TB, grid: NB, overlayPriceScales: { ...du }, leftPriceScale: { ...du, visible: false }, rightPriceScale: { ...du, visible: true }, timeScale: LB, localization: { locale: En ? navigator.language : "", dateFormat: "dd MMM 'yy" }, handleScroll: { mouseWheel: true, pressedMouseMove: true, horzTouchDrag: true, vertTouchDrag: true }, handleScale: { axisPressedMouseMove: { time: true, price: true }, axisDoubleClickReset: { time: true, price: true }, mouseWheel: true, pinch: true }, kineticScroll: { mouse: false, touch: true }, trackingMode: { exitMode: 1 } };
}
class x1 {
  constructor(t, r, n) {
    this.Yp = t, this.bM = r, this.SM = n ?? 0;
  }
  applyOptions(t) {
    this.Yp.Qt().md(this.bM, t, this.SM);
  }
  options() {
    return this.Ki().N();
  }
  width() {
    return go(this.bM) ? this.Yp.dg(this.bM) : 0;
  }
  setVisibleRange(t) {
    this.setAutoScale(false), this.Ki().$o(new $t(t.from, t.to));
  }
  getVisibleRange() {
    let t, r, n = this.Ki().er();
    if (n === null) return null;
    if (this.Ki().io()) {
      const i = this.Ki().m_(), s = m1(i);
      n = hn(n, this.Ki().no()), t = Number((Math.round(n.Ze() / i) * i).toFixed(s)), r = Number((Math.round(n.Ge() / i) * i).toFixed(s));
    } else t = n.Ze(), r = n.Ge();
    return { from: t, to: r };
  }
  setAutoScale(t) {
    this.applyOptions({ autoScale: t });
  }
  Ki() {
    return C(this.Yp.Qt().wd(this.bM, this.SM)).Ft;
  }
}
class RB {
  constructor(t, r, n, i) {
    this.Yp = t, this.yt = n, this.xM = r, this.CM = i;
  }
  getHeight() {
    return this.yt.$t();
  }
  setHeight(t) {
    const r = this.Yp.Qt(), n = r.Gd(this.yt);
    r.xd(n, t);
  }
  getStretchFactor() {
    return this.yt.E_();
  }
  setStretchFactor(t) {
    this.yt.A_(t), this.Yp.Qt().Ca();
  }
  paneIndex() {
    return this.Yp.Qt().Gd(this.yt);
  }
  moveTo(t) {
    const r = this.paneIndex();
    r !== t && (Mt(t >= 0 && t < this.Yp.Zp().length, "Invalid pane index"), this.Yp.Qt().yd(r, t));
  }
  getSeries() {
    return this.yt.F_().map(((t) => this.xM(t))) ?? [];
  }
  getHTMLElement() {
    const t = this.Yp.Zp();
    return t && t.length !== 0 && t[this.paneIndex()] ? t[this.paneIndex()].iv() : null;
  }
  attachPrimitive(t) {
    this.yt.nl(t), t.attached && t.attached({ chart: this.CM, requestUpdate: () => this.yt.Qt().Ca() });
  }
  detachPrimitive(t) {
    this.yt.el(t);
  }
  priceScale(t) {
    if (this.yt.V_(t) === null) throw new Error(`Cannot find price scale with id: ${t}`);
    return new x1(this.Yp, t, this.paneIndex());
  }
  setPreserveEmptyPane(t) {
    this.yt.O_(t);
  }
  preserveEmptyPane() {
    return this.yt.N_();
  }
  addCustomSeries(t, r = {}, n = 0) {
    return this.CM.addCustomSeries(t, r, n);
  }
  addSeries(t, r = {}) {
    return this.CM.addSeries(t, r, this.paneIndex());
  }
}
const $B = { color: "#FF0000", price: 0, lineStyle: 2, lineWidth: 1, lineVisible: true, axisLabelVisible: true, title: "", axisLabelColor: "", axisLabelTextColor: "" };
class Ng {
  constructor(t) {
    this.hr = t;
  }
  applyOptions(t) {
    this.hr.cr(t);
  }
  options() {
    return this.hr.N();
  }
  yM() {
    return this.hr;
  }
}
class zB {
  constructor(t, r, n, i, s, a) {
    this.kM = new lt(), this.ee = t, this.PM = r, this.TM = n, this.cu = s, this.CM = i, this.RM = a;
  }
  m() {
    this.kM.m();
  }
  priceFormatter() {
    return this.ee.Xa();
  }
  priceToCoordinate(t) {
    const r = this.ee.Lt();
    return r === null ? null : this.ee.Ft().Nt(t, r.Wt);
  }
  coordinateToPrice(t) {
    const r = this.ee.Lt();
    return r === null ? null : this.ee.Ft().Ds(t, r.Wt);
  }
  barsInLogicalRange(t) {
    if (t === null) return null;
    const r = new gn(new mn(t.from, t.to)).Ru(), n = this.ee.qs();
    if (n.Gi()) return null;
    const i = n.$s(r.Aa(), 1), s = n.$s(r.bi(), -1), a = C(n.kh()), o = C(n.sn());
    if (i !== null && s !== null && i.js > s.js) return { barsBefore: t.from - a, barsAfter: o - t.to };
    const l = { barsBefore: i === null || i.js === a ? t.from - a : i.js - a, barsAfter: s === null || s.js === o ? o - t.to : o - s.js };
    return i !== null && s !== null && (l.from = i.Gr, l.to = s.Gr), l;
  }
  setData(t) {
    this.cu, this.ee.wh(), this.PM.DM(this.ee, t), this.IM("full");
  }
  update(t, r = false) {
    this.ee.wh(), this.PM.VM(this.ee, t, r), this.IM("update");
  }
  pop(t = 1) {
    const r = this.PM.BM(this.ee, t);
    r.length !== 0 && this.IM("update");
    const n = Ps(this.seriesType());
    return r.map(((i) => n(i)));
  }
  dataByIndex(t, r) {
    const n = this.ee.qs().$s(t, r);
    return n === null ? null : Ps(this.seriesType())(n);
  }
  data() {
    const t = Ps(this.seriesType());
    return this.ee.qs().Dh().map(((r) => t(r)));
  }
  subscribeDataChanged(t) {
    this.kM.i(t);
  }
  unsubscribeDataChanged(t) {
    this.kM._(t);
  }
  applyOptions(t) {
    this.ee.cr(t);
  }
  options() {
    return Be(this.ee.N());
  }
  priceScale() {
    return this.TM.priceScale(this.ee.Ft().ol(), this.getPane().paneIndex());
  }
  createPriceLine(t) {
    const r = Qt(Be($B), t), n = this.ee.Da(r);
    return new Ng(n);
  }
  removePriceLine(t) {
    this.ee.Ia(t.yM());
  }
  priceLines() {
    return this.ee.Va().map(((t) => new Ng(t)));
  }
  seriesType() {
    return this.ee.wh();
  }
  lastValueData(t) {
    const r = this.ee.Ve(t);
    return r.Be ? { noData: true } : { noData: false, price: r.gt, color: r.R };
  }
  attachPrimitive(t) {
    this.ee.nl(t), t.attached && t.attached({ chart: this.CM, series: this, requestUpdate: () => this.ee.Qt().Ca(), horzScaleBehavior: this.cu });
  }
  detachPrimitive(t) {
    this.ee.el(t), t.detached && t.detached(), this.ee.Qt().Ca();
  }
  getPane() {
    const t = this.ee, r = C(this.ee.Qt().Kn(t));
    return this.RM(r);
  }
  moveToPane(t) {
    this.ee.Qt().jd(this.ee, t);
  }
  seriesOrder() {
    const t = this.ee.Qt().Kn(this.ee);
    return t === null ? -1 : t.F_().indexOf(this.ee);
  }
  setSeriesOrder(t) {
    const r = this.ee.Qt().Kn(this.ee);
    r !== null && r.su(this.ee, t);
  }
  IM(t) {
    this.kM.v() && this.kM.p(t);
  }
}
class BB {
  constructor(t, r, n) {
    this.EM = new lt(), this.Nu = new lt(), this.xw = new lt(), this.ns = t, this.Jh = t.Et(), this.tg = r, this.Jh.Lc().i(this.AM.bind(this)), this.Jh.zc().i(this.LM.bind(this)), this.tg.Dw().i(this.zM.bind(this)), this.cu = n;
  }
  m() {
    this.Jh.Lc().u(this), this.Jh.zc().u(this), this.tg.Dw().u(this), this.EM.m(), this.Nu.m(), this.xw.m();
  }
  scrollPosition() {
    return this.Jh.Cc();
  }
  scrollToPosition(t, r) {
    r ? this.Jh.Bc(t, 1e3) : this.ns.Mn(t);
  }
  scrollToRealTime() {
    this.Jh.Vc();
  }
  getVisibleRange() {
    const t = this.Jh.lc();
    return t === null ? null : { from: t.from.originalTime, to: t.to.originalTime };
  }
  setVisibleRange(t) {
    const r = { from: this.cu.convertHorzItemToInternal(t.from), to: this.cu.convertHorzItemToInternal(t.to) }, n = this.Jh.cc(r);
    this.ns.$d(n);
  }
  getVisibleLogicalRange() {
    const t = this.Jh.ac();
    return t === null ? null : { from: t.Aa(), to: t.bi() };
  }
  setVisibleLogicalRange(t) {
    Mt(t.from <= t.to, "The from index cannot be after the to index."), this.ns.$d(t);
  }
  resetTimeScale() {
    this.ns.wn();
  }
  fitContent() {
    this.ns.Fc();
  }
  logicalToCoordinate(t) {
    const r = this.ns.Et();
    return r.Gi() ? null : r.qt(t);
  }
  coordinateToLogical(t) {
    return this.Jh.Gi() ? null : this.Jh.wc(t);
  }
  timeToIndex(t, r) {
    const n = this.cu.convertHorzItemToInternal(t);
    return this.Jh.ec(n, r);
  }
  timeToCoordinate(t) {
    const r = this.timeToIndex(t, false);
    return r === null ? null : this.Jh.qt(r);
  }
  coordinateToTime(t) {
    const r = this.ns.Et(), n = r.wc(t), i = r.es(n);
    return i === null ? null : i.originalTime;
  }
  width() {
    return this.tg.sv().width;
  }
  height() {
    return this.tg.sv().height;
  }
  subscribeVisibleTimeRangeChange(t) {
    this.EM.i(t);
  }
  unsubscribeVisibleTimeRangeChange(t) {
    this.EM._(t);
  }
  subscribeVisibleLogicalRangeChange(t) {
    this.Nu.i(t);
  }
  unsubscribeVisibleLogicalRangeChange(t) {
    this.Nu._(t);
  }
  subscribeSizeChange(t) {
    this.xw.i(t);
  }
  unsubscribeSizeChange(t) {
    this.xw._(t);
  }
  applyOptions(t) {
    this.Jh.cr(t);
  }
  options() {
    return { ...Be(this.Jh.N()), barSpacing: this.Jh.ul() };
  }
  AM() {
    this.EM.v() && this.EM.p(this.getVisibleRange());
  }
  LM() {
    this.Nu.v() && this.Nu.p(this.getVisibleLogicalRange());
  }
  zM(t) {
    this.xw.p(t.width, t.height);
  }
}
function Dg(e3) {
  return (function(t) {
    if (ls(t.handleScale)) {
      const n = t.handleScale;
      t.handleScale = { axisDoubleClickReset: { time: n, price: n }, axisPressedMouseMove: { time: n, price: n }, mouseWheel: n, pinch: n };
    } else if (t.handleScale !== void 0) {
      const { axisPressedMouseMove: n, axisDoubleClickReset: i } = t.handleScale;
      ls(n) && (t.handleScale.axisPressedMouseMove = { time: n, price: n }), ls(i) && (t.handleScale.axisDoubleClickReset = { time: i, price: i });
    }
    const r = t.handleScroll;
    ls(r) && (t.handleScroll = { horzTouchDrag: r, vertTouchDrag: r, mouseWheel: r, pressedMouseMove: r });
  })(e3), e3;
}
class FB {
  constructor(t, r, n) {
    this.OM = /* @__PURE__ */ new Map(), this.NM = /* @__PURE__ */ new Map(), this.FM = new lt(), this.WM = new lt(), this.HM = new lt(), this.Xc = /* @__PURE__ */ new WeakMap(), this.UM = new wB(r);
    const i = n === void 0 ? Be(Tg()) : Qt(Be(Tg()), Dg(n));
    this.$M = r, this.Yp = new fB(t, i, r), this.Yp.nw().i(((a) => {
      this.FM.v() && this.FM.p(this.qM(a()));
    }), this), this.Yp.ew().i(((a) => {
      this.WM.v() && this.WM.p(this.qM(a()));
    }), this), this.Yp.Md().i(((a) => {
      this.HM.v() && this.HM.p(this.qM(a()));
    }), this);
    const s = this.Yp.Qt();
    this.jM = new BB(s, this.Yp.rg(), this.$M);
  }
  remove() {
    this.Yp.nw().u(this), this.Yp.ew().u(this), this.Yp.Md().u(this), this.jM.m(), this.Yp.m(), this.OM.clear(), this.NM.clear(), this.FM.m(), this.WM.m(), this.HM.m(), this.UM.m();
  }
  resize(t, r, n) {
    this.autoSizeActive() || this.Yp.sg(t, r, n);
  }
  addCustomSeries(t, r = {}, n = 0) {
    const i = ((s) => ({ type: "Custom", isBuiltIn: false, defaultOptions: { ...MB, ...s.defaultOptions() }, YM: EB, KM: s }))(or(t));
    return this.ZM(i, r, n);
  }
  addSeries(t, r = {}, n = 0) {
    return this.ZM(t, r, n);
  }
  removeSeries(t) {
    const r = Yt(this.OM.get(t)), n = this.UM.Hd(r);
    this.Yp.Qt().Hd(r), this.GM(n), this.OM.delete(t), this.NM.delete(r);
  }
  DM(t, r) {
    this.GM(this.UM.Ug(t, r));
  }
  VM(t, r, n) {
    this.GM(this.UM.Zg(t, r, n));
  }
  BM(t, r) {
    const [n, i] = this.UM.Jg(t, r);
    return n.length !== 0 && this.GM(i), n;
  }
  subscribeClick(t) {
    this.FM.i(t);
  }
  unsubscribeClick(t) {
    this.FM._(t);
  }
  subscribeCrosshairMove(t) {
    this.HM.i(t);
  }
  unsubscribeCrosshairMove(t) {
    this.HM._(t);
  }
  subscribeDblClick(t) {
    this.WM.i(t);
  }
  unsubscribeDblClick(t) {
    this.WM._(t);
  }
  priceScale(t, r = 0) {
    return new x1(this.Yp, t, r);
  }
  timeScale() {
    return this.jM;
  }
  applyOptions(t) {
    this.Yp.cr(Dg(t));
  }
  options() {
    return this.Yp.N();
  }
  takeScreenshot(t = false, r = false) {
    let n, i;
    try {
      r || (n = this.Yp.Qt().N().crosshair.mode, this.Yp.cr({ crosshair: { mode: 2 } })), i = this.Yp.ug(t);
    } finally {
      r || n === void 0 || this.Yp.Qt().cr({ crosshair: { mode: n } });
    }
    return i;
  }
  addPane(t = false) {
    const r = this.Yp.Qt().Xd();
    return r.O_(t), this.XM(r);
  }
  removePane(t) {
    this.Yp.Qt().Sd(t);
  }
  swapPanes(t, r) {
    this.Yp.Qt().Cd(t, r);
  }
  autoSizeActive() {
    return this.Yp.vg();
  }
  chartElement() {
    return this.Yp.hv();
  }
  panes() {
    return this.Yp.Qt().Xs().map(((t) => this.XM(t)));
  }
  paneSize(t = 0) {
    const r = this.Yp.gg(t);
    return { height: r.height, width: r.width };
  }
  setCrosshairPosition(t, r, n) {
    const i = this.OM.get(n);
    if (i === void 0) return;
    const s = this.Yp.Qt().Kn(i);
    s !== null && this.Yp.Qt().Ld(t, r, s);
  }
  clearCrosshairPosition() {
    this.Yp.Qt().zd(true);
  }
  horzBehaviour() {
    return this.$M;
  }
  ZM(t, r = {}, n = 0) {
    Mt(t.YM !== void 0), (function(l) {
      if (l === void 0 || l.type === "custom") return;
      const u = l;
      u.minMove !== void 0 && u.precision === void 0 && (u.precision = m1(u.minMove));
    })(r.priceFormat), t.type === "Candlestick" && (function(l) {
      l.borderColor !== void 0 && (l.borderUpColor = l.borderColor, l.borderDownColor = l.borderColor), l.wickColor !== void 0 && (l.wickUpColor = l.wickColor, l.wickDownColor = l.wickColor);
    })(r);
    const i = Qt(Be(t1), Be(t.defaultOptions), r), s = t.YM, a = new bo(this.Yp.Qt(), t.type, i, s, t.KM);
    this.Yp.Qt().Fd(a, n);
    const o = new zB(a, this, this, this, this.$M, ((l) => this.XM(l)));
    return this.OM.set(o, a), this.NM.set(a, o), o;
  }
  GM(t) {
    const r = this.Yp.Qt();
    r.Od(t.Et.vc, t.Et.sM, t.Et.nM), t.F_.forEach(((n, i) => i.ht(n.le, n.iM))), r.Et().Ju(), r.Sc();
  }
  JM(t) {
    return Yt(this.NM.get(t));
  }
  qM(t) {
    const r = /* @__PURE__ */ new Map();
    t.Vg.forEach(((i, s) => {
      const a = s.wh(), o = Ps(a)(i);
      if (a !== "Custom") Mt(vB(o));
      else {
        const l = s.hl();
        Mt(!l || l(o) === false);
      }
      r.set(this.JM(s), o);
    }));
    const n = t.Ig !== void 0 && this.NM.has(t.Ig) ? this.JM(t.Ig) : void 0;
    return { time: t.Gr, logical: t.js, point: t.Rg, paneIndex: t.Dg, hoveredSeries: n, hoveredObjectId: t.Bg, seriesData: r, sourceEvent: t.Eg };
  }
  XM(t) {
    let r = this.Xc.get(t);
    return r || (r = new RB(this.Yp, ((n) => this.JM(n)), t, this), this.Xc.set(t, r)), r;
  }
}
function WB(e3) {
  if (qi(e3)) {
    const t = document.getElementById(e3);
    return Mt(t !== null, `Cannot find element in DOM with id=${e3}`), t;
  }
  return e3;
}
function KB(e3, t, r) {
  const n = WB(e3), i = new FB(n, t, r);
  return t.setOptions(i.options()), i;
}
function qF(e3, t) {
  return KB(e3, new yg(), yg.pf(t));
}
class Qh extends Jh {
  constructor(t, r) {
    super(t, r, true);
  }
  mM(t, r, n) {
    r.mc(this.aM, _i(this.lM)), t.Yo(this.aM, n, _i(this.lM));
  }
  QM(t, r) {
    return { wt: t, gt: r, _t: NaN, ut: NaN };
  }
  pM() {
    const t = this.ee.ga();
    this.aM = this.ee.Na().Dh().map(((r) => {
      let n;
      if ((r.jr ?? 1) > 1) {
        const i = r.Wt[1], s = r.Wt[2], a = r.Wt[3];
        n = Math.abs(i - a) > Math.abs(s - a) ? i : s;
      } else n = r.Wt[3];
      return this.tb(r.js, n, t);
    }));
  }
}
function P1(e3, t, r, n, i, s, a) {
  if (t.length === 0 || n.from >= t.length || n.to <= 0) return;
  const { context: o, horizontalPixelRatio: l, verticalPixelRatio: u } = e3, c = t[n.from];
  let h = s(e3, c), f = c;
  if (n.to - n.from < 2) {
    const d = i / 2;
    o.beginPath();
    const v = { _t: c._t - d, ut: c.ut }, p = { _t: c._t + d, ut: c.ut };
    o.moveTo(v._t * l, v.ut * u), o.lineTo(p._t * l, p.ut * u), a(e3, h, v, p);
  } else {
    const d = (p, m) => {
      a(e3, h, f, m), o.beginPath(), h = p, f = m;
    };
    let v = f;
    o.beginPath(), o.moveTo(c._t * l, c.ut * u);
    for (let p = n.from + 1; p < n.to; ++p) {
      v = t[p];
      const m = s(e3, v);
      switch (r) {
        case 0:
          o.lineTo(v._t * l, v.ut * u);
          break;
        case 1:
          o.lineTo(v._t * l, t[p - 1].ut * u), m !== h && (d(m, v), o.lineTo(v._t * l, t[p - 1].ut * u)), o.lineTo(v._t * l, v.ut * u);
          break;
        case 2: {
          const [y, b] = UB(t, p - 1, p);
          o.bezierCurveTo(y._t * l, y.ut * u, b._t * l, b.ut * u, v._t * l, v.ut * u);
          break;
        }
      }
      r !== 1 && m !== h && (d(m, v), o.moveTo(v._t * l, v.ut * u));
    }
    (f !== v || f === v && r === 1) && a(e3, h, f, v);
  }
}
const Lg = 6;
function vu(e3, t) {
  return { _t: e3._t - t._t, ut: e3.ut - t.ut };
}
function Rg(e3, t) {
  return { _t: e3._t / t, ut: e3.ut / t };
}
function UB(e3, t, r) {
  const n = Math.max(0, t - 1), i = Math.min(e3.length - 1, r + 1);
  var s, a;
  return [(s = e3[t], a = Rg(vu(e3[r], e3[n]), Lg), { _t: s._t + a._t, ut: s.ut + a.ut }), vu(e3[r], Rg(vu(e3[i], e3[t]), Lg))];
}
function qB(e3, t) {
  const r = e3.context;
  r.strokeStyle = t, r.stroke();
}
class VB extends tr {
  constructor() {
    super(...arguments), this.rt = null;
  }
  ht(t) {
    this.rt = t;
  }
  et(t) {
    if (this.rt === null) return;
    const { ot: r, lt: n, ib: i, sb: s, ct: a, Zt: o, nb: l } = this.rt;
    if (n === null) return;
    const u = t.context;
    u.lineCap = "butt", u.lineWidth = a * t.verticalPixelRatio, hr(u, o), u.lineJoin = "round";
    const c = this.eb.bind(this);
    s !== void 0 && P1(t, r, s, n, i, c, qB), l && (function(h, f, d, v, p) {
      if (v.to - v.from <= 0) return;
      const { horizontalPixelRatio: m, verticalPixelRatio: y, context: b } = h;
      let w = null;
      const x = Math.max(1, Math.floor(m)) % 2 / 2, P = d * y + x;
      for (let S = v.to - 1; S >= v.from; --S) {
        const _ = f[S];
        if (_) {
          const M = p(h, _);
          M !== w && (b.beginPath(), w !== null && b.fill(), b.fillStyle = M, w = M);
          const A = Math.round(_._t * m) + x, j = _.ut * y;
          b.moveTo(A, j), b.arc(A, j, P, 0, 2 * Math.PI);
        }
      }
      b.fill();
    })(t, r, l, n, c);
  }
}
class S1 extends VB {
  eb(t, r) {
    return r.vt;
  }
}
class YB extends Qh {
  constructor() {
    super(...arguments), this.cM = new S1();
  }
  tb(t, r, n) {
    return { ...this.QM(t, r), ...n.gh(t) };
  }
  wM() {
    const t = this.ee.N(), r = { ot: this.aM, Zt: t.lineStyle, sb: t.lineVisible ? t.lineType : void 0, ct: t.lineWidth, nb: t.pointMarkersVisible ? t.pointMarkersRadius || t.lineWidth / 2 + 2 : void 0, lt: this.lM, ib: this.re.Et().ul() };
    this.cM.ht(r);
  }
}
const VF = { type: "Line", isBuiltIn: true, defaultOptions: { color: "#2196f3", lineStyle: 0, lineWidth: 3, lineType: 0, lineVisible: true, crosshairMarkerVisible: true, crosshairMarkerRadius: 4, crosshairMarkerBorderColor: "", crosshairMarkerBorderWidth: 2, crosshairMarkerBackgroundColor: "", lastPriceAnimation: 0, pointMarkersVisible: false }, YM: (e3, t) => new YB(e3, t) };
function HB(e3, t, r, n, i) {
  const { context: s, horizontalPixelRatio: a, verticalPixelRatio: o } = t;
  s.lineTo(i._t * a, e3 * o), s.lineTo(n._t * a, e3 * o), s.closePath(), s.fillStyle = r, s.fill();
}
class GB extends tr {
  constructor() {
    super(...arguments), this.rt = null;
  }
  ht(t) {
    this.rt = t;
  }
  et(t) {
    if (this.rt === null) return;
    const { ot: r, lt: n, ib: i, ct: s, Zt: a, sb: o } = this.rt, l = this.rt.ub ?? (this.rt.cb ? 0 : t.mediaSize.height);
    if (n === null) return;
    const u = t.context;
    u.lineCap = "butt", u.lineJoin = "round", u.lineWidth = s, hr(u, a), u.lineWidth = 1, P1(t, r, o, n, i, this.fb.bind(this), HB.bind(null, l));
  }
}
class XB {
  pb(t, r) {
    const n = this.mb, { wb: i, gb: s, Mb: a, bb: o, ub: l, Sb: u, xb: c } = r;
    if (this.Cb === void 0 || n === void 0 || n.wb !== i || n.gb !== s || n.Mb !== a || n.bb !== o || n.ub !== l || n.Sb !== u || n.xb !== c) {
      const { verticalPixelRatio: h } = t, f = l || u > 0 ? h : 1, d = u * f, v = c === t.bitmapSize.height ? c : c * f, p = (l ?? 0) * f, m = t.context.createLinearGradient(0, d, 0, v);
      if (m.addColorStop(0, i), l != null) {
        const y = pn((p - d) / (v - d), 0, 1);
        m.addColorStop(y, s), m.addColorStop(y, a);
      }
      m.addColorStop(1, o), this.Cb = m, this.mb = r;
    }
    return this.Cb;
  }
}
class JB extends GB {
  constructor() {
    super(...arguments), this.yb = new XB();
  }
  fb(t, r) {
    var _a3;
    return this.yb.pb(t, { wb: r.eh, gb: "", Mb: "", bb: r.rh, Sb: ((_a3 = this.rt) == null ? void 0 : _a3.Sb) ?? 0, xb: t.bitmapSize.height });
  }
}
class ZB extends Qh {
  constructor(t, r) {
    super(t, r), this.cM = new n1(), this.Rb = new JB(), this.Db = new S1(), this.cM.st([this.Rb, this.Db]);
  }
  tb(t, r, n) {
    return { ...this.QM(t, r), ...n.gh(t) };
  }
  wM() {
    const t = this.ee.N();
    if (this.lM === null || this.aM.length === 0) return;
    let r;
    if (t.relativeGradient) {
      r = this.aM[this.lM.from].ut;
      for (let n = this.lM.from; n < this.lM.to; n++) {
        const i = this.aM[n];
        i.ut < r && (r = i.ut);
      }
    }
    this.Rb.ht({ sb: t.lineType, ot: this.aM, Zt: t.lineStyle, ct: t.lineWidth, ub: null, Sb: r, cb: t.invertFilledArea, lt: this.lM, ib: this.re.Et().ul() }), this.Db.ht({ sb: t.lineVisible ? t.lineType : void 0, ot: this.aM, Zt: t.lineStyle, ct: t.lineWidth, lt: this.lM, ib: this.re.Et().ul(), nb: t.pointMarkersVisible ? t.pointMarkersRadius || t.lineWidth / 2 + 2 : void 0 });
  }
}
const YF = { type: "Area", isBuiltIn: true, defaultOptions: { topColor: "rgba( 46, 220, 135, 0.4)", bottomColor: "rgba( 40, 221, 100, 0)", invertFilledArea: false, relativeGradient: false, lineColor: "#33D778", lineStyle: 0, lineWidth: 3, lineType: 0, lineVisible: true, crosshairMarkerVisible: true, crosshairMarkerRadius: 4, crosshairMarkerBorderColor: "", crosshairMarkerBorderWidth: 2, crosshairMarkerBackgroundColor: "", lastPriceAnimation: 0, pointMarkersVisible: false }, YM: (e3, t) => new ZB(e3, t) };
class QB extends Jh {
  constructor(t, r) {
    super(t, r, false);
  }
  mM(t, r, n) {
    r.mc(this.aM, _i(this.lM)), t.Zo(this.aM, n, _i(this.lM));
  }
  Lb(t, r, n) {
    return { wt: t, Hr: r.Wt[0], Ur: r.Wt[1], $r: r.Wt[2], qr: r.Wt[3], _t: NaN, Go: NaN, Xo: NaN, Jo: NaN, Qo: NaN };
  }
  pM() {
    const t = this.ee.ga();
    this.aM = this.ee.Na().Dh().map(((r) => this.tb(r.js, r, t)));
  }
}
class tF extends tr {
  constructor() {
    super(...arguments), this.jt = null, this.Ib = 0;
  }
  ht(t) {
    this.jt = t;
  }
  et(t) {
    if (this.jt === null || this.jt.qs.length === 0 || this.jt.lt === null) return;
    const { horizontalPixelRatio: r } = t;
    this.Ib = (function(s, a) {
      if (s >= 2.5 && s <= 4) return Math.floor(3 * a);
      const o = 1 - 0.2 * Math.atan(Math.max(4, s) - 4) / (0.5 * Math.PI), l = Math.floor(s * o * a), u = Math.floor(s * a), c = Math.min(l, u);
      return Math.max(Math.floor(a), c);
    })(this.jt.ul, r), this.Ib >= 2 && Math.floor(r) % 2 != this.Ib % 2 && this.Ib--;
    const n = this.jt.qs;
    this.jt.zb && this.Ob(t, n, this.jt.lt), this.jt.Mi && this.gm(t, n, this.jt.lt);
    const i = this.Nb(r);
    (!this.jt.Mi || this.Ib > 2 * i) && this.Fb(t, n, this.jt.lt);
  }
  Ob(t, r, n) {
    if (this.jt === null) return;
    const { context: i, horizontalPixelRatio: s, verticalPixelRatio: a } = t;
    let o = "", l = Math.min(Math.floor(s), Math.floor(this.jt.ul * s));
    l = Math.max(Math.floor(s), Math.min(l, this.Ib));
    const u = Math.floor(0.5 * l);
    let c = null;
    for (let h = n.from; h < n.to; h++) {
      const f = r[h];
      f.sh !== o && (i.fillStyle = f.sh, o = f.sh);
      const d = Math.round(Math.min(f.Go, f.Qo) * a), v = Math.round(Math.max(f.Go, f.Qo) * a), p = Math.round(f.Xo * a), m = Math.round(f.Jo * a);
      let y = Math.round(s * f._t) - u;
      const b = y + l - 1;
      c !== null && (y = Math.max(c + 1, y), y = Math.min(y, b));
      const w = b - y + 1;
      i.fillRect(y, p, w, d - p), i.fillRect(y, v + 1, w, m - v), c = b;
    }
  }
  Nb(t) {
    let r = Math.floor(1 * t);
    this.Ib <= 2 * r && (r = Math.floor(0.5 * (this.Ib - 1)));
    const n = Math.max(Math.floor(t), r);
    return this.Ib <= 2 * n ? Math.max(Math.floor(t), Math.floor(1 * t)) : n;
  }
  gm(t, r, n) {
    if (this.jt === null) return;
    const { context: i, horizontalPixelRatio: s, verticalPixelRatio: a } = t;
    let o = "";
    const l = this.Nb(s);
    let u = null;
    for (let c = n.from; c < n.to; c++) {
      const h = r[c];
      h.ih !== o && (i.fillStyle = h.ih, o = h.ih);
      let f = Math.round(h._t * s) - Math.floor(0.5 * this.Ib);
      const d = f + this.Ib - 1, v = Math.round(Math.min(h.Go, h.Qo) * a), p = Math.round(Math.max(h.Go, h.Qo) * a);
      if (u !== null && (f = Math.max(u + 1, f), f = Math.min(f, d)), this.jt.ul * s > 2 * l) tz(i, f, v, d - f + 1, p - v + 1, l);
      else {
        const m = d - f + 1;
        i.fillRect(f, v, m, p - v + 1);
      }
      u = d;
    }
  }
  Fb(t, r, n) {
    if (this.jt === null) return;
    const { context: i, horizontalPixelRatio: s, verticalPixelRatio: a } = t;
    let o = "";
    const l = this.Nb(s);
    for (let u = n.from; u < n.to; u++) {
      const c = r[u];
      let h = Math.round(Math.min(c.Go, c.Qo) * a), f = Math.round(Math.max(c.Go, c.Qo) * a), d = Math.round(c._t * s) - Math.floor(0.5 * this.Ib), v = d + this.Ib - 1;
      if (c.th !== o) {
        const p = c.th;
        i.fillStyle = p, o = p;
      }
      this.jt.Mi && (d += l, h += l, v -= l, f -= l), h > f || i.fillRect(d, h, v - d + 1, f - h + 1);
    }
  }
}
class eF extends QB {
  constructor() {
    super(...arguments), this.cM = new tF();
  }
  tb(t, r, n) {
    return { ...this.Lb(t, r, n), ...n.gh(t) };
  }
  wM() {
    const t = this.ee.N();
    this.cM.ht({ qs: this.aM, ul: this.re.Et().ul(), zb: t.wickVisible, Mi: t.borderVisible, lt: this.lM });
  }
}
const HF = { type: "Candlestick", isBuiltIn: true, defaultOptions: { upColor: "#26a69a", downColor: "#ef5350", wickVisible: true, borderVisible: true, borderColor: "#378658", borderUpColor: "#26a69a", borderDownColor: "#ef5350", wickColor: "#737375", wickUpColor: "#26a69a", wickDownColor: "#ef5350" }, YM: (e3, t) => new eF(e3, t) };
class rF extends tr {
  constructor() {
    super(...arguments), this.jt = null, this.Wb = [];
  }
  ht(t) {
    this.jt = t, this.Wb = [];
  }
  et({ context: t, horizontalPixelRatio: r, verticalPixelRatio: n }) {
    if (this.jt === null || this.jt.ot.length === 0 || this.jt.lt === null) return;
    this.Wb.length || this.Hb(r);
    const i = Math.max(1, Math.floor(n)), s = Math.round(this.jt.Ub * n) - Math.floor(i / 2), a = s + i;
    for (let o = this.jt.lt.from; o < this.jt.lt.to; o++) {
      const l = this.jt.ot[o], u = this.Wb[o - this.jt.lt.from], c = Math.round(l.ut * n);
      let h, f;
      t.fillStyle = l.th, c <= s ? (h = c, f = a) : (h = s, f = c - Math.floor(i / 2) + i), t.fillRect(u.Aa, h, u.bi - u.Aa + 1, f - h);
    }
  }
  Hb(t) {
    if (this.jt === null || this.jt.ot.length === 0 || this.jt.lt === null) return void (this.Wb = []);
    const r = Math.ceil(this.jt.ul * t) <= 1 ? 0 : Math.max(1, Math.floor(t)), n = Math.round(this.jt.ul * t) - r;
    this.Wb = new Array(this.jt.lt.to - this.jt.lt.from);
    for (let s = this.jt.lt.from; s < this.jt.lt.to; s++) {
      const a = this.jt.ot[s], o = Math.round(a._t * t);
      let l, u;
      if (n % 2) {
        const c = (n - 1) / 2;
        l = o - c, u = o + c;
      } else {
        const c = n / 2;
        l = o - c, u = o + c - 1;
      }
      this.Wb[s - this.jt.lt.from] = { Aa: l, bi: u, $b: o, oe: a._t * t, wt: a.wt };
    }
    for (let s = this.jt.lt.from + 1; s < this.jt.lt.to; s++) {
      const a = this.Wb[s - this.jt.lt.from], o = this.Wb[s - this.jt.lt.from - 1];
      a.wt === o.wt + 1 && a.Aa - o.bi !== r + 1 && (o.$b > o.oe ? o.bi = a.Aa - r - 1 : a.Aa = o.bi + r + 1);
    }
    let i = Math.ceil(this.jt.ul * t);
    for (let s = this.jt.lt.from; s < this.jt.lt.to; s++) {
      const a = this.Wb[s - this.jt.lt.from];
      a.bi < a.Aa && (a.bi = a.Aa);
      const o = a.bi - a.Aa + 1;
      i = Math.min(o, i);
    }
    if (r > 0 && i < 4) for (let s = this.jt.lt.from; s < this.jt.lt.to; s++) {
      const a = this.Wb[s - this.jt.lt.from];
      a.bi - a.Aa + 1 > i && (a.$b > a.oe ? a.bi -= 1 : a.Aa += 1);
    }
  }
}
class nF extends Qh {
  constructor() {
    super(...arguments), this.cM = new rF();
  }
  tb(t, r, n) {
    return { ...this.QM(t, r), ...n.gh(t) };
  }
  wM() {
    const t = { ot: this.aM, ul: this.re.Et().ul(), lt: this.lM, Ub: this.ee.Ft().Nt(this.ee.N().base, C(this.ee.Lt()).Wt) };
    this.cM.ht(t);
  }
}
const GF = { type: "Histogram", isBuiltIn: true, defaultOptions: { color: "#26a69a", base: 0 }, YM: (e3, t) => new nF(e3, t) };
class iF {
  constructor(t, r) {
    this.ee = t, this.Zh = r, this.jb();
  }
  detach() {
    this.ee.detachPrimitive(this.Zh);
  }
  getSeries() {
    return this.ee;
  }
  applyOptions(t) {
    this.Zh && this.Zh.cr && this.Zh.cr(t);
  }
  jb() {
    this.ee.attachPrimitive(this.Zh);
  }
}
const sF = { autoScale: true, zOrder: "normal" };
function si(e3, t) {
  return Yh(Math.min(Math.max(e3, 12), 30) * t);
}
function An(e3, t) {
  switch (e3) {
    case "arrowDown":
    case "arrowUp":
      return si(t, 1);
    case "circle":
      return si(t, 0.8);
    case "square":
      return si(t, 0.7);
  }
}
function _1(e3) {
  return (function(t) {
    const r = Math.ceil(t);
    return r % 2 != 0 ? r - 1 : r;
  })(si(e3, 1));
}
function O1(e3) {
  return Math.max(si(e3, 0.1), 3);
}
function $g(e3, t, r) {
  return t ? e3 : r ? Math.ceil(e3 / 2) : 0;
}
function zg(e3, t, r, n) {
  const i = (An("arrowUp", n) - 1) / 2 * r.pS, s = (Yh(n / 2) - 1) / 2 * r.pS;
  t.beginPath(), e3 ? (t.moveTo(r._t - i, r.ut), t.lineTo(r._t, r.ut - i), t.lineTo(r._t + i, r.ut), t.lineTo(r._t + s, r.ut), t.lineTo(r._t + s, r.ut + i), t.lineTo(r._t - s, r.ut + i), t.lineTo(r._t - s, r.ut)) : (t.moveTo(r._t - i, r.ut), t.lineTo(r._t, r.ut + i), t.lineTo(r._t + i, r.ut), t.lineTo(r._t + s, r.ut), t.lineTo(r._t + s, r.ut - i), t.lineTo(r._t - s, r.ut - i), t.lineTo(r._t - s, r.ut)), t.fill();
}
function Bg(e3, t, r, n, i, s) {
  const a = (An("arrowUp", n) - 1) / 2, o = (Yh(n / 2) - 1) / 2;
  return i >= t - o - 2 && i <= t + o + 2 && s >= (e3 ? r : r - a) - 2 && s <= (e3 ? r + a : r) + 2 ? true : (() => {
    if (i < t - a - 3 || i > t + a + 3 || s < (e3 ? r - a - 3 : r) || s > (e3 ? r : r + a + 3)) return false;
    const l = Math.abs(i - t);
    return Math.abs(s - r) + 3 >= l / 2;
  })();
}
class aF {
  constructor() {
    this.jt = null, this.$n = new Mi(), this.F = -1, this.W = "", this.jv = "", this.vS = "normal";
  }
  ht(t) {
    this.jt = t;
  }
  qn(t, r, n) {
    this.F === t && this.W === r || (this.F = t, this.W = r, this.jv = Oi(t, r), this.$n.On()), this.vS = n;
  }
  Qn(t, r) {
    if (this.jt === null || this.jt.lt === null) return null;
    for (let n = this.jt.lt.from; n < this.jt.lt.to; n++) {
      const i = this.jt.ot[n];
      if (i && lF(i, t, r)) return { zOrder: "normal", externalId: i.te ?? "" };
    }
    return null;
  }
  draw(t) {
    this.vS !== "aboveSeries" && t.useBitmapCoordinateSpace(((r) => {
      this.et(r);
    }));
  }
  drawBackground(t) {
    this.vS === "aboveSeries" && t.useBitmapCoordinateSpace(((r) => {
      this.et(r);
    }));
  }
  et({ context: t, horizontalPixelRatio: r, verticalPixelRatio: n }) {
    if (this.jt !== null && this.jt.lt !== null) {
      t.textBaseline = "middle", t.font = this.jv;
      for (let i = this.jt.lt.from; i < this.jt.lt.to; i++) {
        const s = this.jt.ot[i];
        s.ri !== void 0 && (s.ri.ss = this.$n.Ii(t, s.ri.mS), s.ri.$t = this.F, s.ri._t = s._t - s.ri.ss / 2), oF(s, t, r, n);
      }
    }
  }
}
function oF(e3, t, r, n) {
  t.fillStyle = e3.R, e3.ri !== void 0 && (function(i, s, a, o, l, u) {
    i.save(), i.scale(l, u), i.fillText(s, a, o), i.restore();
  })(t, e3.ri.mS, e3.ri._t, e3.ri.ut, r, n), (function(i, s, a) {
    if (i.yh !== 0) {
      switch (i.wS) {
        case "arrowDown":
          return void zg(false, s, a, i.yh);
        case "arrowUp":
          return void zg(true, s, a, i.yh);
        case "circle":
          return void (function(o, l, u) {
            const c = (An("circle", u) - 1) / 2;
            o.beginPath(), o.arc(l._t, l.ut, c * l.pS, 0, 2 * Math.PI, false), o.fill();
          })(s, a, i.yh);
        case "square":
          return void (function(o, l, u) {
            const c = An("square", u), h = (c - 1) * l.pS / 2, f = l._t - h, d = l.ut - h;
            o.fillRect(f, d, c * l.pS, c * l.pS);
          })(s, a, i.yh);
      }
      i.wS;
    }
  })(e3, t, (function(i, s, a) {
    const o = Math.max(1, Math.floor(s)) % 2 / 2;
    return { _t: Math.round(i._t * s) + o, ut: i.ut * a, pS: s };
  })(e3, r, n));
}
function lF(e3, t, r) {
  return !(e3.ri === void 0 || !(function(n, i, s, a, o, l) {
    const u = a / 2;
    return o >= n && o <= n + s && l >= i - u && l <= i + u;
  })(e3.ri._t, e3.ri.ut, e3.ri.ss, e3.ri.$t, t, r)) || (function(n, i, s) {
    if (n.yh === 0) return false;
    switch (n.wS) {
      case "arrowDown":
        return Bg(true, n._t, n.ut, n.yh, i, s);
      case "arrowUp":
        return Bg(false, n._t, n.ut, n.yh, i, s);
      case "circle":
        return (function(a, o, l, u, c) {
          const h = 2 + An("circle", l) / 2, f = a - u, d = o - c;
          return Math.sqrt(f * f + d * d) <= h;
        })(n._t, n.ut, n.yh, i, s);
      case "square":
        return (function(a, o, l, u, c) {
          const h = An("square", l), f = (h - 1) / 2, d = a - f, v = o - f;
          return u >= d && u <= d + h && c >= v && c <= v + h;
        })(n._t, n.ut, n.yh, i, s);
    }
  })(e3, t, r);
}
function Fg(e3) {
  return e3 === "atPriceTop" || e3 === "atPriceBottom" || e3 === "atPriceMiddle";
}
function uF(e3, t, r, n, i, s, a, o) {
  const l = (function(v, p, m) {
    if (Fg(p.position) && p.price !== void 0) return p.price;
    if ("value" in (y = v) && typeof y.value == "number") return v.value;
    var y;
    if ((function(b) {
      return "open" in b && "high" in b && "low" in b && "close" in b;
    })(v)) {
      if (p.position === "inBar") return v.close;
      if (p.position === "aboveBar") return m ? v.low : v.high;
      if (p.position === "belowBar") return m ? v.high : v.low;
    }
  })(r, t, a.priceScale().options().invertScale);
  if (l === void 0) return;
  const u = Fg(t.position), c = o.timeScale(), h = Wr(t.size) ? Math.max(t.size, 0) : 1, f = _1(c.options().barSpacing) * h, d = f / 2;
  switch (e3.yh = f, t.position) {
    case "inBar":
    case "atPriceMiddle":
      return e3.ut = C(a.priceToCoordinate(l)), void (e3.ri !== void 0 && (e3.ri.ut = e3.ut + d + s + 0.6 * i));
    case "aboveBar":
    case "atPriceTop": {
      const v = u ? 0 : n.gS;
      return e3.ut = C(a.priceToCoordinate(l)) - d - v, e3.ri !== void 0 && (e3.ri.ut = e3.ut - d - 0.6 * i, n.gS += 1.2 * i), void (u || (n.gS += f + s));
    }
    case "belowBar":
    case "atPriceBottom": {
      const v = u ? 0 : n.MS;
      return e3.ut = C(a.priceToCoordinate(l)) + d + v, e3.ri !== void 0 && (e3.ri.ut = e3.ut + d + s + 0.6 * i, n.MS += 1.2 * i), void (u || (n.MS += f + s));
    }
  }
}
class cF {
  constructor(t, r, n) {
    this.bS = [], this.xt = true, this.SS = true, this.Xt = new aF(), this.ye = t, this.Lv = r, this.jt = { ot: [], lt: null }, this.Ps = n;
  }
  renderer() {
    if (!this.ye.options().visible) return null;
    this.xt && this.xS();
    const t = this.Lv.options().layout;
    return this.Xt.qn(t.fontSize, t.fontFamily, this.Ps.zOrder), this.Xt.ht(this.jt), this.Xt;
  }
  CS(t) {
    this.bS = t, this.kt("data");
  }
  kt(t) {
    this.xt = true, t === "data" && (this.SS = true);
  }
  yS(t) {
    this.xt = true, this.Ps = t;
  }
  zOrder() {
    return this.Ps.zOrder === "aboveSeries" ? "top" : this.Ps.zOrder;
  }
  xS() {
    const t = this.Lv.timeScale(), r = this.bS;
    this.SS && (this.jt.ot = r.map(((u) => ({ wt: u.time, _t: 0, ut: 0, yh: 0, wS: u.shape, R: u.color, te: u.id, kS: u.kS, ri: void 0 }))), this.SS = false);
    const n = this.Lv.options().layout;
    this.jt.lt = null;
    const i = t.getVisibleLogicalRange();
    if (i === null) return;
    const s = new mn(Math.floor(i.from), Math.ceil(i.to));
    if (this.ye.data()[0] === null || this.jt.ot.length === 0) return;
    let a = NaN;
    const o = O1(t.options().barSpacing), l = { gS: o, MS: o };
    this.jt.lt = b1(this.jt.ot, s, true);
    for (let u = this.jt.lt.from; u < this.jt.lt.to; u++) {
      const c = r[u];
      c.time !== a && (l.gS = o, l.MS = o, a = c.time);
      const h = this.jt.ot[u];
      h._t = C(t.logicalToCoordinate(c.time)), c.text !== void 0 && c.text.length > 0 && (h.ri = { mS: c.text, _t: 0, ut: 0, ss: 0, $t: 0 });
      const f = this.ye.dataByIndex(c.time, 0);
      f !== null && uF(h, c, f, l, n.fontSize, o, this.ye, this.Lv);
    }
    this.xt = false;
  }
}
function Wg(e3) {
  return { ...sF, ...e3 };
}
class hF {
  constructor(t) {
    this.$h = null, this.bS = [], this.PS = [], this.TS = null, this.ye = null, this.Lv = null, this.RS = true, this.DS = null, this.IS = null, this.VS = null, this.BS = true, this.Ps = Wg(t);
  }
  attached(t) {
    this.ES(), this.Lv = t.chart, this.ye = t.series, this.$h = new cF(this.ye, C(this.Lv), this.Ps), this.dS = t.requestUpdate, this.ye.subscribeDataChanged(((r) => this.IM(r))), this.BS = true, this.Jb();
  }
  Jb() {
    this.dS && this.dS();
  }
  detached() {
    this.ye && this.TS && this.ye.unsubscribeDataChanged(this.TS), this.Lv = null, this.ye = null, this.$h = null, this.TS = null;
  }
  CS(t) {
    this.BS = true, this.bS = t, this.ES(), this.RS = true, this.IS = null, this.Jb();
  }
  AS() {
    return this.bS;
  }
  paneViews() {
    return this.$h ? [this.$h] : [];
  }
  updateAllViews() {
    this.LS();
  }
  hitTest(t, r) {
    var _a3;
    return this.$h ? ((_a3 = this.$h.renderer()) == null ? void 0 : _a3.Qn(t, r)) ?? null : null;
  }
  autoscaleInfo(t, r) {
    if (this.Ps.autoScale && this.$h) {
      const n = this.zS();
      if (n) return { priceRange: null, margins: n };
    }
    return null;
  }
  cr(t) {
    this.Ps = Wg({ ...this.Ps, ...t }), this.Jb && this.Jb();
  }
  zS() {
    const t = C(this.Lv).timeScale().options().barSpacing;
    if (this.RS || t !== this.VS) {
      if (this.VS = t, this.bS.length > 0) {
        const r = O1(t), n = 1.5 * _1(t) + 2 * r, i = this.OS();
        this.DS = { above: $g(n, i.aboveBar, i.inBar), below: $g(n, i.belowBar, i.inBar) };
      } else this.DS = null;
      this.RS = false;
    }
    return this.DS;
  }
  OS() {
    return this.IS === null && (this.IS = this.bS.reduce(((t, r) => (t[r.position] || (t[r.position] = true), t)), { inBar: false, aboveBar: false, belowBar: false, atPriceTop: false, atPriceBottom: false, atPriceMiddle: false })), this.IS;
  }
  ES() {
    var _a3;
    if (!this.BS || !this.Lv || !this.ye) return;
    const t = this.Lv.timeScale(), r = (_a3 = this.ye) == null ? void 0 : _a3.data();
    if (t.getVisibleLogicalRange() == null || !this.ye || r.length === 0) return void (this.PS = []);
    const n = t.timeToIndex(C(r[0].time), true);
    this.PS = this.bS.map(((i, s) => {
      const a = t.timeToIndex(i.time, true), o = a < n ? 1 : -1, l = C(this.ye).dataByIndex(a, o), u = { time: t.timeToIndex(C(l).time, false), position: i.position, shape: i.shape, color: i.color, id: i.id, kS: s, text: i.text, size: i.size, price: i.price, Gr: i.time };
      if (i.position === "atPriceTop" || i.position === "atPriceBottom" || i.position === "atPriceMiddle") {
        if (i.price === void 0) throw new Error(`Price is required for position ${i.position}`);
        return { ...u, position: i.position, price: i.price };
      }
      return { ...u, position: i.position, price: i.price };
    })), this.BS = false;
  }
  LS(t) {
    this.$h && (this.ES(), this.$h.CS(this.PS), this.$h.yS(this.Ps), this.$h.kt(t));
  }
  IM(t) {
    this.BS = true, this.Jb();
  }
}
class fF extends iF {
  constructor(t, r, n) {
    super(t, r), n && this.setMarkers(n);
  }
  setMarkers(t) {
    this.Zh.CS(t);
  }
  markers() {
    return this.Zh.AS();
  }
}
function XF(e3, t, r) {
  const n = new fF(e3, new hF({}));
  return t && n.setMarkers(t), n;
}
({ ...t1 });
export {
  UF as A,
  aL as C,
  FL as L,
  mF as R,
  YF as S,
  PF as T,
  GF as V,
  hg as W,
  jR as X,
  WR as Y,
  Kg as a,
  pR as b,
  X as c,
  HF as d,
  Um as h,
  VF as n,
  XF as p,
  qF as q,
  A1 as r,
  vF as u
};
