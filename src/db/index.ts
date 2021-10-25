import { AuthenticatedGunUser, GetGunInstance, GunUser, isUserAuthenticated } from "./typedGun";
import { UserDefinition } from "./types/UserDefinition";

export const gunDB = GetGunInstance();
export const user = gunDB.user<UserDefinition>();

export const getUnAuthUser = () =>{
    return getUnAuthUserByUser(user)
}

export const getAuthUser = () =>{
    return getAuthUserByUser(user)
}


export const getUnAuthUserByUser = <T>(userDef : GunUser<T> | AuthenticatedGunUser<T>) =>{
    if(!isUserAuthenticated(userDef))
        return userDef
    throw {"err":"User is already authenticated"}
}

export const getAuthUserByUser =  <T>(userDef : GunUser<T> | AuthenticatedGunUser<T>)=>{
    if(isUserAuthenticated(userDef))
        return userDef
    throw {"err":"User is not authenticated"}
}