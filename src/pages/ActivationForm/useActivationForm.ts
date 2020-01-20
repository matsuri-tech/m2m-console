import * as apiValidation from "@/api/validation"
import { ActivationFinished } from "./ActivationFinished"
import { useCallback, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { useQuery } from "@/hooks/useQuery"

export interface UseActivateReq {
    activationToken: string
    userId: string
}

export const useUserActivationForm = () => {
    const [fetching, setFetching] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [isSuccessful, setIsSuccessful] = useState(false)

    const query = useQuery()
    const activationToken = query.get("activation_token") || ""
    const userId = query.get("user_id") || ""

    const history = useHistory()

    useEffect(() => {
        if (isSuccessful) {
            history.push(ActivationFinished.path)
        }
    }, [isSuccessful, history])

    const handleSubmit = useCallback(async () => {
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
            setIsSuccessful(false)
        }
    }, [setFetching, userId, activationToken])

    const handleClearError = useCallback(() => {
        setErrorMessage("")
    }, [])

    return {
        fetching,
        handleSubmit,
        handleClearError,
        errorMessage,
        isSuccessful
    }
}
