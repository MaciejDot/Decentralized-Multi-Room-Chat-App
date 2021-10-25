import { getAuthUser, getAuthUserByUser, getUnAuthUserByUser } from "../..";
import { GetGunInstance, getUserSeaPair, TypedSEA } from "../../typedGun";
import { RoomDefinition } from "../../types/RoomDefinition";
import { DecryptedRoomData } from "../../types/UserDefinition";


export interface RoomOptions {
  name: string,
  messageExpirationInMiliSeconds?: number
}


export const createARoom = async (options: RoomOptions) => {
  const { messageExpirationInMiliSeconds, name } = options;
  const roomPair = await TypedSEA.pair();
  const _newGunInstance = GetGunInstance();
  const roomProxy = _newGunInstance.user<RoomDefinition>();
  const unAuthProxy = getUnAuthUserByUser(roomProxy);
  await unAuthProxy.create(roomPair, async ({ err }) => {
    if (err)
      throw err;
    //save room information to user graph
    const pair = getUserSeaPair();

    const authUser = getAuthUser();

    const adminCertificate = await TypedSEA.certify(authUser.is.pub, { '*': '*' }, roomPair, null, { blacklist: 'ban' })

    const roomFirstSecret = await TypedSEA.pair()

    const encrypted = await TypedSEA.encrypt({ roomPair, adminCertificate, roomFirstSecret } as DecryptedRoomData, pair)

    authUser.get("rooms").get(roomPair.pub).put(encrypted)
    const authProxy = getAuthUserByUser(roomProxy);

    authProxy.get("options").put({
        encryptedMessageExpirationInMiliSeconds: await TypedSEA.encrypt(messageExpirationInMiliSeconds, roomFirstSecret),
        encryptedName: await TypedSEA.encrypt(name, roomFirstSecret)
    })

    authProxy.get("pubKeys").get(Math.random()).put(await TypedSEA.encrypt(pair.pub, roomFirstSecret))

  });


}