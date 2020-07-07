import { ActivationFinished } from "./pages/ActivationForm/ActivationFinished"
import { ActivationForm } from "./pages/ActivationForm/ActivationForm"
import { AppHeader } from "./pages/AppHeader"
import { AuthProvider, useAuth } from "./hooks/useAuth"
import { ListUsers } from "./pages/ListUsers/ListUsers"
import { ResetPasswordFinished } from "./pages/ResetPasswordForm/ResetPasswordFinished"
import { ResetPasswordForm } from "./pages/ResetPasswordForm/ResetPasswordForm"
import { ResetPasswordRequestFinished } from "./pages/ResetPasswordRequestForm/ResetPasswordRequestFinished"
import { ResetPasswordRequestForm } from "./pages/ResetPasswordRequestForm/ResetPasswordRequestForm"
import { Route, BrowserRouter as Router, Switch } from "react-router-dom"
import React from "react"
import styled from "styled-components"

const Main = styled.main`
    margin: 2ex auto;
    max-width: 1024px;
`

export const App = () => {
    const auth = useAuth()

    return (
        <AuthProvider value={auth}>
            <Router>
                <header>
                    <AppHeader />
                </header>

                <Main>
                    <Switch>
                        <Route exact path={"/"}>
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
                    </Switch>
                </Main>
            </Router>
        </AuthProvider>
    )
}
