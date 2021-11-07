import { ActionTypes } from "../ActionTypes";
import { RoomsActionsUnion } from "./roomsActions";
import { UserActionsUnion } from "./userActions";

export { roomsActions } from "./roomsActions";
export { userActions } from "./userActions"
export type AllActionsUnion = UserActionsUnion | RoomsActionsUnion;
export type ActionType<T extends ActionTypes> =  ReturnType<<P extends AllActionsUnion>() => P extends {type:T} ? P: never>
/*export all actions*/