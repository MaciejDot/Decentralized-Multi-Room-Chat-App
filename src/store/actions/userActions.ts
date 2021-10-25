import { createAction, ActionsUnion } from "../ActionCreatorsTypes";
import { ActionTypesEnum } from "../ActionTypesEnum";

export const userActions = {
    setIsUserRecallComplete: (isUserRecallComplete:boolean) => createAction(ActionTypesEnum.USER_SET_IS_USER_RECALL_COMPLETE, isUserRecallComplete),
    recallUser:() => createAction(ActionTypesEnum.USER_RECALL_USER)
}

export type UserActionsUnion = ActionsUnion<typeof userActions>