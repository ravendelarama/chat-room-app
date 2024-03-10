import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "@/auth.config";
import db from "@/lib/db";

export const {
    handlers: {
        GET,
        POST
    },
    auth,
    signIn,
    signOut
} = NextAuth({
    adapter: PrismaAdapter(db),
    secret: process.env.AUTH_SECRET,
    session: { strategy: "jwt" },
    // pages: { signIn: "/auth" },
    events: {
        linkAccount: async ({ user }) => {
            await db.user.update({
                where: {
                    email: user.email!
                },
                data: {
                    emailVerified: new Date()
                }
            })
        }
    },
    callbacks: {
        async session({ session, token }) {
            
            if (token) {
                // @ts-ignore
                session.user.id = token.id;
                // @ts-ignore
                session.user.name = token.name;
                // @ts-ignore
                session.user.email = token.email;
                // @ts-ignore
                session.user.image = token.image;
            }
            
            return session;
        },

        async jwt({ token, user }) {
            if (user) {
                const data = await db.user.findFirst({
                    where: {
                        id: token.sub
                    }
                })
            

                if (data) {
                    token.id = data.id;
                    token.name = data.name;
                    token.email = data.email;
                    token.image = data.image;
                }
            }
    
            return token;
            
        }
    },
    ...authConfig,
});

