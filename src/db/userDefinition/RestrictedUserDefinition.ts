import { DashboardSettings } from "../../settings/dashboard/dashboardSettings";
import { ThemeSettings } from "../../settings/theme/themeSettings";

export interface UserDefinitionProp{
    alias: string,
    dashboardSettings: DashboardSettings,
    themeSettings: ThemeSettings,
}