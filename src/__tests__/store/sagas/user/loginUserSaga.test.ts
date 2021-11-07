import { expectSaga, testSaga } from 'redux-saga-test-plan';
import { take } from 'redux-saga/effects';
import { userActions } from "../../../../store/actions";
import { loginUser } from '../../../../store/sagas/user/loginUserSaga';
import { getContextTyped } from "../../../../store/SagaTypes";

test("loginUserSaga on auth success dispatches setIsUserAuthorized(true)",()=>{
    const mockAuth = (username, password, cb) => cb()
 //test-saga
    return expectSaga(loginUser, userActions.loginUser("username","password"))
    .provide([
        [getContextTyped("user"), { auth : (username, password, cb) => cb() }],
        [take("*"), {}]
    ])
    .put(userActions.setIsUserAuthorizing(true))
    .getContext("user")
    .put(userActions.setUserAuthorizationError(undefined))
    .put(userActions.setIsUserAuthorized(true))
    .put(userActions.setIsUserAuthorizing(false))
    .run()
})

test("loginUserSaga on recall failure dispatches userActions.setUserAuthorizationError with error description",()=>{
    const mockAuth = (username, password, cb) => cb({err:"some"})
 
    return expectSaga(loginUser, userActions.loginUser("username","password"))
    .provide([
        [getContextTyped("user"), { auth : mockAuth }]
    ])
    .put(userActions.setIsUserAuthorizing(true))
    .getContext("user")
    .put(userActions.setUserAuthorizationError("some"))
    .put(userActions.setIsUserAuthorized(false))
    .put(userActions.setIsUserAuthorizing(false))
    .run()
})