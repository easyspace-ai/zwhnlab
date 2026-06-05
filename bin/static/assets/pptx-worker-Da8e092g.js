(async ()=>{
    var T = [
        "Pretendard",
        "Apple SD Gothic Neo",
        "맑은 고딕",
        "Malgun Gothic",
        "Noto Sans CJK KR",
        "Noto Sans KR"
    ], K = 1.3333333333333333, L = /[　-鿿가-힯豈-﫿！-｠ᄀ-ᇿꥠ-꥿ힰ-퟿]/, _ = null;
    function E() {
        return _ === null && (_ = new OffscreenCanvas(1, 1).getContext("2d", {
            willReadFrequently: !1
        })), _;
    }
    var C = new Map;
    function A(t, e, n, o, a, s) {
        const r = L.test(t);
        let i;
        if (o != null && o.length > 0) i = o.endsWith("sans-serif") ? o : `${o}, sans-serif`;
        else if (e != null && e.length > 0) i = e.endsWith("sans-serif") ? e : `${e}, sans-serif`;
        else if (n != null && n.length > 0 && r) {
            const h = T.map((m)=>`'${m}'`);
            i = [
                `'${n.replace(/'/g, "\\'")}'`,
                ...h,
                "sans-serif"
            ].join(", ");
        } else i = [
            ...r ? T.map((h)=>`'${h}'`) : [],
            "sans-serif"
        ].join(", ");
        const x = a * K, u = `${s ? "bold" : "normal"} ${x}px ${i}`, l = `${u}${t}`, g = C.get(l);
        if (g !== void 0) return g;
        const f = E();
        f.font = u;
        const d = f;
        d.fontKerning !== void 0 && (d.fontKerning = "none"), d.letterSpacing !== void 0 && (d.letterSpacing = "0px"), d.wordSpacing !== void 0 && (d.wordSpacing = "0px");
        const c = f.measureText(t).width;
        return C.size > 5e4 && C.clear(), C.set(l, c), c;
    }
    self.__slideglanceMeasureText = A;
    function G(t) {
        const e = E();
        e.font = t;
        const n = e.measureText("Mg"), o = n;
        return {
            ascent: o.fontBoundingBoxAscent ?? n.actualBoundingBoxAscent ?? 0,
            descent: o.fontBoundingBoxDescent ?? n.actualBoundingBoxDescent ?? 0,
            lineGap: 0
        };
    }
    self.__slideglanceMeasureLineMetrics = G;
    var F = null;
    async function P() {
        return F === null && (F = (async ()=>{
            const t = await import("./slideglance_wasm-BKx8NfZA.js").then(async (m)=>{
                await m.__tla;
                return m;
            });
            if (typeof t.default == "function") try {
                await t.default();
            } catch  {}
            return t;
        })()), F;
    }
    var y = null;
    function D(t) {
        const e = [], n = /@font-face\s*\{([^}]*)\}/g;
        let o;
        for(; (o = n.exec(t)) !== null;){
            const a = o[1], s = /font-family\s*:\s*['"]([^'"]+)['"]/i.exec(a), r = /src\s*:\s*(url\([^)]+\))/i.exec(a);
            s != null && r != null && e.push({
                family: s[1],
                src: r[1]
            });
        }
        return e;
    }
    function N(t) {
        if (t.length < 12) return {
            ok: !1,
            reason: "header too short"
        };
        const e = new DataView(t.buffer, t.byteOffset, t.byteLength), n = e.getUint16(4);
        let o = -1, a = 0, s = -1;
        for(let u = 0; u < n; u++){
            const l = 12 + u * 16;
            if (l + 16 > t.length) return {
                ok: !1,
                reason: "table directory truncated"
            };
            const g = String.fromCharCode(t[l], t[l + 1], t[l + 2], t[l + 3]), f = e.getUint32(l + 8), d = e.getUint32(l + 12);
            g === "cmap" ? (o = f, a = d) : g === "maxp" && (s = f);
        }
        if (o < 0 || s < 0) return {
            ok: !0
        };
        if (s + 6 > t.length) return {
            ok: !1,
            reason: "maxp truncated"
        };
        const r = e.getUint16(s + 4);
        if (o + a > t.length || o + 4 > t.length) return {
            ok: !1,
            reason: "cmap range out of bounds"
        };
        const i = o + a, x = e.getUint16(o + 2);
        for(let u = 0; u < x; u++){
            const l = o + 4 + u * 8;
            if (l + 8 > i) return {
                ok: !1,
                reason: "encoding record overflow"
            };
            const g = e.getUint32(l + 4), f = o + g;
            if (f + 6 > i) return {
                ok: !1,
                reason: "subtable header overflow"
            };
            if (e.getUint16(f) !== 4) continue;
            const d = f + e.getUint16(f + 2);
            if (d > i) return {
                ok: !1,
                reason: "subtable length exceeds cmap"
            };
            const c = e.getUint16(f + 6) >>> 1, h = f + 14, m = h + c * 2 + 2, M = m + c * 2, S = M + c * 2;
            if (S + c * 2 > d) return {
                ok: !1,
                reason: "format-4 segment arrays exceed subtable"
            };
            for(let p = 0; p < c; p++){
                const $ = e.getUint16(m + p * 2), U = e.getUint16(h + p * 2), B = e.getInt16(M + p * 2), R = e.getUint16(S + p * 2);
                if ($ > U) return {
                    ok: !1,
                    reason: "segment start > end"
                };
                if (R === 0) {
                    const O = U - $, b = Math.min(O, 65535) + 1;
                    for(let k = 0; k < b; k++){
                        const w = $ + k & 65535, v = w + B & 65535;
                        if (v >= r) return {
                            ok: !1,
                            reason: `seg${p} cp U+${w.toString(16)} → gid ${v} >= numGlyphs ${r}`
                        };
                    }
                } else {
                    const O = S + p * 2;
                    for(let b = $; b <= U; b++){
                        const k = b - $, w = O + R + k * 2;
                        if (w + 1 >= d) return {
                            ok: !1,
                            reason: `seg${p} cp U+${b.toString(16)}: glyph_id_offset ${w} past subtable end`
                        };
                        const v = e.getUint16(w);
                        if (v >= r) return {
                            ok: !1,
                            reason: `seg${p} cp U+${b.toString(16)} → raw gid ${v} >= numGlyphs ${r}`
                        };
                    }
                }
            }
        }
        return {
            ok: !0
        };
    }
    async function j(t) {
        if (t.length === 0) return {
            decoded: [],
            failures: []
        };
        let e;
        try {
            e = (await import("./dist-VAmN-UeM-Cc5xJM8t.js")).decompressEotFont;
        } catch (a) {
            return {
                decoded: [],
                failures: t.map((s)=>({
                        family: s.family,
                        reason: `mtx-decompressor unavailable: ${a instanceof Error ? a.message : String(a)}`
                    }))
            };
        }
        const n = [], o = [];
        for (const a of t)try {
            const s = e(a.payload, !0, !1);
            if (s.length < 4 || !(s[0] === 0 && s[1] === 1 && s[2] === 0 && s[3] === 0 || s[0] === 79 && s[1] === 84 && s[2] === 84 && s[3] === 79)) {
                o.push({
                    family: a.family,
                    reason: "decompressed payload missing TTF/OTF magic"
                });
                continue;
            }
            const r = N(s);
            if (!r.ok) {
                o.push({
                    family: a.family,
                    reason: `cmap validation failed: ${r.reason}`
                });
                continue;
            }
            try {
                const i = await new FontFace(a.family, s.buffer, {
                    weight: a.weight,
                    style: a.style
                }).load();
                self.fonts.add(i), n.push({
                    family: a.family,
                    weight: a.weight,
                    style: a.style,
                    bytes: new Uint8Array(s)
                });
            } catch (i) {
                o.push({
                    family: a.family,
                    reason: `FontFace.load failed: ${i instanceof Error ? i.message : String(i)}`
                });
            }
        } catch (s) {
            o.push({
                family: a.family,
                reason: `mtx decompress failed: ${s instanceof Error ? s.message : String(s)}`
            });
        }
        return {
            decoded: n,
            failures: o
        };
    }
    async function J(t, e, n) {
        const o = await P();
        y?.free?.(), y = new o.PptxDocument(e, [], !0);
        const a = y.slideCount();
        let s = y.fontDefs();
        const r = await j(y.mtxCompressedFonts?.() ?? []), i = D(s), x = n ? D(n) : [], u = [
            ...i,
            ...x
        ], l = [
            ...r.failures
        ];
        await Promise.all(u.map(async ({ family: c, src: h })=>{
            try {
                const m = await new FontFace(c, h).load();
                self.fonts.add(m);
            } catch (m) {
                const M = m instanceof Error ? `${m.name}: ${m.message}` : String(m);
                l.push({
                    family: c,
                    reason: M
                });
            }
        }));
        let g;
        try {
            g = y.fontUsage();
        } catch  {
            g = [];
        }
        const f = r.decoded.map((c)=>({
                family: c.family,
                weight: c.weight,
                style: c.style,
                bytes: c.bytes
            })), d = f.map((c)=>c.bytes.buffer);
        postMessage({
            type: "opened",
            id: t,
            slideCount: a,
            fontDefs: s,
            fontUsage: g,
            fontLoadFailures: l,
            decodedFonts: f
        }, d);
    }
    function W(t, e) {
        if (y === null) {
            postMessage({
                type: "error",
                id: t,
                message: "no document open"
            });
            return;
        }
        const n = y.renderSlide(e, !0, !1);
        if (n === null) {
            postMessage({
                type: "error",
                id: t,
                message: `slide ${e} not found`
            });
            return;
        }
        const o = [], a = new Map;
        for (const [s, r] of n.media)a.set(s, r), o.push(r.bytes.buffer);
        postMessage({
            type: "rendered",
            id: t,
            slide: n.slide_number,
            svg: n.svg,
            media: a,
            notes: n.notes,
            layoutName: n.layout_name,
            sectionName: n.section_name
        }, o);
    }
    function I(t) {
        y?.free?.(), y = null, postMessage({
            type: "closed",
            id: t
        });
    }
    self.addEventListener("message", (t)=>{
        const e = t.data;
        switch(e.type){
            case "open":
                J(e.id, e.bytes, e.extraFontDefsCss).catch((n)=>{
                    postMessage({
                        type: "error",
                        id: e.id,
                        message: String(n?.message ?? n)
                    });
                });
                break;
            case "render":
                try {
                    W(e.id, e.slide);
                } catch (n) {
                    postMessage({
                        type: "error",
                        id: e.id,
                        message: String(n?.message ?? n)
                    });
                }
                break;
            case "close":
                I(e.id);
                break;
        }
    });
})();
