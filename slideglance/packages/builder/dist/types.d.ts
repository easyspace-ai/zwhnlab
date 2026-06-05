import { z } from "zod";
import { bulletNumberTypeSchema, type AlignItems, type FlexWrap, type JustifyContent } from "./registry/shared/index.ts";
export { bulletNumberTypeSchema };
export type { AlignItems, AlignSelf, BulletNumberType, FlexWrap, JustifyContent, PositionType, Length, Padding, BorderDash, BorderStyle, FillStyle, ShadowStyle, UnderlineStyle, Underline, DefaultTextStyle, ShapeType, BackgroundImage, BackgroundImageSizing, } from "./registry/shared/index.ts";
declare const baseNodeSchema: z.ZodObject<{
    w: z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodLiteral<"max">, z.ZodString]>>;
    h: z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodLiteral<"max">, z.ZodString]>>;
    minW: z.ZodOptional<z.ZodNumber>;
    maxW: z.ZodOptional<z.ZodNumber>;
    minH: z.ZodOptional<z.ZodNumber>;
    maxH: z.ZodOptional<z.ZodNumber>;
    padding: z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodObject<{
        top: z.ZodOptional<z.ZodNumber>;
        right: z.ZodOptional<z.ZodNumber>;
        bottom: z.ZodOptional<z.ZodNumber>;
        left: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>]>>;
    margin: z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodObject<{
        top: z.ZodOptional<z.ZodNumber>;
        right: z.ZodOptional<z.ZodNumber>;
        bottom: z.ZodOptional<z.ZodNumber>;
        left: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>]>>;
    backgroundColor: z.ZodOptional<z.ZodString>;
    backgroundImage: z.ZodOptional<z.ZodObject<{
        src: z.ZodString;
        sizing: z.ZodOptional<z.ZodEnum<{
            cover: "cover";
            contain: "contain";
        }>>;
    }, z.core.$strip>>;
    border: z.ZodOptional<z.ZodObject<{
        color: z.ZodOptional<z.ZodString>;
        width: z.ZodOptional<z.ZodNumber>;
        dashType: z.ZodOptional<z.ZodEnum<{
            solid: "solid";
            dash: "dash";
            dashDot: "dashDot";
            lgDash: "lgDash";
            lgDashDot: "lgDashDot";
            lgDashDotDot: "lgDashDotDot";
            sysDash: "sysDash";
            sysDot: "sysDot";
        }>>;
    }, z.core.$strip>>;
    borderTop: z.ZodOptional<z.ZodObject<{
        color: z.ZodOptional<z.ZodString>;
        width: z.ZodOptional<z.ZodNumber>;
        dashType: z.ZodOptional<z.ZodEnum<{
            solid: "solid";
            dash: "dash";
            dashDot: "dashDot";
            lgDash: "lgDash";
            lgDashDot: "lgDashDot";
            lgDashDotDot: "lgDashDotDot";
            sysDash: "sysDash";
            sysDot: "sysDot";
        }>>;
    }, z.core.$strip>>;
    borderRight: z.ZodOptional<z.ZodObject<{
        color: z.ZodOptional<z.ZodString>;
        width: z.ZodOptional<z.ZodNumber>;
        dashType: z.ZodOptional<z.ZodEnum<{
            solid: "solid";
            dash: "dash";
            dashDot: "dashDot";
            lgDash: "lgDash";
            lgDashDot: "lgDashDot";
            lgDashDotDot: "lgDashDotDot";
            sysDash: "sysDash";
            sysDot: "sysDot";
        }>>;
    }, z.core.$strip>>;
    borderBottom: z.ZodOptional<z.ZodObject<{
        color: z.ZodOptional<z.ZodString>;
        width: z.ZodOptional<z.ZodNumber>;
        dashType: z.ZodOptional<z.ZodEnum<{
            solid: "solid";
            dash: "dash";
            dashDot: "dashDot";
            lgDash: "lgDash";
            lgDashDot: "lgDashDot";
            lgDashDotDot: "lgDashDotDot";
            sysDash: "sysDash";
            sysDot: "sysDot";
        }>>;
    }, z.core.$strip>>;
    borderLeft: z.ZodOptional<z.ZodObject<{
        color: z.ZodOptional<z.ZodString>;
        width: z.ZodOptional<z.ZodNumber>;
        dashType: z.ZodOptional<z.ZodEnum<{
            solid: "solid";
            dash: "dash";
            dashDot: "dashDot";
            lgDash: "lgDash";
            lgDashDot: "lgDashDot";
            lgDashDotDot: "lgDashDotDot";
            sysDash: "sysDash";
            sysDot: "sysDot";
        }>>;
    }, z.core.$strip>>;
    borderRadius: z.ZodOptional<z.ZodNumber>;
    opacity: z.ZodOptional<z.ZodNumber>;
    zIndex: z.ZodOptional<z.ZodNumber>;
    position: z.ZodOptional<z.ZodEnum<{
        relative: "relative";
        absolute: "absolute";
    }>>;
    top: z.ZodOptional<z.ZodNumber>;
    right: z.ZodOptional<z.ZodNumber>;
    bottom: z.ZodOptional<z.ZodNumber>;
    left: z.ZodOptional<z.ZodNumber>;
    alignSelf: z.ZodOptional<z.ZodEnum<{
        start: "start";
        center: "center";
        end: "end";
        stretch: "stretch";
        auto: "auto";
    }>>;
    shadow: z.ZodOptional<z.ZodObject<{
        type: z.ZodOptional<z.ZodEnum<{
            outer: "outer";
            inner: "inner";
        }>>;
        opacity: z.ZodOptional<z.ZodNumber>;
        blur: z.ZodOptional<z.ZodNumber>;
        angle: z.ZodOptional<z.ZodNumber>;
        offset: z.ZodOptional<z.ZodNumber>;
        color: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    master: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
    isDecorative: z.ZodOptional<z.ZodBoolean>;
    flexGrow: z.ZodOptional<z.ZodNumber>;
    flexShrink: z.ZodOptional<z.ZodNumber>;
    flexBasis: z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodLiteral<"max">, z.ZodString]>>;
    id: z.ZodOptional<z.ZodString>;
    group: z.ZodOptional<z.ZodString>;
    __nodeId: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
