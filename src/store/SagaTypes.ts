import { takeEvery, ForkEffect, put, PutEffect, getContext, take, TakeEffect, GetContextEffect, takeLeading} from 'redux-saga/effects';
import { ActionType, AllActionsUnion } from './actions';
import { ActionTypes } from './ActionTypes';
import { SagaContext } from './createStore';
//Restrict saga to defined store actions
export const takeEveryTyped = takeEvery as <T extends ActionTypes>(type: T, worker: (action: ActionType<T>) => any) => ForkEffect<never>
export const putTyped = put as <T extends AllActionsUnion>(type: T) => PutEffect<T>
export const getContextTyped = getContext as <T extends keyof SagaContext>(key: T) => GetContextEffect;
export const takeTyped = take as <T extends AllActionsUnion>(type:T) => TakeEffect
export const takeLeadingTyped= takeLeading as <T extends ActionTypes>(type: T, worker: (action: ActionType<T>) => any) => ForkEffect<never>
