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

interface Message{
    pub:string,
    message:string
}

interface Options {
    expirationOfMessages?: number
}

export interface RoomDefinition{
    options: Options
    certificates: Record<string, Record<number, string>>
    // actual chat data index-date -message certified or more sophisticated solution ---> name:imdex: data no possibility of write
    chat:Record<number,Message>
    ban: Record<string, boolean>
}