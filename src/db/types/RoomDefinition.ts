/*
WHAT would be ideal:

room pair is only known to creator MUST

new joiners can join via one time link /password/ be added by other members, creator mustnt be active MUST

to chat with indexes can only write users wwith certificate MUST

all authenticated to use room users with certificate can delete all chat history MUST - not neccesity

all unauthenticated users cant perform any action on chat MUST - this can be overtaken - all users can

all users contain copy of chat on theirs nodes?

//proxy user
--> beside room user there is room managment user accessable by user password he has rights to write data to chat

if someone changes passwords of proxy others cant write

--> there is table of proxy users and everyone has private one???

*/


type EncryptionPubKeyData = Record<string, string>


interface Message{
    encryptedPubKey: string,
    encryptedmessage: EncryptionPubKeyData
}

interface Options {
    encryptedMessageExpirationInMiliSeconds?: string,
    encryptedName?: string
}

export interface RoomDefinition{
    options: Options,

    pubKeys: Record<number, string>
    waitLinkCertificate:
    Record<number, { 
        /*max 1hour*/
        encryptedExpiry: string,
        encryptedRandomString: string

    }>,

    waitUsers: Record<string, string>
    chat:Record<number,Message>,
    ban: Record<string, boolean>
}