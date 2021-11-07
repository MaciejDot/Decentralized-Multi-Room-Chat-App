import { Avatar, Box, Button, ButtonGroup, Card, IconButton, InputAdornment, Link, Paper, TextField, Tooltip, Typography, useMediaQuery } from "@material-ui/core"
import { AccountCircle, ArrowBackIos, Chat, DeleteForever, Lock, LockOutlined, Visibility, VisibilityOff } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import { useEffect, useMemo, useState } from "react"
import { useHistory, useParams } from "react-router";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import useTypedStyles from "../../hooks/useTypedStyles";
import { notify } from "../../notification/Notification";
import { userActions } from "../../store/actions/userActions";
import { loginClasses } from "../../theme/loginClasses";
import {memo} from 'react'


const Copyright = memo(() => {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        <Link color="inherit" href="https://github.com/MaciejDot/Decentralized-Multi-Room-Chat-App">
          Decentralized Multi Room Chat
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  })

export const Login = () => {
    const classes = useTypedStyles(loginClasses);
    const dispatch = useTypedDispatch();

    const { isUserAuthorizing, userAuthorizationError } = useTypedSelector(state=> state.user);

    const [username, setUserName] = useState("");

    const [password, setPassword] = useState("");

    

    const loginHandler = () => dispatch(userActions.loginUser(username, password));

    const createAnAcoountHandler = () =>{
     /*   setIsLoading(true)
        getUnAuthUser().create(username, password, args => {
            if((args as any).err !== undefined){
                return notify((args as any).err, 'error')
            }
            notify('Signed up was succesfull', 'success')
            loginHandler()
        })*/
    }

    //useEffect(()=>{ userAuthorizationError && notify(userAuthorizationError,'error')},[userAuthorizationError])


    const history = useHistory();

    
useEffect(()=>{ dispatch(userActions.resetUserState())},[dispatch])

    const matches = useMediaQuery('(max-width:501px)');


    const CardWrapper :any = useMemo(()=>  matches ? (props:{children:any}) =><div style={{backgroundColor:'#424242', minHeight:'100vh', minWidth:'100vw'}}>{props.children}</div>:(props:{children:any}) =><Card style=
    {{zIndex: 1, position: 'absolute', width: '500px',
    maxWidth: '100%',
     margin: 0,
     transform: !matches && 'translateY(15%)',
     msTransform: !matches && 'translateY(15%)',
    minHeight: matches && '100vh',
    }}>{props.children}</Card>,[matches])

    const [isPasswordFieldVisible, setIsPasswordFieldVisible ] = useState(false)
    
    return <CardWrapper>
        <form className={classes.paper} >
            
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
              error={!!userAuthorizationError}
              helperText={userAuthorizationError}
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              disabled={isUserAuthorizing}
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
              error={!!userAuthorizationError}
              type={isPasswordFieldVisible ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              helperText={userAuthorizationError}
              disabled={isUserAuthorizing}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock/>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end" >
                    <IconButton disabled={isUserAuthorizing} onClick={()=> setIsPasswordFieldVisible(!isPasswordFieldVisible)}>{isPasswordFieldVisible?<VisibilityOff/>:<Visibility/>}</IconButton>
                  
                </InputAdornment>
                )
              }}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={isUserAuthorizing}
              onClick={loginHandler}
            >
              Sign In
            </Button>
              <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={isUserAuthorizing}
              href={"#/CreateAnAccount"}
            >
                Create An Account
            </Button>
            <Box mt={5}>
              <Copyright />
            </Box>
            </form>
      </CardWrapper>
}