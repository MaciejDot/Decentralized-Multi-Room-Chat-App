import { Paper } from "@material-ui/core";
import { useMemo, useState } from "react";
import useTypedStyles from "../../hooks/useTypedStyles"
import { createIslands } from "../utilities/createIslands";
import { groupBy } from "../utilities/groupBy";
import { ChatDate } from "./ChatDate";
import { ChatMessage, ChatMessageProps } from "./ChatMessage";
import { ChatUsernameHeader } from "./ChatUsernameHeader";
import { messageContainerClasses } from "./messageContainerClasses"

export interface MessageContainerProps {
    messages: {
        message: string,
        fromAlias?: string,
        side: "left" | "right",
        date: number
    }[]
}

//probably should be memo
export const MessageContainer = (props: MessageContainerProps) => {

    const classes = useTypedStyles(messageContainerClasses);

    const { messages } = props;

    const formattedMessages = useMemo(() =>
        createIslands(messages, (a, b) => Math.abs(a.date - b.date) < 2 * 60 * 1000)
            .map(x => groupBy(x, a => a.fromAlias))

        , [messages])

    return <Paper className={classes.messageContainer}>
        <div className={classes.messageList}>
            {formattedMessages.map((island, islandIndex) => 
            /*shoul be memo*/
            <>
                
                <ChatDate date={island[0].elements[0].date} />
                {island.map((group, groupIndex) => 
                {

                /*shoul be memo*/
               return <>
                    {(islandIndex === 0 || groupIndex !==0 || formattedMessages[islandIndex -1][formattedMessages[islandIndex -1].length -1].key !== group.key) && <ChatUsernameHeader username={group.key} side={group.elements[0].side} />}
                    {group.elements.map(message => <ChatMessage key={message.date} {...message} />)}</>})}</>)}
        </div>
    </Paper>
}