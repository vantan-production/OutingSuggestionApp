export type LogoutResponse = {
  success: boolean;
};

export function logout(): Promise<LogoutResponse> {
  return fetch(`http://localhost:8007/api/auth/logout`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  })
    .then((res) => {
      if (!res.ok) {
        return {
          success: false,
        };
      }
      return {
        success: true,
      };
    })
    .catch(() => {
      return {
        success: false,
      };
    });
}
