import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    // 1. ADD GOOGLE PROVIDER
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    
    CredentialsProvider({
      name: "credentials",
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          // Ensure baseUrl doesn't have a trailing slash
          const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
          
          const res = await fetch(`${baseUrl}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email.toLowerCase().trim(),
              password: credentials.password,
            }),
          });

          const user = await res.json();

          if (res.ok && user) {
            return {
              id: user._id || user.id, 
              name: user.name,
              email: user.email,
              role: user.role || "user",
            };
          }
          
          return null; 
        } catch (error) {
          console.error("AUTH_FETCH_ERROR:", error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, account }) {
      // If it's a initial sign in
      if (user) {
        token.id = user.id;
        // Assign a default role if the provider (like Google) doesn't send one
        token.role = user.role || "user";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },

  pages: { 
    signIn: "/login",
    error: "/login", // Redirects back to login on Google errors
  },

  session: { 
    strategy: "jwt" 
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };