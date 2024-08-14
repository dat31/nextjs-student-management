import NextAuth, { NextAuthConfig } from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";
import prisma from "@/app/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";

const options = {
  providers: [Auth0Provider],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth;
    },
  },
  session: { strategy: "jwt" },
  trustHost: true,
} as NextAuthConfig;

export const { handlers, signIn, signOut, auth } = NextAuth(options);
