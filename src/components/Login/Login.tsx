import { Avatar, Box, Button, ButtonGroup, CssBaseline, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, InputAdornment, Link, Paper, TextField, Tooltip, Typography } from "@material-ui/core"
import { AccountCircle, ArrowBackIos, Chat, DeleteForever, Lock, LockOutlined } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import { useState } from "react"
import { useToggle } from "react-use";
import { destroySavedAppData, user } from "../../db/gunDB";
import useTypedStyles from "../../hooks/useTypedStyles";
import { notify } from "../../notification/Notification";
import { loginClasses } from "../../theme/loginClasses";
import { DeleteAllDialog } from "../deleteAllDialog/DeleteAllDialog";

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        <Link color="inherit" href="https://github.com/MaciejDot/Decentralized-Multi-Room-Chat-App">
          Decentralized Multi Room Chat
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

export const Login = () => {
    const classes = useTypedStyles(loginClasses);
    const [isLoading, setIsLoading] = useState(false)

    const [username, setUserName] = useState("");

    const [password, setPassword] = useState("")

    const loginHandler = () => {
        !isLoading && setIsLoading(true)
        user.auth(username, password, (args)=>{
            setIsLoading(false)
            if((args as any).err !== undefined){
                return notify((args as any).err, 'error')
            }
        })
    }

    const createAnAcoountHandler = () =>{
        setIsLoading(true)
        user.create(username, password, args => {
            if((args as any).err !== undefined){
                return notify((args as any).err, 'error')
            }
            notify('Signed up was succesfull', 'success')
            loginHandler()
        })
    }

    const [deleteAllDialogIsOpen, setIsDeleteDialogIsOpen] = useToggle(false)

    return <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
            
          <Avatar className={classes.avatar}>
            <Chat />
          </Avatar>
          <Typography component="h1" variant="h5">
          Decentralized Multi Room Chat
          </Typography>
            <TextField
            value={username}
            onChange={e => setUserName(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
             value={password}
             onChange={e => setPassword(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock/>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={loginHandler}
            >
              Sign In
            </Button>
              <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={createAnAcoountHandler}
            >
                Create An Account
            </Button>
            <Box mt={5}>
                <Tooltip title="All Localy saved data will be delete. Possibility of losing access to all acounts that were logged in on this browser">
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  className={classes.submit}
                  onClick={() => setIsDeleteDialogIsOpen()}
                  startIcon={ <DeleteForever/>}
                >
                       Delete all locally saved data
                </Button>
                </Tooltip>
            </Box>
            <Box mt={5}>
              <Copyright />
            </Box>
            <DeleteAllDialog
                isOpen={deleteAllDialogIsOpen}
                close={()=>setIsDeleteDialogIsOpen()}
            />
            </div>
      </Grid>
    
      </Grid>
}