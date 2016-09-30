import {StringType} from "@radic/util";
//import * as supportsColor from "supports-color";
declare var supportsColor:any;

export interface Colors
{
    getSupportedColors(): any[]

}

export class Color
{
    constructor(public value: string) {}

    getASCII(): string {
        return '';
    }

    getANSI(): string {
        return '';
    }

    getPALETTE(): string {
        return '';
    }

    getTRUECOLOR(): string {
        return '';
    }

    static make(color:any){
        // color =
    }
}

export class SupportedColor extends StringType
{
    static ASCII: SupportedColor|string     = new SupportedColor('ascii', 0)
    static ANSI: SupportedColor|string      = new SupportedColor('ansi', 4)
    static PALETTE: SupportedColor|string   = new SupportedColor('palette', 8)
    static TRUECOLOR: SupportedColor|string = new SupportedColor('truecolor', 24)


    constructor(value: string, public bit:number) {
        super(value);
    }
}


export abstract class ConsoleColors implements Colors
{
    getSupportedColors(): any[] {
        var supported: any[] = [SupportedColor.ASCII];
        if (supportsColor.hasBasic) {
            supported.push(SupportedColor.ANSI);
        }
        if (supportsColor.has256) {
            supported.push(SupportedColor.PALETTE);
        }
        if (supportsColor.has16m) {
            supported.push(SupportedColor.TRUECOLOR);
        }
        return supported
    }
}

export class ServerConsoleColors extends ConsoleColors
{
    isAwesome(): boolean {
        return true
    }
}

export class BrowserConsoleColors extends ConsoleColors
{

}



