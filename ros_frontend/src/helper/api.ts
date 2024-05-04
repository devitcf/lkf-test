import { cookies } from "next/headers";
import { renewToken } from "@/api/auth";
import { redirect } from "next/navigation";

export const fetchRequestWithAuth = async <T>(
  url: string,
  requestInit: RequestInit = {},
  tokenType = "accessToken",
  retryIfUnauthenticated = true
): Promise<T> => {
  const token = cookies().get(tokenType)?.value;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-cache",
    ...requestInit,
  });

  if (res.status === 401 && retryIfUnauthenticated) {
    await updateAuthToken();
    return fetchRequestWithAuth(url, requestInit, tokenType, false);
  }

  return res.json();
};

export const postRequestWithAuth = async <T>(
  url: string,
  body?: any,
  method = "POST",
  retryIfUnauthenticated = true
): Promise<T> => {
  const accessToken = cookies().get("accessToken")?.value;

  const res = await fetch(url, {
    method,
    body: body ? JSON.stringify(body) : null,
    headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
  });

  if (res.status === 401 && retryIfUnauthenticated) {
    await updateAuthToken();
    return postRequestWithAuth(url, body, method, false);
  }

  // Expect no response from API when method is DELETE, return true
  if (method === "DELETE") {
    return (res.status === 200) as unknown as T;
  }

  return res.json();
};

export const logApiError = (apiName: string, e?: Error) => {
  const time = new Date().toISOString();
  const msg = `[${time}] Failed to ${apiName}.`;
  console.error(msg, e);
};

export const updateAuthToken = async () => {
  const refreshToken = cookies().get("refreshToken")?.value;
  if (refreshToken) {
    const tokenRes = await renewToken(refreshToken);
    const jsonRes = await tokenRes.json();
    cookies().set({ name: "accessToken", value: jsonRes.accessToken });
    cookies().set({ name: "refreshToken", value: jsonRes.refreshToken });
  } else {
    redirect("/");
  }
};
