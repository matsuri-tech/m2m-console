import { Button, Column, Layout, Row, TextField, Typography } from "matsuri-ui"
import { PageHeader } from "../components/PageHeader/PageHeader"
import { useAuthCtx } from "../hooks/useAuth"
import { useHistory } from "react-router-dom"
import React, { useCallback } from "react"

export const Login: React.FC = () => {
    const history = useHistory()
    const { requestLogin } = useAuthCtx()

    const handleSubmit = useCallback(
        async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault()

            const input = Object.fromEntries(new FormData(event.currentTarget))
            await requestLogin({
                email: input["email"] as string,
                password: input["password"] as string,
            })
            history.push("/")
        },
        [requestLogin, history]
    )

    return (
        <>
            <PageHeader>
                <Typography variant="h2">ログイン</Typography>
            </PageHeader>

            <form onSubmit={handleSubmit}>
                <Column>
                    <Layout.Item>
                        <TextField name="email" label="メールアドレス" />
                    </Layout.Item>
                    <Layout.Item>
                        <TextField
                            name="password"
                            label="パスワード"
                            type="password"
                        />
                    </Layout.Item>
                    <Row justify="space-between">
                        <Layout.Item>
                            <Button
                                as="a"
                                target="_blank"
                                href={
                                    process.env.NODE_ENV === "production"
                                        ? "https://manage-users.m2msystems.cloud/reset_password_request_form"
                                        : "https://master--manage-users.netlify.com/reset_password_request_form"
                                }
                                rel="noopener noreferrer"
                            >
                                パスワードを忘れた場合はこちら
                            </Button>
                        </Layout.Item>
                        <Layout.Item>
                            <Button variant="filled" color="primary">
                                ログイン
                            </Button>
                        </Layout.Item>
                    </Row>
                </Column>
            </form>
        </>
    )
}
