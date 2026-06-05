export const DEFAULT_FONT_FAMILY = "Noto Sans JP";
export function normalizeDefaultTextStyle(style) {
    const fontFamily = style?.fontFamily?.trim();
    return {
        ...style,
        fontFamily: fontFamily && fontFamily.length > 0 ? fontFamily : DEFAULT_FONT_FAMILY,
    };
}
export function mergeDefaultTextStyles(base, override) {
    const merged = {
        ...base,
        ...override,
    };
    return Object.values(merged).some((value) => value !== undefined)
        ? merged
        : undefined;
}
export function resolveFontFamily(fontFamily, defaultTextStyle) {
    const resolved = fontFamily?.trim();
    if (resolved)
        return resolved;
    const defaultFontFamily = defaultTextStyle?.fontFamily?.trim();
    if (defaultFontFamily)
        return defaultFontFamily;
    return DEFAULT_FONT_FAMILY;
}
export function resolveTextStyleValue(value, defaultValue, fallback) {
    return value ?? defaultValue ?? fallback;
}
