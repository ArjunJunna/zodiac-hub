import { BASE_URL } from "@/lib/Constants";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Username here...",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.username || !credentials?.password) return null;
        const { username, password } = credentials;
        const res = await fetch(BASE_URL + "/auth/login", {
          method: "POST",
          body: JSON.stringify({
            username,
            password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.status == 401) {
          console.log("Unauthorized");

          return null;
        }
        const user = await res.json();
        return user;
      },
    }),
  ],
  //secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: any }) {
      if (user) {
        token = {
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            image: user.image,
            token: user.token,
          },
        };
      }
      return token;
    },

    async session({ token, session }) {
      session.user = token.user;
      return session;
    },
  },
};
