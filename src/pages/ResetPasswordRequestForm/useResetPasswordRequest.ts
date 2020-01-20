import * as apiValidation from "@/api/validation"
import { ResetPasswordRequestFinished } from "@/pages/ResetPasswordRequestForm/ResetPasswordRequestFinished"
import { useCallback, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"

export const useResetPasswordRequest = () => {
    const [fetching, setFetching] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [isSuccessful, setIsSuccessful] = useState(false)
    const [email, setEmail] = useState("")

    const history = useHistory()

    useEffect(() => {
        if (isSuccessful) {
            history.push(ResetPasswordRequestFinished.path)
        }
    }, [isSuccessful, history])

    const handleSubmit = useCallback(async () => {
        setFetching(true)
        try {
            const response: ResetPasswordEmailResponse = await (
                await fetch(
                    `${process.env.M2M_USERS_API_ROOT}/users/reset_password_email`,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            email
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
    }, [setFetching, email])

    const handleClearError = useCallback(() => {
        setErrorMessage("")
    }, [])

    return {
        fetching,
        handleSubmit,
        handleClearError,
        errorMessage,
        email,
        setEmail
    }
}
