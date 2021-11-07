import React, { ReactNode, useEffect, useMemo, useState } from "react";
import { resolveValue, Toaster } from "react-hot-toast";
import { HashRouter, Route, Switch } from "react-router-dom";
import { useTimeoutFn } from "react-use";
import { Login } from "./components/Login/Login";
import { useHistory } from 'react-router'
import { notify } from "./notification/Notification";
import { Helmet } from "react-helmet"
import { AppMenu } from "./components/AppMenu/AppMenu";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { ThemeProvider } from "@material-ui/styles";
import { initialThemeSettings, ThemeSettings } from "./settings/theme/themeSettings";
import { UserSettings } from "./components/userSettings/UserSettings";
import { createTheme, ThemeOptions, useMediaQuery } from "@material-ui/core";
import Color from 'color'
import { NetworkGraphVisualization } from "./components/networkGraph/NetworkGraphVisualization";
import { Room } from "./components/Room/Room";
import { Provider } from "react-redux";
import { createStoreInstance } from "./store/createStore";
import { useTypedSelector } from "./hooks/useTypedSelector";
import { useTypedDispatch } from "./hooks/useTypedDispatch";
import { userActions } from "./store/actions";
import { CreateAnAccount } from "./components/createAnAccount/CreateAnAccount";
function App() {
  const { isUserAuthorized, isUserRecallComplete} = useTypedSelector(state=> state.user);
  const [themeSettings, setThemeSettings] = useState(initialThemeSettings)
  const dispatch = useTypedDispatch();
  useEffect(()=>{dispatch(userActions.recallUser())},[dispatch])
  useEffect(() => {
    /*if(isUserAuthorized){
      getAuthUser().get('themeSettings').once(data => 
        JSON.stringify({...initialThemeSettings,...data}) !== JSON.stringify(themeSettings) && setThemeSettings({...initialThemeSettings,...data}))
    }*/
  },[isUserAuthorized])

  const setupColor = (color: string, contrastText: string) =>({
    main: color,
    dark: Color(color, 'hex').darken(0.3).hex(),
    light: Color(color,'hex').lighten(0.3).hex(),
    contrastText: contrastText
  })

  const setupTheme = (data: ThemeSettings) => ({
    palette:{
      type: data.darkMode ? "dark" : "light",
      primary: setupColor(data.primary, data.contrastTextPrimary),
      secondary: setupColor(data.secondary, data.contrastTextSecondary),
      error: setupColor(data.error, data.contrastTextError),
      success: setupColor(data.success, data.contrastTextSuccess),
      info: setupColor(data.info, data.contrastTextInfo),
      warning: setupColor(data.warning, data.contrastTextWarning)
    }
  }) as any as ThemeOptions;

  const theme = useMemo(()=> createTheme(setupTheme(themeSettings)), [themeSettings])

  const history = useHistory();

  //if not production
  useEffect(()=> {
   console.log(history.location)
  },[history.location])


  useEffect(()=>{
      if(!isUserRecallComplete)
        return;
      if(!isUserAuthorized && ! history.location.pathname.startsWith('/Login') && !history.location.pathname.startsWith('/CreateAnAccount'))
         history.push(`/Login`);
      
      if(isUserAuthorized && (history.location.pathname.startsWith('/Login') || history.location.pathname.startsWith('/CreateAnAccount')))
         history.push('/')
      
  },[isUserAuthorized, isUserRecallComplete, history])

  const PrivateRoute = (props: {path: string, title: () =>string, children?:ReactNode}) => {
    return <Route path={props.path} exact><Helmet>
      <title>DMRC - {props.title()}</title>
      </Helmet>
      <AppMenu>
      {props.children}
      </AppMenu>
    </Route>
  }



  return  <ThemeProvider theme={theme}>
    <div style={{justifyContent: 'center', display: 'flex'}}>
    {/*!isLoading  && !isAuthenticated  && !matches && <NetworkGraphVisualization/>*/}
    {isUserRecallComplete  && <div style={{position:'absolute', width:'100vw', justifyContent: 'center', display: 'flex'}}><Toaster
    >
        {(t) => <>{resolveValue(t.message, t)}</>}
        </Toaster>

        <Switch> {    isUserAuthorized ?
  <>
     <PrivateRoute path="/" title={() =>`Dashboard`}>
        <Dashboard/>
     </PrivateRoute>
     <PrivateRoute path="/room" title={() =>`Room`}>
         <Room/>
      </PrivateRoute>
      <PrivateRoute path="/settings" title={() =>`Settings`}>
         <UserSettings/>
      </PrivateRoute></>:<>
      <Route path="/Login/:returnUrl">
        <Login/>
      </Route>
      <Route path="/Login">
      <Login/>
    </Route>
    <Route path="/CreateAnAccount">
      <CreateAnAccount/>
    </Route></>
        }
   </Switch></div>}</div></ThemeProvider>
}

const AppWraper =() => {   
  const store = useMemo(createStoreInstance,[]);
  return  <HashRouter><Provider store={store}><App/></Provider></HashRouter>
};

export default AppWraper;
