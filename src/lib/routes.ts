export const DEFAULT_LOGIN_PAGE = "/login";
export const DEFAULT_AUTH_REDIRECT = "/dashboard";

export const AUTH_API_PREFIX = "/api/auth";

export const PUBLIC_ROUTES = ["/", "/post", "/profile", "/tag"];
export const AUTH_ROUTES = [
  "/login",
  "/register",
  "/verify",
  "/forget_password",
  "/reset_password",
];

export const AUTH_API_ROUTES = [
  "/api/account/auth/forget_password",
  "/api/account/auth/reset_password",
  "/api/account/auth/login",
  "/api/account/auth/register",
  "/api/account/auth/verify",
  "/api/account/auth/send-token",
];
