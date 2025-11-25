import { NextResponse, type NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
  const { nextUrl } = request;

  const session = request.cookies.get("session")?.value;

  const isAuthRoute = nextUrl.pathname.startsWith("/account");
  const isDeactivateRoute = nextUrl.pathname === "/account/deactivate";
  const isDashboardRoute = nextUrl.pathname.startsWith("/dashboard");

  if (!session && isDashboardRoute) {
    return NextResponse.redirect(new URL("/account/login", request.url));
  }

  if (!session && isDeactivateRoute) {
    return NextResponse.redirect(new URL("/account/login", request.url));
  }

  if (session && isAuthRoute && !isDeactivateRoute) {
    return NextResponse.redirect(new URL("/dashboard/settings", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/account/:path*", "/dashboard/:path*"],
};
