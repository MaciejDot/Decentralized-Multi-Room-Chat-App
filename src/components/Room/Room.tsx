import { Chip, Container, createStyles, Grid, InputAdornment, makeStyles, Paper, TextField, Theme } from "@material-ui/core";
import { Send } from "@material-ui/icons";
import { SEA } from "gun";
import { useEffect } from "react";
import { useParams } from "react-router"
import { MessageLeft, MessageRight } from "./Message";
import { TextAreaChat } from "./TextAreaChat";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      width: "100%",
      height: "100vh",
      padding:'0',
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      position: "relative"
    },
    messagesBody: {
      width: "calc( 100% - 20px )",
      margin: 10,
      overflowY: "scroll",
      height: "calc( 100% - 80px )"
    }
  })
);

export const Room = () =>{
    const { roomName } = useParams<any>();

    useEffect(()=>{
    (async ()=>{
        let pair ;
        await (SEA).pair(data => pair = data);
        let pass = "only-one"
        let proof = await SEA.work(pass, pair);
        console.log(proof,pair);
        let cryp = await SEA.encrypt("data", proof);
        let decryp = await SEA.decrypt(cryp, proof)
        proof = await SEA.work(pass, pair);
        let decryp2 = await SEA.decrypt(cryp, proof)
        var data = await SEA.sign(cryp, pair);
console.log(data);
var msg = await SEA.verify(data, pair.pub);
        console.log(decryp, decryp2, msg)
    })()
    },[])

    const mockMessages = [{
        from: "Me",
        timestamp: Date.now(),
        message: 'Hello multilinetext something something something impotant tntntntn ntntnt nt loremi ipsum loldfsdf dsfsdf sdfsdf'
    }]
    const classes = useStyles();


    return  <Paper className={classes.paper}>
      <Paper id="style-1" className={classes.messagesBody}>
        <MessageLeft
          message="lorem ipsum "
          timestamp="MM/DD 00:00"
          photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
          displayName="ee"
          avatarDisp={true}
        />
        <MessageLeft
          message="xxxxxhttps://yahoo.co.jp "
          timestamp="MM/DD 00:00"
          photoURL=""
          displayName="eeee"
          avatarDisp={false}
        />
        <MessageRight
          message="rfaswdasd"
          timestamp="MM/DD 00:00"
          photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
          displayName="me"
          avatarDisp={true}
        />
        <MessageRight
          message="m"
          timestamp="MM/DD 00:00"
          photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
          displayName="me"
          avatarDisp={false}
        />
      </Paper>
      <TextAreaChat />
    </Paper>

}