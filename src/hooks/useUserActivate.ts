import * as apiValidation from "@/api/validation"
import { useCallback, useState } from "react"

export interface UseActivateReq {
    activationToken: string
    userId: string
}

export const useUserActivate = () => {
    const [fetching, setFetching] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [isSuccessful, setIsSuccessful] = useState(false)

    const makeHandleSubmit = useCallback(
        (userId: string, activationToken: string) => async () => {
            setFetching(true)
            try {
                const response: ActivationResponse = await (
                    await fetch(
                        `${process.env.M2M_USERS_API_ROOT}/users/activate`,
                        {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                activationToken,
                                userId
                            })
                        }
                    )
                ).json()

                if (apiValidation.isError(response)) {
                    throw new Error((response as ErrorResponse).errorType)
                }
                setFetching(false)
                setIsSuccessful(true)
            } catch (e) {
                setErrorMessage(e.message)
                setFetching(false)
            }
        },
        [setFetching]
    )

    const handleClearError = useCallback(() => {
        setErrorMessage("")
    }, [])

    return {
        fetching,
        makeHandleSubmit,
        handleClearError,
        errorMessage,
        isSuccessful
    }
}
