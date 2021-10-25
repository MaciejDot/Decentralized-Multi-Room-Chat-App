import { useSelector } from "react-redux";
import { StoreState } from "../store/createStore";

export const useTypedSelector = <T>(selector: (state : StoreState) => T) => useSelector<StoreState,T>(selector)