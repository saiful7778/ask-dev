import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "user" | "superAdmin";
      access: boolean;
      authProvider: "Credentials" | "Google" | "Github";
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: "user" | "superAdmin";
    access: boolean;
    authProvider: "Credentials" | "Google" | "Github";
  }

  interface JWT {
    id: string;
    role: "user" | "superAdmin";
    access: boolean;
    authProvider: "Credentials" | "Google" | "Github";
  }
}
