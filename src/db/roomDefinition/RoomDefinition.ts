/*

WHAT would be ideal:

room pair is only known to creator MUST

new joiners can join via one time link /password/ be added by other members, creator mustnt be active MUST

to chat with indexes can only write users wwith certificate MUST




all authenticated to use room users with certificate can delete all chat history MUST - not neccesity

all unauthenticated users cant perform any action on chat MUST - this can be overtaken - all users can

*/





export interface RoomDefinition{
    //allow read evryone - custom options for example delete content older than 24h
    options:{}

    //can be read only be respective user -place to exchange roles via admin
    privateData:{}

    //pair for proof of work - read-only
    salt:{}

    //public read-only data - write only for users in
    profiles: {}

    // actual chat data index-date -message certified or more sophisticated solution ---> name:imdex: data no possibility of write
    chat:{}

    // issuers put your data for verification to get certificate to write to main chat 
    issuer:{}   
}