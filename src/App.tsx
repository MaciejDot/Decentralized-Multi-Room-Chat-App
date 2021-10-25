import React, { ReactNode, useEffect, useMemo, useState } from "react";
import { resolveValue, Toaster } from "react-hot-toast";
import { Route, Switch } from "react-router-dom";
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
import { getAuthUser, getUnAuthUser, gunDB } from "./db";
import { Provider } from "react-redux";
import { createStoreInstance } from "./store/createStore";
function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [themeSettings, setThemeSettings] = useState(initialThemeSettings)
  useEffect(() => {
      gunDB.on('auth', () => {
        setIsAuthenticated(true)
      })
  },[])

  useEffect(() => {
    if(isAuthenticated){
      getAuthUser().get('themeSettings').once(data => 
        JSON.stringify({...initialThemeSettings,...data}) !== JSON.stringify(themeSettings) && setThemeSettings({...initialThemeSettings,...data}))
    }
  },[isAuthenticated])

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
    //interface extension 
    /*export class DebugRouter extends BrowserRouter {
    constructor(props) {
        super(props);
        console.log('initial history is: ', JSON.stringify(this.history, null, 2))
        this.history.listen((location, action) => {
            console.log(
                `The current URL is ${location.pathname}${location.search}${location.hash}`
            )
            console.log(`The last navigation action was ${action}`, JSON.stringify(this.history, null, 2));
        });
    }
}*/
   console.log(history.location)
  },[history.location])


  useEffect(()=>{
      const is = getUnAuthUser().recall({sessionStorage}).is;
      setIsLoading(false);
      console.log(window.location.hash);
      
      if(!is && !window.location.hash.startsWith('#/Login')){
        return history.push(`/Login/${encodeURIComponent(window.location.hash.replace('#/',''))}`);
      }
      if(is && window.location.hash.startsWith('#/Login')){
        return history.push('')
      }
  },[])

  const PrivateRoute = (props: {path: string, title: () =>string, children?:ReactNode}) => {
    return <Route path={props.path} exact><Helmet>
      <title>DMRC - {props.title()}</title>
      </Helmet>
      <AppMenu>
      {props.children}
      </AppMenu>
    </Route>
  }

  const matches = useMediaQuery('(max-width:501px)')

  const store = useMemo(createStoreInstance,[])

  return   <Provider store={store}><ThemeProvider theme={theme}>
    <div style={{justifyContent: 'center', display: 'flex'}}>
    {!isLoading  && !isAuthenticated  && !matches && <NetworkGraphVisualization/>}
    {!isLoading  && <div style={{position:'absolute', width:'100vw', justifyContent: 'center', display: 'flex'}}><Toaster
    >
        {(t) => <>{resolveValue(t.message, t)}</>}
        </Toaster>

        <Switch> {    isAuthenticated ?
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
      <Route path="/Login/">
      <Login/>
    </Route></>
        }
   </Switch></div>}</div></ThemeProvider></Provider>
}

export default App;
