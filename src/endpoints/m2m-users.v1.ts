/* eslint-disable */
/**
 * A function that returns the URL part common to the endpoints.
 */
export const root = () => {
  let __root = "";
  if (process.env.NODE_ENV === "local") {
    __root = "http://localhost:8080";
  }
  if (process.env.NODE_ENV === "localDev") {
    __root = "https://api-users.dev.m2msystems.cloud";
  }
  if (process.env.NODE_ENV === "development") {
    __root = "https://api-users.dev.m2msystems.cloud";
  }
  if (process.env.NODE_ENV === "production") {
    __root = "https://api.m2msystems.cloud";
  }
  return __root;
};
/**
 * ヘルスチェック
 * @version v1
 *
 */
export const healthCheck = () => {
  const __root = root();
  const __queries = Object.entries({})
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  const __path = `${__root}/${`health_check`}`;
  return __queries ? `${__path}?${__queries}` : __path;
};

/**
 * 会社を作成する
 * @version v1
 *
 */
export const createCompany = () => {
  const __root = root();
  const __queries = Object.entries({})
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  const __path = `${__root}/${`companies/`}`;
  return __queries ? `${__path}?${__queries}` : __path;
};

/**
 * 会社情報を取得する
 * @version v1
 *
 */
export const getCompany = ({ id }: { id: string }) => {
  const __root = root();
  const __queries = Object.entries({})
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  const __path = `${__root}/${`companies/${id}`}`;
  return __queries ? `${__path}?${__queries}` : __path;
};

/**
 * 会社情報を更新する
 * @version v1
 *
 */
export const updateCompany = () => {
  const __root = root();
  const __queries = Object.entries({})
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  const __path = `${__root}/${`companies/`}`;
  return __queries ? `${__path}?${__queries}` : __path;
};

/**
 * 会社情報を更新する
 * @version v1
 *
 */
export const updateCompanyPatch = () => {
  const __root = root();
  const __queries = Object.entries({})
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  const __path = `${__root}/${`companies/`}`;
  return __queries ? `${__path}?${__queries}` : __path;
};

/**
 * idを指定して複数の会社情報を取得する
 * @version v1
 * @param {string} company_ids a,b,c
 */
export const findCompaniesByIds = ({
  company_ids
}: {
  company_ids?: string;
}) => {
  const __root = root();
  const __queries = Object.entries({ company_ids })
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  const __path = `${__root}/${`companies/find_by_ids`}`;
  return __queries ? `${__path}?${__queries}` : __path;
};

/**
 * ユーザーを作成する
 * @version v1
 *
 */
export const createUser = () => {
  const __root = root();
  const __queries = Object.entries({})
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  const __path = `${__root}/${`users/`}`;
  return __queries ? `${__path}?${__queries}` : __path;
};

/**
 * ユーザーを更新する
 * @version v1
 *
 */
export const updateUser = ({ id }: { id: string }) => {
  const __root = root();
  const __queries = Object.entries({})
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  const __path = `${__root}/${`users/${id}`}`;
  return __queries ? `${__path}?${__queries}` : __path;
};

/**
 * ユーザーを更新する
 * @version v1
 *
 */
export const updateUserPatch = ({ id }: { id: string }) => {
  const __root = root();
  const __queries = Object.entries({})
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  const __path = `${__root}/${`users/${id}`}`;
  return __queries ? `${__path}?${__queries}` : __path;
};

/**
 * パスワードリセットのメールを送信する
 * @version v1
 *
 */
export const sendResetPasswordEmail = () => {
  const __root = root();
  const __queries = Object.entries({})
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  const __path = `${__root}/${`users/reset_password_email`}`;
  return __queries ? `${__path}?${__queries}` : __path;
};

/**
 * パスワードをリセットする
 * @version v1
 *
 */
export const resetPassword = () => {
  const __root = root();
  const __queries = Object.entries({})
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  const __path = `${__root}/${`users/reset_password`}`;
  return __queries ? `${__path}?${__queries}` : __path;
};

