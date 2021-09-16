import { makeStyles } from "@material-ui/core";
import { ClassesBaseType } from "../theme/ClassesBaseType";

const useTypedStyles =<TClasses extends ClassesBaseType>(styleDef : TClasses)=>{
    return makeStyles(styleDef)() as Record<keyof ReturnType<TClasses>, string>
}

export default useTypedStyles;