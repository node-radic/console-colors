interface Ansi256Colors
{
    getRgb(red: number, green, blue): string
    codes: Array<number>
    standard: Array<string>
    bright: Array<number>
    greyscale: Array<number>
    rgb: Array<number>
}
declare module "ansi-256-colors"
{
    export var fg: Ansi256Colors;
    export var bg: Ansi256Colors;
    export var reset: string;
}
// colors.<fg|bg>.getRgb(<red>[0..6], <green>[0..6], <blue>[0..6])
// Returns the color code for the given red-green-blue value.
//
//     colors.<fg|bg>.codes[0..255]
// All 256 color codes.
//
//     colors.<fg|bg>.standard[0..7]
// The 8 base color codes, guaranteed to work on every system.
//
//     colors.<fg|bg>.bright[0..7]
// The 8 base bright/bold color codes, guaranteed to work on every system.
//
//     colors.<fg|bg>.grayscale[0..23]
// The 24 grayscales ranging from white to black.
//
//     colors.<fg|bg>.rgb[0..216]
// The 216 varying color tints, where the order corresponds to the code-point 36*r + 6*g + b.
//
//     colors.reset
// Closes any previously opened color codes.
interface SupportsColorOptions
{
    level?: number,
    hasBasic?: boolean,
    has256?: boolean,
    has16m?: boolean
}
declare module "supports-color"

//
// color-convert
//

{
    var asdf: SupportsColorOptions;

    export = asdf;
}
declare interface ColorConvert
{
    rgb: ColorConvertToArgs<number|number[]>
    hsl: ColorConvertToArgs<number|number[]>,
    hsv: ColorConvertToArgs<number|number[]>,
    hwb: ColorConvertToArgs<number|number[]>,
    cmyk: ColorConvertToArgs<number|number[]>,
    ansi: ColorConvertToArgs<number|number[]>,
    ansi16: ColorConvertToArgs<number|number[]>,
    hex: ColorConvertTo<string>
}
declare interface ColorConvertTo<T>
{
    channels: number;

    rgb: {
        (val: T): number[]
        raw(val: T): number[]
    }
    hsl: {
        (val: T): number[]
        raw(val: T): number[]
    }
    hsv: {
        (val: T): number[]
        raw(val: T): number[]
    }
    hwb: {
        (val: T): number[]
        raw(val: T): number[]
    }
    cmyk: {
        (val: T): number[]
        raw(val: T): number[]
    }
    ansi: {
        (val: T): number[]
        raw(val: T): number[]
    }
    ansi16: {
        (val: T): number[]
        raw(val: T): number[]
    }
    hex: {
        (val: T): string
        raw(val: T): string
    }
}
declare interface ColorConvertToArgs<T>
{

    rgb: {
        (...val: T[]): number[]
        raw(...val: T[]): number[]
    }
    hsl: {
        (...val: T[]): number[]
        raw(...val: T[]): number[]
    }
    hsv: {
        (...val: T[]): number[]
        raw(...val: T[]): number[]
    }
    hwb: {
        (...val: T[]): number[]
        raw(...val: T[]): number[]
    }
    cmyk: {
        (...val: T[]): number[]
        raw(...val: T[]): number[]
    }
    ansi: {
        (...val: T[]): number[]
        raw(...val: T[]): number[]
    }
    ansi16: {
        (...val: T[]): number[]
        raw(...val: T[]): number[]
    }
    hex: {
        (...val: T[]): string
        raw(...val: T[]): string
    }
}
declare module "color-convert"
{
    let convert: ColorConvert
    export = convert
}

//
// color-string
//


declare module "color-string"
{
    export type ColorStringModel = 'rgb' | 'hsl' | 'hwb'

    export interface ColorStringGetDetails
    {
        model: ColorStringModel
        value: number[]
    }
    export interface ColorStringGet
    {
        (val: string): ColorStringGetDetails
        rgb(val: string): number[]
        hsl(val: string): number[]
        hwb(val: string): number[]
    }
    export interface ColorStringToRgb
    {
        (...val: number[]): string
        percent(...val: number[]): string
    }

    export interface ColorStringTo
    {
        hex(...val: number[]): string
        hex(...val: number[]): string
        rgb: ColorStringToRgb
        keyword(...val: number[]): string
        hsl(...val: number[]): string
        hex(...val: number[]): string
        hwb(...val: number[]): string
    }
    export interface ColorString
    {
        get: ColorStringGet
        to: ColorStringTo
    }
    export let get: ColorStringGet
    export let to: ColorStringTo
}


