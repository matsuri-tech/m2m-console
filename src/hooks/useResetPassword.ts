import * as apiValidation from "@/api/validation"
import { useCallback, useState } from "react"

export const useResetPassword = () => {
    const [fetching, setFetching] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [isSuccessful, setIsSuccessful] = useState(false)
    const [password, setPassword] = useState("")

    const makeHandleSubmit = useCallback(
        (userId: string, resetToken: string) => async () => {
            setFetching(true)
            try {
                const response: ActivationResponse = await (
                    await fetch(
                        `${process.env.M2M_USERS_API_ROOT}/users/reset_password`,
                        {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                resetToken,
                                userId,
                                password
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
        },
        [setFetching, password]
    )

    const handleClearError = useCallback(() => {
        setErrorMessage("")
    }, [])

    return {
        fetching,
        makeHandleSubmit,
        handleClearError,
        errorMessage,
        isSuccessful,
        password,
        setPassword
    }
}
