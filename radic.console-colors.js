(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('supports-color'), require('color-convert'), require('@radic/util'), require('trucolor')) :
	typeof define === 'function' && define.amd ? define(['exports', 'supports-color', 'color-convert', '@radic/util', 'trucolor'], factory) :
	(factory((global.console = global.console || {}, global.console.colors = global.console.colors || {}),global.supports,global.convert,global._radic_util,global.trucolor));
}(this, (function (exports,supports,convert,_radic_util,trucolor) { 'use strict';

function isLength(value, lengths) {
    lengths = lengths.length === 1 && _radic_util.kindOf(lengths[0]) === 'array' ? lengths[0] : lengths;
    var vLen;
    if (value.length)
        vLen = value.length;
    else if (isFinite(value))
        vLen = parseInt(value);
    else
        return [false];
    var lens = [];
    lengths.map(function (val) { return parseInt(val); }).forEach(function (len) { return lens[len] = vLen === len; });
    return lens;
}
var isAnyLength = function (value) {
    var lengths = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        lengths[_i - 1] = arguments[_i];
    }
    return isLength(value, lengths).indexOf(true) !== -1;
};
var isAllLength = function (value) {
    var lengths = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        lengths[_i - 1] = arguments[_i];
    }
    return isLength(value, lengths).indexOf(false) === -1;
};
var Colors = (function () {
    function Colors() {
        this.palette = trucolor.simple();
    }
    Object.defineProperty(Colors.prototype, "convert", {
        get: function () { return convert; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Colors.prototype, "supports", {
        get: function () { return supports; },
        enumerable: true,
        configurable: true
    });
    Colors.prototype.get = function (color, close) {
        var _color = this.palette[color] ? this.palette[color] : this.getTrucolorColor(color);
        return _color[close ? 'out' : 'in'];
    };
    Colors.prototype.getTrucolorColor = function (color) {
        return trucolor.trucolor(color, this.palette);
    };
    Colors.prototype.getStyles = function () {
        return this.palette;
    };
    Colors.prototype.styles = function (styles) {
        this.palette = trucolor.palette(this.palette, styles);
        return this;
    };
    Colors.prototype.reset = function () {
        this.palette = trucolor.palette();
        return this;
    };
    return Colors;
}());

var Parser = (function () {
    function Parser() {
        this.colors = new Colors;
    }
    Parser.prototype.parse = function (text) {
        var _this = this;
        if (!this.getTagsExp().test(text))
            return text;
        this.getTextTags(text, this.getTagsExp()).forEach(function (tag) {
            var parsed = _this.parseTag(tag);
            text = parsed.replace(text);
        });
        return text;
    };
    Parser.prototype.clean = function (text) {
        if (!this.getTagsExp().test(text))
            return text;
        return text.replace(this.getTagsExp(), '');
    };
    Parser.prototype.getTagsExp = function () {
        return /{(.*?)}/g;
    };
    Parser.prototype.getTextTags = function (text, tagExp) {
        var matches = [], myArr;
        while ((myArr = tagExp.exec(text)) !== null) {
            matches.push(myArr);
        }
        return matches;
    };
    Parser.prototype.parseTag = function (tag) {
        var _this = this;
        var replacements = {};
        tag[1].split('.').forEach(function (rawColor) { return replacements[rawColor] = _this.parseColor(rawColor); });
        var colors = Object.keys(replacements).map(function (key) { return replacements[key]; });
        var string = colors.join('');
        var replace = function (text) { return text.replace(tag[0], string === '' ? tag[0] : string); };
        return { replacements: replacements, colors: colors, string: string, replace: replace };
    };
    Parser.prototype.parseColor = function (color) {
        var isClose = color.charAt(0) === '/';
        color = isClose ? color.replace('/', '') : color;
        if (color.charAt(0) === 'f' || color.charAt(0) === 'b') {
            var exp = /^([fb])([:(])(.*)([)])$/m;
            if (exp.test(color)) {
                var segments = color.match(exp);
                var _color = segments[3];
                if (segments[1] === 'b')
                    _color = 'background ' + _color;
                return this.colors.get(_color, isClose);
            }
        }
        try {
            return this.colors.get(color, isClose);
        }
        catch (err) {
            return '';
        }
    };
    return Parser;
}());

exports.Parser = Parser;
exports.Colors = Colors;
exports.isAnyLength = isAnyLength;
exports.isAllLength = isAllLength;
exports.isLength = isAnyLength;

Object.defineProperty(exports, '__esModule', { value: true });

})));
