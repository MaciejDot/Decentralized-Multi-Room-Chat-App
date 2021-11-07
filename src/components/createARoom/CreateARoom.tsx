import { TextField } from "@material-ui/core"
import { useForm, ValidationResult } from "../../hooks/useForm"

const initialFormState = {
    roomName: "",
    messageLifespanInMiliseconds: Infinity
}

const formValidator = async (state: typeof initialFormState)=>{
    let err : ValidationResult<typeof initialFormState>={};
    return err
}

export const CreateARoom = () => {

    const  { inputPropsMap, onSubmit} = useForm(initialFormState, ()=>{}, {}, formValidator)    
    
    return <form onSubmit={onSubmit}>
        <TextField
            {...inputPropsMap('roomName')}
            label="roomName"
        />
    </form>
}