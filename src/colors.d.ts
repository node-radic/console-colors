/// <reference path="../types.d.ts" />
import * as supports from "supports-color";
import * as convert from "color-convert";
export interface AnsiRgbColors {
    fg: Array<number>;
    bg: Array<number>;
}
declare let isAnyLength: (value: any, ...lengths: any[]) => boolean;
declare let isAllLength: (value: any, ...lengths: any[]) => boolean;
export declare class Colors {
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
declare let colors: Colors;
export { colors, convert, supports, isAnyLength, isAllLength, isAnyLength as isLength };
