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
    getStyles(styles?: Object): {
        [name: string]: {
            in: string;
            out: string;
            toString: () => string;
        };
    };
    styles(styles: Object): void;
    reset(): void;
}
export { isAnyLength, isAllLength, isAnyLength as isLength };
