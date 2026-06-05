function Se(e, r) {
  for (var n = 0; n < r.length; n++) {
    const o = r[n];
    if (typeof o != "string" && !Array.isArray(o)) {
      for (const i in o) if (i !== "default" && !(i in e)) {
        const c = Object.getOwnPropertyDescriptor(o, i);
        c && Object.defineProperty(e, i, c.get ? c : { enumerable: true, get: () => o[i] });
      }
    }
  }
  return Object.freeze(Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }));
}
var Ut = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Me(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var ie = { exports: {} }, l = {};
/**
* @license React
* react.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var fe;
function Pe() {
  if (fe) return l;
  fe = 1;
  var e = Symbol.for("react.transitional.element"), r = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), o = Symbol.for("react.strict_mode"), i = Symbol.for("react.profiler"), c = Symbol.for("react.consumer"), m = Symbol.for("react.context"), w = Symbol.for("react.forward_ref"), b = Symbol.for("react.suspense"), j = Symbol.for("react.memo"), C = Symbol.for("react.lazy"), P = Symbol.for("react.activity"), z = Symbol.iterator;
  function B(t) {
    return t === null || typeof t != "object" ? null : (t = z && t[z] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var k = { isMounted: function() {
    return false;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, V = Object.assign, W = {};
  function A(t, u, s) {
    this.props = t, this.context = u, this.refs = W, this.updater = s || k;
  }
  A.prototype.isReactComponent = {}, A.prototype.setState = function(t, u) {
    if (typeof t != "object" && typeof t != "function" && t != null) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, t, u, "setState");
  }, A.prototype.forceUpdate = function(t) {
    this.updater.enqueueForceUpdate(this, t, "forceUpdate");
  };
  function T() {
  }
  T.prototype = A.prototype;
  function L(t, u, s) {
    this.props = t, this.context = u, this.refs = W, this.updater = s || k;
  }
  var H = L.prototype = new T();
  H.constructor = L, V(H, A.prototype), H.isPureReactComponent = true;
  var O = Array.isArray;
  function _() {
  }
  var f = { H: null, A: null, T: null, S: null }, D = Object.prototype.hasOwnProperty;
  function R(t, u, s) {
    var a = s.ref;
    return { $$typeof: e, type: t, key: u, ref: a !== void 0 ? a : null, props: s };
  }
  function g(t, u) {
    return R(t.type, u, t.props);
  }
  function I(t) {
    return typeof t == "object" && t !== null && t.$$typeof === e;
  }
  function G(t) {
    var u = { "=": "=0", ":": "=2" };
    return "$" + t.replace(/[=:]/g, function(s) {
      return u[s];
    });
  }
  var U = /\/+/g;
  function N(t, u) {
    return typeof t == "object" && t !== null && t.key != null ? G("" + t.key) : u.toString(36);
  }
  function y(t) {
    switch (t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw t.reason;
      default:
        switch (typeof t.status == "string" ? t.then(_, _) : (t.status = "pending", t.then(function(u) {
          t.status === "pending" && (t.status = "fulfilled", t.value = u);
        }, function(u) {
          t.status === "pending" && (t.status = "rejected", t.reason = u);
        })), t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw t.reason;
        }
    }
    throw t;
  }
  function E(t, u, s, a, d) {
    var v = typeof t;
    (v === "undefined" || v === "boolean") && (t = null);
    var h = false;
    if (t === null) h = true;
    else switch (v) {
      case "bigint":
      case "string":
      case "number":
        h = true;
        break;
      case "object":
        switch (t.$$typeof) {
          case e:
          case r:
            h = true;
            break;
          case C:
            return h = t._init, E(h(t._payload), u, s, a, d);
        }
    }
    if (h) return d = d(t), h = a === "" ? "." + N(t, 0) : a, O(d) ? (s = "", h != null && (s = h.replace(U, "$&/") + "/"), E(d, u, s, "", function(Te) {
      return Te;
    })) : d != null && (I(d) && (d = g(d, s + (d.key == null || t && t.key === d.key ? "" : ("" + d.key).replace(U, "$&/") + "/") + h)), u.push(d)), 1;
    h = 0;
    var $ = a === "" ? "." : a + ":";
    if (O(t)) for (var S = 0; S < t.length; S++) a = t[S], v = $ + N(a, S), h += E(a, u, s, v, d);
    else if (S = B(t), typeof S == "function") for (t = S.call(t), S = 0; !(a = t.next()).done; ) a = a.value, v = $ + N(a, S++), h += E(a, u, s, v, d);
    else if (v === "object") {
      if (typeof t.then == "function") return E(y(t), u, s, a, d);
      throw u = String(t), Error("Objects are not valid as a React child (found: " + (u === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : u) + "). If you meant to render a collection of children, use an array instead.");
    }
    return h;
  }
  function Y(t, u, s) {
    if (t == null) return t;
    var a = [], d = 0;
    return E(t, a, "", "", function(v) {
      return u.call(s, v, d++);
    }), a;
  }
  function F(t) {
    if (t._status === -1) {
      var u = t._result;
      u = u(), u.then(function(s) {
        (t._status === 0 || t._status === -1) && (t._status = 1, t._result = s);
      }, function(s) {
        (t._status === 0 || t._status === -1) && (t._status = 2, t._result = s);
      }), t._status === -1 && (t._status = 0, t._result = u);
    }
    if (t._status === 1) return t._result.default;
    throw t._result;
  }
  var Q = typeof reportError == "function" ? reportError : function(t) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var u = new window.ErrorEvent("error", { bubbles: true, cancelable: true, message: typeof t == "object" && t !== null && typeof t.message == "string" ? String(t.message) : String(t), error: t });
      if (!window.dispatchEvent(u)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", t);
      return;
    }
    console.error(t);
  }, ue = { map: Y, forEach: function(t, u, s) {
    Y(t, function() {
      u.apply(this, arguments);
    }, s);
  }, count: function(t) {
    var u = 0;
    return Y(t, function() {
      u++;
    }), u;
  }, toArray: function(t) {
    return Y(t, function(u) {
      return u;
    }) || [];
  }, only: function(t) {
    if (!I(t)) throw Error("React.Children.only expected to receive a single React element child.");
    return t;
  } };
  return l.Activity = P, l.Children = ue, l.Component = A, l.Fragment = n, l.Profiler = i, l.PureComponent = L, l.StrictMode = o, l.Suspense = b, l.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = f, l.__COMPILER_RUNTIME = { __proto__: null, c: function(t) {
    return f.H.useMemoCache(t);
  } }, l.cache = function(t) {
    return function() {
      return t.apply(null, arguments);
    };
  }, l.cacheSignal = function() {
    return null;
  }, l.cloneElement = function(t, u, s) {
    if (t == null) throw Error("The argument must be a React element, but you passed " + t + ".");
    var a = V({}, t.props), d = t.key;
    if (u != null) for (v in u.key !== void 0 && (d = "" + u.key), u) !D.call(u, v) || v === "key" || v === "__self" || v === "__source" || v === "ref" && u.ref === void 0 || (a[v] = u[v]);
    var v = arguments.length - 2;
    if (v === 1) a.children = s;
    else if (1 < v) {
      for (var h = Array(v), $ = 0; $ < v; $++) h[$] = arguments[$ + 2];
      a.children = h;
    }
    return R(t.type, d, a);
  }, l.createContext = function(t) {
    return t = { $$typeof: m, _currentValue: t, _currentValue2: t, _threadCount: 0, Provider: null, Consumer: null }, t.Provider = t, t.Consumer = { $$typeof: c, _context: t }, t;
  }, l.createElement = function(t, u, s) {
    var a, d = {}, v = null;
    if (u != null) for (a in u.key !== void 0 && (v = "" + u.key), u) D.call(u, a) && a !== "key" && a !== "__self" && a !== "__source" && (d[a] = u[a]);
    var h = arguments.length - 2;
    if (h === 1) d.children = s;
    else if (1 < h) {
      for (var $ = Array(h), S = 0; S < h; S++) $[S] = arguments[S + 2];
      d.children = $;
    }
    if (t && t.defaultProps) for (a in h = t.defaultProps, h) d[a] === void 0 && (d[a] = h[a]);
    return R(t, v, d);
  }, l.createRef = function() {
    return { current: null };
  }, l.forwardRef = function(t) {
    return { $$typeof: w, render: t };
  }, l.isValidElement = I, l.lazy = function(t) {
    return { $$typeof: C, _payload: { _status: -1, _result: t }, _init: F };
  }, l.memo = function(t, u) {
    return { $$typeof: j, type: t, compare: u === void 0 ? null : u };
  }, l.startTransition = function(t) {
    var u = f.T, s = {};
    f.T = s;
    try {
      var a = t(), d = f.S;
      d !== null && d(s, a), typeof a == "object" && a !== null && typeof a.then == "function" && a.then(_, Q);
    } catch (v) {
      Q(v);
    } finally {
      u !== null && s.types !== null && (u.types = s.types), f.T = u;
    }
  }, l.unstable_useCacheRefresh = function() {
    return f.H.useCacheRefresh();
  }, l.use = function(t) {
    return f.H.use(t);
  }, l.useActionState = function(t, u, s) {
    return f.H.useActionState(t, u, s);
  }, l.useCallback = function(t, u) {
    return f.H.useCallback(t, u);
  }, l.useContext = function(t) {
    return f.H.useContext(t);
  }, l.useDebugValue = function() {
  }, l.useDeferredValue = function(t, u) {
    return f.H.useDeferredValue(t, u);
  }, l.useEffect = function(t, u) {
    return f.H.useEffect(t, u);
  }, l.useEffectEvent = function(t) {
    return f.H.useEffectEvent(t);
  }, l.useId = function() {
    return f.H.useId();
  }, l.useImperativeHandle = function(t, u, s) {
    return f.H.useImperativeHandle(t, u, s);
  }, l.useInsertionEffect = function(t, u) {
    return f.H.useInsertionEffect(t, u);
  }, l.useLayoutEffect = function(t, u) {
    return f.H.useLayoutEffect(t, u);
  }, l.useMemo = function(t, u) {
    return f.H.useMemo(t, u);
  }, l.useOptimistic = function(t, u) {
    return f.H.useOptimistic(t, u);
  }, l.useReducer = function(t, u, s) {
    return f.H.useReducer(t, u, s);
  }, l.useRef = function(t) {
    return f.H.useRef(t);
  }, l.useState = function(t) {
    return f.H.useState(t);
  }, l.useSyncExternalStore = function(t, u, s) {
    return f.H.useSyncExternalStore(t, u, s);
  }, l.useTransition = function() {
    return f.H.useTransition();
  }, l.version = "19.2.4", l;
}
var le;
function Ce() {
  return le || (le = 1, ie.exports = Pe()), ie.exports;
}
var p = Ce();
const q = Me(p), Yt = Se({ __proto__: null, default: q }, [p]);
function pe(e, r) {
  (r == null || r > e.length) && (r = e.length);
  for (var n = 0, o = Array(r); n < r; n++) o[n] = e[n];
  return o;
}
function Ae(e) {
  if (Array.isArray(e)) return e;
}
function Ie(e, r, n) {
  return (r = Ue(r)) in e ? Object.defineProperty(e, r, { value: n, enumerable: true, configurable: true, writable: true }) : e[r] = n, e;
}
function $e(e, r) {
  var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (n != null) {
    var o, i, c, m, w = [], b = true, j = false;
    try {
      if (c = (n = n.call(e)).next, r !== 0) for (; !(b = (o = c.call(n)).done) && (w.push(o.value), w.length !== r); b = true) ;
    } catch (C) {
      j = true, i = C;
    } finally {
      try {
        if (!b && n.return != null && (m = n.return(), Object(m) !== m)) return;
      } finally {
        if (j) throw i;
      }
    }
    return w;
  }
}
function Le() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function de(e, r) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), n.push.apply(n, o);
  }
  return n;
}
function ge(e) {
  for (var r = 1; r < arguments.length; r++) {
    var n = arguments[r] != null ? arguments[r] : {};
    r % 2 ? de(Object(n), true).forEach(function(o) {
      Ie(e, o, n[o]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : de(Object(n)).forEach(function(o) {
      Object.defineProperty(e, o, Object.getOwnPropertyDescriptor(n, o));
    });
  }
  return e;
}
function He(e, r) {
  if (e == null) return {};
  var n, o, i = Ne(e, r);
  if (Object.getOwnPropertySymbols) {
    var c = Object.getOwnPropertySymbols(e);
    for (o = 0; o < c.length; o++) n = c[o], r.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
  }
  return i;
}
function Ne(e, r) {
  if (e == null) return {};
  var n = {};
  for (var o in e) if ({}.hasOwnProperty.call(e, o)) {
    if (r.indexOf(o) !== -1) continue;
    n[o] = e[o];
  }
  return n;
}
function De(e, r) {
  return Ae(e) || $e(e, r) || Ye(e, r) || Le();
}
function xe(e, r) {
  if (typeof e != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var o = n.call(e, r);
    if (typeof o != "object") return o;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (r === "string" ? String : Number)(e);
}
function Ue(e) {
  var r = xe(e, "string");
  return typeof r == "symbol" ? r : r + "";
}
function Ye(e, r) {
  if (e) {
    if (typeof e == "string") return pe(e, r);
    var n = {}.toString.call(e).slice(8, -1);
    return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? pe(e, r) : void 0;
  }
}
function qe(e, r, n) {
  return r in e ? Object.defineProperty(e, r, { value: n, enumerable: true, configurable: true, writable: true }) : e[r] = n, e;
}
function ve(e, r) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), n.push.apply(n, o);
  }
  return n;
}
function me(e) {
  for (var r = 1; r < arguments.length; r++) {
    var n = arguments[r] != null ? arguments[r] : {};
    r % 2 ? ve(Object(n), true).forEach(function(o) {
      qe(e, o, n[o]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : ve(Object(n)).forEach(function(o) {
      Object.defineProperty(e, o, Object.getOwnPropertyDescriptor(n, o));
    });
  }
  return e;
}
function ze() {
  for (var e = arguments.length, r = new Array(e), n = 0; n < e; n++) r[n] = arguments[n];
  return function(o) {
    return r.reduceRight(function(i, c) {
      return c(i);
    }, o);
  };
}
function X(e) {
  return function r() {
    for (var n = this, o = arguments.length, i = new Array(o), c = 0; c < o; c++) i[c] = arguments[c];
    return i.length >= e.length ? e.apply(this, i) : function() {
      for (var m = arguments.length, w = new Array(m), b = 0; b < m; b++) w[b] = arguments[b];
      return r.apply(n, [].concat(i, w));
    };
  };
}
function ne(e) {
  return {}.toString.call(e).includes("Object");
}
function ke(e) {
  return !Object.keys(e).length;
}
function J(e) {
  return typeof e == "function";
}
function Ve(e, r) {
  return Object.prototype.hasOwnProperty.call(e, r);
}
function We(e, r) {
  return ne(r) || x("changeType"), Object.keys(r).some(function(n) {
    return !Ve(e, n);
  }) && x("changeField"), r;
}
function Ge(e) {
  J(e) || x("selectorType");
}
function Ke(e) {
  J(e) || ne(e) || x("handlerType"), ne(e) && Object.values(e).some(function(r) {
    return !J(r);
  }) && x("handlersType");
}
function Be(e) {
  e || x("initialIsRequired"), ne(e) || x("initialType"), ke(e) && x("initialContent");
}
function Fe(e, r) {
  throw new Error(e[r] || e.default);
}
var Qe = { initialIsRequired: "initial state is required", initialType: "initial state should be an object", initialContent: "initial state shouldn't be an empty object", handlerType: "handler should be an object or a function", handlersType: "all handlers should be a functions", selectorType: "selector should be a function", changeType: "provided value of changes should be an object", changeField: 'it seams you want to change a field in the state which is not specified in the "initial" state', default: "an unknown error accured in `state-local` package" }, x = X(Fe)(Qe), te = { changes: We, selector: Ge, handler: Ke, initial: Be };
function Xe(e) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  te.initial(e), te.handler(r);
  var n = { current: e }, o = X(et)(n, r), i = X(Je)(n), c = X(te.changes)(e), m = X(Ze)(n);
  function w() {
    var j = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : function(C) {
      return C;
    };
    return te.selector(j), j(n.current);
  }
  function b(j) {
    ze(o, i, c, m)(j);
  }
  return [w, b];
}
function Ze(e, r) {
  return J(r) ? r(e.current) : r;
}
function Je(e, r) {
  return e.current = me(me({}, e.current), r), r;
}
function et(e, r, n) {
  return J(r) ? r(e.current) : Object.keys(n).forEach(function(o) {
    var i;
    return (i = r[o]) === null || i === void 0 ? void 0 : i.call(r, e.current[o]);
  }), n;
}
var tt = { create: Xe }, rt = { paths: { vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.55.1/min/vs" } };
function nt(e) {
  return function r() {
    for (var n = this, o = arguments.length, i = new Array(o), c = 0; c < o; c++) i[c] = arguments[c];
    return i.length >= e.length ? e.apply(this, i) : function() {
      for (var m = arguments.length, w = new Array(m), b = 0; b < m; b++) w[b] = arguments[b];
      return r.apply(n, [].concat(i, w));
    };
  };
}
function ot(e) {
  return {}.toString.call(e).includes("Object");
}
function ut(e) {
  return e || ye("configIsRequired"), ot(e) || ye("configType"), e.urls ? (it(), { paths: { vs: e.urls.monacoBase } }) : e;
}
function it() {
  console.warn(he.deprecation);
}
function ct(e, r) {
  throw new Error(e[r] || e.default);
}
var he = { configIsRequired: "the configuration object is required", configType: "the configuration object should be an object", default: "an unknown error accured in `@monaco-editor/loader` package", deprecation: `Deprecation warning!
    You are using deprecated way of configuration.

    Instead of using
      monaco.config({ urls: { monacoBase: '...' } })
    use
      monaco.config({ paths: { vs: '...' } })

    For more please check the link https://github.com/suren-atoyan/monaco-loader#config
  ` }, ye = nt(ct)(he), at = { config: ut }, st = function() {
  for (var r = arguments.length, n = new Array(r), o = 0; o < r; o++) n[o] = arguments[o];
  return function(i) {
    return n.reduceRight(function(c, m) {
      return m(c);
    }, i);
  };
};
function Ee(e, r) {
  return Object.keys(r).forEach(function(n) {
    r[n] instanceof Object && e[n] && Object.assign(r[n], Ee(e[n], r[n]));
  }), ge(ge({}, e), r);
}
var ft = { type: "cancelation", msg: "operation is manually canceled" };
function ce(e) {
  var r = false, n = new Promise(function(o, i) {
    e.then(function(c) {
      return r ? i(ft) : o(c);
    }), e.catch(i);
  });
  return n.cancel = function() {
    return r = true;
  }, n;
}
var lt = ["monaco"], pt = tt.create({ config: rt, isInitialized: false, resolve: null, reject: null, monaco: null }), we = De(pt, 2), ee = we[0], oe = we[1];
function dt(e) {
  var r = at.config(e), n = r.monaco, o = He(r, lt);
  oe(function(i) {
    return { config: Ee(i.config, o), monaco: n };
  });
}
function gt() {
  var e = ee(function(r) {
    var n = r.monaco, o = r.isInitialized, i = r.resolve;
    return { monaco: n, isInitialized: o, resolve: i };
  });
  if (!e.isInitialized) {
    if (oe({ isInitialized: true }), e.monaco) return e.resolve(e.monaco), ce(ae);
    if (window.monaco && window.monaco.editor) return be(window.monaco), e.resolve(window.monaco), ce(ae);
    st(vt, yt)(ht);
  }
  return ce(ae);
}
function vt(e) {
  return document.body.appendChild(e);
}
function mt(e) {
  var r = document.createElement("script");
  return e && (r.src = e), r;
}
function yt(e) {
  var r = ee(function(o) {
    var i = o.config, c = o.reject;
    return { config: i, reject: c };
  }), n = mt("".concat(r.config.paths.vs, "/loader.js"));
  return n.onload = function() {
    return e();
  }, n.onerror = r.reject, n;
}
function ht() {
  var e = ee(function(n) {
    var o = n.config, i = n.resolve, c = n.reject;
    return { config: o, resolve: i, reject: c };
  }), r = window.require;
  r.config(e.config), r(["vs/editor/editor.main"], function(n) {
    var o = n.m || n;
    be(o), e.resolve(o);
  }, function(n) {
    e.reject(n);
  });
}
function be(e) {
  ee().monaco || oe({ monaco: e });
}
function Et() {
  return ee(function(e) {
    var r = e.monaco;
    return r;
  });
}
var ae = new Promise(function(e, r) {
  return oe({ resolve: e, reject: r });
}), Oe = { config: dt, init: gt, __getMonacoInstance: Et }, wt = { wrapper: { display: "flex", position: "relative", textAlign: "initial" }, fullWidth: { width: "100%" }, hide: { display: "none" } }, se = wt, bt = { container: { display: "flex", height: "100%", width: "100%", justifyContent: "center", alignItems: "center" } }, Ot = bt;
function _t({ children: e }) {
  return q.createElement("div", { style: Ot.container }, e);
}
var jt = _t, Rt = jt;
function Tt({ width: e, height: r, isEditorReady: n, loading: o, _ref: i, className: c, wrapperProps: m }) {
  return q.createElement("section", { style: { ...se.wrapper, width: e, height: r }, ...m }, !n && q.createElement(Rt, null, o), q.createElement("div", { ref: i, style: { ...se.fullWidth, ...!n && se.hide }, className: c }));
}
var St = Tt, _e = p.memo(St);
function Mt(e) {
  p.useEffect(e, []);
}
var je = Mt;
function Pt(e, r, n = true) {
  let o = p.useRef(true);
  p.useEffect(o.current || !n ? () => {
    o.current = false;
  } : e, r);
}
var M = Pt;
function Z() {
}
function K(e, r, n, o) {
  return Ct(e, o) || At(e, r, n, o);
}
function Ct(e, r) {
  return e.editor.getModel(Re(e, r));
}
function At(e, r, n, o) {
  return e.editor.createModel(r, n, o ? Re(e, o) : void 0);
}
function Re(e, r) {
  return e.Uri.parse(r);
}
function It({ original: e, modified: r, language: n, originalLanguage: o, modifiedLanguage: i, originalModelPath: c, modifiedModelPath: m, keepCurrentOriginalModel: w = false, keepCurrentModifiedModel: b = false, theme: j = "light", loading: C = "Loading...", options: P = {}, height: z = "100%", width: B = "100%", className: k, wrapperProps: V = {}, beforeMount: W = Z, onMount: A = Z }) {
  let [T, L] = p.useState(false), [H, O] = p.useState(true), _ = p.useRef(null), f = p.useRef(null), D = p.useRef(null), R = p.useRef(A), g = p.useRef(W), I = p.useRef(false);
  je(() => {
    let y = Oe.init();
    return y.then((E) => (f.current = E) && O(false)).catch((E) => (E == null ? void 0 : E.type) !== "cancelation" && console.error("Monaco initialization: error:", E)), () => _.current ? N() : y.cancel();
  }), M(() => {
    if (_.current && f.current) {
      let y = _.current.getOriginalEditor(), E = K(f.current, e || "", o || n || "text", c || "");
      E !== y.getModel() && y.setModel(E);
    }
  }, [c], T), M(() => {
    if (_.current && f.current) {
      let y = _.current.getModifiedEditor(), E = K(f.current, r || "", i || n || "text", m || "");
      E !== y.getModel() && y.setModel(E);
    }
  }, [m], T), M(() => {
    let y = _.current.getModifiedEditor();
    y.getOption(f.current.editor.EditorOption.readOnly) ? y.setValue(r || "") : r !== y.getValue() && (y.executeEdits("", [{ range: y.getModel().getFullModelRange(), text: r || "", forceMoveMarkers: true }]), y.pushUndoStop());
  }, [r], T), M(() => {
    var _a, _b;
    (_b = (_a = _.current) == null ? void 0 : _a.getModel()) == null ? void 0 : _b.original.setValue(e || "");
  }, [e], T), M(() => {
    let { original: y, modified: E } = _.current.getModel();
    f.current.editor.setModelLanguage(y, o || n || "text"), f.current.editor.setModelLanguage(E, i || n || "text");
  }, [n, o, i], T), M(() => {
    var _a;
    (_a = f.current) == null ? void 0 : _a.editor.setTheme(j);
  }, [j], T), M(() => {
    var _a;
    (_a = _.current) == null ? void 0 : _a.updateOptions(P);
  }, [P], T);
  let G = p.useCallback(() => {
    var _a;
    if (!f.current) return;
    g.current(f.current);
    let y = K(f.current, e || "", o || n || "text", c || ""), E = K(f.current, r || "", i || n || "text", m || "");
    (_a = _.current) == null ? void 0 : _a.setModel({ original: y, modified: E });
  }, [n, r, i, e, o, c, m]), U = p.useCallback(() => {
    var _a;
    !I.current && D.current && (_.current = f.current.editor.createDiffEditor(D.current, { automaticLayout: true, ...P }), G(), (_a = f.current) == null ? void 0 : _a.editor.setTheme(j), L(true), I.current = true);
  }, [P, j, G]);
  p.useEffect(() => {
    T && R.current(_.current, f.current);
  }, [T]), p.useEffect(() => {
    !H && !T && U();
  }, [H, T, U]);
  function N() {
    var _a, _b, _c, _d;
    let y = (_a = _.current) == null ? void 0 : _a.getModel();
    w || ((_b = y == null ? void 0 : y.original) == null ? void 0 : _b.dispose()), b || ((_c = y == null ? void 0 : y.modified) == null ? void 0 : _c.dispose()), (_d = _.current) == null ? void 0 : _d.dispose();
  }
  return q.createElement(_e, { width: B, height: z, isEditorReady: T, loading: C, _ref: D, className: k, wrapperProps: V });
}
var $t = It;
p.memo($t);
function Lt(e) {
  let r = p.useRef();
  return p.useEffect(() => {
    r.current = e;
  }, [e]), r.current;
}
var Ht = Lt, re = /* @__PURE__ */ new Map();
function Nt({ defaultValue: e, defaultLanguage: r, defaultPath: n, value: o, language: i, path: c, theme: m = "light", line: w, loading: b = "Loading...", options: j = {}, overrideServices: C = {}, saveViewState: P = true, keepCurrentModel: z = false, width: B = "100%", height: k = "100%", className: V, wrapperProps: W = {}, beforeMount: A = Z, onMount: T = Z, onChange: L, onValidate: H = Z }) {
  let [O, _] = p.useState(false), [f, D] = p.useState(true), R = p.useRef(null), g = p.useRef(null), I = p.useRef(null), G = p.useRef(T), U = p.useRef(A), N = p.useRef(), y = p.useRef(o), E = Ht(c), Y = p.useRef(false), F = p.useRef(false);
  je(() => {
    let t = Oe.init();
    return t.then((u) => (R.current = u) && D(false)).catch((u) => (u == null ? void 0 : u.type) !== "cancelation" && console.error("Monaco initialization: error:", u)), () => g.current ? ue() : t.cancel();
  }), M(() => {
    var _a, _b, _c, _d;
    let t = K(R.current, e || o || "", r || i || "", c || n || "");
    t !== ((_a = g.current) == null ? void 0 : _a.getModel()) && (P && re.set(E, (_b = g.current) == null ? void 0 : _b.saveViewState()), (_c = g.current) == null ? void 0 : _c.setModel(t), P && ((_d = g.current) == null ? void 0 : _d.restoreViewState(re.get(c))));
  }, [c], O), M(() => {
    var _a;
    (_a = g.current) == null ? void 0 : _a.updateOptions(j);
  }, [j], O), M(() => {
    !g.current || o === void 0 || (g.current.getOption(R.current.editor.EditorOption.readOnly) ? g.current.setValue(o) : o !== g.current.getValue() && (F.current = true, g.current.executeEdits("", [{ range: g.current.getModel().getFullModelRange(), text: o, forceMoveMarkers: true }]), g.current.pushUndoStop(), F.current = false));
  }, [o], O), M(() => {
    var _a, _b;
    let t = (_a = g.current) == null ? void 0 : _a.getModel();
    t && i && ((_b = R.current) == null ? void 0 : _b.editor.setModelLanguage(t, i));
  }, [i], O), M(() => {
    var _a;
    w !== void 0 && ((_a = g.current) == null ? void 0 : _a.revealLine(w));
  }, [w], O), M(() => {
    var _a;
    (_a = R.current) == null ? void 0 : _a.editor.setTheme(m);
  }, [m], O);
  let Q = p.useCallback(() => {
    var _a;
    if (!(!I.current || !R.current) && !Y.current) {
      U.current(R.current);
      let t = c || n, u = K(R.current, o || e || "", r || i || "", t || "");
      g.current = (_a = R.current) == null ? void 0 : _a.editor.create(I.current, { model: u, automaticLayout: true, ...j }, C), P && g.current.restoreViewState(re.get(t)), R.current.editor.setTheme(m), w !== void 0 && g.current.revealLine(w), _(true), Y.current = true;
    }
  }, [e, r, n, o, i, c, j, C, P, m, w]);
  p.useEffect(() => {
    O && G.current(g.current, R.current);
  }, [O]), p.useEffect(() => {
    !f && !O && Q();
  }, [f, O, Q]), y.current = o, p.useEffect(() => {
    var _a, _b;
    O && L && ((_a = N.current) == null ? void 0 : _a.dispose(), N.current = (_b = g.current) == null ? void 0 : _b.onDidChangeModelContent((t) => {
      F.current || L(g.current.getValue(), t);
    }));
  }, [O, L]), p.useEffect(() => {
    if (O) {
      let t = R.current.editor.onDidChangeMarkers((u) => {
        var _a;
        let s = (_a = g.current.getModel()) == null ? void 0 : _a.uri;
        if (s && u.find((a) => a.path === s.path)) {
          let a = R.current.editor.getModelMarkers({ resource: s });
          H == null ? void 0 : H(a);
        }
      });
      return () => {
        t == null ? void 0 : t.dispose();
      };
    }
    return () => {
    };
  }, [O, H]);
  function ue() {
    var _a, _b;
    (_a = N.current) == null ? void 0 : _a.dispose(), z ? P && re.set(c, g.current.saveViewState()) : (_b = g.current.getModel()) == null ? void 0 : _b.dispose(), g.current.dispose();
  }
  return q.createElement(_e, { width: B, height: k, isEditorReady: O, loading: b, _ref: I, className: V, wrapperProps: W });
}
var Dt = Nt, xt = p.memo(Dt), qt = xt;
export {
  qt as F,
  Yt as R,
  p as a,
  q as b,
  Ut as c,
  Me as g,
  Ce as r
};
