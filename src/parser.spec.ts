import { Parser } from "./parser";
describe('Parser', () => {
    let parser: Parser;

    let text: string = `
{bold.red.underline}This is bold, red and underlined.{/red} But we dropped the red.{reset} And just resetted the rest.{b:blue.red}teetete
{f:yellow.b:blue.bold}We can also mix openers and closers{/b:blue.b:yellow./bold./f:yellow.blue}And make it really silly.
{b:red.bold.underline.b:#333.b:rgb(2,1,3)}Hex #333{reset}
`;


    beforeEach(() => {
        parser = new Parser;
    });

    it('can clean all tags in a text', () => {
        let cleaned = parser.clean(text);
        let exp = /{(.*?)}/g;
        expect(exp.test(cleaned)).toBeFalsy();
    });
    it('can parse all tags in a text', () => {
        let parsed = parser.parse(text);
        let exp = /{(.*?)}/g;
        expect(exp.test(parsed)).toBeFalsy();
    })
});
