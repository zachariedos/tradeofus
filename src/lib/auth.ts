import NextAuth from "next-auth";
import {PrismaAdapter} from "@auth/prisma-adapter";
import {prisma} from "@/src/lib/prisma";
import Google from "next-auth/providers/google"

export const {auth,handlers} = NextAuth({
    secret: process.env.AUTH_SECRET!,
    adapter: PrismaAdapter(prisma),
    providers: [Google]
})