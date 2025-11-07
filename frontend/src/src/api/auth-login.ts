export type AuthLoginRequest = {
  email: string;
  password: string;
};

export type AuthLoginResponse =
  | {
      success: true;
      token: string;
    }
  | {
      success: false;
      message: string;
    };

export function authLogin(req: AuthLoginRequest): Promise<AuthLoginResponse> {
  return fetch("http://localhost:8007/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .catch((err) => {
      console.warn(err);
      return {
        success: false,
        message: "ログインに失敗しました。",
      };
    });
}
