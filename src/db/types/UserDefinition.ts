
import { ThemeSettings } from "../../settings/theme/themeSettings";
import { SEAPair } from "../typedGun";

export interface DecryptedRoomData{
    roomPair: SEAPair,
    roomFirstSecret: SEAPair,
    adminCertificate: string,
}

export interface UserDefinition{
    alias: string,
    themeSettings: ThemeSettings,
    rooms: Record<string, string>
}