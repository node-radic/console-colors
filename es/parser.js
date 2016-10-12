import { colors } from "./colors";
export var Parser = (function () {
    function Parser() {
        this.exp = /\{(.*?)\}/g;
    }
    Parser.prototype.parse = function (text) {
        var _this = this;
        if (!this.getBrackets().test(text))
            return text;
        this.getTextTags(text, this.getBrackets()).forEach(function (tag) {
            var parsed = _this.parseTag(tag);
            text = parsed.replace(text);
        });
        return text;
    };
    Parser.prototype.getBrackets = function () {
        return /\{(.*?)\}/g;
    };
    Parser.prototype.getTextTags = function (text, brackets) {
        var matches = [], myArr;
        while ((myArr = brackets.exec(text)) !== null) {
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
            var exp = /^(f|b)(\:|\()(.*)$/m;
            if (exp.test(color)) {
                var segments = color.match(exp);
                var _color = segments[3];
                if (segments[1] === 'b')
                    _color = 'background ' + _color;
                return colors.get(_color, isClose);
            }
        }
        try {
            return colors.get(color, isClose);
        }
        catch (err) {
            return '';
        }
    };
    return Parser;
}());
export var parser = new Parser;