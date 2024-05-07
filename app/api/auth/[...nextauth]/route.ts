import NextAuth from 'next-auth';
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
	adapter: PrismaAdapter(prisma)

});
export { handler as GET, handler as POST };
