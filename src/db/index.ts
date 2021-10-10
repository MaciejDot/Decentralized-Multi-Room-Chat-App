import { GetGunInstance, isUserAuthenticated } from "./typedGun";
import { UserDefinition } from "./types/UserDefinition";

export const gunDB = GetGunInstance();
const user = gunDB.user<UserDefinition>();

export const getUnAuthUser = () =>{
    if(!isUserAuthenticated(user))
        return user
    throw {"err":"User is already authenticated"}
}

export const getAuthUser = () =>{
    if(isUserAuthenticated(user))
        return user
    throw {"err":"User is not authenticated"}
}