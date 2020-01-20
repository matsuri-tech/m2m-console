import * as apiValidation from "@/api/validation"
import { useCallback, useState } from "react"

export const useResetPasswordRequest = () => {
    const [fetching, setFetching] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [isSuccessful, setIsSuccessful] = useState(false)
    const [email, setEmail] = useState("")

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
        isSuccessful,
        email,
        setEmail
    }
}
