(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('ansi-styles')) :
    typeof define === 'function' && define.amd ? define(['exports', 'ansi-styles'], factory) :
    (factory((global.radic = global.radic || {}, global.radic.console-colors = global.radic.console-colors || {}),global.ansi));
}(this, (function (exports,ansi) { 'use strict';

var ansi256 = require('ansi-256-colors');
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
        }
        matches.forEach(function (match) {
            var replace = '';
            match[1].split('.').forEach(function (key) {
                replace += _this.key(key);
            });
            text = text.replace(match[0], replace);
        });
        console.log(text);
        return text;
    };
    Parser.prototype.getExpression = function () {
        return /\{(.*?)\}/g;
    };
    Parser.prototype.handleMatch = function (match) {
        var _this = this;
        var keys = match[1].split('.');
        var replace = '';
        keys.forEach(function (key) {
            replace += _this.key(key);
        });
    };
    Parser.prototype.key = function (key) {
        var isClose = key.charAt(0) === '/';
        key = isClose ? key.replace('/', '') : key;
        if (ansiColors.indexOf(key) !== -1) {
            return ansi[key][isClose ? 'close' : 'open'];
        }
        var exp = /^(f|b)\((\d{1,3}),(\d{1,3}),(\d{1,3})(?:\)|,(\w*?)\))$/m;
        if (key.charAt(0) === 'f' || key.charAt(0) === 'b') {
            if (exp.test(key)) {
                var match = key.match(exp);
                var color = this[match[1]](parseInt(match[2]), parseInt(match[3]), parseInt(match[4]), match[5]);
                return color;
            }
        }
        return '';
    };
    Parser.prototype.color = function (kind, r, g, b, fallback) {
        return ansi256[kind].getRgb(r, g, b);
    };
    Parser.prototype.f = function (r, g, b, fallback) {
        if (r === void 0) { r = 0; }
        if (g === void 0) { g = 0; }
        if (b === void 0) { b = 0; }
        return this.color('fg', r, g, b, fallback);
    };
    Parser.prototype.b = function (r, g, b, fallback) {
        if (r === void 0) { r = 0; }
        if (g === void 0) { g = 0; }
        if (b === void 0) { b = 0; }
        return this.color('bg', r, g, b, fallback);
    };
    return Parser;
}());
var parser = new Parser;

exports.Parser = Parser;
exports.parser = parser;

Object.defineProperty(exports, '__esModule', { value: true });

})));
