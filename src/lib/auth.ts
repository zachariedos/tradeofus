import NextAuth from "next-auth";
import {PrismaAdapter} from "@auth/prisma-adapter";
import {prisma} from "@/src/lib/prisma";
import authConfig from "@/auth.config";


export const {auth,handlers} = NextAuth({
    adapter: PrismaAdapter(prisma),
    secret: process.env.AUTH_SECRET!,
    ...authConfig
})