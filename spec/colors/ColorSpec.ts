import {ServerConsoleColors} from '../..'
describe("Player", function () {
    let consoleColors;


    beforeEach(function () {
        consoleColors = new ServerConsoleColors();
    });

    it("should be awesome", function () {
        expect(consoleColors.isAwesome()).toBe(true)
    });
});
