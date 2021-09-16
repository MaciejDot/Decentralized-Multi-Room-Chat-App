import { Alert } from "@material-ui/lab"
import toast from "react-hot-toast"
import useTypedStyles from "../hooks/useTypedStyles"
import { notificationClasses } from "../theme/notifictionClasses"

interface NotificationProps {
    message: string , severity: 'error' | 'success' | 'info' | 'warning', toastId:string
}

const Notification = (props: NotificationProps) =>{
    const {message, severity, toastId} = props;
    const classes = useTypedStyles(notificationClasses)
    return <Alert className={classes.notificationBar} severity={severity}  onClose={()=> toast.dismiss(toastId)}>{message}</Alert>
}

export const notify = (message: string , severity: 'error' | 'success' | 'info' | 'warning') =>{

    toast.custom((t) => {
    return <Notification severity={severity} message={message} toastId={t.id}/>})
}