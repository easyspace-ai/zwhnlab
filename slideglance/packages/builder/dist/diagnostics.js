export class DiagnosticCollector {
    items = [];
    add(code, message, sourcePos) {
        this.items.push(sourcePos ? { code, message, sourcePos } : { code, message });
    }
    addAll(diagnostics) {
        for (const diagnostic of diagnostics) {
            this.items.push(diagnostic);
        }
    }
    /** Push a fully-detailed lint Diagnostic (severity, context, fix). */
    addLint(diag) {
        this.items.push(diag);
    }
}
export class DiagnosticsError extends Error {
    diagnostics;
    constructor(diagnostics) {
        const summary = diagnostics
            .map((d) => `[${d.code}] ${d.message}`)
            .join("\n");
        super(`Build completed with diagnostics:\n${summary}`);
        this.diagnostics = diagnostics;
        this.name = "DiagnosticsError";
    }
}
