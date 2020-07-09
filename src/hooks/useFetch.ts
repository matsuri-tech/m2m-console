import { useCallback, useEffect, useRef, useState } from "react"

export type fetcherPayload<T = any> = {
    query?: T
    body?: any
}

export type fetcherResult<T> = {
    data: T | undefined
    error: any
}

export const fetcherCreator = <T>(
    fn: (args: any) => string,
    options: {
        method?: string
        authToken?: string
        fetch?: (info: RequestInfo, init?: RequestInit) => Promise<Response>
    }
) => async (payload?: fetcherPayload): Promise<fetcherResult<T>> => {
    try {
        let obj: RequestInit = {}
        if (options.authToken) {
            obj.headers = {
                "X-Access-Token": options.authToken,
            }
        }
        if (options.method) {
            obj.method = options.method
        }
        if (payload?.body) {
            obj.body = payload.body
        }

        obj.headers = {
            "Content-Type": "application/json",
            ...(obj.headers ?? {}),
        }

        const resp = await (options.fetch ?? fetch)(fn(payload?.query), obj)

        if (!resp.ok) {
            throw new Error(`${resp.status}: ${await resp.text()}`)
        }

        const bodyText = await resp.text()
        return {
            // responseが空の場合があるのでケアする
            data: bodyText && JSON.parse(bodyText),
            error: undefined,
        }
    } catch (err) {
        return {
            data: undefined,
            error: err,
        }
    }
}

export interface UseFetchState<T, S = any> {
    data: T | undefined
    loaded: boolean
    error: Error | undefined
    refetch: (payload: fetcherPayload<S>) => Promise<fetcherResult<T>>
}

export const useFetch = <T, S = any>(
    fn: (args: S) => string,
    options: { authToken?: string },
    payload?: fetcherPayload<S>
): UseFetchState<T, S> => {
    const [data, setData] = useState<T>()
    const [loaded, setLoaded] = useState(false)
    const [error, setError] = useState()

    const fetcher = useCallback(fetcherCreator<T>(fn, options), [fn, options])

    const refetch = useCallback(
        async (payload?: fetcherPayload) => {
            const res = await fetcher(payload)
            setError(error)
            setLoaded(true)
            setData(res.data)
            return res
        },
        [error, fetcher]
    )

    const payloadCache = useRef<undefined | fetcherPayload>(payload)

    useEffect(
        () => {
            if (payload === payloadCache.current) {
                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                refetch(payload)
            }
            payloadCache.current = payload
        },
        // eslint-disable-next-line
        [payload]
    )

    return {
        data,
        loaded,
        error,
        refetch,
    }
}

export const useFetchStub = <T>(data_: T | undefined): UseFetchState<T> => {
    const [data, setData] = useState<T | undefined>()
    const [loaded, setLoaded] = useState(false)

    useEffect(
        () => {
            setData(data_)
            setLoaded(data_ !== undefined)
        },
        // eslint-disable-next-line
        []
    )

    return {
        data,
        loaded,
        error: undefined,
        refetch: () => Promise.resolve({ data: undefined, error: undefined }),
    }
}
