var xi = Object.create, ln = Object.defineProperty, Ei = Object.getOwnPropertyDescriptor, Si = Object.getOwnPropertyNames, Ti = Object.getPrototypeOf, Ai = Object.prototype.hasOwnProperty, cn = (e, t) => () => (e && (t = e(e = 0)), t), ce = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), ki = (e, t, r, o) => {
  if (t && typeof t == "object" || typeof t == "function") for (var l = Si(t), s = 0, u = l.length, a; s < u; s++) a = l[s], !Ai.call(e, a) && a !== r && ln(e, a, { get: ((d) => t[d]).bind(null, a), enumerable: !(o = Ei(t, a)) || o.enumerable });
  return e;
}, yr = (e, t, r) => (r = e != null ? xi(Ti(e)) : {}, ki(ln(r, "default", { value: e, enumerable: true }), e)), Ot = ((e) => typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(e, { get: (t, r) => (typeof require < "u" ? require : t)[r] }) : e)(function(e) {
  if (typeof require < "u") return require.apply(this, arguments);
  throw Error('Calling `require` for "' + e + "\" in an environment that doesn't expose the `require` function. See https://rolldown.rs/in-depth/bundling-cjs#require-external-modules for more details.");
});
function St(e) {
  "@babel/helpers - typeof";
  return St = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, St(e);
}
function Ri(e, t) {
  if (St(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var o = r.call(e, t);
    if (St(o) != "object") return o;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Ci(e) {
  var t = Ri(e, "string");
  return St(t) == "symbol" ? t : t + "";
}
function Q(e, t, r) {
  return (t = Ci(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: true, configurable: true, writable: true }) : e[t] = r, e;
}
var Ut = class {
  constructor(e) {
    Q(this, "rootKey", void 0), this.rootKey = e;
  }
}, Ii = Object.seal({}), te = class extends Ut {
  constructor(e) {
    super(e), Q(this, "root", void 0), this.root = new Array();
  }
  prepForXml(e) {
    var t;
    e.stack.push(this);
    const r = this.root.map((o) => o instanceof Ut ? o.prepForXml(e) : o).filter((o) => o !== void 0);
    return e.stack.pop(), { [this.rootKey]: r.length ? r.length === 1 && (!((t = r[0]) === null || t === void 0) && t._attr) ? r[0] : r : Ii };
  }
  addChildElement(e) {
    return this.root.push(e), this;
  }
}, Ke = class extends te {
  constructor(e, t) {
    super(e), Q(this, "includeIfEmpty", void 0), this.includeIfEmpty = t;
  }
  prepForXml(e) {
    const t = super.prepForXml(e);
    if (this.includeIfEmpty || t && (typeof t[this.rootKey] != "object" || Object.keys(t[this.rootKey]).length)) return t;
  }
};
function Lr(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    t && (o = o.filter(function(l) {
      return Object.getOwnPropertyDescriptor(e, l).enumerable;
    })), r.push.apply(r, o);
  }
  return r;
}
function pe(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Lr(Object(r), true).forEach(function(o) {
      Q(e, o, r[o]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Lr(Object(r)).forEach(function(o) {
      Object.defineProperty(e, o, Object.getOwnPropertyDescriptor(r, o));
    });
  }
  return e;
}
var we = class extends Ut {
  constructor(e) {
    super("_attr"), Q(this, "root", void 0), Q(this, "xmlKeys", void 0), this.root = e;
  }
  prepForXml(e) {
    const t = {};
    return Object.entries(this.root).forEach(([r, o]) => {
      if (o !== void 0) {
        const l = this.xmlKeys && this.xmlKeys[r] || r;
        t[l] = o;
      }
    }), { _attr: t };
  }
}, hn = class extends Ut {
  constructor(e) {
    super("_attr"), Q(this, "root", void 0), this.root = e;
  }
  prepForXml(e) {
    return { _attr: Object.values(this.root).filter(({ value: t }) => t !== void 0).reduce((t, { key: r, value: o }) => pe(pe({}, t), {}, { [r]: o }), {}) };
  }
}, Ae = class extends we {
  constructor(...e) {
    super(...e), Q(this, "xmlKeys", { val: "w:val", color: "w:color", fill: "w:fill", space: "w:space", sz: "w:sz", type: "w:type", rsidR: "w:rsidR", rsidRPr: "w:rsidRPr", rsidSect: "w:rsidSect", w: "w:w", h: "w:h", top: "w:top", right: "w:right", bottom: "w:bottom", left: "w:left", header: "w:header", footer: "w:footer", gutter: "w:gutter", linePitch: "w:linePitch", pos: "w:pos" });
  }
}, br = ce(((e, t) => {
  var r = typeof Reflect == "object" ? Reflect : null, o = r && typeof r.apply == "function" ? r.apply : function(P, U, C) {
    return Function.prototype.apply.call(P, U, C);
  }, l;
  r && typeof r.ownKeys == "function" ? l = r.ownKeys : Object.getOwnPropertySymbols ? l = function(P) {
    return Object.getOwnPropertyNames(P).concat(Object.getOwnPropertySymbols(P));
  } : l = function(P) {
    return Object.getOwnPropertyNames(P);
  };
  function s(p) {
    console && console.warn && console.warn(p);
  }
  var u = Number.isNaN || function(P) {
    return P !== P;
  };
  function a() {
    a.init.call(this);
  }
  t.exports = a, t.exports.once = x, a.EventEmitter = a, a.prototype._events = void 0, a.prototype._eventsCount = 0, a.prototype._maxListeners = void 0;
  var d = 10;
  function T(p) {
    if (typeof p != "function") throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof p);
  }
  Object.defineProperty(a, "defaultMaxListeners", { enumerable: true, get: function() {
    return d;
  }, set: function(p) {
    if (typeof p != "number" || p < 0 || u(p)) throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + p + ".");
    d = p;
  } }), a.init = function() {
    (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
  }, a.prototype.setMaxListeners = function(P) {
    if (typeof P != "number" || P < 0 || u(P)) throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + P + ".");
    return this._maxListeners = P, this;
  };
  function E(p) {
    return p._maxListeners === void 0 ? a.defaultMaxListeners : p._maxListeners;
  }
  a.prototype.getMaxListeners = function() {
    return E(this);
  }, a.prototype.emit = function(P) {
    for (var U = [], C = 1; C < arguments.length; C++) U.push(arguments[C]);
    var q = P === "error", ee = this._events;
    if (ee !== void 0) q = q && ee.error === void 0;
    else if (!q) return false;
    if (q) {
      var O;
      if (U.length > 0 && (O = U[0]), O instanceof Error) throw O;
      var W = new Error("Unhandled error." + (O ? " (" + O.message + ")" : ""));
      throw W.context = O, W;
    }
    var S = ee[P];
    if (S === void 0) return false;
    if (typeof S == "function") o(S, this, U);
    else for (var H = S.length, J = k(S, H), C = 0; C < H; ++C) o(J[C], this, U);
    return true;
  };
  function g(p, P, U, C) {
    var q, ee, O;
    if (T(U), ee = p._events, ee === void 0 ? (ee = p._events = /* @__PURE__ */ Object.create(null), p._eventsCount = 0) : (ee.newListener !== void 0 && (p.emit("newListener", P, U.listener ? U.listener : U), ee = p._events), O = ee[P]), O === void 0) O = ee[P] = U, ++p._eventsCount;
    else if (typeof O == "function" ? O = ee[P] = C ? [U, O] : [O, U] : C ? O.unshift(U) : O.push(U), q = E(p), q > 0 && O.length > q && !O.warned) {
      O.warned = true;
      var W = new Error("Possible EventEmitter memory leak detected. " + O.length + " " + String(P) + " listeners added. Use emitter.setMaxListeners() to increase limit");
      W.name = "MaxListenersExceededWarning", W.emitter = p, W.type = P, W.count = O.length, s(W);
    }
    return p;
  }
  a.prototype.addListener = function(P, U) {
    return g(this, P, U, false);
  }, a.prototype.on = a.prototype.addListener, a.prototype.prependListener = function(P, U) {
    return g(this, P, U, true);
  };
  function N() {
    if (!this.fired) return this.target.removeListener(this.type, this.wrapFn), this.fired = true, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
  }
  function w(p, P, U) {
    var C = { fired: false, wrapFn: void 0, target: p, type: P, listener: U }, q = N.bind(C);
    return q.listener = U, C.wrapFn = q, q;
  }
  a.prototype.once = function(P, U) {
    return T(U), this.on(P, w(this, P, U)), this;
  }, a.prototype.prependOnceListener = function(P, U) {
    return T(U), this.prependListener(P, w(this, P, U)), this;
  }, a.prototype.removeListener = function(P, U) {
    var C, q, ee, O, W;
    if (T(U), q = this._events, q === void 0) return this;
    if (C = q[P], C === void 0) return this;
    if (C === U || C.listener === U) --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete q[P], q.removeListener && this.emit("removeListener", P, C.listener || U));
    else if (typeof C != "function") {
      for (ee = -1, O = C.length - 1; O >= 0; O--) if (C[O] === U || C[O].listener === U) {
        W = C[O].listener, ee = O;
        break;
      }
      if (ee < 0) return this;
      ee === 0 ? C.shift() : I(C, ee), C.length === 1 && (q[P] = C[0]), q.removeListener !== void 0 && this.emit("removeListener", P, W || U);
    }
    return this;
  }, a.prototype.off = a.prototype.removeListener, a.prototype.removeAllListeners = function(P) {
    var U, C = this._events, q;
    if (C === void 0) return this;
    if (C.removeListener === void 0) return arguments.length === 0 ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : C[P] !== void 0 && (--this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : delete C[P]), this;
    if (arguments.length === 0) {
      var ee = Object.keys(C), O;
      for (q = 0; q < ee.length; ++q) O = ee[q], O !== "removeListener" && this.removeAllListeners(O);
      return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
    }
    if (U = C[P], typeof U == "function") this.removeListener(P, U);
    else if (U !== void 0) for (q = U.length - 1; q >= 0; q--) this.removeListener(P, U[q]);
    return this;
  };
  function m(p, P, U) {
    var C = p._events;
    if (C === void 0) return [];
    var q = C[P];
    return q === void 0 ? [] : typeof q == "function" ? U ? [q.listener || q] : [q] : U ? y(q) : k(q, q.length);
  }
  a.prototype.listeners = function(P) {
    return m(this, P, true);
  }, a.prototype.rawListeners = function(P) {
    return m(this, P, false);
  }, a.listenerCount = function(p, P) {
    return typeof p.listenerCount == "function" ? p.listenerCount(P) : v.call(p, P);
  }, a.prototype.listenerCount = v;
  function v(p) {
    var P = this._events;
    if (P !== void 0) {
      var U = P[p];
      if (typeof U == "function") return 1;
      if (U !== void 0) return U.length;
    }
    return 0;
  }
  a.prototype.eventNames = function() {
    return this._eventsCount > 0 ? l(this._events) : [];
  };
  function k(p, P) {
    for (var U = new Array(P), C = 0; C < P; ++C) U[C] = p[C];
    return U;
  }
  function I(p, P) {
    for (; P + 1 < p.length; P++) p[P] = p[P + 1];
    p.pop();
  }
  function y(p) {
    for (var P = new Array(p.length), U = 0; U < P.length; ++U) P[U] = p[U].listener || p[U];
    return P;
  }
  function x(p, P) {
    return new Promise(function(U, C) {
      function q(O) {
        p.removeListener(P, ee), C(O);
      }
      function ee() {
        typeof p.removeListener == "function" && p.removeListener("error", q), U([].slice.call(arguments));
      }
      _(p, P, ee, { once: true }), P !== "error" && A(p, q, { once: true });
    });
  }
  function A(p, P, U) {
    typeof p.on == "function" && _(p, "error", P, U);
  }
  function _(p, P, U, C) {
    if (typeof p.on == "function") C.once ? p.once(P, U) : p.on(P, U);
    else if (typeof p.addEventListener == "function") p.addEventListener(P, function q(ee) {
      C.once && p.removeEventListener(P, q), U(ee);
    });
    else throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof p);
  }
})), Ge = ce(((e, t) => {
  typeof Object.create == "function" ? t.exports = function(o, l) {
    l && (o.super_ = l, o.prototype = Object.create(l.prototype, { constructor: { value: o, enumerable: false, writable: true, configurable: true } }));
  } : t.exports = function(o, l) {
    if (l) {
      o.super_ = l;
      var s = function() {
      };
      s.prototype = l.prototype, o.prototype = new s(), o.prototype.constructor = o;
    }
  };
})), ke, ft = cn((() => {
  ke = globalThis || self;
}));
function Ni(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function dr() {
  throw new Error("setTimeout has not been defined");
}
function pr() {
  throw new Error("clearTimeout has not been defined");
}
function fn(e) {
  if (Pe === setTimeout) return setTimeout(e, 0);
  if ((Pe === dr || !Pe) && setTimeout) return Pe = setTimeout, setTimeout(e, 0);
  try {
    return Pe(e, 0);
  } catch {
    try {
      return Pe.call(null, e, 0);
    } catch {
      return Pe.call(this, e, 0);
    }
  }
}
function Oi(e) {
  if (Fe === clearTimeout) return clearTimeout(e);
  if ((Fe === pr || !Fe) && clearTimeout) return Fe = clearTimeout, clearTimeout(e);
  try {
    return Fe(e);
  } catch {
    try {
      return Fe.call(null, e);
    } catch {
      return Fe.call(this, e);
    }
  }
}
function Pi() {
  !et || !Qe || (et = false, Qe.length ? De = Qe.concat(De) : xt = -1, De.length && dn());
}
function dn() {
  if (!et) {
    var e = fn(Pi);
    et = true;
    for (var t = De.length; t; ) {
      for (Qe = De, De = []; ++xt < t; ) Qe && Qe[xt].run();
      xt = -1, t = De.length;
    }
    Qe = null, et = false, Oi(e);
  }
}
function Mr(e, t) {
  this.fun = e, this.array = t;
}
function Me() {
}
var Jt, _e, Pe, Fe, De, et, Qe, xt, Ur, ge, qe = cn((() => {
  Jt = { exports: {} }, _e = Jt.exports = {}, (function() {
    try {
      typeof setTimeout == "function" ? Pe = setTimeout : Pe = dr;
    } catch {
      Pe = dr;
    }
    try {
      typeof clearTimeout == "function" ? Fe = clearTimeout : Fe = pr;
    } catch {
      Fe = pr;
    }
  })(), De = [], et = false, xt = -1, _e.nextTick = function(e) {
    var t = new Array(arguments.length - 1);
    if (arguments.length > 1) for (var r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
    De.push(new Mr(e, t)), De.length === 1 && !et && fn(dn);
  }, Mr.prototype.run = function() {
    this.fun.apply(null, this.array);
  }, _e.title = "browser", _e.browser = true, _e.env = {}, _e.argv = [], _e.version = "", _e.versions = {}, _e.on = Me, _e.addListener = Me, _e.once = Me, _e.off = Me, _e.removeListener = Me, _e.removeAllListeners = Me, _e.emit = Me, _e.prependListener = Me, _e.prependOnceListener = Me, _e.listeners = function(e) {
    return [];
  }, _e.binding = function(e) {
    throw new Error("process.binding is not supported");
  }, _e.cwd = function() {
    return "/";
  }, _e.chdir = function(e) {
    throw new Error("process.chdir is not supported");
  }, _e.umask = function() {
    return 0;
  }, Ur = Jt.exports, ge = Ni(Ur);
})), pn = ce(((e, t) => {
  t.exports = br().EventEmitter;
})), Fi = ce(((e) => {
  e.byteLength = d, e.toByteArray = E, e.fromByteArray = w;
  for (var t = [], r = [], o = typeof Uint8Array < "u" ? Uint8Array : Array, l = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", s = 0, u = l.length; s < u; ++s) t[s] = l[s], r[l.charCodeAt(s)] = s;
  r[45] = 62, r[95] = 63;
  function a(m) {
    var v = m.length;
    if (v % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
    var k = m.indexOf("=");
    k === -1 && (k = v);
    var I = k === v ? 0 : 4 - k % 4;
    return [k, I];
  }
  function d(m) {
    var v = a(m), k = v[0], I = v[1];
    return (k + I) * 3 / 4 - I;
  }
  function T(m, v, k) {
    return (v + k) * 3 / 4 - k;
  }
  function E(m) {
    var v, k = a(m), I = k[0], y = k[1], x = new o(T(m, I, y)), A = 0, _ = y > 0 ? I - 4 : I, p;
    for (p = 0; p < _; p += 4) v = r[m.charCodeAt(p)] << 18 | r[m.charCodeAt(p + 1)] << 12 | r[m.charCodeAt(p + 2)] << 6 | r[m.charCodeAt(p + 3)], x[A++] = v >> 16 & 255, x[A++] = v >> 8 & 255, x[A++] = v & 255;
    return y === 2 && (v = r[m.charCodeAt(p)] << 2 | r[m.charCodeAt(p + 1)] >> 4, x[A++] = v & 255), y === 1 && (v = r[m.charCodeAt(p)] << 10 | r[m.charCodeAt(p + 1)] << 4 | r[m.charCodeAt(p + 2)] >> 2, x[A++] = v >> 8 & 255, x[A++] = v & 255), x;
  }
  function g(m) {
    return t[m >> 18 & 63] + t[m >> 12 & 63] + t[m >> 6 & 63] + t[m & 63];
  }
  function N(m, v, k) {
    for (var I, y = [], x = v; x < k; x += 3) I = (m[x] << 16 & 16711680) + (m[x + 1] << 8 & 65280) + (m[x + 2] & 255), y.push(g(I));
    return y.join("");
  }
  function w(m) {
    for (var v, k = m.length, I = k % 3, y = [], x = 16383, A = 0, _ = k - I; A < _; A += x) y.push(N(m, A, A + x > _ ? _ : A + x));
    return I === 1 ? (v = m[k - 1], y.push(t[v >> 2] + t[v << 4 & 63] + "==")) : I === 2 && (v = (m[k - 2] << 8) + m[k - 1], y.push(t[v >> 10] + t[v >> 4 & 63] + t[v << 2 & 63] + "=")), y.join("");
  }
})), Di = ce(((e) => {
  /*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
  e.read = function(t, r, o, l, s) {
    var u, a, d = s * 8 - l - 1, T = (1 << d) - 1, E = T >> 1, g = -7, N = o ? s - 1 : 0, w = o ? -1 : 1, m = t[r + N];
    for (N += w, u = m & (1 << -g) - 1, m >>= -g, g += d; g > 0; u = u * 256 + t[r + N], N += w, g -= 8) ;
    for (a = u & (1 << -g) - 1, u >>= -g, g += l; g > 0; a = a * 256 + t[r + N], N += w, g -= 8) ;
    if (u === 0) u = 1 - E;
    else {
      if (u === T) return a ? NaN : (m ? -1 : 1) * (1 / 0);
      a = a + Math.pow(2, l), u = u - E;
    }
    return (m ? -1 : 1) * a * Math.pow(2, u - l);
  }, e.write = function(t, r, o, l, s, u) {
    var a, d, T, E = u * 8 - s - 1, g = (1 << E) - 1, N = g >> 1, w = s === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, m = l ? 0 : u - 1, v = l ? 1 : -1, k = r < 0 || r === 0 && 1 / r < 0 ? 1 : 0;
    for (r = Math.abs(r), isNaN(r) || r === 1 / 0 ? (d = isNaN(r) ? 1 : 0, a = g) : (a = Math.floor(Math.log(r) / Math.LN2), r * (T = Math.pow(2, -a)) < 1 && (a--, T *= 2), a + N >= 1 ? r += w / T : r += w * Math.pow(2, 1 - N), r * T >= 2 && (a++, T /= 2), a + N >= g ? (d = 0, a = g) : a + N >= 1 ? (d = (r * T - 1) * Math.pow(2, s), a = a + N) : (d = r * Math.pow(2, N - 1) * Math.pow(2, s), a = 0)); s >= 8; t[o + m] = d & 255, m += v, d /= 256, s -= 8) ;
    for (a = a << s | d, E += s; E > 0; t[o + m] = a & 255, m += v, a /= 256, E -= 8) ;
    t[o + m - v] |= k * 128;
  };
}));
/*!
* The buffer module from node.js, for the browser.
*
* @author   Feross Aboukhadijeh <https://feross.org>
* @license  MIT
*/
var zt = ce(((e) => {
  var t = Fi(), r = Di(), o = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
  e.Buffer = a, e.SlowBuffer = y, e.INSPECT_MAX_BYTES = 50;
  var l = 2147483647;
  e.kMaxLength = l, a.TYPED_ARRAY_SUPPORT = s(), !a.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
  function s() {
    try {
      var R = new Uint8Array(1), n = { foo: function() {
        return 42;
      } };
      return Object.setPrototypeOf(n, Uint8Array.prototype), Object.setPrototypeOf(R, n), R.foo() === 42;
    } catch {
      return false;
    }
  }
  Object.defineProperty(a.prototype, "parent", { enumerable: true, get: function() {
    if (a.isBuffer(this)) return this.buffer;
  } }), Object.defineProperty(a.prototype, "offset", { enumerable: true, get: function() {
    if (a.isBuffer(this)) return this.byteOffset;
  } });
  function u(R) {
    if (R > l) throw new RangeError('The value "' + R + '" is invalid for option "size"');
    var n = new Uint8Array(R);
    return Object.setPrototypeOf(n, a.prototype), n;
  }
  function a(R, n, i) {
    if (typeof R == "number") {
      if (typeof n == "string") throw new TypeError('The "string" argument must be of type string. Received type number');
      return g(R);
    }
    return d(R, n, i);
  }
  a.poolSize = 8192;
  function d(R, n, i) {
    if (typeof R == "string") return N(R, n);
    if (ArrayBuffer.isView(R)) return m(R);
    if (R == null) throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof R);
    if (B(R, ArrayBuffer) || R && B(R.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (B(R, SharedArrayBuffer) || R && B(R.buffer, SharedArrayBuffer))) return v(R, n, i);
    if (typeof R == "number") throw new TypeError('The "value" argument must not be of type number. Received type number');
    var f = R.valueOf && R.valueOf();
    if (f != null && f !== R) return a.from(f, n, i);
    var L = k(R);
    if (L) return L;
    if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof R[Symbol.toPrimitive] == "function") return a.from(R[Symbol.toPrimitive]("string"), n, i);
    throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof R);
  }
  a.from = function(R, n, i) {
    return d(R, n, i);
  }, Object.setPrototypeOf(a.prototype, Uint8Array.prototype), Object.setPrototypeOf(a, Uint8Array);
  function T(R) {
    if (typeof R != "number") throw new TypeError('"size" argument must be of type number');
    if (R < 0) throw new RangeError('The value "' + R + '" is invalid for option "size"');
  }
  function E(R, n, i) {
    return T(R), R <= 0 ? u(R) : n !== void 0 ? typeof i == "string" ? u(R).fill(n, i) : u(R).fill(n) : u(R);
  }
  a.alloc = function(R, n, i) {
    return E(R, n, i);
  };
  function g(R) {
    return T(R), u(R < 0 ? 0 : I(R) | 0);
  }
  a.allocUnsafe = function(R) {
    return g(R);
  }, a.allocUnsafeSlow = function(R) {
    return g(R);
  };
  function N(R, n) {
    if ((typeof n != "string" || n === "") && (n = "utf8"), !a.isEncoding(n)) throw new TypeError("Unknown encoding: " + n);
    var i = x(R, n) | 0, f = u(i), L = f.write(R, n);
    return L !== i && (f = f.slice(0, L)), f;
  }
  function w(R) {
    for (var n = R.length < 0 ? 0 : I(R.length) | 0, i = u(n), f = 0; f < n; f += 1) i[f] = R[f] & 255;
    return i;
  }
  function m(R) {
    if (B(R, Uint8Array)) {
      var n = new Uint8Array(R);
      return v(n.buffer, n.byteOffset, n.byteLength);
    }
    return w(R);
  }
  function v(R, n, i) {
    if (n < 0 || R.byteLength < n) throw new RangeError('"offset" is outside of buffer bounds');
    if (R.byteLength < n + (i || 0)) throw new RangeError('"length" is outside of buffer bounds');
    var f;
    return n === void 0 && i === void 0 ? f = new Uint8Array(R) : i === void 0 ? f = new Uint8Array(R, n) : f = new Uint8Array(R, n, i), Object.setPrototypeOf(f, a.prototype), f;
  }
  function k(R) {
    if (a.isBuffer(R)) {
      var n = I(R.length) | 0, i = u(n);
      return i.length === 0 || R.copy(i, 0, 0, n), i;
    }
    if (R.length !== void 0) return typeof R.length != "number" || c(R.length) ? u(0) : w(R);
    if (R.type === "Buffer" && Array.isArray(R.data)) return w(R.data);
  }
  function I(R) {
    if (R >= l) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + l.toString(16) + " bytes");
    return R | 0;
  }
  function y(R) {
    return +R != R && (R = 0), a.alloc(+R);
  }
  a.isBuffer = function(n) {
    return n != null && n._isBuffer === true && n !== a.prototype;
  }, a.compare = function(n, i) {
    if (B(n, Uint8Array) && (n = a.from(n, n.offset, n.byteLength)), B(i, Uint8Array) && (i = a.from(i, i.offset, i.byteLength)), !a.isBuffer(n) || !a.isBuffer(i)) throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
    if (n === i) return 0;
    for (var f = n.length, L = i.length, K = 0, z = Math.min(f, L); K < z; ++K) if (n[K] !== i[K]) {
      f = n[K], L = i[K];
      break;
    }
    return f < L ? -1 : L < f ? 1 : 0;
  }, a.isEncoding = function(n) {
    switch (String(n).toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "latin1":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return true;
      default:
        return false;
    }
  }, a.concat = function(n, i) {
    if (!Array.isArray(n)) throw new TypeError('"list" argument must be an Array of Buffers');
    if (n.length === 0) return a.alloc(0);
    var f;
    if (i === void 0) for (i = 0, f = 0; f < n.length; ++f) i += n[f].length;
    var L = a.allocUnsafe(i), K = 0;
    for (f = 0; f < n.length; ++f) {
      var z = n[f];
      if (B(z, Uint8Array)) K + z.length > L.length ? a.from(z).copy(L, K) : Uint8Array.prototype.set.call(L, z, K);
      else if (a.isBuffer(z)) z.copy(L, K);
      else throw new TypeError('"list" argument must be an Array of Buffers');
      K += z.length;
    }
    return L;
  };
  function x(R, n) {
    if (a.isBuffer(R)) return R.length;
    if (ArrayBuffer.isView(R) || B(R, ArrayBuffer)) return R.byteLength;
    if (typeof R != "string") throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof R);
    var i = R.length, f = arguments.length > 2 && arguments[2] === true;
    if (!f && i === 0) return 0;
    for (var L = false; ; ) switch (n) {
      case "ascii":
      case "latin1":
      case "binary":
        return i;
      case "utf8":
      case "utf-8":
        return h(R).length;
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return i * 2;
      case "hex":
        return i >>> 1;
      case "base64":
        return ie(R).length;
      default:
        if (L) return f ? -1 : h(R).length;
        n = ("" + n).toLowerCase(), L = true;
    }
  }
  a.byteLength = x;
  function A(R, n, i) {
    var f = false;
    if ((n === void 0 || n < 0) && (n = 0), n > this.length || ((i === void 0 || i > this.length) && (i = this.length), i <= 0) || (i >>>= 0, n >>>= 0, i <= n)) return "";
    for (R || (R = "utf8"); ; ) switch (R) {
      case "hex":
        return Z(this, n, i);
      case "utf8":
      case "utf-8":
        return S(this, n, i);
      case "ascii":
        return $(this, n, i);
      case "latin1":
      case "binary":
        return oe(this, n, i);
      case "base64":
        return W(this, n, i);
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return re(this, n, i);
      default:
        if (f) throw new TypeError("Unknown encoding: " + R);
        R = (R + "").toLowerCase(), f = true;
    }
  }
  a.prototype._isBuffer = true;
  function _(R, n, i) {
    var f = R[n];
    R[n] = R[i], R[i] = f;
  }
  a.prototype.swap16 = function() {
    var n = this.length;
    if (n % 2 !== 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (var i = 0; i < n; i += 2) _(this, i, i + 1);
    return this;
  }, a.prototype.swap32 = function() {
    var n = this.length;
    if (n % 4 !== 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
    for (var i = 0; i < n; i += 4) _(this, i, i + 3), _(this, i + 1, i + 2);
    return this;
  }, a.prototype.swap64 = function() {
    var n = this.length;
    if (n % 8 !== 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
    for (var i = 0; i < n; i += 8) _(this, i, i + 7), _(this, i + 1, i + 6), _(this, i + 2, i + 5), _(this, i + 3, i + 4);
    return this;
  }, a.prototype.toString = function() {
    var n = this.length;
    return n === 0 ? "" : arguments.length === 0 ? S(this, 0, n) : A.apply(this, arguments);
  }, a.prototype.toLocaleString = a.prototype.toString, a.prototype.equals = function(n) {
    if (!a.isBuffer(n)) throw new TypeError("Argument must be a Buffer");
    return this === n ? true : a.compare(this, n) === 0;
  }, a.prototype.inspect = function() {
    var n = "", i = e.INSPECT_MAX_BYTES;
    return n = this.toString("hex", 0, i).replace(/(.{2})/g, "$1 ").trim(), this.length > i && (n += " ... "), "<Buffer " + n + ">";
  }, o && (a.prototype[o] = a.prototype.inspect), a.prototype.compare = function(n, i, f, L, K) {
    if (B(n, Uint8Array) && (n = a.from(n, n.offset, n.byteLength)), !a.isBuffer(n)) throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof n);
    if (i === void 0 && (i = 0), f === void 0 && (f = n ? n.length : 0), L === void 0 && (L = 0), K === void 0 && (K = this.length), i < 0 || f > n.length || L < 0 || K > this.length) throw new RangeError("out of range index");
    if (L >= K && i >= f) return 0;
    if (L >= K) return -1;
    if (i >= f) return 1;
    if (i >>>= 0, f >>>= 0, L >>>= 0, K >>>= 0, this === n) return 0;
    for (var z = K - L, ae = f - i, ue = Math.min(z, ae), se = this.slice(L, K), fe = n.slice(i, f), me = 0; me < ue; ++me) if (se[me] !== fe[me]) {
      z = se[me], ae = fe[me];
      break;
    }
    return z < ae ? -1 : ae < z ? 1 : 0;
  };
  function p(R, n, i, f, L) {
    if (R.length === 0) return -1;
    if (typeof i == "string" ? (f = i, i = 0) : i > 2147483647 ? i = 2147483647 : i < -2147483648 && (i = -2147483648), i = +i, c(i) && (i = L ? 0 : R.length - 1), i < 0 && (i = R.length + i), i >= R.length) {
      if (L) return -1;
      i = R.length - 1;
    } else if (i < 0) if (L) i = 0;
    else return -1;
    if (typeof n == "string" && (n = a.from(n, f)), a.isBuffer(n)) return n.length === 0 ? -1 : P(R, n, i, f, L);
    if (typeof n == "number") return n = n & 255, typeof Uint8Array.prototype.indexOf == "function" ? L ? Uint8Array.prototype.indexOf.call(R, n, i) : Uint8Array.prototype.lastIndexOf.call(R, n, i) : P(R, [n], i, f, L);
    throw new TypeError("val must be string, number or Buffer");
  }
  function P(R, n, i, f, L) {
    var K = 1, z = R.length, ae = n.length;
    if (f !== void 0 && (f = String(f).toLowerCase(), f === "ucs2" || f === "ucs-2" || f === "utf16le" || f === "utf-16le")) {
      if (R.length < 2 || n.length < 2) return -1;
      K = 2, z /= 2, ae /= 2, i /= 2;
    }
    function ue(Ee, We) {
      return K === 1 ? Ee[We] : Ee.readUInt16BE(We * K);
    }
    var se;
    if (L) {
      var fe = -1;
      for (se = i; se < z; se++) if (ue(R, se) === ue(n, fe === -1 ? 0 : se - fe)) {
        if (fe === -1 && (fe = se), se - fe + 1 === ae) return fe * K;
      } else fe !== -1 && (se -= se - fe), fe = -1;
    } else for (i + ae > z && (i = z - ae), se = i; se >= 0; se--) {
      for (var me = true, ve = 0; ve < ae; ve++) if (ue(R, se + ve) !== ue(n, ve)) {
        me = false;
        break;
      }
      if (me) return se;
    }
    return -1;
  }
  a.prototype.includes = function(n, i, f) {
    return this.indexOf(n, i, f) !== -1;
  }, a.prototype.indexOf = function(n, i, f) {
    return p(this, n, i, f, true);
  }, a.prototype.lastIndexOf = function(n, i, f) {
    return p(this, n, i, f, false);
  };
  function U(R, n, i, f) {
    i = Number(i) || 0;
    var L = R.length - i;
    f ? (f = Number(f), f > L && (f = L)) : f = L;
    var K = n.length;
    f > K / 2 && (f = K / 2);
    for (var z = 0; z < f; ++z) {
      var ae = parseInt(n.substr(z * 2, 2), 16);
      if (c(ae)) return z;
      R[i + z] = ae;
    }
    return z;
  }
  function C(R, n, i, f) {
    return D(h(n, R.length - i), R, i, f);
  }
  function q(R, n, i, f) {
    return D(j(n), R, i, f);
  }
  function ee(R, n, i, f) {
    return D(ie(n), R, i, f);
  }
  function O(R, n, i, f) {
    return D(M(n, R.length - i), R, i, f);
  }
  a.prototype.write = function(n, i, f, L) {
    if (i === void 0) L = "utf8", f = this.length, i = 0;
    else if (f === void 0 && typeof i == "string") L = i, f = this.length, i = 0;
    else if (isFinite(i)) i = i >>> 0, isFinite(f) ? (f = f >>> 0, L === void 0 && (L = "utf8")) : (L = f, f = void 0);
    else throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
    var K = this.length - i;
    if ((f === void 0 || f > K) && (f = K), n.length > 0 && (f < 0 || i < 0) || i > this.length) throw new RangeError("Attempt to write outside buffer bounds");
    L || (L = "utf8");
    for (var z = false; ; ) switch (L) {
      case "hex":
        return U(this, n, i, f);
      case "utf8":
      case "utf-8":
        return C(this, n, i, f);
      case "ascii":
      case "latin1":
      case "binary":
        return q(this, n, i, f);
      case "base64":
        return ee(this, n, i, f);
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return O(this, n, i, f);
      default:
        if (z) throw new TypeError("Unknown encoding: " + L);
        L = ("" + L).toLowerCase(), z = true;
    }
  }, a.prototype.toJSON = function() {
    return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) };
  };
  function W(R, n, i) {
    return n === 0 && i === R.length ? t.fromByteArray(R) : t.fromByteArray(R.slice(n, i));
  }
  function S(R, n, i) {
    i = Math.min(R.length, i);
    for (var f = [], L = n; L < i; ) {
      var K = R[L], z = null, ae = K > 239 ? 4 : K > 223 ? 3 : K > 191 ? 2 : 1;
      if (L + ae <= i) {
        var ue, se, fe, me;
        switch (ae) {
          case 1:
            K < 128 && (z = K);
            break;
          case 2:
            ue = R[L + 1], (ue & 192) === 128 && (me = (K & 31) << 6 | ue & 63, me > 127 && (z = me));
            break;
          case 3:
            ue = R[L + 1], se = R[L + 2], (ue & 192) === 128 && (se & 192) === 128 && (me = (K & 15) << 12 | (ue & 63) << 6 | se & 63, me > 2047 && (me < 55296 || me > 57343) && (z = me));
            break;
          case 4:
            ue = R[L + 1], se = R[L + 2], fe = R[L + 3], (ue & 192) === 128 && (se & 192) === 128 && (fe & 192) === 128 && (me = (K & 15) << 18 | (ue & 63) << 12 | (se & 63) << 6 | fe & 63, me > 65535 && me < 1114112 && (z = me));
        }
      }
      z === null ? (z = 65533, ae = 1) : z > 65535 && (z -= 65536, f.push(z >>> 10 & 1023 | 55296), z = 56320 | z & 1023), f.push(z), L += ae;
    }
    return J(f);
  }
  var H = 4096;
  function J(R) {
    var n = R.length;
    if (n <= H) return String.fromCharCode.apply(String, R);
    for (var i = "", f = 0; f < n; ) i += String.fromCharCode.apply(String, R.slice(f, f += H));
    return i;
  }
  function $(R, n, i) {
    var f = "";
    i = Math.min(R.length, i);
    for (var L = n; L < i; ++L) f += String.fromCharCode(R[L] & 127);
    return f;
  }
  function oe(R, n, i) {
    var f = "";
    i = Math.min(R.length, i);
    for (var L = n; L < i; ++L) f += String.fromCharCode(R[L]);
    return f;
  }
  function Z(R, n, i) {
    var f = R.length;
    (!n || n < 0) && (n = 0), (!i || i < 0 || i > f) && (i = f);
    for (var L = "", K = n; K < i; ++K) L += G[R[K]];
    return L;
  }
  function re(R, n, i) {
    for (var f = R.slice(n, i), L = "", K = 0; K < f.length - 1; K += 2) L += String.fromCharCode(f[K] + f[K + 1] * 256);
    return L;
  }
  a.prototype.slice = function(n, i) {
    var f = this.length;
    n = ~~n, i = i === void 0 ? f : ~~i, n < 0 ? (n += f, n < 0 && (n = 0)) : n > f && (n = f), i < 0 ? (i += f, i < 0 && (i = 0)) : i > f && (i = f), i < n && (i = n);
    var L = this.subarray(n, i);
    return Object.setPrototypeOf(L, a.prototype), L;
  };
  function V(R, n, i) {
    if (R % 1 !== 0 || R < 0) throw new RangeError("offset is not uint");
    if (R + n > i) throw new RangeError("Trying to access beyond buffer length");
  }
  a.prototype.readUintLE = a.prototype.readUIntLE = function(n, i, f) {
    n = n >>> 0, i = i >>> 0, f || V(n, i, this.length);
    for (var L = this[n], K = 1, z = 0; ++z < i && (K *= 256); ) L += this[n + z] * K;
    return L;
  }, a.prototype.readUintBE = a.prototype.readUIntBE = function(n, i, f) {
    n = n >>> 0, i = i >>> 0, f || V(n, i, this.length);
    for (var L = this[n + --i], K = 1; i > 0 && (K *= 256); ) L += this[n + --i] * K;
    return L;
  }, a.prototype.readUint8 = a.prototype.readUInt8 = function(n, i) {
    return n = n >>> 0, i || V(n, 1, this.length), this[n];
  }, a.prototype.readUint16LE = a.prototype.readUInt16LE = function(n, i) {
    return n = n >>> 0, i || V(n, 2, this.length), this[n] | this[n + 1] << 8;
  }, a.prototype.readUint16BE = a.prototype.readUInt16BE = function(n, i) {
    return n = n >>> 0, i || V(n, 2, this.length), this[n] << 8 | this[n + 1];
  }, a.prototype.readUint32LE = a.prototype.readUInt32LE = function(n, i) {
    return n = n >>> 0, i || V(n, 4, this.length), (this[n] | this[n + 1] << 8 | this[n + 2] << 16) + this[n + 3] * 16777216;
  }, a.prototype.readUint32BE = a.prototype.readUInt32BE = function(n, i) {
    return n = n >>> 0, i || V(n, 4, this.length), this[n] * 16777216 + (this[n + 1] << 16 | this[n + 2] << 8 | this[n + 3]);
  }, a.prototype.readIntLE = function(n, i, f) {
    n = n >>> 0, i = i >>> 0, f || V(n, i, this.length);
    for (var L = this[n], K = 1, z = 0; ++z < i && (K *= 256); ) L += this[n + z] * K;
    return K *= 128, L >= K && (L -= Math.pow(2, 8 * i)), L;
  }, a.prototype.readIntBE = function(n, i, f) {
    n = n >>> 0, i = i >>> 0, f || V(n, i, this.length);
    for (var L = i, K = 1, z = this[n + --L]; L > 0 && (K *= 256); ) z += this[n + --L] * K;
    return K *= 128, z >= K && (z -= Math.pow(2, 8 * i)), z;
  }, a.prototype.readInt8 = function(n, i) {
    return n = n >>> 0, i || V(n, 1, this.length), this[n] & 128 ? (255 - this[n] + 1) * -1 : this[n];
  }, a.prototype.readInt16LE = function(n, i) {
    n = n >>> 0, i || V(n, 2, this.length);
    var f = this[n] | this[n + 1] << 8;
    return f & 32768 ? f | 4294901760 : f;
  }, a.prototype.readInt16BE = function(n, i) {
    n = n >>> 0, i || V(n, 2, this.length);
    var f = this[n + 1] | this[n] << 8;
    return f & 32768 ? f | 4294901760 : f;
  }, a.prototype.readInt32LE = function(n, i) {
    return n = n >>> 0, i || V(n, 4, this.length), this[n] | this[n + 1] << 8 | this[n + 2] << 16 | this[n + 3] << 24;
  }, a.prototype.readInt32BE = function(n, i) {
    return n = n >>> 0, i || V(n, 4, this.length), this[n] << 24 | this[n + 1] << 16 | this[n + 2] << 8 | this[n + 3];
  }, a.prototype.readFloatLE = function(n, i) {
    return n = n >>> 0, i || V(n, 4, this.length), r.read(this, n, true, 23, 4);
  }, a.prototype.readFloatBE = function(n, i) {
    return n = n >>> 0, i || V(n, 4, this.length), r.read(this, n, false, 23, 4);
  }, a.prototype.readDoubleLE = function(n, i) {
    return n = n >>> 0, i || V(n, 8, this.length), r.read(this, n, true, 52, 8);
  }, a.prototype.readDoubleBE = function(n, i) {
    return n = n >>> 0, i || V(n, 8, this.length), r.read(this, n, false, 52, 8);
  };
  function F(R, n, i, f, L, K) {
    if (!a.isBuffer(R)) throw new TypeError('"buffer" argument must be a Buffer instance');
    if (n > L || n < K) throw new RangeError('"value" argument is out of bounds');
    if (i + f > R.length) throw new RangeError("Index out of range");
  }
  a.prototype.writeUintLE = a.prototype.writeUIntLE = function(n, i, f, L) {
    if (n = +n, i = i >>> 0, f = f >>> 0, !L) {
      var K = Math.pow(2, 8 * f) - 1;
      F(this, n, i, f, K, 0);
    }
    var z = 1, ae = 0;
    for (this[i] = n & 255; ++ae < f && (z *= 256); ) this[i + ae] = n / z & 255;
    return i + f;
  }, a.prototype.writeUintBE = a.prototype.writeUIntBE = function(n, i, f, L) {
    if (n = +n, i = i >>> 0, f = f >>> 0, !L) {
      var K = Math.pow(2, 8 * f) - 1;
      F(this, n, i, f, K, 0);
    }
    var z = f - 1, ae = 1;
    for (this[i + z] = n & 255; --z >= 0 && (ae *= 256); ) this[i + z] = n / ae & 255;
    return i + f;
  }, a.prototype.writeUint8 = a.prototype.writeUInt8 = function(n, i, f) {
    return n = +n, i = i >>> 0, f || F(this, n, i, 1, 255, 0), this[i] = n & 255, i + 1;
  }, a.prototype.writeUint16LE = a.prototype.writeUInt16LE = function(n, i, f) {
    return n = +n, i = i >>> 0, f || F(this, n, i, 2, 65535, 0), this[i] = n & 255, this[i + 1] = n >>> 8, i + 2;
  }, a.prototype.writeUint16BE = a.prototype.writeUInt16BE = function(n, i, f) {
    return n = +n, i = i >>> 0, f || F(this, n, i, 2, 65535, 0), this[i] = n >>> 8, this[i + 1] = n & 255, i + 2;
  }, a.prototype.writeUint32LE = a.prototype.writeUInt32LE = function(n, i, f) {
    return n = +n, i = i >>> 0, f || F(this, n, i, 4, 4294967295, 0), this[i + 3] = n >>> 24, this[i + 2] = n >>> 16, this[i + 1] = n >>> 8, this[i] = n & 255, i + 4;
  }, a.prototype.writeUint32BE = a.prototype.writeUInt32BE = function(n, i, f) {
    return n = +n, i = i >>> 0, f || F(this, n, i, 4, 4294967295, 0), this[i] = n >>> 24, this[i + 1] = n >>> 16, this[i + 2] = n >>> 8, this[i + 3] = n & 255, i + 4;
  }, a.prototype.writeIntLE = function(n, i, f, L) {
    if (n = +n, i = i >>> 0, !L) {
      var K = Math.pow(2, 8 * f - 1);
      F(this, n, i, f, K - 1, -K);
    }
    var z = 0, ae = 1, ue = 0;
    for (this[i] = n & 255; ++z < f && (ae *= 256); ) n < 0 && ue === 0 && this[i + z - 1] !== 0 && (ue = 1), this[i + z] = (n / ae >> 0) - ue & 255;
    return i + f;
  }, a.prototype.writeIntBE = function(n, i, f, L) {
    if (n = +n, i = i >>> 0, !L) {
      var K = Math.pow(2, 8 * f - 1);
      F(this, n, i, f, K - 1, -K);
    }
    var z = f - 1, ae = 1, ue = 0;
    for (this[i + z] = n & 255; --z >= 0 && (ae *= 256); ) n < 0 && ue === 0 && this[i + z + 1] !== 0 && (ue = 1), this[i + z] = (n / ae >> 0) - ue & 255;
    return i + f;
  }, a.prototype.writeInt8 = function(n, i, f) {
    return n = +n, i = i >>> 0, f || F(this, n, i, 1, 127, -128), n < 0 && (n = 255 + n + 1), this[i] = n & 255, i + 1;
  }, a.prototype.writeInt16LE = function(n, i, f) {
    return n = +n, i = i >>> 0, f || F(this, n, i, 2, 32767, -32768), this[i] = n & 255, this[i + 1] = n >>> 8, i + 2;
  }, a.prototype.writeInt16BE = function(n, i, f) {
    return n = +n, i = i >>> 0, f || F(this, n, i, 2, 32767, -32768), this[i] = n >>> 8, this[i + 1] = n & 255, i + 2;
  }, a.prototype.writeInt32LE = function(n, i, f) {
    return n = +n, i = i >>> 0, f || F(this, n, i, 4, 2147483647, -2147483648), this[i] = n & 255, this[i + 1] = n >>> 8, this[i + 2] = n >>> 16, this[i + 3] = n >>> 24, i + 4;
  }, a.prototype.writeInt32BE = function(n, i, f) {
    return n = +n, i = i >>> 0, f || F(this, n, i, 4, 2147483647, -2147483648), n < 0 && (n = 4294967295 + n + 1), this[i] = n >>> 24, this[i + 1] = n >>> 16, this[i + 2] = n >>> 8, this[i + 3] = n & 255, i + 4;
  };
  function X(R, n, i, f, L, K) {
    if (i + f > R.length) throw new RangeError("Index out of range");
    if (i < 0) throw new RangeError("Index out of range");
  }
  function Y(R, n, i, f, L) {
    return n = +n, i = i >>> 0, L || X(R, n, i, 4), r.write(R, n, i, f, 23, 4), i + 4;
  }
  a.prototype.writeFloatLE = function(n, i, f) {
    return Y(this, n, i, true, f);
  }, a.prototype.writeFloatBE = function(n, i, f) {
    return Y(this, n, i, false, f);
  };
  function ne(R, n, i, f, L) {
    return n = +n, i = i >>> 0, L || X(R, n, i, 8), r.write(R, n, i, f, 52, 8), i + 8;
  }
  a.prototype.writeDoubleLE = function(n, i, f) {
    return ne(this, n, i, true, f);
  }, a.prototype.writeDoubleBE = function(n, i, f) {
    return ne(this, n, i, false, f);
  }, a.prototype.copy = function(n, i, f, L) {
    if (!a.isBuffer(n)) throw new TypeError("argument should be a Buffer");
    if (f || (f = 0), !L && L !== 0 && (L = this.length), i >= n.length && (i = n.length), i || (i = 0), L > 0 && L < f && (L = f), L === f || n.length === 0 || this.length === 0) return 0;
    if (i < 0) throw new RangeError("targetStart out of bounds");
    if (f < 0 || f >= this.length) throw new RangeError("Index out of range");
    if (L < 0) throw new RangeError("sourceEnd out of bounds");
    L > this.length && (L = this.length), n.length - i < L - f && (L = n.length - i + f);
    var K = L - f;
    return this === n && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(i, f, L) : Uint8Array.prototype.set.call(n, this.subarray(f, L), i), K;
  }, a.prototype.fill = function(n, i, f, L) {
    if (typeof n == "string") {
      if (typeof i == "string" ? (L = i, i = 0, f = this.length) : typeof f == "string" && (L = f, f = this.length), L !== void 0 && typeof L != "string") throw new TypeError("encoding must be a string");
      if (typeof L == "string" && !a.isEncoding(L)) throw new TypeError("Unknown encoding: " + L);
      if (n.length === 1) {
        var K = n.charCodeAt(0);
        (L === "utf8" && K < 128 || L === "latin1") && (n = K);
      }
    } else typeof n == "number" ? n = n & 255 : typeof n == "boolean" && (n = Number(n));
    if (i < 0 || this.length < i || this.length < f) throw new RangeError("Out of range index");
    if (f <= i) return this;
    i = i >>> 0, f = f === void 0 ? this.length : f >>> 0, n || (n = 0);
    var z;
    if (typeof n == "number") for (z = i; z < f; ++z) this[z] = n;
    else {
      var ae = a.isBuffer(n) ? n : a.from(n, L), ue = ae.length;
      if (ue === 0) throw new TypeError('The value "' + n + '" is invalid for argument "value"');
      for (z = 0; z < f - i; ++z) this[z + i] = ae[z % ue];
    }
    return this;
  };
  var de = /[^+/0-9A-Za-z-_]/g;
  function b(R) {
    if (R = R.split("=")[0], R = R.trim().replace(de, ""), R.length < 2) return "";
    for (; R.length % 4 !== 0; ) R = R + "=";
    return R;
  }
  function h(R, n) {
    n = n || 1 / 0;
    for (var i, f = R.length, L = null, K = [], z = 0; z < f; ++z) {
      if (i = R.charCodeAt(z), i > 55295 && i < 57344) {
        if (!L) {
          if (i > 56319) {
            (n -= 3) > -1 && K.push(239, 191, 189);
            continue;
          } else if (z + 1 === f) {
            (n -= 3) > -1 && K.push(239, 191, 189);
            continue;
          }
          L = i;
          continue;
        }
        if (i < 56320) {
          (n -= 3) > -1 && K.push(239, 191, 189), L = i;
          continue;
        }
        i = (L - 55296 << 10 | i - 56320) + 65536;
      } else L && (n -= 3) > -1 && K.push(239, 191, 189);
      if (L = null, i < 128) {
        if ((n -= 1) < 0) break;
        K.push(i);
      } else if (i < 2048) {
        if ((n -= 2) < 0) break;
        K.push(i >> 6 | 192, i & 63 | 128);
      } else if (i < 65536) {
        if ((n -= 3) < 0) break;
        K.push(i >> 12 | 224, i >> 6 & 63 | 128, i & 63 | 128);
      } else if (i < 1114112) {
        if ((n -= 4) < 0) break;
        K.push(i >> 18 | 240, i >> 12 & 63 | 128, i >> 6 & 63 | 128, i & 63 | 128);
      } else throw new Error("Invalid code point");
    }
    return K;
  }
  function j(R) {
    for (var n = [], i = 0; i < R.length; ++i) n.push(R.charCodeAt(i) & 255);
    return n;
  }
  function M(R, n) {
    for (var i, f, L, K = [], z = 0; z < R.length && !((n -= 2) < 0); ++z) i = R.charCodeAt(z), f = i >> 8, L = i % 256, K.push(L), K.push(f);
    return K;
  }
  function ie(R) {
    return t.toByteArray(b(R));
  }
  function D(R, n, i, f) {
    for (var L = 0; L < f && !(L + i >= n.length || L >= R.length); ++L) n[L + i] = R[L];
    return L;
  }
  function B(R, n) {
    return R instanceof n || R != null && R.constructor != null && R.constructor.name != null && R.constructor.name === n.name;
  }
  function c(R) {
    return R !== R;
  }
  var G = (function() {
    for (var R = "0123456789abcdef", n = new Array(256), i = 0; i < 16; ++i) for (var f = i * 16, L = 0; L < 16; ++L) n[f + L] = R[i] + R[L];
    return n;
  })();
})), mn = ce(((e, t) => {
  t.exports = function() {
    if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function") return false;
    if (typeof Symbol.iterator == "symbol") return true;
    var o = {}, l = Symbol("test"), s = Object(l);
    if (typeof l == "string" || Object.prototype.toString.call(l) !== "[object Symbol]" || Object.prototype.toString.call(s) !== "[object Symbol]") return false;
    var u = 42;
    o[l] = u;
    for (var a in o) return false;
    if (typeof Object.keys == "function" && Object.keys(o).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(o).length !== 0) return false;
    var d = Object.getOwnPropertySymbols(o);
    if (d.length !== 1 || d[0] !== l || !Object.prototype.propertyIsEnumerable.call(o, l)) return false;
    if (typeof Object.getOwnPropertyDescriptor == "function") {
      var T = Object.getOwnPropertyDescriptor(o, l);
      if (T.value !== u || T.enumerable !== true) return false;
    }
    return true;
  };
})), _r = ce(((e, t) => {
  var r = mn();
  t.exports = function() {
    return r() && !!Symbol.toStringTag;
  };
})), wn = ce(((e, t) => {
  t.exports = Object;
})), Bi = ce(((e, t) => {
  t.exports = Error;
})), Li = ce(((e, t) => {
  t.exports = EvalError;
})), Mi = ce(((e, t) => {
  t.exports = RangeError;
})), Ui = ce(((e, t) => {
  t.exports = ReferenceError;
})), vn = ce(((e, t) => {
  t.exports = SyntaxError;
})), Wt = ce(((e, t) => {
  t.exports = TypeError;
})), ji = ce(((e, t) => {
  t.exports = URIError;
})), zi = ce(((e, t) => {
  t.exports = Math.abs;
})), Wi = ce(((e, t) => {
  t.exports = Math.floor;
})), Hi = ce(((e, t) => {
  t.exports = Math.max;
})), Ki = ce(((e, t) => {
  t.exports = Math.min;
})), Gi = ce(((e, t) => {
  t.exports = Math.pow;
})), qi = ce(((e, t) => {
  t.exports = Math.round;
})), Vi = ce(((e, t) => {
  t.exports = Number.isNaN || function(o) {
    return o !== o;
  };
})), $i = ce(((e, t) => {
  var r = Vi();
  t.exports = function(l) {
    return r(l) || l === 0 ? l : l < 0 ? -1 : 1;
  };
})), Xi = ce(((e, t) => {
  t.exports = Object.getOwnPropertyDescriptor;
})), Tt = ce(((e, t) => {
  var r = Xi();
  if (r) try {
    r([], "length");
  } catch {
    r = null;
  }
  t.exports = r;
})), Ht = ce(((e, t) => {
  var r = Object.defineProperty || false;
  if (r) try {
    r({}, "a", { value: 1 });
  } catch {
    r = false;
  }
  t.exports = r;
})), Zi = ce(((e, t) => {
  var r = typeof Symbol < "u" && Symbol, o = mn();
  t.exports = function() {
    return typeof r != "function" || typeof Symbol != "function" || typeof r("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? false : o();
  };
})), gn = ce(((e, t) => {
  t.exports = typeof Reflect < "u" && Reflect.getPrototypeOf || null;
})), yn = ce(((e, t) => {
  t.exports = wn().getPrototypeOf || null;
})), Yi = ce(((e, t) => {
  var r = "Function.prototype.bind called on incompatible ", o = Object.prototype.toString, l = Math.max, s = "[object Function]", u = function(E, g) {
    for (var N = [], w = 0; w < E.length; w += 1) N[w] = E[w];
    for (var m = 0; m < g.length; m += 1) N[m + E.length] = g[m];
    return N;
  }, a = function(E, g) {
    for (var N = [], w = g, m = 0; w < E.length; w += 1, m += 1) N[m] = E[w];
    return N;
  }, d = function(T, E) {
    for (var g = "", N = 0; N < T.length; N += 1) g += T[N], N + 1 < T.length && (g += E);
    return g;
  };
  t.exports = function(E) {
    var g = this;
    if (typeof g != "function" || o.apply(g) !== s) throw new TypeError(r + g);
    for (var N = a(arguments, 1), w, m = function() {
      if (this instanceof w) {
        var x = g.apply(this, u(N, arguments));
        return Object(x) === x ? x : this;
      }
      return g.apply(E, u(N, arguments));
    }, v = l(0, g.length - N.length), k = [], I = 0; I < v; I++) k[I] = "$" + I;
    if (w = Function("binder", "return function (" + d(k, ",") + "){ return binder.apply(this,arguments); }")(m), g.prototype) {
      var y = function() {
      };
      y.prototype = g.prototype, w.prototype = new y(), y.prototype = null;
    }
    return w;
  };
})), At = ce(((e, t) => {
  var r = Yi();
  t.exports = Function.prototype.bind || r;
})), xr = ce(((e, t) => {
  t.exports = Function.prototype.call;
})), Er = ce(((e, t) => {
  t.exports = Function.prototype.apply;
})), Ji = ce(((e, t) => {
  t.exports = typeof Reflect < "u" && Reflect && Reflect.apply;
})), bn = ce(((e, t) => {
  var r = At(), o = Er(), l = xr();
  t.exports = Ji() || r.call(l, o);
})), Sr = ce(((e, t) => {
  var r = At(), o = Wt(), l = xr(), s = bn();
  t.exports = function(a) {
    if (a.length < 1 || typeof a[0] != "function") throw new o("a function is required");
    return s(r, l, a);
  };
})), Qi = ce(((e, t) => {
  var r = Sr(), o = Tt(), l;
  try {
    l = [].__proto__ === Array.prototype;
  } catch (d) {
    if (!d || typeof d != "object" || !("code" in d) || d.code !== "ERR_PROTO_ACCESS") throw d;
  }
  var s = !!l && o && o(Object.prototype, "__proto__"), u = Object, a = u.getPrototypeOf;
  t.exports = s && typeof s.get == "function" ? r([s.get]) : typeof a == "function" ? function(T) {
    return a(T == null ? T : u(T));
  } : false;
})), _n = ce(((e, t) => {
  var r = gn(), o = yn(), l = Qi();
  t.exports = r ? function(u) {
    return r(u);
  } : o ? function(u) {
    if (!u || typeof u != "object" && typeof u != "function") throw new TypeError("getProto: not an object");
    return o(u);
  } : l ? function(u) {
    return l(u);
  } : null;
})), ea = ce(((e, t) => {
  var r = Function.prototype.call, o = Object.prototype.hasOwnProperty;
  t.exports = At().call(r, o);
})), xn = ce(((e, t) => {
  var r, o = wn(), l = Bi(), s = Li(), u = Mi(), a = Ui(), d = vn(), T = Wt(), E = ji(), g = zi(), N = Wi(), w = Hi(), m = Ki(), v = Gi(), k = qi(), I = $i(), y = Function, x = function(M) {
    try {
      return y('"use strict"; return (' + M + ").constructor;")();
    } catch {
    }
  }, A = Tt(), _ = Ht(), p = function() {
    throw new T();
  }, P = A ? (function() {
    try {
      return arguments.callee, p;
    } catch {
      try {
        return A(arguments, "callee").get;
      } catch {
        return p;
      }
    }
  })() : p, U = Zi()(), C = _n(), q = yn(), ee = gn(), O = Er(), W = xr(), S = {}, H = typeof Uint8Array > "u" || !C ? r : C(Uint8Array), J = { __proto__: null, "%AggregateError%": typeof AggregateError > "u" ? r : AggregateError, "%Array%": Array, "%ArrayBuffer%": typeof ArrayBuffer > "u" ? r : ArrayBuffer, "%ArrayIteratorPrototype%": U && C ? C([][Symbol.iterator]()) : r, "%AsyncFromSyncIteratorPrototype%": r, "%AsyncFunction%": S, "%AsyncGenerator%": S, "%AsyncGeneratorFunction%": S, "%AsyncIteratorPrototype%": S, "%Atomics%": typeof Atomics > "u" ? r : Atomics, "%BigInt%": typeof BigInt > "u" ? r : BigInt, "%BigInt64Array%": typeof BigInt64Array > "u" ? r : BigInt64Array, "%BigUint64Array%": typeof BigUint64Array > "u" ? r : BigUint64Array, "%Boolean%": Boolean, "%DataView%": typeof DataView > "u" ? r : DataView, "%Date%": Date, "%decodeURI%": decodeURI, "%decodeURIComponent%": decodeURIComponent, "%encodeURI%": encodeURI, "%encodeURIComponent%": encodeURIComponent, "%Error%": l, "%eval%": eval, "%EvalError%": s, "%Float16Array%": typeof Float16Array > "u" ? r : Float16Array, "%Float32Array%": typeof Float32Array > "u" ? r : Float32Array, "%Float64Array%": typeof Float64Array > "u" ? r : Float64Array, "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? r : FinalizationRegistry, "%Function%": y, "%GeneratorFunction%": S, "%Int8Array%": typeof Int8Array > "u" ? r : Int8Array, "%Int16Array%": typeof Int16Array > "u" ? r : Int16Array, "%Int32Array%": typeof Int32Array > "u" ? r : Int32Array, "%isFinite%": isFinite, "%isNaN%": isNaN, "%IteratorPrototype%": U && C ? C(C([][Symbol.iterator]())) : r, "%JSON%": typeof JSON == "object" ? JSON : r, "%Map%": typeof Map > "u" ? r : Map, "%MapIteratorPrototype%": typeof Map > "u" || !U || !C ? r : C((/* @__PURE__ */ new Map())[Symbol.iterator]()), "%Math%": Math, "%Number%": Number, "%Object%": o, "%Object.getOwnPropertyDescriptor%": A, "%parseFloat%": parseFloat, "%parseInt%": parseInt, "%Promise%": typeof Promise > "u" ? r : Promise, "%Proxy%": typeof Proxy > "u" ? r : Proxy, "%RangeError%": u, "%ReferenceError%": a, "%Reflect%": typeof Reflect > "u" ? r : Reflect, "%RegExp%": RegExp, "%Set%": typeof Set > "u" ? r : Set, "%SetIteratorPrototype%": typeof Set > "u" || !U || !C ? r : C((/* @__PURE__ */ new Set())[Symbol.iterator]()), "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? r : SharedArrayBuffer, "%String%": String, "%StringIteratorPrototype%": U && C ? C(""[Symbol.iterator]()) : r, "%Symbol%": U ? Symbol : r, "%SyntaxError%": d, "%ThrowTypeError%": P, "%TypedArray%": H, "%TypeError%": T, "%Uint8Array%": typeof Uint8Array > "u" ? r : Uint8Array, "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? r : Uint8ClampedArray, "%Uint16Array%": typeof Uint16Array > "u" ? r : Uint16Array, "%Uint32Array%": typeof Uint32Array > "u" ? r : Uint32Array, "%URIError%": E, "%WeakMap%": typeof WeakMap > "u" ? r : WeakMap, "%WeakRef%": typeof WeakRef > "u" ? r : WeakRef, "%WeakSet%": typeof WeakSet > "u" ? r : WeakSet, "%Function.prototype.call%": W, "%Function.prototype.apply%": O, "%Object.defineProperty%": _, "%Object.getPrototypeOf%": q, "%Math.abs%": g, "%Math.floor%": N, "%Math.max%": w, "%Math.min%": m, "%Math.pow%": v, "%Math.round%": k, "%Math.sign%": I, "%Reflect.getPrototypeOf%": ee };
  if (C) try {
    null.error;
  } catch (M) {
    J["%Error.prototype%"] = C(C(M));
  }
  var $ = function M(ie) {
    var D;
    if (ie === "%AsyncFunction%") D = x("async function () {}");
    else if (ie === "%GeneratorFunction%") D = x("function* () {}");
    else if (ie === "%AsyncGeneratorFunction%") D = x("async function* () {}");
    else if (ie === "%AsyncGenerator%") {
      var B = M("%AsyncGeneratorFunction%");
      B && (D = B.prototype);
    } else if (ie === "%AsyncIteratorPrototype%") {
      var c = M("%AsyncGenerator%");
      c && C && (D = C(c.prototype));
    }
    return J[ie] = D, D;
  }, oe = { __proto__: null, "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"], "%ArrayPrototype%": ["Array", "prototype"], "%ArrayProto_entries%": ["Array", "prototype", "entries"], "%ArrayProto_forEach%": ["Array", "prototype", "forEach"], "%ArrayProto_keys%": ["Array", "prototype", "keys"], "%ArrayProto_values%": ["Array", "prototype", "values"], "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"], "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"], "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"], "%BooleanPrototype%": ["Boolean", "prototype"], "%DataViewPrototype%": ["DataView", "prototype"], "%DatePrototype%": ["Date", "prototype"], "%ErrorPrototype%": ["Error", "prototype"], "%EvalErrorPrototype%": ["EvalError", "prototype"], "%Float32ArrayPrototype%": ["Float32Array", "prototype"], "%Float64ArrayPrototype%": ["Float64Array", "prototype"], "%FunctionPrototype%": ["Function", "prototype"], "%Generator%": ["GeneratorFunction", "prototype"], "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"], "%Int8ArrayPrototype%": ["Int8Array", "prototype"], "%Int16ArrayPrototype%": ["Int16Array", "prototype"], "%Int32ArrayPrototype%": ["Int32Array", "prototype"], "%JSONParse%": ["JSON", "parse"], "%JSONStringify%": ["JSON", "stringify"], "%MapPrototype%": ["Map", "prototype"], "%NumberPrototype%": ["Number", "prototype"], "%ObjectPrototype%": ["Object", "prototype"], "%ObjProto_toString%": ["Object", "prototype", "toString"], "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"], "%PromisePrototype%": ["Promise", "prototype"], "%PromiseProto_then%": ["Promise", "prototype", "then"], "%Promise_all%": ["Promise", "all"], "%Promise_reject%": ["Promise", "reject"], "%Promise_resolve%": ["Promise", "resolve"], "%RangeErrorPrototype%": ["RangeError", "prototype"], "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"], "%RegExpPrototype%": ["RegExp", "prototype"], "%SetPrototype%": ["Set", "prototype"], "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"], "%StringPrototype%": ["String", "prototype"], "%SymbolPrototype%": ["Symbol", "prototype"], "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"], "%TypedArrayPrototype%": ["TypedArray", "prototype"], "%TypeErrorPrototype%": ["TypeError", "prototype"], "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"], "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"], "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"], "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"], "%URIErrorPrototype%": ["URIError", "prototype"], "%WeakMapPrototype%": ["WeakMap", "prototype"], "%WeakSetPrototype%": ["WeakSet", "prototype"] }, Z = At(), re = ea(), V = Z.call(W, Array.prototype.concat), F = Z.call(O, Array.prototype.splice), X = Z.call(W, String.prototype.replace), Y = Z.call(W, String.prototype.slice), ne = Z.call(W, RegExp.prototype.exec), de = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, b = /\\(\\)?/g, h = function(ie) {
    var D = Y(ie, 0, 1), B = Y(ie, -1);
    if (D === "%" && B !== "%") throw new d("invalid intrinsic syntax, expected closing `%`");
    if (B === "%" && D !== "%") throw new d("invalid intrinsic syntax, expected opening `%`");
    var c = [];
    return X(ie, de, function(G, R, n, i) {
      c[c.length] = n ? X(i, b, "$1") : R || G;
    }), c;
  }, j = function(ie, D) {
    var B = ie, c;
    if (re(oe, B) && (c = oe[B], B = "%" + c[0] + "%"), re(J, B)) {
      var G = J[B];
      if (G === S && (G = $(B)), typeof G > "u" && !D) throw new T("intrinsic " + ie + " exists, but is not available. Please file an issue!");
      return { alias: c, name: B, value: G };
    }
    throw new d("intrinsic " + ie + " does not exist!");
  };
  t.exports = function(ie, D) {
    if (typeof ie != "string" || ie.length === 0) throw new T("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && typeof D != "boolean") throw new T('"allowMissing" argument must be a boolean');
    if (ne(/^%?[^%]*%?$/, ie) === null) throw new d("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var B = h(ie), c = B.length > 0 ? B[0] : "", G = j("%" + c + "%", D), R = G.name, n = G.value, i = false, f = G.alias;
    f && (c = f[0], F(B, V([0, 1], f)));
    for (var L = 1, K = true; L < B.length; L += 1) {
      var z = B[L], ae = Y(z, 0, 1), ue = Y(z, -1);
      if ((ae === '"' || ae === "'" || ae === "`" || ue === '"' || ue === "'" || ue === "`") && ae !== ue) throw new d("property names with quotes must have matching quotes");
      if ((z === "constructor" || !K) && (i = true), c += "." + z, R = "%" + c + "%", re(J, R)) n = J[R];
      else if (n != null) {
        if (!(z in n)) {
          if (!D) throw new T("base intrinsic for " + ie + " exists, but the property is not available.");
          return;
        }
        if (A && L + 1 >= B.length) {
          var se = A(n, z);
          K = !!se, K && "get" in se && !("originalValue" in se.get) ? n = se.get : n = n[z];
        } else K = re(n, z), n = n[z];
        K && !i && (J[R] = n);
      }
    }
    return n;
  };
})), En = ce(((e, t) => {
  var r = xn(), o = Sr(), l = o([r("%String.prototype.indexOf%")]);
  t.exports = function(u, a) {
    var d = r(u, !!a);
    return typeof d == "function" && l(u, ".prototype.") > -1 ? o([d]) : d;
  };
})), ta = ce(((e, t) => {
  var r = _r()(), o = En()("Object.prototype.toString"), l = function(d) {
    return r && d && typeof d == "object" && Symbol.toStringTag in d ? false : o(d) === "[object Arguments]";
  }, s = function(d) {
    return l(d) ? true : d !== null && typeof d == "object" && "length" in d && typeof d.length == "number" && d.length >= 0 && o(d) !== "[object Array]" && "callee" in d && o(d.callee) === "[object Function]";
  }, u = (function() {
    return l(arguments);
  })();
  l.isLegacyArguments = s, t.exports = u ? l : s;
})), ra = ce(((e, t) => {
  var r = Object.prototype.toString, o = Function.prototype.toString, l = /^\s*(?:function)?\*/, s = _r()(), u = Object.getPrototypeOf, a = function() {
    if (!s) return false;
    try {
      return Function("return function*() {}")();
    } catch {
    }
  }, d;
  t.exports = function(E) {
    if (typeof E != "function") return false;
    if (l.test(o.call(E))) return true;
    if (!s) return r.call(E) === "[object GeneratorFunction]";
    if (!u) return false;
    if (typeof d > "u") {
      var g = a();
      d = g ? u(g) : false;
    }
    return u(E) === d;
  };
})), na = ce(((e, t) => {
  var r = Function.prototype.toString, o = typeof Reflect == "object" && Reflect !== null && Reflect.apply, l, s;
  if (typeof o == "function" && typeof Object.defineProperty == "function") try {
    l = Object.defineProperty({}, "length", { get: function() {
      throw s;
    } }), s = {}, o(function() {
      throw 42;
    }, null, l);
  } catch (A) {
    A !== s && (o = null);
  }
  else o = null;
  var u = /^\s*class\b/, a = function(_) {
    try {
      var p = r.call(_);
      return u.test(p);
    } catch {
      return false;
    }
  }, d = function(_) {
    try {
      return a(_) ? false : (r.call(_), true);
    } catch {
      return false;
    }
  }, T = Object.prototype.toString, E = "[object Object]", g = "[object Function]", N = "[object GeneratorFunction]", w = "[object HTMLAllCollection]", m = "[object HTML document.all class]", v = "[object HTMLCollection]", k = typeof Symbol == "function" && !!Symbol.toStringTag, I = !(0 in [,]), y = function() {
    return false;
  };
  if (typeof document == "object") {
    var x = document.all;
    T.call(x) === T.call(document.all) && (y = function(_) {
      if ((I || !_) && (typeof _ > "u" || typeof _ == "object")) try {
        var p = T.call(_);
        return (p === w || p === m || p === v || p === E) && _("") == null;
      } catch {
      }
      return false;
    });
  }
  t.exports = o ? function(_) {
    if (y(_)) return true;
    if (!_ || typeof _ != "function" && typeof _ != "object") return false;
    try {
      o(_, null, l);
    } catch (p) {
      if (p !== s) return false;
    }
    return !a(_) && d(_);
  } : function(_) {
    if (y(_)) return true;
    if (!_ || typeof _ != "function" && typeof _ != "object") return false;
    if (k) return d(_);
    if (a(_)) return false;
    var p = T.call(_);
    return p !== g && p !== N && !/^\[object HTML/.test(p) ? false : d(_);
  };
})), ia = ce(((e, t) => {
  var r = na(), o = Object.prototype.toString, l = Object.prototype.hasOwnProperty, s = function(E, g, N) {
    for (var w = 0, m = E.length; w < m; w++) l.call(E, w) && (N == null ? g(E[w], w, E) : g.call(N, E[w], w, E));
  }, u = function(E, g, N) {
    for (var w = 0, m = E.length; w < m; w++) N == null ? g(E.charAt(w), w, E) : g.call(N, E.charAt(w), w, E);
  }, a = function(E, g, N) {
    for (var w in E) l.call(E, w) && (N == null ? g(E[w], w, E) : g.call(N, E[w], w, E));
  };
  function d(T) {
    return o.call(T) === "[object Array]";
  }
  t.exports = function(E, g, N) {
    if (!r(g)) throw new TypeError("iterator must be a function");
    var w;
    arguments.length >= 3 && (w = N), d(E) ? s(E, g, w) : typeof E == "string" ? u(E, g, w) : a(E, g, w);
  };
})), aa = ce(((e, t) => {
  t.exports = ["Float32Array", "Float64Array", "Int8Array", "Int16Array", "Int32Array", "Uint8Array", "Uint8ClampedArray", "Uint16Array", "Uint32Array", "BigInt64Array", "BigUint64Array"];
})), sa = ce(((e, t) => {
  ft();
  var r = aa(), o = typeof globalThis > "u" ? ke : globalThis;
  t.exports = function() {
    for (var s = [], u = 0; u < r.length; u++) typeof o[r[u]] == "function" && (s[s.length] = r[u]);
    return s;
  };
})), oa = ce(((e, t) => {
  var r = Ht(), o = vn(), l = Wt(), s = Tt();
  t.exports = function(a, d, T) {
    if (!a || typeof a != "object" && typeof a != "function") throw new l("`obj` must be an object or a function`");
    if (typeof d != "string" && typeof d != "symbol") throw new l("`property` must be a string or a symbol`");
    if (arguments.length > 3 && typeof arguments[3] != "boolean" && arguments[3] !== null) throw new l("`nonEnumerable`, if provided, must be a boolean or null");
    if (arguments.length > 4 && typeof arguments[4] != "boolean" && arguments[4] !== null) throw new l("`nonWritable`, if provided, must be a boolean or null");
    if (arguments.length > 5 && typeof arguments[5] != "boolean" && arguments[5] !== null) throw new l("`nonConfigurable`, if provided, must be a boolean or null");
    if (arguments.length > 6 && typeof arguments[6] != "boolean") throw new l("`loose`, if provided, must be a boolean");
    var E = arguments.length > 3 ? arguments[3] : null, g = arguments.length > 4 ? arguments[4] : null, N = arguments.length > 5 ? arguments[5] : null, w = arguments.length > 6 ? arguments[6] : false, m = !!s && s(a, d);
    if (r) r(a, d, { configurable: N === null && m ? m.configurable : !N, enumerable: E === null && m ? m.enumerable : !E, value: T, writable: g === null && m ? m.writable : !g });
    else if (w || !E && !g && !N) a[d] = T;
    else throw new o("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
  };
})), ua = ce(((e, t) => {
  var r = Ht(), o = function() {
    return !!r;
  };
  o.hasArrayLengthDefineBug = function() {
    if (!r) return null;
    try {
      return r([], "length", { value: 1 }).length !== 1;
    } catch {
      return true;
    }
  }, t.exports = o;
})), la = ce(((e, t) => {
  var r = xn(), o = oa(), l = ua()(), s = Tt(), u = Wt(), a = r("%Math.floor%");
  t.exports = function(T, E) {
    if (typeof T != "function") throw new u("`fn` is not a function");
    if (typeof E != "number" || E < 0 || E > 4294967295 || a(E) !== E) throw new u("`length` must be a positive 32-bit integer");
    var g = arguments.length > 2 && !!arguments[2], N = true, w = true;
    if ("length" in T && s) {
      var m = s(T, "length");
      m && !m.configurable && (N = false), m && !m.writable && (w = false);
    }
    return (N || w || !g) && (l ? o(T, "length", E, true, true) : o(T, "length", E)), T;
  };
})), ca = ce(((e, t) => {
  var r = At(), o = Er(), l = bn();
  t.exports = function() {
    return l(r, o, arguments);
  };
})), ha = ce(((e, t) => {
  var r = la(), o = Ht(), l = Sr(), s = ca();
  t.exports = function(a) {
    var d = l(arguments), T = a.length - (arguments.length - 1);
    return r(d, 1 + (T > 0 ? T : 0), true);
  }, o ? o(t.exports, "apply", { value: s }) : t.exports.apply = s;
})), Sn = ce(((e, t) => {
  ft();
  var r = ia(), o = sa(), l = ha(), s = En(), u = Tt(), a = _n(), d = s("Object.prototype.toString"), T = _r()(), E = typeof globalThis > "u" ? ke : globalThis, g = o(), N = s("String.prototype.slice"), w = s("Array.prototype.indexOf", true) || function(y, x) {
    for (var A = 0; A < y.length; A += 1) if (y[A] === x) return A;
    return -1;
  }, m = { __proto__: null };
  T && u && a ? r(g, function(I) {
    var y = new E[I]();
    if (Symbol.toStringTag in y && a) {
      var x = a(y), A = u(x, Symbol.toStringTag);
      !A && x && (A = u(a(x), Symbol.toStringTag)), m["$" + I] = l(A.get);
    }
  }) : r(g, function(I) {
    var y = new E[I](), x = y.slice || y.set;
    x && (m["$" + I] = l(x));
  });
  var v = function(y) {
    var x = false;
    return r(m, function(A, _) {
      if (!x) try {
        "$" + A(y) === _ && (x = N(_, 1));
      } catch {
      }
    }), x;
  }, k = function(y) {
    var x = false;
    return r(m, function(A, _) {
      if (!x) try {
        A(y), x = N(_, 1);
      } catch {
      }
    }), x;
  };
  t.exports = function(y) {
    if (!y || typeof y != "object") return false;
    if (!T) {
      var x = N(d(y), 8, -1);
      return w(g, x) > -1 ? x : x !== "Object" ? false : k(y);
    }
    return u ? v(y) : null;
  };
})), fa = ce(((e, t) => {
  var r = Sn();
  t.exports = function(l) {
    return !!r(l);
  };
})), da = ce(((e) => {
  var t = ta(), r = ra(), o = Sn(), l = fa();
  function s(f) {
    return f.call.bind(f);
  }
  var u = typeof BigInt < "u", a = typeof Symbol < "u", d = s(Object.prototype.toString), T = s(Number.prototype.valueOf), E = s(String.prototype.valueOf), g = s(Boolean.prototype.valueOf);
  if (u) var N = s(BigInt.prototype.valueOf);
  if (a) var w = s(Symbol.prototype.valueOf);
  function m(f, L) {
    if (typeof f != "object") return false;
    try {
      return L(f), true;
    } catch {
      return false;
    }
  }
  e.isArgumentsObject = t, e.isGeneratorFunction = r, e.isTypedArray = l;
  function v(f) {
    return typeof Promise < "u" && f instanceof Promise || f !== null && typeof f == "object" && typeof f.then == "function" && typeof f.catch == "function";
  }
  e.isPromise = v;
  function k(f) {
    return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? ArrayBuffer.isView(f) : l(f) || X(f);
  }
  e.isArrayBufferView = k;
  function I(f) {
    return o(f) === "Uint8Array";
  }
  e.isUint8Array = I;
  function y(f) {
    return o(f) === "Uint8ClampedArray";
  }
  e.isUint8ClampedArray = y;
  function x(f) {
    return o(f) === "Uint16Array";
  }
  e.isUint16Array = x;
  function A(f) {
    return o(f) === "Uint32Array";
  }
  e.isUint32Array = A;
  function _(f) {
    return o(f) === "Int8Array";
  }
  e.isInt8Array = _;
  function p(f) {
    return o(f) === "Int16Array";
  }
  e.isInt16Array = p;
  function P(f) {
    return o(f) === "Int32Array";
  }
  e.isInt32Array = P;
  function U(f) {
    return o(f) === "Float32Array";
  }
  e.isFloat32Array = U;
  function C(f) {
    return o(f) === "Float64Array";
  }
  e.isFloat64Array = C;
  function q(f) {
    return o(f) === "BigInt64Array";
  }
  e.isBigInt64Array = q;
  function ee(f) {
    return o(f) === "BigUint64Array";
  }
  e.isBigUint64Array = ee;
  function O(f) {
    return d(f) === "[object Map]";
  }
  O.working = typeof Map < "u" && O(/* @__PURE__ */ new Map());
  function W(f) {
    return typeof Map > "u" ? false : O.working ? O(f) : f instanceof Map;
  }
  e.isMap = W;
  function S(f) {
    return d(f) === "[object Set]";
  }
  S.working = typeof Set < "u" && S(/* @__PURE__ */ new Set());
  function H(f) {
    return typeof Set > "u" ? false : S.working ? S(f) : f instanceof Set;
  }
  e.isSet = H;
  function J(f) {
    return d(f) === "[object WeakMap]";
  }
  J.working = typeof WeakMap < "u" && J(/* @__PURE__ */ new WeakMap());
  function $(f) {
    return typeof WeakMap > "u" ? false : J.working ? J(f) : f instanceof WeakMap;
  }
  e.isWeakMap = $;
  function oe(f) {
    return d(f) === "[object WeakSet]";
  }
  oe.working = typeof WeakSet < "u" && oe(/* @__PURE__ */ new WeakSet());
  function Z(f) {
    return oe(f);
  }
  e.isWeakSet = Z;
  function re(f) {
    return d(f) === "[object ArrayBuffer]";
  }
  re.working = typeof ArrayBuffer < "u" && re(new ArrayBuffer());
  function V(f) {
    return typeof ArrayBuffer > "u" ? false : re.working ? re(f) : f instanceof ArrayBuffer;
  }
  e.isArrayBuffer = V;
  function F(f) {
    return d(f) === "[object DataView]";
  }
  F.working = typeof ArrayBuffer < "u" && typeof DataView < "u" && F(new DataView(new ArrayBuffer(1), 0, 1));
  function X(f) {
    return typeof DataView > "u" ? false : F.working ? F(f) : f instanceof DataView;
  }
  e.isDataView = X;
  var Y = typeof SharedArrayBuffer < "u" ? SharedArrayBuffer : void 0;
  function ne(f) {
    return d(f) === "[object SharedArrayBuffer]";
  }
  function de(f) {
    return typeof Y > "u" ? false : (typeof ne.working > "u" && (ne.working = ne(new Y())), ne.working ? ne(f) : f instanceof Y);
  }
  e.isSharedArrayBuffer = de;
  function b(f) {
    return d(f) === "[object AsyncFunction]";
  }
  e.isAsyncFunction = b;
  function h(f) {
    return d(f) === "[object Map Iterator]";
  }
  e.isMapIterator = h;
  function j(f) {
    return d(f) === "[object Set Iterator]";
  }
  e.isSetIterator = j;
  function M(f) {
    return d(f) === "[object Generator]";
  }
  e.isGeneratorObject = M;
  function ie(f) {
    return d(f) === "[object WebAssembly.Module]";
  }
  e.isWebAssemblyCompiledModule = ie;
  function D(f) {
    return m(f, T);
  }
  e.isNumberObject = D;
  function B(f) {
    return m(f, E);
  }
  e.isStringObject = B;
  function c(f) {
    return m(f, g);
  }
  e.isBooleanObject = c;
  function G(f) {
    return u && m(f, N);
  }
  e.isBigIntObject = G;
  function R(f) {
    return a && m(f, w);
  }
  e.isSymbolObject = R;
  function n(f) {
    return D(f) || B(f) || c(f) || G(f) || R(f);
  }
  e.isBoxedPrimitive = n;
  function i(f) {
    return typeof Uint8Array < "u" && (V(f) || de(f));
  }
  e.isAnyArrayBuffer = i, ["isProxy", "isExternal", "isModuleNamespaceObject"].forEach(function(f) {
    Object.defineProperty(e, f, { enumerable: false, value: function() {
      throw new Error(f + " is not supported in userland");
    } });
  });
})), pa = ce(((e, t) => {
  t.exports = function(o) {
    return o && typeof o == "object" && typeof o.copy == "function" && typeof o.fill == "function" && typeof o.readUInt8 == "function";
  };
})), Tn = ce(((e) => {
  qe();
  var t = Object.getOwnPropertyDescriptors || function(X) {
    for (var Y = Object.keys(X), ne = {}, de = 0; de < Y.length; de++) ne[Y[de]] = Object.getOwnPropertyDescriptor(X, Y[de]);
    return ne;
  }, r = /%[sdj%]/g;
  e.format = function(F) {
    if (!_(F)) {
      for (var X = [], Y = 0; Y < arguments.length; Y++) X.push(u(arguments[Y]));
      return X.join(" ");
    }
    for (var Y = 1, ne = arguments, de = ne.length, b = String(F).replace(r, function(j) {
      if (j === "%%") return "%";
      if (Y >= de) return j;
      switch (j) {
        case "%s":
          return String(ne[Y++]);
        case "%d":
          return Number(ne[Y++]);
        case "%j":
          try {
            return JSON.stringify(ne[Y++]);
          } catch {
            return "[Circular]";
          }
        default:
          return j;
      }
    }), h = ne[Y]; Y < de; h = ne[++Y]) y(h) || !C(h) ? b += " " + h : b += " " + u(h);
    return b;
  }, e.deprecate = function(F, X) {
    if (typeof ge < "u" && ge.noDeprecation === true) return F;
    if (typeof ge > "u") return function() {
      return e.deprecate(F, X).apply(this, arguments);
    };
    var Y = false;
    function ne() {
      if (!Y) {
        if (ge.throwDeprecation) throw new Error(X);
        ge.traceDeprecation ? console.trace(X) : console.error(X), Y = true;
      }
      return F.apply(this, arguments);
    }
    return ne;
  };
  var o = {}, l = /^$/;
  if (ge.env.NODE_DEBUG) {
    var s = ge.env.NODE_DEBUG;
    s = s.replace(/[|\\{}()[\]^$+?.]/g, "\\$&").replace(/\*/g, ".*").replace(/,/g, "$|^").toUpperCase(), l = new RegExp("^" + s + "$", "i");
  }
  e.debuglog = function(F) {
    if (F = F.toUpperCase(), !o[F]) if (l.test(F)) {
      var X = ge.pid;
      o[F] = function() {
        var Y = e.format.apply(e, arguments);
        console.error("%s %d: %s", F, X, Y);
      };
    } else o[F] = function() {
    };
    return o[F];
  };
  function u(F, X) {
    var Y = { seen: [], stylize: d };
    return arguments.length >= 3 && (Y.depth = arguments[2]), arguments.length >= 4 && (Y.colors = arguments[3]), I(X) ? Y.showHidden = X : X && e._extend(Y, X), P(Y.showHidden) && (Y.showHidden = false), P(Y.depth) && (Y.depth = 2), P(Y.colors) && (Y.colors = false), P(Y.customInspect) && (Y.customInspect = true), Y.colors && (Y.stylize = a), E(Y, F, Y.depth);
  }
  e.inspect = u, u.colors = { bold: [1, 22], italic: [3, 23], underline: [4, 24], inverse: [7, 27], white: [37, 39], grey: [90, 39], black: [30, 39], blue: [34, 39], cyan: [36, 39], green: [32, 39], magenta: [35, 39], red: [31, 39], yellow: [33, 39] }, u.styles = { special: "cyan", number: "yellow", boolean: "yellow", undefined: "grey", null: "bold", string: "green", date: "magenta", regexp: "red" };
  function a(F, X) {
    var Y = u.styles[X];
    return Y ? "\x1B[" + u.colors[Y][0] + "m" + F + "\x1B[" + u.colors[Y][1] + "m" : F;
  }
  function d(F, X) {
    return F;
  }
  function T(F) {
    var X = {};
    return F.forEach(function(Y, ne) {
      X[Y] = true;
    }), X;
  }
  function E(F, X, Y) {
    if (F.customInspect && X && O(X.inspect) && X.inspect !== e.inspect && !(X.constructor && X.constructor.prototype === X)) {
      var ne = X.inspect(Y, F);
      return _(ne) || (ne = E(F, ne, Y)), ne;
    }
    var de = g(F, X);
    if (de) return de;
    var b = Object.keys(X), h = T(b);
    if (F.showHidden && (b = Object.getOwnPropertyNames(X)), ee(X) && (b.indexOf("message") >= 0 || b.indexOf("description") >= 0)) return N(X);
    if (b.length === 0) {
      if (O(X)) {
        var j = X.name ? ": " + X.name : "";
        return F.stylize("[Function" + j + "]", "special");
      }
      if (U(X)) return F.stylize(RegExp.prototype.toString.call(X), "regexp");
      if (q(X)) return F.stylize(Date.prototype.toString.call(X), "date");
      if (ee(X)) return N(X);
    }
    var M = "", ie = false, D = ["{", "}"];
    if (k(X) && (ie = true, D = ["[", "]"]), O(X) && (M = " [Function" + (X.name ? ": " + X.name : "") + "]"), U(X) && (M = " " + RegExp.prototype.toString.call(X)), q(X) && (M = " " + Date.prototype.toUTCString.call(X)), ee(X) && (M = " " + N(X)), b.length === 0 && (!ie || X.length == 0)) return D[0] + M + D[1];
    if (Y < 0) return U(X) ? F.stylize(RegExp.prototype.toString.call(X), "regexp") : F.stylize("[Object]", "special");
    F.seen.push(X);
    var B;
    return ie ? B = w(F, X, Y, h, b) : B = b.map(function(c) {
      return m(F, X, Y, h, c, ie);
    }), F.seen.pop(), v(B, M, D);
  }
  function g(F, X) {
    if (P(X)) return F.stylize("undefined", "undefined");
    if (_(X)) {
      var Y = "'" + JSON.stringify(X).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
      return F.stylize(Y, "string");
    }
    if (A(X)) return F.stylize("" + X, "number");
    if (I(X)) return F.stylize("" + X, "boolean");
    if (y(X)) return F.stylize("null", "null");
  }
  function N(F) {
    return "[" + Error.prototype.toString.call(F) + "]";
  }
  function w(F, X, Y, ne, de) {
    for (var b = [], h = 0, j = X.length; h < j; ++h) oe(X, String(h)) ? b.push(m(F, X, Y, ne, String(h), true)) : b.push("");
    return de.forEach(function(M) {
      M.match(/^\d+$/) || b.push(m(F, X, Y, ne, M, true));
    }), b;
  }
  function m(F, X, Y, ne, de, b) {
    var h, j, M = Object.getOwnPropertyDescriptor(X, de) || { value: X[de] };
    if (M.get ? M.set ? j = F.stylize("[Getter/Setter]", "special") : j = F.stylize("[Getter]", "special") : M.set && (j = F.stylize("[Setter]", "special")), oe(ne, de) || (h = "[" + de + "]"), j || (F.seen.indexOf(M.value) < 0 ? (y(Y) ? j = E(F, M.value, null) : j = E(F, M.value, Y - 1), j.indexOf(`
`) > -1 && (b ? j = j.split(`
`).map(function(ie) {
      return "  " + ie;
    }).join(`
`).slice(2) : j = `
` + j.split(`
`).map(function(ie) {
      return "   " + ie;
    }).join(`
`))) : j = F.stylize("[Circular]", "special")), P(h)) {
      if (b && de.match(/^\d+$/)) return j;
      h = JSON.stringify("" + de), h.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (h = h.slice(1, -1), h = F.stylize(h, "name")) : (h = h.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), h = F.stylize(h, "string"));
    }
    return h + ": " + j;
  }
  function v(F, X, Y) {
    return F.reduce(function(ne, de) {
      return de.indexOf(`
`) >= 0, ne + de.replace(/\u001b\[\d\d?m/g, "").length + 1;
    }, 0) > 60 ? Y[0] + (X === "" ? "" : X + `
 `) + " " + F.join(`,
  `) + " " + Y[1] : Y[0] + X + " " + F.join(", ") + " " + Y[1];
  }
  e.types = da();
  function k(F) {
    return Array.isArray(F);
  }
  e.isArray = k;
  function I(F) {
    return typeof F == "boolean";
  }
  e.isBoolean = I;
  function y(F) {
    return F === null;
  }
  e.isNull = y;
  function x(F) {
    return F == null;
  }
  e.isNullOrUndefined = x;
  function A(F) {
    return typeof F == "number";
  }
  e.isNumber = A;
  function _(F) {
    return typeof F == "string";
  }
  e.isString = _;
  function p(F) {
    return typeof F == "symbol";
  }
  e.isSymbol = p;
  function P(F) {
    return F === void 0;
  }
  e.isUndefined = P;
  function U(F) {
    return C(F) && S(F) === "[object RegExp]";
  }
  e.isRegExp = U, e.types.isRegExp = U;
  function C(F) {
    return typeof F == "object" && F !== null;
  }
  e.isObject = C;
  function q(F) {
    return C(F) && S(F) === "[object Date]";
  }
  e.isDate = q, e.types.isDate = q;
  function ee(F) {
    return C(F) && (S(F) === "[object Error]" || F instanceof Error);
  }
  e.isError = ee, e.types.isNativeError = ee;
  function O(F) {
    return typeof F == "function";
  }
  e.isFunction = O;
  function W(F) {
    return F === null || typeof F == "boolean" || typeof F == "number" || typeof F == "string" || typeof F == "symbol" || typeof F > "u";
  }
  e.isPrimitive = W, e.isBuffer = pa();
  function S(F) {
    return Object.prototype.toString.call(F);
  }
  function H(F) {
    return F < 10 ? "0" + F.toString(10) : F.toString(10);
  }
  var J = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  function $() {
    var F = /* @__PURE__ */ new Date(), X = [H(F.getHours()), H(F.getMinutes()), H(F.getSeconds())].join(":");
    return [F.getDate(), J[F.getMonth()], X].join(" ");
  }
  e.log = function() {
    console.log("%s - %s", $(), e.format.apply(e, arguments));
  }, e.inherits = Ge(), e._extend = function(F, X) {
    if (!X || !C(X)) return F;
    for (var Y = Object.keys(X), ne = Y.length; ne--; ) F[Y[ne]] = X[Y[ne]];
    return F;
  };
  function oe(F, X) {
    return Object.prototype.hasOwnProperty.call(F, X);
  }
  var Z = typeof Symbol < "u" ? Symbol("util.promisify.custom") : void 0;
  e.promisify = function(X) {
    if (typeof X != "function") throw new TypeError('The "original" argument must be of type Function');
    if (Z && X[Z]) {
      var Y = X[Z];
      if (typeof Y != "function") throw new TypeError('The "util.promisify.custom" argument must be of type Function');
      return Object.defineProperty(Y, Z, { value: Y, enumerable: false, writable: false, configurable: true }), Y;
    }
    function Y() {
      for (var ne, de, b = new Promise(function(M, ie) {
        ne = M, de = ie;
      }), h = [], j = 0; j < arguments.length; j++) h.push(arguments[j]);
      h.push(function(M, ie) {
        M ? de(M) : ne(ie);
      });
      try {
        X.apply(this, h);
      } catch (M) {
        de(M);
      }
      return b;
    }
    return Object.setPrototypeOf(Y, Object.getPrototypeOf(X)), Z && Object.defineProperty(Y, Z, { value: Y, enumerable: false, writable: false, configurable: true }), Object.defineProperties(Y, t(X));
  }, e.promisify.custom = Z;
  function re(F, X) {
    if (!F) {
      var Y = new Error("Promise was rejected with a falsy value");
      Y.reason = F, F = Y;
    }
    return X(F);
  }
  function V(F) {
    if (typeof F != "function") throw new TypeError('The "original" argument must be of type Function');
    function X() {
      for (var Y = [], ne = 0; ne < arguments.length; ne++) Y.push(arguments[ne]);
      var de = Y.pop();
      if (typeof de != "function") throw new TypeError("The last argument must be of type Function");
      var b = this, h = function() {
        return de.apply(b, arguments);
      };
      F.apply(this, Y).then(function(j) {
        ge.nextTick(h.bind(null, null, j));
      }, function(j) {
        ge.nextTick(re.bind(null, j, h));
      });
    }
    return Object.setPrototypeOf(X, Object.getPrototypeOf(F)), Object.defineProperties(X, t(F)), X;
  }
  e.callbackify = V;
})), ma = ce(((e, t) => {
  function r(m, v) {
    var k = Object.keys(m);
    if (Object.getOwnPropertySymbols) {
      var I = Object.getOwnPropertySymbols(m);
      v && (I = I.filter(function(y) {
        return Object.getOwnPropertyDescriptor(m, y).enumerable;
      })), k.push.apply(k, I);
    }
    return k;
  }
  function o(m) {
    for (var v = 1; v < arguments.length; v++) {
      var k = arguments[v] != null ? arguments[v] : {};
      v % 2 ? r(Object(k), true).forEach(function(I) {
        l(m, I, k[I]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(m, Object.getOwnPropertyDescriptors(k)) : r(Object(k)).forEach(function(I) {
        Object.defineProperty(m, I, Object.getOwnPropertyDescriptor(k, I));
      });
    }
    return m;
  }
  function l(m, v, k) {
    return v = d(v), v in m ? Object.defineProperty(m, v, { value: k, enumerable: true, configurable: true, writable: true }) : m[v] = k, m;
  }
  function s(m, v) {
    if (!(m instanceof v)) throw new TypeError("Cannot call a class as a function");
  }
  function u(m, v) {
    for (var k = 0; k < v.length; k++) {
      var I = v[k];
      I.enumerable = I.enumerable || false, I.configurable = true, "value" in I && (I.writable = true), Object.defineProperty(m, d(I.key), I);
    }
  }
  function a(m, v, k) {
    return v && u(m.prototype, v), Object.defineProperty(m, "prototype", { writable: false }), m;
  }
  function d(m) {
    var v = T(m, "string");
    return typeof v == "symbol" ? v : String(v);
  }
  function T(m, v) {
    if (typeof m != "object" || m === null) return m;
    var k = m[Symbol.toPrimitive];
    if (k !== void 0) {
      var I = k.call(m, v);
      if (typeof I != "object") return I;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return String(m);
  }
  var E = zt().Buffer, g = Tn().inspect, N = g && g.custom || "inspect";
  function w(m, v, k) {
    E.prototype.copy.call(m, v, k);
  }
  t.exports = (function() {
    function m() {
      s(this, m), this.head = null, this.tail = null, this.length = 0;
    }
    return a(m, [{ key: "push", value: function(k) {
      var I = { data: k, next: null };
      this.length > 0 ? this.tail.next = I : this.head = I, this.tail = I, ++this.length;
    } }, { key: "unshift", value: function(k) {
      var I = { data: k, next: this.head };
      this.length === 0 && (this.tail = I), this.head = I, ++this.length;
    } }, { key: "shift", value: function() {
      if (this.length !== 0) {
        var k = this.head.data;
        return this.length === 1 ? this.head = this.tail = null : this.head = this.head.next, --this.length, k;
      }
    } }, { key: "clear", value: function() {
      this.head = this.tail = null, this.length = 0;
    } }, { key: "join", value: function(k) {
      if (this.length === 0) return "";
      for (var I = this.head, y = "" + I.data; I = I.next; ) y += k + I.data;
      return y;
    } }, { key: "concat", value: function(k) {
      if (this.length === 0) return E.alloc(0);
      for (var I = E.allocUnsafe(k >>> 0), y = this.head, x = 0; y; ) w(y.data, I, x), x += y.data.length, y = y.next;
      return I;
    } }, { key: "consume", value: function(k, I) {
      var y;
      return k < this.head.data.length ? (y = this.head.data.slice(0, k), this.head.data = this.head.data.slice(k)) : k === this.head.data.length ? y = this.shift() : y = I ? this._getString(k) : this._getBuffer(k), y;
    } }, { key: "first", value: function() {
      return this.head.data;
    } }, { key: "_getString", value: function(k) {
      var I = this.head, y = 1, x = I.data;
      for (k -= x.length; I = I.next; ) {
        var A = I.data, _ = k > A.length ? A.length : k;
        if (_ === A.length ? x += A : x += A.slice(0, k), k -= _, k === 0) {
          _ === A.length ? (++y, I.next ? this.head = I.next : this.head = this.tail = null) : (this.head = I, I.data = A.slice(_));
          break;
        }
        ++y;
      }
      return this.length -= y, x;
    } }, { key: "_getBuffer", value: function(k) {
      var I = E.allocUnsafe(k), y = this.head, x = 1;
      for (y.data.copy(I), k -= y.data.length; y = y.next; ) {
        var A = y.data, _ = k > A.length ? A.length : k;
        if (A.copy(I, I.length - k, 0, _), k -= _, k === 0) {
          _ === A.length ? (++x, y.next ? this.head = y.next : this.head = this.tail = null) : (this.head = y, y.data = A.slice(_));
          break;
        }
        ++x;
      }
      return this.length -= x, I;
    } }, { key: N, value: function(k, I) {
      return g(this, o(o({}, I), {}, { depth: 0, customInspect: false }));
    } }]), m;
  })();
})), An = ce(((e, t) => {
  qe();
  function r(d, T) {
    var E = this, g = this._readableState && this._readableState.destroyed, N = this._writableState && this._writableState.destroyed;
    return g || N ? (T ? T(d) : d && (this._writableState ? this._writableState.errorEmitted || (this._writableState.errorEmitted = true, ge.nextTick(u, this, d)) : ge.nextTick(u, this, d)), this) : (this._readableState && (this._readableState.destroyed = true), this._writableState && (this._writableState.destroyed = true), this._destroy(d || null, function(w) {
      !T && w ? E._writableState ? E._writableState.errorEmitted ? ge.nextTick(l, E) : (E._writableState.errorEmitted = true, ge.nextTick(o, E, w)) : ge.nextTick(o, E, w) : T ? (ge.nextTick(l, E), T(w)) : ge.nextTick(l, E);
    }), this);
  }
  function o(d, T) {
    u(d, T), l(d);
  }
  function l(d) {
    d._writableState && !d._writableState.emitClose || d._readableState && !d._readableState.emitClose || d.emit("close");
  }
  function s() {
    this._readableState && (this._readableState.destroyed = false, this._readableState.reading = false, this._readableState.ended = false, this._readableState.endEmitted = false), this._writableState && (this._writableState.destroyed = false, this._writableState.ended = false, this._writableState.ending = false, this._writableState.finalCalled = false, this._writableState.prefinished = false, this._writableState.finished = false, this._writableState.errorEmitted = false);
  }
  function u(d, T) {
    d.emit("error", T);
  }
  function a(d, T) {
    var E = d._readableState, g = d._writableState;
    E && E.autoDestroy || g && g.autoDestroy ? d.destroy(T) : d.emit("error", T);
  }
  t.exports = { destroy: r, undestroy: s, errorOrDestroy: a };
})), dt = ce(((e, t) => {
  function r(T, E) {
    T.prototype = Object.create(E.prototype), T.prototype.constructor = T, T.__proto__ = E;
  }
  var o = {};
  function l(T, E, g) {
    g || (g = Error);
    function N(m, v, k) {
      return typeof E == "string" ? E : E(m, v, k);
    }
    var w = (function(m) {
      r(v, m);
      function v(k, I, y) {
        return m.call(this, N(k, I, y)) || this;
      }
      return v;
    })(g);
    w.prototype.name = g.name, w.prototype.code = T, o[T] = w;
  }
  function s(T, E) {
    if (Array.isArray(T)) {
      var g = T.length;
      return T = T.map(function(N) {
        return String(N);
      }), g > 2 ? "one of ".concat(E, " ").concat(T.slice(0, g - 1).join(", "), ", or ") + T[g - 1] : g === 2 ? "one of ".concat(E, " ").concat(T[0], " or ").concat(T[1]) : "of ".concat(E, " ").concat(T[0]);
    } else return "of ".concat(E, " ").concat(String(T));
  }
  function u(T, E, g) {
    return T.substr(0, E.length) === E;
  }
  function a(T, E, g) {
    return (g === void 0 || g > T.length) && (g = T.length), T.substring(g - E.length, g) === E;
  }
  function d(T, E, g) {
    return typeof g != "number" && (g = 0), g + E.length > T.length ? false : T.indexOf(E, g) !== -1;
  }
  l("ERR_INVALID_OPT_VALUE", function(T, E) {
    return 'The value "' + E + '" is invalid for option "' + T + '"';
  }, TypeError), l("ERR_INVALID_ARG_TYPE", function(T, E, g) {
    var N;
    typeof E == "string" && u(E, "not ") ? (N = "must not be", E = E.replace(/^not /, "")) : N = "must be";
    var w;
    if (a(T, " argument")) w = "The ".concat(T, " ").concat(N, " ").concat(s(E, "type"));
    else {
      var m = d(T, ".") ? "property" : "argument";
      w = 'The "'.concat(T, '" ').concat(m, " ").concat(N, " ").concat(s(E, "type"));
    }
    return w += ". Received type ".concat(typeof g), w;
  }, TypeError), l("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF"), l("ERR_METHOD_NOT_IMPLEMENTED", function(T) {
    return "The " + T + " method is not implemented";
  }), l("ERR_STREAM_PREMATURE_CLOSE", "Premature close"), l("ERR_STREAM_DESTROYED", function(T) {
    return "Cannot call " + T + " after a stream was destroyed";
  }), l("ERR_MULTIPLE_CALLBACK", "Callback called multiple times"), l("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable"), l("ERR_STREAM_WRITE_AFTER_END", "write after end"), l("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError), l("ERR_UNKNOWN_ENCODING", function(T) {
    return "Unknown encoding: " + T;
  }, TypeError), l("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event"), t.exports.codes = o;
})), kn = ce(((e, t) => {
  var r = dt().codes.ERR_INVALID_OPT_VALUE;
  function o(s, u, a) {
    return s.highWaterMark != null ? s.highWaterMark : u ? s[a] : null;
  }
  function l(s, u, a, d) {
    var T = o(u, d, a);
    if (T != null) {
      if (!(isFinite(T) && Math.floor(T) === T) || T < 0) throw new r(d ? a : "highWaterMark", T);
      return Math.floor(T);
    }
    return s.objectMode ? 16 : 16 * 1024;
  }
  t.exports = { getHighWaterMark: l };
})), wa = ce(((e, t) => {
  ft(), t.exports = r;
  function r(l, s) {
    if (o("noDeprecation")) return l;
    var u = false;
    function a() {
      if (!u) {
        if (o("throwDeprecation")) throw new Error(s);
        o("traceDeprecation") ? console.trace(s) : console.warn(s), u = true;
      }
      return l.apply(this, arguments);
    }
    return a;
  }
  function o(l) {
    try {
      if (!ke.localStorage) return false;
    } catch {
      return false;
    }
    var s = ke.localStorage[l];
    return s == null ? false : String(s).toLowerCase() === "true";
  }
})), Rn = ce(((e, t) => {
  ft(), qe(), t.exports = C;
  function r(b) {
    var h = this;
    this.next = null, this.entry = null, this.finish = function() {
      de(h, b);
    };
  }
  var o;
  C.WritableState = P;
  var l = { deprecate: wa() }, s = pn(), u = zt().Buffer, a = (typeof ke < "u" ? ke : typeof window < "u" ? window : typeof self < "u" ? self : {}).Uint8Array || function() {
  };
  function d(b) {
    return u.from(b);
  }
  function T(b) {
    return u.isBuffer(b) || b instanceof a;
  }
  var E = An(), g = kn().getHighWaterMark, N = dt().codes, w = N.ERR_INVALID_ARG_TYPE, m = N.ERR_METHOD_NOT_IMPLEMENTED, v = N.ERR_MULTIPLE_CALLBACK, k = N.ERR_STREAM_CANNOT_PIPE, I = N.ERR_STREAM_DESTROYED, y = N.ERR_STREAM_NULL_VALUES, x = N.ERR_STREAM_WRITE_AFTER_END, A = N.ERR_UNKNOWN_ENCODING, _ = E.errorOrDestroy;
  Ge()(C, s);
  function p() {
  }
  function P(b, h, j) {
    o = o || ot(), b = b || {}, typeof j != "boolean" && (j = h instanceof o), this.objectMode = !!b.objectMode, j && (this.objectMode = this.objectMode || !!b.writableObjectMode), this.highWaterMark = g(this, b, "writableHighWaterMark", j), this.finalCalled = false, this.needDrain = false, this.ending = false, this.ended = false, this.finished = false, this.destroyed = false;
    var M = b.decodeStrings === false;
    this.decodeStrings = !M, this.defaultEncoding = b.defaultEncoding || "utf8", this.length = 0, this.writing = false, this.corked = 0, this.sync = true, this.bufferProcessing = false, this.onwrite = function(ie) {
      $(h, ie);
    }, this.writecb = null, this.writelen = 0, this.bufferedRequest = null, this.lastBufferedRequest = null, this.pendingcb = 0, this.prefinished = false, this.errorEmitted = false, this.emitClose = b.emitClose !== false, this.autoDestroy = !!b.autoDestroy, this.bufferedRequestCount = 0, this.corkedRequestsFree = new r(this);
  }
  P.prototype.getBuffer = function() {
    for (var h = this.bufferedRequest, j = []; h; ) j.push(h), h = h.next;
    return j;
  }, (function() {
    try {
      Object.defineProperty(P.prototype, "buffer", { get: l.deprecate(function() {
        return this.getBuffer();
      }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003") });
    } catch {
    }
  })();
  var U;
  typeof Symbol == "function" && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] == "function" ? (U = Function.prototype[Symbol.hasInstance], Object.defineProperty(C, Symbol.hasInstance, { value: function(h) {
    return U.call(this, h) ? true : this !== C ? false : h && h._writableState instanceof P;
  } })) : U = function(h) {
    return h instanceof this;
  };
  function C(b) {
    o = o || ot();
    var h = this instanceof o;
    if (!h && !U.call(C, this)) return new C(b);
    this._writableState = new P(b, this, h), this.writable = true, b && (typeof b.write == "function" && (this._write = b.write), typeof b.writev == "function" && (this._writev = b.writev), typeof b.destroy == "function" && (this._destroy = b.destroy), typeof b.final == "function" && (this._final = b.final)), s.call(this);
  }
  C.prototype.pipe = function() {
    _(this, new k());
  };
  function q(b, h) {
    var j = new x();
    _(b, j), ge.nextTick(h, j);
  }
  function ee(b, h, j, M) {
    var ie;
    return j === null ? ie = new y() : typeof j != "string" && !h.objectMode && (ie = new w("chunk", ["string", "Buffer"], j)), ie ? (_(b, ie), ge.nextTick(M, ie), false) : true;
  }
  C.prototype.write = function(b, h, j) {
    var M = this._writableState, ie = false, D = !M.objectMode && T(b);
    return D && !u.isBuffer(b) && (b = d(b)), typeof h == "function" && (j = h, h = null), D ? h = "buffer" : h || (h = M.defaultEncoding), typeof j != "function" && (j = p), M.ending ? q(this, j) : (D || ee(this, M, b, j)) && (M.pendingcb++, ie = W(this, M, D, b, h, j)), ie;
  }, C.prototype.cork = function() {
    this._writableState.corked++;
  }, C.prototype.uncork = function() {
    var b = this._writableState;
    b.corked && (b.corked--, !b.writing && !b.corked && !b.bufferProcessing && b.bufferedRequest && re(this, b));
  }, C.prototype.setDefaultEncoding = function(h) {
    if (typeof h == "string" && (h = h.toLowerCase()), !(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((h + "").toLowerCase()) > -1)) throw new A(h);
    return this._writableState.defaultEncoding = h, this;
  }, Object.defineProperty(C.prototype, "writableBuffer", { enumerable: false, get: function() {
    return this._writableState && this._writableState.getBuffer();
  } });
  function O(b, h, j) {
    return !b.objectMode && b.decodeStrings !== false && typeof h == "string" && (h = u.from(h, j)), h;
  }
  Object.defineProperty(C.prototype, "writableHighWaterMark", { enumerable: false, get: function() {
    return this._writableState.highWaterMark;
  } });
  function W(b, h, j, M, ie, D) {
    if (!j) {
      var B = O(h, M, ie);
      M !== B && (j = true, ie = "buffer", M = B);
    }
    var c = h.objectMode ? 1 : M.length;
    h.length += c;
    var G = h.length < h.highWaterMark;
    if (G || (h.needDrain = true), h.writing || h.corked) {
      var R = h.lastBufferedRequest;
      h.lastBufferedRequest = { chunk: M, encoding: ie, isBuf: j, callback: D, next: null }, R ? R.next = h.lastBufferedRequest : h.bufferedRequest = h.lastBufferedRequest, h.bufferedRequestCount += 1;
    } else S(b, h, false, c, M, ie, D);
    return G;
  }
  function S(b, h, j, M, ie, D, B) {
    h.writelen = M, h.writecb = B, h.writing = true, h.sync = true, h.destroyed ? h.onwrite(new I("write")) : j ? b._writev(ie, h.onwrite) : b._write(ie, D, h.onwrite), h.sync = false;
  }
  function H(b, h, j, M, ie) {
    --h.pendingcb, j ? (ge.nextTick(ie, M), ge.nextTick(Y, b, h), b._writableState.errorEmitted = true, _(b, M)) : (ie(M), b._writableState.errorEmitted = true, _(b, M), Y(b, h));
  }
  function J(b) {
    b.writing = false, b.writecb = null, b.length -= b.writelen, b.writelen = 0;
  }
  function $(b, h) {
    var j = b._writableState, M = j.sync, ie = j.writecb;
    if (typeof ie != "function") throw new v();
    if (J(j), h) H(b, j, M, h, ie);
    else {
      var D = V(j) || b.destroyed;
      !D && !j.corked && !j.bufferProcessing && j.bufferedRequest && re(b, j), M ? ge.nextTick(oe, b, j, D, ie) : oe(b, j, D, ie);
    }
  }
  function oe(b, h, j, M) {
    j || Z(b, h), h.pendingcb--, M(), Y(b, h);
  }
  function Z(b, h) {
    h.length === 0 && h.needDrain && (h.needDrain = false, b.emit("drain"));
  }
  function re(b, h) {
    h.bufferProcessing = true;
    var j = h.bufferedRequest;
    if (b._writev && j && j.next) {
      var M = h.bufferedRequestCount, ie = new Array(M), D = h.corkedRequestsFree;
      D.entry = j;
      for (var B = 0, c = true; j; ) ie[B] = j, j.isBuf || (c = false), j = j.next, B += 1;
      ie.allBuffers = c, S(b, h, true, h.length, ie, "", D.finish), h.pendingcb++, h.lastBufferedRequest = null, D.next ? (h.corkedRequestsFree = D.next, D.next = null) : h.corkedRequestsFree = new r(h), h.bufferedRequestCount = 0;
    } else {
      for (; j; ) {
        var G = j.chunk, R = j.encoding, n = j.callback;
        if (S(b, h, false, h.objectMode ? 1 : G.length, G, R, n), j = j.next, h.bufferedRequestCount--, h.writing) break;
      }
      j === null && (h.lastBufferedRequest = null);
    }
    h.bufferedRequest = j, h.bufferProcessing = false;
  }
  C.prototype._write = function(b, h, j) {
    j(new m("_write()"));
  }, C.prototype._writev = null, C.prototype.end = function(b, h, j) {
    var M = this._writableState;
    return typeof b == "function" ? (j = b, b = null, h = null) : typeof h == "function" && (j = h, h = null), b != null && this.write(b, h), M.corked && (M.corked = 1, this.uncork()), M.ending || ne(this, M, j), this;
  }, Object.defineProperty(C.prototype, "writableLength", { enumerable: false, get: function() {
    return this._writableState.length;
  } });
  function V(b) {
    return b.ending && b.length === 0 && b.bufferedRequest === null && !b.finished && !b.writing;
  }
  function F(b, h) {
    b._final(function(j) {
      h.pendingcb--, j && _(b, j), h.prefinished = true, b.emit("prefinish"), Y(b, h);
    });
  }
  function X(b, h) {
    !h.prefinished && !h.finalCalled && (typeof b._final == "function" && !h.destroyed ? (h.pendingcb++, h.finalCalled = true, ge.nextTick(F, b, h)) : (h.prefinished = true, b.emit("prefinish")));
  }
  function Y(b, h) {
    var j = V(h);
    if (j && (X(b, h), h.pendingcb === 0 && (h.finished = true, b.emit("finish"), h.autoDestroy))) {
      var M = b._readableState;
      (!M || M.autoDestroy && M.endEmitted) && b.destroy();
    }
    return j;
  }
  function ne(b, h, j) {
    h.ending = true, Y(b, h), j && (h.finished ? ge.nextTick(j) : b.once("finish", j)), h.ended = true, b.writable = false;
  }
  function de(b, h, j) {
    var M = b.entry;
    for (b.entry = null; M; ) {
      var ie = M.callback;
      h.pendingcb--, ie(j), M = M.next;
    }
    h.corkedRequestsFree.next = b;
  }
  Object.defineProperty(C.prototype, "destroyed", { enumerable: false, get: function() {
    return this._writableState === void 0 ? false : this._writableState.destroyed;
  }, set: function(h) {
    this._writableState && (this._writableState.destroyed = h);
  } }), C.prototype.destroy = E.destroy, C.prototype._undestroy = E.undestroy, C.prototype._destroy = function(b, h) {
    h(b);
  };
})), ot = ce(((e, t) => {
  qe();
  var r = Object.keys || function(g) {
    var N = [];
    for (var w in g) N.push(w);
    return N;
  };
  t.exports = d;
  var o = Cn(), l = Rn();
  Ge()(d, o);
  for (var s = r(l.prototype), u = 0; u < s.length; u++) {
    var a = s[u];
    d.prototype[a] || (d.prototype[a] = l.prototype[a]);
  }
  function d(g) {
    if (!(this instanceof d)) return new d(g);
    o.call(this, g), l.call(this, g), this.allowHalfOpen = true, g && (g.readable === false && (this.readable = false), g.writable === false && (this.writable = false), g.allowHalfOpen === false && (this.allowHalfOpen = false, this.once("end", T)));
  }
  Object.defineProperty(d.prototype, "writableHighWaterMark", { enumerable: false, get: function() {
    return this._writableState.highWaterMark;
  } }), Object.defineProperty(d.prototype, "writableBuffer", { enumerable: false, get: function() {
    return this._writableState && this._writableState.getBuffer();
  } }), Object.defineProperty(d.prototype, "writableLength", { enumerable: false, get: function() {
    return this._writableState.length;
  } });
  function T() {
    this._writableState.ended || ge.nextTick(E, this);
  }
  function E(g) {
    g.end();
  }
  Object.defineProperty(d.prototype, "destroyed", { enumerable: false, get: function() {
    return this._readableState === void 0 || this._writableState === void 0 ? false : this._readableState.destroyed && this._writableState.destroyed;
  }, set: function(N) {
    this._readableState === void 0 || this._writableState === void 0 || (this._readableState.destroyed = N, this._writableState.destroyed = N);
  } });
})), va = ce(((e, t) => {
  var r = zt(), o = r.Buffer;
  function l(u, a) {
    for (var d in u) a[d] = u[d];
  }
  o.from && o.alloc && o.allocUnsafe && o.allocUnsafeSlow ? t.exports = r : (l(r, e), e.Buffer = s);
  function s(u, a, d) {
    return o(u, a, d);
  }
  l(o, s), s.from = function(u, a, d) {
    if (typeof u == "number") throw new TypeError("Argument must not be a number");
    return o(u, a, d);
  }, s.alloc = function(u, a, d) {
    if (typeof u != "number") throw new TypeError("Argument must be a number");
    var T = o(u);
    return a !== void 0 ? typeof d == "string" ? T.fill(a, d) : T.fill(a) : T.fill(0), T;
  }, s.allocUnsafe = function(u) {
    if (typeof u != "number") throw new TypeError("Argument must be a number");
    return o(u);
  }, s.allocUnsafeSlow = function(u) {
    if (typeof u != "number") throw new TypeError("Argument must be a number");
    return r.SlowBuffer(u);
  };
})), mr = ce(((e) => {
  var t = va().Buffer, r = t.isEncoding || function(y) {
    switch (y = "" + y, y && y.toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
      case "raw":
        return true;
      default:
        return false;
    }
  };
  function o(y) {
    if (!y) return "utf8";
    for (var x; ; ) switch (y) {
      case "utf8":
      case "utf-8":
        return "utf8";
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return "utf16le";
      case "latin1":
      case "binary":
        return "latin1";
      case "base64":
      case "ascii":
      case "hex":
        return y;
      default:
        if (x) return;
        y = ("" + y).toLowerCase(), x = true;
    }
  }
  function l(y) {
    var x = o(y);
    if (typeof x != "string" && (t.isEncoding === r || !r(y))) throw new Error("Unknown encoding: " + y);
    return x || y;
  }
  e.StringDecoder = s;
  function s(y) {
    this.encoding = l(y);
    var x;
    switch (this.encoding) {
      case "utf16le":
        this.text = N, this.end = w, x = 4;
        break;
      case "utf8":
        this.fillLast = T, x = 4;
        break;
      case "base64":
        this.text = m, this.end = v, x = 3;
        break;
      default:
        this.write = k, this.end = I;
        return;
    }
    this.lastNeed = 0, this.lastTotal = 0, this.lastChar = t.allocUnsafe(x);
  }
  s.prototype.write = function(y) {
    if (y.length === 0) return "";
    var x, A;
    if (this.lastNeed) {
      if (x = this.fillLast(y), x === void 0) return "";
      A = this.lastNeed, this.lastNeed = 0;
    } else A = 0;
    return A < y.length ? x ? x + this.text(y, A) : this.text(y, A) : x || "";
  }, s.prototype.end = g, s.prototype.text = E, s.prototype.fillLast = function(y) {
    if (this.lastNeed <= y.length) return y.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
    y.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, y.length), this.lastNeed -= y.length;
  };
  function u(y) {
    return y <= 127 ? 0 : y >> 5 === 6 ? 2 : y >> 4 === 14 ? 3 : y >> 3 === 30 ? 4 : y >> 6 === 2 ? -1 : -2;
  }
  function a(y, x, A) {
    var _ = x.length - 1;
    if (_ < A) return 0;
    var p = u(x[_]);
    return p >= 0 ? (p > 0 && (y.lastNeed = p - 1), p) : --_ < A || p === -2 ? 0 : (p = u(x[_]), p >= 0 ? (p > 0 && (y.lastNeed = p - 2), p) : --_ < A || p === -2 ? 0 : (p = u(x[_]), p >= 0 ? (p > 0 && (p === 2 ? p = 0 : y.lastNeed = p - 3), p) : 0));
  }
  function d(y, x, A) {
    if ((x[0] & 192) !== 128) return y.lastNeed = 0, "\uFFFD";
    if (y.lastNeed > 1 && x.length > 1) {
      if ((x[1] & 192) !== 128) return y.lastNeed = 1, "\uFFFD";
      if (y.lastNeed > 2 && x.length > 2 && (x[2] & 192) !== 128) return y.lastNeed = 2, "\uFFFD";
    }
  }
  function T(y) {
    var x = this.lastTotal - this.lastNeed, A = d(this, y);
    if (A !== void 0) return A;
    if (this.lastNeed <= y.length) return y.copy(this.lastChar, x, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
    y.copy(this.lastChar, x, 0, y.length), this.lastNeed -= y.length;
  }
  function E(y, x) {
    var A = a(this, y, x);
    if (!this.lastNeed) return y.toString("utf8", x);
    this.lastTotal = A;
    var _ = y.length - (A - this.lastNeed);
    return y.copy(this.lastChar, 0, _), y.toString("utf8", x, _);
  }
  function g(y) {
    var x = y && y.length ? this.write(y) : "";
    return this.lastNeed ? x + "\uFFFD" : x;
  }
  function N(y, x) {
    if ((y.length - x) % 2 === 0) {
      var A = y.toString("utf16le", x);
      if (A) {
        var _ = A.charCodeAt(A.length - 1);
        if (_ >= 55296 && _ <= 56319) return this.lastNeed = 2, this.lastTotal = 4, this.lastChar[0] = y[y.length - 2], this.lastChar[1] = y[y.length - 1], A.slice(0, -1);
      }
      return A;
    }
    return this.lastNeed = 1, this.lastTotal = 2, this.lastChar[0] = y[y.length - 1], y.toString("utf16le", x, y.length - 1);
  }
  function w(y) {
    var x = y && y.length ? this.write(y) : "";
    if (this.lastNeed) {
      var A = this.lastTotal - this.lastNeed;
      return x + this.lastChar.toString("utf16le", 0, A);
    }
    return x;
  }
  function m(y, x) {
    var A = (y.length - x) % 3;
    return A === 0 ? y.toString("base64", x) : (this.lastNeed = 3 - A, this.lastTotal = 3, A === 1 ? this.lastChar[0] = y[y.length - 1] : (this.lastChar[0] = y[y.length - 2], this.lastChar[1] = y[y.length - 1]), y.toString("base64", x, y.length - A));
  }
  function v(y) {
    var x = y && y.length ? this.write(y) : "";
    return this.lastNeed ? x + this.lastChar.toString("base64", 0, 3 - this.lastNeed) : x;
  }
  function k(y) {
    return y.toString(this.encoding);
  }
  function I(y) {
    return y && y.length ? this.write(y) : "";
  }
})), Tr = ce(((e, t) => {
  var r = dt().codes.ERR_STREAM_PREMATURE_CLOSE;
  function o(a) {
    var d = false;
    return function() {
      if (!d) {
        d = true;
        for (var T = arguments.length, E = new Array(T), g = 0; g < T; g++) E[g] = arguments[g];
        a.apply(this, E);
      }
    };
  }
  function l() {
  }
  function s(a) {
    return a.setHeader && typeof a.abort == "function";
  }
  function u(a, d, T) {
    if (typeof d == "function") return u(a, null, d);
    d || (d = {}), T = o(T || l);
    var E = d.readable || d.readable !== false && a.readable, g = d.writable || d.writable !== false && a.writable, N = function() {
      a.writable || m();
    }, w = a._writableState && a._writableState.finished, m = function() {
      g = false, w = true, E || T.call(a);
    }, v = a._readableState && a._readableState.endEmitted, k = function() {
      E = false, v = true, g || T.call(a);
    }, I = function(_) {
      T.call(a, _);
    }, y = function() {
      var _;
      if (E && !v) return (!a._readableState || !a._readableState.ended) && (_ = new r()), T.call(a, _);
      if (g && !w) return (!a._writableState || !a._writableState.ended) && (_ = new r()), T.call(a, _);
    }, x = function() {
      a.req.on("finish", m);
    };
    return s(a) ? (a.on("complete", m), a.on("abort", y), a.req ? x() : a.on("request", x)) : g && !a._writableState && (a.on("end", N), a.on("close", N)), a.on("end", k), a.on("finish", m), d.error !== false && a.on("error", I), a.on("close", y), function() {
      a.removeListener("complete", m), a.removeListener("abort", y), a.removeListener("request", x), a.req && a.req.removeListener("finish", m), a.removeListener("end", N), a.removeListener("close", N), a.removeListener("finish", m), a.removeListener("end", k), a.removeListener("error", I), a.removeListener("close", y);
    };
  }
  t.exports = u;
})), ga = ce(((e, t) => {
  qe();
  var r;
  function o(A, _, p) {
    return _ = l(_), _ in A ? Object.defineProperty(A, _, { value: p, enumerable: true, configurable: true, writable: true }) : A[_] = p, A;
  }
  function l(A) {
    var _ = s(A, "string");
    return typeof _ == "symbol" ? _ : String(_);
  }
  function s(A, _) {
    if (typeof A != "object" || A === null) return A;
    var p = A[Symbol.toPrimitive];
    if (p !== void 0) {
      var P = p.call(A, _);
      if (typeof P != "object") return P;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (_ === "string" ? String : Number)(A);
  }
  var u = Tr(), a = Symbol("lastResolve"), d = Symbol("lastReject"), T = Symbol("error"), E = Symbol("ended"), g = Symbol("lastPromise"), N = Symbol("handlePromise"), w = Symbol("stream");
  function m(A, _) {
    return { value: A, done: _ };
  }
  function v(A) {
    var _ = A[a];
    if (_ !== null) {
      var p = A[w].read();
      p !== null && (A[g] = null, A[a] = null, A[d] = null, _(m(p, false)));
    }
  }
  function k(A) {
    ge.nextTick(v, A);
  }
  function I(A, _) {
    return function(p, P) {
      A.then(function() {
        if (_[E]) {
          p(m(void 0, true));
          return;
        }
        _[N](p, P);
      }, P);
    };
  }
  var y = Object.getPrototypeOf(function() {
  }), x = Object.setPrototypeOf((r = { get stream() {
    return this[w];
  }, next: function() {
    var _ = this, p = this[T];
    if (p !== null) return Promise.reject(p);
    if (this[E]) return Promise.resolve(m(void 0, true));
    if (this[w].destroyed) return new Promise(function(q, ee) {
      ge.nextTick(function() {
        _[T] ? ee(_[T]) : q(m(void 0, true));
      });
    });
    var P = this[g], U;
    if (P) U = new Promise(I(P, this));
    else {
      var C = this[w].read();
      if (C !== null) return Promise.resolve(m(C, false));
      U = new Promise(this[N]);
    }
    return this[g] = U, U;
  } }, o(r, Symbol.asyncIterator, function() {
    return this;
  }), o(r, "return", function() {
    var _ = this;
    return new Promise(function(p, P) {
      _[w].destroy(null, function(U) {
        if (U) {
          P(U);
          return;
        }
        p(m(void 0, true));
      });
    });
  }), r), y);
  t.exports = function(_) {
    var p, P = Object.create(x, (p = {}, o(p, w, { value: _, writable: true }), o(p, a, { value: null, writable: true }), o(p, d, { value: null, writable: true }), o(p, T, { value: null, writable: true }), o(p, E, { value: _._readableState.endEmitted, writable: true }), o(p, N, { value: function(C, q) {
      var ee = P[w].read();
      ee ? (P[g] = null, P[a] = null, P[d] = null, C(m(ee, false))) : (P[a] = C, P[d] = q);
    }, writable: true }), p));
    return P[g] = null, u(_, function(U) {
      if (U && U.code !== "ERR_STREAM_PREMATURE_CLOSE") {
        var C = P[d];
        C !== null && (P[g] = null, P[a] = null, P[d] = null, C(U)), P[T] = U;
        return;
      }
      var q = P[a];
      q !== null && (P[g] = null, P[a] = null, P[d] = null, q(m(void 0, true))), P[E] = true;
    }), _.on("readable", k.bind(null, P)), P;
  };
})), ya = ce(((e, t) => {
  t.exports = function() {
    throw new Error("Readable.from is not available in the browser");
  };
})), Cn = ce(((e, t) => {
  ft(), qe(), t.exports = q;
  var r;
  q.ReadableState = C, br().EventEmitter;
  var o = function(B, c) {
    return B.listeners(c).length;
  }, l = pn(), s = zt().Buffer, u = (typeof ke < "u" ? ke : typeof window < "u" ? window : typeof self < "u" ? self : {}).Uint8Array || function() {
  };
  function a(D) {
    return s.from(D);
  }
  function d(D) {
    return s.isBuffer(D) || D instanceof u;
  }
  var T = Tn(), E;
  T && T.debuglog ? E = T.debuglog("stream") : E = function() {
  };
  var g = ma(), N = An(), w = kn().getHighWaterMark, m = dt().codes, v = m.ERR_INVALID_ARG_TYPE, k = m.ERR_STREAM_PUSH_AFTER_EOF, I = m.ERR_METHOD_NOT_IMPLEMENTED, y = m.ERR_STREAM_UNSHIFT_AFTER_END_EVENT, x, A, _;
  Ge()(q, l);
  var p = N.errorOrDestroy, P = ["error", "close", "destroy", "pause", "resume"];
  function U(D, B, c) {
    if (typeof D.prependListener == "function") return D.prependListener(B, c);
    !D._events || !D._events[B] ? D.on(B, c) : Array.isArray(D._events[B]) ? D._events[B].unshift(c) : D._events[B] = [c, D._events[B]];
  }
  function C(D, B, c) {
    r = r || ot(), D = D || {}, typeof c != "boolean" && (c = B instanceof r), this.objectMode = !!D.objectMode, c && (this.objectMode = this.objectMode || !!D.readableObjectMode), this.highWaterMark = w(this, D, "readableHighWaterMark", c), this.buffer = new g(), this.length = 0, this.pipes = null, this.pipesCount = 0, this.flowing = null, this.ended = false, this.endEmitted = false, this.reading = false, this.sync = true, this.needReadable = false, this.emittedReadable = false, this.readableListening = false, this.resumeScheduled = false, this.paused = true, this.emitClose = D.emitClose !== false, this.autoDestroy = !!D.autoDestroy, this.destroyed = false, this.defaultEncoding = D.defaultEncoding || "utf8", this.awaitDrain = 0, this.readingMore = false, this.decoder = null, this.encoding = null, D.encoding && (x || (x = mr().StringDecoder), this.decoder = new x(D.encoding), this.encoding = D.encoding);
  }
  function q(D) {
    if (r = r || ot(), !(this instanceof q)) return new q(D);
    var B = this instanceof r;
    this._readableState = new C(D, this, B), this.readable = true, D && (typeof D.read == "function" && (this._read = D.read), typeof D.destroy == "function" && (this._destroy = D.destroy)), l.call(this);
  }
  Object.defineProperty(q.prototype, "destroyed", { enumerable: false, get: function() {
    return this._readableState === void 0 ? false : this._readableState.destroyed;
  }, set: function(B) {
    this._readableState && (this._readableState.destroyed = B);
  } }), q.prototype.destroy = N.destroy, q.prototype._undestroy = N.undestroy, q.prototype._destroy = function(D, B) {
    B(D);
  }, q.prototype.push = function(D, B) {
    var c = this._readableState, G;
    return c.objectMode ? G = true : typeof D == "string" && (B = B || c.defaultEncoding, B !== c.encoding && (D = s.from(D, B), B = ""), G = true), ee(this, D, B, false, G);
  }, q.prototype.unshift = function(D) {
    return ee(this, D, null, true, false);
  };
  function ee(D, B, c, G, R) {
    E("readableAddChunk", B);
    var n = D._readableState;
    if (B === null) n.reading = false, $(D, n);
    else {
      var i;
      if (R || (i = W(n, B)), i) p(D, i);
      else if (n.objectMode || B && B.length > 0) if (typeof B != "string" && !n.objectMode && Object.getPrototypeOf(B) !== s.prototype && (B = a(B)), G) n.endEmitted ? p(D, new y()) : O(D, n, B, true);
      else if (n.ended) p(D, new k());
      else {
        if (n.destroyed) return false;
        n.reading = false, n.decoder && !c ? (B = n.decoder.write(B), n.objectMode || B.length !== 0 ? O(D, n, B, false) : re(D, n)) : O(D, n, B, false);
      }
      else G || (n.reading = false, re(D, n));
    }
    return !n.ended && (n.length < n.highWaterMark || n.length === 0);
  }
  function O(D, B, c, G) {
    B.flowing && B.length === 0 && !B.sync ? (B.awaitDrain = 0, D.emit("data", c)) : (B.length += B.objectMode ? 1 : c.length, G ? B.buffer.unshift(c) : B.buffer.push(c), B.needReadable && oe(D)), re(D, B);
  }
  function W(D, B) {
    var c;
    return !d(B) && typeof B != "string" && B !== void 0 && !D.objectMode && (c = new v("chunk", ["string", "Buffer", "Uint8Array"], B)), c;
  }
  q.prototype.isPaused = function() {
    return this._readableState.flowing === false;
  }, q.prototype.setEncoding = function(D) {
    x || (x = mr().StringDecoder);
    var B = new x(D);
    this._readableState.decoder = B, this._readableState.encoding = this._readableState.decoder.encoding;
    for (var c = this._readableState.buffer.head, G = ""; c !== null; ) G += B.write(c.data), c = c.next;
    return this._readableState.buffer.clear(), G !== "" && this._readableState.buffer.push(G), this._readableState.length = G.length, this;
  };
  var S = 1073741824;
  function H(D) {
    return D >= S ? D = S : (D--, D |= D >>> 1, D |= D >>> 2, D |= D >>> 4, D |= D >>> 8, D |= D >>> 16, D++), D;
  }
  function J(D, B) {
    return D <= 0 || B.length === 0 && B.ended ? 0 : B.objectMode ? 1 : D !== D ? B.flowing && B.length ? B.buffer.head.data.length : B.length : (D > B.highWaterMark && (B.highWaterMark = H(D)), D <= B.length ? D : B.ended ? B.length : (B.needReadable = true, 0));
  }
  q.prototype.read = function(D) {
    E("read", D), D = parseInt(D, 10);
    var B = this._readableState, c = D;
    if (D !== 0 && (B.emittedReadable = false), D === 0 && B.needReadable && ((B.highWaterMark !== 0 ? B.length >= B.highWaterMark : B.length > 0) || B.ended)) return E("read: emitReadable", B.length, B.ended), B.length === 0 && B.ended ? j(this) : oe(this), null;
    if (D = J(D, B), D === 0 && B.ended) return B.length === 0 && j(this), null;
    var G = B.needReadable;
    E("need readable", G), (B.length === 0 || B.length - D < B.highWaterMark) && (G = true, E("length less than watermark", G)), B.ended || B.reading ? (G = false, E("reading or ended", G)) : G && (E("do read"), B.reading = true, B.sync = true, B.length === 0 && (B.needReadable = true), this._read(B.highWaterMark), B.sync = false, B.reading || (D = J(c, B)));
    var R;
    return D > 0 ? R = h(D, B) : R = null, R === null ? (B.needReadable = B.length <= B.highWaterMark, D = 0) : (B.length -= D, B.awaitDrain = 0), B.length === 0 && (B.ended || (B.needReadable = true), c !== D && B.ended && j(this)), R !== null && this.emit("data", R), R;
  };
  function $(D, B) {
    if (E("onEofChunk"), !B.ended) {
      if (B.decoder) {
        var c = B.decoder.end();
        c && c.length && (B.buffer.push(c), B.length += B.objectMode ? 1 : c.length);
      }
      B.ended = true, B.sync ? oe(D) : (B.needReadable = false, B.emittedReadable || (B.emittedReadable = true, Z(D)));
    }
  }
  function oe(D) {
    var B = D._readableState;
    E("emitReadable", B.needReadable, B.emittedReadable), B.needReadable = false, B.emittedReadable || (E("emitReadable", B.flowing), B.emittedReadable = true, ge.nextTick(Z, D));
  }
  function Z(D) {
    var B = D._readableState;
    E("emitReadable_", B.destroyed, B.length, B.ended), !B.destroyed && (B.length || B.ended) && (D.emit("readable"), B.emittedReadable = false), B.needReadable = !B.flowing && !B.ended && B.length <= B.highWaterMark, b(D);
  }
  function re(D, B) {
    B.readingMore || (B.readingMore = true, ge.nextTick(V, D, B));
  }
  function V(D, B) {
    for (; !B.reading && !B.ended && (B.length < B.highWaterMark || B.flowing && B.length === 0); ) {
      var c = B.length;
      if (E("maybeReadMore read 0"), D.read(0), c === B.length) break;
    }
    B.readingMore = false;
  }
  q.prototype._read = function(D) {
    p(this, new I("_read()"));
  }, q.prototype.pipe = function(D, B) {
    var c = this, G = this._readableState;
    switch (G.pipesCount) {
      case 0:
        G.pipes = D;
        break;
      case 1:
        G.pipes = [G.pipes, D];
        break;
      default:
        G.pipes.push(D);
        break;
    }
    G.pipesCount += 1, E("pipe count=%d opts=%j", G.pipesCount, B);
    var R = (!B || B.end !== false) && D !== ge.stdout && D !== ge.stderr ? i : fe;
    G.endEmitted ? ge.nextTick(R) : c.once("end", R), D.on("unpipe", n);
    function n(me, ve) {
      E("onunpipe"), me === c && ve && ve.hasUnpiped === false && (ve.hasUnpiped = true, K());
    }
    function i() {
      E("onend"), D.end();
    }
    var f = F(c);
    D.on("drain", f);
    var L = false;
    function K() {
      E("cleanup"), D.removeListener("close", ue), D.removeListener("finish", se), D.removeListener("drain", f), D.removeListener("error", ae), D.removeListener("unpipe", n), c.removeListener("end", i), c.removeListener("end", fe), c.removeListener("data", z), L = true, G.awaitDrain && (!D._writableState || D._writableState.needDrain) && f();
    }
    c.on("data", z);
    function z(me) {
      E("ondata");
      var ve = D.write(me);
      E("dest.write", ve), ve === false && ((G.pipesCount === 1 && G.pipes === D || G.pipesCount > 1 && ie(G.pipes, D) !== -1) && !L && (E("false write response, pause", G.awaitDrain), G.awaitDrain++), c.pause());
    }
    function ae(me) {
      E("onerror", me), fe(), D.removeListener("error", ae), o(D, "error") === 0 && p(D, me);
    }
    U(D, "error", ae);
    function ue() {
      D.removeListener("finish", se), fe();
    }
    D.once("close", ue);
    function se() {
      E("onfinish"), D.removeListener("close", ue), fe();
    }
    D.once("finish", se);
    function fe() {
      E("unpipe"), c.unpipe(D);
    }
    return D.emit("pipe", c), G.flowing || (E("pipe resume"), c.resume()), D;
  };
  function F(D) {
    return function() {
      var c = D._readableState;
      E("pipeOnDrain", c.awaitDrain), c.awaitDrain && c.awaitDrain--, c.awaitDrain === 0 && o(D, "data") && (c.flowing = true, b(D));
    };
  }
  q.prototype.unpipe = function(D) {
    var B = this._readableState, c = { hasUnpiped: false };
    if (B.pipesCount === 0) return this;
    if (B.pipesCount === 1) return D && D !== B.pipes ? this : (D || (D = B.pipes), B.pipes = null, B.pipesCount = 0, B.flowing = false, D && D.emit("unpipe", this, c), this);
    if (!D) {
      var G = B.pipes, R = B.pipesCount;
      B.pipes = null, B.pipesCount = 0, B.flowing = false;
      for (var n = 0; n < R; n++) G[n].emit("unpipe", this, { hasUnpiped: false });
      return this;
    }
    var i = ie(B.pipes, D);
    return i === -1 ? this : (B.pipes.splice(i, 1), B.pipesCount -= 1, B.pipesCount === 1 && (B.pipes = B.pipes[0]), D.emit("unpipe", this, c), this);
  }, q.prototype.on = function(D, B) {
    var c = l.prototype.on.call(this, D, B), G = this._readableState;
    return D === "data" ? (G.readableListening = this.listenerCount("readable") > 0, G.flowing !== false && this.resume()) : D === "readable" && !G.endEmitted && !G.readableListening && (G.readableListening = G.needReadable = true, G.flowing = false, G.emittedReadable = false, E("on readable", G.length, G.reading), G.length ? oe(this) : G.reading || ge.nextTick(Y, this)), c;
  }, q.prototype.addListener = q.prototype.on, q.prototype.removeListener = function(D, B) {
    var c = l.prototype.removeListener.call(this, D, B);
    return D === "readable" && ge.nextTick(X, this), c;
  }, q.prototype.removeAllListeners = function(D) {
    var B = l.prototype.removeAllListeners.apply(this, arguments);
    return (D === "readable" || D === void 0) && ge.nextTick(X, this), B;
  };
  function X(D) {
    var B = D._readableState;
    B.readableListening = D.listenerCount("readable") > 0, B.resumeScheduled && !B.paused ? B.flowing = true : D.listenerCount("data") > 0 && D.resume();
  }
  function Y(D) {
    E("readable nexttick read 0"), D.read(0);
  }
  q.prototype.resume = function() {
    var D = this._readableState;
    return D.flowing || (E("resume"), D.flowing = !D.readableListening, ne(this, D)), D.paused = false, this;
  };
  function ne(D, B) {
    B.resumeScheduled || (B.resumeScheduled = true, ge.nextTick(de, D, B));
  }
  function de(D, B) {
    E("resume", B.reading), B.reading || D.read(0), B.resumeScheduled = false, D.emit("resume"), b(D), B.flowing && !B.reading && D.read(0);
  }
  q.prototype.pause = function() {
    return E("call pause flowing=%j", this._readableState.flowing), this._readableState.flowing !== false && (E("pause"), this._readableState.flowing = false, this.emit("pause")), this._readableState.paused = true, this;
  };
  function b(D) {
    var B = D._readableState;
    for (E("flow", B.flowing); B.flowing && D.read() !== null; ) ;
  }
  q.prototype.wrap = function(D) {
    var B = this, c = this._readableState, G = false;
    D.on("end", function() {
      if (E("wrapped end"), c.decoder && !c.ended) {
        var i = c.decoder.end();
        i && i.length && B.push(i);
      }
      B.push(null);
    }), D.on("data", function(i) {
      E("wrapped data"), c.decoder && (i = c.decoder.write(i)), !(c.objectMode && i == null) && (!c.objectMode && (!i || !i.length) || B.push(i) || (G = true, D.pause()));
    });
    for (var R in D) this[R] === void 0 && typeof D[R] == "function" && (this[R] = /* @__PURE__ */ (function(f) {
      return function() {
        return D[f].apply(D, arguments);
      };
    })(R));
    for (var n = 0; n < P.length; n++) D.on(P[n], this.emit.bind(this, P[n]));
    return this._read = function(i) {
      E("wrapped _read", i), G && (G = false, D.resume());
    }, this;
  }, typeof Symbol == "function" && (q.prototype[Symbol.asyncIterator] = function() {
    return A === void 0 && (A = ga()), A(this);
  }), Object.defineProperty(q.prototype, "readableHighWaterMark", { enumerable: false, get: function() {
    return this._readableState.highWaterMark;
  } }), Object.defineProperty(q.prototype, "readableBuffer", { enumerable: false, get: function() {
    return this._readableState && this._readableState.buffer;
  } }), Object.defineProperty(q.prototype, "readableFlowing", { enumerable: false, get: function() {
    return this._readableState.flowing;
  }, set: function(B) {
    this._readableState && (this._readableState.flowing = B);
  } }), q._fromList = h, Object.defineProperty(q.prototype, "readableLength", { enumerable: false, get: function() {
    return this._readableState.length;
  } });
  function h(D, B) {
    if (B.length === 0) return null;
    var c;
    return B.objectMode ? c = B.buffer.shift() : !D || D >= B.length ? (B.decoder ? c = B.buffer.join("") : B.buffer.length === 1 ? c = B.buffer.first() : c = B.buffer.concat(B.length), B.buffer.clear()) : c = B.buffer.consume(D, B.decoder), c;
  }
  function j(D) {
    var B = D._readableState;
    E("endReadable", B.endEmitted), B.endEmitted || (B.ended = true, ge.nextTick(M, B, D));
  }
  function M(D, B) {
    if (E("endReadableNT", D.endEmitted, D.length), !D.endEmitted && D.length === 0 && (D.endEmitted = true, B.readable = false, B.emit("end"), D.autoDestroy)) {
      var c = B._writableState;
      (!c || c.autoDestroy && c.finished) && B.destroy();
    }
  }
  typeof Symbol == "function" && (q.from = function(D, B) {
    return _ === void 0 && (_ = ya()), _(q, D, B);
  });
  function ie(D, B) {
    for (var c = 0, G = D.length; c < G; c++) if (D[c] === B) return c;
    return -1;
  }
})), In = ce(((e, t) => {
  t.exports = T;
  var r = dt().codes, o = r.ERR_METHOD_NOT_IMPLEMENTED, l = r.ERR_MULTIPLE_CALLBACK, s = r.ERR_TRANSFORM_ALREADY_TRANSFORMING, u = r.ERR_TRANSFORM_WITH_LENGTH_0, a = ot();
  Ge()(T, a);
  function d(N, w) {
    var m = this._transformState;
    m.transforming = false;
    var v = m.writecb;
    if (v === null) return this.emit("error", new l());
    m.writechunk = null, m.writecb = null, w != null && this.push(w), v(N);
    var k = this._readableState;
    k.reading = false, (k.needReadable || k.length < k.highWaterMark) && this._read(k.highWaterMark);
  }
  function T(N) {
    if (!(this instanceof T)) return new T(N);
    a.call(this, N), this._transformState = { afterTransform: d.bind(this), needTransform: false, transforming: false, writecb: null, writechunk: null, writeencoding: null }, this._readableState.needReadable = true, this._readableState.sync = false, N && (typeof N.transform == "function" && (this._transform = N.transform), typeof N.flush == "function" && (this._flush = N.flush)), this.on("prefinish", E);
  }
  function E() {
    var N = this;
    typeof this._flush == "function" && !this._readableState.destroyed ? this._flush(function(w, m) {
      g(N, w, m);
    }) : g(this, null, null);
  }
  T.prototype.push = function(N, w) {
    return this._transformState.needTransform = false, a.prototype.push.call(this, N, w);
  }, T.prototype._transform = function(N, w, m) {
    m(new o("_transform()"));
  }, T.prototype._write = function(N, w, m) {
    var v = this._transformState;
    if (v.writecb = m, v.writechunk = N, v.writeencoding = w, !v.transforming) {
      var k = this._readableState;
      (v.needTransform || k.needReadable || k.length < k.highWaterMark) && this._read(k.highWaterMark);
    }
  }, T.prototype._read = function(N) {
    var w = this._transformState;
    w.writechunk !== null && !w.transforming ? (w.transforming = true, this._transform(w.writechunk, w.writeencoding, w.afterTransform)) : w.needTransform = true;
  }, T.prototype._destroy = function(N, w) {
    a.prototype._destroy.call(this, N, function(m) {
      w(m);
    });
  };
  function g(N, w, m) {
    if (w) return N.emit("error", w);
    if (m != null && N.push(m), N._writableState.length) throw new u();
    if (N._transformState.transforming) throw new s();
    return N.push(null);
  }
})), ba = ce(((e, t) => {
  t.exports = o;
  var r = In();
  Ge()(o, r);
  function o(l) {
    if (!(this instanceof o)) return new o(l);
    r.call(this, l);
  }
  o.prototype._transform = function(l, s, u) {
    u(null, l);
  };
})), _a = ce(((e, t) => {
  var r;
  function o(m) {
    var v = false;
    return function() {
      v || (v = true, m.apply(void 0, arguments));
    };
  }
  var l = dt().codes, s = l.ERR_MISSING_ARGS, u = l.ERR_STREAM_DESTROYED;
  function a(m) {
    if (m) throw m;
  }
  function d(m) {
    return m.setHeader && typeof m.abort == "function";
  }
  function T(m, v, k, I) {
    I = o(I);
    var y = false;
    m.on("close", function() {
      y = true;
    }), r === void 0 && (r = Tr()), r(m, { readable: v, writable: k }, function(A) {
      if (A) return I(A);
      y = true, I();
    });
    var x = false;
    return function(A) {
      if (!y && !x) {
        if (x = true, d(m)) return m.abort();
        if (typeof m.destroy == "function") return m.destroy();
        I(A || new u("pipe"));
      }
    };
  }
  function E(m) {
    m();
  }
  function g(m, v) {
    return m.pipe(v);
  }
  function N(m) {
    return !m.length || typeof m[m.length - 1] != "function" ? a : m.pop();
  }
  function w() {
    for (var m = arguments.length, v = new Array(m), k = 0; k < m; k++) v[k] = arguments[k];
    var I = N(v);
    if (Array.isArray(v[0]) && (v = v[0]), v.length < 2) throw new s("streams");
    var y, x = v.map(function(A, _) {
      var p = _ < v.length - 1;
      return T(A, p, _ > 0, function(P) {
        y || (y = P), P && x.forEach(E), !p && (x.forEach(E), I(y));
      });
    });
    return v.reduce(g);
  }
  t.exports = w;
})), Ar = ce(((e, t) => {
  t.exports = o;
  var r = br().EventEmitter;
  Ge()(o, r), o.Readable = Cn(), o.Writable = Rn(), o.Duplex = ot(), o.Transform = In(), o.PassThrough = ba(), o.finished = Tr(), o.pipeline = _a(), o.Stream = o;
  function o() {
    r.call(this);
  }
  o.prototype.pipe = function(l, s) {
    var u = this;
    function a(m) {
      l.writable && l.write(m) === false && u.pause && u.pause();
    }
    u.on("data", a);
    function d() {
      u.readable && u.resume && u.resume();
    }
    l.on("drain", d), !l._isStdio && (!s || s.end !== false) && (u.on("end", E), u.on("close", g));
    var T = false;
    function E() {
      T || (T = true, l.end());
    }
    function g() {
      T || (T = true, typeof l.destroy == "function" && l.destroy());
    }
    function N(m) {
      if (w(), r.listenerCount(this, "error") === 0) throw m;
    }
    u.on("error", N), l.on("error", N);
    function w() {
      u.removeListener("data", a), l.removeListener("drain", d), u.removeListener("end", E), u.removeListener("close", g), u.removeListener("error", N), l.removeListener("error", N), u.removeListener("end", w), u.removeListener("close", w), l.removeListener("close", w);
    }
    return u.on("end", w), u.on("close", w), l.on("close", w), l.emit("pipe", u), l;
  };
})), xa = ce(((e) => {
  (function(t) {
    t.parser = function(b, h) {
      return new o(b, h);
    }, t.SAXParser = o, t.SAXStream = E, t.createStream = T, t.MAX_BUFFER_LENGTH = 64 * 1024;
    var r = ["comment", "sgmlDecl", "textNode", "tagName", "doctype", "procInstName", "procInstBody", "entity", "attribName", "attribValue", "cdata", "script"];
    t.EVENTS = ["text", "processinginstruction", "sgmldeclaration", "doctype", "comment", "opentagstart", "attribute", "opentag", "closetag", "opencdata", "cdata", "closecdata", "error", "end", "ready", "script", "opennamespace", "closenamespace"];
    function o(b, h) {
      if (!(this instanceof o)) return new o(b, h);
      var j = this;
      s(j), j.q = j.c = "", j.bufferCheckPosition = t.MAX_BUFFER_LENGTH, j.opt = h || {}, j.opt.lowercase = j.opt.lowercase || j.opt.lowercasetags, j.looseCase = j.opt.lowercase ? "toLowerCase" : "toUpperCase", j.tags = [], j.closed = j.closedRoot = j.sawRoot = false, j.tag = j.error = null, j.strict = !!b, j.noscript = !!(b || j.opt.noscript), j.state = C.BEGIN, j.strictEntities = j.opt.strictEntities, j.ENTITIES = j.strictEntities ? Object.create(t.XML_ENTITIES) : Object.create(t.ENTITIES), j.attribList = [], j.opt.xmlns && (j.ns = Object.create(v)), j.trackPosition = j.opt.position !== false, j.trackPosition && (j.position = j.line = j.column = 0), ee(j, "onready");
    }
    Object.create || (Object.create = function(b) {
      function h() {
      }
      return h.prototype = b, new h();
    }), Object.keys || (Object.keys = function(b) {
      var h = [];
      for (var j in b) b.hasOwnProperty(j) && h.push(j);
      return h;
    });
    function l(b) {
      for (var h = Math.max(t.MAX_BUFFER_LENGTH, 10), j = 0, M = 0, ie = r.length; M < ie; M++) {
        var D = b[r[M]].length;
        if (D > h) switch (r[M]) {
          case "textNode":
            W(b);
            break;
          case "cdata":
            O(b, "oncdata", b.cdata), b.cdata = "";
            break;
          case "script":
            O(b, "onscript", b.script), b.script = "";
            break;
          default:
            H(b, "Max buffer length exceeded: " + r[M]);
        }
        j = Math.max(j, D);
      }
      b.bufferCheckPosition = t.MAX_BUFFER_LENGTH - j + b.position;
    }
    function s(b) {
      for (var h = 0, j = r.length; h < j; h++) b[r[h]] = "";
    }
    function u(b) {
      W(b), b.cdata !== "" && (O(b, "oncdata", b.cdata), b.cdata = ""), b.script !== "" && (O(b, "onscript", b.script), b.script = "");
    }
    o.prototype = { end: function() {
      J(this);
    }, write: de, resume: function() {
      return this.error = null, this;
    }, close: function() {
      return this.write(null);
    }, flush: function() {
      u(this);
    } };
    var a;
    try {
      a = Ar().Stream;
    } catch {
      a = function() {
      };
    }
    var d = t.EVENTS.filter(function(b) {
      return b !== "error" && b !== "end";
    });
    function T(b, h) {
      return new E(b, h);
    }
    function E(b, h) {
      if (!(this instanceof E)) return new E(b, h);
      a.apply(this), this._parser = new o(b, h), this.writable = true, this.readable = true;
      var j = this;
      this._parser.onend = function() {
        j.emit("end");
      }, this._parser.onerror = function(M) {
        j.emit("error", M), j._parser.error = null;
      }, this._decoder = null, d.forEach(function(M) {
        Object.defineProperty(j, "on" + M, { get: function() {
          return j._parser["on" + M];
        }, set: function(ie) {
          if (!ie) return j.removeAllListeners(M), j._parser["on" + M] = ie, ie;
          j.on(M, ie);
        }, enumerable: true, configurable: false });
      });
    }
    E.prototype = Object.create(a.prototype, { constructor: { value: E } }), E.prototype.write = function(b) {
      if (typeof Buffer == "function" && typeof Buffer.isBuffer == "function" && Buffer.isBuffer(b)) {
        if (!this._decoder) {
          var h = mr().StringDecoder;
          this._decoder = new h("utf8");
        }
        b = this._decoder.write(b);
      }
      return this._parser.write(b.toString()), this.emit("data", b), true;
    }, E.prototype.end = function(b) {
      return b && b.length && this.write(b), this._parser.end(), true;
    }, E.prototype.on = function(b, h) {
      var j = this;
      return !j._parser["on" + b] && d.indexOf(b) !== -1 && (j._parser["on" + b] = function() {
        var M = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
        M.splice(0, 0, b), j.emit.apply(j, M);
      }), a.prototype.on.call(j, b, h);
    };
    var g = "[CDATA[", N = "DOCTYPE", w = "http://www.w3.org/XML/1998/namespace", m = "http://www.w3.org/2000/xmlns/", v = { xml: w, xmlns: m }, k = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, I = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/, y = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, x = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
    function A(b) {
      return b === " " || b === `
` || b === "\r" || b === "	";
    }
    function _(b) {
      return b === '"' || b === "'";
    }
    function p(b) {
      return b === ">" || A(b);
    }
    function P(b, h) {
      return b.test(h);
    }
    function U(b, h) {
      return !P(b, h);
    }
    var C = 0;
    t.STATE = { BEGIN: C++, BEGIN_WHITESPACE: C++, TEXT: C++, TEXT_ENTITY: C++, OPEN_WAKA: C++, SGML_DECL: C++, SGML_DECL_QUOTED: C++, DOCTYPE: C++, DOCTYPE_QUOTED: C++, DOCTYPE_DTD: C++, DOCTYPE_DTD_QUOTED: C++, COMMENT_STARTING: C++, COMMENT: C++, COMMENT_ENDING: C++, COMMENT_ENDED: C++, CDATA: C++, CDATA_ENDING: C++, CDATA_ENDING_2: C++, PROC_INST: C++, PROC_INST_BODY: C++, PROC_INST_ENDING: C++, OPEN_TAG: C++, OPEN_TAG_SLASH: C++, ATTRIB: C++, ATTRIB_NAME: C++, ATTRIB_NAME_SAW_WHITE: C++, ATTRIB_VALUE: C++, ATTRIB_VALUE_QUOTED: C++, ATTRIB_VALUE_CLOSED: C++, ATTRIB_VALUE_UNQUOTED: C++, ATTRIB_VALUE_ENTITY_Q: C++, ATTRIB_VALUE_ENTITY_U: C++, CLOSE_TAG: C++, CLOSE_TAG_SAW_WHITE: C++, SCRIPT: C++, SCRIPT_ENDING: C++ }, t.XML_ENTITIES = { amp: "&", gt: ">", lt: "<", quot: '"', apos: "'" }, t.ENTITIES = { amp: "&", gt: ">", lt: "<", quot: '"', apos: "'", AElig: 198, Aacute: 193, Acirc: 194, Agrave: 192, Aring: 197, Atilde: 195, Auml: 196, Ccedil: 199, ETH: 208, Eacute: 201, Ecirc: 202, Egrave: 200, Euml: 203, Iacute: 205, Icirc: 206, Igrave: 204, Iuml: 207, Ntilde: 209, Oacute: 211, Ocirc: 212, Ograve: 210, Oslash: 216, Otilde: 213, Ouml: 214, THORN: 222, Uacute: 218, Ucirc: 219, Ugrave: 217, Uuml: 220, Yacute: 221, aacute: 225, acirc: 226, aelig: 230, agrave: 224, aring: 229, atilde: 227, auml: 228, ccedil: 231, eacute: 233, ecirc: 234, egrave: 232, eth: 240, euml: 235, iacute: 237, icirc: 238, igrave: 236, iuml: 239, ntilde: 241, oacute: 243, ocirc: 244, ograve: 242, oslash: 248, otilde: 245, ouml: 246, szlig: 223, thorn: 254, uacute: 250, ucirc: 251, ugrave: 249, uuml: 252, yacute: 253, yuml: 255, copy: 169, reg: 174, nbsp: 160, iexcl: 161, cent: 162, pound: 163, curren: 164, yen: 165, brvbar: 166, sect: 167, uml: 168, ordf: 170, laquo: 171, not: 172, shy: 173, macr: 175, deg: 176, plusmn: 177, sup1: 185, sup2: 178, sup3: 179, acute: 180, micro: 181, para: 182, middot: 183, cedil: 184, ordm: 186, raquo: 187, frac14: 188, frac12: 189, frac34: 190, iquest: 191, times: 215, divide: 247, OElig: 338, oelig: 339, Scaron: 352, scaron: 353, Yuml: 376, fnof: 402, circ: 710, tilde: 732, Alpha: 913, Beta: 914, Gamma: 915, Delta: 916, Epsilon: 917, Zeta: 918, Eta: 919, Theta: 920, Iota: 921, Kappa: 922, Lambda: 923, Mu: 924, Nu: 925, Xi: 926, Omicron: 927, Pi: 928, Rho: 929, Sigma: 931, Tau: 932, Upsilon: 933, Phi: 934, Chi: 935, Psi: 936, Omega: 937, alpha: 945, beta: 946, gamma: 947, delta: 948, epsilon: 949, zeta: 950, eta: 951, theta: 952, iota: 953, kappa: 954, lambda: 955, mu: 956, nu: 957, xi: 958, omicron: 959, pi: 960, rho: 961, sigmaf: 962, sigma: 963, tau: 964, upsilon: 965, phi: 966, chi: 967, psi: 968, omega: 969, thetasym: 977, upsih: 978, piv: 982, ensp: 8194, emsp: 8195, thinsp: 8201, zwnj: 8204, zwj: 8205, lrm: 8206, rlm: 8207, ndash: 8211, mdash: 8212, lsquo: 8216, rsquo: 8217, sbquo: 8218, ldquo: 8220, rdquo: 8221, bdquo: 8222, dagger: 8224, Dagger: 8225, bull: 8226, hellip: 8230, permil: 8240, prime: 8242, Prime: 8243, lsaquo: 8249, rsaquo: 8250, oline: 8254, frasl: 8260, euro: 8364, image: 8465, weierp: 8472, real: 8476, trade: 8482, alefsym: 8501, larr: 8592, uarr: 8593, rarr: 8594, darr: 8595, harr: 8596, crarr: 8629, lArr: 8656, uArr: 8657, rArr: 8658, dArr: 8659, hArr: 8660, forall: 8704, part: 8706, exist: 8707, empty: 8709, nabla: 8711, isin: 8712, notin: 8713, ni: 8715, prod: 8719, sum: 8721, minus: 8722, lowast: 8727, radic: 8730, prop: 8733, infin: 8734, ang: 8736, and: 8743, or: 8744, cap: 8745, cup: 8746, int: 8747, there4: 8756, sim: 8764, cong: 8773, asymp: 8776, ne: 8800, equiv: 8801, le: 8804, ge: 8805, sub: 8834, sup: 8835, nsub: 8836, sube: 8838, supe: 8839, oplus: 8853, otimes: 8855, perp: 8869, sdot: 8901, lceil: 8968, rceil: 8969, lfloor: 8970, rfloor: 8971, lang: 9001, rang: 9002, loz: 9674, spades: 9824, clubs: 9827, hearts: 9829, diams: 9830 }, Object.keys(t.ENTITIES).forEach(function(b) {
      var h = t.ENTITIES[b], j = typeof h == "number" ? String.fromCharCode(h) : h;
      t.ENTITIES[b] = j;
    });
    for (var q in t.STATE) t.STATE[t.STATE[q]] = q;
    C = t.STATE;
    function ee(b, h, j) {
      b[h] && b[h](j);
    }
    function O(b, h, j) {
      b.textNode && W(b), ee(b, h, j);
    }
    function W(b) {
      b.textNode = S(b.opt, b.textNode), b.textNode && ee(b, "ontext", b.textNode), b.textNode = "";
    }
    function S(b, h) {
      return b.trim && (h = h.trim()), b.normalize && (h = h.replace(/\s+/g, " ")), h;
    }
    function H(b, h) {
      return W(b), b.trackPosition && (h += `
Line: ` + b.line + `
Column: ` + b.column + `
Char: ` + b.c), h = new Error(h), b.error = h, ee(b, "onerror", h), b;
    }
    function J(b) {
      return b.sawRoot && !b.closedRoot && $(b, "Unclosed root tag"), b.state !== C.BEGIN && b.state !== C.BEGIN_WHITESPACE && b.state !== C.TEXT && H(b, "Unexpected end"), W(b), b.c = "", b.closed = true, ee(b, "onend"), o.call(b, b.strict, b.opt), b;
    }
    function $(b, h) {
      if (typeof b != "object" || !(b instanceof o)) throw new Error("bad call to strictFail");
      b.strict && H(b, h);
    }
    function oe(b) {
      b.strict || (b.tagName = b.tagName[b.looseCase]());
      var h = b.tags[b.tags.length - 1] || b, j = b.tag = { name: b.tagName, attributes: {} };
      b.opt.xmlns && (j.ns = h.ns), b.attribList.length = 0, O(b, "onopentagstart", j);
    }
    function Z(b, h) {
      var j = b.indexOf(":") < 0 ? ["", b] : b.split(":"), M = j[0], ie = j[1];
      return h && b === "xmlns" && (M = "xmlns", ie = ""), { prefix: M, local: ie };
    }
    function re(b) {
      if (b.strict || (b.attribName = b.attribName[b.looseCase]()), b.attribList.indexOf(b.attribName) !== -1 || b.tag.attributes.hasOwnProperty(b.attribName)) {
        b.attribName = b.attribValue = "";
        return;
      }
      if (b.opt.xmlns) {
        var h = Z(b.attribName, true), j = h.prefix, M = h.local;
        if (j === "xmlns") if (M === "xml" && b.attribValue !== w) $(b, "xml: prefix must be bound to " + w + `
Actual: ` + b.attribValue);
        else if (M === "xmlns" && b.attribValue !== m) $(b, "xmlns: prefix must be bound to " + m + `
Actual: ` + b.attribValue);
        else {
          var ie = b.tag, D = b.tags[b.tags.length - 1] || b;
          ie.ns === D.ns && (ie.ns = Object.create(D.ns)), ie.ns[M] = b.attribValue;
        }
        b.attribList.push([b.attribName, b.attribValue]);
      } else b.tag.attributes[b.attribName] = b.attribValue, O(b, "onattribute", { name: b.attribName, value: b.attribValue });
      b.attribName = b.attribValue = "";
    }
    function V(b, h) {
      if (b.opt.xmlns) {
        var j = b.tag, M = Z(b.tagName);
        j.prefix = M.prefix, j.local = M.local, j.uri = j.ns[M.prefix] || "", j.prefix && !j.uri && ($(b, "Unbound namespace prefix: " + JSON.stringify(b.tagName)), j.uri = M.prefix);
        var ie = b.tags[b.tags.length - 1] || b;
        j.ns && ie.ns !== j.ns && Object.keys(j.ns).forEach(function(z) {
          O(b, "onopennamespace", { prefix: z, uri: j.ns[z] });
        });
        for (var D = 0, B = b.attribList.length; D < B; D++) {
          var c = b.attribList[D], G = c[0], R = c[1], n = Z(G, true), i = n.prefix, f = n.local, L = i === "" ? "" : j.ns[i] || "", K = { name: G, value: R, prefix: i, local: f, uri: L };
          i && i !== "xmlns" && !L && ($(b, "Unbound namespace prefix: " + JSON.stringify(i)), K.uri = i), b.tag.attributes[G] = K, O(b, "onattribute", K);
        }
        b.attribList.length = 0;
      }
      b.tag.isSelfClosing = !!h, b.sawRoot = true, b.tags.push(b.tag), O(b, "onopentag", b.tag), h || (!b.noscript && b.tagName.toLowerCase() === "script" ? b.state = C.SCRIPT : b.state = C.TEXT, b.tag = null, b.tagName = ""), b.attribName = b.attribValue = "", b.attribList.length = 0;
    }
    function F(b) {
      if (!b.tagName) {
        $(b, "Weird empty close tag."), b.textNode += "</>", b.state = C.TEXT;
        return;
      }
      if (b.script) {
        if (b.tagName !== "script") {
          b.script += "</" + b.tagName + ">", b.tagName = "", b.state = C.SCRIPT;
          return;
        }
        O(b, "onscript", b.script), b.script = "";
      }
      var h = b.tags.length, j = b.tagName;
      b.strict || (j = j[b.looseCase]());
      for (var M = j; h-- && b.tags[h].name !== M; ) $(b, "Unexpected close tag");
      if (h < 0) {
        $(b, "Unmatched closing tag: " + b.tagName), b.textNode += "</" + b.tagName + ">", b.state = C.TEXT;
        return;
      }
      b.tagName = j;
      for (var ie = b.tags.length; ie-- > h; ) {
        var D = b.tag = b.tags.pop();
        b.tagName = b.tag.name, O(b, "onclosetag", b.tagName);
        var B = {};
        for (var c in D.ns) B[c] = D.ns[c];
        var G = b.tags[b.tags.length - 1] || b;
        b.opt.xmlns && D.ns !== G.ns && Object.keys(D.ns).forEach(function(R) {
          var n = D.ns[R];
          O(b, "onclosenamespace", { prefix: R, uri: n });
        });
      }
      h === 0 && (b.closedRoot = true), b.tagName = b.attribValue = b.attribName = "", b.attribList.length = 0, b.state = C.TEXT;
    }
    function X(b) {
      var h = b.entity, j = h.toLowerCase(), M, ie = "";
      return b.ENTITIES[h] ? b.ENTITIES[h] : b.ENTITIES[j] ? b.ENTITIES[j] : (h = j, h.charAt(0) === "#" && (h.charAt(1) === "x" ? (h = h.slice(2), M = parseInt(h, 16), ie = M.toString(16)) : (h = h.slice(1), M = parseInt(h, 10), ie = M.toString(10))), h = h.replace(/^0+/, ""), isNaN(M) || ie.toLowerCase() !== h ? ($(b, "Invalid character entity"), "&" + b.entity + ";") : String.fromCodePoint(M));
    }
    function Y(b, h) {
      h === "<" ? (b.state = C.OPEN_WAKA, b.startTagPosition = b.position) : A(h) || ($(b, "Non-whitespace before first tag."), b.textNode = h, b.state = C.TEXT);
    }
    function ne(b, h) {
      var j = "";
      return h < b.length && (j = b.charAt(h)), j;
    }
    function de(b) {
      var h = this;
      if (this.error) throw this.error;
      if (h.closed) return H(h, "Cannot write after close. Assign an onready handler.");
      if (b === null) return J(h);
      typeof b == "object" && (b = b.toString());
      for (var j = 0, M = ""; M = ne(b, j++), h.c = M, !!M; ) switch (h.trackPosition && (h.position++, M === `
` ? (h.line++, h.column = 0) : h.column++), h.state) {
        case C.BEGIN:
          if (h.state = C.BEGIN_WHITESPACE, M === "\uFEFF") continue;
          Y(h, M);
          continue;
        case C.BEGIN_WHITESPACE:
          Y(h, M);
          continue;
        case C.TEXT:
          if (h.sawRoot && !h.closedRoot) {
            for (var ie = j - 1; M && M !== "<" && M !== "&"; ) M = ne(b, j++), M && h.trackPosition && (h.position++, M === `
` ? (h.line++, h.column = 0) : h.column++);
            h.textNode += b.substring(ie, j - 1);
          }
          M === "<" && !(h.sawRoot && h.closedRoot && !h.strict) ? (h.state = C.OPEN_WAKA, h.startTagPosition = h.position) : (!A(M) && (!h.sawRoot || h.closedRoot) && $(h, "Text data outside of root node."), M === "&" ? h.state = C.TEXT_ENTITY : h.textNode += M);
          continue;
        case C.SCRIPT:
          M === "<" ? h.state = C.SCRIPT_ENDING : h.script += M;
          continue;
        case C.SCRIPT_ENDING:
          M === "/" ? h.state = C.CLOSE_TAG : (h.script += "<" + M, h.state = C.SCRIPT);
          continue;
        case C.OPEN_WAKA:
          if (M === "!") h.state = C.SGML_DECL, h.sgmlDecl = "";
          else if (!A(M)) if (P(k, M)) h.state = C.OPEN_TAG, h.tagName = M;
          else if (M === "/") h.state = C.CLOSE_TAG, h.tagName = "";
          else if (M === "?") h.state = C.PROC_INST, h.procInstName = h.procInstBody = "";
          else {
            if ($(h, "Unencoded <"), h.startTagPosition + 1 < h.position) {
              var D = h.position - h.startTagPosition;
              M = new Array(D).join(" ") + M;
            }
            h.textNode += "<" + M, h.state = C.TEXT;
          }
          continue;
        case C.SGML_DECL:
          (h.sgmlDecl + M).toUpperCase() === g ? (O(h, "onopencdata"), h.state = C.CDATA, h.sgmlDecl = "", h.cdata = "") : h.sgmlDecl + M === "--" ? (h.state = C.COMMENT, h.comment = "", h.sgmlDecl = "") : (h.sgmlDecl + M).toUpperCase() === N ? (h.state = C.DOCTYPE, (h.doctype || h.sawRoot) && $(h, "Inappropriately located doctype declaration"), h.doctype = "", h.sgmlDecl = "") : M === ">" ? (O(h, "onsgmldeclaration", h.sgmlDecl), h.sgmlDecl = "", h.state = C.TEXT) : (_(M) && (h.state = C.SGML_DECL_QUOTED), h.sgmlDecl += M);
          continue;
        case C.SGML_DECL_QUOTED:
          M === h.q && (h.state = C.SGML_DECL, h.q = ""), h.sgmlDecl += M;
          continue;
        case C.DOCTYPE:
          M === ">" ? (h.state = C.TEXT, O(h, "ondoctype", h.doctype), h.doctype = true) : (h.doctype += M, M === "[" ? h.state = C.DOCTYPE_DTD : _(M) && (h.state = C.DOCTYPE_QUOTED, h.q = M));
          continue;
        case C.DOCTYPE_QUOTED:
          h.doctype += M, M === h.q && (h.q = "", h.state = C.DOCTYPE);
          continue;
        case C.DOCTYPE_DTD:
          h.doctype += M, M === "]" ? h.state = C.DOCTYPE : _(M) && (h.state = C.DOCTYPE_DTD_QUOTED, h.q = M);
          continue;
        case C.DOCTYPE_DTD_QUOTED:
          h.doctype += M, M === h.q && (h.state = C.DOCTYPE_DTD, h.q = "");
          continue;
        case C.COMMENT:
          M === "-" ? h.state = C.COMMENT_ENDING : h.comment += M;
          continue;
        case C.COMMENT_ENDING:
          M === "-" ? (h.state = C.COMMENT_ENDED, h.comment = S(h.opt, h.comment), h.comment && O(h, "oncomment", h.comment), h.comment = "") : (h.comment += "-" + M, h.state = C.COMMENT);
          continue;
        case C.COMMENT_ENDED:
          M !== ">" ? ($(h, "Malformed comment"), h.comment += "--" + M, h.state = C.COMMENT) : h.state = C.TEXT;
          continue;
        case C.CDATA:
          M === "]" ? h.state = C.CDATA_ENDING : h.cdata += M;
          continue;
        case C.CDATA_ENDING:
          M === "]" ? h.state = C.CDATA_ENDING_2 : (h.cdata += "]" + M, h.state = C.CDATA);
          continue;
        case C.CDATA_ENDING_2:
          M === ">" ? (h.cdata && O(h, "oncdata", h.cdata), O(h, "onclosecdata"), h.cdata = "", h.state = C.TEXT) : M === "]" ? h.cdata += "]" : (h.cdata += "]]" + M, h.state = C.CDATA);
          continue;
        case C.PROC_INST:
          M === "?" ? h.state = C.PROC_INST_ENDING : A(M) ? h.state = C.PROC_INST_BODY : h.procInstName += M;
          continue;
        case C.PROC_INST_BODY:
          if (!h.procInstBody && A(M)) continue;
          M === "?" ? h.state = C.PROC_INST_ENDING : h.procInstBody += M;
          continue;
        case C.PROC_INST_ENDING:
          M === ">" ? (O(h, "onprocessinginstruction", { name: h.procInstName, body: h.procInstBody }), h.procInstName = h.procInstBody = "", h.state = C.TEXT) : (h.procInstBody += "?" + M, h.state = C.PROC_INST_BODY);
          continue;
        case C.OPEN_TAG:
          P(I, M) ? h.tagName += M : (oe(h), M === ">" ? V(h) : M === "/" ? h.state = C.OPEN_TAG_SLASH : (A(M) || $(h, "Invalid character in tag name"), h.state = C.ATTRIB));
          continue;
        case C.OPEN_TAG_SLASH:
          M === ">" ? (V(h, true), F(h)) : ($(h, "Forward-slash in opening tag not followed by >"), h.state = C.ATTRIB);
          continue;
        case C.ATTRIB:
          if (A(M)) continue;
          M === ">" ? V(h) : M === "/" ? h.state = C.OPEN_TAG_SLASH : P(k, M) ? (h.attribName = M, h.attribValue = "", h.state = C.ATTRIB_NAME) : $(h, "Invalid attribute name");
          continue;
        case C.ATTRIB_NAME:
          M === "=" ? h.state = C.ATTRIB_VALUE : M === ">" ? ($(h, "Attribute without value"), h.attribValue = h.attribName, re(h), V(h)) : A(M) ? h.state = C.ATTRIB_NAME_SAW_WHITE : P(I, M) ? h.attribName += M : $(h, "Invalid attribute name");
          continue;
        case C.ATTRIB_NAME_SAW_WHITE:
          if (M === "=") h.state = C.ATTRIB_VALUE;
          else {
            if (A(M)) continue;
            $(h, "Attribute without value"), h.tag.attributes[h.attribName] = "", h.attribValue = "", O(h, "onattribute", { name: h.attribName, value: "" }), h.attribName = "", M === ">" ? V(h) : P(k, M) ? (h.attribName = M, h.state = C.ATTRIB_NAME) : ($(h, "Invalid attribute name"), h.state = C.ATTRIB);
          }
          continue;
        case C.ATTRIB_VALUE:
          if (A(M)) continue;
          _(M) ? (h.q = M, h.state = C.ATTRIB_VALUE_QUOTED) : ($(h, "Unquoted attribute value"), h.state = C.ATTRIB_VALUE_UNQUOTED, h.attribValue = M);
          continue;
        case C.ATTRIB_VALUE_QUOTED:
          if (M !== h.q) {
            M === "&" ? h.state = C.ATTRIB_VALUE_ENTITY_Q : h.attribValue += M;
            continue;
          }
          re(h), h.q = "", h.state = C.ATTRIB_VALUE_CLOSED;
          continue;
        case C.ATTRIB_VALUE_CLOSED:
          A(M) ? h.state = C.ATTRIB : M === ">" ? V(h) : M === "/" ? h.state = C.OPEN_TAG_SLASH : P(k, M) ? ($(h, "No whitespace between attributes"), h.attribName = M, h.attribValue = "", h.state = C.ATTRIB_NAME) : $(h, "Invalid attribute name");
          continue;
        case C.ATTRIB_VALUE_UNQUOTED:
          if (!p(M)) {
            M === "&" ? h.state = C.ATTRIB_VALUE_ENTITY_U : h.attribValue += M;
            continue;
          }
          re(h), M === ">" ? V(h) : h.state = C.ATTRIB;
          continue;
        case C.CLOSE_TAG:
          if (h.tagName) M === ">" ? F(h) : P(I, M) ? h.tagName += M : h.script ? (h.script += "</" + h.tagName, h.tagName = "", h.state = C.SCRIPT) : (A(M) || $(h, "Invalid tagname in closing tag"), h.state = C.CLOSE_TAG_SAW_WHITE);
          else {
            if (A(M)) continue;
            U(k, M) ? h.script ? (h.script += "</" + M, h.state = C.SCRIPT) : $(h, "Invalid tagname in closing tag.") : h.tagName = M;
          }
          continue;
        case C.CLOSE_TAG_SAW_WHITE:
          if (A(M)) continue;
          M === ">" ? F(h) : $(h, "Invalid characters in closing tag");
          continue;
        case C.TEXT_ENTITY:
        case C.ATTRIB_VALUE_ENTITY_Q:
        case C.ATTRIB_VALUE_ENTITY_U:
          var B, c;
          switch (h.state) {
            case C.TEXT_ENTITY:
              B = C.TEXT, c = "textNode";
              break;
            case C.ATTRIB_VALUE_ENTITY_Q:
              B = C.ATTRIB_VALUE_QUOTED, c = "attribValue";
              break;
            case C.ATTRIB_VALUE_ENTITY_U:
              B = C.ATTRIB_VALUE_UNQUOTED, c = "attribValue";
              break;
          }
          M === ";" ? (h[c] += X(h), h.entity = "", h.state = B) : P(h.entity.length ? x : y, M) ? h.entity += M : ($(h, "Invalid character in entity name"), h[c] += "&" + h.entity + M, h.entity = "", h.state = B);
          continue;
        default:
          throw new Error(h, "Unknown state: " + h.state);
      }
      return h.position >= h.bufferCheckPosition && l(h), h;
    }
    /*! http://mths.be/fromcodepoint v0.1.0 by @mathias */
    String.fromCodePoint || (function() {
      var b = String.fromCharCode, h = Math.floor, j = function() {
        var M = 16384, ie = [], D, B, c = -1, G = arguments.length;
        if (!G) return "";
        for (var R = ""; ++c < G; ) {
          var n = Number(arguments[c]);
          if (!isFinite(n) || n < 0 || n > 1114111 || h(n) !== n) throw RangeError("Invalid code point: " + n);
          n <= 65535 ? ie.push(n) : (n -= 65536, D = (n >> 10) + 55296, B = n % 1024 + 56320, ie.push(D, B)), (c + 1 === G || ie.length > M) && (R += b.apply(null, ie), ie.length = 0);
        }
        return R;
      };
      Object.defineProperty ? Object.defineProperty(String, "fromCodePoint", { value: j, configurable: true, writable: true }) : String.fromCodePoint = j;
    })();
  })(typeof e > "u" ? e.sax = {} : e);
})), kr = ce(((e, t) => {
  t.exports = { isArray: function(r) {
    return Array.isArray ? Array.isArray(r) : Object.prototype.toString.call(r) === "[object Array]";
  } };
})), Rr = ce(((e, t) => {
  var r = kr().isArray;
  t.exports = { copyOptions: function(o) {
    var l, s = {};
    for (l in o) o.hasOwnProperty(l) && (s[l] = o[l]);
    return s;
  }, ensureFlagExists: function(o, l) {
    (!(o in l) || typeof l[o] != "boolean") && (l[o] = false);
  }, ensureSpacesExists: function(o) {
    (!("spaces" in o) || typeof o.spaces != "number" && typeof o.spaces != "string") && (o.spaces = 0);
  }, ensureAlwaysArrayExists: function(o) {
    (!("alwaysArray" in o) || typeof o.alwaysArray != "boolean" && !r(o.alwaysArray)) && (o.alwaysArray = false);
  }, ensureKeyExists: function(o, l) {
    (!(o + "Key" in l) || typeof l[o + "Key"] != "string") && (l[o + "Key"] = l.compact ? "_" + o : o);
  }, checkFnExists: function(o, l) {
    return o + "Fn" in l;
  } };
})), Nn = ce(((e, t) => {
  var r = xa(), o = Rr(), l = kr().isArray, s, u;
  function a(x) {
    return s = o.copyOptions(x), o.ensureFlagExists("ignoreDeclaration", s), o.ensureFlagExists("ignoreInstruction", s), o.ensureFlagExists("ignoreAttributes", s), o.ensureFlagExists("ignoreText", s), o.ensureFlagExists("ignoreComment", s), o.ensureFlagExists("ignoreCdata", s), o.ensureFlagExists("ignoreDoctype", s), o.ensureFlagExists("compact", s), o.ensureFlagExists("alwaysChildren", s), o.ensureFlagExists("addParent", s), o.ensureFlagExists("trim", s), o.ensureFlagExists("nativeType", s), o.ensureFlagExists("nativeTypeAttributes", s), o.ensureFlagExists("sanitize", s), o.ensureFlagExists("instructionHasAttributes", s), o.ensureFlagExists("captureSpacesBetweenElements", s), o.ensureAlwaysArrayExists(s), o.ensureKeyExists("declaration", s), o.ensureKeyExists("instruction", s), o.ensureKeyExists("attributes", s), o.ensureKeyExists("text", s), o.ensureKeyExists("comment", s), o.ensureKeyExists("cdata", s), o.ensureKeyExists("doctype", s), o.ensureKeyExists("type", s), o.ensureKeyExists("name", s), o.ensureKeyExists("elements", s), o.ensureKeyExists("parent", s), o.checkFnExists("doctype", s), o.checkFnExists("instruction", s), o.checkFnExists("cdata", s), o.checkFnExists("comment", s), o.checkFnExists("text", s), o.checkFnExists("instructionName", s), o.checkFnExists("elementName", s), o.checkFnExists("attributeName", s), o.checkFnExists("attributeValue", s), o.checkFnExists("attributes", s), s;
  }
  function d(x) {
    var A = Number(x);
    if (!isNaN(A)) return A;
    var _ = x.toLowerCase();
    return _ === "true" ? true : _ === "false" ? false : x;
  }
  function T(x, A) {
    var _;
    if (s.compact) {
      if (!u[s[x + "Key"]] && (l(s.alwaysArray) ? s.alwaysArray.indexOf(s[x + "Key"]) !== -1 : s.alwaysArray) && (u[s[x + "Key"]] = []), u[s[x + "Key"]] && !l(u[s[x + "Key"]]) && (u[s[x + "Key"]] = [u[s[x + "Key"]]]), x + "Fn" in s && typeof A == "string" && (A = s[x + "Fn"](A, u)), x === "instruction" && ("instructionFn" in s || "instructionNameFn" in s)) {
        for (_ in A) if (A.hasOwnProperty(_)) if ("instructionFn" in s) A[_] = s.instructionFn(A[_], _, u);
        else {
          var p = A[_];
          delete A[_], A[s.instructionNameFn(_, p, u)] = p;
        }
      }
      l(u[s[x + "Key"]]) ? u[s[x + "Key"]].push(A) : u[s[x + "Key"]] = A;
    } else {
      u[s.elementsKey] || (u[s.elementsKey] = []);
      var P = {};
      if (P[s.typeKey] = x, x === "instruction") {
        for (_ in A) if (A.hasOwnProperty(_)) break;
        P[s.nameKey] = "instructionNameFn" in s ? s.instructionNameFn(_, A, u) : _, s.instructionHasAttributes ? (P[s.attributesKey] = A[_][s.attributesKey], "instructionFn" in s && (P[s.attributesKey] = s.instructionFn(P[s.attributesKey], _, u))) : ("instructionFn" in s && (A[_] = s.instructionFn(A[_], _, u)), P[s.instructionKey] = A[_]);
      } else x + "Fn" in s && (A = s[x + "Fn"](A, u)), P[s[x + "Key"]] = A;
      s.addParent && (P[s.parentKey] = u), u[s.elementsKey].push(P);
    }
  }
  function E(x) {
    if ("attributesFn" in s && x && (x = s.attributesFn(x, u)), (s.trim || "attributeValueFn" in s || "attributeNameFn" in s || s.nativeTypeAttributes) && x) {
      var A;
      for (A in x) if (x.hasOwnProperty(A) && (s.trim && (x[A] = x[A].trim()), s.nativeTypeAttributes && (x[A] = d(x[A])), "attributeValueFn" in s && (x[A] = s.attributeValueFn(x[A], A, u)), "attributeNameFn" in s)) {
        var _ = x[A];
        delete x[A], x[s.attributeNameFn(A, x[A], u)] = _;
      }
    }
    return x;
  }
  function g(x) {
    var A = {};
    if (x.body && (x.name.toLowerCase() === "xml" || s.instructionHasAttributes)) {
      for (var _ = /([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|(\w+))\s*/g, p; (p = _.exec(x.body)) !== null; ) A[p[1]] = p[2] || p[3] || p[4];
      A = E(A);
    }
    if (x.name.toLowerCase() === "xml") {
      if (s.ignoreDeclaration) return;
      u[s.declarationKey] = {}, Object.keys(A).length && (u[s.declarationKey][s.attributesKey] = A), s.addParent && (u[s.declarationKey][s.parentKey] = u);
    } else {
      if (s.ignoreInstruction) return;
      s.trim && (x.body = x.body.trim());
      var P = {};
      s.instructionHasAttributes && Object.keys(A).length ? (P[x.name] = {}, P[x.name][s.attributesKey] = A) : P[x.name] = x.body, T("instruction", P);
    }
  }
  function N(x, A) {
    var _;
    if (typeof x == "object" && (A = x.attributes, x = x.name), A = E(A), "elementNameFn" in s && (x = s.elementNameFn(x, u)), s.compact) {
      if (_ = {}, !s.ignoreAttributes && A && Object.keys(A).length) {
        _[s.attributesKey] = {};
        var p;
        for (p in A) A.hasOwnProperty(p) && (_[s.attributesKey][p] = A[p]);
      }
      !(x in u) && (l(s.alwaysArray) ? s.alwaysArray.indexOf(x) !== -1 : s.alwaysArray) && (u[x] = []), u[x] && !l(u[x]) && (u[x] = [u[x]]), l(u[x]) ? u[x].push(_) : u[x] = _;
    } else u[s.elementsKey] || (u[s.elementsKey] = []), _ = {}, _[s.typeKey] = "element", _[s.nameKey] = x, !s.ignoreAttributes && A && Object.keys(A).length && (_[s.attributesKey] = A), s.alwaysChildren && (_[s.elementsKey] = []), u[s.elementsKey].push(_);
    _[s.parentKey] = u, u = _;
  }
  function w(x) {
    s.ignoreText || !x.trim() && !s.captureSpacesBetweenElements || (s.trim && (x = x.trim()), s.nativeType && (x = d(x)), s.sanitize && (x = x.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")), T("text", x));
  }
  function m(x) {
    s.ignoreComment || (s.trim && (x = x.trim()), T("comment", x));
  }
  function v(x) {
    var A = u[s.parentKey];
    s.addParent || delete u[s.parentKey], u = A;
  }
  function k(x) {
    s.ignoreCdata || (s.trim && (x = x.trim()), T("cdata", x));
  }
  function I(x) {
    s.ignoreDoctype || (x = x.replace(/^ /, ""), s.trim && (x = x.trim()), T("doctype", x));
  }
  function y(x) {
    x.note = x;
  }
  t.exports = function(x, A) {
    var _ = r.parser(true, {}), p = {};
    if (u = p, s = a(A), _.opt = { strictEntities: true }, _.onopentag = N, _.ontext = w, _.oncomment = m, _.onclosetag = v, _.onerror = y, _.oncdata = k, _.ondoctype = I, _.onprocessinginstruction = g, _.write(x).close(), p[s.elementsKey]) {
      var P = p[s.elementsKey];
      delete p[s.elementsKey], p[s.elementsKey] = P, delete p.text;
    }
    return p;
  };
})), Ea = ce(((e, t) => {
  var r = Rr(), o = Nn();
  function l(s) {
    var u = r.copyOptions(s);
    return r.ensureSpacesExists(u), u;
  }
  t.exports = function(s, u) {
    var a = l(u), d = o(s, a), T, E = "compact" in a && a.compact ? "_parent" : "parent";
    return "addParent" in a && a.addParent ? T = JSON.stringify(d, function(g, N) {
      return g === E ? "_" : N;
    }, a.spaces) : T = JSON.stringify(d, null, a.spaces), T.replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  };
})), On = ce(((e, t) => {
  var r = Rr(), o = kr().isArray, l, s;
  function u(_) {
    var p = r.copyOptions(_);
    return r.ensureFlagExists("ignoreDeclaration", p), r.ensureFlagExists("ignoreInstruction", p), r.ensureFlagExists("ignoreAttributes", p), r.ensureFlagExists("ignoreText", p), r.ensureFlagExists("ignoreComment", p), r.ensureFlagExists("ignoreCdata", p), r.ensureFlagExists("ignoreDoctype", p), r.ensureFlagExists("compact", p), r.ensureFlagExists("indentText", p), r.ensureFlagExists("indentCdata", p), r.ensureFlagExists("indentAttributes", p), r.ensureFlagExists("indentInstruction", p), r.ensureFlagExists("fullTagEmptyElement", p), r.ensureFlagExists("noQuotesForNativeAttributes", p), r.ensureSpacesExists(p), typeof p.spaces == "number" && (p.spaces = Array(p.spaces + 1).join(" ")), r.ensureKeyExists("declaration", p), r.ensureKeyExists("instruction", p), r.ensureKeyExists("attributes", p), r.ensureKeyExists("text", p), r.ensureKeyExists("comment", p), r.ensureKeyExists("cdata", p), r.ensureKeyExists("doctype", p), r.ensureKeyExists("type", p), r.ensureKeyExists("name", p), r.ensureKeyExists("elements", p), r.checkFnExists("doctype", p), r.checkFnExists("instruction", p), r.checkFnExists("cdata", p), r.checkFnExists("comment", p), r.checkFnExists("text", p), r.checkFnExists("instructionName", p), r.checkFnExists("elementName", p), r.checkFnExists("attributeName", p), r.checkFnExists("attributeValue", p), r.checkFnExists("attributes", p), r.checkFnExists("fullTagEmptyElement", p), p;
  }
  function a(_, p, P) {
    return (!P && _.spaces ? `
` : "") + Array(p + 1).join(_.spaces);
  }
  function d(_, p, P) {
    if (p.ignoreAttributes) return "";
    "attributesFn" in p && (_ = p.attributesFn(_, s, l));
    var U, C, q, ee, O = [];
    for (U in _) _.hasOwnProperty(U) && _[U] !== null && _[U] !== void 0 && (ee = p.noQuotesForNativeAttributes && typeof _[U] != "string" ? "" : '"', C = "" + _[U], C = C.replace(/"/g, "&quot;"), q = "attributeNameFn" in p ? p.attributeNameFn(U, C, s, l) : U, O.push(p.spaces && p.indentAttributes ? a(p, P + 1, false) : " "), O.push(q + "=" + ee + ("attributeValueFn" in p ? p.attributeValueFn(C, U, s, l) : C) + ee));
    return _ && Object.keys(_).length && p.spaces && p.indentAttributes && O.push(a(p, P, false)), O.join("");
  }
  function T(_, p, P) {
    return l = _, s = "xml", p.ignoreDeclaration ? "" : "<?xml" + d(_[p.attributesKey], p, P) + "?>";
  }
  function E(_, p, P) {
    if (p.ignoreInstruction) return "";
    var U;
    for (U in _) if (_.hasOwnProperty(U)) break;
    var C = "instructionNameFn" in p ? p.instructionNameFn(U, _[U], s, l) : U;
    if (typeof _[U] == "object") return l = _, s = C, "<?" + C + d(_[U][p.attributesKey], p, P) + "?>";
    var q = _[U] ? _[U] : "";
    return "instructionFn" in p && (q = p.instructionFn(q, U, s, l)), "<?" + C + (q ? " " + q : "") + "?>";
  }
  function g(_, p) {
    return p.ignoreComment ? "" : "<!--" + ("commentFn" in p ? p.commentFn(_, s, l) : _) + "-->";
  }
  function N(_, p) {
    return p.ignoreCdata ? "" : "<![CDATA[" + ("cdataFn" in p ? p.cdataFn(_, s, l) : _.replace("]]>", "]]]]><![CDATA[>")) + "]]>";
  }
  function w(_, p) {
    return p.ignoreDoctype ? "" : "<!DOCTYPE " + ("doctypeFn" in p ? p.doctypeFn(_, s, l) : _) + ">";
  }
  function m(_, p) {
    return p.ignoreText ? "" : (_ = "" + _, _ = _.replace(/&amp;/g, "&"), _ = _.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"), "textFn" in p ? p.textFn(_, s, l) : _);
  }
  function v(_, p) {
    var P;
    if (_.elements && _.elements.length) for (P = 0; P < _.elements.length; ++P) switch (_.elements[P][p.typeKey]) {
      case "text":
        if (p.indentText) return true;
        break;
      case "cdata":
        if (p.indentCdata) return true;
        break;
      case "instruction":
        if (p.indentInstruction) return true;
        break;
      case "doctype":
      case "comment":
      case "element":
        return true;
      default:
        return true;
    }
    return false;
  }
  function k(_, p, P) {
    l = _, s = _.name;
    var U = [], C = "elementNameFn" in p ? p.elementNameFn(_.name, _) : _.name;
    U.push("<" + C), _[p.attributesKey] && U.push(d(_[p.attributesKey], p, P));
    var q = _[p.elementsKey] && _[p.elementsKey].length || _[p.attributesKey] && _[p.attributesKey]["xml:space"] === "preserve";
    return q || ("fullTagEmptyElementFn" in p ? q = p.fullTagEmptyElementFn(_.name, _) : q = p.fullTagEmptyElement), q ? (U.push(">"), _[p.elementsKey] && _[p.elementsKey].length && (U.push(I(_[p.elementsKey], p, P + 1)), l = _, s = _.name), U.push(p.spaces && v(_, p) ? `
` + Array(P + 1).join(p.spaces) : ""), U.push("</" + C + ">")) : U.push("/>"), U.join("");
  }
  function I(_, p, P, U) {
    return _.reduce(function(C, q) {
      var ee = a(p, P, U && !C);
      switch (q.type) {
        case "element":
          return C + ee + k(q, p, P);
        case "comment":
          return C + ee + g(q[p.commentKey], p);
        case "doctype":
          return C + ee + w(q[p.doctypeKey], p);
        case "cdata":
          return C + (p.indentCdata ? ee : "") + N(q[p.cdataKey], p);
        case "text":
          return C + (p.indentText ? ee : "") + m(q[p.textKey], p);
        case "instruction":
          var O = {};
          return O[q[p.nameKey]] = q[p.attributesKey] ? q : q[p.instructionKey], C + (p.indentInstruction ? ee : "") + E(O, p, P);
      }
    }, "");
  }
  function y(_, p, P) {
    var U;
    for (U in _) if (_.hasOwnProperty(U)) switch (U) {
      case p.parentKey:
      case p.attributesKey:
        break;
      case p.textKey:
        if (p.indentText || P) return true;
        break;
      case p.cdataKey:
        if (p.indentCdata || P) return true;
        break;
      case p.instructionKey:
        if (p.indentInstruction || P) return true;
        break;
      case p.doctypeKey:
      case p.commentKey:
        return true;
      default:
        return true;
    }
    return false;
  }
  function x(_, p, P, U, C) {
    l = _, s = p;
    var q = "elementNameFn" in P ? P.elementNameFn(p, _) : p;
    if (typeof _ > "u" || _ === null || _ === "") return "fullTagEmptyElementFn" in P && P.fullTagEmptyElementFn(p, _) || P.fullTagEmptyElement ? "<" + q + "></" + q + ">" : "<" + q + "/>";
    var ee = [];
    if (p) {
      if (ee.push("<" + q), typeof _ != "object") return ee.push(">" + m(_, P) + "</" + q + ">"), ee.join("");
      _[P.attributesKey] && ee.push(d(_[P.attributesKey], P, U));
      var O = y(_, P, true) || _[P.attributesKey] && _[P.attributesKey]["xml:space"] === "preserve";
      if (O || ("fullTagEmptyElementFn" in P ? O = P.fullTagEmptyElementFn(p, _) : O = P.fullTagEmptyElement), O) ee.push(">");
      else return ee.push("/>"), ee.join("");
    }
    return ee.push(A(_, P, U + 1, false)), l = _, s = p, p && ee.push((C ? a(P, U, false) : "") + "</" + q + ">"), ee.join("");
  }
  function A(_, p, P, U) {
    var C, q, ee, O = [];
    for (q in _) if (_.hasOwnProperty(q)) for (ee = o(_[q]) ? _[q] : [_[q]], C = 0; C < ee.length; ++C) {
      switch (q) {
        case p.declarationKey:
          O.push(T(ee[C], p, P));
          break;
        case p.instructionKey:
          O.push((p.indentInstruction ? a(p, P, U) : "") + E(ee[C], p, P));
          break;
        case p.attributesKey:
        case p.parentKey:
          break;
        case p.textKey:
          O.push((p.indentText ? a(p, P, U) : "") + m(ee[C], p));
          break;
        case p.cdataKey:
          O.push((p.indentCdata ? a(p, P, U) : "") + N(ee[C], p));
          break;
        case p.doctypeKey:
          O.push(a(p, P, U) + w(ee[C], p));
          break;
        case p.commentKey:
          O.push(a(p, P, U) + g(ee[C], p));
          break;
        default:
          O.push(a(p, P, U) + x(ee[C], q, p, P, y(ee[C], p)));
      }
      U = U && !O.length;
    }
    return O.join("");
  }
  t.exports = function(_, p) {
    p = u(p);
    var P = [];
    return l = _, s = "_root_", p.compact ? P.push(A(_, p, 0, true)) : (_[p.declarationKey] && P.push(T(_[p.declarationKey], p, 0)), _[p.elementsKey] && _[p.elementsKey].length && P.push(I(_[p.elementsKey], p, 0, !P.length))), P.join("");
  };
})), Sa = ce(((e, t) => {
  var r = On();
  t.exports = function(o, l) {
    o instanceof Buffer && (o = o.toString());
    var s = null;
    if (typeof o == "string") try {
      s = JSON.parse(o);
    } catch {
      throw new Error("The JSON structure is invalid");
    }
    else s = o;
    return r(s, l);
  };
})), Pn = ce(((e, t) => {
  t.exports = { xml2js: Nn(), xml2json: Ea(), js2xml: On(), json2xml: Sa() };
}))(), Cr = (e) => {
  switch (e.type) {
    case void 0:
    case "element":
      const t = new Aa(e.name, e.attributes), r = e.elements || [];
      for (const o of r) {
        const l = Cr(o);
        l !== void 0 && t.push(l);
      }
      return t;
    case "text":
      return e.text;
    default:
      return;
  }
}, Ta = class extends we {
}, Aa = class extends te {
  static fromXmlString(e) {
    return Cr((0, Pn.xml2js)(e, { compact: false }));
  }
  constructor(e, t) {
    super(e), t && this.root.push(new Ta(t));
  }
  push(e) {
    this.root.push(e);
  }
}, ka = class extends te {
  constructor(e) {
    super(""), Q(this, "_attr", void 0), this._attr = e;
  }
  prepForXml(e) {
    return { _attr: this._attr };
  }
}, Fn = class extends te {
  constructor(e, t) {
    super(e), t && (this.root = t.root);
  }
}, Te = (e) => {
  if (isNaN(e)) throw new Error(`Invalid value '${e}' specified. Must be an integer.`);
  return Math.floor(e);
}, Kt = (e) => {
  const t = Te(e);
  if (t < 0) throw new Error(`Invalid value '${e}' specified. Must be a positive integer.`);
  return t;
}, Ir = (e, t) => {
  const r = t * 2;
  if (e.length !== r || isNaN(+`0x${e}`)) throw new Error(`Invalid hex value '${e}'. Expected ${r} digit hex value`);
  return e;
}, Ra = (e) => Ir(e, 2), jr = (e) => Ir(e, 1), Nr = (e) => {
  const t = e.slice(-2), r = e.substring(0, e.length - 2);
  return `${Number(r)}${t}`;
}, Dn = (e) => {
  const t = Nr(e);
  if (parseFloat(t) < 0) throw new Error(`Invalid value '${t}' specified. Expected a positive number.`);
  return t;
}, ut = (e) => e === "auto" ? e : Ir(e.charAt(0) === "#" ? e.substring(1) : e, 3), ze = (e) => typeof e == "string" ? Nr(e) : Te(e), Ca = (e) => typeof e == "string" ? Dn(e) : Kt(e), Se = (e) => typeof e == "string" ? Dn(e) : Kt(e), Ia = (e) => {
  const t = e.substring(0, e.length - 1);
  return `${Number(t)}%`;
}, Bn = (e) => typeof e == "number" ? Te(e) : e.slice(-1) === "%" ? Ia(e) : Nr(e), Na = Kt, Oa = Kt, Pa = (e) => e.toISOString(), le = class extends te {
  constructor(e, t = true) {
    super(e), t !== true && this.root.push(new Ae({ val: t }));
  }
}, Qt = class extends te {
  constructor(e, t) {
    super(e), this.root.push(new Ae({ val: Ca(t) }));
  }
}, Fa = class extends te {
}, He = class extends te {
  constructor(e, t) {
    super(e), this.root.push(new Ae({ val: t }));
  }
}, gt = (e, t) => new he({ name: e, attributes: { value: { key: "w:val", value: t } } }), Et = class extends te {
  constructor(e, t) {
    super(e), this.root.push(new Ae({ val: t }));
  }
}, Ye = class extends te {
  constructor(e, t) {
    super(e), this.root.push(t);
  }
}, he = class extends te {
  constructor({ name: e, attributes: t, children: r }) {
    super(e), t && this.root.push(new hn(t)), r && this.root.push(...r);
  }
}, Oe = { START: "start", CENTER: "center", LEFT: "left", RIGHT: "right" }, Ln = (e) => new he({ name: "w:jc", attributes: { val: { key: "w:val", value: e } } }), be = (e, { color: t, size: r, space: o, style: l }) => new he({ name: e, attributes: { style: { key: "w:val", value: l }, color: { key: "w:color", value: t === void 0 ? void 0 : ut(t) }, size: { key: "w:sz", value: r === void 0 ? void 0 : Na(r) }, space: { key: "w:space", value: o === void 0 ? void 0 : Oa(o) } } }), Or = { SINGLE: "single", NONE: "none" }, Da = class extends Ke {
  constructor(e) {
    super("w:pBdr"), e.top && this.root.push(be("w:top", e.top)), e.bottom && this.root.push(be("w:bottom", e.bottom)), e.left && this.root.push(be("w:left", e.left)), e.right && this.root.push(be("w:right", e.right)), e.between && this.root.push(be("w:between", e.between));
  }
}, Ba = class extends te {
  constructor() {
    super("w:pBdr");
    const e = be("w:bottom", { color: "auto", space: 1, style: Or.SINGLE, size: 6 });
    this.root.push(e);
  }
}, La = ({ start: e, end: t, left: r, right: o, hanging: l, firstLine: s, firstLineChars: u }) => new he({ name: "w:ind", attributes: { start: { key: "w:start", value: e === void 0 ? void 0 : ze(e) }, end: { key: "w:end", value: t === void 0 ? void 0 : ze(t) }, left: { key: "w:left", value: r === void 0 ? void 0 : ze(r) }, right: { key: "w:right", value: o === void 0 ? void 0 : ze(o) }, hanging: { key: "w:hanging", value: l === void 0 ? void 0 : Se(l) }, firstLine: { key: "w:firstLine", value: s === void 0 ? void 0 : Se(s) }, firstLineChars: { key: "w:firstLineChars", value: u === void 0 ? void 0 : Te(u) } } }), Ma = () => new he({ name: "w:br" }), Pr = { BEGIN: "begin", END: "end", SEPARATE: "separate" }, Fr = (e, t) => new he({ name: "w:fldChar", attributes: { type: { key: "w:fldCharType", value: e }, dirty: { key: "w:dirty", value: t } } }), Pt = (e) => Fr(Pr.BEGIN, e), Ft = (e) => Fr(Pr.SEPARATE, e), Dt = (e) => Fr(Pr.END, e), lt = { DEFAULT: "default", PRESERVE: "preserve" }, ct = class extends we {
  constructor(...e) {
    super(...e), Q(this, "xmlKeys", { space: "xml:space" });
  }
}, Ua = class extends te {
  constructor() {
    super("w:instrText"), this.root.push(new ct({ space: lt.PRESERVE })), this.root.push("PAGE");
  }
}, ja = class extends te {
  constructor() {
    super("w:instrText"), this.root.push(new ct({ space: lt.PRESERVE })), this.root.push("NUMPAGES");
  }
}, za = class extends te {
  constructor() {
    super("w:instrText"), this.root.push(new ct({ space: lt.PRESERVE })), this.root.push("SECTIONPAGES");
  }
}, Wa = class extends te {
  constructor() {
    super("w:instrText"), this.root.push(new ct({ space: lt.PRESERVE })), this.root.push("SECTION");
  }
}, Gt = ({ fill: e, color: t, type: r }) => new he({ name: "w:shd", attributes: { fill: { key: "w:fill", value: e === void 0 ? void 0 : ut(e) }, color: { key: "w:color", value: t === void 0 ? void 0 : ut(t) }, type: { key: "w:val", value: r } } }), Ce = class extends we {
  constructor(...e) {
    super(...e), Q(this, "xmlKeys", { id: "w:id", author: "w:author", date: "w:date" });
  }
}, Ha = class extends te {
  constructor(e) {
    super("w:del"), this.root.push(new Ce({ id: e.id, author: e.author, date: e.date }));
  }
}, Ka = class extends te {
  constructor(e) {
    super("w:ins"), this.root.push(new Ce({ id: e.id, author: e.author, date: e.date }));
  }
}, Ga = { DOT: "dot" }, qa = (e = Ga.DOT) => new he({ name: "w:em", attributes: { val: { key: "w:val", value: e } } }), Va = class extends te {
  constructor(e) {
    super("w:spacing"), this.root.push(new Ae({ val: ze(e) }));
  }
}, $a = class extends te {
  constructor(e) {
    super("w:color"), this.root.push(new Ae({ val: ut(e) }));
  }
}, Xa = class extends te {
  constructor(e) {
    super("w:highlight"), this.root.push(new Ae({ val: e }));
  }
}, Za = class extends te {
  constructor(e) {
    super("w:highlightCs"), this.root.push(new Ae({ val: e }));
  }
}, Ya = (e) => new he({ name: "w:lang", attributes: { value: { key: "w:val", value: e.value }, eastAsia: { key: "w:eastAsia", value: e.eastAsia }, bidirectional: { key: "w:bidi", value: e.bidirectional } } }), er = (e, t) => {
  if (typeof e == "string") {
    const o = e;
    return new he({ name: "w:rFonts", attributes: { ascii: { key: "w:ascii", value: o }, cs: { key: "w:cs", value: o }, eastAsia: { key: "w:eastAsia", value: o }, hAnsi: { key: "w:hAnsi", value: o }, hint: { key: "w:hint", value: t } } });
  }
  const r = e;
  return new he({ name: "w:rFonts", attributes: { ascii: { key: "w:ascii", value: r.ascii }, cs: { key: "w:cs", value: r.cs }, eastAsia: { key: "w:eastAsia", value: r.eastAsia }, hAnsi: { key: "w:hAnsi", value: r.hAnsi }, hint: { key: "w:hint", value: r.hint } } });
}, Mn = (e) => new he({ name: "w:vertAlign", attributes: { val: { key: "w:val", value: e } } }), Ja = () => Mn("superscript"), Qa = () => Mn("subscript"), Un = { SINGLE: "single" }, es = (e = Un.SINGLE, t) => new he({ name: "w:u", attributes: { val: { key: "w:val", value: e }, color: { key: "w:color", value: t === void 0 ? void 0 : ut(t) } } }), Ve = class extends Ke {
  constructor(e) {
    if (super("w:rPr"), !e) return;
    if (e.style && this.push(new He("w:rStyle", e.style)), e.font && (typeof e.font == "string" ? this.push(er(e.font)) : "name" in e.font ? this.push(er(e.font.name, e.font.hint)) : this.push(er(e.font))), e.bold !== void 0 && this.push(new le("w:b", e.bold)), e.boldComplexScript === void 0 && e.bold !== void 0 || e.boldComplexScript) {
      var t;
      this.push(new le("w:bCs", (t = e.boldComplexScript) !== null && t !== void 0 ? t : e.bold));
    }
    if (e.italics !== void 0 && this.push(new le("w:i", e.italics)), e.italicsComplexScript === void 0 && e.italics !== void 0 || e.italicsComplexScript) {
      var r;
      this.push(new le("w:iCs", (r = e.italicsComplexScript) !== null && r !== void 0 ? r : e.italics));
    }
    e.smallCaps !== void 0 ? this.push(new le("w:smallCaps", e.smallCaps)) : e.allCaps !== void 0 && this.push(new le("w:caps", e.allCaps)), e.strike !== void 0 && this.push(new le("w:strike", e.strike)), e.doubleStrike !== void 0 && this.push(new le("w:dstrike", e.doubleStrike)), e.emboss !== void 0 && this.push(new le("w:emboss", e.emboss)), e.imprint !== void 0 && this.push(new le("w:imprint", e.imprint)), e.noProof !== void 0 && this.push(new le("w:noProof", e.noProof)), e.snapToGrid !== void 0 && this.push(new le("w:snapToGrid", e.snapToGrid)), e.vanish && this.push(new le("w:vanish", e.vanish)), e.color && this.push(new $a(e.color)), e.characterSpacing && this.push(new Va(e.characterSpacing)), e.scale !== void 0 && this.push(new Et("w:w", e.scale)), e.kern && this.push(new Qt("w:kern", e.kern)), e.position && this.push(new He("w:position", e.position)), e.size !== void 0 && this.push(new Qt("w:sz", e.size));
    const o = e.sizeComplexScript === void 0 || e.sizeComplexScript === true ? e.size : e.sizeComplexScript;
    o && this.push(new Qt("w:szCs", o)), e.highlight && this.push(new Xa(e.highlight));
    const l = e.highlightComplexScript === void 0 || e.highlightComplexScript === true ? e.highlight : e.highlightComplexScript;
    l && this.push(new Za(l)), e.underline && this.push(es(e.underline.type, e.underline.color)), e.effect && this.push(new He("w:effect", e.effect)), e.border && this.push(be("w:bdr", e.border)), e.shading && this.push(Gt(e.shading)), e.subScript && this.push(Qa()), e.superScript && this.push(Ja()), e.rightToLeft !== void 0 && this.push(new le("w:rtl", e.rightToLeft)), e.emphasisMark && this.push(qa(e.emphasisMark.type)), e.language && this.push(Ya(e.language)), e.specVanish && this.push(new le("w:specVanish", e.vanish)), e.math && this.push(new le("w:oMath", e.math)), e.revision && this.push(new rs(e.revision));
  }
  push(e) {
    this.root.push(e);
  }
}, ts = class extends Ve {
  constructor(e) {
    super(e), (e == null ? void 0 : e.insertion) && this.push(new Ka(e.insertion)), (e == null ? void 0 : e.deletion) && this.push(new Ha(e.deletion));
  }
}, rs = class extends te {
  constructor(e) {
    super("w:rPrChange"), this.root.push(new Ce({ id: e.id, author: e.author, date: e.date })), this.addChildElement(new Ve(e));
  }
}, zr = class extends te {
  constructor(e) {
    if (super("w:t"), typeof e == "string") this.root.push(new ct({ space: lt.PRESERVE })), this.root.push(e);
    else {
      var t;
      this.root.push(new ct({ space: (t = e.space) !== null && t !== void 0 ? t : lt.DEFAULT })), this.root.push(e.text);
    }
  }
}, Bt = { CURRENT: "CURRENT", TOTAL_PAGES: "TOTAL_PAGES", TOTAL_PAGES_IN_SECTION: "TOTAL_PAGES_IN_SECTION", CURRENT_SECTION: "SECTION" }, $e = class extends te {
  constructor(e) {
    if (super("w:r"), Q(this, "properties", void 0), this.properties = new Ve(e), this.root.push(this.properties), e.break) for (let t = 0; t < e.break; t++) this.root.push(Ma());
    if (e.children) for (const t of e.children) {
      if (typeof t == "string") {
        switch (t) {
          case Bt.CURRENT:
            this.root.push(Pt()), this.root.push(new Ua()), this.root.push(Ft()), this.root.push(Dt());
            break;
          case Bt.TOTAL_PAGES:
            this.root.push(Pt()), this.root.push(new ja()), this.root.push(Ft()), this.root.push(Dt());
            break;
          case Bt.TOTAL_PAGES_IN_SECTION:
            this.root.push(Pt()), this.root.push(new za()), this.root.push(Ft()), this.root.push(Dt());
            break;
          case Bt.CURRENT_SECTION:
            this.root.push(Pt()), this.root.push(new Wa()), this.root.push(Ft()), this.root.push(Dt());
            break;
          default:
            this.root.push(new zr(t));
            break;
        }
        continue;
      }
      this.root.push(t);
    }
    else e.text !== void 0 && this.root.push(new zr(e.text));
  }
}, Wr = class extends $e {
  constructor(e) {
    super(typeof e == "string" ? { text: e } : e);
  }
}, ns = class extends we {
  constructor(...e) {
    super(...e), Q(this, "xmlKeys", { char: "w:char", symbolfont: "w:font" });
  }
}, Hr = class extends te {
  constructor(e = "", t = "Wingdings") {
    super("w:sym"), this.root.push(new ns({ char: e, symbolfont: t }));
  }
}, is = class extends $e {
  constructor(e) {
    if (typeof e == "string") return super({}), this.root.push(new Hr(e)), this;
    super(e), this.root.push(new Hr(e.char, e.symbolfont));
  }
}, kt = ce(((e, t) => {
  t.exports = r;
  function r(o, l) {
    if (!o) throw new Error(l || "Assertion failed");
  }
  r.equal = function(l, s, u) {
    if (l != s) throw new Error(u || "Assertion failed: " + l + " != " + s);
  };
})), Be = ce(((e) => {
  var t = kt();
  e.inherits = Ge();
  function r(O, W) {
    return (O.charCodeAt(W) & 64512) !== 55296 || W < 0 || W + 1 >= O.length ? false : (O.charCodeAt(W + 1) & 64512) === 56320;
  }
  function o(O, W) {
    if (Array.isArray(O)) return O.slice();
    if (!O) return [];
    var S = [];
    if (typeof O == "string") if (W) {
      if (W === "hex") for (O = O.replace(/[^a-z0-9]+/gi, ""), O.length % 2 !== 0 && (O = "0" + O), J = 0; J < O.length; J += 2) S.push(parseInt(O[J] + O[J + 1], 16));
    } else for (var H = 0, J = 0; J < O.length; J++) {
      var $ = O.charCodeAt(J);
      $ < 128 ? S[H++] = $ : $ < 2048 ? (S[H++] = $ >> 6 | 192, S[H++] = $ & 63 | 128) : r(O, J) ? ($ = 65536 + (($ & 1023) << 10) + (O.charCodeAt(++J) & 1023), S[H++] = $ >> 18 | 240, S[H++] = $ >> 12 & 63 | 128, S[H++] = $ >> 6 & 63 | 128, S[H++] = $ & 63 | 128) : (S[H++] = $ >> 12 | 224, S[H++] = $ >> 6 & 63 | 128, S[H++] = $ & 63 | 128);
    }
    else for (J = 0; J < O.length; J++) S[J] = O[J] | 0;
    return S;
  }
  e.toArray = o;
  function l(O) {
    for (var W = "", S = 0; S < O.length; S++) W += a(O[S].toString(16));
    return W;
  }
  e.toHex = l;
  function s(O) {
    return (O >>> 24 | O >>> 8 & 65280 | O << 8 & 16711680 | (O & 255) << 24) >>> 0;
  }
  e.htonl = s;
  function u(O, W) {
    for (var S = "", H = 0; H < O.length; H++) {
      var J = O[H];
      W === "little" && (J = s(J)), S += d(J.toString(16));
    }
    return S;
  }
  e.toHex32 = u;
  function a(O) {
    return O.length === 1 ? "0" + O : O;
  }
  e.zero2 = a;
  function d(O) {
    return O.length === 7 ? "0" + O : O.length === 6 ? "00" + O : O.length === 5 ? "000" + O : O.length === 4 ? "0000" + O : O.length === 3 ? "00000" + O : O.length === 2 ? "000000" + O : O.length === 1 ? "0000000" + O : O;
  }
  e.zero8 = d;
  function T(O, W, S, H) {
    var J = S - W;
    t(J % 4 === 0);
    for (var $ = new Array(J / 4), oe = 0, Z = W; oe < $.length; oe++, Z += 4) {
      var re;
      H === "big" ? re = O[Z] << 24 | O[Z + 1] << 16 | O[Z + 2] << 8 | O[Z + 3] : re = O[Z + 3] << 24 | O[Z + 2] << 16 | O[Z + 1] << 8 | O[Z], $[oe] = re >>> 0;
    }
    return $;
  }
  e.join32 = T;
  function E(O, W) {
    for (var S = new Array(O.length * 4), H = 0, J = 0; H < O.length; H++, J += 4) {
      var $ = O[H];
      W === "big" ? (S[J] = $ >>> 24, S[J + 1] = $ >>> 16 & 255, S[J + 2] = $ >>> 8 & 255, S[J + 3] = $ & 255) : (S[J + 3] = $ >>> 24, S[J + 2] = $ >>> 16 & 255, S[J + 1] = $ >>> 8 & 255, S[J] = $ & 255);
    }
    return S;
  }
  e.split32 = E;
  function g(O, W) {
    return O >>> W | O << 32 - W;
  }
  e.rotr32 = g;
  function N(O, W) {
    return O << W | O >>> 32 - W;
  }
  e.rotl32 = N;
  function w(O, W) {
    return O + W >>> 0;
  }
  e.sum32 = w;
  function m(O, W, S) {
    return O + W + S >>> 0;
  }
  e.sum32_3 = m;
  function v(O, W, S, H) {
    return O + W + S + H >>> 0;
  }
  e.sum32_4 = v;
  function k(O, W, S, H, J) {
    return O + W + S + H + J >>> 0;
  }
  e.sum32_5 = k;
  function I(O, W, S, H) {
    var J = O[W], $ = H + O[W + 1] >>> 0;
    O[W] = ($ < H ? 1 : 0) + S + J >>> 0, O[W + 1] = $;
  }
  e.sum64 = I;
  function y(O, W, S, H) {
    return (W + H >>> 0 < W ? 1 : 0) + O + S >>> 0;
  }
  e.sum64_hi = y;
  function x(O, W, S, H) {
    return W + H >>> 0;
  }
  e.sum64_lo = x;
  function A(O, W, S, H, J, $, oe, Z) {
    var re = 0, V = W;
    return V = V + H >>> 0, re += V < W ? 1 : 0, V = V + $ >>> 0, re += V < $ ? 1 : 0, V = V + Z >>> 0, re += V < Z ? 1 : 0, O + S + J + oe + re >>> 0;
  }
  e.sum64_4_hi = A;
  function _(O, W, S, H, J, $, oe, Z) {
    return W + H + $ + Z >>> 0;
  }
  e.sum64_4_lo = _;
  function p(O, W, S, H, J, $, oe, Z, re, V) {
    var F = 0, X = W;
    return X = X + H >>> 0, F += X < W ? 1 : 0, X = X + $ >>> 0, F += X < $ ? 1 : 0, X = X + Z >>> 0, F += X < Z ? 1 : 0, X = X + V >>> 0, F += X < V ? 1 : 0, O + S + J + oe + re + F >>> 0;
  }
  e.sum64_5_hi = p;
  function P(O, W, S, H, J, $, oe, Z, re, V) {
    return W + H + $ + Z + V >>> 0;
  }
  e.sum64_5_lo = P;
  function U(O, W, S) {
    return (W << 32 - S | O >>> S) >>> 0;
  }
  e.rotr64_hi = U;
  function C(O, W, S) {
    return (O << 32 - S | W >>> S) >>> 0;
  }
  e.rotr64_lo = C;
  function q(O, W, S) {
    return O >>> S;
  }
  e.shr64_hi = q;
  function ee(O, W, S) {
    return (O << 32 - S | W >>> S) >>> 0;
  }
  e.shr64_lo = ee;
})), Rt = ce(((e) => {
  var t = Be(), r = kt();
  function o() {
    this.pending = null, this.pendingTotal = 0, this.blockSize = this.constructor.blockSize, this.outSize = this.constructor.outSize, this.hmacStrength = this.constructor.hmacStrength, this.padLength = this.constructor.padLength / 8, this.endian = "big", this._delta8 = this.blockSize / 8, this._delta32 = this.blockSize / 32;
  }
  e.BlockHash = o, o.prototype.update = function(s, u) {
    if (s = t.toArray(s, u), this.pending ? this.pending = this.pending.concat(s) : this.pending = s, this.pendingTotal += s.length, this.pending.length >= this._delta8) {
      s = this.pending;
      var a = s.length % this._delta8;
      this.pending = s.slice(s.length - a, s.length), this.pending.length === 0 && (this.pending = null), s = t.join32(s, 0, s.length - a, this.endian);
      for (var d = 0; d < s.length; d += this._delta32) this._update(s, d, d + this._delta32);
    }
    return this;
  }, o.prototype.digest = function(s) {
    return this.update(this._pad()), r(this.pending === null), this._digest(s);
  }, o.prototype._pad = function() {
    var s = this.pendingTotal, u = this._delta8, a = u - (s + this.padLength) % u, d = new Array(a + this.padLength);
    d[0] = 128;
    for (var T = 1; T < a; T++) d[T] = 0;
    if (s <<= 3, this.endian === "big") {
      for (var E = 8; E < this.padLength; E++) d[T++] = 0;
      d[T++] = 0, d[T++] = 0, d[T++] = 0, d[T++] = 0, d[T++] = s >>> 24 & 255, d[T++] = s >>> 16 & 255, d[T++] = s >>> 8 & 255, d[T++] = s & 255;
    } else for (d[T++] = s & 255, d[T++] = s >>> 8 & 255, d[T++] = s >>> 16 & 255, d[T++] = s >>> 24 & 255, d[T++] = 0, d[T++] = 0, d[T++] = 0, d[T++] = 0, E = 8; E < this.padLength; E++) d[T++] = 0;
    return d;
  };
})), jn = ce(((e) => {
  var t = Be().rotr32;
  function r(E, g, N, w) {
    if (E === 0) return o(g, N, w);
    if (E === 1 || E === 3) return s(g, N, w);
    if (E === 2) return l(g, N, w);
  }
  e.ft_1 = r;
  function o(E, g, N) {
    return E & g ^ ~E & N;
  }
  e.ch32 = o;
  function l(E, g, N) {
    return E & g ^ E & N ^ g & N;
  }
  e.maj32 = l;
  function s(E, g, N) {
    return E ^ g ^ N;
  }
  e.p32 = s;
  function u(E) {
    return t(E, 2) ^ t(E, 13) ^ t(E, 22);
  }
  e.s0_256 = u;
  function a(E) {
    return t(E, 6) ^ t(E, 11) ^ t(E, 25);
  }
  e.s1_256 = a;
  function d(E) {
    return t(E, 7) ^ t(E, 18) ^ E >>> 3;
  }
  e.g0_256 = d;
  function T(E) {
    return t(E, 17) ^ t(E, 19) ^ E >>> 10;
  }
  e.g1_256 = T;
})), as = ce(((e, t) => {
  var r = Be(), o = Rt(), l = jn(), s = r.rotl32, u = r.sum32, a = r.sum32_5, d = l.ft_1, T = o.BlockHash, E = [1518500249, 1859775393, 2400959708, 3395469782];
  function g() {
    if (!(this instanceof g)) return new g();
    T.call(this), this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], this.W = new Array(80);
  }
  r.inherits(g, T), t.exports = g, g.blockSize = 512, g.outSize = 160, g.hmacStrength = 80, g.padLength = 64, g.prototype._update = function(w, m) {
    for (var v = this.W, k = 0; k < 16; k++) v[k] = w[m + k];
    for (; k < v.length; k++) v[k] = s(v[k - 3] ^ v[k - 8] ^ v[k - 14] ^ v[k - 16], 1);
    var I = this.h[0], y = this.h[1], x = this.h[2], A = this.h[3], _ = this.h[4];
    for (k = 0; k < v.length; k++) {
      var p = ~~(k / 20), P = a(s(I, 5), d(p, y, x, A), _, v[k], E[p]);
      _ = A, A = x, x = s(y, 30), y = I, I = P;
    }
    this.h[0] = u(this.h[0], I), this.h[1] = u(this.h[1], y), this.h[2] = u(this.h[2], x), this.h[3] = u(this.h[3], A), this.h[4] = u(this.h[4], _);
  }, g.prototype._digest = function(w) {
    return w === "hex" ? r.toHex32(this.h, "big") : r.split32(this.h, "big");
  };
})), zn = ce(((e, t) => {
  var r = Be(), o = Rt(), l = jn(), s = kt(), u = r.sum32, a = r.sum32_4, d = r.sum32_5, T = l.ch32, E = l.maj32, g = l.s0_256, N = l.s1_256, w = l.g0_256, m = l.g1_256, v = o.BlockHash, k = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298];
  function I() {
    if (!(this instanceof I)) return new I();
    v.call(this), this.h = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225], this.k = k, this.W = new Array(64);
  }
  r.inherits(I, v), t.exports = I, I.blockSize = 512, I.outSize = 256, I.hmacStrength = 192, I.padLength = 64, I.prototype._update = function(x, A) {
    for (var _ = this.W, p = 0; p < 16; p++) _[p] = x[A + p];
    for (; p < _.length; p++) _[p] = a(m(_[p - 2]), _[p - 7], w(_[p - 15]), _[p - 16]);
    var P = this.h[0], U = this.h[1], C = this.h[2], q = this.h[3], ee = this.h[4], O = this.h[5], W = this.h[6], S = this.h[7];
    for (s(this.k.length === _.length), p = 0; p < _.length; p++) {
      var H = d(S, N(ee), T(ee, O, W), this.k[p], _[p]), J = u(g(P), E(P, U, C));
      S = W, W = O, O = ee, ee = u(q, H), q = C, C = U, U = P, P = u(H, J);
    }
    this.h[0] = u(this.h[0], P), this.h[1] = u(this.h[1], U), this.h[2] = u(this.h[2], C), this.h[3] = u(this.h[3], q), this.h[4] = u(this.h[4], ee), this.h[5] = u(this.h[5], O), this.h[6] = u(this.h[6], W), this.h[7] = u(this.h[7], S);
  }, I.prototype._digest = function(x) {
    return x === "hex" ? r.toHex32(this.h, "big") : r.split32(this.h, "big");
  };
})), ss = ce(((e, t) => {
  var r = Be(), o = zn();
  function l() {
    if (!(this instanceof l)) return new l();
    o.call(this), this.h = [3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428];
  }
  r.inherits(l, o), t.exports = l, l.blockSize = 512, l.outSize = 224, l.hmacStrength = 192, l.padLength = 64, l.prototype._digest = function(u) {
    return u === "hex" ? r.toHex32(this.h.slice(0, 7), "big") : r.split32(this.h.slice(0, 7), "big");
  };
})), Wn = ce(((e, t) => {
  var r = Be(), o = Rt(), l = kt(), s = r.rotr64_hi, u = r.rotr64_lo, a = r.shr64_hi, d = r.shr64_lo, T = r.sum64, E = r.sum64_hi, g = r.sum64_lo, N = r.sum64_4_hi, w = r.sum64_4_lo, m = r.sum64_5_hi, v = r.sum64_5_lo, k = o.BlockHash, I = [1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399, 3921009573, 2173295548, 961987163, 4081628472, 1508970993, 3053834265, 2453635748, 2937671579, 2870763221, 3664609560, 3624381080, 2734883394, 310598401, 1164996542, 607225278, 1323610764, 1426881987, 3590304994, 1925078388, 4068182383, 2162078206, 991336113, 2614888103, 633803317, 3248222580, 3479774868, 3835390401, 2666613458, 4022224774, 944711139, 264347078, 2341262773, 604807628, 2007800933, 770255983, 1495990901, 1249150122, 1856431235, 1555081692, 3175218132, 1996064986, 2198950837, 2554220882, 3999719339, 2821834349, 766784016, 2952996808, 2566594879, 3210313671, 3203337956, 3336571891, 1034457026, 3584528711, 2466948901, 113926993, 3758326383, 338241895, 168717936, 666307205, 1188179964, 773529912, 1546045734, 1294757372, 1522805485, 1396182291, 2643833823, 1695183700, 2343527390, 1986661051, 1014477480, 2177026350, 1206759142, 2456956037, 344077627, 2730485921, 1290863460, 2820302411, 3158454273, 3259730800, 3505952657, 3345764771, 106217008, 3516065817, 3606008344, 3600352804, 1432725776, 4094571909, 1467031594, 275423344, 851169720, 430227734, 3100823752, 506948616, 1363258195, 659060556, 3750685593, 883997877, 3785050280, 958139571, 3318307427, 1322822218, 3812723403, 1537002063, 2003034995, 1747873779, 3602036899, 1955562222, 1575990012, 2024104815, 1125592928, 2227730452, 2716904306, 2361852424, 442776044, 2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573, 3329325298, 3815920427, 3391569614, 3928383900, 3515267271, 566280711, 3940187606, 3454069534, 4118630271, 4000239992, 116418474, 1914138554, 174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315, 685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100, 1126000580, 2618297676, 1288033470, 3409855158, 1501505948, 4234509866, 1607167915, 987167468, 1816402316, 1246189591];
  function y() {
    if (!(this instanceof y)) return new y();
    k.call(this), this.h = [1779033703, 4089235720, 3144134277, 2227873595, 1013904242, 4271175723, 2773480762, 1595750129, 1359893119, 2917565137, 2600822924, 725511199, 528734635, 4215389547, 1541459225, 327033209], this.k = I, this.W = new Array(160);
  }
  r.inherits(y, k), t.exports = y, y.blockSize = 1024, y.outSize = 512, y.hmacStrength = 192, y.padLength = 128, y.prototype._prepareBlock = function(J, $) {
    for (var oe = this.W, Z = 0; Z < 32; Z++) oe[Z] = J[$ + Z];
    for (; Z < oe.length; Z += 2) {
      var re = W(oe[Z - 4], oe[Z - 3]), V = S(oe[Z - 4], oe[Z - 3]), F = oe[Z - 14], X = oe[Z - 13], Y = ee(oe[Z - 30], oe[Z - 29]), ne = O(oe[Z - 30], oe[Z - 29]), de = oe[Z - 32], b = oe[Z - 31];
      oe[Z] = N(re, V, F, X, Y, ne, de, b), oe[Z + 1] = w(re, V, F, X, Y, ne, de, b);
    }
  }, y.prototype._update = function(J, $) {
    this._prepareBlock(J, $);
    var oe = this.W, Z = this.h[0], re = this.h[1], V = this.h[2], F = this.h[3], X = this.h[4], Y = this.h[5], ne = this.h[6], de = this.h[7], b = this.h[8], h = this.h[9], j = this.h[10], M = this.h[11], ie = this.h[12], D = this.h[13], B = this.h[14], c = this.h[15];
    l(this.k.length === oe.length);
    for (var G = 0; G < oe.length; G += 2) {
      var R = B, n = c, i = C(b, h), f = q(b, h), L = x(b, h, j, M, ie), K = A(b, h, j, M, ie, D), z = this.k[G], ae = this.k[G + 1], ue = oe[G], se = oe[G + 1], fe = m(R, n, i, f, L, K, z, ae, ue, se), me = v(R, n, i, f, L, K, z, ae, ue, se);
      R = P(Z, re), n = U(Z, re), i = _(Z, re, V, F, X), f = p(Z, re, V, F, X, Y);
      var ve = E(R, n, i, f), Ee = g(R, n, i, f);
      B = ie, c = D, ie = j, D = M, j = b, M = h, b = E(ne, de, fe, me), h = g(de, de, fe, me), ne = X, de = Y, X = V, Y = F, V = Z, F = re, Z = E(fe, me, ve, Ee), re = g(fe, me, ve, Ee);
    }
    T(this.h, 0, Z, re), T(this.h, 2, V, F), T(this.h, 4, X, Y), T(this.h, 6, ne, de), T(this.h, 8, b, h), T(this.h, 10, j, M), T(this.h, 12, ie, D), T(this.h, 14, B, c);
  }, y.prototype._digest = function(J) {
    return J === "hex" ? r.toHex32(this.h, "big") : r.split32(this.h, "big");
  };
  function x(H, J, $, oe, Z) {
    var re = H & $ ^ ~H & Z;
    return re < 0 && (re += 4294967296), re;
  }
  function A(H, J, $, oe, Z, re) {
    var V = J & oe ^ ~J & re;
    return V < 0 && (V += 4294967296), V;
  }
  function _(H, J, $, oe, Z) {
    var re = H & $ ^ H & Z ^ $ & Z;
    return re < 0 && (re += 4294967296), re;
  }
  function p(H, J, $, oe, Z, re) {
    var V = J & oe ^ J & re ^ oe & re;
    return V < 0 && (V += 4294967296), V;
  }
  function P(H, J) {
    var $ = s(H, J, 28), oe = s(J, H, 2), Z = s(J, H, 7), re = $ ^ oe ^ Z;
    return re < 0 && (re += 4294967296), re;
  }
  function U(H, J) {
    var $ = u(H, J, 28), oe = u(J, H, 2), Z = u(J, H, 7), re = $ ^ oe ^ Z;
    return re < 0 && (re += 4294967296), re;
  }
  function C(H, J) {
    var $ = s(H, J, 14), oe = s(H, J, 18), Z = s(J, H, 9), re = $ ^ oe ^ Z;
    return re < 0 && (re += 4294967296), re;
  }
  function q(H, J) {
    var $ = u(H, J, 14), oe = u(H, J, 18), Z = u(J, H, 9), re = $ ^ oe ^ Z;
    return re < 0 && (re += 4294967296), re;
  }
  function ee(H, J) {
    var $ = s(H, J, 1), oe = s(H, J, 8), Z = a(H, J, 7), re = $ ^ oe ^ Z;
    return re < 0 && (re += 4294967296), re;
  }
  function O(H, J) {
    var $ = u(H, J, 1), oe = u(H, J, 8), Z = d(H, J, 7), re = $ ^ oe ^ Z;
    return re < 0 && (re += 4294967296), re;
  }
  function W(H, J) {
    var $ = s(H, J, 19), oe = s(J, H, 29), Z = a(H, J, 6), re = $ ^ oe ^ Z;
    return re < 0 && (re += 4294967296), re;
  }
  function S(H, J) {
    var $ = u(H, J, 19), oe = u(J, H, 29), Z = d(H, J, 6), re = $ ^ oe ^ Z;
    return re < 0 && (re += 4294967296), re;
  }
})), os = ce(((e, t) => {
  var r = Be(), o = Wn();
  function l() {
    if (!(this instanceof l)) return new l();
    o.call(this), this.h = [3418070365, 3238371032, 1654270250, 914150663, 2438529370, 812702999, 355462360, 4144912697, 1731405415, 4290775857, 2394180231, 1750603025, 3675008525, 1694076839, 1203062813, 3204075428];
  }
  r.inherits(l, o), t.exports = l, l.blockSize = 1024, l.outSize = 384, l.hmacStrength = 192, l.padLength = 128, l.prototype._digest = function(u) {
    return u === "hex" ? r.toHex32(this.h.slice(0, 12), "big") : r.split32(this.h.slice(0, 12), "big");
  };
})), us = ce(((e) => {
  e.sha1 = as(), e.sha224 = ss(), e.sha256 = zn(), e.sha384 = os(), e.sha512 = Wn();
})), ls = ce(((e) => {
  var t = Be(), r = Rt(), o = t.rotl32, l = t.sum32, s = t.sum32_3, u = t.sum32_4, a = r.BlockHash;
  function d() {
    if (!(this instanceof d)) return new d();
    a.call(this), this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], this.endian = "little";
  }
  t.inherits(d, a), e.ripemd160 = d, d.blockSize = 512, d.outSize = 160, d.hmacStrength = 192, d.padLength = 64, d.prototype._update = function(I, y) {
    for (var x = this.h[0], A = this.h[1], _ = this.h[2], p = this.h[3], P = this.h[4], U = x, C = A, q = _, ee = p, O = P, W = 0; W < 80; W++) {
      var S = l(o(u(x, T(W, A, _, p), I[N[W] + y], E(W)), m[W]), P);
      x = P, P = p, p = o(_, 10), _ = A, A = S, S = l(o(u(U, T(79 - W, C, q, ee), I[w[W] + y], g(W)), v[W]), O), U = O, O = ee, ee = o(q, 10), q = C, C = S;
    }
    S = s(this.h[1], _, ee), this.h[1] = s(this.h[2], p, O), this.h[2] = s(this.h[3], P, U), this.h[3] = s(this.h[4], x, C), this.h[4] = s(this.h[0], A, q), this.h[0] = S;
  }, d.prototype._digest = function(I) {
    return I === "hex" ? t.toHex32(this.h, "little") : t.split32(this.h, "little");
  };
  function T(k, I, y, x) {
    return k <= 15 ? I ^ y ^ x : k <= 31 ? I & y | ~I & x : k <= 47 ? (I | ~y) ^ x : k <= 63 ? I & x | y & ~x : I ^ (y | ~x);
  }
  function E(k) {
    return k <= 15 ? 0 : k <= 31 ? 1518500249 : k <= 47 ? 1859775393 : k <= 63 ? 2400959708 : 2840853838;
  }
  function g(k) {
    return k <= 15 ? 1352829926 : k <= 31 ? 1548603684 : k <= 47 ? 1836072691 : k <= 63 ? 2053994217 : 0;
  }
  var N = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13], w = [5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11], m = [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6], v = [8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11];
})), cs = ce(((e, t) => {
  var r = Be(), o = kt();
  function l(s, u, a) {
    if (!(this instanceof l)) return new l(s, u, a);
    this.Hash = s, this.blockSize = s.blockSize / 8, this.outSize = s.outSize / 8, this.inner = null, this.outer = null, this._init(r.toArray(u, a));
  }
  t.exports = l, l.prototype._init = function(u) {
    u.length > this.blockSize && (u = new this.Hash().update(u).digest()), o(u.length <= this.blockSize);
    for (var a = u.length; a < this.blockSize; a++) u.push(0);
    for (a = 0; a < u.length; a++) u[a] ^= 54;
    for (this.inner = new this.Hash().update(u), a = 0; a < u.length; a++) u[a] ^= 106;
    this.outer = new this.Hash().update(u);
  }, l.prototype.update = function(u, a) {
    return this.inner.update(u, a), this;
  }, l.prototype.digest = function(u) {
    return this.outer.update(this.inner.digest()), this.outer.digest(u);
  };
})), hs = yr(ce(((e) => {
  var t = e;
  t.utils = Be(), t.common = Rt(), t.sha = us(), t.ripemd = ls(), t.hmac = cs(), t.sha1 = t.sha.sha1, t.sha256 = t.sha.sha256, t.sha224 = t.sha.sha224, t.sha384 = t.sha.sha384, t.sha512 = t.sha.sha512, t.ripemd160 = t.ripemd.ripemd160;
}))()), fs = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict", ds = (e, t = 21) => (r = t) => {
  let o = "", l = r | 0;
  for (; l--; ) o += e[Math.random() * e.length | 0];
  return o;
}, ps = (e = 21) => {
  let t = "", r = e | 0;
  for (; r--; ) t += fs[Math.random() * 64 | 0];
  return t;
}, Ie = (e) => Math.floor(e * 72 * 20), qt = (e = 0) => {
  let t = e;
  return () => ++t;
}, ms = () => qt(), ws = () => qt(1), vs = () => qt(), gs = () => qt(), Hn = () => ps().toLowerCase(), Kr = (e) => hs.default.sha1().update(e instanceof ArrayBuffer ? new Uint8Array(e) : e).digest("hex"), yt = (e) => ds("1234567890abcdef", e)(), ys = () => `${yt(8)}-${yt(4)}-${yt(4)}-${yt(4)}-${yt(12)}`, tr = (e) => new Uint8Array(new TextEncoder().encode(e)), bs = { PAGE: "page" }, _s = { PAGE: "page" }, xs = () => new he({ name: "wp:simplePos", attributes: { x: { key: "x", value: 0 }, y: { key: "y", value: 0 } } }), Kn = (e) => new he({ name: "wp:align", children: [e] }), Gn = (e) => new he({ name: "wp:posOffset", children: [e.toString()] }), Es = ({ relative: e, align: t, offset: r }) => new he({ name: "wp:positionH", attributes: { relativeFrom: { key: "relativeFrom", value: e ?? bs.PAGE } }, children: [(() => {
  if (t) return Kn(t);
  if (r !== void 0) return Gn(r);
  throw new Error("There is no configuration provided for floating position (Align or offset)");
})()] }), Ss = ({ relative: e, align: t, offset: r }) => new he({ name: "wp:positionV", attributes: { relativeFrom: { key: "relativeFrom", value: e ?? _s.PAGE } }, children: [(() => {
  if (t) return Kn(t);
  if (r !== void 0) return Gn(r);
  throw new Error("There is no configuration provided for floating position (Align or offset)");
})()] }), Ts = (e = {}) => {
  var t, r, o, l;
  return new he({ name: "wps:bodyPr", attributes: { lIns: { key: "lIns", value: (t = e.margins) === null || t === void 0 ? void 0 : t.left }, rIns: { key: "rIns", value: (r = e.margins) === null || r === void 0 ? void 0 : r.right }, tIns: { key: "tIns", value: (o = e.margins) === null || o === void 0 ? void 0 : o.top }, bIns: { key: "bIns", value: (l = e.margins) === null || l === void 0 ? void 0 : l.bottom }, anchor: { key: "anchor", value: e.verticalAnchor } }, children: [...e.noAutoFit ? [new le("a:noAutofit", e.noAutoFit)] : []] });
}, As = (e = { txBox: "1" }) => new he({ name: "wps:cNvSpPr", attributes: { txBox: { key: "txBox", value: e.txBox } } }), ks = (e) => new he({ name: "w:txbxContent", children: [...e] }), Rs = (e) => new he({ name: "wps:txbx", children: [ks(e)] }), Cs = class extends we {
  constructor(...e) {
    super(...e), Q(this, "xmlKeys", { cx: "cx", cy: "cy" });
  }
}, Is = class extends te {
  constructor(e, t) {
    super("a:ext"), Q(this, "attributes", void 0), this.attributes = new Cs({ cx: e, cy: t }), this.root.push(this.attributes);
  }
}, Ns = class extends we {
  constructor(...e) {
    super(...e), Q(this, "xmlKeys", { x: "x", y: "y" });
  }
}, Os = class extends te {
  constructor(e, t) {
    super("a:off"), this.root.push(new Ns({ x: e ?? 0, y: t ?? 0 }));
  }
}, Ps = class extends we {
  constructor(...e) {
    super(...e), Q(this, "xmlKeys", { flipVertical: "flipV", flipHorizontal: "flipH", rotation: "rot" });
  }
}, qn = class extends te {
  constructor(e) {
    var t, r, o, l;
    super("a:xfrm"), Q(this, "extents", void 0), Q(this, "offset", void 0), this.root.push(new Ps({ flipVertical: (t = e.flip) === null || t === void 0 ? void 0 : t.vertical, flipHorizontal: (r = e.flip) === null || r === void 0 ? void 0 : r.horizontal, rotation: e.rotation })), this.offset = new Os((o = e.offset) === null || o === void 0 || (o = o.emus) === null || o === void 0 ? void 0 : o.x, (l = e.offset) === null || l === void 0 || (l = l.emus) === null || l === void 0 ? void 0 : l.y), this.extents = new Is(e.emus.x, e.emus.y), this.root.push(this.offset), this.root.push(this.extents);
  }
}, Vn = () => new he({ name: "a:noFill" }), Fs = (e) => new he({ name: "a:srgbClr", attributes: { value: { key: "val", value: e.value } } }), Ds = (e) => new he({ name: "a:schemeClr", attributes: { value: { key: "val", value: e.value } } }), wr = (e) => new he({ name: "a:solidFill", children: [e.type === "rgb" ? Fs(e) : Ds(e)] }), Bs = (e) => new he({ name: "a:ln", attributes: { width: { key: "w", value: e.width }, cap: { key: "cap", value: e.cap }, compoundLine: { key: "cmpd", value: e.compoundLine }, align: { key: "algn", value: e.align } }, children: [e.type === "noFill" ? Vn() : e.solidFillType === "rgb" ? wr({ type: "rgb", value: e.value }) : wr({ type: "scheme", value: e.value })] }), Ls = class extends te {
  constructor() {
    super("a:avLst");
  }
}, Ms = class extends we {
  constructor(...e) {
    super(...e), Q(this, "xmlKeys", { prst: "prst" });
  }
}, Us = class extends te {
  constructor() {
    super("a:prstGeom"), this.root.push(new Ms({ prst: "rect" })), this.root.push(new Ls());
  }
}, js = class extends we {
  constructor(...e) {
    super(...e), Q(this, "xmlKeys", { bwMode: "bwMode" });
  }
}, $n = class extends te {
  constructor({ element: e, outline: t, solidFill: r, transform: o }) {
    super(`${e}:spPr`), Q(this, "form", void 0), this.root.push(new js({ bwMode: "auto" })), this.form = new qn(o), this.root.push(this.form), this.root.push(new Us()), t && (this.root.push(Vn()), this.root.push(Bs(t))), r && this.root.push(wr(r));
  }
}, Gr = (e) => new he({ name: "wps:wsp", children: [As(e.nonVisualProperties), new $n({ element: "wps", transform: e.transformation, outline: e.outline, solidFill: e.solidFill }), Rs(e.children), Ts(e.bodyProperties)] }), rr = class extends we {
  constructor(...e) {
    super(...e), Q(this, "xmlKeys", { uri: "uri" });
  }
}, zs = (e) => new he({ name: "asvg:svgBlip", attributes: { asvg: { key: "xmlns:asvg", value: "http://schemas.microsoft.com/office/drawing/2016/SVG/main" }, embed: { key: "r:embed", value: `rId{${e.fileName}}` } } }), Ws = (e) => new he({ name: "a:ext", attributes: { uri: { key: "uri", value: "{96DAC541-7B7A-43D3-8B79-37D633B846F1}" } }, children: [zs(e)] }), Hs = (e) => new he({ name: "a:extLst", children: [Ws(e)] }), Ks = (e) => new he({ name: "a:blip", attributes: { embed: { key: "r:embed", value: `rId{${e.type === "svg" ? e.fallback.fileName : e.fileName}}` }, cstate: { key: "cstate", value: "none" } }, children: e.type === "svg" ? [Hs(e)] : [] }), Gs = class extends te {
  constructor() {
    super("a:srcRect");
  }
}, qs = class extends te {
  constructor() {
    super("a:fillRect");
  }
}, Vs = class extends te {
  constructor() {
    super("a:stretch"), this.root.push(new qs());
  }
}, $s = class extends te {
  constructor(e) {
    super("pic:blipFill"), this.root.push(Ks(e)), this.root.push(new Gs()), this.root.push(new Vs());
  }
}, Xs = class extends we {
  constructor(...e) {
    super(...e), Q(this, "xmlKeys", { noChangeAspect: "noChangeAspect", noChangeArrowheads: "noChangeArrowheads" });
  }
}, Zs = class extends te {
  constructor() {
    super("a:picLocks"), this.root.push(new Xs({ noChangeAspect: 1, noChangeArrowheads: 1 }));
  }
}, Ys = class extends te {
  constructor() {
    super("pic:cNvPicPr"), this.root.push(new Zs());
  }
}, Xn = (e, t) => new he({ name: "a:hlinkClick", attributes: pe(pe({}, t ? { xmlns: { key: "xmlns:a", value: "http://schemas.openxmlformats.org/drawingml/2006/main" } } : {}), {}, { id: { key: "r:id", value: `rId${e}` } }) }), Js = class extends we {
  constructor(...e) {
    super(...e), Q(this, "xmlKeys", { id: "id", name: "name", descr: "descr" });
  }
}, Qs = class extends te {
  constructor() {
    super("pic:cNvPr"), this.root.push(new Js({ id: 0, name: "", descr: "" }));
  }
  prepForXml(e) {
    for (let t = e.stack.length - 1; t >= 0; t--) {
      const r = e.stack[t];
      if (r instanceof Vt) {
        this.root.push(Xn(r.linkId, false));
        break;
      }
    }
    return super.prepForXml(e);
  }
}, eo = class extends te {
  constructor() {
    super("pic:nvPicPr"), this.root.push(new Qs()), this.root.push(new Ys());
  }
}, to = class extends we {
  constructor(...e) {
    super(...e), Q(this, "xmlKeys", { xmlns: "xmlns:pic" });
  }
}, qr = class extends te {
  constructor({ mediaData: e, transform: t, outline: r }) {
    super("pic:pic"), this.root.push(new to({ xmlns: "http://schemas.openxmlformats.org/drawingml/2006/picture" })), this.root.push(new eo()), this.root.push(new $s(e)), this.root.push(new $n({ element: "pic", transform: t, outline: r }));
  }
}, ro = (e) => new he({ name: "wpg:grpSpPr", children: [new qn(e)] }), no = () => new he({ name: "wpg:cNvGrpSpPr" }), io = (e) => new he({ name: "wpg:wgp", children: [no(), ro(e.transformation), ...e.children] }), ao = class extends te {
  constructor({ mediaData: e, transform: t, outline: r, solidFill: o }) {
    if (super("a:graphicData"), e.type === "wps") {
      this.root.push(new rr({ uri: "http://schemas.microsoft.com/office/word/2010/wordprocessingShape" }));
      const l = Gr(pe(pe({}, e.data), {}, { transformation: t, outline: r, solidFill: o }));
      this.root.push(l);
    } else if (e.type === "wpg") {
      this.root.push(new rr({ uri: "http://schemas.microsoft.com/office/word/2010/wordprocessingGroup" }));
      const l = io({ children: e.children.map((s) => s.type === "wps" ? Gr(pe(pe({}, s.data), {}, { transformation: s.transformation, outline: s.outline, solidFill: s.solidFill })) : new qr({ mediaData: s, transform: s.transformation, outline: s.outline })), transformation: t });
      this.root.push(l);
    } else {
      this.root.push(new rr({ uri: "http://schemas.openxmlformats.org/drawingml/2006/picture" }));
      const l = new qr({ mediaData: e, transform: t, outline: r });
      this.root.push(l);
    }
  }
}, so = class extends we {
  constructor(...e) {
    super(...e), Q(this, "xmlKeys", { a: "xmlns:a" });
  }
}, Zn = class extends te {
  constructor({ mediaData: e, transform: t, outline: r, solidFill: o }) {
    super("a:graphic"), Q(this, "data", void 0), this.root.push(new so({ a: "http://schemas.openxmlformats.org/drawingml/2006/main" })), this.data = new ao({ mediaData: e, transform: t, outline: r, solidFill: o }), this.root.push(this.data);
  }
}, Lt = { NONE: 0, SQUARE: 1, TIGHT: 2, TOP_AND_BOTTOM: 3 }, oo = { BOTH_SIDES: "bothSides" }, Vr = () => new he({ name: "wp:wrapNone" }), uo = (e, t = { top: 0, bottom: 0, left: 0, right: 0 }) => new he({ name: "wp:wrapSquare", attributes: { wrapText: { key: "wrapText", value: e.side || oo.BOTH_SIDES }, distT: { key: "distT", value: t.top }, distB: { key: "distB", value: t.bottom }, distL: { key: "distL", value: t.left }, distR: { key: "distR", value: t.right } } }), lo = (e = { top: 0, bottom: 0 }) => new he({ name: "wp:wrapTight", attributes: { distT: { key: "distT", value: e.top }, distB: { key: "distB", value: e.bottom } } }), co = (e = { top: 0, bottom: 0 }) => new he({ name: "wp:wrapTopAndBottom", attributes: { distT: { key: "distT", value: e.top }, distB: { key: "distB", value: e.bottom } } }), Yn = class extends te {
  constructor({ name: e, description: t, title: r, id: o } = { name: "", description: "", title: "" }) {
    super("wp:docPr"), Q(this, "docPropertiesUniqueNumericId", vs());
    const l = { id: { key: "id", value: o ?? this.docPropertiesUniqueNumericId() }, name: { key: "name", value: e } };
    t != null && (l.description = { key: "descr", value: t }), r != null && (l.title = { key: "title", value: r }), this.root.push(new hn(l));
  }
  prepForXml(e) {
    for (let t = e.stack.length - 1; t >= 0; t--) {
      const r = e.stack[t];
      if (r instanceof Vt) {
        this.root.push(Xn(r.linkId, true));
        break;
      }
    }
    return super.prepForXml(e);
  }
}, Jn = ({ top: e, right: t, bottom: r, left: o }) => new he({ name: "wp:effectExtent", attributes: { top: { key: "t", value: e }, right: { key: "r", value: t }, bottom: { key: "b", value: r }, left: { key: "l", value: o } } }), Qn = ({ x: e, y: t }) => new he({ name: "wp:extent", attributes: { x: { key: "cx", value: e }, y: { key: "cy", value: t } } }), ho = class extends we {
  constructor(...e) {
    super(...e), Q(this, "xmlKeys", { xmlns: "xmlns:a", noChangeAspect: "noChangeAspect" });
  }
}, fo = class extends te {
  constructor() {
    super("a:graphicFrameLocks"), this.root.push(new ho({ xmlns: "http://schemas.openxmlformats.org/drawingml/2006/main", noChangeAspect: 1 }));
  }
}, ei = () => new he({ name: "wp:cNvGraphicFramePr", children: [new fo()] }), po = class extends we {
  constructor(...e) {
    super(...e), Q(this, "xmlKeys", { distT: "distT", distB: "distB", distL: "distL", distR: "distR", allowOverlap: "allowOverlap", behindDoc: "behindDoc", layoutInCell: "layoutInCell", locked: "locked", relativeHeight: "relativeHeight", simplePos: "simplePos" });
  }
}, mo = class extends te {
  constructor({ mediaData: e, transform: t, drawingOptions: r }) {
    super("wp:anchor");
    const o = pe({ allowOverlap: true, behindDocument: false, lockAnchor: false, layoutInCell: true, verticalPosition: {}, horizontalPosition: {} }, r.floating);
    if (this.root.push(new po({ distT: o.margins && o.margins.top || 0, distB: o.margins && o.margins.bottom || 0, distL: o.margins && o.margins.left || 0, distR: o.margins && o.margins.right || 0, simplePos: "0", allowOverlap: o.allowOverlap === true ? "1" : "0", behindDoc: o.behindDocument === true ? "1" : "0", locked: o.lockAnchor === true ? "1" : "0", layoutInCell: o.layoutInCell === true ? "1" : "0", relativeHeight: o.zIndex ? o.zIndex : t.emus.y })), this.root.push(xs()), this.root.push(Es(o.horizontalPosition)), this.root.push(Ss(o.verticalPosition)), this.root.push(Qn({ x: t.emus.x, y: t.emus.y })), this.root.push(Jn({ top: 0, right: 0, bottom: 0, left: 0 })), r.floating !== void 0 && r.floating.wrap !== void 0) switch (r.floating.wrap.type) {
      case Lt.SQUARE:
        this.root.push(uo(r.floating.wrap, r.floating.margins));
        break;
      case Lt.TIGHT:
        this.root.push(lo(r.floating.margins));
        break;
      case Lt.TOP_AND_BOTTOM:
        this.root.push(co(r.floating.margins));
        break;
      case Lt.NONE:
      default:
        this.root.push(Vr());
    }
    else this.root.push(Vr());
    this.root.push(new Yn(r.docProperties)), this.root.push(ei()), this.root.push(new Zn({ mediaData: e, transform: t, outline: r.outline, solidFill: r.solidFill }));
  }
}, wo = ({ mediaData: e, transform: t, docProperties: r, outline: o, solidFill: l }) => {
  var s, u, a, d;
  return new he({ name: "wp:inline", attributes: { distanceTop: { key: "distT", value: 0 }, distanceBottom: { key: "distB", value: 0 }, distanceLeft: { key: "distL", value: 0 }, distanceRight: { key: "distR", value: 0 } }, children: [Qn({ x: t.emus.x, y: t.emus.y }), Jn(o ? { top: ((s = o.width) !== null && s !== void 0 ? s : 9525) * 2, right: ((u = o.width) !== null && u !== void 0 ? u : 9525) * 2, bottom: ((a = o.width) !== null && a !== void 0 ? a : 9525) * 2, left: ((d = o.width) !== null && d !== void 0 ? d : 9525) * 2 } : { top: 0, right: 0, bottom: 0, left: 0 }), new Yn(r), ei(), new Zn({ mediaData: e, transform: t, outline: o, solidFill: l })] });
}, vo = class extends te {
  constructor(e, t = {}) {
    super("w:drawing"), t.floating ? this.root.push(new mo({ mediaData: e, transform: e.transformation, drawingOptions: t })) : this.root.push(wo({ mediaData: e, transform: e.transformation, docProperties: t.docProperties, outline: t.outline, solidFill: t.solidFill }));
  }
}, go = (e) => {
  const t = e.indexOf(";base64,"), r = t === -1 ? 0 : t + 8;
  return new Uint8Array(atob(e.substring(r)).split("").map((o) => o.charCodeAt(0)));
}, yo = (e) => typeof e == "string" ? go(e) : e, nr = (e, t) => ({ data: yo(e.data), fileName: t, transformation: { pixels: { x: Math.round(e.transformation.width), y: Math.round(e.transformation.height) }, emus: { x: Math.round(e.transformation.width * 9525), y: Math.round(e.transformation.height * 9525) }, flip: e.transformation.flip, rotation: e.transformation.rotation ? e.transformation.rotation * 6e4 : void 0 } }), Wc = class extends te {
  constructor(e) {
    var t = (...u) => (super(...u), Q(this, "imageData", void 0), this);
    const r = `${Kr(e.data)}.${e.type}`, o = e.type === "svg" ? pe(pe({ type: e.type }, nr(e, r)), {}, { fallback: pe({ type: e.fallback.type }, nr(pe(pe({}, e.fallback), {}, { transformation: e.transformation }), `${Kr(e.fallback.data)}.${e.fallback.type}`)) }) : pe({ type: e.type }, nr(e, r)), l = new vo(o, { floating: e.floating, docProperties: e.altText, outline: e.outline }), s = new $e({ children: [l] });
    e.insertion ? (t("w:ins"), this.root.push(new Ce({ id: e.insertion.id, author: e.insertion.author, date: e.insertion.date })), this.addChildElement(s)) : e.deletion ? (t("w:del"), this.root.push(new Ce({ id: e.deletion.id, author: e.deletion.author, date: e.deletion.date })), this.addChildElement(s)) : (t("w:r"), this.root.push(new Ve({})), this.root.push(l)), this.imageData = o;
  }
  prepForXml(e) {
    return e.file.Media.addImage(this.imageData.fileName, this.imageData), this.imageData.type === "svg" && e.file.Media.addImage(this.imageData.fallback.fileName, this.imageData.fallback), super.prepForXml(e);
  }
}, bo = class extends we {
  constructor(...e) {
    super(...e), Q(this, "xmlKeys", { xmlns: "xmlns" });
  }
}, _o = { EXTERNAL: "External" }, xo = (e, t, r, o) => new he({ name: "Relationship", attributes: { id: { key: "Id", value: e }, type: { key: "Type", value: t }, target: { key: "Target", value: r }, targetMode: { key: "TargetMode", value: o } } }), Xe = class extends te {
  constructor() {
    super("Relationships"), this.root.push(new bo({ xmlns: "http://schemas.openxmlformats.org/package/2006/relationships" }));
  }
  addRelationship(e, t, r, o) {
    this.root.push(xo(`rId${e}`, t, r, o));
  }
  get RelationshipCount() {
    return this.root.length - 1;
  }
}, Eo = class extends we {
  constructor(...e) {
    super(...e), Q(this, "xmlKeys", { id: "w:id", initials: "w:initials", author: "w:author", date: "w:date" });
  }
}, So = class extends we {
  constructor(...e) {
    super(...e), Q(this, "xmlKeys", { "xmlns:cx": "xmlns:cx", "xmlns:cx1": "xmlns:cx1", "xmlns:cx2": "xmlns:cx2", "xmlns:cx3": "xmlns:cx3", "xmlns:cx4": "xmlns:cx4", "xmlns:cx5": "xmlns:cx5", "xmlns:cx6": "xmlns:cx6", "xmlns:cx7": "xmlns:cx7", "xmlns:cx8": "xmlns:cx8", "xmlns:mc": "xmlns:mc", "xmlns:aink": "xmlns:aink", "xmlns:am3d": "xmlns:am3d", "xmlns:o": "xmlns:o", "xmlns:r": "xmlns:r", "xmlns:m": "xmlns:m", "xmlns:v": "xmlns:v", "xmlns:wp14": "xmlns:wp14", "xmlns:wp": "xmlns:wp", "xmlns:w10": "xmlns:w10", "xmlns:w": "xmlns:w", "xmlns:w14": "xmlns:w14", "xmlns:w15": "xmlns:w15", "xmlns:w16cex": "xmlns:w16cex", "xmlns:w16cid": "xmlns:w16cid", "xmlns:w16": "xmlns:w16", "xmlns:w16sdtdh": "xmlns:w16sdtdh", "xmlns:w16se": "xmlns:w16se", "xmlns:wpg": "xmlns:wpg", "xmlns:wpi": "xmlns:wpi", "xmlns:wne": "xmlns:wne", "xmlns:wps": "xmlns:wps" });
  }
}, $r = class extends te {
  constructor({ id: e, initials: t, author: r, date: o = /* @__PURE__ */ new Date(), children: l }, s) {
    super("w:comment"), Q(this, "paraId", void 0), this.paraId = s, this.root.push(new Eo({ id: e, initials: t, author: r, date: o.toISOString() }));
    for (const u of l) this.root.push(u);
  }
  prepForXml(e) {
    const t = super.prepForXml(e);
    if (!t || !this.paraId) return t;
    const r = t["w:comment"];
    if (!Array.isArray(r)) return t;
    for (let o = r.length - 1; o >= 0; o--) {
      const l = r[o];
      if (l && typeof l == "object" && "w:p" in l) {
        const s = l["w:p"];
        Array.isArray(s) && s.unshift({ _attr: { "w14:paraId": this.paraId, "w14:textId": this.paraId } });
        break;
      }
    }
    return t;
  }
}, To = (e) => (e + 1).toString(16).toUpperCase().padStart(8, "0"), Ao = class extends te {
  constructor({ children: e }) {
    if (super("w:comments"), Q(this, "relationships", void 0), Q(this, "threadData", void 0), this.root.push(new So({ "xmlns:cx": "http://schemas.microsoft.com/office/drawing/2014/chartex", "xmlns:cx1": "http://schemas.microsoft.com/office/drawing/2015/9/8/chartex", "xmlns:cx2": "http://schemas.microsoft.com/office/drawing/2015/10/21/chartex", "xmlns:cx3": "http://schemas.microsoft.com/office/drawing/2016/5/9/chartex", "xmlns:cx4": "http://schemas.microsoft.com/office/drawing/2016/5/10/chartex", "xmlns:cx5": "http://schemas.microsoft.com/office/drawing/2016/5/11/chartex", "xmlns:cx6": "http://schemas.microsoft.com/office/drawing/2016/5/12/chartex", "xmlns:cx7": "http://schemas.microsoft.com/office/drawing/2016/5/13/chartex", "xmlns:cx8": "http://schemas.microsoft.com/office/drawing/2016/5/14/chartex", "xmlns:mc": "http://schemas.openxmlformats.org/markup-compatibility/2006", "xmlns:aink": "http://schemas.microsoft.com/office/drawing/2016/ink", "xmlns:am3d": "http://schemas.microsoft.com/office/drawing/2017/model3d", "xmlns:o": "urn:schemas-microsoft-com:office:office", "xmlns:r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships", "xmlns:m": "http://schemas.openxmlformats.org/officeDocument/2006/math", "xmlns:v": "urn:schemas-microsoft-com:vml", "xmlns:wp14": "http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing", "xmlns:wp": "http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing", "xmlns:w10": "urn:schemas-microsoft-com:office:word", "xmlns:w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main", "xmlns:w14": "http://schemas.microsoft.com/office/word/2010/wordml", "xmlns:w15": "http://schemas.microsoft.com/office/word/2012/wordml", "xmlns:w16cex": "http://schemas.microsoft.com/office/word/2018/wordml/cex", "xmlns:w16cid": "http://schemas.microsoft.com/office/word/2016/wordml/cid", "xmlns:w16": "http://schemas.microsoft.com/office/word/2018/wordml", "xmlns:w16sdtdh": "http://schemas.microsoft.com/office/word/2020/wordml/sdtdatahash", "xmlns:w16se": "http://schemas.microsoft.com/office/word/2015/wordml/symex", "xmlns:wpg": "http://schemas.microsoft.com/office/word/2010/wordprocessingGroup", "xmlns:wpi": "http://schemas.microsoft.com/office/word/2010/wordprocessingInk", "xmlns:wne": "http://schemas.microsoft.com/office/word/2006/wordml", "xmlns:wps": "http://schemas.microsoft.com/office/word/2010/wordprocessingShape" })), e.some((t) => t.parentId !== void 0)) {
      const t = new Map(e.map((r) => [r.id, To(r.id)]));
      for (const r of e) this.root.push(new $r(r, t.get(r.id)));
      this.threadData = e.map((r) => ({ paraId: t.get(r.id), parentParaId: r.parentId !== void 0 ? t.get(r.parentId) : void 0, done: r.resolved }));
    } else for (const t of e) this.root.push(new $r(t));
    this.relationships = new Xe();
  }
  get Relationships() {
    return this.relationships;
  }
  get ThreadData() {
    return this.threadData;
  }
}, ko = class extends we {
  constructor(...e) {
    super(...e), Q(this, "xmlKeys", { "xmlns:wpc": "xmlns:wpc", "xmlns:mc": "xmlns:mc", "xmlns:w15": "xmlns:w15", "mc:Ignorable": "mc:Ignorable" });
  }
}, Ro = class extends we {
  constructor(...e) {
    super(...e), Q(this, "xmlKeys", { paraId: "w15:paraId", paraIdParent: "w15:paraIdParent", done: "w15:done" });
  }
}, Co = class extends te {
  constructor(e) {
    super("w15:commentEx"), this.root.push(new Ro({ paraId: e.paraId, paraIdParent: e.parentParaId, done: e.done !== void 0 ? e.done ? "1" : "0" : void 0 }));
  }
}, Io = class extends te {
  constructor(e) {
    super("w15:commentsEx"), this.root.push(new ko({ "xmlns:wpc": "http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas", "xmlns:mc": "http://schemas.openxmlformats.org/markup-compatibility/2006", "xmlns:w15": "http://schemas.microsoft.com/office/word/2012/wordml", "mc:Ignorable": "w15" }));
    for (const t of e) this.root.push(new Co(t));
  }
}, No = class extends Fa {
  constructor() {
    super("w:endnoteRef");
  }
}, Oo = class extends te {
  constructor() {
    super("w:pageBreakBefore");
  }
}, ht = { AUTO: "auto" }, Po = ({ after: e, before: t, line: r, lineRule: o, beforeAutoSpacing: l, afterAutoSpacing: s }) => new he({ name: "w:spacing", attributes: { after: { key: "w:after", value: e }, before: { key: "w:before", value: t }, line: { key: "w:line", value: r }, lineRule: { key: "w:lineRule", value: o }, beforeAutoSpacing: { key: "w:beforeAutospacing", value: l }, afterAutoSpacing: { key: "w:afterAutospacing", value: s } } }), Hc = { HEADING_1: "Heading1", HEADING_2: "Heading2", HEADING_3: "Heading3", HEADING_4: "Heading4", HEADING_5: "Heading5", HEADING_6: "Heading6", TITLE: "Title" }, _t = (e) => new he({ name: "w:pStyle", attributes: { val: { key: "w:val", value: e } } }), Xr = { LEFT: "left", RIGHT: "right" }, Fo = ({ type: e, position: t, leader: r }) => new he({ name: "w:tab", attributes: { val: { key: "w:val", value: e }, pos: { key: "w:pos", value: t }, leader: { key: "w:leader", value: r } } }), Do = (e) => new he({ name: "w:tabs", children: e.map((t) => Fo(t)) }), ir = class extends te {
  constructor(e, t) {
    super("w:numPr"), this.root.push(new Bo(t)), this.root.push(new Lo(e));
  }
}, Bo = class extends te {
  constructor(e) {
    if (super("w:ilvl"), e > 9) throw new Error("Level cannot be greater than 9. Read more here: https://answers.microsoft.com/en-us/msoffice/forum/all/does-word-support-more-than-9-list-levels/d130fdcd-1781-446d-8c84-c6c79124e4d7");
    this.root.push(new Ae({ val: e }));
  }
}, Lo = class extends te {
  constructor(e) {
    super("w:numId"), this.root.push(new Ae({ val: typeof e == "string" ? `{${e}}` : e }));
  }
}, ti = class extends te {
  constructor(...e) {
    super(...e), Q(this, "fileChild", Symbol());
  }
}, Mo = class extends we {
  constructor(...e) {
    super(...e), Q(this, "xmlKeys", { id: "r:id", history: "w:history", anchor: "w:anchor" });
  }
}, Vt = class extends te {
  constructor(e, t, r) {
    super("w:hyperlink"), Q(this, "linkId", void 0), this.linkId = t;
    const o = new Mo({ history: 1, anchor: r || void 0, id: r ? void 0 : `rId${this.linkId}` });
    this.root.push(o), e.forEach((l) => {
      this.root.push(l);
    });
  }
}, Kc = class extends Vt {
  constructor(e) {
    super(e.children, Hn(), e.anchor);
  }
}, Uo = class extends te {
  constructor(e) {
    super("w:externalHyperlink"), Q(this, "options", void 0), this.options = e;
  }
}, jo = class extends we {
  constructor(...e) {
    super(...e), Q(this, "xmlKeys", { id: "w:id", name: "w:name" });
  }
}, zo = class extends we {
  constructor(...e) {
    super(...e), Q(this, "xmlKeys", { id: "w:id" });
  }
}, Wo = class {
  constructor(e) {
    Q(this, "bookmarkUniqueNumericId", gs()), Q(this, "start", void 0), Q(this, "children", void 0), Q(this, "end", void 0);
    const t = this.bookmarkUniqueNumericId();
    this.start = new Ho(e.id, t), this.children = e.children, this.end = new Ko(t);
  }
}, Ho = class extends te {
  constructor(e, t) {
    super("w:bookmarkStart");
    const r = new jo({ name: e, id: t });
    this.root.push(r);
  }
}, Ko = class extends te {
  constructor(e) {
    super("w:bookmarkEnd");
    const t = new zo({ id: e });
    this.root.push(t);
  }
}, Go = (e) => new he({ name: "w:outlineLvl", attributes: { val: { key: "w:val", value: e } } }), Mt = ({ id: e, fontKey: t, subsetted: r }, o) => new he({ name: o, attributes: pe({ id: { key: "r:id", value: e } }, t ? { fontKey: { key: "w:fontKey", value: `{${t}}` } } : {}), children: [...r ? [new le("w:subsetted", r)] : []] }), qo = ({ name: e, altName: t, panose1: r, charset: o, family: l, notTrueType: s, pitch: u, sig: a, embedRegular: d, embedBold: T, embedItalic: E, embedBoldItalic: g }) => new he({ name: "w:font", attributes: { name: { key: "w:name", value: e } }, children: [...t ? [gt("w:altName", t)] : [], ...r ? [gt("w:panose1", r)] : [], ...o ? [gt("w:charset", o)] : [], gt("w:family", l), ...s ? [new le("w:notTrueType", s)] : [], gt("w:pitch", u), ...a ? [new he({ name: "w:sig", attributes: { usb0: { key: "w:usb0", value: a.usb0 }, usb1: { key: "w:usb1", value: a.usb1 }, usb2: { key: "w:usb2", value: a.usb2 }, usb3: { key: "w:usb3", value: a.usb3 }, csb0: { key: "w:csb0", value: a.csb0 }, csb1: { key: "w:csb1", value: a.csb1 } } })] : [], ...d ? [Mt(d, "w:embedRegular")] : [], ...T ? [Mt(T, "w:embedBold")] : [], ...E ? [Mt(E, "w:embedItalic")] : [], ...g ? [Mt(g, "w:embedBoldItalic")] : []] }), Vo = ({ name: e, index: t, fontKey: r, characterSet: o }) => qo({ name: e, sig: { usb0: "E0002AFF", usb1: "C000247B", usb2: "00000009", usb3: "00000000", csb0: "000001FF", csb1: "00000000" }, charset: o, family: "auto", pitch: "variable", embedRegular: { fontKey: r, id: `rId${t}` } }), $o = (e) => new he({ name: "w:fonts", attributes: { mc: { key: "xmlns:mc", value: "http://schemas.openxmlformats.org/markup-compatibility/2006" }, r: { key: "xmlns:r", value: "http://schemas.openxmlformats.org/officeDocument/2006/relationships" }, w: { key: "xmlns:w", value: "http://schemas.openxmlformats.org/wordprocessingml/2006/main" }, w14: { key: "xmlns:w14", value: "http://schemas.microsoft.com/office/word/2010/wordml" }, w15: { key: "xmlns:w15", value: "http://schemas.microsoft.com/office/word/2012/wordml" }, w16cex: { key: "xmlns:w16cex", value: "http://schemas.microsoft.com/office/word/2018/wordml/cex" }, w16cid: { key: "xmlns:w16cid", value: "http://schemas.microsoft.com/office/word/2016/wordml/cid" }, w16: { key: "xmlns:w16", value: "http://schemas.microsoft.com/office/word/2018/wordml" }, w16sdtdh: { key: "xmlns:w16sdtdh", value: "http://schemas.microsoft.com/office/word/2020/wordml/sdtdatahash" }, w16se: { key: "xmlns:w16se", value: "http://schemas.microsoft.com/office/word/2015/wordml/symex" }, Ignorable: { key: "mc:Ignorable", value: "w14 w15 w16se w16cid w16 w16cex w16sdtdh" } }, children: e.map((t, r) => Vo({ name: t.name, index: r + 1, fontKey: t.fontKey, characterSet: t.characterSet })) }), ri = class {
  constructor(e) {
    Q(this, "options", void 0), Q(this, "fontTable", void 0), Q(this, "relationships", void 0), Q(this, "fontOptionsWithKey", []), this.options = e, this.fontOptionsWithKey = e.map((t) => pe(pe({}, t), {}, { fontKey: ys() })), this.fontTable = $o(this.fontOptionsWithKey), this.relationships = new Xe();
    for (let t = 0; t < e.length; t++) this.relationships.addRelationship(t + 1, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/font", `fonts/font${t + 1}.odttf`);
  }
  get View() {
    return this.fontTable;
  }
  get Relationships() {
    return this.relationships;
  }
}, Xo = () => new he({ name: "w:wordWrap", attributes: { val: { key: "w:val", value: 0 } } }), Zo = (e) => {
  var t, r;
  return new he({ name: "w:framePr", attributes: { anchorLock: { key: "w:anchorLock", value: e.anchorLock }, dropCap: { key: "w:dropCap", value: e.dropCap }, width: { key: "w:w", value: e.width }, height: { key: "w:h", value: e.height }, x: { key: "w:x", value: e.position ? e.position.x : void 0 }, y: { key: "w:y", value: e.position ? e.position.y : void 0 }, anchorHorizontal: { key: "w:hAnchor", value: e.anchor.horizontal }, anchorVertical: { key: "w:vAnchor", value: e.anchor.vertical }, spaceHorizontal: { key: "w:hSpace", value: (t = e.space) === null || t === void 0 ? void 0 : t.horizontal }, spaceVertical: { key: "w:vSpace", value: (r = e.space) === null || r === void 0 ? void 0 : r.vertical }, rule: { key: "w:hRule", value: e.rule }, alignmentX: { key: "w:xAlign", value: e.alignment ? e.alignment.x : void 0 }, alignmentY: { key: "w:yAlign", value: e.alignment ? e.alignment.y : void 0 }, lines: { key: "w:lines", value: e.lines }, wrap: { key: "w:wrap", value: e.wrap } } });
}, tt = class extends Ke {
  constructor(e) {
    if (super("w:pPr", e == null ? void 0 : e.includeIfEmpty), Q(this, "numberingReferences", []), !e) return this;
    if (e.heading && this.push(_t(e.heading)), e.bullet && this.push(_t("ListParagraph")), e.numbering && !e.style && !e.heading && (e.numbering.custom || this.push(_t("ListParagraph"))), e.style && this.push(_t(e.style)), e.keepNext !== void 0 && this.push(new le("w:keepNext", e.keepNext)), e.keepLines !== void 0 && this.push(new le("w:keepLines", e.keepLines)), e.pageBreakBefore && this.push(new Oo()), e.frame && this.push(Zo(e.frame)), e.widowControl !== void 0 && this.push(new le("w:widowControl", e.widowControl)), e.bullet && this.push(new ir(1, e.bullet.level)), e.numbering) {
      var t, r;
      this.numberingReferences.push({ reference: e.numbering.reference, instance: (t = e.numbering.instance) !== null && t !== void 0 ? t : 0 }), this.push(new ir(`${e.numbering.reference}-${(r = e.numbering.instance) !== null && r !== void 0 ? r : 0}`, e.numbering.level));
    } else e.numbering === false && this.push(new ir(0, 0));
    e.border && this.push(new Da(e.border)), e.thematicBreak && this.push(new Ba()), e.shading && this.push(Gt(e.shading)), e.wordWrap && this.push(Xo()), e.overflowPunctuation && this.push(new le("w:overflowPunct", e.overflowPunctuation));
    const o = [...e.rightTabStop !== void 0 ? [{ type: Xr.RIGHT, position: e.rightTabStop }] : [], ...e.tabStops ? e.tabStops : [], ...e.leftTabStop !== void 0 ? [{ type: Xr.LEFT, position: e.leftTabStop }] : []];
    o.length > 0 && this.push(Do(o)), e.bidirectional !== void 0 && this.push(new le("w:bidi", e.bidirectional)), e.spacing && this.push(Po(e.spacing)), e.indent && this.push(La(e.indent)), e.contextualSpacing !== void 0 && this.push(new le("w:contextualSpacing", e.contextualSpacing)), e.alignment && this.push(Ln(e.alignment)), e.outlineLevel !== void 0 && this.push(Go(e.outlineLevel)), e.suppressLineNumbers !== void 0 && this.push(new le("w:suppressLineNumbers", e.suppressLineNumbers)), e.autoSpaceEastAsianText !== void 0 && this.push(new le("w:autoSpaceDN", e.autoSpaceEastAsianText)), e.run && this.push(new ts(e.run)), e.revision && this.push(new Yo(e.revision));
  }
  push(e) {
    this.root.push(e);
  }
  prepForXml(e) {
    if (!(e.viewWrapper instanceof ri)) for (const t of this.numberingReferences) e.file.Numbering.createConcreteNumberingInstance(t.reference, t.instance);
    return super.prepForXml(e);
  }
}, Yo = class extends te {
  constructor(e) {
    super("w:pPrChange"), this.root.push(new Ce({ id: e.id, author: e.author, date: e.date })), this.root.push(new tt(pe(pe({}, e), {}, { includeIfEmpty: true })));
  }
}, rt = class extends ti {
  constructor(e) {
    if (super("w:p"), Q(this, "properties", void 0), typeof e == "string") return this.properties = new tt({}), this.root.push(this.properties), this.root.push(new Wr(e)), this;
    if (this.properties = new tt(e), this.root.push(this.properties), e.text && this.root.push(new Wr(e.text)), e.children) for (const t of e.children) {
      if (t instanceof Wo) {
        this.root.push(t.start);
        for (const r of t.children) this.root.push(r);
        this.root.push(t.end);
        continue;
      }
      this.root.push(t);
    }
  }
  prepForXml(e) {
    for (const t of this.root) if (t instanceof Uo) {
      const r = this.root.indexOf(t), o = new Vt(t.options.children, Hn());
      e.viewWrapper.Relationships.addRelationship(o.linkId, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink", t.options.link, _o.EXTERNAL), this.root[r] = o;
    }
    return super.prepForXml(e);
  }
  addRunToFront(e) {
    return this.root.splice(1, 0, e), this;
  }
}, Gc = class extends te {
  constructor(e) {
    super("m:oMath");
    for (const t of e.children) this.root.push(t);
  }
}, Jo = class extends te {
  constructor(e) {
    super("m:t"), this.root.push(e);
  }
}, qc = class extends te {
  constructor(e) {
    super("m:r"), this.root.push(new Jo(e));
  }
}, Qo = class extends te {
  constructor(e) {
    super("m:den");
    for (const t of e) this.root.push(t);
  }
}, eu = class extends te {
  constructor(e) {
    super("m:num");
    for (const t of e) this.root.push(t);
  }
}, Vc = class extends te {
  constructor(e) {
    super("m:f"), this.root.push(new eu(e.numerator)), this.root.push(new Qo(e.denominator));
  }
}, tu = ({ accent: e }) => new he({ name: "m:chr", attributes: { accent: { key: "m:val", value: e } } }), pt = ({ children: e }) => new he({ name: "m:e", children: e }), ru = ({ value: e }) => new he({ name: "m:limLoc", attributes: { value: { key: "m:val", value: e || "undOvr" } } }), nu = () => new he({ name: "m:subHide", attributes: { hide: { key: "m:val", value: 1 } } }), iu = () => new he({ name: "m:supHide", attributes: { hide: { key: "m:val", value: 1 } } }), ni = ({ accent: e, hasSuperScript: t, hasSubScript: r, limitLocationVal: o }) => new he({ name: "m:naryPr", children: [...e ? [tu({ accent: e })] : [], ru({ value: o }), ...t ? [] : [iu()], ...r ? [] : [nu()]] }), $t = ({ children: e }) => new he({ name: "m:sub", children: e }), Xt = ({ children: e }) => new he({ name: "m:sup", children: e }), $c = class extends te {
  constructor(e) {
    super("m:nary"), this.root.push(ni({ accent: "\u2211", hasSuperScript: !!e.superScript, hasSubScript: !!e.subScript })), e.subScript && this.root.push($t({ children: e.subScript })), e.superScript && this.root.push(Xt({ children: e.superScript })), this.root.push(pt({ children: e.children }));
  }
}, Xc = class extends te {
  constructor(e) {
    super("m:nary"), this.root.push(ni({ accent: "", hasSuperScript: !!e.superScript, hasSubScript: !!e.subScript, limitLocationVal: "subSup" })), e.subScript && this.root.push($t({ children: e.subScript })), e.superScript && this.root.push(Xt({ children: e.superScript })), this.root.push(pt({ children: e.children }));
  }
}, au = () => new he({ name: "m:sSupPr" }), Zc = class extends te {
  constructor(e) {
    super("m:sSup"), this.root.push(au()), this.root.push(pt({ children: e.children })), this.root.push(Xt({ children: e.superScript }));
  }
}, su = () => new he({ name: "m:sSubPr" }), Yc = class extends te {
  constructor(e) {
    super("m:sSub"), this.root.push(su()), this.root.push(pt({ children: e.children })), this.root.push($t({ children: e.subScript }));
  }
}, ou = () => new he({ name: "m:sSubSupPr" }), Jc = class extends te {
  constructor(e) {
    super("m:sSubSup"), this.root.push(ou()), this.root.push(pt({ children: e.children })), this.root.push($t({ children: e.subScript })), this.root.push(Xt({ children: e.superScript }));
  }
}, uu = class extends te {
  constructor(e) {
    if (super("m:deg"), e) for (const t of e) this.root.push(t);
  }
}, lu = class extends we {
  constructor(...e) {
    super(...e), Q(this, "xmlKeys", { hide: "m:val" });
  }
}, cu = class extends te {
  constructor() {
    super("m:degHide"), this.root.push(new lu({ hide: 1 }));
  }
}, hu = class extends te {
  constructor(e) {
    super("m:radPr"), e || this.root.push(new cu());
  }
}, Qc = class extends te {
  constructor(e) {
    super("m:rad"), this.root.push(new hu(!!e.degree)), this.root.push(new uu(e.degree)), this.root.push(pt({ children: e.children }));
  }
}, fu = (e) => new he({ name: "w:gridCol", attributes: e !== void 0 ? { width: { key: "w:w", value: Se(e) } } : void 0 }), ii = class extends te {
  constructor(e, t) {
    super("w:tblGrid");
    for (const r of e) this.root.push(fu(r));
    t && this.root.push(new pu(t));
  }
}, du = class extends we {
  constructor(...e) {
    super(...e), Q(this, "xmlKeys", { id: "w:id" });
  }
}, pu = class extends te {
  constructor(e) {
    super("w:tblGridChange"), this.root.push(new du({ id: e.id })), this.root.push(new ii(e.columnWidths));
  }
}, mu = class extends te {
  constructor(e) {
    super("w:ins"), this.root.push(new Ce({ id: e.id, author: e.author, date: e.date }));
  }
}, wu = class extends te {
  constructor(e) {
    super("w:del"), this.root.push(new Ce({ id: e.id, author: e.author, date: e.date }));
  }
}, vu = class extends te {
  constructor(e) {
    super("w:cellIns"), this.root.push(new Ce({ id: e.id, author: e.author, date: e.date }));
  }
}, gu = class extends te {
  constructor(e) {
    super("w:cellDel"), this.root.push(new Ce({ id: e.id, author: e.author, date: e.date }));
  }
}, yu = class extends we {
  constructor(...e) {
    super(...e), Q(this, "xmlKeys", { id: "w:id", author: "w:author", date: "w:date", verticalMerge: "w:vMerge", verticalMergeOriginal: "w:vMergeOrig" });
  }
}, bu = class extends te {
  constructor(e) {
    super("w:cellMerge"), this.root.push(new yu(e));
  }
}, _u = { TOP: "top", CENTER: "center", BOTTOM: "bottom" }, xu = pe(pe({}, _u), {}, { BOTH: "both" }), eh = xu, ai = (e) => new he({ name: "w:vAlign", attributes: { verticalAlign: { key: "w:val", value: e } } }), si = ({ marginUnitType: e = vr.DXA, top: t, left: r, bottom: o, right: l }) => [{ name: "w:top", size: t }, { name: "w:left", size: r }, { name: "w:bottom", size: o }, { name: "w:right", size: l }].filter((s) => s.size !== void 0).map(({ name: s, size: u }) => jt(s, { type: e, size: u })), Eu = (e) => {
  const t = si(e);
  if (t.length !== 0) return new he({ name: "w:tblCellMar", children: t });
}, Su = (e) => {
  const t = si(e);
  if (t.length !== 0) return new he({ name: "w:tcMar", children: t });
}, vr = { AUTO: "auto", DXA: "dxa", PERCENTAGE: "pct" }, jt = (e, { type: t = vr.AUTO, size: r }) => {
  let o = r;
  return t === vr.PERCENTAGE && typeof r == "number" && (o = `${r}%`), new he({ name: e, attributes: { type: { key: "w:type", value: t }, size: { key: "w:w", value: Bn(o) } } });
}, Tu = class extends Ke {
  constructor(e) {
    super("w:tcBorders"), e.top && this.root.push(be("w:top", e.top)), e.start && this.root.push(be("w:start", e.start)), e.left && this.root.push(be("w:left", e.left)), e.bottom && this.root.push(be("w:bottom", e.bottom)), e.end && this.root.push(be("w:end", e.end)), e.right && this.root.push(be("w:right", e.right));
  }
}, Au = class extends we {
  constructor(...e) {
    super(...e), Q(this, "xmlKeys", { val: "w:val" });
  }
}, ku = class extends te {
  constructor(e) {
    super("w:gridSpan"), this.root.push(new Au({ val: Te(e) }));
  }
}, oi = { CONTINUE: "continue", RESTART: "restart" }, Ru = class extends we {
  constructor(...e) {
    super(...e), Q(this, "xmlKeys", { val: "w:val" });
  }
}, Zr = class extends te {
  constructor(e) {
    super("w:vMerge"), this.root.push(new Ru({ val: e }));
  }
}, Cu = class extends we {
  constructor(...e) {
    super(...e), Q(this, "xmlKeys", { val: "w:val" });
  }
}, Iu = class extends te {
  constructor(e) {
    super("w:textDirection"), this.root.push(new Cu({ val: e }));
  }
}, ui = class extends Ke {
  constructor(e) {
    if (super("w:tcPr", e.includeIfEmpty), e.width && this.root.push(jt("w:tcW", e.width)), e.columnSpan && this.root.push(new ku(e.columnSpan)), e.verticalMerge ? this.root.push(new Zr(e.verticalMerge)) : e.rowSpan && e.rowSpan > 1 && this.root.push(new Zr(oi.RESTART)), e.borders && this.root.push(new Tu(e.borders)), e.shading && this.root.push(Gt(e.shading)), e.margins) {
      const t = Su(e.margins);
      t && this.root.push(t);
    }
    e.textDirection && this.root.push(new Iu(e.textDirection)), e.verticalAlign && this.root.push(ai(e.verticalAlign)), e.insertion && this.root.push(new vu(e.insertion)), e.deletion && this.root.push(new gu(e.deletion)), e.revision && this.root.push(new Nu(e.revision)), e.cellMerge && this.root.push(new bu(e.cellMerge));
  }
}, Nu = class extends te {
  constructor(e) {
    super("w:tcPrChange"), this.root.push(new Ce({ id: e.id, author: e.author, date: e.date })), this.root.push(new ui(pe(pe({}, e), {}, { includeIfEmpty: true })));
  }
}, li = class extends te {
  constructor(e) {
    super("w:tc"), Q(this, "options", void 0), this.options = e, this.root.push(new ui(e));
    for (const t of e.children) this.root.push(t);
  }
  prepForXml(e) {
    return this.root[this.root.length - 1] instanceof rt || this.root.push(new rt({})), super.prepForXml(e);
  }
}, nt = { style: Or.NONE, size: 0, color: "auto" }, it = { style: Or.SINGLE, size: 4, color: "auto" }, ci = class extends te {
  constructor(e) {
    var t, r, o, l, s, u;
    super("w:tblBorders"), this.root.push(be("w:top", (t = e.top) !== null && t !== void 0 ? t : it)), this.root.push(be("w:left", (r = e.left) !== null && r !== void 0 ? r : it)), this.root.push(be("w:bottom", (o = e.bottom) !== null && o !== void 0 ? o : it)), this.root.push(be("w:right", (l = e.right) !== null && l !== void 0 ? l : it)), this.root.push(be("w:insideH", (s = e.insideHorizontal) !== null && s !== void 0 ? s : it)), this.root.push(be("w:insideV", (u = e.insideVertical) !== null && u !== void 0 ? u : it));
  }
};
Q(ci, "NONE", { top: nt, bottom: nt, left: nt, right: nt, insideHorizontal: nt, insideVertical: nt });
var Ou = (e) => new he({ name: "w:tblOverlap", attributes: { val: { key: "w:val", value: e } } }), Pu = ({ horizontalAnchor: e, verticalAnchor: t, absoluteHorizontalPosition: r, relativeHorizontalPosition: o, absoluteVerticalPosition: l, relativeVerticalPosition: s, bottomFromText: u, topFromText: a, leftFromText: d, rightFromText: T, overlap: E }) => new he({ name: "w:tblpPr", attributes: { leftFromText: { key: "w:leftFromText", value: d === void 0 ? void 0 : Se(d) }, rightFromText: { key: "w:rightFromText", value: T === void 0 ? void 0 : Se(T) }, topFromText: { key: "w:topFromText", value: a === void 0 ? void 0 : Se(a) }, bottomFromText: { key: "w:bottomFromText", value: u === void 0 ? void 0 : Se(u) }, absoluteHorizontalPosition: { key: "w:tblpX", value: r === void 0 ? void 0 : ze(r) }, absoluteVerticalPosition: { key: "w:tblpY", value: l === void 0 ? void 0 : ze(l) }, horizontalAnchor: { key: "w:horzAnchor", value: e }, relativeHorizontalPosition: { key: "w:tblpXSpec", value: o }, relativeVerticalPosition: { key: "w:tblpYSpec", value: s }, verticalAnchor: { key: "w:vertAnchor", value: t } }, children: E ? [Ou(E)] : void 0 }), Fu = (e) => new he({ name: "w:tblLayout", attributes: { type: { key: "w:type", value: e } } }), Du = { DXA: "dxa" }, hi = ({ type: e = Du.DXA, value: t }) => new he({ name: "w:tblCellSpacing", attributes: { type: { key: "w:type", value: e }, value: { key: "w:w", value: Bn(t) } } }), Bu = ({ firstRow: e, lastRow: t, firstColumn: r, lastColumn: o, noHBand: l, noVBand: s }) => new he({ name: "w:tblLook", attributes: { firstRow: { key: "w:firstRow", value: e }, lastRow: { key: "w:lastRow", value: t }, firstColumn: { key: "w:firstColumn", value: r }, lastColumn: { key: "w:lastColumn", value: o }, noHBand: { key: "w:noHBand", value: l }, noVBand: { key: "w:noVBand", value: s } } }), fi = class extends Ke {
  constructor(e) {
    if (super("w:tblPr", e.includeIfEmpty), e.style && this.root.push(new He("w:tblStyle", e.style)), e.float && this.root.push(Pu(e.float)), e.visuallyRightToLeft !== void 0 && this.root.push(new le("w:bidiVisual", e.visuallyRightToLeft)), e.width && this.root.push(jt("w:tblW", e.width)), e.alignment && this.root.push(Ln(e.alignment)), e.indent && this.root.push(jt("w:tblInd", e.indent)), e.borders && this.root.push(new ci(e.borders)), e.shading && this.root.push(Gt(e.shading)), e.layout && this.root.push(Fu(e.layout)), e.cellMargin) {
      const t = Eu(e.cellMargin);
      t && this.root.push(t);
    }
    e.tableLook && this.root.push(Bu(e.tableLook)), e.cellSpacing && this.root.push(hi(e.cellSpacing)), e.revision && this.root.push(new Lu(e.revision));
  }
}, Lu = class extends te {
  constructor(e) {
    super("w:tblPrChange"), this.root.push(new Ce({ id: e.id, author: e.author, date: e.date })), this.root.push(new fi(pe(pe({}, e), {}, { includeIfEmpty: true })));
  }
}, th = class extends ti {
  constructor({ rows: e, width: t, columnWidths: r = Array(Math.max(...e.map((v) => v.CellCount))).fill(100), columnWidthsRevision: o, margins: l, indent: s, float: u, layout: a, style: d, borders: T, alignment: E, visuallyRightToLeft: g, tableLook: N, cellSpacing: w, revision: m }) {
    super("w:tbl"), this.root.push(new fi({ borders: T ?? {}, width: t ?? { size: 100 }, indent: s, float: u, layout: a, style: d, alignment: E, cellMargin: l, visuallyRightToLeft: g, tableLook: N, cellSpacing: w, revision: m })), this.root.push(new ii(r, o));
    for (const v of e) this.root.push(v);
    e.forEach((v, k) => {
      if (k === e.length - 1) return;
      let I = 0;
      v.cells.forEach((y) => {
        if (y.options.rowSpan && y.options.rowSpan > 1) {
          const x = new li({ rowSpan: y.options.rowSpan - 1, columnSpan: y.options.columnSpan, borders: y.options.borders, children: [], verticalMerge: oi.CONTINUE });
          e[k + 1].addCellToColumnIndex(x, I);
        }
        I += y.options.columnSpan || 1;
      });
    });
  }
}, Mu = (e, t) => new he({ name: "w:trHeight", attributes: { value: { key: "w:val", value: Se(e) }, rule: { key: "w:hRule", value: t } } }), di = class extends Ke {
  constructor(e) {
    super("w:trPr", e.includeIfEmpty), e.cantSplit !== void 0 && this.root.push(new le("w:cantSplit", e.cantSplit)), e.tableHeader !== void 0 && this.root.push(new le("w:tblHeader", e.tableHeader)), e.height && this.root.push(Mu(e.height.value, e.height.rule)), e.cellSpacing && this.root.push(hi(e.cellSpacing)), e.insertion && this.root.push(new mu(e.insertion)), e.deletion && this.root.push(new wu(e.deletion)), e.revision && this.root.push(new Uu(e.revision));
  }
}, Uu = class extends te {
  constructor(e) {
    super("w:trPrChange"), this.root.push(new Ce({ id: e.id, author: e.author, date: e.date })), this.root.push(new di(pe(pe({}, e), {}, { includeIfEmpty: true })));
  }
}, rh = class extends te {
  constructor(e) {
    super("w:tr"), Q(this, "options", void 0), this.options = e, this.root.push(new di(e));
    for (const t of e.children) this.root.push(t);
  }
  get CellCount() {
    return this.options.children.length;
  }
  get cells() {
    return this.root.filter((e) => e instanceof li);
  }
  addCellToIndex(e, t) {
    this.root.splice(t + 1, 0, e);
  }
  addCellToColumnIndex(e, t) {
    const r = this.columnIndexToRootIndex(t, true);
    this.addCellToIndex(e, r - 1);
  }
  rootIndexToColumnIndex(e) {
    if (e < 1 || e >= this.root.length) throw new Error(`cell 'rootIndex' should between 1 to ${this.root.length - 1}`);
    let t = 0;
    for (let r = 1; r < e; r++) {
      const o = this.root[r];
      t += o.options.columnSpan || 1;
    }
    return t;
  }
  columnIndexToRootIndex(e, t = false) {
    if (e < 0) throw new Error("cell 'columnIndex' should not less than zero");
    let r = 0, o = 1;
    for (; r <= e; ) {
      if (o >= this.root.length) {
        if (t) return this.root.length;
        throw new Error(`cell 'columnIndex' should not great than ${r - 1}`);
      }
      const l = this.root[o];
      o += 1, r += l && l.options.columnSpan || 1;
    }
    return o - 1;
  }
}, ju = class extends we {
  constructor(...e) {
    super(...e), Q(this, "xmlKeys", { xmlns: "xmlns", vt: "xmlns:vt" });
  }
}, zu = class extends te {
  constructor() {
    super("Properties"), this.root.push(new ju({ xmlns: "http://schemas.openxmlformats.org/officeDocument/2006/extended-properties", vt: "http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes" }));
  }
}, Wu = class extends we {
  constructor(...e) {
    super(...e), Q(this, "xmlKeys", { xmlns: "xmlns" });
  }
}, Ue = (e, t) => new he({ name: "Default", attributes: { contentType: { key: "ContentType", value: e }, extension: { key: "Extension", value: t } } }), Re = (e, t) => new he({ name: "Override", attributes: { contentType: { key: "ContentType", value: e }, partName: { key: "PartName", value: t } } }), Hu = class extends te {
  constructor() {
    super("Types"), this.root.push(new Wu({ xmlns: "http://schemas.openxmlformats.org/package/2006/content-types" })), this.root.push(Ue("image/png", "png")), this.root.push(Ue("image/jpeg", "jpeg")), this.root.push(Ue("image/jpeg", "jpg")), this.root.push(Ue("image/bmp", "bmp")), this.root.push(Ue("image/gif", "gif")), this.root.push(Ue("image/svg+xml", "svg")), this.root.push(Ue("application/vnd.openxmlformats-package.relationships+xml", "rels")), this.root.push(Ue("application/xml", "xml")), this.root.push(Ue("application/vnd.openxmlformats-officedocument.obfuscatedFont", "odttf")), this.root.push(Re("application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml", "/word/document.xml")), this.root.push(Re("application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml", "/word/styles.xml")), this.root.push(Re("application/vnd.openxmlformats-package.core-properties+xml", "/docProps/core.xml")), this.root.push(Re("application/vnd.openxmlformats-officedocument.custom-properties+xml", "/docProps/custom.xml")), this.root.push(Re("application/vnd.openxmlformats-officedocument.extended-properties+xml", "/docProps/app.xml")), this.root.push(Re("application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml", "/word/numbering.xml")), this.root.push(Re("application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml", "/word/footnotes.xml")), this.root.push(Re("application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml", "/word/endnotes.xml")), this.root.push(Re("application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml", "/word/settings.xml")), this.root.push(Re("application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml", "/word/comments.xml")), this.root.push(Re("application/vnd.openxmlformats-officedocument.wordprocessingml.fontTable+xml", "/word/fontTable.xml"));
  }
  addCommentsExtended() {
    this.root.push(Re("application/vnd.openxmlformats-officedocument.wordprocessingml.commentsExtended+xml", "/word/commentsExtended.xml"));
  }
  addFooter(e) {
    this.root.push(Re("application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml", `/word/footer${e}.xml`));
  }
  addHeader(e) {
    this.root.push(Re("application/vnd.openxmlformats-officedocument.wordprocessingml.header+xml", `/word/header${e}.xml`));
  }
}, Yr = { wpc: "http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas", mc: "http://schemas.openxmlformats.org/markup-compatibility/2006", o: "urn:schemas-microsoft-com:office:office", r: "http://schemas.openxmlformats.org/officeDocument/2006/relationships", m: "http://schemas.openxmlformats.org/officeDocument/2006/math", v: "urn:schemas-microsoft-com:vml", wp14: "http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing", wp: "http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing", w10: "urn:schemas-microsoft-com:office:word", w: "http://schemas.openxmlformats.org/wordprocessingml/2006/main", w14: "http://schemas.microsoft.com/office/word/2010/wordml", w15: "http://schemas.microsoft.com/office/word/2012/wordml", wpg: "http://schemas.microsoft.com/office/word/2010/wordprocessingGroup", wpi: "http://schemas.microsoft.com/office/word/2010/wordprocessingInk", wne: "http://schemas.microsoft.com/office/word/2006/wordml", wps: "http://schemas.microsoft.com/office/word/2010/wordprocessingShape", cp: "http://schemas.openxmlformats.org/package/2006/metadata/core-properties", dc: "http://purl.org/dc/elements/1.1/", dcterms: "http://purl.org/dc/terms/", dcmitype: "http://purl.org/dc/dcmitype/", xsi: "http://www.w3.org/2001/XMLSchema-instance", cx: "http://schemas.microsoft.com/office/drawing/2014/chartex", cx1: "http://schemas.microsoft.com/office/drawing/2015/9/8/chartex", cx2: "http://schemas.microsoft.com/office/drawing/2015/10/21/chartex", cx3: "http://schemas.microsoft.com/office/drawing/2016/5/9/chartex", cx4: "http://schemas.microsoft.com/office/drawing/2016/5/10/chartex", cx5: "http://schemas.microsoft.com/office/drawing/2016/5/11/chartex", cx6: "http://schemas.microsoft.com/office/drawing/2016/5/12/chartex", cx7: "http://schemas.microsoft.com/office/drawing/2016/5/13/chartex", cx8: "http://schemas.microsoft.com/office/drawing/2016/5/14/chartex", aink: "http://schemas.microsoft.com/office/drawing/2016/ink", am3d: "http://schemas.microsoft.com/office/drawing/2017/model3d", w16cex: "http://schemas.microsoft.com/office/word/2018/wordml/cex", w16cid: "http://schemas.microsoft.com/office/word/2016/wordml/cid", w16: "http://schemas.microsoft.com/office/word/2018/wordml", w16sdtdh: "http://schemas.microsoft.com/office/word/2020/wordml/sdtdatahash", w16se: "http://schemas.microsoft.com/office/word/2015/wordml/symex" }, Zt = class extends we {
  constructor(e, t) {
    super(pe({ Ignorable: t }, Object.fromEntries(e.map((r) => [r, Yr[r]])))), Q(this, "xmlKeys", pe({ Ignorable: "mc:Ignorable" }, Object.fromEntries(Object.keys(Yr).map((r) => [r, `xmlns:${r}`]))));
  }
}, Ku = class extends te {
  constructor(e) {
    super("cp:coreProperties"), this.root.push(new Zt(["cp", "dc", "dcterms", "dcmitype", "xsi"])), e.title && this.root.push(new Ye("dc:title", e.title)), e.subject && this.root.push(new Ye("dc:subject", e.subject)), e.creator && this.root.push(new Ye("dc:creator", e.creator)), e.keywords && this.root.push(new Ye("cp:keywords", e.keywords)), e.description && this.root.push(new Ye("dc:description", e.description)), e.lastModifiedBy && this.root.push(new Ye("cp:lastModifiedBy", e.lastModifiedBy)), e.revision && this.root.push(new Ye("cp:revision", String(e.revision))), this.root.push(new Jr("dcterms:created")), this.root.push(new Jr("dcterms:modified"));
  }
}, Gu = class extends we {
  constructor(...e) {
    super(...e), Q(this, "xmlKeys", { type: "xsi:type" });
  }
}, Jr = class extends te {
  constructor(e) {
    super(e), this.root.push(new Gu({ type: "dcterms:W3CDTF" })), this.root.push(Pa(/* @__PURE__ */ new Date()));
  }
}, qu = class extends we {
  constructor(...e) {
    super(...e), Q(this, "xmlKeys", { xmlns: "xmlns", vt: "xmlns:vt" });
  }
}, Vu = class extends we {
  constructor(...e) {
    super(...e), Q(this, "xmlKeys", { formatId: "fmtid", pid: "pid", name: "name" });
  }
}, $u = class extends te {
  constructor(e, t) {
    super("property"), this.root.push(new Vu({ formatId: "{D5CDD505-2E9C-101B-9397-08002B2CF9AE}", pid: e.toString(), name: t.name })), this.root.push(new Xu(t.value));
  }
}, Xu = class extends te {
  constructor(e) {
    super("vt:lpwstr"), this.root.push(e);
  }
}, Zu = class extends te {
  constructor(e) {
    super("Properties"), Q(this, "nextId", void 0), Q(this, "properties", []), this.root.push(new qu({ xmlns: "http://schemas.openxmlformats.org/officeDocument/2006/custom-properties", vt: "http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes" })), this.nextId = 2;
    for (const t of e) this.addCustomProperty(t);
  }
  prepForXml(e) {
    return this.properties.forEach((t) => this.root.push(t)), super.prepForXml(e);
  }
  addCustomProperty(e) {
    this.properties.push(new $u(this.nextId++, e));
  }
}, Yu = ({ space: e, count: t, separate: r, equalWidth: o, children: l }) => new he({ name: "w:cols", attributes: { space: { key: "w:space", value: e === void 0 ? void 0 : Se(e) }, count: { key: "w:num", value: t === void 0 ? void 0 : Te(t) }, separate: { key: "w:sep", value: r }, equalWidth: { key: "w:equalWidth", value: o } }, children: !o && l ? l : void 0 }), Ju = ({ type: e, linePitch: t, charSpace: r }) => new he({ name: "w:docGrid", attributes: { type: { key: "w:type", value: e }, linePitch: { key: "w:linePitch", value: Te(t) }, charSpace: { key: "w:charSpace", value: r ? Te(r) : void 0 } } }), st = { DEFAULT: "default", FIRST: "first", EVEN: "even" }, Qr = { HEADER: "w:headerReference", FOOTER: "w:footerReference" }, ar = (e, t) => new he({ name: e, attributes: { type: { key: "w:type", value: t.type || st.DEFAULT }, id: { key: "r:id", value: `rId${t.id}` } } }), Qu = ({ countBy: e, start: t, restart: r, distance: o }) => new he({ name: "w:lnNumType", attributes: { countBy: { key: "w:countBy", value: e === void 0 ? void 0 : Te(e) }, start: { key: "w:start", value: t === void 0 ? void 0 : Te(t) }, restart: { key: "w:restart", value: r }, distance: { key: "w:distance", value: o === void 0 ? void 0 : Se(o) } } }), en = class extends we {
  constructor(...e) {
    super(...e), Q(this, "xmlKeys", { display: "w:display", offsetFrom: "w:offsetFrom", zOrder: "w:zOrder" });
  }
}, el = class extends Ke {
  constructor(e) {
    if (super("w:pgBorders"), !e) return this;
    e.pageBorders ? this.root.push(new en({ display: e.pageBorders.display, offsetFrom: e.pageBorders.offsetFrom, zOrder: e.pageBorders.zOrder })) : this.root.push(new en({})), e.pageBorderTop && this.root.push(be("w:top", e.pageBorderTop)), e.pageBorderLeft && this.root.push(be("w:left", e.pageBorderLeft)), e.pageBorderBottom && this.root.push(be("w:bottom", e.pageBorderBottom)), e.pageBorderRight && this.root.push(be("w:right", e.pageBorderRight));
  }
}, tl = (e, t, r, o, l, s, u) => new he({ name: "w:pgMar", attributes: { top: { key: "w:top", value: ze(e) }, right: { key: "w:right", value: Se(t) }, bottom: { key: "w:bottom", value: ze(r) }, left: { key: "w:left", value: Se(o) }, header: { key: "w:header", value: Se(l) }, footer: { key: "w:footer", value: Se(s) }, gutter: { key: "w:gutter", value: Se(u) } } }), rl = ({ start: e, formatType: t, separator: r }) => new he({ name: "w:pgNumType", attributes: { start: { key: "w:start", value: e === void 0 ? void 0 : Te(e) }, formatType: { key: "w:fmt", value: t }, separator: { key: "w:chapSep", value: r } } }), gr = { PORTRAIT: "portrait", LANDSCAPE: "landscape" }, nl = ({ width: e, height: t, orientation: r, code: o }) => {
  const l = Se(e), s = Se(t);
  return new he({ name: "w:pgSz", attributes: { width: { key: "w:w", value: r === gr.LANDSCAPE ? s : l }, height: { key: "w:h", value: r === gr.LANDSCAPE ? l : s }, orientation: { key: "w:orient", value: r }, code: { key: "w:code", value: o } } });
}, il = class extends we {
  constructor(...e) {
    super(...e), Q(this, "xmlKeys", { val: "w:val" });
  }
}, al = class extends te {
  constructor(e) {
    super("w:textDirection"), this.root.push(new il({ val: e }));
  }
}, sl = (e) => new he({ name: "w:type", attributes: { val: { key: "w:val", value: e } } }), Je = { TOP: 1440, RIGHT: 1440, BOTTOM: 1440, LEFT: 1440, HEADER: 708, FOOTER: 708, GUTTER: 0 }, sr = { WIDTH: 11906, HEIGHT: 16838, ORIENTATION: gr.PORTRAIT }, pi = class extends te {
  constructor({ page: { size: { width: e = sr.WIDTH, height: t = sr.HEIGHT, orientation: r = sr.ORIENTATION, code: o } = {}, margin: { top: l = Je.TOP, right: s = Je.RIGHT, bottom: u = Je.BOTTOM, left: a = Je.LEFT, header: d = Je.HEADER, footer: T = Je.FOOTER, gutter: E = Je.GUTTER } = {}, pageNumbers: g = {}, borders: N, textDirection: w } = {}, grid: { linePitch: m = 360, charSpace: v, type: k } = {}, headerWrapperGroup: I = {}, footerWrapperGroup: y = {}, lineNumbers: x, titlePage: A, verticalAlign: _, column: p, type: P, revision: U } = {}) {
    super("w:sectPr"), this.addHeaderFooterGroup(Qr.HEADER, I), this.addHeaderFooterGroup(Qr.FOOTER, y), P && this.root.push(sl(P)), this.root.push(nl({ width: e, height: t, orientation: r, code: o })), this.root.push(tl(l, s, u, a, d, T, E)), N && this.root.push(new el(N)), x && this.root.push(Qu(x)), this.root.push(rl(g)), p && this.root.push(Yu(p)), _ && this.root.push(ai(_)), A !== void 0 && this.root.push(new le("w:titlePg", A)), w && this.root.push(new al(w)), U && this.root.push(new ol(U)), this.root.push(Ju({ linePitch: m, charSpace: v, type: k }));
  }
  addHeaderFooterGroup(e, t) {
    t.default && this.root.push(ar(e, { type: st.DEFAULT, id: t.default.View.ReferenceId })), t.first && this.root.push(ar(e, { type: st.FIRST, id: t.first.View.ReferenceId })), t.even && this.root.push(ar(e, { type: st.EVEN, id: t.even.View.ReferenceId }));
  }
}, ol = class extends te {
  constructor(e) {
    super("w:sectPrChange"), this.root.push(new Ce({ id: e.id, author: e.author, date: e.date })), this.root.push(new pi(e));
  }
}, ul = class extends te {
  constructor() {
    super("w:body"), Q(this, "sections", []);
  }
  addSection(e) {
    const t = this.sections.pop();
    this.root.push(this.createSectionParagraph(t)), this.sections.push(new pi(e));
  }
  prepForXml(e) {
    return this.sections.length === 1 && (this.root.splice(0, 1), this.root.push(this.sections.pop())), super.prepForXml(e);
  }
  push(e) {
    this.root.push(e);
  }
  createSectionParagraph(e) {
    const t = new rt({}), r = new tt({});
    return r.push(e), t.addChildElement(r), t;
  }
}, ll = class extends we {
  constructor(...e) {
    super(...e), Q(this, "xmlKeys", { color: "w:color", themeColor: "w:themeColor", themeShade: "w:themeShade", themeTint: "w:themeTint" });
  }
}, cl = class extends te {
  constructor(e) {
    super("w:background"), this.root.push(new ll({ color: e.color === void 0 ? void 0 : ut(e.color), themeColor: e.themeColor, themeShade: e.themeShade === void 0 ? void 0 : jr(e.themeShade), themeTint: e.themeTint === void 0 ? void 0 : jr(e.themeTint) }));
  }
}, hl = class extends te {
  constructor(e) {
    super("w:document"), Q(this, "body", void 0), this.root.push(new Zt(["wpc", "mc", "o", "r", "m", "v", "wp14", "wp", "w10", "w", "w14", "w15", "wpg", "wpi", "wne", "wps", "cx", "cx1", "cx2", "cx3", "cx4", "cx5", "cx6", "cx7", "cx8", "aink", "am3d", "w16cex", "w16cid", "w16", "w16sdtdh", "w16se"], "w14 w15 wp14")), this.body = new ul(), e.background && this.root.push(new cl(e.background)), this.root.push(this.body);
  }
  add(e) {
    return this.body.push(e), this;
  }
  get Body() {
    return this.body;
  }
}, fl = class {
  constructor(e) {
    Q(this, "document", void 0), Q(this, "relationships", void 0), this.document = new hl(e), this.relationships = new Xe();
  }
  get View() {
    return this.document;
  }
  get Relationships() {
    return this.relationships;
  }
}, dl = class extends we {
  constructor(...e) {
    super(...e), Q(this, "xmlKeys", { wpc: "xmlns:wpc", mc: "xmlns:mc", o: "xmlns:o", r: "xmlns:r", m: "xmlns:m", v: "xmlns:v", wp14: "xmlns:wp14", wp: "xmlns:wp", w10: "xmlns:w10", w: "xmlns:w", w14: "xmlns:w14", w15: "xmlns:w15", wpg: "xmlns:wpg", wpi: "xmlns:wpi", wne: "xmlns:wne", wps: "xmlns:wps", Ignorable: "mc:Ignorable" });
  }
}, pl = class extends we {
  constructor(...e) {
    super(...e), Q(this, "xmlKeys", { type: "w:type", id: "w:id" });
  }
}, ml = class extends $e {
  constructor() {
    super({ style: "EndnoteReference" }), this.root.push(new No());
  }
}, tn = { SEPARATOR: "separator", CONTINUATION_SEPARATOR: "continuationSeparator" }, or = class extends te {
  constructor(e) {
    super("w:endnote"), this.root.push(new pl({ type: e.type, id: e.id }));
    for (let t = 0; t < e.children.length; t++) {
      const r = e.children[t];
      t === 0 && r.addRunToFront(new ml()), this.root.push(r);
    }
  }
}, wl = class extends te {
  constructor() {
    super("w:continuationSeparator");
  }
}, mi = class extends $e {
  constructor() {
    super({}), this.root.push(new wl());
  }
}, vl = class extends te {
  constructor() {
    super("w:separator");
  }
}, wi = class extends $e {
  constructor() {
    super({}), this.root.push(new vl());
  }
}, gl = class extends te {
  constructor() {
    super("w:endnotes"), this.root.push(new dl({ wpc: "http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas", mc: "http://schemas.openxmlformats.org/markup-compatibility/2006", o: "urn:schemas-microsoft-com:office:office", r: "http://schemas.openxmlformats.org/officeDocument/2006/relationships", m: "http://schemas.openxmlformats.org/officeDocument/2006/math", v: "urn:schemas-microsoft-com:vml", wp14: "http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing", wp: "http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing", w10: "urn:schemas-microsoft-com:office:word", w: "http://schemas.openxmlformats.org/wordprocessingml/2006/main", w14: "http://schemas.microsoft.com/office/word/2010/wordml", w15: "http://schemas.microsoft.com/office/word/2012/wordml", wpg: "http://schemas.microsoft.com/office/word/2010/wordprocessingGroup", wpi: "http://schemas.microsoft.com/office/word/2010/wordprocessingInk", wne: "http://schemas.microsoft.com/office/word/2006/wordml", wps: "http://schemas.microsoft.com/office/word/2010/wordprocessingShape", Ignorable: "w14 w15 wp14" }));
    const e = new or({ id: -1, type: tn.SEPARATOR, children: [new rt({ spacing: { after: 0, line: 240, lineRule: ht.AUTO }, children: [new wi()] })] });
    this.root.push(e);
    const t = new or({ id: 0, type: tn.CONTINUATION_SEPARATOR, children: [new rt({ spacing: { after: 0, line: 240, lineRule: ht.AUTO }, children: [new mi()] })] });
    this.root.push(t);
  }
  createEndnote(e, t) {
    const r = new or({ id: e, children: t });
    this.root.push(r);
  }
}, yl = class {
  constructor() {
    Q(this, "endnotes", void 0), Q(this, "relationships", void 0), this.endnotes = new gl(), this.relationships = new Xe();
  }
  get View() {
    return this.endnotes;
  }
  get Relationships() {
    return this.relationships;
  }
}, bl = class extends we {
  constructor(...e) {
    super(...e), Q(this, "xmlKeys", { wpc: "xmlns:wpc", mc: "xmlns:mc", o: "xmlns:o", r: "xmlns:r", m: "xmlns:m", v: "xmlns:v", wp14: "xmlns:wp14", wp: "xmlns:wp", w10: "xmlns:w10", w: "xmlns:w", w14: "xmlns:w14", w15: "xmlns:w15", wpg: "xmlns:wpg", wpi: "xmlns:wpi", wne: "xmlns:wne", wps: "xmlns:wps", cp: "xmlns:cp", dc: "xmlns:dc", dcterms: "xmlns:dcterms", dcmitype: "xmlns:dcmitype", xsi: "xmlns:xsi", type: "xsi:type" });
  }
}, _l = class extends Fn {
  constructor(e, t) {
    super("w:ftr", t), Q(this, "refId", void 0), this.refId = e, t || this.root.push(new bl({ wpc: "http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas", mc: "http://schemas.openxmlformats.org/markup-compatibility/2006", o: "urn:schemas-microsoft-com:office:office", r: "http://schemas.openxmlformats.org/officeDocument/2006/relationships", m: "http://schemas.openxmlformats.org/officeDocument/2006/math", v: "urn:schemas-microsoft-com:vml", wp14: "http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing", wp: "http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing", w10: "urn:schemas-microsoft-com:office:word", w: "http://schemas.openxmlformats.org/wordprocessingml/2006/main", w14: "http://schemas.microsoft.com/office/word/2010/wordml", w15: "http://schemas.microsoft.com/office/word/2012/wordml", wpg: "http://schemas.microsoft.com/office/word/2010/wordprocessingGroup", wpi: "http://schemas.microsoft.com/office/word/2010/wordprocessingInk", wne: "http://schemas.microsoft.com/office/word/2006/wordml", wps: "http://schemas.microsoft.com/office/word/2010/wordprocessingShape" }));
  }
  get ReferenceId() {
    return this.refId;
  }
  add(e) {
    this.root.push(e);
  }
}, xl = class {
  constructor(e, t, r) {
    Q(this, "media", void 0), Q(this, "footer", void 0), Q(this, "relationships", void 0), this.media = e, this.footer = new _l(t, r), this.relationships = new Xe();
  }
  add(e) {
    this.footer.add(e);
  }
  addChildElement(e) {
    this.footer.addChildElement(e);
  }
  get View() {
    return this.footer;
  }
  get Relationships() {
    return this.relationships;
  }
  get Media() {
    return this.media;
  }
}, El = class extends we {
  constructor(...e) {
    super(...e), Q(this, "xmlKeys", { type: "w:type", id: "w:id" });
  }
}, Sl = class extends te {
  constructor() {
    super("w:footnoteRef");
  }
}, Tl = class extends $e {
  constructor() {
    super({ style: "FootnoteReference" }), this.root.push(new Sl());
  }
}, rn = { SEPERATOR: "separator", CONTINUATION_SEPERATOR: "continuationSeparator" }, ur = class extends te {
  constructor(e) {
    super("w:footnote"), this.root.push(new El({ type: e.type, id: e.id }));
    for (let t = 0; t < e.children.length; t++) {
      const r = e.children[t];
      t === 0 && r.addRunToFront(new Tl()), this.root.push(r);
    }
  }
}, Al = class extends we {
  constructor(...e) {
    super(...e), Q(this, "xmlKeys", { wpc: "xmlns:wpc", mc: "xmlns:mc", o: "xmlns:o", r: "xmlns:r", m: "xmlns:m", v: "xmlns:v", wp14: "xmlns:wp14", wp: "xmlns:wp", w10: "xmlns:w10", w: "xmlns:w", w14: "xmlns:w14", w15: "xmlns:w15", wpg: "xmlns:wpg", wpi: "xmlns:wpi", wne: "xmlns:wne", wps: "xmlns:wps", Ignorable: "mc:Ignorable" });
  }
}, kl = class extends te {
  constructor() {
    super("w:footnotes"), this.root.push(new Al({ wpc: "http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas", mc: "http://schemas.openxmlformats.org/markup-compatibility/2006", o: "urn:schemas-microsoft-com:office:office", r: "http://schemas.openxmlformats.org/officeDocument/2006/relationships", m: "http://schemas.openxmlformats.org/officeDocument/2006/math", v: "urn:schemas-microsoft-com:vml", wp14: "http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing", wp: "http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing", w10: "urn:schemas-microsoft-com:office:word", w: "http://schemas.openxmlformats.org/wordprocessingml/2006/main", w14: "http://schemas.microsoft.com/office/word/2010/wordml", w15: "http://schemas.microsoft.com/office/word/2012/wordml", wpg: "http://schemas.microsoft.com/office/word/2010/wordprocessingGroup", wpi: "http://schemas.microsoft.com/office/word/2010/wordprocessingInk", wne: "http://schemas.microsoft.com/office/word/2006/wordml", wps: "http://schemas.microsoft.com/office/word/2010/wordprocessingShape", Ignorable: "w14 w15 wp14" }));
    const e = new ur({ id: -1, type: rn.SEPERATOR, children: [new rt({ spacing: { after: 0, line: 240, lineRule: ht.AUTO }, children: [new wi()] })] });
    this.root.push(e);
    const t = new ur({ id: 0, type: rn.CONTINUATION_SEPERATOR, children: [new rt({ spacing: { after: 0, line: 240, lineRule: ht.AUTO }, children: [new mi()] })] });
    this.root.push(t);
  }
  createFootNote(e, t) {
    const r = new ur({ id: e, children: t });
    this.root.push(r);
  }
}, Rl = class {
  constructor() {
    Q(this, "footnotess", void 0), Q(this, "relationships", void 0), this.footnotess = new kl(), this.relationships = new Xe();
  }
  get View() {
    return this.footnotess;
  }
  get Relationships() {
    return this.relationships;
  }
}, Cl = class extends we {
  constructor(...e) {
    super(...e), Q(this, "xmlKeys", { wpc: "xmlns:wpc", mc: "xmlns:mc", o: "xmlns:o", r: "xmlns:r", m: "xmlns:m", v: "xmlns:v", wp14: "xmlns:wp14", wp: "xmlns:wp", w10: "xmlns:w10", w: "xmlns:w", w14: "xmlns:w14", w15: "xmlns:w15", wpg: "xmlns:wpg", wpi: "xmlns:wpi", wne: "xmlns:wne", wps: "xmlns:wps", cp: "xmlns:cp", dc: "xmlns:dc", dcterms: "xmlns:dcterms", dcmitype: "xmlns:dcmitype", xsi: "xmlns:xsi", type: "xsi:type", cx: "xmlns:cx", cx1: "xmlns:cx1", cx2: "xmlns:cx2", cx3: "xmlns:cx3", cx4: "xmlns:cx4", cx5: "xmlns:cx5", cx6: "xmlns:cx6", cx7: "xmlns:cx7", cx8: "xmlns:cx8", w16cid: "xmlns:w16cid", w16se: "xmlns:w16se" });
  }
}, Il = class extends Fn {
  constructor(e, t) {
    super("w:hdr", t), Q(this, "refId", void 0), this.refId = e, t || this.root.push(new Cl({ wpc: "http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas", mc: "http://schemas.openxmlformats.org/markup-compatibility/2006", o: "urn:schemas-microsoft-com:office:office", r: "http://schemas.openxmlformats.org/officeDocument/2006/relationships", m: "http://schemas.openxmlformats.org/officeDocument/2006/math", v: "urn:schemas-microsoft-com:vml", wp14: "http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing", wp: "http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing", w10: "urn:schemas-microsoft-com:office:word", w: "http://schemas.openxmlformats.org/wordprocessingml/2006/main", w14: "http://schemas.microsoft.com/office/word/2010/wordml", w15: "http://schemas.microsoft.com/office/word/2012/wordml", wpg: "http://schemas.microsoft.com/office/word/2010/wordprocessingGroup", wpi: "http://schemas.microsoft.com/office/word/2010/wordprocessingInk", wne: "http://schemas.microsoft.com/office/word/2006/wordml", wps: "http://schemas.microsoft.com/office/word/2010/wordprocessingShape", cx: "http://schemas.microsoft.com/office/drawing/2014/chartex", cx1: "http://schemas.microsoft.com/office/drawing/2015/9/8/chartex", cx2: "http://schemas.microsoft.com/office/drawing/2015/10/21/chartex", cx3: "http://schemas.microsoft.com/office/drawing/2016/5/9/chartex", cx4: "http://schemas.microsoft.com/office/drawing/2016/5/10/chartex", cx5: "http://schemas.microsoft.com/office/drawing/2016/5/11/chartex", cx6: "http://schemas.microsoft.com/office/drawing/2016/5/12/chartex", cx7: "http://schemas.microsoft.com/office/drawing/2016/5/13/chartex", cx8: "http://schemas.microsoft.com/office/drawing/2016/5/14/chartex", w16cid: "http://schemas.microsoft.com/office/word/2016/wordml/cid", w16se: "http://schemas.microsoft.com/office/word/2015/wordml/symex" }));
  }
  get ReferenceId() {
    return this.refId;
  }
  add(e) {
    this.root.push(e);
  }
}, Nl = class {
  constructor(e, t, r) {
    Q(this, "media", void 0), Q(this, "header", void 0), Q(this, "relationships", void 0), this.media = e, this.header = new Il(t, r), this.relationships = new Xe();
  }
  add(e) {
    return this.header.add(e), this;
  }
  addChildElement(e) {
    this.header.addChildElement(e);
  }
  get View() {
    return this.header;
  }
  get Relationships() {
    return this.relationships;
  }
  get Media() {
    return this.media;
  }
}, Ol = class {
  constructor() {
    Q(this, "map", void 0), this.map = /* @__PURE__ */ new Map();
  }
  addImage(e, t) {
    this.map.set(e, t);
  }
  get Array() {
    return Array.from(this.map.values());
  }
}, je = { DECIMAL: "decimal", BULLET: "bullet" }, Pl = class extends we {
  constructor(...e) {
    super(...e), Q(this, "xmlKeys", { ilvl: "w:ilvl", tentative: "w15:tentative" });
  }
}, Fl = class extends te {
  constructor(e) {
    super("w:numFmt"), this.root.push(new Ae({ val: e }));
  }
}, Dl = class extends te {
  constructor(e) {
    super("w:lvlText"), this.root.push(new Ae({ val: e }));
  }
}, Bl = class extends te {
  constructor(e) {
    super("w:lvlJc"), this.root.push(new Ae({ val: e }));
  }
}, Ll = class extends te {
  constructor(e) {
    super("w:suff"), this.root.push(new Ae({ val: e }));
  }
}, Ml = class extends te {
  constructor() {
    super("w:isLgl");
  }
}, Ul = class extends te {
  constructor({ level: e, format: t, text: r, alignment: o = Oe.START, start: l = 1, style: s, suffix: u, isLegalNumberingStyle: a }) {
    if (super("w:lvl"), Q(this, "paragraphProperties", void 0), Q(this, "runProperties", void 0), this.root.push(new Et("w:start", Te(l))), t && this.root.push(new Fl(t)), u && this.root.push(new Ll(u)), a && this.root.push(new Ml()), r && this.root.push(new Dl(r)), this.root.push(new Bl(o)), (s == null ? void 0 : s.style) && this.root.push(_t(s.style)), this.paragraphProperties = new tt(s && s.paragraph), this.runProperties = new Ve(s && s.run), this.root.push(this.paragraphProperties), this.root.push(this.runProperties), e > 9) throw new Error("Level cannot be greater than 9. Read more here: https://answers.microsoft.com/en-us/msoffice/forum/all/does-word-support-more-than-9-list-levels/d130fdcd-1781-446d-8c84-c6c79124e4d7");
    this.root.push(new Pl({ ilvl: Te(e), tentative: 1 }));
  }
}, jl = class extends Ul {
}, zl = class extends te {
  constructor(e) {
    super("w:multiLevelType"), this.root.push(new Ae({ val: e }));
  }
}, Wl = class extends we {
  constructor(...e) {
    super(...e), Q(this, "xmlKeys", { abstractNumId: "w:abstractNumId", restartNumberingAfterBreak: "w15:restartNumberingAfterBreak" });
  }
}, nn = class extends te {
  constructor(e, t) {
    super("w:abstractNum"), Q(this, "id", void 0), this.root.push(new Wl({ abstractNumId: Te(e), restartNumberingAfterBreak: 0 })), this.root.push(new zl("hybridMultilevel")), this.id = e;
    for (const r of t) this.root.push(new jl(r));
  }
}, Hl = class extends te {
  constructor(e) {
    super("w:abstractNumId"), this.root.push(new Ae({ val: e }));
  }
}, Kl = class extends we {
  constructor(...e) {
    super(...e), Q(this, "xmlKeys", { numId: "w:numId" });
  }
}, an = class extends te {
  constructor(e) {
    if (super("w:num"), Q(this, "numId", void 0), Q(this, "reference", void 0), Q(this, "instance", void 0), this.numId = e.numId, this.reference = e.reference, this.instance = e.instance, this.root.push(new Kl({ numId: Te(e.numId) })), this.root.push(new Hl(Te(e.abstractNumId))), e.overrideLevels && e.overrideLevels.length) for (const t of e.overrideLevels) this.root.push(new ql(t.num, t.start));
  }
}, Gl = class extends we {
  constructor(...e) {
    super(...e), Q(this, "xmlKeys", { ilvl: "w:ilvl" });
  }
}, ql = class extends te {
  constructor(e, t) {
    super("w:lvlOverride"), this.root.push(new Gl({ ilvl: e })), t !== void 0 && this.root.push(new $l(t));
  }
}, Vl = class extends we {
  constructor(...e) {
    super(...e), Q(this, "xmlKeys", { val: "w:val" });
  }
}, $l = class extends te {
  constructor(e) {
    super("w:startOverride"), this.root.push(new Vl({ val: e }));
  }
}, Xl = class extends te {
  constructor(e) {
    super("w:numbering"), Q(this, "abstractNumberingMap", /* @__PURE__ */ new Map()), Q(this, "concreteNumberingMap", /* @__PURE__ */ new Map()), Q(this, "referenceConfigMap", /* @__PURE__ */ new Map()), Q(this, "abstractNumUniqueNumericId", ms()), Q(this, "concreteNumUniqueNumericId", ws()), this.root.push(new Zt(["wpc", "mc", "o", "r", "m", "v", "wp14", "wp", "w10", "w", "w14", "w15", "wpg", "wpi", "wne", "wps"], "w14 w15 wp14"));
    const t = new nn(this.abstractNumUniqueNumericId(), [{ level: 0, format: je.BULLET, text: "\u25CF", alignment: Oe.LEFT, style: { paragraph: { indent: { left: Ie(0.5), hanging: Ie(0.25) } } } }, { level: 1, format: je.BULLET, text: "\u25CB", alignment: Oe.LEFT, style: { paragraph: { indent: { left: Ie(1), hanging: Ie(0.25) } } } }, { level: 2, format: je.BULLET, text: "\u25A0", alignment: Oe.LEFT, style: { paragraph: { indent: { left: 2160, hanging: Ie(0.25) } } } }, { level: 3, format: je.BULLET, text: "\u25CF", alignment: Oe.LEFT, style: { paragraph: { indent: { left: 2880, hanging: Ie(0.25) } } } }, { level: 4, format: je.BULLET, text: "\u25CB", alignment: Oe.LEFT, style: { paragraph: { indent: { left: 3600, hanging: Ie(0.25) } } } }, { level: 5, format: je.BULLET, text: "\u25A0", alignment: Oe.LEFT, style: { paragraph: { indent: { left: 4320, hanging: Ie(0.25) } } } }, { level: 6, format: je.BULLET, text: "\u25CF", alignment: Oe.LEFT, style: { paragraph: { indent: { left: 5040, hanging: Ie(0.25) } } } }, { level: 7, format: je.BULLET, text: "\u25CF", alignment: Oe.LEFT, style: { paragraph: { indent: { left: 5760, hanging: Ie(0.25) } } } }, { level: 8, format: je.BULLET, text: "\u25CF", alignment: Oe.LEFT, style: { paragraph: { indent: { left: 6480, hanging: Ie(0.25) } } } }]);
    this.concreteNumberingMap.set("default-bullet-numbering", new an({ numId: 1, abstractNumId: t.id, reference: "default-bullet-numbering", instance: 0, overrideLevels: [{ num: 0, start: 1 }] })), this.abstractNumberingMap.set("default-bullet-numbering", t);
    for (const r of e.config) this.abstractNumberingMap.set(r.reference, new nn(this.abstractNumUniqueNumericId(), r.levels)), this.referenceConfigMap.set(r.reference, r.levels);
  }
  prepForXml(e) {
    for (const t of this.abstractNumberingMap.values()) this.root.push(t);
    for (const t of this.concreteNumberingMap.values()) this.root.push(t);
    return super.prepForXml(e);
  }
  createConcreteNumberingInstance(e, t) {
    const r = this.abstractNumberingMap.get(e);
    if (!r) return;
    const o = `${e}-${t}`;
    if (this.concreteNumberingMap.has(o)) return;
    const l = this.referenceConfigMap.get(e), s = l && l[0].start, u = { numId: this.concreteNumUniqueNumericId(), abstractNumId: r.id, reference: e, instance: t, overrideLevels: [typeof s == "number" && Number.isInteger(s) ? { num: 0, start: s } : { num: 0, start: 1 }] };
    this.concreteNumberingMap.set(o, new an(u));
  }
  get ConcreteNumbering() {
    return Array.from(this.concreteNumberingMap.values());
  }
  get ReferenceConfig() {
    return Array.from(this.referenceConfigMap.values());
  }
}, Zl = (e) => new he({ name: "w:compatSetting", attributes: { version: { key: "w:val", value: e }, name: { key: "w:name", value: "compatibilityMode" }, uri: { key: "w:uri", value: "http://schemas.microsoft.com/office/word" } } }), Yl = class extends te {
  constructor(e) {
    super("w:compat"), e.version && this.root.push(Zl(e.version)), e.useSingleBorderforContiguousCells && this.root.push(new le("w:useSingleBorderforContiguousCells", e.useSingleBorderforContiguousCells)), e.wordPerfectJustification && this.root.push(new le("w:wpJustification", e.wordPerfectJustification)), e.noTabStopForHangingIndent && this.root.push(new le("w:noTabHangInd", e.noTabStopForHangingIndent)), e.noLeading && this.root.push(new le("w:noLeading", e.noLeading)), e.spaceForUnderline && this.root.push(new le("w:spaceForUL", e.spaceForUnderline)), e.noColumnBalance && this.root.push(new le("w:noColumnBalance", e.noColumnBalance)), e.balanceSingleByteDoubleByteWidth && this.root.push(new le("w:balanceSingleByteDoubleByteWidth", e.balanceSingleByteDoubleByteWidth)), e.noExtraLineSpacing && this.root.push(new le("w:noExtraLineSpacing", e.noExtraLineSpacing)), e.doNotLeaveBackslashAlone && this.root.push(new le("w:doNotLeaveBackslashAlone", e.doNotLeaveBackslashAlone)), e.underlineTrailingSpaces && this.root.push(new le("w:ulTrailSpace", e.underlineTrailingSpaces)), e.doNotExpandShiftReturn && this.root.push(new le("w:doNotExpandShiftReturn", e.doNotExpandShiftReturn)), e.spacingInWholePoints && this.root.push(new le("w:spacingInWholePoints", e.spacingInWholePoints)), e.lineWrapLikeWord6 && this.root.push(new le("w:lineWrapLikeWord6", e.lineWrapLikeWord6)), e.printBodyTextBeforeHeader && this.root.push(new le("w:printBodyTextBeforeHeader", e.printBodyTextBeforeHeader)), e.printColorsBlack && this.root.push(new le("w:printColBlack", e.printColorsBlack)), e.spaceWidth && this.root.push(new le("w:wpSpaceWidth", e.spaceWidth)), e.showBreaksInFrames && this.root.push(new le("w:showBreaksInFrames", e.showBreaksInFrames)), e.subFontBySize && this.root.push(new le("w:subFontBySize", e.subFontBySize)), e.suppressBottomSpacing && this.root.push(new le("w:suppressBottomSpacing", e.suppressBottomSpacing)), e.suppressTopSpacing && this.root.push(new le("w:suppressTopSpacing", e.suppressTopSpacing)), e.suppressSpacingAtTopOfPage && this.root.push(new le("w:suppressSpacingAtTopOfPage", e.suppressSpacingAtTopOfPage)), e.suppressTopSpacingWP && this.root.push(new le("w:suppressTopSpacingWP", e.suppressTopSpacingWP)), e.suppressSpBfAfterPgBrk && this.root.push(new le("w:suppressSpBfAfterPgBrk", e.suppressSpBfAfterPgBrk)), e.swapBordersFacingPages && this.root.push(new le("w:swapBordersFacingPages", e.swapBordersFacingPages)), e.convertMailMergeEsc && this.root.push(new le("w:convMailMergeEsc", e.convertMailMergeEsc)), e.truncateFontHeightsLikeWP6 && this.root.push(new le("w:truncateFontHeightsLikeWP6", e.truncateFontHeightsLikeWP6)), e.macWordSmallCaps && this.root.push(new le("w:mwSmallCaps", e.macWordSmallCaps)), e.usePrinterMetrics && this.root.push(new le("w:usePrinterMetrics", e.usePrinterMetrics)), e.doNotSuppressParagraphBorders && this.root.push(new le("w:doNotSuppressParagraphBorders", e.doNotSuppressParagraphBorders)), e.wrapTrailSpaces && this.root.push(new le("w:wrapTrailSpaces", e.wrapTrailSpaces)), e.footnoteLayoutLikeWW8 && this.root.push(new le("w:footnoteLayoutLikeWW8", e.footnoteLayoutLikeWW8)), e.shapeLayoutLikeWW8 && this.root.push(new le("w:shapeLayoutLikeWW8", e.shapeLayoutLikeWW8)), e.alignTablesRowByRow && this.root.push(new le("w:alignTablesRowByRow", e.alignTablesRowByRow)), e.forgetLastTabAlignment && this.root.push(new le("w:forgetLastTabAlignment", e.forgetLastTabAlignment)), e.adjustLineHeightInTable && this.root.push(new le("w:adjustLineHeightInTable", e.adjustLineHeightInTable)), e.autoSpaceLikeWord95 && this.root.push(new le("w:autoSpaceLikeWord95", e.autoSpaceLikeWord95)), e.noSpaceRaiseLower && this.root.push(new le("w:noSpaceRaiseLower", e.noSpaceRaiseLower)), e.doNotUseHTMLParagraphAutoSpacing && this.root.push(new le("w:doNotUseHTMLParagraphAutoSpacing", e.doNotUseHTMLParagraphAutoSpacing)), e.layoutRawTableWidth && this.root.push(new le("w:layoutRawTableWidth", e.layoutRawTableWidth)), e.layoutTableRowsApart && this.root.push(new le("w:layoutTableRowsApart", e.layoutTableRowsApart)), e.useWord97LineBreakRules && this.root.push(new le("w:useWord97LineBreakRules", e.useWord97LineBreakRules)), e.doNotBreakWrappedTables && this.root.push(new le("w:doNotBreakWrappedTables", e.doNotBreakWrappedTables)), e.doNotSnapToGridInCell && this.root.push(new le("w:doNotSnapToGridInCell", e.doNotSnapToGridInCell)), e.selectFieldWithFirstOrLastCharacter && this.root.push(new le("w:selectFldWithFirstOrLastChar", e.selectFieldWithFirstOrLastCharacter)), e.applyBreakingRules && this.root.push(new le("w:applyBreakingRules", e.applyBreakingRules)), e.doNotWrapTextWithPunctuation && this.root.push(new le("w:doNotWrapTextWithPunct", e.doNotWrapTextWithPunctuation)), e.doNotUseEastAsianBreakRules && this.root.push(new le("w:doNotUseEastAsianBreakRules", e.doNotUseEastAsianBreakRules)), e.useWord2002TableStyleRules && this.root.push(new le("w:useWord2002TableStyleRules", e.useWord2002TableStyleRules)), e.growAutofit && this.root.push(new le("w:growAutofit", e.growAutofit)), e.useFELayout && this.root.push(new le("w:useFELayout", e.useFELayout)), e.useNormalStyleForList && this.root.push(new le("w:useNormalStyleForList", e.useNormalStyleForList)), e.doNotUseIndentAsNumberingTabStop && this.root.push(new le("w:doNotUseIndentAsNumberingTabStop", e.doNotUseIndentAsNumberingTabStop)), e.useAlternateEastAsianLineBreakRules && this.root.push(new le("w:useAltKinsokuLineBreakRules", e.useAlternateEastAsianLineBreakRules)), e.allowSpaceOfSameStyleInTable && this.root.push(new le("w:allowSpaceOfSameStyleInTable", e.allowSpaceOfSameStyleInTable)), e.doNotSuppressIndentation && this.root.push(new le("w:doNotSuppressIndentation", e.doNotSuppressIndentation)), e.doNotAutofitConstrainedTables && this.root.push(new le("w:doNotAutofitConstrainedTables", e.doNotAutofitConstrainedTables)), e.autofitToFirstFixedWidthCell && this.root.push(new le("w:autofitToFirstFixedWidthCell", e.autofitToFirstFixedWidthCell)), e.underlineTabInNumberingList && this.root.push(new le("w:underlineTabInNumList", e.underlineTabInNumberingList)), e.displayHangulFixedWidth && this.root.push(new le("w:displayHangulFixedWidth", e.displayHangulFixedWidth)), e.splitPgBreakAndParaMark && this.root.push(new le("w:splitPgBreakAndParaMark", e.splitPgBreakAndParaMark)), e.doNotVerticallyAlignCellWithSp && this.root.push(new le("w:doNotVertAlignCellWithSp", e.doNotVerticallyAlignCellWithSp)), e.doNotBreakConstrainedForcedTable && this.root.push(new le("w:doNotBreakConstrainedForcedTable", e.doNotBreakConstrainedForcedTable)), e.ignoreVerticalAlignmentInTextboxes && this.root.push(new le("w:doNotVertAlignInTxbx", e.ignoreVerticalAlignmentInTextboxes)), e.useAnsiKerningPairs && this.root.push(new le("w:useAnsiKerningPairs", e.useAnsiKerningPairs)), e.cachedColumnBalance && this.root.push(new le("w:cachedColBalance", e.cachedColumnBalance));
  }
}, Jl = class extends we {
  constructor(...e) {
    super(...e), Q(this, "xmlKeys", { wpc: "xmlns:wpc", mc: "xmlns:mc", o: "xmlns:o", r: "xmlns:r", m: "xmlns:m", v: "xmlns:v", wp14: "xmlns:wp14", wp: "xmlns:wp", w10: "xmlns:w10", w: "xmlns:w", w14: "xmlns:w14", w15: "xmlns:w15", wpg: "xmlns:wpg", wpi: "xmlns:wpi", wne: "xmlns:wne", wps: "xmlns:wps", Ignorable: "mc:Ignorable" });
  }
}, Ql = class extends te {
  constructor(e) {
    var t, r, o, l, s, u, a, d;
    super("w:settings"), this.root.push(new Jl({ wpc: "http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas", mc: "http://schemas.openxmlformats.org/markup-compatibility/2006", o: "urn:schemas-microsoft-com:office:office", r: "http://schemas.openxmlformats.org/officeDocument/2006/relationships", m: "http://schemas.openxmlformats.org/officeDocument/2006/math", v: "urn:schemas-microsoft-com:vml", wp14: "http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing", wp: "http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing", w10: "urn:schemas-microsoft-com:office:word", w: "http://schemas.openxmlformats.org/wordprocessingml/2006/main", w14: "http://schemas.microsoft.com/office/word/2010/wordml", w15: "http://schemas.microsoft.com/office/word/2012/wordml", wpg: "http://schemas.microsoft.com/office/word/2010/wordprocessingGroup", wpi: "http://schemas.microsoft.com/office/word/2010/wordprocessingInk", wne: "http://schemas.microsoft.com/office/word/2006/wordml", wps: "http://schemas.microsoft.com/office/word/2010/wordprocessingShape", Ignorable: "w14 w15 wp14" })), this.root.push(new le("w:displayBackgroundShape", true)), e.trackRevisions !== void 0 && this.root.push(new le("w:trackRevisions", e.trackRevisions)), e.evenAndOddHeaders !== void 0 && this.root.push(new le("w:evenAndOddHeaders", e.evenAndOddHeaders)), e.updateFields !== void 0 && this.root.push(new le("w:updateFields", e.updateFields)), e.defaultTabStop !== void 0 && this.root.push(new Et("w:defaultTabStop", e.defaultTabStop)), ((t = e.hyphenation) === null || t === void 0 ? void 0 : t.autoHyphenation) !== void 0 && this.root.push(new le("w:autoHyphenation", e.hyphenation.autoHyphenation)), ((r = e.hyphenation) === null || r === void 0 ? void 0 : r.hyphenationZone) !== void 0 && this.root.push(new Et("w:hyphenationZone", e.hyphenation.hyphenationZone)), ((o = e.hyphenation) === null || o === void 0 ? void 0 : o.consecutiveHyphenLimit) !== void 0 && this.root.push(new Et("w:consecutiveHyphenLimit", e.hyphenation.consecutiveHyphenLimit)), ((l = e.hyphenation) === null || l === void 0 ? void 0 : l.doNotHyphenateCaps) !== void 0 && this.root.push(new le("w:doNotHyphenateCaps", e.hyphenation.doNotHyphenateCaps)), this.root.push(new Yl(pe(pe({}, (s = e.compatibility) !== null && s !== void 0 ? s : {}), {}, { version: (u = (a = (d = e.compatibility) === null || d === void 0 ? void 0 : d.version) !== null && a !== void 0 ? a : e.compatibilityModeVersion) !== null && u !== void 0 ? u : 15 })));
  }
}, vi = class extends we {
  constructor(...e) {
    super(...e), Q(this, "xmlKeys", { val: "w:val" });
  }
}, ec = class extends te {
  constructor(e) {
    super("w:name"), this.root.push(new vi({ val: e }));
  }
}, tc = class extends te {
  constructor(e) {
    super("w:uiPriority"), this.root.push(new vi({ val: Te(e) }));
  }
}, rc = class extends we {
  constructor(...e) {
    super(...e), Q(this, "xmlKeys", { type: "w:type", styleId: "w:styleId", default: "w:default", customStyle: "w:customStyle" });
  }
}, gi = class extends te {
  constructor(e, t) {
    super("w:style"), this.root.push(new rc(e)), t.name && this.root.push(new ec(t.name)), t.basedOn && this.root.push(new He("w:basedOn", t.basedOn)), t.next && this.root.push(new He("w:next", t.next)), t.link && this.root.push(new He("w:link", t.link)), t.uiPriority !== void 0 && this.root.push(new tc(t.uiPriority)), t.semiHidden !== void 0 && this.root.push(new le("w:semiHidden", t.semiHidden)), t.unhideWhenUsed !== void 0 && this.root.push(new le("w:unhideWhenUsed", t.unhideWhenUsed)), t.quickFormat !== void 0 && this.root.push(new le("w:qFormat", t.quickFormat));
  }
}, Ct = class extends gi {
  constructor(e) {
    super({ type: "paragraph", styleId: e.id }, e), Q(this, "paragraphProperties", void 0), Q(this, "runProperties", void 0), this.paragraphProperties = new tt(e.paragraph), this.runProperties = new Ve(e.run), this.root.push(this.paragraphProperties), this.root.push(this.runProperties);
  }
}, mt = class extends gi {
  constructor(e) {
    super({ type: "character", styleId: e.id }, pe({ uiPriority: 99, unhideWhenUsed: true }, e)), Q(this, "runProperties", void 0), this.runProperties = new Ve(e.run), this.root.push(this.runProperties);
  }
}, Ze = class extends Ct {
  constructor(e) {
    super(pe({ basedOn: "Normal", next: "Normal", quickFormat: true }, e));
  }
}, nc = class extends Ze {
  constructor(e) {
    super(pe({ id: "Title", name: "Title" }, e));
  }
}, ic = class extends Ze {
  constructor(e) {
    super(pe({ id: "Heading1", name: "Heading 1" }, e));
  }
}, ac = class extends Ze {
  constructor(e) {
    super(pe({ id: "Heading2", name: "Heading 2" }, e));
  }
}, sc = class extends Ze {
  constructor(e) {
    super(pe({ id: "Heading3", name: "Heading 3" }, e));
  }
}, oc = class extends Ze {
  constructor(e) {
    super(pe({ id: "Heading4", name: "Heading 4" }, e));
  }
}, uc = class extends Ze {
  constructor(e) {
    super(pe({ id: "Heading5", name: "Heading 5" }, e));
  }
}, lc = class extends Ze {
  constructor(e) {
    super(pe({ id: "Heading6", name: "Heading 6" }, e));
  }
}, cc = class extends Ze {
  constructor(e) {
    super(pe({ id: "Strong", name: "Strong" }, e));
  }
}, hc = class extends Ct {
  constructor(e) {
    super(pe({ id: "ListParagraph", name: "List Paragraph", basedOn: "Normal", quickFormat: true }, e));
  }
}, fc = class extends Ct {
  constructor(e) {
    super(pe({ id: "FootnoteText", name: "footnote text", link: "FootnoteTextChar", basedOn: "Normal", uiPriority: 99, semiHidden: true, unhideWhenUsed: true, paragraph: { spacing: { after: 0, line: 240, lineRule: ht.AUTO } }, run: { size: 20 } }, e));
  }
}, dc = class extends mt {
  constructor(e) {
    super(pe({ id: "FootnoteReference", name: "footnote reference", basedOn: "DefaultParagraphFont", semiHidden: true, run: { superScript: true } }, e));
  }
}, pc = class extends mt {
  constructor(e) {
    super(pe({ id: "FootnoteTextChar", name: "Footnote Text Char", basedOn: "DefaultParagraphFont", link: "FootnoteText", semiHidden: true, run: { size: 20 } }, e));
  }
}, mc = class extends Ct {
  constructor(e) {
    super(pe({ id: "EndnoteText", name: "endnote text", link: "EndnoteTextChar", basedOn: "Normal", uiPriority: 99, semiHidden: true, unhideWhenUsed: true, paragraph: { spacing: { after: 0, line: 240, lineRule: ht.AUTO } }, run: { size: 20 } }, e));
  }
}, wc = class extends mt {
  constructor(e) {
    super(pe({ id: "EndnoteReference", name: "endnote reference", basedOn: "DefaultParagraphFont", semiHidden: true, run: { superScript: true } }, e));
  }
}, vc = class extends mt {
  constructor(e) {
    super(pe({ id: "EndnoteTextChar", name: "Endnote Text Char", basedOn: "DefaultParagraphFont", link: "EndnoteText", semiHidden: true, run: { size: 20 } }, e));
  }
}, gc = class extends mt {
  constructor(e) {
    super(pe({ id: "Hyperlink", name: "Hyperlink", basedOn: "DefaultParagraphFont", run: { color: "0563C1", underline: { type: Un.SINGLE } } }, e));
  }
}, lr = class extends te {
  constructor(e) {
    if (super("w:styles"), e.initialStyles && this.root.push(e.initialStyles), e.importedStyles) for (const t of e.importedStyles) this.root.push(t);
    if (e.paragraphStyles) for (const t of e.paragraphStyles) this.root.push(new Ct(t));
    if (e.characterStyles) for (const t of e.characterStyles) this.root.push(new mt(t));
  }
}, yc = class extends te {
  constructor(e) {
    super("w:pPrDefault"), this.root.push(new tt(e));
  }
}, bc = class extends te {
  constructor(e) {
    super("w:rPrDefault"), this.root.push(new Ve(e));
  }
}, _c = class extends te {
  constructor(e) {
    super("w:docDefaults"), Q(this, "runPropertiesDefaults", void 0), Q(this, "paragraphPropertiesDefaults", void 0), this.runPropertiesDefaults = new bc(e.run), this.paragraphPropertiesDefaults = new yc(e.paragraph), this.root.push(this.runPropertiesDefaults), this.root.push(this.paragraphPropertiesDefaults);
  }
}, xc = class {
  newInstance(e) {
    const t = (0, Pn.xml2js)(e, { compact: false });
    let r;
    for (const l of t.elements || []) l.name === "w:styles" && (r = l);
    if (r === void 0) throw new Error("can not find styles element");
    const o = r.elements || [];
    return { initialStyles: new ka(r.attributes), importedStyles: o.map((l) => Cr(l)) };
  }
}, cr = class {
  newInstance(e = {}) {
    var t;
    return { initialStyles: new Zt(["mc", "r", "w", "w14", "w15"], "w14 w15"), importedStyles: [new _c((t = e.document) !== null && t !== void 0 ? t : {}), new nc(pe({ run: { size: 56 } }, e.title)), new ic(pe({ run: { color: "2E74B5", size: 32 } }, e.heading1)), new ac(pe({ run: { color: "2E74B5", size: 26 } }, e.heading2)), new sc(pe({ run: { color: "1F4D78", size: 24 } }, e.heading3)), new oc(pe({ run: { color: "2E74B5", italics: true } }, e.heading4)), new uc(pe({ run: { color: "2E74B5" } }, e.heading5)), new lc(pe({ run: { color: "1F4D78" } }, e.heading6)), new cc(pe({ run: { bold: true } }, e.strong)), new hc(e.listParagraph || {}), new gc(e.hyperlink || {}), new dc(e.footnoteReference || {}), new fc(e.footnoteText || {}), new pc(e.footnoteTextChar || {}), new wc(e.endnoteReference || {}), new mc(e.endnoteText || {}), new vc(e.endnoteTextChar || {})] };
  }
}, nh = class {
  constructor(e) {
    var t, r, o, l, s, u, a, d, T, E, g, N;
    if (Q(this, "currentRelationshipId", 1), Q(this, "documentWrapper", void 0), Q(this, "headers", []), Q(this, "footers", []), Q(this, "coreProperties", void 0), Q(this, "numbering", void 0), Q(this, "media", void 0), Q(this, "fileRelationships", void 0), Q(this, "footnotesWrapper", void 0), Q(this, "endnotesWrapper", void 0), Q(this, "settings", void 0), Q(this, "contentTypes", void 0), Q(this, "customProperties", void 0), Q(this, "appProperties", void 0), Q(this, "styles", void 0), Q(this, "comments", void 0), Q(this, "commentsExtended", void 0), Q(this, "fontWrapper", void 0), this.coreProperties = new Ku(pe(pe({}, e), {}, { creator: (t = e.creator) !== null && t !== void 0 ? t : "Un-named", revision: (r = e.revision) !== null && r !== void 0 ? r : 1, lastModifiedBy: (o = e.lastModifiedBy) !== null && o !== void 0 ? o : "Un-named" })), this.numbering = new Xl(e.numbering ? e.numbering : { config: [] }), this.comments = new Ao((l = e.comments) !== null && l !== void 0 ? l : { children: [] }), this.comments.ThreadData && (this.commentsExtended = new Io(this.comments.ThreadData)), this.fileRelationships = new Xe(), this.customProperties = new Zu((s = e.customProperties) !== null && s !== void 0 ? s : []), this.appProperties = new zu(), this.footnotesWrapper = new Rl(), this.endnotesWrapper = new yl(), this.contentTypes = new Hu(), this.documentWrapper = new fl({ background: e.background }), this.settings = new Ql({ compatibilityModeVersion: e.compatabilityModeVersion, compatibility: e.compatibility, evenAndOddHeaders: !!e.evenAndOddHeaderAndFooters, trackRevisions: (u = e.features) === null || u === void 0 ? void 0 : u.trackRevisions, updateFields: (a = e.features) === null || a === void 0 ? void 0 : a.updateFields, defaultTabStop: e.defaultTabStop, hyphenation: { autoHyphenation: (d = e.hyphenation) === null || d === void 0 ? void 0 : d.autoHyphenation, hyphenationZone: (T = e.hyphenation) === null || T === void 0 ? void 0 : T.hyphenationZone, consecutiveHyphenLimit: (E = e.hyphenation) === null || E === void 0 ? void 0 : E.consecutiveHyphenLimit, doNotHyphenateCaps: (g = e.hyphenation) === null || g === void 0 ? void 0 : g.doNotHyphenateCaps } }), this.media = new Ol(), e.externalStyles !== void 0) {
      var w;
      const m = new cr().newInstance((w = e.styles) === null || w === void 0 ? void 0 : w.default), v = new xc().newInstance(e.externalStyles);
      this.styles = new lr(pe(pe({}, v), {}, { importedStyles: [...m.importedStyles, ...v.importedStyles] }));
    } else if (e.styles) {
      const m = new cr().newInstance(e.styles.default);
      this.styles = new lr(pe(pe({}, m), e.styles));
    } else {
      const m = new cr();
      this.styles = new lr(m.newInstance());
    }
    this.addDefaultRelationships();
    for (const m of e.sections) this.addSection(m);
    if (e.footnotes) for (const m in e.footnotes) this.footnotesWrapper.View.createFootNote(parseFloat(m), e.footnotes[m].children);
    if (e.endnotes) for (const m in e.endnotes) this.endnotesWrapper.View.createEndnote(parseFloat(m), e.endnotes[m].children);
    this.fontWrapper = new ri((N = e.fonts) !== null && N !== void 0 ? N : []);
  }
  addSection({ headers: e = {}, footers: t = {}, children: r, properties: o }) {
    this.documentWrapper.View.Body.addSection(pe(pe({}, o), {}, { headerWrapperGroup: { default: e.default ? this.createHeader(e.default) : void 0, first: e.first ? this.createHeader(e.first) : void 0, even: e.even ? this.createHeader(e.even) : void 0 }, footerWrapperGroup: { default: t.default ? this.createFooter(t.default) : void 0, first: t.first ? this.createFooter(t.first) : void 0, even: t.even ? this.createFooter(t.even) : void 0 } }));
    for (const l of r) this.documentWrapper.View.add(l);
  }
  createHeader(e) {
    const t = new Nl(this.media, this.currentRelationshipId++);
    for (const r of e.options.children) t.add(r);
    return this.addHeaderToDocument(t), t;
  }
  createFooter(e) {
    const t = new xl(this.media, this.currentRelationshipId++);
    for (const r of e.options.children) t.add(r);
    return this.addFooterToDocument(t), t;
  }
  addHeaderToDocument(e, t = st.DEFAULT) {
    this.headers.push({ header: e, type: t }), this.documentWrapper.Relationships.addRelationship(e.View.ReferenceId, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/header", `header${this.headers.length}.xml`), this.contentTypes.addHeader(this.headers.length);
  }
  addFooterToDocument(e, t = st.DEFAULT) {
    this.footers.push({ footer: e, type: t }), this.documentWrapper.Relationships.addRelationship(e.View.ReferenceId, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/footer", `footer${this.footers.length}.xml`), this.contentTypes.addFooter(this.footers.length);
  }
  addDefaultRelationships() {
    this.fileRelationships.addRelationship(1, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument", "word/document.xml"), this.fileRelationships.addRelationship(2, "http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties", "docProps/core.xml"), this.fileRelationships.addRelationship(3, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties", "docProps/app.xml"), this.fileRelationships.addRelationship(4, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/custom-properties", "docProps/custom.xml"), this.documentWrapper.Relationships.addRelationship(this.currentRelationshipId++, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles", "styles.xml"), this.documentWrapper.Relationships.addRelationship(this.currentRelationshipId++, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering", "numbering.xml"), this.documentWrapper.Relationships.addRelationship(this.currentRelationshipId++, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/footnotes", "footnotes.xml"), this.documentWrapper.Relationships.addRelationship(this.currentRelationshipId++, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/endnotes", "endnotes.xml"), this.documentWrapper.Relationships.addRelationship(this.currentRelationshipId++, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/settings", "settings.xml"), this.documentWrapper.Relationships.addRelationship(this.currentRelationshipId++, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/comments", "comments.xml"), this.commentsExtended && (this.documentWrapper.Relationships.addRelationship(this.currentRelationshipId++, "http://schemas.microsoft.com/office/2011/relationships/commentsExtended", "commentsExtended.xml"), this.contentTypes.addCommentsExtended());
  }
  get Document() {
    return this.documentWrapper;
  }
  get Styles() {
    return this.styles;
  }
  get CoreProperties() {
    return this.coreProperties;
  }
  get Numbering() {
    return this.numbering;
  }
  get Media() {
    return this.media;
  }
  get FileRelationships() {
    return this.fileRelationships;
  }
  get Headers() {
    return this.headers.map((e) => e.header);
  }
  get Footers() {
    return this.footers.map((e) => e.footer);
  }
  get ContentTypes() {
    return this.contentTypes;
  }
  get CustomProperties() {
    return this.customProperties;
  }
  get AppProperties() {
    return this.appProperties;
  }
  get FootNotes() {
    return this.footnotesWrapper;
  }
  get Endnotes() {
    return this.endnotesWrapper;
  }
  get Settings() {
    return this.settings;
  }
  get Comments() {
    return this.comments;
  }
  get CommentsExtended() {
    return this.commentsExtended;
  }
  get FontTable() {
    return this.fontWrapper;
  }
}, Ec = class extends te {
  constructor() {
    super("w:sdtContent");
  }
}, Sc = class extends te {
  constructor(e) {
    super("w:sdtPr"), e && this.root.push(new He("w:alias", e));
  }
}, Tc = class extends we {
  constructor(...e) {
    super(...e), Q(this, "xmlKeys", { id: "w:id" });
  }
}, Ac = class extends te {
  constructor(e) {
    super("w:footnoteReference"), this.root.push(new Tc({ id: e }));
  }
}, ih = class extends $e {
  constructor(e) {
    super({ style: "FootnoteReference" }), this.root.push(new Ac(e));
  }
}, sn = class extends we {
  constructor(...e) {
    super(...e), Q(this, "xmlKeys", { val: "w14:val", symbolfont: "w14:font" });
  }
}, hr = class extends te {
  constructor(e, t, r) {
    super(e), r ? this.root.push(new sn({ val: Ra(t), symbolfont: r })) : this.root.push(new sn({ val: t }));
  }
}, kc = class extends te {
  constructor(e) {
    var t, r, o, l, s, u, a, d;
    super("w14:checkbox"), Q(this, "DEFAULT_UNCHECKED_SYMBOL", "2610"), Q(this, "DEFAULT_CHECKED_SYMBOL", "2612"), Q(this, "DEFAULT_FONT", "MS Gothic");
    const T = (e == null ? void 0 : e.checked) ? "1" : "0";
    let E, g;
    this.root.push(new hr("w14:checked", T)), E = !(e == null || (t = e.checkedState) === null || t === void 0) && t.value ? e == null || (r = e.checkedState) === null || r === void 0 ? void 0 : r.value : this.DEFAULT_CHECKED_SYMBOL, g = !(e == null || (o = e.checkedState) === null || o === void 0) && o.font ? e == null || (l = e.checkedState) === null || l === void 0 ? void 0 : l.font : this.DEFAULT_FONT, this.root.push(new hr("w14:checkedState", E, g)), E = !(e == null || (s = e.uncheckedState) === null || s === void 0) && s.value ? e == null || (u = e.uncheckedState) === null || u === void 0 ? void 0 : u.value : this.DEFAULT_UNCHECKED_SYMBOL, g = !(e == null || (a = e.uncheckedState) === null || a === void 0) && a.font ? e == null || (d = e.uncheckedState) === null || d === void 0 ? void 0 : d.font : this.DEFAULT_FONT, this.root.push(new hr("w14:uncheckedState", E, g));
  }
}, ah = class extends te {
  constructor(e) {
    var t, r, o, l;
    super("w:sdt"), Q(this, "DEFAULT_UNCHECKED_SYMBOL", "2610"), Q(this, "DEFAULT_CHECKED_SYMBOL", "2612"), Q(this, "DEFAULT_FONT", "MS Gothic");
    const s = new Sc(e == null ? void 0 : e.alias);
    s.addChildElement(new kc(e)), this.root.push(s);
    const u = new Ec(), a = e == null || (t = e.checkedState) === null || t === void 0 ? void 0 : t.font, d = e == null || (r = e.checkedState) === null || r === void 0 ? void 0 : r.value, T = e == null || (o = e.uncheckedState) === null || o === void 0 ? void 0 : o.font, E = e == null || (l = e.uncheckedState) === null || l === void 0 ? void 0 : l.value;
    let g, N;
    (e == null ? void 0 : e.checked) ? (g = a || this.DEFAULT_FONT, N = d || this.DEFAULT_CHECKED_SYMBOL) : (g = T || this.DEFAULT_FONT, N = E || this.DEFAULT_UNCHECKED_SYMBOL);
    const w = new is({ char: N, symbolfont: g });
    u.addChildElement(w), this.root.push(u);
  }
}, Rc = ce(((e, t) => {
  ft(), qe();
  /*!
  
  JSZip v3.10.1 - A JavaScript class for generating and reading zip files
  <http://stuartk.com/jszip>
  
  (c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
  Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/main/LICENSE.markdown.
  
  JSZip uses the library pako released under the MIT license :
  https://github.com/nodeca/pako/blob/main/LICENSE
  */
  (function(r) {
    typeof e == "object" && typeof t < "u" ? t.exports = r() : typeof define == "function" && define.amd ? define([], r) : (typeof window < "u" ? window : typeof ke < "u" ? ke : typeof self < "u" ? self : this).JSZip = r();
  })(function() {
    return (function r(o, l, s) {
      function u(T, E) {
        if (!l[T]) {
          if (!o[T]) {
            var g = typeof Ot == "function" && Ot;
            if (!E && g) return g(T, true);
            if (a) return a(T, true);
            var N = new Error("Cannot find module '" + T + "'");
            throw N.code = "MODULE_NOT_FOUND", N;
          }
          var w = l[T] = { exports: {} };
          o[T][0].call(w.exports, function(m) {
            var v = o[T][1][m];
            return u(v || m);
          }, w, w.exports, r, o, l, s);
        }
        return l[T].exports;
      }
      for (var a = typeof Ot == "function" && Ot, d = 0; d < s.length; d++) u(s[d]);
      return u;
    })({ 1: [function(r, o, l) {
      var s = r("./utils"), u = r("./support"), a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      l.encode = function(d) {
        for (var T, E, g, N, w, m, v, k = [], I = 0, y = d.length, x = y, A = s.getTypeOf(d) !== "string"; I < d.length; ) x = y - I, g = A ? (T = d[I++], E = I < y ? d[I++] : 0, I < y ? d[I++] : 0) : (T = d.charCodeAt(I++), E = I < y ? d.charCodeAt(I++) : 0, I < y ? d.charCodeAt(I++) : 0), N = T >> 2, w = (3 & T) << 4 | E >> 4, m = 1 < x ? (15 & E) << 2 | g >> 6 : 64, v = 2 < x ? 63 & g : 64, k.push(a.charAt(N) + a.charAt(w) + a.charAt(m) + a.charAt(v));
        return k.join("");
      }, l.decode = function(d) {
        var T, E, g, N, w, m, v = 0, k = 0, I = "data:";
        if (d.substr(0, I.length) === I) throw new Error("Invalid base64 input, it looks like a data url.");
        var y, x = 3 * (d = d.replace(/[^A-Za-z0-9+/=]/g, "")).length / 4;
        if (d.charAt(d.length - 1) === a.charAt(64) && x--, d.charAt(d.length - 2) === a.charAt(64) && x--, x % 1 != 0) throw new Error("Invalid base64 input, bad content length.");
        for (y = u.uint8array ? new Uint8Array(0 | x) : new Array(0 | x); v < d.length; ) T = a.indexOf(d.charAt(v++)) << 2 | (N = a.indexOf(d.charAt(v++))) >> 4, E = (15 & N) << 4 | (w = a.indexOf(d.charAt(v++))) >> 2, g = (3 & w) << 6 | (m = a.indexOf(d.charAt(v++))), y[k++] = T, w !== 64 && (y[k++] = E), m !== 64 && (y[k++] = g);
        return y;
      };
    }, { "./support": 30, "./utils": 32 }], 2: [function(r, o, l) {
      var s = r("./external"), u = r("./stream/DataWorker"), a = r("./stream/Crc32Probe"), d = r("./stream/DataLengthProbe");
      function T(E, g, N, w, m) {
        this.compressedSize = E, this.uncompressedSize = g, this.crc32 = N, this.compression = w, this.compressedContent = m;
      }
      T.prototype = { getContentWorker: function() {
        var E = new u(s.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new d("data_length")), g = this;
        return E.on("end", function() {
          if (this.streamInfo.data_length !== g.uncompressedSize) throw new Error("Bug : uncompressed data size mismatch");
        }), E;
      }, getCompressedWorker: function() {
        return new u(s.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression);
      } }, T.createWorkerFrom = function(E, g, N) {
        return E.pipe(new a()).pipe(new d("uncompressedSize")).pipe(g.compressWorker(N)).pipe(new d("compressedSize")).withStreamInfo("compression", g);
      }, o.exports = T;
    }, { "./external": 6, "./stream/Crc32Probe": 25, "./stream/DataLengthProbe": 26, "./stream/DataWorker": 27 }], 3: [function(r, o, l) {
      var s = r("./stream/GenericWorker");
      l.STORE = { magic: "\0\0", compressWorker: function() {
        return new s("STORE compression");
      }, uncompressWorker: function() {
        return new s("STORE decompression");
      } }, l.DEFLATE = r("./flate");
    }, { "./flate": 7, "./stream/GenericWorker": 28 }], 4: [function(r, o, l) {
      var s = r("./utils"), u = (function() {
        for (var a, d = [], T = 0; T < 256; T++) {
          a = T;
          for (var E = 0; E < 8; E++) a = 1 & a ? 3988292384 ^ a >>> 1 : a >>> 1;
          d[T] = a;
        }
        return d;
      })();
      o.exports = function(a, d) {
        return a !== void 0 && a.length ? s.getTypeOf(a) !== "string" ? (function(T, E, g, N) {
          var w = u, m = N + g;
          T ^= -1;
          for (var v = N; v < m; v++) T = T >>> 8 ^ w[255 & (T ^ E[v])];
          return -1 ^ T;
        })(0 | d, a, a.length, 0) : (function(T, E, g, N) {
          var w = u, m = N + g;
          T ^= -1;
          for (var v = N; v < m; v++) T = T >>> 8 ^ w[255 & (T ^ E.charCodeAt(v))];
          return -1 ^ T;
        })(0 | d, a, a.length, 0) : 0;
      };
    }, { "./utils": 32 }], 5: [function(r, o, l) {
      l.base64 = false, l.binary = false, l.dir = false, l.createFolders = true, l.date = null, l.compression = null, l.compressionOptions = null, l.comment = null, l.unixPermissions = null, l.dosPermissions = null;
    }, {}], 6: [function(r, o, l) {
      var s = null;
      s = typeof Promise < "u" ? Promise : r("lie"), o.exports = { Promise: s };
    }, { lie: 37 }], 7: [function(r, o, l) {
      var s = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Uint32Array < "u", u = r("pako"), a = r("./utils"), d = r("./stream/GenericWorker"), T = s ? "uint8array" : "array";
      function E(g, N) {
        d.call(this, "FlateWorker/" + g), this._pako = null, this._pakoAction = g, this._pakoOptions = N, this.meta = {};
      }
      l.magic = "\b\0", a.inherits(E, d), E.prototype.processChunk = function(g) {
        this.meta = g.meta, this._pako === null && this._createPako(), this._pako.push(a.transformTo(T, g.data), false);
      }, E.prototype.flush = function() {
        d.prototype.flush.call(this), this._pako === null && this._createPako(), this._pako.push([], true);
      }, E.prototype.cleanUp = function() {
        d.prototype.cleanUp.call(this), this._pako = null;
      }, E.prototype._createPako = function() {
        this._pako = new u[this._pakoAction]({ raw: true, level: this._pakoOptions.level || -1 });
        var g = this;
        this._pako.onData = function(N) {
          g.push({ data: N, meta: g.meta });
        };
      }, l.compressWorker = function(g) {
        return new E("Deflate", g);
      }, l.uncompressWorker = function() {
        return new E("Inflate", {});
      };
    }, { "./stream/GenericWorker": 28, "./utils": 32, pako: 38 }], 8: [function(r, o, l) {
      function s(w, m) {
        var v, k = "";
        for (v = 0; v < m; v++) k += String.fromCharCode(255 & w), w >>>= 8;
        return k;
      }
      function u(w, m, v, k, I, y) {
        var x, A, _ = w.file, p = w.compression, P = y !== T.utf8encode, U = a.transformTo("string", y(_.name)), C = a.transformTo("string", T.utf8encode(_.name)), q = _.comment, ee = a.transformTo("string", y(q)), O = a.transformTo("string", T.utf8encode(q)), W = C.length !== _.name.length, S = O.length !== q.length, H = "", J = "", $ = "", oe = _.dir, Z = _.date, re = { crc32: 0, compressedSize: 0, uncompressedSize: 0 };
        m && !v || (re.crc32 = w.crc32, re.compressedSize = w.compressedSize, re.uncompressedSize = w.uncompressedSize);
        var V = 0;
        m && (V |= 8), P || !W && !S || (V |= 2048);
        var F = 0, X = 0;
        oe && (F |= 16), I === "UNIX" ? (X = 798, F |= (function(ne, de) {
          var b = ne;
          return ne || (b = de ? 16893 : 33204), (65535 & b) << 16;
        })(_.unixPermissions, oe)) : (X = 20, F |= (function(ne) {
          return 63 & (ne || 0);
        })(_.dosPermissions)), x = Z.getUTCHours(), x <<= 6, x |= Z.getUTCMinutes(), x <<= 5, x |= Z.getUTCSeconds() / 2, A = Z.getUTCFullYear() - 1980, A <<= 4, A |= Z.getUTCMonth() + 1, A <<= 5, A |= Z.getUTCDate(), W && (J = s(1, 1) + s(E(U), 4) + C, H += "up" + s(J.length, 2) + J), S && ($ = s(1, 1) + s(E(ee), 4) + O, H += "uc" + s($.length, 2) + $);
        var Y = "";
        return Y += `
\0`, Y += s(V, 2), Y += p.magic, Y += s(x, 2), Y += s(A, 2), Y += s(re.crc32, 4), Y += s(re.compressedSize, 4), Y += s(re.uncompressedSize, 4), Y += s(U.length, 2), Y += s(H.length, 2), { fileRecord: g.LOCAL_FILE_HEADER + Y + U + H, dirRecord: g.CENTRAL_FILE_HEADER + s(X, 2) + Y + s(ee.length, 2) + "\0\0\0\0" + s(F, 4) + s(k, 4) + U + H + ee };
      }
      var a = r("../utils"), d = r("../stream/GenericWorker"), T = r("../utf8"), E = r("../crc32"), g = r("../signature");
      function N(w, m, v, k) {
        d.call(this, "ZipFileWorker"), this.bytesWritten = 0, this.zipComment = m, this.zipPlatform = v, this.encodeFileName = k, this.streamFiles = w, this.accumulate = false, this.contentBuffer = [], this.dirRecords = [], this.currentSourceOffset = 0, this.entriesCount = 0, this.currentFile = null, this._sources = [];
      }
      a.inherits(N, d), N.prototype.push = function(w) {
        var m = w.meta.percent || 0, v = this.entriesCount, k = this._sources.length;
        this.accumulate ? this.contentBuffer.push(w) : (this.bytesWritten += w.data.length, d.prototype.push.call(this, { data: w.data, meta: { currentFile: this.currentFile, percent: v ? (m + 100 * (v - k - 1)) / v : 100 } }));
      }, N.prototype.openedSource = function(w) {
        this.currentSourceOffset = this.bytesWritten, this.currentFile = w.file.name;
        var m = this.streamFiles && !w.file.dir;
        if (m) {
          var v = u(w, m, false, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
          this.push({ data: v.fileRecord, meta: { percent: 0 } });
        } else this.accumulate = true;
      }, N.prototype.closedSource = function(w) {
        this.accumulate = false;
        var m = this.streamFiles && !w.file.dir, v = u(w, m, true, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
        if (this.dirRecords.push(v.dirRecord), m) this.push({ data: (function(k) {
          return g.DATA_DESCRIPTOR + s(k.crc32, 4) + s(k.compressedSize, 4) + s(k.uncompressedSize, 4);
        })(w), meta: { percent: 100 } });
        else for (this.push({ data: v.fileRecord, meta: { percent: 0 } }); this.contentBuffer.length; ) this.push(this.contentBuffer.shift());
        this.currentFile = null;
      }, N.prototype.flush = function() {
        for (var w = this.bytesWritten, m = 0; m < this.dirRecords.length; m++) this.push({ data: this.dirRecords[m], meta: { percent: 100 } });
        var v = this.bytesWritten - w, k = (function(I, y, x, A, _) {
          var p = a.transformTo("string", _(A));
          return g.CENTRAL_DIRECTORY_END + "\0\0\0\0" + s(I, 2) + s(I, 2) + s(y, 4) + s(x, 4) + s(p.length, 2) + p;
        })(this.dirRecords.length, v, w, this.zipComment, this.encodeFileName);
        this.push({ data: k, meta: { percent: 100 } });
      }, N.prototype.prepareNextSource = function() {
        this.previous = this._sources.shift(), this.openedSource(this.previous.streamInfo), this.isPaused ? this.previous.pause() : this.previous.resume();
      }, N.prototype.registerPrevious = function(w) {
        this._sources.push(w);
        var m = this;
        return w.on("data", function(v) {
          m.processChunk(v);
        }), w.on("end", function() {
          m.closedSource(m.previous.streamInfo), m._sources.length ? m.prepareNextSource() : m.end();
        }), w.on("error", function(v) {
          m.error(v);
        }), this;
      }, N.prototype.resume = function() {
        return !!d.prototype.resume.call(this) && (!this.previous && this._sources.length ? (this.prepareNextSource(), true) : this.previous || this._sources.length || this.generatedError ? void 0 : (this.end(), true));
      }, N.prototype.error = function(w) {
        var m = this._sources;
        if (!d.prototype.error.call(this, w)) return false;
        for (var v = 0; v < m.length; v++) try {
          m[v].error(w);
        } catch {
        }
        return true;
      }, N.prototype.lock = function() {
        d.prototype.lock.call(this);
        for (var w = this._sources, m = 0; m < w.length; m++) w[m].lock();
      }, o.exports = N;
    }, { "../crc32": 4, "../signature": 23, "../stream/GenericWorker": 28, "../utf8": 31, "../utils": 32 }], 9: [function(r, o, l) {
      var s = r("../compressions"), u = r("./ZipFileWorker");
      l.generateWorker = function(a, d, T) {
        var E = new u(d.streamFiles, T, d.platform, d.encodeFileName), g = 0;
        try {
          a.forEach(function(N, w) {
            g++;
            var m = (function(y, x) {
              var A = y || x, _ = s[A];
              if (!_) throw new Error(A + " is not a valid compression method !");
              return _;
            })(w.options.compression, d.compression), v = w.options.compressionOptions || d.compressionOptions || {}, k = w.dir, I = w.date;
            w._compressWorker(m, v).withStreamInfo("file", { name: N, dir: k, date: I, comment: w.comment || "", unixPermissions: w.unixPermissions, dosPermissions: w.dosPermissions }).pipe(E);
          }), E.entriesCount = g;
        } catch (N) {
          E.error(N);
        }
        return E;
      };
    }, { "../compressions": 3, "./ZipFileWorker": 8 }], 10: [function(r, o, l) {
      function s() {
        if (!(this instanceof s)) return new s();
        if (arguments.length) throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
        this.files = /* @__PURE__ */ Object.create(null), this.comment = null, this.root = "", this.clone = function() {
          var u = new s();
          for (var a in this) typeof this[a] != "function" && (u[a] = this[a]);
          return u;
        };
      }
      (s.prototype = r("./object")).loadAsync = r("./load"), s.support = r("./support"), s.defaults = r("./defaults"), s.version = "3.10.1", s.loadAsync = function(u, a) {
        return new s().loadAsync(u, a);
      }, s.external = r("./external"), o.exports = s;
    }, { "./defaults": 5, "./external": 6, "./load": 11, "./object": 15, "./support": 30 }], 11: [function(r, o, l) {
      var s = r("./utils"), u = r("./external"), a = r("./utf8"), d = r("./zipEntries"), T = r("./stream/Crc32Probe"), E = r("./nodejsUtils");
      function g(N) {
        return new u.Promise(function(w, m) {
          var v = N.decompressed.getContentWorker().pipe(new T());
          v.on("error", function(k) {
            m(k);
          }).on("end", function() {
            v.streamInfo.crc32 !== N.decompressed.crc32 ? m(new Error("Corrupted zip : CRC32 mismatch")) : w();
          }).resume();
        });
      }
      o.exports = function(N, w) {
        var m = this;
        return w = s.extend(w || {}, { base64: false, checkCRC32: false, optimizedBinaryString: false, createFolders: false, decodeFileName: a.utf8decode }), E.isNode && E.isStream(N) ? u.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")) : s.prepareContent("the loaded zip file", N, true, w.optimizedBinaryString, w.base64).then(function(v) {
          var k = new d(w);
          return k.load(v), k;
        }).then(function(v) {
          var k = [u.Promise.resolve(v)], I = v.files;
          if (w.checkCRC32) for (var y = 0; y < I.length; y++) k.push(g(I[y]));
          return u.Promise.all(k);
        }).then(function(v) {
          for (var k = v.shift(), I = k.files, y = 0; y < I.length; y++) {
            var x = I[y], A = x.fileNameStr, _ = s.resolve(x.fileNameStr);
            m.file(_, x.decompressed, { binary: true, optimizedBinaryString: true, date: x.date, dir: x.dir, comment: x.fileCommentStr.length ? x.fileCommentStr : null, unixPermissions: x.unixPermissions, dosPermissions: x.dosPermissions, createFolders: w.createFolders }), x.dir || (m.file(_).unsafeOriginalName = A);
          }
          return k.zipComment.length && (m.comment = k.zipComment), m;
        });
      };
    }, { "./external": 6, "./nodejsUtils": 14, "./stream/Crc32Probe": 25, "./utf8": 31, "./utils": 32, "./zipEntries": 33 }], 12: [function(r, o, l) {
      var s = r("../utils"), u = r("../stream/GenericWorker");
      function a(d, T) {
        u.call(this, "Nodejs stream input adapter for " + d), this._upstreamEnded = false, this._bindStream(T);
      }
      s.inherits(a, u), a.prototype._bindStream = function(d) {
        var T = this;
        (this._stream = d).pause(), d.on("data", function(E) {
          T.push({ data: E, meta: { percent: 0 } });
        }).on("error", function(E) {
          T.isPaused ? this.generatedError = E : T.error(E);
        }).on("end", function() {
          T.isPaused ? T._upstreamEnded = true : T.end();
        });
      }, a.prototype.pause = function() {
        return !!u.prototype.pause.call(this) && (this._stream.pause(), true);
      }, a.prototype.resume = function() {
        return !!u.prototype.resume.call(this) && (this._upstreamEnded ? this.end() : this._stream.resume(), true);
      }, o.exports = a;
    }, { "../stream/GenericWorker": 28, "../utils": 32 }], 13: [function(r, o, l) {
      var s = r("readable-stream").Readable;
      function u(a, d, T) {
        s.call(this, d), this._helper = a;
        var E = this;
        a.on("data", function(g, N) {
          E.push(g) || E._helper.pause(), T && T(N);
        }).on("error", function(g) {
          E.emit("error", g);
        }).on("end", function() {
          E.push(null);
        });
      }
      r("../utils").inherits(u, s), u.prototype._read = function() {
        this._helper.resume();
      }, o.exports = u;
    }, { "../utils": 32, "readable-stream": 16 }], 14: [function(r, o, l) {
      o.exports = { isNode: typeof Buffer < "u", newBufferFrom: function(s, u) {
        if (Buffer.from && Buffer.from !== Uint8Array.from) return Buffer.from(s, u);
        if (typeof s == "number") throw new Error('The "data" argument must not be a number');
        return new Buffer(s, u);
      }, allocBuffer: function(s) {
        if (Buffer.alloc) return Buffer.alloc(s);
        var u = new Buffer(s);
        return u.fill(0), u;
      }, isBuffer: function(s) {
        return Buffer.isBuffer(s);
      }, isStream: function(s) {
        return s && typeof s.on == "function" && typeof s.pause == "function" && typeof s.resume == "function";
      } };
    }, {}], 15: [function(r, o, l) {
      function s(A, _, p) {
        var P, U = a.getTypeOf(_), C = a.extend(p || {}, E);
        C.date = C.date || /* @__PURE__ */ new Date(), C.compression !== null && (C.compression = C.compression.toUpperCase()), typeof C.unixPermissions == "string" && (C.unixPermissions = parseInt(C.unixPermissions, 8)), C.unixPermissions && 16384 & C.unixPermissions && (C.dir = true), C.dosPermissions && 16 & C.dosPermissions && (C.dir = true), C.dir && (A = I(A)), C.createFolders && (P = k(A)) && y.call(this, P, true);
        var q = U === "string" && C.binary === false && C.base64 === false;
        p && p.binary !== void 0 || (C.binary = !q), (_ instanceof g && _.uncompressedSize === 0 || C.dir || !_ || _.length === 0) && (C.base64 = false, C.binary = true, _ = "", C.compression = "STORE", U = "string");
        var ee = null;
        ee = _ instanceof g || _ instanceof d ? _ : m.isNode && m.isStream(_) ? new v(A, _) : a.prepareContent(A, _, C.binary, C.optimizedBinaryString, C.base64);
        var O = new N(A, ee, C);
        this.files[A] = O;
      }
      var u = r("./utf8"), a = r("./utils"), d = r("./stream/GenericWorker"), T = r("./stream/StreamHelper"), E = r("./defaults"), g = r("./compressedObject"), N = r("./zipObject"), w = r("./generate"), m = r("./nodejsUtils"), v = r("./nodejs/NodejsStreamInputAdapter"), k = function(A) {
        A.slice(-1) === "/" && (A = A.substring(0, A.length - 1));
        var _ = A.lastIndexOf("/");
        return 0 < _ ? A.substring(0, _) : "";
      }, I = function(A) {
        return A.slice(-1) !== "/" && (A += "/"), A;
      }, y = function(A, _) {
        return _ = _ !== void 0 ? _ : E.createFolders, A = I(A), this.files[A] || s.call(this, A, null, { dir: true, createFolders: _ }), this.files[A];
      };
      function x(A) {
        return Object.prototype.toString.call(A) === "[object RegExp]";
      }
      o.exports = { load: function() {
        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
      }, forEach: function(A) {
        var _, p, P;
        for (_ in this.files) P = this.files[_], (p = _.slice(this.root.length, _.length)) && _.slice(0, this.root.length) === this.root && A(p, P);
      }, filter: function(A) {
        var _ = [];
        return this.forEach(function(p, P) {
          A(p, P) && _.push(P);
        }), _;
      }, file: function(A, _, p) {
        if (arguments.length !== 1) return A = this.root + A, s.call(this, A, _, p), this;
        if (x(A)) {
          var P = A;
          return this.filter(function(C, q) {
            return !q.dir && P.test(C);
          });
        }
        var U = this.files[this.root + A];
        return U && !U.dir ? U : null;
      }, folder: function(A) {
        if (!A) return this;
        if (x(A)) return this.filter(function(U, C) {
          return C.dir && A.test(U);
        });
        var _ = this.root + A, p = y.call(this, _), P = this.clone();
        return P.root = p.name, P;
      }, remove: function(A) {
        A = this.root + A;
        var _ = this.files[A];
        if (_ || (A.slice(-1) !== "/" && (A += "/"), _ = this.files[A]), _ && !_.dir) delete this.files[A];
        else for (var p = this.filter(function(U, C) {
          return C.name.slice(0, A.length) === A;
        }), P = 0; P < p.length; P++) delete this.files[p[P].name];
        return this;
      }, generate: function() {
        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
      }, generateInternalStream: function(A) {
        var _, p = {};
        try {
          if ((p = a.extend(A || {}, { streamFiles: false, compression: "STORE", compressionOptions: null, type: "", platform: "DOS", comment: null, mimeType: "application/zip", encodeFileName: u.utf8encode })).type = p.type.toLowerCase(), p.compression = p.compression.toUpperCase(), p.type === "binarystring" && (p.type = "string"), !p.type) throw new Error("No output type specified.");
          a.checkSupport(p.type), p.platform !== "darwin" && p.platform !== "freebsd" && p.platform !== "linux" && p.platform !== "sunos" || (p.platform = "UNIX"), p.platform === "win32" && (p.platform = "DOS");
          var P = p.comment || this.comment || "";
          _ = w.generateWorker(this, p, P);
        } catch (U) {
          (_ = new d("error")).error(U);
        }
        return new T(_, p.type || "string", p.mimeType);
      }, generateAsync: function(A, _) {
        return this.generateInternalStream(A).accumulate(_);
      }, generateNodeStream: function(A, _) {
        return (A = A || {}).type || (A.type = "nodebuffer"), this.generateInternalStream(A).toNodejsStream(_);
      } };
    }, { "./compressedObject": 2, "./defaults": 5, "./generate": 9, "./nodejs/NodejsStreamInputAdapter": 12, "./nodejsUtils": 14, "./stream/GenericWorker": 28, "./stream/StreamHelper": 29, "./utf8": 31, "./utils": 32, "./zipObject": 35 }], 16: [function(r, o, l) {
      o.exports = r("stream");
    }, { stream: void 0 }], 17: [function(r, o, l) {
      var s = r("./DataReader");
      function u(a) {
        s.call(this, a);
        for (var d = 0; d < this.data.length; d++) a[d] = 255 & a[d];
      }
      r("../utils").inherits(u, s), u.prototype.byteAt = function(a) {
        return this.data[this.zero + a];
      }, u.prototype.lastIndexOfSignature = function(a) {
        for (var d = a.charCodeAt(0), T = a.charCodeAt(1), E = a.charCodeAt(2), g = a.charCodeAt(3), N = this.length - 4; 0 <= N; --N) if (this.data[N] === d && this.data[N + 1] === T && this.data[N + 2] === E && this.data[N + 3] === g) return N - this.zero;
        return -1;
      }, u.prototype.readAndCheckSignature = function(a) {
        var d = a.charCodeAt(0), T = a.charCodeAt(1), E = a.charCodeAt(2), g = a.charCodeAt(3), N = this.readData(4);
        return d === N[0] && T === N[1] && E === N[2] && g === N[3];
      }, u.prototype.readData = function(a) {
        if (this.checkOffset(a), a === 0) return [];
        var d = this.data.slice(this.zero + this.index, this.zero + this.index + a);
        return this.index += a, d;
      }, o.exports = u;
    }, { "../utils": 32, "./DataReader": 18 }], 18: [function(r, o, l) {
      var s = r("../utils");
      function u(a) {
        this.data = a, this.length = a.length, this.index = 0, this.zero = 0;
      }
      u.prototype = { checkOffset: function(a) {
        this.checkIndex(this.index + a);
      }, checkIndex: function(a) {
        if (this.length < this.zero + a || a < 0) throw new Error("End of data reached (data length = " + this.length + ", asked index = " + a + "). Corrupted zip ?");
      }, setIndex: function(a) {
        this.checkIndex(a), this.index = a;
      }, skip: function(a) {
        this.setIndex(this.index + a);
      }, byteAt: function() {
      }, readInt: function(a) {
        var d, T = 0;
        for (this.checkOffset(a), d = this.index + a - 1; d >= this.index; d--) T = (T << 8) + this.byteAt(d);
        return this.index += a, T;
      }, readString: function(a) {
        return s.transformTo("string", this.readData(a));
      }, readData: function() {
      }, lastIndexOfSignature: function() {
      }, readAndCheckSignature: function() {
      }, readDate: function() {
        var a = this.readInt(4);
        return new Date(Date.UTC(1980 + (a >> 25 & 127), (a >> 21 & 15) - 1, a >> 16 & 31, a >> 11 & 31, a >> 5 & 63, (31 & a) << 1));
      } }, o.exports = u;
    }, { "../utils": 32 }], 19: [function(r, o, l) {
      var s = r("./Uint8ArrayReader");
      function u(a) {
        s.call(this, a);
      }
      r("../utils").inherits(u, s), u.prototype.readData = function(a) {
        this.checkOffset(a);
        var d = this.data.slice(this.zero + this.index, this.zero + this.index + a);
        return this.index += a, d;
      }, o.exports = u;
    }, { "../utils": 32, "./Uint8ArrayReader": 21 }], 20: [function(r, o, l) {
      var s = r("./DataReader");
      function u(a) {
        s.call(this, a);
      }
      r("../utils").inherits(u, s), u.prototype.byteAt = function(a) {
        return this.data.charCodeAt(this.zero + a);
      }, u.prototype.lastIndexOfSignature = function(a) {
        return this.data.lastIndexOf(a) - this.zero;
      }, u.prototype.readAndCheckSignature = function(a) {
        return a === this.readData(4);
      }, u.prototype.readData = function(a) {
        this.checkOffset(a);
        var d = this.data.slice(this.zero + this.index, this.zero + this.index + a);
        return this.index += a, d;
      }, o.exports = u;
    }, { "../utils": 32, "./DataReader": 18 }], 21: [function(r, o, l) {
      var s = r("./ArrayReader");
      function u(a) {
        s.call(this, a);
      }
      r("../utils").inherits(u, s), u.prototype.readData = function(a) {
        if (this.checkOffset(a), a === 0) return new Uint8Array(0);
        var d = this.data.subarray(this.zero + this.index, this.zero + this.index + a);
        return this.index += a, d;
      }, o.exports = u;
    }, { "../utils": 32, "./ArrayReader": 17 }], 22: [function(r, o, l) {
      var s = r("../utils"), u = r("../support"), a = r("./ArrayReader"), d = r("./StringReader"), T = r("./NodeBufferReader"), E = r("./Uint8ArrayReader");
      o.exports = function(g) {
        var N = s.getTypeOf(g);
        return s.checkSupport(N), N !== "string" || u.uint8array ? N === "nodebuffer" ? new T(g) : u.uint8array ? new E(s.transformTo("uint8array", g)) : new a(s.transformTo("array", g)) : new d(g);
      };
    }, { "../support": 30, "../utils": 32, "./ArrayReader": 17, "./NodeBufferReader": 19, "./StringReader": 20, "./Uint8ArrayReader": 21 }], 23: [function(r, o, l) {
      l.LOCAL_FILE_HEADER = "PK", l.CENTRAL_FILE_HEADER = "PK", l.CENTRAL_DIRECTORY_END = "PK", l.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x07", l.ZIP64_CENTRAL_DIRECTORY_END = "PK", l.DATA_DESCRIPTOR = "PK\x07\b";
    }, {}], 24: [function(r, o, l) {
      var s = r("./GenericWorker"), u = r("../utils");
      function a(d) {
        s.call(this, "ConvertWorker to " + d), this.destType = d;
      }
      u.inherits(a, s), a.prototype.processChunk = function(d) {
        this.push({ data: u.transformTo(this.destType, d.data), meta: d.meta });
      }, o.exports = a;
    }, { "../utils": 32, "./GenericWorker": 28 }], 25: [function(r, o, l) {
      var s = r("./GenericWorker"), u = r("../crc32");
      function a() {
        s.call(this, "Crc32Probe"), this.withStreamInfo("crc32", 0);
      }
      r("../utils").inherits(a, s), a.prototype.processChunk = function(d) {
        this.streamInfo.crc32 = u(d.data, this.streamInfo.crc32 || 0), this.push(d);
      }, o.exports = a;
    }, { "../crc32": 4, "../utils": 32, "./GenericWorker": 28 }], 26: [function(r, o, l) {
      var s = r("../utils"), u = r("./GenericWorker");
      function a(d) {
        u.call(this, "DataLengthProbe for " + d), this.propName = d, this.withStreamInfo(d, 0);
      }
      s.inherits(a, u), a.prototype.processChunk = function(d) {
        if (d) {
          var T = this.streamInfo[this.propName] || 0;
          this.streamInfo[this.propName] = T + d.data.length;
        }
        u.prototype.processChunk.call(this, d);
      }, o.exports = a;
    }, { "../utils": 32, "./GenericWorker": 28 }], 27: [function(r, o, l) {
      var s = r("../utils"), u = r("./GenericWorker");
      function a(d) {
        u.call(this, "DataWorker");
        var T = this;
        this.dataIsReady = false, this.index = 0, this.max = 0, this.data = null, this.type = "", this._tickScheduled = false, d.then(function(E) {
          T.dataIsReady = true, T.data = E, T.max = E && E.length || 0, T.type = s.getTypeOf(E), T.isPaused || T._tickAndRepeat();
        }, function(E) {
          T.error(E);
        });
      }
      s.inherits(a, u), a.prototype.cleanUp = function() {
        u.prototype.cleanUp.call(this), this.data = null;
      }, a.prototype.resume = function() {
        return !!u.prototype.resume.call(this) && (!this._tickScheduled && this.dataIsReady && (this._tickScheduled = true, s.delay(this._tickAndRepeat, [], this)), true);
      }, a.prototype._tickAndRepeat = function() {
        this._tickScheduled = false, this.isPaused || this.isFinished || (this._tick(), this.isFinished || (s.delay(this._tickAndRepeat, [], this), this._tickScheduled = true));
      }, a.prototype._tick = function() {
        if (this.isPaused || this.isFinished) return false;
        var d = null, T = Math.min(this.max, this.index + 16384);
        if (this.index >= this.max) return this.end();
        switch (this.type) {
          case "string":
            d = this.data.substring(this.index, T);
            break;
          case "uint8array":
            d = this.data.subarray(this.index, T);
            break;
          case "array":
          case "nodebuffer":
            d = this.data.slice(this.index, T);
        }
        return this.index = T, this.push({ data: d, meta: { percent: this.max ? this.index / this.max * 100 : 0 } });
      }, o.exports = a;
    }, { "../utils": 32, "./GenericWorker": 28 }], 28: [function(r, o, l) {
      function s(u) {
        this.name = u || "default", this.streamInfo = {}, this.generatedError = null, this.extraStreamInfo = {}, this.isPaused = true, this.isFinished = false, this.isLocked = false, this._listeners = { data: [], end: [], error: [] }, this.previous = null;
      }
      s.prototype = { push: function(u) {
        this.emit("data", u);
      }, end: function() {
        if (this.isFinished) return false;
        this.flush();
        try {
          this.emit("end"), this.cleanUp(), this.isFinished = true;
        } catch (u) {
          this.emit("error", u);
        }
        return true;
      }, error: function(u) {
        return !this.isFinished && (this.isPaused ? this.generatedError = u : (this.isFinished = true, this.emit("error", u), this.previous && this.previous.error(u), this.cleanUp()), true);
      }, on: function(u, a) {
        return this._listeners[u].push(a), this;
      }, cleanUp: function() {
        this.streamInfo = this.generatedError = this.extraStreamInfo = null, this._listeners = [];
      }, emit: function(u, a) {
        if (this._listeners[u]) for (var d = 0; d < this._listeners[u].length; d++) this._listeners[u][d].call(this, a);
      }, pipe: function(u) {
        return u.registerPrevious(this);
      }, registerPrevious: function(u) {
        if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
        this.streamInfo = u.streamInfo, this.mergeStreamInfo(), this.previous = u;
        var a = this;
        return u.on("data", function(d) {
          a.processChunk(d);
        }), u.on("end", function() {
          a.end();
        }), u.on("error", function(d) {
          a.error(d);
        }), this;
      }, pause: function() {
        return !this.isPaused && !this.isFinished && (this.isPaused = true, this.previous && this.previous.pause(), true);
      }, resume: function() {
        if (!this.isPaused || this.isFinished) return false;
        var u = this.isPaused = false;
        return this.generatedError && (this.error(this.generatedError), u = true), this.previous && this.previous.resume(), !u;
      }, flush: function() {
      }, processChunk: function(u) {
        this.push(u);
      }, withStreamInfo: function(u, a) {
        return this.extraStreamInfo[u] = a, this.mergeStreamInfo(), this;
      }, mergeStreamInfo: function() {
        for (var u in this.extraStreamInfo) Object.prototype.hasOwnProperty.call(this.extraStreamInfo, u) && (this.streamInfo[u] = this.extraStreamInfo[u]);
      }, lock: function() {
        if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
        this.isLocked = true, this.previous && this.previous.lock();
      }, toString: function() {
        var u = "Worker " + this.name;
        return this.previous ? this.previous + " -> " + u : u;
      } }, o.exports = s;
    }, {}], 29: [function(r, o, l) {
      var s = r("../utils"), u = r("./ConvertWorker"), a = r("./GenericWorker"), d = r("../base64"), T = r("../support"), E = r("../external"), g = null;
      if (T.nodestream) try {
        g = r("../nodejs/NodejsStreamOutputAdapter");
      } catch {
      }
      function N(m, v) {
        return new E.Promise(function(k, I) {
          var y = [], x = m._internalType, A = m._outputType, _ = m._mimeType;
          m.on("data", function(p, P) {
            y.push(p), v && v(P);
          }).on("error", function(p) {
            y = [], I(p);
          }).on("end", function() {
            try {
              k((function(p, P, U) {
                switch (p) {
                  case "blob":
                    return s.newBlob(s.transformTo("arraybuffer", P), U);
                  case "base64":
                    return d.encode(P);
                  default:
                    return s.transformTo(p, P);
                }
              })(A, (function(p, P) {
                var U, C = 0, q = null, ee = 0;
                for (U = 0; U < P.length; U++) ee += P[U].length;
                switch (p) {
                  case "string":
                    return P.join("");
                  case "array":
                    return Array.prototype.concat.apply([], P);
                  case "uint8array":
                    for (q = new Uint8Array(ee), U = 0; U < P.length; U++) q.set(P[U], C), C += P[U].length;
                    return q;
                  case "nodebuffer":
                    return Buffer.concat(P);
                  default:
                    throw new Error("concat : unsupported type '" + p + "'");
                }
              })(x, y), _));
            } catch (p) {
              I(p);
            }
            y = [];
          }).resume();
        });
      }
      function w(m, v, k) {
        var I = v;
        switch (v) {
          case "blob":
          case "arraybuffer":
            I = "uint8array";
            break;
          case "base64":
            I = "string";
        }
        try {
          this._internalType = I, this._outputType = v, this._mimeType = k, s.checkSupport(I), this._worker = m.pipe(new u(I)), m.lock();
        } catch (y) {
          this._worker = new a("error"), this._worker.error(y);
        }
      }
      w.prototype = { accumulate: function(m) {
        return N(this, m);
      }, on: function(m, v) {
        var k = this;
        return m === "data" ? this._worker.on(m, function(I) {
          v.call(k, I.data, I.meta);
        }) : this._worker.on(m, function() {
          s.delay(v, arguments, k);
        }), this;
      }, resume: function() {
        return s.delay(this._worker.resume, [], this._worker), this;
      }, pause: function() {
        return this._worker.pause(), this;
      }, toNodejsStream: function(m) {
        if (s.checkSupport("nodestream"), this._outputType !== "nodebuffer") throw new Error(this._outputType + " is not supported by this method");
        return new g(this, { objectMode: this._outputType !== "nodebuffer" }, m);
      } }, o.exports = w;
    }, { "../base64": 1, "../external": 6, "../nodejs/NodejsStreamOutputAdapter": 13, "../support": 30, "../utils": 32, "./ConvertWorker": 24, "./GenericWorker": 28 }], 30: [function(r, o, l) {
      if (l.base64 = true, l.array = true, l.string = true, l.arraybuffer = typeof ArrayBuffer < "u" && typeof Uint8Array < "u", l.nodebuffer = typeof Buffer < "u", l.uint8array = typeof Uint8Array < "u", typeof ArrayBuffer > "u") l.blob = false;
      else {
        var s = new ArrayBuffer(0);
        try {
          l.blob = new Blob([s], { type: "application/zip" }).size === 0;
        } catch {
          try {
            var u = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
            u.append(s), l.blob = u.getBlob("application/zip").size === 0;
          } catch {
            l.blob = false;
          }
        }
      }
      try {
        l.nodestream = !!r("readable-stream").Readable;
      } catch {
        l.nodestream = false;
      }
    }, { "readable-stream": 16 }], 31: [function(r, o, l) {
      for (var s = r("./utils"), u = r("./support"), a = r("./nodejsUtils"), d = r("./stream/GenericWorker"), T = new Array(256), E = 0; E < 256; E++) T[E] = 252 <= E ? 6 : 248 <= E ? 5 : 240 <= E ? 4 : 224 <= E ? 3 : 192 <= E ? 2 : 1;
      T[254] = T[254] = 1;
      function g() {
        d.call(this, "utf-8 decode"), this.leftOver = null;
      }
      function N() {
        d.call(this, "utf-8 encode");
      }
      l.utf8encode = function(w) {
        return u.nodebuffer ? a.newBufferFrom(w, "utf-8") : (function(m) {
          var v, k, I, y, x, A = m.length, _ = 0;
          for (y = 0; y < A; y++) (64512 & (k = m.charCodeAt(y))) == 55296 && y + 1 < A && (64512 & (I = m.charCodeAt(y + 1))) == 56320 && (k = 65536 + (k - 55296 << 10) + (I - 56320), y++), _ += k < 128 ? 1 : k < 2048 ? 2 : k < 65536 ? 3 : 4;
          for (v = u.uint8array ? new Uint8Array(_) : new Array(_), y = x = 0; x < _; y++) (64512 & (k = m.charCodeAt(y))) == 55296 && y + 1 < A && (64512 & (I = m.charCodeAt(y + 1))) == 56320 && (k = 65536 + (k - 55296 << 10) + (I - 56320), y++), k < 128 ? v[x++] = k : (k < 2048 ? v[x++] = 192 | k >>> 6 : (k < 65536 ? v[x++] = 224 | k >>> 12 : (v[x++] = 240 | k >>> 18, v[x++] = 128 | k >>> 12 & 63), v[x++] = 128 | k >>> 6 & 63), v[x++] = 128 | 63 & k);
          return v;
        })(w);
      }, l.utf8decode = function(w) {
        return u.nodebuffer ? s.transformTo("nodebuffer", w).toString("utf-8") : (function(m) {
          var v, k, I, y, x = m.length, A = new Array(2 * x);
          for (v = k = 0; v < x; ) if ((I = m[v++]) < 128) A[k++] = I;
          else if (4 < (y = T[I])) A[k++] = 65533, v += y - 1;
          else {
            for (I &= y === 2 ? 31 : y === 3 ? 15 : 7; 1 < y && v < x; ) I = I << 6 | 63 & m[v++], y--;
            1 < y ? A[k++] = 65533 : I < 65536 ? A[k++] = I : (I -= 65536, A[k++] = 55296 | I >> 10 & 1023, A[k++] = 56320 | 1023 & I);
          }
          return A.length !== k && (A.subarray ? A = A.subarray(0, k) : A.length = k), s.applyFromCharCode(A);
        })(w = s.transformTo(u.uint8array ? "uint8array" : "array", w));
      }, s.inherits(g, d), g.prototype.processChunk = function(w) {
        var m = s.transformTo(u.uint8array ? "uint8array" : "array", w.data);
        if (this.leftOver && this.leftOver.length) {
          if (u.uint8array) {
            var v = m;
            (m = new Uint8Array(v.length + this.leftOver.length)).set(this.leftOver, 0), m.set(v, this.leftOver.length);
          } else m = this.leftOver.concat(m);
          this.leftOver = null;
        }
        var k = (function(y, x) {
          var A;
          for ((x = x || y.length) > y.length && (x = y.length), A = x - 1; 0 <= A && (192 & y[A]) == 128; ) A--;
          return A < 0 || A === 0 ? x : A + T[y[A]] > x ? A : x;
        })(m), I = m;
        k !== m.length && (u.uint8array ? (I = m.subarray(0, k), this.leftOver = m.subarray(k, m.length)) : (I = m.slice(0, k), this.leftOver = m.slice(k, m.length))), this.push({ data: l.utf8decode(I), meta: w.meta });
      }, g.prototype.flush = function() {
        this.leftOver && this.leftOver.length && (this.push({ data: l.utf8decode(this.leftOver), meta: {} }), this.leftOver = null);
      }, l.Utf8DecodeWorker = g, s.inherits(N, d), N.prototype.processChunk = function(w) {
        this.push({ data: l.utf8encode(w.data), meta: w.meta });
      }, l.Utf8EncodeWorker = N;
    }, { "./nodejsUtils": 14, "./stream/GenericWorker": 28, "./support": 30, "./utils": 32 }], 32: [function(r, o, l) {
      var s = r("./support"), u = r("./base64"), a = r("./nodejsUtils"), d = r("./external");
      function T(v) {
        return v;
      }
      function E(v, k) {
        for (var I = 0; I < v.length; ++I) k[I] = 255 & v.charCodeAt(I);
        return k;
      }
      r("setimmediate"), l.newBlob = function(v, k) {
        l.checkSupport("blob");
        try {
          return new Blob([v], { type: k });
        } catch {
          try {
            var I = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
            return I.append(v), I.getBlob(k);
          } catch {
            throw new Error("Bug : can't construct the Blob.");
          }
        }
      };
      var g = { stringifyByChunk: function(v, k, I) {
        var y = [], x = 0, A = v.length;
        if (A <= I) return String.fromCharCode.apply(null, v);
        for (; x < A; ) k === "array" || k === "nodebuffer" ? y.push(String.fromCharCode.apply(null, v.slice(x, Math.min(x + I, A)))) : y.push(String.fromCharCode.apply(null, v.subarray(x, Math.min(x + I, A)))), x += I;
        return y.join("");
      }, stringifyByChar: function(v) {
        for (var k = "", I = 0; I < v.length; I++) k += String.fromCharCode(v[I]);
        return k;
      }, applyCanBeUsed: { uint8array: (function() {
        try {
          return s.uint8array && String.fromCharCode.apply(null, new Uint8Array(1)).length === 1;
        } catch {
          return false;
        }
      })(), nodebuffer: (function() {
        try {
          return s.nodebuffer && String.fromCharCode.apply(null, a.allocBuffer(1)).length === 1;
        } catch {
          return false;
        }
      })() } };
      function N(v) {
        var k = 65536, I = l.getTypeOf(v), y = true;
        if (I === "uint8array" ? y = g.applyCanBeUsed.uint8array : I === "nodebuffer" && (y = g.applyCanBeUsed.nodebuffer), y) for (; 1 < k; ) try {
          return g.stringifyByChunk(v, I, k);
        } catch {
          k = Math.floor(k / 2);
        }
        return g.stringifyByChar(v);
      }
      function w(v, k) {
        for (var I = 0; I < v.length; I++) k[I] = v[I];
        return k;
      }
      l.applyFromCharCode = N;
      var m = {};
      m.string = { string: T, array: function(v) {
        return E(v, new Array(v.length));
      }, arraybuffer: function(v) {
        return m.string.uint8array(v).buffer;
      }, uint8array: function(v) {
        return E(v, new Uint8Array(v.length));
      }, nodebuffer: function(v) {
        return E(v, a.allocBuffer(v.length));
      } }, m.array = { string: N, array: T, arraybuffer: function(v) {
        return new Uint8Array(v).buffer;
      }, uint8array: function(v) {
        return new Uint8Array(v);
      }, nodebuffer: function(v) {
        return a.newBufferFrom(v);
      } }, m.arraybuffer = { string: function(v) {
        return N(new Uint8Array(v));
      }, array: function(v) {
        return w(new Uint8Array(v), new Array(v.byteLength));
      }, arraybuffer: T, uint8array: function(v) {
        return new Uint8Array(v);
      }, nodebuffer: function(v) {
        return a.newBufferFrom(new Uint8Array(v));
      } }, m.uint8array = { string: N, array: function(v) {
        return w(v, new Array(v.length));
      }, arraybuffer: function(v) {
        return v.buffer;
      }, uint8array: T, nodebuffer: function(v) {
        return a.newBufferFrom(v);
      } }, m.nodebuffer = { string: N, array: function(v) {
        return w(v, new Array(v.length));
      }, arraybuffer: function(v) {
        return m.nodebuffer.uint8array(v).buffer;
      }, uint8array: function(v) {
        return w(v, new Uint8Array(v.length));
      }, nodebuffer: T }, l.transformTo = function(v, k) {
        return k = k || "", v ? (l.checkSupport(v), m[l.getTypeOf(k)][v](k)) : k;
      }, l.resolve = function(v) {
        for (var k = v.split("/"), I = [], y = 0; y < k.length; y++) {
          var x = k[y];
          x === "." || x === "" && y !== 0 && y !== k.length - 1 || (x === ".." ? I.pop() : I.push(x));
        }
        return I.join("/");
      }, l.getTypeOf = function(v) {
        return typeof v == "string" ? "string" : Object.prototype.toString.call(v) === "[object Array]" ? "array" : s.nodebuffer && a.isBuffer(v) ? "nodebuffer" : s.uint8array && v instanceof Uint8Array ? "uint8array" : s.arraybuffer && v instanceof ArrayBuffer ? "arraybuffer" : void 0;
      }, l.checkSupport = function(v) {
        if (!s[v.toLowerCase()]) throw new Error(v + " is not supported by this platform");
      }, l.MAX_VALUE_16BITS = 65535, l.MAX_VALUE_32BITS = -1, l.pretty = function(v) {
        var k, I, y = "";
        for (I = 0; I < (v || "").length; I++) y += "\\x" + ((k = v.charCodeAt(I)) < 16 ? "0" : "") + k.toString(16).toUpperCase();
        return y;
      }, l.delay = function(v, k, I) {
        setImmediate(function() {
          v.apply(I || null, k || []);
        });
      }, l.inherits = function(v, k) {
        function I() {
        }
        I.prototype = k.prototype, v.prototype = new I();
      }, l.extend = function() {
        var v, k, I = {};
        for (v = 0; v < arguments.length; v++) for (k in arguments[v]) Object.prototype.hasOwnProperty.call(arguments[v], k) && I[k] === void 0 && (I[k] = arguments[v][k]);
        return I;
      }, l.prepareContent = function(v, k, I, y, x) {
        return d.Promise.resolve(k).then(function(A) {
          return s.blob && (A instanceof Blob || ["[object File]", "[object Blob]"].indexOf(Object.prototype.toString.call(A)) !== -1) && typeof FileReader < "u" ? new d.Promise(function(_, p) {
            var P = new FileReader();
            P.onload = function(U) {
              _(U.target.result);
            }, P.onerror = function(U) {
              p(U.target.error);
            }, P.readAsArrayBuffer(A);
          }) : A;
        }).then(function(A) {
          var _ = l.getTypeOf(A);
          return _ ? (_ === "arraybuffer" ? A = l.transformTo("uint8array", A) : _ === "string" && (x ? A = u.decode(A) : I && y !== true && (A = (function(p) {
            return E(p, s.uint8array ? new Uint8Array(p.length) : new Array(p.length));
          })(A))), A) : d.Promise.reject(new Error("Can't read the data of '" + v + "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"));
        });
      };
    }, { "./base64": 1, "./external": 6, "./nodejsUtils": 14, "./support": 30, setimmediate: 54 }], 33: [function(r, o, l) {
      var s = r("./reader/readerFor"), u = r("./utils"), a = r("./signature"), d = r("./zipEntry"), T = r("./support");
      function E(g) {
        this.files = [], this.loadOptions = g;
      }
      E.prototype = { checkSignature: function(g) {
        if (!this.reader.readAndCheckSignature(g)) {
          this.reader.index -= 4;
          var N = this.reader.readString(4);
          throw new Error("Corrupted zip or bug: unexpected signature (" + u.pretty(N) + ", expected " + u.pretty(g) + ")");
        }
      }, isSignature: function(g, N) {
        var w = this.reader.index;
        this.reader.setIndex(g);
        var m = this.reader.readString(4) === N;
        return this.reader.setIndex(w), m;
      }, readBlockEndOfCentral: function() {
        this.diskNumber = this.reader.readInt(2), this.diskWithCentralDirStart = this.reader.readInt(2), this.centralDirRecordsOnThisDisk = this.reader.readInt(2), this.centralDirRecords = this.reader.readInt(2), this.centralDirSize = this.reader.readInt(4), this.centralDirOffset = this.reader.readInt(4), this.zipCommentLength = this.reader.readInt(2);
        var g = this.reader.readData(this.zipCommentLength), N = T.uint8array ? "uint8array" : "array", w = u.transformTo(N, g);
        this.zipComment = this.loadOptions.decodeFileName(w);
      }, readBlockZip64EndOfCentral: function() {
        this.zip64EndOfCentralSize = this.reader.readInt(8), this.reader.skip(4), this.diskNumber = this.reader.readInt(4), this.diskWithCentralDirStart = this.reader.readInt(4), this.centralDirRecordsOnThisDisk = this.reader.readInt(8), this.centralDirRecords = this.reader.readInt(8), this.centralDirSize = this.reader.readInt(8), this.centralDirOffset = this.reader.readInt(8), this.zip64ExtensibleData = {};
        for (var g, N, w, m = this.zip64EndOfCentralSize - 44; 0 < m; ) g = this.reader.readInt(2), N = this.reader.readInt(4), w = this.reader.readData(N), this.zip64ExtensibleData[g] = { id: g, length: N, value: w };
      }, readBlockZip64EndOfCentralLocator: function() {
        if (this.diskWithZip64CentralDirStart = this.reader.readInt(4), this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8), this.disksCount = this.reader.readInt(4), 1 < this.disksCount) throw new Error("Multi-volumes zip are not supported");
      }, readLocalFiles: function() {
        var g, N;
        for (g = 0; g < this.files.length; g++) N = this.files[g], this.reader.setIndex(N.localHeaderOffset), this.checkSignature(a.LOCAL_FILE_HEADER), N.readLocalPart(this.reader), N.handleUTF8(), N.processAttributes();
      }, readCentralDir: function() {
        var g;
        for (this.reader.setIndex(this.centralDirOffset); this.reader.readAndCheckSignature(a.CENTRAL_FILE_HEADER); ) (g = new d({ zip64: this.zip64 }, this.loadOptions)).readCentralPart(this.reader), this.files.push(g);
        if (this.centralDirRecords !== this.files.length && this.centralDirRecords !== 0 && this.files.length === 0) throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
      }, readEndOfCentral: function() {
        var g = this.reader.lastIndexOfSignature(a.CENTRAL_DIRECTORY_END);
        if (g < 0) throw this.isSignature(0, a.LOCAL_FILE_HEADER) ? new Error("Corrupted zip: can't find end of central directory") : new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");
        this.reader.setIndex(g);
        var N = g;
        if (this.checkSignature(a.CENTRAL_DIRECTORY_END), this.readBlockEndOfCentral(), this.diskNumber === u.MAX_VALUE_16BITS || this.diskWithCentralDirStart === u.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === u.MAX_VALUE_16BITS || this.centralDirRecords === u.MAX_VALUE_16BITS || this.centralDirSize === u.MAX_VALUE_32BITS || this.centralDirOffset === u.MAX_VALUE_32BITS) {
          if (this.zip64 = true, (g = this.reader.lastIndexOfSignature(a.ZIP64_CENTRAL_DIRECTORY_LOCATOR)) < 0) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
          if (this.reader.setIndex(g), this.checkSignature(a.ZIP64_CENTRAL_DIRECTORY_LOCATOR), this.readBlockZip64EndOfCentralLocator(), !this.isSignature(this.relativeOffsetEndOfZip64CentralDir, a.ZIP64_CENTRAL_DIRECTORY_END) && (this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(a.ZIP64_CENTRAL_DIRECTORY_END), this.relativeOffsetEndOfZip64CentralDir < 0)) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
          this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir), this.checkSignature(a.ZIP64_CENTRAL_DIRECTORY_END), this.readBlockZip64EndOfCentral();
        }
        var w = this.centralDirOffset + this.centralDirSize;
        this.zip64 && (w += 20, w += 12 + this.zip64EndOfCentralSize);
        var m = N - w;
        if (0 < m) this.isSignature(N, a.CENTRAL_FILE_HEADER) || (this.reader.zero = m);
        else if (m < 0) throw new Error("Corrupted zip: missing " + Math.abs(m) + " bytes.");
      }, prepareReader: function(g) {
        this.reader = s(g);
      }, load: function(g) {
        this.prepareReader(g), this.readEndOfCentral(), this.readCentralDir(), this.readLocalFiles();
      } }, o.exports = E;
    }, { "./reader/readerFor": 22, "./signature": 23, "./support": 30, "./utils": 32, "./zipEntry": 34 }], 34: [function(r, o, l) {
      var s = r("./reader/readerFor"), u = r("./utils"), a = r("./compressedObject"), d = r("./crc32"), T = r("./utf8"), E = r("./compressions"), g = r("./support");
      function N(w, m) {
        this.options = w, this.loadOptions = m;
      }
      N.prototype = { isEncrypted: function() {
        return (1 & this.bitFlag) == 1;
      }, useUTF8: function() {
        return (2048 & this.bitFlag) == 2048;
      }, readLocalPart: function(w) {
        var m, v;
        if (w.skip(22), this.fileNameLength = w.readInt(2), v = w.readInt(2), this.fileName = w.readData(this.fileNameLength), w.skip(v), this.compressedSize === -1 || this.uncompressedSize === -1) throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");
        if ((m = (function(k) {
          for (var I in E) if (Object.prototype.hasOwnProperty.call(E, I) && E[I].magic === k) return E[I];
          return null;
        })(this.compressionMethod)) === null) throw new Error("Corrupted zip : compression " + u.pretty(this.compressionMethod) + " unknown (inner file : " + u.transformTo("string", this.fileName) + ")");
        this.decompressed = new a(this.compressedSize, this.uncompressedSize, this.crc32, m, w.readData(this.compressedSize));
      }, readCentralPart: function(w) {
        this.versionMadeBy = w.readInt(2), w.skip(2), this.bitFlag = w.readInt(2), this.compressionMethod = w.readString(2), this.date = w.readDate(), this.crc32 = w.readInt(4), this.compressedSize = w.readInt(4), this.uncompressedSize = w.readInt(4);
        var m = w.readInt(2);
        if (this.extraFieldsLength = w.readInt(2), this.fileCommentLength = w.readInt(2), this.diskNumberStart = w.readInt(2), this.internalFileAttributes = w.readInt(2), this.externalFileAttributes = w.readInt(4), this.localHeaderOffset = w.readInt(4), this.isEncrypted()) throw new Error("Encrypted zip are not supported");
        w.skip(m), this.readExtraFields(w), this.parseZIP64ExtraField(w), this.fileComment = w.readData(this.fileCommentLength);
      }, processAttributes: function() {
        this.unixPermissions = null, this.dosPermissions = null;
        var w = this.versionMadeBy >> 8;
        this.dir = !!(16 & this.externalFileAttributes), w == 0 && (this.dosPermissions = 63 & this.externalFileAttributes), w == 3 && (this.unixPermissions = this.externalFileAttributes >> 16 & 65535), this.dir || this.fileNameStr.slice(-1) !== "/" || (this.dir = true);
      }, parseZIP64ExtraField: function() {
        if (this.extraFields[1]) {
          var w = s(this.extraFields[1].value);
          this.uncompressedSize === u.MAX_VALUE_32BITS && (this.uncompressedSize = w.readInt(8)), this.compressedSize === u.MAX_VALUE_32BITS && (this.compressedSize = w.readInt(8)), this.localHeaderOffset === u.MAX_VALUE_32BITS && (this.localHeaderOffset = w.readInt(8)), this.diskNumberStart === u.MAX_VALUE_32BITS && (this.diskNumberStart = w.readInt(4));
        }
      }, readExtraFields: function(w) {
        var m, v, k, I = w.index + this.extraFieldsLength;
        for (this.extraFields || (this.extraFields = {}); w.index + 4 < I; ) m = w.readInt(2), v = w.readInt(2), k = w.readData(v), this.extraFields[m] = { id: m, length: v, value: k };
        w.setIndex(I);
      }, handleUTF8: function() {
        var w = g.uint8array ? "uint8array" : "array";
        if (this.useUTF8()) this.fileNameStr = T.utf8decode(this.fileName), this.fileCommentStr = T.utf8decode(this.fileComment);
        else {
          var m = this.findExtraFieldUnicodePath();
          if (m !== null) this.fileNameStr = m;
          else {
            var v = u.transformTo(w, this.fileName);
            this.fileNameStr = this.loadOptions.decodeFileName(v);
          }
          var k = this.findExtraFieldUnicodeComment();
          if (k !== null) this.fileCommentStr = k;
          else {
            var I = u.transformTo(w, this.fileComment);
            this.fileCommentStr = this.loadOptions.decodeFileName(I);
          }
        }
      }, findExtraFieldUnicodePath: function() {
        var w = this.extraFields[28789];
        if (w) {
          var m = s(w.value);
          return m.readInt(1) !== 1 || d(this.fileName) !== m.readInt(4) ? null : T.utf8decode(m.readData(w.length - 5));
        }
        return null;
      }, findExtraFieldUnicodeComment: function() {
        var w = this.extraFields[25461];
        if (w) {
          var m = s(w.value);
          return m.readInt(1) !== 1 || d(this.fileComment) !== m.readInt(4) ? null : T.utf8decode(m.readData(w.length - 5));
        }
        return null;
      } }, o.exports = N;
    }, { "./compressedObject": 2, "./compressions": 3, "./crc32": 4, "./reader/readerFor": 22, "./support": 30, "./utf8": 31, "./utils": 32 }], 35: [function(r, o, l) {
      function s(m, v, k) {
        this.name = m, this.dir = k.dir, this.date = k.date, this.comment = k.comment, this.unixPermissions = k.unixPermissions, this.dosPermissions = k.dosPermissions, this._data = v, this._dataBinary = k.binary, this.options = { compression: k.compression, compressionOptions: k.compressionOptions };
      }
      var u = r("./stream/StreamHelper"), a = r("./stream/DataWorker"), d = r("./utf8"), T = r("./compressedObject"), E = r("./stream/GenericWorker");
      s.prototype = { internalStream: function(m) {
        var v = null, k = "string";
        try {
          if (!m) throw new Error("No output type specified.");
          var I = (k = m.toLowerCase()) === "string" || k === "text";
          k !== "binarystring" && k !== "text" || (k = "string"), v = this._decompressWorker();
          var y = !this._dataBinary;
          y && !I && (v = v.pipe(new d.Utf8EncodeWorker())), !y && I && (v = v.pipe(new d.Utf8DecodeWorker()));
        } catch (x) {
          (v = new E("error")).error(x);
        }
        return new u(v, k, "");
      }, async: function(m, v) {
        return this.internalStream(m).accumulate(v);
      }, nodeStream: function(m, v) {
        return this.internalStream(m || "nodebuffer").toNodejsStream(v);
      }, _compressWorker: function(m, v) {
        if (this._data instanceof T && this._data.compression.magic === m.magic) return this._data.getCompressedWorker();
        var k = this._decompressWorker();
        return this._dataBinary || (k = k.pipe(new d.Utf8EncodeWorker())), T.createWorkerFrom(k, m, v);
      }, _decompressWorker: function() {
        return this._data instanceof T ? this._data.getContentWorker() : this._data instanceof E ? this._data : new a(this._data);
      } };
      for (var g = ["asText", "asBinary", "asNodeBuffer", "asUint8Array", "asArrayBuffer"], N = function() {
        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
      }, w = 0; w < g.length; w++) s.prototype[g[w]] = N;
      o.exports = s;
    }, { "./compressedObject": 2, "./stream/DataWorker": 27, "./stream/GenericWorker": 28, "./stream/StreamHelper": 29, "./utf8": 31 }], 36: [function(r, o, l) {
      (function(s) {
        var u, a, d = s.MutationObserver || s.WebKitMutationObserver;
        if (d) {
          var T = 0, E = new d(m), g = s.document.createTextNode("");
          E.observe(g, { characterData: true }), u = function() {
            g.data = T = ++T % 2;
          };
        } else if (s.setImmediate || s.MessageChannel === void 0) u = "document" in s && "onreadystatechange" in s.document.createElement("script") ? function() {
          var v = s.document.createElement("script");
          v.onreadystatechange = function() {
            m(), v.onreadystatechange = null, v.parentNode.removeChild(v), v = null;
          }, s.document.documentElement.appendChild(v);
        } : function() {
          setTimeout(m, 0);
        };
        else {
          var N = new s.MessageChannel();
          N.port1.onmessage = m, u = function() {
            N.port2.postMessage(0);
          };
        }
        var w = [];
        function m() {
          var v, k;
          a = true;
          for (var I = w.length; I; ) {
            for (k = w, w = [], v = -1; ++v < I; ) k[v]();
            I = w.length;
          }
          a = false;
        }
        o.exports = function(v) {
          w.push(v) !== 1 || a || u();
        };
      }).call(this, typeof ke < "u" ? ke : typeof self < "u" ? self : typeof window < "u" ? window : {});
    }, {}], 37: [function(r, o, l) {
      var s = r("immediate");
      function u() {
      }
      var a = {}, d = ["REJECTED"], T = ["FULFILLED"], E = ["PENDING"];
      function g(I) {
        if (typeof I != "function") throw new TypeError("resolver must be a function");
        this.state = E, this.queue = [], this.outcome = void 0, I !== u && v(this, I);
      }
      function N(I, y, x) {
        this.promise = I, typeof y == "function" && (this.onFulfilled = y, this.callFulfilled = this.otherCallFulfilled), typeof x == "function" && (this.onRejected = x, this.callRejected = this.otherCallRejected);
      }
      function w(I, y, x) {
        s(function() {
          var A;
          try {
            A = y(x);
          } catch (_) {
            return a.reject(I, _);
          }
          A === I ? a.reject(I, new TypeError("Cannot resolve promise with itself")) : a.resolve(I, A);
        });
      }
      function m(I) {
        var y = I && I.then;
        if (I && (typeof I == "object" || typeof I == "function") && typeof y == "function") return function() {
          y.apply(I, arguments);
        };
      }
      function v(I, y) {
        var x = false;
        function A(P) {
          x || (x = true, a.reject(I, P));
        }
        function _(P) {
          x || (x = true, a.resolve(I, P));
        }
        var p = k(function() {
          y(_, A);
        });
        p.status === "error" && A(p.value);
      }
      function k(I, y) {
        var x = {};
        try {
          x.value = I(y), x.status = "success";
        } catch (A) {
          x.status = "error", x.value = A;
        }
        return x;
      }
      (o.exports = g).prototype.finally = function(I) {
        if (typeof I != "function") return this;
        var y = this.constructor;
        return this.then(function(x) {
          return y.resolve(I()).then(function() {
            return x;
          });
        }, function(x) {
          return y.resolve(I()).then(function() {
            throw x;
          });
        });
      }, g.prototype.catch = function(I) {
        return this.then(null, I);
      }, g.prototype.then = function(I, y) {
        if (typeof I != "function" && this.state === T || typeof y != "function" && this.state === d) return this;
        var x = new this.constructor(u);
        return this.state !== E ? w(x, this.state === T ? I : y, this.outcome) : this.queue.push(new N(x, I, y)), x;
      }, N.prototype.callFulfilled = function(I) {
        a.resolve(this.promise, I);
      }, N.prototype.otherCallFulfilled = function(I) {
        w(this.promise, this.onFulfilled, I);
      }, N.prototype.callRejected = function(I) {
        a.reject(this.promise, I);
      }, N.prototype.otherCallRejected = function(I) {
        w(this.promise, this.onRejected, I);
      }, a.resolve = function(I, y) {
        var x = k(m, y);
        if (x.status === "error") return a.reject(I, x.value);
        var A = x.value;
        if (A) v(I, A);
        else {
          I.state = T, I.outcome = y;
          for (var _ = -1, p = I.queue.length; ++_ < p; ) I.queue[_].callFulfilled(y);
        }
        return I;
      }, a.reject = function(I, y) {
        I.state = d, I.outcome = y;
        for (var x = -1, A = I.queue.length; ++x < A; ) I.queue[x].callRejected(y);
        return I;
      }, g.resolve = function(I) {
        return I instanceof this ? I : a.resolve(new this(u), I);
      }, g.reject = function(I) {
        var y = new this(u);
        return a.reject(y, I);
      }, g.all = function(I) {
        var y = this;
        if (Object.prototype.toString.call(I) !== "[object Array]") return this.reject(new TypeError("must be an array"));
        var x = I.length, A = false;
        if (!x) return this.resolve([]);
        for (var _ = new Array(x), p = 0, P = -1, U = new this(u); ++P < x; ) C(I[P], P);
        return U;
        function C(q, ee) {
          y.resolve(q).then(function(O) {
            _[ee] = O, ++p !== x || A || (A = true, a.resolve(U, _));
          }, function(O) {
            A || (A = true, a.reject(U, O));
          });
        }
      }, g.race = function(I) {
        var y = this;
        if (Object.prototype.toString.call(I) !== "[object Array]") return this.reject(new TypeError("must be an array"));
        var x = I.length, A = false;
        if (!x) return this.resolve([]);
        for (var _ = -1, p = new this(u); ++_ < x; ) P = I[_], y.resolve(P).then(function(U) {
          A || (A = true, a.resolve(p, U));
        }, function(U) {
          A || (A = true, a.reject(p, U));
        });
        var P;
        return p;
      };
    }, { immediate: 36 }], 38: [function(r, o, l) {
      var s = {};
      (0, r("./lib/utils/common").assign)(s, r("./lib/deflate"), r("./lib/inflate"), r("./lib/zlib/constants")), o.exports = s;
    }, { "./lib/deflate": 39, "./lib/inflate": 40, "./lib/utils/common": 41, "./lib/zlib/constants": 44 }], 39: [function(r, o, l) {
      var s = r("./zlib/deflate"), u = r("./utils/common"), a = r("./utils/strings"), d = r("./zlib/messages"), T = r("./zlib/zstream"), E = Object.prototype.toString, g = 0, N = -1, w = 0, m = 8;
      function v(I) {
        if (!(this instanceof v)) return new v(I);
        this.options = u.assign({ level: N, method: m, chunkSize: 16384, windowBits: 15, memLevel: 8, strategy: w, to: "" }, I || {});
        var y = this.options;
        y.raw && 0 < y.windowBits ? y.windowBits = -y.windowBits : y.gzip && 0 < y.windowBits && y.windowBits < 16 && (y.windowBits += 16), this.err = 0, this.msg = "", this.ended = false, this.chunks = [], this.strm = new T(), this.strm.avail_out = 0;
        var x = s.deflateInit2(this.strm, y.level, y.method, y.windowBits, y.memLevel, y.strategy);
        if (x !== g) throw new Error(d[x]);
        if (y.header && s.deflateSetHeader(this.strm, y.header), y.dictionary) {
          var A;
          if (A = typeof y.dictionary == "string" ? a.string2buf(y.dictionary) : E.call(y.dictionary) === "[object ArrayBuffer]" ? new Uint8Array(y.dictionary) : y.dictionary, (x = s.deflateSetDictionary(this.strm, A)) !== g) throw new Error(d[x]);
          this._dict_set = true;
        }
      }
      function k(I, y) {
        var x = new v(y);
        if (x.push(I, true), x.err) throw x.msg || d[x.err];
        return x.result;
      }
      v.prototype.push = function(I, y) {
        var x, A, _ = this.strm, p = this.options.chunkSize;
        if (this.ended) return false;
        A = y === ~~y ? y : y === true ? 4 : 0, typeof I == "string" ? _.input = a.string2buf(I) : E.call(I) === "[object ArrayBuffer]" ? _.input = new Uint8Array(I) : _.input = I, _.next_in = 0, _.avail_in = _.input.length;
        do {
          if (_.avail_out === 0 && (_.output = new u.Buf8(p), _.next_out = 0, _.avail_out = p), (x = s.deflate(_, A)) !== 1 && x !== g) return this.onEnd(x), !(this.ended = true);
          _.avail_out !== 0 && (_.avail_in !== 0 || A !== 4 && A !== 2) || (this.options.to === "string" ? this.onData(a.buf2binstring(u.shrinkBuf(_.output, _.next_out))) : this.onData(u.shrinkBuf(_.output, _.next_out)));
        } while ((0 < _.avail_in || _.avail_out === 0) && x !== 1);
        return A === 4 ? (x = s.deflateEnd(this.strm), this.onEnd(x), this.ended = true, x === g) : A !== 2 || (this.onEnd(g), !(_.avail_out = 0));
      }, v.prototype.onData = function(I) {
        this.chunks.push(I);
      }, v.prototype.onEnd = function(I) {
        I === g && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = u.flattenChunks(this.chunks)), this.chunks = [], this.err = I, this.msg = this.strm.msg;
      }, l.Deflate = v, l.deflate = k, l.deflateRaw = function(I, y) {
        return (y = y || {}).raw = true, k(I, y);
      }, l.gzip = function(I, y) {
        return (y = y || {}).gzip = true, k(I, y);
      };
    }, { "./utils/common": 41, "./utils/strings": 42, "./zlib/deflate": 46, "./zlib/messages": 51, "./zlib/zstream": 53 }], 40: [function(r, o, l) {
      var s = r("./zlib/inflate"), u = r("./utils/common"), a = r("./utils/strings"), d = r("./zlib/constants"), T = r("./zlib/messages"), E = r("./zlib/zstream"), g = r("./zlib/gzheader"), N = Object.prototype.toString;
      function w(v) {
        if (!(this instanceof w)) return new w(v);
        this.options = u.assign({ chunkSize: 16384, windowBits: 0, to: "" }, v || {});
        var k = this.options;
        k.raw && 0 <= k.windowBits && k.windowBits < 16 && (k.windowBits = -k.windowBits, k.windowBits === 0 && (k.windowBits = -15)), !(0 <= k.windowBits && k.windowBits < 16) || v && v.windowBits || (k.windowBits += 32), 15 < k.windowBits && k.windowBits < 48 && (15 & k.windowBits) == 0 && (k.windowBits |= 15), this.err = 0, this.msg = "", this.ended = false, this.chunks = [], this.strm = new E(), this.strm.avail_out = 0;
        var I = s.inflateInit2(this.strm, k.windowBits);
        if (I !== d.Z_OK) throw new Error(T[I]);
        this.header = new g(), s.inflateGetHeader(this.strm, this.header);
      }
      function m(v, k) {
        var I = new w(k);
        if (I.push(v, true), I.err) throw I.msg || T[I.err];
        return I.result;
      }
      w.prototype.push = function(v, k) {
        var I, y, x, A, _, p, P = this.strm, U = this.options.chunkSize, C = this.options.dictionary, q = false;
        if (this.ended) return false;
        y = k === ~~k ? k : k === true ? d.Z_FINISH : d.Z_NO_FLUSH, typeof v == "string" ? P.input = a.binstring2buf(v) : N.call(v) === "[object ArrayBuffer]" ? P.input = new Uint8Array(v) : P.input = v, P.next_in = 0, P.avail_in = P.input.length;
        do {
          if (P.avail_out === 0 && (P.output = new u.Buf8(U), P.next_out = 0, P.avail_out = U), (I = s.inflate(P, d.Z_NO_FLUSH)) === d.Z_NEED_DICT && C && (p = typeof C == "string" ? a.string2buf(C) : N.call(C) === "[object ArrayBuffer]" ? new Uint8Array(C) : C, I = s.inflateSetDictionary(this.strm, p)), I === d.Z_BUF_ERROR && q === true && (I = d.Z_OK, q = false), I !== d.Z_STREAM_END && I !== d.Z_OK) return this.onEnd(I), !(this.ended = true);
          P.next_out && (P.avail_out !== 0 && I !== d.Z_STREAM_END && (P.avail_in !== 0 || y !== d.Z_FINISH && y !== d.Z_SYNC_FLUSH) || (this.options.to === "string" ? (x = a.utf8border(P.output, P.next_out), A = P.next_out - x, _ = a.buf2string(P.output, x), P.next_out = A, P.avail_out = U - A, A && u.arraySet(P.output, P.output, x, A, 0), this.onData(_)) : this.onData(u.shrinkBuf(P.output, P.next_out)))), P.avail_in === 0 && P.avail_out === 0 && (q = true);
        } while ((0 < P.avail_in || P.avail_out === 0) && I !== d.Z_STREAM_END);
        return I === d.Z_STREAM_END && (y = d.Z_FINISH), y === d.Z_FINISH ? (I = s.inflateEnd(this.strm), this.onEnd(I), this.ended = true, I === d.Z_OK) : y !== d.Z_SYNC_FLUSH || (this.onEnd(d.Z_OK), !(P.avail_out = 0));
      }, w.prototype.onData = function(v) {
        this.chunks.push(v);
      }, w.prototype.onEnd = function(v) {
        v === d.Z_OK && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = u.flattenChunks(this.chunks)), this.chunks = [], this.err = v, this.msg = this.strm.msg;
      }, l.Inflate = w, l.inflate = m, l.inflateRaw = function(v, k) {
        return (k = k || {}).raw = true, m(v, k);
      }, l.ungzip = m;
    }, { "./utils/common": 41, "./utils/strings": 42, "./zlib/constants": 44, "./zlib/gzheader": 47, "./zlib/inflate": 49, "./zlib/messages": 51, "./zlib/zstream": 53 }], 41: [function(r, o, l) {
      var s = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Int32Array < "u";
      l.assign = function(d) {
        for (var T = Array.prototype.slice.call(arguments, 1); T.length; ) {
          var E = T.shift();
          if (E) {
            if (typeof E != "object") throw new TypeError(E + "must be non-object");
            for (var g in E) E.hasOwnProperty(g) && (d[g] = E[g]);
          }
        }
        return d;
      }, l.shrinkBuf = function(d, T) {
        return d.length === T ? d : d.subarray ? d.subarray(0, T) : (d.length = T, d);
      };
      var u = { arraySet: function(d, T, E, g, N) {
        if (T.subarray && d.subarray) d.set(T.subarray(E, E + g), N);
        else for (var w = 0; w < g; w++) d[N + w] = T[E + w];
      }, flattenChunks: function(d) {
        var T, E, g, N, w, m;
        for (T = g = 0, E = d.length; T < E; T++) g += d[T].length;
        for (m = new Uint8Array(g), T = N = 0, E = d.length; T < E; T++) w = d[T], m.set(w, N), N += w.length;
        return m;
      } }, a = { arraySet: function(d, T, E, g, N) {
        for (var w = 0; w < g; w++) d[N + w] = T[E + w];
      }, flattenChunks: function(d) {
        return [].concat.apply([], d);
      } };
      l.setTyped = function(d) {
        d ? (l.Buf8 = Uint8Array, l.Buf16 = Uint16Array, l.Buf32 = Int32Array, l.assign(l, u)) : (l.Buf8 = Array, l.Buf16 = Array, l.Buf32 = Array, l.assign(l, a));
      }, l.setTyped(s);
    }, {}], 42: [function(r, o, l) {
      var s = r("./common"), u = true, a = true;
      try {
        String.fromCharCode.apply(null, [0]);
      } catch {
        u = false;
      }
      try {
        String.fromCharCode.apply(null, new Uint8Array(1));
      } catch {
        a = false;
      }
      for (var d = new s.Buf8(256), T = 0; T < 256; T++) d[T] = 252 <= T ? 6 : 248 <= T ? 5 : 240 <= T ? 4 : 224 <= T ? 3 : 192 <= T ? 2 : 1;
      function E(g, N) {
        if (N < 65537 && (g.subarray && a || !g.subarray && u)) return String.fromCharCode.apply(null, s.shrinkBuf(g, N));
        for (var w = "", m = 0; m < N; m++) w += String.fromCharCode(g[m]);
        return w;
      }
      d[254] = d[254] = 1, l.string2buf = function(g) {
        var N, w, m, v, k, I = g.length, y = 0;
        for (v = 0; v < I; v++) (64512 & (w = g.charCodeAt(v))) == 55296 && v + 1 < I && (64512 & (m = g.charCodeAt(v + 1))) == 56320 && (w = 65536 + (w - 55296 << 10) + (m - 56320), v++), y += w < 128 ? 1 : w < 2048 ? 2 : w < 65536 ? 3 : 4;
        for (N = new s.Buf8(y), v = k = 0; k < y; v++) (64512 & (w = g.charCodeAt(v))) == 55296 && v + 1 < I && (64512 & (m = g.charCodeAt(v + 1))) == 56320 && (w = 65536 + (w - 55296 << 10) + (m - 56320), v++), w < 128 ? N[k++] = w : (w < 2048 ? N[k++] = 192 | w >>> 6 : (w < 65536 ? N[k++] = 224 | w >>> 12 : (N[k++] = 240 | w >>> 18, N[k++] = 128 | w >>> 12 & 63), N[k++] = 128 | w >>> 6 & 63), N[k++] = 128 | 63 & w);
        return N;
      }, l.buf2binstring = function(g) {
        return E(g, g.length);
      }, l.binstring2buf = function(g) {
        for (var N = new s.Buf8(g.length), w = 0, m = N.length; w < m; w++) N[w] = g.charCodeAt(w);
        return N;
      }, l.buf2string = function(g, N) {
        var w, m, v, k, I = N || g.length, y = new Array(2 * I);
        for (w = m = 0; w < I; ) if ((v = g[w++]) < 128) y[m++] = v;
        else if (4 < (k = d[v])) y[m++] = 65533, w += k - 1;
        else {
          for (v &= k === 2 ? 31 : k === 3 ? 15 : 7; 1 < k && w < I; ) v = v << 6 | 63 & g[w++], k--;
          1 < k ? y[m++] = 65533 : v < 65536 ? y[m++] = v : (v -= 65536, y[m++] = 55296 | v >> 10 & 1023, y[m++] = 56320 | 1023 & v);
        }
        return E(y, m);
      }, l.utf8border = function(g, N) {
        var w;
        for ((N = N || g.length) > g.length && (N = g.length), w = N - 1; 0 <= w && (192 & g[w]) == 128; ) w--;
        return w < 0 || w === 0 ? N : w + d[g[w]] > N ? w : N;
      };
    }, { "./common": 41 }], 43: [function(r, o, l) {
      o.exports = function(s, u, a, d) {
        for (var T = 65535 & s | 0, E = s >>> 16 & 65535 | 0, g = 0; a !== 0; ) {
          for (a -= g = 2e3 < a ? 2e3 : a; E = E + (T = T + u[d++] | 0) | 0, --g; ) ;
          T %= 65521, E %= 65521;
        }
        return T | E << 16 | 0;
      };
    }, {}], 44: [function(r, o, l) {
      o.exports = { Z_NO_FLUSH: 0, Z_PARTIAL_FLUSH: 1, Z_SYNC_FLUSH: 2, Z_FULL_FLUSH: 3, Z_FINISH: 4, Z_BLOCK: 5, Z_TREES: 6, Z_OK: 0, Z_STREAM_END: 1, Z_NEED_DICT: 2, Z_ERRNO: -1, Z_STREAM_ERROR: -2, Z_DATA_ERROR: -3, Z_BUF_ERROR: -5, Z_NO_COMPRESSION: 0, Z_BEST_SPEED: 1, Z_BEST_COMPRESSION: 9, Z_DEFAULT_COMPRESSION: -1, Z_FILTERED: 1, Z_HUFFMAN_ONLY: 2, Z_RLE: 3, Z_FIXED: 4, Z_DEFAULT_STRATEGY: 0, Z_BINARY: 0, Z_TEXT: 1, Z_UNKNOWN: 2, Z_DEFLATED: 8 };
    }, {}], 45: [function(r, o, l) {
      var s = (function() {
        for (var u, a = [], d = 0; d < 256; d++) {
          u = d;
          for (var T = 0; T < 8; T++) u = 1 & u ? 3988292384 ^ u >>> 1 : u >>> 1;
          a[d] = u;
        }
        return a;
      })();
      o.exports = function(u, a, d, T) {
        var E = s, g = T + d;
        u ^= -1;
        for (var N = T; N < g; N++) u = u >>> 8 ^ E[255 & (u ^ a[N])];
        return -1 ^ u;
      };
    }, {}], 46: [function(r, o, l) {
      var s, u = r("../utils/common"), a = r("./trees"), d = r("./adler32"), T = r("./crc32"), E = r("./messages"), g = 0, N = 4, w = 0, m = -2, v = -1, k = 4, I = 2, y = 8, x = 9, A = 286, _ = 30, p = 19, P = 2 * A + 1, U = 15, C = 3, q = 258, ee = q + C + 1, O = 42, W = 113, S = 1, H = 2, J = 3, $ = 4;
      function oe(c, G) {
        return c.msg = E[G], G;
      }
      function Z(c) {
        return (c << 1) - (4 < c ? 9 : 0);
      }
      function re(c) {
        for (var G = c.length; 0 <= --G; ) c[G] = 0;
      }
      function V(c) {
        var G = c.state, R = G.pending;
        R > c.avail_out && (R = c.avail_out), R !== 0 && (u.arraySet(c.output, G.pending_buf, G.pending_out, R, c.next_out), c.next_out += R, G.pending_out += R, c.total_out += R, c.avail_out -= R, G.pending -= R, G.pending === 0 && (G.pending_out = 0));
      }
      function F(c, G) {
        a._tr_flush_block(c, 0 <= c.block_start ? c.block_start : -1, c.strstart - c.block_start, G), c.block_start = c.strstart, V(c.strm);
      }
      function X(c, G) {
        c.pending_buf[c.pending++] = G;
      }
      function Y(c, G) {
        c.pending_buf[c.pending++] = G >>> 8 & 255, c.pending_buf[c.pending++] = 255 & G;
      }
      function ne(c, G) {
        var R, n, i = c.max_chain_length, f = c.strstart, L = c.prev_length, K = c.nice_match, z = c.strstart > c.w_size - ee ? c.strstart - (c.w_size - ee) : 0, ae = c.window, ue = c.w_mask, se = c.prev, fe = c.strstart + q, me = ae[f + L - 1], ve = ae[f + L];
        c.prev_length >= c.good_match && (i >>= 2), K > c.lookahead && (K = c.lookahead);
        do
          if (ae[(R = G) + L] === ve && ae[R + L - 1] === me && ae[R] === ae[f] && ae[++R] === ae[f + 1]) {
            f += 2, R++;
            do
              ;
            while (ae[++f] === ae[++R] && ae[++f] === ae[++R] && ae[++f] === ae[++R] && ae[++f] === ae[++R] && ae[++f] === ae[++R] && ae[++f] === ae[++R] && ae[++f] === ae[++R] && ae[++f] === ae[++R] && f < fe);
            if (n = q - (fe - f), f = fe - q, L < n) {
              if (c.match_start = G, K <= (L = n)) break;
              me = ae[f + L - 1], ve = ae[f + L];
            }
          }
        while ((G = se[G & ue]) > z && --i != 0);
        return L <= c.lookahead ? L : c.lookahead;
      }
      function de(c) {
        var G, R, n, i, f, L, K, z, ae, ue, se = c.w_size;
        do {
          if (i = c.window_size - c.lookahead - c.strstart, c.strstart >= se + (se - ee)) {
            for (u.arraySet(c.window, c.window, se, se, 0), c.match_start -= se, c.strstart -= se, c.block_start -= se, G = R = c.hash_size; n = c.head[--G], c.head[G] = se <= n ? n - se : 0, --R; ) ;
            for (G = R = se; n = c.prev[--G], c.prev[G] = se <= n ? n - se : 0, --R; ) ;
            i += se;
          }
          if (c.strm.avail_in === 0) break;
          if (L = c.strm, K = c.window, z = c.strstart + c.lookahead, ae = i, ue = void 0, ue = L.avail_in, ae < ue && (ue = ae), R = ue === 0 ? 0 : (L.avail_in -= ue, u.arraySet(K, L.input, L.next_in, ue, z), L.state.wrap === 1 ? L.adler = d(L.adler, K, ue, z) : L.state.wrap === 2 && (L.adler = T(L.adler, K, ue, z)), L.next_in += ue, L.total_in += ue, ue), c.lookahead += R, c.lookahead + c.insert >= C) for (f = c.strstart - c.insert, c.ins_h = c.window[f], c.ins_h = (c.ins_h << c.hash_shift ^ c.window[f + 1]) & c.hash_mask; c.insert && (c.ins_h = (c.ins_h << c.hash_shift ^ c.window[f + C - 1]) & c.hash_mask, c.prev[f & c.w_mask] = c.head[c.ins_h], c.head[c.ins_h] = f, f++, c.insert--, !(c.lookahead + c.insert < C)); ) ;
        } while (c.lookahead < ee && c.strm.avail_in !== 0);
      }
      function b(c, G) {
        for (var R, n; ; ) {
          if (c.lookahead < ee) {
            if (de(c), c.lookahead < ee && G === g) return S;
            if (c.lookahead === 0) break;
          }
          if (R = 0, c.lookahead >= C && (c.ins_h = (c.ins_h << c.hash_shift ^ c.window[c.strstart + C - 1]) & c.hash_mask, R = c.prev[c.strstart & c.w_mask] = c.head[c.ins_h], c.head[c.ins_h] = c.strstart), R !== 0 && c.strstart - R <= c.w_size - ee && (c.match_length = ne(c, R)), c.match_length >= C) if (n = a._tr_tally(c, c.strstart - c.match_start, c.match_length - C), c.lookahead -= c.match_length, c.match_length <= c.max_lazy_match && c.lookahead >= C) {
            for (c.match_length--; c.strstart++, c.ins_h = (c.ins_h << c.hash_shift ^ c.window[c.strstart + C - 1]) & c.hash_mask, R = c.prev[c.strstart & c.w_mask] = c.head[c.ins_h], c.head[c.ins_h] = c.strstart, --c.match_length != 0; ) ;
            c.strstart++;
          } else c.strstart += c.match_length, c.match_length = 0, c.ins_h = c.window[c.strstart], c.ins_h = (c.ins_h << c.hash_shift ^ c.window[c.strstart + 1]) & c.hash_mask;
          else n = a._tr_tally(c, 0, c.window[c.strstart]), c.lookahead--, c.strstart++;
          if (n && (F(c, false), c.strm.avail_out === 0)) return S;
        }
        return c.insert = c.strstart < C - 1 ? c.strstart : C - 1, G === N ? (F(c, true), c.strm.avail_out === 0 ? J : $) : c.last_lit && (F(c, false), c.strm.avail_out === 0) ? S : H;
      }
      function h(c, G) {
        for (var R, n, i; ; ) {
          if (c.lookahead < ee) {
            if (de(c), c.lookahead < ee && G === g) return S;
            if (c.lookahead === 0) break;
          }
          if (R = 0, c.lookahead >= C && (c.ins_h = (c.ins_h << c.hash_shift ^ c.window[c.strstart + C - 1]) & c.hash_mask, R = c.prev[c.strstart & c.w_mask] = c.head[c.ins_h], c.head[c.ins_h] = c.strstart), c.prev_length = c.match_length, c.prev_match = c.match_start, c.match_length = C - 1, R !== 0 && c.prev_length < c.max_lazy_match && c.strstart - R <= c.w_size - ee && (c.match_length = ne(c, R), c.match_length <= 5 && (c.strategy === 1 || c.match_length === C && 4096 < c.strstart - c.match_start) && (c.match_length = C - 1)), c.prev_length >= C && c.match_length <= c.prev_length) {
            for (i = c.strstart + c.lookahead - C, n = a._tr_tally(c, c.strstart - 1 - c.prev_match, c.prev_length - C), c.lookahead -= c.prev_length - 1, c.prev_length -= 2; ++c.strstart <= i && (c.ins_h = (c.ins_h << c.hash_shift ^ c.window[c.strstart + C - 1]) & c.hash_mask, R = c.prev[c.strstart & c.w_mask] = c.head[c.ins_h], c.head[c.ins_h] = c.strstart), --c.prev_length != 0; ) ;
            if (c.match_available = 0, c.match_length = C - 1, c.strstart++, n && (F(c, false), c.strm.avail_out === 0)) return S;
          } else if (c.match_available) {
            if ((n = a._tr_tally(c, 0, c.window[c.strstart - 1])) && F(c, false), c.strstart++, c.lookahead--, c.strm.avail_out === 0) return S;
          } else c.match_available = 1, c.strstart++, c.lookahead--;
        }
        return c.match_available && (n = a._tr_tally(c, 0, c.window[c.strstart - 1]), c.match_available = 0), c.insert = c.strstart < C - 1 ? c.strstart : C - 1, G === N ? (F(c, true), c.strm.avail_out === 0 ? J : $) : c.last_lit && (F(c, false), c.strm.avail_out === 0) ? S : H;
      }
      function j(c, G, R, n, i) {
        this.good_length = c, this.max_lazy = G, this.nice_length = R, this.max_chain = n, this.func = i;
      }
      function M() {
        this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = y, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new u.Buf16(2 * P), this.dyn_dtree = new u.Buf16(2 * (2 * _ + 1)), this.bl_tree = new u.Buf16(2 * (2 * p + 1)), re(this.dyn_ltree), re(this.dyn_dtree), re(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new u.Buf16(U + 1), this.heap = new u.Buf16(2 * A + 1), re(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new u.Buf16(2 * A + 1), re(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
      }
      function ie(c) {
        var G;
        return c && c.state ? (c.total_in = c.total_out = 0, c.data_type = I, (G = c.state).pending = 0, G.pending_out = 0, G.wrap < 0 && (G.wrap = -G.wrap), G.status = G.wrap ? O : W, c.adler = G.wrap === 2 ? 0 : 1, G.last_flush = g, a._tr_init(G), w) : oe(c, m);
      }
      function D(c) {
        var G = ie(c);
        return G === w && (function(R) {
          R.window_size = 2 * R.w_size, re(R.head), R.max_lazy_match = s[R.level].max_lazy, R.good_match = s[R.level].good_length, R.nice_match = s[R.level].nice_length, R.max_chain_length = s[R.level].max_chain, R.strstart = 0, R.block_start = 0, R.lookahead = 0, R.insert = 0, R.match_length = R.prev_length = C - 1, R.match_available = 0, R.ins_h = 0;
        })(c.state), G;
      }
      function B(c, G, R, n, i, f) {
        if (!c) return m;
        var L = 1;
        if (G === v && (G = 6), n < 0 ? (L = 0, n = -n) : 15 < n && (L = 2, n -= 16), i < 1 || x < i || R !== y || n < 8 || 15 < n || G < 0 || 9 < G || f < 0 || k < f) return oe(c, m);
        n === 8 && (n = 9);
        var K = new M();
        return (c.state = K).strm = c, K.wrap = L, K.gzhead = null, K.w_bits = n, K.w_size = 1 << K.w_bits, K.w_mask = K.w_size - 1, K.hash_bits = i + 7, K.hash_size = 1 << K.hash_bits, K.hash_mask = K.hash_size - 1, K.hash_shift = ~~((K.hash_bits + C - 1) / C), K.window = new u.Buf8(2 * K.w_size), K.head = new u.Buf16(K.hash_size), K.prev = new u.Buf16(K.w_size), K.lit_bufsize = 1 << i + 6, K.pending_buf_size = 4 * K.lit_bufsize, K.pending_buf = new u.Buf8(K.pending_buf_size), K.d_buf = 1 * K.lit_bufsize, K.l_buf = 3 * K.lit_bufsize, K.level = G, K.strategy = f, K.method = R, D(c);
      }
      s = [new j(0, 0, 0, 0, function(c, G) {
        var R = 65535;
        for (R > c.pending_buf_size - 5 && (R = c.pending_buf_size - 5); ; ) {
          if (c.lookahead <= 1) {
            if (de(c), c.lookahead === 0 && G === g) return S;
            if (c.lookahead === 0) break;
          }
          c.strstart += c.lookahead, c.lookahead = 0;
          var n = c.block_start + R;
          if ((c.strstart === 0 || c.strstart >= n) && (c.lookahead = c.strstart - n, c.strstart = n, F(c, false), c.strm.avail_out === 0) || c.strstart - c.block_start >= c.w_size - ee && (F(c, false), c.strm.avail_out === 0)) return S;
        }
        return c.insert = 0, G === N ? (F(c, true), c.strm.avail_out === 0 ? J : $) : (c.strstart > c.block_start && (F(c, false), c.strm.avail_out), S);
      }), new j(4, 4, 8, 4, b), new j(4, 5, 16, 8, b), new j(4, 6, 32, 32, b), new j(4, 4, 16, 16, h), new j(8, 16, 32, 32, h), new j(8, 16, 128, 128, h), new j(8, 32, 128, 256, h), new j(32, 128, 258, 1024, h), new j(32, 258, 258, 4096, h)], l.deflateInit = function(c, G) {
        return B(c, G, y, 15, 8, 0);
      }, l.deflateInit2 = B, l.deflateReset = D, l.deflateResetKeep = ie, l.deflateSetHeader = function(c, G) {
        return c && c.state ? c.state.wrap !== 2 ? m : (c.state.gzhead = G, w) : m;
      }, l.deflate = function(c, G) {
        var R, n, i, f;
        if (!c || !c.state || 5 < G || G < 0) return c ? oe(c, m) : m;
        if (n = c.state, !c.output || !c.input && c.avail_in !== 0 || n.status === 666 && G !== N) return oe(c, c.avail_out === 0 ? -5 : m);
        if (n.strm = c, R = n.last_flush, n.last_flush = G, n.status === O) if (n.wrap === 2) c.adler = 0, X(n, 31), X(n, 139), X(n, 8), n.gzhead ? (X(n, (n.gzhead.text ? 1 : 0) + (n.gzhead.hcrc ? 2 : 0) + (n.gzhead.extra ? 4 : 0) + (n.gzhead.name ? 8 : 0) + (n.gzhead.comment ? 16 : 0)), X(n, 255 & n.gzhead.time), X(n, n.gzhead.time >> 8 & 255), X(n, n.gzhead.time >> 16 & 255), X(n, n.gzhead.time >> 24 & 255), X(n, n.level === 9 ? 2 : 2 <= n.strategy || n.level < 2 ? 4 : 0), X(n, 255 & n.gzhead.os), n.gzhead.extra && n.gzhead.extra.length && (X(n, 255 & n.gzhead.extra.length), X(n, n.gzhead.extra.length >> 8 & 255)), n.gzhead.hcrc && (c.adler = T(c.adler, n.pending_buf, n.pending, 0)), n.gzindex = 0, n.status = 69) : (X(n, 0), X(n, 0), X(n, 0), X(n, 0), X(n, 0), X(n, n.level === 9 ? 2 : 2 <= n.strategy || n.level < 2 ? 4 : 0), X(n, 3), n.status = W);
        else {
          var L = y + (n.w_bits - 8 << 4) << 8;
          L |= (2 <= n.strategy || n.level < 2 ? 0 : n.level < 6 ? 1 : n.level === 6 ? 2 : 3) << 6, n.strstart !== 0 && (L |= 32), L += 31 - L % 31, n.status = W, Y(n, L), n.strstart !== 0 && (Y(n, c.adler >>> 16), Y(n, 65535 & c.adler)), c.adler = 1;
        }
        if (n.status === 69) if (n.gzhead.extra) {
          for (i = n.pending; n.gzindex < (65535 & n.gzhead.extra.length) && (n.pending !== n.pending_buf_size || (n.gzhead.hcrc && n.pending > i && (c.adler = T(c.adler, n.pending_buf, n.pending - i, i)), V(c), i = n.pending, n.pending !== n.pending_buf_size)); ) X(n, 255 & n.gzhead.extra[n.gzindex]), n.gzindex++;
          n.gzhead.hcrc && n.pending > i && (c.adler = T(c.adler, n.pending_buf, n.pending - i, i)), n.gzindex === n.gzhead.extra.length && (n.gzindex = 0, n.status = 73);
        } else n.status = 73;
        if (n.status === 73) if (n.gzhead.name) {
          i = n.pending;
          do {
            if (n.pending === n.pending_buf_size && (n.gzhead.hcrc && n.pending > i && (c.adler = T(c.adler, n.pending_buf, n.pending - i, i)), V(c), i = n.pending, n.pending === n.pending_buf_size)) {
              f = 1;
              break;
            }
            f = n.gzindex < n.gzhead.name.length ? 255 & n.gzhead.name.charCodeAt(n.gzindex++) : 0, X(n, f);
          } while (f !== 0);
          n.gzhead.hcrc && n.pending > i && (c.adler = T(c.adler, n.pending_buf, n.pending - i, i)), f === 0 && (n.gzindex = 0, n.status = 91);
        } else n.status = 91;
        if (n.status === 91) if (n.gzhead.comment) {
          i = n.pending;
          do {
            if (n.pending === n.pending_buf_size && (n.gzhead.hcrc && n.pending > i && (c.adler = T(c.adler, n.pending_buf, n.pending - i, i)), V(c), i = n.pending, n.pending === n.pending_buf_size)) {
              f = 1;
              break;
            }
            f = n.gzindex < n.gzhead.comment.length ? 255 & n.gzhead.comment.charCodeAt(n.gzindex++) : 0, X(n, f);
          } while (f !== 0);
          n.gzhead.hcrc && n.pending > i && (c.adler = T(c.adler, n.pending_buf, n.pending - i, i)), f === 0 && (n.status = 103);
        } else n.status = 103;
        if (n.status === 103 && (n.gzhead.hcrc ? (n.pending + 2 > n.pending_buf_size && V(c), n.pending + 2 <= n.pending_buf_size && (X(n, 255 & c.adler), X(n, c.adler >> 8 & 255), c.adler = 0, n.status = W)) : n.status = W), n.pending !== 0) {
          if (V(c), c.avail_out === 0) return n.last_flush = -1, w;
        } else if (c.avail_in === 0 && Z(G) <= Z(R) && G !== N) return oe(c, -5);
        if (n.status === 666 && c.avail_in !== 0) return oe(c, -5);
        if (c.avail_in !== 0 || n.lookahead !== 0 || G !== g && n.status !== 666) {
          var K = n.strategy === 2 ? (function(z, ae) {
            for (var ue; ; ) {
              if (z.lookahead === 0 && (de(z), z.lookahead === 0)) {
                if (ae === g) return S;
                break;
              }
              if (z.match_length = 0, ue = a._tr_tally(z, 0, z.window[z.strstart]), z.lookahead--, z.strstart++, ue && (F(z, false), z.strm.avail_out === 0)) return S;
            }
            return z.insert = 0, ae === N ? (F(z, true), z.strm.avail_out === 0 ? J : $) : z.last_lit && (F(z, false), z.strm.avail_out === 0) ? S : H;
          })(n, G) : n.strategy === 3 ? (function(z, ae) {
            for (var ue, se, fe, me, ve = z.window; ; ) {
              if (z.lookahead <= q) {
                if (de(z), z.lookahead <= q && ae === g) return S;
                if (z.lookahead === 0) break;
              }
              if (z.match_length = 0, z.lookahead >= C && 0 < z.strstart && (se = ve[fe = z.strstart - 1]) === ve[++fe] && se === ve[++fe] && se === ve[++fe]) {
                me = z.strstart + q;
                do
                  ;
                while (se === ve[++fe] && se === ve[++fe] && se === ve[++fe] && se === ve[++fe] && se === ve[++fe] && se === ve[++fe] && se === ve[++fe] && se === ve[++fe] && fe < me);
                z.match_length = q - (me - fe), z.match_length > z.lookahead && (z.match_length = z.lookahead);
              }
              if (z.match_length >= C ? (ue = a._tr_tally(z, 1, z.match_length - C), z.lookahead -= z.match_length, z.strstart += z.match_length, z.match_length = 0) : (ue = a._tr_tally(z, 0, z.window[z.strstart]), z.lookahead--, z.strstart++), ue && (F(z, false), z.strm.avail_out === 0)) return S;
            }
            return z.insert = 0, ae === N ? (F(z, true), z.strm.avail_out === 0 ? J : $) : z.last_lit && (F(z, false), z.strm.avail_out === 0) ? S : H;
          })(n, G) : s[n.level].func(n, G);
          if (K !== J && K !== $ || (n.status = 666), K === S || K === J) return c.avail_out === 0 && (n.last_flush = -1), w;
          if (K === H && (G === 1 ? a._tr_align(n) : G !== 5 && (a._tr_stored_block(n, 0, 0, false), G === 3 && (re(n.head), n.lookahead === 0 && (n.strstart = 0, n.block_start = 0, n.insert = 0))), V(c), c.avail_out === 0)) return n.last_flush = -1, w;
        }
        return G !== N ? w : n.wrap <= 0 ? 1 : (n.wrap === 2 ? (X(n, 255 & c.adler), X(n, c.adler >> 8 & 255), X(n, c.adler >> 16 & 255), X(n, c.adler >> 24 & 255), X(n, 255 & c.total_in), X(n, c.total_in >> 8 & 255), X(n, c.total_in >> 16 & 255), X(n, c.total_in >> 24 & 255)) : (Y(n, c.adler >>> 16), Y(n, 65535 & c.adler)), V(c), 0 < n.wrap && (n.wrap = -n.wrap), n.pending !== 0 ? w : 1);
      }, l.deflateEnd = function(c) {
        var G;
        return c && c.state ? (G = c.state.status) !== O && G !== 69 && G !== 73 && G !== 91 && G !== 103 && G !== W && G !== 666 ? oe(c, m) : (c.state = null, G === W ? oe(c, -3) : w) : m;
      }, l.deflateSetDictionary = function(c, G) {
        var R, n, i, f, L, K, z, ae, ue = G.length;
        if (!c || !c.state || (f = (R = c.state).wrap) === 2 || f === 1 && R.status !== O || R.lookahead) return m;
        for (f === 1 && (c.adler = d(c.adler, G, ue, 0)), R.wrap = 0, ue >= R.w_size && (f === 0 && (re(R.head), R.strstart = 0, R.block_start = 0, R.insert = 0), ae = new u.Buf8(R.w_size), u.arraySet(ae, G, ue - R.w_size, R.w_size, 0), G = ae, ue = R.w_size), L = c.avail_in, K = c.next_in, z = c.input, c.avail_in = ue, c.next_in = 0, c.input = G, de(R); R.lookahead >= C; ) {
          for (n = R.strstart, i = R.lookahead - (C - 1); R.ins_h = (R.ins_h << R.hash_shift ^ R.window[n + C - 1]) & R.hash_mask, R.prev[n & R.w_mask] = R.head[R.ins_h], R.head[R.ins_h] = n, n++, --i; ) ;
          R.strstart = n, R.lookahead = C - 1, de(R);
        }
        return R.strstart += R.lookahead, R.block_start = R.strstart, R.insert = R.lookahead, R.lookahead = 0, R.match_length = R.prev_length = C - 1, R.match_available = 0, c.next_in = K, c.input = z, c.avail_in = L, R.wrap = f, w;
      }, l.deflateInfo = "pako deflate (from Nodeca project)";
    }, { "../utils/common": 41, "./adler32": 43, "./crc32": 45, "./messages": 51, "./trees": 52 }], 47: [function(r, o, l) {
      o.exports = function() {
        this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = false;
      };
    }, {}], 48: [function(r, o, l) {
      o.exports = function(s, u) {
        var a = s.state, d = s.next_in, T, E, g, N, w, m, v, k, I, y, x, A, _, p, P, U, C, q, ee, O, W, S = s.input, H;
        T = d + (s.avail_in - 5), E = s.next_out, H = s.output, g = E - (u - s.avail_out), N = E + (s.avail_out - 257), w = a.dmax, m = a.wsize, v = a.whave, k = a.wnext, I = a.window, y = a.hold, x = a.bits, A = a.lencode, _ = a.distcode, p = (1 << a.lenbits) - 1, P = (1 << a.distbits) - 1;
        e: do {
          x < 15 && (y += S[d++] << x, x += 8, y += S[d++] << x, x += 8), U = A[y & p];
          t: for (; ; ) {
            if (y >>>= C = U >>> 24, x -= C, (C = U >>> 16 & 255) === 0) H[E++] = 65535 & U;
            else {
              if (!(16 & C)) {
                if ((64 & C) == 0) {
                  U = A[(65535 & U) + (y & (1 << C) - 1)];
                  continue t;
                }
                if (32 & C) {
                  a.mode = 12;
                  break e;
                }
                s.msg = "invalid literal/length code", a.mode = 30;
                break e;
              }
              q = 65535 & U, (C &= 15) && (x < C && (y += S[d++] << x, x += 8), q += y & (1 << C) - 1, y >>>= C, x -= C), x < 15 && (y += S[d++] << x, x += 8, y += S[d++] << x, x += 8), U = _[y & P];
              r: for (; ; ) {
                if (y >>>= C = U >>> 24, x -= C, !(16 & (C = U >>> 16 & 255))) {
                  if ((64 & C) == 0) {
                    U = _[(65535 & U) + (y & (1 << C) - 1)];
                    continue r;
                  }
                  s.msg = "invalid distance code", a.mode = 30;
                  break e;
                }
                if (ee = 65535 & U, x < (C &= 15) && (y += S[d++] << x, (x += 8) < C && (y += S[d++] << x, x += 8)), w < (ee += y & (1 << C) - 1)) {
                  s.msg = "invalid distance too far back", a.mode = 30;
                  break e;
                }
                if (y >>>= C, x -= C, (C = E - g) < ee) {
                  if (v < (C = ee - C) && a.sane) {
                    s.msg = "invalid distance too far back", a.mode = 30;
                    break e;
                  }
                  if (W = I, (O = 0) === k) {
                    if (O += m - C, C < q) {
                      for (q -= C; H[E++] = I[O++], --C; ) ;
                      O = E - ee, W = H;
                    }
                  } else if (k < C) {
                    if (O += m + k - C, (C -= k) < q) {
                      for (q -= C; H[E++] = I[O++], --C; ) ;
                      if (O = 0, k < q) {
                        for (q -= C = k; H[E++] = I[O++], --C; ) ;
                        O = E - ee, W = H;
                      }
                    }
                  } else if (O += k - C, C < q) {
                    for (q -= C; H[E++] = I[O++], --C; ) ;
                    O = E - ee, W = H;
                  }
                  for (; 2 < q; ) H[E++] = W[O++], H[E++] = W[O++], H[E++] = W[O++], q -= 3;
                  q && (H[E++] = W[O++], 1 < q && (H[E++] = W[O++]));
                } else {
                  for (O = E - ee; H[E++] = H[O++], H[E++] = H[O++], H[E++] = H[O++], 2 < (q -= 3); ) ;
                  q && (H[E++] = H[O++], 1 < q && (H[E++] = H[O++]));
                }
                break;
              }
            }
            break;
          }
        } while (d < T && E < N);
        d -= q = x >> 3, y &= (1 << (x -= q << 3)) - 1, s.next_in = d, s.next_out = E, s.avail_in = d < T ? T - d + 5 : 5 - (d - T), s.avail_out = E < N ? N - E + 257 : 257 - (E - N), a.hold = y, a.bits = x;
      };
    }, {}], 49: [function(r, o, l) {
      var s = r("../utils/common"), u = r("./adler32"), a = r("./crc32"), d = r("./inffast"), T = r("./inftrees"), E = 1, g = 2, N = 0, w = -2, m = 1, v = 852, k = 592;
      function I(O) {
        return (O >>> 24 & 255) + (O >>> 8 & 65280) + ((65280 & O) << 8) + ((255 & O) << 24);
      }
      function y() {
        this.mode = 0, this.last = false, this.wrap = 0, this.havedict = false, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new s.Buf16(320), this.work = new s.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
      }
      function x(O) {
        var W;
        return O && O.state ? (W = O.state, O.total_in = O.total_out = W.total = 0, O.msg = "", W.wrap && (O.adler = 1 & W.wrap), W.mode = m, W.last = 0, W.havedict = 0, W.dmax = 32768, W.head = null, W.hold = 0, W.bits = 0, W.lencode = W.lendyn = new s.Buf32(v), W.distcode = W.distdyn = new s.Buf32(k), W.sane = 1, W.back = -1, N) : w;
      }
      function A(O) {
        var W;
        return O && O.state ? ((W = O.state).wsize = 0, W.whave = 0, W.wnext = 0, x(O)) : w;
      }
      function _(O, W) {
        var S, H;
        return O && O.state ? (H = O.state, W < 0 ? (S = 0, W = -W) : (S = 1 + (W >> 4), W < 48 && (W &= 15)), W && (W < 8 || 15 < W) ? w : (H.window !== null && H.wbits !== W && (H.window = null), H.wrap = S, H.wbits = W, A(O))) : w;
      }
      function p(O, W) {
        var S, H;
        return O ? (H = new y(), (O.state = H).window = null, (S = _(O, W)) !== N && (O.state = null), S) : w;
      }
      var P, U, C = true;
      function q(O) {
        if (C) {
          var W;
          for (P = new s.Buf32(512), U = new s.Buf32(32), W = 0; W < 144; ) O.lens[W++] = 8;
          for (; W < 256; ) O.lens[W++] = 9;
          for (; W < 280; ) O.lens[W++] = 7;
          for (; W < 288; ) O.lens[W++] = 8;
          for (T(E, O.lens, 0, 288, P, 0, O.work, { bits: 9 }), W = 0; W < 32; ) O.lens[W++] = 5;
          T(g, O.lens, 0, 32, U, 0, O.work, { bits: 5 }), C = false;
        }
        O.lencode = P, O.lenbits = 9, O.distcode = U, O.distbits = 5;
      }
      function ee(O, W, S, H) {
        var J, $ = O.state;
        return $.window === null && ($.wsize = 1 << $.wbits, $.wnext = 0, $.whave = 0, $.window = new s.Buf8($.wsize)), H >= $.wsize ? (s.arraySet($.window, W, S - $.wsize, $.wsize, 0), $.wnext = 0, $.whave = $.wsize) : (H < (J = $.wsize - $.wnext) && (J = H), s.arraySet($.window, W, S - H, J, $.wnext), (H -= J) ? (s.arraySet($.window, W, S - H, H, 0), $.wnext = H, $.whave = $.wsize) : ($.wnext += J, $.wnext === $.wsize && ($.wnext = 0), $.whave < $.wsize && ($.whave += J))), 0;
      }
      l.inflateReset = A, l.inflateReset2 = _, l.inflateResetKeep = x, l.inflateInit = function(O) {
        return p(O, 15);
      }, l.inflateInit2 = p, l.inflate = function(O, W) {
        var S, H, J, $, oe, Z, re, V, F, X, Y, ne, de, b, h, j, M, ie, D, B, c, G, R, n, i = 0, f = new s.Buf8(4), L = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
        if (!O || !O.state || !O.output || !O.input && O.avail_in !== 0) return w;
        (S = O.state).mode === 12 && (S.mode = 13), oe = O.next_out, J = O.output, re = O.avail_out, $ = O.next_in, H = O.input, Z = O.avail_in, V = S.hold, F = S.bits, X = Z, Y = re, G = N;
        e: for (; ; ) switch (S.mode) {
          case m:
            if (S.wrap === 0) {
              S.mode = 13;
              break;
            }
            for (; F < 16; ) {
              if (Z === 0) break e;
              Z--, V += H[$++] << F, F += 8;
            }
            if (2 & S.wrap && V === 35615) {
              f[S.check = 0] = 255 & V, f[1] = V >>> 8 & 255, S.check = a(S.check, f, 2, 0), F = V = 0, S.mode = 2;
              break;
            }
            if (S.flags = 0, S.head && (S.head.done = false), !(1 & S.wrap) || (((255 & V) << 8) + (V >> 8)) % 31) {
              O.msg = "incorrect header check", S.mode = 30;
              break;
            }
            if ((15 & V) != 8) {
              O.msg = "unknown compression method", S.mode = 30;
              break;
            }
            if (F -= 4, c = 8 + (15 & (V >>>= 4)), S.wbits === 0) S.wbits = c;
            else if (c > S.wbits) {
              O.msg = "invalid window size", S.mode = 30;
              break;
            }
            S.dmax = 1 << c, O.adler = S.check = 1, S.mode = 512 & V ? 10 : 12, F = V = 0;
            break;
          case 2:
            for (; F < 16; ) {
              if (Z === 0) break e;
              Z--, V += H[$++] << F, F += 8;
            }
            if (S.flags = V, (255 & S.flags) != 8) {
              O.msg = "unknown compression method", S.mode = 30;
              break;
            }
            if (57344 & S.flags) {
              O.msg = "unknown header flags set", S.mode = 30;
              break;
            }
            S.head && (S.head.text = V >> 8 & 1), 512 & S.flags && (f[0] = 255 & V, f[1] = V >>> 8 & 255, S.check = a(S.check, f, 2, 0)), F = V = 0, S.mode = 3;
          case 3:
            for (; F < 32; ) {
              if (Z === 0) break e;
              Z--, V += H[$++] << F, F += 8;
            }
            S.head && (S.head.time = V), 512 & S.flags && (f[0] = 255 & V, f[1] = V >>> 8 & 255, f[2] = V >>> 16 & 255, f[3] = V >>> 24 & 255, S.check = a(S.check, f, 4, 0)), F = V = 0, S.mode = 4;
          case 4:
            for (; F < 16; ) {
              if (Z === 0) break e;
              Z--, V += H[$++] << F, F += 8;
            }
            S.head && (S.head.xflags = 255 & V, S.head.os = V >> 8), 512 & S.flags && (f[0] = 255 & V, f[1] = V >>> 8 & 255, S.check = a(S.check, f, 2, 0)), F = V = 0, S.mode = 5;
          case 5:
            if (1024 & S.flags) {
              for (; F < 16; ) {
                if (Z === 0) break e;
                Z--, V += H[$++] << F, F += 8;
              }
              S.length = V, S.head && (S.head.extra_len = V), 512 & S.flags && (f[0] = 255 & V, f[1] = V >>> 8 & 255, S.check = a(S.check, f, 2, 0)), F = V = 0;
            } else S.head && (S.head.extra = null);
            S.mode = 6;
          case 6:
            if (1024 & S.flags && (Z < (ne = S.length) && (ne = Z), ne && (S.head && (c = S.head.extra_len - S.length, S.head.extra || (S.head.extra = new Array(S.head.extra_len)), s.arraySet(S.head.extra, H, $, ne, c)), 512 & S.flags && (S.check = a(S.check, H, ne, $)), Z -= ne, $ += ne, S.length -= ne), S.length)) break e;
            S.length = 0, S.mode = 7;
          case 7:
            if (2048 & S.flags) {
              if (Z === 0) break e;
              for (ne = 0; c = H[$ + ne++], S.head && c && S.length < 65536 && (S.head.name += String.fromCharCode(c)), c && ne < Z; ) ;
              if (512 & S.flags && (S.check = a(S.check, H, ne, $)), Z -= ne, $ += ne, c) break e;
            } else S.head && (S.head.name = null);
            S.length = 0, S.mode = 8;
          case 8:
            if (4096 & S.flags) {
              if (Z === 0) break e;
              for (ne = 0; c = H[$ + ne++], S.head && c && S.length < 65536 && (S.head.comment += String.fromCharCode(c)), c && ne < Z; ) ;
              if (512 & S.flags && (S.check = a(S.check, H, ne, $)), Z -= ne, $ += ne, c) break e;
            } else S.head && (S.head.comment = null);
            S.mode = 9;
          case 9:
            if (512 & S.flags) {
              for (; F < 16; ) {
                if (Z === 0) break e;
                Z--, V += H[$++] << F, F += 8;
              }
              if (V !== (65535 & S.check)) {
                O.msg = "header crc mismatch", S.mode = 30;
                break;
              }
              F = V = 0;
            }
            S.head && (S.head.hcrc = S.flags >> 9 & 1, S.head.done = true), O.adler = S.check = 0, S.mode = 12;
            break;
          case 10:
            for (; F < 32; ) {
              if (Z === 0) break e;
              Z--, V += H[$++] << F, F += 8;
            }
            O.adler = S.check = I(V), F = V = 0, S.mode = 11;
          case 11:
            if (S.havedict === 0) return O.next_out = oe, O.avail_out = re, O.next_in = $, O.avail_in = Z, S.hold = V, S.bits = F, 2;
            O.adler = S.check = 1, S.mode = 12;
          case 12:
            if (W === 5 || W === 6) break e;
          case 13:
            if (S.last) {
              V >>>= 7 & F, F -= 7 & F, S.mode = 27;
              break;
            }
            for (; F < 3; ) {
              if (Z === 0) break e;
              Z--, V += H[$++] << F, F += 8;
            }
            switch (S.last = 1 & V, F -= 1, 3 & (V >>>= 1)) {
              case 0:
                S.mode = 14;
                break;
              case 1:
                if (q(S), S.mode = 20, W !== 6) break;
                V >>>= 2, F -= 2;
                break e;
              case 2:
                S.mode = 17;
                break;
              case 3:
                O.msg = "invalid block type", S.mode = 30;
            }
            V >>>= 2, F -= 2;
            break;
          case 14:
            for (V >>>= 7 & F, F -= 7 & F; F < 32; ) {
              if (Z === 0) break e;
              Z--, V += H[$++] << F, F += 8;
            }
            if ((65535 & V) != (V >>> 16 ^ 65535)) {
              O.msg = "invalid stored block lengths", S.mode = 30;
              break;
            }
            if (S.length = 65535 & V, F = V = 0, S.mode = 15, W === 6) break e;
          case 15:
            S.mode = 16;
          case 16:
            if (ne = S.length) {
              if (Z < ne && (ne = Z), re < ne && (ne = re), ne === 0) break e;
              s.arraySet(J, H, $, ne, oe), Z -= ne, $ += ne, re -= ne, oe += ne, S.length -= ne;
              break;
            }
            S.mode = 12;
            break;
          case 17:
            for (; F < 14; ) {
              if (Z === 0) break e;
              Z--, V += H[$++] << F, F += 8;
            }
            if (S.nlen = 257 + (31 & V), V >>>= 5, F -= 5, S.ndist = 1 + (31 & V), V >>>= 5, F -= 5, S.ncode = 4 + (15 & V), V >>>= 4, F -= 4, 286 < S.nlen || 30 < S.ndist) {
              O.msg = "too many length or distance symbols", S.mode = 30;
              break;
            }
            S.have = 0, S.mode = 18;
          case 18:
            for (; S.have < S.ncode; ) {
              for (; F < 3; ) {
                if (Z === 0) break e;
                Z--, V += H[$++] << F, F += 8;
              }
              S.lens[L[S.have++]] = 7 & V, V >>>= 3, F -= 3;
            }
            for (; S.have < 19; ) S.lens[L[S.have++]] = 0;
            if (S.lencode = S.lendyn, S.lenbits = 7, R = { bits: S.lenbits }, G = T(0, S.lens, 0, 19, S.lencode, 0, S.work, R), S.lenbits = R.bits, G) {
              O.msg = "invalid code lengths set", S.mode = 30;
              break;
            }
            S.have = 0, S.mode = 19;
          case 19:
            for (; S.have < S.nlen + S.ndist; ) {
              for (; j = (i = S.lencode[V & (1 << S.lenbits) - 1]) >>> 16 & 255, M = 65535 & i, !((h = i >>> 24) <= F); ) {
                if (Z === 0) break e;
                Z--, V += H[$++] << F, F += 8;
              }
              if (M < 16) V >>>= h, F -= h, S.lens[S.have++] = M;
              else {
                if (M === 16) {
                  for (n = h + 2; F < n; ) {
                    if (Z === 0) break e;
                    Z--, V += H[$++] << F, F += 8;
                  }
                  if (V >>>= h, F -= h, S.have === 0) {
                    O.msg = "invalid bit length repeat", S.mode = 30;
                    break;
                  }
                  c = S.lens[S.have - 1], ne = 3 + (3 & V), V >>>= 2, F -= 2;
                } else if (M === 17) {
                  for (n = h + 3; F < n; ) {
                    if (Z === 0) break e;
                    Z--, V += H[$++] << F, F += 8;
                  }
                  F -= h, c = 0, ne = 3 + (7 & (V >>>= h)), V >>>= 3, F -= 3;
                } else {
                  for (n = h + 7; F < n; ) {
                    if (Z === 0) break e;
                    Z--, V += H[$++] << F, F += 8;
                  }
                  F -= h, c = 0, ne = 11 + (127 & (V >>>= h)), V >>>= 7, F -= 7;
                }
                if (S.have + ne > S.nlen + S.ndist) {
                  O.msg = "invalid bit length repeat", S.mode = 30;
                  break;
                }
                for (; ne--; ) S.lens[S.have++] = c;
              }
            }
            if (S.mode === 30) break;
            if (S.lens[256] === 0) {
              O.msg = "invalid code -- missing end-of-block", S.mode = 30;
              break;
            }
            if (S.lenbits = 9, R = { bits: S.lenbits }, G = T(E, S.lens, 0, S.nlen, S.lencode, 0, S.work, R), S.lenbits = R.bits, G) {
              O.msg = "invalid literal/lengths set", S.mode = 30;
              break;
            }
            if (S.distbits = 6, S.distcode = S.distdyn, R = { bits: S.distbits }, G = T(g, S.lens, S.nlen, S.ndist, S.distcode, 0, S.work, R), S.distbits = R.bits, G) {
              O.msg = "invalid distances set", S.mode = 30;
              break;
            }
            if (S.mode = 20, W === 6) break e;
          case 20:
            S.mode = 21;
          case 21:
            if (6 <= Z && 258 <= re) {
              O.next_out = oe, O.avail_out = re, O.next_in = $, O.avail_in = Z, S.hold = V, S.bits = F, d(O, Y), oe = O.next_out, J = O.output, re = O.avail_out, $ = O.next_in, H = O.input, Z = O.avail_in, V = S.hold, F = S.bits, S.mode === 12 && (S.back = -1);
              break;
            }
            for (S.back = 0; j = (i = S.lencode[V & (1 << S.lenbits) - 1]) >>> 16 & 255, M = 65535 & i, !((h = i >>> 24) <= F); ) {
              if (Z === 0) break e;
              Z--, V += H[$++] << F, F += 8;
            }
            if (j && (240 & j) == 0) {
              for (ie = h, D = j, B = M; j = (i = S.lencode[B + ((V & (1 << ie + D) - 1) >> ie)]) >>> 16 & 255, M = 65535 & i, !(ie + (h = i >>> 24) <= F); ) {
                if (Z === 0) break e;
                Z--, V += H[$++] << F, F += 8;
              }
              V >>>= ie, F -= ie, S.back += ie;
            }
            if (V >>>= h, F -= h, S.back += h, S.length = M, j === 0) {
              S.mode = 26;
              break;
            }
            if (32 & j) {
              S.back = -1, S.mode = 12;
              break;
            }
            if (64 & j) {
              O.msg = "invalid literal/length code", S.mode = 30;
              break;
            }
            S.extra = 15 & j, S.mode = 22;
          case 22:
            if (S.extra) {
              for (n = S.extra; F < n; ) {
                if (Z === 0) break e;
                Z--, V += H[$++] << F, F += 8;
              }
              S.length += V & (1 << S.extra) - 1, V >>>= S.extra, F -= S.extra, S.back += S.extra;
            }
            S.was = S.length, S.mode = 23;
          case 23:
            for (; j = (i = S.distcode[V & (1 << S.distbits) - 1]) >>> 16 & 255, M = 65535 & i, !((h = i >>> 24) <= F); ) {
              if (Z === 0) break e;
              Z--, V += H[$++] << F, F += 8;
            }
            if ((240 & j) == 0) {
              for (ie = h, D = j, B = M; j = (i = S.distcode[B + ((V & (1 << ie + D) - 1) >> ie)]) >>> 16 & 255, M = 65535 & i, !(ie + (h = i >>> 24) <= F); ) {
                if (Z === 0) break e;
                Z--, V += H[$++] << F, F += 8;
              }
              V >>>= ie, F -= ie, S.back += ie;
            }
            if (V >>>= h, F -= h, S.back += h, 64 & j) {
              O.msg = "invalid distance code", S.mode = 30;
              break;
            }
            S.offset = M, S.extra = 15 & j, S.mode = 24;
          case 24:
            if (S.extra) {
              for (n = S.extra; F < n; ) {
                if (Z === 0) break e;
                Z--, V += H[$++] << F, F += 8;
              }
              S.offset += V & (1 << S.extra) - 1, V >>>= S.extra, F -= S.extra, S.back += S.extra;
            }
            if (S.offset > S.dmax) {
              O.msg = "invalid distance too far back", S.mode = 30;
              break;
            }
            S.mode = 25;
          case 25:
            if (re === 0) break e;
            if (ne = Y - re, S.offset > ne) {
              if ((ne = S.offset - ne) > S.whave && S.sane) {
                O.msg = "invalid distance too far back", S.mode = 30;
                break;
              }
              de = ne > S.wnext ? (ne -= S.wnext, S.wsize - ne) : S.wnext - ne, ne > S.length && (ne = S.length), b = S.window;
            } else b = J, de = oe - S.offset, ne = S.length;
            for (re < ne && (ne = re), re -= ne, S.length -= ne; J[oe++] = b[de++], --ne; ) ;
            S.length === 0 && (S.mode = 21);
            break;
          case 26:
            if (re === 0) break e;
            J[oe++] = S.length, re--, S.mode = 21;
            break;
          case 27:
            if (S.wrap) {
              for (; F < 32; ) {
                if (Z === 0) break e;
                Z--, V |= H[$++] << F, F += 8;
              }
              if (Y -= re, O.total_out += Y, S.total += Y, Y && (O.adler = S.check = S.flags ? a(S.check, J, Y, oe - Y) : u(S.check, J, Y, oe - Y)), Y = re, (S.flags ? V : I(V)) !== S.check) {
                O.msg = "incorrect data check", S.mode = 30;
                break;
              }
              F = V = 0;
            }
            S.mode = 28;
          case 28:
            if (S.wrap && S.flags) {
              for (; F < 32; ) {
                if (Z === 0) break e;
                Z--, V += H[$++] << F, F += 8;
              }
              if (V !== (4294967295 & S.total)) {
                O.msg = "incorrect length check", S.mode = 30;
                break;
              }
              F = V = 0;
            }
            S.mode = 29;
          case 29:
            G = 1;
            break e;
          case 30:
            G = -3;
            break e;
          case 31:
            return -4;
          case 32:
          default:
            return w;
        }
        return O.next_out = oe, O.avail_out = re, O.next_in = $, O.avail_in = Z, S.hold = V, S.bits = F, (S.wsize || Y !== O.avail_out && S.mode < 30 && (S.mode < 27 || W !== 4)) && ee(O, O.output, O.next_out, Y - O.avail_out) ? (S.mode = 31, -4) : (X -= O.avail_in, Y -= O.avail_out, O.total_in += X, O.total_out += Y, S.total += Y, S.wrap && Y && (O.adler = S.check = S.flags ? a(S.check, J, Y, O.next_out - Y) : u(S.check, J, Y, O.next_out - Y)), O.data_type = S.bits + (S.last ? 64 : 0) + (S.mode === 12 ? 128 : 0) + (S.mode === 20 || S.mode === 15 ? 256 : 0), (X == 0 && Y === 0 || W === 4) && G === N && (G = -5), G);
      }, l.inflateEnd = function(O) {
        if (!O || !O.state) return w;
        var W = O.state;
        return W.window && (W.window = null), O.state = null, N;
      }, l.inflateGetHeader = function(O, W) {
        var S;
        return O && O.state ? (2 & (S = O.state).wrap) == 0 ? w : ((S.head = W).done = false, N) : w;
      }, l.inflateSetDictionary = function(O, W) {
        var S, H = W.length;
        return O && O.state ? (S = O.state).wrap !== 0 && S.mode !== 11 ? w : S.mode === 11 && u(1, W, H, 0) !== S.check ? -3 : ee(O, W, H, H) ? (S.mode = 31, -4) : (S.havedict = 1, N) : w;
      }, l.inflateInfo = "pako inflate (from Nodeca project)";
    }, { "../utils/common": 41, "./adler32": 43, "./crc32": 45, "./inffast": 48, "./inftrees": 50 }], 50: [function(r, o, l) {
      var s = r("../utils/common"), u = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0], a = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78], d = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0], T = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
      o.exports = function(E, g, N, w, m, v, k, I) {
        var y, x, A, _, p, P, U, C, q, ee = I.bits, O = 0, W = 0, S = 0, H = 0, J = 0, $ = 0, oe = 0, Z = 0, re = 0, V = 0, F = null, X = 0, Y = new s.Buf16(16), ne = new s.Buf16(16), de = null, b = 0;
        for (O = 0; O <= 15; O++) Y[O] = 0;
        for (W = 0; W < w; W++) Y[g[N + W]]++;
        for (J = ee, H = 15; 1 <= H && Y[H] === 0; H--) ;
        if (H < J && (J = H), H === 0) return m[v++] = 20971520, m[v++] = 20971520, I.bits = 1, 0;
        for (S = 1; S < H && Y[S] === 0; S++) ;
        for (J < S && (J = S), O = Z = 1; O <= 15; O++) if (Z <<= 1, (Z -= Y[O]) < 0) return -1;
        if (0 < Z && (E === 0 || H !== 1)) return -1;
        for (ne[1] = 0, O = 1; O < 15; O++) ne[O + 1] = ne[O] + Y[O];
        for (W = 0; W < w; W++) g[N + W] !== 0 && (k[ne[g[N + W]]++] = W);
        if (P = E === 0 ? (F = de = k, 19) : E === 1 ? (F = u, X -= 257, de = a, b -= 257, 256) : (F = d, de = T, -1), O = S, p = v, oe = W = V = 0, A = -1, _ = (re = 1 << ($ = J)) - 1, E === 1 && 852 < re || E === 2 && 592 < re) return 1;
        for (; ; ) {
          for (U = O - oe, q = k[W] < P ? (C = 0, k[W]) : k[W] > P ? (C = de[b + k[W]], F[X + k[W]]) : (C = 96, 0), y = 1 << O - oe, S = x = 1 << $; m[p + (V >> oe) + (x -= y)] = U << 24 | C << 16 | q | 0, x !== 0; ) ;
          for (y = 1 << O - 1; V & y; ) y >>= 1;
          if (y !== 0 ? (V &= y - 1, V += y) : V = 0, W++, --Y[O] == 0) {
            if (O === H) break;
            O = g[N + k[W]];
          }
          if (J < O && (V & _) !== A) {
            for (oe === 0 && (oe = J), p += S, Z = 1 << ($ = O - oe); $ + oe < H && !((Z -= Y[$ + oe]) <= 0); ) $++, Z <<= 1;
            if (re += 1 << $, E === 1 && 852 < re || E === 2 && 592 < re) return 1;
            m[A = V & _] = J << 24 | $ << 16 | p - v | 0;
          }
        }
        return V !== 0 && (m[p + V] = O - oe << 24 | 4194304), I.bits = J, 0;
      };
    }, { "../utils/common": 41 }], 51: [function(r, o, l) {
      o.exports = { 2: "need dictionary", 1: "stream end", 0: "", "-1": "file error", "-2": "stream error", "-3": "data error", "-4": "insufficient memory", "-5": "buffer error", "-6": "incompatible version" };
    }, {}], 52: [function(r, o, l) {
      var s = r("../utils/common"), u = 0, a = 1;
      function d(i) {
        for (var f = i.length; 0 <= --f; ) i[f] = 0;
      }
      var T = 0, E = 29, g = 256, N = g + 1 + E, w = 30, m = 19, v = 2 * N + 1, k = 15, I = 16, y = 7, x = 256, A = 16, _ = 17, p = 18, P = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0], U = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13], C = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7], q = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], ee = new Array(2 * (N + 2));
      d(ee);
      var O = new Array(2 * w);
      d(O);
      var W = new Array(512);
      d(W);
      var S = new Array(256);
      d(S);
      var H = new Array(E);
      d(H);
      var J, $, oe, Z = new Array(w);
      function re(i, f, L, K, z) {
        this.static_tree = i, this.extra_bits = f, this.extra_base = L, this.elems = K, this.max_length = z, this.has_stree = i && i.length;
      }
      function V(i, f) {
        this.dyn_tree = i, this.max_code = 0, this.stat_desc = f;
      }
      function F(i) {
        return i < 256 ? W[i] : W[256 + (i >>> 7)];
      }
      function X(i, f) {
        i.pending_buf[i.pending++] = 255 & f, i.pending_buf[i.pending++] = f >>> 8 & 255;
      }
      function Y(i, f, L) {
        i.bi_valid > I - L ? (i.bi_buf |= f << i.bi_valid & 65535, X(i, i.bi_buf), i.bi_buf = f >> I - i.bi_valid, i.bi_valid += L - I) : (i.bi_buf |= f << i.bi_valid & 65535, i.bi_valid += L);
      }
      function ne(i, f, L) {
        Y(i, L[2 * f], L[2 * f + 1]);
      }
      function de(i, f) {
        for (var L = 0; L |= 1 & i, i >>>= 1, L <<= 1, 0 < --f; ) ;
        return L >>> 1;
      }
      function b(i, f, L) {
        var K, z, ae = new Array(k + 1), ue = 0;
        for (K = 1; K <= k; K++) ae[K] = ue = ue + L[K - 1] << 1;
        for (z = 0; z <= f; z++) {
          var se = i[2 * z + 1];
          se !== 0 && (i[2 * z] = de(ae[se]++, se));
        }
      }
      function h(i) {
        var f;
        for (f = 0; f < N; f++) i.dyn_ltree[2 * f] = 0;
        for (f = 0; f < w; f++) i.dyn_dtree[2 * f] = 0;
        for (f = 0; f < m; f++) i.bl_tree[2 * f] = 0;
        i.dyn_ltree[2 * x] = 1, i.opt_len = i.static_len = 0, i.last_lit = i.matches = 0;
      }
      function j(i) {
        8 < i.bi_valid ? X(i, i.bi_buf) : 0 < i.bi_valid && (i.pending_buf[i.pending++] = i.bi_buf), i.bi_buf = 0, i.bi_valid = 0;
      }
      function M(i, f, L, K) {
        var z = 2 * f, ae = 2 * L;
        return i[z] < i[ae] || i[z] === i[ae] && K[f] <= K[L];
      }
      function ie(i, f, L) {
        for (var K = i.heap[L], z = L << 1; z <= i.heap_len && (z < i.heap_len && M(f, i.heap[z + 1], i.heap[z], i.depth) && z++, !M(f, K, i.heap[z], i.depth)); ) i.heap[L] = i.heap[z], L = z, z <<= 1;
        i.heap[L] = K;
      }
      function D(i, f, L) {
        var K, z, ae, ue, se = 0;
        if (i.last_lit !== 0) for (; K = i.pending_buf[i.d_buf + 2 * se] << 8 | i.pending_buf[i.d_buf + 2 * se + 1], z = i.pending_buf[i.l_buf + se], se++, K === 0 ? ne(i, z, f) : (ne(i, (ae = S[z]) + g + 1, f), (ue = P[ae]) !== 0 && Y(i, z -= H[ae], ue), ne(i, ae = F(--K), L), (ue = U[ae]) !== 0 && Y(i, K -= Z[ae], ue)), se < i.last_lit; ) ;
        ne(i, x, f);
      }
      function B(i, f) {
        var L, K, z, ae = f.dyn_tree, ue = f.stat_desc.static_tree, se = f.stat_desc.has_stree, fe = f.stat_desc.elems, me = -1;
        for (i.heap_len = 0, i.heap_max = v, L = 0; L < fe; L++) ae[2 * L] !== 0 ? (i.heap[++i.heap_len] = me = L, i.depth[L] = 0) : ae[2 * L + 1] = 0;
        for (; i.heap_len < 2; ) ae[2 * (z = i.heap[++i.heap_len] = me < 2 ? ++me : 0)] = 1, i.depth[z] = 0, i.opt_len--, se && (i.static_len -= ue[2 * z + 1]);
        for (f.max_code = me, L = i.heap_len >> 1; 1 <= L; L--) ie(i, ae, L);
        for (z = fe; L = i.heap[1], i.heap[1] = i.heap[i.heap_len--], ie(i, ae, 1), K = i.heap[1], i.heap[--i.heap_max] = L, i.heap[--i.heap_max] = K, ae[2 * z] = ae[2 * L] + ae[2 * K], i.depth[z] = (i.depth[L] >= i.depth[K] ? i.depth[L] : i.depth[K]) + 1, ae[2 * L + 1] = ae[2 * K + 1] = z, i.heap[1] = z++, ie(i, ae, 1), 2 <= i.heap_len; ) ;
        i.heap[--i.heap_max] = i.heap[1], (function(ve, Ee) {
          var We, Ne, wt, xe, It, Yt, Le = Ee.dyn_tree, Dr = Ee.max_code, yi = Ee.stat_desc.static_tree, bi = Ee.stat_desc.has_stree, _i = Ee.stat_desc.extra_bits, Br = Ee.stat_desc.extra_base, vt = Ee.stat_desc.max_length, Nt = 0;
          for (xe = 0; xe <= k; xe++) ve.bl_count[xe] = 0;
          for (Le[2 * ve.heap[ve.heap_max] + 1] = 0, We = ve.heap_max + 1; We < v; We++) vt < (xe = Le[2 * Le[2 * (Ne = ve.heap[We]) + 1] + 1] + 1) && (xe = vt, Nt++), Le[2 * Ne + 1] = xe, Dr < Ne || (ve.bl_count[xe]++, It = 0, Br <= Ne && (It = _i[Ne - Br]), Yt = Le[2 * Ne], ve.opt_len += Yt * (xe + It), bi && (ve.static_len += Yt * (yi[2 * Ne + 1] + It)));
          if (Nt !== 0) {
            do {
              for (xe = vt - 1; ve.bl_count[xe] === 0; ) xe--;
              ve.bl_count[xe]--, ve.bl_count[xe + 1] += 2, ve.bl_count[vt]--, Nt -= 2;
            } while (0 < Nt);
            for (xe = vt; xe !== 0; xe--) for (Ne = ve.bl_count[xe]; Ne !== 0; ) Dr < (wt = ve.heap[--We]) || (Le[2 * wt + 1] !== xe && (ve.opt_len += (xe - Le[2 * wt + 1]) * Le[2 * wt], Le[2 * wt + 1] = xe), Ne--);
          }
        })(i, f), b(ae, me, i.bl_count);
      }
      function c(i, f, L) {
        var K, z, ae = -1, ue = f[1], se = 0, fe = 7, me = 4;
        for (ue === 0 && (fe = 138, me = 3), f[2 * (L + 1) + 1] = 65535, K = 0; K <= L; K++) z = ue, ue = f[2 * (K + 1) + 1], ++se < fe && z === ue || (se < me ? i.bl_tree[2 * z] += se : z !== 0 ? (z !== ae && i.bl_tree[2 * z]++, i.bl_tree[2 * A]++) : se <= 10 ? i.bl_tree[2 * _]++ : i.bl_tree[2 * p]++, ae = z, me = (se = 0) === ue ? (fe = 138, 3) : z === ue ? (fe = 6, 3) : (fe = 7, 4));
      }
      function G(i, f, L) {
        var K, z, ae = -1, ue = f[1], se = 0, fe = 7, me = 4;
        for (ue === 0 && (fe = 138, me = 3), K = 0; K <= L; K++) if (z = ue, ue = f[2 * (K + 1) + 1], !(++se < fe && z === ue)) {
          if (se < me) for (; ne(i, z, i.bl_tree), --se != 0; ) ;
          else z !== 0 ? (z !== ae && (ne(i, z, i.bl_tree), se--), ne(i, A, i.bl_tree), Y(i, se - 3, 2)) : se <= 10 ? (ne(i, _, i.bl_tree), Y(i, se - 3, 3)) : (ne(i, p, i.bl_tree), Y(i, se - 11, 7));
          ae = z, me = (se = 0) === ue ? (fe = 138, 3) : z === ue ? (fe = 6, 3) : (fe = 7, 4);
        }
      }
      d(Z);
      var R = false;
      function n(i, f, L, K) {
        Y(i, (T << 1) + (K ? 1 : 0), 3), (function(z, ae, ue, se) {
          j(z), X(z, ue), X(z, ~ue), s.arraySet(z.pending_buf, z.window, ae, ue, z.pending), z.pending += ue;
        })(i, f, L);
      }
      l._tr_init = function(i) {
        R || ((function() {
          var f, L, K, z, ae, ue = new Array(k + 1);
          for (z = K = 0; z < E - 1; z++) for (H[z] = K, f = 0; f < 1 << P[z]; f++) S[K++] = z;
          for (S[K - 1] = z, z = ae = 0; z < 16; z++) for (Z[z] = ae, f = 0; f < 1 << U[z]; f++) W[ae++] = z;
          for (ae >>= 7; z < w; z++) for (Z[z] = ae << 7, f = 0; f < 1 << U[z] - 7; f++) W[256 + ae++] = z;
          for (L = 0; L <= k; L++) ue[L] = 0;
          for (f = 0; f <= 143; ) ee[2 * f + 1] = 8, f++, ue[8]++;
          for (; f <= 255; ) ee[2 * f + 1] = 9, f++, ue[9]++;
          for (; f <= 279; ) ee[2 * f + 1] = 7, f++, ue[7]++;
          for (; f <= 287; ) ee[2 * f + 1] = 8, f++, ue[8]++;
          for (b(ee, N + 1, ue), f = 0; f < w; f++) O[2 * f + 1] = 5, O[2 * f] = de(f, 5);
          J = new re(ee, P, g + 1, N, k), $ = new re(O, U, 0, w, k), oe = new re(new Array(0), C, 0, m, y);
        })(), R = true), i.l_desc = new V(i.dyn_ltree, J), i.d_desc = new V(i.dyn_dtree, $), i.bl_desc = new V(i.bl_tree, oe), i.bi_buf = 0, i.bi_valid = 0, h(i);
      }, l._tr_stored_block = n, l._tr_flush_block = function(i, f, L, K) {
        var z, ae, ue = 0;
        0 < i.level ? (i.strm.data_type === 2 && (i.strm.data_type = (function(se) {
          var fe, me = 4093624447;
          for (fe = 0; fe <= 31; fe++, me >>>= 1) if (1 & me && se.dyn_ltree[2 * fe] !== 0) return u;
          if (se.dyn_ltree[18] !== 0 || se.dyn_ltree[20] !== 0 || se.dyn_ltree[26] !== 0) return a;
          for (fe = 32; fe < g; fe++) if (se.dyn_ltree[2 * fe] !== 0) return a;
          return u;
        })(i)), B(i, i.l_desc), B(i, i.d_desc), ue = (function(se) {
          var fe;
          for (c(se, se.dyn_ltree, se.l_desc.max_code), c(se, se.dyn_dtree, se.d_desc.max_code), B(se, se.bl_desc), fe = m - 1; 3 <= fe && se.bl_tree[2 * q[fe] + 1] === 0; fe--) ;
          return se.opt_len += 3 * (fe + 1) + 5 + 5 + 4, fe;
        })(i), z = i.opt_len + 3 + 7 >>> 3, (ae = i.static_len + 3 + 7 >>> 3) <= z && (z = ae)) : z = ae = L + 5, L + 4 <= z && f !== -1 ? n(i, f, L, K) : i.strategy === 4 || ae === z ? (Y(i, 2 + (K ? 1 : 0), 3), D(i, ee, O)) : (Y(i, 4 + (K ? 1 : 0), 3), (function(se, fe, me, ve) {
          var Ee;
          for (Y(se, fe - 257, 5), Y(se, me - 1, 5), Y(se, ve - 4, 4), Ee = 0; Ee < ve; Ee++) Y(se, se.bl_tree[2 * q[Ee] + 1], 3);
          G(se, se.dyn_ltree, fe - 1), G(se, se.dyn_dtree, me - 1);
        })(i, i.l_desc.max_code + 1, i.d_desc.max_code + 1, ue + 1), D(i, i.dyn_ltree, i.dyn_dtree)), h(i), K && j(i);
      }, l._tr_tally = function(i, f, L) {
        return i.pending_buf[i.d_buf + 2 * i.last_lit] = f >>> 8 & 255, i.pending_buf[i.d_buf + 2 * i.last_lit + 1] = 255 & f, i.pending_buf[i.l_buf + i.last_lit] = 255 & L, i.last_lit++, f === 0 ? i.dyn_ltree[2 * L]++ : (i.matches++, f--, i.dyn_ltree[2 * (S[L] + g + 1)]++, i.dyn_dtree[2 * F(f)]++), i.last_lit === i.lit_bufsize - 1;
      }, l._tr_align = function(i) {
        Y(i, 2, 3), ne(i, x, ee), (function(f) {
          f.bi_valid === 16 ? (X(f, f.bi_buf), f.bi_buf = 0, f.bi_valid = 0) : 8 <= f.bi_valid && (f.pending_buf[f.pending++] = 255 & f.bi_buf, f.bi_buf >>= 8, f.bi_valid -= 8);
        })(i);
      };
    }, { "../utils/common": 41 }], 53: [function(r, o, l) {
      o.exports = function() {
        this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
      };
    }, {}], 54: [function(r, o, l) {
      (function(s) {
        (function(u, a) {
          if (!u.setImmediate) {
            var d, T, E, g, N = 1, w = {}, m = false, v = u.document, k = Object.getPrototypeOf && Object.getPrototypeOf(u);
            k = k && k.setTimeout ? k : u, d = {}.toString.call(u.process) === "[object process]" ? function(A) {
              ge.nextTick(function() {
                y(A);
              });
            } : (function() {
              if (u.postMessage && !u.importScripts) {
                var A = true, _ = u.onmessage;
                return u.onmessage = function() {
                  A = false;
                }, u.postMessage("", "*"), u.onmessage = _, A;
              }
            })() ? (g = "setImmediate$" + Math.random() + "$", u.addEventListener ? u.addEventListener("message", x, false) : u.attachEvent("onmessage", x), function(A) {
              u.postMessage(g + A, "*");
            }) : u.MessageChannel ? ((E = new MessageChannel()).port1.onmessage = function(A) {
              y(A.data);
            }, function(A) {
              E.port2.postMessage(A);
            }) : v && "onreadystatechange" in v.createElement("script") ? (T = v.documentElement, function(A) {
              var _ = v.createElement("script");
              _.onreadystatechange = function() {
                y(A), _.onreadystatechange = null, T.removeChild(_), _ = null;
              }, T.appendChild(_);
            }) : function(A) {
              setTimeout(y, 0, A);
            }, k.setImmediate = function(A) {
              typeof A != "function" && (A = new Function("" + A));
              for (var _ = new Array(arguments.length - 1), p = 0; p < _.length; p++) _[p] = arguments[p + 1];
              return w[N] = { callback: A, args: _ }, d(N), N++;
            }, k.clearImmediate = I;
          }
          function I(A) {
            delete w[A];
          }
          function y(A) {
            if (m) setTimeout(y, 0, A);
            else {
              var _ = w[A];
              if (_) {
                m = true;
                try {
                  (function(p) {
                    var P = p.callback, U = p.args;
                    switch (U.length) {
                      case 0:
                        P();
                        break;
                      case 1:
                        P(U[0]);
                        break;
                      case 2:
                        P(U[0], U[1]);
                        break;
                      case 3:
                        P(U[0], U[1], U[2]);
                        break;
                      default:
                        P.apply(a, U);
                    }
                  })(_);
                } finally {
                  I(A), m = false;
                }
              }
            }
          }
          function x(A) {
            A.source === u && typeof A.data == "string" && A.data.indexOf(g) === 0 && y(+A.data.slice(g.length));
          }
        })(typeof self > "u" ? s === void 0 ? this : s : self);
      }).call(this, typeof ke < "u" ? ke : typeof self < "u" ? self : typeof window < "u" ? window : {});
    }, {}] }, {}, [10])(10);
  });
})), Cc = ce(((e, t) => {
  var r = { "&": "&amp;", '"': "&quot;", "'": "&apos;", "<": "&lt;", ">": "&gt;" };
  function o(l) {
    return l && l.replace ? l.replace(/([&"<>'])/g, function(s, u) {
      return r[u];
    }) : l;
  }
  t.exports = o;
})), Ic = ce(((e, t) => {
  qe();
  var r = Cc(), o = Ar().Stream, l = "    ";
  function s(g, N) {
    typeof N != "object" && (N = { indent: N });
    var w = N.stream ? new o() : null, m = "", v = false, k = N.indent ? N.indent === true ? l : N.indent : "", I = true;
    function y(P) {
      I ? ge.nextTick(P) : P();
    }
    function x(P, U) {
      if (U !== void 0 && (m += U), P && !v && (w = w || new o(), v = true), P && v) {
        var C = m;
        y(function() {
          w.emit("data", C);
        }), m = "";
      }
    }
    function A(P, U) {
      T(x, d(P, k, k ? 1 : 0), U);
    }
    function _() {
      if (w) {
        var P = m;
        y(function() {
          w.emit("data", P), w.emit("end"), w.readable = false, w.emit("close");
        });
      }
    }
    function p(P) {
      var U = { version: "1.0", encoding: P.encoding || "UTF-8" };
      P.standalone && (U.standalone = P.standalone), A({ "?xml": { _attr: U } }), m = m.replace("/>", "?>");
    }
    return y(function() {
      I = false;
    }), N.declaration && p(N.declaration), g && g.forEach ? g.forEach(function(P, U) {
      var C;
      U + 1 === g.length && (C = _), A(P, C);
    }) : A(g, _), w ? (w.readable = true, w) : m;
  }
  function u() {
    var g = { _elem: d(Array.prototype.slice.call(arguments)) };
    return g.push = function(N) {
      if (!this.append) throw new Error("not assigned to a parent!");
      var w = this, m = this._elem.indent;
      T(this.append, d(N, m, this._elem.icount + (m ? 1 : 0)), function() {
        w.append(true);
      });
    }, g.close = function(N) {
      N !== void 0 && this.push(N), this.end && this.end();
    }, g;
  }
  function a(g, N) {
    return new Array(N || 0).join(g || "");
  }
  function d(g, N, w) {
    w = w || 0;
    var m = a(N, w), v, k = g, I = false;
    if (typeof g == "object" && (v = Object.keys(g)[0], k = g[v], k && k._elem)) return k._elem.name = v, k._elem.icount = w, k._elem.indent = N, k._elem.indents = m, k._elem.interrupt = k, k._elem;
    var y = [], x = [], A;
    function _(p) {
      Object.keys(p).forEach(function(P) {
        y.push(E(P, p[P]));
      });
    }
    switch (typeof k) {
      case "object":
        if (k === null) break;
        k._attr && _(k._attr), k._cdata && x.push(("<![CDATA[" + k._cdata).replace(/\]\]>/g, "]]]]><![CDATA[>") + "]]>"), k.forEach && (A = false, x.push(""), k.forEach(function(p) {
          typeof p == "object" ? Object.keys(p)[0] == "_attr" ? _(p._attr) : x.push(d(p, N, w + 1)) : (x.pop(), A = true, x.push(r(p)));
        }), A || x.push(""));
        break;
      default:
        x.push(r(k));
    }
    return { name: v, interrupt: I, attributes: y, content: x, icount: w, indents: m, indent: N };
  }
  function T(g, N, w) {
    if (typeof N != "object") return g(false, N);
    var m = N.interrupt ? 1 : N.content.length;
    function v() {
      for (; N.content.length; ) {
        var I = N.content.shift();
        if (I !== void 0) {
          if (k(I)) return;
          T(g, I);
        }
      }
      g(false, (m > 1 ? N.indents : "") + (N.name ? "</" + N.name + ">" : "") + (N.indent && !w ? `
` : "")), w && w();
    }
    function k(I) {
      return I.interrupt ? (I.interrupt.append = g, I.interrupt.end = v, I.interrupt = false, g(true), true) : false;
    }
    if (g(false, N.indents + (N.name ? "<" + N.name : "") + (N.attributes.length ? " " + N.attributes.join(" ") : "") + (m ? N.name ? ">" : "" : N.name ? "/>" : "") + (N.indent && m > 1 ? `
` : "")), !m) return g(false, N.indent ? `
` : "");
    k(N) || v();
  }
  function E(g, N) {
    return g + '="' + r(N) + '"';
  }
  t.exports = s, t.exports.element = t.exports.Element = u;
})), Nc = Ar(), Oc = yr(Rc()), ye = yr(Ic()), bt = 0, fr = 32, Pc = 32, Fc = (e, t) => {
  const r = t.replace(/-/g, "");
  if (r.length !== Pc) throw new Error(`Error: Cannot extract GUID from font filename: ${t}`);
  const o = r.replace(/(..)/g, "$1 ").trim().split(" ").map((u) => parseInt(u, 16));
  o.reverse();
  const l = e.slice(bt, fr).map((u, a) => u ^ o[a % o.length]), s = new Uint8Array(bt + l.length + Math.max(0, e.length - fr));
  return s.set(e.slice(0, bt)), s.set(l, bt), s.set(e.slice(fr), bt + l.length), s;
}, Dc = class {
  format(e, t = { stack: [] }) {
    const r = e.prepForXml(t);
    if (r) return r;
    throw Error("XMLComponent did not format correctly");
  }
}, Bc = class {
  replace(e, t, r) {
    let o = e;
    return t.forEach((l, s) => {
      o = o.replace(new RegExp(`{${l.fileName}}`, "g"), (r + s).toString());
    }), o;
  }
  getMediaData(e, t) {
    return t.Array.filter((r) => e.search(`{${r.fileName}}`) > 0);
  }
}, Lc = class {
  replace(e, t) {
    let r = e;
    for (const o of t) r = r.replace(new RegExp(`{${o.reference}-${o.instance}}`, "g"), o.numId.toString());
    return r;
  }
}, Mc = class {
  constructor() {
    Q(this, "formatter", void 0), Q(this, "imageReplacer", void 0), Q(this, "numberingReplacer", void 0), this.formatter = new Dc(), this.imageReplacer = new Bc(), this.numberingReplacer = new Lc();
  }
  compile(e, t, r = []) {
    const o = new Oc.default(), l = this.xmlifyFile(e, t), s = new Map(Object.entries(l));
    for (const [, u] of s) if (Array.isArray(u)) for (const a of u) o.file(a.path, tr(a.data));
    else o.file(u.path, tr(u.data));
    for (const u of r) o.file(u.path, tr(u.data));
    for (const u of e.Media.Array) u.type !== "svg" ? o.file(`word/media/${u.fileName}`, u.data) : (o.file(`word/media/${u.fileName}`, u.data), o.file(`word/media/${u.fallback.fileName}`, u.fallback.data));
    for (const [u, { data: a, fontKey: d }] of e.FontTable.fontOptionsWithKey.entries()) o.file(`word/fonts/font${u + 1}.odttf`, Fc(a, d));
    return o;
  }
  xmlifyFile(e, t) {
    const r = e.Document.Relationships.RelationshipCount + 1, o = (0, ye.default)(this.formatter.format(e.Document.View, { viewWrapper: e.Document, file: e, stack: [] }), { indent: t, declaration: { standalone: "yes", encoding: "UTF-8" } }), l = e.Comments.Relationships.RelationshipCount + 1, s = (0, ye.default)(this.formatter.format(e.Comments, { viewWrapper: { View: e.Comments, Relationships: e.Comments.Relationships }, file: e, stack: [] }), { indent: t, declaration: { standalone: "yes", encoding: "UTF-8" } }), u = e.FootNotes.Relationships.RelationshipCount + 1, a = (0, ye.default)(this.formatter.format(e.FootNotes.View, { viewWrapper: e.FootNotes, file: e, stack: [] }), { indent: t, declaration: { standalone: "yes", encoding: "UTF-8" } }), d = this.imageReplacer.getMediaData(o, e.Media), T = this.imageReplacer.getMediaData(s, e.Media), E = this.imageReplacer.getMediaData(a, e.Media);
    return pe(pe({ Relationships: { data: (d.forEach((g, N) => {
      e.Document.Relationships.addRelationship(r + N, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image", `media/${g.fileName}`);
    }), e.Document.Relationships.addRelationship(e.Document.Relationships.RelationshipCount + 1, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/fontTable", "fontTable.xml"), (0, ye.default)(this.formatter.format(e.Document.Relationships, { viewWrapper: e.Document, file: e, stack: [] }), { indent: t, declaration: { encoding: "UTF-8" } })), path: "word/_rels/document.xml.rels" }, Document: { data: (() => {
      const g = this.imageReplacer.replace(o, d, r);
      return this.numberingReplacer.replace(g, e.Numbering.ConcreteNumbering);
    })(), path: "word/document.xml" }, Styles: { data: (() => {
      const g = (0, ye.default)(this.formatter.format(e.Styles, { viewWrapper: e.Document, file: e, stack: [] }), { indent: t, declaration: { standalone: "yes", encoding: "UTF-8" } });
      return this.numberingReplacer.replace(g, e.Numbering.ConcreteNumbering);
    })(), path: "word/styles.xml" }, Properties: { data: (0, ye.default)(this.formatter.format(e.CoreProperties, { viewWrapper: e.Document, file: e, stack: [] }), { indent: t, declaration: { standalone: "yes", encoding: "UTF-8" } }), path: "docProps/core.xml" }, Numbering: { data: (0, ye.default)(this.formatter.format(e.Numbering, { viewWrapper: e.Document, file: e, stack: [] }), { indent: t, declaration: { standalone: "yes", encoding: "UTF-8" } }), path: "word/numbering.xml" }, FileRelationships: { data: (0, ye.default)(this.formatter.format(e.FileRelationships, { viewWrapper: e.Document, file: e, stack: [] }), { indent: t, declaration: { encoding: "UTF-8" } }), path: "_rels/.rels" }, HeaderRelationships: e.Headers.map((g, N) => {
      const w = (0, ye.default)(this.formatter.format(g.View, { viewWrapper: g, file: e, stack: [] }), { indent: t, declaration: { encoding: "UTF-8" } });
      return this.imageReplacer.getMediaData(w, e.Media).forEach((m, v) => {
        g.Relationships.addRelationship(v, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image", `media/${m.fileName}`);
      }), { data: (0, ye.default)(this.formatter.format(g.Relationships, { viewWrapper: g, file: e, stack: [] }), { indent: t, declaration: { encoding: "UTF-8" } }), path: `word/_rels/header${N + 1}.xml.rels` };
    }), FooterRelationships: e.Footers.map((g, N) => {
      const w = (0, ye.default)(this.formatter.format(g.View, { viewWrapper: g, file: e, stack: [] }), { indent: t, declaration: { encoding: "UTF-8" } });
      return this.imageReplacer.getMediaData(w, e.Media).forEach((m, v) => {
        g.Relationships.addRelationship(v, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image", `media/${m.fileName}`);
      }), { data: (0, ye.default)(this.formatter.format(g.Relationships, { viewWrapper: g, file: e, stack: [] }), { indent: t, declaration: { encoding: "UTF-8" } }), path: `word/_rels/footer${N + 1}.xml.rels` };
    }), Headers: e.Headers.map((g, N) => {
      const w = (0, ye.default)(this.formatter.format(g.View, { viewWrapper: g, file: e, stack: [] }), { indent: t, declaration: { encoding: "UTF-8" } }), m = this.imageReplacer.getMediaData(w, e.Media), v = this.imageReplacer.replace(w, m, 0);
      return { data: this.numberingReplacer.replace(v, e.Numbering.ConcreteNumbering), path: `word/header${N + 1}.xml` };
    }), Footers: e.Footers.map((g, N) => {
      const w = (0, ye.default)(this.formatter.format(g.View, { viewWrapper: g, file: e, stack: [] }), { indent: t, declaration: { encoding: "UTF-8" } }), m = this.imageReplacer.getMediaData(w, e.Media), v = this.imageReplacer.replace(w, m, 0);
      return { data: this.numberingReplacer.replace(v, e.Numbering.ConcreteNumbering), path: `word/footer${N + 1}.xml` };
    }), ContentTypes: { data: (0, ye.default)(this.formatter.format(e.ContentTypes, { viewWrapper: e.Document, file: e, stack: [] }), { indent: t, declaration: { encoding: "UTF-8" } }), path: "[Content_Types].xml" }, CustomProperties: { data: (0, ye.default)(this.formatter.format(e.CustomProperties, { viewWrapper: e.Document, file: e, stack: [] }), { indent: t, declaration: { standalone: "yes", encoding: "UTF-8" } }), path: "docProps/custom.xml" }, AppProperties: { data: (0, ye.default)(this.formatter.format(e.AppProperties, { viewWrapper: e.Document, file: e, stack: [] }), { indent: t, declaration: { standalone: "yes", encoding: "UTF-8" } }), path: "docProps/app.xml" }, FootNotes: { data: (() => {
      const g = this.imageReplacer.replace(a, E, u);
      return this.numberingReplacer.replace(g, e.Numbering.ConcreteNumbering);
    })(), path: "word/footnotes.xml" }, FootNotesRelationships: { data: (E.forEach((g, N) => {
      e.FootNotes.Relationships.addRelationship(u + N, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image", `media/${g.fileName}`);
    }), (0, ye.default)(this.formatter.format(e.FootNotes.Relationships, { viewWrapper: e.FootNotes, file: e, stack: [] }), { indent: t, declaration: { encoding: "UTF-8" } })), path: "word/_rels/footnotes.xml.rels" }, Endnotes: { data: (0, ye.default)(this.formatter.format(e.Endnotes.View, { viewWrapper: e.Endnotes, file: e, stack: [] }), { indent: t, declaration: { encoding: "UTF-8" } }), path: "word/endnotes.xml" }, EndnotesRelationships: { data: (0, ye.default)(this.formatter.format(e.Endnotes.Relationships, { viewWrapper: e.Endnotes, file: e, stack: [] }), { indent: t, declaration: { encoding: "UTF-8" } }), path: "word/_rels/endnotes.xml.rels" }, Settings: { data: (0, ye.default)(this.formatter.format(e.Settings, { viewWrapper: e.Document, file: e, stack: [] }), { indent: t, declaration: { standalone: "yes", encoding: "UTF-8" } }), path: "word/settings.xml" }, Comments: { data: (() => {
      const g = this.imageReplacer.replace(s, T, l);
      return this.numberingReplacer.replace(g, e.Numbering.ConcreteNumbering);
    })(), path: "word/comments.xml" }, CommentsRelationships: { data: (T.forEach((g, N) => {
      e.Comments.Relationships.addRelationship(l + N, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image", `media/${g.fileName}`);
    }), (0, ye.default)(this.formatter.format(e.Comments.Relationships, { viewWrapper: { View: e.Comments, Relationships: e.Comments.Relationships }, file: e, stack: [] }), { indent: t, declaration: { encoding: "UTF-8" } })), path: "word/_rels/comments.xml.rels" } }, e.CommentsExtended ? { CommentsExtended: { data: (0, ye.default)(this.formatter.format(e.CommentsExtended, { viewWrapper: { View: e.CommentsExtended, Relationships: e.Comments.Relationships }, file: e, stack: [] }), { indent: t, declaration: { standalone: "yes", encoding: "UTF-8" } }), path: "word/commentsExtended.xml" } } : {}), {}, { FontTable: { data: (0, ye.default)(this.formatter.format(e.FontTable.View, { viewWrapper: e.Document, file: e, stack: [] }), { indent: t, declaration: { standalone: "yes", encoding: "UTF-8" } }), path: "word/fontTable.xml" }, FontTableRelationships: { data: (0, ye.default)(this.formatter.format(e.FontTable.Relationships, { viewWrapper: e.Document, file: e, stack: [] }), { indent: t, declaration: { encoding: "UTF-8" } }), path: "word/_rels/fontTable.xml.rels" } });
  }
};
function on(e, t, r, o, l, s, u) {
  try {
    var a = e[s](u), d = a.value;
  } catch (T) {
    r(T);
    return;
  }
  a.done ? t(d) : Promise.resolve(d).then(o, l);
}
function Uc(e) {
  return function() {
    var t = this, r = arguments;
    return new Promise(function(o, l) {
      var s = e.apply(t, r);
      function u(d) {
        on(s, o, l, u, a, "next", d);
      }
      function a(d) {
        on(s, o, l, u, a, "throw", d);
      }
      u(void 0);
    });
  };
}
var jc = { WITH_2_BLANKS: "  " }, un = (e) => e === true ? jc.WITH_2_BLANKS : e === false ? void 0 : e, zc = class at {
  static pack(t, r, o) {
    var l = this;
    return Uc(function* (s, u, a, d = []) {
      return l.compiler.compile(s, un(a), d).generateAsync({ type: u, mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", compression: "DEFLATE" });
    }).apply(this, arguments);
  }
  static toString(t, r, o = []) {
    return at.pack(t, "string", r, o);
  }
  static toBuffer(t, r, o = []) {
    return at.pack(t, "nodebuffer", r, o);
  }
  static toBase64String(t, r, o = []) {
    return at.pack(t, "base64", r, o);
  }
  static toBlob(t, r, o = []) {
    return at.pack(t, "blob", r, o);
  }
  static toArrayBuffer(t, r, o = []) {
    return at.pack(t, "arraybuffer", r, o);
  }
  static toStream(t, r, o = []) {
    const l = new Nc.Stream();
    return this.compiler.compile(t, un(r), o).generateAsync({ type: "nodebuffer", mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", compression: "DEFLATE" }).then((s) => {
      l.emit("data", s), l.emit("end");
    }), l;
  }
};
Q(zc, "compiler", new Mc());
export {
  nn as AbstractNumbering,
  Oe as AlignmentType,
  Ae as Attributes,
  Ut as BaseXmlComponent,
  ul as Body,
  Wo as Bookmark,
  Ko as BookmarkEnd,
  Ho as BookmarkStart,
  Da as Border,
  Or as BorderStyle,
  he as BuilderElement,
  bu as CellMerge,
  yu as CellMergeAttributes,
  ah as CheckBox,
  hr as CheckBoxSymbolElement,
  kc as CheckBoxUtil,
  $r as Comment,
  Ao as Comments,
  Io as CommentsExtended,
  Vt as ConcreteHyperlink,
  an as ConcreteNumbering,
  gu as DeletedTableCell,
  wu as DeletedTableRow,
  nh as Document,
  Yr as DocumentAttributeNamespaces,
  Zt as DocumentAttributes,
  cl as DocumentBackground,
  ll as DocumentBackgroundAttributes,
  _c as DocumentDefaults,
  vo as Drawing,
  Ii as EMPTY_OBJECT,
  Ga as EmphasisMarkType,
  Fa as EmptyElement,
  No as EndnoteReference,
  gl as Endnotes,
  Uo as ExternalHyperlink,
  nh as File,
  ti as FileChild,
  Tc as FootNoteReferenceRunAttributes,
  kl as FootNotes,
  xl as FooterWrapper,
  Ac as FootnoteReference,
  ih as FootnoteReferenceRun,
  ku as GridSpan,
  st as HeaderFooterReferenceType,
  Qr as HeaderFooterType,
  Nl as HeaderWrapper,
  Hc as HeadingLevel,
  bs as HorizontalPositionRelativeFrom,
  Qt as HpsMeasureElement,
  Ke as IgnoreIfEmptyXmlComponent,
  Wc as ImageRun,
  ka as ImportedRootElementAttributes,
  Aa as ImportedXmlComponent,
  Fn as InitializableXmlComponent,
  vu as InsertedTableCell,
  mu as InsertedTableRow,
  Kc as InternalHyperlink,
  jl as Level,
  Ul as LevelBase,
  je as LevelFormat,
  ql as LevelOverride,
  ht as LineRuleType,
  Gc as Math,
  uu as MathDegree,
  Qo as MathDenominator,
  Vc as MathFraction,
  Xc as MathIntegral,
  eu as MathNumerator,
  Qc as MathRadical,
  hu as MathRadicalProperties,
  qc as MathRun,
  Yc as MathSubScript,
  Jc as MathSubSuperScript,
  $c as MathSum,
  Zc as MathSuperScript,
  Ol as Media,
  hn as NextAttributeComponent,
  ir as NumberProperties,
  Et as NumberValueElement,
  Xl as Numbering,
  le as OnOffElement,
  zc as Packer,
  el as PageBorders,
  Oo as PageBreakBefore,
  Bt as PageNumber,
  gr as PageOrientation,
  al as PageTextDirection,
  rt as Paragraph,
  tt as ParagraphProperties,
  Yo as ParagraphPropertiesChange,
  yc as ParagraphPropertiesDefaults,
  ts as ParagraphRunProperties,
  jc as PrettifyType,
  $e as Run,
  Ve as RunProperties,
  rs as RunPropertiesChange,
  bc as RunPropertiesDefaults,
  pi as SectionProperties,
  ol as SectionPropertiesChange,
  lt as SpaceType,
  Ye as StringContainer,
  He as StringValueElement,
  mt as StyleForCharacter,
  Ct as StyleForParagraph,
  lr as Styles,
  is as SymbolRun,
  Iu as TDirection,
  Xr as TabStopType,
  th as Table,
  ci as TableBorders,
  li as TableCell,
  Tu as TableCellBorders,
  fi as TableProperties,
  rh as TableRow,
  di as TableRowProperties,
  Uu as TableRowPropertiesChange,
  Wr as TextRun,
  oo as TextWrappingSide,
  Lt as TextWrappingType,
  Ba as ThematicBreak,
  Un as UnderlineType,
  eh as VerticalAlign,
  xu as VerticalAlignSection,
  _u as VerticalAlignTable,
  Zr as VerticalMerge,
  oi as VerticalMergeType,
  _s as VerticalPositionRelativeFrom,
  vr as WidthType,
  we as XmlAttributeComponent,
  te as XmlComponent,
  ms as abstractNumUniqueNumericIdGen,
  gs as bookmarkUniqueNumericIdGen,
  To as commentIdToParaId,
  ws as concreteNumUniqueNumericIdGen,
  Ie as convertInchesToTwip,
  Cr as convertToXmlComponent,
  Ln as createAlignment,
  Ts as createBodyProperties,
  be as createBorderElement,
  Yu as createColumns,
  Ju as createDocumentGrid,
  qa as createEmphasisMark,
  Zo as createFrameProperties,
  ar as createHeaderFooterReference,
  Es as createHorizontalPosition,
  La as createIndent,
  Qu as createLineNumberType,
  tu as createMathAccentCharacter,
  pt as createMathBase,
  ru as createMathLimitLocation,
  ni as createMathNAryProperties,
  $t as createMathSubScriptElement,
  su as createMathSubScriptProperties,
  ou as createMathSubSuperScriptProperties,
  Xt as createMathSuperScriptElement,
  au as createMathSuperScriptProperties,
  Go as createOutlineLevel,
  tl as createPageMargin,
  rl as createPageNumberType,
  nl as createPageSize,
  _t as createParagraphStyle,
  er as createRunFonts,
  sl as createSectionType,
  Gt as createShading,
  xs as createSimplePos,
  Po as createSpacing,
  gt as createStringElement,
  Do as createTabStop,
  Fo as createTabStopItem,
  Pu as createTableFloatProperties,
  Fu as createTableLayout,
  Bu as createTableLook,
  Mu as createTableRowHeight,
  jt as createTableWidthElement,
  es as createUnderline,
  ai as createVerticalAlign,
  Ss as createVerticalPosition,
  Vr as createWrapNone,
  uo as createWrapSquare,
  lo as createWrapTight,
  co as createWrapTopAndBottom,
  Pa as dateTimeValue,
  Te as decimalNumber,
  vs as docPropertiesUniqueNumericIdGen,
  Na as eighthPointMeasureValue,
  tr as encodeUtf8,
  Kr as hashedId,
  ut as hexColorValue,
  Ca as hpsMeasureValue,
  Bn as measurementOrPercentValue,
  Ia as percentageValue,
  Oa as pointMeasureValue,
  Dn as positiveUniversalMeasureValue,
  Je as sectionMarginDefaults,
  sr as sectionPageSizeDefaults,
  Ra as shortHexNumber,
  ze as signedTwipsMeasureValue,
  yo as standardizeData,
  Se as twipsMeasureValue,
  jr as uCharHexNumber,
  Hn as uniqueId,
  qt as uniqueNumericIdCreator,
  ys as uniqueUuid,
  Nr as universalMeasureValue,
  Kt as unsignedDecimalNumber
};
