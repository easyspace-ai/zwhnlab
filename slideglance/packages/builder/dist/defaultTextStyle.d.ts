import type { DefaultTextStyle } from "./types.ts";
export declare const DEFAULT_FONT_FAMILY = "Noto Sans JP";
export interface ResolvedDefaultTextStyle extends DefaultTextStyle {
    fontFamily: string;
}
export declare function normalizeDefaultTextStyle(style?: DefaultTextStyle): ResolvedDefaultTextStyle;
export declare function mergeDefaultTextStyles(base?: DefaultTextStyle, override?: DefaultTextStyle): DefaultTextStyle | undefined;
export declare function resolveFontFamily(fontFamily: string | undefined, defaultTextStyle?: DefaultTextStyle): string;
export declare function resolveTextStyleValue<T>(value: T | undefined, defaultValue: T | undefined, fallback: T): T;
//# sourceMappingURL=defaultTextStyle.d.ts.map