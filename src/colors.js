"use strict";
var supports = require("supports-color");
exports.supports = supports;
var convert = require("color-convert");
exports.convert = convert;
var util_1 = require("@radic/util");
var trucolor = require("trucolor");
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
        this.palette = trucolor.simplePalette();
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
    Object.defineProperty(Colors.prototype, "trucolor", {
        get: function () { return trucolor; },
        enumerable: true,
        configurable: true
    });
    Colors.prototype.get = function (color, close) {
        return this.getTrucolorColor(color)[close ? 'out' : 'in'];
    };
    Colors.prototype.getTrucolorColor = function (color) {
        return require('deep-assign')(this.palette, trucolor.bulk({}, { color: color })).color;
    };
    return Colors;
}());
exports.Colors = Colors;
var colors = new Colors;
exports.colors = colors;
//# sourceMappingURL=colors.js.map