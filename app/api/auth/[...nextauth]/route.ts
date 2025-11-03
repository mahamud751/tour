import NextAuth, { SessionStrategy } from "next-auth";
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
        console.log("JWT callback - user:", user);
        console.log("JWT callback - account:", account);
        token.id = user.id;
        token.email = user.email || token.email;
        
        // Fetch the user from the database to get their role
        try {
          const dbUser = await prisma.user.findUnique({
            where: { id: user.id },
            select: { role: true }
          });
          token.role = dbUser?.role || "USER";
          console.log("JWT callback - token with role:", token);
        } catch (error) {
          console.error("JWT callback - error fetching user role:", error);
          token.role = "USER";
        }
      }
      console.log("JWT callback - returning token:", token);
      return token;
    },
    async session({ session, token }: any) {
      console.log("Session callback - token:", token);
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
          // Use token.email as it's more reliable
          const email = token.email;
          
          if (email) {
            try {
              session.token = jwt.sign(
                { 
                  userId: token.id, 
                  email: email, 
                  role: token.role 
                },
                process.env.JWT_SECRET || "fallback_secret",
                { expiresIn: "7d" }
              );
              console.log("Session callback - generated session token:", session.token);
            } catch (error) {
              console.error("Error generating JWT token:", error);
            }
          } else {
            console.log("Session callback - no email found for token generation");
          }
        } else {
          console.log("Session callback - no user ID found for token generation");
        }
      }
      console.log("Session callback - final session:", session);
      return session;
    },
    async signIn({ user, account, profile }: any) {
      // Handle Google sign-in and user creation
      console.log("SignIn callback - user:", user);
      console.log("SignIn callback - account:", account);
      console.log("SignIn callback - profile:", profile);
      
      if (account?.provider === "google") {
        // User is signing in with Google
        // The PrismaAdapter will automatically create the user if they don't exist
        // Ensure user has required fields
        if (!user.email) {
          user.email = profile.email;
        }
        
        // Ensure the user has a name
        if (!user.name && profile.name) {
          user.name = profile.name;
        }
        
        // If the user doesn't have a name, create one from email
        if (!user.name) {
          user.name = user.email.split("@")[0];
        }
        
        // Explicitly create or update user in database
        try {
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email }
          });
          
          if (!existingUser) {
            // Create user if they don't exist
            await prisma.user.create({
              data: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: "USER" // Default role
              }
            });
            console.log("SignIn callback - created new user:", user);
          } else {
            // Update existing user with Google ID if not set
            if (!existingUser.id && user.id) {
              await prisma.user.update({
                where: { email: user.email },
                data: { id: user.id }
              });
            }
            console.log("SignIn callback - user already exists:", existingUser);
          }
        } catch (error) {
          console.error("Error ensuring user creation:", error);
        }
        
        console.log("SignIn callback - returning true for Google user");
        return true;
      }
      console.log("SignIn callback - returning true for other providers");
      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,
  session: {
    strategy: "jwt" as SessionStrategy,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };