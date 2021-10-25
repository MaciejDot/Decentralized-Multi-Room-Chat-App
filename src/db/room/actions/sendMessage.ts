import { gunDB } from "../.."
import { getUserSeaPair, TypedSEA } from "../../typedGun"

export const sendMessage = async (roomPub: string, roomCert: string, roomFirstSecret: string, message: string)=>{
    const pair = getUserSeaPair();
    const encryptedMessage:any={};
    /*
    for(let value of Object.values(await gunDB.get(`~${roomPub}`).get("pubKeys")))
    {
        if(value){
            await gunDB.get(`~${roomPub}`)
            encryptedMessage[value] = await TypedSEA.encrypt(message, await TypedSEA.secret(await TypedSEA.decrypt(value, roomFirstSecret), pair))
        }
    }
    gunDB.get(`~${roomPub}`).get('chat').get(Date.now()).put({
        encryptedPubKey : await TypedSEA.encrypt(pair.pub, roomFirstSecret),
        encryptedNessage :  Object.values(await gunDB.get(`~${roomPub}`).get("pubKeys")).reduce(async (a,b) =>{ ...a, [b]: await TypedSEA.secret( , )})
    })*/
}