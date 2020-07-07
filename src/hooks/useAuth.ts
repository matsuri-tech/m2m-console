import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react"
import { m2mUsers } from "../endpoints/m2m-users"

export const checkJwtExpiration = (jwt: string): boolean => {
    const splitted = jwt.split(".")
    if (splitted.length !== 3) return false

    const [, payload] = splitted
    const exp = JSON.parse(atob(payload))["exp"]
    return new Date() < new Date(exp * 1000)
}

export interface TokenStorageApi {
    setToken: (token: string) => void
    getToken: () => string | null
    clearToken: () => void
}

export const tokenStorageApiWithLocalStorage: TokenStorageApi = {
    setToken: (token: string) => {
        return localStorage.setItem("auth_token", token)
    },
    getToken: (): string | null => {
        return localStorage.getItem("auth_token")
    },
    clearToken: () => {
        localStorage.removeItem("auth_token")
    },
}

let tokenCache: null | string = null

export interface UseAuthOption {
    jwtExpirationChecker?: (jwt: string) => boolean
    tokenStorageApi?: TokenStorageApi
}

export interface UseAuthState {
    token: string
    authenticated: boolean
    requestLogin: (input: LoginInput) => void
    requestLogout: () => void
}

export interface LoginInput {
    email: string
    password: string
}

export const useAuth = (option?: UseAuthOption): UseAuthState => {
    const tokenStorageApi =
        option?.tokenStorageApi ?? tokenStorageApiWithLocalStorage
    const jwtExpirationChecker =
        option?.jwtExpirationChecker ?? checkJwtExpiration

    if (!tokenCache) tokenCache = tokenStorageApi.getToken()
    const [token, setToken] = useState<string>(tokenCache || "")
    const [authenticated, setAuthenticated] = useState(!!tokenCache)

    const tryCheckAuth = useCallback(() => {
        const authToken = tokenStorageApi.getToken()
        if (!(authToken && jwtExpirationChecker(authToken))) {
            tokenStorageApi.clearToken()
            setToken("")
            setAuthenticated(false)
            tokenCache = null
        } else {
            setToken(authToken)
            setAuthenticated(true)
        }
    }, [jwtExpirationChecker, tokenStorageApi])

    useEffect(() => {
        tryCheckAuth()
    }, [tryCheckAuth])

    const requestLogin = useCallback(
        async (input: LoginInput): Promise<Response> => {
            const resp = await fetch(m2mUsers.v1.login(), {
                method: "POST",
                body: JSON.stringify(input),
                headers: {
                    "Content-Type": "application/json",
                },
            })
            if (resp.ok) {
                const body = await resp.json()
                const authToken = body.accessToken

                tokenStorageApi.setToken(authToken)
                tryCheckAuth()
            }
            return resp
        },
        [tokenStorageApi, tryCheckAuth]
    )

    const requestLogout = useCallback(() => {
        tokenStorageApi.clearToken()
        // tokenCacheはreloadで消滅します
        window.location.reload()
    }, [tokenStorageApi])

    return {
        token,
        authenticated,
        requestLogin,
        requestLogout,
    }
}

export const AuthenticationContext = createContext<UseAuthState | undefined>(
    undefined
)

export const AuthProvider = AuthenticationContext.Provider

export const useAuthCtx = (): UseAuthState | never => {
    const ctx = useContext(AuthenticationContext)
    if (!ctx) throw new Error("Authentication Provider is not found")
    return {
        token: ctx.token,
        authenticated: ctx.authenticated,
        requestLogin: ctx.requestLogin,
        requestLogout: ctx.requestLogout,
    }
}
