import Gun, { SEA } from "gun";
import 'gun/axe'
import 'gun/sea'

export interface RoomOptions{

}
/*
export const createARoom = (options?:RoomOptions) =>{
    const roomPair = (await SEA.pair(()=>{})) as any as {pub: string, priv :string};
    const _newGunInstance = new Gun();
    
    await _newGunInstance.user().create(roomPair.pub, roomPair.priv, (data) =>{
    let enc = await SEA.encrypt(roomPair, Alice)
    gun.user()
  .get('host')
  .get(Alice.pub)
  .put(enc)

// If you want to let Alice save her room keys in her private graph, you'll have to give her a second instance of Gun (connected to the same peers). She will log in with her own key and store the encrypted room keys there

 // Alice wants to manage the banlist with her personal ban certificate
 let banCert = await SEA.certify(Alice.pub, { '*':'ban' }, room)
 gun.user()
  .get('certs')
  .get('ban')
  .get(Alice.pub)
  .put(banCert)

 // Iterate over the list of verified users public keys and...
 users.forEach(async pub => {

   // Issue a certificate for each user to write personal items to the '#links' path. The hash symbol enforces content-addressing for any item put in it
   const cert = await SEA.certify( pub, { '*':'#links', '+': '*' }, room, null, { blacklist: 'ban' } ) 

   // put the user certificate to a 'certs/links' path for ease of later use (make sure not to use `#` hash symbol here as it will impose content-addressing and putting not hashed item will fail)
   gun.user()
    .get('certs')
    .get('links')
    .get(pub)
    .put(cert) 
    });


}*/