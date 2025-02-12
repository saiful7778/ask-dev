import { getServerSession, type AuthOptions } from "next-auth";
import type { JWT } from "next-auth/jwt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import db from "./db";
import nextAuthConfig from "./config/next-auth.config";
import generateUsername from "@/utils/server-utils/generateUsername";

export const nextAuthOptions: AuthOptions = {
  ...nextAuthConfig,
  adapter: PrismaAdapter(db),
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id.toString();
        token.role = user.role;
        token.access = user.access;
        token.userName = user.userName;
        if (account) {
          token.authProvider = account?.provider as JWT["authProvider"];
        }
      }
      return token;
    },
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id as JWT["id"];
        session.user.role = token.role as JWT["role"];
        session.user.access = token.access as JWT["access"];
        session.user.userName = token.userName as JWT["userName"];
        session.user.authProvider = token.authProvider as JWT["authProvider"];
      }

      return session;
    },
  },
  events: {
    async createUser({ user }) {
      const username = await generateUsername(user.name!);
      await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          username,
          emailVerified: new Date(),
        },
      });
    },
  },
  debug: process.env.NODE_ENV !== "production",
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    newUser: "/register",
    signIn: "/login",
    error: "/login",
    verifyRequest: "/verify",
  },
  session: {
    strategy: "jwt",
    maxAge: 5 * 60 * 60,
  },
};

export const getAuthSession = () => getServerSession(nextAuthOptions);
