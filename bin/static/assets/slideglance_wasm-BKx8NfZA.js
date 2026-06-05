let E, Zt, te, ee, ne, _e, re, oe;
let __tla = (async ()=>{
    var R = "/assets/slideglance_wasm_bg-BGbSkrza.wasm", $ = async (t = {}, e)=>{
        let n;
        if (e.startsWith("data:")) {
            const o = e.replace(/^data:.*?base64,/, "");
            let r;
            if (typeof Buffer == "function" && typeof Buffer.from == "function") r = Buffer.from(o, "base64");
            else if (typeof atob == "function") {
                const s = atob(o);
                r = new Uint8Array(s.length);
                for(let i = 0; i < s.length; i++)r[i] = s.charCodeAt(i);
            } else throw new Error("Cannot decode base64-encoded data URL");
            n = await WebAssembly.instantiate(r, t);
        } else {
            const o = await fetch(e), r = o.headers.get("Content-Type") || "";
            if ("instantiateStreaming" in WebAssembly && r.startsWith("application/wasm")) n = await WebAssembly.instantiateStreaming(o, t);
            else {
                const s = await o.arrayBuffer();
                n = await WebAssembly.instantiate(s, t);
            }
        }
        return n.instance.exports;
    };
    E = class {
        __destroy_into_raw() {
            const e = this.__wbg_ptr;
            return this.__wbg_ptr = 0, O.unregister(this), e;
        }
        free() {
            const e = this.__destroy_into_raw();
            _.__wbg_pptxdocument_free(e, 0);
        }
        fontDefs() {
            let e, n;
            try {
                const s = _.__wbindgen_add_to_stack_pointer(-16);
                _.pptxdocument_fontDefs(s, this.__wbg_ptr);
                var o = c().getInt32(s + 0, !0), r = c().getInt32(s + 4, !0);
                return e = o, n = r, l(o, r);
            } finally{
                _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_export3(e, n, 1);
            }
        }
        fontUsage() {
            try {
                const r = _.__wbindgen_add_to_stack_pointer(-16);
                _.pptxdocument_fontUsage(r, this.__wbg_ptr);
                var e = c().getInt32(r + 0, !0), n = c().getInt32(r + 4, !0), o = c().getInt32(r + 8, !0);
                if (o) throw g(n);
                return g(e);
            } finally{
                _.__wbindgen_add_to_stack_pointer(16);
            }
        }
        mtxCompressedFonts() {
            try {
                const r = _.__wbindgen_add_to_stack_pointer(-16);
                _.pptxdocument_mtxCompressedFonts(r, this.__wbg_ptr);
                var e = c().getInt32(r + 0, !0), n = c().getInt32(r + 4, !0), o = c().getInt32(r + 8, !0);
                if (o) throw g(n);
                return g(e);
            } finally{
                _.__wbindgen_add_to_stack_pointer(16);
            }
        }
        constructor(e, n, o){
            try {
                const a = _.__wbindgen_add_to_stack_pointer(-16), u = M(e, _.__wbindgen_export), w = b, x = F(n, _.__wbindgen_export), m = b;
                _.pptxdocument_new(a, u, w, x, m, p(o) ? 16777215 : o ? 1 : 0);
                var r = c().getInt32(a + 0, !0), s = c().getInt32(a + 4, !0), i = c().getInt32(a + 8, !0);
                if (i) throw g(s);
                return this.__wbg_ptr = r >>> 0, O.register(this, this.__wbg_ptr, this), this;
            } finally{
                _.__wbindgen_add_to_stack_pointer(16);
            }
        }
        renderSlide(e, n, o) {
            try {
                const a = _.__wbindgen_add_to_stack_pointer(-16);
                _.pptxdocument_renderSlide(a, this.__wbg_ptr, e, n, o);
                var r = c().getInt32(a + 0, !0), s = c().getInt32(a + 4, !0), i = c().getInt32(a + 8, !0);
                if (i) throw g(s);
                return g(r);
            } finally{
                _.__wbindgen_add_to_stack_pointer(16);
            }
        }
        slideCount() {
            return _.pptxdocument_slideCount(this.__wbg_ptr) >>> 0;
        }
    };
    Symbol.dispose && (E.prototype[Symbol.dispose] = E.prototype.free);
    Zt = function(t, e, n, o, r) {
        try {
            const u = _.__wbindgen_add_to_stack_pointer(-16), w = M(t, _.__wbindgen_export), x = b, m = C(e, _.__wbindgen_export), h = b, A = F(r, _.__wbindgen_export), B = b;
            _.convertPptxToPng(u, w, x, m, h, p(n) ? 4294967297 : n >>> 0, p(o) ? 4294967297 : o >>> 0, A, B);
            var s = c().getInt32(u + 0, !0), i = c().getInt32(u + 4, !0), a = c().getInt32(u + 8, !0);
            if (a) throw g(i);
            return g(s);
        } finally{
            _.__wbindgen_add_to_stack_pointer(16);
        }
    };
    te = function(t, e, n) {
        try {
            const i = _.__wbindgen_add_to_stack_pointer(-16), a = M(t, _.__wbindgen_export), u = b, w = C(e, _.__wbindgen_export), x = b, m = F(n, _.__wbindgen_export), h = b;
            _.convertPptxToSvg(i, a, u, w, x, m, h);
            var o = c().getInt32(i + 0, !0), r = c().getInt32(i + 4, !0), s = c().getInt32(i + 8, !0);
            if (s) throw g(r);
            return g(o);
        } finally{
            _.__wbindgen_add_to_stack_pointer(16);
        }
    };
    ee = function(t) {
        return _.emuToPixels(t);
    };
    ne = function() {
        _.init();
    };
    _e = function(t) {
        try {
            const r = _.__wbindgen_add_to_stack_pointer(-16), s = M(t, _.__wbindgen_export), i = b;
            _.parsePptxData(r, s, i);
            var e = c().getInt32(r + 0, !0), n = c().getInt32(r + 4, !0), o = c().getInt32(r + 8, !0);
            if (o) throw g(n);
            return g(e);
        } finally{
            _.__wbindgen_add_to_stack_pointer(16);
        }
    };
    re = function(t, e, n, o) {
        try {
            const w = _.__wbindgen_add_to_stack_pointer(-16), x = L(t, _.__wbindgen_export, _.__wbindgen_export2), m = b, h = F(o, _.__wbindgen_export), A = b;
            _.svgToPng(w, x, m, p(e) ? 4294967297 : e >>> 0, p(n) ? 4294967297 : n >>> 0, h, A);
            var r = c().getInt32(w + 0, !0), s = c().getInt32(w + 4, !0), i = c().getInt32(w + 8, !0), a = c().getInt32(w + 12, !0);
            if (a) throw g(i);
            var u = W(r, s).slice();
            return _.__wbindgen_export3(r, s * 1, 1), u;
        } finally{
            _.__wbindgen_add_to_stack_pointer(16);
        }
    };
    oe = function() {
        let t, e;
        try {
            const r = _.__wbindgen_add_to_stack_pointer(-16);
            _.version(r);
            var n = c().getInt32(r + 0, !0), o = c().getInt32(r + 4, !0);
            return t = n, e = o, l(n, o);
        } finally{
            _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_export3(t, e, 1);
        }
    };
    function N(t, e) {
        const n = Error(l(t, e));
        return f(n);
    }
    function z(t) {
        return Number(d(t));
    }
    function G(t, e) {
        const n = String(d(e)), o = L(n, _.__wbindgen_export, _.__wbindgen_export2), r = b;
        c().setInt32(t + 4, r, !0), c().setInt32(t + 0, o, !0);
    }
    function V(t, e) {
        const n = self.__slideglanceMeasureLineMetrics(l(t, e));
        return f(n);
    }
    function H(t, e, n, o, r, s, i, a, u, w) {
        let x;
        n !== 0 && (x = l(n, o).slice(), _.__wbindgen_export3(n, o * 1, 1));
        let m;
        r !== 0 && (m = l(r, s).slice(), _.__wbindgen_export3(r, s * 1, 1));
        let h;
        return i !== 0 && (h = l(i, a).slice(), _.__wbindgen_export3(i, a * 1, 1)), self.__slideglanceMeasureText(l(t, e), x, m, h, u, w !== 0);
    }
    function J(t) {
        return typeof d(t) == "function";
    }
    function X(t) {
        return d(t) === null;
    }
    function Y(t) {
        return typeof d(t) == "string";
    }
    function q(t) {
        return d(t) === void 0;
    }
    function K(t, e) {
        const n = d(e), o = typeof n == "number" ? n : void 0;
        c().setFloat64(t + 8, p(o) ? 0 : o, !0), c().setInt32(t + 0, !p(o), !0);
    }
    function Q(t, e) {
        const n = d(e), o = typeof n == "string" ? n : void 0;
        var r = p(o) ? 0 : L(o, _.__wbindgen_export, _.__wbindgen_export2), s = b;
        c().setInt32(t + 4, s, !0), c().setInt32(t + 0, r, !0);
    }
    function Z(t, e) {
        throw new Error(l(t, e));
    }
    function tt(t, e) {
        let n, o;
        try {
            n = t, o = e, console.error(l(t, e));
        } finally{
            _.__wbindgen_export3(n, o, 1);
        }
    }
    function et(t) {
        const e = Array.from(d(t));
        return f(e);
    }
    function nt() {
        return kt(function(t, e) {
            const n = Reflect.get(d(t), d(e));
            return f(n);
        }, arguments);
    }
    function _t(t) {
        return d(t).length;
    }
    function rt(t) {
        const e = new Uint8Array(d(t));
        return f(e);
    }
    function ot() {
        const t = new Error;
        return f(t);
    }
    function ct() {
        return f(new Map);
    }
    function it() {
        const t = new Array;
        return f(t);
    }
    function st() {
        const t = new Object;
        return f(t);
    }
    function at(t, e, n) {
        Uint8Array.prototype.set.call(W(t, e), d(n));
    }
    function dt(t, e, n) {
        d(t)[e >>> 0] = g(n);
    }
    function ft(t, e, n) {
        d(t)[g(e)] = g(n);
    }
    function bt(t, e, n) {
        const o = d(t).set(d(e), d(n));
        return f(o);
    }
    function ut(t, e) {
        const n = d(e).stack, o = L(n, _.__wbindgen_export, _.__wbindgen_export2), r = b;
        c().setInt32(t + 4, r, !0), c().setInt32(t + 0, o, !0);
    }
    function gt() {
        const t = typeof global > "u" ? null : global;
        return p(t) ? 0 : f(t);
    }
    function wt() {
        const t = typeof globalThis > "u" ? null : globalThis;
        return p(t) ? 0 : f(t);
    }
    function pt() {
        const t = typeof self > "u" ? null : self;
        return p(t) ? 0 : f(t);
    }
    function lt() {
        const t = typeof window > "u" ? null : window;
        return p(t) ? 0 : f(t);
    }
    function xt(t) {
        console.warn(d(t));
    }
    function mt(t) {
        return f(t);
    }
    function yt(t) {
        return f(t);
    }
    function ht(t, e) {
        const n = W(t, e);
        return f(n);
    }
    function vt(t, e) {
        const n = l(t, e);
        return f(n);
    }
    function It(t) {
        const e = d(t);
        return f(e);
    }
    function Tt(t) {
        g(t);
    }
    const O = typeof FinalizationRegistry > "u" ? {
        register: ()=>{},
        unregister: ()=>{}
    } : new FinalizationRegistry((t)=>_.__wbg_pptxdocument_free(t >>> 0, 1));
    function f(t) {
        T === y.length && y.push(y.length + 1);
        const e = T;
        return T = y[e], y[e] = t, e;
    }
    function Pt(t) {
        t < 1028 || (y[t] = T, T = t);
    }
    function W(t, e) {
        return t = t >>> 0, I().subarray(t / 1, t / 1 + e);
    }
    let v = null;
    function c() {
        return (v === null || v.buffer.detached === !0 || v.buffer.detached === void 0 && v.buffer !== _.memory.buffer) && (v = new DataView(_.memory.buffer)), v;
    }
    function l(t, e) {
        return t = t >>> 0, Dt(t, e);
    }
    let k = null;
    function At() {
        return (k === null || k.byteLength === 0) && (k = new Uint32Array(_.memory.buffer)), k;
    }
    let S = null;
    function I() {
        return (S === null || S.byteLength === 0) && (S = new Uint8Array(_.memory.buffer)), S;
    }
    function d(t) {
        return y[t];
    }
    function kt(t, e) {
        try {
            return t.apply(this, e);
        } catch (n) {
            _.__wbindgen_export4(f(n));
        }
    }
    let y = new Array(1024).fill(void 0);
    y.push(void 0, null, !0, !1);
    let T = y.length;
    function p(t) {
        return t == null;
    }
    function C(t, e) {
        const n = e(t.length * 4, 4) >>> 0;
        return At().set(t, n / 4), b = t.length, n;
    }
    function M(t, e) {
        const n = e(t.length * 1, 1) >>> 0;
        return I().set(t, n / 1), b = t.length, n;
    }
    function F(t, e) {
        const n = e(t.length * 4, 4) >>> 0, o = c();
        for(let r = 0; r < t.length; r++)o.setUint32(n + 4 * r, f(t[r]), !0);
        return b = t.length, n;
    }
    function L(t, e, n) {
        if (n === void 0) {
            const a = P.encode(t), u = e(a.length, 1) >>> 0;
            return I().subarray(u, u + a.length).set(a), b = a.length, u;
        }
        let o = t.length, r = e(o, 1) >>> 0;
        const s = I();
        let i = 0;
        for(; i < o; i++){
            const a = t.charCodeAt(i);
            if (a > 127) break;
            s[r + i] = a;
        }
        if (i !== o) {
            i !== 0 && (t = t.slice(i)), r = n(r, o, o = i + t.length * 3, 1) >>> 0;
            const a = I().subarray(r + i, r + o), u = P.encodeInto(t, a);
            i += u.written, r = n(r, o, i, 1) >>> 0;
        }
        return b = i, r;
    }
    function g(t) {
        const e = d(t);
        return Pt(t), e;
    }
    let D = new TextDecoder("utf-8", {
        ignoreBOM: !0,
        fatal: !0
    });
    D.decode();
    const St = 2146435072;
    let U = 0;
    function Dt(t, e) {
        return U += e, U >= St && (D = new TextDecoder("utf-8", {
            ignoreBOM: !0,
            fatal: !0
        }), D.decode(), U = e), D.decode(I().subarray(t, t + e));
    }
    const P = new TextEncoder;
    "encodeInto" in P || (P.encodeInto = function(t, e) {
        const n = P.encode(t);
        return e.set(n), {
            read: t.length,
            written: n.length
        };
    });
    let b = 0, _;
    function Mt(t) {
        _ = t;
    }
    URL = globalThis.URL;
    const Ft = await $({
        "./slideglance_wasm_bg.js": {
            __wbg___slideglanceMeasureText_4793a066e62223f0: H,
            __wbg___slideglanceMeasureLineMetrics_5d9678c90c7e882b: V,
            __wbindgen_object_drop_ref: Tt,
            __wbg_set_3bf1de9fab0cd644: dt,
            __wbg_set_fde2cec06c23692b: bt,
            __wbindgen_object_clone_ref: It,
            __wbg_set_6be42768c690e380: ft,
            __wbg_String_8564e559799eccda: G,
            __wbg_new_227d7c05414eb861: ot,
            __wbg_stack_3b0d974bbf31e44f: ut,
            __wbg_error_a6fa202b58aa1cd3: tt,
            __wbg_warn_3cc416af27dbdc02: xt,
            __wbg_new_0c7403db6e782f19: rt,
            __wbg_length_9f1775224cf1d815: _t,
            __wbg_prototypesetcall_a6b02eb00b0f4ce2: at,
            __wbg_new_34d45cc8e36aaead: ct,
            __wbg_new_682678e2f47e32bc: it,
            __wbg_from_0dbf29f09e7fb200: et,
            __wbg_new_aa8d0fa9762c29bd: st,
            __wbg_static_accessor_GLOBAL_THIS_602256ae5c8f42cf: wt,
            __wbg_static_accessor_SELF_e445c1c7484aecc3: pt,
            __wbg_static_accessor_GLOBAL_8cfadc87a297ca02: gt,
            __wbg_static_accessor_WINDOW_f20e8576ef1e0f17: lt,
            __wbg_get_6011fa3a58f61074: nt,
            __wbg___wbindgen_throw_6b64449b9b9ed33c: Z,
            __wbg___wbindgen_is_null_52ff4ec04186736f: X,
            __wbg_Number_32bf70a599af1d4b: z,
            __wbg_Error_960c155d3d49e4c2: N,
            __wbg___wbindgen_is_string_6df3bf7ef1164ed3: Y,
            __wbg___wbindgen_number_get_c7f42aed0525c451: K,
            __wbg___wbindgen_string_get_7ed5322991caaec5: Q,
            __wbg___wbindgen_is_function_3baa9db1a987f47d: J,
            __wbg___wbindgen_is_undefined_29a43b4d42920abd: q,
            __wbindgen_cast_0000000000000001: mt,
            __wbindgen_cast_0000000000000002: yt,
            __wbindgen_cast_0000000000000003: ht,
            __wbindgen_cast_0000000000000004: vt
        }
    }, R), { memory: Lt, __wbg_pptxdocument_free: Ut, convertPptxToPng: Wt, convertPptxToSvg: Et, init: Ot, parsePptxData: Ct, pptxdocument_fontDefs: jt, pptxdocument_fontUsage: Bt, pptxdocument_mtxCompressedFonts: Rt, pptxdocument_new: $t, pptxdocument_renderSlide: Nt, pptxdocument_slideCount: zt, svgToPng: Gt, version: Vt, emuToPixels: Ht, __wbindgen_export: Jt, __wbindgen_export2: Xt, __wbindgen_export3: Yt, __wbindgen_export4: qt, __wbindgen_add_to_stack_pointer: Kt, __wbindgen_start: j } = Ft;
    var Qt = Object.freeze({
        __proto__: null,
        __wbg_pptxdocument_free: Ut,
        __wbindgen_add_to_stack_pointer: Kt,
        __wbindgen_export: Jt,
        __wbindgen_export2: Xt,
        __wbindgen_export3: Yt,
        __wbindgen_export4: qt,
        __wbindgen_start: j,
        convertPptxToPng: Wt,
        convertPptxToSvg: Et,
        emuToPixels: Ht,
        init: Ot,
        memory: Lt,
        parsePptxData: Ct,
        pptxdocument_fontDefs: jt,
        pptxdocument_fontUsage: Bt,
        pptxdocument_mtxCompressedFonts: Rt,
        pptxdocument_new: $t,
        pptxdocument_renderSlide: Nt,
        pptxdocument_slideCount: zt,
        svgToPng: Gt,
        version: Vt
    });
    Mt(Qt);
    j();
})();
export { E as PptxDocument, Zt as convertPptxToPng, te as convertPptxToSvg, ee as emuToPixels, ne as init, _e as parsePptxData, re as svgToPng, oe as version, __tla };
