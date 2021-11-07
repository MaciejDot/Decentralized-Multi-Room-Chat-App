import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';
import { InputAdornment } from '@material-ui/core';
import useTypedStyles from '../../hooks/useTypedStyles';
import { chatInputClasses } from './chatInputClasses';


export interface ChatInputProps {
    value: string
    onChange: (value: string) => any,
    onSend: () => any
}

export const ChatInput = (props: ChatInputProps) => {
    const classes = useTypedStyles(chatInputClasses)
    return (
        <TextField
            tabIndex={0}
            id="standard-text"
            label="Write Message Here..."
            className={classes.chatInput}
            onChange={ev => props.onChange(ev.target.value)}
            fullWidth
            onKeyDown={e => e.key === "Enter" && props.onSend()}
            value={props.value}
            variant="outlined"
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <Button variant="contained" color="primary" onClick={props.onSend}>
                            <SendIcon />
                        </Button>
                    </InputAdornment>
                ),
            }}
        />

    )
}