/**
 * アクティベーションメールを送信する
 * @version v1
 *
 */
export const sendActivationEmail = () => {
  const __root = root();
  const __queries = Object.entries({})
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  const __path = `${__root}/${`users/activation_email`}`;
  return __queries ? `${__path}?${__queries}` : __path;
};

/**
 * ユーザーを有効化する
 * @version v1
 *
 */
export const activateUser = () => {
  const __root = root();
  const __queries = Object.entries({})
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  const __path = `${__root}/${`users/activate`}`;
  return __queries ? `${__path}?${__queries}` : __path;
};

/**
 * 認可スコープを設定する
 * @version v1
 *
 */
export const setAuthorityScope = () => {
  const __root = root();
  const __queries = Object.entries({})
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  const __path = `${__root}/${`users/scope`}`;
  return __queries ? `${__path}?${__queries}` : __path;
};

/**
 * メールを指定してユーザーを取得する
 * @version v1
 *
 */
export const findUserByEmail = () => {
  const __root = root();
  const __queries = Object.entries({})
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  const __path = `${__root}/${`users/find_by_email`}`;
  return __queries ? `${__path}?${__queries}` : __path;
};

/**
 * ユーザーの権限を更新する
 * @version v1
 *
 */
export const updateAuthority = ({ id }: { id: string }) => {
  const __root = root();
  const __queries = Object.entries({})
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  const __path = `${__root}/${`users/authority/${id}`}`;
  return __queries ? `${__path}?${__queries}` : __path;
};

/**
 * companyIdからユーザーを取得する
 * @version v1
 *
 */
export const findUsersByCompanyId = () => {
  const __root = root();
  const __queries = Object.entries({})
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  const __path = `${__root}/${`users/find_by_company_id`}`;
  return __queries ? `${__path}?${__queries}` : __path;
};

/**
 * ログインする
 * @version v1
 *
 */
export const login = () => {
  const __root = root();
  const __queries = Object.entries({})
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  const __path = `${__root}/${`login`}`;
  return __queries ? `${__path}?${__queries}` : __path;
};

/**
 * ログインする
 * @version v1
 *
 */
export const loginWithSlash = () => {
  const __root = root();
  const __queries = Object.entries({})
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  const __path = `${__root}/${`login/`}`;
  return __queries ? `${__path}?${__queries}` : __path;
};

/**
 * JWKを取得する
 * @version v1
 *
 */
export const getJwks = () => {
  const __root = root();
  const __queries = Object.entries({})
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  const __path = `${__root}/${`login/jwks`}`;
  return __queries ? `${__path}?${__queries}` : __path;
};

/**
 * 公開鍵を取得する
 * @version v1
 *
 */
export const getPublicKeys = () => {
  const __root = root();
  const __queries = Object.entries({})
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  const __path = `${__root}/${`login/public_keys`}`;
  return __queries ? `${__path}?${__queries}` : __path;
};

/**
 * MFAのコードを発行する
 * @version v1
 *
 */
export const publishMFACode = () => {
  const __root = root();
  const __queries = Object.entries({})
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  const __path = `${__root}/${`login/publish_mfa_code`}`;
  return __queries ? `${__path}?${__queries}` : __path;
};

/**
 * MFAを使ってログインする
 * @version v1
 *
 */
export const loginWithMFA = () => {
  const __root = root();
  const __queries = Object.entries({})
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  const __path = `${__root}/${`login/mfa_login`}`;
  return __queries ? `${__path}?${__queries}` : __path;
};
export const m2mUsers_v1 = {
  root,
  healthCheck,
  createCompany,
  getCompany,
  updateCompany,
  updateCompanyPatch,
  findCompaniesByIds,
  createUser,
  updateUser,
  updateUserPatch,
  sendResetPasswordEmail,
  resetPassword,
  sendActivationEmail,
  activateUser,
  setAuthorityScope,
  findUserByEmail,
  updateAuthority,
  findUsersByCompanyId,
  login,
  loginWithSlash,
  getJwks,
  getPublicKeys,
  publishMFACode,
  loginWithMFA
};
