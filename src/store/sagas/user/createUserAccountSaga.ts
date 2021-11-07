import { eventChannel } from "@redux-saga/core";
import { call, take } from "redux-saga/effects";
import { IGunDataType } from "../../../temporary-gun-types/gun/IGunDataType";
import { IGunUserInstance } from "../../../temporary-gun-types/gun/IGunUserInstance";
import { ActionType } from "../../actions";
import { userActions } from "../../actions/userActions";
import { getContextTyped, putTyped, takeEveryTyped } from "../../SagaTypes";


async function createCallback(user: IGunUserInstance<IGunDataType, undefined>, username: string, password: string) {
  return eventChannel(emit => {
    user.create(username, password, emit)
    return () => { };
  })
}


export function* createUser(action: ActionType<"USER_CREATE">) {
  const { username, password } = action.payload;
  yield putTyped(userActions.setIsUserBeingCreated(true))
  const user: IGunUserInstance<IGunDataType, undefined>= yield getContextTyped("user")
  const createChannel = yield call(createCallback, user, username, password);
  const createResponse = yield take(createChannel)
  yield putTyped(userActions.setIsUserCreationError(createResponse.err));
  yield putTyped(userActions.setIsUserBeingCreated(false))
  if(!createResponse.err) 
    yield putTyped(userActions.loginUser(username, password)) 
}

export function* createUserAccountSaga() {
  yield takeEveryTyped("USER_CREATE", createUser);
}