import { recallUser } from "../../../../store/sagas/user/recallUserSaga";
import { expectSaga } from 'redux-saga-test-plan';
import { userActions } from "../../../../store/actions";
import { getContextTyped } from "../../../../store/SagaTypes";
test("recallUserSaga on recall success dispatches userActions.setIsUserRecallComplete(true) and setIsUserAuthorized(true)",()=>{
    return expectSaga(recallUser, userActions.recallUser())
    .provide([
        [getContextTyped("user"), { recall : (sessionStorage)=>({is:true})}]
    ])
    .getContext("user")
    .put(userActions.setIsUserAuthorized(true))
    .put(userActions.setIsUserRecallComplete(true))
    .run()
})

test("recallUserSaga on recall failure dispatches userActions.setIsUserRecallComplete(true) and setIsUserAuthorized(false)",()=>{
    return expectSaga(recallUser, userActions.recallUser())
    .provide([
        [getContextTyped("user"), { recall : (sessionStorage)=>({})}]
    ])
    .getContext("user")
    .put(userActions.setIsUserAuthorized(false))
    .put(userActions.setIsUserRecallComplete(true))
    .run()
})