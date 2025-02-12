import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import type { AuthOptions, User } from "next-auth";
import { loginSchema } from "@/lib/schemas/authSchema";
import { getUserByEmail } from "@/helpers/server-helper/getUser";
import { compare } from "bcrypt";

export default {
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
            userName: userData.username!,
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
} satisfies AuthOptions;
