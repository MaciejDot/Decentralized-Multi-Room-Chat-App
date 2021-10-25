import { Dispatch } from "react";
import { useDispatch,  } from "react-redux";
import { AllActionsUnion } from "../store/actions";

export const useTypedDispatch = () => useDispatch<Dispatch<AllActionsUnion>>();