type BaseBuilderNode = z.infer<typeof baseNodeSchema>;
export declare const textNodeSchema: z.ZodObject<{
    w: z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodLiteral<"max">, z.ZodString]>>;
    h: z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodLiteral<"max">, z.ZodString]>>;
    minW: z.ZodOptional<z.ZodNumber>;
    maxW: z.ZodOptional<z.ZodNumber>;
    minH: z.ZodOptional<z.ZodNumber>;
    maxH: z.ZodOptional<z.ZodNumber>;
    padding: z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodObject<{
        top: z.ZodOptional<z.ZodNumber>;
        right: z.ZodOptional<z.ZodNumber>;
        bottom: z.ZodOptional<z.ZodNumber>;
        left: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>]>>;
    margin: z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodObject<{
        top: z.ZodOptional<z.ZodNumber>;
        right: z.ZodOptional<z.ZodNumber>;
        bottom: z.ZodOptional<z.ZodNumber>;
        left: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>]>>;
    backgroundColor: z.ZodOptional<z.ZodString>;
    backgroundImage: z.ZodOptional<z.ZodObject<{
        src: z.ZodString;
        sizing: z.ZodOptional<z.ZodEnum<{
            cover: "cover";
            contain: "contain";
        }>>;
    }, z.core.$strip>>;
    border: z.ZodOptional<z.ZodObject<{
        color: z.ZodOptional<z.ZodString>;
        width: z.ZodOptional<z.ZodNumber>;
        dashType: z.ZodOptional<z.ZodEnum<{
            solid: "solid";
            dash: "dash";
            dashDot: "dashDot";
            lgDash: "lgDash";
            lgDashDot: "lgDashDot";
            lgDashDotDot: "lgDashDotDot";
            sysDash: "sysDash";
            sysDot: "sysDot";
        }>>;
    }, z.core.$strip>>;
    borderTop: z.ZodOptional<z.ZodObject<{
        color: z.ZodOptional<z.ZodString>;
        width: z.ZodOptional<z.ZodNumber>;
        dashType: z.ZodOptional<z.ZodEnum<{
            solid: "solid";
            dash: "dash";
            dashDot: "dashDot";
            lgDash: "lgDash";
            lgDashDot: "lgDashDot";
            lgDashDotDot: "lgDashDotDot";
            sysDash: "sysDash";
            sysDot: "sysDot";
        }>>;
    }, z.core.$strip>>;
    borderRight: z.ZodOptional<z.ZodObject<{
        color: z.ZodOptional<z.ZodString>;
        width: z.ZodOptional<z.ZodNumber>;
        dashType: z.ZodOptional<z.ZodEnum<{
            solid: "solid";
            dash: "dash";
            dashDot: "dashDot";
            lgDash: "lgDash";
            lgDashDot: "lgDashDot";
            lgDashDotDot: "lgDashDotDot";
            sysDash: "sysDash";
            sysDot: "sysDot";
        }>>;
    }, z.core.$strip>>;
    borderBottom: z.ZodOptional<z.ZodObject<{
        color: z.ZodOptional<z.ZodString>;
        width: z.ZodOptional<z.ZodNumber>;
        dashType: z.ZodOptional<z.ZodEnum<{
            solid: "solid";
            dash: "dash";
            dashDot: "dashDot";
            lgDash: "lgDash";
            lgDashDot: "lgDashDot";
            lgDashDotDot: "lgDashDotDot";
            sysDash: "sysDash";
            sysDot: "sysDot";
        }>>;
    }, z.core.$strip>>;
    borderLeft: z.ZodOptional<z.ZodObject<{
        color: z.ZodOptional<z.ZodString>;
        width: z.ZodOptional<z.ZodNumber>;
        dashType: z.ZodOptional<z.ZodEnum<{
            solid: "solid";
            dash: "dash";
            dashDot: "dashDot";
            lgDash: "lgDash";
            lgDashDot: "lgDashDot";
            lgDashDotDot: "lgDashDotDot";
            sysDash: "sysDash";
            sysDot: "sysDot";
        }>>;
    }, z.core.$strip>>;
    borderRadius: z.ZodOptional<z.ZodNumber>;
    opacity: z.ZodOptional<z.ZodNumber>;
    zIndex: z.ZodOptional<z.ZodNumber>;
    position: z.ZodOptional<z.ZodEnum<{
        relative: "relative";
        absolute: "absolute";
    }>>;
    top: z.ZodOptional<z.ZodNumber>;
    right: z.ZodOptional<z.ZodNumber>;
    bottom: z.ZodOptional<z.ZodNumber>;
    left: z.ZodOptional<z.ZodNumber>;
    alignSelf: z.ZodOptional<z.ZodEnum<{
        start: "start";
        center: "center";
        end: "end";
        stretch: "stretch";
        auto: "auto";
    }>>;
    shadow: z.ZodOptional<z.ZodObject<{
        type: z.ZodOptional<z.ZodEnum<{
            outer: "outer";
            inner: "inner";
        }>>;
        opacity: z.ZodOptional<z.ZodNumber>;
        blur: z.ZodOptional<z.ZodNumber>;
        angle: z.ZodOptional<z.ZodNumber>;
        offset: z.ZodOptional<z.ZodNumber>;
        color: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    master: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
    isDecorative: z.ZodOptional<z.ZodBoolean>;
    flexGrow: z.ZodOptional<z.ZodNumber>;
    flexShrink: z.ZodOptional<z.ZodNumber>;
    flexBasis: z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodLiteral<"max">, z.ZodString]>>;
    id: z.ZodOptional<z.ZodString>;
    group: z.ZodOptional<z.ZodString>;
    __nodeId: z.ZodOptional<z.ZodNumber>;
    type: z.ZodLiteral<"text">;
    text: z.ZodString;
    runs: z.ZodOptional<z.ZodArray<z.ZodObject<{
        text: z.ZodString;
        bold: z.ZodOptional<z.ZodBoolean>;
        italic: z.ZodOptional<z.ZodBoolean>;
        underline: z.ZodOptional<z.ZodBoolean>;
        strike: z.ZodOptional<z.ZodBoolean>;
        highlight: z.ZodOptional<z.ZodString>;
        color: z.ZodOptional<z.ZodString>;
        href: z.ZodOptional<z.ZodString>;
        lang: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>>;
    fontSize: z.ZodOptional<z.ZodNumber>;
    color: z.ZodOptional<z.ZodString>;
    textAlign: z.ZodOptional<z.ZodEnum<{
        right: "right";
        left: "left";
        center: "center";
    }>>;
    bold: z.ZodOptional<z.ZodBoolean>;
    italic: z.ZodOptional<z.ZodBoolean>;
    underline: z.ZodOptional<z.ZodUnion<readonly [z.ZodBoolean, z.ZodObject<{
        style: z.ZodOptional<z.ZodEnum<{
            dash: "dash";
            dashHeavy: "dashHeavy";
            dashLong: "dashLong";
            dashLongHeavy: "dashLongHeavy";
            dbl: "dbl";
            dotDash: "dotDash";
            dotDotDash: "dotDotDash";
            dotted: "dotted";
            dottedHeavy: "dottedHeavy";
            heavy: "heavy";
            none: "none";
            sng: "sng";
            wavy: "wavy";
            wavyDbl: "wavyDbl";
            wavyHeavy: "wavyHeavy";
        }>>;
        color: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>]>>;
    strike: z.ZodOptional<z.ZodBoolean>;
    highlight: z.ZodOptional<z.ZodString>;
    fontFamily: z.ZodOptional<z.ZodString>;
    lineHeight: z.ZodOptional<z.ZodNumber>;
    letterSpacing: z.ZodOptional<z.ZodNumber>;
    noWrap: z.ZodOptional<z.ZodBoolean>;
    textVAlign: z.ZodOptional<z.ZodEnum<{
        top: "top";
        bottom: "bottom";
        middle: "middle";
    }>>;
}, z.core.$strip>;
export declare const liNodeSchema: z.ZodObject<{
    text: z.ZodString;
    runs: z.ZodOptional<z.ZodArray<z.ZodObject<{
        text: z.ZodString;
        bold: z.ZodOptional<z.ZodBoolean>;
        italic: z.ZodOptional<z.ZodBoolean>;
        underline: z.ZodOptional<z.ZodBoolean>;
        strike: z.ZodOptional<z.ZodBoolean>;
        highlight: z.ZodOptional<z.ZodString>;
        color: z.ZodOptional<z.ZodString>;
        href: z.ZodOptional<z.ZodString>;
        lang: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>>;
    bold: z.ZodOptional<z.ZodBoolean>;
    italic: z.ZodOptional<z.ZodBoolean>;
    underline: z.ZodOptional<z.ZodUnion<readonly [z.ZodBoolean, z.ZodObject<{
        style: z.ZodOptional<z.ZodEnum<{
            dash: "dash";
            dashHeavy: "dashHeavy";
            dashLong: "dashLong";
            dashLongHeavy: "dashLongHeavy";
            dbl: "dbl";
            dotDash: "dotDash";
            dotDotDash: "dotDotDash";
            dotted: "dotted";
            dottedHeavy: "dottedHeavy";
            heavy: "heavy";
            none: "none";
            sng: "sng";
            wavy: "wavy";
            wavyDbl: "wavyDbl";
            wavyHeavy: "wavyHeavy";
        }>>;
        color: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>]>>;
    strike: z.ZodOptional<z.ZodBoolean>;
    highlight: z.ZodOptional<z.ZodString>;
    color: z.ZodOptional<z.ZodString>;
    fontSize: z.ZodOptional<z.ZodNumber>;
    fontFamily: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const ulNodeSchema: z.ZodObject<{
    w: z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodLiteral<"max">, z.ZodString]>>;
    h: z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodLiteral<"max">, z.ZodString]>>;
    minW: z.ZodOptional<z.ZodNumber>;
    maxW: z.ZodOptional<z.ZodNumber>;
    minH: z.ZodOptional<z.ZodNumber>;
    maxH: z.ZodOptional<z.ZodNumber>;
    padding: z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodObject<{
        top: z.ZodOptional<z.ZodNumber>;
        right: z.ZodOptional<z.ZodNumber>;
        bottom: z.ZodOptional<z.ZodNumber>;
        left: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>]>>;
    margin: z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodObject<{
        top: z.ZodOptional<z.ZodNumber>;
        right: z.ZodOptional<z.ZodNumber>;
        bottom: z.ZodOptional<z.ZodNumber>;
        left: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>]>>;
    backgroundColor: z.ZodOptional<z.ZodString>;
    backgroundImage: z.ZodOptional<z.ZodObject<{
        src: z.ZodString;
        sizing: z.ZodOptional<z.ZodEnum<{
            cover: "cover";
            contain: "contain";
        }>>;
    }, z.core.$strip>>;
    border: z.ZodOptional<z.ZodObject<{
        color: z.ZodOptional<z.ZodString>;
        width: z.ZodOptional<z.ZodNumber>;
        dashType: z.ZodOptional<z.ZodEnum<{
            solid: "solid";
            dash: "dash";
            dashDot: "dashDot";
            lgDash: "lgDash";
            lgDashDot: "lgDashDot";
            lgDashDotDot: "lgDashDotDot";
            sysDash: "sysDash";
            sysDot: "sysDot";
        }>>;
    }, z.core.$strip>>;
    borderTop: z.ZodOptional<z.ZodObject<{
        color: z.ZodOptional<z.ZodString>;
        width: z.ZodOptional<z.ZodNumber>;
        dashType: z.ZodOptional<z.ZodEnum<{
            solid: "solid";
            dash: "dash";
            dashDot: "dashDot";
            lgDash: "lgDash";
            lgDashDot: "lgDashDot";
            lgDashDotDot: "lgDashDotDot";
            sysDash: "sysDash";
            sysDot: "sysDot";
        }>>;
    }, z.core.$strip>>;
    borderRight: z.ZodOptional<z.ZodObject<{
        color: z.ZodOptional<z.ZodString>;
        width: z.ZodOptional<z.ZodNumber>;
        dashType: z.ZodOptional<z.ZodEnum<{
            solid: "solid";
            dash: "dash";
            dashDot: "dashDot";
            lgDash: "lgDash";
            lgDashDot: "lgDashDot";
            lgDashDotDot: "lgDashDotDot";
            sysDash: "sysDash";
            sysDot: "sysDot";
        }>>;
    }, z.core.$strip>>;
    borderBottom: z.ZodOptional<z.ZodObject<{
        color: z.ZodOptional<z.ZodString>;
        width: z.ZodOptional<z.ZodNumber>;
        dashType: z.ZodOptional<z.ZodEnum<{
            solid: "solid";
            dash: "dash";
            dashDot: "dashDot";
            lgDash: "lgDash";
            lgDashDot: "lgDashDot";
            lgDashDotDot: "lgDashDotDot";
            sysDash: "sysDash";
            sysDot: "sysDot";
        }>>;
    }, z.core.$strip>>;
    borderLeft: z.ZodOptional<z.ZodObject<{
        color: z.ZodOptional<z.ZodString>;
        width: z.ZodOptional<z.ZodNumber>;
        dashType: z.ZodOptional<z.ZodEnum<{
            solid: "solid";
            dash: "dash";
            dashDot: "dashDot";
            lgDash: "lgDash";
            lgDashDot: "lgDashDot";
            lgDashDotDot: "lgDashDotDot";
            sysDash: "sysDash";
            sysDot: "sysDot";
        }>>;
    }, z.core.$strip>>;
    borderRadius: z.ZodOptional<z.ZodNumber>;
    opacity: z.ZodOptional<z.ZodNumber>;
    zIndex: z.ZodOptional<z.ZodNumber>;
    position: z.ZodOptional<z.ZodEnum<{
        relative: "relative";
        absolute: "absolute";
    }>>;
    top: z.ZodOptional<z.ZodNumber>;
    right: z.ZodOptional<z.ZodNumber>;
    bottom: z.ZodOptional<z.ZodNumber>;
    left: z.ZodOptional<z.ZodNumber>;
    alignSelf: z.ZodOptional<z.ZodEnum<{
        start: "start";
        center: "center";
        end: "end";
        stretch: "stretch";
        auto: "auto";
    }>>;
    shadow: z.ZodOptional<z.ZodObject<{
        type: z.ZodOptional<z.ZodEnum<{
            outer: "outer";
            inner: "inner";
        }>>;
        opacity: z.ZodOptional<z.ZodNumber>;
        blur: z.ZodOptional<z.ZodNumber>;
        angle: z.ZodOptional<z.ZodNumber>;
        offset: z.ZodOptional<z.ZodNumber>;
        color: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    master: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
    isDecorative: z.ZodOptional<z.ZodBoolean>;
    flexGrow: z.ZodOptional<z.ZodNumber>;
    flexShrink: z.ZodOptional<z.ZodNumber>;
    flexBasis: z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodLiteral<"max">, z.ZodString]>>;
    id: z.ZodOptional<z.ZodString>;
    group: z.ZodOptional<z.ZodString>;
    __nodeId: z.ZodOptional<z.ZodNumber>;
    type: z.ZodLiteral<"ul">;
    items: z.ZodArray<z.ZodObject<{
        text: z.ZodString;
        runs: z.ZodOptional<z.ZodArray<z.ZodObject<{
            text: z.ZodString;
            bold: z.ZodOptional<z.ZodBoolean>;
            italic: z.ZodOptional<z.ZodBoolean>;
            underline: z.ZodOptional<z.ZodBoolean>;
            strike: z.ZodOptional<z.ZodBoolean>;
            highlight: z.ZodOptional<z.ZodString>;
            color: z.ZodOptional<z.ZodString>;
            href: z.ZodOptional<z.ZodString>;
            lang: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>>;
        bold: z.ZodOptional<z.ZodBoolean>;
        italic: z.ZodOptional<z.ZodBoolean>;
        underline: z.ZodOptional<z.ZodUnion<readonly [z.ZodBoolean, z.ZodObject<{
            style: z.ZodOptional<z.ZodEnum<{
                dash: "dash";
                dashHeavy: "dashHeavy";
                dashLong: "dashLong";
                dashLongHeavy: "dashLongHeavy";
                dbl: "dbl";
                dotDash: "dotDash";
                dotDotDash: "dotDotDash";
                dotted: "dotted";
                dottedHeavy: "dottedHeavy";
                heavy: "heavy";
                none: "none";
                sng: "sng";
                wavy: "wavy";
                wavyDbl: "wavyDbl";
                wavyHeavy: "wavyHeavy";
            }>>;
            color: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>]>>;
        strike: z.ZodOptional<z.ZodBoolean>;
        highlight: z.ZodOptional<z.ZodString>;
        color: z.ZodOptional<z.ZodString>;
        fontSize: z.ZodOptional<z.ZodNumber>;
        fontFamily: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    fontSize: z.ZodOptional<z.ZodNumber>;
    color: z.ZodOptional<z.ZodString>;
    textAlign: z.ZodOptional<z.ZodEnum<{
        right: "right";
        left: "left";
        center: "center";
    }>>;
    bold: z.ZodOptional<z.ZodBoolean>;
    italic: z.ZodOptional<z.ZodBoolean>;
    underline: z.ZodOptional<z.ZodUnion<readonly [z.ZodBoolean, z.ZodObject<{
        style: z.ZodOptional<z.ZodEnum<{
            dash: "dash";
            dashHeavy: "dashHeavy";
            dashLong: "dashLong";
            dashLongHeavy: "dashLongHeavy";
            dbl: "dbl";
            dotDash: "dotDash";
            dotDotDash: "dotDotDash";
            dotted: "dotted";
            dottedHeavy: "dottedHeavy";
            heavy: "heavy";
            none: "none";
            sng: "sng";
            wavy: "wavy";
            wavyDbl: "wavyDbl";
            wavyHeavy: "wavyHeavy";
        }>>;
        color: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>]>>;
    strike: z.ZodOptional<z.ZodBoolean>;
    highlight: z.ZodOptional<z.ZodString>;
    fontFamily: z.ZodOptional<z.ZodString>;
    lineHeight: z.ZodOptional<z.ZodNumber>;
    letterSpacing: z.ZodOptional<z.ZodNumber>;
    bulletIndent: z.ZodOptional<z.ZodNumber>;
    noWrap: z.ZodOptional<z.ZodBoolean>;
    textVAlign: z.ZodOptional<z.ZodEnum<{
        top: "top";
        bottom: "bottom";
        middle: "middle";
    }>>;
}, z.core.$strip>;
export declare const olNodeSchema: z.ZodObject<{
    w: z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodLiteral<"max">, z.ZodString]>>;
    h: z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodLiteral<"max">, z.ZodString]>>;
    minW: z.ZodOptional<z.ZodNumber>;
    maxW: z.ZodOptional<z.ZodNumber>;
    minH: z.ZodOptional<z.ZodNumber>;
    maxH: z.ZodOptional<z.ZodNumber>;
    padding: z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodObject<{
        top: z.ZodOptional<z.ZodNumber>;
        right: z.ZodOptional<z.ZodNumber>;
        bottom: z.ZodOptional<z.ZodNumber>;
        left: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>]>>;
    margin: z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodObject<{
        top: z.ZodOptional<z.ZodNumber>;
        right: z.ZodOptional<z.ZodNumber>;
        bottom: z.ZodOptional<z.ZodNumber>;
        left: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>]>>;
    backgroundColor: z.ZodOptional<z.ZodString>;
    backgroundImage: z.ZodOptional<z.ZodObject<{
        src: z.ZodString;
        sizing: z.ZodOptional<z.ZodEnum<{
            cover: "cover";
            contain: "contain";
        }>>;
    }, z.core.$strip>>;
    border: z.ZodOptional<z.ZodObject<{
        color: z.ZodOptional<z.ZodString>;
        width: z.ZodOptional<z.ZodNumber>;
        dashType: z.ZodOptional<z.ZodEnum<{
            solid: "solid";
            dash: "dash";
            dashDot: "dashDot";
            lgDash: "lgDash";
            lgDashDot: "lgDashDot";
            lgDashDotDot: "lgDashDotDot";
            sysDash: "sysDash";
            sysDot: "sysDot";
        }>>;
    }, z.core.$strip>>;
    borderTop: z.ZodOptional<z.ZodObject<{
        color: z.ZodOptional<z.ZodString>;
        width: z.ZodOptional<z.ZodNumber>;
        dashType: z.ZodOptional<z.ZodEnum<{
            solid: "solid";
            dash: "dash";
            dashDot: "dashDot";
            lgDash: "lgDash";
            lgDashDot: "lgDashDot";
            lgDashDotDot: "lgDashDotDot";
            sysDash: "sysDash";
            sysDot: "sysDot";
        }>>;
    }, z.core.$strip>>;
    borderRight: z.ZodOptional<z.ZodObject<{
        color: z.ZodOptional<z.ZodString>;
        width: z.ZodOptional<z.ZodNumber>;
        dashType: z.ZodOptional<z.ZodEnum<{
            solid: "solid";
            dash: "dash";
            dashDot: "dashDot";
            lgDash: "lgDash";
            lgDashDot: "lgDashDot";
            lgDashDotDot: "lgDashDotDot";
            sysDash: "sysDash";
            sysDot: "sysDot";
        }>>;
    }, z.core.$strip>>;
    borderBottom: z.ZodOptional<z.ZodObject<{
        color: z.ZodOptional<z.ZodString>;
        width: z.ZodOptional<z.ZodNumber>;
        dashType: z.ZodOptional<z.ZodEnum<{
            solid: "solid";
            dash: "dash";
            dashDot: "dashDot";
            lgDash: "lgDash";
            lgDashDot: "lgDashDot";
            lgDashDotDot: "lgDashDotDot";
            sysDash: "sysDash";
            sysDot: "sysDot";
        }>>;
    }, z.core.$strip>>;
    borderLeft: z.ZodOptional<z.ZodObject<{
        color: z.ZodOptional<z.ZodString>;
        width: z.ZodOptional<z.ZodNumber>;
        dashType: z.ZodOptional<z.ZodEnum<{
            solid: "solid";
            dash: "dash";
            dashDot: "dashDot";
            lgDash: "lgDash";
            lgDashDot: "lgDashDot";
            lgDashDotDot: "lgDashDotDot";
            sysDash: "sysDash";
            sysDot: "sysDot";
        }>>;
    }, z.core.$strip>>;
    borderRadius: z.ZodOptional<z.ZodNumber>;
    opacity: z.ZodOptional<z.ZodNumber>;
    zIndex: z.ZodOptional<z.ZodNumber>;
    position: z.ZodOptional<z.ZodEnum<{
        relative: "relative";
        absolute: "absolute";
    }>>;
    top: z.ZodOptional<z.ZodNumber>;
    right: z.ZodOptional<z.ZodNumber>;
    bottom: z.ZodOptional<z.ZodNumber>;
    left: z.ZodOptional<z.ZodNumber>;
    alignSelf: z.ZodOptional<z.ZodEnum<{
        start: "start";
        center: "center";
        end: "end";
        stretch: "stretch";
        auto: "auto";
    }>>;
    shadow: z.ZodOptional<z.ZodObject<{
        type: z.ZodOptional<z.ZodEnum<{
            outer: "outer";
            inner: "inner";
        }>>;
        opacity: z.ZodOptional<z.ZodNumber>;
        blur: z.ZodOptional<z.ZodNumber>;
        angle: z.ZodOptional<z.ZodNumber>;
        offset: z.ZodOptional<z.ZodNumber>;
        color: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    master: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
    isDecorative: z.ZodOptional<z.ZodBoolean>;
    flexGrow: z.ZodOptional<z.ZodNumber>;
    flexShrink: z.ZodOptional<z.ZodNumber>;
    flexBasis: z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodLiteral<"max">, z.ZodString]>>;
    id: z.ZodOptional<z.ZodString>;
    group: z.ZodOptional<z.ZodString>;
    __nodeId: z.ZodOptional<z.ZodNumber>;
    type: z.ZodLiteral<"ol">;
    items: z.ZodArray<z.ZodObject<{
        text: z.ZodString;
        runs: z.ZodOptional<z.ZodArray<z.ZodObject<{
            text: z.ZodString;
            bold: z.ZodOptional<z.ZodBoolean>;
            italic: z.ZodOptional<z.ZodBoolean>;
            underline: z.ZodOptional<z.ZodBoolean>;
            strike: z.ZodOptional<z.ZodBoolean>;
            highlight: z.ZodOptional<z.ZodString>;
            color: z.ZodOptional<z.ZodString>;
            href: z.ZodOptional<z.ZodString>;
            lang: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>>;
        bold: z.ZodOptional<z.ZodBoolean>;
        italic: z.ZodOptional<z.ZodBoolean>;
        underline: z.ZodOptional<z.ZodUnion<readonly [z.ZodBoolean, z.ZodObject<{
            style: z.ZodOptional<z.ZodEnum<{
                dash: "dash";
                dashHeavy: "dashHeavy";
                dashLong: "dashLong";
                dashLongHeavy: "dashLongHeavy";
                dbl: "dbl";
                dotDash: "dotDash";
                dotDotDash: "dotDotDash";
                dotted: "dotted";
                dottedHeavy: "dottedHeavy";
                heavy: "heavy";
                none: "none";
                sng: "sng";
                wavy: "wavy";
                wavyDbl: "wavyDbl";
                wavyHeavy: "wavyHeavy";
            }>>;
            color: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>]>>;
        strike: z.ZodOptional<z.ZodBoolean>;
        highlight: z.ZodOptional<z.ZodString>;
        color: z.ZodOptional<z.ZodString>;
        fontSize: z.ZodOptional<z.ZodNumber>;
        fontFamily: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    fontSize: z.ZodOptional<z.ZodNumber>;
    color: z.ZodOptional<z.ZodString>;
    textAlign: z.ZodOptional<z.ZodEnum<{
        right: "right";
        left: "left";
        center: "center";
    }>>;
    bold: z.ZodOptional<z.ZodBoolean>;
    italic: z.ZodOptional<z.ZodBoolean>;
    underline: z.ZodOptional<z.ZodUnion<readonly [z.ZodBoolean, z.ZodObject<{
        style: z.ZodOptional<z.ZodEnum<{
            dash: "dash";
            dashHeavy: "dashHeavy";
            dashLong: "dashLong";
            dashLongHeavy: "dashLongHeavy";
            dbl: "dbl";
            dotDash: "dotDash";
            dotDotDash: "dotDotDash";
            dotted: "dotted";
            dottedHeavy: "dottedHeavy";
            heavy: "heavy";
            none: "none";
            sng: "sng";
            wavy: "wavy";
            wavyDbl: "wavyDbl";
            wavyHeavy: "wavyHeavy";
        }>>;
        color: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>]>>;
    strike: z.ZodOptional<z.ZodBoolean>;
    highlight: z.ZodOptional<z.ZodString>;
    fontFamily: z.ZodOptional<z.ZodString>;
    lineHeight: z.ZodOptional<z.ZodNumber>;
    letterSpacing: z.ZodOptional<z.ZodNumber>;
    numberType: z.ZodOptional<z.ZodEnum<{
        alphaLcParenBoth: "alphaLcParenBoth";
        alphaLcParenR: "alphaLcParenR";
        alphaLcPeriod: "alphaLcPeriod";
        alphaUcParenBoth: "alphaUcParenBoth";
        alphaUcParenR: "alphaUcParenR";
        alphaUcPeriod: "alphaUcPeriod";
        arabicParenBoth: "arabicParenBoth";
        arabicParenR: "arabicParenR";
        arabicPeriod: "arabicPeriod";
        arabicPlain: "arabicPlain";
        romanLcParenBoth: "romanLcParenBoth";
        romanLcParenR: "romanLcParenR";
        romanLcPeriod: "romanLcPeriod";
        romanUcParenBoth: "romanUcParenBoth";
        romanUcParenR: "romanUcParenR";
        romanUcPeriod: "romanUcPeriod";
    }>>;
    numberStartAt: z.ZodOptional<z.ZodNumber>;
    bulletIndent: z.ZodOptional<z.ZodNumber>;
    noWrap: z.ZodOptional<z.ZodBoolean>;
    textVAlign: z.ZodOptional<z.ZodEnum<{
        top: "top";
        bottom: "bottom";
        middle: "middle";
    }>>;
}, z.core.$strip>;
export declare const imageNodeSchema: z.ZodObject<{
    w: z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodLiteral<"max">, z.ZodString]>>;
    h: z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodLiteral<"max">, z.ZodString]>>;
    minW: z.ZodOptional<z.ZodNumber>;
    maxW: z.ZodOptional<z.ZodNumber>;
    minH: z.ZodOptional<z.ZodNumber>;
    maxH: z.ZodOptional<z.ZodNumber>;
    padding: z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodObject<{
        top: z.ZodOptional<z.ZodNumber>;
        right: z.ZodOptional<z.ZodNumber>;
        bottom: z.ZodOptional<z.ZodNumber>;
        left: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>]>>;
    margin: z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodObject<{
        top: z.ZodOptional<z.ZodNumber>;
        right: z.ZodOptional<z.ZodNumber>;
        bottom: z.ZodOptional<z.ZodNumber>;
        left: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>]>>;
    backgroundColor: z.ZodOptional<z.ZodString>;
    backgroundImage: z.ZodOptional<z.ZodObject<{
        src: z.ZodString;
        sizing: z.ZodOptional<z.ZodEnum<{
            cover: "cover";
            contain: "contain";
        }>>;
    }, z.core.$strip>>;
    border: z.ZodOptional<z.ZodObject<{
        color: z.ZodOptional<z.ZodString>;
        width: z.ZodOptional<z.ZodNumber>;
        dashType: z.ZodOptional<z.ZodEnum<{
            solid: "solid";
            dash: "dash";
            dashDot: "dashDot";
            lgDash: "lgDash";
            lgDashDot: "lgDashDot";
            lgDashDotDot: "lgDashDotDot";
            sysDash: "sysDash";
            sysDot: "sysDot";
        }>>;
    }, z.core.$strip>>;
    borderTop: z.ZodOptional<z.ZodObject<{
        color: z.ZodOptional<z.ZodString>;
        width: z.ZodOptional<z.ZodNumber>;
        dashType: z.ZodOptional<z.ZodEnum<{
            solid: "solid";
            dash: "dash";
            dashDot: "dashDot";
            lgDash: "lgDash";
            lgDashDot: "lgDashDot";
            lgDashDotDot: "lgDashDotDot";
            sysDash: "sysDash";
            sysDot: "sysDot";
        }>>;
    }, z.core.$strip>>;
    borderRight: z.ZodOptional<z.ZodObject<{
        color: z.ZodOptional<z.ZodString>;
        width: z.ZodOptional<z.ZodNumber>;
        dashType: z.ZodOptional<z.ZodEnum<{
            solid: "solid";
            dash: "dash";
            dashDot: "dashDot";
            lgDash: "lgDash";
            lgDashDot: "lgDashDot";
            lgDashDotDot: "lgDashDotDot";
            sysDash: "sysDash";
            sysDot: "sysDot";
        }>>;
    }, z.core.$strip>>;
    borderBottom: z.ZodOptional<z.ZodObject<{
        color: z.ZodOptional<z.ZodString>;
        width: z.ZodOptional<z.ZodNumber>;
        dashType: z.ZodOptional<z.ZodEnum<{
            solid: "solid";
            dash: "dash";
            dashDot: "dashDot";
            lgDash: "lgDash";
            lgDashDot: "lgDashDot";
            lgDashDotDot: "lgDashDotDot";
            sysDash: "sysDash";
            sysDot: "sysDot";
        }>>;
    }, z.core.$strip>>;
    borderLeft: z.ZodOptional<z.ZodObject<{
        color: z.ZodOptional<z.ZodString>;
        width: z.ZodOptional<z.ZodNumber>;
        dashType: z.ZodOptional<z.ZodEnum<{
            solid: "solid";
            dash: "dash";
            dashDot: "dashDot";
            lgDash: "lgDash";
            lgDashDot: "lgDashDot";
            lgDashDotDot: "lgDashDotDot";
            sysDash: "sysDash";
            sysDot: "sysDot";
        }>>;
    }, z.core.$strip>>;
    borderRadius: z.ZodOptional<z.ZodNumber>;
    opacity: z.ZodOptional<z.ZodNumber>;
    zIndex: z.ZodOptional<z.ZodNumber>;
    position: z.ZodOptional<z.ZodEnum<{
        relative: "relative";
        absolute: "absolute";
    }>>;
    top: z.ZodOptional<z.ZodNumber>;
    right: z.ZodOptional<z.ZodNumber>;
    bottom: z.ZodOptional<z.ZodNumber>;
    left: z.ZodOptional<z.ZodNumber>;
    alignSelf: z.ZodOptional<z.ZodEnum<{
        start: "start";
        center: "center";
        end: "end";
        stretch: "stretch";
        auto: "auto";
    }>>;
    shadow: z.ZodOptional<z.ZodObject<{
        type: z.ZodOptional<z.ZodEnum<{
            outer: "outer";
            inner: "inner";
        }>>;
        opacity: z.ZodOptional<z.ZodNumber>;
        blur: z.ZodOptional<z.ZodNumber>;
        angle: z.ZodOptional<z.ZodNumber>;
        offset: z.ZodOptional<z.ZodNumber>;
        color: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    master: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
    isDecorative: z.ZodOptional<z.ZodBoolean>;
    flexGrow: z.ZodOptional<z.ZodNumber>;
    flexShrink: z.ZodOptional<z.ZodNumber>;
    flexBasis: z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodLiteral<"max">, z.ZodString]>>;
    id: z.ZodOptional<z.ZodString>;
    group: z.ZodOptional<z.ZodString>;
    __nodeId: z.ZodOptional<z.ZodNumber>;
    type: z.ZodLiteral<"image">;
    src: z.ZodString;
    sizing: z.ZodOptional<z.ZodObject<{
        type: z.ZodEnum<{
            crop: "crop";
            cover: "cover";
            contain: "contain";
        }>;
        w: z.ZodOptional<z.ZodNumber>;
        h: z.ZodOptional<z.ZodNumber>;
        x: z.ZodOptional<z.ZodNumber>;
        y: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>>;
    altText: z.ZodOptional<z.ZodString>;
    rotate: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export declare const iconNodeSchema: z.ZodObject<{
    w: z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodLiteral<"max">, z.ZodString]>>;
    h: z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodLiteral<"max">, z.ZodString]>>;
    minW: z.ZodOptional<z.ZodNumber>;
    maxW: z.ZodOptional<z.ZodNumber>;
    minH: z.ZodOptional<z.ZodNumber>;
    maxH: z.ZodOptional<z.ZodNumber>;
    padding: z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodObject<{
        top: z.ZodOptional<z.ZodNumber>;
        right: z.ZodOptional<z.ZodNumber>;
        bottom: z.ZodOptional<z.ZodNumber>;
        left: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>]>>;
    margin: z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodObject<{
        top: z.ZodOptional<z.ZodNumber>;
        right: z.ZodOptional<z.ZodNumber>;
        bottom: z.ZodOptional<z.ZodNumber>;
        left: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>]>>;
    backgroundImage: z.ZodOptional<z.ZodObject<{
        src: z.ZodString;
        sizing: z.ZodOptional<z.ZodEnum<{
            cover: "cover";
            contain: "contain";
        }>>;
    }, z.core.$strip>>;
    border: z.ZodOptional<z.ZodObject<{
        color: z.ZodOptional<z.ZodString>;
        width: z.ZodOptional<z.ZodNumber>;
        dashType: z.ZodOptional<z.ZodEnum<{
            solid: "solid";
            dash: "dash";
            dashDot: "dashDot";
            lgDash: "lgDash";
            lgDashDot: "lgDashDot";
            lgDashDotDot: "lgDashDotDot";
            sysDash: "sysDash";
            sysDot: "sysDot";
        }>>;
    }, z.core.$strip>>;
    borderTop: z.ZodOptional<z.ZodObject<{
        color: z.ZodOptional<z.ZodString>;
        width: z.ZodOptional<z.ZodNumber>;
        dashType: z.ZodOptional<z.ZodEnum<{
            solid: "solid";
            dash: "dash";
            dashDot: "dashDot";
            lgDash: "lgDash";
            lgDashDot: "lgDashDot";
            lgDashDotDot: "lgDashDotDot";
            sysDash: "sysDash";
            sysDot: "sysDot";
        }>>;
    }, z.core.$strip>>;
    borderRight: z.ZodOptional<z.ZodObject<{
        color: z.ZodOptional<z.ZodString>;
        width: z.ZodOptional<z.ZodNumber>;
        dashType: z.ZodOptional<z.ZodEnum<{
            solid: "solid";
            dash: "dash";
            dashDot: "dashDot";
            lgDash: "lgDash";
            lgDashDot: "lgDashDot";
            lgDashDotDot: "lgDashDotDot";
            sysDash: "sysDash";
            sysDot: "sysDot";
        }>>;
    }, z.core.$strip>>;
    borderBottom: z.ZodOptional<z.ZodObject<{
        color: z.ZodOptional<z.ZodString>;
        width: z.ZodOptional<z.ZodNumber>;
        dashType: z.ZodOptional<z.ZodEnum<{
            solid: "solid";
            dash: "dash";
            dashDot: "dashDot";
            lgDash: "lgDash";
            lgDashDot: "lgDashDot";
            lgDashDotDot: "lgDashDotDot";
            sysDash: "sysDash";
            sysDot: "sysDot";
        }>>;
    }, z.core.$strip>>;
    borderLeft: z.ZodOptional<z.ZodObject<{
        color: z.ZodOptional<z.ZodString>;
        width: z.ZodOptional<z.ZodNumber>;
        dashType: z.ZodOptional<z.ZodEnum<{
            solid: "solid";
            dash: "dash";
            dashDot: "dashDot";
            lgDash: "lgDash";
            lgDashDot: "lgDashDot";
            lgDashDotDot: "lgDashDotDot";
            sysDash: "sysDash";
            sysDot: "sysDot";
        }>>;
    }, z.core.$strip>>;
    borderRadius: z.ZodOptional<z.ZodNumber>;
    opacity: z.ZodOptional<z.ZodNumber>;
    zIndex: z.ZodOptional<z.ZodNumber>;
    position: z.ZodOptional<z.ZodEnum<{
        relative: "relative";
        absolute: "absolute";
    }>>;
    top: z.ZodOptional<z.ZodNumber>;
    right: z.ZodOptional<z.ZodNumber>;
    bottom: z.ZodOptional<z.ZodNumber>;
    left: z.ZodOptional<z.ZodNumber>;
    alignSelf: z.ZodOptional<z.ZodEnum<{
        start: "start";
        center: "center";
        end: "end";
        stretch: "stretch";
        auto: "auto";
    }>>;
    shadow: z.ZodOptional<z.ZodObject<{
        type: z.ZodOptional<z.ZodEnum<{
            outer: "outer";
            inner: "inner";
        }>>;
        opacity: z.ZodOptional<z.ZodNumber>;
        blur: z.ZodOptional<z.ZodNumber>;
        angle: z.ZodOptional<z.ZodNumber>;
        offset: z.ZodOptional<z.ZodNumber>;
        color: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    master: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
    isDecorative: z.ZodOptional<z.ZodBoolean>;
    flexGrow: z.ZodOptional<z.ZodNumber>;
    flexShrink: z.ZodOptional<z.ZodNumber>;
    flexBasis: z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodLiteral<"max">, z.ZodString]>>;
    id: z.ZodOptional<z.ZodString>;
    group: z.ZodOptional<z.ZodString>;
    __nodeId: z.ZodOptional<z.ZodNumber>;
    type: z.ZodLiteral<"icon">;
    name: z.ZodEnum<{
        [x: string]: string;
    }>;
    size: z.ZodOptional<z.ZodNumber>;
    color: z.ZodOptional<z.ZodString>;
    variant: z.ZodOptional<z.ZodEnum<{
        "circle-filled": "circle-filled";
        "circle-outlined": "circle-outlined";
        "square-filled": "square-filled";
        "square-outlined": "square-outlined";
    }>>;
    backgroundColor: z.ZodOptional<z.ZodString>;
    altText: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type IconNode = z.infer<typeof iconNodeSchema>;
export declare const svgNodeSchema: z.ZodObject<{
    minW: z.ZodOptional<z.ZodNumber>;
    maxW: z.ZodOptional<z.ZodNumber>;
    minH: z.ZodOptional<z.ZodNumber>;
    maxH: z.ZodOptional<z.ZodNumber>;
    padding: z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodObject<{
        top: z.ZodOptional<z.ZodNumber>;
        right: z.ZodOptional<z.ZodNumber>;
        bottom: z.ZodOptional<z.ZodNumber>;
        left: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>]>>;
    margin: z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodObject<{
        top: z.ZodOptional<z.ZodNumber>;
        right: z.ZodOptional<z.ZodNumber>;
        bottom: z.ZodOptional<z.ZodNumber>;
        left: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>]>>;
    backgroundColor: z.ZodOptional<z.ZodString>;
    backgroundImage: z.ZodOptional<z.ZodObject<{
        src: z.ZodString;
        sizing: z.ZodOptional<z.ZodEnum<{
            cover: "cover";
            contain: "contain";
        }>>;
    }, z.core.$strip>>;
    border: z.ZodOptional<z.ZodObject<{
        color: z.ZodOptional<z.ZodString>;
        width: z.ZodOptional<z.ZodNumber>;
        dashType: z.ZodOptional<z.ZodEnum<{
            solid: "solid";
            dash: "dash";
            dashDot: "dashDot";
            lgDash: "lgDash";
            lgDashDot: "lgDashDot";
            lgDashDotDot: "lgDashDotDot";
            sysDash: "sysDash";
            sysDot: "sysDot";
        }>>;
    }, z.core.$strip>>;
    borderTop: z.ZodOptional<z.ZodObject<{
        color: z.ZodOptional<z.ZodString>;
        width: z.ZodOptional<z.ZodNumber>;
        dashType: z.ZodOptional<z.ZodEnum<{
            solid: "solid";
            dash: "dash";
            dashDot: "dashDot";
            lgDash: "lgDash";
            lgDashDot: "lgDashDot";
            lgDashDotDot: "lgDashDotDot";
            sysDash: "sysDash";
            sysDot: "sysDot";
        }>>;
    }, z.core.$strip>>;
    borderRight: z.ZodOptional<z.ZodObject<{
        color: z.ZodOptional<z.ZodString>;
        width: z.ZodOptional<z.ZodNumber>;
        dashType: z.ZodOptional<z.ZodEnum<{
            solid: "solid";
            dash: "dash";
            dashDot: "dashDot";
            lgDash: "lgDash";
            lgDashDot: "lgDashDot";
            lgDashDotDot: "lgDashDotDot";
            sysDash: "sysDash";
            sysDot: "sysDot";
        }>>;
    }, z.core.$strip>>;
    borderBottom: z.ZodOptional<z.ZodObject<{
        color: z.ZodOptional<z.ZodString>;
        width: z.ZodOptional<z.ZodNumber>;
        dashType: z.ZodOptional<z.ZodEnum<{
            solid: "solid";
            dash: "dash";
            dashDot: "dashDot";
            lgDash: "lgDash";
            lgDashDot: "lgDashDot";
            lgDashDotDot: "lgDashDotDot";
            sysDash: "sysDash";
            sysDot: "sysDot";
        }>>;
    }, z.core.$strip>>;
    borderLeft: z.ZodOptional<z.ZodObject<{
        color: z.ZodOptional<z.ZodString>;
        width: z.ZodOptional<z.ZodNumber>;
        dashType: z.ZodOptional<z.ZodEnum<{
            solid: "solid";
            dash: "dash";
            dashDot: "dashDot";
            lgDash: "lgDash";
            lgDashDot: "lgDashDot";
            lgDashDotDot: "lgDashDotDot";
            sysDash: "sysDash";
            sysDot: "sysDot";
        }>>;
    }, z.core.$strip>>;
    borderRadius: z.ZodOptional<z.ZodNumber>;
    opacity: z.ZodOptional<z.ZodNumber>;
    zIndex: z.ZodOptional<z.ZodNumber>;
    position: z.ZodOptional<z.ZodEnum<{
        relative: "relative";
        absolute: "absolute";
    }>>;
    top: z.ZodOptional<z.ZodNumber>;
    right: z.ZodOptional<z.ZodNumber>;
    bottom: z.ZodOptional<z.ZodNumber>;
    left: z.ZodOptional<z.ZodNumber>;
    alignSelf: z.ZodOptional<z.ZodEnum<{
        start: "start";
        center: "center";
        end: "end";
        stretch: "stretch";
        auto: "auto";
    }>>;
    shadow: z.ZodOptional<z.ZodObject<{
        type: z.ZodOptional<z.ZodEnum<{
            outer: "outer";
            inner: "inner";
        }>>;
        opacity: z.ZodOptional<z.ZodNumber>;
        blur: z.ZodOptional<z.ZodNumber>;
        angle: z.ZodOptional<z.ZodNumber>;
        offset: z.ZodOptional<z.ZodNumber>;
        color: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    master: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
    isDecorative: z.ZodOptional<z.ZodBoolean>;
    flexGrow: z.ZodOptional<z.ZodNumber>;
    flexShrink: z.ZodOptional<z.ZodNumber>;
    flexBasis: z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodLiteral<"max">, z.ZodString]>>;
    id: z.ZodOptional<z.ZodString>;
    group: z.ZodOptional<z.ZodString>;
    __nodeId: z.ZodOptional<z.ZodNumber>;
    type: z.ZodLiteral<"svg">;
    svgContent: z.ZodString;
    w: z.ZodOptional<z.ZodNumber>;
    h: z.ZodOptional<z.ZodNumber>;
    color: z.ZodOptional<z.ZodString>;
    altText: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type SvgNode = z.infer<typeof svgNodeSchema>;
export declare const tableNodeSchema: z.ZodObject<{
    w: z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodLiteral<"max">, z.ZodString]>>;
    h: z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodLiteral<"max">, z.ZodString]>>;
    minW: z.ZodOptional<z.ZodNumber>;
    maxW: z.ZodOptional<z.ZodNumber>;
    minH: z.ZodOptional<z.ZodNumber>;
    maxH: z.ZodOptional<z.ZodNumber>;
    padding: z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodObject<{
        top: z.ZodOptional<z.ZodNumber>;
        right: z.ZodOptional<z.ZodNumber>;
        bottom: z.ZodOptional<z.ZodNumber>;
        left: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>]>>;
    margin: z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodObject<{
        top: z.ZodOptional<z.ZodNumber>;
        right: z.ZodOptional<z.ZodNumber>;
        bottom: z.ZodOptional<z.ZodNumber>;
        left: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>]>>;
    backgroundColor: z.ZodOptional<z.ZodString>;
    backgroundImage: z.ZodOptional<z.ZodObject<{
        src: z.ZodString;
        sizing: z.ZodOptional<z.ZodEnum<{
            cover: "cover";
            contain: "contain";
        }>>;
    }, z.core.$strip>>;
    border: z.ZodOptional<z.ZodObject<{
        color: z.ZodOptional<z.ZodString>;
        width: z.ZodOptional<z.ZodNumber>;
        dashType: z.ZodOptional<z.ZodEnum<{
            solid: "solid";
            dash: "dash";
            dashDot: "dashDot";
            lgDash: "lgDash";
            lgDashDot: "lgDashDot";
            lgDashDotDot: "lgDashDotDot";
            sysDash: "sysDash";
            sysDot: "sysDot";
        }>>;
    }, z.core.$strip>>;
    borderTop: z.ZodOptional<z.ZodObject<{
        color: z.ZodOptional<z.ZodString>;
        width: z.ZodOptional<z.ZodNumber>;
        dashType: z.ZodOptional<z.ZodEnum<{
            solid: "solid";
            dash: "dash";
            dashDot: "dashDot";
            lgDash: "lgDash";
            lgDashDot: "lgDashDot";
            lgDashDotDot: "lgDashDotDot";
            sysDash: "sysDash";
            sysDot: "sysDot";
        }>>;
    }, z.core.$strip>>;
    borderRight: z.ZodOptional<z.ZodObject<{
        color: z.ZodOptional<z.ZodString>;
        width: z.ZodOptional<z.ZodNumber>;
        dashType: z.ZodOptional<z.ZodEnum<{
            solid: "solid";
            dash: "dash";
            dashDot: "dashDot";
            lgDash: "lgDash";
            lgDashDot: "lgDashDot";
            lgDashDotDot: "lgDashDotDot";
            sysDash: "sysDash";
            sysDot: "sysDot";
        }>>;
    }, z.core.$strip>>;
    borderBottom: z.ZodOptional<z.ZodObject<{
        color: z.ZodOptional<z.ZodString>;
        width: z.ZodOptional<z.ZodNumber>;
        dashType: z.ZodOptional<z.ZodEnum<{
            solid: "solid";
            dash: "dash";
            dashDot: "dashDot";
            lgDash: "lgDash";
            lgDashDot: "lgDashDot";
            lgDashDotDot: "lgDashDotDot";
            sysDash: "sysDash";
            sysDot: "sysDot";
        }>>;
    }, z.core.$strip>>;
    borderLeft: z.ZodOptional<z.ZodObject<{
        color: z.ZodOptional<z.ZodString>;
        width: z.ZodOptional<z.ZodNumber>;
        dashType: z.ZodOptional<z.ZodEnum<{
            solid: "solid";
            dash: "dash";
            dashDot: "dashDot";
            lgDash: "lgDash";
            lgDashDot: "lgDashDot";
            lgDashDotDot: "lgDashDotDot";
            sysDash: "sysDash";
            sysDot: "sysDot";
        }>>;
    }, z.core.$strip>>;
    borderRadius: z.ZodOptional<z.ZodNumber>;
    opacity: z.ZodOptional<z.ZodNumber>;
    zIndex: z.ZodOptional<z.ZodNumber>;
    position: z.ZodOptional<z.ZodEnum<{
        relative: "relative";
        absolute: "absolute";
    }>>;
    top: z.ZodOptional<z.ZodNumber>;
    right: z.ZodOptional<z.ZodNumber>;
    bottom: z.ZodOptional<z.ZodNumber>;
    left: z.ZodOptional<z.ZodNumber>;
    alignSelf: z.ZodOptional<z.ZodEnum<{
        start: "start";
        center: "center";
        end: "end";
        stretch: "stretch";
        auto: "auto";
    }>>;
    shadow: z.ZodOptional<z.ZodObject<{
        type: z.ZodOptional<z.ZodEnum<{
            outer: "outer";
            inner: "inner";
        }>>;
        opacity: z.ZodOptional<z.ZodNumber>;
        blur: z.ZodOptional<z.ZodNumber>;
        angle: z.ZodOptional<z.ZodNumber>;
        offset: z.ZodOptional<z.ZodNumber>;
        color: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    master: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
    isDecorative: z.ZodOptional<z.ZodBoolean>;
    flexGrow: z.ZodOptional<z.ZodNumber>;
    flexShrink: z.ZodOptional<z.ZodNumber>;
    flexBasis: z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodLiteral<"max">, z.ZodString]>>;
    id: z.ZodOptional<z.ZodString>;
    group: z.ZodOptional<z.ZodString>;
    __nodeId: z.ZodOptional<z.ZodNumber>;
    type: z.ZodLiteral<"table">;
    columns: z.ZodArray<z.ZodObject<{
        width: z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodLiteral<"max">, z.ZodString]>>;
        w: z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodLiteral<"max">, z.ZodString]>>;
    }, z.core.$strip>>;
    rows: z.ZodArray<z.ZodObject<{
        cells: z.ZodArray<z.ZodObject<{
            text: z.ZodString;
            runs: z.ZodOptional<z.ZodArray<z.ZodObject<{
                text: z.ZodString;
                bold: z.ZodOptional<z.ZodBoolean>;
                italic: z.ZodOptional<z.ZodBoolean>;
                underline: z.ZodOptional<z.ZodBoolean>;
                strike: z.ZodOptional<z.ZodBoolean>;
                highlight: z.ZodOptional<z.ZodString>;
                color: z.ZodOptional<z.ZodString>;
                href: z.ZodOptional<z.ZodString>;
                lang: z.ZodOptional<z.ZodString>;
            }, z.core.$strip>>>;
            fontSize: z.ZodOptional<z.ZodNumber>;
            fontFamily: z.ZodOptional<z.ZodString>;
            color: z.ZodOptional<z.ZodString>;
            bold: z.ZodOptional<z.ZodBoolean>;
            italic: z.ZodOptional<z.ZodBoolean>;
            underline: z.ZodOptional<z.ZodUnion<readonly [z.ZodBoolean, z.ZodObject<{
                style: z.ZodOptional<z.ZodEnum<{
                    dash: "dash";
                    dashHeavy: "dashHeavy";
                    dashLong: "dashLong";
                    dashLongHeavy: "dashLongHeavy";
                    dbl: "dbl";
                    dotDash: "dotDash";
                    dotDotDash: "dotDotDash";
                    dotted: "dotted";
                    dottedHeavy: "dottedHeavy";
                    heavy: "heavy";
                    none: "none";
                    sng: "sng";
                    wavy: "wavy";
                    wavyDbl: "wavyDbl";
                    wavyHeavy: "wavyHeavy";
                }>>;
                color: z.ZodOptional<z.ZodString>;
            }, z.core.$strip>]>>;
            strike: z.ZodOptional<z.ZodBoolean>;
            highlight: z.ZodOptional<z.ZodString>;
            textAlign: z.ZodOptional<z.ZodEnum<{
                right: "right";
                left: "left";
                center: "center";
            }>>;
            verticalAlign: z.ZodOptional<z.ZodEnum<{
                top: "top";
                bottom: "bottom";
                middle: "middle";
            }>>;
            backgroundColor: z.ZodOptional<z.ZodString>;
            colspan: z.ZodOptional<z.ZodNumber>;
            rowspan: z.ZodOptional<z.ZodNumber>;
            letterSpacing: z.ZodOptional<z.ZodNumber>;
            margin: z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodObject<{
                top: z.ZodOptional<z.ZodNumber>;
                right: z.ZodOptional<z.ZodNumber>;
                bottom: z.ZodOptional<z.ZodNumber>;
                left: z.ZodOptional<z.ZodNumber>;
            }, z.core.$strip>]>>;
            padding: z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodObject<{
                top: z.ZodOptional<z.ZodNumber>;
                right: z.ZodOptional<z.ZodNumber>;
                bottom: z.ZodOptional<z.ZodNumber>;
                left: z.ZodOptional<z.ZodNumber>;
            }, z.core.$strip>]>>;
        }, z.core.$strip>>;
        height: z.ZodOptional<z.ZodNumber>;
        h: z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodLiteral<"max">, z.ZodString]>>;
    }, z.core.$strip>>;
    defaultRowHeight: z.ZodOptional<z.ZodNumber>;
    cellBorder: z.ZodOptional<z.ZodObject<{
        color: z.ZodOptional<z.ZodString>;
        width: z.ZodOptional<z.ZodNumber>;
        dashType: z.ZodOptional<z.ZodEnum<{
            solid: "solid";
            dash: "dash";
            dashDot: "dashDot";
            lgDash: "lgDash";
            lgDashDot: "lgDashDot";
            lgDashDotDot: "lgDashDotDot";
            sysDash: "sysDash";
            sysDot: "sysDot";
        }>>;
    }, z.core.$strip>>;
    cellMargin: z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodObject<{
        top: z.ZodOptional<z.ZodNumber>;
        right: z.ZodOptional<z.ZodNumber>;
        bottom: z.ZodOptional<z.ZodNumber>;
        left: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>]>>;
}, z.core.$strip>;
export declare const shapeNodeSchema: z.ZodObject<{
    w: z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodLiteral<"max">, z.ZodString]>>;
    h: z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodLiteral<"max">, z.ZodString]>>;
    minW: z.ZodOptional<z.ZodNumber>;
    maxW: z.ZodOptional<z.ZodNumber>;
    minH: z.ZodOptional<z.ZodNumber>;
    maxH: z.ZodOptional<z.ZodNumber>;
    padding: z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodObject<{
        top: z.ZodOptional<z.ZodNumber>;
        right: z.ZodOptional<z.ZodNumber>;
        bottom: z.ZodOptional<z.ZodNumber>;
        left: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>]>>;
    margin: z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodObject<{
        top: z.ZodOptional<z.ZodNumber>;
        right: z.ZodOptional<z.ZodNumber>;
        bottom: z.ZodOptional<z.ZodNumber>;
        left: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>]>>;
    backgroundColor: z.ZodOptional<z.ZodString>;
    backgroundImage: z.ZodOptional<z.ZodObject<{
        src: z.ZodString;
        sizing: z.ZodOptional<z.ZodEnum<{
            cover: "cover";
            contain: "contain";
        }>>;
    }, z.core.$strip>>;
    border: z.ZodOptional<z.ZodObject<{
        color: z.ZodOptional<z.ZodString>;
        width: z.ZodOptional<z.ZodNumber>;
        dashType: z.ZodOptional<z.ZodEnum<{
            solid: "solid";
            dash: "dash";
            dashDot: "dashDot";
            lgDash: "lgDash";
            lgDashDot: "lgDashDot";
            lgDashDotDot: "lgDashDotDot";
            sysDash: "sysDash";
            sysDot: "sysDot";
        }>>;
    }, z.core.$strip>>;
    borderTop: z.ZodOptional<z.ZodObject<{
        color: z.ZodOptional<z.ZodString>;
        width: z.ZodOptional<z.ZodNumber>;
        dashType: z.ZodOptional<z.ZodEnum<{
            solid: "solid";
            dash: "dash";
            dashDot: "dashDot";
            lgDash: "lgDash";
            lgDashDot: "lgDashDot";
            lgDashDotDot: "lgDashDotDot";
            sysDash: "sysDash";
            sysDot: "sysDot";
        }>>;
    }, z.core.$strip>>;
    borderRight: z.ZodOptional<z.ZodObject<{
        color: z.ZodOptional<z.ZodString>;
        width: z.ZodOptional<z.ZodNumber>;
        dashType: z.ZodOptional<z.ZodEnum<{
            solid: "solid";
            dash: "dash";
            dashDot: "dashDot";
            lgDash: "lgDash";
            lgDashDot: "lgDashDot";
            lgDashDotDot: "lgDashDotDot";
            sysDash: "sysDash";
            sysDot: "sysDot";
        }>>;
    }, z.core.$strip>>;
    borderBottom: z.ZodOptional<z.ZodObject<{
        color: z.ZodOptional<z.ZodString>;
        width: z.ZodOptional<z.ZodNumber>;
        dashType: z.ZodOptional<z.ZodEnum<{
            solid: "solid";
            dash: "dash";
            dashDot: "dashDot";
            lgDash: "lgDash";
            lgDashDot: "lgDashDot";
            lgDashDotDot: "lgDashDotDot";
            sysDash: "sysDash";
            sysDot: "sysDot";
        }>>;
    }, z.core.$strip>>;
    borderLeft: z.ZodOptional<z.ZodObject<{
        color: z.ZodOptional<z.ZodString>;
        width: z.ZodOptional<z.ZodNumber>;
        dashType: z.ZodOptional<z.ZodEnum<{
            solid: "solid";
            dash: "dash";
            dashDot: "dashDot";
            lgDash: "lgDash";
            lgDashDot: "lgDashDot";
            lgDashDotDot: "lgDashDotDot";
            sysDash: "sysDash";
            sysDot: "sysDot";
        }>>;
    }, z.core.$strip>>;
    borderRadius: z.ZodOptional<z.ZodNumber>;
    opacity: z.ZodOptional<z.ZodNumber>;
    zIndex: z.ZodOptional<z.ZodNumber>;
    position: z.ZodOptional<z.ZodEnum<{
        relative: "relative";
        absolute: "absolute";
    }>>;
    top: z.ZodOptional<z.ZodNumber>;
    right: z.ZodOptional<z.ZodNumber>;
    bottom: z.ZodOptional<z.ZodNumber>;
    left: z.ZodOptional<z.ZodNumber>;
    alignSelf: z.ZodOptional<z.ZodEnum<{
        start: "start";
        center: "center";
        end: "end";
        stretch: "stretch";
        auto: "auto";
    }>>;
    shadow: z.ZodOptional<z.ZodObject<{
        type: z.ZodOptional<z.ZodEnum<{
            outer: "outer";
            inner: "inner";
        }>>;
        opacity: z.ZodOptional<z.ZodNumber>;
        blur: z.ZodOptional<z.ZodNumber>;
        angle: z.ZodOptional<z.ZodNumber>;
        offset: z.ZodOptional<z.ZodNumber>;
        color: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    master: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
    isDecorative: z.ZodOptional<z.ZodBoolean>;
    flexGrow: z.ZodOptional<z.ZodNumber>;
    flexShrink: z.ZodOptional<z.ZodNumber>;
    flexBasis: z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodLiteral<"max">, z.ZodString]>>;
    id: z.ZodOptional<z.ZodString>;
    group: z.ZodOptional<z.ZodString>;
    __nodeId: z.ZodOptional<z.ZodNumber>;
    type: z.ZodLiteral<"shape">;
    shapeType: z.ZodEnum<{
        cloud: "cloud";
        diamond: "diamond";
        donut: "donut";
        ellipse: "ellipse";
        frame: "frame";
        funnel: "funnel";
        heart: "heart";
        hexagon: "hexagon";
        moon: "moon";
        octagon: "octagon";
        pentagon: "pentagon";
        plus: "plus";
        ribbon: "ribbon";
        sun: "sun";
        triangle: "triangle";
        accentBorderCallout1: "accentBorderCallout1";
        accentBorderCallout2: "accentBorderCallout2";
        accentBorderCallout3: "accentBorderCallout3";
        accentCallout1: "accentCallout1";
        accentCallout2: "accentCallout2";
        accentCallout3: "accentCallout3";
        actionButtonBackPrevious: "actionButtonBackPrevious";
        actionButtonBeginning: "actionButtonBeginning";
        actionButtonBlank: "actionButtonBlank";
        actionButtonDocument: "actionButtonDocument";
        actionButtonEnd: "actionButtonEnd";
        actionButtonForwardNext: "actionButtonForwardNext";
        actionButtonHelp: "actionButtonHelp";
        actionButtonHome: "actionButtonHome";
        actionButtonInformation: "actionButtonInformation";
        actionButtonMovie: "actionButtonMovie";
        actionButtonReturn: "actionButtonReturn";
        actionButtonSound: "actionButtonSound";
        arc: "arc";
        bentArrow: "bentArrow";
        bentUpArrow: "bentUpArrow";
        bevel: "bevel";
        blockArc: "blockArc";
        borderCallout1: "borderCallout1";
        borderCallout2: "borderCallout2";
        borderCallout3: "borderCallout3";
        bracePair: "bracePair";
        bracketPair: "bracketPair";
        callout1: "callout1";
        callout2: "callout2";
        callout3: "callout3";
        can: "can";
        chartPlus: "chartPlus";
        chartStar: "chartStar";
        chartX: "chartX";
        chevron: "chevron";
        chord: "chord";
        circularArrow: "circularArrow";
        cloudCallout: "cloudCallout";
        corner: "corner";
        cornerTabs: "cornerTabs";
        cube: "cube";
        curvedDownArrow: "curvedDownArrow";
        curvedLeftArrow: "curvedLeftArrow";
        curvedRightArrow: "curvedRightArrow";
        curvedUpArrow: "curvedUpArrow";
        decagon: "decagon";
        diagStripe: "diagStripe";
        dodecagon: "dodecagon";
        doubleWave: "doubleWave";
        downArrow: "downArrow";
        downArrowCallout: "downArrowCallout";
        ellipseRibbon: "ellipseRibbon";
        ellipseRibbon2: "ellipseRibbon2";
        flowChartAlternateProcess: "flowChartAlternateProcess";
        flowChartCollate: "flowChartCollate";
        flowChartConnector: "flowChartConnector";
        flowChartDecision: "flowChartDecision";
        flowChartDelay: "flowChartDelay";
        flowChartDisplay: "flowChartDisplay";
        flowChartDocument: "flowChartDocument";
        flowChartExtract: "flowChartExtract";
        flowChartInputOutput: "flowChartInputOutput";
        flowChartInternalStorage: "flowChartInternalStorage";
        flowChartMagneticDisk: "flowChartMagneticDisk";
        flowChartMagneticDrum: "flowChartMagneticDrum";
        flowChartMagneticTape: "flowChartMagneticTape";
        flowChartManualInput: "flowChartManualInput";
        flowChartManualOperation: "flowChartManualOperation";
        flowChartMerge: "flowChartMerge";
        flowChartMultidocument: "flowChartMultidocument";
        flowChartOfflineStorage: "flowChartOfflineStorage";
        flowChartOffpageConnector: "flowChartOffpageConnector";
        flowChartOnlineStorage: "flowChartOnlineStorage";
        flowChartOr: "flowChartOr";
        flowChartPredefinedProcess: "flowChartPredefinedProcess";
        flowChartPreparation: "flowChartPreparation";
        flowChartProcess: "flowChartProcess";
        flowChartPunchedCard: "flowChartPunchedCard";
        flowChartPunchedTape: "flowChartPunchedTape";
        flowChartSort: "flowChartSort";
        flowChartSummingJunction: "flowChartSummingJunction";
        flowChartTerminator: "flowChartTerminator";
        folderCorner: "folderCorner";
        gear6: "gear6";
        gear9: "gear9";
        halfFrame: "halfFrame";
        heptagon: "heptagon";
        homePlate: "homePlate";
        horizontalScroll: "horizontalScroll";
        irregularSeal1: "irregularSeal1";
        irregularSeal2: "irregularSeal2";
        leftArrow: "leftArrow";
        leftArrowCallout: "leftArrowCallout";
        leftBrace: "leftBrace";
        leftBracket: "leftBracket";
        leftCircularArrow: "leftCircularArrow";
        leftRightArrow: "leftRightArrow";
        leftRightArrowCallout: "leftRightArrowCallout";
        leftRightCircularArrow: "leftRightCircularArrow";
        leftRightRibbon: "leftRightRibbon";
        leftRightUpArrow: "leftRightUpArrow";
        leftUpArrow: "leftUpArrow";
        lightningBolt: "lightningBolt";
        mathDivide: "mathDivide";
        mathEqual: "mathEqual";
        mathMinus: "mathMinus";
        mathMultiply: "mathMultiply";
        mathNotEqual: "mathNotEqual";
        mathPlus: "mathPlus";
        noSmoking: "noSmoking";
        nonIsoscelesTrapezoid: "nonIsoscelesTrapezoid";
        notchedRightArrow: "notchedRightArrow";
        parallelogram: "parallelogram";
        pie: "pie";
        pieWedge: "pieWedge";
        plaque: "plaque";
        plaqueTabs: "plaqueTabs";
        quadArrow: "quadArrow";
        quadArrowCallout: "quadArrowCallout";
        rect: "rect";
        ribbon2: "ribbon2";
        rightArrow: "rightArrow";
        rightArrowCallout: "rightArrowCallout";
        rightBrace: "rightBrace";
        rightBracket: "rightBracket";
        round1Rect: "round1Rect";
        round2DiagRect: "round2DiagRect";
        round2SameRect: "round2SameRect";
        roundRect: "roundRect";
        rtTriangle: "rtTriangle";
        smileyFace: "smileyFace";
        snip1Rect: "snip1Rect";
        snip2DiagRect: "snip2DiagRect";
        snip2SameRect: "snip2SameRect";
        snipRoundRect: "snipRoundRect";
        squareTabs: "squareTabs";
        star10: "star10";
        star12: "star12";
        star16: "star16";
        star24: "star24";
        star32: "star32";
        star4: "star4";
        star5: "star5";
        star6: "star6";
        star7: "star7";
        star8: "star8";
        stripedRightArrow: "stripedRightArrow";
        swooshArrow: "swooshArrow";
        teardrop: "teardrop";
        trapezoid: "trapezoid";
        upArrow: "upArrow";
        upArrowCallout: "upArrowCallout";
        upDownArrow: "upDownArrow";
        upDownArrowCallout: "upDownArrowCallout";
        uturnArrow: "uturnArrow";
        verticalScroll: "verticalScroll";
        wave: "wave";
        wedgeEllipseCallout: "wedgeEllipseCallout";
        wedgeRectCallout: "wedgeRectCallout";
        wedgeRoundRectCallout: "wedgeRoundRectCallout";
    }>;
    text: z.ZodOptional<z.ZodString>;
    fill: z.ZodOptional<z.ZodObject<{
        color: z.ZodOptional<z.ZodString>;
        transparency: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>>;
    line: z.ZodOptional<z.ZodObject<{
        color: z.ZodOptional<z.ZodString>;
        width: z.ZodOptional<z.ZodNumber>;
        dashType: z.ZodOptional<z.ZodEnum<{
            solid: "solid";
            dash: "dash";
            dashDot: "dashDot";
            lgDash: "lgDash";
            lgDashDot: "lgDashDot";
            lgDashDotDot: "lgDashDotDot";
            sysDash: "sysDash";
            sysDot: "sysDot";
        }>>;
    }, z.core.$strip>>;
    fontSize: z.ZodOptional<z.ZodNumber>;
    color: z.ZodOptional<z.ZodString>;
    textAlign: z.ZodOptional<z.ZodEnum<{
        right: "right";
        left: "left";
        center: "center";
    }>>;
    bold: z.ZodOptional<z.ZodBoolean>;
    italic: z.ZodOptional<z.ZodBoolean>;
    underline: z.ZodOptional<z.ZodUnion<readonly [z.ZodBoolean, z.ZodObject<{
        style: z.ZodOptional<z.ZodEnum<{
            dash: "dash";
            dashHeavy: "dashHeavy";
            dashLong: "dashLong";
            dashLongHeavy: "dashLongHeavy";
            dbl: "dbl";
            dotDash: "dotDash";
            dotDotDash: "dotDotDash";
            dotted: "dotted";
            dottedHeavy: "dottedHeavy";
            heavy: "heavy";
            none: "none";
            sng: "sng";
            wavy: "wavy";
            wavyDbl: "wavyDbl";
            wavyHeavy: "wavyHeavy";
        }>>;
        color: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>]>>;
    strike: z.ZodOptional<z.ZodBoolean>;
    highlight: z.ZodOptional<z.ZodString>;
    fontFamily: z.ZodOptional<z.ZodString>;
    lineHeight: z.ZodOptional<z.ZodNumber>;
    letterSpacing: z.ZodOptional<z.ZodNumber>;
    textVAlign: z.ZodOptional<z.ZodEnum<{
        top: "top";
        bottom: "bottom";
        middle: "middle";
    }>>;
    rotate: z.ZodOptional<z.ZodNumber>;
    noWrap: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
export declare const chartNodeSchema: z.ZodObject<{
    w: z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodLiteral<"max">, z.ZodString]>>;
    h: z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodLiteral<"max">, z.ZodString]>>;
    minW: z.ZodOptional<z.ZodNumber>;
    maxW: z.ZodOptional<z.ZodNumber>;
    minH: z.ZodOptional<z.ZodNumber>;
    maxH: z.ZodOptional<z.ZodNumber>;
    padding: z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodObject<{
        top: z.ZodOptional<z.ZodNumber>;
        right: z.ZodOptional<z.ZodNumber>;
        bottom: z.ZodOptional<z.ZodNumber>;
        left: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>]>>;
    margin: z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodObject<{
        top: z.ZodOptional<z.ZodNumber>;
        right: z.ZodOptional<z.ZodNumber>;
        bottom: z.ZodOptional<z.ZodNumber>;
        left: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>]>>;
    backgroundColor: z.ZodOptional<z.ZodString>;
    backgroundImage: z.ZodOptional<z.ZodObject<{
        src: z.ZodString;
        sizing: z.ZodOptional<z.ZodEnum<{
            cover: "cover";
            contain: "contain";
        }>>;
    }, z.core.$strip>>;
    border: z.ZodOptional<z.ZodObject<{
        color: z.ZodOptional<z.ZodString>;
        width: z.ZodOptional<z.ZodNumber>;
        dashType: z.ZodOptional<z.ZodEnum<{
            solid: "solid";
            dash: "dash";
            dashDot: "dashDot";
            lgDash: "lgDash";
            lgDashDot: "lgDashDot";
            lgDashDotDot: "lgDashDotDot";
            sysDash: "sysDash";
            sysDot: "sysDot";
        }>>;
    }, z.core.$strip>>;
    borderTop: z.ZodOptional<z.ZodObject<{
        color: z.ZodOptional<z.ZodString>;
        width: z.ZodOptional<z.ZodNumber>;
        dashType: z.ZodOptional<z.ZodEnum<{
            solid: "solid";
            dash: "dash";
            dashDot: "dashDot";
            lgDash: "lgDash";
            lgDashDot: "lgDashDot";
            lgDashDotDot: "lgDashDotDot";
            sysDash: "sysDash";
            sysDot: "sysDot";
        }>>;
    }, z.core.$strip>>;
    borderRight: z.ZodOptional<z.ZodObject<{
        color: z.ZodOptional<z.ZodString>;
        width: z.ZodOptional<z.ZodNumber>;
        dashType: z.ZodOptional<z.ZodEnum<{
            solid: "solid";
            dash: "dash";
            dashDot: "dashDot";
            lgDash: "lgDash";
            lgDashDot: "lgDashDot";
            lgDashDotDot: "lgDashDotDot";
            sysDash: "sysDash";
            sysDot: "sysDot";
        }>>;
    }, z.core.$strip>>;
    borderBottom: z.ZodOptional<z.ZodObject<{
        color: z.ZodOptional<z.ZodString>;
        width: z.ZodOptional<z.ZodNumber>;
        dashType: z.ZodOptional<z.ZodEnum<{
            solid: "solid";
            dash: "dash";
            dashDot: "dashDot";
            lgDash: "lgDash";
            lgDashDot: "lgDashDot";
            lgDashDotDot: "lgDashDotDot";
            sysDash: "sysDash";
            sysDot: "sysDot";
        }>>;
    }, z.core.$strip>>;
    borderLeft: z.ZodOptional<z.ZodObject<{
        color: z.ZodOptional<z.ZodString>;
        width: z.ZodOptional<z.ZodNumber>;
        dashType: z.ZodOptional<z.ZodEnum<{
            solid: "solid";
            dash: "dash";
            dashDot: "dashDot";
            lgDash: "lgDash";
            lgDashDot: "lgDashDot";
            lgDashDotDot: "lgDashDotDot";
            sysDash: "sysDash";
            sysDot: "sysDot";
        }>>;
    }, z.core.$strip>>;
    borderRadius: z.ZodOptional<z.ZodNumber>;
    opacity: z.ZodOptional<z.ZodNumber>;
    zIndex: z.ZodOptional<z.ZodNumber>;
    position: z.ZodOptional<z.ZodEnum<{
        relative: "relative";
        absolute: "absolute";
    }>>;
    top: z.ZodOptional<z.ZodNumber>;
    right: z.ZodOptional<z.ZodNumber>;
    bottom: z.ZodOptional<z.ZodNumber>;
    left: z.ZodOptional<z.ZodNumber>;
    alignSelf: z.ZodOptional<z.ZodEnum<{
        start: "start";
        center: "center";
        end: "end";
        stretch: "stretch";
        auto: "auto";
    }>>;
    shadow: z.ZodOptional<z.ZodObject<{
        type: z.ZodOptional<z.ZodEnum<{
            outer: "outer";
            inner: "inner";
        }>>;
        opacity: z.ZodOptional<z.ZodNumber>;
        blur: z.ZodOptional<z.ZodNumber>;
        angle: z.ZodOptional<z.ZodNumber>;
        offset: z.ZodOptional<z.ZodNumber>;
        color: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    master: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
    isDecorative: z.ZodOptional<z.ZodBoolean>;
    flexGrow: z.ZodOptional<z.ZodNumber>;
    flexShrink: z.ZodOptional<z.ZodNumber>;
    flexBasis: z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodLiteral<"max">, z.ZodString]>>;
    id: z.ZodOptional<z.ZodString>;
    group: z.ZodOptional<z.ZodString>;
    __nodeId: z.ZodOptional<z.ZodNumber>;
    type: z.ZodLiteral<"chart">;
    chartType: z.ZodEnum<{
        radar: "radar";
        pie: "pie";
        line: "line";
        bar: "bar";
        area: "area";
        doughnut: "doughnut";
    }>;
    data: z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        labels: z.ZodArray<z.ZodString>;
        values: z.ZodArray<z.ZodNumber>;
    }, z.core.$strip>>;
    showLegend: z.ZodOptional<z.ZodBoolean>;
    showTitle: z.ZodOptional<z.ZodBoolean>;
    title: z.ZodOptional<z.ZodString>;
    chartColors: z.ZodOptional<z.ZodArray<z.ZodString>>;
    legendPos: z.ZodOptional<z.ZodEnum<{
        t: "t";
        b: "b";
        l: "l";
        r: "r";
        tr: "tr";
    }>>;
    legendFontSize: z.ZodOptional<z.ZodNumber>;
    catAxisLabelFontSize: z.ZodOptional<z.ZodNumber>;
    valAxisLabelFontSize: z.ZodOptional<z.ZodNumber>;
    barGapWidthPct: z.ZodOptional<z.ZodNumber>;
    lineDataSymbolSize: z.ZodOptional<z.ZodNumber>;
    radarStyle: z.ZodOptional<z.ZodEnum<{
        standard: "standard";
        marker: "marker";
        filled: "filled";
    }>>;
    altText: z.ZodOptional<z.ZodString>;
    showValue: z.ZodOptional<z.ZodBoolean>;
    barGrouping: z.ZodOptional<z.ZodEnum<{
        clustered: "clustered";
        stacked: "stacked";
        percentStacked: "percentStacked";
    }>>;
    valAxisMinVal: z.ZodOptional<z.ZodNumber>;
    valAxisMaxVal: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export type TextNode = z.infer<typeof textNodeSchema>;
