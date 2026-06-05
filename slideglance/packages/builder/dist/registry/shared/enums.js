/**
 * Layout / list / shape enum atoms used across nodes.
 */
import { z } from "zod";
export const alignItemsSchema = z.enum([
    "start",
    "center",
    "end",
    "stretch",
    "baseline",
]);
export const alignSelfSchema = z.enum([
    "auto",
    "start",
    "center",
    "end",
    "stretch",
]);
export const positionTypeSchema = z.enum(["relative", "absolute"]);
export const flexWrapSchema = z.enum(["nowrap", "wrap", "wrapReverse"]);
export const justifyContentSchema = z.enum([
    "start",
    "center",
    "end",
    "spaceBetween",
    "spaceAround",
    "spaceEvenly",
]);
export const bulletNumberTypeSchema = z.enum([
    "alphaLcParenBoth",
    "alphaLcParenR",
    "alphaLcPeriod",
    "alphaUcParenBoth",
    "alphaUcParenR",
    "alphaUcPeriod",
    "arabicParenBoth",
    "arabicParenR",
    "arabicPeriod",
    "arabicPlain",
    "romanLcParenBoth",
    "romanLcParenR",
    "romanLcPeriod",
    "romanUcParenBoth",
    "romanUcParenR",
    "romanUcPeriod",
]);
