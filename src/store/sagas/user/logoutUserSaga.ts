
import { IGunDataType } from "../../../temporary-gun-types/gun/IGunDataType";
import { IGunUserInstance } from "../../../temporary-gun-types/gun/IGunUserInstance";
import { ActionType } from "../../actions";
import { userActions } from "../../actions/userActions";
import { getContextTyped, putTyped, takeEveryTyped } from "../../SagaTypes";

function* logout(action: ActionType<"USER_LOGOUT">) {
    const user: IGunUserInstance<IGunDataType, undefined> = yield getContextTyped("user")
    user.leave();
    yield putTyped(userActions.setIsUserAuthorized(false));
}

export function* logoutUserSaga() {
    yield takeEveryTyped("USER_LOGOUT", logout);
}