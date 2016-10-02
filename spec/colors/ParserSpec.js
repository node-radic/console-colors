"use strict";
var _1 = require("../../src/");
describe('Parser', function () {
    var parser;
    var text = "\n{bold.red.underline}This is bold, red and underlined.{/red} But we dropped the red.{reset} And just resetted the rest.\n{green.bgBlue.bold}We can also mix openers and closers{/bgBlue.bgYellow./bold./green.blue}And make it really silly.\n{f(4,6,6)}If support for 256 colors is present, you can use the RGB 0 - 6  values. Also, you can provide a fallback{f(1,2,3,red).bold.underline}\n\nFairly advanced things are possible\n{b(2,1,3,green).f(1,2,3,red).bold.underline}Some text{/f.green./underline}greeen stuff{reset}\n";
    beforeEach(function () {
        parser = new _1.Parser;
    });
    it('first', function () {
        parser.parse(text);
    });
});
//# sourceMappingURL=ParserSpec.js.map