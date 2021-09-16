import Gun from "gun";
import 'gun/axe'
import 'gun/sea'
import { IGunChainReference } from "gun/types/chain";
import { UserDefinitionProp } from "./userDefinition/RestrictedUserDefinition";

export const gunDB = Gun();

export const user = gunDB.user() as IGunChainReference<UserDefinitionProp,any, false>;

export const destroySavedAppData = async () => {
    localStorage && localStorage.clear()
    sessionStorage && sessionStorage.clear()
    if(indexedDB){ 
        const dbs = await indexedDB.databases();
        dbs.forEach(db => indexedDB.deleteDatabase(db.name))
    }
    if(document.cookie){
        document.cookie = ""
    }
} 