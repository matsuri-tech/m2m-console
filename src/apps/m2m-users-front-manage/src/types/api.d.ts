type ErrorResponse = {
    error: string
    errorType: string
}

type ActivationOK = {
    result: string
}

type ResetPasswordEmailOk = {
    result: string
}

type ActivationResponse = ActivationOK | ErrorResponse
type ResetPasswordEmailResponse = ResetPasswordEmailOk | ErrorResponse
