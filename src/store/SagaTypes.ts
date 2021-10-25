import { takeEvery, ForkEffect, put, PutEffect, getContext, take, TakeEffect} from 'redux-saga/effects';
import { ActionType, AllActionsUnion } from './actions';
import { ActionTypesEnum } from './ActionTypesEnum';
import { SagaContext } from './createStore';
//Restrict saga to defined store actions
export const takeEveryTyped = takeEvery as <T extends ActionTypesEnum>(type: T, worker: (action: ActionType<T>) => any) => ForkEffect<never>
export const putTyped = put as <T extends AllActionsUnion>(type: T) => PutEffect<T>
export const getContextTyped = getContext as <T extends keyof SagaContext>(key: T) => SagaContext[T];
export const takeTyped = take as <T extends AllActionsUnion>(type:T) => TakeEffect
