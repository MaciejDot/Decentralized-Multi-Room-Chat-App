import { eventChannel } from "@redux-saga/core";
import { call, take } from "redux-saga/effects";
import { IGunDataType } from "../../../temporary-gun-types/gun/IGunDataType";
import { IGunUserInstance } from "../../../temporary-gun-types/gun/IGunUserInstance";
import { ActionType } from "../../actions";
import { userActions } from "../../actions/userActions";
import { getContextTyped, putTyped, takeEveryTyped } from "../../SagaTypes";


async function authCallback(user: IGunUserInstance<IGunDataType, undefined>, username: string, password: string) {
  return eventChannel(emit => {
    user.auth(username, password, emit)
    return () => { };
  })
}


export function* loginUser(action: ActionType<"USER_LOGIN">) {
  const { username, password } = action.payload;
  yield putTyped(userActions.setIsUserAuthorizing(true))
  const user: IGunUserInstance<IGunDataType, undefined>= yield getContextTyped("user")
  const authChannel = yield call(authCallback, user, username, password);
  const authResponse = yield take(authChannel)
  yield putTyped(userActions.setUserAuthorizationError(authResponse.err))
  yield putTyped(userActions.setIsUserAuthorized(!authResponse.err));
  yield putTyped(userActions.setIsUserAuthorizing(false))
}

export function* loginUserSaga() {
  yield takeEveryTyped("USER_LOGIN", loginUser);
}