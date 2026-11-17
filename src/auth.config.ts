import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

// Credential validation schema
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

/**
 * Edge-compatible Auth.js configuration.
 * This file is imported by middleware.ts and must NOT import Prisma or bcrypt.
 * The actual credential verification happens in auth.ts (Node runtime).
 */
export default {
  trustHost: true,
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || "0ac0cdccfd4fc4b4b3f3355840070ebfef406c8125150f909d453169913b2e73",
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      // Authorization logic is handled in auth.ts via the authorize callback override
      async authorize() {
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isProtected = nextUrl.pathname.startsWith("/dashboard");

      if (isProtected && !isLoggedIn) {
        return false; // Redirects to signIn page
      }

      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
