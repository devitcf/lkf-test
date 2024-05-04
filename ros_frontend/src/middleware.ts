import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";
import { renewToken } from "@/api/auth";
import { logApiError } from "@/helper/api";

const LOGIN_URL = `${process.env.APPLICATION_BASE_PATH}/login`;

const tokenExpireChecking = async (req: NextRequest, res: NextResponse) => {
  const accessToken = req.cookies.get("accessToken")?.value;

  // Refresh the accessToken if it is expired
  if (accessToken) {
    const decodedAccessToken = jwtDecode(accessToken);
    if (decodedAccessToken.exp && decodedAccessToken.exp <= Date.now() / 1000) {
      const refreshToken = req.cookies.get("refreshToken")?.value;
      if (refreshToken) {
        try {
          const tokenRes = await renewToken(refreshToken);
          const jsonRes = await tokenRes.json();
          res.cookies.set({ name: "accessToken", value: jsonRes.accessToken });
          res.cookies.set({ name: "refreshToken", value: jsonRes.refreshToken });
        } catch (e) {
          logApiError("RefreshToken failed", e as Error);
          return NextResponse.redirect(new URL(LOGIN_URL, req.url));
        }
      }
    }
  }
};

export const middleware = async (req: NextRequest) => {
  const pathname = req.nextUrl.pathname;
  const accessToken = req.cookies.get("accessToken")?.value;
  const res = NextResponse.next();

  // Return to next response if it is login route
  if (pathname === `/login`) {
    return res;
  }

  // Redirect to login page if accessToken is not present
  if (!accessToken) {
    return NextResponse.redirect(new URL(LOGIN_URL, req.url));
  }

  // Check whether accessToken is expired, if it does, refresh it
  await tokenExpireChecking(req, res);
  return res;
};

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
