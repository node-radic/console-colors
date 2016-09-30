
declare module "@radic/console-colors" {
    import { StringType } from "@radic/util";
export interface Colors {
    getSupportedColors(): any[];
}
export  class Color {
    value: string;
    constructor(value: string);
    getASCII(): string;
    getANSI(): string;
    getPALETTE(): string;
    getTRUECOLOR(): string;
    static make(color: any): void;
}
export  class SupportedColor extends StringType {
    bit: number;
    static ASCII: SupportedColor | string;
    static ANSI: SupportedColor | string;
    static PALETTE: SupportedColor | string;
    static TRUECOLOR: SupportedColor | string;
    constructor(value: string, bit: number);
}
export  abstract class ConsoleColors implements Colors {
    getSupportedColors(): any[];
}
export  class ServerConsoleColors extends ConsoleColors {
    isAwesome(): boolean;
}
export  class BrowserConsoleColors extends ConsoleColors {
}
export  class Parser {
    exp: RegExp;
    parse(text: string): string;
    getExpression(): RegExp;
    handleMatch(match: RegExpExecArray): void;
    key(key: string): any;
    color(kind: string, r?: number, g?: number, b?: number, fallback?: string): any;
    f(r?: number, g?: number, b?: number, fallback?: string): any;
    b(r?: number, g?: number, b?: number, fallback?: string): any;
}
export  var parser: Parser;

}
