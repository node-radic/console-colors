interface Ansi256Colors {
    getRgb(red: number, green, blue): string
    codes: Array<number>
    standard: Array<number>
    bright: Array<number>
    greyscale: Array<number>
    rgb: Array<number>
}
declare module "ansi-256-colors" {
    export var fg: Ansi256Colors;
    export var bg: Ansi256Colors;
    export var reset: string;
}
// colors.<fg|bg>.getRgb(<red>[0..6], <green>[0..6], <blue>[0..6])
// Returns the color code for the given red-green-blue value.
//
//     colors.<fg|bg>.codes[0..255]
// All 256 color codes.
//
//     colors.<fg|bg>.standard[0..7]
// The 8 base color codes, guaranteed to work on every system.
//
//     colors.<fg|bg>.bright[0..7]
// The 8 base bright/bold color codes, guaranteed to work on every system.
//
//     colors.<fg|bg>.grayscale[0..23]
// The 24 grayscales ranging from white to black.
//
//     colors.<fg|bg>.rgb[0..216]
// The 216 varying color tints, where the order corresponds to the code-point 36*r + 6*g + b.
//
//     colors.reset
// Closes any previously opened color codes.
interface SupportsColorOptions {
    level?: number,
    hasBasic?: boolean,
    has256?: boolean,
    has16m?: boolean
}
declare module "supports-color" {
    var asdf: SupportsColorOptions;

    export = asdf;
}
