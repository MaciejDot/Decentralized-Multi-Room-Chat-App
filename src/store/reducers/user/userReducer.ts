import { AllActionsUnion } from "../../actions";
import { UserState, userStateInitialState } from "./UserState";
import produce from "immer"

export default function userReducer(state: UserState = userStateInitialState, action: AllActionsUnion) {
    return produce(state, draft => {
        switch (action.type) {
            case "USER_SET_IS_USER_RECALL_COMPLETE": {
                draft.isUserRecallComplete = action.payload
                break;
            }
            case "USER_SET_IS_USER_AUTHORIZED": {
                draft.isUserAuthorized = action.payload
                break;
            }
            case "USER_SET_IS_USER_AUTHORIZING": {
                draft.isUserAuthorizing = action.payload
                break;
            }
            case "USER_SET_USER_AUTHORIZATION_ERROR": {
                draft.userAuthorizationError = action.payload
                break;
            }
            case "USER_SET_USER_ALIAS": {
                draft.alias = action.payload;
                break;
            }
            case "USER_SET_USER_CREATION_ERROR": {
                draft.userCreationError = action.payload;
                break;
            }
            case "USER_SET_USER_IS_BEING_CREATED": {
                draft.userIsBeingCreated = action.payload;
                break;
            }
            case "USER_RESET":{
                draft = userStateInitialState
            }
        }
    })
}