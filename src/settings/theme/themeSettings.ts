import { colors } from "@material-ui/core";

export interface ThemeSettings{
    primary: string,
    contrastTextPrimary: string
    secondary: string,
    contrastTextSecondary:string
    info: string,
    contrastTextInfo: string,
    success: string,
    contrastTextSuccess: string,
    warning: string,
    contrastTextWarning: string,
    error: string,
    contrastTextError: string
    darkMode: boolean
}
export const initialThemeSettings: ThemeSettings = {
    primary: colors.blue[500],
    contrastTextPrimary: '#fff',
    secondary: colors.grey[300],
    contrastTextError:'#fff',
    contrastTextInfo:'#fff',
    contrastTextSecondary:'#fff',
    contrastTextSuccess:'#fff',
    contrastTextWarning: '#fff',
    info: colors.lightBlue[300],
    success: colors.green[500],
    error: colors.red[300],
    warning: colors.orange[300],
    darkMode: false
}