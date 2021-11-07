import { Card, CardContent, Grid, Typography, Switch, InputLabel, Button } from "@material-ui/core"
import { Color, ColorPicker, createColor } from "material-ui-color"
import { useEffect, useState } from "react"
import { useToggle } from "react-use"
//import { getAuthUser } from "../../db"
import { notify } from "../../notification/Notification"
import { initialThemeSettings, ThemeSettings } from "../../settings/theme/themeSettings"
import Skeleton from "../shared/Skeleton"

export const UserSettings = () => {
    const [isLoading, setIsLoading] = useToggle(true);
    const [darkMode, setDarkMode] = useToggle(false)
    const [colorPrimary, setColorPrimary] = useState<Color>();
    const [colorSecondary, setColorSecondary] = useState<Color>();
    const [colorInfo, setColorInfo] = useState<Color>();
    const [colorError, setColorError] = useState<Color>();
    const [colorWarning, setColorWarning] = useState<Color>();
    const [colorSuccess, setColorSuccess] = useState<Color>();
    const [colorContrastPrimary, setColorContrastPrimary] = useState<Color>();
    const [colorContrastSecondary, setColorContrastSecondary] = useState<Color>();
    const [colorContrastInfo, setColorContrastInfo] = useState<Color>();
    const [colorContrastError, setColorContrastError] = useState<Color>();
    const [colorContrastWarning, setColorContrastWarning] = useState<Color>();
    const [colorContrastSuccess, setColorContrastSuccess] = useState<Color>();
    const setupTheme = (settings: ThemeSettings) => {
        setDarkMode(settings.darkMode)
        setColorPrimary(createColor(settings.primary))
        setColorSecondary(createColor(settings.secondary))
        setColorInfo(createColor(settings.info))
        setColorError(createColor(settings.error))  
        setColorWarning(createColor(settings.warning))
        setColorSuccess(createColor(settings.success))
        setColorContrastPrimary(createColor(settings.contrastTextPrimary))
        setColorContrastSecondary(createColor(settings.contrastTextSecondary))
        setColorContrastInfo(createColor(settings.contrastTextInfo))
        setColorContrastError(createColor(settings.contrastTextError))
        setColorContrastWarning(createColor(settings.contrastTextWarning))
        setColorContrastSuccess(createColor(settings.contrastTextSuccess))
    }

    useEffect(() => {
       /* ( async () => {
            const settings = await (getAuthUser().get('themeSettings').once(data => {

                setupTheme({...initialThemeSettings,...data})}) as any)
            if (!settings) {
                setupTheme(initialThemeSettings);
            }
            setIsLoading(false)
        })()*/
    }, [])

  


  

    const onSave = async () => {
            setIsLoading(true)
        /* await getAuthUser().get("themeSettings").set({
            primary: `#${colorPrimary.hex}`,
            contrastTextPrimary: `#${colorContrastPrimary.hex}`,
            secondary: `#${colorSecondary.hex}`,
            contrastTextSecondary: `#${colorContrastSecondary.hex}`,
            info: `#${colorInfo.hex}`,
            contrastTextInfo: `#${colorContrastInfo.hex}`,
            error: `#${colorError.hex}`,
            contrastTextError: `#${colorContrastError.hex}`,
            success: `#${colorSuccess.hex}`,
            contrastTextSuccess: `#${colorContrastSuccess.hex}`,
            warning: `#${colorWarning.hex}`,
            contrastTextWarning: `#${colorContrastWarning.hex}`,
            darkMode: darkMode
        })*/
        setIsLoading(false);
    }

    const onDefaultSettings = () => {
        setupTheme(initialThemeSettings);
        onSave();
    }

    const ColorPickerCustom = (props: { label: string, value: Color, onChange: (color: Color) => any }) => {
        return <Grid item xs={12} lg={6}>
            <Skeleton isLoading={isLoading}>
                <ColorPicker
                    value={props.value}
                    onChange={newColor => props.onChange(newColor)}
                />
                <InputLabel>
                    {props.label}
                </InputLabel>
            </Skeleton>
        </Grid>
    }

    return <Card>
        <CardContent>
            <Grid container spacing={3} justifyContent="space-evenly">
                <Grid item xs={12}>
                    <Typography variant="subtitle1">Settings</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={onDefaultSettings}
                        disabled={isLoading}
                    >
                        Go Back To Default Settings
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Skeleton isLoading={isLoading}>
                        <Switch
                                  checked={darkMode}
                            color="primary"
                            onChange={() => setDarkMode()}
                        />
                        <InputLabel>
                            Dark Theme
                        </InputLabel>
                    </Skeleton>
                </Grid>
                <ColorPickerCustom
                    value={colorPrimary}
                    onChange={setColorPrimary}
                    label="Primary color"
                />
                <ColorPickerCustom
                    value={colorContrastPrimary}
                    onChange={setColorContrastPrimary}
                    label="Primary color contrast text"
                />
                <ColorPickerCustom
                    value={colorSecondary}
                    onChange={setColorSecondary}
                    label="Secondary color"
                />
                <ColorPickerCustom
                    value={colorContrastSecondary}
                    onChange={setColorContrastSecondary}
                    label="Secondary color contrast text"
                />
                <ColorPickerCustom
                    value={colorInfo}
                    onChange={setColorInfo}
                    label="Info color"
                />
                <ColorPickerCustom
                    value={colorContrastInfo}
                    onChange={setColorContrastInfo}
                    label="Info color contrast text"
                />
                <ColorPickerCustom
                    value={colorWarning}
                    onChange={setColorWarning}
                    label="Warning color"
                />
                <ColorPickerCustom
                    value={colorContrastWarning}
                    onChange={setColorContrastWarning}
                    label="Warning color contrast text"
                />
                <ColorPickerCustom
                    value={colorError}
                    onChange={setColorError}
                    label="Error color"
                />
                <ColorPickerCustom
                    value={colorContrastError}
                    onChange={setColorContrastError}
                    label="Error color contrast text"
                />
                <ColorPickerCustom
                    value={colorSuccess}
                    onChange={setColorSuccess}
                    label="Success color"
                />
                <ColorPickerCustom
                    value={colorContrastSuccess}
                    onChange={setColorContrastSuccess}
                    label="Success color contrast text"
                />
                <Grid item xs={12}>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={onSave}
                        disabled={isLoading}
                    >
                        Update Settings
                    </Button>
                </Grid>
            </Grid>
        </CardContent>
    </Card>
}