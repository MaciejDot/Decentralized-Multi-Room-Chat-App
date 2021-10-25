import { call } from "@redux-saga/core/effects";
import { GunUser } from "../../../db/typedGun";
import { UserDefinition } from "../../../db/types/UserDefinition";
import { ActionType } from "../../actions";
import { userActions } from "../../actions/userActions";
import { ActionTypesEnum } from "../../ActionTypesEnum";
import { getContextTyped, putTyped, takeEveryTyped } from "../../SagaTypes";

function* recallUser(action : ActionType<ActionTypesEnum.USER_RECALL_USER>) {
   const userGetter = yield getContextTyped("dbUnAuthUserContextGetter")
   const user: GunUser<UserDefinition> = yield call(userGetter);
   const userChained: GunUser<UserDefinition> = yield call(user.recall, ({sessionStorage}))
   yield userChained.is
   yield putTyped(userActions.setIsUserRecallComplete(true));
}

export function* recallUserSaga() {
  yield takeEveryTyped(ActionTypesEnum.USER_RECALL_USER, recallUser);
}