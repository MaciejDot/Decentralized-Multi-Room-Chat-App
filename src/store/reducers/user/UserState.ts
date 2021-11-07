export interface UserState {
    isUserRecallComplete: boolean,
    isUserAuthorized: boolean, 
    isUserAuthorizing: boolean,
    userAuthorizationError?:string
    userCreationError?:string,
    userIsBeingCreated:boolean,
    alias: string,
}

export const userStateInitialState :UserState={
    isUserRecallComplete: false,
    isUserAuthorized: false,
    isUserAuthorizing: false,
    userIsBeingCreated: false,
    userAuthorizationError:undefined,
    alias: "",

} 