import NextAuth, { NextAuthOptions } from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";

const authOptions:NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    // FacebookProvider({
    //     clientId: process.env.FACEBOOK_CLIENT_ID! as string,
    //     clientSecret: process.env.FACEBOOK_CLIENT_SECRET! as string
    //   }),
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!
      })
    // ...add more providers here
  ],
  secret: process.env.SECRET,
  pages: {
    signIn: "/auth/signin",
 
  },
};

const handler= NextAuth(authOptions);
export { handler as GET, handler as POST }