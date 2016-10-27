import { Colors } from "./colors";
// import * as Ansi from 'ansi'
// import { range, last, clone, startsWith } from "lodash";
// import { kindOf, defined } from "@radic/util";

// import * as _ from "lodash";
// _.isNumber()
// import * as ansi256 from "ansi-256-colors";
// let ansi256    = require('ansi-256-colors')
export interface ParserParsedTag
{
    colors: string[],
    replacements: {[old: string]: string}
    string: string
    replace: (text: string) => string
}
export class Parser
{
    exp: RegExp = /\{(.*?)\}/g

    colors: Colors = new Colors;

    parse(text: string) {
        if ( ! this.getBrackets().test(text) ) return text;
        this.getTextTags(text, this.getBrackets()).forEach((tag: string[]) => {
            let parsed = this.parseTag(tag)
            text       = parsed.replace(text);
        })
        // this.getMatches(text).forEach((match: RegExpExecArray) => {
        //     let replace = match[ 1 ].split('.').map((key: string) => this.key(key)).join('')
        //     text        = text.replace(match[ 0 ], replace === '' ? match[ 0 ] : replace);
        // });
        // let c = colors.getTrucolorColor('background yellow')
        // let normal = colors.getTrucolorColor('normal')
        // console.log(normal + c.in + 'background dark yellow' + c.out)
        return text
    }

    protected getBrackets(): RegExp {
        return /\{(.*?)\}/g
    }

    protected getTextTags(text: string, brackets: RegExp): Array<string[]> {
        let matches = [], myArr;
        while ( (myArr = brackets.exec(text)) !== null ) { matches.push(myArr); }
        return matches
    }

    protected parseTag(tag: string[]): ParserParsedTag {
        let replacements = {}
        tag[ 1 ].split('.').forEach((rawColor) => replacements[ rawColor ] = this.parseColor(rawColor))

        let colors  = Object.keys(replacements).map((key) => replacements[ key ])
        let string  = colors.join('')
        let replace = (text: string) => text.replace(tag[ 0 ], string === '' ? tag[ 0 ] : string)

        return { replacements, colors, string, replace }
    }

