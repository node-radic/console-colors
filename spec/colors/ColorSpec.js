"use strict";
var __1 = require('../..');
describe("Player", function () {
    var consoleColors;
    beforeEach(function () {
        consoleColors = new __1.ServerConsoleColors();
    });
    it("should be awesome", function () {
        expect(consoleColors.isAwesome()).toBe(true);
    });
});
