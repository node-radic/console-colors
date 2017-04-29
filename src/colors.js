"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var supports = require("supports-color");
var convert = require("color-convert");
var util_1 = require("@radic/util");
var trucolor_1 = require("trucolor");
function isLength(value, lengths) {
    lengths = lengths.length === 1 && util_1.kindOf(lengths[0]) === 'array' ? lengths[0] : lengths;
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
exports.isAnyLength = isAnyLength;
exports.isLength = isAnyLength;
var isAllLength = function (value) {
    var lengths = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        lengths[_i - 1] = arguments[_i];
    }
    return isLength(value, lengths).indexOf(false) === -1;
};
exports.isAllLength = isAllLength;
var Colors = (function () {
    function Colors() {
        this.palette = trucolor_1.simple();
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
        return trucolor_1.trucolor(color, this.palette);
    };
    Colors.prototype.getStyles = function () {
        return this.palette;
    };
    Colors.prototype.styles = function (styles) {
        this.palette = trucolor_1.palette(this.palette, styles);
        return this;
    };
    Colors.prototype.reset = function () {
        this.palette = trucolor_1.palette();
        return this;
    };
    return Colors;
}());
exports.Colors = Colors;
//# sourceMappingURL=colors.js.map