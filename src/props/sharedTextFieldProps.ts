import { TextFieldProps } from "@material-ui/core";

export const sharedTextfieldProps = (label:string) : TextFieldProps=> 
({
    variant:"outlined",
    margin:"normal",
    required: true,
    fullWidth: true,
    label
})