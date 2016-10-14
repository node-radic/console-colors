

declare var _trucolor:_trucolor.TrucolorStatic
declare module _trucolor {
    interface TrucolorStatic extends Object {
        bulk ?: (options?:any, object?:any) => any
        cacheClear ?: (name:string) => any
        cacheGet ?: (name:string) => any
        cachePut ?: (name:string, value:any) => any
        chalkish ?: (styles:any) => any
        chalkishPalette ?: (options?:any) => any
        getBin ?: () => any
        getBugs ?: () => any
        getCopyright ?: () => any
        getDescription ?: () => any
        getName ?: () => any
        getVersion ?: (long:any) => any
        interpret ?: (input:any) => any
        newProcessor ?: (name:string) => any
        reset ?: () => any
        route ?: (options?:any, callback?:any) => any
        simplePalette ?: (options?:any) => any
    }

}
declare module "trucolor" {
    export = _trucolor
}
