import { Theme } from "@material-ui/core";

export const messageContainerClasses = (theme : Theme) => ({
    messageList:{
        width: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    messageContainer:{
        display: 'flex',
        flexDirection: 'column-reverse',
        overflowY: 'auto',
        margin: '0 auto',
        marginTop: '3em',
        zIndex: '2',
        height: '80vh',
        borderRadius: '0.25em',
    }
  }) 