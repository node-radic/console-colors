declare module "trucolor" {

    interface Trucolor {
        name:string
        in:string
        out:string
        hex:string
        rgb:string
        toString():string
        toSwatch():any
    }
    function trucolor(color?: string, options?: any): Trucolor

    function palette(options?: any, palette?: any): any

    function chalkish(palette?: any): any

    function simple(options?: any): any

    function simplePalette(options?: any): any
}

