
import { IGunDataType } from "../../../temporary-gun-types/gun/IGunDataType";
import { IGunUserInstance } from "../../../temporary-gun-types/gun/IGunUserInstance";
import { ActionType } from "../../actions";
import { userActions } from "../../actions/userActions";
import { getContextTyped, putTyped, takeEveryTyped } from "../../SagaTypes";


export function* recallUser(action : ActionType<"USER_RECALL_USER">) {
   const user: IGunUserInstance<IGunDataType, undefined> = yield getContextTyped("user")
   yield putTyped(userActions.setIsUserAuthorized(!!user.recall({sessionStorage:true}).is));
   yield putTyped(userActions.setIsUserRecallComplete(true));
}

export function* recallUserSaga() {
  yield takeEveryTyped("USER_RECALL_USER", recallUser);
}