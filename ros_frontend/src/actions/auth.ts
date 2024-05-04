"use server";
import { login, logout } from "@/api/auth";
import { cookies } from "next/headers";
import { logApiError } from "@/helper/api";

export const loginAction = async (username: string, password: string): Promise<boolean> => {
  try {
    const res = await login(username, password);
    if (res.status !== 200) return false;
    const { accessToken, refreshToken } = await res.json();
    cookies().set("accessToken", accessToken);
    cookies().set("refreshToken", refreshToken);
    return true;
  } catch (e) {
    logApiError("login", e as Error);
    return false;
  }
};

export const logoutAction = async (): Promise<void> => {
  try {
    const refreshToken = cookies().get("refreshToken")?.value;
    if (refreshToken) {
      await logout(refreshToken);
    }
    cookies().delete("accessToken");
    cookies().delete("refreshToken");
  } catch (e) {
    logApiError("logout", e as Error);
  }
};
