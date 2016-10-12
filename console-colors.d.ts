
declare module "@radic/console-colors" {
    /// <reference path="types.d.ts" />
import * as supports from "supports-color";
import * as convert from "color-convert";
export interface AnsiRgbColors {
    fg: Array<number>;
    bg: Array<number>;
}
 let isAnyLength: (value: any, ...lengths: any[]) => boolean;
 let isAllLength: (value: any, ...lengths: any[]) => boolean;
export  class Colors {
    palette: any;
    readonly convert: ColorConvert;
    readonly supports: SupportsColorOptions;
    readonly trucolor: _trucolor.TrucolorStatic;
    get(color: string, close?: boolean): string;
    getTrucolorColor(color: string): {
        in: string;
        out: string;
        toString: () => string;
    };
}
 let colors: Colors;
export { colors, convert, supports, isAnyLength, isAllLength, isAnyLength as isLength };
export interface ParserParsedTag {
    colors: string[];
    replacements: {
        [old: string]: string;
    };
    string: string;
    replace: (text: string) => string;
}
export  class Parser {
    exp: RegExp;
    parse(text: string): string;
    protected getBrackets(): RegExp;
    protected getTextTags(text: string, brackets: RegExp): Array<string[]>;
    protected parseTag(tag: string[]): ParserParsedTag;
    protected parseColor(color: string): string;
}
export  var parser: Parser;

}
