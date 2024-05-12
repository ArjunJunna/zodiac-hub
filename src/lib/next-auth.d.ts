import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      email: string;
      image: string;
      token: string;
    };
  }
}
import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      id: string;
      username: string;
      email: string;
      image: string;
      token: string;
    };
  }
}
