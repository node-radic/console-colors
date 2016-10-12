export interface ParserParsedTag {
    colors: string[];
    replacements: {
        [old: string]: string;
    };
    string: string;
    replace: (text: string) => string;
}
export declare class Parser {
    exp: RegExp;
    parse(text: string): string;
    protected getBrackets(): RegExp;
    protected getTextTags(text: string, brackets: RegExp): Array<string[]>;
    protected parseTag(tag: string[]): ParserParsedTag;
    protected parseColor(color: string): string;
}
export declare var parser: Parser;
