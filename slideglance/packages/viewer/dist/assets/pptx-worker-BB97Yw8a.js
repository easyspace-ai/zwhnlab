//#region src/pptx-worker.ts
const MEASURE_FALLBACK_CJK = [
	"Pretendard",
	"Apple SD Gothic Neo",
	"맑은 고딕",
	"Malgun Gothic",
	"Noto Sans CJK KR",
	"Noto Sans KR"
];
const PT_TO_PX = 96 / 72;
const CJK_RE = /[　-鿿가-힯豈-﫿！-｠ᄀ-ᇿꥠ-꥿ힰ-퟿]/;
let measureCanvasCtx = null;
function getMeasureCtx() {
	if (measureCanvasCtx === null) measureCanvasCtx = new OffscreenCanvas(1, 1).getContext("2d", { willReadFrequently: false });
	return measureCanvasCtx;
}
const measureCache = /* @__PURE__ */ new Map();
function measureTextWidth(text, fontFamily, fontFamilyEa, fontFamilyChain, fontSizePt, bold) {
	const isCjk = CJK_RE.test(text);
	let families;
	if (fontFamilyChain != null && fontFamilyChain.length > 0) families = fontFamilyChain.endsWith("sans-serif") ? fontFamilyChain : `${fontFamilyChain}, sans-serif`;
	else if (fontFamily != null && fontFamily.length > 0) families = fontFamily.endsWith("sans-serif") ? fontFamily : `${fontFamily}, sans-serif`;
	else if (fontFamilyEa != null && fontFamilyEa.length > 0 && isCjk) {
		const fallbackList = MEASURE_FALLBACK_CJK.map((f) => `'${f}'`);
		families = [
			`'${fontFamilyEa.replace(/'/g, "\\'")}'`,
			...fallbackList,
			"sans-serif"
		].join(", ");
	} else families = [...isCjk ? MEASURE_FALLBACK_CJK.map((f) => `'${f}'`) : [], "sans-serif"].join(", ");
	const px = fontSizePt * PT_TO_PX;
	const fontDecl = `${bold ? "bold" : "normal"} ${px}px ${families}`;
	const cacheKey = `${fontDecl}\x1f${text}`;
	const cached = measureCache.get(cacheKey);
	if (cached !== void 0) return cached;
	const ctx = getMeasureCtx();
	ctx.font = fontDecl;
	const c = ctx;
	if (c.fontKerning !== void 0) c.fontKerning = "none";
	if (c.letterSpacing !== void 0) c.letterSpacing = "0px";
	if (c.wordSpacing !== void 0) c.wordSpacing = "0px";
	const w = ctx.measureText(text).width;
	if (measureCache.size > 5e4) measureCache.clear();
	measureCache.set(cacheKey, w);
	return w;
}
self.__slideglanceMeasureText = measureTextWidth;
function measureLineMetrics(fontDecl) {
	const ctx = getMeasureCtx();
	ctx.font = fontDecl;
	const m = ctx.measureText("Mg");
	const fontMetrics = m;
	return {
		ascent: fontMetrics.fontBoundingBoxAscent ?? m.actualBoundingBoxAscent ?? 0,
		descent: fontMetrics.fontBoundingBoxDescent ?? m.actualBoundingBoxDescent ?? 0,
		lineGap: 0
	};
}
self.__slideglanceMeasureLineMetrics = measureLineMetrics;
let coreModulePromise = null;
async function loadCore() {
	if (coreModulePromise === null) coreModulePromise = (async () => {
		const mod = await import("@slideglance/core");
		if (typeof mod.default === "function") try {
			await mod.default();
		} catch {}
		return mod;
	})();
	return coreModulePromise;
}
let doc = null;
function parseFontFacesFromCss(css) {
	const faces = [];
	const blockRe = /@font-face\s*\{([^}]*)\}/g;
	let match;
	while ((match = blockRe.exec(css)) !== null) {
		const block = match[1];
		const familyMatch = /font-family\s*:\s*['"]([^'"]+)['"]/i.exec(block);
		const srcMatch = /src\s*:\s*(url\([^)]+\))/i.exec(block);
		if (familyMatch != null && srcMatch != null) faces.push({
			family: familyMatch[1],
			src: srcMatch[1]
		});
	}
	return faces;
}
/**
* Pre-validate a TTF byte buffer's cmap table against the same
* constraints Chromium's OTS sanitizer enforces. Returns
* `{ok: false, reason}` when the font would be rejected by the
* browser's font loader so the caller can skip handing it to
* `FontFace.load()`.
*
* Why this is necessary even with the FontFace API: Chromium emits
* `OTS parsing error: …` console warnings at the C++ level
* (`WebFontLoader::ots_message_func`) regardless of whether the
* loading path is CSS `@font-face` or `new FontFace().load()`. JS
* has no hook to suppress these warnings — the only way to keep the
* console clean is to reject the font before it ever reaches OTS.
*
* Validates format-4 subtables — the dominant subtable kind for
* CJK fonts and the format `mtx-decompressor` produces with stale
* `idRangeOffset` pointers / 0xFFFF glyph-id sentinels for some
* Hangul faces:
*  1. Each subtable's declared length stays inside the cmap table.
*  2. Each non-zero `idRangeOffset` walks to an address still
*     inside the subtable.
*  3. Computed glyph IDs (via `idDelta + char` or `glyphIdArray`)
*     never exceed `maxp.numGlyphs` — mirrors OTS `cmap.cc`
*     ParseFormat4 "Range glyph reference too high".
*
* Other cmap formats (0/2/6/12/14) are not exhaustively validated —
* we trust those when the table directory is structurally sound.
*
* This is bounded reactive maintenance: cmap is the dominant MTX
* failure mode. If new fonts surface OTHER OTS table-level
* rejections (head/maxp/glyf/loca/post/...) we'd add validators
* for those alongside this one. The fallback chain (Google Fonts
* bundle + metric-match catalog) handles every rejected face so
* deck rendering is never blocked.
*/
function validateCmap(ttf) {
	if (ttf.length < 12) return {
		ok: false,
		reason: "header too short"
	};
	const view = new DataView(ttf.buffer, ttf.byteOffset, ttf.byteLength);
	const numTables = view.getUint16(4);
	let cmapOff = -1;
	let cmapLen = 0;
	let maxpOff = -1;
	for (let i = 0; i < numTables; i++) {
		const recOff = 12 + i * 16;
		if (recOff + 16 > ttf.length) return {
			ok: false,
			reason: "table directory truncated"
		};
		const tag = String.fromCharCode(ttf[recOff], ttf[recOff + 1], ttf[recOff + 2], ttf[recOff + 3]);
		const off = view.getUint32(recOff + 8);
		const len = view.getUint32(recOff + 12);
		if (tag === "cmap") {
			cmapOff = off;
			cmapLen = len;
		} else if (tag === "maxp") maxpOff = off;
	}
	if (cmapOff < 0 || maxpOff < 0) return { ok: true };
	if (maxpOff + 6 > ttf.length) return {
		ok: false,
		reason: "maxp truncated"
	};
	const numGlyphs = view.getUint16(maxpOff + 4);
	if (cmapOff + cmapLen > ttf.length || cmapOff + 4 > ttf.length) return {
		ok: false,
		reason: "cmap range out of bounds"
	};
	const cmapEnd = cmapOff + cmapLen;
	const numSubtables = view.getUint16(cmapOff + 2);
	for (let i = 0; i < numSubtables; i++) {
		const recOff = cmapOff + 4 + i * 8;
		if (recOff + 8 > cmapEnd) return {
			ok: false,
			reason: "encoding record overflow"
		};
		const subOffFromCmap = view.getUint32(recOff + 4);
		const sub = cmapOff + subOffFromCmap;
		if (sub + 6 > cmapEnd) return {
			ok: false,
			reason: "subtable header overflow"
		};
		if (view.getUint16(sub) !== 4) continue;
		const subEnd = sub + view.getUint16(sub + 2);
		if (subEnd > cmapEnd) return {
			ok: false,
			reason: "subtable length exceeds cmap"
		};
		const segCount = view.getUint16(sub + 6) >>> 1;
		const endCodesOff = sub + 14;
		const startCodesOff = endCodesOff + segCount * 2 + 2;
		const idDeltasOff = startCodesOff + segCount * 2;
		const idRangeOffsetsOff = idDeltasOff + segCount * 2;
		if (idRangeOffsetsOff + segCount * 2 > subEnd) return {
			ok: false,
			reason: "format-4 segment arrays exceed subtable"
		};
		for (let s = 0; s < segCount; s++) {
			const start = view.getUint16(startCodesOff + s * 2);
			const end = view.getUint16(endCodesOff + s * 2);
			const delta = view.getInt16(idDeltasOff + s * 2);
			const rangeOff = view.getUint16(idRangeOffsetsOff + s * 2);
			if (start > end) return {
				ok: false,
				reason: "segment start > end"
			};
			if (rangeOff === 0) {
				const span = end - start;
				const limit = Math.min(span, 65535) + 1;
				for (let j = 0; j < limit; j++) {
					const cp = start + j & 65535;
					const glyph = cp + delta & 65535;
					if (glyph >= numGlyphs) return {
						ok: false,
						reason: `seg${s} cp U+${cp.toString(16)} → gid ${glyph} >= numGlyphs ${numGlyphs}`
					};
				}
			} else {
				const idRangeOffsetOffset = idRangeOffsetsOff + s * 2;
				for (let cp = start; cp <= end; cp++) {
					const rangeDelta = cp - start;
					const glyphIdOffset = idRangeOffsetOffset + rangeOff + rangeDelta * 2;
					if (glyphIdOffset + 1 >= subEnd) return {
						ok: false,
						reason: `seg${s} cp U+${cp.toString(16)}: glyph_id_offset ${glyphIdOffset} past subtable end`
					};
					const glyphRaw = view.getUint16(glyphIdOffset);
					if (glyphRaw >= numGlyphs) return {
						ok: false,
						reason: `seg${s} cp U+${cp.toString(16)} → raw gid ${glyphRaw} >= numGlyphs ${numGlyphs}`
					};
				}
			}
		}
	}
	return { ok: true };
}
/**
* Decompress MicroType Express (MTX) compressed `<p:embeddedFont>`
* payloads, register the result on the worker's own `FontFaceSet`
* (so canvas measurement uses the right metrics), and return the
* raw TTF bytes for each face the worker thread can transfer back
* to the main thread.
*
* The Rust pipeline drops MTX-compressed faces because the
* algorithm is a proprietary Agfa Monotype variant of LZ77 +
* adaptive Huffman that we don't decode in Rust. The
* `mtx-decompressor` npm package handles the algorithm in JS; the
* decoded TTF bytes here come straight from that pipeline.
*
* We pre-filter via `validateCmap` because Chromium's OTS sanitizer
* emits `OTS parsing error: …` console warnings at the C++ level
* for any malformed table — there is no JS-side suppression
* regardless of whether the load goes through CSS or the FontFace
* API. Keeping malformed faces out of the loader entirely is the
* only way to keep the console clean.
*/
async function decompressMtxFonts(entries) {
	if (entries.length === 0) return {
		decoded: [],
		failures: []
	};
	let decompressEotFont;
	try {
		decompressEotFont = (await import("./dist-VAmN-UeM.js")).decompressEotFont;
	} catch (err) {
		return {
			decoded: [],
			failures: entries.map((e) => ({
				family: e.family,
				reason: `mtx-decompressor unavailable: ${err instanceof Error ? err.message : String(err)}`
			}))
		};
	}
	const decoded = [];
	const failures = [];
	for (const entry of entries) try {
		const ttf = decompressEotFont(entry.payload, true, false);
		if (ttf.length < 4 || !(ttf[0] === 0 && ttf[1] === 1 && ttf[2] === 0 && ttf[3] === 0 || ttf[0] === 79 && ttf[1] === 84 && ttf[2] === 84 && ttf[3] === 79)) {
			failures.push({
				family: entry.family,
				reason: "decompressed payload missing TTF/OTF magic"
			});
			continue;
		}
		const cmapValid = validateCmap(ttf);
		if (!cmapValid.ok) {
			failures.push({
				family: entry.family,
				reason: `cmap validation failed: ${cmapValid.reason}`
			});
			continue;
		}
		try {
			const loaded = await new FontFace(entry.family, ttf.buffer, {
				weight: entry.weight,
				style: entry.style
			}).load();
			self.fonts.add(loaded);
			decoded.push({
				family: entry.family,
				weight: entry.weight,
				style: entry.style,
				bytes: new Uint8Array(ttf)
			});
		} catch (err) {
			failures.push({
				family: entry.family,
				reason: `FontFace.load failed: ${err instanceof Error ? err.message : String(err)}`
			});
		}
	} catch (err) {
		failures.push({
			family: entry.family,
			reason: `mtx decompress failed: ${err instanceof Error ? err.message : String(err)}`
		});
	}
	return {
		decoded,
		failures
	};
}
async function handleOpen(id, bytes, extraFontDefsCss) {
	const core = await loadCore();
	doc?.free?.();
	doc = new core.PptxDocument(bytes, [], true);
	const slideCount = doc.slideCount();
	let fontDefs = doc.fontDefs();
	const mtxResult = await decompressMtxFonts(doc.mtxCompressedFonts?.() ?? []);
	const deckFaces = parseFontFacesFromCss(fontDefs);
	const extraFaces = extraFontDefsCss ? parseFontFacesFromCss(extraFontDefsCss) : [];
	const faces = [...deckFaces, ...extraFaces];
	const fontLoadFailures = [...mtxResult.failures];
	await Promise.all(faces.map(async ({ family, src }) => {
		try {
			const loaded = await new FontFace(family, src).load();
			self.fonts.add(loaded);
		} catch (err) {
			const reason = err instanceof Error ? `${err.name}: ${err.message}` : String(err);
			fontLoadFailures.push({
				family,
				reason
			});
		}
	}));
	let fontUsage;
	try {
		fontUsage = doc.fontUsage();
	} catch {
		fontUsage = [];
	}
	const decodedFonts = mtxResult.decoded.map((d) => ({
		family: d.family,
		weight: d.weight,
		style: d.style,
		bytes: d.bytes
	}));
	const decodedTransfer = decodedFonts.map((d) => d.bytes.buffer);
	postMessage({
		type: "opened",
		id,
		slideCount,
		fontDefs,
		fontUsage,
		fontLoadFailures,
		decodedFonts
	}, decodedTransfer);
}
function handleRender(id, slide) {
	if (doc === null) {
		postMessage({
			type: "error",
			id,
			message: "no document open"
		});
		return;
	}
	const result = doc.renderSlide(slide, true, false);
	if (result === null) {
		postMessage({
			type: "error",
			id,
			message: `slide ${slide} not found`
		});
		return;
	}
	const transfer = [];
	const media = /* @__PURE__ */ new Map();
	for (const [key, value] of result.media) {
		media.set(key, value);
		transfer.push(value.bytes.buffer);
	}
	postMessage({
		type: "rendered",
		id,
		slide: result.slide_number,
		svg: result.svg,
		media,
		notes: result.notes,
		layoutName: result.layout_name,
		sectionName: result.section_name
	}, transfer);
}
function handleClose(id) {
	doc?.free?.();
	doc = null;
	postMessage({
		type: "closed",
		id
	});
}
self.addEventListener("message", (ev) => {
	const msg = ev.data;
	switch (msg.type) {
		case "open":
			handleOpen(msg.id, msg.bytes, msg.extraFontDefsCss).catch((err) => {
				postMessage({
					type: "error",
					id: msg.id,
					message: String(err?.message ?? err)
				});
			});
			break;
		case "render":
			try {
				handleRender(msg.id, msg.slide);
			} catch (err) {
				postMessage({
					type: "error",
					id: msg.id,
					message: String(err?.message ?? err)
				});
			}
			break;
		case "close":
			handleClose(msg.id);
			break;
		default: break;
	}
});
//#endregion

//# sourceMappingURL=pptx-worker-BB97Yw8a.js.map