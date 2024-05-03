import { fetchRequestWithAuth, logApiError } from "@/helper";
import { AuthToken } from "@/types";

export const login = async (username: string, password: string): Promise<Response> => {
  const url = `${process.env.API_SERVER_URL}/auth/login`;
  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
};

export const renewToken = async () => {
  try {
    const url = `${process.env.API_SERVER_URL}/auth/refresh-token`;
    return await fetchRequestWithAuth<AuthToken>(url, {}, "refreshToken");
  } catch (e) {
    logApiError("renewToken", e as Error);
  }
};
