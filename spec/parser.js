"use strict";
var _1 = require("../src/");
describe('Parser', function () {
    var parser;
    var text = "\n{bold.red.underline}This is bold, red and underlined.{/red} But we dropped the red.{reset} And just resetted the rest.{b:blue.red}teetete\n{f:yellow.b:blue.bold}We can also mix openers and closers{/b:blue.b:yellow./bold./f:yellow.blue}And make it really silly.\n{b:red.bold.underline.b:#333.b:rgb(2,1,3)}Hex #333{reset}\n";
    beforeEach(function () {
        parser = new _1.Parser;
    });
    it('first', function () {
        var parsed = parser.parse(text);
        console.log(parsed);
    });
});
