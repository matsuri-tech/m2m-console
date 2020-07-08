import { Button, Layout, Modal, Typography } from "matsuri-ui"
import { useUserActivationForm } from "./useActivationForm"
import React from "react"

const sx = {
    root: {
        padding: "1vh 4vw",
        display: "flex",
        flexDirection: "column",
    },
    logo: {
        paddingTop: "2em",
        paddingBottom: "2em",
    },
    grow: {
        flexGrow: 1,
    },
    modal: {
        width: "90%",
    },
    noshrink: {
        flexShrink: 0,
    },
} as const

export const ActivationForm: Page = () => {
    const {
        fetching,
        errorMessage,
        handleSubmit,
        handleClearError,
    } = useUserActivationForm()

    return (
        <>
            <h2>Activation</h2>
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
            <button onClick={handleSubmit} disabled={fetching}>
                こちらをクリックし、m2mのユーザーを利用可能にしてください
            </button>
        </>
    )
}

ActivationForm.path = "/activation_form"
