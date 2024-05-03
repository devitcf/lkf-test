"use server";
import { login } from "@/api/auth";
import { cookies } from "next/headers";
import { logApiError } from "@/helper";

export const loginAction = async (username: string, password: string) => {
  try {
    const res = await login(username, password);
    if (res.status !== 200) return false;
    const { accessToken, refreshToken } = await res.json();
    cookies().set("accessToken", accessToken);
    cookies().set("refreshToken", refreshToken);
    return true;
  } catch (e) {
    logApiError("login", e as Error);
  }
};
