import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authRoutes, protectedRoutes } from "../src/app/(components)/router/routes";

export function middleware(request: NextRequest) {

  const authToken = request.cookies.get("authToken")?.value;
  const currentPath = request.nextUrl.pathname;

  const isProtected = protectedRoutes.some((route:any) =>
    currentPath === route || currentPath.startsWith(`${route}/`)
  );

  if (isProtected && !authToken) {
    const response = NextResponse.redirect(new URL("/login", request.url));
    // Delete auth-related cookies for security
    response.cookies.delete("authToken");
    response.cookies.delete("refreshToken");
    response.cookies.delete("accessToken");
    return response;
  }

  if (currentPath === "/" && authToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (authRoutes.includes(currentPath) && authToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
  
}
