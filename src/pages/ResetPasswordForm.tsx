import { Button, Layout, Modal, TextField, Typography } from "matsuri-ui"
import { ResetPasswordFinished } from "./ResetPasswordFinished"
import { useEffect } from "react"
import { useHistory } from "react-router-dom"
import { useQuery } from "@/hooks/useQuery"
import { useResetPassword } from "@/hooks/useResetPassword"

const sx = {
    root: {
        padding: "1vh 4vw",
        display: "flex",
        flexDirection: "column"
    },
    logo: {
        paddingTop: "2em",
        paddingBottom: "2em"
    },
    grow: {
        flexGrow: 1
    },
    modal: {
        width: "90%"
    },
    noshrink: {
        flexShrink: 0
    }
} as const

export const ResetPasswordForm: Page = () => {
    const {
        fetching,
        errorMessage,
        makeHandleSubmit,
        handleClearError,
        isSuccessful,
        password,
        setPassword
    } = useResetPassword()

    const query = useQuery()
    const resetToken = query.get("reset_token") || ""
    const userId = query.get("user_id") || ""

    const handleSubmit = makeHandleSubmit(userId, resetToken)

    const history = useHistory()

    useEffect(() => {
        if (isSuccessful) {
            history.push(ResetPasswordFinished.path)
        }
    }, [isSuccessful, history])

    return (
        <>
            <h2>Reset Password</h2>
            {errorMessage && (
                <Modal
                    style={sx.modal}
                    body={
                        <Layout.Column gap={2}>
                            <Typography
                                color="error"
                                variant="h4"
                                align="center"
                            >
                                ERROR
                            </Typography>
                            <Typography>{errorMessage}</Typography>
                        </Layout.Column>
                    }
                    footer={
                        <Button
                            variant="filled"
                            color="primary"
                            fullWidth
                            onClick={handleClearError}
                        >
                            OK
                        </Button>
                    }
                    backdrop
                />
            )}

            <TextField
                onChange={setPassword}
                value={password}
                type="password"
            />

            <Button onClick={handleSubmit} disabled={fetching}>
                送信
            </Button>
        </>
    )
}

ResetPasswordForm.path = "/reset_password_form"
