import { eventChannel } from "@redux-saga/core";
import { call, take } from "redux-saga/effects";
import { IGunDataType } from "../../../temporary-gun-types/gun/IGunDataType";
import { IGunUserInstance } from "../../../temporary-gun-types/gun/IGunUserInstance";
import { ActionType } from "../../actions";
import { userActions } from "../../actions/userActions";
import { getContextTyped, putTyped, takeEveryTyped, takeLeadingTyped } from "../../SagaTypes";

async function aliasCallback(user: IGunUserInstance<IGunDataType, undefined>) {

  return await user.get("alias")
}
function* userPropertiesListener(action: ActionType<"USER_SET_IS_USER_AUTHORIZED">) {
  const user: IGunUserInstance<IGunDataType, undefined> = yield getContextTyped("user")

  if (!action.payload) {
    yield putTyped(userActions.setUserAlias(""))

  }
  const alias = yield call(aliasCallback, user)
  yield putTyped(userActions.setUserAlias(alias))


}

export function* userPropertiesListenerSaga() {
  yield takeEveryTyped("USER_SET_IS_USER_AUTHORIZED", userPropertiesListener);
}