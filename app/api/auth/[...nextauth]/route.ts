import NextAuth, { type DefaultSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter }  from "@next-auth/prisma-adapter";
import prisma from '@/lib/PrismaClient';

const handler = NextAuth({
	secret: process.env.NEXTAUTH_SECRET,
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID ?? '',
			clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
		}),
	],
	adapter: PrismaAdapter(prisma),
	callbacks: {
    async session({session, user}) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
},
});

 declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
 }

export { handler as GET, handler as POST };
