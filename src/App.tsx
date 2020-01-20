import { ActivationFinished } from "./pages/ActivationForm/ActivationFinished"
import { ActivationForm } from "./pages/ActivationForm/ActivationForm"
import { ResetPasswordFinished } from "./pages/ResetPasswordForm/ResetPasswordFinished"
import { ResetPasswordForm } from "./pages/ResetPasswordForm/ResetPasswordForm"
import { ResetPasswordRequestFinished } from "./pages/ResetPasswordRequestForm/ResetPasswordRequestFinished"
import { ResetPasswordRequestForm } from "./pages/ResetPasswordRequestForm/ResetPasswordRequestForm"
import { Route, BrowserRouter as Router, Switch } from "react-router-dom"
import styled from "styled-components"

const Main = styled.main`
    padding: 0 8vw;
`

export const App = () => {
    return (
        <Router>
            <Main>
                <Switch>
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
    )
}
