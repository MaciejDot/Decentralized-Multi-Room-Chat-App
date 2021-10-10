import { Room } from "@material-ui/icons";
import Gun, { SEA } from "gun";
import 'gun/axe'
import 'gun/sea'
import { IGunConstructorOptions } from "gun/types/options";
import { RoomDefinition } from "./types/RoomDefinition";


type AuthArgs = [username: string, password: string, callback: (data: { err?: string }) => any] | [ pair :SEAPair, callback: (data: { err?: string }) => any]

export interface GunUser<T> {
    is?: undefined
    recall: (opt?: { sessionStorage: typeof sessionStorage }) => GunUser<T> |AuthenticatedGunUser<T>
    auth: (...t: AuthArgs) => GunUser<T> |AuthenticatedGunUser<T>
    create: (...t: AuthArgs) => GunUser<T> |AuthenticatedGunUser<T>
}

export interface AuthenticatedGunUser<T>{
    is: {
        alias: string
        epub: string
        pub: string
    }
    get: <TKey extends keyof T>(name: TKey) => AuthenticatedGunUserTree<T, TKey> & Promise<T[TKey]>
    leave: () => void
}

type AuthenticatedGunUserTree<T , TKey extends keyof T> = AuthenticatedGunUser<T[TKey]> & GunTree<T,TKey>;

interface GunGet<T> {
    get: <TKey extends keyof T>(name: TKey) => GunTree<T,TKey> & GunGet<T[TKey]> &Promise<T[TKey]>
}

type GunTree<T , TKey extends keyof T> = {
    on: (callback:(state:T[TKey], key: TKey) => any) => void
    once: (callback: (state:T[TKey], key: TKey) => any) => void
    put: (state: T[TKey]) => void,
    set: (state: T[TKey]) => void,
    map: (match?: any) => AuthenticatedGunUserTree<T[TKey], keyof T[TKey]>
}


export function isUserAuthenticated  <T>(user : GunUser<T> |AuthenticatedGunUser<T>): user is AuthenticatedGunUser<T>{
    return !!user.is
}


interface GunDefinition<V> extends GunGet<V> {
    user: <T>() => GunUser<T> | AuthenticatedGunUser<T>,
    on: (eventName: 'auth', callback: () => any) => void,
}

const TypedGun = Gun as any as {
    <V>(options?: string | string[] | IGunConstructorOptions): GunDefinition<V>;
    new <V>(options?: string | string[] | IGunConstructorOptions): GunDefinition<V>;
}

interface SEAPair{
    epriv: string
    epub: string
    priv: string
    pub: string
}


type Authority = SEAPair

export const TypedSEA = SEA as any as {
    pair: () => Promise<SEAPair>
    sign: (data:any, pair: SEAPair) => Promise<string>
    verify: <T>(data: string, pair: SEAPair | string) => Promise<T | undefined>
    encrypt: (data:any, pair: SEAPair | string) => Promise<string>
    decrypt: <T>(data:string, pair: SEAPair | string) => Promise<T| undefined>
    certify: (user : string | string[]| {pub:string} | {pub:string}[], policies: any, pair: Authority, callback: (cert:string) => any, opt?: { blacklist: string }) => Promise<string>
}

type Pre<T extends string> = `~${T}`

export const GetGunInstance = (options?: string | string[] | IGunConstructorOptions)=>{
    return new TypedGun<Record<Pre<string>, RoomDefinition>>(options);
}