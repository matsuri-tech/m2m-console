import { Button, Layout, Modal, TextField, Typography } from "matsuri-ui"
import { ResetPasswordRequestFinished } from "./ResetPasswordRequestFinished"
import { useEffect } from "react"
import { useHistory } from "react-router-dom"
import { useResetPasswordRequest } from "@/hooks/useResetPasswordRequest"

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

export const ResetPasswordRequestForm: Page = () => {
    const {
        fetching,
        errorMessage,
        handleSubmit,
        handleClearError,
        isSuccessful,
        email,
        setEmail
    } = useResetPasswordRequest()

    const history = useHistory()

    useEffect(() => {
        if (isSuccessful) {
            history.push(ResetPasswordRequestFinished.path)
        }
    }, [isSuccessful, history])

    return (
        <>
            <h2>パスワードの再発行</h2>
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
                onChange={setEmail}
                value={email}
                type="email"
                label="パスワードを再発行したいアカウントのEmailをご入力ください"
            autocomplete="new-password"
            />

            <Button onClick={handleSubmit} disabled={fetching}>
                送信
            </Button>
        </>
    )
}

ResetPasswordRequestForm.path = "/reset_password_request_form"
