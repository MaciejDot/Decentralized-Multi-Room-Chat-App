import { Card, CardContent, Tooltip, Typography } from "@material-ui/core"
import useTypedStyles from "../../hooks/useTypedStyles"
import { chatMessageClasses } from "./chatMessageClasses"
import { format } from 'date-fns'
import { memo } from 'react'




export type ChatMessageProps = {
  message: string,
  date: number
  fromAlias?: string,
  side: 'left' | 'right'
}

export const ChatMessage = memo((props: ChatMessageProps) => {
  const classes = useTypedStyles(chatMessageClasses);
  const formattedDate = format(new Date(props.date), 'HH:mm:ss dd-MM-yyyy');
  return <Tooltip title={props.fromAlias ? `${props.fromAlias} - ${formattedDate}` : formattedDate}><Card className={props.side === 'left' ? classes.messageLeft : classes.messageRight}>
    <CardContent>
      <Typography variant="body1">
        {props.message}
      </Typography>
    </CardContent>
  </Card>
  </Tooltip>
})