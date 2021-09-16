import { Grid } from "@material-ui/core"
import { useEffect, useState } from "react"
import { user } from "../../db/gunDB"
import { initialDashboardSettings } from "../../settings/dashboard/dashboardSettings"
import { CreateRoom } from "./createRoom/CreateRoom"
import { SearchForRoom } from "./searchForRoom/SearchForRoom"

export const Dashboard =()=>{
    const [isLoading, setIsLoading] = useState(true)
    const [dashboardSettings, setDashboardSettings] = useState(initialDashboardSettings)
    const init = async()=>{
        const settings = await user.get("dashboardSettings").on(data => setDashboardSettings(data));
        settings && setDashboardSettings(settings)
        isLoading && setIsLoading(false)
    }
    useEffect(()=>{
        init()
    },[])
    return isLoading ? <>is loading ....</> : <Grid container spacing={3} justifyContent="space-evenly">
        <Grid item xs={12} lg={6}><SearchForRoom/></Grid>
        <Grid item xs={12} lg={6}><CreateRoom/></Grid>
    </Grid>
}