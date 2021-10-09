import { Chip, Container, Grid, InputAdornment, makeStyles, TextField } from "@material-ui/core";
import { Send } from "@material-ui/icons";
import { useParams } from "react-router"

const useStyles = makeStyles(theme => ({
    container: {
      bottom: 0
      // position: "fixed" // remove this so we can apply flex design
    },
    bubbleContainer: {
      width: "100%",
      display: "flex" //new added flex so we can put div at left and right side
      //check style.css for left and right classnaeme based on your data
    },
    bubble: {
      border: "0.5px solid black",
      borderRadius: "10px",
      margin: "5px",
      padding: "10px",
      display: "inline-block"
    }
  }));

export const Room = () =>{
    const { roomName } = useParams<any>();

    const mockMessages = [{
        from: "Me",
        timestamp: Date.now(),
        message: 'Hello multilinetext something something something impotant tntntntn ntntnt nt loremi ipsum loldfsdf dsfsdf sdfsdf'
    }]
    const classes = useStyles();


    return <><Container>
                {mockMessages.map(message => <div className={`${classes.bubbleContainer} left`}>
      <div  className={classes.bubble}>
        <div >{message.message}</div>
      </div>
    </div>)}
        </Container>
        <TextField
            label="write message here"
            InputProps={{
                startAdornment: (
                  <InputAdornment position="end">
                    <Send/>
                  </InputAdornment>
                ),
              }} 
        />
    </>

}