export type LiNode = z.infer<typeof liNodeSchema>;
export type UlNode = z.infer<typeof ulNodeSchema>;
export type OlNode = z.infer<typeof olNodeSchema>;
export type ImageNode = z.infer<typeof imageNodeSchema>;
export type TableNode = z.infer<typeof tableNodeSchema>;
export type ShapeNode = z.infer<typeof shapeNodeSchema>;
export type ChartNode = z.infer<typeof chartNodeSchema>;
export declare const lineArrowSchema: z.ZodUnion<readonly [z.ZodBoolean, z.ZodObject<{
    type: z.ZodOptional<z.ZodEnum<{
        diamond: "diamond";
        triangle: "triangle";
        none: "none";
        arrow: "arrow";
        oval: "oval";
        stealth: "stealth";
    }>>;
}, z.core.$strip>]>;
export declare const lineNodeSchema: z.ZodObject<{
    w: z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodLiteral<"max">, z.ZodString]>>;
    h: z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodLiteral<"max">, z.ZodString]>>;
    minW: z.ZodOptional<z.ZodNumber>;
    maxW: z.ZodOptional<z.ZodNumber>;
    minH: z.ZodOptional<z.ZodNumber>;
    maxH: z.ZodOptional<z.ZodNumber>;
    padding: z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodObject<{
        top: z.ZodOptional<z.ZodNumber>;
        right: z.ZodOptional<z.ZodNumber>;
        bottom: z.ZodOptional<z.ZodNumber>;
        left: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>]>>;
    margin: z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodObject<{
        top: z.ZodOptional<z.ZodNumber>;
        right: z.ZodOptional<z.ZodNumber>;
        bottom: z.ZodOptional<z.ZodNumber>;
        left: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>]>>;
    backgroundColor: z.ZodOptional<z.ZodString>;
    backgroundImage: z.ZodOptional<z.ZodObject<{
        src: z.ZodString;
        sizing: z.ZodOptional<z.ZodEnum<{
            cover: "cover";
            contain: "contain";
        }>>;
    }, z.core.$strip>>;
    border: z.ZodOptional<z.ZodObject<{
        color: z.ZodOptional<z.ZodString>;
        width: z.ZodOptional<z.ZodNumber>;
        dashType: z.ZodOptional<z.ZodEnum<{
            solid: "solid";
            dash: "dash";
            dashDot: "dashDot";
            lgDash: "lgDash";
            lgDashDot: "lgDashDot";
            lgDashDotDot: "lgDashDotDot";
            sysDash: "sysDash";
            sysDot: "sysDot";
        }>>;
    }, z.core.$strip>>;
    borderTop: z.ZodOptional<z.ZodObject<{
        color: z.ZodOptional<z.ZodString>;
        width: z.ZodOptional<z.ZodNumber>;
        dashType: z.ZodOptional<z.ZodEnum<{
            solid: "solid";
            dash: "dash";
            dashDot: "dashDot";
            lgDash: "lgDash";
            lgDashDot: "lgDashDot";
            lgDashDotDot: "lgDashDotDot";
            sysDash: "sysDash";
            sysDot: "sysDot";
        }>>;
    }, z.core.$strip>>;
    borderRight: z.ZodOptional<z.ZodObject<{
        color: z.ZodOptional<z.ZodString>;
        width: z.ZodOptional<z.ZodNumber>;
        dashType: z.ZodOptional<z.ZodEnum<{
            solid: "solid";
            dash: "dash";
            dashDot: "dashDot";
            lgDash: "lgDash";
            lgDashDot: "lgDashDot";
            lgDashDotDot: "lgDashDotDot";
            sysDash: "sysDash";
            sysDot: "sysDot";
        }>>;
    }, z.core.$strip>>;
    borderBottom: z.ZodOptional<z.ZodObject<{
        color: z.ZodOptional<z.ZodString>;
        width: z.ZodOptional<z.ZodNumber>;
        dashType: z.ZodOptional<z.ZodEnum<{
            solid: "solid";
            dash: "dash";
            dashDot: "dashDot";
            lgDash: "lgDash";
            lgDashDot: "lgDashDot";
            lgDashDotDot: "lgDashDotDot";
            sysDash: "sysDash";
            sysDot: "sysDot";
        }>>;
    }, z.core.$strip>>;
    borderLeft: z.ZodOptional<z.ZodObject<{
        color: z.ZodOptional<z.ZodString>;
        width: z.ZodOptional<z.ZodNumber>;
        dashType: z.ZodOptional<z.ZodEnum<{
            solid: "solid";
            dash: "dash";
            dashDot: "dashDot";
            lgDash: "lgDash";
            lgDashDot: "lgDashDot";
            lgDashDotDot: "lgDashDotDot";
            sysDash: "sysDash";
            sysDot: "sysDot";
        }>>;
    }, z.core.$strip>>;
    borderRadius: z.ZodOptional<z.ZodNumber>;
    opacity: z.ZodOptional<z.ZodNumber>;
    zIndex: z.ZodOptional<z.ZodNumber>;
    position: z.ZodOptional<z.ZodEnum<{
        relative: "relative";
        absolute: "absolute";
    }>>;
    top: z.ZodOptional<z.ZodNumber>;
    right: z.ZodOptional<z.ZodNumber>;
    bottom: z.ZodOptional<z.ZodNumber>;
    left: z.ZodOptional<z.ZodNumber>;
    alignSelf: z.ZodOptional<z.ZodEnum<{
        start: "start";
        center: "center";
        end: "end";
        stretch: "stretch";
        auto: "auto";
    }>>;
    shadow: z.ZodOptional<z.ZodObject<{
        type: z.ZodOptional<z.ZodEnum<{
            outer: "outer";
            inner: "inner";
        }>>;
        opacity: z.ZodOptional<z.ZodNumber>;
        blur: z.ZodOptional<z.ZodNumber>;
        angle: z.ZodOptional<z.ZodNumber>;
        offset: z.ZodOptional<z.ZodNumber>;
        color: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    master: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
    isDecorative: z.ZodOptional<z.ZodBoolean>;
    flexGrow: z.ZodOptional<z.ZodNumber>;
    flexShrink: z.ZodOptional<z.ZodNumber>;
    flexBasis: z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodLiteral<"max">, z.ZodString]>>;
    id: z.ZodOptional<z.ZodString>;
    group: z.ZodOptional<z.ZodString>;
    __nodeId: z.ZodOptional<z.ZodNumber>;
    type: z.ZodLiteral<"line">;
    x1: z.ZodNumber;
    y1: z.ZodNumber;
    x2: z.ZodNumber;
    y2: z.ZodNumber;
    color: z.ZodOptional<z.ZodString>;
    lineWidth: z.ZodOptional<z.ZodNumber>;
    dashType: z.ZodOptional<z.ZodEnum<{
        solid: "solid";
        dash: "dash";
        dashDot: "dashDot";
        lgDash: "lgDash";
        lgDashDot: "lgDashDot";
        lgDashDotDot: "lgDashDotDot";
        sysDash: "sysDash";
        sysDot: "sysDot";
    }>>;
    beginArrow: z.ZodOptional<z.ZodUnion<readonly [z.ZodBoolean, z.ZodObject<{
        type: z.ZodOptional<z.ZodEnum<{
            diamond: "diamond";
            triangle: "triangle";
            none: "none";
            arrow: "arrow";
            oval: "oval";
            stealth: "stealth";
        }>>;
    }, z.core.$strip>]>>;
    endArrow: z.ZodOptional<z.ZodUnion<readonly [z.ZodBoolean, z.ZodObject<{
        type: z.ZodOptional<z.ZodEnum<{
            diamond: "diamond";
            triangle: "triangle";
            none: "none";
            arrow: "arrow";
            oval: "oval";
            stealth: "stealth";
        }>>;
    }, z.core.$strip>]>>;
}, z.core.$strip>;
export type LineArrow = z.infer<typeof lineArrowSchema>;
export type LineNode = z.infer<typeof lineNodeSchema>;
export declare const connectorKindSchema: z.ZodEnum<{
    straight: "straight";
    elbow: "elbow";
    curved: "curved";
}>;
export declare const connectorSideSchema: z.ZodEnum<{
    top: "top";
    right: "right";
    bottom: "bottom";
    left: "left";
}>;
export declare const connectorNodeSchema: z.ZodObject<{
    w: z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodLiteral<"max">, z.ZodString]>>;
    h: z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodLiteral<"max">, z.ZodString]>>;
    minW: z.ZodOptional<z.ZodNumber>;
    maxW: z.ZodOptional<z.ZodNumber>;
    minH: z.ZodOptional<z.ZodNumber>;
    maxH: z.ZodOptional<z.ZodNumber>;
    padding: z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodObject<{
        top: z.ZodOptional<z.ZodNumber>;
        right: z.ZodOptional<z.ZodNumber>;
        bottom: z.ZodOptional<z.ZodNumber>;
        left: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>]>>;
    margin: z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodObject<{
        top: z.ZodOptional<z.ZodNumber>;
        right: z.ZodOptional<z.ZodNumber>;
        bottom: z.ZodOptional<z.ZodNumber>;
        left: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>]>>;
    backgroundColor: z.ZodOptional<z.ZodString>;
    backgroundImage: z.ZodOptional<z.ZodObject<{
        src: z.ZodString;
        sizing: z.ZodOptional<z.ZodEnum<{
            cover: "cover";
            contain: "contain";
        }>>;
    }, z.core.$strip>>;
    border: z.ZodOptional<z.ZodObject<{
        color: z.ZodOptional<z.ZodString>;
        width: z.ZodOptional<z.ZodNumber>;
        dashType: z.ZodOptional<z.ZodEnum<{
            solid: "solid";
            dash: "dash";
            dashDot: "dashDot";
            lgDash: "lgDash";
            lgDashDot: "lgDashDot";
            lgDashDotDot: "lgDashDotDot";
            sysDash: "sysDash";
            sysDot: "sysDot";
        }>>;
    }, z.core.$strip>>;
    borderTop: z.ZodOptional<z.ZodObject<{
        color: z.ZodOptional<z.ZodString>;
        width: z.ZodOptional<z.ZodNumber>;
        dashType: z.ZodOptional<z.ZodEnum<{
            solid: "solid";
            dash: "dash";
            dashDot: "dashDot";
            lgDash: "lgDash";
            lgDashDot: "lgDashDot";
            lgDashDotDot: "lgDashDotDot";
            sysDash: "sysDash";
            sysDot: "sysDot";
        }>>;
    }, z.core.$strip>>;
    borderRight: z.ZodOptional<z.ZodObject<{
        color: z.ZodOptional<z.ZodString>;
        width: z.ZodOptional<z.ZodNumber>;
        dashType: z.ZodOptional<z.ZodEnum<{
            solid: "solid";
            dash: "dash";
            dashDot: "dashDot";
            lgDash: "lgDash";
            lgDashDot: "lgDashDot";
            lgDashDotDot: "lgDashDotDot";
            sysDash: "sysDash";
            sysDot: "sysDot";
        }>>;
    }, z.core.$strip>>;
    borderBottom: z.ZodOptional<z.ZodObject<{
        color: z.ZodOptional<z.ZodString>;
        width: z.ZodOptional<z.ZodNumber>;
        dashType: z.ZodOptional<z.ZodEnum<{
            solid: "solid";
            dash: "dash";
            dashDot: "dashDot";
            lgDash: "lgDash";
            lgDashDot: "lgDashDot";
            lgDashDotDot: "lgDashDotDot";
            sysDash: "sysDash";
            sysDot: "sysDot";
        }>>;
    }, z.core.$strip>>;
    borderLeft: z.ZodOptional<z.ZodObject<{
        color: z.ZodOptional<z.ZodString>;
        width: z.ZodOptional<z.ZodNumber>;
        dashType: z.ZodOptional<z.ZodEnum<{
            solid: "solid";
            dash: "dash";
            dashDot: "dashDot";
            lgDash: "lgDash";
            lgDashDot: "lgDashDot";
            lgDashDotDot: "lgDashDotDot";
            sysDash: "sysDash";
            sysDot: "sysDot";
        }>>;
    }, z.core.$strip>>;
    borderRadius: z.ZodOptional<z.ZodNumber>;
    opacity: z.ZodOptional<z.ZodNumber>;
    zIndex: z.ZodOptional<z.ZodNumber>;
    position: z.ZodOptional<z.ZodEnum<{
        relative: "relative";
        absolute: "absolute";
    }>>;
    top: z.ZodOptional<z.ZodNumber>;
    right: z.ZodOptional<z.ZodNumber>;
    bottom: z.ZodOptional<z.ZodNumber>;
    left: z.ZodOptional<z.ZodNumber>;
    alignSelf: z.ZodOptional<z.ZodEnum<{
        start: "start";
        center: "center";
        end: "end";
        stretch: "stretch";
        auto: "auto";
    }>>;
    shadow: z.ZodOptional<z.ZodObject<{
        type: z.ZodOptional<z.ZodEnum<{
            outer: "outer";
            inner: "inner";
        }>>;
        opacity: z.ZodOptional<z.ZodNumber>;
        blur: z.ZodOptional<z.ZodNumber>;
        angle: z.ZodOptional<z.ZodNumber>;
        offset: z.ZodOptional<z.ZodNumber>;
        color: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    master: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
    isDecorative: z.ZodOptional<z.ZodBoolean>;
    flexGrow: z.ZodOptional<z.ZodNumber>;
    flexShrink: z.ZodOptional<z.ZodNumber>;
    flexBasis: z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodLiteral<"max">, z.ZodString]>>;
    id: z.ZodOptional<z.ZodString>;
    group: z.ZodOptional<z.ZodString>;
    __nodeId: z.ZodOptional<z.ZodNumber>;
    type: z.ZodLiteral<"connector">;
    from: z.ZodString;
    to: z.ZodString;
    kind: z.ZodOptional<z.ZodEnum<{
        straight: "straight";
        elbow: "elbow";
        curved: "curved";
    }>>;
    fromSide: z.ZodOptional<z.ZodEnum<{
        top: "top";
        right: "right";
        bottom: "bottom";
        left: "left";
    }>>;
    toSide: z.ZodOptional<z.ZodEnum<{
        top: "top";
        right: "right";
        bottom: "bottom";
        left: "left";
    }>>;
    color: z.ZodOptional<z.ZodString>;
    lineWidth: z.ZodOptional<z.ZodNumber>;
    dashType: z.ZodOptional<z.ZodEnum<{
        solid: "solid";
        dash: "dash";
        dashDot: "dashDot";
        lgDash: "lgDash";
        lgDashDot: "lgDashDot";
        lgDashDotDot: "lgDashDotDot";
        sysDash: "sysDash";
        sysDot: "sysDot";
    }>>;
    beginArrow: z.ZodOptional<z.ZodUnion<readonly [z.ZodBoolean, z.ZodObject<{
        type: z.ZodOptional<z.ZodEnum<{
            diamond: "diamond";
            triangle: "triangle";
            none: "none";
            arrow: "arrow";
            oval: "oval";
            stealth: "stealth";
        }>>;
    }, z.core.$strip>]>>;
    endArrow: z.ZodOptional<z.ZodUnion<readonly [z.ZodBoolean, z.ZodObject<{
        type: z.ZodOptional<z.ZodEnum<{
            diamond: "diamond";
            triangle: "triangle";
            none: "none";
            arrow: "arrow";
            oval: "oval";
            stealth: "stealth";
        }>>;
    }, z.core.$strip>]>>;
}, z.core.$strip>;
export type ConnectorKind = z.infer<typeof connectorKindSchema>;
export type ConnectorSide = z.infer<typeof connectorSideSchema>;
export type ConnectorNode = z.infer<typeof connectorNodeSchema>;
export type VStackNode = BaseBuilderNode & {
    type: "vstack";
    children: BuilderNode[];
    gap?: number;
    alignItems?: AlignItems;
    justifyContent?: JustifyContent;
    flexWrap?: FlexWrap;
};
export type HStackNode = BaseBuilderNode & {
    type: "hstack";
    children: BuilderNode[];
    gap?: number;
    alignItems?: AlignItems;
    justifyContent?: JustifyContent;
    flexWrap?: FlexWrap;
};
type LayerChild = BuilderNode & {
    x: number;
    y: number;
};
export type LayerNode = BaseBuilderNode & {
    type: "layer";
    children: LayerChild[];
};
export type BuilderNode = TextNode | UlNode | OlNode | ImageNode | TableNode | VStackNode | HStackNode | ShapeNode | ChartNode | LineNode | ConnectorNode | LayerNode | IconNode | SvgNode;
declare const positionedBaseSchema: z.ZodObject<{
    x: z.ZodNumber;
    y: z.ZodNumber;
    w: z.ZodNumber;
    h: z.ZodNumber;
}, z.core.$strip>;
type PositionedBase = z.infer<typeof positionedBaseSchema>;
export type PositionedLayerChild = PositionedNode & {
    x: number;
    y: number;
};
export type PositionedNode = (TextNode & PositionedBase) | (UlNode & PositionedBase) | (OlNode & PositionedBase) | (ImageNode & PositionedBase & {
    imageData?: string;
}) | (TableNode & PositionedBase) | (VStackNode & PositionedBase & {
    children: PositionedNode[];
}) | (HStackNode & PositionedBase & {
    children: PositionedNode[];
}) | (ShapeNode & PositionedBase) | (ChartNode & PositionedBase) | (LineNode & PositionedBase) | (ConnectorNode & PositionedBase) | (LayerNode & PositionedBase & {
    children: PositionedLayerChild[];
}) | (IconNode & PositionedBase & {
    iconImageData: string;
    bgX?: number;
    bgY?: number;
    bgW?: number;
    bgH?: number;
    iconX?: number;
    iconY?: number;
    iconW?: number;
    iconH?: number;
}) | (SvgNode & PositionedBase & {
    iconImageData: string;
});
declare const masterTextObjectSchema: z.ZodObject<{
    type: z.ZodLiteral<"text">;
    text: z.ZodString;
    x: z.ZodNumber;
    y: z.ZodNumber;
    w: z.ZodNumber;
    h: z.ZodNumber;
    fontSize: z.ZodOptional<z.ZodNumber>;
    fontFamily: z.ZodOptional<z.ZodString>;
    color: z.ZodOptional<z.ZodString>;
    bold: z.ZodOptional<z.ZodBoolean>;
    italic: z.ZodOptional<z.ZodBoolean>;
    underline: z.ZodOptional<z.ZodUnion<readonly [z.ZodBoolean, z.ZodObject<{
        style: z.ZodOptional<z.ZodEnum<{
            dash: "dash";
            dashHeavy: "dashHeavy";
            dashLong: "dashLong";
            dashLongHeavy: "dashLongHeavy";
            dbl: "dbl";
            dotDash: "dotDash";
            dotDotDash: "dotDotDash";
            dotted: "dotted";
            dottedHeavy: "dottedHeavy";
            heavy: "heavy";
            none: "none";
            sng: "sng";
            wavy: "wavy";
            wavyDbl: "wavyDbl";
            wavyHeavy: "wavyHeavy";
        }>>;
        color: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>]>>;
    strike: z.ZodOptional<z.ZodBoolean>;
    highlight: z.ZodOptional<z.ZodString>;
    textAlign: z.ZodOptional<z.ZodEnum<{
        right: "right";
        left: "left";
        center: "center";
    }>>;
    lineHeight: z.ZodOptional<z.ZodNumber>;
    letterSpacing: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
declare const masterImageObjectSchema: z.ZodObject<{
    type: z.ZodLiteral<"image">;
    src: z.ZodString;
    x: z.ZodNumber;
    y: z.ZodNumber;
    w: z.ZodNumber;
    h: z.ZodNumber;
}, z.core.$strip>;
declare const masterRectObjectSchema: z.ZodObject<{
    type: z.ZodLiteral<"rect">;
    x: z.ZodNumber;
    y: z.ZodNumber;
    w: z.ZodNumber;
    h: z.ZodNumber;
    fill: z.ZodOptional<z.ZodObject<{
        color: z.ZodOptional<z.ZodString>;
        transparency: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>>;
    border: z.ZodOptional<z.ZodObject<{
        color: z.ZodOptional<z.ZodString>;
        width: z.ZodOptional<z.ZodNumber>;
        dashType: z.ZodOptional<z.ZodEnum<{
            solid: "solid";
            dash: "dash";
            dashDot: "dashDot";
            lgDash: "lgDash";
            lgDashDot: "lgDashDot";
            lgDashDotDot: "lgDashDotDot";
            sysDash: "sysDash";
            sysDot: "sysDot";
        }>>;
    }, z.core.$strip>>;
    borderRadius: z.ZodOptional<z.ZodNumber>;
    opacity: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
declare const masterLineObjectSchema: z.ZodObject<{
    type: z.ZodLiteral<"line">;
    x: z.ZodNumber;
    y: z.ZodNumber;
    w: z.ZodNumber;
    h: z.ZodNumber;
    line: z.ZodOptional<z.ZodObject<{
        color: z.ZodOptional<z.ZodString>;
        width: z.ZodOptional<z.ZodNumber>;
        dashType: z.ZodOptional<z.ZodEnum<{
            solid: "solid";
            dash: "dash";
            dashDot: "dashDot";
            lgDash: "lgDash";
            lgDashDot: "lgDashDot";
            lgDashDotDot: "lgDashDotDot";
            sysDash: "sysDash";
            sysDot: "sysDot";
        }>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export declare const masterObjectSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    type: z.ZodLiteral<"text">;
    text: z.ZodString;
    x: z.ZodNumber;
    y: z.ZodNumber;
    w: z.ZodNumber;
    h: z.ZodNumber;
    fontSize: z.ZodOptional<z.ZodNumber>;
    fontFamily: z.ZodOptional<z.ZodString>;
    color: z.ZodOptional<z.ZodString>;
    bold: z.ZodOptional<z.ZodBoolean>;
    italic: z.ZodOptional<z.ZodBoolean>;
    underline: z.ZodOptional<z.ZodUnion<readonly [z.ZodBoolean, z.ZodObject<{
        style: z.ZodOptional<z.ZodEnum<{
            dash: "dash";
            dashHeavy: "dashHeavy";
            dashLong: "dashLong";
            dashLongHeavy: "dashLongHeavy";
            dbl: "dbl";
            dotDash: "dotDash";
            dotDotDash: "dotDotDash";
            dotted: "dotted";
            dottedHeavy: "dottedHeavy";
            heavy: "heavy";
            none: "none";
            sng: "sng";
            wavy: "wavy";
            wavyDbl: "wavyDbl";
            wavyHeavy: "wavyHeavy";
        }>>;
        color: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>]>>;
    strike: z.ZodOptional<z.ZodBoolean>;
    highlight: z.ZodOptional<z.ZodString>;
    textAlign: z.ZodOptional<z.ZodEnum<{
        right: "right";
        left: "left";
        center: "center";
    }>>;
    lineHeight: z.ZodOptional<z.ZodNumber>;
    letterSpacing: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>, z.ZodObject<{
    type: z.ZodLiteral<"image">;
    src: z.ZodString;
    x: z.ZodNumber;
    y: z.ZodNumber;
    w: z.ZodNumber;
    h: z.ZodNumber;
}, z.core.$strip>, z.ZodObject<{
    type: z.ZodLiteral<"rect">;
    x: z.ZodNumber;
    y: z.ZodNumber;
    w: z.ZodNumber;
    h: z.ZodNumber;
    fill: z.ZodOptional<z.ZodObject<{
        color: z.ZodOptional<z.ZodString>;
        transparency: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>>;
    border: z.ZodOptional<z.ZodObject<{
        color: z.ZodOptional<z.ZodString>;
        width: z.ZodOptional<z.ZodNumber>;
        dashType: z.ZodOptional<z.ZodEnum<{
            solid: "solid";
            dash: "dash";
            dashDot: "dashDot";
            lgDash: "lgDash";
            lgDashDot: "lgDashDot";
            lgDashDotDot: "lgDashDotDot";
            sysDash: "sysDash";
            sysDot: "sysDot";
        }>>;
    }, z.core.$strip>>;
    borderRadius: z.ZodOptional<z.ZodNumber>;
    opacity: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>, z.ZodObject<{
    type: z.ZodLiteral<"line">;
    x: z.ZodNumber;
    y: z.ZodNumber;
    w: z.ZodNumber;
    h: z.ZodNumber;
    line: z.ZodOptional<z.ZodObject<{
        color: z.ZodOptional<z.ZodString>;
        width: z.ZodOptional<z.ZodNumber>;
        dashType: z.ZodOptional<z.ZodEnum<{
            solid: "solid";
            dash: "dash";
            dashDot: "dashDot";
            lgDash: "lgDash";
            lgDashDot: "lgDashDot";
            lgDashDotDot: "lgDashDotDot";
            sysDash: "sysDash";
            sysDot: "sysDot";
        }>>;
    }, z.core.$strip>>;
}, z.core.$strip>], "type">;
export declare const slideNumberOptionsSchema: z.ZodObject<{
    x: z.ZodNumber;
    y: z.ZodNumber;
    w: z.ZodOptional<z.ZodNumber>;
    h: z.ZodOptional<z.ZodNumber>;
    fontSize: z.ZodOptional<z.ZodNumber>;
    fontFamily: z.ZodOptional<z.ZodString>;
    color: z.ZodOptional<z.ZodString>;
    textAlign: z.ZodOptional<z.ZodEnum<{
        right: "right";
        left: "left";
        center: "center";
    }>>;
}, z.core.$strip>;
declare const slideMasterBackgroundSchema: z.ZodUnion<readonly [z.ZodObject<{
    color: z.ZodString;
}, z.core.$strip>, z.ZodObject<{
    path: z.ZodString;
}, z.core.$strip>, z.ZodObject<{
    data: z.ZodString;
}, z.core.$strip>]>;
declare const slideMasterMarginSchema: z.ZodUnion<readonly [z.ZodNumber, z.ZodObject<{
    top: z.ZodOptional<z.ZodNumber>;
    right: z.ZodOptional<z.ZodNumber>;
    bottom: z.ZodOptional<z.ZodNumber>;
    left: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>]>;
export declare const slideMasterOptionsSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    background: z.ZodOptional<z.ZodUnion<readonly [z.ZodObject<{
        color: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        path: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        data: z.ZodString;
    }, z.core.$strip>]>>;
    margin: z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodObject<{
        top: z.ZodOptional<z.ZodNumber>;
        right: z.ZodOptional<z.ZodNumber>;
        bottom: z.ZodOptional<z.ZodNumber>;
        left: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>]>>;
    objects: z.ZodOptional<z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
        type: z.ZodLiteral<"text">;
        text: z.ZodString;
        x: z.ZodNumber;
        y: z.ZodNumber;
        w: z.ZodNumber;
        h: z.ZodNumber;
        fontSize: z.ZodOptional<z.ZodNumber>;
        fontFamily: z.ZodOptional<z.ZodString>;
        color: z.ZodOptional<z.ZodString>;
        bold: z.ZodOptional<z.ZodBoolean>;
        italic: z.ZodOptional<z.ZodBoolean>;
        underline: z.ZodOptional<z.ZodUnion<readonly [z.ZodBoolean, z.ZodObject<{
            style: z.ZodOptional<z.ZodEnum<{
                dash: "dash";
                dashHeavy: "dashHeavy";
                dashLong: "dashLong";
                dashLongHeavy: "dashLongHeavy";
                dbl: "dbl";
                dotDash: "dotDash";
                dotDotDash: "dotDotDash";
                dotted: "dotted";
                dottedHeavy: "dottedHeavy";
                heavy: "heavy";
                none: "none";
                sng: "sng";
                wavy: "wavy";
                wavyDbl: "wavyDbl";
                wavyHeavy: "wavyHeavy";
            }>>;
            color: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>]>>;
        strike: z.ZodOptional<z.ZodBoolean>;
        highlight: z.ZodOptional<z.ZodString>;
        textAlign: z.ZodOptional<z.ZodEnum<{
            right: "right";
            left: "left";
            center: "center";
        }>>;
        lineHeight: z.ZodOptional<z.ZodNumber>;
        letterSpacing: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"image">;
        src: z.ZodString;
        x: z.ZodNumber;
        y: z.ZodNumber;
        w: z.ZodNumber;
        h: z.ZodNumber;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"rect">;
        x: z.ZodNumber;
        y: z.ZodNumber;
        w: z.ZodNumber;
        h: z.ZodNumber;
        fill: z.ZodOptional<z.ZodObject<{
            color: z.ZodOptional<z.ZodString>;
            transparency: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strip>>;
        border: z.ZodOptional<z.ZodObject<{
            color: z.ZodOptional<z.ZodString>;
            width: z.ZodOptional<z.ZodNumber>;
            dashType: z.ZodOptional<z.ZodEnum<{
                solid: "solid";
                dash: "dash";
                dashDot: "dashDot";
                lgDash: "lgDash";
                lgDashDot: "lgDashDot";
                lgDashDotDot: "lgDashDotDot";
                sysDash: "sysDash";
                sysDot: "sysDot";
            }>>;
        }, z.core.$strip>>;
        borderRadius: z.ZodOptional<z.ZodNumber>;
        opacity: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"line">;
        x: z.ZodNumber;
        y: z.ZodNumber;
        w: z.ZodNumber;
        h: z.ZodNumber;
        line: z.ZodOptional<z.ZodObject<{
            color: z.ZodOptional<z.ZodString>;
            width: z.ZodOptional<z.ZodNumber>;
            dashType: z.ZodOptional<z.ZodEnum<{
                solid: "solid";
                dash: "dash";
                dashDot: "dashDot";
                lgDash: "lgDash";
                lgDashDot: "lgDashDot";
                lgDashDotDot: "lgDashDotDot";
                sysDash: "sysDash";
                sysDot: "sysDot";
            }>>;
        }, z.core.$strip>>;
    }, z.core.$strip>], "type">>>;
    slideNumber: z.ZodOptional<z.ZodObject<{
        x: z.ZodNumber;
        y: z.ZodNumber;
        w: z.ZodOptional<z.ZodNumber>;
        h: z.ZodOptional<z.ZodNumber>;
        fontSize: z.ZodOptional<z.ZodNumber>;
        fontFamily: z.ZodOptional<z.ZodString>;
        color: z.ZodOptional<z.ZodString>;
        textAlign: z.ZodOptional<z.ZodEnum<{
            right: "right";
            left: "left";
            center: "center";
        }>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type MasterTextObject = z.infer<typeof masterTextObjectSchema>;
export type MasterImageObject = z.infer<typeof masterImageObjectSchema>;
export type MasterRectObject = z.infer<typeof masterRectObjectSchema>;
export type MasterLineObject = z.infer<typeof masterLineObjectSchema>;
export type MasterObject = z.infer<typeof masterObjectSchema>;
export type SlideNumberOptions = z.infer<typeof slideNumberOptionsSchema>;
export type SlideMasterBackground = z.infer<typeof slideMasterBackgroundSchema>;
export type SlideMasterMargin = z.infer<typeof slideMasterMarginSchema>;
export type SlideMasterOptions = z.infer<typeof slideMasterOptionsSchema>;
//# sourceMappingURL=types.d.ts.map