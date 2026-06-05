import { runLintRules } from "./runner.js";
import { formatStdout } from "./output/stdout.js";
import { buildJsonReport } from "./output/json.js";
export { runLintRules };
export { formatStdout };
export { buildJsonReport };
/**
 * Run all enabled lint rules against the rendered slide trees. Returns
 * the merged diagnostics list plus an optional JSON report. The runner
 * never throws — failing rules degrade to info-severity diagnostics.
 */
export function lintDeck(slides, options, inputs = {}) {
    if (options.enabled === false) {
        return {
            diagnostics: [],
            report: buildJsonReport([], slides.length),
        };
    }
    const all = [];
    // Parse-phase rules run once per deck against the raw XML sources.
    // They produce file/line-anchored diagnostics so authors can fix the
    // offending source line directly. When no raw sources are supplied
    // (legacy callers), the parse-phase pass is a no-op.
    if (inputs.rawXmlSources && inputs.rawXmlSources.length > 0) {
        // Parse-phase rules never read tree / slideSize. Borrow the first
        // slide's values as inert placeholders so the shared LintContext
        // type stays honest; for the 0-slide edge case (rare — master-only
        // decks), fall back to a minimal stub so source-level rules still
        // run.
        const anchor = slides[0];
        const parseCtx = {
            tree: (anchor?.root ?? {
                type: "slide",
                x: 0,
                y: 0,
                w: 0,
                h: 0,
            }),
            slideIndex: 0,
            slideSize: anchor?.slideSize ?? { w: 0, h: 0 },
            rawXmlSources: inputs.rawXmlSources,
            phase: "parse",
        };
        all.push(...runLintRules(parseCtx, options));
    }
    slides.forEach((slide, i) => {
        const ctx = {
            tree: slide.root,
            slideIndex: i + 1,
            slideSize: slide.slideSize,
            declaredStyles: inputs.declaredStyles,
            referencedStyles: inputs.referencedStyles,
            declaredTemplates: inputs.declaredTemplates,
            referencedTemplates: inputs.referencedTemplates,
            measurer: inputs.measurer,
            phase: "post-layout",
        };
        all.push(...runLintRules(ctx, options));
    });
    return {
        diagnostics: all,
        report: buildJsonReport(all, slides.length),
    };
}
