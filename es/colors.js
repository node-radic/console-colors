var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { StringType } from "@radic/util";
export var Color = (function () {
    function Color(value) {
        this.value = value;
    }
    Color.prototype.getASCII = function () {
        return '';
    };
    Color.prototype.getANSI = function () {
        return '';
    };
    Color.prototype.getPALETTE = function () {
        return '';
    };
    Color.prototype.getTRUECOLOR = function () {
        return '';
    };
    Color.make = function (color) {
    };
    return Color;
}());
export var SupportedColor = (function (_super) {
    __extends(SupportedColor, _super);
    function SupportedColor(value, bit) {
        _super.call(this, value);
        this.bit = bit;
    }
    SupportedColor.ASCII = new SupportedColor('ascii', 0);
    SupportedColor.ANSI = new SupportedColor('ansi', 4);
    SupportedColor.PALETTE = new SupportedColor('palette', 8);
    SupportedColor.TRUECOLOR = new SupportedColor('truecolor', 24);
    return SupportedColor;
}(StringType));
export var ConsoleColors = (function () {
    function ConsoleColors() {
    }
    ConsoleColors.prototype.getSupportedColors = function () {
        var supported = [SupportedColor.ASCII];
        if (supportsColor.hasBasic) {
            supported.push(SupportedColor.ANSI);
        }
        if (supportsColor.has256) {
            supported.push(SupportedColor.PALETTE);
        }
        if (supportsColor.has16m) {
            supported.push(SupportedColor.TRUECOLOR);
        }
        return supported;
    };
    return ConsoleColors;
}());
export var ServerConsoleColors = (function (_super) {
    __extends(ServerConsoleColors, _super);
    function ServerConsoleColors() {
        _super.apply(this, arguments);
    }
    ServerConsoleColors.prototype.isAwesome = function () {
        return true;
    };
    return ServerConsoleColors;
}(ConsoleColors));
export var BrowserConsoleColors = (function (_super) {
    __extends(BrowserConsoleColors, _super);
    function BrowserConsoleColors() {
        _super.apply(this, arguments);
    }
    return BrowserConsoleColors;
}(ConsoleColors));
