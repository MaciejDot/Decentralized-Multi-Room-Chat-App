import { Avatar, Box, Button, ButtonGroup, Card, InputAdornment, Link, Paper, TextField, Tooltip, Typography, useMediaQuery } from "@material-ui/core"
import { AccountCircle, ArrowBackIos, Chat, DeleteForever, Lock, LockOutlined } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import { useEffect, useMemo, useState } from "react"
import { useHistory, useParams } from "react-router";
import { useSearchParam } from "react-use";
import { getAuthUser, getUnAuthUser } from "../../db";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import useTypedStyles from "../../hooks/useTypedStyles";
import { notify } from "../../notification/Notification";
import { userActions } from "../../store/actions/userActions";
import { loginClasses } from "../../theme/loginClasses";



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

    const dispatch = useTypedDispatch();

    useEffect(()=>{dispatch(userActions.recallUser())},[dispatch])

    const [isLoading, setIsLoading] = useState(false)

    const [username, setUserName] = useState("");

    const [password, setPassword] = useState("")
    const history = useHistory();

    const loginHandler = () => {
        !isLoading && setIsLoading(true)
        getUnAuthUser().auth(username, password, (args)=>{
            setIsLoading(false)
            if((args as any).err !== undefined){
                return notify((args as any).err, 'error')
            }
            console.log(decodeURIComponent(window.location.hash.replace('#/Login','')))
            history.push(decodeURIComponent(window.location.hash.replace('#/Login','')) ?? "/");
            notify(`Logged in as ${getAuthUser().is.alias}`, 'success')
        })
    }

    

    const createAnAcoountHandler = () =>{
        setIsLoading(true)
        getUnAuthUser().create(username, password, args => {
            if((args as any).err !== undefined){
                return notify((args as any).err, 'error')
            }
            notify('Signed up was succesfull', 'success')
            loginHandler()
        })
    }
    const matches = useMediaQuery('(max-width:501px)');


    const CardWrapper :any = useMemo(()=>  matches ? (props:{children:any}) =><div style={{backgroundColor:'#424242', minHeight:'100vh', minWidth:'100vw'}}>{props.children}</div>:(props:{children:any}) =><Card style=
    {{zIndex: 1, position: 'absolute', width: '500px',
    maxWidth: '100%',
     margin: 0,
     transform: !matches && 'translateY(15%)',
     msTransform: !matches && 'translateY(15%)',
    minHeight: matches && '100vh',
    }}>{props.children}</Card>,[matches])
    
    return <CardWrapper>
        <form className={classes.paper}>
            
          <Avatar className={classes.avatar}>
            <Chat />
          </Avatar>
          <Typography component="h1" variant="h5" style={{color:'#fff'}}>
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
              <Copyright />
            </Box>
            </form>
      </CardWrapper>
}