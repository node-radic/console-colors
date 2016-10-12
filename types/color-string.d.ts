
declare var ColorString : ColorString.ColorStringStatic

declare module ColorString {

    type ColorStringModel = 'rgb' | 'hsl' | 'hwb'

    interface ColorStringGetDetails
    {
        model: ColorStringModel
        value: number[]
    }
    interface ColorStringGet
    {
        (val: string): ColorStringGetDetails
        rgb(val: string): number[]
        hsl(val: string): number[]
        hwb(val: string): number[]
    }
    interface ColorStringToRgb
    {
        (...val: number[]): string
        percent(...val: number[]): string
    }

    interface ColorStringTo
    {
        hex(...val: number[]): string
        hex(...val: number[]): string
        rgb: ColorStringToRgb
        keyword(...val: number[]): string
        hsl(...val: number[]): string
        hex(...val: number[]): string
        hwb(...val: number[]): string
    }
    interface ColorStringStatic
    {
        get: ColorStringGet
        to: ColorStringTo
    }
    let get: ColorStringGet
    let to: ColorStringTo
}
declare module "color-string2"{
    export = ColorString
}
