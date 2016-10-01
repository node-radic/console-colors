type ColorStringModelType = 'rgb' | 'hsl' | 'hwb'
declare interface ColorStringGetDetails
{
    model: ColorStringModelType
    value: number[]
}
declare interface ColorStringGet
{
    (val: string): ColorStringGetDetails
    rgb(val:string) : number[]
    hsl(val:string) : number[]
    hwb(val:string) : number[]
}
declare interface ColorStringToRgb
{
    (...val: number[]): string
    percent(...val: number[]): string
}

declare interface ColorStringTo
{
    hex(...val: number[]): string
    hex(...val: number[]): string
    rgb: ColorStringToRgb
    keyword(...val: number[]): string
    hsl(...val: number[]): string
    hex(...val: number[]): string
    hwb(...val: number[]): string
}
declare interface ColorString {
    get: ColorStringGet
    to: ColorStringTo
}
declare module "color-string"
{
    let colorString:ColorString
    export = colorString
}
