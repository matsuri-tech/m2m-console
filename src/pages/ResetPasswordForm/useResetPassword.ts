import * as apiValidation from "@/api/validation"
import { ResetPasswordFinished } from "@/pages/ResetPasswordForm/ResetPasswordFinished"
import { useCallback, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { useQuery } from "../../hooks/useQuery"

export const useResetPassword = () => {
    const [fetching, setFetching] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [isSuccessful, setIsSuccessful] = useState(false)
    const [newPassword, setNewPassword] = useState("")

    const history = useHistory()

    useEffect(() => {
        if (isSuccessful) {
            history.push(ResetPasswordFinished.path)
        }
    }, [isSuccessful, history])

    const query = useQuery()
    const resetToken = query.get("reset_token") || ""
    const userId = query.get("user_id") || ""

    const handleSubmit = useCallback(async () => {
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
                            newPassword
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
    }, [setFetching, newPassword, userId, resetToken])

    const handleClearError = useCallback(() => {
        setErrorMessage("")
    }, [])

    return {
        fetching,
        handleSubmit,
        handleClearError,
        errorMessage,
        newPassword,
        setNewPassword
    }
}
