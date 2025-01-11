import type { AuthOptions, JWT, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import db from "./db";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email Address" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(
        credentials: Record<"email" | "password", string> | undefined,
      ): Promise<User | null> {
        const user = {
          id: "1",
          name: "J Smith",
          email: "jsmith@example.com",
          role: "user",
          access: false,
        };

        if (user) {
          return user as User;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      session.user.id = token.id as JWT["id"];
      session.user.role = token.role as JWT["role"];
      session.user.access = token.access as JWT["access"];
      session.user.authProvider = token.authProvider as JWT["authProvider"];

      return session;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.access = user.access;
        if (account) {
          token.authProvider = account?.provider;
        }
      }
      return token;
    },
  },
  events: {
    async createUser({ user }) {
      await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
  debug: process.env.NODE_ENV !== "production",
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    newUser: "/register",
  },
  session: {
    strategy: "jwt",
    maxAge: 5 * 60 * 60,
  },
};

export default authOptions;
