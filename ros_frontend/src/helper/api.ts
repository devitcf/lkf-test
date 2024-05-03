import { cookies } from "next/headers";

export const fetchRequestWithAuth = async <T>(
  url: string,
  requestInit: RequestInit = {},
  tokenType = "accessToken"
): Promise<T> => {
  const token = cookies().get(tokenType)?.value;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-cache",
    ...requestInit,
  });

  if (res.status !== 200) {
    throw new Error(`Fail to fetch data with status ${res.status}`);
  }

  return res.json();
};

export const postRequestWithAuth = async (url: string, body: any): Promise<void> => {
  const accessToken = cookies().get("accessToken")?.value;

  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
  });

  if (res.status !== 201) {
    throw new Error(`Fail to post data with status ${res.status}`);
  }

  return res.json();
};

export const logApiError = (apiName: string, e?: Error) => {
  const time = new Date().toISOString();
  const msg = `[${time}] Failed to ${apiName}.`;
  console.error(msg, e);
};
