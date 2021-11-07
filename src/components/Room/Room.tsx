import { Chip, Container, createStyles, Grid, InputAdornment, makeStyles, Paper, TextField, Theme } from "@material-ui/core";
import { Send } from "@material-ui/icons";
import { SEA } from "gun";
import { useEffect, useState } from "react";
import { useParams } from "react-router"
import { ChatInput } from "./ChatInput";
import { ChatMessageProps } from "./ChatMessage";
import { MessageLeft, MessageRight } from "./Message";
import { MessageContainer } from "./MessageContainer";
import { TextAreaChat } from "./TextAreaChat";

export const Room = () =>{
    const { roomName } = useParams<any>();
    const [mockedMessages, setMockedMessages] = useState<
    ChatMessageProps[]
>(Array.from(Array(100).keys()).map(() => ({
    message: "lorem ipsume sore mea aweodwa aweawe awe aweawe aweawe awe awe aweawesaz weawe aweawdfssdfgbsf ads asdasd asdasd asd asd asd as dasd a sd asd as d a sd a sd  as d as d a sd a sd  a sdasddasdasd",
    fromAlias: "any",
    side: Math.random() > 0.6 ? "right" : "left",
    date: Date.now() - Math.random() * 1000 * 60 *60
})))
const [value, setValue] =useState("")
return <>
 <MessageContainer
  messages={mockedMessages.sort((a,b) => a.date - b.date)}
 />
 <ChatInput
 onSend={() => {
   setMockedMessages([ ...mockedMessages, {
     message:value,
     fromAlias:'any',
     side:'right',
     date:Date.now()
   }])
   setValue("");
 }}
 value={value}
 onChange={setValue}
 />
</>

}