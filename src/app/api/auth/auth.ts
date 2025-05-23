import { User } from "@/db/user.schema";
import { comparePassword } from "@/lib/handlePassword";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// o agrega otros como GoogleProvider, etc.

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          // Use absolute URL for the API request
          const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
          const response = await fetch(
            `${baseUrl}/api/users?email=${credentials.email}`
          );

          if (!response.ok) {
            throw new Error("Failed to fetch user");
          }

          const data = await response.json();

          if (!data) return null;

          const passwordMatch = await comparePassword(
            credentials.password,
            data.user.password
          );
          if (!passwordMatch) return null;
          console.log(data.user);
          return {
            id: data.user._id,
            name: data.user.name,
            email: data.user.email,
            role: data.user.role,
          };
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    redirect() {
      return process.env.NEXT_PUBLIC_APP_URL as string;
    },
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as User;
      return session;
    },
  },
  pages: {
    signIn: "/inicio-sesion",
  },
};
