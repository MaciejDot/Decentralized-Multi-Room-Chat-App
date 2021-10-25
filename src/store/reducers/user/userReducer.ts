import { AllActionsUnion } from "../../actions";
import { ActionTypesEnum } from "../../ActionTypesEnum";
import { UserState, userStateInitialState } from "./UserState";
import produce from "immer"

export default function userReducer(state :UserState = userStateInitialState, action : AllActionsUnion) {
    // The reducer normally looks at the action type field to decide what happens
    return produce(state, draft =>{
        switch (action.type) {
            case ActionTypesEnum.USER_SET_IS_USER_RECALL_COMPLETE:{
                draft.isUserRecallComplete= action.payload 
            }
        }
    })
  }