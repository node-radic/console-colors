"use strict";
var ansi = require("ansi-styles");
var ansi256 = require("ansi-256-colors");
var ansiColors = Object.keys(ansi);
var Parser = (function () {
    function Parser() {
        this.exp = /\{(.*?)\}/g;
    }
    Parser.prototype.parse = function (text) {
        var _this = this;
        if (!this.getExpression().test(text))
            return text;
        var re = this.getExpression();
        var myArr;
        var matches = [];
        while ((myArr = re.exec(text)) !== null) {
            matches.push(myArr);
            console.log('found', myArr[0], 'next', re.lastIndex);
        }
        matches.forEach(function (match) { return _this.handleMatch; });
        return text;
    };
    Parser.prototype.getExpression = function () {
        return /\{(.*?)\}/g;
    };
    Parser.prototype.handleMatch = function (match) {
        console.log(match);
    };
    Parser.prototype.color = function (kind, r, g, b, fallback) {
        return ansi256[kind].getRgb(r, g, b);
    };
    Parser.prototype.f = function (r, g, b, fallback) {
        if (r === void 0) { r = 0; }
        if (g === void 0) { g = 0; }
        if (b === void 0) { b = 0; }
        if (fallback === void 0) { fallback = false; }
        return this.color('fg', r, g, b, fallback);
    };
    Parser.prototype.b = function (r, g, b, fallback) {
        if (r === void 0) { r = 0; }
        if (g === void 0) { g = 0; }
        if (b === void 0) { b = 0; }
        if (fallback === void 0) { fallback = false; }
        return this.color('bg', r, g, b, fallback);
    };
    return Parser;
}());
exports.Parser = Parser;
//# sourceMappingURL=parser.js.map