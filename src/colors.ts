/// <reference path="../types.d.ts"  />
import * as supports from "supports-color";
import * as convert from "color-convert";
import { kindOf } from "@radic/util";
import * as trucolor from "trucolor";
//import {startsWith } from 'lodash'


// import * as _ from "lodash";
// _.isNumber()
// let ansi256    = require('ansi-256-colors')
// let ansiColors = Object.keys(ansiStyles);

export interface AnsiRgbColors
{
    fg: Array<number>
    bg: Array<number>
}

function isLength(value: any, lengths: any[]): boolean[] {
    lengths = lengths.length === 1 && kindOf(lengths[ 0 ]) === 'array' ? lengths[ 0 ] : lengths;
    let vLen: number;
    if ( value.length ) vLen = value.length;
    else if ( isFinite(value) ) vLen = parseInt(value);
    else return [ false ];

    let lens = []
    lengths.map((val) => parseInt(val)).forEach((len: number) => lens[ len ] = vLen === len);
    return lens;
}

let isAnyLength = (value: any, ...lengths: any[]) => isLength(value, lengths).indexOf(true) !== - 1
let isAllLength = (value: any, ...lengths: any[]) => isLength(value, lengths).indexOf(false) === - 1

export class Colors
{
    //static created: AnsiCreator[] = []
    palette: any = trucolor.simplePalette()

    get convert(): ColorConvert { return convert }

    get supports(): SupportsColorOptions { return supports }

    get trucolor(): _trucolor.TrucolorStatic { return trucolor }

    get(color: string, close?: boolean): string {
        return this.getTrucolorColor(color)[ close ? 'out' : 'in' ];
    }

    getTrucolorColor(color: string): {in: string, out: string, toString: ()=>string} {
        //return trucolor.bulk(trucolor.simplePalette(), { color }).color
        return require('deep-assign')(this.palette, trucolor.bulk({}, { color })).color;
    }

    //
    // static create(streamObject?: NodeJS.ReadWriteStream): AnsiCreator {
    //     let _stream: AnsiStream  = <AnsiStream> (streamObject ? streamObject : new stream.PassThrough())
    //     let _cursor: AnsiCursor  = <AnsiCursor> ansi(_stream, { buffering: true });
    //     _cursor.stream           = _stream
    //     _stream.cursor           = _cursor
    //     let creator: AnsiCreator = { cursor: _cursor, stream: _stream, ref: guid() }
    //     _stream.creator          = creator
    //     _cursor.creator          = creator
    //     this.created.push(creator);
    //     return creator;
    // }
    //
    // static cursor(streamObject?: NodeJS.ReadWriteStream): AnsiCursor {
    //     return Ansi.create(streamObject ? streamObject : this.stream()).cursor;
    // }
    //
    // static stream(): AnsiStream {
    //     return Ansi.create().stream
    // }


}
let colors: Colors = new Colors;

export { colors, isAnyLength, isAllLength, isAnyLength as isLength}
