import * as ansi from "ansi-styles";
import * as ansi256 from "ansi-256-colors";


let ansiColors = Object.keys(ansi);


/*
 parse('
 {bold.red.underline}This is bold, red and underlined.{/red} But we dropped the red.{reset} And just resetted the rest.
 {green.bgBlue.bold}We can also mix openers and closers{/bgBlue.bgYellow./bold.orange}And make it really silly.
 {f(4,6,6)}If support for 256 colors is present, you can use the RGB 0 - 6  values. Also, you can provide a fallback{f(1,2,3,red).bold.underline}

 Fairly advanced things are possible
 {b(2,1,3,green).f(1,2,3,red).bold.underline}Some text{/f.green./underline}greeen stuff{reset}


 let styles: any[] = Object.keys(ansi);
 styles.forEach((style) => {
 let openExp = new RegExp('\{' + style + '\}', 'g')
 let closeExp = new RegExp('\{\/' + style + '\}', 'g')
 // `{${style}}`
 text = text
 .replace(closeExp, ansi[style].close)
 .replace(openExp, ansi[style].open);

 })

 */

var delimExp: RegExp = /\{(.*?)\}/g

function color(kind:string, r?:number, g?:number, b?:number, fallback?:string) {
    ansi256[kind]
    ansi256.fg.getRgb(r,g,b);

}
function f(r:number=0,g:number=0,b:number=0,fallback:string=false){
    process.env
}

export function parse(text: string) {
    if (!delimExp.test(text)) return text;
    var a = text.match(delimExp);

    return text
}


var out = parse(`
{bold.red.underline}This is bold, red and underlined.{/red} But we dropped the red.{reset} And just resetted the rest.
{green.bgBlue.bold}We can also mix openers and closers{/bgBlue.bgYellow./bold.orange}And make it really silly.
{f(4,6,6)}If support for 256 colors is present, you can use the RGB 0 - 6  values. Also, you can provide a fallback{f(1,2,3,red).bold.underline}

Fairly advanced things are possible
{b(2,1,3,green).f(1,2,3,red).bold.underline}Some text{/f.green./underline}greeen stuff{reset}
`);

console.log(out);


process.exit()
