"use strict";
var ansi = require("ansi-styles");
var ansi256 = require("ansi-256-colors");
var ansiColors = Object.keys(ansi);
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
var delimExp = /\{(.*?)\}/g;
function color(kind, r, g, b, fallback) {
    ansi256[kind];
    ansi256.fg.getRgb(r, g, b);
}
function f(r, g, b, fallback) {
    if (r === void 0) { r = 0; }
    if (g === void 0) { g = 0; }
    if (b === void 0) { b = 0; }
    if (fallback === void 0) { fallback = false; }
}
function parse(text) {
    if (!delimExp.test(text))
        return text;
    var a = text.match(delimExp);
    return text;
}
exports.parse = parse;
var out = parse("\n{bold.red.underline}This is bold, red and underlined.{/red} But we dropped the red.{reset} And just resetted the rest.\n{green.bgBlue.bold}We can also mix openers and closers{/bgBlue.bgYellow./bold.orange}And make it really silly.\n{f(4,6,6)}If support for 256 colors is present, you can use the RGB 0 - 6  values. Also, you can provide a fallback{f(1,2,3,red).bold.underline}\n\nFairly advanced things are possible\n{b(2,1,3,green).f(1,2,3,red).bold.underline}Some text{/f.green./underline}greeen stuff{reset}\n");
console.log(out);
process.exit();
//# sourceMappingURL=index.js.map