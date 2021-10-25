import { createStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import userReducer from './reducers/user/userReducer'
import { recallUserSaga } from './sagas/user/recallUserSaga'
import logger from 'redux-logger'
import { GetGunInstance, TypedSEA } from '../db/typedGun'
import { user, getAuthUser, getUnAuthUser } from '../db'


const getSagaContext = () => {
    const dbGlobalContext = GetGunInstance()
    const sea = TypedSEA
    const dbAuthUserContextGetter = getAuthUser;
    const dbUnAuthUserContextGetter = getUnAuthUser;

    //Build gun context
    return {
        dbGlobalContext,
        sea,
        dbAuthUserContextGetter,
        dbUnAuthUserContextGetter
    }
}
//should be async so async module get is possible for logger (bundle-size opt)
//async store creation??
export const createStoreInstance = () => {
    
    const sagaMiddleware = createSagaMiddleware({
        context:getSagaContext()
    })

    const middlewares = [sagaMiddleware]

    if (process.env.NODE_ENV !== 'production') {
            middlewares.push(logger);
    }

    const rootReducer = combineReducers({ user: userReducer })
    const store = createStore(
        rootReducer,
        applyMiddleware(...middlewares)
    )
    
    sagaMiddleware.run(recallUserSaga)
    return store
}

//unpack promise type
//type p = Parameters<Parameters<Promise<boolean>["then"]>[0]>[0]


export type StoreState = ReturnType<ReturnType<typeof createStoreInstance>["getState"]>
export type SagaContext =  ReturnType<typeof getSagaContext>
