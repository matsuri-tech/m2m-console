import { ActivationFinished } from "./pages/ActivationFinished"
import { ActivationForm } from "./pages/ActivationForm"
import { ResetPasswordFinished } from "./pages/ResetPasswordFinished"
import { ResetPasswordForm } from "./pages/ResetPasswordForm"
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
                </Switch>
            </Main>
        </Router>
    )
}
