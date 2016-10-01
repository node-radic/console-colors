
declare module "@radic/console-colors" {
    /// <reference path="../types.d.ts" />
 let supportsColor: any;
import * as convert from 'color-convert';
export { convert, supportsColor as supports };
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
