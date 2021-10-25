import { gunDB } from "../..";
import { GetGunInstance, SEAPair, TypedSEA } from "../../typedGun";
import { RoomDefinition } from "../../types/RoomDefinition";

export const generateAccessLink =  async (roomPair: SEAPair, roomFirstPair: SEAPair, cert:string, relative: number) => {
    const randomSafeString = (await TypedSEA.pair()).priv;
    const expiry = Date.now()+ relative;
    const certificate = await TypedSEA.certify('*', { '*' : `waitUsers.${randomSafeString}`, '+':'*' }, roomPair,null, { blacklist: 'ban', expiry });
    gunDB.get<Record<string, RoomDefinition>, string>(`~${roomPair.pub}`).get('waitLinkCertificate').get(Math.random()).put({
        encryptedExpiry: await TypedSEA.encrypt(expiry, roomFirstPair),
        encryptedRandomString : await TypedSEA.encrypt(randomSafeString, roomFirstPair)
    });
    return `${window.location.origin}${window.location.port ===""?"":":"}${window.location.port}/#/$Room/${roomPair.pub}/Join?randomSafeString=${randomSafeString}&certificate=${certificate}`;
}