declare var _ansi: _ansi.AnsiStatic

declare module _ansi
{
    interface AnsiStatic
    {
        (stream: NodeJS.WritableStream, options?:any): Ansi
    }

    interface ColorFunction<T>
    {

        (...p:any[]): T
    }

    interface Colorer<T>
    {
        _buffer: any[]

        back?: ColorFunction<T>
        beep?: ColorFunction<T>
        bold?: ColorFunction<T>
        buffer?: ColorFunction<T>
        eraseData?: ColorFunction<T>
        eraseLine?: ColorFunction<T>
        flush?: ColorFunction<T>
        forward?: ColorFunction<T>
        nextLine?: ColorFunction<T>
        previousLine?: ColorFunction<T>

        reset?: ColorFunction<T>
        resetBold?: ColorFunction<T>
        resetInverse?: ColorFunction<T>
        resetItalic?: ColorFunction<T>
        resetUnderline?: ColorFunction<T>
        resetPosition?: ColorFunction<T>

        queryPosition?: ColorFunction<T>
        savePosition?: ColorFunction<T>
        restorePosition?: ColorFunction<T>

        scrollDown?: ColorFunction<T>
        scrollUp?: ColorFunction<T>
        show?: ColorFunction<T>
        up?: ColorFunction<T>
        down?: ColorFunction<T>


        black?: ColorFunction<T>
        blue?: ColorFunction<T>
        cyan?: ColorFunction<T>
        green?: ColorFunction<T>
        magenta?: ColorFunction<T>
        red?: ColorFunction<T>
        white?: ColorFunction<T>
        yellow?: ColorFunction<T>

        grey?: ColorFunction<T>
        /**
         search:replace regex color to bright

         search:    (\w)(\w*?)\?(.*)
         replace:   bright\U$1\E$2 ?$3
         */

        brightBlack ?: ColorFunction<T>
        brightBlue ?: ColorFunction<T>
        brightCyan ?: ColorFunction<T>
        brightGreen ?: ColorFunction<T>
        brightMagenta ?: ColorFunction<T>
        brightRed ?: ColorFunction<T>
        brightWhite ?: ColorFunction<T>
        brightYellow ?: ColorFunction<T>



        dim?: ColorFunction<T>
        italic?: ColorFunction<T>
        underline?: ColorFunction<T>
        inverse?: ColorFunction<T>
        hidden?: ColorFunction<T>
        strikethrough?: ColorFunction<T>

        base: number
        current: any
        cursor: Cursor
        hex ?: (color: string) => T
        write ?: (data: string) => T
        rgb ?: (r: string|number, g: string|number, b: string|number) => T
        goto ?: (x: number, y: number) => T
        horizontalAbsolute ?: (line: number) => T
    }
    interface Stream extends NodeJS.ReadWriteStream
    {
        _ansicursor?: Cursor
    }

    interface Cursor
    {
        Bold?: boolean
        Inverse?: boolean
        Italic?: boolean
        Underline?: boolean
        buffering?: boolean
        enabled?: boolean
        newlines?: number
        stream?: Stream
        bg?: Colorer<this>
        fg?: Colorer<this>
        background?: Colorer<this>
        foreground?: Colorer<this>
    }

    interface Ansi extends Cursor, Colorer<Ansi>
    {

    }


}
declare module "ansi"
{
    export = _ansi
}
declare var _trucolor:_trucolor.TrucolorStatic
declare module _trucolor {
    interface TrucolorStatic extends Object {
        bulk ?: (options?:any, object?:any) => any
        cacheClear ?: (name:string) => any
        cacheGet ?: (name:string) => any
        cachePut ?: (name:string, value:any) => any
        chalkish ?: (styles:any) => any
        chalkishPalette ?: (options?:any) => any
        getBin ?: () => any
        getBugs ?: () => any
        getCopyright ?: () => any
        getDescription ?: () => any
        getName ?: () => any
        getVersion ?: (long:any) => any
        interpret ?: (input:any) => any
        newProcessor ?: (name:string) => any
        reset ?: () => any
        route ?: (options?:any, callback?:any) => any
        simplePalette ?: (options?:any) => any
    }

}
declare module "trucolor" {
    export = _trucolor
}
