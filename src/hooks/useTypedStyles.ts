import { makeStyles } from "@material-ui/core";
import { ClassesBaseType } from "../theme/ClassesBaseType";

let remeberedClasses: any = {};

const useTypedStyles =<TClasses extends ClassesBaseType>(styleDef : TClasses, cache: boolean = false)=>{
    //cache classes
    if(!cache)
        return makeStyles(styleDef)() as Record<keyof ReturnType<TClasses>, string>
    if(!remeberedClasses[styleDef.name]){
        remeberedClasses[styleDef.name] = makeStyles(styleDef)();
    }
    return remeberedClasses[styleDef.name] as Record<keyof ReturnType<TClasses>, string>
}

export default useTypedStyles;