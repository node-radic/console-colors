import { Colors } from "../src";
describe("Ansi", function () {

    let colors: Colors,
        debug = true,
        out   = (...p: any[]) => debug && console.log.apply(console, p)

    beforeEach(function () {
        colors = new Colors;
    });

    it('should be an instance of Ansi', () => expect(typeof colors).toBe(typeof new Colors))
    describe('color method', () => {
        let ansiOut = (text: string, ...p: any[]) => out(colors.get.apply(colors, p) + text )

        it('output', () => {
            ansiOut('red', 'red');
            ansiOut('blue', 'blue');
            ansiOut('hex', '#333333');
        })
        it('accepts color(name)', () => expect(colors.get('red')).toBeDefined())
        // it('transforms color("red")', () => expect(ansi.color('red')).toBe('\u001b[31m'))
        // it('transforms color("red", true)', () => expect(ansi.color('red', true)).toBe('\u001b[39m'))
    })

});
