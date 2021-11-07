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
import { memo } from 'react'
import { useForm, ValidationResult } from "../../hooks/useForm";
import { useDispatch } from "react-redux";
import { sharedTextfieldProps } from "../../props/sharedTextFieldProps";


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

/*desired form handling*/


export const CreateAnAccount = () => {
  const classes = useTypedStyles(loginClasses);
  const dispatch = useTypedDispatch();
  const { userIsBeingCreated } = useTypedSelector(state => state.user)

useEffect(()=>{ dispatch(userActions.resetUserState())},[dispatch])
  const { formState, onSubmit,  inputPropsMap } = useForm({
    username: '',
    password: '',
    repeatPassword: ''
  },
    () => dispatch(userActions.createUser(formState.username, formState.password)),
    {},
    async (state) => {
      let err: ValidationResult<typeof state> = {}
      if (!state.username)
        err.username = 'Username field is required'

      if (!state.password)
        err.password = 'Password field is required'

      if((state.password?.length?? 0) < 8)
        err.password = 'Password must be at leat 8 characters long'

      if (!state.repeatPassword)
        err.repeatPassword = 'Repeat Password field is required'

      if (state.repeatPassword !== state.password) {
        err.password = "Password field and repeat password must be the same"
        err.repeatPassword = "Password field and repeat password must be the same"
      }
      return err;
    },
    userIsBeingCreated,
    (val) => dispatch(userActions.setIsUserBeingCreated(val))

  )

  const matches = useMediaQuery('(max-width:501px)');


  const CardWrapper: any = useMemo(() => matches ? (props: { children: any }) => <div style={{ backgroundColor: '#424242', minHeight: '100vh', minWidth: '100vw' }}>{props.children}</div> : (props: { children: any }) => <Card style=
    {{
      zIndex: 1, position: 'absolute', width: '500px',
      maxWidth: '100%',
      margin: 0,
      transform: !matches && 'translateY(15%)',
      msTransform: !matches && 'translateY(15%)',
      minHeight: matches && '100vh',
    }}>{props.children}</Card>, [matches])

  const [isPasswordFieldVisible, setIsPasswordFieldVisible] = useState(false)

  const [isReapetPasswordVisible, setIsRepeatPasswordVisible] = useState(false);

  return <CardWrapper>
    <form className={classes.paper} onSubmit={onSubmit}>

      <Avatar className={classes.avatar}>
        <Chat />
      </Avatar>
      <Typography component="h1" variant="h5" style={{ color: '#fff' }}>
        Decentralized Multi Room Chat
      </Typography>
      <TextField
        { ...inputPropsMap("username")}
        {...sharedTextfieldProps("Name")}
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
         { ...inputPropsMap("password")}
         { ...sharedTextfieldProps("Password")}
      
        type={isPasswordFieldVisible ? "text" : "password"}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Lock />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end" >
              <IconButton disabled={userIsBeingCreated} onClick={() => setIsPasswordFieldVisible(!isPasswordFieldVisible)}>{!isPasswordFieldVisible ? <VisibilityOff /> : <Visibility />}</IconButton>

            </InputAdornment>
          )
        }}
      />
      <TextField
        {...inputPropsMap("repeatPassword")}
      {...sharedTextfieldProps("Repeat password")}
        type={isReapetPasswordVisible ? "text" : "password"}
        id="repeat-password"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Lock />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end" >
              <IconButton disabled={userIsBeingCreated} onClick={() => setIsRepeatPasswordVisible(!isReapetPasswordVisible)}>{!isReapetPasswordVisible ? <VisibilityOff /> : <Visibility />}</IconButton>
            </InputAdornment>
          )
        }}
      />
      <Button
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        disabled={userIsBeingCreated}
        href={"#/Login"}
      >
        Sign In
      </Button>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        disabled={userIsBeingCreated}
        type="submit"
      >
        Create An Account
      </Button>
      <Box mt={5}>
        <Copyright />
      </Box>
    </form>
  </CardWrapper>
}