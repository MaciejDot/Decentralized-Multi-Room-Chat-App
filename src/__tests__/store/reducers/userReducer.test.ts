import { userActions } from "../../../store/actions"
import userReducer from "../../../store/reducers/user/userReducer"
import { UserState, userStateInitialState } from "../../../store/reducers/user/UserState"



test("user reducer on USER_SET_IS_USER_RECALL_COMPLETE sets only isUserRecallComplete",
    () => {
        const expectedState: UserState = { ...userStateInitialState, isUserRecallComplete: true }
        const actualState = userReducer(userStateInitialState, userActions.setIsUserRecallComplete(true))
        expect(actualState).toEqual(expectedState)
    })

test("user reducer on USER_SET_IS_USER_AUTHORIZED sets only isUserAuthorized",
    () => {
        const expectedState: UserState = { ...userStateInitialState, isUserAuthorized: true }
        const actualState = userReducer(userStateInitialState, userActions.setIsUserAuthorized(true))
        expect(actualState).toEqual(expectedState)
    })

test("user reducer on USER_SET_IS_USER_AUTHORIZING sets only isUserAuthorizing",
    () => {
        const expectedState: UserState = { ...userStateInitialState, isUserAuthorizing: true }
        const actualState = userReducer(userStateInitialState, userActions.setIsUserAuthorizing(true))
        expect(actualState).toEqual(expectedState)
    })


test("user reducer on USER_SET_USER_AUTHORIZATION_ERROR sets only userAuthorizationError",
    () => {
        const expectedState: UserState = { ...userStateInitialState, userAuthorizationError: 'err' }
        const actualState = userReducer(userStateInitialState, userActions.setUserAuthorizationError('err'))
        expect(actualState).toEqual(expectedState)
    })


test("user reducer on USER_SET_USER_ALIAS sets only alias",
    () => {
        const expectedState: UserState = { ...userStateInitialState, alias: 'alias' }
        const actualState = userReducer(userStateInitialState, userActions.setUserAlias("alias"))
        expect(actualState).toEqual(expectedState)
    })