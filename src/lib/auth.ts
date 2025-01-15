import type { AuthOptions, User } from "next-auth";
import type { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import db from "./db";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginSchema } from "./schemas/authSchema";
import { getUserByEmail } from "./utils/getUser";
import { compare } from "bcrypt";

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
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }
          const isValid = loginSchema.safeParse(credentials);

          if (!isValid.success) return null;

          const { email, password } = isValid.data;

          const userData = await getUserByEmail(email);

          if (
            !userData ||
            !userData?.hashedPassword ||
            !userData.access ||
            !userData?.emailVerified
          )
            return null;

          const isPasswordValid = await compare(
            password,
            userData.hashedPassword,
          );

          if (!isPasswordValid) return null;

          return {
            id: userData.id.toString(),
            authProvider: "Credentials",
            name: userData.name,
            image: userData.image,
            email: userData.email,
            role: userData.role,
            access: userData.access,
          };
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id.toString();
        token.role = user.role;
        token.access = user.access;
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
        session.user.authProvider = token.authProvider as JWT["authProvider"];
      }

      return session;
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
    signIn: "/login",
    error: "/login",
    verifyRequest: "/verify",
  },
  session: {
    strategy: "jwt",
    maxAge: 5 * 60 * 60,
  },
};

export default authOptions;
