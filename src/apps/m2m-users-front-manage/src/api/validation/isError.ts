export const isError = (response: object | ErrorResponse) => {
    return "error" in response
}
