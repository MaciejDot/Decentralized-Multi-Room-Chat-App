import { ActionTypesEnum } from "./ActionTypesEnum";

export function createAction<T extends ActionTypesEnum, P = undefined, F extends Record<string,any> = undefined>(
    type: T,
    payload?: P,
    meta?: F
) {
    return  { type, payload, meta }
} 
/**
 * @copyright Copyright (c) 2018 Martin Hochel
 * Borrowed from the rex-tils library
 */

type ActionsCreatorsMapObject = Record<string, (...args:any[]) => ReturnType< typeof createAction>>

export type ActionsUnion<A extends ActionsCreatorsMapObject> = ReturnType<A[keyof A]>;