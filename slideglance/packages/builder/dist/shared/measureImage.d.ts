import type { DiagnosticCollector } from "../diagnostics.ts";
type ImageSizeCache = Map<string, {
    widthPx: number;
    heightPx: number;
}>;
type ImageDataCache = Map<string, string>;
/**
 * Read cached image data (Base64).
 * @param src Image path.
 * @param cache imagedatacache
 * @returns Image data in Base64, or `undefined` when not cached.
 */
export declare function getImageData(src: string, cache: ImageDataCache): string | undefined;
/**
 * Prefetch and cache image sizes (async).
 * Used when handling HTTPS URL images.
 * @param src Image path (local path, base64 data, or HTTPS URL).
 * @param sizeCache imagesizecache
 * @param dataCache imagedatacache
 * @returns image width and height（px）
 */
export declare function prefetchImageSize(src: string, sizeCache: ImageSizeCache, dataCache: ImageDataCache, diagnostics: DiagnosticCollector): Promise<{
    widthPx: number;
    heightPx: number;
}>;
/**
 * Read an image file's size (sync).
 * Pre-warm the cache via `prefetchImageSize`.
 * @param src Image path (local path, base64 data, or HTTPS URL).
 * @param sizeCache imagesizecache
 * @returns image width and height（px）
 */
export declare function measureImage(src: string, sizeCache: ImageSizeCache, diagnostics: DiagnosticCollector): {
    widthPx: number;
    heightPx: number;
};
export {};
//# sourceMappingURL=measureImage.d.ts.map