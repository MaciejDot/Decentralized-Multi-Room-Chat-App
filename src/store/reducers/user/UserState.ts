export interface UserState {
    isUserRecallComplete: boolean,
    isUserAuthorized:boolean, 
    alias: string,
}

export const userStateInitialState :UserState={
    isUserRecallComplete: false,
    isUserAuthorized: false,
    alias: ""
} 