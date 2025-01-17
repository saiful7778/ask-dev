import { NextResponse } from "next/server";
import { type NextRequestWithAuth, withAuth } from "next-auth/middleware";
import {
  AUTH_API_PREFIX,
  AUTH_API_ROUTES,
  AUTH_ROUTES,
  DEFAULT_AUTH_REDIRECT,
  PUBLIC_ROUTES,
} from "@/lib/routes";

export default withAuth(
  function (req: NextRequestWithAuth) {
    const { nextUrl, nextauth } = req;
    const { pathname } = nextUrl;
    const isLogged = !!nextauth.token;

    const isAuthRoute = AUTH_ROUTES.includes(pathname);

    if (isAuthRoute && isLogged) {
      return NextResponse.redirect(new URL(DEFAULT_AUTH_REDIRECT, nextUrl));
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { nextUrl } = req;
        const { pathname } = nextUrl;
        const isLogged = !!token;

        const isAuthApiRoute = pathname.startsWith(AUTH_API_PREFIX);
        const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
        const isAuthRoute = AUTH_ROUTES.includes(pathname);
        const isApiAuthRoute = AUTH_API_ROUTES.includes(pathname);

        if (isAuthApiRoute) return true;

        if (isAuthRoute) return true;

        if (isPublicRoute) return true;

        if (isApiAuthRoute) return isLogged;

        return isLogged;
      },
    },
  },
);

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
