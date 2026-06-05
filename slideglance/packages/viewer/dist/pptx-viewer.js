import { memo, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { ArrowsOutSimple, CaretLeft, CaretRight, ChatCircleText, FilePdf, GearSix, GridFour, MagnifyingGlass, Minus, Play, Plus, Printer, Question, SkipBack, SkipForward, SquaresFour, Warning, X } from "@phosphor-icons/react";
//#region src/svg-utils.ts
/**
* Pull the slide aspect ratio (width / height) from the SVG's
* `viewBox`. Returns `null` when the SVG is empty or malformed; the
* caller should fall back to 16:9 in that case.
*/
function parseAspect(svg) {
	const match = svg.match(/viewBox=["']([^"']+)["']/);
	if (!match) return null;
	const parts = match[1].split(/\s+/).map(Number);
	if (parts.length < 4) return null;
	const w = parts[2];
	const h = parts[3];
	if (!Number.isFinite(w) || !Number.isFinite(h) || w <= 0 || h <= 0) return null;
	return w / h;
}
/**
* Strip the renderer's intrinsic `width="…"` / `height="…"` attributes
* off the outer `<svg>` and inject `style="width:100%;height:100%;
* display:block"` so the SVG fills its container regardless of CSS
* resolution order. The renderer emits these attributes to keep the
* deck's native pixel dimensions, but they fight the viewer's
* fit-to-stage layout when rendered inline.
*/
function prepareSvg(svg) {
	return svg.replace(/<svg\b([^>]*)>/, (_match, rawAttrs) => {
		return `<svg${rawAttrs.replace(/\swidth=(["'])[^"']*\1/g, "").replace(/\sheight=(["'])[^"']*\1/g, "")} style="width:100%;height:100%;display:block">`;
	});
}
/**
* Rewrite every `id="…"` and matching `url(#…)` / `href="#…"` /
* `xlink:href="#…"` reference inside an SVG so the IDs become unique
* within the host document.
*
* Why this is needed: HTML id namespace is document-wide. The viewer
* mounts the same slide SVG simultaneously in the main stage and the
* thumbnail panel, and renders sibling slides for grid view — every
* one of those SVGs ships the same internal IDs (`crop-0`, `crop-1`,
* `tile-0`, …) emitted by `slideglance-renderer`. Browsers resolve
* `url(#crop-1)` against the *first* matching element in the
* document, which is not necessarily the one inside the SVG that
* declares the reference. The visible symptom is clip / mask /
* gradient bleed across slides — most dramatically, picture frames
* being clipped to the bounding box of an unrelated slide's tiny
* thumbnail icon.
*
* Pass a different `prefix` per mount site (e.g. `main-{slide}`,
* `thumb-{slide}`) so siblings don't collide either.
*/
function uniquifyIds(svg, prefix) {
	prefix.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	return svg.replace(/\bid="([^"]+)"/g, (_m, id) => `id="${prefix}-${id}"`).replace(/\burl\(['"]?#([^'")]+)['"]?\)/g, (_m, id) => `url(#${prefix}-${id})`).replace(/\b(xlink:)?href="#([^"]+)"/g, (_m, ns, id) => `${ns ?? ""}href="#${prefix}-${id}"`);
}
/**
* Pull the first family out of an SVG `font-family` attribute value,
* stripping the surrounding quotes and trimming whitespace. The
* renderer emits a chain such as `'Source Sans 3', "Open Sans", arial`
* — the first entry is what the source PPTX authored, and the rest are
* fallbacks. Returns `null` when the input is empty or only contains
* fallback aliases the user didn't write themselves (`sans-serif`,
* `serif`, `monospace`, etc.) — those are renderer noise, not authored
* typefaces, and surfacing them in the status bar would mislead.
*/
function parseFirstFontFamily(value) {
	const head = value.split(",")[0]?.trim();
	if (!head) return null;
	const unquoted = head.replace(/^['"]|['"]$/g, "").trim();
	if (!unquoted) return null;
	const lower = unquoted.toLowerCase();
	if (lower === "serif" || lower === "sans-serif" || lower === "monospace" || lower === "cursive" || lower === "fantasy" || lower === "system-ui") return null;
	return unquoted;
}
/**
* Replace `pptx-media://{hash}` URLs in the SVG with browser-friendly
* `blob:` URLs created from the supplied media map. Returns the
* rewritten SVG plus the array of blob URLs the caller is responsible
* for revoking when the slide unmounts.
*/
function rewriteMediaRefs(svg, media) {
	if (media.size === 0) return {
		svg,
		blobUrls: []
	};
	const blobUrls = [];
	return {
		svg: svg.replace(/pptx-media:\/\/([a-zA-Z0-9_-]+)/g, (match, hash) => {
			const blob = media.get(hash);
			if (!blob) return match;
			const url = URL.createObjectURL(new Blob([blob.bytes], { type: blob.mime }));
			blobUrls.push(url);
			return url;
		}),
		blobUrls
	};
}
/**
* Hoist the deck-wide `<style>...@font-face...</style>` block out of
* the first slide's SVG so the viewer can mount it once at the shadow-
* root level instead of duplicating tens of MB of base64 across every
* slide. Returns the extracted CSS body, and rewrites `slides[0].svg`
* in place to remove the hoisted block. Returns `""` when there is
* nothing to hoist.
*/
function extractAndStripFontStyle(slides) {
	if (slides.length === 0) return "";
	const first = slides[0];
	if (!first || typeof first.svg !== "string") return "";
	const re = /<style\b[^>]*>([\s\S]*?@font-face[\s\S]*?)<\/style>/i;
	const match = first.svg.match(re);
	if (!match) return "";
	const css = match[1] ?? "";
	if (css.trim().length === 0) return "";
	slides[0] = {
		...first,
		svg: first.svg.replace(re, "")
	};
	return css;
}
/**
* Extract the bare CSS rules (the `@font-face` declarations) from the
* `<defs><style>…</style></defs>` block that
* `slideglance-wasm`'s `fontDefs()` returns.
*
* Background: when the host renders slides with `includeFontDefs:false`
* (the worker controller's path — fonts are inlined once, not per
* slide), the returned `fontDefs` string still wraps the CSS in an
* SVG `<defs>` shell so the same payload can be used by
* `includeFontDefs:true` callers without conditional formatting. Hosts
* that mount these declarations into `document.head` need just the
* inner CSS without the SVG wrapper.
*
* Returns `""` when the input is empty or contains no `<style>` block.
*/
function extractFontStyleCss(fontDefs) {
	if (typeof fontDefs !== "string" || fontDefs.length === 0) return "";
	const match = fontDefs.match(/<style\b[^>]*>([\s\S]*?)<\/style>/i);
	if (!match) return "";
	return (match[1] ?? "").trim();
}
//#endregion
//#region src/ui/i18n.ts
/** All concrete locales the viewer ships catalogs for. */
var SUPPORTED_LOCALES = Object.freeze([
	"en",
	"ko",
	"ja",
	"zh-CN",
	"zh-TW",
	"es",
	"fr",
	"de"
]);
var EN = {
	_locale: "en",
	"common.close": "Close",
	"common.cancel": "Cancel",
	"common.loading": "Loading…",
	"common.ready": "Ready.",
	"common.bytes": "{count} bytes",
	"nav.firstSlide": "First slide",
	"nav.previousSlide": "Previous (←)",
	"nav.nextSlide": "Next (→)",
	"nav.lastSlide": "Last slide",
	"nav.slideCounter": "{current} / {total}",
	"nav.slideCounterEmpty": "—",
	"search.button": "Search",
	"search.placeholder": "Find in slides…",
	"search.title": "Search (Cmd/Ctrl+F)",
	"search.empty": "Search",
	"search.noMatches": "No matches.",
	"search.typeToSearch": "Type to search.",
	"output.print": "Print",
	"output.printTitle": "Print (Cmd/Ctrl+P)",
	"output.pdf": "PDF",
	"output.pdfTitle": "Export PDF",
	"output.slideshow": "Slideshow",
	"output.slideshowTitle": "Start slideshow (F5)",
	"output.gateLoadFirst": "Load a deck first",
	"output.gatePreparing": "Preparing slides — {current} / {total} ready",
	"settings.title": "Settings",
	"settings.openTitle": "Settings",
	"file.open": "Open",
	"render.label": "Text Rendering:",
	"render.text": "Vector Text",
	"render.path": "Path Outline",
	"render.auto": "Auto",
	"status.toggleNotes": "Toggle notes pane",
	"status.resizeSidebar": "Drag to resize the thumbnail sidebar",
	"status.normalView": "Normal view (slide + thumbnail panel)",
	"status.gridView": "Slide sorter — show every slide at once",
	"status.zoomOut": "Zoom out",
	"status.zoomIn": "Zoom in",
	"status.zoomReset": "Reset to 100%",
	"status.fitWindow": "Fit slide to window",
	"status.zoom": "Zoom",
	"status.slideOf": "slide {current} / {total}",
	"status.slideEmpty": "—",
	"status.selectionFontLabel": "Font:",
	"status.selectionFontMultiple": "{first} +{extra} more",
	"status.selectionFontTitle": "Font(s) used by the selection: {fonts}",
	"fontUsage.title": "Font mapping",
	"fontUsage.close": "Close",
	"fontUsage.headerRequested": "Authored",
	"fontUsage.headerEffective": "Rendered as",
	"fontUsage.systemFallback": "system fallback",
	"fontUsage.allMatched": "All authored fonts available",
	"fontUsage.substituteCount": "{count} font(s) substituted",
	"notes.heading": "Notes — slide {current}",
	"notes.headingWithSection": "Notes — slide {current} · {section}",
	"notes.empty": "No notes for this slide.",
	"notes.standaloneHeading": "Notes — slide {current}",
	"notes.standaloneEmpty": "No speaker notes for this slide.",
	"notes.layoutLabel": "layout: {value}",
	"notes.sectionLabel": "section: {value}",
	"notes.noSlide": "No slide loaded.",
	"section.empty": "no sections",
	"dialog.title": "Settings",
	"dialog.appearance": "Appearance",
	"dialog.theme": "Theme",
	"dialog.themeDesc": "Applied to the entire viewer including the slide stage, ribbon, sidebar, and dialogs.",
	"dialog.themeAuto": "Auto",
	"dialog.themeAutoDesc": "Follow OS / browser",
	"dialog.themeLight": "Light",
	"dialog.themeLightDesc": "Always light",
	"dialog.themeDark": "Dark",
	"dialog.themeDarkDesc": "Always dark",
	"dialog.themeHighContrast": "High contrast",
	"dialog.themeHighContrastDesc": "Accessibility",
	"dialog.ruler": "Ruler",
	"dialog.rulerShow": "Show ruler around the slide",
	"dialog.rulerUnitLabel": "Unit",
	"dialog.rulerUnitDesc": "PowerPoint default centres the slide on 0 with cm tick marks. Pixel mode shows on-screen pixel coordinates starting at the slide edge.",
	"dialog.rulerUnitCm": "Centimetres (cm)",
	"dialog.rulerUnitCmDesc": "PowerPoint default",
	"dialog.rulerUnitPx": "Pixels (px)",
	"dialog.rulerUnitPxDesc": "On-screen pixels",
	"dialog.language": "Language",
	"dialog.languageDesc": "Choose the viewer interface language. Auto follows your browser / OS preference.",
	"dialog.languageAuto": "Auto ({detected})",
	"dialog.about": "About",
	"dialog.aboutAppName": "App",
	"dialog.aboutVersion": "Version",
	"dialog.aboutRendering": "Environment",
	"dialog.aboutRenderingValue": "WebAssembly · browser-only · offline-capable",
	"dialog.aboutEngine": "Engine",
	"dialog.aboutNpmPackage": "Frontend (npm)",
	"dialog.aboutPackage": "Package",
	"dialog.aboutLicense": "License",
	"dialog.aboutCopyright": "Copyright",
	"dialog.aboutDeveloper": "Developer",
	"dialog.aboutRepository": "Repository",
	"dialog.viewerSettingsAriaLabel": "Viewer settings",
	"phase.preparingSlide": "Preparing slide {current} / {total}…",
	"phase.renderingPdf": "Rendering PDF page {current} / {total}…",
	"phase.encodingPdf": "Encoding PDF…",
	"phase.preparingSlides": "Preparing slides…",
	"status.loadedSlides": "Loaded {count} slides",
	"status.nothingToPrint": "Nothing to print.",
	"status.nothingToExport": "Nothing to export.",
	"status.pdfFailed": "PDF export failed: {reason}",
	"status.exported": "Exported {count} slides to PDF.",
	"status.errorPrefix": "[error:{phase}] {message}",
	"viewer.ariaLabel": "PPTX viewer",
	"viewer.noFile": "(no file)",
	"viewer.slideTitle": "Slide {number}",
	"viewer.empty": "Open a .pptx file.",
	"viewer.openFile": "Open file",
	"phase.preparingSlideOf": "Preparing slide {current} / {total}",
	"phase.preparingPdf": "Preparing PDF…",
	"phase.preparingPrint": "Preparing print…",
	"phase.layingOutPrintOf": "Laying out page {current} / {total}…",
	"phase.openingPrintDialog": "Opening print dialog…",
	"phase.savingPdf": "Saving PDF…",
	"progress.titlePrint": "Preparing print",
	"progress.titlePdf": "Exporting PDF",
	"viewer.loading": "Loading…",
	"viewer.error": "⚠ {message}",
	"playground.title": "slideglance playground",
	"playground.upload": "upload:",
	"playground.samples": "samples:",
	"playground.pickPrompt": "Pick a sample or upload a .pptx.",
	"playground.loadingFile": "Loading {name}…",
	"playground.failedHttp": "Failed: HTTP {status}",
	"playground.fileInfo": "{name} · {bytes} bytes · {ms} ms",
	"playground.convertFailed": "Convert failed: {reason}",
	"shortcuts.title": "Keyboard shortcuts",
	"shortcuts.openTitle": "Keyboard shortcuts",
	"shortcuts.groupNavigation": "Navigation",
	"shortcuts.groupView": "View",
	"shortcuts.groupSelection": "Selection",
	"shortcuts.groupOutput": "Search & output",
	"shortcuts.prevSlide": "Previous slide",
	"shortcuts.nextSlide": "Next slide",
	"shortcuts.firstSlide": "First slide",
	"shortcuts.lastSlide": "Last slide",
	"shortcuts.zoomIn": "Zoom in",
	"shortcuts.zoomOut": "Zoom out",
	"shortcuts.zoomReset": "Reset zoom to 100%",
	"shortcuts.panSlide": "Pan slide while held",
	"shortcuts.click": "Click",
	"shortcuts.drag": "Drag",
	"shortcuts.doubleClick": "Double-click",
	"shortcuts.selectShape": "Select a shape",
	"shortcuts.toggleSelect": "Toggle shape in selection",
	"shortcuts.rubberBand": "Rubber-band select",
	"shortcuts.selectAll": "Select every shape",
	"shortcuts.copyText": "Copy selected text",
	"shortcuts.editText": "Enter text-edit mode",
	"shortcuts.clearSelection": "Clear selection / exit",
	"shortcuts.toggleSearch": "Find in slides",
	"shortcuts.print": "Print deck"
};
var CATALOGS = {
	en: EN,
	ko: {
		_locale: "ko",
		"common.close": "닫기",
		"common.cancel": "취소",
		"common.loading": "로드 중…",
		"common.ready": "준비됨.",
		"common.bytes": "{count} 바이트",
		"nav.firstSlide": "첫 슬라이드",
		"nav.previousSlide": "이전 (←)",
		"nav.nextSlide": "다음 (→)",
		"nav.lastSlide": "마지막 슬라이드",
		"nav.slideCounter": "{current} / {total}",
		"nav.slideCounterEmpty": "—",
		"search.button": "검색",
		"search.placeholder": "슬라이드 내 검색…",
		"search.title": "검색 (Cmd/Ctrl+F)",
		"search.empty": "검색",
		"search.noMatches": "결과 없음.",
		"search.typeToSearch": "검색어를 입력하세요.",
		"output.print": "인쇄",
		"output.printTitle": "인쇄 (Cmd/Ctrl+P)",
		"output.pdf": "PDF",
		"output.pdfTitle": "PDF로 내보내기",
		"output.slideshow": "슬라이드쇼",
		"output.slideshowTitle": "슬라이드쇼 시작 (F5)",
		"output.gateLoadFirst": "먼저 파일을 여세요",
		"output.gatePreparing": "슬라이드 준비 중 — {current} / {total} 완료",
		"settings.title": "설정",
		"settings.openTitle": "설정",
		"file.open": "열기",
		"render.label": "텍스트 렌더링:",
		"render.text": "벡터 텍스트",
		"render.path": "경로 외곽선",
		"render.auto": "자동",
		"status.toggleNotes": "노트 창 토글",
		"status.resizeSidebar": "썸네일 사이드바 너비 조절 (드래그)",
		"status.normalView": "기본 보기 (슬라이드 + 썸네일)",
		"status.gridView": "여러 슬라이드 보기",
		"status.zoomOut": "축소",
		"status.zoomIn": "확대",
		"status.zoomReset": "100%로 재설정",
		"status.fitWindow": "창에 맞춤",
		"status.zoom": "확대/축소",
		"status.slideOf": "슬라이드 {current} / {total}",
		"status.slideEmpty": "—",
		"status.selectionFontLabel": "폰트:",
		"status.selectionFontMultiple": "{first} 외 {extra}개",
		"status.selectionFontTitle": "선택 항목에 사용된 폰트: {fonts}",
		"fontUsage.title": "폰트 매핑",
		"fontUsage.close": "닫기",
		"fontUsage.headerRequested": "원본 폰트",
		"fontUsage.headerEffective": "렌더 폰트",
		"fontUsage.systemFallback": "시스템 기본 폰트",
		"fontUsage.allMatched": "모든 원본 폰트 사용 중",
		"fontUsage.substituteCount": "{count}개 폰트 대체 중",
		"notes.heading": "노트 — 슬라이드 {current}",
		"notes.headingWithSection": "노트 — 슬라이드 {current} · {section}",
		"notes.empty": "이 슬라이드의 노트가 없습니다.",
		"notes.standaloneHeading": "노트 — 슬라이드 {current}",
		"notes.standaloneEmpty": "이 슬라이드의 발표자 노트가 없습니다.",
		"notes.layoutLabel": "레이아웃: {value}",
		"notes.sectionLabel": "섹션: {value}",
		"notes.noSlide": "로드된 슬라이드 없음.",
		"section.empty": "섹션 없음",
		"dialog.title": "설정",
		"dialog.appearance": "모양",
		"dialog.theme": "테마",
		"dialog.themeDesc": "슬라이드, 리본, 사이드바, 대화 상자를 포함한 뷰어 전체에 적용됩니다.",
		"dialog.themeAuto": "자동",
		"dialog.themeAutoDesc": "OS / 브라우저 따라가기",
		"dialog.themeLight": "라이트",
		"dialog.themeLightDesc": "항상 밝게",
		"dialog.themeDark": "다크",
		"dialog.themeDarkDesc": "항상 어둡게",
		"dialog.themeHighContrast": "고대비",
		"dialog.themeHighContrastDesc": "접근성",
		"dialog.ruler": "눈금자",
		"dialog.rulerShow": "슬라이드 주변에 눈금자 표시",
		"dialog.rulerUnitLabel": "단위",
		"dialog.rulerUnitDesc": "PowerPoint 기본은 슬라이드를 0에 중심을 두고 cm 눈금을 표시합니다. 픽셀 모드는 슬라이드 가장자리에서 시작하는 화면 좌표를 보여줍니다.",
		"dialog.rulerUnitCm": "센티미터 (cm)",
		"dialog.rulerUnitCmDesc": "PowerPoint 기본값",
		"dialog.rulerUnitPx": "픽셀 (px)",
		"dialog.rulerUnitPxDesc": "화면 픽셀",
		"dialog.language": "언어",
		"dialog.languageDesc": "뷰어 인터페이스 언어를 선택합니다. 자동은 브라우저/OS 기본값을 따릅니다.",
		"dialog.languageAuto": "자동 ({detected})",
		"dialog.about": "정보",
		"dialog.aboutAppName": "앱",
		"dialog.aboutVersion": "버전",
		"dialog.aboutRendering": "환경",
		"dialog.aboutRenderingValue": "WebAssembly · 브라우저 전용 · 오프라인 지원",
		"dialog.aboutEngine": "엔진",
		"dialog.aboutNpmPackage": "프론트엔드 (npm)",
		"dialog.aboutPackage": "패키지",
		"dialog.aboutLicense": "라이선스",
		"dialog.aboutCopyright": "저작권",
		"dialog.aboutDeveloper": "개발자",
		"dialog.aboutRepository": "저장소",
		"dialog.viewerSettingsAriaLabel": "뷰어 설정",
		"phase.preparingSlide": "슬라이드 준비 중 {current} / {total}…",
		"phase.renderingPdf": "PDF 페이지 렌더링 {current} / {total}…",
		"phase.encodingPdf": "PDF 인코딩 중…",
		"phase.preparingSlides": "슬라이드 준비 중…",
		"status.loadedSlides": "{count}개 슬라이드 로드됨",
		"status.nothingToPrint": "인쇄할 내용 없음.",
		"status.nothingToExport": "내보낼 내용 없음.",
		"status.pdfFailed": "PDF 내보내기 실패: {reason}",
		"status.exported": "{count}개 슬라이드를 PDF로 내보냈습니다.",
		"status.errorPrefix": "[오류:{phase}] {message}",
		"viewer.ariaLabel": "PPTX 뷰어",
		"viewer.noFile": "(파일 없음)",
		"viewer.slideTitle": "슬라이드 {number}",
		"viewer.empty": ".pptx 파일을 여세요.",
		"viewer.openFile": "파일 열기",
		"phase.preparingSlideOf": "슬라이드 준비 중 {current} / {total}",
		"phase.preparingPdf": "PDF 준비 중…",
		"phase.preparingPrint": "인쇄 준비 중…",
		"phase.layingOutPrintOf": "페이지 배치 중 {current} / {total}…",
		"phase.openingPrintDialog": "인쇄 창 여는 중…",
		"phase.savingPdf": "PDF 저장 중…",
		"progress.titlePrint": "인쇄 준비",
		"progress.titlePdf": "PDF 내보내기",
		"viewer.loading": "로드 중…",
		"viewer.error": "⚠ {message}",
		"playground.title": "slideglance 플레이그라운드",
		"playground.upload": "업로드:",
		"playground.samples": "샘플:",
		"playground.pickPrompt": "샘플을 선택하거나 .pptx를 업로드하세요.",
		"playground.loadingFile": "{name} 로드 중…",
		"playground.failedHttp": "실패: HTTP {status}",
		"playground.fileInfo": "{name} · {bytes} 바이트 · {ms} ms",
		"playground.convertFailed": "변환 실패: {reason}",
		"shortcuts.title": "키보드 단축키",
		"shortcuts.openTitle": "키보드 단축키",
		"shortcuts.groupNavigation": "탐색",
		"shortcuts.groupView": "보기",
		"shortcuts.groupSelection": "선택",
		"shortcuts.groupOutput": "검색·출력",
		"shortcuts.prevSlide": "이전 슬라이드",
		"shortcuts.nextSlide": "다음 슬라이드",
		"shortcuts.firstSlide": "첫 슬라이드",
		"shortcuts.lastSlide": "마지막 슬라이드",
		"shortcuts.zoomIn": "확대",
		"shortcuts.zoomOut": "축소",
		"shortcuts.zoomReset": "100%로 재설정",
		"shortcuts.panSlide": "슬라이드 이동 (누르고 드래그)",
		"shortcuts.click": "클릭",
		"shortcuts.drag": "드래그",
		"shortcuts.doubleClick": "더블 클릭",
		"shortcuts.selectShape": "도형 선택",
		"shortcuts.toggleSelect": "선택 토글",
		"shortcuts.rubberBand": "드래그 선택",
		"shortcuts.selectAll": "모든 도형 선택",
		"shortcuts.copyText": "선택한 텍스트 복사",
		"shortcuts.editText": "텍스트 편집 모드",
		"shortcuts.clearSelection": "선택 해제 / 종료",
		"shortcuts.toggleSearch": "슬라이드 검색",
		"shortcuts.print": "인쇄"
	},
	ja: {
		_locale: "ja",
		"common.close": "閉じる",
		"common.cancel": "キャンセル",
		"common.loading": "読み込み中…",
		"common.ready": "準備完了。",
		"common.bytes": "{count} バイト",
		"nav.firstSlide": "最初のスライド",
		"nav.previousSlide": "前へ (←)",
		"nav.nextSlide": "次へ (→)",
		"nav.lastSlide": "最後のスライド",
		"nav.slideCounter": "{current} / {total}",
		"nav.slideCounterEmpty": "—",
		"search.button": "検索",
		"search.placeholder": "スライド内を検索…",
		"search.title": "検索 (Cmd/Ctrl+F)",
		"search.empty": "検索",
		"search.noMatches": "一致なし。",
		"search.typeToSearch": "検索語を入力。",
		"output.print": "印刷",
		"output.printTitle": "印刷 (Cmd/Ctrl+P)",
		"output.pdf": "PDF",
		"output.pdfTitle": "PDF にエクスポート",
		"output.slideshow": "スライドショー",
		"output.slideshowTitle": "スライドショー開始 (F5)",
		"output.gateLoadFirst": "先にデッキを読み込みます",
		"output.gatePreparing": "スライド準備中 — {current} / {total} 完了",
		"settings.title": "設定",
		"settings.openTitle": "設定",
		"file.open": "開く",
		"render.label": "テキスト描画:",
		"render.text": "ベクターテキスト",
		"render.path": "パスアウトライン",
		"render.auto": "自動",
		"status.toggleNotes": "ノートペインの切替",
		"status.resizeSidebar": "サムネイルサイドバーの幅を変更 (ドラッグ)",
		"status.normalView": "標準表示 (スライド + サムネイル)",
		"status.gridView": "スライド一覧表示",
		"status.zoomOut": "縮小",
		"status.zoomIn": "拡大",
		"status.zoomReset": "100% にリセット",
		"status.fitWindow": "ウィンドウに合わせる",
		"status.zoom": "ズーム",
		"status.slideOf": "スライド {current} / {total}",
		"status.slideEmpty": "—",
		"status.selectionFontLabel": "フォント:",
		"status.selectionFontMultiple": "{first} 他 {extra}",
		"status.selectionFontTitle": "選択範囲で使用されているフォント: {fonts}",
		"fontUsage.title": "フォントマッピング",
		"fontUsage.close": "閉じる",
		"fontUsage.headerRequested": "指定フォント",
		"fontUsage.headerEffective": "実際の描画",
		"fontUsage.systemFallback": "システム既定",
		"fontUsage.allMatched": "すべての指定フォントが利用可能",
		"fontUsage.substituteCount": "{count}件のフォントを代替",
		"notes.heading": "ノート — スライド {current}",
		"notes.headingWithSection": "ノート — スライド {current} · {section}",
		"notes.empty": "このスライドのノートはありません。",
		"notes.standaloneHeading": "ノート — スライド {current}",
		"notes.standaloneEmpty": "このスライドの発表者ノートはありません。",
		"notes.layoutLabel": "レイアウト: {value}",
		"notes.sectionLabel": "セクション: {value}",
		"notes.noSlide": "スライドが読み込まれていません。",
		"section.empty": "セクションなし",
		"dialog.title": "設定",
		"dialog.appearance": "外観",
		"dialog.theme": "テーマ",
		"dialog.themeDesc": "スライド、リボン、サイドバー、ダイアログを含むビューワ全体に適用されます。",
		"dialog.themeAuto": "自動",
		"dialog.themeAutoDesc": "OS / ブラウザに従う",
		"dialog.themeLight": "ライト",
		"dialog.themeLightDesc": "常にライト",
		"dialog.themeDark": "ダーク",
		"dialog.themeDarkDesc": "常にダーク",
		"dialog.themeHighContrast": "ハイコントラスト",
		"dialog.themeHighContrastDesc": "アクセシビリティ",
		"dialog.ruler": "ルーラー",
		"dialog.rulerShow": "スライド周囲にルーラーを表示",
		"dialog.rulerUnitLabel": "単位",
		"dialog.rulerUnitDesc": "PowerPoint の既定ではスライドを 0 中心に配置し cm 目盛を表示します。ピクセルモードはスライド端から始まる画面ピクセル座標です。",
		"dialog.rulerUnitCm": "センチメートル (cm)",
		"dialog.rulerUnitCmDesc": "PowerPoint 既定",
		"dialog.rulerUnitPx": "ピクセル (px)",
		"dialog.rulerUnitPxDesc": "画面ピクセル",
		"dialog.language": "言語",
		"dialog.languageDesc": "ビューワの言語を選択します。自動はブラウザ / OS の設定に従います。",
		"dialog.languageAuto": "自動 ({detected})",
		"dialog.about": "情報",
		"dialog.aboutAppName": "アプリ",
		"dialog.aboutEngine": "エンジン",
		"dialog.aboutNpmPackage": "フロントエンド (npm)",
		"dialog.aboutCopyright": "著作権",
		"dialog.aboutDeveloper": "開発者",
		"dialog.aboutRepository": "リポジトリ",
		"dialog.aboutPackage": "パッケージ",
		"dialog.aboutVersion": "バージョン",
		"dialog.aboutRendering": "環境",
		"dialog.aboutRenderingValue": "WebAssembly · ブラウザのみ · オフライン対応",
		"dialog.aboutLicense": "ライセンス",
		"dialog.viewerSettingsAriaLabel": "ビューワ設定",
		"phase.preparingSlide": "スライド準備中 {current} / {total}…",
		"phase.renderingPdf": "PDF ページ描画 {current} / {total}…",
		"phase.encodingPdf": "PDF エンコード中…",
		"phase.preparingSlides": "スライド準備中…",
		"status.loadedSlides": "{count} 枚のスライドを読み込みました",
		"status.nothingToPrint": "印刷対象なし。",
		"status.nothingToExport": "エクスポート対象なし。",
		"status.pdfFailed": "PDF エクスポート失敗: {reason}",
		"status.exported": "{count} 枚のスライドを PDF にエクスポートしました。",
		"status.errorPrefix": "[エラー:{phase}] {message}",
		"viewer.ariaLabel": "PPTX ビューワ",
		"viewer.noFile": "(ファイルなし)",
		"viewer.slideTitle": "スライド {number}",
		"viewer.empty": ".pptx ファイルを開いてください。",
		"viewer.openFile": "ファイルを開く",
		"phase.preparingSlideOf": "スライド準備中 {current} / {total}",
		"phase.preparingPdf": "PDF を準備中…",
		"phase.preparingPrint": "印刷を準備中…",
		"phase.layingOutPrintOf": "ページ配置中 {current} / {total}…",
		"phase.openingPrintDialog": "印刷ダイアログを開いています…",
		"phase.savingPdf": "PDF を保存中…",
		"progress.titlePrint": "印刷の準備",
		"progress.titlePdf": "PDF 書き出し",
		"viewer.loading": "読み込み中…",
		"viewer.error": "⚠ {message}",
		"playground.title": "slideglance プレイグラウンド",
		"playground.upload": "アップロード:",
		"playground.samples": "サンプル:",
		"playground.pickPrompt": "サンプルを選ぶか .pptx をアップロード。",
		"playground.loadingFile": "{name} 読み込み中…",
		"playground.failedHttp": "失敗: HTTP {status}",
		"playground.fileInfo": "{name} · {bytes} バイト · {ms} ms",
		"playground.convertFailed": "変換失敗: {reason}",
		"shortcuts.title": "キーボードショートカット",
		"shortcuts.openTitle": "キーボードショートカット",
		"shortcuts.groupNavigation": "ナビゲーション",
		"shortcuts.groupView": "表示",
		"shortcuts.groupSelection": "選択",
		"shortcuts.groupOutput": "検索・出力",
		"shortcuts.prevSlide": "前のスライド",
		"shortcuts.nextSlide": "次のスライド",
		"shortcuts.firstSlide": "最初のスライド",
		"shortcuts.lastSlide": "最後のスライド",
		"shortcuts.zoomIn": "拡大",
		"shortcuts.zoomOut": "縮小",
		"shortcuts.zoomReset": "100%にリセット",
		"shortcuts.panSlide": "スライドをドラッグで移動",
		"shortcuts.click": "クリック",
		"shortcuts.drag": "ドラッグ",
		"shortcuts.doubleClick": "ダブルクリック",
		"shortcuts.selectShape": "図形を選択",
		"shortcuts.toggleSelect": "選択の切り替え",
		"shortcuts.rubberBand": "ドラッグ選択",
		"shortcuts.selectAll": "すべての図形を選択",
		"shortcuts.copyText": "選択テキストをコピー",
		"shortcuts.editText": "テキスト編集モード",
		"shortcuts.clearSelection": "選択解除 / 終了",
		"shortcuts.toggleSearch": "スライド内検索",
		"shortcuts.print": "印刷"
	},
	"zh-CN": {
		_locale: "zh-CN",
		"common.close": "关闭",
		"common.cancel": "取消",
		"common.loading": "加载中…",
		"common.ready": "就绪。",
		"common.bytes": "{count} 字节",
		"nav.firstSlide": "第一张幻灯片",
		"nav.previousSlide": "上一张 (←)",
		"nav.nextSlide": "下一张 (→)",
		"nav.lastSlide": "最后一张幻灯片",
		"nav.slideCounter": "{current} / {total}",
		"nav.slideCounterEmpty": "—",
		"search.button": "搜索",
		"search.placeholder": "在幻灯片中查找…",
		"search.title": "搜索 (Cmd/Ctrl+F)",
		"search.empty": "搜索",
		"search.noMatches": "无匹配。",
		"search.typeToSearch": "输入以搜索。",
		"output.print": "打印",
		"output.printTitle": "打印 (Cmd/Ctrl+P)",
		"output.pdf": "PDF",
		"output.pdfTitle": "导出为 PDF",
		"output.slideshow": "幻灯片放映",
		"output.slideshowTitle": "开始放映 (F5)",
		"output.gateLoadFirst": "请先加载文件",
		"output.gatePreparing": "正在准备幻灯片 — {current} / {total} 已完成",
		"settings.title": "设置",
		"settings.openTitle": "设置",
		"file.open": "打开",
		"render.label": "文本渲染:",
		"render.text": "矢量文本",
		"render.path": "路径轮廓",
		"render.auto": "自动",
		"status.toggleNotes": "切换备注窗格",
		"status.resizeSidebar": "拖动调整缩略图侧栏宽度",
		"status.normalView": "普通视图 (幻灯片 + 缩略图)",
		"status.gridView": "幻灯片浏览视图",
		"status.zoomOut": "缩小",
		"status.zoomIn": "放大",
		"status.zoomReset": "重置为 100%",
		"status.fitWindow": "适合窗口",
		"status.zoom": "缩放",
		"status.slideOf": "幻灯片 {current} / {total}",
		"status.slideEmpty": "—",
		"status.selectionFontLabel": "字体:",
		"status.selectionFontMultiple": "{first} 等 {extra} 个",
		"status.selectionFontTitle": "所选项目使用的字体: {fonts}",
		"fontUsage.title": "字体映射",
		"fontUsage.close": "关闭",
		"fontUsage.headerRequested": "原始字体",
		"fontUsage.headerEffective": "实际渲染",
		"fontUsage.systemFallback": "系统默认字体",
		"fontUsage.allMatched": "所有原始字体均可用",
		"fontUsage.substituteCount": "{count} 个字体已替换",
		"notes.heading": "备注 — 幻灯片 {current}",
		"notes.headingWithSection": "备注 — 幻灯片 {current} · {section}",
		"notes.empty": "此幻灯片无备注。",
		"notes.standaloneHeading": "备注 — 幻灯片 {current}",
		"notes.standaloneEmpty": "此幻灯片无演讲者备注。",
		"notes.layoutLabel": "版式: {value}",
		"notes.sectionLabel": "节: {value}",
		"notes.noSlide": "未加载幻灯片。",
		"section.empty": "无节",
		"dialog.title": "设置",
		"dialog.appearance": "外观",
		"dialog.theme": "主题",
		"dialog.themeDesc": "应用于整个查看器,包括幻灯片、功能区、侧栏和对话框。",
		"dialog.themeAuto": "自动",
		"dialog.themeAutoDesc": "跟随 OS / 浏览器",
		"dialog.themeLight": "浅色",
		"dialog.themeLightDesc": "始终浅色",
		"dialog.themeDark": "深色",
		"dialog.themeDarkDesc": "始终深色",
		"dialog.themeHighContrast": "高对比度",
		"dialog.themeHighContrastDesc": "无障碍",
		"dialog.ruler": "标尺",
		"dialog.rulerShow": "在幻灯片周围显示标尺",
		"dialog.rulerUnitLabel": "单位",
		"dialog.rulerUnitDesc": "PowerPoint 默认以 0 居中并使用厘米刻度。像素模式从幻灯片边缘开始显示屏幕坐标。",
		"dialog.rulerUnitCm": "厘米 (cm)",
		"dialog.rulerUnitCmDesc": "PowerPoint 默认",
		"dialog.rulerUnitPx": "像素 (px)",
		"dialog.rulerUnitPxDesc": "屏幕像素",
		"dialog.language": "语言",
		"dialog.languageDesc": "选择查看器界面语言。自动会跟随您的浏览器/系统设置。",
		"dialog.languageAuto": "自动 ({detected})",
		"dialog.about": "关于",
		"dialog.aboutAppName": "应用",
		"dialog.aboutEngine": "引擎",
		"dialog.aboutNpmPackage": "前端 (npm)",
		"dialog.aboutCopyright": "版权",
		"dialog.aboutDeveloper": "开发者",
		"dialog.aboutRepository": "代码仓库",
		"dialog.aboutPackage": "包",
		"dialog.aboutVersion": "版本",
		"dialog.aboutRendering": "环境",
		"dialog.aboutRenderingValue": "WebAssembly · 仅浏览器 · 支持离线",
		"dialog.aboutLicense": "许可",
		"dialog.viewerSettingsAriaLabel": "查看器设置",
		"phase.preparingSlide": "正在准备幻灯片 {current} / {total}…",
		"phase.renderingPdf": "正在渲染 PDF 页面 {current} / {total}…",
		"phase.encodingPdf": "正在编码 PDF…",
		"phase.preparingSlides": "正在准备幻灯片…",
		"status.loadedSlides": "已加载 {count} 张幻灯片",
		"status.nothingToPrint": "无可打印内容。",
		"status.nothingToExport": "无可导出内容。",
		"status.pdfFailed": "PDF 导出失败: {reason}",
		"status.exported": "已导出 {count} 张幻灯片为 PDF。",
		"status.errorPrefix": "[错误:{phase}] {message}",
		"viewer.ariaLabel": "PPTX 查看器",
		"viewer.noFile": "(无文件)",
		"viewer.slideTitle": "幻灯片 {number}",
		"viewer.empty": "请打开 .pptx 文件。",
		"viewer.openFile": "打开文件",
		"phase.preparingSlideOf": "正在准备幻灯片 {current} / {total}",
		"phase.preparingPdf": "正在准备 PDF…",
		"phase.preparingPrint": "正在准备打印…",
		"phase.layingOutPrintOf": "正在排版页面 {current} / {total}…",
		"phase.openingPrintDialog": "正在打开打印对话框…",
		"phase.savingPdf": "正在保存 PDF…",
		"progress.titlePrint": "准备打印",
		"progress.titlePdf": "导出 PDF",
		"viewer.loading": "加载中…",
		"viewer.error": "⚠ {message}",
		"playground.title": "slideglance 演练场",
		"playground.upload": "上传:",
		"playground.samples": "示例:",
		"playground.pickPrompt": "选择示例或上传 .pptx。",
		"playground.loadingFile": "正在加载 {name}…",
		"playground.failedHttp": "失败: HTTP {status}",
		"playground.fileInfo": "{name} · {bytes} 字节 · {ms} 毫秒",
		"playground.convertFailed": "转换失败: {reason}",
		"shortcuts.title": "键盘快捷键",
		"shortcuts.openTitle": "键盘快捷键",
		"shortcuts.groupNavigation": "导航",
		"shortcuts.groupView": "视图",
		"shortcuts.groupSelection": "选择",
		"shortcuts.groupOutput": "搜索·输出",
		"shortcuts.prevSlide": "上一张",
		"shortcuts.nextSlide": "下一张",
		"shortcuts.firstSlide": "第一张",
		"shortcuts.lastSlide": "最后一张",
		"shortcuts.zoomIn": "放大",
		"shortcuts.zoomOut": "缩小",
		"shortcuts.zoomReset": "重置到100%",
		"shortcuts.panSlide": "按住并拖动平移",
		"shortcuts.click": "点击",
		"shortcuts.drag": "拖动",
		"shortcuts.doubleClick": "双击",
		"shortcuts.selectShape": "选择形状",
		"shortcuts.toggleSelect": "切换选中",
		"shortcuts.rubberBand": "框选",
		"shortcuts.selectAll": "全选",
		"shortcuts.copyText": "复制选中文字",
		"shortcuts.editText": "进入文字编辑",
		"shortcuts.clearSelection": "清除选择 / 退出",
		"shortcuts.toggleSearch": "搜索幻灯片",
		"shortcuts.print": "打印"
	},
	"zh-TW": {
		_locale: "zh-TW",
		"common.close": "關閉",
		"common.cancel": "取消",
		"common.loading": "載入中…",
		"common.ready": "就緒。",
		"common.bytes": "{count} 位元組",
		"nav.firstSlide": "第一張投影片",
		"nav.previousSlide": "上一張 (←)",
		"nav.nextSlide": "下一張 (→)",
		"nav.lastSlide": "最後一張投影片",
		"nav.slideCounter": "{current} / {total}",
		"nav.slideCounterEmpty": "—",
		"search.button": "搜尋",
		"search.placeholder": "在投影片中尋找…",
		"search.title": "搜尋 (Cmd/Ctrl+F)",
		"search.empty": "搜尋",
		"search.noMatches": "無符合項目。",
		"search.typeToSearch": "輸入以搜尋。",
		"output.print": "列印",
		"output.printTitle": "列印 (Cmd/Ctrl+P)",
		"output.pdf": "PDF",
		"output.pdfTitle": "匯出為 PDF",
		"output.slideshow": "投影片放映",
		"output.slideshowTitle": "開始放映 (F5)",
		"output.gateLoadFirst": "請先載入檔案",
		"output.gatePreparing": "投影片準備中 — {current} / {total} 完成",
		"settings.title": "設定",
		"settings.openTitle": "設定",
		"file.open": "開啟",
		"render.label": "文字渲染:",
		"render.text": "向量文字",
		"render.path": "路徑外框",
		"render.auto": "自動",
		"status.toggleNotes": "切換備忘稿窗格",
		"status.resizeSidebar": "拖曳調整縮圖側欄寬度",
		"status.normalView": "標準檢視 (投影片 + 縮圖)",
		"status.gridView": "投影片瀏覽檢視",
		"status.zoomOut": "縮小",
		"status.zoomIn": "放大",
		"status.zoomReset": "重設為 100%",
		"status.fitWindow": "符合視窗",
		"status.zoom": "縮放",
		"status.slideOf": "投影片 {current} / {total}",
		"status.slideEmpty": "—",
		"status.selectionFontLabel": "字型:",
		"status.selectionFontMultiple": "{first} 等 {extra} 個",
		"status.selectionFontTitle": "所選項目使用的字型: {fonts}",
		"fontUsage.title": "字型對應",
		"fontUsage.close": "關閉",
		"fontUsage.headerRequested": "原始字型",
		"fontUsage.headerEffective": "實際渲染",
		"fontUsage.systemFallback": "系統預設字型",
		"fontUsage.allMatched": "所有原始字型皆可用",
		"fontUsage.substituteCount": "{count} 個字型已替換",
		"notes.heading": "備忘稿 — 投影片 {current}",
		"notes.headingWithSection": "備忘稿 — 投影片 {current} · {section}",
		"notes.empty": "此投影片無備忘稿。",
		"notes.standaloneHeading": "備忘稿 — 投影片 {current}",
		"notes.standaloneEmpty": "此投影片無演講者備忘稿。",
		"notes.layoutLabel": "版面配置: {value}",
		"notes.sectionLabel": "區段: {value}",
		"notes.noSlide": "未載入投影片。",
		"section.empty": "無區段",
		"dialog.title": "設定",
		"dialog.appearance": "外觀",
		"dialog.theme": "佈景主題",
		"dialog.themeDesc": "套用至整個檢視器,包含投影片、功能區、側邊欄與對話框。",
		"dialog.themeAuto": "自動",
		"dialog.themeAutoDesc": "依 OS / 瀏覽器",
		"dialog.themeLight": "淺色",
		"dialog.themeLightDesc": "永遠淺色",
		"dialog.themeDark": "深色",
		"dialog.themeDarkDesc": "永遠深色",
		"dialog.themeHighContrast": "高對比",
		"dialog.themeHighContrastDesc": "輔助使用",
		"dialog.ruler": "尺規",
		"dialog.rulerShow": "在投影片周圍顯示尺規",
		"dialog.rulerUnitLabel": "單位",
		"dialog.rulerUnitDesc": "PowerPoint 預設以 0 為中心並顯示公分刻度。像素模式從投影片邊緣開始顯示螢幕座標。",
		"dialog.rulerUnitCm": "公分 (cm)",
		"dialog.rulerUnitCmDesc": "PowerPoint 預設",
		"dialog.rulerUnitPx": "像素 (px)",
		"dialog.rulerUnitPxDesc": "螢幕像素",
		"dialog.language": "語言",
		"dialog.languageDesc": "選擇檢視器介面語言。自動會跟隨瀏覽器 / 作業系統設定。",
		"dialog.languageAuto": "自動 ({detected})",
		"dialog.about": "關於",
		"dialog.aboutAppName": "應用",
		"dialog.aboutEngine": "引擎",
		"dialog.aboutNpmPackage": "前端 (npm)",
		"dialog.aboutCopyright": "版權",
		"dialog.aboutDeveloper": "開發者",
		"dialog.aboutRepository": "程式庫",
		"dialog.aboutPackage": "套件",
		"dialog.aboutVersion": "版本",
		"dialog.aboutRendering": "環境",
		"dialog.aboutRenderingValue": "WebAssembly · 僅瀏覽器 · 支援離線",
		"dialog.aboutLicense": "授權",
		"dialog.viewerSettingsAriaLabel": "檢視器設定",
		"phase.preparingSlide": "投影片準備中 {current} / {total}…",
		"phase.renderingPdf": "PDF 頁面渲染中 {current} / {total}…",
		"phase.encodingPdf": "PDF 編碼中…",
		"phase.preparingSlides": "投影片準備中…",
		"status.loadedSlides": "已載入 {count} 張投影片",
		"status.nothingToPrint": "無可列印內容。",
		"status.nothingToExport": "無可匯出內容。",
		"status.pdfFailed": "PDF 匯出失敗: {reason}",
		"status.exported": "已將 {count} 張投影片匯出為 PDF。",
		"status.errorPrefix": "[錯誤:{phase}] {message}",
		"viewer.ariaLabel": "PPTX 檢視器",
		"viewer.noFile": "(無檔案)",
		"viewer.slideTitle": "投影片 {number}",
		"viewer.empty": "請開啟 .pptx 檔案。",
		"viewer.openFile": "開啟檔案",
		"phase.preparingSlideOf": "正在準備投影片 {current} / {total}",
		"phase.preparingPdf": "正在準備 PDF…",
		"phase.preparingPrint": "正在準備列印…",
		"phase.layingOutPrintOf": "正在排版頁面 {current} / {total}…",
		"phase.openingPrintDialog": "正在開啟列印對話框…",
		"phase.savingPdf": "正在儲存 PDF…",
		"progress.titlePrint": "準備列印",
		"progress.titlePdf": "匯出 PDF",
		"viewer.loading": "載入中…",
		"viewer.error": "⚠ {message}",
		"playground.title": "slideglance 試驗場",
		"playground.upload": "上傳:",
		"playground.samples": "範例:",
		"playground.pickPrompt": "選擇範例或上傳 .pptx。",
		"playground.loadingFile": "正在載入 {name}…",
		"playground.failedHttp": "失敗: HTTP {status}",
		"playground.fileInfo": "{name} · {bytes} 位元組 · {ms} 毫秒",
		"playground.convertFailed": "轉換失敗: {reason}",
		"shortcuts.title": "鍵盤捷徑",
		"shortcuts.openTitle": "鍵盤捷徑",
		"shortcuts.groupNavigation": "導覽",
		"shortcuts.groupView": "檢視",
		"shortcuts.groupSelection": "選取",
		"shortcuts.groupOutput": "搜尋·輸出",
		"shortcuts.prevSlide": "上一張",
		"shortcuts.nextSlide": "下一張",
		"shortcuts.firstSlide": "第一張",
		"shortcuts.lastSlide": "最後一張",
		"shortcuts.zoomIn": "放大",
		"shortcuts.zoomOut": "縮小",
		"shortcuts.zoomReset": "重設為100%",
		"shortcuts.panSlide": "按住並拖曳平移",
		"shortcuts.click": "按一下",
		"shortcuts.drag": "拖曳",
		"shortcuts.doubleClick": "按兩下",
		"shortcuts.selectShape": "選取圖形",
		"shortcuts.toggleSelect": "切換選取",
		"shortcuts.rubberBand": "框選",
		"shortcuts.selectAll": "全選",
		"shortcuts.copyText": "複製選取文字",
		"shortcuts.editText": "進入文字編輯",
		"shortcuts.clearSelection": "清除選取 / 結束",
		"shortcuts.toggleSearch": "搜尋投影片",
		"shortcuts.print": "列印"
	},
	es: {
		_locale: "es",
		"common.close": "Cerrar",
		"common.cancel": "Cancelar",
		"common.loading": "Cargando…",
		"common.ready": "Listo.",
		"common.bytes": "{count} bytes",
		"nav.firstSlide": "Primera diapositiva",
		"nav.previousSlide": "Anterior (←)",
		"nav.nextSlide": "Siguiente (→)",
		"nav.lastSlide": "Última diapositiva",
		"nav.slideCounter": "{current} / {total}",
		"nav.slideCounterEmpty": "—",
		"search.button": "Buscar",
		"search.placeholder": "Buscar en diapositivas…",
		"search.title": "Buscar (Cmd/Ctrl+F)",
		"search.empty": "Buscar",
		"search.noMatches": "Sin coincidencias.",
		"search.typeToSearch": "Escribe para buscar.",
		"output.print": "Imprimir",
		"output.printTitle": "Imprimir (Cmd/Ctrl+P)",
		"output.pdf": "PDF",
		"output.pdfTitle": "Exportar a PDF",
		"output.slideshow": "Presentación",
		"output.slideshowTitle": "Iniciar presentación (F5)",
		"output.gateLoadFirst": "Carga un archivo primero",
		"output.gatePreparing": "Preparando diapositivas — {current} / {total} listas",
		"settings.title": "Ajustes",
		"settings.openTitle": "Ajustes",
		"file.open": "Abrir",
		"render.label": "Renderizado de texto:",
		"render.text": "Texto vectorial",
		"render.path": "Contorno de ruta",
		"render.auto": "Automático",
		"status.toggleNotes": "Alternar panel de notas",
		"status.resizeSidebar": "Arrastrar para redimensionar el panel de miniaturas",
		"status.normalView": "Vista normal (diapositiva + miniaturas)",
		"status.gridView": "Clasificador de diapositivas",
		"status.zoomOut": "Alejar",
		"status.zoomIn": "Acercar",
		"status.zoomReset": "Restablecer a 100%",
		"status.fitWindow": "Ajustar a la ventana",
		"status.zoom": "Zoom",
		"status.slideOf": "diapositiva {current} / {total}",
		"status.slideEmpty": "—",
		"status.selectionFontLabel": "Fuente:",
		"status.selectionFontMultiple": "{first} y {extra} más",
		"status.selectionFontTitle": "Fuente(s) usada(s) por la selección: {fonts}",
		"fontUsage.title": "Asignación de fuentes",
		"fontUsage.close": "Cerrar",
		"fontUsage.headerRequested": "Fuente original",
		"fontUsage.headerEffective": "Renderizada como",
		"fontUsage.systemFallback": "fuente del sistema",
		"fontUsage.allMatched": "Todas las fuentes originales disponibles",
		"fontUsage.substituteCount": "{count} fuente(s) sustituida(s)",
		"notes.heading": "Notas — diapositiva {current}",
		"notes.headingWithSection": "Notas — diapositiva {current} · {section}",
		"notes.empty": "Sin notas para esta diapositiva.",
		"notes.standaloneHeading": "Notas — diapositiva {current}",
		"notes.standaloneEmpty": "Sin notas del orador para esta diapositiva.",
		"notes.layoutLabel": "diseño: {value}",
		"notes.sectionLabel": "sección: {value}",
		"notes.noSlide": "Ninguna diapositiva cargada.",
		"section.empty": "sin secciones",
		"dialog.title": "Ajustes",
		"dialog.appearance": "Apariencia",
		"dialog.theme": "Tema",
		"dialog.themeDesc": "Se aplica a todo el visor, incluyendo el escenario, la cinta, la barra lateral y los diálogos.",
		"dialog.themeAuto": "Automático",
		"dialog.themeAutoDesc": "Seguir el OS / navegador",
		"dialog.themeLight": "Claro",
		"dialog.themeLightDesc": "Siempre claro",
		"dialog.themeDark": "Oscuro",
		"dialog.themeDarkDesc": "Siempre oscuro",
		"dialog.themeHighContrast": "Alto contraste",
		"dialog.themeHighContrastDesc": "Accesibilidad",
		"dialog.ruler": "Regla",
		"dialog.rulerShow": "Mostrar regla alrededor de la diapositiva",
		"dialog.rulerUnitLabel": "Unidad",
		"dialog.rulerUnitDesc": "PowerPoint centra la diapositiva en 0 con marcas en cm. El modo píxel muestra coordenadas de pantalla desde el borde.",
		"dialog.rulerUnitCm": "Centímetros (cm)",
		"dialog.rulerUnitCmDesc": "Predeterminado de PowerPoint",
		"dialog.rulerUnitPx": "Píxeles (px)",
		"dialog.rulerUnitPxDesc": "Píxeles en pantalla",
		"dialog.language": "Idioma",
		"dialog.languageDesc": "Elija el idioma de la interfaz. Automático sigue su preferencia de navegador / OS.",
		"dialog.languageAuto": "Automático ({detected})",
		"dialog.about": "Acerca de",
		"dialog.aboutAppName": "Aplicación",
		"dialog.aboutEngine": "Motor",
		"dialog.aboutNpmPackage": "Frontend (npm)",
		"dialog.aboutCopyright": "Copyright",
		"dialog.aboutDeveloper": "Desarrollador",
		"dialog.aboutRepository": "Repositorio",
		"dialog.aboutPackage": "Paquete",
		"dialog.aboutVersion": "Versión",
		"dialog.aboutRendering": "Entorno",
		"dialog.aboutRenderingValue": "WebAssembly · solo navegador · sin conexión",
		"dialog.aboutLicense": "Licencia",
		"dialog.viewerSettingsAriaLabel": "Ajustes del visor",
		"phase.preparingSlide": "Preparando diapositiva {current} / {total}…",
		"phase.renderingPdf": "Renderizando página PDF {current} / {total}…",
		"phase.encodingPdf": "Codificando PDF…",
		"phase.preparingSlides": "Preparando diapositivas…",
		"status.loadedSlides": "{count} diapositivas cargadas",
		"status.nothingToPrint": "Nada que imprimir.",
		"status.nothingToExport": "Nada que exportar.",
		"status.pdfFailed": "Error al exportar PDF: {reason}",
		"status.exported": "Exportadas {count} diapositivas a PDF.",
		"status.errorPrefix": "[error:{phase}] {message}",
		"viewer.ariaLabel": "Visor PPTX",
		"viewer.noFile": "(sin archivo)",
		"viewer.slideTitle": "Diapositiva {number}",
		"viewer.empty": "Abre un archivo .pptx.",
		"viewer.openFile": "Abrir archivo",
		"phase.preparingSlideOf": "Preparando diapositiva {current} / {total}",
		"phase.preparingPdf": "Preparando PDF…",
		"phase.preparingPrint": "Preparando impresión…",
		"phase.layingOutPrintOf": "Maquetando página {current} / {total}…",
		"phase.openingPrintDialog": "Abriendo el cuadro de diálogo de impresión…",
		"phase.savingPdf": "Guardando PDF…",
		"progress.titlePrint": "Preparar impresión",
		"progress.titlePdf": "Exportar PDF",
		"viewer.loading": "Cargando…",
		"viewer.error": "⚠ {message}",
		"playground.title": "slideglance playground",
		"playground.upload": "subir:",
		"playground.samples": "muestras:",
		"playground.pickPrompt": "Elige una muestra o sube un .pptx.",
		"playground.loadingFile": "Cargando {name}…",
		"playground.failedHttp": "Error: HTTP {status}",
		"playground.fileInfo": "{name} · {bytes} bytes · {ms} ms",
		"playground.convertFailed": "Conversión fallida: {reason}",
		"shortcuts.title": "Atajos de teclado",
		"shortcuts.openTitle": "Atajos de teclado",
		"shortcuts.groupNavigation": "Navegación",
		"shortcuts.groupView": "Vista",
		"shortcuts.groupSelection": "Selección",
		"shortcuts.groupOutput": "Buscar y salida",
		"shortcuts.prevSlide": "Diapositiva anterior",
		"shortcuts.nextSlide": "Diapositiva siguiente",
		"shortcuts.firstSlide": "Primera diapositiva",
		"shortcuts.lastSlide": "Última diapositiva",
		"shortcuts.zoomIn": "Acercar",
		"shortcuts.zoomOut": "Alejar",
		"shortcuts.zoomReset": "Restablecer al 100%",
		"shortcuts.panSlide": "Mover la diapositiva mientras se mantiene",
		"shortcuts.click": "Clic",
		"shortcuts.drag": "Arrastrar",
		"shortcuts.doubleClick": "Doble clic",
		"shortcuts.selectShape": "Seleccionar forma",
		"shortcuts.toggleSelect": "Alternar selección",
		"shortcuts.rubberBand": "Selección por arrastre",
		"shortcuts.selectAll": "Seleccionar todo",
		"shortcuts.copyText": "Copiar texto seleccionado",
		"shortcuts.editText": "Modo de edición de texto",
		"shortcuts.clearSelection": "Borrar selección / salir",
		"shortcuts.toggleSearch": "Buscar en diapositivas",
		"shortcuts.print": "Imprimir"
	},
	fr: {
		_locale: "fr",
		"common.close": "Fermer",
		"common.cancel": "Annuler",
		"common.loading": "Chargement…",
		"common.ready": "Prêt.",
		"common.bytes": "{count} octets",
		"nav.firstSlide": "Première diapositive",
		"nav.previousSlide": "Précédente (←)",
		"nav.nextSlide": "Suivante (→)",
		"nav.lastSlide": "Dernière diapositive",
		"nav.slideCounter": "{current} / {total}",
		"nav.slideCounterEmpty": "—",
		"search.button": "Rechercher",
		"search.placeholder": "Rechercher dans les diapositives…",
		"search.title": "Rechercher (Cmd/Ctrl+F)",
		"search.empty": "Rechercher",
		"search.noMatches": "Aucun résultat.",
		"search.typeToSearch": "Tapez pour rechercher.",
		"output.print": "Imprimer",
		"output.printTitle": "Imprimer (Cmd/Ctrl+P)",
		"output.pdf": "PDF",
		"output.pdfTitle": "Exporter en PDF",
		"output.slideshow": "Diaporama",
		"output.slideshowTitle": "Démarrer le diaporama (F5)",
		"output.gateLoadFirst": "Chargez un fichier d'abord",
		"output.gatePreparing": "Préparation des diapositives — {current} / {total} prêtes",
		"settings.title": "Paramètres",
		"settings.openTitle": "Paramètres",
		"file.open": "Ouvrir",
		"render.label": "Rendu du texte :",
		"render.text": "Texte vectoriel",
		"render.path": "Contour de tracé",
		"render.auto": "Auto",
		"status.toggleNotes": "Basculer le panneau notes",
		"status.resizeSidebar": "Glisser pour redimensionner la barre des miniatures",
		"status.normalView": "Vue normale (diapositive + miniatures)",
		"status.gridView": "Trieuse de diapositives",
		"status.zoomOut": "Zoom arrière",
		"status.zoomIn": "Zoom avant",
		"status.zoomReset": "Réinitialiser à 100 %",
		"status.fitWindow": "Ajuster à la fenêtre",
		"status.zoom": "Zoom",
		"status.slideOf": "diapositive {current} / {total}",
		"status.slideEmpty": "—",
		"status.selectionFontLabel": "Police :",
		"status.selectionFontMultiple": "{first} + {extra} autres",
		"status.selectionFontTitle": "Police(s) utilisée(s) par la sélection : {fonts}",
		"fontUsage.title": "Correspondance des polices",
		"fontUsage.close": "Fermer",
		"fontUsage.headerRequested": "Police d'origine",
		"fontUsage.headerEffective": "Rendue comme",
		"fontUsage.systemFallback": "police système",
		"fontUsage.allMatched": "Toutes les polices d'origine sont disponibles",
		"fontUsage.substituteCount": "{count} police(s) substituée(s)",
		"notes.heading": "Notes — diapositive {current}",
		"notes.headingWithSection": "Notes — diapositive {current} · {section}",
		"notes.empty": "Aucune note pour cette diapositive.",
		"notes.standaloneHeading": "Notes — diapositive {current}",
		"notes.standaloneEmpty": "Aucune note de présentateur pour cette diapositive.",
		"notes.layoutLabel": "disposition : {value}",
		"notes.sectionLabel": "section : {value}",
		"notes.noSlide": "Aucune diapositive chargée.",
		"section.empty": "aucune section",
		"dialog.title": "Paramètres",
		"dialog.appearance": "Apparence",
		"dialog.theme": "Thème",
		"dialog.themeDesc": "Appliqué à l'ensemble du visualiseur, y compris la scène, le ruban, la barre latérale et les boîtes de dialogue.",
		"dialog.themeAuto": "Auto",
		"dialog.themeAutoDesc": "Suivre OS / navigateur",
		"dialog.themeLight": "Clair",
		"dialog.themeLightDesc": "Toujours clair",
		"dialog.themeDark": "Sombre",
		"dialog.themeDarkDesc": "Toujours sombre",
		"dialog.themeHighContrast": "Contraste élevé",
		"dialog.themeHighContrastDesc": "Accessibilité",
		"dialog.ruler": "Règle",
		"dialog.rulerShow": "Afficher la règle autour de la diapositive",
		"dialog.rulerUnitLabel": "Unité",
		"dialog.rulerUnitDesc": "Par défaut, PowerPoint centre la diapositive sur 0 avec une graduation en cm. Le mode pixel affiche les coordonnées écran depuis le bord.",
		"dialog.rulerUnitCm": "Centimètres (cm)",
		"dialog.rulerUnitCmDesc": "Par défaut PowerPoint",
		"dialog.rulerUnitPx": "Pixels (px)",
		"dialog.rulerUnitPxDesc": "Pixels à l'écran",
		"dialog.language": "Langue",
		"dialog.languageDesc": "Choisissez la langue de l'interface. Auto suit votre préférence navigateur / OS.",
		"dialog.languageAuto": "Auto ({detected})",
		"dialog.about": "À propos",
		"dialog.aboutAppName": "Application",
		"dialog.aboutEngine": "Moteur",
		"dialog.aboutNpmPackage": "Frontend (npm)",
		"dialog.aboutCopyright": "Copyright",
		"dialog.aboutDeveloper": "Développeur",
		"dialog.aboutRepository": "Dépôt",
		"dialog.aboutPackage": "Paquet",
		"dialog.aboutVersion": "Version",
		"dialog.aboutRendering": "Environnement",
		"dialog.aboutRenderingValue": "WebAssembly · navigateur uniquement · hors-ligne",
		"dialog.aboutLicense": "Licence",
		"dialog.viewerSettingsAriaLabel": "Paramètres du visualiseur",
		"phase.preparingSlide": "Préparation de la diapositive {current} / {total}…",
		"phase.renderingPdf": "Rendu de la page PDF {current} / {total}…",
		"phase.encodingPdf": "Encodage du PDF…",
		"phase.preparingSlides": "Préparation des diapositives…",
		"status.loadedSlides": "{count} diapositives chargées",
		"status.nothingToPrint": "Rien à imprimer.",
		"status.nothingToExport": "Rien à exporter.",
		"status.pdfFailed": "Échec de l'export PDF : {reason}",
		"status.exported": "{count} diapositives exportées en PDF.",
		"status.errorPrefix": "[erreur:{phase}] {message}",
		"viewer.ariaLabel": "Visualiseur PPTX",
		"viewer.noFile": "(aucun fichier)",
		"viewer.slideTitle": "Diapositive {number}",
		"viewer.empty": "Ouvrez un fichier .pptx.",
		"viewer.openFile": "Ouvrir un fichier",
		"phase.preparingSlideOf": "Préparation de la diapositive {current} / {total}",
		"phase.preparingPdf": "Préparation du PDF…",
		"phase.preparingPrint": "Préparation de l'impression…",
		"phase.layingOutPrintOf": "Mise en page {current} / {total}…",
		"phase.openingPrintDialog": "Ouverture de la boîte de dialogue d'impression…",
		"phase.savingPdf": "Enregistrement du PDF…",
		"progress.titlePrint": "Préparer l'impression",
		"progress.titlePdf": "Exporter le PDF",
		"viewer.loading": "Chargement…",
		"viewer.error": "⚠ {message}",
		"playground.title": "slideglance playground",
		"playground.upload": "envoyer :",
		"playground.samples": "exemples :",
		"playground.pickPrompt": "Choisissez un exemple ou envoyez un .pptx.",
		"playground.loadingFile": "Chargement de {name}…",
		"playground.failedHttp": "Échec : HTTP {status}",
		"playground.fileInfo": "{name} · {bytes} octets · {ms} ms",
		"playground.convertFailed": "Échec de la conversion : {reason}",
		"shortcuts.title": "Raccourcis clavier",
		"shortcuts.openTitle": "Raccourcis clavier",
		"shortcuts.groupNavigation": "Navigation",
		"shortcuts.groupView": "Affichage",
		"shortcuts.groupSelection": "Sélection",
		"shortcuts.groupOutput": "Recherche et sortie",
		"shortcuts.prevSlide": "Diapositive précédente",
		"shortcuts.nextSlide": "Diapositive suivante",
		"shortcuts.firstSlide": "Première diapositive",
		"shortcuts.lastSlide": "Dernière diapositive",
		"shortcuts.zoomIn": "Zoom avant",
		"shortcuts.zoomOut": "Zoom arrière",
		"shortcuts.zoomReset": "Réinitialiser à 100 %",
		"shortcuts.panSlide": "Déplacer la diapositive (maintenir)",
		"shortcuts.click": "Clic",
		"shortcuts.drag": "Glisser",
		"shortcuts.doubleClick": "Double-clic",
		"shortcuts.selectShape": "Sélectionner une forme",
		"shortcuts.toggleSelect": "Basculer la sélection",
		"shortcuts.rubberBand": "Sélection par cadre",
		"shortcuts.selectAll": "Tout sélectionner",
		"shortcuts.copyText": "Copier le texte sélectionné",
		"shortcuts.editText": "Mode édition de texte",
		"shortcuts.clearSelection": "Effacer la sélection / quitter",
		"shortcuts.toggleSearch": "Rechercher dans les diapositives",
		"shortcuts.print": "Imprimer"
	},
	de: {
		_locale: "de",
		"common.close": "Schließen",
		"common.cancel": "Abbrechen",
		"common.loading": "Lädt…",
		"common.ready": "Bereit.",
		"common.bytes": "{count} Bytes",
		"nav.firstSlide": "Erste Folie",
		"nav.previousSlide": "Zurück (←)",
		"nav.nextSlide": "Weiter (→)",
		"nav.lastSlide": "Letzte Folie",
		"nav.slideCounter": "{current} / {total}",
		"nav.slideCounterEmpty": "—",
		"search.button": "Suchen",
		"search.placeholder": "In Folien suchen…",
		"search.title": "Suchen (Cmd/Strg+F)",
		"search.empty": "Suchen",
		"search.noMatches": "Keine Treffer.",
		"search.typeToSearch": "Zum Suchen tippen.",
		"output.print": "Drucken",
		"output.printTitle": "Drucken (Cmd/Strg+P)",
		"output.pdf": "PDF",
		"output.pdfTitle": "Als PDF exportieren",
		"output.slideshow": "Bildschirmpräsentation",
		"output.slideshowTitle": "Präsentation starten (F5)",
		"output.gateLoadFirst": "Zuerst eine Datei laden",
		"output.gatePreparing": "Folien werden vorbereitet — {current} / {total} fertig",
		"settings.title": "Einstellungen",
		"settings.openTitle": "Einstellungen",
		"file.open": "Öffnen",
		"render.label": "Textdarstellung:",
		"render.text": "Vektortext",
		"render.path": "Pfadkontur",
		"render.auto": "Auto",
		"status.toggleNotes": "Notizenbereich umschalten",
		"status.resizeSidebar": "Miniaturleiste durch Ziehen anpassen",
		"status.normalView": "Normalansicht (Folie + Miniaturen)",
		"status.gridView": "Foliensortierung",
		"status.zoomOut": "Verkleinern",
		"status.zoomIn": "Vergrößern",
		"status.zoomReset": "Auf 100 % zurücksetzen",
		"status.fitWindow": "Folie an Fenster anpassen",
		"status.zoom": "Zoom",
		"status.slideOf": "Folie {current} / {total}",
		"status.slideEmpty": "—",
		"status.selectionFontLabel": "Schrift:",
		"status.selectionFontMultiple": "{first} +{extra} weitere",
		"status.selectionFontTitle": "Von Auswahl verwendete Schrift(en): {fonts}",
		"fontUsage.title": "Schriftartenzuordnung",
		"fontUsage.close": "Schließen",
		"fontUsage.headerRequested": "Originalschrift",
		"fontUsage.headerEffective": "Gerendert als",
		"fontUsage.systemFallback": "Systemschrift",
		"fontUsage.allMatched": "Alle Originalschriften verfügbar",
		"fontUsage.substituteCount": "{count} Schrift(en) ersetzt",
		"notes.heading": "Notizen — Folie {current}",
		"notes.headingWithSection": "Notizen — Folie {current} · {section}",
		"notes.empty": "Keine Notizen für diese Folie.",
		"notes.standaloneHeading": "Notizen — Folie {current}",
		"notes.standaloneEmpty": "Keine Sprechernotizen für diese Folie.",
		"notes.layoutLabel": "Layout: {value}",
		"notes.sectionLabel": "Abschnitt: {value}",
		"notes.noSlide": "Keine Folie geladen.",
		"section.empty": "Keine Abschnitte",
		"dialog.title": "Einstellungen",
		"dialog.appearance": "Darstellung",
		"dialog.theme": "Thema",
		"dialog.themeDesc": "Wird auf den gesamten Viewer angewendet — Folienbühne, Menüband, Seitenleiste und Dialoge.",
		"dialog.themeAuto": "Automatisch",
		"dialog.themeAutoDesc": "OS / Browser folgen",
		"dialog.themeLight": "Hell",
		"dialog.themeLightDesc": "Immer hell",
		"dialog.themeDark": "Dunkel",
		"dialog.themeDarkDesc": "Immer dunkel",
		"dialog.themeHighContrast": "Hoher Kontrast",
		"dialog.themeHighContrastDesc": "Barrierefreiheit",
		"dialog.ruler": "Lineal",
		"dialog.rulerShow": "Lineal um die Folie anzeigen",
		"dialog.rulerUnitLabel": "Einheit",
		"dialog.rulerUnitDesc": "PowerPoint zentriert die Folie standardmäßig auf 0 mit cm-Skala. Pixelmodus zeigt Bildschirmkoordinaten ab der Folienkante.",
		"dialog.rulerUnitCm": "Zentimeter (cm)",
		"dialog.rulerUnitCmDesc": "PowerPoint-Standard",
		"dialog.rulerUnitPx": "Pixel (px)",
		"dialog.rulerUnitPxDesc": "Bildschirm-Pixel",
		"dialog.language": "Sprache",
		"dialog.languageDesc": "Wählen Sie die Oberflächensprache. Automatisch folgt Ihrer Browser- / OS-Einstellung.",
		"dialog.languageAuto": "Automatisch ({detected})",
		"dialog.about": "Über",
		"dialog.aboutAppName": "Anwendung",
		"dialog.aboutEngine": "Engine",
		"dialog.aboutNpmPackage": "Frontend (npm)",
		"dialog.aboutCopyright": "Copyright",
		"dialog.aboutDeveloper": "Entwickler",
		"dialog.aboutRepository": "Repository",
		"dialog.aboutPackage": "Paket",
		"dialog.aboutVersion": "Version",
		"dialog.aboutRendering": "Umgebung",
		"dialog.aboutRenderingValue": "WebAssembly · nur Browser · offline-fähig",
		"dialog.aboutLicense": "Lizenz",
		"dialog.viewerSettingsAriaLabel": "Viewer-Einstellungen",
		"phase.preparingSlide": "Folie wird vorbereitet {current} / {total}…",
		"phase.renderingPdf": "PDF-Seite wird gerendert {current} / {total}…",
		"phase.encodingPdf": "PDF wird codiert…",
		"phase.preparingSlides": "Folien werden vorbereitet…",
		"status.loadedSlides": "{count} Folien geladen",
		"status.nothingToPrint": "Nichts zu drucken.",
		"status.nothingToExport": "Nichts zu exportieren.",
		"status.pdfFailed": "PDF-Export fehlgeschlagen: {reason}",
		"status.exported": "{count} Folien als PDF exportiert.",
		"status.errorPrefix": "[Fehler:{phase}] {message}",
		"viewer.ariaLabel": "PPTX-Viewer",
		"viewer.noFile": "(keine Datei)",
		"viewer.slideTitle": "Folie {number}",
		"viewer.empty": "Eine .pptx-Datei öffnen.",
		"viewer.openFile": "Datei öffnen",
		"phase.preparingSlideOf": "Folie {current} / {total} wird vorbereitet",
		"phase.preparingPdf": "PDF wird vorbereitet…",
		"phase.preparingPrint": "Druck wird vorbereitet…",
		"phase.layingOutPrintOf": "Seite {current} / {total} wird gesetzt…",
		"phase.openingPrintDialog": "Druckdialog wird geöffnet…",
		"phase.savingPdf": "PDF wird gespeichert…",
		"progress.titlePrint": "Druck vorbereiten",
		"progress.titlePdf": "PDF exportieren",
		"viewer.loading": "Lädt…",
		"viewer.error": "⚠ {message}",
		"playground.title": "slideglance Playground",
		"playground.upload": "Hochladen:",
		"playground.samples": "Beispiele:",
		"playground.pickPrompt": "Beispiel wählen oder .pptx hochladen.",
		"playground.loadingFile": "{name} wird geladen…",
		"playground.failedHttp": "Fehler: HTTP {status}",
		"playground.fileInfo": "{name} · {bytes} Bytes · {ms} ms",
		"playground.convertFailed": "Konvertierung fehlgeschlagen: {reason}",
		"shortcuts.title": "Tastenkürzel",
		"shortcuts.openTitle": "Tastenkürzel",
		"shortcuts.groupNavigation": "Navigation",
		"shortcuts.groupView": "Ansicht",
		"shortcuts.groupSelection": "Auswahl",
		"shortcuts.groupOutput": "Suche & Ausgabe",
		"shortcuts.prevSlide": "Vorherige Folie",
		"shortcuts.nextSlide": "Nächste Folie",
		"shortcuts.firstSlide": "Erste Folie",
		"shortcuts.lastSlide": "Letzte Folie",
		"shortcuts.zoomIn": "Vergrößern",
		"shortcuts.zoomOut": "Verkleinern",
		"shortcuts.zoomReset": "Auf 100 % zurücksetzen",
		"shortcuts.panSlide": "Folie verschieben (halten)",
		"shortcuts.click": "Klick",
		"shortcuts.drag": "Ziehen",
		"shortcuts.doubleClick": "Doppelklick",
		"shortcuts.selectShape": "Form auswählen",
		"shortcuts.toggleSelect": "Auswahl umschalten",
		"shortcuts.rubberBand": "Lasso-Auswahl",
		"shortcuts.selectAll": "Alles auswählen",
		"shortcuts.copyText": "Ausgewählten Text kopieren",
		"shortcuts.editText": "Textbearbeitungsmodus",
		"shortcuts.clearSelection": "Auswahl aufheben / beenden",
		"shortcuts.toggleSearch": "In Folien suchen",
		"shortcuts.print": "Drucken"
	}
};
/**
* Map a raw `navigator.language(s)` or POSIX locale tag to a
* supported locale. Region/script subtags are honoured for Chinese
* (`zh-CN` vs `zh-TW`) and stripped for everything else.
*/
function normalizeTag(raw) {
	if (!raw) return null;
	const lower = raw.replace(/[._].*$/, "").replace(/_/g, "-").toLowerCase();
	if (lower.startsWith("zh")) {
		if (lower.includes("tw") || lower.includes("hk") || lower.includes("mo") || lower.includes("hant")) return "zh-TW";
		return "zh-CN";
	}
	const primary = lower.split("-")[0];
	if (SUPPORTED_LOCALES.includes(primary)) return primary;
	return null;
}
/**
* Read the host's preferred locale list. In the browser this is
* `navigator.languages`; in Node we walk the standard POSIX
* environment variables. Returns the first entry we recognise, or
* `"en"` as the universal fallback.
*/
function detectLocale() {
	const candidates = [];
	if (typeof navigator !== "undefined") {
		const langs = navigator.languages;
		if (Array.isArray(langs)) candidates.push(...langs);
		if (typeof navigator.language === "string") candidates.push(navigator.language);
	}
	const env = globalThis.process?.env;
	if (env) for (const key of [
		"LC_ALL",
		"LC_MESSAGES",
		"LANG",
		"LANGUAGE"
	]) {
		const v = env[key];
		if (typeof v === "string" && v.length > 0) candidates.push(v);
	}
	for (const tag of candidates) {
		const m = normalizeTag(tag);
		if (m) return m;
	}
	return "en";
}
var listeners$1 = /* @__PURE__ */ new Set();
var forced = null;
var detectedCache = null;
function detected() {
	if (detectedCache) return detectedCache;
	detectedCache = detectLocale();
	return detectedCache;
}
/** Reset the detection cache — primarily for tests that mutate
*  `navigator.language` between cases. */
function resetLocaleCache() {
	detectedCache = null;
}
/** Currently effective locale (auto-detected unless forced). */
function getActiveLocale() {
	return forced ?? detected();
}
/** Auto-detected locale, regardless of the active override. */
function getDetectedLocale() {
	return detected();
}
/**
* Apply a forced locale, or pass `"auto"` / `null` to clear the
* override and revert to auto-detection. Subscribers fire whenever
* the resolved locale actually changes.
*/
function setLocale(locale) {
	const previous = getActiveLocale();
	if (locale === null || locale === "auto") forced = null;
	else forced = locale;
	const next = getActiveLocale();
	if (next !== previous) for (const listener of listeners$1) try {
		listener(next);
	} catch {}
}
/** Subscribe to active-locale changes. Returns a teardown. */
function subscribeLocale(cb) {
	listeners$1.add(cb);
	return () => listeners$1.delete(cb);
}
/**
* Look up a translated message and substitute `{token}` placeholders.
* Falls back to the English catalog when the active locale is missing
* the key, and finally to the key itself when even English doesn't
* have it (which only happens for keys added without a catalog
* update — surface them visibly so they get noticed in review).
*/
function t(key, params) {
	const active = getActiveLocale();
	let template = CATALOGS[active][key];
	if (template === void 0 && active !== "en") template = EN[key];
	if (template === void 0) return key;
	if (!params) return template;
	return template.replace(/\{(\w+)\}/g, (_match, name) => {
		const v = params[name];
		return v === void 0 ? `{${name}}` : String(v);
	});
}
/**
* One-shot global stylesheet mounted via `<style>{SHELL_GLOBAL_CSS}</style>`
* at the top of the shell tree. Covers things inline `style=` cannot:
*
* - scrollbar theming for the deck container
* - hover-fade behaviour for the slideshow corner-nav buttons
* - the keyframes the loading-overlay spinner consumes
* - reset of native focus / touch chrome on shell buttons
* - sidebar splitter affordance highlighting
*/
var SHELL_GLOBAL_CSS = `
[data-pptx-shell] {
  color-scheme: var(--slideglance-color-scheme, dark);
  scrollbar-color: var(--pptx-shell-scrollbar-thumb, #3a3a44) var(--pptx-shell-scrollbar-track, #1a1a1f);
  scrollbar-width: thin;
}
[data-pptx-shell] *::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
[data-pptx-shell] *::-webkit-scrollbar-track {
  background: var(--pptx-shell-scrollbar-track, #1a1a1f);
}
[data-pptx-shell] *::-webkit-scrollbar-thumb {
  background: var(--pptx-shell-scrollbar-thumb, #3a3a44);
  border-radius: 5px;
  border: 2px solid var(--pptx-shell-scrollbar-track, #1a1a1f);
}
[data-pptx-shell] *::-webkit-scrollbar-thumb:hover {
  background: var(--pptx-shell-scrollbar-thumb-hover, #4d4d58);
}
[data-pptx-shell] *::-webkit-scrollbar-corner {
  background: var(--pptx-shell-scrollbar-track, #1a1a1f);
}
/* Slideshow corner-nav reveal: hovering the bottom-right zone or
   focusing one of its buttons fades the button group in. Keyboard
   users get the same affordance via the focus-within branch. */
[data-pptx-shell] [data-pptx-slideshow-nav]:hover > div,
[data-pptx-shell] [data-pptx-slideshow-nav]:focus-within > div {
  opacity: 1 !important;
}
[data-pptx-shell] [data-pptx-slideshow-nav] button:hover {
  background: rgba(255, 255, 255, 0.12) !important;
}
/* Loading-overlay spinner — used by the centred parse / slide-prepare
   panel rendered when there's no slide SVG to show yet. Keyframes
   live here because inline styles cannot carry @keyframes. */
@keyframes pptx-loading-spin {
  to { transform: rotate(360deg); }
}
[data-pptx-shell] [data-pptx-slideshow-nav] button:disabled {
  opacity: 0.4;
  cursor: default;
}
/* Suppress every form of native focus / touch chrome on shell
   buttons so a click never leaves a persistent ring behind. Keyboard
   users still get a focus indicator because the affected styles
   (icon-button / status-icon / radio cell) flip their background or
   border-color when 'aria-pressed' / 'aria-checked' is true; that
   semantic-state highlight is what marks the active control, not the
   browser's default focus ring. '-webkit-tap-highlight-color:
   transparent' removes the iOS / Android touch flash so the same
   suppression works on touch devices. */
[data-pptx-shell] button,
[data-pptx-shell] [role="radio"] {
  outline: 0 !important;
  -webkit-tap-highlight-color: transparent;
}
/* Some Chromium embeddings (notably the VS Code webview iframe at
   the time of writing) keep painting the user-agent focus ring even
   after \`outline: 0 !important\` because the chrome stems from a
   private \`-internal-focus-ring\` style attached to \`:focus-visible\`,
   not the regular \`outline\` cascade. Belt-and-braces: explicitly
   suppress every commonly-emitted focus channel — outline, outline-
   offset, the legacy \`-webkit-focus-ring-color\`, and any inset
   box-shadow a downstream theme might add for accessibility. */
[data-pptx-shell] button:focus,
[data-pptx-shell] button:focus-visible,
[data-pptx-shell] [role="radio"]:focus,
[data-pptx-shell] [role="radio"]:focus-visible {
  outline: 0 !important;
  outline-offset: 0 !important;
  box-shadow: none !important;
  -webkit-focus-ring-color: transparent;
}
[data-pptx-shell] button::-moz-focus-inner,
[data-pptx-shell] [role="radio"]::-moz-focus-inner {
  border: 0;
}
/* Sidebar splitter — subtle highlight on hover/active so the
   drag affordance is discoverable without visually competing with
   the sidebar's own border at rest. */
[data-pptx-shell] [role="separator"][aria-orientation="vertical"]:hover {
  background: var(--pptx-shell-accent-soft, rgba(106, 163, 255, 0.18));
}
[data-pptx-shell] [role="separator"][aria-orientation="vertical"]:focus-visible {
  outline: 2px solid var(--pptx-shell-accent, #6aa3ff);
  outline-offset: -2px;
}
`;
var rootStyle = {
	display: "grid",
	gridTemplateRows: "auto minmax(0, 1fr) auto",
	width: "100%",
	height: "100%",
	background: "var(--pptx-shell-bg, #2b2b2f)",
	color: "var(--pptx-shell-fg, #ececec)",
	font: "13px system-ui, -apple-system, sans-serif",
	overflow: "hidden",
	position: "relative"
};
var ribbonStyle = {
	display: "flex",
	alignItems: "center",
	gap: 6,
	padding: "8px 12px",
	background: "var(--pptx-shell-ribbon-bg, #1f1f23)",
	borderBottom: "1px solid var(--pptx-shell-border, #2a2a30)",
	flexWrap: "wrap"
};
var filenameStyle = {
	fontWeight: 600,
	maxWidth: 240,
	overflow: "hidden",
	textOverflow: "ellipsis",
	whiteSpace: "nowrap",
	marginLeft: 8
};
var spacerStyle = { flex: "1 1 auto" };
var dividerStyle = {
	width: 1,
	alignSelf: "stretch",
	background: "var(--pptx-shell-border, #2a2a30)",
	margin: "0 2px"
};
var counterStyle = {
	minWidth: 70,
	textAlign: "center",
	fontVariantNumeric: "tabular-nums"
};
var bodyStyle$2 = {
	display: "grid",
	gridTemplateRows: "minmax(0, 1fr)",
	minHeight: 0,
	minWidth: 0,
	overflow: "hidden",
	position: "relative"
};
var sidebarStyle = {
	display: "grid",
	borderRight: "1px solid var(--pptx-shell-border, #2a2a30)",
	background: "var(--pptx-shell-sidebar-bg, #15151a)",
	overflow: "hidden",
	minHeight: 0
};
var sidebarResizerStyle = {
	cursor: "col-resize",
	background: "transparent",
	touchAction: "none",
	userSelect: "none"
};
var stageAreaStyle = {
	display: "grid",
	gridTemplateRows: "minmax(0, 1fr)",
	minHeight: 0,
	minWidth: 0,
	overflow: "hidden"
};
var stageWrapStyle = {
	position: "relative",
	minHeight: 0,
	minWidth: 0,
	overflow: "hidden",
	boxSizing: "border-box"
};
var stageStyle = {
	position: "relative",
	width: "100%",
	height: "100%",
	overflow: "auto",
	background: "var(--pptx-shell-bg, #2b2b2f)",
	display: "block"
};
var baseButtonStyle = {
	background: "transparent",
	color: "inherit",
	border: "1px solid var(--pptx-shell-border, #2a2a30)",
	borderRadius: 4,
	padding: "4px 10px",
	font: "inherit",
	cursor: "pointer",
	minHeight: 28
};
var iconButtonStyle = {
	...baseButtonStyle,
	padding: "4px 8px",
	minWidth: 28,
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	gap: 4
};
var activeIconStyle = {
	...iconButtonStyle,
	background: "var(--pptx-shell-active, #3a3a44)"
};
var textButtonStyle = {
	...baseButtonStyle,
	display: "inline-flex",
	alignItems: "center",
	gap: 6
};
var disabledTextButtonStyle = {
	...textButtonStyle,
	opacity: .45,
	cursor: "not-allowed"
};
var thumbStripStyle = {
	display: "flex",
	flexDirection: "column",
	gap: 8,
	padding: 10,
	overflowY: "auto"
};
var sidebarEmptyStyle = {
	textAlign: "center",
	color: "var(--pptx-shell-status, #666)",
	fontSize: 12,
	padding: "24px 8px",
	fontStyle: "italic"
};
var thumbnailButtonStyle = {
	display: "flex",
	alignItems: "center",
	gap: 8,
	padding: 4,
	background: "transparent",
	borderWidth: 2,
	borderStyle: "solid",
	borderColor: "transparent",
	borderRadius: 4,
	cursor: "pointer",
	color: "inherit",
	font: "inherit",
	textAlign: "left"
};
var thumbnailButtonActiveStyle = {
	...thumbnailButtonStyle,
	borderColor: "var(--pptx-shell-accent, #6aa3ff)",
	background: "var(--pptx-shell-accent-soft, rgba(106, 163, 255, 0.12))"
};
var thumbnailIndexStyle = {
	width: 24,
	textAlign: "center",
	fontVariantNumeric: "tabular-nums",
	fontSize: 12,
	color: "var(--pptx-shell-status, #888)"
};
var thumbnailFrameStyle = {
	flex: "1 1 auto",
	background: "white",
	borderRadius: 3,
	overflow: "hidden",
	boxShadow: "0 1px 3px var(--pptx-shell-shadow, rgba(0, 0, 0, 0.4))"
};
var thumbnailInnerStyle = {
	width: "100%",
	height: "100%"
};
var thumbnailPlaceholderStyle = {
	width: "100%",
	height: "100%",
	display: "grid",
	placeItems: "center",
	color: "var(--pptx-shell-status, #aaa)",
	fontSize: 14,
	background: "var(--pptx-thumb-tile, #1a1a1f)"
};
var thumbnailTileStyle = {
	display: "flex",
	flexDirection: "column",
	alignItems: "stretch",
	gap: 8,
	padding: 8,
	width: "100%",
	background: "transparent",
	borderWidth: 2,
	borderStyle: "solid",
	borderColor: "transparent",
	borderRadius: 6,
	cursor: "pointer",
	color: "inherit",
	font: "inherit",
	textAlign: "center",
	boxSizing: "border-box"
};
var thumbnailTileActiveStyle = {
	...thumbnailTileStyle,
	borderColor: "var(--pptx-shell-accent, #6aa3ff)",
	background: "var(--pptx-shell-accent-soft, rgba(106, 163, 255, 0.12))"
};
var thumbnailTileFrameStyle = {
	width: "100%",
	background: "white",
	borderRadius: 4,
	overflow: "hidden",
	boxShadow: "0 2px 6px var(--pptx-shell-shadow, rgba(0, 0, 0, 0.45))",
	alignSelf: "stretch"
};
var thumbnailCaptionStyle = {
	fontSize: 12,
	fontVariantNumeric: "tabular-nums",
	color: "var(--pptx-shell-status, #aaa)",
	lineHeight: 1.2
};
var gridViewStyle = {
	display: "grid",
	gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
	gridAutoRows: "min-content",
	alignContent: "start",
	alignItems: "start",
	justifyItems: "stretch",
	gap: 20,
	padding: 24,
	overflow: "auto",
	width: "100%",
	height: "100%",
	boxSizing: "border-box"
};
var overlayStyle = {
	position: "absolute",
	inset: 0,
	display: "grid",
	placeItems: "center",
	color: "var(--pptx-shell-status, #888)",
	fontSize: 14
};
var loadingOverlayStyle = {
	position: "absolute",
	inset: 0,
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	gap: 16,
	color: "var(--pptx-shell-fg, #ececec)",
	fontSize: 15,
	pointerEvents: "none"
};
var loadingSpinnerStyle = {
	width: 36,
	height: 36,
	borderRadius: "50%",
	border: "3px solid var(--pptx-shell-border, rgba(255, 255, 255, 0.18))",
	borderTopColor: "var(--pptx-shell-accent, #6aa3ff)",
	animation: "pptx-loading-spin 0.9s linear infinite"
};
var loadingTextStyle = {
	color: "var(--pptx-shell-fg, #ececec)",
	fontWeight: 500,
	letterSpacing: "0.01em"
};
var progressHostStyle = {
	position: "fixed",
	inset: 0,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	zIndex: 1100,
	font: "13px system-ui, -apple-system, sans-serif",
	pointerEvents: "auto"
};
var progressBackdropStyle = {
	position: "absolute",
	inset: 0,
	background: "var(--pptx-shell-dialog-overlay, rgba(0, 0, 0, 0.45))"
};
var progressPanelStyle = {
	position: "relative",
	width: "min(420px, 86vw)",
	display: "flex",
	flexDirection: "column",
	gap: 10,
	padding: "20px 24px",
	background: "var(--pptx-shell-dialog-bg, #1f1f23)",
	color: "var(--pptx-shell-dialog-fg, #ececec)",
	border: "1px solid var(--pptx-shell-border, #2a2a30)",
	borderRadius: 10,
	boxShadow: "0 16px 48px var(--pptx-shell-shadow, rgba(0, 0, 0, 0.5))"
};
var progressTitleStyle = {
	fontSize: 15,
	fontWeight: 600,
	letterSpacing: .1
};
var progressStepStyle = {
	fontSize: 13,
	color: "var(--pptx-shell-status, #b8b8c0)",
	minHeight: 18,
	fontVariantNumeric: "tabular-nums"
};
var progressBarTrackStyle = {
	position: "relative",
	width: "100%",
	height: 6,
	borderRadius: 3,
	background: "var(--pptx-shell-track, rgba(255, 255, 255, 0.08))",
	overflow: "hidden"
};
var progressBarFillStyle = {
	position: "absolute",
	top: 0,
	bottom: 0,
	left: 0,
	background: "var(--pptx-shell-accent, #6aa3ff)",
	borderRadius: 3,
	transition: "width 120ms ease-out"
};
var progressBarIndeterminateStyle = {
	width: "30%",
	opacity: .65
};
var progressCounterStyle = {
	fontSize: 12,
	color: "var(--pptx-shell-status, #888)",
	fontVariantNumeric: "tabular-nums",
	textAlign: "right"
};
var rulerCornerStyle = {
	position: "absolute",
	top: 0,
	left: 0,
	width: 24,
	height: 24,
	background: "var(--pptx-shell-status-bg, #1f1f23)",
	borderRight: "1px solid var(--pptx-shell-border, #2a2a30)",
	borderBottom: "1px solid var(--pptx-shell-border, #2a2a30)",
	zIndex: 6,
	pointerEvents: "none"
};
var rulerHStyle = {
	position: "absolute",
	top: 0,
	right: 0,
	left: 24,
	height: 24,
	zIndex: 5,
	borderBottom: "1px solid var(--pptx-shell-border, #2a2a30)"
};
var rulerVStyle = {
	position: "absolute",
	top: 24,
	left: 0,
	bottom: 0,
	width: 24,
	zIndex: 5,
	borderRight: "1px solid var(--pptx-shell-border, #2a2a30)"
};
var notesPanelStyle = {
	padding: "10px 16px",
	background: "var(--pptx-shell-notes-bg, #1a1a1f)",
	borderTop: "1px solid var(--pptx-shell-border, #2a2a30)",
	overflow: "auto",
	maxHeight: 200,
	whiteSpace: "pre-wrap"
};
var notesHeadingStyle = {
	margin: "0 0 6px",
	fontSize: 11,
	letterSpacing: "0.05em",
	textTransform: "uppercase",
	color: "var(--pptx-shell-notes-heading, #888)"
};
var notesBodyStyle = {
	fontSize: 12,
	color: "var(--pptx-shell-notes-fg, #ddd)"
};
var notesEmptyStyle = {
	color: "var(--pptx-shell-status, #666)",
	fontSize: 12
};
var notesMetaStyle = {
	fontSize: 11,
	color: "var(--pptx-shell-accent, #6aa3ff)",
	marginBottom: 4
};
var searchDrawerStyle = {
	position: "absolute",
	top: 12,
	right: 12,
	width: 280,
	maxHeight: "calc(100% - 24px)",
	background: "var(--pptx-shell-drawer-bg, #1f1f23)",
	border: "1px solid var(--pptx-shell-border, #2a2a30)",
	borderRadius: 6,
	boxShadow: "0 6px 24px var(--pptx-shell-shadow, rgba(0, 0, 0, 0.4))",
	overflow: "hidden",
	display: "flex",
	flexDirection: "column",
	zIndex: 10
};
var searchHeaderStyle = {
	padding: "8px 10px",
	borderBottom: "1px solid var(--pptx-shell-border, #2a2a30)",
	fontSize: 11,
	letterSpacing: "0.05em",
	textTransform: "uppercase",
	color: "var(--pptx-shell-status, #aaa)",
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center"
};
var searchInputStyle = {
	margin: 8,
	padding: "4px 8px",
	background: "transparent",
	color: "inherit",
	border: "1px solid var(--pptx-shell-border, #2a2a30)",
	borderRadius: 4,
	font: "inherit"
};
var searchEmptyStyle = {
	padding: 12,
	color: "var(--pptx-shell-status, #666)",
	fontStyle: "italic"
};
var searchListStyle = {
	listStyle: "none",
	margin: 0,
	padding: 0,
	overflowY: "auto"
};
var searchItemStyle = {
	padding: "8px 10px",
	cursor: "pointer",
	borderBottom: "1px solid var(--pptx-shell-border, rgba(255, 255, 255, 0.05))",
	fontSize: 12
};
var searchHitNumStyle = {
	fontVariantNumeric: "tabular-nums",
	color: "var(--pptx-shell-accent, #6aa3ff)",
	marginRight: 6
};
var slideshowStyle = {
	position: "fixed",
	inset: 0,
	background: "#000",
	zIndex: 100
};
var slideshowNavZoneStyle = {
	position: "absolute",
	right: 0,
	bottom: 0,
	width: 220,
	height: 100,
	zIndex: 110,
	pointerEvents: "auto"
};
var slideshowNavGroupStyle = {
	position: "absolute",
	right: 16,
	bottom: 16,
	display: "flex",
	gap: 6,
	padding: 6,
	borderRadius: 8,
	background: "rgba(20, 20, 24, 0.7)",
	backdropFilter: "blur(8px)",
	opacity: 0,
	transition: "opacity 120ms ease-out"
};
var slideshowNavButtonStyle = {
	width: 36,
	height: 36,
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	background: "transparent",
	color: "#ececec",
	border: "1px solid rgba(255, 255, 255, 0.18)",
	borderRadius: 6,
	cursor: "pointer",
	padding: 0
};
var statusBarStyle = {
	display: "flex",
	alignItems: "center",
	gap: 8,
	padding: "4px 12px",
	fontSize: 11,
	color: "var(--pptx-shell-status, #888)",
	background: "var(--pptx-shell-status-bg, #1f1f23)",
	borderTop: "1px solid var(--pptx-shell-border, #2a2a30)",
	minHeight: 28
};
var phaseStyle = { fontVariantNumeric: "tabular-nums" };
var metaStyle = { fontSize: 11 };
var statusSepStyle = {
	width: 1,
	height: 16,
	background: "var(--pptx-shell-border, #2a2a30)",
	margin: "0 4px"
};
var selectionFontsContainerStyle = {
	position: "relative",
	display: "inline-flex",
	alignItems: "center"
};
var selectionFontsButtonStyle = {
	background: "transparent",
	color: "inherit",
	border: "1px solid transparent",
	borderRadius: 3,
	padding: "2px 6px",
	cursor: "pointer",
	font: "inherit",
	fontSize: 11,
	minHeight: 22,
	display: "inline-flex",
	alignItems: "center"
};
var selectionFontsButtonActiveStyle = {
	...selectionFontsButtonStyle,
	background: "var(--pptx-shell-active, #3a3a44)"
};
var selectionFontsPopoverStyle = {
	position: "absolute",
	bottom: "calc(100% + 4px)",
	left: 0,
	minWidth: 220,
	maxWidth: 360,
	maxHeight: 280,
	overflow: "auto",
	background: "var(--pptx-shell-bg, #1f1f24)",
	color: "var(--pptx-shell-fg, #e6e6ea)",
	border: "1px solid var(--pptx-shell-border, #2c2c34)",
	borderRadius: 6,
	boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)",
	zIndex: 1e3,
	fontSize: 12,
	padding: "4px 0"
};
var selectionFontsListStyle = {
	listStyle: "none",
	margin: 0,
	padding: 0
};
var selectionFontsListItemStyle = {
	padding: "5px 12px",
	whiteSpace: "nowrap",
	overflow: "hidden",
	textOverflow: "ellipsis"
};
var statusIconStyle = {
	background: "transparent",
	color: "inherit",
	border: "1px solid transparent",
	borderRadius: 3,
	padding: "2px 6px",
	cursor: "pointer",
	font: "inherit",
	minHeight: 22,
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center"
};
var activeIconSmStyle = {
	...statusIconStyle,
	background: "var(--pptx-shell-active, #3a3a44)"
};
var zoomSliderStyle = {
	width: 120,
	margin: "0 6px"
};
var zoomPctStyle = {
	minWidth: 40,
	textAlign: "right",
	fontVariantNumeric: "tabular-nums",
	cursor: "pointer",
	userSelect: "none"
};
//#endregion
//#region src/presentation/Thumbnail.tsx
/**
* Slide thumbnail tile — used both by the sidebar (vertical strip,
* `layout="row"`) and the grid view (slide-sorter, `layout="tile"`).
*
* Rendering strategy:
* 1. The button mounts in a "placeholder" state with no SVG.
* 2. An `IntersectionObserver` watches the button; when it enters the
*    viewport (or sidebar scroll container), the slide is fetched
*    from the host's `getThumbnail` callback. This keeps a 132-slide
*    deck from fanning out to 132 IPC calls on first paint.
* 3. The fetched SVG is id-namespaced (so multiple thumbnails on the
*    same page don't collide on `clipPath` / gradient ids) and
*    inserted via DOMParser → `importNode` so the SVG namespace is
*    handled correctly by the browser's foreign-element machinery.
*
* Once visible, the flag stays sticky: there's no benefit to
* unloading a slide we already paid to render, and re-fetching on
* scroll-out / scroll-in produces a perceptible flash.
*/
function Thumbnail(props) {
	const { slide, active, onClick, getThumbnail, aspectFallback, layout = "row" } = props;
	const [svg, setSvg] = useState(null);
	const [aspect, setAspect] = useState(aspectFallback);
	const hostRef = useRef(null);
	const buttonRef = useRef(null);
	const [visible, setVisible] = useState(active);
	useEffect(() => {
		if (active) setVisible(true);
	}, [active]);
	useEffect(() => {
		if (visible) return;
		const el = buttonRef.current;
		if (!el || typeof IntersectionObserver === "undefined") {
			setVisible(true);
			return;
		}
		const obs = new IntersectionObserver((entries) => {
			for (const entry of entries) if (entry.isIntersecting) {
				setVisible(true);
				obs.disconnect();
				return;
			}
		}, { rootMargin: "200px" });
		obs.observe(el);
		return () => obs.disconnect();
	}, [visible]);
	useEffect(() => {
		if (!visible) return;
		let cancelled = false;
		(async () => {
			const cached = await getThumbnail(slide);
			if (cancelled || !cached) return;
			setAspect(parseAspect(cached.svg) ?? aspectFallback);
			setSvg(cached.preparedSvg);
		})();
		return () => {
			cancelled = true;
		};
	}, [
		visible,
		slide,
		getThumbnail,
		aspectFallback
	]);
	useEffect(() => {
		const host = hostRef.current;
		if (!host) return;
		while (host.firstChild) host.removeChild(host.firstChild);
		if (!svg) return;
		try {
			const namespaced = uniquifyIds(svg, `${layout}-s${slide}`);
			const root = new DOMParser().parseFromString(namespaced, "image/svg+xml").documentElement;
			if (!root) return;
			host.appendChild(document.importNode(root, true));
		} catch {}
	}, [
		svg,
		slide,
		layout
	]);
	const isTile = layout === "tile";
	const frameAspect = isTile ? aspectFallback : aspect;
	const buttonStyle = isTile ? active ? thumbnailTileActiveStyle : thumbnailTileStyle : active ? thumbnailButtonActiveStyle : thumbnailButtonStyle;
	const frameStyle = isTile ? thumbnailTileFrameStyle : thumbnailFrameStyle;
	return /* @__PURE__ */ jsxs("button", {
		ref: buttonRef,
		style: buttonStyle,
		onClick,
		title: t("viewer.slideTitle", { number: slide }),
		"aria-label": t("viewer.slideTitle", { number: slide }),
		children: [
			!isTile && /* @__PURE__ */ jsx("span", {
				style: thumbnailIndexStyle,
				children: slide
			}),
			/* @__PURE__ */ jsx("div", {
				style: {
					...frameStyle,
					aspectRatio: `${frameAspect}`
				},
				children: svg ? /* @__PURE__ */ jsx("div", {
					ref: hostRef,
					style: thumbnailInnerStyle
				}) : /* @__PURE__ */ jsx("div", {
					style: thumbnailPlaceholderStyle,
					children: "…"
				})
			}),
			isTile && /* @__PURE__ */ jsx("span", {
				style: thumbnailCaptionStyle,
				children: slide
			})
		]
	});
}
var ThumbnailSidebar = memo(function ThumbnailSidebar(props) {
	const { slideCount, currentSlide, onSelect, getThumbnail, aspectFallback, deckKey } = props;
	return /* @__PURE__ */ jsxs("div", {
		style: thumbStripStyle,
		children: [Array.from({ length: slideCount }, (_, i) => {
			const n = i + 1;
			return /* @__PURE__ */ jsx(Thumbnail, {
				slide: n,
				active: n === currentSlide,
				onClick: () => onSelect(n),
				getThumbnail,
				aspectFallback,
				layout: "tile"
			}, `${deckKey}::${n}`);
		}), slideCount === 0 && /* @__PURE__ */ jsx("div", {
			style: sidebarEmptyStyle,
			children: t("viewer.empty")
		})]
	});
});
//#endregion
//#region src/presentation/GridView.tsx
/**
* Slide-sorter / grid view — every slide rendered as a uniform tile
* so the user can scan large decks at a glance and jump straight to
* a specific slide. Reuses the lazy `<Thumbnail>` component so an
* 800-slide deck doesn't fan out to 800 IPC calls on first paint.
*/
function GridView(props) {
	if (props.slideCount === 0) return /* @__PURE__ */ jsx("div", {
		style: overlayStyle,
		children: t("viewer.empty")
	});
	return /* @__PURE__ */ jsx("div", {
		style: gridViewStyle,
		children: Array.from({ length: props.slideCount }, (_, i) => {
			const n = i + 1;
			return /* @__PURE__ */ jsx(Thumbnail, {
				slide: n,
				active: n === props.currentSlide,
				onClick: () => props.onSelect(n),
				getThumbnail: props.getThumbnail,
				aspectFallback: props.aspect,
				layout: "tile"
			}, `${props.deckKey}::${n}`);
		})
	});
}
//#endregion
//#region src/presentation/NotesPanel.tsx
/**
* Footer panel that renders the current slide's speaker notes plus
* its layout / section labels. Mounted inside the shell when the
* notes drawer toggle is on.
*/
function NotesPanel(props) {
	const { currentSlide, meta } = props;
	return /* @__PURE__ */ jsxs("div", {
		style: notesPanelStyle,
		children: [
			/* @__PURE__ */ jsx("h4", {
				style: notesHeadingStyle,
				children: meta?.section_name ? t("notes.headingWithSection", {
					current: currentSlide,
					section: meta.section_name
				}) : t("notes.heading", { current: currentSlide })
			}),
			meta?.layout_name ? /* @__PURE__ */ jsx("div", {
				style: notesMetaStyle,
				children: t("notes.layoutLabel", { value: meta.layout_name })
			}) : null,
			meta?.section_name ? /* @__PURE__ */ jsx("div", {
				style: notesMetaStyle,
				children: t("notes.sectionLabel", { value: meta.section_name })
			}) : null,
			meta?.notes ? /* @__PURE__ */ jsx("div", {
				style: notesBodyStyle,
				children: meta.notes
			}) : /* @__PURE__ */ jsx("em", {
				style: notesEmptyStyle,
				children: t("notes.empty")
			})
		]
	});
}
//#endregion
//#region src/presentation/SlideshowOverlay.tsx
function SlideshowOverlay(props) {
	if (!props.open) return null;
	const { currentSlide, slideCount, setSlideshow, setCurrentSlide, fit, slideSvg, canvasW, canvasH, slideW, slideH, slideshowStageRef, slideshowSlideRef, children } = props;
	return /* @__PURE__ */ jsxs("div", {
		style: slideshowStyle,
		children: [
			/* @__PURE__ */ jsx("main", {
				ref: slideshowStageRef,
				style: {
					...stageStyle,
					background: "#000",
					cursor: "pointer"
				},
				onClick: (ev) => {
					if (ev.button !== 0 || ev.ctrlKey || ev.metaKey || ev.shiftKey) return;
					if (currentSlide >= slideCount) {
						setSlideshow(false);
						if (document.fullscreenElement) document.exitFullscreen();
					} else setCurrentSlide((s) => Math.min(slideCount, s + 1));
				},
				children: fit > 0 && slideSvg && /* @__PURE__ */ jsx("div", {
					style: {
						width: canvasW,
						height: canvasH,
						position: "relative"
					},
					children: /* @__PURE__ */ jsx("div", {
						ref: slideshowSlideRef,
						style: {
							width: slideW,
							height: slideH,
							position: "absolute",
							left: "50%",
							top: "50%",
							transform: `translate(-50%, -50%)`,
							background: "white"
						}
					})
				})
			}),
			/* @__PURE__ */ jsx("div", {
				"data-pptx-slideshow-nav": "",
				style: slideshowNavZoneStyle,
				onClick: (ev) => ev.stopPropagation(),
				children: /* @__PURE__ */ jsxs("div", {
					style: slideshowNavGroupStyle,
					children: [
						/* @__PURE__ */ jsx("button", {
							style: slideshowNavButtonStyle,
							onClick: () => setCurrentSlide((s) => Math.max(1, s - 1)),
							disabled: currentSlide <= 1,
							title: t("nav.previousSlide"),
							"aria-label": t("nav.previousSlide"),
							children: /* @__PURE__ */ jsx(CaretLeft, {
								size: 20,
								weight: "bold"
							})
						}),
						/* @__PURE__ */ jsx("button", {
							style: slideshowNavButtonStyle,
							onClick: () => setCurrentSlide((s) => Math.min(slideCount, s + 1)),
							disabled: currentSlide >= slideCount,
							title: t("nav.nextSlide"),
							"aria-label": t("nav.nextSlide"),
							children: /* @__PURE__ */ jsx(CaretRight, {
								size: 20,
								weight: "bold"
							})
						}),
						/* @__PURE__ */ jsx("button", {
							style: slideshowNavButtonStyle,
							onClick: () => {
								setSlideshow(false);
								if (document.fullscreenElement) document.exitFullscreen();
							},
							title: t("common.close"),
							"aria-label": t("common.close"),
							children: /* @__PURE__ */ jsx(X, {
								size: 18,
								weight: "bold"
							})
						})
					]
				})
			}),
			children
		]
	});
}
//#endregion
//#region src/ui/FontUsageIndicator.tsx
/**
* Status-bar indicator that surfaces the deck's font fallback mapping.
*
* For every typeface referenced by the deck, the indicator probes the
* SVG `font-family` chain via `document.fonts.check()` to identify the
* actually-rendered font in the current browser. When at least one
* authored typeface falls back to a substitute, a warning triangle
* appears in the status bar; clicking it expands a popover with the
* full mapping ("Calibri → Carlito", "맑은 고딕 → Noto Sans KR", …) so
* the user can decide whether to install the original font.
*
* The probe runs once on mount and again whenever `fontUsage` or the
* `FontFaceSet` changes. The mapping is exact about what we know
* ("authored name X is being rendered as Y") and silent about what
* we don't (PowerPoint-side line break parity).
*/
/**
* Probe `document.fonts.check()` for every entry in `chain` and return
* the first one that's installed.
*
* `document.fonts.check(font)` uses the CSS Font Loading API. Quoting
* is required for family names that contain spaces; we always quote
* to keep the call site uniform.
*/
function findEffectiveFamily(chain) {
	if (typeof document === "undefined" || !document.fonts) return null;
	for (const family of chain) {
		if (family.length === 0) continue;
		try {
			const escaped = family.replace(/"/g, "\\\"");
			if (document.fonts.check(`12px "${escaped}"`)) return family;
		} catch {}
	}
	return null;
}
/**
* Compute the mapping rows from the raw usage report. Pure function so
* we can re-evaluate it whenever the `FontFaceSet` notifies of a load.
*/
function computeMappingRows(usage) {
	return usage.filter((entry) => entry.requested.length > 0).map((entry) => {
		const effective = findEffectiveFamily(entry.fallbackChain[0] === entry.requested ? entry.fallbackChain : [entry.requested, ...entry.fallbackChain]);
		const isSubstitute = effective !== null && effective !== entry.requested;
		return {
			requested: entry.requested,
			effective,
			isSubstitute
		};
	});
}
function FontUsageIndicator({ fontUsage, buttonStyle, buttonActiveStyle }) {
	const [open, setOpen] = useState(false);
	const [rows, setRows] = useState(() => computeMappingRows(fontUsage));
	const containerRef = useRef(null);
	useEffect(() => {
		setRows(computeMappingRows(fontUsage));
		if (typeof document === "undefined" || !document.fonts) return;
		const refresh = () => setRows(computeMappingRows(fontUsage));
		document.fonts.addEventListener("loadingdone", refresh);
		return () => {
			document.fonts.removeEventListener("loadingdone", refresh);
		};
	}, [fontUsage]);
	useEffect(() => {
		if (!open) return;
		function onDocClick(ev) {
			const root = containerRef.current;
			if (root && !root.contains(ev.target)) setOpen(false);
		}
		document.addEventListener("mousedown", onDocClick);
		return () => document.removeEventListener("mousedown", onDocClick);
	}, [open]);
	const interestingRows = useMemo(() => rows.filter((r) => r.isSubstitute || r.effective === null), [rows]);
	const toggle = useCallback(() => setOpen((o) => !o), []);
	if (interestingRows.length === 0) return null;
	const label = t("fontUsage.substituteCount", { count: interestingRows.length });
	return /* @__PURE__ */ jsxs("div", {
		ref: containerRef,
		style: containerStyle,
		children: [/* @__PURE__ */ jsx("button", {
			style: open ? { ...buttonActiveStyle } : { ...buttonStyle },
			onClick: toggle,
			title: label,
			"aria-label": label,
			"aria-pressed": open,
			"aria-haspopup": "dialog",
			children: /* @__PURE__ */ jsx(Warning, {
				size: 14,
				weight: open ? "fill" : "regular",
				color: "#e0a000"
			})
		}), open && /* @__PURE__ */ jsxs("div", {
			style: popoverStyle,
			role: "dialog",
			"aria-label": t("fontUsage.title"),
			children: [/* @__PURE__ */ jsxs("header", {
				style: popoverHeaderStyle,
				children: [/* @__PURE__ */ jsx("span", {
					style: popoverTitleStyle,
					children: t("fontUsage.title")
				}), /* @__PURE__ */ jsx("button", {
					style: popoverCloseStyle,
					onClick: () => setOpen(false),
					"aria-label": t("fontUsage.close"),
					title: t("fontUsage.close"),
					children: /* @__PURE__ */ jsx(X, {
						size: 12,
						weight: "bold"
					})
				})]
			}), /* @__PURE__ */ jsx("div", {
				style: popoverBodyStyle,
				children: /* @__PURE__ */ jsxs("table", {
					style: tableStyle,
					children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [/* @__PURE__ */ jsx("th", {
						style: thStyle,
						children: t("fontUsage.headerRequested")
					}), /* @__PURE__ */ jsx("th", {
						style: thStyle,
						children: t("fontUsage.headerEffective")
					})] }) }), /* @__PURE__ */ jsx("tbody", { children: interestingRows.map((row) => /* @__PURE__ */ jsxs("tr", { children: [/* @__PURE__ */ jsx("td", {
						style: tdStyle,
						children: row.requested
					}), /* @__PURE__ */ jsx("td", {
						style: tdStyle,
						children: row.effective === null ? /* @__PURE__ */ jsx("span", {
							style: mutedStyle,
							children: t("fontUsage.systemFallback")
						}) : /* @__PURE__ */ jsx("span", {
							style: substituteStyle,
							children: row.effective
						})
					})] }, row.requested)) })]
				})
			})]
		})]
	});
}
var containerStyle = {
	position: "relative",
	display: "inline-flex",
	alignItems: "center"
};
var popoverStyle = {
	position: "absolute",
	bottom: "calc(100% + 4px)",
	right: 0,
	minWidth: 320,
	maxWidth: 480,
	maxHeight: 360,
	overflow: "hidden",
	display: "flex",
	flexDirection: "column",
	background: "var(--pptx-shell-bg, #1f1f24)",
	color: "var(--pptx-shell-fg, #e6e6ea)",
	border: "1px solid var(--pptx-shell-border, #2c2c34)",
	borderRadius: 6,
	boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)",
	zIndex: 1e3,
	fontSize: 12
};
var popoverHeaderStyle = {
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	padding: "8px 12px",
	borderBottom: "1px solid var(--pptx-shell-border, #2c2c34)"
};
var popoverTitleStyle = { fontWeight: 600 };
var popoverCloseStyle = {
	width: 20,
	height: 20,
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	background: "transparent",
	color: "inherit",
	border: 0,
	borderRadius: 3,
	cursor: "pointer",
	padding: 0
};
var popoverBodyStyle = {
	overflow: "auto",
	padding: "4px 0"
};
var tableStyle = {
	width: "100%",
	borderCollapse: "collapse",
	fontSize: 12
};
var thStyle = {
	textAlign: "left",
	padding: "6px 12px",
	fontWeight: 500,
	color: "var(--pptx-shell-muted, #9a9aa3)",
	borderBottom: "1px solid var(--pptx-shell-border, #2c2c34)"
};
var tdStyle = {
	padding: "5px 12px",
	borderBottom: "1px solid var(--pptx-shell-border-soft, #26262e)",
	whiteSpace: "nowrap",
	overflow: "hidden",
	textOverflow: "ellipsis"
};
var substituteStyle = { color: "#e0a000" };
var mutedStyle = {
	color: "var(--pptx-shell-muted, #9a9aa3)",
	fontStyle: "italic"
};
//#endregion
//#region src/presentation/StatusBar.tsx
var ZOOM_MIN$3 = .25;
var ZOOM_MAX$3 = 8;
function clamp$3(value, min, max) {
	return Math.max(min, Math.min(max, value));
}
function StatusBar(props) {
	if (props.slideshow) return null;
	const { phase, errorMsg, slideMeta, slideCount, currentSlide, selectionFonts, selectionFontsOpen, setSelectionFontsOpen, selectionFontsRef, fontUsage, notesOpen, setNotesOpen, viewMode, setViewMode, zoomPct, setZoom, setZoomFromPct, reset } = props;
	return /* @__PURE__ */ jsxs("footer", {
		style: statusBarStyle,
		children: [
			/* @__PURE__ */ jsx("span", {
				style: phaseStyle,
				children: phase || (errorMsg ? `⚠ ${errorMsg}` : t("common.ready"))
			}),
			/* @__PURE__ */ jsx("div", { style: spacerStyle }),
			slideMeta?.section_name ? /* @__PURE__ */ jsx("span", {
				style: metaStyle,
				children: slideMeta.section_name
			}) : null,
			/* @__PURE__ */ jsx("span", {
				style: metaStyle,
				children: slideCount === 0 ? t("status.slideEmpty") : t("status.slideOf", {
					current: currentSlide,
					total: slideCount
				})
			}),
			selectionFonts.length > 0 ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("span", { style: statusSepStyle }), /* @__PURE__ */ jsxs("div", {
				ref: selectionFontsRef,
				style: selectionFontsContainerStyle,
				children: [/* @__PURE__ */ jsxs("button", {
					type: "button",
					style: selectionFontsOpen ? selectionFontsButtonActiveStyle : selectionFontsButtonStyle,
					title: t("status.selectionFontTitle", { fonts: selectionFonts.join(", ") }),
					"aria-haspopup": "dialog",
					"aria-expanded": selectionFontsOpen,
					onClick: () => setSelectionFontsOpen((o) => !o),
					children: [
						t("status.selectionFontLabel"),
						" ",
						selectionFonts.length === 1 ? selectionFonts[0] : t("status.selectionFontMultiple", {
							first: selectionFonts[0],
							extra: selectionFonts.length - 1
						})
					]
				}), selectionFontsOpen ? /* @__PURE__ */ jsx("div", {
					style: selectionFontsPopoverStyle,
					role: "dialog",
					"aria-label": t("status.selectionFontTitle", { fonts: selectionFonts.join(", ") }),
					children: /* @__PURE__ */ jsx("ul", {
						style: selectionFontsListStyle,
						children: selectionFonts.map((family) => /* @__PURE__ */ jsx("li", {
							style: selectionFontsListItemStyle,
							children: family
						}, family))
					})
				}) : null]
			})] }) : null,
			/* @__PURE__ */ jsx("span", { style: statusSepStyle }),
			/* @__PURE__ */ jsx(FontUsageIndicator, {
				fontUsage,
				buttonStyle: statusIconStyle,
				buttonActiveStyle: activeIconSmStyle
			}),
			/* @__PURE__ */ jsx("button", {
				style: notesOpen ? activeIconSmStyle : statusIconStyle,
				onClick: () => setNotesOpen((o) => !o),
				title: t("status.toggleNotes"),
				"aria-label": t("status.toggleNotes"),
				"aria-pressed": notesOpen,
				children: /* @__PURE__ */ jsx(ChatCircleText, {
					size: 14,
					weight: notesOpen ? "fill" : "regular"
				})
			}),
			/* @__PURE__ */ jsx("span", { style: statusSepStyle }),
			/* @__PURE__ */ jsx("button", {
				style: viewMode === "normal" ? activeIconSmStyle : statusIconStyle,
				onClick: () => setViewMode("normal"),
				title: t("status.normalView"),
				"aria-label": t("status.normalView"),
				"aria-pressed": viewMode === "normal",
				children: /* @__PURE__ */ jsx(SquaresFour, {
					size: 14,
					weight: viewMode === "normal" ? "fill" : "regular"
				})
			}),
			/* @__PURE__ */ jsx("button", {
				style: viewMode === "grid" ? activeIconSmStyle : statusIconStyle,
				onClick: () => setViewMode("grid"),
				title: t("status.gridView"),
				"aria-label": t("status.gridView"),
				"aria-pressed": viewMode === "grid",
				children: /* @__PURE__ */ jsx(GridFour, {
					size: 14,
					weight: viewMode === "grid" ? "fill" : "regular"
				})
			}),
			/* @__PURE__ */ jsx("span", { style: statusSepStyle }),
			/* @__PURE__ */ jsx("button", {
				style: statusIconStyle,
				onClick: () => setZoom((z) => clamp$3(z * .8, ZOOM_MIN$3, ZOOM_MAX$3)),
				title: t("status.zoomOut"),
				"aria-label": t("status.zoomOut"),
				children: /* @__PURE__ */ jsx(Minus, {
					size: 14,
					weight: "bold"
				})
			}),
			/* @__PURE__ */ jsx("input", {
				type: "range",
				min: Math.round(ZOOM_MIN$3 * 100),
				max: 400,
				step: 1,
				value: Math.min(zoomPct, 400),
				onChange: (e) => setZoomFromPct(parseFloat(e.target.value)),
				style: zoomSliderStyle,
				title: t("status.zoom"),
				"aria-label": t("status.zoom")
			}),
			/* @__PURE__ */ jsx("button", {
				style: statusIconStyle,
				onClick: () => setZoom((z) => clamp$3(z * 1.25, ZOOM_MIN$3, ZOOM_MAX$3)),
				title: t("status.zoomIn"),
				"aria-label": t("status.zoomIn"),
				children: /* @__PURE__ */ jsx(Plus, {
					size: 14,
					weight: "bold"
				})
			}),
			/* @__PURE__ */ jsxs("span", {
				style: zoomPctStyle,
				onClick: reset,
				title: t("status.zoomReset"),
				role: "button",
				tabIndex: 0,
				onKeyDown: (e) => {
					if (e.key === "Enter" || e.key === " ") reset();
				},
				children: [zoomPct, "%"]
			}),
			/* @__PURE__ */ jsx("button", {
				style: statusIconStyle,
				onClick: reset,
				title: t("status.fitWindow"),
				"aria-label": t("status.fitWindow"),
				children: /* @__PURE__ */ jsx(ArrowsOutSimple, {
					size: 14,
					weight: "bold"
				})
			})
		]
	});
}
//#endregion
//#region src/presentation/Toolbar.tsx
function Toolbar(props) {
	const { toolbarStart, toolbarEnd, name, slideCount, currentSlide, setCurrentSlide, searchOpen, setSearchOpen, allSlidesReady, noPrefetch, deckGateTitle, handlePrint, handleExportPdf, handleSlideshow, shortcutsOpen, setShortcutsOpen, settingsOpen, setSettingsOpen, hideSettings } = props;
	const exportDisabled = slideCount === 0 || !noPrefetch && !allSlidesReady;
	const exportButtonStyle = !noPrefetch && !allSlidesReady && slideCount > 0 ? disabledTextButtonStyle : textButtonStyle;
	return /* @__PURE__ */ jsxs("header", {
		style: ribbonStyle,
		children: [
			toolbarStart,
			/* @__PURE__ */ jsx("span", {
				style: filenameStyle,
				title: name ?? "",
				children: name ?? t("viewer.noFile")
			}),
			/* @__PURE__ */ jsx("div", { style: spacerStyle }),
			/* @__PURE__ */ jsx("button", {
				style: iconButtonStyle,
				onClick: () => setCurrentSlide(1),
				disabled: slideCount === 0 || currentSlide <= 1,
				title: t("nav.firstSlide"),
				"aria-label": t("nav.firstSlide"),
				children: /* @__PURE__ */ jsx(SkipBack, {
					size: 16,
					weight: "fill"
				})
			}),
			/* @__PURE__ */ jsx("button", {
				style: iconButtonStyle,
				onClick: () => setCurrentSlide((s) => Math.max(1, s - 1)),
				disabled: currentSlide <= 1,
				title: t("nav.previousSlide"),
				"aria-label": t("nav.previousSlide"),
				children: /* @__PURE__ */ jsx(CaretLeft, {
					size: 16,
					weight: "bold"
				})
			}),
			/* @__PURE__ */ jsx("span", {
				style: counterStyle,
				children: slideCount === 0 ? "—" : `${currentSlide} / ${slideCount}`
			}),
			/* @__PURE__ */ jsx("button", {
				style: iconButtonStyle,
				onClick: () => setCurrentSlide((s) => Math.min(slideCount, s + 1)),
				disabled: currentSlide >= slideCount,
				title: t("nav.nextSlide"),
				"aria-label": t("nav.nextSlide"),
				children: /* @__PURE__ */ jsx(CaretRight, {
					size: 16,
					weight: "bold"
				})
			}),
			/* @__PURE__ */ jsx("button", {
				style: iconButtonStyle,
				onClick: () => setCurrentSlide(slideCount),
				disabled: slideCount === 0 || currentSlide >= slideCount,
				title: t("nav.lastSlide"),
				"aria-label": t("nav.lastSlide"),
				children: /* @__PURE__ */ jsx(SkipForward, {
					size: 16,
					weight: "fill"
				})
			}),
			/* @__PURE__ */ jsx("span", { style: dividerStyle }),
			/* @__PURE__ */ jsx("button", {
				style: searchOpen ? activeIconStyle : iconButtonStyle,
				onClick: () => setSearchOpen((o) => !o),
				title: t("search.title"),
				"aria-label": t("search.title"),
				"aria-pressed": searchOpen,
				children: /* @__PURE__ */ jsx(MagnifyingGlass, {
					size: 16,
					weight: "bold"
				})
			}),
			/* @__PURE__ */ jsx("span", { style: dividerStyle }),
			/* @__PURE__ */ jsxs("button", {
				style: exportButtonStyle,
				onClick: () => void handlePrint(),
				title: noPrefetch ? t("output.printTitle") : deckGateTitle(t("output.printTitle"), allSlidesReady, slideCount),
				disabled: exportDisabled,
				children: [
					/* @__PURE__ */ jsx(Printer, {
						size: 16,
						weight: "regular"
					}),
					" ",
					t("output.print")
				]
			}),
			/* @__PURE__ */ jsxs("button", {
				style: exportButtonStyle,
				onClick: () => void handleExportPdf(),
				title: noPrefetch ? t("output.pdfTitle") : deckGateTitle(t("output.pdfTitle"), allSlidesReady, slideCount),
				disabled: exportDisabled,
				children: [
					/* @__PURE__ */ jsx(FilePdf, {
						size: 16,
						weight: "regular"
					}),
					" ",
					t("output.pdf")
				]
			}),
			/* @__PURE__ */ jsxs("button", {
				style: exportButtonStyle,
				onClick: () => void handleSlideshow(),
				title: noPrefetch ? t("output.slideshowTitle") : deckGateTitle(t("output.slideshowTitle"), allSlidesReady, slideCount),
				disabled: exportDisabled,
				children: [
					/* @__PURE__ */ jsx(Play, {
						size: 16,
						weight: "fill"
					}),
					" ",
					t("output.slideshow")
				]
			}),
			/* @__PURE__ */ jsx("span", { style: dividerStyle }),
			/* @__PURE__ */ jsx("button", {
				style: shortcutsOpen ? activeIconStyle : iconButtonStyle,
				onClick: () => setShortcutsOpen((o) => !o),
				title: t("shortcuts.openTitle"),
				"aria-label": t("shortcuts.openTitle"),
				"aria-haspopup": "dialog",
				"aria-expanded": shortcutsOpen,
				children: /* @__PURE__ */ jsx(Question, {
					size: 16,
					weight: "regular"
				})
			}),
			!hideSettings && /* @__PURE__ */ jsx("button", {
				style: iconButtonStyle,
				onClick: () => setSettingsOpen(true),
				title: t("settings.openTitle"),
				"aria-label": t("settings.openTitle"),
				"aria-haspopup": "dialog",
				"aria-expanded": settingsOpen,
				children: /* @__PURE__ */ jsx(GearSix, {
					size: 16,
					weight: "regular"
				})
			}),
			toolbarEnd
		]
	});
}
//#endregion
//#region src/presentation/use-deck-loader.ts
/**
* `useDeckLoader` — auto-open a `.pptx` source on mount and feed
* everything the controller hands back into the host's slide-state
* slots.
*
* Steps:
* 1. Resolve `src` to bytes — `string` is fetched, `ArrayBuffer` is
*    wrapped, raw `Uint8Array` is used as-is.
* 2. Hand the bytes to `controller.open()` with the host-supplied
*    `bundledFontDefsCss` (chrome-extension uses this for its
*    bundled Google Fonts so the worker's canvas measurer sees the
*    same metrics the eventual browser paint will).
* 3. Mirror the controller's metadata into host state (slide count,
*    typeface usage, font-defs CSS).
* 4. Register every MTX-decoded TTF buffer on `document.fonts` via
*    the FontFace API. The worker pre-filtered these through
*    `validateCmap` so OTS rejection is the rare exception, but
*    silent-catch the promise rejection regardless — fallback fonts
*    cover the visible paint.
* 5. Reset slide / zoom / pan state to the new deck's defaults and
*    revoke any blob URLs lingering in the previous deck's cache.
*
* Skipped entirely when the host opted into manual control by
* passing `slideCount` (`externalSlideCount != null`) — that mode
* means the embedder owns deck loading and the viewer just renders.
*/
function useDeckLoader(args) {
	const { controller, src, externalSlideCount, bundledFontDefsCss, incrementalUpdate, invalidatedSlides, setPhase, setSlideCount, setFontUsage, setFontDefsCss, setCurrentSlide, setZoom, setPanX, setPanY, setErrorMsg, setSlideCache } = args;
	useEffect(() => {
		if (!controller || src == null || externalSlideCount != null) return;
		let cancelled = false;
		(async () => {
			try {
				setPhase("loading");
				let bytes;
				if (typeof src === "string") {
					const res = await fetch(src);
					if (!res.ok) throw new Error(`fetch ${src} → ${res.status}`);
					bytes = new Uint8Array(await res.arrayBuffer());
				} else if (src instanceof Uint8Array) bytes = src;
				else bytes = new Uint8Array(src);
				const meta = await controller.open(bytes, { extraFontDefsCss: bundledFontDefsCss });
				if (cancelled) return;
				setSlideCount(meta.slideCount);
				setFontUsage(meta.fontUsage ?? []);
				setFontDefsCss(extractFontStyleCss(meta.fontDefs ?? ""));
				if (typeof document !== "undefined" && document.fonts) for (const d of meta.decodedFonts ?? []) try {
					new FontFace(d.family, d.bytes.buffer, {
						weight: d.weight,
						style: d.style
					}).load().then((loaded) => {
						document.fonts.add(loaded);
					}).catch(() => {});
				} catch {}
				if (!incrementalUpdate) {
					setCurrentSlide(1);
					setZoom(1);
					setPanX(0);
					setPanY(0);
				}
				setErrorMsg(null);
				setPhase("");
				if (incrementalUpdate && invalidatedSlides !== void 0) {
					if (invalidatedSlides.length > 0) {
						const dropSet = new Set(invalidatedSlides);
						setSlideCache((prev) => {
							const next = new Map(prev);
							for (const idx of dropSet) {
								const entry = next.get(idx);
								if (!entry) continue;
								for (const u of entry.blobUrls) URL.revokeObjectURL(u);
								next.delete(idx);
							}
							return next;
						});
					}
				} else setSlideCache((prev) => {
					for (const c of prev.values()) for (const u of c.blobUrls) URL.revokeObjectURL(u);
					return /* @__PURE__ */ new Map();
				});
			} catch (err) {
				if (!cancelled) {
					setErrorMsg(`${err.message ?? err}`);
					setPhase("");
				}
			}
		})();
		return () => {
			cancelled = true;
		};
	}, [
		controller,
		src,
		externalSlideCount
	]);
}
//#endregion
//#region src/presentation/use-embedded-font-style.ts
/**
* `useEmbeddedFontStyle` — mount the deck's embedded `@font-face`
* declarations into a document-scoped `<style>` so the browser's
* font matcher can resolve family names like `"Noto Sans Bold"`
* referenced by SVG `<text>` runs.
*
* The declarations come from PPTX `<p:embeddedFontLst>` faces
* extracted by the WASM core (`fontDefs()`), already de-obfuscated
* and base64-encoded. Without this mount the embedded fonts would
* only live in the worker's FontFaceSet (worker-local, invisible
* to `document`), and the SVG would silently fall back to a system
* sans-serif — wider than the authored face on most hosts and
* overflowing text frames into adjacent layout regions.
*
* The `<style>` element is identified by a single id so re-mounting
* the component (or swapping decks) replaces the rules atomically;
* empty CSS removes the element entirely. The `data-slideglance-fonts`
* attribute is for co-located shells that need to detect or clean
* up orphan blocks.
*
* Eager `document.fonts.load(...)` calls force every declared
* family to start decoding *now* so the FontUsageIndicator's
* initial state matches its post-render-everything state. CSS
* `@font-face` URLs are otherwise lazily fetched only when a text
* node first references the family, which made the indicator
* report transient substitutions that disappeared the moment the
* user switched to grid view.
*/
var STYLE_ELEMENT_ID = "slideglance-deck-fonts";
function useEmbeddedFontStyle(fontDefsCss) {
	useEffect(() => {
		if (typeof document === "undefined") return;
		const existing = document.getElementById(STYLE_ELEMENT_ID);
		if (fontDefsCss.length === 0) {
			if (existing) existing.remove();
			return;
		}
		const styleEl = existing ?? document.createElement("style");
		if (!existing) {
			styleEl.id = STYLE_ELEMENT_ID;
			styleEl.dataset.slideglanceFonts = "true";
			document.head.appendChild(styleEl);
		}
		if (styleEl.textContent !== fontDefsCss) styleEl.textContent = fontDefsCss;
		if (document.fonts) {
			const families = /* @__PURE__ */ new Set();
			const matches = fontDefsCss.matchAll(/font-family\s*:\s*['"]([^'"]+)['"]/gi);
			for (const match of matches) families.add(match[1]);
			for (const family of families) {
				const escaped = family.replace(/"/g, "\\\"");
				document.fonts.load(`12px "${escaped}"`).catch(() => {});
			}
		}
		return () => {
			styleEl.remove();
		};
	}, [fontDefsCss]);
}
//#endregion
//#region src/presentation/use-keyboard-shortcuts.ts
/**
* `useKeyboardShortcuts` — global keydown / keyup / blur listener
* that owns every shell-level keyboard binding.
*
* Bindings:
* - Cmd/Ctrl + F → toggle search drawer
* - Cmd/Ctrl + P → print (gated on slideCount > 0 && allSlidesReady)
* - Cmd/Ctrl + A → select every shape with a known bbox
* - Cmd/Ctrl + C → copy selected shapes' text content
* - Cmd/Ctrl + (= / +) / - / 0 → zoom in / out / reset
* - ←/→ + Home/End + PageUp/PageDown → slide navigation
* - Esc → exit slideshow / close search / clear selection
* - Space (held) → engage pan mode
* - ? → toggle shortcuts help dialog
*
* Extracted from `PptxPresentation` so the keyboard surface lives in
* one place — the host component just wires its state slots to the
* hook arguments and the hook installs a single window-level
* keydown / keyup / blur handler that orchestrates them.
*/
var ZOOM_MIN$2 = .25;
var ZOOM_MAX$2 = 8;
function clamp$2(value, min, max) {
	return Math.max(min, Math.min(max, value));
}
function useKeyboardShortcuts(args) {
	const { slideCount, allSlidesReady, searchOpen, slideshow, selectedIds, textEditId, handlePrintRef, bboxMapRef, slideRef, setSearchOpen, setSlideshow, setSelectedIds, setTextEditId, setRubberBand, setSpaceHeld, setShortcutsOpen, setCurrentSlide, setZoom, setPanX, setPanY } = args;
	useEffect(() => {
		const onKey = (ev) => {
			const mod = ev.metaKey || ev.ctrlKey;
			if (mod && ev.key === "f") {
				ev.preventDefault();
				setSearchOpen((o) => !o);
				return;
			}
			if (mod && ev.key === "p") {
				ev.preventDefault();
				if (slideCount > 0 && allSlidesReady) handlePrintRef.current?.();
				return;
			}
			if (ev.key === "Escape") {
				if (slideshow) {
					setSlideshow(false);
					if (document.fullscreenElement) document.exitFullscreen();
					ev.preventDefault();
					return;
				}
				if (searchOpen) {
					setSearchOpen(false);
					ev.preventDefault();
					return;
				}
				setSelectedIds(/* @__PURE__ */ new Set());
				setTextEditId(null);
				setRubberBand(null);
			}
			if (mod && ev.key.toLowerCase() === "a" && !textEditId) {
				ev.preventDefault();
				setSelectedIds(new Set(bboxMapRef.current.keys()));
				return;
			}
			if (mod && ev.key.toLowerCase() === "c" && selectedIds.size > 0 && !textEditId) {
				const host = slideRef.current;
				if (host) {
					const parts = [];
					for (const id of selectedIds) {
						const txt = host.querySelector(`[data-sp-id="${CSS.escape(id)}"]`)?.textContent?.trim();
						if (txt) parts.push(txt);
					}
					if (parts.length > 0 && navigator.clipboard) {
						ev.preventDefault();
						navigator.clipboard.writeText(parts.join("\n\n"));
					}
				}
				return;
			}
			if (ev.key === " " && !ev.repeat && !textEditId) setSpaceHeld(true);
			if (ev.key === "?" && !textEditId) {
				ev.preventDefault();
				setShortcutsOpen((o) => !o);
				return;
			}
			if (ev.key === "ArrowRight" || ev.key === "PageDown") {
				setCurrentSlide((s) => Math.min(slideCount, s + 1));
				ev.preventDefault();
			} else if (ev.key === "ArrowLeft" || ev.key === "PageUp") {
				setCurrentSlide((s) => Math.max(1, s - 1));
				ev.preventDefault();
			} else if (ev.key === "Home") {
				setCurrentSlide(1);
				ev.preventDefault();
			} else if (ev.key === "End") {
				setCurrentSlide(slideCount);
				ev.preventDefault();
			} else if (mod && (ev.key === "=" || ev.key === "+")) {
				setZoom((z) => clamp$2(z * 1.25, ZOOM_MIN$2, ZOOM_MAX$2));
				ev.preventDefault();
			} else if (mod && ev.key === "-") {
				setZoom((z) => clamp$2(z * .8, ZOOM_MIN$2, ZOOM_MAX$2));
				ev.preventDefault();
			} else if (mod && ev.key === "0") {
				setZoom(1);
				setPanX(0);
				setPanY(0);
				ev.preventDefault();
			}
		};
		const onKeyUp = (ev) => {
			if (ev.key === " ") setSpaceHeld(false);
		};
		const onBlur = () => setSpaceHeld(false);
		window.addEventListener("keydown", onKey);
		window.addEventListener("keyup", onKeyUp);
		window.addEventListener("blur", onBlur);
		return () => {
			window.removeEventListener("keydown", onKey);
			window.removeEventListener("keyup", onKeyUp);
			window.removeEventListener("blur", onBlur);
		};
	}, [
		slideCount,
		allSlidesReady,
		searchOpen,
		slideshow,
		selectedIds,
		textEditId,
		handlePrintRef,
		bboxMapRef,
		slideRef,
		setSearchOpen,
		setSlideshow,
		setSelectedIds,
		setTextEditId,
		setRubberBand,
		setSpaceHeld,
		setShortcutsOpen,
		setCurrentSlide,
		setZoom,
		setPanX,
		setPanY
	]);
}
//#endregion
//#region src/ui/pdf.ts
/**
* Returns a `Uint8Array` containing a multi-page PDF — one slide per
* page, each rendered as a JPEG. Throws when a slide SVG cannot be
* rasterized.
*/
async function exportToPdf(options) {
	if (options.slides.length === 0) throw new Error("exportToPdf: no slides to export");
	const targetWidth = options.width ?? 1920;
	const quality = options.quality ?? .9;
	const total = options.slides.length;
	const onProgress = options.onProgress ?? (() => {});
	const pages = [];
	for (let i = 0; i < options.slides.length; i += 1) {
		onProgress({
			phase: "rasterize",
			current: i,
			total
		});
		const page = await rasterizeSvgToJpeg(options.slides[i].svg, targetWidth, quality);
		if (page) pages.push(page);
		await new Promise((resolve) => setTimeout(resolve, 0));
	}
	if (pages.length === 0) throw new Error("exportToPdf: no pages could be rasterized");
	onProgress({
		phase: "encode",
		current: total,
		total
	});
	await new Promise((resolve) => setTimeout(resolve, 0));
	return buildPdf(pages);
}
/**
* Rasterize an SVG string to JPEG bytes using the browser's native
* `Image` + `<canvas>` pipeline. Width is fixed; height scales to
* preserve the SVG's aspect ratio (parsed from `viewBox`).
*/
async function rasterizeSvgToJpeg(svg, targetWidth, quality) {
	const aspect = parseSvgAspect$1(svg);
	const w = targetWidth;
	const h = Math.round(targetWidth / aspect);
	const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
	const url = URL.createObjectURL(blob);
	try {
		const img = await loadImage(url);
		const canvas = document.createElement("canvas");
		canvas.width = w;
		canvas.height = h;
		const ctx = canvas.getContext("2d");
		if (!ctx) throw new Error("Canvas 2D context unavailable");
		ctx.fillStyle = "#ffffff";
		ctx.fillRect(0, 0, w, h);
		ctx.drawImage(img, 0, 0, w, h);
		const arrayBuf = await (await canvasToBlob(canvas, "image/jpeg", quality)).arrayBuffer();
		return {
			jpeg: new Uint8Array(arrayBuf),
			width: w,
			height: h
		};
	} finally {
		URL.revokeObjectURL(url);
	}
}
function parseSvgAspect$1(svg) {
	const m = /viewBox\s*=\s*"([^"]+)"/i.exec(svg) ?? /viewBox\s*=\s*'([^']+)'/i.exec(svg);
	if (m) {
		const parts = m[1].split(/\s+/).map(Number);
		const w = parts[2];
		const h = parts[3];
		if (w && h && w > 0 && h > 0) return w / h;
	}
	return 16 / 9;
}
function loadImage(url) {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => resolve(img);
		img.onerror = () => reject(/* @__PURE__ */ new Error("Failed to load SVG into <img>"));
		img.src = url;
	});
}
function canvasToBlob(canvas, type, quality) {
	return new Promise((resolve, reject) => {
		canvas.toBlob((blob) => {
			if (blob) resolve(blob);
			else reject(/* @__PURE__ */ new Error("canvas.toBlob() returned null"));
		}, type, quality);
	});
}
/**
* Build a minimal PDF 1.4 document from a list of JPEG-encoded pages.
*
* Object layout (1-indexed object numbers):
*   1  /Catalog
*   2  /Pages
*   3..N      odd  → /Page
*   3..N      even → /XObject (the JPEG image)
*   N..       even → content stream
*
* For simplicity we group each page as 3 sequential objects:
*   page i → page object, image XObject, content stream.
*/
function buildPdf(pages) {
	const enc = new TextEncoder();
	const chunks = [];
	const offsets = [];
	let cursor = 0;
	const pushString = (s) => {
		chunks.push(s);
		cursor += enc.encode(s).length;
	};
	const pushBytes = (b) => {
		chunks.push(b);
		cursor += b.length;
	};
	const beginObject = (n) => {
		offsets[n] = cursor;
		pushString(`${n} 0 obj\n`);
	};
	const endObject = () => {
		pushString("\nendobj\n");
	};
	pushString("%PDF-1.4\n");
	pushBytes(new Uint8Array([
		37,
		226,
		227,
		207,
		211,
		10
	]));
	const catalogId = 1;
	const pagesId = 2;
	const pageIds = [];
	const imageIds = [];
	const contentIds = [];
	for (let i = 0; i < pages.length; i += 1) {
		pageIds.push(3 + i * 3);
		imageIds.push(4 + i * 3);
		contentIds.push(5 + i * 3);
	}
	beginObject(catalogId);
	pushString(`<< /Type /Catalog /Pages ${pagesId} 0 R >>`);
	endObject();
	beginObject(pagesId);
	pushString(`<< /Type /Pages /Count ${pages.length} /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] >>`);
	endObject();
	for (let i = 0; i < pages.length; i += 1) {
		const { jpeg, width, height } = pages[i];
		beginObject(pageIds[i]);
		pushString(`<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${width} ${height}] /Resources << /XObject << /Im${i} ${imageIds[i]} 0 R >> /ProcSet [/PDF /ImageC] >> /Contents ${contentIds[i]} 0 R >>`);
		endObject();
		beginObject(imageIds[i]);
		pushString(`<< /Type /XObject /Subtype /Image /Width ${width} /Height ${height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpeg.length} >>\nstream\n`);
		pushBytes(jpeg);
		pushString(`\nendstream`);
		endObject();
		const op = `q ${width} 0 0 ${height} 0 0 cm /Im${i} Do Q`;
		const opBytes = enc.encode(op);
		beginObject(contentIds[i]);
		pushString(`<< /Length ${opBytes.length} >>\nstream\n`);
		pushBytes(opBytes);
		pushString(`\nendstream`);
		endObject();
	}
	const xrefOffset = cursor;
	const objectCount = 2 + pages.length * 3;
	pushString(`xref\n0 ${objectCount + 1}\n`);
	pushString("0000000000 65535 f \n");
	for (let i = 1; i <= objectCount; i += 1) pushString(`${(offsets[i] ?? 0).toString().padStart(10, "0")} 00000 n \n`);
	pushString(`trailer\n<< /Size ${objectCount + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`);
	const totalLen = chunks.reduce((sum, c) => sum + (typeof c === "string" ? enc.encode(c).length : c.length), 0);
	const out = new Uint8Array(totalLen);
	let p = 0;
	for (const c of chunks) if (typeof c === "string") {
		const b = enc.encode(c);
		out.set(b, p);
		p += b.length;
	} else {
		out.set(c, p);
		p += c.length;
	}
	return out;
}
//#endregion
//#region src/ui/media-inline.ts
var TRANSPARENT_GIF = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
/**
* Replace every `pptx-media://{hash}` URL in `svg` with a fully-
* inlined `data:` URL pulled from `media`. Hashes that aren't in the
* map fall back to a 1×1 transparent GIF — same defensive behaviour
* the live viewer uses.
*/
function inlineMediaAsDataUrls(svg, media) {
	if (svg.indexOf("pptx-media://") < 0) return svg;
	const cache = /* @__PURE__ */ new Map();
	return svg.replace(/pptx-media:\/\/([0-9a-f]+)/g, (_match, hash) => {
		let url = cache.get(hash);
		if (url !== void 0) return url;
		const blob = media.get(hash);
		if (!blob) {
			cache.set(hash, TRANSPARENT_GIF);
			return TRANSPARENT_GIF;
		}
		url = `data:${blob.mime};base64,${bytesToBase64(blob.bytes)}`;
		cache.set(hash, url);
		return url;
	});
}
/**
* Convert a `Uint8Array` to a base64 string without going through
* `String.fromCharCode(...bytes)` (which blows the JS argument
* stack at ~100 KB images on most engines).
*/
function bytesToBase64(bytes) {
	let binary = "";
	const chunkSize = 32768;
	for (let i = 0; i < bytes.length; i += chunkSize) {
		const chunk = bytes.subarray(i, i + chunkSize);
		binary += String.fromCharCode.apply(null, Array.from(chunk));
	}
	return btoa(binary);
}
//#endregion
//#region src/ui/print.ts
/**
* Open a new window containing each slide as a full-page SVG and
* trigger the browser's print dialog. Returns the opened window
* reference (or `null` when popups are blocked).
*
* Page orientation is auto-detected from the slide aspect ratio so
* portrait decks (e.g. A4-portrait reports rendered as PPTX) print
* upright instead of being squeezed into landscape paper.
*/
async function printDeck(slides, options = {}) {
	if (slides.length === 0) return null;
	const win = window.open("", "_blank", "width=1024,height=768");
	if (!win) return null;
	const orientation = detectOrientation(slides);
	const onProgress = options.onProgress ?? (() => {});
	const total = slides.length;
	const doc = win.document;
	doc.open();
	doc.write("<!doctype html><html><head>");
	doc.write(`<title>${escapeHtml(options.title ?? "slideglance slides")}</title>`);
	doc.write(`<style>
    @page { margin: 0; size: ${orientation}; }
    html, body { margin: 0; padding: 0; background: #fff; color: #000; }
    .pptx-page { page-break-after: always; display: flex; align-items: center; justify-content: center; height: 100vh; padding: 24px; box-sizing: border-box; }
    .pptx-page svg { max-width: 100%; max-height: 100%; }
    .pptx-page:last-child { page-break-after: auto; }
  </style>`);
	doc.write("</head><body>");
	doc.close();
	for (let i = 0; i < slides.length; i += 1) {
		onProgress({
			phase: "layout",
			current: i,
			total
		});
		const slide = slides[i];
		const wrapper = doc.createElement("div");
		wrapper.className = "pptx-page";
		const parsed = new DOMParser().parseFromString(slide.svg, "image/svg+xml");
		if (parsed.documentElement && parsed.documentElement.tagName.toLowerCase() !== "parsererror") wrapper.appendChild(doc.importNode(parsed.documentElement, true));
		doc.body.appendChild(wrapper);
		await new Promise((resolve) => setTimeout(resolve, 0));
	}
	onProgress({
		phase: "open-dialog",
		current: total,
		total
	});
	win.setTimeout(() => win.print(), 50);
	return win;
}
function detectOrientation(slides) {
	for (const slide of slides) {
		const aspect = parseSvgAspect(slide.svg);
		if (aspect != null) return aspect >= 1 ? "landscape" : "portrait";
	}
	return "landscape";
}
function parseSvgAspect(svg) {
	const m = /viewBox\s*=\s*"([^"]+)"/i.exec(svg) ?? /viewBox\s*=\s*'([^']+)'/i.exec(svg);
	if (m) {
		const parts = m[1].split(/\s+/).map(Number);
		const w = parts[2];
		const h = parts[3];
		if (w && h && w > 0 && h > 0) return w / h;
	}
	return null;
}
function escapeHtml(s) {
	return s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;");
}
//#endregion
//#region src/presentation/use-print-pdf-export.ts
/**
* `usePrintPdfExport` — extracts the print + PDF export handlers from
* the `PptxPresentation` component body.
*
* Both flows share the same shape:
* 1. show the centred progress overlay,
* 2. force every slide to render via `ensureAllSlidesRendered`,
* 3. inline media as data URIs (so the print window / PDF doesn't
*    fetch from the deck-scoped `pptx-media://` blob namespace),
* 4. invoke the underlying export utility,
* 5. dismiss the overlay (with a small grace period so the
*    "Opening print dialog…" / "Saving…" steps stay visible).
*
* Pulled out so the main component can stop carrying the ~110-line
* pair of `useCallback`s along with the rest of its state graph.
*/
function usePrintPdfExport(args) {
	const { name, ensureAllSlidesRendered, setProgress, setErrorMsg, setPhase } = args;
	return {
		handlePrint: useCallback(async () => {
			const printTitle = t("progress.titlePrint");
			setProgress({
				title: printTitle,
				step: t("phase.preparingPrint")
			});
			try {
				const slides = await ensureAllSlidesRendered(false, (current, total) => {
					setProgress({
						title: printTitle,
						step: t("phase.preparingSlideOf", {
							current,
							total
						}),
						current,
						total
					});
				});
				if (slides.length === 0) {
					setErrorMsg(t("status.nothingToPrint"));
					return;
				}
				await printDeck(slides.map((s) => ({
					...s,
					svg: inlineMediaAsDataUrls(s.svg, /* @__PURE__ */ new Map())
				})), {
					title: name ?? t("dialog.title"),
					onProgress: ({ phase: p, current, total }) => {
						setProgress({
							title: printTitle,
							step: p === "open-dialog" ? t("phase.openingPrintDialog") : t("phase.layingOutPrintOf", {
								current: current + 1,
								total
							}),
							current: p === "open-dialog" ? total : current + 1,
							total
						});
					}
				});
			} catch (err) {
				setErrorMsg(err.message ?? String(err));
			} finally {
				setTimeout(() => setProgress(null), 400);
			}
		}, [
			ensureAllSlidesRendered,
			name,
			setProgress,
			setErrorMsg
		]),
		handleExportPdf: useCallback(async () => {
			const pdfTitle = t("progress.titlePdf");
			setProgress({
				title: pdfTitle,
				step: t("phase.preparingPdf")
			});
			setPhase(t("phase.preparingPdf"));
			try {
				const slides = await ensureAllSlidesRendered(false, (current, total) => {
					setProgress({
						title: pdfTitle,
						step: t("phase.preparingSlideOf", {
							current,
							total
						}),
						current,
						total
					});
				});
				if (slides.length === 0) {
					setErrorMsg(t("status.nothingToExport"));
					return;
				}
				const bytes = await exportToPdf({
					slides: slides.map((s) => ({
						...s,
						svg: inlineMediaAsDataUrls(s.svg, /* @__PURE__ */ new Map())
					})),
					onProgress: ({ phase: p, current, total }) => {
						if (p === "rasterize") {
							setPhase(t("phase.renderingPdf", {
								current: current + 1,
								total
							}));
							setProgress({
								title: pdfTitle,
								step: t("phase.renderingPdf", {
									current: current + 1,
									total
								}),
								current: current + 1,
								total
							});
						} else {
							setPhase(t("phase.encodingPdf"));
							setProgress({
								title: pdfTitle,
								step: t("phase.encodingPdf"),
								current: total,
								total
							});
						}
					}
				});
				setProgress({
					title: pdfTitle,
					step: t("phase.savingPdf")
				});
				const blob = new Blob([bytes], { type: "application/pdf" });
				const url = URL.createObjectURL(blob);
				const a = document.createElement("a");
				a.href = url;
				a.download = `${(name ?? "presentation").replace(/\.[^.]+$/, "")}.pdf`;
				a.click();
				setTimeout(() => URL.revokeObjectURL(url), 4e3);
				setPhase(t("status.exported", { count: slides.length }));
			} catch (err) {
				setErrorMsg(t("status.pdfFailed", { reason: err.message ?? String(err) }));
			} finally {
				setTimeout(() => setPhase(""), 2e3);
				setTimeout(() => setProgress(null), 400);
			}
		}, [
			ensureAllSlidesRendered,
			name,
			setProgress,
			setErrorMsg,
			setPhase
		])
	};
}
//#endregion
//#region src/presentation/use-ruler-geometry.ts
/**
* `useRulerGeometry` — derive the slide's live position + size in
* stage-relative pixel coordinates so the [`Ruler`](../ui/Ruler.tsx)
* component can paint ticks that always align with the slide
* centre, regardless of zoom, pan, sidebar resize, or stage scroll.
*
* Mirrors the historic Lit shell, which tracked `slideRect()` via
* a ResizeObserver on the viewer-wrap. The hook owns:
* - the `intrinsicViewBox` derivation from the deck SVG's `viewBox`,
* - the live `rulerRect` state with a 0.5-pixel diff threshold so
*   sub-pixel jitter from CSS layout doesn't trigger a re-render,
* - the ResizeObserver + scroll listener wiring against the stage
*   and slide DOM nodes.
*/
function useRulerGeometry(args) {
	const { rulerOn, slideSvg, stageRef, slideRef } = args;
	const intrinsicViewBox = useMemo(() => {
		const m = slideSvg.match(/viewBox=["']([^"']+)["']/);
		if (!m) return {
			w: 0,
			h: 0
		};
		const parts = m[1].split(/\s+/).map(Number);
		if (parts.length < 4) return {
			w: 0,
			h: 0
		};
		return {
			w: parts[2],
			h: parts[3]
		};
	}, [slideSvg]);
	const intrinsic = {
		px: intrinsicViewBox.w,
		cm: intrinsicViewBox.w * 2.54 / 96
	};
	const intrinsicY = {
		px: intrinsicViewBox.h,
		cm: intrinsicViewBox.h * 2.54 / 96
	};
	const [rulerRect, setRulerRect] = useState({
		originX: 0,
		originY: 0,
		extentX: 0,
		extentY: 0
	});
	useEffect(() => {
		if (!rulerOn) return;
		const stage = stageRef.current;
		const slide = slideRef.current;
		if (!stage || !slide) return;
		const measure = () => {
			const stageRect = stage.getBoundingClientRect();
			const slideR = slide.getBoundingClientRect();
			if (slideR.width <= 0 || slideR.height <= 0) return;
			setRulerRect((prev) => {
				const next = {
					originX: slideR.left - stageRect.left,
					originY: slideR.top - stageRect.top,
					extentX: slideR.width,
					extentY: slideR.height
				};
				if (Math.abs(prev.originX - next.originX) < .5 && Math.abs(prev.originY - next.originY) < .5 && Math.abs(prev.extentX - next.extentX) < .5 && Math.abs(prev.extentY - next.extentY) < .5) return prev;
				return next;
			});
		};
		measure();
		const ro = new ResizeObserver(measure);
		ro.observe(stage);
		ro.observe(slide);
		const onScroll = () => measure();
		stage.addEventListener("scroll", onScroll, { passive: true });
		return () => {
			ro.disconnect();
			stage.removeEventListener("scroll", onScroll);
		};
	}, [
		rulerOn,
		args.slideW,
		args.slideH,
		args.panX,
		args.panY,
		args.stageW,
		args.stageH
	]);
	return {
		intrinsic,
		intrinsicY,
		rulerRect
	};
}
//#endregion
//#region src/presentation/use-selection-state-machine.ts
/**
* `useSelectionStateMachine` — pointer-based selection on the slide
* stage, plus everything that derives from the selection set.
*
* Responsibilities:
* - Pointer-down / move / up state machine that distinguishes click
*   vs. drag (≥3px movement = drag) and exposes the four
*   `onStage*` event handlers the host wires to its stage `<main>`.
* - Pan support when the host's `spaceHeld` flag is on (Space-held
*   drag is the standard PowerPoint convention).
* - Rubber-band hit-test that projects every cached bbox into
*   screen coords via the live `getScreenCTM()` and AABB-intersects
*   with the rubber-band rect.
* - Double-click → enter text-edit mode for shapes that contain
*   text.
* - Selection-bbox projection (`selectionBoxes`) into stage-relative
*   pixel coords, recomputed on every CTM change.
* - Authored-font derivation (`selectionFonts`) read straight off
*   the rendered SVG's `<tspan font-family="...">` chain.
* - Outside-click + selection-empty auto-close for the status-bar
*   font popover.
* - Rubber-band rect projection for the visual overlay.
*
* The host owns `selectedIds` / `rubberBand` state because the
* keyboard handler (Esc, Cmd+A, Cmd+C) also needs to mutate them;
* the hook accepts state setters and never closes over its own
* reducer state.
*/
function useSelectionStateMachine(args) {
	const { selectedIds, setSelectedIds, rubberBand, setRubberBand, textEditId, setTextEditId, spaceHeld, panX, panY, setPanX, setPanY, zoom, stageW, stageH, slideSvg, panStartRef, pointerDownAtRef, bboxMapRef, stageRef, slideRef, selectionFontsOpen, setSelectionFontsOpen, selectionFontsRef } = args;
	const onStagePointerDown = useCallback((ev) => {
		if (ev.button !== 0) return;
		if (textEditId) {
			if (ev.target?.closest(`[data-sp-id="${textEditId}"]`)) return;
			setTextEditId(null);
		}
		if (spaceHeld) {
			try {
				ev.target.setPointerCapture(ev.pointerId);
			} catch {}
			panStartRef.current = {
				x: ev.clientX,
				y: ev.clientY,
				panX,
				panY
			};
			return;
		}
		const target = ev.target?.closest("[data-sp-id]");
		pointerDownAtRef.current = {
			x: ev.clientX,
			y: ev.clientY,
			target
		};
		if (!target) setRubberBand(null);
	}, [
		spaceHeld,
		textEditId,
		setTextEditId,
		panX,
		panY,
		panStartRef,
		pointerDownAtRef,
		setRubberBand
	]);
	const onStagePointerMove = useCallback((ev) => {
		if (panStartRef.current) {
			setPanX(panStartRef.current.panX + (ev.clientX - panStartRef.current.x));
			setPanY(panStartRef.current.panY + (ev.clientY - panStartRef.current.y));
			return;
		}
		const downAt = pointerDownAtRef.current;
		if (!downAt) return;
		const dx = ev.clientX - downAt.x;
		const dy = ev.clientY - downAt.y;
		if (Math.hypot(dx, dy) < 3) return;
		if (!downAt.target) setRubberBand({
			x0: downAt.x,
			y0: downAt.y,
			x1: ev.clientX,
			y1: ev.clientY
		});
	}, [
		panStartRef,
		pointerDownAtRef,
		setPanX,
		setPanY,
		setRubberBand
	]);
	const onStagePointerUp = useCallback((ev) => {
		if (panStartRef.current) {
			try {
				ev.target.releasePointerCapture(ev.pointerId);
			} catch {}
			panStartRef.current = null;
			return;
		}
		const downAt = pointerDownAtRef.current;
		if (!downAt) return;
		const moved = Math.hypot(ev.clientX - downAt.x, ev.clientY - downAt.y) >= 3;
		if (downAt.target && !moved) {
			const id = downAt.target.dataset.spId;
			if (id) if (ev.shiftKey || ev.metaKey || ev.ctrlKey) setSelectedIds((prev) => {
				const next = new Set(prev);
				if (next.has(id)) next.delete(id);
				else next.add(id);
				return next;
			});
			else setSelectedIds(new Set([id]));
		} else if (!downAt.target && !moved) setSelectedIds(/* @__PURE__ */ new Set());
		else if (!downAt.target && moved && rubberBand) {
			const svgEl = slideRef.current?.firstElementChild;
			const ctm = svgEl?.getScreenCTM?.() ?? null;
			if (svgEl && ctm) {
				const hits = /* @__PURE__ */ new Set();
				const left = Math.min(rubberBand.x0, rubberBand.x1);
				const right = Math.max(rubberBand.x0, rubberBand.x1);
				const top = Math.min(rubberBand.y0, rubberBand.y1);
				const bottom = Math.max(rubberBand.y0, rubberBand.y1);
				const p = svgEl.createSVGPoint();
				for (const [id, b] of bboxMapRef.current) {
					const corners = [
						[b.x, b.y],
						[b.x + b.w, b.y],
						[b.x, b.y + b.h],
						[b.x + b.w, b.y + b.h]
					].map(([x, y]) => {
						p.x = x;
						p.y = y;
						return p.matrixTransform(ctm);
					});
					const xs = corners.map((c) => c.x);
					const ys = corners.map((c) => c.y);
					const rl = Math.min(...xs);
					const rr = Math.max(...xs);
					const rt = Math.min(...ys);
					const rb = Math.max(...ys);
					if (rr >= left && rl <= right && rb >= top && rt <= bottom) hits.add(id);
				}
				setSelectedIds(hits);
			}
		}
		pointerDownAtRef.current = null;
		setRubberBand(null);
	}, [
		rubberBand,
		panStartRef,
		pointerDownAtRef,
		bboxMapRef,
		slideRef,
		setSelectedIds,
		setRubberBand
	]);
	const onStageDoubleClick = useCallback((ev) => {
		const target = ev.target?.closest("[data-sp-id]");
		if (!target) return;
		if (!target.querySelector("text")) return;
		const id = target.dataset.spId;
		if (id) setTextEditId(id);
	}, [setTextEditId]);
	const [selectionBoxes, setSelectionBoxes] = useState([]);
	useLayoutEffect(() => {
		if (selectedIds.size === 0) {
			setSelectionBoxes([]);
			return;
		}
		const stage = stageRef.current;
		const svgEl = slideRef.current?.firstElementChild;
		if (!stage || !svgEl) {
			setSelectionBoxes([]);
			return;
		}
		const ctm = svgEl.getScreenCTM?.();
		if (!ctm) {
			setSelectionBoxes([]);
			return;
		}
		const stageRect = stage.getBoundingClientRect();
		const scrollLeft = stage.scrollLeft;
		const scrollTop = stage.scrollTop;
		const out = [];
		const p = svgEl.createSVGPoint();
		for (const id of selectedIds) {
			const b = bboxMapRef.current.get(id);
			if (!b) continue;
			const corners = [
				[b.x, b.y],
				[b.x + b.w, b.y],
				[b.x, b.y + b.h],
				[b.x + b.w, b.y + b.h]
			].map(([x, y]) => {
				p.x = x;
				p.y = y;
				return p.matrixTransform(ctm);
			});
			const xs = corners.map((c) => c.x);
			const ys = corners.map((c) => c.y);
			out.push({
				id,
				x: Math.min(...xs) - stageRect.left + scrollLeft,
				y: Math.min(...ys) - stageRect.top + scrollTop,
				w: Math.max(...xs) - Math.min(...xs),
				h: Math.max(...ys) - Math.min(...ys)
			});
		}
		setSelectionBoxes(out);
	}, [
		selectedIds,
		panX,
		panY,
		zoom,
		stageW,
		stageH,
		slideSvg
	]);
	const selectionFonts = useMemo(() => {
		if (selectedIds.size === 0) return [];
		const svgEl = slideRef.current?.firstElementChild;
		if (!svgEl) return [];
		const fonts = /* @__PURE__ */ new Set();
		for (const id of selectedIds) {
			const host = svgEl.querySelector(`g[data-sp-id="${id}"]`);
			if (!host) continue;
			const nodes = host.querySelectorAll("tspan, text");
			for (const node of nodes) {
				const family = node.getAttribute("font-family");
				if (!family) continue;
				const first = parseFirstFontFamily(family);
				if (first) fonts.add(first);
			}
		}
		return Array.from(fonts);
	}, [selectedIds, slideSvg]);
	useEffect(() => {
		if (selectionFonts.length === 0 && selectionFontsOpen) setSelectionFontsOpen(false);
	}, [
		selectionFonts,
		selectionFontsOpen,
		setSelectionFontsOpen
	]);
	useEffect(() => {
		if (!selectionFontsOpen) return;
		function onDocClick(ev) {
			const root = selectionFontsRef.current;
			if (root && !root.contains(ev.target)) setSelectionFontsOpen(false);
		}
		document.addEventListener("mousedown", onDocClick);
		return () => document.removeEventListener("mousedown", onDocClick);
	}, [
		selectionFontsOpen,
		selectionFontsRef,
		setSelectionFontsOpen
	]);
	return {
		onStagePointerDown,
		onStagePointerMove,
		onStagePointerUp,
		onStageDoubleClick,
		selectionBoxes,
		selectionFonts,
		rubberBandRect: useMemo(() => {
			if (!rubberBand) return null;
			const stage = stageRef.current;
			if (!stage) return null;
			const r = stage.getBoundingClientRect();
			const left = Math.min(rubberBand.x0, rubberBand.x1) - r.left + stage.scrollLeft;
			const top = Math.min(rubberBand.y0, rubberBand.y1) - r.top + stage.scrollTop;
			const right = Math.max(rubberBand.x0, rubberBand.x1) - r.left + stage.scrollLeft;
			const bottom = Math.max(rubberBand.y0, rubberBand.y1) - r.top + stage.scrollTop;
			return {
				x: left,
				y: top,
				w: right - left,
				h: bottom - top
			};
		}, [rubberBand, stageRef])
	};
}
//#endregion
//#region src/presentation/use-slide-cache.ts
/**
* `useSlideCache` — slide rendering + caching pipeline.
*
* Owns:
* - The `slideCache: Map<slide#, CachedSlide>` plus its setter (the
*   keyboard / print / pdf / sectionNav callers all need read
*   access; the setter is exposed so the host's deck-loader can
*   flush it on a deck swap).
* - `pendingRef` — in-flight `requestSlide` tasks deduplicated by
*   slide number so a rapid keyboard repeat or sidebar hover doesn't
*   fire N IPC roundtrips for the same slide.
* - `requestSlide(slide)` — cache-or-fetch path. Inlines media as
*   `data:` URLs (not `blob:`) so the SVG is portable and never
*   revokes underneath print / PDF.
* - `ensureAllSlidesRendered(silent, onProgress)` — force-render
*   every slide. Used by Print / PDF / Search and by the background
*   prefetch.
*
* Plus two effects:
* - **Background prefetch** — once a deck is open, walk every slide
*   in the background so deck-wide actions stop showing partial
*   output. Skipped when the host sets `noPrefetch`.
* - **Active slide fetch** — request the visible slide when
*   `currentSlide` changes.
*
* Stale-resolution handling: every task captures `deckEpochRef`'s
* current value when it starts; if the epoch advances mid-flight
* (deck swap), the resolution is dropped before it stamps the new
* deck's cache. Without this, a deck swap during a slow render
* leaves the *previous* deck's SVG in the new cache slot.
*/
function useSlideCache(args) {
	const { controller, slideCount, currentSlide, noPrefetch, resolveMeta, allSlidesReady, setAllSlidesReady, setErrorMsg, setPhase, deckEpochRef, pendingRef } = args;
	const [slideCache, setSlideCache] = useState(() => /* @__PURE__ */ new Map());
	const requestSlide = useCallback(async (slide) => {
		if (!controller || slide < 1) return null;
		const myEpoch = deckEpochRef.current;
		let cached;
		setSlideCache((prev) => {
			cached = prev.get(slide);
			return prev;
		});
		if (cached) return cached;
		const inflight = pendingRef.current.get(slide);
		if (inflight) return inflight;
		const task = (async () => {
			try {
				const rendered = await controller.renderSlide(slide);
				if (myEpoch !== deckEpochRef.current) return null;
				const result = rendered.media && rendered.media.size > 0 ? {
					svg: inlineMediaAsDataUrls(rendered.svg, rendered.media),
					blobUrls: []
				} : {
					svg: rendered.svg,
					blobUrls: []
				};
				const inlineMeta = {
					notes: rendered.notes,
					layout_name: rendered.layoutName,
					section_name: rendered.sectionName
				};
				let mergedMeta = inlineMeta;
				if (resolveMeta) try {
					const extra = await resolveMeta(slide);
					if (extra) mergedMeta = {
						...inlineMeta,
						...extra
					};
				} catch {}
				if (myEpoch !== deckEpochRef.current) return null;
				const entry = {
					svg: result.svg,
					preparedSvg: prepareSvg(result.svg),
					blobUrls: result.blobUrls,
					meta: mergedMeta
				};
				setSlideCache((prev) => {
					if (myEpoch !== deckEpochRef.current) return prev;
					if (prev.get(slide)) {
						for (const u of entry.blobUrls) URL.revokeObjectURL(u);
						return prev;
					}
					const next = new Map(prev);
					next.set(slide, entry);
					return next;
				});
				return entry;
			} catch (err) {
				setErrorMsg(`${err.message ?? err}`);
				return null;
			} finally {
				pendingRef.current.delete(slide);
			}
		})();
		pendingRef.current.set(slide, task);
		return task;
	}, [
		controller,
		resolveMeta,
		deckEpochRef,
		pendingRef,
		setErrorMsg
	]);
	const ensureAllSlidesRendered = useCallback(async (silent = false, onProgress) => {
		if (!controller || slideCount === 0) return [];
		const out = [];
		for (let n = 1; n <= slideCount; n += 1) {
			if (!silent) setPhase(t("phase.preparingSlideOf", {
				current: n,
				total: slideCount
			}));
			onProgress?.(n, slideCount);
			const cached = await requestSlide(n);
			if (!cached) continue;
			out.push({
				slide_number: n,
				svg: cached.svg,
				notes: cached.meta.notes ?? void 0,
				layout_name: cached.meta.layout_name ?? void 0,
				section_name: cached.meta.section_name ?? void 0
			});
		}
		if (!silent) setPhase("");
		if (out.length === slideCount) setAllSlidesReady(true);
		return out;
	}, [
		controller,
		slideCount,
		requestSlide,
		setPhase,
		setAllSlidesReady
	]);
	useEffect(() => {
		if (noPrefetch) return;
		if (!controller || slideCount === 0) return;
		if (allSlidesReady) return;
		let cancelled = false;
		(async () => {
			try {
				await ensureAllSlidesRendered(true);
			} catch {}
			if (cancelled) return;
		})();
		return () => {
			cancelled = true;
		};
	}, [
		noPrefetch,
		controller,
		slideCount,
		allSlidesReady,
		ensureAllSlidesRendered
	]);
	useEffect(() => {
		if (!controller || slideCount === 0) return;
		requestSlide(currentSlide);
	}, [
		controller,
		slideCount,
		currentSlide,
		requestSlide,
		slideCache
	]);
	return {
		slideCache,
		setSlideCache,
		requestSlide,
		ensureAllSlidesRendered
	};
}
//#endregion
//#region src/presentation/use-slide-dom-mount.ts
/**
* `useSlideDomMount` — imperatively mount the active slide's SVG
* into the slide-host `<div>` and rebuild the bbox cache used by
* the selection state machine.
*
* Why imperative: React's reconciler can't safely round-trip an SVG
* through string → DOM tree → React vnodes without breaking the
* `getBoundingClientRect()` invariants the selection layer relies
* on. We use `DOMParser` + `importNode` so the mounted SVG carries
* the real layout state the browser computed, and we re-namespace
* every `id="…"` so the main stage's SVG can't collide with the
* sibling thumbnails the sidebar mounts at the same time.
*
* The bbox cache is built from `getBoundingClientRect()` →
* `inverse(getScreenCTM())` rather than `getBBox()`. Group bboxes
* are unreliable for `<text>` runs whose width depends on font
* substitution; the rendered-geometry path always matches what the
* user sees on screen.
*/
function useSlideDomMount(args) {
	const { slideSvg, currentSlide, slideshow, slideRef, slideshowSlideRef, bboxMapRef, onReadyFiredRef, onReady, setErrorMsg } = args;
	const prevSlideRef = useRef(0);
	useEffect(() => {
		const host = slideshow ? slideshowSlideRef.current : slideRef.current;
		if (!host) return;
		if (!slideSvg) {
			const sameSlide = prevSlideRef.current === currentSlide;
			const hasContent = host.firstChild !== null;
			if (sameSlide && hasContent) return;
			while (host.firstChild) host.removeChild(host.firstChild);
			return;
		}
		const existing = host.firstElementChild;
		if (existing && existing.tagName.toLowerCase() === "svg" && host.dataset.slideSvgKey === slideSvg) return;
		try {
			const namespaced = uniquifyIds(slideSvg, `stage-s${currentSlide}`);
			const root = new DOMParser().parseFromString(namespaced, "image/svg+xml").documentElement;
			if (!root) return;
			const errNode = root.querySelector("parsererror");
			if (errNode) {
				setErrorMsg(errNode.textContent ?? "svg parse error");
				return;
			}
			const incoming = document.importNode(root, true);
			host.replaceChildren(incoming);
			host.dataset.slideSvgKey = slideSvg;
			prevSlideRef.current = currentSlide;
			if (!onReadyFiredRef.current) {
				onReadyFiredRef.current = true;
				try {
					onReady?.();
				} catch {}
			}
			const map = /* @__PURE__ */ new Map();
			const svgEl = host.firstElementChild;
			const screenCTM = svgEl?.getScreenCTM?.() ?? null;
			if (svgEl && screenCTM && typeof svgEl.createSVGPoint === "function") {
				let inverse = null;
				try {
					inverse = screenCTM.inverse();
				} catch {
					inverse = null;
				}
				if (inverse) {
					const els = svgEl.querySelectorAll("[data-sp-id]");
					for (const el of Array.from(els)) {
						const id = el.dataset.spId;
						if (!id) continue;
						const rect = el.getBoundingClientRect();
						if (rect.width === 0 && rect.height === 0) continue;
						const p = svgEl.createSVGPoint();
						const corners = [
							[rect.left, rect.top],
							[rect.right, rect.top],
							[rect.left, rect.bottom],
							[rect.right, rect.bottom]
						].map(([x, y]) => {
							p.x = x;
							p.y = y;
							return p.matrixTransform(inverse);
						});
						const xs = corners.map((c) => c.x);
						const ys = corners.map((c) => c.y);
						const minX = Math.min(...xs);
						const maxX = Math.max(...xs);
						const minY = Math.min(...ys);
						const maxY = Math.max(...ys);
						map.set(id, {
							x: minX,
							y: minY,
							w: maxX - minX,
							h: maxY - minY
						});
					}
				}
			}
			bboxMapRef.current = map;
		} catch (err) {
			setErrorMsg(`${err.message ?? err}`);
		}
	}, [
		slideSvg,
		currentSlide,
		args.sidebarWidth,
		args.notesOpen,
		args.viewMode,
		slideshow,
		args.stageW,
		args.stageH
	]);
}
//#endregion
//#region src/presentation/use-wheel-zoom-nav.ts
/**
* `useWheelZoomNav` — wheel + pinch handler installed on the slide
* stage. Two flavours of intent are dispatched off the same event:
*
* - **Zoom** (Ctrl/Cmd-wheel, pinch). The browser delivers pinch as
*   a synthetic `wheel` with `ctrlKey=true` so the same path covers
*   trackpad pinch and key-modified scroll wheels. Deltas accumulate
*   inside a single rAF tick so a fast pinch-zoom doesn't fire a
*   `setZoom` per event.
* - **Slide nav** (plain wheel). Native scroll handles in-slide
*   panning until the user hits the top / bottom edge, after which
*   wheel travel above `BOUNDARY_THRESHOLD` commits to the next /
*   previous slide. A `COOLDOWN_MS` window swallows subsequent wheel
*   events to absorb macOS trackpad inertia tails.
*
* Constants tuned conservatively: the historic Lit shell used
* 1.1/0.9 step factors that felt jumpy on trackpads. The
* exponential `factor = exp(-delta * SENSITIVITY)` form gives the
* same perceived speed as a Cmd-wheel "click" while making pinch
* proportional and decoupling line / page / pixel deltaModes from
* the threshold constant.
*/
var ZOOM_MIN$1 = .25;
var ZOOM_MAX$1 = 8;
var SENSITIVITY = .0035;
var BOUNDARY_THRESHOLD = 240;
var COOLDOWN_MS = 350;
var RESET_AFTER_MS = 250;
function clamp$1(value, min, max) {
	return Math.max(min, Math.min(max, value));
}
function useWheelZoomNav(args) {
	const { stageRef, slideshow, viewMode, slideCount, setZoom, setCurrentSlide } = args;
	useEffect(() => {
		const stage = stageRef.current;
		if (!stage) return;
		let pendingZoomDelta = 0;
		let raf = 0;
		let boundaryDelta = 0;
		let lastWheelAt = 0;
		let cooldownUntil = 0;
		const flushZoom = () => {
			raf = 0;
			if (pendingZoomDelta === 0) return;
			const factor = Math.exp(-pendingZoomDelta * SENSITIVITY);
			pendingZoomDelta = 0;
			setZoom((z) => clamp$1(z * factor, ZOOM_MIN$1, ZOOM_MAX$1));
		};
		const onWheel = (ev) => {
			let dy = ev.deltaY;
			if (ev.deltaMode === 1) dy *= 16;
			else if (ev.deltaMode === 2) dy *= stage.clientHeight;
			if (ev.ctrlKey || ev.metaKey) {
				ev.preventDefault();
				pendingZoomDelta += dy;
				if (raf === 0) raf = requestAnimationFrame(flushZoom);
				return;
			}
			if (slideshow) return;
			if (viewMode !== "normal") return;
			if (slideCount <= 0) return;
			const now = performance.now();
			if (now < cooldownUntil) {
				ev.preventDefault();
				return;
			}
			if (now - lastWheelAt > RESET_AFTER_MS) boundaryDelta = 0;
			lastWheelAt = now;
			const atBottom = stage.scrollTop + stage.clientHeight >= stage.scrollHeight - 1;
			const atTop = stage.scrollTop <= 0;
			if (dy > 0) {
				if (!atBottom) {
					boundaryDelta = 0;
					return;
				}
				ev.preventDefault();
				boundaryDelta = Math.max(0, boundaryDelta) + dy;
				if (boundaryDelta >= BOUNDARY_THRESHOLD) {
					boundaryDelta = 0;
					cooldownUntil = now + COOLDOWN_MS;
					setCurrentSlide((s) => Math.min(slideCount, s + 1));
				}
			} else if (dy < 0) {
				if (!atTop) {
					boundaryDelta = 0;
					return;
				}
				ev.preventDefault();
				boundaryDelta = Math.min(0, boundaryDelta) + dy;
				if (boundaryDelta <= -240) {
					boundaryDelta = 0;
					cooldownUntil = now + COOLDOWN_MS;
					setCurrentSlide((s) => Math.max(1, s - 1));
				}
			}
		};
		stage.addEventListener("wheel", onWheel, { passive: false });
		return () => {
			stage.removeEventListener("wheel", onWheel);
			if (raf !== 0) cancelAnimationFrame(raf);
		};
	}, [
		stageRef,
		slideshow,
		viewMode,
		slideCount,
		setZoom,
		setCurrentSlide
	]);
}
//#endregion
//#region src/ui/Ruler.tsx
function Ruler(props) {
	const { orientation, unit, slideOriginPx, slideExtentPx, slideExtentCm, slideIntrinsicPx, className, style } = props;
	const hostRef = useRef(null);
	const canvasRef = useRef(null);
	useEffect(() => {
		const host = hostRef.current;
		const canvas = canvasRef.current;
		if (!host || !canvas) return;
		const draw = () => {
			drawRuler(canvas, host, {
				orientation,
				unit,
				slideOriginPx,
				slideExtentPx,
				slideExtentCm,
				slideIntrinsicPx
			});
		};
		draw();
		const ro = new ResizeObserver(draw);
		ro.observe(host);
		return () => ro.disconnect();
	}, [
		orientation,
		unit,
		slideOriginPx,
		slideExtentPx,
		slideExtentCm,
		slideIntrinsicPx
	]);
	return /* @__PURE__ */ jsx("div", {
		ref: hostRef,
		className,
		style: {
			...rulerHostStyle,
			...style
		},
		children: /* @__PURE__ */ jsx("canvas", {
			ref: canvasRef,
			style: canvasStyle
		})
	});
}
function drawRuler(canvas, host, geom) {
	const dpr = window.devicePixelRatio || 1;
	const cssWidth = host.clientWidth;
	const cssHeight = host.clientHeight;
	if (cssWidth <= 0 || cssHeight <= 0) return;
	canvas.width = Math.round(cssWidth * dpr);
	canvas.height = Math.round(cssHeight * dpr);
	const ctx = canvas.getContext("2d");
	if (!ctx) return;
	ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
	ctx.clearRect(0, 0, cssWidth, cssHeight);
	const isHoriz = geom.orientation === "horizontal";
	const rulerThickness = isHoriz ? cssHeight : cssWidth;
	const slideStart = geom.slideOriginPx;
	const slideExtent = geom.slideExtentPx;
	if (slideExtent <= 0) return;
	const slideEnd = slideStart + slideExtent;
	const fg = getComputedStyle(host).color || "#888";
	const fgFaint = "rgba(127, 127, 127, 0.55)";
	const visibleStart = Math.max(0, slideStart);
	const visibleEnd = Math.min(isHoriz ? cssWidth : cssHeight, slideEnd);
	if (visibleEnd > visibleStart) {
		ctx.fillStyle = "rgba(127, 127, 127, 0.10)";
		if (isHoriz) ctx.fillRect(visibleStart, 0, visibleEnd - visibleStart, rulerThickness);
		else ctx.fillRect(0, visibleStart, rulerThickness, visibleEnd - visibleStart);
	}
	ctx.strokeStyle = fg;
	ctx.fillStyle = fg;
	ctx.font = "10px system-ui, sans-serif";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.lineWidth = 1;
	if (geom.unit === "cm") drawCm(ctx, isHoriz, rulerThickness, slideStart, slideEnd, geom, fg, fgFaint);
	else drawPx(ctx, isHoriz, rulerThickness, slideStart, slideEnd, geom, fg, fgFaint);
}
function drawCm(ctx, isHoriz, rulerThickness, slideStart, slideEnd, geom, fg, fgFaint) {
	const slideExtent = slideEnd - slideStart;
	const slideCm = geom.slideExtentCm;
	if (slideExtent <= 0 || slideCm <= 0) return;
	const pxPerCm = slideExtent / slideCm;
	const slideCenter = slideStart + slideExtent / 2;
	const halfMaxCm = slideCm / 2;
	const showMicro = pxPerCm >= 60;
	const drawTickAt = (cm, kind) => {
		if (Math.abs(cm) > halfMaxCm + .001) return;
		const pos = slideCenter + cm * pxPerCm;
		if (pos < slideStart - 1 || pos > slideEnd + 1) return;
		const tickLen = kind === "major" ? rulerThickness * .55 : kind === "half" ? rulerThickness * .35 : rulerThickness * .2;
		ctx.strokeStyle = kind === "micro" ? fgFaint : fg;
		ctx.beginPath();
		if (isHoriz) {
			ctx.moveTo(pos + .5, rulerThickness);
			ctx.lineTo(pos + .5, rulerThickness - tickLen);
		} else {
			ctx.moveTo(rulerThickness, pos + .5);
			ctx.lineTo(rulerThickness - tickLen, pos + .5);
		}
		ctx.stroke();
		if (kind === "major" && Math.abs(cm) > 0) {
			const label = String(Math.round(Math.abs(cm)));
			ctx.fillStyle = fg;
			if (isHoriz) ctx.fillText(label, pos, rulerThickness * .32);
			else {
				ctx.save();
				ctx.translate(rulerThickness * .32, pos);
				ctx.rotate(-Math.PI / 2);
				ctx.fillText(label, 0, 0);
				ctx.restore();
			}
		}
	};
	const totalSteps = Math.ceil(halfMaxCm * 10) + 1;
	for (let dirSign = -1; dirSign <= 1; dirSign += 2) for (let i = 0; i <= totalSteps; i += 1) {
		if (dirSign === -1 && i === 0) continue;
		const cm = i * .1 * dirSign;
		const cmAbs = Math.abs(cm);
		const isMajor = Math.abs(cmAbs - Math.round(cmAbs)) < .001;
		const isHalf = !isMajor && Math.abs(cmAbs * 2 - Math.round(cmAbs * 2)) < .001;
		if (!isMajor && !isHalf && !showMicro) continue;
		drawTickAt(cm, isMajor ? "major" : isHalf ? "half" : "micro");
	}
	ctx.fillStyle = fg;
	if (isHoriz) ctx.fillText("0", slideCenter, rulerThickness * .32);
	else {
		ctx.save();
		ctx.translate(rulerThickness * .32, slideCenter);
		ctx.rotate(-Math.PI / 2);
		ctx.fillText("0", 0, 0);
		ctx.restore();
	}
}
function drawPx(ctx, isHoriz, rulerThickness, slideStart, slideEnd, geom, fg, fgFaint) {
	const visualExtent = slideEnd - slideStart;
	const intrinsicTotal = geom.slideIntrinsicPx;
	if (visualExtent <= 0 || intrinsicTotal <= 0) return;
	const pxPerUnit = visualExtent / intrinsicTotal;
	const stepUnits = niceStep(80 / pxPerUnit);
	const minorStepUnits = stepUnits / 5;
	const drawTick = (vUnits, isMajor) => {
		const pos = slideStart + vUnits * pxPerUnit;
		if (pos < slideStart - 1 || pos > slideEnd + 1) return;
		const tickLen = isMajor ? rulerThickness * .55 : rulerThickness * .25;
		ctx.strokeStyle = isMajor ? fg : fgFaint;
		ctx.beginPath();
		if (isHoriz) {
			ctx.moveTo(pos + .5, rulerThickness);
			ctx.lineTo(pos + .5, rulerThickness - tickLen);
		} else {
			ctx.moveTo(rulerThickness, pos + .5);
			ctx.lineTo(rulerThickness - tickLen, pos + .5);
		}
		ctx.stroke();
		if (isMajor) {
			const label = String(Math.round(vUnits));
			ctx.fillStyle = fg;
			if (isHoriz) ctx.fillText(label, pos, rulerThickness * .32);
			else {
				ctx.save();
				ctx.translate(rulerThickness * .32, pos);
				ctx.rotate(-Math.PI / 2);
				ctx.fillText(label, 0, 0);
				ctx.restore();
			}
		}
	};
	const totalMinors = Math.round(intrinsicTotal / minorStepUnits);
	for (let i = 0; i <= totalMinors; i += 1) {
		const v = i * minorStepUnits;
		drawTick(v, Math.abs(v % stepUnits) < .001 * stepUnits);
	}
}
function niceStep(n) {
	if (n <= 0) return 1;
	const base = Math.pow(10, Math.floor(Math.log10(n)));
	const norm = n / base;
	let nice;
	if (norm < 1.5) nice = 1;
	else if (norm < 3) nice = 2;
	else if (norm < 7) nice = 5;
	else nice = 10;
	return nice * base;
}
var rulerHostStyle = {
	display: "block",
	width: "100%",
	height: "100%",
	background: "var(--pptx-shell-status-bg, #1f1f23)",
	color: "var(--pptx-shell-status, #888)",
	boxSizing: "border-box",
	overflow: "hidden",
	pointerEvents: "none",
	userSelect: "none"
};
var canvasStyle = {
	display: "block",
	width: "100%",
	height: "100%"
};
//#endregion
//#region src/ui/settings.ts
/**
* Persistent viewer settings.
*
* The settings object is stored in `localStorage` under
* {@link STORAGE_KEY}. Every property has a built-in default so a
* brand-new install or a wiped browser still produces a valid,
* fully-functional viewer state. Future settings should be added to
* the {@link ViewerSettings} interface and {@link DEFAULT_SETTINGS}
* registry — the load() / save() / subscribe() machinery picks them
* up automatically.
*
* Why a hand-rolled subscriber list instead of using a Lit reactive
* controller? The settings store is shared across multiple
* components (the presentation shell, the settings dialog, theme
* helpers) and must work outside any Lit element too — e.g. when
* the host page wants to read the persisted theme synchronously
* before mounting the viewer.
*/
/** localStorage key under which the settings JSON is persisted. */
var STORAGE_KEY = "slideglance-viewer-settings:v1";
/** Clamp `width` to the supported sidebar range. */
function clampSidebarWidth(width) {
	if (!Number.isFinite(width)) return 220;
	return Math.max(140, Math.min(480, Math.round(width)));
}
/** Defaults applied when no value is found in storage. */
var DEFAULT_SETTINGS = Object.freeze({
	themeMode: "auto",
	showRuler: true,
	rulerUnit: "px",
	locale: "auto",
	sidebarWidth: 220
});
var listeners = /* @__PURE__ */ new Set();
var cached = null;
/**
* Read the persisted settings. Reads from `localStorage` once, then
* memoizes — subsequent calls are O(1) until a `save()` invalidates
* the cache.
*/
function loadSettings() {
	if (cached) return cached;
	cached = readFromStorage();
	setLocale(cached.locale);
	return cached;
}
/**
* Persist a partial update. Triggers every subscriber registered via
* {@link subscribeSettings}. Storage failures (private mode, quota,
* disabled localStorage) are swallowed — the in-memory copy still
* updates so the current session reflects the change even if the
* persistence layer is unavailable.
*/
function saveSettings(patch) {
	const next = {
		...loadSettings(),
		...patch
	};
	cached = next;
	try {
		if (typeof localStorage !== "undefined") localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
	} catch {}
	if (patch.locale !== void 0) setLocale(next.locale);
	for (const listener of listeners) try {
		listener(next);
	} catch {}
	return next;
}
/**
* Subscribe to settings changes. Returns a teardown function that
* removes the listener.
*/
function subscribeSettings(cb) {
	listeners.add(cb);
	return () => listeners.delete(cb);
}
function readFromStorage() {
	if (typeof localStorage === "undefined") return { ...DEFAULT_SETTINGS };
	let raw = null;
	try {
		raw = localStorage.getItem(STORAGE_KEY);
	} catch {
		return { ...DEFAULT_SETTINGS };
	}
	if (!raw) return { ...DEFAULT_SETTINGS };
	try {
		const parsed = JSON.parse(raw);
		const merged = {
			...DEFAULT_SETTINGS,
			...parsed
		};
		merged.sidebarWidth = clampSidebarWidth(merged.sidebarWidth);
		return merged;
	} catch {
		return { ...DEFAULT_SETTINGS };
	}
}
//#endregion
//#region src/ui/SettingsDialog.tsx
var LOCALE_DISPLAY_NAMES = {
	en: "English",
	ko: "한국어",
	ja: "日本語",
	"zh-CN": "简体中文",
	"zh-TW": "繁體中文",
	es: "Español",
	fr: "Français",
	de: "Deutsch"
};
/**
* Modal settings panel — React port of `<pptx-settings-dialog>`.
*
* Reads/writes to the persistent settings store so changes survive
* across sessions. Every interaction commits immediately (no
* separate Save button), matching macOS / Windows preferences
* conventions.
*/
function SettingsDialog(props) {
	const { open, onClose, appName = "SlideGlance", appVersion = "0.1.3", npmPackage = "@slideglance/viewer", engineCrate = "slideglance-wasm", repositoryUrl = "https://github.com/SlideGlance/slideglance", copyrightHolder = "SimpleCORE Inc.", copyrightYear = String((/* @__PURE__ */ new Date()).getUTCFullYear()), developer = "Taehwan Kwag", appIcon, onSettingsChange } = props;
	const [settings, setSettings] = useState(() => loadSettings());
	const [, setLocaleTick] = useState(0);
	useEffect(() => {
		return subscribeLocale(() => setLocaleTick((n) => n + 1));
	}, []);
	useEffect(() => {
		if (!open) return;
		const onKey = (ev) => {
			if (ev.key === "Escape") {
				ev.preventDefault();
				onClose();
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open, onClose]);
	const updateSetting = useCallback((key, value) => {
		const next = saveSettings({ [key]: value });
		setSettings(next);
		onSettingsChange?.(next);
	}, [onSettingsChange]);
	if (!open) return null;
	const themeOptions = [
		{
			value: "auto",
			label: t("dialog.themeAuto"),
			desc: t("dialog.themeAutoDesc")
		},
		{
			value: "light",
			label: t("dialog.themeLight"),
			desc: t("dialog.themeLightDesc")
		},
		{
			value: "dark",
			label: t("dialog.themeDark"),
			desc: t("dialog.themeDarkDesc")
		},
		{
			value: "high-contrast",
			label: t("dialog.themeHighContrast"),
			desc: t("dialog.themeHighContrastDesc")
		}
	];
	const localeOptions = [{
		value: "auto",
		label: t("dialog.languageAuto", { detected: LOCALE_DISPLAY_NAMES[getDetectedLocale()] })
	}, ...SUPPORTED_LOCALES.map((code) => ({
		value: code,
		label: LOCALE_DISPLAY_NAMES[code]
	}))];
	return /* @__PURE__ */ jsxs("div", {
		style: hostStyle$1,
		role: "presentation",
		children: [/* @__PURE__ */ jsx("div", {
			style: backdropStyle$1,
			onClick: onClose
		}), /* @__PURE__ */ jsxs("div", {
			style: panelStyle$1,
			role: "dialog",
			"aria-modal": "true",
			"aria-label": t("dialog.viewerSettingsAriaLabel"),
			children: [
				/* @__PURE__ */ jsxs("header", {
					style: headerStyle$1,
					children: [
						/* @__PURE__ */ jsx("h2", {
							style: titleStyle$1,
							children: t("dialog.title")
						}),
						/* @__PURE__ */ jsx("div", { style: { flex: 1 } }),
						/* @__PURE__ */ jsx("button", {
							style: closeButtonStyle,
							onClick: onClose,
							title: t("common.close"),
							children: "✕"
						})
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					style: bodyStyle$1,
					children: [
						/* @__PURE__ */ jsxs(Section, {
							label: t("dialog.appearance"),
							children: [/* @__PURE__ */ jsx(Row, {
								label: t("dialog.theme"),
								desc: t("dialog.themeDesc")
							}), /* @__PURE__ */ jsx(RadioGrid, {
								ariaLabel: t("dialog.theme"),
								options: themeOptions.map((opt) => ({
									value: opt.value,
									label: opt.label,
									desc: opt.desc
								})),
								selected: settings.themeMode,
								onSelect: (value) => updateSetting("themeMode", value)
							})]
						}),
						/* @__PURE__ */ jsxs(Section, {
							label: t("dialog.language"),
							children: [/* @__PURE__ */ jsx(Row, {
								label: t("dialog.language"),
								desc: t("dialog.languageDesc")
							}), /* @__PURE__ */ jsx(RadioGrid, {
								ariaLabel: t("dialog.language"),
								options: localeOptions.map((opt) => ({
									value: opt.value,
									label: opt.label
								})),
								selected: settings.locale,
								onSelect: (value) => updateSetting("locale", value)
							})]
						}),
						/* @__PURE__ */ jsxs(Section, {
							label: t("dialog.ruler"),
							children: [
								/* @__PURE__ */ jsxs("label", {
									style: checkboxRowStyle,
									children: [/* @__PURE__ */ jsx("input", {
										type: "checkbox",
										checked: settings.showRuler,
										onChange: (e) => updateSetting("showRuler", e.target.checked)
									}), t("dialog.rulerShow")]
								}),
								/* @__PURE__ */ jsx(Row, {
									label: t("dialog.rulerUnitLabel"),
									desc: t("dialog.rulerUnitDesc"),
									style: { marginTop: 6 }
								}),
								/* @__PURE__ */ jsx(RadioGrid, {
									ariaLabel: t("dialog.rulerUnitLabel"),
									disabled: !settings.showRuler,
									options: ["cm", "px"].map((u) => ({
										value: u,
										label: u === "cm" ? t("dialog.rulerUnitCm") : t("dialog.rulerUnitPx"),
										desc: u === "cm" ? t("dialog.rulerUnitCmDesc") : t("dialog.rulerUnitPxDesc")
									})),
									selected: settings.rulerUnit,
									onSelect: (value) => updateSetting("rulerUnit", value)
								})
							]
						}),
						/* @__PURE__ */ jsxs(Section, {
							label: t("dialog.about"),
							children: [/* @__PURE__ */ jsxs("div", {
								style: aboutBrandStyle,
								children: [/* @__PURE__ */ jsx("div", {
									style: aboutBrandIconStyle,
									"aria-hidden": "true",
									children: appIcon ?? /* @__PURE__ */ jsx(SlideGlanceMark, {})
								}), /* @__PURE__ */ jsxs("div", {
									style: aboutBrandTextStyle,
									children: [/* @__PURE__ */ jsx("div", {
										style: aboutBrandNameStyle,
										children: appName
									}), /* @__PURE__ */ jsxs("div", {
										style: aboutBrandVersionStyle,
										children: ["v", appVersion]
									})]
								})]
							}), /* @__PURE__ */ jsxs("dl", {
								style: aboutStyle,
								children: [
									/* @__PURE__ */ jsx("dt", {
										style: aboutDtStyle,
										children: t("dialog.aboutRendering")
									}),
									/* @__PURE__ */ jsx("dd", {
										style: aboutDdStyle,
										children: t("dialog.aboutRenderingValue")
									}),
									/* @__PURE__ */ jsx("dt", {
										style: aboutDtStyle,
										children: t("dialog.aboutNpmPackage")
									}),
									/* @__PURE__ */ jsx("dd", {
										style: aboutDdStyle,
										children: /* @__PURE__ */ jsx("code", {
											style: aboutCodeStyle,
											children: npmPackage
										})
									}),
									/* @__PURE__ */ jsx("dt", {
										style: aboutDtStyle,
										children: t("dialog.aboutEngine")
									}),
									/* @__PURE__ */ jsxs("dd", {
										style: aboutDdStyle,
										children: [/* @__PURE__ */ jsx("code", {
											style: aboutCodeStyle,
											children: engineCrate
										}), /* @__PURE__ */ jsx("span", {
											style: aboutHintStyle,
											children: " (Rust crate → WebAssembly)"
										})]
									}),
									/* @__PURE__ */ jsx("dt", {
										style: aboutDtStyle,
										children: t("dialog.aboutLicense")
									}),
									/* @__PURE__ */ jsx("dd", {
										style: aboutDdStyle,
										children: "MIT"
									}),
									/* @__PURE__ */ jsx("dt", {
										style: aboutDtStyle,
										children: t("dialog.aboutCopyright")
									}),
									/* @__PURE__ */ jsxs("dd", {
										style: aboutDdStyle,
										children: [
											"© ",
											copyrightYear,
											" ",
											copyrightHolder
										]
									}),
									/* @__PURE__ */ jsx("dt", {
										style: aboutDtStyle,
										children: t("dialog.aboutDeveloper")
									}),
									/* @__PURE__ */ jsx("dd", {
										style: aboutDdStyle,
										children: developer
									}),
									/* @__PURE__ */ jsx("dt", {
										style: aboutDtStyle,
										children: t("dialog.aboutRepository")
									}),
									/* @__PURE__ */ jsx("dd", {
										style: aboutDdStyle,
										children: /* @__PURE__ */ jsx("a", {
											href: repositoryUrl,
											target: "_blank",
											rel: "noopener noreferrer",
											style: aboutLinkStyle,
											children: repositoryUrl.replace(/^https?:\/\//, "")
										})
									})
								]
							})]
						})
					]
				}),
				/* @__PURE__ */ jsx("footer", {
					style: footerStyle,
					children: /* @__PURE__ */ jsx("button", {
						style: primaryButtonStyle,
						onClick: onClose,
						children: t("common.close")
					})
				})
			]
		})]
	});
}
function Section(props) {
	return /* @__PURE__ */ jsxs("section", {
		style: sectionStyle,
		"aria-label": props.label,
		children: [/* @__PURE__ */ jsx("h3", {
			style: sectionTitleStyle,
			children: props.label
		}), props.children]
	});
}
function Row(props) {
	return /* @__PURE__ */ jsx("div", {
		style: {
			...rowStyle$1,
			...props.style
		},
		children: /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
			style: rowLabelStyle,
			children: props.label
		}), props.desc && /* @__PURE__ */ jsx("span", {
			style: rowDescStyle,
			children: props.desc
		})] })
	});
}
function RadioGrid(props) {
	return /* @__PURE__ */ jsx("div", {
		style: radioGridStyle,
		role: "radiogroup",
		"aria-label": props.ariaLabel,
		children: props.options.map((opt) => {
			const isSelected = props.selected === opt.value;
			return /* @__PURE__ */ jsxs("button", {
				style: isSelected ? {
					...radioButtonStyle,
					...radioButtonSelectedStyle
				} : radioButtonStyle,
				role: "radio",
				"aria-checked": isSelected,
				disabled: props.disabled,
				onClick: () => props.onSelect(opt.value),
				children: [/* @__PURE__ */ jsx("div", { children: opt.label }), opt.desc && /* @__PURE__ */ jsx("div", {
					style: radioDescStyle,
					children: opt.desc
				})]
			}, opt.value);
		})
	});
}
var hostStyle$1 = {
	position: "fixed",
	inset: 0,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	zIndex: 1e3,
	font: "13px system-ui, -apple-system, sans-serif"
};
var backdropStyle$1 = {
	position: "absolute",
	inset: 0,
	background: "var(--pptx-shell-dialog-overlay, rgba(0, 0, 0, 0.55))"
};
var panelStyle$1 = {
	position: "relative",
	width: "min(820px, 92vw)",
	maxHeight: "86vh",
	display: "flex",
	flexDirection: "column",
	background: "var(--pptx-shell-dialog-bg, #1f1f23)",
	color: "var(--pptx-shell-dialog-fg, #ececec)",
	border: "1px solid var(--pptx-shell-border, #2a2a30)",
	borderRadius: 8,
	boxShadow: "0 16px 48px var(--pptx-shell-shadow, rgba(0, 0, 0, 0.5))",
	overflow: "hidden"
};
var headerStyle$1 = {
	display: "flex",
	alignItems: "center",
	gap: 8,
	padding: "12px 16px",
	borderBottom: "1px solid var(--pptx-shell-border, #2a2a30)"
};
var titleStyle$1 = {
	margin: 0,
	fontSize: 14,
	fontWeight: 600
};
var closeButtonStyle = {
	background: "transparent",
	color: "inherit",
	border: "1px solid transparent",
	borderRadius: 4,
	padding: "4px 8px",
	cursor: "pointer",
	font: "inherit"
};
var bodyStyle$1 = {
	flex: "1 1 auto",
	overflowY: "auto",
	padding: "16px 20px"
};
var sectionStyle = { marginBottom: 24 };
var sectionTitleStyle = {
	margin: "0 0 12px",
	fontSize: 12,
	letterSpacing: "0.05em",
	textTransform: "uppercase",
	color: "var(--pptx-shell-status, #aaa)"
};
var rowStyle$1 = {
	display: "flex",
	alignItems: "center",
	marginBottom: 8
};
var rowLabelStyle = {
	display: "block",
	fontWeight: 600,
	fontSize: 13,
	marginBottom: 2
};
var rowDescStyle = {
	display: "block",
	fontSize: 11,
	color: "var(--pptx-shell-status, #888)"
};
var checkboxRowStyle = {
	display: "inline-flex",
	alignItems: "center",
	gap: 8,
	fontSize: 13,
	cursor: "pointer"
};
var radioGridStyle = {
	display: "grid",
	gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
	gap: 8,
	marginTop: 6
};
var radioButtonStyle = {
	background: "transparent",
	color: "inherit",
	border: "1px solid var(--pptx-shell-border, #2a2a30)",
	borderRadius: 6,
	padding: "10px 12px",
	cursor: "pointer",
	font: "inherit",
	textAlign: "left"
};
var radioButtonSelectedStyle = { background: "var(--pptx-shell-accent-soft, #1d2738)" };
var radioDescStyle = {
	fontSize: 11,
	color: "var(--pptx-shell-status, #888)",
	marginTop: 4
};
var aboutBrandStyle = {
	display: "flex",
	alignItems: "center",
	gap: 14,
	marginBottom: 14
};
var aboutBrandIconStyle = {
	width: 56,
	height: 56,
	flex: "0 0 56px",
	borderRadius: 12,
	overflow: "hidden",
	background: "var(--pptx-shell-code-bg, rgba(255, 255, 255, 0.06))",
	display: "flex",
	alignItems: "center",
	justifyContent: "center"
};
var aboutBrandTextStyle = {
	display: "flex",
	flexDirection: "column",
	gap: 2,
	minWidth: 0
};
var aboutBrandNameStyle = {
	fontSize: 16,
	fontWeight: 600,
	letterSpacing: .1,
	overflow: "hidden",
	textOverflow: "ellipsis",
	whiteSpace: "nowrap"
};
var aboutBrandVersionStyle = {
	fontSize: 12,
	color: "var(--pptx-shell-status, #888)",
	fontVariantNumeric: "tabular-nums"
};
var aboutStyle = {
	display: "grid",
	gridTemplateColumns: "auto 1fr",
	gap: "4px 16px",
	margin: 0,
	fontSize: 12
};
var aboutDtStyle = {
	color: "var(--pptx-shell-status, #888)",
	margin: 0,
	whiteSpace: "nowrap"
};
var aboutDdStyle = {
	margin: 0,
	fontVariantNumeric: "tabular-nums",
	overflowWrap: "anywhere"
};
var aboutCodeStyle = {
	fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, monospace",
	fontSize: 11,
	background: "var(--pptx-shell-code-bg, rgba(255, 255, 255, 0.06))",
	padding: "1px 6px",
	borderRadius: 3
};
var aboutHintStyle = {
	color: "var(--pptx-shell-status, #888)",
	fontSize: 11
};
var aboutLinkStyle = {
	color: "var(--pptx-shell-accent, #6aa3ff)",
	textDecoration: "none"
};
var footerStyle = {
	display: "flex",
	justifyContent: "flex-end",
	padding: "12px 16px",
	borderTop: "1px solid var(--pptx-shell-border, #2a2a30)"
};
var primaryButtonStyle = {
	background: "var(--pptx-shell-active, #3a3a44)",
	color: "var(--pptx-shell-fg, #ececec)",
	border: "1px solid var(--pptx-shell-accent, #6aa3ff)",
	borderRadius: 4,
	padding: "6px 16px",
	cursor: "pointer",
	font: "inherit"
};
/**
* Default SlideGlance brand mark — an inline SVG so the bundle stays
* offline-first (no external asset, no peer dependency, no loader
* round-trip). Hosts that pass {@link SettingsDialogProps.appIcon}
* override this with their own logo.
*/
function SlideGlanceMark() {
	return /* @__PURE__ */ jsxs("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 1024 1024",
		width: "100%",
		height: "100%",
		role: "img",
		children: [
			/* @__PURE__ */ jsx("rect", {
				x: "0",
				y: "0",
				width: "1024",
				height: "1024",
				rx: "232",
				ry: "232",
				fill: "#f3f4f6"
			}),
			/* @__PURE__ */ jsxs("g", {
				stroke: "#6b7280",
				strokeWidth: "40",
				strokeLinejoin: "round",
				strokeLinecap: "round",
				fill: "none",
				children: [/* @__PURE__ */ jsx("rect", {
					x: "124",
					y: "184",
					width: "776",
					height: "656",
					rx: "48",
					ry: "48"
				}), /* @__PURE__ */ jsx("line", {
					x1: "144",
					y1: "288",
					x2: "880",
					y2: "288"
				})]
			}),
			/* @__PURE__ */ jsxs("g", {
				fill: "#6b7280",
				children: [
					/* @__PURE__ */ jsx("circle", {
						cx: "208",
						cy: "236",
						r: "14"
					}),
					/* @__PURE__ */ jsx("circle", {
						cx: "256",
						cy: "236",
						r: "14"
					}),
					/* @__PURE__ */ jsx("circle", {
						cx: "304",
						cy: "236",
						r: "14"
					})
				]
			}),
			/* @__PURE__ */ jsxs("g", {
				fill: "#c43e1c",
				children: [
					/* @__PURE__ */ jsx("rect", {
						x: "232",
						y: "568",
						width: "96",
						height: "160",
						rx: "12",
						ry: "12"
					}),
					/* @__PURE__ */ jsx("rect", {
						x: "372",
						y: "464",
						width: "96",
						height: "264",
						rx: "12",
						ry: "12"
					}),
					/* @__PURE__ */ jsx("rect", {
						x: "512",
						y: "380",
						width: "96",
						height: "348",
						rx: "12",
						ry: "12"
					}),
					/* @__PURE__ */ jsx("rect", {
						x: "652",
						y: "512",
						width: "96",
						height: "216",
						rx: "12",
						ry: "12"
					})
				]
			})
		]
	});
}
//#endregion
//#region src/ui/SectionNav.tsx
/**
* Section breadcrumb + jump links derived from each slide's
* `section_name`. React port of `<pptx-section-nav>`.
*/
function SectionNav(props) {
	const { slides, currentSlide, onJump } = props;
	const [, setLocaleTick] = useState(0);
	useEffect(() => {
		return subscribeLocale(() => setLocaleTick((n) => n + 1));
	}, []);
	const sections = computeSections(slides);
	if (sections.length === 0) return /* @__PURE__ */ jsx("div", {
		style: {
			...hostStyle,
			...emptyStyle
		},
		children: t("section.empty")
	});
	let activeIndex = 0;
	for (let i = 0; i < sections.length; i += 1) if (sections[i].startSlide <= currentSlide) activeIndex = i;
	return /* @__PURE__ */ jsx("div", {
		style: hostStyle,
		children: sections.map((section, idx) => {
			return /* @__PURE__ */ jsx("button", {
				style: idx === activeIndex ? {
					...buttonStyle,
					...activeButtonStyle
				} : buttonStyle,
				onClick: () => onJump(section.startSlide),
				title: `${section.name} (${t("viewer.slideTitle", { number: section.startSlide })})`,
				children: section.name
			}, `${section.name}-${section.startSlide}`);
		})
	});
}
function computeSections(slides) {
	const out = [];
	let last;
	for (const slide of slides) if (slide.section_name && slide.section_name !== last) {
		out.push({
			name: slide.section_name,
			startSlide: slide.slide_number
		});
		last = slide.section_name;
	} else if (!slide.section_name) last = void 0;
	return out;
}
var hostStyle = {
	display: "flex",
	gap: 6,
	padding: "6px 12px",
	background: "var(--pptx-section-bg, #1a1a1f)",
	color: "var(--pptx-section-fg, #ccc)",
	font: "12px system-ui, sans-serif",
	overflowX: "auto",
	boxSizing: "border-box",
	borderBottom: "1px solid var(--pptx-shell-border, #2a2a30)"
};
var buttonStyle = {
	background: "var(--pptx-section-tile, #25252b)",
	color: "inherit",
	border: "1px solid transparent",
	padding: "4px 10px",
	borderRadius: 999,
	cursor: "pointer",
	font: "inherit",
	whiteSpace: "nowrap"
};
var activeButtonStyle = {
	borderColor: "var(--pptx-section-active, #6aa3ff)",
	color: "var(--pptx-section-active-fg, #fff)"
};
var emptyStyle = {
	color: "var(--pptx-shell-status, #666)",
	fontStyle: "italic"
};
//#endregion
//#region src/ui/SelectionOverlay.tsx
/**
* Purely-visual sibling of the slide host inside the stage. Draws a
* dashed bbox + 8 corner / midpoint handles for every `boxes[]`
* entry, plus an optional translucent dashed `rubberBand` rect during
* empty-canvas drag selection.
*
* The overlay is `pointer-events: none`, so the underlying selection
* state machine on `<PptxPresentation>` keeps owning all pointer
* events. No event handlers — display only.
*/
function SelectionOverlay(props) {
	const { boxes, rubberBand } = props;
	return /* @__PURE__ */ jsxs("svg", {
		style: overlaySvgStyle,
		"aria-hidden": "true",
		children: [boxes.map((b) => /* @__PURE__ */ jsxs("g", { children: [/* @__PURE__ */ jsx("rect", {
			"data-sp-id": b.id,
			x: b.x,
			y: b.y,
			width: b.w,
			height: b.h,
			fill: "rgba(106, 163, 255, 0.08)",
			stroke: "var(--pptx-shell-accent, #6aa3ff)",
			strokeWidth: 1,
			strokeDasharray: "4 4"
		}), handles(b).map((h, i) => /* @__PURE__ */ jsx("circle", {
			cx: h.cx,
			cy: h.cy,
			r: 3,
			fill: "#fff",
			stroke: "var(--pptx-shell-accent, #6aa3ff)",
			strokeWidth: 1
		}, i))] }, b.id)), rubberBand ? /* @__PURE__ */ jsx("rect", {
			x: rubberBand.x,
			y: rubberBand.y,
			width: rubberBand.w,
			height: rubberBand.h,
			fill: "rgba(106, 163, 255, 0.15)",
			stroke: "var(--pptx-shell-accent, #6aa3ff)",
			strokeWidth: 1,
			strokeDasharray: "2 2"
		}) : null]
	});
}
function handles(b) {
	return [
		{
			cx: b.x,
			cy: b.y
		},
		{
			cx: b.x + b.w / 2,
			cy: b.y
		},
		{
			cx: b.x + b.w,
			cy: b.y
		},
		{
			cx: b.x,
			cy: b.y + b.h / 2
		},
		{
			cx: b.x + b.w,
			cy: b.y + b.h / 2
		},
		{
			cx: b.x,
			cy: b.y + b.h
		},
		{
			cx: b.x + b.w / 2,
			cy: b.y + b.h
		},
		{
			cx: b.x + b.w,
			cy: b.y + b.h
		}
	];
}
var overlaySvgStyle = {
	position: "absolute",
	inset: 0,
	width: "100%",
	height: "100%",
	pointerEvents: "none",
	zIndex: 4
};
//#endregion
//#region src/ui/ShortcutsDialog.tsx
/**
* Discoverable keyboard-shortcut reference. Mirrors PowerPoint's
* `?` quick-help convention: a small modal that lists every key the
* viewer reacts to, grouped by topic.
*
* Single source of truth — the actual handlers live in
* `<PptxPresentation>`'s keyboard `useEffect`. If this list and the
* handler ever drift, the handler wins; this dialog is a hint.
*/
function ShortcutsDialog(props) {
	const { open, onClose } = props;
	const [, setLocaleTick] = useState(0);
	useEffect(() => subscribeLocale(() => setLocaleTick((n) => n + 1)), []);
	useEffect(() => {
		if (!open) return;
		const onKey = (ev) => {
			if (ev.key === "Escape") onClose();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open, onClose]);
	if (!open) return null;
	const groups = [
		{
			titleKey: "shortcuts.groupNavigation",
			rows: [
				{
					keys: "← / Page Up",
					descKey: "shortcuts.prevSlide"
				},
				{
					keys: "→ / Page Down",
					descKey: "shortcuts.nextSlide"
				},
				{
					keys: "Home",
					descKey: "shortcuts.firstSlide"
				},
				{
					keys: "End",
					descKey: "shortcuts.lastSlide"
				}
			]
		},
		{
			titleKey: "shortcuts.groupView",
			rows: [
				{
					keys: "⌘/Ctrl + +",
					descKey: "shortcuts.zoomIn"
				},
				{
					keys: "⌘/Ctrl + −",
					descKey: "shortcuts.zoomOut"
				},
				{
					keys: "⌘/Ctrl + 0",
					descKey: "shortcuts.zoomReset"
				},
				{
					keys: "Space + Drag",
					descKey: "shortcuts.panSlide"
				}
			]
		},
		{
			titleKey: "shortcuts.groupSelection",
			rows: [
				{
					keys: t("shortcuts.click"),
					descKey: "shortcuts.selectShape"
				},
				{
					keys: "Shift / ⌘ + " + t("shortcuts.click"),
					descKey: "shortcuts.toggleSelect"
				},
				{
					keys: t("shortcuts.drag"),
					descKey: "shortcuts.rubberBand"
				},
				{
					keys: "⌘/Ctrl + A",
					descKey: "shortcuts.selectAll"
				},
				{
					keys: "⌘/Ctrl + C",
					descKey: "shortcuts.copyText"
				},
				{
					keys: t("shortcuts.doubleClick"),
					descKey: "shortcuts.editText"
				},
				{
					keys: "Esc",
					descKey: "shortcuts.clearSelection"
				}
			]
		},
		{
			titleKey: "shortcuts.groupOutput",
			rows: [{
				keys: "⌘/Ctrl + F",
				descKey: "shortcuts.toggleSearch"
			}, {
				keys: "⌘/Ctrl + P",
				descKey: "shortcuts.print"
			}]
		}
	];
	return /* @__PURE__ */ jsx("div", {
		style: backdropStyle,
		role: "dialog",
		"aria-modal": "true",
		onClick: onClose,
		children: /* @__PURE__ */ jsxs("div", {
			style: panelStyle,
			onClick: (ev) => ev.stopPropagation(),
			children: [/* @__PURE__ */ jsxs("header", {
				style: headerStyle,
				children: [/* @__PURE__ */ jsx("h2", {
					style: titleStyle,
					children: t("shortcuts.title")
				}), /* @__PURE__ */ jsx("button", {
					style: closeBtnStyle,
					onClick: onClose,
					"aria-label": t("common.close"),
					title: t("common.close"),
					children: "✕"
				})]
			}), /* @__PURE__ */ jsx("div", {
				style: bodyStyle,
				children: groups.map((g) => /* @__PURE__ */ jsxs("section", {
					style: groupStyle,
					children: [/* @__PURE__ */ jsx("h3", {
						style: groupTitleStyle,
						children: t(g.titleKey)
					}), /* @__PURE__ */ jsx("dl", {
						style: dlStyle,
						children: g.rows.map((row) => /* @__PURE__ */ jsxs("div", {
							style: rowStyle,
							children: [/* @__PURE__ */ jsx("dt", {
								style: dtStyle,
								children: /* @__PURE__ */ jsx("kbd", {
									style: kbdStyle,
									children: row.keys
								})
							}), /* @__PURE__ */ jsx("dd", {
								style: ddStyle,
								children: t(row.descKey)
							})]
						}, row.keys + row.descKey))
					})]
				}, g.titleKey))
			})]
		})
	});
}
var backdropStyle = {
	position: "fixed",
	inset: 0,
	background: "var(--pptx-shell-dialog-overlay, rgba(0, 0, 0, 0.5))",
	display: "grid",
	placeItems: "center",
	zIndex: 1e3,
	padding: 24
};
var panelStyle = {
	background: "var(--pptx-shell-dialog-bg, #1f1f23)",
	color: "var(--pptx-shell-dialog-fg, #ececec)",
	border: "1px solid var(--pptx-shell-border, #2a2a30)",
	borderRadius: 8,
	width: "min(640px, 100%)",
	maxHeight: "min(720px, 100%)",
	display: "flex",
	flexDirection: "column",
	boxShadow: "0 12px 40px var(--pptx-shell-shadow, rgba(0, 0, 0, 0.5))"
};
var headerStyle = {
	padding: "12px 16px",
	borderBottom: "1px solid var(--pptx-shell-border, #2a2a30)",
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between"
};
var titleStyle = {
	margin: 0,
	fontSize: 14,
	fontWeight: 600
};
var closeBtnStyle = {
	background: "transparent",
	color: "inherit",
	border: "1px solid var(--pptx-shell-border, #2a2a30)",
	borderRadius: 4,
	padding: "2px 8px",
	cursor: "pointer"
};
var bodyStyle = {
	padding: 16,
	overflowY: "auto",
	display: "grid",
	gap: 16
};
var groupStyle = { display: "block" };
var groupTitleStyle = {
	margin: "0 0 6px",
	fontSize: 11,
	letterSpacing: "0.05em",
	textTransform: "uppercase",
	color: "var(--pptx-shell-status, #888)"
};
var dlStyle = {
	margin: 0,
	display: "grid",
	gridTemplateColumns: "minmax(140px, auto) 1fr",
	rowGap: 4,
	columnGap: 12
};
var rowStyle = { display: "contents" };
var dtStyle = { margin: 0 };
var ddStyle = {
	margin: 0,
	fontSize: 12,
	alignSelf: "center",
	color: "var(--pptx-shell-fg, #ddd)"
};
var kbdStyle = {
	display: "inline-block",
	padding: "2px 8px",
	border: "1px solid var(--pptx-shell-border, #2a2a30)",
	borderRadius: 4,
	background: "var(--pptx-shell-kbd-bg, rgba(255, 255, 255, 0.03))",
	fontSize: 11,
	fontFamily: "ui-monospace, Menlo, monospace",
	color: "inherit"
};
//#endregion
//#region src/ui/search.ts
var MATCH_OPEN = "[match]";
var MATCH_CLOSE = "[/match]";
/**
* Plain-text search across text-mode SVG output. Each slide's `<text>`
* descendant text is concatenated and searched case-insensitively.
*
* Path-mode SVG has no searchable text (glyphs are paths) and
* therefore yields no hits. The function is pure so consumers can run
* it inside Web Workers if needed.
*/
function searchSlides(slides, query) {
	const trimmed = query.trim();
	if (!trimmed) return [];
	const needle = trimmed.toLowerCase();
	const TEXT_RE = /<(?:text|tspan)\b[^>]*>([\s\S]*?)<\/(?:text|tspan)>/g;
	const decodeEntities = (s) => s.replaceAll("&amp;", "&").replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&quot;", "\"").replaceAll("&apos;", "'");
	const hits = [];
	for (const slide of slides) {
		const fragments = [];
		for (const match of slide.svg.matchAll(TEXT_RE)) {
			const text = decodeEntities(match[1].replace(/<[^>]*>/g, " ")).trim();
			if (text) fragments.push(text);
		}
		const haystack = fragments.join(" ");
		const idx = haystack.toLowerCase().indexOf(needle);
		if (idx === -1) continue;
		const start = Math.max(0, idx - 24);
		const end = Math.min(haystack.length, idx + trimmed.length + 24);
		const before = haystack.slice(start, idx);
		const match = haystack.slice(idx, idx + trimmed.length);
		const after = haystack.slice(idx + trimmed.length, end);
		hits.push({
			slide_number: slide.slide_number,
			excerpt: `${start > 0 ? "…" : ""}${before}${MATCH_OPEN}${match}${MATCH_CLOSE}${after}${end < haystack.length ? "…" : ""}`
		});
	}
	return hits;
}
//#endregion
//#region src/ui/themes.ts
/**
* Default dark theme — matches the built-in viewer defaults.
* Includes both viewer-internal HUD variables and the shell chrome
* (ribbon, sidebar, status bar, search drawer, settings dialog).
*/
var dark = {
	"--pptx-viewer-bg": "#1f1f1f",
	"--pptx-viewer-fg": "#f5f5f5",
	"--pptx-viewer-shadow": "rgba(0, 0, 0, 0.45)",
	"--pptx-viewer-hud-bg": "rgba(0, 0, 0, 0.5)",
	"--pptx-viewer-hud-fg": "#fff",
	"--pptx-viewer-overlay": "rgba(31, 31, 31, 0.85)",
	"--pptx-viewer-error": "#ff8a80",
	"--pptx-shell-bg": "#2b2b2f",
	"--pptx-shell-fg": "#ececec",
	"--pptx-shell-ribbon-bg": "#1f1f23",
	"--pptx-shell-status-bg": "#1f1f23",
	"--pptx-shell-sidebar-bg": "#15151a",
	"--pptx-shell-notes-bg": "#1a1a1f",
	"--pptx-shell-notes-fg": "#ddd",
	"--pptx-shell-notes-heading": "#888",
	"--pptx-shell-status": "#888",
	"--pptx-shell-border": "#2a2a30",
	"--pptx-shell-hover": "#2a2a30",
	"--pptx-shell-active": "#3a3a44",
	"--pptx-shell-accent": "#6aa3ff",
	"--pptx-shell-drawer-bg": "#1f1f23",
	"--pptx-shell-dialog-bg": "#1f1f23",
	"--pptx-shell-dialog-fg": "#ececec",
	"--pptx-shell-dialog-overlay": "rgba(0, 0, 0, 0.55)",
	"--pptx-shell-input-bg": "#15151a",
	"--pptx-shell-input-fg": "#ececec",
	"--pptx-section-bg": "#1a1a1f",
	"--pptx-section-fg": "#ccc",
	"--pptx-section-tile": "#25252b",
	"--pptx-section-tile-hover": "#2f2f36",
	"--pptx-section-active": "#6aa3ff",
	"--pptx-section-active-fg": "#fff",
	"--pptx-thumb-bg": "#15151a",
	"--pptx-thumb-fg": "#ddd",
	"--pptx-thumb-tile": "#1f1f24",
	"--pptx-thumb-active": "#6aa3ff",
	"--pptx-shell-accent-soft": "#1d2738",
	"--pptx-shell-kbd-bg": "rgba(255, 255, 255, 0.06)",
	"--pptx-shell-shadow": "rgba(0, 0, 0, 0.45)",
	"--pptx-shell-info-bg": "#1f2a3a",
	"--pptx-shell-info-fg": "#cfe1ff",
	"--pptx-shell-info-border": "#3a5a8a",
	"--pptx-shell-error-bg": "#3a1f1f",
	"--pptx-shell-error-fg": "#ffd1d1",
	"--pptx-shell-error-border": "#ff5566",
	"--slideglance-color-scheme": "dark",
	"--pptx-shell-scrollbar-track": "#15151a",
	"--pptx-shell-scrollbar-thumb": "#2a2a30",
	"--pptx-shell-scrollbar-thumb-hover": "#3a3a44"
};
/** Light theme — for embedding in white-page docs. */
var light = {
	"--pptx-viewer-bg": "#fafafa",
	"--pptx-viewer-fg": "#1a1a1a",
	"--pptx-viewer-shadow": "rgba(0, 0, 0, 0.18)",
	"--pptx-viewer-hud-bg": "rgba(255, 255, 255, 0.85)",
	"--pptx-viewer-hud-fg": "#111",
	"--pptx-viewer-overlay": "rgba(250, 250, 250, 0.85)",
	"--pptx-viewer-error": "#c62828",
	"--pptx-shell-bg": "#f3f3f5",
	"--pptx-shell-fg": "#1a1a1f",
	"--pptx-shell-ribbon-bg": "#ffffff",
	"--pptx-shell-status-bg": "#ffffff",
	"--pptx-shell-sidebar-bg": "#fafafa",
	"--pptx-shell-notes-bg": "#fafafa",
	"--pptx-shell-notes-fg": "#222",
	"--pptx-shell-notes-heading": "#666",
	"--pptx-shell-status": "#555",
	"--pptx-shell-border": "#dcdce0",
	"--pptx-shell-hover": "#eceef2",
	"--pptx-shell-active": "#dde7f7",
	"--pptx-shell-accent": "#1f6feb",
	"--pptx-shell-drawer-bg": "#ffffff",
	"--pptx-shell-dialog-bg": "#ffffff",
	"--pptx-shell-dialog-fg": "#1a1a1f",
	"--pptx-shell-dialog-overlay": "rgba(40, 40, 50, 0.45)",
	"--pptx-shell-input-bg": "#ffffff",
	"--pptx-shell-input-fg": "#1a1a1f",
	"--pptx-section-bg": "#fafafa",
	"--pptx-section-fg": "#1a1a1f",
	"--pptx-section-tile": "#eef0f3",
	"--pptx-section-tile-hover": "#dde4ee",
	"--pptx-section-active": "#1f6feb",
	"--pptx-section-active-fg": "#ffffff",
	"--pptx-thumb-bg": "#fafafa",
	"--pptx-thumb-fg": "#1a1a1f",
	"--pptx-thumb-tile": "#ffffff",
	"--pptx-thumb-active": "#1f6feb",
	"--pptx-shell-accent-soft": "#dde7f7",
	"--pptx-shell-kbd-bg": "rgba(0, 0, 0, 0.04)",
	"--pptx-shell-shadow": "rgba(0, 0, 0, 0.18)",
	"--pptx-shell-info-bg": "#eaf3ff",
	"--pptx-shell-info-fg": "#1a3a6a",
	"--pptx-shell-info-border": "#7ea8d6",
	"--pptx-shell-error-bg": "#ffecec",
	"--pptx-shell-error-fg": "#8a1f1f",
	"--pptx-shell-error-border": "#d6555a",
	"--slideglance-color-scheme": "light",
	"--pptx-shell-scrollbar-track": "#eeeef1",
	"--pptx-shell-scrollbar-thumb": "#c2c5cc",
	"--pptx-shell-scrollbar-thumb-hover": "#a6abb5"
};
/** Accessible high-contrast theme. */
var highContrast = {
	"--pptx-viewer-bg": "#000",
	"--pptx-viewer-fg": "#fff",
	"--pptx-viewer-shadow": "transparent",
	"--pptx-viewer-hud-bg": "#fff",
	"--pptx-viewer-hud-fg": "#000",
	"--pptx-viewer-overlay": "rgba(0, 0, 0, 0.92)",
	"--pptx-viewer-error": "#ffeb3b",
	"--pptx-shell-bg": "#000000",
	"--pptx-shell-fg": "#ffffff",
	"--pptx-shell-ribbon-bg": "#000000",
	"--pptx-shell-status-bg": "#000000",
	"--pptx-shell-sidebar-bg": "#000000",
	"--pptx-shell-notes-bg": "#000000",
	"--pptx-shell-notes-fg": "#ffffff",
	"--pptx-shell-notes-heading": "#ffeb3b",
	"--pptx-shell-status": "#ffffff",
	"--pptx-shell-border": "#ffffff",
	"--pptx-shell-hover": "#222222",
	"--pptx-shell-active": "#ffeb3b",
	"--pptx-shell-accent": "#ffeb3b",
	"--pptx-shell-drawer-bg": "#000000",
	"--pptx-shell-dialog-bg": "#000000",
	"--pptx-shell-dialog-fg": "#ffffff",
	"--pptx-shell-dialog-overlay": "rgba(0, 0, 0, 0.8)",
	"--pptx-shell-input-bg": "#000000",
	"--pptx-shell-input-fg": "#ffffff",
	"--pptx-section-bg": "#000000",
	"--pptx-section-fg": "#ffffff",
	"--pptx-section-tile": "#000000",
	"--pptx-section-tile-hover": "#222222",
	"--pptx-section-active": "#ffeb3b",
	"--pptx-section-active-fg": "#000000",
	"--pptx-thumb-bg": "#000000",
	"--pptx-thumb-fg": "#ffffff",
	"--pptx-thumb-tile": "#000000",
	"--pptx-thumb-active": "#ffeb3b",
	"--pptx-shell-accent-soft": "#332e00",
	"--pptx-shell-kbd-bg": "#000000",
	"--pptx-shell-shadow": "transparent",
	"--pptx-shell-info-bg": "#000000",
	"--pptx-shell-info-fg": "#ffeb3b",
	"--pptx-shell-info-border": "#ffeb3b",
	"--pptx-shell-error-bg": "#000000",
	"--pptx-shell-error-fg": "#ffeb3b",
	"--pptx-shell-error-border": "#ff8888",
	"--slideglance-color-scheme": "dark",
	"--pptx-shell-scrollbar-track": "#000000",
	"--pptx-shell-scrollbar-thumb": "#ffeb3b",
	"--pptx-shell-scrollbar-thumb-hover": "#fff176"
};
/** Apply a theme to an element by setting CSS custom properties. */
function applyTheme(el, vars) {
	for (const [k, v] of Object.entries(vars)) el.style.setProperty(k, v);
}
/**
* Inspect the OS / browser color-scheme preference. Returns `"dark"`
* when `prefers-color-scheme: dark` matches, else `"light"`. SSR /
* non-window environments (worker, jsdom without matchMedia) get
* `"light"` as a stable default.
*/
function detectSystemTheme() {
	if (typeof window === "undefined" || typeof window.matchMedia !== "function") return "light";
	return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
/**
* Subscribe to OS / browser color-scheme changes. The callback fires
* with `"light"` or `"dark"` whenever `prefers-color-scheme` flips.
* Returns a teardown function that removes the listener.
*/
function subscribeSystemTheme(cb) {
	if (typeof window === "undefined" || typeof window.matchMedia !== "function") return () => {};
	const mq = window.matchMedia("(prefers-color-scheme: dark)");
	const handler = (ev) => cb(ev.matches ? "dark" : "light");
	if (typeof mq.addEventListener === "function") {
		mq.addEventListener("change", handler);
		return () => mq.removeEventListener("change", handler);
	}
	const legacy = mq;
	legacy.addListener(handler);
	return () => legacy.removeListener(handler);
}
//#endregion
//#region src/PptxPresentation.tsx
var ZOOM_MIN = .25;
var ZOOM_MAX = 8;
/** Width of the sidebar resize handle (CSS px). The full body grid
* dedicates exactly this much horizontal space to the splitter so the
* stage area's width tracks `sidebarWidth + RESIZER_WIDTH`. */
var SIDEBAR_RESIZER_WIDTH = 6;
function clamp(value, min, max) {
	return Math.max(min, Math.min(max, value));
}
/**
* Build the tooltip for deck-wide actions (Print / PDF / Slideshow)
* so the user can see *why* the button is disabled — empty deck vs.
* still-prefetching — instead of just a dead control.
*/
function deckGateTitle(base, ready, slideCount) {
	if (slideCount === 0) return t("output.gateLoadFirst");
	if (!ready) return t("output.gatePreparing", {
		current: 0,
		total: slideCount
	});
	return base;
}
var THEME_TABLE = {
	dark,
	light,
	"high-contrast": highContrast
};
function resolveTheme(mode) {
	if (mode === "auto") return detectSystemTheme();
	return mode;
}
/**
* Top-level presentation shell. React port of the original Lit
* `<pptx-presentation>` Web Component, mirroring the same chrome:
*
*     ┌───────────────────────────────────────────────┐
*     │ ribbon (filename / nav / search / print / …)  │
*     ├──────────┬────────────────────────────────────┤
*     │ thumb    │ stage (slide rendering with ruler) │
*     │ + sects  │                                    │
*     │          ├────────────────────────────────────┤
*     │          │ notes (collapsible)                │
*     ├──────────┴────────────────────────────────────┤
*     │ status bar (slide / view modes / zoom slider) │
*     └───────────────────────────────────────────────┘
*/
function PptxPresentation(props) {
	const { controller, name, slideCount: externalSlideCount, src, className, style, toolbarStart, toolbarEnd, resolveMeta, noPrefetch = false, onReady, hideToolbarSettings } = props;
	const onReadyFiredRef = useRef(false);
	const [settings, setSettings] = useState(() => loadSettings());
	const [theme, setTheme] = useState(() => resolveTheme(loadSettings().themeMode));
	const [, setLocaleTick] = useState(0);
	const rootRef = useRef(null);
	useEffect(() => {
		return subscribeSettings((next) => {
			setSettings(next);
			setTheme(resolveTheme(next.themeMode));
			setSidebarWidth((prev) => prev === next.sidebarWidth ? prev : next.sidebarWidth);
		});
	}, []);
	useEffect(() => {
		if (settings.themeMode !== "auto") return;
		return subscribeSystemTheme(() => setTheme(detectSystemTheme()));
	}, [settings.themeMode]);
	useEffect(() => {
		const vars = THEME_TABLE[theme];
		if (rootRef.current) applyTheme(rootRef.current, vars);
		if (typeof document !== "undefined" && document.documentElement) applyTheme(document.documentElement, vars);
	}, [theme]);
	useEffect(() => {
		return subscribeLocale(() => setLocaleTick((n) => n + 1));
	}, []);
	const [slideCount, setSlideCount] = useState(externalSlideCount ?? 0);
	const [fontUsage, setFontUsage] = useState([]);
	const [fontDefsCss, setFontDefsCss] = useState("");
	const [currentSlide, setCurrentSlide] = useState(1);
	const [zoom, setZoom] = useState(1);
	const [panX, setPanX] = useState(0);
	const [panY, setPanY] = useState(0);
	const [errorMsg, setErrorMsg] = useState(null);
	const [phase, setPhase] = useState("");
	const [progress, setProgress] = useState(null);
	const [stageSize, setStageSize] = useState({
		w: 0,
		h: 0
	});
	const [viewMode, setViewMode] = useState("normal");
	const [notesOpen, setNotesOpen] = useState(false);
	const [sidebarWidth, setSidebarWidth] = useState(() => loadSettings().sidebarWidth);
	const sidebarResizeStartRef = useRef(null);
	const [searchOpen, setSearchOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [searchHits, setSearchHits] = useState([]);
	const [settingsOpen, setSettingsOpen] = useState(false);
	const [shortcutsOpen, setShortcutsOpen] = useState(false);
	const [slideshow, setSlideshow] = useState(false);
	const [allSlidesReady, setAllSlidesReady] = useState(false);
	const [selectedIds, setSelectedIds] = useState(/* @__PURE__ */ new Set());
	const [selectionFontsOpen, setSelectionFontsOpen] = useState(false);
	const selectionFontsRef = useRef(null);
	const [rubberBand, setRubberBand] = useState(null);
	const bboxMapRef = useRef(/* @__PURE__ */ new Map());
	const pointerDownAtRef = useRef(null);
	const [textEditId, setTextEditId] = useState(null);
	const [spaceHeld, setSpaceHeld] = useState(false);
	const panStartRef = useRef(null);
	const stageRef = useRef(null);
	const slideRef = useRef(null);
	const slideshowStageRef = useRef(null);
	const slideshowSlideRef = useRef(null);
	const handlePrintRef = useRef(null);
	const pendingRef = useRef(/* @__PURE__ */ new Map());
	const deckEpochRef = useRef(0);
	useEffect(() => {
		if (typeof externalSlideCount !== "number") return;
		deckEpochRef.current += 1;
		setSlideCount(externalSlideCount);
		setCurrentSlide(1);
		setAllSlidesReady(false);
		setSelectedIds(/* @__PURE__ */ new Set());
		setTextEditId(null);
		setRubberBand(null);
		pendingRef.current.clear();
		setSlideCache((prev) => {
			for (const c of prev.values()) for (const u of c.blobUrls) URL.revokeObjectURL(u);
			return /* @__PURE__ */ new Map();
		});
	}, [externalSlideCount, name]);
	useEffect(() => {
		if (typeof externalSlideCount === "number") return;
		deckEpochRef.current += 1;
		setSlideCount(0);
		setCurrentSlide(1);
		setZoom(1);
		setPanX(0);
		setPanY(0);
		setAllSlidesReady(false);
		setSelectedIds(/* @__PURE__ */ new Set());
		setTextEditId(null);
		setRubberBand(null);
		pendingRef.current.clear();
		setSlideCache((prev) => {
			for (const c of prev.values()) for (const u of c.blobUrls) URL.revokeObjectURL(u);
			return /* @__PURE__ */ new Map();
		});
	}, [name]);
	useEffect(() => {
		const stage = slideshow ? slideshowStageRef.current : stageRef.current;
		if (!stage) return;
		const seed = stage.getBoundingClientRect();
		if (seed.width > 0 && seed.height > 0) setStageSize({
			w: seed.width,
			h: seed.height
		});
		else if (slideshow) setStageSize({
			w: window.innerWidth,
			h: window.innerHeight
		});
		const observer = new ResizeObserver((entries) => {
			const entry = entries[0];
			if (!entry) return;
			const r = entry.contentRect;
			setStageSize({
				w: Math.max(0, r.width),
				h: Math.max(0, r.height)
			});
		});
		observer.observe(stage);
		const onWinResize = () => {
			const cur = slideshow ? slideshowStageRef.current : stageRef.current;
			if (!cur) return;
			const r = cur.getBoundingClientRect();
			setStageSize({
				w: Math.max(0, r.width),
				h: Math.max(0, r.height)
			});
		};
		if (slideshow) window.addEventListener("resize", onWinResize);
		return () => {
			observer.disconnect();
			if (slideshow) window.removeEventListener("resize", onWinResize);
		};
	}, [slideshow]);
	const { slideCache, setSlideCache, requestSlide, ensureAllSlidesRendered } = useSlideCache({
		controller,
		slideCount,
		currentSlide,
		noPrefetch,
		resolveMeta,
		allSlidesReady,
		setAllSlidesReady,
		setErrorMsg,
		setPhase,
		deckEpochRef,
		pendingRef
	});
	useDeckLoader({
		controller,
		src,
		externalSlideCount,
		bundledFontDefsCss: props.bundledFontDefsCss,
		incrementalUpdate: props.incrementalUpdate,
		invalidatedSlides: props.invalidatedSlides,
		setPhase,
		setSlideCount,
		setFontUsage,
		setFontDefsCss,
		setCurrentSlide,
		setZoom,
		setPanX,
		setPanY,
		setErrorMsg,
		setSlideCache
	});
	useEmbeddedFontStyle(fontDefsCss);
	const activeSlide = slideCache.get(currentSlide);
	const slideSvg = activeSlide?.preparedSvg ?? "";
	const slideMeta = activeSlide?.meta ?? null;
	useSlideDomMount({
		slideSvg,
		currentSlide,
		slideshow,
		slideRef,
		slideshowSlideRef,
		bboxMapRef,
		onReadyFiredRef,
		onReady,
		setErrorMsg,
		sidebarWidth,
		notesOpen,
		viewMode,
		stageW: stageSize.w,
		stageH: stageSize.h
	});
	useEffect(() => {
		setSelectedIds(/* @__PURE__ */ new Set());
		setTextEditId(null);
		setRubberBand(null);
	}, [currentSlide]);
	useKeyboardShortcuts({
		slideCount,
		allSlidesReady,
		searchOpen,
		slideshow,
		selectedIds,
		textEditId,
		handlePrintRef,
		bboxMapRef,
		slideRef,
		setSearchOpen,
		setSlideshow,
		setSelectedIds,
		setTextEditId,
		setRubberBand,
		setSpaceHeld,
		setShortcutsOpen,
		setCurrentSlide,
		setZoom,
		setPanX,
		setPanY
	});
	useWheelZoomNav({
		stageRef,
		slideshow,
		viewMode,
		slideCount,
		setZoom,
		setCurrentSlide
	});
	useEffect(() => {
		const onFs = () => {
			if (!document.fullscreenElement && slideshow) setSlideshow(false);
		};
		document.addEventListener("fullscreenchange", onFs);
		return () => document.removeEventListener("fullscreenchange", onFs);
	}, [slideshow]);
	const { onStagePointerDown, onStagePointerMove, onStagePointerUp, onStageDoubleClick, selectionBoxes, selectionFonts, rubberBandRect } = useSelectionStateMachine({
		selectedIds,
		setSelectedIds,
		rubberBand,
		setRubberBand,
		textEditId,
		setTextEditId,
		spaceHeld,
		panX,
		panY,
		setPanX,
		setPanY,
		zoom,
		stageW: stageSize.w,
		stageH: stageSize.h,
		slideSvg,
		panStartRef,
		pointerDownAtRef,
		bboxMapRef,
		stageRef,
		slideRef,
		selectionFontsOpen,
		setSelectionFontsOpen,
		selectionFontsRef
	});
	const aspect = useMemo(() => parseAspect(slideSvg) ?? 16 / 9, [slideSvg]);
	const fit = useMemo(() => {
		if (stageSize.w <= 0 || stageSize.h <= 0) return 0;
		return Math.min(stageSize.w, stageSize.h * aspect);
	}, [
		aspect,
		stageSize.w,
		stageSize.h
	]);
	const slideW = fit * zoom;
	const slideH = fit > 0 ? fit / aspect * zoom : 0;
	const canvasW = Math.max(slideW, stageSize.w);
	const canvasH = Math.max(slideH, stageSize.h);
	const zoomPct = Math.round(zoom * 100);
	const reset = useCallback(() => {
		setZoom(1);
		setPanX(0);
		setPanY(0);
	}, []);
	const setZoomFromPct = useCallback((pct) => {
		setZoom(clamp(pct / 100, ZOOM_MIN, ZOOM_MAX));
	}, []);
	const runSearch = useCallback(async (q) => {
		if (!q.trim()) {
			setSearchHits([]);
			return;
		}
		setSearchHits(searchSlides(await ensureAllSlidesRendered(), q));
	}, [ensureAllSlidesRendered]);
	const { handlePrint, handleExportPdf } = usePrintPdfExport({
		name,
		ensureAllSlidesRendered,
		setProgress,
		setErrorMsg,
		setPhase
	});
	useEffect(() => {
		handlePrintRef.current = handlePrint;
	}, [handlePrint]);
	const handleSlideshow = useCallback(async () => {
		setSlideshow(true);
		setCurrentSlide(1);
		try {
			await rootRef.current?.requestFullscreen();
		} catch {}
	}, []);
	const sectionSlides = useMemo(() => {
		const entries = [];
		for (const [n, c] of slideCache) entries.push({
			slide_number: n,
			svg: c.svg,
			notes: c.meta.notes ?? void 0,
			layout_name: c.meta.layout_name ?? void 0,
			section_name: c.meta.section_name ?? void 0
		});
		entries.sort((a, b) => a.slide_number - b.slide_number);
		return entries;
	}, [slideCache]);
	const hasSections = sectionSlides.some((s) => !!s.section_name);
	const rulerOn = settings.showRuler && !slideshow && viewMode === "normal" && !!slideSvg;
	const { intrinsic, intrinsicY, rulerRect } = useRulerGeometry({
		rulerOn,
		slideSvg,
		stageRef,
		slideRef,
		slideW,
		slideH,
		panX,
		panY,
		stageW: stageSize.w,
		stageH: stageSize.h
	});
	return /* @__PURE__ */ jsxs("div", {
		ref: rootRef,
		"data-pptx-shell": "",
		className,
		style: {
			...rootStyle,
			...style
		},
		children: [
			/* @__PURE__ */ jsx("style", { children: SHELL_GLOBAL_CSS }),
			/* @__PURE__ */ jsx(Toolbar, {
				toolbarStart,
				toolbarEnd,
				name,
				slideCount,
				currentSlide,
				setCurrentSlide,
				searchOpen,
				setSearchOpen,
				allSlidesReady,
				noPrefetch,
				deckGateTitle,
				handlePrint,
				handleExportPdf,
				handleSlideshow,
				shortcutsOpen,
				setShortcutsOpen,
				settingsOpen,
				setSettingsOpen,
				hideSettings: hideToolbarSettings
			}),
			/* @__PURE__ */ jsxs("div", {
				style: {
					...bodyStyle$2,
					gridTemplateColumns: `${sidebarWidth}px ${SIDEBAR_RESIZER_WIDTH}px minmax(0, 1fr)`,
					display: slideshow ? "none" : "grid"
				},
				children: [
					/* @__PURE__ */ jsxs("aside", {
						style: {
							...sidebarStyle,
							gridTemplateRows: hasSections ? "auto 1fr" : "1fr"
						},
						children: [hasSections && /* @__PURE__ */ jsx(SectionNav, {
							slides: sectionSlides,
							currentSlide,
							onJump: (n) => setCurrentSlide(n)
						}), /* @__PURE__ */ jsx(ThumbnailSidebar, {
							slideCount,
							currentSlide,
							onSelect: setCurrentSlide,
							getThumbnail: requestSlide,
							aspectFallback: aspect,
							deckKey: name ?? ""
						})]
					}, "sidebar"),
					/* @__PURE__ */ jsx("div", {
						role: "separator",
						"aria-orientation": "vertical",
						"aria-label": t("status.resizeSidebar"),
						"aria-valuemin": 140,
						"aria-valuemax": 480,
						"aria-valuenow": sidebarWidth,
						tabIndex: 0,
						style: sidebarResizerStyle,
						onPointerDown: (ev) => {
							ev.preventDefault();
							sidebarResizeStartRef.current = {
								pointerId: ev.pointerId,
								startX: ev.clientX,
								startWidth: sidebarWidth
							};
							ev.currentTarget.setPointerCapture(ev.pointerId);
						},
						onPointerMove: (ev) => {
							const start = sidebarResizeStartRef.current;
							if (!start || start.pointerId !== ev.pointerId) return;
							setSidebarWidth(clampSidebarWidth(start.startWidth + (ev.clientX - start.startX)));
						},
						onPointerUp: (ev) => {
							const start = sidebarResizeStartRef.current;
							if (!start || start.pointerId !== ev.pointerId) return;
							sidebarResizeStartRef.current = null;
							try {
								ev.currentTarget.releasePointerCapture(ev.pointerId);
							} catch {}
							saveSettings({ sidebarWidth: clampSidebarWidth(sidebarWidth) });
						},
						onPointerCancel: () => {
							sidebarResizeStartRef.current = null;
						},
						onKeyDown: (ev) => {
							const STEP = 10;
							let next = null;
							if (ev.key === "ArrowLeft") next = sidebarWidth - STEP;
							else if (ev.key === "ArrowRight") next = sidebarWidth + STEP;
							else if (ev.key === "Home") next = 140;
							else if (ev.key === "End") next = 480;
							if (next == null) return;
							ev.preventDefault();
							const clamped = clampSidebarWidth(next);
							setSidebarWidth(clamped);
							saveSettings({ sidebarWidth: clamped });
						}
					}, "sidebar-resizer"),
					/* @__PURE__ */ jsxs("div", {
						style: {
							...stageAreaStyle,
							gridTemplateRows: notesOpen ? "minmax(0, 1fr) auto" : "minmax(0, 1fr)"
						},
						children: [/* @__PURE__ */ jsxs("div", {
							style: {
								...stageWrapStyle,
								padding: rulerOn ? `24px 0 0 24px` : 0
							},
							children: [rulerOn && /* @__PURE__ */ jsxs(Fragment, { children: [
								/* @__PURE__ */ jsx("div", { style: rulerCornerStyle }),
								/* @__PURE__ */ jsx(Ruler, {
									orientation: "horizontal",
									unit: settings.rulerUnit,
									slideOriginPx: rulerRect.originX,
									slideExtentPx: rulerRect.extentX || slideW,
									slideExtentCm: intrinsic.cm,
									slideIntrinsicPx: intrinsic.px,
									style: rulerHStyle
								}),
								/* @__PURE__ */ jsx(Ruler, {
									orientation: "vertical",
									unit: settings.rulerUnit,
									slideOriginPx: rulerRect.originY,
									slideExtentPx: rulerRect.extentY || slideH,
									slideExtentCm: intrinsicY.cm,
									slideIntrinsicPx: intrinsicY.px,
									style: rulerVStyle
								})
							] }), /* @__PURE__ */ jsx("main", {
								ref: stageRef,
								style: {
									...stageStyle,
									cursor: spaceHeld ? panStartRef.current ? "grabbing" : "grab" : void 0
								},
								onPointerDown: onStagePointerDown,
								onPointerMove: onStagePointerMove,
								onPointerUp: onStagePointerUp,
								onPointerCancel: onStagePointerUp,
								onDoubleClick: onStageDoubleClick,
								children: viewMode === "normal" ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("div", {
									style: {
										width: canvasW,
										height: canvasH,
										position: "relative",
										visibility: slideSvg ? "visible" : "hidden"
									},
									children: [/* @__PURE__ */ jsx("div", {
										ref: slideRef,
										style: {
											width: slideW,
											height: slideH,
											position: "absolute",
											left: "50%",
											top: "50%",
											transform: `translate(calc(-50% + ${panX}px), calc(-50% + ${panY}px))`,
											background: "white",
											boxShadow: "0 4px 12px var(--pptx-shell-shadow, rgba(0, 0, 0, 0.45))"
										}
									}), /* @__PURE__ */ jsx(SelectionOverlay, {
										boxes: selectionBoxes,
										rubberBand: rubberBandRect
									})]
								}), !slideSvg && (errorMsg ? /* @__PURE__ */ jsx("div", {
									style: overlayStyle,
									children: errorMsg
								}) : phase ? /* @__PURE__ */ jsxs("div", {
									style: loadingOverlayStyle,
									role: "status",
									children: [/* @__PURE__ */ jsx("div", {
										style: loadingSpinnerStyle,
										"aria-hidden": "true"
									}), /* @__PURE__ */ jsx("div", {
										style: loadingTextStyle,
										children: t("viewer.loading")
									})]
								}) : slideCount === 0 ? /* @__PURE__ */ jsx("div", {
									style: overlayStyle,
									children: t("viewer.empty")
								}) : /* @__PURE__ */ jsxs("div", {
									style: loadingOverlayStyle,
									role: "status",
									children: [/* @__PURE__ */ jsx("div", {
										style: loadingSpinnerStyle,
										"aria-hidden": "true"
									}), /* @__PURE__ */ jsx("div", {
										style: loadingTextStyle,
										children: t("viewer.loading")
									})]
								}))] }) : /* @__PURE__ */ jsx(GridView, {
									slideCount,
									currentSlide,
									cache: slideCache,
									aspect,
									onSelect: (n) => {
										setCurrentSlide(n);
										setViewMode("normal");
									},
									getThumbnail: requestSlide,
									deckKey: name ?? ""
								})
							})]
						}), notesOpen && /* @__PURE__ */ jsx(NotesPanel, {
							currentSlide,
							meta: slideMeta
						})]
					}, "stage-area"),
					searchOpen && /* @__PURE__ */ jsxs("div", {
						style: searchDrawerStyle,
						children: [
							/* @__PURE__ */ jsxs("header", {
								style: searchHeaderStyle,
								children: [/* @__PURE__ */ jsx("span", { children: t("search.title") }), /* @__PURE__ */ jsx("button", {
									style: iconButtonStyle,
									onClick: () => setSearchOpen(false),
									title: t("common.close"),
									"aria-label": t("common.close"),
									children: /* @__PURE__ */ jsx(X, {
										size: 14,
										weight: "bold"
									})
								})]
							}),
							/* @__PURE__ */ jsx("input", {
								type: "search",
								placeholder: t("search.placeholder"),
								value: searchQuery,
								onChange: (e) => {
									setSearchQuery(e.target.value);
									runSearch(e.target.value);
								},
								style: searchInputStyle,
								autoFocus: true
							}),
							searchHits.length === 0 ? /* @__PURE__ */ jsx("div", {
								style: searchEmptyStyle,
								children: searchQuery ? t("search.noMatches") : t("search.typeToSearch")
							}) : /* @__PURE__ */ jsx("ul", {
								style: searchListStyle,
								children: searchHits.map((hit) => /* @__PURE__ */ jsxs("li", {
									style: searchItemStyle,
									onClick: () => {
										setCurrentSlide(hit.slide_number);
										setSearchOpen(false);
									},
									children: [/* @__PURE__ */ jsxs("span", {
										style: searchHitNumStyle,
										children: ["#", hit.slide_number]
									}), /* @__PURE__ */ jsx("span", { children: hit.excerpt.replace(/\[\/?match\]/g, "") })]
								}, `${hit.slide_number}-${hit.excerpt}`))
							})
						]
					})
				]
			}),
			/* @__PURE__ */ jsx(SlideshowOverlay, {
				open: slideshow,
				currentSlide,
				slideCount,
				setSlideshow,
				setCurrentSlide,
				fit,
				slideSvg,
				canvasW,
				canvasH,
				slideW,
				slideH,
				slideshowStageRef,
				slideshowSlideRef
			}),
			/* @__PURE__ */ jsx(StatusBar, {
				slideshow,
				phase,
				errorMsg,
				slideMeta,
				slideCount,
				currentSlide,
				selectionFonts,
				selectionFontsOpen,
				setSelectionFontsOpen,
				selectionFontsRef,
				fontUsage,
				notesOpen,
				setNotesOpen,
				viewMode,
				setViewMode,
				zoom,
				zoomPct,
				setZoom,
				setZoomFromPct,
				reset
			}),
			/* @__PURE__ */ jsx(SettingsDialog, {
				open: settingsOpen,
				onClose: () => setSettingsOpen(false),
				onSettingsChange: (next) => setSettings(next)
			}),
			/* @__PURE__ */ jsx(ShortcutsDialog, {
				open: shortcutsOpen,
				onClose: () => setShortcutsOpen(false)
			}),
			progress && /* @__PURE__ */ jsxs("div", {
				style: progressHostStyle,
				role: "status",
				"aria-live": "polite",
				"aria-busy": "true",
				children: [/* @__PURE__ */ jsx("div", { style: progressBackdropStyle }), /* @__PURE__ */ jsxs("div", {
					style: progressPanelStyle,
					children: [
						/* @__PURE__ */ jsx("div", {
							style: progressTitleStyle,
							children: progress.title
						}),
						/* @__PURE__ */ jsx("div", {
							style: progressStepStyle,
							children: progress.step
						}),
						/* @__PURE__ */ jsx("div", {
							style: progressBarTrackStyle,
							children: /* @__PURE__ */ jsx("div", { style: {
								...progressBarFillStyle,
								...progress.total && progress.total > 0 ? { width: `${Math.min(100, (progress.current ?? 0) / progress.total * 100)}%` } : progressBarIndeterminateStyle
							} })
						}),
						progress.total != null && progress.total > 0 ? /* @__PURE__ */ jsxs("div", {
							style: progressCounterStyle,
							children: [
								progress.current ?? 0,
								" / ",
								progress.total
							]
						}) : /* @__PURE__ */ jsx("div", {
							style: progressCounterStyle,
							children: "\xA0"
						})
					]
				})]
			})
		]
	});
}
//#endregion
//#region src/worker-controller.ts
/**
* Build a Worker-backed `SlideController`. The worker imports
* `@slideglance/core/bundler`, parses the deck into a `PptxDocument`, and
* renders one slide per `render` message with `externalMedia` enabled.
*/
async function createWorkerController(workerOverride) {
	let worker;
	if (workerOverride) worker = workerOverride;
	else {
		const { default: workerUrl } = await import("./pptx-worker-CFJN_XZR.js");
		worker = new Worker(workerUrl, { type: "module" });
	}
	let nextId = 0;
	const pending = /* @__PURE__ */ new Map();
	worker.addEventListener("message", (ev) => {
		const msg = ev.data;
		const handler = pending.get(msg.id);
		if (!handler) return;
		pending.delete(msg.id);
		if (msg.type === "error") handler.reject(new Error(String(msg.message ?? "worker error")));
		else handler.resolve(msg);
	});
	worker.addEventListener("error", (ev) => {
		for (const handler of pending.values()) handler.reject(new Error(String(ev.message ?? "worker crashed")));
		pending.clear();
	});
	function call(payload, transfer = []) {
		const id = ++nextId;
		return new Promise((resolve, reject) => {
			pending.set(id, {
				resolve,
				reject
			});
			worker.postMessage({
				...payload,
				id
			}, transfer);
		});
	}
	return {
		async open(bytes, options) {
			const result = await call({
				type: "open",
				bytes,
				extraFontDefsCss: options?.extraFontDefsCss
			}, [bytes.buffer]);
			const fontUsage = (result.fontUsage ?? []).map((u) => ({
				requested: u.requested,
				fallbackChain: u.fallback_chain,
				resolvedFamily: u.resolved_family
			}));
			const fontLoadFailures = result.fontLoadFailures ?? [];
			return {
				slideCount: result.slideCount,
				fontDefs: result.fontDefs,
				fontUsage,
				fontLoadFailures,
				decodedFonts: result.decodedFonts ?? []
			};
		},
		async renderSlide(slide) {
			return call({
				type: "render",
				slide
			});
		},
		close() {
			try {
				worker.postMessage({
					type: "close",
					id: ++nextId
				});
			} catch {}
			worker.terminate();
		}
	};
}
//#endregion
export { PptxPresentation, SUPPORTED_LOCALES, SettingsDialog, createWorkerController, detectLocale, extractAndStripFontStyle, extractFontStyleCss, getActiveLocale, getDetectedLocale, parseAspect, prepareSvg, resetLocaleCache, rewriteMediaRefs, setLocale, subscribeLocale, t };

//# sourceMappingURL=pptx-viewer.js.map