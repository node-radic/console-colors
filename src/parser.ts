import * as ansi from "ansi-styles";
import * as supportsColor from "supports-color";
//import * as ansi256 from "ansi-256-colors";
let ansi256 = require('ansi-256-colors')
let ansiColors = Object.keys(ansi);


export class Parser
{
    exp: RegExp = /\{(.*?)\}/g

    parse(text: string) {
        if (!this.getExpression().test(text)) return text;

        let re:RegExp = this.getExpression();
        let myArr: RegExpExecArray;
        let matches: Array<RegExpExecArray> = [];
        while ((myArr = re.exec(text)) !== null) {
            matches.push(myArr);
            // console.log('found', myArr[0], 'next', re.lastIndex);
        }
        // console.log(matches);

        matches.forEach((match:RegExpExecArray) => {
            let replace = ''
            match[1].split('.').forEach((key:string) => {
                replace += this.key(key);
            })
            text = text.replace(match[0], replace);
        });

        return text
    }

    getExpression(): RegExp {
        return /\{(.*?)\}/g
    }

    handleMatch(match:RegExpExecArray) {
        let keys = match[1].split('.');
        let replace = ''
        keys.forEach((key:string) => {
            replace += this.key(key);
        })
    }

    key(key:string){
        let isClose = key.charAt(0) === '/'
        key = isClose ? key.replace('/', '') : key;
        // check simple ansi like: red, blue, bgBlack, reset, underline
        if(ansiColors.indexOf(key) !== -1){
            return ansi[key][isClose ? 'close' : 'open'];
        }
        // check foreground color RGB
        let exp = /^(f|b)\((\d{1,3}),(\d{1,3}),(\d{1,3})(?:\)|,(\w*?)\))$/m
        if(key.charAt(0) === 'f' || key.charAt(0) === 'b'){
            if(exp.test(key)){
                let match = key.match(exp);
                let color = this[match[1]](parseInt(match[2]), parseInt(match[3]), parseInt(match[4]), match[5])
                return color;
            }
        }
        return '';
    }

    color(kind: string, r?: number, g?: number, b?: number, fallback?: string ) {
        if(supportsColor.has16m || supportsColor.has256) {
            return ansi256[kind].getRgb(r, g, b);
        } else if(supportsColor.has256){
            // rgb from 0..7
            ansi256.fg.standard
        }
    }

    f(r: number = 0, g: number = 0, b: number = 0, fallback?: string ) {
        return this.color('fg', r, g, b, fallback);
    }

    b(r: number = 0, g: number = 0, b: number = 0, fallback?: string ) {
        return this.color('bg', r, g, b, fallback);
    }

}
export var parser:Parser = new Parser;

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
