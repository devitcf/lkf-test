export const login = async (username: string, password: string): Promise<Response> => {
  const url = `${process.env.API_SERVER_URL}/auth/login`;
  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
};

export const logout = async (refreshToken: string): Promise<Response> => {
  const url = `${process.env.API_SERVER_URL}/auth/logout`;
  return fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${refreshToken}` },
  });
};

export const renewToken = async (refreshToken: string) => {
  const url = `${process.env.API_SERVER_URL}/auth/refresh-token`;
  return fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${refreshToken}` },
  });
};
