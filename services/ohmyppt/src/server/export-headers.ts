/** Safe Content-Disposition for ZIP downloads. */
export function buildZipContentDisposition(title: string, sessionId: string): string {
  const safeAscii =
    title.replace(/[^\w.-]+/g, '_').replace(/^_+|_+$/g, '') || sessionId
  const filename = `${safeAscii}.zip`
  const encoded = encodeURIComponent(`${title || sessionId}.zip`)
  return `attachment; filename="${filename}"; filename*=UTF-8''${encoded}`
}

/** Safe Content-Disposition for PPTX downloads. */
export function buildPptxContentDisposition(title: string, sessionId: string): string {
  const safeAscii =
    title.replace(/[^\w.-]+/g, '_').replace(/^_+|_+$/g, '') || sessionId
  const filename = `${safeAscii}.pptx`
  const encoded = encodeURIComponent(`${title || sessionId}.pptx`)
  return `attachment; filename="${filename}"; filename*=UTF-8''${encoded}`
}
