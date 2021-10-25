import Gun, { SEA } from "gun";
import 'gun/axe'
import 'gun/sea'
import { IGunConstructorOptions } from "gun/types/options";
import { AckCallback } from "gun/types/types";

type AuthArgs = [username: string, password: string, callback: (data: { err?: string }) => any] | [pair: SEAPair, callback: (data: { err?: string }) => any]

export interface GunUser<T> {
    is?: undefined
    recall: (opt?: { sessionStorage: typeof sessionStorage }) => GunUser<T> | AuthenticatedGunUser<T>
    auth: (...t: AuthArgs) => GunUser<T> | AuthenticatedGunUser<T>
    create: (...t: AuthArgs) => GunUser<T> | AuthenticatedGunUser<T>
}


export interface AuthenticatedGunUser<T> {
    is: {
        alias: string | SEAPair
        epub: string
        pub: string
    }
    get: <TKey extends keyof T>(name: TKey) => AuthenticatedGunUserTree<T, TKey> & Promise<T[TKey]>
    leave: () => void
}

type AuthenticatedGunUserTree<T, TKey extends keyof T> = AuthenticatedGunUser<T[TKey]> & GunTree<T, TKey>;

interface GunGet<T> {
    get: <TKey extends keyof T>(name: TKey) => GunTree<T, TKey> & GunGet<T[TKey]> & Promise<T[TKey]>
}

type GunTree<T, TKey extends keyof T> = {
    on: (callback: (state: T[TKey], key: TKey) => any) => { off: () => void }
    once: (callback: (state: T[TKey], key: TKey) => any) => void
    put: (state: T[TKey], callback?: AckCallback, options?: { opt?: { cert?: string } }) => void,
    set: (state: T[TKey]) => void,
    map: (match?: any) => AuthenticatedGunUserTree<T[TKey], keyof T[TKey]>
}


export function isUserAuthenticated<T>(user: GunUser<T> | AuthenticatedGunUser<T>): user is AuthenticatedGunUser<T> {
    return !!user.is
}


interface GunDefinition {
    user: <T>() => GunUser<T> | AuthenticatedGunUser<T>,
    get: <T, TKey extends keyof T>(name: TKey) => GunTree<T, TKey> & GunGet<T[TKey]> & Promise<T[TKey]>,
    on: (eventName: 'auth', callback: () => any) => { off: () => void },
}

const TypedGun = Gun as any as {
    (options?: string | string[] | IGunConstructorOptions): GunDefinition;
    new(options?: string | string[] | IGunConstructorOptions): GunDefinition;
}

export interface SEAPair {
    epriv: string
    epub: string
    priv: string
    pub: string
}


type Authority = SEAPair

export const TypedSEA = SEA as any as {
    secret: (epubKey: string, pair: SEAPair) => Promise<string>
    pair: () => Promise<SEAPair>
    sign: (data: any, pair: SEAPair) => Promise<string>
    verify: <T>(data: string, pair: SEAPair | string) => Promise<T | undefined>
    encrypt: (data: any, pair: SEAPair | string) => Promise<string>
    decrypt: <T>(data: string, pair: SEAPair | string) => Promise<T | undefined>
    certify: (user: string | string[] | { pub: string } | { pub: string }[], policies: any, pair: Authority, callback: (cert: string) => any, opt?: { blacklist?: string, expiry?: number }) => Promise<string>
}

export const GetGunInstance = () => {
    return new TypedGun({
        peers: [
          //  'http://gun-matrix.herokuapp.com/gun',
         //   'https://gun-ams1.maddiex.wtf:443/gun',
        //    'https://gun-sjc1.maddiex.wtf:443/gun',
            'https://shockblox-gun-server.herokuapp.com/gun',
        //    'https://mg-gun-manhattan.herokuapp.com/gun',
       //     'https://gunmeetingserver.herokuapp.com/gun',
            //'https://gun-eu.herokuapp.com/gun',
           // 'https://gunjs.herokuapp.com/gun',
           // 'https://myriad-gundb-relay-peer.herokuapp.com/gun',
           // 'https://gun-armitro.herokuapp.com/',
        //    'https://fire-gun.herokuapp.com/gun',
          //  'http://34.101.247.230:8765/gun'
        ]
    });
}

export const getUserSeaPair = () => {
    return JSON.parse(sessionStorage.pair) as SEAPair
}


/*copy of db must be in store and it must register subscriptions*/