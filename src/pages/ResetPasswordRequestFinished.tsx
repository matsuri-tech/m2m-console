export const ResetPasswordRequestFinished: Page = () => {
    return (
        <div>
            指定のEmailアドレスにパスワード再発行のメールを送信しました。
            メールに記載のリンクよりパスワードの再発行をお願いいたします。
        </div>
    )
}

ResetPasswordRequestFinished.path = "/reset_password_request_finished"
