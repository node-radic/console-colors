import * as ansi from "ansi-styles";
import * as ansi256 from "ansi-256-colors";
import {ConsoleColors, BrowserConsoleColors} from "./colors";

let ansiColors = Object.keys(ansi);


export class Parser
{
    colors: ConsoleColors|BrowserConsoleColors


    exp: RegExp = /\{(.*?)\}/g

    parse(text: string) {
        if (!this.getExpression().test(text)) return text;

        let re:RegExp = this.getExpression();
        let myArr: RegExpExecArray;
        let matches: Array<RegExpExecArray> = [];
        while ((myArr = re.exec(text)) !== null) {
            matches.push(myArr);
            console.log('found', myArr[0], 'next', re.lastIndex);
        }

        matches.forEach((match:RegExpExecArray) => this.handleMatch);

        return text
    }

    getExpression(): RegExp {
        return /\{(.*?)\}/g
    }

    handleMatch(match: RegExpExecArray) {
        console.log(match);
    }

    color(kind: string, r?: number, g?: number, b?: number, fallback?: boolean) {
        return ansi256[kind].getRgb(r, g, b);
    }

    f(r: number = 0, g: number = 0, b: number = 0, fallback: boolean = false) {
        return this.color('fg', r, g, b, fallback);
    }

    b(r: number = 0, g: number = 0, b: number = 0, fallback: boolean = false) {
        return this.color('bg', r, g, b, fallback);
    }

}
