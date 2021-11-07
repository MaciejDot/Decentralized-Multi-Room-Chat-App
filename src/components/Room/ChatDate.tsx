import { Typography } from "@material-ui/core";
import { format } from "date-fns";
import { memo } from "react";

export interface ChatDateProps{
    date:number
}


export const ChatDate = memo( (props: ChatDateProps) =>{
    return <Typography variant='subtitle1' align="center">{format(new Date(props.date),"HH:mm:ss dd:MM:yyyy")}</Typography>
})