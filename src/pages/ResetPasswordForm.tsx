import { Button, Layout, Modal, TextField, Typography } from "matsuri-ui"
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
        handleSubmit,
        handleClearError,
        newPassword,
        setNewPassword
    } = useResetPassword()

    return (
        <>
            <h2>パスワードの入力</h2>
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
                onChange={setNewPassword}
                value={newPassword}
                type="password"
                label="新しいパスワードをご入力ください"
                autoComplete="new-password"
            />

            <Button onClick={handleSubmit} disabled={fetching}>
                送信
            </Button>
        </>
    )
}

ResetPasswordForm.path = "/reset_password_form"
