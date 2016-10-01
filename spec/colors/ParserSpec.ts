/// <reference path="../../types.d.ts"  />
import {Parser} from "../../src/";
describe('Parser', () => {
    let parser: Parser;

    let text: string = `
{bold.red.underline}This is bold, red and underlined.{/red} But we dropped the red.{reset} And just resetted the rest.
{green.bgBlue.bold}We can also mix openers and closers{/bgBlue.bgYellow./bold./green.blue}And make it really silly.
{f(4,6,6)}If support for 256 colors is present, you can use the RGB 0 - 6  values. Also, you can provide a fallback{f(1,2,3,red).bold.underline}

Fairly advanced things are possible
{b(2,1,3,green).f(1,2,3,red).bold.underline}Some text{/f.green./underline}greeen stuff{reset}
`;


    beforeEach(() => {
        parser = new Parser;
    });

    it('first', () => {
        parser.parse(text)
    })
})