    protected parseColor(color: string): string {
        let isClose = color.charAt(0) === '/'
        color       = isClose ? color.replace('/', '') : color;


        if ( color.charAt(0) === 'f' || color.charAt(0) === 'b' ) {

            //if(isClose) return colors.get('background', true)

            // https://regex101.com/r/SdwSKD/1
            let exp = /^(f|b)(\:|\()(.*)$/m
            if(exp.test(color)){
                let segments = color.match(exp)
                let _color = segments[3]
                if(segments[1] === 'b') _color = 'background ' + _color
                return this.colors.get(_color, isClose)
            }

            //throw Error('cant parase f or b in parseColor')
        }

        try {
            return this.colors.get(color, isClose)
        } catch ( err ) {
            return ''
        }
    }
    //
    // protected applyTextColor(color: string): string {
    //     let isClose = color.charAt(0) === '/'
    //     color       = isClose ? color.replace('/', '') : color;
    //     return colors.get(color, isClose);
    // }
    //
    // protected getMatches(text: string): Array<RegExpExecArray> {
    //     let re      = this.getBrackets(),
    //         matches = [],
    //         myArr;
    //
    //     while ( (myArr = re.exec(text)) !== null ) { matches.push(myArr); }
    //     return matches;
    // }
    //
    // protected key(key: string) {
    //     let isClose = key.charAt(0) === '/'
    //     key         = isClose ? key.replace('/', '') : key;
    //
    //     // check simple ansi like: red, blue, bgBlack, reset, underline
    //     if ( ansiColors.indexOf(key) !== - 1 ) {
    //         return colors.get(key, isClose);
    //     }
    //
    //     let exp = /^(f|b)\((.*?)\)$/m
    //     if ( (key.charAt(0) === 'f' || key.charAt(0) === 'b') && exp.test(key) ) {
    //         let match  = key.match(exp)
    //         let method = match[ 1 ]
    //         return colors.get(match[ 2 ], isClose);
    //         // let params = match[ 2 ].split(',').map((param: string) => this.parseParam(param.trim()))
    //         // //let color  = this[ method ].apply(this, params)
    //         // let color  = this.color.apply(this, ([ method ].concat(params)))
    //         // return color;
    //     }
    //     return '';
    // }
    //
    // parseParam(value: any) {
    //     if ( true === isFinite(value) ) {
    //         return parseInt(value);
    //     }
    //     return value;
    // }
    //
    // rgb(kind: string, r?: number, g?: number, b?: number, fallback?: string) {
    //     if ( ! supportsColor ) {
    //         return '';
    //     }
    //
    //     if ( supportsColor.has16m ) {
    //         // trucolor.simplePalette();
    //         return ansi256[ kind ].getRgb(r, g, b);
    //     } else if ( supportsColor.has256 ) {
    //         return ansi256[ kind ].getRgb.apply(ansi256[ kind ], [ r, g, b ].map((color: number) => this.rgb255to6(color)))
    //     } else if ( supportsColor.hasBasic ) {
    //         if ( fallback ) return ansiStyles[ fallback ].open;
    //         let standard = (r + g + b / 3) / 255 * 2 * 8
    //         standard     = Math.floor(standard * 10)
    //         return ansi256.fg.standard[ standard ]
    //     } else {
    //         return ''
    //     }
    // }
    //
    // protected rgb255to6(rgb255) {
    //     return Math.floor(parseInt(rgb255) / 255 * 2 * 8 * 10)
    // }
    //
    // f(r: number = 0, g: number = 0, b: number = 0, fallback?: string) {
    //     return this.rgb('fg', r, g, b, fallback);
    // }
    //
    // b(r: number = 0, g: number = 0, b: number = 0, fallback?: string) {
    //     return this.rgb('bg', r, g, b, fallback);
    // }
    //
    //
    // color(...params: any[]): string {
    //     // f(
    //     let method: 'f'|'b' = params.shift();
    //     let fallback: string | undefined;
    //     if ( typeof last(params) === 'string' && ansiColors.indexOf(last(params)) !== - 1 ) {
    //         fallback = params.pop();
    //     }
    //     let rgbParams = this.getRgbParams(params);
    //     let color = rgbParams ? this[ method ].apply(this, [].concat(rgbParams, [ fallback ])) : ''
    //     return color
    // }
    //
    // /**
    //  *
    //  * @param {any[]} original
    //  * @param {Array<number>}keys
    //  * @returns {any[]}
    //  */
    // protected parseInts(original: any[], ...keys: Array<number|number[]>): any[] {
    //     let arr = clone(original);
    //     keys.forEach((val: any, key: number) => kindOf(key) === 'array' ? this.parseInts.apply(this, [ original, key ]) : arr[ key ] = parseInt(arr[ key ]));
    //     return arr;
    // }
    //
    // protected getRgbParams(params: any[]): number[] | null {
    //     switch ( true ) {
    //         // f/b(0='hex', 1='#333', ?callback)
    //         // f/b(0='rgb', 1=230, 230, 230, ?callback)
    //         case kindOf(params[ 0 ]) === "string" && defined(convert[ params[ 0 ] ]):
    //             if ( params[ 0 ] === 'hex' ) {
    //                 return convert.hex.rgb.apply(convert[ params[ 0 ] ], [ params[ 1 ] ])
    //             } else {
    //                 return convert[ params[ 0 ] ].codes.apply(convert[ params[ 0 ] ], [ params[ 1 ] ])
    //             }
    //         // f/b(0='#333', ?callback)
    //         case kindOf(params[ 0 ]) === "string" && kindOf(params[ 1 ]) === 'string' && startsWith(params[ 1 ], '#'):
    //             return convert.hex.rgb(params[ 1 ]);
    //         // f/b(0=240, 1:230, 2:240, ?callback
    //         case kindOf(params[ 0 ]) === "number":
    //             return this.parseInts(params.slice(0, 3), range(0, 3))
    //     }
    // }
}


/// ansi256
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
