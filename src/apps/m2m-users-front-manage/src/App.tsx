import { ActivationFinished } from "./pages/ActivationForm/ActivationFinished"
import { ActivationForm } from "./pages/ActivationForm/ActivationForm"
import { AlertProvider, Container } from "matsuri-ui"
import { AppHeader } from "./pages/AppHeader"
import { AuthProvider, useAuth } from "./hooks/useAuth"
import { ListUsers } from "./pages/ListUsers"
import { Login } from "./pages/Login"
import {
    Redirect,
    Route,
    BrowserRouter as Router,
    Switch,
} from "react-router-dom"
import { ResetPasswordFinished } from "./pages/ResetPasswordForm/ResetPasswordFinished"
import { ResetPasswordForm } from "./pages/ResetPasswordForm/ResetPasswordForm"
import { ResetPasswordRequestFinished } from "./pages/ResetPasswordRequestForm/ResetPasswordRequestFinished"
import { ResetPasswordRequestForm } from "./pages/ResetPasswordRequestForm/ResetPasswordRequestForm"
import React from "react"
import styled from "styled-components"

const Main = styled.main`
    margin: 2ex auto;
`

export const App = () => {
    const auth = useAuth()

    return (
        <AuthProvider value={auth}>
            <AlertProvider>
                <Router>
                    <header>
                        <AppHeader />
                    </header>

                    <Container maxWidth="lg">
                        <Main>
                            <Switch>
                                <Route exact path={"/users"}>
                                    <ListUsers />
                                </Route>
                                <Route path={ActivationForm.path}>
                                    <ActivationForm />
                                </Route>
                                <Route path={ActivationFinished.path}>
                                    <ActivationFinished />
                                </Route>
                                <Route path={ResetPasswordForm.path}>
                                    <ResetPasswordForm />
                                </Route>
                                <Route path={ResetPasswordFinished.path}>
                                    <ResetPasswordFinished />
                                </Route>
                                <Route path={ResetPasswordRequestForm.path}>
                                    <ResetPasswordRequestForm />
                                </Route>
                                <Route path={ResetPasswordRequestFinished.path}>
                                    <ResetPasswordRequestFinished />
                                </Route>
                                <Route path={"/login"}>
                                    <Login />
                                </Route>
                                <Route path="*">
                                    <Redirect to="/users" />
                                </Route>
                            </Switch>
                        </Main>
                    </Container>
                </Router>
            </AlertProvider>
        </AuthProvider>
    )
}
