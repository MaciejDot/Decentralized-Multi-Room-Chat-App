import { createStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import userReducer from './reducers/user/userReducer'
import { recallUserSaga } from './sagas/user/recallUserSaga'
import logger from 'redux-logger'
import { loginUserSaga } from './sagas/user/loginUserSaga'
import { userPropertiesListenerSaga } from './sagas/user/userPropertiesListenerSaga'
import Gun from 'gun'
import { IGun } from '../temporary-gun-types/gun/IGun'
//import 'gun/axe'
import 'gun/sea'
import { logoutUserSaga } from './sagas/user/logoutUserSaga'
import { createUserAccountSaga } from './sagas/user/createUserAccountSaga'

const getSagaContext = () => {
    const gun = Gun as any as IGun;
    
    const dbGlobalContext = new gun( //{peers: [
        //  'http://gun-matrix.herokuapp.com/gun',
       //   'https://gun-ams1.maddiex.wtf:443/gun',
      //    'https://gun-sjc1.maddiex.wtf:443/gun',
        //  'https://shockblox-gun-server.herokuapp.com/gun',
      ////    'https://mg-gun-manhattan.herokuapp.com/gun',
     //     'https://gunmeetingserver.herokuapp.com/gun',
          //'https://gun-eu.herokuapp.com/gun',
         // 'https://gunjs.herokuapp.com/gun',
         // 'https://myriad-gundb-relay-peer.herokuapp.com/gun',
         // 'https://gun-armitro.herokuapp.com/',
      //    'https://fire-gun.herokuapp.com/gun',
        //  'http://34.101.247.230:8765/gun'
      //]}
      )
    const user =  dbGlobalContext.user()
    const sea = gun.SEA;

    //Build gun context
    return {
        dbGlobalContext,
        sea,
        user
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
    sagaMiddleware.run(loginUserSaga)
    sagaMiddleware.run(logoutUserSaga)
    sagaMiddleware.run(userPropertiesListenerSaga)
    sagaMiddleware.run(createUserAccountSaga)
    return store
}

//unpack promise type
//type p = Parameters<Parameters<Promise<boolean>["then"]>[0]>[0]


export type StoreState = ReturnType<ReturnType<typeof createStoreInstance>["getState"]>
export type SagaContext =  ReturnType<typeof getSagaContext>
