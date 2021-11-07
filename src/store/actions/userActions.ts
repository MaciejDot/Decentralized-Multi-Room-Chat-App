import { createAction, ActionsUnion } from "../ActionCreatorsTypes";

export const userActions = {
    setIsUserRecallComplete: (value:boolean) => createAction("USER_SET_IS_USER_RECALL_COMPLETE", value),
    recallUser: () => createAction("USER_RECALL_USER"),
    loginUser: (username:string, password:string) => createAction("USER_LOGIN", {username , password}),
    setIsUserAuthorized: (value:boolean) => createAction("USER_SET_IS_USER_AUTHORIZED", value),
    setIsUserAuthorizing: (value:boolean) => createAction("USER_SET_IS_USER_AUTHORIZING", value),
    setUserAuthorizationError:(value?:string) => createAction("USER_SET_USER_AUTHORIZATION_ERROR", value),
    setUserAlias:(value:string) => createAction("USER_SET_USER_ALIAS", value),
    logoutUser:() => createAction("USER_LOGOUT"),
    createUser: (username:string, password:string) => createAction("USER_CREATE", {username , password}),
    setIsUserBeingCreated: (value: boolean) => createAction("USER_SET_USER_IS_BEING_CREATED", value),
    setIsUserCreationError: (error?: string) => createAction("USER_SET_USER_CREATION_ERROR", error),
    resetUserState: () => createAction("USER_RESET")
}

export type UserActionsUnion = ActionsUnion<typeof userActions>