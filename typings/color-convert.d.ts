declare interface ColorConvert
{
    rgb: ColorConvertToArgs<number>
    hsl: ColorConvertToArgs<number>,
    hsv: ColorConvertToArgs<number>,
    hwb: ColorConvertToArgs<number>,
    cmyk: ColorConvertToArgs<number>,
    ansi: ColorConvertToArgs<number>,
    ansi16: ColorConvertToArgs<number>,
    hex: ColorConvertTo<string>
}
declare interface ColorConvertTo<T>
{
    channels:number;

    rgb:{
        (val:T): number[]
        raw(val:T): number[]
    }
    hsl:{
        (val:T): number[]
        raw(val:T): number[]
    }
    hsv:{
        (val:T): number[]
        raw(val:T): number[]
    }
    hwb:{
        (val:T): number[]
        raw(val:T): number[]
    }
    cmyk:{
        (val:T): number[]
        raw(val:T): number[]
    }
    ansi:{
        (val:T): number[]
        raw(val:T): number[]
    }
    ansi16:{
        (val:T): number[]
        raw(val:T): number[]
    }
    hex: {
        (val:T): string
        raw(val:T): string
    }
}
declare interface ColorConvertToArgs<T>
{

    rgb:{
        (...val:T[]): number[]
        raw(...val:T[]): number[]
    }
    hsl:{
        (...val:T[]): number[]
        raw(...val:T[]): number[]
    }
    hsv:{
        (...val:T[]): number[]
        raw(...val:T[]): number[]
    }
    hwb:{
        (...val:T[]): number[]
        raw(...val:T[]): number[]
    }
    cmyk:{
        (...val:T[]): number[]
        raw(...val:T[]): number[]
    }
    ansi:{
        (...val:T[]): number[]
        raw(...val:T[]): number[]
    }
    ansi16:{
        (...val:T[]): number[]
        raw(...val:T[]): number[]
    }
    hex: {
        (...val:T[]): string
        raw(...val:T[]): string
    }
}
declare module "color-convert"
{
    let convert : ColorConvert
    export = convert
}
