type ErrorResponse = {
    error: string
    errorType: string
}

type ActivationOK = {
    result: string
}

type ActivationResponse = ActivationOK | ErrorResponse
