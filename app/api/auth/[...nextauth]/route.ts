import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }: any) {
      // Initial sign in - this should work for both credentials and OAuth
      if (user) {
        token.id = user.id;
        token.email = user.email || token.email;
        
        // Fetch the user from the database to get their role
        try {
          const dbUser = await prisma.user.findUnique({
            where: { id: user.id },
            select: { role: true }
          });
          token.role = dbUser?.role || "USER";
        } catch (error) {
          token.role = "USER";
        }
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        
        // Ensure email is set in session.user
        if (!session.user.email && token.email) {
          session.user.email = token.email;
        }

        // Generate JWT token for our existing auth system
        // Make sure we have the minimum required information
        if (token.id) {
          // Use token.email if session.user.email is not available
          const email = session.user.email || token.email;
          
          if (email) {
            session.token = jwt.sign(
              { 
                userId: token.id, 
                email: email, 
                role: token.role 
              },
              process.env.JWT_SECRET || "fallback_secret",
              { expiresIn: "7d" }
            );
          }
        }
      }
      return session;
    },
    async signIn({ user, account, profile }: any) {
      // Handle Google sign-in and user creation
      if (account?.provider === "google") {
        // User is signing in with Google
        // The PrismaAdapter will automatically create the user if they don't exist
        // Ensure user has required fields
        if (!user.email) {
          user.email = profile.email;
        }
        return true;
      }
      return true;
    },
  },
  pages: {
    signIn: "/",
  },
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };