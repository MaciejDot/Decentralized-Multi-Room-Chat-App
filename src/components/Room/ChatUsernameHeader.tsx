import { Typography } from "@material-ui/core"
import useTypedStyles from "../../hooks/useTypedStyles"
import { chatUsernameHeaderClasses } from "./chatUsernameHeaderClasses"

export interface ChatUsernameHeaderProps{
    username: string,
    side: 'left' | 'right'
}

export const ChatUsernameHeader = (props: ChatUsernameHeaderProps) => {
    const classes = useTypedStyles(chatUsernameHeaderClasses);
    return <Typography variant="subtitle2" align={props.side} className={classes.root}>{props.username}</Typography>
}