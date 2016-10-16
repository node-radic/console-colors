"use strict";
var src_1 = require("../src");
describe("Ansi", function () {
    var colors, debug = true, out = function () {
        var p = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            p[_i - 0] = arguments[_i];
        }
        return debug && console.log.apply(console, p);
    };
    beforeEach(function () {
        colors = new src_1.Colors;
    });
    it('should be an instance of Ansi', function () { return expect(typeof colors).toBe(typeof new src_1.Colors); });
    describe('color method', function () {
        var ansiOut = function (text) {
            var p = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                p[_i - 1] = arguments[_i];
            }
            return out(colors.get.apply(colors, p) + text);
        };
        it('output', function () {
            ansiOut('red', 'red');
            ansiOut('blue', 'blue');
            ansiOut('hex', '#333333');
        });
        it('accepts color(name)', function () { return expect(colors.get('red')).toBeDefined(); });
    });
});
//# sourceMappingURL=colors.js.map