import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      userName: string;
      role: "user" | "superAdmin";
      access: boolean;
      authProvider: "Credentials" | "Google" | "Github";
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    userName: string;
    role: "user" | "superAdmin";
    access: boolean;
    authProvider: "Credentials" | "Google" | "Github";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    userName: string;

    role: "user" | "superAdmin";
    access: boolean;
    authProvider: "Credentials" | "Google" | "Github";
  }
}
