import { ActionTypes } from "./ActionTypes";

export function createAction<T extends ActionTypes, P = undefined, F extends Record<string,any> = undefined>(
    type: T,
    payload?: P,
    meta?: F
) {
    return  { type, payload, meta }
}

type ActionsCreatorsMapObject = Record<string, (...args:any[]) => ReturnType< typeof createAction>>

export type ActionsUnion<A extends ActionsCreatorsMapObject> = ReturnType<A[keyof A]>;